#!/usr/bin/env node
/**
 * generate-term-mcqs.js — Auto-generate MCQs from HIGH-weight Key Terms.
 *
 * Reads: data/subtopic-content-{d12,d34,d56}.js
 * Writes: data/term-mcqs.json — used by term-drill.html
 *
 * Two templates per term (when data allows):
 *   A) "Which best describes [term]?" — correct = def, distractors = 3 similar defs
 *   B) "Which term is described by: '[def]'?" — correct = term, distractors = 3 similar terms
 *
 * Distractor selection: prefer same subtopic > same topic > same domain.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA_FILES = [
  { file: 'data/subtopic-content-d12.js', varName: 'subtopicContentD12' },
  { file: 'data/subtopic-content-d34.js', varName: 'subtopicContentD34' },
  { file: 'data/subtopic-content-d56.js', varName: 'subtopicContentD56' },
];

function loadData(entry) {
  const src = fs.readFileSync(path.join(ROOT, entry.file), 'utf8');
  const tmp = path.join(ROOT, `.tmp-${path.basename(entry.file)}-mcq.cjs`);
  fs.writeFileSync(tmp, src.replace(`window.${entry.varName} =`, 'module.exports ='));
  delete require.cache[require.resolve(tmp)];
  const mod = require(tmp);
  fs.unlinkSync(tmp);
  return mod;
}

function stripHtml(html) {
  return String(html || '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/p>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function firstSentence(text) {
  const t = stripHtml(text);
  const m = t.match(/^.{20,200}?[.!?](\s|$)/);
  return m ? m[0].trim() : t.slice(0, 200);
}

function firstParagraph(html) {
  const m = String(html || '').match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  return stripHtml(m ? m[1] : html);
}

function truncate(s, n) {
  if (s.length <= n) return s;
  return s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…';
}

// ── Load all terms flat ──
const allTerms = [];
for (const entry of DATA_FILES) {
  const data = loadData(entry);
  for (const [subId, sub] of Object.entries(data)) {
    if (!sub.micro || !Array.isArray(sub.micro)) continue;
    for (const m of sub.micro) {
      const defText = m.def || (m.info ? firstParagraph(m.info) : null);
      if (!defText) continue;
      allTerms.push({
        id: m.id,
        term: m.term,
        def: defText,
        weight: m.weight || 'med',
        subId,
        topicId: m.id.split('.').slice(0, 2).join('.'),
        domainId: m.id.split('.')[0],
      });
    }
  }
}

console.log(`Loaded ${allTerms.length} terms total`);

// ── Pick distractors: prefer same subtopic > topic > domain > random ──
function pickDistractors(target, count = 3, valueKey = 'def') {
  const pool = allTerms.filter(t => t.id !== target.id);
  const sameSubtopic = pool.filter(t => t.subId === target.subId);
  const sameTopic    = pool.filter(t => t.topicId === target.topicId && t.subId !== target.subId);
  const sameDomain   = pool.filter(t => t.domainId === target.domainId && t.topicId !== target.topicId);
  const other        = pool.filter(t => t.domainId !== target.domainId);

  const tiers = [sameSubtopic, sameTopic, sameDomain, other];
  const seen = new Set([target[valueKey]]);
  const picked = [];

  for (const tier of tiers) {
    const shuffled = [...tier].sort(() => Math.random() - 0.5);
    for (const t of shuffled) {
      if (picked.length >= count) break;
      const v = t[valueKey];
      if (seen.has(v)) continue;
      seen.add(v);
      picked.push(t);
    }
    if (picked.length >= count) break;
  }

  return picked.slice(0, count);
}

function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ── Filter to HIGH terms for drills ──
const highTerms = allTerms.filter(t => t.weight === 'high');
console.log(`HIGH-weight terms (drill pool): ${highTerms.length}`);

const questions = [];

// Template A: Which best describes [term]?
for (const term of highTerms) {
  const distractors = pickDistractors(term, 3, 'def');
  if (distractors.length < 3) continue;
  const correctDef = truncate(term.def, 300);
  const options = [correctDef, ...distractors.map(d => truncate(d.def, 300))];
  shuffleInPlace(options);
  questions.push({
    id: `tmcq-a-${term.id}`,
    tpl: 'A',
    subtopic: term.subId,
    topic: term.topicId,
    domain: term.domainId,
    termId: term.id,
    question: `Which best describes "${term.term}"?`,
    options,
    correctIndex: options.indexOf(correctDef),
    explanation: `${term.id} · weight ${term.weight}. ${term.term}: ${term.def}`,
  });
}

// Template B: Which term is described by "[def]"?
for (const term of highTerms) {
  const distractors = pickDistractors(term, 3, 'term');
  if (distractors.length < 3) continue;
  const stem = firstSentence(term.def);
  if (!stem || stem.length < 30) continue;
  const options = [term.term, ...distractors.map(d => d.term)];
  shuffleInPlace(options);
  questions.push({
    id: `tmcq-b-${term.id}`,
    tpl: 'B',
    subtopic: term.subId,
    topic: term.topicId,
    domain: term.domainId,
    termId: term.id,
    question: `Which term is best described by: "${stem}"`,
    options,
    correctIndex: options.indexOf(term.term),
    explanation: `${term.id} · weight ${term.weight}. ${term.term}: ${term.def}`,
  });
}

console.log(`Generated ${questions.length} MCQs (${questions.filter(q => q.tpl === 'A').length} template A + ${questions.filter(q => q.tpl === 'B').length} template B)`);

// Stats by domain
const byDomain = questions.reduce((acc, q) => {
  acc[q.domain] = (acc[q.domain] || 0) + 1;
  return acc;
}, {});
console.log('By domain:', byDomain);

// Write JSON
const outPath = path.join(ROOT, 'data', 'term-mcqs.json');
fs.writeFileSync(outPath, JSON.stringify({ questions, generated: new Date().toISOString() }, null, 2));
console.log(`Wrote ${path.relative(ROOT, outPath)}`);
