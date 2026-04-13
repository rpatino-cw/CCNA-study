#!/usr/bin/env node
/**
 * Visual Regression Test — screenshots every page, diffs against baselines.
 *
 * Usage:
 *   node scripts/visual-regression.js           # compare against baselines
 *   node scripts/visual-regression.js --update   # save new baselines
 *
 * Requires: npm install (playwright, pixelmatch, pngjs)
 * First run: npx playwright install chromium
 */

const { chromium } = require('playwright');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BASELINE_DIR = path.join(ROOT, 'regression', 'baseline');
const CURRENT_DIR = path.join(ROOT, 'regression', 'current');
const DIFF_DIR = path.join(ROOT, 'regression', 'diff');
const UPDATE_MODE = process.argv.includes('--update');

// Pages to screenshot (skip index.html — it's a redirect)
const PAGES = fs.readdirSync(ROOT)
  .filter(f => f.endsWith('.html') && f !== 'index.html')
  .sort();

// Threshold: pixels that differ by more than this (0-1) count as changed
const PIXEL_THRESHOLD = 0.1;
// Max allowed diff percentage before failing
const MAX_DIFF_PCT = 0.5;

// Simple static file server
function startServer(port) {
  const mimeTypes = {
    '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
    '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml',
    '.woff2': 'font/woff2', '.ttf': 'font/ttf',
  };
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      let filePath = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
      if (filePath.endsWith('/')) filePath += 'index.html';
      const ext = path.extname(filePath);
      const mime = mimeTypes[ext] || 'application/octet-stream';
      try {
        const data = fs.readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': mime });
        res.end(data);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });
    server.listen(port, () => resolve(server));
  });
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readPNG(filePath) {
  return PNG.sync.read(fs.readFileSync(filePath));
}

async function run() {
  const port = 8787;
  const server = await startServer(port);
  const baseUrl = `http://localhost:${port}`;

  ensureDir(BASELINE_DIR);
  ensureDir(CURRENT_DIR);
  ensureDir(DIFF_DIR);

  console.log(UPDATE_MODE ? 'Updating baselines...' : 'Running visual regression...');
  console.log(`Serving from ${ROOT} on port ${port}`);
  console.log(`${PAGES.length} pages to screenshot\n`);

  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });

  const results = [];

  for (const page of PAGES) {
    const name = page.replace('.html', '');
    const url = `${baseUrl}/${page}`;
    const baselinePath = path.join(BASELINE_DIR, `${name}.png`);
    const currentPath = path.join(CURRENT_DIR, `${name}.png`);
    const diffPath = path.join(DIFF_DIR, `${name}.png`);

    try {
      const tab = await context.newPage();
      await tab.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      // Wait for fonts + rendering
      await tab.waitForTimeout(500);
      await tab.screenshot({ path: currentPath, fullPage: false });
      await tab.close();

      if (UPDATE_MODE) {
        fs.copyFileSync(currentPath, baselinePath);
        process.stdout.write(`  ${name} — baseline saved\n`);
        results.push({ name, status: 'updated' });
        continue;
      }

      if (!fs.existsSync(baselinePath)) {
        process.stdout.write(`  ${name} — no baseline (run --update first)\n`);
        results.push({ name, status: 'no-baseline' });
        continue;
      }

      // Diff
      const baseline = readPNG(baselinePath);
      const current = readPNG(currentPath);
      const { width, height } = baseline;

      if (current.width !== width || current.height !== height) {
        process.stdout.write(`  ${name} — SIZE CHANGED (${width}x${height} → ${current.width}x${current.height})\n`);
        results.push({ name, status: 'size-changed', diffPct: 100 });
        continue;
      }

      const diff = new PNG({ width, height });
      const diffPixels = pixelmatch(
        baseline.data, current.data, diff.data,
        width, height, { threshold: PIXEL_THRESHOLD }
      );
      const totalPixels = width * height;
      const diffPct = (diffPixels / totalPixels * 100).toFixed(2);

      if (diffPixels > 0) {
        fs.writeFileSync(diffPath, PNG.sync.write(diff));
      }

      const pass = parseFloat(diffPct) <= MAX_DIFF_PCT;
      const icon = pass ? (diffPixels === 0 ? '✓' : '~') : '✗';
      process.stdout.write(`  ${icon} ${name} — ${diffPct}% diff (${diffPixels} px)\n`);
      results.push({ name, status: pass ? 'pass' : 'fail', diffPct: parseFloat(diffPct), diffPixels });

    } catch (err) {
      process.stdout.write(`  ✗ ${name} — ERROR: ${err.message}\n`);
      results.push({ name, status: 'error', error: err.message });
    }
  }

  await browser.close();
  server.close();

  // Summary
  const passed = results.filter(r => r.status === 'pass').length;
  const failed = results.filter(r => r.status === 'fail').length;
  const errors = results.filter(r => r.status === 'error').length;
  const noBaseline = results.filter(r => r.status === 'no-baseline').length;

  console.log(`\n${'═'.repeat(50)}`);
  if (UPDATE_MODE) {
    console.log(`Baselines updated: ${results.length} pages`);
  } else {
    console.log(`Results: ${passed} passed, ${failed} failed, ${errors} errors, ${noBaseline} no baseline`);
    if (failed > 0) {
      console.log('\nFailed pages:');
      results.filter(r => r.status === 'fail').forEach(r => {
        console.log(`  ${r.name} — ${r.diffPct}% diff (see regression/diff/${r.name}.png)`);
      });
      process.exit(1);
    }
  }
}

run().catch(err => { console.error(err); process.exit(1); });
