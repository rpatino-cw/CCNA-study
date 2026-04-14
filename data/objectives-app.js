const STORAGE_KEY = 'ccna-objectives-v2';

/* ══════════════════════════════════════════════════════════════════════
   Enriched data — keyed by sub-objective ID (1.1.a) or parent ID (1.4)
   Each sub-objective is its OWN expandable row with its own content.
   ══════════════════════════════════════════════════════════════════════ */

const E = {
  // ── 1.1 Network Components (each sub = its own row) ─────────────
  "1.1.a": {
    difficulty: 20, studyTime: 15, examFreq: 60,
    why: "Routers are the backbone of inter-network communication. Cisco tests whether you know a router operates at Layer 3 and makes forwarding decisions based on IP addresses.",
    ciscoIntent: "Explain what a router does and where it sits in the network",
    cheatSheet: [{ heading: "Routers", items: [
      "Operates at Layer 3 (Network layer) of the OSI model",
      "Makes forwarding decisions using the routing table and destination IP address",
      "Connects different networks / broadcast domains",
      "Performs NAT, ACL filtering, inter-VLAN routing (router-on-a-stick)",
      "Key commands: <code>show ip route</code>, <code>show ip interface brief</code>",
      "Default gateway for end devices — first hop out of the local subnet"
    ]}],
    prereqs: [{ name: "OSI Model Layer 3", obj: "Foundational" }, { name: "IP addressing basics", obj: "1.6" }],
    resources: [
      { type: "video", title: "What is a Router?", url: "https://www.youtube.com/watch?v=1z0ULvg_pW8", desc: "PowerCert — routers, how they work, and why they matter" }
    ],
    labs: [{ name: "Packet Tracer: Basic router config", desc: "Assign IPs to interfaces, enable them, verify with show commands" }],
    vocab: [
      { term: "Router", q: "What does a router primarily use to make forwarding decisions?", options: ["MAC addresses", "IP addresses", "Port numbers", "VLAN tags"], answer: 1, explain: "Routers operate at Layer 3 and use IP addresses (destination IP in the packet header) to look up the best route in the routing table." },
      { term: "Routing table", q: "Where does a router store the information it uses to forward packets?", options: ["MAC address table", "ARP cache", "Routing table", "VLAN database"], answer: 2, explain: "The routing table contains all known network destinations, next hops, metrics, and administrative distances. It's the router's decision-making reference." }
    ]
  },
  "1.1.b": {
    difficulty: 30, studyTime: 20, examFreq: 65,
    why: "You must distinguish between L2 and L3 switches. Cisco tests when to use each and how a L3 switch combines switching with routing.",
    ciscoIntent: "Differentiate Layer 2 and Layer 3 switch capabilities",
    cheatSheet: [{ heading: "L2 vs L3 Switches", items: [
      "L2 Switch — forwards frames based on MAC address table (CAM table)",
      "L2 Switch — operates at Data Link layer, creates separate collision domains per port",
      "L3 Switch — does everything L2 does PLUS routes between VLANs using IP",
      "L3 Switch — uses SVIs (Switch Virtual Interfaces) for inter-VLAN routing",
      "L3 Switch replaces the need for router-on-a-stick in many campus designs",
      "L2 handles: MAC learning, frame switching, STP, VLANs",
      "L3 adds: routing table, IP forwarding, OSPF/EIGRP, ACLs"
    ]}],
    prereqs: [{ name: "Switching concepts", obj: "1.13" }, { name: "VLANs", obj: "2.1" }],
    resources: [
      { type: "video", title: "Layer 2 vs Layer 3 Switch", url: "https://www.youtube.com/watch?v=bdqnGRSTwXQ", desc: "When to use each and how they differ" }
    ],
    labs: [{ name: "Compare L2 and L3 switching", desc: "Build a network with both switch types, observe routing vs switching behavior" }],
    vocab: [
      { term: "Layer 3 Switch", q: "How does a Layer 3 switch differ from a Layer 2 switch?", options: ["It has more ports", "It can route between VLANs using IP", "It only supports fiber", "It replaces the need for a firewall"], answer: 1, explain: "A Layer 3 switch can perform inter-VLAN routing using SVIs (Switch Virtual Interfaces), combining switching speed with routing capability." },
      { term: "SVI", q: "What is an SVI on a Layer 3 switch?", options: ["A physical interface", "A virtual interface assigned to a VLAN for routing", "A trunk port", "A loopback address"], answer: 1, explain: "SVI (Switch Virtual Interface) is a logical interface on a VLAN. It acts as the default gateway for hosts in that VLAN and enables inter-VLAN routing on L3 switches." }
    ]
  },
  "1.1.c": {
    difficulty: 25, studyTime: 15, examFreq: 50,
    why: "Know the difference between a traditional firewall (port/protocol) and an NGFW (app-aware, IPS integrated). Also distinguish IPS (inline, blocks) from IDS (passive, alerts).",
    ciscoIntent: "Explain NGFW and IPS capabilities and how they differ from legacy devices",
    cheatSheet: [{ heading: "NGFW & IPS", items: [
      "Traditional firewall — filters by port, protocol, IP (stateful packet inspection)",
      "NGFW — adds: application awareness, integrated IPS, URL filtering, identity-based policies",
      "IPS (Intrusion Prevention System) — sits inline, actively drops malicious traffic",
      "IDS (Intrusion Detection System) — passive/promiscuous mode, copies traffic, alerts only",
      "Key difference: IPS blocks in real-time, IDS only notifies after detection"
    ]}],
    prereqs: [{ name: "TCP/UDP and ports", obj: "1.5" }, { name: "Security basics", obj: "5.1" }],
    resources: [{ type: "video", title: "NGFW vs Traditional Firewall", url: "https://www.youtube.com/watch?v=oO9gZ1qFbl0", desc: "What makes next-gen firewalls different" }],
    labs: [],
    vocab: [
      { term: "NGFW", q: "What capability distinguishes an NGFW from a traditional firewall?", options: ["It blocks all traffic by default", "It performs application-layer inspection", "It only works with IPv6", "It replaces routers"], answer: 1, explain: "NGFWs go beyond port/protocol filtering — they inspect application-layer data, integrate IPS, and can filter based on URLs and user identity." },
      { term: "IPS vs IDS", q: "What is the key operational difference between IPS and IDS?", options: ["IPS is software, IDS is hardware", "IPS blocks threats inline, IDS only alerts", "IDS is faster", "They are identical"], answer: 1, explain: "IPS sits inline in the traffic path and can actively drop malicious packets. IDS operates in promiscuous mode, copying and analyzing traffic but not blocking." }
    ]
  },
  "1.1.d": {
    difficulty: 20, studyTime: 10, examFreq: 45,
    why: "Access points bridge wireless clients to the wired network. Know autonomous vs lightweight APs and the role of CAPWAP.",
    ciscoIntent: "Describe the function of an access point in a WLAN",
    cheatSheet: [{ heading: "Access Points", items: [
      "AP bridges wireless clients to the wired LAN",
      "Autonomous AP — standalone, configured individually",
      "Lightweight AP — managed by WLC via CAPWAP tunnel",
      "APs connect to switches via PoE-capable access ports",
      "APs advertise SSIDs and handle wireless client associations"
    ]}],
    prereqs: [{ name: "Wireless principles", obj: "1.11" }],
    resources: [{ type: "video", title: "Access Points Explained", url: "https://www.youtube.com/watch?v=OxiY4yf6GGg", desc: "How APs work in enterprise networks" }],
    labs: [],
    vocab: [
      { term: "Access Point", q: "What is the primary function of a wireless access point?", options: ["Route packets between networks", "Bridge wireless clients to the wired network", "Assign IP addresses via DHCP", "Filter traffic with ACLs"], answer: 1, explain: "An AP acts as a bridge between the wireless (802.11) and wired (802.3 Ethernet) network, allowing wireless clients to communicate with wired resources." }
    ]
  },
  "1.1.e": {
    difficulty: 25, studyTime: 15, examFreq: 40,
    why: "Controllers centrally manage network devices. The WLC manages APs via CAPWAP. Cisco DNA Center is the SDN controller.",
    ciscoIntent: "Explain the role of controllers (WLC, DNA Center) in network management",
    cheatSheet: [{ heading: "Controllers", items: [
      "WLC (Wireless LAN Controller) — centrally manages lightweight APs",
      "CAPWAP tunnel — control (UDP 5246) + data (UDP 5247) between AP and WLC",
      "Cisco DNA Center — SDN controller for campus networks (intent-based)",
      "Controllers provide: centralized config, firmware management, monitoring, policy enforcement"
    ]}],
    prereqs: [{ name: "Access points", obj: "1.1.d" }, { name: "SDN concepts", obj: "6.2" }],
    resources: [{ type: "video", title: "WLC and CAPWAP", url: "https://www.youtube.com/watch?v=5g3Rl_hl4cQ", desc: "How WLC manages APs" }],
    labs: [],
    vocab: [
      { term: "CAPWAP", q: "What protocol does a Cisco WLC use to manage APs?", options: ["SNMP", "CAPWAP", "OSPF", "STP"], answer: 1, explain: "CAPWAP (Control and Provisioning of Wireless Access Points) creates a tunnel between AP and WLC for centralized management, configuration, and firmware updates." }
    ]
  },
  "1.1.f": {
    difficulty: 10, studyTime: 5, examFreq: 30,
    why: "Endpoints are the devices that generate and consume data. Know what counts as an endpoint.",
    ciscoIntent: "Identify endpoints in a network topology",
    cheatSheet: [{ heading: "Endpoints", items: [
      "Endpoints = devices that originate or consume data on the network",
      "Examples: PCs, laptops, phones, tablets, printers, IP cameras, IoT sensors",
      "Endpoints connect to access layer switches or wireless APs",
      "They are assigned IP addresses (static or DHCP) and use a default gateway"
    ]}],
    prereqs: [],
    resources: [],
    labs: [],
    vocab: [
      { term: "Endpoint", q: "Which is an example of an endpoint?", options: ["A core router", "A distribution switch", "A user's laptop", "A patch panel"], answer: 2, explain: "Endpoints are devices that originate or consume data — PCs, phones, printers, IoT devices. They sit at the edge of the network." }
    ]
  },
  "1.1.g": {
    difficulty: 10, studyTime: 5, examFreq: 30,
    why: "Servers provide services to clients. Know common server roles: DHCP, DNS, web, file, email, AAA.",
    ciscoIntent: "Describe the role of servers in network architecture",
    cheatSheet: [{ heading: "Servers", items: [
      "Servers provide shared services to client endpoints",
      "Common server types: DHCP, DNS, web (HTTP/HTTPS), file (SMB/NFS), email (SMTP), AAA (RADIUS/TACACS+)",
      "Typically placed in server farms or data centers behind distribution layer",
      "May have redundant NICs, UPS, and high-availability configurations"
    ]}],
    prereqs: [],
    resources: [],
    labs: [],
    vocab: [
      { term: "Server", q: "Which best describes a server?", options: ["A device that only forwards packets", "A device that provides services to clients (DHCP, DNS, web, file)", "A device that only connects to other servers", "A wireless AP with storage"], answer: 1, explain: "Servers provide shared services like DNS resolution, DHCP leases, file storage, web hosting, and authentication to client endpoints." }
    ]
  },
  "1.1.h": {
    difficulty: 20, studyTime: 15, examFreq: 45,
    why: "PoE powers devices over Ethernet cables. Know the three standards and their wattage limits. Common exam question.",
    ciscoIntent: "Identify PoE standards and their power delivery capabilities",
    cheatSheet: [{ heading: "Power over Ethernet", items: [
      "802.3af (PoE) — up to 15.4W per port. Powers basic APs, IP phones.",
      "802.3at (PoE+) — up to 30W per port. Powers advanced APs, cameras.",
      "802.3bt (PoE++) — up to 60-100W per port. Powers PTZ cameras, displays.",
      "PSE (Power Sourcing Equipment) = the switch providing power",
      "PD (Powered Device) = the device receiving power (AP, phone, camera)",
      "PoE negotiation: switch detects PD class and allocates appropriate wattage"
    ]}],
    prereqs: [],
    resources: [{ type: "video", title: "PoE Explained", url: "https://www.youtube.com/watch?v=J_S1yCdNHcE", desc: "Standards, wattage, powered devices" }],
    labs: [],
    vocab: [
      { term: "PoE", q: "Which IEEE standard provides up to 30W of power per port?", options: ["802.3af", "802.3at (PoE+)", "802.3bt (PoE++)", "802.11ac"], answer: 1, explain: "802.3at (PoE+) delivers up to 30W. 802.3af provides 15.4W. 802.3bt goes up to 60-100W for high-power devices." }
    ]
  },

  // ── 1.2 Topology Architectures ───────────────────────────────────
  "1.2.a": { difficulty: 25, studyTime: 15, examFreq: 45, why: "Know when a two-tier design is appropriate — small to medium campus where a separate core isn't justified.", ciscoIntent: "Identify two-tier (collapsed core) architecture", cheatSheet: [{ heading: "Two-tier", items: ["Also called collapsed core — distribution + core combined into one layer", "Two layers: Access + Distribution/Core", "Good for small-medium campus networks (< 200 users)", "Simpler, lower cost than three-tier", "Limitation: scalability — no dedicated high-speed backbone"]}], prereqs: [{ name: "Network device roles", obj: "1.1" }], resources: [{ type: "video", title: "Campus Network Design", url: "https://www.youtube.com/watch?v=zbqrNg4C98U", desc: "Two-tier vs three-tier explained" }], labs: [], vocab: [{ term: "Two-tier", q: "What layers exist in a two-tier (collapsed core) architecture?", options: ["Access and Core only", "Access and Distribution (core collapsed into distribution)", "Core and Distribution only", "Access, Distribution, and Core"], answer: 1, explain: "In two-tier, the distribution and core functions are combined into one layer. Good for small-medium networks." }] },
  "1.2.b": { difficulty: 25, studyTime: 15, examFreq: 50, why: "Three-tier is the classic enterprise campus design. Know the role of each layer.", ciscoIntent: "Describe the three layers and their functions", cheatSheet: [{ heading: "Three-tier", items: ["Access layer — connects end devices (PCs, phones, APs). Port security, VLANs.", "Distribution layer — policy enforcement, ACLs, inter-VLAN routing, summarization.", "Core layer — high-speed backbone, connects distribution blocks. No filtering — just fast forwarding.", "Used in large campus networks (> 200 users, multiple buildings)"]}], prereqs: [{ name: "Two-tier", obj: "1.2.a" }], resources: [{ type: "video", title: "Three-Tier Architecture", url: "https://www.youtube.com/watch?v=zbqrNg4C98U", desc: "Each layer's role and design principles" }], labs: [{ name: "Packet Tracer: Three-tier campus", desc: "Build access, distribution, and core layers with proper uplinks" }], vocab: [{ term: "Core layer", q: "What is the primary role of the Core layer?", options: ["Connect end users", "Filter traffic with ACLs", "High-speed backbone connecting distribution switches", "Manage wireless APs"], answer: 2, explain: "The core provides fast, reliable transport between distribution blocks. It should NOT do filtering — just switch packets fast." }] },
  "1.2.c": { difficulty: 35, studyTime: 20, examFreq: 45, why: "Spine-leaf is the modern data center architecture. Know why it's better for east-west traffic than traditional three-tier.", ciscoIntent: "Explain spine-leaf for data center environments", cheatSheet: [{ heading: "Spine-leaf", items: ["Every leaf switch connects to every spine switch (full mesh)", "Optimized for east-west traffic (server-to-server)", "Consistent low latency — max 2 hops between any two leaf switches", "Leaf = connects to servers/endpoints. Spine = interconnects leaf switches.", "Scales horizontally — add more spines or leaves as needed"]}], prereqs: [{ name: "Three-tier", obj: "1.2.b" }], resources: [{ type: "video", title: "Spine-Leaf Explained", url: "https://www.youtube.com/watch?v=xJGVLMsMXs4", desc: "Why spine-leaf for modern DCs" }], labs: [], vocab: [{ term: "Spine-Leaf", q: "What traffic pattern is spine-leaf optimized for?", options: ["North-south (client to server)", "East-west (server to server)", "WAN backhaul", "Wireless roaming"], answer: 1, explain: "Spine-leaf provides consistent low-latency paths between any two leaf switches, ideal for data center east-west traffic." }] },
  "1.2.d": { difficulty: 25, studyTime: 15, examFreq: 40, why: "WAN connects geographically separated networks. Know the common WAN technologies.", ciscoIntent: "Describe WAN connectivity options", cheatSheet: [{ heading: "WAN", items: ["Connects LANs across geographic distances", "Technologies: MPLS, Metro Ethernet, broadband (DSL/cable), 4G/5G, satellite", "SD-WAN — software-defined WAN, uses multiple transports with centralized policy", "WAN edge devices: routers, SD-WAN appliances"]}], prereqs: [{ name: "Routers", obj: "1.1.a" }], resources: [{ type: "video", title: "WAN Technologies", url: "https://www.youtube.com/watch?v=0vkRyUj6MlM", desc: "MPLS, broadband, SD-WAN overview" }], labs: [], vocab: [{ term: "WAN", q: "What is the primary purpose of a WAN?", options: ["Connect devices in one room", "Connect geographically separated LANs", "Replace WiFi", "Encrypt all traffic"], answer: 1, explain: "A WAN spans large distances — connecting branch offices to headquarters, data centers to each other, etc." }] },
  "1.2.e": { difficulty: 15, studyTime: 10, examFreq: 35, why: "SOHO is a simple flat network. Know it uses a single combo device.", ciscoIntent: "Identify SOHO network characteristics", cheatSheet: [{ heading: "SOHO", items: ["Small office / home office — typically < 10 users", "Single combo device: router + switch + AP + firewall + DHCP server", "Flat network — one subnet, one broadcast domain", "ISP uplink via DSL, cable, or fiber modem", "Examples: home WiFi router, small business gateway"]}], prereqs: [], resources: [], labs: [], vocab: [{ term: "SOHO", q: "What typically characterizes a SOHO network?", options: ["Multi-building campus", "Single all-in-one device (router/switch/AP/firewall)", "Spine-leaf DC architecture", "Dedicated distribution switches"], answer: 1, explain: "SOHO networks use a single combo device that integrates routing, switching, wireless, NAT, and DHCP for a small number of users." }] },
  "1.2.f": { difficulty: 20, studyTime: 15, examFreq: 40, why: "On-prem vs cloud is a frequent comparison. Know capex vs opex, control vs flexibility.", ciscoIntent: "Compare on-premises and cloud deployment models", cheatSheet: [{ heading: "On-premises vs Cloud", items: ["On-premises — you own/manage hardware. Full control. Capex model (capital expense).", "Cloud — IaaS/PaaS/SaaS from provider. Opex model (operational expense).", "IaaS: VMs, storage, networking (AWS EC2, Azure VMs)", "PaaS: platform for apps (AWS Elastic Beanstalk, Azure App Service)", "SaaS: ready-to-use apps (Office 365, Salesforce)", "Hybrid — mix of on-prem and cloud"]}], prereqs: [], resources: [{ type: "video", title: "Cloud Computing Explained", url: "https://www.youtube.com/watch?v=M988_fsOSWo", desc: "IaaS, PaaS, SaaS, on-prem comparison" }], labs: [], vocab: [{ term: "IaaS", q: "Which cloud model gives you the most control over infrastructure?", options: ["SaaS", "PaaS", "IaaS", "On-premises only"], answer: 2, explain: "IaaS (Infrastructure as a Service) provides virtual machines, storage, and networking. You manage the OS, apps, and data. The provider manages the physical hardware." }] },

  // ── 1.3 Cabling ──────────────────────────────────────────────────
  "1.3.a": { difficulty: 25, studyTime: 20, examFreq: 50, why: "Know fiber types (single-mode vs multimode), copper categories, and their distance limits. Common exam topic.", ciscoIntent: "Select the correct cable type for a given distance and speed requirement", cheatSheet: [{ heading: "Cable Types", items: ["Single-mode fiber (SMF) — 9µm core, laser, yellow jacket, up to 80km+. Long-haul.", "Multimode fiber (MMF) — 50/62.5µm core, LED/VCSEL, orange/aqua, up to ~550m. Short-haul.", "Cat5e — 1Gbps, 100m max. Minimum for Gigabit Ethernet.", "Cat6 — 1Gbps (10Gbps up to 55m), 100m max.", "Cat6a — 10Gbps, 100m max. Full 10GbE support.", "LC connector — most common fiber connector on switches. SC, ST also exist.", "RJ-45 — 8-pin modular connector for copper Ethernet."]}], prereqs: [{ name: "OSI Layer 1", obj: "Foundational" }], resources: [{ type: "video", title: "Fiber Optic Cables", url: "https://www.youtube.com/watch?v=3KoMSRWroTs", desc: "Single-mode vs multimode, connectors, distances" }, { type: "video", title: "Ethernet Cables Explained", url: "https://www.youtube.com/watch?v=_NX99ad2FUA", desc: "Cat5e vs Cat6 vs Cat6a" }], labs: [{ name: "Cable matching exercise", desc: "Match cable type to scenario: WAN link, server room, access layer, cross-building" }], vocab: [{ term: "Single-mode fiber", q: "What is the key advantage of single-mode fiber over multimode?", options: ["Lower cost", "Longer distance (up to 80km+)", "Thicker core", "Faster at short distances"], answer: 1, explain: "Single-mode uses a tiny 9-micron core with a single light path, reducing dispersion and enabling much longer distances." }, { term: "Cat6a", q: "What speed does Cat6a support at 100m?", options: ["1 Gbps", "5 Gbps", "10 Gbps", "25 Gbps"], answer: 2, explain: "Cat6a supports 10GbE at the full 100m distance. Cat6 only supports 10GbE up to ~55m." }] },
  "1.3.b": { difficulty: 20, studyTime: 10, examFreq: 40, why: "Know Ethernet shared media (hub/half-duplex) vs point-to-point (switch/full-duplex). Also straight-through vs crossover.", ciscoIntent: "Distinguish shared media and point-to-point Ethernet connections", cheatSheet: [{ heading: "Connection Types", items: ["Shared media (legacy) — hub-based, half-duplex, collisions possible", "Point-to-point — switch-based, full-duplex, dedicated bandwidth per port, no collisions", "Straight-through cable — connects unlike devices (PC→switch, router→switch)", "Crossover cable — connects like devices (switch→switch, PC→PC)", "Auto-MDIX — modern devices auto-detect cable type, making crossover mostly obsolete"]}], prereqs: [{ name: "Cable types", obj: "1.3.a" }], resources: [{ type: "video", title: "Straight-through vs Crossover", url: "https://www.youtube.com/watch?v=_NX99ad2FUA", desc: "When to use each cable type" }], labs: [], vocab: [{ term: "Auto-MDIX", q: "What does auto-MDIX do?", options: ["Negotiates speed", "Detects and adjusts for straight-through or crossover", "Assigns IP addresses", "Enables PoE"], answer: 1, explain: "Auto-MDIX detects the cable type and internally swaps TX/RX pairs if needed, so straight-through cables work for any connection." }] },

  // ── 1.4–1.8 (no sub-objectives — these are their own rows) ──────
  "1.4": { difficulty: 35, studyTime: 20, examFreq: 55, why: "Troubleshooting interface issues is core to networking. Cisco tests your ability to read show interface output and diagnose problems.", ciscoIntent: "Diagnose interface problems from show command output", cheatSheet: [{ heading: "Common Issues", items: ["Duplex mismatch — one side full, other half. Causes late collisions, CRC errors.", "Speed mismatch — negotiation fails or forced wrong. Interface may go down.", "CRC errors — bad cable, EMI, or duplex mismatch.", "Runts — frames < 64 bytes. Collisions or bad NIC.", "Giants — frames > 1518 bytes. Check MTU settings.", "<code>show interfaces [int]</code> — status, counters, errors, duplex, speed", "<code>show interfaces status</code> — one-line per port summary"]}], prereqs: [{ name: "Cabling", obj: "1.3" }, { name: "Switching concepts", obj: "1.13" }], resources: [{ type: "video", title: "Troubleshooting Interface Errors", url: "https://www.youtube.com/watch?v=gXnKasnLsP8", desc: "Reading show interface output" }], labs: [{ name: "Packet Tracer: Duplex mismatch", desc: "Force mismatched duplex, observe errors, fix it" }], vocab: [{ term: "Duplex mismatch", q: "A port shows increasing late collisions and CRC errors. Most likely cause?", options: ["Bad cable", "Speed mismatch", "Duplex mismatch", "STP loop"], answer: 2, explain: "Late collisions on a full-duplex port almost always indicate a duplex mismatch." }, { term: "CRC error", q: "What does a CRC error indicate?", options: ["Frame arrived with data corruption", "Frame was too large", "Port is admin down", "DNS lookup failed"], answer: 0, explain: "CRC errors mean the frame's FCS doesn't match — data was altered in transit (bad cable, EMI, duplex issue)." }, { term: "Runt", q: "What is a runt frame?", options: ["Frame > 1518 bytes", "Frame < 64 bytes", "Frame with no MAC", "Frame on a trunk"], answer: 1, explain: "Runts are below the 64-byte Ethernet minimum. Usually caused by collisions or a bad NIC." }] },
  "1.5": { difficulty: 20, studyTime: 15, examFreq: 60, why: "TCP vs UDP is fundamental. Cisco asks scenario questions — which protocol for X?", ciscoIntent: "Select TCP or UDP based on application requirements", cheatSheet: [{ heading: "TCP vs UDP", items: ["TCP — Connection-oriented. 3-way handshake (SYN, SYN-ACK, ACK). Reliable. Sequenced. Flow control.", "UDP — Connectionless. No handshake. Unreliable. Faster. Lower overhead.", "TCP: HTTP(80/443), SSH(22), FTP(20/21), SMTP(25), Telnet(23)", "UDP: DNS queries(53), DHCP(67/68), SNMP(161/162), TFTP(69), VoIP/RTP", "DNS: UDP for queries, TCP for zone transfers", "TCP header: 20 bytes min. UDP header: 8 bytes."]}], prereqs: [{ name: "OSI Layer 4", obj: "Foundational" }], resources: [{ type: "video", title: "TCP vs UDP", url: "https://www.youtube.com/watch?v=uwoD5YsGACg", desc: "PowerCert — clear visual comparison" }], labs: [{ name: "Wireshark: Capture TCP handshake", desc: "Open a website, capture packets, identify SYN/SYN-ACK/ACK" }], vocab: [{ term: "3-way handshake", q: "Correct TCP handshake sequence?", options: ["ACK, SYN, SYN-ACK", "SYN, SYN-ACK, ACK", "SYN, ACK, SYN-ACK", "FIN, ACK, RST"], answer: 1, explain: "Client sends SYN, server responds SYN-ACK, client confirms ACK." }, { term: "UDP", q: "Why would VoIP use UDP?", options: ["More secure", "Error correction", "Lower latency — retransmitting old voice data is useless", "Larger payloads"], answer: 2, explain: "Real-time apps prefer UDP because retransmitting delayed packets is pointless." }, { term: "Port 53", q: "Which protocol(s) does DNS use?", options: ["TCP only", "UDP only", "UDP for queries, TCP for zone transfers", "ICMP"], answer: 2, explain: "Standard DNS queries use UDP/53. Zone transfers and large responses use TCP/53." }] },
  "1.6": { difficulty: 70, studyTime: 85, examFreq: 90, why: "Subnetting is THE most tested skill. You MUST be fast. Cisco gives scenario questions requiring subnet calculation under time pressure.", ciscoIntent: "Calculate subnets, host ranges, and broadcast addresses quickly", cheatSheet: [{ heading: "Subnetting", items: ["Subnets = 2^(borrowed bits). Hosts = 2^(host bits) - 2", "/24=256(254) /25=128(126) /26=64(62) /27=32(30) /28=16(14) /29=8(6) /30=4(2)", "Magic number = 256 - last non-zero mask octet", "Binary AND: IP AND mask = network address", "Broadcast = all host bits set to 1", "First usable = network + 1. Last usable = broadcast - 1."]}], prereqs: [{ name: "Binary/decimal conversion", obj: "Foundational" }, { name: "Powers of 2", obj: "Foundational" }], resources: [{ type: "video", title: "Subnetting in 7 Seconds", url: "https://www.youtube.com/watch?v=ZxAwQB8TZsM", desc: "Practical Networking — fast method" }, { type: "tool", title: "Subnetting Practice", url: "subnetting-mastery.html", desc: "Local subnetting trainer" }], labs: [{ name: "50 subnetting drills", desc: "Given IP/mask, find network, broadcast, first/last usable" }], vocab: [{ term: "CIDR", q: "What does /26 mean?", options: ["26 hosts", "26 network bits", "26 subnets", "26 host bits"], answer: 1, explain: "/26 = 26 network bits, 6 host bits. 2^6 = 64 addresses (62 usable)." }, { term: "Broadcast", q: "How do you find the broadcast address?", options: ["Network + 1", "All host bits to 0", "All host bits to 1", "Subtract 1 from mask"], answer: 2, explain: "Broadcast = all host bits flipped to 1. For 192.168.1.0/26, that's 192.168.1.63." }, { term: "Subnet mask", q: "/20 in dotted decimal?", options: ["255.255.240.0", "255.255.248.0", "255.255.255.0", "255.255.224.0"], answer: 0, explain: "/20 = 255.255.240.0. Third octet has 4 network bits." }, { term: "Network address", q: "Network address for 172.16.45.200/21?", options: ["172.16.40.0", "172.16.45.0", "172.16.32.0", "172.16.48.0"], answer: 0, explain: "/21 mask = 255.255.248.0. Magic number = 8. 45/8 = 5 remainder → 5*8=40." }] },
  "1.7": { difficulty: 15, studyTime: 10, examFreq: 40, why: "Memorize the three RFC 1918 ranges and why private addressing exists.", ciscoIntent: "Identify private vs public addresses", cheatSheet: [{ heading: "RFC 1918", items: ["10.0.0.0/8 — 10.0.0.0 to 10.255.255.255 (16.7M addresses)", "172.16.0.0/12 — 172.16.0.0 to 172.31.255.255 (1M addresses)", "192.168.0.0/16 — 192.168.0.0 to 192.168.255.255 (65K addresses)", "Not routable on public internet — requires NAT"]}], prereqs: [{ name: "IPv4 subnetting", obj: "1.6" }], resources: [{ type: "video", title: "Private IPs Explained", url: "https://www.youtube.com/watch?v=po8ZFG0Xc4Q", desc: "RFC 1918 overview" }], labs: [{ name: "Private vs public quiz", desc: "Classify 20 IPs as private or public" }], vocab: [{ term: "RFC 1918", q: "Which is NOT a private range?", options: ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16", "169.254.0.0/16"], answer: 3, explain: "169.254.0.0/16 is APIPA (link-local), not RFC 1918." }] },
  "1.8": { difficulty: 55, studyTime: 45, examFreq: 65, why: "IPv6 config and verification are tested. Know address format, compression, SLAAC, and show commands.", ciscoIntent: "Configure and verify IPv6 addresses on router interfaces", cheatSheet: [{ heading: "IPv6 Addressing", items: ["128-bit, 8 groups of 4 hex digits. Example: 2001:0db8::1", "Leading zeros dropped. One :: per address (replaces consecutive all-zero groups).", "/64 standard subnet prefix. First 64 bits = network, last 64 = interface ID.", "<code>ipv6 address 2001:db8:1::1/64</code> — manual config", "<code>ipv6 address autoconfig</code> — SLAAC", "<code>show ipv6 interface brief</code> — verify"]}], prereqs: [{ name: "Hexadecimal", obj: "Foundational" }, { name: "IPv4 concepts", obj: "1.6" }], resources: [{ type: "video", title: "IPv6 Addressing Complete Guide", url: "https://www.youtube.com/watch?v=irhS0AZnWgk", desc: "Keith Barker — thorough IPv6 walkthrough" }], labs: [{ name: "Packet Tracer: IPv6 config", desc: "Assign global unicast and link-local, verify with show commands" }], vocab: [{ term: "IPv6 prefix", q: "Standard subnet prefix length?", options: ["/32", "/48", "/64", "/128"], answer: 2, explain: "/64 is standard. First 64 bits = network, last 64 = interface ID." }, { term: "::", q: "What does :: mean?", options: ["Broadcast address", "One or more groups of consecutive all-zero blocks", "Multicast prefix", "Default gateway"], answer: 1, explain: ":: replaces one or more consecutive all-zero groups. Can only appear once per address." }] },

  // ── 1.9 IPv6 Address Types ───────────────────────────────────────
  "1.9.a": { difficulty: 45, studyTime: 30, examFreq: 55, why: "You must identify IPv6 address types by prefix. Global unicast (2000::/3), unique local (FC00::/7), link-local (FE80::/10).", ciscoIntent: "Identify unicast address types by their prefix", cheatSheet: [{ heading: "IPv6 Unicast Types", items: ["Global Unicast (GUA) — 2000::/3 (starts with 2 or 3). Routable. Like public IPv4.", "Unique Local — FC00::/7 (starts with FD). Like private IPv4. Not globally routable.", "Link-Local — FE80::/10 (always FE80::). Auto-generated. Single link only. Required on every IPv6 interface.", "Loopback — ::1. Equivalent to 127.0.0.1."]}], prereqs: [{ name: "IPv6 format", obj: "1.8" }], resources: [{ type: "video", title: "IPv6 Address Types", url: "https://www.youtube.com/watch?v=V6LC_ISNKC0", desc: "Jeremy's IT Lab — all types explained" }], labs: [{ name: "Type identification", desc: "Given 15 IPv6 addresses, classify each type" }], vocab: [{ term: "Global Unicast", q: "What prefix range identifies GUAs?", options: ["FE80::/10", "FC00::/7", "2000::/3", "FF00::/8"], answer: 2, explain: "GUAs start with 2000::/3 (binary 001...), so any address starting with 2 or 3." }, { term: "Link-Local", q: "Which is true about link-local?", options: ["Globally routable", "Auto-created on every IPv6 interface, never leaves the local link", "Starts with FF02", "Replaces GUAs"], answer: 1, explain: "Link-local (FE80::/10) is auto-generated and scoped to a single link." }] },
  "1.9.b": { difficulty: 35, studyTime: 15, examFreq: 35, why: "Anycast is the same address assigned to multiple devices — traffic goes to the nearest one.", ciscoIntent: "Explain anycast addressing", cheatSheet: [{ heading: "Anycast", items: ["Same IPv6 address assigned to multiple interfaces/devices", "Routed to the nearest device (by routing protocol metrics)", "No special prefix — uses global unicast address range", "Used for load balancing and redundancy (e.g., DNS root servers)"]}], prereqs: [{ name: "Unicast types", obj: "1.9.a" }], resources: [], labs: [], vocab: [{ term: "Anycast", q: "How does anycast differ from unicast?", options: ["Anycast addresses multiple devices but routes to the nearest one", "Anycast goes to all devices simultaneously", "Anycast only works on link-local", "There's no difference"], answer: 0, explain: "Anycast assigns the same address to multiple devices. The routing protocol delivers the packet to the topologically nearest one." }] },
  "1.9.c": { difficulty: 35, studyTime: 15, examFreq: 45, why: "Multicast replaces broadcast in IPv6. Know key multicast addresses: FF02::1 (all nodes), FF02::2 (all routers).", ciscoIntent: "Identify common multicast addresses and their scope", cheatSheet: [{ heading: "Multicast", items: ["FF00::/8 — all multicast addresses start with FF", "FF02::1 — all nodes on the local link", "FF02::2 — all routers on the local link", "FF02::5 — all OSPF routers", "FF02::6 — all OSPF DRs", "IPv6 has NO broadcast — multicast replaces it"]}], prereqs: [{ name: "Unicast types", obj: "1.9.a" }], resources: [], labs: [], vocab: [{ term: "Multicast", q: "IPv6 multicast for all nodes on local link?", options: ["FF02::1", "FF02::2", "FE80::1", "2001::1"], answer: 0, explain: "FF02::1 reaches all nodes on the local link. FF02::2 reaches all routers." }] },
  "1.9.d": { difficulty: 50, studyTime: 25, examFreq: 50, why: "EUI-64 converts a MAC address to a 64-bit interface ID. Cisco commonly tests the conversion steps.", ciscoIntent: "Calculate an EUI-64 interface ID from a MAC address", cheatSheet: [{ heading: "Modified EUI-64", items: ["Take 48-bit MAC address (e.g., AA:BB:CC:DD:EE:FF)", "Split in half: AA:BB:CC | DD:EE:FF", "Insert FFFE in the middle: AA:BB:CC:FF:FE:DD:EE:FF", "Flip the 7th bit (U/L bit) of the first byte", "Result is the 64-bit interface ID appended to the /64 prefix", "Used by SLAAC to auto-generate IPv6 address from MAC"]}], prereqs: [{ name: "IPv6 format", obj: "1.8" }, { name: "MAC address format", obj: "1.13" }], resources: [{ type: "video", title: "EUI-64 Explained", url: "https://www.youtube.com/watch?v=ksDw7LbYMHk", desc: "Step-by-step calculation" }], labs: [{ name: "EUI-64 drills", desc: "Convert 5 MAC addresses to EUI-64 interface IDs by hand" }], vocab: [{ term: "EUI-64", q: "What is inserted in the middle of the MAC to form EUI-64?", options: ["0000", "FFFF", "FFFE", "FE80"], answer: 2, explain: "EUI-64 splits the 48-bit MAC and inserts FFFE in the middle, then flips the 7th bit." }] },

  // ── 1.10 (no subs) ──────────────────────────────────────────────
  "1.10": { difficulty: 15, studyTime: 10, examFreq: 30, why: "Know the right command for each OS to verify IP configuration.", ciscoIntent: "Verify IP config on Windows, Mac OS, Linux", cheatSheet: [{ heading: "OS Commands", items: ["Windows: <code>ipconfig</code>, <code>ipconfig /all</code>", "macOS: <code>ifconfig</code>, <code>networksetup -getinfo Wi-Fi</code>", "Linux: <code>ip addr show</code> (modern), <code>ifconfig</code> (legacy)", "All: <code>ping</code>, <code>traceroute</code>/<code>tracert</code>, <code>nslookup</code>"]}], prereqs: [{ name: "IPv4 addressing", obj: "1.6" }], resources: [], labs: [{ name: "Verify IP on all OSes", desc: "Run appropriate commands on Windows, macOS, and Linux" }], vocab: [{ term: "ipconfig /all", q: "What extra info does 'ipconfig /all' show?", options: ["Only IP", "MAC, DHCP server, DNS servers, lease dates", "Routing table", "Firewall rules"], answer: 1, explain: "ipconfig /all shows full adapter config including MAC, DHCP server, DNS servers, and lease times." }] },

  // ── 1.11 Wireless Principles ─────────────────────────────────────
  "1.11.a": { difficulty: 35, studyTime: 20, examFreq: 50, why: "Channel planning prevents interference. You MUST know the three non-overlapping 2.4GHz channels.", ciscoIntent: "Identify non-overlapping channels for WiFi deployment", cheatSheet: [{ heading: "WiFi Channels", items: ["2.4 GHz: channels 1, 6, 11 are non-overlapping", "5 GHz: 24 non-overlapping channels (more room, less interference)", "Adjacent APs should use different non-overlapping channels", "Co-channel interference = same channel, overlapping coverage", "Adjacent-channel interference = overlapping channels (e.g., 1 and 3)"]}], prereqs: [], resources: [{ type: "video", title: "WiFi Channels Explained", url: "https://www.youtube.com/watch?v=59x4aBB0xBs", desc: "Non-overlapping channels, 2.4 vs 5 GHz" }], labs: [{ name: "Channel planning", desc: "Draw floor plan with 6 APs, assign non-overlapping channels" }], vocab: [{ term: "Non-overlapping", q: "Which 2.4GHz channels don't overlap?", options: ["1, 4, 8", "1, 5, 10", "1, 6, 11", "2, 7, 12"], answer: 2, explain: "Channels 1, 6, and 11 are the three non-overlapping channels in the 2.4 GHz band." }] },
  "1.11.b": { difficulty: 15, studyTime: 10, examFreq: 40, why: "SSID is the network name clients see. Know BSS vs ESS.", ciscoIntent: "Explain SSID and service set concepts", cheatSheet: [{ heading: "SSID", items: ["SSID = Service Set Identifier — the network name", "BSS = Basic Service Set (single AP + its clients)", "ESS = Extended Service Set (multiple APs, same SSID = roaming)", "SSID can be hidden (not broadcast) but still discoverable via probe"]}], prereqs: [], resources: [], labs: [], vocab: [{ term: "SSID", q: "Multiple APs with the same SSID form a...?", options: ["Conflict", "Extended Service Set (ESS)", "Mesh network", "Bridge"], answer: 1, explain: "Multiple APs with the same SSID form an ESS, enabling seamless roaming." }] },
  "1.11.c": { difficulty: 35, studyTime: 20, examFreq: 40, why: "RF basics: interference, attenuation, reflection. Know common sources of interference.", ciscoIntent: "Describe RF challenges in wireless networks", cheatSheet: [{ heading: "RF Fundamentals", items: ["RF = Radio Frequency — the medium for wireless communication", "Attenuation — signal weakens over distance and through obstacles (walls, floors)", "Interference — microwaves (2.45 GHz), Bluetooth, other APs, cordless phones", "Reflection — signal bounces off metal surfaces, causes multipath", "Absorption — signal absorbed by materials (water, concrete, drywall)"]}], prereqs: [], resources: [{ type: "video", title: "RF Basics for WiFi", url: "https://www.youtube.com/watch?v=dSLDiBjgfhk", desc: "Interference, attenuation, and signal behavior" }], labs: [], vocab: [{ term: "RF interference", q: "Which device commonly interferes with 2.4GHz WiFi?", options: ["Refrigerator", "Microwave oven", "Television", "Washing machine"], answer: 1, explain: "Microwaves operate at ~2.45 GHz — right in the WiFi 2.4 GHz band." }] },
  "1.11.d": { difficulty: 30, studyTime: 15, examFreq: 45, why: "Know the wireless encryption standards: WEP (broken) → WPA (TKIP) → WPA2 (AES) → WPA3 (SAE).", ciscoIntent: "Identify wireless encryption standards and their security level", cheatSheet: [{ heading: "Wireless Encryption", items: ["WEP — RC4 encryption. Broken. Never use.", "WPA — TKIP (improved WEP). Deprecated.", "WPA2 — AES/CCMP. Current standard. Required for enterprise.", "WPA3 — SAE. Resistant to offline dictionary attacks. Newest.", "Open = no encryption. Captive portal doesn't mean encrypted."]}], prereqs: [], resources: [{ type: "video", title: "WiFi Security", url: "https://www.youtube.com/watch?v=hExRDVZHhig", desc: "WEP to WPA3 evolution" }], labs: [], vocab: [{ term: "WPA2", q: "What encryption does WPA2 use?", options: ["RC4", "TKIP", "AES/CCMP", "SAE"], answer: 2, explain: "WPA2 uses AES (Advanced Encryption Standard) with CCMP (Counter Mode CBC-MAC Protocol) for strong encryption." }] },

  // ── 1.12 (no subs) ──────────────────────────────────────────────
  "1.12": { difficulty: 30, studyTime: 20, examFreq: 35, why: "Know VMs vs containers vs VRFs. VRFs are key for network segmentation.", ciscoIntent: "Distinguish server virtualization, containers, and VRFs", cheatSheet: [{ heading: "Virtualization", items: ["Server virtualization — hypervisor runs multiple VMs. Each VM = full OS. Type 1 (ESXi) vs Type 2 (VirtualBox).", "Containers — share host kernel. Lightweight, fast. Docker/Kubernetes.", "VRF — multiple routing tables on one router. Layer 3 isolation.", "VRF Lite — VRF without MPLS. Common in enterprise."]}], prereqs: [{ name: "Routing basics", obj: "3.1" }], resources: [{ type: "video", title: "VMs vs Containers", url: "https://www.youtube.com/watch?v=cjXI-yxqGTI", desc: "IBM — clear comparison" }], labs: [{ name: "VRF config", desc: "Configure VRF Lite to separate two routing domains" }], vocab: [{ term: "VRF", q: "What does VRF provide?", options: ["Encrypted tunnels", "Multiple independent routing tables on one router", "SSID segmentation", "Loop prevention"], answer: 1, explain: "VRF creates virtual routing tables — traffic in one VRF can't reach another without explicit configuration." }, { term: "Container", q: "How do containers differ from VMs?", options: ["Each runs full OS", "Share the host OS kernel", "Don't need any OS", "Use a Type 2 hypervisor"], answer: 1, explain: "Containers share the host kernel and only package the app + dependencies. Lighter and faster than VMs." }] },

  // ── 1.13 Switching Concepts ──────────────────────────────────────
  "1.13.a": { difficulty: 30, studyTime: 20, examFreq: 55, why: "How switches learn and age MAC entries is fundamental. Cisco tests this directly.", ciscoIntent: "Explain how a switch learns and ages MAC address entries", cheatSheet: [{ heading: "MAC Learning & Aging", items: ["Switch reads SOURCE MAC of incoming frame → maps to ingress port", "Stored in MAC address table (CAM table)", "Default aging timer: 300 seconds (5 minutes)", "If no frame with that source MAC arrives within timer, entry is removed", "<code>show mac address-table</code> — view all entries"]}], prereqs: [{ name: "Ethernet frame format", obj: "Foundational" }], resources: [{ type: "video", title: "How Switches Work", url: "https://www.youtube.com/watch?v=9eH16Fxeb9o", desc: "MAC learning step by step" }], labs: [{ name: "Watch MAC table populate", desc: "Connect PCs, ping between them, check show mac address-table after each step" }], vocab: [{ term: "MAC learning", q: "Which part of the frame does a switch learn from?", options: ["Destination MAC", "Source MAC", "IP header", "FCS"], answer: 1, explain: "Switches learn from the source MAC — if a frame arrives on Fa0/1 with source AA:BB:CC:DD:EE:FF, that MAC is mapped to Fa0/1." }, { term: "Aging", q: "Default MAC table aging time?", options: ["60s", "120s", "300s", "600s"], answer: 2, explain: "Default is 300 seconds (5 minutes). No matching source MAC in that time → entry removed." }] },
  "1.13.b": { difficulty: 25, studyTime: 15, examFreq: 50, why: "Know what a switch does with known unicast frames vs unknown unicast.", ciscoIntent: "Describe how a switch forwards frames", cheatSheet: [{ heading: "Frame Switching", items: ["Known unicast — destination MAC in table → forward out mapped port only", "Unknown unicast — destination MAC NOT in table → flood all ports except ingress", "Switch methods: store-and-forward (checks CRC) vs cut-through (forwards immediately after reading dest MAC)"]}], prereqs: [{ name: "MAC learning", obj: "1.13.a" }], resources: [], labs: [], vocab: [{ term: "Known unicast", q: "Switch has dest MAC in table. What happens?", options: ["Floods all ports", "Forwards only to the mapped port", "Drops the frame", "Sends to gateway"], answer: 1, explain: "Known unicast = dest MAC found in MAC table → switch forwards out only the port associated with that MAC." }] },
  "1.13.c": { difficulty: 25, studyTime: 15, examFreq: 50, why: "Flooding is how switches handle unknown destinations, broadcasts, and multicast (without IGMP snooping).", ciscoIntent: "Identify when a switch floods frames", cheatSheet: [{ heading: "Frame Flooding", items: ["Unknown unicast — dest MAC not in table. Flood all ports in VLAN except ingress.", "Broadcast — dest = FF:FF:FF:FF:FF:FF. Always flooded.", "Multicast — flooded unless IGMP snooping is configured", "Flooding ensures the destination eventually receives the frame and replies (allowing the switch to learn its port)"]}], prereqs: [{ name: "Frame switching", obj: "1.13.b" }], resources: [], labs: [], vocab: [{ term: "Unknown unicast", q: "What does a switch do with an unknown unicast frame?", options: ["Drops it", "Sends back to source", "Floods out all ports except ingress", "Sends to default gateway"], answer: 2, explain: "Unknown unicast = flood out all ports in the VLAN (except ingress) so the destination eventually gets it." }] },
  "1.13.d": { difficulty: 25, studyTime: 15, examFreq: 50, why: "Know the MAC address table structure: MAC, VLAN, type (dynamic/static), port.", ciscoIntent: "Interpret MAC address table entries", cheatSheet: [{ heading: "MAC Address Table", items: ["Also called CAM (Content Addressable Memory) table", "Entries: VLAN | MAC Address | Type (dynamic/static) | Port", "Dynamic = learned from incoming frames. Static = manually configured.", "<code>show mac address-table</code> — all entries", "<code>show mac address-table dynamic</code> — only learned entries", "<code>clear mac address-table dynamic</code> — flush all dynamic entries"]}], prereqs: [{ name: "MAC learning", obj: "1.13.a" }], resources: [], labs: [], vocab: [{ term: "MAC table", q: "What fields does a MAC address table entry contain?", options: ["IP, mask, next hop", "VLAN, MAC address, type, port", "SSID, channel, power", "Route code, prefix, AD"], answer: 1, explain: "Each entry maps: VLAN + MAC address → port, with a type (dynamic or static)." }] },

  // ── Domain 2–6 parent-level entries (objectives without subs) ────
  // Keeping these concise — each is its own expandable row

  "2.1.a": { difficulty: 50, studyTime: 35, examFreq: 75, why: "Access ports assign traffic to a single VLAN. Voice VLAN is a common exam topic.", ciscoIntent: "Configure access ports for data and voice VLANs", cheatSheet: [{ heading: "Access Ports", items: ["<code>switchport mode access</code> — set port as access", "<code>switchport access vlan 10</code> — assign data VLAN", "<code>switchport voice vlan 20</code> — assign voice VLAN (IP phones)", "Access port carries ONE VLAN (untagged). End devices connect here.", "With voice VLAN, port effectively carries two VLANs (data + voice tagged with 802.1Q)"]}], prereqs: [{ name: "Switching concepts", obj: "1.13" }], resources: [{ type: "video", title: "VLANs Explained", url: "https://www.youtube.com/watch?v=jC6MJTh9fRE", desc: "Practical Networking" }], labs: [{ name: "Configure access ports", desc: "Assign data and voice VLANs, verify with show interfaces switchport" }], vocab: [{ term: "Access port", q: "What does an access port carry?", options: ["All VLANs", "Single VLAN (untagged)", "Only management traffic", "Only voice"], answer: 1, explain: "An access port belongs to one VLAN and carries untagged traffic." }] },
  "2.1.b": { difficulty: 30, studyTime: 15, examFreq: 55, why: "Default VLAN is VLAN 1. All ports start here. Best practice: move traffic off VLAN 1.", ciscoIntent: "Explain the default VLAN and its security implications", cheatSheet: [{ heading: "Default VLAN", items: ["VLAN 1 — all ports belong to it by default", "Cannot be deleted or renamed", "Control protocols (CDP, VTP, STP BPDUs) use VLAN 1", "Security best practice: move all user traffic to other VLANs", "Default native VLAN on trunks = VLAN 1 (change it)"]}], prereqs: [], resources: [], labs: [], vocab: [{ term: "Default VLAN", q: "What is the default VLAN on Cisco switches?", options: ["VLAN 0", "VLAN 1", "VLAN 10", "VLAN 1002"], answer: 1, explain: "VLAN 1 is the default. Cannot be deleted. Best practice: move user traffic off VLAN 1." }] },
  "2.1.c": { difficulty: 55, studyTime: 40, examFreq: 70, why: "Inter-VLAN routing is heavily tested. Know router-on-a-stick (subinterfaces) and L3 switch (SVIs).", ciscoIntent: "Configure inter-VLAN routing", cheatSheet: [{ heading: "Inter-VLAN Connectivity", items: ["VLANs are separate broadcast domains — need L3 to route between them", "Router-on-a-stick: single router link, subinterfaces per VLAN", "<code>interface gi0/0.10</code> → <code>encapsulation dot1Q 10</code> → <code>ip address 10.1.10.1 255.255.255.0</code>", "L3 Switch: SVIs per VLAN → <code>interface vlan 10</code> → <code>ip address ...</code>", "L3 switch + <code>ip routing</code> enabled"]}], prereqs: [{ name: "VLANs", obj: "2.1.a" }, { name: "Trunking", obj: "2.2" }, { name: "L3 switches", obj: "1.1.b" }], resources: [{ type: "video", title: "Inter-VLAN Routing", url: "https://www.youtube.com/watch?v=jC6MJTh9fRE", desc: "Router-on-a-stick and L3 switch methods" }], labs: [{ name: "Router-on-a-stick lab", desc: "Configure subinterfaces, verify inter-VLAN connectivity" }], vocab: [{ term: "Inter-VLAN routing", q: "Why can't VLANs communicate without L3?", options: ["Different cable types", "Each VLAN is a separate broadcast domain needing L3 routing", "VLANs encrypt differently", "Switches block it permanently"], answer: 1, explain: "VLANs are isolated Layer 2 domains. A Layer 3 device (router or L3 switch) is needed to route between them." }] },

  "2.2.a": { difficulty: 45, studyTime: 30, examFreq: 70, why: "Trunk ports carry multiple VLANs between switches using 802.1Q tagging.", ciscoIntent: "Configure trunk ports", cheatSheet: [{ heading: "Trunk Ports", items: ["<code>switchport mode trunk</code> — force trunk", "<code>switchport trunk allowed vlan 10,20,30</code> — limit VLANs", "Trunk carries tagged frames for multiple VLANs", "Used between switches, between switch and router (router-on-a-stick)"]}], prereqs: [{ name: "VLANs", obj: "2.1" }], resources: [{ type: "video", title: "Trunking Deep Dive", url: "https://www.youtube.com/watch?v=ISMaSyvG74w", desc: "How VLAN tagging works" }], labs: [{ name: "Configure trunks", desc: "Set up trunks, limit allowed VLANs, verify" }], vocab: [{ term: "Trunk", q: "What does a trunk port carry?", options: ["One VLAN only", "Tagged traffic for multiple VLANs", "Only broadcast traffic", "Only management traffic"], answer: 1, explain: "Trunk ports carry frames for multiple VLANs, each tagged with 802.1Q to identify its VLAN." }] },
  "2.2.b": { difficulty: 40, studyTime: 25, examFreq: 65, why: "802.1Q is the only trunking encapsulation on the exam. Know where the tag goes and what it contains.", ciscoIntent: "Describe 802.1Q frame tagging", cheatSheet: [{ heading: "802.1Q", items: ["4-byte tag inserted after source MAC, before EtherType", "Contains: TPID (0x8100), Priority (3 bits/CoS), DEI (1 bit), VLAN ID (12 bits)", "12-bit VLAN ID → supports VLANs 1-4094", "ISL is Cisco-proprietary and deprecated — not on exam"]}], prereqs: [{ name: "Ethernet frame", obj: "1.13" }], resources: [], labs: [], vocab: [{ term: "802.1Q", q: "Where is the 802.1Q tag inserted?", options: ["Before preamble", "After source MAC", "After IP header", "End of frame"], answer: 1, explain: "The 4-byte 802.1Q tag is inserted between source MAC and EtherType. It contains the VLAN ID (12 bits)." }] },
  "2.2.c": { difficulty: 45, studyTime: 25, examFreq: 65, why: "Native VLAN mismatches are a common troubleshooting and security topic.", ciscoIntent: "Explain native VLAN and its security implications", cheatSheet: [{ heading: "Native VLAN", items: ["Traffic on native VLAN crosses trunk UNTAGGED", "Default native VLAN = VLAN 1", "Both sides of trunk MUST match native VLAN — mismatch = security risk + connectivity issues", "<code>switchport trunk native vlan 99</code> — change native VLAN", "Best practice: use an unused VLAN as native, never VLAN 1", "DTP: disable with <code>switchport nonegotiate</code> to prevent VLAN hopping"]}], prereqs: [{ name: "802.1Q", obj: "2.2.b" }], resources: [{ type: "video", title: "Native VLAN", url: "https://www.youtube.com/watch?v=Fmq1E1bk2bE", desc: "Why it matters and common mistakes" }], labs: [{ name: "Troubleshoot native VLAN mismatch", desc: "Intentionally misconfigure, observe CDP warnings, fix" }], vocab: [{ term: "Native VLAN", q: "What happens to native VLAN traffic on a trunk?", options: ["Encrypted", "Sent WITHOUT a tag", "Dropped", "Highest priority"], answer: 1, explain: "Native VLAN frames cross the trunk untagged. Both sides must match." }] },

  // ── Remaining Domain 2 objectives (no subs) ──────────────────────
  "2.3": { difficulty: 25, studyTime: 15, examFreq: 45, why: "CDP (Cisco) and LLDP (IEEE) discover neighbors. Know the commands and security considerations.", ciscoIntent: "Use CDP/LLDP to discover topology", cheatSheet: [{ heading: "Discovery Protocols", items: ["CDP — Cisco proprietary, enabled by default, L2, 60s updates", "LLDP — IEEE 802.1AB, vendor-neutral, must be enabled manually", "Both reveal: device ID, IP, platform, port ID", "<code>show cdp neighbors [detail]</code> / <code>show lldp neighbors [detail]</code>", "Security: disable on external-facing interfaces"]}], prereqs: [], resources: [{ type: "video", title: "CDP and LLDP", url: "https://www.youtube.com/watch?v=GKpZ5w8Vihs", desc: "When to use each" }], labs: [{ name: "CDP topology mapping", desc: "Use show cdp neighbors to map a network without a diagram" }], vocab: [{ term: "CDP vs LLDP", q: "Key difference?", options: ["CDP is L3, LLDP is L2", "CDP is Cisco proprietary, LLDP is IEEE standard", "LLDP reveals more", "CDP is wireless only"], answer: 1, explain: "CDP is Cisco-only. LLDP (802.1AB) works across any vendor." }] },
  "2.4": { difficulty: 50, studyTime: 35, examFreq: 55, why: "EtherChannel bundles links. LACP is the standard. Know mode combinations.", ciscoIntent: "Configure EtherChannel with LACP", cheatSheet: [{ heading: "EtherChannel", items: ["Bundles 2-8 physical links into 1 logical channel", "LACP (802.3ad): active/passive. At least one side must be active.", "Static: mode on (both sides). No negotiation.", "Both sides must match: speed, duplex, VLAN config, trunk mode", "<code>channel-group 1 mode active</code>", "<code>show etherchannel summary</code>"]}], prereqs: [{ name: "Trunking", obj: "2.2" }], resources: [{ type: "video", title: "EtherChannel and LACP", url: "https://www.youtube.com/watch?v=u0KJqg8LZNE", desc: "Config and troubleshooting" }], labs: [{ name: "LACP EtherChannel", desc: "Bundle 2 links using LACP, verify, test failover" }], vocab: [{ term: "LACP", q: "Which combination forms an EtherChannel?", options: ["passive/passive", "active/passive", "active/desirable", "on/active"], answer: 1, explain: "At least one side must be active. passive/passive won't initiate." }] },

  // ── 2.5 STP sub-objectives ───────────────────────────────────────
  "2.5.a": { difficulty: 60, studyTime: 40, examFreq: 65, why: "Root bridge election and port roles are core STP. Cisco tests this heavily.", ciscoIntent: "Identify root bridge, root ports, and designated ports", cheatSheet: [{ heading: "Root & Port Roles", items: ["Root bridge = lowest Bridge ID (priority + MAC). Default priority = 32768.", "Root port = best path to root (one per non-root switch)", "Designated port = best port on each segment (forwards)", "Alternate = blocked (standby)", "<code>spanning-tree vlan 10 root primary</code> — set as root", "Election is NOT preemptive"]}], prereqs: [{ name: "Switching concepts", obj: "1.13" }], resources: [{ type: "video", title: "STP Deep Dive", url: "https://www.youtube.com/watch?v=japdEY1UKe4", desc: "Root election, port roles" }], labs: [{ name: "STP root election", desc: "3+ switches, observe election, change priority" }], vocab: [{ term: "Root bridge", q: "How is root bridge elected?", options: ["Highest MAC", "Lowest Bridge ID (priority + MAC)", "Fastest uplink", "First powered on"], answer: 1, explain: "Lowest Bridge ID wins. Bridge ID = priority (default 32768) + system MAC." }] },
  "2.5.b": { difficulty: 55, studyTime: 30, examFreq: 60, why: "Rapid PVST+ port states: Discarding, Learning, Forwarding.", ciscoIntent: "Identify STP port states and roles", cheatSheet: [{ heading: "Port States & Roles", items: ["Discarding — not forwarding, not learning MACs (blocks loops)", "Learning — learning MACs but not yet forwarding data", "Forwarding — fully operational, learning and forwarding", "Rapid PVST+ converges faster than legacy STP (802.1D)", "Roles: Root, Designated, Alternate, Backup"]}], prereqs: [{ name: "Root election", obj: "2.5.a" }], resources: [], labs: [], vocab: [{ term: "Port states", q: "In Rapid PVST+, what are the three port states?", options: ["Blocking, Listening, Forwarding", "Discarding, Learning, Forwarding", "Active, Standby, Down", "Open, Half-open, Closed"], answer: 1, explain: "Rapid PVST+ simplified to three states: Discarding, Learning, Forwarding." }] },
  "2.5.c": { difficulty: 40, studyTime: 20, examFreq: 60, why: "PortFast skips STP delay on access ports. Critical for end-device connectivity.", ciscoIntent: "Configure PortFast on edge ports", cheatSheet: [{ heading: "PortFast", items: ["Skips Discarding/Learning → goes straight to Forwarding", "Only for access/edge ports (end devices, not switches)", "If a switch connects to a PortFast port → potential loop", "<code>spanning-tree portfast</code> — per interface", "<code>spanning-tree portfast default</code> — all access ports globally"]}], prereqs: [{ name: "Port states", obj: "2.5.b" }], resources: [{ type: "video", title: "PortFast and BPDU Guard", url: "https://www.youtube.com/watch?v=1iciXlaIH2I", desc: "Why and when" }], labs: [], vocab: [{ term: "PortFast", q: "Why only on edge ports?", options: ["Disables security", "Skips STP — if a switch connects, it could cause a loop", "Reduces bandwidth", "Changes VLAN"], answer: 1, explain: "PortFast bypasses STP protection. If another switch connects, no loop prevention." }] },
  "2.5.d": { difficulty: 50, studyTime: 30, examFreq: 55, why: "STP protection mechanisms prevent unauthorized topology changes. BPDU Guard is most commonly tested.", ciscoIntent: "Describe STP protection features", cheatSheet: [{ heading: "STP Protection", items: ["BPDU Guard — shuts port (err-disabled) if BPDU received. Use on PortFast ports.", "BPDU Filter — suppresses BPDUs on a port. Use carefully — can cause loops.", "Root Guard — prevents port from becoming root port. Protects root bridge placement.", "Loop Guard — prevents blocked port from forwarding if BPDUs stop arriving."]}], prereqs: [{ name: "PortFast", obj: "2.5.c" }], resources: [], labs: [{ name: "BPDU Guard test", desc: "Enable BPDU Guard, connect a rogue switch, watch port shut down" }], vocab: [{ term: "BPDU Guard", q: "What happens when a BPDU Guard port receives a BPDU?", options: ["Logs and continues", "Goes err-disabled (shut down)", "Becomes root port", "Starts STP negotiation"], answer: 1, explain: "BPDU Guard immediately err-disables the port. Must be manually re-enabled." }] },

  // ── Remaining Domain 2 (no subs) ─────────────────────────────────
  "2.6": { difficulty: 35, studyTime: 25, examFreq: 40, why: "Know autonomous vs lightweight APs and AP modes (local, FlexConnect, monitor, sniffer, bridge).", ciscoIntent: "Identify wireless architectures and AP modes", cheatSheet: [{ heading: "Wireless Architectures", items: ["Autonomous AP — standalone, individual config. Small deployments.", "Lightweight AP — managed by WLC via CAPWAP. Enterprise.", "Cloud-managed — Meraki-style. Controller in cloud.", "AP Modes: Local (default), FlexConnect (branch), Monitor (IDS), Sniffer (capture), Bridge (P2P)"]}], prereqs: [{ name: "APs", obj: "1.1.d" }, { name: "Controllers", obj: "1.1.e" }], resources: [{ type: "video", title: "Cisco Wireless Architecture", url: "https://www.youtube.com/watch?v=5g3Rl_hl4cQ", desc: "Autonomous vs lightweight vs cloud" }], labs: [], vocab: [{ term: "FlexConnect", q: "When is FlexConnect used?", options: ["Monitor mode", "Branch offices — AP locally switches if WLC link drops", "Outdoor only", "Replacing WLC"], answer: 1, explain: "FlexConnect lets branch APs locally switch traffic, reducing WAN bandwidth." }] },
  "2.7": { difficulty: 30, studyTime: 20, examFreq: 35, why: "Know how APs, WLCs, and switches physically connect (PoE, trunks, LAG).", ciscoIntent: "Describe WLAN physical connectivity", cheatSheet: [{ heading: "WLAN Physical Connections", items: ["AP → switch via PoE port (access or trunk)", "WLC → distribution/core via trunk (carries all WLAN VLANs)", "LAG on WLC — bundles ports for redundancy/bandwidth", "Management VLAN for WLC management interface"]}], prereqs: [{ name: "Trunking", obj: "2.2" }, { name: "PoE", obj: "1.1.h" }], resources: [], labs: [{ name: "Draw WLAN topology", desc: "AP → switch → WLC → core with port types labeled" }], vocab: [{ term: "WLC LAG", q: "Why configure LAG on a WLC?", options: ["Create VLANs", "Bundle ports for bandwidth and redundancy", "Encrypt management", "Assign IPs to APs"], answer: 1, explain: "LAG bundles WLC uplinks into one logical connection for bandwidth + redundancy." }] },
  "2.8": { difficulty: 25, studyTime: 15, examFreq: 40, why: "Know management access methods and security: SSH > Telnet. TACACS+ vs RADIUS.", ciscoIntent: "Choose appropriate management access method", cheatSheet: [{ heading: "Management Access", items: ["Console — physical, serial, out-of-band. Most secure path.", "Telnet (23) — remote, unencrypted. Never in production.", "SSH (22) — remote, encrypted. Always preferred.", "HTTP/HTTPS — web GUI. HTTPS preferred.", "TACACS+ — TCP 49, encrypts full packet, separates AAA. Cisco.", "RADIUS — UDP 1812/1813, encrypts password only, combines auth+authz. Open standard.", "Cloud managed — Meraki dashboard, DNA Center cloud."]}], prereqs: [{ name: "TCP/UDP", obj: "1.5" }], resources: [{ type: "video", title: "TACACS+ vs RADIUS", url: "https://www.youtube.com/watch?v=gMnFIrYz7lo", desc: "Key differences" }], labs: [{ name: "Configure SSH", desc: "Set hostname, domain, RSA keys, VTY for SSH only" }], vocab: [{ term: "TACACS+", q: "Advantage over RADIUS for device management?", options: ["Faster", "Separates authentication, authorization, and accounting", "Uses UDP", "Open standard"], answer: 1, explain: "TACACS+ separates AAA, allowing granular command authorization." }] },
  "2.9": { difficulty: 30, studyTime: 20, examFreq: 35, why: "WLC GUI configuration — Cisco may show a screenshot.", ciscoIntent: "Interpret WLC GUI for WLAN setup", cheatSheet: [{ heading: "WLAN GUI", items: ["Create WLAN: Profile Name + SSID + WLAN ID", "Security: L2 security (WPA2), auth (PSK or 802.1X)", "QoS: Platinum (voice), Gold (video), Silver (best effort), Bronze (background)", "Interface mapping: assign WLAN to a VLAN interface"]}], prereqs: [{ name: "Wireless principles", obj: "1.11" }], resources: [], labs: [], vocab: [{ term: "WLAN Profile", q: "What two identifiers does a WLAN have?", options: ["SSID and MAC", "Profile Name and SSID", "IP and port", "Channel and power"], answer: 1, explain: "Profile Name is the internal WLC ID. SSID is what clients see. Can differ." }] },

  // ── Domain 3 (IP Connectivity) ───────────────────────────────────
  "3.1.a": { difficulty: 45, studyTime: 30, examFreq: 80, why: "Route codes tell you how the route was learned.", ciscoIntent: "Identify routing protocol codes in show ip route", cheatSheet: [{ heading: "Protocol Codes", items: ["C = Connected, L = Local, S = Static, O = OSPF, D = EIGRP, R = RIP, B = BGP", "Connected routes auto-appear when interface is up/up with an IP", "Local routes = /32 host routes for the router's own IPs"]}], prereqs: [{ name: "IP addressing", obj: "1.6" }], resources: [{ type: "video", title: "Reading the Routing Table", url: "https://www.youtube.com/watch?v=jLln6BDMEBk", desc: "Every field explained" }], labs: [{ name: "Route table reading", desc: "Given 5 routing tables, identify protocol for each route" }], vocab: [{ term: "Route code", q: "What does 'O' mean in a routing table?", options: ["Connected", "OSPF-learned route", "Static route", "Default route"], answer: 1, explain: "O = OSPF. C = Connected, S = Static, D = EIGRP, R = RIP, B = BGP." }] },
  "3.1.b": { difficulty: 40, studyTime: 20, examFreq: 75, why: "The prefix is the network destination.", ciscoIntent: "Identify the network prefix in a route entry", cheatSheet: [{ heading: "Prefix", items: ["The network address in the routing table entry", "Example: 10.1.1.0/24 — the prefix is 10.1.1.0", "More specific prefix (longer mask) = more precise route"]}], prereqs: [{ name: "Subnetting", obj: "1.6" }], resources: [], labs: [], vocab: [{ term: "Prefix", q: "In route '10.1.1.0/24 via 192.168.1.1', what is the prefix?", options: ["192.168.1.1", "10.1.1.0/24", "/24", "via"], answer: 1, explain: "The prefix is the destination network — 10.1.1.0/24." }] },
  "3.1.c": { difficulty: 35, studyTime: 15, examFreq: 70, why: "Network mask determines how specific the route is.", ciscoIntent: "Interpret the mask in a routing table entry", cheatSheet: [{ heading: "Network Mask", items: ["Defines how many bits are the network portion", "/24 = 255.255.255.0, /16 = 255.255.0.0, etc.", "Longer mask = more specific route = preferred in longest prefix match"]}], prereqs: [{ name: "Subnetting", obj: "1.6" }], resources: [], labs: [], vocab: [{ term: "Mask", q: "Which route is more specific: /24 or /28?", options: ["/24", "/28", "They're equal", "Depends on AD"], answer: 1, explain: "/28 has more network bits = more specific. It wins in longest prefix match." }] },
  "3.1.d": { difficulty: 40, studyTime: 20, examFreq: 80, why: "Next hop tells the router where to send the packet.", ciscoIntent: "Identify next hop in a route", cheatSheet: [{ heading: "Next Hop", items: ["The IP address of the next router in the path", "Or an exit interface (for directly connected or point-to-point)", "Example: 'via 10.2.2.1' means forward to 10.2.2.1"]}], prereqs: [{ name: "Routing basics", obj: "1.1.a" }], resources: [], labs: [], vocab: [{ term: "Next hop", q: "What is the next hop in a routing table?", options: ["Final destination", "IP of the next router toward the destination", "Source IP", "Broadcast address"], answer: 1, explain: "Next hop is the IP of the next router in the forwarding path." }] },
  "3.1.e": { difficulty: 50, studyTime: 30, examFreq: 85, why: "AD determines which routing source is trusted. Lower = more trusted. Critical for route selection.", ciscoIntent: "Use AD to determine the preferred route source", cheatSheet: [{ heading: "Administrative Distance", items: ["Trustworthiness of a route source. Lower = preferred.", "Connected = 0, Static = 1, EIGRP = 90, OSPF = 110, RIP = 120, Unknown = 255", "If same destination from multiple sources → lowest AD wins", "Floating static = static route with artificially high AD (e.g., 200) as backup"]}], prereqs: [], resources: [], labs: [], vocab: [{ term: "AD", q: "OSPF (110) and static (1) routes to same destination — which wins?", options: ["OSPF (higher = more trusted)", "Static (lower = more trusted)", "Both used", "Most recent"], answer: 1, explain: "Lower AD wins. Static (1) beats OSPF (110)." }] },
  "3.1.f": { difficulty: 40, studyTime: 20, examFreq: 70, why: "Metric is the tiebreaker within a single routing protocol.", ciscoIntent: "Explain how metric selects the best route within a protocol", cheatSheet: [{ heading: "Metric", items: ["Cost/distance value WITHIN a routing protocol. Lower = preferred.", "OSPF metric = cost (based on bandwidth). 100Mbps reference / link BW.", "RIP metric = hop count (max 15, 16 = unreachable)", "EIGRP metric = composite (bandwidth + delay by default)"]}], prereqs: [{ name: "AD", obj: "3.1.e" }], resources: [], labs: [], vocab: [{ term: "Metric", q: "OSPF metric is based on?", options: ["Hop count", "Cost (bandwidth-based)", "Delay only", "MTU"], answer: 1, explain: "OSPF cost = reference bandwidth / interface bandwidth. Default reference = 100 Mbps." }] },
  "3.1.g": { difficulty: 35, studyTime: 15, examFreq: 65, why: "Gateway of last resort is the default route — the catch-all.", ciscoIntent: "Identify the gateway of last resort in show ip route", cheatSheet: [{ heading: "Gateway of Last Resort", items: ["The default route: 0.0.0.0/0", "Used when no more specific route matches", "Shown at top of 'show ip route' output", "If not set: 'Gateway of last resort is not set' — packets to unknown destinations are dropped"]}], prereqs: [{ name: "Static routing", obj: "3.3" }], resources: [], labs: [], vocab: [{ term: "Default route", q: "When is the gateway of last resort used?", options: ["Always", "Only when no more specific route matches", "Only for multicast", "Only during STP"], answer: 1, explain: "0.0.0.0/0 is the catch-all — used only when no other route matches." }] },
  "3.2.a": { difficulty: 50, studyTime: 35, examFreq: 85, why: "THE routing rule. Most specific route wins. /28 beats /24 beats /16.", ciscoIntent: "Apply longest prefix match to select the forwarding route", cheatSheet: [{ heading: "Longest Prefix Match", items: ["Router always prefers the most specific (longest mask) matching route", "/28 > /24 > /16 > /8 > /0", "Example: routes for 10.0.0.0/8, 10.1.0.0/16, 10.1.1.0/24 → packet to 10.1.1.50 uses /24"]}], prereqs: [{ name: "Subnetting", obj: "1.6" }, { name: "Routing table", obj: "3.1" }], resources: [{ type: "video", title: "Longest Prefix Match", url: "https://www.youtube.com/watch?v=RXOjclhJCPQ", desc: "Step by step" }], labs: [{ name: "Route selection scenarios", desc: "Given overlapping routes, pick the winner for each destination" }], vocab: [{ term: "Longest prefix", q: "Routes: 10.0.0.0/8, 10.1.0.0/16, 10.1.1.0/24. Packet to 10.1.1.50?", options: ["10.0.0.0/8", "10.1.0.0/16", "10.1.1.0/24", "All three"], answer: 2, explain: "/24 is the longest match. Most specific always wins." }] },
  "3.2.b": { difficulty: 40, studyTime: 20, examFreq: 70, why: "AD breaks ties between different routing sources for the same prefix.", ciscoIntent: "Apply AD when multiple sources know the same prefix", cheatSheet: [{ heading: "AD in Forwarding", items: ["Same prefix from OSPF (110) and static (1) → static wins", "AD only compares routes to the SAME destination prefix", "AD is NOT compared across different prefixes — longest match first"]}], prereqs: [{ name: "AD", obj: "3.1.e" }], resources: [], labs: [], vocab: [{ term: "AD tiebreaker", q: "When does AD matter?", options: ["Always", "When multiple sources know the same prefix", "Only for OSPF", "Never"], answer: 1, explain: "AD only breaks ties when the same prefix is learned from multiple routing sources." }] },
  "3.2.c": { difficulty: 40, studyTime: 20, examFreq: 65, why: "Metric breaks ties within the SAME routing protocol for the same prefix.", ciscoIntent: "Apply metric when same protocol has multiple paths", cheatSheet: [{ heading: "Metric in Forwarding", items: ["Same prefix, same protocol, different paths → lowest metric wins", "OSPF: lowest cost. RIP: fewest hops. EIGRP: composite calculation.", "Equal-cost paths may load-balance (ECMP)"]}], prereqs: [{ name: "Metric", obj: "3.1.f" }], resources: [], labs: [], vocab: [{ term: "ECMP", q: "What happens with equal-cost routes?", options: ["One is dropped", "Load balancing across both paths", "The oldest wins", "Error"], answer: 1, explain: "Equal-Cost Multi-Path (ECMP) distributes traffic across paths with identical cost." }] },

  // ── 3.3–3.5 ──────────────────────────────────────────────────────
  "3.3.a": { difficulty: 35, studyTime: 20, examFreq: 65, why: "Default route is the catch-all — 0.0.0.0/0.", ciscoIntent: "Configure a default static route", cheatSheet: [{ heading: "Default Route", items: ["<code>ip route 0.0.0.0 0.0.0.0 203.0.113.1</code>", "IPv6: <code>ipv6 route ::/0 2001:db8:2::1</code>", "Matches any destination not covered by a more specific route"]}], prereqs: [{ name: "Routing table", obj: "3.1" }], resources: [{ type: "video", title: "Static Routing", url: "https://www.youtube.com/watch?v=gBL6STojGhk", desc: "All types with configs" }], labs: [{ name: "Configure default route", desc: "Set up default route, verify with show ip route" }], vocab: [{ term: "Default route", q: "What does 0.0.0.0/0 match?", options: ["Only 0.0.0.0", "Every possible destination", "Only private addresses", "Only multicast"], answer: 1, explain: "/0 mask means zero network bits — matches everything." }] },
  "3.3.b": { difficulty: 30, studyTime: 15, examFreq: 60, why: "Network routes direct traffic to a specific subnet.", ciscoIntent: "Configure a network static route", cheatSheet: [{ heading: "Network Route", items: ["<code>ip route 10.1.0.0 255.255.0.0 192.168.1.1</code>", "Routes traffic for the 10.1.0.0/16 network via next hop 192.168.1.1"]}], prereqs: [{ name: "Subnetting", obj: "1.6" }], resources: [], labs: [], vocab: [{ term: "Network route", q: "What does a network static route specify?", options: ["One host", "A subnet destination and next hop", "All traffic", "Only DNS traffic"], answer: 1, explain: "A network route sends traffic for a specific subnet to a specified next hop." }] },
  "3.3.c": { difficulty: 25, studyTime: 10, examFreq: 40, why: "Host routes are /32 — point to a single IP address.", ciscoIntent: "Configure a host static route", cheatSheet: [{ heading: "Host Route", items: ["<code>ip route 10.1.1.100 255.255.255.255 192.168.1.1</code>", "/32 mask = single host. Most specific possible route."]}], prereqs: [{ name: "Subnetting", obj: "1.6" }], resources: [], labs: [], vocab: [{ term: "Host route", q: "What mask does a host route use?", options: ["/24", "/30", "/32", "/0"], answer: 2, explain: "/32 = all 32 bits are network, leaving zero host bits. Matches exactly one IP." }] },
  "3.3.d": { difficulty: 40, studyTime: 20, examFreq: 50, why: "Floating statics are backup routes with artificially high AD.", ciscoIntent: "Configure a floating static route as backup", cheatSheet: [{ heading: "Floating Static", items: ["Static route with higher AD → only installs when primary route fails", "<code>ip route 10.0.0.0 255.0.0.0 10.2.2.1 200</code> (AD 200)", "Normal static AD = 1. Setting AD 200 means it loses to OSPF (110) or EIGRP (90).", "When the primary route disappears, floating static activates."]}], prereqs: [{ name: "AD", obj: "3.1.e" }], resources: [], labs: [], vocab: [{ term: "Floating static", q: "What is a floating static route?", options: ["A route that changes dynamically", "A static route with high AD — only activates when primary fails", "A default route", "An OSPF route"], answer: 1, explain: "High AD keeps it hidden until the primary route (with lower AD) disappears." }] },
  "3.4.a": { difficulty: 70, studyTime: 50, examFreq: 85, why: "OSPF neighbor adjacency requirements are heavily tested. Mismatched parameters = no adjacency.", ciscoIntent: "Identify OSPF neighbor requirements and troubleshoot adjacency failures", cheatSheet: [{ heading: "OSPF Adjacencies", items: ["Requirements (must match): area ID, subnet, hello/dead timers, authentication, MTU, network type", "Hello/Dead: 10/40 on broadcast, 30/120 on NBMA", "States: Down → Init → 2-Way → ExStart → Exchange → Loading → Full", "<code>show ip ospf neighbor</code> — verify adjacencies", "Stuck in INIT = one-way. Stuck in EXSTART = MTU mismatch."]}], prereqs: [{ name: "Routing table", obj: "3.1" }, { name: "Subnetting", obj: "1.6" }], resources: [{ type: "video", title: "OSPF Explained", url: "https://www.youtube.com/watch?v=kfvJ8QVJscc", desc: "Jeremy's IT Lab — complete OSPF" }], labs: [{ name: "OSPF troubleshooting", desc: "Given broken OSPF, identify and fix the adjacency problem" }], vocab: [{ term: "OSPF neighbor", q: "Which must match for OSPF adjacency?", options: ["Router ID only", "Area, subnet, hello/dead timers, auth, MTU", "Just the IP address", "VLAN only"], answer: 1, explain: "All listed parameters must match or the adjacency won't form." }] },
  "3.4.b": { difficulty: 55, studyTime: 30, examFreq: 65, why: "Point-to-point OSPF networks don't elect DR/BDR.", ciscoIntent: "Describe OSPF on point-to-point networks", cheatSheet: [{ heading: "Point-to-Point", items: ["No DR/BDR election — only two routers on the link", "Hello/Dead: 10/40 seconds", "Full adjacency forms directly", "Common on serial links and point-to-point Ethernet subinterfaces", "<code>ip ospf network point-to-point</code>"]}], prereqs: [{ name: "OSPF adjacencies", obj: "3.4.a" }], resources: [], labs: [], vocab: [{ term: "Point-to-point", q: "Is DR/BDR elected on point-to-point OSPF?", options: ["Yes, always", "No — only two routers, no need", "Only if manually configured", "Depends on area type"], answer: 1, explain: "Point-to-point has only two routers — DR/BDR election is unnecessary." }] },
  "3.4.c": { difficulty: 70, studyTime: 45, examFreq: 80, why: "DR/BDR election on broadcast networks is a top OSPF topic. Know priority and tiebreakers.", ciscoIntent: "Explain DR/BDR election on broadcast segments", cheatSheet: [{ heading: "DR/BDR Election", items: ["Broadcast network = Ethernet. DR/BDR elected to reduce adjacency count.", "Highest priority wins (default 1). Priority 0 = never DR.", "Tiebreaker: highest Router ID", "Election is NOT preemptive — existing DR stays.", "All routers form full adjacency with DR and BDR, 2-Way with others.", "<code>ip ospf priority 100</code> — influence election"]}], prereqs: [{ name: "OSPF adjacencies", obj: "3.4.a" }], resources: [{ type: "lab", title: "OSPF Mastery", url: "ospf-mastery.html", desc: "Local OSPF deep dive" }], labs: [{ name: "DR/BDR election", desc: "4 routers on broadcast segment, manipulate priorities, verify election" }], vocab: [{ term: "DR/BDR", q: "Why does OSPF elect DR and BDR?", options: ["Load balancing", "Reduce adjacencies and LSA flooding", "Encrypt traffic", "Assign IPs"], answer: 1, explain: "Without DR/BDR, every router needs full adjacency with every other. DR reduces this to n adjacencies." }] },
  "3.4.d": { difficulty: 55, studyTime: 25, examFreq: 70, why: "Router ID selection order is a classic exam question.", ciscoIntent: "Determine OSPF Router ID", cheatSheet: [{ heading: "Router ID", items: ["Selection order: 1) manual (router-id), 2) highest loopback IP, 3) highest active interface IP", "<code>router-id 1.1.1.1</code> — manual override", "Change requires <code>clear ip ospf process</code>", "Router ID must be unique in the OSPF domain"]}], prereqs: [], resources: [], labs: [], vocab: [{ term: "Router ID", q: "OSPF Router ID selection order?", options: ["Highest IP → lowest → manual", "Manual → highest loopback → highest active interface", "MAC-based", "Random"], answer: 1, explain: "1) manual router-id, 2) highest loopback IP, 3) highest active interface IP." }, { term: "Wildcard", q: "Wildcard mask for 172.16.0.0/22?", options: ["0.0.3.255", "0.0.0.255", "0.0.7.255", "0.0.15.255"], answer: 0, explain: "/22 = 255.255.252.0. Wildcard = 255.255.255.255 - 255.255.252.0 = 0.0.3.255." }] },

  // ── Domain 1 NEW entries ──

  // ── 1.4 Interface and Cable Issues ──────────────────────────────────
  "1.4.a": { difficulty: 30, studyTime: 15, examFreq: 50, why: "Collisions indicate half-duplex or hub-based segments. Late collisions almost always mean duplex mismatch -- a top troubleshooting scenario.", ciscoIntent: "Identify collision types and their causes from show interface output", cheatSheet: [{ heading: "Collisions & Late Collisions", items: ["Collision = two frames transmitted simultaneously on shared media (half-duplex)", "Normal collisions happen within first 512 bits (64 bytes) -- expected on half-duplex", "Late collision = collision detected AFTER first 64 bytes sent", "Late collisions on full-duplex port = almost always duplex mismatch", "Counter: <code>show interfaces gi0/1</code> -- look for 'collisions' and 'late collision' fields", "Fix: ensure both sides are full-duplex or set <code>duplex auto</code>"]}], prereqs: [{ name: "Switching concepts", obj: "1.13" }, { name: "Cabling", obj: "1.3" }], resources: [], labs: [{ name: "Duplex mismatch lab", desc: "Force one side half-duplex, observe late collisions in show interfaces" }], vocab: [{ term: "Late collision", q: "What does a late collision on a full-duplex interface almost always indicate?", options: ["Bad cable", "Speed mismatch", "Duplex mismatch", "STP reconvergence"], answer: 2, explain: "Late collisions on a full-duplex port are the hallmark symptom of a duplex mismatch -- one side is full, the other half." }] },
  "1.4.b": { difficulty: 30, studyTime: 15, examFreq: 50, why: "CRC errors mean corrupted frames reached the switch. Cisco tests you on reading error counters and correlating causes.", ciscoIntent: "Diagnose CRC and frame errors from interface counters", cheatSheet: [{ heading: "CRC & Frame Errors", items: ["CRC (Cyclic Redundancy Check) error = frame's FCS doesn't match recalculated value", "Causes: bad cable, EMI/interference, duplex mismatch, faulty NIC", "Frame errors = malformed frame (bad format, not just corruption)", "Both appear in <code>show interfaces</code> under 'input errors'", "CRC errors that increase steadily = physical layer problem (cable/connector)", "CRC errors with late collisions = duplex mismatch"]}], prereqs: [{ name: "Cabling", obj: "1.3" }], resources: [], labs: [], vocab: [{ term: "CRC error", q: "A switch port shows steadily increasing CRC errors with no late collisions. Most likely cause?", options: ["Duplex mismatch", "Bad cable or connector", "VLAN mismatch", "STP loop"], answer: 1, explain: "Steady CRC errors without late collisions point to a physical layer problem -- damaged cable, bad connector, or EMI." }] },
  "1.4.c": { difficulty: 25, studyTime: 10, examFreq: 45, why: "Runts and giants have specific byte thresholds that Cisco tests. Know the exact numbers.", ciscoIntent: "Identify runt and giant frames by their size thresholds", cheatSheet: [{ heading: "Runts & Giants", items: ["Runt = frame smaller than 64 bytes (minimum Ethernet frame size)", "Giant = frame larger than 1518 bytes (max Ethernet frame without 802.1Q)", "With 802.1Q tag: max becomes 1522 bytes (baby giant)", "Runts usually caused by collisions or a faulty NIC", "Giants usually caused by MTU mismatch or jumbo frames on a non-jumbo port", "Both counted in <code>show interfaces</code> output"]}], prereqs: [{ name: "Switching concepts", obj: "1.13" }], resources: [], labs: [], vocab: [{ term: "Runt", q: "What is the minimum valid Ethernet frame size?", options: ["32 bytes", "48 bytes", "64 bytes", "128 bytes"], answer: 2, explain: "The minimum Ethernet frame is 64 bytes (including header + data + FCS). Anything smaller is a runt." }] },
  "1.4.d": { difficulty: 30, studyTime: 15, examFreq: 45, why: "Input/output errors and interface resets are aggregated counters. Cisco tests whether you can read them to pinpoint the failure type.", ciscoIntent: "Interpret input/output error counters and interface reset counts", cheatSheet: [{ heading: "Input/Output Errors & Resets", items: ["Input errors = sum of runts, giants, CRC, frame, overrun, ignored errors", "Output errors = frames the interface failed to transmit (buffer overflow, collisions)", "Interface resets = interface was reset by the router/switch (usually due to missed keepalives)", "High resets + output errors = congestion, bad cable, or flapping link", "Counters in <code>show interfaces</code>: 'input errors', 'output errors', 'interface resets'", "<code>clear counters [interface]</code> to baseline and re-monitor"]}], prereqs: [{ name: "CRC/frame errors", obj: "1.4.b" }], resources: [], labs: [], vocab: [{ term: "Interface resets", q: "What typically causes a high number of interface resets on a router?", options: ["VLAN pruning", "Missed keepalives or link flapping", "STP convergence", "ARP timeout"], answer: 1, explain: "Interface resets are triggered when keepalive messages are missed or the link flaps repeatedly." }] },
  "1.4.e": { difficulty: 35, studyTime: 15, examFreq: 60, why: "Duplex mismatch is the #1 interface troubleshooting topic on the CCNA. Know the symptoms and how to verify.", ciscoIntent: "Identify and resolve duplex mismatch between connected devices", cheatSheet: [{ heading: "Duplex Mismatch", items: ["Half-duplex: send OR receive, not both (legacy hubs)", "Full-duplex: send AND receive simultaneously (switches)", "Mismatch: one side full, other half -- causes late collisions, CRC errors, poor performance", "Auto-negotiation failure: if one side is hardcoded, other side may default to half-duplex", "Verify: <code>show interfaces status</code> -- check duplex column (a-full = auto-negotiated full)", "Fix: <code>duplex auto</code> on both sides, or hardcode <code>duplex full</code> on both"]}], prereqs: [{ name: "Collisions", obj: "1.4.a" }], resources: [], labs: [{ name: "Duplex mismatch troubleshooting", desc: "Hardcode one side to half, leave other on full, observe symptoms" }], vocab: [{ term: "Duplex mismatch", q: "If one side is hardcoded to full-duplex and the other is on auto, what does the auto side negotiate to?", options: ["Full-duplex", "Half-duplex", "It depends on speed", "The port goes down"], answer: 1, explain: "When one side is hardcoded, auto-negotiation cannot complete. The auto side defaults to half-duplex, causing a mismatch." }] },
  "1.4.f": { difficulty: 30, studyTime: 15, examFreq: 50, why: "Speed mismatches cause interfaces to go down. Know the auto-negotiation rules and failure modes.", ciscoIntent: "Identify and resolve speed mismatch and auto-negotiation failures", cheatSheet: [{ heading: "Speed Mismatch", items: ["Speed mismatch = link may not come up at all (unlike duplex mismatch which silently degrades)", "Auto-negotiation (IEEE 802.3u): devices exchange capabilities and agree on highest common speed", "If one side hardcoded, other side on auto: auto side detects speed via electrical signaling", "If both sides hardcoded to different speeds: link stays down", "Verify: <code>show interfaces status</code> -- check speed column (a-100 = auto-negotiated 100)", "Best practice: <code>speed auto</code> + <code>duplex auto</code> on access ports; hardcode on infrastructure links"]}], prereqs: [{ name: "Cabling", obj: "1.3" }], resources: [], labs: [], vocab: [{ term: "Speed mismatch", q: "What happens when both sides of a link are hardcoded to different speeds?", options: ["They negotiate to the lower speed", "They negotiate to the higher speed", "The link stays down", "One side wins"], answer: 2, explain: "Hardcoded mismatched speeds cannot negotiate -- the link will not come up." }] },
  "1.4.g": { difficulty: 35, studyTime: 15, examFreq: 60, why: "Interface status codes appear on every CCNA exam. You must read line status / protocol status pairs instantly.", ciscoIntent: "Interpret interface status codes to diagnose layer 1 and layer 2 issues", cheatSheet: [{ heading: "Interface Status Codes", items: ["<code>up/up</code> -- Layer 1 and Layer 2 operational (normal)", "<code>up/down</code> -- Layer 1 up but Layer 2 protocol failed (encapsulation, keepalive, clock issue)", "<code>down/down</code> -- Layer 1 problem: no cable, bad cable, no link signal, speed mismatch", "<code>administratively down/down</code> -- interface shut down with <code>shutdown</code> command", "Fix admin down: <code>no shutdown</code>", "Verify: <code>show ip interface brief</code> -- status and protocol columns", "<code>show interfaces [int]</code> for full detail"]}], prereqs: [{ name: "Cabling", obj: "1.3" }], resources: [], labs: [{ name: "Status code diagnosis", desc: "Given 5 show ip interface brief outputs, identify the problem for each" }], vocab: [{ term: "up/down", q: "An interface shows 'up/down'. What does this indicate?", options: ["Layer 1 up, Layer 2 protocol failure", "Both layers operational", "Administratively disabled", "Cable disconnected"], answer: 0, explain: "up/down means physical layer is connected but Layer 2 protocol isn't working -- check encapsulation, keepalives, or clocking." }] },
  "1.4.h": { difficulty: 25, studyTime: 10, examFreq: 55, why: "These are the two commands Cisco expects you to use for interface troubleshooting. Know what each shows.", ciscoIntent: "Use show interfaces and show interfaces status to verify port health", cheatSheet: [{ heading: "Verification Commands", items: ["<code>show interfaces [type/num]</code> -- full detail: counters, errors, duplex, speed, MTU, MAC, CRC, runts, giants", "<code>show interfaces status</code> -- one-line summary per port: name, status, VLAN, duplex, speed, type", "<code>show interfaces [type/num]</code> key fields: 'line protocol is up/down', input/output errors, collisions", "<code>show interfaces status</code> key fields: connected/notconnect/disabled, a-full/a-100 (auto-negotiated values)", "Use <code>show interfaces status</code> for quick scan, <code>show interfaces [int]</code> for deep dive"]}], prereqs: [{ name: "Status codes", obj: "1.4.g" }], resources: [], labs: [], vocab: [{ term: "show interfaces status", q: "What does 'a-full' in the duplex column of show interfaces status mean?", options: ["Always full-duplex", "Auto-negotiated to full-duplex", "Administratively set to full", "Half-duplex"], answer: 1, explain: "The 'a-' prefix means auto-negotiated. 'a-full' = the port auto-negotiated to full-duplex." }] },

  // ── 1.5 TCP vs UDP ──────────────────────────────────────────────────
  "1.5.a": { difficulty: 20, studyTime: 10, examFreq: 55, why: "TCP's core traits -- connection-oriented, reliable, ordered -- are the foundation for every TCP vs UDP comparison question.", ciscoIntent: "Describe TCP as connection-oriented with reliable, ordered delivery", cheatSheet: [{ heading: "TCP Characteristics", items: ["Connection-oriented: must establish session before sending data", "Reliable: uses acknowledgments (ACKs) and retransmissions for lost segments", "Ordered: sequence numbers ensure data arrives in correct order", "Flow control: receiver advertises window size to prevent buffer overflow", "Error detection: checksum in TCP header verifies segment integrity", "Higher overhead than UDP: 20-byte minimum header vs UDP's 8 bytes"]}], prereqs: [{ name: "OSI Layer 4", obj: "Foundational" }], resources: [], labs: [], vocab: [{ term: "TCP reliability", q: "How does TCP ensure reliable delivery?", options: ["Sends data twice", "Uses ACKs and retransmits lost segments", "Encrypts all data", "Uses smaller packets"], answer: 1, explain: "TCP tracks every segment with sequence numbers and expects ACKs. If an ACK isn't received in time, the segment is retransmitted." }] },
  "1.5.b": { difficulty: 25, studyTime: 10, examFreq: 65, why: "The three-way handshake is one of the most frequently tested networking concepts. Know the exact sequence.", ciscoIntent: "Describe the TCP three-way handshake process", cheatSheet: [{ heading: "Three-Way Handshake", items: ["Step 1: Client sends SYN (synchronize) -- 'I want to connect'", "Step 2: Server replies SYN-ACK -- 'OK, I acknowledge and synchronize back'", "Step 3: Client sends ACK -- 'Connection established'", "After handshake: bidirectional data transfer begins", "SYN sets initial sequence numbers on both sides", "If SYN-ACK never received: client retries (SYN timeout)"]}], prereqs: [{ name: "TCP basics", obj: "1.5.a" }], resources: [], labs: [{ name: "Wireshark TCP handshake", desc: "Capture HTTP connection, identify SYN/SYN-ACK/ACK packets" }], vocab: [{ term: "Three-way handshake", q: "What is the correct order of the TCP three-way handshake?", options: ["ACK, SYN, SYN-ACK", "SYN, SYN-ACK, ACK", "SYN, ACK, FIN", "SYN-ACK, SYN, ACK"], answer: 1, explain: "Client SYN -> Server SYN-ACK -> Client ACK. This establishes the bidirectional connection." }] },
  "1.5.c": { difficulty: 25, studyTime: 10, examFreq: 45, why: "The four-way teardown gracefully closes TCP connections. Less tested than the handshake but still appears.", ciscoIntent: "Describe the TCP four-way connection teardown", cheatSheet: [{ heading: "Four-Way Teardown", items: ["Step 1: Initiator sends FIN -- 'I'm done sending'", "Step 2: Receiver sends ACK -- 'Got your FIN'", "Step 3: Receiver sends FIN -- 'I'm done too'", "Step 4: Initiator sends ACK -- 'Connection closed'", "Either side can initiate the teardown", "Half-close: after receiving first FIN+ACK, one direction is closed but the other can still send", "RST (Reset) = abrupt close, skips the graceful teardown"]}], prereqs: [{ name: "Three-way handshake", obj: "1.5.b" }], resources: [], labs: [], vocab: [{ term: "TCP teardown", q: "How many segments are exchanged in a graceful TCP connection teardown?", options: ["2 (FIN, ACK)", "3 (FIN, FIN-ACK, ACK)", "4 (FIN, ACK, FIN, ACK)", "1 (RST)"], answer: 2, explain: "Four segments: FIN, ACK, FIN, ACK. Each side sends its own FIN and receives an ACK." }] },
  "1.5.d": { difficulty: 30, studyTime: 15, examFreq: 40, why: "TCP flow control mechanisms prevent receiver buffer overflow. Windowing is key to understanding TCP performance.", ciscoIntent: "Explain TCP windowing, flow control, and sequencing", cheatSheet: [{ heading: "Windowing & Flow Control", items: ["Window size = number of bytes the receiver can accept before needing an ACK", "Sliding window: sender can transmit up to window size bytes without waiting for ACK", "Receiver advertises its window size in every ACK segment", "Window shrinks when receiver is overwhelmed; grows when receiver catches up", "Sequence numbers track each byte of data -- enables reordering and duplicate detection", "Congestion control: TCP also slows down when network congestion detected (cwnd)"]}], prereqs: [{ name: "TCP reliability", obj: "1.5.a" }], resources: [], labs: [], vocab: [{ term: "Window size", q: "What does the TCP window size control?", options: ["Maximum segment size", "How many bytes can be sent before requiring an ACK", "Encryption strength", "Number of retransmissions"], answer: 1, explain: "The window size tells the sender how much data the receiver can buffer. It prevents the sender from overwhelming the receiver." }] },
  "1.5.e": { difficulty: 15, studyTime: 10, examFreq: 55, why: "UDP's simplicity is its strength. Know when low overhead beats reliability.", ciscoIntent: "Describe UDP as connectionless, best-effort, and low-overhead", cheatSheet: [{ heading: "UDP Characteristics", items: ["Connectionless: no handshake, no session setup", "Best-effort: no ACKs, no retransmission, no guaranteed delivery", "No sequencing: packets may arrive out of order", "Low overhead: 8-byte header (vs TCP's 20+ bytes)", "Faster than TCP for real-time applications", "Applications handle reliability themselves if needed (e.g., DNS retries)"]}], prereqs: [{ name: "OSI Layer 4", obj: "Foundational" }], resources: [], labs: [], vocab: [{ term: "UDP", q: "Why is UDP preferred for real-time applications like VoIP?", options: ["It's more reliable", "Lower overhead and no retransmission delay -- old voice data is useless", "It encrypts better", "It uses less bandwidth always"], answer: 1, explain: "Real-time apps need speed over reliability. Retransmitting a delayed voice packet is pointless -- the conversation has moved on." }] },
  "1.5.f": { difficulty: 20, studyTime: 15, examFreq: 70, why: "TCP port numbers are tested directly. You must have these memorized cold.", ciscoIntent: "Associate well-known TCP ports with their protocols", cheatSheet: [{ heading: "TCP Well-Known Ports", items: ["FTP Data: <code>TCP 20</code> | FTP Control: <code>TCP 21</code>", "SSH: <code>TCP 22</code> (encrypted remote access)", "Telnet: <code>TCP 23</code> (unencrypted remote access -- avoid)", "SMTP: <code>TCP 25</code> (send email)", "HTTP: <code>TCP 80</code> (web, unencrypted)", "POP3: <code>TCP 110</code> (retrieve email, downloads and deletes)", "IMAP: <code>TCP 143</code> (retrieve email, syncs across devices)", "HTTPS: <code>TCP 443</code> (web, encrypted with TLS)", "Mnemonic: 'FTP 20/21, SSH 22, Telnet 23, SMTP 25, HTTP 80, HTTPS 443'"]}], prereqs: [{ name: "TCP basics", obj: "1.5.a" }], resources: [], labs: [], vocab: [{ term: "TCP ports", q: "Which port does SSH use?", options: ["TCP 21", "TCP 22", "TCP 23", "TCP 25"], answer: 1, explain: "SSH uses TCP 22. Telnet uses TCP 23. FTP control uses TCP 21. Don't mix them up." }] },
  "1.5.g": { difficulty: 20, studyTime: 15, examFreq: 65, why: "UDP port numbers are equally important. Several of these appear on nearly every CCNA exam.", ciscoIntent: "Associate well-known UDP ports with their protocols", cheatSheet: [{ heading: "UDP Well-Known Ports", items: ["DNS: <code>UDP 53</code> (also TCP 53 for zone transfers)", "DHCP Server: <code>UDP 67</code> | DHCP Client: <code>UDP 68</code>", "TFTP: <code>UDP 69</code> (trivial file transfer, no auth)", "NTP: <code>UDP 123</code> (time synchronization)", "SNMP: <code>UDP 161</code> (queries) | <code>UDP 162</code> (traps)", "Syslog: <code>UDP 514</code> (log messages to central server)", "Mnemonic: 'DNS 53, DHCP 67/68, TFTP 69, NTP 123, SNMP 161/162, Syslog 514'"]}], prereqs: [{ name: "UDP basics", obj: "1.5.e" }], resources: [], labs: [], vocab: [{ term: "UDP ports", q: "Which ports does DHCP use?", options: ["UDP 53 and 54", "UDP 67 (server) and 68 (client)", "UDP 69 and 70", "UDP 161 and 162"], answer: 1, explain: "DHCP server listens on UDP 67, client on UDP 68. The client broadcasts DISCOVER on 67; server responds to 68." }] },
  "1.5.h": { difficulty: 20, studyTime: 10, examFreq: 45, why: "DNS uses both TCP and UDP -- a favorite trick question. Know when each is used.", ciscoIntent: "Explain why DNS uses both TCP and UDP", cheatSheet: [{ heading: "Dual-Protocol: DNS", items: ["DNS queries: <code>UDP 53</code> (fast, small responses)", "DNS zone transfers: <code>TCP 53</code> (large, reliable transfers between DNS servers)", "If UDP response exceeds 512 bytes: falls back to TCP", "DNSSEC responses often use TCP due to larger payload", "Port 53 is the same for both -- protocol differs", "This is the most common 'both TCP and UDP' example on the exam"]}], prereqs: [{ name: "TCP ports", obj: "1.5.f" }, { name: "UDP ports", obj: "1.5.g" }], resources: [], labs: [], vocab: [{ term: "DNS dual protocol", q: "When does DNS use TCP instead of UDP?", options: ["Always", "Never -- DNS is UDP only", "Zone transfers and responses exceeding 512 bytes", "Only for reverse lookups"], answer: 2, explain: "Standard queries use UDP for speed. Zone transfers and large responses (>512 bytes) switch to TCP for reliability." }] },

  // ── 1.6 IPv4 Addressing and Subnetting ──────────────────────────────
  "1.6.a": { difficulty: 25, studyTime: 15, examFreq: 55, why: "IPv4 address structure is foundational. Every subnetting question builds on understanding the 32-bit format.", ciscoIntent: "Describe IPv4 address format and the network/host separation", cheatSheet: [{ heading: "IPv4 Address Structure", items: ["32 bits total, written as 4 octets in dotted-decimal (e.g., 192.168.1.1)", "Each octet = 8 bits, range 0-255", "Subnet mask divides address into network portion and host portion", "Network portion: identifies the subnet", "Host portion: identifies the specific device on that subnet", "All 0s in host portion = network address; all 1s = broadcast address"]}], prereqs: [{ name: "Binary basics", obj: "Foundational" }], resources: [], labs: [], vocab: [{ term: "IPv4 format", q: "How many bits is an IPv4 address?", options: ["16 bits", "32 bits", "64 bits", "128 bits"], answer: 1, explain: "IPv4 uses 32 bits written as 4 octets in dotted-decimal notation." }] },
  "1.6.b": { difficulty: 30, studyTime: 15, examFreq: 50, why: "Classful addressing defines default masks and first-octet ranges. You must know the Class A/B/C boundaries.", ciscoIntent: "Identify classful address ranges and their default subnet masks", cheatSheet: [{ heading: "Classful Addressing", items: ["Class A: first octet 1-126, default mask /8 (255.0.0.0), 16M+ hosts", "Class B: first octet 128-191, default mask /16 (255.255.0.0), 65K+ hosts", "Class C: first octet 192-223, default mask /24 (255.255.255.0), 254 hosts", "Class D: 224-239 (multicast, no mask)", "Class E: 240-255 (experimental/reserved)", "127.0.0.0/8 = loopback (not Class A usable)", "0.0.0.0 = reserved (not assignable)"]}], prereqs: [{ name: "IPv4 structure", obj: "1.6.a" }], resources: [], labs: [], vocab: [{ term: "Classful ranges", q: "What is the default subnet mask for a Class B address?", options: ["/8 (255.0.0.0)", "/16 (255.255.0.0)", "/24 (255.255.255.0)", "/32 (255.255.255.255)"], answer: 1, explain: "Class B (128-191) uses /16 by default. Class A = /8, Class C = /24." }] },
  "1.6.c": { difficulty: 25, studyTime: 10, examFreq: 55, why: "You must convert between dotted-decimal masks and CIDR notation instantly. This is tested directly and is needed for every subnetting question.", ciscoIntent: "Convert between dotted-decimal and CIDR subnet masks", cheatSheet: [{ heading: "Subnet Mask Notation", items: ["CIDR /24 = 255.255.255.0 (24 network bits, 8 host bits)", "CIDR /25 = 255.255.255.128, /26 = 255.255.255.192, /27 = 255.255.255.224", "/28 = 255.255.255.240, /29 = 255.255.255.248, /30 = 255.255.255.252", "/16 = 255.255.0.0, /20 = 255.255.240.0, /22 = 255.255.252.0", "Key pattern: subtract from 256 to get the block size (e.g., /26 = 256-192 = 64)", "Wildcard mask = 255.255.255.255 minus subnet mask (used in OSPF/ACLs)"]}], prereqs: [{ name: "IPv4 structure", obj: "1.6.a" }], resources: [], labs: [], vocab: [{ term: "CIDR notation", q: "What is /27 in dotted-decimal?", options: ["255.255.255.192", "255.255.255.224", "255.255.255.240", "255.255.255.128"], answer: 1, explain: "/27 = 27 ones followed by 5 zeros = 11111111.11111111.11111111.11100000 = 255.255.255.224." }] },
  "1.6.d": { difficulty: 40, studyTime: 25, examFreq: 70, why: "Calculating network address, broadcast, and valid host range is the core subnetting skill. You will do this on nearly every exam.", ciscoIntent: "Calculate network address, broadcast address, and usable host range from an IP and mask", cheatSheet: [{ heading: "Subnet Calculation", items: ["Network address: AND the IP with the mask (all host bits = 0)", "Broadcast address: set all host bits to 1", "First usable host: network address + 1", "Last usable host: broadcast address - 1", "Example: 192.168.1.130/26 -> block size 64 -> network 192.168.1.128, broadcast 192.168.1.191", "Hosts: 192.168.1.129 to 192.168.1.190 (62 usable hosts)", "Quick method: find the block boundary the IP falls in"]}], prereqs: [{ name: "Subnet masks", obj: "1.6.c" }], resources: [], labs: [{ name: "Subnetting drill", desc: "Given 10 IP/mask combos, calculate network, broadcast, first/last host" }], vocab: [{ term: "Broadcast address", q: "What is the broadcast address for 10.1.1.0/24?", options: ["10.1.1.0", "10.1.1.1", "10.1.1.254", "10.1.1.255"], answer: 3, explain: "/24 means the last octet is all host bits. All host bits set to 1 = 10.1.1.255." }] },
  "1.6.e": { difficulty: 40, studyTime: 20, examFreq: 65, why: "Knowing how to calculate subnet count and hosts-per-subnet is essential for network design questions.", ciscoIntent: "Calculate the number of subnets and hosts per subnet", cheatSheet: [{ heading: "Subnet & Host Formulas", items: ["Number of subnets = 2^(borrowed bits)", "Borrowed bits = new prefix length - default classful prefix length", "Hosts per subnet = 2^(host bits) - 2 (subtract network + broadcast)", "Example: Class C /24 subnetted to /27 -> 3 borrowed bits -> 2^3 = 8 subnets", "Host bits = 32 - prefix length. For /27: 32-27 = 5 host bits -> 2^5 - 2 = 30 hosts", "/30 = 2 hosts (perfect for point-to-point links)", "/31 = 2 hosts (RFC 3021, used on point-to-point only, no broadcast)"]}], prereqs: [{ name: "Subnet calculation", obj: "1.6.d" }], resources: [], labs: [], vocab: [{ term: "Hosts per subnet", q: "How many usable hosts in a /28 subnet?", options: ["14", "16", "30", "12"], answer: 0, explain: "/28 = 4 host bits. 2^4 = 16 total addresses. Subtract 2 (network + broadcast) = 14 usable hosts." }] },
  "1.6.f": { difficulty: 50, studyTime: 30, examFreq: 55, why: "VLSM lets you use different subnet sizes within one network -- essential for efficient IP allocation.", ciscoIntent: "Apply VLSM to allocate different-sized subnets from one address block", cheatSheet: [{ heading: "VLSM", items: ["VLSM = Variable Length Subnet Masking -- different prefix lengths per subnet", "Allocate largest subnets first, then progressively smaller ones", "Example: 192.168.1.0/24 -> /26 for 50 hosts, /27 for 25 hosts, /30 for point-to-point links", "Each subnet must not overlap another's address range", "VLSM requires a classless routing protocol (OSPF, EIGRP, RIPv2 -- NOT RIPv1)", "Key skill: plan subnets on paper before configuring"]}], prereqs: [{ name: "Subnet formulas", obj: "1.6.e" }], resources: [], labs: [{ name: "VLSM design", desc: "Given 4 departments with different host counts, design a VLSM addressing scheme" }], vocab: [{ term: "VLSM", q: "Why use VLSM instead of fixed-length subnetting?", options: ["Easier to configure", "Uses different mask lengths to minimize wasted addresses", "Required for IPv6", "Improves routing speed"], answer: 1, explain: "Fixed-length wastes addresses -- a 10-host subnet on a /24 wastes 244 addresses. VLSM lets you use /28 (14 hosts) instead." }] },
  "1.6.g": { difficulty: 35, studyTime: 20, examFreq: 50, why: "Binary conversion is the fundamental skill behind subnetting. The exam may require manual conversion.", ciscoIntent: "Convert between binary and decimal for subnetting calculations", cheatSheet: [{ heading: "Binary Conversion", items: ["Bit positions (right to left): 1, 2, 4, 8, 16, 32, 64, 128", "To convert decimal to binary: subtract largest power of 2 that fits, set that bit to 1", "Example: 200 = 128+64+8 = 11001000", "To convert binary to decimal: add up all positions with a 1", "Example: 10110000 = 128+32+16 = 176", "Practice converting the 'interesting octet' (the one with mixed 1s and 0s in the mask)", "Common values: 128, 192, 224, 240, 248, 252, 254, 255"]}], prereqs: [{ name: "IPv4 structure", obj: "1.6.a" }], resources: [], labs: [{ name: "Binary drills", desc: "Convert 20 decimal values to binary and back" }], vocab: [{ term: "Binary conversion", q: "What is 11010000 in decimal?", options: ["192", "208", "176", "224"], answer: 1, explain: "11010000 = 128 + 64 + 0 + 16 + 0 + 0 + 0 + 0 = 208." }] },
  "1.6.h": { difficulty: 25, studyTime: 10, examFreq: 55, why: "These verification commands confirm that IP addressing and routing are working. You will see them in exam simlets.", ciscoIntent: "Use show commands and ping to verify IPv4 configuration", cheatSheet: [{ heading: "IPv4 Verification", items: ["<code>show ip interface brief</code> -- quick summary: interface, IP, status, protocol", "<code>show ip route</code> -- full routing table with connected, static, and learned routes", "<code>ping [destination]</code> -- tests Layer 3 reachability (ICMP echo)", "5 exclamation marks = success; periods = timeout; U = unreachable", "<code>show running-config interface [int]</code> -- verify configured IP and mask", "Troubleshooting flow: check interface up/up -> check IP/mask -> ping default gateway -> ping remote"]}], prereqs: [{ name: "Subnet calculation", obj: "1.6.d" }], resources: [], labs: [{ name: "Verify addressing", desc: "Configure IPs on 3 routers, verify with show commands and ping" }], vocab: [{ term: "show ip interface brief", q: "What does 'show ip interface brief' display?", options: ["Full routing table", "Interface name, IP, status, and protocol in one-line format", "OSPF neighbors", "MAC address table"], answer: 1, explain: "show ip interface brief gives a compact view: interface, IP address, OK?, Method, Status, Protocol." }] },

  // ── 1.7 Private IPv4 Addressing ─────────────────────────────────────
  "1.7.a": { difficulty: 15, studyTime: 10, examFreq: 60, why: "The Class A private range is one of three you must memorize. These are on every CCNA exam.", ciscoIntent: "Identify the Class A private IPv4 range", cheatSheet: [{ heading: "Class A Private", items: ["Range: <code>10.0.0.0 - 10.255.255.255</code>", "CIDR: <code>10.0.0.0/8</code>", "Subnet mask: 255.0.0.0", "Over 16 million addresses", "Most commonly used in enterprise networks due to huge address space", "RFC 1918 defined all three private ranges"]}], prereqs: [{ name: "Classful addressing", obj: "1.6.b" }], resources: [], labs: [], vocab: [{ term: "10.x.x.x", q: "What is the CIDR notation for the Class A private range?", options: ["10.0.0.0/8", "10.0.0.0/16", "10.0.0.0/24", "10.0.0.0/12"], answer: 0, explain: "The Class A private range is 10.0.0.0/8 -- the entire first octet (10) is the network, giving 16M+ addresses." }] },
  "1.7.b": { difficulty: 20, studyTime: 10, examFreq: 60, why: "The Class B private range has a tricky upper boundary (172.31.255.255). Cisco loves testing whether you know the exact limits.", ciscoIntent: "Identify the Class B private IPv4 range and its boundaries", cheatSheet: [{ heading: "Class B Private", items: ["Range: <code>172.16.0.0 - 172.31.255.255</code>", "CIDR: <code>172.16.0.0/12</code>", "NOT /16 -- the /12 means the range extends from 172.16.x.x to 172.31.x.x", "Over 1 million addresses", "Trap: 172.32.0.0 is NOT private -- only 172.16 through 172.31", "Second octet range: 16 to 31 (16 Class B networks)"]}], prereqs: [{ name: "Classful addressing", obj: "1.6.b" }], resources: [], labs: [], vocab: [{ term: "172.16.0.0/12", q: "Is 172.32.1.1 a private address?", options: ["Yes, it's in the 172.16.0.0/12 range", "No, 172.16.0.0/12 only covers 172.16.0.0 through 172.31.255.255", "Yes, all 172.x.x.x addresses are private", "No, 172 addresses are never private"], answer: 1, explain: "The /12 mask means only 172.16.0.0 through 172.31.255.255 are private. 172.32.x.x is public." }] },
  "1.7.c": { difficulty: 15, studyTime: 10, examFreq: 55, why: "The Class C private range is the most recognized (home networks). Know the exact CIDR.", ciscoIntent: "Identify the Class C private IPv4 range", cheatSheet: [{ heading: "Class C Private", items: ["Range: <code>192.168.0.0 - 192.168.255.255</code>", "CIDR: <code>192.168.0.0/16</code>", "65,534 usable addresses", "Most common in home/SOHO networks", "Default on most consumer routers (192.168.1.0/24, 192.168.0.0/24)", "Entire 192.168.x.x space is private"]}], prereqs: [{ name: "Classful addressing", obj: "1.6.b" }], resources: [], labs: [], vocab: [{ term: "192.168.x.x", q: "What is the CIDR for the entire Class C private address space?", options: ["192.168.0.0/8", "192.168.0.0/16", "192.168.0.0/24", "192.168.1.0/24"], answer: 1, explain: "192.168.0.0/16 covers all addresses from 192.168.0.0 to 192.168.255.255." }] },
  "1.7.d": { difficulty: 20, studyTime: 10, examFreq: 55, why: "RFC 1918 defines private addresses and the requirement for NAT. This ties private addressing to real-world internet connectivity.", ciscoIntent: "Explain why private addresses need NAT to reach the internet", cheatSheet: [{ heading: "RFC 1918 & NAT", items: ["RFC 1918 defined the three private ranges (10/8, 172.16/12, 192.168/16)", "Private IPs are NOT routable on the public internet", "ISP routers drop packets with private source addresses", "NAT (Network Address Translation) translates private -> public at the network edge", "PAT (Port Address Translation / NAT overload): many private IPs share one public IP", "Without NAT, private hosts cannot communicate with the internet"]}], prereqs: [{ name: "Private ranges", obj: "1.7.a" }], resources: [], labs: [], vocab: [{ term: "RFC 1918", q: "Why can't a device with IP 10.1.1.1 reach the internet without NAT?", options: ["10.x.x.x is reserved for multicast", "Private addresses are not routable on the public internet", "The IP is invalid", "10.x.x.x requires IPv6"], answer: 1, explain: "RFC 1918 private addresses are not globally routable. ISPs drop them. NAT must translate to a public IP at the edge." }] },
  "1.7.e": { difficulty: 20, studyTime: 10, examFreq: 45, why: "APIPA (169.254.x.x) is a troubleshooting indicator -- it means DHCP failed. Cisco tests this recognition.", ciscoIntent: "Identify APIPA/link-local addresses and what they indicate", cheatSheet: [{ heading: "APIPA / Link-Local", items: ["Range: <code>169.254.0.0/16</code> (169.254.0.0 - 169.254.255.255)", "Auto-assigned when DHCP fails (Windows, macOS)", "Also called Automatic Private IP Addressing (APIPA)", "Only allows communication with other 169.254.x.x devices on the same link", "Cannot be routed -- link-local only", "Troubleshooting: if you see 169.254.x.x, check DHCP server reachability"]}], prereqs: [{ name: "Private addressing", obj: "1.7.d" }], resources: [], labs: [], vocab: [{ term: "APIPA", q: "A Windows PC shows IP 169.254.10.5. What does this indicate?", options: ["Static IP configuration", "DHCP server assigned it", "DHCP failed -- PC auto-assigned a link-local address", "The PC is on a VLAN"], answer: 2, explain: "169.254.x.x = APIPA. The PC couldn't reach a DHCP server and self-assigned a link-local address." }] },
  "1.7.f": { difficulty: 15, studyTime: 5, examFreq: 40, why: "Loopback (127.0.0.1) is used for local testing. Simple but sometimes tested as a distractor.", ciscoIntent: "Identify the loopback address range and its purpose", cheatSheet: [{ heading: "Loopback Address", items: ["Range: <code>127.0.0.0/8</code> (127.0.0.0 - 127.255.255.255)", "Most commonly referenced as 127.0.0.1 ('localhost')", "Used for local testing -- traffic never leaves the host", "Pinging 127.0.0.1 tests the local TCP/IP stack", "NOT the same as a Cisco loopback interface (virtual interface on a router)", "If ping 127.0.0.1 fails, the TCP/IP stack is broken"]}], prereqs: [], resources: [], labs: [], vocab: [{ term: "Loopback", q: "What does pinging 127.0.0.1 test?", options: ["Connectivity to the default gateway", "The local host's TCP/IP stack", "DNS resolution", "DHCP availability"], answer: 1, explain: "127.0.0.1 is the loopback address. Pinging it tests whether the local TCP/IP stack is functioning." }] },

  // ── 1.8 IPv6 Addressing ─────────────────────────────────────────────
  "1.8.a": { difficulty: 30, studyTime: 15, examFreq: 50, why: "IPv6 format is fundamentally different from IPv4. You must read and write IPv6 addresses fluently.", ciscoIntent: "Describe the IPv6 address format", cheatSheet: [{ heading: "IPv6 Format", items: ["128 bits total (vs IPv4's 32 bits)", "Written as 8 groups of 4 hexadecimal digits, separated by colons", "Example: 2001:0DB8:0000:0000:0000:0000:0000:0001", "Each hex digit = 4 bits, each group = 16 bits", "Hex characters: 0-9 and A-F (case insensitive)", "Total address space: 2^128 (340 undecillion addresses)"]}], prereqs: [{ name: "IPv4 addressing", obj: "1.6" }], resources: [], labs: [], vocab: [{ term: "IPv6 format", q: "How many bits is an IPv6 address?", options: ["32 bits", "64 bits", "128 bits", "256 bits"], answer: 2, explain: "IPv6 uses 128 bits -- four times the size of IPv4's 32 bits." }] },
  "1.8.b": { difficulty: 30, studyTime: 15, examFreq: 55, why: "Cisco tests whether you can shorten and expand IPv6 addresses. Know both rules and their limitations.", ciscoIntent: "Apply IPv6 shortening rules to compress and expand addresses", cheatSheet: [{ heading: "IPv6 Shortening Rules", items: ["Rule 1: Drop leading zeros in each group (0DB8 -> DB8, 0000 -> 0)", "Rule 2: Replace ONE consecutive group of all-zero groups with :: (double colon)", ":: can only be used ONCE per address (otherwise ambiguous)", "Example: 2001:0DB8:0000:0000:0000:0000:0000:0001 -> 2001:DB8::1", "To expand: count groups present, fill :: with enough 0000 groups to total 8", "Trap: FE80:0000:0000:0001:0000:0000:0000:0001 -- :: replaces the LONGEST run of zeros"]}], prereqs: [{ name: "IPv6 format", obj: "1.8.a" }], resources: [], labs: [], vocab: [{ term: "IPv6 shortening", q: "How many times can :: appear in a single IPv6 address?", options: ["Unlimited", "Twice", "Once", "Three times"], answer: 2, explain: "Double colon (::) can only appear once. Using it twice would make the address ambiguous -- you wouldn't know how many groups each :: replaces." }] },
  "1.8.c": { difficulty: 25, studyTime: 10, examFreq: 45, why: "Common prefix lengths (/64, /48, /128) define how IPv6 networks are allocated. Know the standard assignments.", ciscoIntent: "Identify common IPv6 prefix lengths and their uses", cheatSheet: [{ heading: "IPv6 Prefix Lengths", items: ["/128 = host route (single address, like IPv4 /32)", "/64 = standard LAN subnet (required for SLAAC to work)", "/48 = typical site allocation from ISP (65,536 subnets of /64)", "/32 = ISP allocation from RIR", "Interface ID = last 64 bits (host portion on a /64 network)", "Unlike IPv4, you never vary LAN subnets from /64 -- it's the universal standard"]}], prereqs: [{ name: "IPv6 format", obj: "1.8.a" }], resources: [], labs: [], vocab: [{ term: "IPv6 /64", q: "Why is /64 the standard prefix for IPv6 LAN subnets?", options: ["It's the smallest possible subnet", "SLAAC requires a 64-bit interface ID to generate addresses", "IPv6 doesn't support other prefix lengths", "It matches IPv4's /24"], answer: 1, explain: "SLAAC auto-generates the host portion (interface ID) from the MAC address, which needs exactly 64 bits." }] },
  "1.8.d": { difficulty: 40, studyTime: 20, examFreq: 50, why: "SLAAC is how most IPv6 hosts auto-configure without DHCP. Know the process and EUI-64.", ciscoIntent: "Describe how SLAAC auto-generates IPv6 addresses", cheatSheet: [{ heading: "SLAAC", items: ["Stateless Address Autoconfiguration -- no DHCP server needed for addressing", "Host sends Router Solicitation (RS) to FF02::2 (all routers)", "Router replies with Router Advertisement (RA) containing prefix and prefix length", "Host combines RA prefix + self-generated interface ID to form full address", "Interface ID methods: EUI-64 (from MAC) or random/privacy extensions", "RA flags: A=1 (use SLAAC), O=0 (no other info from DHCPv6), M=0 (no managed addresses)"]}], prereqs: [{ name: "IPv6 prefix", obj: "1.8.c" }, { name: "NDP", obj: "1.8.g" }], resources: [], labs: [], vocab: [{ term: "SLAAC", q: "What does a host need from a Router Advertisement to perform SLAAC?", options: ["Full IPv6 address", "Prefix and prefix length", "DNS server address", "MAC address of the router"], answer: 1, explain: "SLAAC only needs the network prefix from the RA. The host generates its own interface ID." }] },
  "1.8.e": { difficulty: 35, studyTime: 15, examFreq: 40, why: "Stateless DHCPv6 combines SLAAC for addressing with DHCPv6 for additional info like DNS.", ciscoIntent: "Describe stateless DHCPv6 and when it is used", cheatSheet: [{ heading: "Stateless DHCPv6", items: ["SLAAC provides the IPv6 address (prefix + interface ID)", "DHCPv6 provides additional info: DNS server, domain name", "DHCPv6 does NOT track address assignments (stateless)", "RA flags: A=1 (SLAAC for address), O=1 (Other info from DHCPv6), M=0", "Host process: RS -> RA (get prefix) -> DHCPv6 (get DNS) -> done", "Most common enterprise deployment model"]}], prereqs: [{ name: "SLAAC", obj: "1.8.d" }], resources: [], labs: [], vocab: [{ term: "Stateless DHCPv6", q: "In stateless DHCPv6, what does the DHCPv6 server provide?", options: ["IPv6 address", "Prefix and gateway", "Additional info like DNS server, not the address", "Nothing -- SLAAC handles everything"], answer: 2, explain: "Stateless DHCPv6 supplements SLAAC. SLAAC provides the address; DHCPv6 provides DNS, domain name, and other options." }] },
  "1.8.f": { difficulty: 35, studyTime: 15, examFreq: 40, why: "Stateful DHCPv6 works like IPv4 DHCP -- full address assignment. Know when to use it vs SLAAC.", ciscoIntent: "Describe stateful DHCPv6 for full address management", cheatSheet: [{ heading: "Stateful DHCPv6", items: ["DHCPv6 server assigns the full IPv6 address (like IPv4 DHCP)", "Server tracks all assigned addresses (stateful)", "RA flags: M=1 (Managed -- get address from DHCPv6), A=0 (don't use SLAAC for address)", "Used when admin needs full control over address assignments", "Also provides DNS, domain name, and other options", "Default gateway still learned from Router Advertisement (not from DHCPv6)"]}], prereqs: [{ name: "Stateless DHCPv6", obj: "1.8.e" }], resources: [], labs: [], vocab: [{ term: "Stateful DHCPv6", q: "How does a host learn its default gateway in stateful DHCPv6?", options: ["From the DHCPv6 server", "From the Router Advertisement (RA)", "It doesn't -- manual config required", "From DNS"], answer: 1, explain: "Even with stateful DHCPv6, the default gateway comes from the Router Advertisement. DHCPv6 does not carry gateway info." }] },
  "1.8.g": { difficulty: 40, studyTime: 20, examFreq: 50, why: "NDP replaces ARP in IPv6. Know the four message types and their functions.", ciscoIntent: "Describe NDP message types and how they replace ARP", cheatSheet: [{ heading: "NDP (Neighbor Discovery Protocol)", items: ["RS (Router Solicitation) -- host asks 'any routers here?' -> sent to FF02::2", "RA (Router Advertisement) -- router replies with prefix, flags, default gateway", "NS (Neighbor Solicitation) -- 'what MAC address has this IPv6?' (replaces ARP request)", "NA (Neighbor Advertisement) -- reply with MAC address (replaces ARP reply)", "NDP uses ICMPv6 (not a separate protocol)", "DAD (Duplicate Address Detection) -- host sends NS for its own address to check uniqueness"]}], prereqs: [{ name: "IPv6 format", obj: "1.8.a" }], resources: [], labs: [], vocab: [{ term: "NDP", q: "Which NDP message replaces ARP in IPv6?", options: ["Router Solicitation (RS)", "Router Advertisement (RA)", "Neighbor Solicitation (NS)", "Redirect"], answer: 2, explain: "Neighbor Solicitation (NS) asks 'who has this IPv6 address?' -- equivalent to an ARP request. The reply is a Neighbor Advertisement (NA)." }] },
  "1.8.h": { difficulty: 30, studyTime: 15, examFreq: 50, why: "You must know the IOS commands to configure IPv6 on a router interface. Simlet questions test this directly.", ciscoIntent: "Configure IPv6 addressing on router interfaces", cheatSheet: [{ heading: "IPv6 Configuration", items: ["<code>ipv6 unicast-routing</code> -- REQUIRED globally to enable IPv6 routing (off by default)", "<code>interface gi0/0</code> -> <code>ipv6 address 2001:DB8:1::1/64</code> -- assign global unicast", "<code>ipv6 address FE80::1 link-local</code> -- manually set link-local address", "<code>ipv6 enable</code> -- enables IPv6 on interface and auto-generates link-local (no global address)", "<code>ipv6 address autoconfig</code> -- use SLAAC to get address from upstream router", "Verify: <code>show ipv6 interface brief</code>, <code>show ipv6 route</code>", "A link-local address (FE80::) is auto-created on any IPv6-enabled interface"]}], prereqs: [{ name: "IPv6 format", obj: "1.8.a" }, { name: "SLAAC", obj: "1.8.d" }], resources: [], labs: [{ name: "Configure IPv6", desc: "Enable IPv6 routing, assign addresses, verify with show commands and ping6" }], vocab: [{ term: "ipv6 unicast-routing", q: "What happens if you configure IPv6 addresses but forget 'ipv6 unicast-routing'?", options: ["Addresses are rejected", "Interfaces go down", "Router can receive IPv6 but won't route between interfaces", "Nothing -- it's optional"], answer: 2, explain: "Without 'ipv6 unicast-routing', the router acts as an IPv6 host -- it processes IPv6 for itself but won't forward between interfaces." }] },

  // ── 1.10 Client OS IP Verification ──────────────────────────────────
  "1.10.a": { difficulty: 15, studyTime: 10, examFreq: 45, why: "Windows ipconfig commands appear on almost every CCNA exam. Know the exact switches.", ciscoIntent: "Use Windows commands to verify IP configuration", cheatSheet: [{ heading: "Windows IP Commands", items: ["<code>ipconfig</code> -- shows IP, mask, and gateway per adapter", "<code>ipconfig /all</code> -- adds MAC, DHCP server, DNS servers, lease info", "<code>ipconfig /release</code> -- releases current DHCP lease", "<code>ipconfig /renew</code> -- requests new DHCP lease", "<code>ipconfig /flushdns</code> -- clears local DNS cache", "<code>ipconfig /displaydns</code> -- shows cached DNS entries"]}], prereqs: [{ name: "IPv4 addressing", obj: "1.6" }], resources: [], labs: [], vocab: [{ term: "ipconfig /all", q: "Which Windows command shows the DHCP server address and lease expiration?", options: ["ipconfig", "ipconfig /all", "ipconfig /renew", "netstat"], answer: 1, explain: "ipconfig /all shows extended info: DHCP server, DNS servers, MAC address, and lease times. Plain ipconfig only shows IP/mask/gateway." }] },
  "1.10.b": { difficulty: 20, studyTime: 10, examFreq: 35, why: "Linux networking commands are tested lightly but do appear. Know the modern equivalents.", ciscoIntent: "Use Linux commands to verify IP parameters", cheatSheet: [{ heading: "Linux IP Commands", items: ["<code>ip addr</code> (or <code>ip a</code>) -- show IP addresses on all interfaces (modern)", "<code>ip route</code> (or <code>ip r</code>) -- show routing table / default gateway", "<code>ifconfig</code> -- legacy, shows IP/mask/MAC (deprecated, use ip addr)", "<code>ss -tuln</code> -- show listening ports (replaced netstat)", "<code>nmcli device show</code> -- NetworkManager info (DNS, gateway, DHCP)", "<code>cat /etc/resolv.conf</code> -- shows configured DNS servers"]}], prereqs: [{ name: "IPv4 addressing", obj: "1.6" }], resources: [], labs: [], vocab: [{ term: "ip addr", q: "What is the modern Linux replacement for ifconfig?", options: ["netstat", "ip addr", "nmcli", "route"], answer: 1, explain: "ip addr (part of the iproute2 package) replaces the deprecated ifconfig for viewing interface addresses." }] },
  "1.10.c": { difficulty: 15, studyTime: 10, examFreq: 30, why: "macOS commands are tested rarely but may appear. The key commands mirror Linux/BSD.", ciscoIntent: "Use macOS commands to verify IP parameters", cheatSheet: [{ heading: "macOS IP Commands", items: ["<code>ifconfig</code> -- shows IP, mask, MAC per interface (macOS still uses ifconfig)", "<code>networksetup -getinfo 'Wi-Fi'</code> -- shows IP, subnet, router, DNS for named service", "<code>networksetup -listallnetworkservices</code> -- list available network services", "System Preferences > Network -- GUI for IP, DNS, gateway, DHCP", "<code>scutil --dns</code> -- show DNS configuration", "<code>route -n get default</code> -- show default gateway"]}], prereqs: [{ name: "IPv4 addressing", obj: "1.6" }], resources: [], labs: [], vocab: [{ term: "macOS networking", q: "Which macOS command shows IP configuration for a specific network service?", options: ["ipconfig /all", "ifconfig -a", "networksetup -getinfo [service]", "ip addr"], answer: 2, explain: "networksetup -getinfo 'Wi-Fi' shows IP, mask, router, and DNS for the specified macOS network service." }] },
  "1.10.d": { difficulty: 20, studyTime: 10, examFreq: 50, why: "Knowing WHAT to verify (gateway, mask, DNS, DHCP) is as important as knowing the commands.", ciscoIntent: "Verify the essential IP parameters on any client OS", cheatSheet: [{ heading: "Key Parameters to Verify", items: ["Default gateway -- must be on the same subnet as the host", "Subnet mask -- must match other devices on the segment", "DNS server -- incorrect DNS = name resolution fails but pinging IPs still works", "DHCP lease info -- shows server address, lease start/expiration", "If gateway is missing or wrong: host can reach local subnet only, not remote networks", "If DNS is wrong: ping by IP works but ping by name fails"]}], prereqs: [{ name: "IPv4 addressing", obj: "1.6" }], resources: [], labs: [], vocab: [{ term: "DNS verification", q: "A user can ping 8.8.8.8 but not google.com. What is most likely misconfigured?", options: ["Default gateway", "Subnet mask", "DNS server", "DHCP lease"], answer: 2, explain: "Ping by IP works (Layer 3 is fine) but name resolution fails -- this is a DNS configuration issue." }] },
  "1.10.e": { difficulty: 20, studyTime: 15, examFreq: 50, why: "ping, traceroute, and nslookup are the three essential troubleshooting tools across all operating systems.", ciscoIntent: "Use ping, traceroute, and DNS tools to troubleshoot connectivity", cheatSheet: [{ heading: "Troubleshooting Tools", items: ["<code>ping [IP]</code> -- tests Layer 3 reachability (ICMP echo request/reply)", "<code>traceroute [IP]</code> (Linux/Mac) / <code>tracert [IP]</code> (Windows) -- shows each hop in the path", "traceroute uses incrementing TTL; each router returns ICMP Time Exceeded", "<code>nslookup [hostname]</code> -- queries DNS for IP address resolution (all OSes)", "<code>dig [hostname]</code> -- detailed DNS query (Linux/Mac, more info than nslookup)", "Troubleshooting order: ping loopback -> ping self -> ping gateway -> ping remote -> nslookup"]}], prereqs: [{ name: "DNS/DHCP verification", obj: "1.10.d" }], resources: [], labs: [{ name: "Troubleshooting walkthrough", desc: "Given a broken network, use ping/traceroute/nslookup to find the fault" }], vocab: [{ term: "traceroute", q: "How does traceroute discover each hop in the path?", options: ["Sends to each router directly", "Uses incrementing TTL values -- each router returns ICMP Time Exceeded", "Reads the routing table", "Uses SNMP queries"], answer: 1, explain: "traceroute sends packets with TTL=1, 2, 3, etc. Each hop decrements TTL to 0 and responds with ICMP Time Exceeded, revealing itself." }] },

  // ── 1.12 Virtualization Fundamentals ─────────────────────────────────
  "1.12.a": { difficulty: 25, studyTime: 15, examFreq: 40, why: "Type 1 hypervisors run directly on hardware and are used in data centers. Know the examples.", ciscoIntent: "Describe Type 1 (bare-metal) hypervisors", cheatSheet: [{ heading: "Type 1 Hypervisor", items: ["Runs directly on hardware -- no host OS underneath", "Also called bare-metal hypervisor", "Examples: VMware ESXi, Microsoft Hyper-V (Server), KVM", "Better performance and security than Type 2", "Used in data centers and enterprise server virtualization", "Manages hardware resources directly and distributes to VMs"]}], prereqs: [{ name: "Server fundamentals", obj: "1.1.g" }], resources: [], labs: [], vocab: [{ term: "Type 1 hypervisor", q: "What distinguishes a Type 1 hypervisor from Type 2?", options: ["Type 1 is free", "Type 1 runs directly on hardware without a host OS", "Type 1 is slower", "Type 1 only supports Linux"], answer: 1, explain: "Type 1 (bare-metal) runs on the physical hardware directly. No host OS sits between it and the hardware, giving better performance." }] },
  "1.12.b": { difficulty: 25, studyTime: 10, examFreq: 35, why: "Type 2 hypervisors run on top of an existing OS. Know the difference from Type 1.", ciscoIntent: "Describe Type 2 (hosted) hypervisors", cheatSheet: [{ heading: "Type 2 Hypervisor", items: ["Runs on top of a host operating system (Windows, macOS, Linux)", "Also called hosted hypervisor", "Examples: VMware Workstation, Oracle VirtualBox, Parallels", "More overhead -- VM traffic goes through host OS kernel", "Used for development, testing, and lab environments", "Easier to set up -- just install like any other application"]}], prereqs: [{ name: "Type 1 hypervisor", obj: "1.12.a" }], resources: [], labs: [], vocab: [{ term: "Type 2 hypervisor", q: "Which is a Type 2 hypervisor?", options: ["VMware ESXi", "KVM", "Oracle VirtualBox", "Microsoft Hyper-V Server"], answer: 2, explain: "VirtualBox is a Type 2 (hosted) hypervisor -- it runs as an application on top of an existing OS." }] },
  "1.12.c": { difficulty: 25, studyTime: 15, examFreq: 40, why: "VMs provide full OS isolation. Know how they differ from containers.", ciscoIntent: "Describe virtual machines and their isolation characteristics", cheatSheet: [{ heading: "Virtual Machines", items: ["Each VM runs its own full operating system on virtualized hardware", "Hardware-level isolation -- VMs cannot see each other's memory or processes", "Each VM has virtual CPU, RAM, disk, and NIC", "Heavier than containers -- each VM includes an entire OS", "VM images (snapshots) can be cloned, migrated, or backed up", "vSwitch (virtual switch) connects VMs within the same hypervisor"]}], prereqs: [{ name: "Hypervisors", obj: "1.12.a" }], resources: [], labs: [], vocab: [{ term: "VM isolation", q: "What level of isolation do virtual machines provide?", options: ["Application-level only", "Hardware-level -- each VM has its own OS and virtualized hardware", "Network-level only", "No isolation -- they share everything"], answer: 1, explain: "VMs provide full hardware-level isolation. Each has its own OS, virtual CPU, memory, and disk." }] },
  "1.12.d": { difficulty: 30, studyTime: 15, examFreq: 40, why: "Containers are lighter than VMs and share the host kernel. Know the trade-offs.", ciscoIntent: "Describe containers and how they differ from VMs", cheatSheet: [{ heading: "Containers", items: ["Share the host OS kernel -- no separate OS per container", "Much lighter and faster to start than VMs (seconds vs minutes)", "Process-level isolation (not hardware-level like VMs)", "Example: Docker containers, Kubernetes orchestration", "Ideal for microservices architecture -- one service per container", "Less isolation than VMs -- a kernel exploit could affect all containers", "Use less disk/RAM since no duplicate OS"]}], prereqs: [{ name: "Virtual machines", obj: "1.12.c" }], resources: [], labs: [], vocab: [{ term: "Containers", q: "How do containers differ from virtual machines?", options: ["Containers include their own OS", "Containers share the host kernel and are lighter/faster", "Containers provide better isolation", "Containers require Type 1 hypervisors"], answer: 1, explain: "Containers share the host kernel, making them much lighter and faster to start. VMs each run a full OS." }] },
  "1.12.e": { difficulty: 35, studyTime: 20, examFreq: 45, why: "VRF segments routing tables on a single router -- critical for understanding multi-tenant networks.", ciscoIntent: "Describe VRF and its purpose in routing table isolation", cheatSheet: [{ heading: "VRF (Virtual Routing and Forwarding)", items: ["Creates multiple independent routing tables on one physical router", "Each VRF is like a separate virtual router", "Traffic in one VRF cannot reach another VRF without explicit routing/leaking", "Use cases: multi-tenant environments, traffic segmentation, ISP customer isolation", "Each interface is assigned to a VRF: <code>ip vrf forwarding [name]</code>", "Verify: <code>show ip route vrf [name]</code>", "VRF + MPLS = full VPN service (VRF-Lite = VRF without MPLS)"]}], prereqs: [{ name: "Routing basics", obj: "1.1.a" }], resources: [], labs: [{ name: "VRF-Lite lab", desc: "Create two VRFs on one router, assign interfaces, verify routing isolation" }], vocab: [{ term: "VRF", q: "What does VRF provide on a router?", options: ["Faster routing", "Multiple independent routing tables on one physical device", "Encryption for all traffic", "Automatic failover"], answer: 1, explain: "VRF creates separate routing tables, so traffic in one VRF is isolated from others -- like having multiple virtual routers." }] },
  "1.12.f": { difficulty: 30, studyTime: 15, examFreq: 40, why: "VRF-Lite is VRF without MPLS. Know when campus networks use it for segmentation.", ciscoIntent: "Describe VRF-Lite for campus network segmentation", cheatSheet: [{ heading: "VRF-Lite", items: ["VRF without MPLS -- simpler deployment for campus/enterprise", "Used to separate guest, corporate, and IoT traffic on shared infrastructure", "Each VRF needs its own interfaces or subinterfaces between routers", "No MP-BGP or label switching required", "Inter-VRF routing requires route leaking or a shared services VRF", "Common in campus designs: corporate VRF, guest VRF, management VRF"]}], prereqs: [{ name: "VRF", obj: "1.12.e" }], resources: [], labs: [], vocab: [{ term: "VRF-Lite", q: "How does VRF-Lite differ from full VRF/MPLS?", options: ["VRF-Lite uses MPLS labels", "VRF-Lite has no MPLS -- each VRF needs its own link between routers", "VRF-Lite is more scalable", "No difference"], answer: 1, explain: "VRF-Lite doesn't use MPLS labels, so each VRF requires a separate interface or subinterface between devices. Simpler but less scalable." }] },

  // ── Domain 2 NEW entries ──

  // ── 2.3 CDP and LLDP ────────────────────────────────────────────────
  "2.3.a": { difficulty: 20, studyTime: 10, examFreq: 45, why: "CDP is Cisco's built-in discovery tool and it's ON by default. Know what it reveals and the security risk.", ciscoIntent: "Describe CDP as a Cisco proprietary Layer 2 discovery protocol", cheatSheet: [{ heading: "CDP Overview", items: ["Cisco Discovery Protocol -- Cisco proprietary, Layer 2", "Enabled by default on all Cisco devices", "Sends advertisements every 60 seconds (default), holdtime 180 seconds", "Reveals: hostname, IP address, platform/model, port ID, IOS version, VTP domain", "Works between directly connected Cisco devices only (not through routers)", "Security risk: exposes device info to anyone on the link"]}], prereqs: [{ name: "Switching concepts", obj: "1.13" }], resources: [], labs: [], vocab: [{ term: "CDP", q: "How often does CDP send advertisements by default?", options: ["30 seconds", "60 seconds", "90 seconds", "120 seconds"], answer: 1, explain: "CDP sends updates every 60 seconds by default with a 180-second holdtime." }] },
  "2.3.b": { difficulty: 25, studyTime: 15, examFreq: 50, why: "These CDP show commands are used to discover and document network topology without a diagram.", ciscoIntent: "Use CDP show commands to discover neighbors", cheatSheet: [{ heading: "CDP Show Commands", items: ["<code>show cdp neighbors</code> -- summary: device ID, local/remote port, platform, capability", "<code>show cdp neighbors detail</code> -- adds: IP address, IOS version, VTP domain, native VLAN", "<code>show cdp entry *</code> -- same as neighbors detail (all entries)", "<code>show cdp entry [device-name]</code> -- detail for one specific neighbor", "<code>show cdp</code> -- global CDP status (timer, holdtime, version)", "<code>show cdp interface</code> -- which interfaces have CDP enabled"]}], prereqs: [{ name: "CDP overview", obj: "2.3.a" }], resources: [], labs: [{ name: "CDP topology discovery", desc: "Use show cdp neighbors to map a network topology without a diagram" }], vocab: [{ term: "show cdp neighbors", q: "What additional info does 'show cdp neighbors detail' provide over 'show cdp neighbors'?", options: ["Only port IDs", "IP address, IOS version, VTP domain, native VLAN", "Routing table", "Spanning tree info"], answer: 1, explain: "The detail version adds management IP, software version, VTP domain, and native VLAN to the basic neighbor table." }] },
  "2.3.c": { difficulty: 20, studyTime: 10, examFreq: 45, why: "Knowing how to enable and disable CDP globally and per-interface is a common simlet task.", ciscoIntent: "Enable and disable CDP at global and interface levels", cheatSheet: [{ heading: "CDP Enable/Disable", items: ["Global enable: <code>cdp run</code> (default -- already on)", "Global disable: <code>no cdp run</code> (disables on ALL interfaces)", "Per-interface enable: <code>cdp enable</code>", "Per-interface disable: <code>no cdp enable</code>", "Best practice: disable CDP on external-facing interfaces (to ISP, untrusted)", "Global must be on for per-interface to work"]}], prereqs: [{ name: "CDP commands", obj: "2.3.b" }], resources: [], labs: [], vocab: [{ term: "CDP disable", q: "How do you disable CDP on a single interface without affecting other interfaces?", options: ["no cdp run", "no cdp enable (on the interface)", "shutdown the interface", "no cdp advertise"], answer: 1, explain: "'no cdp enable' disables CDP on that specific interface. 'no cdp run' would disable it globally on all interfaces." }] },
  "2.3.d": { difficulty: 25, studyTime: 10, examFreq: 45, why: "LLDP is the vendor-neutral alternative to CDP. Key difference: it's OFF by default on Cisco.", ciscoIntent: "Describe LLDP as an IEEE standard discovery protocol", cheatSheet: [{ heading: "LLDP Overview", items: ["Link Layer Discovery Protocol -- IEEE 802.1AB, vendor-neutral", "Disabled by default on Cisco devices (must be explicitly enabled)", "Works across multi-vendor environments (Cisco + Juniper + Arista, etc.)", "Sends advertisements every 30 seconds (default), holdtime 120 seconds", "Reveals: system name, system description, port ID, management address, capabilities", "Uses Ethernet multicast 01:80:C2:00:00:0E"]}], prereqs: [{ name: "CDP overview", obj: "2.3.a" }], resources: [], labs: [], vocab: [{ term: "LLDP", q: "What is the key difference between LLDP and CDP on Cisco devices?", options: ["LLDP only works on routers", "LLDP is disabled by default; CDP is enabled by default", "LLDP is faster", "LLDP reveals less information"], answer: 1, explain: "CDP is on by default (Cisco proprietary). LLDP (IEEE 802.1AB) must be manually enabled on Cisco devices." }] },
  "2.3.e": { difficulty: 20, studyTime: 10, examFreq: 40, why: "LLDP show commands mirror CDP but with different syntax. Know the parallels.", ciscoIntent: "Use LLDP show commands to discover neighbors", cheatSheet: [{ heading: "LLDP Show Commands", items: ["<code>show lldp neighbors</code> -- summary: device ID, local/remote port, capability", "<code>show lldp neighbors detail</code> -- adds: management address, system description", "<code>show lldp</code> -- global LLDP status (timer, holdtime, enabled/disabled)", "<code>show lldp interface</code> -- which interfaces have LLDP transmit/receive enabled", "Output format similar to CDP but may show less vendor-specific detail"]}], prereqs: [{ name: "LLDP overview", obj: "2.3.d" }], resources: [], labs: [], vocab: [{ term: "show lldp neighbors", q: "Which command shows LLDP neighbor details including management IP?", options: ["show lldp", "show lldp neighbors", "show lldp neighbors detail", "show lldp interface"], answer: 2, explain: "show lldp neighbors detail provides the full info including management address, just like show cdp neighbors detail for CDP." }] },
  "2.3.f": { difficulty: 25, studyTime: 10, examFreq: 40, why: "LLDP enable/disable works differently than CDP -- transmit and receive are controlled separately per interface.", ciscoIntent: "Enable and disable LLDP at global and interface levels", cheatSheet: [{ heading: "LLDP Enable/Disable", items: ["Global enable: <code>lldp run</code> (required first -- off by default)", "Global disable: <code>no lldp run</code>", "Per-interface transmit: <code>lldp transmit</code> / <code>no lldp transmit</code>", "Per-interface receive: <code>lldp receive</code> / <code>no lldp receive</code>", "Unlike CDP, LLDP separates TX and RX control per interface", "Can receive neighbor info without advertising your own device"]}], prereqs: [{ name: "LLDP commands", obj: "2.3.e" }], resources: [], labs: [], vocab: [{ term: "LLDP interface control", q: "How does per-interface LLDP control differ from CDP?", options: ["No difference", "LLDP separates transmit and receive; CDP uses a single enable/disable", "CDP separates TX/RX; LLDP doesn't", "LLDP only works globally"], answer: 1, explain: "LLDP lets you independently control transmit and receive per interface. CDP has a single 'cdp enable' toggle." }] },
  "2.3.g": { difficulty: 20, studyTime: 10, examFreq: 50, why: "CDP vs LLDP comparison is a direct exam question. Know the key differences at a glance.", ciscoIntent: "Compare CDP and LLDP features side by side", cheatSheet: [{ heading: "CDP vs LLDP Comparison", items: ["CDP: Cisco proprietary | LLDP: IEEE 802.1AB (open standard)", "CDP: enabled by default | LLDP: disabled by default on Cisco", "CDP: 60s timer, 180s holdtime | LLDP: 30s timer, 120s holdtime", "CDP: single enable/disable per interface | LLDP: separate TX and RX per interface", "Both: Layer 2, directly connected neighbors only, reveal device info", "Both: should be disabled on untrusted/external-facing interfaces for security"]}], prereqs: [{ name: "CDP", obj: "2.3.a" }, { name: "LLDP", obj: "2.3.d" }], resources: [], labs: [], vocab: [{ term: "CDP vs LLDP", q: "In a multi-vendor environment, which discovery protocol should you use?", options: ["CDP -- it's more reliable", "LLDP -- it's the IEEE standard that works across all vendors", "Neither -- disable both", "It doesn't matter"], answer: 1, explain: "LLDP (802.1AB) is vendor-neutral and works across Cisco, Juniper, Arista, and other vendors. CDP is Cisco-only." }] },

  // ── 2.4 EtherChannel (LACP) ─────────────────────────────────────────
  "2.4.a": { difficulty: 35, studyTime: 15, examFreq: 55, why: "EtherChannel is the foundation for link aggregation questions. Know what it does and its limits.", ciscoIntent: "Describe the purpose and benefits of EtherChannel", cheatSheet: [{ heading: "EtherChannel Overview", items: ["Bundles 2-8 parallel physical links into one logical channel", "Benefits: increased bandwidth + link redundancy", "STP sees one logical link -- no blocked ports", "Traffic is load-balanced across member links (hash-based)", "If one link fails, traffic redistributes to remaining links", "All member ports must have identical config (speed, duplex, VLAN, trunk mode)"]}], prereqs: [{ name: "Switching concepts", obj: "1.13" }, { name: "Trunking", obj: "2.2" }], resources: [], labs: [], vocab: [{ term: "EtherChannel", q: "What is the maximum number of physical links in one EtherChannel?", options: ["2", "4", "8", "16"], answer: 2, explain: "EtherChannel supports up to 8 active physical links in one logical bundle." }] },
  "2.4.b": { difficulty: 40, studyTime: 20, examFreq: 60, why: "LACP is the standard negotiation protocol. Know active and passive modes cold.", ciscoIntent: "Configure LACP EtherChannel with correct mode combinations", cheatSheet: [{ heading: "LACP (802.3ad)", items: ["IEEE 802.3ad -- open standard for EtherChannel negotiation", "Active mode: actively initiates LACP negotiation", "Passive mode: only responds to LACP requests (never initiates)", "Valid combinations: active/active or active/passive", "Invalid: passive/passive (neither initiates -- no channel forms)", "Config: <code>channel-group 1 mode active</code> or <code>channel-group 1 mode passive</code>", "LACP system priority: lower value = higher priority (default 32768)"]}], prereqs: [{ name: "EtherChannel basics", obj: "2.4.a" }], resources: [], labs: [{ name: "LACP EtherChannel", desc: "Configure LACP active/passive between two switches, verify formation" }], vocab: [{ term: "LACP modes", q: "Which LACP mode combination will NOT form an EtherChannel?", options: ["active/active", "active/passive", "passive/passive", "Both A and B will form"], answer: 2, explain: "passive/passive will not form a channel because neither side initiates negotiation." }] },
  "2.4.c": { difficulty: 35, studyTime: 15, examFreq: 45, why: "PAgP is Cisco's proprietary alternative to LACP. Know the modes and that it's Cisco-only.", ciscoIntent: "Describe PAgP as Cisco's proprietary EtherChannel protocol", cheatSheet: [{ heading: "PAgP (Port Aggregation Protocol)", items: ["Cisco proprietary EtherChannel negotiation protocol", "Desirable mode: actively initiates PAgP negotiation", "Auto mode: only responds to PAgP requests (never initiates)", "Valid: desirable/desirable or desirable/auto", "Invalid: auto/auto (neither initiates)", "Cannot mix PAgP and LACP -- both sides must use the same protocol", "Config: <code>channel-group 1 mode desirable</code> or <code>channel-group 1 mode auto</code>"]}], prereqs: [{ name: "EtherChannel basics", obj: "2.4.a" }], resources: [], labs: [], vocab: [{ term: "PAgP", q: "Which PAgP mode actively initiates negotiation?", options: ["auto", "desirable", "passive", "active"], answer: 1, explain: "In PAgP, 'desirable' is the active initiator. 'auto' only responds. Don't confuse with LACP's 'active/passive' terminology." }] },
  "2.4.d": { difficulty: 30, studyTime: 10, examFreq: 40, why: "Static EtherChannel (mode on) uses no negotiation. Know the risks.", ciscoIntent: "Describe static EtherChannel without negotiation", cheatSheet: [{ heading: "Static (Mode On)", items: ["No negotiation protocol (no LACP, no PAgP)", "Both sides MUST be set to <code>mode on</code>", "Config: <code>channel-group 1 mode on</code>", "Risk: no negotiation means no mismatch detection -- if config differs, loops can occur", "Cannot pair 'on' with active/passive/desirable/auto -- will not form channel", "Use case: when negotiation overhead is unwanted or devices don't support LACP/PAgP"]}], prereqs: [{ name: "EtherChannel basics", obj: "2.4.a" }], resources: [], labs: [], vocab: [{ term: "Mode on", q: "What happens if one side is 'mode on' and the other is 'mode active'?", options: ["EtherChannel forms using LACP", "EtherChannel forms without negotiation", "EtherChannel does NOT form", "Both sides fall back to individual links"], answer: 2, explain: "'mode on' is incompatible with any negotiation mode. Both sides must be 'on' for static EtherChannel." }] },
  "2.4.e": { difficulty: 35, studyTime: 15, examFreq: 55, why: "The negotiation matrix is a direct exam question. Know which combinations work and which don't.", ciscoIntent: "Identify valid and invalid EtherChannel negotiation combinations", cheatSheet: [{ heading: "Negotiation Matrix", items: ["LACP: active + active = YES", "LACP: active + passive = YES", "LACP: passive + passive = NO (neither initiates)", "PAgP: desirable + desirable = YES", "PAgP: desirable + auto = YES", "PAgP: auto + auto = NO (neither initiates)", "Static: on + on = YES (no negotiation)", "on + active/passive/desirable/auto = NO (incompatible)"]}], prereqs: [{ name: "LACP", obj: "2.4.b" }, { name: "PAgP", obj: "2.4.c" }], resources: [], labs: [], vocab: [{ term: "Negotiation matrix", q: "Which combination forms an EtherChannel?", options: ["LACP passive + PAgP desirable", "LACP active + LACP passive", "PAgP auto + PAgP auto", "mode on + LACP active"], answer: 1, explain: "LACP active + passive works. You cannot mix LACP and PAgP. auto+auto and on+active don't form." }] },
  "2.4.f": { difficulty: 40, studyTime: 20, examFreq: 50, why: "Layer 2 EtherChannel is configured on switchport interfaces. Know the interface configuration.", ciscoIntent: "Configure Layer 2 EtherChannel on switch ports", cheatSheet: [{ heading: "Layer 2 EtherChannel", items: ["Member interfaces must be in switchport mode (access or trunk)", "Config on physical interfaces: <code>channel-group 1 mode active</code>", "Port-channel interface inherits switchport config from members", "Or configure port-channel directly: <code>interface port-channel 1</code> -> <code>switchport mode trunk</code>", "Best practice: configure port-channel interface first, then add members", "All members must match: speed, duplex, VLAN, trunk allowed VLANs, native VLAN"]}], prereqs: [{ name: "LACP", obj: "2.4.b" }, { name: "Trunking", obj: "2.2" }], resources: [], labs: [{ name: "L2 EtherChannel trunk", desc: "Bundle 2 trunk links using LACP, verify with show etherchannel summary" }], vocab: [{ term: "L2 EtherChannel", q: "What mode must member interfaces be in for Layer 2 EtherChannel?", options: ["Routed (no switchport)", "Switchport mode (access or trunk)", "Monitor mode", "Any mode"], answer: 1, explain: "Layer 2 EtherChannel requires all member ports to be in switchport mode (access or trunk)." }] },
  "2.4.g": { difficulty: 45, studyTime: 20, examFreq: 45, why: "Layer 3 EtherChannel uses routed ports with an IP on the port-channel. Know the 'no switchport' requirement.", ciscoIntent: "Configure Layer 3 EtherChannel with a routed port-channel", cheatSheet: [{ heading: "Layer 3 EtherChannel", items: ["Member interfaces: <code>no switchport</code> (routed mode)", "Physical interfaces: <code>no switchport</code> -> <code>channel-group 1 mode active</code>", "IP address assigned to port-channel: <code>interface port-channel 1</code> -> <code>ip address 10.1.1.1 255.255.255.0</code>", "Do NOT assign IPs to physical member interfaces", "Used between L3 switches or routers for high-bandwidth routed links", "Verify: <code>show etherchannel summary</code> -- look for 'RU' (routed, in use)"]}], prereqs: [{ name: "L2 EtherChannel", obj: "2.4.f" }, { name: "L3 switches", obj: "1.1.b" }], resources: [], labs: [], vocab: [{ term: "L3 EtherChannel", q: "Where is the IP address configured on a Layer 3 EtherChannel?", options: ["On each physical member interface", "On the port-channel interface only", "On the VLAN SVI", "No IP is needed"], answer: 1, explain: "The IP address goes on the port-channel interface. Physical members are 'no switchport' with no IP." }] },
  "2.4.h": { difficulty: 35, studyTime: 15, examFreq: 55, why: "Mismatched port config is the #1 cause of EtherChannel failure. Know every parameter that must match.", ciscoIntent: "Identify EtherChannel requirements for all member ports", cheatSheet: [{ heading: "EtherChannel Requirements", items: ["All member ports must match on ALL of these:", "Speed -- all same speed (e.g., all 1 Gbps)", "Duplex -- all same duplex (typically full)", "VLAN assignment -- all in same VLAN (access) or same allowed VLANs (trunk)", "Trunk mode -- all access or all trunk (can't mix)", "Native VLAN -- must match on all trunk members", "Switchport mode -- all switchport or all no switchport (can't mix L2 and L3)", "If ANY parameter differs, the channel will not form or will be suspended"]}], prereqs: [{ name: "EtherChannel basics", obj: "2.4.a" }], resources: [], labs: [], vocab: [{ term: "EtherChannel mismatch", q: "What happens if member ports have different VLAN assignments?", options: ["The channel uses the lowest VLAN", "The channel auto-negotiates VLANs", "The EtherChannel will not form or ports will be suspended", "Only one port carries traffic"], answer: 2, explain: "EtherChannel requires all members to have identical config. A VLAN mismatch prevents channel formation." }] },
  "2.4.i": { difficulty: 25, studyTime: 10, examFreq: 50, why: "These verification commands appear in exam simlets. Know what each column means.", ciscoIntent: "Verify EtherChannel status with show commands", cheatSheet: [{ heading: "EtherChannel Verification", items: ["<code>show etherchannel summary</code> -- quick overview: group, protocol, ports, status flags", "Flags: SU = L2 in use, RU = L3 in use, P = bundled, s = suspended, D = down", "<code>show etherchannel port-channel</code> -- detailed channel info: protocol, ports, load-balance", "<code>show interfaces port-channel [num]</code> -- treats channel as single interface", "<code>show etherchannel load-balance</code> -- shows current hashing method (src-dst-ip, etc.)", "If ports show 's' (suspended): check for config mismatch on member ports"]}], prereqs: [{ name: "EtherChannel config", obj: "2.4.f" }], resources: [], labs: [], vocab: [{ term: "show etherchannel summary", q: "In 'show etherchannel summary', what does a port flag of 'P' mean?", options: ["Passive mode", "Port is bundled in the channel", "Port is pruned", "Port is down"], answer: 1, explain: "'P' = bundled (port is active in the EtherChannel). 's' = suspended, 'D' = down." }] },

  // ── 2.5 STP (NEW: e, f, g only) ─────────────────────────────────────
  "2.5.e": { difficulty: 50, studyTime: 25, examFreq: 60, why: "The STP election process determines the entire Layer 2 topology. Know the exact tiebreaker order.", ciscoIntent: "Describe STP root bridge election and tiebreaker process", cheatSheet: [{ heading: "STP Election Process", items: ["Root bridge = switch with the lowest Bridge ID", "Bridge ID = Priority (4 bits) + VLAN (12 bits) + MAC address", "Default priority = 32768 (all Cisco switches)", "Priority is set in increments of 4096 (0, 4096, 8192, ..., 61440)", "If priority ties: lowest MAC address wins", "<code>spanning-tree vlan 10 priority 4096</code> -- manually set priority", "<code>spanning-tree vlan 10 root primary</code> -- sets priority to 24576 (or 4096 less than current root)", "After root is elected, each non-root switch selects a root port (best path to root)"]}], prereqs: [{ name: "Root bridge", obj: "2.5.a" }], resources: [], labs: [{ name: "STP election lab", desc: "3 switches, observe election, change priorities, verify new root" }], vocab: [{ term: "STP election", q: "If all switches have default priority, how is the root bridge elected?", options: ["Fastest CPU", "Most ports", "Lowest MAC address", "First powered on"], answer: 2, explain: "With equal priority (32768), the switch with the lowest MAC address becomes root bridge." }] },
  "2.5.f": { difficulty: 40, studyTime: 20, examFreq: 50, why: "STP path cost determines root port selection. Know the revised IEEE costs for common speeds.", ciscoIntent: "Use STP cost to determine root port selection", cheatSheet: [{ heading: "STP Path Cost", items: ["Root port selection: lowest total cost to reach root bridge wins", "Revised IEEE costs: 10 Gbps = 2, 1 Gbps = 4, 100 Mbps = 19, 10 Mbps = 100", "Legacy costs: 10 Gbps = 2, 1 Gbps = 4, 100 Mbps = 19, 10 Mbps = 100 (same on modern IOS)", "Cost is additive -- sum of all link costs along the path to root", "Tiebreakers if cost ties: 1) lowest neighbor Bridge ID, 2) lowest neighbor port priority, 3) lowest neighbor port number", "Modify cost: <code>spanning-tree cost [value]</code> on the interface", "Verify: <code>show spanning-tree</code> -- root port, cost shown per VLAN"]}], prereqs: [{ name: "STP election", obj: "2.5.e" }], resources: [], labs: [], vocab: [{ term: "STP cost", q: "What is the STP cost for a 1 Gbps link (revised IEEE)?", options: ["2", "4", "19", "100"], answer: 1, explain: "Revised IEEE STP costs: 10G=2, 1G=4, 100M=19, 10M=100. Lower cost = preferred path." }] },
  "2.5.g": { difficulty: 25, studyTime: 10, examFreq: 50, why: "These show commands are how you verify STP in exam simlets. Know what each field means.", ciscoIntent: "Verify STP status with show commands", cheatSheet: [{ heading: "STP Verification", items: ["<code>show spanning-tree</code> -- full STP info: root ID, bridge ID, port roles/states per VLAN", "<code>show spanning-tree vlan [id]</code> -- STP details for a specific VLAN", "Output includes: Root ID (priority + MAC), local Bridge ID, port role (Root/Desg/Altn), port state (FWD/BLK/LRN)", "Root bridge indicator: 'This bridge is the root' appears if local switch is root", "<code>show spanning-tree summary</code> -- quick count of ports per state across all VLANs", "<code>show spanning-tree interface [int]</code> -- STP state for a specific port"]}], prereqs: [{ name: "STP port states", obj: "2.5.b" }], resources: [], labs: [], vocab: [{ term: "show spanning-tree", q: "How do you check if the local switch is the root bridge?", options: ["show ip route", "show spanning-tree -- look for 'This bridge is the root'", "show cdp neighbors", "show mac address-table"], answer: 1, explain: "show spanning-tree displays the root ID and local bridge ID. If they match, it says 'This bridge is the root.'" }] },

  // ── 2.6 Wireless Architectures ──────────────────────────────────────
  "2.6.a": { difficulty: 25, studyTime: 10, examFreq: 35, why: "Autonomous APs are the simplest deployment model. Know their limitations for enterprise.", ciscoIntent: "Describe autonomous AP architecture", cheatSheet: [{ heading: "Autonomous AP", items: ["Standalone operation -- each AP configured individually", "Contains both data and control planes locally", "No controller needed -- AP handles everything", "Management: CLI (console/SSH) or web GUI per AP", "Scalability limit: difficult to manage more than a few APs", "Use case: very small deployments (1-3 APs)", "No centralized policy enforcement, roaming support is limited"]}], prereqs: [{ name: "Access points", obj: "1.1.d" }], resources: [], labs: [], vocab: [{ term: "Autonomous AP", q: "What is the main limitation of autonomous APs in enterprise?", options: ["They don't support encryption", "Each must be configured individually -- doesn't scale", "They require PoE+", "They only support 2.4 GHz"], answer: 1, explain: "Autonomous APs are self-contained but require individual configuration, making management impractical at scale." }] },
  "2.6.b": { difficulty: 30, studyTime: 15, examFreq: 45, why: "Lightweight APs with WLC is the standard enterprise model. Know the CAPWAP tunnel.", ciscoIntent: "Describe lightweight AP architecture with WLC", cheatSheet: [{ heading: "Lightweight AP + WLC", items: ["AP managed centrally by Wireless LAN Controller (WLC)", "CAPWAP tunnel between AP and WLC (Control And Provisioning of Wireless Access Points)", "Control plane: <code>UDP 5246</code> (always encrypted with DTLS)", "Data plane: <code>UDP 5247</code> (optionally encrypted)", "AP gets config, firmware, and policies from WLC automatically", "WLC handles: authentication, roaming, QoS, load balancing, RF management", "AP handles: real-time functions (beacons, probes, encryption/decryption)"]}], prereqs: [{ name: "Autonomous AP", obj: "2.6.a" }, { name: "Controllers", obj: "1.1.e" }], resources: [], labs: [], vocab: [{ term: "CAPWAP", q: "What UDP ports does CAPWAP use?", options: ["TCP 80 and 443", "UDP 5246 (control) and UDP 5247 (data)", "UDP 67 and 68", "TCP 22 and 23"], answer: 1, explain: "CAPWAP control uses UDP 5246 (always DTLS encrypted). CAPWAP data uses UDP 5247 (optionally encrypted)." }] },
  "2.6.c": { difficulty: 35, studyTime: 15, examFreq: 40, why: "Split-MAC defines exactly what the AP vs WLC handles. Cisco tests this division of responsibilities.", ciscoIntent: "Describe the split-MAC architecture between AP and WLC", cheatSheet: [{ heading: "Split-MAC Architecture", items: ["Real-time functions stay at the AP: RF transmission, beacons, probe responses, encryption/decryption, packet acknowledgments", "Management functions move to WLC: authentication, security policies, roaming decisions, QoS, RF channel/power management", "This split reduces AP complexity -- lightweight APs are 'thin'", "All management traffic tunneled over CAPWAP to WLC", "Data traffic can be tunneled to WLC (centralized switching) or locally bridged (FlexConnect)", "Benefits: centralized policy, simplified AP management, coordinated RF"]}], prereqs: [{ name: "Lightweight AP", obj: "2.6.b" }], resources: [], labs: [], vocab: [{ term: "Split-MAC", q: "In split-MAC, which device handles client authentication?", options: ["The AP", "The WLC", "The upstream switch", "The RADIUS server directly"], answer: 1, explain: "In split-MAC, management functions like authentication are handled by the WLC. The AP only handles real-time RF functions." }] },
  "2.6.d": { difficulty: 30, studyTime: 15, examFreq: 40, why: "FlexConnect allows branch APs to survive WLC outages. This is a common enterprise scenario.", ciscoIntent: "Describe FlexConnect mode for branch office APs", cheatSheet: [{ heading: "FlexConnect", items: ["Lightweight AP mode for branch offices with WAN link to WLC", "Connected mode: AP tunnels data to WLC (normal operation)", "Standalone mode: if WLC is unreachable, AP locally switches traffic", "Pre-authenticated clients and locally-switched WLANs continue working", "New clients cannot authenticate without WLC (unless using local auth)", "Config on WLC: set AP mode to FlexConnect, configure local switching per WLAN", "Best for: remote sites with unreliable WAN links to central WLC"]}], prereqs: [{ name: "Split-MAC", obj: "2.6.c" }], resources: [], labs: [], vocab: [{ term: "FlexConnect", q: "What happens to an existing wireless client when the WLC becomes unreachable in FlexConnect?", options: ["Client is disconnected immediately", "Client stays connected -- AP locally switches traffic", "Client is moved to a guest VLAN", "Traffic is queued until WLC recovers"], answer: 1, explain: "FlexConnect APs continue serving pre-authenticated clients by locally switching traffic when the WLC is unreachable." }] },
  "2.6.e": { difficulty: 20, studyTime: 10, examFreq: 35, why: "Cloud-managed (Meraki) is increasingly tested as Cisco expands its cloud portfolio.", ciscoIntent: "Describe cloud-based wireless management", cheatSheet: [{ heading: "Cloud-Based (Meraki)", items: ["APs managed via cloud dashboard (no on-premises controller)", "Cisco Meraki is the primary example", "Control plane in the cloud; data plane stays local (data doesn't go to cloud)", "Zero-touch provisioning: AP connects to internet, pulls config from cloud", "Licensing-based model (subscription)", "Benefits: no on-site controller hardware, global visibility, easy multi-site management", "Limitation: requires internet connectivity for management changes"]}], prereqs: [{ name: "FlexConnect", obj: "2.6.d" }], resources: [], labs: [], vocab: [{ term: "Cloud-managed", q: "In Cisco Meraki's cloud architecture, where does user data traffic flow?", options: ["Through the cloud dashboard", "Locally -- data stays on-premises, only management goes to cloud", "To a regional data center", "Both data and management go to cloud"], answer: 1, explain: "Meraki keeps user data local. Only the management/control plane communicates with the cloud dashboard." }] },
  "2.6.f": { difficulty: 25, studyTime: 10, examFreq: 35, why: "Cisco DNA Center represents intent-based networking. Know its role as the SDN controller.", ciscoIntent: "Describe Cisco DNA Center for campus network management", cheatSheet: [{ heading: "Cisco DNA Center", items: ["SDN controller for campus networks (wired + wireless)", "Intent-based networking: admin defines business intent, DNA Center translates to device config", "Manages switches, routers, APs, and WLCs from a single dashboard", "Features: automated provisioning, policy enforcement, assurance (analytics), software image management", "Uses NETCONF/RESTCONF to push config to devices", "Integrates with Cisco ISE for security policy enforcement", "Can be deployed as on-premises appliance or virtual appliance"]}], prereqs: [{ name: "Controllers", obj: "1.1.e" }], resources: [], labs: [], vocab: [{ term: "DNA Center", q: "What type of networking does Cisco DNA Center enable?", options: ["Traditional CLI-based", "Intent-based networking (IBN)", "Software-defined WAN only", "Wireless-only management"], answer: 1, explain: "DNA Center is Cisco's intent-based networking (IBN) controller -- you define business policies, it automates device configurations." }] },

  // ── 2.7 WLAN Physical Connections ────────────────────────────────────
  "2.7.a": { difficulty: 25, studyTime: 10, examFreq: 35, why: "AP-to-switch port type depends on the deployment. Know when access vs trunk is used.", ciscoIntent: "Describe how APs connect to switches", cheatSheet: [{ heading: "AP to Switch Connection", items: ["Single WLAN: AP connects to switch access port (one VLAN)", "Multiple WLANs: AP connects to switch trunk port (multiple VLANs)", "In centralized mode (CAPWAP): access port is sufficient -- all traffic tunneled to WLC", "In FlexConnect local switching: trunk port needed for multiple VLANs", "PoE provides power over the same Ethernet cable", "Port config: <code>switchport mode access</code> + <code>switchport access vlan [id]</code> for single VLAN"]}], prereqs: [{ name: "Access points", obj: "1.1.d" }, { name: "Trunking", obj: "2.2" }], resources: [], labs: [], vocab: [{ term: "AP switch port", q: "When does an AP need a trunk port instead of an access port?", options: ["Always", "When using CAPWAP centralized switching", "When locally switching multiple VLANs (FlexConnect)", "Never -- APs always use access ports"], answer: 2, explain: "In FlexConnect with local switching, the AP needs a trunk to carry multiple VLAN traffic. In centralized mode, access port suffices since CAPWAP tunnels everything." }] },
  "2.7.b": { difficulty: 30, studyTime: 15, examFreq: 40, why: "WLC-to-switch connectivity carries all WLAN VLANs. Know why it must be a trunk.", ciscoIntent: "Describe how WLCs connect to the switch infrastructure", cheatSheet: [{ heading: "WLC to Switch Connection", items: ["WLC connects to distribution/core switch via trunk port", "Trunk carries: management VLAN + all WLAN-mapped VLANs", "WLC management interface: connects to a specific VLAN for WLC administration", "Dynamic interfaces: one per WLAN, each mapped to a VLAN", "AP-manager interface: used for AP discovery and CAPWAP communication", "Switch trunk config: <code>switchport mode trunk</code> + allowed VLANs for all WLC interfaces"]}], prereqs: [{ name: "Trunking", obj: "2.2" }, { name: "WLC", obj: "1.1.e" }], resources: [], labs: [], vocab: [{ term: "WLC trunk", q: "Why does the WLC uplink to a switch need to be a trunk?", options: ["WLCs only support trunks", "It must carry traffic for the management VLAN and all WLAN VLANs", "Trunks provide more bandwidth", "Trunks encrypt traffic"], answer: 1, explain: "The WLC manages multiple WLANs, each mapped to a different VLAN. The trunk carries all these VLANs plus the management VLAN." }] },
  "2.7.c": { difficulty: 30, studyTime: 10, examFreq: 35, why: "LAG on the WLC bundles uplinks for bandwidth and redundancy. Know why it's used.", ciscoIntent: "Describe LAG for WLC uplinks", cheatSheet: [{ heading: "WLC LAG (Link Aggregation)", items: ["Bundles multiple WLC physical ports into one logical port", "Provides bandwidth aggregation and link redundancy", "All WLC interfaces share the LAG -- no need for per-interface port assignment", "Simplified design: one logical port replaces multiple individual port mappings", "If one physical link fails, traffic redistributes to remaining links", "LAG must be configured on both WLC and the connected switch", "Alternative without LAG: distribute WLC interfaces across individual ports (more complex)"]}], prereqs: [{ name: "WLC connectivity", obj: "2.7.b" }, { name: "EtherChannel", obj: "2.4" }], resources: [], labs: [], vocab: [{ term: "WLC LAG", q: "What is the benefit of enabling LAG on a WLC?", options: ["Reduces latency", "Combines ports for bandwidth and redundancy in a single logical connection", "Enables QoS", "Required for CAPWAP"], answer: 1, explain: "LAG bundles WLC ports into one logical connection -- more bandwidth and if one link fails, the others keep working." }] },
  "2.7.d": { difficulty: 20, studyTime: 10, examFreq: 40, why: "PoE eliminates separate power runs to APs. Know the standards and wattage.", ciscoIntent: "Describe PoE for powering access points", cheatSheet: [{ heading: "PoE for APs", items: ["PoE delivers power + data over standard Ethernet cable (no separate power cable)", "802.3af (PoE): up to 15.4W -- sufficient for basic APs", "802.3at (PoE+): up to 30W -- needed for dual-radio APs with higher power", "802.3bt (PoE++): up to 60W (Type 3) or 100W (Type 4) -- high-performance APs", "PoE-capable switch or PoE injector required on the switch side", "Verify: <code>show power inline</code> -- shows PoE status and power drawn per port", "If AP doesn't get enough power: may disable one radio or reduce functionality"]}], prereqs: [{ name: "PoE", obj: "1.1.h" }], resources: [], labs: [], vocab: [{ term: "PoE standards", q: "Which PoE standard provides up to 30W?", options: ["802.3af", "802.3at (PoE+)", "802.3bt (PoE++)", "802.3ad"], answer: 1, explain: "802.3at (PoE+) provides up to 30W. 802.3af provides 15.4W. 802.3bt provides 60-100W. Don't confuse 802.3ad (LACP) with PoE." }] },

  // ── 2.8 Management Access ───────────────────────────────────────────
  "2.8.a": { difficulty: 20, studyTime: 10, examFreq: 40, why: "Console access is the out-of-band fallback. Know why it's the most reliable management method.", ciscoIntent: "Describe console access for device management", cheatSheet: [{ heading: "Console Access", items: ["Physical connection: RJ-45 console port or USB-mini/USB-C", "Out-of-band: does not require network connectivity", "Serial connection: 9600 baud, 8 data bits, no parity, 1 stop bit, no flow control", "Used for: initial setup, password recovery, troubleshooting when network is down", "Requires a console cable (rollover cable) and terminal emulator (PuTTY, SecureCRT)", "Most secure path -- attacker must have physical access to the device", "Config: <code>line con 0</code> -> <code>password [pass]</code> -> <code>login</code>"]}], prereqs: [], resources: [], labs: [], vocab: [{ term: "Console", q: "Why is console access considered the most reliable management method?", options: ["It's the fastest", "It doesn't require the network to be functional (out-of-band)", "It supports the most features", "It's always encrypted"], answer: 1, explain: "Console is out-of-band -- it uses a direct physical cable connection, so it works even when the network is completely down." }] },
  "2.8.b": { difficulty: 20, studyTime: 10, examFreq: 40, why: "Telnet is insecure and Cisco wants you to know WHY. It sends everything in plaintext.", ciscoIntent: "Identify Telnet as insecure and explain why", cheatSheet: [{ heading: "Telnet", items: ["Port: <code>TCP 23</code>", "In-band management: requires network connectivity to the device", "Sends everything in plaintext -- passwords, commands, output", "Anyone with a packet sniffer can capture credentials", "NEVER use in production -- always use SSH instead", "Config: <code>line vty 0 15</code> -> <code>transport input telnet</code> (allows Telnet on VTY lines)", "Still exists for backward compatibility and lab environments"]}], prereqs: [{ name: "TCP ports", obj: "1.5.f" }], resources: [], labs: [], vocab: [{ term: "Telnet", q: "What is the primary security concern with Telnet?", options: ["It uses too much bandwidth", "It sends all data including passwords in plaintext", "It's too slow", "It only works on IPv4"], answer: 1, explain: "Telnet transmits everything unencrypted. Passwords are visible to anyone capturing packets on the network." }] },
  "2.8.c": { difficulty: 25, studyTime: 15, examFreq: 55, why: "SSH configuration is a common simlet task. Know the prerequisites and exact commands.", ciscoIntent: "Configure SSH for secure remote management", cheatSheet: [{ heading: "SSH", items: ["Port: <code>TCP 22</code> -- encrypted remote access", "Prerequisites: hostname set, domain name set, RSA key generated, VTY lines configured", "Config steps: <code>hostname R1</code>, <code>ip domain-name lab.local</code>, <code>crypto key generate rsa modulus 2048</code>", "<code>ip ssh version 2</code> -- always use SSHv2 (v1 is insecure)", "<code>line vty 0 15</code> -> <code>transport input ssh</code> (SSH only, blocks Telnet)", "Requires local username: <code>username admin secret [password]</code> -> <code>login local</code> on VTY", "Verify: <code>show ip ssh</code>, <code>show ssh</code> (active sessions)"]}], prereqs: [{ name: "Telnet", obj: "2.8.b" }], resources: [], labs: [{ name: "Configure SSH", desc: "Set up SSH-only access, verify with show ip ssh and test connection" }], vocab: [{ term: "SSH setup", q: "What must be configured before generating RSA keys for SSH?", options: ["OSPF", "A hostname and domain name", "DHCP server", "A default route"], answer: 1, explain: "RSA key generation requires a hostname and domain name -- the key is named hostname.domain. Without both, the command fails." }] },
  "2.8.d": { difficulty: 20, studyTime: 10, examFreq: 35, why: "HTTP/HTTPS management provides a web GUI. Know which is secure and the port numbers.", ciscoIntent: "Describe HTTP and HTTPS for web-based device management", cheatSheet: [{ heading: "HTTP / HTTPS Management", items: ["HTTP: <code>TCP 80</code> -- web GUI, unencrypted (avoid)", "HTTPS: <code>TCP 443</code> -- web GUI, encrypted with TLS (preferred)", "Enable: <code>ip http server</code> (HTTP) / <code>ip http secure-server</code> (HTTPS)", "Disable HTTP: <code>no ip http server</code> (security best practice)", "Used for: switches and routers with GUI support, WLC management", "Authentication via local users or RADIUS/TACACS+", "Best practice: disable HTTP, enable HTTPS only"]}], prereqs: [{ name: "TCP ports", obj: "1.5.f" }], resources: [], labs: [], vocab: [{ term: "HTTPS management", q: "Which command enables encrypted web management on a Cisco device?", options: ["ip http server", "ip http secure-server", "transport input https", "crypto key generate rsa"], answer: 1, explain: "'ip http secure-server' enables HTTPS (TLS-encrypted) web management on TCP 443." }] },
  "2.8.e": { difficulty: 35, studyTime: 20, examFreq: 50, why: "TACACS+ vs RADIUS is a classic comparison question. Know the protocol, port, and encryption differences.", ciscoIntent: "Describe TACACS+ characteristics for AAA", cheatSheet: [{ heading: "TACACS+", items: ["Cisco proprietary protocol", "Port: <code>TCP 49</code>", "Encrypts the ENTIRE packet body (more secure)", "Separates Authentication, Authorization, and Accounting (granular control)", "Supports per-command authorization (can control who runs 'show' vs 'config' commands)", "Best for: device management AAA (who can configure what on which router)", "Typically used with Cisco ISE or ACS"]}], prereqs: [{ name: "SSH", obj: "2.8.c" }], resources: [], labs: [], vocab: [{ term: "TACACS+", q: "What advantage does TACACS+ have over RADIUS for network device management?", options: ["It uses UDP for speed", "It separates AAA and supports per-command authorization", "It's an open standard", "It encrypts only the password"], answer: 1, explain: "TACACS+ separates A/A/A and can authorize individual commands -- perfect for controlling who can configure devices." }] },
  "2.8.f": { difficulty: 35, studyTime: 20, examFreq: 50, why: "RADIUS is the open standard AAA protocol. Know how it differs from TACACS+ in every dimension.", ciscoIntent: "Describe RADIUS characteristics and compare with TACACS+", cheatSheet: [{ heading: "RADIUS", items: ["IEEE / IETF open standard", "Ports: <code>UDP 1812</code> (authentication) and <code>UDP 1813</code> (accounting)", "Legacy ports: UDP 1645/1646 (still seen on older configs)", "Encrypts only the password (rest of packet is plaintext)", "Combines Authentication and Authorization in one step", "Best for: network access control (802.1X, VPN, wireless authentication)", "Widely supported across all vendors (not just Cisco)", "Typically used with Cisco ISE, FreeRADIUS, Microsoft NPS"]}], prereqs: [{ name: "TACACS+", obj: "2.8.e" }], resources: [], labs: [], vocab: [{ term: "RADIUS", q: "Which protocol does RADIUS use?", options: ["TCP 49", "UDP 1812/1813", "TCP 22", "UDP 514"], answer: 1, explain: "RADIUS uses UDP 1812 for authentication and UDP 1813 for accounting. TACACS+ uses TCP 49." }] },
  "2.8.g": { difficulty: 20, studyTime: 10, examFreq: 30, why: "Cloud-managed devices eliminate CLI management. Know the trade-offs.", ciscoIntent: "Describe cloud-managed network devices", cheatSheet: [{ heading: "Cloud Managed", items: ["Devices managed via cloud dashboard (no direct CLI required)", "Examples: Cisco Meraki (switches, APs, firewalls), Cisco Spaces", "Cisco DNA Center can also operate as cloud-hosted", "Zero-touch deployment: device connects to internet, pulls config from cloud", "Subscription/license model (recurring cost)", "Benefits: no on-site management infrastructure, multi-site visibility", "Limitation: requires internet for management; no CLI access for advanced troubleshooting"]}], prereqs: [{ name: "Cloud wireless", obj: "2.6.e" }], resources: [], labs: [], vocab: [{ term: "Cloud management", q: "What is required for a cloud-managed device to receive its configuration?", options: ["Console cable", "SSH access", "Internet connectivity to reach the cloud management platform", "A local WLC"], answer: 2, explain: "Cloud-managed devices pull their configuration from the cloud. Without internet, they can't receive management updates." }] },

  // ── 2.9 WLAN GUI Configuration ──────────────────────────────────────
  "2.9.a": { difficulty: 25, studyTime: 15, examFreq: 35, why: "WLAN creation in the WLC GUI may appear as a screenshot question. Know the required fields.", ciscoIntent: "Create a WLAN using the WLC GUI", cheatSheet: [{ heading: "WLAN Creation", items: ["Navigate to WLANs tab in WLC GUI -> Create New", "Required fields: Profile Name (internal name), SSID (what clients see), WLAN ID (1-512)", "Profile Name and SSID can differ (but often match)", "Status: Enabled or Disabled (new WLANs start disabled by default)", "WLAN must be mapped to an interface (VLAN) before clients can connect", "Maximum WLANs varies by WLC model (typically 16-512)", "Enable the WLAN after configuring security and interface mapping"]}], prereqs: [{ name: "Wireless principles", obj: "1.11" }], resources: [], labs: [], vocab: [{ term: "WLAN creation", q: "What three fields are required when creating a WLAN on a WLC?", options: ["SSID, password, VLAN", "Profile Name, SSID, and WLAN ID", "Channel, power, security", "AP name, group, site"], answer: 1, explain: "A new WLAN requires a Profile Name (internal), SSID (client-facing), and WLAN ID (numerical identifier)." }] },
  "2.9.b": { difficulty: 30, studyTime: 15, examFreq: 40, why: "Security settings on WLANs are heavily tested. Know WPA2/AES and the PSK vs 802.1X choice.", ciscoIntent: "Configure WLAN security settings in the WLC GUI", cheatSheet: [{ heading: "WLAN Security Settings", items: ["Security tab in WLAN configuration", "Layer 2 Security: WPA+WPA2 (most common for CCNA)", "Encryption/cipher: AES (required for WPA2, never use TKIP for WPA2)", "Authentication Key Management: PSK (pre-shared key) for small/home networks", "802.1X (enterprise): uses RADIUS server for per-user authentication", "WPA2 + AES + 802.1X = enterprise standard", "WPA2 + AES + PSK = small office/home", "WPA3 (SAE) = latest standard, may appear on newer exam versions"]}], prereqs: [{ name: "Encryption standards", obj: "1.11.d" }], resources: [], labs: [], vocab: [{ term: "WLAN security", q: "What combination is the enterprise wireless security standard?", options: ["WPA + TKIP + PSK", "WPA2 + AES + 802.1X", "WEP + shared key", "WPA3 + RADIUS"], answer: 1, explain: "WPA2 with AES encryption and 802.1X (RADIUS) authentication is the enterprise standard." }] },
  "2.9.c": { difficulty: 25, studyTime: 10, examFreq: 35, why: "Interface/VLAN mapping determines where wireless client traffic ends up on the wired side.", ciscoIntent: "Map a WLAN to a VLAN interface on the WLC", cheatSheet: [{ heading: "Interface / VLAN Mapping", items: ["Each WLAN is mapped to a dynamic interface (which maps to a VLAN)", "WLC dynamic interface = a VLAN interface with IP, mask, gateway, DHCP settings", "Example: WLAN 'Corporate' -> dynamic interface 'corp-vlan' -> VLAN 10", "Example: WLAN 'Guest' -> dynamic interface 'guest-vlan' -> VLAN 99", "This determines which VLAN the wireless clients' traffic enters on the wired side", "Configure under WLAN -> General tab -> Interface/Interface Group dropdown", "Management interface carries WLC management traffic (separate from client WLANs)"]}], prereqs: [{ name: "VLANs", obj: "2.1" }, { name: "WLAN creation", obj: "2.9.a" }], resources: [], labs: [], vocab: [{ term: "VLAN mapping", q: "What does mapping a WLAN to a dynamic interface on the WLC accomplish?", options: ["Sets the wireless channel", "Places wireless client traffic into a specific VLAN on the wired network", "Configures encryption", "Assigns the AP to a group"], answer: 1, explain: "The dynamic interface maps to a VLAN. When a WLAN uses that interface, all client traffic for that WLAN enters the corresponding VLAN." }] },
  "2.9.d": { difficulty: 25, studyTime: 10, examFreq: 35, why: "QoS profiles prioritize voice and video. Know the four levels and which traffic type each serves.", ciscoIntent: "Identify WLC QoS profile levels", cheatSheet: [{ heading: "QoS Profiles", items: ["Platinum: Voice (highest priority, lowest latency)", "Gold: Video (high priority)", "Silver: Best Effort (default for most WLANs)", "Bronze: Background (lowest priority, bulk transfers)", "QoS profile set per WLAN under the QoS tab", "WMM (Wi-Fi Multimedia) maps these to 802.11e access categories", "Voice WLAN should use Platinum to ensure call quality", "Data WLAN typically uses Silver (best effort)"]}], prereqs: [{ name: "WLAN creation", obj: "2.9.a" }], resources: [], labs: [], vocab: [{ term: "QoS profiles", q: "Which WLC QoS profile should be assigned to a voice WLAN?", options: ["Bronze", "Silver", "Gold", "Platinum"], answer: 3, explain: "Platinum is for voice traffic -- highest priority, lowest latency. Gold is for video, Silver for best effort, Bronze for background." }] },
  "2.9.e": { difficulty: 25, studyTime: 10, examFreq: 30, why: "Advanced WLAN settings add security and control. Know the common options.", ciscoIntent: "Describe advanced WLAN GUI settings", cheatSheet: [{ heading: "Advanced WLAN Settings", items: ["Client exclusion: auto-excludes clients that fail authentication too many times", "Default exclusion timeout: 60 seconds", "P2P blocking: prevents wireless clients from communicating directly with each other", "Session timeout: forces re-authentication after set time (default 1800 seconds / 30 minutes)", "DHCP required: client must obtain address via DHCP (blocks static IPs on wireless)", "Client load balancing: distributes clients across APs to prevent overload", "Max clients per WLAN: limits total concurrent wireless connections"]}], prereqs: [{ name: "Security settings", obj: "2.9.b" }], resources: [], labs: [], vocab: [{ term: "Session timeout", q: "What does the session timeout setting do on a WLAN?", options: ["Disconnects idle clients", "Forces re-authentication after the timer expires", "Limits bandwidth", "Changes the SSID"], answer: 1, explain: "Session timeout forces wireless clients to re-authenticate when the timer expires (default 1800 seconds/30 minutes), ensuring credentials are still valid." }] },
  // ── Domain 3 NEW entries ──────────────────────────────────────────

  // 3.2.d — Routing protocol metric
  "3.2.d": {
    difficulty: 45, studyTime: 25, examFreq: 65,
    why: "Once AD ties are broken, metric is the final tiebreaker within a single routing protocol. Cisco expects you to know what each protocol uses as its metric.",
    ciscoIntent: "Explain how metric selects the best path within a routing protocol",
    cheatSheet: [{ heading: "Routing Protocol Metrics", items: [
      "Metric = cost value WITHIN a single routing protocol. Lower = preferred.",
      "OSPF metric = cost = reference BW / interface BW (default reference 100 Mbps)",
      "RIP metric = hop count (max 15; 16 = unreachable)",
      "EIGRP metric = composite of bandwidth + delay (by default); K1=K3=1, K2=K4=K5=0",
      "Metric only compared between routes from the SAME protocol to the SAME destination",
      "Equal-metric paths = ECMP load balancing (OSPF supports 4 equal paths by default)"
    ]}],
    prereqs: [{ name: "Metric basics", obj: "3.1.f" }, { name: "AD", obj: "3.1.e" }],
    resources: [],
    labs: [{ name: "Compare metrics", desc: "Two OSPF paths to same destination with different bandwidths — verify which path is chosen" }],
    vocab: [{ term: "Metric", q: "Two OSPF routes to 10.1.0.0/16: one via GigE (cost 1), one via FastE (cost 10). Which wins?", options: ["FastE (higher cost)", "GigE (lower cost = preferred)", "Both load-balance", "Depends on AD"], answer: 1, explain: "OSPF prefers lower cost. GigE cost 1 < FastE cost 10." }]
  },

  // 3.2.e — Decision order
  "3.2.e": {
    difficulty: 55, studyTime: 30, examFreq: 80,
    why: "This is the master rule for route selection. Cisco tests whether you can apply the three-step decision process in order. Getting the order wrong means wrong answer every time.",
    ciscoIntent: "Apply the three-step forwarding decision: longest match, then AD, then metric",
    cheatSheet: [{ heading: "Route Decision Order", items: [
      "Step 1: Longest prefix match — most specific route always wins first (/28 > /24 > /0)",
      "Step 2: Lowest Administrative Distance — if same prefix from different sources (OSPF 110 vs Static 1)",
      "Step 3: Lowest metric — if same prefix, same protocol, multiple paths",
      "NEVER compare AD across different prefixes. Longest match is absolute.",
      "Example: static route to 10.0.0.0/8 does NOT beat OSPF route to 10.1.1.0/24 for 10.1.1.50",
      "The /24 OSPF route wins because longest match comes first, regardless of AD"
    ]}],
    prereqs: [{ name: "Longest prefix match", obj: "3.2.a" }, { name: "AD", obj: "3.2.b" }, { name: "Metric", obj: "3.2.d" }],
    resources: [],
    labs: [{ name: "Decision order scenarios", desc: "5 routing table scenarios — apply the 3-step process to pick the winning route" }],
    vocab: [{ term: "Decision order", q: "Static route to 10.0.0.0/8 (AD 1) and OSPF route to 10.1.1.0/24 (AD 110). Packet to 10.1.1.50 — which route?", options: ["Static (lower AD)", "OSPF /24 (longer prefix match)", "Both — load balanced", "Dropped — ambiguous"], answer: 1, explain: "Longest prefix match is ALWAYS step 1. /24 beats /8 regardless of AD." }]
  },

  // 3.3.e — IPv6 static routing
  "3.3.e": {
    difficulty: 40, studyTime: 25, examFreq: 55,
    why: "IPv6 static routes use a different command syntax. Cisco tests whether you know the ipv6 route command and can configure default, network, and host routes in IPv6.",
    ciscoIntent: "Configure IPv6 static routes including default route",
    cheatSheet: [{ heading: "IPv6 Static Routes", items: [
      "Default: <code>ipv6 route ::/0 2001:db8:2::1</code> (equivalent of 0.0.0.0/0)",
      "Network: <code>ipv6 route 2001:db8:1::/48 2001:db8:2::1</code>",
      "Host: <code>ipv6 route 2001:db8:1::100/128 2001:db8:2::1</code> (/128 = single host)",
      "Exit-interface: <code>ipv6 route 2001:db8:1::/64 GigabitEthernet0/0</code>",
      "Link-local next-hop requires exit interface: <code>ipv6 route ::/0 GigabitEthernet0/0 FE80::1</code>",
      "Prerequisite: <code>ipv6 unicast-routing</code> must be enabled globally"
    ]}],
    prereqs: [{ name: "IPv6 addressing", obj: "1.8" }, { name: "IPv4 static routing", obj: "3.3.a" }],
    resources: [],
    labs: [{ name: "IPv6 static routes", desc: "Configure default, network, and host routes in IPv6; verify with show ipv6 route" }],
    vocab: [{ term: "IPv6 default route", q: "What is the IPv6 equivalent of ip route 0.0.0.0 0.0.0.0?", options: ["ipv6 route ::1/128", "ipv6 route ::/0 [next-hop]", "ipv6 route FF00::/8", "ipv6 route FE80::/10"], answer: 1, explain: "::/0 matches all IPv6 destinations — same concept as 0.0.0.0/0 in IPv4." }]
  },

  // 3.3.f — Next-hop vs exit-interface (connected vs recursive)
  "3.3.f": {
    difficulty: 45, studyTime: 20, examFreq: 50,
    why: "Cisco tests whether you understand the difference between specifying a next-hop IP and an exit interface in a static route, and why it matters for the routing table lookup.",
    ciscoIntent: "Compare next-hop and exit-interface static routes",
    cheatSheet: [{ heading: "Next-Hop vs Exit-Interface", items: [
      "Next-hop IP: <code>ip route 10.0.0.0 255.0.0.0 192.168.1.1</code> — recursive lookup (2 lookups)",
      "Exit-interface: <code>ip route 10.0.0.0 255.0.0.0 GigabitEthernet0/1</code> — directly connected",
      "Both: <code>ip route 10.0.0.0 255.0.0.0 GigabitEthernet0/1 192.168.1.1</code> — fully specified",
      "Recursive = router must look up next-hop IP in routing table to find exit interface",
      "Exit-interface only works well on point-to-point links (serial, tunnel)",
      "On multi-access (Ethernet), exit-interface causes proxy ARP for every destination — use next-hop instead"
    ]}],
    prereqs: [{ name: "Static routing basics", obj: "3.3.b" }],
    resources: [],
    labs: [{ name: "Compare route types", desc: "Configure same route with next-hop, exit-interface, and fully specified — compare show ip route output" }],
    vocab: [{ term: "Recursive lookup", q: "Why is a next-hop static route called 'recursive'?", options: ["It repeats every 30 seconds", "Router must do a second lookup to find the exit interface for the next-hop IP", "It uses recursion in code", "It loops back to source"], answer: 1, explain: "The router knows the next-hop IP but must look up that IP in the routing table again to find the actual exit interface." }]
  },

  // 3.3.g — Verify static routing
  "3.3.g": {
    difficulty: 30, studyTime: 15, examFreq: 55,
    why: "Cisco tests whether you can verify that static routes are installed and working. show commands for both IPv4 and IPv6 static routes appear on the exam.",
    ciscoIntent: "Verify static route installation and operation",
    cheatSheet: [{ heading: "Verify Static Routes", items: [
      "<code>show ip route static</code> — displays only static routes (code S)",
      "<code>show ip route 10.1.1.0</code> — detailed info for a specific route",
      "<code>show ipv6 route static</code> — IPv6 static routes only",
      "<code>show ipv6 route</code> — full IPv6 routing table",
      "<code>ping [destination]</code> — test reachability through the static route",
      "<code>traceroute [destination]</code> — verify the path matches expected next-hop",
      "A static route only appears if the exit interface is up/up or next-hop is reachable"
    ]}],
    prereqs: [{ name: "Static routing config", obj: "3.3.a" }],
    resources: [],
    labs: [{ name: "Verify routing lab", desc: "Configure static routes, shut an interface, observe route disappears from table" }],
    vocab: [{ term: "Static route visibility", q: "When does a static route disappear from the routing table?", options: ["After 300 seconds", "When the exit interface goes down or next-hop becomes unreachable", "When OSPF is enabled", "Never — static routes are permanent"], answer: 1, explain: "Static routes are removed when the outgoing interface goes down or the recursive next-hop is no longer reachable." }]
  },

  // 3.4.e — OSPF configuration
  "3.4.e": {
    difficulty: 65, studyTime: 40, examFreq: 80,
    why: "OSPF configuration is a core hands-on objective. You must know both the network command with wildcard mask and the interface-level ip ospf command.",
    ciscoIntent: "Configure single-area OSPFv2 using network or interface commands",
    cheatSheet: [{ heading: "OSPF Configuration", items: [
      "<code>router ospf 1</code> — enter OSPF process (process ID is local only, does not need to match neighbors)",
      "<code>network 10.1.1.0 0.0.0.255 area 0</code> — enable OSPF on matching interfaces, assign to area 0",
      "Wildcard mask = inverse of subnet mask: 255.255.255.0 becomes 0.0.0.255",
      "Interface method: <code>interface GigabitEthernet0/0</code> then <code>ip ospf 1 area 0</code>",
      "Interface method is preferred — explicit, no wildcard math needed",
      "<code>router-id 1.1.1.1</code> — set manually (best practice)",
      "After changing router-id: <code>clear ip ospf process</code> to take effect"
    ]}],
    prereqs: [{ name: "OSPF adjacencies", obj: "3.4.a" }, { name: "Subnetting / wildcards", obj: "1.6" }],
    resources: [],
    labs: [{ name: "OSPF config lab", desc: "Configure OSPF on 3 routers using both network and interface methods, verify adjacencies" }],
    vocab: [{ term: "OSPF process ID", q: "Does the OSPF process ID need to match between neighbors?", options: ["Yes, must be identical", "No, it is locally significant only", "Only in multi-area", "Only if using authentication"], answer: 1, explain: "Process ID is local to the router. Router A can use 'router ospf 1' and Router B can use 'router ospf 10' and still form adjacency." }]
  },

  // 3.4.f — Passive interface
  "3.4.f": {
    difficulty: 50, studyTime: 25, examFreq: 70,
    why: "Passive-interface stops OSPF Hellos on an interface but still advertises its network. This is a security best practice and a frequent exam topic.",
    ciscoIntent: "Configure and explain OSPF passive interfaces",
    cheatSheet: [{ heading: "Passive Interface", items: [
      "<code>passive-interface GigabitEthernet0/1</code> — under router ospf config mode",
      "Stops sending and receiving Hello packets on that interface",
      "The interface's network is STILL advertised into OSPF (appears in neighbors' routing tables)",
      "Use on LAN segments where no OSPF neighbor exists (user-facing ports, server segments)",
      "<code>passive-interface default</code> — makes ALL interfaces passive, then <code>no passive-interface GigabitEthernet0/0</code> to selectively enable",
      "Verify: <code>show ip ospf interface [int]</code> — shows 'passive' or 'No Hellos'"
    ]}],
    prereqs: [{ name: "OSPF config", obj: "3.4.e" }],
    resources: [],
    labs: [{ name: "Passive interface lab", desc: "Enable passive-interface default, selectively enable OSPF on uplinks only" }],
    vocab: [{ term: "Passive interface", q: "What does passive-interface do in OSPF?", options: ["Removes the network from OSPF entirely", "Stops Hellos but still advertises the network", "Disables the interface", "Sets priority to 0"], answer: 1, explain: "Passive stops Hello exchange (no adjacency on that link) but the network is still in the LSDB and advertised to other routers." }]
  },

  // 3.4.g — OSPF cost
  "3.4.g": {
    difficulty: 60, studyTime: 35, examFreq: 75,
    why: "OSPF cost determines the best path. The default reference bandwidth of 100 Mbps causes problems with modern links. Changing it is a critical skill.",
    ciscoIntent: "Calculate and modify OSPF cost",
    cheatSheet: [{ heading: "OSPF Cost", items: [
      "Cost = reference bandwidth / interface bandwidth",
      "Default reference = 100 Mbps: GigE cost = 100/1000 = 1, FastE = 100/100 = 1 (same! Problem.)",
      "10 GigE = 100/10000 = 1 (still 1 — can't distinguish fast links)",
      "<code>auto-cost reference-bandwidth 10000</code> — set reference to 10 Gbps (under router ospf)",
      "With 10000 Mbps ref: GigE = 10, FastE = 100, 10GigE = 1 — much better differentiation",
      "Must set same reference on ALL routers in the OSPF domain",
      "Per-interface override: <code>ip ospf cost 50</code> — manually set cost on one link"
    ]}],
    prereqs: [{ name: "OSPF config", obj: "3.4.e" }, { name: "Metric", obj: "3.1.f" }],
    resources: [],
    labs: [{ name: "OSPF cost lab", desc: "Default reference — show GigE and FastE get same cost. Change reference, verify new costs" }],
    vocab: [{ term: "OSPF cost", q: "With default reference (100 Mbps), what is the OSPF cost of a GigabitEthernet interface?", options: ["0", "1", "10", "100"], answer: 1, explain: "100 Mbps / 1000 Mbps = 0.1, but OSPF rounds up to 1. This is the exact problem — GigE and FastE both show cost 1." }]
  },

  // 3.4.h — Default route into OSPF
  "3.4.h": {
    difficulty: 55, studyTime: 25, examFreq: 65,
    why: "Injecting a default route into OSPF lets all internal routers reach the internet via the edge router. Cisco tests the exact command and its behavior.",
    ciscoIntent: "Advertise a default route into OSPF using default-information originate",
    cheatSheet: [{ heading: "OSPF Default Route", items: [
      "<code>default-information originate</code> — advertises 0.0.0.0/0 into OSPF (under router ospf)",
      "Requires a default route to already exist in the routing table (static, learned, etc.)",
      "<code>default-information originate always</code> — advertises even WITHOUT a default route in table",
      "The default route appears as O*E2 in neighbor routing tables (external type 2)",
      "Typically configured on the ASBR (edge router connected to the internet)",
      "Internal routers see: <code>O*E2 0.0.0.0/0 [110/1] via [edge-router-ip]</code>"
    ]}],
    prereqs: [{ name: "OSPF config", obj: "3.4.e" }, { name: "Default route", obj: "3.3.a" }],
    resources: [],
    labs: [{ name: "OSPF default route lab", desc: "Configure edge router with static default + default-information originate, verify on internal routers" }],
    vocab: [{ term: "default-information originate", q: "What is the difference between 'default-information originate' and 'default-information originate always'?", options: ["No difference", "'always' requires a static route", "Without 'always', a default route must already exist in the routing table", "'always' only works in multi-area"], answer: 2, explain: "Without 'always', OSPF only advertises the default if one exists in the local routing table. 'always' advertises it unconditionally." }]
  },

  // 3.4.i — OSPF verification
  "3.4.i": {
    difficulty: 50, studyTime: 30, examFreq: 75,
    why: "OSPF verification commands are heavily tested. You must recognize the output of show ip ospf neighbor and interpret adjacency states.",
    ciscoIntent: "Verify OSPF operation using show commands",
    cheatSheet: [{ heading: "OSPF Verification", items: [
      "<code>show ip ospf neighbor</code> — neighbor ID, state (FULL/2WAY), dead timer, interface",
      "<code>show ip ospf interface brief</code> — interfaces in OSPF, area, cost, state, neighbors",
      "<code>show ip ospf interface GigabitEthernet0/0</code> — detailed: hello/dead timers, DR/BDR, network type",
      "<code>show ip route ospf</code> — only OSPF-learned routes (code O, O IA, O E1, O E2)",
      "<code>show ip ospf database</code> — LSDB contents (LSA types 1-5)",
      "<code>show ip protocols</code> — OSPF process, router-id, networks, passive interfaces",
      "FULL = healthy adjacency. INIT/2WAY on broadcast = normal for DROther routers"
    ]}],
    prereqs: [{ name: "OSPF adjacencies", obj: "3.4.a" }, { name: "OSPF config", obj: "3.4.e" }],
    resources: [],
    labs: [{ name: "OSPF troubleshooting lab", desc: "Use show commands to find and fix broken OSPF adjacencies" }],
    vocab: [{ term: "OSPF neighbor states", q: "A router shows OSPF neighbor in INIT state. What does this mean?", options: ["Fully converged", "Hello received but no reply seen — one-way communication", "Authentication mismatch", "Interface is down"], answer: 1, explain: "INIT means the router received a Hello but hasn't seen its own router ID in the neighbor's Hello. This is one-way — check the other side." }]
  },

  // 3.5.a — FHRP purpose
  "3.5.a": {
    difficulty: 30, studyTime: 15, examFreq: 45,
    why: "Understanding why FHRPs exist is foundational. A single default gateway is a single point of failure, and FHRPs solve that.",
    ciscoIntent: "Explain the need for first hop redundancy",
    cheatSheet: [{ heading: "FHRP Purpose", items: [
      "Problem: hosts configure ONE default gateway IP. If that router fails, all hosts lose connectivity.",
      "Solution: two or more routers share a virtual IP (VIP) as the gateway address",
      "Hosts point to the VIP — they don't know or care which physical router is active",
      "If the active router fails, the standby takes over the VIP seamlessly",
      "Failover is transparent to clients — no IP config change needed on hosts",
      "Used at the distribution layer where hosts need a reliable default gateway"
    ]}],
    prereqs: [{ name: "Default gateway", obj: "1.1.a" }, { name: "Routing basics", obj: "3.1" }],
    resources: [],
    labs: [],
    vocab: [{ term: "FHRP", q: "What problem does FHRP solve?", options: ["Slow routing convergence", "Single point of failure at the default gateway", "IP address exhaustion", "VLAN mismatch"], answer: 1, explain: "Without FHRP, one router failure means all hosts on that subnet lose their gateway." }]
  },

  // 3.5.b — HSRP
  "3.5.b": {
    difficulty: 45, studyTime: 30, examFreq: 55,
    why: "HSRP is Cisco proprietary and the most commonly tested FHRP on the CCNA. Know the roles, virtual MAC format, timers, and priority.",
    ciscoIntent: "Describe HSRP operation, roles, and key parameters",
    cheatSheet: [{ heading: "HSRP (Hot Standby Router Protocol)", items: [
      "Cisco proprietary. Two roles: Active (forwards traffic) and Standby (ready to take over).",
      "Virtual IP configured on both routers: <code>standby 1 ip 10.1.1.1</code>",
      "Virtual MAC: <code>0000.0c07.acXX</code> (XX = HSRP group number in hex)",
      "Default priority = 100. Higher priority = more likely to be Active.",
      "<code>standby 1 priority 110</code> — set priority",
      "Hello timer = 3 sec, Hold timer = 10 sec (3x hello)",
      "Multicast: 224.0.0.2 (HSRPv1), 224.0.0.102 (HSRPv2)",
      "Preemption OFF by default — must enable with <code>standby 1 preempt</code>"
    ]}],
    prereqs: [{ name: "FHRP purpose", obj: "3.5.a" }],
    resources: [],
    labs: [{ name: "HSRP config lab", desc: "Configure HSRP between two routers, test failover by shutting active router's interface" }],
    vocab: [{ term: "HSRP Active", q: "Which HSRP router forwards traffic for the virtual IP?", options: ["Standby", "Active", "Both (load balance)", "The one with lowest IP"], answer: 1, explain: "Only the Active router responds to ARP for the virtual IP and forwards traffic. Standby monitors and takes over if Active fails." }]
  },

  // 3.5.c — HSRPv2
  "3.5.c": {
    difficulty: 40, studyTime: 20, examFreq: 40,
    why: "HSRPv2 adds IPv6 support and expands the group range. Cisco may test the differences between v1 and v2.",
    ciscoIntent: "Identify HSRPv2 improvements over HSRPv1",
    cheatSheet: [{ heading: "HSRPv2 Improvements", items: [
      "Supports IPv6 (HSRPv1 is IPv4 only)",
      "Group range: 0-4095 (HSRPv1: 0-255)",
      "Virtual MAC: <code>0000.0c9f.fXXX</code> (HSRPv1: 0000.0c07.acXX)",
      "Uses multicast 224.0.0.102 (HSRPv1 uses 224.0.0.2)",
      "Millisecond timer support for faster failover",
      "Enable: <code>standby version 2</code>",
      "v1 and v2 are NOT compatible on the same interface — all routers in a group must match"
    ]}],
    prereqs: [{ name: "HSRP", obj: "3.5.b" }],
    resources: [],
    labs: [],
    vocab: [{ term: "HSRPv2 MAC", q: "What is the virtual MAC format for HSRPv2?", options: ["0000.0c07.acXX", "0000.0c9f.fXXX", "0000.5e00.01XX", "0007.b400.XXYY"], answer: 1, explain: "HSRPv2 uses 0000.0c9f.fXXX (12-bit group). HSRPv1 uses 0000.0c07.acXX (8-bit group)." }]
  },

  // 3.5.d — VRRP
  "3.5.d": {
    difficulty: 40, studyTime: 20, examFreq: 40,
    why: "VRRP is the open-standard alternative to HSRP. Cisco tests whether you can distinguish VRRP from HSRP — roles, MAC format, and preemption default.",
    ciscoIntent: "Describe VRRP and contrast with HSRP",
    cheatSheet: [{ heading: "VRRP (Virtual Router Redundancy Protocol)", items: [
      "IEEE standard (RFC 5798) — vendor-neutral, works on non-Cisco gear",
      "Roles: Master (active, forwards) and Backup (standby)",
      "Virtual MAC: <code>0000.5e00.01XX</code> (XX = VRRP group in hex)",
      "Master can use its real interface IP as the virtual IP (HSRP cannot)",
      "Preemption ON by default (HSRP is OFF by default) — key difference",
      "Default priority = 100. If virtual IP = real IP, priority is forced to 255 (always Master).",
      "Multicast: 224.0.0.18",
      "Hello timer = 1 sec (faster than HSRP's 3 sec default)"
    ]}],
    prereqs: [{ name: "FHRP purpose", obj: "3.5.a" }, { name: "HSRP", obj: "3.5.b" }],
    resources: [],
    labs: [],
    vocab: [{ term: "VRRP vs HSRP", q: "Key difference: VRRP preemption is ___ by default, HSRP preemption is ___ by default.", options: ["OFF / ON", "ON / OFF", "Both ON", "Both OFF"], answer: 1, explain: "VRRP enables preemption by default. HSRP requires 'standby preempt' to enable it. This is a classic exam question." }]
  },

  // 3.5.e — GLBP
  "3.5.e": {
    difficulty: 45, studyTime: 25, examFreq: 35,
    why: "GLBP is unique because it provides load balancing across multiple routers, unlike HSRP/VRRP where only one router forwards traffic.",
    ciscoIntent: "Describe GLBP and its load-balancing advantage",
    cheatSheet: [{ heading: "GLBP (Gateway Load Balancing Protocol)", items: [
      "Cisco proprietary. Provides BOTH redundancy AND load balancing.",
      "AVG (Active Virtual Gateway) — elected, assigns virtual MACs to AVFs",
      "AVF (Active Virtual Forwarder) — each router forwards traffic for its assigned virtual MAC",
      "One virtual IP, multiple virtual MACs — each host gets a different MAC via ARP",
      "Load balancing methods: round-robin (default), weighted, host-dependent",
      "Up to 4 AVFs per GLBP group",
      "Combines the failover of HSRP with traffic distribution across gateways"
    ]}],
    prereqs: [{ name: "FHRP purpose", obj: "3.5.a" }, { name: "HSRP", obj: "3.5.b" }],
    resources: [],
    labs: [],
    vocab: [{ term: "GLBP advantage", q: "What does GLBP provide that HSRP and VRRP do not?", options: ["Faster failover", "Load balancing across multiple gateway routers", "IPv6 support", "Open standard"], answer: 1, explain: "HSRP/VRRP have one active forwarder. GLBP distributes traffic across multiple routers using different virtual MACs." }]
  },

  // 3.5.f — Preemption
  "3.5.f": {
    difficulty: 35, studyTime: 15, examFreq: 45,
    why: "Preemption determines whether a higher-priority router can reclaim the active role after recovering from a failure. The default differs between HSRP and VRRP.",
    ciscoIntent: "Explain FHRP preemption behavior",
    cheatSheet: [{ heading: "FHRP Preemption", items: [
      "Preemption = higher-priority router takes back the active/master role when it comes back online",
      "HSRP: preemption is OFF by default. Enable: <code>standby 1 preempt</code>",
      "VRRP: preemption is ON by default. Disable: <code>no vrrp 1 preempt</code>",
      "Without preemption (HSRP default): if Active fails and Standby takes over, the original Active does NOT reclaim when it returns",
      "With preemption: original Active recovers, sees it has higher priority, and takes back the role",
      "Preemption delay: <code>standby 1 preempt delay minimum 30</code> — wait 30 sec before preempting (prevents flapping)"
    ]}],
    prereqs: [{ name: "HSRP", obj: "3.5.b" }, { name: "VRRP", obj: "3.5.d" }],
    resources: [],
    labs: [],
    vocab: [{ term: "Preemption", q: "HSRP Router A (priority 110) fails, Router B (priority 100) becomes Active. Router A recovers. What happens with default settings?", options: ["A immediately becomes Active again", "B stays Active — HSRP preemption is off by default", "They negotiate", "Both become Active"], answer: 1, explain: "HSRP preemption is disabled by default. B remains Active until manually changed or preemption is enabled." }]
  },

  // ── Domain 4 ALL entries (sub-keyed) ─────────────────────────────

  // 4.1.a — NAT terminology
  "4.1.a": {
    difficulty: 50, studyTime: 25, examFreq: 65,
    why: "NAT terminology (inside local, inside global, etc.) is confusing and heavily tested. Getting the four terms right is half the NAT battle.",
    ciscoIntent: "Define and distinguish the four NAT address types",
    cheatSheet: [{ heading: "NAT Address Types", items: [
      "Inside Local — private IP on the inside host (e.g., 192.168.1.10)",
      "Inside Global — public IP representing the inside host on the internet (e.g., 203.0.113.10)",
      "Outside Local — IP used for outside host as seen from inside (usually same as Outside Global)",
      "Outside Global — real public IP of the outside host (e.g., 8.8.8.8)",
      "Think: Inside/Outside = which side of the network. Local/Global = before/after translation.",
      "Most exam questions focus on Inside Local (private) vs Inside Global (public after NAT)"
    ]}],
    prereqs: [{ name: "Private IPs", obj: "1.7" }],
    resources: [],
    labs: [],
    vocab: [{ term: "Inside Global", q: "What is the 'inside global' address?", options: ["Private IP of the inside host", "Public IP representing the inside host after NAT translation", "IP of the outside server", "Gateway IP"], answer: 1, explain: "Inside Global = the public address the inside host appears as on the internet. It's the translated address." }]
  },

  // 4.1.b — Static NAT
  "4.1.b": {
    difficulty: 45, studyTime: 20, examFreq: 60,
    why: "Static NAT maps one private IP to one public IP permanently. It is used for servers that need to be reachable from outside.",
    ciscoIntent: "Configure static NAT one-to-one mapping",
    cheatSheet: [{ heading: "Static NAT", items: [
      "<code>ip nat inside source static 192.168.1.10 203.0.113.10</code>",
      "One-to-one permanent mapping — inside local to inside global",
      "Used for servers that must be reachable from the internet (web, email, DNS)",
      "The mapping exists in the NAT table at all times, not just when traffic flows",
      "Requires <code>ip nat inside</code> and <code>ip nat outside</code> on appropriate interfaces",
      "Verify: <code>show ip nat translations</code> shows the static entry even with no active sessions"
    ]}],
    prereqs: [{ name: "NAT terminology", obj: "4.1.a" }],
    resources: [],
    labs: [{ name: "Static NAT lab", desc: "Map internal server to public IP, verify external reachability" }],
    vocab: [{ term: "Static NAT", q: "When is static NAT the right choice?", options: ["Large number of clients needing internet", "A server that must always be reachable from outside at a fixed public IP", "Temporary connections", "Load balancing"], answer: 1, explain: "Static NAT provides a permanent, predictable mapping for servers that need inbound connections from the internet." }]
  },

  // 4.1.c — Dynamic NAT
  "4.1.c": {
    difficulty: 55, studyTime: 30, examFreq: 50,
    why: "Dynamic NAT uses a pool of public IPs and assigns them on demand. It is less common than PAT but Cisco tests the full command syntax.",
    ciscoIntent: "Configure dynamic NAT with a pool",
    cheatSheet: [{ heading: "Dynamic NAT", items: [
      "Step 1: Define pool: <code>ip nat pool MYPOOL 203.0.113.1 203.0.113.10 netmask 255.255.255.0</code>",
      "Step 2: Define ACL: <code>access-list 1 permit 192.168.1.0 0.0.0.255</code>",
      "Step 3: Bind: <code>ip nat inside source list 1 pool MYPOOL</code>",
      "Assigns a public IP from the pool per inside host — one-to-one but temporary",
      "If all pool addresses are in use, new connections are DROPPED (no overload)",
      "Pool addresses return to the pool when the NAT translation times out (default 24 hours)"
    ]}],
    prereqs: [{ name: "NAT terminology", obj: "4.1.a" }, { name: "ACLs", obj: "5.6" }],
    resources: [],
    labs: [{ name: "Dynamic NAT lab", desc: "Create pool of 5 IPs for 10 hosts — observe what happens when pool exhausts" }],
    vocab: [{ term: "Dynamic NAT exhaustion", q: "What happens when all addresses in a dynamic NAT pool are in use?", options: ["PAT kicks in automatically", "New connections are dropped", "The pool doubles", "Addresses are shared"], answer: 1, explain: "Without the 'overload' keyword, when the pool runs out, new inside hosts cannot get translated and their traffic is dropped." }]
  },

  // 4.1.d — PAT (overload)
  "4.1.d": {
    difficulty: 55, studyTime: 25, examFreq: 70,
    why: "PAT is the most commonly used NAT type in the real world. The 'overload' keyword is what makes it work, and Cisco loves testing this.",
    ciscoIntent: "Configure PAT and explain how port numbers enable many-to-one translation",
    cheatSheet: [{ heading: "PAT (Port Address Translation)", items: [
      "<code>ip nat inside source list 1 pool MYPOOL overload</code> — PAT with pool",
      "<code>ip nat inside source list 1 interface GigabitEthernet0/1 overload</code> — PAT with interface IP",
      "The 'overload' keyword enables PAT — many inside hosts share one public IP",
      "Differentiates sessions using unique source port numbers (e.g., 192.168.1.10:49152 vs 192.168.1.11:49153)",
      "Most common NAT in production — home routers use PAT",
      "Supports up to ~65,000 concurrent translations per public IP (port number space)"
    ]}],
    prereqs: [{ name: "Dynamic NAT", obj: "4.1.c" }],
    resources: [],
    labs: [{ name: "PAT lab", desc: "Configure PAT using the outside interface IP, verify multiple hosts sharing one public IP" }],
    vocab: [{ term: "PAT overload", q: "How does PAT distinguish traffic from multiple inside hosts sharing one public IP?", options: ["Different destination IPs", "Unique source port numbers per translation", "MAC addresses", "VLAN tags"], answer: 1, explain: "PAT tracks each session by assigning a unique source port to each translation entry." }]
  },

  // 4.1.e — Interface designations
  "4.1.e": {
    difficulty: 35, studyTime: 15, examFreq: 55,
    why: "Forgetting ip nat inside or ip nat outside is the #1 NAT configuration mistake. Both must be set or NAT silently does nothing.",
    ciscoIntent: "Apply correct NAT interface designations",
    cheatSheet: [{ heading: "NAT Interface Designations", items: [
      "<code>interface GigabitEthernet0/0</code> then <code>ip nat inside</code> — LAN-facing interface",
      "<code>interface GigabitEthernet0/1</code> then <code>ip nat outside</code> — WAN-facing interface",
      "Both designations are REQUIRED — NAT does not work without both",
      "Inside = where private hosts live. Outside = where the public network is.",
      "Multiple inside interfaces are allowed (e.g., multiple VLANs)",
      "Missing either designation = NAT translations never created, traffic passes untranslated"
    ]}],
    prereqs: [{ name: "NAT terminology", obj: "4.1.a" }],
    resources: [],
    labs: [],
    vocab: [{ term: "NAT interface", q: "NAT is configured but not translating. What is the most likely missing step?", options: ["No ACL", "Missing ip nat inside or ip nat outside on the interface", "Wrong pool size", "MTU mismatch"], answer: 1, explain: "The most common NAT misconfiguration is forgetting to designate interfaces as inside or outside." }]
  },

  // 4.1.f — ACL for NAT
  "4.1.f": {
    difficulty: 40, studyTime: 20, examFreq: 50,
    why: "The ACL in dynamic NAT/PAT defines WHICH inside hosts get translated. A wrong ACL means some hosts can't reach the internet.",
    ciscoIntent: "Use an ACL to select traffic for NAT translation",
    cheatSheet: [{ heading: "ACL for NAT", items: [
      "<code>access-list 1 permit 192.168.1.0 0.0.0.255</code> — standard ACL matching inside hosts",
      "The ACL does NOT filter traffic — it selects which sources get NAT translated",
      "Only packets matching the ACL 'permit' entries are translated",
      "Packets not matching the ACL pass through untranslated (not dropped by NAT)",
      "Can use named ACL: <code>ip access-list standard NAT-HOSTS</code> then <code>permit 192.168.0.0 0.0.255.255</code>",
      "Bind: <code>ip nat inside source list NAT-HOSTS pool MYPOOL overload</code>"
    ]}],
    prereqs: [{ name: "ACLs", obj: "5.6" }, { name: "NAT terminology", obj: "4.1.a" }],
    resources: [],
    labs: [],
    vocab: [{ term: "NAT ACL", q: "What does the ACL in a NAT configuration control?", options: ["Which traffic is blocked", "Which inside source addresses get translated", "Which outside destinations are reachable", "QoS marking"], answer: 1, explain: "The NAT ACL selects which inside source IPs are eligible for translation. It does not block traffic." }]
  },

  // 4.1.g — NAT verification
  "4.1.g": {
    difficulty: 40, studyTime: 20, examFreq: 55,
    why: "Cisco tests whether you can read the output of show ip nat translations and show ip nat statistics to verify NAT operation.",
    ciscoIntent: "Verify NAT configuration and translations",
    cheatSheet: [{ heading: "NAT Verification", items: [
      "<code>show ip nat translations</code> — active translations: inside local/global, outside local/global, protocol/port",
      "<code>show ip nat statistics</code> — total translations, hits, misses, expired, pool usage",
      "Static entries appear even with no active sessions. Dynamic entries appear only while active.",
      "High miss count = ACL not matching or pool exhausted",
      "<code>clear ip nat translation *</code> — flush all dynamic translations (static entries remain)",
      "<code>show running-config | include nat</code> — verify all NAT-related config lines"
    ]}],
    prereqs: [{ name: "Static NAT", obj: "4.1.b" }, { name: "PAT", obj: "4.1.d" }],
    resources: [],
    labs: [{ name: "NAT verification lab", desc: "Generate traffic, read show ip nat translations output, identify inside local/global pairs" }],
    vocab: [{ term: "NAT statistics", q: "In 'show ip nat statistics', what does a high miss count indicate?", options: ["NAT is working perfectly", "Translations are expiring normally", "Traffic is not matching the NAT ACL or the pool is exhausted", "The router is overloaded"], answer: 2, explain: "Misses mean NAT could not translate — either the ACL didn't match the source or the pool had no available addresses." }]
  },

  // 4.1.h — NAT troubleshooting
  "4.1.h": {
    difficulty: 50, studyTime: 25, examFreq: 45,
    why: "NAT troubleshooting requires checking multiple components in order: interfaces, ACL, pool, and translations. Cisco tests systematic debugging.",
    ciscoIntent: "Troubleshoot common NAT issues",
    cheatSheet: [{ heading: "NAT Troubleshooting", items: [
      "<code>debug ip nat</code> — shows real-time translation events (use carefully in production)",
      "Check 1: Are interfaces marked? <code>show ip nat statistics</code> shows inside/outside interfaces",
      "Check 2: Does ACL match inside hosts? <code>show access-lists</code>",
      "Check 3: Is pool configured correctly? <code>show ip nat statistics</code> shows pool info",
      "Check 4: <code>clear ip nat translation *</code> — clear stale entries and retest",
      "Common issues: wrong interface designation, ACL not matching, pool exhausted, overlapping subnets"
    ]}],
    prereqs: [{ name: "NAT verification", obj: "4.1.g" }],
    resources: [],
    labs: [{ name: "NAT troubleshooting lab", desc: "Given broken NAT config — find and fix the issue using show and debug commands" }],
    vocab: [{ term: "debug ip nat", q: "What does 'debug ip nat' show?", options: ["NAT pool configuration", "Real-time translation events: source, translated address, and direction", "NAT statistics summary", "ACL entries for NAT"], answer: 1, explain: "debug ip nat shows each packet being translated in real time, including the original and translated addresses." }]
  },

  // 4.2.a — NTP purpose
  "4.2.a": {
    difficulty: 15, studyTime: 10, examFreq: 40,
    why: "Synchronized clocks are essential for log correlation, troubleshooting, certificates, and authentication. Cisco expects you to know why NTP matters.",
    ciscoIntent: "Explain why NTP is critical for network operations",
    cheatSheet: [{ heading: "NTP Purpose", items: [
      "Synchronizes clocks across all network devices",
      "Critical for: syslog correlation, certificate validation, Kerberos authentication, debugging",
      "Without NTP: log timestamps differ, making troubleshooting nearly impossible",
      "Accurate timestamps required for legal compliance and forensic investigations",
      "NTP uses UDP port 123",
      "Typical accuracy: within milliseconds over LAN, within tens of ms over WAN"
    ]}],
    prereqs: [],
    resources: [],
    labs: [],
    vocab: [{ term: "NTP purpose", q: "Why is NTP important for network management?", options: ["Faster routing convergence", "Synchronized timestamps for accurate log correlation and troubleshooting", "Better bandwidth utilization", "VLAN consistency"], answer: 1, explain: "NTP ensures all devices have consistent timestamps, which is essential for correlating logs across devices during troubleshooting." }]
  },

  // 4.2.b — Stratum
  "4.2.b": {
    difficulty: 20, studyTime: 10, examFreq: 35,
    why: "Stratum indicates how far a device is from the reference clock. Cisco tests whether you know the hierarchy and what stratum 16 means.",
    ciscoIntent: "Describe NTP stratum hierarchy",
    cheatSheet: [{ heading: "NTP Stratum", items: [
      "Stratum 0 — atomic clock, GPS receiver (reference clock). Not directly network-accessible.",
      "Stratum 1 — server directly connected to stratum 0 source. Highest accuracy.",
      "Stratum 2 — syncs to stratum 1. Each hop adds +1 to stratum.",
      "Stratum 3-15 — each level further from the source. Still valid.",
      "Stratum 16 — UNSYNCHRONIZED. Clock is not reliable. Cannot serve time.",
      "Lower stratum = more accurate = preferred by NTP clients",
      "Maximum useful stratum = 15. Stratum 16 = unreachable/invalid."
    ]}],
    prereqs: [{ name: "NTP purpose", obj: "4.2.a" }],
    resources: [],
    labs: [],
    vocab: [{ term: "Stratum 16", q: "What does NTP stratum 16 indicate?", options: ["Highly accurate atomic source", "Directly connected to GPS", "The device is unsynchronized — clock is unreliable", "Normal stratum for a client"], answer: 2, explain: "Stratum 16 means the device has no valid time source. It is not synchronized and cannot serve time to others." }]
  },

  // 4.2.c — NTP client
  "4.2.c": {
    difficulty: 15, studyTime: 10, examFreq: 40,
    why: "Configuring an NTP client is a basic IOS command that Cisco tests in configure-and-verify questions.",
    ciscoIntent: "Configure a router as NTP client",
    cheatSheet: [{ heading: "NTP Client Config", items: [
      "<code>ntp server 10.1.1.1</code> — point this device to an NTP server",
      "Can specify multiple servers for redundancy: <code>ntp server 10.1.1.2</code>",
      "<code>ntp server 10.1.1.1 prefer</code> — mark one server as preferred",
      "Client polls the server and adjusts its clock gradually (never jumps abruptly)",
      "After configuring, it may take several minutes to synchronize",
      "Verify: <code>show ntp associations</code> — shows configured servers and sync status"
    ]}],
    prereqs: [{ name: "NTP purpose", obj: "4.2.a" }],
    resources: [],
    labs: [{ name: "NTP client lab", desc: "Configure two routers as NTP clients, verify synchronization" }],
    vocab: [{ term: "ntp server", q: "What does 'ntp server 10.1.1.1' do?", options: ["Makes this device an NTP server", "Points this device to 10.1.1.1 as its time source", "Sets the clock manually", "Enables NTP authentication"], answer: 1, explain: "The 'ntp server' command configures the device as an NTP client, pointing it to the specified server for time synchronization." }]
  },

  // 4.2.d — NTP master
  "4.2.d": {
    difficulty: 25, studyTime: 15, examFreq: 30,
    why: "NTP master makes a router act as an NTP server. Cisco tests the command and when you'd use it (isolated networks without external NTP).",
    ciscoIntent: "Configure a router as NTP master (server)",
    cheatSheet: [{ heading: "NTP Master", items: [
      "<code>ntp master 3</code> — this router becomes an NTP server at stratum 3",
      "Used when no external NTP source is available (isolated lab, air-gapped network)",
      "Default stratum if not specified: 8",
      "The router uses its own internal clock as the reference",
      "Other devices point to this router: <code>ntp server [master-ip]</code>",
      "Not ideal for production — prefer a real stratum 1/2 source when available"
    ]}],
    prereqs: [{ name: "NTP stratum", obj: "4.2.b" }, { name: "NTP client", obj: "4.2.c" }],
    resources: [],
    labs: [{ name: "NTP master lab", desc: "Configure one router as NTP master, two others as clients, verify all sync" }],
    vocab: [{ term: "NTP master", q: "When should you use 'ntp master'?", options: ["Always — every network needs one", "Only when no external NTP source is reachable", "To speed up synchronization", "For NTP authentication"], answer: 1, explain: "ntp master is for isolated networks where no external stratum 1/2 server exists. The router serves time from its internal clock." }]
  },

  // 4.2.e — NTP authentication
  "4.2.e": {
    difficulty: 30, studyTime: 15, examFreq: 25,
    why: "NTP authentication prevents rogue time sources from poisoning the network clock. Cisco tests the three commands needed.",
    ciscoIntent: "Configure NTP authentication",
    cheatSheet: [{ heading: "NTP Authentication", items: [
      "Step 1: <code>ntp authenticate</code> — enable NTP authentication globally",
      "Step 2: <code>ntp authentication-key 1 md5 MySecretKey</code> — define the key",
      "Step 3: <code>ntp trusted-key 1</code> — trust this key ID",
      "On client: <code>ntp server 10.1.1.1 key 1</code> — associate key with server",
      "All three commands required — missing any one breaks authentication",
      "Prevents accepting time from untrusted/rogue NTP sources"
    ]}],
    prereqs: [{ name: "NTP client", obj: "4.2.c" }],
    resources: [],
    labs: [],
    vocab: [{ term: "NTP authentication", q: "Which three commands are needed for NTP authentication?", options: ["ntp authenticate, ntp authentication-key, ntp trusted-key", "ntp server, ntp key, ntp verify", "ntp enable, ntp password, ntp check", "ntp auth-mode, ntp secret, ntp validate"], answer: 0, explain: "All three are required: enable authentication, define the key, and mark it as trusted." }]
  },

  // 4.2.f — NTP verification
  "4.2.f": {
    difficulty: 20, studyTime: 10, examFreq: 35,
    why: "You must be able to verify NTP is working. Cisco shows output from show ntp commands and asks you to interpret it.",
    ciscoIntent: "Verify NTP synchronization status",
    cheatSheet: [{ heading: "NTP Verification", items: [
      "<code>show ntp status</code> — synchronized/unsynchronized, stratum, reference clock IP",
      "<code>show ntp associations</code> — lists all configured servers, their stratum, and sync symbol",
      "In associations: * = synced to this server, + = candidate, - = outlier, ~ = configured",
      "<code>show clock</code> — current device time (verify it matches expected)",
      "<code>show clock detail</code> — shows time source (NTP, user, hardware)",
      "If 'unsynchronized' in show ntp status: check connectivity, authentication, stratum > 15"
    ]}],
    prereqs: [{ name: "NTP client", obj: "4.2.c" }],
    resources: [],
    labs: [],
    vocab: [{ term: "NTP associations", q: "In 'show ntp associations', what does the * symbol mean?", options: ["Configured but not synced", "Currently synchronized to this server", "Rejected server", "Authentication failed"], answer: 1, explain: "* means this is the NTP server the device is currently synchronized with." }]
  },

  // 4.3.a — DHCP DORA
  "4.3.a": {
    difficulty: 30, studyTime: 20, examFreq: 60,
    why: "The DHCP DORA process is a foundational networking concept. Cisco tests the order, which messages are broadcast, and which are unicast.",
    ciscoIntent: "Describe the four-step DHCP process",
    cheatSheet: [{ heading: "DHCP DORA Process", items: [
      "D — Discover: client broadcasts (255.255.255.255) to find DHCP servers. Source 0.0.0.0.",
      "O — Offer: server unicasts (or broadcasts) an IP offer to the client",
      "R — Request: client broadcasts acceptance of the offer (so all servers know)",
      "A — Acknowledge: server unicasts confirmation + lease details to the client",
      "Discover and Request are BROADCAST. Offer and Ack are typically UNICAST.",
      "Client uses UDP 68 (source), server uses UDP 67 (destination)",
      "If no server responds to Discover, client assigns APIPA (169.254.x.x)"
    ]}],
    prereqs: [{ name: "IPv4 addressing", obj: "1.6" }, { name: "UDP", obj: "1.5" }],
    resources: [],
    labs: [{ name: "DHCP capture lab", desc: "Use Wireshark to capture all 4 DORA messages and identify broadcast vs unicast" }],
    vocab: [{ term: "DHCP broadcast", q: "Which two DHCP messages are sent as broadcasts?", options: ["Offer and Ack", "Discover and Request", "All four", "Only Discover"], answer: 1, explain: "Discover is broadcast because the client has no IP and doesn't know the server. Request is broadcast so all offering servers know which was chosen." }]
  },

  // 4.3.b — DHCP provides
  "4.3.b": {
    difficulty: 20, studyTime: 10, examFreq: 50,
    why: "Knowing what DHCP provides beyond just an IP address is tested. The full set of parameters is important for troubleshooting.",
    ciscoIntent: "List information provided by DHCP to clients",
    cheatSheet: [{ heading: "DHCP-Provided Parameters", items: [
      "IP address — the host address assigned to the client",
      "Subnet mask — defines the network/host boundary",
      "Default gateway — first-hop router for reaching other networks",
      "DNS server(s) — for name resolution",
      "Lease time — how long the client can use the address (must renew before expiry)",
      "Optional: domain name, WINS server, NTP server, TFTP server (Option 150)",
      "All delivered in the DHCP Offer and Acknowledge messages"
    ]}],
    prereqs: [{ name: "DHCP DORA", obj: "4.3.a" }],
    resources: [],
    labs: [],
    vocab: [{ term: "DHCP parameters", q: "Which of these is NOT typically provided by DHCP?", options: ["IP address", "Subnet mask", "MAC address", "Default gateway"], answer: 2, explain: "MAC addresses are hardware-burned — they are not assigned by DHCP. DHCP provides IP, mask, gateway, DNS, and lease info." }]
  },

  // 4.3.c — DHCP lease renewal
  "4.3.c": {
    difficulty: 25, studyTime: 15, examFreq: 35,
    why: "Cisco tests the lease renewal timers. Know when the client first tries to renew and what happens if the original server is unreachable.",
    ciscoIntent: "Describe DHCP lease lifecycle and renewal",
    cheatSheet: [{ heading: "DHCP Lease Renewal", items: [
      "T1 = 50% of lease time: client unicasts DHCP Request to the original server to renew",
      "T2 = 87.5% of lease time: if original server didn't respond, client broadcasts to ANY server",
      "If no server responds by lease expiry: client releases the IP and starts DORA from scratch",
      "Renewal is a 2-step process: Request (client) and Ack (server) — no Discover/Offer needed",
      "Default lease on Cisco IOS DHCP server: 1 day (86400 seconds)",
      "<code>lease 7</code> — set lease to 7 days in DHCP pool config"
    ]}],
    prereqs: [{ name: "DHCP DORA", obj: "4.3.a" }],
    resources: [],
    labs: [],
    vocab: [{ term: "DHCP T1", q: "At what percentage of the lease does a DHCP client first attempt renewal?", options: ["25%", "50%", "75%", "87.5%"], answer: 1, explain: "At 50% (T1), the client unicasts a renewal request to the original server. At 87.5% (T2), it broadcasts." }]
  },

  // 4.3.d — DNS record types
  "4.3.d": {
    difficulty: 30, studyTime: 20, examFreq: 45,
    why: "DNS record types appear on the exam. You must know what each record type resolves and when it is used.",
    ciscoIntent: "Identify common DNS record types and their purposes",
    cheatSheet: [{ heading: "DNS Record Types", items: [
      "A — maps hostname to IPv4 address (e.g., www.example.com -> 93.184.216.34)",
      "AAAA — maps hostname to IPv6 address (quad-A for 4x the bits)",
      "CNAME — alias, maps one name to another (e.g., www -> server1.example.com)",
      "MX — mail exchanger, directs email to the correct mail server",
      "PTR — reverse DNS, maps IP to hostname (used in reverse lookup zones)",
      "NS — nameserver record, delegates a zone to a DNS server",
      "SOA — Start of Authority, contains zone info (serial, refresh, retry, expire)"
    ]}],
    prereqs: [],
    resources: [],
    labs: [],
    vocab: [{ term: "DNS records", q: "Which DNS record maps a hostname to an IPv6 address?", options: ["A", "AAAA", "CNAME", "MX"], answer: 1, explain: "AAAA (quad-A) records resolve hostnames to IPv6 addresses. A records are for IPv4." }]
  },

  // 4.3.e — DNS resolution
  "4.3.e": {
    difficulty: 30, studyTime: 20, examFreq: 40,
    why: "Understanding recursive vs iterative DNS resolution is a conceptual question Cisco likes. Know who does the work in each model.",
    ciscoIntent: "Distinguish recursive and iterative DNS queries",
    cheatSheet: [{ heading: "DNS Resolution", items: [
      "Recursive query — client asks resolver to do ALL the work and return the final answer",
      "The resolver queries root -> TLD -> authoritative servers on behalf of the client",
      "Iterative query — server responds with a referral (next server to ask), client does the walking",
      "In practice: client -> recursive resolver (does iterative queries to root/TLD/auth)",
      "DNS caching reduces repeated lookups — TTL controls how long to cache",
      "<code>nslookup www.example.com</code> or <code>dig www.example.com</code> to test resolution"
    ]}],
    prereqs: [{ name: "DNS records", obj: "4.3.d" }],
    resources: [],
    labs: [],
    vocab: [{ term: "Recursive query", q: "In recursive DNS resolution, who does the heavy lifting?", options: ["The client device", "The recursive resolver (does all lookups for the client)", "The root server", "The authoritative server"], answer: 1, explain: "The recursive resolver does all the iterative queries to root, TLD, and authoritative servers, then returns the final answer to the client." }]
  },

  // 4.3.f — DNS hierarchy
  "4.3.f": {
    difficulty: 25, studyTime: 15, examFreq: 35,
    why: "Cisco tests the DNS hierarchy — root, TLD, second-level, and host. Understanding the tree structure helps with troubleshooting.",
    ciscoIntent: "Describe the DNS hierarchical structure",
    cheatSheet: [{ heading: "DNS Hierarchy", items: [
      "Root (.) — 13 root server clusters (a.root-servers.net through m.root-servers.net)",
      "TLD — Top Level Domain (.com, .org, .net, .edu, .gov, country codes like .uk, .jp)",
      "Second-level — registered domain (example.com, cisco.com)",
      "Host/subdomain — specific host (www.example.com, mail.example.com)",
      "Resolution flows: root -> TLD -> second-level -> host (if iterative)",
      "FQDN (Fully Qualified Domain Name): www.example.com. (trailing dot = root)"
    ]}],
    prereqs: [],
    resources: [],
    labs: [],
    vocab: [{ term: "DNS hierarchy", q: "What is the correct DNS resolution order from top to bottom?", options: ["Host -> TLD -> Root", "Root -> TLD -> Second-level -> Host", "TLD -> Root -> Host", "Second-level -> Root -> TLD"], answer: 1, explain: "DNS is hierarchical: Root (.) delegates to TLD (.com), which delegates to second-level (example.com), which resolves the host (www)." }]
  },

  // 4.4.a — SNMP architecture
  "4.4.a": {
    difficulty: 30, studyTime: 20, examFreq: 40,
    why: "SNMP's three components (manager, agent, MIB) and their roles are fundamental exam knowledge.",
    ciscoIntent: "Describe the SNMP management architecture",
    cheatSheet: [{ heading: "SNMP Architecture", items: [
      "SNMP Manager (NMS) — centralized station that polls agents and receives traps",
      "SNMP Agent — software on the managed device (router, switch) that responds to queries",
      "MIB (Management Information Base) — hierarchical database of OIDs (object identifiers)",
      "Manager polls agents for data (pull model) OR agent sends traps/informs to manager (push model)",
      "SNMP uses UDP: port 161 (agent receives queries) and port 162 (manager receives traps)",
      "OID example: 1.3.6.1.2.1.1.5.0 = sysName (device hostname)"
    ]}],
    prereqs: [{ name: "UDP", obj: "1.5" }],
    resources: [],
    labs: [],
    vocab: [{ term: "SNMP components", q: "Which SNMP component runs on the managed device?", options: ["Manager", "Agent", "MIB", "Trap receiver"], answer: 1, explain: "The agent runs on the device being managed. It collects data and responds to manager queries or sends traps." }]
  },

  // 4.4.b — SNMP messages
  "4.4.b": {
    difficulty: 35, studyTime: 20, examFreq: 35,
    why: "Cisco tests whether you know the SNMP message types — Get, GetNext, GetBulk, Set, Trap, and Inform — and when each is used.",
    ciscoIntent: "Identify SNMP operations and message types",
    cheatSheet: [{ heading: "SNMP Messages", items: [
      "Get — read a single OID value from the agent",
      "GetNext — read the next OID in the MIB tree (used to 'walk' the MIB)",
      "GetBulk — retrieve large amounts of data at once (SNMPv2c+, more efficient)",
      "Set — write/change a value on the agent (requires read-write community or auth)",
      "Trap — agent sends unsolicited alert to manager. Unreliable (no ack).",
      "Inform — like Trap but with acknowledgment. Manager confirms receipt. More reliable.",
      "Get/Set = manager-initiated (pull). Trap/Inform = agent-initiated (push)."
    ]}],
    prereqs: [{ name: "SNMP architecture", obj: "4.4.a" }],
    resources: [],
    labs: [],
    vocab: [{ term: "Trap vs Inform", q: "What is the key difference between SNMP Trap and Inform?", options: ["Trap is encrypted, Inform is not", "Trap has no acknowledgment, Inform is acknowledged by the manager", "Trap is from manager, Inform is from agent", "No difference"], answer: 1, explain: "Traps are fire-and-forget (unreliable). Informs require an acknowledgment from the manager, ensuring delivery." }]
  },

  // 4.4.c — SNMPv2c
  "4.4.c": {
    difficulty: 25, studyTime: 15, examFreq: 30,
    why: "SNMPv2c uses community strings for access control. Cisco tests whether you know the security limitations.",
    ciscoIntent: "Describe SNMPv2c community string model",
    cheatSheet: [{ heading: "SNMPv2c", items: [
      "Uses community strings as passwords — cleartext, no encryption",
      "Read-Only (RO) community: allows Get operations only (default: 'public')",
      "Read-Write (RW) community: allows Get AND Set operations (default: 'private')",
      "<code>snmp-server community MyString RO</code> — configure RO community",
      "<code>snmp-server community MySecret RW</code> — configure RW community",
      "NEVER use defaults ('public'/'private') in production — easily guessed",
      "Community strings sent in plaintext — vulnerable to sniffing"
    ]}],
    prereqs: [{ name: "SNMP architecture", obj: "4.4.a" }],
    resources: [],
    labs: [],
    vocab: [{ term: "SNMPv2c security", q: "What is the main security weakness of SNMPv2c?", options: ["No GetBulk support", "Community strings sent in cleartext — no encryption", "Cannot send traps", "Only supports IPv4"], answer: 1, explain: "SNMPv2c transmits community strings in cleartext, making them easily intercepted." }]
  },

  // 4.4.d — SNMPv3 security levels
  "4.4.d": {
    difficulty: 40, studyTime: 25, examFreq: 40,
    why: "SNMPv3's three security levels are a classic exam question. Know what each level provides and when to use authPriv.",
    ciscoIntent: "Describe SNMPv3 security levels",
    cheatSheet: [{ heading: "SNMPv3 Security Levels", items: [
      "noAuthNoPriv — username only, no authentication hash, no encryption. Barely better than v2c.",
      "authNoPriv — username + authentication (MD5 or SHA hash). No encryption of payload.",
      "authPriv — username + authentication (SHA) + encryption (DES or AES). Full security.",
      "authPriv is the recommended level for production networks",
      "SNMPv3 uses usernames instead of community strings",
      "Groups define which security level and MIB access users get",
      "Config: <code>snmp-server group ADMIN v3 priv</code> then <code>snmp-server user admin1 ADMIN v3 auth sha MyAuth priv aes 128 MyPriv</code>"
    ]}],
    prereqs: [{ name: "SNMPv2c", obj: "4.4.c" }],
    resources: [],
    labs: [],
    vocab: [{ term: "SNMPv3 authPriv", q: "What does SNMPv3 authPriv provide?", options: ["Authentication only", "Encryption only", "Authentication AND encryption of SNMP messages", "Same as v2c with community strings"], answer: 2, explain: "authPriv = authentication (SHA/MD5 verifies identity) + privacy (AES/DES encrypts the data). Full protection." }]
  },

  // 4.4.e — SNMPv3 is the only version with encryption
  "4.4.e": {
    difficulty: 20, studyTime: 10, examFreq: 30,
    why: "This is a simple but critical fact: only SNMPv3 offers encryption. Cisco loves this as a quick-answer question.",
    ciscoIntent: "Identify SNMPv3 as the only version with encryption",
    cheatSheet: [{ heading: "SNMPv3 Encryption", items: [
      "SNMPv1 — community strings in plaintext. No encryption. No real auth.",
      "SNMPv2c — community strings in plaintext. GetBulk added. Still no encryption.",
      "SNMPv3 — the ONLY version with encryption (AES/DES) and real authentication (SHA/MD5)",
      "Best practice: always use SNMPv3 authPriv in production",
      "If the exam asks 'which SNMP version supports encryption?' — answer is ALWAYS v3",
      "Disable v1/v2c when v3 is available: <code>no snmp-server community [string]</code>"
    ]}],
    prereqs: [{ name: "SNMPv3 levels", obj: "4.4.d" }],
    resources: [],
    labs: [],
    vocab: [{ term: "SNMP encryption", q: "Which SNMP version supports encryption?", options: ["v1", "v2c", "v3 only", "All versions"], answer: 2, explain: "Only SNMPv3 (at authPriv level) provides encryption. v1 and v2c send everything in cleartext." }]
  },

  // 4.5.a — Level 0 Emergency
  "4.5.a": {
    difficulty: 20, studyTime: 10, examFreq: 45,
    why: "Syslog level 0 is the most severe. Memorizing all 8 levels is required for the CCNA exam.",
    ciscoIntent: "Identify syslog severity level 0",
    cheatSheet: [{ heading: "Syslog Level 0 — Emergency", items: [
      "Level 0 = Emergency: system is unusable",
      "Most severe level — indicates total system failure",
      "Example: hardware failure rendering the device inoperable",
      "Mnemonic position: (E)very — first letter in 'Every Awesome Cisco Engineer Will Need Ice cream Daily'",
      "<code>logging trap emergencies</code> or <code>logging trap 0</code>",
      "Setting logging trap to level 0 captures ONLY emergencies — nothing else"
    ]}],
    prereqs: [],
    resources: [],
    labs: [],
    vocab: [{ term: "Level 0", q: "What does syslog level 0 (Emergency) indicate?", options: ["Minor warning", "Debugging info", "System is unusable", "Normal operation"], answer: 2, explain: "Level 0 = Emergency = system is completely unusable. This is the most critical severity." }]
  },

  // 4.5.b — Level 1 Alert
  "4.5.b": {
    difficulty: 20, studyTime: 10, examFreq: 45,
    why: "Level 1 means immediate human action is needed. Each level has a distinct meaning that Cisco can ask about.",
    ciscoIntent: "Identify syslog severity level 1",
    cheatSheet: [{ heading: "Syslog Level 1 — Alert", items: [
      "Level 1 = Alert: immediate action needed",
      "System is functioning but a critical condition requires urgent attention",
      "Example: temperature threshold exceeded, power supply failure imminent",
      "Mnemonic position: Every (A)wesome — second word",
      "<code>logging trap alerts</code> or <code>logging trap 1</code>",
      "Captures levels 0-1 (emergency + alert)"
    ]}],
    prereqs: [],
    resources: [],
    labs: [],
    vocab: [{ term: "Level 1", q: "Syslog level 1 (Alert) means:", options: ["System crashed", "Immediate action needed — critical condition", "Minor warning", "Debug output"], answer: 1, explain: "Alert = immediate human intervention required. Not yet unusable (that's level 0), but heading there fast." }]
  },

  // 4.5.c — Level 2 Critical
  "4.5.c": {
    difficulty: 20, studyTime: 10, examFreq: 45,
    why: "Level 2 Critical covers hardware failures and other severe conditions. Cisco tests all 8 levels.",
    ciscoIntent: "Identify syslog severity level 2",
    cheatSheet: [{ heading: "Syslog Level 2 — Critical", items: [
      "Level 2 = Critical: critical conditions",
      "Serious failure in a primary system component",
      "Example: memory allocation failure, fan failure, dual power supply down to single",
      "Mnemonic position: Every Awesome (C)isco — third word",
      "<code>logging trap critical</code> or <code>logging trap 2</code>",
      "Captures levels 0-2"
    ]}],
    prereqs: [],
    resources: [],
    labs: [],
    vocab: [{ term: "Level 2", q: "Which syslog level represents 'Critical conditions'?", options: ["0", "1", "2", "3"], answer: 2, explain: "Level 2 = Critical. Remember: 0=Emergency, 1=Alert, 2=Critical, 3=Error." }]
  },

  // 4.5.d — Level 3 Error
  "4.5.d": {
    difficulty: 20, studyTime: 10, examFreq: 45,
    why: "Level 3 Error is where most operational issues show up. Cisco tests whether you can place it in the severity hierarchy.",
    ciscoIntent: "Identify syslog severity level 3",
    cheatSheet: [{ heading: "Syslog Level 3 — Error", items: [
      "Level 3 = Error: error conditions",
      "Something is broken but the system is still running",
      "Example: interface went down, OSPF adjacency lost, disk write failure",
      "Mnemonic position: Every Awesome Cisco (E)ngineer — fourth word",
      "<code>logging trap errors</code> or <code>logging trap 3</code>",
      "Captures levels 0-3"
    ]}],
    prereqs: [],
    resources: [],
    labs: [],
    vocab: [{ term: "Level 3", q: "An interface going down would generate what syslog level?", options: ["0 — Emergency", "3 — Error", "5 — Notification", "7 — Debug"], answer: 1, explain: "Interface down is typically level 3 (Error) — something failed but the router still operates." }]
  },

  // 4.5.e — Level 4 Warning
  "4.5.e": {
    difficulty: 20, studyTime: 10, examFreq: 45,
    why: "Level 4 Warning is a heads-up that something might become a problem. This is a common exam question because it sits right in the middle.",
    ciscoIntent: "Identify syslog severity level 4",
    cheatSheet: [{ heading: "Syslog Level 4 — Warning", items: [
      "Level 4 = Warning: warning conditions",
      "Not yet an error, but something to watch — could escalate",
      "Example: configuration change, resource approaching threshold (memory 80%), crypto key nearing expiry",
      "Mnemonic position: Every Awesome Cisco Engineer (W)ill — fifth word",
      "<code>logging trap warnings</code> or <code>logging trap 4</code>",
      "Captures levels 0-4. This is a common production logging level."
    ]}],
    prereqs: [],
    resources: [],
    labs: [],
    vocab: [{ term: "Level 4", q: "What syslog level means 'Warning conditions'?", options: ["3", "4", "5", "6"], answer: 1, explain: "Level 4 = Warning. Not yet broken but worth attention. 3=Error, 5=Notification, 6=Informational." }]
  },

  // 4.5.f — Level 5 Notification
  "4.5.f": {
    difficulty: 20, studyTime: 10, examFreq: 45,
    why: "Level 5 is 'normal but significant' — things like interface up, OSPF adjacency formed. Cisco tests whether you can distinguish it from Warning and Informational.",
    ciscoIntent: "Identify syslog severity level 5",
    cheatSheet: [{ heading: "Syslog Level 5 — Notification", items: [
      "Level 5 = Notification: normal but significant condition",
      "Not an error or warning — just noteworthy events",
      "Example: interface came back up, OSPF neighbor established, user login, reload scheduled",
      "Mnemonic position: Every Awesome Cisco Engineer Will (N)eed — sixth word",
      "<code>logging trap notifications</code> or <code>logging trap 5</code>",
      "Captures levels 0-5. Good baseline for general monitoring."
    ]}],
    prereqs: [],
    resources: [],
    labs: [],
    vocab: [{ term: "Level 5", q: "OSPF neighbor coming up generates what syslog level?", options: ["3 — Error", "4 — Warning", "5 — Notification", "6 — Informational"], answer: 2, explain: "Neighbor up is normal but significant = level 5 Notification." }]
  },

  // 4.5.g — Level 6 Informational
  "4.5.g": {
    difficulty: 20, studyTime: 10, examFreq: 45,
    why: "Level 6 is informational — routine operational messages. Cisco tests whether you know this is the second-lowest severity.",
    ciscoIntent: "Identify syslog severity level 6",
    cheatSheet: [{ heading: "Syslog Level 6 — Informational", items: [
      "Level 6 = Informational: informational messages",
      "Routine messages about normal operations",
      "Example: ACL match log output, interface description change, NTP sync status",
      "Mnemonic position: Every Awesome Cisco Engineer Will Need (I)ce cream — seventh word",
      "<code>logging trap informational</code> or <code>logging trap 6</code>",
      "Captures levels 0-6. Common choice for syslog server logging."
    ]}],
    prereqs: [],
    resources: [],
    labs: [],
    vocab: [{ term: "Level 6", q: "What syslog level are routine informational messages?", options: ["5", "6", "7", "4"], answer: 1, explain: "Level 6 = Informational. Routine messages, no action needed." }]
  },

  // 4.5.h — Level 7 Debugging
  "4.5.h": {
    difficulty: 20, studyTime: 10, examFreq: 45,
    why: "Level 7 is the most verbose — debug output. Cisco warns against using it in production because it can overwhelm the CPU.",
    ciscoIntent: "Identify syslog severity level 7",
    cheatSheet: [{ heading: "Syslog Level 7 — Debugging", items: [
      "Level 7 = Debugging: debug-level messages",
      "Most verbose — generated by <code>debug</code> commands",
      "Example: <code>debug ip ospf events</code>, <code>debug ip nat</code>, <code>debug ip icmp</code>",
      "WARNING: debug output is CPU-intensive. Can crash production devices.",
      "Mnemonic position: Every Awesome Cisco Engineer Will Need Ice cream (D)aily — eighth word",
      "<code>logging trap debugging</code> or <code>logging trap 7</code> — captures ALL levels",
      "Best practice: use sparingly, disable with <code>undebug all</code> when done"
    ]}],
    prereqs: [],
    resources: [],
    labs: [],
    vocab: [{ term: "Level 7", q: "Why should 'logging trap 7' be avoided in production?", options: ["It disables other logging", "Debug messages are extremely verbose and CPU-intensive — can degrade performance", "It only captures level 7", "It requires SNMPv3"], answer: 1, explain: "Level 7 captures everything including debug output, which can overwhelm the CPU and fill log storage." }]
  },

  // 4.5.i — Syslog mnemonic
  "4.5.i": {
    difficulty: 15, studyTime: 10, examFreq: 50,
    why: "The mnemonic 'Every Awesome Cisco Engineer Will Need Ice cream Daily' maps to levels 0-7 and makes them easy to recall on exam day.",
    ciscoIntent: "Recall syslog levels using a mnemonic",
    cheatSheet: [{ heading: "Syslog Mnemonic", items: [
      "Every = Emergency (0)",
      "Awesome = Alert (1)",
      "Cisco = Critical (2)",
      "Engineer = Error (3)",
      "Will = Warning (4)",
      "Need = Notification (5)",
      "Ice cream = Informational (6)",
      "Daily = Debugging (7)",
      "Lower number = more severe. Setting a trap level captures that level AND everything above (lower numbers)."
    ]}],
    prereqs: [],
    resources: [],
    labs: [],
    vocab: [{ term: "Syslog mnemonic", q: "Using 'Every Awesome Cisco Engineer Will Need Ice cream Daily', what level is 'Will'?", options: ["3 — Error", "4 — Warning", "5 — Notification", "6 — Informational"], answer: 1, explain: "Will = Warning = Level 4. Count from 0: Every(0), Awesome(1), Cisco(2), Engineer(3), Will(4)." }]
  },

  // 4.5.j — Logging destinations
  "4.5.j": {
    difficulty: 25, studyTime: 15, examFreq: 40,
    why: "Syslog messages can be sent to multiple destinations. Cisco tests the four main destinations and when each is appropriate.",
    ciscoIntent: "Identify syslog logging destinations",
    cheatSheet: [{ heading: "Syslog Destinations", items: [
      "Console — <code>logging console [level]</code>. Messages appear on console port. CPU-intensive at high verbosity.",
      "Terminal (VTY) — <code>terminal monitor</code> command required per VTY session to see messages",
      "Buffer (RAM) — <code>logging buffered [size] [level]</code>. Stored in memory, lost on reboot.",
      "Remote syslog server — <code>logging host [ip]</code>. Persistent, centralized, searchable.",
      "Default: console logging is ON at level 7 (debugging). Very chatty.",
      "Best practice: log to remote server at level 6 (informational) for production monitoring"
    ]}],
    prereqs: [],
    resources: [],
    labs: [],
    vocab: [{ term: "Logging destinations", q: "Which logging destination survives a device reboot?", options: ["Console", "Buffer (RAM)", "Remote syslog server", "Terminal monitor"], answer: 2, explain: "Only the remote syslog server retains logs after reboot. Buffer is in RAM and is cleared." }]
  },

  // 4.5.k — Syslog configuration
  "4.5.k": {
    difficulty: 30, studyTime: 15, examFreq: 40,
    why: "Cisco tests the IOS commands for configuring syslog destinations and severity levels.",
    ciscoIntent: "Configure syslog logging on Cisco IOS",
    cheatSheet: [{ heading: "Syslog Configuration", items: [
      "<code>logging host 10.1.1.100</code> — send syslog messages to remote server at 10.1.1.100",
      "<code>logging trap informational</code> — send levels 0-6 to remote syslog server",
      "<code>logging buffered 16384 warnings</code> — buffer 16KB of level 0-4 messages in RAM",
      "<code>logging console errors</code> — only show level 0-3 on console (reduces console noise)",
      "<code>logging source-interface Loopback0</code> — use loopback as source IP (for reachability)",
      "<code>service timestamps log datetime msec</code> — add timestamps to log messages (essential)",
      "<code>no logging console</code> — disable console logging entirely (for performance)"
    ]}],
    prereqs: [{ name: "Syslog levels", obj: "4.5.a" }, { name: "Logging destinations", obj: "4.5.j" }],
    resources: [],
    labs: [{ name: "Syslog config lab", desc: "Configure logging to buffer and remote server, generate events, verify with show logging" }],
    vocab: [{ term: "logging trap", q: "What does 'logging trap warnings' capture?", options: ["Only level 4", "Levels 0-4 (emergencies through warnings)", "Levels 4-7", "All levels"], answer: 1, explain: "Setting trap to a level captures that level AND all more severe levels (lower numbers). Warnings = 0+1+2+3+4." }]
  },

  // 4.6.a — DHCP client on router
  "4.6.a": {
    difficulty: 15, studyTime: 10, examFreq: 30,
    why: "A router can be a DHCP client. Cisco tests this simple command in configure-and-verify scenarios.",
    ciscoIntent: "Configure a router interface as a DHCP client",
    cheatSheet: [{ heading: "DHCP Client on Router", items: [
      "<code>interface GigabitEthernet0/1</code> then <code>ip address dhcp</code>",
      "The router interface obtains its IP from a DHCP server",
      "Common on WAN interfaces connecting to ISPs (cable modem, DSL)",
      "Verify: <code>show ip interface brief</code> — shows the DHCP-assigned address",
      "Can also see lease info: <code>show dhcp lease</code>",
      "Cannot use <code>ip address dhcp</code> and <code>ip address [static]</code> on the same interface"
    ]}],
    prereqs: [{ name: "DHCP DORA", obj: "4.3.a" }],
    resources: [],
    labs: [],
    vocab: [{ term: "ip address dhcp", q: "What does 'ip address dhcp' on a router interface do?", options: ["Makes the router a DHCP server", "Enables DHCP relay", "The interface obtains its IP address from a DHCP server", "Assigns a static IP"], answer: 2, explain: "ip address dhcp makes the interface a DHCP client — it requests an IP via DORA like any host." }]
  },

  // 4.6.b — DHCP relay (ip helper-address)
  "4.6.b": {
    difficulty: 40, studyTime: 25, examFreq: 55,
    why: "DHCP relay is critical when the DHCP server is on a different subnet. ip helper-address is the command Cisco tests most in the DHCP relay topic.",
    ciscoIntent: "Configure DHCP relay with ip helper-address",
    cheatSheet: [{ heading: "DHCP Relay", items: [
      "<code>interface GigabitEthernet0/0</code> (client-facing interface)",
      "<code>ip helper-address 10.1.1.100</code> — forward DHCP broadcasts to server at 10.1.1.100",
      "Configured on the router interface facing the clients (default gateway interface)",
      "Converts the client's DHCP broadcast into a unicast to the specified server",
      "Can specify multiple helper-addresses for redundant DHCP servers",
      "ip helper-address also forwards other UDP broadcasts: DNS (53), TFTP (69), NTP (123), NetBIOS (137/138), TACACS (49)"
    ]}],
    prereqs: [{ name: "DHCP DORA", obj: "4.3.a" }],
    resources: [],
    labs: [{ name: "DHCP relay lab", desc: "DHCP server on one subnet, clients on another, configure relay on the gateway router" }],
    vocab: [{ term: "ip helper-address", q: "Where is ip helper-address configured?", options: ["On the DHCP server", "On the router interface facing the clients (their default gateway)", "On the client PC", "On the trunk port"], answer: 1, explain: "ip helper-address goes on the interface that is the default gateway for the client subnet." }]
  },

  // 4.6.c — Why relay is needed
  "4.6.c": {
    difficulty: 25, studyTime: 10, examFreq: 45,
    why: "Understanding why DHCP relay exists is fundamental — routers do not forward broadcasts by default, so DHCP Discover cannot cross router boundaries.",
    ciscoIntent: "Explain why DHCP relay is necessary",
    cheatSheet: [{ heading: "Why DHCP Relay?", items: [
      "DHCP Discover is a Layer 2 broadcast (destination 255.255.255.255)",
      "Routers do NOT forward broadcasts between interfaces — broadcasts stay local",
      "If the DHCP server is on a different subnet, Discover never reaches it",
      "Without relay: clients on remote subnets get APIPA (169.254.x.x) — no connectivity",
      "DHCP relay (ip helper-address) solves this by converting broadcast to unicast",
      "The relay agent inserts the gateway IP (giaddr) so the server knows which pool to use"
    ]}],
    prereqs: [{ name: "DHCP DORA", obj: "4.3.a" }],
    resources: [],
    labs: [],
    vocab: [{ term: "DHCP relay need", q: "Why can't a DHCP client on subnet A reach a DHCP server on subnet B without relay?", options: ["The server ignores remote clients", "Routers don't forward broadcasts — DHCP Discover never crosses the router", "DHCP only works on VLAN 1", "The client needs a static IP first"], answer: 1, explain: "Routers are broadcast boundaries. The client's broadcast Discover stops at the router unless ip helper-address forwards it." }]
  },

  // 4.6.d — DHCP server config on router
  "4.6.d": {
    difficulty: 35, studyTime: 20, examFreq: 45,
    why: "Configuring a Cisco router as a DHCP server is a hands-on objective. Know the pool configuration commands.",
    ciscoIntent: "Configure a Cisco IOS DHCP server",
    cheatSheet: [{ heading: "IOS DHCP Server Config", items: [
      "<code>ip dhcp pool LAN-POOL</code> — create and name the pool",
      "<code>network 192.168.1.0 255.255.255.0</code> — define the address range",
      "<code>default-router 192.168.1.1</code> — set the default gateway for clients",
      "<code>dns-server 8.8.8.8</code> — set DNS server for clients",
      "<code>lease 7</code> — set lease to 7 days (default is 1 day)",
      "<code>domain-name example.com</code> — optional: set domain name for clients",
      "Pool automatically excludes network and broadcast addresses"
    ]}],
    prereqs: [{ name: "DHCP DORA", obj: "4.3.a" }],
    resources: [],
    labs: [{ name: "DHCP server lab", desc: "Configure router as DHCP server, connect clients, verify with show ip dhcp binding" }],
    vocab: [{ term: "DHCP pool", q: "Which command sets the default gateway in a DHCP pool?", options: ["ip gateway", "default-router", "gateway-address", "ip default-gateway"], answer: 1, explain: "Inside a DHCP pool, 'default-router' sets the gateway IP that clients receive. Not to be confused with 'ip default-gateway' (for the switch itself)." }]
  },

  // 4.6.e — DHCP excluded addresses
  "4.6.e": {
    difficulty: 25, studyTime: 10, examFreq: 40,
    why: "Excluded addresses prevent the DHCP server from assigning IPs that are already statically assigned (gateway, servers, printers).",
    ciscoIntent: "Configure DHCP excluded addresses",
    cheatSheet: [{ heading: "DHCP Excluded Addresses", items: [
      "<code>ip dhcp excluded-address 192.168.1.1 192.168.1.10</code> — exclude range .1 through .10",
      "<code>ip dhcp excluded-address 192.168.1.254</code> — exclude a single address",
      "Configured in GLOBAL config mode (not inside the DHCP pool)",
      "Prevents conflicts with static IPs: gateways, servers, printers, management interfaces",
      "Always exclude the default gateway IP and any other static devices",
      "If not excluded, DHCP could assign the gateway IP to a client — causing conflicts"
    ]}],
    prereqs: [{ name: "DHCP server config", obj: "4.6.d" }],
    resources: [],
    labs: [],
    vocab: [{ term: "Excluded addresses", q: "Where is 'ip dhcp excluded-address' configured?", options: ["Inside the DHCP pool", "Global configuration mode", "Interface configuration", "Line VTY"], answer: 1, explain: "Excluded addresses are global config commands — not inside the pool. This catches people on the exam." }]
  },

  // 4.6.f — DHCP verification
  "4.6.f": {
    difficulty: 25, studyTime: 15, examFreq: 40,
    why: "Cisco shows output from DHCP show commands and asks you to interpret bindings, pools, and statistics.",
    ciscoIntent: "Verify DHCP server and relay operation",
    cheatSheet: [{ heading: "DHCP Verification", items: [
      "<code>show ip dhcp binding</code> — lists all active leases (IP, MAC, expiration)",
      "<code>show ip dhcp pool</code> — pool stats: total addresses, leased, available, excluded",
      "<code>show ip dhcp server statistics</code> — DORA message counts, discovers, offers, requests, acks",
      "<code>show ip dhcp conflict</code> — addresses that had duplicate IP conflicts",
      "<code>clear ip dhcp binding *</code> — release all active leases",
      "On client: <code>ipconfig /release</code> then <code>ipconfig /renew</code> (Windows) to test"
    ]}],
    prereqs: [{ name: "DHCP server config", obj: "4.6.d" }],
    resources: [],
    labs: [],
    vocab: [{ term: "DHCP binding", q: "What does 'show ip dhcp binding' display?", options: ["DHCP pool configuration", "Active leases — IP address, MAC address, and lease expiration for each client", "DHCP relay settings", "Excluded addresses"], answer: 1, explain: "DHCP bindings show which IP was leased to which MAC address and when the lease expires." }]
  },

  // 4.7.a — QoS Classification
  "4.7.a": {
    difficulty: 35, studyTime: 20, examFreq: 35,
    why: "Classification is the first step in QoS — identifying what type of traffic a packet is. Without classification, you can't apply any QoS policy.",
    ciscoIntent: "Describe QoS traffic classification methods",
    cheatSheet: [{ heading: "QoS Classification", items: [
      "Classification = identifying traffic type so QoS policies can be applied",
      "Methods: ACL (match IP/port), NBAR (deep packet inspection), port number, DSCP value",
      "NBAR (Network-Based Application Recognition) identifies applications at Layer 7",
      "Class-map defines what traffic to match: <code>class-map match-any VOICE</code>",
      "Match criteria: <code>match protocol rtp</code>, <code>match dscp ef</code>, <code>match access-group 100</code>",
      "Classification should happen as close to the source as possible (trust boundary)"
    ]}],
    prereqs: [{ name: "ACLs", obj: "5.6" }],
    resources: [],
    labs: [],
    vocab: [{ term: "Classification", q: "What is the purpose of QoS classification?", options: ["Encrypting traffic", "Identifying traffic types so different QoS policies can be applied", "Blocking unwanted traffic", "Routing optimization"], answer: 1, explain: "Classification identifies traffic (voice, video, data) so the network can treat each type with the appropriate QoS policy." }]
  },

  // 4.7.b — QoS Marking
  "4.7.b": {
    difficulty: 40, studyTime: 25, examFreq: 35,
    why: "Marking tags packets with priority values. Cisco tests CoS vs DSCP and their bit ranges.",
    ciscoIntent: "Describe QoS marking with CoS and DSCP",
    cheatSheet: [{ heading: "QoS Marking", items: [
      "Marking = tagging packets with a priority value after classification",
      "Layer 2 — CoS (Class of Service): 3 bits in 802.1Q tag, values 0-7. Only on trunks.",
      "Layer 3 — DSCP (Differentiated Services Code Point): 6 bits in IP header, values 0-63",
      "DSCP is preferred because it survives L3 routing (CoS is lost when frame is de-encapsulated)",
      "IP Precedence: original 3-bit field (0-7), largely replaced by DSCP",
      "Mark as close to the source as possible to ensure consistent treatment throughout the network"
    ]}],
    prereqs: [{ name: "Classification", obj: "4.7.a" }],
    resources: [],
    labs: [],
    vocab: [{ term: "CoS vs DSCP", q: "Why is DSCP preferred over CoS for QoS marking?", options: ["More values available", "DSCP is in the L3 IP header and survives routing — CoS is L2 only and lost at routers", "DSCP is faster", "CoS is deprecated"], answer: 1, explain: "CoS exists only in the 802.1Q L2 tag. When a router de-encapsulates the frame, CoS is lost. DSCP in the IP header persists." }]
  },

  // 4.7.c — DSCP values
  "4.7.c": {
    difficulty: 45, studyTime: 30, examFreq: 40,
    why: "DSCP values like EF (46) for voice and AF classes are frequently tested. Know the key values and what they mean.",
    ciscoIntent: "Identify key DSCP per-hop behaviors",
    cheatSheet: [{ heading: "DSCP Values", items: [
      "EF (Expedited Forwarding) = DSCP 46 — voice traffic, low loss/delay/jitter, gets priority queue",
      "AF (Assured Forwarding) — 4 classes, 3 drop precedences each: AF11-AF13, AF21-AF23, AF31-AF33, AF41-AF43",
      "AF formula: DSCP = 8 * class + 2 * drop_precedence. AF31 = 8*3 + 2*1 = 26",
      "Higher class = higher priority. Higher drop precedence = dropped first during congestion.",
      "CS (Class Selector) — backward-compatible with IP Precedence: CS0=0, CS1=8, ..., CS7=56",
      "Default/BE (Best Effort) = DSCP 0 — no special treatment",
      "Voice: EF (46). Video: AF41 (34). Signaling: CS3 (24). Bulk data: AF11 (10)."
    ]}],
    prereqs: [{ name: "Marking", obj: "4.7.b" }],
    resources: [],
    labs: [],
    vocab: [{ term: "EF", q: "What DSCP value is used for voice traffic?", options: ["0 (Default)", "26 (AF31)", "46 (EF)", "56 (CS7)"], answer: 2, explain: "EF (Expedited Forwarding) = DSCP 46. Provides low-loss, low-delay treatment for voice." }]
  },

  // 4.7.d — Queuing
  "4.7.d": {
    difficulty: 45, studyTime: 25, examFreq: 35,
    why: "Queuing mechanisms determine how traffic is served when interfaces are congested. LLQ for voice and CBWFQ for guaranteed bandwidth are key concepts.",
    ciscoIntent: "Describe QoS queuing mechanisms",
    cheatSheet: [{ heading: "QoS Queuing", items: [
      "LLQ (Low Latency Queuing) — strict priority queue, always served first. Used for voice/video.",
      "CBWFQ (Class-Based Weighted Fair Queuing) — guarantees minimum bandwidth per class",
      "Without queuing: FIFO (first-in, first-out) — no differentiation, voice suffers during congestion",
      "LLQ is rate-limited to prevent starvation of other classes",
      "Policy-map applies queuing: <code>policy-map QOS-POLICY</code> with <code>priority</code> or <code>bandwidth</code> per class",
      "Applied to interface: <code>service-policy output QOS-POLICY</code>"
    ]}],
    prereqs: [{ name: "DSCP values", obj: "4.7.c" }],
    resources: [],
    labs: [],
    vocab: [{ term: "LLQ", q: "Why is LLQ used for voice traffic?", options: ["It provides best-effort delivery", "It serves voice packets first with strict priority, minimizing delay and jitter", "It drops voice packets last", "It compresses voice packets"], answer: 1, explain: "LLQ (strict priority) ensures voice packets are always transmitted first, which is critical for real-time audio quality." }]
  },

  // 4.7.e — Congestion avoidance (WRED)
  "4.7.e": {
    difficulty: 40, studyTime: 20, examFreq: 30,
    why: "WRED prevents tail drop by randomly dropping packets before the queue is full. Cisco tests the concept — not the config.",
    ciscoIntent: "Describe WRED congestion avoidance",
    cheatSheet: [{ heading: "Congestion Avoidance — WRED", items: [
      "WRED (Weighted Random Early Detection) — proactively drops random packets before queue overflow",
      "Prevents tail drop — where ALL new packets are dropped once queue is full",
      "Tail drop causes TCP global synchronization (all flows slow down simultaneously)",
      "WRED drops lower-priority traffic (higher drop precedence AF values) more aggressively",
      "Result: random drops trigger individual TCP flow slowdowns, not global sync",
      "WRED does NOT apply to voice/video (those use priority queue, not WRED)"
    ]}],
    prereqs: [{ name: "Queuing", obj: "4.7.d" }],
    resources: [],
    labs: [],
    vocab: [{ term: "WRED", q: "What problem does WRED solve?", options: ["Packet encryption", "TCP global synchronization caused by tail drop", "Routing loops", "MTU mismatch"], answer: 1, explain: "Tail drop causes all TCP flows to slow simultaneously. WRED randomly drops packets to trigger individual flow backoffs instead." }]
  },

  // 4.7.f — Policing
  "4.7.f": {
    difficulty: 40, studyTime: 20, examFreq: 30,
    why: "Policing drops or remarks excess traffic immediately. It enforces a hard rate limit, typically at ingress.",
    ciscoIntent: "Describe QoS policing",
    cheatSheet: [{ heading: "QoS Policing", items: [
      "Policing = enforces a hard traffic rate limit. Excess traffic is DROPPED or remarked immediately.",
      "Typically applied at ingress (incoming traffic from untrusted source)",
      "No buffering — excess packets are discarded on the spot",
      "Actions: drop (default), transmit (allow over-limit), or remark to lower DSCP",
      "Used by ISPs to enforce SLA bandwidth limits",
      "Results in bursty, less smooth traffic compared to shaping"
    ]}],
    prereqs: [{ name: "Marking", obj: "4.7.b" }],
    resources: [],
    labs: [],
    vocab: [{ term: "Policing", q: "What does a policer do to traffic exceeding the configured rate?", options: ["Buffers it for later", "Drops or remarks it immediately", "Routes it differently", "Compresses it"], answer: 1, explain: "Policing immediately drops or remarks excess traffic. No buffering, no smoothing — hard enforcement." }]
  },

  // 4.7.g — Shaping
  "4.7.g": {
    difficulty: 40, studyTime: 20, examFreq: 30,
    why: "Shaping buffers excess traffic and sends it when bandwidth is available. Understanding the difference between shaping and policing is a key exam question.",
    ciscoIntent: "Describe QoS shaping and contrast with policing",
    cheatSheet: [{ heading: "QoS Shaping", items: [
      "Shaping = buffers excess traffic in a queue and sends it when bandwidth is available",
      "Produces smooth, consistent output rate — less bursty than policing",
      "Typically applied at egress (outgoing traffic toward WAN/ISP)",
      "Adds delay (buffering) but avoids packet loss",
      "Used when the access rate exceeds the subscribed rate (e.g., 100 Mbps physical, 50 Mbps CIR)",
      "Shaping vs Policing: shaping buffers (smooth, delay), policing drops (hard, no delay)"
    ]}],
    prereqs: [{ name: "Policing", obj: "4.7.f" }],
    resources: [],
    labs: [],
    vocab: [{ term: "Shaping vs Policing", q: "How does shaping handle excess traffic differently than policing?", options: ["Both drop excess", "Shaping buffers excess for later sending; policing drops it immediately", "Policing buffers; shaping drops", "No difference — interchangeable terms"], answer: 1, explain: "Shaping smooths traffic by buffering excess. Policing enforces hard limits by dropping excess. Key distinction for the exam." }]
  },

  // 4.7.h — Trust boundary
  "4.7.h": {
    difficulty: 35, studyTime: 15, examFreq: 30,
    why: "The trust boundary defines where QoS markings are first accepted. Setting it correctly prevents untrusted devices from manipulating QoS.",
    ciscoIntent: "Explain the QoS trust boundary concept",
    cheatSheet: [{ heading: "QoS Trust Boundary", items: [
      "Trust boundary = the point where QoS markings are first trusted/accepted",
      "Markings from untrusted sources should be reclassified or set to 0",
      "Typically: trust markings at the access switch closest to the traffic source",
      "Cisco IP phones are trusted — they mark voice as EF (46) and reclassify PC traffic",
      "PC directly connected to switch = untrusted, reset DSCP to 0",
      "If phone is between PC and switch: trust the phone's markings, re-mark the PC traffic",
      "<code>mls qos trust dscp</code> or <code>mls qos trust cos</code> on the switch port"
    ]}],
    prereqs: [{ name: "Classification", obj: "4.7.a" }, { name: "Marking", obj: "4.7.b" }],
    resources: [],
    labs: [],
    vocab: [{ term: "Trust boundary", q: "Why should the trust boundary be at the access layer switch?", options: ["Faster processing", "Prevents end users from sending falsely high-priority markings", "Required by IEEE", "Reduces VLAN count"], answer: 1, explain: "Setting the trust boundary at the access switch ensures PCs can't tag their traffic as high-priority to game the QoS system." }]
  },

  // 4.8.a — SSH Step 1: hostname
  "4.8.a": {
    difficulty: 15, studyTime: 10, examFreq: 50,
    why: "SSH requires a hostname that is NOT the default. This is step 1 and a common gotcha — RSA key generation fails without it.",
    ciscoIntent: "Set the hostname as prerequisite for SSH",
    cheatSheet: [{ heading: "SSH Step 1: Hostname", items: [
      "<code>hostname R1</code> — change from default (Router/Switch)",
      "RSA key generation requires a non-default hostname AND a domain name",
      "If hostname is still 'Router' or 'Switch', the crypto key command may fail",
      "This is the most commonly forgotten SSH prerequisite",
      "The hostname becomes part of the RSA key label: R1.example.com"
    ]}],
    prereqs: [],
    resources: [],
    labs: [],
    vocab: [{ term: "SSH hostname", q: "Why must you set a hostname before configuring SSH?", options: ["For SNMP identification", "RSA key generation requires a non-default hostname", "SSH uses the hostname as the username", "It's optional"], answer: 1, explain: "The RSA key is generated using hostname.domain-name as the key label. Default hostname causes issues." }]
  },

  // 4.8.b — SSH Step 2: domain name
  "4.8.b": {
    difficulty: 15, studyTime: 10, examFreq: 50,
    why: "The domain name is required for RSA key generation. Without it, crypto key generate rsa fails.",
    ciscoIntent: "Set the domain name for RSA key generation",
    cheatSheet: [{ heading: "SSH Step 2: Domain Name", items: [
      "<code>ip domain-name example.com</code>",
      "Combined with hostname to form the RSA key label: R1.example.com",
      "Required before <code>crypto key generate rsa</code> will work",
      "Only needs to be set once — persists in running-config",
      "Can be any domain — it doesn't need to be a real registered domain"
    ]}],
    prereqs: [{ name: "Hostname", obj: "4.8.a" }],
    resources: [],
    labs: [],
    vocab: [{ term: "SSH domain", q: "What command sets the domain name for SSH RSA key generation?", options: ["domain-name example.com", "ip domain-name example.com", "ip name-server example.com", "dns domain example.com"], answer: 1, explain: "ip domain-name [domain] in global config. This is needed before RSA keys can be generated." }]
  },

  // 4.8.c — SSH Step 3: RSA keys
  "4.8.c": {
    difficulty: 25, studyTime: 15, examFreq: 55,
    why: "Generating RSA keys enables SSH on the device. The modulus size determines the SSH version supported. 768 minimum for SSHv2, 2048 recommended.",
    ciscoIntent: "Generate RSA keys for SSH",
    cheatSheet: [{ heading: "SSH Step 3: RSA Key Generation", items: [
      "<code>crypto key generate rsa modulus 2048</code>",
      "Minimum 768 bits for SSHv2 (below 768 = SSHv1 only)",
      "Recommended: 2048 bits for security",
      "Larger modulus = more secure but slower generation",
      "Keys are stored in NVRAM — survive reboot",
      "To delete keys: <code>crypto key zeroize rsa</code> (disables SSH)",
      "After generation, SSH is automatically enabled on the device"
    ]}],
    prereqs: [{ name: "Hostname", obj: "4.8.a" }, { name: "Domain name", obj: "4.8.b" }],
    resources: [],
    labs: [],
    vocab: [{ term: "RSA modulus", q: "What is the minimum RSA modulus size for SSHv2?", options: ["256 bits", "512 bits", "768 bits", "2048 bits"], answer: 2, explain: "768 bits is the minimum for SSHv2. Below that, only SSHv1 is supported. Best practice is 2048." }]
  },

  // 4.8.d — SSH Step 4: enforce version 2
  "4.8.d": {
    difficulty: 20, studyTime: 10, examFreq: 45,
    why: "SSHv1 has known vulnerabilities. Enforcing version 2 is a security best practice that Cisco tests.",
    ciscoIntent: "Enforce SSH version 2",
    cheatSheet: [{ heading: "SSH Step 4: Version 2", items: [
      "<code>ip ssh version 2</code> — enforce SSHv2 only",
      "SSHv1 has known security vulnerabilities — should always be disabled",
      "Without this command, the device accepts both v1 and v2 connections",
      "Requires RSA key modulus of at least 768 bits",
      "SSHv2 provides stronger encryption and better key exchange",
      "Verify: <code>show ip ssh</code> — shows configured SSH version"
    ]}],
    prereqs: [{ name: "RSA keys", obj: "4.8.c" }],
    resources: [],
    labs: [],
    vocab: [{ term: "SSHv2", q: "Why enforce SSH version 2?", options: ["It's faster", "SSHv1 has known vulnerabilities and weaker encryption", "SSHv2 supports Telnet fallback", "Required for TACACS+"], answer: 1, explain: "SSHv1 is vulnerable to attacks. Always enforce v2 with 'ip ssh version 2'." }]
  },

  // 4.8.e — SSH Step 5: local user account
  "4.8.e": {
    difficulty: 20, studyTime: 10, examFreq: 50,
    why: "SSH needs a user account to authenticate against. Creating a local user with privilege 15 is the standard approach.",
    ciscoIntent: "Create a local user account for SSH authentication",
    cheatSheet: [{ heading: "SSH Step 5: Local User", items: [
      "<code>username admin privilege 15 secret MyP@ss</code>",
      "privilege 15 = full access (equivalent to enable mode)",
      "Use 'secret' (not 'password') — 'secret' stores as MD5 hash",
      "'password' stores as Type 0 (cleartext) or Type 7 (weak encryption)",
      "Multiple users can be created with different privilege levels",
      "This account is used when 'login local' is configured on VTY lines"
    ]}],
    prereqs: [],
    resources: [],
    labs: [],
    vocab: [{ term: "username secret", q: "Why use 'secret' instead of 'password' in the username command?", options: ["Allows longer passwords", "'secret' stores the password as an MD5 hash; 'password' stores it in cleartext or weak Type 7", "Secret enables MFA", "No difference"], answer: 1, explain: "'secret' uses MD5 hashing. 'password' uses Type 0 (cleartext) or Type 7 (easily reversible). Always use secret." }]
  },

  // 4.8.f — SSH Step 6: VTY lines
  "4.8.f": {
    difficulty: 25, studyTime: 15, examFreq: 55,
    why: "Configuring VTY lines for SSH-only access with local authentication is the final step. Cisco tests the exact commands.",
    ciscoIntent: "Configure VTY lines for SSH with local authentication",
    cheatSheet: [{ heading: "SSH Step 6: VTY Configuration", items: [
      "<code>line vty 0 15</code> — enter VTY line config (16 simultaneous sessions)",
      "<code>transport input ssh</code> — only allow SSH connections (blocks Telnet)",
      "<code>login local</code> — authenticate against local username database",
      "Without 'login local', the device may use line password or no authentication",
      "Optional: <code>exec-timeout 5 0</code> — auto-disconnect after 5 minutes idle",
      "Optional: <code>logging synchronous</code> — prevents log messages from interrupting typing"
    ]}],
    prereqs: [{ name: "Local user", obj: "4.8.e" }],
    resources: [],
    labs: [{ name: "SSH full config lab", desc: "Complete all 6 steps, test SSH from another device, verify Telnet is blocked" }],
    vocab: [{ term: "transport input ssh", q: "What does 'transport input ssh' on VTY lines accomplish?", options: ["Enables SSH globally", "Restricts VTY access to SSH only — Telnet connections are refused", "Encrypts console access", "Enables SSH key-based auth"], answer: 1, explain: "transport input ssh limits VTY lines to SSH only. This effectively disables Telnet remote access." }]
  },

  // 4.8.g — Disable Telnet
  "4.8.g": {
    difficulty: 15, studyTime: 10, examFreq: 40,
    why: "Disabling Telnet is a security hardening step. The command is the same as enabling SSH-only — transport input ssh replaces the default 'transport input all'.",
    ciscoIntent: "Disable Telnet access on VTY lines",
    cheatSheet: [{ heading: "Disable Telnet", items: [
      "Default VTY setting: <code>transport input all</code> (allows Telnet AND SSH)",
      "<code>transport input ssh</code> — replaces default, now ONLY SSH is accepted",
      "Telnet sends credentials in cleartext — never use in production",
      "Even on a lab, prefer SSH to build good habits",
      "To verify: try Telnet to the device — should get 'Connection refused'",
      "<code>transport input none</code> — disables ALL remote access (console only)"
    ]}],
    prereqs: [{ name: "VTY config", obj: "4.8.f" }],
    resources: [],
    labs: [],
    vocab: [{ term: "Disable Telnet", q: "What is the default transport input on VTY lines?", options: ["ssh", "telnet", "all (Telnet and SSH)", "none"], answer: 2, explain: "Default is 'transport input all' — both Telnet and SSH allowed. You must explicitly set 'transport input ssh' to block Telnet." }]
  },

  // 4.8.h — SSH verification
  "4.8.h": {
    difficulty: 20, studyTime: 10, examFreq: 40,
    why: "Verifying SSH is configured correctly requires specific show commands. Cisco tests whether you can read this output.",
    ciscoIntent: "Verify SSH configuration and active sessions",
    cheatSheet: [{ heading: "SSH Verification", items: [
      "<code>show ip ssh</code> — SSH version, authentication timeout, retries",
      "<code>show ssh</code> — active SSH sessions (username, IP, version, encryption)",
      "<code>show running-config | section line vty</code> — verify transport input and login method",
      "<code>show crypto key mypubkey rsa</code> — verify RSA keys exist and their size",
      "<code>show users</code> — all active console and VTY sessions",
      "If 'show ip ssh' shows 'SSH Disabled': keys not generated or hostname/domain not set"
    ]}],
    prereqs: [{ name: "SSH config", obj: "4.8.f" }],
    resources: [],
    labs: [],
    vocab: [{ term: "show ip ssh", q: "What does 'show ip ssh' tell you?", options: ["Active SSH sessions", "SSH version configured, authentication timeout, and number of retries", "RSA key details", "VTY line configuration"], answer: 1, explain: "show ip ssh shows the SSH version, timeout, and retry settings. Use 'show ssh' for active sessions." }]
  },

  // 4.9.a — TFTP
  "4.9.a": {
    difficulty: 15, studyTime: 10, examFreq: 25,
    why: "TFTP is a simple, connectionless file transfer protocol used for IOS upgrades and config backups on trusted networks.",
    ciscoIntent: "Describe TFTP characteristics and use cases",
    cheatSheet: [{ heading: "TFTP", items: [
      "UDP port 69 — connectionless, no reliability guarantees at transport layer",
      "No authentication — anyone who can reach the server can transfer files",
      "Simple protocol: only read (RRQ) and write (WRQ) operations",
      "Uses its own reliability at the application layer: block numbers and ACKs",
      "Default block size: 512 bytes (can be negotiated larger for efficiency)",
      "Use case: IOS image backup/upgrade, config transfers on trusted/isolated networks"
    ]}],
    prereqs: [{ name: "UDP", obj: "1.5" }],
    resources: [],
    labs: [],
    vocab: [{ term: "TFTP", q: "What transport protocol and port does TFTP use?", options: ["TCP 20/21", "UDP 69", "TCP 69", "UDP 20"], answer: 1, explain: "TFTP uses UDP port 69. It's connectionless and has no built-in encryption or authentication." }]
  },

  // 4.9.b — FTP
  "4.9.b": {
    difficulty: 15, studyTime: 10, examFreq: 25,
    why: "FTP uses two TCP connections and provides authentication. Knowing the port numbers and the difference from TFTP is required.",
    ciscoIntent: "Describe FTP characteristics and compare with TFTP",
    cheatSheet: [{ heading: "FTP", items: [
      "TCP port 21 (control — commands/responses) + TCP port 20 (data — file transfers)",
      "Username/password authentication (cleartext — not encrypted)",
      "Reliable transfer via TCP (retransmission, ordering, flow control)",
      "Supports directory listing, file rename, delete — more features than TFTP",
      "Active mode: server initiates data connection TO client (port 20 → client ephemeral)",
      "Passive mode: client initiates both connections (firewall-friendly)",
      "More suitable for larger file transfers than TFTP"
    ]}],
    prereqs: [{ name: "TCP", obj: "1.5" }],
    resources: [],
    labs: [],
    vocab: [{ term: "FTP ports", q: "FTP uses which two ports?", options: ["UDP 20 and 21", "TCP 20 (data) and 21 (control)", "TCP 69 and 70", "UDP 67 and 68"], answer: 1, explain: "FTP uses TCP 21 for control (commands) and TCP 20 for data transfer. Both are TCP for reliability." }]
  },

  // 4.9.c — TFTP use case
  "4.9.c": {
    difficulty: 10, studyTime: 10, examFreq: 20,
    why: "TFTP is the standard protocol for IOS image transfers in lab and trusted environments. Cisco tests when to use TFTP vs FTP.",
    ciscoIntent: "Identify appropriate TFTP use cases",
    cheatSheet: [{ heading: "TFTP Use Cases", items: [
      "IOS image backup: <code>copy flash: tftp:</code> — copy IOS from flash to TFTP server",
      "IOS upgrade: <code>copy tftp: flash:</code> — download new IOS from TFTP to flash",
      "Config backup: <code>copy running-config tftp:</code> or <code>copy startup-config tftp:</code>",
      "Only use on trusted, isolated networks — no auth, no encryption",
      "Ideal for initial device provisioning and lab environments",
      "Not suitable for production file transfers across untrusted networks"
    ]}],
    prereqs: [{ name: "TFTP", obj: "4.9.a" }],
    resources: [],
    labs: [{ name: "TFTP transfer lab", desc: "Set up TFTP server, backup IOS image, restore it to a different device" }],
    vocab: [{ term: "copy tftp flash", q: "What does 'copy tftp: flash:' do?", options: ["Backs up config to TFTP", "Downloads a file from TFTP server to the device's flash memory", "Copies flash to RAM", "Uploads flash to FTP"], answer: 1, explain: "copy tftp: flash: downloads a file (typically IOS image) from a TFTP server and saves it to the device's flash storage." }]
  },

  // 4.9.d — FTP use case
  "4.9.d": {
    difficulty: 10, studyTime: 10, examFreq: 20,
    why: "FTP is preferred over TFTP for larger, authenticated transfers. Cisco expects you to know when each is appropriate.",
    ciscoIntent: "Identify appropriate FTP use cases",
    cheatSheet: [{ heading: "FTP Use Cases", items: [
      "Large file transfers where reliability matters (TCP vs UDP)",
      "When authentication is required (username/password)",
      "IOS transfers: <code>ip ftp username admin</code> then <code>ip ftp password MyP@ss</code>",
      "Then: <code>copy ftp: flash:</code> or <code>copy running-config ftp:</code>",
      "FTP is slower to set up than TFTP but more feature-rich",
      "Still not encrypted — for secure transfers, use SCP instead"
    ]}],
    prereqs: [{ name: "FTP", obj: "4.9.b" }],
    resources: [],
    labs: [],
    vocab: [{ term: "FTP vs TFTP", q: "When should you choose FTP over TFTP?", options: ["When speed is critical", "When you need authentication and reliable transfer of larger files", "When using IPv6", "When the server is on the same subnet"], answer: 1, explain: "FTP provides authentication (TFTP has none) and TCP reliability (TFTP uses UDP). Better for larger or sensitive transfers." }]
  },

  // 4.9.e — IOS file commands
  "4.9.e": {
    difficulty: 20, studyTime: 15, examFreq: 30,
    why: "The copy command syntax is heavily tested. You must know the source and destination patterns for TFTP, FTP, flash, and config files.",
    ciscoIntent: "Use IOS copy commands for file management",
    cheatSheet: [{ heading: "IOS File Commands", items: [
      "<code>copy running-config tftp:</code> — backup running config to TFTP server",
      "<code>copy startup-config tftp:</code> — backup startup config to TFTP server",
      "<code>copy tftp: flash:</code> — download IOS image from TFTP to flash",
      "<code>copy tftp: running-config</code> — merge TFTP config into running config (does NOT replace)",
      "<code>copy tftp: startup-config</code> — replace startup config from TFTP",
      "Syntax pattern: <code>copy [source] [destination]</code>",
      "<code>show flash:</code> — verify files in flash storage"
    ]}],
    prereqs: [{ name: "TFTP", obj: "4.9.a" }, { name: "FTP", obj: "4.9.b" }],
    resources: [],
    labs: [{ name: "File management lab", desc: "Backup running config to TFTP, modify it, restore — verify changes" }],
    vocab: [{ term: "copy command", q: "What does 'copy tftp: running-config' do?", options: ["Replaces running config with TFTP file", "MERGES the TFTP file into the existing running config", "Copies running config to TFTP", "Reboots the device"], answer: 1, explain: "copy tftp: running-config MERGES (does not replace). Only 'copy tftp: startup-config' + reload does a full replace." }]
  },

  // 4.9.f — SCP
  "4.9.f": {
    difficulty: 20, studyTime: 10, examFreq: 25,
    why: "SCP runs over SSH, providing encrypted file transfer. It is the secure alternative to TFTP and FTP that Cisco recommends.",
    ciscoIntent: "Describe SCP as a secure file transfer alternative",
    cheatSheet: [{ heading: "SCP (Secure Copy)", items: [
      "SCP runs over SSH — encrypted, authenticated file transfer",
      "Uses TCP port 22 (same as SSH)",
      "Requires SSH to be configured on the device (hostname, domain, RSA keys, user)",
      "Enable: <code>ip scp server enable</code> — allows the device to accept SCP transfers",
      "From remote: <code>scp user@device:running-config ./backup.cfg</code>",
      "SCP replaces TFTP/FTP for secure environments — always preferred when SSH is available"
    ]}],
    prereqs: [{ name: "SSH config", obj: "4.8" }, { name: "TFTP vs FTP", obj: "4.9.a" }],
    resources: [],
    labs: [],
    vocab: [{ term: "SCP", q: "What advantage does SCP have over TFTP and FTP?", options: ["Faster transfers", "Encrypted and authenticated via SSH", "Uses less bandwidth", "Supports larger files"], answer: 1, explain: "SCP provides encryption and authentication via SSH. TFTP has no auth, FTP sends credentials in cleartext." }]
  },

  "6.3.a": { difficulty: 35, studyTime: 20, examFreq: 40, why: "Understand the separation of control plane (decisions) and data plane (forwarding).", ciscoIntent: "Describe control plane vs data plane separation", cheatSheet: [{ heading: "Plane Separation", items: ["Control plane — routing decisions, policy (lives in SDN controller)", "Data plane — actual packet forwarding (lives in network devices)", "Management plane — SSH, SNMP, NTP config (device management)", "In SDN, control plane is centralized; in traditional, it's distributed."]}], prereqs: [{ name: "SDN concepts", obj: "6.2" }], resources: [{ type: "video", title: "Control vs Data Plane", url: "https://www.youtube.com/watch?v=E-h9iqRYXsY", desc: "Planes explained" }], labs: [], vocab: [{ term: "Control plane", q: "What does the control plane do?", options: ["Forwards packets", "Makes routing decisions and builds forwarding tables", "Provides SSH access", "Encrypts traffic"], answer: 1, explain: "Control plane = brain. Builds routing tables, runs protocols. Data plane = muscles. Forwards packets." }] },
  "6.3.b": { difficulty: 35, studyTime: 20, examFreq: 40, why: "Northbound = up to apps. Southbound = down to devices.", ciscoIntent: "Identify API directions in SDN", cheatSheet: [{ heading: "NB and SB APIs", items: ["Northbound API — controller ↔ applications (REST API, scripts). Upward.", "Southbound API — controller ↔ network devices (OpenFlow, NETCONF). Downward.", "Applications use NB APIs to read network state and push policy", "Controller uses SB APIs to program forwarding rules on devices"]}], prereqs: [{ name: "Plane separation", obj: "6.3.a" }], resources: [], labs: [], vocab: [{ term: "Northbound", q: "NB API communicates?", options: ["Controller to devices", "Controller to applications", "Device to device", "User to controller"], answer: 1, explain: "NB faces upward — controller to apps/management tools." }, { term: "Southbound", q: "Example of SB API?", options: ["REST API", "OpenFlow", "Python SDK", "Postman"], answer: 1, explain: "SB communicates downward: controller to devices. OpenFlow, NETCONF, RESTCONF." }] },
  // ── Domain 5 entries ──────────────────────────────────────────────

  // 5.1 — Security concepts
  "5.1.a": { difficulty: 15, studyTime: 8, examFreq: 30, why: "Cisco defines threats broadly. Know the definition cold and be able to pick a threat from a lineup of security terms.", ciscoIntent: "Identify what constitutes a threat", cheatSheet: [{ heading: "Threats", items: ["Threat = any potential danger to an asset (attacker, malware, natural disaster, insider)", "Threat agent = the entity that carries out the threat (hacker, disgruntled employee)", "Threat ≠ vulnerability — a threat exploits a vulnerability", "Examples: brute-force attacker, ransomware campaign, power outage, social engineer"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Threat", q: "Which of the following is a threat?", options: ["An unpatched server", "A misconfigured ACL", "A hacker attempting brute-force login", "A weak password policy"], answer: 2, explain: "The hacker is the threat. The unpatched server and weak password are vulnerabilities." }] },

  "5.1.b": { difficulty: 15, studyTime: 8, examFreq: 30, why: "Vulnerabilities are the weaknesses threats exploit. Expect scenario questions asking you to identify the vulnerability in a situation.", ciscoIntent: "Identify vulnerabilities in a network scenario", cheatSheet: [{ heading: "Vulnerabilities", items: ["Vulnerability = exploitable weakness in system, config, or process", "Software vulns: unpatched OS, outdated firmware, zero-day flaws", "Configuration vulns: default credentials, open ports, no encryption", "Human vulns: untrained users, poor password hygiene, social engineering susceptibility", "Physical vulns: unlocked server rooms, no badge readers"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Vulnerability", q: "A router still using the default admin/admin credentials is an example of:", options: ["A threat", "A vulnerability", "An exploit", "A mitigation"], answer: 1, explain: "Default credentials are a weakness (vulnerability) that can be exploited." }] },

  "5.1.c": { difficulty: 20, studyTime: 8, examFreq: 25, why: "Exploit = the technique or code used against a vulnerability. Distinguish exploit from threat and vulnerability.", ciscoIntent: "Define exploit and distinguish from threat/vulnerability", cheatSheet: [{ heading: "Exploits", items: ["Exploit = specific code, technique, or method that takes advantage of a vulnerability", "Example: SQL injection script targeting an unpatched web app", "Zero-day exploit = targets a vulnerability with no available patch", "Exploit kits = automated tools that probe for multiple vulnerabilities"] }], prereqs: [{ name: "Vulnerabilities", obj: "5.1.b" }], resources: [], labs: [], vocab: [{ term: "Exploit", q: "A script that takes advantage of unpatched software is called:", options: ["A vulnerability", "A mitigation", "An exploit", "A threat actor"], answer: 2, explain: "The script is the exploit — the tool/technique used against the vulnerability." }] },

  "5.1.d": { difficulty: 15, studyTime: 8, examFreq: 30, why: "Mitigation is the action you take to reduce risk. Cisco tests whether you can identify the correct mitigation for a given threat.", ciscoIntent: "Identify appropriate mitigations for threats", cheatSheet: [{ heading: "Mitigations", items: ["Mitigation = action that reduces risk or impact of a threat", "Technical: patching, ACLs, firewalls, encryption, IPS, port security", "Administrative: security policies, user training, access reviews", "Physical: locks, cameras, mantraps, badge readers", "Defense in depth = layered mitigations (never rely on one control)"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Mitigation", q: "Which is a mitigation against brute-force attacks on VTY lines?", options: ["Enabling DHCP snooping", "Configuring <code>login block-for</code>", "Adding a static route", "Enabling CDP"], answer: 1, explain: "login block-for limits login attempts, directly mitigating brute-force attacks." }] },

  "5.1.e": { difficulty: 20, studyTime: 10, examFreq: 35, why: "Phishing and social engineering are the #1 attack vector. Expect scenario-based questions describing a suspicious email or phone call.", ciscoIntent: "Recognize social engineering and phishing attacks", cheatSheet: [{ heading: "Phishing & Social Engineering", items: ["Social engineering = manipulating people to bypass security controls", "Phishing = fraudulent email/message with malicious link or attachment", "Spear phishing = targeted at a specific individual (more dangerous)", "Whaling = spear phishing targeting executives/C-suite", "Vishing = voice phishing (phone call), Smishing = SMS phishing", "Pretexting = fabricated scenario to extract information", "Tailgating/piggybacking = following authorized person through locked door"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Spear phishing", q: "How does spear phishing differ from regular phishing?", options: ["Uses SMS instead of email", "Targets a specific individual with personalized content", "Only works on mobile devices", "Requires physical access"], answer: 1, explain: "Spear phishing is targeted — the attacker researches the victim and crafts a personalized message." }] },

  "5.1.f": { difficulty: 20, studyTime: 10, examFreq: 30, why: "DoS/DDoS questions test whether you understand the difference between single-source and distributed attacks, plus common types.", ciscoIntent: "Describe DoS and DDoS attack types", cheatSheet: [{ heading: "DoS / DDoS", items: ["DoS = single source overwhelms target to deny service", "DDoS = distributed — uses botnet (many compromised hosts)", "Volumetric attacks: UDP flood, ICMP flood — saturate bandwidth", "Protocol attacks: SYN flood — exhaust connection state tables", "Application-layer attacks: HTTP flood — overwhelm web server resources", "Mitigations: rate limiting, ACLs, IPS, cloud scrubbing services", "SYN flood exploits TCP 3-way handshake — sends SYN, never completes"] }], prereqs: [{ name: "TCP handshake", obj: "1.5.b" }], resources: [], labs: [], vocab: [{ term: "DDoS", q: "What distinguishes DDoS from DoS?", options: ["DDoS encrypts traffic", "DDoS uses multiple source machines (botnet)", "DDoS only targets DNS", "DDoS is always slower"], answer: 1, explain: "DDoS = distributed denial of service. Multiple compromised hosts attack simultaneously, making it harder to filter." }] },

  "5.1.g": { difficulty: 25, studyTime: 10, examFreq: 30, why: "MitM attacks tie directly to L2 security features tested elsewhere (DHCP snooping, DAI). Know the attack to understand the defense.", ciscoIntent: "Describe man-in-the-middle attacks and common vectors", cheatSheet: [{ heading: "Man-in-the-Middle (MitM)", items: ["Attacker intercepts and potentially alters communication between two parties", "ARP spoofing — attacker sends fake ARP replies to redirect traffic through their machine", "DHCP spoofing — rogue DHCP server hands out attacker's IP as default gateway", "DNS spoofing — attacker redirects DNS queries to malicious IP", "Session hijacking — attacker steals session token to impersonate user", "Mitigations: DAI (ARP spoofing), DHCP snooping (DHCP spoofing), HTTPS/TLS (encryption)"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "ARP spoofing", q: "Which L2 feature mitigates ARP spoofing?", options: ["Port security", "DHCP snooping", "DAI (Dynamic ARP Inspection)", "STP BPDU Guard"], answer: 2, explain: "DAI validates ARP packets against the DHCP snooping binding table, blocking spoofed ARP replies." }] },

  "5.1.h": { difficulty: 20, studyTime: 10, examFreq: 30, why: "Know the four malware types and how they spread. Cisco loves 'which malware type self-replicates without user action?'", ciscoIntent: "Differentiate malware types", cheatSheet: [{ heading: "Malware Types", items: ["Virus — attaches to legitimate file, requires user action to spread", "Worm — self-replicating, spreads automatically across networks WITHOUT user action", "Trojan — disguised as legitimate software, does NOT self-replicate", "Ransomware — encrypts victim's data, demands payment for decryption key", "Key distinction: worm = self-spreading, virus = needs host file + user action", "Rootkit — hides deep in OS, hard to detect, maintains persistent access"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Worm", q: "Which malware type self-replicates without user interaction?", options: ["Virus", "Trojan", "Worm", "Ransomware"], answer: 2, explain: "Worms self-replicate across networks automatically. Viruses need user action (open file). Trojans don't replicate." }] },

  // 5.2 — Security program elements
  "5.2.a": { difficulty: 10, studyTime: 8, examFreq: 20, why: "User awareness is the first line of defense. Quick conceptual question — no commands to memorize.", ciscoIntent: "Explain user awareness as a security control", cheatSheet: [{ heading: "User Awareness", items: ["Users are the weakest link — most breaches start with human error", "Recognize phishing emails: urgent language, suspicious links, unknown senders", "Report suspicious activity to IT/security team immediately", "Password hygiene: unique passwords, no sharing, use password managers", "Clean desk policy: lock screen, secure documents, no sticky-note passwords"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "User awareness", q: "Why is user awareness considered the first line of defense?", options: ["It's cheaper than firewalls", "Most attacks exploit human error, not technical flaws", "Users configure the network", "Awareness replaces encryption"], answer: 1, explain: "Social engineering and phishing target people, not technology. Trained users catch what firewalls miss." }] },

  "5.2.b": { difficulty: 10, studyTime: 8, examFreq: 20, why: "Security training goes beyond awareness — ongoing education, policy compliance, incident response procedures.", ciscoIntent: "Describe security training programs", cheatSheet: [{ heading: "Security Training", items: ["Ongoing education — not one-time; regular updates on new threats", "Policy compliance — acceptable use, BYOD, data handling procedures", "Incident response training — who to call, what to preserve, escalation path", "Role-based training — admins get deeper technical training than end users", "Simulated phishing tests — measure training effectiveness"] }], prereqs: [{ name: "User awareness", obj: "5.2.a" }], resources: [], labs: [], vocab: [{ term: "Security training", q: "What makes security training different from user awareness?", options: ["Training is one-time only", "Training includes hands-on procedures and policy compliance, not just recognition", "Training is only for IT staff", "Training replaces technical controls"], answer: 1, explain: "Awareness = recognize threats. Training = know the procedures, policies, and how to respond." }] },

  "5.2.c": { difficulty: 10, studyTime: 8, examFreq: 20, why: "Physical access controls show up as distractor answers. Know the terms: mantrap, badge reader, guard.", ciscoIntent: "Identify physical access control methods", cheatSheet: [{ heading: "Physical Access Controls", items: ["Badge readers / key cards — electronic access, logs entry times", "Mantrap / vestibule — two interlocking doors, prevents tailgating", "Security guards — human verification at entry points", "Biometric locks — fingerprint, retina scan for high-security areas", "Key point: physical controls protect against unauthorized physical access to equipment"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Mantrap", q: "What is the purpose of a mantrap (vestibule)?", options: ["Filter network traffic", "Prevent tailgating by using two interlocking doors", "Encrypt wireless signals", "Block rogue DHCP servers"], answer: 1, explain: "A mantrap has two doors — only one opens at a time. Person must authenticate between them, preventing tailgating." }] },

  "5.2.d": { difficulty: 10, studyTime: 5, examFreq: 15, why: "Surveillance is a detective control — it doesn't prevent but detects and deters. Know examples.", ciscoIntent: "Describe surveillance as a security measure", cheatSheet: [{ heading: "Surveillance", items: ["Video cameras (CCTV) — record activity in and around facilities", "Motion sensors — trigger alerts when movement detected in restricted areas", "Access logs — electronic record of badge-in/badge-out times", "Detective control — doesn't prevent, but deters and provides evidence after incidents"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Surveillance", q: "Surveillance cameras are an example of which type of security control?", options: ["Preventive", "Detective", "Corrective", "Compensating"], answer: 1, explain: "Cameras detect and record — they don't prevent access. They're detective controls." }] },

  "5.2.e": { difficulty: 10, studyTime: 5, examFreq: 15, why: "Environmental controls protect hardware. Quick recall — cable locks, locked racks, server room access.", ciscoIntent: "Identify environmental and physical protection methods", cheatSheet: [{ heading: "Environmental Controls", items: ["Cable locks — physically secure laptops and equipment to desks", "Equipment cages — locked enclosures around racks in shared spaces (colocation)", "Locked server rooms — restricted access, badge + biometric", "Environmental: HVAC monitoring, fire suppression (FM-200), water leak sensors", "UPS / generator — protect against power loss"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Equipment cage", q: "In a colocation facility, what protects your racks from other tenants?", options: ["VLAN segmentation", "Locked equipment cage", "ACLs", "DHCP snooping"], answer: 1, explain: "Equipment cages are physical enclosures that restrict access to your specific racks in a shared facility." }] },

  // 5.3 — Device access control
  "5.3.a": { difficulty: 25, studyTime: 10, examFreq: 40, why: "Cisco WILL test enable password vs enable secret. Know that enable password stores in PLAINTEXT and should never be used.", ciscoIntent: "Explain why enable password is insecure", cheatSheet: [{ heading: "enable password", items: ["<code>enable password MyP@ss</code> — stored as Type 0 (cleartext) in running-config", "Visible with <code>show running-config</code> — anyone with config access sees it", "If both enable password and enable secret exist, enable secret WINS", "<code>service password-encryption</code> upgrades it to Type 7 — but Type 7 is trivially reversible", "NEVER use enable password — always use enable secret instead"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "enable password", q: "How is <code>enable password</code> stored in the configuration?", options: ["MD5 hash", "AES-256 encrypted", "Plaintext (Type 0)", "SHA-256 hash"], answer: 2, explain: "enable password stores in cleartext (Type 0). Anyone who can view the config sees the password." }] },

  "5.3.b": { difficulty: 25, studyTime: 10, examFreq: 50, why: "enable secret is the correct way to protect privileged EXEC. Know it uses MD5 (Type 5) and always overrides enable password.", ciscoIntent: "Configure enable secret and explain its advantage", cheatSheet: [{ heading: "enable secret", items: ["<code>enable secret MyP@ss</code> — stored as Type 5 (MD5 hash)", "Always takes precedence over enable password if both are configured", "Cannot be reversed from the hash in the config file", "Newer IOS versions support Type 8 (PBKDF2-SHA-256) and Type 9 (scrypt)", "<code>enable algorithm-type scrypt secret MyP@ss</code> — Type 9, strongest option"] }], prereqs: [], resources: [], labs: [{ name: "Enable secret config", desc: "Configure enable secret, verify with show running-config, compare to enable password" }], vocab: [{ term: "enable secret", q: "If both <code>enable password</code> and <code>enable secret</code> are configured, which is used?", options: ["enable password", "enable secret", "Whichever was configured first", "Both are required"], answer: 1, explain: "enable secret always wins. enable password is ignored when enable secret exists." }] },

  "5.3.c": { difficulty: 25, studyTime: 10, examFreq: 45, why: "Console line password is hands-on testable. Know the exact commands and that 'login' keyword is required to enforce it.", ciscoIntent: "Configure console password", cheatSheet: [{ heading: "Console Password", items: ["<code>line console 0</code>", "<code>password MyP@ss</code>", "<code>login</code> — REQUIRED to enforce the password (without this, no password prompt!)", "Alternative: <code>login local</code> — uses local username database instead of line password", "<code>exec-timeout 5 0</code> — auto-logout after 5 min idle (security best practice)", "Console = physical access via rollover cable to console port"] }], prereqs: [], resources: [], labs: [{ name: "Console password", desc: "Configure console password, test login, add exec-timeout" }], vocab: [{ term: "Console login", q: "After setting a console password, what command is required to enforce it?", options: ["<code>enable</code>", "<code>login</code>", "<code>service password-encryption</code>", "<code>no shutdown</code>"], answer: 1, explain: "The 'login' command under line console 0 activates password checking. Without it, access is wide open." }] },

  "5.3.d": { difficulty: 30, studyTime: 12, examFreq: 50, why: "VTY lines control remote access (SSH/Telnet). Expect config-and-verify questions. Know line vty 0 15 = 16 simultaneous sessions.", ciscoIntent: "Configure VTY line passwords and access", cheatSheet: [{ heading: "VTY Lines", items: ["<code>line vty 0 15</code> — 16 virtual terminal lines (0-15) for remote access", "<code>password MyP@ss</code> + <code>login</code> — simple password auth", "Better: <code>login local</code> — uses local username/password database", "<code>transport input ssh</code> — restrict to SSH only (block Telnet)", "<code>transport input ssh telnet</code> — allow both (less secure)", "<code>access-class 10 in</code> — apply ACL to restrict which IPs can connect", "No VTY password + <code>login</code> = connection refused with 'password required'"] }], prereqs: [], resources: [], labs: [{ name: "VTY access", desc: "Configure VTY with login local, restrict to SSH, apply access-class" }], vocab: [{ term: "VTY", q: "How many VTY lines does <code>line vty 0 15</code> configure?", options: ["15", "16", "1", "Unlimited"], answer: 1, explain: "Lines 0 through 15 = 16 total simultaneous remote sessions." }] },

  "5.3.e": { difficulty: 15, studyTime: 5, examFreq: 15, why: "AUX line is rarely used in modern networks but may appear as a distractor. Know it exists and how to secure it.", ciscoIntent: "Identify the AUX line and its purpose", cheatSheet: [{ heading: "AUX Line", items: ["<code>line aux 0</code> — auxiliary port, originally for modem dial-in access", "<code>password MyP@ss</code> + <code>login</code> — same syntax as console", "Rarely used in modern networks — most routers don't even have AUX ports", "Security best practice: <code>no exec</code> under line aux 0 to disable it", "If not used, disable it — reduces attack surface"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "AUX line", q: "What was the AUX port originally designed for?", options: ["Wireless access", "Modem dial-in remote access", "USB console connection", "Fiber uplink"], answer: 1, explain: "AUX was for out-of-band modem access. Rarely used today — disable if not needed." }] },

  "5.3.f": { difficulty: 30, studyTime: 12, examFreq: 50, why: "Local user accounts with privilege levels are heavily tested. Know the full command and that 'secret' hashes the password.", ciscoIntent: "Create local user accounts with privilege levels", cheatSheet: [{ heading: "Local User Accounts", items: ["<code>username admin privilege 15 secret MyP@ss</code>", "privilege 15 = full access (EXEC + config), privilege 1 = basic EXEC only", "<code>secret</code> = MD5 hashed (Type 5). <code>password</code> = plaintext (Type 0)", "Used with <code>login local</code> on console/VTY lines", "Each user gets unique credentials — better auditing than shared line passwords", "<code>username admin algorithm-type scrypt secret MyP@ss</code> — Type 9 (strongest)"] }], prereqs: [{ name: "Enable secret", obj: "5.3.b" }], resources: [], labs: [{ name: "Local users", desc: "Create admin and readonly users with different privilege levels" }], vocab: [{ term: "Local user", q: "What privilege level grants full configuration access?", options: ["0", "1", "7", "15"], answer: 3, explain: "Privilege 15 = full access to all commands. Privilege 1 = user EXEC only (show commands)." }] },

  "5.3.g": { difficulty: 20, studyTime: 8, examFreq: 40, why: "service password-encryption is a common exam topic. Know it uses Type 7 which is WEAK — better than nothing, but easily reversible.", ciscoIntent: "Explain service password-encryption and its limitations", cheatSheet: [{ heading: "service password-encryption", items: ["<code>service password-encryption</code> — global command", "Encrypts ALL plaintext passwords in running-config as Type 7", "Type 7 uses a simple Vigenere cipher — trivially reversible with free online tools", "Does NOT affect Type 5 (MD5) or Type 9 (scrypt) passwords — those are already hashed", "Protects against casual shoulder surfing of config, NOT against determined attacker", "Best practice: use <code>secret</code> keyword everywhere + <code>service password-encryption</code> as additional layer"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Type 7", q: "What is a key weakness of Type 7 password encryption?", options: ["It only works on VTY lines", "It is easily reversible with freely available tools", "It requires a RADIUS server", "It only encrypts enable passwords"], answer: 1, explain: "Type 7 is a simple Vigenere cipher. Dozens of free websites can decode it in seconds." }] },

  "5.3.h": { difficulty: 20, studyTime: 10, examFreq: 35, why: "Banners are testable — know the 3 types and that MOTD should be a legal warning, NOT a welcome message.", ciscoIntent: "Configure banners for legal notification", cheatSheet: [{ heading: "Banners", items: ["<code>banner motd # Unauthorized access prohibited #</code> — displayed to ALL connections before login", "<code>banner login # Please authenticate #</code> — displayed at login prompt", "<code>banner exec # Welcome, admin #</code> — displayed after successful login", "MOTD = Message of the Day — shows FIRST, before login prompt", "Legal requirement: MOTD should warn against unauthorized access, NOT welcome users", "Delimiter (# in examples) can be any character not in the message"] }], prereqs: [], resources: [], labs: [{ name: "Banner config", desc: "Configure MOTD with legal warning, login, and exec banners" }], vocab: [{ term: "Banner MOTD", q: "When is the MOTD banner displayed?", options: ["After successful login", "Only on console connections", "Before the login prompt, to all connections", "Only when SSH is used"], answer: 2, explain: "MOTD displays first — before login prompt, to everyone who connects. It should contain a legal warning." }] },

  "5.3.i": { difficulty: 15, studyTime: 5, examFreq: 25, why: "Quick command to know. Sets a global minimum length for all passwords configured on the device.", ciscoIntent: "Set minimum password length", cheatSheet: [{ heading: "Minimum Password Length", items: ["<code>security passwords min-length 8</code> — global config command", "Applies to ALL future passwords set on the device", "Does NOT retroactively change existing passwords that are too short", "Range: 0-16 characters (Cisco IOS)", "Best practice: set to 8+ characters minimum"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Min length", q: "What command enforces a minimum password length of 10 characters?", options: ["<code>password min-length 10</code>", "<code>security passwords min-length 10</code>", "<code>enable min-length 10</code>", "<code>login min-length 10</code>"], answer: 1, explain: "security passwords min-length [n] is the correct global command." }] },

  "5.3.j": { difficulty: 25, studyTime: 10, examFreq: 35, why: "login block-for is the IOS brute-force mitigation. Know the exact command syntax and what each parameter means.", ciscoIntent: "Configure login attempt throttling", cheatSheet: [{ heading: "Login Block-for", items: ["<code>login block-for 120 attempts 3 within 60</code>", "Meaning: block login for 120 seconds if 3 failed attempts occur within 60 seconds", "Applies to VTY lines — protects against brute-force SSH/Telnet attacks", "<code>login quiet-mode access-class [ACL]</code> — allows specific IPs even during block", "<code>login delay [sec]</code> — adds delay between login attempts", "<code>show login</code> — verify current login parameters and block status"] }], prereqs: [{ name: "VTY lines", obj: "5.3.d" }], resources: [], labs: [{ name: "Login protection", desc: "Configure block-for, test with failed logins, verify with show login" }], vocab: [{ term: "login block-for", q: "What does <code>login block-for 60 attempts 5 within 30</code> do?", options: ["Blocks for 5 seconds after 60 failed attempts in 30 seconds", "Blocks for 60 seconds if 5 failed attempts occur within 30 seconds", "Blocks port 60 after 5 pings in 30 seconds", "Blocks DHCP for 60 seconds"], answer: 1, explain: "Block for 60 sec | if 5 failed attempts | within 30 sec window. Syntax: block-for [block-time] attempts [#] within [window]." }] },

  // 5.4 — Password policies and identity
  "5.4.a": { difficulty: 15, studyTime: 8, examFreq: 25, why: "Password complexity is conceptual. Know what makes a strong password — length, mixed case, numbers, special chars.", ciscoIntent: "Describe password complexity requirements", cheatSheet: [{ heading: "Password Complexity", items: ["Minimum length (8+ characters recommended, 12+ ideal)", "Mixed case — uppercase AND lowercase letters", "Numbers and special characters (!@#$%^&*)", "No dictionary words, no username in password", "Longer passwords > complex short passwords (passphrase approach)", "IOS enforcement: <code>security passwords min-length [n]</code>"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Complexity", q: "Which is the STRONGEST password?", options: ["P@ssw0rd", "admin123!", "Correct-Horse-Battery-Staple-42!", "cisco"], answer: 2, explain: "Length + complexity + non-dictionary words. The passphrase is long and includes mixed case, special chars, and numbers." }] },

  "5.4.b": { difficulty: 15, studyTime: 8, examFreq: 20, why: "Password management policies are conceptual. Know rotation, expiration, history (no reuse) concepts.", ciscoIntent: "Describe password management best practices", cheatSheet: [{ heading: "Password Management", items: ["Rotation policy — change passwords periodically (30/60/90 days)", "Expiration — passwords stop working after set period, forcing change", "History — prevent reuse of last N passwords (e.g., can't reuse last 12)", "Account lockout — lock after N failed attempts (similar to login block-for on IOS)", "Password managers recommended for unique passwords per service", "Note: NIST 800-63B now recommends AGAINST mandatory rotation if passwords are strong"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Password history", q: "What does password history enforcement prevent?", options: ["Password sharing between users", "Reusing recently used passwords", "Using dictionary words", "Brute-force attacks"], answer: 1, explain: "Password history tracks previous passwords and prevents users from cycling back to old ones." }] },

  "5.4.c": { difficulty: 20, studyTime: 10, examFreq: 35, why: "MFA is a favorite exam topic. The trap: two passwords is NOT MFA. Factors must come from DIFFERENT categories.", ciscoIntent: "Explain multi-factor authentication and factor categories", cheatSheet: [{ heading: "Multi-Factor Authentication (MFA)", items: ["Something you KNOW — password, PIN, security question", "Something you HAVE — smart card, hardware token, phone (SMS/app code)", "Something you ARE — biometric (fingerprint, face, iris, voice)", "True MFA = factors from 2+ DIFFERENT categories", "Two passwords = NOT MFA (both are 'something you know')", "Password + PIN = NOT MFA (same category)", "Password + fingerprint = MFA (know + are)", "Password + phone token = MFA (know + have)"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "MFA", q: "Which combination is TRUE multi-factor authentication?", options: ["Password + security question", "PIN + password", "Password + hardware token", "Two different passwords"], answer: 2, explain: "Password = something you know. Hardware token = something you have. Two different categories = true MFA." }] },

  "5.4.d": { difficulty: 15, studyTime: 5, examFreq: 30, why: "This is the trick question trap. Cisco specifically tests whether you know that two factors from the SAME category is not MFA.", ciscoIntent: "Identify what does and does not constitute MFA", cheatSheet: [{ heading: "MFA vs Non-MFA", items: ["Two passwords → NOT MFA (same category: know + know)", "Password + security question → NOT MFA (know + know)", "Password + SMS code → MFA (know + have)", "Smart card + PIN → MFA (have + know)", "Fingerprint + face scan → single factor (both are 'something you are')", "The key: DIFFERENT categories, not just different values"] }], prereqs: [{ name: "MFA categories", obj: "5.4.c" }], resources: [], labs: [], vocab: [{ term: "Not MFA", q: "A user logs in with a password and a security question. Is this MFA?", options: ["Yes — two authentication steps", "No — both are 'something you know'", "Yes — one is typed, one is spoken", "Depends on the security question complexity"], answer: 1, explain: "Both password and security question are 'something you know.' True MFA requires different categories." }] },

  "5.4.e": { difficulty: 25, studyTime: 12, examFreq: 25, why: "Digital certificates and PKI show up in VPN and 802.1X contexts. Know the basics: CA, X.509, public/private keys.", ciscoIntent: "Describe digital certificates and PKI", cheatSheet: [{ heading: "Digital Certificates & PKI", items: ["PKI (Public Key Infrastructure) — framework for managing digital certificates", "CA (Certificate Authority) — trusted third party that issues/signs certificates", "X.509 — standard format for digital certificates", "Certificate contains: public key, subject name, issuer (CA), validity period, serial number", "Public key = shared freely. Private key = kept secret.", "Used in: HTTPS (TLS), IPsec VPNs, 802.1X (EAP-TLS), SSH", "Certificate verifies identity — 'this public key belongs to this entity'"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "CA", q: "What is the role of a Certificate Authority (CA)?", options: ["Encrypts all traffic on the network", "Issues and signs digital certificates to verify identity", "Stores user passwords", "Manages VLAN assignments"], answer: 1, explain: "The CA is a trusted entity that vouches for the identity in a certificate by signing it with its own private key." }] },

  "5.4.f": { difficulty: 15, studyTime: 8, examFreq: 20, why: "Biometrics = 'something you are' factor. Know examples and that false acceptance/rejection rates are key metrics.", ciscoIntent: "Identify biometric authentication methods", cheatSheet: [{ heading: "Biometrics", items: ["Fingerprint scan — most common biometric, fast, affordable sensors", "Facial recognition — camera-based, contactless, used in phones/laptops", "Iris / retina scan — highly accurate, used in high-security environments", "Voice print — unique voice pattern analysis", "FAR (False Acceptance Rate) — unauthorized person accepted (bad)", "FRR (False Rejection Rate) — authorized person rejected (annoying)", "CER (Crossover Error Rate) — where FAR = FRR; lower CER = better system"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Biometric FAR", q: "What does a high False Acceptance Rate (FAR) indicate?", options: ["System rejects too many legitimate users", "System accepts too many unauthorized users", "Biometric sensor is broken", "Encryption is weak"], answer: 1, explain: "High FAR = system is too permissive, accepting unauthorized people. This is the security risk metric." }] },

  // 5.5 — IPsec VPNs
  "5.5.a": { difficulty: 25, studyTime: 12, examFreq: 30, why: "Site-to-site VPN connects two networks permanently. Know it uses routers/firewalls, always-on, and typical use case.", ciscoIntent: "Describe site-to-site VPN architecture", cheatSheet: [{ heading: "Site-to-Site VPN", items: ["Connects two LANs over the internet via routers or firewalls at each end", "Always-on — tunnel stays up permanently", "Users don't need VPN client software — routing handles it transparently", "Typical: branch office ↔ headquarters", "Both ends must agree on encryption, authentication, and SA parameters", "Uses IPsec tunnel mode by default (encrypts entire original packet)"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Site-to-site VPN", q: "In a site-to-site VPN, where is the VPN tunnel terminated?", options: ["On each user's laptop", "On routers or firewalls at each site", "On the ISP's equipment", "On the DNS server"], answer: 1, explain: "Site-to-site VPN terminates on network devices (routers/firewalls) at each location. Users connect normally to their LAN." }] },

  "5.5.b": { difficulty: 25, studyTime: 10, examFreq: 30, why: "Remote access VPN = user-to-network. Contrast with site-to-site. Client software required.", ciscoIntent: "Describe remote access VPN", cheatSheet: [{ heading: "Remote Access VPN", items: ["Connects individual user to corporate network over the internet", "On-demand — user initiates connection when needed", "Requires VPN client software on user device (AnyConnect, GlobalProtect, etc.)", "Typical: remote worker from home, traveling employee from hotel", "Can use IPsec or SSL/TLS (Cisco AnyConnect uses SSL/TLS by default)", "SSL VPN advantage: works through most firewalls (uses TCP 443)"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Remote access VPN", q: "What does a remote access VPN require that site-to-site does not?", options: ["Two routers", "VPN client software on the user's device", "A dedicated leased line", "RADIUS server"], answer: 1, explain: "Remote access VPN requires client software on each user device. Site-to-site handles it at the router level." }] },

  "5.5.c": { difficulty: 30, studyTime: 15, examFreq: 35, why: "IPsec's four services (CIA + anti-replay) are foundational for all VPN questions. Know what each provides.", ciscoIntent: "Explain IPsec security services", cheatSheet: [{ heading: "IPsec Services", items: ["Confidentiality — encryption (AES, 3DES) prevents eavesdropping", "Integrity — hashing (SHA-256, MD5) detects tampering", "Authentication — pre-shared keys (PSK) or digital certificates verify peer identity", "Anti-replay — sequence numbers prevent captured packets from being replayed", "IPsec is a FRAMEWORK, not a single protocol — combines AH and/or ESP", "IPsec operates at Layer 3 (network layer)"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "IPsec integrity", q: "Which IPsec service detects if a packet was modified in transit?", options: ["Confidentiality", "Integrity", "Authentication", "Anti-replay"], answer: 1, explain: "Integrity uses hashing (SHA-256, MD5) to detect modification. The receiver re-hashes and compares." }] },

  "5.5.d": { difficulty: 30, studyTime: 10, examFreq: 35, why: "AH vs ESP is a classic comparison. AH = auth only, NO encryption. IP protocol 51. Know this cold.", ciscoIntent: "Describe AH and its limitations", cheatSheet: [{ heading: "AH (Authentication Header)", items: ["IP protocol 51", "Provides: integrity + authentication + anti-replay", "Does NOT provide encryption (no confidentiality)", "Authenticates the ENTIRE packet including IP header", "Incompatible with NAT — NAT changes IP header, breaking AH's integrity check", "Rarely used alone — ESP is preferred because it adds encryption"] }], prereqs: [{ name: "IPsec services", obj: "5.5.c" }], resources: [], labs: [], vocab: [{ term: "AH", q: "Why is AH incompatible with NAT?", options: ["AH uses TCP which NAT cannot translate", "AH authenticates the IP header, which NAT modifies", "AH requires IPv6", "AH encrypts the port numbers"], answer: 1, explain: "AH hashes the entire packet including IP header. NAT changes the IP header, breaking the integrity check." }] },

  "5.5.e": { difficulty: 30, studyTime: 10, examFreq: 40, why: "ESP is the primary IPsec protocol. Provides encryption AND authentication. IP protocol 50. More common than AH.", ciscoIntent: "Describe ESP and compare to AH", cheatSheet: [{ heading: "ESP (Encapsulating Security Payload)", items: ["IP protocol 50", "Provides: encryption + integrity + authentication + anti-replay", "Encrypts the payload (and optionally authenticates)", "Does NOT authenticate the outer IP header (unlike AH)", "Compatible with NAT (NAT-Traversal encapsulates ESP in UDP 4500)", "ESP is the preferred IPsec protocol — provides confidentiality that AH lacks", "AH = protocol 51, auth only. ESP = protocol 50, encryption + auth."] }], prereqs: [{ name: "AH", obj: "5.5.d" }], resources: [], labs: [], vocab: [{ term: "ESP vs AH", q: "Which IPsec protocol provides BOTH encryption and authentication?", options: ["AH", "ESP", "IKE", "GRE"], answer: 1, explain: "ESP provides encryption + auth. AH provides auth only (no encryption). ESP = protocol 50, AH = protocol 51." }] },

  "5.5.f": { difficulty: 35, studyTime: 12, examFreq: 30, why: "IKE Phase 1 establishes the secure management channel (ISAKMP SA). Know what it negotiates.", ciscoIntent: "Describe IKE Phase 1", cheatSheet: [{ heading: "IKE Phase 1", items: ["Purpose: authenticate peers and establish a secure management channel", "Creates the ISAKMP SA (Internet Security Association and Key Management Protocol)", "Negotiates: encryption algorithm, hash algorithm, authentication method, DH group, SA lifetime", "Two modes: Main Mode (6 messages, more secure) and Aggressive Mode (3 messages, faster)", "DH (Diffie-Hellman) = securely generates shared secret key over insecure channel", "Result: secure tunnel for IKE Phase 2 negotiations"] }], prereqs: [{ name: "IPsec services", obj: "5.5.c" }], resources: [], labs: [], vocab: [{ term: "IKE Phase 1", q: "What is the primary purpose of IKE Phase 1?", options: ["Encrypt user data", "Authenticate peers and create a secure management channel (ISAKMP SA)", "Forward packets through the tunnel", "Assign IP addresses to VPN clients"], answer: 1, explain: "Phase 1 = build a secure channel to negotiate the actual data encryption parameters in Phase 2." }] },

  "5.5.g": { difficulty: 35, studyTime: 12, examFreq: 30, why: "IKE Phase 2 negotiates the actual IPsec SAs for data encryption. Know it uses Quick Mode and creates two unidirectional SAs.", ciscoIntent: "Describe IKE Phase 2", cheatSheet: [{ heading: "IKE Phase 2", items: ["Purpose: negotiate IPsec SAs for actual data encryption", "Uses Quick Mode (protected by Phase 1 ISAKMP SA)", "Creates TWO unidirectional IPsec SAs — one for each direction of traffic", "Negotiates: IPsec protocol (AH/ESP), encryption algorithm, hash, SA lifetime", "PFS (Perfect Forward Secrecy) — optional new DH exchange for additional security", "If Phase 2 SA expires, re-negotiated without redoing Phase 1"] }], prereqs: [{ name: "IKE Phase 1", obj: "5.5.f" }], resources: [], labs: [], vocab: [{ term: "IKE Phase 2", q: "How many IPsec SAs does IKE Phase 2 create?", options: ["One bidirectional SA", "Two unidirectional SAs (one per direction)", "Three — one for each AAA function", "One SA per subnet"], answer: 1, explain: "Phase 2 creates two unidirectional SAs — one for outbound traffic, one for inbound. Each direction has its own SA." }] },

  "5.5.h": { difficulty: 25, studyTime: 10, examFreq: 35, why: "Tunnel mode is the default for site-to-site. It encrypts the ENTIRE original packet and adds a new IP header.", ciscoIntent: "Describe IPsec tunnel mode", cheatSheet: [{ heading: "Tunnel Mode", items: ["Encrypts the ENTIRE original packet (IP header + payload)", "Adds a NEW outer IP header with the tunnel endpoints' addresses", "Default mode for site-to-site VPN", "Original source/destination IPs are hidden (encrypted inside)", "More overhead (larger packet) but more secure", "Used when traffic passes through untrusted networks between sites"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Tunnel mode", q: "In IPsec tunnel mode, what is encrypted?", options: ["Only the data payload", "Only the IP header", "The entire original packet (header + payload)", "Nothing — tunnel mode only authenticates"], answer: 2, explain: "Tunnel mode encrypts everything — the original IP header AND payload. A new IP header is prepended for routing." }] },

  "5.5.i": { difficulty: 25, studyTime: 10, examFreq: 25, why: "Transport mode encrypts payload only, keeps original IP header. Used for host-to-host. Contrast with tunnel mode.", ciscoIntent: "Describe IPsec transport mode and compare to tunnel", cheatSheet: [{ heading: "Transport Mode", items: ["Encrypts payload ONLY — original IP header is left intact", "Less overhead than tunnel mode (no extra IP header)", "Used for host-to-host communication (e.g., server to server on same LAN)", "Original source/destination IPs are visible (not hidden)", "Typically used with L2TP/IPsec for remote access VPNs", "Tunnel mode = encrypts everything + new header. Transport mode = encrypts payload only."] }], prereqs: [{ name: "Tunnel mode", obj: "5.5.h" }], resources: [], labs: [], vocab: [{ term: "Transport vs Tunnel", q: "Which IPsec mode leaves the original IP header unencrypted?", options: ["Tunnel mode", "Transport mode", "Both encrypt the IP header", "Neither encrypts the IP header"], answer: 1, explain: "Transport mode encrypts only the payload. The original IP header stays intact and visible." }] },

  "5.5.j": { difficulty: 30, studyTime: 12, examFreq: 30, why: "GRE over IPsec is tested because GRE alone has no encryption, but it supports multicast/routing protocols that IPsec doesn't.", ciscoIntent: "Explain GRE over IPsec and why it is used", cheatSheet: [{ heading: "GRE over IPsec", items: ["GRE (Generic Routing Encapsulation) = tunneling protocol, NO encryption", "GRE supports multicast, broadcast, and routing protocols (OSPF, EIGRP)", "IPsec alone does NOT support multicast or routing protocol traffic", "GRE over IPsec = GRE provides multicast/routing support, IPsec provides encryption", "GRE encapsulates first, then IPsec encrypts the GRE packet", "Common use: site-to-site VPN that needs dynamic routing between sites", "IP protocol 47 = GRE"] }], prereqs: [{ name: "IPsec tunnel mode", obj: "5.5.h" }], resources: [], labs: [], vocab: [{ term: "GRE over IPsec", q: "Why use GRE with IPsec instead of IPsec alone?", options: ["GRE is faster than IPsec", "GRE adds encryption that IPsec lacks", "GRE supports multicast and routing protocols that IPsec cannot carry", "GRE reduces packet size"], answer: 2, explain: "IPsec alone can't carry multicast or routing protocol traffic. GRE tunnels it, and IPsec encrypts the GRE packet." }] },

  // 5.6 — ACLs
  "5.6.a": { difficulty: 40, studyTime: 20, examFreq: 65, why: "Standard ACLs filter by SOURCE IP only. Numbers 1-99 and 1300-1999. Place near DESTINATION.", ciscoIntent: "Configure standard ACLs", cheatSheet: [{ heading: "Standard ACL", items: ["Filters based on SOURCE IP address only — no destination, no protocol, no port", "Numbered: 1-99 (original range), 1300-1999 (expanded range)", "<code>access-list 10 permit 192.168.1.0 0.0.0.255</code> — permit /24 subnet", "<code>access-list 10 deny host 10.1.1.5</code> — deny single host (or <code>10.1.1.5 0.0.0.0</code>)", "<code>access-list 10 permit any</code> — permit all (needed to override implicit deny)", "Placement: near DESTINATION — because it can only filter source, placing near source would block traffic to all destinations"] }], prereqs: [{ name: "Subnetting", obj: "1.6" }], resources: [], labs: [{ name: "Standard ACL lab", desc: "Create standard ACL to permit one subnet and deny all others" }], vocab: [{ term: "Standard ACL", q: "Standard ACLs filter traffic based on:", options: ["Source and destination IP", "Source IP only", "Destination IP only", "Protocol and port"], answer: 1, explain: "Standard ACLs can only match on source IP address. For more granularity, use extended ACLs." }] },

  "5.6.b": { difficulty: 50, studyTime: 25, examFreq: 70, why: "Extended ACLs are the most heavily tested ACL type. Source, dest, protocol, port. Numbers 100-199. Place near SOURCE.", ciscoIntent: "Configure extended ACLs", cheatSheet: [{ heading: "Extended ACL", items: ["Filters: source IP, destination IP, protocol (TCP/UDP/ICMP), port number", "Numbered: 100-199 (original), 2000-2699 (expanded)", "<code>access-list 100 permit tcp 192.168.1.0 0.0.0.255 host 10.1.1.100 eq 80</code>", "Breakdown: permit TCP from 192.168.1.0/24 to host 10.1.1.100 on port 80 (HTTP)", "<code>access-list 100 deny icmp any any</code> — block all ICMP (ping)", "<code>access-list 100 permit ip any any</code> — permit everything else", "Port operators: <code>eq</code> (equal), <code>gt</code> (greater), <code>lt</code> (less), <code>range</code>", "Placement: near SOURCE — has full granularity, block unwanted traffic early"] }], prereqs: [{ name: "Standard ACL", obj: "5.6.a" }, { name: "TCP/UDP ports", obj: "1.5" }], resources: [], labs: [{ name: "Extended ACL lab", desc: "Block HTTP to a server, allow everything else" }], vocab: [{ term: "Extended ACL", q: "Which command permits SSH from 10.0.0.0/8 to host 172.16.1.1?", options: ["<code>access-list 100 permit tcp 10.0.0.0 0.255.255.255 host 172.16.1.1 eq 22</code>", "<code>access-list 10 permit tcp 10.0.0.0 0.255.255.255 host 172.16.1.1 eq 22</code>", "<code>access-list 100 permit 10.0.0.0 0.255.255.255 host 172.16.1.1</code>", "<code>access-list 100 permit udp 10.0.0.0 0.255.255.255 host 172.16.1.1 eq 22</code>"], answer: 0, explain: "Extended ACL (100-199) + TCP protocol + source with wildcard + destination host + eq 22 (SSH). SSH uses TCP, not UDP." }] },

  "5.6.c": { difficulty: 35, studyTime: 15, examFreq: 50, why: "Named ACLs are easier to edit and read. Know the syntax difference from numbered ACLs.", ciscoIntent: "Configure named ACLs", cheatSheet: [{ heading: "Named ACLs", items: ["<code>ip access-list standard BLOCK_GUEST</code> — enters named standard ACL config mode", "<code>ip access-list extended WEB_FILTER</code> — enters named extended ACL config mode", "Inside: <code>permit 192.168.1.0 0.0.0.255</code> (no 'access-list #' prefix)", "Advantages over numbered: descriptive name, can delete individual entries by sequence number", "Entries auto-numbered by 10 (10, 20, 30...) — can insert between them", "Applied same way: <code>ip access-group WEB_FILTER in</code>"] }], prereqs: [{ name: "Standard ACL", obj: "5.6.a" }, { name: "Extended ACL", obj: "5.6.b" }], resources: [], labs: [{ name: "Named ACL", desc: "Create named extended ACL, edit entries using sequence numbers" }], vocab: [{ term: "Named ACL", q: "What is an advantage of named ACLs over numbered ACLs?", options: ["They are faster to process", "Individual entries can be deleted or inserted by sequence number", "They don't have an implicit deny", "They can filter by MAC address"], answer: 1, explain: "Named ACLs allow editing individual lines via sequence numbers. Numbered ACLs require deleting and recreating the entire ACL." }] },

  "5.6.d": { difficulty: 45, studyTime: 20, examFreq: 65, why: "Wildcard masks confuse students. Inverse of subnet mask. 0 = must match, 1 = ignore. Know how to calculate them.", ciscoIntent: "Calculate and apply wildcard masks", cheatSheet: [{ heading: "Wildcard Masks", items: ["Wildcard mask = inverse of subnet mask", "0 bits = MUST match exactly. 1 bits = don't care (ignore)", "Subnet 255.255.255.0 → Wildcard 0.0.0.255", "Subnet 255.255.255.240 → Wildcard 0.0.0.15 (256 - 240 = 16, minus 1 = 15)", "Quick math: subtract each octet from 255", "Example: 255.255.252.0 → 0.0.3.255 (255-255=0, 255-252=3, 255-0=255)", "Special: <code>host 10.1.1.1</code> = <code>10.1.1.1 0.0.0.0</code> (exact match)", "Special: <code>any</code> = <code>0.0.0.0 255.255.255.255</code> (match everything)"] }], prereqs: [{ name: "Subnetting", obj: "1.6" }], resources: [], labs: [{ name: "Wildcard math", desc: "Calculate wildcard masks for /24, /28, /22, /20" }], vocab: [{ term: "Wildcard mask", q: "What is the wildcard mask for subnet 255.255.255.192 (/26)?", options: ["0.0.0.192", "0.0.0.63", "0.0.0.64", "0.0.0.127"], answer: 1, explain: "255 - 192 = 63. Wildcard = 0.0.0.63. This matches 64 addresses in the /26 subnet." }] },

  "5.6.e": { difficulty: 40, studyTime: 15, examFreq: 55, why: "Memorize common wildcard examples: host (0.0.0.0), /24 (0.0.0.255), /16 (0.0.255.255), any (255.255.255.255).", ciscoIntent: "Apply wildcard masks in ACL statements", cheatSheet: [{ heading: "Wildcard Examples", items: ["<code>0.0.0.0</code> = exact host match → shorthand: <code>host [ip]</code>", "<code>0.0.0.255</code> = match /24 network (last octet varies)", "<code>0.0.255.255</code> = match /16 network (last two octets vary)", "<code>0.0.0.15</code> = match /28 (16 addresses)", "<code>0.0.0.3</code> = match /30 (4 addresses — point-to-point links)", "<code>0.0.3.255</code> = match /22 (1024 addresses)", "<code>255.255.255.255</code> = match ANY address → shorthand: <code>any</code>", "Non-contiguous wildcards exist but are rare on CCNA"] }], prereqs: [{ name: "Wildcard masks", obj: "5.6.d" }], resources: [], labs: [], vocab: [{ term: "Wildcard shorthand", q: "In an ACL, <code>host 10.1.1.5</code> is equivalent to:", options: ["<code>10.1.1.5 255.255.255.255</code>", "<code>10.1.1.5 0.0.0.0</code>", "<code>10.1.1.0 0.0.0.255</code>", "<code>10.1.1.5 0.0.0.5</code>"], answer: 1, explain: "host keyword = wildcard 0.0.0.0 = every bit must match exactly." }] },

  "5.6.f": { difficulty: 35, studyTime: 10, examFreq: 60, why: "Implicit deny any is the #1 ACL trap on the exam. If you forget to add a permit, ALL traffic is denied.", ciscoIntent: "Explain the implicit deny and its implications", cheatSheet: [{ heading: "Implicit Deny Any", items: ["Every ACL ends with invisible <code>deny any</code> (standard) or <code>deny ip any any</code> (extended)", "NOT shown in <code>show access-lists</code> output (but it's there)", "If no entry matches, traffic is DENIED", "Must explicitly add <code>permit any</code> or <code>permit ip any any</code> if you want a default-permit policy", "An ACL with only deny statements = denies everything (including what you didn't explicitly deny)", "Common mistake: ACL with one permit statement blocks everything else due to implicit deny"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Implicit deny", q: "An ACL has one entry: <code>permit 10.1.1.0 0.0.0.255</code>. What happens to traffic from 192.168.1.0/24?", options: ["Permitted (no explicit deny)", "Denied by the implicit deny any at the end", "Forwarded to the default route", "Logged and permitted"], answer: 1, explain: "No matching entry → implicit deny any drops it. Only 10.1.1.0/24 is permitted." }] },

  "5.6.g": { difficulty: 35, studyTime: 12, examFreq: 55, why: "Top-down, first-match processing. Order matters enormously. A permit-any at the top renders the rest useless.", ciscoIntent: "Explain ACL processing order", cheatSheet: [{ heading: "ACL Processing Order", items: ["Entries processed top-down, one at a time", "FIRST match wins — processing stops at first matching entry", "If <code>permit any</code> is first, nothing below it matters", "More specific entries MUST be placed before general entries", "Example: deny host 10.1.1.5 BEFORE permit 10.1.1.0 0.0.0.255", "If reversed, the host would match the permit first and never hit the deny", "Implicit deny is always last (processed only if nothing else matches)"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "First match", q: "An ACL has: 1) permit any, 2) deny host 10.1.1.5. What happens to 10.1.1.5?", options: ["Denied — the deny is more specific", "Permitted — 'permit any' matches first and stops processing", "Dropped — both rules cancel out", "Logged and denied"], answer: 1, explain: "First match wins. 'permit any' matches everything, including 10.1.1.5. The deny statement is never reached." }] },

  "5.6.h": { difficulty: 40, studyTime: 15, examFreq: 60, why: "Standard ACL placement is a trick question. Place near DESTINATION because it only filters source IP.", ciscoIntent: "Determine correct standard ACL placement", cheatSheet: [{ heading: "Standard ACL Placement", items: ["Place standard ACLs NEAR THE DESTINATION", "Why: standard ACLs only match source IP — they can't distinguish destination", "If placed near source: blocks traffic to ALL destinations, not just the intended one", "Example: want to block Host A from reaching Server B only", "If placed near Host A: blocks Host A from reaching ANYTHING (not just Server B)", "If placed near Server B: blocks only traffic from Host A to Server B", "Mnemonic: Standard = near deStination"] }], prereqs: [{ name: "Standard ACL", obj: "5.6.a" }], resources: [], labs: [], vocab: [{ term: "Standard placement", q: "You want to block 10.0.0.0/8 from reaching server 172.16.1.1. Where should the standard ACL be placed?", options: ["On the router closest to 10.0.0.0/8", "On the router closest to 172.16.1.1", "On the core router", "On the server itself"], answer: 1, explain: "Standard ACL near destination. Placing it near source would block 10.0.0.0/8 from reaching everything, not just the server." }] },

  "5.6.i": { difficulty: 40, studyTime: 15, examFreq: 60, why: "Extended ACL placement is the opposite of standard: place near SOURCE because it has full granularity to filter precisely.", ciscoIntent: "Determine correct extended ACL placement", cheatSheet: [{ heading: "Extended ACL Placement", items: ["Place extended ACLs NEAR THE SOURCE", "Why: extended ACLs can match source, dest, protocol, port — full granularity", "Placing near source blocks unwanted traffic EARLY — saves bandwidth", "No risk of over-blocking because the ACL is precise enough", "Example: block HTTP (port 80) from LAN A to Server B", "Extended ACL on router closest to LAN A: blocks only HTTP to Server B", "Mnemonic: Extended = near Exit (source)"] }], prereqs: [{ name: "Extended ACL", obj: "5.6.b" }], resources: [], labs: [], vocab: [{ term: "Extended placement", q: "An extended ACL blocking Telnet from subnet A to subnet B should be placed:", options: ["Near subnet B (destination)", "Near subnet A (source)", "On the core router", "On a DHCP server"], answer: 1, explain: "Extended ACLs near source. They have enough granularity to be precise, so block early to save bandwidth." }] },

  "5.6.j": { difficulty: 35, studyTime: 12, examFreq: 55, why: "Applying ACLs to interfaces is a configure-and-verify skill. Know ip access-group, in vs out.", ciscoIntent: "Apply ACLs to interfaces", cheatSheet: [{ heading: "Apply ACL to Interface", items: ["<code>interface GigabitEthernet0/0</code>", "<code>ip access-group [ACL-name-or-#] in</code> — filter traffic entering the interface", "<code>ip access-group [ACL-name-or-#] out</code> — filter traffic leaving the interface", "Only ONE ACL per interface, per direction, per protocol", "in = traffic coming INTO the router through this interface", "out = traffic going OUT of the router through this interface", "Perspective is always from the ROUTER'S point of view"] }], prereqs: [], resources: [], labs: [{ name: "Apply ACL", desc: "Apply ACL to interface, test in vs out, verify with show ip interface" }], vocab: [{ term: "ip access-group", q: "What does <code>ip access-group 100 in</code> on Gi0/1 do?", options: ["Applies ACL 100 to traffic leaving Gi0/1", "Applies ACL 100 to traffic entering Gi0/1 (toward the router)", "Creates ACL 100", "Applies ACL 100 to all interfaces"], answer: 1, explain: "'in' = traffic entering the router through that interface. ACL 100 filters inbound traffic on Gi0/1." }] },

  "5.6.k": { difficulty: 30, studyTime: 10, examFreq: 40, why: "access-class on VTY lines restricts who can SSH/Telnet to the device. Different command than ip access-group.", ciscoIntent: "Apply ACL to VTY lines for management access control", cheatSheet: [{ heading: "ACL on VTY Lines", items: ["<code>line vty 0 15</code>", "<code>access-class 10 in</code> — applies ACL 10 to restrict which IPs can connect via VTY", "Uses <code>access-class</code>, NOT <code>ip access-group</code> (that's for interfaces)", "Standard ACL is sufficient — only need to filter source IP of admin", "Example: only allow 10.1.1.0/24 to SSH to the router", "<code>access-list 10 permit 10.1.1.0 0.0.0.255</code> → <code>access-class 10 in</code> on VTY"] }], prereqs: [{ name: "VTY lines", obj: "5.3.d" }, { name: "Standard ACL", obj: "5.6.a" }], resources: [], labs: [{ name: "VTY ACL", desc: "Restrict SSH access to management subnet only using access-class" }], vocab: [{ term: "access-class", q: "Which command restricts VTY access to only 10.0.0.0/8?", options: ["<code>ip access-group 10 in</code> on VTY lines", "<code>access-class 10 in</code> on VTY lines (with ACL 10 permitting 10.0.0.0/8)", "<code>transport input 10.0.0.0</code>", "<code>permit vty 10.0.0.0</code>"], answer: 1, explain: "access-class applies ACLs to VTY lines. ip access-group is for interfaces, not VTY." }] },

  "5.6.l": { difficulty: 30, studyTime: 12, examFreq: 35, why: "Named ACLs can be edited using sequence numbers. Know how to insert and delete specific entries.", ciscoIntent: "Edit ACL entries using sequence numbers", cheatSheet: [{ heading: "Editing ACLs", items: ["Named ACLs auto-assign sequence numbers: 10, 20, 30...", "<code>ip access-list extended WEB_FILTER</code> — enter the ACL", "<code>no 20</code> — delete entry at sequence 20", "<code>15 permit tcp host 10.1.1.5 any eq 443</code> — insert at sequence 15 (between 10 and 20)", "Numbered ACLs: traditionally must delete entire ACL and recreate", "Modern IOS: can edit numbered ACLs via <code>ip access-list standard 10</code> and use sequence numbers", "<code>show access-lists</code> — displays sequence numbers for each entry"] }], prereqs: [{ name: "Named ACLs", obj: "5.6.c" }], resources: [], labs: [{ name: "Edit ACL", desc: "Add and remove entries by sequence number in a named ACL" }], vocab: [{ term: "Sequence numbers", q: "How do you insert a new ACL entry between sequence 10 and 20?", options: ["Use a sequence number between 10 and 20, such as 15", "Delete both entries and recreate them", "Use the insert command", "ACL entries cannot be reordered"], answer: 0, explain: "Assign a sequence number like 15 to place the entry between 10 and 20. Named ACLs support this natively." }] },

  "5.6.m": { difficulty: 25, studyTime: 10, examFreq: 45, why: "Verification commands for ACLs are testable. Know show access-lists and what the output tells you (match counts).", ciscoIntent: "Verify ACL configuration and operation", cheatSheet: [{ heading: "Verify ACLs", items: ["<code>show access-lists</code> — display all ACLs with sequence numbers and match counts", "<code>show ip access-lists</code> — same but only IPv4 ACLs", "<code>show running-config | include access</code> — quick filter for ACL-related config", "<code>show ip interface [intf]</code> — shows which ACLs are applied (inbound/outbound)", "Match counts show how many packets hit each ACL entry (useful for troubleshooting)", "<code>clear access-list counters</code> — reset match counts to zero"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "show access-lists", q: "What information does <code>show access-lists</code> provide that <code>show running-config</code> does not?", options: ["The interface where the ACL is applied", "Match counts showing how many packets hit each entry", "The wildcard mask in decimal", "The ACL creation date"], answer: 1, explain: "show access-lists includes match counts (number of packets matching each entry) and sequence numbers. Running-config does not." }] },

  // 5.7 — Layer 2 security
  "5.7.a": { difficulty: 35, studyTime: 15, examFreq: 50, why: "DHCP snooping is foundational — it blocks rogue DHCP servers AND builds the binding table used by DAI.", ciscoIntent: "Explain DHCP snooping purpose and trusted/untrusted ports", cheatSheet: [{ heading: "DHCP Snooping Purpose", items: ["Blocks rogue DHCP servers by dropping DHCP server messages on untrusted ports", "Untrusted port (default) = blocks DHCP OFFER and DHCP ACK from that port", "Trusted port = allows all DHCP messages (set on uplinks and legitimate DHCP server ports)", "Builds a DHCP snooping binding table (MAC, IP, VLAN, port, lease time)", "Binding table is used by DAI and IP Source Guard for further validation", "Prevents DHCP spoofing/starvation attacks"] }], prereqs: [{ name: "DHCP", obj: "4.3" }], resources: [], labs: [{ name: "DHCP snooping", desc: "Enable snooping, set trusted ports, verify binding table" }], vocab: [{ term: "DHCP snooping", q: "By default, are switch ports trusted or untrusted for DHCP snooping?", options: ["Trusted", "Untrusted", "Depends on VLAN", "Depends on port speed"], answer: 1, explain: "All ports default to untrusted. You must explicitly trust uplinks and DHCP server ports." }] },

  "5.7.b": { difficulty: 40, studyTime: 15, examFreq: 50, why: "Know the exact commands to enable DHCP snooping globally, per VLAN, and per port.", ciscoIntent: "Configure DHCP snooping", cheatSheet: [{ heading: "DHCP Snooping Config", items: ["Step 1: <code>ip dhcp snooping</code> — enable globally", "Step 2: <code>ip dhcp snooping vlan 10,20</code> — enable on specific VLANs", "Step 3: On uplink/DHCP server ports: <code>ip dhcp snooping trust</code>", "Access ports remain untrusted (default) — no command needed", "<code>no ip dhcp snooping information option</code> — disable option 82 insertion (needed when DHCP server doesn't support it)", "<code>show ip dhcp snooping</code> — verify snooping status", "<code>show ip dhcp snooping binding</code> — view binding table"] }], prereqs: [{ name: "DHCP snooping purpose", obj: "5.7.a" }], resources: [], labs: [{ name: "DHCP snooping config", desc: "Enable snooping on VLAN 10, trust uplinks, verify binding table" }], vocab: [{ term: "DHCP snooping config", q: "After enabling DHCP snooping, which ports must you manually configure as trusted?", options: ["All access ports", "Uplink ports and legitimate DHCP server ports", "Only the management VLAN port", "All trunk ports automatically become trusted"], answer: 1, explain: "Only uplinks and DHCP server ports should be trusted. All others stay untrusted to block rogue servers." }] },

  "5.7.c": { difficulty: 30, studyTime: 10, examFreq: 40, why: "The binding table is the bridge between DHCP snooping and DAI. Know what fields it stores.", ciscoIntent: "Describe the DHCP snooping binding table", cheatSheet: [{ heading: "Binding Table", items: ["Stores: MAC address, IP address, VLAN, port, lease time", "Built dynamically as DHCP exchanges occur on untrusted ports", "Used by DAI (Dynamic ARP Inspection) to validate ARP packets", "Used by IP Source Guard to validate source IP on untrusted ports", "<code>show ip dhcp snooping binding</code> — view the table", "Static entries can be added: <code>ip dhcp snooping binding [MAC] vlan [#] [IP] interface [intf]</code>"] }], prereqs: [{ name: "DHCP snooping config", obj: "5.7.b" }], resources: [], labs: [], vocab: [{ term: "Binding table", q: "Which other L2 security feature uses the DHCP snooping binding table?", options: ["Port security", "STP BPDU Guard", "DAI (Dynamic ARP Inspection)", "802.1Q trunking"], answer: 2, explain: "DAI validates ARP packets against the DHCP snooping binding table to prevent ARP spoofing." }] },

  "5.7.d": { difficulty: 25, studyTime: 8, examFreq: 30, why: "Rate limiting on untrusted ports prevents DHCP starvation attacks where an attacker floods DHCP requests.", ciscoIntent: "Configure DHCP snooping rate limiting", cheatSheet: [{ heading: "DHCP Snooping Rate Limit", items: ["<code>ip dhcp snooping limit rate [pps]</code> — set on untrusted (access) ports", "Limits DHCP packets per second on that port", "Prevents DHCP starvation attacks (attacker floods DHCP Discover messages)", "Exceeding rate = port goes err-disabled", "Typical rate: 10-20 pps for access ports (one client shouldn't need more)", "Recovery: <code>shutdown</code> → <code>no shutdown</code> or <code>errdisable recovery cause dhcp-rate-limit</code>"] }], prereqs: [{ name: "DHCP snooping config", obj: "5.7.b" }], resources: [], labs: [], vocab: [{ term: "Rate limiting", q: "What happens when DHCP snooping rate limit is exceeded?", options: ["Packets are logged and forwarded", "Port is placed in err-disabled state", "DHCP server is notified", "Only excess packets are dropped"], answer: 1, explain: "Exceeding the rate limit triggers err-disabled on the port. It must be manually re-enabled (or auto-recovery configured)." }] },

  "5.7.e": { difficulty: 40, studyTime: 15, examFreq: 45, why: "DAI validates ARP against the snooping table. If the ARP doesn't match a known DHCP binding, it's dropped.", ciscoIntent: "Explain DAI and its dependency on DHCP snooping", cheatSheet: [{ heading: "DAI (Dynamic ARP Inspection)", items: ["Validates ARP packets against DHCP snooping binding table", "Untrusted port: all ARP packets are inspected", "Trusted port: ARP packets pass without inspection", "If ARP source MAC/IP doesn't match binding table → packet dropped", "Prevents ARP spoofing / ARP poisoning attacks (basis of MitM)", "REQUIRES DHCP snooping to be enabled (to build the binding table)", "For static IP hosts: use ARP ACL (<code>arp access-list</code>) to permit them"] }], prereqs: [{ name: "Binding table", obj: "5.7.c" }], resources: [], labs: [{ name: "DAI lab", desc: "Enable DAI on VLAN, verify with show ip arp inspection" }], vocab: [{ term: "DAI", q: "DAI drops an ARP packet when:", options: ["The source IP is private", "The ARP source MAC/IP doesn't match the DHCP snooping binding table", "The ARP packet is a broadcast", "The port is in trunk mode"], answer: 1, explain: "DAI compares ARP sender MAC/IP against binding table entries. Mismatch = drop. This stops ARP spoofing." }] },

  "5.7.f": { difficulty: 35, studyTime: 12, examFreq: 40, why: "Know the exact DAI commands — enable per VLAN, trust uplinks. Same trusted/untrusted model as DHCP snooping.", ciscoIntent: "Configure DAI", cheatSheet: [{ heading: "DAI Config", items: ["<code>ip arp inspection vlan 10,20</code> — enable DAI on VLANs", "<code>ip arp inspection trust</code> — on uplinks, routers, and DHCP server ports", "Access ports remain untrusted (default) — ARP is inspected", "For static IPs without DHCP: create ARP ACL", "<code>arp access-list STATIC_HOSTS</code> → <code>permit ip host 10.1.1.5 mac host 0011.2233.4455</code>", "<code>ip arp inspection filter STATIC_HOSTS vlan 10</code>", "<code>show ip arp inspection vlan 10</code> — verify status and counters"] }], prereqs: [{ name: "DAI purpose", obj: "5.7.e" }], resources: [], labs: [], vocab: [{ term: "DAI trust", q: "Which ports should be configured as DAI trusted?", options: ["All access ports", "Uplinks and router ports (where legitimate ARP originates from other network devices)", "Only the DHCP server port", "All ports in the native VLAN"], answer: 1, explain: "Trust uplinks and routers — their ARP is legitimate. Access ports stay untrusted for inspection." }] },

  "5.7.g": { difficulty: 35, studyTime: 12, examFreq: 50, why: "Port security limits MAC addresses per port — prevents MAC flooding attacks and unauthorized devices.", ciscoIntent: "Explain port security and its purpose", cheatSheet: [{ heading: "Port Security", items: ["Limits the number of MAC addresses allowed on a switchport", "Prevents CAM table overflow (MAC flooding) attacks", "Prevents unauthorized devices from connecting", "Default maximum: 1 MAC address (when port security is enabled)", "Can learn MACs dynamically, statically, or via sticky learning", "Requires the port to be a static access port or trunk (not dynamic)", "<code>switchport mode access</code> MUST be set before enabling port security"] }], prereqs: [], resources: [], labs: [{ name: "Port security", desc: "Enable port security, set max 2, test with third device" }], vocab: [{ term: "Port security", q: "What is the default maximum MAC address count when port security is enabled?", options: ["0", "1", "5", "Unlimited"], answer: 1, explain: "Default maximum = 1 MAC address. If a second MAC is seen, a violation occurs." }] },

  "5.7.h": { difficulty: 35, studyTime: 12, examFreq: 50, why: "Know the exact commands to enable port security and set the maximum. Interface must be a static access port first.", ciscoIntent: "Configure port security", cheatSheet: [{ heading: "Port Security Config", items: ["<code>interface Gi0/1</code>", "<code>switchport mode access</code> — REQUIRED before enabling port security", "<code>switchport port-security</code> — enables port security (default max: 1)", "<code>switchport port-security maximum 3</code> — allow up to 3 MACs", "<code>switchport port-security mac-address 0011.2233.4455</code> — static MAC", "<code>switchport port-security violation shutdown</code> — set violation mode", "<code>show port-security interface Gi0/1</code> — verify config and status"] }], prereqs: [{ name: "Port security purpose", obj: "5.7.g" }], resources: [], labs: [], vocab: [{ term: "Port security prereq", q: "What must be configured before enabling port security?", options: ["DHCP snooping", "<code>switchport mode access</code> (or trunk)", "A VLAN assignment", "An IP address on the port"], answer: 1, explain: "Port security requires the port to be a static access or trunk port. Dynamic ports (DTP) are not compatible." }] },

  "5.7.i": { difficulty: 30, studyTime: 10, examFreq: 40, why: "Sticky MAC auto-learns and saves to running-config. No need to manually type each MAC address.", ciscoIntent: "Configure sticky MAC learning", cheatSheet: [{ heading: "Sticky MAC", items: ["<code>switchport port-security mac-address sticky</code>", "Switch auto-learns the MAC and adds it to running-config as a static entry", "Survives port link flaps but NOT a reboot (unless you <code>copy run start</code>)", "Combines convenience of dynamic learning with persistence of static config", "If max is 3: first 3 MACs learned are 'stuck' — any additional triggers violation", "View: <code>show port-security address</code> — lists all learned sticky MACs"] }], prereqs: [{ name: "Port security config", obj: "5.7.h" }], resources: [], labs: [], vocab: [{ term: "Sticky MAC", q: "Sticky MAC addresses survive a reboot if you:", options: ["Enable DHCP snooping", "Run <code>copy running-config startup-config</code>", "Set the port to trunk mode", "They always survive reboots automatically"], answer: 1, explain: "Sticky MACs are saved to running-config. Without copy run start, they're lost on reboot." }] },

  "5.7.j": { difficulty: 40, studyTime: 15, examFreq: 55, why: "Three violation modes are a top exam topic. Know what each does: protect (silent drop), restrict (drop + log), shutdown (err-disabled).", ciscoIntent: "Compare port security violation modes", cheatSheet: [{ heading: "Violation Modes", items: ["<code>switchport port-security violation protect</code> — drops violating frames silently, NO log, NO counter increment, port stays UP", "<code>switchport port-security violation restrict</code> — drops frames + sends syslog message + increments violation counter, port stays UP", "<code>switchport port-security violation shutdown</code> — puts port in err-disabled state (effectively down), DEFAULT mode", "Shutdown is the default and most secure — port goes completely down", "Protect is least visible — no indication of violation", "Restrict is the middle ground — drops + alerts but doesn't kill the port"] }], prereqs: [{ name: "Port security config", obj: "5.7.h" }], resources: [], labs: [{ name: "Violation modes", desc: "Configure each mode, trigger violation, observe behavior" }], vocab: [{ term: "Violation modes", q: "Which port security violation mode drops traffic AND sends a syslog message but keeps the port up?", options: ["Protect", "Restrict", "Shutdown", "Disable"], answer: 1, explain: "Restrict = drop + log + counter. Protect = drop silently. Shutdown = err-disabled (port down)." }] },

  "5.7.k": { difficulty: 30, studyTime: 10, examFreq: 40, why: "After a shutdown violation, the port is err-disabled. Know how to recover it — manually or with auto-recovery.", ciscoIntent: "Recover a port from err-disabled state", cheatSheet: [{ heading: "Err-Disabled Recovery", items: ["After shutdown violation, port enters err-disabled state", "Manual recovery: <code>shutdown</code> then <code>no shutdown</code> on the interface", "Auto recovery: <code>errdisable recovery cause psecure-violation</code>", "<code>errdisable recovery interval 300</code> — auto-retry every 300 seconds (default: 300)", "<code>show errdisable recovery</code> — check which causes have auto-recovery enabled", "<code>show interfaces status err-disabled</code> — list all err-disabled ports", "Fix the root cause first (remove unauthorized device) before re-enabling"] }], prereqs: [{ name: "Violation modes", obj: "5.7.j" }], resources: [], labs: [], vocab: [{ term: "Err-disabled", q: "A port is in err-disabled state due to port security. What is the quickest manual fix?", options: ["<code>no switchport port-security</code>", "<code>shutdown</code> then <code>no shutdown</code> on the interface", "<code>clear port-security</code>", "Reboot the switch"], answer: 1, explain: "Shutdown then no shutdown bounces the interface and clears err-disabled. But fix the violation cause first." }] },

  // 5.8 — AAA and TACACS+/RADIUS
  "5.8.a": { difficulty: 20, studyTime: 8, examFreq: 30, why: "Authentication is the first A — who are you? Verify identity before granting access.", ciscoIntent: "Define authentication in the AAA framework", cheatSheet: [{ heading: "Authentication", items: ["Authentication = verify identity — 'Who are you?'", "Methods: username/password, certificate, biometric, token", "Local authentication: credentials stored on the device itself", "Remote authentication: credentials checked against external server (RADIUS/TACACS+)", "Without authentication, anyone who connects has access", "First step in AAA — must authenticate before authorizing"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Authentication", q: "In AAA, what does authentication determine?", options: ["What commands you can run", "Your identity (who you are)", "What you accessed during the session", "Your VLAN assignment"], answer: 1, explain: "Authentication = identity verification. Authorization = permissions. Accounting = logging what happened." }] },

  "5.8.b": { difficulty: 20, studyTime: 8, examFreq: 30, why: "Authorization determines what you CAN do after authentication. Per-command authorization is a TACACS+ strength.", ciscoIntent: "Define authorization in the AAA framework", cheatSheet: [{ heading: "Authorization", items: ["Authorization = what are you allowed to do? — 'What can you access?'", "Happens AFTER authentication succeeds", "Examples: which commands you can run, which VLANs you can access, which networks you can reach", "TACACS+ separates authorization from authentication — enables per-command authorization", "RADIUS combines authentication + authorization in a single exchange", "IOS privilege levels (0-15) are a form of local authorization"] }], prereqs: [{ name: "Authentication", obj: "5.8.a" }], resources: [], labs: [], vocab: [{ term: "Authorization", q: "A user authenticates successfully but cannot enter configuration mode. This is controlled by:", options: ["Authentication", "Authorization", "Accounting", "Encryption"], answer: 1, explain: "Authorization controls what an authenticated user is allowed to do. The user proved their identity but lacks the permission." }] },

  "5.8.c": { difficulty: 20, studyTime: 8, examFreq: 25, why: "Accounting tracks what users did — audit trail. Essential for compliance and incident investigation.", ciscoIntent: "Define accounting in the AAA framework", cheatSheet: [{ heading: "Accounting", items: ["Accounting = what did you do? — audit trail of all actions", "Logs: login time, logout time, commands executed, data transferred", "Used for: compliance audits, incident investigation, billing (ISP)", "Sent to external server (RADIUS/TACACS+) for centralized logging", "Without accounting, you have no record of who did what", "Both TACACS+ and RADIUS support accounting (RADIUS uses UDP 1813)"] }], prereqs: [{ name: "Authorization", obj: "5.8.b" }], resources: [], labs: [], vocab: [{ term: "Accounting", q: "After a network breach, which AAA function provides the audit trail?", options: ["Authentication", "Authorization", "Accounting", "Encryption"], answer: 2, explain: "Accounting logs all actions — who logged in, when, what commands were run. Essential for forensic investigation." }] },

  "5.8.d": { difficulty: 35, studyTime: 15, examFreq: 45, why: "TACACS+ details are heavily tested. TCP 49, Cisco proprietary, encrypts FULL packet, separates AAA functions.", ciscoIntent: "Describe TACACS+ characteristics", cheatSheet: [{ heading: "TACACS+", items: ["Transport: TCP port 49", "Cisco proprietary protocol", "Encrypts the ENTIRE packet body (not just password)", "Separates authentication, authorization, and accounting into individual processes", "Per-command authorization — granular control over which commands each user can run", "Best for: device administration (managing routers/switches)", "Supports multiple protocol types (IP, IPX, AppleTalk — legacy)", "More bandwidth overhead than RADIUS due to TCP + full encryption"] }], prereqs: [{ name: "AAA overview", obj: "5.8.a" }], resources: [], labs: [], vocab: [{ term: "TACACS+", q: "TACACS+ uses which transport protocol and port?", options: ["UDP 1812", "TCP 49", "UDP 49", "TCP 1812"], answer: 1, explain: "TACACS+ uses TCP port 49. RADIUS uses UDP 1812/1813." }] },

  "5.8.e": { difficulty: 35, studyTime: 15, examFreq: 45, why: "RADIUS contrasts with TACACS+ on every key point. UDP 1812/1813, open standard, encrypts PASSWORD only, combines auth+authz.", ciscoIntent: "Describe RADIUS characteristics and compare to TACACS+", cheatSheet: [{ heading: "RADIUS", items: ["Transport: UDP 1812 (authentication/authorization) + UDP 1813 (accounting)", "Open standard (RFC 2865/2866) — multi-vendor support", "Encrypts PASSWORD ONLY (rest of packet is cleartext)", "Combines authentication and authorization in a SINGLE exchange (Access-Accept includes authz attributes)", "Best for: network access control (802.1X, VPN, wireless)", "Less overhead than TACACS+ (UDP, partial encryption)", "No per-command authorization — grants access level as a whole"] }], prereqs: [{ name: "TACACS+", obj: "5.8.d" }], resources: [], labs: [], vocab: [{ term: "RADIUS ports", q: "Which ports does RADIUS use?", options: ["TCP 49 for all functions", "UDP 1812 (auth) and UDP 1813 (accounting)", "TCP 1812 and TCP 1813", "UDP 49 and UDP 50"], answer: 1, explain: "RADIUS: UDP 1812 for auth/authz, UDP 1813 for accounting. TACACS+: TCP 49 for everything." }] },

  "5.8.f": { difficulty: 30, studyTime: 10, examFreq: 40, why: "Know WHEN to use each: TACACS+ for device admin (CLI), RADIUS for network access (802.1X, VPN, wireless).", ciscoIntent: "Select appropriate AAA protocol for use case", cheatSheet: [{ heading: "TACACS+ vs RADIUS Use Cases", items: ["TACACS+ for device administration:", "  - Managing routers, switches, firewalls via CLI", "  - Need per-command authorization (admin vs readonly)", "  - Cisco-heavy environment", "RADIUS for network access:", "  - 802.1X wired/wireless authentication", "  - VPN authentication", "  - ISP subscriber access", "  - Multi-vendor environments", "Key comparison: TACACS+ = TCP 49, full encryption, separates AAA. RADIUS = UDP 1812/1813, password-only encryption, combines auth+authz."] }], prereqs: [{ name: "TACACS+", obj: "5.8.d" }, { name: "RADIUS", obj: "5.8.e" }], resources: [], labs: [], vocab: [{ term: "Use case", q: "You need per-command authorization for router admin access. Which protocol?", options: ["RADIUS", "TACACS+", "LDAP", "Kerberos"], answer: 1, explain: "TACACS+ separates AAA functions, enabling per-command authorization. RADIUS combines auth+authz and can't do per-command control." }] },

  // 5.9 — Wireless security protocols
  "5.9.a": { difficulty: 20, studyTime: 8, examFreq: 25, why: "WEP is broken and deprecated. Know it uses RC4 with a tiny 24-bit IV. This is the 'wrong answer' choice on the exam.", ciscoIntent: "Explain why WEP is insecure", cheatSheet: [{ heading: "WEP", items: ["Wired Equivalent Privacy — original 802.11 security (1999)", "Encryption: RC4 stream cipher", "IV (Initialization Vector): only 24 bits — repeats quickly on busy networks", "Cracked in minutes with tools like aircrack-ng", "Key length: 64-bit (40-bit key + 24-bit IV) or 128-bit (104-bit key + 24-bit IV)", "NEVER use — if you see WEP as an answer choice, it's almost always wrong", "Replaced by WPA, then WPA2, then WPA3"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "WEP", q: "The primary weakness of WEP is:", options: ["It uses AES encryption", "Its 24-bit IV repeats quickly, allowing statistical key recovery", "It requires a RADIUS server", "It only works on 2.4 GHz"], answer: 1, explain: "24-bit IV = only ~16.7 million possible values. On busy networks, IVs repeat, enabling statistical attacks to recover the key." }] },

  "5.9.b": { difficulty: 20, studyTime: 8, examFreq: 25, why: "WPA was a stopgap fix for WEP. Uses TKIP which is better but still deprecated. Know TKIP = WPA.", ciscoIntent: "Describe WPA and TKIP", cheatSheet: [{ heading: "WPA", items: ["Wi-Fi Protected Access — interim fix while WPA2 was developed (2003)", "Encryption: TKIP (Temporal Key Integrity Protocol) — improved RC4 implementation", "TKIP features: per-packet key mixing, 48-bit IV (vs WEP's 24-bit), MIC (message integrity check)", "Still crackable — TKIP has known vulnerabilities", "Deprecated — do not use for new deployments", "WPA = TKIP. WPA2 = AES/CCMP. Don't confuse them."] }], prereqs: [{ name: "WEP", obj: "5.9.a" }], resources: [], labs: [], vocab: [{ term: "WPA/TKIP", q: "WPA uses which encryption protocol?", options: ["AES", "TKIP", "RC4 with 24-bit IV", "SAE"], answer: 1, explain: "WPA uses TKIP (improved RC4). WPA2 upgraded to AES/CCMP. WPA3 uses SAE for key exchange." }] },

  "5.9.c": { difficulty: 25, studyTime: 10, examFreq: 40, why: "WPA2 is the current required standard. AES/CCMP. Know that CCMP is the cipher suite and AES is the underlying algorithm.", ciscoIntent: "Describe WPA2 and AES/CCMP", cheatSheet: [{ heading: "WPA2", items: ["Wi-Fi Protected Access version 2 (802.11i — 2004)", "Encryption: AES (Advanced Encryption Standard) with CCMP (Counter Mode CBC-MAC Protocol)", "CCMP provides: confidentiality (AES-CTR), integrity (CBC-MAC), authentication", "128-bit AES key — considered strong and secure", "Required for Wi-Fi certification since 2006", "Vulnerable to KRACK attack (2017) — patched by vendors, led to WPA3 development", "WPA2-Personal = PSK. WPA2-Enterprise = 802.1X/RADIUS."] }], prereqs: [{ name: "WPA", obj: "5.9.b" }], resources: [], labs: [], vocab: [{ term: "WPA2", q: "WPA2 uses which encryption algorithm?", options: ["TKIP", "RC4", "AES/CCMP", "DES"], answer: 2, explain: "WPA2 = AES/CCMP. This is the key fact. TKIP = WPA. RC4 = WEP." }] },

  "5.9.d": { difficulty: 30, studyTime: 12, examFreq: 40, why: "WPA3 is new on the exam (v1.1). SAE replaces PSK handshake. Immune to offline dictionary attacks. Know OWE for open networks.", ciscoIntent: "Describe WPA3 improvements over WPA2", cheatSheet: [{ heading: "WPA3", items: ["SAE (Simultaneous Authentication of Equals) — replaces 4-way handshake for Personal mode", "SAE uses Dragonfly key exchange — immune to offline dictionary attacks", "Even if handshake is captured, attacker CANNOT brute-force the password offline", "Forward secrecy — compromised password doesn't decrypt past sessions", "OWE (Opportunistic Wireless Encryption) — encrypts open networks without passwords", "WPA3-Enterprise: 192-bit minimum security mode (CNSA suite)", "Transition mode: WPA3/WPA2 mixed for backward compatibility"] }], prereqs: [{ name: "WPA2", obj: "5.9.c" }], resources: [], labs: [], vocab: [{ term: "SAE", q: "What is the primary security improvement of WPA3-Personal's SAE over WPA2-PSK?", options: ["Faster encryption", "Protection against offline dictionary attacks", "Longer passwords supported", "Works with older devices"], answer: 1, explain: "SAE uses Dragonfly handshake — even if captured, the handshake can't be used for offline brute-force. WPA2-PSK handshakes can." }] },

  "5.9.e": { difficulty: 25, studyTime: 10, examFreq: 35, why: "Personal mode (PSK) means one shared password for everyone. Simple but less secure — no individual accountability.", ciscoIntent: "Describe wireless Personal mode (PSK)", cheatSheet: [{ heading: "Personal Mode (PSK)", items: ["PSK = Pre-Shared Key — one password shared by all users", "Simple setup — enter password on AP and each client", "No external server required (no RADIUS)", "Weakness: if one person leaves, must change the password for everyone", "No per-user accountability — everyone uses the same credential", "Suitable for: home networks, small offices", "Not suitable for: enterprise environments with many users"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "PSK weakness", q: "An employee with the Wi-Fi PSK leaves the company. What must you do?", options: ["Nothing — their access is automatically revoked", "Change the PSK on the AP and all client devices", "Remove their MAC from the allow list", "Disable and re-enable the SSID"], answer: 1, explain: "PSK = shared password. When anyone who knows it leaves, you must change it everywhere. This doesn't scale." }] },

  "5.9.f": { difficulty: 30, studyTime: 12, examFreq: 40, why: "Enterprise mode (802.1X) uses RADIUS for per-user authentication. Scalable. Know 802.1X roles: supplicant, authenticator, server.", ciscoIntent: "Describe wireless Enterprise mode (802.1X)", cheatSheet: [{ heading: "Enterprise Mode (802.1X)", items: ["Uses 802.1X framework with RADIUS server for authentication", "Each user has unique credentials (username/password or certificate)", "Roles: Supplicant (client), Authenticator (AP/WLC), Authentication Server (RADIUS)", "EAP (Extensible Authentication Protocol) — framework for various auth methods", "Common EAP types: EAP-TLS (certificate), PEAP (password+cert), EAP-FAST (Cisco)", "Per-user accountability — centralized logging, easy revocation", "Scalable — add/remove users on RADIUS server, no AP changes needed"] }], prereqs: [{ name: "RADIUS", obj: "5.8.e" }], resources: [], labs: [], vocab: [{ term: "802.1X", q: "In 802.1X, what is the role of the authenticator?", options: ["Stores user credentials", "The client requesting access (laptop/phone)", "The network device (AP/switch) that relays auth between supplicant and RADIUS server", "The RADIUS server"], answer: 2, explain: "Authenticator = AP or switch — sits between the supplicant (client) and authentication server (RADIUS). Relays EAP messages." }] },

  // 5.10 — WLAN GUI config
  "5.10.a": { difficulty: 20, studyTime: 8, examFreq: 25, why: "First step in WLC config — access the GUI via HTTPS to the management IP.", ciscoIntent: "Access the WLC web interface", cheatSheet: [{ heading: "Access WLC GUI", items: ["Connect to WLC management IP via web browser", "Use HTTPS: <code>https://[management-IP]</code>", "Default credentials vary by model — typically admin/admin on first login", "Supported browsers: Chrome, Firefox (check WLC model for specifics)", "Must be on a network that can reach the management interface", "Initial setup can also use console port + setup wizard"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "WLC access", q: "How do you access the Cisco WLC GUI?", options: ["SSH to the WLC IP", "HTTPS to the WLC management IP address", "Telnet to port 8443", "HTTP to the AP IP address"], answer: 1, explain: "WLC GUI is accessed via HTTPS to the management IP. SSH is for CLI access, not the GUI." }] },

  "5.10.b": { difficulty: 25, studyTime: 10, examFreq: 30, why: "Creating a WLAN involves profile name, SSID, and WLAN ID. Know the GUI navigation path.", ciscoIntent: "Create a new WLAN on the WLC", cheatSheet: [{ heading: "Create WLAN", items: ["Navigate: WLANs tab → Create New → Go", "Set Profile Name — internal identifier for the WLAN config", "Set SSID — the network name clients see and connect to", "Set WLAN ID — numerical identifier (1-512 depending on model)", "Profile Name and SSID can be different (but often set the same)", "WLAN is created in disabled state — must enable after configuration"] }], prereqs: [{ name: "WLC access", obj: "5.10.a" }], resources: [], labs: [{ name: "Create WLAN", desc: "Create a new WLAN via GUI, configure security, enable it" }], vocab: [{ term: "WLAN SSID", q: "When creating a WLAN, what is the SSID?", options: ["The internal profile name used by the WLC", "The network name visible to wireless clients", "The encryption key", "The VLAN number"], answer: 1, explain: "SSID = Service Set Identifier — the human-readable network name that clients scan for and select." }] },

  "5.10.c": { difficulty: 30, studyTime: 12, examFreq: 35, why: "Security settings are the core of WLAN config. Know the exact GUI path: Layer 2 Security -> WPA+WPA2 -> AES -> PSK.", ciscoIntent: "Configure WPA2-PSK security on a WLAN", cheatSheet: [{ heading: "WLAN Security (WPA2-PSK)", items: ["Edit WLAN → Security tab → Layer 2 subtab", "Layer 2 Security: select WPA+WPA2", "WPA2 Policy: check the Enabled checkbox", "WPA2 Encryption: AES (not TKIP)", "Auth Key Mgmt: PSK", "PSK Format: ASCII → enter the pre-shared key (8-63 characters)", "This configures WPA2-Personal with AES encryption"] }], prereqs: [{ name: "WPA2", obj: "5.9.c" }], resources: [], labs: [], vocab: [{ term: "WPA2-PSK config", q: "When configuring WPA2-PSK on a WLC, which encryption should you select?", options: ["TKIP", "AES", "WEP", "RC4"], answer: 1, explain: "WPA2 requires AES/CCMP encryption. TKIP is WPA (deprecated). Always select AES for WPA2." }] },

  "5.10.d": { difficulty: 25, studyTime: 10, examFreq: 25, why: "Interface mapping determines which VLAN the WLAN traffic is placed on. Maps WLAN to a dynamic interface (VLAN).", ciscoIntent: "Map a WLAN to a VLAN interface", cheatSheet: [{ heading: "Interface Mapping", items: ["Edit WLAN → General tab", "Interface/Interface Group: select the dynamic interface", "Dynamic interfaces are pre-created and mapped to VLANs", "This determines which VLAN the WLAN client traffic is bridged to", "Example: WLAN 'Corporate' → interface 'corp-vlan' → VLAN 100", "Allows different WLANs to place clients in different VLANs for segmentation", "Create dynamic interfaces: Controller → Interfaces → New"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Interface mapping", q: "What does mapping a WLAN to a dynamic interface accomplish?", options: ["Sets the encryption type", "Assigns WLAN client traffic to a specific VLAN", "Changes the SSID name", "Selects the radio frequency band"], answer: 1, explain: "Dynamic interfaces are tied to VLANs. Mapping a WLAN to one places all that WLAN's client traffic into that VLAN." }] },

  "5.10.e": { difficulty: 20, studyTime: 8, examFreq: 25, why: "Final step — enable the WLAN. Without this, clients cannot see or connect to the SSID.", ciscoIntent: "Enable a WLAN and verify client association", cheatSheet: [{ heading: "Enable WLAN", items: ["Edit WLAN → General tab → Status: Enabled (check the checkbox)", "Click Apply to save changes", "WLAN must be enabled for the SSID to be broadcast", "Verify: Monitor → Clients tab — shows associated clients", "If clients can't connect: check security settings, interface mapping, and AP radio status", "WLC propagates WLAN config to all joined APs automatically"] }], prereqs: [{ name: "WLAN security", obj: "5.10.c" }], resources: [], labs: [], vocab: [{ term: "WLAN enable", q: "A WLAN is configured but no clients can see it. What is the most likely issue?", options: ["Wrong VLAN", "WLAN Status is not set to Enabled", "AES is selected instead of TKIP", "The SSID is too long"], answer: 1, explain: "New WLANs are disabled by default. You must check Status: Enabled and click Apply." }] },

  // ── Domain 6 entries ──────────────────────────────────────────────

  // 6.1 — Automation impact
  "6.1.a": { difficulty: 15, studyTime: 8, examFreq: 25, why: "The #1 benefit Cisco highlights for automation. Human error is the leading cause of network outages.", ciscoIntent: "Explain how automation reduces human error", cheatSheet: [{ heading: "Reduced Human Error", items: ["Manual CLI configuration is prone to typos, copy-paste errors, inconsistencies", "Automation applies validated, tested templates consistently every time", "Change once in template → deploy to hundreds of devices identically", "Version control (Git) tracks every change — easy rollback if something breaks", "Reduces MTTR (Mean Time To Repair) — automated remediation is faster than human troubleshooting", "Example: manually configuring 200 switch ports vs. Ansible playbook that does it in seconds"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Automation benefit", q: "What is the primary risk that network automation reduces?", options: ["Hardware failure", "Human configuration errors", "Power outages", "Vendor lock-in"], answer: 1, explain: "Human error is the #1 cause of network outages. Automation eliminates typos, inconsistencies, and missed steps." }] },

  "6.1.b": { difficulty: 15, studyTime: 8, examFreq: 25, why: "Speed is a tangible benefit. Deploying configs to 500 devices takes hours manually but seconds with automation.", ciscoIntent: "Describe faster provisioning through automation", cheatSheet: [{ heading: "Faster Provisioning", items: ["Manual: SSH to each device, paste config, verify — hours for large deployments", "Automated: push config to hundreds of devices simultaneously — seconds/minutes", "Zero-touch provisioning (ZTP) — new devices auto-configure from network server at boot", "Day 0: deploy infrastructure. Day 1: initial config. Day 2: ongoing operations", "Faster provisioning enables rapid response to business needs", "New branch office: template-based deployment in minutes, not days"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Provisioning", q: "Zero-touch provisioning (ZTP) means:", options: ["The device requires no power", "New devices auto-configure from a network server without manual CLI access", "Automation software runs without a server", "Devices are pre-configured at the factory"], answer: 1, explain: "ZTP = device boots, contacts a server, downloads its config automatically. No engineer needs to console in." }] },

  "6.1.c": { difficulty: 15, studyTime: 8, examFreq: 25, why: "Scalability — automation handles 10 devices the same as 10,000. Manual CLI doesn't scale.", ciscoIntent: "Explain how automation enables scalability", cheatSheet: [{ heading: "Scalability", items: ["Automation scripts scale linearly — same effort for 10 or 10,000 devices", "Manual CLI: effort scales with device count (10x devices = 10x work)", "Centralized controllers (SDN) manage entire network as one entity", "API-driven changes can be triggered by events, not just humans", "Cloud-scale networks are impossible to manage manually", "Template-based: update template once, apply everywhere"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Scalability", q: "Why is automation essential for managing large networks?", options: ["Devices are too complex for humans", "Manual CLI effort scales linearly with device count; automation effort stays constant", "Automation is cheaper than switches", "Large networks don't support CLI"], answer: 1, explain: "Configuring 1000 devices manually takes 1000x the effort. An Ansible playbook takes the same time regardless of device count." }] },

  "6.1.d": { difficulty: 15, studyTime: 8, examFreq: 25, why: "Consistency and compliance — every device gets the exact same config. No 'this one switch is different because Bob configured it.'", ciscoIntent: "Describe consistency and compliance benefits", cheatSheet: [{ heading: "Consistency & Compliance", items: ["Every device receives identical, validated configuration from the same template", "Drift detection — automation tools can flag devices that deviate from desired state", "Compliance: automated audits verify security policies are applied everywhere", "Version control: every change is tracked, attributed, and reversible (Git)", "Auditable: regulators can see exactly what changed, when, and by whom", "Declarative tools (Terraform, Ansible) define desired state — tool enforces it"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Configuration drift", q: "What is configuration drift?", options: ["Planned migration to new configs", "Gradual deviation from intended config due to manual changes", "Automatic config updates from the vendor", "Version mismatch between firmware"], answer: 1, explain: "Drift = devices slowly diverge from the standard over time as engineers make one-off manual changes. Automation prevents this." }] },

  "6.1.e": { difficulty: 20, studyTime: 10, examFreq: 20, why: "Self-healing is the aspirational benefit — network detects and fixes problems automatically.", ciscoIntent: "Describe self-healing networks", cheatSheet: [{ heading: "Self-Healing Networks", items: ["Automated detection of failures via monitoring and telemetry", "Automated remediation without human intervention", "Example: link failure detected → traffic rerouted → alert sent → ticket created", "Example: interface error threshold exceeded → port bounced automatically", "Requires: programmability, APIs, event-driven automation", "Intent-based networking (IBN) — define desired outcome, network self-adjusts", "Cisco DNA Center provides closed-loop automation (monitor → analyze → remediate)"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Self-healing", q: "What enables a self-healing network?", options: ["Faster CPUs in routers", "Event-driven automation that detects and remediates failures automatically", "More redundant hardware only", "Manual monitoring with faster response times"], answer: 1, explain: "Self-healing requires automation that can detect an issue and take corrective action without human intervention." }] },

  // 6.2 — Traditional vs controller-based
  "6.2.a": { difficulty: 25, studyTime: 12, examFreq: 30, why: "Traditional networking = CLI per device, distributed control plane. This is the 'old way' SDN improves upon.", ciscoIntent: "Describe traditional network management", cheatSheet: [{ heading: "Traditional Networking", items: ["Each device has its own control plane and data plane", "Distributed control plane — each router/switch makes independent decisions", "Management: SSH/Telnet CLI to each device individually", "Configuration: manual, device-by-device, vendor-specific syntax", "Troubleshooting: log into each device separately", "No centralized view — must piece together network state from individual devices", "Scales poorly — 500 devices = 500 SSH sessions for a global change"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Traditional", q: "In traditional networking, where does the control plane reside?", options: ["In a centralized controller", "Distributed — on each individual network device", "In the cloud", "On the management workstation"], answer: 1, explain: "Traditional = distributed control plane. Each device runs its own routing protocols and makes independent forwarding decisions." }] },

  "6.2.b": { difficulty: 30, studyTime: 15, examFreq: 35, why: "Controller-based (SDN) centralizes the control plane. Devices just forward. APIs enable programmability.", ciscoIntent: "Describe controller-based (SDN) networking", cheatSheet: [{ heading: "Controller-Based / SDN", items: ["Control plane centralized in an SDN controller", "Network devices become 'dumb' forwarders — data plane only", "Controller communicates via southbound APIs (OpenFlow, NETCONF, RESTCONF)", "Applications interact via northbound APIs (REST)", "Single pane of glass — entire network visible from one dashboard", "API-driven: changes via scripts, not manual CLI", "Intent-based: define WHAT you want, controller figures out HOW"] }], prereqs: [{ name: "Traditional networking", obj: "6.2.a" }], resources: [], labs: [], vocab: [{ term: "SDN", q: "What is the key architectural change in SDN vs traditional networking?", options: ["All devices use wireless", "The control plane is separated from devices and centralized in a controller", "Switches are replaced by routers", "IPv6 is mandatory"], answer: 1, explain: "SDN centralizes the control plane. Devices retain only the data plane (forwarding). The controller programs them via APIs." }] },

  "6.2.c": { difficulty: 20, studyTime: 10, examFreq: 25, why: "Know the specific benefits of SDN: single pane of glass, API-driven changes, intent-based, faster changes.", ciscoIntent: "List benefits of SDN / controller-based networking", cheatSheet: [{ heading: "SDN Benefits", items: ["Single pane of glass — centralized visibility of entire network", "Faster changes — program once in controller, push to all devices", "API-driven — enables integration with external tools, orchestration, CI/CD", "Policy-based — define policies centrally, controller enforces everywhere", "Intent-based networking — declare desired outcome (intent), controller implements", "Simplified operations — less CLI expertise needed for day-to-day changes", "Better analytics — controller has global view for trend analysis and optimization"] }], prereqs: [{ name: "SDN architecture", obj: "6.2.b" }], resources: [], labs: [], vocab: [{ term: "Intent-based", q: "What does 'intent-based networking' mean?", options: ["The network predicts user intent", "You declare the desired outcome, and the controller determines how to implement it", "Devices configure themselves based on traffic patterns", "All config is automatic with no human input ever"], answer: 1, explain: "Intent-based = you state WHAT you want (e.g., 'isolate IoT devices'). The controller translates that into the specific device configs." }] },

  "6.2.d": { difficulty: 25, studyTime: 10, examFreq: 30, why: "Cisco DNA Center is the specific SDN controller for enterprise campus. Intent-based networking platform.", ciscoIntent: "Identify Cisco DNA Center as an SDN controller", cheatSheet: [{ heading: "Cisco DNA Center", items: ["Cisco's SDN controller for enterprise campus networks", "Intent-based networking platform — define business intent, DNA Center implements", "Assurance: AI/ML-driven analytics, proactive issue detection", "Automation: template-based provisioning, plug-and-play onboarding", "Policy: group-based access control (SGT/TrustSec), microsegmentation", "Uses NETCONF/YANG southbound to Cisco devices", "REST API northbound for integration with ITSM, scripts, etc.", "Rebranded as 'Cisco Catalyst Center' in 2023 — exam may use either name"] }], prereqs: [{ name: "SDN architecture", obj: "6.2.b" }], resources: [], labs: [], vocab: [{ term: "DNA Center", q: "Cisco DNA Center is an example of:", options: ["A network switch", "An SDN controller for enterprise campus intent-based networking", "A wireless access point", "A firewall"], answer: 1, explain: "DNA Center (now Catalyst Center) is Cisco's enterprise SDN controller — centralized management, automation, assurance, and policy." }] },

  // 6.3 — SDN architecture (6.3.a and 6.3.b already exist)
  "6.3.c": { difficulty: 25, studyTime: 10, examFreq: 30, why: "Underlay is the physical network that carries everything. Without a working underlay, nothing else works.", ciscoIntent: "Describe the underlay network in SDN", cheatSheet: [{ heading: "Underlay Network", items: ["The physical network infrastructure — routers, switches, cables, fibers", "Provides IP connectivity (transport) for the overlay to ride on top of", "Runs standard routing protocols (OSPF, IS-IS, BGP) for reachability", "Must be stable, high-performance, and fully routed", "Underlay doesn't know about tenants, applications, or overlay traffic", "Think of it as the highway system — overlay traffic is the cars", "In Cisco SD-Access: underlay uses IS-IS for routing"] }], prereqs: [{ name: "Plane separation", obj: "6.3.a" }], resources: [], labs: [], vocab: [{ term: "Underlay", q: "What is the underlay network?", options: ["Virtual tunnels between devices", "The physical network providing IP transport for the overlay", "The SDN controller software", "The management plane"], answer: 1, explain: "Underlay = physical infrastructure (routers, switches, links) that provides the transport for overlay virtual networks." }] },

  "6.3.d": { difficulty: 30, studyTime: 12, examFreq: 30, why: "Overlay is the virtual network built on top of the underlay. VXLAN is the key encapsulation technology.", ciscoIntent: "Describe the overlay network in SDN", cheatSheet: [{ heading: "Overlay Network", items: ["Virtual network built on top of the physical underlay", "Uses encapsulation (tunneling) to create logical topologies", "VXLAN (Virtual Extensible LAN) — most common overlay encapsulation", "VXLAN encapsulates L2 frames in UDP/IP — extends L2 across L3 boundaries", "VNI (VXLAN Network Identifier) — 24-bit ID, supports ~16 million segments (vs VLAN's 4096)", "Overlay enables: multi-tenancy, microsegmentation, workload mobility", "Traffic flow: original frame → VXLAN encap → underlay routing → VXLAN decap → delivery"] }], prereqs: [{ name: "Underlay", obj: "6.3.c" }], resources: [], labs: [], vocab: [{ term: "VXLAN", q: "VXLAN improves over VLANs by:", options: ["Faster encryption", "Supporting ~16 million segments vs VLAN's 4096 limit", "Eliminating the need for switches", "Replacing IP routing"], answer: 1, explain: "VXLAN's 24-bit VNI supports ~16.7 million segments. VLANs use 12-bit IDs, limited to 4094. VXLAN also extends L2 over L3." }] },

  "6.3.e": { difficulty: 30, studyTime: 12, examFreq: 30, why: "Fabric = underlay + overlay + automation. Cisco SD-Access is the exam-relevant example.", ciscoIntent: "Describe network fabric architecture", cheatSheet: [{ heading: "Network Fabric", items: ["Fabric = underlay + overlay + automated provisioning + policy", "Everything managed as a single, programmable entity", "Cisco SD-Access — Cisco's fabric solution for campus networks", "SD-Access components: underlay (IS-IS), overlay (VXLAN), control plane (LISP), policy (TrustSec/SGT)", "Fabric roles: Control Plane Node, Border Node, Edge Node", "Edge Node: connects endpoints (wired/wireless clients)", "Border Node: connects fabric to external networks (WAN, DC, internet)", "Automated provisioning: DNA Center handles fabric setup, no manual per-device config"] }], prereqs: [{ name: "Underlay", obj: "6.3.c" }, { name: "Overlay", obj: "6.3.d" }], resources: [], labs: [], vocab: [{ term: "SD-Access fabric", q: "In Cisco SD-Access, what role does the Edge Node serve?", options: ["Connects the fabric to external networks", "Acts as the SDN controller", "Connects endpoints (users, devices) to the fabric", "Manages DHCP and DNS"], answer: 2, explain: "Edge Node = where endpoints connect to the fabric. Border Node = connects fabric to outside world. Control Plane Node = maps endpoints." }] },

  // 6.4 — AI/ML in networking
  "6.4.a": { difficulty: 20, studyTime: 10, examFreq: 25, why: "New in CCNA v1.1. Generative AI creates configs and troubleshooting suggestions from natural language.", ciscoIntent: "Describe generative AI in networking", cheatSheet: [{ heading: "Generative AI in Networking", items: ["Creates new content: configurations, troubleshooting steps, documentation", "Natural language → network config: 'Block SSH from guest VLAN' → generates ACL", "Automated documentation: generates network diagrams, config summaries", "Chatbot-style troubleshooting: describe the problem, AI suggests solutions", "Cisco AI Assistant (in DNA Center/Catalyst Center) — NL interface for network queries", "Risk: hallucination — AI may generate plausible but incorrect configs. Always verify.", "Example: 'Show me devices with high CPU' → AI queries telemetry and summarizes"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Generative AI", q: "How does generative AI help network engineers?", options: ["It physically repairs cables", "It creates configurations and troubleshooting suggestions from natural language", "It replaces all network devices", "It provides faster internet speeds"], answer: 1, explain: "Generative AI translates natural language requests into actionable configs, troubleshooting steps, and documentation." }] },

  "6.4.b": { difficulty: 25, studyTime: 10, examFreq: 25, why: "Predictive AI analyzes trends to forecast problems BEFORE they impact users. Different from generative.", ciscoIntent: "Describe predictive AI in networking", cheatSheet: [{ heading: "Predictive AI", items: ["Analyzes historical data and trends to forecast future issues", "Anomaly detection: identifies unusual patterns (traffic spikes, auth failures)", "Capacity forecasting: predicts when links, CPU, or memory will reach limits", "Failure prediction: identifies devices likely to fail based on telemetry trends", "Proactive, not reactive — catches problems BEFORE outages", "Example: 'Switch X CPU trending up 5% weekly — will exceed threshold in 3 weeks'", "Cisco AI Network Analytics (in DNA Center) provides predictive insights"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Predictive AI", q: "How does predictive AI differ from generative AI?", options: ["Predictive creates configs; generative forecasts issues", "Predictive forecasts issues from trends; generative creates new content from prompts", "They are the same thing", "Predictive works offline; generative requires internet"], answer: 1, explain: "Predictive AI = analyzes data to forecast problems. Generative AI = creates new content (configs, docs, suggestions)." }] },

  "6.4.c": { difficulty: 20, studyTime: 10, examFreq: 20, why: "ML-driven monitoring learns what 'normal' looks like and alerts on deviations — baseline behavior detection.", ciscoIntent: "Describe ML-driven network monitoring", cheatSheet: [{ heading: "ML-Driven Monitoring", items: ["ML learns baseline behavior patterns for the network (traffic, auth, DNS, etc.)", "Automatically detects deviations from baseline — no manual threshold setting", "Traditional: alert if CPU > 80%. ML: alert if CPU pattern is abnormal for this time of day", "Adapts over time — baselines evolve as network changes", "Reduces false positives compared to static thresholds", "Cisco AI Endpoint Analytics — uses ML to profile and classify endpoints", "Example: ML detects unusual DNS query volume from a host → possible malware C2 communication"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "ML monitoring", q: "What advantage does ML-based monitoring have over static threshold alerts?", options: ["It's cheaper", "It learns normal baselines and adapts, reducing false positives", "It works without network connectivity", "It replaces the need for syslog"], answer: 1, explain: "ML learns what's normal and alerts on deviations. Static thresholds don't account for time-of-day patterns or gradual changes." }] },

  "6.4.d": { difficulty: 25, studyTime: 10, examFreq: 20, why: "AIOps combines monitoring, correlation, and automated response. Root cause analysis across multiple data sources.", ciscoIntent: "Describe AIOps in network operations", cheatSheet: [{ heading: "AIOps", items: ["AIOps = AI for IT Operations — automated root cause analysis + event correlation", "Correlates events across multiple sources (syslog, SNMP, flows, tickets)", "Reduces alert fatigue — groups related alerts into single incidents", "Automated root cause analysis: 'Interface down on SW1 caused these 5 alerts'", "Intelligent alerting: suppresses noise, escalates real issues", "Can trigger automated remediation workflows", "Cisco: DNA Center Assurance + ThousandEyes integration for cross-domain visibility"] }], prereqs: [{ name: "Automation benefits", obj: "6.1.a" }], resources: [], labs: [], vocab: [{ term: "AIOps", q: "What is the primary purpose of AIOps?", options: ["Replace network engineers entirely", "Correlate events and automate root cause analysis across data sources", "Increase network bandwidth", "Generate network configurations"], answer: 1, explain: "AIOps correlates data from multiple sources (logs, alerts, metrics) to identify root causes and reduce alert fatigue." }] },

  // 6.5 — REST APIs
  "6.5.a": { difficulty: 20, studyTime: 12, examFreq: 35, why: "REST principles are conceptual but testable. Know the 5 constraints: stateless, client-server, uniform interface, cacheable, layered.", ciscoIntent: "Describe REST API principles", cheatSheet: [{ heading: "REST Principles", items: ["Stateless — server does not store client session state between requests", "Client-server — clear separation of concerns (client = requester, server = provider)", "Uniform interface — consistent URI structure identifies resources (e.g., /api/v1/devices/123)", "Cacheable — responses can be cached for performance", "Layered system — client doesn't know if it's talking to the actual server or a proxy/load balancer", "Resource-based: everything is a resource identified by a URI", "Data format: typically JSON (sometimes XML)"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Stateless", q: "What does 'stateless' mean in REST?", options: ["The server has no storage", "Each request contains all information needed; server doesn't store session state", "The client doesn't need authentication", "Responses are never cached"], answer: 1, explain: "Stateless = server doesn't remember previous requests. Each request must include all necessary info (auth token, parameters, etc.)." }] },

  "6.5.b": { difficulty: 25, studyTime: 12, examFreq: 45, why: "HTTP verbs → CRUD is one of the most testable facts in Domain 6. GET/POST/PUT/PATCH/DELETE.", ciscoIntent: "Map HTTP verbs to CRUD operations", cheatSheet: [{ heading: "HTTP Verbs & CRUD", items: ["GET → Read — retrieve resource data (safe, idempotent)", "POST → Create — create a new resource (not idempotent)", "PUT → Replace — replace entire resource with new data (idempotent)", "PATCH → Update — modify part of an existing resource (partial update)", "DELETE → Delete — remove a resource (idempotent)", "Idempotent = same request repeated gives same result (GET, PUT, DELETE)", "POST is NOT idempotent — each POST creates a new resource"] }], prereqs: [], resources: [], labs: [{ name: "REST API exercise", desc: "Use Postman to perform GET, POST, PUT, DELETE against a demo API" }], vocab: [{ term: "HTTP verbs", q: "Which HTTP verb is used to create a new resource?", options: ["GET", "PUT", "POST", "PATCH"], answer: 2, explain: "POST = Create. GET = Read. PUT = Replace (full update). PATCH = Partial update. DELETE = Remove." }] },

  "6.5.c": { difficulty: 25, studyTime: 12, examFreq: 40, why: "Memorize the key status codes. 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Server Error.", ciscoIntent: "Interpret HTTP status codes", cheatSheet: [{ heading: "HTTP Status Codes", items: ["2xx = Success: 200 OK, 201 Created, 204 No Content", "3xx = Redirection: 301 Moved Permanently, 302 Found (temporary redirect)", "4xx = Client Error: 400 Bad Request, 401 Unauthorized (bad/missing auth), 403 Forbidden (auth OK but not allowed), 404 Not Found", "5xx = Server Error: 500 Internal Server Error, 503 Service Unavailable", "401 vs 403: 401 = 'who are you?' (authentication). 403 = 'I know who you are, but no' (authorization)", "Exam favorite: distinguish 401 (auth failed) from 403 (auth OK, permission denied)"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Status codes", q: "An API returns 401. What does this mean?", options: ["Resource not found", "Authentication failed — invalid or missing credentials", "Server error", "Request was successful"], answer: 1, explain: "401 Unauthorized = authentication problem (bad credentials, expired token). 403 = authorized but not permitted. 404 = not found." }] },

  "6.5.d": { difficulty: 25, studyTime: 10, examFreq: 30, why: "API authentication methods show up in conceptual questions. Know API key, Bearer token, OAuth 2.0, and Basic auth.", ciscoIntent: "Describe API authentication methods", cheatSheet: [{ heading: "API Authentication", items: ["API Key — unique string passed in header or URL parameter. Simple but less secure.", "Bearer Token — token in Authorization header: <code>Authorization: Bearer [token]</code>", "OAuth 2.0 — delegated authorization framework; client gets token from auth server", "HTTP Basic — Base64-encoded username:password in Authorization header. NOT encrypted — use only with HTTPS.", "Token-based auth (API key, Bearer) is most common for REST APIs", "OAuth 2.0 is most secure — supports token refresh, scopes, and delegation"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "API auth", q: "What is the format of HTTP Basic authentication?", options: ["API key in the URL", "Base64-encoded username:password in the Authorization header", "Certificate exchange", "OAuth token refresh"], answer: 1, explain: "HTTP Basic = Base64(username:password) in the Authorization header. Not encrypted, so always use with HTTPS." }] },

  "6.5.e": { difficulty: 20, studyTime: 10, examFreq: 30, why: "JSON is primary for REST APIs. Know JSON vs XML vs YAML — when each is used.", ciscoIntent: "Compare API data encoding formats", cheatSheet: [{ heading: "Data Encoding Formats", items: ["JSON (JavaScript Object Notation) — lightweight, human-readable, primary for REST APIs", "XML (eXtensible Markup Language) — verbose, tag-based, legacy SOAP APIs and NETCONF", "YAML (YAML Ain't Markup Language) — human-friendly, used for config files (Ansible playbooks)", "JSON: <code>{\"name\": \"Router1\", \"ip\": \"10.1.1.1\"}</code>", "XML: <code>&lt;device&gt;&lt;name&gt;Router1&lt;/name&gt;&lt;/device&gt;</code>", "YAML: <code>name: Router1</code> (indentation-based, no brackets)", "Content-Type header specifies format: <code>application/json</code> or <code>application/xml</code>"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "JSON vs XML", q: "Which data format is most commonly used with REST APIs?", options: ["XML", "JSON", "YAML", "CSV"], answer: 1, explain: "JSON is the default for modern REST APIs — lightweight, easy to parse, widely supported. XML is legacy. YAML is for config files." }] },

  "6.5.f": { difficulty: 20, studyTime: 8, examFreq: 35, why: "CRUD mapping reinforcement. This is the most likely exam question from this section.", ciscoIntent: "Map CRUD operations to HTTP verbs", cheatSheet: [{ heading: "CRUD Mapping", items: ["Create → POST (creates a new resource; returns 201 Created)", "Read → GET (retrieves resource; returns 200 OK)", "Update → PUT (full replace) or PATCH (partial update; returns 200 OK)", "Delete → DELETE (removes resource; returns 200 OK or 204 No Content)", "URI convention: <code>GET /api/devices</code> = list all, <code>GET /api/devices/5</code> = get one", "<code>POST /api/devices</code> = create new, <code>DELETE /api/devices/5</code> = delete one", "Mnemonic: CRUD = Create-Read-Update-Delete = POST-GET-PUT/PATCH-DELETE"] }], prereqs: [{ name: "HTTP verbs", obj: "6.5.b" }], resources: [], labs: [], vocab: [{ term: "CRUD to HTTP", q: "Which HTTP verb maps to the 'Update' operation in CRUD?", options: ["GET", "POST", "PUT or PATCH", "DELETE"], answer: 2, explain: "Update = PUT (full replace) or PATCH (partial update). PUT sends the entire resource; PATCH sends only changed fields." }] },

  // 6.6 — Configuration management tools
  "6.6.a": { difficulty: 25, studyTime: 12, examFreq: 30, why: "Ansible is the most testable tool. Agentless (SSH), YAML playbooks, push model. Know all four keywords.", ciscoIntent: "Describe Ansible and its architecture", cheatSheet: [{ heading: "Ansible", items: ["Agentless — no software installed on managed devices; uses SSH or NETCONF", "Push model — control node pushes configs to devices (not devices pulling)", "Language: YAML playbooks define tasks declaratively", "Idempotent — running the same playbook twice produces the same result (no duplicate changes)", "Written in Python, runs on Linux/macOS control node", "Communication: SSH for Linux/network devices, WinRM for Windows", "Key fact combo: agentless + SSH + YAML + push + idempotent"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Ansible", q: "Why is Ansible called 'agentless'?", options: ["It has no GUI", "No agent software needs to be installed on managed devices — connects via SSH", "It runs without a server", "It doesn't use authentication"], answer: 1, explain: "Agentless = no agent installed on target devices. Ansible connects via SSH (or NETCONF for network devices) from the control node." }] },

  "6.6.b": { difficulty: 25, studyTime: 12, examFreq: 25, why: "Know Ansible components: inventory (device list), playbooks (YAML tasks), modules (action units), roles (reusable packages).", ciscoIntent: "Identify Ansible components", cheatSheet: [{ heading: "Ansible Components", items: ["Inventory — list of managed devices (INI or YAML format), can be grouped", "Playbooks — YAML files defining ordered list of tasks to execute", "Modules — units of work (e.g., ios_config, ios_command, copy, template)", "Tasks — individual actions calling a module with parameters", "Roles — reusable collections of tasks, vars, templates, handlers", "Handlers — triggered tasks (e.g., restart service only if config changed)", "Variables — customize behavior per device/group without changing the playbook"] }], prereqs: [{ name: "Ansible basics", obj: "6.6.a" }], resources: [], labs: [], vocab: [{ term: "Playbook", q: "What format are Ansible playbooks written in?", options: ["JSON", "HCL", "YAML", "Python"], answer: 2, explain: "Ansible playbooks are YAML (Yet Another Markup Language). Human-readable, indentation-based. Not JSON, not HCL (that's Terraform)." }] },

  "6.6.c": { difficulty: 25, studyTime: 12, examFreq: 30, why: "Terraform is Infrastructure as Code (IaC). Uses HCL language and a state file. Provisions infrastructure, not device config.", ciscoIntent: "Describe Terraform and its purpose", cheatSheet: [{ heading: "Terraform", items: ["Infrastructure as Code (IaC) — define infrastructure in code, version control it", "Language: HCL (HashiCorp Configuration Language) — declarative", "State file — tracks the real-world state of provisioned resources", "Declarative: you define desired state, Terraform figures out changes needed", "Provider-based: plugins for AWS, Azure, GCP, Cisco, VMware, etc.", "Focuses on infrastructure provisioning (day 0/1), not ongoing device config (day 2)", "Created by HashiCorp — open-source core + enterprise offerings"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "Terraform state", q: "What is the purpose of Terraform's state file?", options: ["Stores user passwords", "Tracks the current real-world state of managed infrastructure", "Contains the Terraform source code", "Logs all API calls"], answer: 1, explain: "The state file maps Terraform config to real resources. It knows what exists so it can calculate what needs to change." }] },

  "6.6.d": { difficulty: 25, studyTime: 10, examFreq: 25, why: "Know the Terraform workflow: init → plan → apply → destroy. Plan is the 'dry run' that shows what will change.", ciscoIntent: "Describe the Terraform workflow", cheatSheet: [{ heading: "Terraform Workflow", items: ["<code>terraform init</code> — initialize working directory, download provider plugins", "<code>terraform plan</code> — preview changes (dry run, no changes applied)", "<code>terraform apply</code> — execute the plan, create/modify/destroy resources", "<code>terraform destroy</code> — tear down all managed resources", "Plan shows: + (create), ~ (modify), - (destroy)", "Apply prompts for confirmation (unless <code>-auto-approve</code> flag used)", "Always run plan before apply to review changes"] }], prereqs: [{ name: "Terraform basics", obj: "6.6.c" }], resources: [], labs: [], vocab: [{ term: "terraform plan", q: "What does <code>terraform plan</code> do?", options: ["Creates infrastructure immediately", "Shows a preview of changes without making them", "Destroys all resources", "Downloads provider plugins"], answer: 1, explain: "terraform plan = dry run. Shows what would be created, modified, or destroyed. No actual changes are made." }] },

  "6.6.e": { difficulty: 20, studyTime: 10, examFreq: 25, why: "Key distinction: Ansible = day 2 device config. Terraform = day 0/1 infrastructure provisioning. Both are declarative.", ciscoIntent: "Compare Ansible and Terraform use cases", cheatSheet: [{ heading: "Ansible vs Terraform", items: ["Ansible: configures existing devices (day 2 operations)", "  - Push interface configs, ACLs, SNMP settings to routers/switches", "  - Agentless, YAML, push, SSH/NETCONF", "Terraform: provisions new infrastructure (day 0/1)", "  - Create VMs, networks, load balancers, cloud resources", "  - Declarative, HCL, state file, provider-based", "Overlap: both are declarative, both can be version-controlled", "Complementary: Terraform creates the infrastructure, Ansible configures it", "Think: Terraform builds the house, Ansible arranges the furniture"] }], prereqs: [{ name: "Ansible", obj: "6.6.a" }, { name: "Terraform", obj: "6.6.c" }], resources: [], labs: [], vocab: [{ term: "Day 0/1 vs Day 2", q: "Which tool is best for day 2 device configuration changes?", options: ["Terraform", "Ansible", "Both are equal", "Neither — use manual CLI"], answer: 1, explain: "Ansible excels at day 2 (ongoing config management). Terraform excels at day 0/1 (infrastructure provisioning)." }] },

  "6.6.f": { difficulty: 20, studyTime: 8, examFreq: 15, why: "Puppet and Chef may appear as distractors. Know: agent-based, pull model, Ruby-based. Contrast with Ansible's agentless push.", ciscoIntent: "Compare Puppet/Chef to Ansible", cheatSheet: [{ heading: "Puppet / Chef", items: ["Both are agent-based — require agent software installed on managed devices", "Pull model — agents periodically check in with server and pull their config", "Ruby-based — Puppet uses its own DSL, Chef uses Ruby 'recipes'", "More complex setup than Ansible (server + agents + certificates)", "Puppet: manifest files (.pp), declarative, strong in enforcing desired state continuously", "Chef: cookbooks/recipes, procedural (step-by-step)", "Less common on CCNA exam — know them for comparison to Ansible, not deep detail", "Key contrast: Ansible = agentless/push/YAML. Puppet/Chef = agent-based/pull/Ruby."] }], prereqs: [{ name: "Ansible", obj: "6.6.a" }], resources: [], labs: [], vocab: [{ term: "Agent-based", q: "How do Puppet and Chef differ from Ansible?", options: ["They use JSON instead of YAML", "They require agent software on managed devices and use a pull model", "They only work with cloud infrastructure", "They don't support network devices"], answer: 1, explain: "Puppet/Chef = agent-based (software on each device) + pull model. Ansible = agentless (SSH) + push model." }] },

  // 6.7 — JSON (6.7.a and 6.7.b may need new sub-entries since only parent "6.7" existed)
  "6.7.a": { difficulty: 10, studyTime: 8, examFreq: 30, why: "JSON objects use curly braces with key-value pairs. Keys MUST be double-quoted strings.", ciscoIntent: "Identify JSON object syntax", cheatSheet: [{ heading: "JSON Object", items: ["Enclosed in curly braces: <code>{ }</code>", "Contains key-value pairs separated by commas", "Keys MUST be double-quoted strings: <code>\"name\": \"Router1\"</code>", "Values can be: string, number, boolean, null, object, or array", "Example: <code>{\"hostname\": \"SW1\", \"vlans\": 24, \"managed\": true}</code>", "Order of keys does not matter in JSON objects", "Empty object: <code>{}</code>"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "JSON object", q: "Which is a valid JSON object?", options: ["<code>{'name': 'Router1'}</code>", "<code>{\"name\": \"Router1\"}</code>", "<code>[\"name\": \"Router1\"]</code>", "<code>(name: Router1)</code>"], answer: 1, explain: "JSON requires double quotes for keys and string values. Single quotes are invalid. Square brackets are for arrays, not objects." }] },

  "6.7.b": { difficulty: 10, studyTime: 8, examFreq: 25, why: "JSON arrays use square brackets for ordered lists. Know the visual difference from objects (curly braces).", ciscoIntent: "Identify JSON array syntax", cheatSheet: [{ heading: "JSON Array", items: ["Enclosed in square brackets: <code>[ ]</code>", "Ordered list of values separated by commas", "Values can be any JSON type: strings, numbers, objects, other arrays", "Example: <code>[\"VLAN10\", \"VLAN20\", \"VLAN30\"]</code>", "Array of objects: <code>[{\"id\": 10}, {\"id\": 20}]</code>", "Accessed by index (zero-based): array[0] = first element", "Empty array: <code>[]</code>"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "JSON array", q: "Which represents a valid JSON array?", options: ["<code>{\"items\": \"a\", \"b\"}</code>", "<code>[\"a\", \"b\", \"c\"]</code>", "<code>(a, b, c)</code>", "<code>&lt;items&gt;a,b,c&lt;/items&gt;</code>"], answer: 1, explain: "JSON arrays use square brackets with comma-separated values. Curly braces = objects. Angle brackets = XML." }] },

  "6.7.c": { difficulty: 10, studyTime: 8, examFreq: 25, why: "Know the 6 JSON data types. String, number, boolean, null, object, array. Numbers have no quotes.", ciscoIntent: "Identify JSON data types", cheatSheet: [{ heading: "JSON Data Types", items: ["String: <code>\"hello\"</code> — always in double quotes", "Number: <code>42</code>, <code>3.14</code>, <code>-7</code> — no quotes, can be integer or float", "Boolean: <code>true</code> or <code>false</code> — lowercase, no quotes", "Null: <code>null</code> — represents empty/no value, lowercase, no quotes", "Object: <code>{\"key\": \"value\"}</code> — nested key-value pair", "Array: <code>[1, 2, 3]</code> — ordered list", "No date type — dates are stored as strings: <code>\"2026-04-14\"</code>"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "JSON types", q: "In JSON, how is a boolean value represented?", options: ["<code>\"true\"</code> (string with quotes)", "<code>True</code> (capitalized)", "<code>true</code> (lowercase, no quotes)", "<code>1</code> (number)"], answer: 2, explain: "JSON booleans are lowercase with no quotes: true or false. \"true\" with quotes would be a string, not a boolean." }] },

  "6.7.d": { difficulty: 15, studyTime: 10, examFreq: 25, why: "Nesting is how real API responses look. Objects inside objects, arrays inside objects, etc.", ciscoIntent: "Read and interpret nested JSON structures", cheatSheet: [{ heading: "JSON Nesting", items: ["Objects can contain other objects: <code>{\"device\": {\"name\": \"R1\", \"ip\": \"10.1.1.1\"}}</code>", "Objects can contain arrays: <code>{\"vlans\": [10, 20, 30]}</code>", "Arrays can contain objects: <code>[{\"id\": 1}, {\"id\": 2}]</code>", "Deeply nested: <code>{\"site\": {\"devices\": [{\"name\": \"SW1\", \"ports\": [1, 2, 3]}]}}</code>", "Access nested values with dot/bracket notation: <code>data.site.devices[0].name</code> → \"SW1\"", "API responses are typically nested JSON — devices containing interfaces containing IPs", "Exam may show nested JSON and ask 'what is the value of X?'"] }], prereqs: [{ name: "JSON objects", obj: "6.7.a" }, { name: "JSON arrays", obj: "6.7.b" }], resources: [], labs: [{ name: "Parse nested JSON", desc: "Given API response, extract hostname, IP, VLAN list" }], vocab: [{ term: "Nesting", q: "Given: <code>{\"router\": {\"interfaces\": [\"Gi0/0\", \"Gi0/1\"]}}</code> — what is router.interfaces[1]?", options: ["Gi0/0", "Gi0/1", "router", "interfaces"], answer: 1, explain: "router.interfaces is the array [\"Gi0/0\", \"Gi0/1\"]. Index [1] = second element = \"Gi0/1\". Arrays are zero-indexed." }] },

  "6.7.e": { difficulty: 10, studyTime: 8, examFreq: 30, why: "Common JSON syntax traps on the exam: single quotes invalid, trailing commas invalid, no comments allowed.", ciscoIntent: "Identify valid vs invalid JSON syntax", cheatSheet: [{ heading: "Valid vs Invalid JSON", items: ["MUST use double quotes for keys and strings — single quotes are INVALID", "No trailing commas: <code>{\"a\": 1, \"b\": 2,}</code> ← INVALID (trailing comma after 2)", "No comments allowed — JSON has no comment syntax (// and /* */ are invalid)", "Keys must be strings: <code>{name: \"R1\"}</code> ← INVALID (unquoted key)", "Values must be valid types — no undefined, no functions", "Valid: <code>{\"name\": \"R1\", \"active\": true, \"ports\": null}</code>", "Invalid: <code>{'name': 'R1'}</code> — single quotes not allowed in JSON"] }], prereqs: [], resources: [], labs: [], vocab: [{ term: "JSON validity", q: "Which JSON is INVALID?", options: ["<code>{\"name\": \"R1\"}</code>", "<code>{\"count\": 5}</code>", "<code>{\"name\": \"R1\",}</code>", "<code>{\"active\": true}</code>"], answer: 2, explain: "Trailing comma after the last key-value pair is invalid JSON. The comma after \"R1\" has no next element." }] },

};


/* ═══════════════════════════════════════════════════════════════════
   State management
   ═══════════════════════════════════════════════════════════════════ */

function loadState() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; } }
function saveState(s) { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }
function getObjState(id) { const s = loadState(); return s[id] || { proficiency: null, quizScores: {} }; }
function setObjState(id, data) { const s = loadState(); s[id] = { ...(s[id] || {}), ...data }; saveState(s); }

window.resetAllStats = function() {
  if (!confirm('Reset ALL progress? Everything to zero. Cannot be undone.')) return;
  sessionStorage.setItem('ccna_was_reset', '1');
  localStorage.clear();
  location.reload();
};

/* ═══════════════════════════════════════════════════════════════════
   Flatten topics into renderable rows
   - Parent with subs → parent header + each sub as expandable row
   - Parent without subs → expandable row itself
   ═══════════════════════════════════════════════════════════════════ */

function flattenTopics(domain) {
  const rows = [];
  domain.topics.forEach(topic => {
    const subs = (topic.subtopics || []).filter(s => typeof s === 'object' && s.id);
    if (subs.length > 0) {
      rows.push({ type: 'header', id: topic.id, name: topic.name });
      subs.forEach(sub => {
        rows.push({ type: 'row', id: sub.id, name: sub.name, parentId: topic.id, parentName: topic.name });
      });
    } else {
      rows.push({ type: 'row', id: topic.id, name: topic.name, parentId: null });
    }
  });
  return rows;
}

/* ═══════════════════════════════════════════════════════════════════
   Rendering helpers
   ═══════════════════════════════════════════════════════════════════ */

const container = document.getElementById('domainsContainer');
const domains = window.topicsData.domains;

function getProf(id) {
  const s = getObjState(id);
  if (s.proficiency) return s.proficiency;
  // Fallback to topics-data resumeRating for parent objectives
  for (const d of domains) {
    for (const t of d.topics) {
      if (t.id === id) return t.resumeRating || 'red';
      for (const sub of (t.subtopics || [])) {
        if (typeof sub === 'object' && sub.id === id) return t.resumeRating || 'red';
      }
    }
  }
  return 'red';
}

function getQuizScore(id) {
  const s = getObjState(id);
  const scores = s.quizScores || {};
  const vals = Object.values(scores);
  if (vals.length === 0) return null;
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length * 100);
}

function getAllRowIds() {
  const ids = [];
  domains.forEach(d => flattenTopics(d).forEach(r => { if (r.type === 'row') ids.push(r.id); }));
  return ids;
}

function updateStats() {
  const ids = getAllRowIds();
  let g = 0, y = 0, r = 0, terms = 0, quizTotal = 0, quizCount = 0;
  ids.forEach(id => {
    const p = getProf(id);
    if (p === 'green') g++; else if (p === 'yellow') y++; else r++;
    const e = E[id];
    if (e) terms += (e.vocab || []).length;
    const qs = getQuizScore(id);
    if (qs !== null) { quizTotal += qs; quizCount++; }
  });
  document.getElementById('totalObjectives').textContent = ids.length;
  document.getElementById('totalTerms').textContent = terms;
  document.getElementById('greenCount').textContent = g;
  document.getElementById('yellowCount').textContent = y;
  document.getElementById('redCount').textContent = r;
  document.getElementById('quizAvg').textContent = quizCount ? Math.round(quizTotal / quizCount) + '%' : '—';
}

function getDomainProgress(domain) {
  const rows = flattenTopics(domain).filter(r => r.type === 'row');
  const g = rows.filter(r => getProf(r.id) === 'green').length;
  return Math.round(g / rows.length * 100);
}

function gaugeClass(v) { return v <= 33 ? 'low' : v <= 66 ? 'mid' : 'high'; }
function renderGauges(d) { return `<div class="gauge-row"><span class="gauge-label">Difficulty</span><div class="gauge-track"><div class="gauge-fill ${gaugeClass(d.difficulty)}" style="width:${d.difficulty}%"></div></div><span class="gauge-value">${d.difficulty}/100</span></div><div class="gauge-row"><span class="gauge-label">Study Time</span><div class="gauge-track"><div class="gauge-fill ${gaugeClass(d.studyTime)}" style="width:${d.studyTime}%"></div></div><span class="gauge-value">${d.studyTime}/100</span></div><div class="gauge-row"><span class="gauge-label">Exam Frequency</span><div class="gauge-track"><div class="gauge-fill ${gaugeClass(d.examFreq)}" style="width:${d.examFreq}%"></div></div><span class="gauge-value">${d.examFreq}/100</span></div>`; }
function renderCheatSheet(sheets) { return '<div class="cheat-sheet">' + sheets.map(s => `<h4>${s.heading}</h4><ul>${s.items.map(i => `<li>${i}</li>`).join('')}</ul>`).join('') + '</div>'; }
function renderResources(res) { if (!res || !res.length) return '<p class="text-muted">No resources yet.</p>'; return res.map(r => `<div class="resource-item"><span class="resource-type ${r.type}">${r.type}</span><div class="resource-info"><div class="resource-title"><a href="${r.url}" target="_blank" rel="noopener">${r.title}</a></div><div class="resource-desc">${r.desc}</div></div></div>`).join(''); }
function renderPrereqs(prs) { if (!prs || !prs.length) return '<p class="text-muted">No prerequisites.</p>'; return '<ul class="prereq-list">' + prs.map(p => `<li class="prereq-item"><span class="prereq-arrow">&#9654;</span><span class="prereq-name">${p.name}</span><span class="prereq-obj">${p.obj}</span></li>`).join('') + '</ul>'; }
function renderLabs(labs) { if (!labs || !labs.length) return '<p class="text-muted">No labs yet.</p>'; return labs.map(l => `<div style="margin-bottom:var(--s-md)"><strong style="font-family:var(--font-display);font-size:0.88rem">${l.name}</strong><p style="font-size:0.82rem;color:var(--ink-secondary);margin-top:2px">${l.desc}</p></div>`).join(''); }

function renderVocabQuiz(id) {
  return `<div class="vocab-quiz" id="quiz-${id.replace(/\./g,'-')}" data-topic="${id}" data-idx="0"><div class="vocab-quiz-body"></div></div>`;
}

function initQuiz(el) {
  const id = el.dataset.topic;
  const d = E[id];
  if (!d || !d.vocab || !d.vocab.length) { el.querySelector('.vocab-quiz-body').innerHTML = '<p class="text-muted">No quiz questions yet.</p>'; return; }
  showQuestion(el, 0);
}

function showQuestion(el, idx) {
  const id = el.dataset.topic;
  const vocab = E[id].vocab;
  if (idx >= vocab.length) {
    const state = getObjState(id);
    const scores = state.quizScores || {};
    const correct = Object.values(scores).filter(v => v === 1).length;
    el.querySelector('.vocab-quiz-body').innerHTML = `<div style="text-align:center;padding:var(--s-xl) 0"><div style="font-family:var(--font-display);font-size:2rem;font-weight:700;margin-bottom:var(--s-sm)">${correct}/${vocab.length}</div><p style="color:var(--ink-secondary)">${correct === vocab.length ? 'Perfect.' : 'Review missed terms.'}</p><button class="btn btn-secondary mt-2" onclick="resetQuiz(this)">Retry</button></div>`;
    updateStats();
    const row = el.closest('.obj-row');
    if (row) { const se = row.querySelector('.obj-quiz-score'); const s = getQuizScore(id); if (se && s !== null) se.textContent = s + '%'; }
    return;
  }
  const v = vocab[idx];
  el.querySelector('.vocab-quiz-body').innerHTML = `<div class="vocab-term">${v.term}<span class="context">${v.q}</span></div><div class="vocab-options">${v.options.map((o,i) => `<button class="vocab-option" data-idx="${i}" onclick="answerQuestion(this)">${o}</button>`).join('')}</div><div class="vocab-feedback-slot"></div><div class="vocab-nav"><span class="vocab-progress">${idx+1} / ${vocab.length}</span><button class="btn btn-sm btn-ghost vocab-skip" onclick="skipQuestion(this)" style="color:var(--ink-muted)">Skip</button><button class="btn btn-sm btn-secondary vocab-next hidden" onclick="nextQuestion(this)">Next</button></div>`;
  el.dataset.idx = idx;
}

window.answerQuestion = function(btn) {
  const quiz = btn.closest('.vocab-quiz'), id = quiz.dataset.topic, idx = parseInt(quiz.dataset.idx);
  const v = E[id].vocab[idx], chosen = parseInt(btn.dataset.idx), correct = chosen === v.answer;
  const state = getObjState(id), scores = state.quizScores || {};
  scores[idx] = correct ? 1 : 0;
  setObjState(id, { quizScores: scores });
  quiz.querySelectorAll('.vocab-option').forEach((b,i) => { b.classList.add('answered'); if (i === v.answer) b.classList.add('correct'); else if (i === chosen && !correct) b.classList.add('wrong'); b.style.pointerEvents = 'none'; });
  quiz.querySelector('.vocab-feedback-slot').innerHTML = `<div class="vocab-feedback ${correct?'correct':'wrong'}">${correct?'Correct.':'Incorrect.'} ${v.explain}</div>`;
  quiz.querySelector('.vocab-next').classList.remove('hidden');
};
window.nextQuestion = function(btn) { const q = btn.closest('.vocab-quiz'); showQuestion(q, parseInt(q.dataset.idx)+1); };
window.skipQuestion = function(btn) { const q = btn.closest('.vocab-quiz'); const id = q.dataset.topic; const idx = parseInt(q.dataset.idx); const state = getObjState(id); const scores = state.quizScores || {}; scores[idx] = 0; setObjState(id, { quizScores: scores }); showQuestion(q, idx + 1); };
window.resetQuiz = function(btn) { const q = btn.closest('.vocab-quiz'); setObjState(q.dataset.topic, { quizScores: {} }); showQuestion(q, 0); };

function renderPanel(id) {
  const d = E[id];
  if (!d) return `<p class="text-muted" style="padding:var(--s-md)">Content coming soon for ${id}</p>`;
  const prof = getProf(id);
  return `<div class="obj-panel-content">
    <div class="tab-bar">
      <button class="tab-btn active" data-tab="quiz" onclick="switchTab(this)">Quiz</button>
      <button class="tab-btn" data-tab="cheat" onclick="switchTab(this)">Cheat Sheet</button>
      <button class="tab-btn" data-tab="why" onclick="switchTab(this)">Why</button>
      <button class="tab-btn" data-tab="resources" onclick="switchTab(this)">Resources</button>
      <button class="tab-btn" data-tab="labs" onclick="switchTab(this)">Labs</button>
      <button class="tab-btn" data-tab="stats" onclick="switchTab(this)">Stats</button>
      <button class="tab-btn" data-tab="prereqs" onclick="switchTab(this)">Prerequisites</button>
    </div>
    <div class="tab-content active" data-tab="quiz">${renderVocabQuiz(id)}</div>
    <div class="tab-content" data-tab="cheat">${renderCheatSheet(d.cheatSheet)}</div>
    <div class="tab-content" data-tab="why"><div class="why-section"><div class="cisco-intent">${d.ciscoIntent}</div><p style="margin-top:var(--s-sm)">${d.why}</p></div></div>
    <div class="tab-content" data-tab="resources">${renderResources(d.resources)}</div>
    <div class="tab-content" data-tab="labs">${renderLabs(d.labs)}</div>
    <div class="tab-content" data-tab="stats">${renderGauges(d)}</div>
    <div class="tab-content" data-tab="prereqs">${renderPrereqs(d.prereqs)}</div>
    <div style="margin-top:var(--s-lg)">
      <span style="font-family:var(--font-display);font-size:0.72rem;text-transform:uppercase;letter-spacing:0.04em;color:var(--ink-muted)">Self-assessment</span>
      <div class="prof-toggle">
        <button class="prof-btn r ${prof==='red'?'active':''}" data-prof="red" data-topic="${id}" onclick="setProf(this)" title="Weak"></button>
        <button class="prof-btn y ${prof==='yellow'?'active':''}" data-prof="yellow" data-topic="${id}" onclick="setProf(this)" title="Review"></button>
        <button class="prof-btn g ${prof==='green'?'active':''}" data-prof="green" data-topic="${id}" onclick="setProf(this)" title="Confident"></button>
      </div>
    </div>
  </div>`;
}

window.switchTab = function(btn) {
  const p = btn.closest('.obj-panel-content'), tab = btn.dataset.tab;
  p.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  p.querySelectorAll('.tab-content').forEach(c => c.classList.toggle('active', c.dataset.tab === tab));
  if (tab === 'quiz') { const q = p.querySelector('.vocab-quiz'); if (q && !q.dataset.inited) { q.dataset.inited='1'; initQuiz(q); } }
};

window.setProf = function(btn) {
  const id = btn.dataset.topic, prof = btn.dataset.prof;
  setObjState(id, { proficiency: prof });
  btn.closest('.prof-toggle').querySelectorAll('.prof-btn').forEach(b => b.classList.toggle('active', b.dataset.prof === prof));
  const row = btn.closest('.obj-row');
  if (row) row.querySelector('.obj-proficiency').className = 'obj-proficiency ' + prof;
  updateStats();
  const domEl = btn.closest('.domain');
  if (domEl) { const did = domEl.dataset.domain, dom = domains.find(d => d.id === did); if (dom) { const f = domEl.querySelector('.domain-progress-mini .fill'); if (f) f.style.width = getDomainProgress(dom) + '%'; } }
};

/* ═══════════════════════════════════════════════════════════════════
   Build the DOM — each sub-objective is its own expandable row
   ═══════════════════════════════════════════════════════════════════ */

domains.forEach(domain => {
  const el = document.createElement('div');
  el.className = 'domain';
  el.dataset.domain = domain.id;
  const rows = flattenTopics(domain);

  const rowsHtml = rows.map(row => {
    if (row.type === 'header') {
      return `<div class="obj-parent-header"><span class="obj-parent-id">${row.id}</span><span class="obj-parent-name">${row.name}</span></div>`;
    }
    const prof = getProf(row.id);
    const qs = getQuizScore(row.id);
    const isSub = row.id.includes('.') && row.id.split('.').length > 2;
    const namePrefix = row.name.toLowerCase();
    const dtype = namePrefix.startsWith('configure') ? 'configure' : 'describe';
    return `<div class="obj-row ${isSub?'sub':''}" data-prof="${prof}" data-type="${dtype}" data-id="${row.id}">
      <button class="obj-trigger" onclick="toggleObj(this)">
        <span class="obj-id">${row.id}</span>
        <span class="obj-name">${row.name}</span>
        <span class="obj-proficiency ${prof}"></span>
        <span class="obj-quiz-score">${qs !== null ? qs+'%' : ''}</span>
        <span class="obj-expand-icon">&#9654;</span>
      </button>
      <div class="obj-panel"><div class="obj-panel-inner">${renderPanel(row.id)}</div></div>
    </div>`;
  }).join('');

  el.innerHTML = `
    <div class="domain-header" onclick="toggleDomain(this)">
      <span class="domain-title"><span class="num">${domain.id}.0</span>${domain.name}</span>
      <div class="domain-meta">
        <span class="domain-weight">${domain.weight}%</span>
        <div class="domain-progress-mini"><div class="fill" style="width:${getDomainProgress(domain)}%"></div></div>
        <span class="domain-chevron">&#9654;</span>
      </div>
    </div>
    <div class="domain-body"><div class="domain-body-inner">${rowsHtml}</div></div>`;
  container.appendChild(el);
});

window.toggleDomain = function(h) { h.closest('.domain').classList.toggle('open'); };
window.toggleObj = function(t) {
  const row = t.closest('.obj-row'), wasOpen = row.classList.contains('open');
  row.classList.toggle('open');
  if (!wasOpen) { const q = row.querySelector('.vocab-quiz'); if (q && !q.dataset.inited) { q.dataset.inited='1'; initQuiz(q); } }
};

/* ── Filters ─────────────────────────────────────────────────────── */
document.querySelectorAll('.filter-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const f = chip.dataset.filter;
    document.querySelectorAll('.obj-row').forEach(row => {
      let show = true;
      if (f === 'red' || f === 'green' || f === 'yellow') show = row.dataset.prof === f;
      else if (f === 'configure') show = row.dataset.type === 'configure';
      else if (f === 'describe') show = row.dataset.type === 'describe';
      row.style.display = show ? '' : 'none';
    });
    // Show parent headers when filtering
    document.querySelectorAll('.obj-parent-header').forEach(h => {
      h.style.display = f === 'all' ? '' : (h.nextElementSibling && h.nextElementSibling.style.display !== 'none' ? '' : 'none');
    });
    if (f !== 'all') document.querySelectorAll('.domain').forEach(d => d.classList.add('open'));
  });
});

updateStats();
document.querySelector('.domain')?.classList.add('open');
