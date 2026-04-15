/**
 * exam-focus.js — Per-topic CCNA 200-301 exam intelligence.
 * What Cisco tests, how they test it, what labs to expect, and what to drill.
 */
window.examFocus = {

  /* ══ DOMAIN 1 — NETWORK FUNDAMENTALS (20%) ═══════════════════ */

  "1.1": {
    whatTheyAsk: "Which OSI layer does device X operate at? What protocol does a WLC use with lightweight APs?",
    questionTypes: ["Layer identification", "Device role matching", "PoE standard wattage"],
    labWarning: null,
    drillThis: ["L2 switch vs L3 switch", "IPS vs IDS", "Autonomous AP vs lightweight AP", "PoE: 802.3af=15.4W, 802.3at=30W, 802.3bt=60/90W"],
    commonTrap: "Confusing L2 and L3 switch capabilities. L2 cannot route between VLANs."
  },
  "1.2": {
    whatTheyAsk: "Which topology is used in data centers? How many tiers does a campus network use?",
    questionTypes: ["Topology identification", "Scenario matching"],
    labWarning: null,
    drillThis: ["Spine-leaf = every leaf connects to every spine", "Two-tier vs three-tier", "WAN vs LAN scope"],
    commonTrap: "Spine-leaf has NO leaf-to-leaf connections. That's the whole point."
  },
  "1.3": {
    whatTheyAsk: "What cable type connects a switch to a router? What's the max distance for single-mode fiber?",
    questionTypes: ["Cable selection", "Distance/speed limits", "Connector identification"],
    labWarning: null,
    drillThis: ["Single-mode: long distance, small core. Multimode: short distance, large core", "Cat5e=1Gbps/100m, Cat6=10Gbps/55m, Cat6a=10Gbps/100m"],
    commonTrap: "Auto-MDIX makes crossover vs straight-through mostly irrelevant, but the exam still tests the concept."
  },
  "1.4": {
    whatTheyAsk: "You see CRC errors increasing on an interface. What's the likely cause? What does 'up/down' mean?",
    questionTypes: ["Troubleshooting output", "Interface status codes", "Error identification"],
    labWarning: "Sim question: read 'show interfaces' output and identify the problem.",
    drillThis: ["up/up, up/down, down/down, admin down meanings", "Duplex mismatch symptoms: late collisions, CRC errors", "Runts < 64 bytes, Giants > 1518 bytes"],
    commonTrap: "up/down means physical is up but protocol is down — usually a Layer 2 issue (encapsulation mismatch, keepalives)."
  },
  "1.5": {
    whatTheyAsk: "Which transport protocol does DNS use? What's the TCP three-way handshake sequence?",
    questionTypes: ["Protocol identification", "Port number matching", "TCP vs UDP comparison"],
    labWarning: null,
    drillThis: ["TCP: SYN, SYN-ACK, ACK", "FTP=20/21, SSH=22, Telnet=23, HTTP=80, HTTPS=443", "DNS=53(both), DHCP=67/68, TFTP=69, NTP=123, SNMP=161/162, Syslog=514"],
    commonTrap: "DNS uses BOTH TCP and UDP on port 53. UDP for queries, TCP for zone transfers."
  },
  "1.6": {
    whatTheyAsk: "Given 192.168.10.0/26, how many usable hosts? What's the subnet mask for /20?",
    questionTypes: ["Subnet calculation", "VLSM design", "Address identification (network/broadcast/host)"],
    labWarning: "Sim: configure IPv4 addresses on router interfaces given a subnet requirement.",
    drillThis: ["Magic number method for fast subnetting", "Private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16", "Know /24 through /30 cold"],
    commonTrap: "Forgetting to subtract 2 for usable hosts (network + broadcast). /30 = 2 usable, not 4."
  },
  "1.7": {
    whatTheyAsk: "What's the IPv6 address type for FE80::? How do you shorten an IPv6 address?",
    questionTypes: ["Address type identification", "Address shortening rules", "EUI-64 calculation"],
    labWarning: "Sim: configure IPv6 on router interfaces.",
    drillThis: ["Link-local: FE80::/10", "Global unicast: 2000::/3", "Multicast: FF00::/8", "Loopback: ::1", "EUI-64: insert FFFE, flip 7th bit"],
    commonTrap: "You can only omit LEADING zeros in each group, and :: can only appear ONCE."
  },
  "1.8": {
    whatTheyAsk: "What happens at each step of the TCP handshake? How does a switch populate its MAC table?",
    questionTypes: ["Process ordering", "Frame vs packet identification"],
    labWarning: null,
    drillThis: ["Switch: learn source MAC, forward based on dest MAC", "If dest unknown → flood all ports except source", "ARP: broadcast request, unicast reply"],
    commonTrap: "Switches learn from SOURCE MAC, forward based on DESTINATION MAC. Not the other way around."
  },
  "1.9": {
    whatTheyAsk: "PC A sends a packet to PC B on a different subnet. Describe the MAC and IP addresses at each hop.",
    questionTypes: ["Packet walk-through", "MAC rewriting at each hop", "ARP process"],
    labWarning: null,
    drillThis: ["Source/dest IP stays the same end-to-end", "Source/dest MAC changes at every L3 hop", "Router decrements TTL at each hop"],
    commonTrap: "IP addresses DON'T change (unless NAT). Only MAC addresses change at each router hop."
  },
  "1.10": {
    whatTheyAsk: "How do you verify IPv6 is enabled? What does 'show ipv6 interface brief' show?",
    questionTypes: ["Verification commands", "IPv6 configuration"],
    labWarning: "Sim: verify IPv6 connectivity using show commands.",
    drillThis: ["ipv6 unicast-routing (global)", "ipv6 address on interfaces", "show ipv6 interface brief", "show ipv6 route"],
    commonTrap: "IPv6 is NOT enabled by default on Cisco routers — you must enable 'ipv6 unicast-routing'."
  },
  "1.11": {
    whatTheyAsk: "Which wireless standard supports 5GHz only? What's the max speed of 802.11ac?",
    questionTypes: ["Standard matching (frequency, speed)", "SSID/channel concepts"],
    labWarning: null,
    drillThis: ["802.11a=5GHz/54Mbps", "802.11b=2.4GHz/11Mbps", "802.11g=2.4GHz/54Mbps", "802.11n=both/600Mbps", "802.11ac=5GHz/6.9Gbps", "802.11ax=both/9.6Gbps"],
    commonTrap: "802.11a and 802.11ac are 5GHz ONLY. Easy to confuse 'a' with 'b' (which is 2.4GHz)."
  },
  "1.12": {
    whatTheyAsk: "What type of address is 224.0.0.5? What's the loopback address?",
    questionTypes: ["Address classification", "Special address identification"],
    labWarning: null,
    drillThis: ["127.0.0.0/8 = loopback", "224.0.0.0/4 = multicast", "169.254.0.0/16 = APIPA (link-local)", "255.255.255.255 = limited broadcast"],
    commonTrap: "APIPA (169.254.x.x) means DHCP failed — it's NOT a valid configured address."
  },
  "1.13": {
    whatTheyAsk: "What are the benefits of virtualizing network functions?",
    questionTypes: ["Concept comparison", "Benefit identification"],
    labWarning: null,
    drillThis: ["VM vs container", "Type 1 hypervisor (bare-metal) vs Type 2 (hosted)", "NFV separates network functions from hardware"],
    commonTrap: "Type 1 hypervisors run directly on hardware (ESXi). Type 2 runs on top of an OS (VirtualBox)."
  },

  /* ══ DOMAIN 2 — NETWORK ACCESS (20%) ═════════════════════════ */

  "2.1": {
    whatTheyAsk: "What command creates VLAN 10? How do you assign a switchport to a VLAN?",
    questionTypes: ["Configuration commands", "VLAN assignment", "Verification"],
    labWarning: "Sim: create VLANs and assign ports. Very common sim question.",
    drillThis: ["vlan 10 / name SALES", "interface range gi0/1-5 / switchport mode access / switchport access vlan 10", "show vlan brief"],
    commonTrap: "Default VLAN 1 cannot be deleted. All ports start in VLAN 1."
  },
  "2.2": {
    whatTheyAsk: "What's the difference between access and trunk ports? What encapsulation does 802.1Q use?",
    questionTypes: ["Port mode comparison", "Trunk configuration", "Native VLAN"],
    labWarning: "Sim: configure trunk links between switches.",
    drillThis: ["switchport mode trunk / switchport trunk allowed vlan 10,20", "802.1Q inserts 4-byte tag into frame", "Native VLAN = untagged traffic"],
    commonTrap: "Native VLAN mismatch between switches causes traffic to go to wrong VLAN. Must match on both sides."
  },
  "2.3": {
    whatTheyAsk: "Which switch becomes root bridge? What determines root bridge election?",
    questionTypes: ["Root bridge election", "Port role identification", "STP state transitions"],
    labWarning: null,
    drillThis: ["Lowest bridge ID (priority + MAC) wins", "Default priority = 32768", "Root port → Designated port → Blocked port", "STP states: Blocking → Listening → Learning → Forwarding"],
    commonTrap: "Bridge ID = priority + VLAN + MAC. Lowest wins. If priorities tie, lowest MAC wins."
  },
  "2.4": {
    whatTheyAsk: "What's the difference between RSTP and STP? What are the RSTP port roles?",
    questionTypes: ["Protocol comparison", "Convergence time", "Port role matching"],
    labWarning: null,
    drillThis: ["RSTP (802.1w) converges in seconds vs STP (802.1D) 30-50 seconds", "RSTP roles: Root, Designated, Alternate, Backup", "RSTP states: Discarding, Learning, Forwarding"],
    commonTrap: "RSTP's 'Alternate' port = STP's 'Blocked' port. RSTP's 'Discarding' = STP's 'Blocking + Listening'."
  },
  "2.5": {
    whatTheyAsk: "What's the benefit of EtherChannel? What protocol negotiates LACP?",
    questionTypes: ["Protocol identification (LACP vs PAgP)", "Configuration mode", "Load balancing"],
    labWarning: "Sim: configure LACP EtherChannel between two switches.",
    drillThis: ["LACP (802.3ad) = open standard. PAgP = Cisco only", "channel-group 1 mode active (LACP) or desirable (PAgP)", "All interfaces must match: speed, duplex, VLAN, trunk mode"],
    commonTrap: "If ANY parameter mismatches between member interfaces, the EtherChannel won't form."
  },
  "2.6": {
    whatTheyAsk: "What's the difference between autonomous and lightweight APs? What protocol do they use?",
    questionTypes: ["Architecture comparison", "CAPWAP function"],
    labWarning: null,
    drillThis: ["Autonomous = standalone config. Lightweight = WLC-managed via CAPWAP", "CAPWAP uses UDP 5246 (control) and 5247 (data)", "Split-MAC: WLC handles management, AP handles real-time frames"],
    commonTrap: "CAPWAP encapsulates ALL wireless traffic back to the WLC — creates a tunnel."
  },
  "2.7": {
    whatTheyAsk: "What does a WLC manage? Where do you configure WPA2 in a WLC deployment?",
    questionTypes: ["WLC vs AP responsibilities", "Wireless security configuration"],
    labWarning: null,
    drillThis: ["WLC: security policies, RF management, roaming, firmware", "AP: encryption/decryption, 802.11 framing, beacons/probes", "WLC interface types: management, AP-manager, dynamic, service"],
    commonTrap: "Security policies (WPA2, 802.1X) are configured on the WLC, not individual APs."
  },
  "2.8": {
    whatTheyAsk: "What's the difference between WPA2-Personal and WPA2-Enterprise?",
    questionTypes: ["Security mode comparison", "Protocol identification"],
    labWarning: null,
    drillThis: ["WPA2-Personal = PSK (pre-shared key)", "WPA2-Enterprise = 802.1X + RADIUS server", "WPA3 adds SAE (replaces PSK) and 192-bit for enterprise", "TKIP is deprecated; AES-CCMP is the standard"],
    commonTrap: "WPA2-Personal uses the SAME key for everyone. Enterprise uses unique credentials per user via RADIUS."
  },
  "2.9": {
    whatTheyAsk: "Given an interface showing 'err-disabled', what happened? How do you recover?",
    questionTypes: ["Troubleshooting", "Status interpretation", "Recovery commands"],
    labWarning: null,
    drillThis: ["show interfaces status — look for err-disabled", "Common causes: BPDU guard, port security violation, duplex mismatch", "Recovery: shutdown / no shutdown after fixing root cause"],
    commonTrap: "'err-disabled' doesn't auto-recover. You must manually bounce the interface after fixing the problem."
  },

  /* ══ DOMAIN 3 — IP CONNECTIVITY (25%) ════════════════════════ */

  "3.1": {
    whatTheyAsk: "What's the admin distance of OSPF vs EIGRP vs static? Which route wins?",
    questionTypes: ["AD comparison", "Route selection", "Routing table interpretation"],
    labWarning: null,
    drillThis: ["Connected=0, Static=1, EIGRP=90, OSPF=110, RIP=120, External EIGRP=170, iBGP=200", "Lowest AD wins", "Longest prefix match takes priority over AD"],
    commonTrap: "Longest prefix match ALWAYS wins over admin distance. /30 beats /24 even if AD is higher."
  },
  "3.2": {
    whatTheyAsk: "Configure a static route to 10.0.0.0/8 via next-hop 192.168.1.1.",
    questionTypes: ["Static route configuration", "Default route", "Floating static"],
    labWarning: "Sim: configure static and default routes on a router.",
    drillThis: ["ip route 10.0.0.0 255.0.0.0 192.168.1.1", "Default: ip route 0.0.0.0 0.0.0.0 <next-hop>", "Floating static: add higher AD — ip route ... 210"],
    commonTrap: "Floating static route must have AD HIGHER than the primary route to act as backup."
  },
  "3.3": {
    whatTheyAsk: "What is 'show ip route' showing you? What does [110/20] mean?",
    questionTypes: ["Output interpretation", "Route code meaning", "Metric/AD reading"],
    labWarning: "Sim: verify routing with show ip route.",
    drillThis: ["C=connected, S=static, O=OSPF, D=EIGRP, R=RIP, *=default", "[AD/metric]", "Gateway of last resort line"],
    commonTrap: "'S*' means static default route. The asterisk (*) marks it as the gateway of last resort."
  },
  "3.4": {
    whatTheyAsk: "Configure single-area OSPF. What's the OSPF hello timer on a broadcast network?",
    questionTypes: ["OSPF configuration", "Timer values", "Neighbor state identification"],
    labWarning: "Sim: configure OSPF on multiple routers. Most common Domain 3 sim.",
    drillThis: ["router ospf 1 / network 10.0.0.0 0.0.0.255 area 0", "Hello=10s (broadcast), Dead=40s", "Neighbor states: Down → Init → 2-Way → ExStart → Exchange → Loading → Full", "OSPF requirements: matching hello/dead timers, area, subnet, authentication"],
    commonTrap: "Hello/dead timer mismatch = neighbors won't form. Dead timer must be exactly 4x hello by default."
  },
  "3.5": {
    whatTheyAsk: "What is the purpose of inter-VLAN routing? What's a router-on-a-stick?",
    questionTypes: ["Concept explanation", "Configuration comparison (SVI vs router-on-a-stick)"],
    labWarning: "Sim: configure router-on-a-stick with subinterfaces.",
    drillThis: ["Router-on-a-stick: one trunk link, subinterfaces per VLAN", "interface g0/0.10 / encapsulation dot1q 10 / ip address ...", "SVI: interface vlan 10 / ip address ... / ip routing"],
    commonTrap: "Subinterface number doesn't have to match VLAN ID, but it's best practice and the exam expects it."
  },

  /* ══ DOMAIN 4 — IP SERVICES (10%) ════════════════════════════ */

  "4.1": {
    whatTheyAsk: "Configure NAT to translate inside local to inside global. What's PAT?",
    questionTypes: ["NAT type identification", "Configuration", "Inside/outside concepts"],
    labWarning: "Sim: configure static NAT or PAT on a router.",
    drillThis: ["Static NAT: 1-to-1 mapping", "Dynamic NAT: pool of addresses", "PAT (overload): many-to-one using ports", "ip nat inside / ip nat outside on interfaces"],
    commonTrap: "Inside local = private IP of internal host. Inside global = public IP seen by outside. Don't mix these up."
  },
  "4.2": {
    whatTheyAsk: "What port does NTP use? How do you configure a router as an NTP client?",
    questionTypes: ["Port identification", "Configuration commands", "Protocol purpose"],
    labWarning: null,
    drillThis: ["NTP = UDP 123", "ntp server 10.0.0.1", "show ntp status / show ntp associations", "Stratum 0 = atomic clock, Stratum 1 = directly connected"],
    commonTrap: "Lower stratum = more accurate. Stratum 16 = unsynchronized (not usable)."
  },
  "4.3": {
    whatTheyAsk: "Describe the DHCP DORA process. What command makes a router a DHCP server?",
    questionTypes: ["DORA sequence", "DHCP configuration", "Relay agent"],
    labWarning: "Sim: configure a DHCP pool on a router.",
    drillThis: ["DORA: Discover (broadcast) → Offer → Request → Acknowledge", "ip dhcp pool NAME / network / default-router / dns-server", "ip helper-address for DHCP relay across subnets"],
    commonTrap: "DHCP Discover and Request are BROADCAST. Offer and Acknowledge are UNICAST (to the client's MAC)."
  },
  "4.4": {
    whatTheyAsk: "What protocol is used for network monitoring? What's an SNMP trap?",
    questionTypes: ["Protocol identification", "SNMP version comparison", "Syslog severity"],
    labWarning: null,
    drillThis: ["SNMP: get/set/trap. v2c=community strings. v3=authentication+encryption", "Syslog severity: 0=Emergency to 7=Debug", "logging host <ip> / logging trap <level>"],
    commonTrap: "Syslog 0 is most severe (emergency), 7 is least (debug). Lower number = worse problem."
  },
  "4.5": {
    whatTheyAsk: "What's the function of SSH vs Telnet? How do you enable SSH?",
    questionTypes: ["Protocol comparison", "SSH configuration steps"],
    labWarning: "Sim: configure SSH access on a router/switch.",
    drillThis: ["SSH = encrypted (port 22). Telnet = cleartext (port 23)", "hostname / ip domain-name / crypto key generate rsa / line vty 0 15 / transport input ssh"],
    commonTrap: "You must set a hostname AND domain name before generating RSA keys. Otherwise the command fails."
  },
  "4.6": {
    whatTheyAsk: "What's the difference between TFTP and FTP? When do you use each?",
    questionTypes: ["Protocol comparison", "Use case matching"],
    labWarning: null,
    drillThis: ["TFTP: UDP 69, no auth, simple file transfer (IOS upgrades)", "FTP: TCP 20/21, authentication, full-featured", "SCP: secure copy over SSH"],
    commonTrap: "TFTP has NO authentication and NO encryption. Only use on trusted networks."
  },
  "4.7": {
    whatTheyAsk: "A host can't reach the internet. Walk through the troubleshooting steps.",
    questionTypes: ["Troubleshooting methodology", "Ping/traceroute interpretation", "Layer-by-layer diagnosis"],
    labWarning: null,
    drillThis: ["Check IP/mask/gateway, then ping gateway, then ping DNS, then ping internet", "traceroute shows where packets stop", "show ip interface brief — look for down interfaces"],
    commonTrap: "Always check Layer 1 first (cable connected? Link light on?) before troubleshooting Layer 3."
  },
  "4.8": {
    whatTheyAsk: "What DNS record type resolves a hostname to an IPv4 address?",
    questionTypes: ["Record type identification", "DNS process"],
    labWarning: null,
    drillThis: ["A = IPv4, AAAA = IPv6, CNAME = alias, MX = mail, PTR = reverse lookup", "DNS uses UDP 53 for queries, TCP 53 for zone transfers", "ip name-server <ip> on Cisco devices"],
    commonTrap: "AAAA is for IPv6, not 'A with more bits'. The four As represent the four times larger address."
  },
  "4.9": {
    whatTheyAsk: "What QoS mechanism marks traffic at Layer 2 vs Layer 3?",
    questionTypes: ["QoS concept identification", "Marking comparison", "Trust boundary"],
    labWarning: null,
    drillThis: ["DSCP = Layer 3 marking (6 bits, 64 values)", "CoS = Layer 2 marking (3 bits, 802.1p in VLAN tag)", "PHB classes: EF=voice, AF=assured, CS=class selector, BE=best effort"],
    commonTrap: "CoS only works on trunk links (needs 802.1Q tag). Access ports can't carry CoS."
  },

  /* ══ DOMAIN 5 — SECURITY FUNDAMENTALS (15%) ══════════════════ */

  "5.1": {
    whatTheyAsk: "What security concepts does defense-in-depth address?",
    questionTypes: ["Concept identification", "Threat categorization"],
    labWarning: null,
    drillThis: ["CIA triad: Confidentiality, Integrity, Availability", "Threats: malware, phishing, DDoS, social engineering, insider", "Defense-in-depth: multiple layers of security"],
    commonTrap: "Integrity = data wasn't modified. Availability = systems are accessible. Don't confuse them."
  },
  "5.2": {
    whatTheyAsk: "What are the components of AAA? What protocol does 802.1X use?",
    questionTypes: ["AAA framework", "RADIUS vs TACACS+", "802.1X roles"],
    labWarning: null,
    drillThis: ["Authentication = who are you, Authorization = what can you do, Accounting = what did you do", "RADIUS: UDP 1812/1813, encrypts password only. TACACS+: TCP 49, encrypts entire packet", "802.1X: supplicant (client), authenticator (switch), auth server (RADIUS)"],
    commonTrap: "TACACS+ encrypts the ENTIRE packet. RADIUS only encrypts the password. Big security difference."
  },
  "5.3": {
    whatTheyAsk: "Write an ACL that permits 10.0.0.0/24 and denies everything else. Where do you apply it?",
    questionTypes: ["ACL writing", "Wildcard mask calculation", "Placement (standard vs extended)"],
    labWarning: "Sim: write and apply an ACL. Very common sim question.",
    drillThis: ["Standard ACL: filters on source IP only. Place close to destination", "Extended ACL: filters on source, dest, port, protocol. Place close to source", "Wildcard mask = inverse of subnet mask (0.0.0.255 for /24)", "Implicit deny all at the end of every ACL"],
    commonTrap: "Forgetting the implicit 'deny any' at the end. If you only write permit statements, everything else is blocked."
  },
  "5.4": {
    whatTheyAsk: "What does port security do? What happens on a violation?",
    questionTypes: ["Configuration", "Violation mode comparison", "Sticky MAC"],
    labWarning: "Sim: configure port security with max MAC addresses.",
    drillThis: ["switchport port-security / switchport port-security maximum 2", "Violation modes: protect (drop), restrict (drop+log), shutdown (err-disable)", "Sticky: switchport port-security mac-address sticky"],
    commonTrap: "Default violation mode is SHUTDOWN (err-disable). Most restrictive. Must manually re-enable."
  },
  "5.5": {
    whatTheyAsk: "What does DHCP snooping prevent? What's DAI?",
    questionTypes: ["Attack prevention matching", "Trust/untrust port concepts"],
    labWarning: null,
    drillThis: ["DHCP snooping: prevents rogue DHCP servers. Trusted ports = uplinks", "DAI (Dynamic ARP Inspection): prevents ARP spoofing using DHCP snooping binding table", "IP Source Guard: prevents IP spoofing"],
    commonTrap: "DHCP snooping must be enabled FIRST before DAI works — DAI depends on the snooping binding table."
  },
  "5.6": {
    whatTheyAsk: "What Layer 2 attacks does a switch face? How do you mitigate them?",
    questionTypes: ["Attack identification", "Mitigation matching"],
    labWarning: null,
    drillThis: ["MAC flooding → port security", "VLAN hopping → disable DTP, set native VLAN to unused", "ARP spoofing → DAI", "DHCP starvation → DHCP snooping"],
    commonTrap: "VLAN hopping uses DTP auto-negotiation. Mitigate by setting all ports to mode access or mode trunk explicitly."
  },
  "5.7": {
    whatTheyAsk: "How do you secure the management plane? What protects VTY lines?",
    questionTypes: ["Hardening steps", "Password/SSH configuration"],
    labWarning: "Sim: secure VTY lines with SSH and ACL.",
    drillThis: ["enable secret (not enable password — it's hashed)", "line vty 0 15 / login local / transport input ssh", "service password-encryption", "access-class ACL on VTY lines to restrict management access"],
    commonTrap: "'enable password' stores in cleartext. 'enable secret' uses MD5 hash. Always use 'enable secret'."
  },
  "5.8": {
    whatTheyAsk: "What's the difference between a site-to-site VPN and a remote-access VPN?",
    questionTypes: ["VPN type comparison", "Protocol identification"],
    labWarning: null,
    drillThis: ["Site-to-site: connects two networks (IPsec tunnel between routers/firewalls)", "Remote-access: single user to network (AnyConnect, SSL VPN)", "IPsec vs SSL/TLS VPN"],
    commonTrap: "Site-to-site VPNs are always-on between locations. Remote-access VPNs are on-demand per user."
  },
  "5.9": {
    whatTheyAsk: "What is WPA3-Personal? How does SAE improve over PSK?",
    questionTypes: ["Security standard comparison", "Encryption method identification"],
    labWarning: null,
    drillThis: ["WPA3-Personal: SAE (Simultaneous Auth of Equals) replaces PSK", "WPA3-Enterprise: 192-bit minimum encryption", "SAE = forward secrecy (past sessions can't be decrypted)"],
    commonTrap: "WPA3 SAE provides forward secrecy — even if the password is cracked later, captured traffic stays encrypted."
  },
  "5.10": {
    whatTheyAsk: "What does a RADIUS server do in an 802.1X deployment?",
    questionTypes: ["Role identification", "Process flow"],
    labWarning: null,
    drillThis: ["Supplicant → Authenticator → Auth Server", "EAP over 802.1X for authentication", "RADIUS server validates credentials and returns ACCEPT/REJECT"],
    commonTrap: "The switch (authenticator) doesn't make auth decisions — it just relays between supplicant and RADIUS."
  },

  /* ══ DOMAIN 6 — AUTOMATION & PROGRAMMABILITY (10%) ═══════════ */

  "6.1": {
    whatTheyAsk: "What's the benefit of SDN over traditional networking?",
    questionTypes: ["Concept comparison", "Benefit identification", "Plane separation"],
    labWarning: null,
    drillThis: ["3 planes: Data (forwarding), Control (routing decisions), Management (config/monitoring)", "SDN centralizes the control plane", "Benefits: programmability, agility, centralized policy"],
    commonTrap: "SDN separates the control plane from the data plane. Traditional networking has both on the same device."
  },
  "6.2": {
    whatTheyAsk: "What does Cisco DNA Center do? What's the difference between underlay and overlay?",
    questionTypes: ["Controller function", "Architecture concepts"],
    labWarning: null,
    drillThis: ["DNA Center: intent-based networking controller", "Underlay = physical network. Overlay = virtual/tunnel network on top", "DNA Center uses VXLAN for overlay, IS-IS for underlay"],
    commonTrap: "DNA Center is the CONTROLLER, not the network itself. It manages and automates the network."
  },
  "6.3": {
    whatTheyAsk: "What configuration management tool uses agentless SSH? What format does Ansible use?",
    questionTypes: ["Tool comparison (Puppet/Chef/Ansible/Terraform)", "Agent vs agentless"],
    labWarning: null,
    drillThis: ["Ansible: agentless, SSH, YAML playbooks", "Puppet: agent-based, Ruby, declarative", "Chef: agent-based, Ruby, imperative", "Terraform: infrastructure as code, HCL"],
    commonTrap: "Ansible is AGENTLESS (uses SSH). Puppet and Chef require agents installed on managed devices."
  },
  "6.4": {
    whatTheyAsk: "Compare JSON and XML. Which is more human-readable?",
    questionTypes: ["Format comparison", "Syntax identification", "Data structure reading"],
    labWarning: null,
    drillThis: ["JSON: key-value pairs, arrays, lighter weight", "XML: tags, attributes, more verbose", "YAML: indentation-based, most human-readable", "APIs commonly return JSON"],
    commonTrap: "JSON uses curly braces {} and square brackets []. YAML uses indentation. Don't mix syntaxes."
  },
  "6.5": {
    whatTheyAsk: "What HTTP method retrieves data from an API? What does a 201 status code mean?",
    questionTypes: ["REST method matching", "Status code identification", "API concept"],
    labWarning: null,
    drillThis: ["GET=read, POST=create, PUT=replace, PATCH=update, DELETE=delete", "200=OK, 201=Created, 400=Bad Request, 401=Unauthorized, 403=Forbidden, 404=Not Found, 500=Server Error", "REST is stateless — each request is independent"],
    commonTrap: "PUT replaces the ENTIRE resource. PATCH updates only the specified fields. They're not the same."
  },
  "6.6": {
    whatTheyAsk: "What's the difference between NETCONF and RESTCONF?",
    questionTypes: ["Protocol comparison", "Transport identification"],
    labWarning: null,
    drillThis: ["NETCONF: SSH (port 830), XML, YANG models", "RESTCONF: HTTPS, JSON/XML, YANG models", "Both use YANG data models to define config structure"],
    commonTrap: "RESTCONF is REST-like but NOT the same as a generic REST API. It specifically uses YANG models."
  },
  "6.7": {
    whatTheyAsk: "What is a YANG model? What does it define?",
    questionTypes: ["Concept definition", "Relationship to NETCONF/RESTCONF"],
    labWarning: null,
    drillThis: ["YANG = data modeling language for network config/state", "Defines what can be configured and what data looks like", "Used by both NETCONF and RESTCONF"],
    commonTrap: "YANG is NOT a protocol — it's a modeling LANGUAGE. NETCONF and RESTCONF are the protocols that USE it."
  }
};
