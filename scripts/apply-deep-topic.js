#!/usr/bin/env node
/**
 * apply-deep-topic.js — Merge a generated deep-micro JSON into a data file.
 *
 * Usage: node apply-deep-topic.js <gen-json> <data-file>
 * Example: node apply-deep-topic.js .gen-topic-2.5.json data/subtopic-content-d12.js
 *
 * For each subtopic in the JSON, finds the current `micro: [ ... ]` array in
 * the data file (matching nested brackets) and replaces it with the deep
 * version formatted as a JS literal.
 */

const fs = require('fs');
const path = require('path');

const [, , genPath, dataPath] = process.argv;
if (!genPath || !dataPath) {
  console.error('Usage: node apply-deep-topic.js <gen-json> <data-file>');
  process.exit(1);
}

const gen = JSON.parse(fs.readFileSync(genPath, 'utf8'));
let src = fs.readFileSync(dataPath, 'utf8');

/**
 * Find the start/end of a `micro: [ ... ]` block for a given subtopic.
 * Returns { start, end } character indices or null.
 */
function findMicroRange(source, subtopicId) {
  const marker = `"${subtopicId}":`;
  const subStart = source.indexOf(marker);
  if (subStart === -1) return null;

  // Find the subtopic's closing brace by bracket counting starting from after "{" of this subtopic.
  const subOpenBrace = source.indexOf('{', subStart);
  let braceDepth = 1;
  let i = subOpenBrace + 1;
  while (i < source.length && braceDepth > 0) {
    const ch = source[i];
    if (ch === '{') braceDepth++;
    else if (ch === '}') braceDepth--;
    if (braceDepth === 0) break;
    i++;
  }
  const subEnd = i; // index of closing }

  // Within [subOpenBrace, subEnd], find `micro: [`
  const microKey = source.indexOf('micro:', subOpenBrace);
  if (microKey === -1 || microKey > subEnd) return null;
  const arrOpen = source.indexOf('[', microKey);
  if (arrOpen === -1) return null;

  // Match brackets to find end of array
  let bracket = 1;
  let j = arrOpen + 1;
  while (j < source.length && bracket > 0) {
    const ch = source[j];
    // handle strings
    if (ch === '"' || ch === "'") {
      const quote = ch;
      j++;
      while (j < source.length) {
        if (source[j] === '\\') { j += 2; continue; }
        if (source[j] === quote) break;
        j++;
      }
      j++;
      continue;
    }
    if (ch === '[') bracket++;
    else if (ch === ']') bracket--;
    if (bracket === 0) break;
    j++;
  }
  return { start: microKey, end: j + 1 };
}

function jsStringLiteral(s) {
  // Produce a double-quoted JS string literal, escaping as needed.
  return '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r') + '"';
}

function indentLines(text, prefix) {
  return text.split('\n').map(l => prefix + l).join('\n');
}

function formatValue(v) {
  if (v === null) return 'null';
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  if (typeof v === 'string') return jsStringLiteral(v);
  if (Array.isArray(v)) {
    if (v.length === 0) return '[]';
    const items = v.map(formatValue).join(', ');
    return '[' + items + ']';
  }
  if (typeof v === 'object') {
    const entries = Object.entries(v);
    if (entries.length === 0) return '{}';
    const parts = entries.map(([k, val]) => `${k}: ${formatValue(val)}`);
    return '{ ' + parts.join(', ') + ' }';
  }
  return 'null';
}

function formatMicroEntry(entry, indent) {
  // Produce multi-line, human-readable entry.
  const pad = indent;
  const lines = [];
  lines.push(pad + '{');
  lines.push(pad + `  id: ${jsStringLiteral(entry.id)},`);
  lines.push(pad + `  term: ${jsStringLiteral(entry.term)},`);
  lines.push(pad + `  weight: ${jsStringLiteral(entry.weight || 'med')},`);
  if (entry.info) {
    lines.push(pad + `  info: ${jsStringLiteral(entry.info)},`);
  }
  if (entry.visual) {
    lines.push(pad + `  visual: ${formatValue(entry.visual)},`);
  }
  if (entry.hack) {
    const h = entry.hack;
    lines.push(pad + `  hack: {`);
    if (h.memory)   lines.push(pad + `    memory: ${jsStringLiteral(h.memory)},`);
    if (h.practice) lines.push(pad + `    practice: ${jsStringLiteral(h.practice)},`);
    if (h.effort)   lines.push(pad + `    effort: ${jsStringLiteral(h.effort)},`);
    if (h.meta)     lines.push(pad + `    meta: ${jsStringLiteral(h.meta)}`);
    lines.push(pad + `  }`);
  }
  lines.push(pad + '}');
  return lines.join('\n');
}

function formatMicroArray(entries, baseIndent) {
  const itemIndent = baseIndent + '  ';
  const items = entries.map(e => formatMicroEntry(e, itemIndent));
  return 'micro: [\n' + items.join(',\n') + '\n' + baseIndent + ']';
}

// Apply each subtopic's deep micro
let applied = 0;
let skipped = 0;
// Process in reverse order to keep earlier indices valid as we edit
const ids = Object.keys(gen).sort().reverse();
for (const subId of ids) {
  const range = findMicroRange(src, subId);
  if (!range) {
    console.warn(`Skipped ${subId} — no micro: [] found`);
    skipped++;
    continue;
  }
  // Detect indent (same column as 'micro:' start — find preceding newline)
  let lineStart = range.start;
  while (lineStart > 0 && src[lineStart - 1] !== '\n') lineStart--;
  const baseIndent = src.slice(lineStart, range.start);
  const replacement = formatMicroArray(gen[subId], baseIndent);
  src = src.slice(0, range.start) + replacement + src.slice(range.end);
  applied++;
  console.log(`Applied ${subId} (${gen[subId].length} deep lessons)`);
}

fs.writeFileSync(dataPath, src);
console.log(`\nDone. Applied ${applied} subtopics. Skipped ${skipped}.`);
