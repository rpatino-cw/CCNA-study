/* ══════════════════════════════════════════════════════════════════════
   encor-drill-data.js  Content pool for ENCOR Daily Drill.
   CCNP ENCOR 350-401 v1.2. 7-day rotation, date-seeded.
   Exposes: window.ENCOR_DRILL
   ══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // ── 7 rotation themes (index 0-6 = day%7 0-6) ───────────────────
  var THEMES = [
    { id: 1, label: 'OSPF Deep',              badge: 'D3.2', wildcardRound: false },
    { id: 2, label: 'EIGRP + Redistribution', badge: 'D3.2', wildcardRound: true  },
    { id: 3, label: 'Security',               badge: 'D5',   wildcardRound: false },
    { id: 4, label: 'Architecture + Virt',    badge: 'D1-2', wildcardRound: false },
    { id: 5, label: 'BGP + Switching',        badge: 'D3',   wildcardRound: true  },
    { id: 6, label: 'Automation + Assurance', badge: 'D4-6', wildcardRound: false },
    { id: 7, label: 'IPv6 + QoS + Summary',   badge: 'D3-6', wildcardRound: true  }
  ];

  // ── Numbers tables (verbatim from encor-numbers.html) ────────────
  var NUMBERS = {

    AD: [
      { label: 'Connected',      value: '0',   note: 'Directly attached interface' },
      { label: 'Static',         value: '1',   note: 'Manually configured route' },
      { label: 'eBGP',           value: '20',  note: 'External BGP (cross-AS)' },
      { label: 'EIGRP internal', value: '90',  note: 'Routes within same EIGRP AS' },
      { label: 'OSPF',           value: '110', note: 'All OSPF route types' },
      { label: 'IS-IS',          value: '115', note: 'Intermediate System to IS' },
      { label: 'RIP',            value: '120', note: 'Routing Information Protocol' },
      { label: 'EIGRP external', value: '170', note: 'Redistributed into EIGRP' },
      { label: 'iBGP',           value: '200', note: 'Internal BGP (same AS)' },
      { label: 'Unreachable',    value: '255', note: 'Route not used' }
    ],

    LSA: [
      { label: 'Type 1 - Router LSA',         value: '1', note: 'Every router; intra-area only' },
      { label: 'Type 2 - Network LSA',         value: '2', note: 'DR on broadcast/NBMA; intra-area' },
      { label: 'Type 3 - Summary (inter-area)',value: '3', note: 'ABR; inter-area' },
      { label: 'Type 4 - ASBR Summary',        value: '4', note: 'ABR; tells non-backbone where ASBR is' },
      { label: 'Type 5 - AS External',         value: '5', note: 'ASBR; whole OSPF domain (except stubs)' },
      { label: 'Type 7 - NSSA External',       value: '7', note: 'ASBR inside NSSA; ABR converts to Type 5' }
    ],

    OSPF_FACTS: [
      { label: 'Hello interval (broadcast/p2p)', value: '10 s',     note: 'Default on broadcast and p2p links' },
      { label: 'Hello interval (NBMA)',           value: '30 s',     note: 'Non-broadcast multi-access' },
      { label: 'Dead interval (broadcast/p2p)',   value: '40 s',     note: '4 x Hello = 4 x 10 s' },
      { label: 'Dead interval (NBMA)',            value: '120 s',    note: '4 x Hello = 4 x 30 s' },
      { label: 'Reference bandwidth default',     value: '100 Mbps', note: 'Change with auto-cost ref-bandwidth on GigE+' },
      { label: 'AD (OSPF)',                       value: '110',      note: 'All OSPF route types' },
      { label: 'IP Protocol number',              value: '89',       note: 'OSPF runs directly over IP' },
      { label: 'Multicast: All OSPF routers',     value: '224.0.0.5',note: 'All routers running OSPF' },
      { label: 'Multicast: DR/BDR only',          value: '224.0.0.6',note: 'DROthers send updates here' }
    ],

    BGP_BESTPATH: [
      { step: '1',  attr: 'Highest Weight',              note: 'Cisco-local only, default 0, not advertised' },
      { step: '2',  attr: 'Highest Local-Pref',          note: 'AS-wide via iBGP, default 100' },
      { step: '3',  attr: 'Locally originated',          note: 'network/aggregate/redistribute beats learned' },
      { step: '4',  attr: 'Shortest AS-Path',            note: 'Fewer hops = preferred; most manipulated' },
      { step: '5',  attr: 'Lowest Origin code',          note: 'IGP (i) < EGP (e) < Incomplete (?)' },
      { step: '6',  attr: 'Lowest MED',                  note: 'Multi-Exit Discriminator; compared same-AS peers' },
      { step: '7',  attr: 'eBGP over iBGP',              note: 'External preferred over internal' },
      { step: '8',  attr: 'Lowest IGP metric to next-hop',note: 'Closest next-hop in IGP table' },
      { step: '9',  attr: 'Oldest eBGP route',           note: 'Stability preference' },
      { step: '10', attr: 'Lowest Router-ID',            note: 'BGP RID of advertising peer' },
      { step: '11', attr: 'Lowest cluster-list length',  note: 'Route reflector environments' },
      { step: '12', attr: 'Lowest neighbor IP',          note: 'Tiebreaker: numerically lowest peer IP' }
    ],

    EIGRP: [
      { label: 'K1 (Bandwidth)',        value: '1',   note: 'Enabled by default; contributes to metric' },
      { label: 'K2 (Load)',             value: '0',   note: 'Disabled by default' },
      { label: 'K3 (Delay)',            value: '1',   note: 'Enabled by default; cumulative delay' },
      { label: 'K4 (Reliability)',      value: '0',   note: 'Disabled by default' },
      { label: 'K5',                    value: '0',   note: 'Disabled by default' },
      { label: 'Feasible Successor (FS)',value: 'RD < FD', note: 'Feasibility Condition: neighbor RD must be less than this router FD' },
      { label: 'AD (internal)',         value: '90',  note: 'Routes within same EIGRP AS' },
      { label: 'AD (external)',         value: '170', note: 'Redistributed routes into EIGRP' },
      { label: 'IP Protocol number',   value: '88',  note: 'Runs directly over IP' },
      { label: 'Multicast address',    value: '224.0.0.10', note: 'All EIGRP routers' }
    ],

    DSCP: [
      { label: 'EF (Expedited Forwarding)', value: '46', note: 'Voice bearer (RTP); LLQ strict priority' },
      { label: 'CS6',                       value: '48', note: 'Network control (routing protocols, mgmt)' },
      { label: 'AF41',                      value: '34', note: 'Interactive video (videoconferencing)' },
      { label: 'AF31',                      value: '26', note: 'Signaling (call control)' },
      { label: 'CS3',                       value: '24', note: 'Layer 3 Class of Service 3' },
      { label: 'AF11',                      value: '10', note: 'Bulk data (backup, FTP)' },
      { label: 'CS1',                       value: '8',  note: 'Scavenger / low-priority' },
      { label: 'Default / BE',              value: '0',  note: 'Best-effort; no QoS treatment' }
    ],

    PORTS: [
      { label: 'VXLAN',            value: 'UDP 4789',        note: '24-bit VNI; MAC-in-UDP encapsulation' },
      { label: 'LISP (control)',   value: 'UDP 4342',        note: 'Map-Request / Map-Reply signaling' },
      { label: 'LISP (data)',      value: 'UDP 4341',        note: 'Encapsulated data-plane traffic' },
      { label: 'GRE',              value: 'IP protocol 47',  note: 'No encryption; carries multicast' },
      { label: 'BGP',              value: 'TCP 179',         note: 'Reliable session; manual neighbor config' },
      { label: 'NETCONF',          value: 'SSH 830',         note: 'XML-based config, RFC 6241' },
      { label: 'RESTCONF',         value: 'HTTPS 443',       note: 'REST/YANG over HTTP/S' },
      { label: 'RADIUS auth',      value: 'UDP 1812',        note: 'Authentication + authorization' },
      { label: 'RADIUS acct',      value: 'UDP 1813',        note: 'Accounting' },
      { label: 'TACACS+',          value: 'TCP 49',          note: 'Cisco; encrypts entire payload' },
      { label: 'MACsec',           value: 'EtherType 0x88E5',note: 'IEEE 802.1AE; L2 hop-by-hop encryption' }
    ],

    STP_MST: [
      { label: 'Bridge priority default', value: '32768', note: 'Lower = more likely to become root' },
      { label: 'Priority increment',      value: '4096',  note: 'Must be a multiple of 4096 (0 to 61440)' },
      { label: 'RSTP port roles',         value: 'Root / Designated / Alternate / Backup', note: 'Alternate = replacement root port' },
      { label: 'RSTP port states',        value: 'Discarding / Learning / Forwarding',     note: 'Discarding = Blocking + Listening combined' },
      { label: 'MST default revision',    value: '0',        note: 'Must match all switches in the region' },
      { label: 'MST default instance',    value: 'Instance 0 (IST)', note: 'All VLANs map here until remapped' }
    ],

    FHRP: [
      { label: 'HSRP virtual MAC',            value: '0000.0c07.acXX',   note: 'XX = group number; Cisco proprietary' },
      { label: 'HSRP priority default',       value: '100',              note: 'Higher wins; preempt disabled by default' },
      { label: 'HSRP hello / hold',           value: '3 s / 10 s',      note: 'Default timers' },
      { label: 'HSRP multicast (v1)',         value: '224.0.0.2',        note: 'v1 only' },
      { label: 'HSRP multicast (v2)',         value: '224.0.0.102',      note: 'v2; also supports IPv6' },
      { label: 'VRRP virtual MAC',            value: '0000.5e00.01XX',   note: 'Open standard RFC 5798; master/backup' },
      { label: 'VRRP multicast',             value: '224.0.0.18',       note: 'All VRRP routers' },
      { label: 'GLBP load-balance',          value: 'Round-robin / weighted / host-dependent', note: 'Up to 4 AVFs per group; true load-balance' },
      { label: 'GLBP multicast',             value: '224.0.0.102',      note: 'Same as HSRPv2' }
    ]
  };

  // ── Concept Q/A/How pool, tagged by theme day ─────────────────────
  // theme: 1=OSPF, 2=EIGRP+Redis, 3=Security, 4=Arch+Virt, 5=BGP+Switch, 6=Auto+Assurance, 7=IPv6+QoS+Summary
  var CONCEPTS = [

    // ── Theme 1: OSPF deep ─────────────────────────────────────────
    { theme: 1,
      q: 'What is the difference between an E1 and E2 external OSPF route?',
      a: 'E2 (default) = external cost only, constant regardless of internal path. E1 = external + internal cost, varies with path. E1 preferred when both exist.',
      how: 'E2 stays flat at the ASBR metric. E1 grows as you move away from the ASBR. Prefer E1 for path-sensitive traffic.' },

    { theme: 1,
      q: 'What LSA types does a Totally-Stubby area block?',
      a: 'Blocks Type 3, 4, and 5 LSAs. Only Type 1 and 2 (intra-area) plus a single Type 3 default route (0.0.0.0/0) from the ABR are allowed.',
      how: 'Totally-Stub = most restricted. ABR injects one default. No externals, no inter-area summaries.' },

    { theme: 1,
      q: 'How does DR/BDR election work on a broadcast segment?',
      a: 'Highest OSPF priority wins DR (default 1); second highest wins BDR. Tie-break: highest RID. Priority 0 = never elected. Non-preemptive once elected.',
      how: 'show ip ospf interface to see priority and DR/BDR. DROthers send to 224.0.0.6; DR/BDR listen there.' },

    { theme: 1,
      q: 'What does a stub area block and what does it inject instead?',
      a: 'Stub blocks Type 5 (AS External) LSAs. ABR injects a Type 3 default route (0.0.0.0) so stubs can still reach external destinations.',
      how: 'area X stub on all routers in the area including the ABR. Verify with show ip ospf database.' },

    { theme: 1,
      q: 'What is a virtual-link used for in OSPF?',
      a: 'Connects a discontiguous area to area 0 through a transit area. Configured between ABRs with area X virtual-link <router-id>.',
      how: 'All OSPF areas must touch area 0. Virtual-link is the fix when physical adjacency to area 0 is not possible.' },

    // ── Theme 2: EIGRP + Redistribution ───────────────────────────
    { theme: 2,
      q: 'What is the Feasibility Condition for an EIGRP Feasible Successor?',
      a: "A neighbor's Reported Distance (RD) must be less than this router's current Feasible Distance (FD). RD < FD guarantees a loop-free backup path.",
      how: 'show ip eigrp topology all-links. FD is in the topology table. If RD >= FD, the path is not a feasible successor.' },

    { theme: 2,
      q: 'How do you prevent routing loops in mutual OSPF-to-EIGRP redistribution?',
      a: 'Use route-map tags. Set a tag when redistributing from OSPF into EIGRP. Deny that tag when redistributing from EIGRP back into OSPF.',
      how: 'Without tags, routes loop: OSPF routes re-enter OSPF via EIGRP at a lower AD. Tags mark origin so the deny clause catches them.' },

    { theme: 2,
      q: 'What EIGRP K-values are active by default and what do they measure?',
      a: 'K1 (bandwidth) = 1 and K3 (delay) = 1. K2, K4, K5 = 0. Metric formula: 256 x (10^7 / min-BW + sum-delay).',
      how: 'show ip protocols shows K-values. All peers in the same AS must have matching K-values or neighborship fails.' },

    { theme: 2,
      q: 'What keyword is required when redistributing OSPF routes into EIGRP?',
      a: 'No special keyword needed for OSPF-to-EIGRP. However redistributing OSPF into another OSPF process requires the subnets keyword. For EIGRP into OSPF: redistribute eigrp 100 subnets.',
      how: 'Without subnets, only classful networks are redistributed into OSPF. show ip route verifies the O E2 or D EX entries.' },

    { theme: 2,
      q: 'What is EIGRP variance and when does it load-balance?',
      a: 'variance N allows load-balancing across paths whose metric is within N times the successor metric. Feasibility Condition must still be met.',
      how: 'variance 2 = any feasible successor with metric <= 2x the best metric can be used. show ip route shows multiple D entries.' },

    // ── Theme 3: Security ──────────────────────────────────────────
    { theme: 3,
      q: 'What are the key differences between RADIUS and TACACS+?',
      a: 'TACACS+: Cisco-only, TCP 49, encrypts entire payload, separates AuthN/AuthZ/Accounting. RADIUS: open standard, UDP 1812/1813, encrypts password only, merges AuthN+AuthZ.',
      how: 'TACACS+ is better for device admin (granular command authz). RADIUS is standard for network access (802.1X, VPN).' },

    { theme: 3,
      q: 'What are the three roles in 802.1X port-based authentication?',
      a: 'Supplicant (client device), Authenticator (switch/AP doing enforcement), Authentication Server (ISE/RADIUS). EAP frames run between supplicant and authenticator; RADIUS between authenticator and server.',
      how: 'show dot1x all on the switch. authentication port-control auto enables 802.1X on the port.' },

    { theme: 3,
      q: 'What does CoPP protect and how is it applied?',
      a: 'CoPP (Control Plane Policing) rate-limits traffic destined to the router CPU, protecting routing processes from floods. Applied with service-policy input under the control-plane pseudo-interface.',
      how: 'show policy-map control-plane shows drops and conforming rates per class. Classify routing protocol traffic, SNMP, SSH separately.' },

    { theme: 3,
      q: 'What is the difference between strict and loose uRPF?',
      a: 'Strict: source IP must be reachable via the same interface the packet arrived on (ip verify unicast source reachable-via rx). Loose: source must simply exist in the FIB (reachable-via any).',
      how: 'Strict is best for single-homed edges. Loose used when asymmetric routing exists. show ip interface shows uRPF state.' },

    { theme: 3,
      q: 'How does TrustSec SGT differ from a traditional ACL?',
      a: 'SGT is a 16-bit tag assigned at authentication by ISE; policy is group-to-group (SGACL matrix), not per-IP. Traditional ACL matches 5-tuple per interface. TrustSec scales better in dynamic environments.',
      how: 'TrustSec eliminates ACL sprawl. SGT carried in CMD header or VXLAN. Policy enforced at ingress of every fabric node.' },

    // ── Theme 4: Architecture + Virtualization ─────────────────────
    { theme: 4,
      q: 'Name the four SD-WAN components and their roles.',
      a: 'vManage: GUI/API orchestration (NMS). vSmart: control plane, distributes routes via OMP. vBond: orchestrator, mutual TLS auth and NAT traversal. vEdge/cEdge: data-plane routers forming IPsec/DTLS tunnels.',
      how: 'OMP carries routes, policies, and crypto keys. ZTP uses vBond. App-aware routing picks best transport per SLA thresholds.' },

    { theme: 4,
      q: 'What are the three planes of SD-Access and which protocol handles each?',
      a: 'Control plane: LISP (maps EID endpoints to RLOC fabric nodes). Data plane: VXLAN (24-bit VNI, UDP 4789, MAC-in-UDP). Policy plane: CTS/TrustSec (SGT-based group policies).',
      how: 'Catalyst Center acts as LISP map-server/resolver. Fabric roles: control-plane node, border node, edge node.' },

    { theme: 4,
      q: 'What does VRF-lite do and how does inter-VRF routing work?',
      a: 'VRF-lite creates separate routing tables per tenant on one router without MPLS. Inter-VRF routing requires either route leaking (import/export route-targets) or a physical link between VRFs.',
      how: 'ip vrf forwarding <name> on interface clears the IP. show vrf lists all VRFs. Leaking uses route-target both statements.' },

    { theme: 4,
      q: 'What is VXLAN and why does it exist?',
      a: 'VXLAN stretches L2 over L3. 24-bit VNI supports ~16 million segments vs 4096 VLANs. Encapsulates MAC-in-UDP, outer dest port 4789. VTEP terminates the tunnel on a physical switch or hypervisor NIC.',
      how: 'EVPN BGP distributes MAC/IP via route types 2/3/5. Used in SD-Access data plane and DC fabrics.' },

    { theme: 4,
      q: 'What is LISP and what problem does it solve?',
      a: 'LISP separates endpoint identity (EID) from location (RLOC). EID stays with the host; RLOC is the fabric edge address. Map-Server registers EID-to-RLOC. Endpoints can roam without routing changes.',
      how: 'xTR = ITR + ETR. Map-Resolver answers queries. In SD-Access, Catalyst Center is the map-server.' },

    // ── Theme 5: BGP + Switching ───────────────────────────────────
    { theme: 5,
      q: 'What is the scope difference between BGP Weight and Local-Pref?',
      a: 'Weight is Cisco-local to the router; not advertised to any peer, default 0, higher is better. Local-Pref is AS-wide via iBGP, default 100, higher is better. Weight is step 1 in best-path selection.',
      how: 'Weight set in neighbor route-map or neighbor weight command. Local-Pref set in inbound route-map with set local-preference.' },

    { theme: 5,
      q: 'What is MED and who compares it?',
      a: 'MED (Multi-Exit Discriminator) is a hint to adjacent AS about preferred entry point. Lower MED is preferred. By default compared only between routes from the same neighboring AS.',
      how: 'bgp always-compare-med compares MED across different ASes. Set with set metric in an outbound route-map to neighbor.' },

    { theme: 5,
      q: 'What LACP modes form an EtherChannel and which combinations work?',
      a: 'LACP modes: active (sends LACP), passive (waits). active-active or active-passive forms a bundle. passive-passive does not. PAgP: desirable-desirable or desirable-auto.',
      how: 'channel-group 1 mode active on both sides. show etherchannel summary shows Po1 state. All links must match speed, duplex, VLAN, STP.' },

    { theme: 5,
      q: 'How does RSTP achieve faster convergence than classic STP?',
      a: 'RSTP uses a proposal/agreement handshake between directly connected switches instead of fixed timers (30-50s). Port roles: Root, Designated, Alternate (backup root), Backup (backup designated).',
      how: 'Alternate port goes to Forwarding in milliseconds via handshake. States: Discarding/Learning/Forwarding (collapsed from 5).' },

    { theme: 5,
      q: 'What is GLBP and how does it differ from HSRP?',
      a: 'GLBP is Cisco FHRP that provides true load-balancing. One AVG (Active Virtual Gateway) assigns each client a different AVF (Active Virtual Forwarder) MAC. Up to 4 AVFs per group. HSRP uses one active gateway.',
      how: 'glbp 10 ip on the interface. glbp 10 load-balancing round-robin. show glbp brief shows AVG/AVF roles.' },

    // ── Theme 6: Automation + Assurance ───────────────────────────
    { theme: 6,
      q: 'What are the key differences between NETCONF and RESTCONF?',
      a: 'NETCONF: SSH port 830, XML only, supports candidate datastore and lock/rollback. RESTCONF: HTTPS port 443, JSON or XML, edits running datastore only, uses HTTP verbs GET/POST/PUT/PATCH/DELETE.',
      how: 'Both consume YANG models. NETCONF for transactional config with rollback. RESTCONF for simpler CRUD over HTTPS.' },

    { theme: 6,
      q: 'What is the difference between Ansible and Terraform in network automation?',
      a: 'Ansible: agentless, push model, YAML playbooks, imperative (task by task). Terraform: declarative HCL, desired-state, plan/apply/destroy, state file tracks infra.',
      how: 'Ansible is better for config push and ad-hoc tasks. Terraform for provisioning and lifecycle management of infrastructure.' },

    { theme: 6,
      q: 'What is streaming telemetry and how does it differ from SNMP?',
      a: 'Streaming telemetry pushes data continuously from the device (dial-out) or on-demand (dial-in) using gRPC/gNMI. SNMP is a pull model: NMS polls every N seconds. Telemetry is higher frequency and more scalable.',
      how: 'MDT (Model-Driven Telemetry) uses YANG paths. gNMI subscribe() sets up streams. show telemetry internal on IOS-XE.' },

    { theme: 6,
      q: 'What is SNMPv3 and what does it add over v2c?',
      a: 'SNMPv3 adds authentication (SHA/MD5) and privacy (AES/DES) per-user. v2c uses a community string (plaintext). UDP 161 for polls, UDP 162 for traps. snmp-server user defines credentials.',
      how: 'Three security levels: noAuthNoPriv, authNoPriv, authPriv. Use authPriv for exam scenarios requiring encryption.' },

    { theme: 6,
      q: 'What does IP SLA measure and how is it used for path failover?',
      a: 'IP SLA generates synthetic probes (ICMP echo, UDP jitter, TCP connect, HTTP GET) to measure latency, jitter, and loss. Track objects link SLA results to static routes or HSRP priority decrements.',
      how: 'ip sla 1 / icmp-echo 8.8.8.8 / frequency 10; ip sla schedule 1 start-time now life forever. track 1 ip sla 1 reachability.' },

    // ── Theme 7: IPv6 + QoS + Summarization ───────────────────────
    { theme: 7,
      q: 'What does the M-flag mean in an IPv6 Router Advertisement?',
      a: 'M-flag (Managed) = 1 means use stateful DHCPv6 for address assignment. O-flag (Other) = 1 means use stateless DHCPv6 for other options (DNS, etc.) while SLAAC provides the address.',
      how: 'RA flags control client behavior. M=1 O=1 = full stateful DHCPv6. M=0 O=0 = pure SLAAC with no DHCPv6 options.' },

    { theme: 7,
      q: 'How is an EUI-64 interface ID generated?',
      a: 'Split the 48-bit MAC at the midpoint, insert FFFE in the middle (making 64 bits), then flip bit 7 (the U/L bit) of the first byte from 0 to 1.',
      how: 'MAC 00:1A:2B:3C:4D:5E -> 001A:2BFF:FE3C:4D5E -> flip bit7 of 00 (0000 0000) -> 0000 0010 = 02 -> 021A:2BFF:FE3C:4D5E.' },

    { theme: 7,
      q: 'How does OSPFv3 differ from OSPFv2 for IPv6?',
      a: 'OSPFv3 uses link-local addresses for adjacency (not global unicast). Adds LSA Type 8 (Link LSA) and Type 9 (Intra-Area-Prefix LSA). Auth is via IPsec (AH/ESP) applied to the interface, not in the OSPF packet.',
      how: 'ipv6 ospf 1 area 0 on each interface. show ipv6 ospf neighbor shows LLA of peers.' },

    { theme: 7,
      q: 'What is the difference between policing and shaping in QoS?',
      a: 'Policing drops or re-marks excess traffic immediately with no buffer; adds no delay; used at ingress or provider edge. Shaping buffers excess in a queue and sends it later; introduces delay; used on egress WAN links.',
      how: 'LLQ uses priority keyword = strict policing for voice. Shaping uses shape average command. show policy-map interface confirms rates.' },

    { theme: 7,
      q: 'How do you find the summary address for 10.1.0.0/24 through 10.1.3.0/24?',
      a: 'The four networks share the first 22 bits (10.1.00xx.xxxxxxxx). The summary is 10.1.0.0/22. Wildcard mask = 255 - mask per octet = 0.0.3.255.',
      how: 'Line up the third octets in binary: 0, 1, 2, 3 = 0000 0000 through 0000 0011. Common prefix = 22 bits. Step 2: verify no overlap with other blocks.' }
  ];

  // ── Config recall sequences (per theme) ─────────────────────────
  var CONFIGS = [

    // Theme 1: OSPF
    { theme: 1,
      task: 'Configure OSPF process 1, set router-ID 1.1.1.1, add 10.0.0.x to area 0, make area 1 totally-stubby, summarize area 1 as 10.1.0.0/16.',
      canonical: [
        'router ospf 1',
        ' router-id 1.1.1.1',
        ' network 10.0.0.0 0.0.0.255 area 0',
        ' area 1 stub no-summary',
        ' area 1 range 10.1.0.0 255.255.0.0'
      ],
      shows: [
        'show ip ospf neighbor',
        'show ip ospf database',
        'show ip route ospf'
      ] },

    // Theme 1: OSPF NSSA
    { theme: 1,
      task: 'Make area 2 an NSSA (allows external redistribution but no Type 5 LSAs).',
      canonical: [
        'router ospf 1',
        ' area 2 nssa'
      ],
      shows: ['show ip ospf database', 'show ip ospf'] },

    // Theme 2: EIGRP named
    { theme: 2,
      task: 'Configure EIGRP named mode (CORP, AS 100), add 10.0.0.x, set router-ID 1.1.1.1, enable variance 2.',
      canonical: [
        'router eigrp CORP',
        ' address-family ipv4 unicast autonomous-system 100',
        '  network 10.0.0.0 0.0.0.255',
        '  eigrp router-id 1.1.1.1',
        '  topology base',
        '   variance 2'
      ],
      shows: [
        'show ip eigrp neighbors',
        'show ip eigrp topology all-links'
      ] },

    // Theme 2: Redistribution with tags
    { theme: 2,
      task: 'Mutual redistribution OSPF<->EIGRP with tags to prevent loops. Tag OSPF routes with 111 when entering EIGRP; deny tag 111 when redistributing EIGRP back into OSPF.',
      canonical: [
        'route-map FROM-OSPF permit 10',
        ' set tag 111',
        '!',
        'route-map FROM-EIGRP deny 10',
        ' match tag 111',
        '!',
        'route-map FROM-EIGRP permit 20',
        '!',
        'router ospf 1',
        ' redistribute eigrp 100 subnets route-map FROM-EIGRP',
        '!',
        'router eigrp CORP',
        ' address-family ipv4 unicast autonomous-system 100',
        '  topology base',
        '   redistribute ospf 1 route-map FROM-OSPF'
      ],
      shows: ['show ip route', 'show route-map'] },

    // Theme 3: Security AAA + 802.1X
    { theme: 3,
      task: 'Configure AAA with a RADIUS server at 10.1.1.10, enable 802.1X globally, and set interface g1/0/1 to auto (port-based NAC).',
      canonical: [
        'aaa new-model',
        'radius server R',
        ' address ipv4 10.1.1.10',
        ' key KEY',
        '!',
        'aaa authentication dot1x default group radius',
        'dot1x system-auth-control',
        '!',
        'interface g1/0/1',
        ' authentication port-control auto',
        ' dot1x pae authenticator'
      ],
      shows: ['show dot1x all', 'show aaa servers'] },

    // Theme 3: CoPP
    { theme: 3,
      task: 'Configure CoPP: police routing protocol traffic at 1 Mbps, apply to the control-plane.',
      canonical: [
        'class-map match-any CM-ROUTING',
        ' match protocol ospf',
        ' match protocol eigrp',
        ' match protocol bgp',
        '!',
        'policy-map PM-COPP',
        ' class CM-ROUTING',
        '  police 1000000 conform-action transmit exceed-action drop',
        '!',
        'control-plane',
        ' service-policy input PM-COPP'
      ],
      shows: ['show policy-map control-plane'] },

    // Theme 3: uRPF
    { theme: 3,
      task: 'Enable strict uRPF on interface g0/0 to drop packets with spoofed source addresses.',
      canonical: [
        'interface g0/0',
        ' ip verify unicast source reachable-via rx'
      ],
      shows: ['show ip interface g0/0'] },

    // Theme 4: VRF + GRE + VXLAN
    { theme: 4,
      task: 'Define VRF CUST-A with RD 65001:1 and RT import/export. Add a GRE tunnel to 203.0.113.5. Add an NVE VXLAN interface for VNI 5012.',
      canonical: [
        'vrf definition CUST-A',
        ' rd 65001:1',
        ' address-family ipv4',
        '  route-target both 65001:1',
        '!',
        'interface tunnel0',
        ' tunnel source g0/0',
        ' tunnel destination 203.0.113.5',
        ' tunnel mode gre ip',
        '!',
        'interface nve1',
        ' source-interface Lo0',
        ' member vni 5012 mcast-group 239.1.1.1'
      ],
      shows: ['show vrf', 'show interface tunnel0', 'show nve peers'] },

    // Theme 5: eBGP
    { theme: 5,
      task: 'Configure eBGP AS 65001, peer with 203.0.113.2 in AS 65002, apply route-map RM-IN inbound, advertise 192.168.1.0/24.',
      canonical: [
        'router bgp 65001',
        ' bgp router-id 1.1.1.1',
        ' neighbor 203.0.113.2 remote-as 65002',
        ' neighbor 203.0.113.2 route-map RM-IN in',
        ' network 192.168.1.0 mask 255.255.255.0'
      ],
      shows: [
        'show ip bgp summary',
        'show ip bgp',
        'show ip bgp neighbors 203.0.113.2 advertised-routes'
      ] },

    // Theme 5: MST + EtherChannel
    { theme: 5,
      task: 'Enable MST, name region REGION1 revision 2, map VLANs 10-20 to instance 1, bundle g0/1-2 as LACP active.',
      canonical: [
        'spanning-tree mode mst',
        'spanning-tree mst configuration',
        ' name REGION1',
        ' revision 2',
        ' instance 1 vlan 10-20',
        '!',
        'interface range g0/1-2',
        ' channel-group 1 mode active'
      ],
      shows: ['show spanning-tree mst', 'show etherchannel summary'] },

    // Theme 5: FHRP HSRP v2
    { theme: 5,
      task: 'Configure HSRPv2 group 10 on g0/0: VIP 192.168.1.1, priority 110, preempt, track g0/1 decrement 20.',
      canonical: [
        'interface g0/0',
        ' standby version 2',
        ' standby 10 ip 192.168.1.1',
        ' standby 10 priority 110',
        ' standby 10 preempt',
        ' standby 10 track g0/1 20'
      ],
      shows: ['show standby brief'] },

    // Theme 6: Automation - NETCONF/RESTCONF enable
    { theme: 6,
      task: 'Enable NETCONF and RESTCONF on IOS-XE.',
      canonical: [
        'aaa new-model',
        'aaa authentication login default local',
        'netconf-yang',
        'restconf',
        'ip http secure-server'
      ],
      shows: ['show netconf-yang sessions'] },

    // Theme 7: QoS MQC
    { theme: 7,
      task: 'Configure MQC QoS: match DSCP EF as VOICE class, DSCP AF41 as CRITICAL, apply LLQ 20% for voice and 30% CBWFQ for critical on g0/0 output.',
      canonical: [
        'class-map match-any VOICE',
        ' match dscp ef',
        '!',
        'class-map match-any CRITICAL',
        ' match dscp af41',
        '!',
        'policy-map WAN-QOS',
        ' class VOICE',
        '  priority percent 20',
        ' class CRITICAL',
        '  bandwidth percent 30',
        '!',
        'interface g0/0',
        ' service-policy output WAN-QOS'
      ],
      shows: ['show policy-map interface g0/0'] },

    // Theme 7: NAT/PAT
    { theme: 7,
      task: 'Configure PAT (overload) using access-list 10 out interface g0/0; mark g0/1 inside and g0/0 outside.',
      canonical: [
        'ip nat inside source list 10 interface g0/0 overload',
        '!',
        'interface g0/1',
        ' ip nat inside',
        '!',
        'interface g0/0',
        ' ip nat outside'
      ],
      shows: ['show ip nat translations'] }
  ];

  // ── Show/verify recall pairs ─────────────────────────────────────
  var SHOWS = [
    { q: 'Prove OSPF adjacency is Established.',        a: 'show ip ospf neighbor' },
    { q: 'See all LSAs in the OSPF database.',          a: 'show ip ospf database' },
    { q: 'See OSPF routes in the routing table (O IA, O E2 etc.).', a: 'show ip route ospf' },
    { q: 'Verify BGP sessions and prefix counts.',      a: 'show ip bgp summary' },
    { q: 'See BGP table with best-path markers (>).', a: 'show ip bgp' },
    { q: 'See routes advertised to a specific BGP peer.', a: 'show ip bgp neighbors X.X.X.X advertised-routes' },
    { q: 'Verify EIGRP neighborships are Up.',          a: 'show ip eigrp neighbors' },
    { q: 'See EIGRP topology with feasible successors.', a: 'show ip eigrp topology all-links' },
    { q: 'Confirm port-channel is up and links are bundled.', a: 'show etherchannel summary' },
    { q: 'Verify MST region and port roles.',           a: 'show spanning-tree mst' },
    { q: 'Check HSRP active/standby roles and VIP.',   a: 'show standby brief' },
    { q: 'Verify 802.1X port state and supplicant.',   a: 'show dot1x all' },
    { q: 'Confirm RADIUS server is reachable and responding.', a: 'show aaa servers' },
    { q: 'Check CoPP drop counters per class.',        a: 'show policy-map control-plane' },
    { q: 'Verify uRPF is enabled on an interface.',    a: 'show ip interface g0/0' },
    { q: 'See NAT translation table entries.',         a: 'show ip nat translations' },
    { q: 'Confirm QoS policy applied to interface and see drop stats.', a: 'show policy-map interface g0/0' },
    { q: 'Check VRF table and assigned interfaces.',   a: 'show vrf' },
    { q: 'See GRE tunnel status and endpoint addresses.', a: 'show interface tunnel0' },
    { q: 'List VXLAN peers and their VNI mappings.',   a: 'show nve peers' },
    { q: 'Verify NETCONF sessions are active.',        a: 'show netconf-yang sessions' },
    { q: 'See all route-map match/set clauses applied.', a: 'show route-map' }
  ];

  // ── IPv6 micro items ─────────────────────────────────────────────
  var IPV6 = [
    { q: 'What prefix range defines Global Unicast Addresses (GUA)?',
      a: '2000::/3 (first 3 bits = 001). All publicly routable IPv6 addresses.' },
    { q: 'What prefix defines Unique Local Addresses (ULA)?',
      a: 'FC00::/7. Private-use (like RFC 1918). FD00::/8 is the commonly assigned sub-range.' },
    { q: 'What prefix is used for Link-Local Addresses (LLA)?',
      a: 'FE80::/10. Assigned automatically; required on every IPv6 interface. Not routable off-link.' },
    { q: 'What is the IPv6 loopback address?',
      a: '::1 (equivalent of 127.0.0.1).' },
    { q: 'What multicast address reaches all IPv6 nodes on a link?',
      a: 'FF02::1 (All-nodes multicast). Equivalent to IPv4 broadcast.' },
    { q: 'What multicast address reaches all IPv6 routers on a link?',
      a: 'FF02::2 (All-routers multicast).' },
    { q: 'What multicast addresses do OSPFv3 routers use?',
      a: 'FF02::5 (All OSPF routers) and FF02::6 (DR/BDR only).' },
    { q: 'Describe the EUI-64 interface ID generation process.',
      a: 'Split 48-bit MAC at midpoint, insert FFFE in the middle (making 64 bits), flip bit 7 (U/L bit) of byte 1 from 0 to 1.' },
    { q: 'What RA flag triggers stateful DHCPv6 for address assignment?',
      a: 'M-flag (Managed) = 1. O-flag (Other) = 1 adds stateless DHCPv6 options (DNS) while SLAAC provides the address.' },
    { q: 'What is the standard prefix length for a single IPv6 subnet?',
      a: '/64. Required for SLAAC (EUI-64 uses the last 64 bits as the interface ID).' },
    { q: 'How does OSPFv3 authenticate adjacencies?',
      a: 'Via IPsec (AH for integrity-only, ESP for encryption). Applied to the interface, not within the OSPF packet.' },
    { q: 'What is the IPv6 multicast address for all NDP solicited-node multicast?',
      a: 'FF02::1:FF00:0/104. Last 24 bits come from the target IPv6 address. Used for neighbor discovery.' }
  ];

  // ── Wildcard / Summarization items ──────────────────────────────
  var WILDCARD_SUMMARY = [
    { q: 'What is the wildcard mask for 255.255.252.0?',
      a: '0.0.3.255 (255 - each octet of the subnet mask: 255-255=0, 255-255=0, 255-252=3, 255-0=255).' },
    { q: 'What is the wildcard mask for 255.255.255.192?',
      a: '0.0.0.63' },
    { q: 'Summarize 10.1.0.0/24, 10.1.1.0/24, 10.1.2.0/24, 10.1.3.0/24 into one prefix.',
      a: '10.1.0.0/22. Third octet 0-3 in binary: 0000 0000 to 0000 0011 = 22-bit common prefix. Wildcard: 0.0.3.255.' },
    { q: 'Summarize 192.168.16.0/24 through 192.168.31.0/24.',
      a: '192.168.16.0/20. Third octet 16-31 in binary = 0001 xxxx. Common prefix = 20 bits. Wildcard: 0.0.15.255.' },
    { q: 'What wildcard mask matches exactly one host at 10.1.1.5?',
      a: '0.0.0.0 (all bits must match).' },
    { q: 'What wildcard mask matches an entire /28?',
      a: '0.0.0.15 (255.255.255.240 -> wildcard 0.0.0.15, covers 16 addresses).' },
    { q: 'Summarize 172.16.0.0/24 through 172.16.7.0/24.',
      a: '172.16.0.0/21. Third octet 0-7 = 0000 0xxx. Common prefix = 21 bits. Wildcard: 0.0.7.255.' },
    { q: 'What is the wildcard mask for a /30 network?',
      a: '0.0.0.3 (255.255.255.252 -> wildcard 0.0.0.3, covers 4 addresses).' }
  ];

  // ── Confusable-pairs (from encor-pillars-data ENCOR_PAIRS) ───────
  var PAIRS = [
    { clue: 'External-only cost, constant regardless of internal path', a: 'E2 route', b: 'E1 route', ans: 'E2 route' },
    { clue: 'External plus internal cost, varies with path length',     a: 'E2 route', b: 'E1 route', ans: 'E1 route' },
    { clue: 'Per-VLAN STP instances, Cisco proprietary',               a: 'Rapid PVST+', b: 'MST', ans: 'Rapid PVST+' },
    { clue: 'Maps multiple VLANs to fewer STP instances',              a: 'Rapid PVST+', b: 'MST', ans: 'MST' },
    { clue: 'Group-based policy, replaces per-IP ACLs',                a: 'TrustSec SGT', b: 'Traditional ACL', ans: 'TrustSec SGT' },
    { clue: 'XML only, SSH port 830, supports candidate datastore',    a: 'NETCONF', b: 'RESTCONF', ans: 'NETCONF' },
    { clue: 'JSON or XML, HTTPS port 443, edits running datastore only', a: 'NETCONF', b: 'RESTCONF', ans: 'RESTCONF' },
    { clue: 'Drops excess traffic immediately, adds no delay',         a: 'Policing', b: 'Shaping', ans: 'Policing' },
    { clue: 'Buffers excess traffic, introduces delay on egress WAN',  a: 'Policing', b: 'Shaping', ans: 'Shaping' },
    { clue: 'Cisco FHRP, virtual MAC 0000.0c07.acXX',                 a: 'HSRP', b: 'VRRP', ans: 'HSRP' },
    { clue: 'Open-standard FHRP, virtual MAC 0000.5e00.01XX',         a: 'HSRP', b: 'VRRP', ans: 'VRRP' },
    { clue: 'Cisco FHRP that load-balances active gateways',          a: 'GLBP', b: 'HSRP', ans: 'GLBP' },
    { clue: 'Loop-free backup route whose RD is less than current FD', a: 'Successor', b: 'Feasible Successor', ans: 'Feasible Successor' },
    { clue: 'Agentless push model, YAML playbooks',                   a: 'Ansible', b: 'Terraform', ans: 'Ansible' },
    { clue: 'Declarative desired-state, HCL, state file',             a: 'Ansible', b: 'Terraform', ans: 'Terraform' },
    { clue: '24-bit VNI, UDP 4789, MAC-in-UDP encapsulation',         a: 'VXLAN', b: 'GRE', ans: 'VXLAN' },
    { clue: 'IP protocol 47, no encryption, carries multicast',        a: 'VXLAN', b: 'GRE', ans: 'GRE' },
    { clue: 'Cisco-local attribute, not advertised to peers',          a: 'Weight', b: 'Local-Pref', ans: 'Weight' },
    { clue: 'AS-wide attribute, default 100, advertised to all iBGP peers', a: 'Weight', b: 'Local-Pref', ans: 'Local-Pref' },
    { clue: 'L2 hop-by-hop encryption, Ethertype 0x88E5',             a: 'MACsec', b: 'IPsec', ans: 'MACsec' },
    { clue: 'Maps endpoint identity (EID) to location (RLOC)',         a: 'LISP', b: 'VXLAN', ans: 'LISP' },
    { clue: 'Data-plane encapsulation over L3 for L2 extension',       a: 'LISP', b: 'VXLAN', ans: 'VXLAN' }
  ];

  // ── Public API ───────────────────────────────────────────────────
  window.ENCOR_DRILL = {
    THEMES:           THEMES,
    NUMBERS:          NUMBERS,
    CONCEPTS:         CONCEPTS,
    CONFIGS:          CONFIGS,
    SHOWS:            SHOWS,
    IPV6:             IPV6,
    WILDCARD_SUMMARY: WILDCARD_SUMMARY,
    PAIRS:            PAIRS,

    // Return the theme for a given Date object (or today).
    themeForDate: function (d) {
      d = d || new Date();
      var start = new Date(d.getFullYear(), 0, 0);
      var diff  = d - start + (start.getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000;
      var doy   = Math.floor(diff / 86400000); // day-of-year 1..366
      return THEMES[doy % 7];                  // 0-indexed into 7 entries
    },

    // Items for a given theme day (1-7).
    conceptsForTheme: function (id) {
      return CONCEPTS.filter(function (c) { return c.theme === id; });
    },
    configsForTheme: function (id) {
      return CONFIGS.filter(function (c) { return c.theme === id; });
    }
  };
}());
