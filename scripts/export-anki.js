#!/usr/bin/env node
/**
 * export-anki.js — Build Anki-importable TSV deck from CCNA Key Terms.
 *
 * Reads: data/subtopic-content-{d12,d34,d56}.js
 * Writes: exports/ccna-key-terms.tsv (import in Anki: File → Import)
 *
 * Handles two micro shapes:
 *   - Glossary entry: { id, term, def, weight }
 *   - Deep lesson:    { id, term, info, hack, weight }
 *
 * Output columns (tab-separated):
 *   Front | Back (HTML) | Tags (space-separated)
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
  const tmp = path.join(ROOT, `.tmp-${path.basename(entry.file)}.cjs`);
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
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function firstParagraph(html) {
  const m = String(html || '').match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  return m ? stripHtml(m[1]) : stripHtml(html);
}

function escapeTsv(s) {
  return String(s || '')
    .replace(/\t/g, ' ')
    .replace(/\r?\n/g, ' ')
    .trim();
}

const terms = [];

for (const entry of DATA_FILES) {
  const data = loadData(entry);
  for (const [subId, sub] of Object.entries(data)) {
    if (!sub.micro || !Array.isArray(sub.micro)) continue;
    for (const m of sub.micro) {
      let back;
      if (m.def) {
        // Glossary entry
        back = m.def;
      } else if (m.info) {
        // Deep lesson — use first paragraph as concise back
        back = firstParagraph(m.info);
      } else {
        continue;
      }
      // Add memory hook if present (deep lessons)
      if (m.hack && m.hack.memory) {
        back += ` <br><br><i>Memory:</i> ${m.hack.memory}`;
      }
      back += ` <br><br><span style="color:#888">${m.id} · weight: ${m.weight || 'med'}</span>`;

      const domain = m.id.split('.')[0];
      const topic = m.id.split('.').slice(0, 2).join('.');
      const weight = m.weight || 'med';
      const tags = [
        'ccna',
        `domain${domain}`,
        `topic${topic}`,
        `subtopic${subId}`,
        `weight_${weight}`,
      ].join(' ');

      terms.push({
        id: m.id,
        front: m.term,
        back,
        tags,
      });
    }
  }
}

// Sort by ID (natural order: 1.1.a.1 → 6.7.e.5)
terms.sort((a, b) => {
  const parse = id => id.split('.').map(p => /^\d+$/.test(p) ? parseInt(p, 10) : p.charCodeAt(0));
  const pa = parse(a.id);
  const pb = parse(b.id);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    if (pa[i] !== pb[i]) return (pa[i] || 0) - (pb[i] || 0);
  }
  return 0;
});

// Write TSV
const outPath = path.join(ROOT, 'exports', 'ccna-key-terms.tsv');
const header = ['Front', 'Back', 'Tags'].join('\t');
const body = terms.map(t => [escapeTsv(t.front), escapeTsv(t.back), escapeTsv(t.tags)].join('\t'));
const tsv = [header, ...body].join('\n') + '\n';

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, tsv, 'utf8');

// Stats
const byWeight = terms.reduce((acc, t) => {
  const w = t.tags.match(/weight_(\w+)/)[1];
  acc[w] = (acc[w] || 0) + 1;
  return acc;
}, {});
const byDomain = terms.reduce((acc, t) => {
  const d = t.tags.match(/domain(\d+)/)[1];
  acc[d] = (acc[d] || 0) + 1;
  return acc;
}, {});

console.log(`Wrote ${terms.length} cards to ${path.relative(ROOT, outPath)}`);
console.log('By weight:', byWeight);
console.log('By domain:', byDomain);
