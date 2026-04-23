#!/usr/bin/env node
/**
 * E2E — Skip-eligible flow.
 * Locks down the critical user path: open core.html → take glossary quiz →
 * pass 90%+ → return to core → see SKIP badge + Mastery Quiz CTA + dimmed
 * Jeremy Deep Dive.
 *
 * Silent regressions on localStorage.ccna_gloss_* keys or buildNextStep()
 * state transitions would ship unnoticed without this test.
 *
 * Usage: node scripts/e2e-skip-flow.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PORT = 9849; // unique — smoke 9847, nav 9848, visual 8787
const SUB = '1.1';
const QUIZ_JSON = `/data/glossary-quiz/${SUB}.json`;

const MIME = {
  '.html': 'text/html', '.js': 'application/javascript', '.mjs': 'application/javascript',
  '.css': 'text/css', '.json': 'application/json', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2',
};

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let filePath = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
      if (filePath.endsWith('/')) filePath += 'index.html';
      if (!fs.existsSync(filePath)) { res.writeHead(404); res.end(); return; }
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    });
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

// Assertion runner: capture step name + pass/fail + optional details
const steps = [];
function step(name, fn) {
  return async () => {
    try {
      const detail = await fn();
      steps.push({ name, status: 'pass', detail });
    } catch (e) {
      steps.push({ name, status: 'fail', detail: e.message });
      throw e; // abort chain on first failure
    }
  };
}

async function dumpFailureScreenshot(page, stepName) {
  const dir = path.join(ROOT, 'regression', 'e2e');
  fs.mkdirSync(dir, { recursive: true });
  const safeName = stepName.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
  const file = path.join(dir, `fail-${safeName}.png`);
  try {
    await page.screenshot({ path: file, fullPage: true });
    return file;
  } catch {
    return null;
  }
}

async function main() {
  let chromium;
  try {
    chromium = require('playwright').chromium;
  } catch {
    console.log('  Playwright not installed — skipping e2e skip-flow test');
    process.exit(0);
  }

  const server = await startServer();
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });

  const baseUrl = `http://127.0.0.1:${PORT}`;
  let lastStepName = 'init';

  try {
    await step('Load core.html (clean localStorage)', async () => {
      await page.goto(`${baseUrl}/core.html`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.evaluate(() => localStorage.clear());
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => !!window.JEREMY_DEEP_DIVE, null, { timeout: 5000 });
    })();
    lastStepName = 'Load core.html';

    await step(`Expand sub-objective ${SUB} drawer`, async () => {
      await page.evaluate((sub) => {
        const dom = sub.split('.')[0];
        document.getElementById('dbody-' + dom)?.classList.add('open');
        document.getElementById('objbody-' + sub)?.classList.add('open');
      }, SUB);
      await page.waitForSelector(`#obj-${SUB.replace('.', '\\.')} .nxt-btn`, { timeout: 3000 });
    })();
    lastStepName = 'Expand drawer';

    await step('NextStep CTA = "Glossary Quiz" (0% state)', async () => {
      const txt = await page.locator(`#obj-${SUB.replace('.', '\\.')} .nxt-btn`).textContent();
      if (!/Glossary Quiz/i.test(txt)) {
        throw new Error(`expected "Glossary Quiz" in CTA, got "${txt}"`);
      }
      return txt.trim();
    })();
    lastStepName = 'NextStep CTA baseline';

    await step(`Load glossary-quiz.html?sub=${SUB}`, async () => {
      await page.goto(`${baseUrl}/glossary-quiz.html?sub=${SUB}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForSelector('.gq-opt', { timeout: 5000 });
    })();
    lastStepName = 'Load quiz';

    let total = 0;
    await step('Answer every question correctly', async () => {
      // Fetch source data to know correct answers
      const quizUrl = `${baseUrl}${QUIZ_JSON}`;
      const resp = await page.evaluate(async (u) => {
        const r = await fetch(u);
        return r.ok ? r.json() : null;
      }, quizUrl);
      if (!resp || !Array.isArray(resp.questions) || !resp.questions.length) {
        throw new Error(`quiz JSON ${QUIZ_JSON} empty or malformed`);
      }
      total = resp.questions.length;
      // The runner shuffles questions — we identify each one by its text,
      // then pick the option whose data-origIdx matches the correctIndex.
      for (let i = 0; i < total; i++) {
        await page.waitForSelector('.gq-opt', { timeout: 5000 });
        const currentQ = (await page.locator('.gq-q').textContent()).trim();
        const source = resp.questions.find((q) => q.question === currentQ);
        if (!source) throw new Error(`question not found in source JSON: "${currentQ.slice(0, 60)}…"`);
        // Match by the correct option's TEXT — more robust than data-origidx
        // (avoids any attribute-case or selector issues).
        const correctText = source.options[source.correctIndex];
        await page.locator('.gq-opt').filter({ hasText: correctText.slice(0, 40) }).first().click({ timeout: 3000 });
        // Always click Next — advances state.idx; on the final question,
        // Next triggers renderResult().
        await page.locator('#gq-next').click({ timeout: 3000 });
      }
      return `${total} answered`;
    })();
    lastStepName = 'Answer all questions';

    await step('Result card shows 100%', async () => {
      await page.waitForSelector('.gq-score', { timeout: 5000 });
      const scoreText = await page.locator('.gq-score').textContent();
      if (!/100%/.test(scoreText)) {
        throw new Error(`expected 100% score (answered all correctly), got "${scoreText}"`);
      }
      return scoreText.trim();
    })();
    lastStepName = 'Result 100%';

    await step(`localStorage.ccna_gloss_${SUB} written with pct >= 90`, async () => {
      const record = await page.evaluate((sub) => {
        const raw = localStorage.getItem('ccna_gloss_' + sub);
        return raw ? JSON.parse(raw) : null;
      }, SUB);
      if (!record) throw new Error('localStorage key missing');
      if (typeof record.pct !== 'number' || record.pct < 90) {
        throw new Error(`pct=${record.pct} not >= 90`);
      }
      return `pct=${record.pct}, score=${record.score}/${record.total}`;
    })();
    lastStepName = 'localStorage written';

    await step('Reload core.html — SKIP badge present', async () => {
      await page.goto(`${baseUrl}/core.html`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForFunction(() => !!window.JEREMY_DEEP_DIVE, null, { timeout: 5000 });
      await page.evaluate((sub) => {
        const dom = sub.split('.')[0];
        document.getElementById('dbody-' + dom)?.classList.add('open');
        document.getElementById('objbody-' + sub)?.classList.add('open');
      }, SUB);
      const badge = await page.locator(`#obj-${SUB.replace('.', '\\.')} .skip-badge`).first();
      const badgeText = await badge.textContent({ timeout: 3000 });
      if (!/SKIP \d+%/.test(badgeText)) {
        throw new Error(`badge text "${badgeText}" does not match /SKIP \\d+%/`);
      }
      return badgeText.trim();
    })();
    lastStepName = 'SKIP badge present';

    await step('NextStep CTA flipped to "Mastery Quiz"', async () => {
      const txt = await page.locator(`#obj-${SUB.replace('.', '\\.')} .nxt-btn`).textContent();
      if (!/Mastery Quiz/i.test(txt)) {
        throw new Error(`expected "Mastery Quiz" in CTA, got "${txt}"`);
      }
      return txt.trim();
    })();
    lastStepName = 'CTA flipped';

    await step('Jeremy Deep Dive has .skipped class', async () => {
      const has = await page.evaluate((sub) => {
        const esc = sub.replace('.', '\\.');
        const jdd = document.querySelector(`#obj-${esc} .jdd`);
        return jdd && jdd.classList.contains('skipped');
      }, SUB);
      if (!has) throw new Error('.jdd missing .skipped class');
      return 'skipped';
    })();
    lastStepName = 'JDD skipped';

  } catch (e) {
    const shot = await dumpFailureScreenshot(page, lastStepName);
    if (shot) console.error(`\n  Failure screenshot: ${path.relative(ROOT, shot)}`);
  }

  await browser.close();
  server.close();

  // Report
  console.log('\n  E2E Skip-Flow Results');
  console.log('  ' + '─'.repeat(50));
  for (const s of steps) {
    const mark = s.status === 'pass' ? '✓' : '✗';
    const detail = s.detail ? ` — ${s.detail}` : '';
    console.log(`  ${mark} ${s.name}${detail}`);
  }
  console.log('  ' + '─'.repeat(50));

  const failed = steps.filter((s) => s.status === 'fail').length;
  if (failed > 0 || steps.length < 10) {
    console.log(`  Skip-flow test FAILED (${failed} failed, ${steps.length} completed of 10 steps). Push blocked.\n`);
    process.exit(1);
  } else {
    console.log(`  Skip-flow e2e clean — all ${steps.length} steps passed.\n`);
    process.exit(0);
  }
}

main().catch((e) => { console.error('E2E skip-flow crashed:', e.message); process.exit(1); });
