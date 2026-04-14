/**
 * subtopic-content-d34.js — Expanded study content for CCNA 200-301
 * Domains 3 (IP Connectivity, 25%) and 4 (IP Services, 10%).
 *
 * Each entry: info, visual (animation config), hack (memory/practice/effort/meta).
 * Loaded via <script> tag; attaches to window.subtopicContentD34.
 */
window.subtopicContentD34 = {

  /* ══════════════════════════════════════════════════════════════
     DOMAIN 3 — IP CONNECTIVITY (25%)
  ══════════════════════════════════════════════════════════════ */

  // ── 3.1  Interpret the components of routing table ──────────

  "3.1.a": {
    info: "Every route in the routing table is prefixed with a code letter indicating its source: C for directly connected, S for static, O for OSPF, R for RIP, D for EIGRP, and B for BGP. These codes let you instantly identify how the router learned each route, which matters for troubleshooting and understanding failover behavior.",
    visual: { type: "comparison", params: { left: { label: "IGP Codes", items: ["C — Connected", "S — Static", "O — OSPF", "R — RIP", "D — EIGRP"] }, right: { label: "EGP Codes", items: ["B — BGP", "i — IS-IS", "* — Candidate default", "L — Local", "ia — OSPF inter-area"] } } },
    hack: {
      memory: "CSORD-B: 'Cisco Students Often Ride Dirty Buses' — Connected, Static, OSPF, RIP, EIGRP (D for DUAL), BGP.",
      practice: "On a Packet Tracer lab with 3 routers, configure connected, static, and OSPF routes, then run 'show ip route' and identify every code letter in the output.",
      effort: "low",
      meta: "Flashcard the codes until they're instant — this shows up as 'which code represents...' on the exam repeatedly."
    }
  },

  "3.1.b": {
    info: "The prefix (network address) in a routing table entry identifies the destination network, such as 10.1.1.0 or 192.168.1.0. It represents the network portion of the address before the host bits. The router compares incoming packet destinations against these prefixes to determine where to forward traffic.",
    visual: { type: "packet-flow", params: { nodes: ["Packet: dst 10.1.1.50", "Route Table Lookup", "Match: 10.1.1.0/24", "Forward via next-hop"], color: "#3b82f6" } },
    hack: {
      memory: "The prefix is the 'street name' — the network address. The host bits are the 'house number' within that street.",
      practice: "Given a routing table output, highlight just the network prefixes and practice converting between dotted-decimal and CIDR notation for each.",
      effort: "low",
      meta: "Most students learn this passively while studying subnetting — make sure you can read it in 'show ip route' output without hesitation."
    }
  },

  "3.1.c": {
    info: "The network mask (shown as a subnet mask like 255.255.255.0 or prefix length like /24) defines which bits belong to the network vs. host portion. In routing tables, Cisco IOS displays the prefix length (e.g., /24). The mask determines how specific a route is — a /24 covers 256 addresses while a /30 covers only 4.",
    visual: { type: "binary-breakdown", params: { bits: "11111111.11111111.11111111.00000000", label: "/24 = 255.255.255.0", highlight: [24, 25, 26, 27] } },
    hack: {
      memory: "Mask = stencil. Network bits are the cutout (must match), host bits are the open area (can be anything).",
      practice: "Create a flashcard deck: one side shows a prefix length (/16 through /30), the other shows the dotted-decimal mask and number of hosts. Drill until sub-2-second recall.",
      effort: "medium",
      meta: "Subnetting speed is the #1 skill that separates people who pass from those who fail. Practice the 'magic number' method for fast subnet math."
    }
  },

  "3.1.d": {
    info: "The next hop is the IP address of the next router along the path to reach the destination network. When a router forwards a packet, it sends it to the next-hop IP, which is typically on a directly connected subnet. Connected routes (C) have no next hop because the destination is directly reachable.",
    visual: { type: "packet-flow", params: { nodes: ["R1 (10.0.0.1)", "Next-hop: 10.0.0.2", "R2 (10.0.0.2)", "Destination: 192.168.1.0/24"], color: "#8b5cf6" } },
    hack: {
      memory: "Next hop = next door neighbor. You don't deliver the package yourself — you hand it to your neighbor who's closer to the destination.",
      practice: "In a 4-router Packet Tracer topology, trace a packet hop-by-hop using 'show ip route' on each router and write down every next-hop address in the path.",
      effort: "low",
      meta: "Trace route questions are common — practice reading 'via X.X.X.X' in routing table output and mapping it to topology diagrams."
    }
  },

  "3.1.e": {
    info: "Administrative distance (AD) is a value from 0 to 255 that rates the trustworthiness of the source that provided the route. Lower AD means more trusted. If two routing protocols both know a route to the same destination, the route with the lower AD wins and gets installed in the routing table. AD 255 means 'never use this route.'",
    visual: { type: "layer-stack", params: { layers: ["Connected (0)", "Static (1)", "eBGP (20)", "EIGRP (90)", "OSPF (110)", "RIP (120)"], highlight: 0 } },
    hack: {
      memory: "AD is like a trust score — 0 means 'I see it with my own eyes' (connected), 1 means 'my boss told me' (static), higher numbers mean 'someone I kinda know told me.'",
      practice: "Memorize the default AD values cold: Connected=0, Static=1, eBGP=20, EIGRP=90, OSPF=110, IS-IS=115, RIP=120, iBGP=200. Write them 10 times from memory.",
      effort: "medium",
      meta: "AD values are a guaranteed exam question. The community trick: 'Connected Static = Easy, Big External = 20, Excellent Internal = 90, Open = 110, Runs = 120.'"
    }
  },

  "3.1.f": {
    info: "The metric is the cost value used within a single routing protocol to compare routes to the same destination. Unlike AD (which compares across protocols), the metric compares routes from the same protocol. OSPF uses cost (based on bandwidth), RIP uses hop count, EIGRP uses a composite of bandwidth and delay. Lower metric is always preferred.",
    visual: { type: "comparison", params: { left: { label: "Protocol", items: ["OSPF", "RIP", "EIGRP", "BGP"] }, right: { label: "Metric", items: ["Cost (bandwidth)", "Hop count (max 15)", "Composite (BW + delay)", "AS-path, MED, etc."] } } },
    hack: {
      memory: "Metric = mileage. Two GPS routes from the same app — you pick the shorter one. AD picks the app; metric picks the route within it.",
      practice: "In Packet Tracer, set up OSPF with different bandwidth links and use 'show ip ospf interface' to see cost values. Change bandwidth and watch the metric change.",
      effort: "medium",
      meta: "For the exam, just know what metric each protocol uses and that lower is better. Don't memorize EIGRP's composite formula — just know it uses bandwidth + delay."
    }
  },

  "3.1.g": {
    info: "The gateway of last resort is the default route (0.0.0.0/0 for IPv4 or ::/0 for IPv6). When no specific route matches a packet's destination, the router forwards it to this gateway. If no default route exists, the router drops the packet and returns ICMP Destination Unreachable. It appears at the top of 'show ip route' output.",
    visual: { type: "packet-flow", params: { nodes: ["Packet: dst 8.8.8.8", "No specific match", "Gateway of last resort", "Forward to ISP"], color: "#f59e0b" } },
    hack: {
      memory: "Gateway of last resort = 'when in doubt, send it out.' It's the catch-all exit — like the default shipping address when you don't know where something goes.",
      practice: "Configure 'ip route 0.0.0.0 0.0.0.0 [ISP-next-hop]' on a router, then verify with 'show ip route' that the gateway of last resort is set. Remove it and watch what happens.",
      effort: "low",
      meta: "Know that 'Gateway of last resort is not set' means no default route exists. This is a common troubleshooting clue on the exam."
    }
  },

  // ── 3.2  Determine how a router makes a forwarding decision ──

  "3.2.a": {
    info: "Longest prefix match is the primary rule a router uses to select a route. When multiple routes match a destination IP, the router picks the one with the longest subnet mask (most specific match). A /28 route beats a /24 route beats a /16 route for the same destination, because more mask bits mean a more precise match.",
    visual: { type: "hierarchy", params: { root: "Dst: 10.1.1.50", children: [{ name: "10.0.0.0/8 (match)", children: [{ name: "10.1.0.0/16 (better)" , children: [{ name: "10.1.1.0/24 (BEST)" }] }] }] } },
    hack: {
      memory: "Longest prefix = most specific address wins. Like mail delivery: 'USA' matches, but '123 Main St, Apt 4B, Chicago IL' is way more specific and wins.",
      practice: "Write 5 destination IPs and 5 overlapping routes with different prefix lengths. For each IP, determine which route wins by finding the longest match. Time yourself.",
      effort: "medium",
      meta: "This is the single most important routing concept on the exam. Every 'which route will the router use?' question starts here. Master it before anything else."
    }
  },

  "3.2.b": {
    info: "When two routes have the same prefix length (equally specific) but come from different sources (e.g., OSPF and RIP both learned 10.1.1.0/24), the router uses administrative distance as the tiebreaker. The route with the lower AD gets installed in the routing table; the other is kept only by its routing protocol as a backup.",
    visual: { type: "comparison", params: { left: { label: "OSPF Route", items: ["10.1.1.0/24", "AD: 110", "Installed? YES"] }, right: { label: "RIP Route", items: ["10.1.1.0/24", "AD: 120", "Installed? NO"] } } },
    hack: {
      memory: "AD is the second judge. First judge (longest prefix) picks the most specific address. If there's a tie in specificity, second judge picks the most trusted source.",
      practice: "Lab it: configure both OSPF and a static route (AD 1) to the same network. Use 'show ip route' to confirm the static wins. Then shut down the static's exit interface and watch OSPF take over.",
      effort: "medium",
      meta: "The exam loves asking 'which route is in the table when two protocols know the same network?' — always check AD values."
    }
  },

  "3.2.c": {
    info: "Default AD values you must memorize: Connected=0, Static=1, eBGP=20, EIGRP (internal)=90, OSPF=110, IS-IS=115, RIP=120, EIGRP (external)=170, iBGP=200. Connected is the most trusted (you physically see the network), static is manually configured by an admin, and learned routes get progressively less trusted.",
    visual: { type: "layer-stack", params: { layers: ["Connected — 0", "Static — 1", "eBGP — 20", "EIGRP — 90", "OSPF — 110", "IS-IS — 115", "RIP — 120", "iBGP — 200"], highlight: 0 } },
    hack: {
      memory: "Chant: 'Connected 0, Static 1, External BGP 20, EIGRP 90, OSPF 110, IS-IS 115, RIP 120, Internal BGP 200.' Write it on your whiteboard at the exam start.",
      practice: "Create physical flashcards with protocol on front, AD on back. Shuffle and drill until you can recite all 8 in order in under 10 seconds.",
      effort: "low",
      meta: "This is 100% a memorization item. The Boson and Pearson practice exams test these exact values. Write them on the exam whiteboard immediately as a brain dump."
    }
  },

  "3.2.d": {
    info: "When two routes have the same prefix length AND the same AD (meaning both came from the same routing protocol), the router uses the protocol's metric as the final tiebreaker. For OSPF, the lower cost route wins. For RIP, the fewer hops wins. Some protocols (like OSPF and EIGRP) can load-balance across equal-metric paths.",
    visual: { type: "comparison", params: { left: { label: "OSPF Path A", items: ["Cost: 10", "Via Gi0/0", "WINNER"] }, right: { label: "OSPF Path B", items: ["Cost: 20", "Via Gi0/1", "Backup"] } } },
    hack: {
      memory: "Metric = the final tiebreaker within the same family. Two OSPF routes? The cheaper one wins. Two RIP routes? The shorter one wins.",
      practice: "In Packet Tracer, create two OSPF paths to the same network with different bandwidth links. Verify with 'show ip route' which path is selected and confirm the cost values.",
      effort: "medium",
      meta: "Equal-cost multi-path (ECMP) is a favorite exam topic — know that OSPF load-balances across equal-cost paths by default (up to 4 paths)."
    }
  },

  "3.2.e": {
    info: "The complete router forwarding decision follows a strict order: (1) longest prefix match first — most specific route wins, (2) if prefix lengths are equal, lowest AD wins, (3) if AD is also equal (same protocol), lowest metric wins. This three-step hierarchy is the foundation of all IP routing and is heavily tested on the CCNA.",
    visual: { type: "state-machine", params: { states: ["1. Longest Prefix Match", "2. Lowest AD", "3. Lowest Metric"], active: 0, transitions: true } },
    hack: {
      memory: "PAM: Prefix first, AD second, Metric third. 'Please Ask Mom' — always in that order, never skip a step.",
      practice: "Create 10 scenarios with overlapping routes from different sources and practice the three-step decision process on paper. Verify in Packet Tracer with traceroute.",
      effort: "medium",
      meta: "This shows up as multi-step questions: 'Given this routing table, which path does a packet to X.X.X.X take?' Work each step methodically — don't skip to metric."
    }
  },

  // ── 3.3  Configure and verify IPv4 and IPv6 static routing ──

  "3.3.a": {
    info: "A default route (0.0.0.0 0.0.0.0 for IPv4, ::/0 for IPv6) matches all destinations and is used when no more specific route exists. It's typically configured on edge routers pointing toward the ISP. Command: 'ip route 0.0.0.0 0.0.0.0 [next-hop-ip]'. This sets the gateway of last resort.",
    visual: { type: "packet-flow", params: { nodes: ["Branch Router", "Default Route 0.0.0.0/0", "ISP Router", "Internet"], color: "#10b981" } },
    hack: {
      memory: "Default route = 'I don't know where this goes, so send it to the internet.' It's the router's shrug emoji.",
      practice: "Lab: configure a default route on a branch router pointing to an ISP router. Verify with 'show ip route' that the gateway of last resort is set. Ping an external IP to confirm.",
      effort: "medium",
      meta: "Default route configuration is a near-guaranteed lab sim on the exam. Practice the exact command syntax until it's muscle memory."
    }
  },

  "3.3.b": {
    info: "A network route specifies a path to a particular destination network. Command: 'ip route [network] [mask] [next-hop-ip or exit-interface]'. For example, 'ip route 10.1.1.0 255.255.255.0 192.168.1.2' tells the router to reach the 10.1.1.0/24 network via 192.168.1.2. These are manually configured and don't adapt to topology changes.",
    visual: { type: "packet-flow", params: { nodes: ["R1", "Static: 10.1.1.0/24 via R2", "R2", "10.1.1.0/24 Network"], color: "#6366f1" } },
    hack: {
      memory: "Network route = manual GPS waypoint. You're telling the router exactly: 'to reach THAT network, go through THIS next hop.'",
      practice: "Build a 3-router chain in Packet Tracer. Configure static network routes on each router so all networks are reachable end-to-end. Verify with ping and traceroute.",
      effort: "medium",
      meta: "Know the difference between using a next-hop IP vs. an exit interface. Next-hop IP is preferred on multi-access networks to avoid ambiguity."
    }
  },

  "3.3.c": {
    info: "A host route uses a /32 prefix length (255.255.255.255 mask) to create a route to a single specific IP address. This is the most specific route possible. Host routes appear in routing tables for router interface IPs (marked as 'L' for local) and can be manually created: 'ip route 10.1.1.100 255.255.255.255 192.168.1.2'.",
    visual: { type: "binary-breakdown", params: { bits: "11111111.11111111.11111111.11111111", label: "/32 = Single host", highlight: [0, 8, 16, 24, 31] } },
    hack: {
      memory: "/32 = 'one and only one.' Every bit is network — zero host bits means exactly one address. Like putting a GPS pin on one house instead of a whole street.",
      practice: "In 'show ip route', identify the 'L' (local) entries — these are /32 host routes for the router's own interfaces. Then configure a manual /32 route to a specific server IP.",
      effort: "low",
      meta: "Host routes are tested indirectly — know that /32 always wins longest prefix match against any broader route. Also know that 'L' codes in the routing table are automatic /32s."
    }
  },

  "3.3.d": {
    info: "A floating static route is a static route configured with a higher AD than the primary route, so it stays out of the routing table unless the primary fails. For example, 'ip route 10.1.1.0 255.255.255.0 192.168.2.2 210' sets AD to 210, which is higher than any routing protocol's default AD. It only activates when the primary route disappears.",
    visual: { type: "state-machine", params: { states: ["Primary (OSPF AD 110)", "Link Failure", "Floating Static (AD 210) Activates"], active: 0, transitions: true } },
    hack: {
      memory: "Floating static = the backup generator. It sits idle (higher AD keeps it out of the table) until the main power (primary route) fails, then it kicks in.",
      practice: "Lab: configure OSPF as primary to a network and a floating static with AD 210 as backup. Shut down the OSPF link and verify the floating static takes over with 'show ip route'.",
      effort: "high",
      meta: "This is a favorite exam scenario. The key detail: you MUST set the AD higher than the primary protocol's AD. Students often forget to add the AD number at the end of the command."
    }
  },

  "3.3.e": {
    info: "IPv6 static routes use the command 'ipv6 route [prefix/length] [next-hop-link-local or exit-interface]'. For example: 'ipv6 route 2001:DB8:1::/64 2001:DB8:2::1'. When using a link-local next-hop address (fe80::), you must also specify the exit interface because link-local addresses are ambiguous across interfaces.",
    visual: { type: "packet-flow", params: { nodes: ["R1", "ipv6 route 2001:DB8:1::/64", "via 2001:DB8:2::1", "R2"], color: "#06b6d4" } },
    hack: {
      memory: "IPv6 static = same idea as IPv4, just longer addresses. The gotcha: link-local next-hop MUST include the exit interface (e.g., 'ipv6 route ::/0 fe80::1 GigabitEthernet0/0').",
      practice: "Configure an IPv6-only lab with 3 routers. Use static routes with both global unicast and link-local next-hops. Verify with 'show ipv6 route static'.",
      effort: "high",
      meta: "IPv6 static routing shows up every exam cycle. The most common mistake: forgetting the exit interface when using a link-local next-hop. Practice both forms."
    }
  },

  "3.3.f": {
    info: "Static routes can specify either a next-hop IP address ('ip route 10.0.0.0 255.0.0.0 192.168.1.2') or an exit interface ('ip route 10.0.0.0 255.0.0.0 GigabitEthernet0/0'), or both. Next-hop IP is preferred on multi-access networks (Ethernet) because exit-interface-only causes the router to ARP for every destination. On point-to-point links, exit-interface is fine.",
    visual: { type: "comparison", params: { left: { label: "Next-hop IP", items: ["Recursive lookup", "Works on all link types", "Preferred on Ethernet"] }, right: { label: "Exit Interface", items: ["No recursive lookup", "Best on point-to-point", "Causes ARP issues on Ethernet"] } } },
    hack: {
      memory: "Next-hop IP = 'deliver to that specific person.' Exit interface = 'throw it out that door and hope someone catches it.' On busy streets (Ethernet), be specific.",
      practice: "Configure both styles on the same router to different networks. Use 'debug ip routing' to see the difference in how the router resolves each. Notice the ARP behavior on multi-access segments.",
      effort: "medium",
      meta: "The exam tests whether you know that exit-interface-only on Ethernet is problematic. Cisco recommends next-hop IP (or both) on multi-access networks."
    }
  },

  "3.3.g": {
    info: "Verification commands for static routing: 'show ip route static' displays only static routes, 'show ip route' shows the full routing table with static routes marked 'S', 'show ipv6 route' for IPv6, and 'show running-config | include ip route' shows the configured commands. Always verify both directions of traffic flow.",
    visual: { type: "comparison", params: { left: { label: "IPv4 Verify", items: ["show ip route static", "show ip route", "show run | inc ip route"] }, right: { label: "IPv6 Verify", items: ["show ipv6 route static", "show ipv6 route", "show run | inc ipv6 route"] } } },
    hack: {
      memory: "Three checks: 'Is it configured?' (show run), 'Is it in the table?' (show ip route), 'Does it work?' (ping + traceroute). Never skip the third.",
      practice: "After every static route you configure in lab, run all three verification commands before moving on. Build the habit of checking the table, not just the config.",
      effort: "low",
      meta: "Exam sims give you a routing table and ask what's wrong. Practice reading 'show ip route' output quickly — know what S, S*, and S~ mean."
    }
  },

  // ── 3.4  Configure and verify single area OSPFv2 ───────────

  "3.4.a": {
    info: "OSPF neighbor adjacencies require matching Hello interval, Dead interval, area ID, subnet mask, and authentication type. Routers exchange Hello packets on OSPF-enabled interfaces to discover and maintain neighbors. If any parameter mismatches, the adjacency won't form. The default Hello timer is 10 seconds on broadcast/P2P and 30 seconds on NBMA; Dead timer is 4x Hello.",
    visual: { type: "handshake", params: { leftLabel: "R1", rightLabel: "R2", steps: ["Hello (area 0, timer 10) ->", "<- Hello (area 0, timer 10)", "2-Way State", "DB Exchange ->", "<- DB Exchange", "Full Adjacency"] } },
    hack: {
      memory: "HATS-N: Hello timer, Area ID, Type (network), Subnet mask, N(authentication) — all must match for neighbors to form.",
      practice: "In Packet Tracer, intentionally mismatch one parameter at a time (Hello timer, area ID, subnet) and observe the 'show ip ospf neighbor' output. Note which states get stuck.",
      effort: "high",
      meta: "The #1 OSPF troubleshooting question: 'Why are neighbors not forming?' Memorize the 5 match requirements and check each one systematically."
    }
  },

  "3.4.b": {
    info: "On point-to-point network types (serial links, GRE tunnels), OSPF does not elect a DR or BDR because there are only two routers. Adjacency forms directly between the two neighbors and reaches Full state immediately after database exchange. This simplifies OSPF operation and reduces convergence time on these link types.",
    visual: { type: "handshake", params: { leftLabel: "R1", rightLabel: "R2", steps: ["Hello (P2P) ->", "<- Hello (P2P)", "ExStart/Exchange", "Full (No DR/BDR)"] } },
    hack: {
      memory: "Point-to-point = only two people in the room. No need to elect a leader (DR) when there's just you and one other person.",
      practice: "Configure OSPF on a serial link between two routers. Verify with 'show ip ospf interface' that the network type is POINT_TO_POINT and that DR/BDR fields show 'No DR'.",
      effort: "medium",
      meta: "Know that you can manually change the OSPF network type with 'ip ospf network point-to-point' on Ethernet links — this skips DR election and is a valid exam topic."
    }
  },

  "3.4.c": {
    info: "On broadcast networks (Ethernet), OSPF elects a Designated Router (DR) and Backup Designated Router (BDR) to reduce flooding overhead. The router with the highest OSPF priority wins; if priorities are tied, the highest router ID breaks the tie. Priority 0 means 'never become DR.' The DR election is non-preemptive — once elected, a DR stays until it fails.",
    visual: { type: "hierarchy", params: { root: "DR Election", children: [{ name: "Highest Priority Wins", children: [{ name: "Tie? Highest Router ID" }, { name: "Priority 0 = Never DR" }] }, { name: "Non-preemptive", children: [{ name: "DR stays until failure" }] }] } },
    hack: {
      memory: "DR election = class president election: highest priority wins, ties broken by student ID (router ID), and once elected you stay until you graduate (fail). Priority 0 = 'I'm not running.'",
      practice: "Set up 3 routers on the same Ethernet segment with different OSPF priorities. Verify DR/BDR with 'show ip ospf neighbor'. Change priorities, clear OSPF process, and watch the new election.",
      effort: "high",
      meta: "Non-preemptive is the trap answer. Students assume changing priority immediately changes the DR — it doesn't until OSPF is reset or the DR fails. The exam tests this."
    }
  },

  "3.4.d": {
    info: "The OSPF router ID is a 32-bit value that uniquely identifies the router in the OSPF domain. Selection priority: (1) manually configured with 'router-id X.X.X.X', (2) highest IP on any loopback interface, (3) highest IP on any active physical interface. The router ID is set at OSPF process start and doesn't change until the process restarts.",
    visual: { type: "state-machine", params: { states: ["1. Manual router-id", "2. Highest Loopback IP", "3. Highest Physical IP"], active: 0, transitions: true } },
    hack: {
      memory: "Router ID priority: MLP — Manual, Loopback, Physical. 'My Loopback's Perfect' — manual beats loopback beats physical.",
      practice: "Configure a router with a loopback and a physical IP. Start OSPF without a manual router-id and verify which IP was chosen. Then add 'router-id 1.1.1.1' and notice it doesn't change until you 'clear ip ospf process'.",
      effort: "medium",
      meta: "The 'clear ip ospf process' requirement is tested. Know that changing the router-id requires a process restart. Always manually set router-id in production for predictability."
    }
  },

  "3.4.e": {
    info: "Basic OSPF configuration: 'router ospf [process-id]' enters OSPF config mode (process-id is locally significant). 'network [ip] [wildcard-mask] area [area-id]' enables OSPF on matching interfaces. Alternatively, 'ip ospf [process-id] area [area-id]' directly on the interface. Single-area OSPF puts everything in area 0 (backbone).",
    visual: { type: "layer-stack", params: { layers: ["router ospf 1", "router-id 1.1.1.1", "network 10.0.0.0 0.0.0.255 area 0", "network 192.168.1.0 0.0.0.3 area 0", "passive-interface default"], highlight: 2 } },
    hack: {
      memory: "OSPF config recipe: 'Router OSPF [number], Network [IP] [wildcard] Area [0].' The process ID is local only — it doesn't need to match between routers.",
      practice: "Configure single-area OSPF on a 3-router triangle topology. Use 'network' statements with correct wildcard masks. Verify all neighbors reach Full state. Then redo it using the interface-level 'ip ospf' command instead.",
      effort: "high",
      meta: "Wildcard masks trip up many students. Remember: wildcard = inverse of subnet mask. 255.255.255.0 mask = 0.0.0.255 wildcard. The interface-level command avoids wildcard mask issues entirely."
    }
  },

  "3.4.f": {
    info: "A passive interface participates in OSPF (its network is advertised) but does not send or receive Hello packets. Use 'passive-interface [interface]' for specific interfaces or 'passive-interface default' to make all interfaces passive, then use 'no passive-interface [interface]' on interfaces that need to form adjacencies. Typically, LAN interfaces facing end users should be passive.",
    visual: { type: "comparison", params: { left: { label: "Active Interface", items: ["Sends Hellos", "Forms adjacencies", "Advertises network", "Facing other routers"] }, right: { label: "Passive Interface", items: ["No Hellos sent", "No adjacencies", "Still advertises network", "Facing end devices"] } } },
    hack: {
      memory: "Passive = 'advertise but don't talk.' Like posting a sign on your door (network is known) but never opening it to chat with neighbors (no Hellos).",
      practice: "Configure 'passive-interface default' then selectively enable interfaces with 'no passive-interface'. Verify with 'show ip ospf interface' — passive interfaces show 'No Hellos.'",
      effort: "medium",
      meta: "Best practice tested on the exam: always use 'passive-interface default' and only activate the interfaces you need. This prevents accidental OSPF adjacencies on user-facing ports."
    }
  },

  "3.4.g": {
    info: "OSPF cost = reference bandwidth / interface bandwidth. Default reference bandwidth is 100 Mbps, so a FastEthernet (100 Mbps) link has cost 1 and a GigabitEthernet (1 Gbps) link also has cost 1 (because 100/1000 rounds to 1). To differentiate, set 'auto-cost reference-bandwidth 10000' (10 Gbps) under the OSPF process. This must be consistent across all OSPF routers.",
    visual: { type: "comparison", params: { left: { label: "Default Ref (100 Mbps)", items: ["10 Mbps = cost 10", "100 Mbps = cost 1", "1 Gbps = cost 1", "10 Gbps = cost 1"] }, right: { label: "Ref 10000 Mbps", items: ["10 Mbps = cost 1000", "100 Mbps = cost 100", "1 Gbps = cost 10", "10 Gbps = cost 1"] } } },
    hack: {
      memory: "Cost = reference / bandwidth. Default reference is 100 Mbps, which makes anything GigE or faster all cost 1. Bump the reference to fix this — '10000' is the go-to value.",
      practice: "Configure auto-cost reference-bandwidth 10000 on all routers. Verify costs with 'show ip ospf interface brief'. Also manually set cost with 'ip ospf cost [value]' on one interface to see the override.",
      effort: "medium",
      meta: "The exam expects you to calculate OSPF cost given a reference bandwidth. Memorize: cost = ref / BW. Also know that 'ip ospf cost' on the interface overrides the calculated value."
    }
  },

  "3.4.h": {
    info: "To inject a default route into OSPF, use 'default-information originate' under the OSPF process. This advertises 0.0.0.0/0 to all OSPF neighbors, but only if the originating router already has a default route in its table. Adding 'always' ('default-information originate always') advertises it regardless of whether a default route exists locally.",
    visual: { type: "packet-flow", params: { nodes: ["Edge Router", "default-information originate", "OSPF Area 0", "All Routers Learn 0.0.0.0/0"], color: "#f43f5e" } },
    hack: {
      memory: "'default-information originate' = 'I know the way out — follow me.' Without 'always', the router only says this if it actually has a default route itself (no lying).",
      practice: "Configure a default static route on an edge router pointing to an ISP, then add 'default-information originate' under OSPF. Verify other routers learn the default route via OSPF with 'show ip route'.",
      effort: "medium",
      meta: "The 'always' keyword is the gotcha. Without it, the default route must exist in the local routing table before OSPF will advertise it. The exam tests this distinction."
    }
  },

  "3.4.i": {
    info: "Key OSPF verification commands: 'show ip ospf neighbor' shows neighbor states (look for Full or 2-Way), 'show ip ospf interface [interface]' shows area, cost, timers, DR/BDR, network type, and passive status. 'show ip ospf' shows the router ID and area info. 'show ip route ospf' filters the routing table to OSPF-learned routes only.",
    visual: { type: "comparison", params: { left: { label: "Neighbor Verification", items: ["show ip ospf neighbor", "Look for FULL state", "Check DR/BDR roles"] }, right: { label: "Interface Verification", items: ["show ip ospf interface", "Check cost, timers", "Verify area, network type"] } } },
    hack: {
      memory: "The big three OSPF 'show' commands: Neighbor (who are my friends?), Interface (what are my settings?), Route (what did I learn?). NI-R = 'Near IR' like thermal vision.",
      practice: "After every OSPF lab, run all verification commands and interpret every field. Practice identifying stuck states (INIT, EXSTART) and their common causes.",
      effort: "medium",
      meta: "Exam sims show you output from these commands and ask you to identify the problem. Practice reading the output until you can spot mismatches, wrong states, and cost issues at a glance."
    }
  },

  // ── 3.5  Describe first hop redundancy protocols ────────────

  "3.5.a": {
    info: "First Hop Redundancy Protocols (FHRPs) provide a virtual default gateway IP shared between multiple routers. Hosts point to the virtual IP as their gateway. If the active router fails, a standby router takes over the virtual IP seamlessly. This prevents a single point of failure at the default gateway — critical because hosts typically have only one gateway configured.",
    visual: { type: "hierarchy", params: { root: "Virtual IP: 10.0.0.1", children: [{ name: "Active Router (R1)", children: [{ name: "Physical: 10.0.0.2" }] }, { name: "Standby Router (R2)", children: [{ name: "Physical: 10.0.0.3" }] }] } },
    hack: {
      memory: "FHRP = 'two pilots in the cockpit.' Passengers (hosts) always talk to 'the pilot' (virtual IP). If pilot 1 passes out, pilot 2 takes the controls instantly.",
      practice: "Draw a diagram with two routers, one switch, and PCs. Assign the virtual IP as the PC gateway. Think through what happens when you unplug each router.",
      effort: "low",
      meta: "Understand the WHY before the HOW. The exam asks 'which technology prevents gateway failure?' and 'what do hosts configure as their gateway in an FHRP setup?'"
    }
  },

  "3.5.b": {
    info: "HSRP (Hot Standby Router Protocol) is Cisco proprietary. One router is Active, one is Standby, others are in Listen state. The Active router responds to the virtual IP (and virtual MAC 0000.0c07.acXX where XX is the group number in hex). HSRP uses UDP port 1985 and multicast 224.0.0.2. Default Hello is 3 seconds, Hold is 10 seconds.",
    visual: { type: "handshake", params: { leftLabel: "Active (R1)", rightLabel: "Standby (R2)", steps: ["Hello (priority 110) ->", "<- Hello (priority 100)", "R1 is Active", "R1 fails ->", "<- R2 becomes Active", "Hosts see no change"] } },
    hack: {
      memory: "HSRP = 'Hot Standby = Hollywood Stunt Person.' The stunt double (Standby) waits quietly, then jumps in when the star (Active) goes down. Cisco-only, like Hollywood.",
      practice: "Configure HSRP group 1 on two routers with different priorities. Use 'show standby' to verify Active/Standby roles. Shut the Active router's interface and watch failover happen.",
      effort: "high",
      meta: "Know: HSRP = Cisco, Active/Standby terminology, virtual MAC format, default timers. The exam differentiates HSRP from VRRP by terminology — Active vs Master."
    }
  },

  "3.5.c": {
    info: "HSRPv2 extends HSRP with IPv6 support, expands group numbers from 0-255 to 0-4095, uses a new virtual MAC format (0000.0c9f.fXXX), and multicasts to 224.0.0.102 (IPv4) or ff02::66 (IPv6) instead of 224.0.0.2. HSRPv2 is not compatible with HSRPv1 — all routers in a group must run the same version.",
    visual: { type: "comparison", params: { left: { label: "HSRPv1", items: ["Groups 0-255", "MAC: 0000.0c07.acXX", "Multicast: 224.0.0.2", "IPv4 only"] }, right: { label: "HSRPv2", items: ["Groups 0-4095", "MAC: 0000.0c9f.fXXX", "Multicast: 224.0.0.102", "IPv4 + IPv6"] } } },
    hack: {
      memory: "v2 = 'Version 2 has More of everything' — more groups (4095), more addresses (IPv6), new MAC format. Not backward compatible.",
      practice: "Configure both versions in separate labs and compare 'show standby' output. Note the different MAC addresses and multicast groups.",
      effort: "low",
      meta: "The exam rarely deep-dives HSRPv2 specifics, but you must know it supports IPv6 and uses different MAC/multicast addresses. A single comparison flashcard covers it."
    }
  },

  "3.5.d": {
    info: "VRRP (Virtual Router Redundancy Protocol) is an open standard (RFC 5798). It uses Master/Backup terminology instead of Active/Standby. The virtual IP CAN be the same as one router's physical IP (unlike HSRP). VRRP uses multicast 224.0.0.18 and IP protocol 112. Default advertisement is 1 second. Preemption is enabled by default in VRRP.",
    visual: { type: "comparison", params: { left: { label: "HSRP (Cisco)", items: ["Active / Standby", "Virtual IP != physical", "Preempt off by default", "UDP 1985"] }, right: { label: "VRRP (Open)", items: ["Master / Backup", "Virtual IP can = physical", "Preempt on by default", "IP protocol 112"] } } },
    hack: {
      memory: "VRRP = open standard = 'Very Reliable Protocol for everyone.' Key difference from HSRP: Master/Backup (not Active/Standby) and preemption ON by default.",
      practice: "Create a comparison table: HSRP vs VRRP — roles, timers, preemption default, multicast, virtual IP rules. This is a guaranteed comparison question on the exam.",
      effort: "low",
      meta: "The exam tests terminology differences: if you see 'Master/Backup' it's VRRP; if you see 'Active/Standby' it's HSRP. Also know VRRP allows the virtual IP to match a physical IP."
    }
  },

  "3.5.e": {
    info: "GLBP (Gateway Load Balancing Protocol) is Cisco proprietary and unique because it provides both redundancy AND load balancing. One router is the AVG (Active Virtual Gateway) that assigns virtual MACs to up to 4 AVF (Active Virtual Forwarders). Different hosts get different virtual MACs for the same virtual IP, distributing traffic across all routers.",
    visual: { type: "hierarchy", params: { root: "Virtual IP: 10.0.0.1", children: [{ name: "AVG (R1) assigns MACs", children: [{ name: "AVF1: MAC-A (R1)" }, { name: "AVF2: MAC-B (R2)" }, { name: "AVF3: MAC-C (R3)" }] }] } },
    hack: {
      memory: "GLBP = 'Group Load Balancing Protocol.' It's the only FHRP that load-balances. AVG = the boss who assigns work (MACs). AVFs = the workers who carry the traffic.",
      practice: "Understand the concept — GLBP rarely appears in Packet Tracer labs. Draw the AVG/AVF relationship and how ARP responses distribute different MACs to different hosts.",
      effort: "low",
      meta: "GLBP shows up as a 'which protocol provides gateway load balancing?' question. One-liner answer: GLBP. Know it's Cisco-only and uses AVG/AVF terminology."
    }
  },

  "3.5.f": {
    info: "Preemption allows a higher-priority router to reclaim the active/master role when it comes back online after a failure. In HSRP, preemption is OFF by default — the standby router that took over stays active even when the original returns. In VRRP, preemption is ON by default. Enable HSRP preemption with 'standby [group] preempt'. This is critical for predictable failover behavior.",
    visual: { type: "state-machine", params: { states: ["R1 Active (pri 110)", "R1 Fails -> R2 Active", "R1 Returns", "Preempt ON: R1 reclaims", "Preempt OFF: R2 stays"], active: 3, transitions: true } },
    hack: {
      memory: "Preemption = 'I'm back and I'm taking over.' HSRP: off by default (polite — doesn't steal back). VRRP: on by default (assertive — immediately reclaims).",
      practice: "Configure HSRP with preempt enabled on the higher-priority router. Simulate failover by shutting the active interface, letting standby take over, then bringing the interface back up. Verify the role change.",
      effort: "medium",
      meta: "The preemption default difference between HSRP (off) and VRRP (on) is a classic exam question. Also know that GLBP preemption controls are per-AVF role."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     DOMAIN 4 — IP SERVICES (10%)
  ══════════════════════════════════════════════════════════════ */

  // ── 4.1  Configure and verify NAT ───────────────────────────

  "4.1.a": {
    info: "NAT uses four address types: Inside Local (private IP of the host on the inside network), Inside Global (public IP that represents the inside host to the outside world), Outside Local (how the outside host appears to the inside network, usually same as Outside Global), and Outside Global (the real public IP of the external host). Most exam questions focus on Inside Local vs Inside Global.",
    visual: { type: "comparison", params: { left: { label: "Inside Perspective", items: ["Inside Local: 192.168.1.10", "Inside Global: 203.0.113.5"] }, right: { label: "Outside Perspective", items: ["Outside Local: 8.8.8.8", "Outside Global: 8.8.8.8"] } } },
    hack: {
      memory: "IL-IG-OL-OG: 'I Love Ice cream, Grandma Offers Lots Of Goodness.' Inside Local = your real private IP. Inside Global = your public disguise. Outside is usually the same both ways.",
      practice: "Draw a NAT diagram with inside and outside zones. Label all four address types for a specific traffic flow. Then verify with 'show ip nat translations' in Packet Tracer.",
      effort: "medium",
      meta: "The four NAT addresses are tested as a drag-and-drop or matching question. Focus on Inside Local (private) vs Inside Global (public) — that's where 90% of NAT questions land."
    }
  },

  "4.1.b": {
    info: "Static NAT creates a permanent one-to-one mapping between an inside local address and an inside global address. Command: 'ip nat inside source static [local-ip] [global-ip]'. The mapping is always in the translation table, even when no traffic is flowing. Used for servers that need to be reachable from the outside (web servers, mail servers).",
    visual: { type: "packet-flow", params: { nodes: ["Server 192.168.1.10", "Static NAT", "203.0.113.5", "Internet"], color: "#10b981" } },
    hack: {
      memory: "Static NAT = assigned parking spot. One car (private IP) always gets the same spot (public IP). Reserved 24/7, whether the car is there or not.",
      practice: "Configure static NAT for a web server: 'ip nat inside source static 192.168.1.10 203.0.113.5'. Set inside/outside interfaces. Verify with 'show ip nat translations'.",
      effort: "medium",
      meta: "Static NAT is the simplest to configure and understand. The exam wants you to configure it and verify the translation table shows the permanent mapping."
    }
  },

  "4.1.c": {
    info: "Dynamic NAT maps inside local addresses to a pool of inside global addresses on a first-come, first-served basis. You define a pool of public IPs and an ACL matching internal hosts. When an internal host initiates traffic, NAT assigns an available pool address. If the pool is exhausted, new connections are dropped until a mapping times out.",
    visual: { type: "state-machine", params: { states: ["Host initiates traffic", "ACL matches?", "Pool available?", "NAT mapping created", "Pool exhausted -> DROP"], active: 3, transitions: true } },
    hack: {
      memory: "Dynamic NAT = hotel check-in. Guests (hosts) get assigned available rooms (pool IPs) at arrival. No rooms left? You're turned away. Rooms free up after checkout (timeout).",
      practice: "Configure a NAT pool of 5 public IPs, an ACL, and 'ip nat inside source list [ACL] pool [name]'. Generate traffic from 6+ hosts and observe the 5th mapping works but the 6th fails.",
      effort: "high",
      meta: "Dynamic NAT is rare in practice (PAT is used instead), but the exam tests the concept. Key detail: pool exhaustion drops traffic — this is the main disadvantage vs PAT."
    }
  },

  "4.1.d": {
    info: "PAT (Port Address Translation), also called NAT overload, maps many inside local addresses to a single inside global address by using unique source port numbers to distinguish flows. This is by far the most common NAT type — it's how your home router lets all devices share one public IP. Command: 'ip nat inside source list [ACL] interface [outside-if] overload'.",
    visual: { type: "encapsulation", params: { layers: [{ label: "Host A:1025 -> 203.0.113.1:1025", color: "#3b82f6" }, { label: "Host B:1026 -> 203.0.113.1:1026", color: "#8b5cf6" }, { label: "Host C:1027 -> 203.0.113.1:1027", color: "#10b981" }] } },
    hack: {
      memory: "PAT = apartment building. Everyone shares one street address (public IP) but has different apartment numbers (port numbers). The mailroom (NAT table) sorts it out.",
      practice: "Configure PAT using the outside interface: 'ip nat inside source list 1 interface Gi0/0 overload'. Generate traffic from multiple hosts and verify with 'show ip nat translations' — note the port numbers.",
      effort: "high",
      meta: "PAT is the most tested NAT type. The keyword 'overload' is what makes it PAT. Without 'overload,' it's dynamic NAT. This single keyword distinction is a favorite exam question."
    }
  },

  "4.1.e": {
    info: "NAT requires designating interfaces as inside ('ip nat inside') or outside ('ip nat outside'). The inside interface faces the private network, the outside interface faces the public network or ISP. If you forget to designate interfaces, NAT won't translate any packets even if the NAT rules are correctly configured. This is the most common NAT configuration mistake.",
    visual: { type: "packet-flow", params: { nodes: ["Private LAN", "ip nat inside (Gi0/1)", "Router (NAT)", "ip nat outside (Gi0/0)", "Internet"], color: "#f59e0b" } },
    hack: {
      memory: "Inside faces your people, outside faces the world. Forgetting these commands = NAT is configured but does absolutely nothing. Like installing a door but not cutting a hole in the wall.",
      practice: "Configure NAT without the interface designations first. Test and confirm it doesn't work. Then add 'ip nat inside' and 'ip nat outside' and verify it starts working.",
      effort: "low",
      meta: "Missing interface designations is the #1 NAT troubleshooting scenario on the exam. If NAT isn't working, check the interfaces first."
    }
  },

  "4.1.f": {
    info: "An ACL is used with dynamic NAT and PAT to define which inside local addresses are eligible for translation. The ACL permits the source networks that should be translated. A standard ACL is typically used (e.g., 'access-list 1 permit 192.168.1.0 0.0.0.255'). Only traffic from hosts matching the ACL permit entries will be translated by NAT.",
    visual: { type: "state-machine", params: { states: ["Packet arrives (inside)", "ACL check: permitted?", "YES -> NAT translates", "NO -> No translation"], active: 2, transitions: true } },
    hack: {
      memory: "The ACL is the guest list for NAT. Only hosts on the list get their address translated. Everyone else is ignored — not blocked, just not translated.",
      practice: "Configure an ACL that permits only one subnet, then apply it to NAT. Test with hosts from both the permitted and non-permitted subnets. Only the permitted ones should get translated.",
      effort: "medium",
      meta: "Remember: the NAT ACL uses standard ACLs with wildcard masks, matching source addresses only. This ACL does NOT block traffic — it just controls who gets translated."
    }
  },

  "4.1.g": {
    info: "NAT verification: 'show ip nat translations' displays the current translation table (inside local/global, outside local/global, protocol, ports). 'show ip nat statistics' shows hit counts, misses, pool usage, and expired translations. These commands are essential for confirming NAT is working and diagnosing pool exhaustion or stale entries.",
    visual: { type: "comparison", params: { left: { label: "show ip nat translations", items: ["Active mappings", "Inside local/global", "Outside local/global", "Protocol and ports"] }, right: { label: "show ip nat statistics", items: ["Total translations", "Hits and misses", "Pool utilization", "Expired entries"] } } },
    hack: {
      memory: "Translations = 'who is translated right now?' Statistics = 'how is NAT performing overall?' One is the roster, the other is the scoreboard.",
      practice: "After configuring any NAT type, always run both commands. For PAT, note how port numbers differ. For dynamic NAT, watch pool utilization in statistics.",
      effort: "low",
      meta: "The exam shows you 'show ip nat translations' output and asks you to identify the inside local and inside global addresses. Practice reading this output quickly."
    }
  },

  "4.1.h": {
    info: "NAT troubleshooting: 'debug ip nat' shows real-time translation events (use cautiously on production). 'clear ip nat translation *' clears all dynamic entries from the translation table (static entries are permanent and can't be cleared this way). Common issues: missing inside/outside interface designations, wrong ACL, pool exhaustion, or asymmetric routing.",
    visual: { type: "state-machine", params: { states: ["NAT not working", "Check interface designations", "Check ACL matches", "Check pool/overload", "debug ip nat"], active: 1, transitions: true } },
    hack: {
      memory: "NAT troubleshooting checklist: IAPC — Interfaces designated? ACL correct? Pool available? Correct direction? Work from the outside in.",
      practice: "Intentionally break NAT in different ways (remove 'ip nat inside', wrong ACL, exhaust pool) and troubleshoot each one. Run 'debug ip nat' to see what's happening in real time.",
      effort: "high",
      meta: "The exam's NAT troubleshooting questions always start with checking interface designations. If you see 'NAT is not working,' check inside/outside first, then ACL, then pool."
    }
  },

  // ── 4.2  Configure and verify NTP ──────────────────────────

  "4.2.a": {
    info: "NTP (Network Time Protocol) synchronizes device clocks across a network to a common time source. Accurate time is critical for log correlation, certificate validation, authentication protocols (Kerberos), and troubleshooting. Without NTP, logs from different devices show different times, making incident investigation nearly impossible.",
    visual: { type: "hierarchy", params: { root: "Stratum 0 (Atomic Clock)", children: [{ name: "Stratum 1 (NTP Server)", children: [{ name: "Stratum 2 (Core Router)", children: [{ name: "Stratum 3 (Access Switch)" }] }] }] } },
    hack: {
      memory: "NTP = 'Network Time Police.' Everyone must agree on what time it is. Without it, your 2:00 PM log and my 2:05 PM log look like different events.",
      practice: "Configure NTP on a 3-device topology: one NTP server, one client, one downstream client. Verify clocks synchronize with 'show clock' on all devices.",
      effort: "low",
      meta: "Know WHY NTP matters (logs, auth, certs) more than deep protocol details. The exam tests the purpose and basic configuration, not NTP internals."
    }
  },

  "4.2.b": {
    info: "NTP uses a stratum hierarchy from 0 to 15. Stratum 0 is an authoritative time source (atomic clock, GPS) — it's not a network device. Stratum 1 servers connect directly to stratum 0 sources. Each hop adds one stratum level. Stratum 16 means 'unsynchronized' and is not usable. Lower stratum = more accurate time source.",
    visual: { type: "layer-stack", params: { layers: ["Stratum 0 — Atomic clock / GPS", "Stratum 1 — Primary server", "Stratum 2 — Secondary server", "Stratum 3 — Client", "Stratum 16 — Unsynchronized"], highlight: 0 } },
    hack: {
      memory: "Stratum = how many handshakes from the atomic clock. Stratum 1 = shook hands with the clock. Stratum 2 = shook hands with someone who shook hands with the clock. 16 = nobody trusts you.",
      practice: "Configure 'ntp master 3' on a router and verify with 'show ntp status' that it shows stratum 3. Then point another router at it and confirm it becomes stratum 4.",
      effort: "low",
      meta: "Memorize: stratum 0 = hardware clock, stratum 1-15 = valid, stratum 16 = invalid. The exam asks 'what stratum indicates an unsynchronized device?' Answer: 16."
    }
  },

  "4.2.c": {
    info: "Configure a Cisco device as an NTP client by pointing it to an NTP server: 'ntp server [ip-address]'. The device will send NTP queries to the specified server and synchronize its clock. You can configure multiple NTP servers for redundancy — the device will prefer the one with the lowest stratum and best reachability.",
    visual: { type: "packet-flow", params: { nodes: ["Switch (client)", "ntp server 10.1.1.1", "NTP Server (10.1.1.1)", "Synchronized"], color: "#3b82f6" } },
    hack: {
      memory: "One command to sync: 'ntp server [IP]'. The device asks the server 'what time is it?' and adjusts its clock. Simple as setting a watch to a wall clock.",
      practice: "Configure 'ntp server' pointing to two different servers. Use 'show ntp associations' to see which one the device selected as the preferred source.",
      effort: "low",
      meta: "This is the most basic NTP command. The exam expects you to configure it and verify synchronization. Know 'show ntp associations' shows * for the selected source."
    }
  },

  "4.2.d": {
    info: "A router can act as an NTP server (time source) for other devices using 'ntp master [stratum]'. This makes the router advertise itself as an NTP server at the specified stratum level. Use this when there's no external NTP server available — the router uses its own clock as the reference. All downstream clients will be one stratum higher.",
    visual: { type: "hierarchy", params: { root: "ntp master 2 (R1)", children: [{ name: "Client R2 (Stratum 3)", children: [{ name: "Client SW1 (Stratum 4)" }] }, { name: "Client R3 (Stratum 3)" }] } },
    hack: {
      memory: "'ntp master' = 'I am the clock now.' The router becomes the time authority for its part of the network. Set the stratum wisely — too low and it outranks real servers.",
      practice: "Make one router 'ntp master 5', point other devices to it, and verify the stratum chain with 'show ntp status' on each device.",
      effort: "low",
      meta: "The exam tests the relationship between 'ntp server' (I ask someone for time) and 'ntp master' (I tell others the time). Know both commands and when to use each."
    }
  },

  "4.2.e": {
    info: "NTP authentication prevents a device from syncing to a rogue NTP server. Configure with: 'ntp authenticate', 'ntp authentication-key [number] md5 [password]', and 'ntp trusted-key [number]'. Both the server and client must share the same key. Without authentication, any device claiming to be an NTP server could poison the time on your network.",
    visual: { type: "shield", params: { items: ["ntp authenticate", "ntp authentication-key 1 md5 [pass]", "ntp trusted-key 1", "ntp server [ip] key 1"], color: "#10b981" } },
    hack: {
      memory: "NTP auth = secret handshake before syncing clocks. Three steps: turn it on ('ntp authenticate'), define the key, trust the key. Both sides need matching keys.",
      practice: "Configure NTP authentication between two routers. Intentionally mismatch the key on one side and verify synchronization fails. Fix it and confirm sync resumes.",
      effort: "medium",
      meta: "NTP auth questions are less common but do appear. Know the three config commands and that MD5 is used. The key number must match on both sides."
    }
  },

  "4.2.f": {
    info: "NTP verification: 'show ntp status' shows synchronization state, stratum level, reference clock, and last sync time. 'show ntp associations' shows all configured NTP peers/servers with their stratum, reach value, and delay. A '*' prefix means this is the selected time source. 'show clock' shows the current device time. If 'show ntp status' says 'Clock is unsynchronized,' NTP is not working.",
    visual: { type: "comparison", params: { left: { label: "show ntp status", items: ["Synchronized / Unsync", "Current stratum", "Reference clock IP", "Root delay"] }, right: { label: "show ntp associations", items: ["All configured peers", "* = selected source", "Reach and delay", "Stratum per peer"] } } },
    hack: {
      memory: "Status = 'Am I synced and what stratum am I?' Associations = 'Who are my time sources and which one did I pick?'",
      practice: "Run both commands after NTP setup. Identify the * (selected source) in associations. Compare stratum in status vs associations. Check that 'Clock is synchronized' appears.",
      effort: "low",
      meta: "The exam shows 'show ntp associations' output and asks which server is selected. Look for the * symbol. Also know that reach of 377 (octal) means all 8 recent polls succeeded."
    }
  },

  // ── 4.3  Explain DHCP and DNS ──────────────────────────────

  "4.3.a": {
    info: "DHCP uses a four-step process called DORA: Discover (client broadcasts looking for a server), Offer (server responds with an IP address offer), Request (client broadcasts accepting the offer), Acknowledge (server confirms the lease). All four messages use UDP — client sends from port 68, server responds on port 67. The first two steps are broadcast because the client has no IP yet.",
    visual: { type: "handshake", params: { leftLabel: "Client (:68)", rightLabel: "Server (:67)", steps: ["DISCOVER (broadcast) ->", "<- OFFER (unicast/broadcast)", "REQUEST (broadcast) ->", "<- ACKNOWLEDGE"] } },
    hack: {
      memory: "DORA: 'Dora the Explorer Discovers Offers, Requests Acknowledgement.' Or simply: D-O-R-A = Discover, Offer, Request, Ack.",
      practice: "In Packet Tracer, set up a DHCP server and client. Use simulation mode to watch all 4 DORA packets. Note source/destination IPs and ports on each packet.",
      effort: "medium",
      meta: "DORA is tested in every CCNA exam. Know the order, which ones are broadcast, the UDP ports (67/68), and that the client sends Discover and Request as broadcasts."
    }
  },

  "4.3.b": {
    info: "A DHCP server provides clients with: IP address, subnet mask, default gateway, DNS server address(es), and a lease duration. Additional options can include domain name, TFTP server, NTP server, and WINS server. The lease duration determines how long the client can use the assigned IP before it must renew. All of these parameters are configured in the DHCP pool.",
    visual: { type: "encapsulation", params: { layers: [{ label: "IP Address: 192.168.1.10", color: "#3b82f6" }, { label: "Mask: 255.255.255.0", color: "#8b5cf6" }, { label: "Gateway: 192.168.1.1", color: "#10b981" }, { label: "DNS: 8.8.8.8", color: "#f59e0b" }, { label: "Lease: 24 hours", color: "#ef4444" }] } },
    hack: {
      memory: "DHCP gives you the 'Big 4': IP, Mask, Gateway, DNS. Plus a lease timer that says 'come back and renew before this expires.'",
      practice: "Configure a DHCP pool on a router with all parameters. Connect a client and verify it received all settings with 'ipconfig /all' (Windows) or 'show dhcp lease' (Cisco).",
      effort: "medium",
      meta: "The exam asks what DHCP provides. The 'Big 4' plus lease time cover every answer. Know that the default gateway is set with 'default-router' in the DHCP pool config."
    }
  },

  "4.3.c": {
    info: "DHCP lease renewal happens automatically at two intervals: at 50% of the lease time (T1), the client unicasts a renewal request directly to the DHCP server that issued the lease. If that fails, at 87.5% (T2), the client broadcasts a renewal request to any available DHCP server. If both fail and the lease expires, the client must restart the DORA process.",
    visual: { type: "state-machine", params: { states: ["Lease granted", "T1 (50%) — Unicast renew", "T2 (87.5%) — Broadcast renew", "Lease expires — DORA restart"], active: 1, transitions: true } },
    hack: {
      memory: "50% = polite ask (unicast to your server). 87.5% = desperate shout (broadcast to anyone). 100% = game over, start from scratch with DORA.",
      practice: "Set a short DHCP lease time (e.g., 2 minutes) and watch the renewal process with packet captures. Note the unicast at 50% and broadcast at 87.5%.",
      effort: "low",
      meta: "Know the two percentages: 50% unicast, 87.5% broadcast. The exam asks 'at what point does a DHCP client attempt to renew its lease?' Answer: 50% of the lease time."
    }
  },

  "4.3.d": {
    info: "Common DNS record types: A record maps hostname to IPv4 address, AAAA record maps hostname to IPv6 address, CNAME creates an alias (www -> server1), MX defines the mail server for a domain, PTR provides reverse lookup (IP to hostname), and NS identifies authoritative name servers for the domain. SOA defines zone authority and timing parameters.",
    visual: { type: "comparison", params: { left: { label: "Forward Records", items: ["A — host -> IPv4", "AAAA — host -> IPv6", "CNAME — alias -> host", "MX — domain -> mail server"] }, right: { label: "Other Records", items: ["PTR — IPv4 -> host (reverse)", "NS — domain -> name server", "SOA — zone authority", "TXT — arbitrary text"] } } },
    hack: {
      memory: "A = Address (IPv4), AAAA = Address x4 (IPv6, 4 times bigger), CNAME = 'C' for Clone/alias, MX = Mail eXchange, PTR = PoinTeR (reverse), NS = Name Server.",
      practice: "Use 'nslookup' or 'dig' to query each record type for a real domain. Example: 'nslookup -type=MX gmail.com' to see Google's mail servers.",
      effort: "low",
      meta: "Memorize all 6 record types and what they do. The exam asks 'which DNS record type resolves a hostname to an IPv6 address?' Answer: AAAA. These are rapid-fire recall questions."
    }
  },

  "4.3.e": {
    info: "DNS resolution uses two query modes: recursive queries (client asks its DNS server to do all the work and return the final answer — the server queries other servers on behalf of the client) and iterative queries (the DNS server returns a referral to another server and the client follows up). Clients typically use recursive; servers use iterative between themselves.",
    visual: { type: "packet-flow", params: { nodes: ["Client (recursive query)", "Local DNS Server", "Root -> TLD -> Auth (iterative)", "Final Answer returned"], color: "#8b5cf6" } },
    hack: {
      memory: "Recursive = 'Do all the work for me and give me the answer.' Iterative = 'I'll give you a hint, go ask them yourself.' Clients are lazy (recursive), servers are cooperative (iterative).",
      practice: "Use 'dig +trace example.com' to see the full iterative resolution chain from root to authoritative server. Understand each referral step.",
      effort: "low",
      meta: "The exam tests whether you know the difference. Recursive = server does all the work. Iterative = server returns referrals. Clients use recursive queries to their local DNS."
    }
  },

  "4.3.f": {
    info: "DNS hierarchy follows a tree structure: Root servers (.) are the top level, then Top-Level Domains (TLD — .com, .org, .net, .edu), then Second-Level Domains (google.com, cisco.com), then subdomains/hosts (www.cisco.com). Resolution starts at the root and works down. There are 13 root server clusters (A through M) that anchor the entire DNS system.",
    visual: { type: "hierarchy", params: { root: ". (Root)", children: [{ name: ".com (TLD)", children: [{ name: "cisco.com (2nd level)", children: [{ name: "www.cisco.com (host)" }] }, { name: "google.com" }] }, { name: ".org (TLD)", children: [{ name: "wikipedia.org" }] }] } },
    hack: {
      memory: "DNS tree: Root (.) -> TLD (.com) -> Domain (cisco.com) -> Host (www). Like a postal system: Country -> State -> City -> Street address.",
      practice: "Trace a DNS lookup manually: start at root, ask for .com, get referred to .com TLD, ask for cisco.com, get referred to Cisco's authoritative DNS, get the answer.",
      effort: "low",
      meta: "Know the hierarchy: root -> TLD -> second-level -> host. Know there are 13 root server clusters. The exam tests this as conceptual knowledge, not deep configuration."
    }
  },

  // ── 4.4  Explain SNMP ──────────────────────────────────────

  "4.4.a": {
    info: "SNMP architecture has three components: the Manager (NMS — Network Management Station) that polls and receives data, the Agent (software running on managed devices that responds to queries and sends traps), and the MIB (Management Information Base — a hierarchical database of objects the agent can report on, like interface stats, CPU, memory).",
    visual: { type: "packet-flow", params: { nodes: ["NMS (Manager)", "SNMP Get/Set (UDP 161)", "Agent + MIB", "Trap/Inform (UDP 162)"], color: "#6366f1" } },
    hack: {
      memory: "Manager = the boss who asks questions. Agent = the employee on-site who answers. MIB = the employee's clipboard with all the stats. Traps = the employee calling the boss with urgent news.",
      practice: "Set up SNMP on a router and poll it from a manager tool (or use 'snmpwalk' from a Linux box). Watch the Get requests and responses. Configure a trap destination.",
      effort: "medium",
      meta: "Know the three components (Manager, Agent, MIB) and the two port numbers: 161 for queries (Get/Set) and 162 for notifications (Trap/Inform)."
    }
  },

  "4.4.b": {
    info: "SNMP messages: Get (manager requests a specific OID value), GetNext (requests the next OID in the MIB tree), GetBulk (retrieves large chunks of MIB data efficiently — SNMPv2+), Set (manager changes a value on the agent), Trap (agent sends unsolicited alert to manager — unreliable, no acknowledgment), Inform (like Trap but acknowledged by the manager — reliable).",
    visual: { type: "comparison", params: { left: { label: "Manager -> Agent", items: ["Get — request specific value", "GetNext — next OID", "GetBulk — bulk retrieval", "Set — change a value"] }, right: { label: "Agent -> Manager", items: ["Trap — unacknowledged alert", "Inform — acknowledged alert", "(port 162 for both)", "Inform is reliable"] } } },
    hack: {
      memory: "Get = 'tell me this.' GetNext = 'tell me the next thing.' GetBulk = 'dump it all.' Set = 'change this.' Trap = 'FIRE!' (and hope someone heard). Inform = 'FIRE! (please confirm you heard me).'",
      practice: "Create flashcards for each message type with its direction (manager->agent or agent->manager) and whether it's acknowledged.",
      effort: "low",
      meta: "Know Trap vs Inform: both are agent-initiated alerts, but Inform is acknowledged (reliable) and Trap is fire-and-forget. This distinction is a common exam question."
    }
  },

  "4.4.c": {
    info: "SNMPv2c uses community strings for authentication — essentially passwords sent in cleartext. 'Read-only' (ro) community allows Get operations, 'Read-write' (rw) allows Get and Set. The default community strings are 'public' (ro) and 'private' (rw). SNMPv2c has no encryption, so community strings and all SNMP data travel in plaintext on the network.",
    visual: { type: "shield", params: { items: ["Community string: 'public' (ro)", "Community string: 'private' (rw)", "NO encryption", "Plaintext authentication"], color: "#f59e0b" } },
    hack: {
      memory: "SNMPv2c = security by honor system. Community strings are passwords sent in the open. Like yelling a secret password across a crowded room.",
      practice: "Configure SNMPv2c with custom community strings (never use default 'public'/'private'). Use a packet capture to see the community string in plaintext — this demonstrates why v3 is needed.",
      effort: "low",
      meta: "The exam asks 'which SNMP version uses community strings without encryption?' Answer: v2c (and v1). Know that community strings are case-sensitive and sent in cleartext."
    }
  },

  "4.4.d": {
    info: "SNMPv3 offers three security levels: noAuthNoPriv (username only, no authentication or encryption — like v2c with usernames), authNoPriv (authentication via MD5 or SHA but no encryption — verifies identity but data is readable), authPriv (authentication plus encryption via DES, 3DES, or AES — full security). Only authPriv provides confidentiality.",
    visual: { type: "layer-stack", params: { layers: ["noAuthNoPriv — username only", "authNoPriv — auth (MD5/SHA), no encrypt", "authPriv — auth + encrypt (AES)"], highlight: 2 } },
    hack: {
      memory: "The three levels escalate: 'no-no' (nothing), 'auth-no' (ID check only), 'auth-priv' (ID check + locked box). Only the last one encrypts the data.",
      practice: "Memorize the three security level names and what each provides. Create a 3-row table: level name, authentication, encryption (yes/no for each).",
      effort: "low",
      meta: "The exam loves 'which SNMPv3 security level provides both authentication and encryption?' Answer: authPriv. Also know the auth algorithms (MD5/SHA) and encryption (AES/DES)."
    }
  },

  "4.4.e": {
    info: "SNMPv3 is the only version that supports encryption (privacy/confidentiality). SNMPv1 and v2c use plaintext community strings with no encryption option. If confidentiality is required for network management traffic, SNMPv3 with authPriv is the only standard choice. This is a critical security consideration and one of the primary reasons to upgrade from v2c.",
    visual: { type: "comparison", params: { left: { label: "SNMPv1 / v2c", items: ["Community strings", "Plaintext only", "No encryption", "No user-based auth"] }, right: { label: "SNMPv3", items: ["Username/group model", "Auth: MD5, SHA", "Encrypt: AES, DES", "Three security levels"] } } },
    hack: {
      memory: "Only v3 encrypts. Period. v1 and v2c = postcards (anyone can read them). v3 with authPriv = sealed, signed letter.",
      practice: "This is pure memorization. Write it down: 'SNMPv3 authPriv = only version + level with encryption' and review daily until the exam.",
      effort: "low",
      meta: "This is a one-liner exam answer that shows up every cycle. 'Which SNMP version provides encryption?' = SNMPv3. 'Which security level?' = authPriv."
    }
  },

  // ── 4.5  Describe syslog ───────────────────────────────────

  "4.5.a": {
    info: "Syslog Level 0 — Emergency: The system is completely unusable. This is the most severe syslog level. Examples include hardware failures that halt the device or kernel panics. In practice, level 0 messages are extremely rare and indicate catastrophic failure requiring immediate attention.",
    visual: { type: "gauge", params: { level: 100, label: "Level 0 — Emergency (Most Severe)", color: "#ef4444" } },
    hack: {
      memory: "Level 0 = 'Everything is on fire.' The system is dead or dying. Lowest number = highest severity.",
      practice: "Part of the full syslog levels drill — memorize all 8 levels in order using the mnemonic below.",
      effort: "low",
      meta: "Remember: lower number = more severe. Level 0 is the worst. The exam tests the mnemonic and severity order more than individual level definitions."
    }
  },

  "4.5.b": {
    info: "Syslog Level 1 — Alert: Immediate action is needed. The system is still running but a critical component requires urgent intervention. Examples include temperature warnings that could damage hardware or critical process failures that will cascade if not addressed immediately.",
    visual: { type: "gauge", params: { level: 90, label: "Level 1 — Alert (Action Needed Now)", color: "#ef4444" } },
    hack: {
      memory: "Level 1 = 'Red alert — act NOW.' The system is alive but something critical needs fixing immediately or it becomes level 0.",
      practice: "Group study: levels 0-3 are 'crisis levels' that should wake you up at night. Levels 4-7 are 'operational levels' for daily monitoring.",
      effort: "low",
      meta: "Levels 0-1 are rare in practice. The exam focuses more on knowing the order and the mnemonic than defining each one precisely."
    }
  },

  "4.5.c": {
    info: "Syslog Level 2 — Critical: A critical condition exists, such as a hard drive failure, memory exhaustion, or a failed hardware component. The system is running but in a degraded state. These events often trigger automatic alerts to administrators and may require hardware replacement or major intervention.",
    visual: { type: "gauge", params: { level: 80, label: "Level 2 — Critical (Degraded State)", color: "#f97316" } },
    hack: {
      memory: "Level 2 = 'Something important broke.' The system limps along but a major component is down. Think hardware failure.",
      practice: "Associate each level with a real-world scenario: 0=dead, 1=act now, 2=broken part, 3=software error, 4=warning, 5=normal event, 6=FYI, 7=verbose details.",
      effort: "low",
      meta: "Level 2 is the 'C' in the mnemonic — Critical. Pair it with real events (disk failure, fan failure) to remember it."
    }
  },

  "4.5.d": {
    info: "Syslog Level 3 — Error: A non-critical error condition, typically a software issue. The device is functional but an operation failed. Examples: an interface going down/up, a routing protocol error, or a failed authentication attempt. These are important but don't indicate hardware failure or imminent system death.",
    visual: { type: "gauge", params: { level: 70, label: "Level 3 — Error (Operation Failed)", color: "#f97316" } },
    hack: {
      memory: "Level 3 = 'Something didn't work but the system is fine.' Like a single dropped call — the phone still works.",
      practice: "On a Cisco device, shut an interface and check syslog output. Interface down/up messages are level 3 (or level 5 depending on the event) — good way to see real syslog in action.",
      effort: "low",
      meta: "Level 3 errors are the most common 'actionable' syslog messages you'll see day-to-day. The exam tests severity ordering, not individual message classification."
    }
  },

  "4.5.e": {
    info: "Syslog Level 4 — Warning: A warning condition exists — not an error yet, but something that could become one if ignored. Examples: nearing memory thresholds, certificate approaching expiration, or configuration inconsistencies. These are 'heads up' messages that inform proactive administrators.",
    visual: { type: "gauge", params: { level: 55, label: "Level 4 — Warning (Potential Problem)", color: "#f59e0b" } },
    hack: {
      memory: "Level 4 = 'Yellow light — pay attention.' Not broken yet, but could be soon. Like a low fuel warning in your car.",
      practice: "When setting 'logging trap [level]', you capture that level and all more severe levels. 'logging trap warnings' captures 0-4. Practice this filter logic.",
      effort: "low",
      meta: "Know that setting a trap level captures that level AND all lower numbers (more severe). 'logging trap 4' = emergencies + alerts + critical + errors + warnings."
    }
  },

  "4.5.f": {
    info: "Syslog Level 5 — Notification: Normal but significant events. These are routine operational messages that indicate normal operation of note — like a routing neighbor coming up, an interface changing state, or a configuration change being saved. Most syslog monitoring systems focus on level 5 and below.",
    visual: { type: "gauge", params: { level: 40, label: "Level 5 — Notification (Normal, Significant)", color: "#10b981" } },
    hack: {
      memory: "Level 5 = 'FYI — this happened and you should know.' Not an error, not a warning, just something noteworthy. Like 'the front door was opened.'",
      practice: "Most Cisco default logging is set to level 5 or 6. Run 'show logging' to see your current level and what messages you're capturing.",
      effort: "low",
      meta: "The transition between levels 4 (warning) and 5 (notification) is where 'problems' end and 'normal events' begin. Good mental dividing line."
    }
  },

  "4.5.g": {
    info: "Syslog Level 6 — Informational: General operational messages that confirm normal device operation. Examples: successful login, command executed, interface statistics. These messages provide useful context for troubleshooting but are too verbose for continuous alerting. Most devices default to this level for console and buffer logging.",
    visual: { type: "gauge", params: { level: 25, label: "Level 6 — Informational (Normal Operation)", color: "#3b82f6" } },
    hack: {
      memory: "Level 6 = 'Everything's fine, here's what happened.' Like a building's security log — nothing wrong, just keeping records.",
      practice: "Check 'show logging' on a device — the buffer usually shows level 6 messages. Scroll through and identify the message types you see most often.",
      effort: "low",
      meta: "Informational = level 6. The exam sometimes tricks you with 'notification' (5) vs 'informational' (6). Know which number goes with which word."
    }
  },

  "4.5.h": {
    info: "Syslog Level 7 — Debugging: Extremely verbose output generated by debug commands. These messages show granular, real-time protocol behavior and are used for active troubleshooting only. Never leave debugging enabled on production devices — it can overwhelm the CPU and crash the router. Always use 'undebug all' when done.",
    visual: { type: "gauge", params: { level: 10, label: "Level 7 — Debugging (Most Verbose)", color: "#6b7280" } },
    hack: {
      memory: "Level 7 = 'show me EVERYTHING.' Like turning on a firehose — useful briefly for troubleshooting but will flood you if left on. Highest number = least severe = most verbose.",
      practice: "Run 'debug ip icmp' on a router, ping something, then immediately 'undebug all'. See the flood of level 7 messages. Understand why you NEVER leave this on in production.",
      effort: "low",
      meta: "The exam asks: 'Which syslog level should NOT be left enabled on production devices?' Answer: 7 (debugging). Also: 'What is the LEAST severe syslog level?' Answer: 7."
    }
  },

  "4.5.i": {
    info: "The classic mnemonic for syslog levels 0-7: Every Awesome Cisco Engineer Will Need Ice cream Daily. Emergency (0), Alert (1), Critical (2), Error (3), Warning (4), Notification (5), Informational (6), Debugging (7). This maps each level to its name and makes the order easy to recall during the exam.",
    visual: { type: "layer-stack", params: { layers: ["0 — Emergency (Every)", "1 — Alert (Awesome)", "2 — Critical (Cisco)", "3 — Error (Engineer)", "4 — Warning (Will)", "5 — Notification (Need)", "6 — Informational (Ice cream)", "7 — Debugging (Daily)"], highlight: 0 } },
    hack: {
      memory: "Every Awesome Cisco Engineer Will Need Ice cream Daily. Write it on your exam whiteboard first thing. EACEWNI D = Emergency, Alert, Critical, Error, Warning, Notification, Informational, Debugging.",
      practice: "Write the mnemonic 5 times from memory. Then write just the level numbers and names without the mnemonic. When you can do both, you're ready.",
      effort: "low",
      meta: "This mnemonic is the #1 community recommendation for syslog levels. Write it on the whiteboard as part of your brain dump at exam start."
    }
  },

  "4.5.j": {
    info: "Syslog messages can be sent to four destinations: console (real-time display on the console port — 'logging console'), monitor/VTY (terminal monitor sessions — 'logging monitor'), buffer (device RAM — 'logging buffered [size]'), and a remote syslog server ('logging host [ip]'). Each destination can have its own severity level filter.",
    visual: { type: "comparison", params: { left: { label: "Local Destinations", items: ["Console — real-time display", "Monitor — VTY sessions", "Buffer — RAM (survives session)"] }, right: { label: "Remote Destination", items: ["Syslog server — centralized", "UDP port 514", "Survives device reboot"] } } },
    hack: {
      memory: "CMBS: Console (direct), Monitor (VTY), Buffer (RAM), Server (remote). 'Cisco Makes Better Switches' = the four log destinations.",
      practice: "Configure all four destinations on a router with different severity levels. Verify with 'show logging' that each destination shows its configured level.",
      effort: "medium",
      meta: "Know that buffer logging is stored in RAM (lost on reboot) and server logging is the only one that persists long-term. The exam asks 'which survives a reboot?' = syslog server."
    }
  },

  "4.5.k": {
    info: "Syslog configuration commands: 'logging host [ip]' sends messages to a remote server, 'logging trap [level]' sets the severity threshold for messages sent to the syslog server (that level and all more severe), 'logging buffered [size] [level]' configures local RAM logging. 'logging console [level]' and 'logging monitor [level]' control local display. 'service timestamps log datetime' adds timestamps to messages.",
    visual: { type: "shield", params: { items: ["logging host 10.1.1.100", "logging trap informational", "logging buffered 16384", "service timestamps log datetime"], color: "#8b5cf6" } },
    hack: {
      memory: "'logging trap' = what goes to the SERVER. 'logging buffered' = what goes to RAM. 'logging console' = what goes to the screen. Each has its own level filter.",
      practice: "Configure 'logging host 10.1.1.100' and 'logging trap warnings' (level 4). Generate some events and verify only levels 0-4 appear at the server. Then change to 'logging trap debugging' and see everything.",
      effort: "medium",
      meta: "The exam tests 'logging trap' heavily. Remember: the level you set is a FLOOR — that level and all LOWER numbers (more severe) are sent. 'logging trap 4' = levels 0 through 4."
    }
  },

  // ── 4.6  Configure DHCP client and relay ───────────────────

  "4.6.a": {
    info: "To configure a Cisco router interface as a DHCP client (receiving its IP address via DHCP), use the command 'ip address dhcp' on the interface. This is common on interfaces connecting to an ISP where the ISP assigns the IP dynamically. The interface will use DORA to obtain an IP address, subnet mask, and optionally a default gateway.",
    visual: { type: "packet-flow", params: { nodes: ["Router Interface", "ip address dhcp", "DHCP Server (ISP)", "IP assigned"], color: "#3b82f6" } },
    hack: {
      memory: "'ip address dhcp' = 'I don't know my address — please assign me one.' Used on ISP-facing interfaces when the ISP controls addressing.",
      practice: "Configure a router interface with 'ip address dhcp' and point it at a DHCP server in Packet Tracer. Verify the assigned address with 'show ip interface brief'.",
      effort: "low",
      meta: "This is a one-command concept. The exam asks 'which command configures an interface to receive its IP via DHCP?' Answer: 'ip address dhcp'. Simple recall."
    }
  },

  "4.6.b": {
    info: "DHCP relay ('ip helper-address [server-ip]') is configured on the router interface facing the clients (the default gateway interface). It converts the client's DHCP broadcast into a unicast directed at the DHCP server on a different subnet. Without it, DHCP Discover broadcasts never reach a server on another network because broadcasts don't cross router boundaries.",
    visual: { type: "packet-flow", params: { nodes: ["Client (broadcast)", "Gateway (ip helper-address)", "Unicast to DHCP Server", "Server responds"], color: "#10b981" } },
    hack: {
      memory: "'ip helper-address' = the router becomes a relay runner. It catches the client's broadcast (which would die at the router) and hand-delivers it as a unicast to the server across the network.",
      practice: "Set up a topology where the DHCP server is on a different subnet than the clients. Without ip helper-address, clients won't get an IP. Add it to the gateway interface and watch it work.",
      effort: "medium",
      meta: "This is heavily tested. Know: configured on the CLIENT-facing interface (not the server-facing one), points to the SERVER's IP, and is needed because broadcasts don't cross routers."
    }
  },

  "4.6.c": {
    info: "DHCP relay is needed because Layer 3 devices (routers) do not forward broadcast traffic between subnets by default. DHCP Discover and Request messages are broadcasts (255.255.255.255). Without a relay agent, these broadcasts are confined to the local subnet and never reach a DHCP server on a different subnet. This is a fundamental networking principle.",
    visual: { type: "comparison", params: { left: { label: "Without Relay", items: ["Client broadcasts DISCOVER", "Router DROPS broadcast", "Server never sees request", "Client gets no IP"] }, right: { label: "With Relay", items: ["Client broadcasts DISCOVER", "Router RELAYS as unicast", "Server receives and responds", "Client gets IP"] } } },
    hack: {
      memory: "Broadcasts are local — they stop at the router. The relay agent is the translator: 'I heard someone shouting on this side, let me call the server on the other side.'",
      practice: "In Packet Tracer simulation mode, watch what happens to a DHCP Discover packet when it hits a router without ip helper-address — it gets dropped. Then add the command and re-test.",
      effort: "low",
      meta: "The 'why' behind DHCP relay is tested as a concept question: 'Why can't a client on subnet A get a DHCP address from a server on subnet B?' Answer: broadcasts don't cross routers."
    }
  },

  "4.6.d": {
    info: "Configuring a Cisco router as a DHCP server: 'ip dhcp pool [name]' creates the pool, 'network [network] [mask]' defines the scope, 'default-router [gateway-ip]' sets the default gateway for clients, 'dns-server [ip]' sets DNS, 'lease [days hours minutes]' sets the lease time. The router assigns IPs from the pool to clients that request them.",
    visual: { type: "layer-stack", params: { layers: ["ip dhcp pool LAN", "network 192.168.1.0 255.255.255.0", "default-router 192.168.1.1", "dns-server 8.8.8.8", "lease 0 8 0"], highlight: 1 } },
    hack: {
      memory: "DHCP pool recipe: Pool name, Network scope, Default-router (gateway), DNS-server, Lease time. 'Please Name Default DNS Leases.' Five lines, complete server.",
      practice: "Configure a full DHCP pool on a router. Connect PCs and verify they get addresses with correct gateway and DNS. Check 'show ip dhcp binding' for active leases.",
      effort: "medium",
      meta: "The exam expects you to configure a basic DHCP server in a lab sim. Practice the five commands until you can type them from memory. The keyword is 'default-router' not 'default-gateway'."
    }
  },

  "4.6.e": {
    info: "Excluded addresses prevent the DHCP server from assigning specific IPs from the pool. Command: 'ip dhcp excluded-address [start-ip] [end-ip]' (configured in global config, not inside the pool). Always exclude the gateway IP, server IPs, and any other static assignments. Without exclusions, DHCP could assign an IP that's already in use, causing conflicts.",
    visual: { type: "state-machine", params: { states: ["Pool: 192.168.1.0/24", "Exclude: .1 to .10", "Available: .11 to .254", "Assigns from available range"], active: 2, transitions: true } },
    hack: {
      memory: "Exclusions = reserved parking spots in a parking lot. The DHCP valet won't park anyone there because those spots are already taken by static-IP devices.",
      practice: "Configure excluded addresses for the first 10 IPs in your pool. Verify with 'show ip dhcp pool' that the pool's available range doesn't include the excluded addresses.",
      effort: "low",
      meta: "The exam tests this as part of DHCP server configuration. Key detail: the excluded-address command is in GLOBAL config mode, not inside the pool. Students often get the mode wrong."
    }
  },

  "4.6.f": {
    info: "DHCP verification commands: 'show ip dhcp binding' shows all active leases (IP, MAC, lease expiration), 'show ip dhcp pool' shows pool configuration and utilization (addresses assigned, available, excluded), 'show ip dhcp conflict' shows any detected IP conflicts, and 'show ip dhcp server statistics' shows DORA message counts.",
    visual: { type: "comparison", params: { left: { label: "Binding & Pool", items: ["show ip dhcp binding", "— active leases, MACs", "show ip dhcp pool", "— utilization, scope"] }, right: { label: "Troubleshooting", items: ["show ip dhcp conflict", "— IP conflicts detected", "show ip dhcp server statistics", "— DORA message counts"] } } },
    hack: {
      memory: "Binding = who has what IP right now. Pool = how's the pool doing (full? empty?). Conflict = duplicate IP detected. Statistics = how many DORA messages were exchanged.",
      practice: "After setting up a DHCP server, run all four commands. Note which client got which IP in the binding table. Check pool utilization to see remaining addresses.",
      effort: "low",
      meta: "The exam shows 'show ip dhcp binding' output and asks which IP was assigned to which MAC. Practice reading this output — it's a common show-command question."
    }
  },

  // ── 4.7  Explain QoS (PHB) ────────────────────────────────

  "4.7.a": {
    info: "Classification is the first step in QoS — identifying and categorizing traffic into classes based on criteria like source/destination IP, port numbers, protocol, or DSCP markings. Without classification, all traffic is treated equally (best-effort). Common tools: ACLs, NBAR (Network Based Application Recognition), and class-maps. Classification happens at the trust boundary.",
    visual: { type: "state-machine", params: { states: ["Packet arrives", "Classification (identify)", "Marking (label)", "Queuing (prioritize)", "Forwarding"], active: 1, transitions: true } },
    hack: {
      memory: "Classification = sorting mail into bins (voice, video, data, junk). You have to identify what it is before you can decide how to treat it.",
      practice: "Understand the concept — QoS configuration is NOT lab-tested on CCNA. Focus on knowing the QoS processing order: classify -> mark -> queue -> schedule.",
      effort: "low",
      meta: "QoS on the CCNA is conceptual only — you won't configure it. Know the terminology and the processing order. Classification = identification step."
    }
  },

  "4.7.b": {
    info: "Marking tags packets with a QoS value so downstream devices can prioritize them without re-classifying. CoS (Class of Service) is a 3-bit field in the 802.1Q VLAN tag (Layer 2, values 0-7). DSCP (Differentiated Services Code Point) is a 6-bit field in the IP header (Layer 3, values 0-63). DSCP persists across routed networks; CoS is lost when the VLAN tag is removed.",
    visual: { type: "comparison", params: { left: { label: "CoS (Layer 2)", items: ["3-bit field in 802.1Q tag", "Values: 0-7", "Lost at L3 boundary", "Switch-to-switch only"] }, right: { label: "DSCP (Layer 3)", items: ["6-bit field in IP header", "Values: 0-63", "Survives routing", "End-to-end marking"] } } },
    hack: {
      memory: "CoS = sticker on the envelope (removed when opened). DSCP = stamp inside the letter (stays forever). CoS is Layer 2, DSCP is Layer 3.",
      practice: "Memorize: CoS = 3 bits, 0-7, Layer 2, 802.1Q tag. DSCP = 6 bits, 0-63, Layer 3, IP header. Create a simple comparison card.",
      effort: "low",
      meta: "The exam asks 'which marking survives across router hops?' Answer: DSCP (Layer 3). CoS only works within a switched VLAN — it's stripped at the router."
    }
  },

  "4.7.c": {
    info: "Key DSCP values: EF (Expedited Forwarding, DSCP 46) — used for voice, guarantees low latency/jitter/loss. AF (Assured Forwarding) classes: AF11-AF43 organized in 4 classes with 3 drop precedences each. CS (Class Selector) values: CS0-CS7 for backward compatibility with IP Precedence. Default/Best Effort = DSCP 0 (CS0).",
    visual: { type: "layer-stack", params: { layers: ["EF (46) — Voice/real-time", "AF4x — Video streaming", "AF3x — Call signaling", "AF2x — Transactional data", "AF1x — Bulk data", "CS0 / Default (0) — Best effort"], highlight: 0 } },
    hack: {
      memory: "EF = 'Express Freeway' for voice (DSCP 46). AF = 'Assured Forwarding' in tiers. CS = 'Class Selector' for backward compatibility. Default = 0 = no special treatment.",
      practice: "Memorize EF=46 and that AF classes go from 1 (lowest) to 4 (highest). The drop precedence within each class goes from 1 (low drop) to 3 (high drop). AF11 = class 1, low drop.",
      effort: "medium",
      meta: "For the exam: EF=46 (voice), AF classes exist in 4 tiers, CS values backward-compatible with IP precedence. Don't memorize all AF decimal values — just know the structure."
    }
  },

  "4.7.d": {
    info: "Queuing determines the order packets leave the device. LLQ (Low Latency Queuing) provides a strict priority queue for real-time traffic (voice/video) — these packets are always sent first up to a configured limit. CBWFQ (Class-Based Weighted Fair Queuing) assigns bandwidth guarantees to different traffic classes. LLQ is typically combined with CBWFQ for a complete QoS policy.",
    visual: { type: "hierarchy", params: { root: "Output Scheduler", children: [{ name: "LLQ (Priority)", children: [{ name: "Voice — sent first" }] }, { name: "CBWFQ (Bandwidth)", children: [{ name: "Video — 30% BW" }, { name: "Data — 20% BW" }, { name: "Default — remaining" }] }] } },
    hack: {
      memory: "LLQ = VIP line at the club (always goes first). CBWFQ = fair share of the dance floor (guaranteed space for each group). Together they handle real-time + everything else.",
      practice: "Understand the concept: LLQ = strict priority for latency-sensitive traffic, CBWFQ = fair bandwidth allocation for everything else. No configuration needed for CCNA.",
      effort: "low",
      meta: "Know that voice/video uses LLQ (priority queuing) and data uses CBWFQ (bandwidth guarantees). The exam tests the concept, not the configuration."
    }
  },

  "4.7.e": {
    info: "Congestion avoidance proactively drops packets before queues fill completely to prevent tail drop (where ALL new packets are dropped when the queue is full). WRED (Weighted Random Early Detection) selectively drops lower-priority packets earlier as congestion builds, giving higher-priority traffic a better chance of getting through. This prevents TCP global synchronization.",
    visual: { type: "state-machine", params: { states: ["Queue filling up", "WRED: randomly drop low-priority", "Queue stays under limit", "Tail drop avoided"], active: 1, transitions: true } },
    hack: {
      memory: "WRED = bouncer who starts turning away less important guests as the club fills up, so VIPs can still get in. Without WRED, when the club is full, EVERYONE gets turned away (tail drop).",
      practice: "Understand the difference: tail drop = all dropped equally when full, WRED = selective early drops based on priority. Know that WRED prevents TCP global synchronization.",
      effort: "low",
      meta: "The exam asks 'which mechanism prevents tail drop?' Answer: WRED. And 'what problem does WRED solve?' Answer: TCP global synchronization (where all TCP flows back off simultaneously)."
    }
  },

  "4.7.f": {
    info: "Policing enforces a traffic rate limit by immediately dropping (or re-marking) packets that exceed the configured rate. It does NOT buffer excess traffic — it simply discards it. Policing is typically applied at network boundaries (ingress) to enforce SLAs. The traffic rate has a hard ceiling; anything over is dropped instantly.",
    visual: { type: "comparison", params: { left: { label: "Policing", items: ["Drops excess immediately", "No buffering", "Ingress or egress", "Hard rate limit", "Bursty output"] }, right: { label: "Shaping (see 4.7.g)", items: ["Buffers excess", "Smooths traffic", "Egress only", "Soft rate limit", "Smooth output"] } } },
    hack: {
      memory: "Policing = speed camera: over the limit? Ticket (drop) immediately. No second chances, no slowing down — just enforcement.",
      practice: "Memorize the key difference: policing DROPS excess, shaping BUFFERS excess. This is tested as a direct comparison question.",
      effort: "low",
      meta: "Policing vs shaping is a guaranteed exam question. Policing = drops, shaping = delays. That one-line distinction is usually enough to answer correctly."
    }
  },

  "4.7.g": {
    info: "Shaping buffers excess traffic instead of dropping it, smoothing bursts to conform to a desired rate. Packets that exceed the rate are held in a queue and transmitted later when bandwidth is available. Shaping is applied on egress only and introduces latency (because packets wait in the buffer). It's gentler than policing and produces smoother traffic patterns.",
    visual: { type: "state-machine", params: { states: ["Traffic exceeds rate", "Excess buffered (queued)", "Released when BW available", "Smooth output stream"], active: 1, transitions: true } },
    hack: {
      memory: "Shaping = speed bump: it slows you down but doesn't stop you. Traffic waits in a buffer and gets released gradually. Policing = cliff (drop off). Shaping = ramp (slow down).",
      practice: "Draw the policing vs shaping comparison: policing has a flat line with drops above it; shaping has a smooth curve that buffers peaks. This visual helps on exam day.",
      effort: "low",
      meta: "Shaping adds latency (bad for voice), policing doesn't (but drops packets). Know which is appropriate: shaping for WAN links, policing for ingress enforcement."
    }
  },

  "4.7.h": {
    info: "The trust boundary is the network point where QoS markings are first accepted and trusted. Typically, this is at the access layer switch closest to the endpoint. Markings from untrusted sources (like a PC) are overwritten at the trust boundary. Markings from trusted sources (like an IP phone) are preserved. Setting the trust boundary correctly prevents endpoints from gaming QoS.",
    visual: { type: "packet-flow", params: { nodes: ["PC (untrusted DSCP)", "Access Switch (trust boundary)", "Re-marks to correct DSCP", "Network trusts from here"], color: "#f59e0b" } },
    hack: {
      memory: "Trust boundary = security checkpoint. Before this point, anyone can claim to be VIP (mark their own packets as high priority). After this point, only legitimate markings are trusted.",
      practice: "Understand the concept: IP phones are typically trusted at the access switch (their CoS markings are kept). PC traffic behind the phone is untrusted (markings are reset).",
      effort: "low",
      meta: "The exam asks 'where should the trust boundary be placed?' Answer: as close to the source as possible, typically the access switch. This prevents untrusted endpoints from setting their own priority."
    }
  },

  // ── 4.8  Configure SSH ─────────────────────────────────────

  "4.8.a": {
    info: "Step 1 of SSH configuration requires setting a hostname on the device. SSH generates a key pair named '[hostname].[domain-name]', so the default hostname 'Router' or 'Switch' must be changed. Command: 'hostname [name]'. Without a unique hostname, the RSA key generation may fail or produce a generic key that can't be used for SSH.",
    visual: { type: "state-machine", params: { states: ["1. hostname R1", "2. ip domain-name", "3. crypto key generate rsa", "4. ip ssh version 2", "5. username + secret", "6. line vty + SSH"], active: 0, transitions: true } },
    hack: {
      memory: "SSH needs a name to put on the certificate. 'Router' is too generic — give it a real name first. Step 1 of 6.",
      practice: "Configure SSH end-to-end on a Packet Tracer device. Start with hostname and work through all 6 steps. Practice until you can do it in under 2 minutes.",
      effort: "medium",
      meta: "SSH configuration is a guaranteed lab sim. The 6-step process must be memorized in order. Missing any step = SSH won't work."
    }
  },

  "4.8.b": {
    info: "Step 2: Configure a domain name with 'ip domain-name [name]'. The domain name is combined with the hostname to create the RSA key pair label (e.g., 'R1.lab.local'). Without a domain name, 'crypto key generate rsa' will fail. Any valid domain name works — in labs, 'lab.local' or 'ccna.lab' are common choices.",
    visual: { type: "state-machine", params: { states: ["1. hostname R1", "2. ip domain-name lab.local", "3. crypto key generate rsa", "4. ip ssh version 2", "5. username + secret", "6. line vty + SSH"], active: 1, transitions: true } },
    hack: {
      memory: "Domain name = the router's last name. Hostname + domain = full name on the key. No last name = can't make the key.",
      practice: "Try running 'crypto key generate rsa' without setting a domain name first — note the error. Then set the domain name and retry successfully.",
      effort: "low",
      meta: "Students forget this step most often. If RSA key generation fails, check hostname AND domain name — both must be set."
    }
  },

  "4.8.c": {
    info: "Step 3: Generate the RSA key pair with 'crypto key generate rsa modulus 2048'. The modulus determines key strength — 2048 bits is the recommended minimum for SSH version 2 (1024 minimum required for SSHv2, but 2048 is best practice). This key pair enables public-key cryptography for the SSH session. Once generated, SSH becomes available.",
    visual: { type: "shield", params: { items: ["crypto key generate rsa", "modulus 2048 (recommended)", "Enables SSH encryption", "Key pair: hostname.domain"], color: "#10b981" } },
    hack: {
      memory: "RSA 2048 = the deadbolt lock on your SSH door. 1024 is the minimum, but 2048 is what everyone uses. Without this key, there's no encryption and no SSH.",
      practice: "Generate the key and verify with 'show crypto key mypubkey rsa'. Note the key name matches hostname.domain. Know that you can regenerate with a new modulus if needed.",
      effort: "low",
      meta: "The exam expects 'modulus 2048'. If you see 1024 vs 2048 as options, pick 2048. Also know: SSHv2 requires at least 768-bit modulus, but 2048 is the correct exam answer."
    }
  },

  "4.8.d": {
    info: "Step 4: Set SSH to version 2 with 'ip ssh version 2'. SSHv1 has known vulnerabilities and should never be used. Version 2 provides stronger encryption, better authentication, and protection against man-in-the-middle attacks. Without this command, the device may accept both v1 and v2 connections, which is a security risk.",
    visual: { type: "comparison", params: { left: { label: "SSHv1 (Insecure)", items: ["Known vulnerabilities", "Weaker encryption", "MITM susceptible", "Do NOT use"] }, right: { label: "SSHv2 (Required)", items: ["Strong encryption", "Better auth methods", "MITM protection", "Always configure"] } } },
    hack: {
      memory: "SSHv2 = the only acceptable version. SSHv1 is like leaving your door unlocked. One command: 'ip ssh version 2'. Always include this.",
      practice: "Configure SSH without setting version 2, then check 'show ip ssh' — it may show version 1.99 (accepts both). Add 'ip ssh version 2' and verify it now shows version 2 only.",
      effort: "low",
      meta: "The exam asks 'which command restricts SSH to version 2?' Answer: 'ip ssh version 2'. Simple recall, but students sometimes forget to include it in their lab sim."
    }
  },

  "4.8.e": {
    info: "Step 5: Create a local user account with 'username [name] secret [password]'. The 'secret' keyword stores the password using a strong hash (type 5 or type 9) in the running config. Never use 'password' instead of 'secret' — 'password' stores in cleartext or weak encryption. This account will be used for SSH login authentication.",
    visual: { type: "shield", params: { items: ["username admin secret Str0ngP@ss", "'secret' = strong hash (type 5/9)", "Never use 'password' keyword", "Local auth database"], color: "#8b5cf6" } },
    hack: {
      memory: "'secret' = secret (hidden/hashed). 'password' = plain text (visible to anyone who reads the config). Always use 'secret'. Always.",
      practice: "Create a user with 'secret' and another with 'password'. Run 'show running-config' and compare — 'secret' shows a hash, 'password' shows the actual password. Never forget this.",
      effort: "low",
      meta: "The exam will penalize you for using 'password' instead of 'secret'. In lab sims, always use 'username X secret Y'. This is both a security best practice and an exam requirement."
    }
  },

  "4.8.f": {
    info: "Step 6: Configure VTY lines for SSH access: 'line vty 0 15' (all 16 VTY lines), 'transport input ssh' (only allow SSH, block Telnet), 'login local' (authenticate using the local username database). Without 'login local', the VTY line won't know to check the local user database. Without 'transport input ssh', Telnet may still be allowed.",
    visual: { type: "layer-stack", params: { layers: ["line vty 0 15", "transport input ssh", "login local", "(optional) exec-timeout 5 0", "(optional) logging synchronous"], highlight: 1 } },
    hack: {
      memory: "VTY = the virtual door to the device. 'transport input ssh' = only SSH keys work on this door. 'login local' = check the guest list (local users). Both required.",
      practice: "Configure the full SSH setup and test: SSH in from another device. Then try Telnet — it should be refused. Verify with 'show line vty 0 15' and 'show users'.",
      effort: "medium",
      meta: "In lab sims, configure ALL VTY lines (0 15, not just 0 4). Use 'transport input ssh' and 'login local' together. Missing either one means SSH login fails."
    }
  },

  "4.8.g": {
    info: "Disabling Telnet is accomplished by configuring 'transport input ssh' on the VTY lines, which only permits SSH connections and rejects Telnet. Alternatively, 'transport input none' blocks all remote access. Telnet sends all data (including passwords) in cleartext and should never be used on production networks. SSH replaces Telnet for secure remote management.",
    visual: { type: "comparison", params: { left: { label: "Telnet (Insecure)", items: ["Cleartext passwords", "No encryption", "TCP port 23", "NEVER use in production"] }, right: { label: "SSH (Secure)", items: ["Encrypted session", "RSA key exchange", "TCP port 22", "Always preferred"] } } },
    hack: {
      memory: "Telnet = shouting your password across a crowded room. SSH = whispering it through an encrypted tunnel. 'transport input ssh' = shut the Telnet door forever.",
      practice: "After configuring SSH, attempt a Telnet connection to the device. It should be refused with 'Connection refused.' This confirms Telnet is disabled.",
      effort: "low",
      meta: "If the exam asks 'which command prevents Telnet access?' Answer: 'transport input ssh' under line vty. This simultaneously enables SSH-only and blocks Telnet."
    }
  },

  "4.8.h": {
    info: "SSH verification commands: 'show ip ssh' displays SSH version, authentication timeout, and retry count. 'show ssh' displays active SSH sessions (who's connected, version, encryption type). Together, these commands confirm SSH is operational and show current connections. 'show running-config | section line vty' verifies the VTY configuration.",
    visual: { type: "comparison", params: { left: { label: "show ip ssh", items: ["SSH version configured", "Auth timeout (default 120s)", "Auth retries (default 3)", "RSA key status"] }, right: { label: "show ssh", items: ["Active SSH sessions", "Connected users", "Encryption in use", "Session version"] } } },
    hack: {
      memory: "'show ip ssh' = is SSH configured correctly? 'show ssh' = who's connected right now? One is the setup check, the other is the live connection list.",
      practice: "After completing SSH setup, run both commands. SSH in from another device, then run 'show ssh' again to see your active session listed.",
      effort: "low",
      meta: "The exam shows 'show ip ssh' output and asks what version is configured or what the timeout is. Practice reading this output — it's straightforward but must be familiar."
    }
  },

  // ── 4.9  Describe TFTP/FTP ─────────────────────────────────

  "4.9.a": {
    info: "TFTP (Trivial File Transfer Protocol) uses UDP port 69 and provides simple, connectionless file transfers with no authentication. It has no directory listing, no rename, no delete — only read and write operations. TFTP is used for transferring IOS images, configs, and firmware because of its simplicity and low overhead. Not suitable for sensitive data.",
    visual: { type: "comparison", params: { left: { label: "TFTP", items: ["UDP port 69", "No authentication", "No encryption", "Simple: read/write only", "Small file transfers"] }, right: { label: "FTP (see 4.9.b)", items: ["TCP ports 20/21", "Username/password", "No encryption", "Full operations", "Larger file transfers"] } } },
    hack: {
      memory: "TFTP = 'Tiny, Fast, Trivially Plain.' UDP 69, no auth, no frills. Perfect for quick IOS transfers on a trusted management network.",
      practice: "Set up a TFTP server (SolarWinds TFTP or tftpd-hpa) and use 'copy running-config tftp:' on a router. Verify the file was saved on the server.",
      effort: "low",
      meta: "Know: TFTP = UDP 69, no auth. FTP = TCP 20/21, has auth. The exam asks 'which protocol is used for IOS file transfers and uses UDP?' Answer: TFTP."
    }
  },

  "4.9.b": {
    info: "FTP (File Transfer Protocol) uses TCP port 21 for control (commands) and TCP port 20 for data transfer. FTP requires username and password authentication, supports full file operations (list, rename, delete, transfer), and is more reliable than TFTP because it uses TCP. However, FTP sends credentials in cleartext — use SCP or SFTP for secure transfers.",
    visual: { type: "handshake", params: { leftLabel: "Client", rightLabel: "FTP Server", steps: ["TCP 21: Control connection ->", "<- Login (username/password)", "TCP 20: Data transfer ->", "<- File data", "Transfer complete"] } },
    hack: {
      memory: "FTP = two channels: 21 for commands (the manager), 20 for data (the worker). Like calling a warehouse (21) to place an order, then a truck (20) delivers the goods.",
      practice: "Know the port numbers cold: 21 = control, 20 = data. No lab needed — this is a memorization item for the exam.",
      effort: "low",
      meta: "FTP port question is common: 'Which port does FTP use for data transfer?' Answer: 20. 'Control?' Answer: 21. Also know that FTP credentials are sent in cleartext."
    }
  },

  "4.9.c": {
    info: "TFTP is the traditional choice for Cisco IOS image backup and upgrade because of its simplicity. The workflow: 'copy flash: tftp:' to back up the current IOS image to a TFTP server, or 'copy tftp: flash:' to download a new image. TFTP requires the server IP address and the exact filename. The TFTP server must be reachable and the file must fit in flash memory.",
    visual: { type: "packet-flow", params: { nodes: ["Router (flash:)", "copy flash: tftp:", "TFTP Server", "IOS image backup"], color: "#3b82f6" } },
    hack: {
      memory: "'copy [from] [to]' — source first, destination second. 'copy flash: tftp:' = from the router to the server. 'copy tftp: flash:' = from the server to the router.",
      practice: "In Packet Tracer, practice both directions: backup IOS to TFTP, then restore from TFTP. Verify with 'show flash:' that the file is present and correct size.",
      effort: "medium",
      meta: "The 'copy' command syntax is heavily tested: 'copy [source] [destination]'. Know that 'copy tftp: flash:' prompts for server IP, source filename, and destination filename."
    }
  },

  "4.9.d": {
    info: "FTP is used for larger file transfers where reliability and authentication matter. It's more suitable than TFTP for transferring large IOS images or multiple files because TCP handles error correction and retransmission. Configure FTP credentials on the router with 'ip ftp username [user]' and 'ip ftp password [pass]', then use 'copy ftp: flash:' to transfer.",
    visual: { type: "comparison", params: { left: { label: "TFTP Use Cases", items: ["Small config files", "Quick IOS backup/restore", "Trusted management VLAN", "No auth needed"] }, right: { label: "FTP Use Cases", items: ["Large IOS images", "Reliable transfers needed", "Multiple file operations", "Auth required"] } } },
    hack: {
      memory: "TFTP for quick small jobs, FTP for bigger jobs that need reliability. Like sending a postcard (TFTP) vs a registered package (FTP).",
      practice: "Know when to use each: TFTP for simple config backups on the management network, FTP when you need authentication or are transferring large files. No deep lab needed.",
      effort: "low",
      meta: "The exam mostly tests TFTP for IOS operations. FTP appears as a comparison option. Know the key differences: UDP vs TCP, auth vs no auth, simple vs full-featured."
    }
  },

  "4.9.e": {
    info: "Common IOS file operations: 'copy running-config tftp:' saves the current config to a TFTP server, 'copy startup-config tftp:' saves the startup config, 'copy tftp: running-config' restores/merges a config from TFTP, 'copy tftp: flash:' downloads an IOS image. 'show flash:' lists files in flash memory. Always verify flash space before downloading new images.",
    visual: { type: "layer-stack", params: { layers: ["copy running-config tftp:", "copy startup-config tftp:", "copy tftp: flash:", "copy flash: tftp:", "show flash:"], highlight: 2 } },
    hack: {
      memory: "Always 'copy [from] [to]'. Running-config = live config in RAM. Startup-config = saved config in NVRAM. Flash = where IOS lives. TFTP = remote server.",
      practice: "Practice every copy command variant in Packet Tracer: running to TFTP, startup to TFTP, TFTP to flash. Verify each transfer with the appropriate show command.",
      effort: "medium",
      meta: "The 'copy' command variations are tested in lab sims. The tricky one: 'copy tftp: running-config' MERGES (doesn't replace) the current running config. 'copy tftp: startup-config' replaces."
    }
  },

  "4.9.f": {
    info: "SCP (Secure Copy Protocol) transfers files over SSH, providing both encryption and authentication. It's the secure alternative to TFTP and FTP. To use SCP on a Cisco device, SSH must be configured and 'ip scp server enable' must be set. Transfer command: 'copy scp: flash:'. SCP uses TCP port 22 (SSH) and is the recommended method for production file transfers.",
    visual: { type: "shield", params: { items: ["SCP = file transfer over SSH", "TCP port 22 (encrypted)", "Requires SSH configured", "ip scp server enable", "Most secure option"], color: "#10b981" } },
    hack: {
      memory: "SCP = SSH + file copy. Same encryption, same port (22), same authentication. If you already have SSH, SCP is the natural upgrade from TFTP/FTP.",
      practice: "Know that SCP requires SSH to be working first. If SSH is configured (hostname, domain, RSA key, user, VTY), SCP just needs 'ip scp server enable' to activate.",
      effort: "low",
      meta: "The exam asks 'which is the most secure file transfer method?' Answer: SCP (encrypted, authenticated). TFTP = no security, FTP = auth but no encryption, SCP = both."
    }
  }

};
