/* Cram Driller drill-mode engine.
 * PURE logic: derivation + grading + CCNA rule engines. No DOM in this file
 * so it is node-testable (the headless browser is down). Browser reads the
 * same functions off window.CramDrills; node requires the module export.
 * Built Round 2 of the 5-round agent build.
 */
(function (root) {
  'use strict';

  // ---- shared normalize + grade ----
  function norm(s) {
    return String(s == null ? '' : s).toLowerCase().replace(/\s+/g, ' ').trim();
  }
  function gradeText(input, answer) { return norm(input) === norm(answer); }
  function gradeInt(input, answer) {
    var m = String(input).match(/-?\d+/);
    return m != null && parseInt(m[0], 10) === parseInt(answer, 10);
  }
  function gradeChoice(selectedIndex, correctIndex) { return selectedIndex === correctIndex; }
  function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
  }
  // stable per-id pseudo-random (no Date/Math.random needed for derivation)
  function hash(s) { var h = 0, i; for (i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) | 0; } return Math.abs(h); }

  function bidOf(b, i) { return (b.kind || 'x') + '-' + i + '-' + (b.title || '').slice(0, 12).replace(/\s+/g, '_'); }
  function intsIn(s) { return (String(s).match(/\d+/g) || []).map(Number); }
  function uniq(a) { var seen = {}, out = []; a.forEach(function (x) { if (!seen[x]) { seen[x] = 1; out.push(x); } }); return out; }

  // ============ MODE 1: number keypad (port / AD / timer) ============
  // keypadable = the value resolves to exactly ONE distinct integer (so 67/68
  // pairs, ranges, dotted-quads and timer-lists are excluded).
  // reject values/cues where the lone integer is incidental free text, not a
  // genuine typeable port/AD/timer/priority (adversarial review bug 2)
  var KP_BAD_V = /\dl|l\d|v\d|\dxx|\d-tuple|\d-bit|channel-group\s*\d|sshv\d/i;
  var KP_BAD_K = /state|step|version|formula|keyword|score|classless|stratum|prereq|filter|broadcast|helper|\bcount\b|higher/i;
  function buildKeypad(blocks) {
    var out = [];
    blocks.forEach(function (b, i) {
      var base = bidOf(b, i);
      (b.numbers || []).forEach(function (n, j) {
        if (/\d+\.\d+/.test(n.v)) return;       // dotted-quad / decimal, not keypad
        if (KP_BAD_V.test(n.v)) return;          // incidental digit inside a token (L4, 5xx, SSHv2...)
        if (KP_BAD_K.test(n.k)) return;          // the cue is a count/state/version, not a number fact
        var d = uniq(intsIn(n.v));
        if (d.length === 1) out.push({ id: base + ':kp:' + j, cue: n.k, answer: d[0], raw: n.v, dom: b.domain || null });
      });
    });
    return out;
  }

  // ============ MODE 2: blank-a-token CLI fill ============
  var BLANK_KEYWORDS = ['overload', 'trunk', 'access', 'permit', 'deny', 'active', 'passive',
    'desirable', 'auto', 'dot1q', 'in', 'out', 'add', 'native', 'static', 'default-router'];
  function blankToken(cmd) {
    if (/\s\/\s/.test(cmd) || /\.\.\./.test(cmd)) return null;       // skip compound / placeholder
    var toks = cmd.split(/\s+/);
    if (toks.length < 2) return null;
    // only blank a token that occurs exactly once in the line, else the answer
    // stays visible elsewhere and the drill is trivially guessable
    function uniqueAt(x) { return toks.filter(function (t) { return t === toks[x]; }).length === 1; }
    var idx = -1, k;
    for (k = 0; k < toks.length; k++) { if (/^\d+\.\d+\.\d+\.\d+$/.test(toks[k]) && uniqueAt(k)) { idx = k; break; } } // dotted quad
    if (idx < 0) for (k = 0; k < toks.length; k++) { if (/^\d+$/.test(toks[k]) && uniqueAt(k)) { idx = k; break; } }   // pure number
    if (idx < 0) for (k = 0; k < toks.length; k++) { if (BLANK_KEYWORDS.indexOf(toks[k].toLowerCase()) >= 0 && uniqueAt(k)) { idx = k; break; } }
    if (idx < 0) return null;
    var masked = toks.map(function (t, x) { return x === idx ? '___' : t; }).join(' ');
    return { idx: idx, token: toks[idx], masked: masked };
  }
  function buildBlanks(blocks) {
    var out = [];
    blocks.forEach(function (b, i) {
      if (b.kind !== 'config') return;
      var base = bidOf(b, i);
      var pool = (b.commands || []).map(function (c) { return c.cmd; });
      (b.commands || []).forEach(function (c, j) {
        var bt = blankToken(c.cmd);
        if (!bt) return;
        // up to 3 same-block distinct decoy tokens for the same position kind
        var decoys = [];
        pool.forEach(function (cmd2) {
          var b2 = blankToken(cmd2);
          if (b2 && b2.token !== bt.token && decoys.indexOf(b2.token) < 0) decoys.push(b2.token);
        });
        decoys = decoys.slice(0, 3);
        var opts = [bt.token].concat(decoys);
        if (opts.length < 2) return;   // lone-option fill is trivially correct, skip (bug 8)
        out.push({ id: base + ':blank:' + j, prompt: bt.masked, hint: c.note, answer: bt.token, full: c.cmd, options: opts, dom: b.domain || null });
      });
    });
    return out;
  }

  // ============ MODE 3: trap MCQ (forced discrimination) ============
  // cue = trap trigger; options = correct answer + decoy answers from OTHER
  // traps (prefer same domain). correctIndex known => pure-logic grade.
  function buildTrapMCQ(blocks) {
    var traps = [];
    blocks.forEach(function (b, i) {
      var base = bidOf(b, i), dom = b.domain || normDomain(b);
      (b.traps || []).forEach(function (t, j) { traps.push({ id: base + ':tq:' + j, trigger: t.trigger, answer: t.answer, dom: dom }); });
    });
    return traps.map(function (t, idx) {
      var sameDom = traps.filter(function (o) { return o !== t && o.dom === t.dom && o.answer !== t.answer; });
      var others = sameDom.length >= 2 ? sameDom : traps.filter(function (o) { return o !== t && o.answer !== t.answer; });
      var d1 = others[(hash(t.id) % Math.max(1, others.length))];
      var d2 = others[((hash(t.id) + 1) % Math.max(1, others.length))];
      var opts = [t.answer];
      if (d1 && opts.indexOf(d1.answer) < 0) opts.push(d1.answer);
      if (d2 && opts.indexOf(d2.answer) < 0) opts.push(d2.answer);
      // top up to 3 distinct options from the full pool if a thin domain starved decoys
      for (var z = 0; z < traps.length && opts.length < 3; z++) {
        var cand = traps[(hash(t.id) + z) % traps.length];
        if (cand !== t && opts.indexOf(cand.answer) < 0) opts.push(cand.answer);
      }
      // deterministic shuffle by hash so correctIndex is stable
      var order = opts.map(function (o, k) { return { o: o, key: hash(t.id + k) }; }).sort(function (a, b) { return a.key - b.key; });
      var shuffled = order.map(function (x) { return x.o; });
      return { id: t.id, cue: t.trigger, options: shuffled, correctIndex: shuffled.indexOf(t.answer), dom: t.dom };
    });
  }

  function normDomain(b) {
    if (b.domain && /^[1-6]$/.test(String(b.domain).trim())) return String(b.domain).trim();
    var t = ((b.title || '') + ' ' + (b.kind || '')).toLowerCase();
    if (/tactic|exam-day/.test(t)) return 'X';
    if (/vlan|stp|trunk|etherchannel|spanning|wireless/.test(t)) return '2';
    if (/ospf|rout|inter-vlan|fhrp|hsrp/.test(t)) return '3';
    if (/\bacl\b|security|port-sec|aaa/.test(t)) return '5';
    if (/nat|dhcp|dns|ntp|snmp|syslog|service/.test(t)) return '4';
    if (/automat|json|rest|ansible|sdn/.test(t)) return '6';
    return '1';
  }

  // ============ MODE 4: ordering / sequence ============
  // answer key = original array index order. grade compares produced origIdx[].
  function buildSequences(blocks) {
    var out = [];
    blocks.forEach(function (b, i) {
      var base = bidOf(b, i);
      var steps = (b.steps || []);
      if (steps.length >= 3) {
        var win = steps.slice(0, 6).map(function (s, k) { return { text: s.do, why: s.why, origIdx: k }; });
        out.push({ id: base + ':seq', items: win, answerOrder: win.map(function (x) { return x.origIdx; }) });
      }
    });
    return out;
  }
  function gradeOrder(producedOrigIdx, answerOrder) { return arraysEqual(producedOrigIdx, answerOrder); }

  // DORA canonical (used by an ordering drill)
  var DORA = ['Discover', 'Offer', 'Request', 'Acknowledge'];

  // ============ MODE 5: bucket sort + AD ladder ============
  function buildBuckets() {
    return {
      tcpudp: { title: 'TCP or UDP?', bins: ['TCP', 'UDP'], items: [
        { label: 'FTP (20/21)', bin: 'TCP' }, { label: 'SSH (22)', bin: 'TCP' }, { label: 'Telnet (23)', bin: 'TCP' },
        { label: 'SMTP (25)', bin: 'TCP' }, { label: 'HTTP (80)', bin: 'TCP' }, { label: 'HTTPS (443)', bin: 'TCP' },
        { label: 'DHCP (67/68)', bin: 'UDP' }, { label: 'TFTP (69)', bin: 'UDP' }, { label: 'NTP (123)', bin: 'UDP' },
        { label: 'SNMP (161/162)', bin: 'UDP' }, { label: 'Syslog (514)', bin: 'UDP' }, { label: 'RADIUS (1812/1813)', bin: 'UDP' }
      ] },
      acl: { title: 'Standard or Extended ACL?', bins: ['Standard', 'Extended'], items: [
        { label: 'Number 1-99', bin: 'Standard' }, { label: 'Number 1300-1999', bin: 'Standard' },
        { label: 'Matches source only', bin: 'Standard' }, { label: 'Place near destination', bin: 'Standard' },
        { label: 'Number 100-199', bin: 'Extended' }, { label: 'Number 2000-2699', bin: 'Extended' },
        { label: 'Matches src+dst+protocol+port', bin: 'Extended' }, { label: 'Place near source', bin: 'Extended' }
      ] }
    };
  }
  function gradeBucket(assignments, items) {
    // assignments: array of bin label parallel to items
    var per = items.map(function (it, k) { return assignments[k] === it.bin; });
    return { per: per, allCorrect: per.every(function (x) { return x; }) };
  }

  // AD ladder canonical
  var AD_LADDER = [
    { label: 'Connected', ad: 0 }, { label: 'Static', ad: 1 }, { label: 'eBGP', ad: 20 },
    { label: 'EIGRP (internal)', ad: 90 }, { label: 'OSPF', ad: 110 }, { label: 'RIP', ad: 120 },
    { label: 'EIGRP (external)', ad: 170 }, { label: 'iBGP', ad: 200 }, { label: 'Unreachable', ad: 255 }
  ];
  function gradeAdLadder(producedLabels) {
    var sorted = AD_LADDER.slice().sort(function (a, b) { return a.ad - b.ad; }).map(function (x) { return x.label; });
    return arraysEqual(producedLabels, sorted);
  }
  function adSortedValues() { return AD_LADDER.map(function (x) { return x.ad; }).sort(function (a, b) { return a - b; }); }

  // ============ CCNA RULE ENGINES (for predict-then-reveal visuals) ============
  // STP root: lowest priority, tie -> lowest MAC. mac as comparable string/array.
  function macKey(x) { return String(x).replace(/[^0-9a-f]/gi, '').toLowerCase(); }
  function ridVal(r) {
    var s = String(r);
    if (s.indexOf('.') >= 0) return s.split('.').reduce(function (a, o) { return a * 256 + (parseInt(o, 10) || 0); }, 0);
    return parseInt(r, 10) || 0;
  }
  function electRoot(bridges) {
    if (!bridges || !bridges.length) return null;
    return bridges.slice().sort(function (a, b) {
      if (a.priority !== b.priority) return a.priority - b.priority;
      var ma = macKey(a.mac), mb = macKey(b.mac);
      return ma < mb ? -1 : (ma > mb ? 1 : 0);
    })[0];
  }
  // OSPF DR/BDR: priority 0 = ineligible; highest priority wins, tie -> highest RID (numeric). No preemption.
  function electDRBDR(routers) {
    if (!routers || !routers.length) return { dr: null, bdr: null };
    var eligible = routers.filter(function (r) { return r.priority > 0; });
    var ranked = eligible.slice().sort(function (a, b) {
      if (a.priority !== b.priority) return b.priority - a.priority;
      return ridVal(b.rid) - ridVal(a.rid);
    });
    return { dr: ranked[0] || null, bdr: ranked[1] || null };
  }
  // ACL: first matching rule wins; if none match, implicit deny.
  function aclEval(rules, pkt) {
    if (!rules || !rules.length) return { action: 'deny', ruleIndex: -1 };
    for (var i = 0; i < rules.length; i++) {
      if (rules[i].match(pkt)) return { action: rules[i].action, ruleIndex: i };
    }
    return { action: 'deny', ruleIndex: -1 };
  }

  // ============ predict-then-reveal VISUAL scenarios ============
  // Each scenario is one card; grading delegates to the tested rule engines.
  function buildVisuals() {
    return [
      // STP root: lowest priority, tie lowest MAC
      { id: 'vis:stp:0', kind: 'stp', prompt: 'Tap the switch that becomes ROOT',
        nodes: [{ priority: 32768, mac: '00:1a:2b:00:00:0a' }, { priority: 32768, mac: '00:1a:2b:00:00:05' }, { priority: 4096, mac: '00:1a:2b:00:00:99' }],
        rule: 'Lowest priority wins. Tie broken by lowest MAC.' },
      { id: 'vis:stp:1', kind: 'stp', prompt: 'Tap the switch that becomes ROOT',
        nodes: [{ priority: 32768, mac: '00:1a:2b:00:00:0a' }, { priority: 32768, mac: '00:1a:2b:00:00:05' }, { priority: 32768, mac: '00:1a:2b:00:00:22' }],
        rule: 'All priorities tie at 32768, so lowest MAC wins.' },
      { id: 'vis:stp:2', kind: 'stp', prompt: 'Tap the switch that becomes ROOT',
        nodes: [{ priority: 8192, mac: '00:1a:2b:00:00:f0' }, { priority: 4096, mac: '00:1a:2b:00:00:c0' }, { priority: 4096, mac: '00:1a:2b:00:00:b0' }],
        rule: 'Two tie at 4096, lowest MAC (b0) wins.' },
      // OSPF DR/BDR: highest priority, tie highest RID, priority 0 ineligible
      { id: 'vis:ospf:0', kind: 'ospf', prompt: 'Tap the DR (highest priority wins)',
        nodes: [{ priority: 1, rid: '1.1.1.1' }, { priority: 1, rid: '2.2.2.2' }, { priority: 0, rid: '9.9.9.9' }],
        rule: 'Highest priority wins. Tie = highest RID. Priority 0 cannot be elected.' },
      { id: 'vis:ospf:1', kind: 'ospf', prompt: 'Tap the DR (highest priority wins)',
        nodes: [{ priority: 10, rid: '1.1.1.1' }, { priority: 5, rid: '8.8.8.8' }, { priority: 0, rid: '9.9.9.9' }],
        rule: 'Priority 10 beats 5. Priority 0 is DROther.' },
      { id: 'vis:ospf:2', kind: 'ospf', prompt: 'Tap the DR (highest priority wins)',
        nodes: [{ priority: 0, rid: '9.9.9.9' }, { priority: 1, rid: '3.3.3.3' }],
        rule: 'Only one eligible router: it is DR, there is no BDR.' },
      // ACL first-match then implicit deny
      { id: 'vis:acl:0', kind: 'acl', packet: '10.0.0.5 to 8.8.8.8, TCP 443', pkt: { src: '10.0.0.5', proto: 'tcp', port: 443 },
        rules: [
          { text: '10 permit tcp 10.0.0.0 0.0.0.255 any eq 80', action: 'permit', match: function (p) { return p.proto === 'tcp' && p.port === 80; } },
          { text: '20 deny ip host 10.0.0.5 any', action: 'deny', match: function (p) { return p.src === '10.0.0.5'; } },
          { text: '30 permit ip any any', action: 'permit', match: function () { return true; } }
        ] },
      { id: 'vis:acl:1', kind: 'acl', packet: '10.0.0.9 to web, TCP 80', pkt: { src: '10.0.0.9', proto: 'tcp', port: 80 },
        rules: [
          { text: '10 permit tcp 10.0.0.0 0.0.0.255 any eq 80', action: 'permit', match: function (p) { return p.proto === 'tcp' && p.port === 80; } },
          { text: '20 deny ip host 10.0.0.5 any', action: 'deny', match: function (p) { return p.src === '10.0.0.5'; } },
          { text: '30 permit ip any any', action: 'permit', match: function () { return true; } }
        ] },
      { id: 'vis:acl:2', kind: 'acl', packet: '10.0.0.9 to DNS, UDP 53', pkt: { src: '10.0.0.9', proto: 'udp', port: 53 },
        rules: [
          { text: '10 permit tcp any any eq 80', action: 'permit', match: function (p) { return p.proto === 'tcp' && p.port === 80; } },
          { text: '20 deny ip host 10.0.0.5 any', action: 'deny', match: function (p) { return p.src === '10.0.0.5'; } }
        ] }
    ];
  }

  // ============ CLI SIMULATOR engine (Tier 1: normalize + abbrev-expand + accept-set) ============
  function cliNorm(s) {
    var t = norm(s);                                   // lowercase, collapse ws, trim
    t = t.replace(/^[a-z0-9_\-]+(\([a-z0-9_\-]+\))?[>#]\s*/, ''); // strip one leading IOS prompt
    return t.trim();
  }
  var CLI_IDIOMS = [
    [/\bno\s+sh(?:u|ut|utd|utdo|utdow|utdown)?\b/g, 'no shutdown'],
    [/\b(?:conf|config|configu|configur|configure)\s+t(?:erm|ermi|ermin|erminal)?\b/g, 'configure terminal'],
    [/^sh\b/, 'show'],
    [/\bspan(?:ning-tree)?\s+port(?:f|fa|fas|fast)?\b/g, 'spanning-tree portfast']
  ];
  var CLI_IFACE = { gi: 'gigabitethernet', gig: 'gigabitethernet', g: 'gigabitethernet', te: 'tengigabitethernet',
    fa: 'fastethernet', fas: 'fastethernet', eth: 'ethernet', e: 'ethernet', se: 'serial', s: 'serial',
    lo: 'loopback', po: 'port-channel', vl: 'vlan' };
  var CLI_KW = ['interface','switchport','mode','access','trunk','native','encapsulation','vlan','allowed',
    'router','ospf','network','area','passive-interface','description','channel-group','spanning-tree','priority',
    'permit','deny','host','established','sequence','address','default','range','summary-address','ipv6','unicast-routing','eui-64'];
  // stop set: real words that happen to be a prefix of a longer keyword (route->router),
  // plus literal command tokens we must never expand
  var CLI_STOP = { ip:1, no:1, show:1, shutdown:1, any:1, 'in':1, out:1, eq:1, gt:1, lt:1, neq:1, nat:1, route:1, switch:1, host:1, deny:1, permit:1 };
  var CLI_PREFIX = (function () {
    var count = {}, map = {};
    CLI_KW.forEach(function (kw) { for (var L = 2; L <= kw.length; L++) { var p = kw.slice(0, L); count[p] = (count[p] || 0) + 1; map[p] = kw; } });
    Object.keys(count).forEach(function (p) { if (count[p] > 1) delete map[p]; });  // ambiguous prefixes dropped
    Object.keys(CLI_STOP).forEach(function (s) { delete map[s]; });
    return map;
  })();
  var CLI_PORT = { www:'80', http:'80', https:'443', telnet:'23', ssh:'22', ftp:'21', smtp:'25', domain:'53', dns:'53', tftp:'69', ntp:'123', bootps:'67', bootpc:'68' };
  function cliCanon(s) {
    var t = cliNorm(s);
    CLI_IDIOMS.forEach(function (p) { t = t.replace(p[0], p[1]); });
    var toks = t.split(' ').filter(Boolean).map(function (tok) {
      var im = tok.match(/^(gi|gig|g|te|fa|fas|eth|e|se|s|lo|po|vl)(\d.*)$/);  // interface id
      if (im && CLI_IFACE[im[1]]) return CLI_IFACE[im[1]] + im[2];
      if (CLI_PREFIX[tok]) return CLI_PREFIX[tok];                            // unambiguous prefix
      return tok;
    });
    for (var i = 1; i < toks.length; i++) {                                  // positional port alias
      if (/^(eq|gt|lt|neq|range)$/.test(toks[i - 1]) && CLI_PORT[toks[i]]) toks[i] = CLI_PORT[toks[i]];
    }
    return toks.join(' ');
  }
  function lineMatchesStep(line, step) { var c = cliCanon(line); return (step.accept || []).some(function (a) { return cliCanon(a) === c; }); }
  function gradeConfig(lines, item) {
    var steps = item.steps || [];
    var satisfied = steps.map(function (st) { return lines.some(function (l) { return lineMatchesStep(l, st); }); });
    var missing = []; satisfied.forEach(function (v, i) { if (!v) missing.push(i); });
    var forbidC = (item.forbid || []).map(cliCanon);
    var forbidHit = lines.filter(function (l) { return forbidC.indexOf(cliCanon(l)) >= 0; });
    var hint = null;
    if (missing.length) { var m = steps[missing[0]]; hint = 'Still need: ' + (m.label || m.canonical || (m.accept && m.accept[0])); }
    else if (forbidHit.length) hint = 'Remove: ' + forbidHit[0];
    else (item.wrongIfTyped || []).some(function (w) { if (lines.some(function (l) { return cliCanon(l) === cliCanon(w.line); })) { hint = w.hint; return true; } return false; });
    return { ok: missing.length === 0 && forbidHit.length === 0, satisfied: satisfied, missing: missing, forbidHit: forbidHit, hint: hint };
  }
  function normLoose(s) { return norm(s).replace(/[,\/]/g, ' ').replace(/\s+/g, ' ').trim(); }
  function gradeRecall(input, item) {
    if (item.answerKind === 'choice') return gradeChoice(input, item.correctIndex);
    var acc = item.accept || [item.answer];
    if (item.answerKind === 'loose') { var ni = normLoose(input); return acc.some(function (a) { return normLoose(a) === ni; }); }
    return acc.some(function (a) { return gradeText(input, a); });
  }
  function gradeCompute(input, item) {
    if (item.answerKind === 'int') return gradeInt(input, item.answer);
    return (item.accept || [item.answer]).some(function (a) { return gradeText(input, a); });
  }
  function gradeRead(input, item) {
    if (item.options) return gradeChoice(input, item.correctIndex);
    return (item.accept || [item.answer]).some(function (a) { return gradeText(input, a); });
  }
  function gradeItem(item, input) {
    switch (item.kind) {
      case 'config': case 'fix': case 'merge': return gradeConfig(input, item).ok;
      case 'read': return gradeRead(input, item);
      case 'compute': return gradeCompute(input, item);
      case 'recall': return gradeRecall(input, item);
      case 'choice': return gradeChoice(input, item.correctIndex);
      default: return false;
    }
  }
  // subnet + routing derivation (machine-derived answer keys)
  function ipToInt(ip) { return ip.split('.').reduce(function (a, o) { return a * 256 + (parseInt(o, 10) || 0); }, 0) >>> 0; }
  function intToIp(n) { return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.'); }
  function subnetFacts(ip, prefix) {
    var m = prefix === 0 ? 0 : (0xFFFFFFFF << (32 - prefix)) >>> 0;
    var net = (ipToInt(ip) & m) >>> 0, bcast = (net | (~m >>> 0)) >>> 0;
    var usable = prefix >= 31 ? (prefix === 31 ? 2 : 1) : Math.pow(2, 32 - prefix) - 2;
    return {
      network: intToIp(net), broadcast: intToIp(bcast), mask: intToIp(m), wildcard: intToIp((~m) >>> 0),
      firstHost: prefix >= 31 ? intToIp(net) : intToIp((net + 1) >>> 0),
      lastHost: prefix >= 31 ? intToIp(bcast) : intToIp((bcast - 1) >>> 0),
      usable: usable
    };
  }
  function lpmNextHop(rows, destIp) {
    var d = ipToInt(destIp), best = null, bestLen = -1;
    rows.forEach(function (r) {
      var m = r.len === 0 ? 0 : (0xFFFFFFFF << (32 - r.len)) >>> 0;
      if (((d & m) >>> 0) === ((ipToInt(r.prefix) & m) >>> 0) && r.len > bestLen) { bestLen = r.len; best = r; }
    });
    return best ? best.via : null;
  }

  var api = {
    norm: norm, gradeText: gradeText, gradeInt: gradeInt, gradeChoice: gradeChoice,
    arraysEqual: arraysEqual, hash: hash, normDomain: normDomain,
    buildKeypad: buildKeypad, blankToken: blankToken, buildBlanks: buildBlanks,
    buildTrapMCQ: buildTrapMCQ, buildSequences: buildSequences, gradeOrder: gradeOrder, DORA: DORA,
    buildBuckets: buildBuckets, gradeBucket: gradeBucket, AD_LADDER: AD_LADDER, gradeAdLadder: gradeAdLadder, adSortedValues: adSortedValues,
    electRoot: electRoot, electDRBDR: electDRBDR, aclEval: aclEval,
    ridVal: ridVal, macKey: macKey, buildVisuals: buildVisuals,
    cliNorm: cliNorm, cliCanon: cliCanon, lineMatchesStep: lineMatchesStep,
    gradeConfig: gradeConfig, normLoose: normLoose, gradeRecall: gradeRecall,
    gradeCompute: gradeCompute, gradeRead: gradeRead, gradeItem: gradeItem,
    subnetFacts: subnetFacts, lpmNextHop: lpmNextHop
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.CramDrills = api;
})(typeof window !== 'undefined' ? window : this);
