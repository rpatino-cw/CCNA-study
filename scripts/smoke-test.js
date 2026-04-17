#!/usr/bin/env node
/**
 * Headless Playwright smoke test — catches JS runtime errors before push.
 * Loads each page with heavy JS, waits for init, fails on console errors.
 *
 * Usage: node scripts/smoke-test.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PORT = 9847;

const PAGES = [
  'packet-journey.html',
  'packet-race.html',
  'devices.html',
  'cidr-3d.html',
  'core.html',
  'quiz.html',
  'exam-sim.html',
  'labs/index.html',
  'labs/lab-pt0-getting-started.html',
  'labs/lab-pt1-vlan.html',
  'labs/lab-pt2-stp-etherchannel.html',
  'labs/lab-pt3-inter-vlan-routing.html',
  'labs/lab-pt4-ospf.html',
  'labs/lab-pt5-ospf-break-fix.html',
  'labs/lab-pt6-nat-dhcp.html',
  'labs/lab-pt7-acl-portsec.html',
  'labs/lab-pt8-json-api.html',
  'labs/lab-pt9-capstone.html',
];

const MIME = {
  '.html': 'text/html', '.js': 'application/javascript', '.mjs': 'application/javascript',
  '.css': 'text/css', '.json': 'application/json', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2',
};

// Errors to ignore (not real bugs)
const IGNORE = [
  'favicon.ico',
  'net::ERR_',           // network fetch failures for external CDN (offline)
  'Failed to load resource', // 404s for optional assets
];

// Known pre-existing issues — warn but don't block push
// Remove entries as they get fixed
const KNOWN_ISSUES = {
  'devices.html': ['Object3D.add: object not an instance'],
};

function shouldIgnore(msg) {
  return IGNORE.some(pat => msg.includes(pat));
}

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

async function testPage(browser, pageName) {
  const url = `http://127.0.0.1:${PORT}/${pageName}`;
  const errors = [];

  const page = await browser.newPage();
  page.on('pageerror', (err) => {
    if (!shouldIgnore(err.message)) errors.push(err.message);
  });
  page.on('console', (msg) => {
    if (msg.type() === 'error' && !shouldIgnore(msg.text())) {
      errors.push(msg.text());
    }
  });

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(3000);
  } catch (e) {
    errors.push('Navigation: ' + e.message);
  }

  await page.close();
  return errors;
}

async function main() {
  let chromium;
  try {
    chromium = require('playwright').chromium;
  } catch {
    console.log('  Playwright not installed — skipping smoke test');
    process.exit(0);
  }

  const server = await startServer();
  const browser = await chromium.launch({ headless: true });

  let totalFail = 0;
  const results = [];

  for (const pageName of PAGES) {
    if (!fs.existsSync(path.join(ROOT, pageName))) {
      results.push({ page: pageName, status: 'skip', errors: [] });
      continue;
    }
    let errors = await testPage(browser, pageName);
    // Filter known pre-existing issues (warn only)
    const known = KNOWN_ISSUES[pageName] || [];
    const knownHits = [];
    if (known.length) {
      errors = errors.filter(e => {
        const isKnown = known.some(k => e.includes(k));
        if (isKnown) knownHits.push(e);
        return !isKnown;
      });
    }
    if (errors.length > 0) {
      results.push({ page: pageName, status: 'fail', errors, knownHits });
      totalFail++;
    } else {
      results.push({ page: pageName, status: knownHits.length ? 'warn' : 'pass', errors: [], knownHits });
    }
  }

  await browser.close();
  server.close();

  console.log('\n  Smoke Test Results');
  console.log('  ' + '\u2500'.repeat(50));
  for (const r of results) {
    if (r.status === 'skip') console.log(`  \u25CB ${r.page} \u2014 skipped`);
    else if (r.status === 'pass') console.log(`  \u2713 ${r.page}`);
    else if (r.status === 'warn') {
      console.log(`  \u2713 ${r.page} (${r.knownHits.length} known issue${r.knownHits.length > 1 ? 's' : ''})`);
    } else {
      console.log(`  \u2717 ${r.page}`);
      r.errors.forEach(e => console.log(`    \u2192 ${e.substring(0, 150)}`));
      if (r.knownHits.length) console.log(`    (+ ${r.knownHits.length} known)`);
    }
  }
  console.log('  ' + '\u2500'.repeat(50));

  if (totalFail > 0) {
    console.log(`  ${totalFail} page(s) have JS errors. Push blocked.\n`);
    process.exit(1);
  } else {
    console.log(`  All ${results.filter(r => r.status === 'pass').length} pages clean.\n`);
    process.exit(0);
  }
}

main().catch(e => { console.error('Smoke test crashed:', e.message); process.exit(1); });
