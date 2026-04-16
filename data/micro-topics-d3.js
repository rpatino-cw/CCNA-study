/* Domain 3 — IP Connectivity — micro-topic checklists */
window.microTopicsD3 = {
  domain: { id: '3', name: 'IP Connectivity', weight: 25 },
  topics: {
    '3.1': {
      name: 'Routing table components',
      items: {
        'Route source codes': [
          'C — directly connected',
          'L — local (the router\'s own IP on the interface, /32)',
          'S — static',
          'S* — static default',
          'O — OSPF intra-area',
          'O IA — OSPF inter-area',
          'O E1 / O E2 — OSPF external',
          'D — EIGRP',
          'D EX — EIGRP external',
          'R — RIP',
          'B — BGP',
          'i — IS-IS',
        ],
        'Fields in a route entry': [
          'Prefix and mask — e.g., 10.1.1.0/24',
          'Administrative distance (AD) — trust of source',
          'Metric — cost within the protocol',
          'Next hop — IP of neighbor',
          'Outgoing interface — local exit',
          'Age / last update time',
        ],
        'Default route and gateway of last resort': [
          '0.0.0.0/0 — default route',
          'Displayed as "Gateway of last resort is set to …"',
          'Used only when no more specific route exists',
        ],
        'Administrative distance defaults': [
          'Connected = 0',
          'Static = 1',
          'eBGP = 20',
          'EIGRP (internal) = 90',
          'OSPF = 110',
          'IS-IS = 115',
          'RIP = 120',
          'EIGRP external = 170',
          'iBGP = 200',
          'Unknown/unreachable = 255',
        ],
      },
    },
    '3.2': {
      name: 'How a router makes a forwarding decision by default',
      items: {
        'Step 1 — longest prefix match': [
          'Most specific mask wins: /32 > /30 > /24 > /16 > /0',
          'Regardless of AD or metric',
        ],
        'Step 2 — lowest administrative distance': [
          'When multiple sources learn the same prefix, lowest AD wins',
          'Static beats OSPF; OSPF beats RIP',
        ],
        'Step 3 — lowest metric': [
          'Tiebreaker within the same protocol',
          'Each protocol defines its own metric (cost, composite, hops)',
        ],
        'Equal-cost multipath (ECMP)': [
          'Multiple best paths of equal AD and metric',
          'Router installs all, load balances (per-flow default)',
          'maximum-paths <n> sets the cap',
        ],
        'Recursive lookup': [
          'Static/BGP routes with a next-hop IP require a second lookup',
          'Next-hop must resolve to an exit interface',
          'Exit-interface routes avoid the second lookup',
        ],
      },
    },
    '3.3': {
      name: 'IPv4 and IPv6 static routing',
      items: {
        'IPv4 static syntax': [
          'ip route <network> <mask> <next-hop>',
          'ip route <network> <mask> <exit-interface>',
          'ip route <network> <mask> <exit-interface> <next-hop> (fully specified)',
          'Default — ip route 0.0.0.0 0.0.0.0 <next-hop>',
          'Host — ip route <host> 255.255.255.255 <next-hop>',
          'Administrative distance — optional last argument (e.g., 5)',
        ],
        'Floating static': [
          'Static with higher AD than the primary route',
          'Example — ip route 10.0.0.0 255.0.0.0 <next> 150 (only used if OSPF 110 fails)',
          'Common for backup WAN link',
        ],
        'Next-hop vs exit-interface': [
          'Next-hop — recursive lookup (preferred on multi-access/Ethernet)',
          'Exit-interface — direct, common on point-to-point',
          'On Ethernet, exit-interface-only can cause ARP for every destination',
        ],
        'IPv6 static syntax': [
          'ipv6 route <prefix/length> <next-hop>',
          'Default — ipv6 route ::/0 <next-hop>',
          'ipv6 unicast-routing must be enabled globally',
        ],
        'Verification': [
          'show ip route static',
          'show ip route <network>',
          'show ipv6 route static',
          'ping and traceroute to validate',
        ],
      },
    },
    '3.4': {
      name: 'Single-area OSPFv2',
      items: {
        'OSPF fundamentals': [
          'Link-state protocol, SPF (Dijkstra) algorithm',
          'AD 110, metric is cost (reference BW / interface BW)',
          'Uses multicast 224.0.0.5 (all OSPF) and 224.0.0.6 (DR/BDR)',
          'Encapsulated in IP protocol 89',
          'Area 0 = backbone; single-area means all interfaces in one area',
        ],
        'Neighbor adjacency requirements': [
          'Same area ID',
          'Same subnet and mask',
          'Matching Hello / Dead timers (10/40 on broadcast; 30/120 on non-broadcast)',
          'Matching authentication (if configured)',
          'Matching MTU (usually)',
          'Unique router IDs',
        ],
        'Router ID selection': [
          'Manually configured (router-id) — highest precedence',
          'Highest IP on any up loopback',
          'Highest IP on any up physical interface',
          'Locked in at OSPF process start — clear ip ospf process to refresh',
        ],
        'Network types': [
          'Broadcast (Ethernet) — DR/BDR election',
          'Point-to-point — no DR/BDR, fastest adjacency',
          'Non-broadcast (Frame Relay legacy) — manual neighbors',
          'Point-to-multipoint',
        ],
        'DR/BDR election': [
          'Highest OSPF interface priority (default 1)',
          'Tie — highest router ID',
          'Priority 0 = never eligible',
          'Non-preemptive — an existing DR stays unless it fails',
        ],
        'Configuration': [
          'router ospf <process-id> — local significance only',
          'network <ip> <wildcard> area <#>',
          'Or on the interface — ip ospf <process-id> area <#>',
          'passive-interface <intf> — stops Hellos on that interface',
          'passive-interface default + no passive-interface <intf> — inverse',
          'default-information originate — advertises 0.0.0.0/0 into OSPF',
          'auto-cost reference-bandwidth <Mbps> — so 10G/40G have distinct costs',
        ],
        'Cost calculation': [
          'Cost = reference BW / interface BW',
          'Default reference BW = 100 Mbps — 1G and 10G both cost 1 unless changed',
          'Manually — ip ospf cost <value>',
        ],
        'Verification': [
          'show ip ospf neighbor',
          'show ip ospf interface brief',
          'show ip ospf interface <intf>',
          'show ip route ospf',
          'show ip protocols',
        ],
      },
    },
    '3.5': {
      name: 'First-hop redundancy protocols (FHRP)',
      items: {
        'Why FHRP': [
          'Clients typically have one default gateway',
          'If that router fails, clients lose connectivity',
          'FHRP lets two+ routers share a virtual IP/MAC',
        ],
        'HSRP (Cisco)': [
          'Active / Standby roles',
          'Virtual MAC v1 — 0000.0C07.AC<group>',
          'Virtual MAC v2 — 0000.0C9F.F<group in hex>',
          'Multicast — v1 224.0.0.2, v2 224.0.0.102',
          'Hello/hold — 3 / 10 seconds default',
          'Higher priority wins (default 100)',
          'Preempt optional — must be enabled',
        ],
        'VRRP (open standard)': [
          'Master / Backup roles',
          'Virtual MAC — 0000.5E00.01<group>',
          'Multicast 224.0.0.18',
          'Preempt on by default',
          'Can use the physical IP of the master as the virtual IP',
        ],
        'GLBP (Cisco)': [
          'AVG (Active Virtual Gateway) + AVFs (Active Virtual Forwarders)',
          'One virtual IP, multiple virtual MACs',
          'Load balances across routers automatically',
          'Modes — round-robin, weighted, host-dependent',
        ],
        'Common FHRP concepts': [
          'Preemption — higher-priority device retakes active role when it comes back',
          'Tracking — lower priority if an upstream interface or object goes down',
          'Authentication — simple (text) or MD5',
        ],
      },
    },
  },
};
