/**
 * acl-engine.js — Pure ACL evaluation engine for the CCNA ACL Simulator.
 *
 * Surfaces:
 *   ACL.parseACE(line)               → ACE object (or {error})
 *   ACL.serializeACE(ace)            → IOS-style string
 *   ACL.wcMatch(ip, aceIp, wildcard) → bool (bitwise inverse-mask)
 *   ACL.matchACE(ace, pkt)           → bool (full 5-tuple)
 *   ACL.evaluate(acl, pkt)           → {action, line, ace, hitCounts}
 *   ACL.detectTraps(acl, placement, topology) → [{id, line, msg, fix, examTrap}]
 *   ACL.gradeAttempt(scenario, acl, placement) → {pass, results, score}
 *   ACL.fixtures()                   → run console self-tests, returns pass/fail
 *
 * No DOM. Loadable in Node (no globals besides window.ACL when in browser).
 */
(function (root) {
  'use strict';

  // ──────────────────────────────────────────────────────────
  // IP / wildcard math (unsigned 32-bit)
  // ──────────────────────────────────────────────────────────
  function ipToInt(ip) {
    var p = ip.split('.');
    if (p.length !== 4) return NaN;
    var n = 0;
    for (var i = 0; i < 4; i++) {
      var o = parseInt(p[i], 10);
      if (isNaN(o) || o < 0 || o > 255) return NaN;
      n = (n * 256) + o;
    }
    return n >>> 0;
  }

  function intToIp(n) {
    n = n >>> 0;
    return [(n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff].join('.');
  }

  // (packet ^ ace) & ~wildcard === 0  →  wildcard bits with 1 are "ignore"
  function wcMatch(packetIp, aceIp, wildcard) {
    var p = ipToInt(packetIp), a = ipToInt(aceIp), w = ipToInt(wildcard);
    if ([p, a, w].some(isNaN)) return false;
    return (((p ^ a) & (~w >>> 0)) >>> 0) === 0;
  }

  // True if string looks like a subnet mask (contiguous 1s left, 0s right) — used by trap M03.
  function looksLikeSubnetMask(ip) {
    var n = ipToInt(ip);
    if (isNaN(n)) return false;
    if (n === 0) return false;
    // Subnet mask: bit pattern 1...10...0
    var inverted = (~n >>> 0) + 1;
    return ((n & (inverted - 1)) >>> 0) === 0 && n >= 0xff000000;
  }

  // ──────────────────────────────────────────────────────────
  // Constants
  // ──────────────────────────────────────────────────────────
  var WELL_KNOWN_PORTS = {
    ftp: 21, ftpdata: 20, ssh: 22, telnet: 23, smtp: 25,
    domain: 53, dns: 53, tftp: 69, www: 80, http: 80,
    https: 443, pop3: 110, imap: 143, snmp: 161, ntp: 123, rdp: 3389
  };

  var PROTO_NUMS = { ip: 0, icmp: 1, tcp: 6, udp: 17, ospf: 89, eigrp: 88, ipv6: 41 };

  function portKey(p) {
    if (p == null) return null;
    if (typeof p === 'number') return p;
    var lower = String(p).toLowerCase();
    return WELL_KNOWN_PORTS[lower] != null ? WELL_KNOWN_PORTS[lower] : parseInt(lower, 10);
  }

  // ──────────────────────────────────────────────────────────
  // ACE parser — accepts a partial-IOS string OR a structured object
  // Examples:
  //   "permit ip any any"
  //   "deny tcp 192.168.10.0 0.0.0.255 host 10.0.0.5 eq 443"
  //   "permit udp host 1.1.1.1 any range 49152 65535"
  //   "deny icmp host 1.1.1.1 192.168.1.0 0.0.0.255"
  // ──────────────────────────────────────────────────────────
  function parseACE(input) {
    if (typeof input === 'object' && input != null) return normalizeACE(input);
    if (typeof input !== 'string') return { error: 'invalid input' };

    var t = input.trim().split(/\s+/);
    if (t.length < 3) return { error: 'too short' };

    var ace = { action: null, proto: null, src: null, srcPort: null, dst: null, dstPort: null, flags: [], remark: null };
    var i = 0;

    // Skip leading line number
    if (/^\d+$/.test(t[0])) i++;

    if (t[i] !== 'permit' && t[i] !== 'deny') return { error: "must start with permit/deny" };
    ace.action = t[i++];

    // Standard ACL shorthand: "permit any" / "permit host X" / "permit 1.1.1.1 0.0.0.255"
    // — proto is implicit `ip` and only source matched.
    var protos = ['ip', 'tcp', 'udp', 'icmp', 'ospf', 'eigrp', 'ipv6'];
    if (protos.indexOf(t[i]) === -1) {
      ace.proto = 'ip';
      ace._standardShort = true;
    } else {
      ace.proto = t[i++];
    }

    // Source spec
    var src = takeAddrSpec(t, i);
    if (src.error) return { error: 'src: ' + src.error };
    ace.src = src.spec; i = src.next;

    // Source port (only TCP/UDP)
    if ((ace.proto === 'tcp' || ace.proto === 'udp') && i < t.length && isPortOp(t[i])) {
      var sp = takePortSpec(t, i);
      ace.srcPort = sp.spec; i = sp.next;
    }

    // Destination (extended only)
    if (!ace._standardShort && i < t.length) {
      var dst = takeAddrSpec(t, i);
      if (dst.error) return { error: 'dst: ' + dst.error };
      ace.dst = dst.spec; i = dst.next;

      if ((ace.proto === 'tcp' || ace.proto === 'udp') && i < t.length && isPortOp(t[i])) {
        var dp = takePortSpec(t, i);
        ace.dstPort = dp.spec; i = dp.next;
      }
    }

    // Trailing flags: established, log, time-range NAME
    while (i < t.length) {
      if (t[i] === 'established' || t[i] === 'log' || t[i] === 'log-input') {
        ace.flags.push(t[i++]);
      } else if (t[i] === 'time-range' && t[i + 1]) {
        ace.flags.push('time-range:' + t[i + 1]); i += 2;
      } else {
        return { error: 'unexpected token: ' + t[i] };
      }
    }

    return normalizeACE(ace);
  }

  function isPortOp(tok) {
    return ['eq', 'gt', 'lt', 'neq', 'range'].indexOf(tok) !== -1;
  }

  function takeAddrSpec(t, i) {
    if (t[i] === 'any') {
      return { spec: { any: true, ip: '0.0.0.0', wildcard: '255.255.255.255' }, next: i + 1 };
    }
    if (t[i] === 'host') {
      if (!t[i + 1]) return { error: 'host needs IP' };
      return { spec: { host: true, ip: t[i + 1], wildcard: '0.0.0.0' }, next: i + 2 };
    }
    // IP + wildcard
    if (!t[i] || !t[i + 1]) return { error: 'need IP wildcard' };
    return { spec: { ip: t[i], wildcard: t[i + 1] }, next: i + 2 };
  }

  function takePortSpec(t, i) {
    var op = t[i++];
    if (op === 'range') {
      return { spec: { op: 'range', a: portKey(t[i]), b: portKey(t[i + 1]) }, next: i + 2 };
    }
    return { spec: { op: op, a: portKey(t[i]) }, next: i + 1 };
  }

  function normalizeACE(ace) {
    if (ace.error) return ace;
    ace.flags = ace.flags || [];
    return ace;
  }

  // ──────────────────────────────────────────────────────────
  // Serialize back to IOS-style string
  // ──────────────────────────────────────────────────────────
  function serializeACE(ace) {
    if (!ace || ace.error) return '';
    var parts = [ace.action];
    if (!ace._standardShort) parts.push(ace.proto);
    parts.push(addrToStr(ace.src));
    if (ace.srcPort) parts.push(portToStr(ace.srcPort));
    if (ace.dst) parts.push(addrToStr(ace.dst));
    if (ace.dstPort) parts.push(portToStr(ace.dstPort));
    if (ace.flags && ace.flags.length) parts.push(ace.flags.join(' '));
    return parts.join(' ');
  }
  function addrToStr(a) {
    if (!a) return '';
    if (a.any) return 'any';
    if (a.host) return 'host ' + a.ip;
    return a.ip + ' ' + a.wildcard;
  }
  function portToStr(p) {
    if (!p) return '';
    if (p.op === 'range') return 'range ' + p.a + ' ' + p.b;
    return p.op + ' ' + p.a;
  }

  // ──────────────────────────────────────────────────────────
  // Match a single ACE against a packet
  // pkt = {srcIp, dstIp, proto:'tcp'|'udp'|'icmp'|'ip', srcPort, dstPort}
  // ──────────────────────────────────────────────────────────
  function matchACE(ace, pkt) {
    if (!ace || ace.error) return false;
    // Protocol — `ip` matches all
    if (ace.proto !== 'ip' && ace.proto !== pkt.proto) return false;

    // Source
    if (!wcMatch(pkt.srcIp, ace.src.ip, ace.src.wildcard)) return false;
    if (ace.srcPort && !portMatch(ace.srcPort, pkt.srcPort)) return false;

    // Destination (extended)
    if (ace.dst) {
      if (!wcMatch(pkt.dstIp, ace.dst.ip, ace.dst.wildcard)) return false;
      if (ace.dstPort && !portMatch(ace.dstPort, pkt.dstPort)) return false;
    }

    // established only matches TCP with ACK/RST
    if (ace.flags.indexOf('established') !== -1) {
      if (ace.proto !== 'tcp') return false;
      if (!pkt.tcpFlags || !(pkt.tcpFlags.ack || pkt.tcpFlags.rst)) return false;
    }

    return true;
  }

  function portMatch(spec, p) {
    if (p == null) return false;
    p = portKey(p);
    switch (spec.op) {
      case 'eq': return p === spec.a;
      case 'neq': return p !== spec.a;
      case 'gt': return p > spec.a;
      case 'lt': return p < spec.a;
      case 'range': return p >= spec.a && p <= spec.b;
    }
    return false;
  }

  // ──────────────────────────────────────────────────────────
  // Evaluate ACL list against packet — top-down, first-match-wins
  // Returns {action, line, ace, hitCounts}
  // ──────────────────────────────────────────────────────────
  function evaluate(acl, pkt) {
    var hitCounts = {};
    for (var i = 0; i < acl.length; i++) {
      var ace = acl[i];
      var line = ace.line || ((i + 1) * 10);
      if (matchACE(ace, pkt)) {
        hitCounts[line] = (hitCounts[line] || 0) + 1;
        return { action: ace.action, line: line, ace: ace, hitCounts: hitCounts, implicit: false };
      }
    }
    return { action: 'deny', line: 'implicit', ace: null, hitCounts: hitCounts, implicit: true };
  }

  // ──────────────────────────────────────────────────────────
  // Trap detectors — pattern-match user's ACL/placement and surface mistakes.
  // Each returns null OR { id, line, msg, fix, examTrap }.
  // ──────────────────────────────────────────────────────────
  var DETECTORS = {

    M01_permit_any_before_deny: function (acl) {
      // permit any/permit ip any any followed later by a deny — order trap
      for (var i = 0; i < acl.length; i++) {
        var a = acl[i];
        if (a.error) continue;
        var isPermitAny = a.action === 'permit'
          && (a.proto === 'ip' || a._standardShort)
          && a.src && a.src.any
          && (!a.dst || a.dst.any);
        if (isPermitAny) {
          for (var j = i + 1; j < acl.length; j++) {
            if (acl[j].action === 'deny') {
              return { id: 'M01', line: i + 1,
                msg: 'permit-any before a deny → deny line never matches',
                fix: 'Move the deny line ABOVE the permit-any. ACLs are top-down, first-match-wins.',
                examTrap: 'Day 34: "Order matters — `permit any` before a `deny X` makes the deny useless."' };
            }
          }
        }
      }
      return null;
    },

    M03_wildcard_inverted: function (acl) {
      for (var i = 0; i < acl.length; i++) {
        var a = acl[i]; if (a.error) continue;
        var specs = [a.src, a.dst].filter(Boolean);
        for (var k = 0; k < specs.length; k++) {
          var s = specs[k];
          if (s.host || s.any) continue;
          if (looksLikeSubnetMask(s.wildcard)) {
            return { id: 'M03', line: i + 1,
              msg: 'wildcard `' + s.wildcard + '` looks like a subnet mask — wildcards are INVERSE',
              fix: '/24 → `0.0.0.255` (NOT `255.255.255.0`). Subnet + wildcard = `255.255.255.255`.',
              examTrap: 'Day 34: "Wildcard mask is NOT subnet mask — it is the inverse."' };
          }
        }
      }
      return null;
    },

    M04_bare_ip_in_extended: function (acl) {
      // Parser already rejects bare IP in extended; surface friendlier explainer when error string matches
      for (var i = 0; i < acl.length; i++) {
        if (acl[i].error && /need IP wildcard/.test(acl[i].error) && !acl[i]._standardShort) {
          return { id: 'M04', line: i + 1,
            msg: 'bare IP in extended ACL — must use `host X` or `X 0.0.0.0`',
            fix: 'Replace `1.1.1.1` with `host 1.1.1.1` or `1.1.1.1 0.0.0.0`.',
            examTrap: 'Day 35: "Bare IP without `host` is NOT valid in extended ACLs."' };
        }
      }
      return null;
    },

    M05_standard_near_source: function (acl, placement, topology) {
      if (!placement || !topology) return null;
      var isStandard = acl.length && acl.every(function (a) { return a._standardShort || (a.proto === 'ip' && !a.dst); });
      if (!isStandard) return null;
      if (topology.standardNearDest && placement.router !== topology.destRouter) {
        return { id: 'M05', line: null,
          msg: 'Standard ACL applied near source — over-blocks intended traffic upstream',
          fix: 'Apply standard ACL CLOSE TO DESTINATION (router ' + topology.destRouter + ').',
          examTrap: 'Day 34: "Standard ACL is NOT placed near the source — place near the destination."' };
      }
      return null;
    },

    M06_extended_near_destination: function (acl, placement, topology) {
      if (!placement || !topology) return null;
      var isExtended = acl.length && acl.some(function (a) { return a.dst && !a._standardShort; });
      if (!isExtended) return null;
      if (topology.extendedNearSource && placement.router !== topology.srcRouter) {
        return { id: 'M06', line: null,
          msg: 'Extended ACL applied far from source — wastes upstream bandwidth',
          fix: 'Apply extended ACL CLOSE TO SOURCE (router ' + topology.srcRouter + ').',
          examTrap: 'Day 35: "Extended ACLs are NOT applied near destination — they go near source."' };
      }
      return null;
    },

    M08_two_acls_same_direction: function (acl, placement) {
      if (placement && placement.duplicateDir) {
        return { id: 'M08', line: null,
          msg: 'Tried to apply two ACLs to same interface, same direction',
          fix: 'Max 1 ACL per interface per direction (max 2 per interface total). Combine into one ACL.',
          examTrap: 'Day 34: "You CANNOT apply two ACLs in the same direction on one interface."' };
      }
      return null;
    },

    M09_http_uses_udp: function (acl) {
      for (var i = 0; i < acl.length; i++) {
        var a = acl[i]; if (a.error) continue;
        if (a.proto === 'udp') {
          var ports = [a.srcPort, a.dstPort].filter(Boolean);
          for (var k = 0; k < ports.length; k++) {
            if (ports[k].op === 'eq' && (ports[k].a === 80 || ports[k].a === 443)) {
              return { id: 'M09', line: i + 1,
                msg: 'HTTP/HTTPS over UDP — they run on TCP',
                fix: 'Change `udp` → `tcp` (HTTP=80/TCP, HTTPS=443/TCP).',
                examTrap: 'Day 35: "HTTP/HTTPS use TCP, NOT UDP — common quiz trap."' };
            }
          }
        }
      }
      return null;
    },

    M10_no_permit_remaining: function (acl) {
      if (!acl.length) return null;
      var anyPermit = acl.some(function (a) { return a.action === 'permit'; });
      if (!anyPermit) {
        return { id: 'M10', line: null,
          msg: 'ACL has only deny lines — implicit `deny any` will drop everything else',
          fix: 'Add `permit ip any any` (extended) or `permit any` (standard) at the end if you want unrelated traffic to flow.',
          examTrap: 'Day 34/35: "Implicit `deny any` at end — always remember an explicit permit if needed."' };
      }
      return null;
    },

    M11_host_with_wildcard: function (acl) {
      // Parser already rejects, but flag the input intent
      for (var i = 0; i < acl.length; i++) {
        var a = acl[i];
        if (a.error && /unexpected token/.test(a.error) && /host /.test(a._raw || '')) {
          return { id: 'M11', line: i + 1,
            msg: '`host X` and a wildcard mask are mutually exclusive',
            fix: 'Use either `host 1.1.1.1` OR `1.1.1.1 0.0.0.0` — not both.',
            examTrap: 'Day 34: "host = /32 shortcut. Adding a wildcard is invalid."' };
        }
      }
      return null;
    },

    M12_vty_uses_access_group: function (acl, placement) {
      if (placement && placement.vty && placement.command === 'access-group') {
        return { id: 'M12', line: null,
          msg: 'VTY lines use `access-class`, not `access-group`',
          fix: 'On `line vty 0 4`, command is `access-class N in` — `access-group` is for interfaces only.',
          examTrap: 'Day 35 EXTRA: "VTY ACL applies inbound with `access-class N in` (NOT `ip access-group`)."' };
      }
      return null;
    },

    M13_resequence_collision: function (acl, placement) {
      if (placement && placement.numbered && placement.attemptedInsert) {
        return { id: 'M13', line: null,
          msg: 'Cannot insert single entry into a NUMBERED ACL via global config',
          fix: 'Convert to NAMED ACL (`ip access-list extended NAME`) — then `15 permit ...` inserts at line 15.',
          examTrap: 'Day 35: "Numbered global config: can\'t delete single entry, can\'t insert. Named mode: can do both."' };
      }
      return null;
    },

    M14_established_on_udp: function (acl) {
      for (var i = 0; i < acl.length; i++) {
        var a = acl[i]; if (a.error) continue;
        if (a.proto === 'udp' && a.flags.indexOf('established') !== -1) {
          return { id: 'M14', line: i + 1,
            msg: '`established` on UDP — it is a TCP-only flag (matches ACK/RST)',
            fix: 'Use `established` only with `tcp`. UDP has no connection state.',
            examTrap: 'Day 35 EXTRA: "established matches return TCP traffic with ACK/RST set."' };
        }
      }
      return null;
    },

    M15_acl_number_range_wrong: function (acl, placement) {
      if (!placement || !placement.aclNumber) return null;
      var n = placement.aclNumber;
      var standardRange = (n >= 1 && n <= 99) || (n >= 1300 && n <= 1999);
      var extendedRange = (n >= 100 && n <= 199) || (n >= 2000 && n <= 2699);
      var hasExtendedFields = acl.some(function (a) { return a.dst && !a._standardShort; });
      if (standardRange && hasExtendedFields) {
        return { id: 'M15', line: null,
          msg: 'ACL number ' + n + ' is in STANDARD range (1-99/1300-1999) but rules use extended fields',
          fix: 'Use extended range: 100-199 or 2000-2699.',
          examTrap: 'Day 34/35: number range determines ACL type.' };
      }
      if (extendedRange && !hasExtendedFields) {
        return { id: 'M15b', line: null,
          msg: 'ACL number ' + n + ' is EXTENDED range but rules are source-only (standard shape)',
          fix: 'Use standard range 1-99 or 1300-1999.',
          examTrap: 'Day 34: standard ACL = source IP only.' };
      }
      return null;
    },

    M16_log_keyword_missing: function (acl, placement) {
      if (placement && placement.requireLog) {
        var hasLog = acl.some(function (a) { return a.flags.indexOf('log') !== -1 || a.flags.indexOf('log-input') !== -1; });
        if (!hasLog) {
          return { id: 'M16', line: null,
            msg: 'Scenario asks for counter-audit but no `log` keyword on any ACE',
            fix: 'Append `log` to the ACE you want to audit — counters + console messages on match.',
            examTrap: 'Day 34 EXTRA: `log` triggers syslog message on every match.' };
        }
      }
      return null;
    }
  };

  function detectTraps(acl, placement, topology) {
    var hits = [];
    Object.keys(DETECTORS).forEach(function (k) {
      var hit = DETECTORS[k](acl, placement || {}, topology || {});
      if (hit) hits.push(hit);
    });
    return hits;
  }

  // ──────────────────────────────────────────────────────────
  // Grade a scenario attempt — run expected packets through user's ACL
  // ──────────────────────────────────────────────────────────
  function gradeAttempt(scenario, acl, placement) {
    var results = [];
    var pass = 0;
    scenario.expectedOutcomes.forEach(function (eo) {
      var ev = evaluate(acl, eo.pkt);
      var got = ev.action;
      var want = eo.action;
      var ok = got === want;
      if (ok) pass++;
      results.push({ pkt: eo.pkt, want: want, got: got, line: ev.line, ok: ok, why: eo.why || '' });
    });
    return {
      pass: pass === scenario.expectedOutcomes.length,
      score: pass + '/' + scenario.expectedOutcomes.length,
      results: results
    };
  }

  // ──────────────────────────────────────────────────────────
  // Console fixtures — call ACL.fixtures() in browser DevTools to verify.
  // ──────────────────────────────────────────────────────────
  function fixtures() {
    var t = [];
    function eq(label, actual, expected) {
      var ok = JSON.stringify(actual) === JSON.stringify(expected);
      t.push({ label: label, ok: ok, actual: actual, expected: expected });
    }

    // wildcard math
    eq('wcMatch /24 hit', wcMatch('192.168.1.55', '192.168.1.0', '0.0.0.255'), true);
    eq('wcMatch /24 miss', wcMatch('192.168.2.55', '192.168.1.0', '0.0.0.255'), false);
    eq('wcMatch host', wcMatch('1.2.3.4', '1.2.3.4', '0.0.0.0'), true);
    eq('wcMatch any', wcMatch('5.6.7.8', '0.0.0.0', '255.255.255.255'), true);

    // subnet-mask sniffer
    eq('subnet detect /24', looksLikeSubnetMask('255.255.255.0'), true);
    eq('subnet detect /16', looksLikeSubnetMask('255.255.0.0'), true);
    eq('wildcard not subnet', looksLikeSubnetMask('0.0.0.255'), false);

    // parse + serialize round-trip
    var a1 = parseACE('permit ip any any');
    eq('parse permit ip any any', a1.action, 'permit');
    eq('serialize permit ip any any', serializeACE(a1), 'permit ip any any');

    var a2 = parseACE('deny tcp 192.168.10.0 0.0.0.255 host 10.0.0.5 eq 443');
    eq('parse extended', a2.action, 'deny');
    eq('parse extended port', a2.dstPort.a, 443);

    // evaluate — first-match-wins
    var acl = [
      parseACE('deny tcp 192.168.10.0 0.0.0.255 host 10.0.0.5 eq 443'),
      parseACE('permit ip any any')
    ];
    var ev1 = evaluate(acl, { srcIp: '192.168.10.50', dstIp: '10.0.0.5', proto: 'tcp', srcPort: 50000, dstPort: 443 });
    eq('eval drops https', ev1.action, 'deny');
    var ev2 = evaluate(acl, { srcIp: '192.168.10.50', dstIp: '10.0.0.5', proto: 'tcp', srcPort: 50000, dstPort: 80 });
    eq('eval permits http', ev2.action, 'permit');
    var ev3 = evaluate([parseACE('deny ip 1.1.1.0 0.0.0.255 any')], { srcIp: '2.2.2.2', dstIp: '3.3.3.3', proto: 'tcp', dstPort: 80 });
    eq('implicit deny', ev3.action, 'deny');
    eq('implicit deny line', ev3.line, 'implicit');

    // traps
    var trapAcl1 = [parseACE('permit ip any any'), parseACE('deny tcp host 1.1.1.1 host 2.2.2.2 eq 80')];
    var hits1 = detectTraps(trapAcl1, {}, {});
    eq('M01 fires', hits1.some(function (h) { return h.id === 'M01'; }), true);

    var trapAcl3 = [parseACE('permit ip 192.168.1.0 255.255.255.0 any')];
    var hits3 = detectTraps(trapAcl3, {}, {});
    eq('M03 fires', hits3.some(function (h) { return h.id === 'M03'; }), true);

    var trapAcl9 = [parseACE('deny udp any any eq 80'), parseACE('permit ip any any')];
    var hits9 = detectTraps(trapAcl9, {}, {});
    eq('M09 fires', hits9.some(function (h) { return h.id === 'M09'; }), true);

    var trapAcl10 = [parseACE('deny tcp host 1.1.1.1 any eq 22')];
    var hits10 = detectTraps(trapAcl10, {}, {});
    eq('M10 fires', hits10.some(function (h) { return h.id === 'M10'; }), true);

    var passed = t.filter(function (x) { return x.ok; }).length;
    var failed = t.length - passed;
    if (typeof console !== 'undefined') {
      console.log('ACL fixtures:', passed + '/' + t.length, failed ? 'FAIL' : 'PASS');
      if (failed) console.table(t.filter(function (x) { return !x.ok; }));
    }
    return { passed: passed, total: t.length, failed: failed, results: t };
  }

  // ──────────────────────────────────────────────────────────
  // Public API
  // ──────────────────────────────────────────────────────────
  var API = {
    parseACE: parseACE,
    serializeACE: serializeACE,
    matchACE: matchACE,
    wcMatch: wcMatch,
    evaluate: evaluate,
    detectTraps: detectTraps,
    gradeAttempt: gradeAttempt,
    fixtures: fixtures,
    ipToInt: ipToInt,
    intToIp: intToIp,
    looksLikeSubnetMask: looksLikeSubnetMask,
    DETECTORS: DETECTORS,
    PROTO_NUMS: PROTO_NUMS,
    WELL_KNOWN_PORTS: WELL_KNOWN_PORTS
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  if (root) root.ACL = API;

})(typeof window !== 'undefined' ? window : null);
