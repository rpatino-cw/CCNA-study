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
    info: "<p>The <strong>two-tier (collapsed core)</strong> architecture merges the core and distribution layers into a single layer of switches that connect directly to access-layer switches below. This design is used in <strong>small to medium campus networks</strong> (typically fewer than a few hundred users or a few access switches) where a dedicated, high-speed core layer would be over-engineered and unnecessarily expensive.</p><p>In a two-tier design, the <strong>collapsed core/distribution switches</strong> perform all the duties that would be split across two layers in a three-tier model: inter-VLAN routing (using SVIs or routed interfaces), policy enforcement (ACLs, QoS marking), aggregation of access-layer uplinks, default gateway redundancy (HSRP/VRRP), and high-speed backbone forwarding. These switches are typically Layer 3 capable (e.g., Cisco Catalyst 3850, 9300, or 9500 series) and are deployed in pairs with redundant links for high availability.</p><p>The <strong>access layer</strong> remains the same as in three-tier: Layer 2 switches that connect directly to endpoints (PCs, phones, printers, APs). Access switches enforce port-level security (802.1X, port security, DHCP snooping) and uplink to the collapsed core via trunk or routed links.</p><p><strong>Advantages:</strong> lower cost (fewer switches), simpler management (fewer layers to troubleshoot), reduced latency (fewer hops between endpoints), and faster deployment. <strong>Disadvantages:</strong> limited scalability (adding more access switches eventually overwhelms the collapsed core), potential performance bottlenecks under heavy load, and less fault isolation compared to a full three-tier design.</p><p>The decision between two-tier and three-tier is based on <strong>network size and growth projections</strong>. If the campus has a single building or a small multi-building site with fewer than ~200 users and growth is limited, two-tier is appropriate. If the network spans multiple buildings with thousands of users and is expected to grow, three-tier is the better choice. Many organizations start with two-tier and migrate to three-tier as they grow.</p>",
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
      memory: "Two-tier = two-story building. Ground floor (access) and penthouse (core+distribution combined). Small enough that you don't need a middle floor. Think of a small company in one building -- they don't need a skyscraper's elevator system, just stairs.",
      practice: "In Packet Tracer: build a two-tier network with 2 collapsed core/distribution L3 switches and 4 access switches. Configure SVIs on the L3 switches for inter-VLAN routing. Uplink each access switch to both L3 switches for redundancy. Assign VLANs and verify inter-VLAN routing with 'show ip route'. Then draw the same topology on paper, labeling each layer.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 24 (LAN Architecture) covers two-tier vs three-tier in detail. The exam asks scenario-based questions: 'A small office with 50 users needs a campus design -- which architecture?' Answer: two-tier. Wendell Odom OCG Chapter 11 covers campus LAN design. Draw both architectures on paper until you can reproduce them from memory."
    }
  },

  "1.2.b": {
    info: "<p>The <strong>three-tier (hierarchical) architecture</strong> is the traditional enterprise campus design defined by Cisco, consisting of three distinct layers: <strong>Access</strong>, <strong>Distribution</strong>, and <strong>Core</strong>. Each layer has a specific role, and this separation of functions makes the network scalable, resilient, and easier to troubleshoot. Three-tier designs can support thousands of endpoints across multiple buildings.</p><p>The <strong>Access Layer</strong> is the edge of the network where endpoints connect. Access switches (typically Layer 2, e.g., Catalyst 9200, 2960) provide port-level connectivity to PCs, phones, printers, and APs. Access-layer responsibilities include: VLAN assignment per port, PoE delivery, 802.1X authentication, port security, DHCP snooping, Dynamic ARP Inspection (DAI), and QoS marking of traffic at the trust boundary. Each access switch uplinks to one or two distribution switches for redundancy.</p><p>The <strong>Distribution Layer</strong> aggregates traffic from multiple access switches and enforces network policy. Distribution switches are Layer 3 capable (e.g., Catalyst 9300, 9500) and perform: inter-VLAN routing via SVIs, access control lists (ACLs) for traffic filtering, QoS policy enforcement, route summarization toward the core, default gateway redundancy using HSRP or VRRP, and STP root bridge placement. Distribution switches are deployed in pairs for redundancy, with each access switch dual-homed to both distribution switches.</p><p>The <strong>Core Layer</strong> is the high-speed backbone that interconnects distribution blocks. Core switches (e.g., Catalyst 9500, 9600, Nexus series) are optimized for fast, reliable packet forwarding with minimal latency. The core should <strong>never perform packet manipulation</strong> -- no ACLs, no QoS remarking, no policy enforcement. It is pure high-speed transit. Core switches typically use 10G, 40G, or 100G links and are deployed in pairs with equal-cost redundant paths. If any single core switch fails, the network reroutes around it instantly.</p><p><strong>Key design principles:</strong> each layer has a clear function (separation of concerns), redundancy is built in at every layer (no single point of failure), scalability is achieved by adding more distribution blocks without redesigning the core, and troubleshooting is simplified because you can isolate problems to a specific layer. The three-tier model is the foundation for all Cisco campus design discussions on the CCNA exam.</p>",
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
      memory: "Three-tier = airport. Access = check-in desks (user-facing, gives you your boarding pass/VLAN). Distribution = security checkpoint (enforces policy, routes you to the right terminal/VLAN). Core = the runway (pure speed, no stopping, no checking bags again). Remember: Access-Distribution-Core = ADC = 'A Defined Campus.'",
      practice: "In Packet Tracer: build a three-tier topology with 2 core switches, 2 distribution switches, and 4 access switches. Configure the distribution layer as L3 with SVIs for inter-VLAN routing. Use trunk links between access and distribution. Use routed links (L3 point-to-point) between distribution and core. Run OSPF between distribution and core. Verify with 'show ip route' that all VLANs are reachable end-to-end. Draw the topology on paper and label every layer, switch role, and link type.",
      effort: "high",
      meta: "Jeremy's IT Lab Day 24 (LAN Architecture) covers this in depth. Wendell Odom OCG Chapter 11 (LAN Architecture) is the definitive written reference. The exam tests layer functions -- expect questions like 'Which layer performs inter-VLAN routing?' (Distribution) or 'Which layer should NOT filter traffic?' (Core). Draw the three-tier model on paper every day during study. David Bombal also has excellent three-tier design labs on YouTube."
    }
  },

  "1.2.c": {
    info: "<p>The <strong>spine-leaf architecture</strong> is a two-tier data center network fabric designed for modern workloads that generate heavy <strong>east-west traffic</strong> (server-to-server within the data center) rather than traditional north-south traffic (client-to-server through a core). In a spine-leaf design, every <strong>leaf switch connects to every spine switch</strong>, and every spine switch connects to every leaf switch, creating a full mesh of equal-cost paths between any two leaf switches.</p><p><strong>Leaf switches</strong> (also called ToR -- Top of Rack) sit at the access layer and connect directly to servers, storage, and other devices. Each server connects to one or two leaf switches. Leaf switches do NOT connect to other leaf switches. <strong>Spine switches</strong> form the backbone and only connect to leaf switches -- never to other spines, never to servers. This strict connection rule ensures predictable, uniform behavior.</p><p>The key advantage is <strong>predictable latency</strong>: traffic between any two servers on different leaf switches always crosses exactly <strong>one spine switch (two hops)</strong> -- leaf to spine, spine to leaf. There is no variable-depth tree to traverse. This predictability is critical for latency-sensitive applications like distributed databases, VM migration, and storage replication. Adding capacity is simple: add more leaf switches for more server ports, add more spine switches for more bandwidth between leaves.</p><p>Spine-leaf uses <strong>ECMP (Equal-Cost Multi-Path)</strong> routing instead of Spanning Tree Protocol. Since every leaf-to-spine path has the same cost, Layer 3 routing protocols (typically BGP or OSPF in the underlay) can load-balance traffic across all spines simultaneously. This eliminates STP's biggest weakness: blocking redundant links. In a three-tier design with STP, redundant links are blocked (wasted); in spine-leaf, all links are active.</p><p>Spine-leaf is typically paired with <strong>VXLAN (Virtual Extensible LAN)</strong> as the overlay protocol to extend Layer 2 segments across the Layer 3 routed fabric. This combination allows VMs to move between any servers in the fabric while maintaining their IP and MAC addresses. Cisco's implementation is called <strong>VXLAN EVPN</strong>, often deployed with ACI (Application Centric Infrastructure) or standalone Nexus switches.</p><p><strong>When to use spine-leaf vs three-tier:</strong> Spine-leaf is for data centers with heavy east-west traffic (virtualized, cloud, containerized workloads). Three-tier is for campus networks with mostly north-south traffic (users accessing centralized servers). The CCNA exam expects you to know which topology fits which environment.</p>",
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
      memory: "Spine-leaf = every leaf touches every spine -- like a rib cage. Spine = backbone (connects only to leaves), leaves = ribs (connect only to spines + servers). Always exactly 2 hops between any two servers on different leaves. East-west = lateral (server-to-server) traffic. North-south = vertical (client-to-server) traffic. Spine-leaf optimizes east-west.",
      practice: "Draw a spine-leaf with 2 spines and 4 leaves on paper. Draw ALL connections (every leaf to every spine = 8 links total). Label two servers on different leaves and trace the path -- always leaf-spine-leaf (2 hops). Now draw a three-tier campus and count hops between two PCs -- it varies by position. Compare the predictability. Then research: how would you add capacity? More leaves = more ports, more spines = more bandwidth.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 24 briefly covers spine-leaf. Wendell Odom OCG Chapter 11 discusses data center architectures. The CCNA exam tests the concept, not configuration. Key phrases to know: 'east-west traffic,' 'predictable latency,' 'ECMP replaces STP,' and '2 hops between any leaf pair.' If a question describes a data center with heavy server-to-server traffic and asks for the best topology, the answer is spine-leaf."
    }
  },

  "1.2.d": {
    info: "<p>A <strong>WAN (Wide Area Network)</strong> connects geographically separated sites -- branch offices, data centers, headquarters, and remote workers -- over distances that LANs cannot cover. WAN links operate over public or private infrastructure provided by service providers (ISPs, telcos) and are typically <strong>slower, higher-latency, and more expensive</strong> than LAN connections. Understanding WAN technologies is fundamental to designing networks that span cities, countries, or continents.</p><p><strong>Key WAN technologies:</strong></p><ul><li><strong>MPLS (Multiprotocol Label Switching)</strong> -- A provider-managed, private WAN service. The ISP creates a virtual private network between your sites using label switching (not IP routing). MPLS provides <strong>guaranteed SLAs</strong> (bandwidth, latency, jitter), QoS support, and any-to-any site connectivity. It is reliable but expensive. Common MPLS service types: L3 VPN (provider routes between sites) and L2 VPN (provider provides L2 connectivity between sites).</li><li><strong>Metro Ethernet</strong> -- Ethernet-based WAN service within a metro area. The provider extends Ethernet connectivity between sites, making the WAN look like a large LAN. Types include E-Line (point-to-point), E-LAN (multipoint-to-multipoint), and E-Tree (hub-and-spoke). Simple, scalable, and typically cheaper than MPLS within a metro.</li><li><strong>Broadband (DSL/Cable/Fiber)</strong> -- Consumer/business-grade internet access. DSL runs over phone lines (ADSL: asymmetric speeds), cable runs over coax (DOCSIS), and fiber (FTTH/FTTP) provides the highest speeds. Broadband is cheap but has no SLA guarantees and variable performance. Often used as backup or for SD-WAN underlays.</li><li><strong>Leased Lines (T1/T3, E1/E3)</strong> -- Dedicated point-to-point circuits with guaranteed bandwidth. T1 = 1.544 Mbps, T3 = 44.736 Mbps. Legacy technology, expensive for the bandwidth, being replaced by Metro Ethernet and MPLS.</li><li><strong>SD-WAN (Software-Defined WAN)</strong> -- The modern approach. SD-WAN creates an encrypted overlay network across multiple transport types (MPLS, broadband, LTE) and uses a centralized controller to make intelligent path decisions based on application requirements and real-time link quality. Benefits: lower cost (uses cheap internet links), application-aware routing, centralized management, and transport independence. Cisco SD-WAN (Viptela) is the Cisco product. SD-WAN is rapidly replacing MPLS as the primary WAN technology.</li></ul><p><strong>Key concepts:</strong> <strong>CPE (Customer Premises Equipment)</strong> is the router at the customer site. The <strong>demarcation point (demarc)</strong> is where the provider's responsibility ends and the customer's begins. WAN links can be <strong>dedicated</strong> (leased line -- you get the full bandwidth) or <strong>shared</strong> (MPLS, broadband -- you share infrastructure with other customers).</p>",
    visual: { type: "packet-flow", params: { nodes: ["Branch Office", "WAN / Internet", "HQ Data Center"], color: "#ef4444" } },
    hack: {
      memory: "WAN = highways between cities. LAN = streets within a city. MPLS = toll road (guaranteed speed, SLA, costs more). SD-WAN = smart GPS app that routes you across free highways and toll roads, always picking the fastest path. Metro Ethernet = city bus system (Ethernet in the metro area). Leased line = private road (dedicated but expensive and slow). Broadband = public highway (cheap but no guarantees).",
      practice: "Create a comparison table with columns for each WAN technology: MPLS, Metro Ethernet, Broadband, Leased Line, SD-WAN. Rows: cost, speed, SLA, management, use case. Know that SD-WAN can use multiple transport types simultaneously (MPLS + broadband) and chooses the best path per application. Draw a diagram showing a headquarters connected to three branch offices using different WAN links.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 53 (WAN Architectures) covers WAN technologies. Wendell Odom OCG Chapter 14 covers WAN concepts. The CCNA tests concepts, not configuration. Expect questions like 'which WAN technology provides guaranteed SLAs?' (MPLS) or 'which reduces WAN costs by using internet links?' (SD-WAN). Focus on MPLS vs SD-WAN -- this is the most important comparison for the exam. Know that SD-WAN is Cisco's strategic direction."
    }
  },

  "1.2.e": {
    info: "<p>A <strong>SOHO (Small Office/Home Office)</strong> network is a simple, flat network topology designed for very small environments -- typically 1-10 users in a home, apartment, or small office. The defining characteristic is a single <strong>all-in-one device</strong> (often called a wireless router or home gateway) that combines multiple network functions into one box: <strong>router</strong> (routes between LAN and WAN), <strong>switch</strong> (4-8 Ethernet ports), <strong>wireless access point</strong> (802.11 Wi-Fi), <strong>firewall</strong> (basic stateful packet filtering), <strong>DHCP server</strong> (assigns IPs to LAN devices), and <strong>NAT gateway</strong> (translates private LAN IPs to the single public IP from the ISP).</p><p>SOHO networks typically consist of a <strong>single subnet</strong> and a <strong>single broadcast domain</strong>. There are no VLANs, no inter-VLAN routing, no distribution or core layers -- just one flat network segment. The ISP provides a public IP address (or a small block) to the SOHO router's WAN interface, and the router uses <strong>PAT (Port Address Translation)</strong> to allow all internal devices to share that single public IP. Common SOHO address schemes: 192.168.0.0/24, 192.168.1.0/24, or 10.0.0.0/24.</p><p>The <strong>ISP connection</strong> typically comes via DSL (phone line), cable (coax), fiber (FTTH), or cellular (4G/5G). The ISP may provide a modem that connects to the SOHO router's WAN port, or the modem and router may be combined into a single device (gateway). Security features are basic: WPA2/WPA3 for Wi-Fi encryption, simple firewall rules, and MAC filtering (which is not true security).</p><p><strong>SOHO vs Enterprise:</strong> SOHO networks have no redundancy, no Layer 3 switching, no advanced routing protocols, no centralized management, and no QoS policies. They are designed for simplicity and low cost, not scalability or high availability. If the SOHO router fails, the entire network goes down. This is acceptable for a home but not for a business with critical applications.</p><p>For the CCNA exam, know that SOHO represents the <strong>simplest possible topology</strong> -- a single device providing all network services, a flat single-subnet design, NAT for internet access, and no enterprise features. When the exam describes a network with 'a single wireless router serving 5 users at home,' that is a SOHO network.</p>",
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
      memory: "SOHO = Swiss Army knife of networking. One box does everything: Route, Switch, Wi-Fi, Firewall, DHCP, NAT. Think of your home router -- that IS a SOHO network. Flat = one subnet, one broadcast domain, one device. SOHO vs Enterprise = bicycle vs fleet of trucks.",
      practice: "Draw a SOHO network diagram: ISP cloud connects to a modem, modem connects to the SOHO router/AP, router connects to 3-5 devices (PC, phone, laptop, printer, smart TV). Label the single subnet (192.168.1.0/24), the public IP on the WAN interface, and NAT happening at the router. Compare this to a two-tier enterprise drawing. The contrast should be stark -- SOHO is one device, enterprise is a hierarchy.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 24 briefly mentions SOHO in the context of network architectures. This is a free-point exam topic. If the question describes a small flat network with one device doing everything, the answer is SOHO. Know that SOHO uses NAT/PAT (one public IP shared by all devices) and has no redundancy, VLANs, or advanced features. Wendell Odom OCG Chapter 11 covers SOHO in the campus design chapter."
    }
  },

  "1.2.f": {
    info: "<p><strong>On-premises (on-prem)</strong> infrastructure means the organization owns, operates, and physically hosts all network equipment, servers, storage, and software in its own facilities (data centers, server rooms, wiring closets). The organization has <strong>complete control</strong> over every aspect: hardware selection, software versions, security policies, physical access, and data sovereignty. However, this control comes with significant responsibility and cost.</p><p><strong>On-prem characteristics:</strong> <strong>CapEx-heavy</strong> (Capital Expenditure -- large upfront investments in hardware, facilities, and installation), requires in-house IT staff for maintenance and troubleshooting, full responsibility for security (physical and logical), fixed capacity (scaling requires purchasing and installing new hardware, which takes weeks to months), and potential for hardware underutilization (you size for peak load but may only use 20% of capacity on average).</p><p><strong>Cloud</strong> infrastructure is hosted, operated, and managed by a third-party provider (AWS, Microsoft Azure, Google Cloud Platform). The organization rents compute, storage, networking, and services on demand. Cloud follows an <strong>OpEx model</strong> (Operational Expenditure -- ongoing monthly/hourly charges instead of large upfront purchases). Key cloud service models:</p><ul><li><strong>IaaS (Infrastructure as a Service)</strong> -- Provider manages physical hardware and virtualization; you manage OS, apps, and data (e.g., AWS EC2, Azure VMs). Most flexibility, most management responsibility.</li><li><strong>PaaS (Platform as a Service)</strong> -- Provider manages hardware + OS + runtime; you manage the application and data (e.g., AWS Elastic Beanstalk, Google App Engine). Less management overhead.</li><li><strong>SaaS (Software as a Service)</strong> -- Provider manages everything; you just use the application (e.g., Microsoft 365, Salesforce, Gmail). Least management, least customization.</li></ul><p>The <strong>shared responsibility model</strong> defines who is responsible for what: the provider secures the infrastructure (physical data centers, hypervisors, network fabric), and the customer secures their data, access controls, and application configurations. The exact split depends on the service model (IaaS vs PaaS vs SaaS).</p><p><strong>Hybrid cloud</strong> combines on-prem and cloud: sensitive workloads stay on-prem for compliance, while elastic workloads burst to the cloud for scalability. Many enterprise networks use hybrid architectures, connecting on-prem data centers to cloud providers via VPN or dedicated connections (AWS Direct Connect, Azure ExpressRoute).</p>",
    visual: {
      type: "comparison",
      params: {
        left: { label: "On-Premises", items: ["Full control", "High CapEx", "Own maintenance", "Physical security"] },
        right: { label: "Cloud", items: ["Provider-managed", "OpEx model", "Elastic scaling", "Shared responsibility"] }
      }
    },
    hack: {
      memory: "On-prem = owning a house (you fix the plumbing, mow the lawn, pay the mortgage upfront = CapEx). Cloud = renting an apartment (landlord fixes the plumbing = shared responsibility, monthly rent = OpEx, upgrade to bigger unit anytime = elastic scaling). Hybrid = owning a house but renting a storage unit for overflow. Service models stair-step: IaaS (you manage a lot) → PaaS (you manage less) → SaaS (you manage nothing).",
      practice: "Create a table with three columns: On-Prem, Cloud, Hybrid. Rows: cost model (CapEx/OpEx), scaling (fixed/elastic), control (full/shared), staff needs (high/low), examples. Then create a second table for IaaS vs PaaS vs SaaS with rows: what provider manages, what you manage, and examples. Flashcard both tables.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 53 covers cloud and on-prem concepts. Wendell Odom OCG Chapter 14 discusses WAN and cloud architectures. Expect 1-2 CCNA questions testing: CapEx vs OpEx, IaaS vs PaaS vs SaaS, and the shared responsibility model. Know that 'elastic scaling' is the cloud's biggest advantage, and 'full control' is on-prem's biggest advantage. These are free points if you memorize the trade-offs."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     1.3 — Compare physical interface and cabling types
  ══════════════════════════════════════════════════════════════ */

  "1.3.a": {
    info: "<p>Network cabling falls into two fundamental categories: <strong>fiber optic</strong> (transmits data as pulses of light through glass or plastic strands) and <strong>copper</strong> (transmits data as electrical signals over twisted pairs of copper wire). Each has distinct characteristics that determine where it is used in a network design.</p><p><strong>Single-Mode Fiber (SMF)</strong> uses a very small core diameter (<strong>8-10 microns</strong>, roughly the width of a human hair) that allows only a single ray (mode) of light to propagate. It uses <strong>laser transmitters</strong> (more expensive, more focused) and achieves distances of <strong>up to 100+ km</strong> depending on the optic and speed. SMF is identified by its <strong>yellow jacket</strong> and is used for long-distance WAN links, campus backbone connections between buildings, and any run exceeding the range of multimode. The connector types are typically LC (Lucent Connector, small form-factor) or SC (Subscriber Connector, square push-pull). SMF is more expensive per meter and requires more expensive optics, but it is the only option for long distances.</p><p><strong>Multimode Fiber (MMF)</strong> uses a larger core diameter (<strong>50 or 62.5 microns</strong>) that allows multiple rays (modes) of light to bounce through the core simultaneously. This causes <strong>modal dispersion</strong> -- the different modes arrive at slightly different times, which limits distance. MMF uses cheaper <strong>LED or VCSEL (Vertical-Cavity Surface-Emitting Laser)</strong> transmitters and supports distances up to <strong>~550m at 10 Gbps</strong> (OM3/OM4 fiber) or ~400m at 10G (OM3). MMF is identified by its <strong>orange jacket (OM1/OM2)</strong> or <strong>aqua jacket (OM3/OM4)</strong>. Used within data centers, between floors in a building, and for short backbone links. MMF is cheaper than SMF for short runs.</p><p><strong>Copper (UTP -- Unshielded Twisted Pair)</strong> uses electrical signals over four twisted pairs of copper wire. Maximum distance is <strong>100 meters (328 feet)</strong> regardless of category. Copper is the cheapest cabling option and is used at the access layer to connect endpoints. Common categories:</p><ul><li><strong>Cat5e</strong> -- supports 1 Gbps (1000BASE-T) at 100m. The minimum standard for modern networks.</li><li><strong>Cat6</strong> -- supports 1 Gbps at 100m or 10 Gbps at 55m. Better shielding reduces crosstalk.</li><li><strong>Cat6a</strong> -- supports 10 Gbps (10GBASE-T) at 100m. Required for full-distance 10G over copper.</li></ul><p><strong>SFP (Small Form-factor Pluggable)</strong> modules are hot-swappable transceivers that insert into switch/router ports to provide the correct optic for the cable type: <strong>SFP</strong> (1G), <strong>SFP+</strong> (10G), <strong>QSFP+</strong> (40G), <strong>QSFP28</strong> (100G). The SFP determines whether the port uses SMF, MMF, or copper (copper SFPs exist for short 10G runs). This modular approach lets you choose the right optic for each connection without changing the switch hardware.</p>",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Single-Mode Fiber", items: ["Small core (8-10um)", "Laser transmitter", "Long range (100+ km)", "More expensive", "Yellow jacket"] },
        right: { label: "Multimode Fiber", items: ["Large core (50/62.5um)", "LED/VCSEL", "Short range (~550m)", "Less expensive", "Orange/aqua jacket"] }
      }
    },
    hack: {
      memory: "Single-mode = sniper rifle (one focused laser beam, long range, expensive). Multimode = shotgun (multiple light modes bouncing, short range, cheaper). Copper = hand delivery (cheapest, local only, 100m max). Colors: Yellow = SMF (think gold = expensive = long range). Orange/Aqua = MMF (think sunset = medium range). Blue = Copper UTP. SFP = the adapter that plugs into the switch port and determines what cable type it accepts.",
      practice: "In Packet Tracer: connect two switches with a fiber link using the correct SFP modules. Build a comparison table on paper with 5 columns: Cable Type, Core Size, Light Source, Max Distance, Jacket Color, Use Case. Fill in for SMF, MMF (OM3), Cat5e, Cat6, Cat6a. Also create an SFP reference card: SFP=1G, SFP+=10G, QSFP+=40G, QSFP28=100G. Quiz yourself until instant.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 3 (Ethernet LAN Switching) and Day 4 cover cabling types. Wendell Odom OCG Chapter 2 covers Ethernet fundamentals including cable types. This is heavily tested -- expect 2-3 questions on cable types, distances, and colors. The r/ccna community recommends making a comparison table and memorizing it. Key gotcha: Cat6 supports 10G but only at 55m -- for full 100m 10G runs, you need Cat6a."
    }
  },

  "1.3.b": {
    info: "<p><strong>Ethernet shared media</strong> refers to legacy network topologies where multiple devices share the same physical transmission medium -- specifically hub-based networks and early coaxial (10BASE2/10BASE5) Ethernet. In shared media, all devices are in the <strong>same collision domain</strong>, meaning only one device can transmit at a time. If two devices transmit simultaneously, a <strong>collision</strong> occurs and both frames are destroyed. Devices use <strong>CSMA/CD (Carrier Sense Multiple Access with Collision Detection)</strong> to manage access: listen before transmitting, detect collisions, back off for a random time, then retry.</p><p>In a hub-based network, the hub is a Layer 1 device that simply repeats all incoming signals out all other ports. It has no intelligence -- it does not read MAC addresses or make forwarding decisions. Every frame is sent to every port, creating a single large collision domain and a single broadcast domain. Hubs force <strong>half-duplex</strong> operation because a device cannot send and receive simultaneously without collisions. As more devices are added, the collision rate increases and effective throughput decreases dramatically.</p><p><strong>Point-to-point Ethernet</strong> describes modern switched networks where each device has a dedicated connection to its own switch port. A Layer 2 switch creates a <strong>separate collision domain for each port</strong> -- this is called <strong>micro-segmentation</strong>. Because each link is a dedicated point-to-point connection between the device and the switch, there are no collisions, and the link can operate in <strong>full-duplex</strong> mode (simultaneous send and receive). This effectively doubles the throughput compared to half-duplex.</p><p>Modern enterprise LANs are entirely point-to-point. Hubs are obsolete and no longer manufactured. Every device connects to a switch port with a dedicated collision domain. The only collision domain concept that still matters in practice is the <strong>broadcast domain</strong>, which is bounded by the VLAN (all ports in a VLAN share one broadcast domain). Understanding the history of shared media helps you answer troubleshooting questions about half-duplex, collision counters, and CSMA/CD.</p><p><strong>Key distinction for the exam:</strong> Hub = shared media, one collision domain for all ports, half-duplex, CSMA/CD required. Switch = point-to-point, one collision domain per port, full-duplex, no CSMA/CD needed.</p>",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Shared Media (Hub)", items: ["One collision domain", "Half-duplex", "CSMA/CD required", "Legacy technology"] },
        right: { label: "Point-to-Point (Switch)", items: ["One collision domain per port", "Full-duplex", "No collisions", "Modern standard"] }
      }
    },
    hack: {
      memory: "Shared media (hub) = walkie-talkie channel (one talks at a time, everyone hears, collisions if two talk). Point-to-point (switch) = private phone call (dedicated line, both talk simultaneously = full-duplex). CSMA/CD = 'listen before you talk, stop if someone else is talking.' Micro-segmentation = each switch port is its own private channel.",
      practice: "In Packet Tracer: connect 4 PCs to a hub and generate traffic -- observe collisions and half-duplex behavior. Then replace the hub with a switch and generate the same traffic -- observe full-duplex, no collisions. Run 'show interfaces' on the switch to verify full-duplex status. Draw both scenarios on paper: hub = one big collision domain circle around all devices; switch = separate collision domain circles around each port.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 5 (Ethernet LAN Switching) covers hubs, switches, collision domains, and broadcast domains. Wendell Odom OCG Chapter 2 covers Ethernet fundamentals. The exam tests conceptual understanding: 'How many collision domains does a 24-port switch have?' (24 -- one per port). 'How many collision domains does a hub with 12 ports have?' (1 -- all ports share one). This is straightforward if you understand the concept."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     1.4 — Identify interface and cable issues
  ══════════════════════════════════════════════════════════════ */

  "1.4.a": {
    info: "<p>A <strong>collision</strong> occurs when two devices on the same collision domain transmit Ethernet frames at the same time, causing the electrical signals to overlap and corrupt both frames. Collisions are <strong>normal and expected on half-duplex links</strong> (hubs, or interfaces manually set to half-duplex). The <strong>CSMA/CD</strong> mechanism handles them: both devices detect the collision, send a jam signal, wait a random backoff time (binary exponential backoff), and then retry transmission. Normal collisions are detected within the first <strong>64 bytes</strong> of a frame (the collision window, also called the <strong>slot time</strong>).</p><p><strong>Late collisions</strong> are collisions detected <strong>after the first 64 bytes</strong> have been transmitted. These are always abnormal and indicate a serious problem. Common causes include: <strong>cable length exceeding the 100-meter maximum</strong> (the electrical signal takes too long to traverse the cable, so the transmitting device finishes the first 64 bytes before the collision signal returns), <strong>duplex mismatch</strong> (one side full-duplex, the other half-duplex -- the full-duplex side transmits freely while the half-duplex side detects collisions), or a <strong>faulty NIC</strong> that does not properly implement CSMA/CD.</p><p>On modern full-duplex switch ports, <strong>collisions should never occur</strong> because each direction has its own wire pair -- the device can send and receive simultaneously without interference. If you see collision counters incrementing on a full-duplex interface, something is fundamentally wrong: likely a duplex mismatch or a hardware failure.</p><p>The <code>show interfaces</code> command displays collision-related counters: <strong>collisions</strong> (total normal collisions), <strong>late collisions</strong> (collisions after 64 bytes), and <strong>deferred</strong> (frames delayed because the medium was busy). On a healthy full-duplex link, all three should be zero. On a half-duplex link, some normal collisions are expected, but late collisions are never acceptable.</p><p><strong>Troubleshooting collisions:</strong> If you see normal collisions, the link is likely half-duplex -- verify duplex settings. If you see late collisions, check for duplex mismatch first (most common cause), then cable length, then NIC health. Late collisions are the #1 symptom of duplex mismatch on the exam.</p>",
    visual: { type: "packet-flow", params: { nodes: ["Device A (TX)", "Collision!", "Device B (TX)"], color: "#ef4444" } },
    hack: {
      memory: "Collision = two cars entering an intersection at the same time (expected on shared roads/half-duplex). Late collision = crash happens way down the highway (cable too long) or one car doesn't know it's on a two-lane road (duplex mismatch). Normal collisions on half-duplex = fine. Late collisions anywhere = always bad. Collisions on full-duplex = something is broken.",
      practice: "In Packet Tracer: connect two devices via a hub (half-duplex shared media) and generate traffic from both simultaneously. Check 'show interfaces' on the switch for collision counters. Then replace the hub with a switch (full-duplex point-to-point) and verify collision counters stay at zero. Next, intentionally create a duplex mismatch by setting one side to full and the other to half -- generate heavy traffic and check for late collisions on the half-duplex side and CRC errors on the full-duplex side.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 9 (Switch Interfaces) covers duplex, speed, and collision troubleshooting. Wendell Odom OCG Chapter 5 covers Ethernet LAN switching fundamentals. The exam loves showing 'show interfaces' output with incrementing late collision counters and asking 'What is the most likely cause?' The answer is almost always duplex mismatch. Remember: 64 bytes is the magic number -- collisions before 64 bytes are normal on half-duplex, after 64 bytes are always a problem."
    }
  },

  "1.4.b": {
    info: "<p>The <strong>CRC (Cyclic Redundancy Check)</strong> is an error-detection mechanism built into every Ethernet frame. The sending device calculates a 32-bit checksum (called the <strong>FCS -- Frame Check Sequence</strong>) based on the frame contents and appends it to the end of the frame. The receiving device recalculates the CRC on the received frame and compares it to the FCS. If they don't match, the frame was <strong>corrupted in transit</strong> and is discarded. The CRC counter in <code>show interfaces</code> increments each time this check fails.</p><p><strong>Common causes of CRC errors:</strong></p><ul><li><strong>Bad or damaged cables</strong> -- crimped, bent, or degraded copper cables introduce signal distortion. This is the most common cause and should be checked first.</li><li><strong>EMI (Electromagnetic Interference)</strong> -- running UTP cables near fluorescent lights, motors, power lines, or other sources of electromagnetic noise corrupts the electrical signals. This is why cable routing standards exist (maintain separation from power cables).</li><li><strong>Faulty NIC or switch port</strong> -- a damaged network interface can transmit or receive corrupted frames. If replacing the cable doesn't fix CRC errors, try a different switch port or NIC.</li><li><strong>Duplex mismatch</strong> -- the full-duplex side may see CRC errors because the half-duplex side's collision fragments appear as corrupted frames.</li><li><strong>Connector issues</strong> -- dirty or loose fiber connectors, improperly terminated copper jacks, or damaged patch panel connections.</li></ul><p><strong>Frame errors</strong> is a broader category that includes CRC errors plus other malformed frame issues (frames that violate the Ethernet format in ways beyond checksum failure). In the <code>show interfaces</code> output, <strong>input errors</strong> is the total count of all inbound problems, and it includes: CRC errors, runts, giants, frame errors, overrun, and ignored. CRC errors are a subset of input errors.</p><p><strong>Troubleshooting order:</strong> (1) Replace the cable (cheapest, easiest fix). (2) Check for EMI sources near the cable path. (3) Try a different switch port. (4) Replace the NIC. (5) Check for duplex mismatch. CRC errors are a <strong>Layer 1 (Physical) problem</strong> -- always start troubleshooting at the physical layer before looking at configuration.</p>",
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
      memory: "CRC = receipt checker at the store. The sender puts a receipt (FCS) in the bag (frame). The receiver recalculates the receipt. If it doesn't match, the bag was tampered with (corrupted in transit) and gets rejected. Bad cable = items falling out on the way. EMI = someone bumping into you on the way. Faulty NIC = the cashier miscounted. CRC errors = ALWAYS a Layer 1 (physical) problem. Troubleshoot bottom-up: cable first, then port, then NIC.",
      practice: "In Packet Tracer: run 'show interfaces' on various switch ports. Identify the 'input errors' line and understand the hierarchy: input errors = total, which includes CRC, runts, giants, frame, overrun, ignored. Practice reading this output and identifying which sub-counter is incrementing. Create a troubleshooting flowchart: CRC errors → replace cable → check EMI → try different port → replace NIC → check duplex settings.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 9 covers interface troubleshooting and error counters. Wendell Odom OCG Chapter 5-6 covers Ethernet frame structure and the FCS/CRC mechanism. The exam frequently shows 'show interfaces' output with CRC errors and asks for the cause. The answer is always a physical layer issue -- bad cable is the #1 cause. Remember that CRC errors sit inside the 'input errors' total, and troubleshooting always starts at Layer 1."
    }
  },

  "1.4.c": {
    info: "<p>Ethernet defines strict size requirements for valid frames. A <strong>runt</strong> is any frame <strong>smaller than 64 bytes</strong> (the minimum Ethernet frame size, which includes the 14-byte header, 46-byte minimum payload, and 4-byte FCS). A <strong>giant</strong> (also called a jumbo or oversized frame) is any frame <strong>larger than 1518 bytes</strong> (the maximum standard Ethernet frame size without 802.1Q tags) or larger than 1522 bytes (with a single 802.1Q tag). Switches drop both runts and giants and increment the appropriate error counter in <code>show interfaces</code>.</p><p><strong>Runts</strong> are almost always the result of <strong>collisions</strong> on half-duplex links. When a collision occurs, the partially transmitted frame is fragmented into a piece smaller than 64 bytes -- this fragment is the runt. On full-duplex links, runts indicate a more serious problem: a <strong>faulty NIC</strong> that is transmitting incomplete frames, a <strong>duplex mismatch</strong> (the half-duplex side generates collision fragments that the full-duplex side sees as runts), or a <strong>software/driver bug</strong>. If runts are incrementing on a full-duplex switch port, investigate the connected device's NIC and duplex settings.</p><p><strong>Giants</strong> occur when a device sends a frame that exceeds the maximum size. Common causes: <strong>MTU mismatch</strong> between devices (one side configured for jumbo frames with MTU 9000, the other expecting standard 1518), a <strong>faulty NIC or driver</strong> that doesn't properly enforce the maximum frame size, or <strong>baby giants</strong> -- frames slightly over 1518 bytes due to 802.1Q tagging (1522 bytes), double-tagging Q-in-Q (1526 bytes), or MPLS labels. Some switches can be configured to accept baby giants with <code>system mtu</code> commands.</p><p><strong>Relationship to input errors:</strong> Both runts and giants are counted within the <strong>input errors</strong> total in <code>show interfaces</code>. The complete hierarchy is: input errors = CRC + runts + giants + frame + overrun + ignored. When troubleshooting, identify which sub-counter is incrementing to narrow down the cause.</p><p><strong>Key thresholds to memorize:</strong> Minimum frame = <strong>64 bytes</strong> (anything less is a runt). Maximum frame = <strong>1518 bytes</strong> standard or <strong>1522 bytes</strong> with 802.1Q tag (anything more is a giant). These numbers come directly from the IEEE 802.3 Ethernet standard and appear frequently on the CCNA exam.</p>",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Runt (< 64 bytes)", items: ["Too small", "Collision fragment", "Duplex mismatch", "Bad NIC"] },
        right: { label: "Giant (> 1518 bytes)", items: ["Too large", "MTU mismatch", "Jumbo frame leak", "Bad NIC"] }
      }
    },
    hack: {
      memory: "Runt = runt of the litter (too small to survive, < 64 bytes). Giant = oversized package that doesn't fit in the mailbox (> 1518 bytes). Both get tossed. Runts on half-duplex = collision fragments (normal for half-duplex). Runts on full-duplex = faulty NIC or duplex mismatch (always bad). Giants = MTU mismatch or faulty NIC. Key numbers: 64 (minimum) and 1518 (maximum, or 1522 with 802.1Q tag).",
      practice: "Create a flashcard with both thresholds: Runt < 64, Giant > 1518. Then create a troubleshooting card: runts on half-duplex → collisions (check if this should be full-duplex). Runts on full-duplex → duplex mismatch or bad NIC. Giants → check MTU settings on both sides, check for jumbo frame config. In Packet Tracer, run 'show interfaces' and find the runt/giant counters in the output -- practice reading the full error line.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 9 covers interface errors. Wendell Odom OCG Chapter 5-6. The exam asks for exact byte thresholds -- 64 and 1518 are guaranteed to appear. A common trick question: 'A frame of 1522 bytes is received on a trunk port. Is this a giant?' Answer: No, 1522 is valid with an 802.1Q tag (4 extra bytes). Only frames exceeding 1522 on a trunk are giants."
    }
  },

  "1.4.d": {
    info: "<p><strong>Interface error counters</strong> in <code>show interfaces</code> are the primary diagnostic tool for Layer 1 and Layer 2 troubleshooting on Cisco switches and routers. Understanding the error hierarchy and what each counter indicates is critical for rapid problem identification.</p><p><strong>Input errors</strong> is the <strong>total count of all inbound frame problems</strong>. It is the sum of all sub-counters: CRC errors, runts, giants, frame errors, overrun (input buffer overflow -- the switch received frames faster than it could process them), and ignored (frames dropped because the input buffer was full). When troubleshooting, look at which sub-counter is incrementing to determine the root cause. Rising CRC = bad cable. Rising runts = collisions or duplex mismatch. Rising giants = MTU mismatch. Rising overrun/ignored = the switch is overwhelmed (check CPU utilization and traffic load).</p><p><strong>Output errors</strong> indicate the switch <strong>couldn't transmit a frame</strong> on an outgoing interface. The most common cause is <strong>congestion</strong> -- the output buffer (transmit queue) is full because the switch is trying to send more traffic than the link can handle. This happens when high-speed traffic is funneled to a lower-speed port (e.g., multiple 1G access ports sending traffic to a single 1G uplink). Output errors are often accompanied by <strong>output drops</strong> (frames discarded from the output queue) and late collisions (on half-duplex links). If output errors are incrementing, consider upgrading the uplink speed or implementing QoS to prioritize critical traffic.</p><p><strong>Interface resets</strong> indicate the interface was reinitialized. Common causes: an administrator executed <code>shutdown</code> / <code>no shutdown</code>, the interface detected a <strong>keepalive failure</strong> (no keepalive frames received from the remote side within the timeout period), excessive error conditions triggered an automatic reset, a cable was physically unplugged and re-plugged, or a link flap (rapid up/down transitions). Frequent resets without administrative action suggest an unstable physical connection (loose cable, failing SFP) or a problematic remote device.</p><p><strong>Additional important counters:</strong> <strong>throttles</strong> (receive buffer pressure -- switch temporarily stopped accepting frames), <strong>underruns</strong> (transmit buffer couldn't supply data fast enough -- rare, indicates hardware issue), and <strong>carrier transitions</strong> (the number of times the interface went from down to up -- high numbers indicate link flapping, usually a physical layer issue).</p><p><strong>Key command:</strong> <code>show interfaces [type number]</code> displays all counters. Use <code>clear counters [type number]</code> to reset counters to zero and start a fresh measurement window.</p>",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Input Errors", items: ["CRC errors", "Runts", "Giants", "Frame errors", "Overrun"] },
        right: { label: "Output Errors", items: ["Collisions", "Late collisions", "Buffer full", "Underrun"] }
      }
    },
    hack: {
      memory: "Input errors = problems with mail arriving at your door (bad cable, mangled envelopes, wrong-size packages). Output errors = problems with mail leaving your outbox (too many letters, mailbox full = congestion). Resets = the mailbox got knocked over and re-installed (shut/no shut, keepalive failure, cable flap). Carrier transitions = how many times the mailbox door opened and closed (link flaps = unstable physical connection).",
      practice: "In Packet Tracer: run 'show interfaces' on several switch ports in different states (up/up, down/down, with traffic, without traffic). Create a cheat sheet mapping each counter to its cause: input errors → Layer 1 inbound issue, output errors → congestion/queue overflow, resets → administrative or keepalive failure, carrier transitions → link flapping. Practice reading real 'show interfaces' output until you can identify the problem from the counters in under 30 seconds.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 9 covers switch interface troubleshooting. Wendell Odom OCG Chapter 5-6. The exam WILL show you 'show interfaces' output and ask you to diagnose the problem. This is one of the most common simlet scenarios. Practice reading the output until you can instantly identify: which counters are incrementing, what they mean, and what to check first. Know that 'clear counters' resets the counters so you can measure error rates over a specific time window."
    }
  },

  "1.4.e": {
    info: "<p>A <strong>duplex mismatch</strong> is one of the most common and most frequently tested Layer 1/2 problems. It occurs when one side of a link is configured for <strong>full-duplex</strong> and the other side is configured for (or defaults to) <strong>half-duplex</strong>. This creates a fundamental communication disagreement that causes severe performance degradation while the link technically stays 'up/up' -- making it deceptive and difficult to notice without checking error counters.</p><p><strong>How it happens:</strong> The most common cause is one side being manually set to full-duplex while the other is left on auto-negotiate. When one side is manual and the other is auto, the auto side <strong>cannot negotiate</strong> (negotiation requires both sides to participate). The auto side then applies <strong>default fallback rules</strong>: it senses the speed (10/100/1000) from the electrical signal but defaults the duplex to <strong>half-duplex for 10/100 Mbps</strong> or <strong>full-duplex for 1000 Mbps</strong>. So if you manually set one side to 100 Mbps full-duplex and leave the other on auto, the auto side will negotiate 100 Mbps but fall back to half-duplex, creating a mismatch.</p><p><strong>Symptoms of duplex mismatch:</strong></p><ul><li><strong>Half-duplex side:</strong> sees <strong>late collisions</strong> and <strong>FCS errors</strong>. The full-duplex side transmits whenever it wants (no CSMA/CD), so the half-duplex side detects 'collisions' while receiving -- these are actually just the full-duplex side transmitting while the half-duplex side is also transmitting.</li><li><strong>Full-duplex side:</strong> sees <strong>CRC/FCS errors</strong> and <strong>runts</strong>. The half-duplex side's collision-aborted frames arrive as corrupted fragments.</li><li><strong>Both sides:</strong> <strong>extremely slow throughput</strong> (often 10x slower than expected), high latency, and packet loss. Small transfers may work fine; large transfers are severely affected because they're more likely to trigger the mismatch behavior.</li></ul><p><strong>Prevention:</strong> The best practice is to use <strong>auto-negotiate on both sides</strong> (both set to 'auto') or <strong>manually match both sides</strong> (both set to the same speed and duplex). Never configure only one side manually and leave the other on auto. On modern Cisco switches, the default for all interfaces is auto-negotiate (speed auto, duplex auto), and this works well in nearly all situations.</p><p><strong>Detection commands:</strong> <code>show interfaces [int]</code> (check duplex setting and error counters), <code>show interfaces status</code> (quick view of duplex/speed for all ports), <code>show cdp neighbors detail</code> (can reveal remote side's configuration).</p>",
    visual: {
      type: "handshake",
      params: {
        leftLabel: "Full Duplex",
        rightLabel: "Half Duplex",
        steps: ["TX freely →", "← Detects collision!", "TX continues →", "← Late collision error"]
      }
    },
    hack: {
      memory: "Duplex mismatch = one person on a phone call (full-duplex, talks anytime), the other on a walkie-talkie (half-duplex, waits for silence). The phone person talks over the walkie-talkie person, who keeps hearing 'collisions.' Symptoms: late collisions on the half-duplex side, CRC/runts on the full-duplex side, painfully slow throughput on both. Fix: match both sides (both auto or both manual to the same settings).",
      practice: "In Packet Tracer: configure one switch port as 'duplex full' and the other as 'duplex half' (or leave it on auto to demonstrate the fallback). Generate a large file transfer between PCs and observe the slow throughput. Run 'show interfaces' on both sides and identify: late collisions on the half-duplex side, CRC errors on the full-duplex side. Then fix the mismatch (set both to auto or both to full) and observe the errors stop. Also run 'show interfaces status' to see the duplex column -- this is the fastest way to spot a mismatch across all ports.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 9 covers duplex/speed mismatch in detail. Wendell Odom OCG Chapter 5-6. This is one of the most tested troubleshooting topics on the CCNA. The classic exam question: 'A user reports slow performance. The interface shows late collisions incrementing. What is the most likely cause?' Answer: duplex mismatch. Best practice: use auto-negotiate on both sides (Cisco's recommendation). Never set only one side manually."
    }
  },

  "1.4.f": {
    info: "<p>A <strong>speed mismatch</strong> occurs when two connected interfaces are operating at different speeds (e.g., one side at 100 Mbps and the other at 1 Gbps). Unlike duplex mismatch, a speed mismatch usually results in the <strong>link not coming up at all</strong> -- the interface shows 'down/down' because the two sides cannot synchronize their electrical signaling. This makes speed mismatches easier to detect than duplex mismatches (which deceptively show 'up/up').</p><p><strong>Auto-negotiation</strong> is the IEEE 802.3u mechanism where two connected interfaces exchange capabilities (supported speeds and duplex modes) and agree on the highest mutually supported settings. When both sides are set to <strong>auto</strong>, auto-negotiation works reliably: a 1G switch port connected to a 100M device will negotiate to 100 Mbps full-duplex. The problem occurs when <strong>one side is manual and the other is auto</strong>.</p><p><strong>Auto-negotiation failure behavior:</strong> When one side is manually configured and the other is set to auto, the auto side cannot complete the negotiation process (it requires both sides to participate). The auto side then falls back to <strong>default detection rules</strong>:</p><ul><li><strong>Speed:</strong> The auto side can detect the speed from the electrical signal (called parallel detection or link pulse detection). So it usually matches the correct speed. This is why speed mismatches are less common than duplex mismatches.</li><li><strong>Duplex:</strong> Since negotiation failed, the auto side applies <strong>IEEE defaults</strong>: half-duplex for 10/100 Mbps, full-duplex for 1000 Mbps. This is where duplex mismatch sneaks in -- you fix the speed but get wrong duplex.</li></ul><p><strong>Cisco best practices:</strong> Use auto-negotiate on both sides (the default on all modern Cisco switch ports). If you must set manual speed/duplex, set <strong>both sides to matching values</strong>. Never configure only one side manually. For critical links (uplinks, server connections), some organizations prefer manual configuration to avoid negotiation delays during link recovery, but both sides must match exactly.</p><p><strong>Verification commands:</strong> <code>show interfaces status</code> (shows speed/duplex for all ports in a table -- the fastest way to spot mismatches), <code>show interfaces [int]</code> (detailed view including negotiation status), <code>speed auto</code> and <code>duplex auto</code> (configure auto-negotiation on an interface).</p>",
    visual: {
      type: "handshake",
      params: {
        leftLabel: "1 Gbps (Manual)",
        rightLabel: "Auto (defaults to 100M/Half)",
        steps: ["I'm at 1G →", "← Can't negotiate", "Link may not come up", "← Or defaults to worst case"]
      }
    },
    hack: {
      memory: "Auto-negotiation failure defaults: Speed = sensed from electrical signal (usually correct). Duplex = IEEE default: half for 10/100, full for 1000. Mnemonic: 'When auto stands alone, 10/100 goes half, 1000 goes full.' This is why duplex mismatch is so sneaky -- speed gets detected correctly, but duplex silently defaults to the wrong setting at 10/100 Mbps. Best practice: both sides auto, or both sides manually matched.",
      practice: "In Packet Tracer: set one switch port to 'speed 100' and 'duplex full' manually. Leave the other on auto. Check 'show interfaces status' on the auto side -- it should show 100/half (speed sensed correctly, duplex defaulted to half = mismatch). Then set both sides to 'speed auto' and 'duplex auto' and verify they negotiate correctly. This lab demonstrates exactly how the fallback rules create duplex mismatch when only one side is manual.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 9 covers auto-negotiation and the fallback rules. Wendell Odom OCG Chapter 5-6 covers Ethernet autonegotiation in detail. The exam tests the fallback behavior directly: 'Interface A is set to 100/full. Interface B is set to auto. What does Interface B negotiate to?' Answer: 100/half (speed sensed, duplex defaults to half because negotiation failed). This is one of the most missed questions. Memorize the fallback rules."
    }
  },

  "1.4.g": {
    info: "<p>Cisco interface status is expressed as two codes shown in <code>show ip interface brief</code> and <code>show interfaces</code>: the <strong>interface status</strong> (Layer 1/physical state) and the <strong>line protocol status</strong> (Layer 2/data link state). Together, they indicate the operational health of an interface and guide your troubleshooting to the correct layer. Understanding these codes is fundamental to all Cisco device troubleshooting.</p><p><strong>The four interface states:</strong></p><ul><li><strong>up/up</strong> -- Both Layer 1 and Layer 2 are operational. The physical link is active (cable connected, signal detected) and the Layer 2 protocol (Ethernet, HDLC, PPP, etc.) is functioning correctly. This is the desired state for any active interface. In <code>show ip interface brief</code>, this shows as 'up' in both the Status and Protocol columns.</li><li><strong>up/down</strong> -- Layer 1 is up (cable connected, electrical signal present) but <strong>Layer 2 protocol has failed</strong>. Causes include: encapsulation mismatch between two connected devices (e.g., one side PPP, the other HDLC on a serial link), keepalive failure (no keepalive frames received from the remote side), clock rate not configured on a DCE serial interface, or an authentication failure on a PPP link. This state is less common on Ethernet but appears on serial WAN interfaces.</li><li><strong>down/down</strong> -- <strong>Layer 1 failure</strong>. No physical signal is detected. Common causes: cable not connected, cable is damaged or faulty, remote device is powered off, remote interface is shut down, bad SFP/transceiver, or the cable is the wrong type (straight-through where a crossover is needed, though modern auto-MDIX usually handles this). On Ethernet, this almost always means a physical connectivity issue.</li><li><strong>administratively down/down</strong> -- The interface has been <strong>manually disabled</strong> with the <code>shutdown</code> command. Both layers are forced down because the administrator intentionally disabled the interface. This is the default state for router interfaces (which are shutdown by default) but NOT for switch interfaces (which are up/up by default). To enable: <code>no shutdown</code>.</li></ul><p><strong>Troubleshooting with status codes:</strong> Always check status codes first with <code>show ip interface brief</code>. If 'administratively down,' just enable it. If 'down/down,' troubleshoot Layer 1 (cable, connectors, power, SFP). If 'up/down,' troubleshoot Layer 2 (encapsulation, keepalives, clock rate). If 'up/up' but the user reports problems, check error counters, IP configuration, and routing.</p><p><strong>Important default behavior:</strong> On Cisco routers, all interfaces are <strong>shutdown by default</strong> (administratively down). On Cisco switches, all interfaces are <strong>not shutdown by default</strong> (they come up automatically when a cable is connected). This difference trips up students configuring routers for the first time -- you must always <code>no shutdown</code> each router interface after assigning an IP address.</p>",
    visual: {
      type: "state-machine",
      params: {
        states: ["admin down/down", "down/down (L1 issue)", "up/down (L2 issue)", "up/up (working)"],
        active: 3,
        transitions: true
      }
    },
    hack: {
      memory: "Traffic lights: up/up = GREEN (all good). up/down = YELLOW (L1 works but L2 is confused -- encapsulation or keepalive issue). down/down = RED (no physical connection -- check the cable). admin down = OFF (you flipped the switch with 'shutdown'). Default states: router interfaces = shutdown by default (admin down). Switch interfaces = not shutdown by default (come up automatically).",
      practice: "In Packet Tracer: (1) Configure a router interface with 'ip address' but forget 'no shutdown' -- observe 'administratively down/down' in 'show ip interface brief'. (2) Add 'no shutdown' -- watch it change to 'up/up' (if cable is connected) or 'down/down' (if no cable). (3) Unplug the cable from a working interface -- observe 'down/down'. (4) Plug it back in -- observe 'up/up'. Run 'show ip interface brief' after every change and note the Status and Protocol columns. Practice this until you can predict the state before checking.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 9 (Interface Configuration) covers status codes. Wendell Odom OCG Chapter 5. This is one of the most frequently tested topics on the CCNA -- expect 2-3 questions involving interface status interpretation. The exam shows you 'show ip interface brief' output and asks what the problem is. Memorize: admin down = shutdown command, down/down = Layer 1 (cable/physical), up/down = Layer 2 (protocol), up/up = working. Also remember that router interfaces default to shutdown while switch interfaces default to no shutdown."
    }
  },

  "1.4.h": {
    info: "<p>Two essential commands form the foundation of Layer 1/2 troubleshooting on Cisco switches: <code>show interfaces</code> for deep analysis of a specific port, and <code>show interfaces status</code> for a quick overview of all ports.</p><p><strong><code>show interfaces [type number]</code></strong> provides an extremely detailed view of a single interface. Key information includes: <strong>interface status codes</strong> (up/up, down/down, etc.), <strong>hardware type and MAC address</strong>, <strong>MTU</strong> (Maximum Transmission Unit, default 1500 for Ethernet), <strong>bandwidth</strong> (configured BW for routing metric calculations), <strong>duplex and speed</strong> (current negotiated or configured values), <strong>input/output packet counts</strong>, and the critical <strong>error counters</strong>: input errors (CRC, runts, giants, frame, overrun, ignored), output errors (collisions, late collisions, interface resets, output drops), and carrier transitions (link flap count). This command is your go-to when you know which port has a problem and need to diagnose the root cause.</p><p><strong><code>show interfaces status</code></strong> displays a summary table of ALL switch interfaces in a compact format. Each row shows: <strong>Port</strong> (interface name), <strong>Name</strong> (description if configured), <strong>Status</strong> (connected = up/up, notconnect = down/down, disabled = shutdown, err-disabled = automatically shut down due to security violation or error), <strong>Vlan</strong> (access VLAN assignment or 'trunk'), <strong>Duplex</strong> (auto, a-full, a-half, full, half -- 'a-' prefix means auto-negotiated), <strong>Speed</strong> (auto, 10, 100, 1000, etc.), and <strong>Type</strong> (10/100/1000BaseTX, etc.). This command is your go-to when you need to quickly scan all ports for misconfigurations (wrong VLAN, wrong duplex, err-disabled status).</p><p><strong>When to use each command:</strong> Start with <code>show interfaces status</code> for a quick health check of all ports -- look for unexpected statuses, VLAN misassignments, or duplex/speed anomalies. Then drill into specific problem ports with <code>show interfaces [int]</code> for error counter analysis. A common exam workflow: (1) user reports slow connection, (2) check <code>show interfaces status</code> to verify port is connected and check duplex/speed, (3) run <code>show interfaces [int]</code> to check error counters for CRC, late collisions, or runts.</p><p><strong>Related commands:</strong> <code>show ip interface brief</code> (Layer 3 focus -- shows IP addresses and status codes), <code>show interfaces trunk</code> (shows trunk port details -- native VLAN, allowed VLANs), <code>show interfaces switchport</code> (shows VLAN and switchport mode details for a specific port).</p>",
    visual: {
      type: "comparison",
      params: {
        left: { label: "show interfaces", items: ["Detailed per-interface", "Error counters", "Input/output packets", "Duplex/speed", "Status codes"] },
        right: { label: "show interfaces status", items: ["Summary table (all ports)", "Port + VLAN", "Duplex + Speed", "Status column", "Quick overview"] }
      }
    },
    hack: {
      memory: "'show interfaces [int]' = full medical report on one patient (every blood test, X-ray, history). 'show interfaces status' = quick vitals board for the entire ward (name, room, heart rate, temp for every patient at a glance). 'show ip interface brief' = patient roster with room assignments (IP addresses and up/down status). Use 'status' to find which port is sick, then 'show interfaces' for the full diagnosis.",
      practice: "In Packet Tracer: configure a switch with 8 ports -- some in VLAN 10, some in VLAN 20, one shutdown, one as a trunk, one with a duplex mismatch. Run 'show interfaces status' and identify each port's state, VLAN, duplex, and speed at a glance. Then run 'show interfaces' on the mismatched port and identify the error counters. Practice until you can read both outputs and diagnose the problem in under 30 seconds. Also practice 'show interfaces trunk' to verify trunk port settings.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 9 covers these commands. Wendell Odom OCG Chapter 5-6. The exam WILL show you output from these commands and ask you to identify the problem -- this is one of the most common simlet formats. Practice reading real output (not just memorizing concepts). Key things to look for in 'show interfaces status': err-disabled status (security violation), wrong VLAN assignment, duplex mismatch (one side full, other half), notconnect (cable issue). In 'show interfaces': incrementing error counters (CRC, late collisions, runts) and carrier transitions (link flapping)."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     1.5 — Compare TCP to UDP
  ══════════════════════════════════════════════════════════════ */

  "1.5.a": {
    info: "<p><strong>TCP (Transmission Control Protocol)</strong> is a <strong>connection-oriented</strong> Layer 4 (Transport) protocol defined in RFC 793. It establishes a logical connection between two hosts before any data is exchanged (via the three-way handshake), and it guarantees that data arrives completely, in order, and without corruption. These guarantees make TCP the protocol of choice for applications that cannot tolerate data loss: web browsing (HTTP/HTTPS), email (SMTP, IMAP, POP3), file transfer (FTP, SFTP), remote access (SSH, Telnet), and database communication.</p><p><strong>TCP's reliability mechanisms:</strong></p><ul><li><strong>Sequence numbers</strong> -- Every byte of data sent has a sequence number. The receiver uses these to reassemble data in the correct order, even if segments arrive out of order. This guarantees <strong>ordered delivery</strong>.</li><li><strong>Acknowledgments (ACKs)</strong> -- The receiver sends ACK messages confirming which data has been received. If the sender does not receive an ACK within a timeout period, it <strong>retransmits</strong> the unacknowledged data. This guarantees <strong>reliable delivery</strong>.</li><li><strong>Flow control (windowing)</strong> -- The receiver advertises a <strong>window size</strong> telling the sender how much data it can accept. This prevents the sender from overwhelming a slow receiver.</li><li><strong>Congestion control</strong> -- TCP algorithms (slow start, congestion avoidance, fast retransmit) detect network congestion and reduce the sending rate to prevent packet loss.</li><li><strong>Checksum</strong> -- Every TCP segment includes a checksum to verify data integrity. Corrupted segments are discarded and retransmitted.</li></ul><p>The <strong>TCP header</strong> is <strong>20 bytes minimum</strong> (up to 60 bytes with options). It contains: source port (16 bits), destination port (16 bits), sequence number (32 bits), acknowledgment number (32 bits), header length (4 bits), flags (SYN, ACK, FIN, RST, PSH, URG -- 6 bits), window size (16 bits), checksum (16 bits), and urgent pointer (16 bits). This overhead is the cost of reliability -- TCP headers are larger and processing is more complex than UDP.</p><p><strong>TCP vs UDP tradeoff:</strong> TCP trades speed and simplicity for reliability and ordering. It adds latency (connection setup, ACK waiting) and bandwidth overhead (larger headers, retransmissions) but ensures data integrity. Applications that need every byte to arrive correctly use TCP. Applications that prioritize speed over completeness use UDP.</p>",
    visual: {
      type: "layer-stack",
      params: {
        layers: ["L7 Application", "L4 TCP — Reliable, ordered, connection-oriented", "L3 Network", "L2 Data Link", "L1 Physical"],
        highlight: 1
      }
    },
    hack: {
      memory: "TCP = certified mail with tracking. You know it was delivered (ACK), in order (sequence numbers), and you get a receipt. If lost, the post office sends it again (retransmission). The envelope is bigger (20-byte header) and costs more (overhead). TCP header = 20 bytes minimum. Key features: connection-oriented, reliable, ordered, flow control, congestion control.",
      practice: "Create a detailed comparison table: TCP vs UDP. Columns: Feature, TCP, UDP. Rows: Connection type (connection-oriented vs connectionless), Reliability (ACK/retransmit vs best-effort), Ordering (sequence numbers vs none), Header size (20+ bytes vs 8 bytes), Speed (slower vs faster), Flow control (windowing vs none), Use cases (web/email/file transfer vs voice/video/DNS queries). Write this table from memory 5 times until it's automatic.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 23 (TCP and UDP) is the essential video for this topic. Wendell Odom OCG Chapter 4 (TCP/IP Transport Layer) covers TCP in depth. The exam tests TCP vs UDP characteristics heavily -- expect 3-5 questions. Know the TCP header fields (especially sequence number, ACK number, flags, window size) and the reliability mechanisms. The comparison table you memorize will answer most questions directly."
    }
  },

  "1.5.b": {
    info: "<p>The <strong>TCP three-way handshake</strong> is the process that establishes a TCP connection between two hosts before any application data is exchanged. It serves three critical purposes: (1) both sides confirm they are reachable and ready to communicate, (2) both sides agree on <strong>initial sequence numbers (ISNs)</strong> for tracking data, and (3) both sides exchange their <strong>Maximum Segment Size (MSS)</strong> to optimize data transfer.</p><p><strong>The three steps:</strong></p><ul><li><strong>Step 1 -- SYN:</strong> The client sends a TCP segment with the <strong>SYN flag set</strong> and includes its initial sequence number (e.g., seq=100). The SYN flag means 'I want to synchronize sequence numbers and start a connection.' The client enters the <strong>SYN-SENT</strong> state.</li><li><strong>Step 2 -- SYN-ACK:</strong> The server responds with a segment that has <strong>both the SYN and ACK flags set</strong>. The SYN carries the server's own initial sequence number (e.g., seq=300). The ACK acknowledges the client's SYN by setting the acknowledgment number to the client's ISN + 1 (e.g., ack=101, meaning 'I received everything up to byte 100, send me byte 101 next'). The server enters the <strong>SYN-RECEIVED</strong> state.</li><li><strong>Step 3 -- ACK:</strong> The client sends a final ACK segment acknowledging the server's SYN (ack=301). No SYN flag is set this time -- this is a pure acknowledgment. Both sides enter the <strong>ESTABLISHED</strong> state, and data transfer can begin.</li></ul><p>The handshake is called 'three-way' because it takes exactly three messages to establish the connection. After the handshake completes, the connection is <strong>full-duplex</strong> -- both sides can send and receive data simultaneously.</p><p><strong>Practical significance:</strong> The three-way handshake adds latency to every new TCP connection. For a web page that requires connections to multiple servers (images, scripts, APIs), each connection requires a separate handshake. This is why modern protocols like <strong>HTTP/2</strong> (multiplexing) and <strong>HTTP/3</strong> (QUIC over UDP) were developed -- to reduce the overhead of repeated handshakes. On the exam, understand the handshake sequence cold: <strong>SYN → SYN-ACK → ACK</strong>.</p>",
    visual: {
      type: "handshake",
      params: {
        leftLabel: "Client",
        rightLabel: "Server",
        steps: ["SYN (seq=100) →", "← SYN-ACK (seq=300, ack=101)", "ACK (ack=301) →", "--- Connection Established ---"]
      }
    },
    hack: {
      memory: "Three-way handshake = phone call. You dial (SYN = 'Can we talk?'). They answer (SYN-ACK = 'Yes, let's talk!'). You confirm (ACK = 'Great, I hear you.'). Now data flows. States: client goes SYN-SENT → ESTABLISHED. Server goes LISTEN → SYN-RECEIVED → ESTABLISHED. Remember the acronym SSA: SYN, SYN-ACK, ACK.",
      practice: "Draw the three-way handshake 10 times from memory with all details: flags (SYN, SYN-ACK, ACK), example sequence numbers (seq=100 → seq=300/ack=101 → ack=301), and the states on each side (SYN-SENT, SYN-RECEIVED, ESTABLISHED). If you have Wireshark, capture traffic while opening a web page and filter for 'tcp.flags.syn==1' to find the handshake packets. Examine the sequence numbers and flags in the packet detail pane.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 23 (TCP and UDP) covers the three-way handshake with clear diagrams. Wendell Odom OCG Chapter 4. This is nearly guaranteed on the exam -- it is one of the most classic networking exam questions across all certifications. Draw the handshake from memory until you can do it in under 10 seconds. Know the exact flag sequence: SYN → SYN-ACK → ACK. Know that both sides exchange initial sequence numbers during this process."
    }
  },

  "1.5.c": {
    info: "<p>The <strong>TCP four-way teardown</strong> (also called four-way close or graceful close) is the process that terminates a TCP connection. Unlike the three-way handshake where the connection is established in three messages, the teardown requires <strong>four messages</strong> because each side must independently close its half of the full-duplex connection. Either side (client or server) can initiate the teardown.</p><p><strong>The four steps:</strong></p><ul><li><strong>Step 1 -- FIN:</strong> The initiating side (say, the client) sends a segment with the <strong>FIN (Finish) flag</strong> set, meaning 'I have no more data to send.' The client enters <strong>FIN-WAIT-1</strong> state. The client can still receive data -- only its sending direction is closing.</li><li><strong>Step 2 -- ACK:</strong> The server acknowledges the FIN with an <strong>ACK</strong>. The server enters <strong>CLOSE-WAIT</strong> state (it knows the client is done sending but may still have its own data to send). The client moves to <strong>FIN-WAIT-2</strong> state.</li><li><strong>Step 3 -- FIN:</strong> When the server finishes sending its remaining data, it sends its own <strong>FIN</strong> flag. The server enters <strong>LAST-ACK</strong> state.</li><li><strong>Step 4 -- ACK:</strong> The client acknowledges the server's FIN with a final <strong>ACK</strong>. The client enters <strong>TIME-WAIT</strong> state (waits for 2x MSL -- Maximum Segment Lifetime -- typically 60-120 seconds before fully closing, to catch any delayed segments). The server enters <strong>CLOSED</strong> state upon receiving the ACK.</li></ul><p>The teardown uses four messages (not three) because it is <strong>half-close capable</strong>: each direction of the full-duplex connection closes independently. Between steps 2 and 3, the server's half is still open -- the server can continue sending data even though the client has indicated it is finished.</p><p><strong>RST (Reset):</strong> A <strong>TCP RST</strong> is an abrupt, non-graceful connection termination. When a host sends a RST, the connection is immediately destroyed with no FIN/ACK exchange. RST is used when: a connection attempt is refused (no service listening on the port), an application crashes, a firewall forcibly rejects a connection, or a host receives a segment for a connection that no longer exists. RST is the 'hang up without saying goodbye' of TCP.</p><p><strong>Exam relevance:</strong> Know the flag sequence: <strong>FIN → ACK → FIN → ACK</strong>. Know that RST is the abrupt alternative. The exam rarely tests the intermediate states (FIN-WAIT, CLOSE-WAIT, etc.) but may ask about the flag sequence or the difference between graceful close (FIN) and abrupt close (RST).</p>",
    visual: {
      type: "handshake",
      params: {
        leftLabel: "Client",
        rightLabel: "Server",
        steps: ["FIN →", "← ACK", "← FIN", "ACK →", "--- Connection Closed ---"]
      }
    },
    hack: {
      memory: "Four-way teardown = politely ending a phone call. Client: 'I'm done talking' (FIN). Server: 'OK, I heard you' (ACK). Server: 'I'm done too' (FIN). Client: 'Goodbye' (ACK). RST = slamming the phone down mid-sentence. Why 4 steps instead of 3? Because each side closes independently -- the server might still have data to send after the client says FIN. Flag sequence: FIN → ACK → FIN → ACK.",
      practice: "Draw both the three-way handshake (SYN → SYN-ACK → ACK) and four-way teardown (FIN → ACK → FIN → ACK) side by side. Practice drawing both from memory in under 30 seconds. In Wireshark, filter for 'tcp.flags.fin==1' after closing a web page to find the teardown packets. Also look for RST packets ('tcp.flags.reset==1') -- they're common when connections are refused or forcibly closed.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 23 covers the teardown. Wendell Odom OCG Chapter 4. The teardown is less frequently tested than the handshake but still appears. The key exam question: 'What TCP flag gracefully terminates a connection?' Answer: FIN. 'What TCP flag abruptly terminates a connection?' Answer: RST. Know FIN-ACK-FIN-ACK as the graceful sequence."
    }
  },

  "1.5.d": {
    info: "<p><strong>TCP windowing</strong> is the flow control mechanism that regulates how much data a sender can transmit before requiring an acknowledgment from the receiver. The <strong>window size</strong> field in the TCP header (16 bits, supporting up to 65,535 bytes -- or much larger with window scaling option) tells the sender: 'I have this much buffer space available; do not send more than this amount of unacknowledged data.' This prevents a fast sender from overwhelming a slow receiver.</p><p><strong>How windowing works:</strong> Without windowing, the sender would have to send one segment, wait for an ACK, send the next, wait, and so on -- extremely slow. Instead, the sender can send multiple segments up to the <strong>window size</strong> before pausing for acknowledgments. For example, with a window size of 3000 bytes and a segment size of 1000 bytes, the sender can send 3 segments before waiting. As the receiver processes data and frees buffer space, it advertises a larger window in its ACK messages, allowing the sender to send more. If the receiver's buffer fills up, it advertises a smaller window (or even <strong>window size 0</strong>, which means 'stop sending completely until I tell you otherwise').</p><p><strong>Dynamic adjustment:</strong> The window size adjusts throughout the connection:</p><ul><li><strong>Slow start</strong> -- The connection begins with a small congestion window (typically 1-10 segments). For each ACK received, the window doubles (exponential growth). This probes the network's capacity without immediately flooding it.</li><li><strong>Congestion avoidance</strong> -- After reaching a threshold (ssthresh), growth becomes linear (additive increase) instead of exponential. This prevents overshooting the network's capacity.</li><li><strong>Fast retransmit / fast recovery</strong> -- If the sender receives three duplicate ACKs (indicating a lost segment), it retransmits the missing segment immediately without waiting for a timeout, and reduces the window by half.</li></ul><p><strong>Sequence numbers</strong> enable all of this. Every byte in the TCP stream has a unique sequence number. The receiver uses sequence numbers to: (1) reassemble data in the correct order even if segments arrive out of order, (2) detect duplicate segments (retransmissions received after the original arrived), and (3) report what has been received (the ACK number = 'I've received everything up to this byte, send me the next one').</p><p>For the CCNA, understand that windowing = flow control, the window size adjusts dynamically, and a window of 0 means 'stop sending.' You do not need to calculate window sizes or know the congestion control algorithms in detail.</p>",
    visual: {
      type: "handshake",
      params: {
        leftLabel: "Sender",
        rightLabel: "Receiver",
        steps: ["Data (seq 1-3) →", "← ACK 4, Window=6", "Data (seq 4-9) →", "← ACK 10, Window=3 (slow down!)"]
      }
    },
    hack: {
      memory: "Window size = how many plates a waiter carries at once. Big window = carry more plates (fast, efficient). Small window = carry fewer plates (slow, careful). Window = 0 = 'kitchen is full, stop bringing plates!' The receiver controls the window -- it tells the sender how much buffer space is available. Windowing IS flow control. Sequence numbers = numbered tickets on each plate so the kitchen knows the order.",
      practice: "Draw a diagram showing windowing: Sender sends segments 1, 2, 3 (window=3). Receiver ACKs with ack=4 and window=5. Sender now sends segments 4, 5, 6, 7, 8. Receiver ACKs with ack=9 and window=2 (buffer getting full). Sender can only send 2 more. This visual exercise makes the concept concrete. Also create a flashcard: 'What TCP mechanism prevents a fast sender from overwhelming a slow receiver?' Answer: windowing/flow control.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 23 covers windowing conceptually. Wendell Odom OCG Chapter 4 goes deeper into TCP flow control and congestion control. The CCNA tests conceptual understanding only -- you will NOT calculate window sizes. Key exam answers: 'Which TCP feature provides flow control?' = windowing. 'What happens when window size = 0?' = sender stops transmitting. 'How does TCP ensure ordered delivery?' = sequence numbers."
    }
  },

  "1.5.e": {
    info: "<p><strong>UDP (User Datagram Protocol)</strong> is a <strong>connectionless</strong> Layer 4 (Transport) protocol defined in RFC 768. Unlike TCP, UDP does not establish a connection before sending data -- it simply sends datagrams to the destination with no guarantee of delivery, no acknowledgments, no retransmission, no ordering, and no flow control. This 'fire and forget' approach makes UDP <strong>fast, lightweight, and low-overhead</strong>, at the cost of reliability.</p><p><strong>The UDP header</strong> is only <strong>8 bytes</strong> (compared to TCP's 20+ bytes), containing just four fields: source port (16 bits), destination port (16 bits), length (16 bits), and checksum (16 bits, optional in IPv4, mandatory in IPv6). There are no sequence numbers, no acknowledgment numbers, no flags, no window size. This minimal header is why UDP has less overhead and processes faster than TCP.</p><p><strong>UDP characteristics:</strong></p><ul><li><strong>Connectionless</strong> -- No handshake, no connection state to maintain. The sender just sends datagrams. The receiver either gets them or doesn't.</li><li><strong>Best-effort delivery</strong> -- No acknowledgments, no retransmissions. If a datagram is lost, it stays lost (unless the application implements its own reliability layer).</li><li><strong>No ordering</strong> -- Datagrams may arrive in any order. There are no sequence numbers to reassemble them.</li><li><strong>No flow control</strong> -- The sender can transmit as fast as it wants. If the receiver can't keep up, datagrams are dropped.</li><li><strong>Low latency</strong> -- No connection setup delay, no ACK waiting, no retransmission delays. Data is sent immediately.</li></ul><p><strong>Why use UDP?</strong> For <strong>real-time applications</strong> where speed matters more than completeness: <strong>VoIP (voice over IP)</strong>, <strong>video streaming/conferencing</strong>, <strong>online gaming</strong>, and <strong>live broadcasts</strong>. In a voice call, if one packet is lost, retransmitting it 200ms later is useless -- the conversation has moved on. It's better to drop the packet and continue. Similarly, DNS queries use UDP because a single query-response pair is small and fast; if the response is lost, the client simply queries again.</p><p><strong>Applications that use UDP include:</strong> DNS (port 53 for queries), DHCP (ports 67/68), TFTP (port 69), SNMP (ports 161/162), Syslog (port 514), NTP (port 123), RTP/RTSP (voice/video streaming), and most online gaming protocols. Some applications build their own reliability on top of UDP (e.g., QUIC, the protocol behind HTTP/3, adds reliability features to UDP to get the benefits of both worlds).</p>",
    visual: {
      type: "packet-flow",
      params: { nodes: ["Sender", "Fire and forget!", "Receiver (maybe)"], color: "#f59e0b" }
    },
    hack: {
      memory: "UDP = shouting into a crowd. You don't know who heard you, you don't repeat yourself, you don't care about the order. Fast but unreliable. UDP header = 8 bytes (4 fields: src port, dst port, length, checksum). TCP header = 20+ bytes (10+ fields). UDP is used when speed > reliability: voice, video, gaming, DNS queries. Mnemonic: UDP = 'Unreliable Datagram Protocol' (not the real name, but helps remember the key characteristic).",
      practice: "Create a side-by-side comparison card: TCP header (20 bytes, 10+ fields, connection state, reliability mechanisms) vs UDP header (8 bytes, 4 fields, no state, no reliability). List 5 TCP applications (HTTP, HTTPS, FTP, SSH, SMTP) and 5 UDP applications (DNS, DHCP, TFTP, SNMP, voice/video). For each, explain WHY it uses that protocol. This 'why' understanding helps answer scenario-based exam questions.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 23 covers UDP characteristics. Wendell Odom OCG Chapter 4. If the exam asks 'which protocol has lower overhead?' = UDP. 'Which is used for real-time voice/video?' = UDP. 'Which provides no guarantees of delivery?' = UDP. 'Which protocol's header is 8 bytes?' = UDP. These are easy points if you memorize the characteristics and common applications."
    }
  },

  "1.5.f": {
    info: "<p><strong>TCP well-known port numbers</strong> (ports 0-1023) are assigned by IANA to common services. The CCNA exam tests port-to-protocol mapping directly in multiple questions -- these must be memorized cold. TCP ports are used by connection-oriented applications that require reliable, ordered delivery.</p><p><strong>Essential TCP ports for the CCNA:</strong></p><ul><li><strong>FTP Data -- TCP 20:</strong> FTP uses two separate connections. Port 20 carries the actual file data during transfers (in active mode). The data channel is opened only when a file transfer occurs.</li><li><strong>FTP Control -- TCP 21:</strong> Port 21 carries FTP commands (login, ls, get, put) and is maintained throughout the session. FTP's two-port design is unique and frequently tested.</li><li><strong>SSH -- TCP 22:</strong> Secure Shell provides encrypted remote CLI access to network devices. SSH v2 is the standard. SSH replaced Telnet for all secure remote management.</li><li><strong>Telnet -- TCP 23:</strong> Unencrypted remote CLI access. All data, including passwords, is sent in <strong>plaintext</strong>. Legacy protocol -- never use in production. The exam tests why SSH should be used instead.</li><li><strong>SMTP -- TCP 25:</strong> Simple Mail Transfer Protocol sends email from client to server and between mail servers. Port 587 is used for authenticated submission (SMTP with STARTTLS). Port 25 is for server-to-server relay.</li><li><strong>HTTP -- TCP 80:</strong> Hypertext Transfer Protocol serves web pages. Unencrypted -- data (including session cookies) is visible to anyone on the network.</li><li><strong>POP3 -- TCP 110:</strong> Post Office Protocol version 3 retrieves email from a server and typically deletes it from the server. Downloads a copy to the client.</li><li><strong>IMAP -- TCP 143:</strong> Internet Message Access Protocol accesses email on a server while keeping it there. Supports folders, search, and multi-device sync. More modern than POP3.</li><li><strong>HTTPS -- TCP 443:</strong> HTTP over TLS/SSL provides encrypted web communication. Standard for all modern websites. The 'S' = Secure.</li></ul><p><strong>Additional TCP ports worth knowing:</strong> LDAP (389), LDAPS (636), RDP (3389), SQL Server (1433), MySQL (3306), BGP (179). These appear less frequently but can be answer choices.</p><p><strong>Port number ranges:</strong> <strong>Well-known ports (0-1023)</strong> = IANA-assigned, used by servers/services. <strong>Registered ports (1024-49151)</strong> = used by specific applications (registered with IANA but not mandated). <strong>Dynamic/ephemeral ports (49152-65535)</strong> = used by clients for outgoing connections (the OS assigns a random port in this range for each new connection).</p>",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Secure (Encrypted)", items: ["SSH — 22", "HTTPS — 443", "IMAP over TLS — 993"] },
        right: { label: "Insecure (Plaintext)", items: ["Telnet — 23", "HTTP — 80", "FTP — 20/21", "SMTP — 25"] }
      }
    },
    hack: {
      memory: "FTP: 20/21 -- 'Twenty-Fun Transfer' (20=data, 21=control). SSH: 22 -- 'Secure SHell, Twenty-Two.' Telnet: 23 -- 'insecure neighbor of 22, one door down.' SMTP: 25 -- 'Send Mail To People at 25.' HTTP: 80 -- 'the OG web, ATE-Zero.' POP3: 110 -- 'Post Office Pickup at one-ten.' IMAP: 143 -- 'I Must Access Permanently at one-forty-three.' HTTPS: 443 -- '443cure' or 'four-four-three is secure for me.' Remember: secure versions are always higher port numbers than their insecure counterparts (22>23 is the exception).",
      practice: "Create Anki flashcards (or physical index cards) for every TCP port. Front: protocol name. Back: port number + TCP/UDP + one-line description. Drill daily for 2 weeks minimum. Also create reverse cards (port number → protocol). Group them by function: remote access (SSH=22, Telnet=23), web (HTTP=80, HTTPS=443), email (SMTP=25, POP3=110, IMAP=143), file transfer (FTP=20/21). Test yourself in both directions until you can answer in under 2 seconds per port.",
      effort: "high",
      meta: "Jeremy's IT Lab covers ports across multiple days (Day 23, 38-42). Wendell Odom OCG Chapter 4. Port numbers appear in 5-10 CCNA questions -- this is one of the most heavily tested topics. The r/ccna subreddit universally recommends Anki spaced repetition for port memorization. Two weeks of daily drills is the standard recommendation. Do not skip this -- it's pure memorization but worth significant exam points."
    }
  },

  "1.5.g": {
    info: "<p><strong>UDP well-known port numbers</strong> are used by connectionless services that prioritize speed over reliability. These ports must be memorized alongside the TCP ports for the CCNA exam.</p><p><strong>Essential UDP ports for the CCNA:</strong></p><ul><li><strong>DNS -- UDP 53:</strong> Domain Name System uses UDP for standard name resolution queries because they are small (typically under 512 bytes) and fast -- a single query packet and a single response. If the response is truncated or for zone transfers between DNS servers, DNS falls back to <strong>TCP 53</strong>. DNS is unique in using both UDP and TCP on the same port.</li><li><strong>DHCP Server -- UDP 67, DHCP Client -- UDP 68:</strong> Dynamic Host Configuration Protocol uses two ports because the server and client have different roles. The server listens on port 67 (receives Discover/Request messages). The client listens on port 68 (receives Offer/Acknowledge messages). The DORA process (Discover → Offer → Request → Acknowledge) uses broadcast for the first two steps because the client doesn't have an IP yet.</li><li><strong>TFTP -- UDP 69:</strong> Trivial File Transfer Protocol is a simplified file transfer protocol with no authentication, no directory listing, and no encryption. It is used primarily for transferring network device configuration files and IOS images (e.g., <code>copy tftp: flash:</code>). TFTP uses UDP because it implements its own simple reliability (stop-and-wait ACK for each block).</li><li><strong>NTP -- UDP 123:</strong> Network Time Protocol synchronizes clocks across all network devices. Accurate time is critical for log correlation (syslog timestamps), certificate validation, and security event analysis. NTP uses UDP because time synchronization messages are small and periodic.</li><li><strong>SNMP -- UDP 161 (queries) / 162 (traps):</strong> Simple Network Management Protocol monitors and manages network devices. Port 161 is used for GET/SET queries from the management station to devices. Port 162 receives <strong>traps</strong> (unsolicited alerts from devices to the management station). SNMP versions: v1 (community strings, plaintext), v2c (bulk operations, still plaintext), v3 (authentication + encryption, recommended).</li><li><strong>Syslog -- UDP 514:</strong> Centralized logging protocol. Network devices send log messages to a syslog server. Severity levels: 0=Emergency, 1=Alert, 2=Critical, 3=Error, 4=Warning, 5=Notification, 6=Informational, 7=Debugging. Mnemonic for levels: 'Every Awesome Cisco Engineer Will Need Ice cream Daily.'</li></ul><p><strong>Why these services use UDP:</strong> All of these services involve small, simple transactions (query-response or notification) where the overhead of TCP's connection setup would be wasteful. DNS queries, DHCP broadcasts, NTP sync packets, and SNMP traps are all lightweight -- if one is lost, the application simply retries. The speed benefit of UDP outweighs the lack of guaranteed delivery for these use cases.</p>",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Network Services", items: ["DNS — 53", "DHCP — 67/68", "NTP — 123"] },
        right: { label: "Management", items: ["TFTP — 69", "SNMP — 161/162", "Syslog — 514"] }
      }
    },
    hack: {
      memory: "DNS: 53 -- 'five-three, DNS is alive.' DHCP: 67/68 -- 'server 67, client 68 -- server is one older/first.' TFTP: 69 -- 'Trivial = 69 (nice/simple).' NTP: 123 -- 'time is as easy as 1-2-3.' SNMP: 161/162 -- '161 = I ask the question (GET), 162 = the device screams at me (TRAP).' Syslog: 514 -- 'log me at 5-1-4.' Syslog severity mnemonic: 'Every Awesome Cisco Engineer Will Need Ice-cream Daily' = 0-Emergency, 1-Alert, 2-Critical, 3-Error, 4-Warning, 5-Notification, 6-Informational, 7-Debug.",
      practice: "Add all UDP ports to the same Anki deck as TCP ports. Group by function: Infrastructure services (DNS=53, DHCP=67/68, NTP=123) vs Management/Monitoring (TFTP=69, SNMP=161/162, Syslog=514). Also memorize the syslog severity levels 0-7 -- create a separate flashcard. Quiz daily alongside TCP ports. Test in both directions: port → protocol and protocol → port.",
      effort: "high",
      meta: "Jeremy's IT Lab Day 38 (DHCP), Day 39 (DNS), Day 40 (NTP/Syslog/SNMP), Day 42 (FTP/TFTP). Wendell Odom OCG Chapter 4 and Chapter 13. Same strategy as TCP ports: Anki daily for 2+ weeks. Key gotcha on the exam: DHCP uses TWO ports and the exam asks 'which port does the DHCP server listen on?' (67) vs 'which port does the DHCP client listen on?' (68). Also know that DNS uses BOTH UDP and TCP on port 53 (covered in 1.5.h)."
    }
  },

  "1.5.h": {
    info: "<p><strong>DNS (Domain Name System)</strong> is unique among network protocols because it uses <strong>both TCP and UDP on port 53</strong>. Understanding when DNS uses each protocol is a commonly tested CCNA concept.</p><p><strong>DNS over UDP (port 53) -- default for queries:</strong> Standard DNS name resolution queries use UDP because they are <strong>small, fast, and stateless</strong>. A typical DNS query is a single request packet ('What is the IP for google.com?') and a single response packet ('It's 142.250.80.46'). These exchanges are well under 512 bytes and complete in milliseconds. UDP is ideal because: (1) no connection setup overhead (no three-way handshake), (2) the query-response model maps naturally to UDP's single-packet design, and (3) if a response is lost, the client simply retries after a timeout. The vast majority of DNS traffic (over 99%) uses UDP.</p><p><strong>DNS over TCP (port 53) -- used for zone transfers and large responses:</strong> DNS uses TCP in two specific scenarios:</p><ul><li><strong>Zone transfers (AXFR/IXFR):</strong> When a secondary (slave) DNS server copies the entire zone database from a primary (master) server, the data set is large -- potentially thousands of DNS records. TCP provides the <strong>reliable, ordered delivery</strong> needed to ensure the complete zone is transferred without data loss. AXFR = full zone transfer. IXFR = incremental (only changes since last transfer).</li><li><strong>Truncated responses:</strong> If a DNS response exceeds the maximum UDP message size (traditionally 512 bytes, though EDNS0 extends this to 4096+ bytes), the server sets the <strong>TC (Truncation) flag</strong> in the UDP response header. This tells the client: 'My response was too big for UDP -- retry using TCP.' The client then establishes a TCP connection to port 53 and receives the full response. This commonly occurs with DNSSEC responses (which include cryptographic signatures that make responses larger).</li></ul><p><strong>Summary for the exam:</strong> DNS queries = UDP 53 (fast, small, default). DNS zone transfers = TCP 53 (reliable, large data). DNS truncated response fallback = TCP 53 (client retries over TCP when UDP response is too big). The same port number (53) is used for both protocols.</p>",
    visual: {
      type: "comparison",
      params: {
        left: { label: "DNS over UDP (53)", items: ["Standard queries", "Fast lookups", "< 512 bytes", "Client → Resolver"] },
        right: { label: "DNS over TCP (53)", items: ["Zone transfers (AXFR)", "Large responses", "Truncated UDP fallback", "Server → Server"] }
      }
    },
    hack: {
      memory: "DNS = bilingual -- speaks UDP and TCP, both on port 53. UDP = quick questions ('What's the IP for google.com?' -- fast, small, default). TCP = heavy lifting ('Copy me your entire zone database' = zone transfer, or 'My UDP answer was too big' = truncation fallback). When does DNS use TCP? Two triggers: (1) zone transfers (AXFR/IXFR), (2) truncated UDP response (TC flag). Everything else = UDP.",
      practice: "Create a flashcard: Front: 'When does DNS use TCP instead of UDP?' Back: '(1) Zone transfers -- AXFR/IXFR between DNS servers. (2) Truncated UDP responses -- when the response exceeds the max UDP message size, the TC flag triggers a TCP retry.' Also create: 'What port does DNS use?' Back: 'Port 53 for BOTH TCP and UDP.' In a lab, use 'nslookup' or 'dig' to make DNS queries and observe they use UDP. If you have access to a DNS server, initiate a zone transfer and observe it uses TCP.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 39 (DNS) covers this. Wendell Odom OCG Chapter 13. This is a classic tricky exam question -- many students memorize 'DNS = UDP 53' and forget that TCP is also used. The exam asks: 'Which protocol does DNS use for zone transfers?' Answer: TCP. 'Which protocol does DNS use for standard queries?' Answer: UDP. 'On what port?' Answer: 53 for both. This is one of those questions where knowing the exception (TCP) scores you the point."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     1.6 — Configure and verify IPv4 addressing and subnetting
  ══════════════════════════════════════════════════════════════ */

  "1.6.a": {
    info: "<p><strong>IPv4 addresses</strong> are 32-bit numbers written in <strong>dotted-decimal notation</strong> as four octets separated by periods (e.g., <code>192.168.1.10</code>). Each octet is 8 bits and can range from 0 to 255. In binary, this example is <code>11000000.10101000.00000001.00001010</code>. Understanding the binary form is essential because every subnetting operation happens at the bit level.</p><p>Every IPv4 address has two logical portions: the <strong>network portion</strong> (identifies which subnet the device belongs to) and the <strong>host portion</strong> (identifies the specific device within that subnet). The <strong>subnet mask</strong> determines where the boundary falls. A mask of <code>255.255.255.0</code> (/24) means the first 24 bits identify the network and the last 8 bits identify the host. Devices on the same network share identical network bits.</p><p>The <strong>positional values</strong> for each bit within an octet are critical to memorize: <code>128, 64, 32, 16, 8, 4, 2, 1</code>. These are powers of 2 from 2^7 down to 2^0, and they always sum to 255. To convert decimal to binary, subtract the largest fitting value and mark a 1; to convert binary to decimal, add the positional values of all 1-bits. For example, 201 = 128+64+8+1 = <code>11001001</code>.</p><p>Key structural facts for the exam:</p><ul><li><strong>Total address space</strong> — 2^32 = ~4.3 billion addresses (IPv4 exhaustion is why IPv6 was created)</li><li><strong>Dotted decimal range</strong> — each octet is 0-255 (an address like 192.168.1.256 is invalid)</li><li><strong>Network address</strong> — all host bits set to 0 (identifies the subnet itself, not assignable to a host)</li><li><strong>Broadcast address</strong> — all host bits set to 1 (sends to all hosts on the subnet, not assignable)</li><li><strong>AND operation</strong> — IP address AND subnet mask = network address (this is how routers determine which subnet an address belongs to)</li></ul>",
    visual: {
      type: "binary-breakdown",
      params: {
        bits: "11000000.10101000.00000001.00001010",
        label: "192.168.1.10 — 32 bits, 4 octets",
        highlight: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
      }
    },
    hack: {
      memory: "IPv4 address = street address. Network portion = city name, host portion = house number, subnet mask = the dividing line. The positional values spell out the 'magic 8': <strong>128, 64, 32, 16, 8, 4, 2, 1</strong> — each is half the previous, all sum to 255. Mnemonic: 'All Students Take Calculus, Professors Don't Bring Apples' for positions 128-1.",
      practice: "Open Packet Tracer and build a simple topology: 1 router, 1 switch, 2 PCs. Assign 192.168.1.0/24 addressing. On each PC, run <code>ipconfig</code> to verify the IP, mask, and gateway. Then convert each IP and mask to binary by hand — write out all 32 bits. Practice converting 10 random octets (0-255) to binary and back daily until you can do any conversion in under 10 seconds. Use subnettingpractice.com for timed drills.",
      effort: "high",
      meta: "Binary conversion is THE prerequisite for all subnetting. Jeremy's IT Lab Day 12 covers IPv4 header and addressing. Wendell Odom OCG Chapter 11 (Perspectives on IPv4 Subnetting) drills the binary math. Practice every single day until the exam — if you can't convert fast, every subnetting question eats your time."
    }
  },

  "1.6.b": {
    info: "<p><strong>Classful addressing</strong> was the original IPv4 allocation system (before CIDR). It divides the entire IPv4 space into five classes based on the <strong>leading bits</strong> of the first octet. While modern networks use classless addressing, the CCNA exam still heavily tests classful concepts because they form the foundation of default subnet masks and routing behavior.</p><p>The three usable classes and their characteristics:</p><ul><li><strong>Class A</strong> — first octet 1-126, leading bit pattern <code>0xxxxxxx</code>, default mask /8 (<code>255.0.0.0</code>). Provides 126 networks with 16,777,214 hosts each. Designed for massive organizations (governments, early internet pioneers). Example: <code>10.0.0.0/8</code></li><li><strong>Class B</strong> — first octet 128-191, leading bit pattern <code>10xxxxxx</code>, default mask /16 (<code>255.255.0.0</code>). Provides 16,384 networks with 65,534 hosts each. Designed for medium-to-large organizations. Example: <code>172.16.0.0/16</code></li><li><strong>Class C</strong> — first octet 192-223, leading bit pattern <code>110xxxxx</code>, default mask /24 (<code>255.255.255.0</code>). Provides 2,097,152 networks with 254 hosts each. Designed for small organizations. Example: <code>192.168.1.0/24</code></li></ul><p>Two additional classes exist but are not assignable to hosts:</p><ul><li><strong>Class D</strong> — first octet 224-239, leading bits <code>1110xxxx</code>. Reserved for <strong>multicast</strong> traffic (one-to-many). No subnet mask concept applies.</li><li><strong>Class E</strong> — first octet 240-255, leading bits <code>1111xxxx</code>. Reserved for <strong>experimental</strong> use. Never assigned publicly.</li></ul><p>Critical reserved ranges to memorize: <code>127.0.0.0/8</code> is the <strong>loopback</strong> range (not Class A despite the first octet falling in that range). <code>0.0.0.0/8</code> is reserved for 'this network.' The classful system was replaced by CIDR in 1993 because it wasted enormous amounts of address space — a company needing 300 hosts had to get a Class B (65K hosts) since Class C only offered 254.</p>",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Class / Range / Mask", items: ["A: 1-126 → /8", "B: 128-191 → /16", "C: 192-223 → /24"] },
        right: { label: "Hosts / Use Case", items: ["A: 16,777,214 hosts (huge orgs)", "B: 65,534 hosts (med-large orgs)", "C: 254 hosts (small networks)"] }
      }
    },
    hack: {
      memory: "The leading bits tell the class: <strong>0</strong>=A, <strong>10</strong>=B, <strong>110</strong>=C, <strong>1110</strong>=D, <strong>1111</strong>=E. Each class adds one more leading '1'. For ranges: A starts at 1 (A=first letter=first number), B starts at 128 (Binary boundary: 10000000), C starts at 192 (110 prefix: 128+64). Default masks count network octets: A=/8 (1 octet), B=/16 (2 octets), C=/24 (3 octets). Mnemonic: 'A Begins Counting' = 1 octet, 2 octets, 3 octets.",
      practice: "Drill 20 random IPs and instantly identify: class, default mask, and whether it's private/public. Examples: <code>172.20.5.1</code> = Class B, /16 default, private. <code>8.8.8.8</code> = Class A, /8 default, public. Open Packet Tracer, assign IPs from each class to different interfaces on a router, and use <code>show ip interface brief</code> to see the masks applied. Time yourself — target instant recognition under 3 seconds per address.",
      effort: "medium",
      meta: "The exam tests classful addressing despite CIDR being the standard. Jeremy's IT Lab Day 12 covers classful addressing. Wendell Odom OCG Chapter 11 explains the history. The first-octet ranges must be memorized cold — 1-126 (A), 128-191 (B), 192-223 (C), 224-239 (D), 240-255 (E). The 127 gap for loopback is a common trick question."
    }
  },

  "1.6.c": {
    info: "<p><strong>Subnet masks</strong> are 32-bit values that separate the network portion (contiguous 1-bits on the left) from the host portion (contiguous 0-bits on the right) of an IPv4 address. A mask of <code>255.255.255.0</code> in binary is <code>11111111.11111111.11111111.00000000</code> \u2014 24 ones followed by 8 zeros. The 1-bits mark network bits; the 0-bits mark host bits. A subnet mask can <strong>never</strong> have a 0 followed by a 1 (e.g., <code>255.0.255.0</code> is invalid).</p><p>Subnet masks can be expressed in two formats: <strong>dotted decimal</strong> (e.g., <code>255.255.255.0</code>) and <strong>CIDR slash notation</strong> (e.g., <code>/24</code>). The CIDR number simply counts the 1-bits. Both formats convey the same information. The exam expects instant conversion between them. The critical last-octet values to memorize:</p><ul><li><code>/24</code> = 255.255.255.<strong>0</strong> (00000000) \u2014 256 addresses, 254 usable hosts</li><li><code>/25</code> = 255.255.255.<strong>128</strong> (10000000) \u2014 128 addresses, 126 usable hosts</li><li><code>/26</code> = 255.255.255.<strong>192</strong> (11000000) \u2014 64 addresses, 62 usable hosts</li><li><code>/27</code> = 255.255.255.<strong>224</strong> (11100000) \u2014 32 addresses, 30 usable hosts</li><li><code>/28</code> = 255.255.255.<strong>240</strong> (11110000) \u2014 16 addresses, 14 usable hosts</li><li><code>/29</code> = 255.255.255.<strong>248</strong> (11111000) \u2014 8 addresses, 6 usable hosts</li><li><code>/30</code> = 255.255.255.<strong>252</strong> (11111100) \u2014 4 addresses, 2 usable hosts (point-to-point links)</li><li><code>/31</code> = 255.255.255.<strong>254</strong> (11111110) \u2014 2 addresses, 2 usable (RFC 3021, P2P only)</li><li><code>/32</code> = 255.255.255.<strong>255</strong> (11111111) \u2014 1 address, host route</li></ul><p>When a router receives a packet, it performs a <strong>bitwise AND</strong> between the destination IP and each route\u2019s subnet mask to determine if the packet matches that route\u2019s network. Understanding this AND operation is key: <code>192.168.1.130 AND 255.255.255.192</code> = <code>192.168.1.128</code> (the network address). This is how routers make forwarding decisions.</p><p>For masks in the second and third octets (less common but testable): <code>/16</code> = <code>255.255.0.0</code>, <code>/17</code> = <code>255.255.128.0</code>, <code>/18</code> = <code>255.255.192.0</code>, and so on \u2014 the same pattern (128, 192, 224, 240, 248, 252, 254, 255) applies to any \u2018interesting octet\u2019 where the mask transitions from 1s to 0s.</p>",
    visual: {
      type: "binary-breakdown",
      params: {
        bits: "11111111.11111111.11111111.00000000",
        label: "/24 = 255.255.255.0",
        highlight: [24, 25, 26, 27, 28, 29, 30, 31]
      }
    },
    hack: {
      memory: "The magic mask values for the interesting octet: <strong>128, 192, 224, 240, 248, 252, 254, 255</strong> map to /25 through /32. Each value adds one more 1-bit. Quick trick: subtract from 256 to get the <strong>block size</strong> (256-192=64 for /26). Mnemonic: My Cat Eats Fish, That Really Very Funny = 128, 192, 224, 240, 248, 252, 254, 255.",
      practice: "Build a full subnet reference chart on paper: /24 through /32 with dotted-decimal, binary, block size, and usable hosts. Then drill: someone says /27 and you instantly say 255.255.255.224, block size 32, 30 hosts. In Packet Tracer, configure a router interface with ip address 10.0.0.1 255.255.255.224, then verify with show ip interface brief. Practice converting between CIDR and dotted decimal until it is instant \u2014 target under 5 seconds each.",
      effort: "high",
      meta: "You MUST convert between CIDR and dotted-decimal instantly. This skill underlies every subnetting question. Jeremy IT Lab Day 13 (Subnetting Part 1) covers subnet masks. Wendell Odom OCG Chapter 12 (Analyzing Classful IPv4 Networks) drills mask conversion. Tape the mask chart to your monitor and drill daily."
    }
  },

  "1.6.d": {
    info: "<p>Given an IP address and subnet mask, you must be able to calculate four critical values: the <strong>network address</strong>, the <strong>broadcast address</strong>, the <strong>first usable host</strong>, and the <strong>last usable host</strong>. This is the single most tested subnetting skill on the CCNA exam, and you must be able to do it in under 60 seconds per problem.</p><p>The <strong>block size method</strong> is the fastest approach. The block size equals 256 minus the mask value in the interesting octet (the octet where the mask is not 0 or 255). For a /26 mask (255.255.255.192), the block size is 256-192 = <strong>64</strong>. Subnets start at multiples of the block size: 0, 64, 128, 192. To find the network address, determine which block the IP falls into. For <code>192.168.1.130/26</code>: 130 falls between 128 and 192, so the network is <strong>192.168.1.128</strong>.</p><p>Once you know the network address, the other values follow a simple pattern:</p><ul><li><strong>Network address</strong> \u2014 all host bits set to 0: <code>192.168.1.128</code> (not assignable to a host)</li><li><strong>First usable host</strong> \u2014 network address + 1: <code>192.168.1.129</code></li><li><strong>Last usable host</strong> \u2014 broadcast address - 1: <code>192.168.1.190</code></li><li><strong>Broadcast address</strong> \u2014 next network minus 1 (all host bits set to 1): <code>192.168.1.191</code> (not assignable to a host)</li></ul><p>Another worked example: <code>10.1.77.55/20</code>. The interesting octet is the third (mask = 255.255.<strong>240</strong>.0). Block size = 256-240 = 16 in the third octet. Multiples of 16: 0, 16, 32, 48, <strong>64</strong>, 80... The value 77 falls between 64 and 80. Network = <code>10.1.64.0</code>, Broadcast = <code>10.1.79.255</code>, usable range = <code>10.1.64.1</code> to <code>10.1.79.254</code>. For /20, that is 4094 usable hosts.</p><p>The <strong>binary method</strong> (slower but foundational): write the IP in binary, draw the mask boundary at bit 26, set all host bits to 0 for the network address and all host bits to 1 for the broadcast. Both methods give the same answer \u2014 use whichever is faster for you on exam day.</p>",
    visual: {
      type: "binary-breakdown",
      params: {
        bits: "11000000.10101000.00000001.10|000000",
        label: "192.168.1.130/26 → Network .128, Broadcast .191",
        highlight: [26, 27, 28, 29, 30, 31]
      }
    },
    hack: {
      memory: "Block size = <strong>256 minus the interesting octet mask value</strong>. Subnets start at 0, then every block size. IP falls in the nearest block below it. Broadcast = next block - 1. First host = network + 1. Last host = broadcast - 1. Mnemonic: Net, Net+1, Bcast-1, Bcast = Never Forget Boundaries Buddy.",
      practice: "Solve 10 subnetting problems daily using the block-size method. Use subnettingpractice.com or subnetting.org for random problems. In Packet Tracer, build a 3-router topology and assign addresses from calculated subnets \u2014 if you subnet wrong, the pings will fail. Target under 60 seconds per problem, then push for 30 seconds. The exam gives limited time and a whiteboard.",
      effort: "high",
      meta: "This is THE most tested subnetting skill on the CCNA. Jeremy IT Lab Day 13-14 covers subnetting methods extensively. Wendell Odom OCG Chapter 13 (Analyzing Subnet Masks) and Chapter 14 (Analyzing Existing Subnets) are the definitive references. subnettingpractice.com is the most recommended community resource."
    }
  },

  "1.6.e": {
    info: "<p>Two fundamental formulas govern subnetting math: <strong>number of subnets</strong> = 2^(borrowed bits) and <strong>number of usable hosts per subnet</strong> = 2^(host bits) - 2. The -2 accounts for the network address (all host bits 0) and broadcast address (all host bits 1), neither of which can be assigned to a device.</p><p><strong>Borrowed bits</strong> are the bits you take from the host portion beyond the classful default mask and assign to the network portion. For a Class C network (default /24) subnetted to /26, you borrow 2 bits (26-24=2). This gives 2^2 = <strong>4 subnets</strong>, each with 2^6 - 2 = <strong>62 usable hosts</strong> (6 host bits remain from the original 8). Every additional borrowed bit doubles the number of subnets and halves the number of hosts.</p><p>The critical subnet/host table for Class C (/24 base) that you must memorize:</p><ul><li><code>/25</code> \u2014 1 borrowed bit = 2 subnets, 126 hosts each (block size 128)</li><li><code>/26</code> \u2014 2 borrowed bits = 4 subnets, 62 hosts each (block size 64)</li><li><code>/27</code> \u2014 3 borrowed bits = 8 subnets, 30 hosts each (block size 32)</li><li><code>/28</code> \u2014 4 borrowed bits = 16 subnets, 14 hosts each (block size 16)</li><li><code>/29</code> \u2014 5 borrowed bits = 32 subnets, 6 hosts each (block size 8)</li><li><code>/30</code> \u2014 6 borrowed bits = 64 subnets, 2 hosts each (block size 4, for P2P links)</li></ul><p>The same formulas apply to Class A and B networks. For a <code>10.0.0.0/8</code> network subnetted to /16, you borrow 8 bits (16-8=8): 2^8 = 256 subnets, each with 2^16 - 2 = 65,534 hosts. The exam may present problems from any class, so practice with all three.</p><p>A common exam question format: A network administrator needs at least 50 hosts per subnet. What is the most efficient subnet mask? Work backwards: 2^6 - 2 = 62 (enough), 2^5 - 2 = 30 (not enough), so you need 6 host bits = <strong>/26</strong>. Always round up to the next power of 2 when the host requirement does not land exactly on a power.</p>",
    visual: {
      type: "binary-breakdown",
      params: {
        bits: "11111111.11111111.11111111.11|000000",
        label: "/26: 2 borrowed bits = 4 subnets, 6 host bits = 62 hosts",
        highlight: [24, 25]
      }
    },
    hack: {
      memory: "Subnets = 2^<strong>stolen</strong>. Hosts = 2^<strong>left</strong> - 2. Stolen from host, given to network. The -2 is always for network and broadcast. Memorize the hosts column: <strong>126, 62, 30, 14, 6, 2</strong> \u2014 these correspond to /25 through /30 on a Class C. Each is roughly half the previous minus 2.",
      practice: "Write the full /25-/30 table from memory: mask, borrowed bits, subnets, host bits, usable hosts, block size. Then work backwards \u2014 I need 25 hosts per subnet, what mask? (Answer: /27 gives 30). In Packet Tracer, subnet 192.168.1.0/24 into /26 (4 subnets), assign each to a different VLAN on a switch, and verify hosts can only ping within their own subnet. Use show ip route on the router to confirm all four connected networks appear.",
      effort: "high",
      meta: "Memorize the hosts-per-subnet column cold: 126, 62, 30, 14, 6, 2. These numbers appear constantly in exam questions. Jeremy IT Lab Day 13 covers the formulas. Wendell Odom OCG Chapter 13 provides exhaustive practice. The how-many-hosts-do-I-need reverse-lookup question is almost guaranteed."
    }
  },

  "1.6.f": {
    info: "<p><strong>VLSM (Variable Length Subnet Masking)</strong> allows using different subnet masks within the same major network, enabling efficient IP address allocation by sizing each subnet to match its actual host requirement. Without VLSM (fixed-length subnetting), every subnet must use the same mask \u2014 a company needing one 200-host LAN and four 2-host point-to-point links would have to use /24 everywhere, wasting hundreds of addresses on the P2P links.</p><p>With VLSM, you can allocate: a <strong>/24</strong> for the 200-host LAN (254 usable), a <strong>/26</strong> for a 50-host department (62 usable), a <strong>/28</strong> for a 10-host lab (14 usable), and <strong>/30</strong> for each point-to-point router link (2 usable). Each subnet gets exactly the right amount of address space. This is how real-world enterprise networks are designed.</p><p>The <strong>VLSM allocation process</strong> follows a strict rule \u2014 always allocate the <strong>largest subnet first</strong>, then work downward:</p><ul><li>Step 1: List all required subnets with their host counts, sorted largest to smallest</li><li>Step 2: Determine the mask needed for the largest subnet (e.g., 200 hosts requires /24)</li><li>Step 3: Allocate that subnet starting at the base network address</li><li>Step 4: The next subnet starts at the first address after the previous subnet\u2019s broadcast</li><li>Step 5: Repeat for the next largest subnet, using its own appropriate mask</li></ul><p>Worked example from <code>172.16.0.0/24</code>: Need 100 hosts (use /25 = 126 hosts, range .0-.127), 50 hosts (use /26 = 62 hosts, range .128-.191), 20 hosts (use /27 = 30 hosts, range .192-.223), and a P2P link (use /30 = 2 hosts, range .224-.227). Total addresses used: 228 out of 256 \u2014 efficient. Fixed-length at /25 would only give 2 subnets from the same /24.</p><p>VLSM requires a <strong>classless routing protocol</strong> (OSPF, EIGRP, RIPv2) that includes the subnet mask in routing updates. Classful protocols (RIPv1, IGRP) cannot support VLSM because they assume the default classful mask. This is why classless routing is the modern standard.</p>",
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
      memory: "VLSM = <strong>custom-size boxes</strong> for shipping. Big items get big boxes, small items get small boxes. Fixed-length = one-size-fits-all (wasteful). Golden rule: <strong>largest subnet first</strong>, work downward. Each new subnet starts right after the previous subnet\u2019s broadcast address \u2014 no gaps, no overlaps.",
      practice: "Solve this VLSM problem on paper: From 172.16.1.0/24, allocate subnets for 100 hosts, 50 hosts, 25 hosts, 10 hosts, and 2 P2P links. Show network address, broadcast, and usable range for each. Then build it in Packet Tracer: 3 routers connected via serial links (/30), each router connected to a LAN of different sizes. Configure OSPF and verify all subnets appear in show ip route. Test end-to-end pings. Use subnetting.org for additional VLSM practice problems.",
      effort: "high",
      meta: "VLSM is the hardest subnetting topic on the CCNA and frequently appears in simulation questions. Jeremy IT Lab Day 14 (Subnetting Part 2) covers VLSM extensively. Wendell Odom OCG Chapter 14 provides VLSM practice problems. David Bombal VLSM video is the most community-recommended supplemental resource. Always allocate largest first."
    }
  },

  "1.6.g": {
    info: "<p><strong>Binary-to-decimal conversion</strong> is the foundational skill for all subnetting operations. Each bit in an octet has a positional value based on powers of 2, reading left to right: <code>128, 64, 32, 16, 8, 4, 2, 1</code> (2^7 through 2^0). To convert binary to decimal, add the positional values of all bits that are set to 1. For example, <code>11001010</code> = 128 + 64 + 0 + 0 + 8 + 0 + 2 + 0 = <strong>202</strong>.</p><p><strong>Decimal-to-binary conversion</strong> works by subtracting the largest fitting power of 2 and marking a 1 at that position. For 202: 202-128=74 (mark 1), 74-64=10 (mark 1), 10&lt;32 (mark 0), 10&lt;16 (mark 0), 10-8=2 (mark 1), 2&lt;4 (mark 0), 2-2=0 (mark 1), 0 (mark 0) = <code>11001010</code>. Always write all 8 bits \u2014 leading zeros matter in networking.</p><p>Key binary values to memorize instantly:</p><ul><li><code>00000000</code> = 0 | <code>10000000</code> = 128 | <code>11000000</code> = 192</li><li><code>11100000</code> = 224 | <code>11110000</code> = 240 | <code>11111000</code> = 248</li><li><code>11111100</code> = 252 | <code>11111110</code> = 254 | <code>11111111</code> = 255</li></ul><p>These 9 values are the only valid subnet mask octets. If you memorize them, you can convert any subnet mask instantly. The pattern is simple: each adds one more 1-bit from the left. The positional values also give you the block sizes for subnetting \u2014 a /26 mask (11000000 in the last octet = 192) has a block size of 256-192 = 64.</p><p><strong>Hexadecimal</strong> is also tested (especially for IPv6 and MAC addresses). Each hex digit represents exactly 4 bits: 0=0000, 1=0001, ... 9=1001, A=1010, B=1011, C=1100, D=1101, E=1110, F=1111. To convert hex to decimal: <code>0xCA</code> = C(12)*16 + A(10)*1 = 192+10 = 202. Binary-to-hex: group bits in fours from the right \u2014 <code>11001010</code> = <code>1100</code> <code>1010</code> = <code>CA</code>.</p>",
    visual: {
      type: "binary-breakdown",
      params: {
        bits: "11001010.00000000.00000000.00000000",
        label: "128+64+8+2 = 202 | Position values: 128,64,32,16,8,4,2,1",
        highlight: [0, 1, 4, 6]
      }
    },
    hack: {
      memory: "The <strong>magic 8 positional values</strong>: 128, 64, 32, 16, 8, 4, 2, 1. They always sum to 255. Each is half the previous. Write them across the top of your exam whiteboard the instant you sit down \u2014 this is your cheat sheet for every subnetting question. For hex: A=10, B=11, C=12, D=13, E=14, F=15.",
      practice: "Convert 20 random decimals (0-255) to binary and 20 random 8-bit binaries to decimal daily. Time yourself \u2014 target under 10 seconds each. Then practice hex: convert 10 random decimals to hex and back. In Packet Tracer, look at MAC address tables (show mac address-table) and practice reading hex values. Build speed by doing 5 minutes of conversion drills at the start of every study session.",
      effort: "high",
      meta: "This is THE prerequisite skill for subnetting. If you cannot convert binary/decimal fast, every subnetting question eats your exam time. Jeremy IT Lab Day 12 covers binary and hexadecimal conversion. Wendell Odom OCG Chapter 11 drills the math. Practice every single day \u2014 this is the most common advice from CCNA passers."
    }
  },

  "1.6.h": {
    info: "<p>Three essential IOS commands verify that IPv4 addressing and routing are configured correctly: <code>show ip interface brief</code>, <code>show ip route</code>, and <code>ping</code>. Mastering the output of these commands is critical because the exam frequently presents command output and asks you to diagnose issues.</p><p><code>show ip interface brief</code> displays a compact table showing every interface on the device with its IP address, status (up/down), and protocol state. The two status columns are key: <strong>Status</strong> reflects Layer 1 (physical \u2014 is the cable connected?) and <strong>Protocol</strong> reflects Layer 2 (data link \u2014 is the protocol negotiation successful?). Common states: up/up (working), administratively down/down (shutdown command applied), up/down (L1 ok but L2 failed \u2014 encapsulation mismatch or missing clock rate on serial). An interface showing unassigned means no IP address has been configured.</p><p><code>show ip route</code> displays the full routing table \u2014 every network the router knows how to reach. Each entry shows the route source code, destination network/mask, administrative distance/metric, next-hop IP or exit interface, and route age. Critical route codes to memorize:</p><ul><li><strong>C</strong> \u2014 Connected (directly attached network, auto-added when interface goes up/up)</li><li><strong>L</strong> \u2014 Local (/32 host route for the router\u2019s own interface IP)</li><li><strong>S</strong> \u2014 Static (manually configured by administrator)</li><li><strong>O</strong> \u2014 OSPF | <strong>D</strong> \u2014 EIGRP | <strong>R</strong> \u2014 RIP (dynamically learned)</li><li><strong>S*</strong> \u2014 Candidate default route (0.0.0.0/0 via static)</li></ul><p><code>ping</code> sends ICMP Echo Request packets to test Layer 3 reachability. A successful ping (!!!!! = 5 replies) confirms the entire path works \u2014 source IP, routing, and destination are all correct. A failed ping (.....) means check: Is the destination IP correct? Is there a route in both directions? Are ACLs blocking ICMP? <code>traceroute</code> (or <code>tracert</code> on Windows) extends this by showing each hop along the path, invaluable for identifying where packets are being dropped.</p><p>A systematic verification workflow: (1) <code>show ip interface brief</code> \u2014 confirm interfaces are up/up with correct IPs. (2) <code>show ip route</code> \u2014 confirm routes exist to the destination network. (3) <code>ping</code> the next-hop first, then the destination \u2014 this isolates whether the problem is local or remote.</p>",
    visual: {
      type: "comparison",
      params: {
        left: { label: "show ip interface brief", items: ["Interface list", "IP addresses assigned", "Status/protocol codes", "Quick health check"] },
        right: { label: "show ip route", items: ["Full routing table", "Connected (C) routes", "Static (S) routes", "Dynamic routes (O, D, R)"] }
      }
    },
    hack: {
      memory: "<code>show ip interface brief</code> = the attendance sheet (who is here, what is their address, are they awake?). <code>show ip route</code> = the GPS map (how to reach every destination network). <code>ping</code> = knocking on the door (are you actually there?). Route codes: <strong>C</strong>onnected, <strong>L</strong>ocal, <strong>S</strong>tatic, <strong>O</strong>SPF, <strong>D</strong> (EIGRP = Dual), <strong>R</strong>IP.",
      practice: "In Packet Tracer, build a 3-router linear topology (R1--R2--R3) with different subnets on each link and LAN. Configure static routes so all networks can reach each other. On each router, run show ip interface brief (verify all interfaces up/up), show ip route (verify C, L, and S routes), and ping across the full path. Intentionally break things \u2014 shut down an interface, remove a static route, misconfigure a mask \u2014 and observe how the command output changes. Practice reading the output until you can spot issues in seconds.",
      effort: "medium",
      meta: "These three commands appear in nearly every CCNA exam scenario and lab simulation. Jeremy IT Lab Day 12-14 uses them constantly. Wendell Odom OCG Chapter 14 covers verification. The exam loves showing show ip route output and asking why can R1 not ping 10.0.3.0/24 \u2014 the answer is always a missing route, wrong mask, or interface down."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     1.7 — Describe private IPv4 addressing
  ══════════════════════════════════════════════════════════════ */

  "1.7.a": {
    info: "<p><strong>RFC 1918</strong> defines three private IPv4 address ranges that are reserved for internal use and are <strong>not routable on the public internet</strong>. The Class A private range is <code>10.0.0.0/8</code> (10.0.0.0 through 10.255.255.255), providing <strong>16,777,214</strong> usable host addresses. This is by far the largest private range \u2014 a single /8 network gives you over 16 million addresses to subnet however you need.</p><p>The <code>10.0.0.0/8</code> range is the most commonly used private range in <strong>enterprise networks</strong>, data centers, and cloud providers. Large organizations choose it because it provides massive flexibility for subnetting \u2014 you can create thousands of /24 subnets, hundreds of /16 subnets, or any VLSM scheme without running out of addresses. CoreWeave, AWS, Azure, and most corporate networks use 10.x.x.x internally.</p><p>Key facts about the 10.0.0.0/8 range:</p><ul><li>The <strong>entire first octet</strong> is fixed at 10 \u2014 any address starting with 10.x.x.x is private</li><li>The remaining 24 bits (3 octets) are available for subnetting and host assignment</li><li>It falls within the Class A range (1-126), but the /8 mask is the default for all Class A</li><li>Common subnetting: <code>10.0.0.0/16</code> per site, <code>10.0.1.0/24</code> per VLAN, <code>10.0.0.0/30</code> for P2P links</li><li>Internet routers are configured to <strong>drop</strong> any packet with a 10.x.x.x source or destination</li></ul>",
    visual: {
      type: "binary-breakdown",
      params: {
        bits: "00001010.xxxxxxxx.xxxxxxxx.xxxxxxxx",
        label: "10.0.0.0/8 — 16,777,214 hosts",
        highlight: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
      }
    },
    hack: {
      memory: "10 = TEN = <strong>The Enterprise Network</strong>. One /8 to rule them all. Biggest private range by far. If it starts with 10, it is always private \u2014 no exceptions, no edge cases. Mnemonic for all three private ranges: 10, 172, 192 \u2014 private IP family of 3.",
      practice: "Memorize all three private ranges with their CIDR notations and address counts. Quick drill: Is 10.50.200.1 private? YES (10.x.x.x = always private). Is 11.0.0.1 private? NO (11 is public Class A). In Packet Tracer, build a network using 10.0.0.0/8 with three subnets: 10.0.1.0/24, 10.0.2.0/24, and a /30 link between routers at 10.0.0.0/30. Configure inter-VLAN routing and verify with pings.",
      effort: "low",
      meta: "Guaranteed exam topic. Know all three ranges instantly. Jeremy IT Lab Day 47 covers NAT and private addressing. Wendell Odom OCG Chapter 10 (Implementing IPv4) covers RFC 1918 ranges. The exam tests instant recognition \u2014 given any IP, you must know if it is private or public within seconds."
    }
  },

  "1.7.b": {
    info: "<p>The Class B private range is <code>172.16.0.0/12</code> (172.16.0.0 through 172.31.255.255), providing approximately <strong>1,048,574</strong> usable host addresses. This is the <strong>trickiest private range</strong> to remember because the /12 mask means the boundary falls in the middle of the second octet, making the valid range 172.<strong>16</strong> through 172.<strong>31</strong> \u2014 not 172.0 through 172.255 as many students mistakenly assume.</p><p>Understanding why the range stops at 172.31: The /12 prefix means the first 12 bits are fixed. In binary, 172.16 = <code>10101100.0001</code>0000. The first 12 bits (<code>10101100.0001</code>) are the network prefix. The remaining 4 bits in the second octet can vary from 0000 (16) to 1111 (31), giving the range 172.16.x.x through 172.31.x.x. The address 172.32.0.0 has the 13th bit flipped (<code>10101100.0010</code>0000), which falls outside the /12 prefix \u2014 so 172.32.x.x is <strong>public</strong>.</p><p>This range is commonly used by medium-sized organizations and is Docker\u2019s default network range (<code>172.17.0.0/16</code>). It provides a good middle ground between the massive 10/8 and the smaller 192.168/16. Common subnetting schemes: <code>172.16.0.0/16</code> per site (up to 16 sites from /16 blocks), <code>172.16.1.0/24</code> per VLAN.</p><p><strong>Exam trap edge cases to drill:</strong></p><ul><li><code>172.15.255.255</code> \u2014 <strong>PUBLIC</strong> (15 is below 16)</li><li><code>172.16.0.1</code> \u2014 <strong>PRIVATE</strong> (16 is the start)</li><li><code>172.31.255.254</code> \u2014 <strong>PRIVATE</strong> (31 is the end)</li><li><code>172.32.0.1</code> \u2014 <strong>PUBLIC</strong> (32 is above 31)</li></ul>",
    visual: {
      type: "binary-breakdown",
      params: {
        bits: "10101100.0001xxxx.xxxxxxxx.xxxxxxxx",
        label: "172.16.0.0/12 — Second octet: 16 to 31 only",
        highlight: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
      }
    },
    hack: {
      memory: "172.16 to 172.31 \u2014 sweet 16 never turns 32. The /12 is the tricky one everyone gets wrong. Binary proof: 172.16 in binary has the first 12 bits as the prefix, and the 4 remaining bits in octet 2 give you 0000(16) through 1111(31). Write 172.16-172.31 on a sticky note and keep it visible during study.",
      practice: "Drill edge cases until they are automatic: Is 172.15.0.1 private? NO. Is 172.32.0.1 private? NO. Is 172.20.5.1 private? YES. Is 172.31.255.1 private? YES. In Packet Tracer, configure two routers with 172.16.0.0/30 on their connecting link and 172.16.1.0/24 and 172.16.2.0/24 on their LANs. Verify connectivity and use show ip route to see the /12-based subnets.",
      effort: "low",
      meta: "The 172.16.0.0/12 range is the most commonly incorrect answer on the exam. Students forget the .31 boundary and select 172.32.x.x as private. Jeremy IT Lab Day 47 covers this. Wendell Odom OCG Chapter 10 emphasizes the edge cases. Drill until the 16-31 range is automatic."
    }
  },

  "1.7.c": {
    info: "<p>The Class C private range is <code>192.168.0.0/16</code> (192.168.0.0 through 192.168.255.255), providing <strong>65,534</strong> usable host addresses. This is the most familiar private range \u2014 virtually every home router, consumer access point, and SOHO network uses <code>192.168.0.x</code> or <code>192.168.1.x</code> as its default LAN addressing. If you have ever connected to a home Wi-Fi network, you have used this range.</p><p>Despite being called the Class C private range, it actually spans a <strong>/16 block</strong> (two octets for network, two for hosts) \u2014 the same size as a Class B default allocation. This means the entire <code>192.168.x.x</code> space (256 possible /24 subnets) is private. Common defaults by manufacturer:</p><ul><li><strong>Linksys/Cisco consumer</strong>: 192.168.1.0/24 (gateway at .1)</li><li><strong>Netgear</strong>: 192.168.1.0/24 (gateway at .1)</li><li><strong>D-Link</strong>: 192.168.0.0/24 (gateway at .1)</li><li><strong>TP-Link</strong>: 192.168.0.0/24 (gateway at .1)</li></ul><p>The range is used for small networks because individual /24 subnets within it provide 254 hosts each \u2014 more than enough for a home or small office. In enterprise environments, 192.168.x.x is sometimes used for guest networks, lab environments, or management VLANs, though most large organizations prefer 10.x.x.x for its much larger address space.</p><p><strong>Common exam confusion</strong>: <code>192.168.x.x</code> is private, but <code>192.169.x.x</code> is <strong>public</strong>. The boundary is precise \u2014 only the 192.<strong>168</strong> second octet is private. Also note: 192.168.0.0/16 falls within the Class C first-octet range (192-223), but the /16 prefix is not the Class C default of /24.</p>",
    visual: {
      type: "binary-breakdown",
      params: {
        bits: "11000000.10101000.xxxxxxxx.xxxxxxxx",
        label: "192.168.0.0/16 — The home network range",
        highlight: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
      }
    },
    hack: {
      memory: "192.168 = your home router. Everyone knows this one. Key detail: the entire 192.168.x.x space is private (/16 = two octets), not just 192.168.1.x. Do not confuse 192.168 (private) with 192.169 (public) \u2014 the boundary is exact at the second octet.",
      practice: "Quick drill: 192.168.50.1 \u2014 private? YES. 192.169.1.1 \u2014 private? NO (169 not 168). 192.168.0.0 \u2014 private? YES (network address). 191.168.1.1 \u2014 private? NO (191 not 192). In Packet Tracer, build a classic home network: one router (gateway 192.168.1.1/24), one switch, 3 PCs (192.168.1.10-12/24). Configure DHCP on the router and verify PCs get addresses in the 192.168.1.x range with ipconfig.",
      effort: "low",
      meta: "Easiest of the three ranges to remember since you use it daily at home. Jeremy IT Lab Day 47 covers all three RFC 1918 ranges together. Wendell Odom OCG Chapter 10. Just do not confuse 192.168 (private) with 192.169 (public) \u2014 the exam tests this exact boundary."
    }
  },

  "1.7.d": {
    info: "<p><strong>RFC 1918</strong> (published 1996) formally defines the three private IPv4 address ranges: <code>10.0.0.0/8</code>, <code>172.16.0.0/12</code>, and <code>192.168.0.0/16</code>. These addresses are <strong>not routable on the public internet</strong> \u2014 internet backbone routers are explicitly configured to drop any packet with a private source or destination IP. This means a device with a private address cannot communicate directly with the internet without translation.</p><p><strong>NAT (Network Address Translation)</strong> solves this by translating private addresses to public addresses at the network boundary (typically on the edge router or firewall). NAT is what allows millions of internal devices across thousands of organizations to all use the same private address ranges (e.g., 192.168.1.0/24) without conflicting on the internet. The three types of NAT:</p><ul><li><strong>Static NAT</strong> \u2014 one-to-one permanent mapping. One private IP always translates to the same public IP. Used for servers that need consistent external access (web servers, mail servers). Command: <code>ip nat inside source static 192.168.1.10 203.0.113.10</code></li><li><strong>Dynamic NAT</strong> \u2014 many-to-many mapping from a pool. Private IPs are assigned public IPs from a pool on a first-come basis. When the pool is exhausted, additional hosts cannot access the internet. Rarely used in modern networks.</li><li><strong>PAT (Port Address Translation / NAT Overload)</strong> \u2014 many-to-one mapping. Multiple private IPs share a <strong>single public IP</strong>, differentiated by source port numbers. This is what your home router does. Command keyword: <code>overload</code>. PAT is the most common NAT type in the real world and on the exam.</li></ul><p>NAT uses four address terms that the exam tests:</p><ul><li><strong>Inside Local</strong> \u2014 the private IP on the internal network (e.g., 192.168.1.10)</li><li><strong>Inside Global</strong> \u2014 the public IP that the inside host is translated to (e.g., 203.0.113.5)</li><li><strong>Outside Local</strong> \u2014 the IP of the external host as seen from inside (usually same as Outside Global)</li><li><strong>Outside Global</strong> \u2014 the actual public IP of the external host (e.g., 8.8.8.8)</li></ul><p>To verify NAT: <code>show ip nat translations</code> displays the current translation table, and <code>show ip nat statistics</code> shows hit counts and pool usage. <code>clear ip nat translation *</code> flushes all dynamic entries.</p>",
    visual: {
      type: "packet-flow",
      params: { nodes: ["Private IP (192.168.1.10)", "NAT Router", "Public Internet (203.0.113.5)"], color: "#10b981" }
    },
    hack: {
      memory: "Private IPs = fake IDs \u2014 they do not work outside the club (internet). NAT = the bouncer who swaps your fake ID for a real one at the door. PAT = one real ID shared by everyone, differentiated by wristband number (port). NAT address terms: think Inside/Outside x Local/Global \u2014 Inside Local is the real private IP, Inside Global is what the internet sees.",
      practice: "In Packet Tracer, configure PAT (NAT overload) on a router: (1) Create an ACL matching the inside network, (2) Configure ip nat inside source list [ACL] interface [outside-if] overload, (3) Mark interfaces with ip nat inside and ip nat outside. Send traffic from an internal PC to an external server. Verify with show ip nat translations \u2014 you should see the private IP mapped to the router outside IP with unique port numbers. Then configure static NAT for a web server and verify it gets a dedicated public mapping.",
      effort: "medium",
      meta: "The concept private = needs NAT for internet is a core exam theme. Know RFC 1918 by name. Jeremy IT Lab Day 47 covers NAT types, configuration, and verification in detail. Wendell Odom OCG Chapter 16 (NAT) is the reference. The Inside Local/Inside Global/Outside Local/Outside Global terminology is heavily tested \u2014 draw the four-quadrant diagram."
    }
  },

  "1.7.e": {
    info: "<p><strong>APIPA (Automatic Private IP Addressing)</strong> uses the range <code>169.254.0.0/16</code> (169.254.0.0 through 169.254.255.255) and is formally defined as the <strong>IPv4 link-local</strong> address range. When a device is configured to obtain an IP address via DHCP but <strong>fails to receive a DHCP Offer</strong> (no DHCP server reachable, server down, relay misconfigured, or network cable disconnected), the device self-assigns a random address from 169.254.1.0 through 169.254.254.255 (the first and last /24 blocks are reserved).</p><p>APIPA addresses are <strong>strictly local</strong> \u2014 they cannot be routed and only allow communication between devices on the same physical network segment that also have APIPA addresses. A device with a 169.254.x.x address cannot reach the internet, access servers on other subnets, or communicate with devices that have properly assigned addresses. This is by design \u2014 APIPA is a fallback mechanism, not a functional network configuration.</p><p>When you see <code>169.254.x.x</code> on a device, it is a <strong>diagnostic red flag</strong> that means DHCP failed. The troubleshooting steps are:</p><ul><li>Check physical connectivity \u2014 is the cable plugged in? Is the link light on?</li><li>Check the DHCP server \u2014 is it running? Does it have addresses available in its pool?</li><li>Check the DHCP relay \u2014 if the server is on a different subnet, is <code>ip helper-address</code> configured on the gateway?</li><li>On Windows, run <code>ipconfig /release</code> then <code>ipconfig /renew</code> to retry DHCP</li><li>On Linux, run <code>sudo dhclient -r</code> then <code>sudo dhclient</code></li></ul><p>APIPA is a Windows and macOS feature (RFC 3927). Cisco routers and switches do <strong>not</strong> use APIPA \u2014 if a Cisco interface has no IP configured, it simply has no IP. The APIPA process works by sending ARP probes to check if the randomly selected address is already in use (conflict detection) before claiming it.</p>",
    visual: {
      type: "packet-flow",
      params: { nodes: ["PC (DHCP Discover)", "No DHCP Server!", "Self-assigns 169.254.x.x"], color: "#ef4444" }
    },
    hack: {
      memory: "169.254 = the DHCP failed alarm. If you see this range, the device is screaming I could not get a real IP! Instant diagnosis: DHCP server unreachable. Mnemonic: 169.254 = 1 Sick 9-to-5 worker, 254 problems \u2014 none of which include a valid IP.",
      practice: "In Packet Tracer, build a simple DHCP lab: router as DHCP server, switch, 2 PCs set to DHCP. Verify PCs get addresses. Then disable the DHCP service on the router (no service dhcp) and force the PCs to renew \u2014 watch them fall to 169.254.x.x (or 0.0.0.0 in PT). Re-enable DHCP and renew again to see recovery. Practice this cycle until the troubleshooting steps are automatic. Also test: unplug one PC from the switch and renew \u2014 same APIPA result, different root cause (physical).",
      effort: "low",
      meta: "Classic exam trap question: A PC has a 169.254.x.x address. What is the problem? Answer is always: DHCP server unreachable. Jeremy IT Lab Day 47 mentions APIPA. Wendell Odom OCG Chapter 10. Know that 169.254 is link-local only, never routed, and indicates DHCP failure \u2014 do not overthink it."
    }
  },

  "1.7.f": {
    info: "<p>The <strong>loopback range</strong> is <code>127.0.0.0/8</code> (127.0.0.0 through 127.255.255.255), with <code>127.0.0.1</code> being the most commonly used address (often referred to as <strong>localhost</strong>). The entire /8 block \u2014 over 16 million addresses \u2014 is reserved for loopback, though in practice only 127.0.0.1 is regularly used. Traffic sent to any 127.x.x.x address <strong>never leaves the device</strong> and never generates any network traffic on the wire.</p><p>Loopback serves as a <strong>diagnostic tool</strong> for testing the local TCP/IP stack. If <code>ping 127.0.0.1</code> succeeds, it confirms that the NIC driver, IP stack, and protocol layers on the local machine are functioning correctly. If it fails, the problem is the local TCP/IP configuration itself \u2014 not the network cable, switch, router, or any remote device. This makes loopback the first step in the network troubleshooting process.</p><p>Important distinctions for the exam:</p><ul><li><strong>Loopback address</strong> (127.0.0.1) is not the same as a <strong>loopback interface</strong> on a Cisco router. A router loopback interface (created with <code>interface loopback 0</code>) is a virtual interface used for router ID stability, BGP peering, and management access. It is assigned a routable IP (e.g., 10.0.0.1/32) and is always up.</li><li>The entire 127.0.0.0/8 range is loopback, not just 127.0.0.1 \u2014 exam trick: is 127.5.5.5 a loopback address? <strong>Yes.</strong></li><li>127.0.0.0/8 is technically in the Class A range (1-126... plus 127), but it is <strong>never</strong> assigned to any network interface as a regular IP</li><li>On Windows: <code>ping 127.0.0.1</code> or <code>ping localhost</code>. On Linux: same, plus <code>ping ::1</code> for IPv6 loopback.</li></ul><p>In the OSI troubleshooting model, loopback tests happen at <strong>Layer 3</strong> (Network layer) but specifically test the local stack. The progression is: (1) ping 127.0.0.1 (local stack), (2) ping own IP (NIC), (3) ping default gateway (local link), (4) ping remote host (full path).</p>",
    visual: { type: "packet-flow", params: { nodes: ["Device", "Loopback 127.0.0.1", "Device (self)"], color: "#8b5cf6" } },
    hack: {
      memory: "127.0.0.1 = looking in the mirror. You are talking to yourself. There is no place like 127.0.0.1 (there is no place like home). Remember: the ENTIRE 127.x.x.x range is loopback, not just .0.0.1. Exam trick: any address starting with 127 is loopback. Different from a Cisco loopback interface (virtual interface with a real routable IP).",
      practice: "Open a terminal and ping 127.0.0.1 \u2014 it should always succeed instantly. Then ping 127.5.5.5 \u2014 also succeeds (entire /8 is loopback). In Packet Tracer, create a loopback interface on a router: interface loopback 0, ip address 1.1.1.1 255.255.255.255. Notice this is a virtual interface that is always up/up and uses a routable IP \u2014 completely different from the 127.x.x.x loopback. Use show ip interface brief to see both the loopback interface and physical interfaces.",
      effort: "low",
      meta: "Straightforward concept. Know that the ENTIRE 127.x.x.x range is loopback (not just 127.0.0.1), it never generates network traffic, and it is different from a Cisco loopback interface. Jeremy IT Lab covers this in the troubleshooting context. Wendell Odom OCG Chapter 10."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     1.8 — Configure and verify IPv6 addressing and prefix
  ══════════════════════════════════════════════════════════════ */

  "1.8.a": {
    info: "<p><strong>IPv6 addresses</strong> are <strong>128 bits</strong> long (compared to IPv4\u2019s 32 bits), written as eight groups of four hexadecimal digits separated by colons, for example: <code>2001:0DB8:0000:0001:0000:0000:0000:0001</code>. Each group (called a <strong>hextet</strong> or quartet) is 16 bits, and each hex digit represents 4 bits. The total address space is 2^128 = approximately 340 undecillion (3.4 x 10^38) addresses \u2014 enough to assign billions of addresses to every atom on the surface of the Earth.</p><p>IPv6 was created because <strong>IPv4 address exhaustion</strong> became a critical problem. IPv4\u2019s 4.3 billion addresses (2^32) ran out as the internet grew beyond anyone\u2019s predictions. IANA allocated its last IPv4 /8 blocks in 2011. While NAT extended IPv4\u2019s life, it introduced complexity (breaks end-to-end connectivity, complicates peer-to-peer applications). IPv6 eliminates the need for NAT by providing a virtually unlimited address supply.</p><p>Key structural differences between IPv4 and IPv6:</p><ul><li><strong>Address length</strong>: 128 bits (IPv6) vs 32 bits (IPv4)</li><li><strong>Notation</strong>: Hexadecimal with colons (IPv6) vs dotted decimal (IPv4)</li><li><strong>Header</strong>: IPv6 has a <strong>simplified fixed 40-byte header</strong> \u2014 no checksum (handled by L2 and L4), no fragmentation fields (handled by source, not routers), no options (moved to extension headers). This makes router processing faster.</li><li><strong>No broadcast</strong>: IPv6 uses <strong>multicast</strong> and <strong>anycast</strong> instead of broadcast</li><li><strong>Autoconfiguration</strong>: IPv6 supports <strong>SLAAC</strong> (hosts generate their own address)</li><li><strong>IPsec</strong>: Originally mandatory in IPv6 spec (now recommended but not required)</li></ul><p>IPv6 addresses are divided into two halves: the first 64 bits are typically the <strong>network prefix</strong> (assigned by ISP or administrator), and the last 64 bits are the <strong>interface ID</strong> (identifies the specific host). This 64/64 split is standard for LAN segments and simplifies address planning significantly compared to IPv4\u2019s variable-length subnetting.</p>",
    visual: {
      type: "binary-breakdown",
      params: {
        bits: "2001:0DB8:0000:0001:0000:0000:0000:0001",
        label: "128 bits = 8 groups x 16 bits = 32 hex characters",
        highlight: [0, 1, 2, 3]
      }
    },
    hack: {
      memory: "IPv4 = phone numbers (10 digits, running out). IPv6 = GPS coordinates with unlimited precision (128 bits, never runs out). 8 groups of 4 hex digits = 8 hextets. The header is simpler \u2014 no checksum, no fragmentation by routers, fixed 40 bytes. No broadcast exists in IPv6 \u2014 multicast replaces it. Mnemonic: IPv6 = Six things better: more addresses, simpler header, no broadcast, no NAT needed, autoconfiguration, mandatory NDP.",
      practice: "Write out 5 full IPv6 addresses without any shortening. Identify each hextet. Then expand these shortened addresses back to full form: 2001:DB8::1, FE80::1, FF02::1, FD00::1:2:3:4. In Packet Tracer, enable IPv6 on a router (ipv6 unicast-routing) and assign 2001:DB8:1::1/64 to an interface. Connect a PC and check its IPv6 address \u2014 notice it generates both a link-local (FE80::) and a global address automatically.",
      effort: "medium",
      meta: "IPv6 is about 10% of the CCNA exam. Know the format cold before diving into shortening rules. Jeremy IT Lab Day 31 introduces IPv6 addressing. Wendell Odom OCG Chapter 22 (Fundamentals of IPv6) covers the structure and IPv4-to-IPv6 comparison. The simplified header and no-broadcast facts are common exam questions."
    }
  },

  "1.8.b": {
    info: "<p>IPv6 addresses can be shortened using two rules to make them more readable. These rules are applied in order and are <strong>reversible</strong> \u2014 the exam tests both shortening and expanding.</p><p><strong>Rule 1: Drop leading zeros</strong> within any hextet. Leading zeros (zeros at the beginning of a group) can be removed, but you must keep at least one digit. Examples: <code>0DB8</code> becomes <code>DB8</code>, <code>0001</code> becomes <code>1</code>, <code>0000</code> becomes <code>0</code>, <code>00AB</code> becomes <code>AB</code>. Trailing zeros are NOT dropped: <code>DB80</code> stays <code>DB80</code>.</p><p><strong>Rule 2: Replace ONE consecutive run of all-zero hextets with :: (double colon).</strong> The :: represents one or more consecutive groups of <code>0000</code>. You can only use :: <strong>once per address</strong> to avoid ambiguity \u2014 if :: appeared twice, you would not know how many zero groups each one represents. If there are two separate runs of zeros, use :: for the <strong>longest run</strong>. If they are equal length, use :: for the leftmost run (by convention).</p><p>Full shortening example: <code>2001:0DB8:0000:0000:0000:0000:0000:0001</code> \u2192 Apply Rule 1: <code>2001:DB8:0:0:0:0:0:1</code> \u2192 Apply Rule 2: <code>2001:DB8::1</code>. Another example: <code>FE80:0000:0000:0000:020C:29FF:FE12:3456</code> \u2192 <code>FE80::20C:29FF:FE12:3456</code>.</p><p><strong>Expanding works in reverse:</strong> When you see <code>2001:DB8::1</code>, count the visible hextets (2: <code>2001</code> and <code>DB8</code> before ::, and <code>1</code> after). Total must be 8, so :: represents 8-3 = 5 groups of zeros: <code>2001:0DB8:0000:0000:0000:0000:0000:0001</code>.</p><p><strong>Common pitfalls:</strong></p><ul><li><code>::</code> by itself is a valid address \u2014 it represents <code>0:0:0:0:0:0:0:0</code> (the unspecified address, equivalent to IPv4\u2019s 0.0.0.0)</li><li><code>::1</code> is the IPv6 <strong>loopback address</strong> (equivalent to IPv4\u2019s 127.0.0.1)</li><li>You cannot shorten <code>2001:0DB8:0000:00A1</code> to <code>2001:DB8:0:A1</code> and then use :: \u2014 :: only replaces consecutive ALL-zero groups</li></ul>",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Full Address", items: ["2001:0DB8:0000:0000:0000:0000:0000:0001", "FE80:0000:0000:0000:020C:29FF:FE12:3456"] },
        right: { label: "Shortened", items: ["2001:DB8::1", "FE80::20C:29FF:FE12:3456"] }
      }
    },
    hack: {
      memory: "Rule 1: Kill <strong>leading</strong> zeros (0DB8\u2192DB8, 0001\u21921). Rule 2: One :: replaces the <strong>longest run</strong> of all-zero groups. Two colons, ONE time \u2014 never twice. To expand: count visible hextets, subtract from 8, fill :: with that many 0000 groups. Mnemonic: Leading zeros Leave, Double colon appears Once.",
      practice: "Take 10 full IPv6 addresses and shorten them applying both rules. Then take 10 shortened addresses and expand them back to full form. Both directions matter for the exam. Tricky ones to practice: FE80:0000:0000:0000:0000:0000:0000:0001 = FE80::1, 2001:0DB8:0000:0001:0000:0000:0000:0001 = 2001:DB8:0:1::1 (the single 0 between DB8 and 1 cannot be replaced by :: since :: is used for the longer run). Use an IPv6 subnet calculator online to verify your answers.",
      effort: "medium",
      meta: "The exam will give shortened addresses and ask you to identify the full form, or vice versa. Jeremy IT Lab Day 31 covers shortening rules with examples. Wendell Odom OCG Chapter 22 provides practice problems. The one-time :: rule is the most common trick \u2014 if an answer uses :: twice, it is automatically wrong."
    }
  },

  "1.8.c": {
    info: "<p><strong>IPv6 prefix lengths</strong> work like CIDR notation in IPv4 \u2014 the /<em>number</em> indicates how many bits are the network prefix. However, IPv6 subnetting is dramatically simpler than IPv4 because the standard LAN prefix is <strong>/64</strong>, meaning the first 64 bits identify the network and the last 64 bits identify the host (interface ID). You almost never need to perform subnet math with IPv6 on the CCNA exam.</p><p>The <strong>IPv6 address hierarchy</strong> is structured in a delegation chain from global to local:</p><ul><li><strong>/32 or /48</strong> \u2014 ISP allocates a block to an organization. A /48 gives the organization 16 bits (2^16 = 65,536) of subnetting space</li><li><strong>/48</strong> \u2014 Typical <strong>site allocation</strong>. The organization receives this from the ISP and uses bits 49-64 for internal subnetting</li><li><strong>/64</strong> \u2014 Standard <strong>LAN prefix</strong>. Every individual network segment (VLAN, link) gets a /64. This is the universal default and is <strong>required</strong> for SLAAC to work (because the interface ID must be 64 bits)</li><li><strong>/127</strong> \u2014 Recommended for <strong>point-to-point links</strong> between routers (RFC 6164). Provides exactly 2 addresses with no wasted space. Analogous to IPv4\u2019s /30</li><li><strong>/128</strong> \u2014 A <strong>host route</strong> identifying a single address. Equivalent to IPv4\u2019s /32. Used for loopback interfaces and specific host routes in the routing table</li></ul><p>Example: an organization receives <code>2001:DB8:AAAA::/48</code> from their ISP. They can create subnets by varying bits 49-64 (the 4th hextet): <code>2001:DB8:AAAA:<strong>0001</strong>::/64</code> for VLAN 1, <code>2001:DB8:AAAA:<strong>0002</strong>::/64</code> for VLAN 2, up to <code>2001:DB8:AAAA:<strong>FFFF</strong>::/64</code> \u2014 that is 65,536 possible /64 subnets from a single /48.</p><p>Unlike IPv4 where you agonize over efficient subnetting, IPv6 has so many addresses that address conservation is not a concern. Every subnet gets a /64 regardless of how many hosts it has. A point-to-point link with 2 devices still gets a /64 in many deployments (though /127 is technically better practice).</p>",
    visual: {
      type: "binary-breakdown",
      params: {
        bits: "Network Prefix (64 bits)       | Interface ID (64 bits)        ",
        label: "/64 — Standard LAN prefix: 64 bits network, 64 bits host",
        highlight: [0, 1, 2, 3, 4, 5, 6, 7]
      }
    },
    hack: {
      memory: "/64 = LAN default (the magic number for IPv6 LANs). /48 = site allocation from ISP. /128 = single host (loopback). /127 = P2P link. Mnemonic: 64 on the floor (LAN), 48 at the door (ISP handoff), 128 one host no more, 127 for the link next door. Remember: /64 is REQUIRED for SLAAC to work.",
      practice: "Memorize the four key prefix lengths: /64, /48, /128, /127. In Packet Tracer, configure a router with a /64 on each LAN interface and a /127 on the link between two routers. Verify with show ipv6 interface brief and show ipv6 route. Notice how the routing table shows /64 connected routes for LANs and /127 for the P2P link. Calculate: given 2001:DB8:CAFE::/48, how many /64 subnets can you create? (2^16 = 65,536).",
      effort: "low",
      meta: "Knowing /64 for LANs is essential \u2014 the exam will not ask you to subnet IPv6 the way it does IPv4. Jeremy IT Lab Day 31-32 covers prefix lengths. Wendell Odom OCG Chapter 22-23 explains the hierarchy. The key insight: IPv6 subnetting is easy because you always use /64 for LANs and have practically unlimited subnets."
    }
  },

  "1.8.d": {
    info: "<p><strong>SLAAC (Stateless Address Autoconfiguration)</strong> is a method unique to IPv6 that allows hosts to generate their own IPv6 address <strong>without any DHCP server</strong>. It is the default IPv6 address assignment method and is one of the key advantages IPv6 has over IPv4. SLAAC relies on the <strong>Neighbor Discovery Protocol (NDP)</strong> and Router Advertisements.</p><p>The SLAAC process works in three steps:</p><ul><li><strong>Step 1</strong> \u2014 The host sends a <strong>Router Solicitation (RS)</strong> message to the all-routers multicast address (<code>FF02::2</code>), asking for network configuration information</li><li><strong>Step 2</strong> \u2014 The router responds with a <strong>Router Advertisement (RA)</strong> containing the /64 network prefix (e.g., <code>2001:DB8:1::/64</code>), the default gateway (the router\u2019s link-local address), and flags indicating which address assignment method to use</li><li><strong>Step 3</strong> \u2014 The host combines the /64 prefix from the RA with a self-generated 64-bit <strong>interface ID</strong> to form its complete 128-bit IPv6 address. The interface ID can be generated via <strong>EUI-64</strong> (derived from the MAC address) or <strong>privacy extensions</strong> (RFC 7217 \u2014 randomized, preferred for client devices to prevent MAC tracking)</li></ul><p>Before using the generated address, the host performs <strong>DAD (Duplicate Address Detection)</strong> by sending a Neighbor Solicitation for its own address. If no one responds, the address is unique and the host claims it. Routers also send unsolicited RAs periodically (every 200 seconds by default) to keep hosts updated.</p><p>The RA message contains two critical flags: the <strong>A-flag</strong> (Address Autoconfiguration, default on) tells hosts whether to use SLAAC for addressing, and the <strong>O-flag</strong> and <strong>M-flag</strong> control whether DHCPv6 is needed for additional information or full addressing. When both O and M are 0, pure SLAAC is used \u2014 the host gets everything it needs from the RA alone (except DNS, which requires either the RDNSS option in the RA or stateless DHCPv6).</p>",
    visual: {
      type: "handshake",
      params: {
        leftLabel: "Host",
        rightLabel: "Router",
        steps: ["Router Solicitation (RS) →", "← Router Advertisement (RA: prefix=2001:DB8:1::/64)", "Self-generates: 2001:DB8:1::EUI-64", "--- Address Configured ---"]
      }
    },
    hack: {
      memory: "SLAAC = <strong>self-service addressing</strong>. The router provides the street name (prefix via RA), and the host picks its own house number (interface ID). No DHCP server needed. Process: RS (host asks) \u2192 RA (router answers with prefix) \u2192 host combines prefix + interface ID \u2192 DAD check \u2192 address is live. EUI-64 = interface ID from MAC address. Privacy extensions = random interface ID.",
      practice: "In Packet Tracer, configure a router with ipv6 unicast-routing and assign 2001:DB8:1::1/64 to an interface. Connect a PC set to auto-config (SLAAC). Check the PC\u2019s IPv6 address \u2014 it should have the 2001:DB8:1:: prefix with an auto-generated interface ID. On the router, use show ipv6 neighbors to see the PC\u2019s entry. Then add a second PC and verify both get unique addresses from the same /64. Try show ipv6 interface to see the RA settings.",
      effort: "medium",
      meta: "Know SLAAC vs Stateless DHCPv6 vs Stateful DHCPv6. The exam tests when each is used. Jeremy IT Lab Day 33 covers all three methods. Wendell Odom OCG Chapter 23 (SLAAC and DHCPv6) is the reference. Key: SLAAC = address from RA, no DHCP for addressing. The A/O/M flags determine which method is in use."
    }
  },

  "1.8.e": {
    info: "<p><strong>Stateless DHCPv6</strong> is a hybrid approach that combines SLAAC for address assignment with DHCPv6 for supplementary configuration data. The host still generates its own IPv6 address using SLAAC (prefix from RA + self-generated interface ID), but it also contacts a DHCPv6 server to obtain information that SLAAC cannot provide, specifically <strong>DNS server addresses</strong>, <strong>domain search lists</strong>, and other options like NTP server addresses.</p><p>The trigger for stateless DHCPv6 is the <strong>O-flag (Other Configuration)</strong> in the Router Advertisement. When O=1 and M=0 (or A=1), the RA tells hosts: Use SLAAC for your address, but contact a DHCPv6 server for other configuration information. The word stateless is key \u2014 the DHCPv6 server does <strong>NOT</strong> track which addresses are assigned, does not maintain a binding table, and does not manage address leases. It only hands out supplementary data.</p><p>The process flow:</p><ul><li>Host sends RS to <code>FF02::2</code> (all routers)</li><li>Router replies with RA containing: prefix, A-flag=1 (use SLAAC), O-flag=1 (query DHCPv6 for other info)</li><li>Host generates its address via SLAAC (prefix + interface ID)</li><li>Host also sends a DHCPv6 <strong>Information-Request</strong> to <code>FF02::1:2</code> (all DHCPv6 servers/relays)</li><li>DHCPv6 server replies with DNS server address(es), domain name, and any other configured options</li></ul><p>Stateless DHCPv6 exists because original SLAAC had no mechanism to provide DNS server information. While RFC 8106 added the RDNSS (Recursive DNS Server) option to RAs, many networks still use stateless DHCPv6 for DNS distribution because it is more widely supported and easier to manage centrally. On Cisco routers, the O-flag is set with <code>ipv6 nd other-config-flag</code> under the interface.</p>",
    visual: {
      type: "handshake",
      params: {
        leftLabel: "Host",
        rightLabel: "Router + DHCPv6",
        steps: ["RS →", "← RA (prefix + O-flag=1)", "Self-assigns address via SLAAC", "DHCPv6 query → DNS/domain info ←"]
      }
    },
    hack: {
      memory: "Stateless DHCPv6 = SLAAC does the heavy lifting (address assignment). DHCPv6 just provides the extras (DNS, domain name). O-flag = Other info available. The server is stateless because it does NOT track addresses \u2014 it only hands out config data. Think: O = Other stuff only, M = Managed everything.",
      practice: "Know the RA flags cold: O-flag=1, M-flag=0 \u2192 stateless DHCPv6. Make a comparison table on paper: SLAAC (A=1, O=0, M=0) vs Stateless DHCPv6 (A=1, O=1, M=0) vs Stateful DHCPv6 (M=1). For each, list what provides the address and what provides DNS. In Packet Tracer (if supported), configure a router with ipv6 nd other-config-flag on the LAN interface and set up a DHCPv6 pool with dns-server and domain-name. Verify the PC gets its address from SLAAC but DNS from DHCPv6.",
      effort: "medium",
      meta: "The O-flag vs M-flag distinction is a common exam question. Jeremy IT Lab Day 33 covers the three-way comparison. Wendell Odom OCG Chapter 23 details stateless DHCPv6. Remember: O = other config (DNS only), M = managed (full addressing). The exam will describe a scenario and ask which method is in use based on the flags."
    }
  },

  "1.8.f": {
    info: "<p><strong>Stateful DHCPv6</strong> provides full address assignment from a centralized DHCPv6 server, similar to how DHCPv4 works in IPv4 networks. The DHCPv6 server assigns the complete IPv6 address to each host, <strong>tracks all assignments</strong> in a binding table, manages lease durations, and also provides DNS server addresses, domain names, and other configuration options. The word stateful means the server maintains state \u2014 it knows exactly which address was given to which client.</p><p>The trigger for stateful DHCPv6 is the <strong>M-flag (Managed Address Configuration)</strong> in the Router Advertisement. When M=1, the RA tells hosts: Get your entire address from the DHCPv6 server. On Cisco routers, this flag is set with <code>ipv6 nd managed-config-flag</code> under the interface.</p><p>Stateful DHCPv6 uses a four-step exchange (similar to DHCP DORA in IPv4):</p><ul><li><strong>Solicit</strong> \u2014 Client sends to <code>FF02::1:2</code> (all DHCPv6 servers/relays), requesting an address</li><li><strong>Advertise</strong> \u2014 Server responds with an available address and configuration</li><li><strong>Request</strong> \u2014 Client formally requests the offered address</li><li><strong>Reply</strong> \u2014 Server confirms the assignment (address + DNS + domain + lease info)</li></ul><p>Key differences from SLAAC and stateless DHCPv6:</p><ul><li><strong>Address source</strong>: DHCPv6 server assigns the address (not self-generated)</li><li><strong>Tracking</strong>: Server maintains a binding table (client DUID \u2192 IPv6 address \u2192 lease time)</li><li><strong>Use case</strong>: When administrators need tight control over address assignments (security policies, auditing, compliance)</li><li><strong>Default gateway</strong>: Even with stateful DHCPv6, the default gateway is still learned from the RA (Router Advertisement), NOT from DHCPv6. This is a critical difference from DHCPv4 where the gateway comes from the DHCP offer.</li></ul><p>Important: the host\u2019s link-local address (FE80::) is <strong>always generated independently</strong> via SLAAC regardless of whether stateful DHCPv6 is used for the global address. A host will always have at least a link-local address.</p>",
    visual: {
      type: "handshake",
      params: {
        leftLabel: "Host",
        rightLabel: "DHCPv6 Server",
        steps: ["Solicit →", "← Advertise", "Request →", "← Reply (address + DNS + domain)"]
      }
    },
    hack: {
      memory: "Stateful DHCPv6 = full DHCP control, like DHCPv4. The server tracks everything. M-flag = Managed = full management. Four steps: <strong>SARR</strong> (Solicit, Advertise, Request, Reply) \u2014 similar to DORA in DHCPv4. Critical gotcha: even with stateful DHCPv6, the <strong>default gateway still comes from the RA</strong>, not from DHCPv6. This is different from IPv4.",
      practice: "Make a 3-column comparison table: SLAAC vs Stateless DHCPv6 vs Stateful DHCPv6. For each column, fill in: who provides the address, who provides DNS, what flags trigger it, does the server track state. This table is your exam cheat sheet for IPv6 addressing questions. In Packet Tracer, if supported, configure a stateful DHCPv6 pool with address prefix, dns-server, and domain-name. Set ipv6 nd managed-config-flag on the router interface. Verify the PC gets its address from the DHCPv6 server.",
      effort: "medium",
      meta: "The three-way comparison (SLAAC vs Stateless vs Stateful) is a guaranteed exam topic. Jeremy IT Lab Day 33 covers all three with clear examples. Wendell Odom OCG Chapter 23 is the definitive reference. The gateway-still-from-RA fact is a common trick question. Key: M-flag = managed = server assigns address."
    }
  },

  "1.8.g": {
    info: "<p><strong>NDP (Neighbor Discovery Protocol)</strong> is the IPv6 replacement for several IPv4 protocols: it replaces ARP (address resolution), ICMP Router Discovery, and ICMP Redirect. NDP operates using <strong>ICMPv6</strong> messages and is essential for IPv6 to function \u2014 without NDP, hosts cannot find routers, resolve IPv6 addresses to MAC addresses, or detect duplicate addresses.</p><p>NDP defines four core message types:</p><ul><li><strong>RS (Router Solicitation, ICMPv6 Type 133)</strong> \u2014 Sent by a host to <code>FF02::2</code> (all-routers multicast) when it first connects to the network, requesting router information. Equivalent to asking: Are there any routers here?</li><li><strong>RA (Router Advertisement, ICMPv6 Type 134)</strong> \u2014 Sent by routers to <code>FF02::1</code> (all-nodes multicast) in response to RS or periodically (default every 200 seconds). Contains: network prefix, prefix length, flags (A/O/M), default router lifetime, and MTU. This is how hosts discover the default gateway and network prefix for SLAAC.</li><li><strong>NS (Neighbor Solicitation, ICMPv6 Type 135)</strong> \u2014 Sent to resolve an IPv6 address to a MAC address (replaces ARP Request). Also used for <strong>DAD (Duplicate Address Detection)</strong> \u2014 a host sends NS for its own address; if no one replies, the address is unique. Sent to the <strong>solicited-node multicast</strong> address (FF02::1:FFxx:xxxx) rather than broadcast, making it more efficient than ARP.</li><li><strong>NA (Neighbor Advertisement, ICMPv6 Type 136)</strong> \u2014 Reply to NS containing the MAC address (replaces ARP Reply). Also sent unsolicited when a host\u2019s link-layer address changes.</li></ul><p>NDP is more efficient than ARP because it uses <strong>multicast</strong> instead of broadcast. An ARP request goes to every device on the LAN; an NS goes only to the solicited-node multicast group, which typically includes only the target device. NDP results are stored in the <strong>neighbor cache</strong> (equivalent to the ARP table). On Cisco: <code>show ipv6 neighbors</code> displays the neighbor cache.</p><p>Additional NDP function: <strong>Redirect</strong> (ICMPv6 Type 137) \u2014 a router informs a host of a better first-hop router for a specific destination. This replaces ICMP Redirect in IPv4.</p>",
    visual: {
      type: "handshake",
      params: {
        leftLabel: "Host A",
        rightLabel: "Host B",
        steps: ["NS: Who has 2001:DB8::2? →", "← NA: I do! MAC=00:1A:2B:3C:4D:5E", "--- Neighbor cache updated ---"]
      }
    },
    hack: {
      memory: "NDP = ARP\u2019s replacement for IPv6, plus more. Four messages: <strong>RS/RA</strong> = Router discovery (finding the gateway), <strong>NS/NA</strong> = Neighbor discovery (finding MAC addresses, like ARP). R for Router, N for Neighbor. NS also does <strong>DAD</strong> (duplicate address detection). NDP uses multicast (efficient), ARP used broadcast (wasteful). Mnemonic: Real Smart Networks Always use NDP.",
      practice: "Flashcard the four NDP message types with their ICMPv6 type numbers: RS=133, RA=134, NS=135, NA=136. Know which replaces what: NS/NA replace ARP request/reply. RS/RA are new (IPv4 used DHCP for gateway discovery). In Packet Tracer, configure two PCs on the same IPv6 subnet. Ping from one to the other. Then check show ipv6 neighbors on the router to see the neighbor cache entries. Compare this to show arp on an IPv4 router \u2014 same concept, different protocol.",
      effort: "medium",
      meta: "NDP message types are heavily tested. Know all four by name, type number, and function. Jeremy IT Lab Day 32 covers NDP in detail. Wendell Odom OCG Chapter 22-23. The exam question What replaces ARP in IPv6? = NDP (specifically NS/NA). The solicited-node multicast optimization is a bonus concept that shows understanding."
    }
  },

  "1.8.h": {
    info: "<p>Configuring IPv6 on Cisco devices requires several commands at both the <strong>global</strong> and <strong>interface</strong> levels. The most critical step that students forget is the global command \u2014 without it, the router will process IPv6 on its interfaces but will <strong>not route</strong> IPv6 packets between them.</p><p><strong>Global configuration commands:</strong></p><ul><li><code>ipv6 unicast-routing</code> \u2014 <strong>THE master switch</strong> for IPv6 routing. Enables the router to forward IPv6 packets between interfaces and send Router Advertisements. Without this command, the router acts as a host, not a router. This is the #1 forgotten step in IPv6 labs.</li></ul><p><strong>Interface configuration commands:</strong></p><ul><li><code>ipv6 address 2001:DB8:1::1/64</code> \u2014 Assigns a global unicast address to the interface. This automatically enables IPv6 on the interface and generates a link-local address (FE80::).</li><li><code>ipv6 address FE80::1 link-local</code> \u2014 Manually sets the link-local address instead of accepting the auto-generated one. Useful for making router link-local addresses memorable and consistent.</li><li><code>ipv6 enable</code> \u2014 Enables IPv6 on the interface <strong>without</strong> assigning a global address. Only generates a link-local address. Used when you only need local communication or plan to assign the address via another method.</li><li><code>no shutdown</code> \u2014 Brings the interface up. Same as IPv4 \u2014 must be done or no traffic flows.</li></ul><p><strong>Verification commands:</strong></p><ul><li><code>show ipv6 interface brief</code> \u2014 Quick overview of all interfaces with their IPv6 addresses and status (similar to <code>show ip interface brief</code> for IPv4)</li><li><code>show ipv6 interface [int]</code> \u2014 Detailed info including link-local, global addresses, multicast groups joined, and ND settings</li><li><code>show ipv6 route</code> \u2014 IPv6 routing table with connected (C), local (L), static (S), and dynamic routes</li><li><code>show ipv6 neighbors</code> \u2014 Neighbor cache (equivalent to <code>show arp</code> in IPv4)</li><li><code>ping [ipv6-address]</code> \u2014 Test IPv6 reachability</li></ul>",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Global Config", items: ["ipv6 unicast-routing"] },
        right: { label: "Interface Config", items: ["ipv6 address 2001:DB8:1::1/64", "ipv6 enable", "no shutdown"] }
      }
    },
    hack: {
      memory: "<code>ipv6 unicast-routing</code> = the master switch for IPv6 routing. Without it, the router processes IPv6 but does NOT route it. Think of it as turning on the engine before driving. Everything else is similar to IPv4: assign address on interface, no shutdown, verify with show commands. Link-local (FE80::) is auto-generated on every IPv6-enabled interface \u2014 you always get one for free.",
      practice: "In Packet Tracer, build a 2-router, 2-LAN topology. On each router: (1) ipv6 unicast-routing in global config, (2) Assign IPv6 addresses to LAN and WAN interfaces, (3) no shutdown. Add a static IPv6 route on each router to reach the other LAN. Verify with show ipv6 interface brief (addresses and status), show ipv6 route (C, L, S routes), and ping across the full path. Intentionally forget ipv6 unicast-routing on one router and observe that it cannot route \u2014 this cements the lesson.",
      effort: "medium",
      meta: "The command ipv6 unicast-routing is the most forgotten step. If IPv6 is not working, check this first. Jeremy IT Lab Day 31-33 uses these commands extensively. Wendell Odom OCG Chapter 24 (Implementing IPv6) covers configuration and verification. The exam tests this exact scenario: IPv6 configured on interfaces but routing does not work because ipv6 unicast-routing is missing."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     1.9 — Describe IPv6 address types
  ══════════════════════════════════════════════════════════════ */

  "1.9.a": {
    info: "<p><strong>IPv6 unicast addresses</strong> are used for one-to-one communication \u2014 a packet sent to a unicast address is delivered to exactly one interface. There are three types of IPv6 unicast addresses, each with a specific prefix, scope, and use case. Identifying the type by prefix is a <strong>guaranteed exam skill</strong>.</p><p><strong>Global Unicast Address (GUA)</strong> \u2014 prefix <code>2000::/3</code> (addresses starting with 2 or 3 in the first hex digit). These are the IPv6 equivalent of <strong>public IPv4 addresses</strong> \u2014 globally routable on the internet. Currently, IANA only allocates from the 2000::/3 range, so all internet-routable IPv6 addresses start with 2 or 3. GUAs follow a three-part structure: Global Routing Prefix (assigned by ISP, typically /48) + Subnet ID (assigned by organization, typically 16 bits) + Interface ID (64 bits, identifies the host).</p><p><strong>Unique Local Address (ULA)</strong> \u2014 prefix <code>FC00::/7</code>, but in practice all ULAs use <code>FD00::/8</code> (the FC00::/8 half is not yet defined). ULAs are the IPv6 equivalent of <strong>RFC 1918 private addresses</strong> \u2014 they are used for internal communication within a site or organization and are <strong>not routable on the public internet</strong>. ISPs filter ULA traffic at their borders. Format: FD + 40-bit random global ID + 16-bit subnet ID + 64-bit interface ID. The random global ID minimizes collisions if two organizations merge networks.</p><p><strong>Link-Local Address (LLA)</strong> \u2014 prefix <code>FE80::/10</code> (in practice, always starts with <code>FE80</code> followed by zeros through the first 64 bits). LLAs are <strong>automatically generated</strong> on every IPv6-enabled interface and are <strong>required</strong> for IPv6 to function. They are used exclusively for communication on the local network segment \u2014 routers <strong>never forward</strong> link-local traffic to other subnets. Critical uses: NDP messages (RS, RA, NS, NA), routing protocol hello packets (OSPFv3, EIGRP), and next-hop addresses in the routing table.</p><p>Quick recognition guide: address starts with <strong>2 or 3</strong> = GUA (global/public). Starts with <strong>FD</strong> = ULA (private). Starts with <strong>FE80</strong> = Link-Local (local link only). This instant recognition must be automatic for the exam.</p>",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Address Type", items: ["Global Unicast (GUA)", "Unique Local (ULA)", "Link-Local (LLA)"] },
        right: { label: "Prefix / Scope", items: ["2000::/3 — Internet-routable", "FC00::/7 (FD00::/8) — Private/internal", "FE80::/10 — Local link only"] }
      }
    },
    hack: {
      memory: "GUA starts with <strong>2 or 3</strong> = Global, 2-3 is free to roam (public internet). ULA starts with <strong>FD</strong> = For Domestic use only (private). LLA starts with <strong>FE80</strong> = For Each link, 80 percent of config is automatic. Three types, three scopes: global, site, link. GUA = public IPv4, ULA = RFC 1918, LLA = IPv4 has no exact equivalent (closest is APIPA but LLA is required and functional).",
      practice: "Given an IPv6 address, immediately identify the type by its first characters. Drill 20 random addresses: 2001:DB8::1 = GUA. FD00::1 = ULA. FE80::1 = LLA. 3FFE::1 = GUA (starts with 3). FC01::1 = technically ULA range but not used. FF02::1 = NOT unicast (multicast). In Packet Tracer, configure a router interface with a GUA (2001:DB8:1::1/64). Check show ipv6 interface brief \u2014 notice it shows BOTH the GUA and an auto-generated link-local (FE80::). The link-local is always there, even without configuring one.",
      effort: "medium",
      meta: "Type identification by prefix is guaranteed on the exam. Know instantly: 2/3 = GUA, FD = ULA, FE80 = LLA. Jeremy IT Lab Day 32 covers address types. Wendell Odom OCG Chapter 23 details each type with examples. The fact that link-local is always auto-generated and required is a common exam point."
    }
  },

  "1.9.b": {
    info: "<p><strong>Anycast</strong> is an IPv6 addressing concept where the <strong>same unicast address</strong> is assigned to multiple devices in different locations. When a packet is sent to an anycast address, the routing infrastructure delivers it to the <strong>nearest device</strong> with that address (nearest as determined by routing metrics, not geographic distance). There is no special prefix for anycast \u2014 an anycast address is syntactically identical to a regular unicast address; the difference is purely in how it is deployed.</p><p>The key characteristics of anycast:</p><ul><li><strong>Same address, multiple devices</strong> \u2014 the identical IPv6 address is configured on two or more interfaces across the network (typically on different routers or servers in different locations)</li><li><strong>Routing determines delivery</strong> \u2014 the network routes the packet to whichever device with that address has the shortest path from the source. If one device goes down, traffic automatically goes to the next nearest device.</li><li><strong>One-to-nearest communication</strong> \u2014 unlike unicast (one-to-one) or multicast (one-to-many), anycast is one-to-one-of-many</li><li><strong>Use cases</strong>: DNS root servers (all 13 root server letters use anycast), CDN nodes, load balancing, redundancy. Google\u2019s <code>8.8.8.8</code> DNS is also an anycast address in IPv4.</li></ul><p>On Cisco routers, anycast is configured by adding the <code>anycast</code> keyword: <code>ipv6 address 2001:DB8::1/128 anycast</code>. The /128 prefix is typical because you want the exact address to be advertised, not a range. The <strong>Subnet Router Anycast address</strong> is a special built-in anycast address \u2014 it is the address with all host bits set to 0 within any /64 prefix (e.g., 2001:DB8:1:1::<strong>0</strong>/128 for the 2001:DB8:1:1::/64 subnet). All routers on that subnet automatically respond to this address.</p>",
    visual: { type: "packet-flow", params: { nodes: ["Client", "Routed to nearest", "Server A or Server B (same IP)"], color: "#f59e0b" } },
    hack: {
      memory: "Anycast = <strong>any of us can answer</strong>. Like calling a pizza chain \u2014 you get routed to the nearest location, even though they all share the same phone number. No special prefix exists for anycast \u2014 it looks exactly like unicast. The difference is deployment (same address on multiple devices), not format. Exam keyword: one-to-nearest.",
      practice: "Understand the concept: anycast looks like unicast but the same address is on multiple devices, and the network routes to the closest one. Know the Cisco command: ipv6 address [addr]/128 anycast. Know that DNS root servers use anycast (K-root, for example, has nodes worldwide all answering the same address). Flashcard only \u2014 no complex lab needed. Key exam facts: no special prefix, looks like unicast, routing decides which device answers.",
      effort: "low",
      meta: "Simple concept question on the exam. Know: anycast = same address on multiple devices, routed to nearest, no special prefix. Jeremy IT Lab Day 32 briefly covers anycast. Wendell Odom OCG Chapter 23. The Subnet Router Anycast address (all-zeros host portion) is a bonus fact that shows depth."
    }
  },

  "1.9.c": {
    info: "<p><strong>IPv6 multicast addresses</strong> begin with <code>FF00::/8</code> (any address starting with FF) and replace IPv4 broadcast, which <strong>does not exist in IPv6</strong>. While IPv4 broadcast sends to every device on the subnet (wasteful \u2014 every host must process the frame even if it is not relevant), IPv6 multicast sends only to devices that have <strong>joined a specific multicast group</strong>. This is more efficient because only interested devices process the traffic.</p><p>The structure of a multicast address: <code>FF</code> + <strong>flags</strong> (4 bits) + <strong>scope</strong> (4 bits) + <strong>group ID</strong> (112 bits). The scope field is critical for the exam \u2014 it defines how far the multicast can travel:</p><ul><li><strong>1</strong> = Interface-local (never leaves the device)</li><li><strong>2</strong> = Link-local (stays on the local network segment \u2014 most common scope for CCNA)</li><li><strong>5</strong> = Site-local (within an organization\u2019s site)</li><li><strong>8</strong> = Organization-local</li><li><strong>E</strong> = Global (internet-wide multicast)</li></ul><p><strong>Well-known multicast addresses</strong> to memorize for the exam:</p><ul><li><code>FF02::1</code> \u2014 <strong>All nodes</strong> on the local link. This is the closest equivalent to IPv4 broadcast. Used by RAs (Router Advertisements).</li><li><code>FF02::2</code> \u2014 <strong>All routers</strong> on the local link. Used by RS (Router Solicitations) \u2014 only routers listen to this address.</li><li><code>FF02::5</code> \u2014 <strong>All OSPF routers</strong> (OSPFv3). Equivalent to 224.0.0.5 in IPv4.</li><li><code>FF02::A</code> \u2014 <strong>All EIGRP routers</strong>. Equivalent to 224.0.0.10 in IPv4.</li><li><code>FF02::1:FF00:0/104</code> \u2014 <strong>Solicited-node multicast</strong>. Auto-generated for each unicast address on an interface. Used by NDP for efficient neighbor discovery (NS messages go here instead of broadcast).</li></ul><p>The <strong>solicited-node multicast address</strong> deserves special attention. It is formed by taking <code>FF02::1:FF</code> and appending the last 24 bits of the unicast address. For example, if the interface has <code>2001:DB8::1234:5678</code>, the solicited-node address is <code>FF02::1:FF34:5678</code>. This ensures that NS messages for address resolution only reach the device(s) whose address ends with those 24 bits \u2014 far more efficient than ARP broadcast.</p>",
    visual: {
      type: "shield",
      params: {
        items: ["FF02::1 — All nodes", "FF02::2 — All routers", "FF02::5 — OSPF routers", "FF02::A — EIGRP routers"],
        color: "#8b5cf6"
      }
    },
    hack: {
      memory: "FF = Friends Forever (multicast family). FF02::1 = everyone on the link (replaces broadcast). FF02::2 = routers only. FF02::5 = OSPF routers. FF02::A = EIGRP routers. The 02 in FF02 means scope=2 (link-local). No broadcast in IPv6 \u2014 multicast handles everything that broadcast used to do. The solicited-node multicast (FF02::1:FFxx:xxxx) is how NDP avoids broadcast flooding.",
      practice: "Memorize the four key multicast addresses: ::1 (all nodes), ::2 (all routers), ::5 (OSPF), ::A (EIGRP). Then learn the solicited-node prefix: FF02::1:FF + last 24 bits of unicast. Practice: if a host has address 2001:DB8::ABCD:1234, its solicited-node multicast is FF02::1:FFCD:1234. In Packet Tracer, check show ipv6 interface on a configured interface \u2014 notice it lists the multicast groups joined, including FF02::1 and the solicited-node address.",
      effort: "low",
      meta: "Know FF02::1 and FF02::2 cold. The exam asks: What replaces broadcast in IPv6? Answer: multicast, specifically FF02::1 for all nodes. Jeremy IT Lab Day 32 covers multicast addresses. Wendell Odom OCG Chapter 23. The solicited-node multicast concept is a deeper question that distinguishes A-level answers."
    }
  },

  "1.9.d": {
    info: "<p><strong>Modified EUI-64</strong> is a method for generating a 64-bit interface ID from a device\u2019s 48-bit MAC address. This interface ID is combined with the /64 network prefix (from a Router Advertisement) to form a complete 128-bit IPv6 address during SLAAC. EUI-64 ensures the interface ID is unique because it is derived from the globally unique MAC address.</p><p>The EUI-64 conversion follows three precise steps:</p><ul><li><strong>Step 1 \u2014 Split</strong> the 48-bit MAC address in half. Example MAC: <code>00:1A:2B:3C:4D:5E</code> becomes two halves: <code>00:1A:2B</code> (OUI) and <code>3C:4D:5E</code> (device ID).</li><li><strong>Step 2 \u2014 Stuff FFFE</strong> in the middle. Insert <code>FF:FE</code> between the two halves: <code>00:1A:2B:<strong>FF:FE</strong>:3C:4D:5E</code>. This expands the 48-bit MAC to 64 bits. The FF:FE value was chosen specifically to indicate an EUI-64-generated identifier.</li><li><strong>Step 3 \u2014 Flip the 7th bit</strong> (the Universal/Local or U/L bit) of the first byte. This bit indicates whether the address is universally administered (burned-in MAC) or locally administered. In the MAC <code>00</code>, binary is <code>00000000</code>. The 7th bit (counting from the left, starting at 1) is the second-least-significant bit: position value 02. Flipping it: <code>00000000</code> becomes <code>00000010</code> = <code>02</code> hex. So the first byte changes from <code>00</code> to <code>02</code>.</li></ul><p>Complete example: MAC <code>00:1A:2B:3C:4D:5E</code> on prefix <code>2001:DB8:1::/64</code>: Split: 00:1A:2B | 3C:4D:5E. Stuff: 001A:2BFF:FE3C:4D5E. Flip 7th bit of first byte (00\u219202): <code>021A:2BFF:FE3C:4D5E</code>. Full IPv6 address: <code>2001:DB8:1::21A:2BFF:FE3C:4D5E</code>.</p><p><strong>7th bit flip cheat sheet</strong> for common first-byte values: 00\u219202, 02\u219200, 0C\u21920E, 0E\u21920C, 1A\u219218, 3C\u21923E. The pattern: XOR the first byte with 0x02. In binary, you only toggle the bit at position value 2. Most burned-in MACs have bit 7 = 0, so the flip usually changes it to 1 (adds 2 to the first hex byte if it is even, or subtracts 2 if it was already set).</p><p><strong>Privacy concern:</strong> Because EUI-64 embeds the MAC address, a device\u2019s physical identity can be tracked across networks. Modern operating systems use <strong>privacy extensions</strong> (RFC 4941 / RFC 7217) which generate random interface IDs instead of using EUI-64. However, the CCNA exam still tests EUI-64 conversion heavily.</p>",
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
      memory: "EUI-64 recipe: <strong>Split, Stuff, Flip</strong> (SSF). Split the MAC in half, Stuff FFFE in the middle, Flip the 7th bit. FFFE = For Full Ethernet Extension. The 7th bit flip = XOR with 0x02 on the first byte. Quick: if the first byte is even, add 2. If it already has the 2 set, subtract 2. Most common flip: 00\u219202 (burned-in MACs start with 0 in the U/L bit, EUI-64 flips it to 1).",
      practice: "Take 5 random MAC addresses and perform the full EUI-64 conversion by hand. Example: MAC AA:BB:CC:DD:EE:FF \u2192 Split: AA:BB:CC | DD:EE:FF \u2192 Stuff: AABB:CCFF:FEDD:EEFF \u2192 Flip 7th bit of AA (10101010 \u2192 10101000 = A8): A8BB:CCFF:FEDD:EEFF. Verify your answers with an online EUI-64 calculator. In Packet Tracer, assign a /64 to a router interface and set a PC to SLAAC. Check the PC address \u2014 compare the last 64 bits to the PC MAC address. You should be able to identify the FF:FE in the middle and the flipped bit.",
      effort: "high",
      meta: "EUI-64 conversion is a guaranteed exam question. Practice the three steps until automatic. The 7th bit flip is the part that confuses most students \u2014 practice the XOR with 0x02 method on paper. Jeremy IT Lab Day 32 covers EUI-64 with worked examples. Wendell Odom OCG Chapter 23 provides detailed practice problems. Know that privacy extensions exist as the modern alternative, but EUI-64 is what the exam tests."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     1.10 — Verify IP parameters for Client OS
  ══════════════════════════════════════════════════════════════ */

  "1.10.a": {
    info: "<p><strong>Windows IP verification</strong> starts with the <code>ipconfig</code> command, run from the Command Prompt (CMD) or PowerShell. By itself, <code>ipconfig</code> displays the IPv4 address, subnet mask, and default gateway for every network adapter on the system — wired (Ethernet), wireless (Wi-Fi), and virtual (VPN, loopback). This is the quickest way to confirm a host has a valid IP and knows its gateway.</p><p><code>ipconfig /all</code> expands the output significantly. In addition to IP, mask, and gateway, it shows the <strong>physical (MAC) address</strong>, <strong>DHCP enabled</strong> status (yes/no), the <strong>DHCP server</strong> address that issued the lease, <strong>lease obtained</strong> and <strong>lease expires</strong> timestamps, <strong>DNS servers</strong> (primary and secondary), and the <strong>DNS suffix</strong>. This is the go-to command when you need to verify whether a host is using DHCP or a static assignment — if DHCP Enabled says 'No,' the address is manually configured.</p><p><code>ipconfig /release</code> sends a DHCP Release message to the DHCP server, giving up the current lease. The adapter's IP drops to 0.0.0.0 and network connectivity is lost. <code>ipconfig /renew</code> triggers the full DHCP DORA process (Discover, Offer, Request, Acknowledge) to obtain a new lease. These two commands are essential for troubleshooting DHCP issues — if a host has a 169.254.x.x (APIPA) address, it means DHCP failed, and release/renew is the first fix to try. Additional useful Windows commands include <code>ipconfig /flushdns</code> (clears the local DNS resolver cache) and <code>ipconfig /displaydns</code> (shows cached DNS entries).</p><p>For the CCNA exam, know that <strong>ipconfig</strong> is Windows-specific — it does not exist on Linux or macOS (those use <code>ip addr</code> and <code>ifconfig</code> respectively). The exam frequently presents command output and asks you to identify the OS or determine which command was used. If you see 'Windows IP Configuration' in the output header, it is <code>ipconfig</code> on a Windows machine.</p><p><strong>Key commands summary:</strong> <code>ipconfig</code> (quick check — IP, mask, gateway), <code>ipconfig /all</code> (full details — DNS, DHCP, MAC), <code>ipconfig /release</code> (drop DHCP lease), <code>ipconfig /renew</code> (request new lease), <code>ipconfig /flushdns</code> (clear DNS cache).</p>",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Quick Check", items: ["ipconfig — IP, mask, gateway", "ipconfig /all — full details + DNS + DHCP"] },
        right: { label: "DHCP Actions", items: ["ipconfig /release — drop lease", "ipconfig /renew — get new lease"] }
      }
    },
    hack: {
      memory: "Think 'I-P-C-O-N-F-I-G' = 'I Please Check Our Network's Foundation Immediately, Go!' The four variations build on each other: bare ipconfig = snapshot, /all = full physical, /release = drop it, /renew = grab fresh. Remember APIPA = 169.254.x.x = 'DHCP gave up, no server found.' If you see 169.254, immediately think 'release then renew.'",
      practice: "Packet Tracer lab (Jeremy's IT Lab Day 5 topology): Set up a DHCP server and a Windows PC. Run <code>ipconfig</code> and note IP/mask/gateway. Run <code>ipconfig /all</code> and identify the DHCP server IP, DNS servers, and lease times. Then <code>ipconfig /release</code> — observe 0.0.0.0. Then <code>ipconfig /renew</code> — verify a new lease appears. Finally, change the PC to a static IP and run <code>ipconfig /all</code> again — note 'DHCP Enabled: No.' On your real Windows PC, open CMD and run all four commands to see real output.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 5 (IPv4 Addressing) covers client OS verification. Wendell Odom OCG Chapter 4 (Fundamentals of IPv4 Addressing and Routing) details these commands. The exam loves presenting <code>ipconfig /all</code> output and asking 'is this host using DHCP?' or 'what is the DNS server?' — practice reading the output fields until you can parse them instantly."
    }
  },

  "1.10.b": {
    info: "<p><strong>Linux IP verification</strong> relies on the <code>ip</code> command suite, which replaced the older <code>ifconfig</code> and <code>route</code> tools. The command <code>ip addr</code> (or <code>ip a</code> for short) displays all network interfaces with their IPv4 and IPv6 addresses, subnet masks in CIDR notation (/24 instead of 255.255.255.0), MAC addresses, and interface states (UP/DOWN). Each interface is listed with a name like <code>eth0</code>, <code>ens33</code>, or <code>wlan0</code> depending on the Linux distribution and naming scheme.</p><p><code>ip route</code> (or <code>ip r</code>) displays the routing table, including the <strong>default gateway</strong> — shown as <code>default via [IP] dev [interface]</code>. This is the Linux equivalent of checking the default gateway in Windows. You can also see connected routes for each interface, which helps verify that the interface is correctly assigned to the expected subnet. For more granular control, <code>ip link</code> shows Layer 2 information (interface state, MTU, MAC) without IP details.</p><p>The legacy <code>ifconfig</code> command still works on many Linux distributions but is considered deprecated — it is part of the <code>net-tools</code> package, which is no longer installed by default on modern distributions like Ubuntu 18+ and RHEL 8+. The CCNA exam may reference <code>ifconfig</code> because older exam materials included it, but the modern answer is <code>ip addr</code>. Similarly, <code>netstat</code> has been replaced by <code>ss</code> (socket statistics) for viewing active connections and listening ports — <code>ss -tuln</code> shows TCP/UDP listeners with numeric output.</p><p>Other useful Linux network commands include <code>ping</code> (ICMP reachability, same as Windows), <code>traceroute</code> (path discovery — note Linux uses <code>traceroute</code>, Windows uses <code>tracert</code>), <code>dig</code> (DNS lookup tool, more powerful than <code>nslookup</code>), and <code>nmcli</code> (NetworkManager CLI for managing Wi-Fi connections, DHCP renewals, and interface configuration on desktop Linux).</p><p><strong>Key exam distinction:</strong> If the exam shows output with <code>inet 192.168.1.10/24</code> and interface names like <code>ens33</code>, it is Linux using <code>ip addr</code>. If you see 'Windows IP Configuration' with dotted-decimal masks, it is Windows <code>ipconfig</code>. The exam tests your ability to identify the OS from command output.</p>",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Modern (ip suite)", items: ["ip addr — show IPs", "ip route — show routes/gateway", "ss — socket stats"] },
        right: { label: "Legacy", items: ["ifconfig — show IPs (deprecated)", "netstat — connections (deprecated)", "route — routing table (deprecated)"] }
      }
    },
    hack: {
      memory: "'ip' is the new 'if' — <code>ip addr</code> replaced <code>ifconfig</code>, <code>ip route</code> replaced <code>route</code>, <code>ss</code> replaced <code>netstat</code>. Mnemonic for the Linux trio: 'A-R-L' — <code>ip addr</code> (Addresses), <code>ip route</code> (Routes), <code>ip link</code> (Links). For OS identification: CIDR notation (/24) in output = Linux. Dotted-decimal mask (255.255.255.0) = Windows.",
      practice: "Packet Tracer lab: If you have a Linux VM (or use a Packet Tracer PC in CLI mode), run <code>ip addr</code>, <code>ip route</code>, and <code>ss -tuln</code>. Write down the output format differences compared to Windows <code>ipconfig /all</code>. Create a flashcard table: left column = Windows command, right column = Linux equivalent. <code>ipconfig</code> = <code>ip addr</code>, <code>ipconfig /all</code> = <code>ip addr</code> + <code>ip route</code>, <code>tracert</code> = <code>traceroute</code>, <code>nslookup</code> = <code>dig</code>.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 5 covers client OS verification across platforms. Wendell Odom OCG Chapter 4 references both Windows and Linux commands. The exam shows command output and asks you to identify the OS or the correct verification command for a given OS. Practice recognizing output format differences — this is a quick-win topic if you memorize the command mappings."
    }
  },

  "1.10.c": {
    info: "<p><strong>macOS IP verification</strong> uses a mix of Unix/BSD commands and Apple-specific utilities. Unlike modern Linux, macOS <strong>retained <code>ifconfig</code></strong> as a standard tool — it shows IP addresses, subnet masks, MAC addresses, and interface states for all adapters. Interfaces on macOS are named differently: <code>en0</code> is typically the primary Ethernet or Wi-Fi adapter, <code>en1</code> is often the secondary, and <code>lo0</code> is the loopback. Running <code>ifconfig en0</code> shows details for just that interface.</p><p>The Apple-specific tool <code>networksetup</code> provides a higher-level view. <code>networksetup -getinfo Wi-Fi</code> shows the IP address, subnet mask, router (default gateway), and DNS servers for the Wi-Fi adapter in a clean, readable format. <code>networksetup -listallnetworkservices</code> lists all available network services (Wi-Fi, Thunderbolt Ethernet, USB Ethernet, etc.). <code>networksetup -getdnsservers Wi-Fi</code> shows just the configured DNS servers. These commands are more user-friendly than <code>ifconfig</code> and are useful for quick checks.</p><p>Because macOS is built on a BSD Unix foundation, most Linux network commands work identically: <code>ping</code> (ICMP reachability), <code>traceroute</code> (not <code>tracert</code> — that is Windows-only), <code>dig</code> and <code>nslookup</code> (DNS lookups), and <code>netstat</code> (still available, unlike on modern Linux where <code>ss</code> replaced it). macOS also supports <code>scutil --dns</code> to view the full DNS resolver configuration, which is useful when multiple DNS sources are configured (DHCP, VPN, manual).</p><p>For DHCP operations on macOS, there is no direct equivalent of Windows' <code>ipconfig /release</code> and <code>ipconfig /renew</code> from the command line. Instead, you use <code>sudo ipconfig set en0 DHCP</code> to force a DHCP renewal, or go to System Settings > Network > Wi-Fi > Details > TCP/IP and click 'Renew DHCP Lease.' The GUI method is more common for most users.</p><p><strong>Exam relevance:</strong> macOS commands are lightly tested on the CCNA. The key facts are: macOS uses <code>ifconfig</code> (not <code>ip addr</code>), uses <code>traceroute</code> (not <code>tracert</code>), and is Unix-based. If the exam shows <code>ifconfig</code> output with BSD-style interface names (en0, lo0), it could be macOS.</p>",
    visual: {
      type: "comparison",
      params: {
        left: { label: "macOS Commands", items: ["ifconfig — all interfaces", "networksetup -getinfo Wi-Fi", "networksetup -listallnetworkservices"] },
        right: { label: "Also Works (Unix)", items: ["ping", "traceroute", "dig / nslookup"] }
      }
    },
    hack: {
      memory: "The OS command triangle: Windows = <code>ipconfig</code>, Linux = <code>ip addr</code>, macOS = <code>ifconfig</code>. Mnemonic: 'Windows-I-P, Linux-I-P, Mac-I-F' — the first two start with 'ip,' Mac starts with 'if.' macOS is the odd one out because it kept the legacy BSD tool that Linux dropped. For path tracing: Windows = trace<strong>rt</strong> (shortened), Linux/Mac = trace<strong>route</strong> (full word).",
      practice: "On your Mac (you have one!), open Terminal and run: (1) <code>ifconfig en0</code> — note the IP, mask (displayed as hex on some versions), and MAC. (2) <code>networksetup -getinfo Wi-Fi</code> — note how much cleaner the output is. (3) <code>netstat -rn</code> — find the default gateway route. (4) <code>scutil --dns</code> — see DNS resolver config. Compare this output mentally to what <code>ipconfig /all</code> would show on Windows. Create a 3-column flashcard: Windows | Linux | macOS for each verification task.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 5 briefly covers cross-platform verification. Wendell Odom OCG Chapter 4 mentions macOS in passing. The CCNA exam rarely asks macOS-specific questions, but it may present output and ask you to identify the OS. One or two flashcards mapping OS to command is sufficient. Focus more time on Windows and Linux."
    }
  },

  "1.10.d": {
    info: "<p>Regardless of operating system, every network troubleshooting session begins by verifying <strong>four critical IP parameters</strong>: the <strong>IP address</strong>, <strong>subnet mask</strong>, <strong>default gateway</strong>, and <strong>DNS server</strong>. These four values determine whether a host can communicate locally, reach remote networks, and resolve domain names. If any one of these is wrong or missing, specific symptoms appear that point directly to the problem.</p><p><strong>IP Address verification:</strong> Confirm the host has an IP in the correct subnet. If the IP is <code>169.254.x.x</code> (APIPA / Automatic Private IP Addressing), the host attempted DHCP but received no response — the DHCP server is down, unreachable, or out of addresses. If the IP is <code>0.0.0.0</code>, the interface has no address at all. If the IP is in the wrong subnet (e.g., 10.0.1.x when it should be 10.0.2.x), the host was assigned to the wrong VLAN or DHCP scope.</p><p><strong>Subnet Mask verification:</strong> The mask must match the network design. A wrong mask means the host calculates the network/broadcast boundaries incorrectly — it may think a remote host is local (and try to ARP instead of routing) or think a local host is remote (and send traffic to the gateway unnecessarily). Common mismatch: /24 (255.255.255.0) configured when /25 (255.255.255.128) was intended.</p><p><strong>Default Gateway verification:</strong> The gateway is the IP of the nearest router or L3 switch SVI. If it is missing, the host can communicate within its own subnet but <strong>cannot reach any remote network</strong> — pings to local IPs succeed, pings to remote IPs fail. If the gateway is wrong (points to a non-existent IP or wrong router), the same symptom occurs. Verify the gateway is reachable with <code>ping [gateway IP]</code>.</p><p><strong>DNS Server verification:</strong> If DNS is missing or pointing to an unreachable server, the host can ping by IP address but <strong>cannot resolve domain names</strong> — <code>ping 8.8.8.8</code> works but <code>ping google.com</code> fails. This is the classic 'internet is down' complaint from users when really only name resolution is broken. Verify with <code>nslookup google.com</code> or <code>dig google.com</code>. Also check for DHCP vs static — a statically configured DNS server that was decommissioned is a common silent failure.</p>",
    visual: {
      type: "shield",
      params: {
        items: ["IP Address — correct subnet?", "Subnet Mask — right size?", "Default Gateway — reachable?", "DNS Server — resolving names?"],
        color: "#3b82f6"
      }
    },
    hack: {
      memory: "'A Man Gets Directions' = Address, Mask, Gateway, DNS — the four vital signs. Map each to its failure symptom: <strong>Address</strong> wrong/APIPA = nothing works. <strong>Mask</strong> wrong = can talk to some hosts but not others (boundary confusion). <strong>Gateway</strong> missing = local-only (can ping neighbors, not the internet). <strong>DNS</strong> missing = IP pings work but names don't resolve ('internet is down' but it's really just DNS).",
      practice: "Packet Tracer lab (Jeremy's IT Lab Day 5 style): Set up a PC with DHCP. Verify all four parameters with <code>ipconfig /all</code>. Then break each one individually and observe: (1) Set a wrong IP — ping fails to everything. (2) Set wrong mask (/25 instead of /24) — some pings fail, others work depending on which side of the boundary. (3) Remove the gateway — local pings work, remote pings fail. (4) Set DNS to a bogus IP — <code>ping 8.8.8.8</code> works but <code>ping google.com</code> fails. Document each symptom. This maps directly to exam scenario questions.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 5 covers IP parameter verification. Wendell Odom OCG Chapter 4 details the troubleshooting methodology. The exam presents scenarios like 'a user can ping 10.0.0.1 but cannot access www.example.com' and expects you to identify the broken parameter. Practice the symptom-to-parameter mapping until it is automatic — this is one of the highest-yield troubleshooting skills for both the exam and real life."
    }
  },

  "1.10.e": {
    info: "<p><strong>Network troubleshooting commands</strong> form a systematic toolkit for isolating connectivity problems layer by layer. The core commands are <code>ping</code>, <code>traceroute</code>/<code>tracert</code>, <code>nslookup</code>/<code>dig</code>, and on Windows, <code>pathping</code>. Each targets a different layer of the problem and should be used in a structured sequence, not randomly.</p><p><code>ping</code> sends ICMP Echo Request packets to a destination and listens for ICMP Echo Replies. It tests <strong>Layer 3 (IP) reachability</strong> — if the ping succeeds, the IP path between source and destination is functional. If it fails, the problem is at Layer 3 or below (IP misconfiguration, routing issue, ACL blocking ICMP, or a physical/Layer 2 failure). Key variations: <code>ping 127.0.0.1</code> tests the local TCP/IP stack, <code>ping [gateway]</code> tests local network connectivity, <code>ping [remote IP]</code> tests routing, and <code>ping [hostname]</code> tests DNS + routing combined.</p><p><code>traceroute</code> (Linux/macOS) and <code>tracert</code> (Windows) show the <strong>hop-by-hop path</strong> packets take to reach a destination. Each hop is a router along the path, identified by its IP address and round-trip time. If a hop shows <code>* * *</code> (timeouts), either that router is filtering ICMP/UDP probes or connectivity is lost at that point. Traceroute is essential for identifying <strong>where</strong> in the path traffic is being dropped — the last responding hop is your clue. Windows <code>tracert</code> uses ICMP; Linux <code>traceroute</code> uses UDP by default (use <code>traceroute -I</code> for ICMP).</p><p><code>nslookup</code> and <code>dig</code> test <strong>DNS resolution</strong> specifically. <code>nslookup google.com</code> queries the configured DNS server and returns the resolved IP address. If it fails while <code>ping [IP]</code> works, the problem is DNS, not routing. <code>dig</code> (Linux/macOS) provides more detailed output including query time, authoritative answers, and TTL values. On Windows, <code>nslookup</code> is the standard tool. <code>pathping</code> is a Windows-only command that combines ping and traceroute — it traces the path, then sends 100 pings to each hop to calculate packet loss statistics per hop. This identifies intermittent problems that a single ping misses.</p><p><strong>The structured troubleshooting ladder</strong> (bottom-up approach): (1) <code>ping 127.0.0.1</code> — local stack OK? (2) <code>ping [own IP]</code> — NIC OK? (3) <code>ping [gateway]</code> — local network OK? (4) <code>ping [remote IP]</code> — routing OK? (5) <code>ping [hostname]</code> — DNS OK? Each step narrows the problem. If step 4 works but step 5 fails, the issue is DNS. If step 3 fails, the issue is local (wrong IP, cable, VLAN).</p>",
    visual: {
      type: "packet-flow",
      params: { nodes: ["ping 8.8.8.8", "traceroute (hop 1, 2, 3...)", "nslookup google.com"], color: "#10b981" }
    },
    hack: {
      memory: "The troubleshooting ladder mnemonic: 'Lonely Iguanas Go Running Daily' = Loopback (127.0.0.1), Interface (own IP), Gateway, Remote IP, DNS (hostname). Each step tests one layer higher. The step that fails tells you where the break is. Also remember the OS differences: Windows = <code>tracert</code> and <code>pathping</code>, Linux/Mac = <code>traceroute</code> and <code>dig</code>.",
      practice: "Packet Tracer lab (Jeremy's IT Lab Day 5): Build a network with a PC, switch, router, and a server on a remote subnet. From the PC, execute the full ladder: (1) <code>ping 127.0.0.1</code>, (2) <code>ping [PC's own IP]</code>, (3) <code>ping [default gateway]</code>, (4) <code>ping [server IP]</code>, (5) <code>ping [server hostname]</code>. All should succeed. Then introduce failures one at a time — remove the default gateway, set wrong DNS, disconnect a cable — and re-run the ladder to see where it breaks. Also run <code>tracert [server IP]</code> on the Windows PC and identify each hop. Practice <code>nslookup</code> to verify DNS resolution. This is the single most practical lab for real-world troubleshooting.",
      effort: "high",
      meta: "Jeremy's IT Lab Day 5 introduces these tools in a lab environment. Wendell Odom OCG Chapter 4 formalizes the bottom-up troubleshooting methodology. The CCNA exam presents broken network scenarios and expects you to choose the correct command to identify the problem. 'A user can ping 10.1.1.1 but not www.example.com' = DNS. 'A user cannot ping the default gateway' = local network issue (wrong IP, cable, VLAN). Practice these mappings — they are worth 3-5 exam questions."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     1.11 — Describe wireless principles
  ══════════════════════════════════════════════════════════════ */

  "1.11.a": {
    info: "<p><strong>Non-overlapping Wi-Fi channels</strong> are the foundation of wireless network design. In the <strong>2.4 GHz band</strong>, the US FCC allocates channels 1 through 11. Each channel occupies approximately <strong>22 MHz of bandwidth</strong>, but channels are only spaced <strong>5 MHz apart</strong>. This means adjacent channels overlap significantly — channel 1 bleeds into channels 2, 3, 4, and 5. The only three channels that are completely separated from each other are <strong>1, 6, and 11</strong>. These are the only channels you should use when deploying 2.4 GHz APs. Using any other channel (e.g., channel 3 or 9) causes <strong>co-channel interference (CCI)</strong> with neighboring APs, degrading performance for all clients.</p><p>In the <strong>5 GHz band</strong>, the situation is much better. There are <strong>24+ non-overlapping channels</strong> available (the exact number depends on regulatory domain and DFS/UNII band availability). Channels are spaced at 20 MHz intervals, and with 20 MHz channel widths, they do not overlap at all. This is why 5 GHz networks suffer far less from co-channel interference. Additionally, 5 GHz supports wider channel widths — <strong>40 MHz, 80 MHz, and 160 MHz</strong> — by bonding adjacent channels together. Wider channels provide higher throughput but reduce the number of available non-overlapping channels.</p><p>When designing a multi-AP deployment, assign <strong>non-overlapping channels to physically adjacent APs</strong> in a honeycomb pattern. In 2.4 GHz, this means alternating between 1, 6, and 11. In 5 GHz, you have many more channels to work with, making large deployments easier. Cisco WLCs with <strong>RRM (Radio Resource Management)</strong> automatically assign channels and adjust transmit power to minimize interference across all APs.</p><p>Two types of interference matter: <strong>Co-channel interference (CCI)</strong> occurs when two APs use the same channel — they must share the airtime, halving throughput. <strong>Adjacent-channel interference (ACI)</strong> occurs when APs use overlapping (but not identical) channels — this is worse than CCI because the signals corrupt each other without cooperative sharing. This is why channel 3 between two APs on channels 1 and 6 would be disastrous — it overlaps with both.</p><p>Other 2.4 GHz interference sources include <strong>microwave ovens</strong> (operate at ~2.45 GHz), <strong>Bluetooth</strong> (frequency-hopping across the 2.4 GHz band), <strong>baby monitors</strong>, and <strong>cordless phones</strong>. The 5 GHz band has far fewer non-Wi-Fi interferers, which is another advantage beyond just having more channels.</p>",
    visual: {
      type: "comparison",
      params: {
        left: { label: "2.4 GHz", items: ["Only 3 non-overlapping: 1, 6, 11", "22 MHz wide channels", "More interference", "Better range/penetration"] },
        right: { label: "5 GHz", items: ["24+ non-overlapping channels", "20/40/80/160 MHz wide", "Less interference", "Shorter range"] }
      }
    },
    hack: {
      memory: "'One-Six-Eleven, Wi-Fi heaven' — the only 2.4 GHz channels that don't overlap. Why these three? Each channel is 22 MHz wide, spaced 5 MHz apart. 1 to 6 = five channels x 5 MHz = 25 MHz gap (enough to clear 22 MHz). Same for 6 to 11. Anything in between (channels 2-5, 7-10) overlaps with its neighbors. For 5 GHz: 'Five has more than five-times the channels' — 24+ non-overlapping. Also remember: CCI (same channel, share airtime) is bad, but ACI (overlapping channels, corrupt each other) is WORSE.",
      practice: "Packet Tracer lab (Jeremy's IT Lab Days 55-56): Deploy 4 APs in a floor plan diagram. Assign channels 1, 6, 11 to adjacent APs so no two neighbors share a channel. Draw the honeycomb pattern on paper. For 5 GHz, pick any 4 non-overlapping channels (e.g., 36, 40, 44, 48). Create a comparison flashcard: 2.4 GHz (3 non-overlapping, 22 MHz wide, more interference, better range/wall penetration) vs 5 GHz (24+ non-overlapping, 20/40/80/160 MHz, less interference, shorter range). Know common 2.4 GHz interferers: microwaves, Bluetooth, baby monitors.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 55 (Wireless Fundamentals) covers channel planning in depth. Wendell Odom OCG Chapter 25 details RF fundamentals. Channels 1, 6, 11 is one of the most frequently tested wireless facts — it appears in nearly every CCNA wireless question. The distinction between CCI and ACI is also testable. Draw the channel overlap diagram once and you will never forget it."
    }
  },

  "1.11.b": {
    info: "<p>The <strong>SSID (Service Set Identifier)</strong> is the human-readable name of a wireless network — the name you see when scanning for Wi-Fi on your phone or laptop (e.g., 'CompanyWiFi', 'GuestNetwork'). The SSID is broadcast by the AP in <strong>beacon frames</strong>, which are sent periodically (typically every 100 ms) to announce the network's existence. When a client scans for available networks, it listens for these beacons and displays the SSIDs it finds.</p><p>A single AP can broadcast <strong>multiple SSIDs</strong> — one per WLAN profile. Each SSID can be mapped to a different VLAN with different security settings. For example, one AP might broadcast 'Corporate' (VLAN 10, WPA2-Enterprise/802.1X), 'Guest' (VLAN 20, WPA2-PSK with captive portal), and 'IoT' (VLAN 30, WPA2-PSK). This allows a single AP to serve multiple user groups with different policies. On a WLC, each SSID corresponds to a separate WLAN profile.</p><p>The <strong>BSSID (Basic Service Set Identifier)</strong> is the MAC address of the AP's radio interface — it uniquely identifies a specific AP's radio. Each radio on an AP has a unique BSSID, and if an AP broadcasts multiple SSIDs, each SSID gets its own virtual BSSID (derived from the radio's base MAC). A <strong>BSS (Basic Service Set)</strong> is a single AP and all the clients associated with it. An <strong>ESS (Extended Service Set)</strong> is multiple APs sharing the same SSID to provide seamless roaming — as a client moves from one AP to another, the SSID stays the same but the BSSID changes.</p><p><strong>Hidden SSIDs</strong> are SSIDs where the AP suppresses the SSID name in beacon frames — the beacon is still sent, but the SSID field is empty. This is <strong>not a security measure</strong>. The SSID is still transmitted in <strong>probe requests</strong> (when a client actively searches for the network), <strong>probe responses</strong>, <strong>association requests</strong>, and <strong>reassociation requests</strong>. Any wireless sniffer (Wireshark, Kismet) can capture these frames and reveal the hidden SSID in seconds. Cisco and the CCNA explicitly state that hiding the SSID does not provide security.</p><p><strong>Key terminology summary:</strong> SSID = network name (human-readable), BSSID = AP radio MAC address (machine-level identifier), BSS = one AP + its clients, ESS = multiple APs sharing one SSID for roaming, Beacon = AP's periodic announcement frame.</p>",
    visual: { type: "packet-flow", params: { nodes: ["AP (Beacon: SSID='Office-WiFi')", "RF Signal", "Client (Sees 'Office-WiFi')"], color: "#8b5cf6" } },
    hack: {
      memory: "Three S's of wireless identity: <strong>SSID</strong> = name tag (human name), <strong>BSSID</strong> = fingerprint (AP radio MAC), <strong>BSS</strong> = one AP's club (single AP + members), <strong>ESS</strong> = the franchise (multiple APs, same name, seamless roaming). Hidden SSID = taking the sign off the restaurant — Google Maps (probe requests) still shows the address to anyone who looks. It is NOT security.",
      practice: "Packet Tracer lab (Jeremy's IT Lab Days 55-56): Create two WLANs on a WLC — 'Corporate' and 'Guest.' Connect a wireless client and scan for networks to see both SSIDs. On the WLC, check the BSSID for each SSID. Create a flashcard defining: SSID, BSSID, BSS, ESS, and beacon. Also create a 'myth vs fact' card: 'Hiding the SSID provides security' = MYTH (SSIDs leak in probe requests, probe responses, association frames). For exam prep, know that one AP can broadcast multiple SSIDs, each mapped to a different VLAN.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 55 covers wireless fundamentals including service sets. Wendell Odom OCG Chapter 25 defines BSS, ESS, SSID, and BSSID. The exam tests two things: (1) the definitions of SSID/BSSID/BSS/ESS, and (2) that hidden SSIDs are not a security measure. Both are quick memorization wins. The hidden SSID question is almost guaranteed to appear."
    }
  },

  "1.11.c": {
    info: "<p><strong>Radio Frequency (RF) fundamentals</strong> are critical for understanding how wireless networks operate. Wi-Fi uses two primary frequency bands: <strong>2.4 GHz</strong> (2.400 to 2.4835 GHz) and <strong>5 GHz</strong> (5.150 to 5.825 GHz, split across UNII-1/2/2e/3 sub-bands). The 6 GHz band (5.925 to 7.125 GHz) was introduced with Wi-Fi 6E but is not currently tested on the CCNA. Higher frequencies carry more data (higher throughput) but have shorter range and worse penetration through obstacles. Lower frequencies travel farther and penetrate walls better but offer less bandwidth.</p><p><strong>Signal strength</strong> is measured in <strong>dBm (decibels relative to 1 milliwatt)</strong>. dBm values are negative for received signals — the closer to zero, the stronger the signal. Reference scale: <strong>-30 dBm</strong> = excellent (very close to AP), <strong>-50 dBm</strong> = good, <strong>-60 dBm</strong> = acceptable, <strong>-70 dBm</strong> = weak (minimum for reliable data), <strong>-80 dBm</strong> = very weak (frequent drops), <strong>-90 dBm</strong> = unusable. A critical concept: every <strong>3 dB increase doubles power</strong>, every <strong>3 dB decrease halves power</strong>. So -40 dBm is twice as strong as -43 dBm, and 10 dB = approximately 10x power change.</p><p><strong>SNR (Signal-to-Noise Ratio)</strong> measures how much stronger the desired signal is compared to background noise, expressed in dB. A higher SNR means a cleaner signal. Minimum <strong>~20 dB SNR</strong> is needed for reliable connectivity; <strong>25+ dB</strong> is ideal for high-throughput applications like video. Even a strong signal (-40 dBm) is useless if the noise floor is also high (-45 dBm, giving only 5 dB SNR) — this is why environments with many interfering devices (warehouses, hospitals) have wireless problems despite strong signal readings.</p><p><strong>Signal degradation</strong> occurs through several mechanisms: <strong>absorption</strong> (signal passes through a material and loses energy — walls, floors, furniture), <strong>reflection</strong> (signal bounces off metal, glass, concrete — causes multipath interference), <strong>refraction</strong> (signal bends when passing between materials of different density), <strong>scattering</strong> (signal disperses when hitting irregular surfaces), and <strong>free-space path loss</strong> (signal weakens with distance according to the inverse-square law). The 2.4 GHz band penetrates most building materials better than 5 GHz, which is why 2.4 GHz provides better coverage through walls despite its lower throughput.</p><p><strong>802.11 standard evolution</strong> (exam-relevant): 802.11a (5 GHz, 54 Mbps), 802.11b (2.4 GHz, 11 Mbps), 802.11g (2.4 GHz, 54 Mbps), <strong>802.11n / Wi-Fi 4</strong> (2.4 + 5 GHz, 600 Mbps, introduced MIMO), <strong>802.11ac / Wi-Fi 5</strong> (5 GHz only, 6.9 Gbps, MU-MIMO), <strong>802.11ax / Wi-Fi 6</strong> (2.4 + 5 GHz, 9.6 Gbps, OFDMA, BSS coloring), <strong>Wi-Fi 6E</strong> (adds 6 GHz band).</p>",
    visual: {
      type: "gauge",
      params: { level: 70, label: "Signal Strength: -40 dBm (Good)", color: "#10b981" }
    },
    hack: {
      memory: "dBm mnemonic — 'Less Negative = Louder': -30 dBm = shouting in your ear (excellent), -50 = normal conversation (good), -70 = whispering across the room (weak), -80 = barely audible (unusable). The 3 dB rule: +3 dB = double power, -3 dB = half power, +10 dB = 10x power. For SNR: think of it as 'how much louder is the speaker than the crowd noise' — 25+ dB SNR = clear hearing, <20 dB = hard to understand. For the 802.11 standards, use the Wi-Fi generation names: 4=n, 5=ac, 6=ax. 'N-ac-ax' = 'Nack-Axe.'",
      practice: "Packet Tracer won't simulate RF, so this is flashcard work (Jeremy's IT Lab Days 55-56): (1) Create a dBm scale flashcard with the ranges and quality labels. (2) Create a '2.4 vs 5 GHz' comparison card: range, wall penetration, channel count, interference sources. (3) Create an 802.11 standards table: standard name | Wi-Fi generation | frequency | max speed | key features. Drill the table until you can recite it. Key facts: 802.11n introduced MIMO, 802.11ac introduced MU-MIMO and is 5 GHz only, 802.11ax introduced OFDMA and BSS coloring.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 55 covers RF fundamentals and 802.11 standards. Wendell Odom OCG Chapters 25-26 go into depth on wireless principles. The CCNA does not require RF calculations, but it asks conceptual questions: 'which band has better range?' (2.4 GHz), 'which has more non-overlapping channels?' (5 GHz), 'what does -70 dBm indicate?' (weak signal). The 802.11 standards table is guaranteed exam material — memorize the generation names and key features."
    }
  },

  "1.11.d": {
    info: "<p><strong>Wireless encryption</strong> has evolved through four generations, each fixing the vulnerabilities of the previous one. Understanding this evolution is critical for the CCNA because the exam tests which standard to recommend and why the older ones are insecure.</p><p><strong>WEP (Wired Equivalent Privacy)</strong> was the original 802.11 encryption standard, using the <strong>RC4</strong> stream cipher with static 40-bit or 104-bit keys. WEP is <strong>completely broken</strong> — the static Initialization Vector (IV) is only 24 bits long and repeats frequently, allowing an attacker to crack the key by capturing enough frames (typically within minutes using tools like aircrack-ng). WEP should <strong>never be used</strong> and any exam question involving WEP security is testing whether you know it is compromised.</p><p><strong>WPA (Wi-Fi Protected Access)</strong> was a temporary fix released before the 802.11i standard was finalized. It replaced WEP's static keys with <strong>TKIP (Temporal Key Integrity Protocol)</strong>, which dynamically generates per-packet keys using a mixing function. TKIP was a patch designed to run on existing WEP hardware — it was better than WEP but still has known vulnerabilities and is considered <strong>deprecated</strong>. WPA also introduced the <strong>4-way handshake</strong> for key exchange, which is still used in WPA2.</p><p><strong>WPA2</strong> (IEEE 802.11i ratified) is the <strong>current standard</strong> and the minimum acceptable security for production networks. It replaces TKIP with <strong>AES-CCMP (Advanced Encryption Standard — Counter Mode with Cipher Block Chaining Message Authentication Code Protocol)</strong>, which is far stronger. WPA2 comes in two modes: <strong>WPA2-Personal (PSK)</strong> — everyone shares one pre-shared key (suitable for small/home networks), and <strong>WPA2-Enterprise (802.1X)</strong> — each user authenticates with unique credentials through a RADIUS server (required for corporate environments). WPA2-Enterprise provides per-user encryption keys and is the Cisco-recommended standard.</p><p><strong>WPA3</strong> is the newest standard, replacing PSK with <strong>SAE (Simultaneous Authentication of Equals)</strong> for personal mode. SAE uses a Dragonfly handshake that provides <strong>forward secrecy</strong> (capturing today's traffic is useless if the key is later compromised) and protects against <strong>offline dictionary attacks</strong> (an attacker cannot capture the handshake and brute-force the password offline, unlike WPA2-PSK). WPA3-Enterprise uses 192-bit encryption for government/financial environments. WPA3 also introduces <strong>OWE (Opportunistic Wireless Encryption)</strong> for encrypting open networks without a password.</p>",
    visual: {
      type: "state-machine",
      params: {
        states: ["WEP (broken/RC4)", "WPA (TKIP/temp fix)", "WPA2 (AES/current)", "WPA3 (SAE/newest)"],
        active: 2,
        transitions: true
      }
    },
    hack: {
      memory: "Evolution mnemonic — 'Weak, Patched, Actual, Safe': WEP = <strong>W</strong>eak (RC4, broken in minutes), WPA = <strong>P</strong>atched (TKIP, temporary fix), WPA2 = <strong>A</strong>ctual security (AES-CCMP, current standard), WPA3 = <strong>S</strong>AFE (SAE, forward secrecy). Cipher mapping: WEP→RC4, WPA→TKIP, WPA2→AES, WPA3→SAE+AES. For modes: Personal = PSK (shared password), Enterprise = 802.1X (individual credentials via RADIUS). Mnemonic for WPA3's key feature: 'SAE = Safe Against Eavesdroppers' (forward secrecy, no offline brute-force).",
      practice: "Packet Tracer lab (Jeremy's IT Lab Days 55-56 wireless security): Create two WLANs on a WLC — one with WPA2-PSK and one with WPA2-Enterprise (if Packet Tracer supports RADIUS configuration). Connect clients to each. Create a comprehensive flashcard table with columns: Standard | Cipher | Status | Personal Mode | Enterprise Mode. WEP: RC4, broken, N/A, N/A. WPA: TKIP, deprecated, PSK, 802.1X. WPA2: AES-CCMP, current, PSK, 802.1X. WPA3: SAE+AES, newest, SAE, 192-bit. Drill this table. Also know: 'Which do you recommend for a corporate network?' = WPA2-Enterprise (802.1X) minimum, WPA3-Enterprise ideal.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 56 (Wireless Security) covers the full encryption evolution. Wendell Odom OCG Chapter 26 details WPA/WPA2/WPA3 in depth. The exam will ask: 'which encryption is broken?' (WEP), 'what replaced TKIP?' (AES-CCMP), 'what mode uses RADIUS?' (Enterprise/802.1X), 'what is the advantage of WPA3 SAE over WPA2 PSK?' (forward secrecy, no offline dictionary attack). These are 3-4 guaranteed questions."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     1.12 — Explain virtualization fundamentals
  ══════════════════════════════════════════════════════════════ */

  "1.12.a": {
    info: "<p><strong>Type 1 (bare-metal) hypervisors</strong> install directly on the physical hardware — there is no underlying operating system between the hypervisor and the server's CPU, RAM, NICs, and storage. The hypervisor <strong>IS the operating system</strong>; it manages all hardware resources and allocates them to virtual machines. This direct hardware access provides the best performance, lowest latency, and least overhead, which is why Type 1 hypervisors are the standard in <strong>production data centers and enterprise environments</strong>.</p><p>The three major Type 1 hypervisors you should know: <strong>VMware ESXi</strong> (the industry leader — a stripped-down, purpose-built hypervisor installed from a bootable ISO, managed via vCenter Server), <strong>Microsoft Hyper-V</strong> (when installed as a server role on Windows Server or as the free Hyper-V Server, it becomes a Type 1 hypervisor running at the hardware level below Windows), and <strong>KVM (Kernel-based Virtual Machine)</strong> (built into the Linux kernel — turns any Linux installation into a hypervisor, used heavily in cloud infrastructure like OpenStack and by providers like AWS/Google Cloud).</p><p>Type 1 hypervisors provide <strong>hardware-level isolation</strong> between VMs — each VM runs in its own memory space, with its own virtual CPU, virtual NIC, and virtual disk. A crash or compromise in one VM cannot directly affect another. The hypervisor uses hardware virtualization extensions in the CPU (<strong>Intel VT-x</strong> or <strong>AMD-V</strong>) to run VM instructions natively at near-hardware speed rather than emulating them in software.</p><p>In networking terms, Type 1 hypervisors create <strong>virtual switches (vSwitches)</strong> inside the hypervisor to connect VMs to physical network interfaces. VMware ESXi uses the vSphere Distributed Switch or standard vSwitch; KVM uses Open vSwitch (OVS) or Linux bridge. These virtual switches support VLANs, port mirroring, traffic shaping, and security policies — just like physical switches but in software. Understanding vSwitches is relevant because modern data centers run most workloads in VMs.</p><p><strong>Exam focus:</strong> Know the definition (runs directly on hardware), key examples (ESXi, Hyper-V, KVM), and the primary advantage (performance + isolation for production use).</p>",
    visual: {
      type: "layer-stack",
      params: {
        layers: ["VM 1 | VM 2 | VM 3", "Type 1 Hypervisor (ESXi/KVM)", "Physical Hardware (CPU, RAM, NIC)"],
        highlight: 1
      }
    },
    hack: {
      memory: "Type 1 = '#1 sits on the metal' — bare metal, no OS underneath, production-grade. Examples mnemonic: 'EHK' = ESXi, Hyper-V, KVM (the Big 3 Type 1s). Think of Type 1 as the 'first responder' — it is first to touch the hardware, nothing else between it and the CPU. The key selling points: performance (direct hardware access), isolation (hardware-level VM separation), and scale (hundreds of VMs per host).",
      practice: "Create a comparison flashcard: Type 1 column = bare metal, direct hardware, production, ESXi/Hyper-V/KVM, better performance, vSwitches. Type 2 column = hosted on OS, app-level, dev/test, VirtualBox/VMware Workstation, more overhead, easier install. For Packet Tracer: not directly labbed, but in real life you can download the free VMware ESXi ISO or enable Hyper-V on Windows to see a Type 1 hypervisor in action. Wendell Odom OCG does not require hands-on hypervisor labs for the exam.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 53 (Virtualization) covers Type 1 vs Type 2. Wendell Odom OCG Chapter 29 (Network Architecture) touches on virtualization concepts. The exam asks definition questions: 'which hypervisor type runs directly on hardware?' (Type 1), 'which is used in production?' (Type 1), 'name an example of a Type 1 hypervisor' (ESXi). Memorize the examples and the bare-metal concept — 2-3 questions maximum."
    }
  },

  "1.12.b": {
    info: "<p><strong>Type 2 (hosted) hypervisors</strong> run as an application on top of an existing operating system (the 'host OS'). The host OS (Windows, macOS, or Linux) manages the hardware normally, and the hypervisor runs inside it like any other program. VMs created by the Type 2 hypervisor are one more layer removed from the hardware — they must pass through both the hypervisor and the host OS to access CPU, RAM, and network resources. This extra layer adds <strong>overhead and reduces performance</strong> compared to Type 1.</p><p>Key examples: <strong>Oracle VirtualBox</strong> (free, open-source, cross-platform — runs on Windows, macOS, Linux), <strong>VMware Workstation</strong> (Windows/Linux, paid, feature-rich) and <strong>VMware Fusion</strong> (macOS equivalent), <strong>Parallels Desktop</strong> (macOS, popular for running Windows on Mac), and <strong>QEMU</strong> (open-source emulator often paired with KVM). These tools are used primarily for <strong>development, testing, learning, and lab environments</strong> — running Packet Tracer VMs, GNS3 router images, or test environments for software development.</p><p>The architecture stack for Type 2 is: Physical Hardware → Host OS → Type 2 Hypervisor (application) → Guest VMs. Compare this to Type 1: Physical Hardware → Type 1 Hypervisor → Guest VMs. The extra OS layer in Type 2 means: more RAM consumed (the host OS itself uses resources), higher latency for VM operations, and the VMs are dependent on the host OS's stability — if the host OS crashes, all VMs go down. Type 1 has no such dependency.</p><p>Despite the performance disadvantage, Type 2 hypervisors are <strong>much easier to install and use</strong>. You simply download an installer, run it on your existing OS, and start creating VMs. There is no need to dedicate an entire machine or repartition disks. This accessibility makes Type 2 the right choice for CCNA lab environments, software testing, and any scenario where convenience matters more than peak performance.</p><p><strong>Exam focus:</strong> Know the definition (runs on top of a host OS), key examples (VirtualBox, VMware Workstation), primary use case (dev/test/lab, not production), and the trade-off (easier to set up but more overhead).</p>",
    visual: {
      type: "layer-stack",
      params: {
        layers: ["VM 1 | VM 2", "Type 2 Hypervisor (VirtualBox/VMware)", "Host OS (Windows/macOS/Linux)", "Physical Hardware"],
        highlight: 1
      }
    },
    hack: {
      memory: "Type 2 = '#2 sits on an OS' — there are two layers (host OS + hypervisor) between VMs and hardware. Think of VirtualBox as an 'app' you installed, just like Chrome or Word — it lives inside your OS. Examples mnemonic: 'VWP' = VirtualBox, Workstation, Parallels. Key trade-off sentence: 'Type 2 is easy to install but slow to run; Type 1 is hard to install but fast to run.'",
      practice: "You already use a Type 2 hypervisor if you run VirtualBox or VMware on your Mac/PC for CCNA labs. Observe the performance difference: a VM running on VirtualBox feels slower than your native OS because of the overhead. Create a flashcard with the architecture stacks side by side: Type 1 = HW → Hypervisor → VMs, Type 2 = HW → Host OS → Hypervisor → VMs. Note the extra layer. For exam prep, know: 'a network engineer running GNS3 on their laptop is using which hypervisor type?' = Type 2.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 53 covers both hypervisor types. Wendell Odom OCG Chapter 29 mentions virtualization in the context of network architecture. The exam typically has one question distinguishing Type 1 from Type 2. The answer key: production data center = Type 1, engineer's laptop = Type 2. Know 2-3 examples of each and you are covered."
    }
  },

  "1.12.c": {
    info: "<p><strong>Virtual machines (VMs)</strong> are complete, isolated operating system instances running on a hypervisor. Each VM includes its own <strong>kernel, device drivers, system libraries, and applications</strong> — it is a full computer in software. The hypervisor allocates virtual hardware to each VM: <strong>vCPU</strong> (virtual CPU cores), <strong>vRAM</strong> (virtual memory), <strong>vNIC</strong> (virtual network interface card), and <strong>virtual disk</strong> (stored as a file like .vmdk or .qcow2 on the host's physical storage).</p><p>VMs provide <strong>hardware-level isolation</strong> — the strongest isolation available in virtualization. Each VM runs in its own memory address space, enforced by the CPU's hardware virtualization extensions (Intel VT-x/AMD-V). A crash, malware infection, or misconfiguration in one VM <strong>cannot directly affect other VMs</strong> on the same host. This isolation makes VMs the preferred choice for multi-tenant environments where security boundaries are critical (e.g., hosting different customers on the same physical server).</p><p>The trade-off for this strong isolation is <strong>resource weight</strong>. Each VM carries its own full OS, consuming <strong>GBs of RAM and disk space</strong> (a Windows Server VM might need 4-8 GB RAM and 40+ GB disk just for the OS before any applications). Boot times are measured in <strong>minutes</strong> (the full OS boot sequence). Density is lower — a physical server might run 20-50 VMs compared to hundreds or thousands of containers. However, VMs are still far more efficient than physical servers because multiple VMs share one physical host.</p><p><strong>Live migration</strong> (VMware vMotion, Microsoft Live Migration) moves a running VM from one physical host to another with zero downtime. The VM's memory state, CPU state, and network connections are transferred seamlessly. This enables <strong>hardware maintenance without outages</strong> — migrate all VMs off a host, perform maintenance, then migrate them back. Live migration requires shared storage (SAN/NAS) accessible to both source and destination hosts.</p><p><strong>Networking inside VMs:</strong> Each VM's vNIC connects to a <strong>virtual switch (vSwitch)</strong> inside the hypervisor, which in turn connects to the host's physical NIC. VMs can be assigned to VLANs, receive DHCP addresses, and communicate with the physical network exactly like physical hosts. The vNIC has its own MAC address, and the physical switch sees each VM as a separate device.</p>",
    visual: {
      type: "layer-stack",
      params: {
        layers: ["App | App | App", "Guest OS | Guest OS | Guest OS", "Hypervisor", "Physical Hardware"],
        highlight: 1
      }
    },
    hack: {
      memory: "VM = 'a house with its own foundation' — each VM has its own OS (foundation), plumbing (drivers), and walls (isolation). Container = 'an apartment in a shared building' — shared foundation (kernel) but separate living spaces. The key comparison table: VMs = GB-sized, minutes to boot, hardware isolation, full OS. Containers = MB-sized, seconds to boot, process isolation, shared kernel. Mnemonic: 'VMs are Heavy Houses, Containers are Light Apartments.'",
      practice: "Create the definitive VM vs Container comparison flashcard (Jeremy's IT Lab Day 53): Size (VMs=GBs, Containers=MBs), Boot time (VMs=minutes, Containers=seconds), Isolation (VMs=hardware-level, Containers=process-level), OS (VMs=each has full OS, Containers=share host kernel), Density (VMs=20-50 per host, Containers=hundreds per host), Use case (VMs=strong isolation needed, Containers=microservices/fast scaling). This single flashcard covers the most-tested comparison on the exam.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 53 covers VMs and containers. Wendell Odom OCG Chapter 29 (Network Architecture) covers virtualization fundamentals. The VM vs container comparison is a guaranteed exam question — typically phrased as 'which technology provides stronger isolation?' (VMs) or 'which is more lightweight and faster to deploy?' (containers). Memorize the comparison table and you will answer correctly every time."
    }
  },

  "1.12.d": {
    info: "<p><strong>Containers</strong> represent a fundamentally different approach to virtualization compared to VMs. Instead of virtualizing the entire hardware stack and running a full OS per instance, containers <strong>share the host operating system's kernel</strong> and package only the <strong>application code, libraries, and dependencies</strong> needed to run. This makes containers dramatically lighter than VMs — a typical container image is <strong>MB-sized</strong> (10-500 MB), boots in <strong>seconds</strong> (often under 1 second), and uses a fraction of the RAM a VM would need for the same application.</p><p><strong>Docker</strong> is the dominant container platform and the one most likely to be referenced on the CCNA. Docker packages applications into <strong>container images</strong> — portable, self-contained bundles that include everything the application needs to run. A Docker image can be built once and run identically on any system with Docker installed (Linux, Windows, macOS), providing true <strong>portability</strong>. <strong>Kubernetes (K8s)</strong> is the standard orchestration platform for managing containers at scale — deploying, scaling, load balancing, and healing containerized applications across clusters of hosts.</p><p>Containers provide <strong>process-level isolation</strong> using Linux kernel features: <strong>namespaces</strong> (isolate what a container can see — separate PID, network, mount, user spaces) and <strong>cgroups</strong> (isolate what a container can use — CPU, memory, I/O limits). This isolation is weaker than VM hardware-level isolation because all containers share the same kernel — a kernel vulnerability could theoretically allow one container to affect others. For this reason, containers are not recommended as security boundaries for untrusted workloads.</p><p>The primary use case for containers is <strong>microservices architecture</strong> — breaking a large application into small, independent services that each run in their own container. A web application might have separate containers for the web frontend, API backend, database, and cache. Each can be developed, deployed, updated, and scaled independently. If the API needs to handle more traffic, you spin up 10 more API containers in seconds — try that with VMs.</p><p><strong>Networking for containers:</strong> Each container gets its own network namespace with virtual interfaces, and the container runtime creates <strong>virtual bridges and overlay networks</strong> to connect containers to each other and to the external network. Docker uses bridge networking by default (similar to a vSwitch), and Kubernetes uses CNI (Container Network Interface) plugins for pod networking across multiple hosts.</p>",
    visual: {
      type: "layer-stack",
      params: {
        layers: ["App A | App B | App C", "Container Runtime (Docker)", "Host OS Kernel (shared)", "Physical Hardware"],
        highlight: 1
      }
    },
    hack: {
      memory: "Containers = 'apps in a shared apartment building' — everyone shares the building's foundation (kernel), plumbing (system calls), and utilities (base OS libraries), but each apartment (container) has its own furniture (app + dependencies). Docker = the landlord that manages the apartments. Kubernetes = the property management company that manages multiple buildings. Key mnemonic: 'Containers are FLIP' = Fast (seconds to boot), Light (MBs), Isolated (process-level), Portable (run anywhere Docker runs).",
      practice: "This is flashcard territory for the CCNA (Jeremy's IT Lab Day 53): Review your VM vs Container comparison card and ensure you can explain the trade-off in one sentence: 'VMs provide stronger isolation with more resource overhead; containers provide faster deployment with weaker isolation.' For hands-on understanding (not CCNA-required but valuable for CW work): install Docker on your machine, run <code>docker run -it ubuntu bash</code> to see how fast a container starts versus booting a VM. Observe that you are sharing your host's kernel.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 53 covers containers alongside VMs. Wendell Odom OCG Chapter 29 mentions containers in the context of modern application deployment. The CCNA exam asks 1-2 container questions, always in comparison to VMs: 'which is faster to deploy?' (container), 'which shares the host kernel?' (container), 'which provides hardware-level isolation?' (VM). Know Docker as the primary container platform and Kubernetes as the orchestration platform."
    }
  },

  "1.12.e": {
    info: "<p><strong>VRF (Virtual Routing and Forwarding)</strong> is a technology that creates <strong>multiple independent routing tables on a single physical router</strong>. Each VRF instance is a completely separate routing domain — it has its own <strong>routing table</strong>, its own <strong>interface assignments</strong>, and its own <strong>forwarding decisions</strong>. Traffic in one VRF is completely isolated from traffic in another VRF, as if they were running on separate physical routers. This is sometimes called <strong>'router virtualization'</strong> because one router behaves like several.</p><p>The most powerful feature of VRF is the ability to use <strong>overlapping IP address spaces</strong>. Customer A can use 10.1.1.0/24 in VRF-A, and Customer B can use the exact same 10.1.1.0/24 in VRF-B — there is no conflict because each VRF has its own routing table. Without VRF, this would be impossible because a single routing table cannot have two routes to the same destination. This makes VRF essential for <strong>service providers</strong> who host multiple customers on shared infrastructure.</p><p>Common VRF use cases in enterprise networks: <strong>Management plane isolation</strong> (management traffic in a separate VRF from user data — if the data network is compromised, the management network remains accessible), <strong>guest network isolation</strong> (guest traffic routed separately from corporate traffic even on shared routers), <strong>compliance segmentation</strong> (PCI DSS or HIPAA data isolated from general traffic), and <strong>multi-tenant environments</strong> (shared infrastructure serving multiple business units or customers).</p><p>VRF configuration involves: (1) creating the VRF with <code>ip vrf [name]</code> (or <code>vrf definition [name]</code> in newer IOS), (2) assigning interfaces to the VRF with <code>ip vrf forwarding [name]</code> under the interface (this removes any existing IP address — you must re-add it after assigning the VRF), and (3) configuring routing within the VRF (static routes or routing protocol instances per VRF). The global routing table is separate from all VRFs — it is the 'default' routing domain.</p><p><strong>Key concept for the exam:</strong> Traffic <strong>cannot cross between VRFs</strong> without explicit configuration — either <strong>route leaking</strong> (importing routes between VRFs) or routing traffic through a <strong>shared services VRF</strong> (a common pattern for DNS, DHCP, or internet access shared across VRFs).</p>",
    visual: {
      type: "comparison",
      params: {
        left: { label: "VRF-A (Customer 1)", items: ["Routing table A", "Interfaces: Gi0/0, Gi0/1", "10.1.0.0/24 network"] },
        right: { label: "VRF-B (Customer 2)", items: ["Routing table B", "Interfaces: Gi0/2, Gi0/3", "10.1.0.0/24 network (same IP, no conflict!)"] }
      }
    },
    hack: {
      memory: "VRF = 'Virtual Router inside a Real router.' Think of it as separate filing cabinets in one office — each cabinet (VRF) has its own set of addresses, and looking in Cabinet A tells you nothing about Cabinet B. The killer feature: <strong>overlapping IPs</strong>. Both Customer A and Customer B can use 10.1.1.0/24 because they are in different cabinets. Mnemonic: 'VRF = Very Real Fences' — real isolation between routing domains on one box.",
      practice: "Packet Tracer lab (conceptual — Packet Tracer has limited VRF support): Draw a diagram with one router serving two customers. Customer A has network 10.0.0.0/24 in VRF-A, Customer B also has 10.0.0.0/24 in VRF-B. Show that each VRF has a separate routing table. For CLI practice on real IOS or CML: <code>ip vrf CUSTOMER-A</code>, <code>interface Gi0/0</code>, <code>ip vrf forwarding CUSTOMER-A</code>, <code>ip address 10.0.0.1 255.255.255.0</code>. Verify with <code>show ip vrf</code> and <code>show ip route vrf CUSTOMER-A</code>. Know that assigning a VRF to an interface removes the existing IP.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 53 covers VRF concepts. Wendell Odom OCG Chapter 29 discusses VRF in the context of network virtualization. The CCNA tests VRF conceptually — 'what technology allows overlapping IP address spaces on one router?' (VRF), 'how does a service provider isolate customer traffic on shared infrastructure?' (VRF). You will not need to configure VRF on the exam, but understand what it does and why it exists."
    }
  },

  "1.12.f": {
    info: "<p><strong>VRF-Lite</strong> is VRF implemented <strong>without MPLS</strong> — it provides the same routing table isolation and overlapping address space support as full VRF, but uses standard IP routing instead of MPLS label switching between routers. This makes it simpler to configure and deploy, particularly in <strong>campus and enterprise networks</strong> where MPLS infrastructure is not present or justified.</p><p>In a full VRF + MPLS deployment (common at service providers), MPLS labels are used to forward traffic between routers while maintaining VRF isolation across the provider's backbone — this is how MPLS VPNs work. VRF-Lite skips the MPLS layer entirely. Instead, traffic between VRF-aware routers is carried on <strong>separate subinterfaces or trunk links</strong>, with each VRF's traffic tagged to a different VLAN. The routers at each end map the VLANs to their local VRF instances.</p><p>Common VRF-Lite deployment: a campus network where the same physical router/L3 switch infrastructure must carry <strong>management traffic, production traffic, and guest traffic</strong> in complete isolation. Instead of buying three sets of routers, you create three VRFs (Management, Production, Guest), assign interfaces to each, and configure routing within each VRF independently. Trunk links between switches/routers carry all three VRFs as tagged VLANs. Each VRF has its own default route — Guest VRF might route to the internet only, while Production VRF has routes to internal data centers.</p><p>The <strong>limitation of VRF-Lite</strong> compared to full VRF + MPLS is scalability. Every router in the path must be VRF-aware and must maintain separate routing tables per VRF. In MPLS, intermediate routers (P routers) just switch labels without knowing about VRFs. VRF-Lite is perfectly adequate for campus networks with 2-10 routers but does not scale to service provider backbones with hundreds of routers.</p><p><strong>Exam focus:</strong> Know that VRF-Lite = VRF without MPLS, provides the same isolation benefits, is used in campus/enterprise networks, and uses standard IP routing with VLAN separation between VRF-aware routers.</p>",
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
      memory: "'Lite = Less Infrastructure, Traffic-isolated Everywhere' — VRF-Lite gives you VRF isolation without needing MPLS infrastructure. Think of full VRF+MPLS as a highway system with toll booths (labels) — built for massive scale. VRF-Lite is local roads with painted lane dividers (VLANs) — simpler, cheaper, works for a small town (campus network). Key sentence: 'VRF-Lite uses VLANs between routers instead of MPLS labels.'",
      practice: "Create a comparison flashcard: Full VRF+MPLS = service provider scale, label switching, P routers don't need VRF awareness, complex. VRF-Lite = campus scale, standard IP routing, every router must be VRF-aware, simpler. Also draw a campus diagram: Core Router with VRFs (Mgmt, Prod, Guest), trunk to Distribution Switch (VLANs 100, 200, 300 mapped to VRFs), Access Switches with ports in corresponding VLANs. This visual will clarify how VRF-Lite works in practice.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 53 mentions VRF-Lite. Wendell Odom OCG Chapter 29 distinguishes VRF from VRF-Lite. The CCNA may have one question: 'what is VRF-Lite?' — answer: VRF without MPLS, used for traffic segmentation in campus networks. One flashcard covering the distinction is sufficient. This is a low-weight exam topic."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     1.13 — Describe switching concepts
  ══════════════════════════════════════════════════════════════ */

  "1.13.a": {
    info: "<p><strong>MAC address learning</strong> is the foundational process by which a Layer 2 switch builds its MAC address table (also called the CAM table — Content Addressable Memory). This process is <strong>automatic</strong> — no configuration is required. Every time a frame arrives at a switch port, the switch examines the <strong>source MAC address</strong> in the frame header and records it in the MAC address table alongside the <strong>ingress port number</strong> and a <strong>timestamp</strong>.</p><p>The learning process follows these rules: (1) If the source MAC is <strong>not in the table</strong>, the switch creates a new entry mapping that MAC to the ingress port and starts the aging timer. (2) If the source MAC <strong>already exists</strong> in the table on the same port, the switch simply <strong>resets the aging timer</strong> — no change needed. (3) If the source MAC exists but is mapped to a <strong>different port</strong>, the switch <strong>updates the entry</strong> to reflect the new port — this means the device has moved (plugged into a different port or moved to a different switch). This update is critical for supporting laptop users who move between conference rooms.</p><p>The switch <strong>only learns from source MACs</strong> — it never learns from destination MACs. The source MAC tells the switch 'this device is reachable through this port.' The destination MAC is used for the <strong>forwarding decision</strong>, not for learning. This distinction is important: learning happens on the source, forwarding happens on the destination.</p><p>Each entry in the MAC address table includes: the <strong>VLAN ID</strong> (MAC addresses are learned per-VLAN — the same MAC on different VLANs would be separate entries), the <strong>MAC address</strong>, the <strong>type</strong> (dynamic = learned automatically, static = manually configured), and the <strong>port</strong>. Verify with <code>show mac address-table</code>. You can also view only dynamic entries with <code>show mac address-table dynamic</code> or filter by VLAN with <code>show mac address-table vlan [id]</code>.</p><p>The MAC address table has a <strong>finite size</strong> (varies by switch model — typically 8,000 to 128,000+ entries). If the table fills up, the switch can no longer learn new MACs and must <strong>flood all unknown traffic</strong>. This is the basis of a <strong>MAC flooding attack</strong> (an attacker sends thousands of frames with random source MACs to overflow the table), which is why port security exists to limit the number of MACs per port.</p>",
    visual: {
      type: "handshake",
      params: {
        leftLabel: "PC (MAC: AAAA)",
        rightLabel: "Switch",
        steps: ["Frame arrives on port Gi0/1 →", "← Learns: AAAA = Gi0/1", "Frame from BBBB on Gi0/2 →", "← Learns: BBBB = Gi0/2"]
      }
    },
    hack: {
      memory: "MAC learning = 'the switch is a bouncer with a clipboard.' Every time someone (frame) walks in a door (port), the bouncer writes down their name (source MAC) and which door they entered. The bouncer NEVER learns names from the destination field — only from who walks in. Critical rule: 'Learn from source, forward by destination.' If a regular shows up at a new door, the bouncer updates the clipboard (device moved). If nobody comes through a door for 5 minutes (300 seconds), the name gets erased (aging).",
      practice: "Packet Tracer lab (Jeremy's IT Lab Day 6): Connect 3 PCs to a 2960 switch. Before any pings, run <code>show mac address-table</code> — it should be empty (or nearly empty). Have PC-A ping PC-B. Immediately check the MAC table — you should see PC-A's MAC learned on its port. Then have PC-B reply — now PC-B's MAC appears. Have PC-C ping PC-A — PC-C's MAC gets added. Observe that all entries are 'DYNAMIC.' Then run <code>clear mac address-table dynamic</code> and verify they disappear. Wait 5 minutes without any traffic and observe entries aging out naturally. This lab builds the intuition for how switches populate their tables.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 6 (Ethernet LAN Switching) is the primary resource for MAC learning. Wendell Odom OCG Chapters 5-7 cover switching fundamentals in detail. The exam tests the learning process directly: 'when does a switch learn a MAC?' (when a frame arrives — from the source MAC), 'what happens when a device moves?' (the entry is updated to the new port). Also know the MAC flooding attack concept — it is why port security limits MACs per port."
    }
  },

  "1.13.b": {
    info: "<p><strong>Frame forwarding (known unicast)</strong> occurs when a frame arrives at a switch and the destination MAC address <strong>is found in the MAC address table</strong>. The switch looks up the destination MAC, finds the associated egress port, and forwards the frame <strong>only out that specific port</strong>. No other ports see the frame. This is the most efficient switching behavior — bandwidth is preserved because frames go only where they need to go.</p><p>Cisco switches use three <strong>frame forwarding methods</strong> that determine how much of the frame the switch reads before making a forwarding decision:</p><ul><li><strong>Store-and-Forward:</strong> The switch receives the <strong>entire frame</strong> into a buffer, runs a <strong>CRC (Cyclic Redundancy Check)</strong> on the FCS field to verify frame integrity, and only then forwards it. If the CRC fails (corrupted frame), the frame is dropped. This is the <strong>most reliable method</strong> and the default on modern Cisco Catalyst switches. The trade-off is slightly higher latency because the switch must wait for the complete frame.</li><li><strong>Cut-Through:</strong> The switch reads only the <strong>first 6 bytes</strong> (the destination MAC address) and immediately begins forwarding the frame before the rest arrives. This provides the <strong>lowest latency</strong> but cannot detect corrupted frames (no CRC check). Corrupted frames are forwarded to the destination, wasting bandwidth. Used in latency-sensitive environments like HPC and financial trading.</li><li><strong>Fragment-Free:</strong> A compromise — the switch reads the <strong>first 64 bytes</strong> of the frame before forwarding. Since most collisions in half-duplex Ethernet corrupt the first 64 bytes (runt frames), fragment-free catches collision fragments while still being faster than store-and-forward. Less common today since full-duplex has eliminated collisions on modern switches.</li></ul><p>In addition to forwarding, a switch performs two other frame-handling actions: <strong>filtering</strong> (dropping a frame when the source and destination are on the same port — there is no reason to forward a frame back out the port it arrived on) and <strong>flooding</strong> (sending the frame out all ports except the source port — covered in the next subtopic). Together, forwarding, filtering, and flooding are the three core switching actions.</p><p><strong>Key exam point:</strong> Modern Cisco switches default to <strong>store-and-forward</strong>. Know all three methods and their trade-offs, especially the difference between store-and-forward (CRC check, higher latency) and cut-through (no CRC, lowest latency).</p>",
    visual: { type: "packet-flow", params: { nodes: ["PC-A (Gi0/1)", "Switch (MAC table lookup)", "PC-B (Gi0/3 only)"], color: "#3b82f6" } },
    hack: {
      memory: "Three switching actions mnemonic: 'FFF' = Forward (known unicast — destination MAC is in the table, send out that port only), Flood (unknown unicast/broadcast/multicast — destination unknown, send everywhere), Filter (source and destination on same port — drop it, no need to forward). For frame forwarding methods: 'Store checks everything, Cut checks nothing, Fragment checks 64.' Store-and-Forward = full CRC = safe. Cut-Through = first 6 bytes only = fast. Fragment-Free = first 64 bytes = middle ground.",
      practice: "Packet Tracer lab (Jeremy's IT Lab Day 6): After the MAC learning lab, observe forwarding in action. With all MACs learned, ping PC-A to PC-B. Check the switch — traffic only goes to PC-B's port, not PC-C's. This is known unicast forwarding. Then create a flashcard for the three forwarding methods: Store-and-Forward (entire frame, CRC check, default on Catalyst), Cut-Through (first 6 bytes, no CRC, lowest latency), Fragment-Free (first 64 bytes, catches runts). Know the filtering action too — if source and destination are on the same port, the switch drops the frame.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 6 covers frame forwarding methods. Wendell Odom OCG Chapter 5-6 goes into depth on store-and-forward vs cut-through. The exam asks: 'which method checks for errors before forwarding?' (store-and-forward), 'which has the lowest latency?' (cut-through), 'what is the default on Cisco Catalyst switches?' (store-and-forward). Also know the three actions (forward/flood/filter) — a classic exam question is 'what does a switch do when it receives a frame with a known destination MAC?'"
    }
  },

  "1.13.c": {
    info: "<p><strong>Frame flooding</strong> occurs when a switch must send a frame out <strong>all ports in the VLAN except the ingress port</strong>. This happens in three specific situations, and understanding each is critical for the CCNA:</p><p><strong>1. Unknown Unicast Flooding:</strong> When a frame arrives with a destination MAC that is <strong>not in the MAC address table</strong>, the switch has no idea which port leads to that device. The only safe option is to send the frame out every port in the VLAN — if the destination device is connected to any of those ports, it will receive the frame and respond. When it responds, the switch learns the device's MAC from the response frame's source MAC, and future traffic can be forwarded directly. Unknown unicast flooding is <strong>temporary</strong> — it resolves itself as the switch learns MAC addresses.</p><p><strong>2. Broadcast Flooding:</strong> Any frame with a destination MAC of <code>FFFF.FFFF.FFFF</code> is a <strong>broadcast</strong> and is always flooded to all ports in the VLAN. This is by design — broadcasts are meant for every device in the broadcast domain. Common broadcasts include <strong>ARP requests</strong> ('who has IP 10.0.0.1?'), <strong>DHCP Discover</strong> messages, and <strong>NetBIOS name resolution</strong>. Broadcasts are the primary reason to segment networks with VLANs — without VLANs, every broadcast reaches every device on the switch.</p><p><strong>3. Multicast Flooding:</strong> By default, switches flood multicast frames (destination MAC starting with <code>01:00:5E</code>) to all ports in the VLAN, similar to broadcasts. With <strong>IGMP snooping</strong> enabled (default on most modern switches), the switch learns which ports have multicast receivers and forwards multicast traffic only to those ports, reducing unnecessary flooding.</p><p>Excessive flooding is a <strong>performance problem</strong> — it wastes bandwidth on ports that do not need the traffic and increases CPU load on devices that must process and discard irrelevant frames. This is why proper network design limits broadcast domains using VLANs. A VLAN creates a boundary — flooding stops at the VLAN edge. A rule of thumb is to keep broadcast domains to ~250 hosts or fewer to limit flood traffic.</p><p><strong>Security implication:</strong> A <strong>MAC flooding attack</strong> fills the switch's MAC address table with fake entries. Once the table is full, the switch can no longer learn new MACs and must flood all traffic — turning the switch into a hub where an attacker can sniff all frames. <strong>Port security</strong> mitigates this by limiting the number of MAC addresses allowed per port.</p>",
    visual: { type: "packet-flow", params: { nodes: ["PC-A (Gi0/1)", "Switch (FLOOD!)", "Gi0/2 + Gi0/3 + Gi0/4 (all ports)"], color: "#ef4444" } },
    hack: {
      memory: "Three flood triggers — 'UBM' = Unknown unicast, Broadcast, Multicast. Think: 'U Broadcast to Many.' Unknown unicast = 'I don't know where you live, so I'm yelling your name in every room.' Broadcast (FFFF.FFFF.FFFF) = 'attention everyone!' (ARP, DHCP). Multicast = 'calling all members of this group.' Key: flooding goes to ALL ports in the VLAN except the source port. A VLAN is the flood boundary — floods never cross VLAN borders without a router.",
      practice: "Packet Tracer lab (Jeremy's IT Lab Day 6): After building the MAC learning lab, run <code>clear mac address-table dynamic</code> to erase all learned MACs. Then have PC-A ping PC-B. In simulation mode, watch the first frame — the switch floods it out all ports (unknown unicast). PC-B replies, and the switch learns PC-B's MAC. The second frame from PC-A to PC-B is forwarded (not flooded) because the MAC is now known. Also observe ARP requests — they are always broadcast/flooded regardless of the MAC table state. Create a flowchart flashcard: Frame arrives → Is destination MAC in table? YES → Forward out that port. NO → Flood out all ports in VLAN (except source). Is destination FF:FF:FF:FF:FF:FF? → Always flood.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 6 demonstrates flooding vs forwarding in Packet Tracer simulation mode. Wendell Odom OCG Chapter 5 covers the flooding/forwarding/filtering trio. The exam loves asking 'what happens when a switch receives a frame with an unknown destination MAC?' — answer: flood to all ports in the VLAN except the ingress port. Also know: 'why do VLANs exist?' — to limit broadcast/flood domains. These concepts tie directly into VLAN design (Domain 2.1)."
    }
  },

  "1.13.d": {
    info: "<p>The <strong>MAC address table</strong> (also called the <strong>CAM table</strong> — Content Addressable Memory) is the core data structure that drives all Layer 2 forwarding decisions on a switch. It is a database mapping <strong>MAC addresses</strong> to <strong>switch ports</strong> within each <strong>VLAN</strong>. When a frame arrives, the switch looks up the destination MAC in this table to determine where to send it. Without the MAC address table, a switch would have to flood every frame — essentially functioning as a hub.</p><p>Each entry in the table contains four fields: <strong>VLAN ID</strong> (MAC addresses are learned per-VLAN — the same MAC address on VLAN 10 and VLAN 20 would be two separate entries), <strong>MAC Address</strong> (48-bit, in the format AAAA.BBBB.CCCC on Cisco), <strong>Type</strong> (DYNAMIC for automatically learned entries, STATIC for manually configured entries), and <strong>Port</strong> (the switch interface where the MAC was learned). Verify the table with <code>show mac address-table</code>.</p><p><strong>Aging timer:</strong> Dynamic entries have a default aging time of <strong>300 seconds (5 minutes)</strong> on Cisco switches. If the switch does not receive any frame with that source MAC within the aging window, the entry is removed from the table. This keeps the table clean — devices that disconnect or move do not leave stale entries permanently. Every time a frame arrives from a known MAC, the aging timer for that entry <strong>resets to 300 seconds</strong>. You can view the aging timer with <code>show mac address-table aging-time</code> and change it with <code>mac address-table aging-time [seconds]</code> in global config.</p><p><strong>Static MAC entries</strong> can be configured manually with <code>mac address-table static [MAC] vlan [id] interface [port]</code>. Static entries <strong>never age out</strong> and take precedence over dynamic entries. They are used for security (ensuring a critical server's MAC is always mapped to a specific port) or for port security configurations. Static entries survive switch reboots if saved to the running config.</p><p><strong>Key verification commands:</strong> <code>show mac address-table</code> (full table), <code>show mac address-table dynamic</code> (only learned entries), <code>show mac address-table static</code> (only static entries), <code>show mac address-table vlan [id]</code> (entries for a specific VLAN), <code>show mac address-table address [MAC]</code> (look up a specific MAC), <code>show mac address-table count</code> (total entries vs capacity), <code>clear mac address-table dynamic</code> (flush all dynamic entries — useful for troubleshooting).</p>",
    visual: {
      type: "comparison",
      params: {
        left: { label: "MAC Address Table", items: ["MAC: AAAA.BBBB.CCCC → Gi0/1", "MAC: DDDD.EEEE.FFFF → Gi0/2", "Aging Timer: 300s (default)", "Type: Dynamic or Static"] },
        right: { label: "Verify Commands", items: ["show mac address-table", "show mac address-table dynamic", "show mac address-table aging-time", "clear mac address-table dynamic"] }
      }
    },
    hack: {
      memory: "MAC table aging = <strong>300 seconds = 5 minutes</strong>. Mnemonic: '5 minutes of silence and you're off the guest list.' If a device keeps talking, the timer refreshes back to 300 every time. Key numbers to memorize: 300 (MAC aging), 10 (CDP timer=60s, holdtime=180s), default VLAN=1. For entry types: DYNAMIC = learned (ages out), STATIC = configured (permanent). CAM = Content Addressable Memory — the hardware that makes MAC lookups fast (O(1) instead of searching a list).",
      practice: "Packet Tracer lab (Jeremy's IT Lab Day 6): After the MAC learning lab, run <code>show mac address-table</code> and identify each field: VLAN, MAC Address, Type, Ports. Run <code>show mac address-table dynamic</code> to see only learned entries. Run <code>show mac address-table count</code> to see how many entries exist vs the table capacity. Then <code>clear mac address-table dynamic</code> and verify the table is empty. Wait 5 minutes without any traffic and observe entries aging out naturally (or use Packet Tracer's fast-forward). For extra practice, configure a static MAC entry: <code>mac address-table static AAAA.BBBB.CCCC vlan 1 interface Gi0/1</code> — verify it appears as STATIC and does not age out.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 6 covers the MAC address table in depth. Wendell Odom OCG Chapter 5-6 details CAM table operations. The exam shows <code>show mac address-table</code> output in simlets and asks you to interpret it — 'which port is device X connected to?', 'how many devices are in VLAN 10?', 'is this entry static or dynamic?'. Know the default aging time (300 seconds) — it is a guaranteed test point. Also know that <code>clear mac address-table dynamic</code> is used during troubleshooting to force re-learning."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     DOMAIN 2 — NETWORK ACCESS (20%)
  ══════════════════════════════════════════════════════════════ */

  /* ══════════════════════════════════════════════════════════════
     2.1 — Configure and verify VLANs
  ══════════════════════════════════════════════════════════════ */

  "2.1.a": {
    info: "<p><strong>Access ports</strong> are switch ports configured to carry traffic for <strong>a single VLAN</strong>. They connect to end devices — PCs, printers, IP cameras, IoT sensors — that are unaware of VLANs. When a frame leaves the switch through an access port, the switch <strong>strips any VLAN tag</strong> before sending it — the endpoint receives a standard Ethernet frame with no 802.1Q header. When a frame enters the switch through an access port, the switch <strong>assigns the frame to the port's configured VLAN</strong>, adding the VLAN tag internally for forwarding decisions.</p><p>Access port configuration requires two commands: <code>switchport mode access</code> (explicitly sets the port to access mode, preventing trunk negotiation) and <code>switchport access vlan [id]</code> (assigns the port to a specific VLAN). If you only set the VLAN without setting mode access, the port may still negotiate as a trunk via DTP — always configure both commands. If you assign a VLAN that does not exist on the switch, the switch will create it automatically.</p><p><strong>Voice VLANs</strong> add a special capability to access ports for IP phones. A typical office deployment has a PC connected to an IP phone, which is daisy-chained to the switch port. The switch port carries <strong>two VLANs simultaneously</strong>: the <strong>data VLAN</strong> (for the PC, untagged) and the <strong>voice VLAN</strong> (for the phone, tagged with 802.1Q). The IP phone is a mini-switch — it tags its own voice traffic with the voice VLAN ID and passes the PC's untagged data traffic through. Configuration: <code>switchport access vlan 10</code> (data), <code>switchport voice vlan 20</code> (voice). The phone learns its VLAN from CDP or LLDP messages from the switch.</p><p>VLAN concepts to remember: A VLAN is a <strong>logical broadcast domain</strong> — devices in the same VLAN can communicate at Layer 2; devices in different VLANs cannot without Layer 3 routing. VLANs range from <strong>1 to 4094</strong> (12-bit VLAN ID). VLAN 1 is the default (all ports start in VLAN 1). VLANs 1002-1005 are reserved for legacy Token Ring/FDDI. VLANs are created on a switch with <code>vlan [id]</code> in global config, optionally named with <code>name [text]</code>.</p><p><strong>Key verification commands:</strong> <code>show vlan brief</code> (which ports are in which VLAN), <code>show interfaces switchport</code> (port mode, access VLAN, voice VLAN), <code>show interfaces [port] switchport</code> (specific port details), <code>show vlan id [id]</code> (specific VLAN info).</p>",
    visual: {
      type: "comparison",
      params: {
        left: { label: "Data Access Port", items: ["switchport mode access", "switchport access vlan 10", "One VLAN only", "Connects to PC/printer"] },
        right: { label: "Voice + Data Port", items: ["switchport mode access", "switchport access vlan 10", "switchport voice vlan 20", "Phone + PC on same port"] }
      }
    },
    hack: {
      memory: "Access port = 'one-lane road, one neighborhood (VLAN).' The three-command recipe: (1) <code>switchport mode access</code>, (2) <code>switchport access vlan 10</code>, (3) <code>switchport voice vlan 20</code> (only if phone is connected). Voice VLAN mental model: the IP phone is a mini-switch — it tags voice packets with VLAN 20, passes PC data untagged on VLAN 10. The phone learns its VLAN from CDP. Key fact: if you don't set mode access, DTP might negotiate a trunk — always set it explicitly.",
      practice: "Packet Tracer lab (Jeremy's IT Lab Days 16-17): Create VLANs 10 (Sales) and 20 (Engineering) on a switch: <code>vlan 10</code>, <code>name Sales</code>, <code>vlan 20</code>, <code>name Engineering</code>. Assign ports: Gi0/1 to VLAN 10 (<code>switchport mode access</code>, <code>switchport access vlan 10</code>), Gi0/2 to VLAN 20. Connect PCs and verify with <code>show vlan brief</code> — PCs should only ping within their VLAN. Then add a voice VLAN: on Gi0/1, add <code>switchport voice vlan 30</code>. Verify with <code>show interfaces Gi0/1 switchport</code> — you should see both Access VLAN 10 and Voice VLAN 30. This is a high-priority lab for exam simlets.",
      effort: "high",
      meta: "Jeremy's IT Lab Days 16-17 (VLANs) are the definitive resource. Wendell Odom OCG Chapter 8 covers VLAN configuration in detail. The exam tests VLAN configuration in simlets — expect to configure access ports, assign VLANs, and optionally add voice VLANs. Know the three commands cold. Also know that <code>show vlan brief</code> only shows access port VLAN assignments — trunk ports do NOT appear in this output (a common exam trick)."
    }
  },

  "2.1.b": {
    info: "<p><strong>VLAN 1</strong> is the <strong>default VLAN</strong> on every Cisco switch — all ports are assigned to VLAN 1 out of the box. It is also the <strong>default native VLAN</strong> on all 802.1Q trunk links. VLAN 1 has special properties that make it both necessary and a security risk.</p><p><strong>Why VLAN 1 is special:</strong> Several control-plane protocols are hardcoded to operate on VLAN 1 regardless of configuration: <strong>CDP</strong> (Cisco Discovery Protocol), <strong>VTP</strong> (VLAN Trunking Protocol), <strong>PAgP</strong> (Port Aggregation Protocol), and <strong>STP BPDUs</strong> for VLAN 1. You <strong>cannot delete VLAN 1</strong> — attempting <code>no vlan 1</code> produces an error. You can remove all user ports from VLAN 1, but the VLAN itself always exists in the VLAN database.</p><p><strong>Security best practice:</strong> Do NOT use VLAN 1 for production user traffic. The rationale: because VLAN 1 is the default everywhere and carries control-plane traffic, leaving user data on VLAN 1 increases the attack surface. An attacker who gains access to VLAN 1 may be able to interact with management protocols. Best practices include: (1) <strong>Move all user/access ports to non-default VLANs</strong> (e.g., VLAN 10 for Sales, VLAN 20 for Engineering). (2) <strong>Change the native VLAN on trunks</strong> away from VLAN 1 to prevent <strong>VLAN hopping attacks</strong> (double-tagging attack exploits the native VLAN). (3) <strong>Create a dedicated management VLAN</strong> (e.g., VLAN 99) for switch management traffic and SVI. (4) <strong>Shut down unused ports</strong> and assign them to a 'parking lot' VLAN (e.g., VLAN 999) that has no routing — a device plugged into an unused port gets no network access.</p><p>The <strong>management VLAN</strong> is whichever VLAN hosts the switch's SVI (Switch Virtual Interface) used for remote management (SSH/Telnet). By default this is VLAN 1, but best practice is to create a separate management VLAN. Configuration: <code>interface vlan 99</code>, <code>ip address 10.0.99.1 255.255.255.0</code>, <code>no shutdown</code>. Then set the default gateway: <code>ip default-gateway 10.0.99.254</code> (on L2 switches) or configure a default route (on L3 switches).</p><p><strong>Exam trap:</strong> 'Which VLAN cannot be deleted?' — VLAN 1. 'What is the default native VLAN?' — VLAN 1. 'Should you use VLAN 1 for user traffic?' — No.</p>",
    visual: {
      type: "shield",
      params: {
        items: ["All ports start in VLAN 1", "Default native VLAN on trunks", "Cannot be deleted", "Best practice: don't use it for production"],
        color: "#f59e0b"
      }
    },
    hack: {
      memory: "VLAN 1 = 'the default apartment everyone's assigned to — noisy with management traffic.' Four best practices: (1) Move users OUT of VLAN 1. (2) Change native VLAN on trunks AWAY from 1 (prevents double-tagging). (3) Create a separate management VLAN (e.g., 99). (4) Put unused ports in a dead VLAN (e.g., 999, no routing). Mnemonic: 'VLAN 1 Cannot Be Deleted' — it is permanent, hardcoded for CDP/VTP/STP. Exam mantra: 'Never use VLAN 1 for production; never leave unused ports in VLAN 1.'",
      practice: "Packet Tracer lab (Jeremy's IT Lab Days 16-17): Start with a fresh switch. Run <code>show vlan brief</code> — all ports are in VLAN 1. Create VLANs 10, 20, and 99 (management). Move user ports to VLANs 10 and 20. Create SVI for management: <code>interface vlan 99</code>, <code>ip address 10.0.99.1 255.255.255.0</code>. Shut down all unused ports and assign them to VLAN 999 (parking lot). Verify with <code>show vlan brief</code> — VLAN 1 should have no user ports. Then try <code>no vlan 1</code> — observe the error. This lab teaches VLAN 1 hardening, which is a key exam and real-world skill.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 16-17 covers VLAN 1 best practices. Wendell Odom OCG Chapter 8 discusses default VLAN behavior and security implications. The exam asks: 'which VLAN cannot be deleted?' (1), 'what is the default native VLAN?' (1), 'which VLAN should NOT be used for user traffic?' (1). Also expect a scenario question about VLAN hopping — the mitigation is to change the native VLAN on trunks. Know these cold."
    }
  },

  "2.1.c": {
    info: "<p>Devices in different VLANs are in <strong>different broadcast domains</strong> and <strong>cannot communicate at Layer 2</strong>. For cross-VLAN communication, traffic must be <strong>routed at Layer 3</strong> — this is called <strong>inter-VLAN routing</strong>. A Layer 3 device (router or L3 switch) receives the frame from VLAN A, makes a routing decision based on the destination IP, and forwards it into VLAN B. Without a Layer 3 device, VLANs are isolated islands.</p><p><strong>Method 1: Router-on-a-Stick (ROAS)</strong> — This is the most exam-tested method. A single router interface connects to the switch via a <strong>trunk link</strong>. The router creates <strong>subinterfaces</strong> (e.g., Gi0/0.10, Gi0/0.20) — each subinterface is assigned to a VLAN using <code>encapsulation dot1q [vlan-id]</code> and given an IP address that serves as the <strong>default gateway</strong> for that VLAN. Configuration example: <code>interface Gi0/0.10</code>, <code>encapsulation dot1q 10</code>, <code>ip address 10.0.10.1 255.255.255.0</code>. The physical interface (Gi0/0) must be <code>no shutdown</code> but typically has no IP address itself. The switch side needs a trunk port allowing VLANs 10 and 20.</p><p><strong>Method 2: L3 Switch with SVIs</strong> — The modern and most common approach. A Layer 3 switch creates <strong>SVIs (Switch Virtual Interfaces)</strong> — virtual interfaces assigned to VLANs. Example: <code>interface vlan 10</code>, <code>ip address 10.0.10.1 255.255.255.0</code>. The <code>ip routing</code> command must be enabled globally on the L3 switch for routing to work. SVIs route traffic between VLANs <strong>in hardware at wire speed</strong> using ASICs, making this method faster than router-on-a-stick (which routes in software on the router CPU). This is the preferred method for enterprise campus networks.</p><p><strong>Method 3: Separate Physical Interfaces</strong> — Each VLAN connects to a separate physical router interface. This is the simplest conceptually but wastes router ports and doesn't scale. One router port per VLAN = expensive and impractical for more than 2-3 VLANs. This method is mostly obsolete and rarely tested.</p><p><strong>Key comparison:</strong> ROAS = one trunk link, subinterfaces, router CPU-based (slower), works with any router + L2 switch. L3 Switch SVIs = no external router needed, hardware-based routing (faster), requires an L3-capable switch (e.g., Catalyst 3560, 3650, 3850, 9300). The exam expects you to configure both methods.</p>",
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
      memory: "Three methods ranked by exam importance: (1) ROAS = Router-On-A-Stick (trunk + subinterfaces + <code>encapsulation dot1q</code>). (2) L3 Switch = SVIs + <code>ip routing</code>. (3) Physical = one port per VLAN (obsolete). Mnemonic for ROAS config: 'SENA' = Subinterface → Encapsulation dot1q → No shutdown (parent) → Address (IP on subinterface). For L3 Switch: 'VIA' = VLAN interface → IP address → (globally enable) <code>ip routing</code>. Remember: ROAS uses a TRUNK to the switch. L3 switch uses ACCESS ports to hosts + internal SVIs.",
      practice: "Packet Tracer lab (Jeremy's IT Lab Days 17-18 — lab this MULTIPLE times): <strong>ROAS Lab:</strong> Create VLANs 10 and 20 on an L2 switch. Configure a trunk to a router. On the router: <code>interface Gi0/0.10</code>, <code>encapsulation dot1q 10</code>, <code>ip address 10.0.10.1 255.255.255.0</code>. Repeat for Gi0/0.20 with VLAN 20 subnet. Set PCs' default gateways to their VLAN's subinterface IP. Ping across VLANs. <strong>L3 Switch Lab:</strong> On a 3560/3650: create VLANs 10 and 20, assign access ports, create SVIs (<code>interface vlan 10</code>, <code>ip address 10.0.10.1 255.255.255.0</code>), enable <code>ip routing</code>. Ping across VLANs. Verify both with <code>show ip route</code> — you should see connected routes for each VLAN subnet.",
      effort: "high",
      meta: "Jeremy's IT Lab Days 17-18 (VLANs and Inter-VLAN Routing) are essential viewing. Wendell Odom OCG Chapters 8-9 cover VLAN routing methods. Inter-VLAN routing is one of the <strong>most heavily tested topics</strong> on the CCNA — expect at least one simlet requiring ROAS or SVI configuration. Lab both methods until you can configure them from memory without referencing notes. Know the <code>encapsulation dot1q</code> command and that <code>ip routing</code> is required on L3 switches."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     2.2 — Configure and verify interswitch connectivity
  ══════════════════════════════════════════════════════════════ */

  "2.2.a": {
    info: "<p><strong>Trunk ports</strong> carry traffic for <strong>multiple VLANs simultaneously</strong> between switches, between a switch and a router (ROAS), or between a switch and a WLC. Unlike access ports (which carry one VLAN), trunks use <strong>802.1Q tagging</strong> to identify which VLAN each frame belongs to. When a frame travels across a trunk, a 4-byte 802.1Q tag is inserted into the frame header containing the VLAN ID. The receiving switch reads the tag, processes the frame in the correct VLAN, and removes the tag when sending it out an access port.</p><p><strong>Trunk configuration commands:</strong> <code>switchport mode trunk</code> (forces the port into trunk mode), <code>switchport trunk encapsulation dot1q</code> (required on some older switch models that support both ISL and 802.1Q — modern switches default to dot1q), <code>switchport trunk allowed vlan [list]</code> (restricts which VLANs are carried on the trunk — security best practice: only allow VLANs that need to traverse the link), <code>switchport trunk native vlan [id]</code> (sets the native VLAN — covered in 2.2.c).</p><p><strong>DTP (Dynamic Trunking Protocol)</strong> is Cisco's proprietary protocol that automatically negotiates trunk links between switches. DTP modes: <strong>dynamic desirable</strong> (actively tries to form a trunk — default on older switches), <strong>dynamic auto</strong> (forms a trunk only if the other side initiates — default on newer switches), and <strong>trunk</strong> (forced trunk, still sends DTP frames). <strong>Best practice: manually configure trunks</strong> with <code>switchport mode trunk</code> and disable DTP with <code>switchport nonegotiate</code>. DTP is a security risk — an attacker can negotiate a trunk to a rogue switch and access all VLANs. DTP negotiation matrix: desirable+desirable=trunk, desirable+auto=trunk, auto+auto=NO trunk, trunk+desirable=trunk, trunk+auto=trunk.</p><p><strong>Allowed VLANs on trunk:</strong> By default, a trunk carries <strong>all VLANs (1-4094)</strong>. This is wasteful and a security risk — only VLANs that actually exist on both ends should traverse the trunk. Use <code>switchport trunk allowed vlan 10,20,30</code> to explicitly allow only needed VLANs. You can add VLANs with <code>switchport trunk allowed vlan add [id]</code> or remove with <code>switchport trunk allowed vlan remove [id]</code>.</p><p><strong>Key verification:</strong> <code>show interfaces trunk</code> (shows all trunk ports, mode, encapsulation, native VLAN, and allowed/active VLANs), <code>show interfaces [port] switchport</code> (detailed trunk info for one port), <code>show vlan brief</code> (note: trunk ports do NOT appear in this output — only access ports are listed).</p>",
    visual: { type: "packet-flow", params: { nodes: ["Switch A (VLANs 10,20,30)", "Trunk Link (tagged)", "Switch B (VLANs 10,20,30)"], color: "#3b82f6" } },
    hack: {
      memory: "Trunk = 'highway with VLAN lane markers (802.1Q tags).' Access port = 'single-lane residential road.' Config recipe: 'MNA' = Mode trunk, Nonegotiate, Allowed vlan list. DTP is dangerous — always disable with <code>switchport nonegotiate</code>. DTP modes: desirable = 'I want a trunk,' auto = 'only if you ask,' trunk = 'forced but still talks DTP,' nonegotiate = 'silent trunk.' Key trap: <code>show vlan brief</code> does NOT show trunk ports — use <code>show interfaces trunk</code> instead.",
      practice: "Packet Tracer lab (Jeremy's IT Lab Day 17): Connect two switches with a trunk link. On both sides: <code>switchport mode trunk</code>, <code>switchport nonegotiate</code>, <code>switchport trunk allowed vlan 10,20,30</code>. Create VLANs 10, 20, 30 on both switches. Assign access ports to each VLAN. Connect PCs and verify they can ping within their VLAN across switches. Verify with <code>show interfaces trunk</code> — check the 'Vlans allowed' and 'Vlans allowed and active' columns. Then intentionally forget to create VLAN 20 on one switch and observe that VLAN 20 traffic fails (VLAN must exist on both ends). Also try the DTP trap: set both sides to 'dynamic auto' — observe that NO trunk forms (auto-auto = access mode).",
      effort: "high",
      meta: "Jeremy's IT Lab Day 17 covers trunk configuration and DTP. Wendell Odom OCG Chapter 8-9 details trunk operation and best practices. Trunk configuration appears in exam simlets — expect to configure mode, allowed VLANs, and native VLAN. Know <code>show interfaces trunk</code> inside out. The DTP nonegotiate best practice is tested: 'how do you prevent unauthorized trunk formation?' = <code>switchport mode access</code> on user ports + <code>switchport nonegotiate</code> on trunk ports."
    }
  },

  "2.2.b": {
    info: "<p><strong>802.1Q</strong> (often called 'dot1q') is the <strong>IEEE standard for VLAN tagging</strong> on trunk links. It is the only trunking encapsulation method relevant to the CCNA — Cisco's proprietary ISL (Inter-Switch Link) is obsolete and no longer tested. Every modern Cisco switch uses 802.1Q exclusively.</p><p>802.1Q works by <strong>inserting a 4-byte tag</strong> into the Ethernet frame between the Source MAC address field and the EtherType/Length field. This tag contains: <strong>TPID (Tag Protocol Identifier)</strong> — 2 bytes, value 0x8100 (identifies the frame as 802.1Q-tagged), <strong>PCP (Priority Code Point)</strong> — 3 bits for QoS/CoS (Class of Service) priority (values 0-7, higher = more priority), <strong>DEI (Drop Eligible Indicator)</strong> — 1 bit (indicates frames that can be dropped during congestion), and <strong>VLAN ID (VID)</strong> — 12 bits identifying the VLAN (values 0-4095, with 0 and 4095 reserved, giving usable range 1-4094).</p><p>Because the 802.1Q tag adds 4 bytes to the frame, the maximum frame size increases from <strong>1518 bytes</strong> (standard Ethernet) to <strong>1522 bytes</strong> (tagged Ethernet). This is important: a 1522-byte frame on a trunk port is NOT a giant/jumbo frame — it is a valid tagged frame. Switches and routers are aware of this and handle it correctly. However, if a tagged frame arrives at a device that does not understand 802.1Q, it may be dropped as oversized.</p><p>802.1Q is an <strong>internal tagging</strong> method — the tag is inserted into the existing frame (modifying it). ISL was an <strong>external encapsulation</strong> method — it wrapped the entire original frame in a new ISL header and trailer (adding 26 bytes). This difference is academic for the exam since ISL is dead, but it explains why 802.1Q won — less overhead, open standard, universally supported.</p><p><strong>Exam key points:</strong> 802.1Q = IEEE standard, 4-byte tag, 12-bit VLAN ID (4094 VLANs), inserted between source MAC and EtherType, includes 3-bit QoS priority. ISL = Cisco proprietary, obsolete, not on the exam.</p>",
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
      memory: "802.1Q = 'the VLAN sticker' inserted into every frame on a trunk. Key numbers: <strong>4 bytes</strong> (tag size), <strong>12 bits</strong> (VLAN ID field), <strong>4094</strong> usable VLANs. The tag goes between Source MAC and EtherType — mnemonic: 'Source MAC → Sticker → EtherType' (the sticker is in the middle). 802.1Q makes frames <strong>1522 bytes max</strong> (1518 + 4-byte tag) — this is NOT a giant frame on a trunk. PCP field: 3 bits for QoS priority (0-7). ISL = dead, forget it.",
      practice: "Packet Tracer lab (Jeremy's IT Lab Day 17): After configuring trunks, draw the 802.1Q frame format from memory: Dest MAC (6B) → Src MAC (6B) → 802.1Q Tag (4B: TPID + PCP + DEI + VID) → EtherType (2B) → Payload (46-1500B) → FCS (4B). Label each field. Create a flashcard with the key numbers: 4-byte tag, 12-bit VID, 4094 VLANs, 3-bit PCP, 1522-byte max tagged frame. This is pure memorization — drill the numbers until automatic. Also know: <code>encapsulation dot1q [vlan-id]</code> is the command used on router subinterfaces for ROAS.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 17 covers 802.1Q tagging. Wendell Odom OCG Chapter 8 details the tag format. The exam tests exact numbers: 'how many VLANs does 802.1Q support?' (4094), 'how many bytes does the tag add?' (4), 'what is the maximum frame size with an 802.1Q tag?' (1522). Also know: 'which field in the 802.1Q tag is used for QoS?' (PCP/CoS — 3 bits). These are quick-win memorization points."
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
