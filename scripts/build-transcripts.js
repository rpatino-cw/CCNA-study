#!/usr/bin/env node
/**
 * build-transcripts.js
 *
 * Validates and reports on the per-objective transcript pipeline.
 *
 * Reads data/transcript-objective-map.json, walks every objective entry,
 * confirms the referenced clean transcript file exists, counts words +
 * paragraph anchors, and writes a manifest at
 * data/jeremy-transcripts/clean/manifest.json that the live page can fetch
 * without re-scanning the disk on every load.
 *
 * Run from the repo root:
 *   node scripts/build-transcripts.js
 *
 * Exits non-zero if any referenced transcript is missing or empty so that
 * the pre-push smoke pipeline catches regressions before they hit Pages.
 */
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const MAP_PATH = path.join(REPO_ROOT, 'data', 'transcript-objective-map.json');
const CLEAN_DIR = path.join(REPO_ROOT, 'data', 'jeremy-transcripts', 'clean');
const MANIFEST_PATH = path.join(CLEAN_DIR, 'manifest.json');

function readJSON(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function countWords(text) {
  return (text.trim().match(/\S+/g) || []).length;
}

function extractAnchors(text) {
  const found = [];
  const re = /^\[([a-z0-9-]+)\]\s*$/gm;
  let m;
  while ((m = re.exec(text)) !== null) found.push(m[1]);
  return found;
}

function main() {
  if (!fs.existsSync(MAP_PATH)) {
    console.error(`✗ missing map file: ${MAP_PATH}`);
    process.exit(1);
  }
  const map = readJSON(MAP_PATH);
  const entries = Object.entries(map.objectives || {});
  if (entries.length === 0) {
    console.error('✗ map has no objectives');
    process.exit(1);
  }

  const manifest = { generated: new Date().toISOString(), objectives: {} };
  let failed = 0;

  for (const [objId, entry] of entries) {
    const tFile = entry.transcriptFile;
    if (!tFile) {
      console.error(`✗ ${objId}: no transcriptFile`);
      failed++;
      continue;
    }
    const abs = path.join(REPO_ROOT, tFile);
    if (!fs.existsSync(abs)) {
      console.error(`✗ ${objId}: missing ${tFile}`);
      failed++;
      continue;
    }
    const text = fs.readFileSync(abs, 'utf8');
    const words = countWords(text);
    if (words < 200) {
      console.error(`✗ ${objId}: transcript too short (${words} words)`);
      failed++;
      continue;
    }
    const anchorsFound = extractAnchors(text);
    const anchorsExpected = entry.anchors || [];
    const missingAnchors = anchorsExpected.filter(a => !anchorsFound.includes(a));
    if (missingAnchors.length) {
      console.error(`✗ ${objId}: missing anchors ${missingAnchors.join(', ')}`);
      failed++;
      continue;
    }

    manifest.objectives[objId] = {
      title: entry.title,
      transcriptFile: tFile,
      words,
      anchors: anchorsFound,
      forbiddenTerms: entry.forbiddenTerms || [],
    };
    console.log(`✓ ${objId}: ${entry.title} — ${words} words, ${anchorsFound.length} anchors`);
  }

  if (!fs.existsSync(CLEAN_DIR)) fs.mkdirSync(CLEAN_DIR, { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`→ wrote manifest: ${path.relative(REPO_ROOT, MANIFEST_PATH)}`);

  if (failed) {
    console.error(`\n✗ ${failed} objective(s) failed validation`);
    process.exit(1);
  }
  console.log(`\n✓ all ${entries.length} objective(s) validated`);
}

main();
