#!/usr/bin/env node
/**
 * export-anki-subnetting.js — Anki cloze deck for subnetting two-constraint Qs.
 *
 * Generates 3 card types per problem:
 *   1. Whole-question cloze (mask hidden)
 *   2. Bits-borrowed cloze (s hidden)
 *   3. Host-bits cloze (h hidden)
 *
 * Writes: exports/ccna-subnetting-cloze.txt (Anki cloze format, semicolon-delimited)
 * Import: Anki → File → Import → set delimiter to ";" + note type "Cloze".
 */

const fs = require('fs');
const path = require('path');

function bitsForSubnets(n) { let b = 0; while (Math.pow(2, b) < n) b++; return b; }
function bitsForHosts(h) { let b = 0; while (Math.pow(2, b) - 2 < h) b++; return b; }
function prefixToMask(p) {
  const oct = [0,0,0,0]; let rem = p;
  for (let i = 0; i < 4; i++) { const t = Math.min(8, rem); oct[i] = (256 - Math.pow(2, 8 - t)) & 255; rem -= t; if (rem <= 0) break; }
  return oct.join('.');
}

const PROBLEMS = [
  { parent: '172.16.0.0', cidr: 16, subnets: 40, hosts: 830 },
  { parent: '10.0.0.0', cidr: 8, subnets: 1000, hosts: 50 },
  { parent: '192.168.0.0', cidr: 16, subnets: 6, hosts: 4000 },
  { parent: '172.16.0.0', cidr: 16, subnets: 100, hosts: 500 },
  { parent: '10.0.0.0', cidr: 8, subnets: 50, hosts: 1000 },
  { parent: '192.168.1.0', cidr: 24, subnets: 4, hosts: 50 },
  { parent: '172.20.0.0', cidr: 16, subnets: 25, hosts: 1500 },
  { parent: '10.10.0.0', cidr: 16, subnets: 200, hosts: 100 },
  { parent: '192.168.0.0', cidr: 22, subnets: 10, hosts: 50 },
  { parent: '172.16.0.0', cidr: 16, subnets: 14, hosts: 2000 },
  { parent: '10.0.0.0', cidr: 8, subnets: 500, hosts: 250 },
  { parent: '192.168.0.0', cidr: 16, subnets: 60, hosts: 200 },
  { parent: '172.16.0.0', cidr: 12, subnets: 100, hosts: 1000 },
  { parent: '10.0.0.0', cidr: 8, subnets: 30, hosts: 8000 },
  { parent: '192.168.5.0', cidr: 24, subnets: 8, hosts: 14 },
];

function buildCards(p) {
  const s = bitsForSubnets(p.subnets);
  const h = bitsForHosts(p.hosts);
  const newPrefix = p.cidr + s;
  if (p.cidr + s + h > 32) return null;
  const mask = prefixToMask(newPrefix);
  const total = Math.pow(2, s);
  const usable = Math.pow(2, h) - 2;
  const tag = `subnetting two-constraint p${p.cidr}`;

  const front = `Parent ${p.parent}/${p.cidr} — need ${p.subnets} subnets and ${p.hosts} hosts each.`;

  return [
    {
      front,
      back:
        `Borrow {{c1::${s}}} bits for subnets (2^${s} = ${total} ≥ ${p.subnets}).<br>` +
        `Keep {{c2::${h}}} host bits (2^${h} - 2 = ${usable} ≥ ${p.hosts}).<br>` +
        `Bit budget: ${p.cidr} + ${s} + ${h} = {{c3::${p.cidr + s + h}}} (≤ 32).<br>` +
        `New prefix: {{c4::/${newPrefix}}} → mask {{c5::${mask}}}.<br>` +
        `Result: {{c6::${total} subnets × ${usable} usable hosts}}.`,
      tag,
    },
  ];
}

function escAnki(s) {
  return String(s).replace(/"/g, '""');
}

const out = [];
out.push('# CCNA Subnetting Two-Constraint — Anki Cloze Deck');
out.push('# Import: Anki → File → Import → delimiter ";" → note type Cloze → field 1=Text, field 2=Extra, field 3=Tags');
out.push('# Format: "<Text>";"<Extra>";"<Tags>"');

let count = 0;
PROBLEMS.forEach((p) => {
  const cards = buildCards(p);
  if (!cards) return;
  cards.forEach((c) => {
    const text = `<b>${c.front}</b><br><br>${c.back}`;
    out.push(`"${escAnki(text)}";"";"${escAnki(c.tag)}"`);
    count++;
  });
});

const outDir = path.resolve(__dirname, '..', 'exports');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'ccna-subnetting-cloze.txt');
fs.writeFileSync(outPath, out.join('\n') + '\n');

console.log(`Wrote ${count} cloze notes (${PROBLEMS.length} problems × 1 multi-cloze each)`);
console.log(`File: ${path.relative(path.resolve(__dirname, '..'), outPath)}`);
console.log(`Each note has 6 cloze deletions → ${count * 6} cards in Anki.`);
