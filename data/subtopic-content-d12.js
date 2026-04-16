/**
 * subtopic-content-d12.js — Expanded study content for CCNA 200-301
 * Domains 1 (Network Fundamentals) and 2 (Network Access).
 *
 * Each entry: info, visual (animation config), hack (memory/practice/effort/meta).
 * Keyed by subtopic ID (e.g., "1.1.a").
 */
window.subtopicContentD12 = {

  /* ══════════════════════════════════════════════════════════════
     1.1 — Explain the role and function of network components
  ══════════════════════════════════════════════════════════════ */

  "1.1.a": {
    info: "<p>Routers are Layer 3 (Network layer) devices that forward packets between different IP networks based on destination IP addresses. When a packet arrives, the router strips the Layer 2 frame header, examines the destination IP in the Layer 3 header, performs a routing table lookup to find the best match (longest prefix match), and then re-encapsulates the packet in a new Layer 2 frame appropriate for the outgoing interface. This process is called <strong>packet switching</strong>.</p><p>Every router interface belongs to a different IP subnet and a different broadcast domain. This is the fundamental distinction from switches — routers <strong>do not forward broadcasts</strong> between interfaces by default. This broadcast domain segmentation is critical for large networks because it limits the scope of broadcast storms, ARP requests, and DHCP discovers.</p><p>The routing table contains three types of routes: <strong>connected routes</strong> (automatically learned when an interface is configured and brought up), <strong>static routes</strong> (manually configured by an administrator), and <strong>dynamic routes</strong> (learned via protocols like OSPF, EIGRP, or BGP). The router selects the best route using administrative distance (trustworthiness of the source) and metric (cost of the path). Connected routes have AD 0, static routes AD 1, OSPF AD 110, EIGRP AD 90.</p><p>Modern Cisco routers use <strong>Cisco Express Forwarding (CEF)</strong> to accelerate packet forwarding. CEF builds a Forwarding Information Base (FIB) from the routing table and an adjacency table from ARP, so the router can make forwarding decisions in hardware without hitting the CPU for every packet. Cisco ISR (Integrated Services Router) series — like the ISR 1000, 4000 — are the most common routers in enterprise networks.</p><p><strong>Key commands:</strong> <code>show ip route</code> (view routing table), <code>show ip interface brief</code> (interface status summary), <code>show running-config | section interface</code> (interface configs), <code>ip route [dest] [mask] [next-hop]</code> (configure static route).</p>",
    visual: { type: "packet-flow", params: { nodes: ["LAN A", "Router", "LAN B"], color: "#3b82f6" } },
    hack: {
      memory: "Router = post office sorting facility. Reads the ZIP code (destination IP), checks the routing table (delivery routes), re-packages the letter (new L2 frame), and sends it to the next post office (next hop). Each door of the post office opens to a different neighborhood (broadcast domain).",
      practice: "In Packet Tracer: connect two PCs on different subnets (e.g., 192.168.1.0/24 and 192.168.2.0/24) via a router. Configure each router interface with 'ip address' and 'no shutdown'. Set default gateways on each PC. Ping across and verify with 'show ip route' — you should see two 'C' (connected) routes. Then add a third network with a static route.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 8 (Routing Fundamentals) and Day 11 (Static Routing) are essential. Wendell Odom's OCG Chapter 15-16 covers IP routing in depth. The exam tests routing table interpretation heavily — practice reading 'show ip route' output until you can parse it instantly."
    }
  },

  "1.1.b": {
    info: "<p><strong>Layer 2 switches</strong> operate at the Data Link layer and forward Ethernet frames based on destination MAC addresses. When a frame arrives, the switch reads the source MAC and records it in the <strong>MAC address table</strong> (also called CAM table) along with the ingress port. It then looks up the destination MAC — if found, it forwards the frame out the correct port (known unicast); if not found, it <strong>floods</strong> the frame out all ports except the source (unknown unicast flooding). Broadcast frames (FF:FF:FF:FF:FF:FF) are always flooded to all ports in the VLAN.</p><p>Switches learn MAC addresses dynamically and age them out after 300 seconds (default on Cisco). Each port on a switch is a separate <strong>collision domain</strong>, but all ports in the same VLAN share one <strong>broadcast domain</strong>. VLANs allow a single physical switch to be logically divided into multiple broadcast domains.</p><p><strong>Layer 3 switches</strong> combine switching and routing in a single device. They can forward frames at Layer 2 like a normal switch AND route packets between VLANs at Layer 3 using <strong>SVIs (Switch Virtual Interfaces)</strong>. An SVI is a virtual interface assigned to a VLAN — for example, <code>interface vlan 10</code> with IP 10.0.10.1/24 acts as the default gateway for all hosts in VLAN 10. You must enable <code>ip routing</code> globally for the L3 switch to route.</p><p>L3 switches also support <strong>routed ports</strong> — physical ports configured with <code>no switchport</code> that behave like router interfaces. The key advantage of L3 switches over routers for inter-VLAN routing is speed: L3 switches use hardware ASICs (Application-Specific Integrated Circuits) to route at wire speed, while routers historically rely more on CPU-based software routing.</p><p>In the Cisco three-tier campus model, <strong>L2 switches sit at the access layer</strong> (connecting endpoints) and <strong>L3 switches sit at the distribution layer</strong> (routing between VLANs and enforcing policy). In a two-tier (collapsed core) design, the L3 switch handles both distribution and core functions.</p><p><strong>Key commands:</strong> <code>show mac address-table</code> (view MAC table), <code>show vlan brief</code> (VLAN assignments), <code>interface vlan [id]</code> + <code>ip address</code> (create SVI), <code>ip routing</code> (enable L3 routing on a multilayer switch).</p>",
    visual: {
      type: "comparison",
      params: {
        left: { label: "L2 Switch", items: ["MAC-based forwarding", "Single broadcast domain (per VLAN)", "No routing", "Cheaper, access layer"] },
        right: { label: "L3 Switch", items: ["MAC + IP forwarding", "Routes between VLANs via SVI", "Hardware ASIC routing", "Distribution/core layer"] }
      }
    },
    hack: {
      memory: "L2 switch = mailroom clerk who reads name tags (MAC addresses) and puts mail in the right cubby (port). L3 switch = mailroom clerk who ALSO knows street addresses (IPs) and can route packages between different buildings (VLANs). The magic command is 'ip routing' — without it, the L3 switch is just an expensive L2 switch.",
      practice: "Lab this in Packet Tracer: Create VLAN 10 and VLAN 20 on a 3560 or 3650 switch. Assign ports to each VLAN. Create SVIs (interface vlan 10, ip address 10.0.10.1 255.255.255.0; interface vlan 20, ip address 10.0.20.1 255.255.255.0). Enable 'ip routing'. Set PCs' default gateways to their respective SVIs. Ping across VLANs. Then check 'show ip route' to see connected VLAN routes.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 6 (Ethernet LAN Switching) covers L2 fundamentals. Day 17 (VLANs) and Day 18 (Inter-VLAN Routing) cover the L3 switch content. The exam WILL test inter-VLAN routing — expect questions on SVI configuration and when to use router-on-a-stick vs L3 switch. Wendell Odom OCG Chapters 5-8 and 17."
    }
  },

  "1.1.c": {
    info: "<p>Firewalls control traffic flow between network zones based on security rules. A <strong>traditional (stateless) firewall</strong> filters packets individually using ACLs — checking source/destination IP, ports, and protocol. A <strong>stateful firewall</strong> tracks the state of active connections (TCP handshake, UDP pseudo-sessions) and allows return traffic automatically. The Cisco ASA (Adaptive Security Appliance) was the classic stateful firewall in Cisco networks.</p><p><strong>Next-Generation Firewalls (NGFWs)</strong> add capabilities far beyond port/IP filtering. They perform <strong>deep packet inspection (DPI)</strong> up to Layer 7, meaning they can identify specific applications regardless of port. For example, an NGFW can distinguish between regular HTTPS traffic, Zoom video calls, and BitTorrent — all running on port 443 — and apply different policies to each. Key NGFW capabilities include:</p><ul><li><strong>Application awareness and control</strong> — identify and filter by application, not just port number</li><li><strong>Integrated IPS</strong> — inline intrusion prevention with signature and anomaly-based detection</li><li><strong>URL filtering</strong> — block categories of websites (gambling, malware, social media)</li><li><strong>Advanced malware protection (AMP)</strong> — sandboxing and file reputation analysis</li><li><strong>User identity integration</strong> — tie policies to Active Directory users, not just IPs</li><li><strong>SSL/TLS decryption</strong> — decrypt encrypted traffic for inspection, then re-encrypt</li></ul><p>Cisco's current NGFW platform is <strong>Cisco Secure Firewall</strong> (formerly Firepower Threat Defense / FTD). It runs on purpose-built hardware (Firepower 1000/2100/4100/9300 series) or as a virtual appliance. It is managed through <strong>Firewall Management Center (FMC)</strong> or Cisco Defense Orchestrator (CDO).</p><p>An <strong>Intrusion Detection System (IDS)</strong> monitors network traffic passively — it sits on a SPAN/mirror port, analyzes copies of traffic, and sends alerts when it detects malicious patterns. It <strong>cannot block attacks</strong> because it sees copies, not live traffic. An <strong>Intrusion Prevention System (IPS)</strong> sits <strong>inline</strong> in the traffic path — all traffic passes through it, and it can drop malicious packets in real time. The tradeoff: IPS adds latency and is a single point of failure if it goes down, but it provides active protection. Modern NGFWs integrate IPS as a built-in feature rather than a separate appliance.</p><p>Both IDS and IPS detect threats using two methods: <strong>signature-based detection</strong> (matching known attack patterns from a regularly updated database) and <strong>anomaly-based detection</strong> (flagging traffic that deviates from a learned baseline of normal behavior). Signature-based catches known threats reliably but misses zero-days. Anomaly-based can catch novel attacks but produces more false positives.</p>",
    visual: {
      type: "layer-stack",
      params: {
        layers: ["L7 Application — Deep packet inspection, app ID", "L4 Transport — Port/state-based filtering", "L3 Network — IP ACLs, routing", "L2 Data Link — MAC filtering", "L1 Physical"],
        highlight: 0
      }
    },
    hack: {
      memory: "Traditional firewall = airport metal detector (checks everyone the same way by basic criteria). NGFW = full TSA checkpoint with X-ray, dogs, facial recognition, and behavioral analysis — it knows WHO you are, WHAT you're carrying, and WHERE you're going, not just that you have a ticket. IDS = security camera (watches and records). IPS = armed guard (watches AND tackles).",
      practice: "Make a comparison flashcard: Stateless (ACL) → Stateful (ASA) → NGFW (Firepower). For each, write what layers it inspects and what it can detect. Then make an IDS vs IPS card: IDS = passive/mirror/alert-only, IPS = inline/active/blocks. Draw a network diagram showing where each sits (IDS off a SPAN port, IPS inline between zones).",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 54 (Security Fundamentals) covers IDS/IPS and firewall types. The CCNA exam tests concepts — you will NOT configure a firewall. Expect 2-3 questions: 'which device can identify applications on port 443?' (NGFW), 'what is the difference between IDS and IPS?' (inline vs passive), 'which detects AND prevents?' (IPS). Wendell Odom OCG Chapter 27."
    }
  },

  "1.1.d": {
    info: "<p>A <strong>wireless access point (AP)</strong> bridges the wireless (802.11) and wired (802.3 Ethernet) networks. It operates at Layer 1 (physical — radio frequency transmission) and Layer 2 (data link — 802.11 frame handling). When a wireless client sends an 802.11 frame, the AP receives it over RF, strips the 802.11 header, re-encapsulates the payload in an 802.3 Ethernet frame, and forwards it onto the wired network. The reverse happens for traffic going from wired to wireless.</p><p>Cisco defines two AP deployment modes:</p><p><strong>Autonomous APs</strong> are standalone devices — each AP is independently configured and managed via its own CLI or web GUI. They handle all wireless functions locally: client authentication, encryption, VLAN mapping, RF management, and QoS. Autonomous APs are suitable for very small deployments (1-3 APs) but become unmanageable at scale because each AP must be configured individually. If you have 50 APs and need to change an SSID, you touch all 50 devices.</p><p><strong>Lightweight APs</strong> are centrally managed by a <strong>Wireless LAN Controller (WLC)</strong> using the <strong>CAPWAP protocol</strong> (Control And Provisioning of Wireless Access Points, RFC 5415). This is a <strong>split-MAC architecture</strong> — real-time RF functions (beacons, probe responses, encryption/decryption, acknowledgments) stay on the AP, while management functions (authentication, SSID/VLAN mapping, security policies, RF channel/power decisions, firmware updates) are handled by the WLC. CAPWAP creates two tunnels between the AP and WLC:</p><ul><li><strong>Control tunnel</strong> — UDP port 5246, always DTLS-encrypted. Carries management traffic (config, firmware, RF settings).</li><li><strong>Data tunnel</strong> — UDP port 5247, optionally DTLS-encrypted. Carries client data traffic back to the WLC for central switching, or the AP can switch data locally in FlexConnect mode.</li></ul><p>Lightweight APs support multiple <strong>operational modes</strong>: <strong>Local mode</strong> (default — serves clients and scans for rogues between data frames), <strong>FlexConnect mode</strong> (switches data locally at the branch, survives WLC failure), <strong>Monitor mode</strong> (dedicated rogue/IDS sensor, no client service), <strong>Sniffer mode</strong> (captures wireless frames for analysis), and <strong>SE-Connect mode</strong> (spectrum analysis).</p><p>Key wireless terms: A <strong>BSS (Basic Service Set)</strong> is a single AP and its clients, identified by a <strong>BSSID</strong> (the AP radio's MAC address). An <strong>ESS (Extended Service Set)</strong> is multiple APs sharing the same SSID to provide seamless roaming. The <strong>SSID</strong> is the human-readable network name broadcast in beacon frames.</p>",
    visual: { type: "packet-flow", params: { nodes: ["Wireless Client", "AP (CAPWAP)", "WLC", "Switch"], color: "#8b5cf6" } },
    hack: {
      memory: "AP = bilingual translator between Wi-Fi (802.11) and Ethernet (802.3). Autonomous AP = freelance translator who works alone and sets their own schedule. Lightweight AP = corporate translator who follows the head office (WLC) playbook. CAPWAP = the phone line between the translator and head office — port 5246 for orders (control, always encrypted), port 5247 for the actual translated documents (data).",
      practice: "In Packet Tracer: add a WLC (3504 or vWLC), connect a lightweight AP to a switch on the same VLAN as the WLC management interface. Watch the AP discover and join the WLC via CAPWAP. Create a WLAN on the WLC, assign it to a VLAN, and connect a wireless client. Verify association with the WLC dashboard. Then make a flashcard comparing: Autonomous (standalone, individual config, all functions local) vs Lightweight (WLC-managed, split-MAC, CAPWAP tunnels).",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 56 (Wireless Architectures) and Day 57 (Wireless Security) cover this thoroughly. The exam expects you to know autonomous vs lightweight, what CAPWAP does and its port numbers, and the split-MAC concept. You may also see a question on FlexConnect (local switching at branch offices). Wendell Odom OCG Chapters 25-26."
    }
  },

  "1.1.e": {
    info: "<p><strong>Wireless LAN Controllers (WLCs)</strong> centrally manage lightweight APs, providing a single point of configuration for all wireless functions across an enterprise. Instead of configuring SSIDs, security settings, VLANs, QoS, and RF parameters on each AP individually, you configure them once on the WLC and it pushes the configuration to all associated APs automatically. This is the primary benefit — operational simplicity at scale.</p><p>Key WLC functions include: <strong>WLAN creation and management</strong> (SSIDs, security modes like WPA2/WPA3, VLAN mapping), <strong>RF management</strong> (automatic channel assignment and transmit power adjustment to minimize interference via RRM — Radio Resource Management), <strong>client roaming</strong> (seamless handoff as clients move between APs), <strong>firmware management</strong> (push AP software updates centrally), <strong>rogue AP detection</strong> (identify unauthorized APs on the network), and <strong>security policy enforcement</strong> (802.1X, web authentication, ACLs).</p><p>WLCs have several logical interface types: the <strong>management interface</strong> (in-band management, AP association, RADIUS authentication — the most critical interface), <strong>AP-manager interface</strong> (used for AP-to-WLC communication in some deployments), <strong>virtual interface</strong> (IP 1.1.1.1 by default — used for DHCP relay, web authentication redirect, and mobility manager), <strong>dynamic interfaces</strong> (mapped to VLANs to separate wireless traffic — like SVIs on a switch), and the <strong>service port</strong> (out-of-band management only). Cisco WLC models include the 3504, 5520, 9800 (the newest, running IOS-XE), and virtual/cloud WLCs.</p><p><strong>Cisco DNA Center</strong> (rebranded to <strong>Catalyst Center</strong> in 2023) is a network management and automation platform that sits above individual device controllers. It is the centerpiece of Cisco's <strong>Intent-Based Networking (IBN)</strong> strategy. You define the desired business intent (\"engineering department gets priority access to file servers\") and DNA Center translates that into device-level configurations across switches, routers, and WLCs.</p><p>DNA Center provides four core capabilities: <strong>Design</strong> (network hierarchy, device profiles, IP address management), <strong>Policy</strong> (group-based access control using SGTs — Scalable Group Tags — and microsegmentation via SD-Access), <strong>Provision</strong> (plug-and-play device onboarding, automated configuration push, image management), and <strong>Assurance</strong> (real-time monitoring, AI-driven anomaly detection, client health scoring, root cause analysis). DNA Center uses <strong>SDA (Software-Defined Access)</strong> to create a network fabric with VXLAN overlay tunnels and LISP for endpoint mobility.</p><p>The key distinction for the CCNA: <strong>WLC = wireless-only controller</strong> (manages APs and WLANs). <strong>DNA Center = network-wide controller</strong> (manages everything — wired, wireless, and WAN — through automation, policy, and assurance). DNA Center can manage WLCs as part of a larger fabric.</p>",
    visual: {
      type: "hierarchy",
      params: {
        root: "Cisco DNA Center",
        children: [
          { name: "WLC", children: [{ name: "Lightweight AP 1" }, { name: "Lightweight AP 2" }, { name: "Lightweight AP 3" }] },
          { name: "Switches" },
          { name: "Routers" }
        ]
      }
    },
    hack: {
      memory: "WLC = regional manager for APs — handles day-to-day operations (SSID configs, RF tuning, firmware). DNA Center = CEO who oversees the entire company (all switches, routers, WLCs) — sets strategy (intent-based policy), monitors health (assurance), and automates hiring (plug-and-play provisioning). The CEO doesn't micromanage — they set intent and let the managers execute.",
      practice: "Create a table with two columns: WLC and DNA Center. List what each manages, its scope (wireless-only vs network-wide), and its key features. Know the four DNA Center pillars: Design, Policy, Provision, Assurance. For WLC, know the interface types — management is the most important one. No lab needed — these are concept questions.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 57-58 covers WLC and wireless management. DNA Center/Catalyst Center appears in Day 60-61 (Network Automation). The CCNA tests these as concept questions — you will NOT configure a WLC or DNA Center in the exam. Expect: 'what does IBN mean?', 'what is the role of DNA Center?', 'which WLC interface is used for AP management?' Wendell Odom OCG Chapters 25-26 and 29."
    }
  },

  "1.1.f": {
    info: "<p><strong>Endpoints</strong> are the devices at the edge of a network that originate or consume data — they are the source and destination of network communication. Common endpoints include: desktop PCs, laptops, smartphones, tablets, VoIP phones, printers, IP cameras, point-of-sale terminals, smart TVs, and IoT sensors (temperature, humidity, motion, smart locks, medical devices).</p><p>Every endpoint connects to the network through a <strong>Network Interface Card (NIC)</strong> that has a unique <strong>MAC address</strong> (48-bit, burned-in address / BIA). Endpoints are typically assigned an IP address via <strong>DHCP</strong> or static configuration. When an endpoint needs to communicate with a device on a different subnet, it sends traffic to its <strong>default gateway</strong> (usually the nearest router or L3 switch SVI).</p><p>From a network architecture perspective, endpoints connect at the <strong>access layer</strong> — the lowest tier of the campus network. Access layer switches provide port-level connectivity and enforce initial policies like <strong>port security</strong> (limiting which MACs can connect), <strong>802.1X authentication</strong> (requiring credentials before granting network access), <strong>DHCP snooping</strong> (preventing rogue DHCP servers), and <strong>dynamic ARP inspection</strong> (stopping ARP spoofing).</p><p>Endpoints are the <strong>primary attack surface</strong> in any network. Malware, phishing, and unauthorized access typically start at an endpoint. Modern endpoint security strategies include: <strong>NAC (Network Access Control)</strong> — verify device compliance before allowing access, <strong>Cisco ISE (Identity Services Engine)</strong> — centralized policy enforcement using 802.1X and profiling, <strong>endpoint detection and response (EDR)</strong> — Cisco Secure Endpoint (formerly AMP for Endpoints), and <strong>BYOD policies</strong> — managing personal devices connecting to corporate networks.</p><p>The growth of <strong>IoT</strong> has massively increased the number and variety of endpoints. IoT devices are often resource-constrained (limited CPU/memory), may not support 802.1X, and frequently have poor security practices (default credentials, no patching). Network segmentation and dedicated IoT VLANs are critical for containing the risk these devices introduce.</p>",
    visual: { type: "packet-flow", params: { nodes: ["PC/Phone", "Switch", "Router", "Server"], color: "#10b981" } },
    hack: {
      memory: "Endpoints = the actual people having conversations in a building. The network infrastructure (switches, routers, firewalls) = the hallways, elevators, and doors connecting them. If someone asks 'is device X an endpoint?', the test is: does it GENERATE data or FORWARD data? PCs, phones, cameras, printers, and IoT sensors all generate data — they're endpoints. Switches, routers, and firewalls forward data — they're infrastructure.",
      practice: "Make a two-column flashcard: 'Endpoint' vs 'Infrastructure'. Place these correctly: PC, laptop, IP phone, printer, IP camera, router, switch, firewall, WLC, IoT sensor, server. Also know the access layer security features that protect endpoints: port security, 802.1X, DHCP snooping, DAI.",
      effort: "low",
      meta: "This subtopic is conceptual and lightweight on the exam — typically 0-1 direct questions. But understanding what an endpoint IS matters for all security and access-layer topics. Jeremy's IT Lab Day 49 covers port security, Day 54 covers endpoint security concepts. Wendell Odom OCG Chapter 27 (Security Fundamentals)."
    }
  },

  "1.1.g": {
    info: "<p><strong>Servers</strong> are specialized computers that provide services to clients across the network. In the <strong>client-server model</strong>, the client initiates a request and the server responds — for example, a web browser (client) sends an HTTP GET to a web server, which responds with the requested page. The server typically runs dedicated software (Apache, Microsoft IIS, BIND, ISC DHCP) on known <strong>well-known port numbers</strong> so clients can find the service.</p><p>Critical server types for CCNA and their port numbers:</p><ul><li><strong>DNS (Domain Name System)</strong> — resolves hostnames to IP addresses. Uses UDP/TCP port 53. Client queries a recursive DNS server, which checks root → TLD → authoritative servers. Record types: A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), PTR (reverse lookup).</li><li><strong>DHCP (Dynamic Host Configuration Protocol)</strong> — automatically assigns IP addresses, subnet mask, default gateway, and DNS server. Server uses UDP port 67, client uses UDP port 68. The process follows <strong>DORA</strong>: Discover (client broadcast) → Offer (server response) → Request (client confirms) → Acknowledge (server finalizes lease).</li><li><strong>HTTP/HTTPS (Web)</strong> — HTTP on TCP port 80, HTTPS on TCP port 443. HTTPS adds TLS encryption for security.</li><li><strong>FTP (File Transfer Protocol)</strong> — TCP port 21 (control) and TCP port 20 (data in active mode). SFTP (SSH-based) uses port 22. TFTP (Trivial FTP, no authentication) uses UDP port 69 — commonly used for transferring router/switch configs and IOS images.</li><li><strong>SMTP (email sending)</strong> — TCP port 25 (or 587 with authentication). POP3 (retrieve email) — TCP port 110. IMAP (access email) — TCP port 143.</li><li><strong>RADIUS</strong> — authentication/authorization on UDP 1812, accounting on UDP 1813. Used with 802.1X for network access control.</li><li><strong>TACACS+</strong> — TCP port 49. Cisco-proprietary AAA protocol. Unlike RADIUS, TACACS+ separates authentication, authorization, and accounting and encrypts the entire packet body.</li><li><strong>Syslog</strong> — UDP port 514. Centralized logging — network devices send log messages to a syslog server. Severity levels 0 (emergency) through 7 (debugging).</li><li><strong>NTP (Network Time Protocol)</strong> — UDP port 123. Synchronizes clocks across all network devices. Essential for log correlation and certificate validation.</li><li><strong>SNMP (Simple Network Management Protocol)</strong> — UDP port 161 (queries) and 162 (traps/notifications). Used for network monitoring and management. Versions: v1 (community strings, plaintext), v2c (bulk operations, still plaintext), v3 (authentication + encryption — recommended).</li><li><strong>SSH</strong> — TCP port 22. Secure remote CLI access. Replaced Telnet (TCP port 23) which sends all data including passwords in plaintext.</li></ul><p>Servers are typically deployed in a <strong>data center or server room</strong> behind the core/distribution layers, connected via high-bandwidth links. In modern networks, server virtualization is common — multiple virtual servers run on a single physical host using hypervisors (VMware ESXi, Hyper-V). Cloud servers (AWS EC2, Azure VMs) extend this concept off-premises.</p>",
    visual: { type: "packet-flow", params: { nodes: ["Client", "Switch", "Server (DNS/DHCP/Web)"], color: "#f59e0b" } },
    hack: {
      memory: "Server = restaurant waiter with a specialty. DNS waiter = 'Let me look up that address for you' (port 53). DHCP waiter = 'Here's your table assignment' (67/68, DORA). Web waiter = 'Here's the menu you requested' (80/443). Syslog waiter = 'I'll write that down in the log' (514). NTP waiter = 'Let me set your watch' (123). RADIUS = 'Show me your badge' (1812). For port memorization: DNS=53, DHCP=67/68, HTTP=80, HTTPS=443, FTP=21/20, SSH=22, Telnet=23, SMTP=25, TFTP=69, NTP=123, SNMP=161/162, Syslog=514, RADIUS=1812/1813, TACACS+=49.",
      practice: "In Packet Tracer: set up a server with DHCP and DNS services. Configure the DHCP pool (network, default-router, DNS server). Add DNS records. Connect a PC, set it to DHCP, verify it gets an IP (ipconfig), then ping a hostname to test DNS. Then set up a syslog server and configure a router with 'logging [server-ip]' — generate events and check the syslog server. This reinforces the client-server model hands-on.",
      effort: "medium",
      meta: "Port numbers are one of the most heavily tested CCNA topics — expect 5-8 questions that require knowing ports. Jeremy's IT Lab covers these across multiple days (DNS in Day 39, DHCP in Day 38, NTP/Syslog in Day 40, SSH in Day 41, FTP/TFTP in Day 42, SNMP in Day 40). Make flashcards and drill until you can recite all ports from memory. Wendell Odom OCG Chapter 4 (TCP/IP Layer 4) and Chapter 13 (DHCP/DNS)."
    }
  },

  "1.1.h": {
    info: "<p><strong>Power over Ethernet (PoE)</strong> delivers DC electrical power alongside data over standard Ethernet copper cabling (Cat5e or better), eliminating the need for separate power outlets and adapters at each device location. This is critical for devices deployed in locations where running power is difficult or expensive — ceiling-mounted APs, wall-mounted IP cameras, conference room VoIP phones.</p><p>The IEEE defines three main PoE standards:</p><ul><li><strong>802.3af (PoE)</strong> — up to 15.4W at the PSE (Power Sourcing Equipment, typically the switch), delivering ~12.95W at the PD (Powered Device) after cable loss. Uses 2 of 4 twisted pairs. Maximum current: 350mA. Sufficient for basic IP phones and entry-level APs.</li><li><strong>802.3at (PoE+)</strong> — up to 30W at PSE, ~25.5W at PD. Still uses 2 of 4 pairs but at higher current (600mA). Required for modern APs (like Cisco 9120/9130 series), pan-tilt cameras, some thin clients, and dual-radio APs.</li><li><strong>802.3bt (PoE++)</strong> — Type 3 delivers up to 60W (using all 4 pairs), Type 4 up to 90W (all 4 pairs at higher current). Needed for PTZ cameras with heaters, digital signage, high-performance APs (Wi-Fi 6E), and even some laptops. Requires Cat5e minimum for Type 3, Cat6A recommended for Type 4.</li></ul><p>Cisco also has proprietary extensions: <strong>UPoE</strong> (Universal PoE, 60W) and <strong>UPoE+</strong> (90W), which preceded and overlap with 802.3bt.</p><p>The PoE process works as follows: The switch (PSE) sends a low-voltage detection signal on the Ethernet port. If it detects a valid PoE signature (a 25kΩ resistance per IEEE 802.3), it classifies the device into a power class (0-8) and allocates the appropriate wattage. Power negotiation can be refined using <strong>CDP or LLDP-MED</strong> — the PD tells the PSE exactly how much power it needs, allowing the switch to budget more efficiently.</p><p>A PoE switch has a total <strong>power budget</strong> — for example, a Cisco Catalyst 9200-48P has a 740W PoE budget. If you connect 48 PoE+ devices each drawing 30W, that's 1440W — exceeding the budget. The switch will deny power to lower-priority ports. You can configure priority per port with <code>power inline [auto|static|never]</code> and <code>power inline priority [low|high|critical]</code>.</p><p><strong>Endspan</strong> means the switch itself provides PoE (most common). <strong>Midspan</strong> means a separate PoE injector sits between a non-PoE switch and the PD — useful for upgrading older switches without replacing them.</p><p><strong>Key commands:</strong> <code>show power inline</code> (view PoE status per port — allocated vs consumed watts), <code>show power inline [interface]</code> (detail on a specific port), <code>power inline auto</code> (enable PoE on an interface, default).</p>",
    visual: {
      type: "comparison",
      params: {
        left: { label: "PoE Standards", items: ["802.3af — 15.4W (PoE)", "802.3at — 30W (PoE+)", "802.3bt T3 — 60W (PoE++)", "802.3bt T4 — 90W (PoE++)"] },
        right: { label: "Common PDs", items: ["IP Phones (~7W → af)", "Standard APs (~15W → af/at)", "Modern APs (~25W → at)", "PTZ Cameras (~60W → bt)"] }
      }
    },
    hack: {
      memory: "The standards spell out the wattage: 802.3<strong>af</strong> = <strong>f</strong>ifteen (15.4W). 802.3<strong>at</strong> = <strong>t</strong>hirty (30W). 802.3<strong>bt</strong> = <strong>b</strong>ig <strong>t</strong>ime (60-90W). For PSE vs PD: <strong>P</strong>SE = <strong>P</strong>rovides power (Switch/injector). <strong>P</strong>D = <strong>P</strong>owers up (Device that drinks the power — AP, phone, camera).",
      practice: "In Packet Tracer: connect an IP phone and an AP to a PoE switch. Use 'show power inline' to see which ports are providing power, the allocated vs consumed wattage, and the device class. Change a port to 'power inline never' and watch the device lose power. Make a flashcard with all three standards, wattage, and a common device that uses each. Practice a PoE budget calculation: given a 370W budget, how many PoE+ (30W) devices can you power? (12, with 10W leftover).",
      effort: "low",
      meta: "Jeremy's IT Lab Day 25 covers PoE. Expect 1-2 CCNA questions — they love testing wattage per standard and PSE/PD definitions. The 'af=fifteen, at=thirty' mnemonic is widely used across r/ccna and Boson practice exams. Wendell Odom OCG Chapter 11 covers PoE in the context of LAN design. Don't overthink this — memorize the three standards and their wattage, know PSE vs PD, and you're set."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     1.2 — Describe characteristics of network topology architectures
  ══════════════════════════════════════════════════════════════ */

  "1.2.a": {
    info: "Two-tier (collapsed core) architecture merges the core and distribution layers into a single layer, connecting directly to the access layer. It's used in smaller campus networks where a full three-tier design is unnecessary. Reduces cost and complexity but limits scalability. The combined core/distribution switches handle both inter-VLAN routing and high-speed backbone forwarding.",
    visual: {
      type: "hierarchy",
      params: {
        root: "Core/Distribution (Collapsed)",
        children: [
          { name: "Access Switch 1", children: [{ name: "PCs" }] },
          { name: "Access Switch 2", children: [{ name: "Phones" }] },
          { name: "Access Switch 3", children: [{ name: "APs" }] }
        ]
      }
    },
    hack: {
      memory: "Two-tier = two-story building. Ground floor (access) and penthouse (core+distribution combined). Small enough that you don't need a middle floor.",
      practice: "Draw both two-tier and three-tier on paper. Label which layers exist in each. Know the trade-off: simpler + cheaper vs less scalable.",
      effort: "low",
      meta: "The exam asks when to use two-tier vs three-tier. Answer: two-tier for small/medium campuses where a dedicated core isn't needed."
    }
  },

  "1.2.b": {
    info: "Three-tier architecture has three distinct layers: Access (connects endpoints, enforces port security), Distribution (aggregates access switches, applies policies, performs inter-VLAN routing), and Core (high-speed backbone, no packet manipulation, pure forwarding). This is the traditional enterprise campus design and scales to thousands of endpoints.",
    visual: {
      type: "hierarchy",
      params: {
        root: "Core Layer (High-speed backbone)",
        children: [
          { name: "Distribution 1", children: [{ name: "Access 1" }, { name: "Access 2" }] },
          { name: "Distribution 2", children: [{ name: "Access 3" }, { name: "Access 4" }] }
        ]
      }
    },
    hack: {
      memory: "Three-tier = airport. Access = check-in desks (user-facing). Distribution = security checkpoints (policy enforcement). Core = the runway (fast forwarding, no delays).",
      practice: "Memorize each layer's role: Access=endpoints, Distribution=policy+routing, Core=speed. Write one sentence for each layer from memory.",
      effort: "low",
      meta: "This is a guaranteed exam topic. Jeremy's IT Lab and David Bombal both emphasize drawing the three-tier model repeatedly until it's automatic."
    }
  },

  "1.2.c": {
    info: "Spine-leaf is a two-tier data center fabric where every leaf switch connects to every spine switch, creating equal-cost paths and predictable latency. Leaf switches connect to servers; spine switches only connect to leaf switches. Traffic between any two servers always crosses exactly one spine (two hops). This eliminates STP bottlenecks and enables massive east-west traffic flows typical in data centers.",
    visual: {
      type: "hierarchy",
      params: {
        root: "Spine-Leaf Fabric",
        children: [
          { name: "Spine 1", children: [{ name: "Leaf A" }, { name: "Leaf B" }, { name: "Leaf C" }] },
          { name: "Spine 2", children: [{ name: "Leaf A" }, { name: "Leaf B" }, { name: "Leaf C" }] }
        ]
      }
    },
    hack: {
      memory: "Spine-leaf = every leaf touches every spine — like a rib cage. Spine = backbone, leaves = ribs. Always 2 hops between any two servers.",
      practice: "Draw a spine-leaf with 2 spines and 4 leaves. Draw ALL connections (every leaf to every spine). Count the hops between two servers on different leaves — always 2.",
      effort: "low",
      meta: "Know that spine-leaf replaces three-tier in data centers. The key phrase is 'predictable latency' and 'east-west traffic'. Flashcard it."
    }
  },

  "1.2.d": {
    info: "WAN (Wide Area Network) connects geographically separated sites over long distances. Technologies include MPLS (provider-managed, SLA-backed), Metro Ethernet, broadband (DSL/cable), leased lines (T1/T3), and SD-WAN (software-defined overlay). WAN links are typically slower and more expensive than LAN links. SD-WAN is the modern approach, using internet links with encrypted tunnels to replace expensive MPLS circuits.",
    visual: { type: "packet-flow", params: { nodes: ["Branch Office", "WAN / Internet", "HQ Data Center"], color: "#ef4444" } },
    hack: {
      memory: "WAN = highways between cities. LAN = streets within a city. MPLS = toll road (guaranteed speed, costs more). SD-WAN = smart GPS routing across free highways.",
      practice: "Know WAN technology names and their characteristics. Focus on MPLS vs SD-WAN for the exam. Flashcard: MPLS = provider-managed, SLA; SD-WAN = overlay, policy-based, uses internet.",
      effort: "low",
      meta: "CCNA tests WAN concepts, not configuration. Know the technology names and when each is appropriate."
    }
  },

  "1.2.e": {
    info: "SOHO (Small Office/Home Office) networks are simple flat networks with a single consumer-grade router that combines routing, switching, Wi-Fi, firewall, DHCP, and NAT into one device. Typically one subnet, one broadcast domain, and direct internet access via ISP. SOHO routers often run NAT to share a single public IP across multiple devices.",
    visual: {
      type: "hierarchy",
      params: {
        root: "ISP (Internet)",
        children: [
          { name: "SOHO Router/AP", children: [{ name: "PC" }, { name: "Phone" }, { name: "Printer" }, { name: "Smart TV" }] }
        ]
      }
    },
    hack: {
      memory: "SOHO = your home network. One box does everything — router, switch, AP, firewall, DHCP. It's the Swiss Army knife of networking.",
      practice: "Know that SOHO = flat topology, single device, NAT for internet access. Quick flashcard — no lab needed.",
      effort: "low",
      meta: "SOHO questions are easy points. If asked 'which topology uses a single device for all functions?' — it's SOHO."
    }
  },

  "1.2.f": {
    info: "On-premises means the organization owns, operates, and physically hosts all network infrastructure in its own facility — full control but high CapEx and maintenance burden. Cloud means infrastructure is hosted by a provider (AWS, Azure, GCP) — lower CapEx, elastic scaling, pay-as-you-go, but less physical control. Hybrid cloud combines both. The exam tests the conceptual trade-offs, not cloud configuration.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "On-Premises", items: ["Full control", "High CapEx", "Own maintenance", "Physical security"] },
        right: { label: "Cloud", items: ["Provider-managed", "OpEx model", "Elastic scaling", "Shared responsibility"] }
      }
    },
    hack: {
      memory: "On-prem = owning a house (you fix the plumbing). Cloud = renting an apartment (landlord fixes it, but you follow their rules).",
      practice: "Memorize the trade-offs: CapEx vs OpEx, control vs convenience, scaling vs fixed capacity. Flashcard the key differences.",
      effort: "low",
      meta: "1-2 concept questions max. Know CapEx (on-prem) vs OpEx (cloud) and the shared responsibility model."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     1.3 — Compare physical interface and cabling types
  ══════════════════════════════════════════════════════════════ */

  "1.3.a": {
    info: "Single-mode fiber (SMF) uses a small core (8-10 microns) and a laser transmitter to send light over long distances (up to 100+ km) — used for WAN and campus backbone links. Multimode fiber (MMF) uses a larger core (50/62.5 microns) and LED/VCSEL transmitters over shorter distances (up to ~550m at 10G) — used for data center and building interconnects. Copper (UTP Cat5e/6/6a) uses electrical signals over twisted pairs, supports up to 100m, and is cheapest — used for access-layer connections.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Single-Mode Fiber", items: ["Small core (8-10um)", "Laser transmitter", "Long range (100+ km)", "More expensive", "Yellow jacket"] },
        right: { label: "Multimode Fiber", items: ["Large core (50/62.5um)", "LED/VCSEL", "Short range (~550m)", "Less expensive", "Orange/aqua jacket"] }
      }
    },
    hack: {
      memory: "Single-mode = sniper rifle (one focused laser beam, long range). Multimode = shotgun (multiple light modes bouncing, short range). Copper = hand delivery (cheap, local only).",
      practice: "Flashcard: SMF=yellow=laser=long, MMF=orange/aqua=LED=short, Copper=blue=electrical=100m. Know Cat5e=1G, Cat6=1G(10G@55m), Cat6a=10G@100m.",
      effort: "medium",
      meta: "This is heavily tested. r/ccna recommends a comparison table. Know the color of each cable — yellow=SMF, orange/aqua=MMF."
    }
  },

  "1.3.b": {
    info: "Ethernet shared media (hub-based or legacy coax) means all devices share the same collision domain — only one device can transmit at a time (CSMA/CD). Point-to-point Ethernet (modern switched networks) gives each device a dedicated collision domain per switch port — full-duplex communication with no collisions. Modern LANs are point-to-point by default because switches replaced hubs.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Shared Media (Hub)", items: ["One collision domain", "Half-duplex", "CSMA/CD required", "Legacy technology"] },
        right: { label: "Point-to-Point (Switch)", items: ["One collision domain per port", "Full-duplex", "No collisions", "Modern standard"] }
      }
    },
    hack: {
      memory: "Shared media = walkie-talkie (one talks, everyone listens). Point-to-point = phone call (private, both talk simultaneously).",
      practice: "Know that switches create micro-segmentation — each port is its own collision domain. Hubs = shared; switches = dedicated. Quick flashcard.",
      effort: "low",
      meta: "Simple concept question. The key insight: switches eliminated shared media problems. If the answer mentions 'collision domain per port,' it's a switch."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     1.4 — Identify interface and cable issues
  ══════════════════════════════════════════════════════════════ */

  "1.4.a": {
    info: "Collisions occur when two devices transmit simultaneously on shared media (half-duplex). Late collisions happen after the first 64 bytes have been transmitted — they indicate cable length exceeding spec, duplex mismatch, or a faulty NIC. Normal collisions are expected on half-duplex links; late collisions always indicate a problem and appear in 'show interfaces' output.",
    visual: { type: "packet-flow", params: { nodes: ["Device A (TX)", "Collision!", "Device B (TX)"], color: "#ef4444" } },
    hack: {
      memory: "Collision = two cars entering an intersection at the same time. Late collision = crash happens way down the road — something's seriously wrong (cable too long or duplex mismatch).",
      practice: "In Packet Tracer, connect two devices via a hub and generate traffic from both. Check 'show interfaces' for collision counters. Then switch to full-duplex and verify collisions stop.",
      effort: "medium",
      meta: "Late collisions on a full-duplex link = duplex mismatch almost always. This is a classic exam trap."
    }
  },

  "1.4.b": {
    info: "CRC (Cyclic Redundancy Check) errors mean the frame's calculated checksum doesn't match the one in the FCS field — the frame was corrupted in transit. Common causes: bad cables, EMI interference, or faulty NIC. Frame errors encompass CRC errors plus other malformed frame issues. These counters appear in 'show interfaces' under input errors.",
    visual: {
      type: "encapsulation",
      params: {
        layers: [
          { label: "Preamble + SFD", color: "#64748b" },
          { label: "Frame Data", color: "#3b82f6" },
          { label: "FCS (CRC check)", color: "#ef4444" }
        ]
      }
    },
    hack: {
      memory: "CRC = receipt checker at the store. If the receipt doesn't match what's in the bag, the whole thing gets rejected. Bad cable = items falling out of the bag on the way.",
      practice: "Know the hierarchy: input errors > CRC + runts + giants + frame errors. If CRC errors are incrementing, check the cable first, then the NIC. Flashcard this troubleshooting order.",
      effort: "low",
      meta: "CRC errors = Layer 1 problem (cable/NIC/interference). The exam loves asking 'what causes CRC errors?' — answer: physical layer issues."
    }
  },

  "1.4.c": {
    info: "Runts are frames smaller than 64 bytes (the minimum Ethernet frame size) — typically caused by collisions, a faulty NIC, or duplex mismatch. Giants are frames larger than 1518 bytes (standard Ethernet MTU without jumbo frames) — caused by misconfigured MTU, faulty NIC, or software bugs. Both are dropped by the switch and counted as input errors.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Runt (< 64 bytes)", items: ["Too small", "Collision fragment", "Duplex mismatch", "Bad NIC"] },
        right: { label: "Giant (> 1518 bytes)", items: ["Too large", "MTU mismatch", "Jumbo frame leak", "Bad NIC"] }
      }
    },
    hack: {
      memory: "Runt = runt of the litter (too small to survive). Giant = oversized package that doesn't fit in the mailbox. Both get rejected.",
      practice: "Memorize: Runt < 64 bytes, Giant > 1518 bytes. If you see runts on a full-duplex link, suspect duplex mismatch. Flashcard the byte thresholds.",
      effort: "low",
      meta: "Know the exact byte thresholds — 64 and 1518. The exam asks directly."
    }
  },

  "1.4.d": {
    info: "Input errors are the total count of all inbound frame problems (CRC + runts + giants + other). Output errors indicate the switch couldn't transmit a frame, usually due to congestion (output buffer full). Interface resets happen when the interface is bounced (shut/no shut), encounters excessive errors, or detects a keepalive failure. All visible in 'show interfaces' counters.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Input Errors", items: ["CRC errors", "Runts", "Giants", "Frame errors", "Overrun"] },
        right: { label: "Output Errors", items: ["Collisions", "Late collisions", "Buffer full", "Underrun"] }
      }
    },
    hack: {
      memory: "Input errors = problems with mail arriving at your door. Output errors = problems with mail leaving your outbox. Resets = you unplugged and re-plugged the mailbox.",
      practice: "Run 'show interfaces' on any interface in Packet Tracer. Identify each counter category. Know that rising input errors = check the cable/remote device first.",
      effort: "medium",
      meta: "The exam shows you 'show interfaces' output and asks what's wrong. Practice reading the counters — especially input errors, CRC, and resets."
    }
  },

  "1.4.e": {
    info: "Duplex mismatch occurs when one side is full-duplex and the other is half-duplex. The full-duplex side transmits freely (no CSMA/CD) while the half-duplex side detects 'collisions' that aren't real. Symptoms: late collisions on the half-duplex side, FCS/CRC errors on the full-duplex side, extremely slow throughput. This is one of the most common Layer 1/2 troubleshooting issues.",
    visual: {
      type: "handshake",
      params: {
        leftLabel: "Full Duplex",
        rightLabel: "Half Duplex",
        steps: ["TX freely →", "← Detects collision!", "TX continues →", "← Late collision error"]
      }
    },
    hack: {
      memory: "Duplex mismatch = one person on a phone call, the other on a walkie-talkie. The phone person talks anytime; the walkie-talkie person keeps getting interrupted.",
      practice: "In Packet Tracer, set one side to full-duplex and the other to half-duplex. Generate traffic and check 'show interfaces' for late collisions and CRC errors.",
      effort: "medium",
      meta: "Duplex mismatch = late collisions + poor performance. This is tested often. Set both sides to auto-negotiate or manually match — never mismatch."
    }
  },

  "1.4.f": {
    info: "Speed mismatch occurs when two connected interfaces negotiate or are manually set to different speeds (e.g., 100M vs 1G). Auto-negotiation failures happen when one side is set to manual speed/duplex and the other is auto — the auto side may default to the wrong settings. When auto-negotiation fails, the auto side defaults to the lowest speed and half-duplex, causing severe performance issues.",
    visual: {
      type: "handshake",
      params: {
        leftLabel: "1 Gbps (Manual)",
        rightLabel: "Auto (defaults to 100M/Half)",
        steps: ["I'm at 1G →", "← Can't negotiate", "Link may not come up", "← Or defaults to worst case"]
      }
    },
    hack: {
      memory: "Auto-negotiation failure defaults: speed = sense (uses electrical signal to detect), duplex = half if speed is 10/100, full if 1G. Mnemonic: 'auto alone goes slow and half.'",
      practice: "Know the auto-negotiation fallback rules: 10/100 = half-duplex default, 1000 = full-duplex default. Best practice: set both sides to auto or both to manual matching values.",
      effort: "medium",
      meta: "The exam tests the fallback behavior. Memorize: 'If auto-negotiation fails, duplex defaults to half (at 10/100).' This trips up many test-takers."
    }
  },

  "1.4.g": {
    info: "Interface status codes come in pairs: line protocol status / interface status. 'up/up' = working. 'up/down' = Layer 1 up but Layer 2 protocol failure (encapsulation mismatch, keepalive failure, clock rate missing on serial). 'down/down' = Layer 1 problem (cable unplugged, bad cable, no carrier signal). 'administratively down/down' = 'shutdown' command applied. These codes are the first thing you check when troubleshooting.",
    visual: {
      type: "state-machine",
      params: {
        states: ["admin down/down", "down/down (L1 issue)", "up/down (L2 issue)", "up/up (working)"],
        active: 3,
        transitions: true
      }
    },
    hack: {
      memory: "up/up = green light. up/down = yellow light (connected but confused). down/down = red light (no cable). admin down = off switch (you turned it off with 'shutdown').",
      practice: "In Packet Tracer, try each state: 1) 'shutdown' an interface (admin down). 2) Unplug the cable (down/down). 3) Connect it back (up/up). Run 'show ip interface brief' each time.",
      effort: "medium",
      meta: "This is one of the most tested topics. Memorize all four states and their causes. 'show ip interface brief' is the go-to verification command."
    }
  },

  "1.4.h": {
    info: "'show interfaces' displays detailed statistics for a specific interface — status codes, MTU, bandwidth, input/output errors, CRC, collisions, resets, and duplex/speed. 'show interfaces status' provides a summary table of all interfaces showing port, name, status (connected/notconnect/disabled), VLAN, duplex, speed, and type. These are the primary commands for Layer 1/2 troubleshooting.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "show interfaces", items: ["Detailed per-interface", "Error counters", "Input/output packets", "Duplex/speed", "Status codes"] },
        right: { label: "show interfaces status", items: ["Summary table (all ports)", "Port + VLAN", "Duplex + Speed", "Status column", "Quick overview"] }
      }
    },
    hack: {
      memory: "'show interfaces' = full medical report (every detail). 'show interfaces status' = quick vitals check (heart rate, temp, blood pressure for all patients).",
      practice: "Run both commands in Packet Tracer on a switch with multiple ports in different states. Compare the output. Practice identifying duplex mismatch, speed, and error counters.",
      effort: "medium",
      meta: "The exam WILL show you output from these commands and ask you to diagnose. Practice reading the output until you can spot issues in seconds."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     1.5 — Compare TCP to UDP
  ══════════════════════════════════════════════════════════════ */

  "1.5.a": {
    info: "TCP (Transmission Control Protocol) is connection-oriented — it establishes a session before sending data. It provides reliable delivery through acknowledgments and retransmissions, and ordered delivery through sequence numbers. Every segment is tracked, and lost data is retransmitted. This reliability comes at the cost of higher overhead and slower performance compared to UDP.",
    visual: {
      type: "layer-stack",
      params: {
        layers: ["L7 Application", "L4 TCP — Reliable, ordered, connection-oriented", "L3 Network", "L2 Data Link", "L1 Physical"],
        highlight: 1
      }
    },
    hack: {
      memory: "TCP = certified mail. You know it was delivered, in order, and you get a receipt. If lost, the post office sends it again.",
      practice: "Compare TCP and UDP side by side: TCP = reliable, ordered, connection-oriented, more overhead. UDP = unreliable, unordered, connectionless, less overhead. Write it from memory 5 times.",
      effort: "medium",
      meta: "TCP vs UDP is heavily tested. Know the characteristics cold. Jeremy's IT Lab Day 23 covers this perfectly."
    }
  },

  "1.5.b": {
    info: "TCP three-way handshake establishes a connection: Client sends SYN (synchronize), Server responds with SYN-ACK (synchronize-acknowledge), Client sends ACK (acknowledge). After this, data transfer begins. Both sides agree on initial sequence numbers during this process. The handshake ensures both sides are ready and reachable before any data is sent.",
    visual: {
      type: "handshake",
      params: {
        leftLabel: "Client",
        rightLabel: "Server",
        steps: ["SYN (seq=100) →", "← SYN-ACK (seq=300, ack=101)", "ACK (ack=301) →", "--- Connection Established ---"]
      }
    },
    hack: {
      memory: "Three-way handshake = making a phone call. You dial (SYN), they say 'hello?' (SYN-ACK), you say 'hey it's me' (ACK). Now you talk.",
      practice: "Draw the three-way handshake 10 times with the flags: SYN → SYN-ACK → ACK. In Wireshark, capture a web request and find the three-way handshake packets.",
      effort: "medium",
      meta: "This is nearly guaranteed on the exam. Draw it from memory until it's automatic. Know the flag sequence: SYN, SYN-ACK, ACK."
    }
  },

  "1.5.c": {
    info: "TCP four-way teardown gracefully closes a connection: one side sends FIN, the other responds with ACK, then sends its own FIN, and the first side sends a final ACK. This allows both sides to finish sending data independently. Either side can initiate the teardown. A RST (reset) can also abruptly terminate a connection without the graceful sequence.",
    visual: {
      type: "handshake",
      params: {
        leftLabel: "Client",
        rightLabel: "Server",
        steps: ["FIN →", "← ACK", "← FIN", "ACK →", "--- Connection Closed ---"]
      }
    },
    hack: {
      memory: "Four-way teardown = politely ending a phone call. 'I'm done' (FIN), 'OK' (ACK), 'I'm done too' (FIN), 'Bye' (ACK). RST = hanging up abruptly.",
      practice: "Draw it: FIN → ACK → FIN → ACK. Compare to the 3-way handshake. Know that RST is the rude alternative that skips the graceful process.",
      effort: "low",
      meta: "Less commonly tested than the three-way handshake, but still appears. Know FIN-ACK-FIN-ACK and that RST is abrupt termination."
    }
  },

  "1.5.d": {
    info: "TCP windowing controls how much data can be sent before requiring an acknowledgment. The window size adjusts dynamically — starts small (slow start), grows larger as the connection proves reliable, and shrinks if congestion is detected. Flow control prevents the sender from overwhelming the receiver using the window size field. Sequence numbers ensure data arrives in order and duplicates are detected.",
    visual: {
      type: "handshake",
      params: {
        leftLabel: "Sender",
        rightLabel: "Receiver",
        steps: ["Data (seq 1-3) →", "← ACK 4, Window=6", "Data (seq 4-9) →", "← ACK 10, Window=3 (slow down!)"]
      }
    },
    hack: {
      memory: "Window size = how many plates a waiter carries at once. If the kitchen (receiver) is overwhelmed, they say 'bring fewer plates' (shrink window). If going well, 'bring more' (grow window).",
      practice: "Understand the concept: window size = number of unacknowledged segments allowed in flight. Know that window size of 0 = 'stop sending!' Flashcard the concept.",
      effort: "medium",
      meta: "Conceptual understanding is enough — you won't calculate window sizes on the exam. Know that windowing = flow control and that it adjusts dynamically."
    }
  },

  "1.5.e": {
    info: "UDP (User Datagram Protocol) is connectionless — no handshake, no session setup. It provides best-effort delivery with no acknowledgments, no retransmission, and no ordering. This makes it fast and lightweight with minimal overhead. Ideal for real-time applications (voice, video, gaming) where retransmitting stale data is worse than dropping it. Applications using UDP handle error recovery themselves if needed.",
    visual: {
      type: "packet-flow",
      params: { nodes: ["Sender", "Fire and forget!", "Receiver (maybe)"], color: "#f59e0b" }
    },
    hack: {
      memory: "UDP = shouting into a crowd. You don't know who heard you, you don't repeat yourself, and you don't care about the order they heard it. Fast but unreliable.",
      practice: "Know the UDP header is only 8 bytes (source port, dest port, length, checksum) vs TCP's 20+ bytes. Flashcard: UDP = no handshake, no ACK, no ordering, low overhead.",
      effort: "low",
      meta: "If the exam asks 'which protocol has lower overhead?' — UDP. If it asks 'which is used for real-time voice/video?' — UDP."
    }
  },

  "1.5.f": {
    info: "Key TCP port numbers: FTP Data=20, FTP Control=21, SSH=22, Telnet=23, SMTP=25, HTTP=80, POP3=110, IMAP=143, HTTPS=443. These must be memorized cold — the exam tests port-to-protocol mapping directly. FTP uses two ports (20 for data transfer, 21 for control commands). SSH replaced Telnet because Telnet sends everything in plaintext.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Secure (Encrypted)", items: ["SSH — 22", "HTTPS — 443", "IMAP over TLS — 993"] },
        right: { label: "Insecure (Plaintext)", items: ["Telnet — 23", "HTTP — 80", "FTP — 20/21", "SMTP — 25"] }
      }
    },
    hack: {
      memory: "FTP: 20/21 (Twenty-Fun Transfer). SSH: 22 (Secure SHell, 2-2). Telnet: 23 (the insecure neighbor of 22). HTTP: 80 (the OG web). HTTPS: 443 (443cure). SMTP: 25 (Send Mail To People).",
      practice: "Make Anki flashcards for every port. Quiz yourself daily until you can recite all port numbers without hesitation. This is pure memorization — no shortcuts.",
      effort: "high",
      meta: "Port numbers appear in 5-10 questions. Use Anki spaced repetition. r/ccna universally recommends daily port drills for 2 weeks."
    }
  },

  "1.5.g": {
    info: "Key UDP port numbers: DNS=53, DHCP Server=67/Client=68, TFTP=69, NTP=123, SNMP=161 (queries)/162 (traps), Syslog=514. DNS uses UDP for standard queries (fast lookups) and TCP for zone transfers (reliable bulk data). DHCP uses two ports because the server listens on 67 and the client listens on 68.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Network Services", items: ["DNS — 53", "DHCP — 67/68", "NTP — 123"] },
        right: { label: "Management", items: ["TFTP — 69", "SNMP — 161/162", "Syslog — 514"] }
      }
    },
    hack: {
      memory: "DNS: 53 (five-three, DNS is alive). DHCP: 67/68 (server 67, client 68 — server is older/first). TFTP: 69 (Trivial = nice). NTP: 123 (easy as 1-2-3, time is simple). SNMP: 161/162 (161 ask, 162 alert). Syslog: 514 (logs, 5-1-4).",
      practice: "Same Anki approach as TCP ports. Group them: network services (DNS, DHCP, NTP) vs management (TFTP, SNMP, Syslog). Quiz daily.",
      effort: "high",
      meta: "Same strategy as TCP ports — Anki flashcards, daily repetition. Know that DHCP uses TWO ports and which is server vs client."
    }
  },

  "1.5.h": {
    info: "DNS (port 53) uses both TCP and UDP. Standard DNS queries use UDP for speed (most responses fit in a single packet under 512 bytes). DNS zone transfers (AXFR/IXFR) between servers use TCP for reliability (large data sets that must arrive completely). DNS also falls back to TCP if a UDP response is truncated (TC flag set).",
    visual: {
      type: "comparison",
      params: {
        left: { label: "DNS over UDP (53)", items: ["Standard queries", "Fast lookups", "< 512 bytes", "Client → Resolver"] },
        right: { label: "DNS over TCP (53)", items: ["Zone transfers (AXFR)", "Large responses", "Truncated UDP fallback", "Server → Server"] }
      }
    },
    hack: {
      memory: "DNS uses UDP for quick questions ('what's the IP for google.com?') and TCP for big jobs ('copy the entire zone database'). Quick question = UDP. Heavy lifting = TCP.",
      practice: "Know the specific trigger: when does DNS use TCP? Answer: zone transfers and truncated responses. Flashcard this exact scenario.",
      effort: "low",
      meta: "This is a tricky exam question. Many students forget DNS uses BOTH protocols. Know the 'when TCP?' trigger: zone transfers and truncation."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     1.6 — Configure and verify IPv4 addressing and subnetting
  ══════════════════════════════════════════════════════════════ */

  "1.6.a": {
    info: "An IPv4 address is 32 bits long, written as four octets in dotted-decimal notation (e.g., 192.168.1.10). Each octet is 8 bits (0-255). The address is divided into a network portion (identifies the subnet) and a host portion (identifies the device within the subnet). The subnet mask determines where the split occurs.",
    visual: {
      type: "binary-breakdown",
      params: {
        bits: "11000000.10101000.00000001.00001010",
        label: "192.168.1.10 — 32 bits, 4 octets",
        highlight: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
      }
    },
    hack: {
      memory: "IPv4 address = street address. Network portion = city name. Host portion = house number. Subnet mask = the dividing line between city and house.",
      practice: "Convert 5 random IP addresses to binary and back. Practice until you can convert any octet in under 10 seconds. Use the powers of 2: 128, 64, 32, 16, 8, 4, 2, 1.",
      effort: "high",
      meta: "Binary conversion is the foundation of all subnetting. Jeremy's IT Lab Day 11 is the gold standard. Practice every single day until the exam."
    }
  },

  "1.6.b": {
    info: "Classful addressing divides IPv4 into classes based on the first octet: Class A = 1-126 with /8 default mask (16M hosts), Class B = 128-191 with /16 default mask (65K hosts), Class C = 192-223 with /24 default mask (254 hosts). Class D (224-239) = multicast, Class E (240-255) = experimental. Note: 127.x.x.x is reserved for loopback, and 0.x.x.x is reserved. Modern networks use CIDR (classless), but classful rules still appear on the exam.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Class / Range / Mask", items: ["A: 1-126 → /8", "B: 128-191 → /16", "C: 192-223 → /24"] },
        right: { label: "Hosts / Use Case", items: ["A: 16,777,214 hosts (huge orgs)", "B: 65,534 hosts (med-large orgs)", "C: 254 hosts (small networks)"] }
      }
    },
    hack: {
      memory: "Class A starts at 1 (A=first), /8 (1 network octet). Class B starts at 128 (Binary: 10xxxxxx), /16 (2 network octets). Class C starts at 192 (Binary: 110xxxxx), /24 (3 network octets).",
      practice: "Given any IP, immediately identify the class and default mask. Drill 20 random IPs: 'What class? What default mask?' until instant.",
      effort: "medium",
      meta: "The exam still tests classful addressing despite CIDR being the standard. Memorize the first-octet ranges cold."
    }
  },

  "1.6.c": {
    info: "Subnet masks identify the network portion (1-bits) and host portion (0-bits) of an IP address. They can be written in dotted-decimal (255.255.255.0) or CIDR slash notation (/24). The /number indicates how many bits are 1s. Common masks: /24=255.255.255.0, /25=255.255.255.128, /26=255.255.255.192, /27=255.255.255.224, /28=255.255.255.240, /30=255.255.255.252.",
    visual: {
      type: "binary-breakdown",
      params: {
        bits: "11111111.11111111.11111111.00000000",
        label: "/24 = 255.255.255.0",
        highlight: [24, 25, 26, 27, 28, 29, 30, 31]
      }
    },
    hack: {
      memory: "The magic numbers for the last octet: 128, 192, 224, 240, 248, 252, 254, 255 → these correspond to /25 through /32. Each adds one more bit.",
      practice: "Build a subnet mask reference chart: /24=255.255.255.0, /25=.128, /26=.192, /27=.224, /28=.240, /29=.248, /30=.252, /31=.254, /32=.255. Memorize it.",
      effort: "high",
      meta: "You MUST be able to convert between CIDR and dotted-decimal instantly. This underlies every subnetting question. Drill the last-octet values daily."
    }
  },

  "1.6.d": {
    info: "Given an IP and subnet mask, you must calculate: Network address (all host bits = 0), Broadcast address (all host bits = 1), First usable host (network address + 1), Last usable host (broadcast address - 1). Example: 192.168.1.130/26 → Network: 192.168.1.128, Broadcast: 192.168.1.191, Hosts: .129-.190. The network and broadcast addresses are not assignable to hosts.",
    visual: {
      type: "binary-breakdown",
      params: {
        bits: "11000000.10101000.00000001.10|000000",
        label: "192.168.1.130/26 → Network .128, Broadcast .191",
        highlight: [26, 27, 28, 29, 30, 31]
      }
    },
    hack: {
      memory: "Block size = 256 minus the interesting octet's mask value. For /26: 256-192=64. Subnets start at 0, 64, 128, 192. IP .130 falls in the .128 block. Broadcast = next block - 1 = .191.",
      practice: "Solve 10 subnetting problems daily using the block-size method. Given random IP/mask combos, find network, broadcast, and valid range. Time yourself — target under 60 seconds per problem.",
      effort: "high",
      meta: "This is THE most tested subnetting skill. Subnetting.org and SubnettingPractice.com are the top community recommendations. Practice until it's muscle memory."
    }
  },

  "1.6.e": {
    info: "Number of subnets = 2^(borrowed bits). Borrowed bits are the bits beyond the classful default mask. Number of usable hosts per subnet = 2^(host bits) - 2 (subtract network and broadcast addresses). Example: /26 on a Class C = 2 borrowed bits = 4 subnets, 6 host bits = 62 usable hosts per subnet. These formulas are fundamental.",
    visual: {
      type: "binary-breakdown",
      params: {
        bits: "11111111.11111111.11111111.11|000000",
        label: "/26: 2 borrowed bits = 4 subnets, 6 host bits = 62 hosts",
        highlight: [24, 25]
      }
    },
    hack: {
      memory: "Subnets = 2^stolen. Hosts = 2^left - 2. 'Stolen from host, given to network.' The -2 is always for network address and broadcast address.",
      practice: "For each mask /25 through /30, calculate subnets and hosts per subnet without notes. Write a table: /25=2 subnets, 126 hosts; /26=4, 62; /27=8, 30; /28=16, 14; /29=32, 6; /30=64, 2.",
      effort: "high",
      meta: "Memorize the hosts-per-subnet column: 126, 62, 30, 14, 6, 2. These numbers appear constantly. Many students tape this chart next to their monitor during study."
    }
  },

  "1.6.f": {
    info: "VLSM (Variable Length Subnet Masking) allows using different subnet masks within the same network, optimizing IP address allocation. Instead of using /26 everywhere, you might use /24 for a large LAN, /28 for a small department, and /30 for point-to-point router links. VLSM prevents wasting addresses by sizing each subnet to its actual need. Always allocate the largest subnet first.",
    visual: {
      type: "hierarchy",
      params: {
        root: "10.0.0.0/16 (Main Network)",
        children: [
          { name: "10.0.1.0/24 — 200 hosts LAN" },
          { name: "10.0.2.0/26 — 50 hosts Dept" },
          { name: "10.0.2.64/28 — 10 hosts Lab" },
          { name: "10.0.2.80/30 — P2P Router Link" }
        ]
      }
    },
    hack: {
      memory: "VLSM = custom-size boxes for shipping. Big items get big boxes, small items get small boxes. Fixed-length subnetting = one-size-fits-all boxes (wasteful).",
      practice: "Practice VLSM problems: Given 'I need 100 hosts, 50 hosts, 20 hosts, and 2 P2P links from 172.16.0.0/24' — allocate subnets largest-first. Subnetting.org has VLSM practice.",
      effort: "high",
      meta: "VLSM is the hardest subnetting topic and appears on the exam. David Bombal's VLSM video is the most recommended resource. Always start with the largest subnet."
    }
  },

  "1.6.g": {
    info: "Binary-to-decimal: multiply each bit by its positional value (128, 64, 32, 16, 8, 4, 2, 1) and sum. 11001010 = 128+64+0+0+8+0+2+0 = 202. Decimal-to-binary: subtract the largest power of 2 that fits, mark a 1, repeat. 202: 202-128=74(1), 74-64=10(1), 10<32(0), 10<16(0), 10-8=2(1), 2<4(0), 2-2=0(1), 0(0) = 11001010. This skill is essential for subnetting.",
    visual: {
      type: "binary-breakdown",
      params: {
        bits: "11001010.00000000.00000000.00000000",
        label: "128+64+8+2 = 202 | Position values: 128,64,32,16,8,4,2,1",
        highlight: [0, 1, 4, 6]
      }
    },
    hack: {
      memory: "The magic 8: 128, 64, 32, 16, 8, 4, 2, 1. They always add up to 255. Learn them left to right, each is half the previous.",
      practice: "Convert 20 random numbers (0-255) to binary and 20 random 8-bit binaries to decimal daily for one week. Use the positional value chart. Time yourself — target under 15 seconds each.",
      effort: "high",
      meta: "This is THE prerequisite skill for subnetting. If you can't convert binary/decimal fast, every subnetting question will eat your exam time. Practice every day."
    }
  },

  "1.6.h": {
    info: "'show ip interface brief' displays a summary table of all interfaces: IP address, status (up/down), and protocol. 'show ip route' shows the routing table with all known networks, next hops, and how routes were learned (C=connected, S=static, O=OSPF, etc.). 'ping' tests Layer 3 reachability. Together, these three commands verify that IPv4 is configured correctly and traffic can flow.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "show ip interface brief", items: ["Interface list", "IP addresses assigned", "Status/protocol codes", "Quick health check"] },
        right: { label: "show ip route", items: ["Full routing table", "Connected (C) routes", "Static (S) routes", "Dynamic routes (O, D, R)"] }
      }
    },
    hack: {
      memory: "'show ip interface brief' = attendance sheet (who's here, what's their address). 'show ip route' = the GPS map (how to reach every destination). 'ping' = knocking on the door (are you there?).",
      practice: "Configure 3 routers with static routes in Packet Tracer. Use all three commands to verify: brief shows IPs are assigned, route shows paths exist, ping confirms end-to-end reachability.",
      effort: "medium",
      meta: "These three commands appear in nearly every exam scenario. Practice reading their output until you can extract information in seconds."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     1.7 — Describe private IPv4 addressing
  ══════════════════════════════════════════════════════════════ */

  "1.7.a": {
    info: "The Class A private range is 10.0.0.0/8 (10.0.0.0 – 10.255.255.255), providing over 16 million addresses. It's commonly used by large enterprises because a single /8 gives enough addresses for massive internal networks. The entire 10.x.x.x block is reserved and will never appear as a public IP on the internet.",
    visual: {
      type: "binary-breakdown",
      params: {
        bits: "00001010.xxxxxxxx.xxxxxxxx.xxxxxxxx",
        label: "10.0.0.0/8 — 16,777,214 hosts",
        highlight: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
      }
    },
    hack: {
      memory: "10 = TEN = The Enterprise Network. One /8 to rule them all. Biggest private range.",
      practice: "Memorize all three private ranges and their CIDR notations. Quick quiz: 'Is 10.50.200.1 private?' → Yes, it's in 10.0.0.0/8. Test yourself with 10 random IPs.",
      effort: "low",
      meta: "Guaranteed exam topic. Know all three ranges instantly. Many students use the mnemonic: '10, 172, 192 — private IP family of 3.'"
    }
  },

  "1.7.b": {
    info: "The Class B private range is 172.16.0.0/12 (172.16.0.0 – 172.31.255.255), providing about 1 million addresses. The /12 means the first 12 bits are the network portion, so the second octet ranges from 16 (00010000) to 31 (00011111). This is the range most often missed because students forget the upper bound is .31, not .255.",
    visual: {
      type: "binary-breakdown",
      params: {
        bits: "10101100.0001xxxx.xxxxxxxx.xxxxxxxx",
        label: "172.16.0.0/12 — Second octet: 16 to 31 only",
        highlight: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
      }
    },
    hack: {
      memory: "172.16 to 172.31 — '16 to 31, sweet 16 never turns 32.' The /12 is the tricky one. Write it on a sticky note.",
      practice: "Is 172.32.0.1 private? NO — it's above .31, so it's public. Is 172.20.5.1 private? YES. Drill edge cases around 172.16-172.31.",
      effort: "low",
      meta: "The 172.16.0.0/12 range is the most commonly incorrect answer on the exam. Students forget the .31 boundary. Drill the edge cases."
    }
  },

  "1.7.c": {
    info: "The Class C private range is 192.168.0.0/16 (192.168.0.0 – 192.168.255.255), providing about 65,000 addresses. This is the most familiar range — nearly every home router uses 192.168.0.x or 192.168.1.x by default. Despite being called 'Class C private,' the /16 provides a full Class B-sized block of addresses.",
    visual: {
      type: "binary-breakdown",
      params: {
        bits: "11000000.10101000.xxxxxxxx.xxxxxxxx",
        label: "192.168.0.0/16 — The home network range",
        highlight: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
      }
    },
    hack: {
      memory: "192.168 = your home router. Everyone knows this one. Just remember it's /16 (not /24) — the entire 192.168.x.x space is private.",
      practice: "Quick drill: '192.168.50.1 — private?' YES. '192.169.1.1 — private?' NO (169, not 168). Drill the boundary.",
      effort: "low",
      meta: "Easiest of the three ranges to remember since you use it daily. Just don't confuse 192.168 (private) with 192.169 (public)."
    }
  },

  "1.7.d": {
    info: "RFC 1918 defines the three private address ranges (10/8, 172.16/12, 192.168/16). Private addresses are not routable on the public internet — routers on the internet will drop packets with private source or destination IPs. To reach the internet, private addresses must be translated to a public IP via NAT (Network Address Translation). This is how millions of internal devices share a few public IPs.",
    visual: {
      type: "packet-flow",
      params: { nodes: ["Private IP (192.168.1.10)", "NAT Router", "Public Internet (203.0.113.5)"], color: "#10b981" }
    },
    hack: {
      memory: "Private IPs = fake IDs — they don't work outside the club (internet). NAT = the bouncer who swaps your fake ID for a real one at the door.",
      practice: "Know: private IPs need NAT to reach internet. In Packet Tracer, configure NAT on a router and watch the translation with 'show ip nat translations'.",
      effort: "medium",
      meta: "The concept 'private = needs NAT for internet' is a core exam theme. Know RFC 1918 by name and that all three ranges require NAT."
    }
  },

  "1.7.e": {
    info: "APIPA (Automatic Private IP Addressing) uses the range 169.254.0.0/16 (link-local addresses). When a device is configured for DHCP but fails to receive an offer, it self-assigns an address from this range. APIPA addresses allow local communication only — they are never routed. Seeing 169.254.x.x on a device means DHCP failed. Troubleshoot the DHCP server, relay, or network connectivity.",
    visual: {
      type: "packet-flow",
      params: { nodes: ["PC (DHCP Discover)", "No DHCP Server!", "Self-assigns 169.254.x.x"], color: "#ef4444" }
    },
    hack: {
      memory: "169.254 = the 'DHCP failed' alarm. If you see this range, your device is screaming 'I couldn't get a real IP!' — check your DHCP server.",
      practice: "In a lab, disconnect the DHCP server and watch a PC get a 169.254.x.x address. Then reconnect and run 'ipconfig /renew' to get a proper address.",
      effort: "low",
      meta: "Exam trap: 'A PC has a 169.254.x.x address. What is the problem?' → DHCP server unreachable. This is always the answer."
    }
  },

  "1.7.f": {
    info: "The loopback range is 127.0.0.0/8 (127.0.0.0 – 127.255.255.255), with 127.0.0.1 being the most common. Loopback addresses are used to test the local TCP/IP stack — pinging 127.0.0.1 confirms that the NIC driver and IP stack are working. Traffic sent to loopback never leaves the device. If ping 127.0.0.1 fails, the problem is the local TCP/IP configuration, not the network.",
    visual: { type: "packet-flow", params: { nodes: ["Device", "Loopback 127.0.0.1", "Device (self)"], color: "#8b5cf6" } },
    hack: {
      memory: "127.0.0.1 = looking in the mirror. You're talking to yourself. 'There's no place like 127.0.0.1' (there's no place like home).",
      practice: "Open a terminal and ping 127.0.0.1. It should always succeed. If it doesn't, your TCP/IP stack is broken. Know this diagnostic step.",
      effort: "low",
      meta: "Straightforward concept. Know that the ENTIRE 127.x.x.x range is loopback (not just 127.0.0.1), and it never generates network traffic."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     1.8 — Configure and verify IPv6 addressing and prefix
  ══════════════════════════════════════════════════════════════ */

  "1.8.a": {
    info: "IPv6 addresses are 128 bits long, written as eight groups of four hexadecimal digits separated by colons (e.g., 2001:0DB8:0000:0001:0000:0000:0000:0001). Each hex digit represents 4 bits. The address space is astronomically large — 340 undecillion addresses. IPv6 was created because IPv4's 4.3 billion addresses ran out due to internet growth.",
    visual: {
      type: "binary-breakdown",
      params: {
        bits: "2001:0DB8:0000:0001:0000:0000:0000:0001",
        label: "128 bits = 8 groups x 16 bits = 32 hex characters",
        highlight: [0, 1, 2, 3]
      }
    },
    hack: {
      memory: "IPv4 = phone numbers (10 digits, running out). IPv6 = GPS coordinates with unlimited precision (128 bits, never runs out). 8 groups of 4 hex = '8 quartets.'",
      practice: "Write out 5 full IPv6 addresses without shortening. Identify each group. Practice expanding shortened addresses back to their full form.",
      effort: "medium",
      meta: "IPv6 is about 10% of the exam. Know the format cold before diving into the shortening rules. Jeremy's IT Lab Day 31-33 covers IPv6."
    }
  },

  "1.8.b": {
    info: "Two shortening rules: (1) Drop leading zeros in any group: 0DB8 → DB8, 0001 → 1, 0000 → 0. (2) Replace ONE consecutive group of all-zero groups with :: (double colon). You can only use :: once per address to avoid ambiguity. Example: 2001:0DB8:0000:0000:0000:0000:0000:0001 → 2001:DB8::1. If there are two separate runs of zeros, use :: for the longest one.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Full Address", items: ["2001:0DB8:0000:0000:0000:0000:0000:0001", "FE80:0000:0000:0000:020C:29FF:FE12:3456"] },
        right: { label: "Shortened", items: ["2001:DB8::1", "FE80::20C:29FF:FE12:3456"] }
      }
    },
    hack: {
      memory: "Rule 1: Kill leading zeros (0DB8→DB8). Rule 2: One :: replaces the longest run of all-zero groups. ':: can only appear ONCE' — two colons, one time.",
      practice: "Take 10 full IPv6 addresses and shorten them. Then take 10 shortened addresses and expand them back. Both directions matter for the exam.",
      effort: "medium",
      meta: "The exam will give you shortened addresses and ask you to identify the full form, or vice versa. Practice both directions."
    }
  },

  "1.8.c": {
    info: "IPv6 prefix lengths work like CIDR notation in IPv4. /64 is standard for LANs (64-bit network prefix + 64-bit interface ID). /48 is a typical site allocation from an ISP (giving 65,536 /64 subnets). /128 is a host route (single address). /127 is recommended for point-to-point links (RFC 6164). Unlike IPv4, there's no subnetting math stress — most networks use /64.",
    visual: {
      type: "binary-breakdown",
      params: {
        bits: "Network Prefix (64 bits)       | Interface ID (64 bits)        ",
        label: "/64 — Standard LAN prefix: 64 bits network, 64 bits host",
        highlight: [0, 1, 2, 3, 4, 5, 6, 7]
      }
    },
    hack: {
      memory: "/64 = LAN default (remember: 64 is the magic number for IPv6 LANs). /48 = site prefix from ISP. /128 = single host. Think '64 on the floor, 48 at the door, 128 one host — no more.'",
      practice: "Memorize: /64 for LAN segments, /48 for site allocation, /128 for host routes, /127 for P2P. Flashcard these four prefix lengths.",
      effort: "low",
      meta: "Knowing /64 for LANs is essential. The exam won't ask you to subnet IPv6 the way it does IPv4 — just know the standard prefix lengths."
    }
  },

  "1.8.d": {
    info: "SLAAC (Stateless Address Autoconfiguration) lets hosts generate their own IPv6 address without a DHCP server. The router sends a Router Advertisement (RA) containing the /64 prefix. The host combines this prefix with a 64-bit interface ID generated via EUI-64 (from MAC address) or a random privacy extension (RFC 7217). SLAAC is the default IPv6 address assignment method.",
    visual: {
      type: "handshake",
      params: {
        leftLabel: "Host",
        rightLabel: "Router",
        steps: ["Router Solicitation (RS) →", "← Router Advertisement (RA: prefix=2001:DB8:1::/64)", "Self-generates: 2001:DB8:1::EUI-64", "--- Address Configured ---"]
      }
    },
    hack: {
      memory: "SLAAC = self-service. The router provides the street name (prefix), and the host picks its own house number (interface ID). No DHCP needed.",
      practice: "In Packet Tracer, configure a router with 'ipv6 unicast-routing' and a /64 address. Connect a PC set to auto-config. Check the PC's auto-generated IPv6 address — it should use the router's prefix.",
      effort: "medium",
      meta: "Know SLAAC vs Stateless DHCPv6 vs Stateful DHCPv6. The exam tests when each is used. SLAAC = address from RA, no DHCP for addressing."
    }
  },

  "1.8.e": {
    info: "Stateless DHCPv6 uses SLAAC for the address (prefix from RA + self-generated interface ID) but also queries a DHCPv6 server for additional information like DNS server addresses and domain names. The RA has the O-flag (Other Configuration) set to 1, telling hosts: 'Use SLAAC for your address but contact DHCPv6 for other info.' The DHCPv6 server does NOT track which addresses are assigned.",
    visual: {
      type: "handshake",
      params: {
        leftLabel: "Host",
        rightLabel: "Router + DHCPv6",
        steps: ["RS →", "← RA (prefix + O-flag=1)", "Self-assigns address via SLAAC", "DHCPv6 query → DNS/domain info ←"]
      }
    },
    hack: {
      memory: "Stateless DHCPv6 = SLAAC does the heavy lifting (address). DHCPv6 just provides the extras (DNS, domain). O-flag = 'Other info available.'",
      practice: "Know the RA flags: O-flag=1 → stateless DHCPv6 (other info). M-flag=1 → stateful DHCPv6 (managed addresses). Flashcard the flag meanings.",
      effort: "medium",
      meta: "The O-flag vs M-flag distinction is a common exam question. O = other config (DNS only). M = managed (full addressing)."
    }
  },

  "1.8.f": {
    info: "Stateful DHCPv6 provides full address assignment from a DHCPv6 server — the server assigns the IPv6 address, tracks it, and provides DNS/domain info. The RA has the M-flag (Managed Address Configuration) set to 1, telling hosts: 'Get your entire address from DHCPv6.' This is similar to DHCPv4. The DHCPv6 server maintains a state table of all assigned addresses and their leases.",
    visual: {
      type: "handshake",
      params: {
        leftLabel: "Host",
        rightLabel: "DHCPv6 Server",
        steps: ["Solicit →", "← Advertise", "Request →", "← Reply (address + DNS + domain)"]
      }
    },
    hack: {
      memory: "Stateful DHCPv6 = full DHCP control, just like DHCPv4. The server tracks everything. M-flag = 'Managed = full management.'",
      practice: "Compare all three: SLAAC (no DHCP), Stateless DHCPv6 (SLAAC + DHCP for DNS), Stateful DHCPv6 (DHCP for everything). Make a 3-column comparison table.",
      effort: "medium",
      meta: "The three-way comparison (SLAAC vs Stateless vs Stateful) is a guaranteed topic. Jeremy's IT Lab Day 33 covers this comparison clearly."
    }
  },

  "1.8.g": {
    info: "NDP (Neighbor Discovery Protocol) replaces ARP in IPv6 and uses ICMPv6 messages: RS (Router Solicitation) — host asks for routers. RA (Router Advertisement) — router announces prefix and flags. NS (Neighbor Solicitation) — resolve IPv6 to MAC (replaces ARP request). NA (Neighbor Advertisement) — reply with MAC address (replaces ARP reply). NDP also handles DAD (Duplicate Address Detection) using NS/NA.",
    visual: {
      type: "handshake",
      params: {
        leftLabel: "Host A",
        rightLabel: "Host B",
        steps: ["NS: Who has 2001:DB8::2? →", "← NA: I do! MAC=00:1A:2B:3C:4D:5E", "--- Neighbor cache updated ---"]
      }
    },
    hack: {
      memory: "NDP = ARP's replacement for IPv6. RS/RA = router discovery (finding the gateway). NS/NA = neighbor discovery (finding MAC addresses). Remember: R for Router, N for Neighbor.",
      practice: "Flashcard the four NDP message types: RS, RA, NS, NA. Know which replaces what: NS/NA replace ARP. RS/RA are new (IPv4 uses DHCP for gateway discovery).",
      effort: "medium",
      meta: "NDP message types are heavily tested. Know all four by name and function. 'What replaces ARP in IPv6?' → NDP (specifically NS/NA)."
    }
  },

  "1.8.h": {
    info: "To configure IPv6 on a Cisco router: 'ipv6 unicast-routing' enables IPv6 routing globally. 'ipv6 address [address/prefix]' assigns an address to an interface. 'ipv6 enable' enables IPv6 on an interface without assigning a global address (generates link-local only). Link-local addresses (FE80::) are auto-generated on any IPv6-enabled interface. Don't forget 'no shutdown' on the interface.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Global Config", items: ["ipv6 unicast-routing"] },
        right: { label: "Interface Config", items: ["ipv6 address 2001:DB8:1::1/64", "ipv6 enable", "no shutdown"] }
      }
    },
    hack: {
      memory: "'ipv6 unicast-routing' = the master switch for IPv6 routing. Without it, the router processes IPv6 but doesn't route it. Think of it as turning on the engine before driving.",
      practice: "In Packet Tracer, configure IPv6 on two routers with a link between them. Assign addresses, enable routing, and ping. Verify with 'show ipv6 interface brief' and 'show ipv6 route'.",
      effort: "medium",
      meta: "The command 'ipv6 unicast-routing' is the most forgotten step. If IPv6 isn't working, check this first. The exam tests this exact scenario."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     1.9 — Describe IPv6 address types
  ══════════════════════════════════════════════════════════════ */

  "1.9.a": {
    info: "IPv6 unicast addresses include: Global Unicast (2000::/3, range 2000-3FFF) — routable on the public internet, equivalent to IPv4 public addresses. Unique Local (FC00::/7, typically FD00::/8 in practice) — private addresses, equivalent to RFC 1918. Link-Local (FE80::/10) — auto-generated, used for communication on the local link only (NDP, routing protocol hello packets), never routed.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Address Type", items: ["Global Unicast (GUA)", "Unique Local (ULA)", "Link-Local (LLA)"] },
        right: { label: "Prefix / Scope", items: ["2000::/3 — Internet-routable", "FC00::/7 (FD00::/8) — Private/internal", "FE80::/10 — Local link only"] }
      }
    },
    hack: {
      memory: "GUA starts with 2 or 3 = 'Global, 2-3 is free to roam.' ULA starts with FD = 'For Domestic use only.' LLA starts with FE80 = 'For Each link, 80 percent of config is automatic.'",
      practice: "Given an IPv6 address, immediately identify the type by its first characters: 2xxx/3xxx = GUA, FDxx = ULA, FE80 = LLA. Drill 20 random addresses.",
      effort: "medium",
      meta: "Type identification by prefix is guaranteed on the exam. Know: 2/3 = global, FD = unique local, FE80 = link-local. Instant recognition is the goal."
    }
  },

  "1.9.b": {
    info: "Anycast addresses are syntactically identical to unicast addresses — the same global or unique-local address is configured on multiple devices. The routing infrastructure delivers traffic to the nearest device with that address. Used for load balancing and redundancy (e.g., DNS root servers). On Cisco, you configure it with 'ipv6 address [address/prefix] anycast'. There's no special prefix for anycast.",
    visual: { type: "packet-flow", params: { nodes: ["Client", "Routed to nearest", "Server A or Server B (same IP)"], color: "#f59e0b" } },
    hack: {
      memory: "Anycast = 'any of us can answer.' Like calling a pizza chain — you get routed to the nearest location, even though they all share the same phone number.",
      practice: "Know: anycast looks like unicast, but the same address is on multiple devices. The network routes to the closest one. Flashcard only — no lab needed.",
      effort: "low",
      meta: "Simple concept question. Just know: anycast = same address, multiple devices, routed to nearest. No special prefix — it's a routing behavior, not an address format."
    }
  },

  "1.9.c": {
    info: "IPv6 multicast addresses start with FF00::/8 and replace IPv4 broadcast (which doesn't exist in IPv6). Key multicast addresses: FF02::1 = all nodes on link (like broadcast), FF02::2 = all routers on link, FF02::5 = all OSPF routers, FF02::A = all EIGRP routers. The second hex digit indicates scope: 2=link-local, 5=site-local, 8=organization, E=global.",
    visual: {
      type: "shield",
      params: {
        items: ["FF02::1 — All nodes", "FF02::2 — All routers", "FF02::5 — OSPF routers", "FF02::A — EIGRP routers"],
        color: "#8b5cf6"
      }
    },
    hack: {
      memory: "FF = 'Friends Forever' multicast. FF02::1 = 'everyone on the link.' FF02::2 = 'routers only.' No broadcast in IPv6 — multicast handles it. Remember: FF02::1 replaced broadcast.",
      practice: "Memorize the four key multicast addresses: ::1 (all nodes), ::2 (all routers), ::5 (OSPF), ::A (EIGRP). Flashcard them.",
      effort: "low",
      meta: "Know FF02::1 and FF02::2 cold. The exam asks 'what replaces broadcast in IPv6?' → multicast (specifically FF02::1)."
    }
  },

  "1.9.d": {
    info: "Modified EUI-64 generates a 64-bit interface ID from a 48-bit MAC address. Process: (1) Split the MAC in half (e.g., AA:BB:CC → AA:BB:CC | DD:EE:FF). (2) Insert FF:FE in the middle → AA:BB:CC:FF:FE:DD:EE:FF. (3) Flip the 7th bit (Universal/Local bit) of the first byte. If the 7th bit was 0, it becomes 1 (and vice versa). This creates a unique interface ID from the device's MAC.",
    visual: {
      type: "encapsulation",
      params: {
        layers: [
          { label: "MAC: AA:BB:CC:DD:EE:FF", color: "#3b82f6" },
          { label: "Insert FFFE: AA:BB:CC:FF:FE:DD:EE:FF", color: "#8b5cf6" },
          { label: "Flip 7th bit: A8:BB:CC:FF:FE:DD:EE:FF", color: "#10b981" }
        ]
      }
    },
    hack: {
      memory: "EUI-64 recipe: Split MAC → stuff FFFE in the middle → flip the 7th bit. Mnemonic: 'Split, Stuff, Flip' (SSF). FFFE = 'For Full Ethernet Extension.'",
      practice: "Take 5 random MAC addresses and manually perform EUI-64 conversion. Practice the 7th-bit flip — the 7th bit is the second-least-significant bit of the first hex digit.",
      effort: "high",
      meta: "EUI-64 conversion appears on the exam. Practice the three steps manually. The 7th-bit flip confuses many students — practice until it's automatic."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     1.10 — Verify IP parameters for Client OS
  ══════════════════════════════════════════════════════════════ */

  "1.10.a": {
    info: "Windows IP verification commands: 'ipconfig' shows IP address, subnet mask, and default gateway for all adapters. 'ipconfig /all' adds DNS servers, MAC address, DHCP lease info, and DHCP server address. 'ipconfig /release' drops the current DHCP lease. 'ipconfig /renew' requests a new DHCP lease. These are the primary Windows network troubleshooting commands.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Quick Check", items: ["ipconfig — IP, mask, gateway", "ipconfig /all — full details + DNS + DHCP"] },
        right: { label: "DHCP Actions", items: ["ipconfig /release — drop lease", "ipconfig /renew — get new lease"] }
      }
    },
    hack: {
      memory: "ipconfig = 'I Please Check Our Network Foundation Instantly, Go!' The /all adds everything you'd want. /release = let go, /renew = get fresh.",
      practice: "Open CMD on your Windows PC and run all four commands. Note the output differences between 'ipconfig' and 'ipconfig /all'. Release and renew your DHCP lease.",
      effort: "low",
      meta: "These are basic but tested. Know that 'ipconfig /all' shows the DHCP server and DNS server — the exam asks where to find this info."
    }
  },

  "1.10.b": {
    info: "Linux IP verification commands: 'ip addr' (or 'ip a') shows IP addresses on all interfaces. 'ip route' shows the routing table including default gateway. 'ifconfig' is legacy but still appears on some exams. 'ss' shows socket statistics (replaced netstat). 'nmcli' controls NetworkManager for Wi-Fi and connections. Modern Linux prefers the 'ip' command suite over 'ifconfig'.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Modern (ip suite)", items: ["ip addr — show IPs", "ip route — show routes/gateway", "ss — socket stats"] },
        right: { label: "Legacy", items: ["ifconfig — show IPs (deprecated)", "netstat — connections (deprecated)", "route — routing table (deprecated)"] }
      }
    },
    hack: {
      memory: "'ip addr' replaced 'ifconfig' — think 'ip is the new if.' Linux = ip commands. Windows = ipconfig commands. Don't mix them up.",
      practice: "On a Linux machine (or VM), run 'ip addr', 'ip route', and 'ss -tuln'. Compare output to Windows 'ipconfig /all'. Know which shows what.",
      effort: "low",
      meta: "The exam may show you command output and ask which OS it came from. 'ip addr' = Linux. 'ipconfig' = Windows. Know the mapping."
    }
  },

  "1.10.c": {
    info: "macOS IP verification commands: 'ifconfig' shows IP addresses and interface details (macOS kept ifconfig, unlike Linux which deprecated it). 'networksetup -getinfo [interface]' shows IP, subnet, router, and DNS for a specific interface (e.g., Wi-Fi, Ethernet). macOS is Unix-based, so many Linux commands also work (ping, traceroute, dig).",
    visual: {
      type: "comparison",
      params: {
        left: { label: "macOS Commands", items: ["ifconfig — all interfaces", "networksetup -getinfo Wi-Fi", "networksetup -listallnetworkservices"] },
        right: { label: "Also Works (Unix)", items: ["ping", "traceroute", "dig / nslookup"] }
      }
    },
    hack: {
      memory: "macOS = ifconfig still works (unlike modern Linux). 'networksetup' is the macOS-specific tool. Think: 'Mac setup = networksetup.'",
      practice: "Run 'ifconfig' and 'networksetup -getinfo Wi-Fi' on your Mac. Note the gateway, DNS, and IP information. Quick familiarity — no deep drilling needed.",
      effort: "low",
      meta: "macOS commands are lightly tested. Know 'ifconfig' works on macOS and 'networksetup' is the Apple-specific tool. One or two flashcards."
    }
  },

  "1.10.d": {
    info: "Regardless of OS, you need to verify four key parameters: IP address (correct subnet?), Subnet mask (matches the network design?), Default gateway (reachable? correct IP?), and DNS server (resolving names?). Also check DHCP lease info — if the IP is 169.254.x.x, DHCP failed. If the gateway is missing or wrong, you can't reach other networks.",
    visual: {
      type: "shield",
      params: {
        items: ["IP Address — correct subnet?", "Subnet Mask — right size?", "Default Gateway — reachable?", "DNS Server — resolving names?"],
        color: "#3b82f6"
      }
    },
    hack: {
      memory: "The four vital signs of IP health: Address, Mask, Gateway, DNS. 'A Man Gets Directions' — Address, Mask, Gateway, DNS.",
      practice: "On any device, check all four parameters. If any is wrong or missing, identify which symptom it would cause: no IP = nothing works, wrong mask = wrong subnet, no gateway = can't leave network, no DNS = names don't resolve.",
      effort: "low",
      meta: "The exam gives scenarios: 'PC can ping the gateway but not reach google.com' — DNS issue. 'PC can't ping anything' — check IP/mask/gateway. Map symptoms to parameters."
    }
  },

  "1.10.e": {
    info: "Troubleshooting commands: 'ping' tests Layer 3 reachability (ICMP echo). 'traceroute' (Linux/Mac) or 'tracert' (Windows) shows the path packets take, hop by hop — identifies where traffic stops. 'nslookup' and 'dig' test DNS resolution — if ping by IP works but ping by name fails, it's a DNS problem. Always troubleshoot bottom-up: physical → IP → gateway → DNS → application.",
    visual: {
      type: "packet-flow",
      params: { nodes: ["ping 8.8.8.8", "traceroute (hop 1, 2, 3...)", "nslookup google.com"], color: "#10b981" }
    },
    hack: {
      memory: "Troubleshooting ladder: (1) ping 127.0.0.1 (local stack), (2) ping gateway (local network), (3) ping remote IP (routing), (4) ping by name (DNS). If step 3 works but 4 fails = DNS problem.",
      practice: "Run the full troubleshooting ladder from your PC. Verify each step succeeds. Then break something (change DNS to a bad address) and observe the failure point.",
      effort: "medium",
      meta: "The bottom-up troubleshooting approach (ping self → gateway → remote → name) is the standard methodology. Practice it until it's your instinct."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     1.11 — Describe wireless principles
  ══════════════════════════════════════════════════════════════ */

  "1.11.a": {
    info: "Wi-Fi channels that don't overlap avoid interference. In 2.4 GHz (channels 1-11 in the US), only channels 1, 6, and 11 are non-overlapping because each channel is 22 MHz wide with only 5 MHz spacing. In 5 GHz, there are 24+ non-overlapping channels because channels are spaced further apart. When deploying multiple APs, use non-overlapping channels on adjacent APs to prevent co-channel interference.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "2.4 GHz", items: ["Only 3 non-overlapping: 1, 6, 11", "22 MHz wide channels", "More interference", "Better range/penetration"] },
        right: { label: "5 GHz", items: ["24+ non-overlapping channels", "20/40/80/160 MHz wide", "Less interference", "Shorter range"] }
      }
    },
    hack: {
      memory: "2.4 GHz = only 1, 6, 11 (remember: 'One-Six-Eleven, Wi-Fi heaven'). 5 GHz = tons of channels, less crowding. 2.4 = far but few, 5 = close but many.",
      practice: "Memorize 1, 6, 11 for 2.4 GHz. Know that 5 GHz has many more non-overlapping channels. Draw a simple AP layout and assign channels 1, 6, 11 to adjacent APs.",
      effort: "low",
      meta: "Channels 1, 6, 11 is one of the most tested wireless facts. If the exam asks about 2.4 GHz channel planning, it's always 1, 6, 11."
    }
  },

  "1.11.b": {
    info: "SSID (Service Set Identifier) is the human-readable name of a wireless network, broadcast by the AP in beacon frames. Clients see the SSID when scanning for networks. An AP can broadcast multiple SSIDs (one per WLAN/VLAN). SSIDs can be hidden (no beacon broadcast), but this is not a security measure — the SSID is still visible in probe responses and association frames.",
    visual: { type: "packet-flow", params: { nodes: ["AP (Beacon: SSID='Office-WiFi')", "RF Signal", "Client (Sees 'Office-WiFi')"], color: "#8b5cf6" } },
    hack: {
      memory: "SSID = the name tag on the Wi-Fi network. Like a restaurant sign — visible to anyone walking by. Hiding the SSID = removing the sign, but people can still find the restaurant.",
      practice: "Know: SSID is broadcast in beacons, one AP can have multiple SSIDs, hiding SSID is not real security. Quick flashcard.",
      effort: "low",
      meta: "Simple concept. The exam may ask about hidden SSIDs — know that hiding is NOT a security measure because SSIDs leak in other frame types."
    }
  },

  "1.11.c": {
    info: "RF (Radio Frequency) fundamentals for CCNA: frequency bands (2.4 GHz and 5 GHz), interference from other devices (microwaves, Bluetooth on 2.4 GHz), signal strength measured in dBm (higher = stronger, -30 dBm is excellent, -80 dBm is weak), and SNR (Signal-to-Noise Ratio — higher is better, minimum ~20 dB for reliable connectivity). Signal degrades with distance, walls, and obstacles (absorption/reflection).",
    visual: {
      type: "gauge",
      params: { level: 70, label: "Signal Strength: -40 dBm (Good)", color: "#10b981" }
    },
    hack: {
      memory: "dBm = how loud the Wi-Fi signal is. -30 = shouting (excellent). -80 = whispering (terrible). SNR = how much louder the signal is than the noise. Think: 'Less negative dBm = better.'",
      practice: "Know the dBm scale: -30 to -50 = excellent, -50 to -70 = good, -70 to -80 = weak, -80+ = unusable. Know that 2.4 GHz penetrates walls better but has more interference.",
      effort: "low",
      meta: "Conceptual only — no RF calculations on CCNA. Know that 2.4 GHz = longer range + more interference, 5 GHz = shorter range + less interference."
    }
  },

  "1.11.d": {
    info: "Wireless encryption evolution: WEP (Wired Equivalent Privacy, broken — uses RC4, easily cracked in minutes). WPA (Wi-Fi Protected Access, TKIP — a temporary fix for WEP, still insecure). WPA2 (AES-CCMP, current standard — strong encryption, used everywhere). WPA3 (SAE — Simultaneous Authentication of Equals, replaces PSK, offers forward secrecy and protection against offline dictionary attacks).",
    visual: {
      type: "state-machine",
      params: {
        states: ["WEP (broken/RC4)", "WPA (TKIP/temp fix)", "WPA2 (AES/current)", "WPA3 (SAE/newest)"],
        active: 2,
        transitions: true
      }
    },
    hack: {
      memory: "WEP = 'Weak Encryption Protocol' (broken). WPA = 'Wi-Fi Patched Again' (temp fix). WPA2 = AES = actual security. WPA3 = SAE = the future. Mnemonic: 'Weak, Patched, Actual, Safe.'",
      practice: "Flashcard the encryption types: WEP=RC4(broken), WPA=TKIP(weak), WPA2=AES-CCMP(standard), WPA3=SAE(newest). Know that WPA2 with AES is the current recommended standard.",
      effort: "low",
      meta: "Know WPA2+AES as the current standard and WPA3+SAE as the newest. The exam asks about the evolution and which to recommend. Never recommend WEP or WPA."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     1.12 — Explain virtualization fundamentals
  ══════════════════════════════════════════════════════════════ */

  "1.12.a": {
    info: "Type 1 (bare-metal) hypervisors run directly on hardware with no underlying OS. They provide better performance, lower overhead, and are used in production data centers. Examples: VMware ESXi, Microsoft Hyper-V (when installed as server role), KVM (Linux kernel-based). The hypervisor IS the OS — it manages hardware resources and allocates them to VMs.",
    visual: {
      type: "layer-stack",
      params: {
        layers: ["VM 1 | VM 2 | VM 3", "Type 1 Hypervisor (ESXi/KVM)", "Physical Hardware (CPU, RAM, NIC)"],
        highlight: 1
      }
    },
    hack: {
      memory: "Type 1 = First on the hardware (bare metal, nothing between it and the iron). Type 1 = production. Think: '#1 for the enterprise.'",
      practice: "Memorize examples: Type 1 = ESXi, Hyper-V, KVM. Know that Type 1 is used in data centers for production workloads. Flashcard only.",
      effort: "low",
      meta: "Know Type 1 vs Type 2 and 2-3 examples of each. The exam tests conceptual understanding, not hypervisor configuration."
    }
  },

  "1.12.b": {
    info: "Type 2 (hosted) hypervisors run on top of an existing operating system as an application. The host OS manages hardware; the hypervisor runs inside it. Higher overhead and lower performance than Type 1, but easier to set up. Used for development, testing, and learning — not for production. Examples: Oracle VirtualBox, VMware Workstation/Fusion, Parallels.",
    visual: {
      type: "layer-stack",
      params: {
        layers: ["VM 1 | VM 2", "Type 2 Hypervisor (VirtualBox/VMware)", "Host OS (Windows/macOS/Linux)", "Physical Hardware"],
        highlight: 1
      }
    },
    hack: {
      memory: "Type 2 = Second-class citizen — runs ON TOP of another OS (two layers deep). Used for testing/learning, not production. Think: '#2 for your desktop.'",
      practice: "Know: Type 2 sits on a host OS. Examples = VirtualBox, VMware Workstation. Used for labs and dev, not data center production.",
      effort: "low",
      meta: "Simple distinction. Type 1 = bare metal (production). Type 2 = on an OS (testing/dev). Know the examples."
    }
  },

  "1.12.c": {
    info: "Virtual machines are full OS instances running on a hypervisor, each with its own kernel, drivers, libraries, and applications. Each VM is completely isolated from other VMs — hardware-level isolation. VMs are heavier (GB-sized), slower to boot, but offer stronger security boundaries. They abstract physical hardware into virtual hardware (vCPU, vRAM, vNIC). Live migration moves running VMs between physical hosts.",
    visual: {
      type: "layer-stack",
      params: {
        layers: ["App | App | App", "Guest OS | Guest OS | Guest OS", "Hypervisor", "Physical Hardware"],
        highlight: 1
      }
    },
    hack: {
      memory: "VM = a full computer inside a computer. Each VM has its own OS, like separate apartments in a building — soundproofed and isolated from each other.",
      practice: "Compare VMs to containers in a table: VMs = full OS, heavy, strong isolation, GB-sized. Containers = shared kernel, light, fast, MB-sized. Flashcard the comparison.",
      effort: "low",
      meta: "VM vs container is a guaranteed comparison question. Know: VM = full OS per instance, container = shared kernel. VMs are heavier but more isolated."
    }
  },

  "1.12.d": {
    info: "Containers share the host OS kernel and package only the application and its dependencies — no full OS per container. This makes them lightweight (MB-sized), fast to start (seconds vs minutes for VMs), and highly portable. Docker is the dominant container platform. Containers provide process-level isolation (weaker than VM hardware-level isolation) but use far fewer resources. Ideal for microservices.",
    visual: {
      type: "layer-stack",
      params: {
        layers: ["App A | App B | App C", "Container Runtime (Docker)", "Host OS Kernel (shared)", "Physical Hardware"],
        highlight: 1
      }
    },
    hack: {
      memory: "Containers = studio apartments sharing the same building infrastructure (kernel). VMs = separate houses (full OS each). Containers are lighter because they share the foundation.",
      practice: "Know: Docker is the key container technology. Containers share the kernel, boot in seconds, use MBs. VMs have their own OS, boot in minutes, use GBs. Memorize these contrasts.",
      effort: "low",
      meta: "Containers vs VMs is a common question. Focus on the trade-offs: containers = fast, light, less isolated. VMs = heavy, slow, more isolated."
    }
  },

  "1.12.e": {
    info: "VRF (Virtual Routing and Forwarding) creates multiple independent routing tables on a single physical router. Each VRF instance has its own routing table, interfaces, and forwarding plane — logically separate from other VRFs. Traffic in one VRF cannot reach another VRF without explicit route leaking or a shared service. Used for multi-tenancy, traffic segmentation, and keeping management traffic separate from user traffic.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "VRF-A (Customer 1)", items: ["Routing table A", "Interfaces: Gi0/0, Gi0/1", "10.1.0.0/24 network"] },
        right: { label: "VRF-B (Customer 2)", items: ["Routing table B", "Interfaces: Gi0/2, Gi0/3", "10.1.0.0/24 network (same IP, no conflict!)"] }
      }
    },
    hack: {
      memory: "VRF = virtual router inside a real router. Like having two separate phone books in one phone — Customer A's contacts never see Customer B's contacts, even if they have the same names.",
      practice: "Know: VRF allows overlapping IP addresses on the same router because each VRF has its own routing table. This is the key exam concept.",
      effort: "medium",
      meta: "VRF questions focus on the concept of separate routing tables and overlapping address spaces. You won't configure VRF on the CCNA, but know what it does."
    }
  },

  "1.12.f": {
    info: "VRF-Lite is VRF without MPLS — it's a simpler implementation used to segment traffic on a single router or between directly connected devices without the full MPLS label-switching infrastructure. VRF-Lite uses standard IP routing within each VRF instance. It's commonly used in campus networks to separate guest traffic, management traffic, and production traffic without needing separate physical routers.",
    visual: {
      type: "hierarchy",
      params: {
        root: "Physical Router",
        children: [
          { name: "VRF-Lite: Management", children: [{ name: "Mgmt VLAN" }] },
          { name: "VRF-Lite: Production", children: [{ name: "Prod VLAN" }] },
          { name: "VRF-Lite: Guest", children: [{ name: "Guest VLAN" }] }
        ]
      }
    },
    hack: {
      memory: "VRF-Lite = VRF without the MPLS tax. Same traffic isolation, simpler setup. 'Lite' = no MPLS. Full VRF = MPLS required.",
      practice: "Know the difference: VRF-Lite = no MPLS, local traffic segmentation. Full VRF = MPLS, provider-scale. Flashcard: 'VRF-Lite = VRF minus MPLS.'",
      effort: "low",
      meta: "The exam just wants you to know VRF-Lite exists and that it doesn't require MPLS. One flashcard is enough."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     1.13 — Describe switching concepts
  ══════════════════════════════════════════════════════════════ */

  "1.13.a": {
    info: "When a frame arrives at a switch, the switch examines the source MAC address and records it in the MAC address table along with the ingress port number. This is MAC learning. If the source MAC already exists in the table, the switch refreshes the aging timer. If it's on a different port, the switch updates the entry (indicating the device moved). This process is automatic and fundamental to switch operation.",
    visual: {
      type: "handshake",
      params: {
        leftLabel: "PC (MAC: AAAA)",
        rightLabel: "Switch",
        steps: ["Frame arrives on port Gi0/1 →", "← Learns: AAAA = Gi0/1", "Frame from BBBB on Gi0/2 →", "← Learns: BBBB = Gi0/2"]
      }
    },
    hack: {
      memory: "MAC learning = the switch is a bouncer building a guest list. Every time someone walks in a door (port), the bouncer writes down their name (MAC) and which door they used.",
      practice: "In Packet Tracer, connect 3 PCs to a switch. Have each PC ping another. Then run 'show mac address-table' on the switch to see all learned MAC-to-port mappings.",
      effort: "medium",
      meta: "Understand the process: source MAC is always learned, destination MAC is used for forwarding decisions. This distinction is critical."
    }
  },

  "1.13.b": {
    info: "When a frame arrives and the switch knows the destination MAC address (it's in the MAC address table), the switch forwards the frame only out the specific port associated with that MAC — this is known unicast forwarding or frame switching. This is efficient because the frame doesn't flood to all ports. The switch acts as a fast, intelligent bridge.",
    visual: { type: "packet-flow", params: { nodes: ["PC-A (Gi0/1)", "Switch (MAC table lookup)", "PC-B (Gi0/3 only)"], color: "#3b82f6" } },
    hack: {
      memory: "Known unicast = direct delivery. Like a letter carrier who knows exactly which house to deliver to — goes straight there, doesn't leave a copy at every house.",
      practice: "After MAC learning lab, verify frame switching by pinging between two PCs and checking that only the destination port shows traffic (use a second ping to a third PC to confirm isolation).",
      effort: "low",
      meta: "Know the three switching actions: forward (known unicast), flood (unknown unicast/broadcast/multicast), filter (same port as source). The exam tests all three."
    }
  },

  "1.13.c": {
    info: "When a frame's destination MAC is NOT in the MAC address table (unknown unicast), or the frame is a broadcast (FFFF.FFFF.FFFF) or multicast, the switch floods it out ALL ports except the ingress port. This ensures the frame reaches its destination even if the switch doesn't know where that device is. Excessive flooding wastes bandwidth and is why proper network design limits broadcast domains.",
    visual: { type: "packet-flow", params: { nodes: ["PC-A (Gi0/1)", "Switch (FLOOD!)", "Gi0/2 + Gi0/3 + Gi0/4 (all ports)"], color: "#ef4444" } },
    hack: {
      memory: "Flooding = yelling in a room. If the switch doesn't know where someone is, it shouts to everyone. Broadcast = always yelling. Unknown unicast = yelling because you don't know where they sit.",
      practice: "Know the three flood triggers: unknown unicast, broadcast, multicast. In Packet Tracer, clear the MAC table ('clear mac address-table dynamic') and ping — watch the switch flood.",
      effort: "low",
      meta: "The distinction between flooding and forwarding is a core switching concept tested heavily. Know when each happens."
    }
  },

  "1.13.d": {
    info: "The MAC address table (also called CAM table) maps MAC addresses to switch ports. Entries are learned dynamically and have an aging timer — default 300 seconds (5 minutes) on Cisco switches. If no frames from a MAC are received within the aging window, the entry is removed to keep the table clean. Static MAC entries can be configured manually and never age out.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "MAC Address Table", items: ["MAC: AAAA.BBBB.CCCC → Gi0/1", "MAC: DDDD.EEEE.FFFF → Gi0/2", "Aging Timer: 300s (default)", "Type: Dynamic or Static"] },
        right: { label: "Verify Commands", items: ["show mac address-table", "show mac address-table dynamic", "show mac address-table aging-time", "clear mac address-table dynamic"] }
      }
    },
    hack: {
      memory: "MAC table aging = 300 seconds = 5 minutes. 'Five minutes of silence and you're off the guest list.' If a device keeps talking, the timer refreshes.",
      practice: "Run 'show mac address-table' after pinging in Packet Tracer. Note the aging timer. Wait 300 seconds (or 'clear mac address-table dynamic') and check again — entries should be gone.",
      effort: "low",
      meta: "Know the default aging timer (300 seconds) and the 'show mac address-table' command. These appear in exam simlets."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     DOMAIN 2 — NETWORK ACCESS (20%)
  ══════════════════════════════════════════════════════════════ */

  /* ══════════════════════════════════════════════════════════════
     2.1 — Configure and verify VLANs
  ══════════════════════════════════════════════════════════════ */

  "2.1.a": {
    info: "Access ports carry traffic for a single VLAN and connect to end devices (PCs, phones, printers). The switch strips the VLAN tag before sending frames to the device — the endpoint never sees VLAN information. For voice VLANs, a single port can carry both a data VLAN and a voice VLAN using 'switchport voice vlan [id]', allowing an IP phone and PC to share one switch port with different VLANs.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Data Access Port", items: ["switchport mode access", "switchport access vlan 10", "One VLAN only", "Connects to PC/printer"] },
        right: { label: "Voice + Data Port", items: ["switchport mode access", "switchport access vlan 10", "switchport voice vlan 20", "Phone + PC on same port"] }
      }
    },
    hack: {
      memory: "Access port = one-lane road (single VLAN). Voice VLAN = express lane added for phone traffic. The PC uses the regular lane, the phone uses the express lane.",
      practice: "In Packet Tracer, create VLAN 10 (data) and VLAN 20 (voice). Configure a port with both. Connect a phone + PC daisy-chained. Verify with 'show vlan brief' and 'show interfaces switchport'.",
      effort: "medium",
      meta: "Voice VLAN config is tested in simlets. Know the three commands: mode access, access vlan, voice vlan. Jeremy's IT Lab VLAN lab covers this."
    }
  },

  "2.1.b": {
    info: "VLAN 1 is the default VLAN on all Cisco switches — every port starts in VLAN 1. It's also the default native VLAN on trunks. Best practice: do NOT use VLAN 1 for production traffic because it can't be deleted and has special handling (CDP, VTP, STP BPDUs sent on VLAN 1). Move all user ports to other VLANs and change the native VLAN on trunks away from VLAN 1 for security.",
    visual: {
      type: "shield",
      params: {
        items: ["All ports start in VLAN 1", "Default native VLAN on trunks", "Cannot be deleted", "Best practice: don't use it for production"],
        color: "#f59e0b"
      }
    },
    hack: {
      memory: "VLAN 1 = the default apartment everyone gets assigned to. It's crowded and noisy (management traffic). Move out to a new VLAN ASAP for security.",
      practice: "On a switch, run 'show vlan brief' to see all ports in VLAN 1. Create VLAN 10 and move ports to it. Verify VLAN 1 still exists but is now empty of user ports.",
      effort: "low",
      meta: "The exam tests whether you know VLAN 1 is the default and that best practice is to not use it. Flashcard: 'VLAN 1 = default, avoid for production.'"
    }
  },

  "2.1.c": {
    info: "Devices in different VLANs cannot communicate without a Layer 3 device (router or L3 switch) performing inter-VLAN routing. VLANs segment broadcast domains at Layer 2, so cross-VLAN traffic must be routed at Layer 3. Three methods: (1) Router-on-a-stick (one trunk to router with subinterfaces), (2) L3 switch with SVIs, (3) Separate physical router interfaces per VLAN. L3 switch with SVIs is the most common modern approach.",
    visual: {
      type: "hierarchy",
      params: {
        root: "L3 Device Required",
        children: [
          { name: "Router-on-a-Stick", children: [{ name: "Subinterfaces (Gi0/0.10, Gi0/0.20)" }] },
          { name: "L3 Switch + SVIs", children: [{ name: "interface vlan 10, interface vlan 20" }] },
          { name: "Separate Interfaces", children: [{ name: "One router port per VLAN" }] }
        ]
      }
    },
    hack: {
      memory: "VLANs without a router = islands with no bridges. InterVLAN routing = building a bridge between islands. L3 switch = the most efficient bridge builder.",
      practice: "Lab all three methods in Packet Tracer. Start with router-on-a-stick (most exam-tested), then L3 switch SVIs. Verify with ping between VLANs and 'show ip route'.",
      effort: "high",
      meta: "Inter-VLAN routing is heavily tested, especially router-on-a-stick. Lab it multiple times. Jeremy's IT Lab Day 17-18 is the definitive resource."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     2.2 — Configure and verify interswitch connectivity
  ══════════════════════════════════════════════════════════════ */

  "2.2.a": {
    info: "Trunk ports carry traffic for multiple VLANs between switches. Each frame on a trunk is tagged with its VLAN ID (except native VLAN traffic, which is untagged). Trunks are essential for extending VLANs across multiple switches. Configured with 'switchport mode trunk'. Use 'switchport trunk allowed vlan [list]' to restrict which VLANs traverse the trunk for security and bandwidth management.",
    visual: { type: "packet-flow", params: { nodes: ["Switch A (VLANs 10,20,30)", "Trunk Link (tagged)", "Switch B (VLANs 10,20,30)"], color: "#3b82f6" } },
    hack: {
      memory: "Trunk = highway with multiple lanes (VLANs). Each car (frame) has a VLAN sticker on it so the other switch knows which lane it belongs to. Access port = single-lane road.",
      practice: "Connect two switches with a trunk. Create VLANs 10, 20, 30 on both. Verify with 'show interfaces trunk'. Restrict allowed VLANs and verify again.",
      effort: "medium",
      meta: "Trunk configuration appears in simlets. Know: 'switchport mode trunk', 'switchport trunk allowed vlan', and 'show interfaces trunk'. Lab it repeatedly."
    }
  },

  "2.2.b": {
    info: "802.1Q is the IEEE trunking standard that inserts a 4-byte tag into the Ethernet frame between the source MAC and EtherType fields. The tag contains the VLAN ID (12 bits, supporting VLANs 1-4094) and priority bits (3 bits for CoS/QoS). ISL (Inter-Switch Link) was Cisco's proprietary alternative but is obsolete. 802.1Q is the only trunking protocol on the CCNA exam.",
    visual: {
      type: "encapsulation",
      params: {
        layers: [
          { label: "Dest MAC + Src MAC", color: "#3b82f6" },
          { label: "802.1Q Tag (4 bytes: TPID + PRI + VLAN ID)", color: "#f59e0b" },
          { label: "EtherType + Payload + FCS", color: "#10b981" }
        ]
      }
    },
    hack: {
      memory: "802.1Q = the sticker on each frame telling the other switch which VLAN it belongs to. 4 bytes inserted, 12 bits for VLAN ID = 4094 possible VLANs. ISL is dead — forget it.",
      practice: "Know: 802.1Q inserts a 4-byte tag, supports 4094 VLANs, is the IEEE standard. The tag goes between source MAC and EtherType. Draw the tagged frame format.",
      effort: "low",
      meta: "Know that 802.1Q is the standard (not ISL). Memorize: 4-byte tag, 12-bit VLAN ID, 4094 VLANs. This is a quick-win exam topic."
    }
  },

  "2.2.c": {
    info: "The native VLAN is the VLAN whose traffic is sent untagged on an 802.1Q trunk. By default, it's VLAN 1. If a switch receives an untagged frame on a trunk, it assigns it to the native VLAN. Both sides of a trunk MUST agree on the native VLAN — a mismatch causes traffic to leak between VLANs (a security risk). Best practice: change the native VLAN away from VLAN 1 using 'switchport trunk native vlan [id]'.",
    visual: {
      type: "handshake",
      params: {
        leftLabel: "Switch A (Native=99)",
        rightLabel: "Switch B (Native=99)",
        steps: ["Tagged frame (VLAN 10) →", "← Tagged frame (VLAN 20)", "Untagged frame (Native 99) →", "← Assigned to VLAN 99"]
      }
    },
    hack: {
      memory: "Native VLAN = the 'no sticker needed' VLAN. It's like the default language at work — if you don't specify, everyone assumes it. Mismatch = two people assuming different default languages.",
      practice: "Configure trunks with mismatched native VLANs and observe the CDP warning message. Then fix it. Verify with 'show interfaces trunk' — check the 'Native vlan' column.",
      effort: "medium",
      meta: "Native VLAN mismatch is a classic exam scenario. Know: both sides must match, default is VLAN 1, best practice is to change it. The exam loves this trick question."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     2.3 — Configure and verify Layer 2 discovery protocols
  ══════════════════════════════════════════════════════════════ */

  "2.3.a": {
    info: "CDP (Cisco Discovery Protocol) is a Cisco-proprietary Layer 2 protocol that discovers directly connected Cisco devices. It runs by default on all Cisco devices, sending advertisements every 60 seconds with a holdtime of 180 seconds. CDP shares device ID, IP address, platform, capabilities, port ID, and native VLAN. It operates at Layer 2, so it works even without IP connectivity.",
    visual: {
      type: "packet-flow",
      params: { nodes: ["Cisco Router", "CDP frames (L2)", "Cisco Switch"], color: "#0ea5e9" }
    },
    hack: {
      memory: "CDP = Cisco Devices Phoning home. Only works between Cisco devices. Sends info every 60 seconds, gives up after 180 seconds of silence (holdtime = 3x the interval).",
      practice: "In Packet Tracer, connect Cisco devices and run 'show cdp neighbors'. Note the device ID, local interface, and remote port. Compare to 'show cdp neighbors detail' for IP addresses.",
      effort: "medium",
      meta: "CDP commands appear in troubleshooting simlets. Know the timer values (60/180) and both show commands. Practice reading the output."
    }
  },

  "2.3.b": {
    info: "'show cdp neighbors' displays a summary table of all directly connected Cisco devices: Device ID, Local Interface, Holdtime, Capability, Platform, and Port ID. 'show cdp neighbors detail' adds IP addresses, IOS version, VTP domain, native VLAN, and duplex. The detail version is critical for finding the IP address of a connected device when you can't access it directly.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "show cdp neighbors", items: ["Device ID", "Local/Remote ports", "Holdtime", "Capability codes", "Platform"] },
        right: { label: "show cdp neighbors detail", items: ["All of the above PLUS:", "IP address", "IOS version", "VTP domain", "Native VLAN"] }
      }
    },
    hack: {
      memory: "'show cdp neighbors' = quick glance at who's next door. 'show cdp neighbors detail' = full background check on your neighbors (includes IP address — the key difference).",
      practice: "Run both commands in Packet Tracer. Note that the detail command adds the management IP — this is how you find the IP of a connected device you can't console into.",
      effort: "low",
      meta: "The exam gives you CDP output and asks 'what is the IP of the connected device?' — you need 'detail' for that. Know which info is in which command."
    }
  },

  "2.3.c": {
    info: "CDP is enabled globally and per-interface by default. 'cdp run' enables CDP globally (global config). 'no cdp run' disables it globally. 'cdp enable' enables CDP on a specific interface (interface config). 'no cdp enable' disables it per-interface. Security best practice: disable CDP on interfaces facing untrusted networks (external/internet-facing) because it reveals device information.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Global Level", items: ["cdp run — enable globally", "no cdp run — disable globally"] },
        right: { label: "Interface Level", items: ["cdp enable — enable per-port", "no cdp enable — disable per-port"] }
      }
    },
    hack: {
      memory: "Global = 'cdp run' (run it everywhere). Interface = 'cdp enable' (enable on this one port). 'run' is global, 'enable' is local. Disable on untrusted ports.",
      practice: "Disable CDP on an interface facing the 'internet' in a lab. Verify with 'show cdp interface'. Re-enable it. Practice the global vs interface distinction.",
      effort: "low",
      meta: "Know the security angle: disable CDP on external interfaces. The exam asks when to disable CDP — answer: untrusted/external-facing ports."
    }
  },

  "2.3.d": {
    info: "LLDP (Link Layer Discovery Protocol) is the IEEE 802.1AB open standard equivalent of CDP. It works between any vendor's devices, not just Cisco. LLDP is disabled by default on Cisco devices (unlike CDP). It shares similar information: system name, port description, management address, capabilities, VLAN info. LLDP uses a separate transmit and receive function — you can enable one without the other.",
    visual: {
      type: "packet-flow",
      params: { nodes: ["Cisco Switch", "LLDP frames (L2)", "HP/Arista/Any Vendor Switch"], color: "#10b981" }
    },
    hack: {
      memory: "LLDP = the universal translator. Works between any vendor's equipment. CDP = Cisco-only walkie-talkies. LLDP is OFF by default on Cisco (you must turn it on).",
      practice: "Enable LLDP on a Cisco switch ('lldp run'). Connect to another device. Run 'show lldp neighbors'. Compare output to CDP output.",
      effort: "low",
      meta: "The exam compares CDP vs LLDP. Key differences: CDP=Cisco/on by default, LLDP=open standard/off by default. Know both."
    }
  },

  "2.3.e": {
    info: "'show lldp neighbors' displays directly connected devices discovered via LLDP: Device ID, Local Interface, Holdtime, Capability, and Port ID. 'show lldp neighbors detail' adds management address, system description, and other TLVs (Type-Length-Value fields). The output format is similar to CDP but uses different capability codes.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "show lldp neighbors", items: ["Device ID", "Local/Remote ports", "Holdtime", "Capabilities"] },
        right: { label: "show lldp neighbors detail", items: ["All above PLUS:", "Management address", "System description", "Enabled capabilities"] }
      }
    },
    hack: {
      memory: "Same pattern as CDP: basic command = summary, detail = full info including IP. Just swap 'cdp' for 'lldp' in the command.",
      practice: "Run both 'show lldp neighbors' and 'show lldp neighbors detail'. Compare the output structure to CDP commands. Note the similarities.",
      effort: "low",
      meta: "If you know the CDP commands, LLDP is the same pattern with 'lldp' instead of 'cdp'. The exam tests both — learn them in parallel."
    }
  },

  "2.3.f": {
    info: "'lldp run' enables LLDP globally (global config). LLDP has separate transmit and receive controls per interface: 'lldp transmit' enables sending LLDP frames, 'lldp receive' enables processing received LLDP frames. You can enable one without the other for security flexibility. 'no lldp run' disables LLDP globally.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Global Level", items: ["lldp run — enable globally", "no lldp run — disable globally"] },
        right: { label: "Interface Level", items: ["lldp transmit — send LLDP", "lldp receive — accept LLDP", "no lldp transmit — stop sending", "no lldp receive — stop listening"] }
      }
    },
    hack: {
      memory: "LLDP interface = two switches: transmit (mouth) and receive (ears). You can talk without listening or listen without talking. CDP only has one switch (enable/disable).",
      practice: "Enable LLDP globally. Then disable only transmit on one interface — the switch will still hear neighbors but won't announce itself. Verify with 'show lldp interface'.",
      effort: "low",
      meta: "The separate transmit/receive control is what makes LLDP different from CDP at the interface level. The exam tests this distinction."
    }
  },

  "2.3.g": {
    info: "CDP vs LLDP: CDP is Cisco-proprietary and enabled by default; LLDP is IEEE 802.1AB open standard and disabled by default on Cisco. Both operate at Layer 2 and discover directly connected devices. CDP has a single per-interface toggle (enable/disable); LLDP has separate transmit and receive controls. CDP sends every 60s (holdtime 180s); LLDP sends every 30s (holdtime 120s). Use LLDP in multi-vendor environments.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "CDP", items: ["Cisco proprietary", "Enabled by default", "60s timer / 180s hold", "Single interface toggle", "cdp run / cdp enable"] },
        right: { label: "LLDP", items: ["IEEE 802.1AB open standard", "Disabled by default", "30s timer / 120s hold", "Separate TX/RX control", "lldp run / lldp transmit / lldp receive"] }
      }
    },
    hack: {
      memory: "CDP = Cisco Default Protocol (on by default, Cisco only). LLDP = Lazy by default (off, needs enabling) but Loves all vendors (open standard).",
      practice: "Create a comparison table from memory: columns for CDP and LLDP, rows for vendor, default state, timers, interface control, and commands. Flashcard this table.",
      effort: "low",
      meta: "This comparison is a near-guaranteed exam question. Make a side-by-side table and memorize it. The timer differences (60/180 vs 30/120) are often tested."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     2.4 — Configure and verify EtherChannel (LACP)
  ══════════════════════════════════════════════════════════════ */

  "2.4.a": {
    info: "EtherChannel bundles 2-8 parallel physical links between switches into a single logical link (port-channel). This provides increased bandwidth (aggregated throughput), redundancy (one link fails, others continue), and load balancing. STP sees the port-channel as a single link, preventing blocked ports. Without EtherChannel, STP would block all but one of the parallel links.",
    visual: { type: "packet-flow", params: { nodes: ["Switch A (4 links)", "Port-Channel 1 (bonded)", "Switch B (4 links)"], color: "#3b82f6" } },
    hack: {
      memory: "EtherChannel = braiding ropes together. One rope (link) holds some weight. Four ropes braided (port-channel) hold 4x the weight and if one strand breaks, the others hold.",
      practice: "In Packet Tracer, connect two switches with 2-4 links and configure EtherChannel (LACP). Verify with 'show etherchannel summary'. Shut one link and confirm the channel stays up.",
      effort: "high",
      meta: "EtherChannel is heavily tested in simlets. Lab it multiple times with different protocols (LACP, PAgP, static). Jeremy's IT Lab Day 22 is the go-to resource."
    }
  },

  "2.4.b": {
    info: "LACP (Link Aggregation Control Protocol, IEEE 802.3ad) is the open-standard EtherChannel negotiation protocol. LACP modes: 'active' (actively sends LACP packets to negotiate) and 'passive' (only responds to LACP packets, doesn't initiate). At least one side must be active for the channel to form. active-active and active-passive both work. passive-passive does NOT form a channel.",
    visual: {
      type: "handshake",
      params: {
        leftLabel: "Switch A",
        rightLabel: "Switch B",
        steps: ["Active: LACP negotiation →", "← Active/Passive: responds", "Channel formed!", "--- Port-channel UP ---"]
      }
    },
    hack: {
      memory: "LACP: Active = 'I want to form a channel!' Passive = 'Only if you ask first.' Active-Passive works. Passive-Passive = two shy people who never talk.",
      practice: "Lab LACP with active-active, then active-passive, then passive-passive (observe failure). Know: at least one side must be active.",
      effort: "medium",
      meta: "LACP is the primary EtherChannel protocol for the exam. Know active/passive modes and that passive-passive fails. This is tested directly."
    }
  },

  "2.4.c": {
    info: "PAgP (Port Aggregation Protocol) is Cisco's proprietary EtherChannel negotiation protocol. PAgP modes: 'desirable' (actively negotiates, equivalent to LACP active) and 'auto' (only responds, equivalent to LACP passive). At least one side must be desirable. desirable-desirable and desirable-auto work. auto-auto does NOT form a channel. PAgP only works between Cisco devices.",
    visual: {
      type: "handshake",
      params: {
        leftLabel: "Cisco Switch A",
        rightLabel: "Cisco Switch B",
        steps: ["Desirable: PAgP negotiation →", "← Desirable/Auto: responds", "Channel formed!", "--- Port-channel UP ---"]
      }
    },
    hack: {
      memory: "PAgP modes map to LACP modes: desirable=active, auto=passive. Mnemonic: LACP = Active/Passive, PAgP = Desirable/Auto. 'DAP' = Desirable-Active-Passive... wait, 'DA = Desirable/Auto (PAgP), AP = Active/Passive (LACP).'",
      practice: "Lab PAgP with desirable-desirable, desirable-auto, and auto-auto. Compare the behavior to LACP. Know the mode mapping.",
      effort: "medium",
      meta: "PAgP is tested less than LACP but still appears. Know: PAgP = Cisco only, desirable = initiates, auto = responds only."
    }
  },

  "2.4.d": {
    info: "Static EtherChannel (mode on) forces the channel without any negotiation protocol — no LACP or PAgP packets are exchanged. Both sides must be set to 'on'. This is the simplest method but provides no negotiation or error detection — if one side is misconfigured, the channel can form incorrectly and cause loops. 'on' mode cannot be mixed with LACP or PAgP modes.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "mode on (Static)", items: ["No negotiation protocol", "Both sides must be 'on'", "No error detection", "Risk of misconfiguration"] },
        right: { label: "LACP/PAgP (Dynamic)", items: ["Negotiation protocol", "Detects misconfig", "Safer", "Recommended"] }
      }
    },
    hack: {
      memory: "Mode 'on' = duct tape. It holds things together but doesn't verify anything. LACP/PAgP = proper bolts with safety checks. Use 'on' only when you must.",
      practice: "Configure a static EtherChannel (channel-group 1 mode on) on both sides. Verify it works. Then misconfigure one side and observe the problem. This shows why negotiation protocols are better.",
      effort: "low",
      meta: "Know that 'on' doesn't use negotiation and is risky. The exam prefers LACP. Know that 'on' can't mix with active/passive/desirable/auto."
    }
  },

  "2.4.e": {
    info: "EtherChannel negotiation matrix shows which mode combinations form a channel: LACP: active-active=YES, active-passive=YES, passive-passive=NO. PAgP: desirable-desirable=YES, desirable-auto=YES, auto-auto=NO. Static: on-on=YES. Mixing protocols: on+active/passive=NO, on+desirable/auto=NO, LACP+PAgP=NO. Both sides must use the same protocol or both be 'on'.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Forms Channel", items: ["active + active", "active + passive", "desirable + desirable", "desirable + auto", "on + on"] },
        right: { label: "Does NOT Form", items: ["passive + passive", "auto + auto", "on + active/passive", "on + desirable/auto", "LACP + PAgP (any combo)"] }
      }
    },
    hack: {
      memory: "At least one side must be the 'initiator' (active or desirable). Two passive sides = two people waiting for the other to speak first. Never mix protocols or 'on' with negotiation.",
      practice: "Draw the negotiation matrix on paper: 3x3 grid for LACP, 3x3 for PAgP, cross-protocol combos. Mark YES/NO. Memorize it.",
      effort: "medium",
      meta: "The exam presents mode combinations and asks 'will the channel form?' Have the matrix memorized. This is a guaranteed topic."
    }
  },

  "2.4.f": {
    info: "Layer 2 EtherChannel bundles switchports configured as access or trunk ports. The port-channel interface inherits the Layer 2 configuration (VLAN, trunk settings, STP). All member ports must have identical L2 configuration — same VLAN, same trunk mode, same allowed VLANs, same native VLAN. Configure the port-channel interface, not individual member ports, for VLAN and trunk settings after the channel is formed.",
    visual: {
      type: "encapsulation",
      params: {
        layers: [
          { label: "Port-Channel 1 (Logical L2 Interface)", color: "#3b82f6" },
          { label: "Gi0/1 + Gi0/2 + Gi0/3 + Gi0/4 (Physical Members)", color: "#8b5cf6" },
          { label: "Trunk: VLANs 10, 20, 30 (Same config on all)", color: "#10b981" }
        ]
      }
    },
    hack: {
      memory: "L2 EtherChannel = a team of links wearing the same uniform (identical VLAN/trunk config). If one wears a different uniform, the team falls apart.",
      practice: "Configure a L2 trunk EtherChannel. Set allowed VLANs on the port-channel interface. Verify all members inherit the config with 'show interfaces trunk' and 'show etherchannel summary'.",
      effort: "medium",
      meta: "Key exam point: configure the port-channel interface for trunk/VLAN settings, not individual ports. Misconfigured members are suspended."
    }
  },

  "2.4.g": {
    info: "Layer 3 EtherChannel assigns an IP address to the port-channel interface — it acts as a routed interface. Member ports must be configured with 'no switchport' before joining the channel. The port-channel interface gets the IP, not the individual members. Used for router-to-switch or switch-to-switch routed links where you want aggregated bandwidth and redundancy at Layer 3.",
    visual: {
      type: "encapsulation",
      params: {
        layers: [
          { label: "Port-Channel 1 — IP: 10.0.0.1/30 (Routed)", color: "#3b82f6" },
          { label: "Gi0/1 + Gi0/2 (no switchport, member ports)", color: "#8b5cf6" },
          { label: "Physical Links (no individual IP)", color: "#10b981" }
        ]
      }
    },
    hack: {
      memory: "L3 EtherChannel = giving the team a single phone number (IP address) instead of one per person. 'no switchport' turns each port into a routed port before bundling.",
      practice: "Configure L3 EtherChannel: 'no switchport' on members, assign them to a channel-group, then assign IP to the port-channel interface. Verify with 'show ip interface brief'.",
      effort: "medium",
      meta: "Know the key difference: L2 = switchport + VLANs, L3 = no switchport + IP address on port-channel. The exam tests both types."
    }
  },

  "2.4.h": {
    info: "All member ports in an EtherChannel must have identical settings: same speed, same duplex, same VLAN assignment (for access ports), same trunk configuration (mode, native VLAN, allowed VLANs for trunk ports), and same STP settings. If any port doesn't match, it will be suspended from the channel. The switch checks these requirements before allowing a port to join.",
    visual: {
      type: "shield",
      params: {
        items: ["Same speed (all 1G or all 10G)", "Same duplex (all full)", "Same VLAN / trunk config", "Same STP settings", "Mismatch = port suspended"],
        color: "#ef4444"
      }
    },
    hack: {
      memory: "EtherChannel requirements = uniform dress code. Every port must match: speed, duplex, VLAN, trunk, STP. One mismatch and that port gets sent home (suspended).",
      practice: "Configure an EtherChannel, then intentionally change one member's VLAN or speed. Observe the suspension. Verify with 'show etherchannel summary' — look for the 's' (suspended) flag.",
      effort: "medium",
      meta: "If a port shows (s)uspended in the summary, check for config mismatches. This is a classic exam troubleshooting scenario."
    }
  },

  "2.4.i": {
    info: "'show etherchannel summary' is the primary verification command. It shows: port-channel number, protocol (LACP/PAgP/none), status flags (U=in use, D=down, s=suspended, P=bundled, I=stand-alone), and member ports with their individual flags. A healthy channel shows 'SU' (Layer 2 in use) or 'RU' (Layer 3 routed in use) with all members showing 'P' (bundled).",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Healthy Output", items: ["Po1 (SU) — LACP", "Gi0/1 (P)", "Gi0/2 (P)", "Gi0/3 (P)"] },
        right: { label: "Problem Indicators", items: ["(SD) — channel down", "(s) — port suspended", "(I) — standalone", "(D) — down"] }
      }
    },
    hack: {
      memory: "SU = 'Switch Up' (Layer 2, working). RU = 'Routed Up' (Layer 3, working). P = 'Port bundled' (good). s = 'suspended' (config mismatch). D = 'Down' (failed).",
      practice: "Run 'show etherchannel summary' after every EtherChannel lab. Learn to read the flags instantly. Create intentional problems and diagnose them from the output.",
      effort: "medium",
      meta: "This command appears in exam simlets. Know the flags: SU, RU, P, s, D, I. Practice reading the output until it's second nature."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     2.5 — Interpret Rapid PVST+ Spanning Tree Protocol
  ══════════════════════════════════════════════════════════════ */

  "2.5.a": {
    info: "STP port roles: Root Port — the port closest to the root bridge (lowest cost path), one per non-root switch. Designated Port — the port on each segment that forwards traffic toward the root bridge, one per segment. Non-designated (Alternate/Backup) Port — blocked ports that provide redundancy. The Root Bridge has all ports as designated (it IS the root, no need for root ports). In RSTP, alternate ports provide rapid failover.",
    visual: {
      type: "hierarchy",
      params: {
        root: "Root Bridge (all ports Designated)",
        children: [
          { name: "Switch A", children: [{ name: "Root Port (→ Root)" }, { name: "Designated Port (→ segment)" }] },
          { name: "Switch B", children: [{ name: "Root Port (→ Root)" }, { name: "Alternate Port (blocked, backup)" }] }
        ]
      }
    },
    hack: {
      memory: "Root Port = the port that points toward the root bridge (every non-root switch has exactly one). Designated = the forwarding port on each segment. Alternate = backup (blocked until needed).",
      practice: "In Packet Tracer, build a triangle topology (3 switches). Identify which is the root bridge, which ports are root, designated, and alternate. Verify with 'show spanning-tree'.",
      effort: "high",
      meta: "STP port roles are heavily tested. Draw triangle topologies and practice identifying every port's role. Jeremy's IT Lab Day 20-21 is essential."
    }
  },

  "2.5.b": {
    info: "Rapid PVST+ (802.1w) has three port states: Discarding (not forwarding, not learning MACs — combines STP's disabled, blocking, and listening states), Learning (building MAC table but not yet forwarding), and Forwarding (fully operational, forwarding and learning). RSTP converges in seconds (vs 30-50 seconds for classic STP) by using proposal/agreement mechanism instead of timers.",
    visual: {
      type: "state-machine",
      params: {
        states: ["Discarding (no forward, no learn)", "Learning (no forward, yes learn)", "Forwarding (forward + learn)"],
        active: 2,
        transitions: true
      }
    },
    hack: {
      memory: "RSTP has only 3 states (vs STP's 5). Discarding = 'DLB' (Disabled + Listening + Blocking rolled into one). Learning = building the guest list. Forwarding = doors open, traffic flows.",
      practice: "Compare STP (5 states) to RSTP (3 states) in a table. Know that RSTP's Discarding replaces Disabled/Blocking/Listening. Flashcard the three states.",
      effort: "medium",
      meta: "The exam specifically tests Rapid PVST+ (RSTP). Know the three states, not the classic five. The convergence speed improvement is a key selling point."
    }
  },

  "2.5.c": {
    info: "PortFast makes a switch port transition immediately from discarding to forwarding, bypassing the learning state. Used ONLY on access ports connected to end devices (PCs, printers) — never on ports connected to other switches. This prevents the 30-second STP delay that causes DHCP timeouts on PCs. Configured with 'spanning-tree portfast' on the interface or 'spanning-tree portfast default' globally for all access ports.",
    visual: {
      type: "state-machine",
      params: {
        states: ["Discarding", "Learning (SKIPPED)", "Forwarding (Immediate!)"],
        active: 2,
        transitions: true
      }
    },
    hack: {
      memory: "PortFast = VIP pass. End devices don't need to wait in the STP line — they go straight to forwarding. But NEVER give a switch a VIP pass (loops!).",
      practice: "Enable PortFast on a PC-connected port. Boot a PC and observe instant connectivity. Then enable PortFast on a switch-to-switch link and observe why it's dangerous (potential loops).",
      effort: "medium",
      meta: "PortFast + BPDU Guard is a critical exam combination. Know: PortFast on access ports only, always pair with BPDU Guard for protection."
    }
  },

  "2.5.d": {
    info: "Root Guard prevents a port from becoming a root port — if the port receives a superior BPDU (from a switch claiming to be the root), the port enters root-inconsistent state (blocked) instead of becoming the root port. Applied to ports where the root bridge should never be connected. BPDU Guard shuts down a PortFast-enabled port if it receives any BPDU — protects against unauthorized switches being plugged into access ports.",
    visual: {
      type: "shield",
      params: {
        items: ["Root Guard — blocks superior BPDUs, prevents root port change", "BPDU Guard — shuts down port on ANY BPDU received", "Root Guard = protect root election", "BPDU Guard = protect access ports (pair with PortFast)"],
        color: "#ef4444"
      }
    },
    hack: {
      memory: "Root Guard = bodyguard for the root bridge election. 'No one else gets to be root through this port.' BPDU Guard = bouncer at the access port. 'No switches allowed here — shut it down!'",
      practice: "Enable BPDU Guard on a PortFast port, then connect a switch to it. Observe the port go err-disabled. Recover with 'shutdown' then 'no shutdown'. Know the recovery process.",
      effort: "medium",
      meta: "BPDU Guard + PortFast is the most tested STP security combination. Know what happens when each triggers and how to recover (err-disable recovery)."
    }
  },

  "2.5.e": {
    info: "STP elects the root bridge by comparing Bridge IDs: priority (default 32768) + VLAN number + MAC address. Lowest Bridge ID wins. Priority is compared first — lower priority = more likely to be root. If priorities match, the lowest MAC address wins. You can manually set priority with 'spanning-tree vlan [id] priority [value]' (multiples of 4096) or 'spanning-tree vlan [id] root primary' (sets priority to 24576).",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Bridge ID Components", items: ["Priority (4 bits, 0-61440)", "VLAN ID (12 bits)", "MAC Address (48 bits)", "Default priority: 32768"] },
        right: { label: "Election Rules", items: ["Lowest priority wins", "If tie: lowest MAC wins", "root primary sets 24576", "root secondary sets 28672"] }
      }
    },
    hack: {
      memory: "Root election = who has the lowest number wins. Priority first (default 32768), then MAC as tiebreaker. 'Lowest ID = root bridge.' Set priority low to force a specific switch to be root.",
      practice: "In a 3-switch topology, identify the root bridge with 'show spanning-tree'. Change the priority on a different switch to make it root. Verify the election changed.",
      effort: "high",
      meta: "Root bridge election is fundamental STP. Know default priority (32768), how to change it, and that MAC is the tiebreaker. Practice the election process on paper."
    }
  },

  "2.5.f": {
    info: "STP path cost determines the best path to the root bridge. Each link has a cost based on bandwidth: 10 Gbps = 2, 1 Gbps = 4, 100 Mbps = 19, 10 Mbps = 100. Lower total cost = better path. The root port on each switch is the port with the lowest total cost to reach the root bridge. If costs are equal, the port connected to the neighbor with the lowest Bridge ID wins, then lowest port priority, then lowest port number.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Link Speed", items: ["10 Gbps", "1 Gbps", "100 Mbps", "10 Mbps"] },
        right: { label: "STP Cost", items: ["2", "4", "19", "100"] }
      }
    },
    hack: {
      memory: "Faster link = lower cost. '10G=2, 1G=4, 100M=19, 10M=100.' Think: speed and cost are inversely related. Mnemonic: '2-4-19-100' — say it 10 times.",
      practice: "In a topology with mixed-speed links, calculate the total STP cost to the root from each switch. Verify with 'show spanning-tree' — check the 'Cost' column.",
      effort: "medium",
      meta: "Memorize '2-4-19-100' for 10G-1G-100M-10M. The exam gives you a topology and asks which port is the root port — calculate the total cost for each path."
    }
  },

  "2.5.g": {
    info: "'show spanning-tree' displays the STP topology: root bridge ID, local bridge ID, per-VLAN STP instance, port roles (Root, Desg, Altn), port states (FWD, LRN, BLK/Discarding), cost, and priority. 'show spanning-tree vlan [id]' shows STP for a specific VLAN. Key fields: 'This bridge is the root' (if you're on the root switch), root port ID, and port role/state columns.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "show spanning-tree Output", items: ["Root ID (priority + MAC)", "Bridge ID (this switch)", "Port role: Root/Desg/Altn", "Port state: FWD/LRN/BLK", "Cost per port"] },
        right: { label: "What to Check", items: ["Is this the root bridge?", "Which port is root port?", "Are any ports blocked?", "What's the cost to root?", "Any topology changes?"] }
      }
    },
    hack: {
      memory: "'show spanning-tree' = the STP X-ray. It shows you who's root, which ports are forwarding, and which are blocked. If 'This bridge is the root' appears, you're on the root switch.",
      practice: "Build a multi-switch topology and run 'show spanning-tree' on every switch. Identify the root bridge, root ports, designated ports, and blocked ports. Match the output to the physical topology.",
      effort: "high",
      meta: "Reading 'show spanning-tree' output is guaranteed on the exam. Practice until you can extract all information in seconds. Draw the topology from the output."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     2.6 — Cisco Wireless Architectures and AP modes
  ══════════════════════════════════════════════════════════════ */

  "2.6.a": {
    info: "Autonomous APs operate independently — each AP is configured and managed individually with its own IOS. All wireless functions (authentication, encryption, QoS, VLAN mapping) are handled locally on the AP. Suitable for very small deployments but doesn't scale — managing 50+ autonomous APs individually is impractical. Each autonomous AP needs a trunk connection to the switch to carry multiple VLANs.",
    visual: {
      type: "hierarchy",
      params: {
        root: "Network",
        children: [
          { name: "Autonomous AP 1 (self-managed, IOS)" },
          { name: "Autonomous AP 2 (self-managed, IOS)" },
          { name: "Autonomous AP 3 (self-managed, IOS)" }
        ]
      }
    },
    hack: {
      memory: "Autonomous AP = solo freelancer. Each manages themselves, does everything independently. Great for one person, terrible for a team of 50.",
      practice: "Know: autonomous = standalone, own IOS, trunk to switch, doesn't scale. Compare to lightweight (WLC-managed). Flashcard the key difference.",
      effort: "low",
      meta: "The exam tests autonomous vs lightweight. Know that autonomous = independent, doesn't scale, requires trunk per AP."
    }
  },

  "2.6.b": {
    info: "Lightweight APs are centrally managed by a WLC via CAPWAP (Control and Provisioning of Wireless Access Points) tunnels. The AP handles real-time functions (RF transmission, encryption/decryption) while the WLC handles management functions (authentication, SSID config, RF management, firmware updates). CAPWAP uses UDP 5246 (control, encrypted) and UDP 5247 (data, optionally encrypted).",
    visual: {
      type: "handshake",
      params: {
        leftLabel: "Lightweight AP",
        rightLabel: "WLC",
        steps: ["CAPWAP Discovery →", "← CAPWAP Join Response", "Config download ←", "--- AP operational, WLC-managed ---"]
      }
    },
    hack: {
      memory: "Lightweight AP = employee following corporate policy from HQ (WLC). The AP does the physical work (RF), the WLC makes all the decisions (config, auth, management). CAPWAP = the phone line to HQ.",
      practice: "In Packet Tracer, connect a lightweight AP to a switch and WLC. Watch the CAPWAP registration process. Configure WLANs on the WLC and verify they propagate to the AP.",
      effort: "medium",
      meta: "Lightweight AP + WLC is the modern enterprise model and heavily tested. Know CAPWAP ports (5246/5247) and which functions are split between AP and WLC."
    }
  },

  "2.6.c": {
    info: "Split-MAC architecture divides wireless functions between the AP and WLC. The AP handles real-time, latency-sensitive functions: RF transmission/reception, frame encryption/decryption, beacons, and probe responses. The WLC handles management functions: client authentication, security policies, SSID/WLAN configuration, RF channel and power management, roaming, and QoS. This split is what makes lightweight APs lightweight.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "AP (Real-time)", items: ["RF transmit/receive", "Encryption/decryption", "Beacons & probes", "Frame queuing"] },
        right: { label: "WLC (Management)", items: ["Client authentication", "Security policies", "RF management (channel/power)", "Roaming & QoS"] }
      }
    },
    hack: {
      memory: "Split-MAC = split personality. AP = the body (does physical work). WLC = the brain (makes decisions). The body acts fast (real-time RF), the brain thinks slow but smart (management/policy).",
      practice: "Memorize which functions live where. Key distinction: anything time-critical (RF, encryption) stays on the AP. Anything policy/management goes to the WLC.",
      effort: "low",
      meta: "The exam asks which functions are handled by the AP vs WLC. Memorize the split. Time-critical = AP, everything else = WLC."
    }
  },

  "2.6.d": {
    info: "FlexConnect is a mode for lightweight APs at remote/branch sites with WAN links back to the WLC. In connected mode, FlexConnect acts like a standard lightweight AP (traffic tunneled to WLC). In standalone mode (if WAN link fails), the AP can locally switch traffic and maintain authentication using cached credentials. This provides branch office resilience without a local WLC.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Connected Mode", items: ["CAPWAP tunnel to WLC active", "Traffic centrally switched", "Full WLC management"] },
        right: { label: "Standalone Mode", items: ["WAN link to WLC down", "Local switching (traffic stays local)", "Cached credentials for auth", "AP continues operating"] }
      }
    },
    hack: {
      memory: "FlexConnect = flexible employee who works from the office (connected) or from home (standalone). If HQ (WLC) is unreachable, they keep working independently using saved instructions.",
      practice: "Know: FlexConnect = branch office AP, locally switches when WLC is down, uses cached credentials. Key exam scenario: 'WAN link fails, does the AP still work?' → Yes, with FlexConnect.",
      effort: "low",
      meta: "FlexConnect is tested as a concept. Know the two modes (connected/standalone) and that it's for branch offices with unreliable WAN links."
    }
  },

  "2.6.e": {
    info: "Cisco Meraki is a cloud-managed wireless (and networking) platform. All APs are managed through the Meraki cloud dashboard — no on-premises WLC needed. APs connect to the Meraki cloud for configuration, monitoring, and firmware updates via HTTPS. If the cloud connection is lost, APs continue forwarding traffic using their last-known configuration. Simple to deploy and manage but requires a Meraki license subscription.",
    visual: { type: "packet-flow", params: { nodes: ["Meraki AP", "Internet/HTTPS", "Meraki Cloud Dashboard"], color: "#10b981" } },
    hack: {
      memory: "Meraki = Netflix for networking. Everything managed in the cloud, you access it through a browser. No on-site WLC, just APs and internet. But you pay a subscription.",
      practice: "Know: Meraki = cloud-managed, no on-prem WLC, subscription-based, APs work offline with cached config. Flashcard the concept.",
      effort: "low",
      meta: "Simple concept question. Know that Meraki is cloud-managed, subscription-based, and APs survive cloud outages. No deep configuration tested."
    }
  },

  "2.6.f": {
    info: "Cisco DNA Center (now Catalyst Center) is an on-premises network management and automation platform. It provides intent-based networking (IBN), network assurance (analytics, AI-driven insights), SD-Access (automated campus fabric), and policy management. DNA Center manages wired and wireless infrastructure — it can manage WLCs, switches, and routers from a single dashboard. It's Cisco's strategic direction for enterprise network management.",
    visual: {
      type: "hierarchy",
      params: {
        root: "Cisco DNA Center",
        children: [
          { name: "Intent-Based Networking" },
          { name: "Network Assurance (AI analytics)" },
          { name: "SD-Access (campus fabric)" },
          { name: "Policy & Automation" }
        ]
      }
    },
    hack: {
      memory: "DNA Center = the CEO of your network. You tell it what you want (intent), and it configures everything automatically. Meraki = cloud CEO. DNA Center = on-prem CEO.",
      practice: "Know: DNA Center = on-prem, intent-based, manages everything (wired + wireless), provides assurance (analytics). Compare to Meraki (cloud) and WLC (wireless only).",
      effort: "low",
      meta: "DNA Center appears as concept questions. Know what IBN means: you declare desired state, DNA Center implements it. No configuration tested."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     2.7 — Physical infrastructure connections of WLAN
  ══════════════════════════════════════════════════════════════ */

  "2.7.a": {
    info: "Access Points connect to the switch via an access port (for a single VLAN, simpler) or a trunk port (for multiple VLANs/SSIDs, more flexible). Autonomous APs typically need a trunk to carry multiple WLANs mapped to different VLANs. Lightweight APs can use an access port if all traffic is tunneled back to the WLC via CAPWAP (the WLC handles VLAN mapping). The AP also receives PoE power through this same switch port.",
    visual: { type: "packet-flow", params: { nodes: ["AP", "Ethernet + PoE", "Switch (Access or Trunk port)"], color: "#3b82f6" } },
    hack: {
      memory: "Autonomous AP = needs trunk (multiple VLANs locally). Lightweight AP = access port is fine (everything tunneled to WLC). Think: autonomous does more work locally, so it needs more VLANs.",
      practice: "Know when each port type is used: autonomous AP → trunk, lightweight AP → access (usually). Flashcard this connection pattern.",
      effort: "low",
      meta: "Quick concept. Know the port type difference between autonomous and lightweight AP connections to the switch."
    }
  },

  "2.7.b": {
    info: "The WLC connects to the switch via a trunk port because it needs to carry traffic for all WLANs (each mapped to a different VLAN). CAPWAP data from lightweight APs arrives at the WLC, which then de-encapsulates it and places it on the appropriate VLAN via the trunk. The WLC also has a management interface VLAN for its own management traffic.",
    visual: { type: "packet-flow", params: { nodes: ["WLC", "Trunk (all WLAN VLANs)", "Distribution Switch"], color: "#8b5cf6" } },
    hack: {
      memory: "WLC connects via trunk because it handles ALL WLANs = ALL VLANs. One trunk carries everything. The WLC is the VLAN traffic cop for wireless.",
      practice: "Know: WLC always connects to trunk port. The trunk carries management VLAN + all WLAN VLANs. Simple but important physical connection fact.",
      effort: "low",
      meta: "Straightforward exam point: WLC = trunk port to switch. This comes up in 'which port type?' questions."
    }
  },

  "2.7.c": {
    info: "LAG (Link Aggregation Group) bundles multiple physical uplinks from the WLC to the switch into one logical connection for increased bandwidth and redundancy — same concept as EtherChannel but in the wireless context. Cisco WLCs support LAG to combine their Ethernet ports. If one physical link fails, traffic redistributes across remaining links automatically.",
    visual: { type: "packet-flow", params: { nodes: ["WLC (4 ports)", "LAG (bonded)", "Switch (port-channel)"], color: "#f59e0b" } },
    hack: {
      memory: "LAG for WLC = EtherChannel for switches. Same concept: bundle links for bandwidth + redundancy. WLC word is LAG, switch word is EtherChannel/port-channel.",
      practice: "Know: LAG = bundled WLC uplinks. Same concept as EtherChannel. Provides redundancy and bandwidth aggregation. Quick flashcard.",
      effort: "low",
      meta: "Simple association: LAG on WLC = EtherChannel on switch. If the exam asks about WLC redundant connectivity, think LAG."
    }
  },

  "2.7.d": {
    info: "Access Points are typically powered via PoE (Power over Ethernet) from the switch — no separate power adapter needed. The switch PSE (Power Sourcing Equipment) detects the AP as a PD (Powered Device) and delivers power. Most standard APs need PoE (802.3af, 15.4W) or PoE+ (802.3at, 30W). High-performance APs with multiple radios or external antennas may require PoE+ or PoE++ (802.3bt).",
    visual: {
      type: "packet-flow",
      params: { nodes: ["PoE Switch (PSE)", "Ethernet + Power", "AP (Powered Device)"], color: "#10b981" }
    },
    hack: {
      memory: "PoE for APs = one cable for data AND power. No electrician needed at the ceiling where APs are mounted. 802.3af for basic APs, 802.3at for beefy APs.",
      practice: "Know: most APs use PoE or PoE+. The switch must support the required PoE standard. If an AP won't power on, check the switch's PoE budget.",
      effort: "low",
      meta: "Connects back to topic 1.1.h (PoE standards). Know that APs are the most common PoE-powered devices and which standard they need."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     2.8 — Network device management access
  ══════════════════════════════════════════════════════════════ */

  "2.8.a": {
    info: "Console access is out-of-band management — it uses a physical cable (RJ-45 rollover cable or USB-mini) connected directly to the device's console port. It doesn't require network connectivity, making it the only way to access a device with no IP configuration or during initial setup. Default settings: 9600 baud, 8 data bits, no parity, 1 stop bit, no flow control (9600 8-N-1).",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Console (Out-of-Band)", items: ["Physical cable (RJ-45/USB)", "No network needed", "Initial setup / recovery", "9600 8-N-1 defaults"] },
        right: { label: "In-Band (Network)", items: ["SSH, Telnet, HTTP/S", "Requires IP connectivity", "Remote management", "Encrypted (SSH) or not (Telnet)"] }
      }
    },
    hack: {
      memory: "Console = umbilical cord. Direct physical connection, works even when the network is completely down. It's how you birth a new device (initial config). 9600-8-N-1 = the dial-up of networking.",
      practice: "Know: console = out-of-band, physical, no network required. SSH/Telnet = in-band, remote, requires network. Console is for initial setup and recovery.",
      effort: "low",
      meta: "The exam asks 'how do you access a device with no IP configuration?' → Console. Know the default serial settings (9600 8-N-1)."
    }
  },

  "2.8.b": {
    info: "Telnet uses TCP port 23 and transmits ALL data in plaintext — including usernames and passwords. It provides remote CLI access to network devices but is inherently insecure. Anyone capturing traffic on the network can read Telnet credentials. Telnet should never be used in production — always use SSH instead. Configured with 'line vty 0 15' and 'transport input telnet' (or 'transport input all').",
    visual: {
      type: "packet-flow",
      params: { nodes: ["Admin PC", "Telnet (TCP 23, PLAINTEXT!)", "Router/Switch"], color: "#ef4444" }
    },
    hack: {
      memory: "Telnet = sending your password on a postcard. Anyone can read it. SSH = sending your password in a locked box. Always use the locked box.",
      practice: "Know: Telnet = TCP 23, plaintext, insecure, legacy. SSH = TCP 22, encrypted, secure, recommended. The exam asks which is more secure — always SSH.",
      effort: "low",
      meta: "If the exam asks about remote management security, Telnet is always the wrong answer for production. Know it exists but recommend SSH."
    }
  },

  "2.8.c": {
    info: "SSH (Secure Shell) uses TCP port 22 and encrypts all traffic — including authentication credentials. It provides the same remote CLI access as Telnet but with strong encryption. SSH v2 is the standard (v1 has vulnerabilities). Requires: hostname, domain name, RSA key pair, local user account, and 'transport input ssh' on VTY lines. Configure with 'crypto key generate rsa' and 'ip ssh version 2'.",
    visual: {
      type: "shield",
      params: {
        items: ["TCP port 22", "Encrypted session (all data)", "RSA key pair required", "SSH v2 recommended", "transport input ssh on VTY"],
        color: "#10b981"
      }
    },
    hack: {
      memory: "SSH = Secure SHell = port 22 = always the right answer for remote CLI management. Config recipe: hostname + domain + crypto key + user + SSH on VTY.",
      practice: "Configure SSH on a router from scratch in Packet Tracer: set hostname, domain name, generate RSA key (2048 bits), create local user, set VTY to SSH only. Test connection.",
      effort: "medium",
      meta: "SSH configuration is a common exam simlet. Practice the full config sequence until you can do it from memory. Know all prerequisites (hostname, domain, RSA key)."
    }
  },

  "2.8.d": {
    info: "HTTP (port 80, unencrypted) and HTTPS (port 443, encrypted with TLS) provide web-based GUI management for network devices. Cisco devices can run a built-in web server for configuration via a browser. HTTPS is preferred over HTTP for the same reason SSH is preferred over Telnet — encryption. Enable with 'ip http server' (HTTP) or 'ip http secure-server' (HTTPS).",
    visual: {
      type: "comparison",
      params: {
        left: { label: "HTTP (Port 80)", items: ["Web GUI access", "Plaintext", "Insecure", "ip http server"] },
        right: { label: "HTTPS (Port 443)", items: ["Web GUI access", "TLS encrypted", "Secure", "ip http secure-server"] }
      }
    },
    hack: {
      memory: "HTTP vs HTTPS = same difference as Telnet vs SSH. HTTP = postcard (plaintext). HTTPS = locked box (encrypted). The 'S' = Secure in both HTTPS and SSH.",
      practice: "Know: HTTP=80=unencrypted, HTTPS=443=encrypted. For device management, prefer HTTPS. Conceptual only — the exam won't ask you to configure the web GUI.",
      effort: "low",
      meta: "Quick association: insecure pair (Telnet/HTTP) vs secure pair (SSH/HTTPS). Know the ports and that the secure versions are always preferred."
    }
  },

  "2.8.e": {
    info: "TACACS+ (Terminal Access Controller Access-Control System Plus) is a Cisco-developed AAA protocol using TCP port 49. It encrypts the entire packet body (full encryption), separates authentication, authorization, and accounting into distinct functions (more granular control), and supports per-command authorization. Ideal for network device management where you need granular control over what each admin can do.",
    visual: {
      type: "shield",
      params: {
        items: ["TCP port 49", "Full packet encryption", "Separate AAA functions", "Per-command authorization", "Cisco-developed"],
        color: "#3b82f6"
      }
    },
    hack: {
      memory: "TACACS+ = 'TAC-ticAl Control' — military-grade, full encryption, granular control. TCP 49 (reliable). Cisco's choice for managing network devices.",
      practice: "Compare TACACS+ to RADIUS in a table: port, protocol, encryption scope, AAA separation, best use case. Flashcard the comparison.",
      effort: "low",
      meta: "TACACS+ vs RADIUS comparison is a guaranteed exam topic. Know: TACACS+ = TCP, full encryption, separate AAA, network device management."
    }
  },

  "2.8.f": {
    info: "RADIUS (Remote Authentication Dial-In User Service) is an open-standard AAA protocol using UDP ports 1812 (authentication) and 1813 (accounting). It encrypts only the password in the access-request packet (not the entire payload), combines authentication and authorization into one function, and is widely used for network access control (802.1X, VPN, Wi-Fi authentication). Supported by all vendors.",
    visual: {
      type: "shield",
      params: {
        items: ["UDP 1812/1813", "Password-only encryption", "Combined auth + authz", "Open standard (multi-vendor)", "Best for network access (802.1X, Wi-Fi)"],
        color: "#f59e0b"
      }
    },
    hack: {
      memory: "RADIUS = 'Radio Access (RADIUS)' — open standard for user access. UDP 1812/1813 (fast). Encrypts only the password. Used for Wi-Fi/VPN/802.1X authentication.",
      practice: "Know: RADIUS = UDP, password-only encryption, combined auth+authz, open standard, network access control. TACACS+ = TCP, full encryption, separate AAA, device management.",
      effort: "low",
      meta: "TACACS+ vs RADIUS: TACACS+=device management, RADIUS=user access control. Know which scenario calls for which protocol."
    }
  },

  "2.8.g": {
    info: "Cloud-managed devices (Cisco Meraki, DNA Center via cloud) are managed through a cloud-based dashboard accessible from any browser. Configuration, monitoring, firmware updates, and troubleshooting happen centrally in the cloud. No on-site management infrastructure needed (for Meraki). Zero-touch provisioning allows devices to auto-configure by connecting to the cloud. Requires internet connectivity and typically a subscription license.",
    visual: { type: "packet-flow", params: { nodes: ["Admin (Browser)", "Cloud Dashboard (HTTPS)", "Network Devices"], color: "#10b981" } },
    hack: {
      memory: "Cloud-managed = manage your network from a beach. Just need a browser and internet. Meraki = cloud-native, DNA Center = can have cloud integration. Both = no CLI needed for daily ops.",
      practice: "Know: cloud-managed = browser-based, subscription-required, zero-touch deployment, internet-dependent. Compare to on-prem management (WLC, CLI). Flashcard only.",
      effort: "low",
      meta: "Concept-only exam topic. Know the benefits (simplicity, zero-touch) and requirements (internet, subscription). One or two questions max."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     2.9 — Wireless LAN GUI configuration
  ══════════════════════════════════════════════════════════════ */

  "2.9.a": {
    info: "Creating a WLAN on the WLC involves setting: WLAN name (internal identifier), SSID (what clients see), and WLAN ID (numeric identifier, 1-512). The SSID is broadcast in AP beacons and is how users find and connect to the network. One WLC can support multiple WLANs, each with different security settings and VLAN mappings. The WLAN must be enabled after creation to be operational.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "WLAN Settings", items: ["Profile Name (internal)", "SSID (user-visible)", "WLAN ID (1-512)", "Status: Enabled/Disabled"] },
        right: { label: "Example", items: ["Name: Corporate-WiFi", "SSID: CorpNet", "ID: 1", "Status: Enabled"] }
      }
    },
    hack: {
      memory: "WLAN creation = naming your Wi-Fi network. Profile name = what IT calls it. SSID = what users see on their phone. ID = the internal number. Like naming a store vs its address vs its franchise number.",
      practice: "In Packet Tracer's WLC interface, create a new WLAN with a name, SSID, and ID. Enable it and verify clients can see the SSID. Simple GUI exercise.",
      effort: "medium",
      meta: "Know the three identifiers (profile name, SSID, WLAN ID) and that the WLAN must be enabled. The exam may show the WLC GUI."
    }
  },

  "2.9.b": {
    info: "WLC security settings define how clients authenticate and how traffic is encrypted. Common configurations: WPA+WPA2 mode with AES cipher (CCMP). Authentication can be PSK (Pre-Shared Key — a password everyone shares) or 802.1X (enterprise — each user has unique credentials via RADIUS). PSK is simpler but less secure; 802.1X provides per-user authentication and is standard for enterprise deployments.",
    visual: {
      type: "comparison",
      params: {
        left: { label: "PSK (Personal)", items: ["Shared password", "Simple setup", "Small office/home", "No RADIUS needed"] },
        right: { label: "802.1X (Enterprise)", items: ["Per-user credentials", "RADIUS server required", "Enterprise standard", "Dynamic key per user"] }
      }
    },
    hack: {
      memory: "PSK = everyone knows the WiFi password (like your home network). 802.1X = everyone logs in with their own username/password (like corporate Wi-Fi). PSK = personal, 802.1X = enterprise.",
      practice: "On the WLC GUI, configure a WLAN with WPA2+AES+PSK. Then create another with WPA2+AES+802.1X. Know the configuration path and the difference.",
      effort: "medium",
      meta: "The exam asks when to use PSK vs 802.1X. Answer: PSK for small/simple, 802.1X for enterprise. Know that WPA2+AES is the standard cipher."
    }
  },

  "2.9.c": {
    info: "Each WLAN on the WLC is mapped to a specific VLAN through an interface (dynamic interface). This determines which network segment wireless clients land on after connecting to a particular SSID. Example: 'Corporate' SSID → VLAN 10, 'Guest' SSID → VLAN 20. The WLC's trunk to the switch carries all these VLANs. Interface mapping is configured in the WLAN settings on the WLC.",
    visual: {
      type: "hierarchy",
      params: {
        root: "WLC",
        children: [
          { name: "WLAN: Corporate → VLAN 10", children: [{ name: "Employees" }] },
          { name: "WLAN: Guest → VLAN 20", children: [{ name: "Visitors" }] },
          { name: "WLAN: IoT → VLAN 30", children: [{ name: "Sensors/Cameras" }] }
        ]
      }
    },
    hack: {
      memory: "WLAN-to-VLAN mapping = each Wi-Fi network has its own neighborhood (VLAN). Corporate employees go to their neighborhood, guests go to theirs. The WLC is the traffic director.",
      practice: "Create two WLANs mapped to different VLANs on the WLC. Connect clients to each and verify they get IPs from the correct DHCP scope (different subnet per VLAN).",
      effort: "medium",
      meta: "The concept of SSID → VLAN mapping is important. Know that this is how wireless traffic segmentation works — each SSID maps to a VLAN."
    }
  },

  "2.9.d": {
    info: "WLC QoS profiles prioritize traffic from different WLANs: Platinum (Voice — highest priority, ensures low latency for VoIP), Gold (Video — high priority for streaming/conferencing), Silver (Best Effort — default, standard data traffic), Bronze (Background — lowest priority, bulk transfers/updates). Each WLAN is assigned a QoS profile. The WLC marks traffic with the appropriate DSCP/CoS values.",
    visual: {
      type: "state-machine",
      params: {
        states: ["Platinum (Voice)", "Gold (Video)", "Silver (Best Effort)", "Bronze (Background)"],
        active: 0,
        transitions: false
      }
    },
    hack: {
      memory: "Precious metals = priority order. Platinum > Gold > Silver > Bronze. Platinum = voice (most critical, needs low latency). Bronze = background (downloads can wait).",
      practice: "Memorize: Platinum=Voice, Gold=Video, Silver=Best Effort (default), Bronze=Background. Know the priority order from highest to lowest.",
      effort: "low",
      meta: "Simple memorization. The exam asks which QoS profile to assign to a VoIP WLAN — answer: Platinum. Default for data WLANs = Silver."
    }
  },

  "2.9.e": {
    info: "Advanced WLAN settings include: Client Exclusion (automatically blocks clients that fail authentication too many times — prevents brute-force attacks), Peer-to-Peer (P2P) Blocking (prevents wireless clients from communicating directly with each other — security measure for guest networks), and Session Timeout (forces re-authentication after a specified time — ensures credentials are still valid). These are configured per-WLAN on the WLC.",
    visual: {
      type: "shield",
      params: {
        items: ["Client Exclusion — block after auth failures", "P2P Blocking — prevent client-to-client traffic", "Session Timeout — force re-authentication", "Configured per-WLAN on WLC"],
        color: "#8b5cf6"
      }
    },
    hack: {
      memory: "Client exclusion = three strikes and you're out (failed logins). P2P blocking = no talking to other guests (isolation). Session timeout = re-check your ID every X hours.",
      practice: "Know what each setting does and when to use it. Guest networks: enable P2P blocking + session timeout. All networks: enable client exclusion. Flashcard the use cases.",
      effort: "low",
      meta: "Concept-level questions. Know what each feature does and the typical use case (guest networks especially). Not heavily tested but appears as answer options."
    }
  }

};
