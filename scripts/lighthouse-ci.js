#!/usr/bin/env node
/**
 * Lighthouse CI — audits key pages for performance regressions.
 *
 * Runs headless Lighthouse on critical pages, checks scores against
 * thresholds, and blocks push if any page drops below minimum.
 *
 * Usage:
 *   node scripts/lighthouse-ci.js          # audit and check thresholds
 *   node scripts/lighthouse-ci.js --verbose # show full category scores
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const VERBOSE = process.argv.includes('--verbose');

// Pages to audit (highest-traffic, most complex)
const PAGES = [
  'core.html',
  'quiz.html',
  'roadmap.html',
  'devices.html',
];

// Minimum scores (0-1). Fail if ANY page drops below these.
const THRESHOLDS = {
  performance: 0.70,
  accessibility: 0.85,
  'best-practices': 0.80,
};

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

async function run() {
  // Dynamic import — lighthouse is ESM-only in recent versions
  let lighthouse;
  try {
    lighthouse = (await import('lighthouse')).default;
  } catch {
    try {
      lighthouse = require('lighthouse');
    } catch {
      console.log('  Lighthouse not available — skipping perf audit');
      process.exit(0);
    }
  }

  const chromeLauncher = await import('chrome-launcher');
  const port = 8789;
  const server = await startServer(port);

  console.log(`  Auditing ${PAGES.length} pages (thresholds: perf≥${THRESHOLDS.performance * 100}, a11y≥${THRESHOLDS.accessibility * 100}, bp≥${THRESHOLDS['best-practices'] * 100})`);

  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'] });
  const results = [];

  for (const page of PAGES) {
    const url = `http://localhost:${port}/${page}`;
    try {
      const result = await lighthouse(url, {
        port: chrome.port,
        output: 'json',
        onlyCategories: ['performance', 'accessibility', 'best-practices'],
        // Fast mode — skip heavy audits that don't matter for static sites
        skipAudits: ['screenshot-thumbnails', 'final-screenshot'],
      });

      const scores = {};
      const cats = result.lhr.categories;
      for (const key of Object.keys(THRESHOLDS)) {
        scores[key] = cats[key] ? cats[key].score : null;
      }

      const failures = [];
      for (const [cat, min] of Object.entries(THRESHOLDS)) {
        if (scores[cat] !== null && scores[cat] < min) {
          failures.push(`${cat}: ${Math.round(scores[cat] * 100)} < ${Math.round(min * 100)}`);
        }
      }

      const icon = failures.length > 0 ? '✗' : '✓';
      const scoreStr = Object.entries(scores)
        .map(([k, v]) => `${k.replace('best-practices', 'bp')}:${v !== null ? Math.round(v * 100) : '?'}`)
        .join(' ');

      process.stdout.write(`  ${icon} ${page} — ${scoreStr}\n`);

      if (VERBOSE && result.lhr.audits) {
        const lcp = result.lhr.audits['largest-contentful-paint'];
        const cls = result.lhr.audits['cumulative-layout-shift'];
        const tbt = result.lhr.audits['total-blocking-time'];
        if (lcp) process.stdout.write(`      LCP: ${lcp.displayValue}\n`);
        if (cls) process.stdout.write(`      CLS: ${cls.displayValue}\n`);
        if (tbt) process.stdout.write(`      TBT: ${tbt.displayValue}\n`);
      }

      results.push({ page, scores, failures });
    } catch (err) {
      process.stdout.write(`  ✗ ${page} — ERROR: ${err.message.substring(0, 100)}\n`);
      results.push({ page, scores: {}, failures: [`error: ${err.message.substring(0, 80)}`] });
    }
  }

  await chrome.kill();
  server.close();

  // Summary
  const failed = results.filter(r => r.failures.length > 0);
  console.log(`  ${'─'.repeat(50)}`);
  if (failed.length > 0) {
    console.log(`  ${failed.length} page(s) below threshold:`);
    for (const f of failed) {
      console.log(`    ${f.page}: ${f.failures.join(', ')}`);
    }
    process.exit(1);
  } else {
    console.log(`  All ${PAGES.length} pages meet performance thresholds.`);
  }
}

run().catch(err => {
  console.error('Lighthouse CI error:', err.message);
  // Don't block push on Lighthouse infra errors
  process.exit(0);
});
