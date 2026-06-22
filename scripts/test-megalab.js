#!/usr/bin/env node
/* End-to-end regression test for ncp-ain-mega-lab.html.
 * No deps (the dev box has no jsdom + the headless browser OOMs), so this is a
 * minimal DOM stub driving the REAL engine Terminal + the page's command-routing
 * wrapper. It is the definition of done for the mega lab: proves the troubleshoot
 * missions complete through the terminal path, the per-device tab swap does not
 * double-bind keydown listeners, and each tab keeps its own scrollback + history.
 * Run: node scripts/test-megalab.js  (wired into pre-push). */
'use strict';
var fs = require('fs');
var path = require('path');
var ROOT = path.join(__dirname, '..');
var pass = 0, fail = 0;
function ok(name, cond) { if (cond) { pass++; } else { fail++; console.error('FAIL: ' + name); } }

// ---- minimal DOM stub (enough for the engine Terminal + Enter keypath) ----
var KEYDOWN_BINDS = 0;
function mkEl() {
  return {
    _txt: '', _html: '', className: '', children: [], _listeners: {}, _q: {},
    style: {}, scrollTop: 0, scrollHeight: 100,
    get textContent() { return this._txt; }, set textContent(v) { this._txt = String(v); this._html = String(v); },
    get innerHTML() { return this._html; }, set innerHTML(v) { this._html = String(v); if (v === '') this.children = []; },
    appendChild: function (c) { this.children.push(c); this._html += (c._html || c.textContent || ''); return c; },
    addEventListener: function (t, fn) { (this._listeners[t] = this._listeners[t] || []).push(fn); if (t === 'keydown') KEYDOWN_BINDS++; },
    removeEventListener: function (t, fn) { var a = this._listeners[t]; if (a) { var i = a.indexOf(fn); if (i >= 0) { a.splice(i, 1); if (t === 'keydown') KEYDOWN_BINDS--; } } },
    querySelector: function (sel) { return this._q[sel] || mkEl(); },
    focus: function () {}
  };
}
function fireEnter(inputEl) {
  var fns = (inputEl._listeners.keydown || []).slice();
  fns.forEach(function (fn) { fn({ key: 'Enter', ctrlKey: false, preventDefault: function () {} }); });
}

global.window = global;
global.document = {
  createElement: function () { return mkEl(); },
  getElementById: function () { return null; },
  createRange: function () { return { setStartAfter: function () {}, setStart: function () {}, collapse: function () {} }; }
};
global.getSelection = function () { return { removeAllRanges: function () {}, addRange: function () {} }; };
window.getSelection = global.getSelection;

// ---- load the real engine + IB sim ----
new Function(fs.readFileSync(path.join(ROOT, 'js/lab-engine.js'), 'utf8')).call(global);
new Function(fs.readFileSync(path.join(ROOT, 'js/ib-tools.js'), 'utf8')).call(global);

// ---- extract the page's data regions (single source of truth) ----
var html = fs.readFileSync(path.join(ROOT, 'ncp-ain-mega-lab.html'), 'utf8');
function region(name) {
  var re = new RegExp('REGION:' + name + '[^\\n]*\\n([\\s\\S]*?)\\n[ \\t]*// ===== END REGION:' + name);
  var m = html.match(re);
  if (!m) throw new Error('region not found: ' + name);
  return m[1];
}
var MEGA_LABS = new Function(region('MEGA_LABS') + '; return MEGA_LABS;')();
var LINUX_CMDMAP = new Function(region('LINUX_CMDMAP') + '; return LINUX_CMDMAP;')();
var NVUE_CMDMAP = new Function(region('NVUE_CMDMAP') + '; return NVUE_CMDMAP;')();

// ---- build the lab + devices exactly like the page ----
var lab = new Lab.LabBase({ objectives: [] });
['ufm-sm', 'dgx-01', 'dgx-02', 'dgx-03', 'dgx-04'].forEach(function (n) { lab.addDevice(n, 'linux', { shellPromptFormat: 'linux', commandMap: LINUX_CMDMAP, custom: {} }); });
['leaf-0', 'leaf-1'].forEach(function (n) { lab.addDevice(n, 'switch', { shellPromptFormat: 'nvue', commandMap: NVUE_CMDMAP, custom: {} }); });

// ---- mount the real engine Terminal on a stub node ----
var out = mkEl(), inp = mkEl(), prm = mkEl();
var mount = mkEl();
mount._q = { '.term-output': out, '.term-input': inp, '.term-cursor': mkEl(), '.term-prompt': prm };
lab.initTerminal(mount);

// ---- page command-routing replica (must mirror ncp-ain-mega-lab.html) ----
var activeMission = null;
var IB_DIAG_RE = /^(ibstat|ibstatus|iblinkinfo|ibhosts|ibnetdiscover|ibdiagnet|perfquery|sminfo|ibping|ibportstate)\b/;
function lidFromAction(a) { return a === 'replace-cable' ? 7 : a === 'fix-pkey' ? 5 : a === 'fix-congestion' ? 2 : null; }
function markIbDiag(raw, dev) {
  if (!dev) return; dev.custom = dev.custom || {}; var f = raw.split(/\s+/)[0];
  if (f === 'ibdiagnet' && raw.indexOf('--sharp') !== -1) dev.custom.sharpDone = true;
  else if (f === 'ibdiagnet') dev.custom.ibdiagnetDone = true;
  else if (f === 'ibnetdiscover') dev.custom.ibnetdiscoverDone = true;
  else if (f === 'iblinkinfo') dev.custom.iblinkinfoDone = true;
  else if (f === 'ibhosts') dev.custom.ibhostsDone = true;
  else if (f === 'sminfo') dev.custom.sminfoDone = true;
}
function maybeApplyFix(raw, result) {
  if (!activeMission || !window.IBTools.applyFix) return null;
  var step = null; for (var i = 0; i < activeMission.steps.length; i++) { var s = activeMission.steps[i]; if (s.action && raw === s.cmd) { step = s; break; } }
  if (!step) return null;
  var r = window.IBTools.applyFix(lidFromAction(step.action), step.action);
  var nf = !result || /command not found|Invalid input|Unrecognized|not found/i.test(result);
  return nf ? ((r && r.msg) || '[fix]') : null;
}
function evalStep(step, dev, idx, m) {
  var c = step.cmd || '';
  var flag = { 'ibnetdiscover': 'ibnetdiscoverDone', 'iblinkinfo': 'iblinkinfoDone', 'ibhosts': 'ibhostsDone', 'systemctl start opensm': 'smStarted', 'opensm -p 15': 'smPriority15', 'sminfo': 'sminfoDone', 'saquery -p 0x8001': 'sakeySet', 'saquery --pkey': 'pkeyConfirmed', 'nv set qos roce mode lossless': 'roceLossless', 'nv config apply': 'nvueApplied', 'nv show qos roce': 'roceShowDone', 'ibdiagnet': 'ibdiagnetDone', 'ib_write_bw dgx-02': 'bwDone', 'ibdiagnet --sharp': 'sharpDone', 'nccl all_reduce_perf': 'ncclDone' }[c];
  if (flag) return !!(dev && dev.custom[flag]);
  if (c.indexOf('pfc-priority') !== -1) return !!(dev && dev.custom.rocePfc);
  if (c.indexOf('pcp,dscp') !== -1) return !!(dev && dev.custom.roceTrust);
  if (/^perfquery\s+(\d+)/.test(c)) {
    var lid = parseInt(c.match(/^perfquery\s+(\d+)/)[1], 10);
    var pf = false; for (var k = 0; k < idx; k++) { var ps = m.steps[k]; if (ps.action && lidFromAction(ps.action) === lid) { pf = true; break; } }
    if (pf) return !!(window.IBTools.portFrozen && window.IBTools.portFrozen(lid));
    return !!(window.IBTools.portReads && window.IBTools.portReads(lid) >= 2);
  }
  return false;
}
function checkObjectives() {
  if (!activeMission) return; var m = activeMission;
  for (var i = 0; i < m.steps.length; i++) {
    if (m._completedSet.has(i)) continue;
    var step = m.steps[i], dev = lab.devices[step.device] || lab.activeDevice, p = false;
    if (step.action) { p = (step.action === 'resolve-sm') ? !window.IBTools.activeFault() : !!window.IBTools.portFrozen(lidFromAction(step.action)); }
    else p = evalStep(step, dev, i, m);
    if (p) m._completedSet.add(i); else break;
  }
}
var EXEC_COUNT = 0;
var _orig = window.Lab.LabBase.prototype.processCommand;
lab.processCommand = function (raw) {
  EXEC_COUNT++; var t = String(raw).trim(); var dev = this.activeDevice; var o;
  if (IB_DIAG_RE.test(t)) { o = window.IBTools.run(t); markIbDiag(t, dev); } else { o = _orig.call(this, raw); }
  var fx = maybeApplyFix(t, o); if (fx) o = fx; checkObjectives(); return o;
};

// ---- per-device tab swap (page replica) ----
var deviceHistory = {};
function switchTab(n) {
  var prev = lab.activeDeviceName;
  if (prev) deviceHistory[prev] = { html: lab.terminal.outputEl.innerHTML, history: lab.terminal.history.slice() };
  lab.activeDeviceName = n;
  var s = deviceHistory[n];
  lab.terminal.outputEl.innerHTML = s ? s.html : '';
  lab.terminal.history = s ? s.history : [];
  lab.terminal.historyIdx = -1;
  lab.terminal.updatePrompt();
}
function type(cmd) { lab.terminal.inputEl.textContent = cmd; fireEnter(lab.terminal.inputEl); }

// ---- 1. no double-bind across repeated tab swaps ----
ok('single keydown listener after mount', KEYDOWN_BINDS === 1);
['ufm-sm', 'dgx-01', 'dgx-02', 'dgx-03', 'dgx-04', 'leaf-0', 'leaf-1', 'ufm-sm', 'dgx-02', 'leaf-1'].forEach(switchTab);
ok('single keydown listener after 10 tab swaps', KEYDOWN_BINDS === 1);
activeMission = null; EXEC_COUNT = 0; lab.activeDeviceName = 'dgx-01';
type('ibstat');
ok('one Enter triggers exactly one execution (no double keystroke)', EXEC_COUNT === 1);

// ---- 2. per-tab scrollback retention ----
deviceHistory = {}; lab.terminal.outputEl.innerHTML = ''; lab.activeDeviceName = 'dgx-01';
type('hostname'); var dgxLen = lab.terminal.outputEl.innerHTML.length;
switchTab('leaf-0'); type('nv show qos roce'); switchTab('dgx-01');
ok('per-tab scrollback retained after switching away and back',
  lab.terminal.outputEl.innerHTML.length >= dgxLen && lab.terminal.outputEl.innerHTML.indexOf('hostname') !== -1);

// ---- 3. all troubleshoot missions complete THROUGH the terminal ----
function runMission(m) {
  m._completedSet = new Set(); activeMission = m;
  if (m.fault) window.IBTools.setFault(m.fault); else window.IBTools.clearFault();
  Object.keys(lab.devices).forEach(function (k) { lab.devices[k].custom = {}; });
  if (m.id !== 'm1-place-wire' && m.id !== 'm2-sm-bringup') { lab.devices['ufm-sm'].custom.smStarted = true; lab.devices['ufm-sm'].custom.smPriority15 = true; }
  m.steps.forEach(function (step, idx) {
    switchTab(step.device);
    var isRead = /^perfquery\s+\d+/.test(step.cmd) && !m.steps.slice(0, idx).some(function (p) { return p.action && lidFromAction(p.action) === parseInt(step.cmd.match(/\d+/)[0], 10); });
    var reads = isRead ? 2 : 1; for (var r = 0; r < reads; r++) type(step.cmd);
  });
  return m._completedSet.size === m.steps.length;
}
MEGA_LABS.forEach(function (m) { ok('mission completes via terminal: ' + m.id, runMission(m)); });

// ---- result ----
if (fail === 0) { console.log('mega-lab: ' + pass + ' checks passed (all ' + MEGA_LABS.length + ' missions + terminal swap)'); process.exit(0); }
console.error('mega-lab: ' + fail + ' FAILED, ' + pass + ' passed'); process.exit(1);
