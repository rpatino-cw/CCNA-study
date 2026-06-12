/* ══════════════════════════════════════════════════════════════════════
   pillar-checks.js  CHECK-DRILL items for the Study ROI page (pillar-value.html)
   window.PILLAR_CHECKS[pillarNumber][dim] = item (or array of items).
   The examination is the sole judge: passing a dim's drill sets that dim true.

   Item shapes by dim/engine:
     concept | applied | scope  -> MCQ
        { type:'mcq', stem, choices:[...], answer:<index>, explain }
     config -> see per-item type field
   ══════════════════════════════════════════════════════════════════════ */
(function () {
  var PILLAR_CHECKS = {
  "1": {
    "concept": [
      {
        "type": "mcq",
        "stem": "Which four parameters must match for two routers to form an OSPF adjacency (the TASA set)?",
        "choices": [
          "Timers, Area, Subnet, Authentication",
          "Type, Address, Speed, Auth",
          "Topology, Area, Stratum, AD",
          "Timers, AD, Subnet, ABR"
        ],
        "answer": 0,
        "explain": "TASA: Timers (hello/dead), Area ID, Subnet/mask on the link, and Authentication must all match. Network type and MTU must also agree. Process ID does NOT need to match."
      },
      {
        "type": "mcq",
        "stem": "How does a router choose its OSPF Router ID when no router-id is configured?",
        "choices": [
          "Lowest physical interface IP",
          "Highest loopback IP, else highest active physical IP",
          "The process ID",
          "The MAC address of g0/0"
        ],
        "answer": 1,
        "explain": "RID order: manually configured router-id, then highest loopback IP, then highest active physical interface IP."
      },
      {
        "type": "mcq",
        "stem": "Why does OSPF elect a DR and BDR on a broadcast (Ethernet) segment?",
        "choices": [
          "To load-balance traffic across the segment",
          "To reduce the number of full adjacencies and limit LSA flooding",
          "To encrypt OSPF Hellos",
          "To assign IP addresses to neighbors"
        ],
        "answer": 1,
        "explain": "Without a DR, every router would form a full adjacency with every other router on the segment. The DR centralizes LSA flooding so each router only fully adjoins the DR and BDR."
      },
      {
        "type": "mcq",
        "stem": "Does the OSPF process ID have to match between two routers for them to become neighbors?",
        "choices": [
          "Yes, the process IDs must be identical",
          "No, the process ID is locally significant only",
          "Only on broadcast networks",
          "Only when authentication is used"
        ],
        "answer": 1,
        "explain": "The process ID in 'router ospf <n>' is local to the router. A router using process 1 and a peer using process 10 still form full adjacency as long as area, timers, subnet, and auth match."
      },
      {
        "type": "mcq",
        "stem": "Two OSPF neighbors are stuck in INIT and never reach 2-WAY. What does this indicate?",
        "choices": [
          "Hellos are flowing only one direction",
          "An MTU mismatch",
          "Mismatched OSPF process IDs",
          "Different OSPF cost values"
        ],
        "answer": 0,
        "explain": "INIT means a router received a Hello but does not yet see its own RID in the neighbor's Hello. One-way Hellos (an ACL or interface problem in one direction) keep the pair stuck in INIT."
      },
      {
        "type": "mcq",
        "stem": "Two OSPF neighbors are stuck in EXSTART/EXCHANGE. What is the most likely cause?",
        "choices": [
          "Mismatched hello/dead timers",
          "MTU mismatch on the link",
          "Different process IDs",
          "Mismatched router priorities"
        ],
        "answer": 1,
        "explain": "Timer, area, subnet, or auth mismatches block adjacency earlier (stuck in INIT or 2-WAY). An MTU mismatch stalls at Exstart/Exchange during the DBD exchange. This is the niche trap, demoted to last."
      }
    ],
    "config": [
      {
        "type": "config",
        "stem": "Enable OSPF process 1, advertise the 10.0.0.0/24 network in area 0 using the network command, then verify the adjacency.",
        "lines": [
          "router ospf 1",
          "network 10.0.0.0 0.0.0.255 area 0"
        ],
        "show": "show ip ospf neighbor",
        "hint": "The network statement matches interfaces with an inverse (wildcard) mask, not the subnet mask. Tie the matched interfaces to the correct area."
      },
      {
        "type": "config",
        "stem": "On GigabitEthernet0/0, enable OSPF process 1 in area 0 using the interface method (no network command), then verify which interfaces are running OSPF.",
        "lines": [
          "interface GigabitEthernet0/0",
          "ip ospf 1 area 0"
        ],
        "show": "show ip ospf interface brief",
        "hint": "Activate OSPF directly on the interface so no wildcard math is needed. The area is declared right on the interface."
      },
      {
        "type": "config",
        "stem": "Set a stable manual Router ID of 1.1.1.1 on OSPF process 1 and make it take effect immediately, then verify the process.",
        "lines": [
          "router ospf 1",
          "router-id 1.1.1.1",
          "do clear ip ospf process"
        ],
        "show": "show ip ospf",
        "hint": "A manually set identifier always wins over loopback or physical addresses, but a change does not apply until the process is reset."
      },
      {
        "type": "config",
        "stem": "Change the OSPF reference bandwidth to 10 Gbps so Gigabit and 10-Gig links get distinct costs, then verify the resulting interface cost.",
        "lines": [
          "router ospf 1",
          "auto-cost reference-bandwidth 10000"
        ],
        "show": "show ip ospf interface GigabitEthernet0/0",
        "hint": "Raise the divisor so faster links no longer collapse to the same cost. Apply the same value on every router in the domain."
      },
      {
        "type": "config",
        "stem": "Make all OSPF interfaces stop sending Hellos by default, then re-enable Hellos only on the uplink GigabitEthernet0/0, then verify.",
        "lines": [
          "router ospf 1",
          "passive-interface default",
          "no passive-interface GigabitEthernet0/0"
        ],
        "show": "show ip ospf interface brief",
        "hint": "Silence Hellos everywhere first as the secure default, then carve out the one link that actually has a neighbor. The networks stay advertised either way."
      },
      {
        "type": "config",
        "stem": "On the edge router, advertise a default route into OSPF so internal routers can reach the internet, then verify it is being originated.",
        "lines": [
          "router ospf 1",
          "default-information originate"
        ],
        "show": "show ip ospf database",
        "hint": "Tell OSPF to push the gateway of last resort to its neighbors. A real default must already exist in this router's table unless you force it."
      }
    ],
    "sequence": [
      {
        "type": "sequence",
        "stem": "Order the OSPF neighbor states from first contact to full adjacency.",
        "steps": [
          "Down",
          "Init",
          "2-Way",
          "Exstart",
          "Exchange",
          "Loading",
          "Full"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the steps to configure single-area OSPF with a stable Router ID using the interface method.",
        "steps": [
          "router ospf 1",
          "router-id 1.1.1.1",
          "interface GigabitEthernet0/0",
          "ip ospf 1 area 0",
          "show ip ospf neighbor"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the OSPF DR/BDR election logic from first criterion applied to last fallback.",
        "steps": [
          "Exclude any router with priority 0",
          "Highest OSPF priority wins",
          "If priorities tie, highest Router ID wins",
          "Existing DR is not preempted"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the troubleshooting steps to confirm two routers reach a full adjacency after fixing a one-way Hello problem.",
        "steps": [
          "Verify Hellos are received in both directions",
          "Confirm area, timers, subnet, and auth match",
          "Watch the state advance past 2-Way",
          "Watch the database exchange complete",
          "Confirm the neighbor reaches FULL"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the steps to inject a default route into OSPF from the internet edge router.",
        "steps": [
          "ip route 0.0.0.0 0.0.0.0 <next-hop>",
          "router ospf 1",
          "default-information originate",
          "show ip ospf database on the edge",
          "show ip route ospf on an internal router shows the external default"
        ]
      }
    ],
    "topology": [
      {
        "type": "topology",
        "stem": "On this multi-access segment all router priorities are default (1). RIDs are shown. Which router becomes the DR?",
        "svg": "<svg viewBox=\"0 0 320 170\" role=\"img\" aria-label=\"Three routers on a shared Ethernet segment with router IDs\"><line x1=\"40\" y1=\"120\" x2=\"280\" y2=\"120\" stroke=\"#57534E\" stroke-width=\"3\"/><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"20\" y=\"30\" width=\"60\" height=\"34\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"50\" y=\"50\" text-anchor=\"middle\">R1</text><text x=\"50\" y=\"62\" text-anchor=\"middle\" font-size=\"9\">1.1.1.1</text><line x1=\"50\" y1=\"64\" x2=\"50\" y2=\"120\" stroke=\"#57534E\" stroke-width=\"2\"/><rect x=\"130\" y=\"30\" width=\"60\" height=\"34\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"160\" y=\"50\" text-anchor=\"middle\">R2</text><text x=\"160\" y=\"62\" text-anchor=\"middle\" font-size=\"9\">2.2.2.2</text><line x1=\"160\" y1=\"64\" x2=\"160\" y2=\"120\" stroke=\"#57534E\" stroke-width=\"2\"/><rect x=\"240\" y=\"30\" width=\"60\" height=\"34\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"270\" y=\"50\" text-anchor=\"middle\">R3</text><text x=\"270\" y=\"62\" text-anchor=\"middle\" font-size=\"9\">3.3.3.3</text><line x1=\"270\" y1=\"64\" x2=\"270\" y2=\"120\" stroke=\"#57534E\" stroke-width=\"2\"/></g></svg>",
        "choices": [
          "R1 (1.1.1.1)",
          "R2 (2.2.2.2)",
          "R3 (3.3.3.3)",
          "No DR is elected"
        ],
        "answer": 2,
        "explain": "Priorities tie at 1, so the highest Router ID wins the DR election. 3.3.3.3 is highest, so R3 is the DR."
      },
      {
        "type": "topology",
        "stem": "R1 and R2 connect over a serial point-to-point link running OSPF. Which router is elected DR on this link?",
        "svg": "<svg viewBox=\"0 0 320 120\" role=\"img\" aria-label=\"Two routers on a point-to-point serial link\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"30\" y=\"40\" width=\"60\" height=\"36\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"60\" y=\"62\" text-anchor=\"middle\">R1</text><rect x=\"230\" y=\"40\" width=\"60\" height=\"36\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"260\" y=\"62\" text-anchor=\"middle\">R2</text><line x1=\"90\" y1=\"58\" x2=\"230\" y2=\"58\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"160\" y=\"50\" text-anchor=\"middle\" font-size=\"9\">point-to-point</text></g></svg>",
        "choices": [
          "R1, by lower RID",
          "R2, by higher RID",
          "No DR/BDR is elected on point-to-point",
          "Both become DR"
        ],
        "answer": 2,
        "explain": "Point-to-point links have only two routers, so OSPF skips DR/BDR election entirely. Both routers form a full adjacency directly. Broadcast networks elect a DR/BDR; point-to-point networks do not."
      },
      {
        "type": "topology",
        "stem": "On this broadcast segment, R2 has priority 100 and the others are default (1). RIDs are shown. Which router becomes DR?",
        "svg": "<svg viewBox=\"0 0 320 170\" role=\"img\" aria-label=\"Three routers on Ethernet, R2 has higher priority\"><line x1=\"40\" y1=\"120\" x2=\"280\" y2=\"120\" stroke=\"#57534E\" stroke-width=\"3\"/><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"20\" y=\"30\" width=\"60\" height=\"40\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"50\" y=\"48\" text-anchor=\"middle\">R1</text><text x=\"50\" y=\"60\" text-anchor=\"middle\" font-size=\"9\">9.9.9.9 pri1</text><line x1=\"50\" y1=\"70\" x2=\"50\" y2=\"120\" stroke=\"#57534E\" stroke-width=\"2\"/><rect x=\"130\" y=\"30\" width=\"60\" height=\"40\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"160\" y=\"48\" text-anchor=\"middle\">R2</text><text x=\"160\" y=\"60\" text-anchor=\"middle\" font-size=\"9\">2.2.2.2 pri100</text><line x1=\"160\" y1=\"70\" x2=\"160\" y2=\"120\" stroke=\"#57534E\" stroke-width=\"2\"/><rect x=\"240\" y=\"30\" width=\"60\" height=\"40\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"270\" y=\"48\" text-anchor=\"middle\">R3</text><text x=\"270\" y=\"60\" text-anchor=\"middle\" font-size=\"9\">3.3.3.3 pri1</text><line x1=\"270\" y1=\"70\" x2=\"270\" y2=\"120\" stroke=\"#57534E\" stroke-width=\"2\"/></g></svg>",
        "choices": [
          "R1 (9.9.9.9, highest RID)",
          "R2 (priority 100)",
          "R3 (3.3.3.3)",
          "No DR, priorities differ"
        ],
        "answer": 1,
        "explain": "Priority is checked before Router ID. R2's priority 100 beats the default 1 on the others, so R2 is DR even though R1 has the highest RID."
      },
      {
        "type": "topology",
        "stem": "On this segment R3 is the elected DR. R1 (priority 1) and R2 (priority 1) are DROthers. What adjacency state do R1 and R2 hold with each other?",
        "svg": "<svg viewBox=\"0 0 320 170\" role=\"img\" aria-label=\"Three routers, R3 is DR, R1 and R2 are DROthers\"><line x1=\"40\" y1=\"120\" x2=\"280\" y2=\"120\" stroke=\"#57534E\" stroke-width=\"3\"/><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"20\" y=\"30\" width=\"60\" height=\"40\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"50\" y=\"48\" text-anchor=\"middle\">R1</text><text x=\"50\" y=\"60\" text-anchor=\"middle\" font-size=\"9\">DROther</text><line x1=\"50\" y1=\"70\" x2=\"50\" y2=\"120\" stroke=\"#57534E\" stroke-width=\"2\"/><rect x=\"130\" y=\"30\" width=\"60\" height=\"40\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"160\" y=\"48\" text-anchor=\"middle\">R2</text><text x=\"160\" y=\"60\" text-anchor=\"middle\" font-size=\"9\">DROther</text><line x1=\"160\" y1=\"70\" x2=\"160\" y2=\"120\" stroke=\"#57534E\" stroke-width=\"2\"/><rect x=\"240\" y=\"30\" width=\"60\" height=\"40\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"270\" y=\"48\" text-anchor=\"middle\">R3</text><text x=\"270\" y=\"60\" text-anchor=\"middle\" font-size=\"9\">DR</text><line x1=\"270\" y1=\"70\" x2=\"270\" y2=\"120\" stroke=\"#57534E\" stroke-width=\"2\"/></g></svg>",
        "choices": [
          "FULL with each other",
          "2-WAY with each other",
          "EXSTART with each other",
          "DOWN with each other"
        ],
        "answer": 1,
        "explain": "DROthers only form FULL adjacencies with the DR and BDR. With each other they stay in 2-WAY, which is normal and healthy, not a fault."
      },
      {
        "type": "topology",
        "stem": "All links are GigabitEthernet running OSPF with the DEFAULT reference bandwidth. R1 reaches 10.5.5.0/24 either directly over one Gig link or through R2 over two Gig links. Which path does R1 install?",
        "svg": "<svg viewBox=\"0 0 320 160\" role=\"img\" aria-label=\"R1 to destination directly or via R2 over two links\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"20\" y=\"60\" width=\"56\" height=\"34\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"48\" y=\"81\" text-anchor=\"middle\">R1</text><rect x=\"132\" y=\"10\" width=\"56\" height=\"34\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"160\" y=\"31\" text-anchor=\"middle\">R2</text><rect x=\"244\" y=\"60\" width=\"66\" height=\"34\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"277\" y=\"81\" text-anchor=\"middle\" font-size=\"9\">10.5.5.0</text><line x1=\"76\" y1=\"72\" x2=\"244\" y2=\"72\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"160\" y=\"90\" text-anchor=\"middle\" font-size=\"9\">1 Gig hop</text><line x1=\"60\" y1=\"60\" x2=\"140\" y2=\"30\" stroke=\"#B45309\" stroke-width=\"2\"/><line x1=\"180\" y1=\"30\" x2=\"260\" y2=\"60\" stroke=\"#B45309\" stroke-width=\"2\"/><text x=\"160\" y=\"55\" text-anchor=\"middle\" font-size=\"9\" fill=\"#B45309\">via R2 two hops</text></g></svg>",
        "choices": [
          "The direct one-hop Gig path",
          "The two-hop path via R2",
          "Both, equal cost",
          "Neither, costs are identical"
        ],
        "answer": 0,
        "explain": "With the default 100 Mbps reference, every Gig link rounds to the minimum cost of 1. The direct path totals one link of cost; the via-R2 path totals two. OSPF installs the lower total cost, the direct path."
      }
    ],
    "applied": [
      {
        "type": "mcq",
        "stem": "A router runs 'auto-cost reference-bandwidth 10000' and the interface in question is a 100 Mbps FastEthernet link. What OSPF cost does that interface get?",
        "choices": [
          "1",
          "10",
          "100",
          "1000"
        ],
        "answer": 2,
        "explain": "Cost = reference bandwidth / interface bandwidth using matching units. 10000 Mbps / 100 Mbps = 100. Raising the reference to 10 Gig gives a 100 Mbps link a cost of 100, a Gig link a cost of 10, and a 10-Gig link a cost of 1."
      },
      {
        "type": "mcq",
        "stem": "A 1 Gbps interface runs OSPF with the DEFAULT reference bandwidth. What is its OSPF cost?",
        "choices": [
          "1",
          "10",
          "100",
          "64"
        ],
        "answer": 0,
        "explain": "Cost = reference BW (100 Mbps) / interface BW. 100 Mbps / 1000 Mbps rounds up to the minimum cost of 1. This is why the default reference collapses all Gig+ links to the same cost."
      },
      {
        "type": "mcq",
        "stem": "Two GigabitEthernet links should have distinct OSPF costs, but both show cost 1. What single change fixes this domain-wide?",
        "choices": [
          "Set 'ip ospf priority 100' on each interface",
          "Raise the reference bandwidth with 'auto-cost reference-bandwidth 10000' on all routers",
          "Lower the hello interval",
          "Configure 'passive-interface default'"
        ],
        "answer": 1,
        "explain": "The default 100 Mbps reference makes all Gig+ links round to cost 1. Raising the reference to 10000 (10 Gbps) on every router gives Gig cost 10 and 10-Gig cost 1. The value must match domain-wide."
      },
      {
        "type": "mcq",
        "stem": "You want a router to NEVER become DR or BDR on a segment. What do you set on its interface?",
        "choices": [
          "ip ospf priority 0",
          "ip ospf priority 255",
          "ip ospf cost 65535",
          "passive-interface"
        ],
        "answer": 0,
        "explain": "Priority 0 removes a router from DR/BDR elections. Higher priority wins; 0 means never eligible."
      },
      {
        "type": "mcq",
        "stem": "After you type 'passive-interface GigabitEthernet0/1' under router ospf, what happens to that interface's network?",
        "choices": [
          "It is removed from OSPF entirely",
          "It is still advertised into OSPF, but no Hellos are sent or received",
          "The interface is administratively shut down",
          "Its OSPF cost is set to infinity"
        ],
        "answer": 1,
        "explain": "Passive stops Hello exchange (no adjacency on that link) but the network stays in the LSDB and is still advertised to other OSPF routers."
      },
      {
        "type": "mcq",
        "stem": "You change a router's OSPF Router ID with 'router-id 5.5.5.5' but the old RID still shows. What must you do?",
        "choices": [
          "Reload the router",
          "Run 'clear ip ospf process'",
          "Re-enter the network command",
          "Bounce every OSPF interface"
        ],
        "answer": 1,
        "explain": "A new Router ID does not apply to a running OSPF process. 'clear ip ospf process' restarts the process so the new RID takes effect."
      }
    ],
    "scope": [
      {
        "type": "mcq",
        "stem": "What administrative distance does a Cisco router assign to OSPF routes?",
        "choices": [
          "90",
          "100",
          "110",
          "120"
        ],
        "answer": 2,
        "explain": "OSPF AD is 110. Compare: EIGRP 90, OSPF 110, RIP 120. Lower AD is preferred when prefix lengths tie."
      },
      {
        "type": "mcq",
        "stem": "What are the default OSPF hello and dead intervals on a broadcast (Ethernet) link?",
        "choices": [
          "Hello 5s / Dead 15s",
          "Hello 10s / Dead 40s",
          "Hello 30s / Dead 120s",
          "Hello 60s / Dead 180s"
        ],
        "answer": 1,
        "explain": "Default OSPF Hello is 10s and Dead is 40s (4x hello) on broadcast and point-to-point links."
      },
      {
        "type": "mcq",
        "stem": "OSPF is a link-state IGP. Which statement correctly describes its scope as a CCNA single-area protocol?",
        "choices": [
          "It is an exterior gateway protocol like BGP",
          "It is a classful distance-vector protocol",
          "It is a classless link-state IGP that builds a full topology map per area",
          "It is a path-vector protocol that exchanges full routing tables"
        ],
        "answer": 2,
        "explain": "OSPF is a classless link-state interior gateway protocol. Each router floods LSAs and runs SPF (Dijkstra) on an identical LSDB to build the topology within an area."
      },
      {
        "type": "mcq",
        "stem": "Which network type elects a DR/BDR, and which one does not?",
        "choices": [
          "Broadcast elects a DR/BDR; point-to-point does not",
          "Point-to-point elects a DR/BDR; broadcast does not",
          "Both elect a DR/BDR",
          "Neither elects a DR/BDR"
        ],
        "answer": 0,
        "explain": "OSPF broadcast network type (Ethernet) elects a DR and BDR to limit flooding. Point-to-point network type has only two routers, so no election occurs and a full adjacency forms directly."
      },
      {
        "type": "mcq",
        "stem": "An OSPF network statement must cover the 10.20.0.0/22 network. Which wildcard mask matches that prefix?",
        "choices": [
          "0.0.0.255",
          "0.0.1.255",
          "0.0.3.255",
          "0.0.7.255"
        ],
        "answer": 2,
        "explain": "The wildcard is the inverse of the subnet mask. A /22 mask is 255.255.252.0, so the wildcard is 0.0.3.255. Subtract each mask octet from 255: 255-252 = 3 in the third octet, host octet all ones."
      },
      {
        "type": "mcq",
        "stem": "Which pair of multicast addresses does OSPF use, and what is each one for?",
        "choices": [
          "224.0.0.5 = all OSPF routers, 224.0.0.6 = DR and BDR",
          "224.0.0.5 = DR and BDR, 224.0.0.6 = all OSPF routers",
          "224.0.0.9 = all OSPF routers, 224.0.0.10 = DR",
          "224.0.0.2 = all OSPF routers, 224.0.0.13 = DR"
        ],
        "answer": 0,
        "explain": "224.0.0.5 reaches all OSPF routers on a segment; 224.0.0.6 is reserved for the DR and BDR, where DROthers send their updates."
      }
    ]
  },
  "2": {
    "concept": [
      {
        "type": "mcq",
        "stem": "A packet to 10.1.1.50 matches three routes: OSPF 10.1.1.0/24, RIP 10.1.0.0/16, and a static 10.0.0.0/8. Which route forwards the packet?",
        "choices": [
          "Static /8 (lowest AD)",
          "RIP /16",
          "OSPF /24 (longest prefix)",
          "The route with lowest metric"
        ],
        "answer": 2,
        "explain": "Longest prefix match is applied first, before AD or metric. The /24 is the most specific match, so AD never enters the decision even though the static has the lowest AD."
      },
      {
        "type": "mcq",
        "stem": "Two routes to the identical /24 prefix exist: one learned by OSPF and one learned by RIP. Which is installed in the routing table?",
        "choices": [
          "RIP, fewer hops",
          "OSPF, lower administrative distance",
          "Both, load-balanced",
          "Neither, the prefixes conflict"
        ],
        "answer": 1,
        "explain": "With equal prefix length, administrative distance decides. OSPF is more trusted (lower AD) than RIP, so the OSPF route wins."
      },
      {
        "type": "mcq",
        "stem": "Administrative distance is best described as a measure of what?",
        "choices": [
          "How far a destination is in hops",
          "The trustworthiness of the route source",
          "The bandwidth of the egress link",
          "How recently the route was learned"
        ],
        "answer": 1,
        "explain": "AD ranks the believability of a routing source. Lower means more trusted. It is only compared between sources advertising the SAME prefix."
      },
      {
        "type": "mcq",
        "stem": "In a route entry, what does the next-hop field tell the router?",
        "choices": [
          "The cost to reach the destination",
          "The IP address of the next router (or exit interface) to send the packet toward",
          "The administrative distance of the source",
          "The age of the route"
        ],
        "answer": 1,
        "explain": "The next hop is where the packet goes next: the neighboring router IP, or an exit interface on directly connected and point-to-point links."
      },
      {
        "type": "mcq",
        "stem": "Metric is used to choose between multiple paths only under which condition?",
        "choices": [
          "Different prefixes from any source",
          "Same prefix learned from different protocols",
          "Same prefix, same protocol, multiple paths",
          "Whenever two static routes exist"
        ],
        "answer": 2,
        "explain": "Metric is the third and final tiebreaker. It only compares paths to the same prefix learned by the same protocol; across protocols, AD already decided."
      },
      {
        "type": "mcq",
        "stem": "What does the router do with a packet whose destination matches no routing-table entry when no gateway of last resort is set?",
        "choices": [
          "Floods it out all interfaces",
          "Drops it and may return ICMP unreachable",
          "Forwards it to the OSPF DR",
          "Queues it until a matching route appears"
        ],
        "answer": 1,
        "explain": "No match and no default route means the packet is dropped. The router may send the source an ICMP destination-unreachable message."
      }
    ],
    "sequence": [
      {
        "type": "sequence",
        "stem": "Order the route-selection decision criteria a router applies, from first to last.",
        "steps": [
          "Longest prefix match",
          "Lowest administrative distance",
          "Lowest metric"
        ]
      },
      {
        "type": "sequence",
        "stem": "A packet arrives for 172.16.5.20. Order the steps the router takes to forward it.",
        "steps": [
          "Examine destination IP of the packet",
          "Find all matching prefixes in the routing table",
          "Select the longest (most specific) matching prefix",
          "Forward toward that route's next hop or exit interface"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order these route sources from most trusted to least trusted by default administrative distance.",
        "steps": [
          "Connected (0)",
          "Static (1)",
          "EIGRP internal (90)",
          "OSPF (110)",
          "RIP (120)"
        ]
      },
      {
        "type": "sequence",
        "stem": "Two routes to the same /24 exist via OSPF and via static. Order how the router decides which to install.",
        "steps": [
          "Confirm both routes have the same prefix length",
          "Compare administrative distance of each source",
          "Install the route with the lower AD (static, AD 1)",
          "Leave the higher-AD OSPF route out of the table"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the route codes by how the router obtains the entry, from no protocol effort to dynamically learned.",
        "steps": [
          "L - local /32 for the interface IP",
          "C - connected network on an up interface",
          "S - static route entered by admin",
          "O - OSPF route learned from a neighbor"
        ]
      }
    ],
    "topology": [
      {
        "type": "topology",
        "stem": "R1 has these routes. A packet is destined for 10.1.1.50. Which entry forwards it?",
        "svg": "<svg viewBox=\"0 0 340 150\" role=\"img\" aria-label=\"Three overlapping routes of different prefix lengths\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"10\" fill=\"#1C1917\"><rect x=\"15\" y=\"18\" width=\"310\" height=\"22\" rx=\"4\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"24\" y=\"33\">S  10.0.0.0/8   via A</text><rect x=\"15\" y=\"50\" width=\"310\" height=\"22\" rx=\"4\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"24\" y=\"65\">O  10.1.0.0/16  via B</text><rect x=\"15\" y=\"82\" width=\"310\" height=\"22\" rx=\"4\" fill=\"#FEF3C7\" stroke=\"#B45309\" stroke-width=\"2\"/><text x=\"24\" y=\"97\">R  10.1.1.0/24  via C</text><text x=\"24\" y=\"126\" font-size=\"9\">packet -> 10.1.1.50</text></g></svg>",
        "choices": [
          "S 10.0.0.0/8 (lowest AD)",
          "O 10.1.0.0/16",
          "R 10.1.1.0/24 (longest prefix)",
          "All three, load-balanced"
        ],
        "answer": 2,
        "explain": "Longest prefix match wins first. The /24 is most specific and matches 10.1.1.50, so AD is never compared even though the static has the lowest AD."
      },
      {
        "type": "topology",
        "stem": "R1 learns 10.2.2.0/24 via OSPF and via a static route. Which route is installed?",
        "svg": "<svg viewBox=\"0 0 320 140\" role=\"img\" aria-label=\"Router with two equal-prefix paths to one network\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"125\" y=\"52\" width=\"70\" height=\"36\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"160\" y=\"74\" text-anchor=\"middle\">R1</text><line x1=\"125\" y1=\"62\" x2=\"42\" y2=\"30\" stroke=\"#B45309\" stroke-width=\"2\"/><text x=\"40\" y=\"22\" font-size=\"9\" fill=\"#B45309\">Static</text><line x1=\"195\" y1=\"62\" x2=\"290\" y2=\"30\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"230\" y=\"22\" font-size=\"9\">OSPF</text><text x=\"160\" y=\"122\" text-anchor=\"middle\" font-size=\"9\">dest 10.2.2.0/24 (both /24)</text></g></svg>",
        "choices": [
          "OSPF route",
          "Static route (lower AD)",
          "Both, load-balanced",
          "Neither, prefix tie"
        ],
        "answer": 1,
        "explain": "Equal prefix length, so administrative distance breaks the tie. A static route is more trusted (lower AD) than OSPF, so the static wins."
      },
      {
        "type": "topology",
        "stem": "R1 has no specific route for 8.8.8.8 but a gateway of last resort points to ISP. What happens to the packet?",
        "svg": "<svg viewBox=\"0 0 330 140\" role=\"img\" aria-label=\"Router with a default route to an ISP\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"40\" y=\"54\" width=\"66\" height=\"36\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"73\" y=\"76\" text-anchor=\"middle\">R1</text><rect x=\"230\" y=\"54\" width=\"66\" height=\"36\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"263\" y=\"76\" text-anchor=\"middle\">ISP</text><line x1=\"106\" y1=\"72\" x2=\"230\" y2=\"72\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"168\" y=\"64\" text-anchor=\"middle\" font-size=\"9\">0.0.0.0/0</text><text x=\"73\" y=\"118\" text-anchor=\"middle\" font-size=\"9\">packet -> 8.8.8.8</text></g></svg>",
        "choices": [
          "Dropped, no specific route",
          "Forwarded via the default route to ISP",
          "Flooded to all neighbors",
          "Returned to source as unreachable"
        ],
        "answer": 1,
        "explain": "0.0.0.0/0 is the catch-all. When no more specific route matches, the gateway of last resort forwards the packet toward ISP."
      },
      {
        "type": "topology",
        "stem": "R1 has two OSPF paths to 10.5.5.0/24 with identical cost. What does R1 do by default?",
        "svg": "<svg viewBox=\"0 0 320 150\" role=\"img\" aria-label=\"Router with two equal-cost OSPF paths to one network\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"30\" y=\"58\" width=\"60\" height=\"34\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"60\" y=\"79\" text-anchor=\"middle\">R1</text><rect x=\"232\" y=\"22\" width=\"60\" height=\"32\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"262\" y=\"42\" text-anchor=\"middle\">R2</text><rect x=\"232\" y=\"96\" width=\"60\" height=\"32\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"262\" y=\"116\" text-anchor=\"middle\">R3</text><line x1=\"90\" y1=\"68\" x2=\"232\" y2=\"40\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"150\" y=\"46\" font-size=\"9\">equal cost</text><line x1=\"90\" y1=\"80\" x2=\"232\" y2=\"110\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"150\" y=\"108\" font-size=\"9\">equal cost</text></g></svg>",
        "choices": [
          "Picks the lower router ID path",
          "Installs both and load-balances (ECMP)",
          "Drops one path to avoid a loop",
          "Raises the AD of one path"
        ],
        "answer": 1,
        "explain": "Equal-cost multipath: OSPF installs both equal-cost routes and load-balances traffic across them (up to 4 by default)."
      },
      {
        "type": "topology",
        "stem": "R1 learns 192.168.9.0/24 from EIGRP internal and from OSPF. Which is installed?",
        "svg": "<svg viewBox=\"0 0 320 140\" role=\"img\" aria-label=\"Router choosing between EIGRP and OSPF for one prefix\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"125\" y=\"52\" width=\"70\" height=\"36\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"160\" y=\"74\" text-anchor=\"middle\">R1</text><line x1=\"125\" y1=\"62\" x2=\"42\" y2=\"30\" stroke=\"#B45309\" stroke-width=\"2\"/><text x=\"30\" y=\"22\" font-size=\"9\" fill=\"#B45309\">EIGRP internal</text><line x1=\"195\" y1=\"62\" x2=\"290\" y2=\"30\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"230\" y=\"22\" font-size=\"9\">OSPF</text><text x=\"160\" y=\"122\" text-anchor=\"middle\" font-size=\"9\">dest 192.168.9.0/24 (both /24)</text></g></svg>",
        "choices": [
          "OSPF",
          "EIGRP internal (lower AD)",
          "Both, load-balanced",
          "Neither, prefixes conflict"
        ],
        "answer": 1,
        "explain": "Same prefix length, so lower AD wins. EIGRP internal (90) beats OSPF (110). Note that external EIGRP (170) would instead lose to OSPF."
      }
    ],
    "applied": [
      {
        "type": "mcq",
        "stem": "A route reads 'O 10.4.0.0/16 [110/65] via 10.0.0.2'. What do the two bracketed numbers mean?",
        "choices": [
          "Metric then AD",
          "AD then metric",
          "Hop count then bandwidth",
          "Process ID then cost"
        ],
        "answer": 1,
        "explain": "The bracket format is [AD/metric]. Here AD 110 (OSPF) and metric 65 (OSPF cost). via 10.0.0.2 is the next hop."
      },
      {
        "type": "mcq",
        "stem": "A connected interface comes up/up with an IP of 10.3.3.1/24. Which entries appear automatically in the routing table?",
        "choices": [
          "Only an S route for 10.3.3.0/24",
          "A C route for 10.3.3.0/24 and an L route for 10.3.3.1/32",
          "An O route for the subnet",
          "Nothing until a routing protocol runs"
        ],
        "answer": 1,
        "explain": "An up/up interface with an IP auto-installs a connected (C) route for the subnet and a local (L) /32 host route for the interface address."
      },
      {
        "type": "mcq",
        "stem": "A route entry begins with the code 'L'. What does that code represent?",
        "choices": [
          "A learned OSPF route",
          "A local /32 host route for the router's own interface IP",
          "A floating static",
          "A leaked label-switched path"
        ],
        "answer": 1,
        "explain": "L = local, the /32 host route for the router's own interface address. C marks the connected network itself."
      },
      {
        "type": "mcq",
        "stem": "A default route entry begins with 'S*' and the prefix 0.0.0.0/0. What does the asterisk indicate?",
        "choices": [
          "The route is invalid",
          "This is the candidate default route (gateway of last resort)",
          "It is load-balanced",
          "It is an OSPF external route"
        ],
        "answer": 1,
        "explain": "The asterisk marks the candidate default route. S* on the 0.0.0.0/0 prefix is a static default acting as the gateway of last resort."
      },
      {
        "type": "mcq",
        "stem": "The routing table reports 'Gateway of last resort is not set'. What is the practical effect?",
        "choices": [
          "All routing is disabled",
          "Packets matching no specific route are dropped",
          "Only static routes work",
          "OSPF will not form adjacencies"
        ],
        "answer": 1,
        "explain": "With no default route, any destination not matched by a specific entry has nowhere to go and is dropped."
      },
      {
        "type": "mcq",
        "stem": "Within OSPF, two paths to one prefix have different costs. With everything else equal, which path is installed?",
        "choices": [
          "The higher-cost path (higher = preferred)",
          "The lower-cost path (lower = preferred)",
          "Both, regardless of cost",
          "Whichever was learned first"
        ],
        "answer": 1,
        "explain": "OSPF prefers the lower cost. Since the costs differ the paths are not equal cost, so no ECMP load-balancing occurs and only the lower-cost path is installed."
      }
    ],
    "scope": [
      {
        "type": "mcq",
        "stem": "Match the default AD for connected, static, OSPF, and RIP, in that order. Which list is correct?",
        "choices": [
          "1, 0, 90, 110",
          "0, 1, 110, 120",
          "0, 1, 120, 110",
          "1, 1, 110, 120"
        ],
        "answer": 1,
        "explain": "Connected 0, Static 1, OSPF 110, RIP 120. These four are the most commonly tested AD values."
      },
      {
        "type": "mcq",
        "stem": "Two sources advertise the same prefix: EIGRP internal and OSPF. Which administrative distance values decide it, and which source wins?",
        "choices": [
          "EIGRP 90 vs OSPF 110, EIGRP wins",
          "EIGRP 110 vs OSPF 90, OSPF wins",
          "EIGRP 170 vs OSPF 110, OSPF wins",
          "Both 110, they tie"
        ],
        "answer": 0,
        "explain": "EIGRP internal AD is 90 and OSPF is 110. Lower AD is more trusted, so the EIGRP internal route wins."
      },
      {
        "type": "mcq",
        "stem": "By default, OSPF cost is calculated using which formula?",
        "choices": [
          "Interface bandwidth / 100 Mbps",
          "100 Mbps reference bandwidth / interface bandwidth",
          "Hop count times delay",
          "Delay / bandwidth"
        ],
        "answer": 1,
        "explain": "OSPF cost = reference bandwidth (default 100 Mbps) / interface bandwidth. Gigabit and faster links floor to cost 1 unless the reference is raised."
      },
      {
        "type": "mcq",
        "stem": "Which routing protocol uses hop count as its metric, capped so that one value past the cap means unreachable?",
        "choices": [
          "OSPF",
          "EIGRP",
          "RIP",
          "BGP"
        ],
        "answer": 2,
        "explain": "RIP metric is hop count, max 15. A metric of 16 is considered infinity (unreachable). OSPF uses cost; EIGRP uses a composite."
      },
      {
        "type": "mcq",
        "stem": "Which administrative distance value marks a route as unreachable so it is never installed?",
        "choices": [
          "0",
          "1",
          "120",
          "255"
        ],
        "answer": 3,
        "explain": "AD 0 = connected, 1 = static, 120 = RIP. AD 255 means the source is untrusted and the route is never installed."
      },
      {
        "type": "mcq",
        "stem": "What is the administrative distance of an external EIGRP route, and the default for eBGP?",
        "choices": [
          "External EIGRP 90, eBGP 200",
          "External EIGRP 170, eBGP 20",
          "External EIGRP 110, eBGP 110",
          "External EIGRP 200, eBGP 170"
        ],
        "answer": 1,
        "explain": "Internal EIGRP is 90 but external EIGRP is 170. eBGP is 20 (preferred over IGPs) while iBGP is 200. These are the niche AD values, less common than the core four."
      }
    ]
  },
  "3": {
    "concept": [
      {
        "type": "mcq",
        "stem": "When a packet matches multiple routes in the table, which single factor decides which entry is used to forward it?",
        "choices": [
          "The lowest administrative distance",
          "The longest prefix match",
          "The lowest metric",
          "The oldest route in the table"
        ],
        "answer": 1,
        "explain": "Longest-prefix match wins first and is the route-lookup tiebreaker. AD and metric only break ties between routes of the SAME prefix length, never across different prefix lengths."
      },
      {
        "type": "mcq",
        "stem": "What does the /0 in a default route signify about its match behavior?",
        "choices": [
          "It matches only the all-zeros address",
          "Zero network bits, so it matches every possible destination",
          "It matches only private RFC 1918 addresses",
          "It matches only multicast traffic"
        ],
        "answer": 1,
        "explain": "A /0 mask means no network bits are significant, so the route matches any destination. Because it is the shortest prefix, it loses to every more specific route."
      },
      {
        "type": "mcq",
        "stem": "What is the default administrative distance of a normal static route, and how does that compare to OSPF?",
        "choices": [
          "1, and it loses to OSPF",
          "1, and it beats OSPF",
          "110, and it ties OSPF",
          "0, same as a connected route"
        ],
        "answer": 1,
        "explain": "A static route has AD 1; OSPF is 110. Lower AD wins, so a static route is preferred over OSPF for the same prefix unless its AD is raised."
      },
      {
        "type": "mcq",
        "stem": "A next-hop static route is described as 'recursive.' What does the router have to do that makes it recursive?",
        "choices": [
          "Re-run the route every 30 seconds",
          "Look up the next-hop IP in the routing table again to find its exit interface",
          "Recompute the AD on each packet",
          "Loop the packet back to the source for confirmation"
        ],
        "answer": 1,
        "explain": "The router knows the next-hop IP but must perform a second lookup on that IP to resolve the actual outgoing interface. That second lookup is the recursion."
      },
      {
        "type": "mcq",
        "stem": "Two static routes exist for the same destination: one specifies an exit interface, one specifies a next-hop IP, both default AD. How does the router treat them?",
        "choices": [
          "The exit-interface route is discarded",
          "Both install and load-balance because AD is equal",
          "Only the next-hop route can ever be used",
          "The router rejects the second route entry"
        ],
        "answer": 1,
        "explain": "Equal-AD, equal-prefix static routes are both installed and the router load-balances across them. A common trap is assuming one silently overwrites the other."
      },
      {
        "type": "mcq",
        "stem": "You want a backup path that only installs in the routing table if the primary route fails. What do you configure?",
        "choices": [
          "A static route with a lower AD than the primary",
          "A floating static route with an AD higher than the primary's",
          "A host route with a /32 mask",
          "An OSPF default-information originate route"
        ],
        "answer": 1,
        "explain": "A floating static carries a manually raised administrative distance, so it stays out of the table until the lower-AD primary route disappears."
      }
    ],
    "config": [
      {
        "type": "config",
        "stem": "Add an IPv4 default route pointing toward next-hop 203.0.113.1, then verify only the static routes in the table.",
        "lines": [
          "ip route 0.0.0.0 0.0.0.0 203.0.113.1"
        ],
        "show": "show ip route static",
        "hint": "A default route is the catch-all: its network and mask are written in the form that matches every destination, not a specific subnet. Point it at the next-hop toward the unknown destinations."
      },
      {
        "type": "config",
        "stem": "Add a network static route so traffic for the 10.1.0.0/16 subnet is sent to next-hop 192.168.1.1, then verify static routes. Convert the prefix length to its dotted-decimal mask.",
        "lines": [
          "ip route 10.1.0.0 255.255.0.0 192.168.1.1"
        ],
        "show": "show ip route static",
        "hint": "A network route names a specific destination subnet, its subnet mask in dotted-decimal form, then the next-hop. Translate the /16 in the stem into the matching dotted-decimal mask before the next-hop IP."
      },
      {
        "type": "config",
        "stem": "Add a fully specified network static route for the 10.0.0.0/8 network that names both the outgoing interface GigabitEthernet0/1 and the next-hop 192.168.1.1, then verify. Convert the prefix length to its mask.",
        "lines": [
          "ip route 10.0.0.0 255.0.0.0 GigabitEthernet0/1 192.168.1.1"
        ],
        "show": "show ip route static",
        "hint": "A fully specified route lists the exit interface and the next-hop together, so the router skips the recursive lookup. Order is interface first, then next-hop. Convert the prefix length in the stem to its dotted-decimal mask."
      },
      {
        "type": "config",
        "stem": "Configure a backup default route through next-hop 198.51.100.1 that should only take over when the primary default route fails, then verify static routes.",
        "lines": [
          "ip route 0.0.0.0 0.0.0.0 198.51.100.1 200"
        ],
        "show": "show ip route static",
        "hint": "A backup that stays hidden until the primary dies is a floating static: keep the same destination, but make this path less trustworthy than the primary by trailing the route with a worse administrative distance value."
      },
      {
        "type": "config",
        "stem": "Enable IPv6 routing and add an IPv6 default route toward next-hop 2001:db8:2::1, then verify the IPv6 static routes.",
        "lines": [
          "ipv6 unicast-routing",
          "ipv6 route ::/0 2001:db8:2::1"
        ],
        "show": "show ipv6 route static",
        "hint": "IPv6 forwarding is off until you turn on global unicast routing first. The default route uses the IPv6 catch-all prefix (the all-destinations prefix) pointed at the next-hop."
      },
      {
        "type": "config",
        "stem": "Add a host route so that traffic to the single server 10.1.1.100 is sent to next-hop 192.168.1.1, then verify static routes.",
        "lines": [
          "ip route 10.1.1.100 255.255.255.255 192.168.1.1"
        ],
        "show": "show ip route static",
        "hint": "A host route targets exactly one address, so the mask leaves zero host bits. Write the most specific mask possible, then the next-hop toward that single host."
      }
    ],
    "sequence": [
      {
        "type": "sequence",
        "stem": "Order the route-selection decision a router makes when several routes could match a destination, from first criterion applied to last.",
        "steps": [
          "Longest prefix match",
          "Lowest administrative distance",
          "Lowest metric",
          "Install and load-balance equal-cost paths"
        ]
      },
      {
        "type": "sequence",
        "stem": "A packet to 10.1.1.50 could match a host route, a /24 network route, and a default route. Order these from MOST preferred to LEAST preferred (longest-prefix match wins).",
        "steps": [
          "Host route /32",
          "Network route /24",
          "Default route /0"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order what the router does to forward a packet using a recursive next-hop static route.",
        "steps": [
          "Match the destination against the static route",
          "Read the configured next-hop IP",
          "Recursively look up the next-hop IP in the routing table",
          "Resolve the exit interface from that lookup",
          "Forward the packet out the resolved interface"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the steps to configure and bring up a working IPv6 default static route on a router that has never run IPv6.",
        "steps": [
          "Enable ipv6 unicast-routing globally",
          "Assign IPv6 addresses to the relevant interfaces",
          "Add the ipv6 route ::/0 default static route",
          "Verify with show ipv6 route static",
          "Ping the remote destination to confirm reachability"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the configuration to add a floating static backup default route that fails over from a primary default route.",
        "steps": [
          "Configure the primary default route at default AD 1",
          "Configure the backup default route to the second next-hop with a higher AD",
          "Verify only the primary is installed with show ip route",
          "Simulate failure of the primary next-hop",
          "Confirm the floating static now appears in the table"
        ]
      }
    ],
    "topology": [
      {
        "type": "topology",
        "stem": "R1 must reach the 10.5.0.0/24 LAN behind R2 across a point-to-point WAN. What static route does R1 need?",
        "svg": "<svg viewBox=\"0 0 320 140\" role=\"img\" aria-label=\"R1 to R2 WAN link with LAN behind R2\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"20\" y=\"50\" width=\"60\" height=\"36\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"50\" y=\"72\" text-anchor=\"middle\">R1</text><line x1=\"80\" y1=\"68\" x2=\"180\" y2=\"68\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"130\" y=\"60\" text-anchor=\"middle\" font-size=\"9\">.1 WAN .2</text><rect x=\"180\" y=\"50\" width=\"60\" height=\"36\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"210\" y=\"72\" text-anchor=\"middle\">R2</text><line x1=\"240\" y1=\"68\" x2=\"300\" y2=\"68\" stroke=\"#B45309\" stroke-width=\"2\"/><text x=\"280\" y=\"110\" text-anchor=\"middle\" font-size=\"9\">10.5.0.0/24</text></g></svg>",
        "choices": [
          "ip route 10.5.0.0 255.255.255.0 pointing at the R2 WAN IP",
          "ip route 10.5.0.0 255.255.255.0 pointing at R1's own WAN IP",
          "A connected route, no static is needed",
          "ip route 0.0.0.0 0.0.0.0 pointing at R1's own IP"
        ],
        "answer": 0,
        "explain": "R1 points the 10.5.0.0/24 route at R2's WAN-side IP as the next hop. Pointing at its own IP would never forward toward R2."
      },
      {
        "type": "topology",
        "stem": "A stub branch R1 has exactly one uplink to the core via R2 and no other exits. What is the cleanest routing config on R1 for all remote networks?",
        "svg": "<svg viewBox=\"0 0 320 130\" role=\"img\" aria-label=\"Stub branch R1 single uplink to core R2\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"20\" y=\"50\" width=\"60\" height=\"34\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"50\" y=\"71\" text-anchor=\"middle\">R1</text><text x=\"50\" y=\"100\" text-anchor=\"middle\" font-size=\"9\">stub</text><line x1=\"80\" y1=\"67\" x2=\"190\" y2=\"67\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"135\" y=\"58\" text-anchor=\"middle\" font-size=\"9\">single uplink</text><rect x=\"190\" y=\"50\" width=\"60\" height=\"34\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"220\" y=\"71\" text-anchor=\"middle\">R2</text><text x=\"220\" y=\"100\" text-anchor=\"middle\" font-size=\"9\">core</text></g></svg>",
        "choices": [
          "A single default static route 0.0.0.0/0 toward R2",
          "Full OSPF area 0 with R2",
          "A host route for every remote network",
          "A floating static plus RIP"
        ],
        "answer": 0,
        "explain": "A stub with one exit only needs a default static route pointing at the upstream router. Running a dynamic protocol there is unnecessary overhead."
      },
      {
        "type": "topology",
        "stem": "R1 has a static route 10.0.0.0/8 toward next-hop 192.168.1.2 (R2's IP). The connected subnet that reaches 192.168.1.2 goes down. What happens to R1's static route to 10.0.0.0/8?",
        "svg": "<svg viewBox=\"0 0 320 130\" role=\"img\" aria-label=\"R1 to R2 link where R2 next-hop interface goes down\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"20\" y=\"48\" width=\"60\" height=\"34\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"50\" y=\"69\" text-anchor=\"middle\">R1</text><line x1=\"80\" y1=\"65\" x2=\"190\" y2=\"65\" stroke=\"#B45309\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><text x=\"135\" y=\"56\" text-anchor=\"middle\" font-size=\"9\">.1  192.168.1.0  .2 DOWN</text><rect x=\"190\" y=\"48\" width=\"60\" height=\"34\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"220\" y=\"69\" text-anchor=\"middle\">R2</text></g></svg>",
        "choices": [
          "The static route is removed from R1's table because the recursive next-hop is no longer reachable",
          "The static route stays installed and keeps black-holing traffic",
          "The AD of the static route changes to 255",
          "R1 automatically switches it to an exit-interface route"
        ],
        "answer": 0,
        "explain": "A recursive next-hop route is only installed while the next-hop resolves to a valid route. When R1 loses the connected subnet that reaches 192.168.1.2, the recursion fails and the static route is withdrawn."
      },
      {
        "type": "topology",
        "stem": "R1 reaches the same 10.9.0.0/24 LAN through R2 (primary) and R3 (backup). The backup via R3 should only be used if the R2 path fails. Which route is the floating static?",
        "svg": "<svg viewBox=\"0 0 320 170\" role=\"img\" aria-label=\"R1 with primary path via R2 and backup path via R3 to a LAN\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"20\" y=\"65\" width=\"56\" height=\"34\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"48\" y=\"86\" text-anchor=\"middle\">R1</text><line x1=\"76\" y1=\"75\" x2=\"170\" y2=\"40\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"120\" y=\"45\" text-anchor=\"middle\" font-size=\"9\">primary</text><line x1=\"76\" y1=\"90\" x2=\"170\" y2=\"125\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"120\" y=\"128\" text-anchor=\"middle\" font-size=\"9\">backup</text><rect x=\"170\" y=\"22\" width=\"56\" height=\"34\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"198\" y=\"43\" text-anchor=\"middle\">R2</text><rect x=\"170\" y=\"108\" width=\"56\" height=\"34\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"198\" y=\"129\" text-anchor=\"middle\">R3</text><line x1=\"226\" y1=\"82\" x2=\"300\" y2=\"82\" stroke=\"#B45309\" stroke-width=\"2\"/><text x=\"275\" y=\"75\" text-anchor=\"middle\" font-size=\"9\">10.9.0.0/24</text></g></svg>",
        "choices": [
          "The route via R3 with a higher AD than the route via R2",
          "The route via R2 with a higher AD than the route via R3",
          "Both routes at AD 1",
          "A default route via R3 only"
        ],
        "answer": 0,
        "explain": "The backup path via R3 gets the raised AD so it floats out of the table until the preferred R2 route is gone. Raising the primary's AD instead would invert the intended preference."
      },
      {
        "type": "topology",
        "stem": "R1 connects to a multi-access Ethernet switch shared with R2, R3, and R4. R1 needs a route to a network behind R2. Why should R1 use a next-hop static rather than an exit-interface-only static here?",
        "svg": "<svg viewBox=\"0 0 320 160\" role=\"img\" aria-label=\"R1 R2 R3 R4 connected to a shared Ethernet switch\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><line x1=\"30\" y1=\"110\" x2=\"290\" y2=\"110\" stroke=\"#57534E\" stroke-width=\"3\"/><text x=\"160\" y=\"135\" text-anchor=\"middle\" font-size=\"9\">shared Ethernet</text><rect x=\"20\" y=\"30\" width=\"48\" height=\"30\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"44\" y=\"50\" text-anchor=\"middle\">R1</text><line x1=\"44\" y1=\"60\" x2=\"44\" y2=\"110\" stroke=\"#57534E\" stroke-width=\"2\"/><rect x=\"100\" y=\"30\" width=\"48\" height=\"30\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"124\" y=\"50\" text-anchor=\"middle\">R2</text><line x1=\"124\" y1=\"60\" x2=\"124\" y2=\"110\" stroke=\"#57534E\" stroke-width=\"2\"/><rect x=\"180\" y=\"30\" width=\"48\" height=\"30\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"204\" y=\"50\" text-anchor=\"middle\">R3</text><line x1=\"204\" y1=\"60\" x2=\"204\" y2=\"110\" stroke=\"#57534E\" stroke-width=\"2\"/><rect x=\"260\" y=\"30\" width=\"48\" height=\"30\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"284\" y=\"50\" text-anchor=\"middle\">R4</text><line x1=\"284\" y1=\"60\" x2=\"284\" y2=\"110\" stroke=\"#57534E\" stroke-width=\"2\"/></g></svg>",
        "choices": [
          "Exit-interface only forces R1 to ARP for every remote destination on the shared segment, which is inefficient",
          "Exit-interface routes are unsupported on Ethernet",
          "Next-hop routes have a lower AD on Ethernet",
          "Exit-interface routes create a routing loop on Ethernet"
        ],
        "answer": 0,
        "explain": "On multi-access media an exit-interface-only route makes the router treat every destination as directly connected and ARP for each one. Naming the next-hop avoids that and points to one neighbor."
      }
    ],
    "applied": [
      {
        "type": "mcq",
        "stem": "A router has both a default route (0.0.0.0/0) and a more specific network route (172.16.0.0/16) installed. Traffic destined to 172.16.5.10 follows which route, and why?",
        "choices": [
          "The default route, because it was configured first",
          "The 172.16.0.0/16 route, because longest-prefix match wins",
          "Whichever has the lower AD",
          "It load-balances across both"
        ],
        "answer": 1,
        "explain": "Longest-prefix match is the first rule of route selection. A /16 is more specific than a /0, so the network route is used regardless of AD or configuration order."
      },
      {
        "type": "mcq",
        "stem": "A static route is configured with next-hop 10.0.0.9, but 10.0.0.9 is not reachable through any installed route. What is the route's status in the table?",
        "choices": [
          "Installed and active",
          "Not installed, because the recursive next-hop cannot be resolved",
          "Installed with AD 255",
          "Installed only for outbound traffic"
        ],
        "answer": 1,
        "explain": "A recursive static route is only installed while its next-hop resolves to a valid route. An unreachable next-hop means the recursion fails and the route does not enter the table."
      },
      {
        "type": "mcq",
        "stem": "Dual-homed edge router R1 has two ISP uplinks. You want ISP-A as primary and ISP-B as backup for the default route, with automatic failover. How do you configure it?",
        "choices": [
          "Two default routes at equal AD so they load-balance",
          "Default route to ISP-A at AD 1 and a floating default to ISP-B at a higher AD",
          "A single default route to ISP-A only",
          "Default route to ISP-B at a lower AD than ISP-A"
        ],
        "answer": 1,
        "explain": "Give ISP-A the standard AD 1 default and ISP-B a higher AD (a floating static). ISP-B stays dormant until ISP-A's path drops, giving clean primary/backup failover."
      },
      {
        "type": "mcq",
        "stem": "You configured a backup network route with a trailing AD of 200, but it never appears in the table even when the primary fails. The next-hop is reachable. What is the most likely cause?",
        "choices": [
          "The AD 200 is too low",
          "Another route to that exact prefix with a better AD is still installed, or the primary's withdrawal did not occur",
          "The mask is wrong",
          "Static routes cannot have a trailing AD value"
        ],
        "answer": 1,
        "explain": "A floating static only installs when no lower-AD route to that exact prefix exists. If the primary never truly withdrew (or another protocol still advertises it), the higher-AD route stays out of the table."
      },
      {
        "type": "mcq",
        "stem": "You add an exit-interface-only default route on a router whose interface faces a multi-access ISP segment. Connectivity is flaky and the ARP table fills up. What fix follows best practice?",
        "choices": [
          "Change it to a fully specified or next-hop default route toward the ISP gateway IP",
          "Raise the AD to 200",
          "Add a host route for the ISP",
          "Disable proxy ARP on the ISP"
        ],
        "answer": 0,
        "explain": "An exit-interface-only default on multi-access media causes proxy-ARP for every destination. Specifying the next-hop ISP gateway IP (or fully specifying interface plus next-hop) is the correct fix."
      }
    ],
    "scope": [
      {
        "type": "mcq",
        "stem": "Which prefix length identifies a host route, and which identifies a default route?",
        "choices": [
          "/24 host, /0 default",
          "/32 host, /0 default",
          "/0 host, /32 default",
          "/30 host, /8 default"
        ],
        "answer": 1,
        "explain": "A /32 leaves zero host bits and matches exactly one address (host route). A /0 matches everything (default route)."
      },
      {
        "type": "mcq",
        "stem": "For an IPv6 static default route, which prefix is the correct catch-all, and what global command must already be enabled?",
        "choices": [
          "::1/128, and ipv6 enable",
          "::/0, and ipv6 unicast-routing",
          "FE80::/10, and ipv6 cef",
          "FF00::/8, and ipv6 multicast-routing"
        ],
        "answer": 1,
        "explain": "::/0 is the IPv6 all-destinations prefix, the equivalent of 0.0.0.0/0. IPv6 forwarding requires ipv6 unicast-routing to be enabled globally first."
      },
      {
        "type": "mcq",
        "stem": "When does an installed static route disappear from the routing table?",
        "choices": [
          "After 300 seconds expire",
          "When the exit interface goes down or the recursive next-hop becomes unreachable",
          "When OSPF is enabled on the router",
          "Never, static routes are permanent once configured"
        ],
        "answer": 1,
        "explain": "Static routes are removed when the outgoing interface goes down or the recursive next-hop is no longer reachable. They are not aged out by a timer."
      },
      {
        "type": "mcq",
        "stem": "Which of these is NOT something a static route can do on its own?",
        "choices": [
          "Match a single host with a /32",
          "Serve as a catch-all default with /0",
          "Automatically reroute around a failed link without preconfiguration",
          "Act as a backup via a raised administrative distance"
        ],
        "answer": 2,
        "explain": "Static routes cannot discover alternate paths on their own. Failover only happens if you preconfigure it (for example a floating static). Automatic rerouting is the job of dynamic protocols."
      },
      {
        "type": "mcq",
        "stem": "Which scenario is the best fit for static routing rather than a dynamic protocol?",
        "choices": [
          "A large mesh of dozens of routers with frequent topology changes",
          "A stub site with a single exit toward the core",
          "A network needing automatic failure detection and reconvergence",
          "A backbone carrying full internet routes"
        ],
        "answer": 1,
        "explain": "Static routing fits small, stable, single-exit (stub) designs where a default route suffices. Large, dynamic, multi-path networks need a routing protocol for scale and convergence."
      }
    ]
  },
  "4": {
    "concept": [
      {
        "type": "mcq",
        "stem": "Which NAT type lets many private hosts share a single public IP and is the kind home routers use?",
        "choices": [
          "Static NAT (1:1)",
          "Dynamic NAT pool",
          "PAT (overload)",
          "No NAT, pure routing"
        ],
        "answer": 2,
        "explain": "PAT (overload) is the most common NAT in the real world. Many inside hosts map to one public address, with each conversation kept distinct by a unique source port."
      },
      {
        "type": "mcq",
        "stem": "What is the inside local address of an internal host?",
        "choices": [
          "Its public translated address",
          "Its real private address on the LAN",
          "The ISP gateway IP",
          "The destination server IP"
        ],
        "answer": 1,
        "explain": "Inside refers to your own host; local refers to the address before translation. So inside local is the real RFC 1918 private address the host uses on the LAN."
      },
      {
        "type": "mcq",
        "stem": "A private host 192.168.1.10 reaches the internet as 203.0.113.5. What is 203.0.113.5 called?",
        "choices": [
          "Inside local",
          "Inside global",
          "Outside local",
          "Outside global"
        ],
        "answer": 1,
        "explain": "Inside refers to the host on your network; global refers to its address after translation. The translated public address of an inside host is the inside global."
      },
      {
        "type": "mcq",
        "stem": "Which problem does NAT/PAT primarily solve?",
        "choices": [
          "Routing loops",
          "IPv4 public address exhaustion",
          "STP convergence",
          "VLAN hopping"
        ],
        "answer": 1,
        "explain": "NAT lets many private hosts share scarce public IPv4 addresses, conserving the dwindling public IPv4 space. It is a workaround for IPv4 exhaustion, not a routing or security protocol."
      },
      {
        "type": "mcq",
        "stem": "How does PAT differentiate sessions from many inside hosts that all share one public IP?",
        "choices": [
          "By destination MAC address",
          "By unique source port numbers",
          "By VLAN tag",
          "By TTL value"
        ],
        "answer": 1,
        "explain": "PAT (overload) tracks each conversation by assigning a unique source port to each translation, so many private hosts map to one public IP simultaneously without collision."
      },
      {
        "type": "mcq",
        "stem": "An inside host talks to a public server 8.8.8.8. From the inside router's perspective, 8.8.8.8 is which NAT address type?",
        "choices": [
          "Inside global",
          "Inside local",
          "Outside global",
          "Outside local"
        ],
        "answer": 2,
        "explain": "The real, registered public address of an external host is the outside global. Outside local would only differ if the outside address were also being translated, which is uncommon."
      }
    ],
    "config": [
      {
        "type": "config",
        "stem": "Configure PAT so all hosts in 192.168.1.0/24 share the outside interface g0/1 IP. Then verify the translation count.",
        "lines": [
          "access-list 1 permit 192.168.1.0 0.0.0.255",
          "ip nat inside source list 1 interface g0/1 overload"
        ],
        "show": "show ip nat statistics",
        "hint": "Select the inside sources with a standard ACL, then bind that list to the public-facing interface and enable the keyword that lets many hosts share one address."
      },
      {
        "type": "config",
        "stem": "Tag the LAN-facing interface g0/0 as the NAT inside interface, then verify active translations.",
        "lines": [
          "interface g0/0",
          "ip nat inside"
        ],
        "show": "show ip nat translations",
        "hint": "NAT must know each interface's role relative to the translation boundary. Here you mark the LAN-facing port as the trusted private side."
      },
      {
        "type": "config",
        "stem": "Tag the WAN-facing interface g0/1 as the NAT outside interface, then verify active translations.",
        "lines": [
          "interface g0/1",
          "ip nat outside"
        ],
        "show": "show ip nat translations",
        "hint": "The port that reaches the public network must be flagged as the untrusted side of the boundary, or translations are never built."
      },
      {
        "type": "config",
        "stem": "Create a permanent 1:1 mapping so internal server 192.168.1.10 is always reachable from the internet at 203.0.113.10. Then verify.",
        "lines": [
          "ip nat inside source static 192.168.1.10 203.0.113.10"
        ],
        "show": "show ip nat translations",
        "hint": "A server needing fixed inbound reachability requires a fixed, always-present mapping rather than an on-demand or shared one. Inside local first, then inside global."
      },
      {
        "type": "config",
        "stem": "After a config change, flush stale dynamic translations so you can retest cleanly, then re-read the live table.",
        "lines": [
          "clear ip nat translation *"
        ],
        "show": "show ip nat translations",
        "hint": "Stale dynamic entries can mask a fix. Flush the on-demand entries; the permanent 1:1 entries survive the flush."
      },
      {
        "type": "config",
        "stem": "Configure dynamic NAT: build a pool named PUB of 203.0.113.1 through 203.0.113.10, select inside hosts 192.168.1.0/24, and bind them. Then verify.",
        "lines": [
          "ip nat pool PUB 203.0.113.1 203.0.113.10 netmask 255.255.255.0",
          "access-list 1 permit 192.168.1.0 0.0.0.255",
          "ip nat inside source list 1 pool PUB"
        ],
        "show": "show ip nat translations",
        "hint": "Define the range of public addresses first, select which inside sources qualify, then tie the source list to the pool. Omit the overload word so each host gets its own pool address."
      }
    ],
    "sequence": [
      {
        "type": "sequence",
        "stem": "Order the steps to configure dynamic PAT (overload) using the outside interface IP.",
        "steps": [
          "Define a standard ACL matching the inside hosts",
          "Tag the inside interface: ip nat inside",
          "Tag the outside interface: ip nat outside",
          "ip nat inside source list <acl> interface <outside> overload"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the steps to configure static NAT for a single internal server.",
        "steps": [
          "ip nat inside source static <inside-local> <inside-global>",
          "Tag the LAN interface: ip nat inside",
          "Tag the WAN interface: ip nat outside",
          "Verify: show ip nat translations shows the static entry even with no traffic"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order what happens to an inside-to-outside packet as it transits a PAT router.",
        "steps": [
          "Packet arrives on the ip nat inside interface",
          "Router checks the NAT ACL and matches the inside source",
          "Router rewrites source IP to the public address and assigns a unique source port",
          "Router records the entry in the translation table and forwards out the ip nat outside interface"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the steps to configure dynamic NAT with a pool (no overload).",
        "steps": [
          "Define the NAT pool of public addresses",
          "Define an ACL selecting the inside source hosts",
          "Bind the ACL to the pool: ip nat inside source list <acl> pool <name>",
          "Tag inside and outside interfaces, then verify with show ip nat translations"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the troubleshooting steps when NAT is configured but no hosts are being translated.",
        "steps": [
          "Confirm ip nat inside and ip nat outside are on the correct interfaces",
          "Confirm the ACL permits the inside source subnet (show access-lists)",
          "Confirm the pool or interface binding exists and is not exhausted",
          "clear ip nat translation * and regenerate traffic to retest"
        ]
      }
    ],
    "topology": [
      {
        "type": "topology",
        "stem": "On this NAT router, which interface must be tagged 'ip nat outside'?",
        "svg": "<svg viewBox=\"0 0 320 140\" role=\"img\" aria-label=\"NAT router between LAN and internet\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"20\" y=\"55\" width=\"70\" height=\"30\" rx=\"4\" fill=\"#F0FDF4\" stroke=\"#16A34A\"/><text x=\"55\" y=\"74\" text-anchor=\"middle\" font-size=\"9\">LAN 192.168.1.0</text><line x1=\"90\" y1=\"70\" x2=\"130\" y2=\"70\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"110\" y=\"62\" text-anchor=\"middle\" font-size=\"8\">g0/0</text><rect x=\"130\" y=\"52\" width=\"60\" height=\"36\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"160\" y=\"74\" text-anchor=\"middle\">NAT</text><line x1=\"190\" y1=\"70\" x2=\"230\" y2=\"70\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"210\" y=\"62\" text-anchor=\"middle\" font-size=\"8\">g0/1</text><rect x=\"230\" y=\"55\" width=\"70\" height=\"30\" rx=\"4\" fill=\"#FFF7ED\" stroke=\"#B45309\"/><text x=\"265\" y=\"74\" text-anchor=\"middle\" font-size=\"9\">Internet</text></g></svg>",
        "choices": [
          "g0/0 (LAN side)",
          "g0/1 (Internet side)",
          "Both interfaces",
          "Neither, NAT is global"
        ],
        "answer": 1,
        "explain": "The interface facing the public internet is ip nat outside; the LAN interface is ip nat inside. Tagging the wrong side or only one side stops translation."
      },
      {
        "type": "topology",
        "stem": "Three inside PCs reach the internet through one public address 203.0.113.5. Which NAT type does this topology require?",
        "svg": "<svg viewBox=\"0 0 340 160\" role=\"img\" aria-label=\"Three PCs sharing one public IP\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"9\" fill=\"#1C1917\"><rect x=\"15\" y=\"15\" width=\"66\" height=\"22\" rx=\"3\" fill=\"#F0FDF4\" stroke=\"#16A34A\"/><text x=\"48\" y=\"30\" text-anchor=\"middle\">.10</text><rect x=\"15\" y=\"63\" width=\"66\" height=\"22\" rx=\"3\" fill=\"#F0FDF4\" stroke=\"#16A34A\"/><text x=\"48\" y=\"78\" text-anchor=\"middle\">.11</text><rect x=\"15\" y=\"111\" width=\"66\" height=\"22\" rx=\"3\" fill=\"#F0FDF4\" stroke=\"#16A34A\"/><text x=\"48\" y=\"126\" text-anchor=\"middle\">.12</text><line x1=\"81\" y1=\"26\" x2=\"150\" y2=\"74\" stroke=\"#57534E\" stroke-width=\"1.5\"/><line x1=\"81\" y1=\"74\" x2=\"150\" y2=\"74\" stroke=\"#57534E\" stroke-width=\"1.5\"/><line x1=\"81\" y1=\"122\" x2=\"150\" y2=\"74\" stroke=\"#57534E\" stroke-width=\"1.5\"/><rect x=\"150\" y=\"58\" width=\"58\" height=\"34\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"179\" y=\"79\" text-anchor=\"middle\" font-size=\"10\">NAT</text><line x1=\"208\" y1=\"75\" x2=\"255\" y2=\"75\" stroke=\"#57534E\" stroke-width=\"2\"/><rect x=\"255\" y=\"60\" width=\"72\" height=\"30\" rx=\"4\" fill=\"#FFF7ED\" stroke=\"#B45309\"/><text x=\"291\" y=\"79\" text-anchor=\"middle\">203.0.113.5</text></g></svg>",
        "choices": [
          "Static NAT (1:1)",
          "Dynamic NAT pool",
          "PAT (overload)",
          "No NAT needed"
        ],
        "answer": 2,
        "explain": "Many private hosts collapsing onto a single public IP is PAT (overload). Sessions stay distinct via unique source port numbers."
      },
      {
        "type": "topology",
        "stem": "The router has g0/0 tagged ip nat inside and g0/1 with no NAT tag. Inside hosts cannot reach the internet. What is the topology fault?",
        "svg": "<svg viewBox=\"0 0 320 130\" role=\"img\" aria-label=\"NAT router missing outside tag\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"9\" fill=\"#1C1917\"><rect x=\"20\" y=\"50\" width=\"70\" height=\"28\" rx=\"4\" fill=\"#F0FDF4\" stroke=\"#16A34A\"/><text x=\"55\" y=\"68\" text-anchor=\"middle\">LAN</text><line x1=\"90\" y1=\"64\" x2=\"130\" y2=\"64\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"110\" y=\"56\" text-anchor=\"middle\" font-size=\"7\">g0/0 inside</text><rect x=\"130\" y=\"47\" width=\"58\" height=\"34\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"159\" y=\"68\" text-anchor=\"middle\" font-size=\"10\">NAT</text><line x1=\"188\" y1=\"64\" x2=\"228\" y2=\"64\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"208\" y=\"56\" text-anchor=\"middle\" font-size=\"7\">g0/1 ???</text><rect x=\"228\" y=\"50\" width=\"72\" height=\"28\" rx=\"4\" fill=\"#FFF7ED\" stroke=\"#B45309\"/><text x=\"264\" y=\"68\" text-anchor=\"middle\">Internet</text></g></svg>",
        "choices": [
          "The ACL is wrong",
          "g0/1 is missing the ip nat outside designation",
          "The pool is too small",
          "Static route is missing"
        ],
        "answer": 1,
        "explain": "NAT requires both an inside and an outside interface. With g0/1 untagged, no boundary exists, so the router never builds translations and inside traffic leaves untranslated and unrouted by the ISP."
      },
      {
        "type": "topology",
        "stem": "An external client must initiate connections to internal server 192.168.1.10 at a fixed public address. Which NAT type does this topology demand?",
        "svg": "<svg viewBox=\"0 0 330 130\" role=\"img\" aria-label=\"Inbound connection to internal server\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"9\" fill=\"#1C1917\"><rect x=\"15\" y=\"50\" width=\"80\" height=\"30\" rx=\"4\" fill=\"#F0FDF4\" stroke=\"#16A34A\"/><text x=\"55\" y=\"69\" text-anchor=\"middle\">SRV .10</text><line x1=\"95\" y1=\"65\" x2=\"135\" y2=\"65\" stroke=\"#57534E\" stroke-width=\"2\"/><rect x=\"135\" y=\"48\" width=\"58\" height=\"34\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"164\" y=\"69\" text-anchor=\"middle\" font-size=\"10\">NAT</text><line x1=\"193\" y1=\"65\" x2=\"240\" y2=\"65\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"216\" y=\"58\" text-anchor=\"middle\" font-size=\"8\">inbound</text><rect x=\"240\" y=\"50\" width=\"78\" height=\"30\" rx=\"4\" fill=\"#FFF7ED\" stroke=\"#B45309\"/><text x=\"279\" y=\"69\" text-anchor=\"middle\">Client</text></g></svg>",
        "choices": [
          "PAT overload",
          "Dynamic NAT pool",
          "Static NAT (1:1)",
          "Source NAT only"
        ],
        "answer": 2,
        "explain": "Inbound-initiated, fixed-address reachability needs a permanent 1:1 static mapping. PAT and dynamic pools only build entries when inside hosts originate traffic, so they cannot reliably accept unsolicited inbound sessions."
      },
      {
        "type": "topology",
        "stem": "Two inside VLANs (192.168.1.0/24 on g0/0 and 192.168.2.0/24 on g0/0.2) both need internet via g0/1. How should the interfaces be tagged?",
        "svg": "<svg viewBox=\"0 0 340 150\" role=\"img\" aria-label=\"Two inside VLANs one outside\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"8\" fill=\"#1C1917\"><rect x=\"15\" y=\"20\" width=\"80\" height=\"24\" rx=\"3\" fill=\"#F0FDF4\" stroke=\"#16A34A\"/><text x=\"55\" y=\"36\" text-anchor=\"middle\">VLAN1 g0/0</text><rect x=\"15\" y=\"95\" width=\"80\" height=\"24\" rx=\"3\" fill=\"#F0FDF4\" stroke=\"#16A34A\"/><text x=\"55\" y=\"111\" text-anchor=\"middle\">VLAN2 g0/0.2</text><line x1=\"95\" y1=\"32\" x2=\"150\" y2=\"68\" stroke=\"#57534E\" stroke-width=\"1.5\"/><line x1=\"95\" y1=\"107\" x2=\"150\" y2=\"75\" stroke=\"#57534E\" stroke-width=\"1.5\"/><rect x=\"150\" y=\"54\" width=\"56\" height=\"34\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"178\" y=\"75\" text-anchor=\"middle\" font-size=\"10\">NAT</text><line x1=\"206\" y1=\"71\" x2=\"250\" y2=\"71\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"228\" y=\"63\" text-anchor=\"middle\">g0/1</text><rect x=\"250\" y=\"57\" width=\"78\" height=\"28\" rx=\"4\" fill=\"#FFF7ED\" stroke=\"#B45309\"/><text x=\"289\" y=\"75\" text-anchor=\"middle\">Internet</text></g></svg>",
        "choices": [
          "Only g0/1 needs ip nat outside; the rest is automatic",
          "Both g0/0 and g0/0.2 get ip nat inside; g0/1 gets ip nat outside",
          "Only one inside interface may be tagged",
          "Tag g0/1 as both inside and outside"
        ],
        "answer": 1,
        "explain": "Multiple inside interfaces are allowed. Each interface where private hosts live gets ip nat inside, and the single public-facing interface gets ip nat outside."
      }
    ],
    "applied": [
      {
        "type": "mcq",
        "stem": "A network has 200 inside hosts and a single public IP from the ISP. Which NAT configuration fits?",
        "choices": [
          "Static NAT for each host",
          "Dynamic NAT pool of 1 address",
          "PAT overload to the single public IP",
          "Disable NAT and route the private subnet"
        ],
        "answer": 2,
        "explain": "One public IP for many hosts requires PAT (overload), which uses port numbers to multiplex up to roughly 65,000 sessions onto the single address. Static or a 1-address pool would serve only one host."
      },
      {
        "type": "mcq",
        "stem": "An internal web server must always be reachable from the internet at a fixed public IP. Which NAT do you use?",
        "choices": [
          "PAT overload",
          "Dynamic NAT pool",
          "Static NAT (1:1)",
          "No NAT, just routing"
        ],
        "answer": 2,
        "explain": "Static NAT gives a permanent 1:1 mapping so external clients can always reach the server at the same public IP, even with no outbound traffic from the server."
      },
      {
        "type": "mcq",
        "stem": "NAT is configured with a correct ACL and pool, but no hosts translate. show ip nat statistics lists no inside or outside interface. What is the fix?",
        "choices": [
          "Enlarge the NAT pool",
          "Add ip nat inside and ip nat outside to the correct interfaces",
          "Add the overload keyword",
          "Lower the NAT timeout"
        ],
        "answer": 1,
        "explain": "Without both interface designations there is no translation boundary, so the statistics show no inside/outside interface and zero translations. Tagging the LAN port inside and the WAN port outside restores NAT."
      },
      {
        "type": "mcq",
        "stem": "Inside hosts can ping the NAT router but get no internet. show ip nat statistics shows 0 translations and a high miss count. Most likely cause?",
        "choices": [
          "MTU mismatch on the WAN",
          "The NAT ACL does not permit the inside subnet",
          "The default gateway is wrong",
          "Duplex mismatch"
        ],
        "answer": 1,
        "explain": "Misses with zero translations point to the source-selection step: the ACL is not matching the inside hosts, so NAT never translates them. Verify the ACL with show access-lists."
      },
      {
        "type": "mcq",
        "stem": "Outbound NAT works fine, but external clients cannot initiate a connection to the inside server. The server uses PAT like everyone else. What is the fix?",
        "choices": [
          "Add more addresses to the pool",
          "Replace PAT with a static NAT mapping for the server",
          "Increase the NAT timeout",
          "Add a second outside interface"
        ],
        "answer": 1,
        "explain": "PAT entries are built only when the inside host originates traffic, so unsolicited inbound sessions have no entry to match. A static NAT mapping creates a permanent, predictable entry that accepts inbound connections."
      },
      {
        "type": "mcq",
        "stem": "A dynamic NAT pool has 5 addresses and no overload keyword. A 6th inside host opens a new session while the first 5 are active. What happens?",
        "choices": [
          "The 6th host shares an address using ports",
          "The pool doubles automatically",
          "The 6th host's packets are dropped",
          "The oldest translation is overwritten"
        ],
        "answer": 2,
        "explain": "Without overload, dynamic NAT is strictly 1:1 from the pool. Once the pool is exhausted, new inside hosts get no translation and their traffic is dropped."
      }
    ],
    "scope": [
      {
        "type": "mcq",
        "stem": "Which interfaces must be tagged for NAT to translate traffic?",
        "choices": [
          "Only the inside interface",
          "Only the outside interface",
          "Both an ip nat inside and an ip nat outside",
          "The loopback only"
        ],
        "answer": 2,
        "explain": "NAT needs at least one ip nat inside and one ip nat outside interface so it knows which direction crosses the translation boundary. Missing either tag means translations are never created."
      },
      {
        "type": "mcq",
        "stem": "After generating traffic you read show ip nat translations. Which fields identify the private-to-public mapping of an inside host?",
        "choices": [
          "Outside local and outside global",
          "Inside local and inside global",
          "Protocol and TTL",
          "Source MAC and destination MAC"
        ],
        "answer": 1,
        "explain": "For an inside host the table pairs the inside local (real private address) with the inside global (translated public address). Reading that pair confirms the host is being translated correctly."
      },
      {
        "type": "mcq",
        "stem": "What does the ACL referenced in a dynamic NAT or PAT command actually do?",
        "choices": [
          "Blocks traffic that does not match",
          "Selects which inside source addresses get translated",
          "Filters inbound traffic from the internet",
          "Sets QoS markings"
        ],
        "answer": 1,
        "explain": "In NAT, the ACL is a selector, not a filter. Permitted sources get translated; non-matching packets are not dropped by NAT, they simply pass untranslated. This is a classic exam trap."
      },
      {
        "type": "mcq",
        "stem": "How many concurrent translations can a single public IP support under PAT, approximately?",
        "choices": [
          "Exactly 254",
          "About 4 billion",
          "Roughly 65,000 (port number space)",
          "Exactly 1"
        ],
        "answer": 2,
        "explain": "PAT multiplexes sessions using the 16-bit source port field, giving roughly 65,000 concurrent translations per public IP. This is why one address can serve a large network."
      },
      {
        "type": "mcq",
        "stem": "In the statistics output, what does a high miss count alongside zero translations most likely mean?",
        "choices": [
          "NAT is healthy and aging entries normally",
          "Packets are not matching the NAT ACL or the pool is exhausted",
          "The WAN link is down",
          "The router clock is wrong"
        ],
        "answer": 1,
        "explain": "Misses count packets NAT could not translate. Combined with zero translations it points to the selection step: the ACL is not matching the inside sources, or a non-overload pool has run dry."
      },
      {
        "type": "mcq",
        "stem": "In a NAT table, which entry type appears even when no traffic is flowing?",
        "choices": [
          "Dynamic NAT entries",
          "PAT overload entries",
          "Static NAT entries",
          "No entries appear without traffic"
        ],
        "answer": 2,
        "explain": "Static mappings are permanent and sit in the table at all times. Dynamic and PAT entries appear only while a session is active and age out when idle."
      }
    ]
  },
  "5": {
    "concept": [
      {
        "type": "mcq",
        "stem": "What problem does Spanning Tree Protocol prevent in a switched network with redundant links?",
        "choices": [
          "IP address conflicts",
          "Layer-2 loops and broadcast storms",
          "VLAN hopping",
          "Slow routing convergence"
        ],
        "answer": 1,
        "explain": "STP blocks redundant paths to prevent bridging loops, broadcast storms, and MAC table instability."
      },
      {
        "type": "mcq",
        "stem": "How is the root bridge elected in a spanning-tree topology?",
        "choices": [
          "Highest MAC address wins",
          "Lowest Bridge ID wins (priority then MAC)",
          "The switch with the most ports wins",
          "The first switch powered on wins"
        ],
        "answer": 1,
        "explain": "The switch with the lowest Bridge ID becomes root. BID = priority + extended system ID (VLAN) + MAC, compared priority first."
      },
      {
        "type": "mcq",
        "stem": "What is the role of a root port versus a designated port?",
        "choices": [
          "Root port is the best path toward root on a non-root switch; designated port is the forwarding port chosen per segment",
          "Root port forwards on every segment; designated port blocks",
          "Both always block to prevent loops",
          "Root port exists only on the root bridge"
        ],
        "answer": 0,
        "explain": "Each non-root switch picks one root port (its best path to root). Each segment elects one designated port that forwards. Remaining ports block."
      },
      {
        "type": "mcq",
        "stem": "How many root ports does a non-root switch elect, and how many root bridges exist per VLAN?",
        "choices": [
          "One root port per switch; one root bridge per VLAN",
          "One root port per VLAN; many root bridges",
          "One root port per segment; one root bridge total",
          "Many root ports; one root bridge per switch"
        ],
        "answer": 0,
        "explain": "Each non-root switch picks exactly one root port (its best path to root). There is exactly one root bridge per VLAN."
      },
      {
        "type": "mcq",
        "stem": "Which field makes the Bridge ID unique even when two switches share the same priority and VLAN?",
        "choices": [
          "The IP address",
          "The MAC address",
          "The serial number",
          "The port count"
        ],
        "answer": 1,
        "explain": "BID = 4-bit priority + 12-bit extended system ID (VLAN) + 48-bit MAC. The MAC is the final tiebreaker when priority and VLAN are equal."
      },
      {
        "type": "mcq",
        "stem": "In what increments must STP bridge priority be configured?",
        "choices": [
          "1",
          "256",
          "1024",
          "4096"
        ],
        "answer": 3,
        "explain": "Bridge priority is set in steps of 4096 (0, 4096, 8192, ... 61440). Default is 32768. This niche rule trips people who try arbitrary values."
      }
    ],
    "config": [
      {
        "type": "config",
        "stem": "Use the macro keyword that automatically lowers this switch's priority so it becomes root for VLAN 20, then verify.",
        "lines": [
          "spanning-tree vlan 20 root primary"
        ],
        "show": "show spanning-tree vlan 20",
        "hint": "There is a one-word keyword that tells IOS to compute a low-enough priority for you instead of typing a number. Think of it as the 'designate me as the main root' command."
      },
      {
        "type": "config",
        "stem": "Make this switch the root for VLAN 10 by setting an explicit priority value, then verify STP for VLAN 10.",
        "lines": [
          "spanning-tree vlan 10 priority 4096"
        ],
        "show": "show spanning-tree vlan 10",
        "hint": "Bridge priority is only valid in fixed increments, so the lower-than-default value must be one of those legal steps. Lowest priority wins the root election."
      },
      {
        "type": "config",
        "stem": "Switch this device to the rapid per-VLAN spanning-tree variant (the one that converges faster than legacy 802.1D), then verify the summary.",
        "lines": [
          "spanning-tree mode rapid-pvst"
        ],
        "show": "show spanning-tree summary",
        "hint": "Set the global mode to the rapid per-VLAN variant that converges faster than legacy 802.1D. It is one global command, no interface needed."
      },
      {
        "type": "config",
        "stem": "Enable the edge-port feature on access interface gi0/5 so an end host forwards immediately, then verify the interface.",
        "lines": [
          "interface gi0/5",
          "spanning-tree portfast"
        ],
        "show": "show spanning-tree interface gi0/5 detail",
        "hint": "The per-interface feature skips the listening and learning delay for a single edge port. Apply it only where a host, not a switch, connects."
      },
      {
        "type": "config",
        "stem": "Protect edge port gi0/5 so it shuts down if a switch is plugged in and starts sending BPDUs, then verify.",
        "lines": [
          "interface gi0/5",
          "spanning-tree bpduguard enable"
        ],
        "show": "show spanning-tree interface gi0/5 detail",
        "hint": "The guard that err-disables a PortFast port the instant it hears a BPDU. It is the natural partner to the edge-port feature."
      },
      {
        "type": "config",
        "stem": "Influence root-port selection by lowering the path cost on trunk gi0/1, then verify the interface.",
        "lines": [
          "interface gi0/1",
          "spanning-tree cost 1"
        ],
        "show": "show spanning-tree interface gi0/1",
        "hint": "Per-interface cost is additive along the path to root; a lower number makes a port more attractive as the root port. Set it on the interface, not globally."
      }
    ],
    "sequence": [
      {
        "type": "sequence",
        "stem": "Order the STP convergence decisions a switched network makes after links come up.",
        "steps": [
          "Elect one root bridge (lowest BID)",
          "Each non-root switch picks its root port (lowest cost to root)",
          "Each segment picks a designated port",
          "Remaining ports become alternate/blocking"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the RSTP (Rapid PVST+) port states from blocking traffic to forwarding traffic.",
        "steps": [
          "Discarding",
          "Learning",
          "Forwarding"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the tiebreakers STP uses to elect the root port when total cost to root is equal.",
        "steps": [
          "Lowest total path cost to root",
          "Lowest neighbor (sender) Bridge ID",
          "Lowest neighbor port priority",
          "Lowest neighbor port number"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the steps to safely make a switch root for VLAN 1 and protect its edge ports.",
        "steps": [
          "spanning-tree mode rapid-pvst",
          "spanning-tree vlan 1 root primary",
          "interface range fa0/1 - 24 (access ports)",
          "spanning-tree portfast",
          "spanning-tree bpduguard enable"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the legacy 802.1D port states a port moves through after link-up (the slow path PortFast skips).",
        "steps": [
          "Blocking",
          "Listening",
          "Learning",
          "Forwarding"
        ]
      }
    ],
    "topology": [
      {
        "type": "topology",
        "stem": "SW-A (priority 32768) and SW-B (priority 4096) both connect to SW-C. Which switch is the root bridge?",
        "svg": "<svg viewBox=\"0 0 320 160\" role=\"img\" aria-label=\"Two switches with different priorities and SW-C\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"30\" y=\"20\" width=\"90\" height=\"34\" rx=\"5\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"75\" y=\"41\" text-anchor=\"middle\" font-size=\"9\">SW-A pri 32768</text><rect x=\"200\" y=\"20\" width=\"90\" height=\"34\" rx=\"5\" fill=\"#F0FDF4\" stroke=\"#16A34A\"/><text x=\"245\" y=\"41\" text-anchor=\"middle\" font-size=\"9\">SW-B pri 4096</text><rect x=\"115\" y=\"110\" width=\"90\" height=\"34\" rx=\"5\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"160\" y=\"131\" text-anchor=\"middle\">SW-C</text><line x1=\"75\" y1=\"54\" x2=\"140\" y2=\"110\" stroke=\"#57534E\" stroke-width=\"2\"/><line x1=\"245\" y1=\"54\" x2=\"180\" y2=\"110\" stroke=\"#57534E\" stroke-width=\"2\"/></g></svg>",
        "choices": [
          "SW-A, it has the higher number",
          "SW-B, it has the lowest priority",
          "SW-C, it sits in the middle",
          "Whichever booted first"
        ],
        "answer": 1,
        "explain": "Lowest Bridge ID wins, and priority is compared before MAC. SW-B at 4096 beats SW-A at 32768 outright."
      },
      {
        "type": "topology",
        "stem": "All links are 1 Gbps (cost 4). SW-A is root. Which port on SW-C is the root port?",
        "svg": "<svg viewBox=\"0 0 320 170\" role=\"img\" aria-label=\"Triangle of three switches, A is root\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"130\" y=\"15\" width=\"60\" height=\"32\" rx=\"5\" fill=\"#F0FDF4\" stroke=\"#16A34A\"/><text x=\"160\" y=\"36\" text-anchor=\"middle\">SW-A*</text><rect x=\"30\" y=\"115\" width=\"60\" height=\"32\" rx=\"5\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"60\" y=\"136\" text-anchor=\"middle\">SW-B</text><rect x=\"230\" y=\"115\" width=\"60\" height=\"32\" rx=\"5\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"260\" y=\"136\" text-anchor=\"middle\">SW-C</text><line x1=\"145\" y1=\"47\" x2=\"70\" y2=\"115\" stroke=\"#57534E\" stroke-width=\"2\"/><line x1=\"175\" y1=\"47\" x2=\"250\" y2=\"115\" stroke=\"#57534E\" stroke-width=\"2\"/><line x1=\"90\" y1=\"131\" x2=\"230\" y2=\"131\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"100\" y=\"80\" font-size=\"9\">cost 4</text><text x=\"205\" y=\"80\" font-size=\"9\">cost 4</text><text x=\"160\" y=\"125\" text-anchor=\"middle\" font-size=\"9\">cost 4</text></g></svg>",
        "choices": [
          "The port toward SW-A (cost 4)",
          "The port toward SW-B (cost 8 path)",
          "Both are root ports",
          "SW-C has no root port"
        ],
        "answer": 0,
        "explain": "Root port = lowest cost path to root. Direct to SW-A costs 4; via SW-B costs 8. The direct port wins."
      },
      {
        "type": "topology",
        "stem": "SW-B reaches root SW-A two ways: a direct 100 Mbps link and a path through SW-C over two 1 Gbps links. Which is the root port?",
        "svg": "<svg viewBox=\"0 0 320 170\" role=\"img\" aria-label=\"SW-B with two paths to root SW-A\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"125\" y=\"15\" width=\"70\" height=\"32\" rx=\"5\" fill=\"#F0FDF4\" stroke=\"#16A34A\"/><text x=\"160\" y=\"36\" text-anchor=\"middle\">SW-A*</text><rect x=\"25\" y=\"115\" width=\"70\" height=\"32\" rx=\"5\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"60\" y=\"136\" text-anchor=\"middle\">SW-B</text><rect x=\"225\" y=\"115\" width=\"70\" height=\"32\" rx=\"5\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"260\" y=\"136\" text-anchor=\"middle\">SW-C</text><line x1=\"135\" y1=\"47\" x2=\"65\" y2=\"115\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"75\" y=\"82\" font-size=\"9\">100 Mbps</text><line x1=\"185\" y1=\"47\" x2=\"255\" y2=\"115\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"225\" y=\"82\" font-size=\"9\">1 Gbps</text><line x1=\"95\" y1=\"131\" x2=\"225\" y2=\"131\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"160\" y=\"125\" text-anchor=\"middle\" font-size=\"9\">1 Gbps</text></g></svg>",
        "choices": [
          "The direct 100 Mbps port (higher cost)",
          "The two-hop path through SW-C (lower total cost)",
          "Both, traffic load-balances",
          "Neither, SW-B blocks both"
        ],
        "answer": 1,
        "explain": "Root port = lowest cumulative cost to root. Two 1 Gbps hops sum lower than a single 100 Mbps link, so the two-hop path wins even though it is more hops."
      },
      {
        "type": "topology",
        "stem": "SW-X (root) and SW-Y connect with two parallel equal-cost links. SW-X is designated on both. What state is the link SW-Y does not pick as root port?",
        "svg": "<svg viewBox=\"0 0 320 150\" role=\"img\" aria-label=\"Two switches with two parallel links\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"30\" y=\"55\" width=\"70\" height=\"36\" rx=\"5\" fill=\"#F0FDF4\" stroke=\"#16A34A\"/><text x=\"65\" y=\"77\" text-anchor=\"middle\">SW-X*</text><rect x=\"220\" y=\"55\" width=\"70\" height=\"36\" rx=\"5\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"255\" y=\"77\" text-anchor=\"middle\">SW-Y</text><path d=\"M100 65 Q160 35 220 65\" fill=\"none\" stroke=\"#57534E\" stroke-width=\"2\"/><path d=\"M100 81 Q160 111 220 81\" fill=\"none\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"160\" y=\"40\" text-anchor=\"middle\" font-size=\"9\">link 1</text><text x=\"160\" y=\"120\" text-anchor=\"middle\" font-size=\"9\">link 2</text></g></svg>",
        "choices": [
          "Forwarding, both stay up",
          "Discarding/blocking (alternate or backup)",
          "Err-disabled",
          "Listening forever"
        ],
        "answer": 1,
        "explain": "Only one port becomes the root port; the redundant parallel link is put into a discarding (alternate/backup) state to break the loop. Use EtherChannel if you want both forwarding."
      },
      {
        "type": "topology",
        "stem": "A host PC connects to access port gi0/2 with PortFast. After link-up, when does the port start forwarding the host's traffic?",
        "svg": "<svg viewBox=\"0 0 320 130\" role=\"img\" aria-label=\"PC connected to a switch access port\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"30\" y=\"50\" width=\"60\" height=\"30\" rx=\"4\" fill=\"#F0FDF4\" stroke=\"#16A34A\"/><text x=\"60\" y=\"69\" text-anchor=\"middle\" font-size=\"9\">PC</text><line x1=\"90\" y1=\"65\" x2=\"180\" y2=\"65\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"135\" y=\"57\" text-anchor=\"middle\" font-size=\"8\">gi0/2 PortFast</text><rect x=\"180\" y=\"48\" width=\"70\" height=\"36\" rx=\"5\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"215\" y=\"70\" text-anchor=\"middle\">SW</text></g></svg>",
        "choices": [
          "After ~30 seconds (listening + learning)",
          "Immediately, it skips listening and learning",
          "After MaxAge",
          "Only after a BPDU exchange"
        ],
        "answer": 1,
        "explain": "PortFast moves an edge port straight to forwarding, skipping the ~30s listening/learning delay. Safe only because a host, not a switch, is attached."
      }
    ],
    "applied": [
      {
        "type": "mcq",
        "stem": "An access port for an end host takes ~30s to start forwarding after link-up. How do you fix the delay?",
        "choices": [
          "Enable PortFast on the access port",
          "Lower the bridge priority",
          "Set the port to trunk",
          "Disable RSTP"
        ],
        "answer": 0,
        "explain": "PortFast skips listening/learning on edge ports so end-host ports forward immediately instead of waiting ~30s."
      },
      {
        "type": "mcq",
        "stem": "You want a specific switch to always win the root election even if a lower-MAC switch is added later. What is the most reliable action?",
        "choices": [
          "Boot it first",
          "Manually set its priority to the lowest legal value (0 or 4096)",
          "Add more uplinks",
          "Enable PortFast everywhere"
        ],
        "answer": 1,
        "explain": "STP election is not preemptive by boot order or ports. Explicitly setting the lowest priority (0 or root primary) guarantees the lowest BID wins."
      },
      {
        "type": "mcq",
        "stem": "After enabling RSTP, your access ports still take 30 seconds to forward host traffic. What is the most likely cause?",
        "choices": [
          "MaxAge is too low",
          "PortFast is not configured on the edge ports",
          "The root bridge is wrong",
          "The links are 10 Gbps"
        ],
        "answer": 1,
        "explain": "Even under RSTP, an edge port only forwards immediately if it is treated as an edge port (PortFast). Without it, the port runs the full transition."
      },
      {
        "type": "mcq",
        "stem": "A port configured with PortFast receives a BPDU and BPDU Guard is enabled. What happens?",
        "choices": [
          "It becomes the root port",
          "It moves to err-disabled (shut down)",
          "It begins normal STP listening",
          "Nothing, PortFast ignores BPDUs"
        ],
        "answer": 1,
        "explain": "BPDU Guard err-disables a PortFast edge port the moment it receives a BPDU, protecting the topology from a rogue switch."
      },
      {
        "type": "mcq",
        "stem": "A downstream switch keeps advertising superior BPDUs and stealing the root role from your core. Which feature on the core's downlink stops it without shutting the port?",
        "choices": [
          "BPDU Guard",
          "Root Guard",
          "PortFast",
          "Loop Guard"
        ],
        "answer": 1,
        "explain": "Root Guard puts a port into root-inconsistent (blocking) state if it hears a superior BPDU, protecting root placement. BPDU Guard would err-disable the port instead."
      },
      {
        "type": "mcq",
        "stem": "BPDU Guard err-disabled a port. After removing the rogue switch, how does the port come back?",
        "choices": [
          "Automatically after 20s",
          "It must be manually re-enabled (shut/no shut) or via errdisable recovery",
          "It never recovers",
          "It auto-recovers when a host connects"
        ],
        "answer": 1,
        "explain": "An err-disabled port stays down until manually bounced (shutdown then no shutdown) or until errdisable recovery is configured."
      }
    ],
    "scope": [
      {
        "type": "mcq",
        "stem": "What is the default bridge priority on a Cisco switch?",
        "choices": [
          "0",
          "4096",
          "32768",
          "65535"
        ],
        "answer": 2,
        "explain": "Default priority is 32768. It can be lowered in steps of 4096 to win the root election."
      },
      {
        "type": "mcq",
        "stem": "What is the STP path cost of a 1 Gbps link?",
        "choices": [
          "2",
          "4",
          "19",
          "100"
        ],
        "answer": 1,
        "explain": "Costs: 10G = 2, 1G = 4, 100M = 19, 10M = 100. The 1 Gbps cost of 4 is the most common access/distribution link."
      },
      {
        "type": "mcq",
        "stem": "What is the STP path cost of a 100 Mbps link?",
        "choices": [
          "2",
          "4",
          "19",
          "100"
        ],
        "answer": 2,
        "explain": "100M = 19. The full set: 10G = 2, 1G = 4, 100M = 19, 10M = 100."
      },
      {
        "type": "mcq",
        "stem": "What is the default STP forward delay timer?",
        "choices": [
          "2 seconds",
          "10 seconds",
          "15 seconds",
          "20 seconds"
        ],
        "answer": 2,
        "explain": "Forward delay is 15s (time in listening and again in learning). Hello 2s, MaxAge 20s."
      },
      {
        "type": "mcq",
        "stem": "What is the default STP MaxAge timer?",
        "choices": [
          "2 seconds",
          "10 seconds",
          "15 seconds",
          "20 seconds"
        ],
        "answer": 3,
        "explain": "MaxAge is 20s, the time a switch waits without a BPDU on a port before reconsidering the topology. Hello 2s, Forward delay 15s."
      },
      {
        "type": "mcq",
        "stem": "How is the Bridge ID structured in modern (PVST+) spanning tree?",
        "choices": [
          "48-bit MAC only",
          "4-bit priority + 12-bit extended system ID (VLAN) + 48-bit MAC",
          "16-bit priority + 48-bit MAC",
          "32-bit priority + 32-bit MAC"
        ],
        "answer": 1,
        "explain": "The original 16-bit priority was split into a 4-bit priority (steps of 4096) plus a 12-bit extended system ID carrying the VLAN, followed by the 48-bit MAC."
      }
    ]
  },
  "6": {
    "concept": [
      {
        "type": "mcq",
        "stem": "A host in VLAN 10 cannot reach a host in VLAN 20 on the same switch. Why?",
        "choices": [
          "STP blocked the port",
          "VLANs are separate broadcast domains and need a Layer 3 device to route between them",
          "The trunk is down",
          "Duplex mismatch"
        ],
        "answer": 1,
        "explain": "Each VLAN is its own broadcast domain and subnet. Inter-VLAN traffic must be routed by an SVI or router-on-a-stick; Layer 2 alone keeps them isolated."
      },
      {
        "type": "mcq",
        "stem": "How does an access port differ from a trunk port in what it carries?",
        "choices": [
          "Access carries many tagged VLANs, trunk carries one",
          "Access carries one untagged VLAN, trunk carries many VLANs each 802.1Q tagged",
          "Both carry all VLANs untagged",
          "Access tags frames, trunk leaves them untagged"
        ],
        "answer": 1,
        "explain": "An access port belongs to a single VLAN and sends frames untagged to the end device. A trunk carries multiple VLANs between switches, tagging each frame with its 802.1Q VLAN ID."
      },
      {
        "type": "mcq",
        "stem": "What does an 802.1Q trunk do to a frame on the native VLAN?",
        "choices": [
          "Tags it with the native VLAN ID",
          "Sends it untagged",
          "Drops it",
          "Double-tags it"
        ],
        "answer": 1,
        "explain": "Frames on the native VLAN cross an 802.1Q trunk untagged; all other VLANs are tagged with a 4-byte 802.1Q tag."
      },
      {
        "type": "mcq",
        "stem": "Which statement about VLAN 1 is correct?",
        "choices": [
          "It can be deleted to harden the switch",
          "It is the default VLAN, cannot be deleted, and carries control protocols like CDP and STP by default",
          "It is the default native VLAN only on access ports",
          "It supports 802.1Q tagging while other VLANs do not"
        ],
        "answer": 1,
        "explain": "VLAN 1 is the default VLAN for all ports, cannot be deleted or renamed, and carries CDP, VTP, and STP. Best practice is to move user traffic off it and change the native VLAN."
      },
      {
        "type": "mcq",
        "stem": "An IP phone with a PC attached connects to one access port. How does that single port keep voice and data traffic separate?",
        "choices": [
          "It trunks all VLANs to the phone",
          "Data stays untagged in the access VLAN while the phone tags voice in a separate voice VLAN",
          "Both data and voice ride VLAN 1 untagged",
          "The phone routes between the two VLANs"
        ],
        "answer": 1,
        "explain": "A voice VLAN lets an access port carry the PC's untagged data in the access VLAN and the phone's 802.1Q-tagged voice in the voice VLAN over the same cable, without making the port a full trunk."
      },
      {
        "type": "mcq",
        "stem": "Why is changing the native VLAN away from VLAN 1 considered a security best practice?",
        "choices": [
          "It speeds up trunk negotiation",
          "Native-VLAN frames are untagged, so leaving it on the default VLAN 1 enables double-tagging VLAN-hopping attacks",
          "It increases the number of allowed VLANs",
          "It is required for 802.1Q to function"
        ],
        "answer": 1,
        "explain": "Because native-VLAN traffic crosses the trunk untagged, an attacker on VLAN 1 can craft a double-tagged frame to hop VLANs. Using an unused native VLAN and disabling DTP mitigates this."
      }
    ],
    "config": [
      {
        "type": "config",
        "stem": "Create VLAN 20 named SALES and assign access port g0/2 to it, then verify the port's VLAN.",
        "lines": [
          "vlan 20",
          "name SALES",
          "interface g0/2",
          "switchport mode access",
          "switchport access vlan 20"
        ],
        "show": "show interfaces g0/2 switchport",
        "hint": "Define the VLAN in the database first, then pin the port to a single VLAN in the non-tagging mode and bind it to that VLAN number."
      },
      {
        "type": "config",
        "stem": "On access port g0/3, add an IP phone in a voice VLAN while keeping data in VLAN 10, then verify.",
        "lines": [
          "interface g0/3",
          "switchport mode access",
          "switchport access vlan 10",
          "switchport voice vlan 20"
        ],
        "show": "show interfaces g0/3 switchport",
        "hint": "Keep the port in access mode for the PC's untagged data, then add the separate voice instruction so the phone tags its traffic in its own VLAN."
      },
      {
        "type": "config",
        "stem": "Configure g0/1 as a forced (non-negotiated) 802.1Q trunk, then verify trunk status.",
        "lines": [
          "interface g0/1",
          "switchport mode trunk"
        ],
        "show": "show interfaces trunk",
        "hint": "Force the port into the mode that carries multiple VLANs rather than leaving it negotiable. On platforms that support more than one tagging type, set the encapsulation before forcing the mode."
      },
      {
        "type": "config",
        "stem": "Restrict trunk g0/1 to carry only VLANs 10, 20, and 30, then verify which VLANs are allowed.",
        "lines": [
          "interface g0/1",
          "switchport mode trunk",
          "switchport trunk allowed vlan 10,20,30"
        ],
        "show": "show interfaces trunk",
        "hint": "After forcing the trunk, prune the set of VLANs it carries down to an explicit list rather than letting all VLANs cross."
      },
      {
        "type": "config",
        "stem": "Configure router-on-a-stick on the router so subinterface g0/0.10 routes VLAN 10 (10.1.10.0/24), then verify the subinterface.",
        "lines": [
          "interface g0/0.10",
          "encapsulation dot1q 10",
          "ip address 10.1.10.1 255.255.255.0"
        ],
        "show": "show ip interface brief",
        "hint": "Create a logical subinterface, tell it which VLAN tag to match, then give it the gateway address for that VLAN's subnet. The physical parent stays up with no IP."
      },
      {
        "type": "config",
        "stem": "On a multilayer switch, enable routing and give VLAN 30 a gateway SVI at 10.1.30.1/24, then verify the interface.",
        "lines": [
          "ip routing",
          "interface vlan 30",
          "ip address 10.1.30.1 255.255.255.0",
          "no shutdown"
        ],
        "show": "show ip interface brief",
        "hint": "Turn on Layer 3 forwarding globally first, then create the virtual interface for the VLAN and give it the gateway address so the switch routes between VLANs in hardware."
      },
      {
        "type": "config",
        "stem": "Harden trunk g0/1 by moving the native VLAN to an unused VLAN and disabling dynamic trunk negotiation, then verify the trunk.",
        "lines": [
          "interface g0/1",
          "switchport trunk native vlan 99",
          "switchport nonegotiate"
        ],
        "show": "show interfaces trunk",
        "hint": "Reassign the untagged VLAN on the trunk to an unused number, then stop the port from auto-negotiating its trunk state so it cannot be tricked into trunking."
      }
    ],
    "sequence": [
      {
        "type": "sequence",
        "stem": "Order the steps to create VLAN 20 named SALES and assign access port g0/2 to it.",
        "steps": [
          "vlan 20",
          "name SALES",
          "interface g0/2",
          "switchport mode access",
          "switchport access vlan 20"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the steps to configure access port g0/3 for a PC in VLAN 10 plus an IP phone in voice VLAN 20.",
        "steps": [
          "interface g0/3",
          "switchport mode access",
          "switchport access vlan 10",
          "switchport voice vlan 20"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the steps to build a router-on-a-stick subinterface for VLAN 10 on the router.",
        "steps": [
          "interface g0/0.10",
          "encapsulation dot1q 10",
          "ip address 10.1.10.1 255.255.255.0",
          "no shutdown"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the steps to provide inter-VLAN routing for VLAN 30 on a multilayer (Layer 3) switch using an SVI.",
        "steps": [
          "ip routing",
          "vlan 30",
          "interface vlan 30",
          "ip address 10.1.30.1 255.255.255.0",
          "no shutdown"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the steps to configure and harden a trunk on g0/1 (force trunk, set native VLAN, prune allowed list, stop negotiation).",
        "steps": [
          "interface g0/1",
          "switchport mode trunk",
          "switchport trunk native vlan 99",
          "switchport trunk allowed vlan 10,20,30",
          "switchport nonegotiate"
        ]
      }
    ],
    "topology": [
      {
        "type": "topology",
        "stem": "PC-A (VLAN 10) and PC-B (VLAN 20) sit on the same switch and must talk. The single link to the router carries both VLANs. What must that link be?",
        "svg": "<svg viewBox=\"0 0 320 150\" role=\"img\" aria-label=\"Switch with two VLANs uplinked to a router\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"120\" y=\"90\" width=\"80\" height=\"30\" rx=\"4\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"160\" y=\"109\" text-anchor=\"middle\">SW1</text><rect x=\"20\" y=\"120\" width=\"60\" height=\"22\" rx=\"3\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"50\" y=\"135\" text-anchor=\"middle\" font-size=\"9\">PC-A v10</text><rect x=\"240\" y=\"120\" width=\"60\" height=\"22\" rx=\"3\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"270\" y=\"135\" text-anchor=\"middle\" font-size=\"9\">PC-B v20</text><line x1=\"80\" y1=\"120\" x2=\"130\" y2=\"110\" stroke=\"#57534E\" stroke-width=\"2\"/><line x1=\"240\" y1=\"120\" x2=\"190\" y2=\"110\" stroke=\"#57534E\" stroke-width=\"2\"/><rect x=\"120\" y=\"15\" width=\"80\" height=\"30\" rx=\"4\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"160\" y=\"34\" text-anchor=\"middle\">Router</text><line x1=\"160\" y1=\"45\" x2=\"160\" y2=\"90\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"200\" y=\"70\" font-size=\"9\">? link</text></g></svg>",
        "choices": [
          "An access port in VLAN 10",
          "An 802.1Q trunk carrying both VLANs",
          "A blocked STP port",
          "A loopback"
        ],
        "answer": 1,
        "explain": "Router-on-a-stick needs an 802.1Q trunk to the router so subinterfaces (g0/0.10, g0/0.20) can tag and route between VLAN 10 and VLAN 20."
      },
      {
        "type": "topology",
        "stem": "SW1 and SW2 each have hosts in VLAN 10 and VLAN 20. The link between the switches must carry both VLANs with tags. What port type is the inter-switch link?",
        "svg": "<svg viewBox=\"0 0 320 150\" role=\"img\" aria-label=\"Two switches connected, each with VLAN 10 and VLAN 20 hosts\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"30\" y=\"60\" width=\"70\" height=\"28\" rx=\"4\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"65\" y=\"78\" text-anchor=\"middle\">SW1</text><rect x=\"220\" y=\"60\" width=\"70\" height=\"28\" rx=\"4\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"255\" y=\"78\" text-anchor=\"middle\">SW2</text><line x1=\"100\" y1=\"74\" x2=\"220\" y2=\"74\" stroke=\"#B45309\" stroke-width=\"2\"/><text x=\"160\" y=\"66\" text-anchor=\"middle\" font-size=\"9\">? link</text><text x=\"65\" y=\"112\" text-anchor=\"middle\" font-size=\"9\">v10 v20</text><text x=\"255\" y=\"112\" text-anchor=\"middle\" font-size=\"9\">v10 v20</text></g></svg>",
        "choices": [
          "An access port",
          "An 802.1Q trunk",
          "A native-VLAN-only port",
          "A routed Layer 3 port"
        ],
        "answer": 1,
        "explain": "Carrying multiple VLANs between switches requires an 802.1Q trunk so each frame is tagged with its VLAN ID; an access port would carry only one VLAN."
      },
      {
        "type": "topology",
        "stem": "An IP phone connects to switch port g0/3, and a PC plugs into the back of the phone. The PC's data is VLAN 10 and the phone's voice is VLAN 20 over the same cable. What is g0/3?",
        "svg": "<svg viewBox=\"0 0 320 150\" role=\"img\" aria-label=\"Phone daisy-chained PC on one switch access port carrying data and voice VLANs\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"120\" y=\"15\" width=\"80\" height=\"28\" rx=\"4\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"160\" y=\"33\" text-anchor=\"middle\">SW g0/3</text><rect x=\"125\" y=\"70\" width=\"70\" height=\"24\" rx=\"3\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"160\" y=\"86\" text-anchor=\"middle\" font-size=\"9\">Phone v20</text><rect x=\"125\" y=\"115\" width=\"70\" height=\"24\" rx=\"3\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"160\" y=\"131\" text-anchor=\"middle\" font-size=\"9\">PC v10</text><line x1=\"160\" y1=\"43\" x2=\"160\" y2=\"70\" stroke=\"#57534E\" stroke-width=\"2\"/><line x1=\"160\" y1=\"94\" x2=\"160\" y2=\"115\" stroke=\"#57534E\" stroke-width=\"2\"/></g></svg>",
        "choices": [
          "A trunk carrying all VLANs",
          "An access port with a voice VLAN",
          "A routed port",
          "A native VLAN port"
        ],
        "answer": 1,
        "explain": "An access port with switchport voice vlan carries untagged data in the access VLAN and 802.1Q-tagged voice in the voice VLAN, the standard IP-phone connection."
      },
      {
        "type": "topology",
        "stem": "A multilayer switch has SVIs for VLAN 10 (10.1.10.1) and VLAN 20 (10.1.20.1) with ip routing enabled. PC-A in VLAN 10 pings PC-B in VLAN 20. What device routes between them?",
        "svg": "<svg viewBox=\"0 0 320 150\" role=\"img\" aria-label=\"Layer 3 switch with two SVIs routing between two VLANs\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"110\" y=\"55\" width=\"100\" height=\"34\" rx=\"4\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"160\" y=\"70\" text-anchor=\"middle\" font-size=\"9\">L3 SW</text><text x=\"160\" y=\"83\" text-anchor=\"middle\" font-size=\"8\">SVI10 SVI20</text><rect x=\"20\" y=\"115\" width=\"60\" height=\"22\" rx=\"3\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"50\" y=\"130\" text-anchor=\"middle\" font-size=\"9\">PC-A v10</text><rect x=\"240\" y=\"115\" width=\"60\" height=\"22\" rx=\"3\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"270\" y=\"130\" text-anchor=\"middle\" font-size=\"9\">PC-B v20</text><line x1=\"80\" y1=\"115\" x2=\"120\" y2=\"89\" stroke=\"#57534E\" stroke-width=\"2\"/><line x1=\"240\" y1=\"115\" x2=\"200\" y2=\"89\" stroke=\"#57534E\" stroke-width=\"2\"/></g></svg>",
        "choices": [
          "An external router over a trunk",
          "The Layer 3 switch itself, using its SVIs",
          "STP root bridge",
          "The native VLAN"
        ],
        "answer": 1,
        "explain": "With ip routing on and an SVI per VLAN, the multilayer switch routes between VLANs internally; each SVI is the default gateway for its VLAN, so no external router is required."
      },
      {
        "type": "topology",
        "stem": "SW1's trunk to SW2 has native VLAN 1 while SW2's end has native VLAN 99. Hosts in VLAN 1 lose connectivity and a CDP mismatch is logged. What is the fix?",
        "svg": "<svg viewBox=\"0 0 320 150\" role=\"img\" aria-label=\"Trunk between two switches with mismatched native VLAN\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"30\" y=\"60\" width=\"70\" height=\"28\" rx=\"4\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"65\" y=\"78\" text-anchor=\"middle\">SW1</text><rect x=\"220\" y=\"60\" width=\"70\" height=\"28\" rx=\"4\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"255\" y=\"78\" text-anchor=\"middle\">SW2</text><line x1=\"100\" y1=\"74\" x2=\"220\" y2=\"74\" stroke=\"#B45309\" stroke-width=\"2\"/><text x=\"65\" y=\"108\" text-anchor=\"middle\" font-size=\"9\">native 1</text><text x=\"255\" y=\"108\" text-anchor=\"middle\" font-size=\"9\">native 99</text></g></svg>",
        "choices": [
          "Change one side so both ends use the same native VLAN",
          "Convert the link to an access port",
          "Disable STP on the trunk",
          "Add more VLANs to the allowed list"
        ],
        "answer": 0,
        "explain": "Both ends of an 802.1Q trunk must agree on the native VLAN. Setting both to the same value (e.g. 99) clears the mismatch and restores untagged-VLAN connectivity."
      }
    ],
    "applied": [
      {
        "type": "mcq",
        "stem": "Router-on-a-stick provides inter-VLAN routing using what on the router?",
        "choices": [
          "One subinterface per VLAN with dot1q tagging",
          "A separate physical port per VLAN",
          "An SVI per VLAN",
          "A trunk to the ISP"
        ],
        "answer": 0,
        "explain": "ROAS uses subinterfaces (e.g. g0/0.10) each with encapsulation dot1q <vlan> and an IP, over one trunked physical link to the switch."
      },
      {
        "type": "mcq",
        "stem": "On a multilayer switch, what provides the default gateway IP for VLAN 30?",
        "choices": [
          "A subinterface g0/0.30",
          "A switch virtual interface (interface vlan 30)",
          "A loopback",
          "The native VLAN"
        ],
        "answer": 1,
        "explain": "A multilayer switch uses an SVI (interface vlan 30) with an IP as the gateway and routes between VLANs internally once ip routing is enabled."
      },
      {
        "type": "mcq",
        "stem": "A new IP phone is plugged into an access port configured only with switchport access vlan 10. The phone gets no voice VLAN. What command is missing?",
        "choices": [
          "switchport mode trunk",
          "switchport voice vlan 20",
          "switchport trunk native vlan 20",
          "encapsulation dot1q 20"
        ],
        "answer": 1,
        "explain": "switchport voice vlan 20 tells the access port to also carry 802.1Q-tagged voice traffic in VLAN 20 while the PC's data stays untagged in VLAN 10."
      },
      {
        "type": "mcq",
        "stem": "You configure interface g0/0.10 with encapsulation dot1q 10 but hosts in VLAN 10 still cannot reach other VLANs. The switch port to the router is in access mode. What is the fix?",
        "choices": [
          "Add more subinterfaces",
          "Change the switch port to an 802.1Q trunk",
          "Remove the dot1q encapsulation",
          "Enable ip routing on the switch"
        ],
        "answer": 1,
        "explain": "Router-on-a-stick requires the switch-side link to be a trunk so tagged frames for each VLAN reach the matching subinterface. An access port carries only one untagged VLAN."
      },
      {
        "type": "mcq",
        "stem": "Frames for VLAN 50 are not crossing a trunk even though the trunk is up and VLAN 50 exists on both switches. What is the most likely cause?",
        "choices": [
          "Native VLAN mismatch",
          "VLAN 50 is missing from the trunk's allowed VLAN list",
          "The trunk uses ISL",
          "STP elected a different root"
        ],
        "answer": 1,
        "explain": "switchport trunk allowed vlan limits which VLANs cross the trunk. If VLAN 50 is pruned from the allowed list, its frames are dropped even though the trunk is operational."
      }
    ],
    "scope": [
      {
        "type": "mcq",
        "stem": "An access port carries how many VLANs and tags frames how?",
        "choices": [
          "Many VLANs, 802.1Q tagged",
          "One VLAN, untagged",
          "One VLAN, tagged",
          "All VLANs, ISL tagged"
        ],
        "answer": 1,
        "explain": "Access = one VLAN, frames sent untagged to the end device. Trunk = many VLANs, each tagged with 802.1Q."
      },
      {
        "type": "mcq",
        "stem": "Which inter-VLAN routing method scales better and is preferred in a campus where many VLANs need routing at wire speed?",
        "choices": [
          "Router-on-a-stick with subinterfaces",
          "A Layer 3 switch using SVIs",
          "A separate physical router port per VLAN",
          "Trunking every host port"
        ],
        "answer": 1,
        "explain": "A Layer 3 switch with SVIs routes between VLANs in hardware at wire speed and scales to many VLANs, whereas router-on-a-stick funnels all inter-VLAN traffic through one trunk link."
      },
      {
        "type": "mcq",
        "stem": "What is the default native VLAN on a Cisco 802.1Q trunk?",
        "choices": [
          "VLAN 0",
          "VLAN 1",
          "VLAN 99",
          "VLAN 1002"
        ],
        "answer": 1,
        "explain": "VLAN 1 is the default native (and default access) VLAN. Best practice is to change it to an unused VLAN for security."
      },
      {
        "type": "mcq",
        "stem": "Which trunking encapsulation is tested on the CCNA and supported on modern Cisco switches?",
        "choices": [
          "ISL",
          "802.1Q",
          "LACP",
          "VTP"
        ],
        "answer": 1,
        "explain": "802.1Q is the only trunk encapsulation on the exam. ISL is Cisco-proprietary and deprecated; LACP and VTP are not encapsulation methods."
      },
      {
        "type": "mcq",
        "stem": "How many bits does the 802.1Q tag use for the VLAN ID, and what usable VLAN range results?",
        "choices": [
          "8 bits, VLANs 1-254",
          "10 bits, VLANs 1-1023",
          "12 bits, VLANs 1-4094",
          "16 bits, VLANs 1-65534"
        ],
        "answer": 2,
        "explain": "The 802.1Q tag carries a 12-bit VLAN ID, so VLANs 1-4094 are usable (0 and 4095 are reserved). The tag also holds TPID 0x8100 and a 3-bit CoS priority field."
      }
    ]
  },
  "7": {
    "concept": [
      {
        "type": "mcq",
        "stem": "Why bundle multiple physical links into one EtherChannel?",
        "choices": [
          "To create more broadcast domains",
          "To aggregate bandwidth and keep STP from blocking the redundant links",
          "To run a different VLAN on each link",
          "To increase the interface MTU"
        ],
        "answer": 1,
        "explain": "EtherChannel makes several links act as one logical link, so STP sees one port and forwards on it, giving aggregated bandwidth plus redundancy."
      },
      {
        "type": "mcq",
        "stem": "Which protocol is the IEEE open standard for negotiating an EtherChannel?",
        "choices": [
          "PAgP",
          "LACP",
          "DTP",
          "VTP"
        ],
        "answer": 1,
        "explain": "LACP (802.3ad) is the open standard. PAgP is the Cisco-proprietary equivalent and the two cannot be mixed on the same channel."
      },
      {
        "type": "mcq",
        "stem": "A member link refuses to join an EtherChannel. Which group of parameters must be identical on every member for the bundle to form?",
        "choices": [
          "IP address, hostname, and serial number",
          "Speed, duplex, and VLAN/trunk configuration",
          "Cable length, MTU, and STP cost only",
          "Routing protocol and process ID"
        ],
        "answer": 1,
        "explain": "All members must match speed, duplex, switchport mode, and VLAN/trunk/native-VLAN settings. A mismatch on any of these stops the port from bundling."
      },
      {
        "type": "mcq",
        "stem": "How does an EtherChannel decide which member link carries a given frame?",
        "choices": [
          "Round-robin one frame per link",
          "A hash of address fields (such as src-dst-ip or src-dst-mac) maps a flow to one link",
          "The lowest-numbered port carries everything",
          "Frames are duplicated on all links"
        ],
        "answer": 1,
        "explain": "Load balancing is hash-based per flow, not round-robin. A single conversation stays on one member link, so a 2x1Gb bundle does not give one flow 2Gb."
      },
      {
        "type": "mcq",
        "stem": "When two switches bundle three links into one EtherChannel, how does Spanning Tree treat the bundle?",
        "choices": [
          "As three separate links, blocking two",
          "As one logical link, so none of the members are blocked",
          "It disables STP on those ports",
          "It elects one member as root port and blocks the rest"
        ],
        "answer": 1,
        "explain": "STP runs over the logical port-channel interface, not the individual members, so all member links forward and full bandwidth is usable."
      },
      {
        "type": "mcq",
        "stem": "Which statement about PAgP is correct?",
        "choices": [
          "PAgP is the IEEE open standard",
          "PAgP is Cisco proprietary and cannot interoperate with LACP",
          "PAgP and LACP can be mixed on the two ends of one channel",
          "PAgP only works on Layer 3 ports"
        ],
        "answer": 1,
        "explain": "PAgP is Cisco proprietary. Both ends must run the same negotiation protocol; you cannot put LACP on one side and PAgP on the other."
      }
    ],
    "config": [
      {
        "type": "config",
        "stem": "Bundle interfaces g0/1 and g0/2 into an EtherChannel using the open-standard negotiation protocol in its actively-initiating mode (channel-group 1), then verify.",
        "lines": [
          "interface range g0/1 - 2",
          "channel-group 1 mode active"
        ],
        "show": "show etherchannel summary",
        "hint": "Use the negotiation protocol that is an IEEE open standard, in the mode that initiates rather than only responding. Apply it to both members at once with a range."
      },
      {
        "type": "config",
        "stem": "Make the existing port-channel 1 interface an 802.1Q trunk so the bundle carries tagged VLAN traffic and the members inherit the setting.",
        "lines": [
          "interface port-channel 1",
          "switchport mode trunk"
        ],
        "show": "show interfaces port-channel 1 switchport",
        "hint": "Set the switchport behavior once on the logical channel interface; the members inherit it. Choose the mode that tags multiple VLANs."
      },
      {
        "type": "config",
        "stem": "Configure interface g0/1 and g0/2 for Cisco's proprietary negotiation protocol in the mode that actively initiates (channel-group 2), then verify.",
        "lines": [
          "interface range g0/1 - 2",
          "channel-group 2 mode desirable"
        ],
        "show": "show etherchannel summary",
        "hint": "Pick the Cisco-only protocol, and the keyword that initiates negotiation rather than the one that only waits to be asked."
      },
      {
        "type": "config",
        "stem": "Build a static EtherChannel with no negotiation protocol on g0/3 and g0/4 (channel-group 3), then verify.",
        "lines": [
          "interface range g0/3 - 4",
          "channel-group 3 mode on"
        ],
        "show": "show etherchannel summary",
        "hint": "Use the mode that forms the channel unconditionally with no LACP and no PAgP. Both ends must use this same mode or a loop can form."
      },
      {
        "type": "config",
        "stem": "Convert g0/1 and g0/2 into a Layer 3 (routed) EtherChannel using the open-standard protocol in its initiating mode, then give the logical channel an IP in the 10.1.1.0/24 network (channel-group 1).",
        "lines": [
          "interface range g0/1 - 2",
          "no switchport",
          "channel-group 1 mode active",
          "interface port-channel 1",
          "ip address 10.1.1.1 255.255.255.0"
        ],
        "show": "show etherchannel summary",
        "hint": "Members must be routed, not switched, before bundling, and the address goes on the logical channel, never on the physical members."
      }
    ],
    "sequence": [
      {
        "type": "sequence",
        "stem": "Order the steps to build a Layer 2 LACP EtherChannel between two switches.",
        "steps": [
          "Confirm both members match in speed, duplex, and VLAN/trunk config",
          "interface range g0/1 - 2",
          "channel-group 1 mode active",
          "interface port-channel 1",
          "switchport mode trunk",
          "Verify with show etherchannel summary"
        ]
      },
      {
        "type": "sequence",
        "stem": "A new EtherChannel will not come up and members show 's' (suspended). Order the troubleshooting steps.",
        "steps": [
          "Run show etherchannel summary to read the member flags",
          "Compare speed and duplex on both ends of every member",
          "Compare switchport mode and VLAN/trunk/native-VLAN settings",
          "Confirm the negotiation modes form a valid pair (no passive/passive, no on with active)",
          "Fix the mismatched parameter on the offending port",
          "Re-verify with show etherchannel summary for 'P'"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the steps to safely add a third member link (g0/3) to an existing, working LACP EtherChannel 1.",
        "steps": [
          "Match g0/3 speed, duplex, and switchport/VLAN config to the existing members",
          "interface g0/3",
          "channel-group 1 mode active",
          "Verify g0/3 joins the bundle with show etherchannel summary",
          "Confirm the new member shows 'P' (bundled)"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the steps to build a static (no-negotiation) EtherChannel on both switches.",
        "steps": [
          "Verify member ports match in speed, duplex, and VLAN config on both switches",
          "On SW1: interface range g0/1 - 2 then channel-group 1 mode on",
          "On SW2: interface range g0/1 - 2 then channel-group 1 mode on",
          "Confirm BOTH ends are mode on (mismatch risks a loop)",
          "Verify with show etherchannel summary"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the steps to build a Layer 3 routed EtherChannel with an IP on the channel.",
        "steps": [
          "interface range g0/1 - 2",
          "no switchport",
          "channel-group 1 mode active",
          "interface port-channel 1",
          "ip address 10.1.1.1 255.255.255.0",
          "Verify with show etherchannel summary (look for RU)"
        ]
      }
    ],
    "topology": [
      {
        "type": "topology",
        "stem": "SW1 and SW2 are joined by three parallel links bundled into one EtherChannel. How many of these member links does STP block?",
        "svg": "<svg viewBox=\"0 0 320 150\" role=\"img\" aria-label=\"Two switches joined by three bundled links\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"30\" y=\"55\" width=\"60\" height=\"40\" rx=\"5\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"60\" y=\"80\" text-anchor=\"middle\">SW1</text><rect x=\"230\" y=\"55\" width=\"60\" height=\"40\" rx=\"5\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"260\" y=\"80\" text-anchor=\"middle\">SW2</text><line x1=\"90\" y1=\"62\" x2=\"230\" y2=\"62\" stroke=\"#57534E\" stroke-width=\"2\"/><line x1=\"90\" y1=\"75\" x2=\"230\" y2=\"75\" stroke=\"#57534E\" stroke-width=\"2\"/><line x1=\"90\" y1=\"88\" x2=\"230\" y2=\"88\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"160\" y=\"120\" text-anchor=\"middle\" font-size=\"9\" fill=\"#B45309\">Port-channel 1 (3 links)</text></g></svg>",
        "choices": [
          "Two of the three",
          "One of the three",
          "None, the bundle is one logical link",
          "All three"
        ],
        "answer": 2,
        "explain": "STP runs over the single logical port-channel, so every member forwards. None are blocked and all three links' bandwidth is usable."
      },
      {
        "type": "topology",
        "stem": "SW1 g0/1-2 is set to LACP active. SW2 g0/1-2 is set to LACP passive. Does the channel form?",
        "svg": "<svg viewBox=\"0 0 320 150\" role=\"img\" aria-label=\"Two switches, one active one passive\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"25\" y=\"55\" width=\"70\" height=\"40\" rx=\"5\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"60\" y=\"72\" text-anchor=\"middle\">SW1</text><text x=\"60\" y=\"88\" text-anchor=\"middle\" font-size=\"9\" fill=\"#B45309\">active</text><rect x=\"225\" y=\"55\" width=\"70\" height=\"40\" rx=\"5\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"260\" y=\"72\" text-anchor=\"middle\">SW2</text><text x=\"260\" y=\"88\" text-anchor=\"middle\" font-size=\"9\" fill=\"#B45309\">passive</text><line x1=\"95\" y1=\"68\" x2=\"225\" y2=\"68\" stroke=\"#57534E\" stroke-width=\"2\"/><line x1=\"95\" y1=\"82\" x2=\"225\" y2=\"82\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"160\" y=\"125\" text-anchor=\"middle\" font-size=\"9\">LACP</text></g></svg>",
        "choices": [
          "No, both sides must be active",
          "Yes, active initiates and passive responds",
          "No, passive cannot bundle",
          "Only if you also set mode on"
        ],
        "answer": 1,
        "explain": "active/passive is valid because at least one side (active) initiates and the other (passive) responds. Only passive/passive fails."
      },
      {
        "type": "topology",
        "stem": "SW1 g0/1-2 are LACP active. The two members run at different speeds (1G and 100M). What is the result?",
        "svg": "<svg viewBox=\"0 0 320 150\" role=\"img\" aria-label=\"Members with mismatched speed\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"25\" y=\"50\" width=\"70\" height=\"50\" rx=\"5\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"60\" y=\"78\" text-anchor=\"middle\">SW1</text><rect x=\"225\" y=\"50\" width=\"70\" height=\"50\" rx=\"5\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"260\" y=\"78\" text-anchor=\"middle\">SW2</text><line x1=\"95\" y1=\"63\" x2=\"225\" y2=\"63\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"160\" y=\"59\" text-anchor=\"middle\" font-size=\"8\" fill=\"#B45309\">g0/1 1G</text><line x1=\"95\" y1=\"88\" x2=\"225\" y2=\"88\" stroke=\"#57534E\" stroke-width=\"2\" stroke-dasharray=\"4 3\"/><text x=\"160\" y=\"84\" text-anchor=\"middle\" font-size=\"8\" fill=\"#B45309\">g0/2 100M</text></g></svg>",
        "choices": [
          "Both links bundle and average the speed",
          "The mismatched member is suspended or refused from the bundle",
          "The channel runs at the faster speed on both",
          "Speed does not matter for EtherChannel"
        ],
        "answer": 1,
        "explain": "All members must match speed and duplex. A member that differs will not bundle (shown suspended), so verify identical port settings before bundling."
      },
      {
        "type": "topology",
        "stem": "SW1 members are LACP active; SW2 members are static mode on. What happens to the link?",
        "svg": "<svg viewBox=\"0 0 320 150\" role=\"img\" aria-label=\"LACP active versus static on mismatch\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"25\" y=\"55\" width=\"70\" height=\"40\" rx=\"5\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"60\" y=\"72\" text-anchor=\"middle\">SW1</text><text x=\"60\" y=\"88\" text-anchor=\"middle\" font-size=\"9\" fill=\"#B45309\">active</text><rect x=\"225\" y=\"55\" width=\"70\" height=\"40\" rx=\"5\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"260\" y=\"72\" text-anchor=\"middle\">SW2</text><text x=\"260\" y=\"88\" text-anchor=\"middle\" font-size=\"9\" fill=\"#B45309\">on</text><line x1=\"95\" y1=\"68\" x2=\"225\" y2=\"68\" stroke=\"#57534E\" stroke-width=\"2\" stroke-dasharray=\"4 3\"/><line x1=\"95\" y1=\"82\" x2=\"225\" y2=\"82\" stroke=\"#57534E\" stroke-width=\"2\" stroke-dasharray=\"4 3\"/><text x=\"160\" y=\"125\" text-anchor=\"middle\" font-size=\"9\">no channel</text></g></svg>",
        "choices": [
          "A normal LACP channel forms",
          "No channel forms; mode on cannot pair with active/passive",
          "It forms a PAgP channel",
          "It forms but only on one link"
        ],
        "answer": 1,
        "explain": "mode on does no negotiation and is incompatible with active or passive. The two ends must both negotiate (LACP) or both be on."
      },
      {
        "type": "topology",
        "stem": "Two Layer 3 switches connect with a routed EtherChannel carrying an IP on the port-channel. Where must the IP address be configured?",
        "svg": "<svg viewBox=\"0 0 320 150\" role=\"img\" aria-label=\"Routed EtherChannel between L3 switches\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"25\" y=\"50\" width=\"75\" height=\"50\" rx=\"5\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"62\" y=\"72\" text-anchor=\"middle\">L3-SW1</text><text x=\"62\" y=\"90\" text-anchor=\"middle\" font-size=\"8\" fill=\"#B45309\">Po1 .1</text><rect x=\"220\" y=\"50\" width=\"75\" height=\"50\" rx=\"5\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"257\" y=\"72\" text-anchor=\"middle\">L3-SW2</text><text x=\"257\" y=\"90\" text-anchor=\"middle\" font-size=\"8\" fill=\"#B45309\">Po1 .2</text><line x1=\"100\" y1=\"68\" x2=\"220\" y2=\"68\" stroke=\"#57534E\" stroke-width=\"2\"/><line x1=\"100\" y1=\"82\" x2=\"220\" y2=\"82\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"160\" y=\"125\" text-anchor=\"middle\" font-size=\"9\">10.1.1.0/24</text></g></svg>",
        "choices": [
          "On each physical member interface",
          "On the logical port-channel interface, with members set to no switchport",
          "On a VLAN SVI only",
          "IPs are not allowed on EtherChannel"
        ],
        "answer": 1,
        "explain": "For a Layer 3 EtherChannel, set members to no switchport and put the IP on interface port-channel. Never address the physical members."
      }
    ],
    "applied": [
      {
        "type": "mcq",
        "stem": "You want an EtherChannel to form only if the other side also negotiates with the open standard. Which local mode pair works?",
        "choices": [
          "on / on",
          "active / passive (or active/active)",
          "desirable / passive",
          "auto / auto"
        ],
        "answer": 1,
        "explain": "LACP active initiates; passive only responds. active/active or active/passive forms the channel. passive/passive never initiates so it fails."
      },
      {
        "type": "mcq",
        "stem": "Which configuration approach lets the port-channel interface push its switchport settings to all members automatically?",
        "choices": [
          "Configure each member separately",
          "Configure switchport settings on interface port-channel; members inherit them",
          "Use mode on so no settings are needed",
          "Configure settings on the SVI"
        ],
        "answer": 1,
        "explain": "Best practice is to apply trunk/access and VLAN settings on the logical port-channel; the bundled members inherit that config, avoiding per-port mismatch."
      },
      {
        "type": "mcq",
        "stem": "A single large file transfer between two hosts crosses a 2x1Gb EtherChannel but never exceeds about 1Gb. Why?",
        "choices": [
          "The channel is misconfigured",
          "Hash-based load balancing pins one conversation to one member link",
          "EtherChannel caps each channel at 1Gb",
          "STP is blocking the second link"
        ],
        "answer": 1,
        "explain": "Load balancing hashes per flow. A single src/dst conversation maps to one member, so it cannot exceed one link's speed even though aggregate capacity is 2Gb."
      },
      {
        "type": "mcq",
        "stem": "What is the maximum number of physical links you can have actively bundled in one EtherChannel?",
        "choices": [
          "2",
          "4",
          "8",
          "16"
        ],
        "answer": 2,
        "explain": "A Cisco EtherChannel supports up to 8 active member links per bundle."
      },
      {
        "type": "mcq",
        "stem": "An administrator sets one side to LACP passive and the other side to PAgP auto. What forms?",
        "choices": [
          "A working LACP channel",
          "A working PAgP channel",
          "No channel; LACP and PAgP cannot interoperate",
          "A static channel"
        ],
        "answer": 2,
        "explain": "The two ends run different negotiation protocols. LACP cannot talk to PAgP, so no channel forms regardless of the active/passive wording."
      }
    ],
    "scope": [
      {
        "type": "mcq",
        "stem": "Which combination will NOT form an EtherChannel?",
        "choices": [
          "active / active",
          "desirable / auto",
          "passive / passive",
          "on / on"
        ],
        "answer": 2,
        "explain": "passive/passive fails because neither side initiates LACP. auto/auto fails for the same PAgP reason. active/active, desirable/auto, and on/on all work."
      },
      {
        "type": "mcq",
        "stem": "In the EtherChannel summary output, which flag pair identifies a Layer 2 channel that is up and a member port that is bundled?",
        "choices": [
          "RU and D",
          "SU and P",
          "s and D",
          "RU and s"
        ],
        "answer": 1,
        "explain": "SU = Layer 2 channel in use, P = the member port is bundled. RU is a Layer 3 channel, s is suspended, and D is down."
      },
      {
        "type": "mcq",
        "stem": "A member port displays the flag 's' in the EtherChannel summary. What does that tell you and what should you check?",
        "choices": [
          "It is bundled and forwarding; nothing to do",
          "It is suspended; check for a speed, duplex, or VLAN/trunk mismatch with the neighbor",
          "It is a routed port; assign an IP",
          "It is the STP root; lower its priority"
        ],
        "answer": 1,
        "explain": "'s' means suspended. A member is suspended when its parameters do not match the other end, so compare speed, duplex, switchport mode, and VLAN/trunk/native-VLAN settings."
      },
      {
        "type": "mcq",
        "stem": "For a Layer 3 EtherChannel, what must be done to the physical member interfaces first?",
        "choices": [
          "switchport mode trunk",
          "no switchport (make them routed)",
          "Assign each an IP address",
          "switchport access vlan 1"
        ],
        "answer": 1,
        "explain": "Layer 3 members must be routed ports (no switchport) before bundling. The IP goes on the port-channel, not on the physical members."
      },
      {
        "type": "mcq",
        "stem": "Match the mode to its protocol: which pair lists only PAgP keywords?",
        "choices": [
          "active / passive",
          "desirable / auto",
          "on / active",
          "active / auto"
        ],
        "answer": 1,
        "explain": "PAgP uses desirable (initiates) and auto (responds). active/passive are LACP keywords. on is static."
      }
    ]
  },
  "8": {
    "concept": [
      {
        "type": "mcq",
        "stem": "Which capability is unique to an extended ACL versus a standard ACL?",
        "choices": [
          "Filtering by destination IP, protocol, and port",
          "Ending with an implicit deny",
          "Being applied with ip access-group",
          "Using wildcard masks"
        ],
        "answer": 0,
        "explain": "Extended ACLs add destination IP, protocol (TCP/UDP/ICMP), and port matching. The other three behaviors apply to every IPv4 ACL type. Extended ACLs are the most heavily tested ACL type."
      },
      {
        "type": "mcq",
        "stem": "What is the single criterion a standard IPv4 ACL can match on?",
        "choices": [
          "Source IP address only",
          "Destination IP and port",
          "Protocol and port number",
          "Source and destination IP"
        ],
        "answer": 0,
        "explain": "Standard ACLs match the SOURCE IP address only. No destination, no protocol, no port. That limitation drives the near-destination placement rule."
      },
      {
        "type": "mcq",
        "stem": "A packet matches no permit statement in an applied ACL. What happens to it?",
        "choices": [
          "Forwarded by default",
          "Dropped by the implicit deny any",
          "Logged then forwarded",
          "Sent to the next ACL"
        ],
        "answer": 1,
        "explain": "Every ACL ends with an invisible implicit deny any. Traffic that matches no entry is dropped, even though the deny is not shown in the output."
      },
      {
        "type": "mcq",
        "stem": "How are ACL entries evaluated when a packet arrives?",
        "choices": [
          "Most specific entry first",
          "Bottom-up, last match wins",
          "Top-down, first match wins",
          "All entries, then summarized"
        ],
        "answer": 2,
        "explain": "ACLs are processed top-down and stop at the FIRST match, applying that entry's action. Order of statements is critical: a specific deny must precede a broader permit."
      },
      {
        "type": "mcq",
        "stem": "In a wildcard mask, what do a 0 bit and a 1 bit mean respectively?",
        "choices": [
          "0 = ignore, 1 = match",
          "0 = permit, 1 = deny",
          "0 = must match, 1 = ignore",
          "0 = host, 1 = network"
        ],
        "answer": 2,
        "explain": "Wildcard masks are the inverse of a subnet mask: 0 = the bit must match exactly, 1 = ignore (do not care)."
      },
      {
        "type": "mcq",
        "stem": "How many ACLs can be active on one router interface at the same time?",
        "choices": [
          "One per interface total",
          "One inbound and one outbound",
          "Unlimited",
          "One per VLAN"
        ],
        "answer": 1,
        "explain": "The limit is one ACL per interface, per direction, per protocol. So one inbound and one outbound IPv4 ACL can coexist on the same interface."
      }
    ],
    "config": [
      {
        "type": "config",
        "stem": "Build numbered extended ACL 100 that permits HTTP from the 10.1.1.0/24 subnet to web server 172.16.5.10, then apply it inbound on GigabitEthernet0/0.",
        "lines": [
          "access-list 100 permit tcp 10.1.1.0 0.0.0.255 host 172.16.5.10 eq 80",
          "interface GigabitEthernet0/0",
          "ip access-group 100 in"
        ],
        "show": "show ip access-lists",
        "hint": "Web traffic rides TCP on its well-known port. A single server is an exact-match host. Filter close to where the traffic originates, and apply on the interface using the direction seen from the router. Derive the source wildcard from the /24."
      },
      {
        "type": "config",
        "stem": "Build numbered standard ACL 10 that permits only the 192.168.1.0/24 subnet, then apply it inbound on GigabitEthernet0/1.",
        "lines": [
          "access-list 10 permit 192.168.1.0 0.0.0.255",
          "interface GigabitEthernet0/1",
          "ip access-group 10 in"
        ],
        "show": "show ip access-lists",
        "hint": "A /24 means the last octet is the part you do not care about, so derive the wildcard from the prefix length. Apply ACLs with the group keyword and pick the direction from the router's own point of view. The invisible final deny means you only list what you want to allow."
      },
      {
        "type": "config",
        "stem": "Build numbered standard ACL 20 that permits only the 172.16.16.0/20 block, then apply it inbound on GigabitEthernet0/1. Derive the wildcard from the prefix length.",
        "lines": [
          "access-list 20 permit 172.16.16.0 0.0.15.255",
          "interface GigabitEthernet0/1",
          "ip access-group 20 in"
        ],
        "show": "show ip access-lists",
        "hint": "A /20 leaves twelve host bits, so the third octet is only partly fixed. Work out the inverse of the subnet mask one octet at a time (255 minus each subnet-mask octet) to get the wildcard before you write the permit line."
      },
      {
        "type": "config",
        "stem": "Build numbered extended ACL 110 that DENIES all ICMP from any source to any destination but still permits all other IP, then apply it inbound on GigabitEthernet0/2.",
        "lines": [
          "access-list 110 deny icmp any any",
          "access-list 110 permit ip any any",
          "interface GigabitEthernet0/2",
          "ip access-group 110 in"
        ],
        "show": "show ip access-lists",
        "hint": "Order matters: the specific block must come before the catch-all permit, or first-match logic lets everything through. Without an explicit permit at the end, the implicit deny would drop all remaining traffic."
      },
      {
        "type": "config",
        "stem": "Create a NAMED extended ACL called WEB_FILTER that permits HTTPS from any host to server 172.16.5.10, then apply it inbound on GigabitEthernet0/0.",
        "lines": [
          "ip access-list extended WEB_FILTER",
          "permit tcp any host 172.16.5.10 eq 443",
          "exit",
          "interface GigabitEthernet0/0",
          "ip access-group WEB_FILTER in"
        ],
        "show": "show ip access-lists",
        "hint": "Named ACLs are entered with the access-list configuration mode, then statements are typed without the list-number prefix. Secure web uses TCP on its well-known port. Match any source going to one exact host."
      },
      {
        "type": "config",
        "stem": "Restrict VTY (remote login) access so only host 192.168.1.5 may connect, using numbered standard ACL 10.",
        "lines": [
          "access-list 10 permit host 192.168.1.5",
          "line vty 0 4",
          "access-class 10 in"
        ],
        "show": "show ip access-lists",
        "hint": "Remote-login lines use a different apply keyword than data interfaces. A standard ACL is enough because you only need the admin's source address. The implicit deny handles everyone else."
      }
    ],
    "sequence": [
      {
        "type": "sequence",
        "stem": "Order how a router evaluates a packet against an applied ACL.",
        "steps": [
          "Evaluate entries top-down starting at the first line",
          "Stop at the first matching entry and apply its permit or deny action",
          "If no entry matched, apply the implicit deny any and drop the packet"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the steps to configure and apply a numbered extended ACL that filters an interface near the source.",
        "steps": [
          "Create the access-list entries in global config (permit/deny by source, dest, protocol, port)",
          "Enter the interface closest to the source with the interface command",
          "Apply the ACL with ip access-group <n> in or out",
          "Verify with show ip access-lists"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order these ACL entries so a single host is denied while the rest of its subnet is permitted (first-match correct order).",
        "steps": [
          "deny host 10.1.1.5",
          "permit 10.1.1.0 0.0.0.255",
          "(implicit deny any blocks everything else)"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the steps to configure and apply a numbered standard ACL that filters an interface.",
        "steps": [
          "Create the access-list entries in global config (permit/deny by source)",
          "Enter the interface nearest the destination with the interface command",
          "Apply the ACL with ip access-group <n> in or out",
          "Verify with show ip access-lists"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the steps to restrict VTY access to a single admin subnet with a standard ACL.",
        "steps": [
          "Create the standard ACL permitting the admin source subnet",
          "Enter line vty 0 4 (or 0 15)",
          "Apply with access-class <n> in",
          "Verify with show ip access-lists"
        ]
      }
    ],
    "topology": [
      {
        "type": "topology",
        "stem": "An extended ACL must block only HTTP from LAN-A to a specific server. Following best practice, where should it be applied?",
        "svg": "<svg viewBox=\"0 0 320 150\" role=\"img\" aria-label=\"LAN-A behind R1, server behind R2\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"8\" y=\"60\" width=\"54\" height=\"22\" rx=\"3\" fill=\"#F0FDF4\" stroke=\"#16A34A\"/><text x=\"35\" y=\"75\" text-anchor=\"middle\" font-size=\"9\">LAN-A</text><line x1=\"62\" y1=\"71\" x2=\"100\" y2=\"71\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"81\" y=\"64\" text-anchor=\"middle\" font-size=\"8\">g0/0</text><rect x=\"100\" y=\"55\" width=\"50\" height=\"32\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"125\" y=\"75\" text-anchor=\"middle\">R1</text><line x1=\"150\" y1=\"71\" x2=\"190\" y2=\"71\" stroke=\"#57534E\" stroke-width=\"2\"/><rect x=\"190\" y=\"55\" width=\"50\" height=\"32\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"215\" y=\"75\" text-anchor=\"middle\">R2</text><line x1=\"240\" y1=\"71\" x2=\"280\" y2=\"71\" stroke=\"#57534E\" stroke-width=\"2\"/><rect x=\"268\" y=\"60\" width=\"48\" height=\"22\" rx=\"3\" fill=\"#FFF7ED\" stroke=\"#B45309\"/><text x=\"292\" y=\"75\" text-anchor=\"middle\" font-size=\"8\">Server</text></g></svg>",
        "choices": [
          "R1 inbound on g0/0 (closest to LAN-A)",
          "R2 outbound to the server",
          "On the VTY lines",
          "R2 inbound from R1"
        ],
        "answer": 0,
        "explain": "Extended ACLs go near the SOURCE. Their full granularity (source, dest, protocol, port) blocks only the unwanted HTTP early, saving bandwidth, without over-blocking other traffic."
      },
      {
        "type": "topology",
        "stem": "A standard ACL must block PC-A from reaching the Server LAN. On which router interface and direction should it go?",
        "svg": "<svg viewBox=\"0 0 320 150\" role=\"img\" aria-label=\"PC behind R1, server behind R2\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"10\" y=\"60\" width=\"50\" height=\"22\" rx=\"3\" fill=\"#F0FDF4\" stroke=\"#16A34A\"/><text x=\"35\" y=\"75\" text-anchor=\"middle\" font-size=\"9\">PC-A</text><line x1=\"60\" y1=\"71\" x2=\"100\" y2=\"71\" stroke=\"#57534E\" stroke-width=\"2\"/><rect x=\"100\" y=\"55\" width=\"50\" height=\"32\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"125\" y=\"75\" text-anchor=\"middle\">R1</text><line x1=\"150\" y1=\"71\" x2=\"190\" y2=\"71\" stroke=\"#57534E\" stroke-width=\"2\"/><rect x=\"190\" y=\"55\" width=\"50\" height=\"32\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"215\" y=\"75\" text-anchor=\"middle\">R2</text><line x1=\"240\" y1=\"71\" x2=\"280\" y2=\"71\" stroke=\"#57534E\" stroke-width=\"2\"/><rect x=\"270\" y=\"60\" width=\"46\" height=\"22\" rx=\"3\" fill=\"#FFF7ED\" stroke=\"#B45309\"/><text x=\"293\" y=\"75\" text-anchor=\"middle\" font-size=\"8\">Server</text></g></svg>",
        "choices": [
          "R1 inbound from PC-A",
          "R2 outbound toward the Server LAN",
          "R1 VTY lines",
          "It does not matter"
        ],
        "answer": 1,
        "explain": "Standard ACLs match source only, so place near the destination: R2 outbound toward the Server LAN. Placing it at R1 would block PC-A from reaching everything, not just the Server LAN."
      },
      {
        "type": "topology",
        "stem": "A standard ACL placed inbound right next to PC-A (instead of near the destination) produces what unintended result?",
        "svg": "<svg viewBox=\"0 0 320 150\" role=\"img\" aria-label=\"PC-A near R1 with wrong placement\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"10\" y=\"60\" width=\"50\" height=\"22\" rx=\"3\" fill=\"#F0FDF4\" stroke=\"#16A34A\"/><text x=\"35\" y=\"75\" text-anchor=\"middle\" font-size=\"9\">PC-A</text><line x1=\"60\" y1=\"71\" x2=\"100\" y2=\"71\" stroke=\"#57534E\" stroke-width=\"2\"/><rect x=\"100\" y=\"55\" width=\"50\" height=\"32\" rx=\"5\" fill=\"#FEE2E2\" stroke=\"#DC2626\"/><text x=\"125\" y=\"75\" text-anchor=\"middle\">R1</text><line x1=\"150\" y1=\"71\" x2=\"200\" y2=\"71\" stroke=\"#57534E\" stroke-width=\"2\"/><rect x=\"200\" y=\"48\" width=\"50\" height=\"20\" rx=\"3\" fill=\"#FFF7ED\" stroke=\"#B45309\"/><text x=\"225\" y=\"62\" text-anchor=\"middle\" font-size=\"8\">Srv-B</text><rect x=\"200\" y=\"78\" width=\"50\" height=\"20\" rx=\"3\" fill=\"#FFF7ED\" stroke=\"#B45309\"/><text x=\"225\" y=\"92\" text-anchor=\"middle\" font-size=\"8\">Srv-C</text></g></svg>",
        "choices": [
          "Blocks PC-A only from Srv-B",
          "Blocks PC-A from ALL destinations, not just the intended server",
          "Has no effect",
          "Only blocks VTY access"
        ],
        "answer": 1,
        "explain": "A standard ACL matches source IP only. Near the source it blocks PC-A from reaching every destination (Srv-B and Srv-C), which is why standard ACLs belong near the destination."
      },
      {
        "type": "topology",
        "stem": "An ACL is applied inbound on R1's g0/0 facing the LAN. From the router's perspective, which traffic does it filter?",
        "svg": "<svg viewBox=\"0 0 320 140\" role=\"img\" aria-label=\"LAN to router interface direction\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"8\" y=\"55\" width=\"60\" height=\"26\" rx=\"3\" fill=\"#F0FDF4\" stroke=\"#16A34A\"/><text x=\"38\" y=\"72\" text-anchor=\"middle\" font-size=\"9\">LAN</text><line x1=\"68\" y1=\"68\" x2=\"140\" y2=\"68\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"104\" y=\"60\" text-anchor=\"middle\" font-size=\"8\">g0/0 in</text><rect x=\"140\" y=\"50\" width=\"54\" height=\"36\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"167\" y=\"72\" text-anchor=\"middle\">R1</text><line x1=\"194\" y1=\"68\" x2=\"260\" y2=\"68\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"227\" y=\"60\" text-anchor=\"middle\" font-size=\"8\">g0/1</text><rect x=\"258\" y=\"55\" width=\"58\" height=\"26\" rx=\"3\" fill=\"#FFF7ED\" stroke=\"#B45309\"/><text x=\"287\" y=\"72\" text-anchor=\"middle\" font-size=\"8\">WAN</text></g></svg>",
        "choices": [
          "Traffic leaving the router toward the LAN",
          "Traffic entering the router from the LAN",
          "Only traffic between R1 and the WAN",
          "Traffic on the VTY lines"
        ],
        "answer": 1,
        "explain": "Direction is always from the router's point of view. in filters traffic coming INTO the router through that interface, so it screens packets sourced from the LAN before routing."
      },
      {
        "type": "topology",
        "stem": "Admins on 10.10.10.0/24 must be the only hosts allowed to SSH/Telnet into R1. Where is the ACL applied?",
        "svg": "<svg viewBox=\"0 0 320 150\" role=\"img\" aria-label=\"Admin subnet reaching router VTY\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"8\" y=\"58\" width=\"86\" height=\"26\" rx=\"3\" fill=\"#F0FDF4\" stroke=\"#16A34A\"/><text x=\"51\" y=\"75\" text-anchor=\"middle\" font-size=\"8\">10.10.10.0/24</text><line x1=\"94\" y1=\"71\" x2=\"150\" y2=\"71\" stroke=\"#57534E\" stroke-width=\"2\"/><rect x=\"150\" y=\"52\" width=\"54\" height=\"38\" rx=\"5\" fill=\"#FEF3C7\" stroke=\"#B45309\"/><text x=\"177\" y=\"68\" text-anchor=\"middle\">R1</text><text x=\"177\" y=\"82\" text-anchor=\"middle\" font-size=\"7\">vty 0-15</text></g></svg>",
        "choices": [
          "ip access-group on g0/0 inbound",
          "access-class on the VTY lines inbound",
          "ip access-group on g0/0 outbound",
          "On the admin PCs"
        ],
        "answer": 1,
        "explain": "Management plane access is filtered with access-class applied to the VTY lines, not ip access-group on an interface. A standard ACL matching the admin source subnet is sufficient."
      }
    ],
    "applied": [
      {
        "type": "mcq",
        "stem": "Which wildcard mask matches exactly the subnet 192.168.10.0/24?",
        "choices": [
          "0.0.0.0",
          "0.0.0.255",
          "0.0.255.255",
          "255.255.255.0"
        ],
        "answer": 1,
        "explain": "A /24 fixes the first three octets and leaves the last octet variable. The wildcard is the inverse of 255.255.255.0, which is 0.0.0.255."
      },
      {
        "type": "mcq",
        "stem": "You must permit HTTP from any host to one server but deny everything else to it. Which ACL type is required?",
        "choices": [
          "Standard (source only)",
          "Extended (source, destination, protocol, port)",
          "A MAC ACL",
          "A time-based standard ACL"
        ],
        "answer": 1,
        "explain": "Filtering by destination and port (HTTP/80) requires an extended ACL. Standard ACLs match source IP only and cannot reference a port."
      },
      {
        "type": "mcq",
        "stem": "What is the wildcard mask equivalent of the keyword host in an ACL statement?",
        "choices": [
          "255.255.255.255",
          "0.0.0.255",
          "0.0.0.0",
          "0.0.0.1"
        ],
        "answer": 2,
        "explain": "host 10.1.1.1 is shorthand for 10.1.1.1 0.0.0.0 (all bits must match, an exact single-host match). The keyword any equals 0.0.0.0 255.255.255.255."
      },
      {
        "type": "mcq",
        "stem": "An ACL lists permit 10.1.1.0 0.0.0.255 first, then deny host 10.1.1.5. Why does host 10.1.1.5 still get through?",
        "choices": [
          "The deny is malformed",
          "First-match: the host matches the permit before reaching the deny",
          "Standard ACLs ignore host statements",
          "The implicit deny overrides it"
        ],
        "answer": 1,
        "explain": "First-match processing stops at the permit, which the host falls within, so the later deny is never evaluated. The specific deny must be placed before the general permit."
      },
      {
        "type": "mcq",
        "stem": "You configured an extended ACL with only deny statements and applied it. What is the effect on traffic?",
        "choices": [
          "Only the listed traffic is denied, rest permitted",
          "All traffic is denied because of the implicit deny any",
          "The ACL is ignored as invalid",
          "Only management traffic is denied"
        ],
        "answer": 1,
        "explain": "With no permit statement, anything not explicitly denied still hits the implicit deny ip any any at the end, so the ACL drops ALL traffic. You must add an explicit permit."
      },
      {
        "type": "mcq",
        "stem": "Which wildcard mask matches exactly the subnet 172.16.8.0/22?",
        "choices": [
          "0.0.0.255",
          "0.0.3.255",
          "0.0.7.255",
          "0.0.255.255"
        ],
        "answer": 1,
        "explain": "/22 leaves the third octet partly variable: 256 - 252 = 4, minus 1 = 3, so 0.0.3.255 (covers .8 through .11 in the third octet)."
      }
    ],
    "scope": [
      {
        "type": "mcq",
        "stem": "What numeric ranges identify an extended IPv4 ACL?",
        "choices": [
          "1-99 and 1300-1999",
          "100-199 and 2000-2699",
          "200-299 only",
          "1-4094"
        ],
        "answer": 1,
        "explain": "Standard = 1-99 (plus expanded 1300-1999). Extended = 100-199 (plus expanded 2000-2699)."
      },
      {
        "type": "mcq",
        "stem": "What numeric ranges identify a standard IPv4 ACL?",
        "choices": [
          "1-99 and 1300-1999",
          "100-199 and 2000-2699",
          "0-99 only",
          "1-1024"
        ],
        "answer": 0,
        "explain": "Standard ACLs use 1-99 (original) and 1300-1999 (expanded). Extended ACLs use 100-199 and 2000-2699."
      },
      {
        "type": "mcq",
        "stem": "Which command applies an ACL to filter traffic on a routed interface?",
        "choices": [
          "access-class <n> in",
          "ip access-group <n> in",
          "service-policy <n>",
          "switchport access <n>"
        ],
        "answer": 1,
        "explain": "ip access-group applies an ACL to an interface. access-class applies an ACL to VTY lines for management access."
      },
      {
        "type": "mcq",
        "stem": "Which show command displays each ACL entry along with its sequence numbers and packet match counts?",
        "choices": [
          "show running-config",
          "show ip access-lists",
          "show ip interface brief",
          "show access-class"
        ],
        "answer": 1,
        "explain": "show ip access-lists (or show access-lists) lists every entry with its sequence number and the match counter, which is key for troubleshooting which line is being hit."
      },
      {
        "type": "mcq",
        "stem": "In an extended ACL statement, which operator matches a single TCP/UDP port number such as the well-known web port?",
        "choices": [
          "range",
          "eq",
          "gt",
          "lt"
        ],
        "answer": 1,
        "explain": "eq (equal) matches one exact port. gt/lt match greater-than/less-than a value, and range matches an inclusive span. Port operators are part of extended ACL syntax, the most heavily tested ACL type."
      },
      {
        "type": "mcq",
        "stem": "An advantage of a named ACL over a traditional numbered ACL is that it lets you do what?",
        "choices": [
          "Match Layer 2 MAC addresses",
          "Delete or insert individual entries by sequence number",
          "Skip the implicit deny",
          "Apply two ACLs per direction"
        ],
        "answer": 1,
        "explain": "Named ACLs (and modern numbered ACLs) support editing individual entries by sequence number, plus a descriptive name. They still end with an implicit deny and follow the one-per-direction rule."
      }
    ]
  },
  "9": {
    "concept": [
      {
        "type": "mcq",
        "stem": "Port security protects a switchport primarily by doing what?",
        "choices": [
          "Encrypting frames on the port",
          "Limiting which and how many MAC addresses may use the port",
          "Assigning the port a static IP",
          "Forcing the port into a trunk"
        ],
        "answer": 1,
        "explain": "Port security caps the number of (and optionally pins which) source MACs allowed on a port, blocking unauthorized devices and MAC flooding."
      },
      {
        "type": "mcq",
        "stem": "What is the default maximum number of secure MAC addresses on a port the moment port security is enabled?",
        "choices": [
          "0 (no MACs allowed)",
          "1",
          "8",
          "Unlimited"
        ],
        "answer": 1,
        "explain": "Enabling switchport port-security sets a default maximum of 1 MAC. A second source MAC triggers a violation unless the maximum is raised."
      },
      {
        "type": "mcq",
        "stem": "Port security limits MAC addresses on a port. What is the default action on a violation?",
        "choices": [
          "restrict",
          "protect",
          "shutdown (err-disable)",
          "log only"
        ],
        "answer": 2,
        "explain": "The default violation mode is shutdown, which err-disables the port. restrict and protect drop offending frames without shutting the port."
      },
      {
        "type": "mcq",
        "stem": "DHCP snooping protects against rogue DHCP servers by doing what?",
        "choices": [
          "Encrypting DHCP exchanges",
          "Trusting only specified ports for DHCP server replies",
          "Blocking all DHCP traffic on the VLAN",
          "Assigning static IPs to clients"
        ],
        "answer": 1,
        "explain": "DHCP snooping marks uplink and legitimate server ports as trusted; DHCP OFFER/ACK from untrusted (access) ports is dropped, stopping rogue servers."
      },
      {
        "type": "mcq",
        "stem": "Dynamic ARP Inspection (DAI) validates ARP packets against which table?",
        "choices": [
          "The MAC address (CAM) table",
          "The DHCP snooping binding table",
          "The routing table",
          "The CDP neighbor table"
        ],
        "answer": 1,
        "explain": "DAI checks ARP source IP-to-MAC against the DHCP snooping binding table and drops ARP that does not match, defeating ARP poisoning."
      },
      {
        "type": "mcq",
        "stem": "What must be enabled before Dynamic ARP Inspection can validate ARP on a VLAN?",
        "choices": [
          "Port security",
          "DHCP snooping",
          "A routed SVI",
          "An extended ACL"
        ],
        "answer": 1,
        "explain": "DAI needs the DHCP snooping binding table to know which IP-to-MAC pairs are legitimate. Without DHCP snooping building that table, DAI has nothing to validate against."
      },
      {
        "type": "mcq",
        "stem": "Which attack does DHCP snooping rate limiting on untrusted ports specifically defend against?",
        "choices": [
          "ARP poisoning / man-in-the-middle",
          "DHCP starvation (flooding DHCP Discover to exhaust the pool)",
          "Double-tagged VLAN hopping",
          "MAC address table overflow"
        ],
        "answer": 1,
        "explain": "Rate limiting caps DHCP packets per second on access ports, stopping an attacker who floods DHCP Discover messages to drain the address pool."
      }
    ],
    "config": [
      {
        "type": "config",
        "stem": "Pin a single known device to access port g0/7: make it a static access port, enable port security with the default max, and statically bind that one MAC so any other device trips the violation. Then verify.",
        "lines": [
          "interface g0/7",
          "switchport mode access",
          "switchport port-security",
          "switchport port-security mac-address 0011.2233.4455"
        ],
        "show": "show port-security interface g0/7",
        "hint": "Make the port a static access port first, turn the feature on (the default cap is already one), then hard-code the exact hardware address rather than letting the port learn it."
      },
      {
        "type": "config",
        "stem": "On access port g0/3, enable port security, allow up to 2 MACs, learn them automatically and persist them in the running-config, and only drop-plus-log on a violation. Then verify.",
        "lines": [
          "interface g0/3",
          "switchport mode access",
          "switchport port-security",
          "switchport port-security maximum 2",
          "switchport port-security mac-address sticky",
          "switchport port-security violation restrict"
        ],
        "show": "show port-security interface g0/3",
        "hint": "This feature only applies once the port carries a single VLAN, not a trunk. Pick the learning option that lets the port pick up allowed addresses on its own and keep them, cap how many it will hold, then choose the violation action that drops and alerts but keeps the port up."
      },
      {
        "type": "config",
        "stem": "Enable DHCP snooping globally, scope it to VLANs 10 and 20, and mark the uplink g0/1 (toward the real DHCP server) as the only port allowed to forward server replies. Then verify the binding table.",
        "lines": [
          "ip dhcp snooping",
          "ip dhcp snooping vlan 10,20",
          "interface g0/1",
          "ip dhcp snooping trust"
        ],
        "show": "show ip dhcp snooping binding",
        "hint": "Turn the feature on for the whole box first, then narrow it to the VLANs that need it. Access ports default to untrusted, so the only port that needs an explicit statement is the one facing the legitimate server."
      },
      {
        "type": "config",
        "stem": "Enable Dynamic ARP Inspection on VLANs 10 and 20, then mark the uplink g0/1 so ARP from that direction is not inspected. Then verify counters.",
        "lines": [
          "ip arp inspection vlan 10,20",
          "interface g0/1",
          "ip arp inspection trust"
        ],
        "show": "show ip arp inspection vlan 10",
        "hint": "Scope the feature to the VLANs that hold the protected hosts. Like DHCP snooping, access ports stay inspected by default, so you only relax inspection toward routers and known-good uplinks."
      },
      {
        "type": "config",
        "stem": "Configure auto-recovery so any port err-disabled by a port security violation comes back on its own after 5 minutes. Then verify which causes auto-recover.",
        "lines": [
          "errdisable recovery cause psecure-violation",
          "errdisable recovery interval 300"
        ],
        "show": "show errdisable recovery",
        "hint": "Name the specific cause tied to a secure-port violation, then set the retry timer in seconds. Five minutes is the default interval anyway."
      },
      {
        "type": "config",
        "stem": "On access port g0/5, rate limit DHCP packets to 15 per second to blunt a starvation attack. Then verify the snooping config.",
        "lines": [
          "interface g0/5",
          "ip dhcp snooping limit rate 15"
        ],
        "show": "show ip dhcp snooping",
        "hint": "A single legitimate client barely sends any DHCP per second, so cap the rate low on the untrusted access port. Exceeding the cap err-disables the port."
      }
    ],
    "sequence": [
      {
        "type": "sequence",
        "stem": "Order the steps to configure sticky port security on an access port.",
        "steps": [
          "switchport mode access",
          "switchport port-security",
          "switchport port-security maximum 2",
          "switchport port-security mac-address sticky",
          "switchport port-security violation restrict"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the steps to deploy DHCP snooping that protects VLAN 10 while letting the real server on the uplink work.",
        "steps": [
          "ip dhcp snooping",
          "ip dhcp snooping vlan 10",
          "interface g0/1",
          "ip dhcp snooping trust"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the steps to stand up Dynamic ARP Inspection on VLAN 10 with a trusted uplink. (DHCP snooping is already running.)",
        "steps": [
          "ip arp inspection vlan 10",
          "interface g0/1",
          "ip arp inspection trust"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the steps to manually recover an access port that went err-disabled from a port security violation, after the rogue device is unplugged.",
        "steps": [
          "interface g0/3",
          "shutdown",
          "no shutdown"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the steps to protect static-IP hosts under DAI using an ARP ACL on VLAN 10.",
        "steps": [
          "arp access-list STATIC_HOSTS",
          "permit ip host 10.1.1.5 mac host 0011.2233.4455",
          "exit",
          "ip arp inspection filter STATIC_HOSTS vlan 10"
        ]
      }
    ],
    "topology": [
      {
        "type": "topology",
        "stem": "An attacker plugs a hub into an access port with port security max 1, sending frames from a second MAC. With the default violation mode, what happens to the port?",
        "svg": "<svg viewBox=\"0 0 320 140\" role=\"img\" aria-label=\"Switch access port with hub and two MACs\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"11\" fill=\"#1C1917\"><rect x=\"30\" y=\"50\" width=\"60\" height=\"36\" rx=\"5\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"60\" y=\"72\" text-anchor=\"middle\">SW</text><line x1=\"90\" y1=\"68\" x2=\"150\" y2=\"68\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"120\" y=\"60\" text-anchor=\"middle\" font-size=\"8\">g0/3</text><rect x=\"150\" y=\"55\" width=\"40\" height=\"26\" rx=\"3\" fill=\"#FEF9C3\" stroke=\"#CA8A04\"/><text x=\"170\" y=\"72\" text-anchor=\"middle\" font-size=\"9\">Hub</text><rect x=\"210\" y=\"35\" width=\"50\" height=\"20\" rx=\"3\" fill=\"#F0FDF4\" stroke=\"#16A34A\"/><text x=\"235\" y=\"49\" text-anchor=\"middle\" font-size=\"8\">MAC1</text><rect x=\"210\" y=\"80\" width=\"50\" height=\"20\" rx=\"3\" fill=\"#FEE2E2\" stroke=\"#DC2626\"/><text x=\"235\" y=\"94\" text-anchor=\"middle\" font-size=\"8\">MAC2</text><line x1=\"190\" y1=\"62\" x2=\"210\" y2=\"45\" stroke=\"#57534E\" stroke-width=\"1.5\"/><line x1=\"190\" y1=\"74\" x2=\"210\" y2=\"90\" stroke=\"#57534E\" stroke-width=\"1.5\"/></g></svg>",
        "choices": [
          "It load-balances both MACs",
          "It moves to err-disabled (shut down)",
          "It silently allows both",
          "It becomes a trunk"
        ],
        "answer": 1,
        "explain": "Exceeding the max with the default shutdown violation mode err-disables the port, blocking the attack."
      },
      {
        "type": "topology",
        "stem": "Port security on access port g0/2 is set to violation mode protect, max 1. A second MAC starts sending frames through a hub. What is the visible result?",
        "svg": "<svg viewBox=\"0 0 320 140\" role=\"img\" aria-label=\"Port security protect mode with two MACs through a hub\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"10\" fill=\"#1C1917\"><rect x=\"30\" y=\"50\" width=\"60\" height=\"36\" rx=\"5\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"60\" y=\"72\" text-anchor=\"middle\">SW</text><line x1=\"90\" y1=\"68\" x2=\"150\" y2=\"68\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"120\" y=\"60\" text-anchor=\"middle\" font-size=\"8\">g0/2 protect</text><rect x=\"150\" y=\"55\" width=\"40\" height=\"26\" rx=\"3\" fill=\"#FEF9C3\" stroke=\"#CA8A04\"/><text x=\"170\" y=\"72\" text-anchor=\"middle\" font-size=\"9\">Hub</text><rect x=\"210\" y=\"35\" width=\"50\" height=\"20\" rx=\"3\" fill=\"#F0FDF4\" stroke=\"#16A34A\"/><text x=\"235\" y=\"49\" text-anchor=\"middle\" font-size=\"8\">MAC1</text><rect x=\"210\" y=\"80\" width=\"50\" height=\"20\" rx=\"3\" fill=\"#FEE2E2\" stroke=\"#DC2626\"/><text x=\"235\" y=\"94\" text-anchor=\"middle\" font-size=\"8\">MAC2</text><line x1=\"190\" y1=\"62\" x2=\"210\" y2=\"45\" stroke=\"#57534E\" stroke-width=\"1.5\"/><line x1=\"190\" y1=\"74\" x2=\"210\" y2=\"90\" stroke=\"#57534E\" stroke-width=\"1.5\"/></g></svg>",
        "choices": [
          "The port err-disables and goes down",
          "Frames from the extra MAC are silently dropped, no log, no counter, port stays up",
          "A syslog message is logged and the counter increments",
          "Both MACs are allowed"
        ],
        "answer": 1,
        "explain": "protect drops the offending frames silently: no syslog, no violation counter increment, and the port remains up. That silence is exactly why protect is the least visible mode."
      },
      {
        "type": "topology",
        "stem": "DHCP snooping is on for VLAN 10. The real server sits behind g0/1 (marked trusted); a rogue server is on access port g0/4 (untrusted, default). When the rogue tries to answer a client, what does the switch do with its DHCP OFFER?",
        "svg": "<svg viewBox=\"0 0 340 150\" role=\"img\" aria-label=\"DHCP snooping trusted uplink versus untrusted rogue port\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"10\" fill=\"#1C1917\"><rect x=\"130\" y=\"55\" width=\"70\" height=\"40\" rx=\"5\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"165\" y=\"79\" text-anchor=\"middle\">SW</text><line x1=\"130\" y1=\"75\" x2=\"60\" y2=\"40\" stroke=\"#16A34A\" stroke-width=\"2\"/><text x=\"95\" y=\"48\" text-anchor=\"middle\" font-size=\"8\">g0/1 trust</text><rect x=\"10\" y=\"22\" width=\"55\" height=\"24\" rx=\"3\" fill=\"#F0FDF4\" stroke=\"#16A34A\"/><text x=\"37\" y=\"38\" text-anchor=\"middle\" font-size=\"8\">DHCP svr</text><line x1=\"165\" y1=\"95\" x2=\"165\" y2=\"125\" stroke=\"#57534E\" stroke-width=\"2\"/><text x=\"165\" y=\"118\" text-anchor=\"middle\" font-size=\"8\">client</text><line x1=\"200\" y1=\"75\" x2=\"275\" y2=\"40\" stroke=\"#DC2626\" stroke-width=\"2\"/><text x=\"245\" y=\"48\" text-anchor=\"middle\" font-size=\"8\">g0/4 untrust</text><rect x=\"275\" y=\"22\" width=\"58\" height=\"24\" rx=\"3\" fill=\"#FEE2E2\" stroke=\"#DC2626\"/><text x=\"304\" y=\"38\" text-anchor=\"middle\" font-size=\"8\">rogue svr</text></g></svg>",
        "choices": [
          "Forwards it to the client normally",
          "Drops the OFFER because server messages are blocked on untrusted ports",
          "Adds the rogue to the trusted list automatically",
          "Rate-limits it but still delivers it"
        ],
        "answer": 1,
        "explain": "DHCP server messages (OFFER, ACK) arriving on an untrusted port are dropped. Only trusted ports (uplink to the real server) may source DHCP server replies."
      },
      {
        "type": "topology",
        "stem": "DAI is enabled on VLAN 10 with the uplink g0/1 trusted. A host on untrusted access port g0/6 sends a gratuitous ARP claiming the gateway IP but with its own MAC, and that pair is NOT in the snooping binding table. What does DAI do?",
        "svg": "<svg viewBox=\"0 0 320 140\" role=\"img\" aria-label=\"DAI inspecting ARP on an untrusted access port\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"10\" fill=\"#1C1917\"><rect x=\"120\" y=\"50\" width=\"70\" height=\"40\" rx=\"5\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"155\" y=\"74\" text-anchor=\"middle\">SW</text><line x1=\"120\" y1=\"70\" x2=\"55\" y2=\"40\" stroke=\"#16A34A\" stroke-width=\"2\"/><text x=\"80\" y=\"46\" text-anchor=\"middle\" font-size=\"8\">g0/1 trust</text><rect x=\"5\" y=\"22\" width=\"50\" height=\"22\" rx=\"3\" fill=\"#F0FDF4\" stroke=\"#16A34A\"/><text x=\"30\" y=\"37\" text-anchor=\"middle\" font-size=\"8\">GW</text><line x1=\"190\" y1=\"70\" x2=\"260\" y2=\"105\" stroke=\"#DC2626\" stroke-width=\"2\"/><text x=\"235\" y=\"80\" text-anchor=\"middle\" font-size=\"8\">g0/6 untrust</text><rect x=\"255\" y=\"105\" width=\"58\" height=\"22\" rx=\"3\" fill=\"#FEE2E2\" stroke=\"#DC2626\"/><text x=\"284\" y=\"120\" text-anchor=\"middle\" font-size=\"8\">spoofer</text></g></svg>",
        "choices": [
          "Forwards the ARP since access ports are trusted by default",
          "Drops the ARP because it does not match a binding-table entry",
          "Adds a new binding for the spoofer",
          "Shuts the uplink g0/1 down"
        ],
        "answer": 1,
        "explain": "On an untrusted port DAI inspects every ARP. An IP-to-MAC that does not match the DHCP snooping binding table is dropped, stopping the ARP poisoning attempt."
      },
      {
        "type": "topology",
        "stem": "A host on untrusted access port g0/8 (DHCP client, lease active) sends ARP with the same IP-to-MAC it was assigned by DHCP. DAI is on for VLAN 10. What does DAI do with this ARP?",
        "svg": "<svg viewBox=\"0 0 320 140\" role=\"img\" aria-label=\"DAI passing a legitimate ARP that matches the binding table\"><g font-family=\"JetBrains Mono, monospace\" font-size=\"10\" fill=\"#1C1917\"><rect x=\"120\" y=\"50\" width=\"70\" height=\"40\" rx=\"5\" fill=\"#FFFFFF\" stroke=\"#B45309\"/><text x=\"155\" y=\"74\" text-anchor=\"middle\">SW</text><line x1=\"120\" y1=\"70\" x2=\"55\" y2=\"40\" stroke=\"#16A34A\" stroke-width=\"2\"/><text x=\"80\" y=\"46\" text-anchor=\"middle\" font-size=\"8\">g0/1 trust</text><rect x=\"5\" y=\"22\" width=\"50\" height=\"22\" rx=\"3\" fill=\"#F0FDF4\" stroke=\"#16A34A\"/><text x=\"30\" y=\"37\" text-anchor=\"middle\" font-size=\"8\">DHCP</text><line x1=\"190\" y1=\"70\" x2=\"260\" y2=\"105\" stroke=\"#16A34A\" stroke-width=\"2\"/><text x=\"235\" y=\"80\" text-anchor=\"middle\" font-size=\"8\">g0/8 untrust</text><rect x=\"255\" y=\"105\" width=\"58\" height=\"22\" rx=\"3\" fill=\"#F0FDF4\" stroke=\"#16A34A\"/><text x=\"284\" y=\"120\" text-anchor=\"middle\" font-size=\"8\">host</text></g></svg>",
        "choices": [
          "Drops it because all ARP on untrusted ports is dropped",
          "Forwards it because the IP-to-MAC matches a binding-table entry",
          "Err-disables the port",
          "Rewrites the ARP source"
        ],
        "answer": 1,
        "explain": "DAI inspects ARP on untrusted ports but only DROPS entries that fail validation. An ARP whose IP-to-MAC matches the DHCP snooping binding table passes normally, so legitimate DHCP clients are unaffected."
      }
    ],
    "applied": [
      {
        "type": "mcq",
        "stem": "An attacker floods the switch with thousands of frames using random source MACs to overflow the CAM table and force the switch to flood traffic. Which L2 feature directly counters this?",
        "choices": [
          "DHCP snooping",
          "Dynamic ARP Inspection",
          "Port security limiting MAC addresses per port",
          "Changing the native VLAN"
        ],
        "answer": 2,
        "explain": "MAC flooding aims to overflow the CAM table. Port security caps how many MACs a port may learn, so the flood trips a violation instead of filling the table."
      },
      {
        "type": "mcq",
        "stem": "A port shows status err-disabled after a security violation. After removing the rogue device, how do you bring it back up manually?",
        "choices": [
          "Reload the whole switch",
          "shutdown then no shutdown on the interface",
          "Delete and recreate the VLAN",
          "Change the native VLAN"
        ],
        "answer": 1,
        "explain": "Once the cause is cleared, bounce the port with shutdown then no shutdown, or rely on errdisable recovery to re-enable it automatically."
      },
      {
        "type": "mcq",
        "stem": "Port security with sticky MACs has been working for weeks. After a power outage the switch reboots and every secured port flaps to err-disabled or relearns. What was missed?",
        "choices": [
          "The MACs needed manual entry",
          "copy running-config startup-config was never run, so sticky entries did not survive the reboot",
          "Sticky is incompatible with access ports",
          "The violation mode should have been protect"
        ],
        "answer": 1,
        "explain": "Sticky MACs sit in the running-config and survive link flaps, but NOT a reboot unless saved with copy run start. Without saving, the learned bindings are lost on reload."
      },
      {
        "type": "mcq",
        "stem": "After enabling DAI on a VLAN, hosts that use static IPs (no DHCP) suddenly lose connectivity while DHCP clients are fine. What is the cause and fix?",
        "choices": [
          "DAI is broken; disable it",
          "Static hosts have no binding-table entry, so their ARP is dropped; permit them with an ARP ACL",
          "The native VLAN is wrong; change it",
          "DHCP snooping rate limit is too low; raise it"
        ],
        "answer": 1,
        "explain": "DAI validates against the DHCP snooping binding table, which only learns DHCP clients. Static-IP hosts must be permitted with an arp access-list applied via ip arp inspection filter."
      },
      {
        "type": "mcq",
        "stem": "DHCP snooping is enabled, but reading the per-interface snooping status you confirm the uplink toward the real server is still listed as untrusted. What symptom appears and what is the fix?",
        "choices": [
          "Clients get addresses fine; no change needed",
          "Clients cannot get a lease because the real server's OFFER is dropped on the untrusted uplink; mark the uplink trusted",
          "ARP stops working; enable DAI",
          "The CAM table overflows; enable port security"
        ],
        "answer": 1,
        "explain": "DHCP server replies are dropped on untrusted ports. If the uplink to the legitimate server is left untrusted, its OFFER/ACK is dropped and clients never get a lease. Set ip dhcp snooping trust on that uplink."
      },
      {
        "type": "mcq",
        "stem": "After enabling DHCP snooping, clients downstream of a second switch stop getting addresses, and logs reference option 82. What is the typical fix?",
        "choices": [
          "Trust every access port",
          "Disable option-82 insertion (no ip dhcp snooping information option) when the server drops option-82 packets",
          "Raise the rate limit to 1000 pps",
          "Switch the server port to untrusted"
        ],
        "answer": 1,
        "explain": "Snooping inserts option 82 by default; many servers drop relayed packets that carry it with a giaddr of 0. Disabling option-82 insertion restores DHCP for those clients."
      }
    ],
    "scope": [
      {
        "type": "mcq",
        "stem": "Port security can only be enabled on which kind of port?",
        "choices": [
          "Trunk ports",
          "Static access (or voice) ports",
          "Routed ports",
          "EtherChannel members only"
        ],
        "answer": 1,
        "explain": "switchport port-security requires the port to be a static access (or voice) port, not in dynamic/auto negotiation."
      },
      {
        "type": "mcq",
        "stem": "Which violation mode is the DEFAULT and which keeps the port UP while still logging the violation?",
        "choices": [
          "Default protect; restrict keeps it up and logs",
          "Default shutdown; restrict keeps it up and logs",
          "Default restrict; protect keeps it up and logs",
          "Default shutdown; protect keeps it up and logs"
        ],
        "answer": 1,
        "explain": "shutdown is the default (err-disables the port). restrict keeps the port up while dropping frames, logging syslog, and incrementing the violation counter."
      },
      {
        "type": "mcq",
        "stem": "Which port security violation mode drops offending frames but does NOT shut the port or send any notification?",
        "choices": [
          "shutdown",
          "restrict",
          "protect",
          "monitor"
        ],
        "answer": 2,
        "explain": "protect silently drops, with no log and no counter. restrict drops plus logs and increments counters. shutdown err-disables the port."
      },
      {
        "type": "mcq",
        "stem": "On a trusted port under DHCP snooping and DAI, how are DHCP server messages and ARP packets treated?",
        "choices": [
          "Both are dropped",
          "Both pass without inspection",
          "DHCP is dropped but ARP is inspected",
          "ARP is dropped but DHCP passes"
        ],
        "answer": 1,
        "explain": "Trusted ports forward DHCP server messages and pass ARP without inspection. Untrusted ports are where snooping blocks server replies and DAI inspects ARP."
      },
      {
        "type": "mcq",
        "stem": "Which fields does the DHCP snooping binding table store for each entry?",
        "choices": [
          "Only MAC and port",
          "MAC, IP, VLAN, port, and lease time",
          "IP and subnet mask only",
          "Hostname and switch serial number"
        ],
        "answer": 1,
        "explain": "Each binding records MAC, IP, VLAN, interface, and lease time. DAI and IP Source Guard both lean on this table to validate traffic."
      },
      {
        "type": "mcq",
        "stem": "Which set of L2 security features depends on the DHCP snooping binding table to function?",
        "choices": [
          "Port security and PortFast",
          "Dynamic ARP Inspection and IP Source Guard",
          "BPDU Guard and Root Guard",
          "EtherChannel and trunking"
        ],
        "answer": 1,
        "explain": "DAI validates ARP and IP Source Guard validates source IP, both against the snooping binding table. Without DHCP snooping enabled, neither has data to check."
      }
    ]
  },
  "10": {
    "concept": [
      {
        "type": "mcq",
        "stem": "What must be configured under the VTY lines so remote logins authenticate against locally defined usernames instead of a single shared line password?",
        "choices": [
          "login",
          "login local",
          "no login",
          "enable secret"
        ],
        "answer": 1,
        "explain": "login local tells the lines to use the local username/secret database. Plain login uses only the line password, which everyone shares."
      },
      {
        "type": "mcq",
        "stem": "If both enable password and enable secret are configured on the same device, which one actually controls privileged EXEC access?",
        "choices": [
          "enable password (it was set first)",
          "enable secret always wins",
          "Whichever was typed most recently",
          "Both must be entered in sequence"
        ],
        "answer": 1,
        "explain": "enable secret (Type 5 MD5 or stronger) always takes precedence over enable password (Type 0 cleartext) when both exist. This is a classic trap."
      },
      {
        "type": "mcq",
        "stem": "Why is SSH preferred over Telnet for remote device management?",
        "choices": [
          "SSH is faster",
          "SSH encrypts the session; Telnet sends everything in plaintext",
          "Telnet needs more CPU",
          "SSH uses UDP"
        ],
        "answer": 1,
        "explain": "Telnet is plaintext, exposing credentials on the wire. SSH encrypts the entire management session."
      },
      {
        "type": "mcq",
        "stem": "A console line has a password configured but no login command. What happens when someone connects to the console?",
        "choices": [
          "They are prompted for the password",
          "They get in with no password prompt at all",
          "The connection is refused",
          "They must enter the enable secret"
        ],
        "answer": 1,
        "explain": "Without the login keyword, the line does not enforce the password. The password is set but never checked, so access is unprotected."
      },
      {
        "type": "mcq",
        "stem": "Which hash type does the enable secret command use by default on traditional IOS?",
        "choices": [
          "Type 0 (cleartext)",
          "Type 5 (MD5)",
          "Type 7 (Vigenere)",
          "Type 4 (SHA-256 unsalted)"
        ],
        "answer": 1,
        "explain": "enable secret defaults to Type 5 (MD5). Newer IOS also supports Type 8 (PBKDF2) and Type 9 (scrypt), which are stronger."
      },
      {
        "type": "mcq",
        "stem": "What is the correct purpose of a MOTD banner from a legal and security standpoint?",
        "choices": [
          "Welcome authorized users by name",
          "Warn against unauthorized access before login",
          "Display the device IP and model",
          "Show the last login time"
        ],
        "answer": 1,
        "explain": "An MOTD shows before the login prompt and must warn against unauthorized access. A welcome message can undermine prosecution of intruders."
      }
    ],
    "config": [
      {
        "type": "config",
        "stem": "Bring up SSHv2 end to end: set hostname R1, domain example.com, generate the RSA key, create a user, force SSHv2, and allow only SSH on the VTYs with local authentication.",
        "lines": [
          "hostname R1",
          "ip domain-name example.com",
          "crypto key generate rsa",
          "username admin secret CCNA2026",
          "ip ssh version 2",
          "line vty 0 15",
          "transport input ssh",
          "login local"
        ],
        "show": "show ip ssh",
        "hint": "Identity and domain come first because the key label is built from them, then the local user, then force the secure protocol version, and finally lock the remote lines to that protocol and to local authentication."
      },
      {
        "type": "config",
        "stem": "Harden local device access on R1: set a privileged-mode secret, require login on the console with a line password, and obscure plaintext passwords in the config.",
        "lines": [
          "enable secret CCNA2026",
          "line console 0",
          "password cisco",
          "login",
          "service password-encryption"
        ],
        "show": "show running-config",
        "hint": "The privileged-mode secret is hashed and outranks the weak plaintext option. The console still needs both a password and the keyword that enforces it. A separate global command obscures the remaining plaintext."
      },
      {
        "type": "config",
        "stem": "Create a full-privilege local account named admin so it lands directly in privileged mode at login.",
        "lines": [
          "username admin privilege 15 secret CCNA2026"
        ],
        "show": "show running-config",
        "hint": "One command sets the name, the highest privilege level, and a hashed credential."
      },
      {
        "type": "config",
        "stem": "Only the management subnet 10.1.1.0/24 should be allowed to reach the VTY lines. Build the standard ACL with the matching wildcard for that subnet, then bind it to the VTYs in the inbound direction.",
        "lines": [
          "access-list 10 permit 10.1.1.0 0.0.0.255",
          "line vty 0 15",
          "access-class 10 in"
        ],
        "show": "show access-lists",
        "hint": "Derive the wildcard as the inverse of the /24 mask, permit that source range in a standard ACL, then apply it to the lines with the line-specific keyword (not the interface keyword)."
      },
      {
        "type": "config",
        "stem": "Protect the console: require login with a password, drop idle sessions after five minutes, and stop log messages from breaking up what you type.",
        "lines": [
          "line console 0",
          "password cisco",
          "login",
          "exec-timeout 5 0",
          "logging synchronous"
        ],
        "show": "show running-config",
        "hint": "Set the line password and the keyword that enforces it, an inactivity timeout written as minutes then seconds, and the option that reprints the command line after console logs."
      }
    ],
    "sequence": [
      {
        "type": "sequence",
        "stem": "Order the steps to enable SSHv2 on a router with local user authentication.",
        "steps": [
          "hostname R1",
          "ip domain-name example.com",
          "crypto key generate rsa",
          "username admin secret CCNA2026",
          "ip ssh version 2",
          "line vty 0 15",
          "transport input ssh",
          "login local"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the IOS modes you pass through to reach VTY line configuration from a fresh console login.",
        "steps": [
          "User EXEC mode",
          "Privileged EXEC mode (enable)",
          "Global configuration mode (configure terminal)",
          "Line configuration mode (line vty 0 15)"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the local password-hardening steps from strongest privileged protection outward to plaintext cleanup.",
        "steps": [
          "Set the privileged-mode secret (hashed)",
          "Set the console line password and require login",
          "Set the VTY line password and require login",
          "Encrypt remaining plaintext passwords with service password-encryption"
        ]
      },
      {
        "type": "sequence",
        "stem": "A local user and RSA key already exist. Order the steps to restrict the VTY lines to SSH with local login and confirm it.",
        "steps": [
          "Enter VTY line configuration (line vty 0 15)",
          "Restrict input transport to SSH only (transport input ssh)",
          "Use the local user database (login local)",
          "Confirm SSH is enabled and version 2"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the password-recovery steps on a Cisco router after losing the passwords.",
        "steps": [
          "Set the config-register to 0x2142 so the router ignores the startup config",
          "Reload so it boots without the saved passwords",
          "Copy startup-config into running-config",
          "Change the forgotten passwords",
          "Set the config-register back to 0x2102",
          "Save the config and reload"
        ]
      }
    ],
    "applied": [
      {
        "type": "mcq",
        "stem": "crypto key generate rsa fails with a message demanding a domain-name first. What did you skip?",
        "choices": [
          "Setting an enable secret",
          "Setting hostname and ip domain-name",
          "Creating a username",
          "Applying an ACL to VTY"
        ],
        "answer": 1,
        "explain": "The RSA key label is hostname.domain-name, so both the hostname and ip domain-name must be set before generating the key."
      },
      {
        "type": "mcq",
        "stem": "You want only hosts in 10.1.1.0/24 to be able to SSH to the router. Which command applied under line vty 0 15 enforces this?",
        "choices": [
          "ip access-group 10 in",
          "access-class 10 in",
          "transport input 10",
          "permit 10.1.1.0 0.0.0.255"
        ],
        "answer": 1,
        "explain": "VTY lines use access-class (not ip access-group, which is for interfaces) to restrict which source IPs can connect."
      },
      {
        "type": "mcq",
        "stem": "A junior admin needs to SSH into a router but the session is refused even though SSH is enabled and a username exists. The VTY lines have only login (not login local) configured and no line password. Why is access refused?",
        "choices": [
          "SSH requires Telnet to be enabled too",
          "login with no line password set means the line refuses all logins",
          "The username must have privilege 15",
          "RSA keys expire after one login"
        ],
        "answer": 1,
        "explain": "With login and no line password, the line has nothing to check against and refuses the connection. login local is required so it authenticates against the username database."
      },
      {
        "type": "mcq",
        "stem": "You configured login block-for 120 attempts 3 within 60 on a router. What does this do?",
        "choices": [
          "Blocks all logins for 60 seconds after 120 attempts",
          "Blocks logins for 120 seconds if 3 failed attempts occur within 60 seconds",
          "Allows 3 logins per 120 minutes",
          "Delays each login by 120 seconds"
        ],
        "answer": 1,
        "explain": "It enters quiet mode (blocks login attempts) for 120 seconds when 3 failures happen within a 60-second window. This mitigates brute force."
      },
      {
        "type": "mcq",
        "stem": "After running service password-encryption, someone runs the running-config and still reads a password in clear text. Which password type is NOT affected by this command because it is already hashed?",
        "choices": [
          "A new line password set afterward",
          "An enable secret (already Type 5)",
          "A username password set as plaintext",
          "A console password set as plaintext"
        ],
        "answer": 1,
        "explain": "service password-encryption only converts plaintext (Type 0) passwords to Type 7. A Type 5 secret is already hashed; this command does not change it, and it never appears in cleartext anyway."
      },
      {
        "type": "mcq",
        "stem": "You set a global minimum password length but an existing short password still works. Why?",
        "choices": [
          "The command is misspelled",
          "It only applies to passwords set after the command, not existing ones",
          "It requires a reload to take effect",
          "Minimum length cannot be set below 16"
        ],
        "answer": 1,
        "explain": "security passwords min-length applies to future passwords only; it does not retroactively reject or change passwords already configured."
      }
    ],
    "scope": [
      {
        "type": "mcq",
        "stem": "Which TCP port does SSH use?",
        "choices": [
          "22",
          "23",
          "443",
          "161"
        ],
        "answer": 0,
        "explain": "SSH = TCP 22. Telnet = TCP 23. HTTPS = TCP 443. SNMP = UDP 161."
      },
      {
        "type": "mcq",
        "stem": "How many simultaneous remote sessions does line vty 0 15 configure?",
        "choices": [
          "5 lines",
          "15 lines",
          "16 lines",
          "Unlimited"
        ],
        "answer": 2,
        "explain": "VTY lines 0 through 15 inclusive equal 16 virtual terminal lines, allowing 16 concurrent remote sessions."
      },
      {
        "type": "mcq",
        "stem": "Which device access method requires physical presence with a rollover cable to the console port?",
        "choices": [
          "VTY/SSH access",
          "AUX line access",
          "Console line access",
          "Telnet access"
        ],
        "answer": 2,
        "explain": "Console access is local and physical via a rollover cable to the console port. VTY (SSH/Telnet) is remote over the network; AUX was originally for modem dial-in."
      },
      {
        "type": "mcq",
        "stem": "Which keyword applied to the username or enable secret command yields the strongest password storage available on modern IOS?",
        "choices": [
          "Type 0 (cleartext)",
          "Type 5 (MD5)",
          "Type 7 (Vigenere)",
          "Type 9 (scrypt)"
        ],
        "answer": 3,
        "explain": "algorithm-type scrypt produces Type 9, the strongest. Type 5 is MD5, Type 7 is reversible, Type 0 is cleartext."
      },
      {
        "type": "mcq",
        "stem": "service password-encryption applies which weak, reversible encryption type to plaintext passwords?",
        "choices": [
          "Type 5 (MD5)",
          "Type 7 (Vigenere, reversible)",
          "Type 8 (PBKDF2)",
          "Type 9 (scrypt)"
        ],
        "answer": 1,
        "explain": "service password-encryption applies reversible Type 7 obfuscation, trivially cracked with free tools. It is not real security."
      },
      {
        "type": "mcq",
        "stem": "Which line, rarely present on modern routers, was originally for modem dial-in and should be disabled with no exec to reduce attack surface?",
        "choices": [
          "Console line",
          "VTY line",
          "AUX line",
          "TTY line"
        ],
        "answer": 2,
        "explain": "The AUX (auxiliary) line was for modem dial-in access. Most modern routers do not even have an AUX port; if unused, disable it with no exec."
      }
    ]
  },
  "11": {
    "concept": [
      {
        "type": "mcq",
        "stem": "Which prefix identifies an IPv6 global unicast address, the internet-routable type that behaves like a public IPv4 address?",
        "choices": [
          "FE80::/10",
          "FC00::/7",
          "2000::/3",
          "FF00::/8"
        ],
        "answer": 2,
        "explain": "Global unicast is 2000::/3 (starts with 2 or 3) and is internet-routable. FC00::/7 is unique-local (private-like), FE80::/10 is link-local, FF00::/8 is multicast."
      },
      {
        "type": "mcq",
        "stem": "Which prefix identifies an IPv6 link-local address, the type auto-created on every IPv6 interface and valid only on the local link?",
        "choices": [
          "2000::/3",
          "FC00::/7",
          "FE80::/10",
          "FF00::/8"
        ],
        "answer": 2,
        "explain": "Link-local is FE80::/10 and is never routed off the link. GUA 2000::/3, ULA FC00::/7, multicast FF00::/8."
      },
      {
        "type": "mcq",
        "stem": "How many times may the :: (double colon) appear in a single IPv6 address, and why?",
        "choices": [
          "Twice, once per half",
          "Once, otherwise the number of zero groups it represents is ambiguous",
          "Unlimited, as long as groups total 8",
          "Three times maximum"
        ],
        "answer": 1,
        "explain": ":: replaces one or more consecutive all-zero groups and may appear only once. A second :: would make it impossible to know how many zero groups each one represents."
      },
      {
        "type": "mcq",
        "stem": "What replaces ARP for resolving a neighbor's MAC address in IPv6?",
        "choices": [
          "NDP Neighbor Solicitation and Neighbor Advertisement",
          "Router Solicitation and Router Advertisement",
          "DHCPv6 request and reply",
          "Gratuitous broadcast"
        ],
        "answer": 0,
        "explain": "NDP NS (who has this IPv6?) and NA (here is my MAC) replace ARP request/reply. NDP rides on ICMPv6; RS/RA are for finding routers and prefixes."
      },
      {
        "type": "mcq",
        "stem": "How does modified EUI-64 build the 64-bit interface ID from a 48-bit MAC?",
        "choices": [
          "Appends 16 zero bits",
          "Inserts FFFE in the middle and flips the 7th bit of the first byte",
          "Reverses the MAC byte order",
          "Hashes the MAC with SHA-256"
        ],
        "answer": 1,
        "explain": "EUI-64 splits the 48-bit MAC, inserts FFFE in the middle, and flips the 7th bit (U/L bit) of the first byte."
      },
      {
        "type": "mcq",
        "stem": "Why does IPv6 have no broadcast address?",
        "choices": [
          "IPv6 networks are too small to broadcast",
          "Multicast (FF00::/8) and anycast replace the broadcast function",
          "Broadcasts are blocked by firewalls",
          "Link-local addresses handle all broadcasts"
        ],
        "answer": 1,
        "explain": "IPv6 eliminated broadcast entirely. Targeted multicast (e.g. FF02::1 all-nodes, solicited-node multicast) and anycast handle what broadcast did in IPv4, reducing flooding."
      },
      {
        "type": "mcq",
        "stem": "What is true of an IPv6 anycast address?",
        "choices": [
          "It uses a dedicated FF00::/8 prefix",
          "It is the same address on multiple devices; traffic routes to the nearest one",
          "It reaches every node on the link",
          "It is auto-generated on every interface"
        ],
        "answer": 1,
        "explain": "Anycast assigns one address to multiple devices; routing delivers to the nearest by metric. It has no special prefix and uses the global unicast range (e.g. DNS root servers)."
      }
    ],
    "config": [
      {
        "type": "config",
        "stem": "Enable IPv6 routing globally and assign 2001:db8:1::1/64 to g0/0, then verify the interface addressing.",
        "lines": [
          "ipv6 unicast-routing",
          "interface g0/0",
          "ipv6 address 2001:db8:1::1/64"
        ],
        "show": "show ipv6 interface brief",
        "hint": "IPv6 forwarding is off by default, so enable it globally before addressing. The host portion can be typed in full or autobuilt from the MAC if you prefer."
      },
      {
        "type": "config",
        "stem": "Assign the global unicast 2001:db8:5::1/64 to g0/3 using the EUI-64 host portion instead of a manual interface ID. Verify.",
        "lines": [
          "interface g0/3",
          "ipv6 address 2001:db8:5::/64 eui-64"
        ],
        "show": "show ipv6 interface brief",
        "hint": "Give only the /64 prefix and ask the device to build the last 64 bits from the interface MAC. There is a keyword for that on the address line."
      },
      {
        "type": "config",
        "stem": "On g0/1, enable IPv6 and let the interface auto-create only its link-local address, with no global address configured. Verify.",
        "lines": [
          "interface g0/1",
          "ipv6 enable"
        ],
        "show": "show ipv6 interface g0/1",
        "hint": "There is a one-word interface command that turns on IPv6 and auto-generates the on-link address without you assigning any routable address."
      },
      {
        "type": "config",
        "stem": "On g0/2, configure the router to obtain its global IPv6 address automatically from the upstream router's advertisement. Verify.",
        "lines": [
          "interface g0/2",
          "ipv6 address autoconfig"
        ],
        "show": "show ipv6 interface brief",
        "hint": "Use the stateless method so the interface derives its address from the prefix the neighbor router advertises, rather than typing an address."
      },
      {
        "type": "config",
        "stem": "Add a default IPv6 static route on the edge router pointing to next hop 2001:db8:2::2. Verify the routing table.",
        "lines": [
          "ipv6 unicast-routing",
          "ipv6 route ::/0 2001:db8:2::2"
        ],
        "show": "show ipv6 route static",
        "hint": "The IPv6 catch-all prefix is the equivalent of 0.0.0.0/0. Forwarding must be enabled for the route to be used."
      }
    ],
    "sequence": [
      {
        "type": "sequence",
        "stem": "Order the steps to compress 2001:0DB8:0000:0000:0000:0000:0000:0001 to its shortest valid form.",
        "steps": [
          "Drop leading zeros in each group (0DB8 to DB8, 0000 to 0)",
          "Identify the longest run of consecutive all-zero groups",
          "Replace that single run with ::",
          "Result: 2001:DB8::1"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the modified EUI-64 steps to build the interface ID from a MAC address.",
        "steps": [
          "Split the 48-bit MAC into two 24-bit halves",
          "Insert FFFE in the middle to make 64 bits",
          "Flip the 7th bit (U/L bit) of the first byte"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the SLAAC message exchange a host uses to autoconfigure its IPv6 address.",
        "steps": [
          "Host sends Router Solicitation (RS) to FF02::2",
          "Router replies with Router Advertisement (RA) containing the prefix",
          "Host combines the RA prefix with its own interface ID to form the full address",
          "Host runs Duplicate Address Detection (DAD) to confirm the address is unique"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the IOS steps to bring up a routed global IPv6 address on an interface.",
        "steps": [
          "Enter global config and enable ipv6 unicast-routing",
          "Enter the interface with interface g0/0",
          "Assign the address with ipv6 address 2001:db8:1::1/64",
          "Verify with show ipv6 interface brief"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the NDP exchange that resolves a neighbor's MAC address (the ARP replacement).",
        "steps": [
          "Sender builds the target's solicited-node multicast address FF02::1:FFxx:xxxx",
          "Sender transmits a Neighbor Solicitation (NS) to that multicast",
          "Only the host with matching last 24 bits processes it",
          "That host replies with a unicast Neighbor Advertisement (NA) carrying its MAC"
        ]
      }
    ],
    "applied": [
      {
        "type": "mcq",
        "stem": "Which is the correct fully expanded form of 2001:DB8::1?",
        "choices": [
          "2001:0DB8:0000:0000:0000:0000:0000:0001",
          "2001:0DB8:1000:0000:0000:0000:0000:0000",
          "2001:DB80:0000:0000:0000:0000:0000:0001",
          "2001:0DB8:0000:0001:0000:0000:0000:0000"
        ],
        "answer": 0,
        "explain": "Restore each group to 4 hex digits and expand :: to enough all-zero groups to total 8. The single trailing 1 is the last group, so :: fills the five middle groups with 0000."
      },
      {
        "type": "mcq",
        "stem": "Which compressed form of 2001:0DB8:0000:0000:00AB:0000:0000:1234 is correct?",
        "choices": [
          "2001:DB8::AB::1234",
          "2001:DB8:0:0:AB::1234",
          "2001:DB8::AB:0:0:1234",
          "2001:DB8:0::AB::1234"
        ],
        "answer": 2,
        "explain": ":: may appear once and should replace the longest zero run. The first run (two groups) is one option, written 2001:DB8::AB:0:0:1234. Using :: twice is invalid."
      },
      {
        "type": "mcq",
        "stem": "An interface has MAC 00:1A:2B:3C:4D:5E. What is its EUI-64 interface ID?",
        "choices": [
          "001A:2BFF:FE3C:4D5E",
          "021A:2BFF:FE3C:4D5E",
          "001A:2B3C:4D5E:FFFE",
          "FE80::1A:2BFF:FE3C:4D5E"
        ],
        "answer": 1,
        "explain": "Insert FFFE: 001A:2BFF:FE3C:4D5E. Flip the 7th bit of the first byte: 00 (0000 0000) becomes 02 (0000 0010), giving 021A:2BFF:FE3C:4D5E."
      },
      {
        "type": "mcq",
        "stem": "Which multicast address reaches all IPv6 routers on the local link?",
        "choices": [
          "FF02::1",
          "FF02::2",
          "FF02::5",
          "FF02::6"
        ],
        "answer": 1,
        "explain": "FF02::1 all-nodes, FF02::2 all-routers, FF02::5 all-OSPF routers, FF02::6 OSPF DR/BDR."
      },
      {
        "type": "mcq",
        "stem": "A host has only an FE80:: address. It can ping its on-link neighbor but nothing beyond the router. Why?",
        "choices": [
          "Link-local addresses are never forwarded off the local link",
          "It needs a static route",
          "The MAC is invalid",
          "EUI-64 failed"
        ],
        "answer": 0,
        "explain": "Link-local (FE80::/10) is valid only on the local link and is never routed. A global or unique-local address is required to reach off-link destinations."
      },
      {
        "type": "mcq",
        "stem": "Hosts on a /64 LAN are not auto-configuring addresses via SLAAC. Which router-side cause is most likely?",
        "choices": [
          "The subnet is not exactly /64",
          "ipv6 unicast-routing is not enabled, so the router sends no RAs",
          "The hosts lack a default gateway",
          "EUI-64 is disabled on the hosts"
        ],
        "answer": 1,
        "explain": "Without ipv6 unicast-routing the router does not send Router Advertisements, so hosts never learn the prefix for SLAAC. SLAAC also requires a /64."
      }
    ],
    "scope": [
      {
        "type": "mcq",
        "stem": "With SLAAC, who builds the host's full IPv6 address?",
        "choices": [
          "A DHCPv6 server assigns it",
          "The host itself, using the prefix from the RA plus its own interface ID",
          "The default gateway statically",
          "The DNS server"
        ],
        "answer": 1,
        "explain": "SLAAC: the host autoconfigures using the prefix from the Router Advertisement and its own interface ID. Stateful DHCPv6 instead has a server assign the address."
      },
      {
        "type": "mcq",
        "stem": "Why is /64 the universal standard prefix length for IPv6 LAN subnets?",
        "choices": [
          "It is the smallest subnet IPv6 allows",
          "SLAAC and EUI-64 require a 64-bit interface ID to generate the host portion",
          "Routers reject any other prefix",
          "It matches an IPv4 /24"
        ],
        "answer": 1,
        "explain": "The host portion (interface ID) is the last 64 bits; SLAAC/EUI-64 build exactly 64 bits, so the network must be /64 for autoconfiguration to work."
      },
      {
        "type": "mcq",
        "stem": "A device receives an RA with flags A=1, M=0, O=1. How will it obtain its address and DNS?",
        "choices": [
          "Full address and DNS from a DHCPv6 server",
          "Address via SLAAC, DNS via stateless DHCPv6",
          "Address via SLAAC, no DNS available",
          "Static address only"
        ],
        "answer": 1,
        "explain": "A=1 means use SLAAC for the address; M=0 means no managed (stateful) addressing; O=1 means get other info such as DNS from DHCPv6. This is stateless DHCPv6."
      },
      {
        "type": "mcq",
        "stem": "What does stateful DHCPv6 (RA flag M=1) handle, and what does it NOT handle?",
        "choices": [
          "Assigns the address but not the default gateway",
          "Assigns address and gateway both",
          "Assigns only DNS, not the address",
          "Assigns the gateway but not the address"
        ],
        "answer": 0,
        "explain": "Stateful DHCPv6 (M=1) assigns the full address and tracks it, plus DNS. But the default gateway is always learned from the Router Advertisement, never from DHCPv6."
      },
      {
        "type": "mcq",
        "stem": "What is the scope and purpose of a solicited-node multicast address (FF02::1:FFxx:xxxx)?",
        "choices": [
          "Global scope, used for routing updates",
          "Link-local scope, used by NDP so only hosts sharing the last 24 bits process the NS",
          "Site scope, used by DHCPv6",
          "Link-local scope, used to reach all routers"
        ],
        "answer": 1,
        "explain": "It is auto-generated per unicast/anycast address from the last 24 bits and is link-local in scope. NDP uses it so neighbor solicitations target a tiny set instead of flooding the whole link."
      },
      {
        "type": "mcq",
        "stem": "Which statement about the unique local address range FC00::/7 is correct on the CCNA?",
        "choices": [
          "It is globally routable like GUA",
          "It is private-like and not routed on the public internet; in practice addresses start with FD",
          "It is auto-generated on every interface",
          "It replaces broadcast"
        ],
        "answer": 1,
        "explain": "ULA (FC00::/7) is the IPv6 analog of RFC 1918 private space, not internet-routable. The locally assigned half (FD00::/8) is what you actually see configured."
      }
    ]
  },
  "12": {
    "concept": [
      {
        "type": "mcq",
        "stem": "In any IPv4 address, what determines which part is the network and which part is the host?",
        "choices": [
          "The first octet value alone",
          "The subnet mask: contiguous 1s mark network bits, trailing 0s mark host bits",
          "The default gateway",
          "The DHCP server"
        ],
        "answer": 1,
        "explain": "The mask splits the 32-bit address. The contiguous 1 bits identify the subnet (network portion); the trailing 0 bits identify individual devices (host portion). Every subnetting calculation rests on this split."
      },
      {
        "type": "mcq",
        "stem": "What does the /27 in 10.0.0.0/27 specify?",
        "choices": [
          "27 usable hosts",
          "27 subnets",
          "27 network bits, leaving 5 host bits",
          "27 host bits"
        ],
        "answer": 2,
        "explain": "A CIDR prefix is the number of network (mask) bits. /27 = 27 network bits, so 32 - 27 = 5 host bits, giving 2^5 - 2 = 30 usable hosts."
      },
      {
        "type": "mcq",
        "stem": "Why subtract 2 from the total addresses to get usable hosts in a normal subnet?",
        "choices": [
          "For the gateway and DNS",
          "For the network address and the broadcast address",
          "For DHCP and APIPA",
          "For the loopback and the mask"
        ],
        "answer": 1,
        "explain": "The all-zeros host (network/subnet ID) and the all-ones host (broadcast) are reserved and cannot be assigned to a device, so usable hosts = 2^host-bits - 2."
      },
      {
        "type": "mcq",
        "stem": "Which prefix is the standard choice for a point-to-point WAN link to conserve addresses (2 usable hosts)?",
        "choices": [
          "/24",
          "/28",
          "/30",
          "/32"
        ],
        "answer": 2,
        "explain": "A /30 has 4 addresses, 2 usable, ideal for a point-to-point link. A /31 (RFC 3021) also gives 2 usable with no broadcast on p2p links."
      },
      {
        "type": "mcq",
        "stem": "What is the relationship between a wildcard mask and a subnet mask?",
        "choices": [
          "They are identical",
          "The wildcard is the inverse of the subnet mask (subtract each octet from 255)",
          "The wildcard adds 1 to each mask octet",
          "The wildcard is always 0.0.0.255"
        ],
        "answer": 1,
        "explain": "Wildcard = inverse of the subnet mask. A 0 bit means must match, a 1 bit means ignore. 255.255.255.0 becomes 0.0.0.255. Used in OSPF network statements and ACLs."
      },
      {
        "type": "mcq",
        "stem": "Which routing protocol CANNOT support VLSM and discontiguous subnets?",
        "choices": [
          "OSPF",
          "EIGRP",
          "RIPv1",
          "RIPv2"
        ],
        "answer": 2,
        "explain": "RIPv1 is classful and sends no mask in its updates, so it cannot support VLSM. OSPF, EIGRP, and RIPv2 are classless and carry the prefix length."
      }
    ],
    "sequence": [
      {
        "type": "sequence",
        "stem": "Order the four key addresses of any subnet from lowest to highest.",
        "steps": [
          "Network address (all host bits 0)",
          "First usable host (network + 1)",
          "Last usable host (broadcast - 1)",
          "Broadcast address (all host bits 1)"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the steps to find the NETWORK address of a host IP given its mask.",
        "steps": [
          "Identify the interesting octet (the mask octet that is neither 255 nor 0)",
          "Find the block size (256 - the interesting mask octet)",
          "Step through multiples of the block size in that octet",
          "Take the largest multiple at or below the host value as the network boundary"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the steps to find the broadcast address of a host IP given its mask.",
        "steps": [
          "Find the block size (256 - interesting mask octet)",
          "Find the network address (largest block boundary at or below the host)",
          "Add the block size to the network address to reach the next subnet",
          "Subtract 1 from that next subnet to get the broadcast"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order the steps to VLSM a single block across segments of differing sizes.",
        "steps": [
          "List each segment and its required host count",
          "Sort the segments largest to smallest",
          "Assign the largest segment first starting at the block's base",
          "Continue assigning each next-smaller segment at the next free boundary"
        ]
      },
      {
        "type": "sequence",
        "stem": "Order these prefixes from the MOST hosts per subnet to the FEWEST.",
        "steps": [
          "/25",
          "/27",
          "/29",
          "/31"
        ]
      }
    ],
    "applied": [
      {
        "type": "mcq",
        "stem": "Host 192.168.1.100/26 belongs to which subnet, and what is its broadcast?",
        "choices": [
          "Subnet .64, broadcast .127",
          "Subnet .96, broadcast .127",
          "Subnet .0, broadcast .63",
          "Subnet .128, broadcast .191"
        ],
        "answer": 0,
        "explain": "/26 block size = 64: subnets .0, .64, .128, .192. .100 falls in .64 to .127, so subnet .64, broadcast .127, usable .65 to .126."
      },
      {
        "type": "mcq",
        "stem": "What is the network address for 172.16.45.200 with mask 255.255.248.0 (/21)?",
        "choices": [
          "172.16.40.0",
          "172.16.45.0",
          "172.16.32.0",
          "172.16.48.0"
        ],
        "answer": 0,
        "explain": "/21 mask octet = 248, block size = 256 - 248 = 8 in the third octet. 45 / 8 = 5 remainder, 5 x 8 = 40, so network = 172.16.40.0."
      },
      {
        "type": "mcq",
        "stem": "For a mask octet of 192, what is the magic number (block size) in that octet?",
        "choices": [
          "32",
          "64",
          "128",
          "16"
        ],
        "answer": 1,
        "explain": "Magic number = 256 - interesting mask octet = 256 - 192 = 64. The subnets step .0, .64, .128, .192."
      },
      {
        "type": "mcq",
        "stem": "A segment must support 50 hosts with the smallest possible subnet. Which prefix fits?",
        "choices": [
          "/25",
          "/26",
          "/27",
          "/28"
        ],
        "answer": 1,
        "explain": "/26 = 62 usable hosts (fits 50). /27 = 30 (too small). Always round up to the next prefix that meets the host count, so /26."
      },
      {
        "type": "mcq",
        "stem": "How many usable hosts does a Class C /24 yield after subnetting to /28, and how many subnets?",
        "choices": [
          "14 hosts, 16 subnets",
          "16 hosts, 14 subnets",
          "30 hosts, 8 subnets",
          "14 hosts, 8 subnets"
        ],
        "answer": 0,
        "explain": "/28 = 4 host bits = 2^4 - 2 = 14 hosts. Borrowed bits from /24 to /28 = 4 = 2^4 = 16 subnets."
      },
      {
        "type": "mcq",
        "stem": "A verification command shows interface GigabitEthernet0/0 with address 10.20.30.65 and a /27 mask, status up/up. Which subnet does this interface sit in?",
        "choices": [
          "10.20.30.32 to 10.20.30.63",
          "10.20.30.64 to 10.20.30.95",
          "10.20.30.0 to 10.20.30.127",
          "10.20.30.96 to 10.20.30.127"
        ],
        "answer": 1,
        "explain": "/27 block size = 32: boundaries .0, .32, .64, .96. The address .65 falls in the .64 block, so the subnet is 10.20.30.64 to 10.20.30.95 (broadcast .95)."
      },
      {
        "type": "mcq",
        "stem": "Which wildcard mask matches exactly the subnet 172.16.8.0/22?",
        "choices": [
          "0.0.3.255",
          "0.0.7.255",
          "0.0.1.255",
          "0.0.255.255"
        ],
        "answer": 0,
        "explain": "/22 mask = 255.255.252.0. Wildcard = inverse = 0.0.3.255 (255-252 = 3). This covers 172.16.8.0 to 172.16.11.255."
      }
    ],
    "scope": [
      {
        "type": "mcq",
        "stem": "In a subnet mask, what do the network bits versus host bits determine?",
        "choices": [
          "Network bits set the speed, host bits set the VLAN",
          "Network bits identify the subnet, host bits identify the device on that subnet",
          "Network bits are always 8, host bits always 24",
          "Host bits set the broadcast domain only"
        ],
        "answer": 1,
        "explain": "The mask splits the 32-bit address: contiguous 1s (network bits) identify the subnet, the trailing 0s (host bits) identify individual hosts. All host bits 0 = network ID, all 1 = broadcast."
      },
      {
        "type": "mcq",
        "stem": "Which first-octet range and default mask define a classful Class B address?",
        "choices": [
          "1-126, default /8",
          "128-191, default /16",
          "192-223, default /24",
          "224-239, multicast"
        ],
        "answer": 1,
        "explain": "Class A 1-126 (/8), Class B 128-191 (/16), Class C 192-223 (/24), Class D 224-239 (multicast), Class E 240-255. 127 is loopback."
      },
      {
        "type": "mcq",
        "stem": "Convert the dotted-decimal mask 255.255.240.0 to CIDR notation.",
        "choices": [
          "/19",
          "/20",
          "/21",
          "/22"
        ],
        "answer": 1,
        "explain": "255 = 8 bits, 255 = 8 bits, 240 = 4 bits (11110000), 0 = 0 bits. 8 + 8 + 4 = /20."
      },
      {
        "type": "mcq",
        "stem": "What does VLSM allow that fixed-length classful subnetting does not?",
        "choices": [
          "Use IPv6 addresses",
          "Use different subnet mask lengths within one network to size each segment to its host need",
          "Route packets faster",
          "Skip the broadcast address"
        ],
        "answer": 1,
        "explain": "VLSM (variable length subnet masking) sizes each subnet to its host count (for example a /30 on point-to-point links, /26 on a 50-host LAN), avoiding wasted addresses."
      },
      {
        "type": "mcq",
        "stem": "Which subnet mask octet value corresponds to a /27 in the affected octet?",
        "choices": [
          "192",
          "224",
          "240",
          "248"
        ],
        "answer": 1,
        "explain": "Valid mask octets: 128, 192, 224, 240, 248, 252, 254, 255. /27 = 255.255.255.224."
      },
      {
        "type": "mcq",
        "stem": "What is 11010000 in decimal (a common interesting-octet conversion)?",
        "choices": [
          "192",
          "208",
          "176",
          "224"
        ],
        "answer": 1,
        "explain": "Bit positions 128, 64, 32, 16, 8, 4, 2, 1. 11010000 = 128 + 64 + 16 = 208."
      }
    ]
  },
  "13": {
    "concept": {
      "type": "mcq",
      "stem": "Which protocol provides reliable, ordered delivery using a three-way handshake?",
      "choices": [
        "UDP",
        "TCP",
        "ICMP",
        "ARP"
      ],
      "answer": 1,
      "explain": "TCP is connection-oriented (SYN, SYN-ACK, ACK). UDP is connectionless and best-effort."
    },
    "scope": {
      "type": "mcq",
      "stem": "Which transport/port pair is correct?",
      "choices": [
        "SSH = UDP 22",
        "Telnet = TCP 23",
        "SNMP = TCP 161",
        "TFTP = TCP 69"
      ],
      "answer": 1,
      "explain": "SSH 22 TCP, Telnet 23 TCP, SNMP 161/162 UDP, TFTP 69 UDP."
    }
  },
  "16": {
    "concept": {
      "type": "mcq",
      "stem": "Before you can generate the RSA crypto key for SSH, what two things must already be set?",
      "choices": [
        "A banner and a MOTD",
        "A hostname and a domain name",
        "An ACL and a VTY password",
        "NTP and a clock"
      ],
      "answer": 1,
      "explain": "The RSA key label is derived from hostname + domain name, so both must be set first."
    },
    "config": {
      "type": "config",
      "stem": "Bring up SSHv2: set the domain name example.com, generate a 1024-bit RSA key, force version 2, then verify SSH.",
      "lines": [
        "ip domain-name example.com",
        "crypto key generate rsa",
        "ip ssh version 2"
      ],
      "show": "show ip ssh",
      "hint": "order matters: the domain name must exist before you generate the key (the key name depends on it), and only then can you force the secure version."
    },
    "scope": {
      "type": "mcq",
      "stem": "On the VTY lines, which command restricts logins to SSH only?",
      "choices": [
        "transport input telnet",
        "transport input ssh",
        "login local",
        "access-class ssh in"
      ],
      "answer": 1,
      "explain": "transport input ssh permits only SSH on the VTY lines; login local authenticates against local usernames."
    }
  },
  "17": {
    "concept": {
      "type": "mcq",
      "stem": "What is the correct DHCP lease message order?",
      "choices": [
        "Offer, Discover, Request, Ack",
        "Discover, Offer, Request, Ack",
        "Request, Offer, Discover, Ack",
        "Discover, Request, Offer, Ack"
      ],
      "answer": 1,
      "explain": "DORA: Discover (client), Offer (server), Request (client), Acknowledge (server)."
    },
    "sequence": {
      "type": "sequence",
      "stem": "Order the DHCP DORA exchange.",
      "steps": [
        "Discover",
        "Offer",
        "Request",
        "Acknowledge"
      ]
    },
    "scope": {
      "type": "mcq",
      "stem": "A client and DHCP server are on different subnets. What forwards the broadcast?",
      "choices": [
        "ip helper-address on the client interface",
        "A static route",
        "A trunk port",
        "PAT overload"
      ],
      "answer": 0,
      "explain": "ip helper-address on the router interface relays DHCP broadcasts as unicast to the server across subnets."
    }
  },
  "19": {
    "concept": {
      "type": "mcq",
      "stem": "Which FHRP is an open standard, and what multicast address does its master use?",
      "choices": [
        "HSRP, 224.0.0.2",
        "VRRP, 224.0.0.18",
        "GLBP, 224.0.0.102",
        "HSRP, 224.0.0.18"
      ],
      "answer": 1,
      "explain": "VRRP is the open standard; its master uses 224.0.0.18. HSRP (Cisco) uses 224.0.0.2 for v1 and 224.0.0.102 for v2. GLBP is also Cisco. All provide a virtual IP + virtual MAC redundant gateway."
    },
    "scope": {
      "type": "mcq",
      "stem": "Which FHRP is Cisco-proprietary and load-balances across MULTIPLE active gateways simultaneously?",
      "choices": [
        "VRRP",
        "HSRP",
        "GLBP",
        "All FHRPs load-balance equally"
      ],
      "answer": 2,
      "explain": "GLBP (Cisco) load-balances across multiple active forwarders. HSRP (Cisco) and VRRP (open) use one active gateway with standby. Virtual IP + virtual MAC give the redundant default gateway."
    }
  },
  "21": {
    "concept": {
      "type": "mcq",
      "stem": "An interface shows many late collisions and the link is slow. What is the most likely cause?",
      "choices": [
        "Speed mismatch",
        "Duplex mismatch",
        "Bad DNS",
        "Wrong VLAN"
      ],
      "answer": 1,
      "explain": "Duplex mismatch (one full, one half) produces late collisions and a sluggish link. Speed mismatch usually drops the link entirely."
    },
    "scope": {
      "type": "mcq",
      "stem": "Rising CRC and input errors on show interfaces usually point to what?",
      "choices": [
        "A routing loop",
        "A physical/cabling or interference problem",
        "An ACL misconfig",
        "A DHCP scope exhaustion"
      ],
      "answer": 1,
      "explain": "CRC/input errors indicate corrupted frames, typically bad cabling, EMI, or a failing transceiver."
    }
  },
  "22": {
    "concept": {
      "type": "mcq",
      "stem": "A host shows 169.254.10.7 with no gateway. What happened?",
      "choices": [
        "It got a public IP",
        "DHCP failed, so it self-assigned APIPA",
        "It is using a /8 private block",
        "It is multicast"
      ],
      "answer": 1,
      "explain": "APIPA 169.254.0.0/16 is auto-assigned when DHCP fails. The host has only link-local IPv4 connectivity."
    },
    "scope": {
      "type": "mcq",
      "stem": "Which is a valid RFC 1918 private range?",
      "choices": [
        "172.32.0.0/12",
        "192.169.0.0/16",
        "10.0.0.0/8",
        "169.254.0.0/16"
      ],
      "answer": 2,
      "explain": "Private: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. 169.254/16 is APIPA, not RFC 1918."
    }
  },
  "23": {
    "concept": {
      "type": "mcq",
      "stem": "A switch receives a frame for a destination MAC that is NOT in its MAC address table. What does it do?",
      "choices": [
        "Drops the frame",
        "Floods it out all ports except the one it arrived on",
        "Sends it to the default gateway",
        "Buffers it until the MAC is learned"
      ],
      "answer": 1,
      "explain": "Unknown unicast = flood out all ports except the ingress port. The switch learns source MACs and floods unknown destinations."
    },
    "scope": {
      "type": "mcq",
      "stem": "What is the default MAC address table aging time on a Cisco switch?",
      "choices": [
        "30 seconds",
        "120 seconds",
        "300 seconds",
        "600 seconds"
      ],
      "answer": 2,
      "explain": "Default MAC aging is 300 seconds (5 minutes). Verify entries with show mac address-table."
    }
  },
  "24": {
    "concept": {
      "type": "mcq",
      "stem": "Which discovery protocol is the open standard, and what are its timers?",
      "choices": [
        "CDP, 60s/180s",
        "LLDP, 30s/120s",
        "CDP, 30s/120s",
        "LLDP, 60s/180s"
      ],
      "answer": 1,
      "explain": "CDP (Cisco) 60s timer / 180s hold. LLDP (open standard) 30s timer / 120s hold."
    },
    "scope": {
      "type": "mcq",
      "stem": "What do CDP and LLDP both discover?",
      "choices": [
        "Routes across the internet",
        "Directly connected neighbors",
        "DHCP scopes",
        "Spanning-tree root bridges"
      ],
      "answer": 1,
      "explain": "Both are layer-2 link-local protocols that find DIRECTLY connected neighbors only."
    }
  },
  "26": {
    "concept": {
      "type": "mcq",
      "stem": "Which access method sends credentials in plaintext and should be avoided?",
      "choices": [
        "SSH",
        "Telnet",
        "HTTPS",
        "SSHv2"
      ],
      "answer": 1,
      "explain": "Telnet is plaintext. Use SSH (preferably v2) for encrypted management access."
    },
    "scope": {
      "type": "mcq",
      "stem": "Which statement about TACACS+ vs RADIUS is correct?",
      "choices": [
        "RADIUS uses TCP 49 and is Cisco",
        "TACACS+ uses TCP 49 and separates AAA",
        "TACACS+ uses UDP 1812 and merges AAA",
        "RADIUS encrypts the entire packet"
      ],
      "answer": 1,
      "explain": "TACACS+ = Cisco, TCP 49, separates AAA, encrypts whole payload. RADIUS = open, UDP 1812/1813, merges authN+authZ, encrypts only the password."
    }
  },
  "27": {
    "concept": {
      "type": "mcq",
      "stem": "On NTP, what does a lower stratum number indicate?",
      "choices": [
        "A less accurate clock",
        "Closer to the authoritative time source",
        "A higher port number",
        "More hops away"
      ],
      "answer": 1,
      "explain": "Stratum 1-15; lower is closer to the reference clock (more accurate). Stratum 1 is directly attached to a reference."
    },
    "scope": {
      "type": "mcq",
      "stem": "Which command points a device at an upstream time source as a client?",
      "choices": [
        "ntp master",
        "ntp server <ip>",
        "clock set",
        "ntp peer-group"
      ],
      "answer": 1,
      "explain": "ntp server <ip> makes the device a client of that source. ntp master makes the device itself the source."
    }
  },
  "28": {
    "concept": {
      "type": "mcq",
      "stem": "What is the correct order of the DHCP lease process?",
      "choices": [
        "Offer, Discover, Request, Ack",
        "Discover, Offer, Request, Ack",
        "Request, Discover, Offer, Ack",
        "Discover, Request, Offer, Ack"
      ],
      "answer": 1,
      "explain": "DORA: Discover (client broadcast), Offer (server), Request (client), Ack (server). DHCP uses UDP ports 67 (server) and 68 (client)."
    },
    "scope": {
      "type": "mcq",
      "stem": "Which port pair and protocol does DHCP use, and what port does DNS use?",
      "choices": [
        "DHCP UDP 67/68, DNS port 53",
        "DHCP TCP 67/68, DNS port 80",
        "DHCP UDP 53, DNS UDP 67",
        "DHCP UDP 69, DNS TCP 22"
      ],
      "answer": 0,
      "explain": "DHCP uses UDP 67 (server) and 68 (client). DNS uses port 53 (both UDP and TCP). DNS resolves a name to an IP."
    }
  },
  "29": {
    "concept": {
      "type": "mcq",
      "stem": "Which SNMP version is encrypted and authenticated?",
      "choices": [
        "v1",
        "v2c",
        "v3",
        "All versions"
      ],
      "answer": 2,
      "explain": "v1/v2c use plaintext community strings. v3 adds authentication and encryption."
    },
    "scope": {
      "type": "mcq",
      "stem": "What UDP ports does SNMP use?",
      "choices": [
        "161 poll, 162 notify",
        "514 poll, 515 notify",
        "123 poll, 124 notify",
        "69 poll, 70 notify"
      ],
      "answer": 0,
      "explain": "SNMP 161 (polling/get) and 162 (traps/informs)."
    }
  },
  "30": {
    "concept": {
      "type": "mcq",
      "stem": "In syslog, which severity is the most critical?",
      "choices": [
        "7 Debug",
        "4 Warning",
        "0 Emergency",
        "5 Notice"
      ],
      "answer": 2,
      "explain": "Lower number is worse: 0 Emergency is most severe, 7 Debug is least."
    },
    "sequence": {
      "type": "sequence",
      "stem": "Order syslog severities from MOST severe (0) to LEAST severe (7).",
      "steps": [
        "Emergency",
        "Alert",
        "Critical",
        "Error",
        "Warning",
        "Notice",
        "Informational",
        "Debug"
      ]
    },
    "scope": {
      "type": "mcq",
      "stem": "Which severity level number is \"Error\"?",
      "choices": [
        "2",
        "3",
        "4",
        "5"
      ],
      "answer": 1,
      "explain": "0 Emergency, 1 Alert, 2 Critical, 3 Error, 4 Warning, 5 Notice, 6 Info, 7 Debug."
    }
  },
  "32": {
    "concept": {
      "type": "mcq",
      "stem": "Which AAA pillar answers \"what are you allowed to do\"?",
      "choices": [
        "Authentication",
        "Authorization",
        "Accounting",
        "Auditing"
      ],
      "answer": 1,
      "explain": "Authentication = who you are; Authorization = what you can do; Accounting = what you did."
    },
    "scope": {
      "type": "mcq",
      "stem": "Tracking which commands a user ran and when is which AAA function?",
      "choices": [
        "Authentication",
        "Authorization",
        "Accounting",
        "Encryption"
      ],
      "answer": 2,
      "explain": "Accounting records actions taken (commands, session time, data)."
    }
  },
  "33": {
    "concept": {
      "type": "mcq",
      "stem": "WPA3 personal replaces the WPA2 PSK handshake with what?",
      "choices": [
        "TKIP",
        "WEP",
        "SAE",
        "CCMP only"
      ],
      "answer": 2,
      "explain": "WPA3 uses SAE (Simultaneous Authentication of Equals), resistant to offline dictionary attacks."
    },
    "scope": {
      "type": "mcq",
      "stem": "WPA2 uses which encryption cipher?",
      "choices": [
        "RC4",
        "AES/CCMP",
        "DES",
        "3DES"
      ],
      "answer": 1,
      "explain": "WPA2 = AES/CCMP. WEP/WPA (TKIP/RC4) are legacy and broken."
    }
  },
  "43": {
    "concept": {
      "type": "mcq",
      "stem": "Which HTTP method maps to CRUD \"create\"?",
      "choices": [
        "GET",
        "POST",
        "PUT",
        "DELETE"
      ],
      "answer": 1,
      "explain": "CRUD: POST create, GET read, PUT update, DELETE delete. REST is stateless over HTTP."
    },
    "scope": {
      "type": "mcq",
      "stem": "REST API payloads are most commonly formatted as what?",
      "choices": [
        "CSV",
        "JSON",
        "YAML",
        "XML only"
      ],
      "answer": 1,
      "explain": "REST commonly uses JSON payloads, is stateless, and runs over HTTP/HTTPS."
    }
  },
  "44": {
    "concept": {
      "type": "mcq",
      "stem": "Which tool is agentless, uses a push model, and is written in YAML playbooks?",
      "choices": [
        "Terraform",
        "Ansible",
        "Puppet",
        "Chef"
      ],
      "answer": 1,
      "explain": "Ansible: agentless, push, YAML. Terraform: declarative infrastructure as code."
    },
    "scope": {
      "type": "mcq",
      "stem": "Terraform is best described as what?",
      "choices": [
        "An agent-based pull config tool",
        "Declarative infrastructure as code",
        "A packet analyzer",
        "A routing protocol"
      ],
      "answer": 1,
      "explain": "Terraform declares desired infrastructure state and provisions it; it is declarative IaC."
    }
  }
};

  window.PILLAR_CHECKS = PILLAR_CHECKS;
})();
