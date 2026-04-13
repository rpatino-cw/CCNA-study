#!/usr/bin/env node
/**
 * Validates every quiz answer index is within bounds of its options array.
 * Run: node scripts/validate-answers.js
 * Exit 0 = all valid, Exit 1 = errors found
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const dirs = ['', 'labs', 'visuals'];
const files = [];
for (const dir of dirs) {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) continue;
  for (const f of fs.readdirSync(full)) {
    if (f.endsWith('.html')) files.push(path.join(dir, f));
  }
}

let total = 0, errors = 0;

for (const file of files) {
  const content = fs.readFileSync(path.join(ROOT, file), 'utf8');

  // Strategy: find all opts/options arrays paired with ans/correct values
  // by extracting question objects more carefully.

  // Pattern 1: {q:'...', opts:['a','b','c','d'], ans:N}
  // Match opts array by counting string literals, then find ans nearby
  const objPattern = /\{[^{}]*?\b(opts|options)\s*:\s*\[([\s\S]*?)\][^{}]*?\b(ans|correct|answer)\s*:\s*(\d+)/g;
  const objPatternRev = /\{[^{}]*?\b(ans|correct|answer)\s*:\s*(\d+)[^{}]*?\b(opts|options)\s*:\s*\[([\s\S]*?)\]/g;

  function countOpts(optsStr) {
    // Count quoted strings as options — handle escaped quotes
    let count = 0;
    let inStr = false, strChar = '';
    for (let i = 0; i < optsStr.length; i++) {
      const c = optsStr[i];
      if (!inStr && (c === "'" || c === '"' || c === '`')) {
        inStr = true; strChar = c; count++;
      } else if (inStr && c === strChar && optsStr[i-1] !== '\\') {
        inStr = false;
      }
    }
    return count;
  }

  function validate(regex, ansGroupIdx, optsGroupIdx) {
    let m;
    while ((m = regex.exec(content)) !== null) {
      const ans = parseInt(m[ansGroupIdx]);
      const optsStr = m[optsGroupIdx];
      const optCount = countOpts(optsStr);
      if (optCount < 2) continue; // not a real question
      total++;
      if (ans < 0 || ans >= optCount) {
        errors++;
        const lineNum = content.substring(0, m.index).split('\n').length;
        const snippet = content.substring(m.index, m.index + 60).replace(/\n/g, ' ').trim();
        console.error(`  FAIL  ${file}:${lineNum} — ans=${ans} but ${optCount} options — "${snippet}..."`);
      }
    }
  }

  validate(objPattern, 4, 2);
  validate(objPatternRev, 2, 4);
}

if (errors === 0) {
  console.log(`OK  ${total} quiz answers validated across ${files.length} files — all within bounds`);
  process.exit(0);
} else {
  console.error(`\nFAILED  ${errors} out-of-bounds answer(s) found`);
  process.exit(1);
}
