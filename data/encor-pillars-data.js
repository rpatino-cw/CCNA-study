/* ══════════════════════════════════════════════════════════════════════
   encor-pillars-data.js  SINGLE SOURCE OF TRUTH for ENCOR 350-401 v1.2
   26 pillars (P1-P2). Domain weights from Cisco 350-401 blueprint.
   Same value model as pillars-data.js — fully tunable.
   ══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // ── Tunable value model config ───────────────────────────────
  var VALUE_WEIGHTS = { D: 0.30, T: 0.25, F: 0.25, L: 0.20 };
  var TIER_FACTOR   = { P1: 1.0, P2: 0.70, P3: 0.45, P4: 0.25 };

  // Domain exam weights (Cisco 350-401 v1.2 blueprint, percent).
  var DOMAIN_WEIGHT = { 1: 15, 2: 10, 3: 30, 4: 10, 5: 20, 6: 15 };

  // ── Pillars ────────────────────────────────────────────────
  var ENCOR_PILLARS_DATA = [

    // ── D1 Architecture ───────────────────────────────────────
    { n:1, tier:'P2', obj:'1.1', dom:1, freq:38, load:32, title:'Enterprise design: 2-tier/3-tier/spine-leaf/fabric',
      dims:['concept','scope'],
      bullets:[
        '3-tier: core (fast L3 backbone), distribution (policy/summarization), access (end users)',
        '2-tier (collapsed-core): distribution + core merged; smaller deployments',
        'Spine-leaf: data center fabric; every leaf connects to every spine (ECMP, no spanning tree)',
        'Fabric (SD-Fabric): overlay on underlay; deterministic, automated; east-west optimized',
        'Choose based on scale, redundancy, east-west vs north-south traffic ratio'
      ] },

    { n:2, tier:'P1', obj:'1.2', dom:1, freq:62, load:55, title:'SD-WAN: vManage/vSmart/vBond/vEdge + OMP',
      dims:['concept','config','scope'],
      bullets:[
        '<code>vManage</code> = GUI/API orchestration (NMS); <code>vSmart</code> = control plane, distributes routing via OMP',
        '<code>vBond</code> = orchestrator, mutual TLS auth + NAT traversal; <code>vEdge/cEdge</code> = data-plane router',
        'OMP (Overlay Management Protocol) carries routes, policies, crypto keys over DTLS/TLS to vSmart',
        'Overlay tunnels: IPsec + DTLS; underlay can be MPLS, broadband, LTE',
        'Zero-touch provisioning (ZTP) via vBond; all devices authenticate with certificates',
        'App-aware routing picks the best transport per SLA (latency/jitter/loss thresholds)'
      ] },

    { n:3, tier:'P1', obj:'1.3', dom:1, freq:65, load:58, title:'SD-Access: 3 planes, LISP + VXLAN + CTS',
      dims:['concept','scope'],
      bullets:[
        'Control plane: <code>LISP</code> (maps EID endpoints to RLOC fabric nodes)',
        'Data plane: <code>VXLAN</code> encapsulates the original frame (24-bit VNI, UDP 4789)',
        'Policy plane: <code>CTS / TrustSec</code> applies SGT-based group policies',
        'Catalyst Center (DNA-C) acts as the orchestrator and LISP map-server/resolver',
        'Fabric roles: control-plane node, border node, edge node, intermediate node',
        'Macro-segmentation via VNs (Virtual Networks); micro-segmentation via SGTs'
      ] },

    { n:4, tier:'P2', obj:'1.1', dom:1, freq:42, load:35, title:'Control/data/management planes + CEF',
      dims:['concept','scope'],
      bullets:[
        'Management plane: device config/monitoring (SSH, SNMP, NETCONF)',
        'Control plane: builds routing/forwarding tables (OSPF, BGP, STP)',
        'Data plane: actual packet forwarding; hardware-based at line rate',
        'CEF: pre-built FIB (from RIB) + Adjacency Table (from ARP); enables distributed forwarding',
        'Process switching (slow) vs fast switching (cache) vs CEF (deterministic hardware)',
        'Punt: control-plane packet handed to CPU (e.g., TTL expired, options set)'
      ] },

    // ── D2 Virtualization ─────────────────────────────────────
    { n:5, tier:'P1', obj:'2.1', dom:2, freq:58, load:50, title:'VRF / VRF-lite / vSwitch',
      dims:['concept','config','scope'],
      bullets:[
        'VRF = separate routing table + FIB per tenant on one physical router',
        'VRF-lite: VRF without MPLS; inter-VRF routing requires route leaking or a physical link',
        'Interface assigned to VRF: <code>ip vrf forwarding &lt;name&gt;</code> (clears the IP)',
        'MP-BGP carries VRF routes across provider network (VPNv4/VPNv6)',
        'vSwitch (VMware vSS/vDS or OVS): virtual L2 switch inside a hypervisor host',
        'Port groups on vSwitch map to VLANs; trunk uplinks carry tagged frames to the physical switch'
      ] },

    { n:6, tier:'P2', obj:'2.2', dom:2, freq:45, load:38, title:'GRE and IPsec tunnels',
      dims:['concept','scope'],
      bullets:[
        'GRE: IP protocol 47, no encryption, adds 24-byte overhead; can carry multicast/routing protocols',
        'GRE over IPsec = common combo: GRE provides multicast, IPsec adds encryption',
        'IPsec phases: IKE Phase 1 (ISAKMP SA, DH key exchange) then Phase 2 (IPsec SA)',
        'Modes: tunnel mode (encrypts entire original packet) vs transport mode (payload only)',
        'ESP (protocol 50) provides encryption + integrity; AH (protocol 51) integrity only',
        '<code>tunnel mode gre ip</code> on both ends; source/destination must route to each other'
      ] },

    { n:7, tier:'P1', obj:'2.2', dom:2, freq:60, load:52, title:'VXLAN encapsulation + VTEP',
      dims:['concept','scope'],
      bullets:[
        'VXLAN stretches L2 over L3; 24-bit VNI supports 16 million segments (vs 4096 VLANs)',
        'Encap: MAC-in-UDP; outer UDP dest port <code>4789</code>; outer IP = VTEP IP',
        'VTEP (VXLAN Tunnel End Point) terminates the tunnel; can be a physical switch or hypervisor NIC',
        'Flood-and-learn (static) or EVPN control plane (BGP EVPN) for MAC/IP distribution',
        'EVPN BGP: Route Type 2 (MAC+IP), Type 3 (inclusive multicast), Type 5 (IP prefix)',
        'Used in SD-Access data plane and data center fabrics (ACI, NXOS)'
      ] },

    { n:8, tier:'P2', obj:'2.2', dom:2, freq:40, load:33, title:'LISP control plane: RLOC / EID',
      dims:['concept','scope'],
      bullets:[
        'LISP separates identity (EID) from location (RLOC)',
        'EID: end-host address (used in original packet); RLOC: fabric edge node address (outer header)',
        'Map-Server registers EID-to-RLOC bindings; Map-Resolver answers queries',
        'xTR = ingress tunnel router (ITR) + egress tunnel router (ETR); PxTR = proxy xTR for non-LISP sites',
        'SD-Access uses LISP as the control plane; Catalyst Center acts as map-server/resolver',
        'Benefit: endpoints keep their address when roaming between fabric edges (no routing change)'
      ] },

    // ── D3 Infrastructure ─────────────────────────────────────
    { n:9, tier:'P1', obj:'3.1', dom:3, freq:65, load:55, title:'RSTP and MST',
      dims:['concept','config','scope'],
      bullets:[
        'RSTP (802.1w): port roles Root/Designated/Alternate/Backup; states Discarding/Learning/Forwarding',
        'RSTP convergence via proposal/agreement handshake (seconds, not 30-50s like classic STP)',
        'PVST+: one STP instance per VLAN (Cisco); Rapid PVST+ = RSTP per VLAN',
        'MST (802.1s): maps multiple VLANs to fewer instances (IST = instance 0 + CIST)',
        'MST region: switches with same name, revision, VLAN-to-instance map; external appears as one virtual bridge',
        'BID = priority (4096 steps) + system-ID-extension (VLAN) + MAC; lowest wins root'
      ] },

    { n:10, tier:'P2', obj:'3.1', dom:3, freq:48, load:40, title:'EtherChannel: LACP / hash / L2-L3',
      dims:['concept','config','scope'],
      bullets:[
        'LACP (802.3ad): active-active or active-passive; PAgP (Cisco): desirable-desirable or desirable-auto',
        'All member links must match: speed, duplex, VLAN, STP settings',
        'Load-balancing hash: src/dst MAC (L2), src/dst IP (L3), src/dst port (L4); per-flow not per-packet',
        'L2 port-channel = trunk or access; L3 port-channel = no switchport, routed',
        '<code>channel-group &lt;n&gt; mode active</code>; verify with <code>show etherchannel summary</code>',
        'Max 8 active links per bundle (LACP allows 16 with 8 standby)'
      ] },

    { n:11, tier:'P1', obj:'3.2', dom:3, freq:68, load:60, title:'EIGRP: feasible successor / DUAL / K-values',
      dims:['concept','config','scope'],
      bullets:[
        'DUAL guarantees loop-free alternate paths; stores successor (best) and feasible successors (backup)',
        'Feasibility condition: neighbor reported distance (RD) &lt; feasible distance (FD) of current successor',
        'K-values: K1=bandwidth, K2=0, K3=delay, K4=0, K5=0 (default); K1 and K3 only by default',
        'Metric = 256 * (10^7/min-BW + sum-delay/10) using K1 and K3',
        'Named EIGRP mode: <code>router eigrp &lt;name&gt;</code> under address-family; classic mode uses AS number',
        '<code>show ip eigrp topology</code> shows successors and feasible successors; <code>show ip eigrp neighbors</code>'
      ] },

    { n:12, tier:'P1', obj:'3.2', dom:3, freq:70, load:62, title:'OSPF advanced: multi-area / LSA types / area types / summarization',
      dims:['concept','config','scope'],
      bullets:[
        'LSA: <code>1</code> Router (intra), <code>2</code> Network (DR), <code>3</code> Summary (ABR inter-area), <code>4</code> ASBR-summary, <code>5</code> External (ASBR), <code>7</code> NSSA-external (to Type5 at ABR)',
        '<code>E1</code> = external+internal cost (varies); <code>E2</code> = external only (default, constant); E1 preferred',
        'Area types: Stub blocks T5; Totally-Stubby blocks T3+4+5; NSSA allows redistribution via T7',
        'All areas must touch <code>area 0</code>; fix discontiguous backbone with <code>virtual-link</code>',
        'ABR summarizes with <code>area X range</code>; ASBR with <code>summary-address</code>',
        'Cost = ref-bw / int-bw, default ref-bw <code>100</code> Mbps (set consistently); AD <code>110</code>'
      ],
      config:'router ospf 1 / router-id 2.2.2.2 / area 1 stub no-summary / area 1 range 10.1.0.0 255.255.0.0 / network 10.0.12.0 0.0.0.255 area 0',
      show:'show ip ospf database, show ip route ospf (O IA, O E1, O E2, O N2)' },

    { n:13, tier:'P1', obj:'3.2', dom:3, freq:72, load:65, title:'eBGP: neighbors / attributes / 13-step best-path',
      dims:['concept','config','scope'],
      bullets:[
        'TCP <code>179</code>; manual <code>neighbor</code> stmt, no auto-discovery; eBGP AD <code>20</code>, iBGP AD <code>200</code>',
        'eBGP peers usually directly connected (TTL <code>1</code>); iBGP needs full mesh or route-reflector',
        'States: <code>Idle, Connect, Active, OpenSent, OpenConfirm, Established</code> (routes swap only at Established)',
        '13-step best path: Weight, Local-Pref, locally-originated, AS-Path, Origin (<code>i</code>&lt;<code>e</code>&lt;<code>?</code>), MED, eBGP-over-iBGP, lowest IGP metric to next-hop, oldest eBGP, lowest RID, lowest neighbor IP',
        '<code>Weight</code> = Cisco-local (not advertised); <code>Local-Pref</code> default <code>100</code> (advertised in-AS)',
        'iBGP next-hop unchanged unless <code>next-hop-self</code>'
      ],
      config:'router bgp 65001 / bgp router-id 1.1.1.1 / neighbor 10.0.0.2 remote-as 65002 / network 192.168.1.0 mask 255.255.255.0',
      show:'show ip bgp summary (State/PfxRcd), show ip bgp (&gt; = best)' },

    { n:14, tier:'P1', obj:'3.2', dom:3, freq:65, load:58, title:'Redistribution and route-maps',
      dims:['concept','config','scope'],
      bullets:[
        'Redistribution injects routes from one routing domain into another; always seed metric or routes may be filtered',
        'Mutual redistribution (two-way) risks routing loops; use route-maps + tags to prevent re-import',
        'Route-map: ordered clauses with <code>match</code> and <code>set</code>; implicit deny at the end',
        '<code>match ip address prefix-list</code>, <code>set metric</code>, <code>set local-preference</code>, <code>set community</code>',
        'Distribute-lists filter specific prefixes; prefix-lists use ge/le for range matching',
        '<code>redistribute ospf 1 metric 100 subnets</code> into EIGRP; <code>subnets</code> keyword required for OSPF'
      ] },

    { n:15, tier:'P1', obj:'3.4', dom:3, freq:62, load:54, title:'FHRP: HSRP / VRRP / GLBP',
      dims:['concept','config','scope'],
      bullets:[
        'HSRP (Cisco only): active/standby; virtual MAC <code>0000.0c07.acXX</code> (XX = group); v2 supports IPv6',
        'VRRP (open standard, RFC 5798): master/backup; virtual MAC <code>0000.5e00.01XX</code>',
        'GLBP (Cisco): one AVG (Active Virtual Gateway) + up to 4 AVFs; true load-balancing per client',
        'HSRP priority default <code>100</code>; higher wins; preempt disabled by default',
        'Hello 3s / Hold 10s (HSRP); track objects decrement priority on upstream link failure',
        '<code>standby 1 ip 10.0.0.1 / standby 1 priority 110 / standby 1 preempt</code>'
      ] },

    { n:16, tier:'P2', obj:'3.4', dom:3, freq:48, load:40, title:'NAT/PAT + IP services: NTP / DHCP-relay / PBR',
      dims:['concept','config','scope'],
      bullets:[
        'Static NAT 1:1, dynamic pool many:many, PAT (overload) many:1 using port numbers',
        'DHCP relay: <code>ip helper-address &lt;server-IP&gt;</code> on the SVI/interface facing the client subnet',
        'NTP: <code>ntp server &lt;IP&gt;</code> syncs to upstream; stratum 1-15; <code>show ntp status</code>',
        'PBR (Policy-Based Routing): route-map applied with <code>ip policy route-map</code> on ingress interface',
        'PBR match on ACL, set next-hop or interface; overrides the routing table for matched traffic',
        'IP SLA: synthetic probes (ICMP echo, UDP jitter, HTTP) to measure path health; triggers with track objects'
      ] },

    { n:17, tier:'P1', obj:'3.5', dom:3, freq:68, load:60, title:'QoS: MQC / DSCP / policing-shaping / CBWFQ-LLQ',
      dims:['concept','config','scope'],
      bullets:[
        'MQC: class-map (match traffic) + policy-map (apply action) + service-policy (attach to interface)',
        'DSCP marking (6 bits in IP ToS): EF (46) for voice; AF41/31 for video; CS3/CS2 for signaling/data; BE (0) default',
        'Policing: drops/remarks excess immediately; no buffer, no delay; used at ingress or provider edge',
        'Shaping: buffers excess in a queue; introduces delay/jitter; used on egress WAN links',
        'CBWFQ: bandwidth guarantees per class; LLQ adds a strict-priority queue for real-time (voice)',
        '<code>priority</code> keyword = LLQ (strict priority); <code>bandwidth</code> keyword = CBWFQ (fair share)'
      ] },

    // ── D4 Network Assurance ──────────────────────────────────
    { n:18, tier:'P2', obj:'4.x', dom:4, freq:38, load:30, title:'SPAN / RSPAN / ERSPAN',
      dims:['concept','scope'],
      bullets:[
        'SPAN: mirrors traffic from source ports/VLANs to a local destination port (same switch)',
        'RSPAN: mirrors across switches via a dedicated RSPAN VLAN; destination can be remote',
        'ERSPAN: encapsulates mirrored traffic in GRE (IP), forwards to any routed destination (cross-DC)',
        'Monitor session: <code>monitor session 1 source interface Gi0/1 both / destination interface Gi0/2</code>',
        'Destination port carries only mirrored traffic; remove it from normal VLANs',
        'Use cases: IDS/IPS inline tap, packet capture, traffic analysis without breaking the path'
      ] },

    { n:19, tier:'P1', obj:'4.x', dom:4, freq:55, load:45, title:'NetFlow / Flexible NetFlow / IP SLA',
      dims:['concept','config','scope'],
      bullets:[
        'NetFlow: exports 5-tuple + byte/packet counts to a collector; v5 (fixed) vs v9 (template-based)',
        'Flexible NetFlow: custom record definitions; pick which fields to match and collect',
        '<code>flow record</code>, <code>flow exporter</code>, <code>flow monitor</code> linked together; applied per-interface',
        'IP SLA: active synthetic probes (ICMP echo, UDP jitter, TCP connect, HTTP GET)',
        '<code>ip sla 1 / icmp-echo 8.8.8.8 / frequency 10</code>; <code>ip sla schedule 1 start-time now life forever</code>',
        'Track objects link IP SLA results to routing or HSRP decisions'
      ] },

    { n:20, tier:'P2', obj:'4.x', dom:4, freq:42, load:34, title:'SNMP / Syslog / NETCONF-RESTCONF / telemetry',
      dims:['concept','scope'],
      bullets:[
        'SNMP: v2c = community string (plaintext); v3 = auth + privacy (SHA/AES); UDP 161 poll / 162 trap',
        'Syslog: 8 severity levels 0 (Emergency) to 7 (Debug); lower = more severe',
        'NETCONF (SSH 830) and RESTCONF (HTTPS 443) are model-driven management protocols using YANG',
        'Streaming telemetry: device pushes data continuously (dial-out) vs SNMP polling (pull)',
        'gRPC/gNMI common for telemetry; more scalable than SNMP for high-frequency metrics',
        '<code>snmp-server community public RO / logging host 10.0.0.5</code>'
      ] },

    // ── D5 Security ───────────────────────────────────────────
    { n:21, tier:'P1', obj:'5.x', dom:5, freq:65, load:58, title:'AAA: RADIUS / TACACS+ / 802.1X / ISE',
      dims:['concept','config','scope'],
      bullets:[
        'TACACS+: Cisco proprietary, TCP <code>49</code>, encrypts entire payload, separates AuthN/AuthZ/Acct',
        'RADIUS: open standard (RFC), UDP <code>1812</code>/<code>1813</code>, encrypts only password, merges AuthN+AuthZ',
        '802.1X: port-based NAC; supplicant (client) + authenticator (switch/AP) + auth server (ISE/RADIUS)',
        'EAP methods over 802.1X: PEAP, EAP-TLS (cert-based, strongest), EAP-FAST',
        'ISE: Cisco policy engine; profiling, posture assessment, SGT assignment, Change of Authorization (CoA)',
        '<code>aaa new-model / aaa authentication login default group tacacs+ local</code>'
      ] },

    { n:22, tier:'P1', obj:'5.x', dom:5, freq:62, load:54, title:'CoPP / uRPF / ACLs',
      dims:['concept','config','scope'],
      bullets:[
        'CoPP (Control Plane Policing): rate-limits traffic destined to the CPU; protects routing processes',
        'MQC applied to the <code>control-plane</code> interface; classes for routing protocols, SNMP, SSH, etc.',
        'uRPF (Unicast RPF): drops packets whose source IP has no matching route in FIB (anti-spoofing)',
        'Strict mode: source must be reachable via the same interface; loose mode: just must be in FIB',
        'ACLs: standard (src only, near dest), extended (5-tuple, near src); implicit deny at end',
        'Named ACLs allow insertion with sequence numbers; <code>ip access-list extended &lt;name&gt;</code>'
      ] },

    { n:23, tier:'P2', obj:'5.x', dom:5, freq:40, load:32, title:'TrustSec SGT / SGACL and MACsec 802.1AE',
      dims:['concept','scope'],
      bullets:[
        'SGT (Security Group Tag): 16-bit tag assigned by ISE at authentication; carried in CMD header or VXLAN',
        'SGACL (Security Group ACL): policy matrix in ISE maps src-SGT to dst-SGT; switch/router enforces',
        'TrustSec replaces per-IP ACLs with group-based policies; scales better in dynamic environments',
        'MACsec (802.1AE): L2 hop-by-hop encryption; Ethertype <code>0x88E5</code>; provides confidentiality + integrity',
        'MACsec operates between directly connected nodes; key exchange via MKA (802.1X-based)',
        'Compare: MACsec = L2 encryption; IPsec = L3 encryption; TrustSec = group-based policy'
      ] },

    { n:24, tier:'P2', obj:'5.x', dom:5, freq:38, load:30, title:'Zero Trust / SASE / threat defense',
      dims:['concept','scope'],
      bullets:[
        'Zero Trust: never trust, always verify; least-privilege access; continuous validation regardless of location',
        'Microsegmentation enforces Zero Trust within the data center (TrustSec SGTs, NSX)',
        'SASE (Secure Access Service Edge): converges SD-WAN + cloud-delivered security (SWG, CASB, ZTNA, FWaaS)',
        'Cisco Umbrella: DNS-layer security + SASE; blocks threats before connection established',
        'Cisco Firepower / FTD: NGFW + IPS; application visibility, URL filtering, AMP (malware)',
        'Threat defense in depth: perimeter firewall + IPS + endpoint (AMP/AV) + DNS security + SIEM'
      ] },

    // ── D6 Automation ─────────────────────────────────────────
    { n:25, tier:'P1', obj:'6.x', dom:6, freq:68, load:60, title:'Data formats JSON/XML/YAML/YANG + NETCONF vs RESTCONF',
      dims:['concept','scope'],
      bullets:[
        'NETCONF: SSH <code>830</code>, XML only, RPC; datastores running/candidate/startup; supports <code>&lt;lock&gt;</code> + commit/rollback',
        'RESTCONF: HTTPS <code>443</code>, JSON or XML, verbs GET/POST/PUT/PATCH/DELETE; no candidate/lock, edits running',
        'Both consume <code>YANG</code> models (schema, not a wire format)',
        'JSON <code>{}</code>/<code>[]</code>, XML <code>&lt;tags&gt;</code>, YAML indentation+<code>-</code> (Ansible)',
        'RESTCONF URI: <code>/restconf/data/&lt;module&gt;:&lt;container&gt;</code> + <code>Accept: application/yang-data+json</code>',
        'NETCONF for transactional (lock/candidate/rollback); RESTCONF for simple CRUD over HTTPS'
      ],
      config:'netconf-yang / restconf / ip http secure-server / aaa new-model / aaa authentication login default local',
      show:'show netconf-yang sessions' },

    { n:26, tier:'P1', obj:'6.x', dom:6, freq:65, load:58, title:'Python / EEM / Ansible / Terraform / Catalyst Center APIs',
      dims:['concept','scope'],
      bullets:[
        'Python: on-box (Guest Shell / EEM applet) or off-box scripts; <code>netmiko</code> / <code>nornir</code> for SSH; <code>requests</code> for REST',
        'EEM (Embedded Event Manager): react to syslog events, SNMP traps, CLI triggers; applets in TCL or Python',
        'Ansible: agentless, push model, YAML playbooks + Jinja2 templates; modules <code>cisco.ios.ios_config</code>',
        'Terraform: declarative (desired-state) HCL; <code>plan</code>/<code>apply</code>/<code>destroy</code>; state file tracks infra',
        'Catalyst Center (DNA Center) APIs: REST/JSON; <code>/dna/intent/api/v1/</code> prefix; token auth via <code>/auth/token</code>',
        'Northbound API (apps to controller) vs southbound API (controller to devices); IaC reduces config drift'
      ] }
  ];

  // ── Confusable pairs (A vs B) ──────────────────────────────
  var ENCOR_PAIRS = [
    { clue:'External-only cost, constant regardless of internal path', a:'E2 route', b:'E1 route', ans:'E2 route' },
    { clue:'External plus internal cost, varies with path length', a:'E2 route', b:'E1 route', ans:'E1 route' },
    { clue:'Per-VLAN STP instances, Cisco proprietary', a:'Rapid PVST+', b:'MST', ans:'Rapid PVST+' },
    { clue:'Maps multiple VLANs to fewer STP instances', a:'Rapid PVST+', b:'MST', ans:'MST' },
    { clue:'Group-based policy, replaces per-IP ACLs', a:'TrustSec SGT', b:'Traditional ACL', ans:'TrustSec SGT' },
    { clue:'Matches source/destination IP and port, stateless', a:'TrustSec SGT', b:'Traditional ACL', ans:'Traditional ACL' },
    { clue:'XML only, SSH port 830, supports candidate datastore', a:'NETCONF', b:'RESTCONF', ans:'NETCONF' },
    { clue:'JSON or XML, HTTPS port 443, edits running datastore only', a:'NETCONF', b:'RESTCONF', ans:'RESTCONF' },
    { clue:'Drops excess traffic immediately, adds no delay', a:'Policing', b:'Shaping', ans:'Policing' },
    { clue:'Buffers excess traffic, introduces delay on egress WAN', a:'Policing', b:'Shaping', ans:'Shaping' },
    { clue:'Cisco FHRP, virtual MAC 0000.0c07.acXX', a:'HSRP', b:'VRRP', ans:'HSRP' },
    { clue:'Open-standard FHRP, virtual MAC 0000.5e00.01XX', a:'HSRP', b:'VRRP', ans:'VRRP' },
    { clue:'Cisco FHRP that load-balances active gateways', a:'GLBP', b:'HSRP', ans:'GLBP' },
    { clue:'Best route currently in the topology table, installed in routing table', a:'Successor', b:'Feasible Successor', ans:'Successor' },
    { clue:'Loop-free backup route whose RD is less than current FD', a:'Successor', b:'Feasible Successor', ans:'Feasible Successor' },
    { clue:'Agentless push model, YAML playbooks', a:'Ansible', b:'Terraform', ans:'Ansible' },
    { clue:'Declarative desired-state, HCL, state file', a:'Ansible', b:'Terraform', ans:'Terraform' },
    { clue:'24-bit VNI, UDP 4789, MAC-in-UDP encapsulation', a:'VXLAN', b:'GRE', ans:'VXLAN' },
    { clue:'IP protocol 47, no encryption, carries multicast', a:'VXLAN', b:'GRE', ans:'GRE' },
    { clue:'Cisco-local attribute, not advertised to peers', a:'Weight', b:'Local-Pref', ans:'Weight' },
    { clue:'AS-wide attribute, default 100, advertised to all iBGP peers', a:'Weight', b:'Local-Pref', ans:'Local-Pref' },
    { clue:'L2 hop-by-hop encryption, Ethertype 0x88E5', a:'MACsec', b:'IPsec', ans:'MACsec' },
    { clue:'Maps endpoint identity (EID) to location (RLOC)', a:'LISP', b:'VXLAN', ans:'LISP' },
    { clue:'Data-plane encapsulation over L3 for L2 extension', a:'LISP', b:'VXLAN', ans:'VXLAN' }
  ];

  // ── Per-pillar normalized factors (each 0..1) ─────────────
  function _D(p) { return (DOMAIN_WEIGHT[p.dom] || 0) / 30; }
  function _T(p) { return TIER_FACTOR[p.tier] || 0; }
  function _F(p) { return (p.freq || 0) / 100; }
  function _L(p) { return (p.load || 0) / 100; }

  // ExamValue 0..10.
  function pillarValue(p) {
    var w = VALUE_WEIGHTS;
    var v = 10 * (w.D * _D(p) + w.T * _T(p) + w.F * _F(p) + w.L * _L(p));
    return Math.round(v * 100) / 100;
  }

  function _dimsOf(p) { return (p.dims && p.dims.length) ? p.dims : ['concept', 'scope']; }

  function _backedDimsOf(p) {
    var pc = (typeof window !== 'undefined') ? window.ENCOR_PILLAR_CHECKS : null;
    if (!pc) { return null; }
    var authored = pc[p.n];
    if (!authored) { return []; }
    var declared = _dimsOf(p);
    var out = [];
    for (var i = 0; i < declared.length; i++) {
      if (Object.prototype.hasOwnProperty.call(authored, declared[i])) { out.push(declared[i]); }
    }
    return out;
  }

  function _applicableDims(p) {
    var backed = _backedDimsOf(p);
    if (backed === null) { return _dimsOf(p); }
    return backed;
  }

  function pillarGap(p, checks) {
    var dims = _applicableDims(p);
    var c = (checks && checks[p.n]) || {};
    var passed = 0;
    for (var i = 0; i < dims.length; i++) { if (c[dims[i]] === true) passed++; }
    return dims.length ? (1 - passed / dims.length) : 1;
  }

  function _isZeroCheck(p) {
    var backed = _backedDimsOf(p);
    return backed !== null && backed.length === 0;
  }

  function pillarROI(p, checks) {
    if (_isZeroCheck(p)) { return 0; }
    return Math.round(pillarValue(p) * pillarGap(p, checks) * 100) / 100;
  }

  function pillarMastered(p, checks) {
    return pillarGap(p, checks) === 0;
  }

  function readiness(checks) {
    var sumV = 0, sumVR = 0;
    var domV = {}, domVR = {};
    for (var i = 0; i < ENCOR_PILLARS_DATA.length; i++) {
      var p = ENCOR_PILLARS_DATA[i];
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

  var _TIER_RANK = { P1: 0, P2: 1, P3: 2, P4: 3 };
  function studyNext(checks) {
    return ENCOR_PILLARS_DATA.filter(function (p) { return !_isZeroCheck(p); }).sort(function (a, b) {
      var ra = pillarROI(a, checks), rb = pillarROI(b, checks);
      if (rb !== ra) return rb - ra;
      var ta = _TIER_RANK[a.tier], tb = _TIER_RANK[b.tier];
      if (ta !== tb) return ta - tb;
      return a.n - b.n;
    });
  }

  // ── Expose on window ──────────────────────────────────────
  window.ENCOR_PILLARS_DATA   = ENCOR_PILLARS_DATA;
  window.ENCOR_PAIRS          = ENCOR_PAIRS;
  window.ENCOR_VALUE_WEIGHTS  = VALUE_WEIGHTS;
  window.ENCOR_TIER_FACTOR    = TIER_FACTOR;
  window.ENCOR_DOMAIN_WEIGHT  = DOMAIN_WEIGHT;
  window.encorPillarValue     = pillarValue;
  window.encorPillarGap       = pillarGap;
  window.encorPillarROI       = pillarROI;
  window.encorPillarMastered  = pillarMastered;
  window.encorReadiness       = readiness;
  window.encorStudyNext       = studyNext;
  window.encorIsZeroCheck     = _isZeroCheck;
  window.encorActivePillars   = function () { return ENCOR_PILLARS_DATA.filter(function (p) { return !_isZeroCheck(p); }); };
})();
