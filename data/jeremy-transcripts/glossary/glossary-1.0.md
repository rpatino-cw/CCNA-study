# Domain 1.0 — Network Fundamentals Glossary

Source: Jeremy's IT Lab — Free CCNA v1.1 200-301 Complete Course
Scope: 10 sub-objectives, 37 videos

## 1.1 — Explain the role and function of network components

### Technologies & Devices
- **Router** — device that forwards traffic between separate networks (between LANs, or to the Internet); has few interfaces compared to a switch. *(Day 1)*
- **Switch** — Layer 2 device with many interfaces used to connect end hosts within a single LAN. *(Day 1)*
- **Firewall** — network security appliance that monitors and controls traffic entering/exiting a network based on configured rules; can be placed inside or outside the router. *(Day 1)*
- **Next-generation firewall** — firewall that combines traditional rule-based filtering with advanced features like IPS. *(Day 1)*
- **Host-based firewall** — software firewall running on an end host (e.g., a PC) rather than as a hardware appliance. *(Day 1)*
- **Server** — device that provides functions or services to clients. *(Day 1)*
- **Client** — device that accesses a service made available by a server. *(Day 1)*
- **End host / endpoint** — general term for a device (client or server) that originates or consumes network traffic. *(Day 1)*
- **Hub** — legacy Layer 1 repeater; floods all frames it receives out every other port and forces half-duplex. *(Day 6)*
- **Network Interface Card (NIC)** — hardware in a device that connects to the network. *(Day 1)*
- **Packet Tracer** — Cisco's free network simulator used to build and configure practice labs. *(Day 1 Lab)*
- **ISR (Integrated Services Router)** — Cisco line of enterprise routers (e.g., ISR 900, 2911, 4000). *(Day 1)*
- **Catalyst** — Cisco line of enterprise switches (e.g., 2960, 3650, 9200). *(Day 1)*
- **ASA (Adaptive Security Appliance)** — Cisco's classic firewall product line (e.g., ASA 5500-X, 5505). *(Day 1)*

### Key Vocabulary
- **Network** — a digital communications network which allows nodes to share resources. *(Day 1)*
- **Node** — any device connected to a network. *(Day 1)*
- **LAN (Local Area Network)** — a network contained within a relatively small area, like an office floor or home; switches connect and expand a LAN, routers separate LANs. *(Day 1)*

### Acronyms
- **LAN** — Local Area Network. *(Day 1)*
- **IPS** — Intrusion Prevention System. *(Day 1)*
- **NIC** — Network Interface Card. *(Day 1)*
- **CLI** — Command-Line Interface. *(Day 1 Lab)*

---

## 1.2 — Describe characteristics of network topology architectures

### Technologies & Devices
- **Access layer** — layer that end hosts connect to; typically performs QoS marking, port security, DAI, DHCP snooping; switchports may be PoE-enabled. *(Day 52)*
- **Distribution layer** — aggregates access-layer connections; border between Layer 2 and Layer 3; runs OSPF and spanning tree; also called aggregation layer. *(Day 52)*
- **Core layer** — fast-transport backbone used in large LANs to connect distribution layers; all Layer 3, no spanning tree; focus is speed. *(Day 52)*
- **Spine switch** — data-center switch that every leaf connects to; spine switches do not connect to each other. *(Day 52)*
- **Leaf switch** — data-center access switch that connects end hosts (servers); every leaf connects to every spine. *(Day 52)*
- **Home router / wireless router** — single SOHO device that combines routing, switching, firewall, wireless access, and often a modem. *(Day 52)*
- **Multilayer switch** — switch with Layer 3 capability, used at the distribution layer to host SVIs as default gateways. *(Day 52)*
- **GRE tunnel** — virtual interface that encapsulates original packets in a GRE header + new IP header to create a point-to-point virtual link. *(Day 53 Lab)*
- **Modem** — modulator-demodulator; converts data into a format suitable for phone or cable lines. *(Day 53)*

### Protocols & Standards
- **MPLS (Multi Protocol Label Switching)** — service-provider WAN technology that forwards on labels inserted between Layer 2 and Layer 3 headers (sometimes called "Layer 2.5"). *(Day 53)*
- **Layer 3 MPLS VPN** — MPLS VPN where CE and PE routers form routing-protocol peerings (e.g., OSPF). *(Day 53)*
- **Layer 2 MPLS VPN** — MPLS VPN where the provider network is transparent; CE routers appear directly connected and can peer with each other. *(Day 53)*
- **Leased line** — dedicated physical WAN link between two sites, typically using serial cabling with PPP or HDLC. *(Day 53)*
- **PPP / HDLC** — Layer 2 encapsulations used on serial leased-line WAN links. *(Day 53)*
- **DSL (Digital Subscriber Line)** — Internet access over existing phone lines. *(Day 53)*
- **Cable Internet / CATV** — Internet access over cable-television lines. *(Day 53)*
- **Site-to-site VPN** — VPN tunnel between two devices (typically routers/firewalls) that connects two sites over the Internet; typically uses IPsec. *(Day 53)*
- **Remote-access VPN** — VPN from an end device (laptop/phone) into a company network; typically uses TLS (e.g., Cisco AnyConnect). *(Day 53)*
- **IPsec** — secure VPN protocol that encrypts the original packet and encapsulates it with a new VPN and IP header. *(Day 53)*
- **TLS (Transport Layer Security)** — security protocol used by HTTPS and remote-access VPNs; formerly known as SSL. *(Day 53)*
- **GRE (Generic Routing Encapsulation)** — tunneling protocol that can carry multicast/broadcast but does not encrypt; often combined with IPsec. *(Day 53)*
- **GRE over IPsec** — combination that provides GRE's flexibility (multicast) with IPsec's encryption. *(Day 53)*
- **DMVPN (Dynamic Multipoint VPN)** — Cisco solution that lets routers dynamically form a full mesh of IPsec tunnels from hub-and-spoke configuration. *(Day 53)*
- **HSRP / VRRP** — first-hop redundancy protocols that provide a virtual IP for default gateway redundancy. *(Day 52)*

### Acronyms
- **SOHO** — Small Office / Home Office network. *(Day 52)*
- **Clos architecture** — alternate name for spine-leaf. *(Day 52)*
- **CE router** — Customer Edge router; the customer-side router in MPLS. *(Day 53)*
- **PE router** — Provider Edge router; provider-side router that adds/removes MPLS labels. *(Day 53)*
- **P router** — Provider core router; MPLS router that doesn't touch customer routers. *(Day 53)*
- **ISP** — Internet Service Provider. *(Day 53)*
- **VPN** — Virtual Private Network. *(Day 53)*
- **WAN** — Wide Area Network. *(Day 53)*
- **MTU** — Maximum Transmission Unit. *(Day 10)*

### Commands & Syntax
- `interface tunnel 0` — create a virtual tunnel interface. *(Day 53 Lab)*
- `tunnel source <int>` — specify the physical source interface of the GRE tunnel. *(Day 53 Lab)*
- `tunnel destination <ip>` — specify the IP address of the far-end tunnel endpoint. *(Day 53 Lab)*

### Key Vocabulary
- **Star topology** — many devices connect to a single central device. *(Day 52)*
- **Full mesh** — every device is directly connected to every other device. *(Day 52)*
- **Partial mesh** — some devices are connected to every other device, but not all. *(Day 52)*
- **Hybrid topology** — combination of star, full-mesh, and partial-mesh patterns. *(Day 52)*
- **Hub-and-spoke** — WAN-oriented star topology with one central "hub" site and multiple "spoke" sites. *(Day 53)*
- **Two-tier / collapsed core** — LAN design with access + distribution layers only (core collapsed into distribution). *(Day 52)*
- **Three-tier** — LAN design with access, distribution, and core layers. *(Day 52)*
- **North-south traffic** — traffic moving between access and core/Internet direction. *(Day 52)*
- **East-west traffic** — server-to-server traffic within the same part of the network. *(Day 52)*
- **Single homed / dual homed / multihomed / dual multihomed** — increasing levels of ISP redundancy (1 conn to 1 ISP, 2 to 1, 1 to 2, 2 to 2). *(Day 53)*
- **Legacy** — old technology, no longer commonly used. *(Day 53)*

---

## 1.3 — Compare physical interface and cabling types

### Technologies & Devices
- **RJ-45 connector** — the 8-pin registered-jack connector used on copper Ethernet cables. *(Day 2)*
- **UTP (Unshielded Twisted Pair)** — copper Ethernet cable with 4 twisted pairs (8 wires); twist helps protect against EMI. *(Day 2)*
- **Straight-through cable** — UTP cable where pin 1 connects to pin 1 on the other end, etc.; used between different device types (PC-switch, router-switch). *(Day 2)*
- **Crossover cable** — UTP cable with pairs reversed end-to-end (1→3, 2→6); used between like devices (switch-switch, router-router). *(Day 2)*
- **Auto MDI-X** — feature that lets modern devices auto-detect and adjust transmit/receive pins, removing the need for crossover cables. *(Day 2)*
- **SFP (Small Form-factor Pluggable) transceiver** — module inserted into a switch/router interface to connect a fiber-optic cable. *(Day 2)*
- **Fiber-optic cable** — cable that transmits data as light over glass fibers; uses separate fibers for transmit and receive. *(Day 2)*
- **Multimode fiber** — fiber with a wider core that allows multiple light modes; shorter distance than single-mode; cheaper LED-based transmitters. *(Day 2)*
- **Single-mode fiber** — fiber with a narrow core and a single light mode from a laser-based transmitter; longer distances, more expensive. *(Day 2)*

### Protocols & Standards
- **Ethernet** — collection of network protocols and standards defined in IEEE 802.3. *(Day 2)*
- **IEEE 802.3** — standards body for Ethernet. *(Day 2)*
- **10BASE-T** — 10 Mbps Ethernet over twisted pair, 100 m max; 2 pairs used. *(Day 2)*
- **100BASE-T / Fast Ethernet** — 100 Mbps over UTP, 100 m max; 2 pairs. *(Day 2)*
- **1000BASE-T / Gigabit Ethernet** — 1 Gbps over UTP, 100 m max; uses all 4 pairs bidirectionally. *(Day 2)*
- **10GBASE-T** — 10 Gbps over UTP; uses all 4 pairs bidirectionally. *(Day 2)*
- **1000BASE-LX** — 1 Gbps fiber standard; up to 550 m multimode or 5 km single-mode. *(Day 2)*
- **10GBASE-SR** — 10 Gbps multimode fiber; up to 400 m. *(Day 2)*
- **10GBASE-LR** — 10 Gbps single-mode fiber; up to 10 km. *(Day 2)*
- **10GBASE-ER** — 10 Gbps single-mode fiber; up to 30 km. *(Day 2)*

### Acronyms
- **UTP** — Unshielded Twisted Pair. *(Day 2)*
- **EMI** — Electromagnetic Interference. *(Day 2)*
- **SFP** — Small Form-factor Pluggable. *(Day 2)*
- **RJ** — Registered Jack. *(Day 2)*
- **IEEE** — Institute of Electrical and Electronics Engineers. *(Day 2)*

### Key Vocabulary
- **Bit** — smallest unit of data; a 0 or 1. *(Day 2)*
- **Byte** — 8 bits. *(Day 2)*
- **Full-duplex** — device can send and receive data simultaneously on separate wire pairs without collisions. *(Day 2)*
- **Half-duplex** — device cannot send and receive at the same time; must wait. *(Day 6)*
- **Baseband** — signaling method referenced in 10BASE-T etc.; "base" portion of the standard name. *(Day 2)*

---

## 1.5 — Compare TCP to UDP

### Protocols & Standards
- **IP (Internet Protocol)** — primary Layer 3 protocol; versions 4 and 6 in current use. *(Day 3)*
- **TCP (Transmission Control Protocol)** — connection-oriented Layer 4 protocol providing reliable delivery, sequencing, flow control, and error recovery. *(Day 30)*
- **UDP (User Datagram Protocol)** — connectionless Layer 4 protocol; best-effort; no sequencing, ack, or flow control. *(Day 30)*
- **HTTP** — web-page protocol; TCP port 80. *(Day 30)*
- **HTTPS** — secure HTTP; TCP port 443. *(Day 30)*
- **FTP** — File Transfer Protocol; TCP ports 20 and 21. *(Day 30)*
- **SSH (Secure Shell)** — secure CLI access; TCP port 22. *(Day 30)*
- **Telnet** — plaintext CLI access; TCP port 23. *(Day 30)*
- **SMTP** — Simple Mail Transfer Protocol (sending email); TCP port 25. *(Day 30)*
- **POP3** — Post Office Protocol v3 (retrieving email); TCP port 110. *(Day 30)*
- **DHCP** — Dynamic Host Configuration Protocol; UDP ports 67 and 68. *(Day 30)*
- **TFTP** — Trivial File Transfer Protocol; UDP port 69; runs over UDP but adds its own reliability. *(Day 30)*
- **SNMP** — Simple Network Management Protocol; UDP ports 161 and 162. *(Day 30)*
- **Syslog** — system-logging protocol; UDP port 514. *(Day 30)*
- **DNS** — Domain Name System; usually UDP, uses TCP in some cases. *(Day 30)*
- **ICMP** — Internet Control Message Protocol; used by ping. *(Day 3)*

### Acronyms
- **PDU** — Protocol Data Unit. *(Day 3)*
- **L4PDU / L3PDU / L2PDU** — Layer 4, 3, 2 PDU (segment/datagram, packet, frame). *(Day 3)*
- **OSI** — Open Systems Interconnection (7-layer reference model). *(Day 3)*
- **ARPANET** — early US DoD-funded network, predecessor of the Internet. *(Day 3)*
- **NCP** — Network Control Program; pre-TCP/IP ARPANET protocol. *(Day 3)*
- **IETF** — Internet Engineering Task Force. *(Day 3)*
- **RFC** — Request for Comments; IETF-published standard document. *(Day 3)*
- **IANA** — Internet Assigned Numbers Authority. *(Day 30)*
- **MSS / Window size** — field in TCP header used for flow control (sliding window). *(Day 30)*

### Key Vocabulary
- **Layer 1 / Physical layer** — transmits bits as electrical, optical, or radio signals. *(Day 3)*
- **Layer 2 / Data Link layer / Local Network layer** — hop-to-hop delivery on a local network using MAC addresses; Ethernet and Wi-Fi. *(Day 3)*
- **Layer 3 / Network layer / Internet layer** — end-to-end delivery between hosts across networks using IP addresses and routers. *(Day 3)*
- **Layer 4 / Transport layer** — process-to-process communication using port numbers; TCP and UDP. *(Day 3)*
- **Layer 5 / Application layer** — defines how application processes format, send, and interpret data (HTTP, FTP, DNS, etc.). *(Day 3)*
- **Segment** — Layer 4 PDU when using TCP. *(Day 3)*
- **Datagram** — Layer 4 PDU when using UDP. *(Day 3)*
- **Packet** — Layer 3 PDU. *(Day 3)*
- **Frame** — Layer 2 PDU (what's actually sent on the wire). *(Day 3)*
- **Payload** — contents inside a PDU, not including that layer's header or trailer. *(Day 3)*
- **Encapsulation** — adding headers (and a Layer 2 trailer) as data moves down the stack. *(Day 3)*
- **Decapsulation** — removing headers as data moves up the stack on the receiving host. *(Day 3)*
- **Adjacent-layer interaction** — a layer uses services of the layer below and serves the layer above. *(Day 3)*
- **Same-layer interaction** — a layer communicates with the same layer on another device. *(Day 3)*
- **Port number** — 16-bit Layer 4 address identifying a process on a host. *(Day 30)*
- **Well-known ports** — 0–1023; used for major protocols. *(Day 30)*
- **Registered ports** — 1024–49151; registered with IANA but less strict. *(Day 30)*
- **Ephemeral / dynamic / private ports** — 49152–65535; hosts pick from this range for source ports. *(Day 30)*
- **Session** — exchange of data between two communicating devices. *(Day 30)*
- **Session multiplexing** — using port numbers so a host can track multiple simultaneous communication sessions. *(Day 30)*
- **Connection-oriented** — establishes a connection before sending data (TCP). *(Day 30)*
- **Connectionless** — sends data without establishing a connection first (UDP). *(Day 30)*
- **Three-way handshake** — SYN → SYN-ACK → ACK sequence that establishes a TCP connection. *(Day 30)*
- **Four-way handshake** — FIN / ACK / FIN / ACK sequence that terminates a TCP connection. *(Day 30)*
- **SYN / ACK / FIN** — TCP flag bits used to establish (SYN/ACK) and terminate (FIN/ACK) connections. *(Day 30)*
- **Sequence number** — TCP header field used to order bytes. *(Day 30)*
- **Acknowledgment number / forward acknowledgment** — TCP ack field contains the sequence number of the *next* segment expected. *(Day 30)*
- **Retransmission** — resending a TCP segment that wasn't acknowledged in time. *(Day 30)*
- **Sliding window** — TCP mechanism that dynamically grows the window size until a drop occurs, then shrinks and grows again. *(Day 30)*
- **Best-effort** — UDP's delivery model; no guarantee of delivery. *(Day 30)*
- **Checksum** — header field used to detect errors (both UDP and TCP have one for the encapsulated data; IP has one for the IP header). *(Day 10)*
- **Wireshark** — packet-capture program used to analyze network traffic. *(Day 30 Lab)*

---

## 1.6 — Configure and verify IPv4 addressing and subnetting

### Protocols & Standards
- **IPv4** — 32-bit Layer 3 address protocol; dominant in most networks today. *(Day 7)*

### Key Vocabulary
- **Dotted decimal** — human-readable IPv4 format (four decimal octets separated by dots). *(Day 7)*
- **Binary** — base-2 numbering used by computers; each IPv4 octet is 8 bits. *(Day 7)*
- **Hexadecimal** — base-16 numbering (0–9, A–F); each digit represents 4 bits. *(Day 5)*
- **Octet** — group of 8 bits; IPv4 addresses have 4 octets. *(Day 7)*
- **Network portion / host portion** — parts of an IPv4 address identified by the prefix length. *(Day 7)*
- **Prefix length** — number of leading bits that represent the network (e.g., /24). *(Day 7)*
- **Subnet mask / netmask** — dotted-decimal form of the prefix length (e.g., /24 = 255.255.255.0). *(Day 7)*
- **CIDR (Classless Inter-Domain Routing)** — replaces classful addressing; allows any prefix length (1993, IETF). *(Day 13)*
- **CIDR notation** — the `/prefix` style of writing prefix length. *(Day 13)*
- **Class A** — first octet 0–127, default /8; about 16.7M hosts per network. *(Day 7)*
- **Class B** — first octet 128–191, default /16; about 65K hosts per network. *(Day 7)*
- **Class C** — first octet 192–223, default /24; 256 addresses per network. *(Day 7)*
- **Class D** — 224–239; reserved for multicast. *(Day 7)*
- **Class E** — 240–255; reserved experimental. *(Day 7)*
- **Loopback range** — 127.0.0.0/8; used to test the local network stack; pings don't leave the device. *(Day 7)*
- **Network address** — first address of a subnet (host portion all 0s); not assignable to a host. *(Day 7)*
- **Broadcast address** — last address of a subnet (host portion all 1s); Layer 3 address used to reach all hosts on the local network; not assignable. *(Day 7)*
- **First / last usable address** — network address + 1, broadcast − 1. *(Day 8)*
- **Maximum hosts formula** — 2^N − 2, where N is the number of host bits. *(Day 8)*
- **Unicast** — one-to-one communication addressed to a single host. *(Day 5)*
- **Broadcast** — one-to-all communication (destination MAC all Fs, or the subnet broadcast IP). *(Day 5, Day 7)*
- **Subnetting** — dividing a larger network into smaller subnets by borrowing host bits. *(Day 13)*
- **Subnet** — a subdivided network created by extending the prefix length. *(Day 13)*
- **VLSM (Variable-Length Subnet Masks)** — using different prefix lengths in the same network to size subnets to need. *(Day 15)*
- **Borrowed bits** — host bits converted into subnet bits to create more subnets. *(Day 14)*
- **Point-to-point network** — network connecting exactly two devices (often a router-to-router link). *(Day 13)*

### IPv4 Header Fields (Day 10)
- **Version** — 4 bits; value 4 for IPv4 (0100 in binary). *(Day 10)*
- **IHL (Internet Header Length)** — 4 bits; header length in 4-byte increments (min 5 = 20 bytes, max 15 = 60 bytes). *(Day 10)*
- **DSCP (Differentiated Services Code Point)** — 6 bits; used for QoS traffic prioritization. *(Day 10)*
- **ECN (Explicit Congestion Notification)** — 2 bits; signals congestion without dropping packets. *(Day 10)*
- **Total Length** — 16 bits; length of the entire packet in bytes. *(Day 10)*
- **Identification** — 16 bits; used to group fragments of the same packet. *(Day 10)*
- **Flags (DF, MF)** — 3 bits; Don't-Fragment and More-Fragments bits used to control fragmentation. *(Day 10)*
- **Fragment Offset** — 13 bits; position of the fragment in the original packet. *(Day 10)*
- **TTL (Time To Live)** — 8 bits; decremented by each router; packet dropped at 0; default 64. *(Day 10)*
- **Protocol** — 8 bits; identifies encapsulated Layer 4 (1 = ICMP, 6 = TCP, 17 = UDP, 89 = OSPF). *(Day 10)*
- **Header Checksum** — 16 bits; detects errors in the IPv4 header only. *(Day 10)*
- **Source / Destination IP address** — 32 bits each. *(Day 10)*
- **Options** — variable, 0–40 bytes; rarely used. *(Day 10)*
- **MTU (Maximum Transmission Unit)** — typically 1500 bytes; packets larger than MTU are fragmented. *(Day 10)*

### Commands & Syntax
- `enable` / `en` — enter privileged exec mode. *(Day 8)*
- `configure terminal` / `conf t` — enter global config mode. *(Day 8)*
- `interface <name>` — enter interface config mode. *(Day 8)*
- `ip address <addr> <mask>` — configure an IPv4 address on an interface. *(Day 8)*
- `no shutdown` — enable (un-disable) an interface. *(Day 8)*
- `description <text>` — add an interface description. *(Day 8)*
- `show ip interface brief` — lists interfaces with IP, method, status (L1), and protocol (L2). *(Day 8)*
- `show interfaces` / `show interfaces <int>` — detailed L1/L2 info including MAC/BIA, counters. *(Day 8)*
- `show interfaces description` — lists status, protocol, and description per interface. *(Day 8)*

---

## 1.8 — Configure and verify IPv6 addressing and prefix

### Protocols & Standards
- **IPv6** — 128-bit Layer 3 address protocol; successor to IPv4 due to address exhaustion. *(Day 31)*

### Key Vocabulary
- **128-bit address** — IPv6 address length, 4× IPv4's 32 bits, yielding 2^128 addresses. *(Day 31)*
- **Quartet** — group of 4 hexadecimal digits (16 bits); an IPv6 address has 8 quartets separated by colons. *(Day 31)*
- **Leading 0s rule** — 0s at the start of any quartet can be removed when shortening. *(Day 31)*
- **Double colon (::)** — replaces one run of consecutive all-0 quartets; may be used only once per address. *(Day 31)*
- **Global routing prefix** — the leading /48 block an ISP assigns to an enterprise for a global unicast address. *(Day 31)*
- **Subnet identifier** — the next 16 bits after the /48 global routing prefix, used to create subnets. *(Day 31)*
- **Interface identifier** — the last 64 bits of an IPv6 address (the "host portion"). *(Day 31)*
- **/64 convention** — standard IPv6 prefix length; 64 network bits + 64 host bits. *(Day 31)*
- **EUI-64 / Modified EUI-64** — process that builds a 64-bit interface ID from a 48-bit MAC by splitting the MAC, inserting FFFE in the middle, and inverting the 7th bit. *(Day 32)*
- **RIR (Regional Internet Registry)** — body that assigns IP address blocks (AFRINIC, APNIC, ARIN, LACNIC, RIPE NCC). *(Day 31)*

### Acronyms
- **EUI** — Extended Unique Identifier. *(Day 32)*
- **U/L bit** — Universal/Local bit (7th bit of a MAC, inverted during EUI-64). *(Day 32)*

### Commands & Syntax
- `ipv6 unicast-routing` — enable IPv6 routing on a Cisco router (global config). *(Day 31)*
- `ipv6 address <addr>/<prefix>` — configure a full IPv6 address. *(Day 31)*
- `ipv6 address <prefix>/<len> eui-64` — configure IPv6 address where the interface ID is auto-generated from the MAC via EUI-64. *(Day 32)*
- `ipv6 enable` — enable IPv6 on an interface without assigning a global address (auto-creates link-local). *(Day 32)*
- `show ipv6 interface brief` — lists IPv6 addresses per interface (both global and link-local). *(Day 31)*
- `ipv6 route <prefix>/<len> <next-hop>` — configure an IPv6 static route. *(Day 31)*

---

## 1.9 — Describe IPv6 address types

### Protocols & Standards
- **Global unicast address** — public, globally routable IPv6 address; originally 2000::/3. *(Day 32)*
- **Unique local address (ULA)** — private IPv6 address in FC00::/7 (in practice begins with FD); not routed on the Internet. *(Day 32)*
- **Link-local address** — automatically generated address in FE80::/10 (always starts with FE8); used only on the local link. *(Day 32)*
- **Multicast address** — IPv6 one-to-many address in FF00::/8; IPv6 has no broadcast. *(Day 32)*
- **Anycast address** — one-to-one-of-many; multiple devices share the same address and traffic is routed to the nearest one. *(Day 32)*
- **Unspecified address** — `::` (all 0s); used when a device doesn't know its own address; also the IPv6 default route (::/0). *(Day 32)*
- **Loopback address** — `::1`; IPv6 equivalent of 127.0.0.1; single address instead of a whole block. *(Day 32)*

### Key Vocabulary (multicast addresses / scopes)
- **FF02::1** — all-nodes (all hosts) link-local multicast. *(Day 32)*
- **FF02::2** — all-routers link-local multicast. *(Day 32)*
- **FF02::5 / FF02::6** — OSPF all-routers / all-DR-routers. *(Day 32)*
- **FF02::A** — EIGRP routers. *(Day 32)*
- **Interface-local / node-local scope** — FF01; stays inside the local device. *(Day 32)*
- **Link-local scope** — FF02; stays inside the local subnet. *(Day 32)*
- **Site-local scope** — FF05; bounded by admin configuration, within one site. *(Day 32)*
- **Organization-local scope** — FF08; across an organization. *(Day 32)*
- **Global scope** — FF0E; unbounded, routable over the Internet. *(Day 32)*
- **Global ID** — 40-bit randomly generated portion of a unique local address (after FD). *(Day 32)*
- **NDP (Neighbor Discovery Protocol)** — IPv6's replacement for ARP; uses link-local addresses. *(Day 32)*

### Commands & Syntax
- `ipv6 address <addr>/128 anycast` — configure an anycast address on an interface. *(Day 32)*

### Acronyms
- **ULA** — Unique Local Address. *(Day 32)*
- **NDP** — Neighbor Discovery Protocol. *(Day 32)*

---

## 1.11 — Describe wireless principles

### Technologies & Devices
- **Access Point (AP)** — wireless device that connects wireless clients to a wired distribution system. *(Day 55)*
- **Wireless repeater** — AP that retransmits another AP's signal to extend the BSS; a single-radio repeater halves throughput. *(Day 55)*
- **Workgroup bridge (WGB / uWGB)** — AP operating as a wireless client to bridge wired devices into the wireless network. *(Day 55)*
- **Outdoor bridge** — APs with directional antennas used to connect sites over long distances wirelessly. *(Day 55)*
- **Root Access Point (RAP)** — mesh AP with a wired connection to the distribution system. *(Day 55)*
- **Mesh Access Point (MAP)** — mesh AP that bridges traffic over the wireless backhaul. *(Day 55)*

### Protocols & Standards
- **IEEE 802.11** — standards family for wireless LANs (Wi-Fi). *(Day 55)*
- **802.11a / b / g / n (Wi-Fi 4) / ac (Wi-Fi 5) / ax (Wi-Fi 6)** — progressive Wi-Fi amendments with different frequencies and data rates. *(Day 55)*
- **CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance)** — wireless media access method that avoids collisions by waiting for a clear channel. *(Day 55)*
- **RTS/CTS (Request to Send / Clear to Send)** — optional handshake used before transmission in CSMA/CA. *(Day 55)*

### Acronyms
- **RF** — Radio Frequency. *(Day 55)*
- **Hz / kHz / MHz / GHz / THz** — Hertz and multiples; cycles per second. *(Day 55)*
- **SSID** — Service Set Identifier; human-readable wireless network name. *(Day 55)*
- **BSSID** — Basic Service Set Identifier; unique MAC address of the AP's radio. *(Day 55)*
- **IBSS** — Independent Basic Service Set; ad-hoc direct device-to-device wireless. *(Day 55)*
- **BSS** — Basic Service Set; clients communicate via one AP. *(Day 55)*
- **BSA** — Basic Service Area; physical coverage area of an AP. *(Day 55)*
- **ESS** — Extended Service Set; multiple BSSs joined by a wired distribution system sharing one SSID. *(Day 55)*
- **MBSS** — Mesh Basic Service Set. *(Day 55)*
- **DS** — Distribution System; the upstream wired network an AP connects to. *(Day 55)*
- **AP** — Access Point. *(Day 55)*

### Key Vocabulary
- **Amplitude** — strength of the electromagnetic wave. *(Day 55)*
- **Frequency** — number of up/down cycles per second (Hz). *(Day 55)*
- **Period** — time for one cycle (1/frequency). *(Day 55)*
- **2.4 GHz band** — 2.400–2.4835 GHz; better range and wall penetration; more interference. *(Day 55)*
- **5 GHz band** — 5.150–5.825 GHz; less interference; non-overlapping channels. *(Day 55)*
- **Channel** — a 22 MHz slice within a Wi-Fi band. *(Day 55)*
- **Non-overlapping channels** — 2.4 GHz channels 1, 6, 11 in North America. *(Day 55)*
- **Honeycomb pattern** — AP layout using non-overlapping channels (1/6/11) so coverage overlaps but frequencies don't. *(Day 55)*
- **Absorption** — signal energy turned into heat by a material (e.g., walls). *(Day 55)*
- **Reflection** — signal bounces off a material (e.g., metal). *(Day 55)*
- **Refraction** — signal bends when entering a different medium (e.g., glass, water). *(Day 55)*
- **Diffraction** — signal bends around an obstacle, leaving blind spots. *(Day 55)*
- **Scattering** — signal splits in all directions off uneven surfaces/particles. *(Day 55)*
- **Roaming** — client moving between APs in an ESS without losing the connection. *(Day 55)*
- **Client / station** — wireless device associated with a BSS. *(Day 55)*
- **Channel bonding** — combining adjacent channels to increase throughput. *(Day 55)*
- **Wi-Fi Alliance** — industry group that certifies 802.11 interoperability and owns the "Wi-Fi" trademark. *(Day 55)*

---

## 1.12 — Explain virtualization fundamentals (server, containers, VRFs)

### Technologies & Devices
- **Virtual Machine (VM)** — OS instance running on virtualized hardware allocated by a hypervisor. *(Day 54 p1)*
- **Hypervisor / VMM** — software that manages and allocates hardware resources to VMs. *(Day 54 p1)*
- **Type 1 hypervisor** — runs directly on hardware; "bare-metal" or "native"; used in data centers (e.g., VMware ESXi, Microsoft Hyper-V). *(Day 54 p1)*
- **Type 2 hypervisor** — runs as a program on a host OS; "hosted"; used on personal devices (e.g., VMware Workstation, Oracle VirtualBox). *(Day 54 p1 / Day 54 Lab)*
- **Virtual switch (vSwitch)** — software switch on a hypervisor that connects VMs and maps to physical NICs; supports access/trunk ports and VLANs. *(Day 54 p1)*
- **vPC (Virtual Port Channel)** — port-channel bonded to two separate physical switches for redundancy. *(Day 54 p1)*
- **UCS (Unified Computing System)** — Cisco's hardware server line. *(Day 54 p1)*
- **Container** — software package containing an app plus its binaries/libraries/dependencies; shares the host OS kernel. *(Day 54 p2)*
- **Container engine** — runtime that runs containers (e.g., Docker Engine). *(Day 54 p2)*
- **Container orchestrator** — automation platform for deploying/scaling containers (e.g., Kubernetes, Docker Swarm). *(Day 54 p2)*

### Protocols & Standards
- **VRF (Virtual Routing and Forwarding)** — divides one physical router into multiple virtual routers, each with its own routing table. *(Day 54 p3)*
- **VRF-lite** — VRF used without MPLS; the form covered by the CCNA. *(Day 54 p3)*
- **VRF Leaking** — advanced feature that selectively allows traffic between VRFs. *(Day 54 p3)*

### Key Vocabulary
- **Host OS** — the operating system running directly on hardware (under a Type 2 hypervisor). *(Day 54 p1)*
- **Guest OS** — operating system running inside a VM. *(Day 54 p1)*
- **Partitioning** — virtualization benefit: splitting one server's resources among VMs. *(Day 54 p1)*
- **Isolation** — virtualization benefit: fault/security isolation between VMs. *(Day 54 p1)*
- **Encapsulation (VM)** — storing a VM as a file for easy save/copy/move. *(Day 54 p1)*
- **Hardware independence** — a VM can run on any physical server that supports the hypervisor. *(Day 54 p1)*
- **Microservices** — architectural style that splits an application into many small services, often run in containers. *(Day 54 p2)*
- **On-premises** — infrastructure located in the company's own building. *(Day 54 p1)*
- **Colocation** — renting rack space in a third-party data center. *(Day 54 p1)*
- **Cloud computing** — on-demand network access to a shared pool of configurable computing resources (NIST SP 800-145). *(Day 54 p1)*
- **On-demand self-service** — customers provision cloud resources themselves through a portal. *(Day 54 p1)*
- **Broad network access** — cloud services reachable over standard networks from various client devices. *(Day 54 p1)*
- **Resource pooling** — shared multi-tenant resources dynamically assigned to customers. *(Day 54 p1)*
- **Rapid elasticity** — resources can be scaled up or down quickly, appearing unlimited. *(Day 54 p1)*
- **Measured service** — usage is metered and billed/reported transparently. *(Day 54 p1)*
- **IaaS (Infrastructure as a Service)** — provider supplies compute/storage/network; customer controls OS and apps (e.g., AWS EC2). *(Day 54 p1)*
- **PaaS (Platform as a Service)** — provider supplies OS and tools; customer deploys their apps (e.g., AWS Lambda, Google App Engine). *(Day 54 p1)*
- **SaaS (Software as a Service)** — provider supplies a finished application (e.g., Office 365, Gmail). *(Day 54 p1)*
- **Private cloud** — infrastructure dedicated to a single organization. *(Day 54 p1)*
- **Community cloud** — infrastructure shared by a specific group of organizations. *(Day 54 p1)*
- **Public cloud** — infrastructure open for general public use (AWS, Azure, GCP, OCI). *(Day 54 p1)*
- **Hybrid cloud** — combination of two or more distinct cloud deployments. *(Day 54 p1)*
- **CapEx / OpEx** — capital expenses (upfront hardware) vs. operating expenses (ongoing subscription); cloud typically shifts CapEx to OpEx. *(Day 54 p1)*

### Commands & Syntax
- `ip vrf <name>` — create a VRF (global config). *(Day 54 p3)*
- `ip vrf forwarding <name>` — assign an interface to a VRF (removes any configured IP). *(Day 54 p3)*
- `show ip vrf` — list VRFs and their interfaces. *(Day 54 p3)*
- `show ip route vrf <name>` — view the routing table for a specific VRF. *(Day 54 p3)*
- `ping vrf <name> <dest>` — ping inside a specific VRF's routing table. *(Day 54 p3)*

### Acronyms
- **NIST** — National Institute of Standards and Technology (publisher of SP 800-145). *(Day 54 p1)*
- **DevOps** — combination of software development and IT operations. *(Day 54 p2)*
- **VMM** — Virtual Machine Monitor (another name for hypervisor). *(Day 54 p1)*

---

## 1.13 — Describe switching concepts

### Technologies & Devices
- **Ethernet LAN switch** — Layer 2 device that forwards frames within a LAN based on MAC addresses. *(Day 5)*
- **Hub** — legacy Layer 1 repeater that floods all received signals; forces half-duplex and one collision domain. *(Day 9)*

### Protocols & Standards
- **Ethernet (Layer 2)** — most common LAN Layer 2 protocol; defines MAC addresses, frames, and framing. *(Day 5)*
- **ARP (Address Resolution Protocol)** — used to discover the MAC address corresponding to a known IPv4 address. *(Day 6)*
- **ICMP Echo Request / Reply** — the two messages used by ping to test reachability. *(Day 6)*
- **CSMA/CD (Carrier Sense Multiple Access with Collision Detection)** — half-duplex wired method: listen, transmit, detect collisions, back off, retry. *(Day 9)*

### Key Vocabulary (Ethernet frame)
- **Preamble** — 7 bytes of alternating 1s/0s; synchronizes the receiver's clock. *(Day 5)*
- **SFD (Start Frame Delimiter)** — 1 byte (10101011); marks end of preamble and start of frame. *(Day 5)*
- **Destination MAC / Source MAC** — 6-byte Layer 2 addresses in the Ethernet header. *(Day 5)*
- **Type/Length field** — 2 bytes; ≤1500 indicates length, ≥1536 indicates EtherType (0x0800 = IPv4, 0x86DD = IPv6, 0x0806 = ARP). *(Day 5 / Day 6)*
- **FCS (Frame Check Sequence)** — 4-byte Ethernet trailer field; CRC used to detect transmission errors. *(Day 5)*
- **CRC (Cyclic Redundancy Check)** — algorithm used to detect corrupted data via the FCS. *(Day 5)*
- **Minimum frame size** — 64 bytes (excluding preamble/SFD); shorter payloads are padded with 0s to reach a 46-byte minimum payload. *(Day 6)*
- **Maximum frame size** — 1518 bytes (standard Ethernet). *(Day 9)*

### Key Vocabulary (switching behavior)
- **MAC address** — 48-bit Layer 2 physical address written as 12 hexadecimal digits; also called the burned-in address. *(Day 5)*
- **BIA (Burned-In Address)** — the manufacturer-assigned MAC on the interface hardware. *(Day 8)*
- **OUI (Organizationally Unique Identifier)** — first 24 bits of a MAC, assigned to the device maker. *(Day 5)*
- **MAC address table** — switch table mapping MAC addresses to the interface used to reach them. *(Day 5)*
- **Dynamic MAC address** — MAC learned automatically from the source MAC of received frames. *(Day 5)*
- **Aging** — automatic removal of dynamic MAC entries after 5 minutes of inactivity (Cisco default). *(Day 6)*
- **Unicast frame** — frame destined for a single host's MAC. *(Day 5)*
- **Unknown unicast** — unicast frame whose destination is not in the MAC table; flooded out all other ports. *(Day 5)*
- **Known unicast** — unicast frame whose destination is in the MAC table; forwarded only to that port. *(Day 5)*
- **Broadcast frame** — destination MAC FFFF.FFFF.FFFF; flooded to all ports except the one received on. *(Day 6)*
- **Flooding** — forwarding a frame out every interface except the one it arrived on. *(Day 5)*
- **Collision domain** — set of devices whose frames can collide with one another (one per switch port). *(Day 9)*
- **Duplex mismatch** — one side full-duplex, other side half-duplex (often due to autonegotiation failure); causes collisions and poor performance. *(Day 9)*
- **Autonegotiation** — two directly-connected interfaces negotiate best common speed and duplex. *(Day 9)*
- **Runts** — frames smaller than the 64-byte minimum. *(Day 9)*
- **Giants** — frames larger than the 1518-byte maximum. *(Day 9)*
- **Input errors / output errors** — totals of various receive/transmit error counters on an interface. *(Day 9)*

### Commands & Syntax
- `show mac address-table` — display MAC table (VLAN, MAC, type, ports). *(Day 6)*
- `clear mac address-table dynamic` — remove all dynamic MAC entries. *(Day 6)*
- `clear mac address-table dynamic address <mac>` — remove a specific dynamic entry. *(Day 6)*
- `clear mac address-table dynamic interface <int>` — remove all dynamic entries learned on an interface. *(Day 6)*
- `show arp` / `arp -a` — display the ARP table (Cisco IOS / host OS). *(Day 6)*
- `show interfaces status` — per-port status, VLAN, duplex, speed, type. *(Day 9)*
- `speed {10 | 100 | 1000 | auto}` — manually set interface speed. *(Day 9)*
- `duplex {auto | full | half}` — manually set duplex. *(Day 9)*
- `interface range <range>` — enter config for multiple interfaces at once (supports comma-separated ranges). *(Day 9)*
- `shutdown` / `no shutdown` — disable or enable an interface. *(Day 9)*
- `ping <ip>` — send ICMP echo requests to test reachability (Cisco default: 5× 100-byte packets). *(Day 6)*

### Acronyms
- **ARP** — Address Resolution Protocol. *(Day 6)*
- **MAC** — Media Access Control. *(Day 5)*
- **OUI** — Organizationally Unique Identifier. *(Day 5)*
- **FCS** — Frame Check Sequence. *(Day 5)*
- **CRC** — Cyclic Redundancy Check. *(Day 5)*
- **SFD** — Start Frame Delimiter. *(Day 5)*
- **ICMP** — Internet Control Message Protocol. *(Day 6)*
- **CSMA/CD** — Carrier Sense Multiple Access with Collision Detection. *(Day 9)*
- **PoE** — Power over Ethernet. *(Day 52)*
