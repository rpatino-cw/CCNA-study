#!/usr/bin/env node
/**
 * Nav click-test — verifies every dropdown item in nav.js is clickable.
 * Catches CSS columns bugs, z-index issues, and obscured click targets.
 *
 * Uses Playwright's click({ trial: true }) — runs all actionability checks
 * (visible, stable, receives pointer events) without actually navigating.
 *
 * Usage: node scripts/nav-click-test.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PORT = 9848; // different from smoke-test (9847)

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

async function main() {
  let chromium;
  try {
    chromium = require('playwright').chromium;
  } catch {
    console.log('  Playwright not installed — skipping nav click-test');
    process.exit(0);
  }

  const server = await startServer();
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });

  await page.goto(`http://127.0.0.1:${PORT}/core.html`, {
    waitUntil: 'domcontentloaded',
    timeout: 15000,
  });
  await page.waitForTimeout(1000);

  const results = [];
  let failures = 0;

  // Test top-level direct links (non-dropdown)
  const directLinks = await page.locator('nav.top-nav > a').all();
  for (const link of directLinks) {
    const text = (await link.textContent()).trim();
    try {
      await link.click({ trial: true, timeout: 3000 });
      results.push({ item: text, group: null, status: 'pass' });
    } catch (e) {
      results.push({ item: text, group: null, status: 'fail', error: e.message });
      failures++;
    }
  }

  // Test every dropdown group and its items
  const groups = await page.locator('nav.top-nav .nav-group').all();
  for (const group of groups) {
    const btn = group.locator('.nav-group-btn');
    const groupName = (await btn.textContent()).replace(/\d+/g, '').replace(/\u25BE/g, '').trim();

    // Open the dropdown
    await btn.click({ timeout: 3000 });
    await page.waitForTimeout(200);

    const items = await group.locator('.nav-drop-item').all();
    for (const item of items) {
      const text = (await item.textContent()).trim();
      try {
        await item.click({ trial: true, timeout: 3000 });
        results.push({ item: text, group: groupName, status: 'pass' });
      } catch (e) {
        results.push({ item: text, group: groupName, status: 'fail', error: e.message });
        failures++;
      }
    }

    // Verify dropdown items have display:block (catches CSS specificity bugs)
    for (const item of items) {
      const text = (await item.textContent()).trim();
      const display = await item.evaluate(el => window.getComputedStyle(el).display);
      if (display !== 'block') {
        results.push({ item: text + ' [display]', group: groupName, status: 'fail', error: `Expected display:block but got display:${display} — CSS specificity bug` });
        failures++;
      }
    }

    // Close dropdown before next group
    await page.click('body', { position: { x: 1, y: 1 } });
    await page.waitForTimeout(100);
  }

  await browser.close();
  server.close();

  // Report
  console.log('\n  Nav Click-Test Results');
  console.log('  ' + '\u2500'.repeat(50));

  const grouped = {};
  for (const r of results) {
    const key = r.group || 'Top-level';
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(r);
  }

  for (const [group, items] of Object.entries(grouped)) {
    const allPass = items.every(i => i.status === 'pass');
    console.log(`  ${allPass ? '\u2713' : '\u2717'} ${group} (${items.length} items)`);
    for (const i of items) {
      if (i.status === 'fail') {
        console.log(`    \u2717 "${i.item}" — not clickable`);
        console.log(`      \u2192 ${i.error.substring(0, 120)}`);
      }
    }
  }

  console.log('  ' + '\u2500'.repeat(50));
  const total = results.length;
  const passed = total - failures;
  console.log(`  ${passed}/${total} nav items clickable.`);

  if (failures > 0) {
    console.log(`  ${failures} item(s) have broken click targets. Push blocked.\n`);
    process.exit(1);
  } else {
    console.log(`  All nav items OK.\n`);
    process.exit(0);
  }
}

main().catch(e => { console.error('Nav click-test crashed:', e.message); process.exit(1); });
