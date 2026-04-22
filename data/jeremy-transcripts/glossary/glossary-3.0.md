# Domain 3.0 — IP Connectivity Glossary

Source: Jeremy's IT Lab — Free CCNA v1.1 200-301 Complete Course
Scope: 5 sub-objectives, 19 videos

## 3.1 — Interpret the components of a routing table

### Technologies & Devices
- **Router** — Layer 3 device that forwards IP packets between networks using a routing table. *(Day 11)*
- **Routing table** — the set of instructions a router uses to forward packets; stores known destination networks and their next-hops. *(Day 11)*
- **LAN** — local area network; a network confined to a small geographic area (e.g., one office). *(Day 11)*
- **WAN** — wide area network; extends over a large geographic area, often connecting routers across cities/countries. *(Day 11)*
- **Autonomous system (AS)** — a single organization's network (e.g., a company); IGPs route within, EGPs route between. *(Day 24)*

### Protocols & Standards
- **Dynamic routing protocol** — protocol that lets routers automatically learn and share routes (e.g., OSPF, EIGRP, RIP). *(Day 11)*
- **Static routing** — routes manually configured by an admin using `ip route`. *(Day 11)*
- **IGP (Interior Gateway Protocol)** — shares routes within a single AS; includes RIP, EIGRP, OSPF, IS-IS. *(Day 24)*
- **EGP (Exterior Gateway Protocol)** — shares routes between autonomous systems; BGP is the only EGP in modern use. *(Day 24)*
- **Distance vector** — IGP algorithm that shares routes "by rumor" (destination + metric to neighbor); used by RIP and EIGRP. *(Day 24)*
- **Link state** — IGP algorithm where every router builds a complete map of the network; used by OSPF and IS-IS. *(Day 24)*
- **Path vector** — algorithm type used by BGP (the only EGP). *(Day 24)*
- **RIP (Routing Information Protocol)** — simple distance vector IGP; uses hop count as metric (max 15 hops). *(Day 25)*
- **EIGRP (Enhanced Interior Gateway Routing Protocol)** — advanced/hybrid distance vector IGP; metric uses bandwidth + delay; only IGP that supports unequal-cost load-balancing. *(Day 25)*
- **BGP (Border Gateway Protocol)** — only EGP in use today; routes between autonomous systems. *(Day 24)*
- **IS-IS (Intermediate System to Intermediate System)** — link state IGP; default link cost is 10. *(Day 24)*

### Acronyms
- **AD** — Administrative Distance — trustworthiness rank used to choose between routing sources; lower is preferred. *(Day 24)*
- **ECMP** — Equal Cost MultiPath — load-balancing over multiple routes with the same metric. *(Day 24)*
- **IGP** — Interior Gateway Protocol — routes within one AS. *(Day 24)*
- **EGP** — Exterior Gateway Protocol — routes between ASs. *(Day 24)*
- **AS** — Autonomous System — one organization's network. *(Day 24)*
- **VLSM** — Variable Length Subnet Masking — allows different mask lengths per subnet (RIPv1 does not support). *(Day 25)*
- **CIDR** — Classless Inter-Domain Routing — supersedes classful addressing. *(Day 25)*
- **FD** — Feasible Distance — this router's metric to the destination (EIGRP). *(Day 25 Lab)*
- **RD/AD** — Reported/Advertised Distance — the neighbor's metric to the destination (EIGRP). *(Day 25 Lab)*

### Commands & Syntax
- `show ip route` — display the router's routing table. *(Day 11)*
- `show ip protocols` — display running routing protocol settings (RIP/EIGRP/OSPF). *(Day 25)*
- `show ip route eigrp` — filter routing table to show only EIGRP routes. *(Day 25 Lab)*
- `show ip eigrp neighbors` — list EIGRP neighbors. *(Day 25 Lab)*
- `show ip eigrp topology` — show all learned EIGRP routes including backups. *(Day 25 Lab)*
- `router rip` — enter RIP config mode. *(Day 25)*
- `version 2` — under `router rip`, use RIPv2 (supports VLSM/CIDR, multicasts to 224.0.0.9). *(Day 25)*
- `no auto-summary` — disable classful auto-summarization. *(Day 25)*
- `network 10.0.0.0` — activate the protocol on interfaces whose IPs fall in that range. *(Day 25)*
- `passive-interface G2/0` — stop sending routing protocol messages out an interface, but still advertise its network. *(Day 25)*
- `default-information originate` — advertise the router's default route into the routing protocol. *(Day 25)*
- `maximum-paths 8` — change ECMP maximum from default of 4. *(Day 25)*
- `distance 85` — change the AD of the routing protocol. *(Day 25)*
- `router eigrp 1` — enter EIGRP config mode with AS number (must match between neighbors). *(Day 25)*
- `eigrp router-id 1.1.1.1` — manually set EIGRP router ID. *(Day 25)*
- `variance 2` — enable EIGRP unequal-cost load-balancing up to 2× the successor's FD. *(Day 25 Lab)*
- `interface loopback 0` — create a virtual loopback interface (always up/up). *(Day 25 Lab)*

### Key Vocabulary
- **Route** — an instruction telling the router: to reach destination X, send packets to next-hop Y (or receive/drop). *(Day 11)*
- **Connected route (C)** — auto-added route to the network an interface is attached to, using its configured mask. *(Day 11)*
- **Local route (L)** — auto-added /32 route to the exact IP configured on the interface (tells the router to receive the packet for itself). *(Day 11)*
- **Next-hop** — the next router in the path to a destination. *(Day 11)*
- **Match** — a route matches a packet when the destination IP falls within the route's network. *(Day 11)*
- **Most specific match / longest prefix match** — when multiple routes match, the router chooses the one with the longest prefix length. *(Day 11)*
- **Network route** — route to a network/subnet, mask length < /32. *(Day 24)*
- **Host route** — route to a specific host, /32 mask. *(Day 24)*
- **Metric** — value a routing protocol uses to select the best route among same-protocol routes; lower is better. *(Day 24)*
- **Hop count** — RIP's metric; each router in the path = 1 hop; max 15. *(Day 24)*
- **Bandwidth + delay** — EIGRP's metric inputs (slowest-link bandwidth + sum of delays). *(Day 24)*
- **Cost** — OSPF's metric, based on bandwidth. *(Day 24)*
- **Administrative Distance values** — Connected 0, Static 1, eBGP 20, EIGRP 90, IGRP 100, OSPF 110, IS-IS 115, RIP 120, EIGRP external 170, iBGP 200, unusable 255. *(Day 24)*
- **Floating static route** — static route with AD raised above a dynamic protocol's AD so it serves as backup. *(Day 24)*
- **Routing by rumor** — distance vector behavior: router only knows what neighbors tell it. *(Day 24)*
- **LSA flooding** — link-state behavior: advertisements passed to all routers until LSDBs match. *(Day 24)*
- **Adjacency / neighbor relationship** — formed between dynamic-routing neighbors before routes are exchanged. *(Day 24)*
- **Successor** — EIGRP's best (lowest-metric) route to a destination. *(Day 25 Lab)*
- **Feasible successor** — EIGRP backup route that meets the feasibility condition (RD < successor's FD). *(Day 25 Lab)*
- **Feasibility condition** — a route qualifies as feasible successor only if its reported distance is lower than the successor's feasible distance (loop prevention). *(Day 25 Lab)*

---

## 3.2 — Determine how a router makes a forwarding decision by default

### Protocols & Standards
- **ARP (Address Resolution Protocol)** — used to learn the MAC address associated with an IP; request is broadcast, reply is unicast. *(Day 12)*
- **ICMP** — used by `ping` to test reachability; echo request/echo reply. *(Day 12 Lab)*

### Acronyms
- **ARP** — Address Resolution Protocol. *(Day 12)*
- **BIA** — Burned-In Address — the hardware MAC address assigned by the manufacturer (distinct from a manually configured MAC). *(Day 12 Lab)*

### Commands & Syntax
- `ipconfig /all` — Windows PC command to view IP address, subnet mask, default gateway, MAC (physical address). *(Day 12 Lab)*
- `show interface g0/0` — display interface MAC (hardware address), BIA, and status. *(Day 12 Lab)*
- `mac-address aaaa.aaaa.aaaa` — manually set the MAC address on a router interface. *(Day 12 Lab)*
- `ping 192.168.3.1` — test reachability by ICMP echo. *(Day 12 Lab)*

### Key Vocabulary
- **Encapsulation** — wrapping the packet in a Layer 2 frame (Ethernet header + trailer) before transmission. *(Day 12)*
- **De-encapsulation** — the receiving router strips the Layer 2 header to examine the Layer 3 packet. *(Day 12)*
- **Re-encapsulation** — at each router hop, the packet is wrapped in a new Ethernet frame with new source/destination MACs. *(Day 12)*
- **Default gateway** — the router that end hosts send packets to when the destination is outside the local subnet; old term for router. *(Day 11 p2)*
- **Broadcast MAC** — `FFFF.FFFF.FFFF`; destination MAC used by ARP requests so all hosts on the segment receive it. *(Day 12)*
- **Unicast** — single-destination frame; ARP replies are unicast because source IP/MAC were learned from the request. *(Day 12)*
- **Source/destination IP preserved** — through a routed path, the original source and destination IPs never change. *(Day 12)*
- **Source/destination MAC change per hop** — each router rewrites MAC headers when it forwards. *(Day 12)*
- **Switch behavior vs router** — switches flood unknown unicast frames; routers drop packets with no matching route. *(Day 11)*
- **Simulation mode** — Packet Tracer feature used to step through packets hop-by-hop to inspect headers. *(Day 12 Lab)*

---

## 3.3 — Configure and verify IPv4 and IPv6 static routing

### Technologies & Devices
- **Exit interface** — outgoing interface specified instead of (or in addition to) a next-hop IP on a static route. *(Day 11 p2)*
- **Serial interface** — legacy WAN interface using DCE/DTE and HDLC/PPP; still present only via the OSPF point-to-point type. *(Day 24 Lab)*
- **Loopback interface** — virtual interface that is always up/up unless shut down; used to simulate remote networks in labs. *(Day 24 Lab)*

### Protocols & Standards
- **Proxy ARP** — feature that lets exit-interface-only static routes work by ARPing for the remote destination; beyond CCNA scope. *(Day 11 p2)*

### Commands & Syntax
- `ip route 192.168.4.0 255.255.255.0 192.168.13.3` — configure a static route with a next-hop IP. *(Day 11 p2)*
- `ip route 192.168.1.0 255.255.255.0 G0/0` — static route using an exit interface only. *(Day 11 p2)*
- `ip route 192.168.4.0 255.255.255.0 G0/1 192.168.24.4` — static route with both exit interface and next-hop. *(Day 11 p2)*
- `ip route 0.0.0.0 0.0.0.0 203.0.113.2` — default route (all netmask bits 0 → matches all destinations). *(Day 11 p2)*
- `ip route 192.168.4.0 255.255.255.0 203.0.113.1 111` — floating static route (AD 111 > OSPF's 110 → acts as backup). *(Day 24 Lab)*
- `ip route 10.0.0.0 255.255.255.255 ...` — host route using a /32 mask. *(Day 24)*
- `show ip route static` — filter routing table to static routes only. *(Day 25 Lab)*
- `show ip route connected` — filter routing table to connected routes. *(Day 25 Lab)*
- `traceroute 10.0.2.1` — Cisco IOS; tests the Layer 3 path hop by hop. *(Day 24 Lab)*
- `tracert 10.0.2.1` — Windows PC equivalent. *(Day 24 Lab)*
- `clock rate 64000` — set serial DCE speed in bits per second. *(Day 24 Lab)*

### Key Vocabulary
- **Static route** — manually configured route (code `S` in routing table); default AD = 1. *(Day 11 p2)*
- **Default route** — route to `0.0.0.0/0`; the least-specific route possible; used when no more-specific match exists. *(Day 11 p2)*
- **Gateway of last resort** — another name for the default gateway/default route, shown atop `show ip route`. *(Day 11 p2)*
- **Candidate default (`S*`)** — static route flagged as a potential default route by the asterisk in the codes legend. *(Day 11 p2)*
- **Two-way reachability** — both directions must have matching routes, or replies fail. *(Day 11 p2)*
- **Floating static route** — backup static route (AD raised above the dynamic protocol) — only used if the dynamic route disappears. *(Day 24 Lab)*
- **Load-balancing via static** — configuring two static routes to the same destination creates ECMP. *(Day 24)*
- **DCE/DTE** — on serial, DCE side sets the clock rate; DTE receives it. *(Day 24 Lab)*

---

## 3.4 — Configure and verify single-area OSPFv2

### Technologies & Devices
- **DR (Designated Router)** — on broadcast networks, elected to reduce LSA flooding; all others form full adjacencies with it. *(Day 28)*
- **BDR (Backup Designated Router)** — second-place router in DR election; takes over if DR fails. *(Day 28)*
- **DROther** — any router on a broadcast segment that is neither DR nor BDR; stays in 2-way state with other DROthers. *(Day 28)*
- **Internal router** — OSPF router with all interfaces in the same area. *(Day 26)*
- **ABR (Area Border Router)** — OSPF router with interfaces in 2+ areas; maintains a separate LSDB per area. *(Day 26)*
- **Backbone router** — any OSPF router with at least one interface in area 0. *(Day 26)*
- **ASBR (Autonomous System Boundary Router)** — OSPF router that connects the OSPF domain to an external network (e.g., advertises a default route). *(Day 26)*

### Protocols & Standards
- **OSPF (Open Shortest Path First)** — link-state IGP; the only dynamic routing protocol explicitly required by the CCNA. *(Day 26)*
- **OSPFv2** — OSPF for IPv4 (the exam-scope version). *(Day 26)*
- **OSPFv3** — OSPF for IPv6 (also supports IPv4). *(Day 26)*
- **Dijkstra's algorithm / SPF** — shortest-path-first algorithm OSPF uses to calculate best routes. *(Day 26)*
- **HDLC** — default serial Layer 2 encapsulation on Cisco routers (Cisco's cHDLC). *(Day 28)*
- **PPP** — alternative serial Layer 2 encapsulation; set with `encapsulation ppp`. *(Day 28)*

### Acronyms
- **LSA** — Link State Advertisement — OSPF's unit of routing information. *(Day 26)*
- **LSDB** — Link State Database — collection of all LSAs; identical for all routers in an area. *(Day 26)*
- **DBD** — Database Description — packet listing LSAs held during Exstart/Exchange states. *(Day 27)*
- **LSR** — Link State Request — requests missing LSAs from a neighbor. *(Day 27)*
- **LSU** — Link State Update — carries the actual LSAs. *(Day 27)*
- **LSAck** — Link State Acknowledgment — confirms receipt of LSAs. *(Day 27)*
- **RID** — Router ID — 32-bit ID that uniquely identifies an OSPF router. *(Day 26)*
- **MTU** — Maximum Transmission Unit — must match between neighbors (default 1500). *(Day 28)*

### Commands & Syntax
- `router ospf 1` — enter OSPF config mode with a locally-significant process ID. *(Day 26)*
- `network 10.0.12.0 0.0.0.3 area 0` — activate OSPF on matching interfaces in the specified area (uses wildcard mask). *(Day 26)*
- `ip ospf 1 area 0` — alternative: enable OSPF directly on an interface. *(Day 27)*
- `router-id 1.1.1.1` — manually set the OSPF router ID (requires `clear ip ospf process` to take effect). *(Day 26)*
- `passive-interface G2/0` — stop sending hellos out the interface; still advertises the subnet. *(Day 26)*
- `passive-interface default` — make all interfaces passive by default. *(Day 27)*
- `no passive-interface G0/0` — remove passive status from a specific interface. *(Day 27)*
- `default-information originate` — advertise the default route into OSPF (turns router into ASBR). *(Day 26)*
- `auto-cost reference-bandwidth 100000` — set reference bandwidth in Mbps (recommended to match across all routers). *(Day 27)*
- `ip ospf cost 10000` — manually set OSPF cost on an interface. *(Day 27)*
- `bandwidth 64` — interface command (kilobits/sec) that affects OSPF cost calculation. *(Day 27)*
- `ip ospf priority 255` — set DR election priority (0 = never DR, 255 = max; default 1). *(Day 28)*
- `ip ospf hello-interval 5` — change hello timer on the interface (must match between neighbors). *(Day 28)*
- `ip ospf dead-interval 20` — change dead timer (must match between neighbors). *(Day 28)*
- `ip ospf authentication-key jeremy` — set OSPF password on the interface. *(Day 28)*
- `ip ospf authentication` — enable OSPF authentication on the interface. *(Day 28)*
- `ip ospf network point-to-point` — change the OSPF network type on the interface. *(Day 28)*
- `ip mtu 1400` — change interface IP MTU (must match between neighbors or OSPF will stall in Exstart). *(Day 28)*
- `clear ip ospf process` — reset OSPF on the router (needed for a new router-ID to take effect). *(Day 26)*
- `shutdown` / `no shutdown` (under `router ospf`) — disable/enable the OSPF process without deleting config. *(Day 28)*
- `show ip ospf neighbor` — list OSPF neighbors, state, DR/BDR/DROther, dead time. *(Day 27)*
- `show ip ospf interface` — show hello/dead timers, neighbor counts, cost, priority, DR/BDR. *(Day 27)*
- `show ip ospf interface brief` — compact per-interface OSPF summary (area, cost, state, F/C neighbor counts). *(Day 27)*
- `show ip ospf database` — show the LSDB. *(Day 28)*
- `show controllers serial0/0` — identify DCE vs DTE end of a serial link. *(Day 28)*

### Key Vocabulary
- **Area** — a set of routers/links that share the same LSDB; identified by a 32-bit ID (e.g., `0` or `0.0.0.0`). *(Day 26)*
- **Backbone area (area 0)** — the special area all other areas must connect to. *(Day 26)*
- **Intra-area route** — route to a destination inside the same OSPF area as the router. *(Day 26)*
- **Interarea route** — route to a destination in a different OSPF area. *(Day 26)*
- **Contiguous area** — all parts of an area must be connected; non-contiguous areas are invalid. *(Day 26)*
- **Process ID** — locally significant OSPF identifier; does NOT need to match between neighbors. *(Day 26)*
- **Router ID priority order** — manual `router-id` → highest loopback IP → highest physical interface IP. *(Day 26)*
- **Cost formula** — reference bandwidth ÷ interface bandwidth; values < 1 round up to 1. *(Day 27)*
- **Default reference bandwidth** — 100 Mbps (FastEth, GigE, 10GigE all cost 1 by default — why you should raise it). *(Day 27)*
- **Loopback cost** — always 1 and added when a loopback is the exit. *(Day 27)*
- **Total route cost** — sum of OSPF costs of the outgoing (exit) interfaces along the path. *(Day 27)*
- **Hello** — OSPF type-1 message used to discover and maintain neighbors; multicast to 224.0.0.5. *(Day 27)*
- **All-OSPF-routers multicast** — 224.0.0.5. *(Day 27)*
- **All-DR/BDR multicast** — 224.0.0.6. *(Day 28)*
- **IP protocol number 89** — identifies OSPF in the IP header. *(Day 27)*
- **Default timers (Broadcast / P2P)** — Hello 10 s, Dead 40 s. *(Day 27)*
- **Default timers (Non-broadcast)** — Hello 30 s, Dead 120 s. *(Day 28)*
- **Down state** — no hellos received; initial neighbor state. *(Day 27)*
- **Init state** — received a hello, but own RID not yet in it. *(Day 27)*
- **2-way state** — hello received with own RID present; neighbors formed; DR/BDR elected here. *(Day 27)*
- **Exstart state** — Master/Slave decided (higher RID = Master). *(Day 27)*
- **Exchange state** — DBDs exchanged to describe each LSDB. *(Day 27)*
- **Loading state** — LSRs/LSUs/LSAcks exchanged for missing LSAs. *(Day 27)*
- **Full state** — full adjacency; LSDBs synchronized. *(Day 27)*
- **Neighbor vs adjacent neighbor** — in `F/C` on `show ip ospf int brief`, F = Full adjacencies, C = total neighbors. *(Day 28)*
- **Non-preemptive DR/BDR** — once elected, DR/BDR keep their role until OSPF reset or interface failure. *(Day 28)*
- **OSPF network types** — Broadcast (Ethernet default), Point-to-Point (PPP/HDLC default), Non-broadcast (Frame Relay default). *(Day 28)*
- **Broadcast network type** — uses DR/BDR; dynamic neighbor discovery via 224.0.0.5. *(Day 28)*
- **Point-to-Point network type** — no DR/BDR; used between exactly two routers. *(Day 28)*
- **Neighbor requirements** — same area, same subnet, OSPF process up, unique RIDs, matching Hello/Dead timers, matching authentication, matching MTU, matching network type. *(Day 28)*
- **Type 1 LSA (Router LSA)** — generated by every OSPF router; lists its OSPF-activated interfaces/networks. *(Day 28)*
- **Type 2 LSA (Network LSA)** — generated by DR on multi-access networks; lists attached routers. *(Day 28)*
- **Type 5 LSA (AS-External LSA)** — generated by ASBRs to advertise external routes (e.g., a default route). *(Day 28)*
- **Aging timer** — each LSA is reflooded every 30 minutes by default. *(Day 26)*
- **OSPF AD** — 110 by default. *(Day 26)*
- **Equal-cost load-balancing** — OSPF supports ECMP over 4 paths by default (configurable with `maximum-paths`). *(Day 26)*

---

## 3.5 — Describe the purpose, functions, and concepts of FHRPs (HSRP)

### Technologies & Devices
- **FHRP (First Hop Redundancy Protocol)** — any protocol that provides a redundant default gateway by having two+ routers share a virtual IP. *(Day 29)*
- **Active router (HSRP)** — the router currently answering for the virtual IP/MAC. *(Day 29)*
- **Standby router (HSRP)** — backup that takes over if active fails. *(Day 29)*
- **Master router (VRRP)** — VRRP equivalent of HSRP's active. *(Day 29)*
- **Backup router (VRRP)** — VRRP equivalent of HSRP's standby. *(Day 29)*
- **AVG (Active Virtual Gateway, GLBP)** — single router elected per subnet that assigns AVFs. *(Day 29)*
- **AVF (Active Virtual Forwarder, GLBP)** — up to four forwarders that share traffic within one subnet. *(Day 29)*

### Protocols & Standards
- **HSRP (Hot Standby Router Protocol)** — Cisco-proprietary FHRP; active/standby model. *(Day 29)*
- **VRRP (Virtual Router Redundancy Protocol)** — open-standard FHRP; master/backup model. *(Day 29)*
- **GLBP (Gateway Load Balancing Protocol)** — Cisco-proprietary FHRP; load-balances across multiple active forwarders in one subnet. *(Day 29)*
- **Gratuitous ARP** — unrequested ARP reply (broadcast) sent by the new active router so switches relearn the virtual MAC location. *(Day 29)*

### Acronyms
- **FHRP** — First Hop Redundancy Protocol. *(Day 29)*
- **HSRP** — Hot Standby Router Protocol. *(Day 29)*
- **VRRP** — Virtual Router Redundancy Protocol. *(Day 29)*
- **GLBP** — Gateway Load Balancing Protocol. *(Day 29)*
- **VIP** — Virtual IP — shared IP clients use as default gateway. *(Day 29)*
- **AVG / AVF** — GLBP roles (above). *(Day 29)*

### Commands & Syntax
- `standby version 2` — enable HSRPv2 on the interface (required for IPv6 and expanded group range 0–4095). *(Day 29)*
- `standby 1 ip 172.16.0.254` — configure virtual IP in HSRP group 1. *(Day 29)*
- `standby 1 priority 200` — set priority (default 100; higher wins). *(Day 29)*
- `standby 1 preempt` — allow this router to retake active role from a lower-priority active. *(Day 29)*
- `show standby` — show HSRP state, group, VIP, VMAC, priority, timers, active/standby. *(Day 29)*
- `ip default-gateway 172.16.3.1` — on a Layer 2 switch (no routing table), set the management default gateway. *(Day 29 Lab)*

### Key Vocabulary
- **Virtual IP (VIP)** — gateway IP shared by the FHRP routers; clients use this as default gateway. *(Day 29)*
- **Virtual MAC (VMAC)** — MAC address associated with the VIP; format varies by FHRP. *(Day 29)*
- **HSRPv1 VMAC** — `0000.0C07.AC` + group number (2 hex digits, group 0–255). *(Day 29)*
- **HSRPv2 VMAC** — `0000.0C9F.F` + group number (3 hex digits, group 0–4095). *(Day 29)*
- **VRRP VMAC** — `0000.5E00.01` + group number. *(Day 29)*
- **GLBP VMAC** — `0007.B400.` + group number + AVF number. *(Day 29)*
- **HSRPv1 multicast** — 224.0.0.2. *(Day 29)*
- **HSRPv2 multicast** — 224.0.0.102. *(Day 29)*
- **VRRP multicast** — 224.0.0.18. *(Day 29)*
- **GLBP multicast** — 224.0.0.102 (same as HSRPv2). *(Day 29)*
- **Priority** — HSRP tiebreaker; higher wins; if tied, highest interface IP wins. *(Day 29)*
- **Preemption** — feature that lets a higher-priority router take back the active/master role after recovery (off by default → non-preemptive). *(Day 29)*
- **Non-preemptive** — default behavior: current active keeps its role even if a higher-priority router appears. *(Day 29)*
- **HSRP groups per VLAN** — one VIP per subnet/VLAN; different active router per group enables between-VLAN load-balancing. *(Day 29)*
- **HSRP vs VRRP vs GLBP load-balancing** — HSRP/VRRP balance only across subnets; GLBP balances within a single subnet via multiple AVFs. *(Day 29)*
- **Cisco-proprietary vs open** — HSRP and GLBP are Cisco-only; VRRP is open-standard. *(Day 29)*
