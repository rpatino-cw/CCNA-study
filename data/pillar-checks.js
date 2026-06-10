/* ══════════════════════════════════════════════════════════════════════
   pillar-checks.js  CHECK-DRILL items for the Study ROI page (pillar-value.html)
   window.PILLAR_CHECKS[pillarNumber][dim] = item (or array of items).
   The examination is the sole judge: passing a dim's drill sets that dim true.

   Item shapes by dim/engine:
     concept | applied | scope  -> MCQ
        { type:'mcq', stem, choices:[...], answer:<index>, explain }
     config -> type the CLI + the show command, validated line-by-line leniently
        { type:'config', stem, lines:[ 'exact line', ... ], show:'show ...', hint }
     sequence -> reorder steps into correct order
        { type:'sequence', stem, steps:[ 'a', 'b', ... ] }  // steps in CORRECT order
     topology -> inline SVG + MCQ
        { type:'topology', stem, svg:'<svg ...>', choices:[...], answer:<index>, explain }

   A dim key may hold ONE item object or an ARRAY of item objects (the page
   currently drills the first; the array banks alternates for future rotation).
   Pillars/dims with no item render "drill coming soon" gracefully.
   Every fact below matches the canonical CCNA 200-301 cheatsheet.

   Pillar number map (P1, build numbers 1-12):
     1 OSPF | 2 routing | 3 static | 4 NAT | 5 STP | 6 VLAN
     7 EtherChannel | 8 ACL | 9 L2sec | 10 access | 11 ipv6 | 12 subnetting
   ══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var PILLAR_CHECKS = {

    // ════════════════════════════════════════════════════════════════
    // Pillar 1: OSPFv2 single area  (obj 3.4)
    // dims: concept, config, sequence, topology, applied, scope
    // ════════════════════════════════════════════════════════════════
    1: {
      concept: [
        {
          type: 'mcq',
          stem: 'Two OSPF neighbors are stuck in EXSTART/EXCHANGE. What is the most likely cause?',
          choices: ['Mismatched hello/dead timers', 'MTU mismatch on the link', 'Different process IDs', 'Mismatched router priorities'],
          answer: 1,
          explain: 'Timer, area, subnet, or auth mismatches block adjacency earlier (stuck in INIT/2-WAY). An MTU mismatch stalls at Exstart/Exchange during the DBD exchange.'
        },
        {
          type: 'mcq',
          stem: 'How does a router choose its OSPF Router ID when no router-id is configured?',
          choices: ['Lowest physical interface IP', 'Highest loopback IP, else highest physical IP', 'The process ID', 'The MAC address of g0/0'],
          answer: 1,
          explain: 'RID order: manually configured router-id, then highest loopback IP, then highest active physical interface IP.'
        },
        {
          type: 'mcq',
          stem: 'Which four parameters must match for two routers to form an OSPF adjacency (TASA)?',
          choices: ['Timers, Area, Subnet, Authentication', 'Type, Address, Speed, Auth', 'Topology, Area, Stratum, AD', 'Timers, AD, Subnet, ABR'],
          answer: 0,
          explain: 'TASA: Timers (hello/dead), Area ID, Subnet/mask on the link, and Authentication must all match.'
        }
      ],
      config: {
        type: 'config',
        stem: 'Enable OSPF process 1, advertise 10.0.0.0/24 in area 0, then show the neighbor table.',
        lines: [
          'router ospf 1',
          'network 10.0.0.0 0.0.0.255 area 0'
        ],
        show: 'show ip ospf neighbor',
        hint: 'network statements use a WILDCARD mask (0.0.0.255), not a subnet mask.'
      },
      sequence: {
        type: 'sequence',
        stem: 'Order the OSPF neighbor states from first to full adjacency.',
        steps: ['Down', 'Init', '2-Way', 'Exstart', 'Exchange', 'Loading', 'Full']
      },
      topology: {
        type: 'topology',
        stem: 'On this multi-access segment all router priorities are default (1). RIDs are shown. Which router becomes the DR?',
        svg: '<svg viewBox="0 0 320 170" role="img" aria-label="Three routers on a shared Ethernet segment with router IDs"><line x1="40" y1="120" x2="280" y2="120" stroke="#57534E" stroke-width="3"/><g font-family="JetBrains Mono, monospace" font-size="11" fill="#1C1917"><rect x="20" y="30" width="60" height="34" rx="5" fill="#FEF3C7" stroke="#B45309"/><text x="50" y="50" text-anchor="middle">R1</text><text x="50" y="62" text-anchor="middle" font-size="9">1.1.1.1</text><line x1="50" y1="64" x2="50" y2="120" stroke="#57534E" stroke-width="2"/><rect x="130" y="30" width="60" height="34" rx="5" fill="#FEF3C7" stroke="#B45309"/><text x="160" y="50" text-anchor="middle">R2</text><text x="160" y="62" text-anchor="middle" font-size="9">2.2.2.2</text><line x1="160" y1="64" x2="160" y2="120" stroke="#57534E" stroke-width="2"/><rect x="240" y="30" width="60" height="34" rx="5" fill="#FEF3C7" stroke="#B45309"/><text x="270" y="50" text-anchor="middle">R3</text><text x="270" y="62" text-anchor="middle" font-size="9">3.3.3.3</text><line x1="270" y1="64" x2="270" y2="120" stroke="#57534E" stroke-width="2"/></g></svg>',
        choices: ['R1 (1.1.1.1)', 'R2 (2.2.2.2)', 'R3 (3.3.3.3)', 'No DR is elected'],
        answer: 2,
        explain: 'Priorities tie at 1, so the highest Router ID wins the DR election. 3.3.3.3 is highest, so R3 is the DR.'
      },
      applied: [
        {
          type: 'mcq',
          stem: 'A 1 Gbps interface runs OSPF with the default reference bandwidth. What is its OSPF cost?',
          choices: ['1', '10', '100', '64'],
          answer: 0,
          explain: 'Cost = reference BW (100 Mbps) / interface BW. 100 Mbps / 1000 Mbps rounds up to the minimum cost of 1.'
        },
        {
          type: 'mcq',
          stem: 'You want a router to NEVER become DR or BDR on a segment. What do you set on its interface?',
          choices: ['ip ospf priority 0', 'ip ospf priority 255', 'ip ospf cost 65535', 'passive-interface'],
          answer: 0,
          explain: 'ip ospf priority 0 removes a router from DR/BDR elections. Higher priority wins; 0 means never eligible.'
        }
      ],
      scope: [
        {
          type: 'mcq',
          stem: 'Which multicast address does OSPF use to reach ALL OSPF routers on a segment?',
          choices: ['224.0.0.5', '224.0.0.6', '224.0.0.9', '224.0.0.10'],
          answer: 0,
          explain: '224.0.0.5 is all-OSPF-routers; 224.0.0.6 is reserved for the DR/BDR.'
        },
        {
          type: 'mcq',
          stem: 'What are the default OSPF hello and dead intervals on a broadcast (Ethernet) link?',
          choices: ['Hello 5s / Dead 15s', 'Hello 10s / Dead 40s', 'Hello 30s / Dead 120s', 'Hello 60s / Dead 180s'],
          answer: 1,
          explain: 'Default OSPF Hello is 10s and Dead is 40s (4x hello) on broadcast/point-to-point links.'
        }
      ]
    },

    // ════════════════════════════════════════════════════════════════
    // Pillar 2: Routing table + forwarding  (obj 3.1-3.2)
    // dims: concept, sequence, topology, applied, scope  (no config)
    // ════════════════════════════════════════════════════════════════
    2: {
      concept: [
        {
          type: 'mcq',
          stem: 'The routing table has these matches for a packet to 10.1.1.50: an OSPF /24, a RIP /26, and a static /28. Which is used?',
          choices: ['OSPF /24 (lowest AD)', 'RIP /26', 'Static /28 (longest prefix)', 'The route with the lowest metric'],
          answer: 2,
          explain: 'Longest-prefix match wins FIRST, before AD or metric. /28 is the most specific.'
        },
        {
          type: 'mcq',
          stem: 'Two routes to the same /24 exist: one via OSPF (AD 110) and one via RIP (AD 120). Which is installed?',
          choices: ['RIP, lower hop count', 'OSPF, lower administrative distance', 'Both, load-balanced', 'Neither, the prefixes conflict'],
          answer: 1,
          explain: 'With equal prefix length, administrative distance decides. OSPF AD 110 is lower (more trusted) than RIP AD 120.'
        },
        {
          type: 'mcq',
          stem: 'What does a router do with a packet that matches NO entry in its routing table and has no default route?',
          choices: ['Floods it out all interfaces', 'Drops it and may send ICMP unreachable', 'Sends it to the DR', 'Queues it until a route appears'],
          answer: 1,
          explain: 'No match and no gateway of last resort means the packet is dropped; the router may return an ICMP destination unreachable.'
        }
      ],
      sequence: {
        type: 'sequence',
        stem: 'Order the route-selection decision criteria from first applied to last.',
        steps: ['Longest prefix match', 'Lowest administrative distance', 'Lowest metric']
      },
      topology: {
        type: 'topology',
        stem: 'R1 learns 10.2.2.0/24 via OSPF (AD 110) and via a static route (AD 1). Which route is installed?',
        svg: '<svg viewBox="0 0 320 140" role="img" aria-label="Router with two paths to the same network"><g font-family="JetBrains Mono, monospace" font-size="11" fill="#1C1917"><rect x="120" y="50" width="70" height="38" rx="5" fill="#FEF3C7" stroke="#B45309"/><text x="155" y="73" text-anchor="middle">R1</text><line x1="120" y1="60" x2="40" y2="30" stroke="#16A34A" stroke-width="2"/><text x="40" y="22" font-size="9" fill="#16A34A">Static AD 1</text><line x1="190" y1="60" x2="290" y2="30" stroke="#57534E" stroke-width="2"/><text x="230" y="22" font-size="9">OSPF AD 110</text><text x="155" y="120" text-anchor="middle" font-size="9">dest 10.2.2.0/24 (both /24)</text></g></svg>',
        choices: ['OSPF route (AD 110)', 'Static route (AD 1)', 'Both, load-balanced', 'Neither, prefix tie'],
        answer: 1,
        explain: 'Same prefix length, so administrative distance breaks the tie. Static AD 1 beats OSPF AD 110.'
      },
      applied: [
        {
          type: 'mcq',
          stem: 'In a routing table, what does the route code "L" represent?',
          choices: ['A learned OSPF route', 'A local /32 host route for the interface IP', 'A floating static', 'A leaked label'],
          answer: 1,
          explain: 'L = local route, the /32 for the router own interface address. C = the connected network.'
        },
        {
          type: 'mcq',
          stem: 'A router has two equal-cost OSPF paths to the same network. What does it do by default?',
          choices: ['Picks the lower interface number', 'Load-balances across both (ECMP)', 'Drops one path', 'Raises the AD of one'],
          answer: 1,
          explain: 'Equal-cost multipath: the router installs both and load-balances traffic across them.'
        }
      ],
      scope: [
        {
          type: 'mcq',
          stem: 'What is the administrative distance of an external EIGRP route?',
          choices: ['90', '110', '170', '200'],
          answer: 2,
          explain: 'Internal EIGRP is 90, external EIGRP is 170. iBGP is 200, eBGP is 20.'
        },
        {
          type: 'mcq',
          stem: 'Which administrative distance value means a route is considered unreachable?',
          choices: ['0', '1', '120', '255'],
          answer: 3,
          explain: 'AD 0 = connected, 1 = static. AD 255 marks a route as untrusted and it is never installed.'
        }
      ]
    },

    // ════════════════════════════════════════════════════════════════
    // Pillar 3: Static routing  (obj 3.3)
    // dims: concept, config, sequence, topology, applied, scope
    // ════════════════════════════════════════════════════════════════
    3: {
      concept: [
        {
          type: 'mcq',
          stem: 'You want a backup path that only installs if the primary fails. What do you configure?',
          choices: ['A static route with a lower AD', 'A floating static route (higher AD)', 'A host route /32', 'An OSPF default-information route'],
          answer: 1,
          explain: 'A floating static has a manually raised AD so it stays out of the table until the preferred route disappears.'
        },
        {
          type: 'mcq',
          stem: 'What does the next-hop address in "ip route 10.0.0.0 255.255.255.0 192.168.1.2" specify?',
          choices: ['The destination host', 'The router to forward toward to reach 10.0.0.0/24', 'The local interface IP', 'The DNS server'],
          answer: 1,
          explain: 'The next-hop is the adjacent router IP the packet is handed to in order to reach the destination network.'
        },
        {
          type: 'mcq',
          stem: 'What is the administrative distance of a normal static route?',
          choices: ['0', '1', '110', '120'],
          answer: 1,
          explain: 'Connected = 0, static = 1. A floating static is just a static route with a manually higher AD.'
        }
      ],
      config: {
        type: 'config',
        stem: 'Add a default route pointing to next-hop 203.0.113.1, then display the routing table.',
        lines: ['ip route 0.0.0.0 0.0.0.0 203.0.113.1'],
        show: 'show ip route',
        hint: 'Static routes use a SUBNET mask. The default route is all-zeros network and mask.'
      },
      sequence: {
        type: 'sequence',
        stem: 'Order these static routes from MOST preferred to LEAST preferred when destined to the same host (all reachable).',
        steps: ['Host route /32', 'Network route /24', 'Default route /0']
      },
      topology: {
        type: 'topology',
        stem: 'R1 must reach the 10.5.0.0/24 LAN behind R2 across a point-to-point WAN. What static route does R1 need?',
        svg: '<svg viewBox="0 0 320 140" role="img" aria-label="R1 to R2 WAN link, LAN behind R2"><g font-family="JetBrains Mono, monospace" font-size="11" fill="#1C1917"><rect x="20" y="50" width="60" height="36" rx="5" fill="#FEF3C7" stroke="#B45309"/><text x="50" y="72" text-anchor="middle">R1</text><line x1="80" y1="68" x2="180" y2="68" stroke="#57534E" stroke-width="2"/><text x="130" y="60" text-anchor="middle" font-size="9">.1 WAN .2</text><rect x="180" y="50" width="60" height="36" rx="5" fill="#FEF3C7" stroke="#B45309"/><text x="210" y="72" text-anchor="middle">R2</text><line x1="240" y1="68" x2="300" y2="68" stroke="#16A34A" stroke-width="2"/><text x="280" y="110" text-anchor="middle" font-size="9">10.5.0.0/24</text></g></svg>',
        choices: ['ip route 10.5.0.0 255.255.255.0 (R2 WAN IP)', 'ip route 10.5.0.0 255.255.255.0 (R1 own IP)', 'A connected route, no static needed', 'ip route 0.0.0.0 0.0.0.0 (R1 own IP)'],
        answer: 0,
        explain: 'R1 points the 10.5.0.0/24 route at R2 WAN-side IP as the next hop. Pointing at its own IP would be wrong.'
      },
      applied: [
        {
          type: 'mcq',
          stem: 'On a multi-access (Ethernet) link, why is an exit-interface-only static route discouraged?',
          choices: ['It is not supported on Ethernet', 'The router must ARP for every destination, which is slow', 'It raises the AD automatically', 'It creates a routing loop'],
          answer: 1,
          explain: 'Without a next-hop, the router treats every dest as directly connected and ARPs for each, which is inefficient on multi-access media.'
        },
        {
          type: 'mcq',
          stem: 'A stub site has exactly one path to the rest of the network. What is the cleanest config?',
          choices: ['Full OSPF area 0', 'A single default static route out the WAN', 'A floating static plus RIP', 'A host route per remote network'],
          answer: 1,
          explain: 'A single edge/stub site with one exit uses a default static route (0.0.0.0/0); a dynamic protocol is overkill.'
        }
      ],
      scope: [
        {
          type: 'mcq',
          stem: 'Which prefix length identifies a host route?',
          choices: ['/24', '/30', '/32', '/0'],
          answer: 2,
          explain: 'A /32 (single address) is a host route. /0 is the default route.'
        },
        {
          type: 'mcq',
          stem: 'Static routing scales poorly compared to dynamic routing because:',
          choices: ['It uses too much CPU', 'Every topology change must be reconfigured by hand', 'It has a higher AD', 'It floods LSAs'],
          answer: 1,
          explain: 'Static routes do not adapt automatically; admins must edit them on every change, which does not scale to large/changing networks.'
        }
      ]
    },

    // ════════════════════════════════════════════════════════════════
    // Pillar 4: NAT  (obj 4.1)
    // dims: concept, config, sequence, topology, applied, scope
    // ════════════════════════════════════════════════════════════════
    4: {
      concept: [
        {
          type: 'mcq',
          stem: 'A private host 192.168.1.10 reaches the internet as 203.0.113.5. What is 203.0.113.5 called?',
          choices: ['Inside local', 'Inside global', 'Outside local', 'Outside global'],
          answer: 1,
          explain: 'The host private address is the inside local; its translated public address is the inside global.'
        },
        {
          type: 'mcq',
          stem: 'What is the inside local address of an internal host?',
          choices: ['Its public translated address', 'Its real private address on the LAN', 'The ISP gateway IP', 'The destination server IP'],
          answer: 1,
          explain: 'Inside local = the real private (RFC 1918) address the host actually uses on the inside network.'
        },
        {
          type: 'mcq',
          stem: 'Which problem does NAT/PAT primarily solve?',
          choices: ['Routing loops', 'IPv4 public address exhaustion', 'STP convergence', 'VLAN hopping'],
          answer: 1,
          explain: 'NAT lets many private hosts share scarce public IPv4 addresses, conserving the public space.'
        }
      ],
      config: {
        type: 'config',
        stem: 'Tag the LAN side g0/0 as the NAT inside interface, then verify the active translations.',
        lines: [
          'interface g0/0',
          'ip nat inside'
        ],
        show: 'show ip nat translations',
        hint: 'You must tag both inside (ip nat inside) and outside (ip nat outside) interfaces for NAT to work.'
      },
      sequence: {
        type: 'sequence',
        stem: 'Order the steps to configure dynamic PAT (overload) using an interface.',
        steps: [
          'Define an ACL matching the inside hosts',
          'Tag the inside interface ip nat inside',
          'Tag the outside interface ip nat outside',
          'ip nat inside source list <acl> interface <outside> overload'
        ]
      },
      topology: {
        type: 'topology',
        stem: 'On this NAT router, which interface is tagged "ip nat outside"?',
        svg: '<svg viewBox="0 0 320 140" role="img" aria-label="NAT router between LAN and internet"><g font-family="JetBrains Mono, monospace" font-size="11" fill="#1C1917"><rect x="20" y="55" width="70" height="30" rx="4" fill="#F0FDF4" stroke="#16A34A"/><text x="55" y="74" text-anchor="middle" font-size="9">LAN 192.168.1.0</text><line x1="90" y1="70" x2="130" y2="70" stroke="#57534E" stroke-width="2"/><text x="110" y="62" text-anchor="middle" font-size="8">g0/0</text><rect x="130" y="52" width="60" height="36" rx="5" fill="#FEF3C7" stroke="#B45309"/><text x="160" y="74" text-anchor="middle">NAT</text><line x1="190" y1="70" x2="230" y2="70" stroke="#57534E" stroke-width="2"/><text x="210" y="62" text-anchor="middle" font-size="8">g0/1</text><rect x="230" y="55" width="70" height="30" rx="4" fill="#FFF7ED" stroke="#B45309"/><text x="265" y="74" text-anchor="middle" font-size="9">Internet</text></g></svg>',
        choices: ['g0/0 (LAN side)', 'g0/1 (Internet side)', 'Both interfaces', 'Neither, NAT is global'],
        answer: 1,
        explain: 'The interface facing the public internet is ip nat outside; the LAN interface is ip nat inside.'
      },
      applied: [
        {
          type: 'mcq',
          stem: 'Many hosts share ONE public IP, distinguished by port numbers. Which NAT type is this?',
          choices: ['Static NAT', 'Dynamic NAT pool', 'PAT (overload)', 'Twice NAT'],
          answer: 2,
          explain: 'PAT (overload) maps many private hosts to one public IP using unique source ports.'
        },
        {
          type: 'mcq',
          stem: 'An internal web server must always be reachable from the internet at a fixed public IP. Which NAT do you use?',
          choices: ['PAT overload', 'Dynamic NAT pool', 'Static NAT (1:1)', 'No NAT, just routing'],
          answer: 2,
          explain: 'Static NAT gives a permanent 1:1 mapping so external clients can always reach the server at the same public IP.'
        }
      ],
      scope: [
        {
          type: 'mcq',
          stem: 'Static NAT provides what kind of mapping?',
          choices: ['Many-to-one via ports', 'One-to-one fixed', 'Many-to-many from a pool', 'No mapping, just routing'],
          answer: 1,
          explain: 'Static NAT is a fixed 1:1 mapping, useful for servers that must always be reachable at the same public IP.'
        },
        {
          type: 'mcq',
          stem: 'Which interfaces must be tagged for NAT to translate traffic?',
          choices: ['Only the inside interface', 'Only the outside interface', 'Both an ip nat inside and an ip nat outside', 'The loopback only'],
          answer: 2,
          explain: 'NAT needs at least one ip nat inside and one ip nat outside interface so it knows which direction to translate.'
        }
      ]
    },

    // ════════════════════════════════════════════════════════════════
    // Pillar 5: STP / Rapid PVST+  (obj 2.5)
    // dims: concept, config, sequence, topology, applied, scope
    // ════════════════════════════════════════════════════════════════
    5: {
      concept: [
        {
          type: 'mcq',
          stem: 'Four switches have equal bridge priority (32768). Which becomes root?',
          choices: ['The one with the highest MAC', 'The one with the lowest MAC', 'The one with the most ports', 'The one booted first'],
          answer: 1,
          explain: 'BID = priority + VLAN + MAC. With priority tied, the lowest MAC address wins root.'
        },
        {
          type: 'mcq',
          stem: 'In what increments must STP bridge priority be set?',
          choices: ['1', '256', '1024', '4096'],
          answer: 3,
          explain: 'Bridge priority is set in steps of 4096 (0, 4096, 8192, ...). Default is 32768.'
        },
        {
          type: 'mcq',
          stem: 'What problem does Spanning Tree Protocol prevent in a switched network with redundant links?',
          choices: ['IP address conflicts', 'Layer-2 loops and broadcast storms', 'VLAN hopping', 'Slow routing convergence'],
          answer: 1,
          explain: 'STP blocks redundant paths to prevent bridging loops, broadcast storms, and MAC table instability.'
        }
      ],
      config: {
        type: 'config',
        stem: 'Make this switch the root for VLAN 10 by setting priority 4096, then verify STP for VLAN 10.',
        lines: ['spanning-tree vlan 10 priority 4096'],
        show: 'show spanning-tree vlan 10',
        hint: 'Bridge priority must be a multiple of 4096 (default 32768).'
      },
      sequence: {
        type: 'sequence',
        stem: 'Order the RSTP port states from blocking traffic to forwarding traffic.',
        steps: ['Discarding', 'Learning', 'Forwarding']
      },
      topology: {
        type: 'topology',
        stem: 'All links are 1 Gbps (cost 4). SW-A is root. Which port on SW-C is the root port?',
        svg: '<svg viewBox="0 0 320 170" role="img" aria-label="Triangle of three switches, A is root"><g font-family="JetBrains Mono, monospace" font-size="11" fill="#1C1917"><rect x="130" y="15" width="60" height="32" rx="5" fill="#F0FDF4" stroke="#16A34A"/><text x="160" y="36" text-anchor="middle">SW-A*</text><rect x="30" y="115" width="60" height="32" rx="5" fill="#FFFFFF" stroke="#B45309"/><text x="60" y="136" text-anchor="middle">SW-B</text><rect x="230" y="115" width="60" height="32" rx="5" fill="#FFFFFF" stroke="#B45309"/><text x="260" y="136" text-anchor="middle">SW-C</text><line x1="145" y1="47" x2="70" y2="115" stroke="#57534E" stroke-width="2"/><line x1="175" y1="47" x2="250" y2="115" stroke="#57534E" stroke-width="2"/><line x1="90" y1="131" x2="230" y2="131" stroke="#57534E" stroke-width="2"/><text x="100" y="80" font-size="9">cost 4</text><text x="205" y="80" font-size="9">cost 4</text><text x="160" y="125" text-anchor="middle" font-size="9">cost 4</text></g></svg>',
        choices: ['The port toward SW-A (cost 4)', 'The port toward SW-B (cost 8 path)', 'Both are root ports', 'SW-C has no root port'],
        answer: 0,
        explain: 'Root port = lowest cost path to root. Direct to SW-A costs 4; via SW-B costs 8. The direct port wins.'
      },
      applied: [
        {
          type: 'mcq',
          stem: 'A port configured with PortFast receives a BPDU and BPDU Guard is enabled. What happens?',
          choices: ['It becomes the root port', 'It moves to err-disabled (shut down)', 'It begins normal STP listening', 'Nothing, PortFast ignores BPDUs'],
          answer: 1,
          explain: 'BPDU Guard err-disables a PortFast edge port the moment it receives a BPDU, protecting the topology.'
        },
        {
          type: 'mcq',
          stem: 'An access port for an end host takes ~30s to start forwarding after link-up. How do you fix the delay?',
          choices: ['Enable PortFast on the access port', 'Lower the bridge priority', 'Set the port to trunk', 'Disable RSTP'],
          answer: 0,
          explain: 'PortFast skips listening/learning on edge ports so end-host ports forward immediately instead of waiting ~30s.'
        }
      ],
      scope: [
        {
          type: 'mcq',
          stem: 'What is the default STP forward delay timer?',
          choices: ['2 seconds', '10 seconds', '15 seconds', '20 seconds'],
          answer: 2,
          explain: 'Hello 2s, Forward delay 15s, Max age 20s.'
        },
        {
          type: 'mcq',
          stem: 'What is the STP path cost of a 10 Gbps link?',
          choices: ['2', '4', '19', '100'],
          answer: 0,
          explain: 'Costs: 10G = 2, 1G = 4, 100M = 19, 10M = 100.'
        }
      ]
    },

    // ════════════════════════════════════════════════════════════════
    // Pillar 6: VLANs + trunking  (obj 2.1-2.2)
    // dims: concept, config, sequence, topology, applied, scope
    // ════════════════════════════════════════════════════════════════
    6: {
      concept: [
        {
          type: 'mcq',
          stem: 'A trunk between two switches drops traffic and logs a native VLAN mismatch. What is wrong?',
          choices: ['Different allowed VLAN lists', 'The native VLAN differs on each end', 'One side is an access port', 'DTP is disabled'],
          answer: 1,
          explain: 'The native (untagged) VLAN must match on both ends of an 802.1Q trunk.'
        },
        {
          type: 'mcq',
          stem: 'What does an 802.1Q trunk do to a frame on the native VLAN?',
          choices: ['Tags it with the native VLAN ID', 'Sends it untagged', 'Drops it', 'Double-tags it'],
          answer: 1,
          explain: 'Frames on the native VLAN cross an 802.1Q trunk untagged; all other VLANs are tagged.'
        },
        {
          type: 'mcq',
          stem: 'A switch port assigned to VLAN 10 cannot reach a host in VLAN 20 on the same switch. Why?',
          choices: ['STP blocked it', 'VLANs are separate broadcast domains; routing is required between them', 'The trunk is down', 'Duplex mismatch'],
          answer: 1,
          explain: 'Each VLAN is its own broadcast domain/subnet. Inter-VLAN traffic must be routed (SVI or router-on-a-stick).'
        }
      ],
      config: {
        type: 'config',
        stem: 'Configure g0/1 as a static 802.1Q trunk, then verify trunk status.',
        lines: [
          'interface g0/1',
          'switchport mode trunk'
        ],
        show: 'show interfaces trunk',
        hint: 'switchport mode trunk forces trunking. On switches that support it, set encapsulation dot1q first.'
      },
      sequence: {
        type: 'sequence',
        stem: 'Order the steps to create VLAN 20 and assign access port g0/2 to it.',
        steps: [
          'vlan 20',
          'name SALES',
          'interface g0/2',
          'switchport mode access',
          'switchport access vlan 20'
        ]
      },
      topology: {
        type: 'topology',
        stem: 'PC-A (VLAN 10) and PC-B (VLAN 20) sit on the same switch and must talk. The link to the router carries both VLANs. What must that link be?',
        svg: '<svg viewBox="0 0 320 150" role="img" aria-label="Switch with two VLANs uplinked to a router"><g font-family="JetBrains Mono, monospace" font-size="11" fill="#1C1917"><rect x="120" y="90" width="80" height="30" rx="4" fill="#FFFFFF" stroke="#B45309"/><text x="160" y="109" text-anchor="middle">SW1</text><rect x="20" y="120" width="60" height="22" rx="3" fill="#F0FDF4" stroke="#16A34A"/><text x="50" y="135" text-anchor="middle" font-size="9">PC-A v10</text><rect x="240" y="120" width="60" height="22" rx="3" fill="#FEF9C3" stroke="#CA8A04"/><text x="270" y="135" text-anchor="middle" font-size="9">PC-B v20</text><line x1="80" y1="120" x2="130" y2="110" stroke="#57534E" stroke-width="2"/><line x1="240" y1="120" x2="190" y2="110" stroke="#57534E" stroke-width="2"/><rect x="120" y="15" width="80" height="30" rx="4" fill="#FEF3C7" stroke="#B45309"/><text x="160" y="34" text-anchor="middle">Router</text><line x1="160" y1="45" x2="160" y2="90" stroke="#57534E" stroke-width="2"/><text x="200" y="70" font-size="9">? link</text></g></svg>',
        choices: ['An access port in VLAN 10', 'An 802.1Q trunk carrying both VLANs', 'A blocked STP port', 'A loopback'],
        answer: 1,
        explain: 'Router-on-a-stick needs an 802.1Q trunk to the router so subinterfaces can route between VLAN 10 and VLAN 20.'
      },
      applied: [
        {
          type: 'mcq',
          stem: 'Router-on-a-stick provides inter-VLAN routing using what on the router?',
          choices: ['One subinterface per VLAN with dot1q tagging', 'A separate physical port per VLAN', 'An SVI per VLAN', 'A trunk to the ISP'],
          answer: 0,
          explain: 'ROAS uses subinterfaces (e.g. g0/0.10) each with encapsulation dot1q <vlan> and an IP, over one trunked link.'
        },
        {
          type: 'mcq',
          stem: 'On a multilayer switch, what provides the default gateway IP for VLAN 30?',
          choices: ['A subinterface g0/0.30', 'A switch virtual interface (interface vlan 30)', 'A loopback', 'The native VLAN'],
          answer: 1,
          explain: 'A multilayer switch uses an SVI (interface vlan 30) with an IP as the gateway and routes between VLANs internally.'
        }
      ],
      scope: [
        {
          type: 'mcq',
          stem: 'An access port carries how many VLANs and tags frames how?',
          choices: ['Many VLANs, 802.1Q tagged', 'One VLAN, untagged', 'One VLAN, tagged', 'All VLANs, ISL tagged'],
          answer: 1,
          explain: 'Access = one VLAN, frames sent untagged. Trunk = many VLANs, 802.1Q tagged.'
        },
        {
          type: 'mcq',
          stem: 'What is the default native VLAN on a Cisco 802.1Q trunk?',
          choices: ['VLAN 0', 'VLAN 1', 'VLAN 99', 'VLAN 1002'],
          answer: 1,
          explain: 'VLAN 1 is the default native (and default access) VLAN. Best practice is to change it for security.'
        }
      ]
    },

    // ════════════════════════════════════════════════════════════════
    // Pillar 7: EtherChannel  (obj 2.4)
    // dims: concept, config, sequence, topology, applied, scope
    // ════════════════════════════════════════════════════════════════
    7: {
      concept: [
        {
          type: 'mcq',
          stem: 'Why bundle multiple physical links into one EtherChannel?',
          choices: ['To create more broadcast domains', 'To aggregate bandwidth and avoid STP blocking the redundant links', 'To run different VLANs per link', 'To increase the MTU'],
          answer: 1,
          explain: 'EtherChannel makes several links act as one logical link, so STP sees one port and does not block the extra bandwidth.'
        },
        {
          type: 'mcq',
          stem: 'Which protocol is the IEEE (open) standard for negotiating an EtherChannel?',
          choices: ['PAgP', 'LACP', 'DTP', 'VTP'],
          answer: 1,
          explain: 'LACP (802.3ad) is the open standard. PAgP is the Cisco-proprietary equivalent.'
        },
        {
          type: 'mcq',
          stem: 'Two switches form an EtherChannel but it stays down. The member ports differ in VLAN and speed. Why does that matter?',
          choices: ['EtherChannel ignores port settings', 'All bundled ports must share identical speed, duplex, and VLAN/trunk settings', 'Only the first port settings count', 'It only affects LACP, not PAgP'],
          answer: 1,
          explain: 'Every member port must match in speed, duplex, and switchport mode/VLAN config or the channel will not form.'
        }
      ],
      config: {
        type: 'config',
        stem: 'Bundle interfaces g0/1 and g0/2 into an LACP EtherChannel (channel-group 1, mode active), then verify.',
        lines: [
          'interface range g0/1 - 2',
          'channel-group 1 mode active'
        ],
        show: 'show etherchannel summary',
        hint: 'mode active = LACP. PAgP uses desirable/auto; static (no protocol) uses mode on.'
      },
      sequence: {
        type: 'sequence',
        stem: 'Order the steps to build a layer-2 LACP EtherChannel between two switches.',
        steps: [
          'Confirm member ports match in speed, duplex, and VLAN/trunk config',
          'interface range g0/1 - 2',
          'channel-group 1 mode active',
          'Configure the port-channel 1 interface (trunk/access settings)',
          'Verify with show etherchannel summary'
        ]
      },
      topology: {
        type: 'topology',
        stem: 'Two switches are joined by three parallel links bundled into one EtherChannel. How many of these links does STP block?',
        svg: '<svg viewBox="0 0 320 150" role="img" aria-label="Two switches joined by three bundled links"><g font-family="JetBrains Mono, monospace" font-size="11" fill="#1C1917"><rect x="30" y="55" width="60" height="40" rx="5" fill="#FFFFFF" stroke="#B45309"/><text x="60" y="80" text-anchor="middle">SW1</text><rect x="230" y="55" width="60" height="40" rx="5" fill="#FFFFFF" stroke="#B45309"/><text x="260" y="80" text-anchor="middle">SW2</text><line x1="90" y1="62" x2="230" y2="62" stroke="#57534E" stroke-width="2"/><line x1="90" y1="75" x2="230" y2="75" stroke="#57534E" stroke-width="2"/><line x1="90" y1="88" x2="230" y2="88" stroke="#57534E" stroke-width="2"/><text x="160" y="120" text-anchor="middle" font-size="9">Port-channel 1 (3 links)</text></g></svg>',
        choices: ['Two of the three', 'One of the three', 'None, the bundle is one logical link', 'All three'],
        answer: 2,
        explain: 'STP sees the EtherChannel as a single logical link, so it blocks none of the members and all bandwidth is usable.'
      },
      applied: [
        {
          type: 'mcq',
          stem: 'You want EtherChannel to form only if the other side also negotiates LACP. Which mode pair works?',
          choices: ['on / on', 'active / passive (or active/active)', 'desirable / passive', 'auto / auto'],
          answer: 1,
          explain: 'LACP active negotiates; passive only responds. active/active or active/passive forms a channel. auto/auto (PAgP) never does.'
        },
        {
          type: 'mcq',
          stem: 'What is the maximum number of physical links you can bundle into one EtherChannel?',
          choices: ['2', '4', '8', '16'],
          answer: 2,
          explain: 'A Cisco EtherChannel supports up to 8 active member links.'
        }
      ],
      scope: [
        {
          type: 'mcq',
          stem: 'Which EtherChannel mode forms a channel with NO negotiation protocol?',
          choices: ['active', 'passive', 'on', 'desirable'],
          answer: 2,
          explain: 'mode on forces a static channel with no LACP/PAgP. Both sides must be on, or the channel can loop.'
        },
        {
          type: 'mcq',
          stem: 'What does EtherChannel replace the need for, versus plain redundant links?',
          choices: ['VLANs', 'STP blocking the redundant links (so all bandwidth is used)', 'Routing protocols', 'NAT'],
          answer: 1,
          explain: 'Without bundling, STP would block all but one redundant link. EtherChannel lets every link forward at once.'
        }
      ]
    },

    // ════════════════════════════════════════════════════════════════
    // Pillar 8: ACLs  (obj 5.6)
    // dims: concept, config, sequence, topology, applied, scope
    // ════════════════════════════════════════════════════════════════
    8: {
      concept: [
        {
          type: 'mcq',
          stem: 'Where should a standard ACL be placed, and why?',
          choices: ['Near the source, to save bandwidth', 'Near the destination, because it matches source IP only', 'On the VTY lines only', 'Anywhere, placement does not matter'],
          answer: 1,
          explain: 'A standard ACL matches source only, so placing it near the source could block too much. Place near the destination.'
        },
        {
          type: 'mcq',
          stem: 'In a wildcard mask, what does a 0 bit mean?',
          choices: ['Ignore this bit', 'Must match exactly', 'Permit', 'Deny'],
          answer: 1,
          explain: 'Wildcard: 0 = must match, 1 = ignore. It is the inverse of a subnet mask.'
        },
        {
          type: 'mcq',
          stem: 'An ACL has permit statements but a packet still gets dropped even though it matched none of them. Why?',
          choices: ['ACLs are bottom-up', 'There is an implicit deny any at the end', 'The ACL is disabled', 'Wildcard masks block it'],
          answer: 1,
          explain: 'Every ACL ends with an invisible implicit deny any. Traffic matching no permit is dropped.'
        }
      ],
      config: {
        type: 'config',
        stem: 'Restrict VTY access to only host 192.168.1.5 using a numbered standard ACL 10, applied to the VTY lines.',
        lines: [
          'access-list 10 permit host 192.168.1.5',
          'line vty 0 4',
          'access-class 10 in'
        ],
        show: 'show access-lists',
        hint: 'VTY lines use access-class (not ip access-group). There is an implicit deny any at the end.'
      },
      sequence: {
        type: 'sequence',
        stem: 'A router checks an ACL. Order the matching behavior.',
        steps: [
          'Evaluate entries top-down',
          'Stop at the first match and apply its action',
          'If no entry matched, apply the implicit deny any'
        ]
      },
      topology: {
        type: 'topology',
        stem: 'A standard ACL must block PC-A from reaching the Server LAN. On which router interface (and direction) should it go?',
        svg: '<svg viewBox="0 0 320 150" role="img" aria-label="PC behind R1, server behind R2"><g font-family="JetBrains Mono, monospace" font-size="11" fill="#1C1917"><rect x="10" y="60" width="50" height="22" rx="3" fill="#F0FDF4" stroke="#16A34A"/><text x="35" y="75" text-anchor="middle" font-size="9">PC-A</text><line x1="60" y1="71" x2="100" y2="71" stroke="#57534E" stroke-width="2"/><rect x="100" y="55" width="50" height="32" rx="5" fill="#FEF3C7" stroke="#B45309"/><text x="125" y="75" text-anchor="middle">R1</text><line x1="150" y1="71" x2="190" y2="71" stroke="#57534E" stroke-width="2"/><rect x="190" y="55" width="50" height="32" rx="5" fill="#FEF3C7" stroke="#B45309"/><text x="215" y="75" text-anchor="middle">R2</text><line x1="240" y1="71" x2="280" y2="71" stroke="#57534E" stroke-width="2"/><rect x="270" y="60" width="46" height="22" rx="3" fill="#FFF7ED" stroke="#B45309"/><text x="293" y="75" text-anchor="middle" font-size="8">Server</text></g></svg>',
        choices: ['R1 inbound from PC-A', 'R2 outbound toward the Server LAN', 'R1 VTY lines', 'It does not matter'],
        answer: 1,
        explain: 'Standard ACLs match source only, so place near the destination: R2 outbound toward the Server LAN.'
      },
      applied: [
        {
          type: 'mcq',
          stem: 'Which wildcard mask matches exactly the subnet 172.16.8.0/22?',
          choices: ['0.0.0.255', '0.0.3.255', '0.0.7.255', '0.0.255.255'],
          answer: 1,
          explain: '/22 leaves 10 host bits = 0.0.3.255 wildcard (3 in the third octet covers .8 to .11).'
        },
        {
          type: 'mcq',
          stem: 'You must permit HTTP from any host to one server but deny everything else to it. Which ACL type is required?',
          choices: ['Standard (source only)', 'Extended (source, destination, protocol, port)', 'A MAC ACL', 'A time-based standard ACL'],
          answer: 1,
          explain: 'Filtering by destination and port (HTTP/80) requires an extended ACL; standard ACLs match source IP only.'
        }
      ],
      scope: [
        {
          type: 'mcq',
          stem: 'What numeric ranges identify an extended IPv4 ACL?',
          choices: ['1-99 and 1300-1999', '100-199 and 2000-2699', '200-299 only', '1-4094'],
          answer: 1,
          explain: 'Standard = 1-99 (+1300-1999). Extended = 100-199 (+2000-2699).'
        },
        {
          type: 'mcq',
          stem: 'Which command applies an ACL to filter traffic on a routed interface?',
          choices: ['access-class <n> in', 'ip access-group <n> in', 'service-policy <n>', 'switchport access <n>'],
          answer: 1,
          explain: 'ip access-group applies to interfaces; access-class applies to VTY lines.'
        }
      ]
    },

    // ════════════════════════════════════════════════════════════════
    // Pillar 9: Layer-2 security  (obj 5.7)
    // dims: concept, config, sequence, topology, applied, scope
    // ════════════════════════════════════════════════════════════════
    9: {
      concept: [
        {
          type: 'mcq',
          stem: 'Port security limits which MAC addresses can use a switch port. What is the default action on a violation?',
          choices: ['restrict', 'protect', 'shutdown (err-disable)', 'log only'],
          answer: 2,
          explain: 'The default violation mode is shutdown, which err-disables the port. restrict and protect drop offending frames without shutting the port.'
        },
        {
          type: 'mcq',
          stem: 'DHCP snooping protects against rogue DHCP servers by doing what?',
          choices: ['Encrypting DHCP', 'Trusting only specified ports for DHCP server replies', 'Blocking all DHCP', 'Assigning static IPs'],
          answer: 1,
          explain: 'DHCP snooping marks uplink ports as trusted; DHCP OFFER/ACK from untrusted (access) ports is dropped, stopping rogue servers.'
        },
        {
          type: 'mcq',
          stem: 'Dynamic ARP Inspection (DAI) relies on which table to validate ARP replies?',
          choices: ['The MAC address table', 'The DHCP snooping binding table', 'The routing table', 'The CDP neighbor table'],
          answer: 1,
          explain: 'DAI checks ARP packets against the DHCP snooping binding table (IP-to-MAC bindings), dropping spoofed ARP.'
        }
      ],
      config: {
        type: 'config',
        stem: 'On access port g0/3, enable port security, allow max 2 MACs, learn them stickily, and restrict on violation. Then verify.',
        lines: [
          'interface g0/3',
          'switchport mode access',
          'switchport port-security',
          'switchport port-security maximum 2',
          'switchport port-security mac-address sticky',
          'switchport port-security violation restrict'
        ],
        show: 'show port-security interface g0/3',
        hint: 'Port security only works on access ports. sticky learns and saves MACs dynamically.'
      },
      sequence: {
        type: 'sequence',
        stem: 'Order the steps to configure sticky port security on an access port.',
        steps: [
          'switchport mode access',
          'switchport port-security',
          'switchport port-security maximum 2',
          'switchport port-security mac-address sticky',
          'switchport port-security violation restrict'
        ]
      },
      topology: {
        type: 'topology',
        stem: 'An attacker plugs a hub into an access port with port security max 1, sending frames from a second MAC. With the default violation mode, what happens to the port?',
        svg: '<svg viewBox="0 0 320 140" role="img" aria-label="Switch access port with hub and two MACs"><g font-family="JetBrains Mono, monospace" font-size="11" fill="#1C1917"><rect x="30" y="50" width="60" height="36" rx="5" fill="#FFFFFF" stroke="#B45309"/><text x="60" y="72" text-anchor="middle">SW</text><line x1="90" y1="68" x2="150" y2="68" stroke="#57534E" stroke-width="2"/><text x="120" y="60" text-anchor="middle" font-size="8">g0/3</text><rect x="150" y="55" width="40" height="26" rx="3" fill="#FEF9C3" stroke="#CA8A04"/><text x="170" y="72" text-anchor="middle" font-size="9">Hub</text><rect x="210" y="35" width="50" height="20" rx="3" fill="#F0FDF4" stroke="#16A34A"/><text x="235" y="49" text-anchor="middle" font-size="8">MAC1</text><rect x="210" y="80" width="50" height="20" rx="3" fill="#FEE2E2" stroke="#DC2626"/><text x="235" y="94" text-anchor="middle" font-size="8">MAC2</text><line x1="190" y1="62" x2="210" y2="45" stroke="#57534E" stroke-width="1.5"/><line x1="190" y1="74" x2="210" y2="90" stroke="#57534E" stroke-width="1.5"/></g></svg>',
        choices: ['It load-balances both MACs', 'It moves to err-disabled (shut down)', 'It silently allows both', 'It becomes a trunk'],
        answer: 1,
        explain: 'Exceeding the max with the default shutdown violation mode err-disables the port, blocking the attack.'
      },
      applied: [
        {
          type: 'mcq',
          stem: 'A port shows status "err-disabled" after a security violation. How do you bring it back up?',
          choices: ['Reload the whole switch', 'shutdown then no shutdown on the interface', 'Delete the VLAN', 'Change the native VLAN'],
          answer: 1,
          explain: 'After clearing the cause, bounce the port (shutdown / no shutdown) or use errdisable recovery to re-enable it.'
        },
        {
          type: 'mcq',
          stem: 'You see double-tagged frames jumping from VLAN 1 to VLAN 20. Which mitigation stops this VLAN-hopping attack?',
          choices: ['Enable PortFast everywhere', 'Change the native VLAN to an unused one and prune VLAN 1 from trunks', 'Disable port security', 'Lower the bridge priority'],
          answer: 1,
          explain: 'Double-tagging exploits the native VLAN. Setting the native VLAN to an unused VLAN and not allowing it on trunks defeats it.'
        }
      ],
      scope: [
        {
          type: 'mcq',
          stem: 'Which port security violation mode drops offending frames but does NOT shut the port or send notifications?',
          choices: ['shutdown', 'restrict', 'protect', 'monitor'],
          answer: 2,
          explain: 'protect silently drops. restrict drops and logs/increments counters. shutdown err-disables the port.'
        },
        {
          type: 'mcq',
          stem: 'Port security can only be configured on which kind of port?',
          choices: ['Trunk ports', 'Access ports', 'Routed ports', 'EtherChannel members only'],
          answer: 1,
          explain: 'switchport port-security requires the port to be in access (or voice) mode, not dynamic/trunk.'
        }
      ]
    },

    // ════════════════════════════════════════════════════════════════
    // Pillar 10: Local device access + SSH  (obj 5.3 / 4.8)
    // dims: concept, config, sequence, applied, scope  (no topology)
    // ════════════════════════════════════════════════════════════════
    10: {
      concept: [
        {
          type: 'mcq',
          stem: 'Which command stores the privileged-mode password as a strong hash?',
          choices: ['enable password cisco', 'enable secret cisco', 'service password-encryption', 'username admin password cisco'],
          answer: 1,
          explain: 'enable secret is hashed (type 5/MD5 or stronger). enable password and service password-encryption (type 7) are weak/obfuscation only.'
        },
        {
          type: 'mcq',
          stem: 'Why is SSH preferred over Telnet for remote device management?',
          choices: ['SSH is faster', 'SSH encrypts the session; Telnet sends everything in plaintext', 'Telnet needs more CPU', 'SSH uses UDP'],
          answer: 1,
          explain: 'Telnet (TCP 23) is plaintext. SSH (TCP 22) encrypts the management session, including credentials.'
        },
        {
          type: 'mcq',
          stem: 'What must be configured so the VTY lines authenticate against locally defined usernames?',
          choices: ['login (line password)', 'login local', 'no login', 'aaa off'],
          answer: 1,
          explain: 'login local tells the VTY lines to use the local username/secret database instead of a single line password.'
        }
      ],
      config: {
        type: 'config',
        stem: 'Bring up SSHv2 end to end: set hostname R1, domain example.com, generate the RSA key, create a user, force SSHv2, and allow only SSH on the VTYs.',
        lines: [
          'hostname R1',
          'ip domain-name example.com',
          'crypto key generate rsa',
          'username admin secret CCNA2026',
          'ip ssh version 2',
          'line vty 0 4',
          'transport input ssh',
          'login local'
        ],
        show: 'show ip ssh',
        hint: 'Order: hostname -> ip domain-name -> crypto key generate rsa -> username secret -> ip ssh version 2 -> line vty -> transport input ssh -> login local.'
      },
      sequence: {
        type: 'sequence',
        stem: 'Order the steps to enable SSHv2 on a router.',
        steps: [
          'hostname R1',
          'ip domain-name example.com',
          'crypto key generate rsa',
          'username admin secret CCNA2026',
          'ip ssh version 2',
          'line vty 0 4',
          'transport input ssh',
          'login local'
        ]
      },
      applied: [
        {
          type: 'mcq',
          stem: 'crypto key generate rsa fails with "% Please define a domain-name first". What did you skip?',
          choices: ['Setting an enable secret', 'Setting hostname and ip domain-name', 'Creating a username', 'Applying an ACL to VTY'],
          answer: 1,
          explain: 'The RSA key label is hostname.domain-name, so both the hostname and ip domain-name must be set before generating the key.'
        },
        {
          type: 'mcq',
          stem: 'You want console and VTY sessions to time out after 5 minutes of inactivity. Which command on the line does this?',
          choices: ['exec-timeout 5 0', 'session-limit 5', 'timeout 300', 'absolute-timeout 5'],
          answer: 0,
          explain: 'exec-timeout 5 0 sets a 5-minute, 0-second idle timeout on the line.'
        }
      ],
      scope: [
        {
          type: 'mcq',
          stem: 'service password-encryption uses which (weak) encryption type?',
          choices: ['Type 5 (MD5)', 'Type 7 (Vigenere, reversible)', 'Type 8 (PBKDF2)', 'Type 9 (scrypt)'],
          answer: 1,
          explain: 'service password-encryption applies reversible Type 7 obfuscation, easily cracked. It is not real security.'
        },
        {
          type: 'mcq',
          stem: 'Which TCP port does SSH use?',
          choices: ['22', '23', '443', '161'],
          answer: 0,
          explain: 'SSH = TCP 22. Telnet = TCP 23. HTTPS = TCP 443.'
        }
      ]
    },

    // ════════════════════════════════════════════════════════════════
    // Pillar 11: IPv6 + EUI-64  (obj 1.8-1.9)
    // dims: concept, config, sequence, applied, scope  (no topology)
    // ════════════════════════════════════════════════════════════════
    11: {
      concept: [
        {
          type: 'mcq',
          stem: 'Which prefix identifies an IPv6 link-local address?',
          choices: ['2000::/3', 'FC00::/7', 'FE80::/10', 'FF00::/8'],
          answer: 2,
          explain: 'GUA 2000::/3, ULA FC00::/7, link-local FE80::/10, multicast FF00::/8.'
        },
        {
          type: 'mcq',
          stem: 'Which IPv6 address type is globally routable on the internet?',
          choices: ['Link-local FE80::/10', 'Unique local FC00::/7', 'Global unicast 2000::/3', 'Multicast FF00::/8'],
          answer: 2,
          explain: 'Global unicast (2000::/3) is internet-routable. ULA is private-like; link-local is on-link only.'
        },
        {
          type: 'mcq',
          stem: 'How does EUI-64 build the 64-bit interface ID from a 48-bit MAC?',
          choices: ['Appends zeros', 'Inserts FFFE in the middle and flips the 7th bit', 'Reverses the MAC', 'Hashes it with SHA-256'],
          answer: 1,
          explain: 'EUI-64 splits the MAC, inserts FFFE in the middle, and flips the 7th bit (U/L) of the first byte.'
        }
      ],
      config: {
        type: 'config',
        stem: 'Enable IPv6 routing globally and assign 2001:db8:1::1/64 to g0/0, then verify the IPv6 interface brief.',
        lines: [
          'ipv6 unicast-routing',
          'interface g0/0',
          'ipv6 address 2001:db8:1::1/64'
        ],
        show: 'show ipv6 interface brief',
        hint: 'ipv6 unicast-routing turns on IPv6 forwarding. Use ipv6 address ... eui-64 to autobuild the host portion.'
      },
      sequence: {
        type: 'sequence',
        stem: 'Order the EUI-64 steps to build the interface ID from a MAC address.',
        steps: [
          'Split the 48-bit MAC in half',
          'Insert FFFE in the middle',
          'Flip the 7th bit (U/L bit) of the first byte'
        ]
      },
      applied: [
        {
          type: 'mcq',
          stem: 'Which multicast address reaches all IPv6 routers on the link?',
          choices: ['FF02::1', 'FF02::2', 'FF02::5', 'FF02::6'],
          answer: 1,
          explain: 'FF02::1 all-nodes, FF02::2 all-routers, FF02::5 all-OSPF, FF02::6 OSPF DR.'
        },
        {
          type: 'mcq',
          stem: 'A host has only an FE80:: address and can ping its on-link neighbor but nothing beyond the router. Why?',
          choices: ['Link-local addresses are not routed off the link', 'It needs a static route', 'The MAC is invalid', 'EUI-64 failed'],
          answer: 0,
          explain: 'Link-local (FE80::/10) addresses are only valid on the local link and are never forwarded by routers.'
        }
      ],
      scope: [
        {
          type: 'mcq',
          stem: 'With SLAAC, who builds the host full IPv6 address?',
          choices: ['A DHCPv6 server', 'The host itself, using the RA prefix', 'The default gateway statically', 'The DNS server'],
          answer: 1,
          explain: 'SLAAC: the host autoconfigures using the prefix from the Router Advertisement. DHCPv6 stateful has a server assign the address.'
        },
        {
          type: 'mcq',
          stem: 'What is the compressed form of the IPv6 loopback address?',
          choices: ['::1', '::', 'FE80::1', '127.0.0.1'],
          answer: 0,
          explain: 'The IPv6 loopback is ::1. :: (all zeros) is the unspecified address.'
        }
      ]
    },

    // ════════════════════════════════════════════════════════════════
    // Pillar 12: IPv4 subnetting  (obj 1.6)
    // dims: concept, sequence, applied, scope  (no config, no topology)
    // ════════════════════════════════════════════════════════════════
    12: {
      concept: [
        {
          type: 'mcq',
          stem: 'How many usable hosts are in a /26 subnet?',
          choices: ['64', '62', '30', '126'],
          answer: 1,
          explain: 'Hosts = 2^host-bits - 2. /26 has 6 host bits = 64 - 2 = 62.'
        },
        {
          type: 'mcq',
          stem: 'Why subtract 2 from the host count in a normal subnet?',
          choices: ['For the gateway and broadcast', 'For the network address and the broadcast address', 'For DNS and DHCP', 'For the loopback and APIPA'],
          answer: 1,
          explain: 'The all-zeros host (network/subnet ID) and all-ones host (broadcast) are not assignable to devices.'
        },
        {
          type: 'mcq',
          stem: 'Which prefix is used for a point-to-point link to conserve addresses (2 usable hosts)?',
          choices: ['/24', '/28', '/30', '/32'],
          answer: 2,
          explain: 'A /30 gives 4 addresses, 2 usable, ideal for a p2p WAN link. /31 (p2p, 2 usable, no broadcast) is also used.'
        }
      ],
      sequence: {
        type: 'sequence',
        stem: 'Order these subnets from LARGEST to SMALLEST host capacity (VLSM allocation order).',
        steps: ['/24', '/26', '/28', '/30']
      },
      applied: [
        {
          type: 'mcq',
          stem: 'For 255.255.255.192, what is the magic number (block size)?',
          choices: ['32', '64', '128', '16'],
          answer: 1,
          explain: 'Magic = 256 - interesting octet = 256 - 192 = 64. Subnets are .0, .64, .128, .192.'
        },
        {
          type: 'mcq',
          stem: 'Host 192.168.1.100/26 belongs to which subnet, and what is its broadcast?',
          choices: ['Subnet .64, broadcast .127', 'Subnet .96, broadcast .127', 'Subnet .0, broadcast .63', 'Subnet .128, broadcast .191'],
          answer: 0,
          explain: '/26 block size is 64: subnets .0, .64, .128, .192. .100 falls in .64 to .127, so subnet .64, broadcast .127.'
        }
      ],
      scope: [
        {
          type: 'mcq',
          stem: 'Which mask octet value corresponds to /27 in the affected octet?',
          choices: ['192', '224', '240', '248'],
          answer: 1,
          explain: 'Mask octets: 128,192,224,240,248,252,254,255. /27 = 255.255.255.224.'
        },
        {
          type: 'mcq',
          stem: 'What does VLSM let you do that classful subnetting does not?',
          choices: ['Use IPv6', 'Use different subnet mask lengths within one network to fit each segment', 'Route faster', 'Skip the broadcast address'],
          answer: 1,
          explain: 'VLSM (variable length subnet masking) sizes each subnet to its host need, avoiding wasted addresses.'
        }
      ]
    },

    // ════════════════════════════════════════════════════════════════
    // P2 pillars (13-20): concept + scope placeholders only (Phase 2)
    // Existing authored items retained where present.
    // ════════════════════════════════════════════════════════════════

    // ── Pillar 13: TCP vs UDP + ports ─────────────────────────────
    13: {
      concept: {
        type: 'mcq',
        stem: 'Which protocol provides reliable, ordered delivery using a three-way handshake?',
        choices: ['UDP', 'TCP', 'ICMP', 'ARP'],
        answer: 1,
        explain: 'TCP is connection-oriented (SYN, SYN-ACK, ACK). UDP is connectionless and best-effort.'
      },
      scope: {
        type: 'mcq',
        stem: 'Which transport/port pair is correct?',
        choices: ['SSH = UDP 22', 'Telnet = TCP 23', 'SNMP = TCP 161', 'TFTP = TCP 69'],
        answer: 1,
        explain: 'SSH 22 TCP, Telnet 23 TCP, SNMP 161/162 UDP, TFTP 69 UDP.'
      }
    },

    // ── Pillar 16: SSH remote access ──────────────────────────────
    16: {
      concept: {
        type: 'mcq',
        stem: 'Before you can generate the RSA crypto key for SSH, what two things must already be set?',
        choices: ['A banner and a MOTD', 'A hostname and a domain name', 'An ACL and a VTY password', 'NTP and a clock'],
        answer: 1,
        explain: 'The RSA key label is derived from hostname + domain name, so both must be set first.'
      },
      config: {
        type: 'config',
        stem: 'Bring up SSHv2: set the domain name example.com, generate a 1024-bit RSA key, force version 2, then verify SSH.',
        lines: [
          'ip domain-name example.com',
          'crypto key generate rsa',
          'ip ssh version 2'
        ],
        show: 'show ip ssh',
        hint: 'Order matters: hostname -> ip domain-name -> crypto key generate rsa -> ip ssh version 2.'
      },
      scope: {
        type: 'mcq',
        stem: 'On the VTY lines, which command restricts logins to SSH only?',
        choices: ['transport input telnet', 'transport input ssh', 'login local', 'access-class ssh in'],
        answer: 1,
        explain: 'transport input ssh permits only SSH on the VTY lines; login local authenticates against local usernames.'
      }
    },

    // ── Pillar 17: DHCP client + relay ────────────────────────────
    17: {
      concept: {
        type: 'mcq',
        stem: 'What is the correct DHCP lease message order?',
        choices: ['Offer, Discover, Request, Ack', 'Discover, Offer, Request, Ack', 'Request, Offer, Discover, Ack', 'Discover, Request, Offer, Ack'],
        answer: 1,
        explain: 'DORA: Discover (client), Offer (server), Request (client), Acknowledge (server).'
      },
      sequence: {
        type: 'sequence',
        stem: 'Order the DHCP DORA exchange.',
        steps: ['Discover', 'Offer', 'Request', 'Acknowledge']
      },
      scope: {
        type: 'mcq',
        stem: 'A client and DHCP server are on different subnets. What forwards the broadcast?',
        choices: ['ip helper-address on the client interface', 'A static route', 'A trunk port', 'PAT overload'],
        answer: 0,
        explain: 'ip helper-address on the router interface relays DHCP broadcasts as unicast to the server across subnets.'
      }
    },

    // ── Pillar 21: Cable / interface issues ───────────────────────
    21: {
      concept: {
        type: 'mcq',
        stem: 'An interface shows many late collisions and the link is slow. What is the most likely cause?',
        choices: ['Speed mismatch', 'Duplex mismatch', 'Bad DNS', 'Wrong VLAN'],
        answer: 1,
        explain: 'Duplex mismatch (one full, one half) produces late collisions and a sluggish link. Speed mismatch usually drops the link entirely.'
      },
      scope: {
        type: 'mcq',
        stem: 'Rising CRC and input errors on show interfaces usually point to what?',
        choices: ['A routing loop', 'A physical/cabling or interference problem', 'An ACL misconfig', 'A DHCP scope exhaustion'],
        answer: 1,
        explain: 'CRC/input errors indicate corrupted frames, typically bad cabling, EMI, or a failing transceiver.'
      }
    },

    // ── Pillar 22: Private IPv4 (RFC 1918) ────────────────────────
    22: {
      concept: {
        type: 'mcq',
        stem: 'A host shows 169.254.10.7 with no gateway. What happened?',
        choices: ['It got a public IP', 'DHCP failed, so it self-assigned APIPA', 'It is using a /8 private block', 'It is multicast'],
        answer: 1,
        explain: 'APIPA 169.254.0.0/16 is auto-assigned when DHCP fails. The host has only link-local IPv4 connectivity.'
      },
      scope: {
        type: 'mcq',
        stem: 'Which is a valid RFC 1918 private range?',
        choices: ['172.32.0.0/12', '192.169.0.0/16', '10.0.0.0/8', '169.254.0.0/16'],
        answer: 2,
        explain: 'Private: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. 169.254/16 is APIPA, not RFC 1918.'
      }
    },

    // ── Pillar 24: CDP / LLDP ─────────────────────────────────────
    24: {
      concept: {
        type: 'mcq',
        stem: 'Which discovery protocol is the open standard, and what are its timers?',
        choices: ['CDP, 60s/180s', 'LLDP, 30s/120s', 'CDP, 30s/120s', 'LLDP, 60s/180s'],
        answer: 1,
        explain: 'CDP (Cisco) 60s timer / 180s hold. LLDP (open standard) 30s timer / 120s hold.'
      },
      scope: {
        type: 'mcq',
        stem: 'What do CDP and LLDP both discover?',
        choices: ['Routes across the internet', 'Directly connected neighbors', 'DHCP scopes', 'Spanning-tree root bridges'],
        answer: 1,
        explain: 'Both are layer-2 link-local protocols that find DIRECTLY connected neighbors only.'
      }
    },

    // ── Pillar 26: Device mgmt access methods ─────────────────────
    26: {
      concept: {
        type: 'mcq',
        stem: 'Which access method sends credentials in plaintext and should be avoided?',
        choices: ['SSH', 'Telnet', 'HTTPS', 'SSHv2'],
        answer: 1,
        explain: 'Telnet is plaintext. Use SSH (preferably v2) for encrypted management access.'
      },
      scope: {
        type: 'mcq',
        stem: 'Which statement about TACACS+ vs RADIUS is correct?',
        choices: ['RADIUS uses TCP 49 and is Cisco', 'TACACS+ uses TCP 49 and separates AAA', 'TACACS+ uses UDP 1812 and merges AAA', 'RADIUS encrypts the entire packet'],
        answer: 1,
        explain: 'TACACS+ = Cisco, TCP 49, separates AAA, encrypts whole payload. RADIUS = open, UDP 1812/1813, merges authN+authZ, encrypts only the password.'
      }
    },

    // ── Pillar 27: NTP ────────────────────────────────────────────
    27: {
      concept: {
        type: 'mcq',
        stem: 'On NTP, what does a lower stratum number indicate?',
        choices: ['A less accurate clock', 'Closer to the authoritative time source', 'A higher port number', 'More hops away'],
        answer: 1,
        explain: 'Stratum 1-15; lower is closer to the reference clock (more accurate). Stratum 1 is directly attached to a reference.'
      },
      scope: {
        type: 'mcq',
        stem: 'Which command points a device at an upstream time source as a client?',
        choices: ['ntp master', 'ntp server <ip>', 'clock set', 'ntp peer-group'],
        answer: 1,
        explain: 'ntp server <ip> makes the device a client of that source. ntp master makes the device itself the source.'
      }
    },

    // ── Pillar 29: SNMP ───────────────────────────────────────────
    29: {
      concept: {
        type: 'mcq',
        stem: 'Which SNMP version is encrypted and authenticated?',
        choices: ['v1', 'v2c', 'v3', 'All versions'],
        answer: 2,
        explain: 'v1/v2c use plaintext community strings. v3 adds authentication and encryption.'
      },
      scope: {
        type: 'mcq',
        stem: 'What UDP ports does SNMP use?',
        choices: ['161 poll, 162 notify', '514 poll, 515 notify', '123 poll, 124 notify', '69 poll, 70 notify'],
        answer: 0,
        explain: 'SNMP 161 (polling/get) and 162 (traps/informs).'
      }
    },

    // ── Pillar 30: Syslog severity ────────────────────────────────
    30: {
      concept: {
        type: 'mcq',
        stem: 'In syslog, which severity is the most critical?',
        choices: ['7 Debug', '4 Warning', '0 Emergency', '5 Notice'],
        answer: 2,
        explain: 'Lower number is worse: 0 Emergency is most severe, 7 Debug is least.'
      },
      sequence: {
        type: 'sequence',
        stem: 'Order syslog severities from MOST severe (0) to LEAST severe (7).',
        steps: ['Emergency', 'Alert', 'Critical', 'Error', 'Warning', 'Notice', 'Informational', 'Debug']
      },
      scope: {
        type: 'mcq',
        stem: 'Which severity level number is "Error"?',
        choices: ['2', '3', '4', '5'],
        answer: 1,
        explain: '0 Emergency, 1 Alert, 2 Critical, 3 Error, 4 Warning, 5 Notice, 6 Info, 7 Debug.'
      }
    },

    // ── Pillar 32: AAA concepts ───────────────────────────────────
    32: {
      concept: {
        type: 'mcq',
        stem: 'Which AAA pillar answers "what are you allowed to do"?',
        choices: ['Authentication', 'Authorization', 'Accounting', 'Auditing'],
        answer: 1,
        explain: 'Authentication = who you are; Authorization = what you can do; Accounting = what you did.'
      },
      scope: {
        type: 'mcq',
        stem: 'Tracking which commands a user ran and when is which AAA function?',
        choices: ['Authentication', 'Authorization', 'Accounting', 'Encryption'],
        answer: 2,
        explain: 'Accounting records actions taken (commands, session time, data).'
      }
    },

    // ── Pillar 33: Wireless security ──────────────────────────────
    33: {
      concept: {
        type: 'mcq',
        stem: 'WPA3 personal replaces the WPA2 PSK handshake with what?',
        choices: ['TKIP', 'WEP', 'SAE', 'CCMP only'],
        answer: 2,
        explain: 'WPA3 uses SAE (Simultaneous Authentication of Equals), resistant to offline dictionary attacks.'
      },
      scope: {
        type: 'mcq',
        stem: 'WPA2 uses which encryption cipher?',
        choices: ['RC4', 'AES/CCMP', 'DES', '3DES'],
        answer: 1,
        explain: 'WPA2 = AES/CCMP. WEP/WPA (TKIP/RC4) are legacy and broken.'
      }
    },

    // ── Pillar 43: REST APIs ──────────────────────────────────────
    43: {
      concept: {
        type: 'mcq',
        stem: 'Which HTTP method maps to CRUD "create"?',
        choices: ['GET', 'POST', 'PUT', 'DELETE'],
        answer: 1,
        explain: 'CRUD: POST create, GET read, PUT update, DELETE delete. REST is stateless over HTTP.'
      },
      scope: {
        type: 'mcq',
        stem: 'REST API payloads are most commonly formatted as what?',
        choices: ['CSV', 'JSON', 'YAML', 'XML only'],
        answer: 1,
        explain: 'REST commonly uses JSON payloads, is stateless, and runs over HTTP/HTTPS.'
      }
    },

    // ── Pillar 44: Ansible / Terraform ────────────────────────────
    44: {
      concept: {
        type: 'mcq',
        stem: 'Which tool is agentless, uses a push model, and is written in YAML playbooks?',
        choices: ['Terraform', 'Ansible', 'Puppet', 'Chef'],
        answer: 1,
        explain: 'Ansible: agentless, push, YAML. Terraform: declarative infrastructure as code.'
      },
      scope: {
        type: 'mcq',
        stem: 'Terraform is best described as what?',
        choices: ['An agent-based pull config tool', 'Declarative infrastructure as code', 'A packet analyzer', 'A routing protocol'],
        answer: 1,
        explain: 'Terraform declares desired infrastructure state and provisions it; it is declarative IaC.'
      }
    }

  };

  window.PILLAR_CHECKS = PILLAR_CHECKS;
})();
