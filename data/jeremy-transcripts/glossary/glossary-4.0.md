# Domain 4.0 — IP Services Glossary

Source: Jeremy's IT Lab — Free CCNA v1.1 200-301 Complete Course
Scope: 9 sub-objectives, 22 videos

## 4.1 — Configure and verify inside source NAT using static and pools

### Technologies & Devices
- **NAT (Network Address Translation)** — modifies the source and/or destination IP address of a packet to a different IP address. *(Day 44)*
- **Source NAT** — translates the source IP address of a packet; the NAT type required for the CCNA.
- **Destination NAT** — changes the destination IP of a packet; beyond the scope of the CCNA.
- **Static NAT** — statically configured one-to-one mapping of a private (inside local) IP to a public (inside global) IP; mappings are permanent.
- **Dynamic NAT** — router dynamically maps inside local addresses to inside global addresses from a pool as needed; mappings are one-to-one but temporary. *(Day 45)*
- **PAT (Port Address Translation) / NAT Overload** — translates both the IP address and the port number, allowing many inside hosts to share a single public IP address.
- **NAT pool** — a defined range of inside global (public) IP addresses the router can use for dynamic NAT translations.
- **NAT pool exhaustion** — when all inside global addresses in a dynamic NAT pool are in use; new packets needing NAT are dropped.
- **ISP (Internet Service Provider)** — drops traffic to or from private IP addresses on the Internet.
- **RFC (Request For Comments)** — IETF documents that define standards for the Internet.

### Protocols & Standards
- **RFC 1918** — specifies the private IPv4 address ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.
- **CIDR (Classless Inter-Domain Routing)** — removes rigid address classes; any prefix length can be used with any address.

### Acronyms
- **NAT** — Network Address Translation — translates IP addresses in packet headers.
- **PAT** — Port Address Translation — NAT that also translates ports.
- **CIDR** — Classless Inter-Domain Routing — prefix-based addressing.
- **ACL** — Access Control List — used in dynamic NAT/PAT to identify which traffic to translate (not to drop).

### Commands & Syntax
- `ip nat inside` — marks the interface as the internal-facing NAT interface.
- `ip nat outside` — marks the interface as the external-facing NAT interface.
- `ip nat inside source static <inside-local> <inside-global>` — configures a static one-to-one NAT mapping.
- `ip nat pool <name> <start-ip> <end-ip> prefix-length <n>` — defines a pool of inside global addresses; range must sit in one subnet.
- `ip nat pool <name> <start-ip> <end-ip> netmask <mask>` — alternate form using a netmask instead of prefix length.
- `ip nat inside source list <acl> pool <name>` — dynamic NAT mapping an ACL to a pool.
- `ip nat inside source list <acl> pool <name> overload` — dynamic PAT using a pool of public addresses.
- `ip nat inside source list <acl> interface <if> overload` — dynamic PAT using the outside interface's IP as the global address.
- `show ip nat translations` — shows the NAT translation table with inside/outside local/global columns.
- `show ip nat statistics` — shows active translations, peak translations, inside/outside interfaces, pool-to-ACL mapping.
- `clear ip nat translation *` — clears all dynamic NAT translations; static entries remain.

### Key Vocabulary
- **inside local** — IP address of an inside host from the perspective of the inside network (usually private, the address actually configured on the host).
- **inside global** — IP address of an inside host from the perspective of the outside network (usually public, the host's address after NAT).
- **outside local** — IP address of an outside host from the perspective of the inside network.
- **outside global** — IP address of an outside host from the perspective of the outside network (actual address configured on the outside host).
- **private IPv4 addresses** — addresses reserved by RFC 1918 for internal use; cannot be routed on the Internet.
- **public IP address** — globally unique IP address that must be registered to you; usable on the Internet.
- **one-to-one mapping** — single inside local maps to a single inside global; true of both static and dynamic NAT.
- **many-to-one mapping** — many inside locals share one inside global; characteristic of PAT.
- **sliding window / ephemeral port** — random source port selected by a client; PAT may rewrite it to keep flows unique.

## 4.2 — Configure and verify NTP operating in client and server mode

### Technologies & Devices
- **NTP (Network Time Protocol)** — synchronizes device clocks over a network to NTP servers. *(Day 37)*
- **Hardware calendar** — the device's built-in hardware clock; default time source (marked with an asterisk in `show clock detail` as not authoritative); drifts over time.
- **Software clock** — the clock in the device's software; separate from the hardware calendar but can be synced to it.
- **Reference clock** — highly accurate time source like an atomic clock or GPS clock; stratum 0 within the NTP hierarchy.
- **NTP client** — device that requests time from an NTP server and syncs its clock to the server's time.
- **NTP server** — device that provides time to NTP clients; a device can be client and server simultaneously.
- **Primary server** — stratum 1 NTP server, syncs directly to a reference clock.
- **Secondary server** — NTP server (stratum 2 or higher) that gets time from another NTP server; acts as both client and server.
- **NTP peer (symmetric active mode)** — two devices at the same stratum peer with each other to help sync time and act as backups.
- **NTP master** — Cisco command that configures a device to operate as an NTP server without being synced to another server.
- **Loopback interface** — virtual interface used as the NTP source so the server is reachable even if a physical interface fails.
- **Loopback address** — any address in 127.0.0.0/8; internal to the local device only (used by `ntp master`, displayed as 127.127.1.1).

### Protocols & Standards
- **UTC (Coordinated Universal Time)** — default time zone on Cisco devices; the only time zone NTP uses (time zone conversion is done per device).
- **JST / EST / EDT** — examples of named time zones; offset from UTC is configured per device.
- **Daylight Saving Time / Summer Time** — seasonal clock adjustment; Cisco devices can recur it automatically.

### Acronyms
- **NTP** — Network Time Protocol — clock synchronization protocol using UDP port 123.
- **UTC** — Coordinated Universal Time — default Cisco timezone.
- **MD5** — Message-Digest 5 — hash used for NTP authentication keys.

### Commands & Syntax
- `show clock` — displays current time on the device.
- `show clock detail` — shows the time source (hardware calendar / user configuration / NTP).
- `clock set <hh:mm:ss> <day> <month> <year>` — manually sets the software clock (privileged exec).
- `calendar set <hh:mm:ss> <day> <month> <year>` — manually sets the hardware calendar (privileged exec).
- `clock update-calendar` — syncs the calendar to the software clock's time.
- `clock read-calendar` — syncs the software clock to the calendar's time.
- `clock timezone <name> <offset-hours> [offset-minutes]` — sets time zone (global config).
- `clock summer-time <name> recurring <week> <weekday> <month> <time> <week> <weekday> <month> <time>` — configures DST.
- `ntp server <ip> [prefer]` — configures this device as a client of the specified NTP server.
- `ntp peer <ip>` — configures symmetric active peering with another NTP device.
- `ntp master [stratum]` — makes the device its own NTP master; default stratum is 8.
- `ntp source <interface>` — sets the source interface/IP for NTP messages (often loopback).
- `ntp update-calendar` — updates the hardware calendar with NTP-learned time.
- `ntp authenticate` — enables NTP authentication.
- `ntp authentication-key <n> md5 <key>` — defines an authentication key.
- `ntp trusted-key <n>` — marks a key as trusted.
- `ntp server <ip> key <n>` — uses the specified key when talking to the server.
- `show ntp associations` — shows configured NTP servers, with `*` for the sys.peer, `+` for candidates, `~` for configured.
- `show ntp status` — shows clock sync state, device's stratum, and reference clock address.

### Key Vocabulary
- **stratum** — distance of an NTP server from the reference clock; lower is more accurate; stratum 15 is the max usable, 16+ unreliable.
- **authoritative time** — time the device is confident in; asterisk in `show clock detail` means *not* authoritative.
- **sys.peer** — the NTP server currently selected for sync (marked with asterisk in `show ntp associations`).
- **outlier / falseticker** — NTP association state indicating the device won't sync to that server.
- **symmetric active mode** — NTP peering mode between equal-stratum devices.
- **NTP client mode** — configured via `ntp server`; the device syncs to a specified server.
- **NTP server mode** — enabled automatically whenever the device is synced (or `ntp master` is used).
- **static client mode** — the standard NTP client type enabled by `ntp server`.

## 4.3 — Explain the role of DHCP and DNS within the network

### Technologies & Devices
- **DNS (Domain Name System)** — resolves human-readable names (e.g., youtube.com) to IP addresses. *(Day 38)*
- **DNS server** — answers DNS queries with IP addresses; can be external (Google's 8.8.8.8) or internal (Windows/Linux/Cisco router).
- **DNS client / resolver** — device that sends DNS queries to learn IP addresses.
- **DNS cache** — local cache of resolved name-to-IP mappings to avoid repeated queries.
- **Hosts file** — simple local list of hostname-to-IP mappings; alternative to DNS; on Windows at `C:\Windows\System32\drivers\etc\hosts`.
- **Domain name** — realm of administrative control (e.g., `google.com`, `jeremysitlab.com`).
- **FQDN (Fully Qualified Domain Name)** — host name + DNS domain name (e.g., `SW1.jeremysitlab.com`).
- **DHCP (Dynamic Host Configuration Protocol)** — lets hosts automatically learn IP address, subnet mask, default gateway, DNS server, etc. *(Day 39)*
- **DHCP server** — assigns IP addresses and other parameters from a configured pool.
- **DHCP client** — device that uses DHCP to get an IP address (PCs, phones, etc.).
- **DHCP relay agent** — router that forwards broadcast DHCP messages from local clients to a centralized DHCP server on another subnet as unicast.
- **Centralized DHCP server** — single server providing DHCP services across many subnets; requires relay agents.
- **DHCP pool** — range of IP addresses (plus DNS, gateway, lease time, etc.) available to hand out for a given subnet.
- **DHCP binding** — record of an IP address currently leased to a specific client (MAC).
- **Bootp** — predecessor to DHCP; still referenced in the DHCP message "Bootp flags" field.

### Protocols & Standards
- **A record** — DNS record mapping a name to an IPv4 address.
- **AAAA (quadruple A) record** — DNS record mapping a name to an IPv6 address.
- **CNAME (Canonical Name) record** — DNS record that maps a name to another name.
- **MX record** — mail exchange DNS record (mentioned in ecosystem context).
- **DHCP Discover** — broadcast message from client asking if any DHCP server is on the LAN.
- **DHCP Offer** — server response offering an IP address and options.
- **DHCP Request** — client's broadcast indicating which offer it accepts.
- **DHCP Ack** — server's acknowledgment; client configures the address after receiving it.
- **DHCP Release** — unicast message from client to server releasing its IP.
- **DORA** — Discover, Offer, Request, Ack — the four-message DHCP lease process.

### Acronyms
- **DNS** — Domain Name System.
- **DHCP** — Dynamic Host Configuration Protocol.
- **FQDN** — Fully Qualified Domain Name.
- **Bootp** — Bootstrap Protocol, predecessor of DHCP.

### Commands & Syntax
- DNS uses UDP port 53 for standard queries; TCP port 53 for messages larger than 512 bytes.
- DHCP server listens on UDP port 67; DHCP client listens on UDP port 68.
- `nslookup <name>` — (Windows) asks the configured DNS server for the IP of a name.
- `ipconfig /all` — (Windows) shows IP address, DNS server, DHCP status, lease times.
- `ipconfig /displaydns` — shows the PC's DNS cache.
- `ipconfig /flushdns` — clears the PC's DNS cache.
- `ipconfig /release` — sends a DHCP Release.
- `ipconfig /renew` — sends a DHCP Discover/Request to get an address.
- `ip dns server` — configures a Cisco router as a DNS server.
- `ip host <name> <ip>` — adds a manual DNS/host entry on the router.
- `ip name-server <ip>` — tells the router which external DNS server to query.
- `ip domain lookup` (or `ip domain-lookup`) — enables DNS queries on the router; default on.
- `ip domain name <name>` — sets the router's default domain name.
- `show hosts` — shows configured and cached host/IP mappings; `temp` flag = learned via DNS.
- `ip dhcp excluded-address <low> <high>` — reserves a range of addresses so DHCP won't hand them out.
- `ip dhcp pool <name>` — creates a DHCP pool.
- `network <addr> <mask|prefix>` — defines the address range for a DHCP pool.
- `default-router <ip>` — sets the default gateway given to clients.
- `dns-server <ip>` — sets the DNS server given to clients.
- `domain-name <name>` — sets the domain name given to clients.
- `lease <days> <hours> <minutes>` or `lease infinite` — sets the DHCP lease duration.
- `show ip dhcp binding` — shows active leases (client IP, MAC, lease expiration).

### Key Vocabulary
- **resolve** — convert a name into an IP address.
- **standard query / standard query response** — the two DNS message types shown in Wireshark.
- **DNS cache** — local name-to-IP store that saves future queries.
- **lease** — duration a DHCP client is allowed to use an assigned IP.
- **preferred address** — the IP a client previously held and requests again on renewal.
- **magic cookie** — a signature field in every DHCP message.
- **DHCP options** — numbered fields carrying extra parameters (e.g., 51 = lease time, 3 = router/default gateway, 6 = DNS server, 53 = message type, 54 = server IP).
- **Bootp flags (unicast / broadcast)** — field the client uses to tell the server how to address its Offer/Ack.

## 4.4 — Explain the function of SNMP in network operations

### Technologies & Devices
- **SNMP (Simple Network Management Protocol)** — framework/protocol used to monitor and manage network devices. *(Day 40)*
- **Managed device** — network device (router, switch, firewall) being managed via SNMP.
- **NMS (Network Management Station / System)** — the SNMP server running the SNMP Manager software.
- **SNMP Manager** — software on the NMS that interacts with SNMP agents.
- **SNMP Agent** — software running on the managed device that interacts with the manager.
- **SNMP Application** — user-facing software on the NMS (e.g., SolarWinds) presenting alerts, stats, charts.
- **MIB (Management Information Base)** — hierarchical structure of variables managed by SNMP on each device.
- **OID (Object ID)** — unique identifier for each variable in the MIB (e.g., sysName for hostname).

### Protocols & Standards
- **SNMPv1** — original version (RFCs 1065/1066/1067); uses community strings in plain text.
- **SNMPv2c** — widely used version 2 variant; reintroduced community strings; added GetBulk.
- **SNMPv3** — current preferred version; supports strong authentication and encryption.

### Acronyms
- **SNMP** — Simple Network Management Protocol.
- **NMS** — Network Management Station / System.
- **MIB** — Management Information Base.
- **OID** — Object Identifier.
- **IETF** — Internet Engineering Task Force, publisher of RFCs.
- **RO / RW** — Read-Only / Read-Write community access.

### Commands & Syntax
- SNMP Agents listen on UDP port 161; SNMP Managers listen on UDP port 162.
- `snmp-server contact <text>` — optional contact info on the agent.
- `snmp-server location <text>` — optional location info on the agent.
- `snmp-server community <string> RO|RW` — defines an SNMP community string and access level.
- `snmp-server host <ip> version 2c <community>` — configures where to send traps and which community to use.
- `snmp-server enable traps <linkdown|linkup|config|...>` — selects which trap types to send.

### Key Vocabulary
- **Get** — NMS request to read one or more variable values from an agent.
- **GetNext** — NMS request to discover the next available OID in the MIB.
- **GetBulk** — (SNMPv2+) efficient bulk version of GetNext.
- **Set** — NMS request to change the value of a variable on an agent.
- **Trap** — unsolicited notification from an agent to the NMS; **unreliable** — no acknowledgment.
- **Inform** — notification from an agent to the NMS that *is* acknowledged with a Response.
- **Response** — reply from agent to manager (for Gets/Sets) or from manager to agent (for Informs).
- **community string** — plain-text password used in SNMPv1 and SNMPv2c; defaults are `public` (RO) and `private` (RW).
- **read class** — message class containing Get, GetNext, GetBulk.
- **write class** — message class containing Set.
- **notification class** — message class containing Trap and Inform.
- **response class** — message class containing Response.
- **managed variables** — e.g., interface status, CPU usage, temperature, hostname, traffic throughput.

## 4.5 — Describe the use of syslog features including facilities and severity levels

### Technologies & Devices
- **Syslog** — industry-standard protocol for logging events (interface up/down, neighbor changes, reboots, config changes). *(Day 41)*
- **Syslog server** — external system that collects Syslog messages from multiple devices.
- **Console line** — terminal line for direct console-port connections; logs to it by default.
- **VTY lines** — virtual terminal lines for Telnet/SSH; logging to VTY is disabled by default.
- **Logging buffer** — area of device RAM that stores log messages; viewable with `show logging`.

### Protocols & Standards
- **RFC 5424** — The Syslog Protocol; notes that severities are subjective and vendors interpret them differently.
- **Facility** — value identifying the process/subsystem that generated the message (e.g., LINK, OSPF, SYS).
- **Severity** — numeric level indicating how serious the event is (0 most severe, 7 least).
- **Mnemonic** — short code describing the event type (e.g., UPDOWN, ADJCHG, CONFIG_I, CLOCKUPDATE).
- **Description** — human-readable detail about what happened.

### Acronyms
- **RFC** — Request For Comments (Syslog defined in RFC 5424).
- **VTY** — Virtual TeleType lines.

### Commands & Syntax
- Syslog servers listen on UDP port 514.
- Severity 0 = Emergency — system unusable.
- Severity 1 = Alert — action must be taken immediately.
- Severity 2 = Critical — critical conditions.
- Severity 3 = Error — error conditions.
- Severity 4 = Warning — warning conditions.
- Severity 5 = Notice / Notification — normal but significant condition.
- Severity 6 = Informational — informational messages.
- Severity 7 = Debugging — debug-level messages.
- Mnemonic: "Every Awesome Cisco Engineer Will Need Ice cream Daily".
- `logging console <level>` — sets the severity threshold for messages displayed on the console.
- `logging monitor <level>` — sets the threshold for messages shown on VTY lines.
- `logging buffered [size] <level>` — enables logging to RAM buffer with given size and level.
- `logging <ip>` / `logging host <ip>` — sends Syslog to an external server.
- `logging trap <level>` — sets the severity threshold sent to the external server.
- `terminal monitor` — (privileged exec) enables Syslog output on the current Telnet/SSH session only.
- `logging synchronous` — (on a line) reprints the command when a log message interrupts typing.
- `service timestamps log datetime` — adds a date/time timestamp to Syslog messages.
- `service timestamps log uptime` — adds an uptime-based timestamp.
- `service sequence-numbers` — adds sequence numbers to Syslog messages.
- `show logging` — displays buffered Syslog messages and logging config.

### Key Vocabulary
- **facility** — origin subsystem of the message (LINK, OSPF, SYS, etc.).
- **severity level** — numeric criticality 0-7; lower number = more severe.
- **timestamp** — time the event occurred (datetime or uptime).
- **sequence number** — optional ordering value for log messages.
- **buffered logging** — log storage in RAM.
- **console logging** — log display on the console port (default on, all levels).
- **monitor logging** — log display on VTY sessions (off by default).
- **trap logging** — log delivery to an external Syslog server.
- **threshold semantics** — specifying a level enables that level *and* all more-severe (lower-numbered) levels.

## 4.6 — Configure and verify DHCP client and relay

### Technologies & Devices
- **DHCP client on a Cisco router** — router interface learns its IP via DHCP (rare, but possible).
- **DHCP relay agent** — router that forwards local broadcast DHCP messages to a remote DHCP server as unicast. *(Day 39 Lab)*
- **Helper address** — IP address of the DHCP server (or other broadcast-based service) the relay agent forwards to.

### Protocols & Standards
- DHCP messages between relay agent and central server are unicast; the agent rewrites the source to its own interface IP.
- `ip helper-address` forwards not only DHCP but several other broadcast-based services.

### Acronyms
- **DHCP** — Dynamic Host Configuration Protocol.

### Commands & Syntax
- `ip address dhcp` — (interface config) configures the interface as a DHCP client.
- `ip helper-address <dhcp-server-ip>` — (interface config, on interface facing clients) configures the router as a DHCP relay agent for that subnet.
- `show ip interface <if>` — verifies the helper address and whether the IP was learned via DHCP.
- `show ip dhcp binding` — (on DHCP server) shows active leases and MAC-to-IP mappings.

### Key Vocabulary
- **DHCP relay agent** — needed when the router is not a DHCP server, DHCP clients are in its LAN, and no other DHCP server is in that LAN.
- **broadcast-to-unicast conversion** — the relay changes broadcast DHCP to unicast aimed at the central server.
- **client-facing interface** — the interface where `ip helper-address` must be configured.

## 4.7 — Explain the forwarding per-hop behavior (PHB) for QoS

### Technologies & Devices
- **QoS (Quality of Service)** — set of tools to apply different treatment to different packets, giving priority to sensitive traffic such as voice and video. *(Day 46)*
- **Converged network** — single IP network carrying voice, video, and data traffic; motivates QoS because traffic types compete for bandwidth.
- **PSTN / POTS** — Public Switched Telephone Network / Plain Old Telephone Service — traditional phone network separate from IP.
- **VoIP (Voice over IP)** — voice traffic encapsulated in IP packets over an IP network.
- **IP phone** — telephone using VoIP; contains a 3-port internal switch (uplink to switch, downlink to PC, internal to phone).
- **Voice VLAN** — VLAN carrying tagged voice traffic from the IP phone, configured alongside an access VLAN on the same switchport.
- **Data VLAN** — access VLAN carrying untagged PC traffic on a port that also has a voice VLAN.
- **PoE (Power over Ethernet)** — supplies DC power to end devices over the same Ethernet cable used for data.
- **PSE (Power Sourcing Equipment)** — typically a switch that supplies power.
- **PD (Powered Device)** — device receiving PoE power (IP phone, AP, IP camera).
- **Cisco ILP (Inline Power)** — Cisco's pre-standard PoE; 7 W per port, uses wire pairs 4/5/7/8.
- **Queue** — buffer holding packets waiting to be forwarded out of an interface.
- **Scheduler** — mechanism that decides which queue is serviced next.
- **Strict priority queue** — queue always serviced first; used for voice/video via LLQ.
- **Jitter buffer** — IP phone's buffer that adds a fixed delay to absorb jitter.

### Protocols & Standards
- **802.1p** — defines use of the PCP (CoS) field in the 802.1Q tag.
- **802.1Q tag / dot1q tag** — VLAN tag in the Ethernet header containing the PCP/CoS field.
- **802.3af** — PoE Type 1 (up to ~15 W).
- **802.3at** — PoE+ Type 2 (~30 W).
- **802.3bt** — PoE Type 3 (up to 60 W) and Type 4 (up to 100 W).
- **RFC 2474** — defines the DSCP field.
- **RFC 4954** — standardizes DiffServ markings (referenced as the marking-guidance RFC).
- **DiffServ (Differentiated Services)** — framework for using the DSCP field for per-hop classification.
- **Per-Hop Behavior (PHB)** — forwarding behavior each hop applies to a DSCP-marked packet.

### Acronyms
- **QoS** — Quality of Service.
- **CoS** — Class of Service (PCP field of the dot1q tag).
- **PCP** — Priority Code Point (3-bit field in dot1q tag; 8 values).
- **ToS** — Type of Service (byte in the IPv4 header).
- **IPP** — IP Precedence (legacy 3-bit field in the ToS byte).
- **DSCP** — Differentiated Services Code Point (6-bit field in the ToS byte; 64 values).
- **ECN** — Explicit Congestion Notification (2 bits of the ToS byte).
- **DF** — Default Forwarding (best-effort marking; DSCP 0).
- **EF** — Expedited Forwarding (low-loss/latency/jitter; DSCP 46; typically voice).
- **AF** — Assured Forwarding (12 values across 4 classes × 3 drop precedences).
- **CS** — Class Selector (8 DSCP values for backward compatibility with IPP).
- **PHB** — Per-Hop Behavior.
- **NBAR** — Network Based Application Recognition (Layer 7 deep packet inspection for classification).
- **RED** — Random Early Detection (drops random packets before queue fills).
- **WRED** — Weighted Random Early Detection (drops based on traffic class / drop precedence).
- **FIFO** — First In First Out (default queuing discipline).
- **CBWFQ** — Class-Based Weighted Fair Queuing (weighted round-robin with guaranteed minimum bandwidth per queue).
- **LLQ** — Low Latency Queuing (CBWFQ + a strict priority queue for voice/video).
- **UPoE** — Universal Power over Ethernet (Cisco pre-standard predecessor of 802.3bt).

### Commands & Syntax
- `switchport voice vlan <id>` — configures a voice VLAN on an access port. *(Day 46 Lab)*
- `switchport access vlan <id>` — configures the data (access) VLAN.
- `show interfaces <if> switchport` — verifies access/voice VLAN assignment and operational mode.
- `show interfaces trunk` — confirms a port is not a trunk despite carrying voice + data VLANs.
- `power inline police` — enables PoE power policing; default action is err-disable.
- `power inline police action err-disable` — shuts the port down if the PD exceeds its power budget (same as default).
- `power inline police action log` — only logs and restarts the interface if the PD exceeds its budget.
- `show power inline police <if>` — displays PoE policing state and action.
- `class-map <name>` — defines a class map to classify traffic. *(Day 47 Lab)*
- `match dscp <value>` — matches packets based on their DSCP marking.
- `policy-map <name>` — defines a policy map tying classes to QoS actions.
- `priority percent <n>` — assigns a class to a strict-priority queue (LLQ) with a percentage cap.
- `bandwidth percent <n>` — guarantees a minimum bandwidth percent to a class (CBWFQ).
- `service-policy output <name>` — applies a policy map to an interface egress.

### Key Vocabulary
- **classification** — identifying which traffic class a packet belongs to (via ACL, NBAR, CoS, DSCP, etc.).
- **marking** — setting a value in the PCP/CoS or DSCP/ToS field so downstream devices can classify.
- **trust boundary** — point in the network where QoS markings from a device are believed; typically moved to the IP phone so phone markings are trusted but PC markings are not.
- **bandwidth** — overall link capacity in bits per second.
- **delay (latency)** — one-way or two-way time for traffic to traverse the network.
- **jitter** — variation in one-way delay between packets of the same flow.
- **loss** — percentage of packets that fail to reach the destination.
- **interactive audio targets** — one-way delay ≤ 150 ms, jitter ≤ 30 ms, loss ≤ 1%.
- **best-effort** — default, no guarantees (CoS 0 / DF / DSCP 0).
- **CoS 5 / EF** — standard marking for voice traffic.
- **CoS 4 / AF41** — standard marking for interactive video.
- **CoS 3** — standard marking for voice *call signaling* traffic.
- **streaming video** — typically AF3x.
- **high-priority data** — typically AF2x.
- **AF X Y** — AF class X (1-4), drop precedence Y (1-3); formula `DSCP = 8X + 2Y`.
- **drop precedence** — within an AF class, higher value = more likely dropped during congestion.
- **CS value** — `DSCP = 8 × CS-number`; CS0=0, CS1=8, CS2=16, ... CS7=56.
- **tail drop** — packets dropped because the queue is full; can cause TCP global synchronization.
- **TCP global synchronization** — all TCP flows slow down then speed up together, causing congestion waves.
- **TCP sliding window** — sender ramp-up/ramp-down mechanism exploited/recovered during tail drop.
- **congestion management** — queuing + scheduling (CBWFQ, LLQ).
- **congestion avoidance** — dropping packets early before the queue fills (RED, WRED).
- **queuing** — placing packets in per-interface queues before transmission.
- **weighted round-robin** — scheduler that cycles through queues, taking more from high-priority ones.
- **ingress / egress traffic** — traffic entering / leaving an interface.
- **shaping** — buffers excess traffic when the rate exceeds the configured limit; sender-side, gentle.
- **policing** — drops (or remarks) traffic when the rate exceeds the configured limit; allows short bursts.
- **bursty traffic** — data applications that send in bursts rather than a steady stream; accommodated by policer burst settings.
- **classifier → queue → scheduler → transmit** — canonical QoS forwarding pipeline on a device.
- **call signaling traffic** — traffic that sets up and tears down phone calls (marked PCP 3).

## 4.8 — Configure network devices for remote access using SSH

### Technologies & Devices
- **Console port** — physical port on a Cisco device for direct CLI access; no password by default.
- **Console line** — line configuration (`line console 0`) controlling console-port access.
- **VTY lines** — virtual TTY lines for Telnet/SSH; up to 16 (0-15). *(Day 42)*
- **SVI (Switch Virtual Interface)** — virtual VLAN interface on a switch; used for the Layer 2 switch management IP.
- **Management IP** — IP on an SVI allowing remote management of a Layer 2 switch.
- **Default gateway on a Layer 2 switch** — configured with `ip default-gateway` because the switch has no routing table.
- **Telnet (Teletype Network)** — legacy remote-CLI protocol; plain text; TCP port 23.
- **SSH (Secure Shell)** — secure remote-CLI protocol; encrypted; TCP port 22.
- **SSHv1** — original version, less secure.
- **SSHv2** — released 2006; preferred, more secure.
- **SSH v1.99** — not a real version; indicates a device supports both v1 and v2.
- **Shell** — program exposing OS services to a user (any CLI is a shell).
- **RSA key pair** — cryptographic keys required for SSH; named using the device's FQDN.
- **K9 IOS image** — Cisco IOS image that supports cryptographic features (e.g., SSH).
- **NPE image** — No Payload Encryption IOS image for restricted countries; does not support SSH.
- **FTPS** — FTP over SSL/TLS (FTP Secure).
- **SFTP** — SSH File Transfer Protocol (different protocol from FTPS despite similar name).

### Protocols & Standards
- SSH uses TCP port 22; Telnet uses TCP port 23.
- SSHv2 requires an RSA key length of at least 768 bits.

### Acronyms
- **SSH** — Secure Shell.
- **VTY** — Virtual TeleType.
- **SVI** — Switch Virtual Interface.
- **FQDN** — Fully Qualified Domain Name.
- **RSA** — Rivest-Shamir-Adleman (asymmetric cryptography keys).
- **ACL** — Access Control List.

### Commands & Syntax
- `line console 0` — enters console line configuration.
- `password <pw>` — sets a line password.
- `login` — requires the line password at login.
- `login local` — requires a username/password from the local user database.
- `username <name> secret <pw>` — creates a local user with an encrypted password.
- `exec-timeout <min> <sec>` — auto-logout after inactivity.
- `enable secret <pw>` — required to access privileged exec via SSH/Telnet.
- `interface vlan <id>` — enters SVI configuration on a switch.
- `ip default-gateway <ip>` — sets the default gateway for a Layer 2 switch.
- `line vty 0 15` — configures all 16 VTY lines.
- `transport input telnet` — allows Telnet on the VTY lines.
- `transport input ssh` — allows SSH only.
- `transport input telnet ssh` — allows both.
- `transport input all` — allows all supported protocols.
- `transport input none` — allows no remote connections to the VTY lines.
- `access-class <acl> in` — applies an ACL to the VTY lines (different from `ip access-group` on interfaces).
- `ip domain name <name>` — configures the DNS domain name (required before generating RSA keys).
- `crypto key generate rsa` — generates the RSA key pair; requires a non-default hostname and a domain name.
- `crypto key generate rsa modulus <n>` — generates keys with the specified modulus length.
- `ip ssh version 2` — restricts to SSHv2 only.
- `show version` — IOS image name; K9 indicates SSH-capable.
- `show ip ssh` — verifies SSH is enabled and shows version and key info.
- `ssh -l <user> <ip>` / `ssh <user>@<ip>` — connect as an SSH client.

### Key Vocabulary
- **console port security** — preventing unauthorized local CLI access.
- **SSH server** — the device being connected to.
- **SSH client** — the device initiating the connection.
- **encryption** — SSH encrypts all session data so captured packets are unreadable.
- **authentication** — username/password (or key-based) check before granting a shell.
- **data encryption and decryption** — core SSH security feature; keys provided by RSA.

## 4.9 — Describe the capabilities and function of TFTP/FTP in the network

### Technologies & Devices
- **FTP (File Transfer Protocol)** — industry-standard client/server protocol for transferring files; uses TCP. *(Day 43)*
- **TFTP (Trivial File Transfer Protocol)** — simpler file-transfer protocol using UDP; only copy to/from server.
- **FTP server / client** — roles in an FTP exchange.
- **FTPS** — FTP over SSL/TLS; adds encryption to FTP.
- **SFTP** — SSH File Transfer Protocol; different protocol despite similar name.
- **Flash memory** — storage device where Cisco IOS images are typically saved; `disk`-type file system.
- **NVRAM (Non-Volatile RAM)** — storage that retains data across reboots; holds the startup-config.
- **Opaque file system** — logical internal file systems used for specific functions.
- **Network file system type** — represents external file systems like FTP/TFTP servers in `show file systems`.

### Protocols & Standards
- FTP uses TCP port 21 (control connection) and TCP port 20 (data connection).
- TFTP uses UDP port 69 (initial client→server port).
- TFTP has no authentication and no encryption; FTP has username/password auth but no encryption in plain FTP.
- TFTP uses acknowledgments and timers for built-in lock-step reliability (per data message).
- FTP active mode: server initiates the data connection to the client.
- FTP passive mode: client initiates the data connection (used when client is behind a firewall).

### Acronyms
- **FTP** — File Transfer Protocol.
- **TFTP** — Trivial File Transfer Protocol.
- **FTPS** — FTP Secure (FTP over SSL/TLS).
- **SFTP** — SSH File Transfer Protocol.
- **TID** — Transfer Identifier (random UDP port used by TFTP to identify a transfer).
- **NVRAM** — Non-Volatile Random Access Memory.

### Commands & Syntax
- `show file systems` — lists the device's file systems (disk, opaque, nvram, network).
- `show flash` — shows files stored in flash memory.
- `show version` — shows the running IOS image name and version.
- `copy tftp: flash:` — copies a file from a TFTP server into flash (router prompts for server IP and filename).
- `copy ftp: flash:` — copies a file from an FTP server into flash.
- `ip ftp username <user>` — username the router uses as an FTP client.
- `ip ftp password <pw>` — password the router uses as an FTP client.
- `boot system <filepath>` — tells the router which IOS file to boot on reload.
- `copy running-config startup-config` — saves the running config (generic COPY command).
- `delete <filepath>` — deletes a file (e.g., an old IOS image).
- `reload` — reboots the device.

### Key Vocabulary
- **client-server model** — both FTP and TFTP use it; a client copies files to or from a server.
- **read request / write request** — TFTP message types to start a download or upload.
- **lock-step communication** — TFTP alternates Data and Ack; server never sends two Data messages in a row (except retransmits).
- **retransmission timer** — TFTP's basis for reliability; sender resends on timeout.
- **control connection** — FTP's command channel on TCP port 21.
- **data connection** — FTP's transfer channel on TCP port 20.
- **active mode** — default FTP mode; server opens the data connection.
- **passive mode** — client opens the data connection; needed when the client sits behind a firewall that blocks incoming.
- **FTP commands** — directory navigation, add/remove directories, list files, etc.; not possible in TFTP.
- **deep packet inspection** — referenced in context of NBAR/classification; not used by FTP/TFTP.
- **IOS upgrade workflow** — copy new image via FTP/TFTP → `boot system` → save config → `reload` → delete old image.
