# Domain 5.0 — Security Fundamentals Glossary

Source: Jeremy's IT Lab — Free CCNA v1.1 200-301 Complete Course
Scope: 5 sub-objectives, 15 videos

## 5.1 — Define key security concepts (threats, vulnerabilities, exploits, mitigation techniques)

### Technologies & Devices
- **Botnet** — group of computers infected with malware and used by an attacker to launch a DDoS attack. *(Day 48)*
- **Reflector** — device (e.g. DNS or NTP server) that an attacker spoofs a source address against so replies flood the target.
- **Kali Linux** — Linux distribution pre-loaded with penetration-testing and digital-forensics tools; used in the DHCP starvation demo.
- **Yersinia (Yia)** — Kali Linux tool used to launch DHCP discover-flood attacks in the lab demo.
- **Firewall** — a place where mitigation techniques should be applied along with client devices, servers, switches, and routers.

### Protocols & Standards
- **CIA triad** — Confidentiality, Integrity, Availability — the foundation of security. *(Day 48)*
- **TCP three-way handshake** — SYN, SYN-ACK, ACK; exploited by the TCP SYN flood.
- **ARP** — broadcast request / unicast reply protocol abused by ARP spoofing to poison ARP tables.
- **ICMP** — protocol used by ping; can be used in some DoS attacks.

### Acronyms
- **CIA** — Confidentiality, Integrity, Availability.
- **DoS** — Denial-of-Service.
- **DDoS** — Distributed Denial-of-Service.
- **DHCP** — Dynamic Host Configuration Protocol (target of exhaustion/starvation attacks).
- **DNS** — Domain Name System (used in amplification attacks, plus NSLOOKUP recon).
- **NTP** — Network Time Protocol (amplification-attack target).
- **SMS** — Short Message Service (used in smishing).
- **TCP** — Transmission Control Protocol (SYN flood target).

### Key Vocabulary
- **Confidentiality** — only authorized users can access data.
- **Integrity** — data is not tampered with or modified by unauthorized users.
- **Availability** — network and systems are operational and accessible to authorized users.
- **Vulnerability** — any potential weakness that can compromise the CIA of a system or information.
- **Exploit** — something that can potentially be used to exploit a vulnerability.
- **Threat** — the potential of a vulnerability to be exploited.
- **Mitigation technique** — something that can protect against threats.
- **Denial-of-service (DoS) attack** — attack on availability; one common form is the TCP SYN flood.
- **TCP SYN flood** — attacker sends countless SYN messages with spoofed source IPs so the target's TCP connection table fills up.
- **Distributed denial-of-service (DDoS)** — the attacker uses a botnet of infected computers to flood the target.
- **Spoofing attack** — use of a fake source address (IP or MAC); not necessarily a DoS.
- **DHCP exhaustion / starvation attack** — attacker floods DHCP Discover messages with spoofed MAC addresses until the server's pool is full; results in DoS.
- **Reflection attack** — attacker sends traffic to a reflector using the target's IP as source; reflector replies to the target.
- **Amplification attack** — reflection attack where a small request triggers a much larger reply to the target.
- **Man-in-the-middle attack** — attacker inserts himself between source and destination to eavesdrop on or modify traffic.
- **ARP spoofing / ARP poisoning** — attacker sends an ARP reply after the legitimate one, overwriting the victim's ARP table so traffic is redirected to the attacker.
- **Reconnaissance attack** — gathering of publicly available information about a target (e.g. NSLOOKUP, WHOIS, open-port scans) for use in a future attack.
- **NSLOOKUP** — recon command used to learn the IP address of a site.
- **WHOIS** — recon query used to learn email, phone, physical addresses for a domain.
- **Malware** — malicious software; broad category.
- **Virus** — malware that infects a host program and spreads when that software is shared or downloaded.
- **Worm** — standalone malware that spreads on its own without user interaction; may carry a payload.
- **Trojan horse** — harmful software disguised as legitimate software; spread via email attachments or downloads.
- **Payload** — additional malicious code carried by a worm that harms target devices.
- **Social engineering** — attack category that targets people, the most vulnerable part of any system, through psychological manipulation.
- **Phishing** — fraudulent emails that appear to come from a legitimate business and trick users into entering credentials on a fake site.
- **Spear phishing** — targeted phishing, e.g. at employees of a specific company.
- **Whaling** — phishing targeted at high-profile individuals such as a company president.
- **Vishing** — voice phishing performed over the phone.
- **Smishing** — SMS phishing performed via text messages.
- **Watering hole attack** — compromising a site the target frequently visits so the victim trusts the malicious link.
- **Tailgating** — entering a restricted area by walking in behind an authorized person.
- **Password guessing** — simply guessing a user's password.
- **Dictionary attack** — program runs through a list of common words and passwords to guess the target's password.
- **Brute-force attack** — trying every possible combination of letters, numbers, and special characters to find the password.
- **Strong password** — at least 8 characters, mix of uppercase and lowercase, letters and numbers, one or more special characters, changed regularly.

---

## 5.2 — Security program elements (covered inline in Day 48)

### Key Vocabulary
- **Security program** — an enterprise's set of security policies and procedures. *(Day 48)*
- **User awareness program** — designed to make employees aware of potential security threats and risks, e.g. sending fake phishing emails to test employees.
- **User training program** — more formal than awareness; dedicated training sessions on corporate security policies, strong passwords, and avoiding threats; run at onboarding and at regular intervals.
- **Physical access control** — protects equipment and data by only allowing authorized users into protected areas like network closets or data center floors.
- **Multifactor lock** — door lock that combines two factors, e.g. a badge swipe plus a fingerprint scan.
- **Badge system** — centralized, flexible way to grant and remove physical-access permissions (e.g. when an employee leaves).

---

## 5.3 — Configure and verify device access control using local passwords

### Technologies & Devices
- **Cisco IOS** — operating system used on Cisco routers, switches, and firewalls. *(Day 4)*
- **CLI** — command-line interface used to configure Cisco devices.
- **GUI** — graphical user interface, e.g. Cisco ASDM; not typically used by network engineers.
- **Console port** — RJ45 or USB mini-B port on a Cisco device used for local configuration.
- **Rollover cable** — cable used to connect to the RJ45 console port; pin 1↔8, 2↔7, 3↔6, 4↔5.
- **DB9 connector** — serial-port end of the rollover cable; typically needs a USB adapter on modern laptops.
- **PuTTy** — popular terminal emulator used to access the CLI over a serial console.
- **Running-config** — current active configuration file on the device, edited as commands are entered.
- **Startup-config** — configuration file loaded on device restart.

### Protocols & Standards
- **MD5** — type 5 encryption used by `enable secret`; more secure than type 7.
- **Cisco type 7 encryption** — proprietary encryption used by `service password-encryption`; weak and easily cracked.

### Acronyms
- **CLI** — Command-Line Interface.
- **GUI** — Graphical User Interface.
- **IOS** — Internetwork Operating System (Cisco).
- **ASDM** — Adaptive Security Device Manager (Cisco firewall GUI).
- **MD5** — Message Digest 5.

### Commands & Syntax
- `enable` — enters privileged EXEC mode from user EXEC mode.
- `configure terminal` (`conf t`) — enters global configuration mode from privileged EXEC.
- `hostname R1` — sets the device hostname in global config mode.
- `enable password CCNA` — sets a clear-text password to protect privileged EXEC mode.
- `service password-encryption` — encrypts current and future passwords using weak type 7; has no effect on `enable secret`.
- `no service password-encryption` — disables future encryption; already-encrypted passwords stay encrypted.
- `enable secret Cisco` — sets a more secure, always-encrypted (MD5/type 5) enable password; takes precedence over `enable password` if both are set.
- `exit` — returns to the previous EXEC mode or logs out.
- `do show running-config` — runs a privileged EXEC command (like `show running-config`) from inside another config mode.
- `show running-config` (`sh run`) — displays the current active configuration.
- `show startup-config` — displays the saved configuration that loads on restart.
- `write` / `write memory` / `copy running-config startup-config` — three equivalent commands that save the running-config as the startup-config.
- `no <command>` — removes a previously configured command.
- `?` — lists available commands or completions at the current position.
- **Tab** — auto-completes a partially typed command.

### Key Vocabulary
- **User EXEC mode** — default limited mode after login; prompt ends with `>`; can view some things but make no changes.
- **Privileged EXEC mode** — mode entered via `enable`; prompt ends with `#`; complete view access plus restart and save.
- **Global configuration mode** — mode entered via `configure terminal`; prompt shows `(config)#`; used to make changes to the device.
- **Baud rate** — console-port serial speed; default 9600 bps.
- **Default console settings** — 9600 bps, 8 data bits, 1 stop bit, no parity, no flow control.
- **Bad secrets** — CLI rejection message after 3 incorrect password attempts.
- **Case-sensitive password** — `CCNA` and `ccna` are different passwords.
- **Ambiguous command** — CLI response when the typed characters match more than one command (e.g. just `e`).

---

## 5.4 — Describe security password policies elements

### Key Vocabulary
- **Multi-factor authentication (MFA)** — providing more than just a username and password to prove your identity. *(Day 48)*
- **Two-factor authentication (2FA)** — MFA using exactly two factors.
- **Something you know** — factor like a username/password combination or a PIN.
- **Something you have** — factor like an authenticator app notification or a scanned badge.
- **Something you are** — factor that is a unique characteristic of the person: biometrics such as face scan, palm scan, fingerprint scan, retina scan.
- **Biometrics** — unique physical characteristics (face, palm, fingerprint, retina) used as "something you are."
- **Digital certificate** — used to prove the identity of the holder of the certificate, mainly for websites.
- **CSR** — Certificate Signing Request, sent by an entity to a CA to request a certificate.
- **CA** — Certificate Authority that generates and signs digital certificates.

---

## 5.5 — Describe IPsec remote access and site-to-site VPNs

*(Jeremy's Domain 5 videos do not include a dedicated IPsec/VPN lecture; this sub-objective is not directly covered in the transcripts listed in the brief.)*

---

## 5.6 — Configure and verify access control lists (standard and extended ACLs)

### Technologies & Devices
- **Router** — device that processes ACLs when forwarding packets. *(Day 34)*
- **Interface** — point where an ACL is applied, in a direction (inbound or outbound).

### Protocols & Standards
- **Wildcard mask** — inverse-style mask used in ACLs (e.g. `0.0.0.255` for a /24); standard subnet masks don't work in ACLs.
- **IP protocol numbers** — 1=ICMP, 6=TCP, 17=UDP, 88=EIGRP, 89=OSPF; can be used in extended ACLs.
- **TCP flags** — ACK, FIN, SYN — can be matched in advanced extended ACL entries.
- **DSCP** — differentiated services code point value in the IPv4 header; matchable in extended ACLs.
- **TTL** — Time To Live value in the IPv4 header; matchable in extended ACLs.

### Acronyms
- **ACL** — Access Control List.
- **ACE** — Access Control Entry (a single line within an ACL).
- **TFTP** — Trivial File Transfer Protocol; UDP port 69, matchable in extended ACLs.
- **HTTP** — Hypertext Transfer Protocol; TCP port 80.
- **HTTPS** — HTTP Secure; TCP port 443.
- **FTP** — File Transfer Protocol; matchable by name in ACL entries.
- **DNS** — Domain Name System; uses TCP and UDP port 53.

### Commands & Syntax
- `access-list 1 deny 1.1.1.1 0.0.0.0` — configures a standard numbered ACL entry denying a /32 host. *(Day 34)*
- `access-list 1 deny 1.1.1.1` — shortcut for /32 (mask omitted).
- `access-list 1 deny host 1.1.1.1` — older /32 syntax using the `host` keyword.
- `access-list 1 permit any` — matches all source IPs; equivalent to `permit 0.0.0.0 255.255.255.255`.
- `access-list 1 remark ## comment ##` — attaches a description to an ACL; no effect on traffic.
- `ip access-list standard BLOCK_BOB` — enters standard named ACL config mode. *(Day 34)*
- `5 deny 1.1.1.1` — entry with manually specified sequence number inside named-ACL config mode.
- `ip access-group 1 in` / `ip access-group 1 out` — applies an ACL to an interface inbound or outbound. *(Day 34)*
- `ip access-list extended 100` — enters extended named ACL config mode. *(Day 35)*
- `deny tcp 192.168.1.0 0.0.0.255 host 10.0.1.100 eq 443` — extended ACE matching TCP to HTTPS on a specific host.
- `permit ip any any` — extended-ACL equivalent of `permit any`; matches all IP traffic.
- `deny udp any range 20000 30000 host 3.3.3.3` — extended ACE matching a UDP source-port range.
- `deny tcp 172.16.1.0 0.0.0.255 gt 9999 host 4.4.4.4 neq 23` — extended ACE using GT and NEQ port operators.
- `ip access-list resequence 1 10 10` — resequences ACL 1 starting at 10, incrementing by 10.
- `no 30` — inside named-ACL config mode, deletes entry 30 only (not the whole ACL).
- `no access-list 1 ...` — from global config, deletes the entire ACL, not a single entry.
- `show access-lists` — displays all ACLs and match counts per entry.
- `show ip access-lists` — displays IP ACLs only; same output style as `show access-lists` for IP ACLs.
- `show running-config | include access-list` — shows only lines containing `access-list`.
- `show running-config | section access-list` — shows the full ACL section including its entries and remarks.
- `show ip interface g0/0` — reveals which ACLs are applied inbound and outbound on an interface.

### Key Vocabulary
- **Access Control List (ACL)** — ordered list of entries that permits or discards specific traffic on a router interface.
- **Access Control Entry (ACE)** — a single permit/deny line inside an ACL.
- **Packet filter** — ACL function of instructing the router to permit or discard traffic.
- **Standard ACL** — matches based only on source IP address; numbered 1–99 and 1300–1999.
- **Extended ACL** — matches on protocol, source/destination IP, source/destination ports, TCP flags, DSCP, TTL; numbered 100–199 and 2000–2699.
- **Numbered ACL** — ACL identified by a number.
- **Named ACL** — ACL identified by a name (e.g. `BLOCK_BOB`).
- **Inbound ACL** — checks packets entering an interface.
- **Outbound ACL** — checks packets exiting an interface.
- **Implicit deny** — invisible `deny any` at the end of every ACL that drops traffic not matching any entry.
- **Top-to-bottom processing** — router evaluates ACEs in order; after the first match the action is taken and remaining entries are ignored.
- **Sequence number** — per-entry number (default 10, 20, 30...) that controls order; settable manually in named-ACL config mode.
- **Remark** — descriptive comment attached to an ACL for documentation.
- **`host` keyword** — shorthand for a /32 match; e.g. `host 1.1.1.1` equals `1.1.1.1 0.0.0.0`.
- **`any` keyword** — matches all IPs; equals `0.0.0.0 255.255.255.255`.
- **Port operators** — `eq` (equal), `gt` (greater than), `lt` (less than), `neq` (not equal), `range` (between two ports).
- **Rule of thumb — standard ACLs** — apply as close to the destination as possible to avoid blocking more than intended.
- **Rule of thumb — extended ACLs** — apply as close to the source as possible to drop unwanted traffic early.
- **One ACL per interface per direction** — max one inbound and one outbound ACL per interface; applying another replaces the first.
- **IOS /32 reordering** — router may reorder /32 entries for processing efficiency without changing overall effect; Packet Tracer does not do this.
- **Resequencing** — `ip access-list resequence` renumbers entries so you can insert new ones between them.
- **Named-ACL-config advantage** — lets you delete individual entries and insert entries at specific sequence numbers (global-config numbered ACLs do neither).

---

## 5.7 — Configure and verify Layer 2 security features (DHCP snooping, dynamic ARP inspection, port security)

### Technologies & Devices
- **Cisco switch** — device where port security, DHCP snooping, and DAI are configured. *(Day 49)*
- **DHCP server** — router or server that leases IP addresses; should connect to a DHCP-snooping trusted port. *(Day 50)*
- **DHCP relay agent** — forwards DHCP messages between clients and a remote DHCP server; may add Option 82.
- **Spurious DHCP server** — illegitimate (attacker-run) DHCP server used in DHCP poisoning.
- **MAC address table** — switch table that stores learned MAC addresses; can be filled by spoofed-MAC floods.
- **DHCP snooping binding table** — table built by DHCP snooping logging each client's MAC, IP, lease time, VLAN, and interface; also consulted by DAI. *(Day 51)*
- **ARP ACL** — manually configured list that maps IPs to MACs for DAI to check hosts that don't use DHCP.

### Protocols & Standards
- **CDP** — Cisco Discovery Protocol; messages from neighboring switch add the neighbor's MAC to the port-security count.
- **Syslog** — logging protocol used by violation modes `shutdown` and `restrict` to report port-security violations.
- **SNMP** — Simple Network Management Protocol; traps generated by port-security `shutdown` and `restrict` modes.
- **DHCP Option 82** — DHCP relay agent information option; Cisco switches add it by default when DHCP snooping is on and drop untrusted messages that carry it.
- **ARP (gratuitous)** — ARP reply sent without a request, broadcast to the LAN; abused by ARP poisoning.

### Acronyms
- **DAI** — Dynamic ARP Inspection.
- **DHCP** — Dynamic Host Configuration Protocol.
- **MAC** — Media Access Control (address).
- **CHADDR** — Client Hardware Address; DHCP-message field indicating the client's MAC.
- **DORA** — Discover, Offer, Request, Ack — the DHCP lease exchange.
- **GARP** — Gratuitous ARP.
- **SVI** — Switched Virtual Interface (VLAN interface on a switch).
- **NAK** — DHCP Negative Acknowledgment (server message).

### Commands & Syntax
- `switchport mode access` — statically configures the port as access mode (required before enabling port security). *(Day 49)*
- `switchport port-security` — enables port security on the interface with default settings.
- `switchport port-security mac-address aaaa.aaaa.aaaa` — manually configures a secure MAC address.
- `switchport port-security mac-address sticky` — enables sticky learning; dynamically learned MACs are written into the running-config.
- `switchport port-security maximum 2` — sets the maximum number of secure MAC addresses allowed.
- `switchport port-security violation shutdown` — default; puts the port in err-disabled state on violation.
- `switchport port-security violation restrict` — drops unauthorized frames, leaves port up, logs syslog/SNMP, increments counter.
- `switchport port-security violation protect` — silently drops unauthorized frames; no logging, no counter increment.
- `switchport port-security aging time 30` — sets secure-MAC aging to 30 minutes (0 = never).
- `switchport port-security aging type absolute` — default; ages MAC after the timer regardless of activity.
- `switchport port-security aging type inactivity` — resets aging timer whenever a frame is received from that MAC.
- `switchport port-security aging static` — enables aging of statically configured secure MACs.
- `shutdown` / `no shutdown` — manual way to re-enable an err-disabled interface.
- `errdisable recovery cause psecure-violation` — auto-recovers ports err-disabled by port security. *(Day 49)*
- `errdisable recovery interval 180` — changes the recovery timer (default 300 seconds).
- `errdisable recovery cause dhcp-rate-limit` — auto-recovers ports err-disabled by DHCP rate-limit. *(Day 50)*
- `errdisable recovery cause arp-inspection` — auto-recovers ports err-disabled by DAI rate-limit. *(Day 51)*
- `show port-security interface g0/1` — shows port-security status, violation mode, aging, counts, and last source address.
- `show port-security` — overview of all port-security-enabled interfaces.
- `show mac address-table secure` — lists all secure MAC addresses.
- `show errdisable recovery` — lists all err-disable causes and which have recovery enabled.
- `ip dhcp snooping` — enables DHCP snooping globally on the switch. *(Day 50)*
- `ip dhcp snooping vlan 1` — enables DHCP snooping for VLAN 1.
- `ip dhcp snooping trust` — marks the interface as a trusted port (no snooping inspection).
- `no ip dhcp snooping information option` — disables adding DHCP Option 82 when the switch isn't a relay agent.
- `ip dhcp snooping limit rate 1` — rate-limits DHCP messages to 1/second; more causes err-disable.
- `show ip dhcp snooping binding` — displays the DHCP snooping binding table (MAC, IP, lease, VLAN, interface).
- `ip arp inspection vlan 1` — enables DAI for VLAN 1 (no separate global command). *(Day 51)*
- `ip arp inspection trust` — marks the interface as DAI-trusted.
- `ip arp inspection limit rate 25 burst interval 2` — rate-limits ARP to 25 packets per 2 seconds.
- `ip arp inspection validate ip src-mac dst-mac` — enables optional DAI checks (must all be on one command line).
- `arp access-list ARP-ACL-1` / `permit ip host 192.168.1.100 mac host aaaa.bbbb.cccc` — creates an ARP ACL entry.
- `ip arp inspection filter ARP-ACL-1 vlan 1` — applies an ARP ACL to DAI for a VLAN.
- `show ip arp inspection interfaces` — shows each port's trust state and DAI rate-limit settings.
- `show ip arp inspection` — summary of DAI config and forward/drop statistics.

### Key Vocabulary
- **Port security** — Cisco switch feature that controls which, and how many, source MAC addresses are allowed on a switchport.
- **Secure MAC address** — MAC address dynamically learned or statically configured on a port-security-enabled port.
- **Static secure MAC** — manually configured secure MAC via `switchport port-security mac-address`.
- **Dynamic secure MAC** — MAC dynamically learned by the switch (non-sticky).
- **Sticky secure MAC** — dynamically learned MAC that port security writes into the running-config automatically; never ages out; survives only if saved to startup-config.
- **Violation** — frame arriving on a port-security-enabled interface with an unauthorized source MAC.
- **Shutdown mode** — default violation mode; err-disables the port; one syslog/SNMP message; violation counter set to 1 and reset on recovery.
- **Restrict mode** — drops unauthorized traffic, port stays up; syslog and SNMP sent; counter increments per frame.
- **Protect mode** — silently drops unauthorized traffic; no logs, no counter increment; port stays up.
- **Err-disabled state** — administratively-disabled state caused by port security, DHCP rate-limit, DAI rate-limit, etc.
- **Secure-up / secure-shutdown** — port-security port-status values shown by `show port-security interface`.
- **ErrDisable recovery** — feature that automatically re-enables err-disabled interfaces after a timer (default 300 s).
- **Absolute aging** — MAC ages out after timer regardless of activity.
- **Inactivity aging** — aging timer resets on every frame from that MAC.
- **DHCP snooping** — switch security feature that filters DHCP messages received on untrusted ports.
- **Untrusted port** — DHCP-snooping default; inspects DHCP client messages and always drops server messages.
- **Trusted port** — DHCP-snooping state for uplinks (toward DHCP server or infrastructure); snooping forwards without inspection.
- **Downlink port** — port facing end hosts; typically untrusted.
- **Uplink port** — port facing the network infrastructure; typically trusted.
- **DHCP poisoning** — man-in-the-middle attack where a spurious DHCP server hands clients the attacker's IP as default gateway.
- **DHCP starvation / exhaustion attack** — attacker floods spoofed-MAC DISCOVER messages to exhaust the DHCP pool.
- **DHCP server messages** — OFFER, ACK, NAK; always discarded on DHCP-snooping untrusted ports.
- **DHCP client messages** — DISCOVER, REQUEST, RELEASE, DECLINE; inspected on untrusted ports.
- **DISCOVER/REQUEST check** — DHCP snooping drops the frame unless source MAC equals the CHADDR field.
- **RELEASE/DECLINE check** — DHCP snooping drops the frame unless source IP + interface match the binding table entry.
- **DHCP rate-limiting** — `ip dhcp snooping limit rate` caps DHCP messages per second; excess triggers err-disable.
- **Dynamic ARP Inspection (DAI)** — switch security feature that inspects ARP on untrusted ports and drops messages that don't match the DHCP snooping binding table.
- **ARP poisoning** — attacker sends ARP replies or gratuitous ARP to redirect traffic and perform a man-in-the-middle attack.
- **Gratuitous ARP (GARP)** — ARP reply sent without a request, broadcast to the LAN.
- **DAI rate-limiting** — enabled on untrusted ports by default (15 pps); disabled on trusted ports by default.
- **Burst interval** — DAI feature that lets rate-limiting measure X packets per Y seconds instead of per 1 second.
- **DAI validation checks** — optional `src-mac`, `dst-mac`, `ip` checks that compare ARP fields to Ethernet header or reject invalid IPs (0.0.0.0, 255.255.255.255, multicast).
- **ARP ACL** — manually configured IP-to-MAC list that DAI uses to permit ARP from non-DHCP hosts (e.g. static-IP servers).
- **Static ACL (DAI)** — option that enables the implicit deny at the end of an ARP ACL.

---

## 5.8 — Compare authentication, authorization, and accounting (AAA) concepts

### Technologies & Devices
- **AAA server** — server that provides authentication, authorization, and accounting services. *(Day 48)*
- **ISE** — Cisco Identity Services Engine; Cisco's AAA server product.

### Protocols & Standards
- **RADIUS** — AAA protocol; open standard; uses UDP ports 1812 and 1813.
- **TACACS+** — AAA protocol; Cisco proprietary; uses TCP port 49.

### Acronyms
- **AAA** — Authentication, Authorization, Accounting.
- **RADIUS** — Remote Authentication Dial-In User Service.
- **TACACS+** — Terminal Access Controller Access-Control System Plus.
- **ISE** — Identity Services Engine.

### Key Vocabulary
- **Authentication** — process of verifying a user's identity (e.g. login, ideally with MFA).
- **Authorization** — process of granting a user appropriate access and permissions (allowing some files/services, restricting others).
- **Accounting** — process of recording a user's activities on the system (e.g. logging file changes, login/logout times).

---

## 5.9 — Describe wireless security protocols (WPA, WPA2, WPA3)

### Technologies & Devices
- **Supplicant** — the client device that wants to connect to the network (e.g. a laptop). *(Day 57)*
- **Authenticator** — the device that provides access to the network; in wireless, the AP or WLC.
- **Authentication server (AS)** — the device that receives credentials and permits or denies access; usually a RADIUS server.
- **WLC** — Wireless LAN Controller; manages authentication in split-MAC architecture.
- **Malicious AP** — rogue AP that tricks users into associating so it can run a man-in-the-middle attack.
- **Guest SSID** — separate SSID with looser authentication that typically provides Internet-only access.

### Protocols & Standards
- **802.11** — wireless LAN standard; originally defined Open and WEP authentication.
- **802.1X** — port-based network access control; used with EAP in enterprise wireless authentication.
- **EAP** — authentication framework; not a single protocol; basis for LEAP, EAP-FAST, PEAP, EAP-TLS.
- **LEAP** — Cisco Lightweight EAP; mutual challenge-phrase exchange; dynamic WEP keys; now vulnerable.
- **EAP-FAST** — Cisco EAP Flexible Authentication via Secure Tunneling; server issues a PAC to client, used to build a TLS tunnel, then client authenticates inside the tunnel.
- **PEAP** — Protected EAP; server has a digital certificate used to build a TLS tunnel; client authenticates inside the tunnel (e.g. via MS-CHAP).
- **EAP-TLS** — EAP Transport Layer Security; requires a digital certificate on AS and every client; considered most secure.
- **MS-CHAP** — Microsoft Challenge Handshake Authentication Protocol; used inside PEAP for client authentication.
- **WEP** — Wired Equivalent Privacy; shared-key protocol using RC4; 40-bit or 104-bit keys plus 24-bit IV; vulnerable and deprecated.
- **RC4** — stream cipher used by WEP.
- **TKIP** — Temporal Key Integrity Protocol; based on WEP with added MIC, key-mixing, doubled 48-bit IV, sender-MAC in MIC, timestamp, sequence number; used in WPA.
- **CCMP** — Counter/CBC-MAC Protocol; uses AES counter mode for encryption and CBC-MAC for MIC; used in WPA2.
- **GCMP** — Galois Counter Mode Protocol; uses AES counter mode for encryption and GMAC for MIC; more secure and more efficient than CCMP; used in WPA3.
- **AES** — Advanced Encryption Standard; most secure encryption protocol currently available; used by CCMP and GCMP in counter mode.
- **CBC-MAC** — Cipher Block Chaining Message Authentication Code; MIC algorithm used by CCMP.
- **GMAC** — Galois Message Authentication Code; MIC algorithm used by GCMP.
- **WPA** — WiFi Protected Access; uses TKIP; authentication via 802.1X/EAP or PSK.
- **WPA2** — released after WPA; uses CCMP; 802.1X/EAP or PSK.
- **WPA3** — released 2018; uses GCMP; adds mandatory PMF, SAE, forward secrecy.
- **PMF** — Protected Management Frames; protects 802.11 management frames from eavesdropping and forging; mandatory in WPA3.
- **SAE** — Simultaneous Authentication of Equals; protects the WPA3 four-way handshake in personal mode.
- **Forward secrecy** — WPA3 feature preventing data from being decrypted after it has been transmitted.

### Acronyms
- **WPA / WPA2 / WPA3** — WiFi Protected Access versions.
- **PSK** — Pre-Shared Key (used in personal mode).
- **AP** — Access Point.
- **SSID** — Service Set Identifier.
- **MIC** — Message Integrity Check.
- **IV** — Initialization Vector.
- **PAC** — Protected Access Credential (EAP-FAST).
- **TLS** — Transport Layer Security.

### Key Vocabulary
- **Authentication (wireless)** — verifying the identity of a user and/or device before association or network access.
- **Encryption (wireless)** — scrambling wireless traffic so only sender and intended recipient can read it; each client uses a unique key.
- **Group key** — key the AP uses to encrypt traffic sent to all of its clients.
- **Integrity (wireless)** — ensuring a message is not modified in transit; validated via a MIC.
- **Message integrity check (MIC)** — value computed over a message so the recipient can detect tampering.
- **Open authentication** — AP accepts all authentication requests with no credentials; not secure on its own; often combined with a captive portal.
- **Shared-key protocol** — both sides must hold the same key (e.g. WEP).
- **Challenge phrase** — string of bits the AP sends; the client encrypts it with the shared key and returns it so the AP can verify key possession.
- **Dynamic WEP keys** — WEP keys that change over time (used in LEAP) to make cracking harder.
- **Replay attack** — attacker retransmits captured frames; TKIP's timestamp and sequence number defend against this.
- **Personal mode** — WPA authentication using a PSK (common in home/SOHO); PSK is never sent over the air; used in the four-way handshake to derive encryption keys.
- **Enterprise mode** — WPA authentication using 802.1X with an authentication server; supports any EAP method (PEAP, EAP-TLS, etc.).
- **Four-way handshake** — WPA handshake used in personal mode to derive encryption keys from the PSK.

---

## 5.10 — Configure and verify WLAN within the GUI using WPA2 PSK

*(Jeremy's Domain 5 videos listed in the brief do not include a WLC GUI WPA2-PSK configuration lab; relevant terms from 5.9 apply — PSK, SSID, WPA2, CCMP, AES, personal mode.)*
