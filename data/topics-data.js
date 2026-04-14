window.topicsData = {
  "domains": [
    {
      "id": "1",
      "name": "Network Fundamentals",
      "weight": 20,
      "topics": [
        {
          "id": "1.1",
          "name": "Explain the role and function of network components",
          "subtopics": [
            { "id": "1.1.a", "name": "Routers" },
            { "id": "1.1.b", "name": "Layer 2 and Layer 3 switches" },
            { "id": "1.1.c", "name": "Next-generation firewalls and IPS" },
            { "id": "1.1.d", "name": "Access points" },
            { "id": "1.1.e", "name": "Controllers (WLC, Cisco DNA Center)" },
            { "id": "1.1.f", "name": "Endpoints" },
            { "id": "1.1.g", "name": "Servers" },
            { "id": "1.1.h", "name": "PoE (802.3af, 802.3at, 802.3bt)" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "1.2",
          "name": "Describe characteristics of network topology architectures",
          "subtopics": [
            { "id": "1.2.a", "name": "Two-tier (collapsed core)" },
            { "id": "1.2.b", "name": "Three-tier (access, distribution, core)" },
            { "id": "1.2.c", "name": "Spine-leaf (data center fabric)" },
            { "id": "1.2.d", "name": "WAN" },
            { "id": "1.2.e", "name": "Small office/home office (SOHO)" },
            { "id": "1.2.f", "name": "On-premises and cloud" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "1.3",
          "name": "Compare physical interface and cabling types",
          "subtopics": [
            { "id": "1.3.a", "name": "Single-mode fiber, multimode fiber, copper" },
            { "id": "1.3.b", "name": "Connections (Ethernet shared media and point-to-point)" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "1.4",
          "name": "Identify interface and cable issues (collisions, errors, mismatch duplex, and/or speed)",
          "subtopics": [
            { "id": "1.4.a", "name": "Collisions and late collisions" },
            { "id": "1.4.b", "name": "CRC errors and frame errors" },
            { "id": "1.4.c", "name": "Runts (< 64 bytes) and giants (> 1518 bytes)" },
            { "id": "1.4.d", "name": "Input errors, output errors, and interface resets" },
            { "id": "1.4.e", "name": "Duplex mismatch — half vs full duplex" },
            { "id": "1.4.f", "name": "Speed mismatch and auto-negotiation failures" },
            { "id": "1.4.g", "name": "Interface status codes — up/up, up/down, down/down, admin down" },
            { "id": "1.4.h", "name": "Verify with show interfaces and show interfaces status" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "1.5",
          "name": "Compare TCP to UDP",
          "subtopics": [
            { "id": "1.5.a", "name": "TCP — connection-oriented, reliable, ordered delivery" },
            { "id": "1.5.b", "name": "TCP three-way handshake — SYN, SYN-ACK, ACK" },
            { "id": "1.5.c", "name": "TCP four-way teardown — FIN, ACK, FIN, ACK" },
            { "id": "1.5.d", "name": "TCP windowing, flow control, and sequencing" },
            { "id": "1.5.e", "name": "UDP — connectionless, best-effort, low overhead" },
            { "id": "1.5.f", "name": "TCP ports — FTP 20/21, SSH 22, Telnet 23, SMTP 25, HTTP 80, POP3 110, IMAP 143, HTTPS 443" },
            { "id": "1.5.g", "name": "UDP ports — DNS 53, DHCP 67/68, TFTP 69, NTP 123, SNMP 161/162, Syslog 514" },
            { "id": "1.5.h", "name": "Dual-protocol ports — DNS 53 (both TCP and UDP)" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "1.6",
          "name": "Configure and verify IPv4 addressing and subnetting",
          "subtopics": [
            { "id": "1.6.a", "name": "IPv4 address structure — 32-bit, dotted-decimal, network + host portions" },
            { "id": "1.6.b", "name": "Classful addressing — Class A /8 (1-126), B /16 (128-191), C /24 (192-223)" },
            { "id": "1.6.c", "name": "Subnet masks in dotted-decimal and CIDR slash notation" },
            { "id": "1.6.d", "name": "Calculating network address, broadcast address, and valid host range" },
            { "id": "1.6.e", "name": "Number of subnets (2^borrowed bits) and hosts per subnet (2^host bits - 2)" },
            { "id": "1.6.f", "name": "Variable Length Subnet Masking (VLSM) — different mask per subnet" },
            { "id": "1.6.g", "name": "Binary-to-decimal and decimal-to-binary conversion for subnetting" },
            { "id": "1.6.h", "name": "Verify — show ip interface brief, show ip route, ping" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "1.7",
          "name": "Describe private IPv4 addressing",
          "subtopics": [
            { "id": "1.7.a", "name": "Class A private — 10.0.0.0/8 (10.0.0.0 – 10.255.255.255)" },
            { "id": "1.7.b", "name": "Class B private — 172.16.0.0/12 (172.16.0.0 – 172.31.255.255)" },
            { "id": "1.7.c", "name": "Class C private — 192.168.0.0/16 (192.168.0.0 – 192.168.255.255)" },
            { "id": "1.7.d", "name": "RFC 1918 — private addresses require NAT to reach the internet" },
            { "id": "1.7.e", "name": "APIPA / link-local — 169.254.0.0/16 (auto-assigned when DHCP fails)" },
            { "id": "1.7.f", "name": "Loopback — 127.0.0.0/8 (127.0.0.1 for local testing)" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "1.8",
          "name": "Configure and verify IPv6 addressing and prefix",
          "subtopics": [
            { "id": "1.8.a", "name": "IPv6 format — 128-bit, 8 groups of 4 hex digits, colon-separated" },
            { "id": "1.8.b", "name": "Shortening rules — drop leading zeros, :: replaces one consecutive all-zero group" },
            { "id": "1.8.c", "name": "Prefix length — /64 for LAN subnets, /48 for site allocation, /128 for host route" },
            { "id": "1.8.d", "name": "SLAAC — host auto-generates address from RA prefix + EUI-64 or random interface ID" },
            { "id": "1.8.e", "name": "Stateless DHCPv6 — SLAAC for address, DHCPv6 for DNS/domain info only" },
            { "id": "1.8.f", "name": "Stateful DHCPv6 — full address assignment from DHCPv6 server" },
            { "id": "1.8.g", "name": "NDP (Neighbor Discovery Protocol) — RS, RA, NS, NA replace ARP" },
            { "id": "1.8.h", "name": "Configure — ipv6 address [addr/prefix], ipv6 enable, ipv6 unicast-routing" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "1.9",
          "name": "Describe IPv6 address types",
          "subtopics": [
            { "id": "1.9.a", "name": "Unicast — global (2000::/3), unique local (FC00::/7), link-local (FE80::/10)" },
            { "id": "1.9.b", "name": "Anycast — same address on multiple devices, routed to nearest" },
            { "id": "1.9.c", "name": "Multicast — FF00::/8, replaces broadcast (FF02::1 = all nodes, FF02::2 = all routers)" },
            { "id": "1.9.d", "name": "Modified EUI-64 — insert FFFE in MAC, flip 7th bit to form interface ID" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "1.10",
          "name": "Verify IP parameters for Client OS (Windows, Mac OS, Linux)",
          "subtopics": [
            { "id": "1.10.a", "name": "Windows — ipconfig, ipconfig /all, ipconfig /release, ipconfig /renew" },
            { "id": "1.10.b", "name": "Linux — ip addr, ip route, ifconfig (legacy), ss, nmcli" },
            { "id": "1.10.c", "name": "macOS — ifconfig, networksetup -getinfo, System Preferences > Network" },
            { "id": "1.10.d", "name": "Verify gateway, subnet mask, DNS server, DHCP lease info" },
            { "id": "1.10.e", "name": "Troubleshoot — ping (reachability), traceroute/tracert (path), nslookup/dig (DNS)" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "1.11",
          "name": "Describe wireless principles",
          "subtopics": [
            { "id": "1.11.a", "name": "Nonoverlapping Wi-Fi channels — 2.4 GHz: 1, 6, 11; 5 GHz: many non-overlapping" },
            { "id": "1.11.b", "name": "SSID — network name broadcast by AP, can be hidden" },
            { "id": "1.11.c", "name": "RF — frequency bands, interference, signal strength (RSSI), SNR" },
            { "id": "1.11.d", "name": "Encryption — WEP (broken), WPA (TKIP), WPA2 (AES), WPA3 (SAE)" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "1.12",
          "name": "Explain virtualization fundamentals (server virtualization, containers, and VRFs)",
          "subtopics": [
            { "id": "1.12.a", "name": "Type 1 hypervisor — bare metal (ESXi, Hyper-V, KVM), runs directly on hardware" },
            { "id": "1.12.b", "name": "Type 2 hypervisor — hosted (VirtualBox, VMware Workstation), runs on top of OS" },
            { "id": "1.12.c", "name": "Virtual machines — full OS per VM, hardware-level isolation, heavier" },
            { "id": "1.12.d", "name": "Containers — share host kernel, lightweight, fast startup (Docker)" },
            { "id": "1.12.e", "name": "VRF — multiple independent routing tables on one physical router" },
            { "id": "1.12.f", "name": "VRF-Lite — VRF without MPLS, used for traffic segmentation on campus" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "1.13",
          "name": "Describe switching concepts",
          "subtopics": [
            { "id": "1.13.a", "name": "MAC learning — switch records source MAC + ingress port in MAC table" },
            { "id": "1.13.b", "name": "Frame switching — known unicast forwarded out the correct port only" },
            { "id": "1.13.c", "name": "Frame flooding — unknown unicast, broadcast, and multicast flooded to all ports except source" },
            { "id": "1.13.d", "name": "MAC address table — aging timer (default 300s), show mac address-table" }
          ],
          "resumeRating": "none"
        }
      ]
    },
    {
      "id": "2",
      "name": "Network Access",
      "weight": 20,
      "topics": [
        {
          "id": "2.1",
          "name": "Configure and verify VLANs (normal range) spanning multiple switches",
          "subtopics": [
            { "id": "2.1.a", "name": "Access ports (data and voice) — switchport mode access, switchport access vlan" },
            { "id": "2.1.b", "name": "Default VLAN (VLAN 1) — all ports start here, cannot be deleted" },
            { "id": "2.1.c", "name": "InterVLAN connectivity — requires L3 device (router-on-a-stick or L3 switch SVI)" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "2.2",
          "name": "Configure and verify interswitch connectivity",
          "subtopics": [
            { "id": "2.2.a", "name": "Trunk ports — carry multiple VLANs between switches" },
            { "id": "2.2.b", "name": "802.1Q — inserts 4-byte VLAN tag into Ethernet frame" },
            { "id": "2.2.c", "name": "Native VLAN — untagged traffic on trunk (default VLAN 1, should match both sides)" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "2.3",
          "name": "Configure and verify Layer 2 discovery protocols (Cisco Discovery Protocol and LLDP)",
          "subtopics": [
            { "id": "2.3.a", "name": "CDP — Cisco proprietary, Layer 2, enabled by default on Cisco devices" },
            { "id": "2.3.b", "name": "CDP commands — show cdp neighbors, show cdp neighbors detail, show cdp entry *" },
            { "id": "2.3.c", "name": "CDP enable/disable — cdp run (global), cdp enable (interface), no cdp run/enable" },
            { "id": "2.3.d", "name": "LLDP — IEEE 802.1AB open standard, disabled by default on Cisco" },
            { "id": "2.3.e", "name": "LLDP commands — show lldp neighbors, show lldp neighbors detail" },
            { "id": "2.3.f", "name": "LLDP enable/disable — lldp run (global), lldp transmit + lldp receive (per interface)" },
            { "id": "2.3.g", "name": "CDP vs LLDP — CDP is Cisco-only, on by default; LLDP is standard, off by default" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "2.4",
          "name": "Configure and verify (Layer 2/Layer 3) EtherChannel (LACP)",
          "subtopics": [
            { "id": "2.4.a", "name": "EtherChannel — bundles parallel links into one logical channel (bandwidth + redundancy)" },
            { "id": "2.4.b", "name": "LACP (802.3ad) — open standard; modes: active (initiates) and passive (responds)" },
            { "id": "2.4.c", "name": "PAgP — Cisco proprietary; modes: desirable (initiates) and auto (responds)" },
            { "id": "2.4.d", "name": "Static (mode on) — no negotiation protocol, both sides must be on" },
            { "id": "2.4.e", "name": "Negotiation matrix — LACP: active+active or active+passive; PAgP: desirable+desirable or desirable+auto" },
            { "id": "2.4.f", "name": "Layer 2 EtherChannel — switchport mode, interface port-channel as L2" },
            { "id": "2.4.g", "name": "Layer 3 EtherChannel — no switchport, assign IP to port-channel interface" },
            { "id": "2.4.h", "name": "Requirements — same speed, duplex, VLAN config, trunk settings on all member ports" },
            { "id": "2.4.i", "name": "Verify — show etherchannel summary, show etherchannel port-channel" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "2.5",
          "name": "Interpret basic operations of Rapid PVST+ Spanning Tree Protocol",
          "subtopics": [
            { "id": "2.5.a", "name": "Root port, root bridge (primary/secondary), and other port names" },
            { "id": "2.5.b", "name": "Port states — discarding, learning, forwarding (Rapid PVST+ has 3 states)" },
            { "id": "2.5.c", "name": "PortFast — immediately transitions to forwarding (access ports only, never on trunks)" },
            { "id": "2.5.d", "name": "Root guard — prevents unauthorized root bridge; BPDU guard — shuts port on BPDU receipt" },
            { "id": "2.5.e", "name": "STP election — lowest bridge ID wins (priority + MAC), default priority 32768" },
            { "id": "2.5.f", "name": "STP cost — 10 Gbps=2, 1 Gbps=4, 100 Mbps=19, 10 Mbps=100 (revised IEEE)" },
            { "id": "2.5.g", "name": "Verify — show spanning-tree, show spanning-tree vlan [id]" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "2.6",
          "name": "Describe Cisco Wireless Architectures and AP modes",
          "subtopics": [
            { "id": "2.6.a", "name": "Autonomous AP — standalone, self-contained config, each AP managed individually" },
            { "id": "2.6.b", "name": "Lightweight AP — managed by WLC via CAPWAP tunnel (control UDP 5246, data UDP 5247)" },
            { "id": "2.6.c", "name": "Split-MAC — AP handles real-time (RF, encryption); WLC handles management (auth, roaming, QoS)" },
            { "id": "2.6.d", "name": "FlexConnect — lightweight AP that locally switches traffic when WLC is unreachable" },
            { "id": "2.6.e", "name": "Cloud-based — Cisco Meraki, managed via cloud dashboard, no on-prem controller" },
            { "id": "2.6.f", "name": "Cisco DNA Center — SDN controller for campus wireless and wired (intent-based networking)" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "2.7",
          "name": "Describe physical infrastructure connections of WLAN components (AP, WLC, access/trunk ports, and LAG)",
          "subtopics": [
            { "id": "2.7.a", "name": "AP connects to switch access port (single VLAN) or trunk port (multiple WLANs)" },
            { "id": "2.7.b", "name": "WLC connects to switch via trunk port — carries management + all WLAN VLANs" },
            { "id": "2.7.c", "name": "LAG — WLC uplinks bundled for bandwidth and redundancy" },
            { "id": "2.7.d", "name": "PoE — APs powered over Ethernet (802.3af/at), eliminates separate power cabling" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "2.8",
          "name": "Describe network device management access (Telnet, SSH, HTTP, HTTPS, console, TACACS+/RADIUS, and cloud managed)",
          "subtopics": [
            { "id": "2.8.a", "name": "Console — RJ-45/USB-mini, out-of-band, direct serial connection, no network required" },
            { "id": "2.8.b", "name": "Telnet — TCP 23, in-band, sends everything in plaintext (insecure, avoid)" },
            { "id": "2.8.c", "name": "SSH — TCP 22, in-band, encrypted (always prefer over Telnet)" },
            { "id": "2.8.d", "name": "HTTP — TCP 80, web GUI management (insecure); HTTPS — TCP 443, encrypted web GUI" },
            { "id": "2.8.e", "name": "TACACS+ — TCP 49, Cisco proprietary, full packet encryption, per-command authorization" },
            { "id": "2.8.f", "name": "RADIUS — UDP 1812/1813, open standard, encrypts password only, combines auth+authz" },
            { "id": "2.8.g", "name": "Cloud managed — Meraki dashboard, Cisco Spaces, DNA Center (no direct CLI needed)" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "2.9",
          "name": "Interpret the wireless LAN GUI configuration for client connectivity, such as WLAN creation, security settings, QoS profiles, and advanced settings",
          "subtopics": [
            { "id": "2.9.a", "name": "WLAN creation — set name, SSID, WLAN ID, enable/disable" },
            { "id": "2.9.b", "name": "Security settings — Layer 2: WPA+WPA2, cipher: AES; auth: PSK or 802.1X" },
            { "id": "2.9.c", "name": "Interface/VLAN mapping — associate WLAN to a dynamic interface (VLAN)" },
            { "id": "2.9.d", "name": "QoS profiles — Platinum (voice), Gold (video), Silver (best effort), Bronze (background)" },
            { "id": "2.9.e", "name": "Advanced — client exclusion, P2P blocking, session timeout, DHCP required" }
          ],
          "resumeRating": "none"
        }
      ]
    },
    {
      "id": "3",
      "name": "IP Connectivity",
      "weight": 25,
      "topics": [
        {
          "id": "3.1",
          "name": "Interpret the components of routing table",
          "subtopics": [
            { "id": "3.1.a", "name": "Routing protocol code — C (connected), S (static), O (OSPF), R (RIP), D (EIGRP), B (BGP)" },
            { "id": "3.1.b", "name": "Prefix — network address (e.g., 10.1.1.0)" },
            { "id": "3.1.c", "name": "Network mask — subnet mask or prefix length (e.g., /24 or 255.255.255.0)" },
            { "id": "3.1.d", "name": "Next hop — IP address of next router in the path" },
            { "id": "3.1.e", "name": "Administrative distance — trustworthiness of route source (lower = more trusted)" },
            { "id": "3.1.f", "name": "Metric — cost within a routing protocol (lower = preferred)" },
            { "id": "3.1.g", "name": "Gateway of last resort — default route (0.0.0.0/0), used when no specific match" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "3.2",
          "name": "Determine how a router makes a forwarding decision by default",
          "subtopics": [
            { "id": "3.2.a", "name": "Longest prefix match — most specific route wins (/30 beats /24 beats /16 beats /0)" },
            { "id": "3.2.b", "name": "Administrative distance (AD) — tiebreaker between different routing sources" },
            { "id": "3.2.c", "name": "AD values — Connected 0, Static 1, eBGP 20, EIGRP 90, OSPF 110, IS-IS 115, RIP 120, eBGP 200" },
            { "id": "3.2.d", "name": "Routing protocol metric — tiebreaker within same protocol (lower metric preferred)" },
            { "id": "3.2.e", "name": "Decision order — 1st longest match, 2nd lowest AD, 3rd lowest metric" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "3.3",
          "name": "Configure and verify IPv4 and IPv6 static routing",
          "subtopics": [
            { "id": "3.3.a", "name": "Default route — ip route 0.0.0.0 0.0.0.0 [next-hop | exit-interface]" },
            { "id": "3.3.b", "name": "Network route — ip route [network] [mask] [next-hop | exit-interface]" },
            { "id": "3.3.c", "name": "Host route — ip route [host] 255.255.255.255 [next-hop] (/32 prefix)" },
            { "id": "3.3.d", "name": "Floating static — static route with higher AD as backup (e.g., ip route ... 5)" },
            { "id": "3.3.e", "name": "IPv6 static — ipv6 route [prefix/length] [next-hop | exit-interface]" },
            { "id": "3.3.f", "name": "Next-hop vs exit-interface — next-hop is recursive (2 lookups); exit-interface is directly connected" },
            { "id": "3.3.g", "name": "Verify — show ip route static, show ip route [network], show ipv6 route" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "3.4",
          "name": "Configure and verify single area OSPFv2",
          "subtopics": [
            { "id": "3.4.a", "name": "Neighbor adjacencies — matching Hello/Dead timers, area ID, subnet, auth" },
            { "id": "3.4.b", "name": "Point-to-point — no DR/BDR election, two routers only" },
            { "id": "3.4.c", "name": "Broadcast (DR/BDR selection) — highest priority wins, then highest router ID" },
            { "id": "3.4.d", "name": "Router ID — manually set (router-id) > highest loopback IP > highest physical IP" },
            { "id": "3.4.e", "name": "Config — router ospf [id], network [ip] [wildcard] area [#], or ip ospf [id] area [#] on interface" },
            { "id": "3.4.f", "name": "Passive interface — passive-interface [int] stops Hello packets but still advertises the network" },
            { "id": "3.4.g", "name": "OSPF cost — reference BW / interface BW; change with auto-cost reference-bandwidth [Mbps]" },
            { "id": "3.4.h", "name": "Default route — default-information originate (advertises 0.0.0.0/0 into OSPF)" },
            { "id": "3.4.i", "name": "Verify — show ip ospf neighbor, show ip ospf interface [int], show ip route ospf" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "3.5",
          "name": "Describe the purpose, functions, and concepts of first hop redundancy protocols",
          "subtopics": [
            { "id": "3.5.a", "name": "FHRP purpose — virtual default gateway shared between routers for failover" },
            { "id": "3.5.b", "name": "HSRP (Cisco) — active/standby roles, virtual IP, virtual MAC 0000.0c07.acXX" },
            { "id": "3.5.c", "name": "HSRPv2 — supports IPv6, virtual MAC 0000.0c9f.fXXX, multicast 224.0.0.102" },
            { "id": "3.5.d", "name": "VRRP (open standard) — master/backup roles, uses actual interface IP as virtual IP allowed" },
            { "id": "3.5.e", "name": "GLBP (Cisco) — AVG assigns virtual MACs to AVFs, provides load balancing across routers" },
            { "id": "3.5.f", "name": "Preemption — higher-priority router reclaims active/master role when it recovers" }
          ],
          "resumeRating": "none"
        }
      ]
    },
    {
      "id": "4",
      "name": "IP Services",
      "weight": 10,
      "topics": [
        {
          "id": "4.1",
          "name": "Configure and verify inside source NAT using static and pools",
          "subtopics": [
            { "id": "4.1.a", "name": "NAT terminology — inside local, inside global, outside local, outside global" },
            { "id": "4.1.b", "name": "Static NAT — ip nat inside source static [local-ip] [global-ip] (one-to-one)" },
            { "id": "4.1.c", "name": "Dynamic NAT — ip nat pool [name] [start] [end] netmask [mask] + ip nat inside source list [#] pool [name]" },
            { "id": "4.1.d", "name": "PAT (overload) — add 'overload' keyword; many inside hosts share one public IP via port numbers" },
            { "id": "4.1.e", "name": "Interface designations — ip nat inside on LAN interface, ip nat outside on WAN interface" },
            { "id": "4.1.f", "name": "ACL for NAT — access-list defines which inside hosts get translated" },
            { "id": "4.1.g", "name": "Verify — show ip nat translations, show ip nat statistics" },
            { "id": "4.1.h", "name": "Troubleshoot — debug ip nat, clear ip nat translation *, check ACL + interface designations" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "4.2",
          "name": "Configure and verify NTP operating in a client and server mode",
          "subtopics": [
            { "id": "4.2.a", "name": "NTP purpose — synchronize clocks for log correlation, certificates, authentication" },
            { "id": "4.2.b", "name": "Stratum — 0 (atomic clock), 1 (directly connected), 2-15 (each hop +1), 16 (unsynchronized)" },
            { "id": "4.2.c", "name": "NTP client — ntp server [ip-address] (points to upstream server)" },
            { "id": "4.2.d", "name": "NTP master — ntp master [stratum] (device acts as NTP server)" },
            { "id": "4.2.e", "name": "NTP authentication — ntp authenticate, ntp authentication-key [#] md5 [key], ntp trusted-key [#]" },
            { "id": "4.2.f", "name": "Verify — show ntp status (synchronized?), show ntp associations, show clock" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "4.3",
          "name": "Explain the role of DHCP and DNS within the network",
          "subtopics": [
            { "id": "4.3.a", "name": "DHCP DORA — Discover (broadcast), Offer (unicast), Request (broadcast), Acknowledge (unicast)" },
            { "id": "4.3.b", "name": "DHCP provides — IP address, subnet mask, default gateway, DNS server, lease time" },
            { "id": "4.3.c", "name": "DHCP lease renewal — at 50% of lease (unicast to server), rebind at 87.5% (broadcast)" },
            { "id": "4.3.d", "name": "DNS record types — A (name→IPv4), AAAA (name→IPv6), CNAME (alias), MX (mail), PTR (reverse), NS (nameserver)" },
            { "id": "4.3.e", "name": "DNS resolution — recursive (client→resolver does full lookup) vs iterative (resolver→root→TLD→auth)" },
            { "id": "4.3.f", "name": "DNS hierarchy — root (.) → TLD (.com) → second-level (example.com) → host (www.example.com)" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "4.4",
          "name": "Explain the function of SNMP in network operations",
          "subtopics": [
            { "id": "4.4.a", "name": "SNMP architecture — manager (NMS polls), agent (on device responds), MIB (object database)" },
            { "id": "4.4.b", "name": "SNMP messages — Get (read one), GetNext (walk tree), GetBulk (many), Set (write), Trap (unsolicited alert), Inform (acknowledged trap)" },
            { "id": "4.4.c", "name": "SNMPv2c — community strings (read-only / read-write), no encryption, no real auth" },
            { "id": "4.4.d", "name": "SNMPv3 security levels — noAuthNoPriv (username only), authNoPriv (MD5/SHA auth), authPriv (auth + DES/AES encryption)" },
            { "id": "4.4.e", "name": "SNMPv3 is the only version with encryption — always prefer v3 for production" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "4.5",
          "name": "Describe the use of syslog features, including facilities and severity levels",
          "subtopics": [
            { "id": "4.5.a", "name": "Level 0 — Emergency: system is unusable" },
            { "id": "4.5.b", "name": "Level 1 — Alert: immediate action needed" },
            { "id": "4.5.c", "name": "Level 2 — Critical: critical conditions" },
            { "id": "4.5.d", "name": "Level 3 — Error: error conditions" },
            { "id": "4.5.e", "name": "Level 4 — Warning: warning conditions" },
            { "id": "4.5.f", "name": "Level 5 — Notification: normal but significant" },
            { "id": "4.5.g", "name": "Level 6 — Informational: informational messages" },
            { "id": "4.5.h", "name": "Level 7 — Debugging: debug-level messages" },
            { "id": "4.5.i", "name": "Mnemonic — Every Awesome Cisco Engineer Will Need Ice cream Daily" },
            { "id": "4.5.j", "name": "Logging destinations — console, terminal monitor, buffer (RAM), remote syslog server" },
            { "id": "4.5.k", "name": "Config — logging host [ip], logging trap [level], logging buffered [size], logging console [level]" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "4.6",
          "name": "Configure and verify DHCP client and relay",
          "subtopics": [
            { "id": "4.6.a", "name": "DHCP client — ip address dhcp on router interface" },
            { "id": "4.6.b", "name": "DHCP relay — ip helper-address [server-ip] on the gateway interface facing clients" },
            { "id": "4.6.c", "name": "Why relay needed — DHCP Discover is broadcast, routers don't forward broadcasts by default" },
            { "id": "4.6.d", "name": "DHCP server config — ip dhcp pool [name], network [ip] [mask], default-router [gw], dns-server [ip]" },
            { "id": "4.6.e", "name": "Excluded addresses — ip dhcp excluded-address [start-ip] [end-ip] (reserve IPs for static devices)" },
            { "id": "4.6.f", "name": "Verify — show ip dhcp binding, show ip dhcp pool, show ip dhcp server statistics" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "4.7",
          "name": "Explain the forwarding per-hop behavior (PHB) for QoS such as classification, marking, queuing, congestion, policing, and shaping",
          "subtopics": [
            { "id": "4.7.a", "name": "Classification — identifying traffic (ACL, NBAR, port number, DSCP value)" },
            { "id": "4.7.b", "name": "Marking — tagging packets: Layer 2 CoS (0-7, 3 bits), Layer 3 DSCP (0-63, 6 bits)" },
            { "id": "4.7.c", "name": "DSCP values — EF (46, voice), AF classes (AF11-AF43), CS values (CS0-CS7), default BE (0)" },
            { "id": "4.7.d", "name": "Queuing — LLQ (strict priority for voice/video), CBWFQ (bandwidth guarantees per class)" },
            { "id": "4.7.e", "name": "Congestion avoidance — WRED drops random packets before queue is full, prevents tail drop" },
            { "id": "4.7.f", "name": "Policing — drops or remarks excess traffic immediately (hard limit, typically at ingress)" },
            { "id": "4.7.g", "name": "Shaping — buffers excess traffic and sends when bandwidth available (smooth, typically at egress)" },
            { "id": "4.7.h", "name": "Trust boundary — where markings are first trusted; typically at the access switch closest to source" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "4.8",
          "name": "Configure network devices for remote access using SSH",
          "subtopics": [
            { "id": "4.8.a", "name": "Step 1 — hostname [name] (cannot generate RSA keys with default hostname)" },
            { "id": "4.8.b", "name": "Step 2 — ip domain-name [domain] (required for RSA key generation)" },
            { "id": "4.8.c", "name": "Step 3 — crypto key generate rsa modulus 2048 (minimum 768 for SSHv2)" },
            { "id": "4.8.d", "name": "Step 4 — ip ssh version 2 (enforce version 2, more secure)" },
            { "id": "4.8.e", "name": "Step 5 — username [name] privilege 15 secret [password] (local user account)" },
            { "id": "4.8.f", "name": "Step 6 — line vty 0 15 → transport input ssh → login local" },
            { "id": "4.8.g", "name": "Disable Telnet — transport input ssh (replaces default 'transport input all')" },
            { "id": "4.8.h", "name": "Verify — show ip ssh (version, timeout), show ssh (active sessions)" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "4.9",
          "name": "Describe the capabilities and functions of TFTP/FTP in the network",
          "subtopics": [
            { "id": "4.9.a", "name": "TFTP — UDP 69, no authentication, simple, connectionless, for small trusted transfers" },
            { "id": "4.9.b", "name": "FTP — TCP 20 (data) + 21 (control), username/password auth, reliable, for larger transfers" },
            { "id": "4.9.c", "name": "TFTP use case — IOS image backup/upgrade, config file transfer on trusted networks" },
            { "id": "4.9.d", "name": "FTP use case — larger file transfers needing authentication and reliability" },
            { "id": "4.9.e", "name": "IOS file commands — copy running-config tftp:, copy tftp: flash:, copy startup-config tftp:" },
            { "id": "4.9.f", "name": "SCP — Secure Copy over SSH, encrypted alternative to TFTP/FTP" }
          ],
          "resumeRating": "none"
        }
      ]
    },
    {
      "id": "5",
      "name": "Security Fundamentals",
      "weight": 15,
      "topics": [
        {
          "id": "5.1",
          "name": "Define key security concepts (threats, vulnerabilities, exploits, and mitigation techniques)",
          "subtopics": [
            { "id": "5.1.a", "name": "Threat — potential danger (attacker, malware, natural disaster)" },
            { "id": "5.1.b", "name": "Vulnerability — exploitable weakness (unpatched software, misconfiguration, default credentials)" },
            { "id": "5.1.c", "name": "Exploit — code or technique that takes advantage of a vulnerability" },
            { "id": "5.1.d", "name": "Mitigation — action to reduce risk (patching, ACLs, encryption, segmentation, training)" },
            { "id": "5.1.e", "name": "Phishing and social engineering — manipulate humans to gain access" },
            { "id": "5.1.f", "name": "DoS / DDoS — overwhelm target with traffic to deny service" },
            { "id": "5.1.g", "name": "Man-in-the-middle — intercept communication between two parties (ARP spoofing, DHCP spoofing)" },
            { "id": "5.1.h", "name": "Malware — virus (attaches to file), worm (self-spreads), trojan (disguised), ransomware (encrypts data)" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "5.2",
          "name": "Describe security program elements (user awareness, training, and physical access control)",
          "subtopics": [
            { "id": "5.2.a", "name": "User awareness — recognize phishing, report suspicious emails, password hygiene" },
            { "id": "5.2.b", "name": "Security training — ongoing education, policy compliance, incident response procedures" },
            { "id": "5.2.c", "name": "Physical access — badge readers, mantraps/vestibules, security guards" },
            { "id": "5.2.d", "name": "Surveillance — video cameras, motion sensors, access logs" },
            { "id": "5.2.e", "name": "Environmental — cable locks, equipment cages, locked server rooms" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "5.3",
          "name": "Configure and verify device access control using local passwords",
          "subtopics": [
            { "id": "5.3.a", "name": "enable password [pw] — stored plaintext in config (never use)" },
            { "id": "5.3.b", "name": "enable secret [pw] — stored as MD5 hash (Type 5), always preferred over enable password" },
            { "id": "5.3.c", "name": "Console — line console 0 → password [pw] → login" },
            { "id": "5.3.d", "name": "VTY — line vty 0 15 → password [pw] → login (or login local with username)" },
            { "id": "5.3.e", "name": "AUX — line aux 0 → password [pw] → login" },
            { "id": "5.3.f", "name": "Local user — username [name] privilege [0-15] secret [pw] → login local on lines" },
            { "id": "5.3.g", "name": "service password-encryption — encrypts all plaintext passwords as Type 7 (weak but not plaintext)" },
            { "id": "5.3.h", "name": "Banners — banner motd # [text] #, banner login # [text] #, banner exec # [text] #" },
            { "id": "5.3.i", "name": "Minimum length — security passwords min-length [n]" },
            { "id": "5.3.j", "name": "Login protection — login block-for [sec] attempts [n] within [sec]" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "5.4",
          "name": "Describe security password policy elements, such as management, complexity, and password alternatives (multifactor authentication, certificates, and biometrics)",
          "subtopics": [
            { "id": "5.4.a", "name": "Password complexity — minimum length, uppercase + lowercase + numbers + special characters" },
            { "id": "5.4.b", "name": "Password management — rotation policy, expiration, history (no reuse)" },
            { "id": "5.4.c", "name": "MFA — something you know (password) + something you have (token) + something you are (biometric)" },
            { "id": "5.4.d", "name": "True MFA requires factors from DIFFERENT categories (two passwords is NOT MFA)" },
            { "id": "5.4.e", "name": "Digital certificates — PKI, X.509, CA (Certificate Authority), public/private key pairs" },
            { "id": "5.4.f", "name": "Biometrics — fingerprint, facial recognition, iris scan, voice print" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "5.5",
          "name": "Describe IPsec remote access and site-to-site VPNs",
          "subtopics": [
            { "id": "5.5.a", "name": "Site-to-site VPN — router-to-router, connects two networks, always-on" },
            { "id": "5.5.b", "name": "Remote access VPN — client-to-router, connects user to network, on-demand" },
            { "id": "5.5.c", "name": "IPsec provides — confidentiality (encryption), integrity (hashing), authentication (pre-shared key or cert), anti-replay" },
            { "id": "5.5.d", "name": "AH (Authentication Header) — integrity + auth only, NO encryption, IP protocol 51" },
            { "id": "5.5.e", "name": "ESP (Encapsulating Security Payload) — encryption + integrity + auth, IP protocol 50" },
            { "id": "5.5.f", "name": "IKE Phase 1 — authenticate peers, establish ISAKMP SA (secure management channel)" },
            { "id": "5.5.g", "name": "IKE Phase 2 — negotiate IPsec SAs for actual data encryption (Quick Mode)" },
            { "id": "5.5.h", "name": "Tunnel mode — encrypts ENTIRE original packet + new IP header (site-to-site default)" },
            { "id": "5.5.i", "name": "Transport mode — encrypts payload ONLY, keeps original IP header (host-to-host)" },
            { "id": "5.5.j", "name": "GRE over IPsec — GRE provides multicast/routing protocol support, IPsec provides encryption" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "5.6",
          "name": "Configure and verify access control lists",
          "subtopics": [
            { "id": "5.6.a", "name": "Standard ACL — filters source IP only; numbered 1-99, 1300-1999" },
            { "id": "5.6.b", "name": "Extended ACL — filters source, dest, protocol, port; numbered 100-199, 2000-2699" },
            { "id": "5.6.c", "name": "Named ACLs — ip access-list standard/extended [name] (easier to edit)" },
            { "id": "5.6.d", "name": "Wildcard masks — inverse of subnet mask; 0 bits = must match, 1 bits = ignore" },
            { "id": "5.6.e", "name": "Wildcard examples — 0.0.0.0 = exact host, 0.0.0.255 = match /24, 0.0.255.255 = match /16" },
            { "id": "5.6.f", "name": "Implicit deny any — invisible 'deny any' at end of every ACL; must add permit statements" },
            { "id": "5.6.g", "name": "Processing — top-down, first match stops processing; order matters" },
            { "id": "5.6.h", "name": "Standard placement — near destination (only filters source, so place far from source)" },
            { "id": "5.6.i", "name": "Extended placement — near source (has full granularity, block early)" },
            { "id": "5.6.j", "name": "Apply to interface — ip access-group [name/#] in|out" },
            { "id": "5.6.k", "name": "Apply to VTY lines — access-class [name/#] in (restrict remote management access)" },
            { "id": "5.6.l", "name": "Edit — use sequence numbers; no [seq#] to remove, [seq#] permit/deny to insert" },
            { "id": "5.6.m", "name": "Verify — show access-lists, show ip access-lists, show running-config | include access" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "5.7",
          "name": "Configure and verify Layer 2 security features (DHCP snooping, dynamic ARP inspection, and port security)",
          "subtopics": [
            { "id": "5.7.a", "name": "DHCP snooping purpose — blocks rogue DHCP servers on untrusted ports" },
            { "id": "5.7.b", "name": "DHCP snooping config — ip dhcp snooping → ip dhcp snooping vlan [#] → ip dhcp snooping trust on uplinks" },
            { "id": "5.7.c", "name": "DHCP snooping binding table — maps MAC, IP, VLAN, port, lease time (used by DAI)" },
            { "id": "5.7.d", "name": "DHCP snooping rate limiting — ip dhcp snooping limit rate [pps] on untrusted ports" },
            { "id": "5.7.e", "name": "DAI (Dynamic ARP Inspection) — validates ARP packets against DHCP snooping binding table" },
            { "id": "5.7.f", "name": "DAI config — ip arp inspection vlan [#] → ip arp inspection trust on uplinks/DHCP server ports" },
            { "id": "5.7.g", "name": "Port security purpose — limits MAC addresses allowed on a port" },
            { "id": "5.7.h", "name": "Port security config — switchport port-security → switchport port-security maximum [n]" },
            { "id": "5.7.i", "name": "Sticky MAC — switchport port-security mac-address sticky (auto-learns and saves to running-config)" },
            { "id": "5.7.j", "name": "Violation modes — protect (drop silently), restrict (drop + log + syslog), shutdown (err-disabled)" },
            { "id": "5.7.k", "name": "Err-disabled recovery — shutdown then no shutdown, or errdisable recovery cause psecure-violation" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "5.8",
          "name": "Compare authentication, authorization, and accounting concepts",
          "subtopics": [
            { "id": "5.8.a", "name": "Authentication — who are you? Verify identity (username/password, certificate, biometric)" },
            { "id": "5.8.b", "name": "Authorization — what can you do? Grant or deny access to resources and commands" },
            { "id": "5.8.c", "name": "Accounting — what did you do? Log all actions for audit trail" },
            { "id": "5.8.d", "name": "TACACS+ — TCP 49, Cisco proprietary, encrypts FULL packet, separates all 3 AAA functions" },
            { "id": "5.8.e", "name": "RADIUS — UDP 1812 (auth) / 1813 (acct), open standard, encrypts PASSWORD only, combines auth+authz" },
            { "id": "5.8.f", "name": "Use case — TACACS+ for device admin (per-command authz); RADIUS for network access (802.1X, VPN)" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "5.9",
          "name": "Describe wireless security protocols (WPA, WPA2, and WPA3)",
          "subtopics": [
            { "id": "5.9.a", "name": "WEP — RC4 encryption, 24-bit IV, trivially cracked, never use" },
            { "id": "5.9.b", "name": "WPA — TKIP encryption (improved WEP), deprecated, still crackable" },
            { "id": "5.9.c", "name": "WPA2 — AES/CCMP encryption, current required standard" },
            { "id": "5.9.d", "name": "WPA3 — SAE (replaces 4-way handshake, immune to offline dictionary attacks), OWE for open networks, 192-bit mode" },
            { "id": "5.9.e", "name": "Personal mode (PSK) — one pre-shared key for all users, simpler but less secure" },
            { "id": "5.9.f", "name": "Enterprise mode (802.1X) — individual credentials via RADIUS server, per-user auth" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "5.10",
          "name": "Configure and verify WLAN within the GUI using WPA2 PSK",
          "subtopics": [
            { "id": "5.10.a", "name": "Access WLC — HTTPS to management IP address in browser" },
            { "id": "5.10.b", "name": "Create WLAN — WLANs tab → Create New → set profile name, SSID, WLAN ID" },
            { "id": "5.10.c", "name": "Security — Layer 2 Security → WPA+WPA2 → AES cipher → Auth Key Mgmt: PSK → enter key" },
            { "id": "5.10.d", "name": "Interface mapping — General tab → select dynamic interface (maps WLAN to VLAN)" },
            { "id": "5.10.e", "name": "Enable — check Status: Enabled checkbox → Apply → verify client association" }
          ],
          "resumeRating": "none"
        }
      ]
    },
    {
      "id": "6",
      "name": "Automation and Programmability",
      "weight": 10,
      "topics": [
        {
          "id": "6.1",
          "name": "Explain how automation impacts network management",
          "subtopics": [
            { "id": "6.1.a", "name": "Reduced human error — automated templates eliminate typos and inconsistency" },
            { "id": "6.1.b", "name": "Faster provisioning — deploy configs to hundreds of devices in seconds, not hours" },
            { "id": "6.1.c", "name": "Scalability — manage thousands of devices from a single controller/script" },
            { "id": "6.1.d", "name": "Consistency and compliance — enforced standards, auditable changes, version control" },
            { "id": "6.1.e", "name": "Self-healing networks — automated detection and remediation of failures" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "6.2",
          "name": "Compare traditional networks with controller-based networking",
          "subtopics": [
            { "id": "6.2.a", "name": "Traditional — distributed control plane per device, CLI-based, manual, vendor-specific" },
            { "id": "6.2.b", "name": "Controller-based (SDN) — centralized control plane, API-driven, programmable" },
            { "id": "6.2.c", "name": "SDN benefits — single pane of glass, faster changes, policy-based, intent-based" },
            { "id": "6.2.d", "name": "Cisco DNA Center — SDN controller for enterprise campus (intent-based networking)" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "6.3",
          "name": "Describe controller-based, software defined architecture (overlay, underlay, and fabric)",
          "subtopics": [
            { "id": "6.3.a", "name": "Separation of control plane and data plane" },
            { "id": "6.3.b", "name": "Northbound APIs — controller to applications (REST API); Southbound APIs — controller to devices (OpenFlow, NETCONF)" },
            { "id": "6.3.c", "name": "Underlay — physical network providing transport (routers, switches, cables)" },
            { "id": "6.3.d", "name": "Overlay — virtual network on top of underlay (VXLAN tunnels, encapsulation)" },
            { "id": "6.3.e", "name": "Fabric — combined overlay + underlay with automated provisioning (Cisco SD-Access)" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "6.4",
          "name": "Explain AI (generative and predictive) and machine learning in network operations",
          "subtopics": [
            { "id": "6.4.a", "name": "Generative AI — creates configs from natural language, generates troubleshooting suggestions" },
            { "id": "6.4.b", "name": "Predictive AI — anomaly detection, capacity forecasting, failure prediction before impact" },
            { "id": "6.4.c", "name": "ML-driven monitoring — learns baseline behavior, auto-detects deviations" },
            { "id": "6.4.d", "name": "AIOps — automated root cause analysis, event correlation, intelligent alerting" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "6.5",
          "name": "Describe characteristics of REST-based APIs (authentication types, CRUD, HTTP verbs, and data encoding)",
          "subtopics": [
            { "id": "6.5.a", "name": "REST principles — stateless, client-server, URI identifies resources, cacheable" },
            { "id": "6.5.b", "name": "HTTP verbs and CRUD — GET (Read), POST (Create), PUT (Replace), PATCH (Update), DELETE (Delete)" },
            { "id": "6.5.c", "name": "Status codes — 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Server Error" },
            { "id": "6.5.d", "name": "Authentication — API key, Bearer token, OAuth 2.0, HTTP Basic (base64 user:pass)" },
            { "id": "6.5.e", "name": "Data encoding — JSON (primary, lightweight), XML (legacy, verbose), YAML (config files)" },
            { "id": "6.5.f", "name": "CRUD mapping — Create=POST, Read=GET, Update=PUT/PATCH, Delete=DELETE" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "6.6",
          "name": "Recognize the capabilities of configuration management mechanisms such as Ansible and Terraform",
          "subtopics": [
            { "id": "6.6.a", "name": "Ansible — agentless (SSH/NETCONF), YAML playbooks, push model, idempotent" },
            { "id": "6.6.b", "name": "Ansible components — inventory (device list), playbooks (tasks), modules (actions), roles (reusable)" },
            { "id": "6.6.c", "name": "Terraform — IaC (Infrastructure as Code), HCL language, state file tracks real-world resources" },
            { "id": "6.6.d", "name": "Terraform workflow — terraform init → plan (preview) → apply (execute) → destroy (teardown)" },
            { "id": "6.6.e", "name": "Ansible vs Terraform — Ansible configures devices (day 2); Terraform provisions infrastructure (day 0/1)" },
            { "id": "6.6.f", "name": "Puppet/Chef (comparison) — agent-based, pull model, Ruby-based; less common on CCNA but may appear" }
          ],
          "resumeRating": "none"
        },
        {
          "id": "6.7",
          "name": "Recognize components of JSON-encoded data",
          "subtopics": [
            { "id": "6.7.a", "name": "JSON object — { } curly braces, key-value pairs, keys MUST be double-quoted strings" },
            { "id": "6.7.b", "name": "JSON array — [ ] square brackets, ordered list of values" },
            { "id": "6.7.c", "name": "Data types — string (\"text\"), number (42, 3.14), boolean (true/false), null, object, array" },
            { "id": "6.7.d", "name": "Nesting — objects inside objects, arrays inside objects, objects inside arrays" },
            { "id": "6.7.e", "name": "Valid vs invalid — double quotes required (not single), no trailing commas, no comments allowed" }
          ],
          "resumeRating": "none"
        }
      ]
    }
  ]
};
