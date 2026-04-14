/**
 * netplus-study-content.js — Study content for all 25 CompTIA Network+ N10-009 objectives.
 * Each entry: title, summary, keyPoints[], commands[], memoryTip, examTip
 */
window.npStudyContent = {

  /* ══════════════════════════════════════════════════════════════
     DOMAIN 1 — NETWORKING CONCEPTS (24%)
  ══════════════════════════════════════════════════════════════ */

  "1.1": {
    title: "OSI and TCP/IP Models",
    summary: "The OSI model is a 7-layer conceptual framework for understanding how data moves across a network. The TCP/IP model is the practical 4-layer model that maps to real protocols. CompTIA expects you to identify which layer a given protocol, device, or PDU operates at.",
    keyPoints: [
      "Layer 1 (Physical): Bits on the wire — cables, connectors, hubs, repeaters, voltages, light signals, encoding schemes",
      "Layer 2 (Data Link): Frames — MAC addressing, switches, bridges, ARP, error detection (CRC/FCS), LLC and MAC sublayers",
      "Layer 3 (Network): Packets — IP addressing, routing, ICMP, fragmentation, TTL, logical addressing",
      "Layer 4 (Transport): Segments/datagrams — TCP (reliable, 3-way handshake, flow control, windowing) and UDP (connectionless, best-effort)",
      "Layer 5 (Session): Establishes, manages, and tears down sessions — NetBIOS, RPC, PPTP session setup",
      "Layer 6 (Presentation): Data formatting, encryption/decryption, compression — SSL/TLS encryption, JPEG, ASCII, EBCDIC",
      "Layer 7 (Application): End-user protocols — HTTP, FTP, SMTP, DNS, DHCP, SNMP, SSH, Telnet",
      "TCP/IP model maps: Network Access (L1-L2), Internet (L3), Transport (L4), Application (L5-L7)"
    ],
    commands: [
      { cmd: "ping 8.8.8.8", desc: "Test Layer 3 IP connectivity to a remote host" },
      { cmd: "arp -a", desc: "View the ARP cache — maps IP addresses to MAC addresses (Layer 2/3 boundary)" },
      { cmd: "traceroute 8.8.8.8", desc: "Trace the Layer 3 path (each router hop) to a destination" },
      { cmd: "netstat -an", desc: "Show active Layer 4 connections — TCP/UDP ports, states, addresses" }
    ],
    memoryTip: "Please Do Not Throw Sausage Pizza Away — Physical, Data Link, Network, Transport, Session, Presentation, Application. For PDU names going up: Bits, Frames, Packets, Segments, Data.",
    examTip: "CompTIA loves asking which layer a protocol operates at. Know: ARP = Layer 2, IP/ICMP = Layer 3, TCP/UDP = Layer 4, HTTP/DNS/DHCP = Layer 7. Also know PDU names per layer — a question about 'frames' means Layer 2."
  },

  "1.2": {
    title: "Network Topologies and Types",
    summary: "Network topologies describe the physical and logical layout of devices. Network types define scope (LAN, WAN, MAN, etc.). Understanding these is foundational — they determine performance, fault tolerance, and scalability of any network design.",
    keyPoints: [
      "Star topology: All devices connect to a central switch/hub — most common in LANs, single point of failure at the center device",
      "Mesh topology: Every device connects to every other device — full mesh (n*(n-1)/2 links) or partial mesh; used in WANs and wireless",
      "Bus topology: Single shared cable, devices tap in — legacy (10BASE2/10BASE5), single collision domain, one cable break kills the network",
      "Ring topology: Devices form a loop — token passing (Token Ring/FDDI), dual ring adds redundancy, used in SONET/SDH WANs",
      "Hybrid topology: Combination of two or more topologies — star-bus, star-ring; most real-world networks are hybrids",
      "LAN: Local area network, single building/campus. WAN: Wide area, connects geographically separated sites. MAN: Metropolitan area, city-scale",
      "PAN: Personal area (Bluetooth, ~10m). CAN: Campus area. SAN: Storage area network (Fibre Channel/iSCSI). WLAN: Wireless LAN (802.11)",
      "Peer-to-peer vs. client-server: P2P = each device is both client and server; client-server = centralized resources and management"
    ],
    commands: [
      { cmd: "ipconfig /all", desc: "Display full IP configuration including DHCP server, gateway, DNS — reveals network type context" },
      { cmd: "arp -a", desc: "View all discovered devices on the local network segment" },
      { cmd: "net view", desc: "List devices visible on the local network (Windows peer-to-peer)" }
    ],
    memoryTip: "Star = spider web with a center. Mesh = everyone knows everyone (like a friend group chat). Bus = a single highway with exits. Ring = a relay race — pass the baton.",
    examTip: "Know the difference between physical and logical topologies. A network can be physically wired as a star but logically operate as a ring (Token Ring over star wiring). Also know that full mesh link count = n*(n-1)/2."
  },

  "1.3": {
    title: "Cable Types and Connectors",
    summary: "Cables are the physical layer foundation. CompTIA tests specific cable types, maximum distances, connector types, and use cases. Knowing copper vs. fiber, shielded vs. unshielded, and which standard fits which scenario is critical.",
    keyPoints: [
      "Cat 5e: 1 Gbps at 100m. Cat 6: 1 Gbps at 100m (10 Gbps at 55m). Cat 6a: 10 Gbps at 100m. Cat 7: 10 Gbps shielded. Cat 8: 25/40 Gbps at 30m",
      "UTP (Unshielded Twisted Pair): Most common, susceptible to EMI. STP (Shielded): Better EMI resistance, used near interference sources",
      "Straight-through cable: Like devices to unlike (PC to switch). Crossover cable: Like to like (switch to switch, PC to PC). Auto-MDI-X makes this automatic on modern equipment",
      "Fiber: Single-mode (SMF) = long distance (up to 80+ km), 9-micron core, yellow jacket. Multimode (MMF) = short distance (up to 2 km), 50/62.5-micron core, orange/aqua jacket",
      "Fiber connectors: SC (square/subscriber), LC (small form-factor, most common), ST (straight tip, bayonet), MTRJ (duplex), MPO/MTP (high-density multi-fiber)",
      "Coaxial: RG-6 (cable TV, broadband), RG-59 (legacy CCTV). Connectors: F-type (cable), BNC (legacy networking/video). Twinax for 10GbE DAC short runs",
      "Plenum-rated cable: Fire-retardant jacket for air-handling spaces (above drop ceilings). Required by fire code in those areas",
      "T568A vs T568B: Wiring standards for RJ45 terminations. T568B is more common in the US. A crossover uses T568A on one end and T568B on the other"
    ],
    commands: [
      { cmd: "ethtool eth0", desc: "Linux — show link speed, duplex, and cable status on an interface" },
      { cmd: "ipconfig /all", desc: "Verify link speed and adapter type to infer cable capability" },
      { cmd: "mii-tool eth0", desc: "Linux — check media type and link status for Ethernet interfaces" }
    ],
    memoryTip: "For fiber: Single-mode = Single laser = Super far (yellow = caution, long road ahead). Multimode = Multiple light paths = Medium distance (orange = short and warm). LC = Little Connector, SC = Square Connector.",
    examTip: "Memorize Cat cable speeds and distances — especially Cat 5e (1G/100m), Cat 6 (10G/55m), Cat 6a (10G/100m). Know that single-mode fiber uses a laser and goes farther than multimode which uses LED. Plenum cable is always the answer when they mention air ducts or drop ceilings."
  },

  "1.4": {
    title: "IP Addressing and Subnetting",
    summary: "IP addressing is the backbone of Layer 3 communication. IPv4 uses 32-bit addresses, IPv6 uses 128-bit. Subnetting divides networks into smaller segments for efficiency and security. This objective is math-heavy and appears frequently on the exam.",
    keyPoints: [
      "IPv4 classes: A = 1-126 (/8, 16M hosts), B = 128-191 (/16, 65K hosts), C = 192-223 (/24, 254 hosts). 127.x.x.x = loopback",
      "Private ranges (RFC 1918): 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. APIPA: 169.254.0.0/16 (link-local, auto-assigned when DHCP fails)",
      "Subnetting formula: Hosts per subnet = 2^(host bits) - 2 (subtract network and broadcast). Subnets = 2^(borrowed bits)",
      "CIDR notation: /24 = 255.255.255.0, /25 = 128 addresses (126 hosts), /26 = 64 addresses (62 hosts), /27 = 32 (30 hosts), /28 = 16 (14 hosts), /30 = 4 (2 hosts, point-to-point links)",
      "VLSM (Variable Length Subnet Masking): Allows different subnets to have different sizes — allocate largest subnets first, then smaller ones",
      "IPv6: 128-bit, written in 8 groups of 4 hex digits (2001:0db8::1). Link-local = fe80::/10, Global unicast = 2000::/3, Multicast = ff00::/8, Loopback = ::1",
      "IPv6 address types: Unicast (one-to-one), Multicast (one-to-many), Anycast (one-to-nearest). No broadcast in IPv6 — replaced by multicast",
      "IPv4 to IPv6 transition: Dual stack (both protocols), Tunneling (6to4, Teredo, ISATAP), NAT64 (translates between v4 and v6)"
    ],
    commands: [
      { cmd: "ipconfig", desc: "Windows — display IP address, subnet mask, and default gateway" },
      { cmd: "ip addr show", desc: "Linux — display all interface IP addresses including IPv6" },
      { cmd: "ipcalc 192.168.1.0/26", desc: "Calculate network/broadcast addresses, host range, and subnet details" },
      { cmd: "ping ::1", desc: "Test IPv6 loopback connectivity" }
    ],
    memoryTip: "Subnetting magic numbers: /25=128, /26=64, /27=32, /28=16, /29=8, /30=4. The block size is 256 minus the subnet mask octet value. For IPv6: think of fe80 as 'FEeling local' — link-local addresses always start with fe80.",
    examTip: "You WILL get subnetting questions. Practice until you can subnet /24 through /30 in your head. Know that a /30 gives 2 usable hosts (perfect for point-to-point links). For IPv6, remember there is NO broadcast — only unicast, multicast, and anycast."
  },

  "1.5": {
    title: "Common Ports and Protocols",
    summary: "Protocols define the rules for communication, and ports identify specific services. CompTIA expects you to know the protocol name, port number, TCP vs UDP, and whether it is encrypted or not. This is one of the most heavily tested objectives.",
    keyPoints: [
      "FTP: TCP 20 (data) / 21 (control). SFTP: TCP 22. TFTP: UDP 69. SCP: TCP 22 — know which are secure and which are not",
      "SSH: TCP 22 (secure remote access). Telnet: TCP 23 (insecure, cleartext). RDP: TCP 3389. VNC: TCP 5900",
      "HTTP: TCP 80. HTTPS: TCP 443. DNS: UDP/TCP 53 (UDP for queries, TCP for zone transfers). DHCP: UDP 67 (server) / 68 (client)",
      "SMTP: TCP 25 (unencrypted) / 587 (TLS submission). POP3: TCP 110 / 995 (SSL). IMAP: TCP 143 / 993 (SSL)",
      "SNMP: UDP 161 (polling) / 162 (traps). Syslog: UDP 514. NTP: UDP 123. LDAP: TCP 389. LDAPS: TCP 636",
      "SMB/CIFS: TCP 445. NetBIOS: TCP/UDP 137-139. MySQL: TCP 3306. SQL Server: TCP 1433. PostgreSQL: TCP 5432",
      "RADIUS: UDP 1812 (auth) / 1813 (accounting). TACACS+: TCP 49. Kerberos: UDP/TCP 88. SIP: TCP/UDP 5060 / 5061 (TLS)",
      "Well-known ports: 0-1023. Registered ports: 1024-49151. Ephemeral/dynamic ports: 49152-65535"
    ],
    commands: [
      { cmd: "netstat -tulnp", desc: "Linux — list all listening TCP/UDP ports with process names" },
      { cmd: "ss -tulnp", desc: "Linux — modern replacement for netstat, shows listening sockets" },
      { cmd: "nmap -sV 192.168.1.1", desc: "Scan a host to discover open ports and service versions" },
      { cmd: "netstat -an | findstr LISTENING", desc: "Windows — show all ports in LISTENING state" }
    ],
    memoryTip: "Group by security: Insecure → Secure pairs: Telnet (23) → SSH (22), HTTP (80) → HTTPS (443), FTP (21) → SFTP (22), SNMP v1/v2c → v3, LDAP (389) → LDAPS (636), IMAP (143) → IMAPS (993), POP3 (110) → POP3S (995).",
    examTip: "Memorize all ports listed above — you will see 5-8 port questions on the exam. Pay special attention to which protocols use TCP vs UDP (DNS uses both, DHCP is UDP-only, TACACS+ is TCP). Know the secure version of every insecure protocol."
  },

  "1.6": {
    title: "Network Services and Applications",
    summary: "Network services like DHCP, DNS, NAT, and NTP are the backbone infrastructure that makes networking usable. Understanding how these services work, interact, and can fail is essential for both the exam and real-world troubleshooting.",
    keyPoints: [
      "DHCP process (DORA): Discover (broadcast) → Offer (server responds) → Request (client accepts) → Acknowledge (server confirms). Lease-based, auto-renews at 50% of lease time",
      "DHCP relay (ip helper-address): Forwards DHCP broadcasts across subnets to a centralized DHCP server. Without it, DHCP only works on the local subnet",
      "DNS: Resolves hostnames to IPs. Record types: A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), PTR (reverse), NS (nameserver), SOA (zone authority), TXT (SPF/DKIM/DMARC), SRV (service locator)",
      "DNS hierarchy: Root servers → TLD (.com, .org) → Authoritative → Recursive resolver. TTL controls caching duration",
      "NAT types: Static NAT (1:1 mapping), Dynamic NAT (pool of public IPs), PAT/NAT overload (many-to-one using port numbers — most common in home/SOHO)",
      "NTP: Synchronizes clocks across network devices. Stratum 0 = atomic clock, Stratum 1 = directly connected server, Stratum 2+ = syncs from upstream. Critical for logging, authentication, and certificates",
      "IPAM: IP Address Management — tracks and manages IP allocations, prevents conflicts, integrates with DHCP/DNS",
      "Proxy server types: Forward proxy (client-side, anonymity/filtering), Reverse proxy (server-side, load balancing/SSL termination/caching)"
    ],
    commands: [
      { cmd: "nslookup example.com", desc: "Query DNS to resolve a hostname to its IP address" },
      { cmd: "dig example.com MX", desc: "Query DNS for specific record types (MX, A, AAAA, CNAME, TXT)" },
      { cmd: "ipconfig /release && ipconfig /renew", desc: "Release and renew DHCP lease on Windows" },
      { cmd: "ntpq -p", desc: "Show NTP peers and synchronization status on Linux" }
    ],
    memoryTip: "DHCP DORA = Discover, Offer, Request, Acknowledge — think 'Dora the Explorer discovers an IP address.' For DNS records: A = Address (IPv4), AAAA = bigger Address (IPv6), MX = Mail eXchange, PTR = PoinTeR (reverse).",
    examTip: "Know the DORA process cold — CompTIA asks about each step. For DNS, memorize all record types and what they do. NAT overload (PAT) is the most common form and uses port numbers to track connections. If a question says 'users can browse the internet but only one public IP exists' — the answer is PAT."
  },

  "1.7": {
    title: "Corporate Network Architecture",
    summary: "Enterprise networks are designed in tiers for scalability and manageability. Understanding the three-tier model, spine-leaf, software-defined networking, and cloud/hybrid architectures is key for designing and discussing modern infrastructure.",
    keyPoints: [
      "Three-tier model: Access layer (user ports, switches) → Distribution layer (routing, policy, VLAN aggregation) → Core layer (high-speed backbone, no filtering)",
      "Two-tier (collapsed core): Access + Distribution/Core combined — suitable for smaller campuses with fewer than a few hundred users",
      "Spine-leaf architecture: Every leaf switch connects to every spine switch. No leaf-to-leaf or spine-to-spine links. Equal-cost paths, predictable latency. Standard in data centers",
      "SDN (Software-Defined Networking): Separates control plane (decisions) from data plane (forwarding). Centralized controller (like OpenFlow) programs switches. Enables automation and programmability",
      "SD-WAN: Software-defined WAN — centrally manages WAN connections (MPLS, broadband, LTE), intelligent path selection, encrypted overlays, reduces cost vs. pure MPLS",
      "Cloud models: IaaS (infrastructure — VMs, storage), PaaS (platform — app hosting), SaaS (software — Gmail, O365). Know the shared responsibility boundaries",
      "Network functions: Traffic shaping (bandwidth management), load balancing (distributes traffic across servers), Quality of Service (QoS) prioritizes traffic types",
      "Colocation vs. branch office: Colo = your gear in someone else's data center. Branch = remote office connected via WAN/VPN to HQ"
    ],
    commands: [
      { cmd: "traceroute 10.0.0.1", desc: "Observe the path through network tiers — access to distribution to core" },
      { cmd: "curl -I https://example.com", desc: "Check HTTP headers — reveals load balancer, CDN, or reverse proxy presence" },
      { cmd: "mtr 8.8.8.8", desc: "Combines ping and traceroute for real-time path and latency analysis" }
    ],
    memoryTip: "Three-tier = three floors of a building: Ground floor (Access — lobby, everyone enters), Middle floor (Distribution — security checks, routing decisions), Top floor (Core — express elevator, speed only). Spine-leaf = spider web: every edge touches every rib.",
    examTip: "Know when to use three-tier vs. spine-leaf: three-tier for campus/enterprise, spine-leaf for data centers. SDN questions focus on the separation of control plane and data plane. For cloud, remember: IaaS = you manage the OS up, PaaS = you manage the app, SaaS = you manage nothing."
  },

  "1.8": {
    title: "Cloud and Virtualization Concepts",
    summary: "Cloud computing and virtualization abstract physical resources into flexible, scalable services. CompTIA tests deployment models, service models, and how virtual networking components (vSwitch, NFV, hypervisors) integrate with physical infrastructure.",
    keyPoints: [
      "Deployment models: Public cloud (AWS, Azure, GCP — shared infrastructure), Private cloud (dedicated to one org), Hybrid cloud (mix of public/private), Community cloud (shared by organizations with common needs)",
      "Hypervisors: Type 1 (bare-metal — ESXi, Hyper-V, KVM, Xen) runs on hardware directly. Type 2 (hosted — VirtualBox, VMware Workstation) runs on top of an OS",
      "Virtual networking: vSwitch (virtual switch inside hypervisor), vNIC (virtual NIC assigned to VMs), NFV (Network Functions Virtualization — firewalls, load balancers as VMs instead of hardware)",
      "VPC (Virtual Private Cloud): Isolated network segment in a public cloud. Has its own subnets, route tables, and security groups. Like a private LAN in the cloud",
      "Containers vs. VMs: Containers (Docker, Kubernetes) share the host OS kernel — lightweight, fast startup. VMs include full OS — heavier but fully isolated",
      "Infrastructure as Code (IaC): Terraform, CloudFormation, Ansible — define infrastructure in config files for repeatable, version-controlled deployments",
      "Multitenancy: Multiple customers share the same physical infrastructure but are logically isolated. Core principle of public cloud",
      "Elasticity vs. scalability: Elasticity = auto-scale up/down based on demand (short-term). Scalability = ability to grow capacity (long-term planning)"
    ],
    commands: [
      { cmd: "docker ps", desc: "List running containers — shows containerized network services" },
      { cmd: "virsh list --all", desc: "Linux KVM — list all virtual machines and their states" },
      { cmd: "ip link show", desc: "Show network interfaces including virtual bridges and veth pairs" }
    ],
    memoryTip: "Type 1 hypervisor = 'first on the scene' — installed directly on bare metal. Type 2 = 'second layer' — sits on top of an existing OS. For cloud: IaaS = I build it All, PaaS = Platform Already provided, SaaS = Software Already running.",
    examTip: "Know Type 1 vs. Type 2 hypervisors and be able to pick examples from a list. For cloud, understand the shared responsibility model: IaaS = customer manages OS and up, PaaS = customer manages app and data, SaaS = provider manages everything. Containers share the kernel — VMs do not."
  },

  /* ══════════════════════════════════════════════════════════════
     DOMAIN 2 — NETWORK IMPLEMENTATION (19%)
  ══════════════════════════════════════════════════════════════ */

  "2.1": {
    title: "Routing Technologies and Concepts",
    summary: "Routing is the process of forwarding packets between networks using Layer 3 addresses. CompTIA tests routing table concepts, static vs. dynamic routing, and the characteristics of common routing protocols. This is one of the most technical objectives.",
    keyPoints: [
      "Routing table components: Destination network, subnet mask, next hop, metric, interface, administrative distance (AD). Longest prefix match wins",
      "Static routing: Manually configured, no overhead, does not adapt to changes. Default route = 0.0.0.0/0 (gateway of last resort)",
      "Dynamic routing protocols: RIP (distance-vector, hop count, max 15 hops, slow convergence), OSPF (link-state, cost metric, fast convergence, areas), EIGRP (hybrid/advanced distance-vector, Cisco-developed but now open), BGP (path-vector, inter-AS, the internet's routing protocol)",
      "Administrative distance (AD): RIP = 120, OSPF = 110, EIGRP = 90, Static = 1, Connected = 0, BGP (eBGP) = 20. Lower AD = more trusted",
      "IGP vs. EGP: Interior Gateway Protocols (RIP, OSPF, EIGRP) route within an autonomous system. Exterior (BGP) routes between autonomous systems",
      "Routing concepts: Next hop = IP of next router, Metric = cost to reach destination (hop count, bandwidth, delay), Convergence = time for all routers to agree on topology",
      "NAT and routing: NAT translates private IPs to public. Routers must know the return path — NAT state table tracks translations",
      "Route summarization (supernetting): Combines multiple subnets into a single route entry — reduces routing table size and improves efficiency"
    ],
    commands: [
      { cmd: "route print", desc: "Windows — display the routing table (destination, mask, gateway, metric)" },
      { cmd: "ip route show", desc: "Linux — display the kernel routing table" },
      { cmd: "traceroute -n 8.8.8.8", desc: "Trace the routed path to a destination, showing each hop's IP" },
      { cmd: "netstat -rn", desc: "Display the routing table with numeric addresses (cross-platform)" }
    ],
    memoryTip: "AD values from most trusted to least: Connected (0) > Static (1) > EIGRP (90) > OSPF (110) > RIP (120). Remember: 'Cool Students Earn Over-the-top Recognition' — Connected, Static, EIGRP, OSPF, RIP. Lower number = more trusted.",
    examTip: "Know AD values by heart — CompTIA gives scenarios where two protocols learn the same route and asks which one wins. OSPF is the most commonly tested dynamic protocol. Remember RIP max is 15 hops (16 = unreachable). BGP is the only EGP."
  },

  "2.2": {
    title: "Switching and Wireless Configuration",
    summary: "Switching operates at Layer 2 using MAC addresses, while wireless extends the network without cables. VLANs, trunking, STP, and wireless standards (802.11) are core concepts for this objective. CompTIA tests configuration concepts, not CLI commands.",
    keyPoints: [
      "VLANs: Logically segment a switch into separate broadcast domains. VLAN 1 = default/native. Devices in different VLANs need a router (inter-VLAN routing) to communicate",
      "Trunking (802.1Q): Carries multiple VLAN traffic over a single link by tagging frames with VLAN IDs. Native VLAN traffic is untagged",
      "STP (Spanning Tree Protocol, 802.1D): Prevents Layer 2 loops by blocking redundant paths. Root bridge election → path cost → port roles (Root, Designated, Blocking). RSTP (802.1w) converges faster",
      "Port security: Limits MAC addresses on a switch port — violations can shutdown, restrict, or protect the port. Prevents unauthorized device connections",
      "802.11 wireless standards: 802.11a (5GHz, 54Mbps), 802.11b (2.4GHz, 11Mbps), 802.11g (2.4GHz, 54Mbps), 802.11n/Wi-Fi 4 (2.4/5GHz, 600Mbps), 802.11ac/Wi-Fi 5 (5GHz, 6.9Gbps), 802.11ax/Wi-Fi 6 (2.4/5/6GHz, 9.6Gbps)",
      "Wireless security: WPA2 (AES/CCMP) is the minimum standard. WPA3 (SAE handshake, 192-bit) is current best practice. WEP and WPA/TKIP are deprecated and insecure",
      "Wireless concepts: SSID (network name), channels (1, 6, 11 non-overlapping on 2.4GHz), AP placement, site surveys, band steering, MU-MIMO, OFDMA (Wi-Fi 6)",
      "EAP/802.1X: Enterprise wireless authentication — supplicant (client) → authenticator (AP/switch) → authentication server (RADIUS). Uses certificates or credentials"
    ],
    commands: [
      { cmd: "iwconfig wlan0", desc: "Linux — show wireless interface configuration (SSID, frequency, signal)" },
      { cmd: "netsh wlan show networks", desc: "Windows — list available wireless networks with signal strength" },
      { cmd: "nmcli device wifi list", desc: "Linux NetworkManager — scan and list available Wi-Fi networks" },
      { cmd: "arp -a", desc: "View MAC-to-IP mappings — useful for identifying devices on a switched network" }
    ],
    memoryTip: "Wi-Fi generations: a=Away (5GHz only), b=Basic (11Mbps), g=Good (54Mbps), n=Nice (600Mbps, dual band), ac=Awesome speed (5GHz), ax=Amazing everything (Wi-Fi 6, OFDMA). Non-overlapping 2.4GHz channels: 1, 6, 11 — '1, 6, done with 11.'",
    examTip: "Know all 802.11 standards with frequency and max speed. STP questions focus on root bridge election (lowest bridge ID wins) and port states. For VLANs, remember: devices in different VLANs cannot communicate without a Layer 3 device. 802.1X uses RADIUS — always."
  },

  "2.3": {
    title: "Network Infrastructure and WAN Technologies",
    summary: "WAN technologies connect geographically separated sites. This objective covers common WAN connection types, their characteristics, and when to use each one. Also includes edge and access devices like modems, firewalls, and wireless controllers.",
    keyPoints: [
      "MPLS (Multiprotocol Label Switching): Label-based forwarding, supports QoS, provider-managed, commonly used for enterprise WAN. Not encrypted by default",
      "Metro Ethernet: Ethernet-based MAN/WAN service from providers — familiar technology, easy to scale, point-to-point or multipoint",
      "Broadband: DSL (phone line, asymmetric, 5-100Mbps), Cable (coax, shared bandwidth, DOCSIS), Fiber (FTTH/FTTP, fastest), Satellite (high latency, 600ms+ round-trip, good for remote areas)",
      "Cellular: 4G LTE (50-100Mbps typical), 5G (1-10Gbps). Used for WAN failover, mobile workforce, IoT. Consider data caps and coverage",
      "VPN types: Site-to-site (connects two networks — IPsec tunnel), Remote access (individual user to corporate — SSL/TLS or IPsec), Split tunnel (only corporate traffic through VPN) vs. full tunnel (all traffic through VPN)",
      "SD-WAN: Software-defined WAN overlay — aggregates multiple WAN links (MPLS, broadband, LTE), intelligent path selection based on application needs, centralized management, encrypted",
      "Demarcation point (demarc): Where provider responsibility ends and customer responsibility begins. Smart jack / NID at the demarc",
      "Edge devices: Firewall (security boundary), Router (WAN edge), Modem (signal conversion — DSL/cable), WLC (wireless LAN controller), Load balancer, VPN concentrator"
    ],
    commands: [
      { cmd: "traceroute -I 8.8.8.8", desc: "Trace WAN path using ICMP to identify provider hops and latency" },
      { cmd: "speedtest-cli", desc: "Test WAN bandwidth — download, upload, and latency to nearest server" },
      { cmd: "ip tunnel show", desc: "Linux — display configured VPN/GRE tunnels" },
      { cmd: "curl ifconfig.me", desc: "Display your public IP address — useful for verifying WAN/NAT configuration" }
    ],
    memoryTip: "WAN speed ladder: Satellite (slow, high latency) < DSL < Cable < Metro Ethernet < Fiber < MPLS (managed). For VPN: Site-to-site = office to office (always on). Remote access = laptop to office (on demand). Split tunnel = split personality — some traffic goes through VPN, some doesn't.",
    examTip: "Satellite has the highest latency of any WAN technology — if a question mentions rural/remote with high latency, think satellite. MPLS is provider-managed and supports QoS but is NOT encrypted (combine with IPsec for security). SD-WAN is the modern answer to expensive MPLS-only WANs."
  },

  "2.4": {
    title: "Network Device Installation and Configuration",
    summary: "This objective covers the practical steps for installing and configuring network devices — IP assignment, firmware updates, interface configuration, DHCP, DNS settings, NTP, and basic device hardening. Think of it as 'day one' device setup.",
    keyPoints: [
      "IP address assignment: Static (manually configured — servers, printers, infrastructure), DHCP (automatic — workstations, phones), DHCP reservation (specific IP bound to a MAC address)",
      "Default gateway: The router IP that devices use to reach other networks. Misconfigured gateway = can reach local subnet but nothing beyond it",
      "DNS configuration: Primary and secondary DNS servers. Misconfigured DNS = can ping IPs but not hostnames. Test with nslookup or dig",
      "NTP configuration: Synchronize device clocks to an NTP server. Critical for log correlation, authentication (Kerberos), and certificate validation",
      "Firmware and patching: Update firmware on switches, routers, APs, and firewalls for security fixes and new features. Always back up config before updating",
      "Interface configuration: Speed, duplex (auto-negotiate, full, half), MTU (default 1500, jumbo frames up to 9000). Mismatched duplex = late collisions and poor performance",
      "DHCP scope: Range of IPs to assign, plus exclusions (for static devices), lease duration, options (gateway, DNS, domain name). DHCP snooping prevents rogue DHCP servers",
      "Out-of-band management: Console port (serial/USB), dedicated management network, IPMI/iLO/iDRAC — access device even when network is down"
    ],
    commands: [
      { cmd: "ipconfig /all", desc: "Windows — verify IP, mask, gateway, DNS, DHCP server, lease times" },
      { cmd: "ip addr add 192.168.1.10/24 dev eth0", desc: "Linux — manually assign a static IP to an interface" },
      { cmd: "nmcli con mod eth0 ipv4.dns '8.8.8.8 8.8.4.4'", desc: "Linux — configure DNS servers via NetworkManager" },
      { cmd: "timedatectl status", desc: "Linux — verify NTP synchronization status and current time" }
    ],
    memoryTip: "Day-one device setup checklist: HING — Hostname, IP address (+ mask + gateway), NTP, Go update firmware. If a user can ping 8.8.8.8 but not google.com — it is always DNS.",
    examTip: "If a device can reach local hosts but not remote hosts, check the default gateway. If it can ping IPs but not names, check DNS. Duplex mismatch is a classic exam trap — one side set to full, the other to half = late collisions and CRC errors. Always check speed/duplex when troubleshooting slow links."
  },

  /* ══════════════════════════════════════════════════════════════
     DOMAIN 3 — NETWORK OPERATIONS (20%)
  ══════════════════════════════════════════════════════════════ */

  "3.1": {
    title: "Network Monitoring and Documentation",
    summary: "Monitoring keeps networks healthy by providing visibility into performance, errors, and availability. Documentation ensures that network changes are tracked and that anyone can understand the environment. Both are essential for operations and troubleshooting.",
    keyPoints: [
      "SNMP (Simple Network Management Protocol): Polls devices for metrics (CPU, memory, interface stats). v1/v2c use community strings (cleartext). v3 adds authentication and encryption",
      "SNMP components: Manager (NMS — polls), Agent (runs on device), MIB (Management Information Base — defines available data), OID (Object Identifier — specific metric), Trap (unsolicited alert from agent to manager)",
      "Syslog: Centralized logging. Severity levels 0-7: Emergency (0), Alert (1), Critical (2), Error (3), Warning (4), Notice (5), Informational (6), Debug (7). Lower number = more severe",
      "NetFlow/sFlow/IPFIX: Traffic flow analysis — shows who is talking to whom, on what ports, how much data. NetFlow = Cisco, sFlow = sampling-based (multi-vendor), IPFIX = standardized NetFlow v9",
      "Network diagrams: Physical (cabling, device locations, rack layouts) and Logical (IP subnets, VLANs, routing domains). Keep both updated",
      "Baselines: Documented 'normal' performance — CPU utilization, bandwidth, latency, error rates. Compare current metrics against baselines to detect anomalies",
      "Change management: Formal process for making network changes — request, review, approve, implement, document, rollback plan. Prevents outages from unauthorized changes",
      "Documentation types: Wiring diagrams, IP address tables, MOP (Method of Procedure), rack diagrams, port maps, configuration backups, SOP (Standard Operating Procedure)"
    ],
    commands: [
      { cmd: "snmpwalk -v2c -c public 192.168.1.1", desc: "Walk SNMP OID tree on a device using community string 'public'" },
      { cmd: "tcpdump -i eth0 port 514", desc: "Capture syslog traffic (UDP 514) to verify logging is working" },
      { cmd: "iftop -i eth0", desc: "Real-time bandwidth monitoring per connection on a Linux interface" },
      { cmd: "vnstat -d", desc: "Linux — view daily network traffic statistics per interface" }
    ],
    memoryTip: "Syslog severity: 'Every Alley Cat Eats Watery Noodles In Doors' — Emergency (0), Alert (1), Critical (2), Error (3), Warning (4), Notice (5), Informational (6), Debug (7). Lower = worse. SNMP versions: v1/v2c = community strings (bad), v3 = auth + encryption (good).",
    examTip: "Know syslog severity levels — CompTIA will describe a scenario and ask which level it is. SNMP v3 is the only secure version (v1/v2c send community strings in cleartext). NetFlow shows traffic flows; SNMP shows device health. They are complementary, not replacements."
  },

  "3.2": {
    title: "Organizational Policies and Procedures",
    summary: "Network operations require documented policies and procedures to maintain consistency, security, and compliance. This covers change management, incident response, disaster recovery, and standard operating procedures that every network professional must follow.",
    keyPoints: [
      "Change management: Submit request → review impact → get approval → schedule maintenance window → implement → verify → document. Always have a rollback plan",
      "Incident response plan: Preparation → Identification → Containment → Eradication → Recovery → Lessons Learned. Know these six phases in order",
      "Disaster recovery (DR): RPO (Recovery Point Objective — max data loss tolerance) and RTO (Recovery Time Objective — max downtime tolerance). Hot site (immediate), Warm site (hours), Cold site (days)",
      "Business continuity plan (BCP): Keeps the business running during a disaster. Includes DR, communication plans, alternate work locations, priority of systems to restore",
      "SLA (Service Level Agreement): Defines uptime guarantees, response times, penalties. 99.9% = 8.76 hours downtime/year. 99.99% = 52.6 minutes/year",
      "AUP (Acceptable Use Policy): Defines what users can/cannot do on the network — internet usage, personal devices, prohibited activities",
      "NDA (Non-Disclosure Agreement): Legal protection for sensitive information. Employees, contractors, vendors may all require NDAs",
      "Safety procedures: ESD precautions (wrist strap, grounding), lockout/tagout for electrical work, MSDS for hazardous materials, rack safety (weight limits, seismic bracing)"
    ],
    commands: [
      { cmd: "diff old-config.txt new-config.txt", desc: "Compare configs before and after a change — part of change documentation" },
      { cmd: "git log --oneline", desc: "View config change history if using version control for network configs" },
      { cmd: "crontab -l", desc: "List scheduled tasks — verify automated backup jobs are in place" }
    ],
    memoryTip: "Incident response phases: 'People Identify Criminals Every day, Recovering Lessons' — Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned. For DR sites: Hot = ready to go (expensive), Warm = needs some setup, Cold = empty room with power.",
    examTip: "RPO vs. RTO is a guaranteed exam question. RPO = how much data can you afford to LOSE (backup frequency). RTO = how long can you be DOWN (recovery speed). A hot site has the lowest RTO. Know all six incident response phases in order."
  },

  "3.3": {
    title: "High Availability and Disaster Recovery",
    summary: "High availability (HA) ensures network services remain accessible despite failures. Disaster recovery ensures you can restore operations after a major event. CompTIA tests redundancy mechanisms, failover strategies, and backup concepts.",
    keyPoints: [
      "Redundancy types: Hardware (dual power supplies, hot-swappable), Link (dual uplinks, NIC teaming/bonding), Device (redundant routers, FHRP), Path (multiple routes, load balancing)",
      "FHRP (First Hop Redundancy Protocol): VRRP (open standard), HSRP (Cisco), GLBP (Cisco, load-balancing). Provides a virtual gateway IP so hosts don't lose connectivity when a router fails",
      "NIC teaming/bonding: Combines multiple NICs for bandwidth aggregation and failover. Modes: active-backup, balance-rr, 802.3ad (LACP)",
      "LACP (Link Aggregation Control Protocol, 802.3ad): Bundles multiple physical links into one logical link — increases bandwidth and provides redundancy",
      "UPS (Uninterruptible Power Supply): Online (always on battery, cleanest power), Line-interactive (switches on outage), Standby (cheapest, slight delay). Runtime depends on load and battery capacity",
      "Backup types: Full (everything, longest), Incremental (only changes since last backup, fastest), Differential (changes since last full, middle ground). Grandfather-Father-Son rotation scheme",
      "RAID levels: RAID 0 (striping, no redundancy), RAID 1 (mirroring), RAID 5 (striping with parity, min 3 disks), RAID 6 (double parity, min 4 disks), RAID 10 (mirrored stripes, min 4 disks)",
      "Failover clustering: Active-passive (standby takes over), Active-active (both handle traffic, one absorbs the other's load on failure)"
    ],
    commands: [
      { cmd: "cat /proc/mdstat", desc: "Linux — check RAID array status and rebuild progress" },
      { cmd: "ip link show bond0", desc: "Linux — verify NIC bonding/teaming status and active slave" },
      { cmd: "rsync -avz /data/ /backup/", desc: "Efficient incremental file backup — only transfers changed data" },
      { cmd: "apcaccess status", desc: "Check UPS status (APC) — battery charge, runtime, load percentage" }
    ],
    memoryTip: "RAID: 0 = Zero protection (striping only). 1 = 1 mirror copy. 5 = survives 1 disk failure (parity). 6 = survives 2 disk failures (double parity). 10 = 1+0 combined — both mirroring and striping. Backups: Full = everything. Incremental = just the Increment. Differential = Difference since last full.",
    examTip: "Know FHRP protocols: VRRP is the open standard (vendor-neutral answer). LACP is 802.3ad. For backups: restoring from incremental requires the last full + all incrementals. Restoring from differential requires the last full + only the last differential. Differential is faster to restore but uses more space."
  },

  "3.4": {
    title: "Remote Access and Management Methods",
    summary: "Network devices must be managed securely, whether on-site or remotely. This objective covers protocols and tools for accessing, configuring, and troubleshooting devices from a distance, as well as best practices for securing management access.",
    keyPoints: [
      "SSH (TCP 22): Encrypted remote access — the standard for managing network devices and Linux servers. Uses public key or password authentication",
      "RDP (TCP 3389): Remote Desktop Protocol — GUI remote access to Windows systems. Encrypted, supports NLA (Network Level Authentication)",
      "VPN for remote management: Site-to-site or remote access VPN provides encrypted tunnel to management network. Always use VPN for managing devices over untrusted networks",
      "Out-of-band (OOB) management: Console port (serial/USB — physical access), dedicated management VLAN/network, cellular modem for emergency access when network is down",
      "In-band management: Managing devices over the production network (SSH over regular interfaces). Convenient but unavailable if the network is down",
      "Jump box / bastion host: Hardened server that acts as a gateway to the management network. All admin connections go through it — single point of auditing and access control",
      "SNMP for management: Read-write community strings allow configuration changes via SNMP. Always use SNMPv3 with auth and encryption",
      "Remote monitoring: IPMI/iLO/iDRAC for server hardware management (power on/off, console access, hardware health). Available even when OS is unresponsive"
    ],
    commands: [
      { cmd: "ssh admin@192.168.1.1", desc: "Connect to a device via SSH for secure remote management" },
      { cmd: "ssh -L 8080:internal:80 jumpbox", desc: "SSH tunnel through a jump box to reach an internal web interface" },
      { cmd: "screen /dev/ttyUSB0 9600", desc: "Linux — connect to a device console port via serial/USB at 9600 baud" },
      { cmd: "ipmitool -H 10.0.0.5 -U admin chassis status", desc: "Check server hardware status via IPMI out-of-band management" }
    ],
    memoryTip: "OOB = Out Of Band = Out of the normal network path — think 'emergency backdoor.' In-band = Inside the Band (the regular production network). Jump box = 'jump' through one secure door to reach everything behind it.",
    examTip: "If the question says 'the network is completely down, how do you access the switch?' — the answer is out-of-band (console port). SSH is always preferred over Telnet. A jump box / bastion host is the answer when they ask about securing administrative access to an entire environment."
  },

  "3.5": {
    title: "Physical Network and Facility Considerations",
    summary: "Physical infrastructure — data center cooling, power, cabling, and environmental controls — directly affects network availability and performance. CompTIA tests your understanding of facility requirements, cable management, and environmental monitoring.",
    keyPoints: [
      "HVAC and cooling: Hot aisle / cold aisle layout — cold air enters front of racks, hot air exits rear. Blanking panels prevent hot air recirculation. Target: 64-80F (18-27C)",
      "Power: UPS for short-term outages, generator for extended outages. PDU (Power Distribution Unit) distributes power within racks. Redundant power feeds (A+B) from different circuits",
      "Cable management: Structured cabling (TIA-568 standard), patch panels, cable trays, labeling, color coding. MDF (Main Distribution Frame) and IDF (Intermediate Distribution Frame)",
      "MDF/IDF: MDF = main telecom room where external lines enter the building (demarc). IDF = satellite closets on each floor connecting back to the MDF via backbone cabling",
      "Fire suppression: Clean agent (FM-200, Novec 1230) for data centers — suppresses fire without water damage. Pre-action sprinkler systems require two triggers before water flows",
      "Environmental monitoring: Temperature sensors, humidity sensors (40-60% RH target), water/leak detection, smoke detection. SNMP-enabled sensors report to NMS",
      "Physical security: Biometrics, badge readers, mantrap/vestibule, security cameras, cable locks, locked cabinets. Rack-level security with key locks or electronic access",
      "Rack standards: 42U is standard full-height rack. 1U = 1.75 inches. Equipment rated by U-height. Weight capacity matters — 2-post vs. 4-post racks"
    ],
    commands: [
      { cmd: "ipmitool sensor list", desc: "Read hardware sensors — temperature, voltage, fan speed via IPMI" },
      { cmd: "lm-sensors", desc: "Linux — read CPU and board temperature sensors" },
      { cmd: "smartctl -a /dev/sda", desc: "Check disk health and temperature — early warning for drive failure" }
    ],
    memoryTip: "Hot aisle / cold aisle: Face the front of all racks the same way. Cold air in the front (intake), hot air out the back (exhaust). Think of it like everyone facing forward in a classroom — AC blows at their faces, heat exits behind them. MDF = Main room (downstairs), IDF = In-between rooms (each floor).",
    examTip: "Hot aisle / cold aisle containment is the most-tested cooling concept. Know that clean agent fire suppression (FM-200) is correct for data centers — never water sprinklers around electronics. MDF vs. IDF questions test whether you know where the demarc point is (MDF). A full rack = 42U."
  },

  /* ══════════════════════════════════════════════════════════════
     DOMAIN 4 — NETWORK SECURITY (19%)
  ══════════════════════════════════════════════════════════════ */

  "4.1": {
    title: "Common Security Threats and Vulnerabilities",
    summary: "Network security starts with understanding the threat landscape. This objective covers attack types, social engineering, vulnerabilities, and threat actors. CompTIA tests your ability to identify attacks by their characteristics and recommend mitigations.",
    keyPoints: [
      "DoS/DDoS: Overwhelms a target with traffic. DoS = single source, DDoS = distributed (botnet). Types: SYN flood, UDP flood, Smurf attack (ICMP amplification), reflective/amplification attacks",
      "Man-in-the-Middle (MitM/on-path): Attacker intercepts traffic between two parties. ARP spoofing (poisons ARP cache to redirect traffic), DNS spoofing, SSL stripping, evil twin AP",
      "Social engineering: Phishing (email), Vishing (voice), Smishing (SMS), Pretexting (fabricated scenario), Tailgating (physical — following someone through a door), Shoulder surfing",
      "Malware types: Virus (attaches to files), Worm (self-propagating), Trojan (disguised as legit), Ransomware (encrypts data for ransom), Rootkit (hides in OS kernel), Spyware, Adware",
      "VLAN hopping: Switch spoofing (attacker pretends to be a trunk) or double-tagging (exploits native VLAN). Mitigate: disable auto-trunking, set native VLAN to unused VLAN",
      "DNS attacks: DNS poisoning (corrupts cache), DNS amplification (DDoS using open resolvers), DNS tunneling (exfiltrates data via DNS queries), Pharming (redirects users via DNS)",
      "Password attacks: Brute force (try all combinations), Dictionary (common words), Credential stuffing (stolen credentials from breaches), Password spraying (one password, many accounts)",
      "Insider threats: Employees or contractors with legitimate access — accidental (misconfiguration) or intentional (data theft). Hardest to detect, highest impact"
    ],
    commands: [
      { cmd: "arp -a", desc: "Check ARP table for suspicious entries — duplicate MACs may indicate ARP spoofing" },
      { cmd: "nmap -sS 192.168.1.0/24", desc: "SYN scan a subnet to detect unauthorized devices and open ports" },
      { cmd: "tcpdump -i eth0 arp", desc: "Capture ARP traffic to detect spoofing or gratuitous ARP floods" },
      { cmd: "fail2ban-client status", desc: "Check intrusion prevention status — shows banned IPs from brute-force attempts" }
    ],
    memoryTip: "Social engineering by channel: Phishing = 'fishing' with email bait. Vishing = Voice phishing (phone). Smishing = SMS phishing (text). Pretexting = 'pretending' to be someone else. For attacks: if it is 'amplification' — the attacker uses a third party to multiply traffic at the victim.",
    examTip: "CompTIA describes attack scenarios and asks you to identify the attack type. Key tells: traffic flooding = DoS/DDoS, intercepted communication = MitM, fake email = phishing, following someone through a secure door = tailgating. VLAN hopping mitigations: disable DTP, change native VLAN, use explicit trunking."
  },

  "4.2": {
    title: "Network Hardening and Security Controls",
    summary: "Network hardening reduces the attack surface by applying security controls to devices, protocols, and infrastructure. This objective covers firewalls, ACLs, encryption, authentication, and device hardening — the practical steps to secure a network.",
    keyPoints: [
      "Firewalls: Stateless (packet filter — checks ACL rules per packet) vs. Stateful (tracks connections, smarter). NGFW adds application awareness, IPS, URL filtering, deep packet inspection",
      "ACLs (Access Control Lists): Rules that permit or deny traffic by source/destination IP, port, protocol. Applied inbound or outbound on interfaces. Implicit deny at the end of every ACL",
      "Network segmentation: VLANs, DMZ (demilitarized zone for public-facing servers), microsegmentation (granular, per-workload isolation). Limits blast radius of a breach",
      "Encryption: IPsec (Layer 3, site-to-site VPN), TLS/SSL (Layer 4-7, web/email), WPA3-Enterprise (wireless). Always encrypt data in transit and at rest",
      "AAA (Authentication, Authorization, Accounting): RADIUS (UDP 1812/1813, encrypts password only) vs. TACACS+ (TCP 49, encrypts entire payload). TACACS+ preferred for network device management",
      "802.1X (Port-based NAC): Authenticates devices before granting network access. Supplicant → Authenticator → Authentication server (RADIUS). Guest VLAN for unauthenticated devices",
      "Device hardening: Change default credentials, disable unused ports/services, enable SSH (disable Telnet), configure banners, use SNMPv3, set strong passwords, apply firmware updates",
      "IDS/IPS: IDS = detection only (monitors and alerts). IPS = prevention (blocks malicious traffic inline). Signature-based (known attacks) vs. Anomaly-based (unusual behavior)"
    ],
    commands: [
      { cmd: "nmap -sV --script vuln 192.168.1.1", desc: "Scan a host for known vulnerabilities and service versions" },
      { cmd: "iptables -L -n", desc: "Linux — list all firewall (netfilter) rules with numeric addresses" },
      { cmd: "ufw status verbose", desc: "Ubuntu — show firewall rules and default policies" },
      { cmd: "openssl s_client -connect example.com:443", desc: "Test TLS certificate and encryption on a remote server" }
    ],
    memoryTip: "RADIUS vs. TACACS+: RADIUS = Remote, UDP, encrypts password only. TACACS+ = TCP, encrypts All the Conversation (entire payload). IDS = 'I Detect Stuff' (passive). IPS = 'I Prevent Stuff' (active/inline). DMZ = the 'danger zone' between your internal network and the internet.",
    examTip: "Know the difference between IDS and IPS — IDS is passive (mirror/span port), IPS is inline (can block). TACACS+ encrypts the full payload while RADIUS only encrypts the password — this is a very common exam question. 802.1X always involves three components: supplicant, authenticator, authentication server."
  },

  "4.3": {
    title: "Wireless Security and Access Control",
    summary: "Wireless networks are inherently less secure than wired because signals travel through the air. This objective covers wireless security protocols, authentication methods, rogue AP detection, and best practices for locking down wireless infrastructure.",
    keyPoints: [
      "WPA2-Personal (PSK): Pre-shared key, suitable for home/SOHO. Uses AES-CCMP encryption. Same passphrase for all users — key management challenge",
      "WPA2-Enterprise: Uses 802.1X/RADIUS authentication — each user has unique credentials. Certificates, EAP-TLS, PEAP. Required for business environments",
      "WPA3: SAE (Simultaneous Authentication of Equals) replaces PSK 4-way handshake — resistant to offline dictionary attacks. Enhanced Open (OWE) encrypts open networks. 192-bit security mode for enterprise",
      "Rogue AP / Evil twin: Unauthorized AP on the network (rogue) or attacker-controlled AP mimicking a legitimate SSID (evil twin). Detect with WIDS/WIPS or wireless surveys",
      "MAC filtering: Only allows known MAC addresses to connect. Easily bypassed by spoofing — not a strong security control, but adds a layer",
      "SSID management: Disabling SSID broadcast hides the network name — but does not prevent detection by tools like Kismet/Airodump. Security through obscurity, not a real control",
      "Wireless isolation (client isolation): Prevents wireless clients from communicating with each other — useful for guest networks. Each client can only reach the gateway",
      "Captive portal: Web page that appears when connecting to a network — used for guest access, terms acceptance, authentication. Common in hotels, airports, coffee shops"
    ],
    commands: [
      { cmd: "airodump-ng wlan0mon", desc: "Scan for all wireless networks and clients — detects hidden SSIDs and rogue APs" },
      { cmd: "netsh wlan show profiles", desc: "Windows — list all saved wireless profiles and their security settings" },
      { cmd: "iwlist wlan0 scan", desc: "Linux — scan for available wireless networks with signal and encryption details" },
      { cmd: "hostapd -dd /etc/hostapd/hostapd.conf", desc: "Debug a Linux-based access point — verify security and authentication settings" }
    ],
    memoryTip: "WPA evolution: WEP (Wired Equivalent Privacy — broken, never use) → WPA (TKIP — deprecated) → WPA2 (AES-CCMP — current standard) → WPA3 (SAE — next generation). 'We Prefer Advancement' — each version is better. Enterprise = RADIUS, Personal = PSK.",
    examTip: "WPA2 with AES is the minimum acceptable wireless security — anything less (WEP, WPA/TKIP) is insecure. If the question asks about the 'most secure' wireless option, WPA3-Enterprise is the answer. MAC filtering and hidden SSIDs are NOT real security — they are easily bypassed. 802.1X/RADIUS is always the enterprise authentication answer."
  },

  /* ══════════════════════════════════════════════════════════════
     DOMAIN 5 — NETWORK TROUBLESHOOTING (18%)
  ══════════════════════════════════════════════════════════════ */

  "5.1": {
    title: "Network Troubleshooting Methodology",
    summary: "CompTIA defines a structured 7-step troubleshooting methodology that every network professional should follow. The exam tests your ability to apply each step in order and identify which step a given action belongs to. Process matters as much as technical knowledge.",
    keyPoints: [
      "Step 1 — Identify the problem: Gather information, question users, identify symptoms vs. root cause, determine scope (one user, one VLAN, entire site)",
      "Step 2 — Establish a theory of probable cause: Start with the most likely cause (Occam's razor). Consider OSI model — start at Layer 1 (physical) and work up. Question the obvious",
      "Step 3 — Test the theory: Try to confirm or deny your theory. If confirmed, determine next steps. If not confirmed, go back to Step 2 and establish a new theory",
      "Step 4 — Establish a plan of action: Create a plan to resolve the issue and identify potential side effects. Consider change management, maintenance windows, and rollback procedures",
      "Step 5 — Implement the solution or escalate: Apply the fix. If beyond your scope or expertise, escalate to the appropriate team or vendor with all gathered information",
      "Step 6 — Verify full system functionality: Confirm the fix resolved the issue. Test related systems for unintended side effects. Have the user confirm the issue is resolved",
      "Step 7 — Document findings, actions, and outcomes: Record what the problem was, what caused it, what was done to fix it, and the result. Update knowledge base",
      "Key principle: Follow the steps in order. Do not skip steps (especially documentation). The methodology prevents wasted time and ensures thoroughness"
    ],
    commands: [
      { cmd: "ping 192.168.1.1", desc: "Step 3 — test basic connectivity to confirm or deny a theory" },
      { cmd: "ipconfig /all", desc: "Step 1 — gather information about the affected system's network config" },
      { cmd: "show log", desc: "Step 1 — check device logs for error messages and recent events" }
    ],
    memoryTip: "7 steps: 'I Eat Tacos Every day, Including Veggies and Dessert' — Identify, Establish theory, Test theory, Establish plan, Implement/escalate, Verify, Document. Always start with 'What changed?' — most network issues follow a recent change.",
    examTip: "CompTIA gives you a scenario and asks 'what should you do NEXT?' — map the described actions to the 7 steps and pick the next step in sequence. Documenting is ALWAYS the last step. 'Establish a theory' always comes before 'test the theory.' If you have already tested and the theory failed, go back to Step 2 — not Step 4."
  },

  "5.2": {
    title: "Troubleshooting Common Cable and Physical Issues",
    summary: "Physical layer problems are the most common cause of network failures and the first thing to check. This objective covers cable faults, interface errors, and tools for diagnosing Layer 1 issues. If the physical layer is broken, nothing above it will work.",
    keyPoints: [
      "Cable types and faults: Opens (broken conductor), Shorts (conductors touching), Crosstalk (signal bleeding between pairs — NEXT/FEXT), Attenuation (signal loss over distance)",
      "Interface errors to watch: CRC errors (damaged frames, bad cable), Runts (frames too small, collision), Giants (frames too large, MTU mismatch), Late collisions (duplex mismatch or cable too long)",
      "Duplex mismatch: One side full-duplex, other side half-duplex — causes late collisions, slow throughput, CRC errors. Always check speed/duplex when a link is slow",
      "Cable testing tools: Cable tester (verifies continuity and wiring), TDR (Time Domain Reflectometer — finds distance to cable faults), OTDR (Optical TDR — fiber equivalent)",
      "Certifier vs. tester: A cable tester checks continuity. A cable certifier verifies the cable meets a specific standard (Cat 6a, etc.) — needed for warranty and compliance",
      "Fiber issues: Dirty connectors (most common fiber issue — always clean before connecting), bend radius exceeded (signal loss), connector type mismatch, wavelength mismatch",
      "EMI/RFI interference: Fluorescent lights, motors, power cables running parallel to data cables. Solution: STP cable, increase separation, use fiber (immune to EMI)",
      "LED indicators: Solid green = link up. Blinking = traffic. Amber/orange = error or negotiation issue. No light = no link (cable, port, or device issue)"
    ],
    commands: [
      { cmd: "ethtool eth0", desc: "Linux — show link status, speed, duplex, and error counters on an interface" },
      { cmd: "netstat -e", desc: "Windows — show Ethernet statistics including errors, discards, and unknown protocols" },
      { cmd: "ip -s link show eth0", desc: "Linux — show interface statistics including RX/TX errors, drops, and overruns" },
      { cmd: "mii-tool -v eth0", desc: "Linux — check physical layer link status and negotiation" }
    ],
    memoryTip: "Troubleshoot bottom-up: Start at Layer 1. Is the cable plugged in? Is the link light on? Is the cable good? Then move up to Layer 2 (MAC, VLAN), Layer 3 (IP, routing), etc. 'Have you tried turning it off and on again?' is actually Layer 1 troubleshooting.",
    examTip: "If the question mentions CRC errors + late collisions together — duplex mismatch. If the question mentions interference near fluorescent lights or power cables — EMI, use STP or fiber. A TDR tells you WHERE a cable fault is (distance). Always check the physical layer first — most problems are Layer 1."
  },

  "5.3": {
    title: "Troubleshooting Common Network Service Issues",
    summary: "When the physical layer is healthy but users still cannot access resources, the problem is usually with network services like DHCP, DNS, or NTP. This objective covers diagnosing issues with these foundational services and the tools to fix them.",
    keyPoints: [
      "DHCP issues: No IP (169.254.x.x/APIPA = DHCP failure), wrong subnet, scope exhausted (no available IPs), rogue DHCP server, relay agent misconfigured",
      "DNS issues: Can ping by IP but not by name = DNS failure. Wrong DNS server configured, stale cache, missing records (A, AAAA, MX, PTR), DNS server unreachable",
      "NTP issues: Clock drift causes Kerberos auth failures (max 5-minute skew), log correlation problems, certificate validation failures. Check NTP sync status",
      "VLAN issues: Wrong VLAN assignment (device in wrong subnet), native VLAN mismatch on trunk (traffic sent untagged to wrong VLAN), missing VLAN on trunk allowed list",
      "Routing issues: Missing route (no path to destination), wrong next-hop, asymmetric routing (packets take different paths in/out), black hole (route exists but next hop is unreachable)",
      "Firewall / ACL issues: Blocked traffic that should be permitted, implicit deny at end of ACL, rule order matters (first match wins), forgotten return traffic rule (use stateful firewall)",
      "Certificate issues: Expired certificate (HTTPS errors), hostname mismatch, untrusted CA, clock wrong on client (certificates appear invalid if time is off)",
      "MTU/fragmentation: Path MTU too large — packet needs fragmentation but DF bit set. Causes intermittent connectivity, especially with VPN. Default MTU = 1500, VPN overhead reduces it"
    ],
    commands: [
      { cmd: "nslookup example.com", desc: "Test DNS resolution — if this fails but ping by IP works, DNS is the issue" },
      { cmd: "ipconfig /release && ipconfig /renew", desc: "Windows — force DHCP lease renewal to troubleshoot DHCP issues" },
      { cmd: "ping -s 1472 -M do 8.8.8.8", desc: "Linux — test Path MTU by sending large packets with Don't Fragment set" },
      { cmd: "dig +trace example.com", desc: "Trace the full DNS resolution path from root to authoritative server" }
    ],
    memoryTip: "169.254.x.x (APIPA) = 'I asked for DHCP and nobody answered.' If you can ping 8.8.8.8 but not google.com — DNS is broken, always. For Kerberos: if the clock is off by more than 5 minutes, authentication fails — NTP fixes this.",
    examTip: "APIPA address (169.254.x.x) = DHCP failure — this is tested constantly. 'Can ping by IP, cannot browse by name' = DNS issue. If VPN users report intermittent connectivity with large file transfers but small ones work — MTU/fragmentation issue. Certificate errors + wrong time = check NTP."
  },

  "5.4": {
    title: "Common Network Troubleshooting Tools",
    summary: "Every network professional needs a toolkit of diagnostic commands and utilities. CompTIA tests your ability to choose the right tool for a given problem. Know what each tool does, when to use it, and how to interpret its output.",
    keyPoints: [
      "ping: Tests Layer 3 reachability using ICMP echo request/reply. TTL in response indicates OS type (64=Linux, 128=Windows, 255=network device). Use -t for continuous (Windows)",
      "traceroute/tracert: Maps the Layer 3 path hop-by-hop. Uses incrementing TTL values. Shows latency per hop. * * * = hop blocks ICMP. High latency at one hop = potential bottleneck",
      "nslookup/dig: DNS query tools. nslookup is interactive/non-interactive. dig provides more detail (TTL, authority section, flags). Use to verify A, MX, CNAME, PTR, and other records",
      "ipconfig/ifconfig/ip: Display and manage IP configuration. ipconfig /flushdns clears DNS cache. ipconfig /all shows DHCP server, lease times, MAC address",
      "netstat/ss: Show active connections, listening ports, routing table. netstat -an = all connections numeric. ss is the modern Linux replacement (faster)",
      "nmap: Network scanner — port scanning, OS detection, service identification, vulnerability scanning. SYN scan (-sS), service version (-sV), OS detection (-O)",
      "tcpdump/Wireshark: Packet capture and analysis. tcpdump = CLI (Linux). Wireshark = GUI (cross-platform). Capture filters reduce volume, display filters refine analysis",
      "iperf: Bandwidth testing between two endpoints. Server mode (-s) on one end, client mode (-c) on the other. Tests actual throughput — not just link speed. Useful for proving bandwidth issues"
    ],
    commands: [
      { cmd: "ping -c 4 192.168.1.1", desc: "Send 4 ICMP echo requests and report round-trip time and packet loss" },
      { cmd: "traceroute -n 8.8.8.8", desc: "Trace route showing IP addresses (no DNS resolution) for faster output" },
      { cmd: "nmap -sn 192.168.1.0/24", desc: "Ping sweep — discover all live hosts on a subnet without port scanning" },
      { cmd: "tcpdump -i eth0 -w capture.pcap", desc: "Capture all traffic on eth0 and save to a file for Wireshark analysis" }
    ],
    memoryTip: "Tool by layer: Layer 1 = cable tester/TDR. Layer 2 = arp -a (MAC table). Layer 3 = ping, traceroute, ip/ipconfig. Layer 4 = netstat, ss, nmap. Layer 7 = nslookup, dig, curl. When in doubt, start at the bottom: 'Can I ping the gateway?' is always a good first test.",
    examTip: "CompTIA will describe a problem and ask which tool to use. Cannot reach a remote host = traceroute (to find where it fails). DNS not resolving = nslookup/dig. Need to see actual packet contents = tcpdump/Wireshark. Need to find open ports = nmap. Need to test bandwidth = iperf. ipconfig /flushdns solves stale DNS cache issues."
  },

  "5.5": {
    title: "Troubleshooting Wireless and Mobile Issues",
    summary: "Wireless troubleshooting requires understanding RF behavior, channel conflicts, security misconfigurations, and client-side issues. This objective covers diagnosing problems unique to wireless networks, including signal degradation, interference, and association failures.",
    keyPoints: [
      "Signal degradation: Attenuation (signal weakens over distance), Absorption (walls, concrete, water absorb signal), Reflection (signal bounces off metal/glass), Refraction (signal bends through different materials)",
      "Interference: Co-channel (same channel, different APs — reduces throughput but APs cooperate). Adjacent channel (overlapping channels — noise, never use channels 2-5, 7-10 on 2.4GHz). Use 1, 6, 11 only",
      "AP placement: Coverage overlap should be 15-25% between APs for seamless roaming. Too much overlap = co-channel interference. Too little = dead zones. Site survey determines optimal placement",
      "Wireless client issues: Wrong SSID, incorrect passphrase, driver issues, incorrect security type selected (WPA2 vs WPA3), MAC filtering blocking device, IP conflict",
      "Roaming issues: Sticky client (device holds onto weak AP instead of roaming to stronger one). Solve with band steering, minimum RSSI thresholds, or 802.11k/r/v (fast roaming standards)",
      "Antenna types: Omnidirectional (360-degree coverage, indoor general use), Directional (focused beam — Yagi, parabolic — long-range point-to-point), Patch (semi-directional — wall-mounted, hallways)",
      "Capacity vs. coverage: Adding more APs does not always help — more APs on the same channel = more contention. Use channel planning and 5GHz/6GHz bands to add capacity",
      "Bluetooth and IoT interference: Bluetooth uses 2.4GHz — can interfere with Wi-Fi. Microwaves, cordless phones, baby monitors also use 2.4GHz. Use 5GHz to avoid"
    ],
    commands: [
      { cmd: "iwconfig wlan0", desc: "Linux — show current wireless connection details including signal level and noise" },
      { cmd: "netsh wlan show interfaces", desc: "Windows — display wireless adapter status, signal quality, channel, and BSSID" },
      { cmd: "wavemon", desc: "Linux — real-time wireless monitoring showing signal strength, noise, and link quality" },
      { cmd: "airport -s", desc: "macOS — scan for wireless networks showing RSSI, channel, and security type" }
    ],
    memoryTip: "2.4GHz non-overlapping channels: 1, 6, 11 — memorize this, it is on every exam. Think of them as 'the three clean lanes on the highway.' Everything in between (2, 3, 4, 5, 7, 8, 9, 10) causes adjacent channel interference — never use them. For signal: -30 dBm = amazing, -67 dBm = good for VoIP, -80 dBm = poor, -90 dBm = unusable.",
    examTip: "If users in one area have slow Wi-Fi but others do not — check for co-channel or adjacent channel interference, or check AP coverage overlap. 2.4GHz channels 1, 6, 11 is tested on every exam. If a microwave oven disrupts the network — 2.4GHz interference, move to 5GHz. Sticky client = user moves but device stays connected to far-away AP."
  }

};
