#!/usr/bin/env node
/* Pure-logic tests for the CLI-sim engine in js/cram-drills.js.
 * No deps. Run: node scripts/test-cli-sim.js  (wired into npm test + pre-push).
 * The headless browser OOMs on the dev box, so this file is the definition of
 * done for the engine: all grading is pure and proven here before any DOM. */
var assert = require('assert');
var E = require('../js/cram-drills.js');
var pass = 0;
function ok(name, cond) { assert.strictEqual(cond, true, 'FAIL: ' + name); pass++; }
function eq(name, a, b) { assert.deepStrictEqual(a, b, 'FAIL: ' + name + ' got ' + JSON.stringify(a)); pass++; }

// ---- canon(): normalize + idioms + prefix + interface + port alias ----
eq('strip prompt + interface id', E.cliCanon('  R1(config-if)# INT Gi0/1 '), 'interface gigabitethernet0/1');
eq('no shut idiom', E.cliCanon('R1(config-if)#no shut'), 'no shutdown');
eq('no shutdown stays', E.cliCanon('no shutdown'), 'no shutdown');
eq('bare shutdown stays (not show)', E.cliCanon('shutdown'), 'shutdown');
eq('conf t idiom', E.cliCanon('conf t'), 'configure terminal');
eq('bare sh -> show', E.cliCanon('sh ip route'), 'show ip route');
eq('sw mo acc', E.cliCanon('sw mo acc'), 'switchport mode access');
eq('switchport access vlan', E.cliCanon('sw acc vl 10'), 'switchport access vlan 10');
eq('ip address NOT ipv6', E.cliCanon('ip add 10.0.0.1 255.255.255.0'), 'ip address 10.0.0.1 255.255.255.0');
eq('interface short forms equal long', E.cliCanon('int g0/1'), E.cliCanon('interface gigabitethernet0/1'));
eq('int gi0/1 == int g0/1', E.cliCanon('int gi0/1'), E.cliCanon('int g0/1'));
eq('interface range', E.cliCanon('int range gi0/1-2'), 'interface range gigabitethernet0/1-2');
eq('port alias www->80', E.cliCanon('permit tcp any any eq www'), E.cliCanon('permit tcp any any eq 80'));
eq('router ospf network area', E.cliCanon('ro ospf 1'), 'router ospf 1');
eq('network wildcard area kept intact', E.cliCanon('net 10.1.1.0 0.0.0.255 area 0'), 'network 10.1.1.0 0.0.0.255 area 0');
eq('idempotent', E.cliCanon(E.cliCanon('int gi0/1')), E.cliCanon('int gi0/1'));
eq('masks left intact', E.cliCanon('255.255.255.192'), '255.255.255.192');

// ---- gradeConfig: presence-not-order, soft forbid, hint ----
var ospfItem = { kind: 'config', steps: [
  { label: 'start ospf', accept: ['router ospf 1'], canonical: 'router ospf 1' },
  { label: 'advertise', accept: ['network 10.1.1.0 0.0.0.255 area 0'], canonical: 'network 10.1.1.0 0.0.0.255 area 0' }
] };
ok('reversed order passes', E.gradeConfig(['net 10.1.1.0 0.0.0.255 area 0', 'ro ospf 1'], ospfItem).ok);
eq('missing reports index', E.gradeConfig(['ro ospf 1'], ospfItem).missing, [1]);
ok('harmless extra ignored', E.gradeConfig(['ro ospf 1', 'network 10.1.1.0 0.0.0.255 area 0', 'do wr'], ospfItem).ok);
var fixItem = { kind: 'fix', steps: [{ label: 'bring up', accept: ['no shutdown'], canonical: 'no shutdown' }], forbid: ['shutdown'] };
ok('fix: no shutdown passes', E.gradeConfig(['no shut'], fixItem).ok);
ok('fix: re-adding shutdown fails', E.gradeConfig(['no shutdown', 'shutdown'], fixItem).ok === false);
ok('forbidHit listed', E.gradeConfig(['no shutdown', 'shutdown'], fixItem).forbidHit.length === 1);
var wrongItem = { kind: 'config', steps: [{ label: 'access', accept: ['switchport mode access'], canonical: 'switchport mode access' }], wrongIfTyped: [{ line: 'switchport mode trunk', hint: 'trunk is wrong for an access port' }] };
eq('wrongIfTyped surfaces hint, still ok if steps met', E.gradeConfig(['switchport mode access', 'switchport mode trunk'], wrongItem).hint, 'trunk is wrong for an access port');
ok('wrongIfTyped does not fail card', E.gradeConfig(['switchport mode access', 'switchport mode trunk'], wrongItem).ok);

// ---- recall (loose / choice) ----
ok('loose udp/123 == udp 123', E.gradeRecall('UDP/123', { answerKind: 'loose', accept: ['udp 123'] }));
ok('loose channels 1,6,11 == 1 6 11', E.gradeRecall('1,6,11', { answerKind: 'loose', accept: ['1 6 11'] }));
ok('loose rejects wrong', E.gradeRecall('tcp 123', { answerKind: 'loose', accept: ['udp 123'] }) === false);
ok('choice correct', E.gradeRecall(0, { answerKind: 'choice', correctIndex: 0 }));
ok('choice wrong', E.gradeRecall(1, { answerKind: 'choice', correctIndex: 0 }) === false);

// ---- compute (subnet) ----
eq('subnetFacts /26', E.subnetFacts('192.168.10.77', 26), {
  network: '192.168.10.64', broadcast: '192.168.10.127', mask: '255.255.255.192', wildcard: '0.0.0.63',
  firstHost: '192.168.10.65', lastHost: '192.168.10.126', usable: 62 });
ok('subnet /30 usable 2', E.subnetFacts('10.0.0.5', 30).usable === 2);
ok('subnet /31 usable 2', E.subnetFacts('10.0.0.4', 31).usable === 2);
ok('subnet /32 usable 1', E.subnetFacts('10.0.0.1', 32).usable === 1);
ok('gradeCompute int', E.gradeCompute('62', { answerKind: 'int', answer: 62 }) && E.gradeCompute('64', { answerKind: 'int', answer: 62 }) === false);

// ---- read-table (LPM derivation) ----
var rows = [{ prefix: '10.2.2.0', len: 24, via: '10.0.0.2' }, { prefix: '0.0.0.0', len: 0, via: '10.0.0.9' }];
eq('LPM picks /24', E.lpmNextHop(rows, '10.2.2.50'), '10.0.0.2');
eq('LPM falls to default', E.lpmNextHop(rows, '8.8.8.8'), '10.0.0.9');
var readItem = { kind: 'read', accept: ['10.0.0.2', 'via 10.0.0.2'] };
ok('gradeRead accepts via form', E.gradeRead('via 10.0.0.2', readItem) && E.gradeRead('10.0.0.2', readItem));
ok('gradeRead rejects wrong hop', E.gradeRead('10.0.0.9', readItem) === false);

// ---- gradeItem dispatch ----
ok('dispatch config', E.gradeItem({ kind: 'config', steps: [{ accept: ['no shutdown'] }] }, ['no shut']));
ok('dispatch recall', E.gradeItem({ kind: 'recall', answerKind: 'loose', accept: ['udp 123'] }, 'udp/123'));

console.log('cli-sim engine: ' + pass + ' assertions passed');

// ---- CONTENT: validate the shipped CLI-sim decks (data/cli-sim-data.js) ----
(function () {
  global.window = global.window || {};
  require('../data/cli-sim-data.js');
  var items = global.window.CLI_SIM_ITEMS || [];
  ok('cli-sim deck loaded', items.length >= 100);
  var seen = {}; items.forEach(function (it) { ok('unique id ' + it.id, seen[it.id] !== 1); seen[it.id] = 1; });
  var decks = {}; items.forEach(function (i) { decks[i.deck] = (decks[i.deck] || 0) + 1; });
  ['vlan','acl','ospf','stp','static','etherchannel','l2sec','ipv6','aclproto','wlan','routetable','subnet'].forEach(function (d) { ok('deck present: ' + d, decks[d] > 0); });
  // config/fix: the intended answer (first accept of each step) must grade ok
  items.filter(function (i) { return i.kind === 'config' || i.kind === 'fix'; }).forEach(function (it) {
    var lines = it.steps.map(function (s) { return s.accept[0]; });
    ok('intended answer passes: ' + it.id, E.gradeConfig(lines, it).ok);
  });
  // read: derived answers must still match the engine (no drift)
  items.filter(function (i) { return i.kind === 'read'; }).forEach(function (it) {
    if (it.rows && it.dest) eq('LPM no drift ' + it.id, it.accept[0], E.lpmNextHop(it.rows, it.dest));
    if (it.routers) eq('DR no drift ' + it.id, it.accept[0], E.electDRBDR(it.routers).dr.rid);
    if (it.options) ok('choice grades ' + it.id, E.gradeRead(it.correctIndex, it));
  });
  // subnet: recompute from subnetFacts
  items.filter(function (i) { return i.deck === 'subnet'; }).forEach(function (it) {
    var f = E.subnetFacts(it.ip, it.prefix);
    if (it.answerKind === 'int') eq('subnet usable ' + it.id, it.answer, f.usable);
    ok('subnet grades ' + it.id, E.gradeCompute(String(it.answer), it));
  });
  // recall grades on its own key
  items.filter(function (i) { return i.kind === 'recall'; }).forEach(function (it) {
    var a = it.answerKind === 'choice' ? it.correctIndex : ((it.accept && it.accept[0]) || it.answer);
    ok('recall grades ' + it.id, E.gradeRecall(a, it));
  });
  // choice items (kind 'choice') must route + grade via gradeItem on the index
  items.filter(function (i) { return i.kind === 'choice'; }).forEach(function (it) {
    ok('choice has correctIndex ' + it.id, typeof it.correctIndex === 'number');
    ok('choice grades via gradeItem ' + it.id, E.gradeItem(it, it.correctIndex) === true);
    ok('choice rejects wrong index ' + it.id, E.gradeItem(it, (it.correctIndex + 1) % it.options.length) === (it.options.length === 1));
  });
  ok('no em/en dash in decks', /[\u2014\u2013]/.test(JSON.stringify(items)) === false);
  console.log('cli-sim content: ' + items.length + ' items validated');
})();
