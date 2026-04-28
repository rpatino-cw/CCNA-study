#!/usr/bin/env node
/**
 * Headless smoke check for strat.html.
 *
 * Boots a tiny static server, loads strat.html?obj=1.1 in headless Chromium,
 * waits for bootstrap, and confirms:
 *   - no console errors (other than the well-known fonts warning).
 *   - the side rail rendered 4 dots.
 *   - 5 mode pills rendered.
 *   - the Gemini key modal appeared (no key in storage).
 *   - mastery line rendered.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..');
const PORT = 9848;
const MIME = {
  '.html': 'text/html', '.js': 'application/javascript',
  '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.txt': 'text/plain', '.ico': 'image/x-icon',
};

function serve() {
  return new Promise(resolve => {
    const s = http.createServer((req, res) => {
      const url = decodeURIComponent(req.url.split('?')[0]);
      const file = path.join(ROOT, url === '/' ? 'index.html' : url);
      if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
      fs.readFile(file, (err, buf) => {
        if (err) { res.writeHead(404); return res.end('not found'); }
        const ext = path.extname(file).toLowerCase();
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(buf);
      });
    });
    s.listen(PORT, '127.0.0.1', () => resolve(s));
  });
}

(async () => {
  const server = await serve();
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => {
    if (m.type() === 'error' && !/favicon|net::ERR_/.test(m.text())) {
      errors.push('console: ' + m.text());
    }
  });

  await page.goto(`http://127.0.0.1:${PORT}/strat.html?obj=1.1`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => !!document.querySelector('.mode-pill'), { timeout: 5000 });

  const dots = await page.$$eval('.side-rail .dot', els => els.length);
  const pills = await page.$$eval('.mode-pill', els => els.length);
  const modal = await page.$('.gem-modal');
  const masteryText = await page.$eval('.mastery-line', el => el.textContent);
  const hasError = !!(await page.$('.strat-error'));

  let fail = 0;
  function check(name, ok, extra) {
    if (ok) console.log('  ✓ ' + name); else { console.log('  ✗ ' + name + (extra ? ' — ' + extra : '')); fail++; }
  }
  check('side rail rendered 4 dots', dots === 4, 'got ' + dots);
  check('5 mode pills rendered', pills === 5, 'got ' + pills);
  check('gemini key modal appeared on first visit', modal !== null);
  check('mastery line rendered', /Mastery/.test(masteryText));
  check('no error banner', !hasError);
  check('no JS console errors', errors.length === 0, errors.join(' | '));

  await browser.close();
  server.close();
  if (fail) { console.log('\n✗ ' + fail + ' check(s) failed'); process.exit(1); }
  console.log('\n✓ strat.html smoke passed');
})().catch(err => {
  console.error('SMOKE ERROR:', err);
  process.exit(1);
});
