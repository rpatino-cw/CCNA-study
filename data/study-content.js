/**
 * study-content.js — Lesson content for all 53 CCNA 200-301 topics.
 * Each entry: summary, keyPoints[], commands[], memoryTip, examTip, extraQuestions[]
 */
window.studyContent = {

  /* ══════════════════════════════════════════════════════════════
     DOMAIN 1 — NETWORK FUNDAMENTALS (20%)
  ══════════════════════════════════════════════════════════════ */

  "1.1": {
    title: "Network Components",
    summary: "Routers connect networks and make Layer 3 forwarding decisions. Switches connect devices within a network at Layer 2 (or Layer 3). NGFWs, WLCs, and access points all serve distinct roles.",
    keyPoints: [
      "Router: Layer 3, connects networks, uses routing tables",
      "L2 switch: forwards frames using MAC table; L3 switch: also routes between VLANs",
      "NGFW/IPS: inspects traffic up to Layer 7, blocks threats",
      "WLC: manages multiple APs centrally via CAPWAP",
      "PoE: delivers power over Ethernet (802.3af = 15.4W, 802.3at = 30W)"
    ],
    commands: [
      { cmd: "show cdp neighbors detail", desc: "Discover directly connected Cisco devices" },
      { cmd: "show interfaces", desc: "Verify interface status, speed, duplex" }
    ],
    memoryTip: "Router = roads between cities. Switch = hallways in a building. NGFW = security checkpoint at the gate.",
    examTip: "Know what layer each device operates at. Routers = L3, Switches = L2/L3, APs = L1/L2.",
    extraQuestions: [
      {
        question: "At which OSI layer does a standard Layer 2 switch operate?",
        options: ["Layer 1", "Layer 2", "Layer 3", "Layer 4"],
        correct: 1,
        explanation: "A Layer 2 switch operates at the Data Link layer (Layer 2), using MAC addresses to make forwarding decisions."
      },
      {
        question: "Which protocol do WLCs use to communicate with lightweight APs?",
        options: ["LLDP", "CAPWAP", "CDP", "RSPAN"],
        correct: 1,
        explanation: "CAPWAP (Control and Provisioning of Wireless Access Points) is the protocol used between WLCs and lightweight APs."
      },
      {
        question: "What is the maximum PoE wattage delivered by the 802.3at (PoE+) standard?",
        options: ["7.5W", "15.4W", "30W", "60W"],
        correct: 2,
        explanation: "802.3at (PoE+) delivers up to 30W per port. 802.3af (standard PoE) delivers up to 15.4W."
      }
    ]
  },

  "1.2": {
    title: "Network Topology Architectures",
    summary: "Enterprise networks use two-tier (access/distribution) or three-tier (access/distribution/core) designs. Spine-leaf is used in data centers. WAN connects geographically separated sites.",
    keyPoints: [
      "Two-tier: access + distribution/core collapsed — used in smaller campuses",
      "Three-tier: access → distribution → core — scales to large enterprise",
      "Spine-leaf: every leaf connects to every spine; no leaf-to-leaf; DC fabric standard",
      "SOHO: simple router/switch combo, often all-in-one device",
      "On-prem vs cloud: on-prem = you own hardware; cloud = provider manages infrastructure"
    ],
    commands: [],
    memoryTip: "Spine-leaf = spine is the highway, leaf is every exit ramp. Every leaf talks to every spine.",
    examTip: "Spine-leaf guarantees equal-cost paths between any two leaves. This is why it's used in data centers.",
    extraQuestions: [
      {
        question: "Which network topology is most commonly used in modern data centers?",
        options: ["Three-tier hierarchical", "Spine-leaf", "Two-tier collapsed core", "Bus topology"],
        correct: 1,
        explanation: "Spine-leaf topology is the standard for data centers — it provides predictable latency and easy horizontal scaling."
      },
      {
        question: "In a spine-leaf architecture, which statement is true?",
        options: ["Leaf switches connect to each other directly", "Every leaf connects to every spine", "Spine switches connect to end hosts", "Only some leaves connect to each spine"],
        correct: 1,
        explanation: "In spine-leaf, every leaf switch connects to every spine switch. Leaf switches never connect directly to each other."
      }
    ]
  },

  "1.3": {
    title: "Physical Interface and Cabling Types",
    summary: "Ethernet cabling choices depend on distance and bandwidth. Single-mode fiber (SMF) covers long distances, multimode fiber (MMF) covers shorter distances, copper handles LAN connections.",
    keyPoints: [
      "Single-mode fiber (SMF): laser source, up to 100km, yellow jacket",
      "Multimode fiber (MMF): LED/VCSEL source, up to ~2km, orange/aqua jacket",
      "Cat5e: up to 1Gbps / 100m. Cat6: up to 10Gbps / 55m. Cat6a: 10Gbps / 100m",
      "Straight-through cable: connects unlike devices (PC→switch). Crossover: like devices (switch→switch)",
      "Modern switches use Auto-MDIX, eliminating crossover cable requirement"
    ],
    commands: [
      { cmd: "show interfaces GigabitEthernet0/1", desc: "Verify physical layer status and errors" }
    ],
    memoryTip: "SMF = Single lane highway, long distance. MMF = Multi-lane, short trips only.",
    examTip: "Auto-MDIX auto-detects and corrects cable type. If both sides support it, cable type doesn't matter.",
    extraQuestions: [
      {
        question: "Which fiber optic cable type is designed for long-distance transmissions of up to 100km?",
        options: ["Multimode fiber", "Single-mode fiber", "Cat6a", "Coaxial cable"],
        correct: 1,
        explanation: "Single-mode fiber (SMF) uses a laser source with a very narrow core, allowing transmission over very long distances (up to 100km)."
      },
      {
        question: "What feature eliminates the need for crossover cables between like devices?",
        options: ["PoE", "Auto-MDIX", "LACP", "EtherChannel"],
        correct: 1,
        explanation: "Auto-MDIX (Automatic Medium-Dependent Interface Crossover) automatically detects and adjusts for cable type."
      }
    ]
  },

  "1.4": {
    title: "Interface and Cable Issues",
    summary: "Interface errors reveal physical layer problems. Collisions on full-duplex links indicate a duplex mismatch. Speed mismatches result in down/down interface state.",
    keyPoints: [
      "Collisions: normal on half-duplex shared media; on full-duplex = duplex mismatch",
      "Duplex mismatch: one side full, other half — causes late collisions and poor performance",
      "Speed mismatch: interface stays down — use 'auto' or match manually on both ends",
      "CRC/FCS errors: often bad cable, NIC, or EMI interference",
      "Runts: frames < 64 bytes. Giants: frames > 1518 bytes (without jumbo frames)"
    ],
    commands: [
      { cmd: "show interfaces GigabitEthernet0/1", desc: "View input/output errors, collisions, duplex, speed" },
      { cmd: "show interfaces GigabitEthernet0/1 counters", desc: "See error counters per interface" }
    ],
    memoryTip: "Late collisions on full-duplex = always a duplex mismatch. Normal collisions can't happen on full-duplex.",
    examTip: "If you see 'late collisions' on a full-duplex link — that's always a duplex mismatch. Fix it immediately.",
    extraQuestions: [
      {
        question: "On a full-duplex link, what do late collisions typically indicate?",
        options: ["Cable too long", "Duplex mismatch", "Speed mismatch", "Bad NIC"],
        correct: 1,
        explanation: "Late collisions on a full-duplex link almost always indicate a duplex mismatch — one side is set to half-duplex."
      },
      {
        question: "Which error counter would you expect to increase with a bad Ethernet cable?",
        options: ["Collisions", "CRC errors", "Giants", "Deferred"],
        correct: 1,
        explanation: "CRC (Cyclic Redundancy Check) errors increase when there is physical cable damage, EMI interference, or a bad NIC causing corrupted frames."
      }
    ]
  },

  "1.5": {
    title: "TCP vs UDP",
    summary: "TCP is connection-oriented and guarantees delivery with acknowledgments, sequencing, and flow control. UDP is connectionless, fast, and used where some loss is acceptable.",
    keyPoints: [
      "TCP: 3-way handshake (SYN, SYN-ACK, ACK), guaranteed delivery, in-order",
      "UDP: no handshake, no acknowledgment, best-effort, lower overhead",
      "TCP: used for HTTP/S, SSH, FTP, email (SMTP/IMAP)",
      "UDP: used for DNS, DHCP, TFTP, VoIP, streaming, SNMP",
      "TCP has flow control (windowing) and congestion control"
    ],
    commands: [],
    memoryTip: "TCP = certified mail (receipt required). UDP = regular mail (drop and hope for the best).",
    examTip: "DNS uses UDP port 53 for queries, TCP port 53 for zone transfers. Know this dual behavior.",
    extraQuestions: [
      {
        question: "Which transport protocol is used by DHCP?",
        options: ["TCP", "UDP", "Both TCP and UDP", "ICMP"],
        correct: 1,
        explanation: "DHCP uses UDP — port 67 (server) and port 68 (client). Fast broadcast-based discovery doesn't need TCP reliability."
      },
      {
        question: "What is the TCP 3-way handshake sequence?",
        options: ["SYN, ACK, FIN", "SYN, SYN-ACK, ACK", "ACK, SYN, ACK", "SYN, RST, ACK"],
        correct: 1,
        explanation: "TCP connection establishment: client sends SYN, server responds SYN-ACK, client sends ACK. Session is now established."
      },
      {
        question: "Which protocol typically uses UDP port 53?",
        options: ["HTTP", "SSH", "DNS", "SMTP"],
        correct: 2,
        explanation: "DNS uses UDP port 53 for standard queries. It switches to TCP port 53 for zone transfers or responses > 512 bytes."
      }
    ]
  },

  "1.6": {
    title: "IPv4 Addressing and Subnetting",
    summary: "IPv4 addresses are 32-bit, written in dotted-decimal. Subnetting divides a network into smaller segments. CIDR notation expresses the subnet mask as a prefix length.",
    keyPoints: [
      "/24 = 255.255.255.0, 256 addresses, 254 usable hosts",
      "/25 = 255.255.255.128, 128 addresses, 126 usable hosts",
      "/30 = 255.255.255.252, 4 addresses, 2 usable hosts (point-to-point links)",
      "Network address = all host bits 0. Broadcast = all host bits 1",
      "2^n − 2 usable hosts (n = host bits); 2^s subnets (s = borrowed bits)"
    ],
    commands: [
      { cmd: "show ip interface brief", desc: "View IP addresses on all interfaces" },
      { cmd: "show ip interface GigabitEthernet0/1", desc: "Detailed IP config and status" }
    ],
    memoryTip: "Magic number trick: 256 − subnet mask octet = block size. Network addresses are multiples of block size.",
    examTip: "For /30 (point-to-point WAN links): 4 addresses, 2 usable. First = network, last = broadcast.",
    extraQuestions: [
      {
        question: "How many usable host addresses are in a /28 subnet?",
        options: ["14", "16", "30", "32"],
        correct: 0,
        explanation: "/28 = 16 addresses total. Subtract 2 (network + broadcast) = 14 usable hosts."
      },
      {
        question: "What is the subnet mask for a /26 network in dotted decimal?",
        options: ["255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.224"],
        correct: 2,
        explanation: "/26 means 26 bits are set to 1. The last octet: 11000000 = 192. So /26 = 255.255.255.192."
      }
    ]
  },

  "1.7": {
    title: "Private IPv4 Addressing",
    summary: "RFC 1918 defines private address ranges that are not routable on the public internet. They require NAT to communicate externally.",
    keyPoints: [
      "10.0.0.0/8 — Class A private, 10.0.0.0 to 10.255.255.255",
      "172.16.0.0/12 — Class B private, 172.16.0.0 to 172.31.255.255",
      "192.168.0.0/16 — Class C private, 192.168.0.0 to 192.168.255.255",
      "169.254.0.0/16 — APIPA (link-local), assigned when DHCP fails",
      "127.0.0.0/8 — loopback range; 127.0.0.1 is the loopback address"
    ],
    commands: [],
    memoryTip: "10-172-192: Think '10 for big, 172 for medium, 192 for small' office networks.",
    examTip: "169.254.x.x is APIPA — if you see this on a host, it couldn't reach a DHCP server.",
    extraQuestions: [
      {
        question: "Which address range is defined by RFC 1918 as a Class B private range?",
        options: ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16", "169.254.0.0/16"],
        correct: 1,
        explanation: "172.16.0.0/12 is the Class B private address range, spanning 172.16.0.0 to 172.31.255.255."
      }
    ]
  },

  "1.8": {
    title: "IPv6 Addressing and Prefix",
    summary: "IPv6 uses 128-bit addresses written in hexadecimal. Consecutive groups of all zeros can be compressed using :: (only once per address). Prefix length replaces subnet masks.",
    keyPoints: [
      "128 bits = 8 groups of 4 hex digits, separated by colons",
      "Compress leading zeros in each group: 0012 → 12",
      "Compress one consecutive run of all-zero groups with :: (only once)",
      "Global Unicast: 2000::/3 (routable, public)",
      "Link-local: FE80::/10 (required on every IPv6 interface, not routed)"
    ],
    commands: [
      { cmd: "ipv6 address 2001:db8::1/64", desc: "Assign a static IPv6 address" },
      { cmd: "show ipv6 interface brief", desc: "View all IPv6 addresses and states" }
    ],
    memoryTip: ":: is like an ellipsis — it hides all the zeros in between. Can only use it once.",
    examTip: "Every IPv6-enabled interface automatically gets a link-local address (FE80::) even if no global address is configured.",
    extraQuestions: [
      {
        question: "Which IPv6 address type is automatically assigned to every IPv6-enabled interface?",
        options: ["Global unicast", "Unique local", "Link-local", "Anycast"],
        correct: 2,
        explanation: "Every IPv6 interface automatically gets a link-local address in the FE80::/10 range. This is required for IPv6 to function on a link."
      },
      {
        question: "How many bits are in an IPv6 address?",
        options: ["32", "64", "96", "128"],
        correct: 3,
        explanation: "IPv6 uses 128-bit addresses, represented as 8 groups of 4 hexadecimal digits."
      }
    ]
  },

  "1.9": {
    title: "IPv6 Address Types",
    summary: "IPv6 has several address types: global unicast (public), link-local (on-link only), unique local (private), anycast (nearest node), and multicast (group communication).",
    keyPoints: [
      "Global Unicast (GUA): 2000::/3 — routable on internet, similar to public IPv4",
      "Link-local: FE80::/10 — only valid on local link, never routed",
      "Unique Local: FC00::/7 — like private IPv4, not routed on internet",
      "Multicast: FF00::/8 — one-to-many; FF02::1 = all-nodes, FF02::2 = all-routers",
      "Modified EUI-64: derives interface ID from 48-bit MAC (inserts FFFE in middle, flips bit 7)"
    ],
    commands: [
      { cmd: "show ipv6 interface GigabitEthernet0/0", desc: "See all IPv6 types on an interface" }
    ],
    memoryTip: "GUA starts with 2 or 3. Link-local starts with FE8. Multicast starts with FF. Unique local starts with FC/FD.",
    examTip: "EUI-64: take MAC (e.g. AA:BB:CC:DD:EE:FF), split in half, insert FF:FE, flip bit 7 of first byte → AABB:CCFF:FEDD:EEFF.",
    extraQuestions: [
      {
        question: "Which IPv6 multicast address represents all IPv6 routers on a link?",
        options: ["FF02::1", "FF02::2", "FF02::5", "FF02::9"],
        correct: 1,
        explanation: "FF02::2 is the all-routers multicast address. FF02::1 is all-nodes (all hosts and routers)."
      },
      {
        question: "What prefix is used for IPv6 Unique Local addresses?",
        options: ["2000::/3", "FE80::/10", "FC00::/7", "FF00::/8"],
        correct: 2,
        explanation: "Unique Local addresses use FC00::/7 (FC00:: to FDFF::). They are not routed on the internet, similar to RFC 1918 private addresses."
      }
    ]
  },

  "1.10": {
    title: "Verify IP Parameters (Client OS)",
    summary: "Different OS commands are used to verify IP configuration. ipconfig on Windows, ifconfig/ip on Linux/Mac. These confirm address, mask, gateway, and DNS settings.",
    keyPoints: [
      "Windows: ipconfig (brief) / ipconfig /all (detailed, shows MAC, DHCP server, DNS)",
      "Windows: ipconfig /release — drop DHCP lease; ipconfig /renew — get new lease",
      "Mac: ifconfig or networksetup -getinfo 'Ethernet'",
      "Linux: ip addr show or ip a (modern); ifconfig (legacy)",
      "All platforms: ping to test connectivity"
    ],
    commands: [
      { cmd: "ipconfig /all", desc: "(Windows) Full IP config with MAC, DHCP, DNS" },
      { cmd: "ip addr show", desc: "(Linux) Show all IP addresses" }
    ],
    memoryTip: "Windows = ipconfig. Linux = ip addr. Mac = ifconfig or networksetup.",
    examTip: "ipconfig /all shows the DHCP server IP and lease expiry — useful for troubleshooting DHCP issues.",
    extraQuestions: [
      {
        question: "What Windows command releases the current DHCP IP address?",
        options: ["ipconfig /renew", "ipconfig /all", "ipconfig /release", "ipconfig /flushdns"],
        correct: 2,
        explanation: "ipconfig /release sends a DHCP release message to the server and removes the IP address configuration."
      },
      {
        question: "Which Linux command shows current IP address configuration on all interfaces?",
        options: ["ifconfig all", "ip addr show", "netstat -i", "show ip interface brief"],
        correct: 1,
        explanation: "ip addr show (or ip a) is the modern Linux command to display IP configuration on all interfaces."
      }
    ]
  },

  "1.11": {
    title: "Wireless Principles",
    summary: "Wireless uses radio frequencies in the 2.4GHz and 5GHz bands. Non-overlapping channels prevent interference. SSID identifies the wireless network. Encryption (WPA2/WPA3) protects data.",
    keyPoints: [
      "2.4GHz: 3 non-overlapping channels (1, 6, 11) — longer range, more interference",
      "5GHz: 24+ non-overlapping channels — shorter range, less interference, faster",
      "SSID: Service Set Identifier — the network name broadcast by the AP",
      "BSSID: MAC address of the AP radio — uniquely identifies each AP",
      "CSMA/CA: wireless collision avoidance (can't detect while transmitting)"
    ],
    commands: [],
    memoryTip: "2.4GHz channels: 1, 6, 11 — think 'one, six, eleven' on a clock face.",
    examTip: "2.4GHz uses ONLY channels 1, 6, and 11 as non-overlapping. Any other combination causes overlap and interference.",
    extraQuestions: [
      {
        question: "Which 2.4GHz channels are non-overlapping?",
        options: ["1, 2, 3", "1, 5, 10", "1, 6, 11", "2, 7, 12"],
        correct: 2,
        explanation: "In the 2.4GHz band, only channels 1, 6, and 11 are non-overlapping in most regions."
      },
      {
        question: "What does SSID stand for?",
        options: ["Secure Subscriber Identification", "Service Set Identifier", "Signal Strength Indicator Device", "Subnet Segmentation ID"],
        correct: 1,
        explanation: "SSID stands for Service Set Identifier — it's the human-readable name broadcast by a wireless access point."
      }
    ]
  },

  "1.12": {
    title: "Virtualization (VMs, Containers, VRFs)",
    summary: "Virtualization allows multiple workloads to share physical hardware. VMs emulate full hardware. Containers share the OS kernel. VRFs create multiple virtual routing tables on one device.",
    keyPoints: [
      "Server virtualization: hypervisor (Type 1: bare metal / Type 2: hosted) creates VMs",
      "Type 1 hypervisors (ESXi, Hyper-V, KVM) run directly on hardware — used in production",
      "Containers (Docker): share OS kernel, lighter than VMs, faster to start",
      "VRF (Virtual Routing and Forwarding): multiple independent routing tables on one device",
      "VRFs used to separate tenant traffic on a shared infrastructure"
    ],
    commands: [
      { cmd: "show vrf", desc: "List all VRF instances on a Cisco device" }
    ],
    memoryTip: "VM = apartment in a building (own walls, own utilities). Container = studio sharing plumbing.",
    examTip: "Type 1 hypervisor = runs on bare metal (no OS underneath). Type 2 = runs on top of an OS (VMware Workstation, VirtualBox).",
    extraQuestions: [
      {
        question: "Which type of hypervisor runs directly on the physical hardware without a host operating system?",
        options: ["Type 2", "Type 1", "Containerized", "Hosted"],
        correct: 1,
        explanation: "Type 1 (bare-metal) hypervisors like VMware ESXi, Microsoft Hyper-V, and KVM run directly on hardware for maximum performance."
      }
    ]
  },

  "1.13": {
    title: "Switching Concepts",
    summary: "Switches learn MAC addresses dynamically and build a MAC address table to make forwarding decisions. Unknown destinations are flooded. Frames with known destinations are forwarded to the specific port.",
    keyPoints: [
      "MAC learning: switch records source MAC + ingress port into the MAC table",
      "MAC aging: default 300 seconds — entries expire if no frame seen from that MAC",
      "Unicast flooding: destination MAC unknown → send out all ports except source",
      "Broadcast flooding: destination FF:FF:FF:FF:FF:FF → always flooded",
      "MAC table: also called CAM table (Content Addressable Memory)"
    ],
    commands: [
      { cmd: "show mac address-table", desc: "View MAC address table" },
      { cmd: "show mac address-table aging-time", desc: "View MAC aging timer" }
    ],
    memoryTip: "Switch learns by watching who SENDS (source MAC). It floods when it doesn't know where to DELIVER (dest MAC).",
    examTip: "MAC flooding attack: attacker sends many frames with random source MACs to fill the CAM table, forcing the switch to flood all traffic.",
    extraQuestions: [
      {
        question: "What does a switch do when it receives a frame with an unknown destination MAC address?",
        options: ["Drops the frame", "Sends it back to the source", "Floods it out all ports except the ingress port", "Sends it to the default gateway"],
        correct: 2,
        explanation: "When the destination MAC is not in the MAC table, the switch floods the frame out all ports except the one it arrived on."
      },
      {
        question: "How does a switch populate its MAC address table?",
        options: ["By examining destination MAC addresses", "By examining source MAC addresses", "Through CDP neighbor discovery", "Through ARP requests only"],
        correct: 1,
        explanation: "Switches learn MAC addresses from the SOURCE MAC address of incoming frames and associate them with the ingress port."
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════════
     DOMAIN 2 — NETWORK ACCESS (20%)
  ══════════════════════════════════════════════════════════════ */

  "2.1": {
    title: "VLANs",
    summary: "VLANs segment a switch into logical broadcast domains. Access ports carry traffic for one VLAN. The default VLAN is VLAN 1. Inter-VLAN routing requires a router or L3 switch.",
    keyPoints: [
      "VLANs separate broadcast domains — traffic in VLAN 10 never reaches VLAN 20",
      "Access port: belongs to exactly one VLAN; host connects here",
      "VLAN 1 is the default — all ports are in VLAN 1 by default",
      "VLAN database is stored in vlan.dat (flash memory), not running-config",
      "Native VLAN (default VLAN 1) on trunks passes untagged"
    ],
    commands: [
      { cmd: "vlan 10", desc: "Create VLAN 10" },
      { cmd: "name SALES", desc: "Name the VLAN" },
      { cmd: "interface GigabitEthernet0/1\n switchport mode access\n switchport access vlan 10", desc: "Assign port to VLAN 10" },
      { cmd: "show vlan brief", desc: "List all VLANs and their ports" }
    ],
    memoryTip: "VLANs = separate floors in a building. Devices on different floors can't talk without going through the lobby (router).",
    examTip: "Deleting a VLAN removes vlan.dat but ports remain assigned to that VLAN — they go inactive. Reassign them.",
    extraQuestions: [
      {
        question: "Where is the VLAN database stored on a Cisco switch?",
        options: ["Running-config", "Startup-config", "NVRAM", "Flash memory (vlan.dat)"],
        correct: 3,
        explanation: "The VLAN database is stored in vlan.dat in flash memory, separate from the running and startup configs."
      },
      {
        question: "What is the default VLAN on Cisco switches?",
        options: ["VLAN 0", "VLAN 1", "VLAN 99", "VLAN 1002"],
        correct: 1,
        explanation: "VLAN 1 is the default VLAN on Cisco switches. All ports are assigned to VLAN 1 by default."
      }
    ]
  },

  "2.2": {
    title: "Interswitch Connectivity (Trunking)",
    summary: "Trunk ports carry multiple VLANs between switches using 802.1Q tagging. Each frame gets a 4-byte 802.1Q header with VLAN ID. Native VLAN traffic passes untagged.",
    keyPoints: [
      "802.1Q adds a 4-byte tag to Ethernet frame with VLAN ID (12 bits = 4094 VLANs)",
      "Trunk port: carries traffic for multiple VLANs between switches",
      "Native VLAN: traffic sent untagged on trunk — must match both ends (security risk if mismatched)",
      "DTP (Dynamic Trunk Protocol): Cisco proprietary, negotiates trunk automatically",
      "Allowed VLANs on trunk: can be restricted with switchport trunk allowed vlan"
    ],
    commands: [
      { cmd: "interface GigabitEthernet0/1\n switchport mode trunk", desc: "Force trunk mode" },
      { cmd: "switchport trunk native vlan 99", desc: "Change native VLAN to 99" },
      { cmd: "switchport trunk allowed vlan 10,20,30", desc: "Limit trunk to specific VLANs" },
      { cmd: "show interfaces trunk", desc: "Verify trunk status, allowed VLANs, native VLAN" }
    ],
    memoryTip: "Trunk = highway carrying traffic from many cities (VLANs). 802.1Q tag = the license plate showing which city.",
    examTip: "Native VLAN mismatch is a security vulnerability — it allows VLAN hopping. Always set native VLAN to an unused VLAN (e.g., 999).",
    extraQuestions: [
      {
        question: "What does 802.1Q add to an Ethernet frame when a port is in trunk mode?",
        options: ["A new IP header", "A 4-byte VLAN tag", "A preamble field", "An 8-byte tunnel header"],
        correct: 1,
        explanation: "802.1Q inserts a 4-byte tag into the Ethernet frame containing the TPID (0x8100) and VLAN ID."
      },
      {
        question: "Which statement about the native VLAN on a trunk is correct?",
        options: ["It must be VLAN 1", "Its traffic is transmitted untagged", "It cannot be changed", "It carries all VLAN traffic"],
        correct: 1,
        explanation: "Native VLAN traffic is transmitted untagged on a trunk link. If the native VLAN differs between switches, frames may be forwarded to the wrong VLAN."
      }
    ]
  },

  "2.3": {
    title: "Layer 2 Discovery (CDP, LLDP)",
    summary: "CDP and LLDP are Layer 2 discovery protocols that allow network devices to advertise themselves to neighbors. CDP is Cisco-proprietary, LLDP is the open IEEE standard.",
    keyPoints: [
      "CDP (Cisco Discovery Protocol): Layer 2, Cisco-only, enabled by default",
      "CDP sends multicast hellos every 60 seconds, hold time 180 seconds",
      "LLDP (Link Layer Discovery Protocol): IEEE 802.1AB, vendor-neutral, disabled by default on Cisco",
      "Both reveal: device ID, IP address, platform, port ID, capabilities",
      "Security: disable CDP/LLDP on external/untrusted interfaces"
    ],
    commands: [
      { cmd: "show cdp neighbors", desc: "List directly connected Cisco neighbors" },
      { cmd: "show cdp neighbors detail", desc: "Show IP, platform, IOS version of neighbors" },
      { cmd: "no cdp enable", desc: "Disable CDP on an interface" },
      { cmd: "lldp run", desc: "Enable LLDP globally" },
      { cmd: "show lldp neighbors", desc: "Show LLDP neighbor table" }
    ],
    memoryTip: "CDP = Cisco's gossip protocol. LLDP = the open standard everyone can use.",
    examTip: "CDP is enabled globally and per-interface. 'no cdp run' disables globally. 'no cdp enable' disables per interface.",
    extraQuestions: [
      {
        question: "What is the default CDP hello timer on Cisco devices?",
        options: ["10 seconds", "30 seconds", "60 seconds", "120 seconds"],
        correct: 2,
        explanation: "CDP sends hello packets every 60 seconds by default, with a hold time of 180 seconds (3x the timer)."
      },
      {
        question: "Which discovery protocol is IEEE standard and vendor-neutral?",
        options: ["CDP", "VTP", "LLDP", "PVST+"],
        correct: 2,
        explanation: "LLDP (Link Layer Discovery Protocol, IEEE 802.1AB) is the open, vendor-neutral alternative to Cisco's CDP."
      }
    ]
  },

  "2.4": {
    title: "EtherChannel (LACP)",
    summary: "EtherChannel bundles multiple physical links into one logical link for redundancy and bandwidth aggregation. LACP (IEEE) and PAgP (Cisco) negotiate EtherChannel formation.",
    keyPoints: [
      "LACP (802.3ad): IEEE standard — modes: active (initiates) / passive (waits)",
      "PAgP: Cisco proprietary — modes: desirable (initiates) / auto (waits)",
      "Static EtherChannel (mode on): forces the bundle, no negotiation",
      "All member ports must match: speed, duplex, VLAN config, trunk settings",
      "Max 8 active links per EtherChannel (LACP supports 8 active + 8 standby)"
    ],
    commands: [
      { cmd: "interface range GigabitEthernet0/1 - 2\n channel-group 1 mode active", desc: "Create EtherChannel with LACP active" },
      { cmd: "interface Port-channel 1\n switchport mode trunk", desc: "Configure the logical port-channel" },
      { cmd: "show etherchannel summary", desc: "Verify EtherChannel state" }
    ],
    memoryTip: "LACP active = always trying to bond. Passive = waiting to be asked. You need at least one active.",
    examTip: "For LACP to form: one side must be active. Active+Active works. Active+Passive works. Passive+Passive = NO channel.",
    extraQuestions: [
      {
        question: "Which EtherChannel negotiation protocol is the IEEE standard?",
        options: ["PAgP", "LACP", "VTP", "DTP"],
        correct: 1,
        explanation: "LACP (Link Aggregation Control Protocol, IEEE 802.3ad) is the open standard. PAgP is Cisco proprietary."
      },
      {
        question: "What happens if both sides of an EtherChannel are set to LACP passive mode?",
        options: ["EtherChannel forms normally", "EtherChannel does not form", "A single link becomes active", "LACP sends error messages"],
        correct: 1,
        explanation: "LACP passive waits for the other side to initiate. Passive+Passive = neither side initiates = no EtherChannel."
      }
    ]
  },

  "2.5": {
    title: "Rapid PVST+ / Spanning Tree",
    summary: "STP prevents Layer 2 loops by blocking redundant paths. RSTP (Rapid PVST+) converges much faster than classic STP. One root bridge is elected per VLAN based on bridge priority.",
    keyPoints: [
      "Root bridge election: lowest bridge priority (default 32768) wins; tie = lowest MAC",
      "Root port: best path toward root bridge (non-root switches only)",
      "Designated port: best port on each network segment",
      "Non-designated (blocking): receives BPDUs but doesn't forward data",
      "RSTP port states: Discarding, Learning, Forwarding (STP had Blocking/Listening/Learning/Forwarding/Disabled)",
      "PortFast: skip Learning/Forwarding on access ports; BPDU Guard shuts port if BPDU received"
    ],
    commands: [
      { cmd: "spanning-tree vlan 10 priority 0", desc: "Make this switch root bridge for VLAN 10" },
      { cmd: "spanning-tree vlan 10 root primary", desc: "Automatically set optimal priority for root" },
      { cmd: "interface GigabitEthernet0/1\n spanning-tree portfast\n spanning-tree bpduguard enable", desc: "Enable PortFast + BPDU Guard on access port" },
      { cmd: "show spanning-tree vlan 10", desc: "View STP topology for VLAN 10" }
    ],
    memoryTip: "Lowest priority = root bridge. Think: 'lowest wins the throne.' Bridge priority is set in multiples of 4096.",
    examTip: "Bridge priority must be multiples of 4096. Default = 32768. To become root: set to 0 or use 'root primary' macro.",
    extraQuestions: [
      {
        question: "What determines the root bridge in Spanning Tree Protocol?",
        options: ["Highest IP address", "Lowest bridge priority (then lowest MAC as tiebreaker)", "Highest MAC address", "Highest bridge priority"],
        correct: 1,
        explanation: "The root bridge is the switch with the lowest bridge priority. If there's a tie, the switch with the lowest MAC address wins."
      },
      {
        question: "What does BPDU Guard do when enabled on a PortFast port?",
        options: ["Sends BPDUs to the neighboring switch", "Shuts down the port if a BPDU is received", "Enables faster STP convergence", "Forwards BPDUs to the root bridge"],
        correct: 1,
        explanation: "BPDU Guard places an access port into err-disabled state if a BPDU is received, protecting the STP topology from rogue switches."
      }
    ]
  },

  "2.6": {
    title: "Cisco Wireless Architectures and AP Modes",
    summary: "Cisco wireless uses autonomous APs or lightweight APs managed by a WLC. Different AP modes serve different purposes: local, FlexConnect, monitor, and sniffer.",
    keyPoints: [
      "Autonomous AP: standalone, fully configured locally, no WLC needed",
      "Lightweight AP: thin AP, all config managed centrally by WLC via CAPWAP",
      "Local mode: default AP mode, serves clients and does RRM/monitoring",
      "FlexConnect: AP can switch traffic locally if WLC connection is lost",
      "Monitor mode: passive scanning only — no client traffic, used for WIDS/WIPS",
      "Sniffer mode: captures all RF frames and sends to packet analyzer (like Wireshark)"
    ],
    commands: [
      { cmd: "show ap summary", desc: "(WLC CLI) List all associated APs" }
    ],
    memoryTip: "FlexConnect = flexible backup — still works locally when the WLC link breaks.",
    examTip: "Local mode = default. FlexConnect = survivability. Monitor = WIDS sensor. Sniffer = packet capture.",
    extraQuestions: [
      {
        question: "Which AP mode allows the AP to continue serving clients locally even when the WLC is unreachable?",
        options: ["Local mode", "Monitor mode", "FlexConnect mode", "Sniffer mode"],
        correct: 2,
        explanation: "FlexConnect (formerly H-REAP) allows APs to switch traffic locally and authenticate clients even when the WLC connection is lost."
      },
      {
        question: "What protocol do lightweight APs use to communicate with a WLC?",
        options: ["CDP", "LLDP", "CAPWAP", "LWAPP"],
        correct: 2,
        explanation: "CAPWAP (Control and Provisioning of Wireless Access Points) is the current standard protocol for WLC-AP communication."
      }
    ]
  },

  "2.7": {
    title: "WLAN Physical Infrastructure",
    summary: "APs connect to switches via access ports (for a single VLAN) or trunk ports (for multiple SSIDs/VLANs). WLCs connect via trunk ports. LAG bundles WLC uplinks.",
    keyPoints: [
      "AP to switch: typically access port (one SSID) or trunk port (multiple SSIDs mapped to VLANs)",
      "WLC to switch: trunk port — management and AP-manager VLANs traverse this link",
      "LAG (Link Aggregation Group): bundles WLC uplinks for redundancy and throughput",
      "AP can run a management VLAN and multiple client-serving VLANs",
      "CAPWAP tunnels carry both control (UDP 5246) and data (UDP 5247)"
    ],
    commands: [],
    memoryTip: "WLC always needs a trunk — it handles multiple VLANs for management and multiple SSIDs.",
    examTip: "CAPWAP uses UDP 5246 for control traffic and UDP 5247 for data. Both are encapsulated in CAPWAP.",
    extraQuestions: [
      {
        question: "What type of switch port should be used to connect a WLC that manages multiple SSIDs/VLANs?",
        options: ["Access port", "Trunk port", "Routed port", "Voice VLAN port"],
        correct: 1,
        explanation: "A WLC needs a trunk port because it handles management VLANs and multiple SSIDs, each mapped to a different VLAN."
      }
    ]
  },

  "2.8": {
    title: "AP and WLC Management Access",
    summary: "APs and WLCs support multiple management access methods. SSH is preferred over Telnet. HTTPS is preferred over HTTP. TACACS+ and RADIUS handle centralized AAA.",
    keyPoints: [
      "Telnet: insecure, plaintext, TCP port 23 — use only in isolated labs",
      "SSH: encrypted, TCP port 22 — always prefer SSH over Telnet",
      "HTTP: port 80, cleartext web GUI — disable in production",
      "HTTPS: port 443, encrypted web GUI — standard for WLC GUI access",
      "Console: direct out-of-band management via RJ-45/USB",
      "TACACS+ (TCP 49): encrypts entire packet, used for device administration",
      "RADIUS (UDP 1812/1813): encrypts only password, used for network access authentication"
    ],
    commands: [
      { cmd: "ip ssh version 2", desc: "Force SSH version 2 (more secure)" },
      { cmd: "line vty 0 4\n transport input ssh", desc: "Restrict VTY to SSH only" }
    ],
    memoryTip: "TACACS+ = full encryption, for admins. RADIUS = password encryption, for users logging into the network.",
    examTip: "TACACS+ encrypts the ENTIRE packet. RADIUS only encrypts the password. TACACS+ is preferred for device management.",
    extraQuestions: [
      {
        question: "Which protocol encrypts the entire authentication packet and is typically used for device administration?",
        options: ["RADIUS", "TACACS+", "LDAP", "Kerberos"],
        correct: 1,
        explanation: "TACACS+ (TCP port 49) encrypts the entire packet body. RADIUS only encrypts the password field."
      },
      {
        question: "What TCP port does SSH use?",
        options: ["21", "22", "23", "443"],
        correct: 1,
        explanation: "SSH uses TCP port 22. Telnet uses TCP port 23. SSH encrypts all traffic including credentials."
      }
    ]
  },

  "2.9": {
    title: "Wireless LAN GUI Configuration",
    summary: "The WLC GUI is used to create WLANs (SSIDs), configure security (WPA2/WPA3), map to interface/VLAN, set QoS policies, and verify client associations.",
    keyPoints: [
      "WLAN creation: name SSID, choose interface/VLAN, configure Layer 2 security",
      "WPA2 PSK: pre-shared key, suitable for SOHO/small environments",
      "WPA2 Enterprise: uses 802.1X + RADIUS server for per-user authentication",
      "QoS profile: maps DSCP markings for voice/video WLANs",
      "Advanced settings: band select, load balancing, client exclusion"
    ],
    commands: [],
    memoryTip: "PSK = password on the door. Enterprise = ID card checked at the door by a security guard (RADIUS).",
    examTip: "Each WLAN on a WLC maps to a dynamic interface (VLAN). Management interface is for AP-WLC communication only.",
    extraQuestions: [
      {
        question: "In a WLC WLAN configuration, what does the 'dynamic interface' represent?",
        options: ["The management IP of the WLC", "The VLAN that WLAN traffic is mapped to", "The AP radio frequency band", "The RADIUS server assignment"],
        correct: 1,
        explanation: "Each dynamic interface on a WLC corresponds to a VLAN. WLANs are mapped to dynamic interfaces to segment client traffic."
      },
      {
        question: "Which wireless security mode requires a RADIUS server for per-user authentication?",
        options: ["WPA2 PSK", "WPA2 Personal", "WPA2 Enterprise", "WEP"],
        correct: 2,
        explanation: "WPA2 Enterprise uses 802.1X authentication with a RADIUS server, providing per-user credentials instead of a shared password."
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════════
     DOMAIN 3 — IP CONNECTIVITY (25%)
  ══════════════════════════════════════════════════════════════ */

  "3.1": {
    title: "Routing Table Components",
    summary: "The routing table maps destination networks to next-hop addresses or exit interfaces. Each entry includes protocol code, prefix, AD, metric, next hop, and age.",
    keyPoints: [
      "C = Connected, L = Local, S = Static, O = OSPF, R = RIP, B = BGP",
      "AD (Administrative Distance): lower = more trusted. Connected=0, Static=1, OSPF=110, RIP=120",
      "Metric: cost within a routing protocol — OSPF uses cost (ref BW / interface BW)",
      "Longest prefix match: router always uses the most specific route",
      "Gateway of last resort: 0.0.0.0/0 — used when no specific route matches"
    ],
    commands: [
      { cmd: "show ip route", desc: "Display the full routing table" },
      { cmd: "show ip route 192.168.1.0", desc: "Show the best route to a specific network" }
    ],
    memoryTip: "AD = how much you trust the source. Metric = how much effort to reach the destination.",
    examTip: "If two routing protocols both have a route to the same prefix, the one with the LOWER AD wins, regardless of metric.",
    extraQuestions: [
      {
        question: "What is the Administrative Distance for OSPF?",
        options: ["1", "90", "110", "120"],
        correct: 2,
        explanation: "OSPF has an AD of 110. Connected routes = 0, Static = 1, EIGRP = 90, OSPF = 110, RIP = 120."
      },
      {
        question: "A router has two routes: 10.0.0.0/8 and 10.1.0.0/24. A packet arrives for 10.1.0.5. Which route is used?",
        options: ["10.0.0.0/8 (it was installed first)", "10.1.0.0/24 (longest prefix match)", "Both routes are used (load balance)", "Neither — packet is dropped"],
        correct: 1,
        explanation: "Longest prefix match always wins. /24 is more specific than /8, so the 10.1.0.0/24 route is used."
      }
    ]
  },

  "3.2": {
    title: "Router Forwarding Decisions",
    summary: "When multiple routes match a destination, the router picks the best one: first by longest prefix match, then by AD, then by metric. Floating static routes serve as backup.",
    keyPoints: [
      "Longest prefix match: most specific prefix always wins (e.g., /30 beats /24 beats /0)",
      "If same prefix length, lower AD wins",
      "If same AD, lower metric wins",
      "Floating static route: static route with higher AD than dynamic route — used as backup",
      "Typical floating static: AD 200-254 (higher than any dynamic protocol)"
    ],
    commands: [
      { cmd: "ip route 0.0.0.0 0.0.0.0 10.0.0.1 200", desc: "Floating default route with AD 200" }
    ],
    memoryTip: "Route selection order: Specific first → Trust second (AD) → Cost third (metric).",
    examTip: "A floating static is only installed when the primary dynamic route disappears. Set its AD higher than the dynamic protocol's AD.",
    extraQuestions: [
      {
        question: "What is the purpose of a floating static route?",
        options: ["To replace all dynamic routing", "To serve as a backup route when the primary dynamic route fails", "To load balance between two paths", "To reduce routing table size"],
        correct: 1,
        explanation: "A floating static route has a higher AD than the dynamic routing protocol. It only appears in the routing table when the dynamic route is gone."
      }
    ]
  },

  "3.3": {
    title: "IPv4 and IPv6 Static Routing",
    summary: "Static routes are manually configured and don't adapt to topology changes. They include default routes (0.0.0.0/0), network routes, host routes (/32 or /128), and floating static routes.",
    keyPoints: [
      "Default route: ip route 0.0.0.0 0.0.0.0 [next-hop] — matches any destination",
      "Network route: ip route 192.168.2.0 255.255.255.0 [next-hop]",
      "Host route: ip route 10.1.1.1 255.255.255.255 [next-hop] — most specific (/32)",
      "IPv6 default: ipv6 route ::/0 [next-hop]",
      "Can specify next-hop IP or exit interface (or both — best practice is both)"
    ],
    commands: [
      { cmd: "ip route 192.168.2.0 255.255.255.0 10.0.0.2", desc: "Static route via next-hop" },
      { cmd: "ip route 0.0.0.0 0.0.0.0 10.0.0.1", desc: "Default route" },
      { cmd: "ipv6 route 2001:db8::/32 2001:db8::1", desc: "IPv6 static route" },
      { cmd: "show ip route static", desc: "View static routes only" }
    ],
    memoryTip: "Static routes are like GPS routes you type in manually. If the road changes, they don't update automatically.",
    examTip: "On serial interfaces, specify exit interface alone (it works). On Ethernet, always specify next-hop IP (avoids proxy ARP issues).",
    extraQuestions: [
      {
        question: "Which static route configuration creates a default route on a Cisco router?",
        options: ["ip route 0.0.0.0 0.0.0.0 10.0.0.1", "ip route default 0.0.0.0 10.0.0.1", "ip default-route 10.0.0.1", "ip route 255.255.255.255 0.0.0.0 10.0.0.1"],
        correct: 0,
        explanation: "ip route 0.0.0.0 0.0.0.0 [next-hop] configures the IPv4 default route, matching any destination not found elsewhere in the routing table."
      }
    ]
  },

  "3.4": {
    title: "Single-Area OSPFv2",
    summary: "OSPF is a link-state routing protocol that builds a map of the network using LSAs. Neighbors form adjacencies through Hello packets. DR/BDR election happens on broadcast segments.",
    keyPoints: [
      "Hello interval: 10s (broadcast/P2P), 30s (NBMA). Dead = 4× hello",
      "OSPF states: Down → Init → 2-Way → ExStart → Exchange → Loading → Full",
      "DR/BDR election: highest priority wins (default 1); tie = highest RID. Priority 0 = never DR",
      "Router ID: highest loopback IP, then highest interface IP (or manually set)",
      "Cost = reference bandwidth / interface bandwidth. Default ref BW = 100 Mbps",
      "Area 0 = backbone area. All areas must connect to Area 0"
    ],
    commands: [
      { cmd: "router ospf 1\n network 192.168.1.0 0.0.0.255 area 0", desc: "Enable OSPF on interfaces in that range" },
      { cmd: "router-id 1.1.1.1", desc: "Manually set OSPF router ID" },
      { cmd: "show ip ospf neighbor", desc: "Verify neighbor adjacencies and DR/BDR" },
      { cmd: "show ip ospf interface GigabitEthernet0/0", desc: "Verify OSPF hello/dead timers, cost" }
    ],
    memoryTip: "OSPF states: 'Down In 2 ExchangeS Loading Fully' — Down, Init, 2-Way, ExStart, Exchange, Loading, Full.",
    examTip: "OSPF 'Full' state = fully adjacent = route exchange complete. '2-Way' on broadcast = can see each other but not fully adjacent (with non-DR/BDR).",
    extraQuestions: [
      {
        question: "What is the default OSPF hello interval on a broadcast network?",
        options: ["5 seconds", "10 seconds", "30 seconds", "60 seconds"],
        correct: 1,
        explanation: "Default OSPF hello interval on broadcast (Ethernet) and point-to-point networks is 10 seconds. NBMA default is 30 seconds."
      },
      {
        question: "In OSPF, what does 'DR election' occur based on, in what order?",
        options: ["Highest MAC, then highest IP", "Lowest IP, then lowest RID", "Highest priority, then highest Router ID", "Lowest cost, then lowest priority"],
        correct: 2,
        explanation: "DR/BDR election: highest OSPF priority wins (default 1, 0 = ineligible). Tie = highest Router ID."
      }
    ]
  },

  "3.5": {
    title: "First Hop Redundancy (HSRP, VRRP, GLBP)",
    summary: "FHRPs provide gateway redundancy by presenting a virtual IP/MAC shared between two routers. If the active router fails, the standby takes over automatically.",
    keyPoints: [
      "HSRP (Hot Standby Router Protocol): Cisco proprietary. Active/Standby. Virtual IP + MAC",
      "VRRP (Virtual Router Redundancy Protocol): IEEE standard, similar to HSRP. Master/Backup",
      "GLBP (Gateway Load Balancing Protocol): Cisco. One AVG + multiple AVFs — actual load balancing",
      "HSRP priority: default 100, higher wins. Preempt: allows higher-priority to reclaim active role",
      "HSRP hello: 3 seconds, hold time 10 seconds"
    ],
    commands: [
      { cmd: "interface GigabitEthernet0/0\n standby 1 ip 10.0.0.1\n standby 1 priority 110\n standby 1 preempt", desc: "Configure HSRP group 1" },
      { cmd: "show standby", desc: "Verify HSRP active/standby status" }
    ],
    memoryTip: "HSRP: Active router owns the virtual IP/MAC. Standby watches and waits. Virtual MAC = 0000.0C07.ACxx (xx = group).",
    examTip: "Without preempt, the original active router won't automatically take back active role after recovery — even if it has higher priority.",
    extraQuestions: [
      {
        question: "Which FHRP is Cisco-proprietary and uses an Active/Standby model?",
        options: ["VRRP", "GLBP", "HSRP", "IRDP"],
        correct: 2,
        explanation: "HSRP (Hot Standby Router Protocol) is Cisco proprietary. VRRP (Master/Backup) is the IEEE standard equivalent."
      },
      {
        question: "What does the 'preempt' option do in HSRP?",
        options: ["Forces standby to never become active", "Allows the higher-priority router to take back the active role after recovery", "Disables hello packets", "Sets the group number"],
        correct: 1,
        explanation: "Preempt allows the router with the highest priority to automatically take back the active role when it recovers, even if another router is currently active."
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════════
     DOMAIN 4 — IP SERVICES (10%)
  ══════════════════════════════════════════════════════════════ */

  "4.1": {
    title: "NAT / PAT",
    summary: "NAT translates private IP addresses to public IPs for internet access. PAT (overload) maps many private IPs to one public IP using port numbers to track sessions.",
    keyPoints: [
      "Static NAT: one-to-one permanent mapping (server publishing)",
      "Dynamic NAT: pool of public IPs, first-come first-served",
      "PAT (overload): many-to-one using port numbers — most common home/enterprise",
      "Inside local: private IP of host. Inside global: public IP after NAT",
      "ip nat inside / ip nat outside: required on each interface"
    ],
    commands: [
      { cmd: "ip nat inside source static 192.168.1.10 203.0.113.10", desc: "Static NAT mapping" },
      { cmd: "ip nat inside source list 1 interface GigabitEthernet0/0 overload", desc: "PAT using outbound interface" },
      { cmd: "show ip nat translations", desc: "View active NAT translation table" }
    ],
    memoryTip: "PAT = overload. One public IP, thousands of sessions tracked by port number. Like extensions on a phone system.",
    examTip: "Inside local = private IP on LAN. Inside global = public IP after translation. Know all four NAT terms.",
    extraQuestions: [
      {
        question: "What type of NAT uses a single public IP address for many private hosts by tracking sessions using port numbers?",
        options: ["Static NAT", "Dynamic NAT", "PAT (overload)", "Twice NAT"],
        correct: 2,
        explanation: "PAT (Port Address Translation, also called NAT overload) maps many internal private IPs to one public IP, using unique port numbers to track each session."
      },
      {
        question: "In Cisco NAT terminology, what is the 'inside local' address?",
        options: ["The public IP after translation", "The private IP address of an internal host", "The router's outside interface IP", "The DNS server's address"],
        correct: 1,
        explanation: "Inside local = the private IP address of the internal host as seen inside the network, before NAT translation."
      }
    ]
  },

  "4.2": {
    title: "NTP",
    summary: "NTP synchronizes clocks across network devices. Accurate time is critical for log correlation, security certificates, and routing protocols. Cisco routers can act as NTP client, server, or both.",
    keyPoints: [
      "NTP uses UDP port 123",
      "Stratum: 0 = atomic clock (reference), 1 = directly connected to stratum 0, etc.",
      "Lower stratum = more accurate. Stratum 16 = unsynchronized",
      "NTP client: ntp server [IP] — syncs to a server",
      "Cisco as NTP server: ntp master [stratum] — serves time to clients"
    ],
    commands: [
      { cmd: "ntp server 216.239.35.0", desc: "Configure NTP client pointing to a server" },
      { cmd: "ntp master 3", desc: "Configure device as NTP stratum 3 server" },
      { cmd: "show ntp status", desc: "Verify sync status and stratum" },
      { cmd: "show ntp associations", desc: "View NTP peers and reference" }
    ],
    memoryTip: "Stratum = distance from the truth. Stratum 1 = almost perfect. Higher number = further from the source.",
    examTip: "Always verify NTP is working before troubleshooting certificate or logging issues — many problems trace back to clock drift.",
    extraQuestions: [
      {
        question: "Which UDP port does NTP use?",
        options: ["53", "67", "123", "161"],
        correct: 2,
        explanation: "NTP uses UDP port 123 for time synchronization between clients and servers."
      },
      {
        question: "What does the NTP stratum value indicate?",
        options: ["The encryption strength", "The distance from a reference clock source", "The polling interval", "The number of clients connected"],
        correct: 1,
        explanation: "NTP stratum indicates how many hops away a device is from a reference clock. Stratum 1 = directly connected to atomic clock."
      }
    ]
  },

  "4.3": {
    title: "DHCP and DNS",
    summary: "DHCP dynamically assigns IP addresses using the DORA process. DNS resolves domain names to IP addresses. DHCP relay (ip helper-address) forwards DHCP requests across subnets.",
    keyPoints: [
      "DORA: Discover (broadcast) → Offer → Request → Acknowledge",
      "DHCP provides: IP, mask, gateway, DNS server, lease time",
      "ip helper-address: on routers, forwards DHCP broadcasts to DHCP server across subnets",
      "DNS A record: name → IPv4. AAAA record: name → IPv6. MX: mail. CNAME: alias",
      "DNS uses UDP 53 (queries), TCP 53 (zone transfers)"
    ],
    commands: [
      { cmd: "ip dhcp pool LAN\n network 192.168.1.0 255.255.255.0\n default-router 192.168.1.1\n dns-server 8.8.8.8", desc: "Configure DHCP pool" },
      { cmd: "interface GigabitEthernet0/0\n ip helper-address 10.0.0.5", desc: "DHCP relay to server at 10.0.0.5" }
    ],
    memoryTip: "DORA = Discover, Offer, Request, Acknowledge. Like flagging a taxi: wave → taxi offers ride → you confirm → taxi confirms.",
    examTip: "ip helper-address goes on the router interface facing the client, not the server side. It converts broadcasts to unicast.",
    extraQuestions: [
      {
        question: "What is the correct order of the DHCP process?",
        options: ["Offer, Discover, Acknowledge, Request", "Discover, Offer, Request, Acknowledge", "Request, Offer, Discover, Acknowledge", "Discover, Request, Offer, Acknowledge"],
        correct: 1,
        explanation: "DORA: Discover (client broadcasts) → Offer (server responds) → Request (client asks for the offered IP) → Acknowledge (server confirms)."
      }
    ]
  },

  "4.4": {
    title: "SNMP",
    summary: "SNMP monitors and manages network devices. The manager polls agents, or agents send traps on events. MIB is the database of managed objects. SNMPv3 adds encryption and authentication.",
    keyPoints: [
      "Components: Manager (NMS), Agent (on devices), MIB (database of objects), OID (unique object ID)",
      "SNMPv1/v2c: community strings (cleartext) — 'public' read, 'private' read-write",
      "SNMPv3: adds AuthPriv (authentication + encryption) — use in production",
      "Trap (UDP 162): unsolicited alert from agent to manager",
      "Get/GetNext/GetBulk (UDP 161): manager queries agent"
    ],
    commands: [
      { cmd: "snmp-server community public RO", desc: "Read-only community string (v2c)" },
      { cmd: "snmp-server host 10.0.0.100 traps public", desc: "Send traps to NMS server" }
    ],
    memoryTip: "SNMP manager = boss asking questions. Agent = worker answering. Trap = worker calling the boss with an alert.",
    examTip: "SNMPv3 has three security levels: noAuthNoPriv, authNoPriv, authPriv. Use authPriv (MD5/SHA + AES/DES) in production.",
    extraQuestions: [
      {
        question: "What SNMP message type does an agent send unsolicited to the manager when an event occurs?",
        options: ["Get", "Set", "Trap", "Inform"],
        correct: 2,
        explanation: "A Trap is an unsolicited notification sent from an SNMP agent to the manager when a significant event occurs (e.g., interface down)."
      },
      {
        question: "Which SNMP version adds authentication and encryption for security?",
        options: ["SNMPv1", "SNMPv2c", "SNMPv3", "SNMPv4"],
        correct: 2,
        explanation: "SNMPv3 adds authentication (MD5/SHA) and privacy/encryption (DES/AES). Earlier versions use plaintext community strings."
      }
    ]
  },

  "4.5": {
    title: "Syslog",
    summary: "Syslog sends log messages from devices to a central server. Severity levels 0-7 determine message importance. Cisco devices generate syslog for interface changes, security events, and more.",
    keyPoints: [
      "Severity 0 (Emergency) → 7 (Debug). Lower = more severe",
      "0: Emergency, 1: Alert, 2: Critical, 3: Error, 4: Warning, 5: Notice, 6: Informational, 7: Debug",
      "Syslog server uses UDP 514",
      "logging host [IP]: send syslog to external server",
      "logging buffered: store in RAM. logging console: display on console"
    ],
    commands: [
      { cmd: "logging host 10.0.0.100", desc: "Send syslog to external server" },
      { cmd: "logging buffered 64000 informational", desc: "Buffer up to severity 6" },
      { cmd: "show logging", desc: "View buffered log messages" }
    ],
    memoryTip: "Syslog mnemonic: 'Every Awful Cisco Engineer Will Never Do Debugging' — Emergency, Alert, Critical, Error, Warning, Notice, Debug.",
    examTip: "'logging trap [level]' sets the maximum severity sent to the syslog server. E.g., 'logging trap warnings' sends 0-4 only.",
    extraQuestions: [
      {
        question: "What is the syslog severity level for 'Emergency' messages?",
        options: ["0", "1", "2", "7"],
        correct: 0,
        explanation: "Syslog severity 0 = Emergency (system is unusable). Severity 7 = Debug (lowest priority, most verbose)."
      },
      {
        question: "Which UDP port does syslog use by default?",
        options: ["123", "161", "162", "514"],
        correct: 3,
        explanation: "Syslog uses UDP port 514 by default to send log messages to a centralized syslog server."
      }
    ]
  },

  "4.6": {
    title: "DHCP Client and Relay",
    summary: "DHCP clients request IPs automatically. When clients and servers are on different subnets, a relay agent (ip helper-address) forwards DHCP broadcasts as unicast to the server.",
    keyPoints: [
      "ip helper-address: configured on router interface closest to client, points to DHCP server",
      "Converts client's broadcast DISCOVER to unicast directed to DHCP server",
      "Cisco router as DHCP client: ip address dhcp on interface",
      "show ip dhcp binding: see active leases",
      "ip dhcp excluded-address: reserve IPs (e.g., gateway) from pool"
    ],
    commands: [
      { cmd: "interface GigabitEthernet0/0\n ip helper-address 172.16.1.100", desc: "Relay DHCP to server at 172.16.1.100" },
      { cmd: "ip dhcp excluded-address 192.168.1.1 192.168.1.10", desc: "Exclude first 10 IPs from pool" },
      { cmd: "show ip dhcp binding", desc: "View all active DHCP leases" }
    ],
    memoryTip: "ip helper-address is on the ROUTER INTERFACE facing the clients — it's a helper on the CLIENT side.",
    examTip: "ip helper-address not only relays DHCP — it forwards 8 UDP services by default, including DNS (53), TFTP (69), and NTP (37).",
    extraQuestions: [
      {
        question: "On which interface is 'ip helper-address' configured?",
        options: ["On the interface facing the DHCP server", "On the interface facing the DHCP clients", "On the loopback interface", "On all interfaces simultaneously"],
        correct: 1,
        explanation: "ip helper-address is configured on the router interface that faces the DHCP clients (the client-side interface), pointing toward the DHCP server."
      }
    ]
  },

  "4.7": {
    title: "QoS — Per-Hop Behavior (PHB)",
    summary: "QoS prioritizes traffic to ensure voice and video performance. Traffic is classified and marked near the source, then queued and shaped at bottleneck points.",
    keyPoints: [
      "Classification: identify traffic (ACL, NBAR, DSCP markings)",
      "Marking: set DSCP in IP header (Layer 3) or CoS in 802.1Q header (Layer 2)",
      "DSCP EF (46): Expedited Forwarding — voice. AF (10-43): Assured Forwarding. CS (0,8,16...): Class Selector",
      "Queuing: CBWFQ (class-based) ensures bandwidth. LLQ adds strict priority queue for voice",
      "Policing: drops excess traffic above rate. Shaping: buffers (delays) excess traffic"
    ],
    commands: [],
    memoryTip: "Police = enforcer drops excess. Shape = buffer and delay excess. Police is strict, Shape is patient.",
    examTip: "DSCP EF = voice (lowest delay). AF41 = video. Be default IP precedence 0 = best effort (no QoS marking).",
    extraQuestions: [
      {
        question: "Which QoS mechanism drops traffic that exceeds the configured rate?",
        options: ["Shaping", "Queuing", "Policing", "Marking"],
        correct: 2,
        explanation: "Policing drops (or remarks) packets that exceed the configured rate. Shaping delays them by buffering instead of dropping."
      },
      {
        question: "Which DSCP value is typically used for voice traffic (Expedited Forwarding)?",
        options: ["DSCP 0", "DSCP 10", "DSCP 46", "DSCP 48"],
        correct: 2,
        explanation: "DSCP EF (Expedited Forwarding) = 46 is reserved for voice traffic, providing the lowest possible latency and jitter."
      }
    ]
  },

  "4.8": {
    title: "SSH Configuration",
    summary: "SSH provides encrypted remote management. Requires a hostname, domain name, RSA key pair, and local user credentials. Always prefer SSH over Telnet.",
    keyPoints: [
      "Requirements: hostname, ip domain-name, RSA keys (crypto key generate rsa), local user",
      "ip ssh version 2: enforce SSHv2 (more secure than v1)",
      "line vty 0 4 → transport input ssh: restrict to SSH only (no Telnet)",
      "login local: authenticate against local username/password database",
      "Show: show ip ssh, show ssh"
    ],
    commands: [
      { cmd: "hostname R1\nip domain-name corp.com\nusername admin privilege 15 secret Cisco123\ncrypto key generate rsa modulus 2048\nip ssh version 2\nline vty 0 4\n transport input ssh\n login local", desc: "Full SSH configuration sequence" }
    ],
    memoryTip: "SSH setup order: Hostname → Domain → Keys → User → Version → VTY. Like building a house before locking it.",
    examTip: "Without 'hostname' and 'ip domain-name', the 'crypto key generate rsa' command will fail. These three must come first.",
    extraQuestions: [
      {
        question: "Which command is required before generating RSA keys for SSH on a Cisco router?",
        options: ["ip ssh version 2", "ip domain-name [name]", "line vty 0 4", "login local"],
        correct: 1,
        explanation: "Both 'hostname' and 'ip domain-name' must be configured before RSA keys can be generated. The key uses hostname.domainname as its identifier."
      }
    ]
  },

  "4.9": {
    title: "TFTP and FTP in the Network",
    summary: "TFTP and FTP are used to transfer IOS images, configs, and other files. TFTP is simple and unauthenticated (UDP). FTP is feature-rich with authentication (TCP).",
    keyPoints: [
      "TFTP: UDP port 69, no authentication, no encryption — use only inside trusted network",
      "FTP: TCP port 21 (control), port 20 (data), username/password authentication",
      "TFTP common uses: backup running-config, IOS upgrades in labs",
      "FTP on Cisco: can use as client to copy IOS image to flash",
      "copy tftp flash: transfer IOS image from TFTP server to device flash"
    ],
    commands: [
      { cmd: "copy tftp flash", desc: "Copy IOS image from TFTP server to flash" },
      { cmd: "copy running-config tftp", desc: "Back up running config to TFTP server" }
    ],
    memoryTip: "TFTP = Trivial (no auth, no encryption, UDP). FTP = Full-featured (auth, TCP, active/passive modes).",
    examTip: "TFTP uses UDP 69. FTP control = TCP 21, data = TCP 20. FTPS adds TLS. SFTP is over SSH (different from FTP).",
    extraQuestions: [
      {
        question: "Which port does TFTP use?",
        options: ["TCP 20", "TCP 21", "UDP 53", "UDP 69"],
        correct: 3,
        explanation: "TFTP (Trivial File Transfer Protocol) uses UDP port 69. It has no authentication or encryption."
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════════
     DOMAIN 5 — SECURITY FUNDAMENTALS (15%)
  ══════════════════════════════════════════════════════════════ */

  "5.1": {
    title: "Security Concepts (Threats, Vulnerabilities, Exploits)",
    summary: "Security involves understanding threats (potential events), vulnerabilities (weaknesses), and exploits (attack methods). Mitigation reduces risk through controls and defenses.",
    keyPoints: [
      "Threat: any potential event that could harm the network (malware, hacker, natural disaster)",
      "Vulnerability: weakness that can be exploited (unpatched software, weak password)",
      "Exploit: method used to take advantage of a vulnerability",
      "Risk = Threat × Vulnerability — mitigation reduces one or both",
      "Common attacks: phishing, DoS/DDoS, man-in-the-middle, SQL injection, ransomware"
    ],
    commands: [],
    memoryTip: "Threat = bad thing that COULD happen. Vulnerability = the door left open. Exploit = the attacker walking through it.",
    examTip: "On the CCNA, know the difference: a vulnerability is a weakness. An exploit uses that weakness. A threat is the potential danger.",
    extraQuestions: [
      {
        question: "What is the term for a weakness in a system that could be exploited by an attacker?",
        options: ["Threat", "Exploit", "Vulnerability", "Risk"],
        correct: 2,
        explanation: "A vulnerability is a weakness or flaw in a system (e.g., unpatched software, misconfiguration) that can be exploited."
      }
    ]
  },

  "5.2": {
    title: "Security Program Elements",
    summary: "Effective security requires technical controls AND human factors — user awareness training, physical access controls, and security policies. People are often the weakest link.",
    keyPoints: [
      "User awareness: training employees to recognize phishing, social engineering, etc.",
      "Physical access control: badge readers, biometrics, locked server rooms, mantrap",
      "Security policies: define acceptable use, password requirements, incident response",
      "Social engineering: manipulating humans rather than breaking technical controls",
      "Defense in depth: multiple layers of security so one failure doesn't compromise everything"
    ],
    commands: [],
    memoryTip: "Security = People + Process + Technology. The best firewall is useless if someone tapes the password to the monitor.",
    examTip: "On CCNA exams, social engineering questions often highlight that technical controls alone are insufficient — training is required.",
    extraQuestions: [
      {
        question: "What type of attack relies on manipulating people rather than exploiting technical vulnerabilities?",
        options: ["SQL injection", "Buffer overflow", "Social engineering", "Man-in-the-middle"],
        correct: 2,
        explanation: "Social engineering manipulates people (e.g., phishing emails, pretexting) rather than attacking technical systems directly."
      }
    ]
  },

  "5.3": {
    title: "Device Access Control with Local Passwords",
    summary: "Cisco devices use enable secret, console passwords, VTY passwords, and service password-encryption to protect management access. Enable secret is always preferred over enable password.",
    keyPoints: [
      "enable secret [pass]: MD5-hashed, always use instead of 'enable password'",
      "enable password [pass]: stored in plaintext (don't use — legacy)",
      "line con 0 → password/login: protect console port",
      "line vty 0 4 → password/login: protect Telnet/SSH VTY lines",
      "service password-encryption: encrypts all plaintext passwords with Type 7 (weak, reversible)"
    ],
    commands: [
      { cmd: "enable secret Cisco123", desc: "Set MD5-hashed enable secret" },
      { cmd: "service password-encryption", desc: "Encrypt all plaintext passwords (Type 7)" },
      { cmd: "line con 0\n password Cisco\n login", desc: "Set console password" },
      { cmd: "show running-config | include secret", desc: "Verify enable secret is set" }
    ],
    memoryTip: "Enable secret = safe box with a lock. Enable password = post-it note on the monitor.",
    examTip: "If both 'enable secret' and 'enable password' are configured, 'enable secret' always takes precedence.",
    extraQuestions: [
      {
        question: "When both 'enable secret' and 'enable password' are configured, which is used?",
        options: ["enable password", "enable secret", "Both are used alternately", "The one configured last"],
        correct: 1,
        explanation: "Enable secret always takes precedence over enable password when both are configured. Enable secret uses MD5 hashing."
      },
      {
        question: "What does 'service password-encryption' protect against?",
        options: ["MD5 brute force attacks", "Viewing plaintext passwords in the running-config", "Telnet eavesdropping", "Unauthorized SSH access"],
        correct: 1,
        explanation: "Service password-encryption obscures plaintext passwords in the config with Type 7 encoding. It's weak (easily reversed) but prevents casual viewing."
      }
    ]
  },

  "5.4": {
    title: "Security Password Policies",
    summary: "Strong password policies require complexity, length, rotation, and MFA. Certificates provide strong identity verification. Biometrics use physical traits for authentication.",
    keyPoints: [
      "Password complexity: uppercase, lowercase, numbers, special characters",
      "MFA (Multi-Factor Authentication): something you know + have + are",
      "Certificates: PKI-based identity proof, used for SSL/TLS, 802.1X",
      "Biometrics: fingerprint, face, retina — 'something you are'",
      "Password manager best practice: unique passwords per system, never reuse"
    ],
    commands: [],
    memoryTip: "MFA factors: Know (password), Have (token/phone), Are (biometric). Need 2 of 3.",
    examTip: "MFA significantly reduces the risk from stolen passwords — even if an attacker has your password, they can't log in without the second factor.",
    extraQuestions: [
      {
        question: "What does Multi-Factor Authentication (MFA) require?",
        options: ["Two different passwords", "Two of: something you know, have, or are", "A password and a username", "Biometrics only"],
        correct: 1,
        explanation: "MFA requires at least two factors from different categories: something you know (password), have (token/phone), or are (biometric)."
      }
    ]
  },

  "5.5": {
    title: "VPNs (IPsec, Remote Access, Site-to-Site)",
    summary: "VPNs create secure tunnels over untrusted networks. Site-to-site connects two networks. Remote access connects a single user. IPsec provides confidentiality, integrity, and authentication.",
    keyPoints: [
      "Site-to-site VPN: connects two networks (branch to HQ) — always-on tunnel",
      "Remote access VPN: connects individual user to corporate network (AnyConnect)",
      "IPsec components: IKE (key exchange), AH (authentication, no encryption), ESP (auth + encryption)",
      "IKEv1 Phase 1: ISAKMP SA — authenticate peers, establish session key",
      "IKEv1 Phase 2: IPsec SA — negotiate encryption/auth for actual data traffic"
    ],
    commands: [],
    memoryTip: "AH = just authentication (no privacy). ESP = authentication + encryption. Always use ESP for actual security.",
    examTip: "Know the difference: AH authenticates but does NOT encrypt the payload. ESP does both. Use ESP in production.",
    extraQuestions: [
      {
        question: "Which IPsec protocol provides both authentication and encryption of the data payload?",
        options: ["AH (Authentication Header)", "ESP (Encapsulating Security Payload)", "IKE (Internet Key Exchange)", "ISAKMP"],
        correct: 1,
        explanation: "ESP provides both authentication and encryption of the IP packet payload. AH provides only authentication — no encryption."
      }
    ]
  },

  "5.6": {
    title: "Access Control Lists (ACLs)",
    summary: "ACLs filter traffic based on rules. Standard ACLs filter on source IP only. Extended ACLs filter on source, destination, protocol, and port. Apply standard ACLs close to destination.",
    keyPoints: [
      "Standard ACL (1-99, 1300-1999): match on source IP only",
      "Extended ACL (100-199, 2000-2699): match on src/dst IP, protocol, port",
      "Place standard ACLs close to DESTINATION (less specific = applied late)",
      "Place extended ACLs close to SOURCE (saves bandwidth by dropping early)",
      "Implicit deny: every ACL ends with 'deny any' — if no rule matches, traffic is dropped",
      "Wildcard mask: inverse of subnet mask. 0.0.0.255 matches last octet"
    ],
    commands: [
      { cmd: "access-list 10 permit 192.168.1.0 0.0.0.255", desc: "Standard ACL — permit subnet" },
      { cmd: "access-list 100 permit tcp 10.0.0.0 0.0.0.255 any eq 80", desc: "Extended ACL — permit HTTP from 10.x" },
      { cmd: "interface GigabitEthernet0/0\n ip access-group 100 in", desc: "Apply ACL to interface (inbound)" },
      { cmd: "show access-lists", desc: "View all ACLs and hit counts" }
    ],
    memoryTip: "Standard = Source only. Extended = Everything (src, dst, protocol, port). S before E alphabetically = place standard near destination.",
    examTip: "ACL is processed top-down, first match wins. Add specific rules BEFORE general rules. 'ip access-group [ACL] in' on the interface.",
    extraQuestions: [
      {
        question: "What does the implicit deny at the end of every ACL mean?",
        options: ["All traffic is permitted by default", "Any traffic not explicitly permitted is dropped", "The ACL is disabled", "Only ICMP is denied"],
        correct: 1,
        explanation: "Every Cisco ACL has an implicit 'deny any' at the end. If a packet doesn't match any permit rule, it is dropped."
      },
      {
        question: "Which ACL type can filter based on both source IP and destination TCP/UDP port?",
        options: ["Standard ACL", "Named standard ACL", "Extended ACL", "Reflexive ACL"],
        correct: 2,
        explanation: "Extended ACLs can match on source IP, destination IP, protocol (TCP/UDP/ICMP), source port, and destination port."
      }
    ]
  },

  "5.7": {
    title: "Layer 2 Security (DHCP Snooping, DAI, Port Security)",
    summary: "Layer 2 attacks target the switch fabric. DHCP snooping prevents rogue DHCP servers. DAI prevents ARP poisoning. Port security limits MACs per port.",
    keyPoints: [
      "DHCP Snooping: blocks DHCP offers on untrusted ports; builds binding table (IP→MAC→port)",
      "Trusted ports: uplinks and legitimate DHCP servers only",
      "DAI (Dynamic ARP Inspection): validates ARP against DHCP snooping table — stops ARP spoofing",
      "Port security: limits number of MACs on a port. Violation modes: protect/restrict/shutdown",
      "shutdown mode: default — port goes err-disabled on violation. Must be re-enabled manually"
    ],
    commands: [
      { cmd: "ip dhcp snooping\nip dhcp snooping vlan 10", desc: "Enable DHCP snooping on VLAN 10" },
      { cmd: "interface GigabitEthernet0/1\n ip dhcp snooping trust", desc: "Mark uplink as trusted" },
      { cmd: "ip arp inspection vlan 10", desc: "Enable DAI on VLAN 10" },
      { cmd: "interface GigabitEthernet0/2\n switchport port-security\n switchport port-security maximum 2\n switchport port-security violation shutdown", desc: "Port security — max 2 MACs, shutdown on violation" },
      { cmd: "show port-security interface GigabitEthernet0/2", desc: "Verify port security" }
    ],
    memoryTip: "DHCP snooping = trust only designated ports. DAI = check all ARP against the snooping table. Port security = limit MAC count.",
    examTip: "DAI requires DHCP snooping to be enabled first — it uses the binding table built by DHCP snooping to validate ARPs.",
    extraQuestions: [
      {
        question: "Which Layer 2 security feature prevents rogue DHCP servers by filtering DHCP responses on untrusted ports?",
        options: ["Port security", "Dynamic ARP Inspection", "DHCP snooping", "802.1X"],
        correct: 2,
        explanation: "DHCP snooping filters DHCP server messages (offers/acks) on untrusted ports, preventing rogue DHCP servers from assigning incorrect IP addresses."
      },
      {
        question: "What is the default port security violation mode on Cisco switches?",
        options: ["Protect", "Restrict", "Shutdown", "Drop"],
        correct: 2,
        explanation: "The default violation mode is 'shutdown' — the port is placed into err-disabled state when a violation occurs."
      }
    ]
  },

  "5.8": {
    title: "AAA (Authentication, Authorization, Accounting)",
    summary: "AAA provides a framework for controlling who can access devices (authentication), what they can do (authorization), and tracking what they did (accounting). TACACS+ and RADIUS are the main AAA protocols.",
    keyPoints: [
      "Authentication: who are you? (verify identity with credentials)",
      "Authorization: what can you do? (assign privileges after authentication)",
      "Accounting: what did you do? (audit trail for compliance)",
      "TACACS+ (TCP 49): full body encryption, separates AAA, used for device admin",
      "RADIUS (UDP 1812/1813): encrypts password only, combines AuthN+AuthZ, used for network access"
    ],
    commands: [
      { cmd: "aaa new-model", desc: "Enable AAA on Cisco device" },
      { cmd: "aaa authentication login default group tacacs+ local", desc: "Use TACACS+ then local fallback" }
    ],
    memoryTip: "AAA = Three gates: Gate 1 checks who you are. Gate 2 checks what you're allowed to do. Gate 3 writes down everything you did.",
    examTip: "TACACS+ separates Authentication, Authorization, and Accounting into separate packets. RADIUS combines AuthN + AuthZ in one exchange.",
    extraQuestions: [
      {
        question: "Which component of AAA tracks what actions a user performed after logging in?",
        options: ["Authentication", "Authorization", "Accounting", "Auditing"],
        correct: 2,
        explanation: "Accounting records user activities — what commands were run, how long sessions lasted, which resources were accessed."
      }
    ]
  },

  "5.9": {
    title: "Wireless Security Protocols (WPA, WPA2, WPA3)",
    summary: "Wireless security has evolved from WEP (broken) to WPA, WPA2, and WPA3. WPA2 uses AES-CCMP and is the current standard. WPA3 improves with SAE (Simultaneous Authentication of Equals).",
    keyPoints: [
      "WEP: broken, uses RC4 with static keys — never use",
      "WPA: TKIP encryption (still RC4-based), temporary replacement for WEP",
      "WPA2 Personal: AES-CCMP encryption, pre-shared key (PSK)",
      "WPA2 Enterprise: AES-CCMP + 802.1X/EAP + RADIUS server per-user authentication",
      "WPA3: uses SAE (replaces PSK), stronger protection against offline dictionary attacks"
    ],
    commands: [],
    memoryTip: "Security progression: WEP (broken) → WPA (better) → WPA2 (current standard AES) → WPA3 (SAE, future-proof).",
    examTip: "WPA2 uses AES-CCMP. WPA uses TKIP. AES is much stronger. WPA3's SAE prevents offline brute-force attacks against captured handshakes.",
    extraQuestions: [
      {
        question: "Which wireless encryption standard uses AES-CCMP and is considered the current security baseline?",
        options: ["WEP", "WPA (TKIP)", "WPA2", "WPA3 (SAE)"],
        correct: 2,
        explanation: "WPA2 uses AES-CCMP for encryption and is the current minimum security standard for wireless networks."
      }
    ]
  },

  "5.10": {
    title: "WLAN Configuration with WPA2 PSK",
    summary: "Configuring a WLAN on a Cisco WLC involves creating a WLAN profile, setting the SSID, choosing a dynamic interface (VLAN), and configuring WPA2-PSK security.",
    keyPoints: [
      "WLC GUI: WLANs → Create New → set Profile Name and SSID",
      "Map WLAN to dynamic interface (VLAN) for client traffic segregation",
      "Security tab: Layer 2 → WPA+WPA2, choose WPA2 Policy, AES cipher",
      "PSK: pre-shared key entry in ASCII or hex format",
      "Advanced: enable/disable band select, session timeout, client exclusion"
    ],
    commands: [],
    memoryTip: "WLC WLAN creation flow: Create → SSID → Interface → Security (WPA2+AES+PSK) → Apply.",
    examTip: "WPA2 requires AES cipher (not TKIP). On WLC, if you select WPA2, ensure AES is the encryption method, not TKIP.",
    extraQuestions: [
      {
        question: "When configuring WPA2 on a Cisco WLC, which cipher should be selected for AES-based encryption?",
        options: ["TKIP", "WEP-104", "AES (CCMP)", "RC4"],
        correct: 2,
        explanation: "WPA2 requires AES (CCMP) cipher. TKIP is associated with WPA1. Using TKIP with WPA2 reduces security."
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════════
     DOMAIN 6 — AUTOMATION AND PROGRAMMABILITY (10%)
  ══════════════════════════════════════════════════════════════ */

  "6.1": {
    title: "How Automation Impacts Network Management",
    summary: "Network automation reduces manual CLI work, eliminates human error, enables consistent configuration at scale, and accelerates deployment. It shifts network engineers toward intent-based management.",
    keyPoints: [
      "Manual CLI: error-prone, slow, doesn't scale to hundreds of devices",
      "Automation benefits: consistency, speed, reduced downtime from config errors",
      "Examples: Ansible playbooks, Python/Netmiko scripts, RESTCONF/NETCONF APIs",
      "Network automation enables CI/CD for infrastructure (Infrastructure as Code)",
      "Shift: from 'configure each device' to 'define intent, push automation'"
    ],
    commands: [],
    memoryTip: "Automation = configuring 1000 routers as fast as 1. One mistake multiplied by 1000 — validate before you automate.",
    examTip: "Know the high-level benefits: consistency, speed, scale, reduced human error. Exam questions are conceptual, not deep technical.",
    extraQuestions: [
      {
        question: "What is a primary benefit of network automation compared to manual CLI configuration?",
        options: ["It requires less planning", "It eliminates the need for network engineers", "It provides consistent configuration at scale and reduces human error", "It works without any network connectivity"],
        correct: 2,
        explanation: "Automation provides consistent configuration across many devices simultaneously, reducing the human errors common with repetitive manual CLI changes."
      }
    ]
  },

  "6.2": {
    title: "Traditional vs Controller-Based Networking",
    summary: "Traditional networks distribute control and data plane to each device. Controller-based (SDN) centralizes the control plane in a controller (like Cisco DNA Center), enabling programmatic management.",
    keyPoints: [
      "Traditional: each device runs its own control plane (routing protocols, STP) independently",
      "SDN: control plane centralized in a controller; devices just forward based on controller's instructions",
      "Data plane: still on the device (fast forwarding of packets)",
      "Southbound APIs: controller → devices (OpenFlow, NETCONF, RESTCONF)",
      "Northbound APIs: applications → controller (REST APIs for intent-based policies)"
    ],
    commands: [],
    memoryTip: "SDN = a conductor (controller) directing an orchestra (switches/routers). Devices just play the notes.",
    examTip: "Know the planes: Control plane = routing/STP decisions. Data plane = forwarding packets. Management plane = SSH/SNMP management.",
    extraQuestions: [
      {
        question: "In SDN architecture, where is the control plane centralized?",
        options: ["On each individual switch", "In a dedicated SDN controller", "In the cloud only", "On the core router"],
        correct: 1,
        explanation: "SDN centralizes the control plane in a dedicated controller (like Cisco DNA Center or OpenDaylight), while forwarding devices handle the data plane."
      }
    ]
  },

  "6.3": {
    title: "SDN Architecture (Overlay, Underlay, Fabric)",
    summary: "SDN uses a fabric of physical devices (underlay) over which virtual networks (overlay) run. The fabric abstracts complexity. Northbound and southbound APIs connect the controller to applications and devices.",
    keyPoints: [
      "Underlay: physical IP network that provides connectivity (routers, switches, links)",
      "Overlay: virtual network built on top of underlay using tunneling (VXLAN, LISP)",
      "Fabric: the combined underlay + overlay + controller — the full SDN system",
      "Northbound API: between applications and controller (REST, typically JSON)",
      "Southbound API: between controller and devices (OpenFlow, NETCONF, RESTCONF, OVSDB)"
    ],
    commands: [],
    memoryTip: "Underlay = roads. Overlay = GPS routes. Fabric = the whole transportation system.",
    examTip: "VXLAN is the most common overlay protocol in SD-Access and data center SDN. It encapsulates Layer 2 frames in UDP.",
    extraQuestions: [
      {
        question: "In an SDN architecture, what is the term for the API that connects the controller to network management applications above it?",
        options: ["Southbound API", "Northbound API", "Eastbound API", "Westbound API"],
        correct: 1,
        explanation: "Northbound API connects the SDN controller to management applications (above). Southbound API connects it to network devices (below)."
      }
    ]
  },

  "6.4": {
    title: "Cisco DNA Center vs Traditional Management",
    summary: "Cisco DNA Center provides centralized, intent-based network management. Traditional management uses CLI per device. DNA Center automates provisioning, policy enforcement, and analytics.",
    keyPoints: [
      "DNA Center: GUI-based, intent-based networking, automates device provisioning",
      "Traditional: SSH/CLI to each device individually — does not scale",
      "DNA Center features: network discovery, topology view, software image management, analytics",
      "IBN (Intent-Based Networking): define business intent → DNA Center translates to device configs",
      "DNA Center uses REST APIs northbound for integration with other tools"
    ],
    commands: [],
    memoryTip: "DNA Center = network brain that tells all devices what to do. Traditional = you personally calling each device.",
    examTip: "DNA Center uses RESTCONF/NETCONF southbound to program devices. CLI is also used for legacy devices that don't support APIs.",
    extraQuestions: [
      {
        question: "Which Cisco platform provides intent-based networking and centralized device management?",
        options: ["Cisco ISE", "Cisco DNA Center", "Cisco Prime", "Cisco APIC"],
        correct: 1,
        explanation: "Cisco DNA Center is the intent-based networking platform that centralizes network management, automation, and analytics."
      }
    ]
  },

  "6.5": {
    title: "REST APIs (CRUD, HTTP Verbs, Data Encoding)",
    summary: "REST APIs use HTTP verbs to perform CRUD operations on resources. Data is encoded in JSON or XML. APIs are stateless — each request contains all necessary information.",
    keyPoints: [
      "CRUD: Create (POST), Read (GET), Update (PUT/PATCH), Delete (DELETE)",
      "GET: retrieve data — no body, safe and idempotent",
      "POST: create new resource — sends data in request body",
      "PUT: replace a resource entirely. PATCH: partial update",
      "DELETE: remove a resource",
      "JSON: JavaScript Object Notation — lightweight, key-value pairs, most common in REST APIs"
    ],
    commands: [],
    memoryTip: "CRUD = Create/Read/Update/Delete. HTTP = POST/GET/PUT-PATCH/DELETE. Line them up.",
    examTip: "GET = idempotent (same result each time, no side effects). POST creates new resources and is NOT idempotent.",
    extraQuestions: [
      {
        question: "Which HTTP verb is used to retrieve data from a REST API without modifying it?",
        options: ["POST", "GET", "PUT", "DELETE"],
        correct: 1,
        explanation: "GET retrieves data from the server. It is safe and idempotent — it doesn't change any data and repeated calls return the same result."
      },
      {
        question: "In REST API CRUD operations, which HTTP verb is used to CREATE a new resource?",
        options: ["GET", "PUT", "POST", "PATCH"],
        correct: 2,
        explanation: "POST creates a new resource. GET=Read, POST=Create, PUT/PATCH=Update, DELETE=Delete."
      }
    ]
  },

  "6.6": {
    title: "Configuration Management (Puppet, Chef, Ansible)",
    summary: "Configuration management tools automate device configuration at scale. Ansible is agentless (SSH-based), Puppet and Chef use agents. All support declarative or procedural approaches.",
    keyPoints: [
      "Ansible: agentless, SSH-based, YAML playbooks, procedural by default — most common for network",
      "Puppet: agent-based (except agentless mode), Ruby DSL, declarative — manages desired state",
      "Chef: agent-based, Ruby DSL, procedural — 'cookbooks' and 'recipes'",
      "Declarative: define the desired end state (Puppet) — tool figures out how",
      "Procedural: define the steps to get there (Ansible) — you specify the order"
    ],
    commands: [],
    memoryTip: "Ansible = agentless (just SSH). Puppet/Chef = need agents. For network devices, Ansible wins for simplicity.",
    examTip: "Ansible is the most common for network automation because it's agentless — no software to install on routers/switches.",
    extraQuestions: [
      {
        question: "Which configuration management tool is agentless and uses SSH to configure devices?",
        options: ["Puppet", "Chef", "Ansible", "Salt"],
        correct: 2,
        explanation: "Ansible is agentless — it uses SSH (or APIs for network devices) to push configurations. Puppet and Chef require agents installed on managed devices."
      },
      {
        question: "Which automation approach defines the desired end state and lets the tool determine how to get there?",
        options: ["Procedural", "Imperative", "Declarative", "Sequential"],
        correct: 2,
        explanation: "Declarative automation defines WHAT the end state should be (e.g., 'VLAN 10 should exist'). The tool determines HOW to achieve it. Puppet uses this approach."
      }
    ]
  },

  "6.7": {
    title: "JSON Data Encoding",
    summary: "JSON (JavaScript Object Notation) is the standard data format for REST API payloads. It uses key-value pairs, objects ({}), and arrays ([]) to represent structured data.",
    keyPoints: [
      "Object: { 'key': 'value' } — curly braces, key-value pairs",
      "Array: [ 'item1', 'item2' ] — square brackets, ordered list",
      "Data types: string ('text'), number (42), boolean (true/false), null",
      "Nesting: objects can contain objects and arrays — hierarchical structure",
      "JSON is human-readable and widely supported across programming languages"
    ],
    commands: [],
    memoryTip: "JSON: Curly = object (thing with properties). Square = array (list of things). Strings always in double quotes.",
    examTip: "On CCNA, be able to read a simple JSON object and identify key names, values, and data types. Not writing complex JSON.",
    extraQuestions: [
      {
        question: "In JSON, which brackets are used to define an array?",
        options: ["{ }", "( )", "[ ]", "< >"],
        correct: 2,
        explanation: "Square brackets [ ] define a JSON array (ordered list). Curly braces { } define a JSON object (key-value pairs)."
      },
      {
        question: "Which of the following is a valid JSON boolean value?",
        options: ["'true'", "True", "TRUE", "true"],
        correct: 3,
        explanation: "JSON boolean values are lowercase: true or false. 'true' (with quotes) is a string, not a boolean."
      }
    ]
  }

};
