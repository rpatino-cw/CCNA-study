#!/usr/bin/env node
// Aggregates ~/dev/CCNA_study/data/anki-cards/*.json into data/jeremy-data.js
// Exposes ANKI_JEREMY_SECTIONS and ANKI_JEREMY_CARDS to flashcards.html.

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'data', 'anki-cards');
const OUT_FILE = path.join(__dirname, '..', 'data', 'jeremy-data.js');
const INDEX_FILE = path.join(__dirname, '..', 'data', 'anki-cards-index.json');

const idx = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8'));
// Build slug -> apkg-filename reverse map for stable section names
const slugToFile = {};
for (const [file, slug] of Object.entries(idx)) slugToFile[slug] = file;

const files = fs.readdirSync(SRC_DIR).filter(f => f.endsWith('.json')).sort();

const sections = [];
const cards = [];
let cardId = 9000000;

function dayKey(slug) {
  // day-01-flashcards---network-devices -> 'j01'
  // day-11-part-1-flashcards-... -> 'j11p1'
  // day-21-1-flashcards-... -> 'j21p1'
  // day-25-flashcards-1-... -> 'j25p1' (sub-part appears after 'flashcards-')
  const m = slug.match(/^day-(\d+)(?:-(\d+))?(?:-part-(\d+))?-flashcards(?:-(\d+))?/i);
  if (!m) return 'j_' + slug.slice(0, 16);
  const main = m[1].padStart(2, '0');
  const sub = m[2] || m[3] || m[4];
  return 'j' + main + (sub ? 'p' + sub : '');
}

function prettyName(file) {
  // "Day 01 Flashcards - Network Devices.apkg" -> "Day 01 — Network Devices"
  return file
    .replace(/\.apkg$/, '')
    .replace(/\s*Flashcards\s*-\s*/i, ' — ')
    .replace(/\s+/g, ' ')
    .trim();
}

function fixMediaPaths(html, slug) {
  // Source JSON already has full data/anki-media/<slug>/file.JPG paths — pass through unchanged.
  return html;
}

for (const f of files) {
  const slug = f.replace(/\.json$/, '');
  const apkgName = slugToFile[slug] || prettyName(f);
  const data = JSON.parse(fs.readFileSync(path.join(SRC_DIR, f), 'utf8'));
  const sectionId = dayKey(slug);
  const sectionName = prettyName(apkgName);

  sections.push({ id: sectionId, name: sectionName, count: data.cards.length });

  for (const c of data.cards) {
    cardId += 1;
    const front = (c.front || '').includes('<img')
      ? fixMediaPaths(c.front, slug)
      : (c.front || '');
    cards.push({
      id: cardId,
      type: 'jeremy',
      section: sectionId,
      front: front,
      back: c.back || '',
      tag: c.tags || '',
      hint: '',
      explanation: ''
    });
  }
}

// Jeremy day-section → CCNA 200-301 domain/objective mapping
// Domain 1 Network Fundamentals · 2 Network Access · 3 IP Connectivity
// Domain 4 IP Services · 5 Security · 6 Automation
const JEREMY_OBJECTIVES = {
  j01:   { domain: '1', objectives: ['1.1'] },  // Network Devices
  j02:   { domain: '1', objectives: ['1.3'] },  // Interfaces and Cables
  j03:   { domain: '1', objectives: ['1.5'] },  // TCP/IP
  j04:   { domain: '1', objectives: ['1.0'] },  // Intro to CLI
  j05:   { domain: '1', objectives: ['1.6'] },  // Ethernet LAN Switching Part 1
  j06:   { domain: '1', objectives: ['1.6'] },  // Ethernet LAN Switching Part 2
  j07:   { domain: '1', objectives: ['1.6', '1.7'] }, // IPv4 Addresses Part 1
  j08:   { domain: '1', objectives: ['1.6', '1.7'] }, // IPv4 Addresses Part 2
  j09:   { domain: '2', objectives: ['2.1'] },  // Switch Interfaces
  j10:   { domain: '1', objectives: ['1.6'] },  // IPv4 Header
  j11p1: { domain: '3', objectives: ['3.1'] },  // Routing Fundamentals
  j11p2: { domain: '3', objectives: ['3.3'] },  // Static Routing
  j13:   { domain: '1', objectives: ['1.6'] },  // Subnetting
  j16:   { domain: '2', objectives: ['2.1'] },  // VLANs Part 1
  j17:   { domain: '2', objectives: ['2.1'] },  // VLANs Part 2
  j18:   { domain: '2', objectives: ['2.1'] },  // VLANs Part 3
  j19:   { domain: '2', objectives: ['2.1'] },  // DTP & VTP
  j20:   { domain: '2', objectives: ['2.5'] },  // STP Part 1
  j21:   { domain: '2', objectives: ['2.5'] },  // STP Part 2
  j21p1: { domain: '2', objectives: ['2.5'] },  // PortFast
  j21p2: { domain: '2', objectives: ['2.5'] },  // BPDU Guard/Filter
  j21p3: { domain: '2', objectives: ['2.5'] },  // Root Guard
  j21p4: { domain: '2', objectives: ['2.5'] },  // Loop Guard
  j22:   { domain: '2', objectives: ['2.5'] },  // Rapid STP
  j23:   { domain: '2', objectives: ['2.3'] },  // EtherChannel
  j24:   { domain: '3', objectives: ['3.4'] },  // Dynamic Routing
  j25p1: { domain: '3', objectives: ['3.4'] },  // RIP & EIGRP
  j25p2: { domain: '3', objectives: ['3.4'] },  // EIGRP Terms
  j26:   { domain: '3', objectives: ['3.4'] },  // OSPF Part 1
  j27:   { domain: '3', objectives: ['3.4'] },  // OSPF Part 2
  j28:   { domain: '3', objectives: ['3.4'] },  // OSPF Part 3
  j29:   { domain: '3', objectives: ['3.5'] },  // FHRPs
  j30:   { domain: '1', objectives: ['1.5'] },  // TCP & UDP
  j31:   { domain: '1', objectives: ['1.8', '1.9'] }, // IPv6 Part 1
  j32:   { domain: '1', objectives: ['1.8', '1.9'] }, // IPv6 Part 2
  j33:   { domain: '1', objectives: ['1.8', '1.9'] }, // IPv6 Part 3
  j34:   { domain: '5', objectives: ['5.6'] },  // Standard ACLs
  j35:   { domain: '5', objectives: ['5.6'] },  // Extended ACLs
  j36:   { domain: '4', objectives: ['4.5'] },  // CDP & LLDP
  j37:   { domain: '4', objectives: ['4.2'] },  // NTP
  j38:   { domain: '4', objectives: ['4.3'] },  // DNS
  j39:   { domain: '4', objectives: ['4.3'] },  // DHCP
  j40:   { domain: '4', objectives: ['4.4'] },  // SNMP
  j41:   { domain: '4', objectives: ['4.5'] },  // Syslog
  j42:   { domain: '5', objectives: ['5.3'] },  // SSH
  j43:   { domain: '4', objectives: ['4.9'] },  // FTP & TFTP
  j44:   { domain: '4', objectives: ['4.1'] },  // NAT Part 1
  j45:   { domain: '4', objectives: ['4.1'] },  // NAT Part 2
  j46:   { domain: '4', objectives: ['4.7'] },  // QoS Part 1
  j47:   { domain: '4', objectives: ['4.7'] },  // QoS Part 2
  j48:   { domain: '5', objectives: ['5.1'] },  // Security Fundamentals
  j49:   { domain: '5', objectives: ['5.7'] },  // Port Security
  j50:   { domain: '5', objectives: ['5.7'] },  // DHCP Snooping
  j51:   { domain: '5', objectives: ['5.7'] },  // Dynamic ARP Inspection
  j52:   { domain: '1', objectives: ['1.2'] },  // LAN Architectures
  j53:   { domain: '1', objectives: ['1.2'] },  // WAN Architectures
  j54p1: { domain: '1', objectives: ['1.12'] }, // Virtualization & Cloud
  j54p2: { domain: '1', objectives: ['1.12'] }, // Containers
  j54p3: { domain: '1', objectives: ['1.12'] }, // VRF
  j55:   { domain: '2', objectives: ['2.6'] },  // Wireless Fundamentals
  j56:   { domain: '2', objectives: ['2.7'] },  // Wireless Architectures
  j57:   { domain: '2', objectives: ['2.8'] },  // Wireless Security
  j58:   { domain: '2', objectives: ['2.9'] },  // Wireless Configuration
  j59p1: { domain: '6', objectives: ['6.1'] },  // Network Automation
  j59p2: { domain: '6', objectives: ['6.7'] },  // AI & ML
  j60:   { domain: '6', objectives: ['6.6'] },  // JSON, XML, YAML
  j61p1: { domain: '6', objectives: ['6.5'] },  // REST APIs
  j61p2: { domain: '6', objectives: ['6.5'] },  // REST Authentication
  j62:   { domain: '6', objectives: ['6.2'] },  // SDN
  j63p1: { domain: '6', objectives: ['6.6'] },  // Ansible/Puppet/Chef
  j63p2: { domain: '6', objectives: ['6.6'] }   // Terraform
};

// Warn for any section without a mapping
const unmapped = sections.filter(s => !JEREMY_OBJECTIVES[s.id]).map(s => s.id);
if (unmapped.length) console.warn('WARN unmapped sections:', unmapped.join(', '));

const header = `// ─────────────────────────────────────────────────────────────────────────────
//  CCNA_study — Jeremy's IT Lab Anki Card Data
//  ${cards.length} cards across ${sections.length} day-sections
//  Auto-generated by scripts/build-jeremy-data.js — do not edit by hand
// ─────────────────────────────────────────────────────────────────────────────
`;

const out = header +
  '\nconst ANKI_JEREMY_SECTIONS = ' + JSON.stringify(sections, null, 2) + ';\n' +
  '\nconst ANKI_JEREMY_CARDS = ' + JSON.stringify(cards) + ';\n' +
  '\nconst JEREMY_SECTION_OBJECTIVES = ' + JSON.stringify(JEREMY_OBJECTIVES, null, 2) + ';\n';

fs.writeFileSync(OUT_FILE, out);
console.log(`Wrote ${OUT_FILE}: ${sections.length} sections, ${cards.length} cards`);
