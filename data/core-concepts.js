/**
 * core-concepts.js - "Active filtering" layer for the book reader.
 * One entry per CCNA 200-301 objective topic: the SIGNAL only.
 * core, why, memorize[], understand[], trap, visuals[{id,anim,caption}].
 * Source of truth: official CCNA 200-301 v1.1 objective sheet.
 * Generated + verified by the ccna-core-concept-fanout agent crew
 * (generator -> overseer/verifier, one pair per topic).
 * Presets: cascade (stagger-reveal), flow (marching dashes), pulse (pulse bold labels).
 */
window.coreConcepts = {
  "1.1": {
    "core": "Every network component has a fixed role: routers move packets between networks, switches forward frames inside one, firewalls/IPS enforce security, WLCs and DNA Center manage the network, and PoE delivers power and data on one cable.",
    "why": "A network needs distinct devices to forward, segment, secure, manage, and power its traffic; no single box does all jobs.",
    "memorize": [
      "802.3af (PoE) = 15.4W at the switch port, ~12.95W at the device; 802.3at (PoE+) = 30W port, ~25.5W device; 802.3bt (PoE++/4PPoE) = up to 60W (Type 3) and 90W/100W (Type 4)",
      "PoE uses DC power over the same RJ45/twisted-pair cable; Cisco's non-standard predecessor was ILP (Inline Power); CDP/LLDP can negotiate power levels",
      "Routers operate at OSI Layer 3 (route based on IP) and break up broadcast domains (one per interface/subnet); L2 switches operate at Layer 2 (forward by MAC), one broadcast domain per VLAN, one collision domain per port",
      "L3 switch = switching plus inter-VLAN routing (SVIs); uses hardware ASICs for wire-speed routing, no separate router-on-a-stick needed",
      "WLC manages lightweight APs via CAPWAP (UDP 5246 control, UDP 5247 data); APs in this mode have no standalone config (split-MAC)",
      "NGFW/NGIPS add application-layer awareness (deep packet inspection, app visibility) beyond stateful filtering; IPS is inline and can drop traffic, IDS only alerts",
      "DNA Center = Cisco's central SDN controller for intent-based networking, automation, and assurance (Catalyst/campus)"
    ],
    "understand": [
      "Forwarding by layer: switches decide by destination MAC (L2), routers and L3 switches decide by destination IP (L3); routers stop broadcasts, switches flood them within a VLAN",
      "Controller-based vs autonomous: a WLC centralizes config/control for lightweight APs (split-MAC via CAPWAP), while autonomous APs are individually configured; DNA Center centralizes the whole campus fabric",
      "Endpoints (PCs, phones, IoT) and servers are traffic sources/sinks, not forwarding devices; servers provide services (DHCP, DNS, web), endpoints consume them",
      "Security tier: a firewall enforces a policy at the network boundary (stateful by default, NGFW adds app awareness), while IPS inspects for and blocks attack signatures inline"
    ],
    "trap": "Confusing IPS (inline, can actively drop/block malicious traffic) with IDS (out-of-band, only detects and alerts), and assuming a Layer 2 switch can route between VLANs, which requires a router or a Layer 3 switch.",
    "visuals": [
      {
        "id": "osi-model-7-layers",
        "anim": "cascade pulse",
        "caption": "Staggers each OSI layer with pulsing labels to anchor where each component lives: routers at L3, switches at L2, NGFW/IPS up at L7, the exam's favorite layer-matching question."
      },
      {
        "id": "tcp-ip-vs-osi-comparison",
        "anim": "cascade flow",
        "caption": "Reveals the TCP/IP-to-OSI mapping with flowing dashed lines so you can place every device's operating layer, reinforcing L2 vs L3 forwarding distinctions tested in 1.1."
      },
      {
        "id": "poe-standards-power-over-ethernet",
        "anim": "cascade pulse",
        "caption": "Pulses each PoE standard's bold label so 802.3af=15.4W, at=30W, bt=60/90W lock in, the exact wattage numbers the exam loves to swap."
      },
      {
        "id": "poe-power-budget",
        "anim": "cascade pulse",
        "caption": "Stagger-reveals the switch power budget with pulsing totals to show why PoE port draw must stay within the switch's wattage allocation, a common design-question trap."
      }
    ]
  },
  "1.2": {
    "core": "Network topology architectures define how layers (access, distribution, core) and sites (campus, WAN, SOHO, cloud) are arranged: two-tier collapses core into distribution, three-tier separates all three, and spine-leaf gives every leaf one equal hop to every other leaf.",
    "why": "It standardizes how to build scalable, predictable, fault-tolerant networks by separating roles into layers and matching the design to the site size and traffic pattern.",
    "memorize": [
      "Three-tier (three-layer) hierarchy = Access, Distribution, Core (three distinct layers)",
      "Two-tier = Collapsed Core: Core and Distribution merged into one layer, leaving Access + Distribution/Core (used for smaller campus)",
      "Spine-leaf (CLOS) = every leaf connects to every spine; leaves never connect to other leaves and spines never connect to other spines",
      "Spine-leaf delivers consistent, predictable latency: any host-to-host path is the same number of hops (leaf-spine-leaf = 2 hops between switches / 3 switches traversed)",
      "Access layer = connects end devices (PCs, APs, phones); Distribution layer = policy, routing, aggregation/VLAN boundary; Core layer = high-speed backbone, fast transport only",
      "SOHO = Small Office/Home Office, typically a single combined router/switch/AP/firewall device for a small user count",
      "WAN connects geographically separate sites; on-premises = you own/manage the gear and data center, cloud = resources hosted and managed by a provider"
    ],
    "understand": [
      "Spine-leaf was built for east-west (server-to-server) data center traffic, while three-tier hierarchy was built for north-south (client-to-server/Internet) campus traffic.",
      "Two-tier (collapsed core) is chosen when the network is small enough that a dedicated core layer is not cost-justified; you add a core layer once distribution-to-distribution links would otherwise mesh and overwhelm the design.",
      "On-premises vs cloud is a trade of control and upfront capital cost (on-prem) versus scalability and operational expense/managed responsibility (cloud); hybrid combines both."
    ],
    "trap": "Do not confuse two-tier with spine-leaf just because both have two named pieces: two-tier is the campus collapsed-core hierarchy (Access + Distribution/Core for north-south traffic), while spine-leaf is the data-center fabric optimized for east-west traffic with equal-hop any-to-any paths.",
    "visuals": [
      {
        "id": "network-topologies",
        "anim": "cascade pulse",
        "caption": "Cascade-reveals each architecture (two-tier, three-tier, spine-leaf, WAN, SOHO, cloud) and pulses the layer labels so you can match Access/Distribution/Core roles and equal-hop spine-leaf paths to the exam's topology-identification questions."
      }
    ]
  },
  "1.3": {
    "core": "Physical media comes in three flavors: single-mode fiber for long-haul, multimode fiber for short-haul, and copper for cheap short runs, connected either as shared media (a hub/bus, half-duplex, one collision domain) or point-to-point (two devices, full-duplex, no collisions).",
    "why": "It lets you pick the right cable for a given distance, speed, and cost while knowing whether the link can run full-duplex.",
    "memorize": [
      "Single-mode fiber (SMF): ~9 micron core, laser source, longest distance (tens of km), highest cost.",
      "Multimode fiber (MMF): 50 or 62.5 micron core, LED/VCSEL source, shorter distance (varies by OM grade and speed; e.g. OM4 ~550 m at 40G, ~150 m at 100G), cheaper than SMF.",
      "Copper UTP (Cat5e/Cat6) RJ-45: 100-meter maximum length per segment.",
      "Fiber is immune to EMI and does not transmit electrical signals; use it for long runs, high EMI, or electrical isolation.",
      "Shared media (hub) = half-duplex, single collision domain; point-to-point (switch port to one device) = full-duplex, no collisions.",
      "Straight-through cable connects unlike devices (PC-to-switch); crossover connects like devices (switch-to-switch), though Auto-MDIX negotiates this automatically."
    ],
    "understand": [
      "Single-mode allows one light path (mode) so it has less dispersion and reaches farther; multimode allows many light paths so signal spreads and distance is limited.",
      "Shared media (legacy hubs/bus) forces all devices to contend for the wire via CSMA/CD; switched point-to-point links give each device dedicated full-duplex bandwidth with no collisions.",
      "Cable choice is a tradeoff of distance vs cost vs EMI: copper is cheapest for short runs, MMF for in-building/datacenter, SMF for campus/WAN backbone."
    ],
    "trap": "Reversing the core sizes and colors: single-mode is the SMALL ~9-micron core (typically yellow jacket) for LONG distance, while multimode is the LARGER 50/62.5-micron core (orange/aqua) for SHORT distance. Exam answers swap these to trick you, and they pair the wrong light source (laser=SMF, LED=MMF).",
    "visuals": [
      {
        "id": "cable-types-standards",
        "anim": "cascade pulse",
        "caption": "Cascade-reveals each media type (SMF, MMF, copper) with its distance and connector while pulsing the three bold standard labels, reinforcing the exam's core distance-vs-cost-vs-core-size comparison."
      }
    ]
  },
  "1.4": {
    "core": "A duplex mismatch keeps the link up but produces late collisions / FCS errors and slow throughput, so always confirm both speed and duplex match on each end of a link.",
    "why": "It lets you diagnose why a Layer 1/2 link is slow, dropping frames, or counting errors without the link going fully down.",
    "memorize": [
      "Half-duplex uses CSMA/CD; full-duplex disables collision detection so a full-duplex link should show ZERO collisions",
      "Late collisions (collisions detected after the first 64 bytes / 512 bit times) are the signature of a duplex mismatch",
      "Duplex mismatch (one side full, one side half): the HALF side logs late collisions + FCS/CRC errors, the FULL side logs runts/FCS errors and input errors",
      "show interfaces counters to watch: input errors, CRC, frame, runts, giants, late collision, output errors, collisions",
      "CRC/FCS errors mean frames failed the Frame Check Sequence (cable damage, EMI, bad connector, or duplex mismatch)",
      "Runts = frames smaller than 64 bytes; Giants = frames larger than 1518 bytes (1522 with an 802.1Q tag)",
      "Autonegotiation behavior: if one side is hardcoded and the other is set to auto, the auto side cannot detect duplex and defaults to half-duplex, creating a mismatch"
    ],
    "understand": [
      "Speed can be sensed at the physical layer even without negotiation, but duplex relies on autonegotiation; hardcoding one side breaks negotiation and the auto side falls back to half-duplex.",
      "A duplex mismatch does NOT bring the link down (line protocol stays up/up); it silently degrades throughput, so you diagnose it with error counters, not link state.",
      "Rising input errors/CRC point to physical-layer problems (cabling, connectors, EMI); late collisions specifically isolate the fault to a duplex disagreement.",
      "Speed behaves differently: if the two ends cannot agree on a speed, the link generally will not come up at all (line protocol down)."
    ],
    "trap": "Late collisions are the trap. Normal (early) collisions are expected on a half-duplex segment, but ANY late collision, or any collision at all on a full-duplex link, signals a duplex mismatch, not just a busy network. Test-takers wrongly blame congestion.",
    "visuals": []
  },
  "1.5": {
    "core": "TCP is connection-oriented and reliable with a 3-way handshake, sequencing, and acknowledgments, while UDP is connectionless and best-effort with no guarantees.",
    "why": "Applications need to choose between guaranteed in-order delivery (TCP) and low-overhead speed (UDP) at Layer 4.",
    "memorize": [
      "TCP header = 20 bytes minimum (20-60 with options); UDP header = fixed 8 bytes",
      "TCP 3-way handshake = SYN, SYN-ACK, ACK; teardown uses FIN/ACK",
      "TCP fields: source port, dest port, sequence number, acknowledgment number, window size, flags (SYN/ACK/FIN/RST/PSH/URG); UDP fields: source port, dest port, length, checksum",
      "TCP apps: HTTP 80, HTTPS 443, FTP 20/21, SSH 22, Telnet 23, SMTP 25",
      "UDP apps: DNS 53 (also TCP), DHCP 67/68, TFTP 69, SNMP 161/162, NTP 123, RTP/voice/video",
      "Port ranges: well-known 0-1023, registered 1024-49151, dynamic/ephemeral 49152-65535",
      "Both TCP and UDP are Layer 4 (Transport) and use port numbers and a checksum (UDP checksum optional in IPv4, mandatory in IPv6)"
    ],
    "understand": [
      "TCP provides reliability through sequencing (reordering), acknowledgments (retransmit lost segments), and flow control via the sliding window so the sender does not overrun the receiver",
      "UDP trades reliability for low overhead and speed, pushing any error/order recovery up to the application, which suits real-time traffic where late retransmits are useless",
      "Connection-oriented (TCP) means state is established before data flows; connectionless (UDP) just sends datagrams with no setup",
      "Both segment data from the application layer and multiplex sessions using source/destination port numbers"
    ],
    "trap": "DNS uses BOTH UDP 53 (normal queries) and TCP 53 (zone transfers and large responses), so 'DNS = UDP only' is wrong; likewise watch DHCP/TFTP/SNMP/NTP being UDP while a question assumes everything reliable is TCP.",
    "visuals": [
      {
        "id": "tcp-3-way-handshake",
        "anim": "cascade",
        "caption": "Cascade-reveal the SYN, SYN-ACK, ACK steps to lock in that TCP establishes a connection before any data moves, the core of connection-oriented reliability tested on the exam."
      },
      {
        "id": "tcp-vs-udp",
        "anim": "cascade pulse",
        "caption": "Cascade the side-by-side fields and pulse the bold 20-byte vs 8-byte header labels so you instantly recall TCP's reliability overhead versus UDP's lean speed, the heart of objective 1.5."
      }
    ]
  },
  "1.6": {
    "core": "An IPv4 address is a 32-bit number split into network and host portions by its subnet mask, and subnetting borrows host bits to carve one network into many.",
    "why": "Lets a single address block be divided into right-sized subnets so address space is not wasted and broadcast domains stay small.",
    "memorize": [
      "IPv4 = 32 bits, four octets, each octet 0-255; classful first-octet ranges: A 1-126 (/8), B 128-191 (/16), C 192-223 (/24); 127 is reserved for loopback",
      "Usable hosts per subnet = 2^h - 2 (subtract network + broadcast address); number of subnets = 2^(borrowed bits)",
      "Block size = 256 - interesting mask octet value; e.g. /26 = 255.255.255.192, block size 64, subnetting a /24 into four /26s of 62 usable hosts each",
      "Mask-to-CIDR quick refs: /24=255.255.255.0, /25=.128, /26=.192, /27=.224, /28=.240, /29=.248, /30=.252 (/30 = 2 usable hosts for point-to-point links)",
      "RFC 1918 private ranges (3): 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. Separate: 169.254.0.0/16 is APIPA link-local (RFC 3927), NOT RFC 1918; a 169.254.x.x address means DHCP failed",
      "Verify with: show ip interface brief, show ip route, ping; configure with ip address <addr> <mask> under the interface",
      "A /31 (RFC 3021) gives 2 usable hosts on point-to-point links with no broadcast/network reservation"
    ],
    "understand": [
      "The subnet mask, not the address class, determines where the network/host boundary falls; a longer prefix means more network bits and fewer hosts.",
      "VLSM applies different mask lengths to subnets of the same network, allocating the largest-host requirement first so address space is not wasted (e.g. /30 for WAN links, /24 for LANs).",
      "Every subnet reserves two addresses: the all-zeros network address and the all-ones broadcast address, which is why usable hosts is 2^h minus 2.",
      "The first usable address (network+1) is conventionally the default gateway, and a host can only reach others outside its subnet through that gateway."
    ],
    "trap": "Forgetting to subtract 2 for the network and broadcast addresses, or miscounting which subnet a host belongs to: given an IP and mask, find the block size (256 - mask) and the host's subnet boundary before naming the network, broadcast, and valid host range. Second trap: assuming 169.254.x.x is RFC 1918 private addressing; it is APIPA (DHCP failure), and the third real RFC 1918 range 192.168.0.0/16 is the one students drop.",
    "visuals": [
      {
        "id": "ipv4-packet-header",
        "anim": "cascade",
        "caption": "Stagger-reveals each IPv4 header field so you can place the 32-bit source/destination addresses the exam tests in objective 1.6."
      },
      {
        "id": "subnetting-cidr-at-a-glance",
        "anim": "cascade",
        "caption": "Reveals each CIDR prefix in turn, drilling the /24-/30 mask-to-hosts table the exam expects you to recall instantly."
      },
      {
        "id": "vlsm",
        "anim": "cascade",
        "caption": "Builds the VLSM allocation step by step, reinforcing the largest-first sizing that avoids the wasted-address trap."
      }
    ]
  },
  "1.7": {
    "core": "RFC 1918 reserves three IPv4 address blocks (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) for private internal use that are never routed on the public internet.",
    "why": "IPv4 has only ~4.3 billion addresses, far too few for every device, so private ranges let organizations reuse the same address space internally and conserve public IPs.",
    "memorize": [
      "Class A private: 10.0.0.0/8 (10.0.0.0 - 10.255.255.255), one /8 block",
      "Class B private: 172.16.0.0/12 (172.16.0.0 - 172.31.255.255), 16 contiguous /16s",
      "Class C private: 192.168.0.0/16 (192.168.0.0 - 192.168.255.255), 256 /24s",
      "The defining standard is RFC 1918",
      "Private addresses are not routable on the public internet and require NAT/PAT to reach it",
      "APIPA (169.254.0.0/16) is RFC 3927, NOT RFC 1918 private space"
    ],
    "understand": [
      "Private addressing only works because NAT translates private source IPs to a public IP at the network edge before traffic leaves",
      "Different organizations can use overlapping private ranges simultaneously since the addresses never appear on the public internet",
      "The three ranges map to the legacy A/B/C classes but in practice are used with CIDR/VLSM regardless of class"
    ],
    "trap": "The 172 range trips people up: only 172.16.0.0 through 172.31.255.255 is private (a /12), so an address like 172.32.0.1 or 172.15.0.1 is PUBLIC, not private.",
    "visuals": [
      {
        "id": "ipv4-address-classes-private-ranges",
        "anim": "cascade pulse",
        "caption": "Cascade-reveals each class block then pulses the eight bold range labels so the exact RFC 1918 boundaries (especially the 172.16-172.31 /12) lock in for the address-classification questions the exam loves."
      }
    ]
  },
  "1.8": {
    "core": "An IPv6 address is a 128-bit value written as eight 16-bit hextets, where the leftmost bits form the prefix (network) and the rest identify the interface.",
    "why": "IPv4's 32-bit space ran out, so IPv6 provides a 128-bit address space large enough to give every device a globally routable address without NAT.",
    "memorize": [
      "Address is 128 bits, written as 8 groups (hextets) of 4 hex digits separated by colons",
      "Abbreviation: drop leading zeros per hextet, and use :: ONCE to replace one or more consecutive all-zero hextets",
      "GUA = 2000::/3, ULA = FC00::/7 (FD00::/8 used in practice), Link-Local = FE80::/10",
      "EUI-64: split 48-bit MAC, insert FFFE in the middle, flip the 7th bit (U/L) of the first byte",
      "Host subnet prefix is /64; sites are typically assigned /48",
      "Multicast FF00::/8; all-nodes FF02::1, all-routers FF02::2; NO broadcast in IPv6",
      "Loopback ::1/128, unspecified ::/128; enable routing with ipv6 unicast-routing"
    ],
    "understand": [
      "A GUA is globally routable like a public IPv4; a link-local (FE80::) is auto-generated on every IPv6 interface and used only on the local link (next-hop, NDP, routing adjacencies)",
      "The /64 split: first 64 bits = prefix (routing prefix + subnet ID), last 64 bits = interface ID (can be EUI-64 derived, random, or manual)",
      "Verify with show ipv6 interface brief (shows link-local + global), show ipv6 interface, and show ipv6 route",
      "One interface holds multiple IPv6 addresses simultaneously (a link-local AND one or more global/unique-local addresses)"
    ],
    "trap": "The :: shortcut can be used only ONCE in an address (using it twice makes the address ambiguous because you cannot tell how many zero hextets each :: represents).",
    "visuals": [
      {
        "id": "ipv6-address-structure",
        "anim": "cascade pulse",
        "caption": "Cascade-reveals the 128-bit split into a /64 prefix and 64-bit interface ID while pulsing the prefix-length and hextet labels, drilling the exact boundary the exam tests in abbreviation and subnetting questions."
      },
      {
        "id": "ipv6-slaac-ndp",
        "anim": "cascade pulse",
        "caption": "Cascade-builds the SLAAC/NDP exchange and pulses the FE80 link-local and EUI-64 labels, reinforcing how a host auto-derives its interface ID and address that the exam asks you to identify."
      }
    ]
  },
  "1.9": {
    "core": "IPv6 address types split into unicast (one interface), anycast (nearest of many), and multicast (all in group), and an interface ID can be auto-built from the MAC using modified EUI-64.",
    "why": "IPv6 needs distinct address scopes and a way to auto-generate host portions without DHCP, replacing IPv4's exhausted space and broadcast model.",
    "memorize": [
      "Global unicast (GUA) currently allocated from 2000::/3 (addresses begin 2 or 3).",
      "Unique local address (ULA) = FC00::/7; in practice FD00::/8 (private, not internet-routable, like RFC1918).",
      "Link-local = FE80::/10 (FE80::/64 in use); auto-assigned on every interface, never routed off the link.",
      "Multicast = FF00::/8; FF02::1 = all nodes, FF02::2 = all routers on the link.",
      "Solicited-node multicast = FF02::1:FF00:0/104, takes last 24 bits of the unicast address (used by NDP, replaces ARP).",
      "Modified EUI-64: split 48-bit MAC, insert FFFE in the middle (24+FFFE+24 = 64 bits), then flip the 7th bit of the first byte (U/L bit).",
      "IPv6 has NO broadcast address; broadcast function is handled by multicast."
    ],
    "understand": [
      "Anycast uses the same address assigned to multiple devices; routing delivers to the topologically nearest one (syntactically identical to a unicast address).",
      "Link-local addresses are mandatory and are what routing protocols (OSPFv3, EIGRP for IPv6) and NDP use as next-hop and neighbor source.",
      "Modified EUI-64 lets a host derive its own 64-bit interface ID from its MAC for SLAAC, no DHCP server needed.",
      "Multicast scope is encoded in the address (FF02 = link-local scope), so traffic stays within the intended boundary."
    ],
    "trap": "The flipped bit in modified EUI-64 is the 7th bit (U/L bit) of the FIRST byte, not the whole byte; e.g. a MAC starting 00 becomes 02 (00 = 0000 0000 to 0000 0010). Also: IPv6 has no broadcast, so any answer citing an IPv6 broadcast address is wrong.",
    "visuals": []
  },
  "1.10": {
    "core": "Verifying IP parameters means confirming a host's IP address, subnet mask, default gateway, and DNS servers are correctly set on Windows, macOS, or Linux.",
    "why": "Misconfigured or missing IP parameters are a common cause of host connectivity problems, so checking them is an early diagnostic step.",
    "memorize": [
      "Windows: ipconfig (basic) and ipconfig /all (shows MAC, DHCP, DNS, lease)",
      "macOS/Linux: ifconfig (legacy) and ip address / ip addr (modern Linux)",
      "The four IP parameters to verify: IP address, subnet mask, default gateway, DNS server",
      "169.254.0.0/16 = APIPA address means DHCP failed (no DHCP server reachable)",
      "Default gateway must be in the SAME subnet as the host IP or there is no off-net connectivity",
      "Release/renew DHCP: Windows ipconfig /release then ipconfig /renew",
      "DNS lookup test tool: nslookup (Windows, macOS, Linux); macOS/Linux also have dig and host"
    ],
    "understand": [
      "A host needs a default gateway only to reach OTHER subnets; same-subnet traffic works without one",
      "An APIPA (169.254.x.x) address self-assigns when the DHCP DISCOVER gets no offer, so it signals a DHCP/connectivity problem, not a working config",
      "ipconfig /all and ifconfig/ip reveal whether the address was DHCP-assigned or static, plus the MAC address for ARP/switch troubleshooting",
      "Wrong subnet mask makes the host miscalculate which destinations are local vs remote, breaking connectivity even when the IP looks correct"
    ],
    "trap": "A 169.254.x.x address is NOT a valid usable IP for normal network access. The exam expects you to recognize it as an APIPA address signaling the client never reached a DHCP server, not as a sign the host is configured correctly.",
    "visuals": []
  },
  "1.11": {
    "core": "Wi-Fi sends data over unlicensed RF using an SSID to name the network and encryption to protect it, with nonoverlapping channels (1/6/11 in 2.4 GHz) chosen so adjacent networks do not overlap in frequency.",
    "why": "Multiple wireless networks share the same air, so devices need a network name, channels that do not overlap, and encryption to coexist and stay secure.",
    "memorize": [
      "2.4 GHz band: nonoverlapping channels are 1, 6, and 11 (each 22 MHz wide)",
      "2.4 GHz used by 802.11b/g/n; 5 GHz used by 802.11a/n/ac; 802.11n and later are dual-band",
      "5 GHz has many nonoverlapping 20 MHz channels (no 1/6/11 limitation)",
      "WPA2 uses AES (CCMP) for encryption; WPA used TKIP",
      "WPA3 is the current strongest standard and uses SAE (replaces WPA2-Personal's PSK 4-way handshake exchange)",
      "SSID = the human-readable network name, up to 32 characters",
      "WLAN security progression: WEP (broken) to WPA (TKIP) to WPA2 (AES/CCMP) to WPA3 (SAE/GCMP)"
    ],
    "understand": [
      "Nonoverlapping channels (1/6/11 in 2.4 GHz) prevent adjacent/overlapping-channel interference because their frequency ranges do not overlap; using the SAME channel on two nearby APs is co-channel interference, which 1/6/11 does NOT fix (the APs then share airtime via CSMA/CA)",
      "RF is a half-duplex shared medium: only one device transmits at a time per channel, so wireless uses CSMA/CA (not CSMA/CD)",
      "SSID identifies which WLAN a client joins; multiple SSIDs can map to different VLANs on the same AP",
      "Encryption (confidentiality) is separate from authentication; WPA2-Personal uses a PSK while WPA2-Enterprise uses 802.1X/RADIUS"
    ],
    "trap": "Picking adjacent channels like 1, 2, 3 (or any 2.4 GHz combo other than 1/6/11) thinking different channel numbers means no interference: in 2.4 GHz only 1, 6, and 11 are truly nonoverlapping. Also do not confuse the terms: 1/6/11 fixes overlapping/adjacent-channel interference, but two APs on the same channel still cause co-channel interference.",
    "visuals": [
      {
        "id": "wireless-standards-80211",
        "anim": "cascade pulse",
        "caption": "Cascade-revealing each 802.11 standard with pulsing band labels drills the exam-critical split: 2.4 GHz (b/g/n) versus 5 GHz (a/n/ac) and which standards are dual-band."
      }
    ]
  },
  "1.12": {
    "core": "Virtualization splits one physical resource into many isolated logical ones: hypervisors run multiple VMs, containers share one OS kernel, and VRFs slice one router into multiple independent routing tables.",
    "why": "It lets a single physical box run many isolated workloads or routing domains, raising hardware utilization and isolation without buying more equipment.",
    "memorize": [
      "Type 1 hypervisor (bare-metal) runs directly on hardware (ESXi, Hyper-V, KVM); Type 2 hypervisor runs on top of a host OS (VirtualBox, VMware Workstation).",
      "A VM packages a full guest OS + virtual CPU/RAM/disk/NIC; a container packages only the app + dependencies and shares the host OS kernel (no guest OS).",
      "Containers are smaller and start faster than VMs because they have no guest OS; VMs give stronger isolation because each has its own guest OS/kernel.",
      "VRF = Virtual Routing and Forwarding: multiple independent routing tables on one router, with overlapping IP address ranges allowed between VRFs.",
      "VRF-Lite is VRF without MPLS (plain device-level route separation, no MP-BGP/MPLS labels required).",
      "A vSwitch (virtual switch) inside the hypervisor connects VMs to each other and to the physical NIC/uplink.",
      "VMs/containers connect to the physical network through the host's physical NIC via the vSwitch."
    ],
    "understand": [
      "One hypervisor host can run many VMs, each with its own OS, sharing the physical CPU/RAM/NIC underneath.",
      "Containers trade isolation for density and speed: shared kernel means lighter footprint but weaker separation than VMs.",
      "VRFs provide Layer 3 path isolation: two VRFs can use the same subnet (e.g., 10.0.0.0/24) and never see each other's routes, like having separate virtual routers in one chassis.",
      "Server virtualization (VMs/containers) is about compute; VRF is about the network/routing plane. Both are 'virtualization' but operate at different layers."
    ],
    "trap": "Confusing VMs and containers: the classic stem says a container 'includes its own operating system' or 'runs its own kernel.' It does NOT. Containers share the host OS kernel and bundle only the app plus dependencies. The full guest OS belongs to the VM.",
    "visuals": []
  },
  "1.13": {
    "core": "A switch learns source MACs to build its MAC address table, then forwards frames out only the port toward the destination MAC and floods only when the destination is unknown unicast, broadcast, or multicast.",
    "why": "Lets a switch forward Ethernet frames intelligently to a single port instead of repeating every frame out every port like a hub.",
    "memorize": [
      "MAC address table (CAM table) maps destination MAC address -> egress switch port + VLAN.",
      "Learning is based on the SOURCE MAC of an incoming frame; forwarding is based on the DESTINATION MAC.",
      "Default MAC aging timer on Cisco switches is 300 seconds (5 minutes) of inactivity.",
      "Unknown unicast, broadcast (FFFF.FFFF.FFFF), and unknown multicast frames are FLOODED out all ports in the VLAN except the one received on.",
      "A frame whose destination is found in the table is FORWARDED out the single matching port; if source and destination map to the same port, the frame is FILTERED (dropped).",
      "MAC addresses are 48-bit, written as 12 hex digits; the table is held in CAM (Content Addressable Memory).",
      "show mac address-table displays learned entries; clearing the entry or aging it out forces re-learning."
    ],
    "understand": [
      "MAC learning, aging, and the table are all per-VLAN: the same MAC can exist in different VLAN entries and switching decisions are scoped to the frame's VLAN.",
      "Flooding is the fallback when the switch lacks an entry; the reply from the real destination then teaches the switch, so subsequent frames are unicast-forwarded.",
      "Aging removes stale entries so a moved host is re-learned on its new port, keeping the table accurate as the topology changes.",
      "Switches operate at Layer 2 and never alter or examine the IP payload to make a forwarding decision; only the destination MAC matters."
    ],
    "trap": "Confusing which MAC drives which action: the switch LEARNS from the SOURCE MAC but FORWARDS based on the DESTINATION MAC. Exam stems flip these to bait you. Also remember broadcast and multicast are ALWAYS flooded, but unknown unicast is flooded only until the destination is learned, after which it is unicast-forwarded.",
    "visuals": [
      {
        "id": "ethernet-ii-frame-structure",
        "anim": "cascade",
        "caption": "Cascade-revealing the Ethernet II fields highlights that the switch reads the destination MAC to forward and the source MAC to learn, the exact fields objective 1.13 tests."
      },
      {
        "id": "arp-address-resolution-protocol",
        "anim": "cascade pulse",
        "caption": "Cascade plus pulsing the bold ARP-table label shows how ARP's broadcast request is flooded by the switch while the unicast reply lets the switch learn the sender's MAC, tying flooding and learning together for the exam."
      }
    ]
  },
  "2.1": {
    "core": "A VLAN is a Layer 2 broadcast domain that lets one physical switch (or many switches connected by trunks) carry multiple isolated logical networks, and traffic between VLANs must be routed at Layer 3.",
    "why": "It segments a flat switched network into separate broadcast domains for security and traffic control without buying separate physical switches.",
    "memorize": [
      "Normal-range VLANs = 1-1005; extended range = 1006-4094",
      "Default VLAN is VLAN 1 (carries CDP, STP, VTP, DTP) and cannot be deleted or renamed",
      "Reserved/unusable VLANs: 1002-1005 (legacy Token Ring/FDDI), cannot be deleted",
      "Access port config: 'switchport mode access' then 'switchport access vlan <id>'",
      "Voice VLAN config: 'switchport voice vlan <id>' (data VLAN and voice VLAN coexist on one access port; phone tags voice traffic, PC data stays untagged)",
      "Verify with: 'show vlan brief', 'show interfaces switchport', 'show interfaces trunk'",
      "InterVLAN routing options: router-on-a-stick (802.1Q subinterfaces) or Layer 3 switch SVIs"
    ],
    "understand": [
      "A VLAN exists only when it is created and ports are assigned; the same VLAN ID must exist on every switch it spans, connected by trunk links carrying tagged frames",
      "An access port belongs to one data VLAN but can additionally carry one voice VLAN, letting an IP phone and a PC share a single port",
      "Devices in different VLANs are in separate broadcast domains and cannot communicate at Layer 2; a router or Layer 3 switch is mandatory for inter-VLAN traffic",
      "Router-on-a-stick uses one trunked physical link split into 802.1Q subinterfaces, one per VLAN, each acting as that VLAN's default gateway"
    ],
    "trap": "A frame in the native VLAN crosses a trunk untagged, so the classic trap is mismatched native VLANs causing VLAN leaking or dropped traffic and CDP errors; native-VLAN frames are not tagged while all other VLANs are tagged with 802.1Q.",
    "visuals": [
      {
        "id": "vlans-trunk-links",
        "anim": "cascade pulse",
        "caption": "Stagger-reveal each VLAN then pulse the trunk label to show how one trunk link carries multiple tagged VLANs across switches, the exact spanning-VLANs scenario tested in 2.1."
      },
      {
        "id": "inter-vlan-routing-router-on-a-stick",
        "anim": "cascade pulse",
        "caption": "Reveal each 802.1Q subinterface in turn and pulse the gateway labels to reinforce that inter-VLAN traffic must hit a Layer 3 hop, the core verify-connectivity point of 2.1."
      }
    ]
  },
  "2.2": {
    "core": "A trunk port carries traffic for multiple VLANs over one link by tagging each frame with its VLAN ID using the 802.1Q standard, except for the native VLAN, which it sends untagged.",
    "why": "It lets many VLANs cross a single switch-to-switch (or switch-to-router) link instead of needing one physical cable per VLAN.",
    "memorize": [
      "802.1Q (dot1q) is the only trunking encapsulation standard on the CCNA; ISL is legacy/Cisco-proprietary and deprecated.",
      "An 802.1Q tag is 4 bytes inserted into the Ethernet header; the 12-bit VLAN ID (VID) field spans 0-4095, with 0 and 4095 reserved, so usable VLANs are 1-4094.",
      "Default native VLAN is VLAN 1; native VLAN traffic crosses the trunk UNtagged.",
      "Configure a trunk: 'switchport mode trunk'; change native VLAN: 'switchport trunk native vlan <id>'.",
      "Verify trunks with 'show interfaces trunk' (shows mode, encapsulation, native VLAN, and allowed/active VLANs).",
      "Restrict VLANs on a trunk with 'switchport trunk allowed vlan <list>'.",
      "Native VLAN must match on BOTH ends of the trunk or CDP reports a native VLAN mismatch."
    ],
    "understand": [
      "Tagging is how a receiving switch knows which VLAN an incoming frame belongs to; without a tag (native VLAN), the switch assumes it is the configured native VLAN.",
      "An access port belongs to one VLAN and sends frames untagged to an end host; a trunk port carries many VLANs and tags all but the native VLAN to a neighboring switch.",
      "DTP (Dynamic Trunking Protocol) can auto-negotiate trunk formation, but best practice and the exam favor hardcoding mode with 'switchport mode trunk' and disabling DTP with 'switchport nonegotiate'.",
      "If the allowed VLAN list excludes a VLAN, that VLAN's traffic is silently dropped across the trunk even though the link is up."
    ],
    "trap": "A native VLAN mismatch between the two ends of a trunk does NOT bring the link down; both ends stay up/up, but traffic from the two native VLANs gets bridged into each other (a security/VLAN-hopping risk), and CDP logs a mismatch warning rather than disabling the port.",
    "visuals": []
  },
  "2.3": {
    "core": "CDP is Cisco's proprietary Layer 2 neighbor-discovery protocol while LLDP (IEEE 802.1AB) is the open-standard equivalent, both letting directly-connected devices learn each other's identity over the data link.",
    "why": "Lets an admin map directly-connected neighbors (device ID, port, platform, IP) without a topology diagram or console access to every box.",
    "memorize": [
      "CDP timers: advertisements every 60 seconds, holdtime 180 seconds (defaults)",
      "LLDP timers: advertisements every 30 seconds, holdtime 120 seconds (defaults)",
      "CDP is Cisco-proprietary; LLDP is the IEEE 802.1AB open standard",
      "CDP is enabled by default on Cisco devices; LLDP is disabled by default",
      "Verify with: show cdp neighbors / show cdp neighbors detail; show lldp neighbors / show lldp neighbors detail (detail reveals neighbor IP and IOS version)",
      "Enable LLDP globally with 'lldp run'; disable CDP globally with 'no cdp run' (per-interface: 'no cdp enable' / 'no lldp transmit | no lldp receive')",
      "LLDP reinit delay default is 2 seconds; both CDP and LLDP are Layer 2 protocols (operate over the data link, no IP needed to discover neighbors)"
    ],
    "understand": [
      "Discovery info gives device ID, local and remote interface, capabilities, platform, and (in detail view) management IP and software version, which is how you troubleshoot miscabling or document a topology",
      "Because CDP/LLDP run at Layer 2, neighbors are discovered even with no IP addressing configured, but only DIRECTLY connected devices appear, never devices two hops away",
      "LLDP separates transmit and receive ('lldp transmit' / 'lldp receive') so an interface can be configured to only advertise or only listen, unlike CDP's single per-interface enable/disable ('cdp enable')",
      "Disabling these protocols on edge/untrusted ports is a security best practice since the advertisements leak device details in cleartext"
    ],
    "trap": "Mixing up the timers: CDP is 60/180 seconds and LLDP is 30/120 seconds, and remembering LLDP is OFF by default ('lldp run' required) while CDP is ON by default. The exam loves swapping these two sets of numbers.",
    "visuals": [
      {
        "id": "cdp-lldp-discovery-protocols",
        "anim": "cascade pulse",
        "caption": "Cascade-reveals each neighbor entry then pulses the device-ID and port labels, mirroring how 'show cdp/lldp neighbors' exposes who is connected to which local interface (the exact output the exam asks you to read)."
      }
    ]
  },
  "2.4": {
    "core": "EtherChannel bundles multiple physical links into one logical Layer 2 or Layer 3 port so STP treats the bundle as a single loop-free interface while traffic load-balances across the member links.",
    "why": "It removes the STP block on redundant parallel links, so you get aggregated bandwidth and link redundancy instead of one link forwarding while the others sit idle in STP blocking.",
    "memorize": [
      "LACP is the IEEE 802.3ad open-standard negotiation protocol; PAgP is the Cisco-proprietary one",
      "LACP modes: active and passive (active initiates, passive only responds); a channel forms with active/active or active/passive, NOT passive/passive",
      "PAgP modes: desirable and auto (desirable initiates, auto only responds); forms with desirable/desirable or desirable/auto, NOT auto/auto",
      "Mode 'on' forces a channel unconditionally with no negotiation; both sides must be 'on' (on paired with LACP or PAgP will NOT form)",
      "Up to 8 active links per EtherChannel; config on each member: channel-group <#> mode {active|passive|desirable|auto|on}",
      "Layer 3 EtherChannel: enter the port-channel interface, configure 'no switchport', then assign the IP address to the port-channel, not the members",
      "Verify with: show etherchannel summary (look for SU = Layer 2 up, RU = Layer 3 up; P = bundled in port-channel)"
    ],
    "understand": [
      "Member ports must have matching settings (speed, duplex, allowed VLANs, trunk/access mode, native VLAN) or the bundle fails to form or suspends the mismatched port",
      "Load balancing is per-flow based on a hash (src/dst MAC or IP), not per-packet, so a single conversation rides one physical link; bandwidth is aggregate across flows, not per flow",
      "STP sees the entire bundle as one logical interface, so a single member link going down does not trigger an STP recalculation as long as one link survives",
      "Layer 2 EtherChannel switches frames within VLANs; Layer 3 EtherChannel routes between subnets using an IP on the port-channel interface"
    ],
    "trap": "Passive/passive (LACP) or auto/auto (PAgP) will NEVER form a channel because neither side initiates negotiation; at least one side must actively initiate (active or desirable). Also: mode 'on' only works with another 'on', never with active/passive/desirable/auto.",
    "visuals": [
      {
        "id": "etherchannel-port-aggregation",
        "anim": "cascade flow pulse",
        "caption": "Cascade-reveal the parallel physical links bundling into one logical port, flow the dashed traffic paths to show per-flow load balancing, and pulse the LACP/802.3ad labels: the exam tests that the bundle looks like a single STP interface while aggregating bandwidth across members."
      }
    ]
  },
  "2.5": {
    "core": "In Rapid PVST+, every switch elects one root bridge by lowest bridge ID, and every other switch picks one root port toward it, blocking the rest to break loops.",
    "why": "Prevents Layer 2 loops and broadcast storms in redundant switched topologies while still keeping backup links available.",
    "memorize": [
      "Bridge ID = 4-bit priority + 12-bit extended system ID (VLAN) + 6-byte MAC; default priority 32768.",
      "Root election order: lowest BID wins (lowest priority, then lowest MAC); priority set in increments of 4096.",
      "RSTP path costs (long/802.1t): 10 Mbps=2,000,000; 100 Mbps=200,000; 1 Gbps=20,000; 10 Gbps=2,000.",
      "RSTP port roles: root, designated, alternate (backup for root port), backup (backup for designated). RSTP port states: discarding, learning, forwarding.",
      "RSTP standard is IEEE 802.1w; Rapid PVST+ runs one 802.1w instance per VLAN.",
      "Hello timer = 2 seconds; RSTP converges in seconds (typically under 6) vs legacy STP 802.1D 30 to 50 seconds."
    ],
    "understand": [
      "Root port = the single port on a non-root switch with the lowest cumulative path cost back to the root bridge; tie broken by lowest sender BID, then lowest sender port ID.",
      "PortFast moves access ports directly to forwarding skipping listening/learning; pair with BPDU guard so a received BPDU err-disables the port.",
      "Root guard blocks superior BPDUs to keep the root where you want it (root-inconsistent state); loop guard prevents a blocking port from wrongly going forwarding when BPDUs stop arriving (loop-inconsistent).",
      "Primary/secondary root via 'spanning-tree vlan x root primary/secondary' sets priority to 24576 (primary) or 28672 (secondary), or 4096 below current root if needed, so the switch becomes or backs up the root bridge."
    ],
    "trap": "BPDU guard and root guard are confused: BPDU guard err-disables a PortFast port the instant ANY BPDU arrives (protects edge ports), while root guard only blocks SUPERIOR BPDUs to defend root placement and recovers automatically once they stop.",
    "visuals": [
      {
        "id": "spanning-tree-protocol-stp",
        "anim": "cascade pulse",
        "caption": "Watch the root bridge get elected first, then each switch's root port and blocked ports resolve in turn, the loop-free tree STP builds that 2.5 asks you to interpret."
      },
      {
        "id": "rstp-states",
        "anim": "cascade pulse",
        "caption": "Reveals RSTP's three port states (discarding, learning, forwarding) and four roles (root, designated, alternate, backup) one at a time, the precise role and state vocabulary the exam tests."
      }
    ]
  },
  "2.6": {
    "core": "Cisco wireless comes in three architectures (autonomous, split-MAC lightweight via WLC, and cloud/Meraki), where lightweight APs tunnel client traffic to a WLC using CAPWAP.",
    "why": "It lets one controller centrally manage hundreds of access points (RF, security, roaming) instead of configuring every AP by hand.",
    "memorize": [
      "CAPWAP = Control And Provisioning of Wireless Access Points; two tunnels: control on UDP 5246, data on UDP 5247",
      "Split-MAC: AP handles real-time 802.11 (beacons, probe/ACK responses, encryption, buffering); WLC handles non-real-time management (authentication, association, RF management, roaming, security/QoS policy)",
      "Three architectures: Autonomous (standalone, self-contained), Lightweight/Centralized (AP + WLC via CAPWAP, split-MAC), Cloud-based (Meraki, managed via cloud dashboard)",
      "LWAPP was the older Cisco-proprietary protocol; CAPWAP (RFC 5415) is the standards-based successor and is what CCNA tests",
      "CAPWAP control channel is DTLS-encrypted by default (mandatory); data channel DTLS encryption is optional/disabled by default",
      "LAG (Link Aggregation) on a WLC bundles physical ports into one logical link so APs and the WLC share that aggregated path"
    ],
    "understand": [
      "AP modes: Local (default, serves clients), FlexConnect (switches traffic locally / survives WAN loss to WLC), Monitor (no clients, scans for IDS/rogue/location), Sniffer (captures and forwards 802.11 frames to an analyzer), Rogue Detector, SE-Connect (spectrum analysis), Bridge/Mesh and Flex+Bridge",
      "In the centralized model the WLC is the single point of configuration: client traffic from a lightweight AP is tunneled back to the WLC before reaching the wired LAN",
      "Autonomous APs need no controller but do not scale; each is its own management point, which is why enterprises move to WLC-based split-MAC",
      "FlexConnect is the key exception: it can switch client data locally at the branch instead of hairpinning all traffic to a central WLC over the WAN"
    ],
    "trap": "Mixing up the two CAPWAP UDP ports: control is UDP 5246 and data is UDP 5247 (and confusing CAPWAP with the deprecated, Cisco-proprietary LWAPP).",
    "visuals": [
      {
        "id": "wlc-wireless-lan-controller",
        "anim": "cascade flow",
        "caption": "Cascade-reveal the AP-to-WLC path then flow the dashed CAPWAP tunnels to show control (UDP 5246) and data (UDP 5247) traffic carrying client frames back to the controller, the exact split-MAC relationship the exam tests."
      }
    ]
  },
  "2.7": {
    "core": "A lightweight AP connects to a switch ACCESS port (one VLAN, since CAPWAP tunnels client traffic to the WLC), while the WLC connects via a TRUNK port (often a LAG/EtherChannel) to carry the many VLANs mapped to its WLANs.",
    "why": "Defines how wireless gear physically wires into the switched network so that client VLAN traffic reaches the right place through the CAPWAP/WLC split-MAC architecture.",
    "memorize": [
      "Lightweight AP switchport = ACCESS port (single VLAN, the AP management VLAN); all SSID-to-VLAN separation happens at the WLC, not on the AP uplink.",
      "WLC switchport = TRUNK port (802.1Q), because the WLC maps each WLAN/SSID to a different VLAN and must carry multiple VLANs.",
      "CAPWAP (Control And Provisioning of Wireless Access Points) builds the AP-to-WLC tunnel: UDP 5246 = control, UDP 5247 = data.",
      "WLC LAG = a single Link Aggregation Group bundling multiple physical ports into one logical interface; Cisco WLC LAG uses static EtherChannel (mode ON, no LACP/PAgP negotiation).",
      "Autonomous AP switchport = TRUNK port (it bridges multiple SSIDs to local VLANs itself, with no WLC).",
      "Split-MAC: lightweight AP handles real-time 802.11 (beacons, ACKs, encryption); WLC handles management, association/auth, roaming, RF management.",
      "An AP in local (centralized) mode tunnels ALL client data back to the WLC over CAPWAP; the AP access port only needs the AP management VLAN."
    ],
    "understand": [
      "The AP needs only an access port because client traffic is encapsulated in CAPWAP and forwarded to the WLC, which then places it on the correct VLAN: the AP's physical link never carries the individual client VLANs.",
      "The WLC needs a trunk (and usually a LAG) because it is the aggregation point mapping many SSIDs to many VLANs and must scale bandwidth and provide redundancy across its uplinks.",
      "LAG bundles WLC ports into one logical interface for both higher throughput and link redundancy; if one member fails, traffic continues on the remaining members.",
      "Autonomous vs lightweight is the dividing line: autonomous APs do their own VLAN bridging (so they trunk), lightweight APs offload that to the WLC (so they use an access port)."
    ],
    "trap": "Reversing AP and WLC port types: the classic mistake is configuring the lightweight AP uplink as a trunk. The lightweight AP gets an ACCESS port and the WLC gets the TRUNK, because CAPWAP (not the AP link) carries the per-SSID VLAN separation.",
    "visuals": []
  },
  "2.8": {
    "core": "Network device management access is the set of methods (console, Telnet, SSH, HTTP, HTTPS, AAA via TACACS+/RADIUS, and cloud-managed) used to reach and administer a device, split into in-band vs out-of-band and secure vs insecure.",
    "why": "Admins need to configure and monitor devices, but plaintext access leaks credentials, so the topic defines which access paths are encrypted and how login is centralized.",
    "memorize": [
      "Telnet = TCP port 23, sends data including passwords in cleartext (insecure)",
      "SSH = TCP port 22, encrypted; SSHv2 is the secure version to use",
      "HTTP = TCP port 80 (cleartext web mgmt); HTTPS = TCP port 443 (encrypted web mgmt)",
      "TACACS+ = TCP port 49, Cisco-proprietary, encrypts the ENTIRE packet payload, separates AAA (authentication, authorization, accounting)",
      "RADIUS = open standard (IETF), UDP ports 1812 (auth) / 1813 (accounting) [older: 1645/1646], encrypts ONLY the password, combines authentication and authorization",
      "Console and AUX ports = out-of-band access (no network/IP required); VTY lines carry Telnet/SSH in-band access",
      "Cloud-managed (e.g., Cisco Meraki) uses a centralized cloud controller/dashboard reached over the internet for management"
    ],
    "understand": [
      "Out-of-band (console/AUX) does not depend on the network being up, so it is used for initial setup and recovery; in-band (Telnet/SSH/HTTP/HTTPS over VTY/network) requires working IP connectivity.",
      "Telnet and HTTP send everything in cleartext, so SSH and HTTPS are their secure replacements; CCNA strongly prefers SSH over Telnet for device CLI access.",
      "TACACS+ and RADIUS are AAA servers that centralize login credentials instead of storing local passwords on each device, enabling consistent policy and accounting.",
      "Cloud-managed networking shifts the management plane to a vendor cloud dashboard, simplifying multi-site administration versus per-device CLI."
    ],
    "trap": "Confusing TACACS+ and RADIUS: TACACS+ is TCP/49, Cisco-proprietary, encrypts the whole packet payload, and separates authorization from authentication; RADIUS is an open standard on UDP/1812-1813 that encrypts only the password and merges authentication with authorization. The exam loves swapping these attributes.",
    "visuals": []
  },
  "2.9": {
    "core": "The Cisco WLC GUI builds a usable wireless network in four sequential tabs: create the WLAN (SSID, status, interface), set its Layer 2 security, attach a QoS profile, then tune Advanced settings.",
    "why": "Lets an admin map a named SSID to a security policy, a VLAN via a dynamic interface, and a traffic-priority profile so wireless clients can associate and reach the wired network safely. For CCNA, all of this is done in the GUI, not the CLI.",
    "memorize": [
      "A WLAN ties an SSID to a wired VLAN through a WLC dynamic interface; for CCNA the WLAN is secured with WPA2-PSK on the Layer 2 Security tab (GUI only, no CLI).",
      "Layer 2 security options: WPA2 (CCMP/AES), WPA3 (SAE), 802.1X (Enterprise via RADIUS), PSK (Personal/pre-shared key), and Open.",
      "WPA2-Enterprise uses 802.1X + RADIUS (EAP); WPA2-Personal uses a Pre-Shared Key (PSK), minimum 8 ASCII characters, typed on the WLC and client.",
      "Four QoS profiles, highest to lowest: Platinum (voice), Gold (video), Silver (best effort, default), Bronze (background).",
      "802.1X / Enterprise security requires a configured RADIUS (AAA) server; PSK does not.",
      "Each WLAN maps to a VLAN via a dynamic interface (not the management interface); the SSID is broadcast unless Broadcast SSID is disabled in Advanced settings."
    ],
    "understand": [
      "The GUI workflow is sequential: General (SSID/status/interface) then Security (L2/L3/AAA) then QoS then Advanced (band select, FlexConnect, session timeout, client limits).",
      "Security is split into Layer 2 (WPA2/WPA3/802.1X/PSK) and Layer 3 (web auth/passthrough); CCNA config focus is Layer 2 WPA2-PSK, while WPA2/WPA3 concepts are tested separately.",
      "QoS profiles set marking priority (DSCP / 802.1p) so latency-sensitive traffic (voice = Platinum) is serviced ahead of bulk/background data."
    ],
    "trap": "Confusing WPA2-Personal vs WPA2-Enterprise: Personal uses a PSK (no server), Enterprise uses 802.1X and REQUIRES a RADIUS server. If 802.1X is selected but no RADIUS/AAA server is defined, clients cannot authenticate. For the CCNA GUI task the expected answer is WPA2-PSK, not Enterprise.",
    "visuals": []
  },
  "3.1": {
    "core": "A routing table entry reads as code, prefix/mask, [AD/metric], next hop, telling the router which destination it learned, how trustworthy the source is, how costly the path is, and where to forward.",
    "why": "It lets a router pick exactly one best path per destination from many competing learned routes.",
    "memorize": [
      "Administrative Distance (trust between sources): Connected = 0, Static = 1, EIGRP (internal) = 90, OSPF = 110, RIP = 120, External EIGRP = 170, unreachable/unusable = 255",
      "In '[110/65]' the FIRST number is AD, the SECOND is metric; lower wins for both",
      "Routing protocol codes: C = connected, S = static, O = OSPF, D = EIGRP (D is from DUAL, the Diffusing Update Algorithm), R = RIP, B = BGP, L = local /32 host route, * = candidate default",
      "Metric units differ by protocol: OSPF = cost (bandwidth-based), EIGRP = composite (bandwidth+delay), RIP = hop count (max 15, 16 = unreachable)",
      "'Gateway of last resort' is the default route (0.0.0.0/0) used when no specific prefix matches",
      "Default ADs are configurable but the defaults above are the exam values; lower AD is preferred over lower metric"
    ],
    "understand": [
      "AD is the FIRST tiebreaker: when two protocols offer the same prefix, the router installs the route with the LOWER AD regardless of metric, because AD ranks source trustworthiness.",
      "Metric is the SECOND tiebreaker: within a single routing protocol, the route with the LOWEST metric wins, and metric is only comparable between routes from the same protocol.",
      "Longest-prefix match overrides AD and metric entirely: at forwarding time the most specific matching prefix (longest mask) is always chosen first, before AD/metric are ever consulted.",
      "Next hop is the IP the router forwards toward; 'via' plus an exit interface together tell the router both where and out which port to send the packet."
    ],
    "trap": "Students compare AD and metric across different protocols or pick the lower metric when the real winner is the lower AD; remember longest-prefix match comes first, then AD (cross-protocol), then metric (same-protocol only), and metric values from OSPF cost vs RIP hops vs EIGRP composite are NOT comparable to each other.",
    "visuals": [
      {
        "id": "administrative-distance-ad",
        "anim": "cascade pulse",
        "caption": "Cascade-reveals each AD value while pulsing the three bold trust labels, drilling the exam-critical fact that lower AD wins the cross-protocol tiebreak (Connected 0, Static 1, EIGRP 90, OSPF 110, RIP 120)."
      }
    ]
  },
  "3.2": {
    "core": "A router picks the next hop by checking longest prefix match first, then administrative distance to choose between routing sources, then metric to choose among routes from the same source.",
    "why": "It resolves which single route a router uses when multiple paths to a destination exist.",
    "memorize": [
      "Decision order: 1) longest prefix match, 2) administrative distance, 3) metric",
      "Directly connected AD = 0; static route AD = 1",
      "EIGRP (internal) AD = 90; OSPF AD = 110; RIP AD = 120",
      "External EIGRP AD = 170; eBGP AD = 20; iBGP AD = 200",
      "Lower AD and lower metric are both preferred (more trusted / better)",
      "Default route 0.0.0.0/0 is the shortest prefix and is used only when no more specific match exists",
      "OSPF metric = cost; EIGRP = composite (bandwidth + delay by default); RIP = hop count"
    ],
    "understand": [
      "Longest prefix match wins on specificity alone and is checked BEFORE AD or metric, so a /24 from RIP beats a /16 from OSPF even though OSPF is more trusted",
      "Administrative distance compares trustworthiness ACROSS different routing sources (protocols/static/connected) only when prefixes are equal length",
      "Metric compares routes WITHIN the same protocol; AD is never compared between two routes learned by the same protocol",
      "The router installs the winning route into the routing table (RIB); only routes that survive all three steps get used for forwarding"
    ],
    "trap": "Students apply administrative distance first, but longest prefix match always wins first: a more specific prefix from a higher-AD (less trusted) protocol still beats a less specific prefix from a lower-AD protocol.",
    "visuals": [
      {
        "id": "router-forwarding-decision",
        "anim": "cascade pulse",
        "caption": "Cascade reveals the three-step decision funnel (prefix length, then AD, then metric) while pulsing the bold AD and metric labels the exam most often asks you to rank in order."
      }
    ]
  },
  "3.3": {
    "core": "A static route is a manually configured destination-to-next-hop entry, and a more-specific prefix always wins over a less-specific one in the routing table.",
    "why": "Routes traffic to networks the router cannot learn dynamically, giving the admin explicit control over the path without running a routing protocol.",
    "memorize": [
      "IPv4 syntax: ip route <network> <mask> {next-hop-ip | exit-interface}; IPv6 syntax: ipv6 route <prefix>/<len> {next-hop | exit-interface}",
      "Static route default Administrative Distance = 1 (directly connected = 0)",
      "IPv4 default route: ip route 0.0.0.0 0.0.0.0 <next-hop>; IPv6 default route: ipv6 route ::/0 <next-hop>",
      "Host route mask is /32 in IPv4 (255.255.255.255) and /128 in IPv6",
      "Floating static route = a backup static configured with a HIGHER AD than the primary route, e.g. ip route <net> <mask> <next-hop> 200",
      "Verify with: show ip route (look for 'S' code, 'S*' for default candidate) and show ipv6 route"
    ],
    "understand": [
      "The router selects the route with the longest prefix match (most specific) first, regardless of AD; AD only breaks ties between sources offering the SAME prefix length.",
      "A floating static stays out of the routing table until the primary (lower-AD) route fails, then it 'floats up' and installs as the backup.",
      "A route configured with only an exit interface (no next-hop) on a multi-access/Ethernet link relies on proxy ARP and is less reliable than specifying a next-hop IP.",
      "Default route (quad-zero / ::/0) is the least specific route and is used only when no more-specific match exists, typically pointing toward the ISP or core."
    ],
    "trap": "Students assume the lower AD route always wins, but route selection checks longest prefix match FIRST: a /32 host route via AD 200 still beats a /24 network route via AD 1 because the more-specific prefix is selected before AD is ever consulted.",
    "visuals": [
      {
        "id": "static-floating-routes",
        "anim": "cascade flow",
        "caption": "Cascade reveals the primary static route then the floating backup with its higher AD, and flow animates the dashed next-hop paths so you see traffic shift to the backup only after the primary link drops, the exact behavior tested on the exam."
      }
    ]
  },
  "3.4": {
    "core": "Single-area OSPFv2 is a link-state IGP where routers form neighbor adjacencies, elect a router ID, and on broadcast links elect a DR/BDR to control LSA flooding.",
    "why": "Builds a loop-free, fast-converging routing table from a shared link-state database instead of trusting hop-count rumors like RIP.",
    "memorize": [
      "OSPF protocol number 89 (IP protocol, not a TCP/UDP port); administrative distance 110",
      "Cost metric = reference bandwidth (100 Mbps default) / interface bandwidth; lower cost wins",
      "Default timers: Hello 10s / Dead 40s (4x Hello) on both broadcast and point-to-point links",
      "Router ID selection order: 1) manual 'router-id' command, 2) highest loopback IP, 3) highest active physical interface IP",
      "DR/BDR election: highest OSPF priority wins; tie broken by highest router ID; priority 0 = never DR/BDR",
      "Hellos use multicast 224.0.0.5 (AllSPFRouters); DR/BDR use 224.0.0.6 (AllDRouters)",
      "Single area = area 0 (backbone); neighbor states progress Down > Init > 2-Way > Exstart > Exchange > Loading > Full"
    ],
    "understand": [
      "DR/BDR exist only to reduce flooding on multi-access broadcast segments; point-to-point links form a Full adjacency directly with NO DR/BDR election",
      "Adjacency requires matching Hello/Dead timers, area ID, subnet/mask, and authentication; a mismatch stalls neighbors and they never reach Full",
      "On a broadcast segment, non-DR routers reach only 2-Way with each other (DROTHER-to-DROTHER) and Full only with the DR and BDR",
      "Router ID is locked in at OSPF process startup; changing it later requires 'clear ip ospf process' or a reload to take effect"
    ],
    "trap": "The DR election is NON-preemptive: a router with a higher priority that joins after the DR is already elected does NOT take over, so the highest-priority router is frequently not the DR.",
    "visuals": [
      {
        "id": "ospf-areas-router-roles",
        "anim": "cascade pulse",
        "caption": "Cascade-revealing the router roles then pulsing the bold DR/BDR/DROTHER labels reinforces that DR/BDR election only happens on broadcast segments, the exam's favorite distinction from point-to-point links."
      }
    ]
  },
  "3.5": {
    "core": "First Hop Redundancy Protocols let multiple routers share one virtual IP and virtual MAC so hosts keep a single default gateway that survives a router failure.",
    "why": "A host's default gateway is a single point of failure; if that one router dies, the whole subnet loses off-net connectivity.",
    "memorize": [
      "HSRP is Cisco proprietary; default version HSRPv1 supports group numbers 0-255, HSRPv2 supports 0-4095",
      "HSRP virtual MAC = 0000.0c07.acXX (XX = group number in hex); HSRPv2 = 0000.0c9f.fXXX",
      "HSRP uses multicast 224.0.0.2 (v1) / 224.0.0.102 (v2), UDP 1985; highest priority wins, default priority 100, preempt is OFF by default",
      "VRRP is the open IETF standard (RFC 5798), uses multicast 224.0.0.18 over IP protocol 112 (not a UDP/TCP port); master/backup roles, default priority 100, preempt ON by default",
      "VRRP virtual MAC = 0000.5e00.01XX (XX = group/VRID in hex)",
      "GLBP is Cisco proprietary, uses multicast 224.0.0.102 UDP 3222, and provides load balancing across all routers (AVG assigns virtual MACs to AVFs)",
      "HSRP states (simplified): one Active, one Standby, rest listen; full state list is Initial/Learn/Listen/Speak/Standby/Active"
    ],
    "understand": [
      "All three eliminate the gateway single point of failure by presenting a virtual IP/MAC; hosts never change their default gateway setting when failover happens",
      "HSRP and VRRP are active/standby (one router forwards at a time, others idle); GLBP is active/active and actually load-balances traffic across multiple physical routers simultaneously",
      "Election picks the forwarder by highest priority, with the highest IP address as the tiebreaker; preempt determines whether a recovered higher-priority router takes the role back",
      "The virtual MAC is what makes failover transparent: ARP replies advertise the virtual MAC, so host ARP caches stay valid after a failover"
    ],
    "trap": "Confusing which protocol is which: VRRP is the open-standard one with preempt enabled by default, HSRP is Cisco with preempt disabled by default, and GLBP is the only one that load-balances; exams test that HSRP/VRRP are active/standby while GLBP is active/active. Also note VRRP rides directly on IP protocol 112 while HSRP (UDP 1985) and GLBP (UDP 3222) use UDP ports.",
    "visuals": [
      {
        "id": "fhrp-hsrp-vrrp-glbp",
        "anim": "cascade pulse",
        "caption": "Stagger-revealing the two physical routers behind one virtual IP/MAC and pulsing the Active/Standby labels shows how hosts keep a single gateway through failover, the exact tested distinction between HSRP/VRRP active-standby and GLBP active-active."
      }
    ]
  },
  "4.1": {
    "core": "Inside source NAT rewrites private inside-local source addresses into public inside-global addresses as traffic crosses from the inside to the outside interface.",
    "why": "Lets many private RFC 1918 hosts reach the internet over a limited set of routable public IPv4 addresses, conserving the depleted IPv4 space.",
    "memorize": [
      "Four NAT address types: inside local (private, real address on the inside host), inside global (public, how the inside host appears to the outside), outside local, outside global.",
      "Static NAT one-to-one: `ip nat inside source static 10.1.1.1 200.1.1.1`.",
      "Dynamic pool: `ip nat pool NAME start-ip end-ip netmask MASK` then `ip nat inside source list ACL pool NAME`.",
      "PAT (pool overload): `ip nat inside source list ACL pool NAME overload` adds port numbers so many inside locals share one inside global.",
      "Every interface must be tagged: `ip nat inside` on the inside-facing interface, `ip nat outside` on the outside-facing interface.",
      "Verify with `show ip nat translations` (active mappings) and `show ip nat statistics`; clear dynamic entries with `clear ip nat translation *`.",
      "The referenced ACL selects which inside-local source addresses get translated (permit = translate); use a standard or extended ACL, never put an explicit deny-any at the end."
    ],
    "understand": [
      "Translation direction matters: 'inside source' rewrites the SOURCE IP of packets moving inside-to-outside (and the destination on the return path).",
      "Static NAT is bidirectional and permanent (good for servers reachable from outside); dynamic pool NAT only builds an entry when an inside host initiates traffic.",
      "PAT/overload multiplexes on Layer 4 ports, so one public IP can serve thousands of hosts; plain dynamic NAT fails (drops new sessions) once the pool is exhausted.",
      "The ACL in dynamic NAT is a selector, not a filter: it decides who gets translated, and you do NOT add a deny/permit-any to it the way you would for security filtering."
    ],
    "trap": "Mixing up the address terms and interface tags: candidates flip 'inside local' (the private real address) with 'inside global' (the public translated address), or tag the interfaces backward, an exam favorite because the translation silently fails when `ip nat inside`/`ip nat outside` are reversed.",
    "visuals": [
      {
        "id": "nat-pat-translation",
        "anim": "cascade pulse",
        "caption": "Stagger-reveal the inside-local to inside-global rewrite while pulsing the bold address-type and port labels, drilling the four NAT terms and PAT port multiplexing the exam tests directly."
      }
    ]
  },
  "4.2": {
    "core": "NTP synchronizes device clocks to a reference time source over a hierarchy of strata, with lower stratum numbers meaning closer to the authoritative time source.",
    "why": "Accurate, consistent time across devices is required for trustworthy logs, timestamps, certificates, and event correlation during troubleshooting.",
    "memorize": [
      "NTP uses UDP port 123",
      "Stratum 0 = reference clock (atomic/GPS); stratum 1 = directly attached server; higher stratum = farther from source (max usable 15, stratum 16 = unsynchronized/invalid)",
      "Configure a device as a client: ntp server <ip-address>",
      "Configure a device to act as an authoritative time source: ntp master <stratum>",
      "Verify with show ntp status (sync state, stratum, reference) and show ntp associations (peers; * = synced server)",
      "NTP version commonly tested is NTPv3/NTPv4"
    ],
    "understand": [
      "A router can be both an NTP client (to an upstream server) and an NTP server (to downstream clients) at the same time, which is the core of client/server mode.",
      "Stratum increments by one with each hop away from the reference clock, so a client one hop below a stratum 2 server becomes stratum 3.",
      "An association marked with * in show ntp associations is the currently synchronized master; a device only serves accurate time once it is itself synchronized.",
      "NTP authentication (ntp authenticate / ntp trusted-key) can be added so clients only accept time from a trusted server, but plain client/server needs only ntp server."
    ],
    "trap": "Confusing the stratum direction: lower stratum is BETTER (closer to the true source), and stratum 16 means UNSYNCHRONIZED, not the best clock.",
    "visuals": [
      {
        "id": "ntp-network-time-protocol",
        "anim": "cascade",
        "caption": "Cascade-reveals the NTP stratum hierarchy from reference clock down to client, reinforcing the exam-critical idea that lower stratum numbers sit closer to the authoritative time source."
      }
    ]
  },
  "4.3": {
    "core": "DHCP automatically hands out IP configuration to clients, while DNS resolves human-readable hostnames into IP addresses.",
    "why": "Manually assigning IPs and forcing users to memorize numeric addresses does not scale, so DHCP automates addressing and DNS maps names to addresses.",
    "memorize": [
      "DHCP uses UDP: server listens on port 67, client uses port 68",
      "DHCP client/server exchange is DORA: Discover, Offer, Request, Acknowledge",
      "DHCP Discover and Request are broadcasts; a relay agent (ip helper-address) forwards them across subnets when the server is remote",
      "DNS uses UDP port 53 for normal queries and TCP port 53 for zone transfers and large responses",
      "Cisco router DHCP excluded addresses are set with 'ip dhcp excluded-address'; the pool is defined under 'ip dhcp pool'",
      "DNS A record maps a name to an IPv4 address; AAAA record maps a name to an IPv6 address",
      "On a Cisco device, 'ip domain-lookup' enables DNS resolution and 'ip name-server' sets the DNS server"
    ],
    "understand": [
      "DHCP DORA: client broadcasts Discover, server sends Offer, client broadcasts Request for the offered lease, server sends Acknowledge to finalize, plus the lease has a finite duration that the client renews",
      "A DHCP relay agent is needed because DHCP Discover/Request are broadcasts that routers do not forward, so 'ip helper-address' converts them to unicast toward a centralized server",
      "DNS resolution is hierarchical and recursive: a host queries its configured resolver, which walks root, TLD, and authoritative servers to return the final IP",
      "Both protocols are foundational client/server services: without DHCP hosts get no address, and without DNS users must use raw IP addresses"
    ],
    "trap": "Confusing the DHCP port direction: the SERVER uses UDP 67 and the CLIENT uses UDP 68 (do not assume the client owns 67), and remember 'ip helper-address' is configured on the router interface facing the clients, not on the server side.",
    "visuals": [
      {
        "id": "dhcp-dora-process",
        "anim": "cascade",
        "caption": "Stagger-revealing each DORA step reinforces the exact Discover-Offer-Request-Acknowledge order the exam tests, including which messages are broadcast."
      },
      {
        "id": "dns-resolution-flow",
        "anim": "cascade",
        "caption": "Revealing the query path one hop at a time shows how a name resolves to an IP through the resolver and authoritative servers, the core DNS role on the exam."
      }
    ]
  },
  "4.4": {
    "core": "SNMP lets a manager poll and receive alerts from network devices by reading and writing the device's MIB objects, each identified by an OID, through an agent.",
    "why": "Gives network operators a standard way to centrally monitor device health and status (and optionally push config) instead of logging into every box one at a time.",
    "memorize": [
      "SNMP uses UDP: agent listens on port 161 for get/set polls; manager listens on port 162 for traps/informs.",
      "SNMPv1 and v2c use plaintext community strings (RO and RW) with no encryption; SNMPv3 adds authentication, integrity, and encryption.",
      "SNMPv3 security levels: noAuthNoPriv, authNoPriv, and authPriv (the only level that encrypts).",
      "Manager polls agents with GET messages; agent answers; agent sends unsolicited TRAP/INFORM on events.",
      "A trap is fire-and-forget (no acknowledgment); an inform is acknowledged by the manager (SNMPv2c/v3).",
      "MIB is the hierarchical database of managed objects; each object has a unique OID; agents expose the MIB.",
      "SNMP walk = sequential GET-NEXT operations to traverse the MIB tree."
    ],
    "understand": [
      "Manager-agent pull model: the NMS (manager) initiates polling on UDP 161; the agent on each device responds with the requested object values.",
      "Traps/informs are the push side: the agent proactively notifies the manager on UDP 162 when a defined event occurs, reducing polling load.",
      "Community strings in v1/v2c are effectively passwords sent in cleartext, which is why SNMPv3 (auth + encryption) is the recommended secure version.",
      "Read-only (RO) community lets the manager monitor; read-write (RW) lets it change device settings, so RW must be tightly controlled."
    ],
    "trap": "Mixing up the two ports: GET/SET polling goes to the agent on UDP 161, but traps and informs go to the manager on UDP 162. The exam loves asking which port carries traps (answer: 162, not 161).",
    "visuals": [
      {
        "id": "snmp-architecture",
        "anim": "cascade flow",
        "caption": "Cascade reveals manager, agent, and MIB in order while flow animates the dashed polling/trap lines, reinforcing that GETs flow to UDP 161 and traps return on UDP 162 (the exam's favorite port-direction question)."
      }
    ]
  },
  "4.5": {
    "core": "Syslog tags every log message with a facility (the subsystem/process it came from) and a severity level 0 through 7, so you can filter which messages get sent, displayed, or stored based on importance.",
    "why": "Without structured severity levels and facilities, network devices flood admins with undifferentiated log noise and there is no way to prioritize critical failures over routine informational chatter.",
    "memorize": [
      "Severity levels run 0 to 7: 0 Emergency, 1 Alert, 2 Critical, 3 Error, 4 Warning, 5 Notification, 6 Informational, 7 Debugging (LOWER number = MORE severe)",
      "Mnemonic: Every Awesome Cisco Engineer Will Need Ice cream Daily (Emergency, Alert, Critical, Error, Warning, Notification, Informational, Debugging)",
      "Syslog uses UDP port 514 by default to send messages to a syslog server",
      "Configuring a level (e.g. 'logging trap 5') captures that level AND all more-severe levels above it (0 through 5)",
      "Cisco default console logging is level 7 (debugging), so all messages are shown on the console by default",
      "Log message format: seq no, timestamp, %FACILITY-SEVERITY-MNEMONIC: description (e.g. %LINK-3-UPDOWN means LINK facility, severity 3 Error)",
      "Logging destinations: console, monitor (vty/Telnet/SSH), buffered (RAM), and syslog server (configured with 'logging host')"
    ],
    "understand": [
      "The facility code identifies the source subsystem or process generating the message (such as LINK, OSPF, SYS), and is separate from how severe the event is.",
      "Severity is inverted from intuition: 0 is the most urgent (Emergency) and 7 is the least urgent (Debugging) verbose output.",
      "Setting a logging level acts as a threshold filter: the device forwards messages at that level and everything more severe (lower-numbered), suppressing the rest.",
      "Viewing logs over a remote SSH/Telnet session requires 'terminal monitor' because syslog messages do not auto-display to vty lines the way they do on the console."
    ],
    "trap": "Severity numbering is backwards from intuition: level 0 (Emergency) is the MOST critical and level 7 (Debugging) is the LEAST, and 'logging trap 4' sends levels 0-4 (the MORE severe levels), NOT levels 4-7. Exam answers exploit students who assume a higher number = higher priority.",
    "visuals": [
      {
        "id": "syslog-severity-levels",
        "anim": "cascade pulse",
        "caption": "Cascade-reveals the 8 severity levels 0-7 top to bottom while pulsing each bold level label, drilling the exam-critical fact that 0 (Emergency) is most severe and 7 (Debugging) is least."
      }
    ]
  },
  "4.6": {
    "core": "DHCP leases IP config to clients via the four-message DORA exchange, and an ip helper-address relay forwards broadcast DISCOVERs across a router to a DHCP server on another subnet.",
    "why": "Hosts on different subnets need automatic IP addressing from a central DHCP server, but routers do not forward broadcasts by default.",
    "memorize": [
      "DORA = Discover, Offer, Request, Acknowledge (client broadcasts Discover and Request; server sends Offer and Ack)",
      "DHCP server listens on UDP port 67; DHCP client listens on UDP port 68",
      "DHCP relay is configured on the router interface facing the client with: ip helper-address <server-ip>",
      "Configure a router as a DHCP client interface with: ip address dhcp",
      "Verify client/relay state with: show ip interface brief, show dhcp lease, show ip dhcp binding (server side)",
      "ip helper-address forwards 8 UDP broadcast services by default, including DHCP (67/68), TFTP (69), DNS (53), and Time/NetBIOS",
      "DHCP DISCOVER and REQUEST are broadcast (255.255.255.255); the relay converts them to unicast toward the server"
    ],
    "understand": [
      "Routers do not forward broadcasts, so a relay agent (ip helper-address) is required whenever the DHCP server is not on the same subnet as the client.",
      "The relay agent inserts the receiving interface's IP into the giaddr field so the server knows which subnet/scope to assign an address from.",
      "ip helper-address is applied on the interface closest to the clients (the SVI or LAN-facing interface), pointing at the remote DHCP server.",
      "A router interface set with ip address dhcp acts as a DHCP client and obtains its address dynamically, common on ISP-facing links."
    ],
    "trap": "ip helper-address goes on the router interface CLOSEST to the clients (the broadcast-receiving LAN side), NOT on the interface near the DHCP server, and it points to the server's IP, not the client subnet.",
    "visuals": []
  },
  "4.7": {
    "core": "QoS per-hop behavior (PHB) is the set of tools each device applies to traffic on a hop-by-hop basis: classify it, mark it, queue it, manage/avoid congestion, then police or shape the rate.",
    "why": "Voice and video share one link with bulk data, and without QoS that mixed traffic suffers delay, jitter, and drops that wreck real-time apps.",
    "memorize": [
      "Layer 2 CoS marking lives in the 802.1Q tag, 3 bits, values 0-7",
      "Layer 3 DSCP marking lives in the 6-bit DSCP field of the IPv4 ToS / IPv6 Traffic Class byte, 64 possible values (0-63)",
      "EF (Expedited Forwarding) = DSCP 46, the recommended marking for voice",
      "AF (Assured Forwarding) classes use the form AFxy, e.g. AF41; CS (Class Selector) values CS0-CS7 are backward-compatible with old IP Precedence",
      "Policing DROPS or RE-MARKS traffic that exceeds the rate and does NOT buffer; Shaping BUFFERS (delays) excess traffic and smooths the rate",
      "LLQ (Low Latency Queuing) adds a strict-priority queue to CBWFQ and is the recommended tool for voice",
      "Tail drop is the default congestion behavior; WRED (Weighted Random Early Detection) drops selectively before the queue is full to avoid TCP global synchronization"
    ],
    "understand": [
      "Classification identifies traffic (by ACL, NBAR, interface, or existing markings); marking writes that decision into the packet (CoS or DSCP) so downstream hops trust it without reclassifying. Mark as close to the source as possible (trust boundary).",
      "Queuing and congestion management decide WHICH packet leaves next when the egress queue fills; congestion AVOIDANCE (WRED) decides which packets to drop early to keep queues from ever filling.",
      "Policing and shaping both enforce a rate, but policing reacts to bursts by dropping/re-marking (good inbound, adds no delay) while shaping buffers and delays (good outbound toward a slower link, adds latency).",
      "PHB means the treatment is applied independently at each hop based on the packet's marking, so consistent end-to-end QoS requires every device to honor the same DSCP-to-treatment policy."
    ],
    "trap": "Policing vs shaping: the exam exploits that shaping BUFFERS/delays excess traffic (smoothing it) while policing DROPS or RE-MARKS it (no buffering); pick shaping for outbound smoothing and policing when you must not add delay.",
    "visuals": [
      {
        "id": "qos-quality-of-service",
        "anim": "cascade pulse",
        "caption": "Cascade-reveal the QoS pipeline stages then pulse the two bold markings (CoS at Layer 2, DSCP at Layer 3) to anchor where each marking lives, the fact the exam tests most."
      }
    ]
  },
  "4.8": {
    "core": "SSH encrypts your remote management session to a device's VTY lines, replacing cleartext Telnet so passwords and config never travel in the open.",
    "why": "Telnet sends usernames, passwords, and every command in cleartext over the network, so anyone sniffing the link can steal credentials and read the entire session.",
    "memorize": [
      "SSH listens on TCP port 22; Telnet on TCP port 23",
      "SSHv2 is the secure version to enforce: `ip ssh version 2` (SSHv1 is weak and should be disabled)",
      "Generating the RSA crypto key requires a minimum modulus of 768 bits to enable SSHv2; 1024 or 2048 is commonly used: `crypto key generate rsa modulus 1024`",
      "A hostname AND an ip domain-name must be set before `crypto key generate rsa` will succeed (the key label is built from hostname.domain)",
      "VTY lines must be told to accept SSH with `transport input ssh` (or `transport input ssh telnet`) plus `login local`",
      "A local username/password (`username NAME secret PASS`) is required because SSH authenticates users, not just a line password"
    ],
    "understand": [
      "Order of operations: set hostname -> set ip domain-name -> generate RSA key -> create local user -> configure VTY lines with login local and transport input ssh. The RSA key generation is what actually enables the SSH server.",
      "SSH provides confidentiality (encryption), integrity, and authentication; Telnet provides none of these.",
      "`login local` on the VTY lines forces username+password authentication against the local user database (or AAA), which SSH requires, versus the simple shared `password` used with plain `login`.",
      "`transport input` controls which protocols a VTY line will accept inbound; leaving Telnet allowed (`transport input all` or default) defeats the security purpose of configuring SSH."
    ],
    "trap": "Forgetting that `crypto key generate rsa` will FAIL (or the SSH server will not start) unless BOTH a hostname and an `ip domain-name` are configured first, because the RSA key name is derived from hostname.domain-name; the exam loves showing a config missing the domain-name and asking why SSH does not work.",
    "visuals": [
      {
        "id": "ssh-vs-telnet",
        "anim": "cascade",
        "caption": "Stagger-revealing the encrypted SSH (TCP 22) path beside the cleartext Telnet (TCP 23) path drives home the core exam point: SSH protects credentials in transit while Telnet exposes them."
      }
    ]
  },
  "4.9": {
    "core": "TFTP and FTP both move files across the network, but FTP is reliable and authenticated over TCP while TFTP is a lightweight, no-login transfer over UDP.",
    "why": "Network devices need a way to back up, restore, and transfer config files and IOS images to and from a central server.",
    "memorize": [
      "FTP uses TCP and TWO ports: 21 = control/commands, 20 = data transfer (active mode)",
      "TFTP uses UDP port 69 (single well-known port for the initial request; data transfer then uses an ephemeral port)",
      "FTP requires authentication (username/password); TFTP has NO authentication and NO encryption",
      "TFTP is connectionless at the transport layer (UDP) but adds its own block-by-block ACK/retransmit reliability at the application layer; FTP is connection-oriented and reliable via TCP",
      "FTP supports directory listing, rename, delete, and resume; TFTP only supports basic read (GET) and write (PUT) of a single file",
      "Both run at the Application layer; neither encrypts data (use SFTP/FTPS/SCP for security)"
    ],
    "understand": [
      "TCP (FTP) gives reliability, flow control, and error recovery at the cost of more overhead; UDP (TFTP) is lighter weight, with TFTP handling its own simple reliability, making it ideal for small transfers like config files and IOS images on a LAN",
      "FTP uses two separate channels: a persistent control connection (port 21) for commands and a separate data connection (port 20 in active mode) for the actual file bytes",
      "TFTP's tiny footprint makes it common for PXE/network boot and pushing IOS images, where a full login is unnecessary on a trusted segment",
      "Use 'copy' commands on IOS (e.g., copy running-config tftp:) to move files to/from these servers"
    ],
    "trap": "Mixing up the transport and ports: TFTP = UDP 69, while FTP = TCP and needs BOTH 21 (control) and 20 (data). The exam loves asking which protocol is connectionless/no-auth (TFTP) versus reliable/authenticated (FTP), and which port pair belongs to FTP. Also do not say TFTP is 'unreliable' outright: it runs over connectionless UDP but provides its own lockstep ACK reliability.",
    "visuals": []
  },
  "5.1": {
    "core": "A threat is a potential danger, a vulnerability is the weakness it targets, an exploit is the tool or method that leverages that weakness, and mitigation is the control that reduces the resulting risk.",
    "why": "Gives a shared vocabulary for describing how attacks happen and how defenses are layered, so risk can be assessed and reduced systematically.",
    "memorize": [
      "THREAT = the potential for an attacker to cause harm (the actor or event with intent/capability).",
      "VULNERABILITY = a weakness or flaw in a system (software bug, weak password, misconfiguration, unpatched OS).",
      "EXPLOIT = the actual code, tool, or technique used to take advantage of a vulnerability.",
      "MITIGATION (countermeasure) = a control that reduces risk: e.g. patching, ACLs, firewalls, AAA, port security, encryption, antimalware.",
      "RISK = the likelihood that a threat exploits a vulnerability; risk exists only when a threat AND a vulnerability both exist.",
      "CIA triad = Confidentiality, Integrity, Availability (the three goals security protects).",
      "Defense in depth = layering multiple mitigations so no single failure breaks security."
    ],
    "understand": [
      "The chain is causal: a THREAT actor uses an EXPLOIT against a VULNERABILITY, and MITIGATION breaks that chain by removing the weakness or blocking the method.",
      "Removing the vulnerability (patch, fix config) eliminates risk even if the threat still exists; you cannot remove the threat actor, so you control the vulnerability and the exploit path.",
      "Mitigations map to security goals: encryption protects confidentiality, hashing/checksums protect integrity, redundancy protects availability."
    ],
    "trap": "Confusing vulnerability with exploit: the vulnerability is the WEAKNESS (e.g. an unpatched buffer overflow), while the exploit is the WEAPON that uses it (the malicious code run against it). The exam picks the wrong term in answer choices.",
    "visuals": []
  },
  "5.2": {
    "core": "Security program elements are the people-and-facility defenses (user awareness, training, physical access control) that protect a network beyond technical configuration.",
    "why": "Most breaches start with people (phishing, weak habits) or physical access (someone walking into the wiring closet), so technical controls alone are not enough.",
    "memorize": [
      "User awareness = brief, periodic exposure that makes users recognize threats (e.g., a simulated phishing email or login banner), NOT formal instruction.",
      "Training = formal, scheduled instruction that teaches users HOW to follow security policy and use tools correctly.",
      "Physical access control = restricting physical entry to network devices, wiring closets, server rooms, and datacenters (locked doors, badge/card readers, biometrics, security guards, locking racks, mantraps/access-control vestibules).",
      "The three named elements in objective 5.2 are: (1) user awareness, (2) training, (3) physical access control.",
      "Physical security protects against console-port access, theft, and password-recovery / device-reset attacks that require physical contact with the device.",
      "These are administrative and physical controls (people and facilities), distinct from technical controls like ACLs, AAA, 802.1X, or port security."
    ],
    "understand": [
      "Security controls split into administrative (policies, awareness, training), physical (locks, badges, guards), and technical (firewalls, ACLs, encryption); objective 5.2 lives in the administrative and physical categories.",
      "Awareness is broad and ongoing (recognize a threat); training is deep and specific (do the procedure correctly). Awareness raises the alarm, training teaches the response.",
      "Physical access control matters because anyone with physical access to a device can bypass most software security (console access, factory reset, password recovery, removing or stealing hardware).",
      "These elements support the larger CIA goal (confidentiality, integrity, availability) by reducing the human and physical attack surface."
    ],
    "trap": "Confusing user awareness with training. Awareness = short, recurring exposure that makes users notice threats (phishing simulations, banners). Training = formal, scheduled instruction that teaches them what to actually do. The exam stem signals one or the other by depth and formality, so match on that, not on which term sounds more thorough.",
    "visuals": []
  },
  "5.3": {
    "core": "Local device access control restricts CLI entry by storing usernames and passwords in the router/switch running-config and forcing login on console, VTY, and privileged EXEC lines.",
    "why": "Stops anyone with physical or network reach from getting into the device CLI and changing the configuration.",
    "memorize": [
      "enable secret <password> sets the privileged EXEC (level 15) password and is hashed; enable password is plaintext and weaker. If both exist, the device uses enable secret and ignores enable password.",
      "username <name> secret <pw> creates a local account; with line config 'login local' the device checks the local username database (requires a valid username AND that user's password), whereas plain 'login' uses only the line password.",
      "service password-encryption applies weak Cisco type 7 (reversible Vigenere) encryption to plaintext line/enable passwords in the config; it does NOT change existing type 5/8/9 hashes.",
      "VTY lines are commonly configured as 'line vty 0 4' (5 simultaneous Telnet/SSH sessions); console is 'line con 0'; aux is 'line aux 0'. (IOS supports more than 5 VTY lines, e.g. 0 15.)",
      "Hash type IDs in the config: type 0 = cleartext, type 7 = Cisco weak/reversible, type 5 = MD5, type 8 = PBKDF2-SHA256, type 9 = scrypt. 'enable secret' defaults to type 5 (MD5) on older IOS; 'enable algorithm-type scrypt secret' produces type 9.",
      "exec-timeout <min> <sec> auto-logs out an idle line; 'exec-timeout 0 0' disables the timeout (line never times out).",
      "'login local' on VTY requires at least one local username to exist in the database, or you can lock yourself out of remote access."
    ],
    "understand": [
      "Authentication is configured per line (con 0, vty 0 4, aux 0): each line independently decides whether it checks the line password ('login'), the local user database ('login local'), or AAA.",
      "enable secret protects elevation to privileged EXEC mode, while line passwords / 'login local' protect initial entry into the device; they are two separate gates.",
      "service password-encryption is obfuscation for shoulder-surfing only; real password security comes from strong hashes (secret = type 5/8/9), so prefer 'secret' over 'password' everywhere.",
      "'login local' ties line access to the username database, which is the same local-user foundation that SSH and local AAA build on."
    ],
    "trap": "enable secret vs enable password: candidates assume 'enable password' is used, but when BOTH are configured the device ALWAYS uses enable secret (the stronger hash) and ignores enable password entirely.",
    "visuals": []
  },
  "5.4": {
    "core": "Strong password policy means enforcing length and complexity, managing passwords over their lifecycle (expiration, history, lockout), and replacing or augmenting passwords with MFA, digital certificates, or biometrics.",
    "why": "Passwords alone are weak and reused, so policy plus stronger alternatives stop unauthorized access from guessing, cracking, and credential theft.",
    "memorize": [
      "MFA = at least two of three factors: something you KNOW (password/PIN), something you HAVE (token, phone, smart card), something you ARE (biometric).",
      "Complexity = mix of uppercase, lowercase, numbers, and special characters plus a minimum length.",
      "Management elements: password expiration (max age), password history (no reuse of recent passwords), and account lockout after failed attempts.",
      "Certificates use public/private key pairs issued by a Certificate Authority (CA) as part of a PKI to authenticate without a shared password.",
      "Biometrics authenticate using physical traits (fingerprint, face, retina/iris, voice).",
      "Cisco IOS password storage: 'enable secret' historically uses Type 5 (MD5); 'service password-encryption' uses weak reversible Type 7; stronger algorithms are Type 8 (PBKDF2-SHA256) and Type 9 (scrypt)."
    ],
    "understand": [
      "MFA is strong because an attacker must defeat factors of different types; two passwords is still single-factor, not MFA.",
      "Password alternatives reduce reliance on memorized secrets: certificates and biometrics can replace or supplement a password.",
      "Management controls (expiration, history, lockout) limit the window and value of a compromised or guessed password.",
      "Centralized authentication (AAA with RADIUS/TACACS+) lets one policy enforce these rules across many devices."
    ],
    "trap": "Two factors of the SAME type is NOT MFA: a password plus a security question (both 'something you know') is single-factor; true MFA must combine different categories (know/have/are).",
    "visuals": []
  },
  "5.5": {
    "core": "IPsec is a framework that builds encrypted tunnels: site-to-site joins two networks gateway-to-gateway, while remote-access connects a single client into the corporate network.",
    "why": "Data sent across the public internet is plaintext and exposed; IPsec adds confidentiality, integrity, and authentication so private traffic can safely cross an untrusted WAN.",
    "memorize": [
      "Site-to-site VPN = gateway-to-gateway (router/firewall on each end); remote-access VPN = individual host/client to a gateway",
      "IPsec is a framework, not a single protocol; two core protocols: AH (Authentication Header, IP protocol 51) and ESP (Encapsulating Security Payload, IP protocol 50)",
      "ESP provides encryption + authentication + integrity; AH provides authentication/integrity only (NO encryption) and is rarely used",
      "IKE (Internet Key Exchange) negotiates the tunnel over UDP port 500; NAT-Traversal (NAT-T) uses UDP port 4500",
      "IKE has two phases: Phase 1 builds a secure ISAKMP/IKE management tunnel; Phase 2 negotiates the IPsec SAs for actual data",
      "Five IPsec security pillars: Confidentiality (encryption: DES/3DES/AES), Integrity (hashing: MD5/SHA), Authentication (PSK or RSA/certs), Anti-replay, and key exchange via Diffie-Hellman (DH)",
      "Tunnel mode (encrypts entire original packet, used site-to-site) vs Transport mode (encrypts payload only)"
    ],
    "understand": [
      "Site-to-site is always-on and transparent to end users (hosts do not run VPN software); the gateways handle encryption so the tunnel looks like one continuous private network",
      "Remote-access fits roaming/teleworker users; modern designs favor SSL/TLS VPNs (clientless via browser or lightweight client) over legacy IPsec clients because they traverse NAT/firewalls more easily",
      "Diffie-Hellman lets both peers derive a shared secret key over an insecure channel without ever transmitting the key itself",
      "IPsec only protects unicast IP traffic; to carry multicast or routing protocols you wrap GRE inside IPsec (GRE over IPsec)"
    ],
    "trap": "Confusing the two protocols: ESP (IP protocol 50) is the one that encrypts; AH (IP protocol 51) only authenticates and provides NO confidentiality. Exam stems that demand encryption/confidentiality must point to ESP, and watch the protocol numbers (50 vs 51) being deliberately swapped.",
    "visuals": [
      {
        "id": "ipsec-vpn",
        "anim": "cascade flow",
        "caption": "Cascade reveals each peer and security association, then flow animates the dashed encrypted tunnel carrying protected packets across the public internet, illustrating the gateway-to-gateway path the exam tests for site-to-site IPsec."
      }
    ]
  },
  "5.6": {
    "core": "An ACL is an ordered top-down list of permit/deny rules that filters packets by matching addresses, protocols, and ports, with an invisible implicit deny any at the end.",
    "why": "It controls which traffic is allowed through an interface, providing basic packet filtering and traffic security without a dedicated firewall.",
    "memorize": [
      "Standard ACL number range: 1-99 and 1300-1999 (matches SOURCE IP only)",
      "Extended ACL number range: 100-199 and 2000-2699 (matches source+dest IP, protocol, and ports)",
      "Wildcard mask is the inverse of a subnet mask: 0 = must match, 1 = ignore (e.g. /24 = 0.0.0.255)",
      "Keyword 'host x.x.x.x' = wildcard 0.0.0.0; keyword 'any' = 0.0.0.0 255.255.255.255",
      "Place STANDARD ACLs close to the DESTINATION; place EXTENDED ACLs close to the SOURCE",
      "Apply to an interface with 'ip access-group {number|name} {in|out}'; verify with 'show access-lists' and 'show ip interface'",
      "Every ACL ends with an implicit 'deny any' that drops all unmatched traffic"
    ],
    "understand": [
      "ACLs are processed top-down and stop at the first match, so the order of statements is critical (most specific rules first).",
      "Only ONE ACL is allowed per interface, per protocol, per direction (one inbound and one outbound max).",
      "Named ACLs allow editing individual lines by sequence number; numbered ACLs traditionally must be removed and recreated to reorder (though modern IOS also supports sequence numbers on numbered ACLs).",
      "An ACL with only deny statements blocks ALL traffic because the implicit deny any catches everything not explicitly permitted."
    ],
    "trap": "Placement direction is reversed by test-takers: standard ACLs go near the DESTINATION (they only know source IP, so placing near source over-blocks legitimate traffic), while extended ACLs go near the SOURCE to drop unwanted traffic early and save bandwidth.",
    "visuals": [
      {
        "id": "acl-processing-flow",
        "anim": "cascade pulse",
        "caption": "Cascade reveals each rule being tested top-down until the first match, and pulse highlights the implicit deny any that the exam loves to hide at the bottom."
      },
      {
        "id": "wildcard-masks",
        "anim": "cascade pulse",
        "caption": "Cascade builds the inverse-mask bit pattern step by step while pulse emphasizes the 0=match / 1=ignore labels the exam tests in subnet-range questions."
      }
    ]
  },
  "5.7": {
    "core": "DHCP snooping builds a trusted-port binding table that DAI and IP Source Guard then use to drop spoofed ARP and IP traffic, while port security caps and pins MAC addresses on an access port.",
    "why": "Stops Layer 2 attacks: rogue DHCP servers, ARP poisoning man-in-the-middle, and MAC flooding of the CAM table.",
    "memorize": [
      "Port security default max MAC = 1; default violation mode = shutdown (err-disabled), with restrict and protect as the other two modes.",
      "Only shutdown and restrict generate log/SNMP messages and increment the violation counter; protect silently drops.",
      "Sticky MAC command: switchport port-security mac-address sticky (dynamically learns then saves to running-config).",
      "DHCP snooping treats ALL ports as untrusted by default; on an untrusted port it drops DHCP server-sourced messages (OFFER, ACK, NAK) and any client message whose MAC does not match the binding entry, so you must trust the port toward the real DHCP server.",
      "DHCP snooping trust set with: ip dhcp snooping trust (on the trusted interface); enabled globally with ip dhcp snooping plus per-VLAN ip dhcp snooping vlan <id>.",
      "DAI requires the DHCP snooping binding table and is enabled per-VLAN with ip arp inspection vlan <id>; ports facing the DHCP server/uplink must be set ip arp inspection trust.",
      "Recover an err-disabled port: shutdown then no shutdown, or configure errdisable recovery cause psecure-violation."
    ],
    "understand": [
      "DHCP snooping is the foundation: DAI and IP Source Guard both consult its binding table (MAC, IP, VLAN, port, lease), so DHCP snooping must be enabled first.",
      "Trusted vs untrusted is the core model for both DHCP snooping and DAI: trusted ports point toward legitimate servers/uplinks and pass everything; untrusted (access) ports are inspected.",
      "Port security operates on MAC addresses on a single access port (Layer 2 identity), whereas DAI validates ARP IP-to-MAC mappings and DHCP snooping validates DHCP message direction.",
      "A violation only happens in port security when a NEW MAC appears beyond the max on a secured port, not from normal traffic of an already-learned MAC."
    ],
    "trap": "Default port-security violation mode is shutdown (not restrict or protect), and the default max MAC count is 1, so plugging a hub or a second device into a freshly secured port instantly err-disables it; also remember DAI silently fails if DHCP snooping is not enabled first.",
    "visuals": [
      {
        "id": "switch-port-security",
        "anim": "cascade",
        "caption": "Stagger-reveal the secured access port, then show how a second MAC trips the default shutdown violation, the exact scenario the exam tests."
      },
      {
        "id": "dhcp-snooping-dai",
        "anim": "cascade",
        "caption": "Reveal the trusted uplink versus untrusted access ports in sequence, reinforcing that DHCP snooping must be enabled before DAI works."
      }
    ]
  },
  "5.8": {
    "core": "AAA is a three-step security framework where Authentication proves who you are, Authorization decides what you may do, and Accounting records what you did.",
    "why": "Centralizes user access control so devices do not rely on locally configured passwords for every login.",
    "memorize": [
      "RADIUS: open standard (IETF RFC 2865), runs over UDP, auth/accounting ports 1812/1813 (legacy 1645/1646), encrypts ONLY the password",
      "TACACS+: Cisco proprietary, runs over TCP port 49, encrypts the ENTIRE packet body",
      "RADIUS combines authentication and authorization into one process; TACACS+ separates all three (A, A, A) into independent functions",
      "802.1X port-based access control uses three roles: supplicant (client), authenticator (switch), authentication server (RADIUS/ISE)",
      "802.1X carries credentials in EAP over LAN (EAPOL) between supplicant and authenticator, then RADIUS from authenticator to server",
      "TACACS+ is preferred for device administration (granular command authorization); RADIUS is preferred for network access (802.1X, wireless)"
    ],
    "understand": [
      "The three A's are sequential and distinct: Authentication (identity) happens first, then Authorization (permissions), and Accounting (audit log) runs throughout the session",
      "AAA can authenticate against a local database or an external server; external servers (ISE) scale across many devices with one set of credentials",
      "In 802.1X the switch port stays blocked to all traffic except EAPOL until the authentication server approves the client",
      "RADIUS vs TACACS+ choice is driven by use case: TACACS+ granular command control for admin sessions, RADIUS for end-user network/Wi-Fi access"
    ],
    "trap": "Confusing the transport and encryption: RADIUS = UDP and encrypts only the password, while TACACS+ = TCP/49 and encrypts the entire payload (and remember RADIUS merges authentication+authorization, TACACS+ separates them).",
    "visuals": [
      {
        "id": "aaa-framework",
        "anim": "cascade pulse",
        "caption": "Stagger-reveal the three pillars (Authentication, Authorization, Accounting) and pulse each bold label so you internalize the exact order the exam asks you to compare."
      },
      {
        "id": "dot1x-radius",
        "anim": "cascade",
        "caption": "Cascade the supplicant to authenticator to authentication-server chain to lock in 802.1X's three roles and where EAPOL hands off to RADIUS, a common exam scenario."
      }
    ]
  },
  "5.9": {
    "core": "WPA, WPA2, and WPA3 are the Wi-Fi Alliance security certifications that progressively replaced weak WEP, with WPA2 (AES/CCMP) as today's baseline and WPA3 as the strongest.",
    "why": "Original WEP encryption was trivially crackable, so the industry needed stronger, certified standards to authenticate clients and encrypt over-the-air wireless traffic.",
    "memorize": [
      "WPA = TKIP encryption (RC4-based), interim fix for WEP, introduced ~2003.",
      "WPA2 = AES encryption via CCMP, based on the IEEE 802.11i standard, mandatory for Wi-Fi certification since 2006.",
      "WPA3 = AES with GCMP, introduced 2018, uses SAE (Simultaneous Authentication of Equals) to replace the WPA2-Personal 4-way-handshake PSK exchange.",
      "Two authentication modes for all WPA versions: Personal (PSK, pre-shared key) and Enterprise (802.1X/EAP with a RADIUS server).",
      "802.1X Enterprise uses RADIUS (UDP 1812 authentication, 1813 accounting) as the AAA server.",
      "WPA3-Personal SAE provides forward secrecy and resists offline dictionary attacks; WPA2-PSK is vulnerable to them."
    ],
    "understand": [
      "The progression is WEP -> WPA -> WPA2 -> WPA3, each strengthening encryption and authentication; WPA2 remains the real-world baseline you will configure most often.",
      "Personal mode uses one shared password for everyone (home/small office); Enterprise mode authenticates each user individually against RADIUS via 802.1X/EAP (large orgs).",
      "WPA3's SAE handshake fixes WPA2's biggest weakness: capturing the 4-way handshake to brute-force the PSK offline.",
      "On Cisco WLCs you select the Layer 2 security policy (WPA2/WPA3) and the AKM (PSK vs 802.1X) when building a WLAN."
    ],
    "trap": "Matching encryption to the right version: WPA = TKIP, WPA2 = AES/CCMP, WPA3 = AES/GCMP with SAE. The exam loves swapping these (e.g., claiming WPA2 uses TKIP or that WPA3 still uses the 4-way handshake instead of SAE).",
    "visuals": [
      {
        "id": "wpa2-wpa3",
        "anim": "cascade pulse",
        "caption": "Cascade-reveals the WPA2-versus-WPA3 feature rows while pulsing the four bold labels (AES/CCMP, GCMP, 4-way handshake, SAE) so you lock in exactly which encryption and handshake belong to each version, the core distinction the exam tests."
      }
    ]
  },
  "5.10": {
    "core": "In the WLC GUI you build a WLAN by mapping an SSID to a dynamic interface/VLAN, then secure it under Layer 2 security as WPA2 with PSK authentication and AES (CCMP) encryption.",
    "why": "It lets a network admin stand up a secure wireless network for clients without a RADIUS server, using a single shared password instead of per-user credentials.",
    "memorize": [
      "WPA2 uses AES-CCMP for encryption (not TKIP, which is the legacy WPA1 cipher).",
      "PSK authentication = a pre-shared key (shared password) entered identically on the WLC WLAN and every client; the alternative is 802.1X, which requires a RADIUS server.",
      "WPA2 is defined by the IEEE 802.11i amendment.",
      "A WLC WLAN ties three things together: SSID (Profile Name), an interface/VLAN, and the Layer 2 security policy.",
      "The AireOS WLC GUI is reached over HTTPS (TCP 443) on the management interface; WLAN security is set under WLANs > WLAN > Security > Layer 2 tab.",
      "The WPA2 pre-shared key is 8 to 63 ASCII characters (or 64 hex digits).",
      "RADIUS (used only by 802.1X/Enterprise, NOT by PSK) uses UDP 1812 for authentication and UDP 1813 for accounting."
    ],
    "understand": [
      "WPA2-Personal (PSK) needs no authentication server; WPA2-Enterprise (802.1X/EAP) does, pointing the WLAN to a RADIUS/AAA server. The exam distinguishes these by whether a RADIUS/AAA server is configured.",
      "Order of GUI steps: create the WLAN (Profile Name + SSID), assign it to an interface/VLAN under General, set Layer 2 Security to WPA2 + PSK and enter the key under Security, then Enable the WLAN and Apply.",
      "The WLAN maps wireless clients onto a wired VLAN through the dynamic interface, so the interface/VLAN choice determines the client subnet.",
      "WPA2-PSK provides confidentiality through AES-CCMP; the PSK seeds the 4-way handshake that derives per-session keys, so the actual key material is never sent over the air."
    ],
    "trap": "Selecting TKIP (or leaving WPA/TKIP enabled) when the question specifies WPA2: WPA2 mandates AES/CCMP. The second half of the trap is conflating PSK (no server, one shared password) with Enterprise/802.1X (RADIUS, per-user logins): choosing PSK does NOT require a RADIUS server, whereas 802.1X does.",
    "visuals": []
  },
  "6.1": {
    "core": "Network automation replaces manual box-by-box CLI configuration with programmatic, centralized, intent-driven control that is faster, more consistent, and less error-prone.",
    "why": "Manual per-device CLI config does not scale and introduces human error, configuration drift, and slow change deployment across large networks.",
    "memorize": [
      "Traditional (manual) management = per-device CLI; automation = centralized, programmatic config pushed to many devices at once.",
      "Automation benefits: consistency (no config drift), speed/faster deployment, fewer human errors, reduced operating cost, scalability.",
      "Controller-based networking uses a central controller (SDN controller) that separates the control plane from the data plane and programs devices via southbound APIs.",
      "Common data formats CCNA tests: JSON, XML, YAML (data serialization / structured data).",
      "REST APIs use HTTP verbs GET, POST, PUT, PATCH, DELETE and run over HTTPS (TCP 443).",
      "Configuration management tools: Ansible (agentless, push, uses YAML playbooks, TCP 22/SSH), Puppet (agent-based, pull, master TCP 8140), Chef (agent-based, pull, uses 'recipes'/'cookbooks', master TCP 443/10002).",
      "Northbound API = controller to apps/scripts (often REST); Southbound API = controller to network devices (e.g., OpenFlow, NETCONF)."
    ],
    "understand": [
      "Automation shifts the operating model from imperative (type every command) toward declarative/intent-based (define the desired end state, the system makes it so).",
      "A central controller gives a single source of truth and a programmatic point of control, which is what enables consistency at scale and eliminates drift.",
      "Impact on IT roles: network engineers move toward scripting, APIs, and data formats rather than only manual CLI, but troubleshooting and design fundamentals still matter.",
      "Automation reduces mean-time-to-deploy and human error, but a bad change now propagates to every device instantly, so testing and version control become critical."
    ],
    "trap": "Mixing up Northbound vs Southbound APIs: Northbound faces the applications/scripts (REST, \"up\" to the user), Southbound faces the network devices (NETCONF/OpenFlow, \"down\" to the gear). The exam flips these to bait you, and also tests that Ansible is agentless while Puppet/Chef are agent-based.",
    "visuals": []
  },
  "6.2": {
    "core": "Traditional networking distributes the control plane into every device (each box runs its own control plane and is configured individually via CLI), while controller-based (SDN) networking centralizes the control plane in a controller that programs the data plane of all devices through southbound APIs.",
    "why": "Configuring and changing networks box-by-box via CLI does not scale; centralizing control gives one programmable point of policy and automation.",
    "memorize": [
      "Three network planes: management plane (admin access: SSH/Telnet/SNMP), control plane (builds routing/MAC/STP/ARP tables), data plane (forwards/switches packets).",
      "SDN controller talks DOWN to devices over the southbound interface (SBI); examples: OpenFlow, NETCONF, RESTCONF, OpFlex.",
      "SDN controller talks UP to apps/scripts over the northbound interface (NBI); typically a REST API (HTTP) returning JSON/XML.",
      "Cisco DNA Center (Catalyst Center) is the controller for Cisco SDA (Software-Defined Access) enterprise campus.",
      "Cisco APIC-EM and the APIC (in ACI) are Cisco SDN controllers; ACI is the data-center SDN solution.",
      "NETCONF uses TCP port 830 and encodes data in XML; RESTCONF runs over HTTPS (port 443) and uses JSON or XML.",
      "Controller-based networking separates the control plane from the data plane and centralizes the control plane in the controller."
    ],
    "understand": [
      "In traditional networks every device runs its own independent control plane, so each box must be configured individually via CLI; in SDN the control plane is pulled out of the devices and centralized in the controller, leaving devices to just forward (data plane).",
      "Northbound = toward applications/humans (REST API); Southbound = toward the network devices (OpenFlow/NETCONF/etc). Remember the controller sits in the middle.",
      "SDN enables network programmability and automation: apps make a single API call to the controller, and the controller pushes consistent config to many devices at once.",
      "Cisco DNA Center adds intent-based networking: you define intent (policy) and the controller translates it into device configuration, with assurance/telemetry feeding back."
    ],
    "trap": "Reversing northbound and southbound: the NORTHBOUND interface (REST API) faces applications/scripts ABOVE the controller, and the SOUTHBOUND interface (OpenFlow, NETCONF, RESTCONF) faces the network DEVICES BELOW it; exam stems flip these to trick you.",
    "visuals": []
  },
  "6.3": {
    "core": "In controller-based SDN, a central controller owns the control plane (the brains) while network devices keep only the data plane (forwarding), with the controller talking up to applications via northbound APIs and down to devices via southbound APIs.",
    "why": "Traditional networks force per-device CLI configuration with control logic scattered across every box; SDN centralizes that intelligence so the whole network is programmable from one place.",
    "memorize": [
      "Northbound APIs (NBI): controller talks UP to applications; REST-based (HTTP/HTTPS) is the typical example.",
      "Southbound APIs (SBI): controller talks DOWN to network devices; examples are OpenFlow, NETCONF, RESTCONF, and Cisco OpFlex.",
      "NETCONF uses XML data encoding and runs over SSH (TCP 830); RESTCONF uses HTTP/REST with XML or JSON.",
      "Control plane = decides where traffic goes (routing/path decisions); data plane (forwarding plane) = actually moves/forwards packets.",
      "Underlay = physical devices and IP connectivity; Overlay = virtual tunnels (e.g., VXLAN) built on top; Fabric = underlay + overlay combined.",
      "Cisco SDN controllers: Cisco DNA Center (Catalyst Center) for SD-Access, APIC for ACI data center, APIC-EM (legacy)."
    ],
    "understand": [
      "Centralizing the control plane on a controller gives a single point of programmability and a network-wide view, replacing box-by-box CLI configuration.",
      "Northbound (to apps) is usually REST/HTTPS and human-or-app friendly; Southbound (to devices) is for pushing forwarding state, so the direction of the API tells you who it serves.",
      "Overlay tunnels (VXLAN) carry user/tenant traffic over a simple, stable underlay; the fabric is the combination that makes the physical topology irrelevant to the logical network.",
      "Even in SDN the data plane stays on the devices; only the decision-making (control plane) moves to the controller in a fully centralized model."
    ],
    "trap": "Reversing the API directions: northbound faces APPLICATIONS (up), southbound faces NETWORK DEVICES (down). The exam loves to swap these and put OpenFlow/NETCONF (southbound) in a northbound answer or REST in a southbound answer.",
    "visuals": [
      {
        "id": "sdn-architecture",
        "anim": "cascade pulse",
        "caption": "Cascade-reveals the application, controller, and device layers and pulses the northbound vs southbound API labels so you lock in which direction each API faces, the exact swap the exam tests."
      }
    ]
  },
  "6.4": {
    "core": "AI and machine learning let networks shift from reactive manual operations to data-driven automation, where predictive AI forecasts problems and generative AI produces config, summaries, and answers from trained models.",
    "why": "Modern networks generate more telemetry than humans can analyze in time, so AI/ML detects anomalies, predicts failures, and automates remediation faster and at greater scale than manual operations.",
    "memorize": [
      "Predictive AI = analyzes historical/real-time data to FORECAST future events (failures, traffic, anomalies, capacity).",
      "Generative AI = CREATES new content/output (configs, summaries, troubleshooting suggestions) using models like LLMs.",
      "Machine Learning (ML) is a SUBSET of AI: systems learn patterns from data without being explicitly programmed.",
      "Supervised learning = trained on LABELED data; Unsupervised learning = finds patterns in UNLABELED data.",
      "AIOps = applying AI/ML to IT/network operations for automation, anomaly detection, and root-cause analysis.",
      "AI/ML in networking relies on TELEMETRY (large volumes of network data) as the input for training and inference.",
      "Cisco examples in CCNA context: Catalyst Center (formerly DNA Center) and Meraki use AI/ML for assurance and analytics."
    ],
    "understand": [
      "The hierarchy is AI > ML > (deep learning); ML is one way to achieve AI, and all generative/predictive systems here are forms of AI.",
      "Predictive answers 'what will happen / what is abnormal' (forecasting, anomaly detection); generative answers 'create this for me' (config, summary, natural-language response).",
      "AI augments network operators (faster troubleshooting, proactive alerts), it does not fully replace human decision-making or design.",
      "Quality and quantity of training data directly determine accuracy; biased or insufficient data yields unreliable predictions or outputs."
    ],
    "trap": "Confusing the two types: PREDICTIVE AI forecasts/classifies existing outcomes (detect anomaly, predict failure), while GENERATIVE AI produces brand-new content (writes a config, drafts a summary). If the question says 'create/generate/produce' it is generative; if it says 'forecast/predict/detect/anomaly' it is predictive.",
    "visuals": []
  },
  "6.5": {
    "core": "A REST API exposes resources over HTTP, using verbs to act on them, status codes to report results, and JSON/XML to carry the data.",
    "why": "Lets software (controllers, scripts, apps) configure and query network devices programmatically instead of by manual CLI.",
    "memorize": [
      "CRUD maps to HTTP verbs: Create=POST, Read=GET, Update=PUT/PATCH, Delete=DELETE",
      "Success codes: 200 OK, 201 Created; client error 400/401/403/404; server error 500",
      "REST APIs run over HTTP/HTTPS (HTTPS = TCP 443, HTTP = TCP 80) and are stateless (each request is independent)",
      "Common data encodings: JSON (key:value pairs, {} objects, [] arrays) and XML; YAML also used in automation",
      "Authentication types: Basic Auth (username:password), Bearer token, API key, and OAuth",
      "REST is an architectural style, not a protocol; it uses a client-server model"
    ],
    "understand": [
      "Stateless means the server keeps no client session between calls, so every request must carry its own auth and context",
      "The same URI (resource) behaves differently depending on which HTTP verb hits it (GET reads it, DELETE removes it)",
      "Status code class signals outcome at a glance: 2xx success, 4xx your fault (client), 5xx server fault",
      "JSON is the dominant encoding because it is lightweight and human-readable; the API request also carries headers (Accept/Content-Type) and a body"
    ],
    "trap": "Mixing up the CRUD-to-verb mapping: PUT/PATCH is Update and POST is Create; the exam will swap them, and it will also test that 401 means Unauthorized (auth failed/missing) while 403 means Forbidden (authenticated but not allowed).",
    "visuals": [
      {
        "id": "rest-api-basics",
        "anim": "cascade pulse",
        "caption": "Cascade-reveals the client-request-to-server-response flow while pulsing the two bold labels (HTTP verb and JSON body), the exact pieces 6.5 expects you to name."
      }
    ]
  },
  "6.6": {
    "core": "Ansible and Terraform are automation tools that push consistent, repeatable configurations from a central control point. Ansible is agentless (connects over SSH) and is primarily configuration management, while Terraform is a declarative infrastructure provisioning tool that defines a desired end state.",
    "why": "Manual box-by-box CLI configuration is slow, error-prone, and drifts out of sync; automation tools push standardized config at scale and enforce a consistent state.",
    "memorize": [
      "Ansible is AGENTLESS: no software installed on managed devices; it connects over SSH (TCP port 22).",
      "Ansible uses a PUSH model: the control node pushes config out to devices.",
      "Ansible playbooks are written in YAML; an inventory file lists the managed hosts.",
      "Terraform is DECLARATIVE (you define the desired end state) and is focused on infrastructure provisioning; Ansible leans procedural/imperative.",
      "Terraform is written in HCL (HashiCorp Configuration Language).",
      "Puppet and Chef (the other classic tools) are AGENT-BASED and use a PULL model; Puppet/Chef config is written in Ruby-based DSLs.",
      "CCNA objective 6.6 names exactly two tools: Ansible and Terraform."
    ],
    "understand": [
      "Configuration management tools enforce a desired state so every device ends up consistent, eliminating manual drift across many devices.",
      "Push (Ansible) means the controller initiates and sends config; Pull (Puppet/Chef) means the device's agent fetches config from a master on a schedule.",
      "Agent-based means software runs on the managed device; agentless (Ansible) means the controller reaches the device over an existing protocol (SSH) with nothing extra installed, which lowers overhead on network gear.",
      "Declarative means you describe the end result and the tool computes the steps to reach it; imperative means you script each step explicitly."
    ],
    "trap": "Confusing push vs pull and agent vs agentless. The classic exam trap is labeling Puppet/Chef as agentless or Ansible as agent-based. Remember: Ansible = agentless + push over SSH; Puppet/Chef = agent-based + pull. Do NOT lump Terraform in as 'agentless'; the exam-relevant axis for Terraform is declarative provisioning, not the agent question.",
    "visuals": [
      {
        "id": "config-management-tools",
        "anim": "cascade",
        "caption": "Cascade reveals each tool's traits one row at a time: Ansible (agentless, push, SSH, YAML) and Terraform (declarative, HCL, provisioning), with Puppet/Chef (agent, pull) shown for contrast."
      }
    ]
  },
  "6.7": {
    "core": "JSON encodes structured data as key:value pairs grouped in objects {} or ordered values in arrays [], using strict syntax that machines, APIs, and controllers parse predictably.",
    "why": "It gives controllers, REST APIs, and automation tools a single lightweight, human-readable format to exchange device data instead of unstructured CLI-only text.",
    "memorize": [
      "JSON = JavaScript Object Notation; lightweight, text-based, human-readable data-interchange format",
      "Object = unordered set of key:value pairs enclosed in curly braces {}",
      "Array = ordered list of values enclosed in square brackets [] (values separated by commas)",
      "Keys are strings in double quotes; key and value separated by a colon (:)",
      "Pairs/elements separated by commas; NO trailing comma after the last element",
      "Value data types: string (double quotes), number (no quotes), boolean (true/false, lowercase, unquoted), null, object {}, array []",
      "Whitespace between tokens is insignificant/ignored; JSON is used by REST APIs and controllers like Cisco DNA Center / Catalyst Center"
    ],
    "understand": [
      "Data nests: a value can itself be an object or an array, so objects hold arrays that hold objects, building a hierarchy.",
      "Tell containers apart by bracket: {} is an object (named keys), [] is an array (positional, comma-separated values).",
      "JSON is one of several data formats (vs XML and YAML); it is the dominant format for REST API request and response bodies.",
      "Quoting decides the type: \"5\" is a string, 5 is a number; true is a boolean, \"true\" is a string."
    ],
    "trap": "Confusing {} (object) with [] (array), or thinking the last pair needs a trailing comma. A comma after the final element, single quotes instead of double quotes on keys, or unquoted string values all make the JSON invalid. true / false / null must be lowercase and unquoted; quote them and they become strings, not booleans/null.",
    "visuals": []
  }
};
