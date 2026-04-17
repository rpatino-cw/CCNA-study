#!/usr/bin/env node
/**
 * generate-study-plan.js — Build 60-day CCNA study schedule from Jeremy's IT Lab days.
 *
 * Output: data/study-plan.json — used by study-plan.html
 *
 * Structure: 8 weeks from today → exam. Each week has a theme + 5-6 study days + 1-2 rest.
 * Each study day: JITL day(s), focus domain/topic, Key Term review IDs, MCQ drill targets.
 */

const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

// Config
const EXAM_DATE = '2026-06-15';
const START_DATE = new Date(); // today
START_DATE.setHours(0, 0, 0, 0);

function fmt(d) {
  return d.toISOString().slice(0, 10);
}

function addDays(d, n) {
  const nd = new Date(d);
  nd.setDate(nd.getDate() + n);
  return nd;
}

function dayOfWeek(d) {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()];
}

// ── Jeremy's IT Lab → CCNA domain/topic mapping (source: community consensus) ──
// Each JITL day maps to one or more CCNA objectives.
const JITL_MAP = [
  { day: 1,  focus: 'Intro + networking fundamentals', topics: [],             drill: [] },
  { day: 2,  focus: 'OSI model + TCP/IP',              topics: ['1.1'],        drill: ['1.1'] },
  { day: 3,  focus: 'Ethernet + LAN fundamentals',     topics: ['1.3', '1.4'], drill: ['1.3'] },
  { day: 4,  focus: 'CLI basics + IOS',                topics: ['5.3'],        drill: [] },
  { day: 5,  focus: 'Cabling + Ethernet switching',    topics: ['1.3'],        drill: ['1.3'] },
  { day: 6,  focus: 'Switches — MAC, flooding, learning', topics: ['1.13'],    drill: ['1.13'] },
  { day: 7,  focus: 'Switch interface config',         topics: ['1.4'],        drill: ['1.4'] },
  { day: 8,  focus: 'Routing fundamentals',            topics: ['1.1', '3.2'], drill: ['3.1', '3.2'] },
  { day: 9,  focus: 'Interface troubleshooting',       topics: ['1.4'],        drill: ['1.4'] },
  { day: 10, focus: 'IPv4 header + addressing',        topics: ['1.6'],        drill: ['1.6'] },
  { day: 11, focus: 'Static routing',                  topics: ['3.3'],        drill: ['3.3'] },
  { day: 12, focus: 'IPv4 addressing review',          topics: ['1.6'],        drill: ['1.6'] },
  { day: 13, focus: 'Subnetting Part 1',               topics: ['1.6'],        drill: ['1.6'] },
  { day: 14, focus: 'Subnetting Part 2 (VLSM)',        topics: ['1.6'],        drill: ['1.6'] },
  { day: 15, focus: 'Routing fundamentals review',     topics: ['3.1', '3.2'], drill: ['3.1', '3.2'] },
  { day: 16, focus: 'VLANs Part 1',                    topics: ['2.1'],        drill: ['2.1'] },
  { day: 17, focus: 'VLANs + Trunks',                  topics: ['2.1', '2.2'], drill: ['2.1', '2.2'] },
  { day: 18, focus: 'Inter-VLAN routing',              topics: ['2.1', '2.2'], drill: ['2.1'] },
  { day: 19, focus: 'DTP + VTP',                       topics: ['2.2'],        drill: ['2.2'] },
  { day: 20, focus: 'STP Part 1',                      topics: ['2.5'],        drill: ['2.5'] },
  { day: 21, focus: 'STP Part 2',                      topics: ['2.5'],        drill: ['2.5'] },
  { day: 22, focus: 'STP Part 3 (RSTP + PortFast)',    topics: ['2.5'],        drill: ['2.5'] },
  { day: 23, focus: 'EtherChannel + TCP/UDP',          topics: ['2.4', '1.5'], drill: ['2.4', '1.5'] },
  { day: 24, focus: 'LAN architecture',                topics: ['1.2'],        drill: ['1.2'] },
  { day: 25, focus: 'OSPF Part 1',                     topics: ['3.4'],        drill: ['3.4'] },
  { day: 26, focus: 'OSPF Part 2',                     topics: ['3.4'],        drill: ['3.4'] },
  { day: 27, focus: 'OSPF Part 3 (default + verify)',  topics: ['3.4'],        drill: ['3.4'] },
  { day: 29, focus: 'FHRP (HSRP, VRRP, GLBP)',         topics: ['3.5'],        drill: ['3.5'] },
  { day: 31, focus: 'IPv6 Part 1',                     topics: ['1.8'],        drill: ['1.8'] },
  { day: 32, focus: 'IPv6 Part 2 (types, NDP)',        topics: ['1.9'],        drill: ['1.9'] },
  { day: 33, focus: 'IPv6 Part 3 (SLAAC, DHCPv6)',     topics: ['1.8'],        drill: ['1.8'] },
  { day: 34, focus: 'CDP + LLDP',                      topics: ['2.3'],        drill: ['2.3'] },
  { day: 35, focus: 'ACLs',                            topics: ['5.6'],        drill: ['5.6'] },
  { day: 37, focus: 'NTP',                             topics: ['4.2'],        drill: ['4.2'] },
  { day: 38, focus: 'DHCP',                            topics: ['4.3', '4.6'], drill: ['4.3'] },
  { day: 39, focus: 'DHCP + DNS',                      topics: ['4.3'],        drill: ['4.3'] },
  { day: 40, focus: 'Syslog + SNMP',                   topics: ['4.4', '4.5'], drill: ['4.4', '4.5'] },
  { day: 41, focus: 'Device management + SSH',         topics: ['2.8', '4.8'], drill: ['2.8', '4.8'] },
  { day: 42, focus: 'TFTP + FTP',                      topics: ['4.9'],        drill: ['4.9'] },
  { day: 43, focus: 'SSH config deep-dive',            topics: ['4.8'],        drill: ['4.8'] },
  { day: 44, focus: 'NAT + PAT',                       topics: ['4.1'],        drill: ['4.1'] },
  { day: 46, focus: 'QoS',                             topics: ['4.7'],        drill: ['4.7'] },
  { day: 47, focus: 'Private addressing + APIPA',      topics: ['1.7'],        drill: ['1.7'] },
  { day: 49, focus: 'Port security',                   topics: ['5.7'],        drill: ['5.7'] },
  { day: 50, focus: 'AAA',                             topics: ['5.8'],        drill: ['5.8'] },
  { day: 51, focus: 'Security fundamentals',           topics: ['5.1'],        drill: ['5.1'] },
  { day: 52, focus: 'Device hardening + passwords',    topics: ['5.3', '5.4'], drill: ['5.3', '5.4'] },
  { day: 53, focus: 'DHCP snooping + DAI',             topics: ['5.7'],        drill: ['5.7'] },
  { day: 54, focus: 'VPN + IPsec',                     topics: ['5.5'],        drill: ['5.5'] },
  { day: 55, focus: 'Wireless fundamentals (RF, SSID)', topics: ['1.11'],      drill: ['1.11'] },
  { day: 56, focus: 'Wireless architectures + security', topics: ['1.11', '2.6', '5.9'], drill: ['2.6', '5.9'] },
  { day: 57, focus: 'WLC + WLAN config',               topics: ['2.9', '5.10'], drill: ['2.9'] },
  { day: 58, focus: 'WLC deep-dive',                   topics: ['2.9', '5.10'], drill: ['5.10'] },
  { day: 60, focus: 'Network automation',              topics: ['6.1', '6.2'], drill: ['6.1', '6.2'] },
  { day: 61, focus: 'SDN + controllers',               topics: ['6.3'],        drill: ['6.3'] },
  { day: 62, focus: 'APIs + JSON + tools',             topics: ['6.5', '6.6', '6.7'], drill: ['6.5', '6.6', '6.7'] },
];

// Count days until exam
const examDate = new Date(EXAM_DATE + 'T00:00:00');
const daysUntilExam = Math.round((examDate - START_DATE) / (1000 * 60 * 60 * 24));

console.log(`Today: ${fmt(START_DATE)}`);
console.log(`Exam:  ${fmt(examDate)}`);
console.log(`Days until exam: ${daysUntilExam}`);

// Build plan: prioritize JITL days, put rest on Sundays, final week = practice only.
const plan = [];
const FINAL_REVIEW_DAYS = 7;
const contentDays = daysUntilExam - FINAL_REVIEW_DAYS - 1; // -1 for exam day

// Fit JITL_MAP (~55 entries) into contentDays. If short on time, combine into each day.
const perDay = Math.max(1, Math.ceil(JITL_MAP.length / contentDays));

let jIdx = 0;
for (let dayNum = 0; dayNum < contentDays; dayNum++) {
  const date = addDays(START_DATE, dayNum);
  const dow = dayOfWeek(date);
  const isRest = dow === 'Sun';

  if (isRest) {
    plan.push({
      day: dayNum + 1,
      date: fmt(date),
      dow,
      type: 'rest',
      focus: 'Rest / light review',
      tasks: ['Review any terms flagged in Anki this week', 'No heavy study — recharge'],
    });
    continue;
  }

  // Pick next 1-2 JITL days
  const items = [];
  for (let k = 0; k < perDay && jIdx < JITL_MAP.length; k++, jIdx++) {
    items.push(JITL_MAP[jIdx]);
  }

  const allTopics = [...new Set(items.flatMap(i => i.topics))];
  const allDrills = [...new Set(items.flatMap(i => i.drill))];
  const jitlLabel = items.map(i => `Day ${i.day}`).join(' + ');
  const focus = items.map(i => i.focus).join(' · ');

  const tasks = [
    `Watch Jeremy's IT Lab ${jitlLabel} (~${items.length * 20} min each)`,
  ];
  if (allTopics.length) {
    tasks.push(`Review Key Terms in topic(s): ${allTopics.join(', ')}`);
  }
  if (allDrills.length) {
    tasks.push(`Term-drill — ${allDrills.length * 10} MCQs filtered to: ${allDrills.join(', ')}`);
  }
  tasks.push('Anki: 20 new cards + all due reviews');

  plan.push({
    day: dayNum + 1,
    date: fmt(date),
    dow,
    type: 'study',
    focus,
    jitl: jitlLabel,
    topics: allTopics,
    drills: allDrills,
    tasks,
  });
}

// Final 7 days: review + practice exams
for (let i = 0; i < FINAL_REVIEW_DAYS; i++) {
  const date = addDays(START_DATE, contentDays + i);
  const dow = dayOfWeek(date);
  const templates = [
    { focus: 'Full Boson practice exam #1', tasks: ['Take a full 102-question timed exam', 'Review every wrong answer', 'Anki: all due reviews'] },
    { focus: 'Weakness drill', tasks: ['Term-drill: 50 MCQs from your worst 2 domains', 'Re-watch JITL videos for worst topics', 'Anki: all due reviews'] },
    { focus: 'Subnetting + AD speed drill', tasks: ['subnettingpractice.com — 30 min', 'Write AD table + subnet chart from memory', 'Term-drill: 30 MCQs from Domain 1'] },
    { focus: 'Full Boson practice exam #2', tasks: ['Take another timed exam', 'Score should be 825+ to be exam-ready', 'Review every wrong answer'] },
    { focus: 'Light review + rest', tasks: ['NO heavy study', 'Light Anki review', 'Walk, sleep, hydrate'] },
    { focus: 'Final cheat sheet', tasks: ['Write AD values, subnet chart, syslog levels from memory', 'Review wireless channels + STP timers', 'Early sleep'] },
    { focus: 'Rest (exam tomorrow)', tasks: ['NO studying', 'Early sleep', 'Prep exam-day logistics'] },
  ];
  const t = templates[i];
  plan.push({
    day: contentDays + i + 1,
    date: fmt(date),
    dow,
    type: 'review',
    focus: t.focus,
    tasks: t.tasks,
  });
}

// Exam day
plan.push({
  day: daysUntilExam,
  date: EXAM_DATE,
  dow: dayOfWeek(examDate),
  type: 'exam',
  focus: '🎯 CCNA EXAM DAY',
  tasks: ['Bring ID', 'Arrive early', 'Breathe', 'Trust the work'],
});

const outPath = path.join(ROOT, 'data', 'study-plan.json');
fs.writeFileSync(outPath, JSON.stringify({
  examDate: EXAM_DATE,
  startDate: fmt(START_DATE),
  totalDays: plan.length,
  contentDays,
  reviewDays: FINAL_REVIEW_DAYS,
  plan,
}, null, 2));

console.log(`Wrote ${plan.length}-day plan to ${path.relative(ROOT, outPath)}`);
console.log(`Content days: ${contentDays} · Review days: ${FINAL_REVIEW_DAYS}`);
const restCount = plan.filter(d => d.type === 'rest').length;
const studyCount = plan.filter(d => d.type === 'study').length;
console.log(`Study: ${studyCount} · Rest: ${restCount} · Review/exam: ${plan.length - studyCount - restCount}`);
