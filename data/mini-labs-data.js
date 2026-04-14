window.miniLabsData = {
// ── Domain 1: Network Fundamentals ──────────────────────────────────

"1.1": {
  type: "sorter",
  title: "Network Devices and Their OSI Layers",
  instructions: "Drag each network device into the OSI layer where it primarily operates. Think about what header each device inspects to make forwarding decisions.",
  categories: ["Layer 2 — Data Link", "Layer 3 — Network", "Layer 7 — Application"],
  items: [
    { text: "L2 Switch", correct: 0 },
    { text: "Router", correct: 1 },
    { text: "L3 Switch", correct: 1 },
    { text: "Next-Generation Firewall (NGFW)", correct: 2 },
    { text: "Intrusion Prevention System (IPS)", correct: 2 },
    { text: "Wireless Access Point (AP)", correct: 0 },
    { text: "Wireless LAN Controller (WLC)", correct: 2 },
    { text: "Server (Web/DNS/DHCP)", correct: 2 },
    { text: "Bridge", correct: 0 },
    { text: "Hub (trick — Layer 1)", correct: 0 }
  ]
},

"1.2": {
  type: "matcher",
  title: "Network Topologies",
  instructions: "Match each network topology name on the left to its correct description on the right.",
  left: [
    "Two-Tier (Collapsed Core)",
    "Three-Tier",
    "Spine-Leaf",
    "SOHO",
    "WAN"
  ],
  right: [
    "Access + Distribution/Core combined — suits smaller campuses",
    "Access + Distribution + Core — large campus, full redundancy",
    "Every leaf connects to every spine — data center east-west traffic",
    "Single router/AP/switch combo — home or small office",
    "Connects geographically separated sites over provider links"
  ],
  connections: [[0,0],[1,1],[2,2],[3,3],[4,4]]
},

"1.3": {
  type: "sorter",
  title: "Cables, Connectors, and Fiber Types",
  instructions: "Drag each cable or connector specification into the correct media category.",
  categories: ["Single-Mode Fiber", "Multimode Fiber", "Copper (UTP/STP)"],
  items: [
    { text: "OS1/OS2 — 9/125 um core", correct: 0 },
    { text: "Yellow jacket, long-haul runs", correct: 0 },
    { text: "LC connector, 10+ km reach", correct: 0 },
    { text: "OM3 — 50/125 um core, aqua jacket", correct: 1 },
    { text: "OM4 — optimized for 40/100G short runs", correct: 1 },
    { text: "SC/LC duplex, up to ~550 m at 10G", correct: 1 },
    { text: "RJ-45 connector, Cat 5e — up to 1 Gbps", correct: 2 },
    { text: "Cat 6a — supports 10 Gbps to 100 m", correct: 2 },
    { text: "Max distance 100 meters per TIA standard", correct: 2 },
    { text: "T568A / T568B wiring pinout", correct: 2 }
  ]
},

"1.4": {
  type: "sorter",
  title: "Interface Troubleshooting Symptoms",
  instructions: "Drag each symptom into the category that most likely causes it. Watch for tricky overlap.",
  categories: ["Duplex Mismatch", "Speed Mismatch", "Bad Cable / Physical", "Normal Operation"],
  items: [
    { text: "Late collisions incrementing on a GigE port", correct: 0 },
    { text: "Interface constantly flapping up/down", correct: 2 },
    { text: "CRC errors climbing, runts detected", correct: 2 },
    { text: "Gi0/1 shows 100 Mbps but device is 1 Gbps", correct: 1 },
    { text: "Half-duplex on one side, full on the other", correct: 0 },
    { text: "Port shows 'err-disabled'", correct: 2 },
    { text: "'show interfaces' reports 0 input/output errors", correct: 3 },
    { text: "Speed auto, duplex auto — both sides Gig", correct: 3 },
    { text: "FCS errors incrementing with no CRC errors", correct: 2 },
    { text: "Slow throughput, high collision count on full-duplex", correct: 0 }
  ]
},

"1.5": {
  type: "matcher",
  title: "Protocols, Ports, and Transport",
  instructions: "Match each protocol on the left to its correct port number and transport protocol on the right.",
  left: [
    "HTTP",
    "HTTPS",
    "SSH",
    "Telnet",
    "DNS",
    "DHCP Server",
    "TFTP",
    "SNMP",
    "FTP Data",
    "SMTP"
  ],
  right: [
    "TCP 80",
    "TCP 443",
    "TCP 22",
    "TCP 23",
    "UDP 53 (also TCP)",
    "UDP 67",
    "UDP 69",
    "UDP 161",
    "TCP 20",
    "TCP 25"
  ],
  connections: [[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],[8,8],[9,9]]
},

"1.6": {
  type: "commander",
  title: "IPv4 Subnetting Drill",
  instructions: "Answer subnetting questions as precisely as possible. Use dotted-decimal or CIDR notation as indicated.",
  prompt: "subnet-calc>",
  steps: [
    {
      instruction: "Given 192.168.1.0/26, what is the broadcast address?",
      answer: "192.168.1.63",
      hint: "/26 = 64 addresses per subnet. First subnet: .0 to .63. Broadcast is last address.",
      partial: ["192.168.1"]
    },
    {
      instruction: "How many usable host addresses in a /26 network?",
      answer: "62",
      hint: "2^(32-26) = 64 total. Minus 2 (network + broadcast) = 62 usable.",
      partial: ["62"]
    },
    {
      instruction: "What is the network address for host 172.16.45.200/21?",
      answer: "172.16.40.0",
      hint: "/21 = 255.255.248.0. The third octet 45 in binary ANDed with 248 = 40.",
      partial: ["172.16"]
    },
    {
      instruction: "What is the subnet mask in dotted decimal for /20?",
      answer: "255.255.240.0",
      hint: "/20 means 20 bits on. That's 255.255 for the first 16, then 4 more bits = 11110000 = 240.",
      partial: ["255.255"]
    },
    {
      instruction: "How many subnets can you create from 10.0.0.0/8 if you use a /12 mask?",
      answer: "16",
      hint: "Borrowed bits = 12 - 8 = 4. 2^4 = 16 subnets.",
      partial: ["16"]
    },
    {
      instruction: "What is the valid host range for the subnet containing 10.1.130.5/23?",
      answer: "10.1.130.1 - 10.1.131.254",
      hint: "/23 = 512 addresses. 130 ANDed with 254 = 130. Network: 10.1.130.0, Broadcast: 10.1.131.255.",
      partial: ["10.1.130"]
    }
  ]
},

"1.7": {
  type: "sorter",
  title: "IPv4 Address Classification",
  instructions: "Drag each IP address into the correct category: Private (RFC 1918), Public, or Special-use.",
  categories: ["Private (RFC 1918)", "Public", "Special / Reserved"],
  items: [
    { text: "10.1.1.1", correct: 0 },
    { text: "172.16.5.1", correct: 0 },
    { text: "192.168.100.50", correct: 0 },
    { text: "172.31.255.254", correct: 0 },
    { text: "8.8.8.8", correct: 1 },
    { text: "52.94.76.1", correct: 1 },
    { text: "169.254.1.1 (APIPA)", correct: 2 },
    { text: "127.0.0.1 (Loopback)", correct: 2 },
    { text: "255.255.255.255 (Broadcast)", correct: 2 },
    { text: "172.32.1.1", correct: 1 },
    { text: "100.64.0.1 (CGNAT / RFC 6598)", correct: 2 }
  ]
},

"1.8": {
  type: "commander",
  title: "IPv6 Address Tasks",
  instructions: "Shorten, expand, or identify IPv6 address properties. Use standard compressed notation.",
  prompt: "ipv6-drill>",
  steps: [
    {
      instruction: "Shorten this address: 2001:0db8:0000:0000:0000:0000:0000:0001",
      answer: "2001:db8::1",
      hint: "Remove leading zeros per group, then replace the longest run of all-zero groups with ::.",
      partial: ["2001:db8"]
    },
    {
      instruction: "What prefix length is standard for an IPv6 LAN subnet?",
      answer: "/64",
      hint: "Every IPv6 subnet uses a /64 by convention — 64 bits for network, 64 for interface ID.",
      partial: ["/64", "64"]
    },
    {
      instruction: "Shorten: fe80:0000:0000:0000:020c:29ff:fe5a:0042",
      answer: "fe80::20c:29ff:fe5a:42",
      hint: "fe80:0:0:0 becomes fe80::. Then strip leading zeros in remaining groups.",
      partial: ["fe80::"]
    },
    {
      instruction: "Shorten: 2001:0db8:aaaa:0001:0000:0000:0000:0100",
      answer: "2001:db8:aaaa:1::100",
      hint: "The longest run of zero groups is positions 5-7. The last group 0100 becomes 100.",
      partial: ["2001:db8:aaaa"]
    },
    {
      instruction: "How many bits are in the Interface ID portion of a standard /64 IPv6 address?",
      answer: "64",
      hint: "128 total bits minus 64 prefix bits = 64 interface ID bits.",
      partial: ["64"]
    }
  ]
},

"1.9": {
  type: "sorter",
  title: "IPv6 Address Types",
  instructions: "Drag each IPv6 address into its correct type category.",
  categories: ["Global Unicast (GUA)", "Link-Local", "Multicast", "Unique Local (ULA)"],
  items: [
    { text: "2001:db8:1::a/64", correct: 0 },
    { text: "2607:f8b0:4004::200e", correct: 0 },
    { text: "fe80::1", correct: 1 },
    { text: "fe80::20c:29ff:fe5a:42", correct: 1 },
    { text: "ff02::1 (all nodes)", correct: 2 },
    { text: "ff02::2 (all routers)", correct: 2 },
    { text: "ff02::1:ff5a:0042 (solicited-node)", correct: 2 },
    { text: "fd00:abcd:1234::1", correct: 3 },
    { text: "fdab::5:1", correct: 3 },
    { text: "ff05::1:3 (site-local multicast)", correct: 2 }
  ]
},

"1.10": {
  type: "matcher",
  title: "OS-Specific Network Commands",
  instructions: "Match each network command on the left to the operating system it belongs to on the right. Some commands work on multiple OSes but pick the primary/exclusive one.",
  left: [
    "ipconfig /all",
    "ip addr show",
    "ifconfig",
    "tracert",
    "traceroute",
    "netstat -an",
    "nslookup",
    "arp -a"
  ],
  right: [
    "Windows",
    "Linux",
    "macOS (legacy)",
    "Windows",
    "Linux / macOS",
    "All (Windows/Linux/macOS)",
    "All (Windows/Linux/macOS)",
    "All (Windows/Linux/macOS)"
  ],
  connections: [[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7]]
},

"1.11": {
  type: "matcher",
  title: "Wireless Fundamentals",
  instructions: "Match each wireless concept on the left to the correct fact on the right.",
  left: [
    "Channels 1, 6, 11",
    "SSID",
    "WPA2-Personal",
    "WPA3-Personal",
    "RF Interference Sources",
    "802.11ac (Wi-Fi 5)",
    "802.11ax (Wi-Fi 6)"
  ],
  right: [
    "2.4 GHz non-overlapping channels (North America)",
    "Human-readable network name broadcast by AP",
    "Pre-shared key + AES-CCMP encryption",
    "SAE (Simultaneous Authentication of Equals) replaces PSK",
    "Microwave ovens, Bluetooth, cordless phones",
    "5 GHz only, up to 3.5 Gbps, MU-MIMO downlink",
    "2.4 + 5 GHz, OFDMA, BSS Coloring, TWT"
  ],
  connections: [[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6]]
},

"1.12": {
  type: "sorter",
  title: "Virtual Machine vs Container vs VRF",
  instructions: "Drag each characteristic into the correct virtualization technology bucket.",
  categories: ["Virtual Machine (VM)", "Container", "VRF (Virtual Routing and Forwarding)"],
  items: [
    { text: "Runs a full guest OS with its own kernel", correct: 0 },
    { text: "Managed by a hypervisor (Type 1 or Type 2)", correct: 0 },
    { text: "Shares the host OS kernel", correct: 1 },
    { text: "Lightweight, starts in seconds", correct: 1 },
    { text: "Uses images and layers (e.g., Docker)", correct: 1 },
    { text: "Separates routing tables on a single router", correct: 2 },
    { text: "Each instance has its own RIB/FIB", correct: 2 },
    { text: "Allows overlapping IP spaces on one device", correct: 2 },
    { text: "Requires more disk and RAM per instance", correct: 0 },
    { text: "Commonly orchestrated with Kubernetes", correct: 1 }
  ]
},

"1.13": {
  type: "sequencer",
  title: "Switch Frame Processing",
  instructions: "Put these steps in the correct order that a Layer 2 switch follows when processing an incoming Ethernet frame.",
  steps: [
    "Frame arrives on an ingress port",
    "Switch reads the source MAC address",
    "Switch learns (or refreshes) source MAC + ingress port in MAC table",
    "Switch reads the destination MAC address",
    "Switch looks up destination MAC in the MAC address table",
    "If found: forward frame out the specific port (known unicast)",
    "If NOT found: flood frame out all ports except ingress (unknown unicast)"
  ],
  correctOrder: [0, 1, 2, 3, 4, 5, 6]
},

// ── Domain 2: Network Access ────────────────────────────────────────

"2.1": {
  type: "commander",
  title: "VLAN Configuration",
  instructions: "Configure VLANs on a Cisco switch using IOS commands. Enter each command exactly as you would on a real device.",
  prompt: "Switch(config)#",
  steps: [
    {
      instruction: "Create VLAN 10",
      answer: "vlan 10",
      hint: "In global config mode, just type 'vlan' followed by the VLAN number.",
      partial: ["vlan"]
    },
    {
      instruction: "Name VLAN 10 as 'SALES'",
      answer: "name SALES",
      hint: "You're now in VLAN config mode. Use the 'name' command.",
      partial: ["name"]
    },
    {
      instruction: "Exit back to global config mode",
      answer: "exit",
      hint: "Type 'exit' to return to global config from VLAN config mode.",
      partial: ["exit"]
    },
    {
      instruction: "Enter interface Gi0/1 to assign it to VLAN 10",
      answer: "interface gi0/1",
      hint: "Use 'interface' followed by the interface name.",
      partial: ["interface"]
    },
    {
      instruction: "Set the port as an access port",
      answer: "switchport mode access",
      hint: "Use 'switchport mode' to set the port type.",
      partial: ["switchport"]
    },
    {
      instruction: "Assign this access port to VLAN 10",
      answer: "switchport access vlan 10",
      hint: "Use 'switchport access vlan' followed by the VLAN ID.",
      partial: ["switchport", "vlan"]
    },
    {
      instruction: "Verify the VLAN assignment (show command from privileged exec)",
      answer: "show vlan brief",
      hint: "Use 'show vlan brief' to see all VLANs and their port assignments.",
      partial: ["show", "vlan"]
    }
  ]
},

"2.2": {
  type: "commander",
  title: "Trunk Port Configuration",
  instructions: "Configure a trunk link on Gi0/24 between two switches. Enter each IOS command.",
  prompt: "Switch(config)#",
  steps: [
    {
      instruction: "Enter interface Gi0/24",
      answer: "interface gi0/24",
      hint: "Use 'interface gi0/24' to select the port.",
      partial: ["interface"]
    },
    {
      instruction: "Set the encapsulation to 802.1Q (required on some switches)",
      answer: "switchport trunk encapsulation dot1q",
      hint: "Use 'switchport trunk encapsulation dot1q'. Not all switches require this.",
      partial: ["encapsulation", "dot1q"]
    },
    {
      instruction: "Configure the port as a trunk",
      answer: "switchport mode trunk",
      hint: "Use 'switchport mode trunk' to force trunking.",
      partial: ["switchport", "trunk"]
    },
    {
      instruction: "Set the native VLAN to 99",
      answer: "switchport trunk native vlan 99",
      hint: "The native VLAN carries untagged traffic. Set it with 'switchport trunk native vlan'.",
      partial: ["native", "vlan"]
    },
    {
      instruction: "Allow only VLANs 10, 20, and 99 on this trunk",
      answer: "switchport trunk allowed vlan 10,20,99",
      hint: "Use 'switchport trunk allowed vlan' followed by a comma-separated list. No spaces between VLAN numbers.",
      partial: ["allowed", "vlan"]
    },
    {
      instruction: "Verify the trunk configuration",
      answer: "show interfaces trunk",
      hint: "Use 'show interfaces trunk' to confirm mode, native VLAN, and allowed VLANs.",
      partial: ["show", "trunk"]
    }
  ]
},

"2.3": {
  type: "matcher",
  title: "CDP vs LLDP",
  instructions: "Match each fact on the left to whether it describes CDP or LLDP.",
  left: [
    "Cisco proprietary protocol",
    "IEEE 802.1AB standard",
    "Enabled by default on Cisco devices",
    "Must be explicitly enabled on Cisco",
    "show cdp neighbors",
    "show lldp neighbors",
    "Uses multicast 01:00:0C:CC:CC:CC",
    "Uses multicast 01:80:C2:00:00:0E"
  ],
  right: [
    "CDP",
    "LLDP",
    "CDP",
    "LLDP",
    "CDP",
    "LLDP",
    "CDP",
    "LLDP"
  ],
  connections: [[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7]]
},

"2.4": {
  type: "sorter",
  title: "EtherChannel Negotiation Results",
  instructions: "Drag each mode combination into whether it successfully forms an EtherChannel or does NOT form one.",
  categories: ["Forms Channel", "Does NOT Form Channel"],
  items: [
    { text: "LACP: active + active", correct: 0 },
    { text: "LACP: active + passive", correct: 0 },
    { text: "LACP: passive + passive", correct: 1 },
    { text: "PAgP: desirable + desirable", correct: 0 },
    { text: "PAgP: desirable + auto", correct: 0 },
    { text: "PAgP: auto + auto", correct: 1 },
    { text: "Static: on + on", correct: 0 },
    { text: "Mismatch: on + active (LACP)", correct: 1 },
    { text: "Mismatch: on + desirable (PAgP)", correct: 1 },
    { text: "Mismatch: active + desirable (LACP vs PAgP)", correct: 1 }
  ]
},

"2.5": {
  type: "sequencer",
  title: "STP Root Bridge Election",
  instructions: "Put the Spanning Tree Protocol root bridge election process in the correct order.",
  steps: [
    "All switches power on and assume they are the root bridge",
    "Each switch sends BPDUs with its own Bridge ID as the root",
    "Switches compare received BPDUs — lowest Bridge ID wins",
    "Bridge ID = Priority (default 32768) + VLAN + MAC address",
    "Switch with lowest Bridge ID becomes the Root Bridge",
    "Non-root switches determine their Root Port (lowest cost to root)",
    "Each segment gets one Designated Port (lowest cost to root)",
    "All other ports are placed in Blocking state"
  ],
  correctOrder: [0, 1, 3, 2, 4, 5, 6, 7]
},

"2.6": {
  type: "matcher",
  title: "Wireless AP Modes",
  instructions: "Match each AP deployment mode on the left to its correct description on the right.",
  left: [
    "Autonomous",
    "Lightweight",
    "FlexConnect (H-REAP)",
    "Cloud-managed",
    "Monitor Mode",
    "Sniffer Mode"
  ],
  right: [
    "Standalone AP — configured individually via CLI/GUI",
    "Managed by WLC via CAPWAP tunnel — no local config",
    "Can switch traffic locally if WLC connection drops",
    "Managed through cloud dashboard (e.g., Meraki)",
    "Passive scanning for rogue APs and RF interference",
    "Captures wireless frames and sends to analyzer (e.g., Wireshark)"
  ],
  connections: [[0,0],[1,1],[2,2],[3,3],[4,4],[5,5]]
},

"2.7": {
  type: "sorter",
  title: "AP vs WLC Connection Facts",
  instructions: "Drag each fact about physical/logical connectivity into the correct device category.",
  categories: ["Access Point (AP)", "Wireless LAN Controller (WLC)"],
  items: [
    { text: "Connects to switch via access port", correct: 0 },
    { text: "Connects to switch via trunk port", correct: 1 },
    { text: "Requires Power over Ethernet (PoE)", correct: 0 },
    { text: "Uses LAG (Link Aggregation) for redundancy", correct: 1 },
    { text: "Runs CAPWAP tunnel to centralize management", correct: 0 },
    { text: "Manages SSIDs, security policies, and RF settings centrally", correct: 1 },
    { text: "Can be powered by DC adapter if PoE unavailable", correct: 0 },
    { text: "Provides DHCP option 43 for AP discovery", correct: 1 }
  ]
},

"2.8": {
  type: "sorter",
  title: "Secure vs Insecure Management Protocols",
  instructions: "Drag each device management method into the correct security classification.",
  categories: ["Secure", "Insecure"],
  items: [
    { text: "SSH (TCP 22) — encrypted remote CLI", correct: 0 },
    { text: "Telnet (TCP 23) — plaintext remote CLI", correct: 1 },
    { text: "HTTPS (TCP 443) — encrypted web GUI", correct: 0 },
    { text: "HTTP (TCP 80) — plaintext web GUI", correct: 1 },
    { text: "Console port — physical access required", correct: 0 },
    { text: "TACACS+ — encrypted full payload", correct: 0 },
    { text: "RADIUS — encrypts password only (not full payload)", correct: 0 },
    { text: "SNMPv3 — authentication + encryption", correct: 0 },
    { text: "SNMPv1/v2c — community strings in cleartext", correct: 1 },
    { text: "TFTP — no authentication, plaintext transfer", correct: 1 }
  ]
},

"2.9": {
  type: "sequencer",
  title: "WLC WLAN Creation Workflow",
  instructions: "Put the steps for creating a new WLAN on a Cisco Wireless LAN Controller in the correct order.",
  steps: [
    "Access the WLC web GUI (HTTPS) or CLI",
    "Navigate to WLANs and click 'Create New'",
    "Enter the WLAN Profile Name and SSID",
    "Configure security settings (WPA2 + AES)",
    "Map the WLAN to a VLAN/Interface (e.g., VLAN 10)",
    "Set the QoS profile (Platinum/Gold/Silver/Bronze)",
    "Enable the WLAN (status: Enabled)",
    "Verify clients can associate and obtain DHCP address"
  ],
  correctOrder: [0, 1, 2, 3, 4, 5, 6, 7]
},
// Domain 3 Labs
"3.1": {
  type: "matcher",
  title: "Routing Table Components",
  instructions: "Match each routing table symbol or field to its meaning. Drag from the left column to the correct definition on the right.",
  left: [
    "C",
    "S",
    "O",
    "[110/20]",
    "via 10.1.1.1",
    "0.0.0.0/0",
    "*"
  ],
  right: [
    "Connected route",
    "Static route",
    "OSPF-learned route",
    "Administrative distance / Metric",
    "Next-hop address",
    "Default route",
    "Gateway of last resort"
  ],
  connections: [[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6]]
},

"3.2": {
  type: "sequencer",
  title: "Router Forwarding Decision Process",
  instructions: "Place the steps of the router forwarding decision in the correct order, from packet arrival to forwarding.",
  steps: [
    "Packet arrives at ingress interface",
    "Check the routing table for destination",
    "Find ALL matching routes for the destination",
    "Select the longest prefix match",
    "If tie, use the route with the lowest administrative distance",
    "If still tied, use the route with the lowest metric",
    "Forward packet to the selected next hop"
  ],
  correctOrder: [0,1,2,3,4,5,6]
},

"3.3": {
  type: "commander",
  title: "Static Route Configuration",
  instructions: "Configure static routes on the router. Enter the exact IOS command for each step.",
  prompt: "Router(config)#",
  steps: [
    {
      instruction: "Add a default route via 10.1.1.1",
      answer: "ip route 0.0.0.0 0.0.0.0 10.1.1.1",
      hint: "Default route uses 0.0.0.0 0.0.0.0 as destination and mask",
      partial: ["ip"]
    },
    {
      instruction: "Add a route to 192.168.10.0/24 via 10.1.1.2",
      answer: "ip route 192.168.10.0 255.255.255.0 10.1.1.2",
      hint: "A /24 mask is 255.255.255.0",
      partial: ["ip"]
    },
    {
      instruction: "Add a floating static route to 192.168.10.0/24 via 10.1.1.3 with an administrative distance of 5",
      answer: "ip route 192.168.10.0 255.255.255.0 10.1.1.3 5",
      hint: "Floating static routes append the AD value at the end of the command",
      partial: ["ip"]
    }
  ]
},

"3.4": {
  type: "commander",
  title: "OSPF Configuration",
  instructions: "Configure OSPF on the router. Enter the exact IOS command for each step.",
  prompt: "Router(config)#",
  steps: [
    {
      instruction: "Enable OSPF with process ID 1",
      answer: "router ospf 1",
      hint: "The command starts with 'router ospf' followed by the process ID",
      partial: ["router"]
    },
    {
      instruction: "Set the OSPF router ID to 1.1.1.1",
      answer: "router-id 1.1.1.1",
      hint: "Use the router-id command inside OSPF configuration mode",
      partial: ["router-id"]
    },
    {
      instruction: "Advertise the 10.0.0.0/24 network in area 0",
      answer: "network 10.0.0.0 0.0.0.255 area 0",
      hint: "OSPF uses wildcard masks — /24 wildcard is 0.0.0.255",
      partial: ["network"]
    },
    {
      instruction: "Make interface GigabitEthernet0/0 a passive interface",
      answer: "passive-interface gi0/0",
      hint: "Use passive-interface followed by the interface name",
      partial: ["passive-interface"]
    },
    {
      instruction: "Verify OSPF neighbor adjacencies",
      answer: "show ip ospf neighbor",
      hint: "This is a show command to display OSPF neighbor information",
      partial: ["show"]
    }
  ]
},

"3.5": {
  type: "matcher",
  title: "First Hop Redundancy Protocols",
  instructions: "Match each FHRP characteristic to the correct protocol.",
  left: [
    "Cisco proprietary",
    "IEEE standard (RFC 5798)",
    "Load balancing across gateways",
    "Active / Standby roles",
    "Master / Backup roles",
    "AVG / AVF roles",
    "Virtual MAC 0000.0c07.acXX"
  ],
  right: [
    "HSRP",
    "VRRP",
    "GLBP",
    "HSRP",
    "VRRP",
    "GLBP",
    "HSRP"
  ],
  connections: [[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6]]
},

// Domain 4 Labs
"4.1": {
  type: "sorter",
  title: "NAT Address Types",
  instructions: "Drag each description into the correct NAT address category.",
  categories: ["Inside Local", "Inside Global", "Outside Global"],
  items: [
    { text: "Private IP of an internal host before translation", correct: 0 },
    { text: "Public IP representing an internal host after translation", correct: 1 },
    { text: "Public IP of the external destination server", correct: 2 },
    { text: "The 192.168.1.10 address on your LAN PC", correct: 0 },
    { text: "The NAT-translated address seen by the internet", correct: 1 },
    { text: "IP address of google.com as seen from your network", correct: 2 },
    { text: "Address in the ip nat inside source list command", correct: 0 },
    { text: "Address from the NAT pool assigned to outbound traffic", correct: 1 }
  ]
},

"4.2": {
  type: "sequencer",
  title: "NTP Synchronization Process",
  instructions: "Place the NTP synchronization steps in the correct order from source to client.",
  steps: [
    "Stratum 0 atomic clock provides reference time",
    "Stratum 1 server connects directly to the atomic clock",
    "Stratum 2 server synchronizes to a Stratum 1 server",
    "Each additional hop adds 1 to the stratum number",
    "Stratum 16 means the device is unsynchronized",
    "Client configures with: ntp server [ip]",
    "Verify synchronization with: show ntp status"
  ],
  correctOrder: [0,1,2,3,4,5,6]
},

"4.3": {
  type: "sequencer",
  title: "DHCP DORA Process",
  instructions: "Place the DHCP process steps in the correct order from initial request to lease renewal.",
  steps: [
    "Client sends DHCP Discover (broadcast)",
    "Server sends DHCP Offer (unicast)",
    "Client sends DHCP Request (broadcast)",
    "Server sends DHCP Acknowledge (unicast)",
    "Client configures IP address and parameters",
    "At 50% lease time: client sends unicast renewal",
    "At 87.5% lease time: client sends broadcast rebind"
  ],
  correctOrder: [0,1,2,3,4,5,6]
},

"4.4": {
  type: "matcher",
  title: "SNMP Versions and Features",
  instructions: "Match each SNMP feature or characteristic to the correct version or scope.",
  left: [
    "Community strings for authentication",
    "Full encryption (auth + privacy)",
    "Password authentication only, no encryption",
    "Credentials sent in cleartext",
    "Trap notifications",
    "Inform notifications with acknowledgment"
  ],
  right: [
    "SNMPv2c",
    "SNMPv3 authPriv",
    "SNMPv3 authNoPriv",
    "SNMPv2c",
    "All versions (v1, v2c, v3)",
    "SNMPv2c and SNMPv3"
  ],
  connections: [[0,0],[1,1],[2,2],[3,3],[4,4],[5,5]]
},

"4.5": {
  type: "sorter",
  title: "Syslog Severity Levels",
  instructions: "Drag each syslog message description into its correct severity level bucket.",
  categories: [
    "0 - Emergency",
    "1 - Alert",
    "2 - Critical",
    "3 - Error",
    "4 - Warning",
    "5 - Notification",
    "6 - Informational",
    "7 - Debug"
  ],
  items: [
    { text: "System is unusable — complete failure", correct: 0 },
    { text: "Immediate action needed — hardware failing", correct: 1 },
    { text: "Critical condition — primary processor failed", correct: 2 },
    { text: "Error condition — interface input errors detected", correct: 3 },
    { text: "Warning — memory allocation nearing capacity", correct: 4 },
    { text: "Normal but significant — interface changed state (up/down)", correct: 5 },
    { text: "Informational — config change logged", correct: 6 },
    { text: "Debug output from show and debug commands", correct: 7 }
  ]
},

"4.6": {
  type: "commander",
  title: "DHCP Server and Relay Configuration",
  instructions: "Configure the router as a DHCP server with relay. Enter the exact IOS command for each step.",
  prompt: "Router(config)#",
  steps: [
    {
      instruction: "Exclude the first 10 addresses (192.168.10.1 through 192.168.10.10) from the DHCP pool",
      answer: "ip dhcp excluded-address 192.168.10.1 192.168.10.10",
      hint: "Use ip dhcp excluded-address with start and end addresses",
      partial: ["ip"]
    },
    {
      instruction: "Create a DHCP pool named SALES",
      answer: "ip dhcp pool SALES",
      hint: "Use ip dhcp pool followed by the pool name",
      partial: ["ip"]
    },
    {
      instruction: "Set the pool network to 192.168.10.0/24",
      answer: "network 192.168.10.0 255.255.255.0",
      hint: "Use the network command with the subnet and mask",
      partial: ["network"]
    },
    {
      instruction: "Set the default gateway to 192.168.10.1",
      answer: "default-router 192.168.10.1",
      hint: "DHCP uses default-router (not default-gateway) to set the gateway",
      partial: ["default-router"]
    },
    {
      instruction: "Exit the pool config. Now configure interface Gi0/1 to relay DHCP to server 10.1.1.100",
      answer: "ip helper-address 10.1.1.100",
      hint: "Use ip helper-address on the interface facing the clients",
      partial: ["ip"]
    },
    {
      instruction: "On a different router, set interface Gi0/0 to obtain its IP via DHCP",
      answer: "ip address dhcp",
      hint: "Use ip address dhcp on the interface",
      partial: ["ip"]
    }
  ]
},

"4.7": {
  type: "sorter",
  title: "QoS Mechanisms",
  instructions: "Drag each QoS concept into the correct mechanism category.",
  categories: ["Classification", "Marking", "Queuing", "Policing", "Shaping"],
  items: [
    { text: "NBAR identifies application traffic by deep packet inspection", correct: 0 },
    { text: "DSCP EF (46) set in the IP header for voice traffic", correct: 1 },
    { text: "CoS value set in the 802.1Q Layer 2 header", correct: 1 },
    { text: "Low Latency Queuing (LLQ) prioritizes voice packets", correct: 2 },
    { text: "WRED proactively drops packets before the queue is full", correct: 2 },
    { text: "Drop excess traffic immediately when rate is exceeded", correct: 3 },
    { text: "Buffer excess traffic and send at a smoothed rate", correct: 4 },
    { text: "ACL matches traffic by source/destination for policy application", correct: 0 }
  ]
},

"4.8": {
  type: "commander",
  title: "SSH Configuration",
  instructions: "Configure SSH access on the router. Commands must be entered in the exact correct order.",
  prompt: "Router#",
  steps: [
    {
      instruction: "Set the hostname to R1",
      answer: "hostname R1",
      hint: "A hostname is required before generating RSA keys",
      partial: ["hostname"]
    },
    {
      instruction: "Set the domain name to ccna.lab",
      answer: "ip domain-name ccna.lab",
      hint: "A domain name is required for RSA key generation",
      partial: ["ip"]
    },
    {
      instruction: "Generate RSA keys with a modulus of 2048 bits",
      answer: "crypto key generate rsa modulus 2048",
      hint: "Use crypto key generate rsa with the modulus keyword",
      partial: ["crypto"]
    },
    {
      instruction: "Set SSH to version 2",
      answer: "ip ssh version 2",
      hint: "SSHv2 is required for security — SSHv1 is deprecated",
      partial: ["ip"]
    },
    {
      instruction: "Create a local user 'admin' with privilege level 15 and secret 'Cisco123'",
      answer: "username admin privilege 15 secret Cisco123",
      hint: "Use username [name] privilege [level] secret [password]",
      partial: ["username"]
    },
    {
      instruction: "Enter VTY line configuration for lines 0 through 15",
      answer: "line vty 0 15",
      hint: "VTY lines handle remote access sessions",
      partial: ["line"]
    },
    {
      instruction: "Restrict VTY lines to SSH only (no Telnet)",
      answer: "transport input ssh",
      hint: "Use transport input to specify allowed protocols",
      partial: ["transport"]
    },
    {
      instruction: "Set authentication to use the local user database",
      answer: "login local",
      hint: "This tells the VTY lines to authenticate against locally configured usernames",
      partial: ["login"]
    }
  ]
},

"4.9": {
  type: "matcher",
  title: "File Transfer Protocols",
  instructions: "Match each file transfer protocol characteristic to the correct protocol.",
  left: [
    "Uses UDP port 69",
    "Data channel on TCP port 20",
    "Control channel on TCP port 21",
    "Runs over SSH on TCP port 22",
    "No authentication required",
    "Username and password authentication",
    "Fully encrypted file transfer"
  ],
  right: [
    "TFTP",
    "FTP",
    "FTP",
    "SCP",
    "TFTP",
    "FTP",
    "SCP"
  ],
  connections: [[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6]]
},
// Domain 5 — Security Fundamentals
"5.1": {
  type: "sorter",
  title: "Classify Network Attack Types",
  instructions: "Drag each attack description into the correct threat category. Watch for subtle differences — some attacks share traits across categories.",
  categories: ["Phishing", "DDoS", "Man-in-the-Middle", "Malware"],
  items: [
    { text: "Fake email impersonating IT asking for your password", correct: 0 },
    { text: "Flooding a web server with SYN packets from a botnet", correct: 1 },
    { text: "ARP spoofing to intercept traffic between two hosts", correct: 2 },
    { text: "Self-replicating code that spreads across networks without user action", correct: 3 },
    { text: "Cloned login page hosted on a look-alike domain", correct: 0 },
    { text: "DNS amplification using open resolvers", correct: 1 },
    { text: "Rogue DHCP server handing out a fake default gateway", correct: 2 },
    { text: "Ransomware encrypting files and demanding Bitcoin payment", correct: 3 },
    { text: "SMS message with a link to a credential-harvesting site (smishing)", correct: 0 },
    { text: "Trojan disguised as a free PDF converter tool", correct: 3 }
  ]
},

"5.2": {
  type: "sorter",
  title: "Security Program Elements",
  instructions: "Drag each security measure into the correct program element. Some items may seem to overlap — choose the BEST fit based on the primary purpose.",
  categories: ["User Awareness", "Training", "Physical Access Control"],
  items: [
    { text: "Badge readers on the server room door", correct: 2 },
    { text: "Phishing simulation test sent to all employees", correct: 0 },
    { text: "Annual compliance certification course with exam", correct: 1 },
    { text: "Mantrap/vestibule at building entrance", correct: 2 },
    { text: "'Report suspicious emails' poster in the breakroom", correct: 0 },
    { text: "Hands-on incident response tabletop exercise", correct: 1 },
    { text: "Security cameras monitoring the data center", correct: 2 },
    { text: "Monthly newsletter highlighting recent social engineering attacks", correct: 0 },
    { text: "New-hire orientation module on acceptable use policy", correct: 1 },
    { text: "Biometric lock on the wiring closet", correct: 2 }
  ]
},

"5.3": {
  type: "commander",
  title: "Configure Password Security on a Router",
  instructions: "Apply password hardening to a Cisco router. Enter each command exactly as Cisco IOS expects it — watch capitalization on passwords and keyword order.",
  prompt: "Router(config)#",
  steps: [
    {
      instruction: "Set the enable secret password to 'Cisco123'",
      answer: "enable secret Cisco123",
      hint: "The 'enable secret' command uses MD5 hashing by default",
      partial: ["enable", "secret"]
    },
    {
      instruction: "Encrypt all plaintext passwords in the running config",
      answer: "service password-encryption",
      hint: "This global command applies a Type 7 cipher to all clear-text passwords",
      partial: ["service", "password"]
    },
    {
      instruction: "Enter line console 0 configuration",
      answer: "line console 0",
      hint: "You need to enter the console line before setting its password",
      partial: ["line", "console"]
    },
    {
      instruction: "Set the console password to 'ConPass'",
      answer: "password ConPass",
      hint: "Use the 'password' command inside line configuration mode",
      partial: ["password"]
    },
    {
      instruction: "Enable login on the console line",
      answer: "login",
      hint: "Without this command, the password you just set won't be enforced",
      partial: ["login"]
    },
    {
      instruction: "Return to global config and create local user 'admin' with privilege 15 and secret 'Admin123'",
      answer: "username admin privilege 15 secret Admin123",
      hint: "Use 'username ... privilege ... secret ...' — secret is more secure than password",
      partial: ["username", "admin"]
    },
    {
      instruction: "Set the minimum password length to 10 characters",
      answer: "security passwords min-length 10",
      hint: "This command starts with 'security passwords'",
      partial: ["security", "passwords"]
    },
    {
      instruction: "Block login for 120 seconds after 3 failed attempts within 60 seconds",
      answer: "login block-for 120 attempts 3 within 60",
      hint: "Syntax: login block-for <seconds> attempts <number> within <seconds>",
      partial: ["login", "block-for"]
    }
  ]
},

"5.4": {
  type: "sorter",
  title: "Multifactor Authentication Factors",
  instructions: "Drag each authentication example into its correct MFA factor category. Remember: MFA requires at least TWO different categories — two passwords is NOT MFA.",
  categories: ["Something You Know", "Something You Have", "Something You Are"],
  items: [
    { text: "Password", correct: 0 },
    { text: "Smart card / CAC", correct: 1 },
    { text: "Fingerprint scan", correct: 2 },
    { text: "PIN code", correct: 0 },
    { text: "Phone push notification (authenticator app)", correct: 1 },
    { text: "Iris / retina scan", correct: 2 },
    { text: "Security question (mother's maiden name)", correct: 0 },
    { text: "USB hardware token (YubiKey)", correct: 1 },
    { text: "Voice recognition", correct: 2 },
    { text: "One-time SMS code sent to your phone", correct: 1 }
  ]
},

"5.5": {
  type: "matcher",
  title: "VPN and IPsec Concepts",
  instructions: "Match each VPN/IPsec term on the left to its correct description on the right.",
  left: [
    "Site-to-site VPN",
    "Remote access VPN",
    "ESP (Encapsulating Security Payload)",
    "AH (Authentication Header)",
    "Tunnel mode",
    "Transport mode",
    "GRE over IPsec"
  ],
  right: [
    "Router-to-router, always on, connects entire networks",
    "Client-to-network, on-demand, individual user connects in",
    "Encrypts AND authenticates the payload",
    "Authenticates only — no encryption",
    "Encrypts entire original packet and adds new IP header",
    "Encrypts only the payload, original IP header unchanged",
    "Adds multicast/broadcast support to IPsec tunnels"
  ],
  connections: [[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6]]
},

"5.6": {
  type: "commander",
  title: "Configure Standard and Extended ACLs",
  instructions: "Build ACLs from scratch on a Cisco router. Pay close attention to wildcard masks (NOT subnet masks) and the implicit deny at the end of every ACL.",
  prompt: "Router(config)#",
  steps: [
    {
      instruction: "Create standard ACL 1 — deny the 10.1.1.0/24 network",
      answer: "access-list 1 deny 10.1.1.0 0.0.0.255",
      hint: "Standard ACLs use wildcard masks: /24 = 0.0.0.255. Don't forget the ACL number.",
      partial: ["access-list", "1"]
    },
    {
      instruction: "Add a permit statement for all other traffic",
      answer: "access-list 1 permit any",
      hint: "Without this, the implicit 'deny any' at the end blocks everything else",
      partial: ["access-list", "permit"]
    },
    {
      instruction: "Enter interface Gi0/1 to apply the ACL",
      answer: "interface gi0/1",
      hint: "You must be on the interface to apply the access-group",
      partial: ["interface"]
    },
    {
      instruction: "Apply ACL 1 inbound on this interface",
      answer: "ip access-group 1 in",
      hint: "Use 'ip access-group <number> in|out' to apply an ACL to an interface",
      partial: ["ip", "access-group"]
    },
    {
      instruction: "Return to global config and create a named extended ACL called BLOCK-TELNET",
      answer: "ip access-list extended BLOCK-TELNET",
      hint: "Named extended ACLs: 'ip access-list extended <name>'",
      partial: ["ip", "access-list"]
    },
    {
      instruction: "Deny TCP from any source to host 192.168.1.100 on port 23 (Telnet)",
      answer: "deny tcp any host 192.168.1.100 eq 23",
      hint: "Extended ACL syntax: deny <protocol> <source> <dest> eq <port>. 'host' = exact match.",
      partial: ["deny", "tcp"]
    },
    {
      instruction: "Permit all other IP traffic",
      answer: "permit ip any any",
      hint: "Use 'permit ip any any' to allow everything else through",
      partial: ["permit", "ip"]
    }
  ]
},

"5.7": {
  type: "commander",
  title: "Configure Layer 2 Security (DHCP Snooping + Port Security)",
  instructions: "Harden a switch against DHCP attacks and MAC flooding. Order matters — enable features globally before configuring per-interface settings.",
  prompt: "Switch(config)#",
  steps: [
    {
      instruction: "Enable DHCP snooping globally on the switch",
      answer: "ip dhcp snooping",
      hint: "Global command — must be enabled before per-VLAN config",
      partial: ["ip", "dhcp"]
    },
    {
      instruction: "Enable DHCP snooping on VLAN 10",
      answer: "ip dhcp snooping vlan 10",
      hint: "Snooping is global + per-VLAN — you need both",
      partial: ["ip", "dhcp", "snooping"]
    },
    {
      instruction: "Enter interface Gi0/24 (the uplink to the DHCP server)",
      answer: "interface gi0/24",
      hint: "The uplink port connecting to the legitimate DHCP server",
      partial: ["interface"]
    },
    {
      instruction: "Trust this port for DHCP snooping (it connects to the real DHCP server)",
      answer: "ip dhcp snooping trust",
      hint: "Only trusted ports are allowed to send DHCP server responses (OFFER, ACK)",
      partial: ["ip", "dhcp", "snooping"]
    },
    {
      instruction: "Enter interface Gi0/1 (an access port) to configure port security",
      answer: "interface gi0/1",
      hint: "Move to the access port where you'll apply port security",
      partial: ["interface"]
    },
    {
      instruction: "Enable port security on this interface",
      answer: "switchport port-security",
      hint: "Port security requires the port to be a static access or trunk port first",
      partial: ["switchport", "port-security"]
    },
    {
      instruction: "Set the maximum number of allowed MAC addresses to 2",
      answer: "switchport port-security maximum 2",
      hint: "Default is 1 — set to 2 for a phone + PC scenario",
      partial: ["switchport", "port-security", "maximum"]
    },
    {
      instruction: "Enable sticky MAC address learning",
      answer: "switchport port-security mac-address sticky",
      hint: "Sticky learns MACs dynamically and adds them to running-config",
      partial: ["switchport", "port-security", "mac-address"]
    },
    {
      instruction: "Set the violation mode to restrict (drop + log, don't shut down the port)",
      answer: "switchport port-security violation restrict",
      hint: "Three modes: protect (drop only), restrict (drop + log), shutdown (err-disable)",
      partial: ["switchport", "port-security", "violation"]
    }
  ]
},

"5.8": {
  type: "sorter",
  title: "TACACS+ vs RADIUS",
  instructions: "Drag each characteristic into the correct AAA protocol. These distinctions are heavily tested on the CCNA — know which protocol does what.",
  categories: ["TACACS+", "RADIUS"],
  items: [
    { text: "Uses TCP port 49", correct: 0 },
    { text: "Uses UDP ports 1812 and 1813", correct: 1 },
    { text: "Encrypts the entire packet body", correct: 0 },
    { text: "Encrypts only the password field", correct: 1 },
    { text: "Separates authentication, authorization, and accounting", correct: 0 },
    { text: "Combines authentication and authorization in one step", correct: 1 },
    { text: "Cisco-proprietary protocol", correct: 0 },
    { text: "Open standard defined by RFCs", correct: 1 },
    { text: "Supports per-command authorization for admin sessions", correct: 0 },
    { text: "Preferred for 802.1X network access control", correct: 1 }
  ]
},

"5.9": {
  type: "matcher",
  title: "Wireless Security Standards",
  instructions: "Match each wireless security generation or mode to its correct description. Know the encryption method each standard uses — this is a common exam topic.",
  left: [
    "WEP",
    "WPA",
    "WPA2",
    "WPA3",
    "Personal mode",
    "Enterprise mode"
  ],
  right: [
    "RC4 stream cipher — fatally broken, never use",
    "TKIP — improved WEP, now deprecated",
    "AES/CCMP — current minimum standard",
    "SAE handshake — immune to offline dictionary attacks",
    "Pre-shared key (PSK) — same password for all users",
    "802.1X + RADIUS — per-user authentication"
  ],
  connections: [[0,0],[1,1],[2,2],[3,3],[4,4],[5,5]]
},

"5.10": {
  type: "sequencer",
  title: "Create a WPA2-PSK WLAN on a Wireless LAN Controller",
  instructions: "Put the WLC GUI steps in the correct order to create a new WPA2-PSK WLAN. One wrong step and wireless clients won't connect.",
  steps: [
    "Open WLC HTTPS management interface",
    "Navigate to the WLANs tab",
    "Click 'Create New' WLAN",
    "Enter the profile name and SSID",
    "Go to the Security tab",
    "Select WPA+WPA2 policy with AES encryption",
    "Set Auth Key Management to PSK",
    "Enter the pre-shared key",
    "Go to the General tab",
    "Map the WLAN to the correct VLAN interface",
    "Set WLAN status to Enabled",
    "Click Apply to save changes"
  ],
  correctOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
},

// Domain 6 — Automation and Programmability
"6.1": {
  type: "sorter",
  title: "Benefits of Network Automation — Fact or Fiction?",
  instructions: "Drag each statement into the correct bucket. Automation is powerful, but some claims are myths that trip up exam takers.",
  categories: ["Benefit of Automation", "NOT a Benefit (Myth)"],
  items: [
    { text: "Reduced human error in repetitive configuration tasks", correct: 0 },
    { text: "Faster provisioning — deploy configs in seconds, not hours", correct: 0 },
    { text: "Consistent configurations across 1000+ devices", correct: 0 },
    { text: "Self-healing detection and automatic remediation", correct: 0 },
    { text: "Eliminates the need for network engineers entirely", correct: 1 },
    { text: "Makes networks completely unhackable", correct: 1 },
    { text: "Zero learning curve — anyone can automate on day one", correct: 1 },
    { text: "Works without any programming or scripting knowledge", correct: 1 },
    { text: "Scalable change management across multi-site deployments", correct: 0 },
    { text: "Version-controlled configs enable easy rollback", correct: 0 }
  ]
},

"6.2": {
  type: "sorter",
  title: "Traditional vs. SDN/Controller-Based Networking",
  instructions: "Drag each characteristic into the correct networking model. Understanding this shift is foundational for the automation domain.",
  categories: ["Traditional Network", "SDN / Controller-Based"],
  items: [
    { text: "CLI configuration per individual device", correct: 0 },
    { text: "Distributed control plane — each device makes its own decisions", correct: 0 },
    { text: "Manual configuration changes via SSH or console", correct: 0 },
    { text: "Vendor-specific command syntax on each device", correct: 0 },
    { text: "Centralized controller manages network-wide policy", correct: 1 },
    { text: "API-driven provisioning and monitoring", correct: 1 },
    { text: "Intent-based policies — describe what, not how", correct: 1 },
    { text: "Single pane of glass for visibility and control", correct: 1 },
    { text: "Configuration drift between similar devices is common", correct: 0 },
    { text: "Programmatic templates ensure uniform deployment", correct: 1 }
  ]
},

"6.3": {
  type: "matcher",
  title: "SDN Architecture Components",
  instructions: "Match each SDN architecture term to its correct definition. Know which plane does what and which API connects where.",
  left: [
    "Control plane",
    "Data plane",
    "Northbound API",
    "Southbound API",
    "Overlay network",
    "Underlay network",
    "Fabric"
  ],
  right: [
    "Makes routing/switching decisions and enforces policy",
    "Forwards packets based on the forwarding table",
    "Interface from controller UP to applications",
    "Interface from controller DOWN to network devices",
    "Virtual network built on top (e.g., VXLAN tunnels)",
    "Physical network providing transport underneath",
    "Combined overlay + underlay as a unified system"
  ],
  connections: [[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6]]
},

"6.4": {
  type: "sorter",
  title: "Generative AI vs. Predictive AI in Networking",
  instructions: "Drag each AI/ML use case into the correct category. Both are transforming network operations — know the difference for the exam.",
  categories: ["Generative AI", "Predictive AI"],
  items: [
    { text: "Create device configurations from natural language descriptions", correct: 0 },
    { text: "Generate troubleshooting suggestions from error logs", correct: 0 },
    { text: "Automatically write documentation from running configs", correct: 0 },
    { text: "Detect anomalous traffic patterns before an outage occurs", correct: 1 },
    { text: "Forecast bandwidth capacity needs for next quarter", correct: 1 },
    { text: "Predict hardware failures from sensor telemetry data", correct: 1 },
    { text: "Summarize thousands of syslog entries into actionable insights", correct: 0 },
    { text: "Classify unknown traffic flows as normal or malicious", correct: 1 }
  ]
},

"6.5": {
  type: "matcher",
  title: "REST API Methods and HTTP Status Codes",
  instructions: "Match each REST API concept to its correct description. CRUD operations and status codes show up frequently on the CCNA.",
  left: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "200 OK",
    "201 Created",
    "401 Unauthorized",
    "404 Not Found"
  ],
  right: [
    "Read / retrieve a resource",
    "Create a new resource",
    "Replace an entire existing resource",
    "Update part of an existing resource",
    "Remove a resource",
    "Request succeeded",
    "Resource was successfully created",
    "Authentication required or credentials invalid",
    "Requested resource does not exist"
  ],
  connections: [[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],[8,8]]
},

"6.6": {
  type: "sorter",
  title: "Ansible vs. Terraform",
  instructions: "Drag each characteristic into the correct automation tool. Both are infrastructure automation — but they serve different primary purposes.",
  categories: ["Ansible", "Terraform"],
  items: [
    { text: "Agentless — connects over SSH or NETCONF", correct: 0 },
    { text: "Uses YAML playbooks for task definitions", correct: 0 },
    { text: "Push model — control node sends commands to targets", correct: 0 },
    { text: "Best for Day 2 operations — device configuration and patching", correct: 0 },
    { text: "Idempotent tasks — running twice gives the same result", correct: 0 },
    { text: "Infrastructure as Code — defines desired end-state of resources", correct: 1 },
    { text: "Uses HCL (HashiCorp Configuration Language)", correct: 1 },
    { text: "Maintains a state file tracking deployed resources", correct: 1 },
    { text: "Best for Day 0/1 — provisioning new infrastructure", correct: 1 },
    { text: "plan → apply workflow shows changes before executing", correct: 1 }
  ]
},

"6.7": {
  type: "sorter",
  title: "Valid vs. Invalid JSON",
  instructions: "Drag each JSON snippet into Valid or Invalid. JSON has strict syntax rules — one wrong character makes the entire document unparseable.",
  categories: ["Valid JSON", "Invalid JSON"],
  items: [
    { text: '{"name": "R1", "role": "router"}', correct: 0 },
    { text: '{"ports": [1, 2, 3]}', correct: 0 },
    { text: '{"active": true, "count": null}', correct: 0 },
    { text: "{\'name\': \'R1\'}", correct: 1 },
    { text: '{"interfaces": ["Gi0/0", "Gi0/1"],}', correct: 1 },
    { text: '{name: "R1"}', correct: 1 },
    { text: '{"value": undefined}', correct: 1 },
    { text: '{"nested": {"vlan": 10, "name": "MGMT"}}', correct: 0 },
    { text: '{"empty_list": [], "empty_obj": {}}', correct: 0 },
    { text: '{"a": 1} {"b": 2}', correct: 1 }
  ]
}
};
