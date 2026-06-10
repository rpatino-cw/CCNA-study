/* ══════════════════════════════════════════════════════════════════════
   pillars-data.js  SINGLE SOURCE OF TRUTH for CCNA pillars + valuation
   46 pillars (P1-P4). freq/load averaged from data/objectives-app.js
   sub-objectives; tier fallback when no sub-objective matches.
   Value model is fully tunable via VALUE_WEIGHTS + TIER_FACTOR below.
   The examination is the sole judge: gap is driven only by passed dims,
   never by self-rating.
   ══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // ── Tunable value model config ───────────────────────────────
  var VALUE_WEIGHTS = { D: 0.30, T: 0.25, F: 0.25, L: 0.20 };
  var TIER_FACTOR   = { P1: 1.0, P2: 0.70, P3: 0.45, P4: 0.25 };

  // Domain exam weights (Cisco 200-301 blueprint, percent).
  var DOMAIN_WEIGHT = { 1: 20, 2: 20, 3: 25, 4: 10, 5: 15, 6: 10 };

  // ── Pillars (verbatim from pillars-trainer.html, augmented) ──
  var PILLARS_DATA = [
    { n:1, tier:'P1', obj:'3.4', dom:3, freq:74, load:59, title:'OSPFv2 single area',
      dims:['concept','config','sequence','topology','applied','scope'],
      bullets:[
        'RID selection order: manual > highest loopback > highest physical',
        'Adjacency match = TASA (Timers, Area, Subnet, Auth)',
        'States to adjacency: Down, Init, 2-Way, Exstart, Exchange, Loading, Full',
        'MTU mismatch stalls at Exstart/Exchange',
        'DR/BDR election: highest priority then highest RID; <code>priority 0</code> never DR',
        'Cost = 100M / interface-BW; reference BW 100 Mbps; AD 110',
        '<code>network</code> statements use wildcard masks; Hello 10s / Dead 40s'
      ] },
    { n:2, tier:'P1', obj:'3.1-3.2', dom:3, freq:74, load:43, title:'Routing table + forwarding',
      dims:['concept','sequence','topology','applied','scope'],
      bullets:[
        'Route codes: <code>C</code> connected, <code>L</code> local, <code>S</code> static, <code>O</code> OSPF, <code>*</code> candidate default',
        'Decision order: longest prefix match > lowest AD > lowest metric',
        'AD values: connected 0, static 1, eBGP 20, EIGRP 90, OSPF 110, RIP 120, EIGRP-external 170, iBGP 200, unreachable 255'
      ] },
    { n:3, tier:'P1', obj:'3.3', dom:3, freq:54, load:35, title:'Static routing',
      dims:['concept','config','sequence','topology','applied','scope'],
      bullets:[
        'Four forms: network route, host route (/32), default route (<code>0.0.0.0/0</code>), floating static',
        'Next-hop vs exit-interface (exit-int on multi-access can be slow without next-hop)',
        'Floating static = higher AD, used only as a backup route',
        'Use a subnet mask, not a wildcard mask'
      ] },
    { n:4, tier:'P1', obj:'4.1', dom:4, freq:56, load:46, title:'NAT',
      dims:['concept','config','sequence','topology','applied','scope'],
      bullets:[
        'Four address types: inside local, inside global, outside local, outside global',
        'Static NAT 1:1, dynamic pool many:many, PAT (overload) many:1 via ports',
        'Tag both interfaces: <code>ip nat inside</code> and <code>ip nat outside</code>'
      ] },
    { n:5, tier:'P1', obj:'2.5', dom:2, freq:57, load:46, title:'STP / Rapid PVST+',
      dims:['concept','config','sequence','topology','applied','scope'],
      bullets:[
        'Lowest BID = root (priority + VLAN + MAC; tie breaks on lowest MAC)',
        'Default bridge priority 32768, steps of 4096',
        'RSTP states: Discarding, Learning, Forwarding; roles: Root, Designated, Alternate, Backup',
        'Cost table: 10G=2, 1G=4, 100M=19, 10M=100',
        'PortFast = edge to forwarding; BPDU Guard = BPDU then err-disable',
        'Timers: Hello 2s, Fwd delay 15s, Max age 20s'
      ] },
    { n:6, tier:'P1', obj:'2.1-2.2', dom:2, freq:67, load:44, title:'VLANs + trunking',
      dims:['concept','config','sequence','topology','applied','scope'],
      bullets:[
        'Access port = 1 VLAN, untagged; trunk = many VLANs, 802.1Q tagged',
        'Native VLAN must match on both ends',
        'Prune with the allowed VLAN list on the trunk',
        'Inter-VLAN: Router-on-a-Stick subinterfaces vs SVIs on an L3 switch'
      ] },
    { n:7, tier:'P1', obj:'2.4', dom:2, freq:51, load:37, title:'EtherChannel',
      dims:['concept','config','sequence','topology','applied','scope'],
      bullets:[
        'LACP active/passive, PAgP desirable/auto, or static (on)',
        'Valid combos: active-active, active-passive, desirable-desirable, desirable-auto, on-on',
        'Both ends must match; never mix LACP and PAgP',
        'Max 8 active links per bundle'
      ] },
    { n:8, tier:'P1', obj:'5.6', dom:5, freq:55, load:37, title:'ACLs',
      dims:['concept','config','sequence','topology','applied','scope'],
      bullets:[
        'Standard 1-99 (and 1300-1999): source only, place near the destination',
        'Extended 100-199 (and 2000-2699): 5-tuple, place near the source',
        'Wildcard: 0 = match, 1 = ignore',
        'Top-down first-match-wins; implicit <code>deny any</code> at the end',
        'VTY uses <code>access-class</code>; interfaces use <code>ip access-group</code>'
      ] },
    { n:9, tier:'P1', obj:'5.7', dom:5, freq:45, load:34, title:'Layer 2 security',
      dims:['concept','config','sequence','topology','applied','scope'],
      bullets:[
        'Port security: max addresses, sticky learning, violation modes (protect/restrict/shutdown)',
        'DHCP snooping: trusted vs untrusted ports',
        'Dynamic ARP Inspection (DAI) relies on the DHCP snooping binding table'
      ] },
    { n:10, tier:'P1', obj:'5.3', dom:5, freq:38, load:23, title:'Local device access',
      dims:['concept','config','sequence','applied','scope'],
      bullets:[
        '<code>enable secret</code> (hashed) beats <code>enable password</code> (weak)',
        'Console and VTY lines: <code>login</code> vs <code>login local</code>',
        '<code>service password-encryption</code> is weak (Type 7), obfuscation only'
      ] },
    { n:11, tier:'P1', obj:'1.8-1.9', dom:1, freq:49, load:38, title:'IPv6 + EUI-64',
      dims:['concept','config','sequence','applied','scope'],
      bullets:[
        'GUA 2000::/3, ULA FC00::/7, link-local FE80::/10, multicast FF00::/8',
        'EUI-64: insert FFFE in the middle of the MAC, flip the 7th bit',
        'Multicast: FF02::1 all-nodes, ::2 all-routers, ::5 all-OSPF, ::6 OSPF-DR',
        'SLAAC (host builds its address from RA) vs DHCPv6 stateful (server assigns)'
      ] },
    { n:12, tier:'P1', obj:'1.6', dom:1, freq:61, load:38, title:'IPv4 subnetting',
      dims:['concept','sequence','applied','scope'],
      bullets:[
        'Mask octets: 128, 192, 224, 240, 248, 252, 254, 255',
        'Magic number = 256 minus the interesting mask octet',
        'Hosts = 2^host-bits minus 2 (/30=2, /29=6, /28=14, /26=62)',
        'VLSM: assign the largest subnet first'
      ] },
    { n:13, tier:'P2', obj:'1.5', dom:1, freq:56, load:22, title:'TCP vs UDP + ports',
      dims:['concept','scope'],
      bullets:[
        'TCP reliable, ordered, 3-way handshake; UDP fast, connectionless',
        'TCP ports: FTP 20/21, SSH 22, Telnet 23, SMTP 25, HTTP 80, HTTPS 443, TACACS+ 49',
        'UDP ports: DHCP 67/68, TFTP 69, NTP 123, SNMP 161/162, Syslog 514, RADIUS 1812/1813',
        'DNS uses both TCP and UDP 53'
      ] },
    { n:14, tier:'P2', obj:'1.1', dom:1, freq:46, load:20, title:'Network components + PoE',
      dims:['concept','scope'],
      bullets:[
        'Router (L3), switch (L2), AP, WLC, NGFW/IPS, endpoint, server',
        'PoE standards: 802.3af, 802.3at, 802.3bt'
      ] },
    { n:15, tier:'P2', obj:'1.11', dom:1, freq:44, load:29, title:'Wireless principles',
      iso:true,
      dims:['concept','scope'],
      bullets:[
        '2.4 GHz non-overlapping channels: 1, 6, 11',
        'SSID is the network name; BSSID is the AP radio MAC',
        'WPA2 = AES/CCMP; WPA3 = SAE; WEP/WPA are legacy',
        'Autonomous AP (self-managed) vs lightweight (WLC + CAPWAP)'
      ] },
    { n:16, tier:'P2', obj:'4.8', dom:4, freq:48, load:19, title:'SSH remote access',
      dims:['concept','scope'],
      bullets:[
        'In-order setup: hostname, then ip domain-name, then generate the RSA key',
        'Hostname and domain name must be set before generating the crypto key',
        'On VTY lines: <code>transport input ssh</code> and <code>login local</code>'
      ] },
    { n:17, tier:'P2', obj:'4.6', dom:4, freq:42, load:28, title:'DHCP client + relay',
      dims:['concept','scope'],
      bullets:[
        'DORA: Discover, Offer, Request, Acknowledge',
        'Router as DHCP server uses an address pool',
        'Relay across subnets with <code>ip helper-address</code>'
      ] },
    { n:18, tier:'P2', obj:'4.7', dom:4, freq:33, load:40, title:'QoS PHB',
      dims:['concept','scope'],
      bullets:[
        'Per-hop behavior: classify, mark, queue',
        'Policing drops excess (no delay) vs shaping buffers excess (adds delay)',
        'Mark with DSCP (L3) or CoS (L2)'
      ] },
    { n:19, tier:'P2', obj:'3.5', dom:3, freq:43, load:39, title:'FHRP HSRP/VRRP/GLBP',
      dims:['concept','scope'],
      bullets:[
        'Virtual IP + virtual MAC give a redundant default gateway',
        'HSRP and GLBP are Cisco; VRRP is open standard',
        'GLBP load-balances across multiple active gateways'
      ] },
    { n:20, tier:'P2', obj:'2.9/5.10', dom:2, freq:32, load:25, title:'WLAN GUI WPA2-PSK',
      iso:true,
      dims:['concept','scope'],
      bullets:[
        'WLC GUI flow: create WLAN, set SSID',
        'Security tab: WPA2 + PSK',
        'Map the WLAN to an interface/VLAN'
      ] },
    { n:21, tier:'P3', obj:'1.4', dom:1, freq:52, load:31, title:'Cable / interface issues',
      dims:['concept','scope'],
      bullets:[
        'Duplex mismatch = late collisions + a slow link',
        'Speed mismatch = link down',
        'Check show interfaces for CRC and error counters'
      ] },
    { n:22, tier:'P3', obj:'1.7', dom:1, freq:51, load:17, title:'Private IPv4 (RFC 1918)',
      dims:['concept','scope'],
      bullets:[
        '10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16',
        'APIPA 169.254.0.0/16 means DHCP failed',
        'Private ranges are not internet routable (need NAT)'
      ] },
    { n:23, tier:'P3', obj:'1.13', dom:1, freq:50, load:27, title:'Switching concepts (MAC)',
      dims:['concept','scope'],
      bullets:[
        'Learn source MAC to port, forward to known dest, flood if unknown',
        'MAC table aging default 300s',
        'Verify with show mac address-table'
      ] },
    { n:24, tier:'P3', obj:'2.3', dom:2, freq:45, load:22, title:'CDP / LLDP',
      dims:['concept','scope'],
      bullets:[
        'CDP is Cisco: 60s timer, 180s hold',
        'LLDP is open standard: 30s timer, 120s hold',
        'Both find directly connected neighbors (show cdp neighbors)'
      ] },
    { n:25, tier:'P3', obj:'2.6-2.7', dom:2, freq:38, load:28, title:'Wireless arch + WLAN physical',
      iso:true,
      dims:['concept','scope'],
      bullets:[
        'Autonomous AP is self managed; lightweight AP is WLC managed via CAPWAP',
        'AP switchport is access (one SSID/VLAN) or trunk (multiple)',
        'WLC uplink uses LAG'
      ] },
    { n:26, tier:'P3', obj:'2.8', dom:2, freq:42, load:25, title:'Device mgmt access methods',
      dims:['concept','scope'],
      bullets:[
        'Telnet is plaintext; SSH is encrypted (use SSHv2)',
        'TACACS+ is Cisco, TCP 49, splits AAA',
        'RADIUS is open, UDP 1812/1813, merges authN and authZ'
      ] },
    { n:27, tier:'P3', obj:'4.2', dom:4, freq:34, load:21, title:'NTP',
      dims:['concept','scope'],
      bullets:[
        'ntp server points at a source (client); ntp master acts as the source',
        'Stratum 1 to 15 (lower is closer to the clock source)',
        'Verify with show ntp status'
      ] },
    { n:28, tier:'P3', obj:'4.3', dom:4, freq:44, load:27, title:'DHCP & DNS roles',
      dims:['concept','scope'],
      bullets:[
        'DHCP auto assigns IP config via DORA (Discover, Offer, Request, Ack)',
        'DNS resolves a name to an IP',
        'Roles: server, client, relay'
      ] },
    { n:29, tier:'P3', obj:'4.4', dom:4, freq:35, load:30, title:'SNMP',
      dims:['concept','scope'],
      bullets:[
        'Monitor and manage devices; UDP 161 (poll) and 162 (notify)',
        'v2c uses a community string (plaintext); v3 is encrypted and authenticated',
        'Trap is unacknowledged; inform is acknowledged'
      ] },
    { n:30, tier:'P3', obj:'4.5', dom:4, freq:45, load:21, title:'Syslog severity 0 to 7',
      dims:['concept','scope'],
      bullets:[
        '0 Emergency, 1 Alert, 2 Critical, 3 Error',
        '4 Warning, 5 Notice, 6 Info, 7 Debug',
        'Lower number is worse (0 is most severe)'
      ] },
    { n:31, tier:'P3', obj:'5.1', dom:5, freq:30, load:19, title:'Threats / vulnerabilities / exploits',
      dims:['concept','scope'],
      bullets:[
        'Vulnerability = a weakness',
        'Threat = potential danger; exploit = uses the weakness',
        'Mitigation = reduces the risk'
      ] },
    { n:32, tier:'P3', obj:'5.8', dom:5, freq:36, load:27, title:'AAA concepts',
      dims:['concept','scope'],
      bullets:[
        'Authentication = who you are',
        'Authorization = what you can do',
        'Accounting = what you did'
      ] },
    { n:33, tier:'P3', obj:'5.9', dom:5, freq:34, load:25, title:'Wireless security (WPA/2/3)',
      iso:true,
      dims:['concept','scope'],
      bullets:[
        'WEP and WPA are legacy and broken',
        'WPA2 = AES/CCMP',
        'WPA3 = SAE (replaces the PSK handshake)'
      ] },
    { n:34, tier:'P4', obj:'1.2', dom:1, freq:42, load:24, title:'Topology architectures',
      dims:['concept','scope'],
      bullets:[
        'Spine-leaf = data center; 2-tier collapsed core; 3-tier core/dist/access',
        'WAN connects sites; SOHO is a small office',
        'Cloud delivers resources on demand'
      ] },
    { n:35, tier:'P4', obj:'1.3', dom:1, freq:45, load:22, title:'Cabling types',
      dims:['concept','scope'],
      bullets:[
        'Single-mode fiber: laser, long haul',
        'Multimode fiber: LED, shorter runs',
        'Copper: 100 m max'
      ] },
    { n:36, tier:'P4', obj:'1.10', dom:1, freq:40, load:18, title:'IP params per OS',
      dims:['concept','scope'],
      bullets:[
        'Windows: ipconfig',
        'Mac and Linux: ifconfig or ip',
        'Use them to read interface address config'
      ] },
    { n:37, tier:'P4', obj:'1.12', dom:1, freq:38, load:28, title:'Virtualization',
      dims:['concept','scope'],
      bullets:[
        'VM = full OS on a hypervisor',
        'Container shares the host OS (lighter)',
        'VRF = a virtual routing table'
      ] },
    { n:38, tier:'P4', obj:'4.9', dom:4, freq:24, load:15, title:'TFTP / FTP',
      dims:['concept','scope'],
      bullets:[
        'TFTP: UDP 69, no auth, simple',
        'FTP: TCP 20/21, authenticated, full featured',
        'TFTP is common for IOS image transfers'
      ] },
    { n:39, tier:'P4', obj:'5.2', dom:5, freq:18, load:10, title:'Security program elements',
      dims:['concept','scope'],
      bullets:[
        'User awareness',
        'Training',
        'Physical access control'
      ] },
    { n:40, tier:'P4', obj:'5.4', dom:5, freq:26, load:18, title:'Password policy / MFA / certs',
      dims:['concept','scope'],
      bullets:[
        'MFA = something you know, have, or are',
        'Certificates bind identity to a key',
        'Biometrics are an are factor'
      ] },
    { n:41, tier:'P4', obj:'5.5', dom:5, freq:32, load:29, title:'IPsec VPN',
      dims:['concept','scope'],
      bullets:[
        'Site to site: gateway to gateway',
        'Remote access: client to gateway',
        'IPsec provides confidentiality and integrity'
      ] },
    { n:42, tier:'P4', obj:'6.1-6.3', dom:6, freq:29, load:24, title:'SDN / controller architecture',
      iso:true,
      dims:['concept','scope'],
      bullets:[
        'Control plane = the brain; data plane = forwarding',
        'Northbound API talks to apps; southbound API talks to devices',
        'Overlay rides on the underlay (fabric)'
      ] },
    { n:43, tier:'P4', obj:'6.5', dom:6, freq:36, load:22, title:'REST APIs',
      iso:true,
      dims:['concept','scope'],
      bullets:[
        'CRUD maps to POST (create), GET (read), PUT (update), DELETE',
        'Stateless, over HTTP',
        'Payloads are usually JSON'
      ] },
    { n:44, tier:'P4', obj:'6.6', dom:6, freq:25, load:23, title:'Ansible / Terraform',
      iso:true,
      dims:['concept','scope'],
      bullets:[
        'Ansible: agentless, push, YAML',
        'Terraform: declarative, infrastructure as code',
        'Both automate device and infra config'
      ] },
    { n:45, tier:'P4', obj:'6.7', dom:6, freq:27, load:11, title:'JSON components',
      iso:true,
      dims:['concept','scope'],
      bullets:[
        'Object in braces, array in brackets',
        'Data as key then value pairs',
        'Types: string, number, boolean, null'
      ] },
    { n:46, tier:'P4', obj:'6.4', dom:6, freq:22, load:22, title:'AI / ML in network ops',
      iso:true,
      dims:['concept','scope'],
      bullets:[
        'Generative AI creates content; predictive AI forecasts',
        'ML = pattern detection',
        'Used for anomaly detection and assurance'
      ] }
  ];


  // ── Per-pillar normalized factors (each 0..1) ────────────────
  function _D(p) { return (DOMAIN_WEIGHT[p.dom] || 0) / 25; }
  function _T(p) { return TIER_FACTOR[p.tier] || 0; }
  function _F(p) { return (p.freq || 0) / 100; }
  function _L(p) { return (p.load || 0) / 100; }

  // ExamValue 0..10. The pillar's intrinsic weight on the exam.
  function pillarValue(p) {
    var w = VALUE_WEIGHTS;
    var v = 10 * (w.D * _D(p) + w.T * _T(p) + w.F * _F(p) + w.L * _L(p));
    return Math.round(v * 100) / 100;
  }

  // applicable dims for a pillar (the list it ships with).
  function _dimsOf(p) { return (p.dims && p.dims.length) ? p.dims : ['concept', 'scope']; }

  // Backed dims = the pillar's declared dims that ALSO have a drill authored
  // in window.PILLAR_CHECKS at call time. We intersect against PILLAR_CHECKS
  // KEYS (authored dims), never against the passed-checks object, so a pillar
  // cannot falsely reach gap 0 just because a dim was marked passed.
  // Returns null when PILLAR_CHECKS is unavailable (so callers fall back to
  // _dimsOf and current behavior).
  function _backedDimsOf(p) {
    var pc = (typeof window !== 'undefined') ? window.PILLAR_CHECKS : null;
    if (!pc) { return null; }            // PILLAR_CHECKS not loaded -> caller falls back
    var authored = pc[p.n];
    if (!authored) { return []; }        // pillar has no entry at all -> zero-check (dead-end)
    var declared = _dimsOf(p);
    var out = [];
    for (var i = 0; i < declared.length; i++) {
      if (Object.prototype.hasOwnProperty.call(authored, declared[i])) { out.push(declared[i]); }
    }
    return out;
  }

  // Applicable dims for gap math: the declared dims that actually have a
  // backing drill. If a pillar has SOME authored dims, only those count
  // (so the 26 authored pillars can reach gap 0). If a pillar has ZERO
  // authored dims, it is a dead-end with no drills to clear.
  // Option A (council-recommended, documented): zero-check pillars are
  // EXCLUDED from readiness and study-next so the readiness ceiling can
  // reach 100%. _applicableDims returns an empty array for those; callers
  // (readiness, studyNext, pillarROI) treat an empty applicable set as
  // "exclude from the denominator / drop from the list".
  function _applicableDims(p) {
    var backed = _backedDimsOf(p);
    if (backed === null) { return _dimsOf(p); }  // PILLAR_CHECKS not loaded: current behavior
    return backed;                                // [] when zero-check -> excluded by callers
  }

  // Gap 0..1 = 1 - (applicable dims passed / applicable dims count).
  // checks = { <n>: { dim:true, ... }, ... }. Only true counts as passed.
  // Applicable dims are intersected with the authored drills in PILLAR_CHECKS.
  function pillarGap(p, checks) {
    var dims = _applicableDims(p);
    var c = (checks && checks[p.n]) || {};
    var passed = 0;
    for (var i = 0; i < dims.length; i++) { if (c[dims[i]] === true) passed++; }
    return dims.length ? (1 - passed / dims.length) : 1;
  }

  // True when a pillar has zero backing drills (a dead-end). Such pillars
  // are excluded from readiness and study-next under option A.
  function _isZeroCheck(p) {
    var backed = _backedDimsOf(p);
    return backed !== null && backed.length === 0;
  }

  // ROI = ExamValue * Gap. What you gain by studying this next.
  // Zero-check pillars have no clearable drills, so their ROI is 0 (they
  // never surface in study-next).
  function pillarROI(p, checks) {
    if (_isZeroCheck(p)) { return 0; }
    return Math.round(pillarValue(p) * pillarGap(p, checks) * 100) / 100;
  }

  // Mastered = ALL applicable dims passed (gap === 0).
  function pillarMastered(p, checks) {
    return pillarGap(p, checks) === 0;
  }

  // Readiness% overall and per domain.
  // Readiness = 100 * sum(ExamValue * (1 - gap)) / sum(ExamValue).
  function readiness(checks) {
    var sumV = 0, sumVR = 0;
    var domV = {}, domVR = {};
    for (var i = 0; i < PILLARS_DATA.length; i++) {
      var p = PILLARS_DATA[i];
      // Option A: zero-check pillars have no clearable drills, so they are
      // excluded from the readiness denominator. Otherwise their gap would
      // stay 1.0 forever and cap readiness below 100%.
      if (_isZeroCheck(p)) { continue; }
      var v = pillarValue(p);
      var r = 1 - pillarGap(p, checks);
      sumV += v; sumVR += v * r;
      domV[p.dom] = (domV[p.dom] || 0) + v;
      domVR[p.dom] = (domVR[p.dom] || 0) + v * r;
    }
    var byDomain = {};
    for (var d in domV) {
      if (Object.prototype.hasOwnProperty.call(domV, d)) {
        byDomain[d] = domV[d] ? Math.round(1000 * domVR[d] / domV[d]) / 10 : 0;
      }
    }
    return {
      overall: sumV ? Math.round(1000 * sumVR / sumV) / 10 : 0,
      byDomain: byDomain
    };
  }

  // Study-Next: highest ROI first, tie-break tier (P1 first) then pillar number.
  var _TIER_RANK = { P1: 0, P2: 1, P3: 2, P4: 3 };
  function studyNext(checks) {
    // Option A: drop zero-check pillars (no authored drills) so dead-ends
    // like FHRP (n:19) never surface as something to study next.
    return PILLARS_DATA.filter(function (p) { return !_isZeroCheck(p); }).sort(function (a, b) {
      var ra = pillarROI(a, checks), rb = pillarROI(b, checks);
      if (rb !== ra) return rb - ra;
      var ta = _TIER_RANK[a.tier], tb = _TIER_RANK[b.tier];
      if (ta !== tb) return ta - tb;
      return a.n - b.n;
    });
  }

  // ── Expose on window ─────────────────────────────────────────
  window.PILLARS_DATA   = PILLARS_DATA;
  window.VALUE_WEIGHTS  = VALUE_WEIGHTS;
  window.TIER_FACTOR    = TIER_FACTOR;
  window.DOMAIN_WEIGHT  = DOMAIN_WEIGHT;
  window.pillarValue    = pillarValue;
  window.pillarGap      = pillarGap;
  window.pillarROI      = pillarROI;
  window.pillarMastered = pillarMastered;
  window.readiness      = readiness;
  window.studyNext      = studyNext;
  window.isZeroCheck   = _isZeroCheck;
  window.activePillars = function () { return PILLARS_DATA.filter(function (p) { return !_isZeroCheck(p); }); };
})();
