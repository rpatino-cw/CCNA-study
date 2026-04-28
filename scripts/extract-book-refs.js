#!/usr/bin/env node
// scripts/extract-book-refs.js — Phase 1C
//
// Extracts chapter-level snippets from the CCNA OCG Library PDF and asks
// Gemini to classify which CCNA blueprint objective(s) each chapter covers.
// Writes data/book-refs/ocg-by-objective.json keyed by objective ID (e.g. "1.1").
//
// Personal-use only. Fair-use limits: <= 2 paragraphs per chapter, no full text;
// page numbers + chapter pointers are the primary affordance — paragraphs are
// preview snippets to help recall.
//
// Usage:
//   node scripts/extract-book-refs.js [--pdf <path>] [--out <path>]
//                                     [--max-chapters N] [--dry-run]
//                                     [--gemini-model gemini-1.5-flash]
//                                     [--vol1-only|--vol2-only]
//
// Requires: pdftotext (poppler), GEMINI_API_KEY in ~/.config/keys/global.env.

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync, spawnSync } = require('child_process');

// ----- args -----
const argv = process.argv.slice(2);
function arg(name, fallback) {
  const i = argv.indexOf(name);
  if (i === -1) return fallback;
  return argv[i + 1];
}
function flag(name) { return argv.includes(name); }

const PDF_PATH = arg('--pdf', path.join(os.homedir(), 'Downloads', 'CCNA 200-301 Official Cert Guide Library.pdf'));
const OUT_PATH = arg('--out', path.join(__dirname, '..', 'data', 'book-refs', 'ocg-by-objective.json'));
const KEYS_ENV = path.join(os.homedir(), '.config', 'keys', 'global.env');
const MAX_CHAPTERS = Number(arg('--max-chapters', '0')) || Infinity;
const DRY_RUN = flag('--dry-run');
const GEMINI_MODEL = arg('--gemini-model', 'gemini-1.5-flash');
const VOL_FILTER = flag('--vol1-only') ? 1 : flag('--vol2-only') ? 2 : null;

// ----- helpers -----
function loadEnvKey(name) {
  if (process.env[name]) return process.env[name];
  if (!fs.existsSync(KEYS_ENV)) return null;
  const lines = fs.readFileSync(KEYS_ENV, 'utf8').split('\n');
  for (const line of lines) {
    const m = line.match(/^\s*(?:export\s+)?([A-Z0-9_]+)\s*=\s*['"]?([^'"]+?)['"]?\s*$/i);
    if (m && m[1] === name) return m[2];
  }
  return null;
}

function which(cmd) {
  const r = spawnSync('which', [cmd], { encoding: 'utf8' });
  return r.status === 0 ? r.stdout.trim() : null;
}

function ensureDeps() {
  if (!which('pdftotext')) {
    console.error('ERROR: pdftotext not found. Install with: brew install poppler');
    process.exit(2);
  }
  if (!fs.existsSync(PDF_PATH)) {
    console.error(`ERROR: PDF not found at ${PDF_PATH}`);
    process.exit(2);
  }
}

function pdfToText(pdfPath) {
  // -layout preserves chapter heading structure; -enc UTF-8 keeps glyphs sane.
  const tmp = path.join(os.tmpdir(), `ocg-${Date.now()}.txt`);
  execFileSync('pdftotext', ['-layout', '-enc', 'UTF-8', pdfPath, tmp], { stdio: 'inherit' });
  const text = fs.readFileSync(tmp, 'utf8');
  fs.unlinkSync(tmp);
  return text;
}

// Detect chapter boundaries. CCNA OCG uses headings like
//   "CHAPTER 4" on one line then "IP Routing Concepts" on the next.
// Volume detection: split point usually around halfway; we also look for
// "Volume 2" boundary marker. Chapter numbers reset at volume 2.
function chunkByChapter(text) {
  const lines = text.split('\n');
  const chunks = [];
  let current = null;
  let volume = 1;
  let lastChapterNum = 0;

  const chapterRe = /^\s*CHAPTER\s+(\d+)\s*$/i;
  const vol2MarkerRe = /^\s*VOLUME\s+2\s*$/i;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (vol2MarkerRe.test(line)) {
      volume = 2;
      lastChapterNum = 0;
      continue;
    }

    const m = line.match(chapterRe);
    if (m) {
      const num = parseInt(m[1], 10);
      // Heuristic: chapter numbers monotonic within volume; reset detected → vol bump.
      if (num <= lastChapterNum && lastChapterNum > 5 && volume === 1) {
        volume = 2;
      }
      lastChapterNum = num;
      // Title is usually next non-empty line.
      let title = '';
      for (let j = i + 1; j < Math.min(i + 6, lines.length); j++) {
        const t = lines[j].trim();
        if (t) { title = t; break; }
      }
      // Estimate page from "Page" markers nearby (pdftotext layout tends to insert form-feeds).
      if (current) chunks.push(current);
      current = {
        chapter: `Ch.${num}`,
        title,
        volume,
        page: null,
        text: ''
      };
      continue;
    }

    if (current) current.text += line + '\n';
  }
  if (current) chunks.push(current);

  // Page detection: pdftotext emits form-feed (\f) between pages.
  // Re-scan original text to assign first-page-of-chapter to each chunk.
  // Simpler approach: count form-feeds up to chapter heading.
  return chunks;
}

function inferPageNumbers(rawText, chunks) {
  // Walk rawText, count \f occurrences before each chapter heading.
  const offsets = [];
  let formFeeds = 0;
  let cursor = 0;
  for (const c of chunks) {
    const headingRe = new RegExp(`CHAPTER\\s+${c.chapter.replace('Ch.', '')}\\b`, 'i');
    const idx = rawText.indexOf(c.chapter.replace('Ch.', '') + '\n', cursor);
    // approximate: find first occurrence after cursor
    const fallbackIdx = rawText.search(headingRe);
    const useIdx = fallbackIdx > cursor ? fallbackIdx : idx > 0 ? idx : cursor;
    formFeeds = (rawText.slice(0, useIdx).match(/\f/g) || []).length;
    c.page = formFeeds + 1;
    cursor = useIdx + 1;
  }
  return chunks;
}

function extractTwoParagraphs(text) {
  // Pick first two prose-looking paragraphs (>= 200 chars, no all-caps headers, no table-of-contents lines).
  const paras = text
    .split(/\n\s*\n/)
    .map(p => p.replace(/\s+/g, ' ').trim())
    .filter(p => p.length >= 180 && p.length <= 900)
    .filter(p => !/^[A-Z0-9 ,.\-]+$/.test(p))
    .filter(p => !/\.{4,}/.test(p))  // skip TOC dot leaders
    .slice(0, 2);
  return paras;
}

async function classifyWithGemini(apiKey, chunk) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  const prompt = `You are classifying a chapter from the Cisco CCNA 200-301 Official Cert Guide against the official exam blueprint.

Chapter: ${chunk.chapter} — ${chunk.title}
Volume: ${chunk.volume}
First 1500 chars:
"""
${chunk.text.slice(0, 1500)}
"""

Output ONLY a JSON array of CCNA 200-301 blueprint objective IDs this chapter covers (e.g. ["1.1","1.2"]). Use IDs like "1.1", "2.4.b", "3.2.a". No prose, no markdown fencing.`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0, maxOutputTokens: 100 }
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini ${res.status}: ${err.slice(0, 200)}`);
  }
  const json = await res.json();
  const txt = json?.candidates?.[0]?.content?.parts?.[0]?.text || '[]';
  const cleaned = txt.replace(/```json|```/g, '').trim();
  try {
    const ids = JSON.parse(cleaned);
    return Array.isArray(ids) ? ids.filter(s => /^\d+(\.\d+)+[a-z]?$/i.test(s)) : [];
  } catch {
    return [];
  }
}

async function main() {
  ensureDeps();
  const apiKey = loadEnvKey('GEMINI_API_KEY') || loadEnvKey('GOOGLE_API_KEY');
  if (!apiKey && !DRY_RUN) {
    console.error('ERROR: GEMINI_API_KEY not found in ~/.config/keys/global.env (use --dry-run to skip classification)');
    process.exit(2);
  }

  console.log(`[1/4] Reading PDF: ${PDF_PATH}`);
  const raw = pdfToText(PDF_PATH);
  console.log(`      ${raw.length.toLocaleString()} chars extracted`);

  console.log('[2/4] Chunking by chapter');
  let chunks = chunkByChapter(raw);
  chunks = inferPageNumbers(raw, chunks);
  if (VOL_FILTER) chunks = chunks.filter(c => c.volume === VOL_FILTER);
  if (chunks.length > MAX_CHAPTERS) chunks = chunks.slice(0, MAX_CHAPTERS);
  console.log(`      ${chunks.length} chapters detected`);

  console.log('[3/4] Classifying chapters' + (DRY_RUN ? ' (DRY RUN — no API calls)' : ''));
  const byObjective = {};
  for (let i = 0; i < chunks.length; i++) {
    const c = chunks[i];
    const paragraphs = extractTwoParagraphs(c.text);
    let objectiveIds = [];
    if (!DRY_RUN) {
      try {
        objectiveIds = await classifyWithGemini(apiKey, c);
      } catch (e) {
        console.warn(`      [WARN] ${c.chapter} classify failed: ${e.message}`);
      }
      // gentle pacing
      await new Promise(r => setTimeout(r, 350));
    }
    const entry = {
      chapter: c.chapter,
      title: c.title,
      page: c.page,
      paragraphs,
      volume: c.volume
    };
    process.stdout.write(`\r      ${i + 1}/${chunks.length}  ${c.chapter} → ${objectiveIds.join(',') || '(none)'}        `);
    for (const id of objectiveIds) {
      if (!byObjective[id]) byObjective[id] = [];
      byObjective[id].push(entry);
    }
  }
  process.stdout.write('\n');

  console.log(`[4/4] Writing ${OUT_PATH}`);
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(byObjective, null, 2));
  const objCount = Object.keys(byObjective).length;
  console.log(`      ${objCount} objectives populated`);
}

main().catch(e => {
  console.error('FAIL:', e);
  process.exit(1);
});
