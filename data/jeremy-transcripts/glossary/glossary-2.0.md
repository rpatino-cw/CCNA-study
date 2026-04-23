# Domain 2.0 — Network Access Glossary

Source: Jeremy's IT Lab — Free CCNA v1.1 200-301 Complete Course
Scope: 7 sub-objectives, 25 videos

## 2.1 — Configure and verify VLANs spanning multiple switches

### Technologies & Devices
- **LAN (Local Area Network)** — a single broadcast domain; a group of devices in one location that all receive a broadcast frame sent by any member. *(Day 16)*
- **VLAN (Virtual LAN)** — a logical Layer 2 segmentation of a physical LAN; switch treats each VLAN as a separate broadcast domain and won't forward traffic between VLANs. *(Day 16)*
- **Broadcast domain** — the group of devices that will receive a broadcast frame (destination MAC FF:FF:FF:FF:FF:FF) sent by any member. *(Day 16)*
- **Access port** — a switchport belonging to a single VLAN, usually connected to an end host like a PC. *(Day 16)*
- **Trunk port** — a switchport that carries traffic from multiple VLANs over a single link. *(Day 16)*
- **Default VLAN** — VLAN 1; all switch interfaces are assigned to it by default. *(Day 16)*
- **Router (for inter-VLAN routing)** — device that forwards traffic between VLANs at Layer 3; switches by themselves do not inter-VLAN route. *(Day 16)*

### Protocols & Standards
- **Normal VLAN range** — VLANs 1-1005; can be used on all Cisco switches. *(Day 17)*
- **Extended VLAN range** — VLANs 1006-4094; supported on most modern switches. *(Day 17)*

### Acronyms
- **LAN** — Local Area Network — single broadcast domain in one location.
- **VLAN** — Virtual LAN — logical Layer 2 segmentation.
- **MAC** — Media Access Control — Layer 2 hardware address.

### Commands & Syntax
- `show vlan brief` — lists VLANs on the switch and which access ports are assigned to each.
- `vlan 10` — enters VLAN config mode for VLAN 10 (also creates it if missing).
- `name ENGINEERING` — assigns a human-readable name to the VLAN.
- `interface range g1/0 - 3` — enters config mode for multiple interfaces at once.
- `switchport mode access` — sets the interface as an access port.
- `switchport access vlan 10` — assigns the port to VLAN 10 (auto-creates the VLAN if absent).
- `ping 255.255.255.255` — sends a broadcast-MAC ping; useful to verify VLAN isolation.

### Key Vocabulary
- **Broadcast frame** — frame with destination MAC all Fs; flooded by a switch out every port except the one it arrived on. *(Day 16)*
- **Unknown unicast frame** — unicast frame whose destination MAC is not in the switch's MAC table; also flooded. *(Day 16)*
- **Inter-VLAN routing** — routing traffic between different VLANs (done by a router or Layer 3 switch, never a pure L2 switch). *(Day 16)*
- **Flooding** — switch behavior of forwarding a frame out all interfaces except the arrival interface. *(Day 16)*
- **Reserved VLANs** — VLANs 0 and 4095 can't be used; VLANs 1 and 1002-1005 exist by default and can't be deleted. *(Day 16)*

---

## 2.2 — Configure and verify interswitch connectivity (trunks, DTP, 802.1Q, native VLAN)

### Technologies & Devices
- **Trunk link** — physical link carrying traffic from multiple VLANs between switches (or switch-to-router). *(Day 17)*
- **Tagged port** — another name for a trunk port, since it tags frames to identify the VLAN. *(Day 17)*
- **Untagged port** — another name for an access port; frames are not VLAN-tagged. *(Day 17)*
- **Router-on-a-Stick (ROAS)** — inter-VLAN routing using a single trunk link between a switch and router, with subinterfaces for each VLAN. *(Day 18)*
- **Subinterface** — a virtual/logical subdivision of a router's physical interface (e.g. `G0/0.10`), each with its own VLAN tag and IP. *(Day 18)*
- **Layer 3 / Multilayer Switch** — switch capable of both Layer 2 switching and Layer 3 routing; supports routed ports and SVIs. *(Day 18 pt3)*
- **SVI (Switch Virtual Interface)** — virtual Layer 3 interface on a multilayer switch representing a VLAN; used as gateway for inter-VLAN routing on the switch. *(Day 18 pt3)*
- **Routed port** — a Layer 3 physical port on a multilayer switch (configured with `no switchport`). *(Day 18 pt3)*

### Protocols & Standards
- **IEEE 802.1Q (dot1q)** — industry-standard VLAN tagging protocol; inserts a 4-byte tag into the Ethernet frame between source MAC and type/length fields. *(Day 17)*
- **ISL (Inter-Switch Link)** — legacy Cisco-proprietary trunk encapsulation; largely replaced by 802.1Q. *(Day 17)*
- **DTP (Dynamic Trunking Protocol)** — Cisco-proprietary protocol that negotiates trunk/access status between connected switchports. *(Day 19)*
- **VTP (VLAN Trunking Protocol)** — Cisco-proprietary protocol that synchronizes VLAN databases between switches in the same VTP domain. *(Day 19)*
- **Native VLAN** — the VLAN on a trunk whose frames are sent untagged; VLAN 1 by default; must match on both sides. *(Day 17)*

### Acronyms
- **TPID** — Tag Protocol Identifier — always 0x8100 in an 802.1Q tag, marking the frame as dot1q-tagged.
- **TCI** — Tag Control Information — contains PCP, DEI, and VID fields.
- **PCP** — Priority Code Point — 3-bit field used for Class of Service (CoS) priority.
- **DEI** — Drop Eligible Indicator — 1-bit field marking a frame as eligible to drop when congested.
- **VID** — VLAN ID — 12-bit field identifying the VLAN (range 1-4094).
- **ROAS** — Router-on-a-Stick — trunk-based inter-VLAN routing with subinterfaces.
- **DTP** — Dynamic Trunking Protocol.
- **VTP** — VLAN Trunking Protocol.
- **NVRAM** — Non-Volatile RAM — where VTP server stores the VLAN database.

### Commands & Syntax
- `switchport mode trunk` — manually configures the interface as a trunk.
- `switchport trunk encapsulation dot1q` — sets trunk encapsulation to 802.1Q (required first on switches supporting both dot1q and ISL).
- `switchport trunk encapsulation isl` — sets trunk encapsulation to ISL.
- `switchport trunk encapsulation negotiate` — lets DTP negotiate the encapsulation (default on dual-mode switches).
- `switchport trunk allowed vlan 10,30` — restricts trunk to only these VLANs.
- `switchport trunk allowed vlan add 20` — adds a VLAN to the allowed list.
- `switchport trunk allowed vlan remove 20` — removes a VLAN from the allowed list.
- `switchport trunk allowed vlan all` — allows all VLANs (default).
- `switchport trunk allowed vlan except 1-5,10` — allows all VLANs except the specified ones.
- `switchport trunk allowed vlan none` — disallows all VLANs on the trunk.
- `switchport trunk native vlan 1001` — changes the native VLAN on the trunk.
- `switchport mode dynamic desirable` — DTP mode that actively tries to form a trunk.
- `switchport mode dynamic auto` — DTP mode that passively forms a trunk only if the other side initiates.
- `switchport nonegotiate` — disables DTP frames on the interface.
- `show interfaces trunk` — displays trunk ports, mode, encapsulation, native VLAN, allowed VLANs, active VLANs.
- `show interface g0/1 switchport` — shows administrative and operational mode, DTP negotiation state, trunking encapsulation.
- `interface g0/0.10` — enters subinterface configuration for VLAN 10.
- `encapsulation dot1q 10` — configures subinterface to tag/accept frames in VLAN 10.
- `encapsulation dot1q 10 native` — marks the subinterface as the native VLAN on ROAS (no tagging on egress).
- `no switchport` — converts a switchport into a Layer 3 routed port on a multilayer switch.
- `ip routing` — enables Layer 3 routing on a multilayer switch (required for SVI inter-VLAN routing).
- `interface vlan 10` — creates/enters an SVI for VLAN 10.
- `default interface g0/1` — resets the interface to its default settings.
- `vtp domain CISCO` — sets the VTP domain name.
- `vtp mode server` / `vtp mode client` / `vtp mode transparent` — sets the VTP operational mode.
- `vtp version 2` — changes the VTP version.
- `vtp password cisco` — sets a VTP password; mismatched passwords reject advertisements.
- `show vtp status` — shows VTP version, domain, mode, revision number, VLAN count.

### Key Vocabulary
- **VLAN tagging** — inserting a VLAN identifier into a frame so the receiving switch knows which VLAN it belongs to. *(Day 17)*
- **Native VLAN mismatch** — misconfiguration where two trunk endpoints disagree on the native VLAN; causes traffic to land in the wrong VLAN. *(Day 17)*
- **VTP server** — switch that can add/modify/delete VLANs and advertises the database; stores VLANs in NVRAM; default Cisco mode. *(Day 19)*
- **VTP client** — switch that cannot add/modify/delete VLANs; syncs from the server with the highest revision number. *(Day 19)*
- **VTP transparent** — switch that maintains its own local VLAN database, does not sync, but forwards VTP advertisements in the same domain. *(Day 19)*
- **VTP revision number** — increments on every VLAN change; switches sync to the highest revision in the domain (danger: old switch with higher revision can wipe out VLANs). *(Day 19)*
- **Dynamic auto / dynamic desirable** — the two DTP negotiation modes. *(Day 19)*
- **Static access** — manually configured access mode with DTP disabled. *(Day 19)*
- **Point-to-point Layer 3 link** — connection between multilayer switch and router using routed ports instead of a trunk. *(Day 18 pt3)*
- **DHCP option 43** — DHCP option that tells lightweight APs the WLC's IP address (relevant when the WLC is in a different subnet). *(Day 58)*

---

## 2.3 — Configure and verify Layer 2 discovery protocols (CDP, LLDP)

### Technologies & Devices
- **Layer 2 discovery protocol** — protocol that shares information with, and discovers information about, directly connected neighbors; operates at Layer 2 (no IP). *(Day 36)*

### Protocols & Standards
- **CDP (Cisco Discovery Protocol)** — Cisco-proprietary L2 discovery protocol; enabled by default on Cisco devices; uses multicast MAC `0100.0CCC.CCCC`. *(Day 36)*
- **LLDP (Link Layer Discovery Protocol)** — industry-standard L2 discovery protocol (IEEE 802.1AB); disabled by default on Cisco; uses multicast MAC `0180.C200.000E`. *(Day 36)*

### Acronyms
- **CDP** — Cisco Discovery Protocol.
- **LLDP** — Link Layer Discovery Protocol.
- **TTL** — Time To Live — in CDP/LLDP, this is the holdtime field.
- **TLV** — Type-Length-Value (format used inside the advertisements).

### Commands & Syntax
- `cdp run` / `no cdp run` — globally enables/disables CDP.
- `cdp enable` / `no cdp enable` — enables/disables CDP on a specific interface.
- `cdp timer 60` — sets CDP message interval (default 60 seconds).
- `cdp holdtime 180` — sets how long a neighbor is kept after last BPDU received (default 180 seconds).
- `cdp advertise-v2` — enables CDP version 2 (default).
- `show cdp` — shows CDP timer, holdtime, and version.
- `show cdp traffic` — shows count of CDP packets sent and received.
- `show cdp interface` — shows per-interface CDP status, timer, holdtime, encapsulation.
- `show cdp neighbors` — lists neighbors with device ID, local interface, holdtime, capability codes, platform, port ID.
- `show cdp neighbors detail` — includes software version, native VLAN, VTP domain, IP address.
- `show cdp entry R2` — same as `detail` but for one neighbor only.
- `lldp run` / `no lldp run` — globally enables/disables LLDP.
- `lldp transmit` — enables LLDP sending on the interface.
- `lldp receive` — enables LLDP receiving on the interface.
- `lldp timer 30` — sets LLDP message interval (default 30 s).
- `lldp holdtime 120` — sets LLDP holdtime (default 120 s).
- `lldp reinit 2` — sets the reinitialization delay (default 2 s).
- `show lldp` — shows LLDP timers and enable state.
- `show lldp traffic` — shows frames sent and received.
- `show lldp interface` — shows tx/rx state per interface.
- `show lldp neighbors` — lists neighbors with device ID, interface, holdtime, capability, port ID.
- `show lldp neighbors detail` — additionally shows OS version, management address, system and enabled capabilities.
- `show lldp entry SW1` — same as detail but for one neighbor.

### Key Vocabulary
- **Device ID** — host name of the neighbor reported by CDP/LLDP. *(Day 36)*
- **Local interface** — the interface on the local device. *(Day 36)*
- **Port ID** — the interface on the neighboring device. *(Day 36)*
- **Capability codes** — letters indicating device type: CDP uses R (router), S (switch), I (IGMP), B (source-route bridge); LLDP uses R (router), B (bridge) — LLDP has no "switch". *(Day 36)*
- **Holdtime** — time a neighbor is retained after last advertisement (180s CDP / 120s LLDP default). *(Day 36)*
- **System capabilities vs. enabled capabilities** — LLDP separates what the device *can* do from what is currently active (e.g., bridge vs. router functions). *(Day 36)*

---

## 2.4 — Configure and verify EtherChannel (LACP)

### Technologies & Devices
- **EtherChannel / Port Channel / LAG** — bundle of multiple physical interfaces grouped into a single logical interface for increased bandwidth and redundancy. *(Day 23)*
- **Access switch (ASW)** — switch end hosts connect to. *(Day 23)*
- **Distribution switch (DSW)** — switch that access switches connect to. *(Day 23)*
- **Layer 2 EtherChannel** — bundle of switchports operating as a single L2 interface. *(Day 23)*
- **Layer 3 EtherChannel** — bundle of routed ports operating as a single L3 interface with an IP address on the port-channel. *(Day 23)*

### Protocols & Standards
- **PAgP (Port Aggregation Protocol)** — Cisco-proprietary EtherChannel negotiation protocol. *(Day 23)*
- **LACP (Link Aggregation Control Protocol)** — industry-standard EtherChannel negotiation protocol (IEEE 802.3ad). *(Day 23)*
- **Static EtherChannel** — EtherChannel formed manually with no negotiation protocol (mode ON). *(Day 23)*

### Acronyms
- **LAG** — Link Aggregation Group — another name for EtherChannel (used especially with WLCs).
- **PAgP** — Port Aggregation Protocol.
- **LACP** — Link Aggregation Control Protocol.

### Commands & Syntax
- `channel-group 1 mode active` — adds interface to port-channel 1 using LACP active (actively negotiates).
- `channel-group 1 mode passive` — LACP passive; only forms if other side is active.
- `channel-group 1 mode desirable` — PAgP desirable; actively negotiates.
- `channel-group 1 mode auto` — PAgP auto; passive.
- `channel-group 1 mode on` — static EtherChannel; no negotiation protocol.
- `channel-protocol lacp` / `channel-protocol pagp` — manually locks the interface to a specific negotiation protocol.
- `port-channel load-balance src-dst-ip` — configures load-balancing method (options vary: src-mac, dst-mac, src-dst-mac, src-ip, dst-ip, src-dst-ip, plus L4 ports on some platforms).
- `show etherchannel summary` — status of all port-channels (flags: S = L2, R = L3 routed, U = in use, P = bundled, D = down, s = suspended).
- `show etherchannel load-balance` — shows current load-balancing method.
- `show etherchannel port-channel` — detailed per-port-channel info including negotiation mode.
- `interface port-channel 1` — enters port-channel interface config mode (to assign IP, set trunk mode, etc.).

### Key Vocabulary
- **Flow** — a communication between two endpoints; EtherChannel load-balances at the flow level so frames in one flow always use the same physical link. *(Day 23)*
- **Member interface** — a physical interface that belongs to an EtherChannel; all member interfaces must match in speed, duplex, switchport mode, allowed VLANs, and native VLAN. *(Day 23)*
- **Oversubscription** — when total host-facing bandwidth exceeds the uplink bandwidth; some oversubscription is acceptable, too much causes congestion. *(Day 23)*
- **Valid LACP combinations** — active/active or active/passive form a channel; passive/passive does not.
- **Valid PAgP combinations** — desirable/desirable or desirable/auto form a channel; auto/auto does not.
- **LACP 16-port rule** — LACP allows up to 16 ports in a group, but only 8 active at a time; the others are hot standby.

---

## 2.5 — Interpret basic operations of Spanning Tree Protocols (RSTP, PVST+, PortFast, BPDU Guard, root/secondary bridge)

### Technologies & Devices
- **Bridge** — legacy term still used in STP; in modern terms, "bridge" means "switch." *(Day 20)*
- **Root bridge** — single switch in the STP topology with the lowest bridge ID; all its ports are designated/forwarding. *(Day 20)*
- **Hub** — legacy Layer 1 device; shared-link type in RSTP (half-duplex, shared collision domain). *(Day 22)*
- **Secondary root bridge** — switch configured with the second-lowest priority; takes over as root if the primary fails. *(Day 21)*

### Protocols & Standards
- **STP / Classic Spanning Tree** — IEEE 802.1D; prevents Layer 2 loops by blocking redundant ports; slow (up to 50 s convergence). *(Day 20)*
- **PVST (Per-VLAN Spanning Tree)** — Cisco-proprietary; runs a separate STP instance per VLAN; original version supported only ISL. *(Day 20)*
- **PVST+** — Cisco-proprietary upgrade to PVST adding dot1q trunk support; runs one STP instance per VLAN. *(Day 20)*
- **RSTP (Rapid Spanning Tree)** — IEEE 802.1w; improved STP with much faster convergence using a negotiation handshake. *(Day 22)*
- **Rapid PVST+** — Cisco's upgrade to 802.1w; runs rapid STP per VLAN; default on modern Cisco switches. *(Day 22)*
- **MSTP (Multiple Spanning Tree)** — IEEE 802.1s; maps multiple VLANs to a few STP instances for scalable load balancing. *(Day 22)*

### Acronyms
- **STP** — Spanning Tree Protocol.
- **RSTP** — Rapid Spanning Tree Protocol.
- **PVST / PVST+** — Per-VLAN Spanning Tree (+).
- **MSTP** — Multiple Spanning Tree Protocol.
- **BPDU** — Bridge Protocol Data Unit — STP message exchanged between switches.
- **BID** — Bridge ID — priority + extended system ID + MAC address; lowest wins root election.
- **TCN** — Topology Change Notification (BPDU type).
- **NIC** — Network Interface Card.

### Commands & Syntax
- `spanning-tree mode pvst` — runs classic PVST+.
- `spanning-tree mode rapid-pvst` — runs Rapid PVST+ (default on modern Cisco switches).
- `spanning-tree mode mst` — runs Multiple Spanning Tree.
- `spanning-tree vlan 1 root primary` — sets this switch as root for VLAN 1 (priority 24576 or 4096 below current root).
- `spanning-tree vlan 1 root secondary` — sets this switch as secondary root (priority 28672).
- `spanning-tree vlan 1 priority 4096` — manually sets STP priority (must be multiple of 4096).
- `spanning-tree vlan 1 cost 19` — sets port path cost for the VLAN.
- `spanning-tree vlan 1 port-priority 128` — sets port priority (increments of 32).
- `spanning-tree portfast` — enables PortFast on an access port (actually `spanning-tree portfast edge` in newer IOS).
- `spanning-tree portfast default` — globally enables PortFast on all access ports.
- `spanning-tree portfast trunk` — enables PortFast on a trunk (ROAS or VM server use cases).
- `spanning-tree portfast disable` — disables PortFast on a specific interface.
- `spanning-tree bpduguard enable` — enables BPDU Guard on an interface.
- `spanning-tree portfast bpduguard default` — enables BPDU Guard on all PortFast-enabled ports.
- `spanning-tree bpdufilter enable` — per-port BPDU Filter: stops sending and ignores received BPDUs (disables STP on the port; dangerous).
- `spanning-tree portfast bpdufilter default` — default-mode BPDU Filter: doesn't send BPDUs but reverts to normal STP if one is received.
- `spanning-tree guard root` — enables Root Guard on the interface.
- `spanning-tree guard loop` — enables Loop Guard on the interface.
- `spanning-tree loopguard default` — enables Loop Guard by default on all ports.
- `spanning-tree guard none` — disables guard features on the interface.
- `spanning-tree link-type point-to-point` — explicitly sets RSTP link type to point-to-point.
- `spanning-tree link-type shared` — explicitly sets RSTP link type to shared (half-duplex/hub).
- `errdisable recovery cause bpduguard` — auto-recovers ports err-disabled by BPDU Guard.
- `errdisable recovery interval 300` — sets auto-recovery timer (default 300 s / 5 min).
- `show spanning-tree` — shows STP state, root bridge info, per-port role/state.
- `show spanning-tree interface g0/1 detail` — per-interface details including PortFast, BPDU Guard, Loop Guard status, BPDU counts.
- `show errdisable recovery` — shows which causes will auto-recover and remaining timers.
- `shutdown` / `no shutdown` — manual re-enable method for err-disabled ports (after fixing the root cause).

### Key Vocabulary
- **Broadcast storm** — uncontrolled looping broadcasts in a Layer 2 network caused by redundant paths without STP; can saturate the network. *(Day 20)*
- **MAC address flapping** — entries in the MAC table repeatedly changing port due to looped frames arriving on different interfaces. *(Day 20)*
- **Bridge ID** — priority (16 bits) + system MAC (48 bits); with PVST+, priority = bridge priority (4 bits, multiples of 4096) + extended system ID (12-bit VLAN). *(Day 20)*
- **Extended system ID** — the 12-bit VLAN ID added to the bridge priority under PVST+. *(Day 20)*
- **Root port** — non-root switch's one port with the lowest root cost toward the root bridge; always forwarding. *(Day 20)*
- **Designated port** — one port per collision domain/segment that advertises the best path to the root; always forwarding. *(Day 20)*
- **Non-designated port** — STP-blocking port that lost the designated election. *(Day 20)*
- **Root cost / path cost** — cumulative cost of outgoing interfaces along the path to the root bridge; classic STP: 10M=100, 100M=19, 1G=4, 10G=2. RSTP: 10M=2M, 100M=200k, 1G=20k, 10G=2k, 100G=200, 1T=20. *(Day 20, Day 22)*
- **Port ID (STP)** — port priority (default 128) + port number; final tie-breaker after root cost and neighbor bridge ID. *(Day 20)*
- **BPDU** — Bridge Protocol Data Unit; Hello BPDUs are sent every 2s by default; carry root ID, root cost, sender ID, timers, flags. *(Day 20)*
- **Hello timer** — 2 s default; how often the root sends BPDUs. *(Day 21)*
- **Forward delay timer** — 15 s default; length of Listening and Learning states (15 s each). *(Day 21)*
- **Max age timer** — 20 s default; how long a switch keeps BPDU info before reconsidering topology. *(Day 21)*
- **Blocking state** — stable state of non-designated port; receives BPDUs, does not forward traffic or learn MACs. *(Day 21)*
- **Listening state** — transitional state; processes BPDUs only, doesn't learn MACs. *(Day 21)*
- **Learning state** — transitional state; processes BPDUs and learns MACs, still not forwarding data. *(Day 21)*
- **Forwarding state** — normal operational state; sends/receives all traffic and learns MACs. *(Day 21)*
- **Disabled state** — administratively shut down. *(Day 21)*
- **Discarding state** — RSTP state combining blocking/listening/disabled. *(Day 22)*
- **Superior BPDU** — a BPDU with a lower bridge ID or lower root cost than the one currently held. *(Day 21)*
- **Inferior BPDU** — a BPDU worse than the one currently held; ignored under normal rules. *(Day 22)*
- **PortFast** — STP optional feature; skips Listening/Learning so the port enters Forwarding immediately; only for end-host ports (or routers / VM servers via `portfast trunk`). *(Day 21 p1)*
- **PortFast Edge vs Network** — modern IOS auto-adds `edge`; edge is the CCNA version; network is for Bridge Assurance. *(Day 21 p1)*
- **BPDU Guard** — STP optional feature; if a BPDU Guard-enabled port receives any BPDU, it is err-disabled immediately; protects PortFast ports from rogue switches. *(Day 21 p2)*
- **BPDU Filter** — prevents a port from sending BPDUs; per-port version also ignores received BPDUs (disables STP — dangerous); default-mode version reverts to normal STP if a BPDU arrives. *(Day 21 p2)*
- **Root Guard** — if a designated port receives a superior BPDU, it enters broken (root inconsistent) state; enforces root bridge location (e.g., provider-to-customer ports). *(Day 21 p3)*
- **Loop Guard** — if a non-designated/root port unexpectedly stops receiving BPDUs, it enters broken (loop inconsistent) state instead of becoming designated; protects against unidirectional links. *(Day 21 p4)*
- **Unidirectional link** — link that can transmit in only one direction (often fiber damage); can cause STP to mistakenly unblock a port. *(Day 21 p4)*
- **Err-disabled** — Cisco port state for violations (BPDU Guard, port security, DAI, etc.); recovered by shut/no-shut or ErrDisable Recovery. *(Day 21 p2)*
- **ErrDisable Recovery** — feature that auto-re-enables err-disabled ports after a timer (default 300 s). *(Day 21 p2)*
- **Alternate port (RSTP)** — discarding port that receives a superior BPDU from another switch; serves as backup for the root port. *(Day 22)*
- **Backup port (RSTP)** — discarding port that receives a superior BPDU from the same switch (via a hub); backup for a designated port. *(Day 22)*
- **Edge port (RSTP)** — link type for ports connected to end hosts; configured by enabling PortFast; skips listening/learning. *(Day 22)*
- **Point-to-point link (RSTP)** — full-duplex link between two switches. *(Day 22)*
- **Shared link (RSTP)** — half-duplex link to a hub. *(Day 22)*
- **UplinkFast** — legacy STP optional feature; built into RSTP — instant root-port failover. *(Day 22)*
- **BackboneFast** — legacy STP optional feature; built into RSTP — immediate max-age expiry on indirect failures. *(Day 22)*
- **PVST+ destination MAC** — `0100.0CCC.CCCD`. *(Day 21)*
- **Regular STP destination MAC** — `0180.C200.0000`. *(Day 21)*
- **STP BPDU version numbers** — 0 = classic 802.1D STP, 2 = RSTP 802.1w. *(Day 22)*
- **Broken (root inconsistent / loop inconsistent)** — blocked-by-guard states; port is up but not forwarding; recovers automatically when the trigger stops. *(Day 21 p3, p4)*

---

## 2.6 — Describe Cisco Wireless Architectures and AP modes

### Technologies & Devices
- **Access Point (AP)** — wireless device that bridges 802.11 wireless clients to an 802.3 wired network. *(Day 56)*
- **Autonomous AP** — standalone AP; self-contained, each configured individually; connects via trunk to carry multiple VLANs. *(Day 56)*
- **Lightweight AP** — AP that relies on a WLC; handles only real-time radio operations; connects via access port and tunnels traffic to the WLC. *(Day 56)*
- **Cloud-based AP** — AP centrally managed via a cloud service (e.g., Cisco Meraki); management traffic goes to cloud, data traffic stays local. *(Day 56)*
- **Wireless LAN Controller (WLC)** — centralized controller that manages lightweight APs using split-MAC architecture. *(Day 56)*
- **Unified WLC** — hardware-appliance WLC in a central location; supports up to ~6000 APs; suited to large enterprise campus. *(Day 56)*
- **Cloud-based WLC** — WLC running as a VM in a (usually private) data-center cloud; supports ~3000 APs. *(Day 56)*
- **Embedded WLC** — WLC integrated into a switch; supports ~200 APs; suited to smaller campuses. *(Day 56)*
- **Cisco Mobility Express** — WLC functionality embedded in an AP itself; supports ~100 APs; suited to branch offices. *(Day 56)*

### Protocols & Standards
- **CAPWAP (Control And Provisioning of Wireless Access Points)** — protocol between lightweight APs and WLC; control tunnel uses **UDP 5246** (encrypted), data tunnel uses **UDP 5247**. *(Day 56)*
- **LWAPP (Lightweight AP Protocol)** — older protocol that CAPWAP is based on. *(Day 56)*
- **DTLS (Datagram TLS)** — UDP-based TLS; optionally encrypts the CAPWAP data tunnel. *(Day 56)*
- **X.509** — certificate standard used for mutual authentication between APs and the WLC. *(Day 56)*
- **Split-MAC architecture** — division of 802.11 MAC-layer functions between lightweight AP (real-time) and WLC (management/control). *(Day 56)*

### Acronyms
- **AP** — Access Point.
- **WLC** — Wireless LAN Controller.
- **CAPWAP** — Control And Provisioning of Wireless Access Points.
- **LWAPP** — Lightweight Access Point Protocol.
- **BSS** — Basic Service Set — single AP coverage area.
- **SSID** — Service Set Identifier — wireless network name.
- **RF** — Radio Frequency.
- **DTLS** — Datagram Transport Layer Security.
- **VHT** — Very High Throughput (Wi-Fi 5 / 802.11ac).
- **HT** — High Throughput (Wi-Fi 4 / 802.11n).

### Commands & Syntax
- *(Lightweight AP / WLC configuration is done via the GUI; see 2.9.)*

### Key Vocabulary
- **Local mode** — default lightweight AP mode; offers one or more BSSs and tunnels traffic to the WLC. *(Day 56)*
- **FlexConnect mode** — lightweight AP mode that lets the AP locally switch traffic if the CAPWAP tunnel to the WLC goes down. *(Day 56)*
- **Sniffer mode** — AP captures 802.11 frames and forwards to packet-capture software (e.g., Wireshark). *(Day 56)*
- **Monitor mode** — AP listens for rogue devices and does not offer a BSS. *(Day 56)*
- **Rogue detector mode** — AP does not use its radio; listens on the wired side (ARP traffic) and correlates with WLC's rogue list. *(Day 56)*
- **SE-Connect mode** — Spectrum Expert connect; RF spectrum analysis to find interference sources. *(Day 56)*
- **Bridge / Mesh mode** — AP acts as a dedicated bridge between sites or forms a wireless mesh. *(Day 56)*
- **Flex + Bridge mode** — bridge/mesh mode plus FlexConnect local switching. *(Day 56)*
- **Probe request / response** — 802.11 management frames used in active scanning. *(Day 56)*
- **Beacon** — 802.11 management frame periodically broadcast by an AP to advertise the BSS (used by passive scanning). *(Day 56)*
- **Association** — state where a station is authenticated and joined to the AP and can send/receive data. *(Day 56)*
- **802.11 management frames** — beacons, probes, authentication, association. *(Day 56)*
- **802.11 control frames** — RTS, CTS, ACK. *(Day 56)*
- **802.11 data frames** — carry actual user traffic. *(Day 56)*
- **HA pair** — two WLCs connected via redundancy ports; one active, one standby. *(Day 58)*

---

## 2.7 — Describe physical infrastructure connections of WLAN components (AP, WLC, access/trunk ports, LAG)

### Technologies & Devices
- **Service port (WLC)** — dedicated management port for out-of-band management; supports one VLAN only; connects to a switch access port. *(Day 58)*
- **Distribution system port (WLC)** — standard data-plane network port on the WLC; connects to a switch trunk port; multiple can be combined into a LAG. *(Day 58)*
- **Redundancy port (WLC)** — port used to connect two WLCs to form an HA pair. *(Day 58)*
- **Console port (WLC)** — RJ-45 or USB port used for out-of-band CLI access. *(Day 58)*
- **PoE (Power over Ethernet)** — delivers power to APs (or WLCs) over the same Ethernet cable that carries data. *(Day 58)*

### Protocols & Standards
- **LAG (Link Aggregation Group)** — bundles multiple distribution-system ports into a single logical interface; WLCs support **static LAG only** (mode on; no LACP/PAgP). *(Day 58)*
- **802.1Q** — used to tag VLANs on trunk links between WLC and switch, and between switches carrying autonomous-AP traffic.

### Acronyms
- **PoE** — Power over Ethernet.
- **LAG** — Link Aggregation Group.
- **SVI** — Switch Virtual Interface.
- **BSS** — Basic Service Set.

### Commands & Syntax
- `channel-group 1 mode on` — required WLC-facing LAG config on the switch (static only).
- `interface port-channel 1` → `switchport mode trunk` / `switchport trunk allowed vlan 10,100,200` — trunk config on the switch-to-WLC LAG.
- `switchport mode access` → `switchport access vlan 10` — switch access-port config for the AP side.
- `ip dhcp pool VLAN10` / `option 43 ip 192.168.1.100` — DHCP option 43 to advertise the WLC's IP address to lightweight APs (needed when WLC is in a different subnet).
- `ntp master` — configures a switch as an NTP server for WLC/AP time sync.

### Key Vocabulary
- **Management VLAN** — dedicated VLAN used only for device management traffic (WLC, APs, switches); kept separate from data traffic. *(Day 58)*
- **Autonomous AP connection** — trunk link to switch carrying one VLAN per SSID plus management VLAN. *(Day 56)*
- **Lightweight AP connection** — access port on the switch; all traffic is tunneled to the WLC via CAPWAP. *(Day 56)*
- **Trunk to WLC** — required; must allow the management VLAN plus every VLAN mapped to a WLAN on the WLC. *(Day 58)*
- **Stretched VLAN (bad practice)** — the same VLAN spanning the whole LAN (required with autonomous APs); causes large broadcast domains and STP-blocked links. *(Day 56)*

---

## 2.8 — Describe AP/WLC management access connections (Telnet, SSH, HTTP, HTTPS, console, TACACS+/RADIUS, Cloud-managed)

### Technologies & Devices
- **Out-of-band management** — management traffic carried on a separate physical interface from data traffic (e.g., WLC service port). *(Day 58)*
- **Cloud-managed** — management via a cloud dashboard (e.g., Cisco Meraki) rather than local CLI/GUI. *(Day 56)*

### Protocols & Standards
- **Telnet** — legacy cleartext CLI access; disabled by default on WLC. *(Day 58)*
- **SSH** — encrypted CLI access; enabled by default on WLC. *(Day 58)*
- **HTTP / HTTPS** — web-GUI access to WLC; HTTPS uses TLS with the WLC's certificate. *(Day 58)*
- **Console** — direct RJ-45 or USB serial access; only way to reach WLC before an IP address is configured. *(Day 58)*
- **TACACS+** — Cisco AAA protocol for admin authentication/authorization/accounting.
- **RADIUS** — industry-standard AAA protocol used for 802.1X client auth and admin login.
- **SNMPv1/v2/v3** — network-management protocol; v3 adds authentication/encryption; configurable in WLC Management tab. *(Day 58)*
- **Syslog** — logging protocol for forwarding messages to a log server. *(Day 58)*

### Acronyms
- **AAA** — Authentication, Authorization, Accounting.
- **RADIUS** — Remote Authentication Dial-In User Service.
- **TACACS+** — Terminal Access Controller Access-Control System Plus.
- **SNMP** — Simple Network Management Protocol.

### Commands & Syntax
- *(WLC management settings are toggled in the Management tab of the GUI.)*
- CPU ACLs — built in the GUI under **Security → Access Control Lists**; applied via **Security → CPU Access Control Lists** to limit traffic destined for the WLC itself (management traffic only, not transit traffic). *(Day 58)*

### Key Vocabulary
- **Management via wireless** — WLC setting (disabled by default) that controls whether a wireless client can reach the WLC's management interface. *(Day 58)*
- **CPU ACL** — ACL applied to the WLC CPU to restrict which devices can open Telnet/SSH/HTTP/HTTPS/SNMP sessions to the WLC. *(Day 58)*
- **Certificate authority invalid warning** — browser warning seen when the WLC presents a self-signed certificate; benign on a local trusted network. *(Day 58)*

---

## 2.9 — Interpret the wireless LAN GUI configuration for client connectivity (WLAN creation, security, QoS, advanced WLAN settings)

### Technologies & Devices
- **Management interface (WLC)** — virtual interface used for management traffic (Telnet/SSH/HTTP/HTTPS, NTP, RADIUS, Syslog); also the endpoint of CAPWAP tunnels with APs. *(Day 58)*
- **Redundancy management interface** — used to manage the standby WLC in an HA pair. *(Day 58)*
- **Virtual interface** — IP on the WLC used for DHCP relay, web auth, etc. *(Day 58)*
- **Service port interface** — logical interface bound to the physical service port for out-of-band management. *(Day 58)*
- **Dynamic interface** — WLC logical interface that maps a WLAN to a wired VLAN; each WLAN normally maps to one dynamic interface. *(Day 58)*

### Protocols & Standards
- **WPA / WPA2 / WPA3** — Wi-Fi security suites; CCNA focuses on WPA2. *(Day 58)*
- **WPA2-Personal (PSK)** — uses a pre-shared key for authentication. *(Day 58)*
- **WPA2-Enterprise (802.1X)** — uses a RADIUS server for per-user authentication. *(Day 58)*
- **WEP** — legacy, insecure wireless security; listed as an option on older WLC but should not be used.
- **802.1X** — port-based network access control used in WPA-Enterprise. *(Day 58)*
- **Web Authentication** — Layer 3 security on WLC; requires user to enter credentials on a web portal. *(Day 58)*
- **Web Passthrough** — Layer 3 security that shows a splash/terms page, no credentials. *(Day 58)*

### Acronyms
- **WLAN** — Wireless LAN (also used by WLC as the term for the SSID-backed network).
- **SSID** — Service Set Identifier.
- **PSK** — Pre-Shared Key.
- **ASCII / HEX** — formats for entering the PSK (ASCII PSK must be ≥8 characters).
- **QoS** — Quality of Service.

### Commands & Syntax
- *(Configuration is GUI-based on the WLC.)*
- Setup wizard fields: system name, admin username/password, enable LAG (yes/NO), management interface (IP, mask, gateway, VLAN, DHCP server), virtual gateway IP, multicast IP, mobility/RF group, first SSID, country code, 802.11b/a/g enable, auto-RF, NTP server.
- Create a dynamic interface: **Controller → Interfaces → New** → Name/VLAN → IP/mask/gateway/DHCP server.
- Create a WLAN: **WLANs → Create New → Go** → Profile name, SSID, ID → enable and map to dynamic interface.
- Security → Layer 2: pick **WPA+WPA2**, then under Authentication Key Management untick 802.1X and tick **PSK**, pick ASCII, enter password (≥8 chars).
- QoS tab: Platinum (voice) / Gold (video) / Silver (best-effort default) / Bronze (background).

### Key Vocabulary
- **Profile name vs SSID** — profile name identifies the WLAN on the WLC; SSID is broadcast on air; typically identical but can differ. *(Day 58)*
- **Map WLAN to VLAN** — done by selecting a dynamic interface when editing the WLAN's General tab. *(Day 58)*
- **Layer 2 Security** — WPA/WPA2/WPA3, 802.1X, WEP, etc. — configured in the Security → Layer 2 sub-tab. *(Day 58)*
- **Layer 3 Security** — Web Authentication, Web Passthrough, conditional/splash redirects. *(Day 58)*
- **DHCP bridging mode** — makes the WLC transparent for DHCP; disabled by default. *(Day 58)*
- **Allow static IP addresses** — lets clients use static IPs instead of DHCP. *(Day 58)*
- **Regulatory domain** — letter code in the AP model (e.g., `-A` Americas, `-E` Europe); the WLC's country setting must match or the AP won't join. *(Day 58)*
- **Auto-RF** — WLC automatically picks channels and transmit power per AP. *(Day 58)*
- **QoS profiles (Platinum/Gold/Silver/Bronze)** — WLC QoS levels; Platinum=voice, Gold=video, Silver=best effort (default), Bronze=background. *(Day 58)*
- **Clients page** — **Monitor → Clients** lists associated clients, IP, AP, SSID. *(Day 58)*
