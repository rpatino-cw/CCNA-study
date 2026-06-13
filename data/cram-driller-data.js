// CCNA Exam Cram Driller content. Generated + council-verified (18 blocks, 90-agent build).
// Schema: { blocks: [ {kind,domain,title,why,numbers,pairs,commands,verify,steps,symptom,fix,traps} ] }
window.CRAM_DRILLER_DATA = {
 "blocks": [
  {
   "kind": "concept",
   "title": "Domain 1 core concepts",
   "domain": "1",
   "why": "Domain 1 is 20% of the exam and feeds every other section. Lock the ports, address ranges, cabling, and PoE ladder and you bank easy points. (AD table lives in the Domain 3 routing block.)",
   "numbers": [
    {
     "k": "FTP",
     "v": "TCP 21 control, TCP 20 data (20 is the odd active-mode one)"
    },
    {
     "k": "SSH",
     "v": "TCP 22"
    },
    {
     "k": "Telnet",
     "v": "TCP 23"
    },
    {
     "k": "SMTP",
     "v": "TCP 25"
    },
    {
     "k": "DNS",
     "v": "port 53. UDP 53 = queries. TCP 53 = zone transfer or response >512 bytes"
    },
    {
     "k": "DHCP",
     "v": "UDP 67 server, UDP 68 client"
    },
    {
     "k": "TFTP",
     "v": "UDP 69"
    },
    {
     "k": "HTTP / HTTPS",
     "v": "TCP 80 / TCP 443"
    },
    {
     "k": "NTP",
     "v": "UDP 123"
    },
    {
     "k": "SNMP",
     "v": "UDP 161 poll (manager to agent), UDP 162 trap (agent to manager)"
    },
    {
     "k": "Syslog",
     "v": "UDP 514"
    },
    {
     "k": "RADIUS",
     "v": "UDP 1812 auth, UDP 1813 acct"
    },
    {
     "k": "TACACS+",
     "v": "TCP 49"
    },
    {
     "k": "DHCP DORA",
     "v": "Discover, Offer, Request, Ack (client broadcasts Discover and Request)"
    },
    {
     "k": "TCP 3-way handshake",
     "v": "SYN, SYN-ACK, ACK"
    },
    {
     "k": "Header sizes",
     "v": "IPv4 = 20 bytes (no options). TCP = 20 bytes. UDP = 8 bytes"
    },
    {
     "k": "TTL field",
     "v": "8 bits, max 255. Each router hop decrements by 1 (loop prevention)"
    },
    {
     "k": "ICMP / ping",
     "v": "NO port. IP protocol number 1 (connectionless)"
    },
    {
     "k": "MAC address",
     "v": "48 bits, 6 bytes, hex. First 24 bits = OUI (vendor)"
    },
    {
     "k": "Ethernet MTU",
     "v": "1500 bytes payload. Jumbo frame = 9000 bytes"
    },
    {
     "k": "Copper cable limit",
     "v": "Cat5e / Cat6 = 100m max"
    },
    {
     "k": "PoE ladder (at switch port / PSE)",
     "v": "802.3af = 15.4W, 802.3at (PoE+) = 30W, 802.3bt (PoE++) Type 3 = 60W, Type 4 = ~100W (~90W at device)"
    },
    {
     "k": "Private IPv4 (RFC1918)",
     "v": "10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16"
    },
    {
     "k": "APIPA / loopback",
     "v": "APIPA 169.254.0.0/16 (DHCP failed). IPv4 loopback 127.0.0.0/8"
    },
    {
     "k": "IPv6 address types",
     "v": "Global unicast 2000::/3, link-local FE80::/10, unique local FC00::/7, multicast FF00::/8, loopback ::1. SLAAC uses EUI-64"
    },
    {
     "k": "Collision domains",
     "v": "Hub = 1 collision domain total. Switch = 1 collision domain PER port"
    },
    {
     "k": "OSI PDUs",
     "v": "L7-5 data, L4 segment, L3 packet, L2 frame, L1 bits (All People Seem To Need Data Processing)"
    }
   ],
   "pairs": [
    {
     "a": "Collision domain",
     "b": "Broadcast domain",
     "diff": "Switch port = its own collision domain. Switch = one broadcast domain (router or VLAN splits broadcast)"
    },
    {
     "a": "TCP",
     "b": "UDP",
     "diff": "TCP = handshake, reliable, ordered, windowed. UDP = no handshake, fast, no ack (voice, video, DNS, TFTP)"
    },
    {
     "a": "Straight-through",
     "b": "Crossover",
     "diff": "Straight = UNLIKE devices (PC-switch, switch-router, switch-hub). Crossover = LIKE / same-layer (switch-switch, router-router, PC-PC, AND PC-router). Auto-MDIX fixes either"
    },
    {
     "a": "Manual cable",
     "b": "Auto-MDIX",
     "diff": "Manual = you pick straight vs crossover. Auto-MDIX = port auto-negotiates the crossover internally, any cable works"
    },
    {
     "a": "SMF (single-mode)",
     "b": "MMF (multi-mode)",
     "diff": "SMF: yellow / laser / long (km). MMF: orange or aqua / LED / short (<=550m)"
    },
    {
     "a": "RADIUS",
     "b": "TACACS+",
     "diff": "RADIUS = UDP, encrypts password ONLY, combines authn+authz, cross-vendor / 802.1X. TACACS+ = TCP 49, encrypts WHOLE payload, separates authn/authz/acct, Cisco device admin"
    },
    {
     "a": "L2 switch",
     "b": "L3 switch",
     "diff": "L2 forwards by MAC only. L3 routes between VLANs via SVIs (has a routing table)"
    },
    {
     "a": "Router",
     "b": "Firewall",
     "diff": "Router = forwards between networks by IP. Firewall = stateful filter, security zones, deny by default"
    },
    {
     "a": "Autonomous AP",
     "b": "WLC + lightweight AP",
     "diff": "Autonomous = configured standalone each. WLC centrally manages lightweight APs via CAPWAP"
    },
    {
     "a": "Half duplex",
     "b": "Full duplex",
     "diff": "Half = send OR receive (collisions, CSMA/CD). Full = send AND receive at once, no collisions"
    },
    {
     "a": "2-tier",
     "b": "3-tier",
     "diff": "2-tier = access + collapsed core (distribution+core merged). 3-tier = access + distribution + core (large campus). Spine-leaf = DC fabric"
    },
    {
     "a": "Console",
     "b": "SSH / Telnet",
     "diff": "Console = out-of-band, no IP needed, physical cable. SSH (22) / Telnet (23) = in-band over the network"
    }
   ],
   "traps": [
    {
     "trigger": "Connect two switches / switch-to-switch link",
     "answer": "Crossover (like devices), unless auto-MDIX is on"
    },
    {
     "trigger": "PC directly to router (no switch)",
     "answer": "CROSSOVER (both are DTE / host side) - the classic trick"
    },
    {
     "trigger": "Long-distance / campus backbone / many kilometers fiber",
     "answer": "Single-mode fiber (SMF)"
    },
    {
     "trigger": "Reliable delivery, retransmission, ordered, windowing needed",
     "answer": "TCP"
    },
    {
     "trigger": "Voice / video, DNS lookup, TFTP, low overhead, speed over reliability",
     "answer": "UDP"
    },
    {
     "trigger": "Centrally manage many APs / CAPWAP",
     "answer": "WLC (Wireless LAN Controller)"
    },
    {
     "trigger": "Late collisions, slow link, CRC errors on one side only",
     "answer": "Duplex mismatch. Cause = one side half, one side full. Fix = set BOTH the same (auto/auto)"
    },
    {
     "trigger": "SNMP unsolicited message from device",
     "answer": "Trap = UDP 162, agent pushes to manager. Manager polls agent on UDP 161"
    },
    {
     "trigger": "Encrypt the ENTIRE packet, separate authn/authz, Cisco device admin",
     "answer": "TACACS+ (TCP 49)"
    },
    {
     "trigger": "Cross-vendor AAA, 802.1X, only password encrypted",
     "answer": "RADIUS (UDP 1812/1813)"
    },
    {
     "trigger": "Host shows 169.254.x.x address",
     "answer": "APIPA - DHCP server unreachable / failed"
    },
    {
     "trigger": "CRC errors counter incrementing",
     "answer": "Layer 1 / cabling or duplex issue (runts = too small, giants = too big, late collisions = duplex)"
    }
   ]
  },
  {
   "kind": "concept",
   "title": "Domain 2 core concepts",
   "domain": "2",
   "why": "Network Access is 20% of the exam. VLANs, trunking, DTP, STP, EtherChannel, inter-VLAN routing, and wireless drive many MCQ and sim questions.",
   "numbers": [
    {
     "k": "VLAN ID range (usable)",
     "v": "1 to 4094"
    },
    {
     "k": "Normal-range VLANs",
     "v": "1 to 1005"
    },
    {
     "k": "Extended-range VLANs",
     "v": "1006 to 4094"
    },
    {
     "k": "Reserved VLANs (cannot use)",
     "v": "0 and 4095"
    },
    {
     "k": "Default VLAN",
     "v": "VLAN 1 (all access ports start here)"
    },
    {
     "k": "Default native VLAN (802.1Q trunk)",
     "v": "VLAN 1, untagged"
    },
    {
     "k": "802.1Q tag size",
     "v": "4 bytes added inside the frame"
    },
    {
     "k": "802.1Q TPID",
     "v": "0x8100 (marks a tagged frame)"
    },
    {
     "k": "802.1Q VLAN ID field",
     "v": "12 bits = 4096 values"
    },
    {
     "k": "802.1Q max frame size",
     "v": "1518 raised to 1522 bytes (baby giant)"
    },
    {
     "k": "STP base bridge priority",
     "v": "32768 default, set in increments of 4096"
    },
    {
     "k": "STP effective priority",
     "v": "base + VLAN ID (sys-id-ext), so VLAN 1 = 32769"
    },
    {
     "k": "STP bridge ID",
     "v": "4-bit priority + 12-bit sys-id-ext (VLAN) + 6-byte MAC"
    },
    {
     "k": "STP cost (short mode, default)",
     "v": "10G=2, 1G=4, 100M=19, 10M=100"
    },
    {
     "k": "STP cost (long mode)",
     "v": "10G=2000, 1G=20000, 100M=200000, 10M=2,000,000"
    },
    {
     "k": "802.1D STP timers",
     "v": "Hello 2s, Forward Delay 15s, Max Age 20s"
    },
    {
     "k": "STP convergence (direct)",
     "v": "30s = 15s listening + 15s learning"
    },
    {
     "k": "STP convergence (indirect failure)",
     "v": "up to 50s = 20 max age + 15 + 15"
    },
    {
     "k": "STP standards",
     "v": "802.1D=STP, 802.1w=RSTP, 802.1s=MST, PVST+=Cisco per-VLAN"
    },
    {
     "k": "802.1D port states",
     "v": "5: disabled, blocking, listening, learning, forwarding"
    },
    {
     "k": "RSTP port states",
     "v": "3: discarding, learning, forwarding"
    },
    {
     "k": "RSTP port roles",
     "v": "root, designated, alternate (backup to root), backup (backup to designated)"
    },
    {
     "k": "EtherChannel max active links",
     "v": "8"
    },
    {
     "k": "LACP standby",
     "v": "can configure 16 (8 active + 8 hot-standby); PAgP and data plane = 8 max"
    },
    {
     "k": "Native VLAN mismatch log",
     "v": "%CDP-4-NATIVE_VLAN_MISMATCH"
    },
    {
     "k": "Trunk allowed VLANs (default)",
     "v": "all (1 to 4094); prune with switchport trunk allowed vlan"
    },
    {
     "k": "Router-on-a-stick syntax",
     "v": "subinterface + encapsulation dot1Q <vlan>"
    },
    {
     "k": "L3 switch SVI routing",
     "v": "ip routing + interface vlan <X>"
    },
    {
     "k": "CAPWAP control / data ports",
     "v": "UDP 5246 (control), UDP 5247 (data)"
    },
    {
     "k": "RADIUS (AAA) ports",
     "v": "UDP 1812 auth, 1813 accounting"
    },
    {
     "k": "2.4 GHz non-overlapping channels",
     "v": "1, 6, 11"
    },
    {
     "k": "LLDP timers (default)",
     "v": "advertise 30s, hold 120s"
    },
    {
     "k": "CDP timers (default)",
     "v": "advertise 60s, hold 180s"
    },
    {
     "k": "VTP modes",
     "v": "server, client, transparent, off (higher revision number can wipe VLAN DB)"
    }
   ],
   "pairs": [
    {
     "a": "Access port",
     "b": "Trunk port",
     "diff": "Access = 1 VLAN, untagged. Trunk = many VLANs, 802.1Q tagged (native is untagged)."
    },
    {
     "a": "802.1Q",
     "b": "ISL",
     "diff": "802.1Q inserts a 4-byte tag, open standard, has native VLAN. ISL fully encapsulates (30 bytes), Cisco-only, dead."
    },
    {
     "a": "STP (802.1D)",
     "b": "RSTP (802.1w)",
     "diff": "STP: 30 to 50s converge, 5 port states. RSTP: sub-second, 3 states, backward compatible."
    },
    {
     "a": "Root Bridge",
     "b": "Root Port",
     "diff": "Root Bridge = lowest bridge ID (whole topology). Root Port = each non-root switch's best port to root."
    },
    {
     "a": "LACP",
     "b": "PAgP",
     "diff": "LACP = 802.3ad open (active/passive). PAgP = Cisco (desirable/auto)."
    },
    {
     "a": "PortFast",
     "b": "BPDU Guard",
     "diff": "PortFast skips listen/learn on access ports. BPDU Guard err-disables that port if a BPDU arrives."
    },
    {
     "a": "BPDU Guard",
     "b": "Root Guard",
     "diff": "BPDU Guard err-disables on ANY BPDU. Root Guard blocks only a SUPERIOR BPDU to protect the root."
    },
    {
     "a": "Loop Guard",
     "b": "BPDU Filter",
     "diff": "Loop Guard stops a blocking port going forward when BPDUs stop. BPDU Filter just suppresses sending BPDUs."
    },
    {
     "a": "CDP",
     "b": "LLDP",
     "diff": "CDP = Cisco, on by default. LLDP = 802.1AB open, off by default on Cisco."
    },
    {
     "a": "Router-on-a-stick",
     "b": "L3 switch SVI",
     "diff": "ROAS = one router link, dot1Q subinterfaces. SVI = ip routing + interface vlan, faster, no trunk bottleneck."
    },
    {
     "a": "DTP auto+auto",
     "b": "DTP desirable+auto",
     "diff": "auto+auto = NO trunk (both passive). desirable+auto = trunk forms."
    },
    {
     "a": "Autonomous AP",
     "b": "Lightweight AP",
     "diff": "Autonomous = standalone. Lightweight = split-MAC, run by WLC over CAPWAP."
    },
    {
     "a": "WPA2",
     "b": "WPA3",
     "diff": "WPA2 = AES/CCMP. WPA3 = SAE handshake, stronger, forward secrecy."
    },
    {
     "a": "WPA Personal (PSK)",
     "b": "WPA Enterprise",
     "diff": "PSK = shared password. Enterprise = 802.1X/EAP to a RADIUS server."
    }
   ],
   "traps": [
    {
     "trigger": "Trunk forms but CDP logs a VLAN mismatch / two natives merge",
     "answer": "Native VLAN mismatch (%CDP-4-NATIVE_VLAN_MISMATCH); both native VLANs merge = security risk"
    },
    {
     "trigger": "Which switch becomes root bridge?",
     "answer": "Lowest Bridge ID = lowest priority, then lowest MAC (priority default 32768, VLAN 1 shows 32769)"
    },
    {
     "trigger": "Access port goes err-disabled the instant a switch is plugged in",
     "answer": "BPDU Guard tripped (PortFast port received a BPDU)"
    },
    {
     "trigger": "Superior BPDU arrives and port blocks to protect the root",
     "answer": "Root Guard (not BPDU Guard)"
    },
    {
     "trigger": "EtherChannel won't come up between two switches",
     "answer": "Mismatched modes (auto+auto or passive+passive fail) or mismatched speed/duplex/VLAN/trunk"
    },
    {
     "trigger": "Which LACP/PAgP mode combos form a channel?",
     "answer": "LACP: active+active OK, active+passive OK, passive+passive NO. PAgP: desirable+desirable OK, desirable+auto OK, auto+auto NO. on+on OK (no negotiation), on+anything-else NO."
    },
    {
     "trigger": "Do these DTP ports form a trunk?",
     "answer": "dynamic desirable+auto YES, desirable+desirable YES, auto+auto NO; nonegotiate disables DTP"
    },
    {
     "trigger": "AP needs the controller to forward client data",
     "answer": "Lightweight AP using CAPWAP tunnel to WLC (split-MAC)"
    },
    {
     "trigger": "New switch joins VTP domain and all VLANs vanish",
     "answer": "VTP revision-number gotcha (higher-revision switch overwrote the VLAN DB); use transparent or reset revision before adding)"
    },
    {
     "trigger": "Route between VLANs over one router link",
     "answer": "Router-on-a-stick: subinterfaces with encapsulation dot1Q <vlan>"
    },
    {
     "trigger": "Phone and PC share one switch port",
     "answer": "Voice VLAN: switchport voice vlan X (voice tagged) + access VLAN (data untagged)"
    }
   ],
   "verify": [
    {
     "cmd": "show vlan brief",
     "look": "VLAN-to-port mapping, which ports are access in which VLAN"
    },
    {
     "cmd": "show interfaces trunk",
     "look": "trunking ports, native VLAN, allowed + active VLANs"
    },
    {
     "cmd": "show interfaces switchport",
     "look": "admin/oper mode, access VLAN, voice VLAN, negotiation (DTP)"
    },
    {
     "cmd": "show spanning-tree vlan X",
     "look": "root bridge, root port, port roles/costs, priority (base + sys-id-ext)"
    },
    {
     "cmd": "show etherchannel summary",
     "look": "bundle state; flags P=in port-channel, SU=in use, D=down"
    },
    {
     "cmd": "show cdp neighbors detail",
     "look": "neighbor IP, platform, local + remote port (Cisco only)"
    },
    {
     "cmd": "show lldp neighbors",
     "look": "non-Cisco neighbors (LLDP must be enabled first)"
    }
   ]
  },
  {
   "kind": "concept",
   "title": "Domain 3 core concepts",
   "domain": "3",
   "why": "IP Connectivity = 25% of exam. High-yield: routing logic, OSPF, AD, FHRP.",
   "numbers": [
    {
     "k": "AD: Directly connected",
     "v": "0"
    },
    {
     "k": "AD: Static route",
     "v": "1"
    },
    {
     "k": "AD: eBGP",
     "v": "20"
    },
    {
     "k": "AD: EIGRP (internal)",
     "v": "90"
    },
    {
     "k": "AD: OSPF",
     "v": "110"
    },
    {
     "k": "AD: RIP",
     "v": "120"
    },
    {
     "k": "AD: EIGRP (external)",
     "v": "170"
    },
    {
     "k": "AD: iBGP",
     "v": "200"
    },
    {
     "k": "AD: Unusable / unreachable",
     "v": "255"
    },
    {
     "k": "OSPF cost formula",
     "v": "Cost = 10^8 / BW(bps)"
    },
    {
     "k": "OSPF reference bandwidth (default)",
     "v": "100 Mbps. Any link >=100Mbps = cost 1 (Gig, 10Gig both 1)"
    },
    {
     "k": "Fix Gig links same cost",
     "v": "auto-cost reference-bandwidth <Mbps>, must match on all routers"
    },
    {
     "k": "OSPF Hello / Dead (broadcast & p2p)",
     "v": "10 sec / 40 sec"
    },
    {
     "k": "OSPF Hello / Dead (non-broadcast NBMA)",
     "v": "30 sec / 120 sec"
    },
    {
     "k": "OSPF all-SPF multicast",
     "v": "224.0.0.5"
    },
    {
     "k": "OSPF DR/BDR multicast",
     "v": "224.0.0.6"
    },
    {
     "k": "OSPF IP protocol number",
     "v": "89"
    },
    {
     "k": "OSPF backbone area",
     "v": "Area 0 (0.0.0.0)"
    },
    {
     "k": "OSPF priority (per-interface)",
     "v": "default 1, range 0-255. Priority 0 = never DR/BDR"
    },
    {
     "k": "OSPF network statement (wildcard)",
     "v": "network 10.0.0.0 0.0.0.255 area 0 (/24 wildcard = 0.0.0.255)"
    },
    {
     "k": "OSPF inject default route",
     "v": "default-information originate"
    },
    {
     "k": "EIGRP K-values (default)",
     "v": "K1=K3=1, K2=K4=K5=0. Metric uses bandwidth (slowest) + delay (cumulative)"
    },
    {
     "k": "HSRP priority (default)",
     "v": "100 (higher wins)"
    },
    {
     "k": "HSRPv1 vMAC",
     "v": "0000.0c07.acGG (GG = group # in hex, 00-FF, groups 0-255)"
    },
    {
     "k": "HSRPv2 vMAC",
     "v": "0000.0c9f.fGGG (GGG = group # in hex, 000-FFF, groups 0-4095)"
    },
    {
     "k": "HSRPv1 multicast",
     "v": "224.0.0.2"
    },
    {
     "k": "HSRPv2 multicast",
     "v": "224.0.0.102"
    },
    {
     "k": "VRRP vMAC",
     "v": "0000.5e00.01GG (GG = group # in hex)"
    },
    {
     "k": "VRRP multicast",
     "v": "224.0.0.18"
    },
    {
     "k": "VRRP priority",
     "v": "default 100. Owner of virtual IP = 255"
    },
    {
     "k": "GLBP vMAC",
     "v": "0007.b4xx.xxxx (AVG assigns, AVFs forward)"
    },
    {
     "k": "Floating static route syntax",
     "v": "ip route <net> <mask> <next-hop> <AD> (AD higher than primary)"
    }
   ],
   "pairs": [
    {
     "a": "Administrative Distance (AD)",
     "b": "Metric",
     "diff": "AD picks between protocols (trust). Metric picks best path within one protocol."
    },
    {
     "a": "OSPF DR",
     "b": "OSPF BDR",
     "diff": "DR = highest priority, then highest RID. BDR = runner-up. Election is NON-preemptive."
    },
    {
     "a": "OSPF priority 0",
     "b": "OSPF priority 1-255",
     "diff": "0 = ineligible, never DR/BDR. 1 (default) up to 255 = eligible, higher wins."
    },
    {
     "a": "Router ID order",
     "b": "When locked",
     "diff": "1) manual router-id 2) highest loopback 3) highest active IP. Locks at process start; later loopback needs clear ip ospf process."
    },
    {
     "a": "Static next-hop",
     "b": "Static exit-interface",
     "diff": "Next-hop = recursive lookup. Exit-interface on multi-access needs ARP per dest; use fully specified (interface + next-hop)."
    },
    {
     "a": "Default route 0.0.0.0/0",
     "b": "Network route",
     "diff": "Default = gateway of last resort. Used only when no longer prefix matches."
    },
    {
     "a": "OSPF broadcast",
     "b": "OSPF point-to-point",
     "diff": "Broadcast (Ethernet) elects DR/BDR. p2p (serial) does NOT. Both Hello 10 / Dead 40."
    },
    {
     "a": "HSRP / VRRP",
     "b": "GLBP",
     "diff": "HSRP & VRRP = active/standby (one forwards). GLBP = load-balances all gateways. HSRP=Cisco, VRRP=open."
    },
    {
     "a": "HSRP preempt",
     "b": "VRRP preempt",
     "diff": "HSRP preempt OFF by default (must set standby <grp> preempt). VRRP preempt ON by default."
    },
    {
     "a": "OSPF 2WAY state",
     "b": "OSPF FULL state",
     "diff": "2WAY = neighbors see each other (normal DROTHER-to-DROTHER). FULL = LSDB synced (goal, with DR/BDR or p2p)."
    },
    {
     "a": "EIGRP successor",
     "b": "EIGRP feasible successor",
     "diff": "Successor = best route (in table). FS = loop-free backup, condition RD < FD."
    }
   ],
   "traps": [
    {
     "trigger": "Two routes, same dest, different protocols, which installs?",
     "answer": "Lowest AD wins (OSPF 110 beats RIP 120), metric ignored."
    },
    {
     "trigger": "Two routes, same protocol, same AD, which wins?",
     "answer": "Lowest metric (OSPF lowest cost)."
    },
    {
     "trigger": "Different prefix lengths match one packet",
     "answer": "Longest prefix match wins (/30 beats /24 beats /0)."
    },
    {
     "trigger": "OSPF stuck in EXSTART / EXCHANGE",
     "answer": "MTU mismatch on the link."
    },
    {
     "trigger": "OSPF neighbors never form, no Hellos",
     "answer": "Mismatched Hello/Dead, area ID, subnet/mask, or auth. Also passive-interface."
    },
    {
     "trigger": "passive-interface configured, no neighbor but route still appears",
     "answer": "Passive stops Hellos (no adjacency) but still advertises the network."
    },
    {
     "trigger": "Higher-priority router added, does NOT become DR",
     "answer": "OSPF DR election is non-preemptive. Only DR failure re-elects."
    },
    {
     "trigger": "Router should never be DR/BDR",
     "answer": "Set OSPF priority 0 on the interface."
    },
    {
     "trigger": "Backup route used only if primary fails",
     "answer": "Floating static route, AD higher than primary."
    },
    {
     "trigger": "Standby router with higher priority did not take over (FHRP)",
     "answer": "HSRP preempt is OFF by default; must configure standby <grp> preempt."
    },
    {
     "trigger": "Which router is VRRP master with priority 255",
     "answer": "The owner of the virtual IP address."
    }
   ]
  },
  {
   "kind": "concept",
   "title": "Domain 4 core concepts",
   "domain": "4",
   "why": "Domain 4 (IP Services) is 10% of the exam and pure recall: ports, severity levels, NAT terms, DORA. Easy points if numbers are memorized.",
   "numbers": [
    {
     "k": "DHCP server port",
     "v": "UDP 67"
    },
    {
     "k": "DHCP client port",
     "v": "UDP 68"
    },
    {
     "k": "DNS query port",
     "v": "UDP 53"
    },
    {
     "k": "DNS zone transfer",
     "v": "TCP 53"
    },
    {
     "k": "NTP port",
     "v": "UDP 123"
    },
    {
     "k": "SNMP agent port",
     "v": "UDP 161"
    },
    {
     "k": "SNMP trap port",
     "v": "UDP 162"
    },
    {
     "k": "Syslog port",
     "v": "UDP 514"
    },
    {
     "k": "SSH port",
     "v": "TCP 22"
    },
    {
     "k": "Telnet port",
     "v": "TCP 23"
    },
    {
     "k": "HTTP port",
     "v": "TCP 80"
    },
    {
     "k": "HTTPS port",
     "v": "TCP 443"
    },
    {
     "k": "FTP control port",
     "v": "TCP 21"
    },
    {
     "k": "FTP data port",
     "v": "TCP 20"
    },
    {
     "k": "TFTP port",
     "v": "UDP 69"
    },
    {
     "k": "RADIUS ports",
     "v": "UDP 1812 auth, UDP 1813 accounting (older 1645/1646)"
    },
    {
     "k": "TACACS+ port",
     "v": "TCP 49"
    },
    {
     "k": "RADIUS vs TACACS+",
     "v": "RADIUS encrypts password only, combines authN+authZ. TACACS+ encrypts whole payload, separates AAA."
    },
    {
     "k": "DORA order",
     "v": "Discover, Offer, Request, Ack"
    },
    {
     "k": "DHCP broadcast steps",
     "v": "Discover is broadcast. Request is broadcast at initial lease, unicast at renewal (T1). Offer and Ack come from server."
    },
    {
     "k": "DHCP relay command",
     "v": "ip helper-address <server-IP> (under client-facing SVI/interface)"
    },
    {
     "k": "ip helper-address trap",
     "v": "Forwards 8 UDP services by default, not just DHCP (also TFTP 69, DNS 53, TACACS 49, time, NetBIOS)"
    },
    {
     "k": "DHCP server config",
     "v": "ip dhcp pool NAME, then network <net> <mask>, default-router <ip>, dns-server <ip>"
    },
    {
     "k": "DHCP reserve addresses",
     "v": "ip dhcp excluded-address <start> <end>"
    },
    {
     "k": "Syslog severity 0",
     "v": "Emergency (system unusable)"
    },
    {
     "k": "Syslog severity 1",
     "v": "Alert"
    },
    {
     "k": "Syslog severity 2",
     "v": "Critical"
    },
    {
     "k": "Syslog severity 3",
     "v": "Error"
    },
    {
     "k": "Syslog severity 4",
     "v": "Warning"
    },
    {
     "k": "Syslog severity 5",
     "v": "Notification (Notice)"
    },
    {
     "k": "Syslog severity 6",
     "v": "Informational"
    },
    {
     "k": "Syslog severity 7",
     "v": "Debugging (lowest, most verbose)"
    },
    {
     "k": "Syslog mnemonic",
     "v": "Every Awesome Cisco Engineer Will Need Ice cream (0-7)"
    },
    {
     "k": "Syslog rule",
     "v": "Lower number = higher severity. 0=most severe, 7=least."
    },
    {
     "k": "NTP stratum 0",
     "v": "Reference clock (atomic/GPS)"
    },
    {
     "k": "NTP stratum 1",
     "v": "Device directly attached to stratum 0"
    },
    {
     "k": "NTP stratum higher",
     "v": "Each hop adds 1, farther from source"
    },
    {
     "k": "NTP set as source",
     "v": "ntp server <ip>. Make device a master: ntp master <stratum>"
    },
    {
     "k": "NTP verify",
     "v": "show ntp status, show ntp associations"
    },
    {
     "k": "DSCP EF value",
     "v": "46 (Expedited Forwarding, used for voice)"
    },
    {
     "k": "CoS vs DSCP",
     "v": "CoS = Layer 2, 3 bits (802.1p), values 0-7. DSCP = Layer 3, 6 bits, values 0-63."
    },
    {
     "k": "PAT / NAT overload",
     "v": "Many private IPs to 1 public IP, told apart by unique source ports"
    },
    {
     "k": "NAT64",
     "v": "Separate IPv6-to-IPv4 transition mechanism. NOT the same as PAT overload."
    },
    {
     "k": "NAT interface marking",
     "v": "ip nat inside (LAN side), ip nat outside (WAN side). Missing this = NAT breaks."
    },
    {
     "k": "PAT config",
     "v": "ip nat inside source list <ACL> interface <int> overload"
    },
    {
     "k": "NAT verify",
     "v": "show ip nat translations"
    },
    {
     "k": "SNMP versions",
     "v": "v1 and v2c = community string only, no encryption. v3 adds auth + encryption."
    },
    {
     "k": "SNMPv3 security levels",
     "v": "noAuthNoPriv, authNoPriv, authPriv (authPriv = both auth and encryption)"
    },
    {
     "k": "SNMP TRAP vs INFORM",
     "v": "Both agent-initiated. TRAP not acknowledged, INFORM is acknowledged."
    },
    {
     "k": "SSH version",
     "v": "Use SSHv2"
    },
    {
     "k": "SSH prereqs",
     "v": "hostname + ip domain-name + crypto key generate rsa (1024-bit min)"
    }
   ],
   "pairs": [
    {
     "a": "Inside local",
     "b": "Inside global",
     "diff": "Inside local = private IP of internal host before NAT. Inside global = public IP it is translated TO."
    },
    {
     "a": "Outside global",
     "b": "Outside local",
     "diff": "Outside global = real public IP of external host. Outside local = how inside sees that external host (rarely changed)."
    },
    {
     "a": "Static NAT",
     "b": "Dynamic NAT",
     "diff": "Static = fixed manual 1-to-1 mapping. Dynamic = pool of public IPs, one host gets one public IP at a time from the pool."
    },
    {
     "a": "PAT (overload)",
     "b": "Dynamic NAT",
     "diff": "PAT = many-to-1 using port numbers (overload keyword). Dynamic NAT = pool, one host gets one public IP at a time, can exhaust pool."
    },
    {
     "a": "PAT",
     "b": "NAT64",
     "diff": "PAT = many private IPv4 to one public IPv4 via ports. NAT64 = translates IPv6 to IPv4, a transition mechanism only."
    },
    {
     "a": "SNMPv2c",
     "b": "SNMPv3",
     "diff": "v2c = community string only, no encryption/auth. v3 adds authentication and encryption (authPriv)."
    },
    {
     "a": "SNMP TRAP",
     "b": "SNMP INFORM",
     "diff": "TRAP = fire and forget, no ack. INFORM = acknowledged by the manager."
    },
    {
     "a": "Policing",
     "b": "Shaping",
     "diff": "Policing drops/remarks excess immediately (no buffer). Shaping buffers/queues excess to smooth the rate (adds delay)."
    },
    {
     "a": "Classification",
     "b": "Marking",
     "diff": "Classification identifies/sorts traffic. Marking sets a value (DSCP/CoS) so downstream devices honor it."
    },
    {
     "a": "CoS",
     "b": "DSCP",
     "diff": "CoS = Layer 2, 3 bits, 0-7. DSCP = Layer 3, 6 bits, 0-63. Classic L2-vs-L3 trap."
    },
    {
     "a": "RADIUS",
     "b": "TACACS+",
     "diff": "RADIUS = UDP 1812/1813, encrypts password only, combines authN+authZ. TACACS+ = TCP 49, encrypts whole payload, separates AAA."
    },
    {
     "a": "Telnet",
     "b": "SSH",
     "diff": "Telnet TCP 23 sends cleartext. SSH TCP 22 encrypts the session. Always choose SSH."
    }
   ],
   "traps": [
    {
     "trigger": "Hosts in remote subnet get no IP and there is no local DHCP server",
     "answer": "Configure ip helper-address on the router/SVI interface facing the clients (DHCP relay)."
    },
    {
     "trigger": "Many internal private hosts must share a single public IP",
     "answer": "PAT / NAT overload (ip nat inside source list ... overload)."
    },
    {
     "trigger": "NAT is configured but not translating anything",
     "answer": "Check ip nat inside / ip nat outside are on the correct interfaces."
    },
    {
     "trigger": "Question asks which Syslog level is most severe",
     "answer": "Level 0 = Emergency (lowest number = highest severity)."
    },
    {
     "trigger": "Need secure encrypted remote management replacing cleartext access",
     "answer": "SSH (TCP 22), not Telnet."
    },
    {
     "trigger": "Need authentication AND encryption for network monitoring",
     "answer": "SNMPv3 (authPriv), not v2c."
    },
    {
     "trigger": "Need acknowledged SNMP notifications",
     "answer": "INFORM, not TRAP (TRAP is unacknowledged)."
    },
    {
     "trigger": "AAA server must encrypt the entire packet and separate the AAA functions",
     "answer": "TACACS+ (TCP 49), not RADIUS."
    },
    {
     "trigger": "Voice traffic needs priority marking",
     "answer": "DSCP EF (value 46)."
    },
    {
     "trigger": "Marking value lives at Layer 2 in the 802.1Q tag",
     "answer": "CoS (3 bits), not DSCP (DSCP is Layer 3, 6 bits)."
    },
    {
     "trigger": "Verify NAT/PAT translations are happening",
     "answer": "show ip nat translations."
    }
   ]
  },
  {
   "kind": "concept",
   "title": "Domain 5 core concepts",
   "domain": "5",
   "why": "Security is 15% of the exam: ACL numbers, L2 defenses, AAA, device hardening, and wireless are fast point-grabs.",
   "numbers": [
    {
     "k": "Standard ACL range",
     "v": "1-99 (1300-1999 rarely tested)"
    },
    {
     "k": "Extended ACL range",
     "v": "100-199 (2000-2699 rarely tested)"
    },
    {
     "k": "Standard ACL filters on",
     "v": "source IP only"
    },
    {
     "k": "Extended ACL filters on",
     "v": "src/dst IP, protocol, src/dst port (5-tuple)"
    },
    {
     "k": "Implicit deny",
     "v": "deny any at end of every ACL, not shown"
    },
    {
     "k": "ACL processing",
     "v": "top-down, first match wins, most specific first"
    },
    {
     "k": "Wildcard math rule",
     "v": "wildcard = 255.255.255.255 minus subnet mask"
    },
    {
     "k": "Wildcard for one host",
     "v": "0.0.0.0 (or keyword host)"
    },
    {
     "k": "Wildcard match any",
     "v": "255.255.255.255 (or keyword any)"
    },
    {
     "k": "Wildcard for /24",
     "v": "0.0.0.255 (block size 256)"
    },
    {
     "k": "Wildcard for /26 mask .192",
     "v": "0.0.0.63 (block size 64)"
    },
    {
     "k": "Apply ACL to interface",
     "v": "ip access-group X in|out"
    },
    {
     "k": "Apply ACL to VTY lines",
     "v": "access-class X in"
    },
    {
     "k": "TACACS+ port",
     "v": "TCP 49"
    },
    {
     "k": "RADIUS auth/acct ports",
     "v": "UDP 1812 auth, 1813 acct (old 1645/1646)"
    },
    {
     "k": "SSH port",
     "v": "TCP 22"
    },
    {
     "k": "Telnet port",
     "v": "TCP 23 (cleartext)"
    },
    {
     "k": "SSH min RSA key",
     "v": "768-bit min, 1024+ for SSHv2"
    },
    {
     "k": "Port-security default max",
     "v": "1 MAC"
    },
    {
     "k": "Port-security default violation",
     "v": "shutdown (err-disabled)"
    },
    {
     "k": "Port-security recovery",
     "v": "manual shut/no shut OR errdisable recovery cause psecure-violation"
    },
    {
     "k": "DAI rate-limit (untrusted)",
     "v": "15 pps default, exceed = err-disable"
    },
    {
     "k": "WPA2 encryption",
     "v": "AES/CCMP"
    },
    {
     "k": "WPA3 personal handshake",
     "v": "SAE (replaces WPA2 4-way, still uses a passphrase)"
    },
    {
     "k": "DHCP snooping trusted port",
     "v": "facing real DHCP server / uplink (access ports untrusted by default)"
    }
   ],
   "pairs": [
    {
     "a": "Standard ACL (1-99)",
     "b": "Extended ACL (100-199)",
     "diff": "std = source IP only, place near DESTINATION | ext = 5-tuple, place near SOURCE"
    },
    {
     "a": "Named ACL",
     "b": "Numbered ACL",
     "diff": "named = edit single lines by sequence number | numbered (classic) = cannot edit one line, must rewrite"
    },
    {
     "a": "TACACS+",
     "b": "RADIUS",
     "diff": "TACACS+: TCP 49, encrypts ENTIRE payload, separates A-A-A, Cisco | RADIUS: UDP 1812/1813, encrypts ONLY password field (rest cleartext), combines authn+authz, open standard"
    },
    {
     "a": "Port-security shutdown",
     "b": "restrict / protect",
     "diff": "shutdown = err-disable + log | restrict = drop + log + counter | protect = drop silently, no log"
    },
    {
     "a": "Static MAC",
     "b": "Sticky MAC",
     "diff": "static = typed manually | sticky (switchport port-security mac-address sticky) = learned dynamically then saved to running-config"
    },
    {
     "a": "DHCP snooping",
     "b": "Dynamic ARP Inspection (DAI)",
     "diff": "snooping builds binding table (stops rogue DHCP) | DAI uses that table to drop spoofed ARP. IP Source Guard is the 3rd of the L2 trio (drops spoofed source IP)"
    },
    {
     "a": "WPA2",
     "b": "WPA3",
     "diff": "WPA2 = AES + 4-way handshake | WPA3 = SAE handshake, forward secrecy, protects weak passwords (still uses a passphrase)"
    },
    {
     "a": "PSK (personal)",
     "b": "802.1X (enterprise)",
     "diff": "PSK = one shared password | 802.1X = per-user creds via RADIUS (WPA2/3-Enterprise)"
    },
    {
     "a": "802.1X roles",
     "b": "the 3 actors",
     "diff": "supplicant = client | authenticator = switch/AP | authentication server = RADIUS"
    },
    {
     "a": "enable secret",
     "b": "enable password",
     "diff": "enable secret = hashed (Type 5 MD5 / Type 8-9 stronger) | enable password = cleartext, weak"
    },
    {
     "a": "service password-encryption",
     "b": "strong hashes",
     "diff": "Type 7 = weak, reversible (this command) | Type 5 = MD5 | Type 8 = PBKDF2 | Type 9 = scrypt (strongest)"
    },
    {
     "a": "Site-to-site VPN",
     "b": "Remote-access VPN",
     "diff": "site-to-site = always-on tunnel between gateways (IPsec) | remote-access = single user on demand (AnyConnect/SSL or IPsec)"
    },
    {
     "a": "BPDU Guard",
     "b": "Root Guard",
     "diff": "BPDU Guard err-disables a PortFast/access port if ANY BPDU arrives | Root Guard blocks a port only if a SUPERIOR BPDU tries to become root"
    },
    {
     "a": "Lightweight AP",
     "b": "Autonomous AP",
     "diff": "lightweight = CAPWAP tunnel to WLC, WLC holds config | autonomous = standalone, self-configured"
    }
   ],
   "traps": [
    {
     "trigger": "ACL must match TCP port 80 / a specific destination",
     "answer": "extended ACL (100-199), placed close to SOURCE"
    },
    {
     "trigger": "how do you remove ONE line from an ACL without rewriting it",
     "answer": "named ACL with sequence numbers (numbered classic cannot edit one line)"
    },
    {
     "trigger": "how do you bring a port back from err-disabled after a port-security violation",
     "answer": "manual shutdown then no shutdown, OR errdisable recovery cause psecure-violation + recovery interval"
    },
    {
     "trigger": "learns the MAC dynamically then saves it to running-config",
     "answer": "sticky MAC (switchport port-security mac-address sticky)"
    },
    {
     "trigger": "encrypts the entire packet body / separates authentication from authorization / Cisco",
     "answer": "TACACS+ (TCP 49)"
    },
    {
     "trigger": "open-standard AAA, combines authentication and authorization, UDP",
     "answer": "RADIUS (1812/1813)"
    },
    {
     "trigger": "which A logs what commands a user ran",
     "answer": "Accounting (Authentication=who, Authorization=what allowed, Accounting=what they did)"
    },
    {
     "trigger": "secure remote management / replace Telnet",
     "answer": "SSH (TCP 22): hostname + ip domain-name + crypto key generate rsa + transport input ssh + login local"
    },
    {
     "trigger": "WLAN needs per-user login via a central server, not one shared key",
     "answer": "802.1X (WPA2/WPA3-Enterprise)"
    },
    {
     "trigger": "the client in 802.1X",
     "answer": "supplicant (switch=authenticator, RADIUS=authentication server)"
    },
    {
     "trigger": "prevents a rogue/unauthorized DHCP server on an access port",
     "answer": "DHCP snooping (uplink trusted, access untrusted)"
    },
    {
     "trigger": "CAM table overflow / switch floods all ports",
     "answer": "MAC flooding, mitigated by port-security"
    },
    {
     "trigger": "double-tagging attack hops VLANs",
     "answer": "VLAN hopping, mitigated by disabling DTP, no native VLAN 1, switchport mode access"
    },
    {
     "trigger": "port goes err-disabled when an unexpected device sends a BPDU on a PortFast port",
     "answer": "BPDU Guard"
    },
    {
     "trigger": "AP tunnels to a WLC over CAPWAP",
     "answer": "lightweight AP"
    }
   ]
  },
  {
   "kind": "concept",
   "title": "Domain 6 core concepts",
   "domain": "6",
   "why": "10% of exam: pure recall on SDN planes (traditional vs controller-based), REST verbs/codes/CRUD, JSON/YAML syntax, and which config tool is agentless/push vs agent/pull.",
   "numbers": [
    {
     "k": "HTTP port",
     "v": "TCP 80"
    },
    {
     "k": "HTTPS port",
     "v": "TCP 443"
    },
    {
     "k": "REST is",
     "v": "stateless, HTTP-based (uses verbs + URI + status codes)"
    },
    {
     "k": "CRUD to verb map",
     "v": "CREATE=POST, READ=GET, UPDATE=PUT/PATCH, DELETE=DELETE"
    },
    {
     "k": "GET",
     "v": "read/retrieve (safe, no change)"
    },
    {
     "k": "POST",
     "v": "create new resource (NOT idempotent)"
    },
    {
     "k": "PUT",
     "v": "replace whole resource (idempotent)"
    },
    {
     "k": "PATCH",
     "v": "partial update of a resource"
    },
    {
     "k": "DELETE",
     "v": "remove a resource (idempotent)"
    },
    {
     "k": "Idempotent verbs",
     "v": "GET, PUT, DELETE (repeat = same result); POST is NOT"
    },
    {
     "k": "HTTP 200",
     "v": "OK (success)"
    },
    {
     "k": "HTTP 201",
     "v": "Created (new resource made)"
    },
    {
     "k": "HTTP 400",
     "v": "Bad Request (client error)"
    },
    {
     "k": "HTTP 401",
     "v": "Unauthorized (no/invalid auth)"
    },
    {
     "k": "HTTP 403",
     "v": "Forbidden (auth OK, not allowed)"
    },
    {
     "k": "HTTP 404",
     "v": "Not Found"
    },
    {
     "k": "HTTP 500",
     "v": "Internal Server Error (the 5xx example)"
    },
    {
     "k": "HTTP code classes",
     "v": "2xx success / 3xx redirect / 4xx client error / 5xx server error"
    },
    {
     "k": "REST auth",
     "v": "API key, bearer token, or Basic auth (sent in header)"
    },
    {
     "k": "JSON syntax",
     "v": "curly braces {} + square brackets [] for arrays, double quotes, commas"
    },
    {
     "k": "YAML syntax",
     "v": "key: value (space after colon), indentation with SPACES not tabs, list = dash -"
    },
    {
     "k": "XML syntax",
     "v": "<tag></tag>, most verbose, used by NETCONF"
    },
    {
     "k": "YANG",
     "v": "the data MODEL used by NETCONF and RESTCONF"
    },
    {
     "k": "Ansible",
     "v": "agentless | PUSH | SSH/TCP 22 | YAML playbooks (written in Python)"
    },
    {
     "k": "Puppet",
     "v": "agent | PULL | TCP 8140 | Ruby manifests"
    },
    {
     "k": "Chef",
     "v": "agent | PULL | HTTPS/TCP 443 | Ruby recipes/cookbooks"
    },
    {
     "k": "3 planes",
     "v": "Control (decisions) / Data=Forwarding (moves packets) / Management (admin: SSH/Telnet/SNMP/syslog)"
    },
    {
     "k": "Traditional networking",
     "v": "each device has its OWN control plane (distributed)"
    },
    {
     "k": "Controller-based (SDN)",
     "v": "control plane CENTRALIZED on the controller"
    },
    {
     "k": "Cisco DNA Center",
     "v": "SDN controller for intent-based networking (software-defined campus); apps reach it via Northbound REST"
    },
    {
     "k": "Northbound API (NBI)",
     "v": "controller UP to apps = REST (faces up)"
    },
    {
     "k": "Southbound API (SBI)",
     "v": "controller DOWN to devices: OpenFlow, NETCONF (also CLI, SNMP)"
    },
    {
     "k": "NETCONF",
     "v": "XML over SSH, TCP 830"
    },
    {
     "k": "RESTCONF",
     "v": "JSON or XML over HTTPS, TCP 443"
    },
    {
     "k": "Automation benefits",
     "v": "fewer human errors, config consistency, faster deploy, scalability"
    }
   ],
   "pairs": [
    {
     "a": "Control plane",
     "b": "Data (forwarding) plane",
     "diff": "Control = builds tables (routing, STP, ARP); Data = forwards packets using those tables"
    },
    {
     "a": "Traditional networking",
     "b": "Controller-based (SDN)",
     "diff": "Traditional = control plane on EACH device; SDN = control plane centralized on the controller"
    },
    {
     "a": "Ansible",
     "b": "Puppet / Chef",
     "diff": "Ansible = agentless + PUSH; Puppet/Chef = agent-based + PULL"
    },
    {
     "a": "Push model",
     "b": "Pull model",
     "diff": "Push = controller sends config to nodes (Ansible); Pull = nodes fetch config from server (Puppet/Chef)"
    },
    {
     "a": "Northbound API",
     "b": "Southbound API",
     "diff": "Northbound = controller UP to apps (REST); Southbound = controller DOWN to devices (OpenFlow/NETCONF)"
    },
    {
     "a": "JSON",
     "b": "YAML",
     "diff": "JSON = {} and [] with quotes/commas; YAML = indentation + dashes, no braces, human-readable"
    },
    {
     "a": "PUT",
     "b": "PATCH",
     "diff": "PUT replaces the WHOLE resource; PATCH updates only PART"
    },
    {
     "a": "POST",
     "b": "PUT",
     "diff": "POST creates new (not idempotent); PUT replaces existing (idempotent)"
    },
    {
     "a": "NETCONF",
     "b": "RESTCONF",
     "diff": "NETCONF = XML over SSH (830); RESTCONF = JSON/XML over HTTPS (443); both use YANG"
    }
   ],
   "traps": [
    {
     "trigger": "\"agentless\" automation tool",
     "answer": "Ansible"
    },
    {
     "trigger": "\"pull model\" / nodes fetch config / requires an agent",
     "answer": "Puppet or Chef"
    },
    {
     "trigger": "\"intent-based networking\" / software-defined campus / single pane of glass",
     "answer": "Cisco DNA Center"
    },
    {
     "trigger": "\"data format with curly braces and square brackets\"",
     "answer": "JSON"
    },
    {
     "trigger": "\"human-readable, uses indentation and dashes, no brackets\"",
     "answer": "YAML"
    },
    {
     "trigger": "\"space required after the colon / indent with spaces not tabs\"",
     "answer": "YAML syntax rules"
    },
    {
     "trigger": "\"data model used by NETCONF/RESTCONF\"",
     "answer": "YANG"
    },
    {
     "trigger": "\"controller-based architecture separates ___ plane from ___ plane\"",
     "answer": "control plane from data (forwarding) plane"
    },
    {
     "trigger": "\"which plane handles SSH/Telnet/SNMP/syslog device access\"",
     "answer": "Management plane"
    },
    {
     "trigger": "\"API the controller uses to talk to network devices\"",
     "answer": "Southbound API (OpenFlow/NETCONF)"
    },
    {
     "trigger": "\"no credentials / bad or missing token\"",
     "answer": "HTTP 401 Unauthorized"
    },
    {
     "trigger": "\"authenticated but server refuses access\"",
     "answer": "HTTP 403 Forbidden"
    },
    {
     "trigger": "\"which method is idempotent / safe to repeat with same result\"",
     "answer": "GET, PUT, or DELETE (not POST)"
    },
    {
     "trigger": "\"creates a new resource each call\"",
     "answer": "POST"
    }
   ]
  },
  {
   "kind": "config",
   "title": "VLANs, trunking, and STP",
   "why": "VLANs, 802.1Q trunks, STP root election, and RSTP states are top-weight 200-301 config and trap items.",
   "domain": "2.0 Network Access",
   "commands": [
    {
     "cmd": "conf t",
     "note": "enter global config"
    },
    {
     "cmd": "vlan 10",
     "note": "create VLAN 10 (this line alone creates it)"
    },
    {
     "cmd": "name SALES",
     "note": "name it; cosmetic only"
    },
    {
     "cmd": "interface gi0/1",
     "note": "go to the host access port"
    },
    {
     "cmd": "switchport mode access",
     "note": "force access; stops DTP negotiation"
    },
    {
     "cmd": "switchport access vlan 10",
     "note": "put host port in VLAN 10"
    },
    {
     "cmd": "switchport voice vlan 150",
     "note": "add tagged voice VLAN on same access port; data stays untagged in VLAN 10"
    },
    {
     "cmd": "spanning-tree portfast",
     "note": "EDGE/ACCESS PORTS ONLY (host-facing). Skips listening/learning, goes straight to forwarding. Never on trunks/uplinks. If a BPDU arrives it leaves edge state (err-disables if BPDU guard on)"
    },
    {
     "cmd": "spanning-tree bpduguard enable",
     "note": "err-disable the port if any BPDU arrives (rogue switch / loop protection)"
    },
    {
     "cmd": "interface gi0/24",
     "note": "go to the switch-to-switch uplink"
    },
    {
     "cmd": "switchport trunk encapsulation dot1q",
     "note": "sets 802.1Q tagging; only accepted on switches that ALSO support ISL (older 3560/3750). dot1q-only switches (2960, modern Catalyst) reject it, go straight to switchport mode trunk"
    },
    {
     "cmd": "switchport mode trunk",
     "note": "force trunk; no DTP negotiation"
    },
    {
     "cmd": "switchport trunk native vlan 99",
     "note": "set native VLAN 99 (untagged); must MATCH both ends or CDP logs native VLAN mismatch"
    },
    {
     "cmd": "switchport trunk allowed vlan 10,20,99",
     "note": "prune trunk to only these VLANs"
    },
    {
     "cmd": "switchport trunk allowed vlan add 30",
     "note": "ADD VLAN 30. Without 'add' you OVERWRITE the whole allowed list"
    },
    {
     "cmd": "switchport nonegotiate",
     "note": "disable DTP entirely (stop sending/processing DTP frames)"
    },
    {
     "cmd": "spanning-tree mode rapid-pvst",
     "note": "enable RSTP (802.1w) per VLAN"
    },
    {
     "cmd": "spanning-tree vlan 10 root primary",
     "note": "macro: sets priority 24576 for VLAN 10 (becomes root)"
    },
    {
     "cmd": "spanning-tree vlan 10 root secondary",
     "note": "macro: sets priority 28672 (backup root)"
    },
    {
     "cmd": "spanning-tree vlan 10 priority 4096",
     "note": "explicit priority; must be a multiple of 4096"
    },
    {
     "cmd": "errdisable recovery cause bpduguard",
     "note": "auto-recover BPDU-guarded ports"
    },
    {
     "cmd": "errdisable recovery interval 300",
     "note": "recovery timer in seconds (default 300)"
    },
    {
     "cmd": "interface gi0/0.10 / encapsulation dot1q 10 / ip address ...",
     "note": "router-on-a-stick subinterface for inter-VLAN routing (tag VLAN 10)"
    },
    {
     "cmd": "interface vlan 10 / no shutdown (plus ip routing)",
     "note": "L3 switch SVI alternative; 'ip routing' enables inter-VLAN routing"
    }
   ],
   "verify": [
    {
     "cmd": "show vlan brief",
     "look": "VLAN 10 exists and gi0/1 is listed under it; trunk ports do NOT appear here"
    },
    {
     "cmd": "show interfaces gi0/1 switchport",
     "look": "AUTHORITATIVE access check: Administrative Mode=static access, Access Mode VLAN=10, Voice VLAN=150"
    },
    {
     "cmd": "show interfaces trunk",
     "look": "Mode=on (forced trunk), Encap=802.1q, Native vlan=99, Vlans allowed = 10,20,99"
    },
    {
     "cmd": "show interfaces gi0/24 switchport",
     "look": "AUTHORITATIVE trunk check: Administrative Mode=trunk, Operational Mode=trunk, Trunking Native Mode VLAN=99"
    },
    {
     "cmd": "show spanning-tree vlan 10",
     "look": "'This bridge is the root', Root ID priority = 24576 (or 4096), port roles/states"
    },
    {
     "cmd": "show spanning-tree interface gi0/1 detail",
     "look": "Portfast edge enabled, BPDU guard configured; check for err-disabled"
    }
   ],
   "numbers": [
    {
     "k": "802.1Q tag size",
     "v": "4 bytes added to the frame"
    },
    {
     "k": "802.1Q VID field",
     "v": "12 bits (0-4095); 0 and 4095 reserved, so usable VLAN IDs 1-4094"
    },
    {
     "k": "Normal VLAN range",
     "v": "1-1005 (1002-1005 reserved Token Ring/FDDI; 1-1001 usable Ethernet)"
    },
    {
     "k": "Extended VLAN range",
     "v": "1006-4094 (older IOS needs VTP transparent mode)"
    },
    {
     "k": "Default native VLAN",
     "v": "VLAN 1 (untagged on trunk)"
    },
    {
     "k": "Default STP bridge priority",
     "v": "32768"
    },
    {
     "k": "Priority step / valid values",
     "v": "multiples of 4096 only (4 high-order bits): 0, 4096, 8192 ... 61440"
    },
    {
     "k": "root primary / root secondary",
     "v": "primary sets 24576, secondary sets 28672"
    },
    {
     "k": "Bridge ID priority field",
     "v": "configured priority (mult of 4096) + VLAN ID (extended system ID). Default VLAN 10 = 32768+10 = 32778"
    },
    {
     "k": "802.1D STP timers",
     "v": "Hello 2s, Forward delay 15s, Max age 20s; convergence 30-50s (20 + 2x15)"
    },
    {
     "k": "RSTP/802.1w convergence",
     "v": "sub-second to a few seconds via proposal/agreement"
    },
    {
     "k": "802.1D states (5)",
     "v": "Disabled, Blocking, Listening, Learning, Forwarding"
    },
    {
     "k": "RSTP states (3)",
     "v": "Discarding, Learning, Forwarding"
    },
    {
     "k": "RSTP port roles (4)",
     "v": "Root, Designated, Alternate, Backup"
    },
    {
     "k": "Root/designated selection order",
     "v": "1) lowest root path cost 2) lowest sender bridge ID 3) lowest sender port ID"
    },
    {
     "k": "IEEE short path cost",
     "v": "10 Mbps=100, 100 Mbps=19, 1 Gbps=4, 10 Gbps=2"
    },
    {
     "k": "RSTP mode command",
     "v": "spanning-tree mode rapid-pvst (RSTP = 802.1w)"
    },
    {
     "k": "errdisable recovery interval default",
     "v": "300 seconds"
    },
    {
     "k": "Default DTP mode",
     "v": "dynamic auto (most Catalyst); 'switchport nonegotiate' disables DTP"
    },
    {
     "k": "DTP trunk matrix",
     "v": "auto+auto=access (no trunk), auto+desirable=trunk, desirable+desirable=trunk, on+on=trunk, on+access=mismatch"
    }
   ],
   "traps": [
    {
     "trigger": "Trunk up but some VLANs cannot pass",
     "answer": "Native VLAN mismatch, or VLAN missing from 'allowed vlan' list on one end"
    },
    {
     "trigger": "'switchport trunk allowed vlan 30' wipes VLANs 10,20",
     "answer": "Without the 'add' keyword the command REPLACES the entire allowed list"
    },
    {
     "trigger": "Which switch becomes STP root?",
     "answer": "Lowest bridge ID wins = lowest (priority + extended sys-ID/VLAN) first, then lowest MAC as tie-breaker. Equal configured priority -> lowest MAC. root primary sets 24576"
    },
    {
     "trigger": "PortFast port goes err-disabled when another switch plugged in",
     "answer": "BPDU guard fired (received a BPDU); recover with shut/no shut or errdisable recovery"
    },
    {
     "trigger": "Setting priority to 5000 is rejected",
     "answer": "Priority uses only the 4 high-order bits, so must be a multiple of 4096 (0, 4096, 8192 ... 61440)"
    },
    {
     "trigger": "Two switches form a trunk you never configured",
     "answer": "DTP default (dynamic auto/desirable) negotiated it; use 'switchport mode access' + 'switchport nonegotiate'"
    },
    {
     "trigger": "Two switches both at dynamic auto stay as access ports",
     "answer": "auto+auto = no trunk (both passive); one side needs desirable or on"
    },
    {
     "trigger": "Port placed in root-inconsistent state",
     "answer": "Root guard fired: it stops a port from becoming root (keeps the existing root)"
    },
    {
     "trigger": "PortFast applied to an uplink causes a loop",
     "answer": "PortFast is host/edge ports ONLY; never on switch-to-switch links"
    },
    {
     "trigger": "How many RSTP port states vs legacy STP?",
     "answer": "RSTP has 3 (Discarding/Learning/Forwarding); 802.1D has 5 (Disabled/Blocking/Listening/Learning/Forwarding)"
    },
    {
     "trigger": "Native VLAN security best practice",
     "answer": "Change native off VLAN 1 to an unused VLAN, or tag it (vlan dot1q tag native); never carry user traffic on native"
    }
   ],
   "pairs": [
    {
     "a": "BPDU guard",
     "b": "Root guard",
     "diff": "BPDU guard err-disables an edge port that RECEIVES any BPDU; root guard puts a port in root-inconsistent if a SUPERIOR BPDU arrives (stops it becoming root)"
    },
    {
     "a": "BPDU guard",
     "b": "BPDU filter",
     "diff": "Guard err-disables on BPDU receipt; filter silently drops/stops sending BPDUs (effectively disables STP on the port)"
    },
    {
     "a": "Root guard",
     "b": "Loop guard",
     "diff": "Root guard prevents a wrong switch becoming root; loop guard stops a non-designated port forwarding when BPDUs stop arriving (prevents loop on unidirectional link)"
    },
    {
     "a": "Router-on-a-stick",
     "b": "SVI (L3 switch)",
     "diff": "RoaS = subinterfaces on a router (encapsulation dot1q), one trunk link; SVI = 'interface vlan X' on a L3 switch with 'ip routing'"
    },
    {
     "a": "802.1Q",
     "b": "ISL",
     "diff": "802.1Q inserts a 4-byte tag, supports native untagged VLAN, open standard; ISL fully encapsulates the frame, Cisco-only, legacy"
    },
    {
     "a": "root primary",
     "b": "root secondary",
     "diff": "primary macro sets priority 24576; secondary sets 28672 (backup if primary fails)"
    }
   ],
   "steps": []
  },
  {
   "kind": "config",
   "title": "OSPFv2 single and multi-area",
   "domain": "IP Connectivity (OSPF)",
   "why": "OSPF config and verify is heavy on the 200-301: wildcard masks, area 0, router-id, cost, DR election, and E1 vs E2 are guaranteed points.",
   "commands": [
    {
     "cmd": "router ospf 1",
     "note": "Enter OSPF. Process ID 1 is LOCAL only. Does NOT need to match neighbors. Range 1 to 65535."
    },
    {
     "cmd": "router-id 1.1.1.1",
     "note": "Manual RID. NOT live: needs clear ip ospf process (or reload). Wins over loopback and physical IP."
    },
    {
     "cmd": "network 10.1.12.0 0.0.0.255 area 0",
     "note": "Wildcard 0.0.0.255 = inverse of 255.255.255.0 (/24). Just has to match the interface IP. network 10.1.12.1 0.0.0.0 area 0 matches ONE interface exactly. area 0 = backbone."
    },
    {
     "cmd": "network 10.1.1.0 0.0.0.255 area 0",
     "note": "LAN subnet, /24, into backbone area 0."
    },
    {
     "cmd": "network 10.1.23.0 0.0.0.255 area 1",
     "note": "Multi-area: this link goes into area 1. ABR sits between area 0 and area 1, generates Type 3 (O IA) routes."
    },
    {
     "cmd": "passive-interface GigabitEthernet0/1",
     "note": "Stops Hellos out the LAN port (no neighbors there) but STILL advertises the subnet."
    },
    {
     "cmd": "passive-interface default",
     "note": "Make ALL interfaces passive, then un-passive the real links below."
    },
    {
     "cmd": "no passive-interface GigabitEthernet0/0",
     "note": "Re-enable Hellos on the transit link. CAUTION: passive on a transit link = no neighbor, silent fail."
    },
    {
     "cmd": "auto-cost reference-bandwidth 100000",
     "note": "Ref-BW = 100000 Mbps = 100 Gbps. Default 100 Mbps (FastEthernet). MUST match on every router. Mismatch = bad paths, no log."
    },
    {
     "cmd": "default-information originate",
     "note": "Inject 0.0.0.0/0 into OSPF. Router needs its OWN default route already, OR add always."
    },
    {
     "cmd": "default-information originate always",
     "note": "Inject default even if this router has no default route itself. Shows as O*E2 on neighbors."
    },
    {
     "cmd": "exit",
     "note": "Back to global config."
    },
    {
     "cmd": "interface GigabitEthernet0/0",
     "note": "Per-interface tuning starts here."
    },
    {
     "cmd": "ip ospf cost 10",
     "note": "Hard-set interface cost. Overrides reference-bandwidth formula. Lower cost = preferred path."
    },
    {
     "cmd": "ip ospf 1 area 0",
     "note": "ALTERNATE way to enable OSPF per-interface (no network statement needed)."
    },
    {
     "cmd": "ip ospf priority 255",
     "note": "Highest priority preferred in DR election (range 0-255, default 1). 0 = never DR/BDR. NON-preemptive: won't displace an existing DR until clear ip ospf process or link flap."
    },
    {
     "cmd": "ip ospf network point-to-point",
     "note": "Force P2P type. NO DR/BDR elected on P2P. Hello 10s, Dead 40s. Broadcast (Ethernet default) and NBMA DO elect a DR."
    },
    {
     "cmd": "clear ip ospf process",
     "note": "Forces RID re-read and DR re-election. Run after changing router-id or adding a loopback. Brief outage."
    }
   ],
   "verify": [
    {
     "cmd": "show ip ospf neighbor",
     "look": "State FULL or 2WAY is stable. Broadcast: FULL/DR, FULL/BDR, 2WAY/DROTHER. EXSTART/EXCHANGE = MTU mismatch. INIT = one-way Hello (ACL or passive on one side)."
    },
    {
     "cmd": "show ip ospf interface brief",
     "look": "Confirm interface is in OSPF, its Area, Cost, network type, and neighbor count (Nbrs F/C)."
    },
    {
     "cmd": "show ip route ospf",
     "look": "Intra-area = O. Inter-area = O IA (from ABR Type 3). External = O E2 (default) or O E1. Default route = O*E2."
    },
    {
     "cmd": "show ip protocols",
     "look": "Confirms Router ID, networks/passive interfaces, and reference-bandwidth."
    },
    {
     "cmd": "show ip ospf",
     "look": "Confirms Router ID, area count, and whether router is an ABR or ASBR."
    }
   ],
   "traps": [
    {
     "trigger": "Neighbors stuck in EXSTART or EXCHANGE",
     "answer": "MTU mismatch on the link. Fix MTU or use ip ospf mtu-ignore."
    },
    {
     "trigger": "Neighbor stuck in INIT, Hello seen one direction only",
     "answer": "One-way Hello: ACL blocking, or passive-interface on one side. Router hears neighbor but neighbor does not hear back."
    },
    {
     "trigger": "Neighbors stay DOWN / never form, no Hellos",
     "answer": "Area mismatch, subnet/mask mismatch, or Hello/Dead timer mismatch. Hello 10s, Dead 40s on broadcast/p2p."
    },
    {
     "trigger": "Wildcard mask for a /26 (255.255.255.192)",
     "answer": "0.0.0.63. Wildcard = inverse of mask (255 minus each octet)."
    },
    {
     "trigger": "Wildcard for a /30 point-to-point link",
     "answer": "0.0.0.3. /30 = 255.255.255.252. P2P links on the exam are almost always /30."
    },
    {
     "trigger": "Wildcard for a /27",
     "answer": "0.0.0.31. /27 = 255.255.255.224."
    },
    {
     "trigger": "Two routers won't peer, process ID or auth blamed",
     "answer": "Process ID is LOCAL, need NOT match. Real causes: area, subnet, MTU, timers, or SAME RID on both (duplicate RID = no adjacency)."
    },
    {
     "trigger": "Costs all show 1 on 10G links",
     "answer": "Default reference-bandwidth 100 Mbps caps anything >=100M at cost 1. Raise ref-BW and match on every router."
    },
    {
     "trigger": "DR election tie, priorities equal",
     "answer": "Highest Router-ID wins. Election is NON-preemptive: a higher-priority router joining later does NOT take over."
    },
    {
     "trigger": "Where is a DR/BDR elected",
     "answer": "Broadcast (Ethernet) and NBMA only. NOT on point-to-point or point-to-multipoint."
    },
    {
     "trigger": "External route metric does not grow across the domain",
     "answer": "E2 (default, seed metric 20). E1 = external metric PLUS accumulated internal cost (grows hop by hop)."
    },
    {
     "trigger": "Loopback advertised as /32 instead of its real mask",
     "answer": "OSPF advertises loopbacks as /32 host routes by default. Use ip ospf network point-to-point on the loopback to keep the real mask."
    },
    {
     "trigger": "Two areas not touching area 0",
     "answer": "Discontiguous area: needs a virtual-link back to area 0. All non-backbone areas must connect to area 0."
    }
   ],
   "numbers": [
    {
     "k": "OSPF protocol number",
     "v": "IP protocol 89"
    },
    {
     "k": "Administrative Distance",
     "v": "110"
    },
    {
     "k": "Multicast all-OSPF / DR-BDR",
     "v": "224.0.0.5 (all SPF), 224.0.0.6 (DR/BDR)"
    },
    {
     "k": "Hello / Dead (broadcast, p2p)",
     "v": "Hello 10s, Dead 40s"
    },
    {
     "k": "Hello / Dead (NBMA, p2multipoint)",
     "v": "Hello 30s, Dead 120s"
    },
    {
     "k": "Default reference-bandwidth",
     "v": "100 Mbps (100000000 bps)"
    },
    {
     "k": "Cost formula",
     "v": "cost = reference-BW / interface-BW (min cost 1, rounded down)"
    },
    {
     "k": "RID selection order",
     "v": "1) manual router-id, 2) highest loopback IP, 3) highest active physical IP. Chosen ONCE at process start."
    },
    {
     "k": "DR election",
     "v": "Highest priority wins, tie broken by highest RID. Non-preemptive. Only on broadcast/NBMA."
    },
    {
     "k": "DR priority range / default",
     "v": "0 to 255, default 1, priority 0 = never DR/BDR"
    },
    {
     "k": "Backbone area",
     "v": "Area 0 (0.0.0.0). All other areas must touch area 0 (else virtual-link)."
    },
    {
     "k": "E1 vs E2",
     "v": "E2 = external metric only, fixed domain-wide (default, seed 20). E1 = external + internal cost to ASBR (grows)."
    },
    {
     "k": "LSA types",
     "v": "Type 1 Router, Type 2 Network (DR), Type 3 Summary (ABR, =O IA), Type 5 External (ASBR, =O E1/E2)"
    },
    {
     "k": "Classless",
     "v": "OSPF carries the mask in LSAs (classless, VLSM). Contrast RIPv1/classful."
    },
    {
     "k": "OSPFv2 vs OSPFv3",
     "v": "v2 = IPv4. v3 = IPv6, enabled per-interface (ipv6 ospf 1 area 0), uses link-local for adjacency, still 32-bit RID."
    },
    {
     "k": "Process ID range",
     "v": "1 to 65535, locally significant only"
    },
    {
     "k": "Duplicate RID",
     "v": "Two routers with the SAME router-id will NOT form an adjacency."
    }
   ],
   "fix": "Stuck adjacency by state: EXSTART/EXCHANGE = MTU mismatch. INIT = one-way Hello (ACL or passive on one side). Never leaves DOWN/never forms = area, subnet, or timer mismatch, or duplicate RID. Wrong DR = non-preemptive, run clear ip ospf process to re-elect. Wrong costs = match auto-cost reference-bandwidth on every router."
  },
  {
   "kind": "config",
   "title": "ACLs standard, extended, named",
   "why": "Top exam volume. Tests: placement, direction, src vs dst, wildcard math, implicit deny.",
   "domain": "Security Fundamentals (5.0) / IP Connectivity",
   "commands": [
    {
     "cmd": "conf t",
     "note": "enter global config."
    },
    {
     "cmd": "access-list 10 deny host 192.168.1.50",
     "note": "SPECIFIC deny goes ABOVE the broad permit. host = wildcard 0.0.0.0 (one IP)."
    },
    {
     "cmd": "access-list 10 permit 192.168.1.0 0.0.0.255",
     "note": "STANDARD numbered (1-99). SOURCE only. Permit the rest of the /24."
    },
    {
     "cmd": "interface GigabitEthernet0/1",
     "note": "interface near the DESTINATION."
    },
    {
     "cmd": "ip access-group 10 out",
     "note": "OUT: standard ACL sits near DEST, applied outbound on dest-facing interface."
    },
    {
     "cmd": "exit",
     "note": "leave interface."
    },
    {
     "cmd": "line vty 0 4",
     "note": "go to VTY lines to filter remote management."
    },
    {
     "cmd": "access-class 10 in",
     "note": "TRAP: VTY uses access-class NOT ip access-group. in = inbound Telnet/SSH to the device."
    },
    {
     "cmd": "exit",
     "note": "leave VTY config."
    },
    {
     "cmd": "access-list 110 remark allow web to server",
     "note": "remark = inline comment, no effect on filtering."
    },
    {
     "cmd": "access-list 110 permit tcp 10.1.1.0 0.0.0.255 host 10.2.2.10 eq 80",
     "note": "EXTENDED numbered (100-199). Order: protocol src-wc dst-wc port. eq 80 = HTTP."
    },
    {
     "cmd": "access-list 110 permit tcp 10.1.1.0 0.0.0.255 host 10.2.2.10 eq 443",
     "note": "second permit for HTTPS (443). One line per port."
    },
    {
     "cmd": "access-list 110 permit tcp any any established",
     "note": "established matches return traffic (ACK/RST set). Without it, one-way ext ACL kills the session."
    },
    {
     "cmd": "access-list 110 deny ip any any log",
     "note": "explicit deny+log is the ONLY way to get hit counts on dropped traffic. Implicit deny is uncounted."
    },
    {
     "cmd": "interface GigabitEthernet0/0",
     "note": "extended ACL placed close to the SOURCE."
    },
    {
     "cmd": "ip access-group 110 in",
     "note": "apply extended inbound near source. Drops unwanted traffic early."
    },
    {
     "cmd": "ip access-list extended WEB_FILTER",
     "note": "NAMED ACL. Enters nacl sub-config mode. Can be standard or extended."
    },
    {
     "cmd": "permit tcp any host 10.2.2.10 eq 22",
     "note": "inside named ACL type only the action (no list number). Auto-numbered 10."
    },
    {
     "cmd": "permit tcp any host 10.2.2.10 eq 80",
     "note": "second line. Auto-numbered 20."
    },
    {
     "cmd": "15 deny tcp any host 10.2.2.10 eq 23",
     "note": "seq 15 INSERTS between line 10 and 20. Real insertion, not append. Named ACL only."
    },
    {
     "cmd": "ip access-list resequence WEB_FILTER 10 10",
     "note": "renumber lines (start 10, step 10) to make room for future inserts."
    },
    {
     "cmd": "interface GigabitEthernet0/2",
     "note": "target interface."
    },
    {
     "cmd": "ip access-group WEB_FILTER in",
     "note": "apply by NAME. DEMO only: implicit deny drops all non-permitted traffic. Real config needs more permits."
    }
   ],
   "verify": [
    {
     "cmd": "show access-lists",
     "look": "all lines in order with per-line hit counts. Implicit deny is NOT printed."
    },
    {
     "cmd": "show ip access-lists 110",
     "look": "sequence numbers (10,20,30), protocol/port per line, packet match counts."
    },
    {
     "cmd": "show ip interface GigabitEthernet0/1",
     "look": "'Outgoing access list is 10' confirms ACL applied plus direction."
    },
    {
     "cmd": "show running-config | section access-list",
     "look": "exact ACL lines. Verify named ACL spelling matches the ip access-group."
    },
    {
     "cmd": "show running-config | section vty",
     "look": "access-class 10 in on the VTY lines (not ip access-group)."
    }
   ],
   "traps": [
    {
     "trigger": "Standard ACL filters by source AND destination",
     "answer": "FALSE. Standard (1-99) = SOURCE only. Extended = src, dst, protocol, port."
    },
    {
     "trigger": "Where do you place this ACL to be efficient?",
     "answer": "STANDARD = close to DESTINATION. EXTENDED = close to SOURCE."
    },
    {
     "trigger": "Why does standard go near the destination?",
     "answer": "It matches source only. Near the source it would block that source from reaching ALL destinations."
    },
    {
     "trigger": "ACL drops all traffic even though I added permits",
     "answer": "Implicit deny at the bottom. Anything not explicitly permitted is denied."
    },
    {
     "trigger": "Filter Telnet/SSH access to the router itself",
     "answer": "VTY lines use 'access-class 10 in', NOT 'ip access-group'."
    },
    {
     "trigger": "in or out direction",
     "answer": "From the ROUTER interface perspective, not the host. Entering iface = in, leaving = out."
    },
    {
     "trigger": "My session dropped after applying an extended ACL",
     "answer": "No permit for return traffic. Add 'established' or a return permit."
    },
    {
     "trigger": "New ACL line I added never matches",
     "answer": "First match wins, stops there. A broader line above shadows it. Reorder by sequence number."
    },
    {
     "trigger": "Remove one line from a numbered ACL",
     "answer": "You cannot. 'no access-list 10' wipes the WHOLE list. Use a named ACL to delete one line by seq number."
    },
    {
     "trigger": "Apply a second ACL same interface/direction",
     "answer": "It silently REPLACES the first. Only 1 per interface, per direction, per protocol."
    },
    {
     "trigger": "When is the ACL checked vs routing?",
     "answer": "Inbound ACL checked BEFORE routing. Outbound ACL checked AFTER routing."
    }
   ],
   "numbers": [
    {
     "k": "Standard numbered range",
     "v": "1-99 and 1300-1999"
    },
    {
     "k": "Extended numbered range",
     "v": "100-199 and 2000-2699"
    },
    {
     "k": "Standard ACL placement",
     "v": "close to DESTINATION"
    },
    {
     "k": "Extended ACL placement",
     "v": "close to SOURCE (Cisco answer)"
    },
    {
     "k": "Implicit last line",
     "v": "implicit deny any (uncounted, present once an ACE exists). Extended form = deny ip any any"
    },
    {
     "k": "VTY filtering command",
     "v": "access-class (NOT ip access-group)"
    },
    {
     "k": "host keyword",
     "v": "wildcard 0.0.0.0 (one IP)"
    },
    {
     "k": "any keyword",
     "v": "0.0.0.0 255.255.255.255 (all)"
    },
    {
     "k": "Wildcard rule",
     "v": "0 = must match bit, 1 = ignore bit (inverse of subnet mask)"
    },
    {
     "k": "Wildcard quick math",
     "v": "wildcard = 255.255.255.255 minus subnet mask"
    },
    {
     "k": "Wildcard /24",
     "v": "0.0.0.255 (mask 255.255.255.0)"
    },
    {
     "k": "Wildcard /25",
     "v": "0.0.0.127 (mask 255.255.255.128)"
    },
    {
     "k": "Wildcard /26",
     "v": "0.0.0.63 (mask 255.255.255.192)"
    },
    {
     "k": "Wildcard /30",
     "v": "0.0.0.3 (mask 255.255.255.252)"
    },
    {
     "k": "Wildcard /16",
     "v": "0.0.255.255 (mask 255.255.0.0)"
    },
    {
     "k": "Extended line order",
     "v": "protocol source-wc dest-wc [eq port]"
    },
    {
     "k": "Max ACLs",
     "v": "1 per interface, per direction, per protocol"
    },
    {
     "k": "established keyword",
     "v": "matches TCP return traffic (ACK or RST set)"
    },
    {
     "k": "HTTP / HTTPS / SSH / Telnet ports",
     "v": "80 / 443 / 22 / 23"
    },
    {
     "k": "FTP ports",
     "v": "21 control, 20 data"
    },
    {
     "k": "DNS / TFTP ports",
     "v": "53 (tcp or udp) / 69 (udp)"
    },
    {
     "k": "DNS protocol keyword",
     "v": "can be tcp OR udp: 'permit udp ... eq 53'"
    }
   ],
   "pairs": [
    {
     "a": "Standard ACL (1-99)",
     "b": "Extended ACL (100-199)",
     "diff": "Standard = source only. Extended = src, dst, protocol, port."
    },
    {
     "a": "Standard placement",
     "b": "Extended placement",
     "diff": "Standard near DEST. Extended near SOURCE."
    },
    {
     "a": "ip access-group",
     "b": "access-class",
     "diff": "access-group on data interfaces. access-class on VTY lines."
    },
    {
     "a": "Numbered ACL edit",
     "b": "Named ACL edit",
     "diff": "Numbered: cannot delete 1 line (no access-list = whole list gone). Named: delete/insert 1 line by seq number."
    },
    {
     "a": "host keyword",
     "b": "any keyword",
     "diff": "host = wildcard 0.0.0.0 (one IP). any = 0.0.0.0 255.255.255.255 (all)."
    },
    {
     "a": "in direction",
     "b": "out direction",
     "diff": "From router iface view: in = entering iface, out = leaving iface."
    },
    {
     "a": "Inbound ACL timing",
     "b": "Outbound ACL timing",
     "diff": "Inbound checked BEFORE routing. Outbound checked AFTER routing."
    }
   ],
   "steps": []
  },
  {
   "kind": "config",
   "title": "NAT static, dynamic, and PAT",
   "domain": "IP Services (4.1)",
   "why": "NAT maps private RFC1918 to public IPv4; one or two config or show-output questions are near-guaranteed. IPv4-only concept.",
   "numbers": [
    {
     "k": "ANCHOR (memorize first)",
     "v": "local = name seen on INSIDE. global = name seen on INTERNET. inside = your host. outside = their host."
    },
    {
     "k": "inside local",
     "v": "private IP of your host (before NAT)"
    },
    {
     "k": "inside global",
     "v": "public IP your host shows to internet (after NAT)"
    },
    {
     "k": "outside global",
     "v": "real public IP of remote host"
    },
    {
     "k": "outside local",
     "v": "how remote host appears to inside; = outside global in basic NAT"
    },
    {
     "k": "RFC1918 ranges",
     "v": "10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16"
    },
    {
     "k": "PAT keyword",
     "v": "overload (many hosts, one IP, unique L4 source port per session)"
    },
    {
     "k": "ip nat inside source",
     "v": "translate the SOURCE of inside-originated traffic (the phrase that unlocks all syntax)"
    },
    {
     "k": "direction out",
     "v": "inside-to-outside: route FIRST, then translate SOURCE on egress"
    },
    {
     "k": "direction in",
     "v": "outside-to-inside: translate DESTINATION FIRST, then route"
    },
    {
     "k": "min interfaces",
     "v": "at least one ip nat inside AND one ip nat outside; NAT does nothing until both tags exist"
    },
    {
     "k": "ACL logic for NAT",
     "v": "permit = translate; deny = do NOT translate. Never use permit any (translates everything)"
    },
    {
     "k": "NAT ACL number range",
     "v": "standard numbered 1-99"
    },
    {
     "k": "dynamic pool exhausted",
     "v": "new inside hosts get NO translation; packet dropped (ICMP host-unreachable)"
    },
    {
     "k": "PAT idle timeout",
     "v": "24 hours default for PAT TCP; configurable via ip nat translation timeout"
    },
    {
     "k": "statics never age",
     "v": "static entries persist (configured, not learned); dynamic/PAT entries time out"
    },
    {
     "k": "PAT table row format",
     "v": "Pro InsideGlobal InsideLocal OutsideLocal OutsideGlobal, e.g. icmp 203.0.113.2:1024 192.168.1.10:1024 ..."
    }
   ],
   "commands": [
    {
     "cmd": "interface GigabitEthernet0/0",
     "note": "enter the LAN-facing interface"
    },
    {
     "cmd": "ip address 192.168.1.1 255.255.255.0",
     "note": "inside gateway IP"
    },
    {
     "cmd": "ip nat inside",
     "note": "mark this interface INSIDE (private side)"
    },
    {
     "cmd": "interface GigabitEthernet0/1",
     "note": "enter the WAN/ISP-facing interface"
    },
    {
     "cmd": "ip address 203.0.113.2 255.255.255.252",
     "note": "/30 point-to-point link to ISP"
    },
    {
     "cmd": "ip nat outside",
     "note": "mark this interface OUTSIDE (public side)"
    },
    {
     "cmd": "ip nat inside source static 192.168.1.10 203.0.113.10",
     "note": "STATIC: fixed 1-to-1 map; server always at .10"
    },
    {
     "cmd": "ip nat inside source static tcp 192.168.1.10 80 203.0.113.10 80",
     "note": "STATIC PAT: port-forward inside web server to outside"
    },
    {
     "cmd": "ip nat pool MYPOOL 203.0.113.20 203.0.113.30 netmask 255.255.255.224",
     "note": "DYNAMIC pool (start end netmask); separate public block routed by ISP"
    },
    {
     "cmd": "access-list 1 permit 192.168.1.0 0.0.0.255",
     "note": "ACL picks WHICH inside hosts translate (wildcard mask)"
    },
    {
     "cmd": "ip nat inside source list 1 pool MYPOOL",
     "note": "DYNAMIC, no overload: one pool IP per host; pool empty = dropped"
    },
    {
     "cmd": "ip nat inside source list 1 pool MYPOOL overload",
     "note": "PAT via pool: share pool IPs by port"
    },
    {
     "cmd": "ip nat inside source list 1 interface GigabitEthernet0/1 overload",
     "note": "PAT via interface: most common; all hosts hide behind WAN IP"
    }
   ],
   "verify": [
    {
     "cmd": "show ip nat translations",
     "look": "Pro/InsideGlobal/InsideLocal/OutsideLocal/OutsideGlobal columns; PAT shows :port after IPs; static row exists with no traffic"
    },
    {
     "cmd": "show ip nat translations verbose",
     "look": "age/timeout per entry; confirms dynamic entries are live"
    },
    {
     "cmd": "show ip nat statistics",
     "look": "Hits/Misses counters; active ACL and pool; count of inside/outside interfaces"
    },
    {
     "cmd": "clear ip nat translation *",
     "look": "clears ALL dynamic translations; statics remain (configured, not learned); run before re-testing"
    },
    {
     "cmd": "show running-config | include ip nat",
     "look": "ip nat inside/outside on correct interfaces and source statement present"
    }
   ],
   "traps": [
    {
     "trigger": "hosts cannot reach internet but config looks right",
     "answer": "ip nat inside / ip nat outside missing or swapped on the interfaces"
    },
    {
     "trigger": "many hosts must share ONE public IP",
     "answer": "PAT: ip nat inside source list 1 interface <wan> overload"
    },
    {
     "trigger": "dynamic NAT (no overload) and a new host cannot get out",
     "answer": "pool exhausted; packet dropped. Add overload to fix"
    },
    {
     "trigger": "overload with a pool but only one IP shows used",
     "answer": "correct: overload multiplexes hosts behind a pool IP by L4 port; generally fills one pool address before the next"
    },
    {
     "trigger": "a host you wanted NOT translated still gets NATed",
     "answer": "ACL too broad; a permit line matched it (deny = do NOT translate). Watch for permit any"
    },
    {
     "trigger": "inside global vs inside local in the stem",
     "answer": "local = private (inside view), global = public (internet view); inside global = post-NAT public address of YOUR host"
    },
    {
     "trigger": "why does the route lookup use the untranslated address",
     "answer": "inside-to-outside routes FIRST then translates source; route decision uses the original inside local destination"
    },
    {
     "trigger": "expose an internal server port to the outside",
     "answer": "STATIC PAT / port forward: ip nat inside source static tcp <local-ip> <port> <global-ip> <port>"
    },
    {
     "trigger": "NAT on an IPv6 stem",
     "answer": "NAT is IPv4-only (conserves public IPv4); IPv6 does not use NAT for address conservation"
    }
   ],
   "pairs": [
    {
     "a": "inside source",
     "b": "outside source",
     "diff": "inside source translates source of inside-to-outside traffic (common); outside source translates the outside host's address, rare, used for overlapping address space"
    },
    {
     "a": "Dynamic NAT",
     "b": "PAT (overload)",
     "diff": "dynamic = pool, no overload, 1-to-1 per host, can exhaust and drop; PAT = overload, many-to-one, multiplexed by L4 port, IP:port in table"
    },
    {
     "a": "static NAT entry",
     "b": "dynamic/PAT entry",
     "diff": "static appears in table immediately and never ages; dynamic/PAT are created on traffic and time out (PAT 24h default)"
    },
    {
     "a": "outside local",
     "b": "outside global",
     "diff": "in basic NAT they are equal (destination is not translated); differ only when ip nat outside source is configured"
    }
   ],
   "steps": []
  },
  {
   "kind": "config",
   "title": "DHCP server, exclusions, and relay",
   "domain": "IP Services (Cisco IOS DHCPv4)",
   "why": "Two facts win every DHCP question: exclude statics BEFORE clients pull, and ip helper-address goes on the CLIENT SVI (not the server side).",
   "symptom": "PCs in VLAN get APIPA (169.254.x.x). DHCP server is on another subnet and no relay forwards the broadcast.",
   "fix": "Exclude gateway/static IPs first, build the pool, then on the client gateway SVI add ip helper-address pointing at the off-subnet server.",
   "commands": [
    {
     "cmd": "configure terminal",
     "note": "enter global config"
    },
    {
     "cmd": "service dhcp",
     "note": "DHCP service is ON by default. no service dhcp silently kills all leasing (trap)"
    },
    {
     "cmd": "ip dhcp excluded-address 192.168.10.1 192.168.10.10",
     "note": "reserve .1 to .10 (gateway, switches, servers). GLOBAL command, not in pool. Best practice: do this before clients pull"
    },
    {
     "cmd": "ip dhcp excluded-address 192.168.10.254",
     "note": "exclude a single host (one arg = one IP)"
    },
    {
     "cmd": "ip dhcp pool VLAN10",
     "note": "create/name pool, drops into dhcp-config"
    },
    {
     "cmd": "network 192.168.10.0 255.255.255.0",
     "note": "subnet + mask handed out (or /24). This is the scope"
    },
    {
     "cmd": "default-router 192.168.10.1",
     "note": "option 3, client default gateway. Must be the SVI/router in that subnet"
    },
    {
     "cmd": "dns-server 8.8.8.8 8.8.4.4",
     "note": "option 6, up to 8 DNS, space-separated"
    },
    {
     "cmd": "domain-name corp.local",
     "note": "option 15, DNS suffix"
    },
    {
     "cmd": "lease 3",
     "note": "3 days. Syntax: days [hrs] [min]. Default = 1 day. lease infinite = never expires"
    },
    {
     "cmd": "exit",
     "note": "leave pool"
    },
    {
     "cmd": "interface vlan 10",
     "note": "DIRECT case (server on-subnet): this is the client gateway SVI. No helper needed"
    },
    {
     "cmd": "ip address 192.168.10.1 255.255.255.0",
     "note": "SVI owns an IP in the served subnet"
    },
    {
     "cmd": "interface vlan 20",
     "note": "RELAY case (server OFF-subnet): clients in VLAN 20, server lives elsewhere"
    },
    {
     "cmd": "ip address 192.168.20.1 255.255.255.0",
     "note": "relay SVI needs its own IP in the VLAN 20 subnet. Router stamps this into giaddr so the server picks the right scope"
    },
    {
     "cmd": "ip helper-address 10.1.1.5",
     "note": "put on the CLIENT-side SVI (vlan 20). Forwards client broadcast as unicast to off-subnet server 10.1.1.5"
    },
    {
     "cmd": "interface g0/1",
     "note": "WAN/ISP-facing router-as-client case"
    },
    {
     "cmd": "ip address dhcp",
     "note": "interface gets its IP from upstream DHCP (router is the client). Not a pool"
    },
    {
     "cmd": "end",
     "note": "back to privileged exec"
    },
    {
     "cmd": "write memory",
     "note": "save running to startup"
    }
   ],
   "verify": [
    {
     "cmd": "show ip dhcp binding",
     "look": "leased IP <-> client MAC + lease expiry. On a RELAY setup these appear on the SERVER, not the relay router. Empty = nobody leased yet"
    },
    {
     "cmd": "show ip dhcp pool",
     "look": "Total addresses, Leased addresses, current index. High utilization = pool exhausted"
    },
    {
     "cmd": "show ip dhcp conflict",
     "look": "addresses DHCP saw already in use. Should be empty. Clear with clear ip dhcp conflict *"
    },
    {
     "cmd": "show running-config interface vlan 20",
     "look": "ip helper-address 10.1.1.5 line present on the CLIENT SVI (platform-safe way to confirm relay)"
    },
    {
     "cmd": "show running-config | section dhcp",
     "look": "excluded-address lines + pool network/default-router/dns correct"
    }
   ],
   "numbers": [
    {
     "k": "DHCP server port (UDP)",
     "v": "67"
    },
    {
     "k": "DHCP client port (UDP)",
     "v": "68"
    },
    {
     "k": "DORA",
     "v": "Discover, Offer, Request, Ack"
    },
    {
     "k": "Discover/Request direction",
     "v": "client to server: src 0.0.0.0:68, dst 255.255.255.255:67 (broadcast). Offer/Ack: server to client"
    },
    {
     "k": "Default lease",
     "v": "1 day"
    },
    {
     "k": "T1 renew timer",
     "v": "50% of lease (unicast to server)"
    },
    {
     "k": "T2 rebind timer",
     "v": "87.5% of lease (broadcast to any server)"
    },
    {
     "k": "Default-router option",
     "v": "option 3"
    },
    {
     "k": "DNS option",
     "v": "option 6"
    },
    {
     "k": "Domain-name option",
     "v": "option 15"
    },
    {
     "k": "APIPA range (no DHCP)",
     "v": "169.254.0.0/16"
    },
    {
     "k": "Max DNS servers in pool",
     "v": "8"
    },
    {
     "k": "giaddr",
     "v": "relay stamps client SVI IP here so server picks the right scope"
    },
    {
     "k": "Helper forwards 8 UDP services",
     "v": "DHCP 67/68, DNS 53, TFTP 69, TACACS 49, Time 37, NetBIOS NS 137, NetBIOS DS 138 (tune with ip forward-protocol udp)"
    }
   ],
   "traps": [
    {
     "trigger": "Pool hands out the gateway/server IP, duplicate-address",
     "answer": "Missing ip dhcp excluded-address. Exclude .1 and statics before clients pull"
    },
    {
     "trigger": "DHCP server on a different subnet, clients get 169.254.x.x",
     "answer": "Add ip helper-address SERVER_IP on the CLIENT-side SVI (relay forwards broadcast as unicast)"
    },
    {
     "trigger": "ip helper-address on the wrong/server-side interface",
     "answer": "It goes on the interface receiving the client broadcast (client gateway SVI)"
    },
    {
     "trigger": "excluded-address typed inside ip dhcp pool",
     "answer": "Wrong. ip dhcp excluded-address is a GLOBAL command, not under the pool"
    },
    {
     "trigger": "Router itself needs an address from upstream DHCP",
     "answer": "Interface command ip address dhcp (not a pool)"
    },
    {
     "trigger": "Nothing leases, config looks correct",
     "answer": "Check service dhcp. no service dhcp disables the whole DHCP server"
    },
    {
     "trigger": "What else does ip helper-address forward besides DHCP",
     "answer": "8 UDP services: DNS 53, TFTP 69, TACACS 49, Time 37, NetBIOS 137/138, BOOTP/DHCP 67/68. Can have multiple helper lines"
    },
    {
     "trigger": "Rogue DHCP server hands out bad addresses",
     "answer": "Enable ip dhcp snooping; trust only the uplink/server port, leave client ports untrusted (rate-limited)"
    },
    {
     "trigger": "Stateless DHCPv6 vs stateful / how host self-assigns",
     "answer": "SLAAC builds the address from RA prefix + EUI-64. Stateful DHCPv6 = M flag set (server gives address); stateless = O flag (server gives DNS only)"
    }
   ]
  },
  {
   "kind": "config",
   "title": "EtherChannel and inter-VLAN routing",
   "why": "Sim points: bundle reaches SU/P state, plus one connected route per VLAN. Covers TWO inter-VLAN methods (ROAS on a router vs SVI on an L3 switch). They are ALTERNATIVES, not used together.",
   "domain": "2.0 Network Access / 3.0 IP Connectivity",
   "commands": [
    {
     "cmd": "interface range gi0/1 - 2",
     "note": "Select both members (gi = GigabitEthernet). Keep spaces around the dash. Comma for non-contiguous: gi0/1 , gi0/3."
    },
    {
     "cmd": "switchport mode trunk",
     "note": "Members carry VLANs. Use static trunk, not dynamic (DTP), so the bundle is consistent."
    },
    {
     "cmd": "channel-group 1 mode active",
     "note": "LACP active. Creates Po1. Static trunk on all members avoids DTP mismatch."
    },
    {
     "cmd": "exit",
     "note": "IOS auto-creates interface Port-channel1 from channel-group."
    },
    {
     "cmd": "interface port-channel 1",
     "note": "Logical bundle. Settings here apply to the whole channel."
    },
    {
     "cmd": "switchport trunk encapsulation dot1q",
     "note": "Only on switches that also support ISL. dot1q-only platforms omit/reject this."
    },
    {
     "cmd": "switchport mode trunk",
     "note": "Set bundle to trunk. All MEMBER ports must already match (mode, speed, duplex, native, allowed list) or the port suspends."
    },
    {
     "cmd": "switchport trunk allowed vlan 10,20",
     "note": "Bundle must carry 10 and 20. WARNING: bare 'allowed vlan 30' REPLACES the list. Use 'allowed vlan add 30' to append."
    },
    {
     "cmd": "interface gi0/0",
     "note": "ROAS: physical router port stays L3. NO ip address on it."
    },
    {
     "cmd": "no shutdown",
     "note": "Router ports are admin-down by default. Physical must be up or subifs pass nothing. No shut NOT needed on subifs."
    },
    {
     "cmd": "interface gi0/0.10",
     "note": "ROAS subif for VLAN 10. Number is arbitrary; match VLAN id for sanity."
    },
    {
     "cmd": "encapsulation dot1q 10",
     "note": "Tag for VLAN 10. MUST come BEFORE ip address."
    },
    {
     "cmd": "ip address 10.0.10.1 255.255.255.0",
     "note": "VLAN 10 gateway. /24 = 255.255.255.0."
    },
    {
     "cmd": "interface gi0/0.20",
     "note": "ROAS subif for VLAN 20."
    },
    {
     "cmd": "encapsulation dot1q 20",
     "note": "Tag VLAN 20 before addressing."
    },
    {
     "cmd": "ip address 10.0.20.1 255.255.255.0",
     "note": "VLAN 20 gateway."
    },
    {
     "cmd": "encapsulation dot1q 1 native",
     "note": "ROAS native-VLAN subif. Traffic for VLAN 1 arrives UNTAGGED. Native must match both trunk ends."
    },
    {
     "cmd": "ip routing",
     "note": "L3 SWITCH METHOD (alternative to ROAS). Turns on routing globally."
    },
    {
     "cmd": "interface vlan 10",
     "note": "L3SW: one SVI per VLAN. Needs VLAN in db (show vlan brief) + one up access port in VLAN 10."
    },
    {
     "cmd": "ip address 10.0.10.1 255.255.255.0",
     "note": "L3SW: SVI = gateway for VLAN 10."
    },
    {
     "cmd": "interface port-channel 1 / no switchport / ip address 10.1.1.1 255.255.255.252",
     "note": "L3 (ROUTED) EtherChannel option: 'no switchport' on the Po makes a routed bundle with its own IP. Exam tests L2 AND L3 EtherChannel."
    }
   ],
   "verify": [
    {
     "cmd": "show etherchannel summary",
     "look": "WANT: Po1 = SU and members = (P). BAD: D=down, s=suspended, I=standalone (LACP not negotiating). Protocol col shows LACP or PAgP."
    },
    {
     "cmd": "show interfaces trunk",
     "look": "Po1 trunking, correct native VLAN, VLANs 10 and 20 allowed/forwarding."
    },
    {
     "cmd": "show vlan brief",
     "look": "VLANs 10 and 20 exist in the DB. SVI method fails silently if the VLAN is missing."
    },
    {
     "cmd": "show ip interface brief",
     "look": "gi0/0.10 and gi0/0.20 up/up with correct IPs. If physical gi0/0 is down, subifs are down too."
    },
    {
     "cmd": "show ip route",
     "look": "Connected (C, AD 0) routes for 10.0.10.0/24 and 10.0.20.0/24. Static = S (AD 1). No C routes = no inter-VLAN routing."
    },
    {
     "cmd": "show etherchannel port-channel",
     "look": "Per-port LACP/PAgP state and partner; confirms which side is active/passive/desirable."
    }
   ],
   "numbers": [
    {
     "k": "LACP",
     "v": "IEEE 802.3ad open standard. Modes: active / passive."
    },
    {
     "k": "PAgP",
     "v": "Cisco proprietary. Modes: desirable / auto."
    },
    {
     "k": "LACP combos",
     "v": "active+active YES, active+passive YES, passive+passive NO."
    },
    {
     "k": "PAgP combos",
     "v": "desirable+desirable YES, desirable+auto YES, auto+auto NO."
    },
    {
     "k": "Static mode",
     "v": "channel-group 1 mode on (both ends 'on'). on+on is the ONLY way 'on' bundles. on does NO negotiation, so mismatches go undetected and can loop. on + active/desirable = NO bundle."
    },
    {
     "k": "Max links",
     "v": "8 active forwarding max (LACP and PAgP). LACP can configure up to 16 (8 active + 8 hot-standby). PAgP = 8 max, no standby."
    },
    {
     "k": "dot1q tag",
     "v": "4 bytes, 12-bit VLAN field, native VLAN untagged."
    },
    {
     "k": "Default native VLAN",
     "v": "VLAN 1."
    },
    {
     "k": "Po number",
     "v": "LOCAL significance only. Po1 on SwA can pair with Po5 on SwB. Numbers do NOT have to match."
    },
    {
     "k": "Load balancing",
     "v": "Per-FLOW not per-packet. Default basis src-dst-mac (some platforms src-dst-ip). One flow rides one link."
    },
    {
     "k": "EtherChannel + STP",
     "v": "Bundle = ONE logical link to STP. No per-member blocking; all members forward as one path."
    },
    {
     "k": "Subif IP",
     "v": "= default gateway for that VLAN's hosts. Host gateway must equal the subif/SVI IP."
    },
    {
     "k": "L3 SVI requires",
     "v": "'ip routing' on + VLAN exists in db + one up access port in that VLAN."
    }
   ],
   "traps": [
    {
     "trigger": "passive+passive (LACP) or auto+auto (PAgP)",
     "answer": "Channel does NOT form; both sides wait, nobody initiates."
    },
    {
     "trigger": "member ports suspend (s) or go standalone (I)",
     "answer": "Parameter mismatch: speed, duplex, trunk/access mode, native VLAN, or allowed-VLAN list differ. Make them identical."
    },
    {
     "trigger": "EtherChannel ports go err-disabled",
     "answer": "DIFFERENT from suspend. Caused by STP EtherChannel guard / channel-misconfig detection, not plain negotiation failure."
    },
    {
     "trigger": "encapsulation dot1q AFTER ip address on a subif",
     "answer": "Wrong order. Put 'encapsulation dot1q <id>' FIRST, then 'ip address'."
    },
    {
     "trigger": "ROAS built but no inter-VLAN traffic",
     "answer": "Physical router port still shut (default). Run 'no shutdown' on gi0/0. Subifs need no shut."
    },
    {
     "trigger": "ROAS built but one VLAN cannot route",
     "answer": "Missing subinterface. One subif per VLAN; no subif = that VLAN has no gateway."
    },
    {
     "trigger": "mixing LACP and PAgP (active + desirable)",
     "answer": "Never bundles. Both ends must run the same protocol."
    },
    {
     "trigger": "%CDP-4-NATIVE_VLAN_MISMATCH on trunk/Po",
     "answer": "Native VLAN differs across the two trunk ends. VLANs can leak (hopping risk). Both ends must agree on native VLAN."
    },
    {
     "trigger": "VLAN 10/20 not in 'switchport trunk allowed vlan'",
     "answer": "Connected route still shows, but inter-VLAN traffic fails. Add the VLAN to the allowed list (use 'add')."
    },
    {
     "trigger": "end-to-end ping fails but router config is correct",
     "answer": "Host has wrong default gateway. Gateway must equal the SVI / subif IP for that VLAN."
    }
   ]
  },
  {
   "kind": "trouble",
   "title": "OSPF neighbors stuck (not forming full adjacency)",
   "domain": "Routing (OSPFv2)",
   "why": "#1 OSPF troubleshooting topic on the 200-301. Know the 5 Hello-match values cold.",
   "symptom": "Neighbor stuck in INIT, 2WAY, EXSTART, or EXCHANGE; never reaches FULL (or no neighbor shows at all).",
   "fix": "Same subnet/mask on both ends. Wrong mask = no Hellos = no neighbor.",
   "steps": [
    {
     "do": "Run show ip ospf neighbor. Read the STATE.",
     "why": "State map: DOWN/none = no Hellos. INIT = one-way Hellos. 2WAY = normal between two DROTHERs. EXSTART/EXCHANGE = MTU mismatch. FULL = good."
    },
    {
     "do": "Verify both interfaces are in the SAME subnet/mask. show ip int brief + show run interface.",
     "why": "OSPF only adjacents between interfaces in the same IP subnet. Wrong mask = no neighbor (the #1 root cause)."
    },
    {
     "do": "Check Hello/Dead timers match. show ip ospf interface.",
     "why": "Hello 10s / Dead 40s (broadcast + point-to-point). 30s / 120s (non-broadcast NBMA + point-to-multipoint). Dead = 4x Hello. Mismatch = stuck INIT/DOWN."
    },
    {
     "do": "Confirm Area ID matches both sides. show ip ospf interface (Area field).",
     "why": "Both ends must be in the same area number. Mismatch = stuck DOWN/none."
    },
    {
     "do": "Check area TYPE matches (both stub, both NSSA, or both normal). show ip ospf.",
     "why": "Stub/NSSA flag (E-bit) mismatch blocks adjacency, stuck EXSTART/2WAY. One side stub, other normal = never FULL."
    },
    {
     "do": "Check passive-interface. show ip protocols (Passive list); show run | section ospf.",
     "why": "Passive interface still advertises its subnet but stops sending/receiving Hellos. No neighbor forms. Set under router ospf, not the interface."
    },
    {
     "do": "Verify authentication matches (type + key). show ip ospf interface.",
     "why": "Mismatched auth type (none/simple/MD5) or key blocks adjacency. Stuck DOWN/INIT."
    },
    {
     "do": "Check MTU matches. show interface (MTU, default 1500).",
     "why": "DBD packets fail if MTU differs. Symptom: cycles EXSTART/EXCHANGE, may appear briefly then drop (flap). Quick fix: ip ospf mtu-ignore on the interface."
    },
    {
     "do": "Verify the network statement / interface is actually in OSPF. show ip ospf interface; show ip protocols.",
     "why": "Wrong wildcard mask in network <addr> <wildcard> area <id> = interface never runs OSPF (nothing in show ip ospf interface). Wildcard is INVERSE (0.0.0.255 for /24), not subnet mask."
    },
    {
     "do": "Check for duplicate Router ID. show ip ospf; look for log %OSPF-4-DUP_RTRID.",
     "why": "Two routers with the same RID fail to form/maintain adjacency."
    },
    {
     "do": "Confirm an inbound ACL is not blocking OSPF. show ip access-lists; show run interface.",
     "why": "An ACL denying IP protocol 89 or multicasts 224.0.0.5 / 224.0.0.6 silently kills Hellos."
    },
    {
     "do": "Confirm OSPF network types match (broadcast vs point-to-point). show ip ospf interface (Network Type).",
     "why": "Mismatch sets wrong timers/DR behavior. NOTE: 2WAY-stuck only happens on multiaccess/broadcast (DR/BDR election). Point-to-point has NO DR/BDR, so 2WAY-stuck cannot happen there."
    }
   ],
   "verify": [
    {
     "cmd": "show ip ospf neighbor",
     "look": "State = FULL (or FULL/DR, FULL/BDR). 2WAY/DROTHER is normal. Also shows Dead Time counting down + neighbor RID/address. Appears-then-drops = MTU/timer; never-appears = subnet/area/passive."
    },
    {
     "cmd": "show ip ospf interface",
     "look": "FULL DETAIL: Area, Hello/Dead (10/40), Network Type, Cost, auth. Compare both ends."
    },
    {
     "cmd": "show ip ospf interface brief",
     "look": "ONE LINE PER INT: PID, Area, IP/mask, Cost, State, Nbrs F/C. No timers, no auth."
    },
    {
     "cmd": "show ip protocols",
     "look": "Router ID, networks advertised, passive-interface list, areas."
    },
    {
     "cmd": "show ip route ospf",
     "look": "O = intra-area, O IA = inter-area, O E1 + O E2 = external. AD 110. Missing routes = not FULL or wrong network statement."
    }
   ],
   "traps": [
    {
     "trigger": "Stuck in EXSTART or EXCHANGE",
     "answer": "MTU mismatch. Fix MTU on both ends, or ip ospf mtu-ignore (per interface)."
    },
    {
     "trigger": "Neighbor stuck in INIT (one-way Hellos)",
     "answer": "One side not receiving Hellos: passive-interface, ACL blocking protocol 89, or timer/auth mismatch."
    },
    {
     "trigger": "Two routers stuck in 2WAY/DROTHER on a switch (multiaccess)",
     "answer": "Normal. DROTHERs only go FULL with DR and BDR, not with each other."
    },
    {
     "trigger": "Subnet advertised but no neighbor forms",
     "answer": "passive-interface on that link (Hellos suppressed). Set under router ospf."
    },
    {
     "trigger": "No neighbor at all, timers fine, same area",
     "answer": "Mismatched subnet mask: interfaces not in the same subnet (#1 cause)."
    },
    {
     "trigger": "Adjacency flaps, log shows %OSPF-4-DUP_RTRID",
     "answer": "Duplicate Router ID on two routers."
    },
    {
     "trigger": "One side stub area, other side normal area",
     "answer": "Area-type (E-bit) mismatch. Both ends must agree: stub/stub, NSSA/NSSA, or normal/normal."
    },
    {
     "trigger": "Different OSPF process-id numbers but same area",
     "answer": "Still forms FULL. Process-id is locally significant, not matched between routers."
    },
    {
     "trigger": "Gig/10Gig links all show cost 1",
     "answer": "Reference bandwidth default 100M. Raise it: auto-cost reference-bandwidth."
    },
    {
     "trigger": "Added a loopback but RID did not change",
     "answer": "RID locks at process start. Run clear ip ospf process or reload."
    }
   ],
   "numbers": [
    {
     "k": "OSPF administrative distance",
     "v": "110"
    },
    {
     "k": "The 5 Hello-match values",
     "v": "Subnet/mask, Hello/Dead timers, Area ID, Area type (stub flag), Authentication"
    },
    {
     "k": "Fails LATER, not at Hello",
     "v": "MTU (EXSTART/EXCHANGE) + Network type (DBD/DR behavior)"
    },
    {
     "k": "Hello/Dead (broadcast + point-to-point)",
     "v": "10s / 40s"
    },
    {
     "k": "Hello/Dead (non-broadcast NBMA + point-to-multipoint)",
     "v": "30s / 120s"
    },
    {
     "k": "Dead interval rule",
     "v": "4 x Hello"
    },
    {
     "k": "OSPF IP protocol number (NOT a TCP/UDP port; rides on IP)",
     "v": "89"
    },
    {
     "k": "Default interface MTU",
     "v": "1500 bytes"
    },
    {
     "k": "AllSPFRouters multicast",
     "v": "224.0.0.5"
    },
    {
     "k": "DR/BDR (AllDRouters) multicast",
     "v": "224.0.0.6"
    },
    {
     "k": "OSPF cost formula",
     "v": "100Mbps (10^8) / link BW(bps), round down, min 1. 10M=10, 100M=1, 1G=1, 10G=1. Raise ref-bw: auto-cost reference-bandwidth"
    },
    {
     "k": "DR/BDR election",
     "v": "Highest priority wins (0 = never DR/BDR), tiebreak highest RID. NON-preemptive. Only on broadcast + NBMA, NOT on point-to-point"
    },
    {
     "k": "Router ID selection order",
     "v": "router-id command > highest loopback IP > highest active physical IP. Locks at process start; clear ip ospf process or reload to update"
    },
    {
     "k": "network statement wildcard",
     "v": "INVERSE mask: 0.0.0.255 for a /24 (not 255.255.255.0)"
    },
    {
     "k": "O E1 vs O E2",
     "v": "E2 (default) cost fixed across domain; E1 adds internal cost along the path"
    },
    {
     "k": "Quick fix for EXSTART/EXCHANGE MTU loop",
     "v": "ip ospf mtu-ignore (per interface)"
    },
    {
     "k": "Backbone rule",
     "v": "All areas must connect to area 0; ABR links an area to the backbone"
    },
    {
     "k": "OSPFv3 (IPv6)",
     "v": "Per-interface: ipv6 ospf <pid> area <area>. Uses link-local for adjacency. RID is 32-bit dotted, MUST be set manually if no IPv4"
    }
   ]
  },
  {
   "kind": "trouble",
   "title": "VLAN/trunk connectivity broken",
   "why": "VLAN/trunk troubleshooting is heavy on sim and MCQ; one wrong mode or missing VLAN drops the whole link.",
   "domain": "2.0 Network Access (VLANs, trunking)",
   "symptom": "Hosts in same VLAN cannot ping across two switches, OR a trunk passes some VLANs but not others.",
   "steps": [
    {
     "do": "show vlan brief on BOTH switches",
     "why": "VLAN must exist on each switch. Missing VLAN = port goes inactive. Fix: vlan 10 / name X."
    },
    {
     "do": "show interfaces switchport (check Access Mode VLAN)",
     "why": "Access port must be in the RIGHT VLAN. Wrong number = wrong subnet. Default = VLAN 1."
    },
    {
     "do": "show interfaces switchport (check Operational Mode both ends)",
     "why": "Operational Mode is what counts. Both auto = static access (no trunk)."
    },
    {
     "do": "show interfaces trunk (is trunk actually UP?)",
     "why": "auto + auto = NO trunk. Force both: switchport mode trunk."
    },
    {
     "do": "show interfaces trunk (Vlans allowed column)",
     "why": "VLAN missing from list cannot cross. Fix: switchport trunk allowed vlan add 10."
    },
    {
     "do": "show interfaces trunk (Native vlan column both ends)",
     "why": "Native mismatch = CDP error every 60s + native VLANs bridge (loop/security risk)."
    },
    {
     "do": "show ip interface brief (SVI / subinterface)",
     "why": "Inter-VLAN needs SVI or .1Q subinterface up/up. Wrong subnet still fails."
    },
    {
     "do": "show interfaces status (up/up, not err-disabled)",
     "why": "err-disabled drops port. Recover: fix cause, then shut / no shut."
    }
   ],
   "verify": [
    {
     "cmd": "show vlan brief",
     "look": "VLAN exists; access port listed under correct VLAN ID. Ports NOT listed are trunk/routed or in a missing VLAN."
    },
    {
     "cmd": "show interfaces trunk",
     "look": "Mode = on/trunking; Native vlan matches both ends. VLAN must be in BOTH the Allowed list AND the Forwarding (STP) list. Allowed but not forwarding = STP blocking, NOT a config error."
    },
    {
     "cmd": "show interfaces switchport",
     "look": "Operational Mode (access vs trunk) is what counts. If Admin Mode = dynamic auto on BOTH ends, Operational Mode = static access (no trunk). Check Access Mode VLAN + Native Mode VLAN."
    },
    {
     "cmd": "show interfaces status",
     "look": "connected (not notconnect, not err-disabled). Vlan column = correct VLAN or trunk."
    },
    {
     "cmd": "show ip interface brief",
     "look": "SVI / subinterface up/up for the VLAN doing inter-VLAN routing."
    }
   ],
   "fix": "Most common single root cause: VLAN missing from the trunk allowed list, OR access port in the wrong VLAN. Router-on-a-stick: IP must be on the subinterface (not physical) and encapsulation dot1Q vlan must match.",
   "numbers": [
    {
     "k": "Default VLAN / native VLAN",
     "v": "VLAN 1 (always allowed on trunk, cannot delete)"
    },
    {
     "k": "Normal VLAN range",
     "v": "1-1005"
    },
    {
     "k": "Usable user VLANs",
     "v": "2-1001"
    },
    {
     "k": "Reserved legacy VLANs",
     "v": "1002-1005 (FDDI/Token Ring, auto-created, cannot delete)"
    },
    {
     "k": "Extended VLAN range",
     "v": "1006-4094"
    },
    {
     "k": "Reserved/unusable",
     "v": "0 and 4095"
    },
    {
     "k": "VLAN ID field",
     "v": "12 bits = 4096 values, 1-4094 usable"
    },
    {
     "k": "Default trunk allowed",
     "v": "All VLANs (1-4094), but only created VLANs forward"
    },
    {
     "k": "802.1Q tag size",
     "v": "4 bytes, inserted after Source MAC"
    },
    {
     "k": "802.1Q native VLAN",
     "v": "sent UNTAGGED"
    },
    {
     "k": "Trunk encapsulation on CCNA",
     "v": "802.1Q only (ISL deprecated)"
    },
    {
     "k": "CDP timer / holdtime",
     "v": "60s / 180s (native-mismatch msg on the 60s cycle)"
    },
    {
     "k": "DTP: trunk forms",
     "v": "desirable+desirable, desirable+auto, on+on, on+auto"
    },
    {
     "k": "DTP: NO trunk",
     "v": "auto+auto (stays access), access+anything"
    },
    {
     "k": "Force / hardcode",
     "v": "switchport mode trunk + switchport nonegotiate (kills DTP)"
    },
    {
     "k": "Allowed-list trap",
     "v": "vlan 10 (no 'add') REPLACES whole list. Use add/remove/none/except."
    },
    {
     "k": "Voice VLAN",
     "v": "switchport voice vlan X = data (untagged) + voice (tagged) on one access port"
    },
    {
     "k": "Router-on-a-stick",
     "v": "int g0/0.10 / encapsulation dot1Q 10 / ip address; physical int no shutdown"
    },
    {
     "k": "RoaS native subinterface",
     "v": "encapsulation dot1Q 99 native (for untagged VLAN)"
    },
    {
     "k": "Multilayer SVI",
     "v": "needs ip routing globally; SVI down/down until one access port in that VLAN is up (autostate)"
    }
   ],
   "traps": [
    {
     "trigger": "%CDP-4-NATIVE_VLAN_MISMATCH every 60s",
     "answer": "Native VLAN numbers differ on the two trunk ends; set switchport trunk native vlan to match. Causes STP PVID-inconsistent (blocked), does NOT err-disable the port."
    },
    {
     "trigger": "Trunk up but VLAN 30 does not pass while VLAN 10 does",
     "answer": "VLAN 30 missing from allowed list; switchport trunk allowed vlan add 30."
    },
    {
     "trigger": "Both sides dynamic auto, no trunk forms",
     "answer": "auto + auto stays access; one side must be trunk or dynamic desirable."
    },
    {
     "trigger": "Port in a VLAN not in show vlan brief",
     "answer": "VLAN not created; port goes inactive. Create it: vlan <id>."
    },
    {
     "trigger": "One end access, other end trunk, only some traffic works",
     "answer": "Mode mismatch; access side passes only its untagged/native VLAN, tagged VLANs dropped."
    },
    {
     "trigger": "VLAN shows in Allowed list but traffic still blocked",
     "answer": "STP blocking (not in Forwarding column), not a config error. Allowed != forwarding."
    },
    {
     "trigger": "VLAN disappeared after adding a new switch",
     "answer": "VTP: new switch joined with higher revision number and overwrote the VLAN database."
    },
    {
     "trigger": "One port carries TWO VLANs but is NOT a trunk",
     "answer": "Access port with switchport voice vlan: data untagged + voice tagged."
    },
    {
     "trigger": "Router-on-a-stick: hosts in a VLAN have no gateway",
     "answer": "IP on physical interface instead of subinterface, OR missing/wrong encapsulation dot1Q <vlan>."
    },
    {
     "trigger": "SVI line protocol down with no active port",
     "answer": "Multilayer SVI stays down until at least one access port in that VLAN is up (autostate); also need ip routing."
    },
    {
     "trigger": "switchport trunk allowed vlan 10 wiped the other VLANs",
     "answer": "Without 'add' it REPLACES the entire list. Use add/remove/none/except."
    }
   ]
  },
  {
   "kind": "trouble",
   "title": "ACL blocking the wrong traffic",
   "why": "ACLs are heavy on the exam: order, direction, placement, wildcard math, and editing all trap test-takers.",
   "domain": "Security Fundamentals / IP Connectivity (ACLs)",
   "symptom": "Wrong hosts blocked or allowed: traffic dropped that should pass, or vice versa.",
   "fix": "First match wins, top to bottom, then STOP. A broad permit/deny above a specific line shadows it.",
   "steps": [
    {
     "do": "show access-lists. Read top to bottom.",
     "why": "First match wins, then processing stops."
    },
    {
     "do": "Check for the implicit deny ip any any at the end.",
     "why": "Invisible last line. No permit means everything is dropped. Every ACL needs one permit."
    },
    {
     "do": "Confirm the ACL is actually applied: ip access-group in|out on the interface.",
     "why": "An ACL with no access-group does nothing. Classic 'configured but no effect' trap."
    },
    {
     "do": "Verify direction with show ip interface.",
     "why": "Wrong direction means the ACL never sees the traffic, or filters replies instead of requests."
    },
    {
     "do": "Placement: standard near DESTINATION, extended near SOURCE.",
     "why": "Standard = source IP only, so near source it over-blocks. Extended near source drops bad traffic early."
    },
    {
     "do": "Recompute every wildcard mask.",
     "why": "Wrong wildcard widens or narrows the match. 0 = must match, 1 = ignore."
    },
    {
     "do": "Confirm SRC then DST order in extended lines (permit tcp SRC DST eq 80).",
     "why": "Swapping src/dst or putting the port on the wrong side matches the wrong flow."
    },
    {
     "do": "Remember new lines APPEND to the bottom of a numbered ACL.",
     "why": "You add a permit and it lands after the deny, nothing changes. The top ACL-editing trap."
    },
    {
     "do": "To insert mid-list use a named/numbered ACL in ip access-list config mode with sequence numbers (e.g. 15 permit ...).",
     "why": "Modern IOS lets you insert/delete by sequence number; otherwise rebuild the whole list."
    },
    {
     "do": "Re-test with show access-lists and watch per-line match counters climb.",
     "why": "Counters show which line is actually catching the traffic."
    }
   ],
   "verify": [
    {
     "cmd": "show access-lists",
     "look": "Line order + per-line hit counters + a permit before the implicit deny."
    },
    {
     "cmd": "show ip access-lists <name|number>",
     "look": "IP ACL with sequence numbers and hit counts. Pinpoints the matching line."
    },
    {
     "cmd": "show ip interface <int>",
     "look": "Outgoing/Inbound access list field: which ACL, which direction."
    },
    {
     "cmd": "show running-config | section access-list",
     "look": "Full ACL statements in config order. Host entries collapse to the host keyword."
    }
   ],
   "traps": [
    {
     "trigger": "Standard ACL, where to place it",
     "answer": "Close to the DESTINATION (matches source IP only, so near source it over-blocks)."
    },
    {
     "trigger": "Extended ACL, where to place it",
     "answer": "Close to the SOURCE (drop unwanted traffic before it crosses the network)."
    },
    {
     "trigger": "ACL applied but ALL traffic blocked",
     "answer": "No permit statement, so implicit deny ip any any drops everything."
    },
    {
     "trigger": "ACL configured but has NO effect",
     "answer": "Never applied to an interface with ip access-group."
    },
    {
     "trigger": "Return traffic dropped / works one way only",
     "answer": "Wrong direction (in vs out), OR use established on the extended TCP entry to allow replies."
    },
    {
     "trigger": "Match exactly host 192.168.1.10",
     "answer": "host 192.168.1.10 (= wildcard 0.0.0.0)."
    },
    {
     "trigger": "Added permit but specific host still blocked",
     "answer": "New line appended to bottom, below the deny. Use sequence numbers to insert above."
    },
    {
     "trigger": "Restrict Telnet/SSH to the router (VTY)",
     "answer": "access-class <acl> in on line vty 0 4 (NOT ip access-group)."
    },
    {
     "trigger": "Match 4 consecutive /24s (x.x.0-3.x)",
     "answer": "wildcard 0.0.3.255 (block size minus 1)."
    }
   ],
   "numbers": [
    {
     "k": "Named ACL (modern default)",
     "v": "ip access-list standard|extended NAME, then sequence-numbered lines (insert/delete mid-list)"
    },
    {
     "k": "Apply to interface",
     "v": "ip access-group <name|num> in | out"
    },
    {
     "k": "Apply to VTY",
     "v": "access-class <acl> in (on line vty 0 4)"
    },
    {
     "k": "Numbered editing trap",
     "v": "new lines APPEND to bottom; insert needs sequence numbers or rebuild"
    },
    {
     "k": "Standard ACL number range",
     "v": "1-99 and 1300-1999"
    },
    {
     "k": "Extended ACL number range",
     "v": "100-199 and 2000-2699"
    },
    {
     "k": "Standard ACL matches",
     "v": "source IP only"
    },
    {
     "k": "Extended ACL matches",
     "v": "source, destination, protocol, port (operators eq gt lt neq range)"
    },
    {
     "k": "Implicit last line",
     "v": "deny ip any any (invisible, drops unmatched)"
    },
    {
     "k": "established keyword",
     "v": "permit tcp any any established allows return traffic (ACK/RST set)"
    },
    {
     "k": "Wildcard rule",
     "v": "0 = must match, 1 = ignore"
    },
    {
     "k": "Wildcard shortcut",
     "v": "wildcard = block size minus 1"
    },
    {
     "k": "Match any",
     "v": "0.0.0.0 255.255.255.255 (keyword any)"
    },
    {
     "k": "Match one host",
     "v": "0.0.0.0 (keyword host)"
    },
    {
     "k": "Wildcard for /24",
     "v": "0.0.0.255 (inverse of 255.255.255.0)"
    },
    {
     "k": "Wildcard for /26",
     "v": "0.0.0.63 (mask 255.255.255.192)"
    },
    {
     "k": "Wildcard for /16",
     "v": "0.0.255.255"
    },
    {
     "k": "4-subnet block",
     "v": "0.0.3.255"
    },
    {
     "k": "Std ACL syntax",
     "v": "access-list 10 permit host 192.168.1.10 / access-list 10 deny any"
    },
    {
     "k": "Ext ACL syntax",
     "v": "access-list 100 permit tcp 192.168.1.0 0.0.0.255 any eq 80"
    },
    {
     "k": "One ACL rule",
     "v": "one ACL per interface, per protocol, per direction (one in, one out)"
    },
    {
     "k": "ACL scope",
     "v": "filters TRANSIT traffic; does NOT filter traffic the router originates itself"
    }
   ]
  },
  {
   "kind": "trouble",
   "title": "NAT not translating",
   "why": "NAT troubleshooting hits Sim and MCQ; one missing keyword (overload) or one untagged interface breaks the whole flow.",
   "domain": "IP Services (NAT/PAT)",
   "symptom": "Inside host pings out, gets no reply. show ip nat translations is empty, or shows only the static entries (statics appear regardless of traffic, so empty-but-statics = the dynamic/PAT path is failing).",
   "fix": "Two top causes, check in order:\n1. PAT missing the overload keyword.\n2. No ip nat inside / ip nat outside tagged on the interfaces.",
   "steps": [
    {
     "do": "Check ip nat inside on LAN, ip nat outside on WAN, and that traffic crosses that pair.",
     "why": "NAT only runs across an inside-to-outside pair. No tags = zero translation."
    },
    {
     "do": "Read the ACL the NAT statement references; verify it permits the inside-local source subnet.",
     "why": "ip nat inside source list 1 means ACL 1 picks who gets NATed. Wrong subnet or implicit deny = silent block."
    },
    {
     "do": "For PAT, confirm the overload keyword is present.",
     "why": "Without overload it is 1-to-1 dynamic NAT; the second host fails once the single mapping is used."
    },
    {
     "do": "Check the dynamic pool: addresses, netmask, and that it is not exhausted.",
     "why": "Dynamic 1-to-1 NAT runs out of global addresses; new hosts get dropped."
    },
    {
     "do": "Verify routing: outside device has a route back to the inside-global/pool; router has default route to ISP.",
     "why": "NAT rewrites the header but the reply still needs a route home."
    },
    {
     "do": "Confirm static NAT uses correct inside-local to inside-global (ip nat inside source static).",
     "why": "Reversed addresses send replies nowhere."
    },
    {
     "do": "Remember NAT order of operations.",
     "why": "Inside-to-outside: ROUTE first, then NAT. Outside-to-inside: NAT (un-translate) first, then route. Explains why a route home is still needed even when a translation entry exists."
    },
    {
     "do": "Check the inside ACL sees the UNtranslated source.",
     "why": "On an inside interface the ACL matches the inside-local (pre-NAT) address, not the global. Common trap."
    },
    {
     "do": "Confirm the traffic actually transits an inside interface.",
     "why": "Router-originated traffic (sourced from the router itself) is NOT NATed by ip nat inside source list. Explains hosts work but the router cannot."
    },
    {
     "do": "Clear stale entries with clear ip nat translation * then re-test.",
     "why": "Old half-built mappings can mask a corrected config."
    }
   ],
   "verify": [
    {
     "cmd": "show ip nat translations",
     "look": "Inside local to inside global rows. With PAT: same global IP, different port numbers. Empty = no match."
    },
    {
     "cmd": "show ip nat statistics",
     "look": "Hits vs Misses, the inside/outside interface list, the ACL and pool in use."
    },
    {
     "cmd": "show running-config | include ip nat",
     "look": "overload present, correct ACL number, inside/outside on the right interfaces."
    },
    {
     "cmd": "show access-lists",
     "look": "NAT ACL permits the inside-local source subnet; watch hit counts climb on the permit line."
    },
    {
     "cmd": "show ip interface brief",
     "look": "Interface up/up; cross-check inside vs outside tags in running-config."
    },
    {
     "cmd": "debug ip nat",
     "look": "Live translations as they happen. WARNING: heavy CPU, never on a busy production router."
    }
   ],
   "numbers": [
    {
     "k": "PAT keyword",
     "v": "overload (enables many-to-one port translation)"
    },
    {
     "k": "PAT sessions per global IP",
     "v": "~64500 usable ports (range 1024-65535) per inside-global IP; spills to extra pool IPs when full"
    },
    {
     "k": "4 NAT terms = 2x2 matrix",
     "v": "inside/outside = whose host; local/global = which side's view"
    },
    {
     "k": "inside local",
     "v": "inside host viewed from inside (private, before NAT)"
    },
    {
     "k": "inside global",
     "v": "same inside host viewed from outside (public, after NAT)"
    },
    {
     "k": "outside local",
     "v": "outside host as it appears to the inside"
    },
    {
     "k": "outside global",
     "v": "outside host's real public IP"
    },
    {
     "k": "Inside interface cmd",
     "v": "ip nat inside"
    },
    {
     "k": "Outside interface cmd",
     "v": "ip nat outside"
    },
    {
     "k": "PAT config (interface)",
     "v": "ip nat inside source list <ACL> interface <WAN> overload"
    },
    {
     "k": "Dynamic pool define",
     "v": "ip nat pool NAME <start> <end> netmask <MASK>"
    },
    {
     "k": "PAT/dynamic with pool",
     "v": "ip nat inside source list <ACL> pool NAME overload"
    },
    {
     "k": "Static NAT (1:1)",
     "v": "ip nat inside source static <inside-local> <inside-global>"
    },
    {
     "k": "Static PAT (port forward)",
     "v": "ip nat inside source static tcp <in-local> <port> <in-global> <port>"
    },
    {
     "k": "NAT ACL type",
     "v": "standard ACL = match source only (typical); extended changes match behavior"
    },
    {
     "k": "Direction keyword",
     "v": "inside source = translate the inside-local source on egress (not outside source)"
    },
    {
     "k": "Default timeouts",
     "v": "TCP ~24h, UDP/ICMP minutes; idle entry aging out is normal, not a bug"
    },
    {
     "k": "Clear translations",
     "v": "clear ip nat translation *"
    }
   ],
   "pairs": [
    {
     "a": "inside local",
     "b": "inside global",
     "diff": "local = private before NAT; global = public after NAT (exam swaps these)"
    },
    {
     "a": "outside local",
     "b": "outside global",
     "diff": "local = how outside host looks to inside; global = its real public IP"
    },
    {
     "a": "Dynamic NAT",
     "b": "PAT (overload)",
     "diff": "dynamic = 1-to-1 pool, can exhaust; PAT = many-to-one via port, needs overload"
    },
    {
     "a": "ip nat inside source",
     "b": "ip nat outside source",
     "diff": "inside source translates the inside-local on egress; outside source is the reverse direction"
    },
    {
     "a": "Static NAT",
     "b": "Dynamic NAT",
     "diff": "static = manual fixed 1:1, no ACL or pool needed; dynamic = ACL picks, pool assigns"
    }
   ],
   "traps": [
    {
     "trigger": "Many hosts, one public IP, only first works",
     "answer": "Missing overload keyword"
    },
    {
     "trigger": "show ip nat translations is empty",
     "answer": "No ip nat inside/outside on interfaces OR ACL does not match the source"
    },
    {
     "trigger": "Some hosts translate, new ones dropped, Misses climbing",
     "answer": "Dynamic NAT pool exhausted (add overload or enlarge pool)"
    },
    {
     "trigger": "Misses counter rising in show ip nat statistics",
     "answer": "ACL or pool problem, not the interface tags"
    },
    {
     "trigger": "Translation entry exists but no return traffic",
     "answer": "Routing problem: no route back to inside-global/pool, not a NAT bug"
    },
    {
     "trigger": "NAT statement references list but nothing matches",
     "answer": "ACL wrong subnet or implicit deny; permit the inside-local source"
    },
    {
     "trigger": "Does static NAT need an ACL?",
     "answer": "No. Static is a direct 1:1 mapping, no ACL and no overload"
    },
    {
     "trigger": "Hosts can reach outside but the router itself cannot",
     "answer": "Router-sourced traffic is not NATed by ip nat inside source list (does not transit an inside interface)"
    },
    {
     "trigger": "Translation disappeared after the host went idle",
     "answer": "Normal aging (TCP ~24h, UDP/ICMP minutes), not a fault"
    },
    {
     "trigger": "Which address does the inside interface ACL match",
     "answer": "The inside-local (untranslated) source, not the global"
    }
   ]
  },
  {
   "kind": "trouble",
   "title": "DHCP clients not getting addresses",
   "domain": "IP Services / DHCP",
   "why": "169.254 is the instant tell, and missing ip helper-address is the classic relay trap. High-yield exam scenario.",
   "symptom": "Client has 169.254.x.x (APIPA). It sent DISCOVER, got no OFFER.",
   "steps": [
    {
     "do": "Order of attack: L2/L3 up, then helper-address, then pool/scope, then exclusions/exhaustion.",
     "why": "Fix in this sequence. Lower layers first."
    },
    {
     "do": "Confirm symptom: 169.254.x.x = APIPA (no OFFER). 0.0.0.0 = NIC/cable, not DHCP.",
     "why": "169.254 proves DHCP reachability problem, not a static issue."
    },
    {
     "do": "SVI up? show ip interface brief, look for up/up.",
     "why": "down/down = clients isolated at L3. Nothing else matters yet."
    },
    {
     "do": "VLAN exists? show vlan brief.",
     "why": "Missing VLAN means the broadcast never forms a subnet."
    },
    {
     "do": "Remote server? Add ip helper-address 10.1.1.10 on the clients gateway interface (the SVI for an L3 switch).",
     "why": "DISCOVER is broadcast; routers drop it. helper relays it as unicast. THE usual missing piece."
    },
    {
     "do": "Local server? No helper needed: router serves the broadcast itself.",
     "why": "Stops the why-didnt-helper-help trap. helper is only for a server on another subnet."
    },
    {
     "do": "Pool network statement matches client subnet/mask.",
     "why": "Wrong scope = relay arrives, no matching pool, no OFFER."
    },
    {
     "do": "excluded-address does not cover the whole usable range.",
     "why": "Too-wide exclusion = zero leases to hand out."
    },
    {
     "do": "Pool exhausted? show ip dhcp pool (leased vs total).",
     "why": "All leased = new clients get nothing."
    },
    {
     "do": "default-router and dns-server set in pool.",
     "why": "No default-router = has IP but no gateway. Different symptom, still a pool gap."
    },
    {
     "do": "DHCP snooping on? Server/uplink port must be trusted.",
     "why": "Untrusted port drops OFFER. Looks identical to missing helper."
    },
    {
     "do": "Re-test: ipconfig /release then /renew, or shut/no shut NIC.",
     "why": "Forces a fresh DISCOVER to validate end to end."
    }
   ],
   "verify": [
    {
     "cmd": "show ip dhcp binding",
     "look": "Leased IP-to-MAC entries. Empty = none served; full = exhausted."
    },
    {
     "cmd": "show ip dhcp pool",
     "look": "Leased count vs total. The cleanest exhaustion check."
    },
    {
     "cmd": "show running-config | section ip dhcp pool",
     "look": "network statement and mask match the client subnet."
    },
    {
     "cmd": "show ip dhcp conflict",
     "look": "Duplicate-address conflicts (ping/ARP detected). Each shrinks the pool."
    },
    {
     "cmd": "show running-config interface <int>",
     "look": "ip helper-address on the clients gateway interface, pointing at the server."
    },
    {
     "cmd": "show ip interface brief",
     "look": "SVI/interface up/up. down/down = isolated."
    }
   ],
   "fix": "Add ip helper-address <server> on the clients gateway interface (the SVI on an L3 switch). The relay sets the giaddr field so the server picks the right scope.",
   "numbers": [
    {
     "k": "DHCP server port (UDP)",
     "v": "67"
    },
    {
     "k": "DHCP client port (UDP)",
     "v": "68"
    },
    {
     "k": "APIPA range",
     "v": "169.254.0.0/16"
    },
    {
     "k": "0.0.0.0",
     "v": "no lease attempt: NIC/cable, not APIPA"
    },
    {
     "k": "DISCOVER and initial REQUEST",
     "v": "both broadcast (255.255.255.255); relay forwards both"
    },
    {
     "k": "OFFER / ACK",
     "v": "can be unicast back via giaddr"
    },
    {
     "k": "DORA order",
     "v": "Discover, Offer, Request, Ack"
    },
    {
     "k": "giaddr",
     "v": "relay stamps its interface IP; server uses it to pick the scope"
    },
    {
     "k": "helper-address goes on",
     "v": "clients gateway interface (the SVI on an L3 switch)"
    },
    {
     "k": "multiple helpers",
     "v": "stack several ip helper-address lines = redundant servers"
    },
    {
     "k": "helper default UDP forwarded",
     "v": "DHCP/BOOTP 67/68, DNS 53, TFTP 69, TIME 37, NetBIOS 137/138, TACACS 49"
    },
    {
     "k": "excluded-address",
     "v": "ip dhcp excluded-address <start> <end>"
    },
    {
     "k": "service dhcp",
     "v": "on by default; no service dhcp kills server/relay"
    },
    {
     "k": "router as client",
     "v": "ip address dhcp on the interface"
    },
    {
     "k": "default lease",
     "v": "1 day (24h); lease infinite = never expire"
    },
    {
     "k": "pool skeleton",
     "v": "ip dhcp pool NAME / network / default-router / dns-server / lease"
    }
   ],
   "traps": [
    {
     "trigger": "Client has a 169.254.x.x address",
     "answer": "No OFFER reached it; add/check ip helper-address"
    },
    {
     "trigger": "Remote-VLAN PCs get no IP, server is on another subnet",
     "answer": "Missing ip helper-address on that VLANs gateway (SVI)"
    },
    {
     "trigger": "ip helper-address placed on the server-side interface",
     "answer": "Wrong; it goes on the interface that receives the client broadcast"
    },
    {
     "trigger": "Local router is the DHCP server but someone adds a helper anyway",
     "answer": "helper not needed for a local subnet; broadcast is served locally"
    },
    {
     "trigger": "Clients get an IP but cannot reach other networks",
     "answer": "Pool missing default-router (gateway) statement"
    },
    {
     "trigger": "Only first few clients got IPs, rest get nothing",
     "answer": "Pool exhausted or excluded-address range too large"
    },
    {
     "trigger": "Why is the server picking the correct subnet scope",
     "answer": "Relay stamped its interface IP into giaddr"
    },
    {
     "trigger": "helper relays DNS/TFTP traffic, not just DHCP",
     "answer": "Default forward-protocol list relays 8 UDP services"
    },
    {
     "trigger": "DHCP snooping on, server port untrusted, OFFERs dropped",
     "answer": "Set server/uplink port to ip dhcp snooping trust"
    },
    {
     "trigger": "No leases at all anywhere on the router",
     "answer": "no service dhcp disabled the DHCP service globally"
    }
   ]
  },
  {
   "kind": "tactics",
   "title": "Exam-day tactics and MCQ trigger phrases",
   "why": "Stem keywords map to one answer; spotting them fast saves minutes you cannot get back on the no-back exam.",
   "domain": "Exam strategy / 200-301 all domains",
   "numbers": [
    {
     "k": "Time limit",
     "v": "120 min base. Non-native English: +30 min (arrange with Pearson VUE in advance, NOT automatic at center)."
    },
    {
     "k": "Questions",
     "v": "roughly 90 to 120 items. You cannot predict the exact count."
    },
    {
     "k": "Passing score",
     "v": "Cisco does NOT publish it. Ignore the 825 myth. Just answer every item correctly as you can."
    },
    {
     "k": "NO BACK BUTTON",
     "v": "Once you click Next you CANNOT return. No flag, no review screen, no mark-for-review. Verify ONCE, then Next."
    },
    {
     "k": "Sim time cost",
     "v": "Labs/sims take 5 to 15 min each. Do them FIRST while fresh."
    },
    {
     "k": "No penalty",
     "v": "Wrong scores same as blank: NEVER leave blank, always guess."
    },
    {
     "k": "Drag-drop",
     "v": "Place EVERY tile. Often partial credit per match. Empty slot = zero."
    },
    {
     "k": "AD table (brain-dump line 1)",
     "v": "Connected 0, Static 1, EIGRP summary 5, eBGP 20, internal EIGRP 90, OSPF 110, IS-IS 115, RIP 120, external EIGRP 170, iBGP 200, unusable 255."
    },
    {
     "k": "Port table (brain-dump line 2)",
     "v": "FTP 20/21, SSH 22, Telnet 23, SMTP 25, DNS 53, DHCP 67/68, TFTP 69, HTTP 80, NTP 123, SNMP 161/162, HTTPS 443, Syslog 514."
    },
    {
     "k": "Subnet math",
     "v": "block size = 256 minus mask octet. Usable hosts = 2^(host bits) minus 2. Wildcard = 255.255.255.255 minus mask."
    },
    {
     "k": "RFC1918 private",
     "v": "10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. APIPA 169.254.0.0/16 = no DHCP reached."
    },
    {
     "k": "OSPF cost",
     "v": "cost = 10^8 / bandwidth (ref bw default 100 Mbps). Area 0 = backbone, all areas touch it."
    },
    {
     "k": "STP timers/defaults",
     "v": "hello 2s, forward delay 15s, max age 20s. Bridge priority default 32768, set in multiples of 4096."
    },
    {
     "k": "Syslog severity 0-7",
     "v": "Emergency, Alert, Critical, Error, Warning, Notice, Informational, Debug. 0 = worst. Mnemonic: Every Awesome Cisco Engineer Will Need Ice cream Daily."
    },
    {
     "k": "DHCP DORA",
     "v": "Discover, Offer, Request, Ack. Server UDP 67, client UDP 68."
    }
   ],
   "traps": [
    {
     "trigger": "most specific route / best match / which route is used",
     "answer": "Longest prefix match wins FIRST. AD/metric only decide between routes of EQUAL prefix length."
    },
    {
     "trigger": "two routes same prefix, which is installed",
     "answer": "Lowest administrative distance wins (AD before metric)."
    },
    {
     "trigger": "same protocol, same AD, which path",
     "answer": "Lowest metric wins."
    },
    {
     "trigger": "default route / gateway of last resort",
     "answer": "ip route 0.0.0.0 0.0.0.0 <next-hop>"
    },
    {
     "trigger": "minimal config change / least disruptive / fewest commands",
     "answer": "Pick the option that edits ONE thing (single subinterface, one ACL line, or switchport mode access)."
    },
    {
     "trigger": "most secure remote management / encrypts session",
     "answer": "SSH: transport input ssh + ip ssh version 2. Never Telnet."
    },
    {
     "trigger": "secure scalable login / per-command authorization / encrypts whole packet",
     "answer": "TACACS+ (TCP 49). Separates all 3 A's."
    },
    {
     "trigger": "open-standard AAA / encrypts only password / combines authen+author",
     "answer": "RADIUS (UDP 1812 auth, 1813 acct; legacy 1645/1646)."
    },
    {
     "trigger": "TACACS+ vs RADIUS side-by-side",
     "answer": "TACACS+ = TCP 49, encrypts WHOLE packet, separates AAA, per-command authz, Cisco. RADIUS = UDP 1812/1813 (or 1645/1646), encrypts password ONLY, combines authen+author, open standard."
    },
    {
     "trigger": "limit one MAC / shut on violation / sticky",
     "answer": "Port security. Modes: shutdown (DEFAULT, err-disabled), restrict (drops + logs/SNMP counter), protect (drops silently, no log)."
    },
    {
     "trigger": "filter by source IP only / place near destination",
     "answer": "Standard ACL (1-99 and 1300-1999). Place close to destination."
    },
    {
     "trigger": "filter source+dest+port/protocol / place near source",
     "answer": "Extended ACL (100-199 and 2000-2699). Place close to source."
    },
    {
     "trigger": "assign IP across subnets / DHCP not on same subnet",
     "answer": "ip helper-address <DHCP-server-IP> on the interface FACING clients (the client-subnet SVI/subinterface). Relays 8 UDP services, not just DHCP."
    },
    {
     "trigger": "private IPs reach internet / many hosts one public IP",
     "answer": "PAT / NAT overload: ip nat inside source ... overload."
    },
    {
     "trigger": "loop-free layer 2 / which port blocks",
     "answer": "STP tie-break order: 1) lowest root bridge ID (priority then MAC), 2) lowest path cost to root, 3) lowest sender bridge ID, 4) lowest sender port ID."
    },
    {
     "trigger": "edge port to host, forward fast / shut port if BPDU seen",
     "answer": "PortFast = skip listening/learning on host port. BPDU Guard = err-disable port if a BPDU arrives."
    },
    {
     "trigger": "DR/BDR on multiaccess OSPF segment",
     "answer": "DR = highest OSPF priority, tie = highest router-id. priority 0 = NEVER DR/BDR. Election is NON-preemptive (a better router added later does NOT take over). RID source: configured > highest loopback IP > highest active interface IP."
    },
    {
     "trigger": "first-hop gateway redundancy",
     "answer": "HSRP (Cisco, active/standby) | VRRP (open standard) | GLBP (Cisco, load-balances across gateways). Stem 'open standard' = VRRP. Stem 'load-balance' = GLBP. HSRPv1 group 0-255, virtual MAC 0000.0c07.acXX."
    },
    {
     "trigger": "carry multiple VLANs over one link",
     "answer": "Trunk: switchport mode trunk (802.1Q). Untagged traffic = native VLAN (default VLAN 1). Native VLAN mismatch = classic CDP-flagged error."
    },
    {
     "trigger": "route between VLANs",
     "answer": "Router-on-a-stick (subinterfaces + encapsulation dot1q <vlan>) OR L3 switch SVI (ip routing + interface vlan <id>)."
    },
    {
     "trigger": "bundle links into one logical link",
     "answer": "EtherChannel. LACP (open, active/passive) | PAgP (Cisco, desirable/auto). Forms only if modes are compatible (active+active/passive, desirable+desirable/auto)."
    },
    {
     "trigger": "host auto-configures its own IPv6",
     "answer": "SLAAC (RA + /64, often EUI-64). Link-local = FE80::/10. Unique local = FC00::/7. Global unicast = 2000::/3. Multicast = FF00::/8. One-to-nearest = anycast."
    },
    {
     "trigger": "strongest WiFi security / enterprise login",
     "answer": "WPA3 strongest. WPA2/WPA3-Enterprise = 802.1X + RADIUS. PSK = Personal. Lightweight AP talks to WLC over CAPWAP (mgmt + data)."
    },
    {
     "trigger": "agentless automation / push model",
     "answer": "Ansible (agentless, push, YAML). Puppet/Chef = agent-based, pull. Data formats: JSON {}, XML <tags>, YAML indentation. REST verbs: GET/POST/PUT/DELETE."
    },
    {
     "trigger": "controller-based / SDN",
     "answer": "Northbound API = controller to apps (REST). Southbound = controller to devices. Cisco DNA Center = SDN controller."
    },
    {
     "trigger": "port that takes a packet, port that takes a host",
     "answer": "DHCP snooping: trusted port faces the real DHCP server; untrusted faces clients (drops rogue Offers)."
    },
    {
     "trigger": "troubleshoot connectivity / which tool",
     "answer": "ping = reachability (ICMP). traceroute = path/where it dies. Work OSI bottom-up."
    }
   ],
   "steps": [
    {
     "do": "First 60 sec: brain-dump AD table, port list, subnet/wildcard math onto the scratch sheet.",
     "why": "Read your notes, do not re-derive under pressure."
    },
    {
     "do": "Read the LAST line of the stem first, then the body.",
     "why": "Tells you the one fact to hunt for."
    },
    {
     "do": "Do all sims/labs FIRST while fresh. Verify with show before submit.",
     "why": "Sims are heavy and time-hungry; fatigue causes typos that fail the whole lab."
    },
    {
     "do": "After sims: remaining minutes divided by remaining questions = your per-item budget. Glance at clock ONCE at the halfway item.",
     "why": "One clean pace rule, no conflicting targets."
    },
    {
     "do": "Eliminate distractors: cross off any option false on its own, wrong layer, or wrong syntax.",
     "why": "Cuts 4 to 2, doubles guess odds."
    },
    {
     "do": "Stuck after about 90 sec: guess from the survivors. Never blank.",
     "why": "Wrong = blank in score; a guess can win."
    },
    {
     "do": "Verify ONCE, then click Next. No going back.",
     "why": "No flag, no review screen; a hasty Next is permanent."
    },
    {
     "do": "Drag-and-drop: place EVERY tile even when guessing.",
     "why": "Many score partial credit; empty = zero."
    }
   ],
   "pairs": [
    {
     "a": "TACACS+",
     "b": "RADIUS",
     "diff": "TCP 49, encrypts whole packet, separates AAA, per-command authz, Cisco | UDP 1812/1813 (legacy 1645/1646), encrypts password only, combines authen+author, open standard"
    },
    {
     "a": "Standard ACL",
     "b": "Extended ACL",
     "diff": "1-99 and 1300-1999, source IP only, place near destination | 100-199 and 2000-2699, source+dest+port, place near source"
    },
    {
     "a": "Port-security restrict",
     "b": "Port-security protect",
     "diff": "restrict drops AND logs/increments SNMP counter | protect drops silently, no log. (shutdown = default, err-disabled)"
    },
    {
     "a": "HSRP / VRRP",
     "b": "GLBP",
     "diff": "HSRP+VRRP = one active gateway (standby waits) | GLBP load-balances across multiple active gateways. VRRP is the open-standard one."
    },
    {
     "a": "LACP",
     "b": "PAgP",
     "diff": "LACP = open standard, modes active/passive | PAgP = Cisco, modes desirable/auto"
    },
    {
     "a": "PortFast",
     "b": "BPDU Guard",
     "diff": "PortFast skips listening/learning on a host edge port | BPDU Guard err-disables that port if a BPDU shows up"
    },
    {
     "a": "DR election",
     "b": "non-preemptive",
     "diff": "Highest priority then highest RID wins, priority 0 = never eligible | once elected the DR keeps the role even if a better router joins later"
    },
    {
     "a": "ping",
     "b": "traceroute",
     "diff": "ping = is it reachable (ICMP echo) | traceroute = show the path and where it breaks"
    }
   ]
  }
 ]
};
