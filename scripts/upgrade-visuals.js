#!/usr/bin/env node
/**
 * upgrade-visuals.js — Sweep all subtopic-content-*.js micro entries and
 * upgrade their `visual` field to use specialty renderers when the lesson
 * term matches a known topic.
 *
 * Strategy:
 *   - Pattern-match each micro entry's `term` against known networking concepts.
 *   - Replace `visual.type` + `visual.params` with a specialty renderer variant.
 *   - Leaves untouched anything that doesn't match — safe, no data loss.
 *
 * Run:   node scripts/upgrade-visuals.js
 * Dry:   node scripts/upgrade-visuals.js --dry
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DRY = process.argv.includes('--dry');
const FILES = [
  'data/subtopic-content-d12.js',
  'data/subtopic-content-d34.js',
  'data/subtopic-content-d56.js'
];

// ── Specialty upgrades: each rule matches by regex on term. ─────────
// First match wins. Returns { type, params } or null to skip.
const RULES = [
  // ── Layer 3 / routing ───────────────────────────────────────────
  { re: /\b(routing table|rib|show ip route|forwarding information base|fib)\b/i, build: () => ({
    type: 'routing-table',
    params: {}
  })},
  { re: /\b(longest prefix match|lpm|best match)\b/i, build: () => ({
    type: 'routing-table',
    params: { lookup: '172.16.5.10', match: 2 }
  })},
  { re: /\bospf neighbor|ospf adjacency|2-way|exstart|exchange|loading|full state\b/i, build: () => ({
    type: 'ospf-neighbor',
    params: { current: 7 }
  })},
  { re: /\blsa|link.state advertisement|lsdb|link.state database\b/i, build: () => ({
    type: 'lsa-flood',
    params: { lsaType: 'LSA-1 Router' }
  })},

  // ── STP ─────────────────────────────────────────────────────────
  { re: /\bstp|spanning.tree|root bridge|rstp\b/i, build: (term) => {
    if (/port state|blocking|listening|learning|forwarding|disabled/i.test(term)) {
      return { type: 'rstp-states', params: { active: 4 } };
    }
    return { type: 'stp-tree', params: {} };
  }},

  // ── NAT ─────────────────────────────────────────────────────────
  { re: /\b(nat|pat|port address translation|inside.local|inside.global|outside.local|outside.global)\b/i, build: () => ({
    type: 'nat-table',
    params: {}
  })},

  // ── IPsec / VPN ─────────────────────────────────────────────────
  { re: /\bipsec|site.to.site vpn|ike|isakmp|esp|ah\b/i, build: () => ({
    type: 'ipsec-tunnel',
    params: {}
  })},

  // ── ACLs ────────────────────────────────────────────────────────
  { re: /\b(acl|access.?control.?list|permit|deny|implicit deny|wildcard mask|access-list)\b/i, build: (term) => {
    if (/wildcard|mask/i.test(term)) return null; // let binary-breakdown handle
    return { type: 'acl-ladder', params: {} };
  }},

  // ── HSRP / FHRP ─────────────────────────────────────────────────
  { re: /\b(hsrp|vrrp|glbp|fhrp|first.hop redundancy|virtual ip|virtual mac)\b/i, build: () => ({
    type: 'hsrp-failover',
    params: {}
  })},

  // ── DNS / DHCP ──────────────────────────────────────────────────
  { re: /\b(dora|dhcp.discover|dhcp.offer|dhcp.request|dhcp.ack|ip helper-address)\b/i, build: () => ({
    type: 'dhcp-dora',
    params: {}
  })},
  { re: /\b(dns|recursive|iterative|a record|aaaa record|cname|mx record|nslookup|resolver)\b/i, build: () => ({
    type: 'dns-resolution',
    params: { query: 'www.example.com' }
  })},

  // ── Subnetting ──────────────────────────────────────────────────
  { re: /\b(vlsm|subnet divide|subnet split)\b/i, build: () => ({
    type: 'subnet-divide',
    params: {}
  })},
  { re: /\bsubnet mask|prefix length|\/\d+|cidr\b/i, build: (term) => {
    const m = term.match(/\/(\d{1,2})/);
    const prefix = m ? parseInt(m[1]) : 24;
    return { type: 'subnet-ruler', params: { prefix } };
  }},

  // ── TCP / UDP / transport ───────────────────────────────────────
  { re: /\bthree.way handshake|syn|syn-ack|3-way\b/i, build: () => ({
    type: 'handshake',
    params: {
      leftLabel: 'Client', rightLabel: 'Server',
      steps: ['SYN →', '← SYN-ACK', 'ACK →'],
      extras: ['SEQ=100', 'SEQ=400 ACK=101', 'SEQ=101 ACK=401']
    }
  })},
  { re: /\bsliding window|tcp window|cumulative ack|retransmit|window size\b/i, build: () => ({
    type: 'tcp-window',
    params: {}
  })},

  // ── CDP / LLDP ──────────────────────────────────────────────────
  { re: /\b(cdp|lldp|link layer discovery|cisco discovery)\b/i, build: () => ({
    type: 'cdp-neighbor',
    params: {}
  })},

  // ── Wireless ────────────────────────────────────────────────────
  { re: /\b2\.4 ?ghz|5 ?ghz|channel 1|channel 6|channel 11|non.overlapping|cci|aci\b/i, build: () => ({
    type: 'rf-heatmap',
    params: {}
  })},
  { re: /\bwpa|wpa2|wpa3|aes.ccmp|sae|wep|tkip\b/i, build: () => ({
    type: 'shield',
    params: { items: ['WPA2 AES-CCMP', 'WPA3 SAE', 'PMF', '802.1X Enterprise'] }
  })},

  // ── EtherChannel ────────────────────────────────────────────────
  { re: /\betherchannel|lacp|pagp|port.channel|link aggregation\b/i, build: () => ({
    type: 'etherchannel',
    params: { links: 4, protocol: 'LACP' }
  })},

  // ── QoS ─────────────────────────────────────────────────────────
  { re: /\bqos|llq|cbwfq|wred|policing|shaping|dscp|classification|marking\b/i, build: () => ({
    type: 'qos-queues',
    params: {}
  })},

  // ── VLAN / trunk ────────────────────────────────────────────────
  { re: /\b802\.1q|trunk|tagged|native vlan|vlan tag\b/i, build: () => ({
    type: 'trunk-tagging',
    params: { leftVlan: 10, rightVlan: 10, native: 1 }
  })},
  { re: /\bvlan|broadcast domain|vtp\b/i, build: (term) => {
    if (/trunk|tagged|native/i.test(term)) return null;
    return { type: 'vlan-colors', params: {} };
  }},

  // ── MAC table / switching ───────────────────────────────────────
  { re: /\b(mac.address.table|cam table|mac learning|mac aging)\b/i, build: () => ({
    type: 'cam-table',
    params: {}
  })},

  // ── ARP ─────────────────────────────────────────────────────────
  { re: /\barp(?!.?inspection)|address resolution\b/i, build: () => ({
    type: 'arp-resolve',
    params: {}
  })},

  // ── Port security / L2 sec ──────────────────────────────────────
  { re: /\bport.security|sticky mac|protect|restrict|err.disabled/i, build: (term) => {
    const action = /shutdown/i.test(term) ? 'shutdown'
      : /restrict/i.test(term) ? 'restrict'
      : /protect/i.test(term) ? 'protect' : 'shutdown';
    return { type: 'port-security', params: { maxMacs: 2, action } };
  }},

  // ── Syslog ──────────────────────────────────────────────────────
  { re: /\bsyslog|severity|emergency|alert|critical|notification|informational|debug(?:ging)?\b/i, build: () => ({
    type: 'syslog-severity',
    params: { active: 5 }
  })},

  // ── Traceroute / ping ───────────────────────────────────────────
  { re: /\btraceroute|tracert|hop.by.hop|ttl exhaust|icmp time exceeded\b/i, build: () => ({
    type: 'traceroute-ladder',
    params: {}
  })},

  // ── PKI / cert ──────────────────────────────────────────────────
  { re: /\b(x\.?509|ca|certificate authority|pki|trust chain|root ca|intermediate|leaf cert)\b/i, build: () => ({
    type: 'cert-chain',
    params: {}
  })},

  // ── Wireshark packet decode ─────────────────────────────────────
  { re: /\bpacket capture|wireshark|packet decode|frame analysis|pcap\b/i, build: () => ({
    type: 'wire-packet',
    params: {}
  })},

  // ── AAA ─────────────────────────────────────────────────────────
  { re: /\baaa|tacacs|radius|authentication authorization accounting\b/i, build: () => ({
    type: 'aaa-flow',
    params: {}
  })},

  // ── REST / JSON / automation ────────────────────────────────────
  { re: /\b(rest|restful|api|crud|http verb|get request|post request|put request|patch|delete)\b/i, build: () => ({
    type: 'api-request',
    params: {}
  })},
  { re: /\bjson|javascript object notation|json-encoded\b/i, build: () => ({
    type: 'json-tree',
    params: {}
  })},

  // ── Spine-leaf DC fabric ────────────────────────────────────────
  { re: /\b(spine.leaf|data center fabric|ecmp|east.west|vxlan)\b/i, build: () => ({
    type: 'spine-leaf',
    params: { spines: 3, leaves: 4 }
  })},

  // ── EIGRP metric ────────────────────────────────────────────────
  { re: /\beigrp metric|composite metric|feasible distance|reported distance|k-values\b/i, build: () => ({
    type: 'eigrp-metric',
    params: {}
  })}
];

function upgradeVisual(term, existing) {
  for (const rule of RULES) {
    if (rule.re.test(term)) {
      const upgrade = rule.build(term);
      if (upgrade) return upgrade;
    }
  }
  return null;
}

/**
 * Replace a visual object literal in source. Matches `visual: { ... }` (balanced braces).
 */
function replaceVisual(source, microOffset, newVisual) {
  // Find `visual:` after microOffset
  const visIdx = source.indexOf('visual:', microOffset);
  if (visIdx === -1) return null;
  // Skip whitespace to find opening brace
  let i = visIdx + 'visual:'.length;
  while (i < source.length && /\s/.test(source[i])) i++;
  if (source[i] !== '{') return null;
  // Match braces
  let depth = 1;
  let j = i + 1;
  while (j < source.length && depth > 0) {
    const c = source[j];
    if (c === '"' || c === "'") {
      const q = c;
      j++;
      while (j < source.length) {
        if (source[j] === '\\') { j += 2; continue; }
        if (source[j] === q) break;
        j++;
      }
    } else if (c === '{') depth++;
    else if (c === '}') depth--;
    j++;
  }
  // j is now after closing }
  const before = source.slice(0, i);
  const after = source.slice(j);
  return before + formatVisual(newVisual) + after;
}

function formatVisual(v) {
  function fmtVal(val) {
    if (val === null) return 'null';
    if (typeof val === 'number' || typeof val === 'boolean') return String(val);
    if (typeof val === 'string') return '"' + val.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
    if (Array.isArray(val)) return '[' + val.map(fmtVal).join(', ') + ']';
    if (typeof val === 'object') {
      const entries = Object.entries(val);
      if (entries.length === 0) return '{}';
      return '{ ' + entries.map(([k, vv]) => `${k}: ${fmtVal(vv)}`).join(', ') + ' }';
    }
    return 'null';
  }
  return `{ type: "${v.type}", params: ${fmtVal(v.params || {})} }`;
}

// ── Walk each file: find every `{ id: "X", term: "Y", weight: "Z", info: ..., visual: {...}, hack: ... }` entry ─
let totalUpgrades = 0;
const stats = {};

for (const file of FILES) {
  const fullPath = path.join(ROOT, file);
  let source = fs.readFileSync(fullPath, 'utf8');
  let upgrades = 0;
  stats[file] = { upgrades: 0, byType: {} };

  // Find each `term: "..."` inside micro entries. We scan for `id: "` followed later by `term: "`.
  // Each match is one entry. After extracting term, we find the matching visual block.
  const entryRe = /\bid:\s*"([^"]+)"\s*,\s*term:\s*"([^"]+)"/g;
  const entries = [];
  let m;
  while ((m = entryRe.exec(source)) !== null) {
    entries.push({ id: m[1], term: m[2], startIdx: m.index });
  }

  // Process in reverse so offsets don't shift
  for (let e = entries.length - 1; e >= 0; e--) {
    const { id, term, startIdx } = entries[e];
    const upgrade = upgradeVisual(term);
    if (!upgrade) continue;
    const newSrc = replaceVisual(source, startIdx, upgrade);
    if (newSrc) {
      source = newSrc;
      upgrades++;
      stats[file].byType[upgrade.type] = (stats[file].byType[upgrade.type] || 0) + 1;
    }
  }

  stats[file].upgrades = upgrades;
  totalUpgrades += upgrades;

  if (!DRY && upgrades > 0) {
    fs.writeFileSync(fullPath, source);
  }
  console.log(`${file}: ${upgrades} visuals upgraded${DRY ? ' (dry)' : ''}`);
}

console.log(`\nTotal upgrades: ${totalUpgrades}`);
console.log('\nBy renderer type:');
const agg = {};
for (const f of Object.values(stats)) {
  for (const [t, n] of Object.entries(f.byType)) {
    agg[t] = (agg[t] || 0) + n;
  }
}
Object.entries(agg).sort((a, b) => b[1] - a[1]).forEach(([t, n]) => {
  console.log(`  ${t.padEnd(22)} ${n}`);
});
