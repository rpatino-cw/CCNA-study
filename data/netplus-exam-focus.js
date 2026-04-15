/**
 * netplus-exam-focus.js — Per-topic CompTIA Network+ N10-009 exam intelligence.
 * What CompTIA tests, how they test it, what PBQs to expect, and what to drill.
 */
window.npExamFocus = {

  /* ══ DOMAIN 1 — NETWORKING CONCEPTS (24%) ════════════════════ */

  "1.1": {
    whatTheyAsk: "Which OSI layer does protocol X operate at? Map a protocol to the correct TCP/IP layer.",
    questionTypes: ["Layer identification", "Protocol-to-layer mapping", "PDU naming"],
    labWarning: null,
    drillThis: ["OSI layers 1-7 with mnemonics", "TCP/IP 4-layer mapping to OSI", "PDUs: Bits → Frames → Packets → Segments → Data", "Which layer: switch=2, router=3, firewall=3-7"],
    commonTrap: "Session layer (L5) is the most confused. It manages sessions/connections — think NetBIOS, RPC, not HTTP."
  },
  "1.2": {
    whatTheyAsk: "What port does HTTPS use? Which protocol uses UDP?",
    questionTypes: ["Port number matching", "TCP vs UDP identification", "Protocol purpose"],
    labWarning: null,
    drillThis: ["FTP=20/21, SSH=22, Telnet=23, SMTP=25, DNS=53, DHCP=67/68, HTTP=80, POP3=110, IMAP=143, HTTPS=443, SNMP=161, RDP=3389, SIP=5060", "TCP: connection-oriented, reliable. UDP: connectionless, fast"],
    commonTrap: "DNS uses BOTH TCP (53) and UDP (53). UDP for queries, TCP for zone transfers. CompTIA loves this."
  },
  "1.3": {
    whatTheyAsk: "Explain the difference between unicast, multicast, and broadcast. What is anycast?",
    questionTypes: ["Traffic type comparison", "IP range identification"],
    labWarning: null,
    drillThis: ["Unicast=one-to-one, Broadcast=one-to-all, Multicast=one-to-many, Anycast=one-to-nearest", "Multicast range: 224.0.0.0 - 239.255.255.255", "Anycast is used in IPv6 and CDNs"],
    commonTrap: "Anycast delivers to the NEAREST member, not all members. It's NOT broadcast or multicast."
  },
  "1.4": {
    whatTheyAsk: "Given a /26 network, how many usable hosts? What's the broadcast address of 192.168.1.64/26?",
    questionTypes: ["Subnet calculation", "CIDR to subnet mask conversion", "Network/broadcast identification"],
    labWarning: "PBQ: configure IP addresses on devices in a given subnet scheme.",
    drillThis: ["/24=256, /25=128, /26=64, /27=32, /28=16, /29=8, /30=4", "Usable hosts = 2^host_bits - 2", "Private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16", "APIPA: 169.254.0.0/16 = DHCP failure"],
    commonTrap: "Always subtract 2 for usable hosts (network address + broadcast). /30 = 2 usable hosts, not 4."
  },
  "1.5": {
    whatTheyAsk: "What's the benefit of SD-WAN over traditional WAN? What does NFV accomplish?",
    questionTypes: ["Technology comparison", "Benefit identification", "SDN concepts"],
    labWarning: null,
    drillThis: ["SD-WAN: centralized control, uses cheap internet links, application-aware routing", "SDN: separates control plane from data plane", "NFV: virtualizes network appliances (firewall, load balancer) on standard hardware"],
    commonTrap: "SD-WAN is NOT just a VPN. It intelligently routes traffic across multiple WAN links based on application."
  },
  "1.6": {
    whatTheyAsk: "What's the difference between IaaS, PaaS, and SaaS? What is a hybrid cloud?",
    questionTypes: ["Cloud model comparison", "Deployment model matching", "Responsibility matrix"],
    labWarning: null,
    drillThis: ["IaaS=you manage OS+up (AWS EC2), PaaS=you manage app+data (Heroku), SaaS=provider manages all (Gmail)", "Public=shared, Private=dedicated, Hybrid=mix, Community=shared by similar orgs"],
    commonTrap: "PaaS vs IaaS: if you're choosing the OS, it's IaaS. If the platform is given and you just deploy code, it's PaaS."
  },
  "1.7": {
    whatTheyAsk: "Which topology provides the most redundancy? What's a disadvantage of mesh topology?",
    questionTypes: ["Topology identification", "Advantage/disadvantage matching"],
    labWarning: null,
    drillThis: ["Star: central switch, single point of failure", "Mesh: full=every device connected, partial=some redundancy", "Bus: single cable, legacy", "Ring: token passing, FDDI", "Hub-and-spoke: WAN, central site"],
    commonTrap: "Full mesh connections = n(n-1)/2. For 10 devices that's 45 links. Very expensive."
  },
  "1.8": {
    whatTheyAsk: "What is 802.1Q used for? What's the purpose of a native VLAN?",
    questionTypes: ["VLAN concept", "Trunk protocol identification", "Configuration scenario"],
    labWarning: "PBQ: configure VLANs and trunks on switches.",
    drillThis: ["802.1Q = VLAN tagging on trunk links (4-byte tag in frame)", "Native VLAN = untagged traffic on trunk", "Access port = one VLAN, Trunk port = multiple VLANs", "VLAN hopping attack: mitigated by setting native VLAN to unused"],
    commonTrap: "Native VLAN mismatch between trunk endpoints causes traffic leaks. Always match on both sides."
  },

  /* ══ DOMAIN 2 — NETWORK IMPLEMENTATION (19%) ════════════════ */

  "2.1": {
    whatTheyAsk: "What type of cable connects a switch to a router? What's the max distance for Cat6a at 10Gbps?",
    questionTypes: ["Cable selection", "Distance/speed specs", "Connector identification"],
    labWarning: "PBQ: select the correct cable type for a network diagram.",
    drillThis: ["Cat5e=1Gbps/100m, Cat6=10Gbps/55m, Cat6a=10Gbps/100m", "Fiber: single-mode=long(km), multimode=short(hundreds of meters)", "Coax: RG-6 for cable TV/internet", "Straight-through: unlike devices. Crossover: like devices (mostly irrelevant with Auto-MDIX)"],
    commonTrap: "Cat6 only does 10Gbps to 55 meters, NOT 100m. Cat6a extends 10Gbps to full 100m."
  },
  "2.2": {
    whatTheyAsk: "Describe the DHCP DORA process. What does a DHCP relay agent do?",
    questionTypes: ["Process ordering", "Configuration", "Troubleshooting DHCP failure"],
    labWarning: null,
    drillThis: ["DORA: Discover (broadcast) → Offer → Request → Acknowledge", "DHCP relay (ip helper-address): forwards DHCP broadcasts across subnets to a remote server", "DHCP ports: server=67, client=68"],
    commonTrap: "DHCP Discover is a BROADCAST. If DHCP server is on a different subnet, you NEED a relay agent."
  },
  "2.3": {
    whatTheyAsk: "What DNS record resolves a hostname to an IPv4 address? What is a CNAME record?",
    questionTypes: ["Record type matching", "DNS hierarchy", "Resolution process"],
    labWarning: null,
    drillThis: ["A=IPv4, AAAA=IPv6, CNAME=alias, MX=mail, PTR=reverse, NS=nameserver, SOA=authority, TXT=SPF/DKIM/DMARC", "Internal vs external DNS", "DNS forwarder and conditional forwarding"],
    commonTrap: "A CNAME cannot coexist with other records at the same name. If you have a CNAME, it must be the ONLY record."
  },
  "2.4": {
    whatTheyAsk: "Configure an OSPF area. What routing protocol uses Dijkstra's algorithm?",
    questionTypes: ["Protocol comparison (OSPF vs EIGRP vs RIP vs BGP)", "Metric identification", "Configuration"],
    labWarning: "PBQ: configure basic routing between networks.",
    drillThis: ["OSPF: link-state, cost metric, Dijkstra, AD=110", "EIGRP: hybrid, composite metric, Cisco (now open), AD=90", "RIP: distance-vector, hop count (max 15), AD=120", "BGP: path-vector, AS path, internet backbone, AD=20(eBGP)/200(iBGP)"],
    commonTrap: "RIP max hop count is 15. 16 = unreachable. This limits RIP to small networks."
  },

  /* ══ DOMAIN 3 — NETWORK OPERATIONS (16%) ═════════════════════ */

  "3.1": {
    whatTheyAsk: "What SNMP version provides encryption? What's the difference between a trap and a get?",
    questionTypes: ["Version comparison", "Operation type identification", "Syslog severity"],
    labWarning: null,
    drillThis: ["SNMPv1: community string, no encryption", "SNMPv2c: bulk operations, still no encryption", "SNMPv3: authentication + encryption", "Trap=device pushes alert. Get=manager polls device", "Syslog: 0=Emergency to 7=Debug"],
    commonTrap: "SNMPv2c does NOT have encryption. Only v3 encrypts. CompTIA tests this distinction heavily."
  },
  "3.2": {
    whatTheyAsk: "What is the 3-2-1 backup rule? What's the difference between full, incremental, and differential?",
    questionTypes: ["Backup strategy comparison", "Disaster recovery concepts", "RTO vs RPO"],
    labWarning: null,
    drillThis: ["3-2-1: 3 copies, 2 different media, 1 offsite", "Full=everything, Incremental=since last backup, Differential=since last full", "RPO=max data loss tolerated, RTO=max downtime tolerated"],
    commonTrap: "Incremental is faster to BACKUP but slower to RESTORE (needs full + all incrementals). Differential is the opposite."
  },
  "3.3": {
    whatTheyAsk: "What's the purpose of an SLA? What does MTTR measure?",
    questionTypes: ["Metric definition", "SLA components", "High availability concepts"],
    labWarning: null,
    drillThis: ["MTBF=mean time between failures (reliability)", "MTTR=mean time to repair (how fast you fix)", "SLA: uptime guarantees (99.9%=8.76hrs downtime/year)", "Five nines (99.999%) = 5.26 min downtime/year"],
    commonTrap: "MTBF measures reliability of hardware. MTTR measures your team's response speed. They're independent."
  },
  "3.4": {
    whatTheyAsk: "What's the difference between RADIUS and TACACS+? What are the AAA components?",
    questionTypes: ["Protocol comparison", "AAA framework", "802.1X roles"],
    labWarning: null,
    drillThis: ["Authentication=who, Authorization=what allowed, Accounting=what did", "RADIUS: UDP 1812/1813, encrypts password only, combines auth+authz", "TACACS+: TCP 49, encrypts entire payload, separates AAA functions"],
    commonTrap: "RADIUS combines authentication and authorization in one step. TACACS+ separates them. CompTIA asks this."
  },
  "3.5": {
    whatTheyAsk: "What command shows the ARP table? How do you flush DNS cache?",
    questionTypes: ["CLI tool matching", "Output interpretation", "Troubleshooting steps"],
    labWarning: "PBQ: use network commands to diagnose connectivity issues.",
    drillThis: ["ping=reachability, traceroute=path, nslookup/dig=DNS, arp -a=ARP table, netstat=connections", "ipconfig /flushdns (Windows), systemd-resolve --flush-caches (Linux)", "pathping=combines ping+traceroute on Windows"],
    commonTrap: "tracert (Windows) vs traceroute (Linux). Same concept, different command and default protocol (ICMP vs UDP)."
  },

  /* ══ DOMAIN 4 — NETWORK SECURITY (19%) ═══════════════════════ */

  "4.1": {
    whatTheyAsk: "What type of attack floods a switch's MAC table? How do you mitigate VLAN hopping?",
    questionTypes: ["Attack identification", "Mitigation matching", "Attack category"],
    labWarning: null,
    drillThis: ["MAC flooding → port security", "ARP spoofing → DAI (Dynamic ARP Inspection)", "DHCP starvation → DHCP snooping", "VLAN hopping → disable DTP, set native VLAN to unused", "Rogue AP → wireless intrusion detection"],
    commonTrap: "VLAN hopping has TWO methods: switch spoofing (DTP) and double-tagging. Different mitigations for each."
  },
  "4.2": {
    whatTheyAsk: "What does a NGFW do that a traditional firewall doesn't? Where do you place an IPS?",
    questionTypes: ["Device comparison", "Placement decisions", "Security zone concepts"],
    labWarning: null,
    drillThis: ["Firewall: stateful packet filtering (L3/4)", "NGFW: adds app awareness, IPS, URL filtering (L7)", "IDS: detects + alerts (passive, out-of-band)", "IPS: detects + blocks (inline)", "DMZ: between internal and external firewall"],
    commonTrap: "IDS is PASSIVE (only alerts). IPS is INLINE (actively blocks). Placing IDS inline doesn't make it IPS."
  },
  "4.3": {
    whatTheyAsk: "Write an ACL that blocks telnet to a server. What's the implicit deny?",
    questionTypes: ["ACL writing", "Rule ordering", "Wildcard masks"],
    labWarning: "PBQ: write and apply ACLs to filter traffic.",
    drillThis: ["Standard ACL: source only, place near destination", "Extended ACL: source+dest+port+protocol, place near source", "Rule order matters — first match wins", "Implicit deny all at the bottom of every ACL"],
    commonTrap: "ACLs process top-down, first match wins. A broad permit at the top defeats specific deny rules below."
  },
  "4.4": {
    whatTheyAsk: "What's the difference between WPA2-Personal and WPA2-Enterprise? What does WPA3 add?",
    questionTypes: ["Security standard comparison", "Encryption identification", "802.1X concepts"],
    labWarning: null,
    drillThis: ["WPA2-Personal: PSK (everyone shares same password)", "WPA2-Enterprise: 802.1X + RADIUS (unique credentials per user)", "WPA3-Personal: SAE (forward secrecy)", "WPA3-Enterprise: 192-bit minimum", "Open networks: OWE (Opportunistic Wireless Encryption) in WPA3"],
    commonTrap: "WEP is completely broken — never the right answer. WPA (TKIP) is deprecated. Only WPA2/WPA3 are current."
  },
  "4.3": {
    whatTheyAsk: "Write an ACL that blocks telnet to a server. What's the implicit deny?",
    questionTypes: ["ACL writing", "Rule ordering", "Wildcard masks"],
    labWarning: "PBQ: write and apply ACLs to filter traffic.",
    drillThis: ["Standard ACL: source only, place near destination", "Extended ACL: source+dest+port+protocol, place near source", "Rule order matters — first match wins", "Implicit deny all at the bottom of every ACL"],
    commonTrap: "ACLs process top-down, first match wins. A broad permit at the top defeats specific deny rules below."
  },

  /* ══ DOMAIN 5 — NETWORK TROUBLESHOOTING (22%) ═══════════════ */

  "5.1": {
    whatTheyAsk: "A user can't reach the internet. Walk through the troubleshooting methodology.",
    questionTypes: ["Methodology ordering", "Scenario diagnosis", "Tool selection"],
    labWarning: "PBQ: troubleshoot connectivity using CLI tools.",
    drillThis: ["CompTIA methodology: Identify → Theory → Test → Plan → Implement → Verify → Document", "Bottom-up: start at Layer 1 (cable), work up", "Top-down: start at Layer 7 (app), work down", "Divide-and-conquer: start at Layer 3, go up or down based on result"],
    commonTrap: "CompTIA's methodology has 7 steps. 'Document findings' is the LAST step. Never skip it on the exam."
  },
  "5.2": {
    whatTheyAsk: "You see high latency on a link. What tool helps identify where the delay is?",
    questionTypes: ["Tool selection", "Metric interpretation", "Baseline comparison"],
    labWarning: null,
    drillThis: ["Latency: delay in ms. Jitter: variation in latency", "Throughput vs bandwidth: actual vs theoretical", "traceroute shows per-hop latency", "Baseline: know normal performance to detect abnormal"],
    commonTrap: "High bandwidth doesn't mean low latency. A satellite link has high bandwidth but 600ms+ latency."
  },
  "5.3": {
    whatTheyAsk: "A PC has a 169.254.x.x address. What's the problem?",
    questionTypes: ["Symptom diagnosis", "DHCP troubleshooting", "IP configuration issues"],
    labWarning: "PBQ: diagnose why a host can't get an IP address.",
    drillThis: ["169.254.x.x = APIPA = DHCP failure", "Check: DHCP server running? Port blocked? Relay agent configured?", "Duplicate IP: gratuitous ARP detects this", "Incorrect subnet mask: host thinks destinations are local when they're remote"],
    commonTrap: "169.254.x.x is NOT a sign of no network cable. It means DHCP failed. The link is UP but no server responded."
  },
  "5.4": {
    whatTheyAsk: "Users on VLAN 10 can't reach VLAN 20. What should you check?",
    questionTypes: ["VLAN troubleshooting", "Trunk verification", "Inter-VLAN routing"],
    labWarning: "PBQ: fix VLAN connectivity issues.",
    drillThis: ["Is inter-VLAN routing configured? (router-on-a-stick or L3 switch SVI)", "Trunk link: is the VLAN allowed on the trunk?", "Port VLAN assignment: is the port in the correct VLAN?", "show vlan brief / show interfaces trunk"],
    commonTrap: "Even if VLANs exist, without a router or L3 switch doing inter-VLAN routing, they CANNOT communicate."
  },
  "5.5": {
    whatTheyAsk: "A wireless client connects but can't get an IP. What's the most likely cause?",
    questionTypes: ["Wireless troubleshooting", "Channel interference", "SSID/security mismatch"],
    labWarning: null,
    drillThis: ["Check SSID, security mode (WPA2/WPA3), password", "Channel overlap: 2.4GHz use 1, 6, 11 only", "Signal strength: -30dBm=excellent, -67dBm=good, -80dBm=poor", "DHCP scope exhausted or relay not configured for wireless VLAN"],
    commonTrap: "Non-overlapping 2.4GHz channels are 1, 6, and 11 ONLY. Using channels 2-5 or 7-10 causes interference."
  }
};
