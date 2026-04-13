// ExamTopics CCNA 200-301 question bank
// Extracted from 3 PDF sets
// Total: 1016 questions
window.EXAMTOPICS_CARDS = [
 {
  "id": "examtopics-1_q500",
  "num": 500,
  "question": "What are two benefits of FHRPs? (Choose two.)",
  "options": [
   "They allow encrypted traffic",
   "They prevent loops in the Layer 2 network.",
   "They are able to bundle multiple ports to increase bandwidth",
   "They enable automatic failover of the default gateway",
   "They allow multiple devices to serve as a single virtual gateway for clients in the network"
  ],
  "correct": "DE",
  "explanation": "\uf147 \uf007 papibarbu 8 months, 2 weeks ago\nyes my man",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q501",
  "num": 501,
  "question": "What is the MAC address used with VRRP as a virtual address?",
  "options": [
   "00-05-42-38-53-31",
   "00-00-5E-00-01-0a",
   "00-00-0C-07-AD-89",
   "00-07-C0-70-AB-01"
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 Goh0503 Highly Voted \uf164 11 months, 1 week ago\nAnswer B\n000.5E00.01xx is VRRP virtual MAC\n0000.0c07.acxx is HSRP virtual MAC\n0007.b400.xxyy is GLBP virtual MAC",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q502",
  "num": 502,
  "question": "Why would VRRP be implemented when configuring a new subnet in a multivendor environment?",
  "options": [
   "when a gateway protocol is required that supports more than two Cisco devices for redundancy",
   "to interoperate normally with all vendors and provide additional security features for Cisco devices",
   "to ensure that the spanning-tree forwarding path to the gateway is loop-free",
   "to enable normal operations to continue after a member failure without requiring a change in a host ARP cache"
  ],
  "correct": "B",
  "explanation": "VRRP is the industry standards based FHRP similar to Cisco's HSRP but is supported by multiple vendors.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q503",
  "num": 503,
  "question": "Why implement VRRP?",
  "options": [
   "To hand over to end users the autodiscovery of virtual gateways",
   "To provide end users with a virtual gateway in a multivendor network",
   "To leverage a weighting scheme to provide uninterrupted service",
   "To detect link failures without the overhead of Bidirectional Forwarding Detection"
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 mda2h 1 month, 3 weeks ago\nSelected Answer: B\n\nA. Wrong, it;s DHCP that allows the auto discovery of (virtual) gateways, not VRRP\nC. Wrong, no weighting scheme is used between the gateways in the VRRP group. Active-passive scheme only\nD. Wrong, with VRRP users do not detect failure. If one GW fails, another one seamlessly takes up the role",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q504",
  "num": 504,
  "question": "Which type of address is shared by routers in a HSRP implementation and used by hosts on the subnet as their default gateway address?",
  "options": [
   "multicast address",
   "virtual IP address",
   "loopback IP address",
   "broadcast address"
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 [Removed] 2 months, 3 weeks ago\nSelected Answer: B\n\nGiven answer is correct",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q505",
  "num": 505,
  "question": "By default, which virtual MAC address does HSRP group 14 use?",
  "options": [
   "00:05:5e:19:0c:14",
   "00:05:0c:07:ac:14",
   "04:15:26:73:3c:0e",
   "00:00:0c:07:ac:0e"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 MikD4016 Highly Voted \uf164 11 months, 3 weeks ago\nAs you know that HSRP uses this virtual MAC address, 0000.0C07.ACxy, where xy is the HSRP group number in hexadecimal.\nso your HSRP group no is 14 which is in a decimal format so we need to change it into hexadecimal\n14 = 0000 1110 binary\n0000 1110 = 0e hex\nso by this process, for HSRP Group 14 the Mac address will be : 00:00:0c:07ac:0e",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q506",
  "num": 506,
  "question": "Refer to the exhibit. Router R1 is added to the network and configured with the 10.0.0.64/26 and 10.0.20.0/26 subnets. However, traffic destined\nfor the LAN on\nR3 is not accessible. Which command when executed on R1 defines a static route to reach the R3 LAN?",
  "options": [
   "ip route 10.0.0.64 255.255.255.192 10.0.20.3",
   "ip route 10.0.15.0 255.255.255.0 10.0.20.1",
   "ip route 10.0.15.0 255.255.255.192 10.0.20.1",
   "ip route 10.0.15.0 255.255.255.0 10.0.20.3"
  ],
  "correct": "D",
  "explanation": "We need to specify the destination network (10.0.15.0/24) and the next hop IP of the router to get to that network (10.0.20.3).\n\n\uf147 \uf007 jayjihaekim 3 months, 2 weeks ago\nStatic Routing: ip route <Destination IP> <Subnet-mask> {interface address }\n10.0.15.0 24 = 255.255.255.0 10.0.20.3",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q507",
  "num": 507,
  "question": "A router has two static routes to the same destination network under the same OSPF process. How does the router forward packets to the\ndestination if the net- hop devices are different?",
  "options": [
   "The router chooses the route with the oldest age.",
   "The router chooses the next hop with the lowest IP address.",
   "The router chooses the next hop with the lowest MAC address.",
   "The router load-balances traffic over all routes to the destination."
  ],
  "correct": "D",
  "explanation": "Load balancing is a standard functionality of Cisco IOS Software that is available across all router platforms. It is inherent to the forwarding\nprocess in the router, and it enables a router to use multiple paths to a destination when it forwards packets. The number of paths used is\nlimited by the number of entries that the routing protocol puts in the routing table. Four entries is the default in Cisco IOS Software for IP\nrouting protocols except for BGP. BGP has a default of one entry.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q508",
  "num": 508,
  "question": "What does the implementation of a first-hop redundancy protocol protect against on a network?",
  "options": [
   "default gateway failure",
   "BGP neighbor flapping",
   "spanning-tree loops",
   "root-bridge loss"
  ],
  "correct": "A",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q509",
  "num": 509,
  "question": "Which feature or protocol is required for an IP SLA to measure UDP jitter?",
  "options": [
   "LLDP",
   "EEM",
   "CDP",
   "NTP"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 LTTAM Highly Voted \uf164 2 years, 8 months ago\nCorrect Answer. Source:\nhttps://www.cisco.com/c/en/us/td/docs/ios-xml/ios/ipsla/configuration/xe-16-6/sla-xe-16-6-book/sla-udp-jitter.html",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q510",
  "num": 510,
  "question": "Refer to the exhibit. Which feature is enabled by this configuration?",
  "options": [
   "static NAT translation",
   "a DHCP pool",
   "a dynamic NAT address pool",
   "PAT"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 cormorant 9 months ago\nit's a dynamic nat address pool",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q511",
  "num": 511,
  "question": "Which NAT term is defined as a group of addresses available for NAT use?",
  "options": [
   "NAT pool",
   "dynamic NAT",
   "static NAT",
   "one-way NAT"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Lulu03 5 months ago\nA is correct",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q512",
  "num": 512,
  "question": "Which command can you enter to allow Telnet to be supported in addition to SSH?",
  "options": [
   "transport input telnet ssh",
   "transport input telnet",
   "no transport input telnet",
   "privilege level 15"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 pianetaperez Highly Voted \uf164 2 years, 7 months ago\nPacket tracer supports \"transport input all\", does not support \"transport input telnet ssh\".",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q513",
  "num": 513,
  "question": "Refer to the exhibit. After you apply the given configuration to a router, the DHCP clients behind the device cannot communicate with hosts\noutside of their subnet.\nWhich action is most likely to correct the problem?",
  "options": [
   "Configure the dns server on the same subnet as the clients",
   "Activate the dhcp pool",
   "Correct the subnet mask",
   "Configure the default gateway"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 xsp Highly Voted \uf164 2 years, 7 months ago\nAnswer is correct, since question is \"Which action is most likely to correct the problem?\"\nMeans that the given set of command is missing something.\nSince when we are configuring a DHCP server on a router:\nconf t\nservice dhcp\nip dhcp pool <pool name>\nnetwork <network address of the pool>\ndefault-router <ip address of the interface facing the hosts, or ip adress of the interface facing downstream clients>\ndns-server <ip address of dns-server>\nexit",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q514",
  "num": 514,
  "question": "Refer to the exhibit. Which rule does the DHCP server use when there is an IP address conflict?",
  "options": [
   "The address is removed from the pool until the conflict is resolved.",
   "The address remains in the pool until the conflict is resolved.",
   "Only the IP detected by Gratuitous ARP is removed from the pool.",
   "Only the IP detected by Ping is removed from the pool.",
   "The IP will be shown, even after the conflict is resolved."
  ],
  "correct": "A",
  "explanation": "An address conflict occurs when two hosts use the same IP address. During address assignment, DHCP checks for conflicts using ping and\ngratuitous ARP. If a conflict is detected, the address is removed from the pool. The address will not be assigned until the administrator resolves\nthe conflict.\n\n\uf147 \uf007 uevenasdf Highly Voted \uf164 2 years, 8 months ago\nDidn't know we had routers in 1198 lol",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q515",
  "num": 515,
  "question": "Which command can you enter to determine the addresses that have been assigned on a DHCP Server?",
  "options": [
   "Show ip DHCP database.",
   "Show ip DHCP pool.",
   "Show ip DHCP binding.",
   "Show ip DHCP server statistic."
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 wannaknow Highly Voted \uf164 2 years, 8 months ago\nSeems Correct answer is B\nSwitch#sh ip dhcp ?\nbinding DHCP address bindings\nconflict DHCP address conflicts\npool DHCP pools information\nrelay Miscellaneous DHCP relay information\nsnooping DHCP snooping\nSwitch#",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q516",
  "num": 516,
  "question": "What is the authoritative source for an address lookup?",
  "options": [
   "a recursive DNS search",
   "the operating system cache",
   "the ISP local cache",
   "the browser cache"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 sasquatchshrimp Highly Voted \uf164 1 year, 1 month ago\nIn DNS, \"authoritative\" basically means, who can be trusted to own and know the dns entries for the specified item. In this item, its asking for an\nauthoritative source, which has to be a server. DNS entries that are cached can be wrong, old/outdated. So Caches are ruled out. Now, this is a\nterrible question, but a basically, a recursive dns query is a packet that goes out to the big work dns networks and \"walks the tree\" to find an\nauthoritative dns server for the website you are looking for. https://www.cloudflare.com/learning/dns/what-is-recursive-dns/",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q517",
  "num": 517,
  "question": "Which command is used to verify the DHCP relay agent address that has been set up on your Cisco IOS router?",
  "options": [
   "show ip interface brief",
   "show ip dhcp bindings",
   "show ip route",
   "show ip interface",
   "show interface",
   "show ip dhcp pool"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 raydel92 Highly Voted \uf164 1 year, 9 months ago\nSelected Answer: D\n\nWith that command you can see if the helper address (dhcp relay) is configured.\nRouter1#sh ip interface g0/0\nGigabitEthernet0/0 is up, line protocol is up (connected)\nInternet address is 10.0.0.1/30\nBroadcast address is 255.255.255.255\nAddress determined by setup command\nMTU is 1500 bytes\nHelper address is 192.168.4.2",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q518",
  "num": 518,
  "question": "Which type of information resides on a DHCP server?",
  "options": [
   "a list of the available IP addresses in a pool",
   "a list of public IP addresses and their corresponding names",
   "usernames and passwords for the end users in a domain",
   "a list of statically assigned MAC addresses"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 DaBest Highly Voted \uf164 1 year, 11 months ago\nobviously thats a list of the available IP addresses in a pool..",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q519",
  "num": 519,
  "question": "What are two roles of Domain Name Services (DNS)? (Choose two.)",
  "options": [
   "builds a flat structure of DNS names for more efficient IP operations",
   "encrypts network Traffic as it travels across a WAN by default",
   "improves security by protecting IP addresses under Fully Qualified Domain Names (FQDNs)",
   "enables applications to identify resources by name instead of IP address",
   "allows a single host name to be shared across more than one IP address"
  ],
  "correct": "DE",
  "explanation": "\uf147 \uf007 Sim_James_27 Highly Voted \uf164 1 year, 9 months ago\nE is correct-having multiple ips assigned to one host, can do dns load balancing (like round robin), mostly i have used this terminology on SQL\nclusters and File share clusters",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q520",
  "num": 520,
  "question": "Which Cisco IOS command will indicate that interface GigabitEthernet 0/0 is configured via DHCP?",
  "options": [
   "show ip interface GigabitEthernet 0/0 dhcp",
   "show interface GigabitEthernet 0/0",
   "show ip interface dhcp",
   "show ip interface GigabitEthernet 0/0",
   "show ip interface GigabitEthernet 0/0 brief"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 joseph267 Highly Voted \uf164 1 year, 10 months ago\nstop confusing people the answer is correct\nR2#show ip int gi0/0/0\nGigabitEthernet0/0/0 is up, line protocol is up (connected)\nInternet address is 10.1.0.2/24\nBroadcast address is 255.255.255.255\nAddress determined by DHCP\nMTU is 1500 bytes",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q521",
  "num": 521,
  "question": "What will happen if you configure the logging trap debug command on a router?",
  "options": [
   "It causes the router to send messages with lower severity levels to the syslog server",
   "It causes the router to send all messages with the severity levels Warning, Error, Critical, and Emergency to the syslog server",
   "It causes the router to send all messages to the syslog server",
   "It causes the router to stop sending all messages to the syslog server"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 vadiminski Highly Voted \uf164 2 years, 4 months ago\nA good way to memorize: Ernie Always Cries Even When Noone Is Dying",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q522",
  "num": 522,
  "question": "A network administrator enters the following command on a router: logging trap 3. What are three message types that will be sent to the Syslog\nserver? (Choose three.)",
  "options": [
   "informational",
   "emergency",
   "warning",
   "critical",
   "debug",
   "error"
  ],
  "correct": "BDF",
  "explanation": "\uf147 \uf007 martco Highly Voted \uf164 2 years, 7 months ago\nEvery Awesome Cisco Engineer Will Need Icecream Daily (L0-7)",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q524",
  "num": 524,
  "question": "A network engineer must back up 20 network router configurations globally within a customer environment. Which protocol allows the engineer to\nperform this function using the Cisco IOS MIB?",
  "options": [
   "ARP",
   "SNMP",
   "SMTP",
   "CDP"
  ],
  "correct": "B",
  "explanation": "SNMP is an application-layer protocol that provides a message format for communication between SNMP managers and agents. SNMP\nprovides a standardized framework and a common language used for the monitoring and management of devices in a network.\nThe SNMP framework has three parts:\n\u202b\u05d2\u202c\u20ac\u00a2 An SNMP manager\n\u202b\u05d2\u202c\u20ac\u00a2 An SNMP agent\n\u202b\u05d2\u202c\u20ac\u00a2 A Management Information Base (MIB)\nThe Management Information Base (MIB) is a virtual information storage area for network management information, which consists of\ncollections of managed objects.\nWith SNMP, the network administrator can send commands to multiple routers to do the backup.\n\n\uf147 \uf007 omgrain Highly Voted \uf164 2 years, 11 months ago\nbe aware. If you are using SNMP, it will change all configs to those devices. answer B is right.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q525",
  "num": 525,
  "question": "Which command enables a router to become a DHCP client?",
  "options": [
   "ip address dhcp",
   "ip dhcp client",
   "ip helper-address",
   "ip dhcp pool"
  ],
  "correct": "A",
  "explanation": "If we want to get an IP address from the DHCP server on a Cisco device, we can use the command \u202b\u05d2\u202c\u20acip address dhcp\u202b\u05d2\u202c\u20ac.\nNote: The command \u202b\u05d2\u202c\u20acip helper-address\u202b\u05d2\u202c\u20ac enables a router to become a DHCP Relay Agent.\n\n\uf147 \uf007 akhuseyinoglu Highly Voted \uf164 3 years, 4 months ago\nCorrect Answer : A",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q526",
  "num": 526,
  "question": "Which function does an SNMP agent perform?",
  "options": [
   "It sends information about MIB variables in response to requests from the NMS",
   "It manages routing between Layer 3 devices in a network",
   "It coordinates user authentication between a network device and a TACACS+ or RADIUS server",
   "It requests information from remote network nodes about catastrophic system events"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 hippyjm Highly Voted \uf164 2 years, 5 months ago\nhttps://www.cisco.com/c/en/us/td/docs/ios-xml/ios/snmp/configuration/xe-16/snmp-xe-16-book/nm-snmp-cfg-snmp-support.html\nA is correct",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q527",
  "num": 527,
  "question": "What are two roles of the Dynamic Host Configuration Protocol (DHCP)? (Choose two.)",
  "options": [
   "The DHCP server assigns IP addresses without requiring the client to renew them.",
   "The DHCP server leases client IP addresses dynamically.",
   "The DHCP client is able to request up to four DNS server addresses.",
   "The DHCP server offers the ability to exclude specific IP addresses from a pool of IP addresses.",
   "The DHCP client maintains a pool of IP addresses it is able to assign."
  ],
  "correct": "BD",
  "explanation": "\uf147 \uf007 chomjosh Highly Voted \uf164 3 years, 1 month ago\nTricky question. Note DHCP is administered at the \"Server\" level. The word \"client\" in the other options was deliberate to mislead. DHCP server\nrequires clients to renew IP except it is tied to MAC, hence option A is out.\nBD is correct.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q528",
  "num": 528,
  "question": "Which command must be entered when a device is configured as an NTP server?",
  "options": [
   "ntp peer",
   "ntp master",
   "ntp authenticate",
   "ntp server"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 sabaheta Highly Voted \uf164 2 years, 11 months ago\n- ntp master {stratum-level}: NTP server mode\u2014the device acts only as an NTP server,\nand not as an NTP client. The device gets its time information from the internal clock on\nthe device.\n- ntp server {address | hostname}: NTP client/server mode\u2014the device acts as both client\nand server. First, it acts as an NTP client, to synchronize time with a server. Once synchronized, the device can then act as an NTP server, to supply\ntime to other NTP clients.\nreference : Wendell Odom CCNA vol 2\nCorrect answer : B",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q529",
  "num": 529,
  "question": "What event has occurred if a router sends a notice level message to a syslog server?",
  "options": [
   "A certificate has expired",
   "An interface line has changed status",
   "A TCP connection has been torn down",
   "An ICMP connection has been built"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 IxlJustinlxl Highly Voted \uf164 2 years, 4 months ago\n0 Emergencies System shutting down due to missing fan tray\n1 Alerts Temperature limit exceeded\n2 Critical Memory allocation failures\n3 Errors Interface Up/Down messages\n4 Warnings Configuration file written to server, via SNMP request\n5 Notifications Line protocol Up/Down\n6 Information Access-list violation logging\n7 Debugging Debug messages\nANSWER = B",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q530",
  "num": 530,
  "question": "Refer to the exhibit. An engineer deploys a topology in which R1 obtains its IP configuration from DHCP. If the switch and DHCP server\nconfigurations are complete and correct, which two sets of commands must be configured on R1 and R2 to complete the task? (Choose two.)",
  "options": [
   "R1(config)# interface fa0/0 R1(config-if)# ip helper-address 198.51.100.100",
   "R2(config)# interface gi0/0 R2(config-if)# ip helper-address 198.51.100.100",
   "R1(config)# interface fa0/0 R1(config-if)# ip address dhcp R1(config-if)# no shutdown",
   "R2(config)# interface gi0/0 R2(config-if)# ip address dhcp",
   "R1(config)# interface fa0/0 R1(config-if)# ip helper-address 192.0.2.2"
  ],
  "correct": "BC",
  "explanation": "\uf147 \uf007 ZayaB Highly Voted \uf164 2 years, 7 months ago\nNote that DHCP server is behind R2 and R1 needs IP via DHCP. Therefore, R2 needs to be a relay agent. On R1 interface, ip address dhcp and R2\ninside interface, ip helper-address 192.168.100.100 (dhcp server). Answers are B and C.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q531",
  "num": 531,
  "question": "Which two actions are performed by the Weighted Random Early Detection mechanism? (Choose two.)",
  "options": [
   "It supports protocol discovery.",
   "It guarantees the delivery of high-priority packets.",
   "It can identify different flows with a high level of granularity.",
   "It can mitigate congestion by preventing the queue from filling up.",
   "It drops lower-priority packets before it drops higher-priority packets."
  ],
  "correct": "DE",
  "explanation": "Weighted Random Early Detection (WRED) is just a congestion avoidance mechanism. WRED drops packets selectively based on IP precedence.\nEdge routers assign IP precedences to packets as they enter the network. When a packet arrives, the following events occur:\n1. The average queue size is calculated.\n2. If the average is less than the minimum queue threshold, the arriving packet is queued.\n3. If the average is between the minimum queue threshold for that type of traffic and the maximum threshold for the interface, the packet is\neither dropped or queued, depending on the packet drop probability for that type of traffic.\n4. If the average queue size is greater than the maximum threshold, the packet is dropped.\nWRED reduces the chances of tail drop (when the queue is full, the packet is dropped) by selectively dropping packets when the output interface\nbegins to show signs of congestion (thus it can mitigate congestion by preventing the queue from filling up). By dropping some packets early\nrather than waiting until the queue is full, WRED avoids dropping large numbers of packets at once and minimizes the chances of global\nsynchronization. Thus, WRED allows the transmission line to be used fully at all times.\nWRED generally drops packets selectively based on IP precedence. Packets with a higher IP precedence are less likely to be dropped than\npackets with a lower precedence. Thus, the higher the priority of a packet, the higher the probability that the packet will be delivered.\nReference:\nhttps://www.cisco.com/c/en/us/td/docs/ios-xml/ios/qos_conavd/configuration/15-mt/qos-conavd-15-mt-book/qos-conavd-cfg-wred.html\n\n\uf147 \uf007 poovnair Highly Voted \uf164 2 years, 11 months ago\nhttps://www.cisco.com/c/en/us/td/docs/ios-xml/ios/qos_conavd/configuration/xe-16/qos-conavd-xe-16-book/qos-conavd-cfg-wred.html\nDE",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q532",
  "num": 532,
  "question": "Refer to the exhibit. An engineer configured NAT translations and has verified that the configuration is correct. Which IP address is the source IP\nafter the NAT has taken place?",
  "options": [
   "10.4.4.4",
   "10.4.4.5",
   "172.23.103.10",
   "172.23.104.4"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 LTTAM Highly Voted \uf164 2 years, 8 months ago\nThe answer should be D. According to Cisco, the Inside Global would be considered the source address after NAT has taken place.\nSource - https://www.cisco.com/c/en/us/support/docs/ip/network-address-translation-nat/4606-8.html",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q533",
  "num": 533,
  "question": "If a notice-level message is sent to a syslog server, which event has occurred?",
  "options": [
   "A network device has restarted.",
   "A debug operation is running.",
   "A routing instance has flapped.",
   "An ARP inspection has failed."
  ],
  "correct": "C",
  "explanation": "Usually no action is required when a route flaps so it generates the notification syslog level message (level 5).\n\n\uf147 \uf007 Artengineer Highly Voted \uf164 3 years, 4 months ago\nA is the right answer",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q535",
  "num": 535,
  "question": "Which two tasks must be performed to configure NTP to a trusted server in client mode on a single network device? (Choose two.)",
  "options": [
   "Enable NTP authentication.",
   "Verify the time zone.",
   "Specify the IP address of the NTP server.",
   "Set the NTP server private key.",
   "Disable NTP broadcasts."
  ],
  "correct": "AC",
  "explanation": "To configure authentication, perform this task in privileged mode:\nStep 1: Configure an authentication key pair for NTP and specify whether the key will be trusted or untrusted.\nStep 2: Set the IP address of the NTP server and the public key.\nStep 3: Enable NTP client mode.\nStep 4: Enable NTP authentication.\nStep 5: Verify the NTP configuration.\nReference:\nhttps://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst4000/8-2glx/configuration/guide/ntp.html\n\n\uf147 \uf007 toto74500 Highly Voted \uf164 3 years ago\nStep 1: Configure an authentication key pair for NTP and specify whether the key will be trusted or untrusted.\nStep 2: Set the IP address of the NTP server and the public key.\nStep 3: Enable NTP client mode.\nStep 4: Enable NTP authentication.\nStep 5: Verify the NTP configuration.\nReference: https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst4000/8-2glx/configuration/guide/ntp.html\nNote: A trusted NTP server may or may not require a secret key so it is not a \u201cmust\u201d in this question.\nI think answer is more Enable NTP Authentication + Specify the Ip address of the NTP server",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q536",
  "num": 536,
  "question": "What is the primary purpose of a First Hop Redundancy Protocol?",
  "options": [
   "It allows directly connected neighbors to share configuration information",
   "It reduces routing failures by allowing Layer 3 load balancing between OSPF neighbors that have the same link metric",
   "It allows a router to use bridge priorities to create multiple loop-free paths to a single destination",
   "It reduces routing failures by allowing more than one router to represent itself as the default gateway of a network"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 dicksonpwc Highly Voted \uf164 2 years ago\nD is correct answer.\nExplanation:\nA first hop redundancy protocol (FHRP) is a computer networking protocol which is designed to protect the default gateway used on a subnetwork\nby allowing two or more routers to provide backup for that address; in the event of failure of an active router, the backup router will take over.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q537",
  "num": 537,
  "question": "An engineer is configuring NAT to translate the source subnet of 10.10.0.0/24 to any one of three addresses: 192.168.3.1, 192.168.3.2, or\n192.168.3.3. Which configuration should be used?",
  "options": [
   "enable configure terminal ip nat pool mypool 192.168.3.1 192.168.3.3 prefix-length 30 access-list 1 permit 10.10.0.0 0.0.0.255 ip nat\noutside destination list 1 pool mypool interface g1/1 ip nat inside interface g1/2 ip nat outside",
   "enable configure terminal ip nat pool mypool 192.168.3.1 192.168.3.3 prefix-length 30 access-list 1 permit 10.10.0.0 0.0.0.254 ip nat inside\nsource list 1 pool mypool interface g1/1 ip nat inside interface g1/2 ip nat outside",
   "enable configure terminal ip nat pool mypool 192.168.3.1 192.168.3.3 prefix-length 30 route map permit 10.10.0.0 255.255.255.0 ip nat\noutside destination list 1 pool mypool interface g1/1 ip nat inside interface g1/2 ip nat outside",
   "enable configure terminal ip nat pool mypool 192.168.3.1 192.168.3.3 prefix-length 30 access-list 1 permit 10.10.0.0 0.0.0.255 ip nat inside\nsource list 1 pool mypool interface g1/1 ip nat inside interface g1/2 ip nat outside"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 splashy Highly Voted \uf164 8 months ago\nSelected Answer: D\n\nD is the least incorrect, but still very not correct lol:\nprefix length 30 = 255.255.255.253 = 4-2 hosts = 2 hosts\nIt actually \"works\" in PT but you have the broadcast address in your range which is no bueno.\nPrefix should be /29",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q538",
  "num": 538,
  "question": "When the active router in an HSRP group fails, which router assumes the role and forwards packets?",
  "options": [
   "forwarding",
   "listening",
   "standby",
   "backup"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Cyberops Highly Voted \uf164 1 year, 4 months ago\nSelected Answer: C\n\nHSRP uses Active/stanby\nVRRP uses Master/Backup",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q539",
  "num": 539,
  "question": "What protocol allows an engineer to back up 20 network router configurations globally while using the copy function?",
  "options": [
   "TCP",
   "SMTP",
   "FTP",
   "SNMP"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 klosinskil Highly Voted \uf164 2 years, 11 months ago\nD\nhttps://www.cisco.com/c/en/us/support/docs/ip/simple-network-management-protocol-snmp/15217-copy-configs-snmp.html",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q540",
  "num": 540,
  "question": "Which type of address is the public IP address of a NAT device?",
  "options": [
   "outside global",
   "outside local",
   "inside global",
   "inside local",
   "outside public",
   "inside public"
  ],
  "correct": "C",
  "explanation": "NAT use four types of addresses:\n\u2711 Inside local address - The IP address assigned to a host on the inside network. The address is usually not an IP address assigned by the\nInternet Network\nInformation Center (InterNIC) or service provider. This address is likely to be an RFC 1918 private address.\n\u2711 Inside global address - A legitimate IP address assigned by the InterNIC or service provider that represents one or more inside local IP\naddresses to the outside world.\n\u2711 Outside local address - The IP address of an outside host as it is known to the hosts on the inside network.\n\u2711 Outside global address - The IP address assigned to a host on the outside network. The owner of the host assigns this address.\n\n\uf147 \uf007 DaBest Highly Voted \uf164 1 year, 11 months ago\nc- inside global is the correct answer, the question ask what the address is called after NAT has happened",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q541",
  "num": 541,
  "question": "Which two pieces of information can you determine from the output of the show ntp status command? (Choose two.)",
  "options": [
   "whether the NTP peer is statically configured",
   "the IP address of the peer to which the clock is synchronized",
   "the configured NTP servers",
   "whether the clock is synchronized",
   "the NTP version number of the peer"
  ],
  "correct": "BD",
  "explanation": "Below is the output of the \u202b\u05d2\u202c\u20acshow ntp status\u202b\u05d2\u202c\u20ac command. From this output we learn that R1 has a stratum of 10 and it is getting clock from\n10.1.2.1.\n\n\uf147 \uf007 GangsterDady Highly Voted \uf164 1 year, 10 months ago\nshow ntp associations\nfor configured server",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q542",
  "num": 542,
  "question": "Which keyword in a NAT configuration enables the use of one outside IP address for multiple inside hosts?",
  "options": [
   "source",
   "static",
   "pool",
   "overload"
  ],
  "correct": "D",
  "explanation": "By adding the keyword \u202b\u05d2\u202c\u20acoverload\u202b\u05d2\u202c\u20ac at the end of a NAT statement, NAT becomes PAT (Port Address Translation). This is also a kind of\ndynamic NAT that maps multiple private IP addresses to a single public IP address (many-to-one) by using different ports. Static NAT and\nDynamic NAT both require a one-to-one mapping from the inside local to the inside global address. By using PAT, you can have thousands of\nusers connect to the Internet using only one real global IP address. PAT is the technology that helps us not run out of public IP address on the\nInternet. This is the most popular type of NAT.\nAn example of using \u202b\u05d2\u202c\u20acoverload\u202b\u05d2\u202c\u20ac keyword is shown below:\nR1(config)# ip nat inside source list 1 interface ethernet1 overload\n\n\uf147 \uf007 kaus33k Highly Voted \uf164 1 year, 11 months ago\nOverload is the answer that enables the PAT.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q543",
  "num": 543,
  "question": "Which feature or protocol determines whether the QOS on the network is sufficient to support IP services?",
  "options": [
   "LLDP",
   "CDP",
   "IP SLA",
   "EEM"
  ],
  "correct": "C",
  "explanation": "IP SLA allows an IT professional to collect information about network performance in real time. Therefore it helps determine whether the QoS\non the network is sufficient for IP services or not.\nCisco IOS Embedded Event Manager (EEM) is a powerful and flexible subsystem that provides real-time network event detection and onboard\nautomation. It gives you the ability to adapt the behavior of your network devices to align with your business needs.\n\n\uf147 \uf007 MoHTimo 1 month, 1 week ago\nI don't know why but I hate QoS part the most from all topics",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q544",
  "num": 544,
  "question": "In QoS, which prioritization method is appropriate for interactive voice and video?",
  "options": [
   "traffic policing",
   "round-robin scheduling",
   "low-latency queuing",
   "expedited forwarding"
  ],
  "correct": "C",
  "explanation": "Low Latency Queuing (LLQ) is the preferred queuing policy for VoIP audio. Given the stringent delay/jitter sensitive requirements of voice and\nvideo and the need to synchronize audio and video for CUVA, priority (LLQ) queuing is the recommended for all video traffic as well. Note that,\nfor video, priority bandwidth is generally fudged up by 20% to account for the overhead.\n\n\uf147 \uf007 luciomagi Highly Voted \uf164 2 years, 7 months ago\nanswer should be LLQ Low Latency Queueing",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q546",
  "num": 546,
  "question": "What is the purpose of traffic shaping?",
  "options": [
   "to be a marking mechanism that identifies different flows",
   "to provide fair queuing for buffered flows",
   "to mitigate delays over slow links",
   "to limit the bandwidth that a flow can use"
  ],
  "correct": "D",
  "explanation": "The primary reasons you would use traffic shaping are to control access to available bandwidth, to ensure that traffic conforms to the policies\nestablished for it, and to regulate the flow of traffic in order to avoid congestion that can occur when the sent traffic exceeds the access speed\nof its remote, target interface.\n\n\uf147 \uf007 luciomagi Highly Voted \uf164 2 years, 7 months ago\nanswer should be\nB. to provide fair queuing for buffered flows\ntraffic shaping is not necessarily doing limitation of bandwidth",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q547",
  "num": 547,
  "question": "What is a function of TFTP in network operations?",
  "options": [
   "transfers IOS images from a server to a router for firmware upgrades",
   "transfers a backup configuration file from a server to a switch using a username and password",
   "transfers configuration files from a server to a router on a congested link",
   "transfers files between file systems on a router"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 dontone_ma_piu_pelato Highly Voted \uf164 2 years, 4 months ago\nA is the correct, pelati",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q548",
  "num": 548,
  "question": "What is a DHCP client?",
  "options": [
   "a workstation that requests a domain name associated with its IP address",
   "a host that is configured to request an IP address automatically",
   "a server that dynamically assigns IP addresses to hosts.",
   "a router that statically assigns IP addresses to hosts."
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 Armoonbear Highly Voted \uf164 1 year, 7 months ago\nSelected Answer: B\n\nKeyword is DHCP \"CLIENT\".\nThe \"CLIENT\" (Meaning a computer or device on the network) requests IP address information from the DHCP \"SERVER\"",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q549",
  "num": 549,
  "question": "Where does the configuration reside when a helper address is configured lo support DHCP?",
  "options": [
   "on the router closest to the server",
   "on the router closest to the client",
   "on every router along the path",
   "on the switch trunk interface"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 shakyak Highly Voted \uf164 1 year, 9 months ago\nIt's a helper so closest to the client.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q550",
  "num": 550,
  "question": "What facilitates a Telnet connection between devices by entering the device name?",
  "options": [
   "SNMP",
   "DNS lookup",
   "syslog",
   "NTP"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 Gauain 2 months, 3 weeks ago\nCORRECT",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q551",
  "num": 551,
  "question": "When deploying syslog, which severity level logs informational messages?",
  "options": [
   "0",
   "2",
   "4",
   "6"
  ],
  "correct": "D",
  "explanation": "Reference:\nhttps://en.wikipedia.org/wiki/Syslog\n\n\uf147 \uf007 Suleee Highly Voted \uf164 2 years, 1 month ago\nWay to remember: Emma Always Crying Even When Nobody Is Dying",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q553",
  "num": 553,
  "question": "Which two QoS tools provide congestion management? (Choose two.)",
  "options": [
   "CBWFQ",
   "FRTS",
   "CAR",
   "PBR",
   "PQ"
  ],
  "correct": "AE",
  "explanation": "\uf147 \uf007 BooleanPizza Highly Voted \uf164 2 years ago\nQ at the end = qeueing protocol = congestion management",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q554",
  "num": 554,
  "question": "Which QoS tool is used to optimize voice traffic on a network that is primarily intended for data traffic?",
  "options": [
   "WRED",
   "FIFO",
   "WFQ",
   "PQ"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 gaber Highly Voted \uf164 1 year, 8 months ago\n\"Many popular QoS techniques that serve data traffic very well, such as WFQ and RED, are ineffective for voice applications.\"\n\"FIFO (first-in, first-out). FIFO entails no concept of priority or classes of traffic. With FIFO, transmission of packets out the interface occurs in the\norder the packets arrive\"\nthus D\nhttps://www.cisco.com/c/en/us/td/docs/ios/solutions_docs/qos_solutions/QoSVoIP/QoSVoIP.html\nhttps://www.cisco.com/c/en/us/td/docs/ios/qos/configuration/guide/12_2sr/qos_12_2sr_book/congstion_mgmt_oview.html\nenjoy",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q555",
  "num": 555,
  "question": "An engineer is installing a new wireless printer with a static IP address on the Wi-Fi network. Which feature must be enabled and configured to\nprevent connection issues with the printer?",
  "options": [
   "client exclusion",
   "DHCP address assignment",
   "passive client",
   "static IP tunneling"
  ],
  "correct": "C",
  "explanation": "Passive clients are wireless devices, such as scales and printers that are configured with a static IP address. These clients do not transmit any\nIP information such as IP address, subnet mask, and gateway information when they associate with an access point. As a result, when passive\nclients are used, the controller never knows the IP address unless they use the DHCP.\nReference:\nhttps://www.cisco.com/c/en/us/td/docs/wireless/controller/7-4/configuration/guides/consolidated/b_cg74_CONSOLIDATED/\nm_configuring_passive_clients.html\n\n\uf147 \uf007 raydel92 Highly Voted \uf164 1 year, 9 months ago\nSelected Answer: C\n\nPassive clients are wireless devices, such as scales and printers that are configured with a static IP address. These clients do not transmit any IP\ninformation such as IP address, subnet mask, and gateway information when they associate with an access point. As a result, when passive clients\nare used, the controller never knows the IP address unless they use the DHCP.\nhttps://www.cisco.com/c/en/us/td/docs/wireless/controller/74/configuration/guides/consolidated/b_cg74_CONSOLIDATED/m_configuring_passive_clients.html",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q556",
  "num": 556,
  "question": "When a client and server are not on the same physical network, which device is used to forward requests and replies between client and server for\nDHCP?",
  "options": [
   "DHCPOFFER",
   "DHCP relay agent",
   "DHCP server",
   "DHCPDISCOVER"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 Stonetales987 Highly Voted \uf164 1 year, 10 months ago\nB is correct. A DHCP relay agent is any host that forwards DHCP packets between clients and servers. Relay agents are used to forward requests\nand replies between clients and servers when they are not on the same physical subnet.\nhttps://www.cisco.com/c/en/us/td/docs/ios-xml/ios/ipaddr_dhcp/configuration/15-sy/dhcp-15-sy-book/dhcp-relay-agent.html#GUID-9E11036034EA-40BB-9314-2AFABD7F2FDA",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q557",
  "num": 557,
  "question": "Refer to the exhibit. The ntp server 192.168.0.3 command has been configured on router 1 to make it an NTP client of router 2. Which command\nmust be configured on router 2 so that it operates in server-only mode and relies only on its internal clock?",
  "options": [
   "Router2(config)#ntp server 172.17.0.1",
   "Router2(config)#ntp server 192.168.0.2",
   "Router2(config)#ntp passive",
   "Router2(config)#ntp master 4"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 dave1992 Highly Voted \uf164 1 year, 11 months ago\n\u25a0 ntp master {stratum-level}: NTP server mode\u2014the device acts only as an NTP server, and not as an NTP client. The device gets its time\ninformation from the internal clock on the device.\n\u25a0 ntp server {address | hostname}: NTP client/server mode\u2014the device acts as both client and server. First, it acts as an NTP client, to synchronize\ntime with a server. Once syn- chronized, the device can then act as an NTP server, to supply time to other NTP clients.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q558",
  "num": 558,
  "question": "Which protocol requires authentication to transfer a backup configuration file from a router to a remote server?",
  "options": [
   "FTP",
   "SMTP",
   "TFTP",
   "DTP"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 TechLover 2 months, 4 weeks ago\nCorrect answer is A.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q559",
  "num": 559,
  "question": "Which condition must be met before an NMS handles an SNMP trap from an agent?",
  "options": [
   "The NMS must receive the same trap from two different SNMP agents to verify that it is reliable.",
   "The NMS must receive a trap and an inform message from the SNMP agent within a configured interval.",
   "The NMS software must be loaded with the MIB associated with the trap.",
   "The NMS must be configured on the same router as the SNMP agent."
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Mozah 1 year, 7 months ago\nSelected Answer: C\n\nC is correct",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q560",
  "num": 560,
  "question": "An engineer is configuring switch SW1 to act as an NTP server when all upstream NTP server connectivity fails. Which configuration must be\nused?",
  "options": [
   "SW1# config t SW1(config)#ntp peer 192.168.1.1 SW1(config)#ntp access-group peer accesslist1",
   "SW1# config t SW1(config)#ntp master SW1(config)#ntp server192.168.1.1",
   "SW1# config t SW1(config)#ntp backup SW1(config)#ntp server192.168.1.1",
   "SW1# config t SW1(config)#ntp server192.168.1.1 SW1(config)#ntp access-group peer accesslist1"
  ],
  "correct": "B",
  "explanation": "ntp server192.168.1.1 makes the SW1 a client to the primary server reachable with an IP address of 192.168.1.1\nNTP server makes SW1 a server and uses its own internal clock to provide the time when the connectivity to the primary server 192.168.1.1\nfails.\n\n\uf147 \uf007 zaguy Highly Voted \uf164 2 years ago\nCorrect Answer therefore : B. SW1# config t SW1(config)#ntp master SW1(config)#ntp server192.168.1.1",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q561",
  "num": 561,
  "question": "A network administrator must enable DHCP services between two sites. What must be configured for the router to pass DHCPDISCOVER\nmessages on to the server?",
  "options": [
   "DHCP Binding",
   "a DHCP Relay Agent",
   "DHCP Snooping",
   "a DHCP Pool"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 DARKK 1 year, 3 months ago\nSelected Answer: B\n\nB for sure. \"...for the *router* to pass *DHCPDISCOVER* messages on to the server\"",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q562",
  "num": 562,
  "question": "Which level of severity must be set to get informational syslogs?",
  "options": [
   "alert",
   "critical",
   "notice",
   "debug"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 hp2wx Highly Voted \uf164 1 year, 2 months ago\nEvery good Cisco engineer will need intercourse daily :0",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q563",
  "num": 563,
  "question": "On workstations running Microsoft Windows, which protocol provides the default gateway for the device?",
  "options": [
   "STP",
   "DHCP",
   "SNMP",
   "DNS"
  ],
  "correct": "B",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q564",
  "num": 564,
  "question": "Which two statements about NTP operations are true? (Choose two.)",
  "options": [
   "NTP uses UDP over IP.",
   "Cisco routers can act as both NTP authoritative servers and NTP clients.",
   "Cisco routers can act only as NTP servers.",
   "Cisco routers can act only as NTP clients.",
   "NTP uses TCP over IP."
  ],
  "correct": "AB",
  "explanation": "\uf147 \uf007 kebkim Highly Voted \uf164 1 year, 2 months ago\nNTP use UDP port 123.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q565",
  "num": 565,
  "question": "Refer to the exhibit. Which configuration must be applied to the router that configures PAT to translate all addresses in VLAN 200 while allowing\ndevices on VLAN\n100 to use their own IP addresses?",
  "options": [
   "Router1(config)#access-list 99 permit 192.168.100.32 0.0.0.31 Router1(config)#ip nat inside source list 99 interface gi1/0/0 overload\nRouter1(config)#interface gi2/0/1.200 Router1(config)#ip nat inside Router1(config)#interface gi1/0/0 Router1(config)#ip nat outside",
   "Router1(config)#access-list 99 permit 192.168.100.0 0.0.0.255 Router1(config)#ip nat inside source list 99 interface gi1/0/0 overload\nRouter1(config)#interface gi2/0/1.200 Router1(config)#ip nat inside Router1(config)#interface gi1/0/0 Router1(config)#ip nat outside",
   "Router1(config)#access-list 99 permit 209.165.201.2 255.255.255.255 Router1(config)#ip nat inside source list 99 interface gi1/0/0\noverload Router1(config)#interface gi2/0/1.200 Router1(config)#ip nat inside Router1(config)#interface gi1/0/0 Router1(config)#ip nat\noutside",
   "Router1(config)#access- list 99 permit 209.165.201.2 0.0.0.0 Router1(config)#ip nat inside source list 99 interface gi1/0/0 overload\nRouter1(config)#interface gi2/0/1.200 Router1(config)#ip nat inside Router1(config)#interface gi1/0/0 Router1(config)#ip nat outside"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 AndreMD Highly Voted \uf164 1 year, 1 month ago\njust looking the IP address and subnet mask of the access list, you can find the right answer",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q566",
  "num": 566,
  "question": "Refer to the exhibit. Which two commands must be added to update the configuration of router R1 so that it accepts only encrypted connections?\n(Choose two.)",
  "options": [
   "transport input ssh",
   "username CNAC secret R!41!3705926@",
   "crypto key generate rsa 1024",
   "line vty 0 4",
   "ip ssh version 2"
  ],
  "correct": "CE",
  "explanation": "\uf147 \uf007 splashy Highly Voted \uf164 12 months ago\nSelected Answer: AC\n\nThe default setting on switch/router to accept remote access is telnet.\nCrypto key is not yet generated.\n\"...configuration of router R1 so that it accepts ONLY encrypted connections...\"\nSo A + C",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q567",
  "num": 567,
  "question": "Which command implies the use of SNMPv3?",
  "options": [
   "snmp-server user",
   "snmp-server host",
   "snmp-server enable traps",
   "snmp-server community"
  ],
  "correct": "A",
  "explanation": "Reference:\nhttps://www.cisco.com/c/en/us/td/docs/ios-xml/ios/snmp/configuration/15-e/snmp-15-e-book.pdf\n\n\uf147 \uf007 ptfish Highly Voted \uf164 1 year, 2 months ago\nAdds a new user to an SNMPv3 group and configures a plain\ntext password for the user.\nExample:\nDevice(config)# snmp-server user user1 group1\nv3 auth md5 password123 priv passwd123654",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q568",
  "num": 568,
  "question": "R1 as an NTP server must have:\n\u2711 NTP authentication enabled\n\u2711 NTP packets sourced from Interface loopback 0\n\u2711 NTP stratum 2\n\u2711 NTP packets only permitted to client IP 209.165.200.225\nHow should R1 be configured?",
  "options": [
   "ntp authenticate ntp authentication-key 2 sha1 CISCO123 ntp source Loopback0 ntp access-group server-only 10 ntp master 2 ! access-list\n10 permit udp host 209.165.200.225 any eq 123",
   "ntp authenticate ntp authentication-key 2 md5 CISCO123 ntp interface Loopback0 ntp access-group server-only 10 ntp stratum 2 ! accesslist 10 permit 209.165.200.225",
   "ntp authenticate ntp authentication-key 2 md5 CISCO123 ntp source Loopback0 ntp access-group server-only 10 ntp master 2 ! access-list\n10 permit 209.165.200.225",
   "ntp authenticate ntp authentication-key 2 md5 CISCO123 ntp source Loopback0 ntp access-group server-only 10 ntp stratum 2 ! access-list\n10 permit udp host 209.165.200.225 any eq 123"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 splashy Highly Voted \uf164 1 year, 1 month ago\nC seems correct, its an acl question.\n10 is standard acl number so A and D are wrong cause they are extended acls.\nNTP Master 2 makes the router an ntp server with stratum lvl 2.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q569",
  "num": 569,
  "question": "What is a capability of FTP in network management operations?",
  "options": [
   "offers proprietary support at the session layer when transferring data",
   "uses separate control and data connections to move files between server and client",
   "encrypts data before sending between data resources",
   "devices are directly connected and use UDP to pass file information"
  ],
  "correct": "B",
  "explanation": "Reference:\nhttps://en.wikipedia.org/wiki/File_Transfer_Protocol#:~:text=The%20File%20Transfer%20Protocol%20(FTP,the%20client%20and%20the%20serv\ner\n\n\uf147 \uf007 Liquid_May 3 weeks, 3 days ago\nI know that B is correct. However, C also seems correct since FTP supports encryption. Can someone, explain why is C not correct?",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q570",
  "num": 570,
  "question": "A network engineer is configuring a switch so that it is remotely reachable via SSH. The engineer has already configured the host name on the\nrouter. Which additional command must the engineer configure before entering the command to generate the RSA key?",
  "options": [
   "password password",
   "ip ssh authentication-retries 2",
   "ip domain-name domain",
   "crypto key generate rsa modulus 1024"
  ],
  "correct": "C",
  "explanation": "Reference:\nhttps://www.letsconfig.com/how-to-configure-ssh-on-cisco-ios-devices/\n\n\uf147 \uf007 kyleptt 1 week ago\nDRH - Domain , RSA key and Hostname",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q571",
  "num": 571,
  "question": "Which QoS traffic handling technique retains excess packets in a queue and reschedules these packets for later transmission when the configured\nmaximum bandwidth has been surpassed?",
  "options": [
   "traffic policing",
   "weighted random early detection",
   "traffic prioritization",
   "traffic shaping"
  ],
  "correct": "D",
  "explanation": "Reference:\nhttps://www.cisco.com/c/en/us/support/docs/quality-of-service-qos/qos-policing/19645-policevsshape.html\n\n\uf147 \uf007 Networknovice Highly Voted \uf164 1 year, 4 months ago\nPolicing drops or remarks traffic that exceeds limits, but shaping regulates the traffic back to a defined rate by delaying or queuing the traffic.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q572",
  "num": 572,
  "question": "Which command must be entered to configure a DHCP relay?",
  "options": [
   "ip dhcp relay",
   "ip dhcp pool",
   "ip address dhcp",
   "ip helper-address"
  ],
  "correct": "D",
  "explanation": "Reference:\nhttps://www.cisco.com/en/US/docs/ios/12_4t/ip_addr/configuration/guide/htdhcpre.html#:~:text=ip%20helper%2Daddress%20address,Example%\n3A&text=Forwards%20UPD%20broadcasts%2C%20including%20BOOTP%20and%20DHCP.&text=The%20address%20argument%20can%20be,to%\n20respond\n%20to%20DHCP%20requests\n\n\uf147 \uf007 Yannik123 5 months, 1 week ago\nSelected Answer: D\n\nThe DHCP relay agent is an IP Helper address on a Cisco device",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q573",
  "num": 573,
  "question": "Refer to the exhibit. The DHCP server and clients are connected to the same switch. What is the next step to complete the DHCP configuration to\nallow clients on\nVLAN 1 to receive addresses from the DHCP server?",
  "options": [
   "Configure the ip dhcp snooping trust command on the interface that is connected to the DHCP client.",
   "Configure ip dhcp relay information option command on the interface that is connected to the DHCP server.",
   "Configure ip dhcp snooping trust command on the interface that is connected to the DHCP server.",
   "Configure the ip dhcp information option command on the interface that is connected to the DHCP client."
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 RougePotatoe Highly Voted \uf164 10 months, 3 weeks ago\nSelected Answer: C\n\nIf a Layer 2 LAN port is connected to a DHCP server, configure the port as trusted by entering the ip dhcp snooping trust interface configuration\ncommand.\nhttps://www.cisco.com/en/US/docs/general/Test/dwerblo/broken_guide/snoodhcp.html#wp1073367",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q574",
  "num": 574,
  "question": "A network analyst is tasked with configuring the date and time on a router using EXEC mode. The date must be set to January 1, 2020 and the\ntime must be set to\n12:00 am. Which command should be used?",
  "options": [
   "clock timezone",
   "clock summer-time date",
   "clock summer-time recurring",
   "clock set"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 RODCCN 2 months, 1 week ago\nSelected Answer: D\n\nhttps://www.cisco.com/c/en/us/support/docs/smb/switches/cisco-small-business-300-series-managed-switches/smb5584-configure-system-timesettings-on-a-switch-through-the-comma.html",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q576",
  "num": 576,
  "question": "Which command creates a static NAT binding for a PC address of 10.1.1.1 to the public routable address 209.165.200.225 assigned to the PC?",
  "options": [
   "R1(config)#ip nat inside source static 10.1.1.1 209.165.200.225",
   "R1(config)#ip nat outside source static 209.165.200.225 10.1.1.1",
   "R1(config)#ip nat inside source static 209.165.200.225 10.1.1.1",
   "R1(config)#ip nat outside source static 10.1.1.1 209.165.200.225"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 [Removed] 2 months, 1 week ago\nSelected Answer: A\n\nGiven answer is correct\nA. R1(config)#ip nat inside source static 10.1.1.1 209.165.200.225",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q577",
  "num": 577,
  "question": "What prevents a workstation from receiving a DHCP address?",
  "options": [
   "STP",
   "VTP",
   "802.1Q",
   "DTP"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Ghugs Highly Voted \uf164 11 months, 2 weeks ago\nI think its STP, specifically portfast. I found this one the cisco white pages, under the DHCP troubleshooting section.\n\"...verify that the port has STP portfast enabled and trunking/channeling disabled. The default configuration is STP portfast disabled and\ntrunking/channeling auto, if applicable. For the 2900XL/3500XL/2950/3550 switches, STP portfast is the only required configuration. These\nconfiguration changes resolve the most common DHCP client issues that occur with an initial installation of a Catalyst switch.\"\nfrom https://www.cisco.com/c/en/us/support/docs/ip/dynamic-address-allocation-resolution/27470-100.html#anc72",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q578",
  "num": 578,
  "question": "What is a feature of TFTP?",
  "options": [
   "offers anonymous user login ability",
   "uses two separate connections for control and data traffic",
   "relies on the well-known TCP port 20 to transmit data",
   "provides secure data transfer"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 nicombe Highly Voted \uf164 11 months, 4 weeks ago\nB: TFTP uses Port 69...heh\nC: FTP uses TCP Ports 20 & 21\nD: Neither FTP nor TFTP provide secure data transfer on their own\nA: TFTP does not support authentication. Maybe no login ability at all offers anonymity..?",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q579",
  "num": 579,
  "question": "Which QoS forwarding per-hop behavior changes a specific value in a packet header to set the class of service for the packet?",
  "options": [
   "shaping",
   "classification",
   "policing",
   "marking"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 YetiPatty 2 months, 3 weeks ago\nSelected Answer: D\n\nforgot to attach my vote lol",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q580",
  "num": 580,
  "question": "Refer to the exhibit. How should the configuration be updated to allow PC1 and PC2 access to the Internet?",
  "options": [
   "Modify the configured number of the second access list",
   "Change the ip nat inside source command to use interface GigabitEthernet0/0",
   "Remove the overload keyword from the ip nat inside source command",
   "Add either the ip nat {inside|outside} command under both interfaces"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 j1mlawton Highly Voted \uf164 7 months, 1 week ago\nSelected Answer: B\n\nWhy is it not B?",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q581",
  "num": 581,
  "question": "What is the purpose of the ip address dhcp command?",
  "options": [
   "to configure an interface as a DHCP relay",
   "to configure an interface as a DHCP client",
   "to configure an interface as a DHCP helper",
   "to configure an interface as a DHCP server"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 Goh0503 11 months, 1 week ago\nAnswer B\nThis command enables the DHCP client on the interface and removes all manually-configured addresses on the interface.\nhttps://www.cisco.com/c/en/us/td/docs/routers/nfvis/switch_command/b-nfvis-switch-command-reference/ip_addressing_commands.pdf",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q582",
  "num": 582,
  "question": "Refer to the exhibit. Which configuration enables DHCP addressing for hosts connected to interface FastEthernet0/1 on router R4?",
  "options": [
   "interface FastEthernet0/1 ip helper-address 10.0.1.1 ! access-list 100 permit tcp host 10.0.1.1 eq 67 host 10.148.2.1",
   "interface FastEthernet0/0 ip helper-address 10.0.1.1 ! access-list 100 permit udp host 10.0.1.1 eq bootps host 10.148.2.1",
   "interface FastEthernet0/0 ip helper-address 10.0.1.1 ! access-list 100 permit host 10.0.1.1 host 10.148.2.1 eq bootps",
   "interface FastEthernet0/1 ip helper-address 10.0.1.1 ! access-list 100 permit udp host 10.0.1.1 eq bootps host 10.148.2.1"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 rijstraket Highly Voted \uf164 9 months, 1 week ago\nSelected Answer: D\n\nB and C configure fa0/0, so those are incorrect. Bootps uses UDP so A is also incorrect. D is correct, but the answer has a flaw: As they use a non\nrearrangeable ACL the ACE would be added at the bottom, below the deny rule (rendering the newly added rule useless).",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q584",
  "num": 584,
  "question": "An engineer is configuring SSH version 2 exclusively on the R1 router. What is the minimum configuration required to permit remote management\nusing the cryptographic protocol?",
  "options": [
   "hostname R1 service password-encryption crypto key generate rsa general-keys modulus 1024 username cisco privilege 15 password 0\ncisco123 ip ssh version 2 line vty 0 15 transport input ssh login local",
   "hostname R1 ip domain name cisco crypto key generate rsa general-keys modulus 1024 username cisco privilege 15 password 0 cisco123\nip ssh version 2 line vty 0 15 transport input ssh login local",
   "hostname R1 crypto key generate rsa general-keys modulus 1024 username cisco privilege 15 password 0 cisco123 ip ssh version 2 line vty\n0 15 transport input ssh login local",
   "hostname R1 ip domain name cisco crypto key generate rsa general-keys modulus 1024 username cisco privilege 15 password 0 cisco123\nip ssh version 2 line vty 0 15 transport input all login local"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 SVN05 Highly Voted \uf164 7 months, 1 week ago\nSelected Answer: B\n\nSo before generating a RSA key, always remember you'll need a hostname and ip domain name. Then only you can create a RSA key(yes password\nisn't a requirement initally) which leaves us with answer B and answer D.\nMoving on, the question asks to permit remote management(vty lines basically) using a cryptographic protocol thus we don't want to allow anyone\nin right? so we set a boundary to only allow what we want and that is SSH(cause by default telnet is included if we use transport input all) so that\nleaves us with answer B.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q585",
  "num": 585,
  "question": "Which per-hop traffic-control feature does an ISP implement to mitigate the potential negative effects of a customer exceeding its committed\nbandwidth?",
  "options": [
   "policing",
   "queuing",
   "marking",
   "shaping"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Dutch012 Highly Voted \uf164 6 months, 3 weeks ago\nSelected Answer: A\n\nRemember that\nThe customer Router does the shaping (cares and saves your traffic in a queue if you surpass the configured rate), but ISP Router does the policing\n(it drops your packets and doesn't care or save your traffic in a queue if you surpass the configured rate )",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q587",
  "num": 587,
  "question": "Which remote access protocol provides unsecured remote CLI access?",
  "options": [
   "console",
   "Telnet",
   "SSH",
   "Bash"
  ],
  "correct": "B",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q589",
  "num": 589,
  "question": "Refer to the exhibit. Which router or router group are NTP clients?",
  "options": [
   "R1",
   "R2 and R3",
   "R1, R3, and R4",
   "R1, R2, and R3"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 RougePotatoe Highly Voted \uf164 10 months, 3 weeks ago\nSelected Answer: D\n\nPretty sure you have to have the NTP server configured before you can be a client",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q590",
  "num": 590,
  "question": "Refer to the exhibit. What is the next step to complete the implementation for the partial NAT configuration shown?",
  "options": [
   "Modify the access list for the internal network on e0/1.",
   "Reconfigure the static NAT entries that overlap the NAT pool.",
   "Apply the ACL to the pool configuration.",
   "Configure the NAT outside interface."
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 splashy Highly Voted \uf164 12 months ago\nSelected Answer: D\n\nThere are no static entries?\nThere also is no outside interface defined?\nSo D",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q591",
  "num": 591,
  "question": "What is a syslog facility?",
  "options": [
   "host that is configured for the system to send log messages",
   "password that authenticates a Network Management System to receive log messages",
   "group of log messages associated with the configured severity level",
   "set of values that represent the processes that can generate a log message"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 RougePotatoe Highly Voted \uf164 10 months ago\nSelected Answer: D\n\nThe Facility value is a way of determining which process of the machine created the message.\nhttps://success.trendmicro.com/solution/TP000086250-What-are-Syslog-Facilities-and-Levels",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q593",
  "num": 593,
  "question": "Refer to the exhibit. A newly configured PC fails to connect to the internet by using TCP port 80 to www.cisco.com. Which setting must be\nmodified for the connection to work?",
  "options": [
   "Subnet Mask",
   "DNS Servers",
   "Default Gateway",
   "DHCP Servers"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 StingVN 3 months, 4 weeks ago\nSelected Answer: B\n\nconnect internet. of course it should be DNS server. easy peasy.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q594",
  "num": 594,
  "question": "Which QoS queuing method discards or marks packets that exceed the desired bit rate of traffic flow?",
  "options": [
   "CBWFQ",
   "policing",
   "LLQ",
   "shaping"
  ],
  "correct": "B",
  "explanation": "Use the police command to mark a packet with different quality of service (QoS) values based on conformance to the service-level agreement.\nTraffic policing allows you to control the maximum rate of traffic transmitted or received on an interface.\nReference:\nhttps://www.cisco.com/c/en/us/td/docs/ios/qos/configuration/guide/12_2sr/qos_12_2sr_book/traffic_policing.html\n\n\uf147 \uf007 KoreaSpurs 11 months ago\nsome websites said the answer is LLQ. I think the answer should be policing, but 'which queueing method' made me confused jeez",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q595",
  "num": 595,
  "question": "Which QoS per-hop behavior changes the value of the ToS field in the IPv4 packet header?",
  "options": [
   "Shaping",
   "Policing",
   "Classification",
   "Marking"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 supervictor 1 month, 2 weeks ago\nD. Marking\nThe other options, shaping, policing, and classification, do not directly change the ToS field in the IPv4 packet header.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q596",
  "num": 596,
  "question": "What is the function of FTP?",
  "options": [
   "Always operated without user connection validation",
   "Uses block number to identify and mitigate data-transfer errors",
   "Relies on the well-known UDO port 69 for data transfer",
   "Uses two separate connections for control and data traffic"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 [Removed] 2 months, 1 week ago\nSelected Answer: D\n\nD. Uses two separate connections for control and data traffic\nPorts 20 and 21",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q597",
  "num": 597,
  "question": "How does TFTP operate in a network?",
  "options": [
   "Provides secure data transfer",
   "Relies on the well-known TCP port 20 to transmit data",
   "Uses block numbers to identify and mitigate data-transfer errors",
   "Requires two separate connections for control and data traffic"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 RougePotatoe Highly Voted \uf164 10 months, 3 weeks ago\nSelected Answer: C\n\nSeems correct as a,b,d makes no sense.\nBlock Number : The Block Number field on Data Packets starts with one and then increase sequentially by one for each new packets. This type of\nnumbering allows TFTP applications to identify between new DATA packets and duplicates.\nhttps://www.omnisecu.com/tcpip/tftp-datapacket.php#:~:text=Block%20Number%20%3A%20The%20Block%20Number,from%200%20to%20512%20bytes.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q598",
  "num": 598,
  "question": "Refer to the exhibit. Which plan must be implemented to ensure optimal QoS marking practices on this network?",
  "options": [
   "Trust the IP phone markings on SW1 and mark traffic entering SW2 at SW2",
   "As traffic traverses MLS1 remark the traffic, but trust all markings at the access layer",
   "Remark traffic as it traverses R1 and trust all markings at the access layer.",
   "As traffic enters from the access layer on SW1 and SW2, trust all traffic markings."
  ],
  "correct": "A",
  "explanation": "Tell the switch to trust CoS markings from a Cisco IP phone on the access port. Cisco IP phones use 802.1q tags, these .1q tags contain the\nCoS value, to mark voice traffic at layer 2. When it's forwarded upstream, the DSCP value is trusted (on the uplink port) and unchanged, but the\n.1q tag (and with it the CoS value) is stripped off by the upstream switch when received over the trunk.\n\n\uf147 \uf007 no_blink404 3 months, 1 week ago\nI am pretty sure all/most of the traffic marking should be done on the lower layers ie access layer. Answer A seems correct.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q599",
  "num": 599,
  "question": "How does QoS optimize voice traffic?",
  "options": [
   "by reducing bandwidth usage",
   "by reducing packet loss",
   "by differentiating voice and video traffic",
   "by increasing jitter"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 RougePotatoe Highly Voted \uf164 10 months, 3 weeks ago\nSelected Answer: B\n\nKey guidelines are\nDelay one way: 150ms or less\nJitter: 30ms or less\nLoss: 1% or less\nFrom the official cert guide vol 2 Ch11.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q600",
  "num": 600,
  "question": "Which QoS tool can you use to optimize voice traffic on a network that is primarily intended for data traffic?",
  "options": [
   "WRED",
   "FIFO",
   "PQ",
   "WFQ"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Phonon 8 months, 1 week ago\nSelected Answer: C\n\nC)Priority Queuing (PQ).\nPQ allows you to assign a higher priority to voice traffic, which ensures that voice packets are transmitted before data packets. This helps to\nminimize delays and jitter in the transmission of voice traffic, which can improve the overall quality of the call. Other QoS tools, such as Weighted\nFair Queuing (WFQ) and Weighted Random Early Detection (WRED), can also be used to optimize voice traffic, but PQ is generally the most\neffective option for this purpose.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q601",
  "num": 601,
  "question": "Refer to the exhibit. Users on existing VLAN 100 can reach sites on the Internet. Which action must the administrator take to establish\nconnectivity to the Internet for users in VLAN 200?",
  "options": [
   "Define a NAT pool on the router.",
   "Configure the ip nat outside command on another interface for VLAN 200",
   "Configure static NAT translations for VLAN 200.",
   "Update the NAT_INSIDE_RANGES ACL."
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 RougePotatoe Highly Voted \uf164 10 months, 2 weeks ago\nSelected Answer: D\n\nD is correct answer because of the following command: \"ip nat inside source list NAT_INSIDE_RANGES interfaces G0/0 Overload\".\nThis command essentially tells the router all ip addresses specified from the access list \"NAT_INSIDE_RANGES\" will be translated via port address\ntranslation (PAT) using the ip address of G0/0.\nBy reconfiguring the ACL to include the 200 vlan it will provide the easiest way to get VLAN 200 access to the internet.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q602",
  "num": 602,
  "question": "An organization secures its network with multi-factor authentication using an authenticator app on employee smartphones. How is the application\nsecured in the case of a user's smartphone being lost or stolen?",
  "options": [
   "The application requires the user to enter a PIN before it provides the second factor",
   "The application requires an administrator password to reactivate after a configured interval",
   "The application verifies that the user is in a specific location before it provides the second factor",
   "The application challenges a user by requiring an administrator password to reactivate when the smartphone is rebooted"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 cormorant Highly Voted \uf164 10 months, 2 weeks ago\nsomething i know- PIN\nsomething i have - the mobile",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q603",
  "num": 603,
  "question": "Which device performs stateful inspection of traffic?",
  "options": [
   "switch",
   "firewall",
   "access point",
   "wireless controller"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 dicksonpwc Highly Voted \uf164 2 years ago\nB is correct.\nExplanation:\nStateful inspection, also known as dynamic packet filtering, is a firewall technology that monitors the state of active connections and uses this\ninformation to determine which network packets to allow through the firewall.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q604",
  "num": 604,
  "question": "A network administrator enabled port security on a switch interface connected to a printer. What is the next configuration action in order to allow\nthe port to learn the MAC address of the printer and insert it into the table automatically?",
  "options": [
   "enable dynamic MAC address learning",
   "implement static MAC addressing",
   "enable sticky MAC addressing",
   "implement auto MAC address learning"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 sinear Highly Voted \uf164 2 years, 8 months ago\nActually, why couldn't it be B as well ? The mac address does not need to be sticky, it can also be just \"dynamic\". Sticky adds the learned mac into\nthe running config, what simple dynamic doesn't, but that doesn't prevent the mac to be learned too if it was just \"dynamic\".\nEdit: I think the reason is that we don't have to \"enable\" dynamic. It is automatically enabled when do run switchport port-security.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q605",
  "num": 605,
  "question": "Refer to the exhibit. An engineer booted a new switch and applied this configuration via the console port. Which additional configuration must be\napplied to allow administrators to authenticate directly to enable privilege mode via Telnet using a local username and password?",
  "options": [
   "R1(config)#username admin R1(config-if)#line vty 0 4 R1(config-line)#password p@ss1234 R1(config-line)#transport input telnet",
   "R1(config)#username admin privilege 15 secret p@ss1234 R1(config-if)#line vty 0 4 R1(config-line)#login local",
   "R1(config)#username admin secret p@ss1234 R1(config-if)#line vty 0 4 R1(config-line)#login local R1(config)#enable secret p@ss1234",
   "R1(config)#username admin R1(config-if)#line vty 0 4 R1(config-line)#password p@ss1234"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 TheLorenz Highly Voted \uf164 1 year, 6 months ago\nAnswer is C. You need to configure enable secret command in order to connect to telnet",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q606",
  "num": 606,
  "question": "Which effect does the aaa new-model configuration command have?",
  "options": [
   "It enables AAA services on the device.",
   "It configures the device to connect to a RADIUS server for AAA.",
   "It associates a RADIUS server to the group.",
   "It configures a local user on the device."
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Samuelpn96 Highly Voted \uf164 2 years ago\nEnabling AAA\nTo enable AAA, you need to configure the aaa new-model command in global configuration.\nhttps://www.cisco.com/c/en/us/support/docs/security-vpn/terminal-access-controller-access-control-system-tacacs-/10384-security.html",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q607",
  "num": 607,
  "question": "Refer to the exhibit. Which two events occur on the interface, if packets from an unknown Source address arrive after the interface learns the\nmaximum number of secure MAC address? (Choose two.)",
  "options": [
   "The security violation counter dose not increment",
   "The port LED turns off",
   "The interface is error-disabled",
   "A syslog message is generated",
   "The interface drops traffic from unknown MAC address"
  ],
  "correct": "AE",
  "explanation": "\uf147 \uf007 BooleanPizza Highly Voted \uf164 2 years ago\nprotect\u2014Drops packets with unknown source addresses until you remove a sufficient number of secure MAC addresses to drop below the\nmaximum value.\nrestrict\u2014Drops packets with unknown source addresses until you remove a sufficient number of secure MAC addresses to drop below the\nmaximum value and causes the SecurityViolation counter to increment.\nshutdown\u2014Puts the interface into the error-disabled state immediately and sends an SNMP trap notification.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q608",
  "num": 608,
  "question": "Which technology must be implemented to configure network device monitoring with the highest security?",
  "options": [
   "IP SLA",
   "syslog",
   "NetFlow",
   "SNMPv3"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 martco Highly Voted \uf164 2 years, 7 months ago\n\"..device monitoring....highest security\"\nNetflow although related to security generally is just a data collection protocol whereas the whole point of SNMPv3 is that it's hardened\nanswer here should be D",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q609",
  "num": 609,
  "question": "Refer to the exhibit. Which two statements about the interface that generated the output are true? (Choose two.)",
  "options": [
   "learned MAC addresses are deleted after five minutes of inactivity",
   "the interface is error-disabled if packets arrive from a new unknown source address",
   "it has dynamically learned two secure MAC addresses",
   "it has dynamically learned three secure MAC addresses",
   "the security violation counter increments if packets arrive from a new unknown source address"
  ],
  "correct": "AC",
  "explanation": "\uf147 \uf007 Chupacabro Highly Voted \uf164 1 year, 8 months ago\nB - wrong. only shuts int when violation mode is \"shutdown\"\nD - wrong. dynamically learned only 2 MACADD using sticky command\nE - wrong. only increments on \"restrict\" and \"shutdown\" violation mode\nAnswer - A, C",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q610",
  "num": 610,
  "question": "Refer to the exhibit. Which statement about the interface that generated the output is true?",
  "options": [
   "A syslog message is generated when a violation occurs.",
   "One secure MAC address is manually configured on the interface.",
   "One secure MAC address is dynamically learned on the interface.",
   "Five secure MAC addresses are dynamically learned on the interface."
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 C3L4H1R Highly Voted \uf164 2 years, 5 months ago\nA is incorrect, it does not send syslog message, read this:\nhttp://cisco.num.edu.mn/CCNA_R&S2/course/module2/2.2.4.4/2.2.4.4.html",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q611",
  "num": 611,
  "question": "Refer to the exhibit. What is the effect of this configuration?",
  "options": [
   "The switch port remains administratively down until the interface is connected to another switch.",
   "Dynamic ARP Inspection is disabled because the ARP ACL is missing.",
   "The switch port interface trust state becomes untrusted.",
   "The switch port remains down until it is configured to trust or untrust incoming packets."
  ],
  "correct": "C",
  "explanation": "Dynamic ARP inspection (DAI) is a security feature that validates ARP packets in a network. It intercepts, logs, and discards ARP packets with\ninvalid IP-to-MAC address bindings. This capability protects the network from certain man-in-the-middle attacks. After enabling DAI, all ports\nbecome untrusted ports.\n\n\uf147 \uf007 Ebenezer Highly Voted \uf164 2 years, 11 months ago\nAfter Dynamic ARP Inspection is applied, by default the interface becomes untrusted.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q612",
  "num": 612,
  "question": "What is the difference between AAA authentication and authorization?",
  "options": [
   "Authentication identifies and verifies a user who is attempting to access a system, and authorization controls the tasks the user performs.",
   "Authentication controls the system processes a user accesses, and authorization logs the activities the user initiates.",
   "Authentication verifies a username and password, and authorization handles the communication between the authentication agent and the\nuser database.",
   "Authentication identifies a user who is attempting to access a system, and authorization validates the user's password."
  ],
  "correct": "A",
  "explanation": "AAA stands for Authentication, Authorization and Accounting.\n\u2711 Authentication: Specify who you are (usually via login username & password)\n\u2711 Authorization: Specify what actions you can do, what resource you can access\n\u2711 Accounting: Monitor what you do, how long you do it (can be used for billing and auditing)\nAn example of AAA is shown below:\n\u2711 Authentication: \u202b\u05d2\u202c\u20acI am a normal user. My username/password is user_tom/learnforever\u202b\u05d2\u202c\u20ac\n\u2711 Authorization: \u202b\u05d2\u202c\u20acuser_tom can access LearnCCNA server via HTTP and FTP\u202b\u05d2\u202c\u20ac\n\u2711 Accounting: \u202b\u05d2\u202c\u20acuser_tom accessed LearnCCNA server for 2 hours\u202b\u05d2\u202c\u20ac. This user only uses \u202b\u05d2\u202c\u20acshow\u202b\u05d2\u202c\u20ac commands.\n\n\uf147 \uf007 dave1992 Highly Voted \uf164 1 year, 11 months ago\nAuthentication =who?\nAuthorization= what are they allowed to do?\nAccount= what did they do ?",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q613",
  "num": 613,
  "question": "When configuring a WLAN with WPA2 PSK in the Cisco Wireless LAN Controller GUI, which two formats are available to select? (Choose two.)",
  "options": [
   "decimal",
   "ASCII",
   "hexadecimal",
   "binary",
   "base64"
  ],
  "correct": "BC",
  "explanation": "Reference:\nhttps://www.cisco.com/c/en/us/td/docs/wireless/controller/9800/config-guide/b_wl_16_10_cg/multi-preshared-key.pdf\n\n\uf147 \uf007 SanchezEldorado Highly Voted \uf164 3 years, 2 months ago\nThe reference link in the answer doesn't go anywhere. Here's the correct link:\nhttps://www.cisco.com/c/en/us/td/docs/wireless/controller/8-2/config-guide/b_cg82/b_cg82_chapter_01010011.pdf",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q615",
  "num": 615,
  "question": "An engineer is asked to protect unused ports that are configured in the default VLAN on a switch. Which two steps will fulfill the request? (Choose\ntwo.)",
  "options": [
   "Configure the ports as trunk ports.",
   "Enable the Cisco Discovery Protocol.",
   "Configure the port type as access and place in VLAN 99.",
   "Administratively shut down the ports.",
   "Configure the ports in an EtherChannel."
  ],
  "correct": "CD",
  "explanation": "\uf147 \uf007 ZayaB Highly Voted \uf164 2 years, 6 months ago\nThe answer is trying to say is that put the ports into access vlan so that it does not get dtp traffic and put it under an unused vlan that is not in the\nnetwork, for this example is 99...this is the best practice. Answers C & D is correct.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q616",
  "num": 616,
  "question": "An email user has been lured into clicking a link in an email sent by their company's security organization. The webpage that opens reports that it\nwas safe, but the link may have contained malicious code.\nWhich type of security program is in place?",
  "options": [
   "user awareness",
   "brute force attack",
   "physical access control",
   "social engineering attack"
  ],
  "correct": "A",
  "explanation": "This is a training program which simulates an attack, not a real attack (as it says \u202b\u05d2\u202c\u20acThe webpage that opens reports that it was safe\u202b\u05d2\u202c\u20ac) so we\nbelieved it should be called a \u202b\u05d2\u202c\u20acuser awareness\u202b\u05d2\u202c\u20ac program. Therefore the best answer here should be \u202b\u05d2\u202c\u20acuser awareness\u202b\u05d2\u202c\u20ac. This is the\ndefinition of \u202b\u05d2\u202c\u20acUser awareness\u202b\u05d2\u202c\u20ac from CCNA 200-301\nOffical Cert Guide Book:\n\u202b\u05d2\u202c\u20acUser awareness: All users should be made aware of the need for data confidentiality to protect corporate information, as well as their own\ncredentials and personal information. They should also be made aware of potential threats, schemes to mislead, and proper procedures to\nreport security incidents. \u202b\u05d2\u202c\u20ac\nNote: Physical access control means infrastructure locations, such as network closets and data centers, should remain securely locked.\n\n\uf147 \uf007 Daimen Highly Voted \uf164 3 years, 3 months ago\nThe correct answer is A.\nD is a type of attack not a program",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q618",
  "num": 618,
  "question": "Which feature on the Cisco Wireless LAN Controller when enabled restricts management access from specific networks?",
  "options": [
   "TACACS",
   "CPU ACL",
   "Flex ACL",
   "RADIUS"
  ],
  "correct": "B",
  "explanation": "Whenever you want to control which devices can talk to the main CPU, a CPU ACL is used.\nNote: CPU ACLs only filter traffic towards the CPU, and not any traffic exiting or generated by the CPU.\nReference:\nhttps://www.cisco.com/c/en/us/support/docs/wireless/4400-series-wireless-lan-controllers/109669-secure-wlc.html\n\n\uf147 \uf007 reagan_donald Highly Voted \uf164 1 year, 9 months ago\nI don't remember if this was even explained in Wendell Odom? But i a sure i have not met this topic on Netacad......",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q619",
  "num": 619,
  "question": "Which set of actions satisfy the requirement for multifactor authentication?",
  "options": [
   "The user enters a user name and password, and then re-enters the credentials on a second screen.",
   "The user swipes a key fob, then clicks through an email link.",
   "The user enters a user name and password, and then clicks a notification in an authentication app on a mobile device.",
   "The user enters a PIN into an RSA token, and then enters the displayed RSA key on a login screen."
  ],
  "correct": "C",
  "explanation": "This is an example of how two-factor authentication (2FA) works:\n1. The user logs in to the website or service with their username and password.\n2. The password is validated by an authentication server and, if correct, the user becomes eligible for the second factor.\n3. The authentication server sends a unique code to the user's second-factor method (such as a smartphone app).\n4. The user confirms their identity by providing the additional authentication for their second-factor method.\n\n\uf147 \uf007 welju Highly Voted \uf164 3 years, 2 months ago\nmulti factor can be 2 of the 3\n1. something you know - password, pin\n2. something you have - card, badge\n3. something you are - retina, voice, facial recognition",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q620",
  "num": 620,
  "question": "Which configuration is needed to generate an RSA key for SSH on a router?",
  "options": [
   "Configure VTY access.",
   "Configure the version of SSH.",
   "Assign a DNS domain name.",
   "Create a user with a password."
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 alexiro Highly Voted \uf164 3 years, 1 month ago\ntwo conditions must be met before SSH can operate normally on a Cisco IOS switch\nThe Cisco IOS image used must be a k9(crypto) image in order to support SSH. \"\"!--- Step 2: Configure the DNS domain of the router.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q621",
  "num": 621,
  "question": "Refer to the exhibit. An extended ACL has been configured and applied to router R2. The configuration failed to work as intended.\nWhich two changes stop outbound traffic on TCP ports 25 and 80 to 10.0.20.0/26 from the 10.0.10.0/26 subnet while still allowing all other\ntraffic? (Choose two.)",
  "options": [
   "Add a \u202b\u05d2\u202c\u20acpermit ip any any\u202b\u05d2\u202c\u20ac statement at the end of ACL 101 for allowed traffic.",
   "Add a \u202b\u05d2\u202c\u20acpermit ip any any\u202b\u05d2\u202c\u20ac statement to the beginning of ACL 101 for allowed traffic.",
   "The ACL must be moved to the Gi0/1 interface outbound on R2.",
   "The source and destination IPs must be swapped in ACL 101.",
   "The ACL must be configured the Gi0/2 interface inbound on R1."
  ],
  "correct": "AD",
  "explanation": "\uf147 \uf007 sinear Highly Voted \uf164 2 years, 8 months ago\nEdit: forget, answer is OK. I misread.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q622",
  "num": 622,
  "question": "An engineer must configure a WLAN using the strongest encryption type for WPA2-PSK. Which cipher fulfills the configuration requirement?",
  "options": [
   "WEP",
   "AES",
   "RC4",
   "TKIP"
  ],
  "correct": "B",
  "explanation": "Many routers provide WPA2-PSK (TKIP), WPA2-PSK (AES), and WPA2-PSK (TKIP/AES) as options. TKIP is actually an older encryption protocol\nintroduced with\nWPA to replace the very-insecure WEP encryption at the time. TKIP is actually quite similar to WEP encryption. TKIP is no longer considered\nsecure, and is now deprecated. In other words, you shouldn't be using it.\nAES is a more secure encryption protocol introduced with WPA2 and it is currently the strongest encryption type for WPA2-PSK/.\n\n\uf147 \uf007 cormorant 11 months, 1 week ago\nAES (key length:128, 192, 256 bytes. block> 128 bytes) is for WPA2\nRC4 is for wep",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q624",
  "num": 624,
  "question": "Refer to the exhibit. Which configuration for RTR-1 denies SSH access from PC-1 to any RTR-1 interface and allows all other traffic?",
  "options": [
   "B.",
   "C.",
   "D.",
   ""
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 nakres64 Highly Voted \uf164 2 years, 7 months ago\naccess-group [in|out] is used to tie an access-list to an interface.\naccess-class [in|out] is used to tie an access-list to vty lines.\nSo in case you want to prevent incoming network traffic on port 80 through Ethernet 0/0 you use\nint E0/0\nip access-group 123 in\n\nTopic 1\n\n\fIn case you want to allow only your PC from accessing the VTY via telnet/SSH use\nline vty 0 4\nip access-class 1 in",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q625",
  "num": 625,
  "question": "While examining excessive traffic on the network, it is noted that all incoming packets on an interface appear to be allowed even though an IPv4\nACL is applied to the interface. Which two misconfigurations cause this behavior? (Choose two.)",
  "options": [
   "The ACL is empty",
   "A matching permit statement is too broadly defined",
   "The packets fail to match any permit statement",
   "A matching deny statement is too high in the access list",
   "A matching permit statement is too high in the access list"
  ],
  "correct": "BE",
  "explanation": "Traffic might be permitted if the permit statement is too braid, meaning that you are allowing more traffic than what is specifically needed, or if\nthe matching permit statement is placed ahead of the deny traffic. Routers will look at traffic and compare it to the ACL and once a match is\nfound, the router acts accordingly to that rule.\n\n\uf147 \uf007 kijken Highly Voted \uf164 1 year, 7 months ago\nNOT A:\nI see alot say A, but A has a hidden deny any on the end of the list as has every access list.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q626",
  "num": 626,
  "question": "The service password-encryption command is entered on a router. What is the effect of this configuration?",
  "options": [
   "restricts unauthorized users from viewing clear-text passwords in the running configuration",
   "prevents network administrators from configuring clear-text passwords",
   "protects the VLAN database from unauthorized PC connections on the switch",
   "encrypts the password exchange when a VPN tunnel is established"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 dropspablo 3 weeks, 2 days ago\nAnswer A is correct.\nFrom what I understand, the letter \"B\" seems right, but it is \"wrong\", because even using the \"service password-encryption\" command, the \"enable\npassword\" or \"username password\" settings are configured in \"clear text\", but only in shown in the running-config with an encryption weak (type\n7).\nThe main purpose of the \"service password-encryption\" command is to prevent passwords from being displayed in plain text in the device\nconfiguration, protecting them from casual viewing (by an unauthorized user).",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q627",
  "num": 627,
  "question": "Which WPA3 enhancement protects against hackers viewing traffic on the Wi-Fi network?",
  "options": [
   "SAE encryption",
   "TKIP encryption",
   "scrambled encryption key",
   "AES encryption"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 alexiro Highly Voted \uf164 3 years, 1 month ago\nThe third version of a Wi-Fi Alliance standard introduced in 2018 that requires pre-shared key or 802.1x authentication, GCMP, SAE, and forward\nsecrecy.\nSimultaneous Authentication of Equals (SAE)\nA strong authentication method used in WPA3 to authenticate wireless clients and APs and to prevent dictionary attacks for discovering pre-shared\nkeys.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q628",
  "num": 628,
  "question": "Refer to the exhibit. If the network environment is operating normally, which type of device must be connected to interface fastethernet 0/1?",
  "options": [
   "DHCP client",
   "access point",
   "router",
   "PC"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 shebo Highly Voted \uf164 1 year, 8 months ago\nSelected Answer: C\n\nThe correct answer should be C.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q629",
  "num": 629,
  "question": "Refer to the exhibit. An administrator configures four switches for local authentication using passwords that are stored as a cryptographic hash.\nThe four switches must also support SSH access for administrators to manage the network infrastructure. Which switch is configured correctly to\nmeet these requirements?",
  "options": [
   "SW1",
   "SW2",
   "SW3",
   "SW4"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 vadiminski Highly Voted \uf164 2 years, 4 months ago\nKeyword local authentication: \"login local\" configuration\nKeyword cryptographic hash: \"secret\" configuration\nKeyword SSH access: \"live vty 0 15\" configuration\n--> Answer C is correct",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q630",
  "num": 630,
  "question": "Refer to the exhibit. What is the effect of this configuration?",
  "options": [
   "The switch discards all ingress ARP traffic with invalid MAC-to-IP address bindings.",
   "All ARP packets are dropped by the switch.",
   "Egress traffic is passed only if the destination is a DHCP server.",
   "All ingress and egress traffic is dropped because the interface is untrusted."
  ],
  "correct": "A",
  "explanation": "Dynamic ARP inspection is an ingress security feature; it does not perform any egress checking.\n\n\uf147 \uf007 dicksonpwc Highly Voted \uf164 2 years ago\nDynamic ARP Inspection (DAI) is a security feature that validates Address Resolution Protocol (ARP) packets in a network. DAI allows a network\nadministrator to intercept, log, and discard ARP packets with invalid MAC address to IP address bindings.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q631",
  "num": 631,
  "question": "When a site-to-site VPN is used, which protocol is responsible for the transport of user data?",
  "options": [
   "IPsec",
   "IKEv1",
   "MD5",
   "IKEv2"
  ],
  "correct": "A",
  "explanation": "A site-to-site VPN allows offices in multiple fixed locations to establish secure connections with each other over a public network such as the\nInternet. A site-to-site\nVPN means that two sites create a VPN tunnel by encrypting and sending data between two devices. One set of rules for creating a site-to-site\nVPN is defined by\nIPsec.\n\n\uf147 \uf007 alexiro Highly Voted \uf164 3 years, 1 month ago\nIPsec The term referring to the IP Security protocols, which is an architecture for providing encryption and authentication services, usually when\ncreating VPN services through an IP network\nSite-to-site IPSec VPNs offer scalability as a benefit. This is because each remote office only needs an Internet connection to create a VPN tunnel\nback to the main office.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q632",
  "num": 632,
  "question": "Which type of wireless encryption is used for WPA2 in preshared key mode?",
  "options": [
   "AES-128",
   "TKIP with RC4",
   "AES-256",
   "RC4"
  ],
  "correct": "C",
  "explanation": "We can see in this picture we have to type 64 hexadecimal characters (256 bit) for the WPA2 passphrase so we can deduce the encryption is\nAES-256, not AES128.\n\nReference:\nhttps://www.cisco.com/c/en/us/support/docs/wireless-mobility/wireless-lan-wlan/67134-wpa2-config.html\n\n\uf147 \uf007 Rakeshch Highly Voted \uf164 2 years, 5 months ago\nWPA2 aes is always 128 bit key for both psk and enterprise. The number of characters from passphrase dont have anything to do with the key\nlength.\nIt is not even possible to select the key length.\nAlways 128.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q634",
  "num": 634,
  "question": "Which command prevents passwords from being stored in the configuration as plain text on a router or switch?",
  "options": [
   "enable secret",
   "enable password",
   "service password-encryption",
   "username cisco password encrypt"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 nakres64 Highly Voted \uf164 2 years, 7 months ago\ncorrect\nenable password <string> - Sets the enable password, and stores that password in plaintext in the config.\nenable secret <string> - Sets the enable password, and stores that password as an md5 hash in the config.\nservice password-encryption - For any passwords in the config that are stored in plaintext, this command changes them to be stored as hashed\nvalues instead.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q635",
  "num": 635,
  "question": "Refer to the exhibit. A network engineer must block access for all computers on VLAN 20 to the web server via HTTP. All other computers must be\nable to access the web server. Which configuration when applied to switch A accomplishes the task?",
  "options": [
   "B.",
   "C.",
   "D.",
   ""
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Ali526 Highly Voted \uf164 2 years, 7 months ago\nSorry, D is correct, but not the best way to address this.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q636",
  "num": 636,
  "question": "In which two ways does a password manager reduce the chance of a hacker stealing a user's password? (Choose two.)",
  "options": [
   "It encourages users to create stronger passwords",
   "It uses an internal firewall to protect the password repository from unauthorized access",
   "It stores the password repository on the local workstation with built-in antivirus and anti-malware functionality",
   "It automatically provides a second authentication factor that is unknown to the original user",
   "It protects against keystroke logging on a compromised device or web site"
  ],
  "correct": "AE",
  "explanation": "\uf147 \uf007 ccna_goat Highly Voted \uf164 11 months, 3 weeks ago\nstupid question",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q637",
  "num": 637,
  "question": "Which goal is achieved by the implementation of private IPv4 addressing on a network?",
  "options": [
   "provides an added level of protection against Internet exposure",
   "provides a reduction in size of the forwarding table on network routers",
   "allows communication across the Internet to other private networks",
   "allows servers and workstations to communicate across public network boundaries"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Niko9988 Highly Voted \uf164 2 years, 9 months ago\nthe question is indeed strange. in CCNA courser it was mentioned several time that NAT is not considered as a security means. So, i would answer\nlike - the goal of using IPv4 private range is to optimize the network address usage",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q638",
  "num": 638,
  "question": "Which type of attack is mitigated by dynamic ARP inspection?",
  "options": [
   "DDoS",
   "malware",
   "man-in-the-middle",
   "worm"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 vadiminski Highly Voted \uf164 2 years, 4 months ago\nworm and malware are clearly wrong. you could assume that DDOS is correct, but it is not the primary reason of ARP poisoning. Hence, the given\nanswer is correct",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q639",
  "num": 639,
  "question": "What is a function of a remote access VPN?",
  "options": [
   "establishes a secure tunnel between two branch sites",
   "uses cryptographic tunneling to protect the privacy of data for multiple users simultaneously",
   "used exclusively when a user is connected to a company's internal network",
   "allows the users to access company internal network resources through a secure tunnel"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 msomali Highly Voted \uf164 1 year, 5 months ago\nThe answer is D\nA:- this is used for site to site VPN",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q640",
  "num": 640,
  "question": "What are two recommendations for protecting network ports from being exploited when located in an office space outside of an IT closet?\n(Choose two.)",
  "options": [
   "enable the PortFast feature on ports",
   "configure static ARP entries",
   "configure ports to a fixed speed",
   "implement port-based authentication",
   "shut down unused ports"
  ],
  "correct": "DE",
  "explanation": "\uf147 \uf007 ProgSnob Highly Voted \uf164 1 year, 9 months ago\nI was thinking static ARP entries would also prevent ports from being exploited but I guess the other two are actually better choices.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q641",
  "num": 641,
  "question": "Refer to the exhibit. A network administrator must permit SSH access to remotely manage routers in a network. The operations team resides on\nthe 10.20.1.0/25 network. Which command will accomplish this task?",
  "options": [
   "access-list 2699 permit udp 10.20.1.0 0.0.0.255",
   "no access-list 2699 deny tcp any 10.20.1.0 0.0.0.127 eq 22",
   "access-list 2699 permit tcp any 10.20.1.0 0.0.0.255 eq 22",
   "no access-list 2699 deny ip any 10.20.1.0 0.0.0.255"
  ],
  "correct": "D",
  "explanation": "Already a statement is there in last to allow SSH Traffic for network 10.20.1.0 0.0.0.127, but Second statement says deny ip any 10.20.1.0\n0.0.0.255, so how it will work once it is denied. So the right answer is remove the --- no access-list 2699 deny ip any 10.20.1.0 0.0.0.255.\n\n\uf147 \uf007 distortion Highly Voted \uf164 2 years, 2 months ago\nAnswer is correct. The first encountered rule applies. The first rule is a deny so it never gets to the permit.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q642",
  "num": 642,
  "question": "A port security violation has occurred on a switch port due to the maximum MAC address count being exceeded. Which command must be\nconfigured to increment the security-violation count and forward an SNMP trap?",
  "options": [
   "switchport port-security violation access",
   "switchport port-security violation protect",
   "switchport port-security violation restrict",
   "switchport port-security violation shutdown"
  ],
  "correct": "C",
  "explanation": "Reference:\nhttps://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst4500/12-2/25ew/configuration/guide/conf/port_sec.html\n\n\uf147 \uf007 highfivejohn Highly Voted \uf164 11 months ago\nSelected Answer: C\n\nC is best answer, had the question included the port err-disabled then D",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q643",
  "num": 643,
  "question": "What is a practice that protects a network from VLAN hopping attacks?",
  "options": [
   "Enable dynamic ARP inspection",
   "Configure an ACL to prevent traffic from changing VLANs",
   "Change native VLAN to an unused VLAN ID",
   "Implement port security on internet-facing VLANs"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 RODCCN 1 month, 3 weeks ago\nSelected Answer: C\n\nVLAN Hopping is an attack where the attacker is able to send traffic from one VLAN into another, one of the attacks is the \"Double Tagging\".\nTo prevent a Double Tagging attack, keep the native VLAN of all trunk ports different from user VLANs.\nLINK: https://cybersecurity.att.com/blogs/security-essentials/vlan-hopping-and-mitigation",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q644",
  "num": 644,
  "question": "Where does a switch maintain DHCP snooping information?",
  "options": [
   "In the CAM table",
   "In the frame forwarding database",
   "In the MAC address table",
   "In the binding database"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Networknovice Highly Voted \uf164 1 year, 3 months ago\nKeep in mind a CAM table, and a MAC table are the same thing! Therefore, since they are each listed, you can eliminate both as potential answers.\nOne way to remember is that CAM is MAC spelled backward.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q645",
  "num": 645,
  "question": "A network administrator must configure SSH for remote access to router R1. The requirement is to use a public and private key pair to encrypt\nmanagement traffic to and from the connecting client. Which configuration, when applied, meets the requirements?",
  "options": [
   "R1#enable R1#configure terminal R1(config)#ip domain-name cisco.com R1(config)#crypto key generate ec keysize 1024",
   "R1#enable R1#configure terminal R1(config)#ip domain-name cisco.com R1(config)#crypto key generate ec keysize 2048",
   "R1#enable R1#configure terminal R1(config)#ip domain-name cisco.com R1(config)#crypto key encrypt rsa name myKey",
   "R1#enable R1#configure terminal R1(config)#ip domain-name cisco.com R1(config)#crypto key generate rsa modulus 1024"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 dicksonpwc Highly Voted \uf164 2 years ago\ncrypto key generate rsa [general-keys | usage-keys | signature | encryption] [label key-label] [exportable] [modulus modulus-size] [storage\ndevicename :] [redundancy] [on devicename :]\nmodulus modulus-size\nBy default, the modulus of a certification authority (CA) key is 1024 bits. The recommended modulus for a CA key is 2048 bits. The range of a CA\nkey modulus is from 350 to 4096 bits. As the default key is 1024 bits. So that the answer D is correct",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q646",
  "num": 646,
  "question": "When a WLAN with WPA2 PSK is configured in the Wireless LAN Controller GUI, which format is supported?",
  "options": [
   "decimal",
   "ASCII",
   "unicode",
   "base64"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 Smaritz Highly Voted \uf164 1 year, 5 months ago\nASCII and Hex",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q647",
  "num": 647,
  "question": "Refer to the exhibit. A network administrator has been tasked with securing VTY access to a router. Which access-list entry accomplishes this\ntask?",
  "options": [
   "access-list 101 permit tcp 10.1.1.0 0.0.0.255 172.16.1.0 0.0.0.255 eq telnet",
   "access-list 101 permit tcp 10.1.1.0 0.0.0.255 172.16.1.0 0.0.0.255 eq scp",
   "access-list 101 permit tcp 10.1.1.0 0.0.0.255 172.16.1.0 0.0.0.255 eq https",
   "access-list 101 permit tcp 10.1.1.0 0.0.0.255 172.16.1.0 0.0.0.255 eq ssh"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 bootloader_jack Highly Voted \uf164 1 year, 11 months ago\nthere is no ssh entry in the table. I did not understand the answer.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q648",
  "num": 648,
  "question": "Which two protocols must be disabled to increase security for management connections to a Wireless LAN Controller? (Choose two.)",
  "options": [
   "HTTPS",
   "SSH",
   "HTTP",
   "Telnet",
   "TFTP"
  ],
  "correct": "CD",
  "explanation": "\uf147 \uf007 dave1992 Highly Voted \uf164 1 year, 9 months ago\nHTTP and Telnet both are unsecure. That\u2019s why we have HTTPS and SSH. TFTP isn\u2019t used for WLC topics. Only simple file transferring unencrypted.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q649",
  "num": 649,
  "question": "Which security program element involves installing badge readers on data-center doors to allow workers to enter and exit based on their job roles?",
  "options": [
   "physical access control",
   "biometrics",
   "role-based access control",
   "multifactor authentication"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 dicksonpwc Highly Voted \uf164 2 years ago\nPhysical access control systems (PACS) are a type of physical security designed to restrict or allow access to a certain area or building. ... Physical\naccess control examples of credentials include fobs and key card entry systems, encrypted badges, mobile credentials, PIN codes and passwords.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q650",
  "num": 650,
  "question": "Which function is performed by DHCP snooping?",
  "options": [
   "listens to multicast traffic for packet forwarding",
   "rate-limits certain traffic",
   "propagates VLAN information between switches",
   "provides DDoS mitigation"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 raydel92 Highly Voted \uf164 1 year, 9 months ago\nSelected Answer: B\n\nUse the following steps to enable DHCP snooping:\nStep 1. Enable DHCP snooping by using the \"ip dhcp snooping\" global configuration command.\nStep 2. On trusted ports, use the \"ip dhcp snooping trust\" interface configuration command.\nStep 3. Limit the number of DHCP discovery messages that can be received per second on untrusted ports by using the \"ip dhcp snooping limit\nrate (rate in secs)\" interface configuration command.\nStep 4. Enable DHCP snooping by VLAN, or by a range of VLANs, by using the \"ip dhcp snooping vlan (vlan or vlan range)\" global configuration\ncommand.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q652",
  "num": 652,
  "question": "Which protocol is used for secure remote CLI access?",
  "options": [
   "Telnet",
   "HTTP",
   "HTTPS",
   "SSH"
  ],
  "correct": "D",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q653",
  "num": 653,
  "question": "Which implementation provides the strongest encryption combination for the wireless environment?",
  "options": [
   "WEP",
   "WPA + TKIP",
   "WPA + AES",
   "WPA2 + AES"
  ],
  "correct": "D",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q654",
  "num": 654,
  "question": "What does physical access control regulate?",
  "options": [
   "access to networking equipment and facilities",
   "access to servers to prevent malicious activity",
   "access to specific networks based on business function",
   "access to computer networks and file systems"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 DARKK Highly Voted \uf164 1 year, 4 months ago\n*Facilities* is the key word here, as it is solely Physical, the other options can be breached via the network as well.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q655",
  "num": 655,
  "question": "A network engineer is asked to configure VLANS 2, 3, and 4 for a new implementation. Some ports must be assigned to the new VLANS with\nunused ports remaining. Which action should be taken for the unused ports?",
  "options": [
   "configure in a nondefault native VLAN",
   "configure ports in the native VLAN",
   "configure ports in a black hole VLAN",
   "configure ports as access ports"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 sasquatchshrimp Highly Voted \uf164 1 year, 1 month ago\nLeave it to cisco to use terminology that engineers of many years have never heard or used... smh",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q656",
  "num": 656,
  "question": "When a WPA2-PSK WLAN is configured in the Wireless LAN Controller, what is the minimum number of characters that is required in ASCII format?",
  "options": [
   "6",
   "8",
   "12",
   "18"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 Futchihoore Highly Voted \uf164 2 years, 9 months ago\nWPA preshared keys must contain 8 to 63 ASCII text characters or 64 hexadecimal characters\nhttps://www.cisco.com/c/en/us/td/docs/wireless/controller/74/configuration/guides/consolidated/b_cg74_CONSOLIDATED/b_cg74_CONSOLIDATED_chapter_01010001.html",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q657",
  "num": 657,
  "question": "What mechanism carries multicast traffic between remote sites and supports encryption?",
  "options": [
   "ISATAP",
   "IPsec over ISATAP",
   "GRE",
   "GRE over IPsec"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Raooff Highly Voted \uf164 2 years, 8 months ago\nCCNA security course\nIpsec dosent support multicast, that is why GRE used with VPN, and as long as the GRE is not totally secure, the whole GRE. Encapsulation can be\nencapsulated in ipsec header so nlw we have both \" mulitcast ability and security\"",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q658",
  "num": 658,
  "question": "Refer to the exhibit. An access-list is required to permit traffic from any host on interface Gi0/0 and deny traffic from interface Gi0/1. Which\naccess list must be applied?",
  "options": [
   "ip access-list standard 99 permit 10.100.100.0 0.0.0.255 deny 192.168.0.0 0.0.255.255",
   "ip access-list standard 99 permit 10.100.100.0 0.0.0.255 deny 192.168.0.0 0.255.255.255",
   "ip access-list standard 199 permit 10.100.100.0 0.0.0.255 deny 192.168.0.0 0.255.255.255",
   "ip access-list standard 199 permit 10.100.100.0 0.0.0.255 deny 192.168.0.0 0.0.255.255"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 DARKK Highly Voted \uf164 1 year, 4 months ago\nA is correct, standard is 1-99 or 1300-1999",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q659",
  "num": 659,
  "question": "Refer to the exhibit. Which two commands must be configured on router R1 to enable the router to accept secure remote-access connections?\n(Choose two.)",
  "options": [
   "ip ssh pubkey-chain",
   "username cisco password 0 cisco",
   "crypto key generate rsa",
   "transport input telnet",
   "login console"
  ],
  "correct": "BC",
  "explanation": "\uf147 \uf007 mantest Highly Voted \uf164 1 year, 3 months ago\nAns is correct. Watch the below given video for the reference https://www.oreilly.com/content/how-do-i-configure-a-cisco-router-for-secure-remote-access-using-ssh/",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q660",
  "num": 660,
  "question": "Which service is missing when RADIUS is selected to provide management access to the WLC?",
  "options": [
   "authorization",
   "authentication",
   "accounting",
   "confidentiality"
  ],
  "correct": "D",
  "explanation": "Remote Authentication Dial-In User Service (RADIUS) is a networking protocol that provides centralized authentication, authorization, and\naccounting (AAA) management for users who connect and use a network service.\nWith RADIUS only the password is encrypted while the other information such as username, accounting information, etc are not encrypted.\nEncryption is \"the process of converting information or data into a code, especially to prevent unauthorized access\". So since RADIUS only\nencrypts the passwords, there is no confidentiality.\n\n\uf147 \uf007 [Removed] 2 months, 2 weeks ago\nSelected Answer: D\n\nAnswer D is correct",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q661",
  "num": 661,
  "question": "Which action implements physical access control as part of the security program of an organization?",
  "options": [
   "setting up IP cameras to monitor key infrastructure",
   "configuring a password for the console port",
   "backing up syslogs at a remote location",
   "configuring enable passwords on network devices"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 highfivejohn Highly Voted \uf164 11 months ago\nSelected Answer: A\n\nA is the only answer that lists a 'Physical' measure to counter-act 'Physical' security vulnerabilities. Make all the passwords you want on all your\nconsole ports, but if someone who shouldn't have access gets to one your 'Physical' security has already failed.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q662",
  "num": 662,
  "question": "Which field within the access-request packet is encrypted by RADIUS?",
  "options": [
   "authorized services",
   "password",
   "authenticator",
   "username"
  ],
  "correct": "B",
  "explanation": "Reference:\nhttps://www.cisco.com/c/en/us/support/docs/security-vpn/remote-authentication-dial-user-service-radius/12433-32.html\n\n\uf147 \uf007 iGlitch Highly Voted \uf164 1 year, 3 months ago\nSelected Answer: B\n\nRADIUS by itself provides no encryption of all traffic. It protects only a small part of the traffic, notably the passwords.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q663",
  "num": 663,
  "question": "A Cisco engineer is configuring a factory-default router with these three passwords:\n\u2711 The user EXEC password for console access is p4ssw0rd1.\n\u2711 The user EXEC password for Telnet access is s3cr3t2.\n\u2711 The password for privileged EXEC mode is priv4t3p4ss.\nWhich command sequence must the engineer configure?",
  "options": [
   "enable secret priv4t3p4ss ! line con 0 password p4ssw0rd1 ! line vty 0 15 password s3cr3t2",
   "enable secret priv4t3p4ss ! line con 0 password p4ssw0rd1 login ! line vty 0 15 password s3cr3t2 login",
   "enable secret priv4t3p4ss ! line con 0 password login p4ssw0rd1 ! line vty 0 15 password login s3cr3t2 login",
   "enable secret privilege 15 priv4t3p4ss ! line con 0 password p4ssw0rd1 login ! line vty 0 15 password s3cr3t2 login"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Phonon Highly Voted \uf164 8 months, 2 weeks ago\nSelected Answer: B\n\nThe correct command sequence is:\nenable secret priv4t3p4ss\nline con 0 password p4ssw0rd1 login\nline vty 0 15 password s3cr3t2 login\nThis will configure the password for privileged EXEC mode as \"priv4t3p4ss\", the user EXEC password for console access as \"p4ssw0rd1\", and the\nuser EXEC password for Telnet access as \"s3cr3t2\". The \"login\" keyword is used to enable password authentication for the console and Telnet\naccess.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q666",
  "num": 666,
  "question": "What is a function of Opportunistic Wireless Encryption in an environment?",
  "options": [
   "provide authentication",
   "protect traffic on open networks",
   "offer compression",
   "increase security by using a WEP connection"
  ],
  "correct": "B",
  "explanation": "Reference:\nhttps://www.cisco.com/c/en/us/td/docs/wireless/controller/9800/16-12/config-guide/b_wl_16_12_cg/wpa3.html\n\n\uf147 \uf007 StingVN 3 months, 3 weeks ago\nSelected Answer: B\n\nB. Protect traffic on open networks.\nThe function of Opportunistic Wireless Encryption (OWE) in an environment is to protect traffic on open networks. Open networks, such as public\nWi-Fi hotspots, do not typically have encryption enabled by default, making them vulnerable to eavesdropping and data interception. OWE\nprovides a mechanism to encrypt wireless communication on these open networks, adding a layer of security to protect the transmitted data. It\nhelps ensure the confidentiality and integrity of the network traffic, even in the absence of a pre-shared key or a separate authentication\nmechanism.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q668",
  "num": 668,
  "question": "Refer to the exhibit. Clients on the WLAN are required to use 802.11r. What action must be taken to meet the requirement?",
  "options": [
   "Under Protected Management Frames, set the PMF option to Required.",
   "Enable CCKM under Authentication Key Management.",
   "Set the Fast Transition option and the WPA gtk-randomize State to disable.",
   "Set the Fast Transition option to Enable and enable FT 802.1X under Authentication Key Management."
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 liviuml 5 months ago\nSelected Answer: D\n\nD is correct.\nSearch for \"Configuring 802.11r Fast Transition (GUI)\" in following page:\nhttps://www.cisco.com/c/dam/en/us/td/docs/wireless/controller/technotes/80211r-ft/b-80211rdg.html#task_2C619E3A576D474F80D6CB4BA8B4DBA6\nRegards,",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q669",
  "num": 669,
  "question": "Refer to the exhibit. What must be configured to enable 802.11w on the WLAN?",
  "options": [
   "Set Fast Transition to Enabled.",
   "Enable WPA Policy.",
   "Set PMF to Required.",
   "Enable MAC Filtering."
  ],
  "correct": "B",
  "explanation": "Reference:\nhttps://www.cisco.com/c/en/us/td/docs/wireless/controller/5700/software/release/3se/wlan/configuration_guide/b_wlan_3se_5700_cg/\nb_wlan_3se_5700_cg_chapter_01000.pdf\n\n\uf147 \uf007 BraveBadger Highly Voted \uf164 1 year, 4 months ago\nSelected Answer: C\n\nIEEE 802.11w is the Protected Management Frames standard. I think the correct answer is C.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q670",
  "num": 670,
  "question": "Which encryption method is used by WPA3?",
  "options": [
   "TKIP",
   "AES",
   "SAE",
   "PSK"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Garfieldcat Highly Voted \uf164 11 months, 1 week ago\nSAE is refer to authentication. encryption method should be B -AES",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q671",
  "num": 671,
  "question": "Which type of traffic is sent with pure IPsec?",
  "options": [
   "multicast traffic from a server at one site to hosts at another location",
   "broadcast packets from a switch that is attempting to locate a MAC address at one of several remote sites",
   "unicast messages from a host at a remote site to a server at headquarters",
   "spanning-tree updates between switches that are at two different sites"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 StingVN 3 months, 3 weeks ago\nSelected Answer: C\n\nC. Unicast messages from a host at a remote site to a server at headquarters.\nPure IPsec is typically used to secure unicast traffic between two endpoints. Unicast traffic refers to one-to-one communication between a specific\nsender and receiver. In this case, it would involve unicast messages from a host at a remote site to a server at headquarters.\nIPsec is a protocol suite used to provide secure communication over IP networks. It can be used to encrypt and authenticate IP packets, ensuring\nthe confidentiality, integrity, and authenticity of the transmitted data. While IPsec can also support multicast and broadcast traffic, the term \"pure\nIPsec\" generally refers to the use of IPsec in a point-to-point unicast communication scenario.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q672",
  "num": 672,
  "question": "How does authentication differ from authorization?",
  "options": [
   "Authentication is used to record what resource a user accesses, and authorization is used to determine what resources a user can access.",
   "Authentication verifies the identity of a person accessing a network, and authorization determines what resource a user can access.",
   "Authentication is used to determine what resources a user is allowed to access, and authorization is used to track what equipment is\nallowed access to the network.",
   "Authentication is used to verify a person's identity, and authorization is used to create syslog messages for logins."
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 [Removed] 2 months, 2 weeks ago\nSelected Answer: B\n\nGiven answer is correct.\nB. Authentication verifies the identity of a person accessing a network, and authorization determines what resource a user can access.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q673",
  "num": 673,
  "question": "An engineer has configured the domain name, user name, and password on the local router. What is the next step to complete the configuration\nfor a Secure Shell access RSA key?",
  "options": [
   "crypto key import rsa pem",
   "crypto key generate rsa",
   "crypto key zeroize rsa",
   "crypto key pubkey-chain rsa"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 4aynick 3 months, 3 weeks ago\nwhere is the hostname?",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q674",
  "num": 674,
  "question": "Which type if network attack overwhelms the target server by sending multiple packets to a port until the half-open TCP resources of the target are\nexhausted?",
  "options": [
   "SYN flood",
   "reflection",
   "teardrop",
   "amplification"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 RODCCN 1 month, 3 weeks ago\nSelected Answer: A\n\nA SYN flood is a type of network attack that overwhelms the target server by sending a large number of SYN packets (the first step in establishing a\nTCP connection) to a specific port, without completing the connection handshake. This flood of half-open TCP connections consumes the server's\nresources, leading to a denial-of-service (DoS) condition, as the server becomes unable to handle legitimate connection requests.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q675",
  "num": 675,
  "question": "Which two components comprise part of a PKI? (Choose two.)",
  "options": [
   "preshared key that authenticates connections",
   "one or more CRLs",
   "RSA token",
   "CA that grants certificates",
   "clear-text password that authenticates connections"
  ],
  "correct": "CD",
  "explanation": "\uf147 \uf007 Phonon Highly Voted \uf164 8 months, 2 weeks ago\nSelected Answer: BD\n\nB) CRL (Certificate Revocation List) is a list of digital certificates that have been revoked by the issuing CA before their expiration date.\nD) CA (Certificate Authority) is a trusted entity that grants digital certificates to organizations or individuals, which can be used to establish secure\nconnections and exchange data securely\nBoth are the integral parts of Public Key Infrastructure (PKI)",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q677",
  "num": 677,
  "question": "After a recent security breach and a RADIUS failure, an engineer must secure the console port of each enterprise router with a local username and\npassword.\nWhich configuration must the engineer apply to accomplish this task?",
  "options": [
   "aaa new-model line con 0 password plaintextpassword privilege level 15",
   "aaa new-model aaa authorization exec default local aaa authentication login default radius username localuser privilege 15 secret\nplaintextpassword",
   "username localuser secret plaintextpassword line con 0 no login local privilege level 15",
   "username localuser secret plaintextpassword line con 0 login authentication default privilege level 15"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 splashy Highly Voted \uf164 11 months, 2 weeks ago\nSelected Answer: D\n\nI could be wrong but...\nA.Only password no local username\nB.\"aaa auth login default radius\" doesn't work in Packet Tracer, \"aaa auth login default group radius\" works.\nC.\"no login local\" is the opposite of what we want.\nD.The only downside i see with this is that i think you need to implement on each device separately,\nbut since there was a security breach and a Radius failure, i think we are stuck with this option anyway?\nSo D?",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q678",
  "num": 678,
  "question": "Which wireless security protocol relies on Perfect Forward Secrecy?",
  "options": [
   "WEP",
   "WPA2",
   "WPA",
   "WPA3"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Etidic Highly Voted \uf164 10 months, 3 weeks ago\nSelected Answer: D\n\nThe answer is D",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q679",
  "num": 679,
  "question": "What is a zero-day exploit?",
  "options": [
   "It is when the network is saturated with malicious traffic that overloads resources and bandwidth.",
   "It is when an attacker inserts malicious code into a SQL server.",
   "It is when a new network vulnerability is discovered before a fix is available.",
   "It is when the perpetrator inserts itself in a conversation between two parties and captures or alters data."
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 [Removed] 2 months, 1 week ago\nSelected Answer: C\n\nC. It is when a new network vulnerability is discovered before a fix is available.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q680",
  "num": 680,
  "question": "A network engineer is replacing the switches that belong to a managed-services client with new Cisco Catalyst switches. The new switches will be\nconfigured for updated security standards including replacing.\nTelnet services with encrypted connections and doubling the modulus size from 1024. Which two commands must the engineer configure on the\nnew switches?\n(Choose two.)",
  "options": [
   "transport input ssh",
   "transport input all",
   "crypto key generate rsa modulus 2048",
   "crypto key generate rsa general-keys modulus 1024",
   "crypto key generate rsa usage-keys"
  ],
  "correct": "AC",
  "explanation": "\uf147 \uf007 Goh0503 Highly Voted \uf164 11 months, 1 week ago\nAnswer A and C\nQuestion requirement\nA Telnet services with encrypted connections === >A transport input ssh\nC doubling the modulus size from 1024. ===> C. crypto key generate rsa modulus 2048",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q681",
  "num": 681,
  "question": "What are two examples of multifactor authentication? (Choose two.)",
  "options": [
   "single sign-on",
   "soft tokens",
   "passwords that expire",
   "shared password repository",
   "unique user knowledge"
  ],
  "correct": "BC",
  "explanation": "\uf147 \uf007 RougePotatoe Highly Voted \uf164 10 months, 2 weeks ago\nmy distain for cisco grows",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q682",
  "num": 682,
  "question": "Which characteristic differentiates the concept of authentication from authorization and accounting?",
  "options": [
   "consumption-based billing",
   "identity verification",
   "user-activity logging",
   "service limitations"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 perri88 3 months ago\nthis cannot be a real question.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q683",
  "num": 683,
  "question": "What is a function of Cisco Advanced Malware Protection for a Next-Generation IPS?",
  "options": [
   "inspecting specific files and file types for malware",
   "authorizing potentially compromised wireless traffic",
   "authenticating end users",
   "URL filtering"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 RODCCN 1 month, 3 weeks ago\nSelected Answer: A\n\nhttps://www.cisco.com/c/en/us/products/security/advanced-malware-protection/index.html",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q684",
  "num": 684,
  "question": "What is a feature of WPA?",
  "options": [
   "TKIP/MIC encryption",
   "small Wi-Fi application",
   "preshared key",
   "802.1x authentication"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Shabeth 2 months, 1 week ago\nSelected Answer: A\n\nA.\nWPA\n-Uses TKIP (temporal key integrity protocol) for encryption\nTKIP adds the following features using legacy hardware and underlying WEP encryption\nMIC\nTimestamp\nSender's mac add\nTkip sequence counter\nKey mixing algorithm\nLonger initializing vector\nShort term replacement for WEP\n-Released in 2003 and Replaced in 2004",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q685",
  "num": 685,
  "question": "Which two practices are recommended for an acceptable security posture in a network? (Choose two.)",
  "options": [
   "Use a cryptographic keychain to authenticate to network devices.",
   "Place internal email and file servers in a designated DMZ.",
   "Back up device configurations to encrypted USB drives for secure retrieval.",
   "Disable unused or unnecessary ports, interfaces, and services.",
   "Maintain network equipment in a secure location."
  ],
  "correct": "DE",
  "explanation": "\uf147 \uf007 alejandro12 Highly Voted \uf164 10 months ago\nA,D\nUse a cryptographic keychain to authenticate to network devices is correct, think Maintain network equipment in a secure location should be for\nphysical not for security posture",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q686",
  "num": 686,
  "question": "How does WPA3 improve security?",
  "options": [
   "It uses SAE for authentication.",
   "It uses RC4 for encryption.",
   "It uses TKIP for encryption.",
   "It uses a 4-way handshake for authentication."
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Surves Highly Voted \uf164 9 months, 3 weeks ago\nSelected Answer: A\n\nAnd Aes for encryption",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q687",
  "num": 687,
  "question": "What is a function of a Next-Generation IPS?",
  "options": [
   "correlates user activity with network events",
   "serves as a controller within a controller-based network",
   "integrates with a RADIUS server to enforce Layer 2 device authentication rules",
   "makes forwarding decisions based on learned MAC addresses"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Dutch012 Highly Voted \uf164 6 months, 1 week ago\nWhat the hell is that Cisco!?, I am probably going to get royally as.s fu.cked if these type of questions in the exam",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q690",
  "num": 690,
  "question": "Which IPsec transport mode encrypts the IP header and the payload?",
  "options": [
   "pipe",
   "transport",
   "control",
   "tunnel"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Goena 7 months, 4 weeks ago\nSelected Answer: D\n\nIPsec is used in tunnel mode or transport mode. Security gateways use tunnel mode because they can provide point-to-point IPsec tunnels. ESP\ntunnel mode encrypts the entire packet, including the original packet headers.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q691",
  "num": 691,
  "question": "What is the default port-security behavior on a trunk link?",
  "options": [
   "It places the port in the err-disabled state if it learns more than one MAC address.",
   "It causes a network loop when a violation occurs.",
   "It disables the native VLAN configuration as soon as port security is enabled.",
   "It places the port in the err-disabled state after 10 MAC addresses are statically configured."
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 rijstraket Highly Voted \uf164 9 months, 1 week ago\nSelected Answer: A\n\nWhen you enable port security on a switch, by default only one MAC address can be learned. To allow more than one MAC address on a switch\nport simultaneously, use the command:port-security maximum <max-number>.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q692",
  "num": 692,
  "question": "Which device separates networks by security domains?",
  "options": [
   "intrusion protection system",
   "firewall",
   "wireless controller",
   "access point"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 Paul889 2 months ago\nIs this CCNA a question?",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q693",
  "num": 693,
  "question": "How are VLAN hopping attacks mitigated?",
  "options": [
   "manually implement trunk ports and disable DTP",
   "configure extended VLANs",
   "activate all ports and place in the default VLAN",
   "enable dynamic ARP inspection"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 RODCCN 1 month, 3 weeks ago\nSelected Answer: A\n\nTo prevent VLAN hopping attacks, you should use the switchport mode trunk command to manually configure your trunk ports, and use the\nswitchport nonegotiate command to disable the dynamic trunking protocol.\nLINK: https://www.linkedin.com/advice/0/what-security-risks-challenges-vlantrunking#:~:text=To%20prevent%20VLAN%20hopping%20attacks,disable%20the%20dynamic%20trunking%20protocol.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q694",
  "num": 694,
  "question": "Which enhancements were implemented as part of WPA3?",
  "options": [
   "Forward secrecy and SAE in personal mode for secure initial key exchange",
   "802.1x authentication and AES-128 encryption",
   "AES-64 in personal mode and AES-128 in enterprise mode",
   "TKIP encryption improving WEP and per-packet keying"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Ciscoman021 5 months, 2 weeks ago\nSelected Answer: A\n\nForward security and SAE in personal mode for secure initial key exchange were implemented as part of WPA3.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q695",
  "num": 695,
  "question": "When a site-to-site VPN is configured which IPsec mode provides encapsulation and encryption of the entire original IP packet?",
  "options": [
   "IPsec transport mode with AH",
   "IPsec tunnel mode with AH",
   "IPsec transport mode with ESP",
   "IPsec tunnel mode with ESP"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 michael1001 Highly Voted \uf164 9 months, 1 week ago\nSelected Answer: D\n\nAuthentication Header (AH)\nEncapsulating Security Payload (ESP)",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q696",
  "num": 696,
  "question": "An engineer is configuring remote access to a router from IP subnet 10.139.58.0/28. The domain name, crypto keys, and SSH have been\nconfigured. Which configuration enables the traffic on the destination router?",
  "options": [
   "line vty 0 15 access-class 120 in ! ip access-list extended 120 permit tcp 10.139.58.0 0.0.0.15 any eq 22",
   "interface FastEthernet0/0 ip address 10.122.49.1 255.255.255.252 ip access-group 10 in ! ip access-list standard 10 permit udp\n10.139.58.0 0.0.0.7 host 10.122.49.1 eq 22",
   "interface FastEthernet0/0 ip address 10.122.49.1 255.255.255.252 ip access-group 110 in ! ip access-list standard 110 permit tcp\n10.139.58.0 0.0.0.15 eq 22 host 10.122.49.1",
   "line vty 0 15 access-group 120 in ! ip access-list extended 120 permit tcp 10.139.58.0 0.0.0.15 any eq 22"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 ricky1802 Highly Voted \uf164 6 months, 1 week ago\nSelected Answer: A\n\nA is the correct answer. Line vty can go only with access-class, not with access-group!",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q697",
  "num": 697,
  "question": "In an SDN architecture, which function of a network node is centralized on a controller?",
  "options": [
   "Creates the IP routing table",
   "Discards a message due filtering",
   "Makes a routing decision",
   "Provides protocol access for remote access devices"
  ],
  "correct": "C",
  "explanation": "A controller, or SDN controller, centralizes the control of the networking devices. The degree of control, and the type of control, varies widely.\nFor instance, the controller can perform all control plane functions (such as making routing decisions) replacing the devices' distributed control\nplane.\nReference:\nhttps://www.ciscopress.com/articles/article.asp?\np=2995354&seqNum=2#:~:text=A%20controller%2C%20or%20SDN%20controller,the%20devices'%\n20distributed%20control%20plane\n\n\uf147 \uf007 clivebarker86 Highly Voted \uf164 11 months ago\ncontrol plane, create routing table",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q698",
  "num": 698,
  "question": "Which management security process is invoked when a user logs in to a network device using their username and password?",
  "options": [
   "authentication",
   "auditing",
   "accounting",
   "authorization"
  ],
  "correct": "A",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q699",
  "num": 699,
  "question": "Refer to the exhibit. What are the two steps an engineer must take to provide the highest encryption and authentication using domain credentials\nfrom LDAP?\n(Choose two.)",
  "options": [
   "Select PSK under Authentication Key Management.",
   "Select Static-WEP + 802.1X on Layer 2 Security.",
   "Select WPA+WPA2 on Layer 2 Security.",
   "Select 802.1X from under Authentication Key Management.",
   "Select WPA Policy with TKIP Encryption."
  ],
  "correct": "CD",
  "explanation": "\uf147 \uf007 Goh0503 Highly Voted \uf164 11 months, 1 week ago\nAnswer is C and D\nhttps://www.cisco.com/c/en/us/support/docs/wireless-mobility/wireless-lan-wlan/211277-WLC-with-LDAP-AuthenticationConfigurati.html#:~:text=Step%206.%20Set%20the%20L2%20security%20method%20to%20WPA2%20%2B%20802.1x%20and%20set%20L3%20sec\nurity%20to%20noneas%20shown%20in%20the%20image.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q700",
  "num": 700,
  "question": "Which enhancement is implemented in WPA3?",
  "options": [
   "employs PKI to identify access points",
   "applies 802.1x authentication",
   "uses TKIP",
   "protects against brute force attacks"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 no_blink404 2 months, 2 weeks ago\nSelected Answer: D\n\nD is correct",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q702",
  "num": 702,
  "question": "SW1 supports connectivity for a lobby conference room and must be secured. The engineer must limit the connectivity from PC1 to the SW1 and\nSW2 network.\nThe MAC addresses allowed must be limited to two. Which configuration secures the conference room connectivity?",
  "options": [
   "interface gi1/0/15 switchport port-security switchport port-security maximum 2",
   "interface gi1/0/15 switchport port-security switchport port-security mac-address 0000.abcd.0004vlan 100",
   "interface gi1/0/15 switchport port-security mac-address 0000.abcd.0004 vlan 100",
   "interface gi1/0/15 switchport port-security mac-address 0000.abcd.0004 vlan 100 interface switchport secure-mac limit 2"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Gotcha 2 weeks, 4 days ago\nSelected Answer: C\n\nDear Friends.\nThe only configuration that I can do is de C option. I tested with Packet Tracer, and these are the lines:\nSwitch(config-if)#switchport port-security mac-address 0000.abcd.0004\nPort-security not enabled on interface FastEthernet0/15.\nSwitch(config-if)#vlan 100\nI could see that the command \"switchport port-security switchport port-security\" does not exist.\nThis is the option in Packet Trace to \"switchport port-security\" command :\nSwitch(config-if)#switchport port-security ?\naging Port-security aging commands\nmac-address Secure mac address\nmaximum Max secure addresses\nviolation Security violation mode",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q703",
  "num": 703,
  "question": "Refer to the exhibit. An engineer is updating the management access configuration of switch SW1 to allow secured, encrypted remote\nconfiguration. Which two commands or command sequences must the engineer apply to the switch? (Choose two.)",
  "options": [
   "SW1(config)#enable secret ccnaTest123",
   "SW1(config)#username NEW secret R3mote123",
   "SW1(config)#line vty 0 15 SW1(config-line)#transport input ssh",
   "SW1(config)# crypto key generate rsa",
   "SW1(config)# interface f0/1 SW1(confif-if)# switchport mode trunk"
  ],
  "correct": "CD",
  "explanation": "\uf147 \uf007 joondale Highly Voted \uf164 11 months, 3 weeks ago\nSelected Answer: AC\n\nGoing with A and C. There is a username and password configured already. Configuring enable secret is a must when using SSH otherwise you\ncannot enter to enabled mode. Try it in packet tracer. Pls correct me if im wrong",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q704",
  "num": 704,
  "question": "Which port security violation mode allows from valid MAC addresses to pass but blocks traffic from invalid MAC addresses?",
  "options": [
   "restrict",
   "shutdown",
   "protect",
   "shutdown VLAN"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Tylosh Highly Voted \uf164 12 months ago\nI don't think it's a good question , because \u201cprotect\u201d and \u201crestrict\u201d also allows traffic from passing with a valid\nhttps://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst6500/ios/12-2SX/configuration/guide/book/port_sec.pdf",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q705",
  "num": 705,
  "question": "A customer wants to provide wireless access to contractors using a guest portal on Cisco ISE. The portal is also used by employees. A solution is\nimplemented, but contractors receive a certificate error when they attempt to access the portal. Employees can access the portal without any\nerrors. Which change must be implemented to allow the contractors and employees to access the portal?",
  "options": [
   "Install an Internal CA signed certificate on the Cisco ISE.",
   "Install a trusted third-party certificate on the Cisco ISE.",
   "Install an internal CA signed certificate on the contractor devices.",
   "Install a trusted third-party certificate on the contractor devices."
  ],
  "correct": "B",
  "explanation": "Reference:\nhttps://www.cisco.com/c/en/us/support/docs/security/identity-services-engine-software/200295-Install-a-3rd-party-CA-certificate-in-IS.html\n\n\uf147 \uf007 RougePotatoe Highly Voted \uf164 9 months, 4 weeks ago\nSelected Answer: C\n\nSupplied reference seemed like a lazy copy and paste without verifying it was relevant or not.\nSince employees can access the portal it indicates that this is an issue strictly on the contractors' devices and not on the ISE. Assuming this ISE is\nnot meant to be access by anyone but the contractors and employees internally signed certificate should be added on contractors' devices to allow\ntrust. No need for 3rd party because its meant to verify a website such as amazon is who they say they are. See link below.\nhttps://www.ssl2buy.com/wiki/self-signed-certificate-vs-trusted-ca-signed-certificate",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q706",
  "num": 706,
  "question": "Which two wireless security standards use counter mode cipher block chaining Message Authentication Code Protocol for encryption and data\nintegrity? (Choose two.)",
  "options": [
   "Wi-Fi 6",
   "WPA3",
   "WEP",
   "WPA2",
   "WPA"
  ],
  "correct": "BC",
  "explanation": "\uf147 \uf007 michael1001 Highly Voted \uf164 9 months, 1 week ago\nSelected Answer: BD\n\nit's B and D, please fix.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q707",
  "num": 707,
  "question": "A network engineer is implementing a corporate SSID for WPA3-Personal security with a PSK. Which encryption cipher must be configured?",
  "options": [
   "CCMP128",
   "GCMP256",
   "CCMP256",
   "GCMP128"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Amr_001 1 week, 1 day ago\nofficial cert guide vol1, page 662 :\ns. WPA3 leverages\nstronger encryption by AES with the Galois/Counter Mode Protocol (GCMP). It also uses\nProtected Management Frames (PMF) to secure important 802.11 management frames\nbetween APs and clients, to prevent malicious activity that might spoof or tamper with a\nBSS\u2019s operation.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q708",
  "num": 708,
  "question": "What is a practice that protects a network from VLAN hopping attacks?",
  "options": [
   "Implement port security on internet-facing VLANs",
   "Enable dynamic ARP inspection",
   "Assign all access ports to VLANs other than the native VLAN",
   "Configure an ACL to prevent traffic from changing VLANs"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Hari2512 3 months, 1 week ago\nQUESTION 76\nWhat is a practice that protects a network from VLAN hopping attacks?\nA. Enable dynamic ARP inspection\nB. Configure an ACL to prevent traffic from changing VLANs\nC. Change native VLAN to an unused VLAN ID\nD. Implement port security on internet-facing VLANs\nCorrect Answer: C",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q709",
  "num": 709,
  "question": "An administrator must use the password complexity not manufacturer-name command to prevent users from adding `Cisco` as a password.\nWhich command must be issued before this command?",
  "options": [
   "login authentication my-auth-list",
   "service password-encryption",
   "password complexity enable",
   "confreg 0x2142"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 skeah Highly Voted \uf164 10 months, 1 week ago\nIt's C and the minimum length of with password complexity enable is 8.\nhttps://www.cisco.com/c/en/us/support/docs/smb/switches/cisco-small-business-300-series-managed-switches/smb5563-configure-passwordsettings-on-a-switch-through-the-command.html",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q710",
  "num": 710,
  "question": "An organization has decided to start using cloud-provided services. Which cloud service allows the organization to install its own operating\nsystem on a virtual machine?",
  "options": [
   "platform-as-a-service",
   "network-as-a-service",
   "software-as-a-service",
   "infrastructure-as-a-service"
  ],
  "correct": "D",
  "explanation": "Below are the 3 cloud supporting services cloud providers provide to customer:\n\u2711 SaaS (Software as a Service): SaaS uses the web to deliver applications that are managed by a third-party vendor and whose interface is\naccessed on the clients' side. Most SaaS applications can be run directly from a web browser without any downloads or installations required,\nalthough some require plugins.\n\u2711 PaaS (Platform as a Service): are used for applications, and other development, while providing cloud components to software. What\ndevelopers gain with\nPaaS is a framework they can build upon to develop or customize applications. PaaS makes the development, testing, and deployment of\napplications quick, simple, and cost-effective. With this technology, enterprise operations, or a third-party provider, can manage OSes,\nvirtualization, servers, storage, networking, and the PaaS software itself. Developers, however, manage the applications.\n\u2711 IaaS (Infrastructure as a Service): self-service models for accessing, monitoring, and managing remote datacenter infrastructures, such as\ncompute (virtualized or bare metal), storage, networking, and networking services (e.g. firewalls). Instead of having to purchase hardware\noutright, users can purchase IaaS based on consumption, similar to electricity or other utility billing.\nIn general, IaaS provides hardware so that an organization can install their own operating system.\n\n\uf147 \uf007 alexiro Highly Voted \uf164 3 years, 1 month ago\ncreate a fault tolerant colocation site as a cloud provider, you would be searching for an Infrastructure as a Service provider. This would allow\nyou to install your own operation system and applications",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q711",
  "num": 711,
  "question": "How do traditional campus device management and Cisco DNA Center device management differ in regards to deployment?",
  "options": [
   "Traditional campus device management allows a network to scale more quickly than with Cisco DNA Center device management.",
   "Cisco DNA Center device management can deploy a network more quickly than traditional campus device management.",
   "Cisco DNA Center device management can be implemented at a lower cost than most traditional campus device management options.",
   "Traditional campus device management schemes can typically deploy patches and updates more quickly than Cisco DNA Center device\nmanagement."
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 Raymond9 Highly Voted \uf164 2 years, 9 months ago\nexam technique: without any prior knowledge, u can rule out two of the options just because they criticize CISCO's product",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q712",
  "num": 712,
  "question": "Which purpose does a northbound API serve in a controller-based networking architecture?",
  "options": [
   "facilitates communication between the controller and the applications",
   "reports device errors to a controller",
   "generates statistics for network hardware and traffic",
   "communicates between the controller and the physical network hardware"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 shakyak Highly Voted \uf164 1 year, 9 months ago\ncontroller <->Application = northbound\ncontroller<-> Devices = southbound",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q713",
  "num": 713,
  "question": "What benefit does controller-based networking provide versus traditional networking?",
  "options": [
   "allows configuration and monitoring of the network from one centralized point",
   "provides an added layer of security to protect from DDoS attacks",
   "combines control and data plane functionality on a single device to minimize latency",
   "moves from a two-tier to a three-tier network architecture to provide maximum redundancy"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 DaBest Highly Voted \uf164 1 year, 11 months ago\nthe correct Answer is A (allows configuration and monitoring of the network from one centralized point)",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q714",
  "num": 714,
  "question": "What is an advantage of Cisco DNA Center versus traditional campus device management?",
  "options": [
   "It is designed primarily to provide network assurance.",
   "It supports numerous extensibility options, including cross-domain adapters and third-party SDKs.",
   "It supports high availability for management functions when operating in cluster mode.",
   "It enables easy autodiscovery of network elements in a brownfield deployment."
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 Shamwedge Highly Voted \uf164 1 year, 9 months ago\nB: It has the most cisco product hype",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q716",
  "num": 716,
  "question": "What are two fundamentals of virtualization? (Choose two.)",
  "options": [
   "It allows logical network devices to move traffic between virtual machines and the rest of the physical network.",
   "It allows multiple operating systems and applications to run independently on one physical server.",
   "It allows a physical router to directly connect NICs from each virtual machine into the network.",
   "It requires that some servers, virtual machines, and network gear reside on the Internet.",
   "The environment must be configured with one hypervisor that serves solely as a network manager to monitor SNMP traffic."
  ],
  "correct": "AB",
  "explanation": "\uf147 \uf007 Abdulaziz Highly Voted \uf164 2 years, 9 months ago\nI am a VMware certified professional and the correct answer is A and B\nExplanation:\nA- Each virtualization solution have virtual switches (logical network), these virtual switches allows virtual machines to communicate on the\nnetwork. We also assign vlan tag on these switches or make them trunk.\nB) The main purpose of Server Virtualization is to run many VMs on the same physical server",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q717",
  "num": 717,
  "question": "How does Cisco DNA Center gather data from the network?",
  "options": [
   "Devices use the call-home protocol to periodically send data to the controller",
   "Devices establish an IPsec tunnel to exchange data with the controller",
   "The Cisco CLI Analyzer tool gathers data from each licensed network device and streams it to the controller",
   "Network devices use different services like SNMP, syslog, and streaming telemetry to send data to the controller"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 ccna_goat Highly Voted \uf164 11 months, 3 weeks ago\nhow am i supposed to know that? not mentioned in any course and even in OCG. all i can do here is wild guess.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q718",
  "num": 718,
  "question": "Which statement compares traditional networks and controller-based networks?",
  "options": [
   "Only controller-based networks decouple the control plane and the data plane.",
   "Traditional and controller-based networks abstract policies from device configurations.",
   "Only traditional networks natively support centralized management.",
   "Only traditional networks offer a centralized control plane."
  ],
  "correct": "A",
  "explanation": "Most traditional devices use a distributed architecture, in which each control plane is resided in a networking device. Therefore, they need to\ncommunicate with each other via messages to work correctly.\nIn contrast to distributed architecture, centralized (or controller-based) architectures centralizes the control of networking devices into one\ndevice, called SDN controller.\n\n\uf147 \uf007 LeGrosMatou Highly Voted \uf164 2 years, 6 months ago\nFunny how many questions are about the advantages of a DNA Centrer over a traditional network ^^ Good marketing Cisco",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q719",
  "num": 719,
  "question": "What are two benefits of network automation? (Choose two.)",
  "options": [
   "reduced hardware footprint",
   "reduced operational costs",
   "faster changes with more reliable results",
   "fewer network failures",
   "increased network security"
  ],
  "correct": "BC",
  "explanation": "\uf147 \uf007 dcouch Highly Voted \uf164 2 years, 10 months ago\nCould literally say any of those answers",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q720",
  "num": 720,
  "question": "Which two encoding methods are supported by REST APIs? (Choose two.)",
  "options": [
   "SGML",
   "YAML",
   "XML",
   "JSON",
   "EBCDIC"
  ],
  "correct": "CD",
  "explanation": "The Application Policy Infrastructure Controller (APIC) REST API is a programmatic interface that uses REST architecture. The API accepts and\nreturns HTTP\n(not enabled by default) or HTTPS messages that contain JavaScript Object Notation (JSON) or Extensible Markup Language (XML)\ndocuments.\nReference:\nhttps://www.cisco.com/c/en/us/td/docs/switches/datacenter/aci/apic/sw/2-x/rest_cfg/2_1_x/b_Cisco_APIC_REST_API_Configuration_Guide/\nb_Cisco_APIC_REST_API_Configuration_Guide_chapter_01.html\n\n\uf147 \uf007 ataraxium Highly Voted \uf164 3 years, 1 month ago\nJSON, XML = REST API\nYAML = Ansible",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q721",
  "num": 721,
  "question": "What are two characteristics of a controller-based network? (Choose two.)",
  "options": [
   "It uses Telnet to report system issues.",
   "The administrator can make configuration updates from the CLI.",
   "It uses northbound and southbound APIs to communicate between architectural layers.",
   "It decentralizes the control plane, which allows each device to make its own forwarding decisions.",
   "It moves the control plane to a central point."
  ],
  "correct": "CE",
  "explanation": "\uf147 \uf007 alexiro Highly Voted \uf164 3 years, 1 month ago\ncontroller-based networking A style of building computer networks that use a controller that centralizes some features and provides application\nprogramming interfaces (APIs) that allow for software interactions between applications and the controller (northbound APIs) and between the\ncontroller and the network devices (southbound APIs).\ncentralized control plane An approach to architecting network protocols and products that places the control plane functions into a centralized\nfunction rather than distributing the function across the networking devices.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q722",
  "num": 722,
  "question": "Which output displays a JSON data representation?",
  "options": [
   "B.",
   "C.",
   "D.",
   ""
  ],
  "correct": "C",
  "explanation": "JSON data is written as name/value pairs.\nA name/value pair consists of a field name (in double quotes), followed by a colon, followed by a value:\n\u202b\u05d2\u202c\u20acname\u202b\u05d2\u202c:\u20ac\u202b\u05d2\u202c\u20acMark\u202b\u05d2\u202c\u20ac\nJSON can use arrays. Array values must be of type string, number, object, array, boolean or null. For example:\n{\n\u202b\u05d2\u202c\u20acname\u202b\u05d2\u202c:\u20ac\u202b\u05d2\u202c\u20acJohn\u202b\u05d2\u202c\u20ac,\n\u202b\u05d2\u202c\u20acage30:\u20ac\u202b\u05d2\u202c,\n\u202b\u05d2\u202c\u20accars\u202b\u05d2\u202c\u20ac:[ \u202b\u05d2\u202c\u20acFord\u202b \u05d2\u202c,\u20ac\u202b\u05d2\u202c\u20acBMW\u202b \u05d2\u202c,\u20ac\u202b\u05d2\u202c\u20acFiat\u202b\u05d2\u202c\u20ac ]\n}\nJSON can have empty object like \u202b\u05d2\u202c\u20actaskId\u202b\u05d2\u202c\u20ac:{}\n\n\uf147 \uf007 i_am_confused Highly Voted \uf164 1 year, 2 months ago\nAnswer is C. JSON uses { [ : ,\nJSON does NOT use - ;",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q724",
  "num": 724,
  "question": "Which two capabilities of Cisco DNA Center make it more extensible as compared to traditional campus device management? (Choose two.)",
  "options": [
   "REST APIs that allow for external applications to interact natively",
   "adapters that support all families of Cisco IOS software",
   "SDKs that support interaction with third-party network equipment",
   "modular design that is upgradable as needed",
   "customized versions for small, medium, and large enterprises"
  ],
  "correct": "AC",
  "explanation": "Cisco DNA Center offers 360-degree extensibility through four distinct types of platform capabilities:\n\u2711 Intent-based APIs leverage the controller and enable business and IT applications to deliver intent to the network and to reap network\nanalytics and insights for\nIT and business innovation.\n\u2711 Process adapters, built on integration APIs, allow integration with other IT and network systems to streamline IT operations and processes.\n\u2711 Domain adapters, built on integration APIs, allow integration with other infrastructure domains such as data center, WAN, and security to\ndeliver a consistent intent-based infrastructure across the entire IT environment.\n\u2711 SDKs allow management to be extended to third-party vendor's network devices to offer support for diverse environments.\nReference:\nhttps://www.cisco.com/c/en/us/products/collateral/cloud-systems-management/dna-center/nb-06-dna-cent-platf-aag-cte-en.html\n\n\uf147 \uf007 Networknovice Highly Voted \uf164 1 year, 4 months ago\nSDN=Software-Defined Networking. Its in the name \"software.\"\nAPI's= Application Programming Interface. = software\nREST API's = isn't a specific API but a set of rules for API's\nSDKs= Software Development Kits\nEnabling software to allow for external applications defiantly makes it more \"extensible\" (able to be extended). The traditional device management\nseemed to really want to keep things proprietary, or at least attempt a push in that direction. It appears now that Cisco knows it needs to adapt\nand allow for 3rd party devices/applications so that it can remain competitive.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q726",
  "num": 726,
  "question": "What software-defined architecture plane assists network devices with making packet-forwarding decisions by providing Layer 2 reachability and\nLayer 3 routing information?",
  "options": [
   "management plane",
   "control plane",
   "data plane",
   "policy plane"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 IxlJustinlxl Highly Voted \uf164 2 years, 3 months ago\nThe control plane is the part of a network that controls how data is forwarded, while the data plane controls the actual forwarding process.\nMaking packet forwarding decisions is \u2018how data is forwarded\u2019.\nANSWER = B",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q727",
  "num": 727,
  "question": "What are two benefits of controller-based networking compared to traditional networking? (Choose two.)",
  "options": [
   "controller-based increases network bandwidth usage, while traditional lightens the load on the network",
   "controller-based reduces network configuration complexity, while traditional increases the potential for errors",
   "controller-based allows for fewer network failures, while traditional increases failure rates",
   "controller-based provides centralization of key IT functions, while traditional requires distributed management functions",
   "controller-based inflates software costs, while traditional decreases individual licensing costs"
  ],
  "correct": "BD",
  "explanation": "\uf147 \uf007 ITstudent123 Highly Voted \uf164 2 years, 10 months ago\nC. controller-based allows for fewer network failures, while traditional increases failure rates\nD. controller-based provides centralization of key IT functions, while traditional requires distributed management functions\nRegarding the controller-based network, A and E are not benefits.\nI don't know if C is true, but B and D are.\nSo B and D",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q728",
  "num": 728,
  "question": "Which type of API allows SDN controllers to dynamically make changes to the network?",
  "options": [
   "northbound API",
   "REST API",
   "SOAP API",
   "southbound API"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 boghota Highly Voted \uf164 2 years, 9 months ago\nAre there CCNA 200-301 Topics that haven\u00b4t been covered with these questions?",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q731",
  "num": 731,
  "question": "Which option best describes an API?",
  "options": [
   "a contract that describes how various components communicate and exchange data with each other",
   "an architectural style (versus a protocol) for designing applications",
   "a stateless client-server model",
   "request a certain type of data by specifying the URL path that models the data"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Suhib Highly Voted \uf164 2 years ago\nA contract?!!! weird way to describe it!",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q733",
  "num": 733,
  "question": "Which of the following is the JSON encoding of a dictionary or hash?",
  "options": [
   "{\u202b\u05d2\u202c\u20ackey\u202b \u05d2\u202c:\u20ac\u202b\u05d2\u202c\u20acvalue\u202b\u05d2\u202c\u20ac}",
   "[\u202b\u05d2\u202c\u20ackey\u202b \u05d2\u202c,\u20ac\u202b\u05d2\u202c\u20acvalue\u202b\u05d2\u202c\u20ac]",
   "{\u202b\u05d2\u202c\u20ackey\u202b \u05d2\u202c,\u20ac\u202b\u05d2\u202c\u20acvalue\u202b\u05d2\u202c\u20ac}",
   "(\u202b\u05d2\u202c\u20ackey\u202b \u05d2\u202c:\u20ac\u202b\u05d2\u202c\u20acvalue\u202b\u05d2\u202c\u20ac)"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Sten111 Highly Voted \uf164 2 years, 2 months ago\nHere are the actual answers\nhttps://itexamanswers.net/question/which-of-the-following-is-the-json-encoding-of-a-dictionary-or-hash",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q734",
  "num": 734,
  "question": "Which role does a hypervisor provide for each virtual machine in server virtualization?",
  "options": [
   "infrastructure-as-a-service",
   "Software-as-a-service",
   "control and distribution of physical resources",
   "services as a hardware controller"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 DaBest Highly Voted \uf164 1 year, 11 months ago\nAnswer is correct. The hypervisor creates and manages virtual machines on a host computer and allocates physical system resources to them.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q735",
  "num": 735,
  "question": "What is the function of a server?",
  "options": [
   "It transmits packets between hosts in the same broadcast domain.",
   "It provides shared applications to end users.",
   "It routes traffic between Layer 3 devices.",
   "It \u05c1reates security zones between trusted and untrusted networks."
  ],
  "correct": "B",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q736",
  "num": 736,
  "question": "Which CRUD operation modifies an existing table or view?",
  "options": [
   "read",
   "update",
   "replace",
   "create"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 tchekdy Highly Voted \uf164 2 years, 6 months ago\nCreate (SQL INSERT) : POST - Used to support the creation of a child resource, but can also modify the underlying state of a system.\nRead (SQL SELECT) : GET - Retrieve a representation of a resource, but with additional semantics available.\nUpdate (SQL UPDATE) : PUT - Update a resource using a full representation. Can also be used to create a resource. The full representation\nrequirement is a large caveat, see the following.\nUpdate (again) : PATCH - Update a resource using a partial representation.\nDelete (SQL DELETE) : DELETE - Delete a resource. This is the best matched mapping.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q737",
  "num": 737,
  "question": "In software-defined architectures, which plane is distributed and responsible for traffic forwarding?",
  "options": [
   "management plane",
   "policy plane",
   "data plane",
   "control plane"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Nicocisco Highly Voted \uf164 1 year, 6 months ago\nSelected Answer: C\n\nYeah C because in software-defined architectures, controle plane is centralised, and data plane still distribued.\ndata plane forward traffic.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q738",
  "num": 738,
  "question": "Refer to the exhibit. Which type of configuration is represented in the output?",
  "options": [
   "Ansible",
   "JSON",
   "Chef",
   "Puppet"
  ],
  "correct": "D",
  "explanation": "Reference:\nhttps://forge.puppet.com/modules/puppetlabs/ciscopuppet/1.0.0\n\n\uf147 \uf007 wondaah Highly Voted \uf164 6 months, 1 week ago\nPuppet => arrows, easiest way to remember",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q739",
  "num": 739,
  "question": "Which configuration management mechanism uses TCP port 22 by default when communicating with managed nodes?",
  "options": [
   "Ansible",
   "Python",
   "Puppet",
   "Chef"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 ZayaB Highly Voted \uf164 2 years, 6 months ago\nAnsible:\n- uses SSH (port 22) for remote device communication\n- uses YAML for fundamental configuration\nChef:\n- uses TCP port 10002 for configuration push jobs\n- uses Ruby for fundamental configuration elements\nPuppet:\n- uses TCP 8140 for communication\n- fundamental configuration elements are stored in a manifest",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q740",
  "num": 740,
  "question": "What does an SDN controller use as a communication protocol to relay forwarding changes to a southbound API?",
  "options": [
   "Java",
   "REST",
   "OpenFlow",
   "XML"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Aleks123 Highly Voted \uf164 1 year, 8 months ago\nHow Do SDN Southbound APIs Work?\nSouthbound APIs facilitate control over the network and enable the SDN Controller to dynamically make changes according to real-time demands\nand needs.\nOpenFlow, which was developed by the Open Networking Foundation (ONF), is the first and probably most well-known southbound interface.\nOpenFlow defines the way the SDN Controller should interact with the forwarding plane to make adjustments to the network, so it can better adapt\nto changing business requirements. With OpenFlow, entries can be added and removed to the internal flow-table of switches and routers to make\nthe network more responsive to real-time traffic demands.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q741",
  "num": 741,
  "question": "What uses HTTP messages to transfer data to applications residing on different hosts?",
  "options": [
   "OpenStack",
   "OpFlex",
   "REST",
   "OpenFlow"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 dicksonpwc Highly Voted \uf164 2 years ago\nC is correct.\nExplanation:\nA RESTful API is an architectural style for an application program interface (API) that uses HTTP requests to access and use data. That data can be\nused to GET, PUT, POST and DELETE data types, which refers to the reading, updating, creating and deleting of operations concerning resources.\nhttps://searchapparchitecture.techtarget.com/definition/RESTful-API",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q742",
  "num": 742,
  "question": "Which JSON data type is an unordered set of attribute-value pairs?",
  "options": [
   "string",
   "array",
   "Boolean",
   "object"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 MikD4016 Highly Voted \uf164 11 months, 3 weeks ago\nJSON Object :\nAn object is an unordered set of name/value pairs. An object begins with { (left brace) and ends with } (right brace). Each name is followed by :\n(colon) and the name/value pairs are separated by , (comma).\nJSON Array :\nAn array is an ordered collection of values. An array begins with [ (left bracket) and ends with ] (right bracket). Values are separated by , (comma).",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q743",
  "num": 743,
  "question": "Which protocol is used in Software Defined Access (SDA) to provide a tunnel between two edge nodes in different fabrics?",
  "options": [
   "Generic Router Encapsulation (GRE)",
   "Virtual Local Area Network (VLAN)",
   "Virtual Extensible LAN (VXLAN)",
   "Point-to-Point Protocol (PPP)"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Dibilili Highly Voted \uf164 2 years, 1 month ago\nOMG. why CCNA contains such a question???",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q744",
  "num": 744,
  "question": "Which plane is centralized by an SDN controller?",
  "options": [
   "management-plane",
   "data-plane",
   "services-plane",
   "control-plane"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Hodicek Highly Voted \uf164 1 year, 9 months ago\nD IS CORRECT ANSWER",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q745",
  "num": 745,
  "question": "Where is the interface between the control plane and data plane within the software-defined architecture?",
  "options": [
   "application layer and the management layer",
   "application layer and the infrastructure layer",
   "control layer and the application layer",
   "control layer and the infrastructure layer"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 kijken Highly Voted \uf164 1 year, 7 months ago\nData plane is infrastructure layer\nControl plane is Control layer",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q746",
  "num": 746,
  "question": "Why would a network administrator choose to implement automation in a network environment?",
  "options": [
   "To simplify the process of maintaining a consistent configuration state across all devices",
   "To centralize device information storage",
   "To implement centralized user account management",
   "To deploy the management plane separately from the rest of the network"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Paul1111 2 weeks ago\nCorrect",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q747",
  "num": 747,
  "question": "Which two events occur automatically when a device is added to Cisco DNA Center? (Choose two.)",
  "options": [
   "The device is placed into the Managed state.",
   "The device is placed into the Unmanaged state.",
   "The device is assigned to the Local site.",
   "The device is assigned to the Global site.",
   "The device is placed into the Provisioned state."
  ],
  "correct": "AD",
  "explanation": "\uf147 \uf007 Wong93 Highly Voted \uf164 2 years ago\nDevice in Global Site: When you successfully add, import, or discover a device, Cisco DNA Center places the device in the Managed state and\nassigns it to the Global site by default.\nSo I believe the answer is A and D.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q748",
  "num": 748,
  "question": "Which two components are needed to create an Ansible script that configures a VLAN on a switch? (Choose two.)",
  "options": [
   "playbook",
   "recipe",
   "model",
   "cookbook",
   "task"
  ],
  "correct": "AE",
  "explanation": "\uf147 \uf007 sovafal192 Highly Voted \uf164 1 year, 7 months ago\nSelected Answer: AE\n\nAnsible works with playbooks, which contains tasks.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q749",
  "num": 749,
  "question": "In software-defined architecture, which plane handles switching for traffic through a Cisco router?",
  "options": [
   "control",
   "data",
   "management",
   "application"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 EthanhuntMI6 9 months ago\nHow & why?",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q750",
  "num": 750,
  "question": "What are two southbound APIs? (Choose two.)",
  "options": [
   "Thrift",
   "DSC",
   "CORBA",
   "NETCONF",
   "OpenFlow"
  ],
  "correct": "DE",
  "explanation": "OpenFlow is a well-known southbound API. OpenFlow defines the way the SDN Controller should interact with the forwarding plane to make\nadjustments to the network, so it can better adapt to changing business requirements.\nThe Network Configuration Protocol (NetConf) uses Extensible Markup Language (XML) to install, manipulate and delete configuration to\nnetwork devices.\nOther southbound APIs are:\n\u202b\u05d2\u202c\u20ac\u00a2 onePK: a Cisco proprietary SBI to inspect or modify the network element configuration without hardware upgrades.\n\u202b\u05d2\u202c\u20ac\u00a2 OpFlex: an open-standard, distributed control system. It send \u202b\u05d2\u202c\u20acsummary policy\u202b\u05d2\u202c\u20ac to network elements.\n\n\uf147 \uf007 alexiro Highly Voted \uf164 3 years, 1 month ago\nChapter 16. Introduction to Controller-Based Networking CCNA vlo 2\nSBI interface\nthe second major section gives three\nsample architectures that happen to show three separate\nSBIs, specifically:\nOpenFlow (from the ONF; www.opennetworking.org)\nOpFlex (from Cisco; used with ACI)\nCLI (Telnet/SSH) and SNMP (used with Cisco APIC-EM)\nCLI (Telnet/SSH) and SNMP, and NETCONF (used with Cisco\nSoftware-Defined Access)",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q751",
  "num": 751,
  "question": "What makes Cisco DNA Center different from traditional network management applications and their management of networks?",
  "options": [
   "Its modular design allows the implementation of different versions to meet the specific needs of an organization.",
   "It only supports auto-discovery of network elements in a greenfield deployment.",
   "It omits support high availability of management functions when operating in cluster mode.",
   "It abstracts policy from the actual device configuration."
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 welju Highly Voted \uf164 3 years, 2 months ago\nA if we are being asked about benefits of deployment\nD if we are being asked about device management",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q752",
  "num": 752,
  "question": "Which API is used in controller-based architectures to interact with edge devices?",
  "options": [
   "southbound",
   "overlay",
   "northbound",
   "underlay"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 vadiminski Highly Voted \uf164 2 years, 4 months ago\noverlay: the virtual network\nunderlay: the physical network\nnothbound: interacts with the server\nthe given answer is correct",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q754",
  "num": 754,
  "question": "Refer to the exhibit. What is represented beginning with line 1 and ending with line 5?",
  "options": [
   "object",
   "value",
   "key",
   "array"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 splashy Highly Voted \uf164 1 year ago\nSelected Answer: D\n\nNetacad Mod 3 14.2.6\nThese are some of the characteristics of JSON:\nIt uses a hierarchical structure and contains nested values.\nIt uses braces { } to hold objects and square brackets [ ] hold arrays.\nIts data is written as key/value pairs.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q755",
  "num": 755,
  "question": "Which CRUD operation corresponds to the HTTP GET method?",
  "options": [
   "create",
   "read",
   "delete",
   "update"
  ],
  "correct": "B",
  "explanation": "Reference:\nhttps://hub.packtpub.com/crud-operations-rest/\n\n\uf147 \uf007 Nickname53796 Highly Voted \uf164 1 year, 3 months ago\nSelected Answer: B\n\nCreate action is POST,\nRead action are GET, HEAD and OPTIONS,\nUpdate actions are PUT and PATCH,\nDelete action is DELETE.\nGood job on not picking the same answer, A, as the original braindump from 2021",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q756",
  "num": 756,
  "question": "What differentiates device management enabled by Cisco DNA Center from traditional campus device management?",
  "options": [
   "CLI-oriented device",
   "centralized",
   "device-by-device hands-on",
   "per-device"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 hp2wx 1 year, 1 month ago\nSelected Answer: B\n\nSelected answer is correct. When using Cisco DNA Center to manage network device, device management is centralized and is managed from the\nDNA center GUI. Using DNA Center allows for us to have a more centralized management of network infrastructure as configuration changes can\nbe applied to an many devices at once when these changes are done through DNA Center",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q758",
  "num": 758,
  "question": "Which two REST API status-code classes represent errors? (Choose two.)",
  "options": [
   "1XX",
   "2XX",
   "3XX",
   "4XX",
   "5XX"
  ],
  "correct": "DE",
  "explanation": "\uf147 \uf007 [Removed] 2 months, 2 weeks ago\nThis is out of scope CCNA 200-301",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q759",
  "num": 759,
  "question": "How do servers connect to the network in a virtual environment?",
  "options": [
   "a cable connected to a physical switch on the network",
   "wireless to an access point that is physically connected to the network",
   "a virtual switch that links to an access point that is physically connected to the network",
   "a software switch on a hypervisor that is physically connected to the network"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Dunedrifter 2 months, 2 weeks ago\nSelected Answer: D\n\nD is correct. That's how you configure a virtual network in vmware esxi and connect them with physical cisco core switches.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q760",
  "num": 760,
  "question": "What is the function of the controller in a software-defined network?",
  "options": [
   "forwarding packets",
   "multicast replication at the hardware level",
   "making routing decisions",
   "fragmenting and reassembling packets"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Liquid_May 3 weeks, 2 days ago\nI don't think C is very correct, forwarding data should be a function of the data plane, however among the given options I think it is the most\ncorrect.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q762",
  "num": 762,
  "question": "What is a function of a southbound API?",
  "options": [
   "Use orchestration to provision a virtual server configuration from a web server",
   "Automate configuration changes between a server and a switching fabric",
   "Manage flow control between an SDN controller and a switching fabric",
   "Facilitate the information exchange between an SDN controller and application"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Yunus_Empire Highly Voted \uf164 9 months, 2 weeks ago\n30 More Question To Go!!!",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q763",
  "num": 763,
  "question": "Which script paradigm does Puppet use?",
  "options": [
   "recipes and cookbooks",
   "playbooks and roles",
   "strings and marionettes",
   "manifests and modules"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 creaguy Highly Voted \uf164 11 months, 2 weeks ago\nIt's C. strings and marionettes......LOL !",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q764",
  "num": 764,
  "question": "Which set of methods is supported with the REST API?",
  "options": [
   "GET, PUT, ERASE, CHANGE",
   "GET, POST, MOD, ERASE",
   "GET, PUT, POST, DELETE",
   "GET, POST, ERASE, CHANGE"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Vlad_Is_Love_ua 11 months, 3 weeks ago\nhttps://restfulapi.net/http-methods/\nTable of Contents\nHTTP GET\nHTTP POST\nHTTP PUT\nHTTP DELETE\nHTTP PATCH",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q765",
  "num": 765,
  "question": "Which technology is appropriate for communication between an SDN controller end applications running over the network?",
  "options": [
   "Southbound API",
   "REST API",
   "NETCONF",
   "OpenFlow"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 splashy Highly Voted \uf164 1 year ago\nSelected Answer: B\n\n\"communication between an SDN controller AND applications\" -> northbound\n-https://www.econfigs.com/ccna-7-7-c-northbound-and-southbound-apis/\n-ccna mod 3 13.4.4 Traditional & SDN Architectures\nDoes this imply that\nNetconf & Openflow = Southbound\nAnd would this make \"B\" the most correct answer?",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q767",
  "num": 767,
  "question": "What is the function of `off-the-shelf` switches in a controller-based network?",
  "options": [
   "setting packet-handling policies",
   "forwarding packets",
   "providing a central view of the deployed network",
   "making routing decisions"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 dropspablo 2 months, 4 weeks ago\nSelected Answer: B\n\nIn SDN's purest form, the controller has all the intelligence: Switches are dumb, commercial off- the-shelf (COTS) devices that are managed by the\ncontrollers.\nTherefore we can deduce \"off-the-shelf\" switches are only used to forward packets.\nhttps://quizlet.com/761289670/6-automation-virtualization-cloud-sdn-dna_14548715_2023_01_05_20_24-flash-cards/",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q768",
  "num": 768,
  "question": "Which REST method updates an object in the Cisco DNA Center Intent API?",
  "options": [
   "CHANGE",
   "UPDATE",
   "POST",
   "PUT"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Zepar Highly Voted \uf164 3 months, 3 weeks ago\nThe REST method that is typically used to update an object in the Cisco DNA Center Intent API is D. PUT.\nIn RESTful APIs, different HTTP methods are used to perform different actions on resources. The PUT method is commonly used to update an\nexisting resource or replace it entirely with a new representation.\nWhen using the Cisco DNA Center Intent API to update an object, you would typically send an HTTP request with the PUT method to the\nappropriate endpoint, providing the updated representation of the object in the request body. This allows you to modify the attributes or\nproperties of the object and persist those changes in the system.\nTherefore, the correct answer is D. PUT",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q769",
  "num": 769,
  "question": "Refer to the exhibit. How many JSON objects are represented?",
  "options": [
   "1",
   "2",
   "3",
   "4"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 rictorres333 Highly Voted \uf164 12 months ago\nSelected Answer: A\n\nBy definition a objet structure is {}, i think A is correct.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q770",
  "num": 770,
  "question": "Which definition describes JWT in regard to REST API security?",
  "options": [
   "an encrypted JSON token that is used for authentication",
   "an encrypted JSON token that is used for authorization",
   "an encoded JSON token that is used to securely exchange information",
   "an encoded JSON token that is used for authentication"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 dropspablo 2 months, 4 weeks ago\nJWT, which stands for JSON Web Token, is a technique defined in RFC 7519 for remote authentication between two parties. It is one of the most\nused ways to authenticate users in RESTful APIs.\nWhat is JSON Web Token?\nJWT (JSON Web Token) is an industry standard RCT 7519 method for performing two-party authentication via a signed token that authenticates a\nweb request. This token is a Base64 code that stores JSON objects with the data that allow authentication of the request.\nhttps://www.devmedia.com.br/como-o-jwt-funciona/40265",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q771",
  "num": 771,
  "question": "Refer to the exhibit. What is identified by the word `switch` within line 2 of the JSON Schema?",
  "options": [
   "array",
   "value",
   "object",
   "key"
  ],
  "correct": "D",
  "explanation": "Topic 1\n\n\f\uf147 \uf007 Customexit Highly Voted \uf164 10 months, 2 weeks ago\nSelected Answer: D\n\nKey-value pairs have a colon between them as in \"key\" : \"value\".\nhttps://www.digitalocean.com/community/tutorials/an-introduction-to-json",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q772",
  "num": 772,
  "question": "Refer to the exhibit. Which type of JSON data is shown?",
  "options": [
   "boolean",
   "array",
   "key",
   "object"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Paul1111 2 weeks ago\nCorrect",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q774",
  "num": 774,
  "question": "Which communication interaction takes place when a southbound API is used?",
  "options": [
   "between the SDN controller and PCs on the network",
   "between the SDN controller and switches and routers on the network",
   "between the SDN controller and services and applications on the network",
   "between network applications and switches and routers on the network"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 [Removed] 2 months, 2 weeks ago\nSelected Answer: B\n\nYes, between the SDN controller at the control plane and the data plane (routers and switches).",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q775",
  "num": 775,
  "question": "What are two characteristics of a public cloud implementation? (Choose two.)",
  "options": [
   "It is owned and maintained by one party, but it is shared among multiple organizations",
   "It enables an organization to fully customize how it deploys network resources",
   "It provides services that are accessed over the Internet",
   "It is a data center on the public Internet that maintains cloud services for only one company",
   "It supports network resources from a centralized third-party provider and privately-owned virtual resources"
  ],
  "correct": "AC",
  "explanation": "\uf147 \uf007 Sant11 2 weeks, 4 days ago\nSelected Answer: AC\n\nA & C are correct. E refers to a hybrid cloud",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q780",
  "num": 780,
  "question": "Refer to the exhibit. How many objects keys, and JSON list values are present?",
  "options": [
   "Three objects, two keys, and three JSON list values",
   "Three objects, three keys, and two JSON list values",
   "One object, three keys, and three JSON list values",
   "One object, three keys, and two JSON list values"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 rictorres333 Highly Voted \uf164 1 year ago\nSelected Answer: C\n\nWhat is in a JSON object?\nA JSON object contains zero, one, or more key-value pairs, also called properties. The object is surrounded by curly braces {} . Every key-value pair\nis separated by a comma. The order of the key-value pair is irrelevant.\nWhat is JSON key?\nA JSON object contains zero, one, or more key-value pairs, also called properties. The object is surrounded by curly braces {} . Every key-value pair\nis separated by a comma. The order of the key-value pair is irrelevant. A key-value pair consists of a key and a value, separated by a colon ( : )\nWhat is JSON list?\nArray Datatype in JSON\nSimilar to other programming languages, a JSON Array is a list of items surrounded in square brackets ([]). Each item in the array is separated by a\ncomma. The array index begins with 0. The square brackets [...] are used to declare JSON array. JSON array are ordered list of values.\nIn question:\n{} = 1\n:=3\n[] = 3\nCorrect is C.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q781",
  "num": 781,
  "question": "Which two primary drivers support the need for network automation? (Choose two.)",
  "options": [
   "Increasing reliance on self-diagnostic and self-healing",
   "Eliminating training needs",
   "Policy-driven provisioning of resources",
   "Reducing hardware footprint",
   "Providing a single entry point for resource provisioning"
  ],
  "correct": "CE",
  "explanation": "\uf147 \uf007 RougePotatoe Highly Voted \uf164 10 months, 2 weeks ago\nAnyone know why A isn't an answer? From my knowledge there been a significant push for automatic fault detection and repair.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q782",
  "num": 782,
  "question": "What is an expected outcome when network management automation is deployed?",
  "options": [
   "A distributed management plane must be used.",
   "Complexity increases when new device configurations are added.",
   "Custom applications are needed to configure network devices.",
   "Software upgrades are performed from a central controller."
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 shaney67 1 month ago\nD. Software upgrades are performed from a central controller.\nAn expected outcome when network management automation is deployed is that software upgrades can be performed from a central controller.\nAutomation allows for centralized control over network devices, which can include the ability to schedule and execute software updates across the\nnetwork from a single point of control. This can lead to more efficient and consistent software management across the network.\nThe other options do not accurately describe expected outcomes of network management automation.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q783",
  "num": 783,
  "question": "Refer to the exhibit. What is represented by `R1` and `SW1` within the JSON output?",
  "options": [
   "object",
   "value",
   "key",
   "array"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 [Removed] 2 months, 2 weeks ago\nSelected Answer: B\n\nB is correct, it's a value",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q785",
  "num": 785,
  "question": "Which HTTP status code is returned after a successful REST API request?",
  "options": [
   "200",
   "301",
   "404",
   "500"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Phonon Highly Voted \uf164 8 months, 2 weeks ago\nSelected Answer: A\n\nA. 200\nIn HTTP (Hypertext Transfer Protocol), status codes are used to indicate the outcome of a request. When a client (such as a web browser) makes a\nrequest to a server (such as a web server), the server responds with a status code and a message.\nA successful REST API request typically returns a status code of 200 (OK). This indicates that the request was successful and that the server was able\nto process it and provide a response.\nHere are some other common HTTP status codes:\n301 (Moved Permanently): This status code indicates that the requested resource has been permanently moved to a new location.\n404 (Not Found): This status code indicates that the requested resource could not be found.\n500 (Internal Server Error): This status code indicates that an error occurred on the server while processing the request.\nIn summary, the HTTP status code returned after a successful REST API request is 200 (OK).\nhttps://en.wikipedia.org/wiki/List_of_HTTP_status_codes",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q786",
  "num": 786,
  "question": "With REST API, which standard HTTP header tells a server which media type is expected by the client?",
  "options": [
   "Accept-Encoding: gzip. deflate",
   "Accept-Patch: text/example; charset=utf-8",
   "Content-Type: application/json; charset=utf-8",
   "Accept: application/json"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 guynetwork Highly Voted \uf164 1 year ago\nthis is not ccna question",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q787",
  "num": 787,
  "question": "Refer to the exhibit. How many objects are present in the given JSON-encoded data?",
  "options": [
   "One",
   "Four",
   "Seven",
   "Nine"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 splashy Highly Voted \uf164 11 months, 4 weeks ago\nSelected Answer: D\n\n8 times { because they made an error and put one ( which should be a { *facepalm*\n9 times }",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q788",
  "num": 788,
  "question": "What is the purpose of the Cisco DNA Center controller?",
  "options": [
   "to securely manage and deploy network devices",
   "to scan a network and generate a Layer 2 network diagram",
   "to secure physical access to a data center",
   "to provide Layer 3 services to autonomous access points"
  ],
  "correct": "A",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q789",
  "num": 789,
  "question": "What is the function of the controller in a software-defined network?",
  "options": [
   "forwarding packets",
   "multicast replication at the hardware level",
   "setting packet-handling policies",
   "fragmenting and reassembling packets"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 korek_team 6 months, 2 weeks ago\nanswer is correct",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q790",
  "num": 790,
  "question": "Refer to the exhibit. A network engineer must configure NETCONF. After creating the configuration, the engineer gets output from the command\nshow line but not from show running-config. Which command completes the configuration?",
  "options": [
   "Device(config)# netconf lock-time 500",
   "Device(config)# netconf max-message 1000",
   "Device(config)# no netconf ssh acl 1",
   "Device(config)# netconf max-sessions 100"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 Sein Highly Voted \uf164 7 months, 2 weeks ago\nSince when it's in ccna scope...",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q791",
  "num": 791,
  "question": "Which statement identifies the functionality of virtual machines?",
  "options": [
   "Virtualized servers run most efficiently when they are physically connected to a switch that is separate from the hypervisor",
   "The hypervisor can virtualize physical components including CPU, memory, and storage",
   "Each hypervisor can support a single virtual machine and a single software switch",
   "The hypervisor communicates on Layer 3 without the need for additional resources"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 MEDO95 Highly Voted \uf164 7 months, 3 weeks ago\nif you reach here that means u probably completed all 791 questions. i appreciate your dedication and i wish u all the best in your exam. good luck\nmate :)",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q792",
  "num": 792,
  "question": "Which network plane is centralized and manages routing decisions?",
  "options": [
   "management plane",
   "data plane",
   "policy plane",
   "control plane"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 espandrews 3 months, 3 weeks ago\nIncomplete questions for an incomplete quest",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q793",
  "num": 793,
  "question": "What is a benefit of using private IPv4 addressing?",
  "options": [
   "Multiple companies can use the same addresses without conflicts.",
   "Direct connectivity is provided to internal hosts from outside an enterprise network.",
   "Communication to the internet is reachable without the use of NAT.",
   "All external hosts are provided with secure communication to the internet."
  ],
  "correct": "A",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q794",
  "num": 794,
  "question": "Refer to the exhibit. A network engineer must provide configured IP addressing details to investigate a firewall rule issue. Which subnet and mask\nidentify what is configured on the en0 interface?",
  "options": [
   "10.8.0.0/16",
   "10.8.64.0/18",
   "10.8.128.0/19",
   "10.8.138.0/24"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 gewe Highly Voted \uf164 7 months ago\nff - 1111 1111 - 255\neo - 1110 0000 - 224\n00 - 0000 0000 - 0",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q795",
  "num": 795,
  "question": "What are two characteristics of a small office / home office connection environment? (Choose two.)",
  "options": [
   "It requires 10Gb ports on all uplinks.",
   "It supports between 1 and 50 users.",
   "It supports between 50 and 100 users.",
   "A router port connects to a broadband connection.",
   "It requires a core, distribution, and access layer architecture."
  ],
  "correct": "BD",
  "explanation": "\uf147 \uf007 supervictor 1 month, 2 weeks ago\nB. It supports between 1 and 50 users: SOHO environments are typically designed to serve a small number of users, ranging from a single user (a\nhome office) up to around 50 users in a small office setup.\nD. A router port connects to a broadband connection: In SOHO environments, a common setup involves a router connecting to a broadband\ninternet connection, such as DSL, cable, or fiber, to provide internet access to the connected devices in the home or office.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q796",
  "num": 796,
  "question": "Which element of a virtualization solution manages virtualized services and enables connections between virtualized services and external\ninterfaces?",
  "options": [
   "software",
   "network functionality",
   "virtual machine",
   "hardware"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 oatmealturkey Highly Voted \uf164 7 months ago\nSelected Answer: A\n\n\"Virtualization software - A hypervisor provides management for virtualized services. It enables connections between virtual services and external\ninterfaces.\"\nhttps://www.cisco.com/c/en/us/solutions/enterprise-networks/what-is-virtualization.html#~how-it-works",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q797",
  "num": 797,
  "question": "Which group of channels in the 802.11b/gin/ac/ax 2.4 GHz frequency bands are nonoverlapping channels?",
  "options": [
   "channels 1, 5, and 10",
   "channels 1, 6, and 11",
   "channels 1, 5, and 11",
   "channels 1, 6, and 10"
  ],
  "correct": "B",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q798",
  "num": 798,
  "question": "What is a function of Layer 3 switches?",
  "options": [
   "They route traffic between devices in different VLANs.",
   "They transmit broadcast traffic when operating in Layer 3 mode exclusively.",
   "They move frames between endpoints limited to IP addresses.",
   "They forward Ethernet frames between VLANs using only MAC addresses,"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Bugatti Highly Voted \uf164 7 months ago\nWent through these questions 3 times... taking the exam next week :)",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q800",
  "num": 800,
  "question": "Which cable type must be used to interconnect one switch using 1000 BASE-SX GBIC modules and another switch using 1000 BASE-SX SFP\nmodules?",
  "options": [
   "LC to SC",
   "SC to SC",
   "LC to LC",
   "SC to ST"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 JJY888 Highly Voted \uf164 6 months, 2 weeks ago\nSelected Answer: A\n\nSFP is LC:\nall SFP and SFP+ optics require LC connectors so the question becomes when you need single mode fiber or multi mode fiber but the connectot\ntype is clear. SC square connectors are too big to fit in a SFP or SFP+.\nGBIC is SC:\nGBIC is commonly used with Gigabit Ethernet and Fibre Channel. But its applications are not limited to these two types. There is also Fast Ethernet\n(FE) GBIC, BIDI GBIC, CWDM GBIC, DWDM GBIC, etc. Generally, GBIC is with the SC connector.Jan 14, 2015\nThe question is really about connector types. My answers were Googled.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q802",
  "num": 802,
  "question": "What is a benefit of a point-to-point leased line?",
  "options": [
   "low cost",
   "full-mesh capability",
   "simplicity of configuration",
   "flexibility of design"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Da_Costa 3 months ago\nPoint-to-point leased line simplifies the configuration as the circuit is available on a permanent basis and does not require a connection to be set\nup before traffic is passed. It does not require to define a permanent virtual circuit (PVC) in the configuration either ...C is correct",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q803",
  "num": 803,
  "question": "Why is TCP desired over UDP for applications that require extensive error checking, such as HTTPS?",
  "options": [
   "UDP uses sequencing data for packets to arrive in order, and TCP offers the capability to receive packets in random order.",
   "UDP uses flow control mechanisms for the delivery of packets, and TCP uses congestion control for efficient packet delivery.",
   "UDP reliably guarantees delivery of all packets, and TCP drops packets under heavy load.",
   "UDP operates without acknowledgments, and TCP sends an acknowledgment for every packet received."
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Mshamel Highly Voted \uf164 7 months ago\nSelected Answer: D\n\nThe answer is D.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q804",
  "num": 804,
  "question": "Which component controls and distributes physical resources for each virtual machine?",
  "options": [
   "hypervisor",
   "OS",
   "CPU",
   "physical enclosure"
  ],
  "correct": "A",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q805",
  "num": 805,
  "question": "What is the role of nonoverlapping channels in a wireless environment?",
  "options": [
   "to increase bandwidth",
   "to stabilize the RF environment",
   "to allow for channel bonding",
   "to reduce interference"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 MorpheusX Highly Voted \uf164 2 months ago\nWhy do I even pay money for the question catalogue if so many questions are answered incorrectly? You still learn the wrong things if you don\u2018t\npay attention. That sucks!!!",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q806",
  "num": 806,
  "question": "What are two advantages of implementing a controller-based architecture instead of traditional network architecture? (Choose two.)",
  "options": [
   "It allows for seamless connectivity to virtual machines.",
   "It increases security against denial-of-service attacks.",
   "It supports complex and high-scale IP addressing schemes.",
   "It enables configuration task automation.",
   "It provides increased scalability and management options."
  ],
  "correct": "DE",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q807",
  "num": 807,
  "question": "What is the purpose of the service-set identifier?",
  "options": [
   "It identifies the wireless network to which an application must connect.",
   "It identifies the wired network to which a network device is connected.",
   "It identifies the wired network to which a user device is connected.",
   "It identifies a wireless network for a mobile device to connect."
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 purenuker Highly Voted \uf164 6 months, 3 weeks ago\nSo many incorrect answers here .. Is this what I paid for ?",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q808",
  "num": 808,
  "question": "Which is a fact related to FTP?",
  "options": [
   "It always operates without user authentication.",
   "It uses block numbers to identify and mitigate data-transfer errors.",
   "It uses two separate connections for control and data traffic.",
   "It relies on the well-known UDP port 69."
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 learntstuff 1 month, 4 weeks ago\nSelected Answer: C\n\nFirst paragraph in this link,\nhttps://learn.microsoft.com/en-us/connectors/ftp/",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q809",
  "num": 809,
  "question": "How do UTP and STP cables compare?",
  "options": [
   "UTP cables provide faster and more reliable data transfer rates and STP cables are slower and less reliable.",
   "STP cables are shielded and protect against electromagnetic interference and UTP lacks the same protection against electromagnetic\ninterference.",
   "STP cables are cheaper to procure and easier to install and UTP cables are more expensive and harder to install.",
   "UTP cables are less prone to crosstalk and interference and STP cables are more prone to crosstalk and interference."
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 nitti47 3 months ago\nSTP means shield twistet pair easy B is the answer",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q810",
  "num": 810,
  "question": "What are two disadvantages of a full-mesh topology? (Choose two.)",
  "options": [
   "It requires complex configuration.",
   "It needs a high MTU between sites.",
   "It works only with BGP between sites.",
   "It has a high implementation cost.",
   "It must have point-to-point communication."
  ],
  "correct": "AD",
  "explanation": "\uf147 \uf007 sam225555 2 months ago\nSelected Answer: AD\n\ncorrect",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q812",
  "num": 812,
  "question": "Which technology allows for multiple operating systems to be run on a single host computer?",
  "options": [
   "virtual routing and forwarding",
   "virtual device contexts",
   "network port ID virtualization",
   "server virtualization"
  ],
  "correct": "D",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q813",
  "num": 813,
  "question": "Why would an administrator choose to implement an automated network management solution?",
  "options": [
   "to reduce operational costs",
   "to support simpler password policies",
   "to enable \u201cbox by box\u201d configuration and deployment",
   "to limit recurrent management costs"
  ],
  "correct": "A",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q814",
  "num": 814,
  "question": "What is a function of the core and distribution layers in a collapsed-core architecture?",
  "options": [
   "The router can support HSRP for Layer 2 redundancy in an IPv6 network.",
   "The core and distribution layers are deployed on two different devices to enable failover.",
   "The router operates on a single device or a redundant pair.",
   "The router must use IPv4 and IPv6 addresses at Layer 3."
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 dropspablo 2 months, 3 weeks ago\nSelected Answer: C\n\nC is correct, the CORE and Distribution layer are collapsed (unified) into one and using only one device (router, SW...). However, it usually uses two\ncollapsed layer devices (pair) for redundancy or load distribution.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q815",
  "num": 815,
  "question": "What must be considered before deploying virtual machines?",
  "options": [
   "resource limitations, such as the number of CPU cores and the amount of memory",
   "support for physical peripherals, such as monitors, keyboards, and mice",
   "whether to leverage VSM to map multiple virtual processors to two or more virtual machines",
   "location of the virtual machines within the data center environment"
  ],
  "correct": "A",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q816",
  "num": 816,
  "question": "What are two facts that differentiate optical-fiber cabling from copper cabling? (Choose two.)",
  "options": [
   "It is less expensive when purchasing patch cables.",
   "It carries electrical current further distances for PoE devices.",
   "It provides greater throughput options.",
   "It has a greater sensitivity to changes in temperature and moisture.",
   "It carries signals for longer distances."
  ],
  "correct": "CE",
  "explanation": "\uf147 \uf007 mjalal2023 1 month ago\nSelected Answer: AC\n\nA and C",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q817",
  "num": 817,
  "question": "What are two behaviors of a point-to-point WAN topology? (Choose two.)",
  "options": [
   "It leverages a dedicated connection.",
   "It provides direct connections betwaen each router in the topology.",
   "It delivers redundancy between the central office and branch offices.",
   "It uses a single router to route traffic between sites.",
   "It connects remote networks through a single line."
  ],
  "correct": "BD",
  "explanation": "\uf147 \uf007 Techpro30 1 month, 3 weeks ago\nSelected Answer: AE\n\nIts A, E",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q818",
  "num": 818,
  "question": "What is a link-local all-nodes IPv6 multicast address?",
  "options": [
   "ff02:0:0:0:0:0:0:1",
   "2004:33c:94d9:431e:255::",
   "fffe:034:0dd:45d6:789e::",
   "fe80:4433:034:0dd::2"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 j1mlawton Highly Voted \uf164 7 months ago\nSelected Answer: A\n\nAn IPv6 multicast address for well-known link-local messages would start with \u201cFF02\u201d",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q819",
  "num": 819,
  "question": "Which is a reason to implement IPv4 private addressing?",
  "options": [
   "Comply with PCI regulations.",
   "Reduce the size of the forwarding table on network routers.",
   "Reduce the risk of a network security breach.",
   "Comply with local law."
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 shaney67 1 month ago\nB. Reduce the size of the forwarding table on network routers.\nImplementing IPv4 private addressing, also known as Network Address Translation (NAT), can help reduce the size of the forwarding table on\nnetwork routers. NAT allows multiple devices within a private network to share a single public IP address for communication with external networks.\nThis conserves public IP addresses and reduces the size of the routing table, as routers only need to manage the translation of private IP addresses\nto the single public IP address.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q820",
  "num": 820,
  "question": "Which signal frequency appears 60 times per minute?",
  "options": [
   "1 Hz signal",
   "1 GHz signal",
   "60 Hz signal",
   "60 GHz signal"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 joefahim 1 week ago\nHertz (Hz) is a unit of frequency, and a 60 Hz signal oscillates or cycles 60 times per second.\nA signal with a frequency of 60 times per minute is equivalent to a 1 Hz signal.\nAnswer is A",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q821",
  "num": 821,
  "question": "What is a function of spine-and-leaf architecture?",
  "options": [
   "offers predictable latency of the traffic path between end devices",
   "mitigates oversubscription by adding a layer of leaf switches",
   "exclusively sends multicast traffic between servers that are directly connected to the spine",
   "limits payload size of traffic within the leaf layer"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 VarDav 4 weeks ago\nSelected Answer: A\n\nA seems like the more text book answer than B",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q822",
  "num": 822,
  "question": "What is a function of an endpoint?",
  "options": [
   "It passes unicast communication between hosts in a network.",
   "It transmits broadcast traffic between devices in the same VLAN.",
   "It provides security between trusted and untrusted sections of the network.",
   "It is used directly by an individual user to access network services."
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 JJY888 6 months, 2 weeks ago\nSelected Answer: D\n\nAn endpoint is a remote computing device that communicates back and forth with a network to which it is connected. Examples of endpoints\ninclude: Desktops. Laptops. Smartphones.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q823",
  "num": 823,
  "question": "What is a function of MAC address learning?",
  "options": [
   "It is disabled by default on all interfaces connected to trunks.",
   "It increases security on the management VLAN.",
   "It is enabled by default on all VLANs and interfaces.",
   "It increases the potential for MAC address flooding."
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 gewe Highly Voted \uf164 7 months ago\ngreat construct question.. its really function that is enables",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q824",
  "num": 824,
  "question": "Which IPv6 address range is suitable for anycast addresses for distributed services such as DHCP or DNS?",
  "options": [
   "FF00:1/12",
   "2001:db8:0234:ca3e::1/128",
   "FE80::1/10",
   "2002:db84:3f30:ca84:be76:2/64"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 Cynthia2023 1 month, 2 weeks ago\nSelected Answer: B\n\nThe key characteristic of anycast addresses is that they are assigned to multiple interfaces (nodes) in different locations. However, these anycast\naddresses are regular global unicast addresses, and there is no special reserved range specifically for anycast use.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q825",
  "num": 825,
  "question": "What is a similarity between OM3 and OM4 fiber optic cable?",
  "options": [
   "Both have a 62.5 micron core diameter.",
   "Both have a 100 micron core diameter.",
   "Both have a 50 micron core diameter.",
   "Both have a 9 micron core diameter."
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Dutch012 Highly Voted \uf164 6 months, 2 weeks ago\nagain, Cisco is an ass",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q826",
  "num": 826,
  "question": "Which device segregates a network into separate zones that have their own security policies?",
  "options": [
   "IPS",
   "switch",
   "access point",
   "firewall"
  ],
  "correct": "D",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q827",
  "num": 827,
  "question": "What is the primary purpose of private address space?",
  "options": [
   "limit the number of nodes reachable via the Internet",
   "simplify the addressing in the network",
   "conserve globally unique address space",
   "reduce network complexity"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Calinserban 1 month, 1 week ago\nShould be A, private is referring at ipv4 and globally unique is referring at ipv6",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q828",
  "num": 828,
  "question": "What is a characteristic of a collapsed-core network topology?",
  "options": [
   "It enables all workstations in a SOHO environment to connect on a single switch with internet access.",
   "It enables the core and access layers to connect to one logical distribution device over an EtherChannel.",
   "It allows wireless devices to connect directly to the core layer, which enables faster data transmission.",
   "It allows the core and distribution layers to run as a single combined layer."
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 shaney67 1 month ago\nB. It enables the core and access layers to connect to one logical distribution device over an EtherChannel.\nIn a collapsed-core network topology, the core and access layers connect to one logical distribution device (usually a switch or a set of switches)\nover an EtherChannel or aggregated link. This design simplifies the network architecture by reducing the number of layers and devices required,\nwhich is often suitable for small to medium-sized networks. It's a way to collapse the traditional hierarchical three-layer network design into fewer\nlayers, making management and configuration simpler.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q829",
  "num": 829,
  "question": "A technician receives a report of network slowness and the issue has been isolated to the interface FastEthemet0/13. What is the root cause of\nthe issue?\nFastEthernet0/13 is up, line protocol is up\nHardware is Fast Ethernet, address is 0001.4d27.66cd (bia 0001.4d27.66cd)\nMTU 1500 bytes, BW 100000 Kbit, DLY 100 usec,\nreliability 250/255, txload 1/255, rxload 1/255\nEncapsulation ARPA, loopback not set\nKeepalive not set Auto-duplex (Full) Auto Speed (100), 100BaseTX/FX\nARP type: ARPA, ARP Timeout 04:00:00\nLast input 18:52:43, output 00:00:01, output hang never\nLast clearing of \u201cshow interface\u201d counters never\nQueueing strategy: fifo Output queue 0/40, 0 drops; input queue 0/75, 0 drops\n5 minute input rate 12000 bits/sec, 6 packets/sec\n5 minute output rate 24000 bits/sec, 6 packets/sec\n14488019 packets input, 2434163609 bytes\nReceived 345348 broadcasts, 0 runts, 0 giants, 0 throttles\n261028 input errors, 259429 CRC, 1599 frame, 0 overrun, 0 ignored\n0 watchdog, 84207 multicast\n0 input packets with dribble condition detected\n19658279 packets output, 3529106068 bytes, 0 underruns\n0 output errors, 0 collisions, 1 interface resets\n0 babbles, 0 late collision, 0 deferred\n0 lost carrier, 0 no carrier\n0 output buffer failures, 0 output buffers swapped out",
  "options": [
   "local buffer overload",
   "err-disabled port on the far end",
   "physical errors",
   "duplicate IP addressing"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 kncappy 2 months, 3 weeks ago\nSelected Answer: C\n\nA high number of CRCs typically result from collisions but can also indicate a physical issue (cabling, bad interface/NIC)",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q830",
  "num": 830,
  "question": "What occurs when overlapping Wi-Fi channels are implemented?",
  "options": [
   "Users experience poor wireless network performance.",
   "Wireless devices are unable to distinguish between different SSIDs.",
   "The wireless network becomes vulnerable to unauthorized access.",
   "Network communications are open to eavesdropping."
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 VarDav 4 weeks ago\nSelected Answer: A\n\nAnswer is correct",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q831",
  "num": 831,
  "question": "Refer to the exhibit. An administrator received a call from a branch office regarding poor application performance hosted at the headquarters.\nEthernet 1 is connected between Router1 and the LAN switch. What identifies the issue?",
  "options": [
   "The MTU is not set to the default value.",
   "There is a duplex mismatch.",
   "The QoS policy is dropping traffic.",
   "The link is over utilized."
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 ike110 Highly Voted \uf164 6 months, 4 weeks ago\nIsn't the duplex mismatch a better option due to high # of collisions?",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q833",
  "num": 833,
  "question": "What is the functionality of the Cisco DNA Center?",
  "options": [
   "IP address pool distribution scheduler",
   "data center network policy controller",
   "console server that permits secure access to all network devices",
   "software-defined controller for automation of devices and services"
  ],
  "correct": "D",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q834",
  "num": 834,
  "question": "Refer to the exhibit. Which configuration enables an EtherChannel to form dynamically between SW1 and SW2 by using an industry-standard\nprotocol, and to support full IP connectivity between all PCs?",
  "options": [
   "SW1#\ninterface Gi0/1\nswitchport\nswitchport mode access\nchannel-group 1 mode active\n!\ninterface Gi0/2\nswitchport\nswitchport mode access\nchannel-group 1 mode active\nSW2#\ninterface Gi0/1\nswitchport\nswitchport mode access\nchannel-group 1 mode desirable\n!\ninterface Gi0/2\nswitchport\nswitchport mode access\nchannel-group 1 mode desirable",
   "SW1#\ninterface Gi0/1\nswitchport\nswitchport mode trunk\nchannel-group 1 mode on\n!\ninterface Gi0/2\nswitchport\nswitchport mode trunk\nchannel-group 1 mode auto\nSW2#\ninterface Gi0/1\nswitchport\n\n\fswitchport mode trunk\nchannel-group 1 mode auto\n!\ninterface Gi0/2\nswitchport\nswitchport mode trunk\nchannel-group 1 mode on\ninterface port-channel 1\nswitchport\nswitchport mode trunk",
   "SW1#\ninterface Gi0/1\nswitchport\nswitchport mode trunk\nchannel-group 1 mode active\n!\ninterface Gi0/2\nswitchport\nswitchport mode trunk\nchannel-group 1 mode active\nSW2#\ninterface Gi0/1\nswitchport\nswitchport mode trunk\nchannel-group 1 mode passive\n!\ninterface Gi0/2\nswitchport\nswitchport mode trunk\nchannel-group 1 mode passive",
   "SW1#\ninterface Gi0/1\nswitchport\nswitchport mode trunk\nchannel-group 1 mode auto\n!\ninterface Gi0/2\nswitchport\nswitchport mode trunk\nchannel-group 1 mode auto\nSW2#\ninterface Gi0/1\nswitchport\nswitchport mode trunk\nchannel-group 1 mode desirable\n!\ninterface Gi0/2\nswitchport\nswitchport mode trunk\nchannel-group 1 mode desirable"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Matalongo 5 months ago\n\n\fCorrect answer line c. PAGP is the standard protocol uses mode:\non --- on\ndesirable/auto -- desirable\nLACP is not standard uses:\non --- on\npassive/active -- active\nThe question is asking the standard protocol",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q835",
  "num": 835,
  "question": "Which functionality is provided by the console connection on a Cisco WLC?",
  "options": [
   "HTTP-based GUI connectivity",
   "secure in-band connectivity for device administration",
   "out-of-band management",
   "unencrypted in-band connectivity for file transfers"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Ciscoman021 5 months, 2 weeks ago\nSelected Answer: C\n\nThe console connection on a Cisco Wireless LAN Controller (WLC) provides out-of-band management functionality. Therefore, the correct answer is\nC - \"out-of-band management",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q836",
  "num": 836,
  "question": "Refer to the exhibit. Host A switch interface is configured in VLAN 2. Host D sends a unicast packet destined for the IP address of host A.\n\nWhat does the switch do when it receives the frame from host D?",
  "options": [
   "It floods the frame out of every ports except the source port.",
   "It creates a broadcast storm.",
   "It shuts down the source port and places it in err-disable mode.",
   "It drops the frame from the MAC table of the switch."
  ],
  "correct": "A",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q837",
  "num": 837,
  "question": "Refer to the exhibit. A Cisco engineer creates a new WLAN called lantest. Which two actions must be performed so that only high-speed 2.4-Ghz\nclients connect? (Choose two.)",
  "options": [
   "Enable the Status option.",
   "Set the Radio Policy option to 802.11g Only.",
   "Set the Radio Policy option to 802.11a Only.",
   "Set the Interface/Interface Group(G) to an interface other than guest.",
   "Enable the Broadcast SSID option."
  ],
  "correct": "AE",
  "explanation": "\uf147 \uf007 oatmealturkey Highly Voted \uf164 6 months, 4 weeks ago\nSelected Answer: AB\n\nAnswers are A (you have to enable the WLAN for it become operational) and B",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q838",
  "num": 838,
  "question": "How does Rapid PVST+ create a fast loop-free network topology?",
  "options": [
   "It uses multiple active paths between end stations.",
   "It requires multiple links between core switches.",
   "It maps multiple VLANs into the same spanning-tree instance.",
   "It generates one spanning-tree instance for each VLAN."
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Ciscoman021 5 months ago\nSelected Answer: D\n\nRapid PVST+ creates a fast loop-free network topology by generating one spanning-tree instance for each VLAN, which is option D.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q839",
  "num": 839,
  "question": "Which two functions does a WLC perform in the lightweight access-point architecture that an AP performs independently in an autonomous\narchitecture? (Choose two.)",
  "options": [
   "managing RF channels, including transmission power",
   "handling the association, authentication, and roaming of wireless clients",
   "sending and processing beacon frames",
   "encrypting and decrypting traffic that uses the WAP protocol family",
   "preventing collisions between wireless clients on the same RF channel"
  ],
  "correct": "AB",
  "explanation": "\uf147 \uf007 studying_1 4 months, 1 week ago\nSelected Answer: AB\n\nthe answer is correct, WLC handles RF management, Security/ QOS management, client authentication, client association/ roaming management",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q840",
  "num": 840,
  "question": "Refer to the exhibit. A network engineer is configuring a wireless LAN with Web Passthrough Layer 3 Web Policy. Which action must the engineer\ntake to complete the configuration?",
  "options": [
   "Set the Layer 2 Security to 802.1X.",
   "Enable TKIP and CCMP256 WPA2 Encryption.",
   "Enable the WPA Policy.",
   "Set the Layer 2 Security to None."
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 ike110 Highly Voted \uf164 6 months, 4 weeks ago\nSelected Answer: D\n\nNavigate to WLAN > Edit > Security > Layer2, and select None for Layer 2 Security:\nhttps://www.cisco.com/c/en/us/support/docs/wireless-mobility/wireless-lan-wlan/116879-configure-wlc-00.html",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q841",
  "num": 841,
  "question": "A network administrator plans an update to the WI-FI networks in multiple branch offices. Each location is configured with an SSID called \u201cOffice\u201d.\nThe administrator wants every user who connects to the SSID at any location to have the same access level. What must be set the same on each\nnetwork to meet the requirement?",
  "options": [
   "radio policy",
   "profile name",
   "NAS-ID configuration",
   "security policies"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 oatmealturkey Highly Voted \uf164 6 months, 4 weeks ago\nNever heard of NAS-ID until now :O",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q842",
  "num": 842,
  "question": "Refer to the exhibit. The P2P Blocking Action option is disabled on the WLC. The security team has a new requirement for each client to retain\ntheir assigned IP addressing as the clients move between locations in the campus network. Which action completes this configuration?",
  "options": [
   "Enable the Static IP Tunneling option.",
   "Disable the Coverage Hole Detection option.",
   "Set the P2P Blocking Action option to Forward-UpStream.",
   "Check the DHCP Addr. Assignment check box."
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 ike110 Highly Voted \uf164 6 months, 4 weeks ago\nSelected Answer: A\n\nStatic IP Tunneling - allows clients to travel between different WLC on the network and retain connectivity even if the static ip is in a different\nsubnet.\nhttps://mrncciew.com/2013/03/25/static-ip-clients-mobility/",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q843",
  "num": 843,
  "question": "Refer to the exhibit. A multivendor network exists and the company is implementing VoIP over the network for the first time. Which configuration\nis needed to implement the neighbor discovery protocol on the interface and allow it to remain off for the remaining interfaces?",
  "options": [
   "SW1(config)#lldp run SW1(config)#interface gigabitethernet1/0/1\nSW1(config-if)#lldp enable",
   "SW1(config)#no cdp run SW1(config)#interface gigabitethernet1/0/1\nSW1(config-if)#lldp transmit SW1(config-if)#lldp receive",
   "SW1(contig)#lldp enable SW1(config)#interface gigabitethernet1/0/1\nSW1(config-if)#lldp run",
   "SW1(config)#no cdp enable SW1(config)#interface gigabitethernet1/0/1\nSW1(config-if)#cdp run"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 no_blink404 2 months, 2 weeks ago\nSelected Answer: B\n\nAnswer is B.\nCan't be answer A since 'lldp enable' isn't a legitimate command.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q844",
  "num": 844,
  "question": "Refer to the exhibit. Routers R1, R2, and R3 use a protocol to identify the neighbors\u2019 IP addresses, hardware platforms, and software versions. A\nnetwork engineer must configure R2 to avoid sharing any neighbor information with R3, and maintain its relationship with R1. What action meets\nthis requirement?",
  "options": [
   "Configure the no lldp receive command on g0/1.",
   "Configure the no cdp run command globally.",
   "Configure the no cdp enable command on g0/2.",
   "Configure the no lldp run command globally."
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 purenuker Highly Voted \uf164 6 months, 2 weeks ago\nExamtopics , please correct your answers , we are paying our money to receive false answers !!!!! And may be somebody will be dropped off the\nexam because of your answers !!!!!!!!",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q845",
  "num": 845,
  "question": "SIP-based Call Admission Control must be configured in the Cisco WLC GUI. SIP call-snooping ports are configured. Which two actions must be\ncompleted next? (Choose two.)",
  "options": [
   "Set the QoS level to silver or greater for voice traffic.",
   "Configure two different QoS roles for data and voice traffic.",
   "Enable Media Session Snooping on the WLAN.",
   "Set the QoS level to platinum for voice traffic.",
   "Enable traffic shaping for the LAN interface of the WLC."
  ],
  "correct": "BD",
  "explanation": "\uf147 \uf007 oatmealturkey Highly Voted \uf164 7 months ago\nSelected Answer: CD\n\nB is incorrect, we already set the QoS level to platinum for voice traffic and for this question nothing needs to be done for data traffic. The correct\nanswers are C and D, the question literally references the call-snooping ports but you still have to enable snooping",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q846",
  "num": 846,
  "question": "Refer to the exhibit. A network administrator configures an interface on a new switch so that it connects to interface Gi1/0/1 on switch Cat9300-1.\nWhich configuration must be applied to the new interface?",
  "options": [
   "switchport mode trunk\nswitchport trunk native vlan 321\nswitchport trunk allowed vlan 100,200,300",
   "switchport mode dynamic desirable\nswitchport trunk native vlan 321\nswitchport trunk allowed vian 100,200,300",
   "switchport trunk encapsulation dot1q\nswitchport trunk native vlan 321\nswitchport trunk allowed vlan 100-300",
   "switchport nonegotiate\nswitchport access vlan 321\nswitchport trunk allowed vlan except 2-1001"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 oatmealturkey Highly Voted \uf164 7 months ago\nSelected Answer: A\n\nWhy B? The switch port in the exhibit was configured with \"switchport mode trunk\", as can be seen by Administrative Mode: trunk. So why not do\nsame configuration on the new switch? Also I believe Cisco recommends statically configuring trunks and not using DTP for security reasons",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q847",
  "num": 847,
  "question": "Which command enables HTTP access to the Cisco WLC?",
  "options": [
   "config network telnet enable",
   "config network secureweb enable",
   "config certificate generate webadmin",
   "config network webmode enable"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 dropspablo 2 months, 3 weeks ago\nAnswer D correct.\nInteresting ChatGPT response:\nB. config network secureweb enable\nThis command enables secure web access (HTTPS) to the Cisco WLC. By default, the WLC only allows HTTPS access for added security. However, if\nyou specifically want to enable unsecured HTTP access, you can use the following command:\nD. config network webmode enable\nImportantly, using unsecured HTTP access is generally not recommended due to security risks. It is advisable to use HTTPS whenever possible to\nensure data confidentiality and integrity.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q848",
  "num": 848,
  "question": "Which port state processes BPDUs, but does not forward packets or update the address database in Rapid PVST+?",
  "options": [
   "blocking",
   "learning",
   "listening",
   "disabled"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Mariachi Highly Voted \uf164 5 months, 3 weeks ago\nSelected Answer: B\n\nout of available options ... Learning seems to be the most correct.\nBlocking state is not available with RPVST+.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q849",
  "num": 849,
  "question": "A switch is forwarding a frame out of all interfaces except the interface that received the frame. What is the technical term for this process?",
  "options": [
   "ARP",
   "CDP",
   "flooding",
   "multicast"
  ],
  "correct": "C",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q850",
  "num": 850,
  "question": "Refer to the exhibit. Rapid PVST+ mode is on the same VLAN on each switch. Which switch becomes the root bridge and why?",
  "options": [
   "SW4, because its priority is highest and its MAC address is lower",
   "SW1, because its priority is the lowest and its MAC address is higher",
   "SW2, because its MAC address is the highest",
   "SW3, because its priority is the highest"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 oatmealturkey Highly Voted \uf164 7 months ago\nThis diagram is cut off at the top, right? The given answer is wrong because a switch does not become the root bridge by having the highest MAC\naddress. First criterion is the switch with the lowest priority will become the root bridge, but if all switches have the same priority then the switch\nwith the lowest MAC will become the root bridge",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q851",
  "num": 851,
  "question": "Which EtherChannel mode must be configured when using LAG on a WLC?",
  "options": [
   "on",
   "passive",
   "active",
   "auto"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Jcrazeybaby 6 days, 21 hours ago\nAnswer is C",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q853",
  "num": 853,
  "question": "Which switch concept is used to create separate broadcast domains?",
  "options": [
   "STP",
   "VTP",
   "VLAN",
   "CSMA/CD"
  ],
  "correct": "C",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q854",
  "num": 854,
  "question": "How must a switch interface be configured when an AP is in FlexConnect mode?",
  "options": [
   "access port",
   "EtherChannel",
   "PoE port",
   "trunk port"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Kerrera 2 months, 1 week ago\nSelected Answer: D\n\nIt is useful for double connection, wired and wireless, for example Chromecast, one vlan for cable and another for wifi, allowed as a trunk in the\nswitch",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q855",
  "num": 855,
  "question": "What are two features of PortFast? (Choose two.)",
  "options": [
   "Convergence is fast after a link failure.",
   "STP loops are mitigated for uplinks to other switches.",
   "Ports transition directly from the blocking state to the forwarding state.",
   "Ports operate normally without receiving BPDUs.",
   "Ports that connect to the backbone automatically detect indirect link failures."
  ],
  "correct": "BC",
  "explanation": "\uf147 \uf007 dropspablo 3 weeks ago\nSelected Answer: AD\n\nLetter D is correct. Ports with PortFast DO NOT operate normally when receiving BPDUs. \"They operate normally WITHOUT receiving BPDUs\". If the\nport receive any STP BPDU, it will revert to normal/regular mode and participate in listening and learning states. (letter A and D is correct).\nhttps://www.arubanetworks.com/techdocs/ArubaOS_80_Web_Help/Content/ArubaFrameStyles/Network_Parameters/Portfast%20and%20BPDU%20\nGuard.htm#:~:text=If%20the%20port%20receives%20any%20STP%20BPDU%2C%20it%20moves%20back%20to%20normal/regular%20mode%20a\nnd%20will%20participate%20in%20the%20listening%20and%20learning%20states.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q856",
  "num": 856,
  "question": "What is the root port in STP?",
  "options": [
   "It is the port with the highest priority toward the root bridge.",
   "It is the port on the root switch that leads to the designated port on another switch.",
   "It is the port that is elected only when the root bridge has precisely one port on a single LAN segment.",
   "It is the port on a switch with the lowest cost to reach the root bridge."
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 [Removed] 2 months, 1 week ago\nSelected Answer: D\n\nD. It is the port on a switch with the lowest cost to reach the root bridge.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q857",
  "num": 857,
  "question": "When a switch receives a frame from an unknown source MAC address, which action does the switch take with the frame?",
  "options": [
   "It sends the frame to ports within the CAM table identified with an unknown source MAC address.",
   "It floods the frame out all interfaces, including the interface it was received on.",
   "It associates the source MAC address with the LAN port on which it was received and saves it to the MAC address table.",
   "It attempts to send the frame back to the source to ensure that the source MAC address is still available for transmissions."
  ],
  "correct": "C",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q858",
  "num": 858,
  "question": "When the LAG configuration is updated on a Cisco WLC, which additional task must be performed when changes are complete?",
  "options": [
   "Reboot the WLC.",
   "Flush all MAC addresses from the WLC.",
   "Re-enable the WLC interfaces.",
   "Re-associate the WLC with the access point."
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 dropspablo 2 months, 3 weeks ago\nSelected Answer: A\n\nWhen you enable LAG or make any changes to the LAG configuration, you must immediately reboot the controller.\nhttps://www.cisco.com/c/en/us/td/docs/wireless/controller/8-2/configguide/b_cg82/b_cg82_chapter_010101011.html#:~:text=When%20you%20enable%20LAG%20or%20make%20any%20changes%20to%20the%20LA\nG%20configuration%2C%20you%20must%20immediately%20reboot%20the%20controller.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q859",
  "num": 859,
  "question": "Refer to the exhibit. An engineer ts building a new Layer 2 LACP EtherChannel between SW1 and SW2, and they executed the given show\ncommands to verify the work. Which additional task must be performed so that the switches successfully bundle the second member in the LACP\nport-channel?",
  "options": [
   "Configure the switchport trunk allowed vlan 300 command on SW1 port-channel 1.",
   "Configure the switchport trunk allowed vlan add 300 command on interface Fa0/2 on SW2.",
   "Configure the switchport trunk allowed vlan add 300 command on SW1 port-channel 1.",
   "Configure the switchport trunk allowed vlan 300 command on interface Fa0/2 on SW1."
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 oatmealturkey Highly Voted \uf164 7 months ago\nSelected Answer: C\n\nWrong, if we do switchport trunk allowed vlan 300 that replaces the previous allowed vlans so they are no longer allowed. You have to \"add\" vlan\n300",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q860",
  "num": 860,
  "question": "Refer to the exhibit. VLAN 23 is being implemented between SW1 and SW2. The command show interface ethernet0/0 switchport has been issued\non SW1. Ethernet0/0 on SW1 is the uplink to SW2. Which command when entered on the uplink interface allows PC 1 and PC 2 to communicate\nwithout impact to the communication between PC 11 and PC 12?",
  "options": [
   "switchport trunk allowed vlan 2-1001",
   "switchport trunk allowed vlan 23",
   "switchport trunk allowed vian add 23",
   "switchport trunk allowed vian 22-23"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 gewe Highly Voted \uf164 7 months ago\nI would go with option C..\ncorrect me if I m not right",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q861",
  "num": 861,
  "question": "A network engineer starts to implement a new wireless LAN by configuring the authentication server and creating the dynamic interface. What\nmust be performed next to complete the basic configuration?",
  "options": [
   "Create the new WLAN and bind the dynamic interface to it.",
   "Configure high availability and redundancy for the access points.",
   "Enable Telnet and RADIUS access on the managoment interface.",
   "Install the management interface and add the management IP."
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Simon_1103 Highly Voted \uf164 6 months, 2 weeks ago\nSelected Answer: A\n\nThe correct answer is A because after configuring the authentication server and creating the dynamic interface, the next step in configuring a new\nWLAN is to create the WLAN and bind the dynamic interface to it. This will allow the wireless clients to connect to the WLAN and authenticate\nusing the configured authentication server. Configuring high availability and redundancy for the access points, enabling Telnet and RADIUS access\non the management interface, and installing the management interface and adding the management IP are all important steps in configuring a\nwireless LAN, but they come after creating the WLAN and binding the dynamic interface to it.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q862",
  "num": 862,
  "question": "Refer to the exhibit. An architect is managing a wireless network with APs from several branch offices connecting to the WLC in the data center.\nThere is a new requirement for a single WLAN to process the client data traffic without sending it to the WLC. Which action must be taken to\ncomplete the request?",
  "options": [
   "Enable local HTTP profiling.",
   "Enable FlexConnect Local Switching.",
   "Enable local DHCP Profiling.",
   "Enable Disassociation Imminent."
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 dropspablo 2 months, 3 weeks ago\nResposta B parece correta!\n\"When a FlexConnect access point can reach the controller (referred to as the connected mode), the controller assists in client authentication.\nWhen a FlexConnect access point cannot access the controller, the access point enters the standalone mode (local authentication) and\nauthenticates clients by itself.\"\n...\n\"In the Advanced tab, select the FlexConnect Local Switching check box to enable local switching for the WLAN.\"\nhttps://www.cisco.com/c/en/us/td/docs/wireless/controller/72/configuration/guide/cg/cg_flexconnect.html#21265:~:text=tab%2C%20select%20the-,FlexConnect%20Local%20Switching,-check%20box%20to",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q863",
  "num": 863,
  "question": "What must be considered for a locally switched FlexConnect AP if the VLANs that are used by the AP and client access are different?",
  "options": [
   "The APs must be connected to the switch with multiple links in LAG mode.",
   "The native VLAN must match the management VLAN of the AP.",
   "The switch port mode must be set to trunk.",
   "IEEE 802.1Q trunking must be disabled on the switch port."
  ],
  "correct": "C",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q864",
  "num": 864,
  "question": "Which command configures the Cisco WLC to prevent a serial session with the WLC CLI from being automatically logged out?",
  "options": [
   "config sessions maxsessions 0",
   "config serial timeout 9600",
   "config serial timeout 0",
   "config sessions timeout 0"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 oatmealturkey Highly Voted \uf164 7 months ago\nSelected Answer: C\n\nWrong, config sessions timeout 0 is for Telnet/SSH sessions",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q865",
  "num": 865,
  "question": "A Cisco engineer at a new branch office is configuring a wireless network with access points that connect to a controller that is based at corporate\nheadquarters. Wireless client traffic must terminate at the branch office and access-point survivability is required in the event of a WAN outage.\nWhich access point mode must be selected?",
  "options": [
   "Lightweight with local switching disabled",
   "FlexConnect with local switching enabled",
   "OfficeExtend with high availability disabled",
   "Local with AP fallback enabled"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 Cynthia2023 2 months, 3 weeks ago\nSelected Answer: B\n\nFlexConnect is a feature in Cisco wireless networks that allows access points to operate in a distributed manner, providing local switching\ncapabilities at the branch office. In this mode, the access points can continue to serve wireless clients even if the WAN connection to the controller\nat the corporate headquarters is lost.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q866",
  "num": 866,
  "question": "What is an advantage of using auto mode versus static mode for power allocation when an access point is connected to a PoE switch port?",
  "options": [
   "Power policing is enabled at the same time.",
   "The default level is used for the access point.",
   "All four pairs of the cable are used.",
   "It detects the device is a powered device."
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Nwanna1 3 days, 4 hours ago\nThe switch supports these PoE modes: auto \u2013 The switch automatically detects if the connected device requires power. If the switch discovers a\npowered device connected to the port and if the switch has enough power, it grants power, updates the power budget, turns on power to the port\non a first-come, first-served basis, and updates the LEDs\u2026 static \u2013 The switch pre-allocates power to the port (even when no powered device is\nconnected) and guarantees that power will be available for the port. Reference:\nhttps://www.cisco.com/en/US/docs/switches/lan/catalyst3850/software/release/3.2_0_se/multibook/configuration_guide/b_consolidated_config_gu\nide_3850_chapter_011010.html",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q867",
  "num": 867,
  "question": "Refer to the exhibit. Wireless LAN access must be set up to force all clients from the NA WLAN to authenticate against the local database. The\nWLAN is configured for local EAP authentication. The time that users access the network must not be limited. Which action completes this\nconfiguration?",
  "options": [
   "Check the Guest User Role check box.",
   "Uncheck the Guest User check box.",
   "Set the Lifetime (seconds) value to 0.",
   "Clear the Lifetime (seconds) value."
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 xbololi Highly Voted \uf164 2 months, 1 week ago\nI'm studying more than 6 months for ccna... When i started to work on dumps i think i saw cisco wireless device more than switch and router in\ntotal...",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q869",
  "num": 869,
  "question": "What is a specification for SSIDs?",
  "options": [
   "They must include one number and one letter.",
   "They are a Cisco proprietary security feature.",
   "They are case sensitive.",
   "They define the VLAN on a switch."
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 [Removed] 2 months, 2 weeks ago\nSelected Answer: C\n\nC is correct, they are case sensitive.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q870",
  "num": 870,
  "question": "What is a reason to configure a trunk port that connects to a WLC distribution port?",
  "options": [
   "Provide redundancy if there is a link failure for out-of-band management.",
   "Allow multiple VLANs to be used in the data path.",
   "Permit multiple VLANs to provide out-of-band management.",
   "Eliminate redundancy with a link failure in the data path."
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 studying_1 3 months, 2 weeks ago\nSelected Answer: B\n\nanswer is correct, distribution port is connected to the wired network( distribution system) and used for data traffic, and usually it's trunk which\nallows multiple vlans",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q872",
  "num": 872,
  "question": "Refer to the exhibit. A Cisco WLC administrator is creating a new wireless network with enhanced SSID security. The new network must operate at\n2.4 Ghz with 54 Mbps of throughput. Which set of tasks must the administrator perform to complete the configuration?",
  "options": [
   "Uncheck the Broadcast SSID check box and set the Radio Policy to 802.11a/g only.",
   "Check the Broadcast SSID check box and set the Radio Policy to 802.11g only.",
   "Uncheck the Broadcast SSID check box and set the Radio Policy to 802.11g only.",
   "Check the Broadcast SSID check box and set the Radio Policy to 802.11a only."
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Rynurr Highly Voted \uf164 6 months, 4 weeks ago\nSelected Answer: C\n\nShould be \"C\".\n802.11g uses 2.4GHz and throughput up to 54 Mbit/s.\n\u201cenhanced SSID security\u201d = hiding SSID, so we must uncheck Broadcast SSID option",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q873",
  "num": 873,
  "question": "Which switching feature removes unused MAC addresses from the MAC address table, which allows new MAC addresses to be added?",
  "options": [
   "MAC address aging",
   "MAC move",
   "MAC address auto purge",
   "dynamic MAC address learning"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 [Removed] 2 months, 2 weeks ago\nSelected Answer: A\n\nGiven answer is correct\nA. MAC address aging",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q874",
  "num": 874,
  "question": "Refer to the exhibit. A network engineer configures the CCNA WLAN so that clients must reauthenticate hourly and to limit the number of\nsimultaneous connections to the WLAN to 10. Which two actions complete this configuration? (Choose two.)",
  "options": [
   "Enable the Wi-Fi Direct Clients Policy option",
   "Enable the Enable Session Timeout option and set the value to 3600.",
   "Enable the Client Exclusion option and set the value to 3600.",
   "Set the Maximum Allowed Clients value to 10.",
   "Set the Maximum Allowed Clients Per AP Radio value to 10."
  ],
  "correct": "BD",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q875",
  "num": 875,
  "question": "Refer to the exhibit. The SW1 and SW2 Gi0/0 ports have been preconfigured. An engineer is given these requirements:\n\u2022 Allow all PCs to communicate with each other at Layer 3.\n\u2022 Configure untagged traffic to use VLAN 5.\n\u2022 Disable VLAN 1 from being used.\nWhich configuration set meets these requirements?",
  "options": [
   "SW1#\ninterface Gi0/1\nswitchport mode trunk\nswitchport trunk allowed vlan 5,7,9,108\nswitchport trunk native vlan 5\ninterface Gi0/2\nswitchport mode trunk\nswitchport trunk allowed vlan 5,7,9,108\nSW2#\ninterface Gi0/1\nswitchport mode access\nswitchport access vlan 7\ninterface Gi0/7\nswitchport mode trunk\nswitchport trunk allowed vlan 7,9,108",
   "SW1#\ninterface Gi0/1\nswitchport mode trunk\nswitchport trunk allowed vlan 5,7,9,108\nswitchport trunk native vlan 5\ninterface Gi0/2\nswitchport mode access\nswitchport trunk allowed vlan 7,9,108\n\nTopic 1\n\n\fSW2#\ninterface Gi0/1\nswitchport mode access\nno switchport access vlan 1\nswitchport access vlan 7\ninterface Gi0/7\nswitchport mode trunk\nswitchport trunk allowed vlan 7,9,108\nswitchport trunk native vlan 5",
   "SW#1 interface Gi0/1\nswitchport mode trunk\nswitchport trunk allowed vlan 5,7,9,108\nswitchport trunk native vlan 5\ninterface Gi0/2\nswitchport mode trunk\nswitchport trunk allowed vlan 5,7,9,108\nSW2#\ninterface Gi0/1\nswitchport mode access\nswitchport access vlan 7\ninterface Gi0/7\nswitchport mode trunk\nswitchport trunk allowed vlan 5,7,9,108\nswitchport trunk native vlan 5",
   "SW1#\ninterface Gi0/1\nswitchport mode trunk\nswitchport trunk allowed vian 5,7,9,108\ninterface Gi0/2\nswitchport mode trunk\nswitchport trunk allowed vlan 7,9,108\nSW2#\ninterface Gi0/1\nswitchport mode trunk\nswitchport trunk allowed vlan 7\ninterface Gi0/7\nswitchport mode trunk\nswitchport trunk allowed vlan 5,7,9,108"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 dropspablo 2 months, 2 weeks ago\nSelected Answer: C\n\nLetter A - Two mismatch (between SW1 and SW2): Native Vlan and Vlan Allowed.\nLetter B - A mismatch (between SW1 and SW2): Vlan Allowed.\nLetter C - Working, best option!\nLetter D - Native Vlan 5 not configured. (*wrong command vian)",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q876",
  "num": 876,
  "question": "Refer to the exhibit. How must router A be configured so that it only sends Cisco Discovery Protocol information to router C?",
  "options": [
   "#config t\nRouter A (config)#no cdp run Router A (config)#interface gi0/0/1\nRouter A (config-if)#cdp enable B. #config t\nRouter A (config)#cdp run Router A (config)#interface gi0/0/0\nRouter A (config-if)#no cdp enable",
   "#config t Router A (config)#cdp run Router A (config)#interface gi0/0/1\nRouter A (config-if)#cdp enable D. #config t\nRouter A (config)#cdp run Router A (config)#interface gi0/0/0\nRouter A (config-if)#cdp enable"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Rynurr Highly Voted \uf164 6 months, 4 weeks ago\nSelected Answer: B\n\n\"B\" is the correct answer.\ninterface gi0/0/0\nRouter A (config-if)#no cdp enable",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q877",
  "num": 877,
  "question": "Refer to the exhibit. An administrator must turn off the Cisco Discovery Protocol on the port configured with address last usable address in the\n10.0.0.0/30 subnet. Which command set meets the requirement?",
  "options": [
   "interface gi0/1\nno cdp enable",
   "interface gi0/0\nno cdp run",
   "interface gi0/0\nno cdp advertise-v2",
   "interface gi0/1\nclear cdp table"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 gewe Highly Voted \uf164 7 months ago\nthats correct.\nanswer is A",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q878",
  "num": 878,
  "question": "Which WLC port connects to a switch to pass normal access-point traffic?",
  "options": [
   "redundancy",
   "service",
   "console",
   "distribution system"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 shaney67 3 weeks ago\nThe correct answer is B. service.\nIn a Wireless LAN Controller (WLC) setup, the service port is the one that connects to a switch to pass normal access-point traffic. This port is\nresponsible for handling the communication between the access points and the WLC, allowing the access points to send and receive data to and\nfrom the wired network.\nThe other options are as follows:\nA. redundancy: This port is used for communication between redundant WLCs for failover and backup purposes.\nC. console: This port is typically used for out-of-band management and configuration of the WLC.\nD. distribution system: This term is often used in the context of the wireless network itself, referring to the infrastructure that connects the access\npoints and provides wireless coverage. It's not specifically related to the port on the WLC that connects to a switch.\nSo, the correct choice for the port that connects to a switch to pass normal access-point traffic is B. service.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q879",
  "num": 879,
  "question": "Which default condition must be considered when an encrypted mobility tunnel is used between two Cisco WLCs?",
  "options": [
   "The tunnel uses the IPses protocol for encapsulation.",
   "Control and data traffic encryption are enabled.",
   "The tunnel uses the EoIP protocol to transmit data traffic.",
   "TCP port 443 and UDP 21 are used."
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 oatmealturkey Highly Voted \uf164 7 months ago\nSelected Answer: B\n\nD is incorrect. The controller uses UDP port 16667 to send data traffic. EoIP is not used to send data traffic across an encrypted mobility tunnel.\nData traffic is encrypted in an encrypted mobility tunnel and control traffic is always encrypted, so the answer is B.\nhttps://www.cisco.com/c/en/us/support/docs/wireless/4400-series-wireless-lan-controllers/107188-mobility-groups-faq.pdf",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q880",
  "num": 880,
  "question": "Refer to the exhibit. After a recent internal security audit, the network administrator decided to block all P2P-capable devices from the selected\nSSID. Which configuration setting must the administrator apply?",
  "options": [
   "Set the Wi-Fi Direct Client Policy to Not-Allow.",
   "Select a correctly configured Layer 2 ACL.",
   "Set the MFP Client Protection to Required.",
   "Set the P2P Block Action to Drop."
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Ciscoman021 Highly Voted \uf164 5 months, 3 weeks ago\nSelected Answer: D\n\nTo block all P2P-capable devices from the selected SSID, the network administrator should set the P2P Block Action to \"Drop\".\nP2P (Peer-to-Peer) traffic is often used by file sharing applications and other unauthorized software, which can pose a security risk to the network.\nBy setting the P2P Block Action to \"Drop\", the network administrator can prevent P2P traffic from being transmitted over the selected SSID.\nThe other configuration settings listed are not directly related to blocking P2P traffic. Wi-Fi Direct Client Policy, for example, is used to control Wi-Fi\nDirect clients, while MFP (Management Frame Protection) Client Protection helps prevent forged management frames. A Layer 2 ACL (Access\nControl List) can be used to control access to network resources based on MAC addresses, IP addresses, and other criteria, but it is not specifically\ndesigned to block P2P traffic.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q881",
  "num": 881,
  "question": "What is the primary purpose of a console port on a Cisco WLC?",
  "options": [
   "in-band management via an asynchronous transport",
   "in-band management via an IP transport",
   "out-of-band management via an asynchronous transport",
   "out-of-band management via an IP transport"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 beerbisceps1 Highly Voted \uf164 5 months, 1 week ago\nI paid to learn wrong info",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q882",
  "num": 882,
  "question": "Which port type does a lightweight AP use to connect to the wired network when it is configured in local mode?",
  "options": [
   "EtherChannel",
   "access",
   "LAG",
   "trunk"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 gewe Highly Voted \uf164 6 months, 4 weeks ago\nB , since in local mode all traffic goes tunnelled to WLC",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q883",
  "num": 883,
  "question": "Which step immediately follows receipt of the EAP success message when session resumption is disabled for an EAP-TLS connection?",
  "options": [
   "PMKID caching",
   "four-way handshake",
   "802.1X authentication",
   "EAPOL-key frame"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 lolungos 2 months, 3 weeks ago\nSelected Answer: D\n\nThis question is messed up. After the EAP Succes on a EAP-TLS scenario you start the 4-way handshake which is made by 4 EAPOL-KEY frames...\nKnowing cisco I would go D, but as usual more than one answer may apply",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q884",
  "num": 884,
  "question": "Refer to the exhibit. All interfaces are in the same VLAN. All switches are configured with the default STP priorities. During the STP elections,\nwhich switch becomes the root bridge?",
  "options": [
   "MDF-DC-1: 08:E0:43:42:70:13",
   "MDF-DC-2: 08:0E:18:22:05:97",
   "MDF-DC-4: 08:E0:19:A1:B3:19",
   "MDF-DC-3: 08:0E:18:1A:3C:9D"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 [Removed] 2 months, 2 weeks ago\nSelected Answer: D\n\nD. MDF-DC-3: 08:0E:18:1A:3C:9D",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q885",
  "num": 885,
  "question": "What are two port types used by a Cisco WLC for out-of-band management? (Choose two.)",
  "options": [
   "service",
   "console",
   "management",
   "distribution system",
   "redundant"
  ],
  "correct": "AB",
  "explanation": "\uf147 \uf007 [Removed] 2 months, 2 weeks ago\nSelected Answer: AD\n\nAnswers A and D\nhttps://www.cisco.com/c/en/us/td/docs/wireless/controller/8-5/config-guide/b_cg85/ports_and_interfaces.html\nControllers have two types of ports:\nDistribution system ports\nService port",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q886",
  "num": 886,
  "question": "What is a reason to implement LAG on a Cisco WLC?",
  "options": [
   "Allow for stateful failover between WLCs.",
   "Increase security by encrypting management frames.",
   "Increase the available throughput on the link.",
   "Enable the connected switch ports to use different Layer 2 configurations."
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 oatmealturkey Highly Voted \uf164 7 months ago\nSelected Answer: C\n\nA is incorrect, a LAG is configured on a single WLC's distribution system ports which are connected to a multilayer switch, not to another WLC. It\nincreases available bandwidth between the wired and wireless networks.\nThe redundancy port of a WLC is for connecting to the redundancy port of another WLC for high availability deployment designs. There is only one\nredundancy port on a WLC, so LAG is unrelated to that.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q887",
  "num": 887,
  "question": "A wireless access point is needed and must meet these requirements:\n\u2022 \u201czero-touch\u201d deployed and managed by a WLC\n\u2022 process only real-time MAC functionality\n\u2022 used in a split-MAC architecture\nWhich access point type must be used?",
  "options": [
   "mesh",
   "autonomous",
   "lightweight",
   "cloud-based"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 UAE7 6 months, 3 weeks ago\nanswer is correct\nhttps://www.cisco.com/c/en/us/support/docs/wireless/aironet-1200-series/70278-lap-faq.html",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q888",
  "num": 888,
  "question": "Which interface is used for out-of-band management on a WLC?",
  "options": [
   "management",
   "virtual",
   "dynamic",
   "service port"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 shaney67 3 weeks ago\nThe interface used for out-of-band management on a Wireless LAN Controller (WLC) is:\nA. management\nExplanation:\nThe management interface on a WLC is specifically designed for out-of-band management purposes. It's used to access the controller's\nmanagement functions, configure settings, monitor performance, and perform various administrative tasks.\nThe other options:\nB. virtual: The virtual interface is typically used to represent a logical interface, such as a VLAN interface, within the context of the controller. It's not\nprimarily used for direct out-of-band management.\nC. dynamic: \"Dynamic\" isn't a specific type of interface on a WLC, and it doesn't relate to out-of-band management.\nD. service port: The service port on a WLC is used for normal access-point traffic, not for out-of-band management.\nIn summary, the correct interface used for out-of-band management on a WLC is the A. management interface.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q889",
  "num": 889,
  "question": "Refer to the exhibit. How does SW2 interact with other switches in this VTP domain?",
  "options": [
   "It transmits and processes VTP updates from any VTP clients on the network on its trunk ports.",
   "It processes VTP updates from any VTP clients on the network on its access ports.",
   "It receives updates from all VTP servers and forwards all locally configured VLANs out all trunk ports.",
   "It forwards only the VTP advertisements that it receives on its trunk ports."
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 [Removed] 2 months, 1 week ago\nVTP is not part of CCNA 200-301",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q890",
  "num": 890,
  "question": "A network engineer is upgrading a small data center to host several new applications, including server backups that are expected to account for\nup to 90% of the bandwidth during peak times. The data center connects to the MPLS network provider via a primary circuit and a secondary\ncircuit. How does the engineer inexpensively update the data center to avoid saturation of the primary circuit by traffic associated with the\nbackups?",
  "options": [
   "Assign traffic from the backup servers to a dedicated switch.",
   "Place the backup servers in a dedicated VLAN.",
   "Advertise a more specific route for the backup traffic via the secondary circuit.",
   "Configure a dedicated circuit for the backup traffic."
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 aynur_ganbarova 1 month, 3 weeks ago\nThe correct answer is B. Place the backup servers in a dedicated VLAN.\nPlacing the backup servers in a dedicated VLAN allows for the segregation and control of the backup traffic within the data center. This solution\nhelps prevent saturation of the primary circuit by dedicating a specific VLAN for the backup traffic and allowing bandwidth management, traffic\nisolation, and the implementation of Quality of Service (QoS) policies.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q891",
  "num": 891,
  "question": "Refer to the exhibit. A network engineer started to configure two directly-connected routers as shown. Which command sequence must the\nengineer configure on R2 so that the two routers become OSPF neighbors?",
  "options": [
   "interface GigabitEthernet0/1\nip ospf 1 area 1",
   "router ospf 1\nnetwork 192.168.12.1 0.0.0.0 area 1",
   "interface GigabitEthernet0/1\nip ospf 1 area 0",
   "router ospf 1\nnetwork 192.168.12.0 0.0.0.127 area 0"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 gewe Highly Voted \uf164 7 months ago\nwrong answer as area is 0\u2026\nanswer A is correct",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q892",
  "num": 892,
  "question": "Refer to the exhibit. What does route 10.0.1.3/32 represent in the routing table?",
  "options": [
   "all hosts in the 10.0.1.0 subnet",
   "a single destination address",
   "the source 10.0.1.100",
   "the 10.0.0.0 network"
  ],
  "correct": "B",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q893",
  "num": 893,
  "question": "Refer to the exhibit. Router R14 is in the process of being configured. Which configuration must be used to establish a host route to a PC 10?",
  "options": [
   "ip route 10.80.65.10 255.255.255.254 10.80.65.1",
   "ip route 10.80.65.10 255.255.255.255 10.73.65.66",
   "ip route 10.73.65.66 0.0.0.255 10.80.65.10",
   "ip route 10.73.65.66 255.0.0.0 10.80.65.10"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Vikramaditya_J Highly Voted \uf164 4 months, 2 weeks ago\nSelected Answer: B\n\nA host route always uses /32 (=255.255.255.255) subnet mask and it's syntax is:\nip route <destination-ip-address> 255.255.255.255 <next-hop-ip-address>\nFor example, to create a host route for the host with IP address 192.168.1.100 with a next-hop router IP address of 10.1.1.1, the following command\ncan be used:\nip route 192.168.1.100 255.255.255.255 10.1.1.1",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q894",
  "num": 894,
  "question": "Refer to the exhibit. Which next-hop IP address has the least desirable metric when sourced from R1?",
  "options": [
   "10.10.10.4",
   "10.10.10.5",
   "10.10.10.3",
   "10.10.10.2"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 oatmealturkey Highly Voted \uf164 7 months ago\nSelected Answer: C\n\n10.10.10.5 is not even in the topology diagram or shown as a next hop in the routing table at all so how can it be B???",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q895",
  "num": 895,
  "question": "Refer to the exhibit. The New York router must be configured so that traffic to 2000::1 is sent primarily via the Atlanta site, with a secondary path\nvia Washington that has an administrative distance of 2. Which two commands must be configured on the New York router? (Choose two.)",
  "options": [
   "ipv6 route 2000::1/128 2012::1",
   "ipv6 route 2000::1/128 2012::1 5",
   "ipv6 route 2000::1/128 2012::2",
   "ipv6 route 2000::1/128 2023::2 5",
   "ipv6 route 2000::1/128 2023::3 2"
  ],
  "correct": "AE",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q896",
  "num": 896,
  "question": "Refer to the exhibit. The primary route across Gi0/0 is configured on both routers. A secondary route must be configured to establish connectivity\nbetween the workstation networks. Which command set must be configured to complete this task?",
  "options": [
   "R1 ip route 172.16.2.0 255.255.255.248 172.16.0.5 110\nR2 ip route 172.16.1.0 255.255.255.0 172.16.0.6 110",
   "R1 ip route 172.16.2.0 255.255.255.240 172.16.0.2 113\nR2 ip route 172.16.1.0 255.255.255.0 172.16.0.1 114",
   "R1 ip route 172.16.2.0 255.255.255.224 172.16.0.6 111\nR2 ip route 172.16.1.0 255.255.255.0 172.16.0.5 112",
   "R1 ip route 172.16.2.0 255.255.255.240 172.16.0.5 89\nR2 ip route 172.16.1.0 255.255.255.0 172.16.0.6 89"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Danthemann 1 month ago\nHonestly you only have to remember dinner masks here for the answer of /24 and /27",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q898",
  "num": 898,
  "question": "Refer to the exhibit. Which two values does router R1 use to determine the best path to reach destinations in network 1.0.0.0/8? (Choose two.)",
  "options": [
   "lowest cost to reach the next hop",
   "highest administrative distance",
   "lowest metric",
   "highest metric",
   "longest prefix match"
  ],
  "correct": "BC",
  "explanation": "\uf147 \uf007 oatmealturkey Highly Voted \uf164 7 months ago\nHighest administrative distance is never used to select the best route, we want lowest administrative distance.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q899",
  "num": 899,
  "question": "Refer to the exhibit. A public IPv6 address must be configured for internet access. Which command must be configured on the R2 WAN interface\nto the service provider?",
  "options": [
   "ipv6 address fe80::/10",
   "ipv6 address 2001:db8:433:37:7710:ffff:ffff:ffff/64 anycast",
   "ipv6 address 2001:db8:123:45::4/64",
   "ipv6 address fe80::260:3EFF:FE11:6770 link-local"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 wondaah Highly Voted \uf164 6 months, 1 week ago\nno brainer if you got this far :)",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q901",
  "num": 901,
  "question": "Refer to the exhibit. A network engineer must configure router R1 with a host route to the server. Which command must the engineer configure?",
  "options": [
   "R1(config)#ip route 10.10.10.10 255.255.255.255 192.168.0.2",
   "R1(config)#ip route 10.10.10.0 255.255.255.0 192.168.0.2",
   "R1(config)#ip route 0.0.0.0 0.0.0.0 192.168.0.2",
   "R1(config)#ip route 192.168.0.2 255.255.255.255 10.10.10.10"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 [Removed] 2 months, 1 week ago\nSelected Answer: A\n\nA. R1(config)#ip route 10.10.10.10 255.255.255.255 192.168.0.2 - is the right answer",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q902",
  "num": 902,
  "question": "Refer to the exhibit. IPv6 is being implemented within the enterprise. The command ipv6 unicast-routing is configured. Interface Gig0/0 on R1\nmust be configured to provide a dynamic assignment using the assigned IPv6 block. Which command accomplishes this task?",
  "options": [
   "ipv6 address 2001:DB8:FFFF:FCF3::64 link-local",
   "ipv6 address 2001:DB8:FFFF:FCF3::1/64",
   "ipv6 address 2001:DB8:FFFF:FCF3::64 eui-64",
   "ipv6 address autoconfig 2001:DB8:FFFF:FCF2::/64"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 [Removed] 2 months, 1 week ago\nSelected Answer: C\n\nAnswer C is correct",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q903",
  "num": 903,
  "question": "Refer to the exhibit. With which metric does router R1 learn the route to host 172.16.0.202?",
  "options": [
   "90",
   "110",
   "32445",
   "3184439"
  ],
  "correct": "C",
  "explanation": "Topic 1\n\n\f\uf147 \uf007 Stichy007 Highly Voted \uf164 6 months, 3 weeks ago\nSelected Answer: C\n\nC is correct, 172.16.0.202 would not be in the subnet for D",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q904",
  "num": 904,
  "question": "Refer to the exhibit. A network engineer must configure the link with these requirements:\n\u2022 Consume as few IP addresses as possible.\n\u2022 Leave at least two additional useable IP addresses for future growth.\nWhich set of configurations must be applied?",
  "options": [
   "R1(config-if)#ip address 10.10.10.1 255.255.255.252\nR2(config-if)#ip address 10.10.10.2 255.255.255.252",
   "R1(config-if)#ip address 10.10.10.1 255.255.255.240\nR2(config-if)#ip address 10.10.10.12 255.255.255.240",
   "R1(config-if)#ip address 10.10.10.1 255.255.255.248\nR2(config-if)#ip address 10.10.10.4 255.255.255.248",
   "R1(config-if)#ip address 10.10.10.1 255.255.255.0\nR2(config-if)#ip address 10.10.10.5 255.255.255.0"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 ahmt Highly Voted \uf164 7 months ago\nSelected Answer: C\n\nC is correct. 252(/30) ip subnet have only 2 usable ip address. 248(/29) ip subnet have 6 usable ip address.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q906",
  "num": 906,
  "question": "Refer to the exhibit. A static route must be configured on R86 to forward traffic for the 172.16.34.0/29 network, which resides on R14. Which\ncommand must be used to fulfill the request?",
  "options": [
   "ip route 10.73.65.65 255.255.255.248 172.16.34.0",
   "ip route 172.16.34.0 255.255.255.248 10.73.65.65",
   "ip route 172.16.34.0 0.0.0.7 10.73.65.64",
   "ip route 172.16.34.0 255.255.224.0 10.73.65.66"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 ahmt Highly Voted \uf164 7 months ago\nSelected Answer: B\n\nB is correct. 172.16.34.0/29 subnet mask is 255.255.255.248, next hop is interface on R14(10.73.65.65).",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q907",
  "num": 907,
  "question": "Refer to the exhibit. An engineer must configure a floating static route on an external EIGRP network. The destination subnet is the /29 on the LAN\ninterface of R86. Which command must be executed on R14?",
  "options": [
   "ip route 10.80.65.0 255.255.248.0 10.73.65.66 1",
   "ip route 10.80.65.0 255.255.255.240 fa0/1 89",
   "ip route 10.80.65.0 255.255.255.248 10.73.65.66 171",
   "ip route 10.73.65.66 0.0.0.224 10.80.65.0 255"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 SVN05 Highly Voted \uf164 6 months, 3 weeks ago\nSelected Answer: C\n\nExternal EIGRP has an AD of 170 unlike Regular EIGRP that has an AD of 90. So by putting 171 makes it a floating static route.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q908",
  "num": 908,
  "question": "Refer to the exhibit. What is the next-hop IP address for R2 so that PC2 reaches the application server via EIGRP?",
  "options": [
   "192.168.30.1",
   "10.10.10.6",
   "10.10.10.5",
   "192.168.20.1"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 [Removed] 2 months, 2 weeks ago\nSelected Answer: B\n\nAnswer B is correct",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q910",
  "num": 910,
  "question": "Refer to the exhibit. An IPv6 address must be obtained automatically on the LAN interface on R1. Which command must be implemented to\naccomplish the task?",
  "options": [
   "ipv6 address autocontig",
   "ipv6 address dhcp",
   "ipv6 address fe80::/10",
   "ipv6 address 2001:db8:d8d2:1008:4332:45:0570::/64"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Dutch012 Highly Voted \uf164 6 months, 2 weeks ago\nSelected Answer: A\n\nJust use ipv6 address autocontig guys, it's safer.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q911",
  "num": 911,
  "question": "Refer to the exhibit. A network engineer is updating the configuration on router R1 to connect a new branch office to the company network. R2 has\nbeen configured correctly. Which command must the engineer configure so that devices at the new site communicate with the main office?",
  "options": [
   "ip route 172.25.25.1 255.255.255.255 g0/2",
   "ip route 172.25.25.0 255.255.255.0 192.168.2.2",
   "ip route 172.25.25.0 255.255.255.0 192.168.2.1",
   "ip route 172.25.25.1 255.255.255.255 g0/1"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 papinski Highly Voted \uf164 6 months, 2 weeks ago\nSelected Answer: B\n\nOh wow! A right answer!",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q912",
  "num": 912,
  "question": "A network engineer must migrate a router loopback interface to the IPv6 address space. If the current IPv4 address of the interface is\n10.54.73.1/32, and the engineer configures IPv6 address 0:0:0:0:0:ffff:a36:4901, which prefix length must be used?",
  "options": [
   "/64",
   "/96",
   "/124",
   "/128"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 gewe Highly Voted \uf164 7 months ago\ni would go with D",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q913",
  "num": 913,
  "question": "A Cisco engineer notices that two OSPF neighbors are connected using a crossover Ethernet cable. The neighbors are taking too long to become\nfully adjacent. Which command must be issued under the interface configuration on each router to reduce the time required for the adjacency to\nreach the FULL state?",
  "options": [
   "ip ospf dead-interval 40",
   "ip ospf network broadcast",
   "ip ospf priority 0",
   "ip ospf network point-to-point"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 rogi2023 Highly Voted \uf164 5 months, 2 weeks ago\nSelected Answer: D\n\nD is correct asnwer. Because of ethernet (CSMA/CD) - With this cmd, we will avoid DR/BDR election.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q914",
  "num": 914,
  "question": "Refer to the exhibit. PC A is communicating with another device at IP address 10.227.225.255. Through which router does router Y route the\ntraffic?",
  "options": [
   "router A",
   "router B",
   "router C",
   "router D"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 oatmealturkey Highly Voted \uf164 7 months ago\nSelected Answer: D\n\nCorrect answer is D. Look for the longest match in the routing table.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q915",
  "num": 915,
  "question": "Refer to the exhibit. A packet sourced from 10.10.10.32 is destined for the Internet. What is the administrative distance for the destination route?",
  "options": [
   "0",
   "1",
   "2",
   "32"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 JJY888 Highly Voted \uf164 6 months, 1 week ago\nSelected Answer: B\n\nThis makes me angry at Cisco. Why try and trick people!? Look at the word SOURCED not destined. Then you realize that it's the default internet\naddress of 0.0.0.0. STATIC administrative distance is 1.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q916",
  "num": 916,
  "question": "Refer to the exhibit. Which format matches the Modified EUI-64 IPv6 interface address for the network 2001:db8::/64?",
  "options": [
   "2001:db8::5000:00ff:fe04:0000/64",
   "2001:db8::4332:5800:41ff:fe06:/64",
   "2001:db8::5000:0004:5678:0090/64",
   "2001:db8::5200:00ff:fe04:0000/64"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 oatmealturkey Highly Voted \uf164 7 months ago\nSelected Answer: D\n\nA is also incorrect because the 7th bit of the MAC address was not flipped/set to 1. D is the correct answer.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q917",
  "num": 917,
  "question": "What is the benefit of using FHRP?",
  "options": [
   "reduced ARP traffic on the network",
   "balancing traffic across multiple gateways in proportion to their loads",
   "higher degree of availability",
   "reduced management overhead on network routers"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Bhrino 3 months, 1 week ago\nSelected Answer: C\n\nb is correct bc fhrp just offers more redundancy there for more availability",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q918",
  "num": 918,
  "question": "Why is a first-hop redundancy protocol implemented?",
  "options": [
   "to enable multiple switches to operate as a single unit",
   "to provide load-sharing for a multilink segment",
   "to prevent loops in a network",
   "to protect against default gateway failures"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 ike110 Highly Voted \uf164 6 months, 3 weeks ago\nWho sets the answers? Do they do it incorrectly to test us? :)",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q919",
  "num": 919,
  "question": "Refer to the exhibit. A network engineer executes the show ip route command on router D. What is the next hop to network 192.168.1.0/24 and\nwhy?",
  "options": [
   "The next hop is 10.0.2.1 because it uses distance vector routing.",
   "The next hop is 10.0.0.1 because it has a higher metric.",
   "The next hop is 10.0.2.1 because it is a link-state routing protocol.",
   "The next hop is 10.0.0.1 because it has a better administrative distance."
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 mustdoit Highly Voted \uf164 6 months, 1 week ago\nSelected Answer: C\n\nAnswer should be C. Redistributed EIGRP which is same as external EIGRP has AD of 170. Correct me if I'm wrong",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q920",
  "num": 920,
  "question": "What is a similarity between global and unique local IPv6 addresses?",
  "options": [
   "They use the same process for subnetting.",
   "They are part of the multicast IPv6 group type.",
   "They are routable on the global internet.",
   "They are allocated by the same organization."
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Peter_panda Highly Voted \uf164 6 months ago\nSelected Answer: A\n\nUnique local addresses are NOT assigned by an organization.\nhttps://en.wikipedia.org/wiki/Unique_local_address\nA unique local address (ULA) is an Internet Protocol version 6 (IPv6) address in the address range fc00::/7.[1] Its purpose in IPv6 is somewhat\nanalogous to IPv4 private network addressing, but with significant differences. Unique local addresses may be used freely, without centralized\nregistration, inside a single site or organization or spanning a limited number of sites or organizations. They are routable only within the scope of\nsuch private networks, but not in the global IPv6 Internet.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q921",
  "num": 921,
  "question": "An engineer must configure the IPv6 address 2001:0db8:0000:0000:0700:0003:400F:572B on the serial0/0 interface of the HQ router and wants to\ncompress it for easier configuration. Which command must be issued on the router interface?",
  "options": [
   "ipv6 address 2001:db8::700:3:400F:572B",
   "ipv6 address 2001:db8:0::700:3:4F:572B",
   "ipv6 address 2001::db8:0000::700:3:400F:572B",
   "ipv6 address 2001:0db8::7:3:4F:572B"
  ],
  "correct": "A",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q922",
  "num": 922,
  "question": "Refer to the exhibit. A packet that is sourced from 172.16.3.254 is destined for the IP address of GigabitEthernet0/0/0. What is the subnet mask\nof the destination route?",
  "options": [
   "0.0.0.0",
   "255.255.254.0",
   "255.255.255.0",
   "255.255.255.255"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 j1mlawton Highly Voted \uf164 7 months ago\nSelected Answer: D\n\nIf we're looking for the destination subnet mask then I go for D 255.255.255.255",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q923",
  "num": 923,
  "question": "Refer to the exhibit. The iPv6 address for the LAN segment on router R2 must be configured using the EUI-64 format. Which address must be\nused?",
  "options": [
   "ipv6 address 2001:DB8:D8D2:1009:10A0:ABFF:FECC:1 eui-64",
   "ipv6 address 2001:DB8:D8D2:1009:1230:ABFF:FECC:1 eui-64",
   "ipv6 address 2001:DB8:D8D2:1009:4331:89FF:FF23:9 eui-64",
   "ipv6 address 2001:DB8:D8D2:1009:12A0:AB34:FFCC:1 eui-64"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 oatmealturkey Highly Voted \uf164 7 months ago\nSelected Answer: A\n\nAnswer is A. Where did 1230 come from (nowhere) vs. where did 10A0 come from (EUI-64)",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q924",
  "num": 924,
  "question": "Refer to the exhibit. According to the output, which parameter set is validated using the routing table of R7?",
  "options": [
   "R7 is missing a gateway of last resort.\nR7 is receiving routes that were redistributed in EIGRP.\nR7 will forward traffic destined to 10.90.8.0/24.",
   "R7 has a gateway of last resort available.\nR7 is receiving routes that were redistributed from BGP.\nR7 will drop traffic destined to 10.90.8.0/24.",
   "R7 is missing a gateway of last resort.\nR7 is receiving routes that were redistributed from BGP.\nR7 will forward traffic destined to 10.90.8.0/24.",
   "R7 has a gateway of last resort available.\nR7 is receiving routes that were redistributed in EIGRP.\nR7 will drop traffic destined to 10.90.8.0/24."
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 sdmejia01 Highly Voted \uf164 6 months, 4 weeks ago\nSelected Answer: D\n\nI think D is the best answer, however, I don't think the router would drop packets to 10.90.8.0/24, it would just send the packets out the gateway of\nlast resort. Correct me if I am wrong please.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q925",
  "num": 925,
  "question": "Which type of IPv4 address type helps to conserve the globally unique address classes?",
  "options": [
   "loopback",
   "multicast",
   "private",
   "public"
  ],
  "correct": "C",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q926",
  "num": 926,
  "question": "What are two purposes of HSRP? (Choose two.)",
  "options": [
   "It provides a mechanism for diskless clients to autoconfigure their IP parameters during boot.",
   "It improves network availability by providing redundant gateways.",
   "It groups two or more routers to operate as one virtual router.",
   "It passes configuration information to hosts in a TCP/IP network.",
   "It helps hosts on the network to reach remote subnets without a default gateway."
  ],
  "correct": "BC",
  "explanation": "\uf147 \uf007 Danthemann 1 month ago\nNot sure about this one. I though grouping together was VRRP? would be be and D",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q927",
  "num": 927,
  "question": "What are two benefits for using private IPv4 addressing? (Choose two.)",
  "options": [
   "They allow for Internet access from IoT devices.",
   "They alleviate the shortage of public IPv4 addresses.",
   "They provide a layer of security from internet threats.",
   "They supply redundancy in the case of failure.",
   "They offer Internet connectivity to endpoints on private networks."
  ],
  "correct": "BC",
  "explanation": "\uf147 \uf007 Shabeth 2 months, 2 weeks ago\ncorrect",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q929",
  "num": 929,
  "question": "Refer to the exhibit. Routers R1 and R2 are configured with RIP as the dynamic routing protocol. A network engineer must configure R1 with a\nfloating static route to service as a backup route to network 192.168.23. which command must the engineer configure on R1?",
  "options": [
   "ip route 192.168.23.0 255.255.255.0 192.168,13.3 100",
   "ip route 192.168.23.0 255.255.255.255 192.168.13.3 121",
   "ip route 192.168.23.0 255.255.255.0 192.168.13.3 121",
   "ip route 192.168.23.0 255.255.255.0 192.168.13.3"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 RidzV Highly Voted \uf164 6 months, 1 week ago\nSelected Answer: C\n\nFloating route must have AD greater than primary route via RIP which has AD of 120.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q930",
  "num": 930,
  "question": "When deploying a new network that includes both Cisco and third-party network devices, which redundancy protocol avoids the interruption of\nnetwork traffic if the default gateway router fails?",
  "options": [
   "VRRP",
   "FHRP",
   "GLBP",
   "HSRP"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 UAE7 Highly Voted \uf164 6 months, 3 weeks ago\nVRRP, Virtual Router Redundancy Protocol, is a vendor-neutral redundancy protocol that groups a cluster of physical routers (two or more routers)\nto produce a new single virtual router.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q931",
  "num": 931,
  "question": "What are two benefits of private IPv4 addressing? (Choose two.)",
  "options": [
   "propagates routing information to WAN links",
   "provides unlimited address ranges",
   "reuses addresses at multiple sites",
   "conserves globally unique address space",
   "provides external internet network connectivity"
  ],
  "correct": "CD",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q932",
  "num": 932,
  "question": "Which Cisco proprietary protocol ensures traffic recovers immediately, transparently, and automatically when edge devices or access circuits fail?",
  "options": [
   "FHRP",
   "VRRP",
   "HSRP",
   "SLB"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Cynthia2023 1 month, 4 weeks ago\nSLB (Server Load Balancing) is not a Cisco proprietary protocol. SLB is a generic networking technique used to distribute incoming network traffic\nacross multiple servers, and it is not tied to any specific vendor.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q933",
  "num": 933,
  "question": "Refer to the exhibit. Which entry is the longest prefix match for host IP address 192.168.10.5?",
  "options": [
   "1",
   "2",
   "3",
   "4"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 MoHTimo 1 month, 1 week ago\nif all the questions in the exam like this",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q934",
  "num": 934,
  "question": "Refer to the exhibit. How does router R1 handle traffic to 172.16.1.4 /30 subnet?",
  "options": [
   "It sends all traffic over the path via 172.16.9.5 using 172.16.4.4 as a backup.",
   "It sends all traffic over the path via 10.0.1.100.",
   "It sends all traffic over the path via 172.16.4.4.",
   "It load-balances traffic over 172.16.9.5 and 172.16.4.4"
  ],
  "correct": "D",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q935",
  "num": 935,
  "question": "Which two IPv6 addresses are used to provide connectivity between two routers on a shared link? (Choose two.)",
  "options": [
   "FF02::0001:FF00:0000/104",
   "ff06:bb43:cc13:dd16:1bb:ff14:7545:234d",
   "2002::512:1204b:1111::1/64",
   "2001:701:104b:1111::1/64",
   "::ffff:10.14.101.1/96"
  ],
  "correct": "CD",
  "explanation": "\uf147 \uf007 oatmealturkey Highly Voted \uf164 7 months ago\nSelected Answer: DE\n\nC is incorrect, it contains 2 double colons so not a valid address. ::ffff:10.14.101.1/96 is a valid IPv4-mapped IPv6 address, google it.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q937",
  "num": 937,
  "question": "Refer to the exhibit. Which action is taken by the router when a packet is sourced from 10.10.10.2 and destined for 10.10.10.16?",
  "options": [
   "It floods packets to all learned next hops.",
   "It uses a route that is similar to the destination address.",
   "It queues the packets waiting for the route to be learned.",
   "It discards the packets."
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 enzo86 Highly Voted \uf164 5 months, 1 week ago\ncorrect. is D.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q939",
  "num": 939,
  "question": "An engineer must configure a core router with a floating static default route to the backup router at 10.200.0.2. Which command meets the\nrequirements?",
  "options": [
   "ip route 0.0.0.0 0.0.0.0 10.200.0.2 1",
   "ip route 0.0.0.0 0.0.0.0 10.200.0.2 10",
   "ip route 0.0.0.0 0.0.0.0 10.200.0.2",
   "ip route 0.0.0.0 0.0.0.0 10.200.0.2 floating"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 Yannik123 3 months, 3 weeks ago\nSelected Answer: B\n\nFloating static defalut route must have a higher AD so B is the only correct answers.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q940",
  "num": 940,
  "question": "Refer to the exhibit. After configuring a new static route on the CPE, the engineer entered this series of commands to verify that the new\nconfiguration is operating normally. When is the static default route installed into the routing table?",
  "options": [
   "when a route to 203.0.113.1 is learned via BGP",
   "when 203.0.113.1 is no longer reachable as a next hop",
   "when the default route learned over external BGP becomes invalid",
   "when the default route learned over external BGP changes its next hop"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Kerrera 2 months ago\nSelected Answer: C\n\nFloating static route BGP back up, AD=21",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q941",
  "num": 941,
  "question": "Refer to the exhibit. Packets are flowing from 192.168.10.1 to the destination at IP address 192.168.20.75. Which next hop will the router select\nfor the packet?",
  "options": [
   "10.10.10.1",
   "10.10.10.11",
   "10.10.10.12",
   "10.10.10.14"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 AndreaGambera 2 weeks, 6 days ago\nB is Correct !",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q942",
  "num": 942,
  "question": "A router received three destination prefixes: 10.0.0.0/8, 10.0.0.0/16, and 10.0.0.0/24. When the show ip route command is executed, which output\ndoes it return?",
  "options": [
   "Gateway of last resort is 172.16.1.1 to network 0.0.0.0\no E2 10.0.0.0/8 [110/5] via 192.168.1.1, 0:01:00, Ethernet0\no E2 10.0.0.0/16[110/5] via 192.168.2.1, 0:01:00, Ethernet1\no E2 10.0.0.0/24[110/5] via 192.168.3.1, 0:01:00, Ethernet2",
   "Gateway of last resort is 172.16.1.1 to network 0.0.0.0\no E2 10.0.0.0/8 [110/5] via 192.168.1.1, 0:01:00, Ethernet0",
   "Gateway of last resort is 172.16.1.1 to network 0.0.0.0\no E2 10.0.0.0/24[110/5] via 192.168.3.1, 0:01:00, Ethernet2",
   "Gateway of last resort is 172.16.1.1 to network 0.0.0.0\no E2 10.0.0.0/16[110/5] via 192.168.2.1, 0:01:00, Ethernet1\no E2 10.0.0.0/24[110/5] via 192.168.3.1, 0:01:00, Ethernet2"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 shiv3003 Highly Voted \uf164 4 months, 3 weeks ago\nwait what??",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q943",
  "num": 943,
  "question": "Refer to the exhibit. User traffic originating within site B is failing to reach an application hosted on IP address 192.168.0.10, which is located\nwithin site A. What is determined by the routing table?",
  "options": [
   "The traffic is blocked by an implicit deny in an ACL on router2.",
   "The lack of a default route prevents delivery of the traffic.",
   "The traffic to 192.168.0.10 requires a static route to be configured in router1.",
   "The default gateway for site B is configured incorrectly."
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 oatmealturkey Highly Voted \uf164 7 months ago\nSelected Answer: B\n\nThere is no route in the routing table that matches the destination and there is no default route in the routing table for packets whose destination\ndon't match any of the routes, so the answer is B. You can't determine anything about how a default gateway has been configured by looking at a\nrouting table, default route/gateway of last resort is a different concept than default gateway.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q944",
  "num": 944,
  "question": "Refer to the exhibit. Which two values does router R1 use to identify valid routes for the R3 loopback address 1.1.1.3/32? (Choose two.)",
  "options": [
   "lowest cost to reach the next hop",
   "highest administrative distance",
   "lowest metric",
   "highest metric",
   "lowest administrative distance"
  ],
  "correct": "CE",
  "explanation": "\uf147 \uf007 andrizo 2 weeks, 2 days ago\nSelected Answer: CE\n\nCost is accounted in metric. The format is (AD/metric).",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q945",
  "num": 945,
  "question": "What is the role of community strings in SNMP operations?",
  "options": [
   "It translates alphanumeric MIB output values to numeric values.",
   "It passes the Active Directory username and password that are required for device access.",
   "It serves as a sequence tag on SNMP traffic messages.",
   "It serves as a password to protect access to MIB objects."
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 JJY888 6 months, 1 week ago\nSelected Answer: D\n\nhttps://www.dnsstuff.com/snmp-community-string#what-is-an-snmp-community-string",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q946",
  "num": 946,
  "question": "Which syslog severity level is considered the most severe and results in the system being considered unusable?",
  "options": [
   "Error",
   "Emergency",
   "Alert",
   "Critical"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 Ciscoman021 5 months, 1 week ago\nSelected Answer: B\n\nSyslog is a standard for logging messages and events on network devices. It uses severity levels to indicate the severity of the message or event\nbeing logged. The syslog severity levels range from 0 (Emergency) to 7 (Debug).\nAmong these severity levels, Emergency (severity level 0) is considered the most severe. Messages logged at this level indicate a catastrophic\nsystem failure or complete system shutdown, and the system is considered unusable. This severity level should be reserved for only the most\nsevere and critical events that require immediate attention.\nTherefore, the syslog severity level that is considered the most severe and results in the system being considered unusable is Emergency (severity\nlevel 0).",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q947",
  "num": 947,
  "question": "The clients and DHCP server reside on different subnets. Which command must be used to forward requests and replies between clients on the\n10.10.0.1/24 subnet and the DHCP server at 192.168.10.1?",
  "options": [
   "ip route 192.168.10.1",
   "ip dhcp address 192.168.10.1",
   "ip default-gateway 192.168.10.1",
   "ip helper-address 192.168.10.1"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 [Removed] 2 months, 1 week ago\nSelected Answer: D\n\nD. ip helper-address 192.168.10.1",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q948",
  "num": 948,
  "question": "Refer to the exhibit. Which command set configures ROUTER-1 to allow Internet access for users on the 192.168.1.0/24 subnet while using\n209.165.202.129 for Port Address Translation?",
  "options": [
   "ip nat pool CCNA 192.168.0.0 192.168.1.255 netmask 255.255.255.0\naccess-list 10 permit 192.168.0.0 0.0.0.255\nip nat inside source list 10 pool CCNA overload",
   "ip nat pool CCNA 209.165.202.129 209.165.202.129 netmask 255.255.255.255\naccess-list 10 permit 192.168.1.0 255.255.255.0\nip nat inside source list 10 pool CCNA overload",
   "ip nat pool CCNA 192.168.0.0 192.168.1.255 netmask 255.255.255.0\naccess-list 10 permit 192.168.0.0 255.255.255.0\nip nat inside source list 10 pool CCNA overload",
   "ip nat pool CCNA 209.165.202.129 209.165.202.129 netmask 255.255.255.255\naccess-list 10 permit 192.168.1.0 0.0.0.255\nip nat inside source list 10 pool CCNA overload"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 oatmealturkey Highly Voted \uf164 7 months ago\nSelected Answer: D\n\nNAT policies perform address translation by translating internal IP addresses to the addresses in a NAT pool.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q949",
  "num": 949,
  "question": "Which IP header field is changed by a Cisco device when QoS marking is enabled?",
  "options": [
   "ECN",
   "Header Checksum",
   "Type of Service",
   "DSCP"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 Rynurr Highly Voted \uf164 6 months, 3 weeks ago\nSelected Answer: C\n\nC. Type of Service\nFor sure",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q951",
  "num": 951,
  "question": "Which DSCP per-hop forwarding behavior is divided into subclasses based on drop probability?",
  "options": [
   "expedited",
   "default",
   "assured",
   "class-selector"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 oatmealturkey Highly Voted \uf164 7 months ago\nSelected Answer: C\n\nAssured forwarding, look it up",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q952",
  "num": 952,
  "question": "What are two features of the DHCP relay agent? (Choose two.)",
  "options": [
   "assigns DNS locally and then forwards request to DHCP server",
   "minimizes the necessary number of DHCP servers",
   "permits one IP helper command under an individual Layer 3 interface",
   "is configured under the Layer 3 interface of a router on the client subnet",
   "allows only MAC-to-IP reservations to determine the local subnet of a client"
  ],
  "correct": "AB",
  "explanation": "\uf147 \uf007 oatmealturkey Highly Voted \uf164 7 months ago\nSelected Answer: BD\n\nThe DHCP relay agent itself does not assign anything locally or otherwise DNS or otherwise, so A is incorrect. It does minimize the number of DHCP\nservers because it means we don't need a DHCP server on every subnet, so B is correct. You actually can configure more than one IP helper\ncommand under an individual Layer 3 interface, so C is incorrect and D is correct.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q953",
  "num": 953,
  "question": "A DHCP pool has been created with the name CONTROL. The pool uses the next to last usable IP address as the default gateway for the DHCP\nclients. The server is located at 172.16.32.15. What is the next step in the process for clients on the 192.168.52.0/24 subnet to reach the DHCP\nserver?",
  "options": [
   "ip helper-address 172.16.32.15",
   "ip default-gateway 192.168.52.253",
   "ip forward-protocol udp 137",
   "ip detault-network 192.168.52.253"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 oatmealturkey Highly Voted \uf164 7 months ago\nSelected Answer: A\n\nThe question states that the pool has been created and that it uses the next to last usable IP address as the default gateway for the DHCP clients.\nSo that already implies that B is not the answer. But just to confirm once and for all, 192.168.52.253 is NOT the last usable address, that would be\n192.168.52.254. The answer is A because we need to configure a helper address since the DHCP server is on a different subnet.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q954",
  "num": 954,
  "question": "Which two transport layer protocols carry syslog messages? (Choose two.)",
  "options": [
   "IP",
   "RTP",
   "TCP",
   "UDP",
   "ARP"
  ],
  "correct": "CD",
  "explanation": "\uf147 \uf007 [Removed] 2 months, 2 weeks ago\nSelected Answer: CD\n\nGiven answers are correct - Transport layer protocols are TCP and UDP",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q955",
  "num": 955,
  "question": "What is the purpose of classifying network traffic in QoS?",
  "options": [
   "configures traffic-matching rules on network devices",
   "services traffic according to its class",
   "identifies the type of traffic that will receive a particular treatment",
   "writes the class identifier of a packet to a dedicated field in the packet header"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Zepar 3 months, 3 weeks ago\nCorrect",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q957",
  "num": 957,
  "question": "Refer to the exhibit. Which configuration enables DHCP addressing for hosts connected to interface FastEthernet0/1 on router R3?",
  "options": [
   "interface FastEthernet0/1\nip helper-address 10.0.1.1\n!\naccess-list 100 permit tcp host 10.0.1.1 eq 67 host 10.148.2.1",
   "interface FastEthernet0/1\nip helper-address 10.0.1.1\n!\naccess-list 100 permit udp host 10.0.1.1 eq 67 host 10.148.2.1",
   "interface FastEthernet0/0\nip helper-address 10.0.1.1\n!\naccess-list 100 permit host 10.0.1.1 host 10.148.2.1 eq bootps",
   "interface FastEthernet0/1\nip helper-address 10.0.1.1\n!\naccess-list 100 permit udp host 10.0.1.1 eq bootps host 10.148.2.1"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 Dutch012 Highly Voted \uf164 6 months, 2 weeks ago\nWhy we should care about ACL? it is not applied on the F 0/1 interface\nso logically B and D are right\nwhat do you think guys?",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q959",
  "num": 959,
  "question": "Which two features introduced in SNMPv2 provide the ability to retrieve large amounts of data in one request and acknowledge a trap using PDUs?\n(Choose two.)",
  "options": [
   "Get",
   "GetNext",
   "Set",
   "GetBulk",
   "Inform"
  ],
  "correct": "DE",
  "explanation": "\uf147 \uf007 mageknight Highly Voted \uf164 6 months, 3 weeks ago\nSNMPv2 introduced two features that provide the ability to retrieve large amounts of data in one request and acknowledge a trap using PDUs.\nThese features are:\nGetBulkRequest: This feature allows a management station to retrieve a large amount of data in one request, reducing the number of requests\nneeded to retrieve the same information. The GetBulkRequest PDU specifies a starting OID and a maximum number of variables to be returned in a\nsingle response.\nInformRequest: This feature is used to acknowledge receipt of a trap message from an agent. The InformRequest PDU is similar to the trap PDU,\nbut it includes a request identifier, which allows the management station to match the acknowledgment with the original trap. The InformRequest\nalso requires an acknowledgment from the receiving device, which provides greater reliability in trap delivery.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q961",
  "num": 961,
  "question": "What is the purpose of configuring different levels of syslog for different devices on the network?",
  "options": [
   "to set the severity of syslog messages from each device",
   "to control the number of syslog messages from different devices that are stored locally",
   "to identify the source from which each syslog message originated",
   "to rate-limit messages for different severity levels from each device"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 NetworkGeek00 1 month, 1 week ago\nSelected Answer: A\n\nA is correct",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q962",
  "num": 962,
  "question": "Refer to the exhibit. The DHCP server is configured with a DHCP pool for each of the subnets represented. Which command must be configured on\nswitch SW1 to allow DHCP clients on VLAN 10 to receive dynamic IP addresses from the DHCP server?",
  "options": [
   "SW1(config-if)#ip helper-address 192.168.10.1",
   "SW1(config-if)#ip helper-address 192.168.20.1",
   "SW1(config-if)#ip helper-address 192.168.20.2",
   "SW1(config-if)#ip helper-address 192.168.10.2"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Rynurr Highly Voted \uf164 6 months, 3 weeks ago\nSelected Answer: C\n\nWhy \"D\"? The correct answer is \"C\".\nip helper-address 192.168.20.2",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q964",
  "num": 964,
  "question": "Refer to the exhibit. Which minimum configuration items are needed to enable Secure Shell version 2 access to R15?",
  "options": [
   "Router(config)#hostname R15 R15(config)#ip domain-name cisco.com\nR15(config)#crypto key generate rsa general-keys modulus 1024\nR15(config)#ip ssh version 2 R15(config-line)#line vty 0 15 R15(config-line)# transport input ssh",
   "Router(config)#crypto key generate rsa general-keys modulus 1024\nRouter(config)#ip ssh version 2 Router(config-line)#line vty 015\nRouter(config-line)# transport input ssh\nRouter(contig)#ip ssh logging events\nR15(config)#ip ssh stricthostkeycheck",
   "Router(config)#hostname R15 R15(config)#crypto key generate rsa general-keys modulus 1024\nR15(config-line)#line vty 0 15 R15(config-line)# transport input ssh\nR15(config)#ip ssh source-interface Fa0/0\nR15(config)#ip ssh stricthostkeycheck",
   "Router(config)#ip domain-name cisco.com\nRouter(config)#crypto key generate rsa general-keys modulus 1024\nRouter(contig)#ip ssh version 2 Router(config-line)#line vty 0 15\nRouter(config-line)# transport input all\nRouter(config)#ip ssh logging events"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 sdmejia01 Highly Voted \uf164 6 months, 3 weeks ago\nI think answer is A. You need to set a hostname, a domain name and then the crypto key to enable SSH.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q965",
  "num": 965,
  "question": "hostname CPE\nservice password-encryption\nip domain name ccna.cisco.com\nip name-server 198.51.100.210\ncrypto key generate rsa modulus 1024\nusername admin privilege 15 secret s0m3s3cr3t\nline vty 0 4\ntransport input ssh\nlogin local\nRefer to the exhibit. An engineer executed the script and added commands that were not necessary for SSH and now must remove the commands.\nWhich two commands must be executed to correct the configuration? (Choose two.)",
  "options": [
   "no ip name-serveer 198.51.100.210",
   "no login local",
   "no service password-encryption",
   "no ip domain mame ccna.cisco.com",
   "no hostname CPE"
  ],
  "correct": "AB",
  "explanation": "\uf147 \uf007 oatmealturkey Highly Voted \uf164 7 months ago\nSelected Answer: AC\n\nLogin local is required to implement SSH in this case because we are not using AAA authentication. But password service-encryption is not needed\nbecause all it does is encrypt any plaintext passwords displayed in the running configuration. It has nothing to do with SSH. For example, you can\nconfigure a plaintext password for Telnet access, do service password-encryption to scramble it in the running config, but then when you Telnet\ninto the device, sniff the packet and see that the password is still in plaintext.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q966",
  "num": 966,
  "question": "Which two actions are taken as the result of traffic policing? (Choose two.)",
  "options": [
   "bursting",
   "dropping",
   "remarking",
   "fragmentation",
   "buffering"
  ],
  "correct": "AE",
  "explanation": "\uf147 \uf007 oatmealturkey Highly Voted \uf164 7 months ago\nSelected Answer: BC\n\nTraffic policing does not cause bursting at all, in fact it imposes a ceiling so it limits it if anything. Traffic policing enforcement causes packets to be\neither dropped or re-marked.\nhttps://www.cisco.com/c/en/us/support/docs/quality-of-service-qos/qos-policing/19645-policevsshape.html",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q967",
  "num": 967,
  "question": "Which two server types support domain name to IP address resolution? (Choose two.)",
  "options": [
   "authoritative",
   "web",
   "file transfer",
   "resolver",
   "ESX host"
  ],
  "correct": "BD",
  "explanation": "\uf147 \uf007 oatmealturkey Highly Voted \uf164 7 months ago\nSelected Answer: AD\n\nWeb server is not for DNS! This source explains why resolver & authoritative are the correct answers:\nhttps://www.cloudns.net/wiki/article/202/#:~:text=Authoritative%20DNS%20nameservers%20provide%20answers,etc%20for%20a%20domain%20n\name.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q968",
  "num": 968,
  "question": "What is a purpose of traffic shaping?",
  "options": [
   "It enables policy-based routing.",
   "It enables dynamic flow identification.",
   "It provides best-effort service.",
   "It limits bandwidth usage."
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Ciscoman021 Highly Voted \uf164 5 months, 2 weeks ago\nSelected Answer: D\n\nThe purpose of traffic shaping is to limit the bandwidth usage of certain types of network traffic in order to prevent congestion and ensure that\ncritical applications receive the necessary network resources.\nTraffic shaping is typically used to enforce Quality of Service (QoS) policies that prioritize certain types of network traffic, such as voice and video\ntraffic, over other less critical traffic. By limiting the bandwidth usage of non-critical traffic, traffic shaping can help prevent network congestion and\nensure that the available bandwidth is allocated in a way that meets the organization's priorities.\nTherefore, the correct answer is option D: it limits bandwidth usage.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q969",
  "num": 969,
  "question": "An engineering team asks an implementer to configure syslog for warning conditions and error conditions. Which command does the implementer\nconfigure to achieve the desired result?",
  "options": [
   "logging trap 5",
   "logging trap 2",
   "logging trap 3",
   "logging trap 4"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 ac89l Highly Voted \uf164 4 months, 1 week ago\n0Every 1Awesome 2Cisco 3Engineer 4Will 5Need 6Icecream 7Daily",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q971",
  "num": 971,
  "question": "Which WLC management connection type is vulnerable to man-in-the-middle attacks?",
  "options": [
   "console",
   "Telnet",
   "SSH",
   "HTTPS"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 no_blink404 3 months, 1 week ago\nSelected Answer: B\n\nNo encryption would mean more chance of eavesdropping on the connection. Correct answer is B",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q972",
  "num": 972,
  "question": "Refer to the exhibit. An engineer booted a new switch and applied this configuration via the console port. Which additional configuration must be\napplied to allow administrators to authenticate directly to global configuration mode via Telnet using a local username and password?",
  "options": [
   "R1(config)#username admin R1(config-if)#line vty 0 4 R1(config-line)#password p@ss1234\nR1(config-line)#transport input telnet",
   "R1(config)#username admin privilege 15 secret p@ss1234\nR1(config-if)#line vty 0 4 R1(config-line)#login local",
   "R1(config)#username admin secret p@ss1234\nR1(config-if)#line vty 0 4 R1(config-line)#login local R1(config)#enable secret p@ss1234",
   "R1(config)#username admin R1(config-if)#line vty 0 4 R1(config-line)#password p@ss1234"
  ],
  "correct": "B",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q973",
  "num": 973,
  "question": "Which type of encryption does WPA1 use for data protection?",
  "options": [
   "PEAP",
   "TKIP",
   "AES",
   "EAP"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 gewe Highly Voted \uf164 7 months ago\nTKIP is correct",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q974",
  "num": 974,
  "question": "Refer to the exhibit. A network administrator must permit traffic from the 10.10.0.0/24 subnet to the WAN on interface Serial0. What is the effect\nof the configuration as the administrator applies the command?",
  "options": [
   "The router accepts all incoming traffic to Serial0 with the last octet of the source IP set to 0.",
   "The permit command fails and returns an error code.",
   "The router fails to apply the access list to the interface.",
   "The sourced traffic from IP range 10.0.0.0 - 10.0.0.255 is allowed on Serial0."
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 oatmealturkey Highly Voted \uf164 6 months, 4 weeks ago\nSelected Answer: C\n\nThe permit command does not fail, it is syntactically correct even though the ACL would not work as intended because it would not allow traffic\nfrom the 10.10.0.0/24 subnet. The answer is C because ip access-list 10 in is not a valid command and is rejected. The correct command would be\nip access-group 10 in.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q976",
  "num": 976,
  "question": "A network engineer must configure an access list on a new Cisco IOS router. The access list must deny HTTP traffic to network 10.125.128.32/27\nfrom the 192.168.240.0/20 network, but it must allow the 192.168.240.0/20 network to reach the rest of the 10.0.0.0/8 network. Which\nconfiguration must the engineer apply?",
  "options": [
   "ip access-list extended deny_outbound\n10 permit ip 192.168.240.0 255.255.240.0 10.0.0.0 255.0.0.0\n20 deny tcp 192.168.240.0 255.255.240.0 10.125.128.32 255.255.255.224 eq 443\n30 permit ip any any",
   "ip access-list extended deny_outbound\n10 deny tcp 192.168.240.0 0.0.15.255 10.125.128.32 0.0.0.31 eq 80\n20 permit ip 192.168.240.0 0.0.15.255 10.0.0.0 0.255.255.255\n30 deny ip any any log",
   "ip access-list extended deny_outbound\n10 deny tcp 10.125.128.32 255.255.255.224 192.168.240.0 255.255.240.0 eq 443\n20 deny tcp 192.168.240.0 255.255.240.0 10.125.128.32 255.255.255.224 eq 443\n30 permit ip 192.168.240.0 255.255.240.0 10.0.0.0 255.0.0.0",
   "ip access-list extended deny_outbound\n10 deny tcp 192.168.240.0 0.0.15.255 any eq 80\n20 deny tcp 192.168.240.0 0.0.15.255 10.125.128.32 0.0.0.31 eq 80\n30 permit ip 192.168.240.0 0.0.15.255 10.0.0.0 0.255.255.255"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 sdmejia01 Highly Voted \uf164 6 months, 3 weeks ago\nSelected Answer: B\n\nB is correct",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q977",
  "num": 977,
  "question": "What is the definition of backdoor malware?",
  "options": [
   "malicious code that is installed onto a computer to allow access by an unauthorized user",
   "malicious program that is used to launch other malicious programs",
   "malicious code that infects a user machine and then uses that machine to send spam",
   "malicious code with the main purpose of downloading other malicious code"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 oatmealturkey Highly Voted \uf164 7 months ago\nSelected Answer: A\n\nWrong, the correct answer is A.\nhttps://en.wikipedia.org/wiki/Backdoor_(computing)",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q978",
  "num": 978,
  "question": "What does WPA3 provide in wireless networking?",
  "options": [
   "backward compatibility with WPA and WPA2",
   "safeguards against brute force attacks with SAE",
   "increased security and requirement of a complex configuration",
   "optional Protected Management Frame negotiation"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 sdmejia01 Highly Voted \uf164 6 months, 3 weeks ago\nSelected Answer: B\n\nCorrect answer is B. https://www.swascan.com/wi-fi-security/",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q979",
  "num": 979,
  "question": "Which global command encrypts all passwords in the running configuration?",
  "options": [
   "service password-encryption",
   "enable password-encryption",
   "enable secret",
   "password-encrypt"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 sdmejia01 Highly Voted \uf164 6 months, 3 weeks ago\nSelected Answer: A\n\nCorrect answer is A. https://community.cisco.com/t5/other-network-architecture-subjects/service-password-encryption-command/td-p/269324",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q980",
  "num": 980,
  "question": "Refer to the exhibit. A network administrator is configuring a router for user access via SSH. The service-password encryption command has been\nissued. The configuration must meet these requirements:\n\u2022 Create the username as CCUser.\n\u2022 Create the password as NA!2$cc.\n\u2022 Encrypt the user password.\nWhat must be configured to meet the requirements?",
  "options": [
   "username CCUser privilege 10 password NA!2$cc",
   "username CCUser privilege 15 password NA!2$cc\nenable secret 0 NA!2$cc",
   "username CCUser secret NA!2Sce",
   "username CCUser password NA!2$cc\nenable password level 5 NA!2$cc"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 dropspablo 2 months, 1 week ago\nA request was made to encrypt the password, but both the \"#password\" and \"#secret\" commands fulfill this request, since the \"#service passwordencryption\" command is enabled. The difference is that other commands include privilege (authorization) levels, and this was not requested. Letter\nC is correct, as it meets all requirements, without exaggeration. The encryption service in this case is just to confuse.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q981",
  "num": 981,
  "question": "Refer to the exhibit. A network engineer started to configure port security on a new switch. These requirements must be met:\n\u2022 MAC addresses must be learned dynamically.\n\u2022 Log messages must be generated without disabling the interface when unwanted traffic is seen.\nWhich two commands must be configured to complete this task? (Choose two.)",
  "options": [
   "SW(config-if)#switchport port-security violation restrict",
   "SW(config-if)#switchport port-security mac-address 0010.7B84.45E6",
   "SW(config-if)#switchport port-security maximum 2",
   "SW(config-if)#switchport port-security violation shutdown",
   "SW(config-if)#switchport port-security mac-address sticky"
  ],
  "correct": "BC",
  "explanation": "\uf147 \uf007 Yaqub009 Highly Voted \uf164 6 months, 3 weeks ago\nSelected Answer: AE\n\n1.MAC addresses must be learned dynamically :\nE. SW(config-if)#switchport port-security mac-address sticky because,\n--sticky command automatically learns the MAC address of the computer connected to SW.\n2.Log messages must be generated without disabling the interface when unwanted traffic is seen:\n--A. SW(config-if)#switchport port-security violation restrict.\nSo, correct answers are A and E.\nB is incorrect, because this MAC is not dynamically learned\nC is incorrect, because they don`t say that there can have max 2 MAC addresses\nD is incorrect, because Shutdown mode is disable the interface.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q982",
  "num": 982,
  "question": "Which type of security program is violated when a group of employees enters a building using the ID badge of only one person?",
  "options": [
   "intrusion detection",
   "network authorization",
   "physical access control",
   "user awareness"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Cynthia2023 1 month ago\nSelected Answer: C\n\nGiven Answer is correct.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q983",
  "num": 983,
  "question": "What are two protocols within the IPsec suite? (Choose two.)",
  "options": [
   "3DES",
   "AES",
   "ESP",
   "TLS",
   "AH"
  ],
  "correct": "CE",
  "explanation": "\uf147 \uf007 mageknight Highly Voted \uf164 6 months, 3 weeks ago\nIPsec (Internet Protocol Security) is a suite of protocols used for securing internet protocol (IP) communications. The two protocols within the IPsec\nsuite are:\nAuthentication Header (AH): AH provides data authentication and integrity protection for IP packets, but does not provide encryption. AH\ncalculates a hash value over the IP packet and some additional data, and places the result in a new header that is added to the packet.\nEncapsulating Security Payload (ESP): ESP provides both encryption and data authentication for IP packets. ESP encrypts the original IP packet and\nplaces it inside a new packet, along with a new ESP header that provides data authentication and integrity protection.\nBoth AH and ESP protocols can be used alone or in combination to provide secure communication between two network devices. AH and ESP are\noften used in conjunction with the Internet Key Exchange (IKE) protocol, which is used to negotiate and establish security associations (SAs)\nbetween devices.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q984",
  "num": 984,
  "question": "Refer to the exhibit. Local access for R4 must be established and these requirements must be met:\n\u2022 Only Telnet access is allowed.\n\u2022 The enable password must be stored securely.\n\u2022 The enable password must be applied in plain text.\n\u2022 Full access to R4 must be permitted upon successful login.\nWhich configuration script meets the requirements?",
  "options": [
   "!\nconf t\n!\nusername test1 password testpass1\nenable secret level 15 0 Test123\n!\nline vty 0 15\nlogin local\ntransport input telnet",
   "!\nconfig t\n!\nusername test1 password testpass1\nenable password level 15 0 Test123\n!\nline vty 0 15\nlogin local\ntransport input all",
   "!\nconfig t\n!\nusername test1 password testpass1\nenable password level 1 7 Test123\n!\nline vty 0 15\naccounting exec default\ntransport input all",
   "!\nconfig t\n!\nusername test1 password testpass1\nenable secret level 1 0 Test123\n!\nline vty 0 15\n\nTopic 1\n\n\flogin authentication\npassword Test123\ntransport input telnet"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 mda2h 1 month, 1 week ago\nSelected Answer: A\n\nPossible solutions are A and D.\nD has login authentication => tells switch to use aaa to authenticate => wrong cause we cant local access\nThus A is correct",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q985",
  "num": 985,
  "question": "What is a characteristic of RSA?",
  "options": [
   "It uses preshared keys for encryption.",
   "It is an asymmetric encryption algorithm.",
   "It is a symmetric decryption algorithm.",
   "It requires both sides to have identical keys for encryption."
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 NetworkGeek00 1 month, 1 week ago\nSelected Answer: B\n\nB is correct",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q986",
  "num": 986,
  "question": "What are two differences between WPA2 and WPA3 wireless security? (Choose two.)",
  "options": [
   "WPA2 uses 192-bit key encryption, and WPA3 requires 256-bit key encryption.",
   "WPA3 uses AES for stronger protection than WPA2, which uses SAE.",
   "WPA2 uses 128-bit key encryption, and WPA3 supports 128-bit and 192-bit key encryption.",
   "WPA3 uses SAE for stronger protection than WPA2, which uses AES.",
   "WPA3 uses AES for stronger protection than WPA2, which uses TKIP."
  ],
  "correct": "CD",
  "explanation": "\uf147 \uf007 mageknight Highly Voted \uf164 6 months, 3 weeks ago\nWPA2 uses 128-bit key encryption with AES, while WPA3 supports 128-bit and 192-bit key encryption with AES and the new SAE protocol for key\nestablishment.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q987",
  "num": 987,
  "question": "What is an enhancement implemented in WPA3?",
  "options": [
   "applies 802.1x authentication and AES-128 encryption",
   "employs PKI and RADIUS to identify access points",
   "uses TKIP and per-packet keying",
   "defends against deauthentication and disassociation attacks"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Goena 6 months, 2 weeks ago\nSelected Answer: D\n\nD is correct:\nAdditionally, WPA3 personal and enterprise connections requires PMF (Protected Management Frame) negotiation mandatorily. PMF provides an\nadditional layer of protection from de-authentication and disassociation attacks.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q988",
  "num": 988,
  "question": "Which action must be taken when password protection is implemented?",
  "options": [
   "Use less than eight characters in length when passwords are complex.",
   "Include special characters and make passwords as long as allowed.",
   "Share passwords with senior IT management to ensure proper oversight.",
   "Store passwords as contacts on a mobile device with single-factor authentication."
  ],
  "correct": "B",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q990",
  "num": 990,
  "question": "An engineer must configure R1 for a new user account. The account must meet these requirements:\n\u2022 It must be configured in the local database.\n\u2022 The username is engineer2.\n\u2022 It must use the strongest password configurable.\nWhich command must the engineer configure on the router?",
  "options": [
   "R1(config)# username engineer2 privilege 1 password 7 test2021",
   "R1(config)# username engineer2 secret 4 $1$b1Ju$kZbBS1Pyh4QzwXyZ",
   "R1(config)# username engineer2 algorithm-type scrypt secret test2021",
   "R1(config)# username engineer2 secret 5 password $1$b1Ju$kZbBS1Pyh4QzwXyZ"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Yinxs 3 weeks ago\nI tried all commands on GNS3 Cisco C3725 router, all are wrong.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q991",
  "num": 991,
  "question": "Which two VPN technologies are recommended by Cisco for multiple branch offices and large-scale deployments? (Choose two.)",
  "options": [
   "GETVPN",
   "DMVPN",
   "site-to-site VPN",
   "clientless VPN",
   "IPsec remote access"
  ],
  "correct": "AB",
  "explanation": "\uf147 \uf007 mageknight Highly Voted \uf164 6 months, 3 weeks ago\nDMVPN and FlexVPN are more commonly recommended by Cisco for large-scale VPN deployments, GETVPN can be a viable alternative in certain\nsituations where a tunnel-less VPN solution is desirable. Ultimately, the choice between these VPN technologies will depend on specific\nrequirements and factors, such as the underlying network topology, transport technologies, and security policies",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q993",
  "num": 993,
  "question": "What is a characteristic of RSA?",
  "options": [
   "It uses preshared keys for encryption.",
   "It is a public-key cryptosystem.",
   "It is a private-key encryption algorithm.",
   "It requires both sides to have identical keys."
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 mageknight Highly Voted \uf164 6 months, 3 weeks ago\nRSA is a public-key cryptosystem. This means that it uses a pair of keys, one of which is kept private and the other of which is made public. The\npublic key can be distributed to anyone who wants to send encrypted messages to the owner of the private key, while the private key is kept secret\nand is used by the owner to decrypt messages.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q994",
  "num": 994,
  "question": "What is used as a solution for protecting an individual network endpoint from attack?",
  "options": [
   "antivirus software",
   "wireless controller",
   "router",
   "Cisco DNA Center"
  ],
  "correct": "A",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q995",
  "num": 995,
  "question": "Which security method is used to prevent man-in-the-middle attacks?",
  "options": [
   "authentication",
   "anti-replay",
   "authorization",
   "accounting"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 mageknight Highly Voted \uf164 6 months, 3 weeks ago\nAnti-replay is a security method that is used to prevent man-in-the-middle attacks by ensuring that network packets are received and processed\nonly once. This is typically accomplished by adding a unique identifier, called a sequence number or nonce, to each packet. The recipient of the\npacket keeps track of the sequence numbers that it has received and processes only packets that have not been received before. If a packet with a\nduplicate sequence number is received, it is discarded.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q996",
  "num": 996,
  "question": "Which cipher is supported for wireless encryption only with the WPA2 standard?",
  "options": [
   "RC4",
   "AES",
   "SHA",
   "AES256"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 mda2h 1 month, 1 week ago\nDafuq Cisco WPA3 standard uses AES as well ...",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q997",
  "num": 997,
  "question": "Refer to the exhibit. This ACL is configured to allow client access only to HTTP, HTTPS, and DNS services via UDP. The new administrator wants to\nadd TCP access to the ONS service. Which configuration updates the ACL efficiently?",
  "options": [
   "no ip access-list extended Services\nip access-list extended Services\n30 permit tcp 10.0.0.0 0.255.255.255 host 198.51.100.11 eq domain",
   "ip access-list extended Services\n35 permit tcp 10.0.0.0 0.255.255.255 host 198.51.100.11 eq domain",
   "ip access-list extended Services\npermit tcp 10.0.0.0 0.255.255.255 host 198.51.100.11 eq domain",
   "no ip access-list extended Services\nip access-list extended Services\npermit udp 10.0.0.0 0.255.255.255 any eq 53\npermit tcp 10.0.0.0 0.255.255.255 host 198.51.100.11 eq domain deny ip any any log"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 gewe Highly Voted \uf164 6 months, 4 weeks ago\nits said add so option B would be better",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q998",
  "num": 998,
  "question": "Which WPA mode uses PSK authenticaton?",
  "options": [
   "Local",
   "Personal",
   "Enterprise",
   "Client"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 Ciscoman021 Highly Voted \uf164 5 months, 3 weeks ago\nSelected Answer: B\n\nThe WPA mode that uses PSK (Pre-Shared Key) authentication is the Personal mode.\nWPA (Wi-Fi Protected Access) is a security protocol used in wireless networks to protect the communication between devices. WPA has two modes\nof operation: Personal mode and Enterprise mode.\nPersonal mode, also known as WPA-PSK (Pre-Shared Key), uses a shared secret key (PSK) to authenticate wireless clients and encrypt network\ntraffic. The PSK is a passphrase or password that is shared between the access point and wireless clients.\nEnterprise mode, also known as WPA-EAP (Extensible Authentication Protocol), uses a RADIUS (Remote Authentication Dial-In User Service) server\nto authenticate wireless clients. Enterprise mode provides stronger security than Personal mode, but it requires more setup and infrastructure.\nIn summary, WPA-Personal mode uses PSK authentication, while WPA-Enterprise mode uses RADIUS server authentication.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q999",
  "num": 999,
  "question": "An engineer is configuring remote access to a router from IP subnet 10.139.58.0/28. The domain name, crypto keys, and SSH have been\nconfigured. Which configuration enables the traffic on the destination router?",
  "options": [
   "interface FastEthernet0/0\nip address 10.122.49.1 255.255.255.252\nip access-group 110 in\nip access-list extended 110\npermit tcp 10.139.58.0 0.0.0.15 host 10.122.49.1 eq 22",
   "interface FastEthernet0/0\nip address 10.122.49.1 255.255.255.240\naccess-group 120 in\nip access-list extended 120\npermit tcp 10.139.58.0 255.255.255.248 any eq 22",
   "interface FastEthernet0/0\nip address 10.122.49.1 255.255.255.252\nip access-group 105 in\nip access-list standard 105\npermit tcp 10.139.58.0 0.0.0.7 eq 22 host 10.122.49.1",
   "interface FastEthernet0/0\nip address 10.122.49.1 255.255.255.248\nip access-group 10 in\nip access-list standard 10\npermit udp 10.139.58.0 0.0.0.7 host 10.122.49.1 eq 22"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 IFBBPROSALCEDO 1 month ago\nI agree!",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q1000",
  "num": 1000,
  "question": "To improve corporate security, an organization is planning to implement badge authentication to limit access to the data center. Which element of\na security program is being deployed?",
  "options": [
   "user awareness",
   "user training",
   "physical access control",
   "vulnerability verification"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 AndreaGambera 3 weeks, 2 days ago\nCorrect",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-1_q1002",
  "num": 1002,
  "question": "Which benefit does Cisco DNA Center provide over traditional campus management?",
  "options": [
   "Cisco DNA Center automates HTTPS for secure web access, and traditional campus management uses HTTP.",
   "Cisco DNA Center leverages SNMPv3 for encrypted management, and traditional campus management uses SNMPv2.",
   "Cisco DNA Center leverages APIs, and traditional campus management requires manual data gathering.",
   "Cisco DNA Center automates SSH access for encrypted entry, and SSH is absent from traditional campus management."
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 [Removed] 2 months, 1 week ago\nSelected Answer: C\n\nC. Cisco DNA Center leverages APIs, and traditional campus management requires manual data gathering.",
  "topic": "1",
  "deck": "examtopics-1"
 },
 {
  "id": "examtopics-2_q1",
  "num": 1,
  "question": "Refer to the exhibit. Which type of route does R1 use to reach host 10.10.13.10/32?",
  "options": [
   "default route",
   "network route",
   "host route",
   "floating static route"
  ],
  "correct": "B",
  "explanation": "B (95%)\n\n5%\n\n\uf147 \uf007 LOST40 Highly Voted \uf164 1 year, 6 months ago\nI passed my CCNA. Strangely, they don't show you your scores right away. I got that Credly badge and print out version of the cert. Some of the\nquestions came from here and some were extremely different. So study really really hard.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q2",
  "num": 2,
  "question": "Refer to the exhibit. Which prefix does Router1 use for traffic to Host A?",
  "options": [
   "10.10.10.0/28",
   "10.10.13.0/25",
   "10.10.13.144/28",
   "10.10.13.208/29"
  ],
  "correct": "D",
  "explanation": "The prefix with \u202b\u05d2\u202c\u20aclongest prefix\u202b\u05d2\u202c\u20ac will be matched first, in this case is \u202b\u05d2\u202c29/\u20ac\u202b\u05d2\u202c\u20ac.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q4",
  "num": 4,
  "question": "A frame that enters a switch fails the Frame Check Sequence. Which two interface counters are incremented? (Choose two.)",
  "options": [
   "input errors",
   "frame",
   "giants",
   "CRC",
   "runts"
  ],
  "correct": "AD",
  "explanation": "Whenever the physical transmission has problems, the receiving device might receive a frame whose bits have changed values. These frames\ndo not pass the error detection logic as implemented in the FCS field in the Ethernet trailer. The receiving device discards the frame and counts\nit as some kind of input error.\nCisco switches list this error as a CRC error. Cyclic redundancy check (CRC) is a term related to how the FCS math detects an error.\nThe \u202b\u05d2\u202c\u20acinput errors\u202b\u05d2\u202c\u20ac includes runts, giants, no buffer, CRC, frame, overrun, and ignored counts.\nThe output below show the interface counters with the \u202b\u05d2\u202c\u20acshow interface s0/0/0\u202b\u05d2\u202c\u20ac command:",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q6",
  "num": 6,
  "question": "How do TCP and UDP differ in the way that they establish a connection between two endpoints?",
  "options": [
   "TCP uses the three-way handshake, and UDP does not guarantee message delivery.",
   "TCP uses synchronization packets, and UDP uses acknowledgment packets.",
   "UDP provides reliable message transfer, and TCP is a connectionless protocol.",
   "UDP uses SYN, SYN ACK, and FIN bits in the frame header while TCP uses SYN, SYN ACK, and ACK bits."
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 ZUMY Highly Voted \uf164 2 years, 5 months ago\nA is correct",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q7",
  "num": 7,
  "question": "Which 802.11 frame type is Association Response?",
  "options": [
   "management",
   "protected frame",
   "action",
   "control"
  ],
  "correct": "A",
  "explanation": "There are three main types of 802.11 frames: the Data Frame, the Management Frame and the Control Frame. Association Response belongs to\nManagement\nFrame. Association response is sent in response to an association request.\nReference:\nhttps://en.wikipedia.org/wiki/802.11_Frame_Types",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q8",
  "num": 8,
  "question": "In which way does a spine-and-leaf architecture allow for scalability in a network when additional access ports are required?",
  "options": [
   "A spine switch and a leaf switch can be added with redundant connections between them.",
   "A spine switch can be added with at least 40 GB uplinks.",
   "A leaf switch can be added with connections to every spine switch.",
   "A leaf switch can be added with a single connection to a core spine switch."
  ],
  "correct": "C",
  "explanation": "Spine-leaf architecture is typically deployed as two layers: spines (such as an aggregation layer), and leaves (such as an access layer). Spineleaf topologies provide high-bandwidth, low-latency, nonblocking server-to-server connectivity.\nLeaf (aggregation) switches are what provide devices access to the fabric (the network of spine and leaf switches) and are typically deployed at\nthe top of the rack. Generally, devices connect to the leaf switches. Devices can include servers, Layer 4-7 services (firewalls and load\nbalancers), and WAN or Internet routers.\nLeaf switches do not connect to other leaf switches. In spine-and-leaf architecture, every leaf should connect to every spine in a full mesh.\nSpine (aggregation) switches are used to connect to all leaf switches and are typically deployed at the end or middle of the row. Spine switches\ndo not connect to other spine switches.\nReference:\nhttps://www.cisco.com/c/en/us/products/collateral/switches/nexus-9000-series-switches/guide-c07-733228.html",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q9",
  "num": 9,
  "question": "What identifies the functionality of virtual machines?",
  "options": [
   "The hypervisor communicates on Layer 3 without the need for additional resources.",
   "Each hypervisor supports a single virtual machine and a single software switch.",
   "The hypervisor virtualizes physical components including CPU, memory, and storage.",
   "Virtualized servers run efficiently when physically connected to a switch that is separate from the hypervisor."
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 shomkin Highly Voted \uf164 1 year, 8 months ago\njust me or is the question supposed to be \"check the the most correct statement regarding hypervisors\"?",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q10",
  "num": 10,
  "question": "Which command automatically generates an IPv6 address from a specified IPv6 prefix and MAC address of an interface?",
  "options": [
   "ipv6 address dhcp",
   "ipv6 address 2001:DB8:5:112::/64 eui-64",
   "ipv6 address autoconfig",
   "ipv6 address 2001:DB8:5:112::2/64 link-local"
  ],
  "correct": "C",
  "explanation": "The \u202b\u05d2\u202c\u20acipv6 address autoconfig\u202b\u05d2\u202c\u20ac command causes the device to perform IPv6 stateless address auto-configuration to discover prefixes on the\nlink and then to add the EUI-64 based addresses to the interface. Addresses are configured depending on the prefixes received in Router\nAdvertisement (RA) messages. The device will listen for RA messages which are transmitted periodically from the router (DHCP Server). This\nRA message allows a host to create a global IPv6 address from:\n\u202b\u05d2\u202c\u20ac\u00a2 Its interface identifier (EUI-64 address)\n\u202b\u05d2\u202c\u20ac\u00a2 Link Prefix (obtained via RA)\nNote: Global address is the combination of Link Prefix and EUI-64 address",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q11",
  "num": 11,
  "question": "When configuring IPv6 on an interface, which two IPv6 multicast groups are joined? (Choose two.)",
  "options": [
   "2000::/3",
   "2002::5",
   "FC00::/7",
   "FF02::1",
   "FF02::2"
  ],
  "correct": "DE",
  "explanation": "When an interface is configured with IPv6 address, it automatically joins the all nodes (FF02::1) and solicited-node (FF02::1:FFxx:xxxx)\n\nmulticast groups. The all- node group is used to communicate with all interfaces on the local link, and the solicited-nodes multicast group is\nrequired for link-layer address resolution.\nRouters also join a third multicast group, the all-routers group (FF02::2).\nReference:\nhttps://www.cisco.com/c/en/us/td/docs/ios-xml/ios/ipv6/configuration/xe-3s/ipv6-xe-36s-book/ip6-multicast.html",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q13",
  "num": 13,
  "question": "What is the default behavior of a Layer 2 switch when a frame with an unknown destination MAC address is received?",
  "options": [
   "The Layer 2 switch forwards the packet and adds the destination MAC address to its MAC address table.",
   "The Layer 2 switch sends a copy of a packet to CPU for destination MAC address learning.",
   "The Layer 2 switch floods packets to all ports except the receiving port in the given VLAN.",
   "The Layer 2 switch drops the received frame."
  ],
  "correct": "C",
  "explanation": "If the destination MAC address is not in the CAM table (unknown destination MAC address), the switch sends the frame out all other ports that\nare in the same\nVLAN as the received frame. This is called flooding. It does not flood the frame out the same port on which the frame was received.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q14",
  "num": 14,
  "question": "An engineer must configure a /30 subnet between two routes. Which usable IP address and subnet mask combination meets this criteria?",
  "options": [
   "interface e0/0 description to XX-AXXX:XXXXX ip address 10.2.1.3 255.255.255.252",
   "interface e0/0 description to XX-AXXX:XXXXX ip address 192.168.1.1 255.255.255.248",
   "interface e0/0 description to XX-AXXX:XXXXX ip address 172.16.1.4 255.255.255.248",
   "interface e0/0 description to XX-AXXX:XXXXX ip address 209.165.201.2 225.255.255.252"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 rugginic Highly Voted \uf164 3 years, 2 months ago\nanswer is D. The up in A is a broadcast",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q15",
  "num": 15,
  "question": "Which network allows devices to communicate without the need to access the Internet?",
  "options": [
   "172.9.0.0/16",
   "172.28.0.0/16",
   "192.0.0.0/8",
   "209.165.201.0/24"
  ],
  "correct": "B",
  "explanation": "This question asks about the private ranges of IPv4 addresses. The private ranges of each class of IPv4 are listed below:\nClass A private IP address ranges from 10.0.0.0 to 10.255.255.255\nClass B private IP address ranges from 172.16.0.0 to 172.31.255.255\nClass C private IP address ranges from 192.168.0.0 to 192.168.255.255\nOnly the network 172.28.0.0/16 belongs to the private IP address (of class B).",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q16",
  "num": 16,
  "question": "Refer to the exhibit. Which statement explains the configuration error message that is received?",
  "options": [
   "It belongs to a private IP address range.",
   "The router does not support /28 mask.",
   "It is a network IP address.",
   "It is a broadcast IP address."
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 ZUMY Highly Voted \uf164 2 years, 5 months ago\nFor /28 network, There (2^4)=16 Subnets with each having (2^4-2)=14 host (14 +1 Network ID+ 1Broadcast ID)=16\nSubnets are\n192.168.16.0\n192.168.16.16\n.....\n192.168.16.128\n192.168.16.144 (Above this network ID there will be address 192.168.16.143 which is a broadcast ID of Network 192.168.16.128",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q17",
  "num": 17,
  "question": "Which IPv6 address type provides communication between subnets and cannot route on the Internet?",
  "options": [
   "link-local",
   "unique local",
   "multicast",
   "global unicast"
  ],
  "correct": "B",
  "explanation": "A IPv6 Unique Local Address is an IPv6 address in the block FC00::/7. It is the approximate IPv6 counterpart of the IPv4 private address. It is\nnot routable on the global Internet.\nNote: In the past, Site-local addresses (FEC0::/10) are equivalent to private IP addresses in IPv4 but now they are deprecated.\nLink-local addresses only used for communications within the local subnet. It is usually created dynamically using a link-local prefix of\nFE80::/10 and a 64-bit interface identifier (based on 48-bit MAC address).",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q18",
  "num": 18,
  "question": "Which IPv6 address block sends packets to a group address rather than a single address?",
  "options": [
   "2000::/3",
   "FC00::/7",
   "FE80::/10",
   "FF00::/8"
  ],
  "correct": "D",
  "explanation": "FF00::/8 is used for IPv6 multicast and this is the IPv6 type of address the question wants to ask.\n\nFE80::/10 range is used for link-local addresses. Link-local addresses only used for communications within the local subnetwork (automatic\naddress configuration, neighbor discovery, router discovery, and by many routing protocols). It is only valid on the current subnet. It is usually\ncreated dynamically using a link-local prefix of FE80::/10 and a 64-bit interface identifier (based on 48-bit MAC address).",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q19",
  "num": 19,
  "question": "What are two reasons that cause late collisions to increment on an Ethernet interface? (Choose two.)",
  "options": [
   "when Carrier Sense Multiple Access/Collision Detection is used",
   "when one side of the connection is configured for half-duplex",
   "when the sending device waits 15 seconds before sending the frame again",
   "when a collision occurs after the 32nd byte of a frame has been transmitted",
   "when the cable length limits are exceeded"
  ],
  "correct": "BE",
  "explanation": "A late collision is defined as any collision that occurs after the first 512 bits (or 64th byte) of the frame have been transmitted. The usual\n\npossible causes are full- duplex/half-duplex mismatch, exceeded Ethernet cable length limits, or defective hardware such as incorrect cabling,\nnon-compliant number of hubs in the network, or a bad NIC.\nLate collisions should never occur in a properly designed Ethernet network. They usually occur when Ethernet cables are too long or when there\nare too many repeaters in the network.\nReference:\nhttps://www.cisco.com/en/US/docs/internetworking/troubleshooting/guide/tr1904.html",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q20",
  "num": 20,
  "question": "What is a benefit of using a Cisco Wireless LAN Controller?",
  "options": [
   "It eliminates the need to configure each access point individually.",
   "Central AP management requires more complex configurations.",
   "Unique SSIDs cannot use the same authentication method.",
   "It supports autonomous and lightweight APs."
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Samitha Highly Voted \uf164 3 years, 2 months ago\nA wireless LAN (or WLAN) controller is used in combination with the Lightweight Access Point Protocol (LWAPP) to \"manage light-weight access\npoints in large quantities\" by the network administrator or network operations center.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q21",
  "num": 21,
  "question": "Which action is taken by switch port enabled for PoE power classification override?",
  "options": [
   "If a monitored port exceeds the maximum administrative value for power, the port is shutdown and err-disabled.",
   "When a powered device begins drawing power from a PoE switch port, a syslog message is generated.",
   "As power usage on a PoE switch port is checked, data flow to the connected device is temporarily paused.",
   "If a switch determines that a device is using less than the minimum configured power, it assumes the device has failed and disconnects it."
  ],
  "correct": "A",
  "explanation": "PoE monitoring and policing compares the power consumption on ports with the administrative maximum value (either a configured maximum\nvalue or the port's default value). If the power consumption on a monitored port exceeds the administrative maximum value, the following\nactions occur:\n- A syslog message is issued.\n- The monitored port is shut down and error-disabled.\n- The allocated power is freed.\nReference:\nhttps://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst6500/ios/12-2SX/configuration/guide/book/power_over_ethernet.pdf\n\n\uf147 \uf007 John248 Highly Voted \uf164 3 years, 2 months ago\nPoE monitoring and policing compares the power consumption on ports with the administrative\nmaximum value (either a configured maximum value or the port\u2019s default value). If the power\nconsumption on a monitored port exceeds the administrative maximum value, the following actions\noccur:\n\u2022 A syslog message is issued.\n\u2022 The monitored port is shut down and error-disabled.\n\u2022 The allocated power is freed.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q22",
  "num": 22,
  "question": "What occurs to frames during the process of frame flooding?",
  "options": [
   "Frames are sent to all ports, including those that are assigned to other VLANs.",
   "Frames are sent to every port on the switch that has a matching entry in MAC address table.",
   "Frames are sent to every port on the switch in the same VLAN except from the originating port.",
   "Frames are sent to every port on the switch in the same VLAN."
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 ZUMY Highly Voted \uf164 2 years, 5 months ago\nGiven answer C is correct",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q23",
  "num": 23,
  "question": "Which function does the range of private IPv4 addresses perform?",
  "options": [
   "allows multiple companies to each use the same addresses without conflicts",
   "provides a direct connection for hosts from outside of the enterprise network",
   "ensures that NAT is not required to reach the Internet with private range addressing",
   "enables secure communications to the Internet for all external hosts"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 ZUMY Highly Voted \uf164 2 years, 5 months ago\nA is correct!",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q24",
  "num": 24,
  "question": "Which action must be taken to assign a global unicast IPv6 address on an interface that is derived from the MAC address of that interface?",
  "options": [
   "explicitly assign a link-local address",
   "disable the EUI-64 bit process",
   "enable SLAAC on an interface",
   "configure a stateful DHCPv6 server on the network"
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 dave1992 Highly Voted \uf164 2 years ago\ni love how you can literally click for the correct answer but theres still people that come here and leave a comment saying,\" C is the correct answer\"",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q25",
  "num": 25,
  "question": "Several new coverage cells are required to improve the Wi-Fi network of an organization. Which two standard designs are recommended? (Choose\ntwo.)",
  "options": [
   "5GHz provides increased network capacity with up to 23 nonoverlapping channels.",
   "5GHz channel selection requires an autonomous access point.",
   "Cells that overlap one another are configured to use nonoverlapping channels.",
   "Adjacent cells with overlapping channels use a repeater access point.",
   "For maximum throughput, the WLC is configured to dynamically set adjacent access points to the channel."
  ],
  "correct": "CE",
  "explanation": "AC (64%)\n\nCE (34%)\n\n\uf147 \uf007 Raymond9 Highly Voted \uf164 2 years, 9 months ago\nIf I have understood correctly, C and E have somehow the same meaning: avoid signal overlapping, since E separate the channel to avoid using the\nsame channel and having signal collision. See \"Dynamic Channel Assignment\" in https://www.cisco.com/c/en/us/td/docs/wireless/controller/85/config-guide/b_cg85/radio_resource_management.html\nA and B are kind of tricky to mention 5GHz, which must have non-overlapping channels, and actually accomplish what C/E have done, but they're\nsaying incorrect stuff.\nFor A: 2.4GHz has 11 Channels, 5GHZ has 45 Channels\nFor B: There are two types of APs: autonomous AP/controllerless AP/\"Fat AP\" and lightweight AP/AP with Controller.\nRef:https://stormwindstudios.com/wireless-access-points/\nAnd lightweight AP can be applied to 2.4GHz and 5Hz (there's command for both in cisco lightweight AP, just google it....\nFor D: I think the repeater cannot solve the problem of \"overlapping channels\" since it just re-transmit or \"repeat\" the signal, aka the overlapping\nchannels will still be overlapping!",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q26",
  "num": 26,
  "question": "How do TCP and UDP differ in the way they provide reliability for delivery of packets?",
  "options": [
   "TCP does not guarantee delivery or error checking to ensure that there is no corruption of data, UDP provides message acknowledgement\nand retransmits data if lost.",
   "TCP provides flow control to avoid overwhelming a receiver by sending too many packets at once, UDP sends packets to the receiver in a\ncontinuous stream without checking.",
   "TCP is a connectionless protocol that does not provide reliable delivery of data; UDP is a connection-oriented protocol that uses\nsequencing to provide reliable delivery.",
   "TCP uses windowing to deliver packets reliably; UDP provides reliable message transfer between hosts by establishing a three-way\nhandshake."
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 ZUMY Highly Voted \uf164 2 years, 5 months ago\nB is correct",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q27",
  "num": 27,
  "question": "What are two differences between optical-fiber cabling and copper cabling? (Choose two.)",
  "options": [
   "A BNC connector is used for fiber connections",
   "The glass core component is encased in a cladding",
   "The data can pass through the cladding",
   "Light is transmitted through the core of the fiber",
   "Fiber connects to physical interfaces using RJ-45 connections"
  ],
  "correct": "BD",
  "explanation": "BD (100%)\n\n\uf147 \uf007 Raymond9 Highly Voted \uf164 2 years, 9 months ago\nFor lazy people who hate this kind of stupid question in CCNA but has a heart of curiosity, I do some simple research for you. Please correct me if\nany incorrect stuffy\n1.There are 3 kind of wiring mainly when we talk about networking: Fiber, Coaxial cable, twisted pair. The last 2 are Copper wiring\n2. BNC Connector is for Coaxial Cable, so A is wrong\n3.the structure of fiber is: Jacket encase Buffer, Buffer encase Cladding, Cladding encase core. We uses light to transmit data through the core.\nTherefore B and D are right, C is wrong\n4. RJ45 is a connector is for twisted pair, so E is wrong",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q28",
  "num": 28,
  "question": "How does CAPWAP communicate between an access point in local mode and a WLC?",
  "options": [
   "The access point must not be connected to the wired network, as it would create a loop",
   "The access point must be connected to the same switch as the WLC",
   "The access point must directly connect to the WLC using a copper cable",
   "The access point has the ability to link to any switch in the network, assuming connectivity to the WLC"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 Shamwedge Highly Voted \uf164 2 years, 2 months ago\nA, B, and C all are connection related. D is the only answer that relates to \"communication\"",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q29",
  "num": 29,
  "question": "Which IPv6 address block forwards packets to a multicast address rather than a unicast address?",
  "options": [
   "2000::/3",
   "FC00::/7",
   "FE80::/10",
   "FF00::/12"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 marcojmnez Highly Voted \uf164 2 years, 6 months ago\nFF <- easiest way to remember multicast.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q30",
  "num": 30,
  "question": "What is the difference regarding reliability and communication type between TCP and UDP?",
  "options": [
   "TCP is reliable and is a connectionless protocol; UDP is not reliable and is a connection-oriented protocol.",
   "TCP is not reliable and is a connectionless protocol; UDP is reliable and is a connection-oriented protocol.",
   "TCP is not reliable and is a connection-oriented protocol; UDP is reliable and is a connectionless protocol.",
   "TCP is reliable and is a connection-oriented protocol; UDP is not reliable and is a connectionless protocol."
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 Hanagaki_Shinjiro 2 weeks, 3 days ago\nSelected Answer: D\n\nThere's no doubt about D is correction",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q31",
  "num": 31,
  "question": "What are two descriptions of three-tier network topologies? (Choose two.)",
  "options": [
   "The distribution layer runs Layer 2 and Layer 3 technologies",
   "The network core is designed to maintain continuous connectivity when devices fail",
   "The access layer manages routing between devices in different domains",
   "The core layer maintains wired connections for each host",
   "The core and distribution layers perform the same functions"
  ],
  "correct": "AB",
  "explanation": "AB (100%)\n\n\uf147 \uf007 alexiro Highly Voted \uf164 3 years, 1 month ago\nAccess: Provides a connection point (access) for end-user devices. Does not forward frames between two other access switches under normal\ncircumstances.\nDistribution: Provides an aggregation point for access switches, providing connectivity to the rest of the devices in the LAN, forwarding frames\nbetween switches, but not connecting directly to end-user devices.\nThe distribution layer is where redistribution of routing protocols should be performed. It should never be performed at the core or access layer.\nCore: Aggregates distribution switches in very large campus LANs, providing very high forwarding rates for the larger volume of traffic due to the\nsize of the network.\nOnly switching between campus (distribution) switches should be performed at the core layer. Nothing should be done to slow down forwarding of\ntraffic, such as using ACLs, supporting clients, or routing between VLANs\nCore layer switches are commonly set up in a star topology. This is because core layer switches connect multiple campuses via distribution layer\nswitches",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q32",
  "num": 32,
  "question": "Which type of IPv6 address is publicly routable in the same way as IPv4 public addresses?",
  "options": [
   "multicast",
   "unique local",
   "link-local",
   "global unicast"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 Shaz313 Highly Voted \uf164 2 years, 2 months ago\nGlobal unicast addresses (GUAs), also known as aggregatable global unicast addresses, are globally routable and reachable in the IPv6 Internet.\nThey are equivalent to public IPv4 addresses. They play a significant role in the IPv6 addressing architecture",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q33",
  "num": 33,
  "question": "What is the expected outcome when an EUI-64 address is generated?",
  "options": [
   "The interface ID is configured as a random 64-bit value",
   "The characters FE80 are inserted at the beginning of the MAC address of the interface",
   "The seventh bit of the original MAC address of the interface is inverted",
   "The MAC address of the interface is used as the interface ID without modification"
  ],
  "correct": "C",
  "explanation": "C (91%)\n\n9%\n\n\uf147 \uf007 ZUMY Highly Voted \uf164 2 years, 5 months ago\nC is correct!\nEUI-64 Process\n01.Split Mac Address in to two ( 00:BB:CC | DD:11:22)\n02. Insert FFFE Hexa in the middle\nEg: 00:BB:CC:DD:11:22 --> 02BB:CCFF:FEDD:1122\n03.Invert the 7th Bit of the MAC address (0 to 1)\nRef:\nhttps://geek-university.com/ccna/ipv6-eui-64-calculation/",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q34",
  "num": 34,
  "question": "A corporate office uses four floors in a building.\n\u2711 Floor 1 has 24 users.\n\u2711 Floor 2 has 29 users.\nFloor 3 has 28 users.\n\u2711 Floor 4 has 22 users.\nWhich subnet summarizes and gives the most efficient distribution of IP addresses for the router configuration?",
  "options": [
   "192.168.0.0/24 as summary and 192.168.0.0/28 for each floor",
   "192.168.0.0/23 as summary and 192.168.0.0/25 for each floor",
   "192.168.0.0/25 as summary and 192.168.0.0/27 for each floor",
   "192.168.0.0/26 as summary and 192.168.0.0/29 for each floor"
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 Bne_Pradhan Highly Voted \uf164 2 years, 3 months ago\nnetwork summary each floor,\nmax user to each floor=30<=2^H-2\nH=5, will give N=3 therefore /27\nFor Network Summary,\nTotal Users,= 103\n103<=2^H-2\nH=7\nwill give N=1\nTherefore/25,,, i hope u got ans in short, tht is C",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q35",
  "num": 35,
  "question": "Refer to the exhibit. An engineer must add a subnet for a new office that will add 20 users to the network. Which IPv4 network and subnet mask\ncombination does the engineer assign to minimize wasting addresses?",
  "options": [
   "10.10.225.48 255.255.255.240",
   "10.10.225.32 255.255.255.240",
   "10.10.225.48 255.255.255.224",
   "10.10.225.32 255.255.255.224"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 ZUMY Highly Voted \uf164 2 years, 5 months ago\nD is correct!\nFind the subnet mask\n*To have 20 User in a subnet We have to use /27 prefix\n* So Host count for /27 prefix is (2^5-2)=30\n* Subnet Mask for /27 prefix is (sum of Network bits (128+64+32)=224 , so 255.255.255.224\nFind the network ID\n*As per the /27 prefix each subnet has 30 host and 32 including network ID & Broadcast ID\n* so first network ID is 10.10.255.0 and the second will be 10.10.255.32",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q36",
  "num": 36,
  "question": "What is a characteristic of spine-and-leaf architecture?",
  "options": [
   "Each link between leaf switches allows for higher bandwidth.",
   "It provides greater predictability on STP blocked ports.",
   "It provides variable latency.",
   "Each device is separated by the same number of hops."
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 GreatDane Highly Voted \uf164 1 year, 3 months ago\nRef: Cisco Data Center Spine-and-Leaf Architecture: Design Overview White Paper \u2013 Cisco\n\u201c\u2026\nSpine-and-leaf architecture\n\u2026\nWith a spine-and-leaf architecture, no matter which leaf switch to which a server is connected, its traffic always has to cross the same number of\ndevices to get to another server (unless the other server is located on the same leaf).\n\u2026\u201d\nA. Each link between leaf switches allows for higher bandwidth.\nWrong answer.\nB. It provides greater predictability on STP blocked ports.\nWrong answer.\nC. It provides variable latency.\nWrong answer.\nD. Each device is separated by the same number of hops.\nCorrect answer.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q37",
  "num": 37,
  "question": "An office has 8 floors with approximately 30-40 users per floor. One subnet must be used. Which command must be configured on the router\nSwitched Virtual\nInterface to use address space efficiently?",
  "options": [
   "ip address 192.168.0.0 255.255.0.0",
   "ip address 192.168.0.0 255.255.254.0",
   "ip address 192.168.0.0 255.255.255.128",
   "ip address 192.168.0.0 255.255.255.224"
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 GreatDane Highly Voted \uf164 1 year, 3 months ago\n8 floors and 40 user per floor means 320 users (approx.). How many bits do you need to have 320 IP addresses?\n8 bits = (2^8 \u2013 2) =254 IP addresses, and it\u2019s not enough.\n9 bits = (2^9 \u2013 2) = 510 IP addresses, and this is enough.\nYou have a class C subnet (192.168.0.0). This means a subnet mask like this:\n255.255.255.0\nBut you need 9 bits for the hosts, so you\u2019ve got left with a subnet mask like this:\n255.255.1111111x.xxxxxxxx =255.255.254.0\nThis means you will use VLSM subnetting.\nAnswer B is correct.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q39",
  "num": 39,
  "question": "A device detects two stations transmitting frames at the same time. This condition occurs after the first 64 bytes of the frame is received. Which\ninterface counter increments?",
  "options": [
   "runt",
   "collision",
   "late collision",
   "CRC"
  ],
  "correct": "C",
  "explanation": "B (67%)\n\nC (33%)\n\n\uf147 \uf007 Raooff Highly Voted \uf164 2 years, 8 months ago\nC is right\nCollision happens after 512 bits =64 byte =late collision",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q40",
  "num": 40,
  "question": "Refer to the exhibit. Which outcome is expected when PC_A sends data to PC_B after their initial communication?",
  "options": [
   "The source MAC address is changed.",
   "The destination MAC address is replaced with ffff.ffff.ffff.",
   "The source and destination MAC addresses remain the same.",
   "The switch rewrites the source and destination MAC addresses with its own."
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Cyberops Highly Voted \uf164 1 year, 4 months ago\nkey work is after their initial communication",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q41",
  "num": 41,
  "question": "Using direct sequence spread spectrum, which three 2.4-GHz channels are used to limit collisions?",
  "options": [
   "5, 6, 7",
   "1, 2, 3",
   "1, 6, 11",
   "1, 5, 10"
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 1234Rob5678 Highly Voted \uf164 2 years, 5 months ago\nC. 1,6,11 is correct. Question poorly worded, collisions happen in a wired network, congestion happens in a wireless network.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q42",
  "num": 42,
  "question": "How do TCP and UDP differ in the way they guarantee packet delivery?",
  "options": [
   "TCP uses retransmissions, acknowledgment, and parity checks, and UDP uses cyclic redundancy checks only",
   "TCP uses two-dimensional parity checks, checksums, and cyclic redundancy checks, and UDP uses retransmissions only",
   "TCP uses checksum, acknowledgements, and retransmissions, and UDP uses checksums only",
   "TCP uses checksum, parity checks, and retransmissions, and UDP uses acknowledgements only"
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 GreatDane 8 months, 2 weeks ago\nSelected Answer: C\n\nRef: TCP vs UDP - Difference and Comparison | Diffen\n\u201c\u2026\nComparison chart\n\u2026\nError Checking\nTCP does error checking and error recovery. Erroneous packets are retransmitted from the source to the destination.\nUDP does error checking but simply discards erroneous packets. Error recovery is not attempted.\n\u2026\u201d\nA. TCP uses retransmissions, acknowledgment, and parity checks, and UDP uses cyclic redundancy checks only\nWrong answer.\nB. TCP uses two-dimensional parity checks, checksums, and cyclic redundancy checks, and UDP uses retransmissions only\nWrong answer.\nC. TCP uses checksum, acknowledgements, and retransmissions, and UDP uses checksums only\nCorrect answer\nD. TCP uses checksum, parity checks, and retransmissions, and UDP uses acknowledgements only\nWrong answer.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q43",
  "num": 43,
  "question": "A wireless administrator has configured a WLAN; however, the clients need access to a less congested 5-GHz network for their voice quality.\nWhich action must be taken to meet the requirement?",
  "options": [
   "enable Band Select",
   "enable DTIM",
   "enable RX-SOP",
   "enable AAA override"
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 GreatDane Highly Voted \uf164 8 months, 2 weeks ago\nSelected Answer: A\n\nRef: Cisco Catalyst 9800 Series Wireless Controller Software Configuration Guide, Cisco IOS XE Gibraltar 16.12.x\n\u201cC H A P T E R 47\nInformation About Configuring Band Selection, 802.11 Bands, and Parameters\nBand Select\nBand select enables client radios that are capable of dual-band (2.4 and 5-GHz) operations to move to a less congested 5-GHz access point. The\n2.4-GHz band is often congested. Clients on this band typically experience interference from Bluetooth devices, microwave ovens, and cordless\nphones as well as co-channel interference from other access points because of the 802.11b/g limit of 3 nonoverlapping channels. To prevent these\nsources of interference and improve overall network performance, configure band selection on the device.\n\u2026\u201d\nA. enable Band Select\nCorrect answer\nB. enable DTIM\nWrong answer.\nC. enable RX-SOP\nWrong answer.\nD. enable AAA override\nWrong answer.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q45",
  "num": 45,
  "question": "What is the destination MAC address of a broadcast frame?",
  "options": [
   "00:00:0c:07:ac:01",
   "ff:ff:ff:ff:ff:ff",
   "43:2e:08:00:00:0c",
   "00:00:0c:43:2e:08",
   "00:00:0c:ff:ff:ff"
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 Ali526 Highly Voted \uf164 2 years, 8 months ago\nThis is correct.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q46",
  "num": 46,
  "question": "For what two purposes does the Ethernet protocol use physical addresses?",
  "options": [
   "to uniquely identify devices at Layer 2",
   "to allow communication with devices on a different network",
   "to differentiate a Layer 2 frame from a Layer 3 packet",
   "to establish a priority system to determine which device gets to transmit first",
   "to allow communication between different devices on the same network",
   "to allow detection of a remote device when its physical address is unknown"
  ],
  "correct": "AE",
  "explanation": "AE (100%)\n\n\uf147 \uf007 Nhan Highly Voted \uf164 2 years, 7 months ago\nPhysical address is MAC address",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q48",
  "num": 48,
  "question": "Which component of an Ethernet frame is used to notify a host that traffic is coming?",
  "options": [
   "start of frame delimiter",
   "Type field",
   "preamble",
   "Data field"
  ],
  "correct": "C",
  "explanation": "Preamble is a 7 Byte field in the Ethernet frame which helps to receiver to know that it is an actual data (Ethernet Frame) and not some random\nnoise in the transmission medium. It acts like a doorbell telling about the incoming data.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q49",
  "num": 49,
  "question": "You are configuring your edge routers interface with a public IP address for Internet connectivity. The router needs to obtain the IP address from\nthe service provider dynamically.\nWhich command is needed on interface FastEthernet 0/0 to accomplish this?",
  "options": [
   "ip default-gateway",
   "ip route",
   "ip default-network",
   "ip address dhcp",
   "ip address dynamic"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 xsp Highly Voted \uf164 2 years, 7 months ago\nD is correct, means that the router will act as a DHCP client.\nShould a router be set as a DHCP server commands are as follows:\nconf t\nservice dhcp\nip dhcp pool <pool name>\nnetwork <network to be use as pool>\ndefault-router <default gateway or the ip address of the ethernet interface facing the host>\ndns-server <ip add of your dns server, say: 8.8.8.8 which is a google dns>\nexit",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q50",
  "num": 50,
  "question": "Which two statements about the purpose of the OSI model are accurate? (Choose two.)",
  "options": [
   "Defines the network functions that occur at each layer",
   "Facilitates an understanding of how information travels throughout a network",
   "Changes in one layer do not impact other layer",
   "Ensures reliable data delivery through its layered approach"
  ],
  "correct": "AB",
  "explanation": "AB (100%)\n\n\uf147 \uf007 Dante_Dan Highly Voted \uf164 2 years, 1 month ago\nA & B are correct\nC is incorrect because changes in one layer definitely affects others; imagine affecting layer 1 (disconnect a cable, plug it incorrectly, administer the\nincorrect amount of voltage, etc), it would affect other layers.\nD is incorrect because OSI model is not meant to ensure anything, it simply explains some of the features of each layer it defines.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q51",
  "num": 51,
  "question": "Which three statements about MAC addresses are correct? (Choose three.)",
  "options": [
   "To communicate with other devices on a network, a network device must have a unique MAC address",
   "The MAC address is also referred to as the IP address",
   "The MAC address of a device must be configured in the Cisco IOS CLI by a user with administrative privileges",
   "A MAC address contains two main components, the first of which identifies the manufacturer of the hardware and the second of which\nuniquely identifies the hardware",
   "An example of a MAC address is 0A:26:B8:D6:65:90",
   "A MAC address contains two main components, the first of which identifies the network on which the host resides and the second of which\nuniquely identifies the host on the network"
  ],
  "correct": "ADE",
  "explanation": "ADE (100%)\n\n\uf147 \uf007 Ali526 Highly Voted \uf164 2 years, 8 months ago\nADE are the answers.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q52",
  "num": 52,
  "question": "Which technique can you use to route IPv6 traffic over an IPv4 infrastructure?",
  "options": [
   "NAT",
   "6 to 4 tunneling",
   "L2TPv3",
   "dual-stack"
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 ZUMY Highly Voted \uf164 2 years, 4 months ago\nB is correct!\nOverlay tunneling encapsulates IPv6 packets in IPv4 packets for delivery across an IPv4 infrastructure (a core network or the figure below). By using\noverlay tunnels, you can communicate with isolated IPv6 networks without upgrading the IPv4 infrastructure between them. Overlay tunnels can be\nconfigured between border devices or between a border device and a host; however, both tunnel endpoints must support both the IPv4 and IPv6\nprotocol stacks. IPv6 supports the following types of overlay tunneling mechanisms:\n1 Manual\n2 Generic routing encapsulation (GRE)\n3 IPv4-compatible\n4 6to4\n5 Intrasite Automatic Tunnel Addressing Protocol (ISATAP)",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q53",
  "num": 53,
  "question": "Refer to the exhibit. A network technician is asked to design a small network with redundancy. The exhibit represents this design, with all hosts\nconfigured in the same VLAN. What conclusions can be made about this design?",
  "options": [
   "This design will function as intended.",
   "Spanning-tree will need to be used.",
   "The router will not accept the addressing scheme.",
   "The connection between switches should be a trunk.",
   "The router interfaces must be encapsulated with the 802.1Q protocol."
  ],
  "correct": "C",
  "explanation": "Each interface on a router must be in a different network. If two interfaces are in the same network, the router will not accept it and show error\nwhen the administrator assigns it.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q54",
  "num": 54,
  "question": "Which two statements are true about the command ip route 172.16.3.0 255.255.255.0 192.168.2.4? (Choose two.)",
  "options": [
   "It establishes a static route to the 172.16.3.0 network.",
   "It establishes a static route to the 192.168.2.0 network.",
   "It configures the router to send any traffic for an unknown destination to the 172.16.3.0 network.",
   "It configures the router to send any traffic for an unknown destination out the interface with the address 192.168.2.4.",
   "It uses the default administrative distance.",
   "It is a route that would be used last if other routes to the same destination exist."
  ],
  "correct": "AE",
  "explanation": "AE (100%)\n\n\uf147 \uf007 SScott Highly Voted \uf164 2 years, 3 months ago\nA and E are correct. The tricky part to the question is the prefix subnet 172.16.3.0 which is the destination network. B is wrong. The 192.168.2.0\nnetwork is the next hop used to reach the static route destination. No metric is set so the default value of 6 will be used for the administrative\ndistance.\nhttps://www.cisco.com/c/en/us/td/docs/routers/nfvis/switch_command/b-nfvis-switch-command-reference/ip_route_commands.pdf",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q55",
  "num": 55,
  "question": "What are two benefits of private IPv4 IP addresses? (Choose two.)",
  "options": [
   "They are routed the same as public IP addresses.",
   "They are less costly than public IP addresses.",
   "They can be assigned to devices without Internet connections.",
   "They eliminate the necessity for NAT policies.",
   "They eliminate duplicate IP conflicts."
  ],
  "correct": "BC",
  "explanation": "BC (78%)\n\nAB (22%)\n\n\uf147 \uf007 ZUMY Highly Voted \uf164 2 years, 4 months ago\nB & C are correct!",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q56",
  "num": 56,
  "question": "What are two benefits that the UDP protocol provide for application traffic? (Choose two.)",
  "options": [
   "UDP traffic has lower overhead than TCP traffic",
   "UDP provides a built-in recovery mechanism to retransmit lost packets",
   "The CTL field in the UDP packet header enables a three-way handshake to establish the connection",
   "UDP maintains the connection state to provide more stable connections than TCP",
   "The application can use checksums to verify the integrity of application data"
  ],
  "correct": "AE",
  "explanation": "AE (100%)\n\n\uf147 \uf007 Ali526 Highly Voted \uf164 2 years, 8 months ago\nAE are correct.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q57",
  "num": 57,
  "question": "Which two goals reasons to implement private IPv4 addressing on your network? (Choose two.)",
  "options": [
   "Comply with PCI regulations",
   "Conserve IPv4 address",
   "Reduce the size of the forwarding table on network routers",
   "Reduce the risk of a network security breach",
   "Comply with local law"
  ],
  "correct": "BD",
  "explanation": "BD (100%)\n\n\uf147 \uf007 CiscoTerminator Highly Voted \uf164 2 years, 1 month ago\nI think the answer B should be more specific like \"To conserve IPv4 Public Addresses\" - otherwise you cant conserve IPv4 addresses by using IPv4\naddresses.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q58",
  "num": 58,
  "question": "Which WAN access technology is preferred for a small office / home office architecture?",
  "options": [
   "broadband cable access",
   "frame-relay packet switching",
   "dedicated point-to-point leased line",
   "Integrated Services Digital Network switching"
  ],
  "correct": "A",
  "explanation": "Service providers provide Internet access using broadband services such as DSL, cable, and satellite access. Broadband connections are\n\ntypically used to connect small offices and telecommuting employees to a corporate site over the Internet. Data traveling between corporate\nsites over the public WAN infrastructure should be protected using VPNs.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q59",
  "num": 59,
  "question": "Which two WAN architecture options help a business scalability and reliability for the network? (Choose two.)",
  "options": [
   "asychronous routing",
   "single-homed branches",
   "dual-homed branches",
   "static routing",
   "dynamic routing"
  ],
  "correct": "CE",
  "explanation": "Reference:\nhttps://www.cisco.com/c/dam/en/us/td/docs/nsite/wan_optimization/WANoptSolutionGd.pdf",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q60",
  "num": 60,
  "question": "What is the binary pattern of unique ipv6 unique local address?",
  "options": [
   "00000000",
   "11111100",
   "11111111",
   "11111101"
  ],
  "correct": "B",
  "explanation": "A IPv6 Unique Local Address is an IPv6 address in the block FC00::/7, which means that IPv6 Unique Local addresses begin with 7 bits with\nexact binary pattern as 1111 110 -> Answer B is correct.\nNote: IPv6 Unique Local Address is the approximate IPv6 counterpart of the IPv4 private address. It is not routable on the global Internet.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q61",
  "num": 61,
  "question": "Which two options are the best reasons to use an IPV4 private IP space? (Choose two.)",
  "options": [
   "to enable intra-enterprise communication",
   "to implement NAT",
   "to connect applications",
   "to conserve global address space",
   "to manage routing overhead"
  ],
  "correct": "AD",
  "explanation": "AD (75%)\n\nAB (25%)\n\n\uf147 \uf007 Ali526 Highly Voted \uf164 2 years, 8 months ago\nAD correct.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q62",
  "num": 62,
  "question": "Refer to the exhibit. When PC1 sends a packet to PC2, the packet has which source and destination IP address when it arrives at interface Gi0/0\non router R2?",
  "options": [
   "source 192.168.10.10 and destination 10.10.2.2",
   "source 192.168.20.10 and destination 192.168.20.1",
   "source 192.168.10.10 and destination 192.168.20.10",
   "source 10.10.1.1 and destination 10.10.2.2"
  ],
  "correct": "C",
  "explanation": "The source and destination IP addresses of the packets are unchanged on all the way. Only source and destination MAC addresses are\nchanged.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q63",
  "num": 63,
  "question": "What is the same for both copper and fiber interfaces when using SFP modules?",
  "options": [
   "They support an inline optical attenuator to enhance signal strength",
   "They accommodate single-mode and multi-mode in a single module",
   "They provide minimal interruption to services by being hot-swappable",
   "They offer reliable bandwidth up to 100 Mbps in half duplex mode"
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 ZUMY Highly Voted \uf164 2 years ago\nC is correct\nHot-Swap-Component that of device can be removed or install without powering down the device.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q64",
  "num": 64,
  "question": "What are two functions of a server on a network? (Choose two.)",
  "options": [
   "handles requests from multiple workstations at the same time",
   "achieves redundancy by exclusively using virtual server clustering",
   "housed solely in a data center that is dedicated to a single client achieves redundancy by exclusively using virtual server clustering",
   "runs the same operating system in order to communicate with other servers",
   "runs applications that send and retrieve data for workstations that make requests"
  ],
  "correct": "AE",
  "explanation": "AE (100%)\n\n\uf147 \uf007 Sutokuto Highly Voted \uf164 9 months ago\nSelected Answer: AE\n\nIf an answer choice has definitive language like \"exclusively\" or \"solely\" it's usually wrong.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q65",
  "num": 65,
  "question": "Which function is performed by the collapsed core layer in a two-tier architecture?",
  "options": [
   "enforcing routing policies",
   "marking interesting traffic for data policies",
   "applying security policies",
   "attaching users to the edge of the network"
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 Benjamin8189 Highly Voted \uf164 2 years ago\nlow cost at first but will be difficult to scale in future, because cable requirement increase, each new site require full mash to other building due no\nto centralize core, also increase routing complexity and addition routing peer needed in new protocol. Three-tier will be more efficient.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q66",
  "num": 66,
  "question": "What is the primary function of a Layer 3 device?",
  "options": [
   "to transmit wireless traffic between hosts",
   "to analyze traffic and drop unauthorized traffic from the Internet",
   "to forward traffic within the same broadcast domain",
   "to pass traffic between different networks"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 Bhrino 4 months, 1 week ago\nLayer 3 = different network\nLayer 2: same network",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q67",
  "num": 67,
  "question": "Which two functions are performed by the core layer in a three-tier architecture? (Choose two.)",
  "options": [
   "Provide uninterrupted forwarding service",
   "Inspect packets for malicious activity",
   "Ensure timely data transfer between layers",
   "Provide direct connectivity for end user devices",
   "Police traffic that is sent to the edge of the network"
  ],
  "correct": "AC",
  "explanation": "Reference:\nhttps://www.mcmcse.com/cisco/guides/hierarchical_model.shtml",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q68",
  "num": 68,
  "question": "What is a recommended approach to avoid co-channel congestion while installing access points that use the 2.4 GHz frequency?",
  "options": [
   "different nonoverlapping channels",
   "one overlapping channel",
   "one nonoverlapping channel",
   "different overlapping channels"
  ],
  "correct": "A",
  "explanation": "A (70%)\n\nC (30%)\n\n\uf147 \uf007 Scooter96 Highly Voted \uf164 2 years, 1 month ago\nI agree, A. it is. Each AP operates in one channel. The goal is that neighboring APs don't use the same channel, so you need multiple nonoverlapping channel, or you have co-channel interference, which slows down your wireless operation. (Adjacent channel interference causes\ncollisions)",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q69",
  "num": 69,
  "question": "A manager asks a network engineer to advise which cloud service models are used so employees do not have to waste their time installing,\nmanaging, and updating software that is only used occasionally. Which cloud service model does the engineer recommend?",
  "options": [
   "infrastructure-as-a-service",
   "platform-as-a-service",
   "business process as service to support different types of service",
   "software-as-a-service"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 mugtaba 4 months, 1 week ago\naswer D",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q70",
  "num": 70,
  "question": "What are two functions of a Layer 2 switch? (Choose two.)",
  "options": [
   "acts as a central point for association and authentication servers",
   "selects the best route between networks on a WAN",
   "moves packets within a VLAN",
   "moves packets between different VLANs",
   "makes forwarding decisions based on the MAC address of a packet"
  ],
  "correct": "CE",
  "explanation": "CE (100%)\n\n\uf147 \uf007 ismatdmour Highly Voted \uf164 1 year, 6 months ago\nSelected Answer: CE\n\nC and E. Little confusion at first about E because of the use of the word \"Packet\" which is a layer 3 term rather than using \"Frame\" for a layer 2\nconcept. However, we need to remember that packet is a general term that is also used to replace other terms like a \"frame\" of other layers. CISCO\nquestions like this tend to use it as well. Also, a L3 packet encapsulates a L2 frame which in turn embed a frame.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q72",
  "num": 72,
  "question": "An engineer observes high usage on the 2.4GHz channels and lower usage on the 5GHz channels. What must be configured to allow clients to\npreferentially use\n5GHz access points?",
  "options": [
   "Client Band Select",
   "Re-Anchor Roamed Clients",
   "OEAP Spilt Tunnel",
   "11ac MU-MIMO"
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\f\uf147 \uf007 Shaz313 Highly Voted \uf164 2 years, 2 months ago\nBand Select is Cisco's terminology for Band Steering. When enabled it encourages stations onto the 5 GHz band. This is achieved by suppressing\n2.4 GHz probe response frames to station probe requests and by responding with 5 GHz probe response frames first.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q73",
  "num": 73,
  "question": "Which networking function occurs on the data plane?",
  "options": [
   "processing inbound SSH management traffic",
   "sending and receiving OSPF Hello packets",
   "facilitates spanning-tree elections",
   "forwarding remote client/server traffic"
  ],
  "correct": "D",
  "explanation": "D (90%)\n\n10%\n\n\uf147 \uf007 Shaz313 Highly Voted \uf164 2 years, 2 months ago\nNetworking devices operate in two planes; the data plane and the control plane. The control plane maintains Layer 2 and Layer 3 forwarding\nmechanisms using the CPU. The data plane forwards traffic flows",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q74",
  "num": 74,
  "question": "Under which condition is TCP preferred over UDP?",
  "options": [
   "UDP is used when low latency is optimal, and TCP is used when latency is tolerable.",
   "TCP is used when dropped data is more acceptable, and UDP is used when data is accepted out-of-order.",
   "TCP is used when data reliability is critical, and UDP is used when missing packets are acceptable.",
   "UDP is used when data is highly interactive, and TCP is used when data is time-sensitive."
  ],
  "correct": "C",
  "explanation": "C (87%)\n\n13%\n\n\uf147 \uf007 i_am_confused Highly Voted \uf164 1 year, 2 months ago\nSelected Answer: C\n\nC explains why you would pick TCP over UDP. A explains why you would pick UDP over TCP.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q75",
  "num": 75,
  "question": "Refer to the exhibit. Shortly after SiteA was connected to SiteB over a new single-mode fiber path, users at SiteA report intermittent connectivity\nissues with applications hosted at SiteB. What is the cause of the intermittent connectivity issue?",
  "options": [
   "Interface errors are incrementing.",
   "High usage is causing high latency.",
   "An incorrect SFP media type was used at SiteA.",
   "The sites were connected with the wrong cable type."
  ],
  "correct": "A",
  "explanation": "The only indicator of any issues here is the reliability 166/255 on SiteA. When the input and output errors increase, they affect the reliability\ncounter. This indicates how likely it is that a packet can be delivered or received successfully. Reliability is calculated like this: reliability =\nnumber of packets / number of total frames.\nThe value of 255 is the highest value meaning that the interface is very reliable at the moment. The calculation above is done every 5 minutes.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q76",
  "num": 76,
  "question": "A network engineer must configure the router R1 GigabitEthernet1/1 interface to connect to the router R2 GigabitEthernet1/1 interface. For the\nconfiguration to be applied, the engineer must compress the address 2001:0db8:0000:0000:0500:000a:400F:583B. Which command must be\nissued on the interface?",
  "options": [
   "ipv6 address 2001::db8:0000::500:a:400F:583B",
   "ipv6 address 2001:db8:0::500:a:4F:583B",
   "ipv6 address 2001:db8::500:a:400F:583B",
   "ipv6 address 2001:0db8::5:a:4F:583B"
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 SScott Highly Voted \uf164 2 years ago\nC is the right compressed address.\nhttps://iplocation.io/ipv6-compress",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q77",
  "num": 77,
  "question": "What is a network appliance that checks the state of a packet to determine whether the packet is legitimate?",
  "options": [
   "Layer 2 switch",
   "LAN controller",
   "load balancer",
   "firewall"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 hp2wx Highly Voted \uf164 1 year, 1 month ago\nAnswer is D as a firewall is used for stateful packet inspection.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q78",
  "num": 78,
  "question": "What is a role of access points in an enterprise network?",
  "options": [
   "integrate with SNMP in preventing DDoS attacks",
   "serve as a first line of defense in an enterprise network",
   "connect wireless devices to a wired network",
   "support secure user logins to devices on the network"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 YoniEth Highly Voted \uf164 2 years, 2 months ago\nC is correct.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q79",
  "num": 79,
  "question": "An implementer is preparing hardware for virtualization to create virtual machines on a host. What is needed to provide communication between\nhardware and virtual machines?",
  "options": [
   "router",
   "hypervisor",
   "switch",
   "straight cable"
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 ABIboyscorner Highly Voted \uf164 1 year, 11 months ago\nA computer that hosts VMs requires specialized software called a hypervisor. The hypervisor emulates the computer's CPU, memory, hard disk,\nnetwork and other hardware resources, creating a pool of resources that can be allocated to the individual VMs according to their specific\nrequirements. The hypervisor can support multiple virtual hardware platforms that are isolated from each other, enabling VMs to run Linux and\nWindows Server OSes on the same physical host.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q80",
  "num": 80,
  "question": "How does a Cisco Unified Wireless Network respond to Wi-Fi channel overlap?",
  "options": [
   "It allows the administrator to assign the channels on a per-device or per-interface basis.",
   "It segregates devices from different manufactures onto different channels.",
   "It analyzes client load and background noise and dynamically assigns a channel.",
   "It alternates automatically between 2.4 GHz and 5 GHz on adjacent access points."
  ],
  "correct": "C",
  "explanation": "Reference:\nhttps://www.cisco.com/c/en/us/td/docs/wireless/controller/technotes/8-3/b_RRM_White_Paper/dca.html",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q81",
  "num": 81,
  "question": "In which situation is private IPv4 addressing appropriate for a new subnet on the network of an organization?",
  "options": [
   "The network has multiple endpoint listeners, and it is desired to limit the number of broadcasts.",
   "The ISP requires the new subnet to be advertised to the Internet for web services.",
   "There is limited unique address space, and traffic on the new subnet will stay local within the organization.",
   "Traffic on the subnet must traverse a site-to-site VPN to an outside organization."
  ],
  "correct": "C",
  "explanation": "C (83%)\n\nOther\n\n\uf147 \uf007 Marcos9410 Highly Voted \uf164 1 year, 2 months ago\nSelected Answer: C\n\nC is correct",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q83",
  "num": 83,
  "question": "Which 802.11 frame type is indicated by a probe response after a client sends a probe request?",
  "options": [
   "data",
   "management",
   "control",
   "action"
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 ZUMY Highly Voted \uf164 1 year, 4 months ago\nB is correct\nManagement frames: Used for joining and leaving a wireless cell. Management frame types include association request, association response, and\nreassociation request, just to name a few. (See Table 7-2 for a complete list.)\nControl frames: Used to acknowledge when data frames are received.\nData frames: Frames that contain data.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q84",
  "num": 84,
  "question": "What is the difference in data transmission delivery and reliability between TCP and UDP?",
  "options": [
   "TCP transmits data at a higher rate and ensures packet delivery. UDP retransmits lost data to ensure applications receive the data on the\nremote end.",
   "TCP requires the connection to be established before transmitting data. UDP transmits data at a higher rate without ensuring packet\ndelivery.",
   "UDP sets up a connection between both devices before transmitting data. TCP uses the three-way handshake to transmit data with a\nreliable connection.",
   "UDP is used for multicast and broadcast communication. TCP is used for unicast communication and transmits data at a higher rate with\nerror checking."
  ],
  "correct": "B",
  "explanation": "UDP speeds up transmissions by enabling the transfer of data before an agreement is provided by the receiving party. As a result, UDP is\nbeneficial in time- sensitive communications, including voice over IP (VoIP), domain name system (DNS) lookup, and video or audio playback.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q85",
  "num": 85,
  "question": "Refer to the exhibit. When PC-A sends traffic to PC-B, which network component is in charge of receiving the packet from PC-A, verifying the IP\naddresses, and forwarding the packet to PC-B?",
  "options": [
   "router",
   "Layer 2 switch",
   "load balancer",
   "firewall"
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 SparkySM Highly Voted \uf164 1 year, 7 months ago\nthe key point is \"verifying the IP addresses,\" it is done by router .since the sw do things with MAC",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q86",
  "num": 86,
  "question": "What is the maximum bandwidth of a T1 point-to-point connection?",
  "options": [
   "1.544 Mbps",
   "2.048 Mbps",
   "34.368 Mbps",
   "43.7 Mbps"
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 Chupacabro Highly Voted \uf164 1 year, 8 months ago\nA. T1\nB. E1\nC. E3\nD. T3\nhttps://www.ciscopress.com/articles/article.asp?p=2202411&seqNum=7",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q87",
  "num": 87,
  "question": "What are two similarities between UTP Cat 5e and Cat 6a cabling? (Choose two.)",
  "options": [
   "Both support speeds up to 10 Gigabit.",
   "Both support speeds of at least 1 Gigabit.",
   "Both support runs of up to 55 meters.",
   "Both support runs of up to 100 meters.",
   "Both operate at a frequency of 500 MHz."
  ],
  "correct": "BD",
  "explanation": "BD (100%)\n\n\uf147 \uf007 Marcos9410 Highly Voted \uf164 1 year, 2 months ago\nB and D are correct.\nUTP Cables CAT 5e:\nFrecuency: 100 MHz\nMax. Bandwidth: 1 Gbps\nMax. Distance: 100 m\nUTP Cables CAT 6a:\nFrecuency: 500 MHz\nMax. Bandwidth: 10 Gbps\nMax. Distance: 100 m",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q88",
  "num": 88,
  "question": "What is a characteristic of cloud-based network topology?",
  "options": [
   "onsite network services are provided with physical Layer 2 and Layer 3 components",
   "wireless connections provide the sole access method to services",
   "physical workstations are configured to share resources",
   "services are provided by a public, private, or hybrid deployment"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 Vlad_Is_Love_ua 10 months ago\nD is correct",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q89",
  "num": 89,
  "question": "Which network action occurs within the data plane?",
  "options": [
   "reply to an incoming ICMP echo request",
   "make a configuration change from an incoming NETCONF RPC",
   "run routing protocols (OSPF, EIGRP, RIP, BGP)",
   "compare the destination IP address to the IP routing table"
  ],
  "correct": "D",
  "explanation": "D (86%)\n\n14%\n\n\uf147 \uf007 Dante_Dan Highly Voted \uf164 1 year, 7 months ago\nSelected Answer: D\n\nExtracted from Book #2, page 359:\n\"... the following list details some of the more common actions that a networking device does that fit into the data plane:\n- De-encapsulating and re-encapsulating a packet in a data-link frame (routers, layer 3 switches).\n- Adding or removing an 802.1Q trunking header (routers and switches).\n- Matching an ethernet frame's destination MAC address to the MAC address table (layer 2 switches).\n- Matching an IP packet's destination IP address to the IP routing table (routers, layer 3 switches).\n- Encrypting the data and adding a new IP header (for VPN processing).\n- Changing the source or destination IP address (for NAT) processing).\n- Discarding a message due to a filter (ACLs, port security).\nAll the items in the list make up the data plane, because the data plane includes all actions done per message.\"",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q90",
  "num": 90,
  "question": "Refer to the exhibit. R1 has just received a packet from host A that is destined to host B. Which route in the routing table is used by R1 to reach\nhost B?",
  "options": [
   "10.10.13.0/25 [1/0] via 10.10.10.2",
   "10.10.13.0/25 [108/0] via 10.10.10.10",
   "10.10.13.0/25 [110/2] via 10.10.10.6",
   "10.10.13.0/25 [110/2] via 10.10.10.2"
  ],
  "correct": "B",
  "explanation": "B (83%)\n\nA (17%)\n\n\uf147 \uf007 Jbcrggddfhh Highly Voted \uf164 1 year, 4 months ago\nB is correct; it uses the lowest AD out of all the routes presented that go to the 10.10.13.0/25 subnet. A is a default route and would only be used if\nthere wasn't a route to that subnet in the routing table.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q91",
  "num": 91,
  "question": "Which two network actions occur within the data plane? (Choose two.)",
  "options": [
   "Run routing protocols.",
   "Make a configuration change from an incoming NETCONF RPC.",
   "Add or remove an 802.1Q trunking header.",
   "Match the destination MAC address to the MAC address table.",
   "Reply to an incoming ICMP echo request."
  ],
  "correct": "CD",
  "explanation": "CD (89%)\n\n6%\n\n\uf147 \uf007 mantest Highly Voted \uf164 1 year, 4 months ago\nC&D are correct ans..",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q92",
  "num": 92,
  "question": "What are network endpoints?",
  "options": [
   "support inter-VLAN connectivity",
   "a threat to the network if they are compromised",
   "act as routers to connect a user to the service provider network",
   "enforce policies for campus-wide traffic going to the Internet"
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 Smaritz Highly Voted \uf164 1 year, 3 months ago\nStrangely worded question and answer",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q93",
  "num": 93,
  "question": "Refer to the exhibit. The link between PC1 and the switch is up, but it is performing poorly. Which interface condition is causing the performance\nproblem?",
  "options": [
   "There is an issue with the fiber on the switch interface.",
   "There is a duplex mismatch on the interface.",
   "There is an interface type mismatch.",
   "There is a speed mismatch on the interface."
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 Jbcrggddfhh Highly Voted \uf164 1 year, 4 months ago\nThe answer is B.\nThe PC's port runs in full duplex, while the Fa0/1 port on the switch is in auto-negotiate mode.\nThis results in a duplex mismatch that causes the switchport to operate as half-duplex, which culminates in poor performance on the link.\n\"A duplex mismatch occurs when two connected devices are configured in different duplex modes.\nThis may happen, for example, if one is configured for autonegotiation while the other one has a fixed mode of operation that is full duplex (no\nautonegotiation). In such conditions, the autonegotiation device correctly detects the speed of operation, but is unable to correctly detect the\nduplex mode.\nAs a result, it sets the correct speed but assumes half-duplex mode.\nWhen a device is operating in full duplex while the other one operates in half duplex, the connection works reliably only at a very low throughput.\"\nReference: https://en.wikipedia.org/wiki/Autonegotiation#Duplex_mismatch",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q94",
  "num": 94,
  "question": "Why was the RFC 1918 address space defined?",
  "options": [
   "conserve public IPv4 addressing",
   "support the NAT protocol",
   "preserve public IPv6 address space",
   "reduce instances of overlapping IP addresses"
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 MauroC19 1 month ago\nSelected Answer: A\n\nAnswer is A. RFC 1918 was about private ipv4 addressing",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q97",
  "num": 97,
  "question": "Which type of organization should use a collapsed-core architecture?",
  "options": [
   "small and needs to reduce networking costs",
   "large and must minimize downtime when hardware fails",
   "large and requires a flexible, scalable network design",
   "currently small but is expected to grow dramatically in the near future"
  ],
  "correct": "A",
  "explanation": "It is ideal for small companies: The collapsed core model is a reduced version of the three-tier model. The deduction was made to create a\nnetwork for small and medium-sized campuses. Therefore, smaller institutions can get the advantage of using a collapsed core network while\nstill gaining the same benefits they would if they were using a three-tier model. Small organizations often cannot afford the hardware and\nhuman resources to run the network can benefit greatly with less oversight necessary.\nAnd reduces cost: In a traditional three-tier campus network, the core layer is typically a complex and expensive piece of hardware. This layer is\neliminated with collapsed core architecture, reducing both cost and complexity.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q98",
  "num": 98,
  "question": "A network administrator is setting up a new IPv6 network using the 64-bit address 2001:0EB8:00C1:2200:0001:0000:0000:0331/64. To simplify\nthe configuration, the administrator has decided to compress the address. Which IP address must the administrator configure?",
  "options": [
   "ipv6 address 2001:EB8:C1:22:1::331/64",
   "ipv6 address 21:EB8:C1:2200:1::331/64",
   "ipv6 address 2001:EB8:C1:2200:1:0000:331/64",
   "ipv6 address 2001:EB8:C1:2200:1::331/64"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 Junior_Network 19 hours, 44 minutes ago\nSelected Answer: D\n\nD is correct",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q100",
  "num": 100,
  "question": "What is an appropriate use for private IPv4 addressing?",
  "options": [
   "to allow hosts inside to communicate in both directions with hosts outside the organization",
   "on internal hosts that stream data solely to external resources",
   "on the public-facing interface of a firewall",
   "on hosts that communicate only with other internal hosts"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 GreatDane Highly Voted \uf164 8 months, 2 weeks ago\nSelected Answer: D\n\nA. to allow hosts inside to communicate in both directions with hosts outside the organization\nHost inside a LAN may also use public IP addresses to communicate with hosts inside and outside the organization.\nWrong answer.\nB. on internal hosts that stream data solely to external resources\nLook at answer A.\nWrong answer.\nC. on the public-facing interface of a firewall\nSince private IP addresses can not be used on the public Internet, how can you configure a private IP address on the public-facing interface of a\nfirewall?\nWrong answer.\nD. on hosts that communicate only with other internal hosts\nWould you buy and use public IP addresses for hosts that communicate only inside your LAN?\nCorrect answer.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q101",
  "num": 101,
  "question": "Refer to the exhibit. An engineer is configuring the HO router. Which IPv6 address configuration must be applied to the router fa0/1 interface for\nthe router to assign a unique 64-bit IPv6 address to itself?",
  "options": [
   "ipv6 address 2001:DB8:0:1:FFFF:C601:420F:7/64",
   "ipv6 address 2001:DB8:0:1:FE80:C601:420F:7/64",
   "ipv6 address 2001:DB8:0:1:C601:42FF:FE0F:7/64",
   "ipv6 address 2001:DB8:0:1:C601:42FF:800F:7/64"
  ],
  "correct": "B",
  "explanation": "C (83%)\n\nB (17%)\n\n\uf147 \uf007 coralreef Highly Voted \uf164 10 months, 1 week ago\nLETTER C IS THE CORRECT ANSWER\nalthough IPv6 SLAAC (EUI-64) process is missing:\n48 bit MAC Address = C6-01-420F:0007\nsplit address in the middle = C6-01-42 0F-00-07\ninsert FF:FE = C6-01-42-FF:FE-0F-00-07\nhexadecimal = C\"6\"-01-42-FF:FE-0F-00-07\n7th bit in binary = 6 = 0000 0110\n7th bit flip changes 6 to 4 = 0000 0100\n64 bit host interface ID = C401:42FF:FE0F:0007\nLETTER C IS THE CORRECT ANSWER\nso,\nipv6 address 2001:DB8:0:1:C601.42FF:FE0F:7 /64",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q102",
  "num": 102,
  "question": "What is a similarity between 1000BASE-LX and 1000BASE-T standards?",
  "options": [
   "Both use the same data-link header and trailer formats.",
   "Both cable types support RJ-45 connectors.",
   "Both support up to 550 meters between nodes.",
   "Both cable types support LR connectors."
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 ricky1802 Highly Voted \uf164 7 months, 2 weeks ago\nSelected Answer: A\n\n1000BASE-LX:\nUsed for Gigabit Ethernet over optical fiber\nSupports distances up to 10 km\nUses a single-mode fiber (SMF)\n1000BASE-T:\nUsed for Gigabit Ethernet over copper cable\nSupports distances up to 100 meters\nUses 4 pairs of copper wires\nSupports speeds up to 1000 Mbps (1 Gbps)",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q103",
  "num": 103,
  "question": "Refer to the exhibit. The given Windows PC is requesting the IP address of the host at www.cisco.com. To which IP address is the request sent?",
  "options": [
   "192.168.1.253",
   "192.168.1.100",
   "192.168.1.226",
   "192.168.1.254"
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 kyleptt 3 months ago\nWhile I get that the DNS sever does this won't that be for local translations ? and the gateway to reach external DNS ?",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q104",
  "num": 104,
  "question": "Which function forwards frames to ports that have a matching destination MAC address?",
  "options": [
   "frame flooding",
   "frame filtering",
   "frame pushing",
   "frame switching"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 Goh0503 Highly Voted \uf164 11 months, 4 weeks ago\nAnswer is D\nFlooding means that the switch sends the incoming frame to all occupied and active ports (except for the one from which it was received\nIn forwarding , it first looks up the destination address in the MAC Address Table. It then forwards the frame to that specific port.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q105",
  "num": 105,
  "question": "Which type of IPv6 address is similar to a unicast address but is assigned to multiple devices on the same network at the same time?",
  "options": [
   "global unicast address",
   "link-local address",
   "anycast address",
   "multicast address"
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 ricky1802 Highly Voted \uf164 7 months, 2 weeks ago\nSelected Answer: C\n\nAn anycast address is similar to a unicast address but is assigned to multiple devices on the same network at the same time. When a device sends a\npacket to an anycast address, it is delivered to one of the devices with that address, selected based on the routing protocol's best-effort algorithm.\nThis is useful for applications like load balancing and failover, where multiple devices provide the same service and it doesn't matter which one\nhandles a particular request.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q106",
  "num": 106,
  "question": "What is a characteristic of private IPv4 addressing?",
  "options": [
   "composed of up to 65,536 available addresses",
   "issued by IANA in conjunction with an autonomous system number",
   "used without tracking or registration",
   "traverse the Internet when an outbound ACL is applied"
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 iMo7ed 7 months, 1 week ago\nSelected Answer: C\n\nC is correct",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q107",
  "num": 107,
  "question": "What is a function of an endpoint on a network?",
  "options": [
   "provides wireless services to users in a building",
   "connects server and client device to a network",
   "allows users to record data and transmit to a file server",
   "forwards traffic between VLANs on a network"
  ],
  "correct": "C",
  "explanation": "An endpoint is a remote computing device that communicates back and forth with a network to which it is connected. Examples of endpoints\ninclude:\n\u2711 Desktops\n\u2711 Laptops\n\u2711 Smartphones\n\u2711 Tablets\n\u2711 Servers\n\u2711 Workstations\nInternet-of-things (IoT) devices",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q108",
  "num": 108,
  "question": "What is the function of a controller in controller-based networking?",
  "options": [
   "It serves as the centralized management point of an SDN architecture",
   "It is a pair of core routers that maintain all routing decisions for a campus",
   "It centralizes the data plane for the network",
   "It is the card on a core router that maintains all routing decisions for a campus."
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 dearc 5 months, 2 weeks ago\nSelected Answer: A\n\nThe function of a controller in controller-based networking is A. It serves as the centralized management point of an SDN (Software-Defined\nNetworking) architecture . The controller is responsible for managing network devices and implementing network policies, as well as providing a\ncentral point of control and visibility for the entire network. It enables dynamic, programmatically efficient network configuration through the use\nof software-based controllers or a centralized controller with open APIs (Application Programming Interfaces) that communicate with network\ndevices and applications . This promotes increased network agility, scalability, and flexibility in response to changing business needs.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q109",
  "num": 109,
  "question": "Refer to the exhibit. Each router must be configured with the last usable IP address in the subnet. Which configuration fulfills this requirement?",
  "options": [
   "R7# interface FastEthernet1/0 ip address 10.88.31.127 255.255.255.192 R8# interface FastEthernet0/0 ip address 10.19.63.95\n255.255.255.240 R9# interface FastEthernet1/1 ip address 10.23.98.159 255.255.255.224",
   "R7# interface FastEthernet1/0 ip address 10.88.31.126 255.255.255.240 R8# interface FastEthernet0/0 ip address 10.19.63.94\n255.255.255.192 R9# interface FastEthernet1/1 ip address 10.23.98.158 255.255.255.248",
   "R7# interface FastEthernet1/0 ip address 10.88.31.127 255.255.255.240 R8# interface FastEthernet0/0 ip address 10.19.63.95\n255.255.255.192 R9# interface FastEthernet1/1 ip address 10.23.98.159 255.255.255.248",
   "R7# interface FastEthernet1/0 ip address 10.88.31.126 255.255.255.192 R8# interface FastEthernet0/0 ip address 10.19.63.94\n255.255.255.240 R9# interface FastEthernet1/1 ip address 10.23.98.158 255.255.255.224"
  ],
  "correct": "D",
  "explanation": "D (83%)\n\nB (17%)\n\n\uf147 \uf007 Customexit Highly Voted \uf164 10 months, 3 weeks ago\nYou can do this fairly easily by process of elimination.\nStarting with R7, a /26 is .192, so that leaves us with A or D.\nThe first difference between A and D is the last octet, 127 or 126 (respectively).\nDo whatever process you prefer for subnetting and we figure that .126 is the last usable. .127 is the broadcast.\nAnswer is D.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q110",
  "num": 110,
  "question": "How do TCP and UDP fit into a query-responsible model?",
  "options": [
   "TCP avoids using sequencing and UDP avoids using acknowledgments",
   "TCP establishes a connection prior to sending data, and UDP sends immediately",
   "TCP encourages out-of-order packet delivery, and UDP prevents re-ordering",
   "TCP uses error detection for packets, and UDP uses error recovery."
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 Xhuzepe 2 months, 4 weeks ago\nSelected Answer: B\n\nOut of the 4 answers, B is the correct one as it mentions 2 real properties (one for TCP and one for UPD).",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q111",
  "num": 111,
  "question": "What provides centralized control of authentication and roaming in an enterprise network?",
  "options": [
   "a lightweight access point",
   "a wireless LAN controller",
   "a firewall",
   "a LAN switch"
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 StingVN 4 months, 2 weeks ago\nAgree with B",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q112",
  "num": 112,
  "question": "Which set of 2 4 GHz nonoverlapping wireless channels is standard in the United States?",
  "options": [
   "channels 1, 6, 11, and 14",
   "channels 2, 7, 9, and 11",
   "channels 2, 7, and 11",
   "channels 1, 6, and 11"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 mrgreat 1 year ago\nD is correct\nhttps://www.metageek.com/training/resources/why-channels-1-6-11/",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q113",
  "num": 113,
  "question": "A network engineer is installing an IPv6-only capable device. The client has requested that the device IP address be reachable only from the\ninternal network.\nWhich type of IPv6 address must the engineer assign?",
  "options": [
   "IPv4-compatible IPv6 address",
   "unique local address",
   "link-local address",
   "aggregatable global address"
  ],
  "correct": "C",
  "explanation": "B (97%)\n\n\uf147 \uf007 mrgreat Highly Voted \uf164 1 year ago\nIt should be B! Only reachable from the internal network, not the internet.\nhttps://www.ciscopress.com/articles/article.asp?p=2803866&seqNum=4\nGlobal unicast: A routable address in the IPv6 Internet, similar to a public IPv4 address.\nLink-local: Used only to communicate with devices on the same local link.\nLoopback: An address not assigned to any physical interface that can be used for a host to send an IPv6 packet to itself.\nUnspecified address: Used only as a source address and indicates the absence of an IPv6 address.\nUnique local: Similar to a private address in IPv4 (RFC 1918) and not intended to be routable in the IPv6 Internet. However, unlike RFC 1918\naddresses, these addresses are not intended to be statefully translated to a global unicast address.\nIPv4 embedded: An IPv6 address that carries an IPv4 address in the low-order 32 bits of the address.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q114",
  "num": 114,
  "question": "What is a requirement for nonoverlapping Wi-Fi channels?",
  "options": [
   "different security settings",
   "discontinuous frequency ranges",
   "unique SSIDs",
   "different transmission speeds"
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 Isuzu 4 months, 2 weeks ago\nThe requirement for non-overlapping Wi-Fi channels is that they must use discontinuous frequency ranges. Wi-Fi channels are defined by a specific\nfrequency range, and adjacent channels overlap with each other. If two access points are using channels that overlap, they will cause interference\nand reduce the quality of the Wi-Fi network.\nTo avoid interference, it's necessary to choose Wi-Fi channels that don't overlap. The most common Wi-Fi channels in use are 1, 6, and 11, and they\ndon't overlap with each other. This means that if you have multiple access points in the same area, you can assign each access point a different\nchannel from this set of channels to avoid interference.\nDifferent security settings, unique SSIDs, and different transmission speeds are not requirements for non-overlapping Wi-Fi channels, but they are\nimportant considerations for setting up a secure and efficient Wi-Fi network.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q115",
  "num": 115,
  "question": "A network engineer must implement an IPv6 configuration on the vlan 2000 interface to create a routable locally-unique unicast address that is\nblocked from being advertised to the internet. Which configuration must the engineer apply?",
  "options": [
   "interface vlan 2000 ipv6 address ff00:0000:aaaa::1234:2343/64",
   "interface vlan 2000 ipv6 address fd00::1234:2343/64",
   "interface vlan 2000 ipv6 address fe80:0000:aaaa::1234:2343/64",
   "interface vlan 2000 ipv6 address fc00:0000:aaaa::a15d:1234:2343:8aca/64"
  ],
  "correct": "D",
  "explanation": "B (86%)\n\n14%\n\n\uf147 \uf007 cyborg7 Highly Voted \uf164 11 months, 2 weeks ago\nD is incorrect as it contains :: which replaced with 0000.0000 will make the address longer than 128bits\nCorrect is B",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q116",
  "num": 116,
  "question": "What are two characteristics of an SSID? (Choose two.)",
  "options": [
   "It uniquely identifies a client in a WLAN.",
   "It is at most 32 characters long",
   "It uniquely identifies an access point in a WLAN",
   "It provides secured access to a WLAN.",
   "It can be hidden or broadcast in a WLAN."
  ],
  "correct": "CD",
  "explanation": "BE (96%)\n\n2%\n\n\uf147 \uf007 DixieNormus Highly Voted \uf164 1 year ago\nSelected Answer: BE\n\nAgree with B, E\nhttps://www.cisco.com/c/en/us/td/docs/wireless/access_point/1300/12-2_15_JA/configuration/guide/o13ssid.html\nStates they contain up to 32 alphanumeric characters which supports B.\nStates multiple access points can use the same SSID so C is wrong.\nThe OCG on page 681 explains that an SSID can be broadcast or hidden by checking the \"Broadcast SSID\" checkbox.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q117",
  "num": 117,
  "question": "When a switch receives a frame for a known destination MAC address, how is the frame handled?",
  "options": [
   "flooded to all ports except the one from which it originated",
   "forwarded to the first available port",
   "sent to the port identified for the known MAC address",
   "broadcast to all ports"
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 ccnanoob 1 month, 3 weeks ago\nSelected Answer: C\n\nThe answer is C",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q119",
  "num": 119,
  "question": "What is the collapsed layer in collapsed core architectures?",
  "options": [
   "Core and distribution",
   "access and WAN",
   "distribution and access",
   "core and WAN"
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 mrgreat Highly Voted \uf164 1 year ago\nAnswer A Correct\nhttps://www.juniper.net/documentation/en_US/release-independent/nce/topics/concept/nce-182-evpn-collapsed-core-evpn-multihomingcampus-overview.html#:~:text=A%20collapsed%20core%20architecture%20takes,layer%20on%20a%20single%20switch.\nA collapsed core architecture takes the normal three-tier hierarchical network and collapses it into a two-tier network. In a two-tier network, the\nfunction of the switches in the core layer and distribution layer are \u201ccollapsed\u201d into a combined core and distribution layer on a single switch.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q120",
  "num": 120,
  "question": "What is a characteristic of a SOHO network?",
  "options": [
   "includes at least three tiers of devices to provide load balancing and redundancy",
   "connects each switch to every other switch in the network",
   "enables multiple users to share a single broadband connection",
   "provides high throughput access for 1000 or more users"
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 mrgreat Highly Voted \uf164 1 year ago\nAnswer C is correct\nhttps://www.cisco.com/c/en/us/products/collateral/routers/soho-90-series-secure-broadband-routers/product_data_sheet09186a008014ede3.html",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q121",
  "num": 121,
  "question": "What is the role of disaggregation in controller-based networking?",
  "options": [
   "It divides the control-plane and data-plane functions.",
   "It streamlines traffic handling by assigning individual devices to perform either Layer 2 or Layer 3 functions",
   "It summarizes the routes between the core and distribution layers of the network topology",
   "It enables a network topology to quickly adjust from a ring network to a star network"
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 therandomjoke 5 months ago\nSelected Answer: A\n\nA its the way, in the SDN architecture the control plane and data plane are decouple.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q122",
  "num": 122,
  "question": "What is a function performed by a web server?",
  "options": [
   "send and retrieve email from client devices",
   "securely store files for FTP access",
   "authenticate and authorize a user's identity",
   "provide an application that is transmitted over HTTP"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 mrgreat Highly Voted \uf164 1 year ago\nAnswer D is correct\nhttps://www.techtarget.com/whatis/definition/Webserver#:~:text=The%20main%20job%20of%20a,email%2C%20file%20transfer%20and%20storage.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q123",
  "num": 123,
  "question": "Refer to the exhibit. Site A was recently connected to site B over a new single-mode fiber path. Users at site A report intermittent connectivity\nissues with applications hosted at site B. What is the reason for the problem?",
  "options": [
   "Physical network errors are being transmitted between the two sites.",
   "Heavy usage is causing high latency.",
   "The wrong cable type was used to make the connection.",
   "An incorrect type of transceiver has been inserted into a device on the link"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\f\uf147 \uf007 Bonesaw Highly Voted \uf164 12 months ago\nSelected Answer: D\n\nD is correct. The -SR stands for a short reach transceiver and is used for short range applications up to 300 meters, while the -LR can achieve up to\n10km",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q124",
  "num": 124,
  "question": "Which protocol uses the SSL?",
  "options": [
   "SSH",
   "HTTPS",
   "HTTP",
   "Telnet"
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 Vlad_Is_Love_ua Highly Voted \uf164 1 year ago\nSelected Answer: B\n\nHTTPS (port 443, TCP): HTTPS combines HTTP with a security protocol (Secure Sockets Layer [SSL]/Transport Layer Security[TLS]). DNS (port 53, TCP,\nand UDP): DNS is used to resolve Internet names to IP addresses.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q125",
  "num": 125,
  "question": "Why is UDP more suitable than TCP for applications that require low latency such as VoIP?",
  "options": [
   "UDP reliably guarantees delivery of all packets: TCP drops packets under heavy load",
   "UDP uses sequencing data for packets to arrive in order TCP offers the capability to receive packets in random order",
   "TCP uses congestion control for efficient packet delivery: UDP uses flow control mechanisms for the delivery of packets",
   "TCP sends an acknowledgement for every packet received: UDP operates without acknowledgments"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 everchosen13 Highly Voted \uf164 11 months, 2 weeks ago\nSelected Answer: D\n\nIt is D just cause all the other answers are wrong but it doesn't really give an answer to the question.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q126",
  "num": 126,
  "question": "What are the two functions of SSIDs? (Choose two.)",
  "options": [
   "uses the maximum of 32 alphanumeric characters",
   "controls the speed of the Wi-Fi network",
   "used exclusively with controller-based Wi-Fi networks",
   "supports a single access point",
   "broadcasts by default"
  ],
  "correct": "AD",
  "explanation": "The SSID is a unique identifier that wireless networking devices use to establish and maintain wireless connectivity. The SSID can consist of up\nto 32 alphanumeric, case-sensitive, characters. Wireless clients connect using the SSID for secure communications. The SSID is a unique token\nthat identifies an\n802.11 wireless network. It is used by wireless devices to identify a network and to establish and maintain wireless connectivity. An SSID must\nbe configured and assigned to a wireless client device interface before the device can associate with an access point.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q127",
  "num": 127,
  "question": "Which two characteristics describe the access layer in a three-tier network architecture? (Choose two.)",
  "options": [
   "serves as the network aggregation point",
   "physical connection point for a LAN printer",
   "designed to meet continuous redundant uptime requirements",
   "layer at which a wireless access point connects to the wired network",
   "provides a boundary between Layer 2 and Layer 3 communications"
  ],
  "correct": "BD",
  "explanation": "The Access Layer is the one closer to the users. In fact, at this layer, we find the users themselves and the access-layer switches. The main\npurpose of this layer is to physically connect users to the network. In other words, there is just a cable between end-user PCs, printers, and\nwireless access points and access-layer switches.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q128",
  "num": 128,
  "question": "Which PoE mode enables powered-devices detection and guarantees power when the device detected?",
  "options": [
   "auto",
   "static",
   "dynamic",
   "active"
  ],
  "correct": "A",
  "explanation": "B (64%)\n\nA (33%)\n\n\uf147 \uf007 BATSIE Highly Voted \uf164 8 months, 1 week ago\nauto - Enables powered-device detection; if enough power is available, automatically allocates power to the PoE port after device detection (default\nsetting).\nmax max-wattage - limits the power allowed on the port; if no value is specified, the maximum is allowed.\nmax max-wattage - limits the power allowed on the port; range is 4000 to 30000 mW; if no value is specified, the maximum is allowed.\nnever - disables device detection, and disable power to the port.\nNote:\nIf a port has a Cisco powered device connected to it, do not use the power inline never command to configure the port. A false link-up can occur,\nplacing the port into the error-disabled state.\nstatic - Enables powered-device detection; pre-allocate (reserve) power for a port before the switch discovers the powered device; the switch\nreserves power for this port even when no device is connected and guarantees that power will be provided upon device detection.\nThe switch allocates power to a port configured in static mode before it allocates power to a port configured in auto mode.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q129",
  "num": 129,
  "question": "Refer to the exhibit. The router has been configured with a super net to accommodate the requirements for 380 users on a Subnet. The\nrequirement already considers 30% future growth. Which configuration verifies the IP subnet on router R4?",
  "options": [
   "Subnet: 10.7.54.0 Subnet mask: 255.255.128.0 Broadcast address: 10.5.55.255 Usable IP address range: 10.7.54.1 10.7.55.254 \"\u20ac\u202b\u05d2\u202c",
   "Subnet: 10.7.54.0 Subnet mask: 255.255.255.0 Broadcast address: 10.7.54.255 Usable IP address range: 10.7.54.1 10.7.55.254 \"\u20ac\u202b\u05d2\u202c",
   "Subnet: 10.7.54.0 Subnet mask: 255.255.254.0 Broadcast address: 10.7.54.255 Usable IP address range: 10.7.54.1 10.7.55.254 \"\u20ac\u202b\u05d2\u202c",
   "Subnet: 10.7.54.0 Subnet mask: 255.255.254.0 Broadcast address: 10.7.55.255 Usable IP address range: 10.7.54.1 10.7.55.254 \"\u20ac\u202b\u05d2\u202c"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 Customexit Highly Voted \uf164 10 months, 3 weeks ago\nQuestions like this can be process of elimination.\nI highly recommend watching Subnetting Mastery playlist by Practical Networking on Youtube. You learn a very handy chart.\nNeed 380 users. A /23 works. /23 is 254. So either C or D.\nBroadcast address is always odd. So D.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q130",
  "num": 130,
  "question": "Refer to the exhibit. Configurations for the switch and PCs are complete. Which configuration must be applied so that VLANs 2 and 3\ncommunicate back and forth?",
  "options": [
   "interface GigabitEthernet0/0 ip address 10.10.2.10 255.255.252.0",
   "interface GigabitEthernet0/0.10 encapsulation dot1Q 3 ip address 10.10.2.10 255.255.254.0",
   "interface GigabitEthernet0/0.3 encapsulation dot1Q 3 native ip address 10.10.2.10 255.255.252.0",
   "interface GigabitEthernet0/0.3 encapsulation dot1Q 10 ip address 10.10.2.10 255.255.255.252"
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 HMaw Highly Voted \uf164 11 months, 1 week ago\nB is correct.\nQuestion gave 3 hints to work on. (RoS, VLAN 3, and /23)\nRoS require matching VLAN ID which is 3 and /23 = 254.\nSo dot1Q=3 and 255.255.254.0 = B\nHope this help",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q133",
  "num": 133,
  "question": "How is RFC 1918 addressing used in a network?",
  "options": [
   "They are used to access the Internet from the internal network without conversion.",
   "They are used in place of public addresses for Increased security.",
   "They are used with NAT to preserve public IPv4 addresses.",
   "They are used by Internet Service Providers to route over the Internet."
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 mrgreat Highly Voted \uf164 1 year ago\nC is correct\nhttps://www.techtarget.com/whatis/definition/RFC1918#:~:text=Along%20with%20NAT%20(network%20address,before%20the%20adoption%20of%20IPV6.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q135",
  "num": 135,
  "question": "Refer to the exhibit. What is a reason for poor performance on the network interface?",
  "options": [
   "The interface is receiving excessive broadcast traffic.",
   "The bandwidth setting of the interface is misconfigured.",
   "The cable connection between the two devices is faulty.",
   "The interface is operating at a different speed than the connected device."
  ],
  "correct": "C",
  "explanation": "Here we see a large number of input errors and CRC errors.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q138",
  "num": 138,
  "question": "Which WAN topology has the highest degree of reliability?",
  "options": [
   "point-to-point",
   "router-on-a-stick",
   "full mesh",
   "hub-and-spoke"
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 Iamm 2 months ago\nSelected Answer: C\n\nbetter answer",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q140",
  "num": 140,
  "question": "What causes a port to be placed in the err-disabled state?",
  "options": [
   "nothing plugged into the port",
   "link flapping",
   "latency",
   "shutdown command issued on the port"
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 RougePotatoe Highly Voted \uf164 10 months, 3 weeks ago\nSelected Answer: B\n\nThere are various reasons for the interface to go into errdisable. The reason can be:\nDuplex mismatch\nPort channel misconfiguration\nBPDU guard violation\nUniDirectional Link Detection (UDLD) condition\nLate-collision detection\nLink-flap detection\nSecurity violation\nPort Aggregation Protocol (PAgP) flap\nLayer 2 Tunneling Protocol (L2TP) guard\nDHCP snooping rate-limit\nIncorrect GBIC / Small Form-Factor Pluggable (SFP) module or cable\nAddress Resolution Protocol (ARP) inspection\nhttps://www.cisco.com/c/en/us/support/docs/lan-switching/spanning-tree-protocol/69980-errdisable-recovery.html#anc8",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q142",
  "num": 142,
  "question": "A network engineer must configure an interface with IP address 10.10.10.145 and a subnet mask equivalent to\n11111111.11111111.11111111.11111000. Which subnet mask must the engineer use?",
  "options": [
   "/29",
   "/30",
   "/27",
   "/28"
  ],
  "correct": "A",
  "explanation": "A (94%)\n\n6%\n\n\uf147 \uf007 Dutch012 Highly Voted \uf164 7 months ago\nI hope hundreds of questions like this in my next week exam",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q143",
  "num": 143,
  "question": "Refer to the exhibit. The switches are connected via a Cat5 Ethernet cable that is tested successfully. The interfaces are configured as access\nports and are both in a down status. What is the cause of the issue?",
  "options": [
   "The speed settings on the switches are mismatched",
   "The distance between the two switches is not supported by Cat5",
   "The switches are configured with incompatible duplex settings",
   "The portfast command is missing from the configuration"
  ],
  "correct": "A",
  "explanation": "A (88%)\n\n13%\n\n\uf147 \uf007 zohar7471 Highly Voted \uf164 1 year ago\nIn speed mismatch, the link simply won't come up. In contrast to this, in duplex mismatch, the link will come up, but with poor performance.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q144",
  "num": 144,
  "question": "Which two IP addressing schemes provide internet access to users on the network while preserving the public IPv4 address space? (Choose two.)",
  "options": [
   "IPv6 addressing",
   "PAT with private internal addressing",
   "single public Class A network",
   "private networks only",
   "custom addresses from ARIN"
  ],
  "correct": "AB",
  "explanation": "PAT with private internal addressing is the usual method of allowing Internet access while preserving IPv4 addresses. Another alternative is\nusing IPV6, which will allow internet access without using any IPv4 addresses. The other answer choices will consume a great deal of public\nIPV4 addresses, or will not allow for internet access.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q145",
  "num": 145,
  "question": "The address block 192.168.32.0/24 must be subnetted into smaller networks. The engineer must meet these requirements:\n\u2711 Create 8 new subnets.\n\u2711 Each subnet must accommodate 30 hosts.\n\u2711 Interface VLAN 10 must use the last usable IP in the first new subnet.\n\u2711 A Layer 3 interface is used.\nWhich configuration must be applied to the interface?",
  "options": [
   "no switchport mode trunk ip address 192.168.32.97 255.255.255.224",
   "switchport ip address 192.168.32.65 255.255.255.240",
   "no switchport ip address 192.168.32.30 255.255.255.224",
   "no switchport mode access ip address 192.168.32.62 255.255.255.240"
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 HMaw Highly Voted \uf164 11 months, 1 week ago\nC is correct. Requirement is 8 networks with 30 hosts\n255.255.255.0 = 11111111.11111111.11111111.00000000\n8 networks = 1111 with increment of 16 which is less host number than require.\n30 hosts = 11100000 with increment of 32\n255.255.255.224 or 11111111.11111111.11111111.11100000\n8 networks for /27 are 0,32,64,96,128,160,192,224",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q147",
  "num": 147,
  "question": "What are two reasons to deploy private addressing on a network? (Choose two.)",
  "options": [
   "to subnet addresses in an organized hierarchy",
   "to reduce network maintenance costs",
   "to segment local IP addresses from the global routing table",
   "to hide sensitive data from access users within an enterprise",
   "to route protected data securely via an Internet service provider"
  ],
  "correct": "AC",
  "explanation": "BC (64%)\n\nAD (29%)\n\n7%\n\n\uf147 \uf007 DoBronx Highly Voted \uf164 10 months, 3 weeks ago\nThis bum ah question",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q149",
  "num": 149,
  "question": "Which property is shared by 10GBase-SR and 10GBase-LR interfaces?",
  "options": [
   "Both use the single-mode fiber type.",
   "Both require UTP cable media for transmission.",
   "Both require fiber cable media for transmission.",
   "Both use the multimode fiber type."
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 ricky1802 Highly Voted \uf164 7 months, 2 weeks ago\nSelected Answer: C\n\n10GBase-SR and 10GBase-LR are two types of 10 Gbps Ethernet standards for optical fiber communication.\n10GBase-SR (Short Reach) is a 10 Gbps Ethernet standard for short-distance optical fiber communication, typically used for data center and campus\nnetwork applications. It supports distances up to 300 meters over multi-mode fiber (MMF) cable.\n10GBase-LR (Long Reach) is a 10 Gbps Ethernet standard for long-distance optical fiber communication, typically used for WAN (Wide Area\nNetwork) applications. It supports distances up to 10 kilometers over single-mode fiber (SMF) cable, making it well suited for high-speed interbuilding or inter-data center connections.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q151",
  "num": 151,
  "question": "Which device permits or denies network traffic based on a set of rules?",
  "options": [
   "switch",
   "firewall",
   "wireless controller",
   "access point"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 gorigorimmm 1 year ago\nWhy not D?\nAccess-list (ACL) is a set of rules defined for controlling network traffic and reducing network attacks",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q152",
  "num": 152,
  "question": "What is the role of a firewall in an enterprise network?",
  "options": [
   "determines which packets are allowed to cross from unsecured to secured networks",
   "processes unauthorized packets and allows passage to less secure segments of the network",
   "forwards packets based on stateless packet inspection",
   "explicitly denies all packets from entering an administrative domain"
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 ricky1802 Highly Voted \uf164 7 months, 2 weeks ago\nSelected Answer: A\n\nThe role of a firewall in an enterprise network is to determine which packets are allowed to cross from unsecured to secured networks.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q156",
  "num": 156,
  "question": "Refer to the exhibit. An IP subnet must be configured on each router that provides enough addresses for the number of assigned hosts and\nanticipates no more than 10% growth for new hosts. Which configuration script must be used?",
  "options": [
   "B.",
   "C.\n\nTopic 1\n\n\fD.",
   "Topic 1\n\n\fD."
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 BieLey Highly Voted \uf164 11 months, 3 weeks ago\nCan pinpoint this easily by only looking at R8:\n255.255.255.0 is enough = Answer is C",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q157",
  "num": 157,
  "question": "Which action is taken by a switch port enabled for PoE power classification override?",
  "options": [
   "As power usage on a PoE switch port is checked data flow to the connected device is temporarily paused",
   "When a powered device begins drawing power from a PoE switch port, a syslog message is generated",
   "If a switch determines that a device is using less than the minimum configured power, it assumes the device has failed and disconnects it",
   "Should a monitored port exceed the maximum administrative value for power, the port is shut down and err-disabled"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 VarDav Highly Voted \uf164 11 months, 2 weeks ago\nD\nhttps://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst6500/ios/15-4SY/config_guide/sup6T/15_3_sy_swcg_6T/power_over_ethernet.html",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q158",
  "num": 158,
  "question": "What is a function spine-and-leaf architecture?",
  "options": [
   "Offers predictable latency of the traffic path between end devices.",
   "Exclusively sends multicast traffic between servers that are directly connected to the spine.",
   "Mitigates oversubscription by adding a layer of leaf switches.",
   "Limits payload size of traffic within the leaf layer."
  ],
  "correct": "A",
  "explanation": "With a spine-and-leaf architecture, no matter which leaf switch to which a server is connected, its traffic always has to cross the same number\nof devices to get to another server (unless the other server is located on the same leaf). This approach keeps latency at a predictable level\nbecause a payload only has to hop to a spine switch and another leaf switch to reach its destination.\nReference:\nhttps://www.cisco.com/c/en/us/products/collateral/switches/nexus-7000-series-switches/white-paper-c11-737022.html",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q159",
  "num": 159,
  "question": "Which action is taken by the data plane within a network device?",
  "options": [
   "Constructs a routing table based on a routing protocol.",
   "Forwards traffic to the next hop.",
   "Looks up an egress interface in the forwarding information base.",
   "Provides CLI access to the network device."
  ],
  "correct": "B",
  "explanation": "B (86%)\n\n14%\n\n\uf147 \uf007 Yinxs 4 weeks ago\nSelected Answer: B\n\nB and C are all correct.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q160",
  "num": 160,
  "question": "What is the function of the control plane?",
  "options": [
   "It exchanges routing table information.",
   "It provides CLI access to the network device.",
   "It looks up an egress interface in the forwarding information base.",
   "It forwards traffic to the next hop."
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 mrgreat Highly Voted \uf164 1 year ago\nA is correct\nThe control plane is the part of a network that controls how data packets are forwarded \u2014 meaning how data is sent from one place to another.\nThe process of creating a routing table, for example, is considered part of the control plane. Routers use various protocols to identify network\npaths, and they store these paths in routing tables.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q161",
  "num": 161,
  "question": "Which two cable types must be used to connect an access point to the WLC when 2.5-Gbps and 5-Gbps upload speeds are required? (Choose\ntwo.)",
  "options": [
   "10GBASE-T",
   "1000BASE-LX/LH",
   "Cat 5e",
   "Cat 5",
   "Cat 3"
  ],
  "correct": "AC",
  "explanation": "AC (67%)\n\nC (33%)\n\n\uf147 \uf007 Netcmd Highly Voted \uf164 10 months, 1 week ago\ncat5e cant go more than 1GBps",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q162",
  "num": 162,
  "question": "What is a benefit for external users who consume public cloud resources?",
  "options": [
   "Implemented over a dedicated WAN",
   "All hosted on physical servers",
   "Accessed over the Internet",
   "Located in the same data center as the users"
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 TKHZRD Highly Voted \uf164 8 months, 2 weeks ago\nThe question is formulated in a weird way... Or is it me?",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q163",
  "num": 163,
  "question": "An engineer must update the configuration on two PCs in two different subnets to communicate locally with each other. One PC is configured with\nIP address\n192.168.25.128/25 and the other with 192.168.25.100/25. Which network mask must the engineer configure on both PCs to enable the\ncommunication?",
  "options": [
   "255.255.255.248",
   "255.255.255.224",
   "255.255.255.0",
   "255.255.255.252"
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 Customexit Highly Voted \uf164 10 months, 3 weeks ago\nJust to add more info here:\nA, .248 has a group size of 8. At a glance that's too small to include both .100 and .128.\n.252 has a group size of 4. Same as above.\n.224 seems large enough with a 32 group size, but if you subnet you'll find that .128 is a network address.\nThat leaves us with 255.255.255.0. Which gives us the first usable at .25.1 and the last usable at .25.254.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q164",
  "num": 164,
  "question": "Which key function is provided by the data plane?",
  "options": [
   "Originating packets",
   "Exchanging routing table data",
   "Making routing decisions",
   "Forwarding traffic to the next hop"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 efstratios39 4 weeks, 1 day ago\nI remember it by saying \" Hop on a (data) plane lol",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q165",
  "num": 165,
  "question": "When should an engineer implement a collapsed-core architecture?",
  "options": [
   "Only when using VSS technology",
   "For small networks with minimal need for growth",
   "For large networks that are connected to multiple remote sites",
   "The access and distribution layers must be on the same device"
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 learnNcurve 6 months, 2 weeks ago\nSelected Answer: B\n\nB is the Answer.\nA collapsed core architecture is typically implemented in small networks, wheres as a three tier architecture is deployed into larger networks where\nscalabily will be a factor",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q166",
  "num": 166,
  "question": "Refer to the exhibit. An engineer assigns IP addressing to the current VLAN with three PCs. The configuration must also account for the expansion\nof 30 additional\nVLANS using the same Class C subnet for subnetting and host count. Which command set fulfills the request while reserving address space for\nthe expected growth?",
  "options": [
   "Switch(config)#interface vlan 10 Switch(config-if)#ip address 192.168.0.1 265 255.255.252",
   "Switch(config)#interface vlan 10 Switch(config-if)#ip address 192.168.0.1 255 255.255.248",
   "Switch(config)#interface vlan 10 Switch(config-if)#ip address 192.168.0.1 255 255.255.0",
   "Switch(config)#interface vlan 10 Switch(config-if)#ip address 192.168.0.1 255.255.255.128"
  ],
  "correct": "B",
  "explanation": "B (78%)\n\nA (22%)\n\n\uf147 \uf007 vladals Highly Voted \uf164 1 year ago\nI think that the answer is good. we are looking at 31 VLANs ( a sin 31 Subnets) and each one will have 3 hosts. So /29 will give us 32 subnets each\nwith 8 hosts (6 usable). /29 means 248 mask, so B is correct.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q167",
  "num": 167,
  "question": "A client experiences slow throughput from a server that is directly connected to the core switch in a data center. A network engineer finds minimal\nlatency on connections to the server, but data transfers are unreliable, and the output of the show interfaces counters errors command shows a\nhigh FCS-Err count on the interface that is connected to the server. What is the cause of the throughput issue?",
  "options": [
   "a physical cable fault",
   "a speed mismatch",
   "high bandwidth usage",
   "a cable that is too long"
  ],
  "correct": "A",
  "explanation": "A (92%)\n\n8%\n\n\uf147 \uf007 cormorant Highly Voted \uf164 10 months, 2 weeks ago\nquestions like this have convinced me that to pass the CCNA it is necessary to bone up on dumps",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q168",
  "num": 168,
  "question": "What is the difference between 1000BASE-LX/LH and 1000BASE-ZX interfaces?",
  "options": [
   "1000BASE-LX/LH interoperates with multimode and single-mode fiber, and 1000BASE-ZX needs a conditioning patch cable with multimode.",
   "1000BASE-ZX interoperates with dual-rate 100M/1G 10Km SFP over multimode fiber, and 1000BASE-LX/LH supports only single-rate",
   "1000BASE-ZX is supported on links up to 1000km, and 1000BASE-LX/LH operates over links up to 70 km",
   "1000BASE- LX/LH is supported on links up to 10km, and 1000Base-ZX operates over links up to 70 km"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 ccna_goat Highly Voted \uf164 11 months, 3 weeks ago\nanother question not related with CCNA. love it. they got brazen recently, im waiting for CCIE questions on CCNA exam.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q169",
  "num": 169,
  "question": "What are two reasons to implement IPv4 private addressing on a network? (Choose two.)",
  "options": [
   "To enable internal applications to treat the private IPv4 addresses as unique",
   "To facilitate renumbering when merging networks",
   "To expand the routing table on the router",
   "To provide protection from external denial-of-service attacks",
   "To conserve global unique IPv4 addresses"
  ],
  "correct": "DE",
  "explanation": "AE (66%)\n\nDE (25%)\n\n9%\n\n\uf147 \uf007 RougePotatoe Highly Voted \uf164 10 months, 3 weeks ago\nSelected Answer: AE\n\nPrivate IPv4 addresses weren't created to be a form of protection. It's primary purpose was to enable internal networks to communicate while\nconserving public IPv4 addresses.\nA fits this narrative as multiple businesses could share the same private IP addresses and their application would still be able to communicate\nwithout interfering with other businesses thus it's unique to their internal applications.\nE for obvious reasons.\nD doesn't work because if you have servers that need to be reached from the outside you would have it port forwarded and thus having it exposed\nto the internet and DoS. Even if you don't have internal services advertised to the internet, attackers can still DoS your gateway because it has a\npublic IP address.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q170",
  "num": 170,
  "question": "Which concern is addressed with the use of private IPv4 addressing?",
  "options": [
   "Lack of routing protocol support for CIDR and VLSM",
   "Lack of security protocols at the network perimeter",
   "Lack of available TCP/UDP ports per IPv5 address",
   "Lack of available publicly routable unique IPv4 address"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 mark9999 2 months ago\nSelected Answer: D\n\nHow many times, and different ways can they ask this same question? The answer does seem correct in this instance.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q171",
  "num": 171,
  "question": "What is the path for traffic sent from one user workstation to another workstation on a separate switch in a three-tier architecture model?",
  "options": [
   "access \u202b\u05d2\u202c\u20ac\" core \u202b\u05d2\u202c\u20ac\" access",
   "access \u202b\u05d2\u202c\u20ac\" distribution \u202b\u05d2\u202c\u20ac\" distribution \u202b\u05d2\u202c\u20ac\" access",
   "access \u202b\u05d2\u202c\u20ac\" core \u202b\u05d2\u202c\u20ac\" distribution \u202b\u05d2\u202c\u20ac\" access",
   "access \u202b\u05d2\u202c\u20ac\" distribution \u202b\u05d2\u202c\u20ac\" core \u202b\u05d2\u202c\u20ac\" distribution \u202b\u05d2\u202c\u20ac\" access"
  ],
  "correct": "D",
  "explanation": "D (80%)\n\nB (20%)\n\n\uf147 \uf007 Dutch012 Highly Voted \uf164 6 months, 4 weeks ago\nSelected Answer: D\n\nDistribution doesn't connect to another Distribution layer directly, it needs to go through core firsrt",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q172",
  "num": 172,
  "question": "What is the difference between IPv6 unicast and anycast addressing?",
  "options": [
   "An individual IPv6 unicast address is supported on a single interface on one node, but an IPv6 anycast address is assigned to a group of\ninterfaces on multiple nodes.",
   "IPv6 anycast nodes must be explicitly configured to recognize the anycast address, but IPv6 unicast nodes require no special configuration.",
   "IPv6 unicast nodes must be explicitly configured to recognize the unicast address, but IPv6 anycast nodes require no special configuration.",
   "Unlike an IPv6 anycast address, an IPv6 unicast address is assigned to a group of interfaces on multiple nodes."
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 Naghini Highly Voted \uf164 8 months, 1 week ago\nAren't both A and B correct?",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q173",
  "num": 173,
  "question": "Refer to the exhibit. Between which zones do wireless users expect to experience intermittent connectivity?",
  "options": [
   "between zones 1 and 2",
   "between zones 2 and 5",
   "between zones 3 and 4",
   "between zones 3 and 6"
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 rx78_2 Highly Voted \uf164 6 months, 2 weeks ago\nlooks like it is a vision test instead of a network exam",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q174",
  "num": 174,
  "question": "Which WAN topology provides a combination of simplicity quality, and availability?",
  "options": [
   "partial mesh",
   "full mesh",
   "point-to-point",
   "hub-and-spoke"
  ],
  "correct": "C",
  "explanation": "C (42%)\n\nA (38%)\n\nD (21%)\n\n\uf147 \uf007 Alan100 Highly Voted \uf164 8 months ago\nC is actually correct. Its P2P. According to Cisco Press, P2P (i.e Leased lines) have those exact advantages:\nhttps://www.ciscopress.com/articles/article.asp?p=2832405&seqNum=5",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q177",
  "num": 177,
  "question": "How are the switches in a spine-and-leaf topology interconnected?",
  "options": [
   "Each leaf switch is connected to one of the spine switches",
   "Each leaf switch is connected to each spine switch.",
   "Each leaf switch is connected to two spine switches, making a loop.",
   "Each leaf switch is connected to a central leaf switch, then uplinked to a core spine switch."
  ],
  "correct": "B",
  "explanation": "B (85%)\n\nC (15%)\n\n\uf147 \uf007 Vlad_Is_Love_ua Highly Voted \uf164 1 year ago\nSelected Answer: B\n\nIn spine-leaf two-tier architecture, every lower-tier switch (leaf layer) is connected to each of the top-tier switches (spine layer) in a full-mesh\ntopology. The leaf layer consists of access switches that connect to devices such as servers. The spine layer is the backbone of the network and is\nresponsible for interconnecting all leaf switches. Every leaf switch connects to every spine switch. Typically a Layer 3 network is established between\nleaves and spines, so all the links can be used simultaneously.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q178",
  "num": 178,
  "question": "What is the primary effect of the spanning-tree portfast command?",
  "options": [
   "It immediately enables the port in the listening state.",
   "It immediately puts the port into the forwarding state when the switch is reloaded.",
   "It enables BPDU messages.",
   "It minimizes spanning-tree convergence time."
  ],
  "correct": "D",
  "explanation": "Reference:\nhttps://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst3560/software/release/122_55_se/configuration/guide/3560_scg/swstpopt.html",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q179",
  "num": 179,
  "question": "What occurs when PortFast is enabled on an interface that is connected to another switch?",
  "options": [
   "Root port choice and spanning-tree recalculation are accelerated when a switch link goes down.",
   "After spanning-tree converges, PortFast shuts down any port that receives BPDUs.",
   "VTP is allowed to propagate VLAN configuration information from switch to switch automatically.",
   "Spanning-tree fails to detect a switching loop increasing the likelihood of broadcast storms."
  ],
  "correct": "D",
  "explanation": "Enabling the PortFast feature causes a switch or a trunk port to enter the STP forwarding-state immediately or upon a linkup event, thus\nbypassing the listening and learning states.\nNote: To enable portfast on a trunk port you need the trunk keyword \u202b\u05d2\u202c\u20acspanning-tree portfast trunk\u202b\u05d2\u202c\u20ac",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q180",
  "num": 180,
  "question": "Which QoS Profile is selected in the GUI when configuring a voice over WLAN deployment?",
  "options": [
   "Platinum",
   "Bronze",
   "Gold",
   "Silver"
  ],
  "correct": "A",
  "explanation": "Cisco Unified Wireless Network solution WLANs support four levels of QoS: Platinum/Voice, Gold/Video, Silver/Best Effort (default), and\nBronze/Background.\nReference:\nhttps://www.cisco.com/c/en/us/td/docs/wireless/controller/7-4/configuration/guides/consolidated/b_cg74_CONSOLIDATED/\nb_cg74_CONSOLIDATED_chapter_01010111.html\n\n\uf147 \uf007 Ettmoh Highly Voted \uf164 3 years ago\nWLAN Quality of Service (QoS) list:\n\u2022 Platinum (voice)\n\u2022 Gold (video)\n\u2022 Silver (best effort) is the default value.\n\u2022 Bronze (background)",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q183",
  "num": 183,
  "question": "An engineer needs to configure LLDP to send the port description type length value (TLV). Which command sequence must be implemented?",
  "options": [
   "switch(config-if)#lldp port-description",
   "switch#lldp port-description",
   "switch(config-line)#lldp port-description",
   "switch(config)#lldp port-description"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Joe_Q Highly Voted \uf164 2 years, 5 months ago\nThe command should be:\nSW(config)#lldp tlv-select port-description",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q184",
  "num": 184,
  "question": "Refer to the exhibit. Which switch becomes the root bridge?",
  "options": [
   "S1",
   "S2",
   "S3",
   "S4"
  ],
  "correct": "B",
  "explanation": "A (50%)\n\nB (50%)\n\n\uf147 \uf007 Ali526 Highly Voted \uf164 2 years, 8 months ago\nB is correct. The lowest value of priority + MAC.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q185",
  "num": 185,
  "question": "Which configuration ensures that the switch is always the root for VLAN 750?",
  "options": [
   "Switch(config)#spanning-tree vlan 750 priority 38418607",
   "Switch(config)#spanning-tree vlan 750 priority 0",
   "Switch(config)#spanning-tree vlan 750 root primary",
   "Switch(config)#spanning-tree vlan 750 priority 614440"
  ],
  "correct": "C",
  "explanation": "B (76%)\n\nC (24%)\n\n\uf147 \uf007 Hemn1990 Highly Voted \uf164 2 years, 11 months ago\nB i correct, note alwayes",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q186",
  "num": 186,
  "question": "Refer to the exhibit. After the switch configuration, the ping test fails between PC A and PC B. Based on the output for switch 1, which error must\nbe corrected?",
  "options": [
   "The PCs are in the incorrect VLAN.",
   "All VLANs are not enabled on the trunk.",
   "Access mode is configured on the switch ports.",
   "There is a native VLAN mismatch."
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 Kane4555 Highly Voted \uf164 1 year, 8 months ago\nSelected Answer: D\n\nDon't overthink it, this is the CCNA, the CCNA says that native VLAN mismatches are bad, and there's a native VLAN mismatch. D.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q188",
  "num": 188,
  "question": "Which unified access point mode continues to serve wireless clients after losing connectivity to the Cisco Wireless LAN Controller?",
  "options": [
   "local",
   "mesh",
   "flexconnect",
   "sniffer"
  ],
  "correct": "C",
  "explanation": "In previous releases, whenever a FlexConnect access point disassociates from a controller, it moves to the standalone mode. The clients that\nare centrally switched are disassociated. However, the FlexConnect access point continues to serve locally switched clients. When the\nFlexConnect access point rejoins the controller (or a standby controller), all clients are disconnected and are authenticated again. This\nfunctionality has been enhanced and the connection between the clients and the FlexConnect access points are maintained intact and the\nclients experience seamless connectivity. When both the access point and the controller have the same configuration, the connection between\nthe clients and APs is maintained.\nReference:\nhttps://www.cisco.com/c/en/us/td/docs/wireless/controller/7-4/configuration/guides/consolidated/b_cg74_CONSOLIDATED/\nb_cg74_CONSOLIDATED_chapter_010001101.html",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q189",
  "num": 189,
  "question": "Refer to the exhibit. Which command provides this output?",
  "options": [
   "show ip route",
   "show cdp neighbor",
   "show ip interface",
   "show interface"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 NZIAKOU Highly Voted \uf164 2 years, 11 months ago\nB is correct",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q190",
  "num": 190,
  "question": "Which mode must be used to configure EtherChannel between two switches without using a negotiation protocol?",
  "options": [
   "active",
   "on",
   "auto",
   "desirable"
  ],
  "correct": "B",
  "explanation": "The Static Persistence (or \u202b\u05d2\u202c\u20acon\u202b\u05d2\u202c\u20ac mode) bundles the links unconditionally and no negotiation protocol is used. In this mode, neither PAgP nor\nLACP packets are sent or received.\n\n\uf147 \uf007 John248 Highly Voted \uf164 3 years, 2 months ago\non\nMode that forces the LAN port to channel unconditionally. In the on mode, a usable EtherChannel exists only when a LAN port group in the on\nmode is connected to another LAN port group in the on mode. Because ports configured in the on mode do not negotiate, there is no negotiation\ntraffic between the ports. You cannot configure the on mode with an EtherChannel protocol. If one end uses the on mode, the other end must also.\nauto\nPAgP mode that places a LAN port into a passive negotiating state, in which the port responds to PAgP packets it receives but does not initiate\nPAgP negotiation. (Default)\ndesirable\nPAgP mode that places a LAN port into an active negotiating state, in which the port initiates negotiations with other LAN ports by sending PAgP\npackets.\npassive\nLACP mode that places a port into a passive negotiating state, in which the port responds to LACP packets it receives but does not initiate LACP\nnegotiation. (Default)\nactive\nLACP mode that places a port into an active negotiating state, in which the port initiates negotiations with other ports by sending LACP packets.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q191",
  "num": 191,
  "question": "Which mode allows access points to be managed by Cisco Wireless LAN Controllers?",
  "options": [
   "bridge",
   "lightweight",
   "mobility express",
   "autonomous"
  ],
  "correct": "B",
  "explanation": "A Lightweight Access Point (LAP) is an AP that is designed to be connected to a wireless LAN (WLAN) controller (WLC). APs are\n\u202b\u05d2\u202c\u20aclightweight,\u202b\u05d2\u202c\u20ac which means that they cannot act independently of a wireless LAN controller (WLC). The WLC manages the AP configurations\nand firmware. The APs are \u202b\u05d2\u202c\u20aczero touch\u202b\u05d2\u202c\u20ac deployed, and individual configuration of APs is not necessary.\n\n\uf147 \uf007 syed5 Highly Voted \uf164 3 years, 2 months ago\nCisco Lightweight Access Point (LAP)\nThe Cisco LAP is part of the Cisco Unified Wireless Network architecture. A LAP is an AP that is designed to be connected to a wireless LAN (WLAN)\ncontroller (WLC). The LAP provides dual band support for IEEE 802.11a, 802.11b, and 802.11g and simultaneous air monitoring for dynamic, realtime radio frequency (RF) management. In addition, Cisco LAPs handle time-sensitive functions, such as Layer 2 encryption, that enable Cisco\nWLANs to securely support voice, video, and data applications.\nAPs are \u201clightweight,\u201d which means that they cannot act independently of a wireless LAN controller (WLC). The WLC manages the AP configurations\nand firmware. The APs are \u201czero touch\u201d deployed, and individual configuration of APs is not necessary. The APs are also lightweight in the sense\nthat they handle only real-time MAC functionality. The APs leave all the non-real-time MAC functionality to be processed by the WLC. This\narchitecture is referred to as the \u201csplit MAC\u201d architecture.\nReference:\nhttps://www.cisco.com/c/en/us/support/docs/wireless/aironet-1200-series/70278-lap-faq.html",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q192",
  "num": 192,
  "question": "Which two values or settings must be entered when configuring a new WLAN in the Cisco Wireless LAN Controller GUI? (Choose two.)",
  "options": [
   "QoS settings",
   "IP address of one or more access points",
   "SSID",
   "profile name",
   "management interface settings"
  ],
  "correct": "CD",
  "explanation": "\uf147 \uf007 DonnerKomet Highly Voted \uf164 2 years ago\nClick Add New WLAN. The Add New WLAN window appears.\nIn the General tab, perform the following:\na) The WLAN Id is automatically selected but you can change it.\nb) Enter the Profile Name for the WLAN. (*) must be set\nc) Enter the SSID. (*) must be set\nd) Choose Admin State for the WLAN from the drop-down list. The default Admin State is Enabled.\ne) Choose Radio Policy from the drop-down list. The default Radio Policy is ALL.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q193",
  "num": 193,
  "question": "Which command is used to specify the delay time in seconds for LLDP to initialize on any interface?",
  "options": [
   "lldp timer",
   "lldp tlv-select",
   "lldp reinit",
   "lldp holdtime"
  ],
  "correct": "C",
  "explanation": "\u202b\u05d2\u202c\u20ac\u00a2 lldp holdtime seconds: Specify the amount of time a receiving device should hold the information from your device before discarding it\n\u202b\u05d2\u202c\u20ac\u00a2 lldp reinit delay: Specify the delay time in seconds for LLDP to initialize on an interface\n\u202b\u05d2\u202c\u20ac\u00a2 lldp timer rate: Set the sending frequency of LLDP updates in seconds\nReference:\nhttps://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst3560/software/release/12-2_55_se/configuration/guide/3560_scg/swlldp.html\n\n\uf147 \uf007 Ettmoh Highly Voted \uf164 3 years ago\n(config)#lldp ?\nholdtime Specify the holdtime (in sec) to be sent in packets\nreinit Delay (in sec) for LLDP initialization on any interface\nrun Enable LLDP\ntimer Specify the rate at which LLDP packets are sent (in sec)\ntlv-select Selection of LLDP TLVs to send",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q194",
  "num": 194,
  "question": "Refer to the exhibit. How does SW2 interact with other switches in this VTP domain?",
  "options": [
   "It transmits and processes VTP updates from any VTP clients on the network on its trunk ports.",
   "It processes VTP updates from any VTP clients on the network on its access ports.",
   "It receives updates from all VTP servers and forwards all locally configured VLANs out all trunk ports.",
   "It forwards only the VTP advertisements that it receives on its trunk ports."
  ],
  "correct": "D",
  "explanation": "The VTP mode of SW2 is transparent so it only forwards the VTP updates it receives to its trunk links without processing them.\nReference:\nhttps://www.cisco.com/c/en/us/support/docs/lan-switching/vtp/10558-21.html",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q195",
  "num": 195,
  "question": "Refer to the exhibit. Based on the LACP neighbor status, in which mode is the SW1 port channel configured?",
  "options": [
   "mode on",
   "active",
   "passive",
   "auto"
  ],
  "correct": "B",
  "explanation": "From the neighbor status, we notice the \u202b\u05d2\u202c\u20acFlags\u202b\u05d2\u202c\u20ac are SP. \u202b\u05d2\u202c\u20acP\u202b\u05d2\u202c\u20ac here means the neighbor is in Passive mode. In order to create an\nEtherchannel interface, the (local)\nSW1 ports should be in Active mode. Moreover, the \u202b\u05d2\u202c\u20acPort State\u202b\u05d2\u202c\u20ac in the exhibit is \u20ac0\u202b\u05d2\u202cx3c\u202b\u05d2\u202c\u20ac (which equals to \u20ac\u00b3\u202b\u05d2\u202c\u20ac00111100\u202b \u05d2\u202cin binary format).\nBit 3 is \u202b\u05d2\u202c\u20ac1\u202b\u05d2\u202c\u20ac which means the ports are synchronizing -> the ports are working so the local ports should be in Active mode.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q196",
  "num": 196,
  "question": "Two switches are connected and using Cisco Dynamic Trunking Protocol. SW1 is set to Dynamic Auto and SW2 is set to Dynamic Desirable. What\nis the result of this configuration?",
  "options": [
   "The link becomes an access port.",
   "The link is in an error disabled state.",
   "The link is in a down state.",
   "The link becomes a trunk port."
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 ayd33n Highly Voted \uf164 3 years, 1 month ago\nDynamic Auto \u2014 Makes the Ethernet port willing to convert the link to a trunk link. The port becomes a trunk port if the neighboring port is set to\ntrunk or dynamic desirable mode. This is the default mode for some switchports.\nDynamic Desirable \u2014 Makes the port actively attempt to convert the link to a trunk link. The port becomes a trunk port if the neighboring Ethernet\nport is set to trunk, dynamic desirable or dynamic auto mode.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q197",
  "num": 197,
  "question": "A Cisco IP phone receives untagged data traffic from an attached PC. Which action is taken by the phone?",
  "options": [
   "It drops the traffic.",
   "It allows the traffic to pass through unchanged.",
   "It tags the traffic with the native VLAN.",
   "It tags the traffic with the default VLAN."
  ],
  "correct": "B",
  "explanation": "Untagged traffic from the device attached to the Cisco IP Phone passes through the phone unchanged, regardless of the trust state of the\naccess port on the phone.\nReference:\nhttps://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst2960/software/release/12-2_40_se/configuration/guide/scg/swvoip.pdf",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q198",
  "num": 198,
  "question": "Which design element is a best practice when deploying an 802.11b wireless infrastructure?",
  "options": [
   "allocating nonoverlapping channels to access points that are in close physical proximity to one another",
   "disabling TCP so that access points can negotiate signal levels with their attached wireless devices",
   "configuring access points to provide clients with a maximum of 5 Mbps",
   "setting the maximum data rate to 54 Mbps on the Cisco Wireless LAN Controller"
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 ZUMY Highly Voted \uf164 2 years, 4 months ago\nA is correct",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q199",
  "num": 199,
  "question": "Refer to the exhibit. The network administrator wants VLAN 67 traffic to be untagged between Switch 1 and Switch 2, while all other VLANs are to\nremain tagged.\nWhich command accomplishes this task?",
  "options": [
   "switchport access vlan 67",
   "switchport trunk allowed vlan 67",
   "switchport private-vlan association host 67",
   "switchport trunk native vlan 67"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 ZUMY Highly Voted \uf164 2 years, 4 months ago\nD is correct\nNative VLAN: The native VLAN is the one into which untagged traffic will be put when it\u2019s received on a trunk port. This makes it possible for your\nVLAN to support legacy devices or devices that don\u2019t tag their traffic like some wireless access points and simply network attached devices.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q200",
  "num": 200,
  "question": "Which two command sequences must be configured on a switch to establish a Layer 3 EtherChannel with an open-standard protocol? (Choose\ntwo.)",
  "options": [
   "interface GigabitEthernet0/0/1 channel-group 10 mode auto",
   "interface GigabitEthernet0/0/1 channel-group 10 mode on",
   "interface port-channel 10 no switchport ip address 172.16.0.1 255.255.255.0",
   "interface GigabitEthernet0/0/1 channel-group 10 mode active",
   "interface port-channel 10 switchport switchport mode trunk"
  ],
  "correct": "CD",
  "explanation": "CD (85%)\n\nOther\n\n\uf147 \uf007 Dave861 Highly Voted \uf164 3 years, 2 months ago\nWe can answer this by discarding incorrect answers we need to use an open standard IE LACP\nThe option \"A\" is discarded: PAgP configuration\nThe option \"B\" is discarded: manual configuration (\"On\" mode)\nThe option \"C\" is configuration that LACP uses.\nThe option \"D\" is configuration that LACP uses.\nThe option \"E\" is discarded: It is configuration of trunk mode, not Etherchannel\nC and D correct.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q201",
  "num": 201,
  "question": "Refer to the exhibit. Which two commands when used together create port channel 10? (Choose two.)",
  "options": [
   "int range g0/0-1 channel-group 10 mode active",
   "int range g0/0-1 channel-group 10 mode desirable",
   "int range g0/0-1 channel-group 10 mode passive",
   "int range g0/0-1 channel-group 10 mode auto",
   "int range g0/0-1 channel-group 10 mode on"
  ],
  "correct": "AC",
  "explanation": "A (100%)\n\n\uf147 \uf007 legitornot22 Highly Voted \uf164 2 years, 6 months ago\nDesirable/Auto (PAGP)\nActive/Passive (LACP)",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q202",
  "num": 202,
  "question": "Refer to the exhibit. An administrator is tasked with configuring a voice VLAN. What is the expected outcome when a Cisco phone is connected to\nthe\nGigabitEthernet 3/1/4 port on a switch?",
  "options": [
   "The phone and a workstation that is connected to the phone do not have VLAN connectivity.",
   "The phone sends and receives data in VLAN 50, but a workstation connected to the phone sends and receives data in VLAN 1.",
   "The phone sends and receives data in VLAN 50, but a workstation connected to the phone has no VLAN connectivity.",
   "The phone and a workstation that is connected to the phone send and receive data in VLAN 50."
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 Ibimat Highly Voted \uf164 2 years, 3 months ago\nShould'nt the answer be C.\nThe traffic from the workstation is untagged. and there is no indication that the native vlan is vlan1",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q203",
  "num": 203,
  "question": "Refer to the exhibit. Which action is expected from SW1 when the untagged frame is received on the GigabitEthernet0/1 interface?",
  "options": [
   "The frame is processed in VLAN 1",
   "The frame is processed in VLAN 11",
   "The frame is processed in VLAN 5",
   "The frame is dropped"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Ali526 Highly Voted \uf164 2 years, 8 months ago\nUntagged and native VLAN go together, so VLAN 5. However, 'switchport mode trunk' and switchport access VALN 11', no good.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q204",
  "num": 204,
  "question": "Which command is used to enable LLDP globally on a Cisco IOS ISR?",
  "options": [
   "lldp run",
   "lldp enable",
   "lldp transmit",
   "cdp run",
   "cdp enable"
  ],
  "correct": "A",
  "explanation": "Link Layer Discovery Protocol (LLDP) is an industry standard protocol that allows devices to advertise, and discover connected devices, and\nthere capabilities\n(same as CDP of Cisco). To enable it on Cisco devices, we have to use this command under global configuration mode:\nSw(config)# lldp run\n\n\uf147 \uf007 ZUMY Highly Voted \uf164 2 years, 4 months ago\nA is correct\n#lldp run - Golably Enable\n#no lldp run - Globally Disable\n#lldp Recieve -To receive LLDP packets\n#lldp Transmit - To transmit LLDP packets",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q205",
  "num": 205,
  "question": "Which command should you enter to configure an LLDP delay time of 5 seconds?",
  "options": [
   "lldp timer 5000",
   "lldp holdtime 5",
   "lldp reinit 5000",
   "lldp reinit 5"
  ],
  "correct": "D",
  "explanation": "\u2711 lldp holdtime seconds: Specify the amount of time a receiving device should hold the information from your device before discarding it\n\u2711 lldp reinit delay: Specify the delay time in seconds for LLDP to initialize on an interface\n\u2711 lldp timer rate: Set the sending frequency of LLDP updates in seconds\nReference:\n\nhttps://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst3560/software/release/12-2_55_se/configuration/guide/3560_scg/swlldp.html",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q206",
  "num": 206,
  "question": "In a CDP environment, what happens when the CDP interface on an adjacent device is configured without an IP address?",
  "options": [
   "CDP becomes inoperable on that neighbor",
   "CDP uses the IP address of another interface for that neighbor",
   "CDP operates normally, but it cannot provide IP address information for that neighbor",
   "CDP operates normally, but it cannot provide any information for that neighbor"
  ],
  "correct": "C",
  "explanation": "Although CDP is a Layer 2 protocol but we can check the neighbor IP address with the \u202b\u05d2\u202c\u20acshow cdp neighbor detail\u202b\u05d2\u202c\u20ac command. If the neighbor\ndoes not has an IP address then CDP still operates without any problem. But the IP address of that neighbor is not provided.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q208",
  "num": 208,
  "question": "When configuring an EtherChannel bundle, which mode enables LACP only if a LACP device is detected?",
  "options": [
   "Passive",
   "Desirable",
   "On",
   "Auto",
   "Active"
  ],
  "correct": "A",
  "explanation": "The LACP is Link Aggregation Control Protocol. LACP is an open protocol, published under the 802.3ad.\nThe modes of LACP are active, passive or on. The side configured as \u202b\u05d2\u202c\u20acpassive\u202b\u05d2\u202c\u20ac will waiting the other side that should an Active for the\nEtherchannel to be established.\n\nPAgP is Port-Aggregation Protocol. It is Cisco proprietary protocol. The mode are On, Desirable or Auto. Desirable \u202b\u05d2\u202c\u20ac\" Auto will establish an\nEtherChannel.\nAn example of how to configure an Etherchannel:\nSwitchFormula1>enable SwitchFormula1#configure terminal\nSwitchFormula1(config)# interface range f0/5 -14\nSwitchFormula1(config-if-range)# channel-group 13 mode ?\nactive Enable LACP unconditionally\nauto Enable PAgP only if a PAgP device is detected\ndesirable Enable PAgP unconditionally\non Enable Etherchannel only\npassive Enable LACP only if a LACP device is detected",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q209",
  "num": 209,
  "question": "Refer to the exhibit. Which VLAN ID is associated with the default VLAN in the given environment?",
  "options": [
   "VLAN 1",
   "VLAN 5",
   "VLAN 10",
   "VLAN 20"
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 ZayaB Highly Voted \uf164 2 years, 7 months ago\nThe question is trying to trick us. Answer A is correct because Cisco switches always have VLAN 1 as the default VLAN, which is needed for many\nprotocol communication between switches like spanning-tree protocol for instance.\nYou can't change or even delete the default VLAN, it is mandatory.\nThe native VLAN is the only VLAN which is not tagged in a trunk, in other words, native VLAN frames are transmitted unchanged.\nhttps://community.cisco.com/t5/switching/what-is-difference-between-default-vlan-and-native-vlan/td-p/2095204",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q210",
  "num": 210,
  "question": "Which two VLAN IDs indicate a default VLAN? (Choose two.)",
  "options": [
   "0",
   "1",
   "1005",
   "1006",
   "4096"
  ],
  "correct": "BC",
  "explanation": "VLAN 1 is a system default VLAN, you can use this VLAN but you cannot delete it. By default VLAN 1 is use for every port on the switch.\n\nStandard VLAN range from 1002-1005 it's Cisco default for FDDI and Token Ring. You cannot delete VLANs 1002-1005. Mostly we don't use\nVLAN in this range.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q211",
  "num": 211,
  "question": "Which two pieces of information about a Cisco device can Cisco Discovery Protocol communicate? (Choose two.)",
  "options": [
   "the native VLAN",
   "the trunking protocol",
   "the VTP domain",
   "the spanning-tree priority",
   "the spanning-tree protocol"
  ],
  "correct": "AC",
  "explanation": "\uf147 \uf007 hokieman91 Highly Voted \uf164 2 years, 7 months ago\nhttps://www.cisco.com/c/en/us/td/docs/ios-xml/ios/cdp/configuration/15-mt/cdp-15-mt-book/nm-cdp-discover.html\nThe information contained in Cisco Discovery Protocol advertisements varies based on the type of device and the installed version of the operating\nsystem. Some of the information that Cisco Discovery Protocol can learn includes:\nCisco IOS version running on Cisco devices\nHardware platform of devices\nIP addresses of interfaces on devices\nLocally connected devices advertising Cisco Discovery Protocol\nInterfaces active on Cisco devices, including encapsulation type\nHostname\nDuplex setting\n***VLAN Trunking Protocol (VTP) domain\n***Native VLAN",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q212",
  "num": 212,
  "question": "After you deploy a new WLAN controller on your network, which two additional tasks should you consider? (Choose two.)",
  "options": [
   "deploy load balancers",
   "configure additional vlans",
   "configure multiple VRRP groups",
   "deploy POE switches",
   "configure additional security policies"
  ],
  "correct": "AE",
  "explanation": "BE (50%)\n\nDE (25%)\n\nAE (25%)\n\n\uf147 \uf007 Zerotime0 Highly Voted \uf164 2 years, 6 months ago\nFound old exams from 200-225 exam and there ,poe and security are the answers....not load bal.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q213",
  "num": 213,
  "question": "Refer to the exhibit. How will switch SW2 handle traffic from VLAN 10 on SW1?",
  "options": [
   "It sends the traffic to VLAN 10.",
   "It sends the traffic to VLAN 100.",
   "It drops the traffic.",
   "It sends the traffic to VLAN 1."
  ],
  "correct": "B",
  "explanation": "Since SW-1 is configured native VLAN is VLAN10, so traffic coming out of VLAN-10 is untagged, & goes directly to SW-2 Native VLAN: VLAN100,\ndue to VLAN mismatch.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q214",
  "num": 214,
  "question": "Which two commands can you use to configure an actively negotiate EtherChannel? (Choose two.)",
  "options": [
   "channel-group 10 mode on",
   "channel-group 10 mode auto",
   "channel-group 10 mode passive",
   "channel-group 10 mode desirable",
   "channel-group 10 mode active"
  ],
  "correct": "DE",
  "explanation": "DE (100%)\n\n\uf147 \uf007 jerry19 Highly Voted \uf164 2 years, 4 months ago\nD and E, Answer D is used to 'actively negotiate' for PAGP and answer E is used to 'actively negotiate for LACP.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q215",
  "num": 215,
  "question": "How does STP prevent forwarding loops at OSI Layer 2?",
  "options": [
   "TTL",
   "MAC address forwarding",
   "Collision avoidance",
   "Port blocking"
  ],
  "correct": "D",
  "explanation": "D (87%)\n\n13%\n\n\uf147 \uf007 mikachuu85 Highly Voted \uf164 1 year, 7 months ago\nSelected Answer: D\n\nCorrect answer is D as TTL is Layer 3 which won't apply in this scenario. Thus, answer A is wrong.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q216",
  "num": 216,
  "question": "Which two statements about VTP are true? (Choose two.)",
  "options": [
   "All switches must be configured with the same VTP domain name",
   "All switches must be configured to perform trunk negotiation",
   "All switches must be configured with a unique VTP domain name",
   "The VTP server must have the highest revision number in the domain",
   "All switches must use the same VTP version"
  ],
  "correct": "AE",
  "explanation": "AE (39%)\n\nAD (39%)\n\nDE (16%)\n\n3%\n\n\uf147 \uf007 [Removed] Highly Voted \uf164 2 years, 5 months ago\n\"All switches in a VTP domain must have the same domain name, but they do not need to run the same VTP\nversion.\"https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst3560/software/release/122_52_se/configuration/guide/3560scg/swvtp.html#wp1107364\nA&D are correct",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q217",
  "num": 217,
  "question": "Which type does a port become when it receives the best BPDU on a bridge?",
  "options": [
   "The designated port",
   "The backup port",
   "The alternate port",
   "The root port"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 nenotronix Highly Voted \uf164 2 years, 6 months ago\n\"D\" is correct\nhttps://www.cisco.com/c/en/us/support/docs/lan-switching/spanning-tree-protocol/24062146.html#:~:text=The%20port%20that%20receives%20the,ones%20any%20other%20bridge%20sends.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q218",
  "num": 218,
  "question": "Which value can you modify to configure a specific interface as the preferred forwarding interface?",
  "options": [
   "The interface number",
   "The port priority",
   "The VLAN priority",
   "The hello time"
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 Claudiu1 Highly Voted \uf164 2 years, 6 months ago\nThis is an STP-related question",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q219",
  "num": 219,
  "question": "Which statement about Cisco Discovery Protocol is true?",
  "options": [
   "It is a Cisco-proprietary protocol.",
   "It runs on the network layer.",
   "It can discover information from routers, firewalls, and switches.",
   "It runs on the physical layer and the data link layer."
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 paolo_brosio Highly Voted \uf164 2 years, 4 months ago\nThis is pure product placement",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q220",
  "num": 220,
  "question": "What are two reasons a network administrator would use CDP? (Choose two.)",
  "options": [
   "to verify the type of cable interconnecting two devices",
   "to determine the status of network services on a remote device",
   "to obtain VLAN information from directly connected switches",
   "to verify Layer 2 connectivity between two devices when Layer 3 fails",
   "to obtain the IP address of a connected device in order to telnet to the device",
   "to determine the status of the routing protocols between directly connected routers"
  ],
  "correct": "DE",
  "explanation": "DE (100%)\n\n\uf147 \uf007 [Removed] Highly Voted \uf164 6 months, 4 weeks ago\nWhy not CE?",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q221",
  "num": 221,
  "question": "What are two benefits of using VTP in a switching environment? (Choose two.)",
  "options": [
   "It allows switches to read frame tags.",
   "It allows ports to be assigned to VLANs automatically.",
   "It maintains VLAN consistency across a switched network.",
   "It allows frames from multiple VLANs to use a single interface.",
   "It allows VLAN information to be automatically propagated throughout the switching environment."
  ],
  "correct": "CE",
  "explanation": "Topic 1\n\n\f\uf147 \uf007 GreatDane Highly Voted \uf164 1 year, 2 months ago\nRef: Understanding VLAN Trunk Protocol (VTP) \u2013 Cisco\n\u201c...\nIntroduction\nVLAN Trunk Protocol (VTP) reduces administration in a switched network. When you configure a new VLAN on one VTP server, the VLAN is\ndistributed through all switches in the domain. This reduces the need to configure the same VLAN everywhere.\n...\u201d\nA. It allows switches to read frame tags.\nWrong answer.\nB. It allows ports to be assigned to VLANs automatically.\nWrong answer.\nC. It maintains VLAN consistency across a switched network.\nCorrect answer.\nD. It allows frames from multiple VLANs to use a single interface.\nWrong answer.\nE. It allows VLAN information to be automatically propagated throughout the switching environment.\nCorrect answer.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q222",
  "num": 222,
  "question": "Which three statements are typical characteristics of VLAN arrangements? (Choose three.)",
  "options": [
   "A new switch has no VLANs configured.",
   "Connectivity between VLANs requires a Layer 3 device.",
   "VLANs typically decrease the number of collision domains.",
   "Each VLAN uses a separate address space.",
   "A switch maintains a separate bridging table for each VLAN.",
   "VLANs cannot span multiple switches."
  ],
  "correct": "BDE",
  "explanation": "BDE (100%)\n\n\uf147 \uf007 dicksonpwc Highly Voted \uf164 2 years, 1 month ago\nTo communicate between two different VLANs we need to use a Layer 3 device like router or Layer 3 switch -> B is correct.\nVLANs don\u2019t affect the number of collision domains, they are the same -> C is not correct. Typically, VLANs increase the number of broadcast\ndomains.\nWe must use a different network (or sub-network) for each VLAN. For example we can use 192.168.1.0/24 for VLAN 1, 192.168.2.0/24 for VLAN 2 ->\nD is correct.\nA switch maintains a separate bridging table for each VLAN so that it can send frame to ports on the same VLAN only. For example, if a PC in VLAN\n2 sends a frame then the switch look-ups its bridging table and only sends frame out of its ports which belong to VLAN 2 (it also sends this frame\non trunk ports) -> E is correct.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q223",
  "num": 223,
  "question": "On a corporate network, hosts on the same VLAN can communicate with each other, but they are unable to communicate with hosts on different\nVLANs. What is needed to allow communication between the VLANs?",
  "options": [
   "a router with subinterfaces configured on the physical interface that is connected to the switch",
   "a router with an IP address on the physical interface connected to the switch",
   "a switch with an access link that is configured between the switches",
   "a switch with a trunk link that is configured between the switches"
  ],
  "correct": "A",
  "explanation": "Different VLANs can't communicate with each other, they can communicate with the help of Layer3 router. Hence, it is needed to connect a\nrouter to a switch, then make the sub-interface on the router to connect to the switch, establishing Trunking links to achieve communications of\ndevices which belong to different VLANs.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q224",
  "num": 224,
  "question": "Which statement about LLDP is true?",
  "options": [
   "It is a Cisco proprietary protocol.",
   "It is configured in global configuration mode.",
   "The LLDP update frequency is a fixed value.",
   "It runs over the transport layer."
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 SScott Highly Voted \uf164 2 years, 1 month ago\nB is correct, LLDP is for support with non-Cisco devices, runs on the data link layer, and lldp timer has a configurable range from 5 to 65534 sec,\ncommands configured only from conf t",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q225",
  "num": 225,
  "question": "What is a function of Wireless LAN Controller?",
  "options": [
   "register with a single access point that controls traffic between wired and wireless endpoints",
   "use SSIDs to distinguish between wireless clients",
   "send LWAPP packets to access points",
   "monitor activity on wireless and wired LANs"
  ],
  "correct": "C",
  "explanation": "Lightweight APs (LAPs) is devices require no initial configuration. LAPs use the Lightweight Access Point Protocol (LWAPP) to communicate\nwith a WLAN controller (WLC), as shown in the below figure. Controller-based APs are useful in situations where many APs are required in the\nnetwork. As more APs are added, each AP is automatically configured and managed by the WLC.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q226",
  "num": 226,
  "question": "Which technology is used to improve web traffic performance by proxy caching?",
  "options": [
   "WSA",
   "Firepower",
   "ASA",
   "FireSIGHT"
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 mrsiafu Highly Voted \uf164 2 years, 4 months ago\nYeah.. but what cert guide would have gave this type of info for a question like this!",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q227",
  "num": 227,
  "question": "What criteria is used first during the root port selection process?",
  "options": [
   "local port ID",
   "lowest path cost to the toot bridge",
   "lowest neighbor's bridge ID",
   "lowest neighbor's port ID"
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 DavidFitzgerald Highly Voted \uf164 2 years, 4 months ago\nlol toot bridge",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q228",
  "num": 228,
  "question": "Which statement about VLAN configuration is true?",
  "options": [
   "The switch must be in VTP server or transparent mode before you can configure a VLAN",
   "The switch must be in config-vlan mode before you configure an extended VLAN",
   "Dynamic inter-VLAN routing is supported on VLAN2 through VLAN 4064",
   "A switch in VTP transparent mode save the VLAN databases to the running configuration only"
  ],
  "correct": "A",
  "explanation": "A (75%)\n\nB (25%)\n\n\uf147 \uf007 Nhan Highly Voted \uf164 2 years, 6 months ago\nCorrect answer is a, you can only create, add, delete edit vlan in server and transparent mode, you won\u2019t be able to create, delete vlan in client\nmode.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q229",
  "num": 229,
  "question": "Refer to the exhibit. What two conclusions should be made about this configuration? (Choose two.)",
  "options": [
   "The root port is FastEthernet 2/1",
   "The designated port is FastEthernet 2/1",
   "The spanning-tree mode is PVST+",
   "This is a root bridge",
   "The spanning-tree mode is Rapid PVST+"
  ],
  "correct": "AE",
  "explanation": "\uf147 \uf007 Randman Highly Voted \uf164 1 year, 9 months ago\nAnd how do we know Fe2/1 is the root port and not the designated port from this show of output?\nThank you",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q230",
  "num": 230,
  "question": "A network engineer must create a diagram of a multivendor network. Which command must be configured on the Cisco devices so that the\ntopology of the network is allowed to be mapped?",
  "options": [
   "Device(config)#lldp run",
   "Device(config)#cdp run",
   "Device(config-if)#cdp enable",
   "Device(config)#flow-sampler-map topology"
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 Jay1324 Highly Voted \uf164 1 year, 8 months ago\nKey is multi-vendor--lldp. cdp is cisco only",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q231",
  "num": 231,
  "question": "How do AAA operations compare regarding user identification, user services, and access control?",
  "options": [
   "Authorization provides access control, and authentication tracks user services",
   "Authentication identifies users, and accounting tracks user services",
   "Accounting tracks user services, and authentication provides access control",
   "Authorization identifies users, and authentication provides access control"
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 Ali526 Highly Voted \uf164 2 years, 8 months ago\nAuthentication, Identify users\nAuthorization, access control\nAccounting, track user services",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q232",
  "num": 232,
  "question": "What is the difference between RADIUS and TACACS+?",
  "options": [
   "RADIUS logs all commands that are entered by the administrator, but TACACS+ logs only start, stop, and interim commands.",
   "TACACS+ separates authentication and authorization, and RADIUS merges them.",
   "TACACS+ encrypts only password information, and RADIUS encrypts the entire payload.",
   "RADIUS is most appropriate for dial authentication, but TACACS+ can be used for multiple types of authentication."
  ],
  "correct": "B",
  "explanation": "B (92%)\n\n8%\n\n\uf147 \uf007 Shamwedge Highly Voted \uf164 1 year, 6 months ago\nSelected Answer: B\n\nTACAS+ A-Authentictaion | A-Authorization (Both A's are sperated by a C) = TACAS+ seperates Authentication and Authorization.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q233",
  "num": 233,
  "question": "What is a difference between local AP mode and FlexConnect AP mode?",
  "options": [
   "Local AP mode creates two CAPWAP tunnels per AP to the WLC",
   "Local AP mode causes the AP to behave as if it were an autonomous AP",
   "FlexConnect AP mode fails to function if the AP loses connectivity with the WLC",
   "FlexConnect AP mode bridges the traffic from the AP to the WLC when local switching is configured"
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 dave369 Highly Voted \uf164 3 years, 3 months ago\nThis link supports \"A\" as the answer:\n\"In local mode, an AP creates two CAPWAP tunnels to the WLC. One is for management, the other is data traffic. This behavior is known as\n\"centrally switched\" because the data traffic is switched(bridged) from the ap to the controller where it is then routed by some routing device.\"\nhttps://community.cisco.com/t5/wireless-and-mobility/what-s-the-difference-between-local-mode-and-flex-connect-mode/td-p/2532657",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q234",
  "num": 234,
  "question": "The SW1 interface g0/1 is in the down/down state. What are two reasons for the interface condition? (Choose two.)",
  "options": [
   "There is a protocol mismatch",
   "There is a duplex mismatch",
   "The interface is shut down",
   "The interface is error-disabled",
   "There is a speed mismatch"
  ],
  "correct": "DE",
  "explanation": "The interface is shut down - ADMIN DOWN / DOWN\nThe interface is error-disabled - DOWN / DOWN\nThere is a speed mismatch - DOWN / DOWN",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q235",
  "num": 235,
  "question": "How will Link Aggregation be implemented on a Cisco Wireless LAN Controller?",
  "options": [
   "The EtherChannel must be configured in \u202b\u05d2\u202c\u20acmode active\u202b\u05d2\u202c\u20ac.",
   "When enabled, the WLC bandwidth drops to 500 Mbps.",
   "To pass client traffic, two or more ports must be configured.",
   "One functional physical port is needed to pass client traffic."
  ],
  "correct": "D",
  "explanation": "Reference:\nhttps://www.cisco.com/c/en/us/td/docs/wireless/controller/8-2/config-guide/b_cg82/b_cg82_chapter_010101011.html\n\n\uf147 \uf007 oooMooo Highly Voted \uf164 2 years, 4 months ago\nD is correct\n\"When you enable LAG, only one functional physical port is needed for the controller to pass client traffic.\"\nhttps://www.cisco.com/c/en/us/td/docs/wireless/controller/74/configuration/guides/consolidated/b_cg74_CONSOLIDATED/b_cg74_CONSOLIDATED_chapter_010100001.html#:~:text=When%20you%20enable\n%20LAG%2C%20only,controller%20to%20pass%20client%20traffic.&text=When%20you%20enable%20LAG%2C%20you,on%20which%20it%20rece\nived%20them.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q236",
  "num": 236,
  "question": "Which two conditions must be met before SSH operates normally on a Cisco IOS switch? (Choose two.)",
  "options": [
   "IP routing must be enabled on the switch.",
   "A console password must be configured on the switch.",
   "Telnet must be disabled on the switch.",
   "The switch must be running a k9 (crypto) IOS image.",
   "The ip domain-name command must be configured on the switch."
  ],
  "correct": "DE",
  "explanation": "Reference:\nhttps://www.cisco.com/c/en/us/support/docs/security-vpn/secure-shell-ssh/4145-ssh.html\n\n\uf147 \uf007 mazintaha Highly Voted \uf164 3 years, 2 months ago\n\"The Cisco IOS image used must be a k9(crypto) image in order to support SSH. \"\n\"!--- Step 2: Configure the DNS domain of the router.\nip domain-name rtp.cisco.com\"",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q237",
  "num": 237,
  "question": "Refer to the exhibit. Which password must an engineer use to enter the enable mode?",
  "options": [
   "adminadmin123",
   "cisco123",
   "default",
   "testing1234"
  ],
  "correct": "D",
  "explanation": "If neither the enable password command nor the enable secret command is configured, and if there is a line password configured for the\nconsole, the console line password serves as the enable password for all VTY sessions -> The \u202b\u05d2\u202c\u20acenable secret\u202b\u05d2\u202c\u20ac will be used first if available,\nthen \u202b\u05d2\u202c\u20acenable password\u202b\u05d2\u202c\u20ac and line password.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q238",
  "num": 238,
  "question": "Which state does the switch port move to when PortFast is enabled?",
  "options": [
   "blocking",
   "listening",
   "learning",
   "forwarding"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 ZUMY 1 year, 2 months ago\nD is correct!",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q239",
  "num": 239,
  "question": "Which protocol prompts the Wireless LAN Controller to generate its own local web administration SSL certificate for GUI access?",
  "options": [
   "RADIUS",
   "HTTPS",
   "TACACS+",
   "HTTP"
  ],
  "correct": "B",
  "explanation": "You can protect communication with the GUI by enabling HTTPS. HTTPS protects HTTP browser sessions by using the Secure Sockets Layer\n(SSL) protocol.\nWhen you enable HTTPS, the controller generates its own local web administration SSL certificate and automatically applies it to the GUI. You\nalso have the option of downloading an externally generated certificate.\nReference:\nhttps://www.cisco.com/c/en/us/td/docs/wireless/controller/8-0/configuration-guide/b_cg80/b_cg80_chapter_011.html\n\n\uf147 \uf007 battery1979 1 year, 2 months ago\nRADIUS and TACACS+ are not protocols, and HTTP can't utilize SSL.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q240",
  "num": 240,
  "question": "An engineer must configure interswitch VLAN communication between a Cisco switch and a third-party switch. Which action should be taken?",
  "options": [
   "configure DSCP",
   "configure IEEE 802.1q",
   "configure ISL",
   "configure IEEE 802.1p"
  ],
  "correct": "B",
  "explanation": "VLAN trunking offers two options, ISL and 802.1Q. ISL is Cisco proprietary while 802.1Q is standards based and supported by multiple vendors.\n\n\uf147 \uf007 Timbul 8 months, 3 weeks ago\nanswer B and answer D look identical\nuntill I figured out p and q difference",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q241",
  "num": 241,
  "question": "An engineer requires a switch interface to actively attempt to establish a trunk link with a neighbor switch. What command must be configured?",
  "options": [
   "switchport mode trunk",
   "switchport mode dynamic desirable",
   "switchport nonegotiate",
   "switchport mode dynamic auto"
  ],
  "correct": "B",
  "explanation": "Reference:\nhttps://www.ciscopress.com/articles/article.asp?\np=2181837&seqNum=8#:~:text=switchport%20mode%20dynamic%20auto%3A%20Makes,to%20trunk%20or%\n.\n20desirable%20mode.&text=switchport%20mode%20dynamic%20desirable%3A%20Makes,link%20to%20a%20trunk%20link",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q242",
  "num": 242,
  "question": "Refer to the exhibit. After the election process, what is the root bridge in the HQ LAN?\nSwitch 1: 0C:E0:38:81:32:58 Switch 2: 0C:0E:15:22:1A:61 Switch 3: 0C:0E:15:1D:3C:9A Switch 4: 0C:E0:19:A1:4D:16 -",
  "options": [
   "Switch 1",
   "Switch 2",
   "Switch 3",
   "Switch 4"
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 Anarckii Highly Voted \uf164 1 year, 9 months ago\nSelected Answer: C\n\nIt's the switch with the lowest MAC address",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q243",
  "num": 243,
  "question": "An engineer must establish a trunk link between two switches. The neighboring switch is set to trunk or desirable mode. What action should be\ntaken?",
  "options": [
   "configure switchport nonegotiate",
   "configure switchport mode dynamic desirable",
   "configure switchport mode dynamic auto",
   "configure switchport trunk dynamic desirable"
  ],
  "correct": "C",
  "explanation": "B (52%)\n\nC (48%)\n\n\uf147 \uf007 Masood101 Highly Voted \uf164 2 years, 4 months ago\nB and C are correct",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q244",
  "num": 244,
  "question": "Which spanning-tree enhancement avoids the learning and listening states and immediately places ports in the forwarding state?",
  "options": [
   "BPDUfilter",
   "PortFast",
   "Backbonefast",
   "BPDUguard"
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 Alsaher Highly Voted \uf164 2 years, 4 months ago\nB is correct",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q245",
  "num": 245,
  "question": "How does the dynamically-learned MAC address feature function?",
  "options": [
   "The CAM table is empty until ingress traffic arrives at each port",
   "Switches dynamically learn MAC addresses of each connecting CAM table.",
   "The ports are restricted and learn up to a maximum of 10 dynamically-learned addresses",
   "It requires a minimum number of secure MAC addresses to be filled dynamically"
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 Stallion 1 month, 3 weeks ago\nOption B is correct because switches dynamically learn the MAC addresses of each connecting device and store them in the CAM table.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q246",
  "num": 246,
  "question": "When using Rapid PVST+, which command guarantees the switch is always the root bridge for VLAN 200?",
  "options": [
   "spanning-tree vlan 200 priority 614440",
   "spanning-tree vlan 200 priority 0",
   "spanning-tree vlan 200 root primary",
   "spanning-tree vlan 200 priority 38813258"
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 Asymptote Highly Voted \uf164 2 years, 1 month ago\nthere is the same question earlier this one,\nbut taht answer is D ...",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q247",
  "num": 247,
  "question": "Refer to the exhibit. Which command must be executed for Gi1/1 on SW1 to passively become a trunk port if Gi1/1 on SW2 is configured in\ndesirable or trunk mode?",
  "options": [
   "switchport mode dynamic auto",
   "switchport mode dot1-tunnel",
   "switchport mode dynamic desirable",
   "switchport mode trunk"
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 CiscoTerminator Highly Voted \uf164 2 years, 1 month ago\nKey Word is \"passively\" - so its Auto",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q248",
  "num": 248,
  "question": "Refer to the exhibit. The entire contents or the MAC address table are shown. Sales-4 sends a data frame to Sales-1.\n\nWhat does the switch do as it receives the frame from Sales-4?",
  "options": [
   "Map the Layer 2 MAC address to the Layer 3 IP address and forward the frame.",
   "Insert the source MAC address and port into the forwarding table and forward the frame to Sales-1.",
   "Perform a lookup in the MAC address table and discard the frame due to a missing entry.",
   "Flood the frame out of all ports except on the port where Sales-1 is connected."
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 raul_kapone 4 weeks, 1 day ago\nSelected Answer: B\n\nThe complete action performed by the switch Sales-SW is:\n1) Learn the Source MAC address of the FastEthernet intefac of Sales-4\n2) Associate this MAC address with the Gi1/0/4 interface of the switch (Sales-SW)\n3) Finally, Sales-SW will flood a copy of the incoming frame for all their ports, except the incoming port (reaching to all hosts, including Sales-.1\nHowever, by discarding and due to there is no an option specifing the complete action performed by Sales-SW does (one of the points specified\nabove): The option \"B\" is right (but it is not the only thing what is happening!)",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q249",
  "num": 249,
  "question": "Refer to the exhibit. An engineer must configure GigabitEthernet1/1 to accommodate voice and data traffic. Which configuration accomplishes\nthis task?",
  "options": [
   "interface gigabitethernet1/1 switchport mode access switchport access vlan 300 switchport voice vlan 400",
   "interface gigabitethernet1/1 switchport mode trunk switchport trunk vlan 300 switchport trunk vlan 400",
   "interface gigabitethernet1/1 switchport mode access switchport voice vlan 300 switchport access vlan 400",
   "interface gigabitethernet1/1 switchport mode trunk switchport trunk vlan 300 switchport voice vlan 400"
  ],
  "correct": "A",
  "explanation": "A (88%)\n\n13%\n\n\uf147 \uf007 ZUMY 1 year, 2 months ago\nA is correct",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q250",
  "num": 250,
  "question": "An engineer needs to add an old switch back into a network. To prevent the switch from corrupting the VLAN database, with action must be taken?",
  "options": [
   "Add the switch in the VTP domain with a lower revision number.",
   "Add the switch in the VTP domain with a higher revision number.",
   "Add the switch with DTP set to dynamic desirable.",
   "Add the switch with DTP set to desirable."
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 Customexit Highly Voted \uf164 10 months, 3 weeks ago\nSelected Answer: A\n\nOne danger of VTP:\nIf you connect an old switch with a higher revision number to your network (and the VTP domain name matches), all switches in the domain will\nsync their VLAN database to that switch.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q251",
  "num": 251,
  "question": "Which technology prevents client devices from arbitrarily connecting to the network without state remediation?",
  "options": [
   "802.11n",
   "802.1x",
   "MAC Authentication Bypass",
   "IP Source Guard"
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 sdokmak Highly Voted \uf164 2 years, 2 months ago\nB seems right.\nA. is a wifi extension protocol\nC. is a means of bypassing 802.1x which is the opposite of what we want.\nD. is when an attacker uses the same IP as the client. But the question states client devices as a given.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q252",
  "num": 252,
  "question": "Which protocol does an access point use to draw power from a connected switch?",
  "options": [
   "Internet Group Management Protocol",
   "Cisco Discovery Protocol",
   "Adaptive Wireless Path Protocol",
   "Neighbor Discovery Protocol"
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 CISCO2022 Highly Voted \uf164 2 years, 3 months ago\nPoE switches support Cisco pre-standard PD detection mechanisms, and any Standards based compliant PDs. Most Cisco made PDs, pre-standard\nor standard, support Cisco Discovery Protocol (CDP). Once power is applied to a port that contains a pre-standard or standard Cisco PD, CDP is\nused in order to determine the actual power requirement, and the system power budget is adjusted accordingly.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q253",
  "num": 253,
  "question": "An administrator must secure the WLC from receiving spoofed association requests. Which steps must be taken to configure the WLC to restrict\nthe requests and force the user to wait 10 ms to retry an association request?",
  "options": [
   "Enable MAC filtering and set the SA Query timeout to 10.",
   "Enable 802.1x Layer 2 security and set the Comeback timer to 10.",
   "Enable Security Association Teardown Protection and set the SA Query timeout to 10.",
   "Enable the Protected Management Frame service and set the Comeback timer to 10."
  ],
  "correct": "C",
  "explanation": "D (75%)\n\nC (25%)\n\n\uf147 \uf007 MrPOW Highly Voted \uf164 2 years, 2 months ago\nHas to be D based on..\nhttps://www.cisco.com/c/en/us/support/docs/wireless-mobility/wireless-lan-wlan/212576-configure-802-11w-management-frameprote.html#anc8",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q254",
  "num": 254,
  "question": "Refer to the exhibit. Only four switches are participating in the VLAN spanning-tree process.\nBranch-1: priority 614440 Branch-2: priority 39391170 Branch-3: priority 0 Branch-4: root primary Which switch becomes the permanent root bridge for VLAN 5?",
  "options": [
   "Branch-1",
   "Branch-2",
   "Branch-3",
   "Branch-4"
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 LOST40 Highly Voted \uf164 1 year, 6 months ago\nA priority 0 means that it guarantees the switch is always the root bridge of a particular VLAN. You don't need other information.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q255",
  "num": 255,
  "question": "An engineer must configure traffic for a VLAN that is untagged by the switch as it crosses a trunk link. Which command should be used?",
  "options": [
   "switchport trunk encapsulation dot1q",
   "switchport trunk allowed vlan 10",
   "switchport mode trunk",
   "switchport trunk native vlan 10"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 mfaria 1 month, 1 week ago\nSelected Answer: D\n\nUnttagged usualy asks for Native",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q256",
  "num": 256,
  "question": "What are two benefits of using the PortFast feature? (Choose two.)",
  "options": [
   "Enabled interfaces are automatically placed in listening state.",
   "Enabled interfaces wait 50 seconds before they move to the forwarding state.",
   "Enabled interfaces never generate topology change notifications.",
   "Enabled interfaces come up and move to the forwarding state immediately.",
   "Enabled interfaces that move to the learning state generate switch topology change notifications."
  ],
  "correct": "AD",
  "explanation": "CD (97%)\n\n\uf147 \uf007 vannplus11 Highly Voted \uf164 1 year, 12 months ago\n\u2022 Interfaces with portfast enabled that come up will go to forwarding mode immediately, the interface will skip the listening and learning state.\n\u2022 A switch will never generate a topology change notification for an interface that has portfast enabled.\nhttps://networklessons.com/switching/cisco-portfast-configuration",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q257",
  "num": 257,
  "question": "What is the benefit of configuring PortFast on an interface?",
  "options": [
   "The frames entering the interface are marked with the higher priority and then processed faster by a switch.",
   "After the cable is connected, the interface is available faster to send and receive user data.",
   "Real-time voice and video frames entering the interface are processed faster.",
   "After the cable is connected, the interface uses the fastest speed setting available for that cable type."
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 Stonetales987 Highly Voted \uf164 1 year, 10 months ago\nB is correct - Portfast causes a switch or trunk port to enter the spanning tree forwarding state immediately, bypassing the listening and learning\nstates.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q259",
  "num": 259,
  "question": "Why does a switch flood a frame to all ports?",
  "options": [
   "The frame has zero destination MAC addresses.",
   "The destination MAC address of the frame is unknown.",
   "The source MAC address of the frame is unknown",
   "The source and destination MAC addresses of the frame are the same."
  ],
  "correct": "B",
  "explanation": "B (94%)\n\n4%\n\n\uf147 \uf007 Fuaad Highly Voted \uf164 2 years ago\nB is the correct answer\nplease update it",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q260",
  "num": 260,
  "question": "An engineer configures interface Gi1/0 on the company PE router to connect to an ISP. Neighbor discovery is disabled.\n\nWhich action is necessary to complete the configuration if the ISP uses third-party network devices?",
  "options": [
   "Disable autonegotiation.",
   "Enable LLDP globally.",
   "Enable LLDP-MED on the ISP device.",
   "Disable Cisco Discovery Protocol on the interface."
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 mechelleh Highly Voted \uf164 1 year, 5 months ago\nsuch a dumb question...",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q262",
  "num": 262,
  "question": "Which access point mode relies on a centralized controller for management, roaming, and SSID configuration?",
  "options": [
   "lightweight mode",
   "autonomous mode",
   "bridge mode",
   "repeater mode"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Rether16 5 months, 1 week ago\nIn the words of Ronnie Coleman: Lightweight Baby!!!",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q263",
  "num": 263,
  "question": "Refer to the exhibit. A network engineer must configure communication between PC A and the File Server. To prevent interruption for any other\ncommunications, which command must be configured?",
  "options": [
   "switchport truck allowed vlan 12",
   "switchport truck allowed vlan none",
   "switchport truck allowed vlan add 13",
   "switchport truck allowed vlan remove 10-11"
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 ctoklu Highly Voted \uf164 1 year, 2 months ago\nswitchport TRUCK?? --> TRUNK",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q264",
  "num": 264,
  "question": "Refer to the exhibit. What is the result if Gig1/11 receives an STP BPDU?",
  "options": [
   "The port transitions to STP blocking.",
   "The port immediately transitions to STP forwarding.",
   "The port goes into error-disable state.",
   "The port transitions to the root port."
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 ZUMY Highly Voted \uf164 1 year, 2 months ago\nC:\nBPDU Guard feature protects the port from receiving STP BPDUs, however the port can transmit STP BPDUs. When a STP BPDU is received on a\nBPDU Guard enabled port, the port is shutdown and the state of the port changes to ErrDis (Error-Disable) state.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q265",
  "num": 265,
  "question": "Which access layer threat-mitigation technique provides security based on identity?",
  "options": [
   "Dynamic ARP Inspection",
   "DHCP snooping",
   "802.1x",
   "using a non-default native VLAN"
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 GreatDane 1 month, 2 weeks ago\nSelected Answer: C\n\nSecurity Configuration Guide, Cisco IOS XE Amsterdam 17.1.x (Catalyst 9300 Switches) - Configuring IEEE 802.1x Port-Based Authentication\n[Support] \u2013 Cisco\nC H A P T E R 25\nConfiguring IEEE 802.1x Port-Based Authentication\n\u201c\u2026\nPort-Based Authentication Process\nTo configure IEEE 802.1X port-based authentication, you must enable authentication, authorization, and accounting (AAA) and specify the\nauthentication method list. A method list describes the sequence and authentication method to be queried to authenticate a user.\nThe AAA process begins with authentication. When 802.1x port-based authentication is enabled and the client supports 802.1x-compliant client\nsoftware, these events occur:\n- If the client identity is valid and the 802.1x authentication succeeds, the switch grants the client access to the network.\n\u2026\u201d",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q266",
  "num": 266,
  "question": "Refer to the exhibit. Which action do the switches take on the trunk link?",
  "options": [
   "The trunk does not form, and the ports go into an err-disabled status.",
   "The trunk forms, but the mismatched native VLANs are merged into a single broadcast domain.",
   "The trunk forms, but VLAN 99 and VLAN 999 are in a shutdown state.",
   "The trunk does not form, but VLAN 99 and VLAN 999 are allowed to traverse the link."
  ],
  "correct": "B",
  "explanation": "The trunk still forms with mismatched native VLANs and the traffic can actually flow between mismatched switches. But it is absolutely\nnecessary that the native\nVLANs on both ends of a trunk link match; otherwise a native VLAN mismatch occurs, causing the two VLANs to effectively merge. For\nexample, with the above configuration, SW1 would send untagged frames for VLAN 999. SW2 receives them but would think they are for VLAN\n99 so we can say these two VLANs are merged.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q267",
  "num": 267,
  "question": "A network engineer must configure two new subnets using the address block 10.70.128.0/19 to meet these requirements:\n\u2711 The first subnet must support 24 hosts.\n\u2711 The second subnet must support 472 hosts.\n\u2711 Both subnets must use the longest subnet mask possible from the address block.\n\nWhich two configurations must be used to configure the new subnets and meet a requirement to use the first available address in each subnet for\nthe router interfaces? (Choose two.)",
  "options": [
   "interface vlan 1148 ip address 10.70.148.1 255.255.254.0",
   "interface vlan 3002 ip address 10.70.147.17 255.255.255.224",
   "interface vlan 4722 ip address 10.70.133.17 255.255.255.192",
   "interface vlan 1234 ip address 10.70.159.1 255.255.254.0",
   "interface vlan 155 ip address 10.70.155.65 255.255.255.224"
  ],
  "correct": "DE",
  "explanation": "AE (93%)\n\n4%\n\n\uf147 \uf007 Customexit Highly Voted \uf164 10 months, 3 weeks ago\nSelected Answer: AE\n\nAdding my answer since there is so much confusion.\nRemove C because VLAN ranges are 1-1005 and 1006-4094.\n!The requirement is to use the first available address in each subnet!\nFor A, the network address is .148.0. The first available is 148.1. 255.255.254.0 is /23, we have 512 addresses so we are good on the 472 host\nrequirement.\nFor B, 10.70.147.1 is the first address. So no.\nFor D, (we already decided on A but we'll do this anyway) 10.70.158.1 is our first. Not 159.1.\nFor E, .64 is our network, .65 is our first. This works. .224 is /27 which gives us 32 total addresses, more than we need.\nI highly recommend watching 'Subnetting Mastery' youtube playlist for learn how to subnet fast.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q268",
  "num": 268,
  "question": "Refer to the exhibit. An administrator must configure interfaces Gi1/1 and Gi1/3 on switch SW11. PC-1 and PC-2 must be placed in the Data VLAN,\nand Phone-1 must be placed in the Voice VLAN. Which configuration meets these requirements?",
  "options": [
   "interface gigabitethernet1/1 switchport mode access switchport access vlan 8 ! interface gigabitethernet1/3 switchport mode access\nswitchport access vlan 8 switchport voice vlan 9",
   "interface gigabitethernet1/1 switchport mode access switchport access vlan 8 ! interface gigabitethernet1/3 switchport mode trunk\nswitchport trunk vlan 8 switchport voice vlan 9",
   "interface gigabitethernet1/1 switchport mode access switchport access vlan 9 ! interface gigabitethernet1/3 switchport mode trunk\nswitchport trunk vlan 8 switchport trunk vlan 9",
   "interface gigabitethernet1/1 switchport mode access switchport access vlan 8 ! interface gigabitethernet1/3 switchport mode access\nswitchport voice vlan 8 switchport access vlan 9"
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 ZUMY Highly Voted \uf164 1 year, 2 months ago\nA is correct",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q269",
  "num": 269,
  "question": "Refer to the exhibit. Users need to connect to the wireless network with IEEE 802.11r-compatible devices. The connection must be maintained as\nusers travel between floors or to other areas in the building. What must be the configuration of the connection?",
  "options": [
   "Disable AES encryption.",
   "Enable Fast Transition and select the FT 802.1x option.",
   "Enable Fast Transition and select the FT PSK option.",
   "Select the WPA Policy option with the CCKM option."
  ],
  "correct": "C",
  "explanation": "Reference:\nhttps://www.cisco.com/c/dam/en/us/td/docs/wireless/controller/technotes/80211r-ft/b-80211r-dg.html",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q270",
  "num": 270,
  "question": "Refer to the exhibit. An engineer is asked to insert the new VLAN into the existing trunk without modifying anything previously configured. Which\ncommand accomplishes this task?",
  "options": [
   "switchport trunk allowed vlan 100-104",
   "switchport trunk allowed vlan 104",
   "switchport trunk allowed vlan all",
   "switchport trunk allowed vlan add 104"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 fabitadj 1 week ago\nSwitch(config-if)#switchport trunk allowed vlan ?\nWORD VLAN IDs of the allowed VLANs when this port is in trunking mode\nadd add VLANs to the current list\nall all VLANs\nexcept all VLANs except the following\nnone no VLANs\nremove remove VLANs from the current list",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q271",
  "num": 271,
  "question": "Aside from discarding, which two states does the switch port transition through while using RSTP (802.1w)? (Choose two.)",
  "options": [
   "blocking",
   "speaking",
   "listening",
   "learning",
   "forwarding"
  ],
  "correct": "DE",
  "explanation": "Reference:\nhttps://www.cisco.com/c/en/us/support/docs/lan-switching/spanning-tree-protocol/24062-146.html",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q273",
  "num": 273,
  "question": "Which interface mode must be configured to connect the lightweight APs in a centralized architecture?",
  "options": [
   "WLAN dynamic",
   "trunk",
   "access",
   "management"
  ],
  "correct": "C",
  "explanation": "While the Cisco WLCs always connect to 802.1Q trunks, Cisco lightweight APs do not understand VLAN tagging and should only be connected\nto the access ports of the neighbor switch.\nThis is an example switch port configuration from the Catalyst 3750: interface GigabitEthernet1/0/22 description Access Port Connection to\nCisco Lightweight AP switchport access vlan 5 switchport mode access no shutdown\nReference:\nhttps://www.cisco.com/c/en/us/support/docs/wireless/4400-series-wireless-lan-controllers/69719-wlc-lwap-config.html",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q274",
  "num": 274,
  "question": "Refer to the exhibit. The following must be considered:\n\u2711 SW1 is fully configured for all traffic.\n\u2711 The SW4 and SW9 links to SW1 have been configured.\n\u2711 The SW4 interface Gi0/1 and Gi0/0 on SW9 have been configured.\n\u2711 The remaining switches have had all VLANs added to their VLAN database.\nWhich configuration establishes a successful ping from PC2 to PC7 without interruption to traffic flow between other PCs?",
  "options": [
   "SW4 interface Gi0/7 switchport mode trunk switchport trunk allowed vlan 108 ! interface Gi/0/2 switchport mode access switchport access\nvlan 14 SW11# interface Gi0/2 switchport mode trunk switchport trunk allowed vlan 14,108 ! interface Gi0/1 switchport mode trunk\nswitchport trunk allowed vlan 14,108 SW9# interface Gi0/2 switchport mode access switchport access vlan 14",
   "SW4 interface Gi0/2 switchport mode trunk switchport trunk allowed vlan 14,108 SW11# interface Gi0/2 switchport mode trunk switchport\ntrunk allowed vlan 14,108 !! interface Gi0/1 switchport mode trunk switchport trunk allowed vlan 14,108 SW9# interface Gi0/2 switchport\nmode trunk switchport trunk allowed vlan 14",
   "SW4 interface Gi0/2 switchport mode trunk switchport trunk allowed vlan 14 SW11# interface Gi0/1 switchport mode trunk switchport\ntrunk allowed vlan 14 SW9# interface Gi0/2 switchport mode trunk switchport trunk allowed vlan 108",
   "SW4 interface Gi/0/2 switchport mode access switchport access vlan 14 SW11# interface Gi0/2 switchport mode trunk switchport trunk\nallowed vlan 14 ! interface Gi0/0 switchport mode access switchport access vlan 14 ! interface Gi0/1 switchport mode trunk SW9# interface\nGi0/2 switchport mode access switchport access vlan 14"
  ],
  "correct": "C",
  "explanation": "B (100%)\n\n\uf147 \uf007 Etidic Highly Voted \uf164 10 months, 4 weeks ago\nDid anyone notice that all the wrong answers have exclamation marks (!!) in the CLI?",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q275",
  "num": 275,
  "question": "Refer to the exhibit. The network administrator must prevent the switch Cat9K-2 IP address from being visible in LLDP without disabling the\nprotocol. Which action must be taken to complete the task?",
  "options": [
   "Configure the no lldp mac-phy-cfg command globally on Cat9K-2.",
   "Configure the no lldp receive command on interface G1/0/21 on Cat9K-1.",
   "Configure the no lldp transmit command on interface G1/0/21 on Cat9K-1.",
   "Configure the no lldp tlv-select management-address command globally on Cat9K-2."
  ],
  "correct": "C",
  "explanation": "D (100%)\n\n\uf147 \uf007 [Removed] Highly Voted \uf164 3 months ago\nAgain, this is NOT CCNA 200-301",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q276",
  "num": 276,
  "question": "Refer to the exhibit. An engineer has started to configure replacement switch SW1. To verify part of the configuration, the engineer issued the\ncommands as shown and noticed that the entry for PC2 is missing. Which change must be applied to SW1 so that PC1 and PC2 communicate\nnormally?",
  "options": [
   "SW1(config)#interface fa0/2 SW1(config-if)#no switchport access vlan 2 SW1(config-if)#no switchport trunk allowed vlan 3 SW1(configif)#switchport trunk allowed vlan 2",
   "SW1(config)#interface fa0/2 SW1(config-if)#no switchport access vlan 2 SW1(config-if)#switchport trunk native vlan 2 SW1(configif)#switchport trunk allowed vlan 3",
   "SW1(config)#interface fa0/2 SW1(config-if)#no switchport mode trunk SW1(config-if)#no switchport trunk allowed vlan 3 SW1(configif)#switchport mode access",
   "SW1(config)#interface fa0/1 SW1(config-if)#no switchport access vlan 2 SW1(config-if)#switchport access vlan 3 SW1(configif)#switchport trunk allowed vlan 2"
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 Goh0503 Highly Voted \uf164 11 months, 2 weeks ago\nAnswer C\naccess port \u2013 a port that can be assigned to a single VLAN. This type of interface is configured on switch ports that are connected to end devices\nsuch as workstations, printers, or access points.\ntrunk port \u2013 a port that is connected to another switch. This type of interface can carry traffic of multiple VLANs, thus enabling you to extend\nVLANs across your entire network. Frames are tagged by assigning a VLAN ID to each frame as they traverse between switches.\nhttps://study-ccna.com/access-and-trunk-ports/",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q279",
  "num": 279,
  "question": "Refer to the exhibit. An engineer is configuring a Layer 3 port-channel interface with LACP. The configuration on the first device is complete, and it\nis verified that both interfaces have registered the neighbor device in the CDP table. Which task on the neighbor device enables the new port\nchannel to come up without negotiating the channel?",
  "options": [
   "Configure the IP address of the neighboring device.",
   "Bring up the neighboring interfaces using the no shutdown command.",
   "Change the EtherChannel mode on the neighboring interfaces to auto.",
   "Modify the static EtherChannel configuration of the device to passive mode."
  ],
  "correct": "D",
  "explanation": "D (50%)\n\nB (50%)\n\n\uf147 \uf007 splashy Highly Voted \uf164 1 year ago\nYes... it's D\nBut it's also a bad answer as per cisco documentation (current netacad course)\nstatic/manual = etherchannel ON\ndynamic/negotiation = LACP PagP\nSo they provide an answer with a partially incorrect statement to confuse you and look at an other option with an even worse or incorrect\nstatement... .",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q280",
  "num": 280,
  "question": "Refer to the exhibit. Which configuration establishes a Layer 2 LACP EtherChannel when applied to both switches?",
  "options": [
   "Interface range G1/1 1/3 \"\u20ac\u202b \u05d2\u202cswitchport mode trunk channel-group 1 mode active no shutdown",
   "Interface range G1/1 1/3 \"\u20ac\u202b \u05d2\u202cswitchport mode access channel-group 1 mode passive no shutdown",
   "Interface range G1/1 1/3 \"\u20ac\u202b \u05d2\u202cswitchport mode trunk channel-group 1 mode desirable no shutdown",
   "Interface range G1/1 1/3 \"\u20ac\u202b \u05d2\u202cswitchport mode access channel-group 1 mode on no shutdown"
  ],
  "correct": "A",
  "explanation": "A (63%)\n\nD (38%)\n\n\uf147 \uf007 freeknowledge123 Highly Voted \uf164 8 months, 1 week ago\nLACP=Active PAGP=desirable Static=On",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q281",
  "num": 281,
  "question": "Which switching concept is used to create separate broadcast domains?",
  "options": [
   "STP",
   "VTP",
   "VLAN",
   "CSMA/CD"
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 [Removed] 3 months ago\nSelected Answer: C\n\nAnswer C is correct.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q282",
  "num": 282,
  "question": "Refer to the exhibit. Which action must be taken so that neighboring devices rapidly discover switch Cat9300?",
  "options": [
   "Enable portfast on the ports that connect to neighboring devices.",
   "Configure the cdp timer 10 command on switch Cat9300.",
   "Configure the cdp holdtime 10 command on switch Cat9300",
   "Configure the cdp timer 10 command on the neighbors of switch Cat9300"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 CHCHCHC Highly Voted \uf164 7 months, 4 weeks ago\nhello beautiful",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q283",
  "num": 283,
  "question": "What is a requirement when configuring or removing LAG on a WLC?",
  "options": [
   "The incoming and outgoing ports for traffic flow must be specified if LAG is enabled.",
   "The management interface must be reassigned if LAG is disabled",
   "The controller must be rebooted after enabling or reconfiguring LAG",
   "Multiple untagged interfaces on the same port must be supported"
  ],
  "correct": "B",
  "explanation": "C (88%)\n\n12%\n\n\uf147 \uf007 PiotrMar Highly Voted \uf164 1 year ago\nit seams like B and C might be right:\nB - When you disable LAG, you must assign an AP-manager interface to each port on the controller.\nC - When LAG is enabled, any change to the LAG configuration requires a controller reboot\nhttps://community.cisco.com/t5/wireless-mobility-knowledge-base/lag-link-aggregation/ta-p/3128669#toc-hId--766763784",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q285",
  "num": 285,
  "question": "Which type of port is used to connect the wired network when an autonomous AP maps two VLANs to its WLANs?",
  "options": [
   "access",
   "LAG",
   "trunk",
   "EtherChannel"
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 Da_Costa 3 weeks, 1 day ago\nSelected Answer: C\n\nThe autonomous AP must be connected in trunk mode in order to carry multiple VLANs,",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q286",
  "num": 286,
  "question": "A network administrator needs to aggregate 4 ports into a single logical link which must negotiate layer 2 connectivity to ports on another switch.\nWhat must be configured when using active mode on both sides of the connection?",
  "options": [
   "LLDP",
   "LACP",
   "Cisco vPC",
   "802 1q trunks"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 country_rooted 5 months, 2 weeks ago\nLACP-Active, Passive (Industry standard)\nPAgP -Desirable, Auto (Cisco Proprietary)",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q287",
  "num": 287,
  "question": "Refer to the exhibit. An engineer built a new L2 LACP EtherChannel between SW1 and SW2 and executed these show commands to verify the work\nestablish an\nLACP port channel?",
  "options": [
   "Change the channel-group mode on SW1 to desirable",
   "Change the channel-group mode on SW1 to active or passive",
   "Change the channel-group mode on SW2 to auto",
   "Configure the interface port-channel 1 command on both swtiches"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 RougePotatoe Highly Voted \uf164 10 months, 2 weeks ago\nI'm literally spending more time trying to figure out what the question is asking rather than figuring out the answer...",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q288",
  "num": 288,
  "question": "Refer to the exhibit. For security reasons, automatic neighbor discovery must be disabled on the R5 Gi0/1 interface. These tasks must be\ncompleted:\n\u2711 Disable all neighbor discovery methods on R5 interface Gi0/1\n\u2711 Permit neighbor discovery on R5 interface Gi0/2.\n\u2711 Verify there are no dynamically learned neighbors on R5 interface Gi0/1.\n\u2711 Display the IP address of R6's interface Gi0/2\nWhich configuration must be used?",
  "options": [
   "R5(config)#int Gi0/1 R5(config-if)#no cdp enable R5(config-if)#exit R5(config)#lldp run R5(config)#no cdp run R5#sh cdp neighbor detail\nR5#sh lldp neighbor",
   "R5(config)#int Gi0/1 R5(config-if)#no cdp enable R5(config-if)#exit R5(config)#no lldp run R5(config)#cdp run R5#sh cdp neighbor R5#sh\nlldp neighbor",
   "R5(config)#int Gi0/1 R5(config-if)#no cdp run R5(config-if)#exit R5(config)#lldp run R5(config)#cdp enable R5#sh cdp neighbor R5#sh lldp\nneighbor",
   "R5(config)#int Gi0/1 R5(config-if)#no cdp enable R5(config-if)#exit R5(config)#no lldp run R5(config)#cdp run R5#sh cdp neighbor detail\nR5#sh lldp neighbor"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 dropspablo Highly Voted \uf164 4 months, 1 week ago\nSelected Answer: D\n\nD. R5(config)#int Gi0/1 R5(config-if)#no cdp enable R5(config-if)#exit R5(config)#no lldp run R5(config)#cdp run R5#sh cdp neighbor detail R5#sh\nlldp neighbor\n- Disable all neighbor discovery methods on R5 interface Gi0/1\n(config-if)#no cdp enable / (config)#no lldp run\n- Permit neighbor discovery on R5 interface Gi0/2.\n(config)#cdp run\n- Verify there are no dynamically learned neighbors on R5 interface Gi0/1.\n#sh lldp neighbor (just to confirm LLDP discovery has been disabled)\n- Display the IP address of R6's interface Gi0/2\n#sh cdp neighbor detail (\"detail\" shows information such as IP address)",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q289",
  "num": 289,
  "question": "Which two spanning-tree states are bypassed on an interface running PortFast? (Choose two.)",
  "options": [
   "disabled",
   "listening",
   "learning",
   "blocking",
   "forwarding"
  ],
  "correct": "BC",
  "explanation": "\uf147 \uf007 SVN05 Highly Voted \uf164 7 months, 1 week ago\nPortFast is a Spanning-Tree Protocol feature used to speed up convergence time on ports which are connected to a workstation by causing a port\nto enter the forwarding state instantly, bypassing the listening and learning state.\nRef:-https://www.skillset.com/questions/which-stp-feature-is-used-to-speed-up-convergence-time-on-ports-which-are-connected-to-aworkstation#:~:text=PortFast%20is%20a%20Spanning%2DTree,the%20listening%20and%20learning%20state.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q291",
  "num": 291,
  "question": "An engineer is configuring data and voice services to pass through the same port. The designated switch interface fastethernet0/1 must transmit\npackets using the same priority for data when they are received from the access port of the IP phone. Which configuration must be used?",
  "options": [
   "interface fastethernet0/1 switchport voice vlan dot1p",
   "interface fastethernet0/1 switchport priority extend cos 7",
   "interface fastethernet0/1 switchport voice vlan untagged",
   "interface fastethernet0/1 switchport priority extend trust"
  ],
  "correct": "D",
  "explanation": "D (67%)\n\nB (33%)\n\n\uf147 \uf007 Mahfuj_01 Highly Voted \uf164 9 months, 3 weeks ago\nI think answer is correct.\nSet the priority of data traffic received from the Cisco IP Phone access port:\n\u2022cos value\u2014Configure the \"phone\" to override the priority received from the \"PC or the attached device\" with the specified CoS value. The value is\na number from 0 to 7, with 7 as the highest priority. The default priority is cos 0.\nSo, If we set the value 7 here it means, port will prioritize the voice traffic over data traffic.\n\u2022trust\u2014Configure the phone access port to trust the priority received from the \"PC or the attached device\".\nWhen traffic from pc is trusted, it will consider both voice and data traffic as same priority. (Since voice traffic is prioritised over data traffic by\ndefault.)",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q292",
  "num": 292,
  "question": "Refer to the exhibit. Which change to the configuration on Switch2 allows the two switches to establish an EtherChannel?",
  "options": [
   "Change the LACP mode to desirable",
   "Change the protocol to PAgP and use auto mode",
   "Change the LACP mode to active",
   "Change the protocol to EtherChannel mode on"
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 Nikisan 1 month, 1 week ago\nSelected Answer: C\n\nLACP:Active + Active = Ether Channel\nActive + Passive = Ether Channel\nPassive + Active = Ether Channel\nPassive + Passive = No",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q293",
  "num": 293,
  "question": "Refer to the exhibit. An engineer must configure the interface that connects to PC1 and secure it in a way that only PC1 is allowed to use the port.\nNo VLAN tagging can be used except for a voice VLAN. Which command sequence must be entered to configure the switch?",
  "options": [
   "SW1(config-if)#switchport mode dynamic auto SW1(config-if)#switchport port-security SW1(config-if)#switchport port-security violation\nrestrict",
   "SW1(config-if)#switchport mode nonegotiate SW1(config-if)#switchport port-security SW1(config-if)#switchport port-security maximum 1",
   "SW1(config-if)#switchport mode access SW1(config-if)#switchport port-security SW1(config-if)#switchport port-security mac-address\n0050.7966.6800",
   "SW1(config-if)#switchport mode dynamic desirable SW1(config-if)#switchport port-security mac-address 0050.7966.6800 SW1(configif)#switchport port-security mac-address sticky"
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 everchosen13 Highly Voted \uf164 11 months, 3 weeks ago\nGiven answer is correct.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q294",
  "num": 294,
  "question": "Which protocol must be implemented to support separate authorization and authentication solutions for wireless APs?",
  "options": [
   "RADIUS",
   "TACACS+",
   "802.1X",
   "Kerberos"
  ],
  "correct": "A",
  "explanation": "B (98%)\n\n\uf147 \uf007 Ronild Highly Voted \uf164 1 year ago\nSelected Answer: B\n\nCorrect: B\nAuthentication and Authorization\nRADIUS combines authentication and authorization. The access-accept packets sent by the RADIUS server to the client contain authorization\ninformation. This makes it difficult to decouple authentication and authorization.\nTACACS+ uses the AAA architecture, which separates AAA. This allows separate authentication solutions that can still use TACACS+ for\nauthorization and accounting. For example, with TACACS+, it is possible to use Kerberos authentication and TACACS+ authorization and\naccounting. After a NAS authenticates on a Kerberos server, it requests authorization information from a TACACS+ server without having to reauthenticate. The NAS informs the TACACS+ server that it has successfully authenticated on a Kerberos server, and the server then provides\nauthorization information.\nSource: https://www.cisco.com/c/en/us/support/docs/security-vpn/remote-authentication-dial-user-service-radius/13838-10.html",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q295",
  "num": 295,
  "question": "Which port type supports the spanning-tree portfast command without additional configuration?",
  "options": [
   "trunk ports",
   "Layer 3 sub interfaces",
   "Layer 3 main interfaces",
   "access ports"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 hasbulla01 Highly Voted \uf164 10 months, 1 week ago\nonly access port should portfast",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q296",
  "num": 296,
  "question": "Refer to the exhibit. What are two conclusions about this configuration? (Choose two.)",
  "options": [
   "The spanning-tree mode is Rapid PVST+",
   "This tea root bridge",
   "The spanning-tree mode is PVST+",
   "The designated port is FastEthernet 2/1",
   "The root port is FastEthernet 2/1"
  ],
  "correct": "AE",
  "explanation": "AE (100%)\n\n\uf147 \uf007 marle77 1 week, 2 days ago\nThere is no root cost 19 in RAPID PVST+ so it must be C & E",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q297",
  "num": 297,
  "question": "A Cisco engineer must configure a single switch interface to meet these requirements:\n\u2711 Accept untagged frames and place them in VLAN 20\nAccept tagged frames in VLAN 30 when CDP detects a Cisco IP phone\nWhich command set must the engineer apply?",
  "options": [
   "switchport mode dynamic desirable switchport access vlan 20 switchport trunk allowed vlan 30 switchport voice vlan 30",
   "switchport mode access switchport access vlan 20 switchport voice vlan 30",
   "switchport mode dynamic auto switchport trunk native vlan 20 switchport trunk allowed vlan 30 switchport voice vlan 30",
   "switchport mode trunk switchport access vlan 20 switchport voice vlan 30"
  ],
  "correct": "D",
  "explanation": "B (85%)\n\nOther\n\n\uf147 \uf007 foreach Highly Voted \uf164 1 year ago\nSelected Answer: B\n\nB should be the answer.\nWith D, the interface operates in trunk mode. So the access configuration is not taken into account and the vlan 20 will be tagged.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q298",
  "num": 298,
  "question": "What does a switch use to build its MAC address table?",
  "options": [
   "VTP",
   "DTP",
   "ingress traffic",
   "egress traffic"
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 shumps 1 month, 1 week ago\ningress traffic simply means incoming traffic",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q299",
  "num": 299,
  "question": "Refer to the exhibit. The EtherChannel is configured with a speed of 1000 and duplex as full on both ends of channel group 1. What is the next step\nto configure the channel on switch A to respond to but not initiate LACP communication?",
  "options": [
   "interface range gigabitethernet0/0/0-15 channel-group 1 mode on",
   "interface range gigabitethernet0/0/0-15 channel-group 1 mode desirable",
   "interface port-channel 1 channel-group 1 mode auto",
   "interface port-channel 1 channel-group 1 mode passive"
  ],
  "correct": "D",
  "explanation": "D (72%)\n\nA (28%)\n\n\uf147 \uf007 laurvy36 Highly Voted \uf164 7 months, 1 week ago\nSelected Answer: D\n\nMode Passive:\nThe mode places a port into a passive negotiating state, in which the port RESPONDS to LACP packets that it receives, but DOES NOT initiate\nprotocol negotiation.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q300",
  "num": 300,
  "question": "Which command entered on a switch configured with Rapid PVST+ listens and learns for a specific time period?",
  "options": [
   "switch(config)#spanning-tree vlan 1 priority 4096",
   "switch(config)#spanning-tree vlan 1 hello-time 10",
   "switch(config)#spanning-tree vlan 1 max-age 6",
   "switch(config)#spanning-tree vlan 1 forward-time 20"
  ],
  "correct": "D",
  "explanation": "D (83%)\n\nC (17%)\n\n\uf147 \uf007 foreach Highly Voted \uf164 1 year ago\nStrange question... In Rapid-PVST+, there's no listening state anymore",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q301",
  "num": 301,
  "question": "What must a network administrator consider when deciding whether to configure a new wireless network with APs in autonomous mode or APs\nrunning in cloud- based mode?",
  "options": [
   "Autonomous mode APs are less dependent on an underlay but more complex to maintain than APs in cloud-based mode.",
   "Cloud-based mode APs relay on underlays and are more complex to maintain than APs in autonomous mode.",
   "Cloud-based mode APs are easy to deploy but harder to automate than APs in autonomous mode.",
   "Autonomous mode APs are easy to deploy and automate than APs in cloud-based mode."
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 freeknowledge123 Highly Voted \uf164 8 months, 1 week ago\ntypical voodo question of cisco: autonomous AP require a network infrastructure (underlay) to function, but not to the same degree as AP since\nthey don't use CAPWAP, they don't rely on central controller and require more knowledge to maintain (complexity).\nthe other answer don't seem that incorrect to me, but option A is the more correct.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q302",
  "num": 302,
  "question": "When a switch receives a frame for an unknown destination MAC address, how is the frame handled?",
  "options": [
   "flooded to all ports except the origination port",
   "forwarded to the first available port",
   "broadcast to all ports on the switch",
   "inspected and dropped by the switch"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 freeknowledge123 8 months, 1 week ago\neasy question, switch forwards frame when the dest is unknown to all other ports.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q303",
  "num": 303,
  "question": "Which state is bypassed in Rapid PVST+ when PortFast is enabled on a port?",
  "options": [
   "blocking",
   "forwarding",
   "learning",
   "discarding"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 _mva 1 month, 3 weeks ago\nThere is no listening in RSTP. The port moves directly to forwarding by bypassing learning.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q304",
  "num": 304,
  "question": "What happens when a switch receives a frame with a destination MAC address that recently aged out?",
  "options": [
   "The switch floods the frame to all ports in all VLANs except the port that received the frame.",
   "The switch floods the frame to all ports in the VLAN except the port that received the frame.",
   "The switch references the MAC address aging table for historical addresses on the port that received the frame.",
   "The switch drops the frame and learns the destination MAC address again from the port that received the frame."
  ],
  "correct": "B",
  "explanation": "B (73%)\n\nA (27%)\n\n\uf147 \uf007 DoBronx Highly Voted \uf164 10 months, 3 weeks ago\nquestion is trying to trick you. It's still asking about an unknown destination MAC address essentially. Answer given is correct",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q305",
  "num": 305,
  "question": "What is a function of store-and forward switching?",
  "options": [
   "It reduces latency by eliminating error checking within the frame",
   "It produces an effective level of error-free network traffic using CRCs.",
   "It buffers frames and forwards regardless of errors within the frames.",
   "It forwards a frame by checking only the destination MAC address"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 freeknowledge123 Highly Voted \uf164 8 months, 1 week ago\nstore and forward: checks the whole frame\nframent free mode: checks the first 64 byte (no crc)\ncut through: checks only the destination",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q306",
  "num": 306,
  "question": "Refer to the exhibit. Switch AccSw1 has just been added to the network along with PC2. All VLANs have been implemented on AccSw2. How must\nthe ports on\nAccSw2 be configured to establish Layer 2 connectivity between PC1 and PC2?",
  "options": [
   "interface GigabitEthernet1/2 switchport mode access switchport access vlan 2 ! interface GigabitEthernet1/24 switchport mode trunk",
   "interface GigabitEthernet1/1 switchport mode access switchport access vlan 11 ! interface GigabitEthernet1/24 switchport mode trunk",
   "interface GigabitEthernet1/24 switchport mode trunk switchport trunk allowed vlan 11, 12 ! interface GigabitEthernet1/1 switchport access\nvlan 11",
   "interface GigabitEthernet1/2 switchport mode access switchport access vlan 12 ! interface GigabitEthernet1/24 switchport mode trunk\nswitchport trunk allowed vlan 11, 12"
  ],
  "correct": "B",
  "explanation": "B (91%)\n\n9%\n\n\uf147 \uf007 Etidic Highly Voted \uf164 10 months, 4 weeks ago\nSelected Answer: B\n\nI imagine that the confusion is the \"switchport trunk allowed VLAN 11, 12\" command in option C.\nPlease note that this just a distraction.\nAs you may have learnt already when you apply the \"switchport mode trunk\" on an interface it allows all VLANs by default. So by using this\ncommand in option B all VLANs 1 - 4094 are allowed over the trunk.\nFor security reasons, during our network design we tend to remove all vlans and only allow the vlans we desire.\nIf we apply the command in option C \"switchport trunk allowed VLAN 11, 12\" it would delete all vlans and only allow VLANs 11 and 12. This means\nthat all other devices or departments who are dependent on this trunk will be cut-off.\nOne of the biggest blunders sometimes made by beginners is to delete an entire VLAN by overwriting it. Always remember to use the \"add\"\ncommand when adding new VLANs to a trunk already configured for other VLANs.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q307",
  "num": 307,
  "question": "Refer to the exhibit. A network engineer must update the configuration on Switch2 so that it sends LLDP packets every minute and the information\nsent via LLDP is refreshed every 3 minutes. Which configuration must the engineer apply?",
  "options": [
   "Switch2(config)#lldp timer 60 Switch2(config)#lldp tlv-select 180",
   "Switch2(config)#lldp timer 60 Switch2(config)#lldp holdtime 180",
   "Switch2(config)#lldp timer 1 Switch2(config)#lldp holdtime 3",
   "Switch2(config)#lldp timer 1 Switch2(config)#lldp tlv-select 3"
  ],
  "correct": "B",
  "explanation": "Reference:\nhttps://www.cisco.com/c/en/us/td/docs/switches/datacenter/nexus9000/sw/6-x/system_management/configuration/guide/\nb_Cisco_Nexus_9000_Series_NX-OS_System_Management_Configuration_Guide/sm_lldp.pdf\n\n\uf147 \uf007 Vyncy Highly Voted \uf164 3 months, 2 weeks ago\nhello beautiful",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q308",
  "num": 308,
  "question": "Refer to the exhibit. Switch A is newly configured. All VLANs are present in the VLAN database. The IP phone and PC A on Gi0/1 must be\nconfigured for the appropriate VLANs to establish connectivity between the PCs. Which command set fulfills the requirement?",
  "options": [
   "SwitchA(config-if)#switchport mode access SwitchA(config-if)#switchport access vlan 50 SwitchA(config-if)#switchport voice vlan 51",
   "SwitchA(config-if)#switchport mode trunk SwitchA(config-if)#switchport trunk allowed vlan add 50, 51 SwitchA(config-if)#switchport voice\nvlan dot1p",
   "SwitchA(config-if)#switchport mode trunk SwitchA(config-if)#switchport trunk allowed vlan 50, 51 SwitchA(config-if)#mis qos trust cos",
   "SwitchA(config-if)#switchport mode access SwitchA(config-if)#switchport access vlan 50 SwitchA(config-if)#switchport voice vlan\nuntagged"
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 Goh0503 Highly Voted \uf164 12 months ago\nAnswer A\nhttps://networklessons.com/cisco/ccna-routing-switching-icnd1-100-105/voice-vla\nFirst, we have to create the two VLANs:\nSW1(config)#vlan 100\nSW1(config-vlan)#name COMPUTER\nSW1(config-vlan)#exit\nSW1(config)#vlan 101\nSW1(config-vlan)#name VOIP\nSW1(config-vlan)#exit\nNow we can configure the interface:\nSW1(config)#interface GigabitEthernet 0/1\nSW1(config-if)#switchport mode access\nSW1(config-if)#switchport access vlan 100\nSW1(config-if)#switchport voice vlan 101\nSW1(config-if)#exit\nWe configure the interface in access mode and use VLAN 100 for the computer. The switchport voice vlan command tells the switch to use VLAN\n101 as the voice VLAN.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q309",
  "num": 309,
  "question": "Refer to the exhibit. Two new switches are being installed. The remote monitoring team uses the support network to monitor both switches. Which\nconfiguration is the next step to establish a Layer 2 connection between the two PCs?",
  "options": [
   "SwitchA(config)#interface GigabitEthernet0/1 SwitchA(config-if)#switchport access vlan 500 SwitchB(config)#interface\nGigabitEthernet0/1 SwitchB(config-if)#switchport access vlan 500",
   "SwitchA(config)#interface GigabitEthernet0/1 SwitchA(config-if)#switchport mode trunk SwitchB(config)#interface GigabitEthernet0/1\nSwitchB(config-if)#switchport mode trunk",
   "SwitchA(config)#interface GigabitEthernet0/0 SwitchA(config-if)#switchport trunk allowed vlan 500, 550 SwitchB(config)#interface\nGigabitEthernet0/0 SwitchB(config-if)#switchport trunk allowed vlan 500, 550",
   "SwitchA(config)#interface GigabitEthernet0/0 SwitchA(config-if)#spanning-tree portfast SwitchA(config-if)#spanning-tree bpduguard\nenable SwitchB(config)#interface GigabitEthernet0/0 SwitchB(config-if)#spanning-tree portfast SwitchB(config-if)#spanning-tree bpduguard\nenable"
  ],
  "correct": "A",
  "explanation": "A (75%)\n\nC (25%)\n\n\uf147 \uf007 xbololi 2 months, 3 weeks ago\nyou never want a sales personel get access to support/manager vlan trust me :)",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q310",
  "num": 310,
  "question": "Refer to the exhibit. An engineer is configuring a new Cisco switch, NewSW, to replace SW2. The details have been provided:\n\u2711 Switches SW1 and SW2 are third-party devices without support for trunk ports.\n\u2711 The existing connections must be maintained between PC1, PC2, and PC3.\n\u2711 Allow the switch to pass traffic from future VLAN 10.\nWhich configuration must be applied?",
  "options": [
   "NewSW(config)#interface f0/0 NewSW(config-if)#switchport mode trunk NewSW(config-if)#switchport trunk native vlan 10 NewSW(configif)#switchport trunk native vlan 10",
   "NewSW(config)#interface f0/0 NewSW(config-if)#switchport mode access NewSW(config-if)#switchport trunk allowed vlan 2, 10\nNewSW(config-if)#switchport trunk native vlan 2",
   "NewSW(config)#interface f0/0 NewSW(config-if)#switchport mode access NewSW(config-if)#switchport trunk allowed vlan 2, 10\nNewSW(config-if)#switchport trunk native vlan 10",
   "NewSW(config)#interface f0/0 NewSW(config-if)#switchport mode trunk NewSW(config-if)#switchport trunk allowed vlan 2, 10\nNewSW(config-if)#switchport trunk native vlan 2"
  ],
  "correct": "D",
  "explanation": "D (70%)\n\nB (30%)\n\n\uf147 \uf007 DoBronx Highly Voted \uf164 10 months, 3 weeks ago\nwhat is this garbage question",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q311",
  "num": 311,
  "question": "Which WLC interface provides out-of-band management in the Cisco Unified Wireless Network Architecture?",
  "options": [
   "AP-Manager",
   "service port",
   "dynamic",
   "virtual"
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 mrgreat Highly Voted \uf164 1 year ago\nSelected Answer: B\n\nThe service port is used for out-of-band management of the controller and system recovery and maintenance in the event of a network failure. It is\nimportant to note that the service port does not support VLAN trunking or VLAN tagging and is therefore required to connect to an access port on\nthe switch.\nIt is also recommended not to connect the service port to the same VLAN as the wired clients network because by doing so, administrators will not\nbe able to access the management interface (analysed later) of the controller.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q312",
  "num": 312,
  "question": "Refer to the exhibit. The network engineer is configuring a new WLAN and is told to use a setup password for authentication instead of the RADIUS\nservers.\nWhich additional set of tasks must the engineer perform to complete the configuration?",
  "options": [
   "Disable PMF Enable PSK Enable 802.1x",
   "Select WPA Policy Enable CCKM Enable PSK",
   "Select WPA Policy Select WPA2 Policy Enable FT PSK",
   "Select WPA2 Policy Disable PMF Enable PSK"
  ],
  "correct": "D",
  "explanation": "D (62%)\n\nB (27%)\n\n12%\n\n\uf147 \uf007 Ciscoman021 Highly Voted \uf164 5 months, 1 week ago\nSelected Answer: D\n\nThe correct option for this scenario would be D. Select WPA2 Policy Disable PMF Enable PSK.\nWhen configuring a WLAN to use a setup password for authentication instead of RADIUS servers, the following tasks must be performed:\nSelect WPA2 Policy: The engineer should select WPA2 (Wi-Fi Protected Access II) as the security policy for the WLAN. WPA2 is a widely used\nsecurity protocol that provides strong encryption and authentication for wireless networks.\nDisable PMF: PMF (Protected Management Frames) is a security feature that helps protect against certain types of attacks on wireless networks.\nHowever, it may cause compatibility issues with some client devices. Therefore, it should be disabled when using a setup password for\nauthentication.\nEnable PSK: PSK (Pre-Shared Key) is a form of authentication that uses a shared password or passphrase to authenticate clients on the wireless\nnetwork. When using a setup password for authentication, the engineer should enable PSK and set the shared password or passphrase.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q313",
  "num": 313,
  "question": "Which mode must be set for Aps to communicate to a Wireless LAN Controller using the Control and Provisioning of Wireless Access Points\n(CAPWAP) protocol?",
  "options": [
   "route",
   "bridge",
   "lightweight",
   "autonomous"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 freeknowledge123 8 months, 1 week ago\nlightweight=local mode",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q314",
  "num": 314,
  "question": "Which switch technology establishes a network connection immediately when it is plugged in?",
  "options": [
   "PortFast",
   "BPDU guard",
   "UplinkFast",
   "BackboneFast"
  ],
  "correct": "A",
  "explanation": "A (83%)\n\nC (17%)\n\n\uf147 \uf007 shumps 4 weeks ago\nplease take not that uplink and backbone fast is used in case of interface failure and the quickly kick in RSTP. Portfast being the correct answer\nallows you to jump listening and learning states which take about 30mins combined to process and place the port in forwarding state immediately\nwhich is a stable state.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q315",
  "num": 315,
  "question": "Which command on a port enters the forwarding state immediately when a PC is connected to it?",
  "options": [
   "switch(config)#spanning-tree portfast default",
   "switch(config)#spanning-tree portfast bpduguard default",
   "switch(config-if)#spanning-tree portfast trunk",
   "switch(config-if)#no spanning-tree portfast"
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 Customexit Highly Voted \uf164 10 months, 3 weeks ago\nSelected Answer: A\n\nint g0/2 spanning-tree portfast.\nYou can also enable portfast with the following command:\nSW1(config)# spanning-tree portfast default\n(this enables portfast on all access ports (not trunk ports).",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q316",
  "num": 316,
  "question": "If a switch port receives a new frame while it is actively transmitting a previous frame, how does it process the frames?",
  "options": [
   "The new frame is delivered first, the previous frame is dropped, and a retransmission request is sent",
   "The previous frame is delivered, the new frame is dropped, and a retransmission request is sent",
   "The new frame is placed in a queue for transmission after the previous frame",
   "The two frames are processed and delivered at the same time"
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 Iamm 2 months ago\nis this question about duplex operation, while receiving | transmitting ... will not both be processed ... or if it is half-duplex, could be more suitable\nscenario to consider both tx/rx as one.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q317",
  "num": 317,
  "question": "Refer to the exhibit. The entire MAC address table for SW1 is shown here:\n\nWhat does SW1 do when Br-4 sends a frame for Br-2",
  "options": [
   "It performs a lookup in the MAC address table for Br-4 and discards toe frame due to a missing entry.",
   "It floods the frame out or all ports except on the port where Br-2 is connected.",
   "It Inserts the source MAC address and port into the forwarding table and forwards the frame to Br-2.",
   "It maps the Layer 2 MAC address for Fa0/3 to the Layer 3 IP address and towards the frame."
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\f\uf147 \uf007 Sdiego Highly Voted \uf164 7 months, 4 weeks ago\nTricky! Exchanging interfaces IDs with Branch numbers, b careful!",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q318",
  "num": 318,
  "question": "Which statement about Link Aggregation when implemented on a Cisco Wireless LAN Controller is true?",
  "options": [
   "To pass client traffic two or more ports must be configured",
   "The EtherChannel must be configured in \u202b\u05d2\u202c\u20acmode active\u202b\u05d2\u202c\u20ac",
   "When enabled, the WLC bandwidth drops to 500 Mbps",
   "One functional physical port is needed to pass client traffic"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 [Removed] 3 months ago\nSelected Answer: D\n\nAnswer D is correct",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q319",
  "num": 319,
  "question": "Refer to the exhibit. An engineer is configuring an EtherChannel using LACP between Switches 1 and 2.\nWhich configuration must be applied so that only Switch 1 sends LACP initiation packets?",
  "options": [
   "B.",
   "C.",
   "D.",
   ""
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 country_rooted 5 months, 2 weeks ago\nCorrect",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q320",
  "num": 320,
  "question": "Refer to the exhibit. The entire Marketing-SW1 MAC address table is shown here:\nWhat does the switch do when PC-4 sends a frame to PC-1?",
  "options": [
   "It performs a lookup in the MAC address table and discards the frame due to a missing entry.",
   "It maps the Layer 2 MAC address to the Layer 3 IP address and forwards the frame.",
   "It inserts the source MAC address and port into the table and forwards the frame to PC-1.",
   "It floods the frame out of all ports except on the port where PC-1 is connected."
  ],
  "correct": "C",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q321",
  "num": 321,
  "question": "Refer to the exhibit. All VLANs are present in the VLAN database. Which command sequence must be applied to complete the configuration?",
  "options": [
   "B.",
   "C.",
   "D.",
   ""
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 GigaGremlin Highly Voted \uf164 11 months, 1 week ago\nAnswer A is fine.\nConfig would usually look like this:\nSwitch(config)#interface FastEthernet0/1\nSwitch(config-if)#switchport mode access\nSwitch(config-if)#switchport voice vlan 10\nSwitch(config-if)#switchport access vlan 15",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q322",
  "num": 322,
  "question": "Refer to the exhibit. Which switch becomes the root of a spanning tree for VLAN 10 if the primary switch fails and all links are of equal speed?",
  "options": [
   "SW1",
   "SW2",
   "SW3",
   "SW4"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 dannyode Highly Voted \uf164 11 months, 1 week ago\nSelected Answer: C\n\nSwitch 2 is primary. But in this context, that is to say when it fails, the primary is chosen between SW1, SW3 and SW4. Thus, SW3 becomes the root.\nAnswer C is correct.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q323",
  "num": 323,
  "question": "Refer to the exhibit. Host A sent a data frame destined for host D.\n\nWhat does the switch do when it receives the frame from host A?",
  "options": [
   "It floods the frame out of all ports except port Fa0/1",
   "It experiences a broadcast storm",
   "It shuts down the port Fa0/1 and places it in err-disable mode",
   "It drops the frame from the switch CAM table"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 holyshitbin 3 months ago\nThis is the definition of flooding.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q324",
  "num": 324,
  "question": "Refer to the exhibit. Which switch becomes the root of the spanning tree?",
  "options": [
   "Switch 1",
   "Switch 2",
   "Switch 3",
   "Switch 4"
  ],
  "correct": "B",
  "explanation": "The root bridge is the bridge with the lowest Bridge ID. All the decisions like which ports are the root ports (the port with the best path to the\nroot bridge) are made from the perspective of the root bridge. In case of a tie (not the case in this example) then the root bridge will be the\nswitch with the lowest MAC address.\n\n\uf147 \uf007 Shanku97 2 weeks, 6 days ago\ncan someone share me the steps of root port, forwarding port/designated port ?",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q325",
  "num": 325,
  "question": "Which channel-group mode must be configured when multiple distribution interfaces connected to a WLC are bundled?",
  "options": [
   "Channel-group mode passive.",
   "Channel-group mode on.",
   "Channel-group mode desirable.",
   "Channel-group mode active."
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 creaguy 11 months, 3 weeks ago\nSelected Answer: B\n\nB is correct\nhttps://www.firewall.cx/cisco-technical-knowledgebase/cisco-wireless/1223-how-to-configure-wlc-lag-and-port-channel-with-nexus-catalystswitches.html#:~:text=switchport%20mode%20trunk-,channel%2Dgroup%201%20mode%20on,-!%0Ainterface%20GigabitEthernet0",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q326",
  "num": 326,
  "question": "Refer to the exhibit. Which switch become the root of a spanning tree for VLAN 20 if all links are of equal speed?",
  "options": [
   "SW1",
   "SW2",
   "SW3",
   "SW4"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 shiv3003 5 months ago\nwhy not c??",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q327",
  "num": 327,
  "question": "Which Layer 2 switch function encapsulates packets for different VLANs so that the packets transverse the same port and maintain traffic\nseparation between the\nVLANs?",
  "options": [
   "VLAN marking",
   "VLAN numbering",
   "VLAN DSCP",
   "VLAN tagging"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Customexit Highly Voted \uf164 10 months, 3 weeks ago\nSelected Answer: D\n\np.s. \"marking\" is for QoS stuff.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q328",
  "num": 328,
  "question": "Which value is the unique identifier that an access point uses to establish and maintain wireless connectivity to wireless network devices?",
  "options": [
   "VLAN ID",
   "SSID",
   "RFID",
   "WLAN ID"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 Kaveras 1 month ago\nSelected Answer: B\n\nB for sure",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q329",
  "num": 329,
  "question": "An engineer must configure neighbor discovery between the company router and an ISP.\n\nWhat is the next step to complete the configuration if the ISP uses a third-party router?",
  "options": [
   "Enable LLDP globally.",
   "Disable CDP on gi0/0.",
   "Enable LLDP TLVs on the ISP router.",
   "Disable auto-negotiation."
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Paul1111 4 weeks ago\nAnswer is A\nTested on packet tracer\nint g0/0\nduplex full\nspeed 1000\nlldp transmit\nlldp receive\ndo show lldp neighbors\n#LLDP is not enabled\nlldp run\ndo show lldp neighbors - shows devices",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q331",
  "num": 331,
  "question": "What is a function of MAC learning on a switch?",
  "options": [
   "MAC address learning is disabled by default on all VLANs.",
   "Frames received for a destination MAC address not listed in the address table are dropped.",
   "The MAC address table is used to populate the ARP table.",
   "A static MAC address is manually added to the MAC table."
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 HennieB Highly Voted \uf164 11 months ago\nSelected Answer: C\n\nThe question specifically says LEARNING. A Static MAC is not learned",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q332",
  "num": 332,
  "question": "What does a switch do when it receives a frame whose destination MAC address is missing from the MAC address table?",
  "options": [
   "It changes the checksum of the frame to a value that indicates an invalid frame.",
   "It updates the CAM table with the destination MAC address of the frame.",
   "It appends the table with a static entry for the MAC and shuts down the port.",
   "It floods the frame unchanged across all remaining ports in the incoming VLAN."
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 MikD4016 Highly Voted \uf164 11 months, 3 weeks ago\nIf the address is in the table, the frame is forwarded out the port associated with the MAC address in the table. When the DESTINATION MAC\naddress is not found in the MAC address table, the switch forwards the frame out of all ports (flooding) except for the ingress port of the frame",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q333",
  "num": 333,
  "question": "By default, how long will the switch continue to know a workstation MAC address after the workstation stops sending traffic?",
  "options": [
   "200 seconds",
   "300 seconds",
   "600 seconds",
   "900 seconds"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 [Removed] 3 months ago\nSelected Answer: B\n\nGiven answer is correct - B",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q334",
  "num": 334,
  "question": "A project objective is to minimize the association time to the different access points as mobile devices move around the office. The ideal solution\nmust cover numerous devices and device types, including laptops, mobile phones, tablets and wireless printers. What must be configured?",
  "options": [
   "802.11v BSS Max Idle Service",
   "802.11v Disassociation Imminent",
   "802.11ax BSS configure",
   "802.11k neighbor List Dual Band"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 splashy Highly Voted \uf164 1 year ago\nSelected Answer: B\n\nI probably did... but i do not remember seeing this in the ccna course at all\n802.11v\nBasic Service Set (BSS) transition management - BSS transition management with Disassociation Imminent allows the network\u2019s control layer to\ninfluence client roaming behavior by providing it the load information of nearby access points. The device takes this information into account when\ndeciding among the possible roam targets.\nDirected Multicast Service (DMS) - DMS optimizes multicast traffic transmission on wireless networks. The device uses this information to enhance\nmulticast communication and preserve device battery life.\nBSS Max Idle Service - The BSS Max Idle Service helps clients and access points efficiently decide how long to remain associated when no traffic is\nbeing transmitted. The device uses this information to preserve device battery life.\nDisassociation Imminent - The Disassociation Imminent option sets a flag in 11v request telling the client that it needs to roam, or it will be\ndisassociated after a certain amount of time.\nhttps://support.accessagility.com/hc/802.11k-802.11r-and-802.11v",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q335",
  "num": 335,
  "question": "Which two protocols are used by an administrator for authentication and configuration on access points? (Choose two.)",
  "options": [
   "802.1Q",
   "RADIUS",
   "Kerberos",
   "TACACS+",
   "802.1x"
  ],
  "correct": "BD",
  "explanation": "\uf147 \uf007 Yunus_Empire Highly Voted \uf164 9 months, 2 weeks ago\nEveryone Who Like My Comment Will Get 95%+ on CCNA Exam..Inshallah",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q337",
  "num": 337,
  "question": "A WLC sends alarms about a rogue AP, and the network administrator verifies that the alarms are caused by a legitimate autonomous AP. How\nmust the alarms be stopped for the MAC address of the AP?",
  "options": [
   "Remove the AP from WLC management",
   "Place the AP into manual containment.",
   "Manually remove the AP from Pending state.",
   "Set the AP Class Type to Friendly."
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 splashy Highly Voted \uf164 12 months ago\nKeyword is \"legitimate autonomous AP\"\nAnswer is D\nI think option B will kick the clients, which you probably don't want\nhttps://www.cisco.com/c/en/us/support/docs/wireless/4400-series-wireless-lan-controllers/112045-handling-rogue-cuwn-00.html#anc23\nhttps://www.cisco.com/c/en/us/support/docs/wireless/4400-series-wireless-lan-controllers/112045-handling-rogue-cuwn-00.html#anc34\nhttps://www.cisco.com/c/en/us/support/docs/wireless/4400-series-wireless-lan-controllers/112045-handling-rogue-cuwn-00.html#anc32\nAlso search for \"Valid client on Rogue AP\" in provided links",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q338",
  "num": 338,
  "question": "What is one reason to implement LAG on a Cisco WLC?",
  "options": [
   "to increase security and encrypt management frames",
   "to enable connected switch ports to failover and use different VLANs",
   "to provide link redundancy and load balancing",
   "to allow for stateful and link-state failover"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 [Removed] 3 months ago\nSelected Answer: C\n\nCorrect answer is C",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q339",
  "num": 339,
  "question": "When an access point is seeking to join wireless LAN controller, which message is sent to the AP-Manager interface?",
  "options": [
   "Discovery response",
   "DHCP request",
   "DHCP discover",
   "Discovery request"
  ],
  "correct": "C",
  "explanation": "The LAPs always connect to the management interface address of the controller first with a discovery request. The controller then tells the LAP\nthe Layer 3 AP- manager interface (which can also be the management by default) IP address so the LAP can send a join request to the APmanager interface next.\nReference:\nhttps://www.cisco.com/c/en/us/support/docs/wireless/5500-series-wireless-controllers/119286-lap-notjoin-wlc-tshoot.html\n\n\uf147 \uf007 perri88 3 months ago\nSelected Answer: D\n\nCan the answer be updated to D please?",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q340",
  "num": 340,
  "question": "Refer to the exhibit. A network engineer configures the Cisco WLC to authenticate local wireless clients against a RADIUS server. Which task must\nbe performed to complete the process?",
  "options": [
   "Change the Support for CoA to Enabled",
   "Select Enable next to Management",
   "Select Enable next to Network User",
   "Change the Server Status to Disabled"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 RougePotatoe Highly Voted \uf164 10 months, 3 weeks ago\nSelected Answer: C\n\nNetwork users is for authenticating the people connected to the wireless network.\nManagement is for authentication people who try to login to the WLC.\nhttps://mrncciew.com/2013/04/21/configuring-radius-on-wlc/",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q341",
  "num": 341,
  "question": "After installing a new Cisco ISE server which task must the engineer perform on the Cisco WLC to connect wireless clients on a specific VLAN\nbased on their credentials?",
  "options": [
   "Disable the LAG Mode on Next Reboot.",
   "Enable the Event Driven RRM.",
   "Enable the Allow AAA Override.",
   "Enable the Authorize MIC APs against auth-list or AAA"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 daddydagoth Highly Voted \uf164 6 months, 3 weeks ago\nIs this even on the CCNA?",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q342",
  "num": 342,
  "question": "Refer to the exhibit. Router R1 is running three different routing protocols. Which route characteristic is used by the router to forward the packet\nthat it receives for destination IP 172.16.32.1?",
  "options": [
   "longest prefix",
   "administrative distance",
   "cost",
   "metric"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 rlelliott Highly Voted \uf164 1 year, 6 months ago\nI saw a bunch, bunch, bunch of these on the CCNA. They were all pretty easy. Find the network that the IP fits in, look at the prefix length, if you\nhave 1 that is longer than the rest chhose that as answer. If there is more than 1 with the same longest prefix move over to AD and pick the lowest\nvalue. Once again if duplicate lowest move over to metric. Watch for the tricky non-default AD and DO NOT pick by code letter because they\nchange ADs on some of them.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q343",
  "num": 343,
  "question": "Refer to the exhibit. Router R1 Fa0/0 cannot ping router R3 Fa0/1. Which action must be taken in router R1 to help resolve the configuration issue?",
  "options": [
   "set the default gateway as 20.20.20.2",
   "configure a static route with Fa0/1 as the egress interface to reach the 20.20.2.0/24 network",
   "configure a static route with 10.10.10.2 as the next hop to reach the 20.20.20.0/24 network",
   "set the default network as 20.20.20.0/24"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 vadiminski Highly Voted \uf164 2 years, 4 months ago\nThe given answer is correct",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q344",
  "num": 344,
  "question": "By default, how does EIGRP determine the metric of a route for the routing table?",
  "options": [
   "It uses the bandwidth and delay values of the path to calculate the route metric.",
   "It uses a default metric of 10 for all routes that are learned by the router.",
   "It counts the number of hops between the receiving and destination routers and uses that value as the metric.",
   "It uses a reference bandwidth and the actual bandwidth of the connected link to calculate the route metric."
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Harryjio Highly Voted \uf164 3 years, 1 month ago\nA- EIGRP,\nC- RIP\nD-OSPF",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q345",
  "num": 345,
  "question": "Router R1 must send all traffic without a matching routing-table entry to 192.168.1.1. Which configuration accomplishes this task?",
  "options": [
   "R1#config t R1(config)#ip routing R1(config)#ip route default-route 192.168.1.1",
   "R1#config t R1(config)#ip routing R1(config)#ip route 192.168.1.1 0.0.0.0 0.0.0.0",
   "R1#config t R1(config)#ip routing R1(config)#ip route 0.0.0.0 0.0.0.0 192.168.1.1",
   "R1#config t R1(config)#ip routing R1(config)#ip default-gateway 192.168.1.1"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 FloridaMan88 Highly Voted \uf164 2 years, 7 months ago\nThis text appears to be from a L3 switch. On a router there is no need to turn on (config)# \"ip routing\" first and then the default route command.\nit should be: R1# conf t R1(config)# ip route 0.0.0.0 0.0.0.0 192.168.1.1",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q346",
  "num": 346,
  "question": "A packet is destined for 10.10.1.22. Which static route does the router choose to forward the packet?",
  "options": [
   "ip route 10.10.1.0 255.255.255.240 10.10.255.1",
   "ip route 10.10.1.20 255.255.255.252 10.10.255.1",
   "ip route 10.10.1.16 255.255.255.252 10.10.255.1",
   "ip route 10.10.1.20 255.255.255.254 10.10.255.1"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 alexiro Highly Voted \uf164 3 years, 1 month ago\nNetwork 10.10.1.20 /30\nhost range 10.10.1.21 - 10.10.1.22",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q347",
  "num": 347,
  "question": "Refer to the exhibit. How does the router manage traffic to 192.168.12.16?",
  "options": [
   "It chooses the EIGRP route because it has the lowest administrative distance.",
   "It load-balances traffic between all three routes.",
   "It chooses the OSPF route because it has the longest prefix inclusive of the destination address.",
   "It selects the RIP route because it has the longest prefix inclusive of the destination address."
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 MM_9 Highly Voted \uf164 2 years, 8 months ago\nThe answer is wrong. The router can't use the network OSPF because it's another network and not include the destination address (192.168.12.0/28\n--> from 192.168.12.0 to 192.168.12.15). The correct answer is D because the RIP route use a /27 subnet and include the destination address\n(192.168.12.0/27 --> from 192.168.12.0 to 192.168.12.31).\nIf i wrong please correct me",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q348",
  "num": 348,
  "question": "What are two reasons for an engineer to configure a floating static route? (Choose two.)",
  "options": [
   "to enable fallback static routing when the dynamic routing protocol fails",
   "to route traffic differently based on the source IP of the packet",
   "to automatically route traffic on a secondary path when the primary path goes down",
   "to support load balancing via static routing",
   "to control the return path of traffic that is sent from the router"
  ],
  "correct": "AC",
  "explanation": "\uf147 \uf007 dicksonpwc Highly Voted \uf164 2 years, 1 month ago\nFloating static routes are static routes that have an administrative distance greater than the administrative distance of dynamic routes.\nAdministrative distances can be configured on a static route so that the static route is less desirable than a dynamic route. In this manner, the static\nroute is not used when the dynamic route is available. However, if the dynamic route is lost, the static route can take over, and traffic can be sent\nthrough this alternate route. If this alternate route is provided using a DDR interface, then that interface can be used as a backup mechanism.\nUsed when primary route is Not available.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q349",
  "num": 349,
  "question": "Refer to the exhibit. How does router R1 handle traffic to 192.168.10.16?",
  "options": [
   "It selects the IS-IS route because it has the shortest prefix inclusive of the destination address",
   "It selects the RIP route because it has the longest prefix inclusive of the destination address",
   "It selects the OSPF route because it has the lowest cost",
   "It selects the EIGRP route because it has the lowest administrative distance"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 Stonetales987 Highly Voted \uf164 1 year, 10 months ago\nB is correct.\n1. Longest Prefix\n2. Administrative distance\n3. Metric\nhttps://packetlife.net/blog/2010/aug/16/route-preference/",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q350",
  "num": 350,
  "question": "Refer to the exhibit. A router received these five routes from different routing information sources. Which two routes does the router install in its\nrouting table?\n(Choose two.)",
  "options": [
   "OSPF route 10.0.0.0/30",
   "IBGP route 10.0.0.0/30",
   "OSPF route 10.0.0.0/16",
   "EIGRP route 10.0.0.1/32",
   "RIP route 10.0.0.0/30"
  ],
  "correct": "AD",
  "explanation": "\uf147 \uf007 ismatdmour Highly Voted \uf164 1 year, 6 months ago\nWe have 3 correct answers not 2 !\nOne route to 10.0.0.0/30 selected from the 3 routes IBGP/OSPF and RIP (OSPF is correct option A)\nOne route to a host 10.0.0.1/32 (D) EIGRP\nOne route to 10.0.0.0/16 OSPF (C)\nA D and C are correct ?",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q351",
  "num": 351,
  "question": "Refer to the exhibit. To which device does Router1 send packets that are destined to host 10.10.13.165?",
  "options": [
   "Router2",
   "Router3",
   "Router4",
   "Router5"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 TheLorenz Highly Voted \uf164 1 year, 6 months ago\nHere's a short subnet chart. You can write down a chart before the test starts\n/32 - 1\n/31 - 2\n/30 - 4\n/29 - 8\n/28 - 16\n/27 - 32\n/26 - 64\n/25 - 128\n/24 - 256\n/23 - 514\nCheck the routing table and look for a subnet that fits the 10.10.13.165 IP address. the only one that fits is 10.10.13.160/29. As you can see in this\nchart, /29 is equal to 8 total addresses and 6 total hosts (You have to subtract 2 from the total number of addresses to get the amount of hosts).\n10.10.13.160 +6 = 166 which is the last usable address for 10.10.13.160/29. You pretty much do the same thing to find the router it'll send it out of.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q352",
  "num": 352,
  "question": "R1 has learned route 10.10.10.0/24 via numerous routing protocols. Which route is installed?",
  "options": [
   "route with the next hop that has the highest IP",
   "route with the lowest cost",
   "route with the lowest administrative distance",
   "route with the shortest prefix length"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 diamcle Highly Voted \uf164 2 years, 10 months ago\nRoute Preference:\n1. Longest Prefix\n2. Administrative Distance\n3. Metric\nIn this specific question, the first option is: Administrative Distance.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q353",
  "num": 353,
  "question": "Which two minimum parameters must be configured on an active interface to enable OSPFV2 to operate? (Choose two.)",
  "options": [
   "OSPF process ID",
   "OSPF MD5 authentication key",
   "OSPF stub flag",
   "IPv6 address",
   "OSPF area"
  ],
  "correct": "AE",
  "explanation": "\uf147 \uf007 M3rc3r08 Highly Voted \uf164 2 years, 1 month ago\nAlso, OSPFv2 does not advertise IPv6 addresses. That's OSPFv3.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q354",
  "num": 354,
  "question": "Refer to the exhibit. What commands are needed to add a sub-interface to Ethernet0/0 on R1 to allow for VLAN 20, with IP address 10.20.20.1/24?",
  "options": [
   "R1(config)#interface ethernet0/0 R1(config-if)#encapsulation dot1q 20 R1(config-if)#ip address 10.20.20.1 255.255.255.0",
   "R1(config)#interface ethernet0/0.20 R1(config-if)#encapsulation dot1q 20 R1(config-if)#ip address 10.20.20.1 255.255.255.0",
   "R1(config)#interface ethernet0/0.20 R1(config-if)#ip address 10.20.20.1 255.255.255.0",
   "R1(config)#interface ethernet0/0 R1(config-if)#ip address 10.20.20.1 255.255.255.0"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 ZayaB Highly Voted \uf164 2 years, 7 months ago\nFor a Router on a stick, you need to:\n1. create a sub-interface\n2. encapsulate dot1q with the VLAN ID\n3. Assign an IP address",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q355",
  "num": 355,
  "question": "Refer to the exhibit. What does router R1 use as its OSPF router-ID?",
  "options": [
   "10.10.1.10",
   "10.10.10.20",
   "172.16.15.10",
   "192.168.0.1"
  ],
  "correct": "C",
  "explanation": "OSPF uses the following criteria to select the router ID:\n1. Manual configuration of the router ID (via the \u202b\u05d2\u202c\u20acrouter-id x.x.x.x\u202b\u05d2\u202c\u20ac command under OSPF router configuration mode).\n2. Highest IP address on a loopback interface.\n3. Highest IP address on a non-loopback and active (no shutdown) interface.\n\n\uf147 \uf007 ZUMY 1 year, 2 months ago\nC is correct",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q356",
  "num": 356,
  "question": "Refer to the exhibit. The loopback1 interface of the Atlanta router must reach the loopback3 interface of the Washington router. Which two static\nhost routes must be configured on the New York router? (Choose two.)",
  "options": [
   "ipv6 route 2000::3/128 s0/0/0",
   "ipv6 route 2000::1/128 s0/0/1",
   "ipv6 route 2000::1/128 2012::1",
   "ipv6 route 2000::1/128 2012::2",
   "ipv6 route 2000::3/128 2023::3"
  ],
  "correct": "CE",
  "explanation": "\uf147 \uf007 SOAPGUY Highly Voted \uf164 1 year, 4 months ago\nSelected Answer: CE\n\nON NEWYORK ON NEWYORK ON NEWYORK~~~",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q357",
  "num": 357,
  "question": "Refer to the exhibit. After the configuration is applied, the two routers fail to establish an OSPF neighbor relationship. What is the reason for the\nproblem?",
  "options": [
   "The OSPF process IDs are mismatched",
   "The network statement on Router1 is misconfigured",
   "Router2 is using the default hello timer",
   "The OSPF router IDs are mismatched"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 bmatthee01 Highly Voted \uf164 1 year, 6 months ago\nOspf processes can differ on each router and neighborship will form\nOspf area must be the same to form adjacency\nHello and dead timers must match to form adjacency\nOspf Default hello timer is 10 and dead timer is 40\nIn This case R1 hello timer was modified to 5 seconds\nTimers was not changed on R2 hence using the default timers\nSo C is correct",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q358",
  "num": 358,
  "question": "Refer to the exhibit. Which route type is configured to reach the Internet?",
  "options": [
   "floating static route",
   "host route",
   "network route",
   "default route"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 TheLorenz Highly Voted \uf164 1 year, 6 months ago\nD. It can reach the internet with the directly connected route but only if it's specified to go directly to 10.10.10.18. The internet itself is filled with\nunknown addresses, so any other unknown address will need to use the default route.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q359",
  "num": 359,
  "question": "Refer to the exhibit. Which path is used by the router for Internet traffic?",
  "options": [
   "209.165.200.0/27",
   "0.0.0.0/0",
   "10.10.13.0/24",
   "10.10.10.0/28"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 LTTAM Highly Voted \uf164 2 years, 8 months ago\nFor internet traffic... the destination IP's can vary. Hence in this topology, it is using the default gateway 0.0.0.0. Path selection does not meet any\nother criteria so it has to use gateway of last resort. Correct me if I'm wrong here folks.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q360",
  "num": 360,
  "question": "When OSPF learns multiple paths to a network, how does it select a route?",
  "options": [
   "For each existing interface, it adds the metric from the source router to the destination to calculate the route with the lowest bandwidth.",
   "It counts the number of hops between the source router and the destination to determine the route with the lowest metric.",
   "It divides a reference bandwidth of 100 Mbps by the actual bandwidth of the exiting interface to calculate the route with the lowest cost.",
   "It multiplies the active K values by 256 to calculate the route with the lowest metric."
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 RebWat93 Highly Voted \uf164 2 years, 8 months ago\nOSPF uses cost to make routing decisions",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q361",
  "num": 361,
  "question": "When a floating static route is configured, which action ensures that the backup route is used when the primary route fails?",
  "options": [
   "The administrative distance must be higher on the primary route so that the backup route becomes secondary.",
   "The default-information originate command must be configured for the route to be installed into the routing table.",
   "The floating static route must have a lower administrative distance than the primary route so it is used as a backup.",
   "The floating static route must have a higher administrative distance than the primary route so it is used as a backup"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 alexiro Highly Voted \uf164 3 years, 1 month ago\nBy default, IOS considers static routes better than OSPF-learned routes. By default, IOS gives\nstatic routes an administrative distance of 1 A floating static route floats or moves into and out of the IP routing table depending on whether the\nbetter (lower) administrative distance route learned by the routing protocol happens to exist currently.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q362",
  "num": 362,
  "question": "Refer to the exhibit. The show ip ospf interface command has been executed on R1. How is OSPF configured?",
  "options": [
   "A point-to-point network type is configured.",
   "The interface is not participating in OSPF.",
   "The default Hello and Dead timers are in use.",
   "There are six OSPF neighbors on this interface."
  ],
  "correct": "C",
  "explanation": "From the output we can see there are Designated Router & Backup Designated Router for this OSPF domain so this is a broadcast network\n(point-to-point and point-to-multipoint networks do not elect DR & BDR).\nBy default, the timers on a broadcast network (Ethernet, point-to-point and point-to-multipoint) are 10 seconds hello and 40 seconds dead. The\ntimers on a non- broadcast network are 30 seconds hello 120 seconds dead.\nFrom the line \u202b\u05d2\u202c\u20acNeighbor Count is 3\u202b\u05d2\u202c\u20ac, we learn there are four OSPF routers in this OSPF domain.\nReference:\nhttps://www.cisco.com/c/en/us/support/docs/ip/open-shortest-path-first-ospf/13689-17.html\n\n\uf147 \uf007 vadiminski Highly Voted \uf164 2 years, 4 months ago\nA is wrong because default and designated routers are in use\nB is obviously wrong\nD is wrong, the neighbour count is 3\nC is correct, the default timers in broadcast networks (ethernet) are 10 seconds hello and 4*hello for the dead timer",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q363",
  "num": 363,
  "question": "A user configured OSPF and advertised the Gigabit Ethernet interface in OSPF. By default, to which type of OSPF network does this interface\nbelong?",
  "options": [
   "point-to-multipoint",
   "point-to-point",
   "broadcast",
   "nonbroadcast"
  ],
  "correct": "C",
  "explanation": "The Broadcast network type is the default for an OSPF enabled ethernet interface (while Point-to-Point is the default OSPF network type for\nSerial interface with\nHDLC and PPP encapsulation).\nReference:\nhttps://www.oreilly.com/library/view/cisco-ios-cookbook/0596527225/ch08s15.html\n\n\uf147 \uf007 Ahhmedd Highly Voted \uf164 3 years, 2 months ago\nThe Broadcast network type is the default for an OSPF enabled ethernet interface (while Point-to-Point is the default OSPF network type for Serial\ninterface with HDLC and PPP encapsulation so the An is C",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q364",
  "num": 364,
  "question": "Which attribute does a router use to select the best path when two or more different routes to the same destination exist from two different\nrouting protocols?",
  "options": [
   "dual algorithm",
   "metric",
   "administrative distance",
   "hop count"
  ],
  "correct": "C",
  "explanation": "Administrative distance is the feature used by routers to select the best path when there are two or more different routes to the same\ndestination from different routing protocols. Administrative distance defines the reliability of a routing protocol.\n\n\uf147 \uf007 alexiro Highly Voted \uf164 3 years, 1 month ago\nWhen IOS must choose between routes learned using different routing protocols, IOS uses a concept called administrative distance. Administrative\ndistance is a number that denotes how believable an entire routing protocol is on a single router. The lower the number, the better\nThe AD is a rating of trust when multiple routes exist to the same destination.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q365",
  "num": 365,
  "question": "Router A learns the same route from two different neighbors; one of the neighbor routers is an OSPF neighbor, and the other is an EIGRP neighbor.\nWhat is the administrative distance of the route that will be installed in the routing table?",
  "options": [
   "20",
   "90",
   "110",
   "115"
  ],
  "correct": "B",
  "explanation": "The Administrative distance (AD) of EIGRP is 90 while the AD of OSPF is 110 so EIGRP route will be chosen to install into the routing table.\n\n\uf147 \uf007 alexiro Highly Voted \uf164 3 years, 1 month ago\nAdmin Distance:\nConnected.................0\nStatic.........................1\nEIGRP Summary......5 (This occurs only on the router where the summary was generated)\neBGP........................20\nInternal EIGRP.........90\nOSPF........................110\nIS-IS.........................115\nRIP...........................120\nExternal EIGRP.......170\niBGP........................200\nNHRP......................250 (You'll typically only when using phase 3 DMVPN)\nhttps://networktechstudy.com/home/learning-ospf-path-selection",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q366",
  "num": 366,
  "question": "Refer to the exhibit. An engineer is bringing up a new circuit to the MPLS provider on the Gi0/1 interface of Router 1. The new circuit uses eBGP\nand learns the route to VLAN25 from the BGP path.\nWhat is the expected behavior for the traffic flow for route 10.10.13.0/25?",
  "options": [
   "Traffic to 10.10.13.0/25 is load balanced out of multiple interfaces.",
   "Traffic to 10.10.13.0/25 is asymmetrical.",
   "Route 10.10.13.0/25 is updated in the routing table as being learned from interface Gi0/1.",
   "Route 10.10.13.0/25 learned via the Gi0/0 interface remains in the routing table."
  ],
  "correct": "D",
  "explanation": "The AD of eBGP (20) is smaller than that of OSPF (110) so the route to 10.10.13.0/25 will be updated as being learned from the new BGP path.\n\n\uf147 \uf007 cybernett Highly Voted \uf164 2 years, 6 months ago\nThe correct answer is D\nBecause when new route is learned by R1 it will be added to it's routing table via Gi0/1 But the previous still stays in the routing table which is\nlearned via Gi0/0 (ospf)\nHence we have two paths to reach 10.10.13.0/25\nCisco plays with words, read carefully.\nC is wrong because they used the word updated and not added. Updated means previous route is removed\nWhich is not true , it stays in the table\nHence D is perfect answer",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q367",
  "num": 367,
  "question": "Which two actions influence the EIGRP route selection process? (Choose two.)",
  "options": [
   "The advertised distance is calculated by a downstream neighbor to inform the local router of the bandwidth on the link.",
   "The router calculates the feasible distance of all paths to the destination route.",
   "The router must use the advertised distance as the metric for any given route.",
   "The router calculates the best backup path to the destination route and assigns it as the feasible successor.",
   "The router calculates the reported distance by multiplying the delay on the exiting interface by 256."
  ],
  "correct": "BD",
  "explanation": "The reported distance (or advertised distance) is the cost from the neighbor to the destination. It is calculated from the router advertising the\nroute to the network.\nFor example in the topology below, suppose router A & B are exchanging their routing tables for the first time. Router B says \u202b\u05d2\u202c\u20acHey, the best\nmetric (cost) from me to IOWA is 50 and the metric from you to IOWA is 90\u202b\u05d2\u202c\u20ac and advertises it to router A. Router A considers the first metric\n(50) as the Advertised distance. The second metric (90), which is from NEVADA to IOWA (through IDAHO), is called the Feasible distance.\n\nThe reported distance is calculated in the same way of calculating the metric. By default (K1 = 1, K2 = 0, K3 = 1, K4 = 0, K5 = 0), the metric is\ncalculated as follows:\n\nFeasible successor is the backup route. To be a feasible successor, the route must have an Advertised distance (AD) less than the Feasible\ndistance (FD) of the current successor route.\nFeasible distance (FD): The sum of the AD plus the cost between the local router and the next-hop router. The router must calculate the FD of all\npaths to choose the best path to put into the routing table.\nNote: Although the new CCNA exam does not have EIGRP topic but you should learn the basic knowledge of this routing protocol.\n\n\uf147 \uf007 Shamwedge Highly Voted \uf164 1 year, 6 months ago\nThe two answers with feasible in it, make them feasible answers.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q368",
  "num": 368,
  "question": "Refer to the exhibit. If OSPF is running on this network, how does Router2 handle traffic from Site B to 10.10.13.128/25 at Site A?",
  "options": [
   "It sends packets out of interface Fa0/1 only.",
   "It sends packets out of interface Fa0/2 only.",
   "It load-balances traffic out of Fa0/1 and Fa0/2.",
   "It cannot send packets to 10.10.13.128/25."
  ],
  "correct": "D",
  "explanation": "Router2 does not have an entry for the subnet 10.10.13.128/25. It only has an entry for 10.10.13.0/25, which ranges from 10.10.13.0 to\n10.10.13.127.\n\n\uf147 \uf007 admin1982 Highly Voted \uf164 2 years, 7 months ago\n@ Texter: Router 2 does not have an entry for the subnet 10.10.13.128/25. It only has an entry for 10.10.13.0/25, which ranges from 10.10.13.0 to\n10.10.13.127. You're welcome - Je vous en prie",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q369",
  "num": 369,
  "question": "Which two outcomes are predictable behaviors for HSRP? (Choose two.)",
  "options": [
   "The two routers negotiate one router as the active router and the other as the standby router.",
   "The two routers share the same interface IP address, and default gateway traffic is load-balanced between them.",
   "The two routers synchronize configurations to provide consistent packet forwarding.",
   "Each router has a different IP address, both routers act as the default gateway on the LAN, and traffic is load-balanced between them.",
   "The two routers share a virtual IP address that is used as the default gateway for devices on the LAN."
  ],
  "correct": "AE",
  "explanation": "\uf147 \uf007 alexiro Highly Voted \uf164 3 years, 1 month ago\nHot Standby Router Protocol (HSRP) A Cisco proprietary protocol that allows two (or more) routers to share the duties of being the default router\non a subnet, with an active/standby model, with one router acting as the default router and the other sitting by waiting to take over that role if the\nfirst router fails\nHSRP\nProtocol Cisco proprietary\n\"Number of groups\" 16 groups maximum\nActive/Standby \"1 active, 1 standby and multiple candidates.\"\n\"Virtual IPAddress\" \"Different from real IP addresses on interfaces\"\nMulticast address 224.0.0.2\nTracking Interfaces or Objects\nHSRP virtual Mac address will start with 0000.0c07.acXX\n07.ac is the hexadecimal conversion of the HSRP group Id.\nXX is Group number\nvirtual Mac for hsrp group 2 = 0000.0c07.ac02\nvirtual Mac for hsrp group12 = 0000.0c07.ac0C",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q370",
  "num": 370,
  "question": "Refer to the exhibit. An engineer is configuring the New York router to reach the Lo1 interface of the Atlanta router using interface Se0/0/0 as the\nprimary path.\nWhich two commands must be configured on the New York router so that it reaches the Lo1 interface of the Atlanta router via Washington when\nthe link between\nNew York and Atlanta goes down? (Choose two.)",
  "options": [
   "Ipv6 route 2000::1/128 2012::1",
   "Ipv6 route 2000::1/128 2012::1 5",
   "Ipv6 route 2000::1/128 2012::2",
   "Ipv6 route 2000::1/128 2023::2 5",
   "Ipv6 route 2000::1/128 2023::3 5"
  ],
  "correct": "AE",
  "explanation": "Floating static routes are static routes that have an administrative distance greater than the administrative distance (AD) of another static route\nor dynamic routes.\nBy default a static route has an AD of 1 then floating static route must have the AD greater than 1. Floating static route has a manually\nconfigured administrative distance greater than that of the primary route and therefore would not be in the routing table until the primary route\nfails.\n\n\uf147 \uf007 ZayaB Highly Voted \uf164 2 years, 7 months ago\nI agree with Jeff, the question is not correctly worded. I also assumed that primary path is already configured and we are just configuring the\nfloating route. :(",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q371",
  "num": 371,
  "question": "How does HSRP provide first hop redundancy?",
  "options": [
   "It load-balances Layer 2 traffic along the path by flooding traffic out all interfaces configured with the same VLAN.",
   "It uses a shared virtual MAC and a virtual IP address to a group of routers that serve as the default gateway for hosts on a LAN.",
   "It forwards multiple packets to the same destination over different routed links in the data path.",
   "It load-balances traffic by assigning the same metric value to more than one route to the same destination in the IP routing table."
  ],
  "correct": "B",
  "explanation": "Reference:\nhttps://www.cisco.com/c/en/us/td/docs/ios-xml/ios/ipapp_fhrp/configuration/xe-16/fhp-xe-16-book/fhp-hsrp-mgo.html\n\n\uf147 \uf007 alexiro Highly Voted \uf164 3 years, 1 month ago\nThis virtual IP address is in the same subnet as the interface IP address, but it is a different IP address. The router then automatically creates the\nvirtual MAC address. All the cooperating HSRP routers know these virtual addresses, but only the HSRP active router uses these addresses at any\none point in time.\nThe virtual router is responsible for host communications such as an ARP\nrequest for the host\u2019s default gateway. Technically, this is served by the active router since it is hosting the virtual router. However, it is the virtual\nrouter\u2019s IP address and MAC address that are used for outgoing packets.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q372",
  "num": 372,
  "question": "Refer to the exhibit. Which action establishes the OSPF neighbor relationship without forming an adjacency?",
  "options": [
   "modify hello interval",
   "modify process ID",
   "modify priority",
   "modify network type"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 nebolala1 Highly Voted \uf164 1 year, 9 months ago\nI hate this",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q373",
  "num": 373,
  "question": "Which command must you enter to guarantee that an HSRP router with higher priority becomes the HSRP primary router after it is reloaded?",
  "options": [
   "standby 10 preempt",
   "standby 10 version 1",
   "standby 10 priority 150",
   "standby 10 version 2"
  ],
  "correct": "A",
  "explanation": "The \u202b\u05d2\u202c\u20acpreempt\u202b\u05d2\u202c\u20ac command enables the HSRP router with the highest priority to immediately become the active router.\n\n\uf147 \uf007 kaus33k Highly Voted \uf164 1 year, 11 months ago\nPreemption is the technology that ask a HSRP enabled router to be primary every time it comes up even though backup router is acting as Primary\ncurrently. if Preemption not enabled, when primary router reloads then backup router becomes primary and doesnot become backup even though\nprimary router comes up.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q374",
  "num": 374,
  "question": "Which command should you enter to verify the priority of a router in an HSRP group?",
  "options": [
   "show hsrp",
   "show sessions",
   "show interfaces",
   "show standby"
  ],
  "correct": "D",
  "explanation": "The following is sample output from the show standby command:\n\n\uf147 \uf007 xsp Highly Voted \uf164 2 years, 7 months ago\non the contrary if the question is vrrp, command is:\nshow vrrp",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q375",
  "num": 375,
  "question": "Refer to the exhibit. Which command would you use to configure a static route on Router1 to network 192.168.202.0/24 with a nondefault\nadministrative distance?",
  "options": [
   "router1(config)#ip route 192.168.202.0 255.255.255.0 192.168.201.2 1",
   "router1(config)#ip route 192.168.202.0 255.255.255.0 192.168.201.2 5",
   "router1(config)#ip route 1 192.168.201.1 255.255.255.0 192.168.201.2",
   "router1(config)#ip route 5 192.168.202.0 255.255.255.0 192.168.201.2"
  ],
  "correct": "B",
  "explanation": "The default AD of static route is 1 so we need to configure another number for the static route.\n\n\uf147 \uf007 cybernett Highly Voted \uf164 2 years, 6 months ago\nAnswer B is correct and not A because question asks for Non default AD therefore we use 5 as AD for static route and not 1 because Default AD for\nstatic route is 1",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q376",
  "num": 376,
  "question": "Which of the following dynamic routing protocols are Distance Vector routing protocols?",
  "options": [
   "IS-IS",
   "EIGRP",
   "OSPF",
   "BGP",
   "RIP"
  ],
  "correct": "BE",
  "explanation": "\uf147 \uf007 Stonetales987 Highly Voted \uf164 1 year, 10 months ago\nDistance Vector - RIP & EIGRP\nOSPF - Link State & IS IS\nBGP - Path State\nhttps://packetlife.net/media/library/40/IOS_Interior_Routing_Protocols.pdf",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q377",
  "num": 377,
  "question": "You have configured a router with an OSPF router ID, but its IP address still reflects the physical interface.\nWhich action can you take to correct the problem in the least disruptive way?",
  "options": [
   "Reload the OSPF process",
   "Specify a loopback address",
   "Reboot the router",
   "Save the router configuration"
  ],
  "correct": "A",
  "explanation": "Once an OSPF Router ID selection is done, it remains there even if you remove it or configure another OSPF Router ID. So the least disruptive\nway is to correct it using the command \u202b\u05d2\u202c\u20acclear ip ospf process\u202b\u05d2\u202c\u20ac.\n\n\uf147 \uf007 CISCO2022 Highly Voted \uf164 2 years, 3 months ago\nAdding loopback ip still need to reload ospf process to take effect.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q378",
  "num": 378,
  "question": "Which command should you enter to view the error log in an EIGRP for IPv6 environment?",
  "options": [
   "show ipv6 eigrp neighbors",
   "show ipv6 eigrp topology",
   "show ipv6 eigrp traffic",
   "show ipv6 eigrp events"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Rockrl Highly Voted \uf164 1 year, 9 months ago\nA lot of EIGRP question when it is not listed in the topics to cover",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q379",
  "num": 379,
  "question": "Refer to the exhibit. Which two statements about the network environment of router R1 must be true? (Choose two.)\n\nRefer to the exhibit. Router R1 must be configured to reach the 10.0.3.0/24 network from the 10.0.1.0/24 segment. Which command must be used\nto configure the route?",
  "options": [
   "route add 10.0.3.0 0.255.255.255 10.0.4.2",
   "ip route 10.0.3.0 0.255.255.255 10.0.4.2",
   "route add 10.0.3.0 mask 255.255.255.0 10.0.4.3",
   "ip route 10.0.3.0 255.255.255.0 10.0.4.3"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Request7108 8 months, 2 weeks ago\nThe prompt says choose two?",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q381",
  "num": 381,
  "question": "Which two statements about exterior routing protocols are true? (Choose two.)",
  "options": [
   "They determine the optimal within an autonomous system.",
   "They determine the optimal path between autonomous systems.",
   "BGP is the current standard exterior routing protocol.",
   "Most modern networking supports both EGP and BGP for external routing.",
   "Most modern network routers support both EGP and EIGRP for external routing."
  ],
  "correct": "BC",
  "explanation": "\uf147 \uf007 Clinques Highly Voted \uf164 1 year, 8 months ago\nSelected Answer: BC\n\nExterior Gateway Protocols (EGP): Used for routing between autonomous systems. It is also referred to as inter-AS routing. Service providers and\nlarge companies may interconnect using an EGP. The Border Gateway Protocol (BGP) is the only currently viable EGP and is the official routing\nprotocol used by the Internet.\nNOTE\nBecause BGP is the only EGP available, the term EGP is rarely used; instead, most engineers simply refer to BGP.\nhttps://www.ciscopress.com/articles/article.asp?p=2180210&seqNum=7",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q382",
  "num": 382,
  "question": "You have two paths for the 10.10.10.0 network - one that has a feasible distance of 3072 and the other of 6144.\nWhat do you need to do to load balance your EIGRP routes?",
  "options": [
   "Change the maximum paths to 2",
   "Change the configuration so they both have the same feasible distance",
   "Change the variance for the path that has a feasible distance of 3072 to 2",
   "Change the IP addresses so both paths have the same source IP address"
  ],
  "correct": "BC",
  "explanation": "Every routing protocol supports equal cost path load balancing. In addition, Interior Gateway Routing Protocol (IGRP) and EIGRP also support\nunequal cost path load balancing. Use the variance n command in order to instruct the router to include routes with a metric of less than n\ntimes the minimum metric route for that destination. The variable n can take a value between 1 and 128. The default is 1, which means equal\ncost load balancing. Traffic is also distributed among the links with unequal costs, proportionately, with respect to the metric.\nReference:\nhttps://www.cisco.com/c/en/us/support/docs/ip/enhanced-interior-gateway-routing-protocol-eigrp/13677-19.html#topic1\n\n\uf147 \uf007 jehangt3 Highly Voted \uf164 2 years, 3 months ago\nTHE QUESTION DOES NOT STATE TO \"CHOOSE 2 ANSWERS\" !",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q384",
  "num": 384,
  "question": "Which two circumstances can prevent two routers from establishing an OSPF neighbor adjacency? (Choose two.)",
  "options": [
   "mismatched autonomous system numbers",
   "an ACL blocking traffic from multicast address 224.0.0.10",
   "mismatched process IDs",
   "mismatched hello timers and dead timers",
   "use of the same router ID on both devices"
  ],
  "correct": "DE",
  "explanation": "\uf147 \uf007 dicksonpwc Highly Voted \uf164 2 years ago\nMust be unique:\n\u2013 OSPF process ID\n\u2013 router ID\n\u2013 IP address\nMust match:\n\u2013 netmask\n\u2013 area ID\n\u2013 timers",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q385",
  "num": 385,
  "question": "Which three describe the reasons large OSPF networks use a hierarchical design? (Choose three.)",
  "options": [
   "to speed up convergence",
   "to reduce routing overhead",
   "to lower costs by replacing routers with distribution layer switches",
   "to decrease latency by increasing bandwidth",
   "to confine network instability to single areas of the network",
   "to reduce the complexity of router configuration"
  ],
  "correct": "ABE",
  "explanation": "\uf147 \uf007 dicksonpwc Highly Voted \uf164 2 years ago\nHierarchical design of OSPF (basically means that you can separate the larger internetwork into smaller internetworks called areas) helps us create a\nnetwork with all features listed above (decrease routing overhead, speed up convergence, confine network instability to single areas of the\nnetwork).",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q386",
  "num": 386,
  "question": "Refer to the exhibit. If R1 receives a packet destined to 172.16.1.1, to which IP address does it send the packet?",
  "options": [
   "192.168.14.4",
   "192.168.12.2",
   "192.168.13.3",
   "192.168.15.5"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 jobba111 Highly Voted \uf164 1 year, 2 months ago\nroute is not there, goes to the default gate way instead.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q387",
  "num": 387,
  "question": "Refer to the exhibit. On R1 which routing protocol is in use on the route to 192.168.10.1?",
  "options": [
   "RIP",
   "OSPF",
   "IGRP",
   "EIGRP"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Robin999 Highly Voted \uf164 2 years, 6 months ago\nno AD needed. Rule most specified Prefix you need.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q388",
  "num": 388,
  "question": "Refer to the exhibit. Which Command do you enter so that R1 advertises the loopback0 interface to the BGP Peers?",
  "options": [
   "Network 172.16.1.32 mask 255.255.255.224",
   "Network 172.16.1.0 0.0.0.255",
   "Network 172.16.1.32 255.255.255.224",
   "Network 172.16.1.33 mask 255.255.255.224",
   "Network 172.16.1.32 mask 0.0.0.31",
   "Network 172.16.1.32 0.0.0.31"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 nakres64 Highly Voted \uf164 2 years, 7 months ago\nBGP is out of content.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q389",
  "num": 389,
  "question": "Refer to exhibit. What Administrative distance has route to 192.168.10.1?",
  "options": [
   "1",
   "90",
   "110",
   "120"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 shumps 2 months ago\nwhy not A because its directly connected and i don't see EIGRP in the table, why refer to the exhibit then",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q390",
  "num": 390,
  "question": "Which value is used to determine the active router in an HSRP default configuration?",
  "options": [
   "Router loopback address",
   "Router IP address",
   "Router priority",
   "Router tracking number"
  ],
  "correct": "B",
  "explanation": "Q. If there is no priority configured for a standby group, what determines which router is active?\nA. The priority field is used to elect the active router and the standby router for the specific group. In the case of an equal priority, the router with\nthe highest IP address for the respective group is elected as active. Furthermore, if there are more than two routers in the group, the second\nhighest IP address determines the standby router and the other router/routers are in the listen state.\n\n\uf147 \uf007 xsp Highly Voted \uf164 2 years, 7 months ago\nkeyword default configuration, means that priorities of both routers are the same (100).",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q391",
  "num": 391,
  "question": "Refer to the exhibit. If RTR01 is configured as shown, which three addresses will be received by other routers that are running EIGRP on the\nnetwork? (Choose three.)",
  "options": [
   "192.168.2.0",
   "10.4.3.0",
   "10.0.0.0",
   "172.16.0.0",
   "172.16.4.0",
   "192.168.0.0"
  ],
  "correct": "ACD",
  "explanation": "\uf147 \uf007 sdokmak Highly Voted \uf164 2 years, 3 months ago\nA, C and D\nauto summary uses \"classful boundary\"\n- 10.4.3.0 with mask 255.0.0.0 gives 10.0.0.0\n- 172.16.4.0 with mask 255.255.0.0 gives 172.16.0.0\n- 192.168.2.0 with mask 255.255.255.0 gives 192.168.2.0",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q392",
  "num": 392,
  "question": "Which configuration command can you apply to a HSRP router so that its local interface becomes active if all other routers in the group fail?",
  "options": [
   "no additional config is required",
   "standby 1 track ethernet",
   "standby 1 preempt",
   "standby 1 priority 250"
  ],
  "correct": "A",
  "explanation": "Simply because that will be the default behavior routers would follow in the event all other routers in the HSRP group fail, then it would not keep\nattributes such as priority or preemption. What preemption does in summary is to make sure that the configured Priority on all routers within the\nsame HSRP group is always respected. That is, if R1 is configured on the HSRP group with a priority of 150 but he stands as active since all\nother routers currently subscribed to that group have a priority 150, then will router will preempt the current active router and will take over\nhence becoming the new active router.\nWith preemption disabled, the new router does not preempt the current active router, unless routers in the group have to renegotiate their roles\nbased on each router's priority at the time of negotiation.\n\n\uf147 \uf007 SollyMalwane Highly Voted \uf164 1 year, 6 months ago\nSelected Answer: A\n\nNO CONFIGURATION REQUIRED",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q393",
  "num": 393,
  "question": "Which two statements about eBGP neighbor relationships are true? (Choose two.)",
  "options": [
   "The two devices must reside in different autonomous systems",
   "Neighbors must be specifically declared in the configuration of each device",
   "They can be created dynamically after the network statement is configured",
   "The two devices must reside in the same autonomous system",
   "The two devices must have matching timer settings"
  ],
  "correct": "AB",
  "explanation": "\uf147 \uf007 FloridaMan88 Highly Voted \uf164 2 years, 7 months ago\nThis topic isn't for CCNA 200-301 exam, more likely for CCNP or CCIE level exams...just good to know for the future.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q394",
  "num": 394,
  "question": "Refer to the exhibit. How will the router handle a packet destined for 192.0.2.156?",
  "options": [
   "The router will forward the packet via either Serial0 or Serial1.",
   "The router will return the packet to its source.",
   "The router will forward the packet via Serial2.",
   "The router will drop the packet."
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Retxed Highly Voted \uf164 2 years, 7 months ago\nExplanation:\nRouter has pointed default router to 192.168.4.1 and this subnet is connected via serial 2 interface. Router does not have router for the 192.0.2.156.\nso it will use the default gateway 192.168.4.1. A default route identifies the gateway IP address to which the router sends all IP packets for which it\ndoes not have a learned or static route.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q395",
  "num": 395,
  "question": "Which statements describe the routing protocol OSPF? (Choose three.)",
  "options": [
   "It supports VLSM.",
   "It is used to route between autonomous systems.",
   "It confines network instability to one area of the network.",
   "It increases routing overhead on the network.",
   "It allows extensive control of routing updates.",
   "It is simpler to configure than RIP v2."
  ],
  "correct": "ACE",
  "explanation": "The OSPF protocol is based on link-state technology, which is a departure from the Bellman-Ford vector based algorithms used in traditional\nInternet routing protocols such as RIP. OSPF has introduced new concepts such as authentication of routing updates, Variable Length Subnet\nMasks (VLSM), route summarization, and so forth.\nOSPF uses flooding to exchange link-state updates between routers. Any change in routing information is flooded to all routers in the network.\nAreas are introduced to put a boundary on the explosion of link-state updates. Flooding and calculation of the Dijkstra algorithm on a router is\nlimited to changes within an area.\n\n\uf147 \uf007 Robin999 Highly Voted \uf164 2 years, 6 months ago\nD probaly would is right too.\nIf you gonna use OSPF you have more Routing overhead in your network. If its already implemented you can reduce the overhead by building\ndifferent areas. All in all it increases the overhead.\nAnswers by Question 184 proofs it",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q396",
  "num": 396,
  "question": "Refer to the exhibit. After you apply the given configurations to R1 and R2 you notice that OSPFv3 fails to start.",
  "options": [
   "The area numbers on R1 and R2 are mismatched",
   "The IPv6 network addresses on R1 and R2 are mismatched",
   "The autonomous system numbers on R1 and R2 are mismatched",
   "The router ids on R1 and R2 are mismatched"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Raulf Highly Voted \uf164 2 years, 5 months ago\nCorrect. Areas mismatched... however, The IPV6 global addresses are also in different subnets and there shouldn\u2019t be connectivity right?",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q397",
  "num": 397,
  "question": "Which command is used to display the collection of OSPF link states?",
  "options": [
   "show ip ospf link-state",
   "show ip ospf lsa database",
   "show ip ospf neighbors",
   "show ip ospf database"
  ],
  "correct": "D",
  "explanation": "The \"show ip ospf database\" command displays the link states. Here is an example:\nHere is the lsa database on R2.\nR2#show ip ospf database OSPF Router with ID (2.2.2.2) (Process ID 1)\nRouter Link States (Area 0)\nLink ID ADV Router Age Seq# Checksum Link count2.2.2.2 2.2.2.2 793 0x80000003 0x004F85 210.4.4.4 10.4.4.4 776 0x80000004 0x005643\n1111.111.111.111\n111.111.111.111 755 0x80000005 0x0059CA 2133.133.133.133 133.133.133.133 775 0x80000005 0x00B5B1 2 Net Link States (Area 0)\nLink ID ADV Router Age Seq# Checksum10.1.1.1 111.111.111.111 794 0x80000001 0x001E8B10.2.2.3 133.133.133.133 812 0x80000001\n0x004BA910.4.4.1\n111.111.111.111 755 0x80000001 0x007F1610.4.4.3 133.133.133.133 775 0x80000001 0x00C31F\n\n\uf147 \uf007 shiv3003 4 months, 3 weeks ago\nB i think",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q398",
  "num": 398,
  "question": "Refer to the exhibit. A network associate has configured OSPF with the command:\nCity(config-router)# network 192.168.12.64 0.0.0.63 area 0\nAfter completing the configuration, the associate discovers that not all the interfaces are participating in OSPF. Which three of the interfaces\nshown in the exhibit will participate in OSPF according to this configuration statement? (Choose three.)",
  "options": [
   "FastEthernet0 /0",
   "FastEthernet0 /1",
   "Serial0/0",
   "Serial0/1.102",
   "Serial0/1.103",
   "Serial0/1.104"
  ],
  "correct": "BCD",
  "explanation": "The \"network 192.168.12.64 0.0.0.63 equals to network 192.168.12.64/26. This network has:\n\u2711 Increment: 64 (/26= 1111 1111.1111 1111.1111 1111.1100 0000) + Network address:\n192.168.12.64\n\u2711 Broadcast address: 192.168.12.127\nTherefore all interface in the range of this network will join OSPF.\n\n\uf147 \uf007 chr Highly Voted \uf164 2 years, 4 months ago\nOSPF will match IP addresses based on 192.168.12.64 0.0.0.63.\n11000000.10101000.00001100.01000000 => 192.168.12.64\n00000000.00000000.00000000.00111111 => 0.0.0.63\nMatches will be made on the IP only for the 1's not 0's above. We can invert the bits to make it more familiar as a network mask. This becomes:\n11000000.10101000.00001100.01000000 => 192.168.12.64\n11111111.11111111.11111111.11000000 => /26 or 255.255.255.192\nThis therefore gives a match of IPs in the network 192.168.12.64 (the next network is 192.168.12.128) so broadcast is 192.168.12.127 and usable IPs\nare .65 to 126.\nWe now match IPs in this range which are:\nFastEthernet0/1 (192.168.12.65) - ANSWER B\nSerial0/0 (192.168.12.121) - ANSWER C\nSerial0/1/102 (192.168.12.125) - ANSWER D\nIf you are having problems understanding this one the key to write out 0.0.0.63 in binary and then invert the bits.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q399",
  "num": 399,
  "question": "Refer to the exhibit. C-router is to be used as a \"router-on-a-stick\" to route between the VLANs. All the interfaces have been properly configured\nand IP routing is operational. The hosts in the VLANs have been configured with the appropriate default gateway. What is true about this\nconfiguration?",
  "options": [
   "These commands need to be added to the configuration: C-router(config)# router eigrp 123 C-router(config-router)# network 172.19.0.0",
   "These commands need to be added to the configuration: C-router(config)# router ospf 1 C-router(config-router)# network 172.19.0.0\n0.0.3.255 area 0",
   "These commands need to be added to the configuration: C-router(config)# router rip C-router(config-router)# network 172.19.0.0",
   "No further routing configuration is required."
  ],
  "correct": "D",
  "explanation": "Since all the same router (C-router) is the default gateway for all three VLANs, all traffic destined to a different VLA will be sent to the C-router.\nThe C-router will have knowledge of all three networks since they will appear as directly connected in the routing table. Since the C-router\nalready knows how to get to all three networks, no routing protocols need to be configured.\n\n\uf147 \uf007 LTTAM Highly Voted \uf164 2 years, 8 months ago\nD is correct. However... tricky question though. They list the routing protocols to throw you off. The question is actually testing your knowledge of\nVLAN routing.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q400",
  "num": 400,
  "question": "Refer to the exhibit. Which address and mask combination represents a summary of the routes learned by EIGRP?",
  "options": [
   "192.168.25.0 255.255.255.240",
   "192.168.25.0 255.255.255.252",
   "192.168.25.16 255.255.255.240",
   "192.168.25.16 255.255.255.252",
   "192.168.25.28 255.255.255.240",
   "192.168.25.28 255.255.255.252"
  ],
  "correct": "C",
  "explanation": "The binary version of 20 is 10100.\nThe binary version of 16 is 10000.\nThe binary version of 24 is 11000.\nThe binary version of 28 is 11100.\nThe subnet mask is /28. The mask is 255.255.255.240.\nNote:\nFrom the output above, EIGRP learned 4 routes and we need to find out the summary of them:\n\u2711 192.168.25.16\n192.168.25.20\n\u2711 192.168.25.24\n\u2711 192.168.25.28\n-> The increment should be 28 ?16 = 12 but 12 is not an exponentiation of 2; so we must choose 16 (24). Therefore the subnet mask is /28\n(=1111 1111.1111\n1111.1111 1111.11110000) = 255.255.255.240.\nSo the best answer should be 192.168.25.16 255.255.255.240.\n\n\uf147 \uf007 Kareemelkh Highly Voted \uf164 2 years, 8 months ago\nAli526 check this link it will clear you confusion , I hade the same doubt\nhttps://youtu.be/QqEcCzhlWis",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q401",
  "num": 401,
  "question": "Refer to the exhibit. Given the output for this command, if the router ID has not been manually set, what router ID will OSPF use for this router?",
  "options": [
   "10.1.1.2",
   "10.154.154.1",
   "172.16.5.1",
   "192.168.5.3"
  ],
  "correct": "C",
  "explanation": "The highest IP address of all loopback interfaces will be chosen -> Loopback 0 will be chosen as the router ID.\n\n\uf147 \uf007 Ali526 Highly Voted \uf164 2 years, 8 months ago\nC is correct and so is the reasoning. If router ID is not manually setup, the highest loopback IP is selected and if there is no loopback, highest IP\nfrom the interface IPs is selected.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q402",
  "num": 402,
  "question": "Refer to the exhibit. When running EIGRP, what is required for RouterA to exchange routing updates with RouterC?",
  "options": [
   "AS numbers must be changed to match on all the routers",
   "Loopback interfaces must be configured so a DR is elected",
   "The no auto-summary command is needed on Router A and Router C",
   "Router B needs to have two network statements, one for each connected network"
  ],
  "correct": "A",
  "explanation": "This question is to examine the understanding of the interaction between EIGRP routers. The following information must be matched so as to\ncreate neighborhood. EIGRP routers to establish, must match the following information:\n1. AS Number;\n2. K value.\n\n\uf147 \uf007 Stonetales987 Highly Voted \uf164 1 year, 10 months ago\nTo become neighbors, the following parameters must match on both routers:\nASN (Autonomous System Number)\nsubnet\nK values (components of metric)\nhttps://geek-university.com/ccna/eigrp-neighbors/",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q403",
  "num": 403,
  "question": "A network administrator is troubleshooting the OSPF configuration of routers R1 and R2. The routers cannot establish an adjacency relationship\non their common\nEthernet link.\n\nThe graphic shows the output of the show ip ospf interface e0 command for routers R1 and R2. Based on the information in the graphic, what is\nthe cause of this problem?",
  "options": [
   "The OSPF area is not configured properly.",
   "The priority on R1 should be set higher.",
   "The cost on R1 should be set higher.",
   "The hello and dead timers are not configured properly.",
   "A backup designated router needs to be added to the network.",
   "The OSPF process ID numbers must match."
  ],
  "correct": "D",
  "explanation": "In OSPF, the hello and dead intervals must match and here we can see the hello interval is set to 5 on R1 and 10 on R2. The dead interval is also\nset to 20 on R1 but it is 40 on R2.\n\n\uf147 \uf007 Talloo Highly Voted \uf164 2 years, 7 months ago\nBy the way, the interfaces on both routers have the same IP address",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q404",
  "num": 404,
  "question": "Refer to the exhibit. Which two statements are true about the loopback address that is configured on RouterB? (Choose two.)",
  "options": [
   "It ensures that data will be forwarded by RouterB.",
   "It provides stability for the OSPF process on RouterB.",
   "It specifies that the router ID for RouterB should be 10.0.0.1.",
   "It decreases the metric for routes that are advertised from RouterB.",
   "It indicates that RouterB should be elected the DR for the LAN."
  ],
  "correct": "BC",
  "explanation": "\uf147 \uf007 MikD4016 Highly Voted \uf164 1 year ago\nA loopback interface never comes down even if the link is broken so it provides stability for the OSPF process (for example we use that loopback\ninterface as the router-id) - B is correct.\nThe router-ID is chosen in the order below:\nThe highest IP address assigned to a loopback (logical) interface. If a loopback interface is not defined, the highest IP address of all active router's\nphysical interfaces will be chosen. -The loopback interface will be chosen as the router ID of RouterB - C is correct.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q405",
  "num": 405,
  "question": "If all OSPF routers in a single area are configured with the same priority value, what value does a router use for the OSPF router ID in the absence\nof a loopback interface?",
  "options": [
   "the IP address of the first Fast Ethernet interface",
   "the IP address of the console management interface",
   "the highest IP address among its active interfaces",
   "the lowest IP address among its active interfaces",
   "the priority value until a loopback interface is configured"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 M3rc3r08 Highly Voted \uf164 2 years, 1 month ago\nC is correct.\nA router ID is determined in the following order:\n1. using the router-id command under the OSPF process to statically configure the router ID.\n2. using the highest IP address of the router\u2019s loopback interfaces.\n3. using the highest IP address of the router\u2019s active physical interfaces.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q406",
  "num": 406,
  "question": "The OSPF Hello protocol performs which of the following tasks? (Choose two.)",
  "options": [
   "It provides dynamic neighbor discovery.",
   "It detects unreachable neighbors in 90 second intervals.",
   "It maintains neighbor relationships.",
   "It negotiates correctness parameters between neighboring interfaces.",
   "It uses timers to elect the router with the fastest links as the designated router.",
   "It broadcasts hello packets throughout the internetwork to discover all routers that are running OSPF."
  ],
  "correct": "AC",
  "explanation": "\uf147 \uf007 vadiminski Highly Voted \uf164 2 years, 4 months ago\nB: wrong, by default 40 seconds\nD: wrong, not only between neighbouring interfaces\nE: wrong, designated router is not elected based on its hello-response time, but on its priority / router ID\nF: wrong, multicast and not broadcast is used for hello packets\nThis leaves us with the correct answers A & B",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q407",
  "num": 407,
  "question": "What are two requirements for an HSRP group? (Choose two.)",
  "options": [
   "exactly one active router",
   "one or more standby routers",
   "one or more backup virtual routers",
   "exactly one standby active router",
   "exactly one backup virtual router"
  ],
  "correct": "AB",
  "explanation": "Exactly one active router: Only one Active Router per HSRP group will be elected based on highest priority. In case of equal priority, Highest IP\naddress will be elected as Active Router.\nOne or more standby routers: There can be one or more Standby Routers.\n\n\uf147 \uf007 hamish88 7 months, 1 week ago\nI also thought there should be only one Active router and only one standby router and the rest will remain in the listening state. However, as per\nthe following lines, it seems we can have more than one router in a standby state:\nHSRP uses an active/standby model in which one router actively assumes the role of the default gateway for devices on the subnet. One or more\nrouters on the same subnet are then in standby mode\nI also choose A and B.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q408",
  "num": 408,
  "question": "Which two pieces of information can you learn by viewing the routing table? (Choose two.)",
  "options": [
   "whether an ACL was applied inbound or outbound to an interface",
   "the EIGRP or BGP autonomous system",
   "whether the administrative distance was manually or dynamically configured",
   "which neighbor adjacencies are established",
   "the length of time that a route has been known"
  ],
  "correct": "CE",
  "explanation": "\uf147 \uf007 hokieman91 Highly Voted \uf164 2 years, 7 months ago\nI also thought D and E at first - but then forgot that adjacencies are shown with (confg)# sh ip (ospf, eigrp) neighbor\nMost logical is answer given (this is hoping and assuming that you would not manually input the same admin distance as an existing protocol on a\nroute - I see myself over thinking these answers....)",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q409",
  "num": 409,
  "question": "Refer to the exhibit. Which route type does the routing protocol Code D represent in the output?",
  "options": [
   "statically assigned route",
   "route learned through EIGRP",
   "724 route of a locally configured IP",
   "internal BGP route"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 Nhan Highly Voted \uf164 2 years, 6 months ago\nBecause the AD is 90",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q410",
  "num": 410,
  "question": "An engineer must configure an OSPF neighbor relationship between router R1 and R3. The authentication configuration has been configured and\nthe connecting interfaces are in the same 192.168.1.0/30 subnet. What are the next two steps to complete the configuration? (Choose two.)",
  "options": [
   "configure the interfaces as OSPF active on both sides",
   "configure both interfaces with the same area ID",
   "configure the hello and dead timers to match on both sides",
   "configure the same process ID for the router OSPF process",
   "configure the same router ID on both routing processes"
  ],
  "correct": "BC",
  "explanation": "\uf147 \uf007 klosinskil Highly Voted \uf164 2 years, 11 months ago\nA and B\ntimers match by default",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q411",
  "num": 411,
  "question": "Refer to the exhibit. A packet is being sent across router R1 to host 172.16.0.14. What is the destination route for the packet?",
  "options": [
   "209.165.200.250 via Serial0/0/0",
   "209.165.200.254 via Serial0/0/0",
   "209.165.200.254 via Serial0/0/1",
   "209.165.200.246 via Serial0/1/0"
  ],
  "correct": "D",
  "explanation": "The router will use the default route since there is no entry for the destination address/subnet entry in the routine table.\n\n\uf147 \uf007 Nhan Highly Voted \uf164 2 years, 6 months ago\nD is Right, it\u2019s use the default route since there is no entry for the destination address/subnet entry in the routine table.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q412",
  "num": 412,
  "question": "Refer to the exhibit. A packet is being sent across router R1 to host 172.16.3.14. To which destination does the router send the packet?",
  "options": [
   "207.165.200.246 via Serial0/1/0",
   "207.165.200.254 via Serial0/0/0",
   "207.165.200.250 via Serial0/0/0",
   "207.165.200.254 via Serial0/0/1"
  ],
  "correct": "D",
  "explanation": "The longest matching route to 172.16.3.14 is the 182.16.3.0/28 route, using Serial 0/0/1 with a next hop of 207.165.200.254.\n\n\uf147 \uf007 uevenasdf Highly Voted \uf164 2 years, 8 months ago\n172.16.3.14 routes to ospf route 172.16.3.0-16 /28 - D is correct",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q413",
  "num": 413,
  "question": "Refer to the exhibit. Router R2 is configured with multiple routes to reach network 10.1.1.0/24 from router R1. Which path is chosen by router R2\nto reach the destination network 10.1.1.0/24?",
  "options": [
   "static",
   "EIGRP",
   "eBGP",
   "OSPF"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 xsp Highly Voted \uf164 2 years, 7 months ago\nAdmin Distance:\nConnected - 0\nStatic - 1\neBGP - 5\niEIGRP - 90\nOSPF - 110\nIS-IS - 115\nRIP - 120\nSo yeah answer is correct based from AD of a statically configured route.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q414",
  "num": 414,
  "question": "Refer to the exhibit. What is the next hop address for traffic that is destined to host 10.0.1.5?",
  "options": [
   "Loopback 0",
   "10.0.1.4",
   "10.0.1.3",
   "10.0.1.50"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Imadolfo2019 Highly Voted \uf164 2 years, 5 months ago\nThe correct answer is line D.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q415",
  "num": 415,
  "question": "Refer to the exhibit. A network administrator assumes a task to complete the connectivity between PC A and the File Server. Switch A and Switch\nB have been partially configured with VLANs 10, 11, 12, and 13. What is the next step in the configuration?",
  "options": [
   "Add PC A to VLAN 10 and the File Server to VLAN 11 for VLAN segmentation",
   "Add VLAN 13 to the trunk links on Switch A and Switch B for VLAN propagation",
   "Add a router on a stick between Switch A and Switch B allowing for Inter-VLAN routing",
   "Add PC A to the same subnet as the File Server allowing for intra-VLAN communication"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 DonnerKomet Highly Voted \uf164 2 years ago\nbut ALL VLANs are allowed by default in trunks. It would not be needed to add the VLAN 13 in Switch B.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q417",
  "num": 417,
  "question": "R1 has learned route 192.168.12.0/24 via IS-IS, OSPF, RIP, and Internal EIGRP. Under normal operating conditions, which routing protocol is\ninstalled in the routing table?",
  "options": [
   "IS-IS",
   "Internal EIGRP",
   "RIP",
   "OSPF"
  ],
  "correct": "B",
  "explanation": "With the same route (prefix), the router will choose the routing protocol with lowest Administrative Distance (AD) to install into the routing table.\nThe AD of Internal\nEIGRP (90) is lowest so it would be chosen. The table below lists the ADs of popular routing protocols.\n\nNote: The AD of IS-IS is 115. The \u202b\u05d2\u202c\u20acEIGRP\u202b\u05d2\u202c\u20ac in the table above is \u202b\u05d2\u202c\u20acInternal EIGRP\u202b\u05d2\u202c\u20ac. The AD of \u202b\u05d2\u202c\u20acExternal EIGRP\u202b\u05d2\u202c\u20ac is 170. An EIGRP external\nroute is a route that was redistributed into EIGRP.\n\n\uf147 \uf007 Yunus_Empire 9 months, 2 weeks ago\nBecz EIGRP Has Lowest AD Value",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q418",
  "num": 418,
  "question": "Refer to the exhibit. The default-information originate command is configured under the R1 OSPF configuration. After testing, workstations on\nVLAN 20 at Site\nB cannot reach a DNS server on the Internet.\nWhich action corrects the configuration issue?",
  "options": [
   "Add the default-information originate command on R2.",
   "Add the always keyword to the default-information originate command on R1.",
   "Configure the ip route 0.0.0.0 0.0.0.0 10.10.10.18 command on R1.",
   "Configure the ip route 0.0.0.0 0.0.0.0 10.10.10.2 command on R2."
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Nhan Highly Voted \uf164 2 years, 6 months ago\nB cannot reach a DNS server on the Intern, there for the static route of the last resort should be configure to point to the internet, therefor the\ngiven answer is correct",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q419",
  "num": 419,
  "question": "Refer to the exhibit. With which metric was the route to host 172.16.0.202 learned?",
  "options": [
   "0",
   "110",
   "38443",
   "3184439"
  ],
  "correct": "C",
  "explanation": "Both the line \u202b\u05d2\u202c\u20acO 172.16.0.128/25\u202b\u05d2\u202c\u20ac and \u202b\u05d2\u202c\u20acS 172.16.0.0/24\u202b\u05d2\u202c\u20ac cover the host 172.16.0.202 but with the \u202b\u05d2\u202c\u20aclongest (prefix) match\u202b\u05d2\u202c\u20ac rule the\nrouter will choose the first route.\n\n\uf147 \uf007 uevenasdf Highly Voted \uf164 2 years, 8 months ago\nI'm assuming by metric it means to ignore the 110 OSPF AD and select the cost.\nA is wrong because the Static route doesn't reach 172.16.0.202\nB is wrong because that is the OSPF AD not metric.\nWhich leaves C/D...\nHost - 172.16.0.202 falls under OSPF 172.16.0.128/25\n202 in binary 11001[100] .200 - .207\n192 in binary 11000[000] .192 - .199\nWhich means the host can't reach the EIGRP route therefore the OSPF route is used and has a metric of 38443",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q420",
  "num": 420,
  "question": "A user configured OSPF in a single area between two routers. A serial interface connecting R1 and R2 is running encapsulation PPP. By default,\nwhich OSPF network type is seen on this interface when the user types show ip ospf interface on R1 or R2?",
  "options": [
   "nonbroadcast",
   "point-to-point",
   "point-to-multipoint",
   "broadcast"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 ayd33n Highly Voted \uf164 3 years, 1 month ago\nBroadcast default for Ethernet, Point to Point default for serial",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q421",
  "num": 421,
  "question": "Which MAC address is recognized as a VRRP virtual address?",
  "options": [
   "0000.5E00.010a",
   "0005.3709.8968",
   "0000.0C07.AC99",
   "0007.C070.AB01"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Kaygol Highly Voted \uf164 3 years, 2 months ago\nAnswer A - 1 VRRP over Ethernet. Over Ethernet, VRRP routers use a common MAC address of the format 00:00:5E: 00:01:XX. The first three octets\nare derived from the IANA's OUI. The next two octets (00:01) indicate the address block assigned to the VRRP protocol by IANA",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q422",
  "num": 422,
  "question": "Refer to the exhibit. The New York router is configured with static routes pointing to the Atlanta and Washington sites.\nWhich two tasks must be performed so that the Se0/0/0 interfaces on the Atlanta and Washington routers reach one another? (Choose two.)",
  "options": [
   "Configure the ipv6 route 2023::/126 2012::1 command on the Atlanta router.",
   "Configure the ipv6 route 2012::/126 2023::2 command on the Washington router.",
   "Configure the ipv6 route 2012::/126 2023::1 command on the Washington router.",
   "Configure the ipv6 route 2023::/126 2012::2 command on the Atlanta router.",
   "Configure the ipv6 route 2012::/126 s0/0/0 command on the Atlanta router."
  ],
  "correct": "BD",
  "explanation": "\uf147 \uf007 shumps 3 weeks, 2 days ago\nI was vex a bit, pay close attention to the New York router ipv6 address as next hop. B & D is correct",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q423",
  "num": 423,
  "question": "A router running EIGRP has learned the same route from two different paths. Which parameter does the router use to select the best path?",
  "options": [
   "as-path",
   "administrative distance",
   "metric",
   "cost"
  ],
  "correct": "D",
  "explanation": "If a router learns two different paths for the same network from the same routing protocol, it has to decide which route is better and will be\nplaced in the routing table. Metric is the measure used to decide which route is better (lower number is better). Each routing protocol uses its\nown metric.\nFor example, RIP uses hop counts as a metric, while OSPF uses cost.\nReference:\nhttps://study-ccna.com/administrative-distance-metric/\n\n\uf147 \uf007 Mcsonic00 Highly Voted \uf164 2 years, 10 months ago\n1 routing protocol for 2 learned paths = Metric\n1 learned path from 2 routing protocols = Administrative Distance",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q424",
  "num": 424,
  "question": "An engineer configured an OSPF neighbor as a designated router. Which state verifies the designated router is in the proper mode?",
  "options": [
   "Init",
   "2-way",
   "Exchange",
   "Full"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Demi_UY_Scuti Highly Voted \uf164 2 years, 10 months ago\nD is the correct answer. A DR or a BDR router will always need to reach a full state relationship with all neighbours (DROther included!) for correct\noperation. A 2-way state will only be considered correct and stable between two DROther routers.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q425",
  "num": 425,
  "question": "Refer to the exhibit. Which route does R1 select for traffic that is destined to 192.168.16.2?",
  "options": [
   "192.168.16.0/21",
   "192.168.16.0/24",
   "192.168.16.0/26",
   "192.168.16.0/27"
  ],
  "correct": "D",
  "explanation": "The destination IP addresses match all four entries in the routing table but the 192.168.16.0/27 has the longest prefix so it will be chosen. This\nis called the\n\u202b\u05d2\u202c\u20aclongest prefix match\u202b\u05d2\u202c\u20ac rule.\n\n\uf147 \uf007 Chocobo Highly Voted \uf164 2 years, 6 months ago\nD is correct.\nLongest prefix is prioritized over lower AD.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q426",
  "num": 426,
  "question": "Refer to the exhibit. If configuring a static default route on the router with the ip route 0.0.0.0 0.0.0.0 10.13.0.1 120 command, how does the\nrouter respond?",
  "options": [
   "It starts sending traffic without a specific matching entry in the routing table to GigabitEthernet0/1.",
   "It immediately replaces the existing OSPF route in the routing table with the newly configured static route.",
   "It starts load-balancing traffic between the two default routes.",
   "It ignores the new static route until the existing OSPF default route is removed."
  ],
  "correct": "D",
  "explanation": "Our new static default route has the Administrative Distance (AD) of 120, which is bigger than the AD of OSPF External route (O*E2) so it will\nnot be pushed into the routing table until the current OSPF External route is removed.\nFor your information, if you don't type the AD of 120 (using the command \u202b\u05d2\u202c\u20acip route 0.0.0.0 0.0.0.0 10.13.0.1\u202b\u05d2\u202c\u20ac) then the new static default\nroute would replace the\nOSPF default route as the default AD of static route is 1. You will see such line in the routing table:\nS* 0.0.0.0/0 [1/0] via 10.13.0.1\n\n\uf147 \uf007 sinear Highly Voted \uf164 2 years, 8 months ago\nYou really got to see the \"120\" here to not miss the right answer...",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q427",
  "num": 427,
  "question": "Refer to the graphic. R1 is unable to establish an OSPF neighbor relationship with R3. What are possible reasons for this problem? (Choose two.)",
  "options": [
   "All of the routers need to be configured for backbone Area 1.",
   "R1 and R2 are the DR and BDR, so OSPF will not establish neighbor adjacency with R3.",
   "A static route has been configured from R1 to R3 and prevents the neighbor adjacency from being established.",
   "The hello and dead interval timers are not set to the same values on R1 and R3.",
   "EIGRP is also configured on these routers with a lower administrative distance.",
   "R1 and R3 are configured in different areas."
  ],
  "correct": "DF",
  "explanation": "This question is to examine the conditions for OSPF to create neighborhood. So as to make the two routers become neighbors, each router\nmust be matched with the following items:\n1. The area ID and its types\n2. Hello and failure time interval timer\n3. OSPF Password (Optional)\n\n\uf147 \uf007 xdxp23 Highly Voted \uf164 2 years, 1 month ago\nI like D and E for this. How is F possible if you can clearly see them in the same area according to the graphic? Thoughts anyone?",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q428",
  "num": 428,
  "question": "Refer to the exhibit. Which command configures a floating static route to provide a backup to the primary link?",
  "options": [
   "ip route 209.165.200.224 255.255.255.224 209.165.202.129 254",
   "ip route 209.165.201.0 255.255.255.224 209.165.202.130",
   "ip route 0.0.0.0 0.0.0.0 209.165.200.224",
   "ip route 0.0.0.0 0.0.0.0 209.165.202.131"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 maw619 Highly Voted \uf164 2 years ago\nA is the only answer that is a static floating route.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q429",
  "num": 429,
  "question": "Refer to the exhibit. An engineer configured the New York router with static routes that point to the Atlanta and Washington sites. Which command\nmust be configured on the Atlanta and Washington routers so that both sites are able to reach the loopback2 interface on the New York router?",
  "options": [
   "ipv6 route::/0 Serial 0/0/0",
   "ipv6 route::/0 Serial 0/0/1",
   "ipv6 route:0/0 Serial 0/0/0",
   "ip route 0.0.0.0 0.0.0.0 Serial 0/0/0",
   "ipv6 route::/0 2000::2"
  ],
  "correct": "A",
  "explanation": "Reference:\nhttps://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_pi/configuration/xe-3s/iri-xe-3s-book/ip6-route-static-xe.html#GUID-85796C3A3143-4DF7-B9D08EC87D0DB08B\n\n\uf147 \uf007 kokoyul Highly Voted \uf164 1 year, 11 months ago\nThe static routes are:\nNetwork + Interface (Source interface) or Next Hop (IP Address Neighbor).\nSo, you have 4 possibilities:\nAtlanta = ipv6 route::/0 2012::2/126\nor\nAtlanta = ipv6 route::/0 Serial 0/0/0\n_______________________________________\nWashington= ipv6 route::/0 2023::2/126\nor\nWashington= ipv6 route::/0 Serial 0/0/0",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q430",
  "num": 430,
  "question": "What is the effect when loopback interfaces and the configured router ID are absent during the OSPF Process configuration?",
  "options": [
   "The lowest IP address is incremented by 1 and selected as the router ID.",
   "The router ID 0.0.0.0 is selected and placed in the OSPF process.",
   "No router ID is set, and the OSPF protocol does not run.",
   "The highest up/up physical interface IP address is selected as the router ID."
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 ccna_goat 11 months ago\nactually correct answer is poorly worded. interface could be in state UP/DOWN and still be eligible for being router ID.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q431",
  "num": 431,
  "question": "Refer to the exhibit. What is the metric of the route to the 192.168.10.33/28 subnet?",
  "options": [
   "84",
   "110",
   "128",
   "192",
   "193"
  ],
  "correct": "E",
  "explanation": "\uf147 \uf007 virab4 Highly Voted \uf164 4 months, 4 weeks ago\nSelected Answer: E\n\nremember my friend,be very very carefull on exam day",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q432",
  "num": 432,
  "question": "Refer to the exhibit. Traffic sourced from the loopback0 interface is trying to connect via ssh to the host at 10.0.1.15. What is the next hop to the\ndestination address?",
  "options": [
   "192.168.0.7",
   "192.168.0.4",
   "192.168.0.40",
   "192.168.3.5"
  ],
  "correct": "A",
  "explanation": "The router will choose the route will the longest matching prefix, in this case that is 10.0.1.0.28.\n\n\uf147 \uf007 dicksonpwc Highly Voted \uf164 2 years ago\nAnswer A is incorrect. If select 10.0.1.0/28 and subnet mask is 255.255.255.240. Then, host address range will be 10.10.1.1 to 10.10.1.14.\nTherefore, it coorrect answer should be B.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q433",
  "num": 433,
  "question": "When the active router in a VRRP group fails, which router assumes the role and forwards packets?",
  "options": [
   "forwarding",
   "standby",
   "backup",
   "listening"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 DaBest Highly Voted \uf164 1 year, 11 months ago\nHSRP usese Active/Standby\nVRRP usese Master/Backup\nthese roles are for the routers in the virtual group",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q434",
  "num": 434,
  "question": "Which action does the router take as it forwards a packet through the network?",
  "options": [
   "The router encapsulates the original packet and then includes a tag that identifies the source router MAC address and transmits it\ntransparently to the destination.",
   "The router encapsulates the source and destination IP addresses with the sending router IP address as the source and the neighbor IP\naddress as the destination.",
   "The router replaces the original source and destination MAC addresses with the sending router MAC address as the source and neighbor\nMAC address as the destination.",
   "The router replaces the source and destination labels with the sending router interface label as a source and the next hop router label as a\ndestination."
  ],
  "correct": "C",
  "explanation": "Reference:\nhttps://www.freeccnastudyguide.com/study-guides/ccna/ch4/ip-routing/\n\n\uf147 \uf007 DaBest Highly Voted \uf164 1 year, 11 months ago\nC is the correct answer , only mac address gets changed when forwarding, IP address always stays the same",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q435",
  "num": 435,
  "question": "Refer to the exhibit. Which two prefixes are included in this routing table entry? (Choose two.)",
  "options": [
   "192.168.1.17",
   "192.168.1.61",
   "192.168.1.64",
   "192.168.1.127",
   "192.168.1.254"
  ],
  "correct": "AB",
  "explanation": "\uf147 \uf007 netzwork Highly Voted \uf164 11 months, 1 week ago\nIf Cisco is wording questions like this, they should take a dive off a cliff",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q436",
  "num": 436,
  "question": "Which virtual MAC address is used by VRRP group 1?",
  "options": [
   "0504.0367.4921",
   "0007.c061.bc01",
   "0050.0c05.ad81",
   "0000.5E00.0101"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 DARKK Highly Voted \uf164 1 year, 3 months ago\nSelected Answer: D\n\nVRRP = 0000.5E00.01XX (XX = GROUP ID) -Answer D.\nHSRP V1 = 0000.0C07.ACXX (XX = GROUP ID)\nHSRP V2 = 0000.0C9F.FXXX (XXX = GROUP ID)\nGLBP = 0007.B400.XXYY (XX = GROUP ID) (YY = AVF ID)",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q437",
  "num": 437,
  "question": "What is the purpose of using First Hop Redundancy Protocol on a specific subnet?",
  "options": [
   "forwards multicast hello messages between routers",
   "sends the default route to the hosts on a network",
   "ensures a loop-free physical topology",
   "filters traffic based on destination IP addressing"
  ],
  "correct": "B",
  "explanation": "The routers in the FHRP group share a virtual MAC and Virtual IP and that acts as the Default Gateway for the HOSTS. It provides redundancy is\ncase a router fails, no need to change the default gateway information.\n\n\uf147 \uf007 Dante_Dan Highly Voted \uf164 1 year, 8 months ago\nWell, among the answers, A is the least incorrect, as I don't think that forwarding multicast hello messages between routers is the PURPOSE of\nusing a First Hop Redundancy Protocol.\nThe other answers refer to other protocols:\nAnswer B refers to a DHCP server\nAnswer C refers to STP\nAnswer D refers to ACL",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q438",
  "num": 438,
  "question": "Refer to the exhibit. Which configuration issue is preventing the OSPF neighbor relationship from being established between the two routers?",
  "options": [
   "R1 has an incorrect network command for interface Gi1/0.",
   "R2 should have its network command in area 1.",
   "R1 interface Gi1/0 has a larger MTU size.",
   "R2 is using the passive-interface default command."
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 oooMooo Highly Voted \uf164 2 years, 4 months ago\nYou can configure OSPF to ignore MTU size: ip ospf mtu-ignore",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q439",
  "num": 439,
  "question": "Refer to the exhibit. When router R1 is sending traffic to IP address 10.56.192.1, which interface or next hop address does it use to route the\npacket?",
  "options": [
   "10.56.0.1",
   "0.0.0.0/0",
   "Vlan57",
   "10.56.128.19"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 kentsing Highly Voted \uf164 1 year, 4 months ago\nLike other questions, barely not covered by network routes and falls to default route.\nA is correct.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q440",
  "num": 440,
  "question": "Refer to the exhibit. Load-balanced traffic is coming in from the WAN destined to a host at 172.16.1.190. Which next-hop is used by the router to\nforward the request?",
  "options": [
   "192.168.7.4",
   "192.168.7.7",
   "192.168.7.35",
   "192.168.7.40"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 DARKK 1 year, 3 months ago\nSelected Answer: C\n\nSimple way to look at it:\n/29 = 8 IPs, 182-191, 190 is the last Assignable IP on that Subnet, so /29 is picked because it is the Longest Prefix route INCLUSIVE of the IP\naddress. And the next hop IP for that is C. 192.168.7.35",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q441",
  "num": 441,
  "question": "What is a benefit of VRRP?",
  "options": [
   "It provides the default gateway redundancy on a LAN using two or more routers.",
   "It provides traffic load balancing to destinations that are more than two hops from the source.",
   "It prevents loops in a Layer 2 LAN by forwarding all traffic to a root bridge, which then makes the final forwarding decision.",
   "It allows neighbors to share routing table information between each other."
  ],
  "correct": "A",
  "explanation": "Reference:\nhttps://www.cisco.com/c/en/us/td/docs/routers/crs/software/crs_r4-0/addr_serv/configuration/guide/ic40crs1book_chapter10.html\n\n\uf147 \uf007 Nnandes Highly Voted \uf164 1 year, 4 months ago\nA is the correct",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q442",
  "num": 442,
  "question": "Refer to the exhibit. Routers R1 and R3 have the default configuration. The router R2 priority is set to 99. Which commands on R3 configure it as\nthe DR in the\n10.0.4.0/24 network?",
  "options": [
   "R3(config)#interface Gig0/0 R3(config-if)#ip ospf priority 100",
   "R3(config)#interface Gig0/0 R3(config-if)#ip ospf priority 1",
   "R3(config)#interface Gig0/1 R3(config-if)#ip ospf priority 0",
   "R3(config)#interface Gig0/1 R3(config-if)#ip ospf priority 100"
  ],
  "correct": "D",
  "explanation": "In the case of OSPF, 0 means you will never be elected as DR or BDR. Default priority is 1. Highest priority will be elected as the DR.\n\n\uf147 \uf007 Mili2023 7 months, 1 week ago\nanswer is A.\nAs we need to configure the opposite interface which is G0/0",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q443",
  "num": 443,
  "question": "Refer to the exhibit. A network engineer must configure R1 so that it sends all packets destined to the 10.0.0.0/24 network to R3, and all packets\ndestined to PC1 to R2. Which configuration must the engineer implement?",
  "options": [
   "R1(config)#ip route 10.0.0.0 255.255.255.0 172.16.0.2 R1(config)#ip route 10.0.0.5 255.255.255.255 192.168.0.2",
   "R1(config)#ip route 10.0.0.0 255.255.0.0 172.16.0.2 R1(config)#ip route 10.0.0.5 255.255.255.255 192.168.0.2",
   "R1(config)#ip route 10.0.0.0 255.255.255.0 192.168.0.2 R1(config)#ip route 10.0.0.5 255.255.255.255 172.16.0.2",
   "R1(config)#ip route 10.0.0.0 255.255.0.0 192.168.0.2 R1(config)#ip route 10.0.0.5 255.255.255.0 172.16.0.2"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 shumps 3 weeks, 1 day ago\nC is correct. Another part was left behind,\ni feel like this question has to parts. the path from PC1 to router 2, though they is no static answer for it in the given answers",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q444",
  "num": 444,
  "question": "Refer to the exhibit. All traffic enters the CPE router from interface Serial0/3 with an IP address of 192.168.50.1. Web traffic from the WAN is\ndestined for a LAN network where servers are load-balanced. An IP packet with a destination address of the HTTP virtual IP of 192.168.1.250\nmust be forwarded. Which routing table entry does the router use?",
  "options": [
   "192.168.1.0/24 via 192.168.12.2",
   "192.168.1.128/25 via 192.168.13.3",
   "192.168.1.192/26 via 192.168.14.4",
   "192.168.1.224/27 via 192.168.15.5"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Augusto2332 Highly Voted \uf164 10 months ago\nDont get confused by reading first part of questions, basically CCNA exam creators want you to focus in the beginning of the question which has\nnothing to do with finding the answer. You need to keep reading until the last part of the question.\nThis dumps are good way to practice, thanks a lot guys",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q445",
  "num": 445,
  "question": "Refer to the exhibit. An engineer assumes a configuration task from a peer. Router A must establish an OSPF neighbor relationship with neighbor\n172.1.1.1. The output displays the status of the adjacency after 2 hours. What is the next step in the configuration process for the routers to\nestablish an adjacency?",
  "options": [
   "Configure router A to use the same MTU size as router B.",
   "Configure a point-to-point link between router A and router B.",
   "Set the router B OSPF ID to the same value as its IP address.",
   "Set the router B OSPF ID to a nonhost address."
  ],
  "correct": "A",
  "explanation": "Reference:\nhttps://www.cisco.com/c/en/us/support/docs/ip/open-shortest-path-first-ospf/13684-12.html#neighbors\n\n\uf147 \uf007 Wilasky Highly Voted \uf164 1 year, 4 months ago\nIn Exstart/Exchange State, when attempting to run OSPF between a Cisco router and another vendor's router. If the router with the higher MTU\nsends a packet larger that the MTU set on the neighboring router, the neighboring router ignores the packet.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q446",
  "num": 446,
  "question": "Refer to the exhibit. Which two configurations must the engineer apply on this network so that R1 becomes the DR? (Choose two.)",
  "options": [
   "R3(config)#interface fastethernet 0/0 R3(config-if)#ip ospf priority 0",
   "R1(config)#router ospf 1 R1(config-router)#router-id 192.168.100.1",
   "R1(config)#interface fastethernet 0/0 R1(config-if)#ip ospf priority 200",
   "R1(config)#interface fastethernet 0/0 R1(config-if)#ip ospf priority 0",
   "R3(config)#interface fastethernet 0/0 R3(config-if)#ip ospf priority 200"
  ],
  "correct": "AC",
  "explanation": "\uf147 \uf007 SVN05 Highly Voted \uf164 1 year, 3 months ago\nAnswer A is settings router 3 to have priority 0(0 means they are not allowed to participate in DR/BDR election)\nAnswer C is making R1 to have a higher priority(default is 1 but putting very high number is only for safety reasons to ensure that the R1 is elected\nDR)",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q447",
  "num": 447,
  "question": "Refer to the exhibit. Which command configures OSPF on the point-to-point link between routers R1 and R2?",
  "options": [
   "router-id 10.0.0.15",
   "neighbor 10.1.2.0 cost 180",
   "network 10.0.0.0 0.0.0.255 area 0",
   "ip ospf priority 100"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Sal34 Highly Voted \uf164 1 year, 3 months ago\nThe subnet mask seems wrong. Because the wildcard for a /30 should be 0.0.0.3, not 0.0.0.255.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q448",
  "num": 448,
  "question": "Refer to the exhibit. A network engineer is in the process of establishing IP connectivity between two sites. Routers R1 and R2 are partially\nconfigured with IP addressing. Both routers have the ability to access devices on their respective LANs. Which command set configures the IP\nconnectivity between devices located on both LANs in each site?",
  "options": [
   "R1 ip route 192.168.1.1 255.255.255.0 GigabitEthernet0/1 R2 ip route 10.1.1.1 255.255.255.0 GigabitEthernet0/1",
   "R1 ip route 192.168.1.0 255.255.255.0 GigabitEthernet0/0 R2 ip route 10.1.1.1 255.255.255.0 GigabitEthernet0/0",
   "R1 ip route 0.0.0.0 0.0.0.0 209.165.200.225 R2 ip route 0.0.0.0 0.0.0.0 209.165.200.226",
   "R1 ip route 0.0.0.0 0.0.0.0 209.165.200.226 R2 ip route 0.0.0.0 0.0.0.0 209.165.200.225"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 SVN05 Highly Voted \uf164 1 year, 3 months ago\nAnswer D is correct as it is stating any route goes through next hop of 2019.165.200.226(for R1) while any route next hops to 209.165.200.225(On\nR2)\nAnswer A and B are not correct as the question states that both routers can access their respective LANs thus having a static route in each own\nLAN makes no sense.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q449",
  "num": 449,
  "question": "Refer to the exhibit. Which next-hop IP address does Router1 use for packets destined to host 10.10.13.158?",
  "options": [
   "10.10.10.9",
   "10.10.10.5",
   "10.10.11.2",
   "10.10.12.2"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 TechJ Highly Voted \uf164 3 months, 2 weeks ago\nSelected Answer: A\n\nI cant believe there is multiple people answer B, how is the host address 158 included in 10.10.13.160 network address????",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q450",
  "num": 450,
  "question": "Refer to the exhibit. Packets received by the router from BGP enter via a serial interface at 209.165.201.1. Each route is present within the routing\ntable. Which interface is used to forward traffic with a destination IP of 10.1.1.19?",
  "options": [
   "F0/0",
   "F0/1",
   "F0/4",
   "F0/3"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 DUMPledore 7 months, 3 weeks ago\nSelected Answer: A\n\nthis if for \"forwarding traffic\" so longest prefix or more specific route",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q451",
  "num": 451,
  "question": "Refer to the exhibit. Which route must be configured on R1 so that OSPF routing is used when OSPF is up, but the server is still reachable when\nOSPF goes down?",
  "options": [
   "ip route 10.1.1.10 255.255.255.255 gi0/0 125",
   "ip route 10.1.1.0 255.255.255.0 172.16.2.2 100",
   "ip route 10.1.1.0 255.255.255.0 gi0/1 125",
   "ip route 10.1.1.10 255.255.255.255 172.16.2.2 100"
  ],
  "correct": "A",
  "explanation": "This is an example of a floating static route when the Administrative Distance must be greater than the primary route. Currently the OSPF AD for\nthe route is 110, so if that route was to go away then this route with an AD of 125 would be used.\n\n\uf147 \uf007 Netcmd Highly Voted \uf164 10 months ago\nSelected Answer: A\n\nAnswer C is wrong because it uses the wrong interface id",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q452",
  "num": 452,
  "question": "Refer to the exhibit. What is the next hop for traffic entering R1 with a destination of 10.1.2.126?",
  "options": [
   "10.165.20.126",
   "10.165.20.146",
   "10.165.20.166",
   "10.165.20.226"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Liquid_May 3 weeks, 4 days ago\nSelected Answer: C\n\nThe last route should be the one that is used, because it is the longest prefix that will match the ip. Therefore, C would be the answer in this case.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q453",
  "num": 453,
  "question": "Refer to the exhibit. Which prefix did router R1 learn from internal EIGRP?",
  "options": [
   "192.168.3.0/24",
   "192.168.1.0/24",
   "172.16.1.0/24",
   "192.168.2.0/24"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Mili2023 7 months, 3 weeks ago\nyou can also get the answer as the AD for internal EIGRP is 90. and External in 170 so in the question they have asked the internal EIGRP which is\nonly with ip address in D.\nthe AD for OSPF is110 so options A and B is out of question anyway!",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q454",
  "num": 454,
  "question": "Refer to the exhibit. R5 is the current DR on the network, and R4 is the BDR. Their interfaces are flapping, so a network engineer wants the OSPF\nnetwork to elect a different DR and BDR. Which set of configurations must the engineer implement?",
  "options": [
   "R4(config)#interface gi0/0 R4(config-if)#ip ospf priority 20 R5(config)#interface gi0/0 R5(config-if)#ip ospf priority 10",
   "R5(config)#interface gi0/0 R5(config-if)#ip ospf priority 120 R4(config)#interface gi0/0 R4(config-if)#ip ospf priority 110",
   "R3(config)#interface gi0/0 R3(config-if)#ip ospf priority 255 R2(config)#interface gi0/0 R2(config-if)#ip ospf priority 240",
   "R2(config)#interface gi0/0 R2(config-if)#ip ospf priority 259 R3(config)#interface gi0/0 R3(config-if)#ip ospf priority 256"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 mda2h 2 months, 2 weeks ago\nSelected Answer: C\n\nMax priority is 255 and all routers here have priority 1. DR/BDR election's based on highest priority!",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q455",
  "num": 455,
  "question": "Refer to the exhibit. Web traffic is coming in from the WAN interface. Which route takes precedence when the router is processing traffic destined\nfor the LAN network at 10.0.10.0/24?",
  "options": [
   "via next-hop 10.0.1.5",
   "via next-hop 10.0.1.4",
   "via next-hop 10.0.1.50",
   "via next-hop 10.0.1.100"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 RougePotatoe Highly Voted \uf164 10 months, 3 weeks ago\nI really need someone to explain to me how there is an OSPF and EIGRP entry for the same network in this routing table.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q456",
  "num": 456,
  "question": "Refer to the exhibit. A packet sourced from 10.10.10.1 is destined for 10.10.8.14. What is the subnet mask of the destination route?",
  "options": [
   "255.255.254.0",
   "255.255.255.240",
   "255.255.255.248",
   "255.255.255.252"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 Tomasek1234 6 months, 3 weeks ago\nSelected Answer: B\n\nB is correct",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q457",
  "num": 457,
  "question": "Refer to the exhibit. An engineer must configure router R2 so it is elected as the DR on the WAN subnet. Which command sequence must be\nconfigured?",
  "options": [
   "interface gigabitethernet0/0 ip address 10.0.0.34 255.255.255.248 ip ospf priority 0",
   "interface gigabitethernet0/0 ip address 10.0.0.34 255.255.255.224 ip ospf priority 100",
   "interface gigabitethernet0/0 ip address 10.0.1.1 255.255.255.0 ip ospf priority 255",
   "interface gigabitethernet0/0 ip address 10.0.1.1 255.255.255.224 ip ospf priority 98"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 shumps 3 weeks ago\nplease pay close attention to details 10.0.0.34",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q458",
  "num": 458,
  "question": "An engineer is configuring router R1 with an IPv6 static route for prefix 2019:C15C:0CAF:E001::/64. The next hop must be\n2019:C15C:0CAF:E002::1. The route must be reachable via the R1 Gigabit 0/0 interface. Which command configures the designated route?",
  "options": [
   "R1(config-if)#ip route 2019:C15C:0CAF:E001::/64 GigabitEthernet 0/0",
   "R1(config)#ip route 2019:C15C:0CAF:E001::/64 GigabitEthernet 0/0",
   "R1(config-if)#ipv6 route 2019:C15C:0CAF:E001::/64 2019:C15C:0CAF:E002::1",
   "R1(config)#ipv6 route 2019:C15C:0CAF:E001::/64 2019:C15C:0CAF:E002::1"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Swiz005 Highly Voted \uf164 5 months, 2 weeks ago\nSelected Answer: D\n\nC is incorrect because the command is entered in the interface R1(config-if). The default route must be entered in the glocal config. Making D the\ncorrect answer.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q459",
  "num": 459,
  "question": "Refer to the exhibit. Which IPv6 configuration is required for R17 to successfully ping the WAN interface on R18?",
  "options": [
   "R17# ! no ip domain lookup ip cef ipv6 cef ! interface FastEthernet0/0 no ip address duplex auto speed auto ipv6 address\n2001:DB8:2::201/64 ! Interface FastEthernet1/0 no ip address duplex auto speed auto ipv6 address 2001:DB8:3::201/64 ! no cdp log mismatch\nduplex ipv6 route 2001:DB8:4::/64 2001:DB8:4::302",
   "R17# ! no ip domain lookup ip cef ipv6 unicast-routing ! interface FastEthernet0/0 no ip address duplex auto speed auto ipv6 address\n2001:DB8:2::201/64 ! Interface FastEthernet1/0 no ip address duplex auto speed auto ipv6 address 2001:DB8:3::201/64 ! no cdp log mismatch\nduplex ipv6 route 2001:DB8:4::/64 2001:DB8:3::301",
   "R17# ! no ip domain lookup ip cef ! interface FastEthernet0/0 no ip address duplex auto speed auto ipv6 address 2001:DB8:3::201/64 !\nInterface FastEthernet1/0 no ip address duplex auto speed auto ipv6 address 2001:DB8:2::201/64 ! no cdp log mismatch duplex ipv6 route\n2001:DB8:4::/64 2001:DB8:5::101",
   "R17# ! no ip domain lookup ip cef ipv6 unicast-routing ! interface FastEthernet0/0 no ip address duplex auto speed auto ipv6 address\n2001:DB8:2::201/64 ! Interface FastEthernet1/0 no ip address duplex auto speed auto ipv6 address 2001:DB8:3::201/64 ! no cdp log mismatch\nduplex ipv6 route 2001:DB8:4::/64 2001:DB8:2::201"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 tui9 Highly Voted \uf164 8 months, 4 weeks ago\nA whole load of useless text, check the ipv6 route command in the last bit. :)",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q460",
  "num": 460,
  "question": "Refer to the exhibit. A company is configuring a failover plan and must implement the default routes in such a way that a floating static route will\nassume traffic forwarding when the primary link goes down. Which primary route configuration must be used?",
  "options": [
   "ip route 0.0.0.0 0.0.0.0 192.168.0.2",
   "ip route 0.0.0.0 0.0.0.0 192.168.0.2 GigabitEthernet1/0",
   "ip route 0.0.0.0 0.0.0.0 192.168.0.2 floating",
   "ip route 0.0.0.0 0.0.0.0 192.168.0.2 tracked"
  ],
  "correct": "A",
  "explanation": "The primary route should use the default administrative distance, since the AD for static routes is 1.\n\n\uf147 \uf007 Dutch012 Highly Voted \uf164 6 months, 3 weeks ago\nSelected Answer: A\n\nNot B, A is the answer.\na fully specified route is written like that\ndest IP | interface | next-hop",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q461",
  "num": 461,
  "question": "OSPF must be configured between routers R1 and R2. Which OSPF configuration must be applied to router R1 to avoid a DR'BDR election?",
  "options": [
   "router ospf 1 network 192.168.1.1 0.0.0.0 area 0 interface e1/1 ip address 192.168.1.1 255.255.255.252 ip ospf cost 0",
   "router ospf 1 network 192.168.1.1 0.0.0.0 area 0 hello interval 15 interface e1/1 ip address 192.168.1.1 255.255.255.252",
   "router ospf 1 network 192.168.1.1 0.0.0.0 area 0 interface e1/1 ip address 192.168.1.1 255.255.255.252 ip ospf network broadcast",
   "router ospf 1 network 192.168.1.1 0.0.0.0 area 0 interface e1/1 ip address 192.168.1.1 255.255.255.252 ip ospf network point-to-point"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 motop9 Highly Voted \uf164 11 months, 2 weeks ago\nPoint-to-point has no DR/BDR election.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q462",
  "num": 462,
  "question": "Refer to the exhibit. An engineer is updating the R1 configuration to connect a new server to the management network. The PCs on the\nmanagement network must be blocked from pinging the default gateway of the new server. Which command must be configured on R1 to\ncomplete the task?",
  "options": [
   "R1(config)#ip route 172.16.2.0.255.255.255.0 192.168.1.15",
   "R1(config)#ip route 172.16.2.2 255.255.255.248 gi0/1",
   "R1(config)#ip route 172.16.2.2 255.255.255.255 gi0/0",
   "R1(config)#ip route 172.16.2.0 255.255.255.0 192.168.1.5"
  ],
  "correct": "C",
  "explanation": "By specifying the outgoing interface and not the next hop IP address, the Management devices will be able to ping the new server, but not the\ndefault gateway of the server.\n\n\uf147 \uf007 splashy Highly Voted \uf164 8 months ago\nSelected Answer: C\n\nThe fact that you specify a host route is the reason you cannot ping any other host than the server in that subnet. Not that you specified the egress\ninterface instead of the next hop address.\nI tried both scenarios in PT with a host route and they give exactly the same result, as to be expected.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q463",
  "num": 463,
  "question": "Refer to the exhibit. Router R1 currently is configured to use R3 as the primary route to the internet, and the route uses the default administrative\ndistance settings. A network engineer must configure R1 so that it uses R2 as a backup, but only if R3 goes down. Which command must the\nengineer configure on R1 so that it correctly uses R2 as a backup route, without changing the administrative distance configuration on the link to\nR3?",
  "options": [
   "ip route 0.0.0.0 0.0.0.0 209.165.201.5.10",
   "ip route 0.0.0.0 0.0.0.0 g0/1 1",
   "ip route 0.0.0.0 0.0.0.0 209.165.200.226 1",
   "ip route 0.0.0.0 0.0.0.0 g0/1 6"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Vikramaditya_J Highly Voted \uf164 4 months, 1 week ago\nSelected Answer: D\n\nImportant thing to take note of is, the syntax for creating a default static route or connected static route uses the exit interface or output interface\nof source device (that\u2019s the interface on which all packets are sent to the destination network). Some of us may confuse and think to use Gi0/0\ninterface on R3 in the command, but the interface to configure the backup route here must use the exit interface on the R1 itself i.e. Gi0/1. So\ncommand will be:\nip route 0.0.0.0 0.0.0.0 g0/1 6 (\"6\" here is AD that's greater than the connected route's AD i.e., 1)",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q464",
  "num": 464,
  "question": "Refer to the exhibit. Which action must be taken to ensure that router A is elected as the DR for OSPF area 0?",
  "options": [
   "Configure the router A interfaces with the highest OSPF priority value within the area",
   "Configure router B and router C as OSPF neighbors of router A",
   "Configure the OSPF priority on router A with the lowest value between the three routers.",
   "Configure router A with a fixed OSPF router ID"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 no_blink404 2 months, 3 weeks ago\nThe answer is A. You would want to configure the priority as close to the maximum (255) to ensure election as DR.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q465",
  "num": 465,
  "question": "Refer to the exhibit. Packets received by the router from BGP enter via a serial interface at 209.165.201.10. Each route is present within the\nrouting table. Which interface is used to forward traffic with a destination IP of 10.10 10 24?",
  "options": [
   "F0/10",
   "F0/11",
   "F0/12",
   "F0/1"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 raul_kapone 3 weeks ago\nSelected Answer: B\n\nBEAUTIFUL QUESTION!\nBetter than the Cisco tricky questions that seem made for a SAW movie.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q466",
  "num": 466,
  "question": "Refer to the exhibit. If OSPF is running on this network, how does Router2 handle traffic from Site B to 10.10.13.128/25 at Site A?",
  "options": [
   "It sends packets out of interface Fa0/1.",
   "It sends packets out of interface Fa0/2.",
   "It load-balances traffic out of Fa0/1 and Fa0/2.",
   "It is unreachable and discards the traffic."
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 DoBronx Highly Voted \uf164 10 months, 3 weeks ago\nSelected Answer: D\n\n10.10.13.0/25 encompasses .1-.127 and there is no default route configured so answer given is correct",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q467",
  "num": 467,
  "question": "Refer to the exhibit. Router R1 resides in OSPF Area 0. After updating the R1 configuration to influence the paths that it will use to direct traffic, an\nengineer verified that each of the four Gigabit interfaces has the same route to 10 10.0.0/16.\nWhich interface will R1 choose to send traffic to reach the route?",
  "options": [
   "GigabitEthernet0/0",
   "GigabitEthernet0/1",
   "GigabitEthernet0/2",
   "GigabitEthernet0/3"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 splashy Highly Voted \uf164 11 months, 3 weeks ago\nSelected Answer: B\n\nref BW 100000 MB\nref BW BW\nG0/0\n100000MB divided by 10000MB (or 10000000KB) = 10 cost\nG0/1\n100000MB divided by 100000MB (or 100000000KB) = 1 cost",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q468",
  "num": 468,
  "question": "Refer to the exhibit. Which network prefix was learned via EIGRP?",
  "options": [
   "172.160.0/16",
   "207.165.200.0/24",
   "192.168.1.0/24",
   "192.168.2.0/24"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Eyad_Alotaibi Highly Voted \uf164 9 months, 1 week ago\nD = EIGRP\nC = connected\nS = static\nI = IGRP\nR = RIP\nB = BGP\nO = OSPF\nE = EGP\ni = IS-IS\n* = default route",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q469",
  "num": 469,
  "question": "Refer to the exhibit. Which command must be issued to enable a floating static default route on router A?",
  "options": [
   "ip route 0.0.0.0 0.0.0.0 192.168.1.2 10",
   "ip route 0.0.0.0 0.0.0.0 192.168.1.2",
   "ip default-gateway 192.168.2.1",
   "ip route 0.0.0.0 0.0.0.0 192.168.2.1 10"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Customexit Highly Voted \uf164 11 months, 3 weeks ago\nSelected Answer: A\n\nA & D are the only answers with a configured distance metric (10).\nA floating static route is meant to be a backup.\nThe current route has a route traveling through Router B.\nSo it would make sense we have our backup (floating static route) going through Router C with a metric higher than a default route (1).",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q470",
  "num": 470,
  "question": "Refer to the exhibit. Which configuration allows routers R14 and R86 to form an OSPFv2 adjacency while acting as a central point for exchanging\nOSPF information between routers?",
  "options": [
   "R14# interface FastEthernet0/0 ip address 10.73.65.65 255.255.255.252 ip ospf network broadcast ip ospf priority 0 ip mtu 1400 router\nospf 10 router-id 10.10.1.14 network 10.10.1.14 0.0.0.0 area0 network 10.73.65.64 0.0.0.3 area0 R86# interface Loopback0 ip address\n10.10.1.86 255.255.255.255 interface FastEthernet0/0 ip address 10.73.65.66 255.255.255.252 ip ospf network broadcast ip mtu 1500 router\nospf 10 router-id 10.10.1.86 network 10.10.1.86 0.0.0.0 area 0 network 10.73.65.64 0.0.0.3 area 0",
   "R14# interface Loopback0 ip ospf 10 area 0 interface FastEthernet0/0 ip address 10.73.65.65 255.255.255.252 ip ospf network broadcast\nip ospf 10 area 0 ip mtu 1500 router ospf 10 ip ospf priority 255 router-id 10.10.1 14 R86# interface Loopback0 ip ospf 10 area 0 interface\nFastEthernet0/0 ip address 10.73.65.66 255.255.255.252 ip ospf network broadcast ip ospf 10 area 0 ip mtu 1500 router ospf 10 router-id\n10.10.1.86",
   "R14# interface FastEthernet0/0 ip address 10.73.65.65 255.255.255.252 ip ospf network broadcast ip ospf priority 255 ip mtu 1500 router\nospf 10 router-id 10.10.1.14 network 10.10.1.14 0.0.0.0 area0 network 10.73.65.64 0.0.0.3 area0 R86# interface FastEthernet0/0 ip address\n10.73.65.66 255.255.255.252 ip ospf network broadcast ip mtu 1500 router ospf 10 router-id 10.10.1.86 network 10.10.1.86 0.0.0.0 area 0\nnetwork 10.73.65.64 0.0.0.3 area 0",
   "R14# interface FastEthernet0/0 ip address 10.73.65.65 255.255.255.252 ip ospf network broadcast ip ospf priority 255 ip mtu 1500 router\nospf 10 router-id 10.10.1.14 network 10.10.1.14 0.0.0.0 area0 network 10.73.65.64 0.0.0.3 area0 R86# interface FastEthernet0/0 ip address\n10.73.65.66 255.255.255.252 ip ospf network broadcast ip mtu 1400 router ospf 10 router-id 10.10.1.86 network 10.10.1.86 0.0.0.0 area 0\nnetwork 10.73.65.64 0.0.0.3 area 0"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Sutokuto Highly Voted \uf164 12 months ago\nAnybody else just want to keep scrolling when you see answer choices like this?",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q471",
  "num": 471,
  "question": "Refer to the exhibit. When an administrator executes the show ip route command on router D to view its routing table, which value is displayed for\nthe administrative distance for the route to network 192.168 1.0?",
  "options": [
   "110",
   "120",
   "170",
   "90"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 EngrRex Highly Voted \uf164 11 months, 3 weeks ago\nA is correct because when EIGRP is redistributed the new AD will be 170 (external EIGRP) making OSPF the lowest AD available. Redistribution topic\nis in CCNP",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q472",
  "num": 472,
  "question": "Refer to the exhibit Routers R1 and R2 have been configured with their respective LAN interfaces. The two circuits are operational and reachable\nacross WAN.\nWhich command set establishes failover redundancy if the primary circuit goes down?",
  "options": [
   "R1(config)#ip route 0.0.0.0 0.0.0.0 10.10.10.6 R2(config)#ip route 0.0.0.0 0.0.0.0 10.10.10.5",
   "R1(config)#ip route 10.10.13.10 255.255.255.255 10.10.10.2 R2(config)#ip route 192.168.0.100 255.255.255.255 10.10.10.1",
   "R1(config)#ip route 10.10.13.10 255.255.255.255 10.10.10.6 R2(config)#ip route 192.168.0.100 255.255.255.255 10.10.10.5",
   "R1(config)#ip route 0.0.0.0 0.0.0.0 10.10.10.6 2 R2(config)#ip route 0.0.0.0 0.0.0.0 10.10.10.5 2"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 ananinamia 1 week, 6 days ago\nwhy is ending with 2",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q473",
  "num": 473,
  "question": "Refer to the exhibit. R1 learns all routes via OSPF. Which command configures a backup static route on R1 to reach the 192.168.20 0/24 network\nvia R3?",
  "options": [
   "R1(config)#ip route 192.168.20.0 255.255.255.0 192.168.30.2 111",
   "R1(config)#ip route 192.168.20.0 255.255.255.0 192.168.30.2 90",
   "R1(config)#ip route 192.168.20.0 255.255.0.0 192.168.30.2",
   "R1(config)#ip route 192.168.20.0 255.255.255.0 192.168.30.2"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 [Removed] 2 months, 3 weeks ago\nSelected Answer: A\n\nA is correct. We need to configure a backup static route so the OSPF administative distance needs to be higher than the default one (110) so 111\nwill make it.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q474",
  "num": 474,
  "question": "Refer to the exhibit. R1 has taken the DROTHER role in the OSPF DR/BDR election process. Which configuration must an engineer implement so\nthat R1 is elected as the DR?",
  "options": [
   "R1(config)#interface FastEthernet 0/0 R1(config-if)#ip ospf priority 1 R1#clear ip ospf process",
   "R3(config)#interface FastEthernet 0/1 R3(config-if)#ip ospf priority 200 R3#clear ip ospf process",
   "R2(config)#interface FastEthernet 0/2 R2(config-if)#ip ospf priority 1 R2#clear ip ospf process",
   "R1(config)#interface FastEthernet 0/0 R1(config-if)#ip ospf priority 200 R1#clear ip ospf process"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 RidzV 6 months, 4 weeks ago\nWe want R1 to be DR here. Considering all 3 routers are set to use default values for OSPF priority (I.e. value 1) and selection has happened on the\nbasis of highest router ID (highest IP address of its interface), R1 is currently selected as DROTHER. To make it DR, it needs to have the highest\npriority. Hence correct answer is D from the given options.\nReason: On LANs, DR and BDR have to be elected. Two rules are used to elect a DR and BDR:\nrouter with the highest OSPF priority will become a DR. By default, all routers have a priority of 1.\nif there is a tie, a router with the highest router ID wins the election. The router with the second highest OSPF priority or router ID will become a\nBDR.\nhttps://study-ccna.com/designated-backup-designated-router/",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q475",
  "num": 475,
  "question": "Which SDN plane forwards user-generated traffic?",
  "options": [
   "Management plane",
   "Control plane",
   "Policy plane",
   "Data plane"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Danishh 2 months, 1 week ago\nSelected Answer: D\n\nData Plane - also called forwarding plane which forwards user data/traffic from one interface to another are part of the data plane.\nAlso de-encapsulates the original layer 2 header, and re-encapsulates with a new headser destined for the next hop's MAC address.\nNAT is the part of the Data Plane.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q476",
  "num": 476,
  "question": "An application in the network is being scaled up from 300 servers to 600. Each server requires 3 network connections to support production,\nbackup, and management traffic. Each connection resides on a different subnet. The router configuration for the production network must be\nconfigured first using a subnet in the 10.0.0.0/8 network. Which command must be configured on the interface of the router to accommodate the\nrequirements and limit wasted IP address space?",
  "options": [
   "ip address 10.10.10.1 255.255.254.0",
   "ip address 10.10.10.1 255.255.252.0",
   "ip address 10.10.10.1 255.255.240.0",
   "ip address 10.10.10.1 255.255.255.240"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 splashy Highly Voted \uf164 12 months ago\nSelected Answer: B\n\nWe need to be able to put 600 hosts 3 different dedicated subnets.\nSo not 300 existing servers in one subnet and 300 new servers in the next subnet, belonging to production only for example. The subnets must be\ndedicated.\n/22 is the only solution for each subnet.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q477",
  "num": 477,
  "question": "Refer to the exhibit. Which interface is chosen to forward traffic to the host at 192.168.0.55?",
  "options": [
   "GigabitEthernet0/3",
   "Null0",
   "GigabitEthernet0/1",
   "GigabitEthernet0/2"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 RaselAhmedIT Highly Voted \uf164 6 months, 4 weeks ago\nI think Longest Prefix (192.168.0.0/24) is connected via 10.0.12.2 (Static) & 10.0.12.0/24 is connected via G0/1.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q478",
  "num": 478,
  "question": "Refer to the exhibit. The administrator must configure a floating static default route that points to 2001:db8:1234:2::1 and replaces the current\ndefault route only if it fails. Which command must the engineer configure on the CPE?",
  "options": [
   "ipv6 route ::/0 2001:db8:1234:2::1 3",
   "ipv6 route ::/128 2001:db8:1234:2::1 3",
   "ipv6 route ::/0 2001:db8:1234:2::1 1",
   "ipv6 route ::/0 2001:db8:1234:2::1 2"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Goena Highly Voted \uf164 7 months, 2 weeks ago\nSelected Answer: A\n\nAnswer A:\n- AD has to be higher then 2 so 3.\n- Default route is ::/0\nipv6 route ::/0 2001:db8:1234:2::1 3",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q479",
  "num": 479,
  "question": "Refer to the exhibit. Router OldR is replacing another router on the network with the intention of having OldR and R2 exchange routes. After the\nengineer applied the initial OSPF configuration, the routes were still missing on both devices. Which command sequence must be issued before\nthe clear IP ospf process command is entered to enable the neighbor relationship?",
  "options": [
   "OldR(config)#interface g0/0/0 OldR(config-if)#ip ospf hello-interval 15",
   "OldR(config)#router ospf 1 OldR(config-router)#network 192.168.1.0 255.255.255.0 area 2",
   "OldR(config)#interface g0/0/0 OldR(config-if)#ip ospf dead-interval 15",
   "OldR(config)#router ospf 1 OldR(config-router)#no router-id 192.168.1.1"
  ],
  "correct": "D",
  "explanation": "With OSPF each router must have a unique router ID. Here we see that both routers have a router ID of 192.168.1.1. Removing the router-id\ncommand on the\nOldR will force it to use one of its actual interface IP addresses as the router ID.\n\n\uf147 \uf007 BieLey Highly Voted \uf164 11 months, 3 weeks ago\nSelected Answer: D\n\nCan even do this with the power elimination\nHello = matched\nDead = matched\nArea = matches\nJust 1 answer left!",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q481",
  "num": 481,
  "question": "Refer to the exhibit. What is the subnet mask for route 172.16.4.0?",
  "options": [
   "255.255.255.192",
   "255.255.254.0",
   "255.255.248.0",
   "255.255.240.0"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Chongste 1 month, 1 week ago\n/21 is 21 bit for network address, so 21 bits = (16 + 5 )bits 255.255 takes up 16bits, another 5 bits = 1111000 = 248. hence /21 = 1111 1111 . 1111\n1111 . 1111 1000 . 0000 0000 = 255.255.248.0",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q482",
  "num": 482,
  "question": "Refer to the exhibit. A static route must be configured on R14 to forward traffic for the 172.21.34.0/25 network that resides on R86. Which\ncommand must be used to fulfill the request?",
  "options": [
   "ip route 172.21.34.0 255.255.255.192 10.73.65.65",
   "ip route 172.21.34.0 255.255.255.128 10.73.65.66",
   "ip route 172.21.34.0 255.255.255.0 10.73.65.65",
   "ip route 172.21.34.0 255.255.128.0 10.73.65.64"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 Thaier 1 month, 2 weeks ago\nSelected Answer: B\n\nThe way i see it it, these routes will not work any way on R14, cause the destination network is directly connected.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q483",
  "num": 483,
  "question": "Refer to the exhibit. The network engineer is configuring router R2 as a replacement router on the network. After the initial configuration is applied,\nit is determined that R2 failed to show R1 as a neighbor. Which configuration must be applied to R2 to complete the OSPF configuration and\nenable it to establish the neighbor relationship with R1?",
  "options": [
   "R2(config)#router ospf 1 R2(config-router)#network 192.168.1.0 255.255.255.0 area 2",
   "R2(config)#interface g0/0/0 R2(config-if)#ip ospf hello-interval 10",
   "R2(config)#interface g0/0/0 R2(config-if)#ip ospf dead-interval 40",
   "R2(config)#router ospf 1 R2(config-router)#router-id 192.168.1.2"
  ],
  "correct": "C",
  "explanation": "For OSPF the hello and dead timers must match to become neighbors. R1 is configured with a dead time of 40 seconds, while R2 is set to 45\nseconds.\n\n\uf147 \uf007 Shanku97 2 weeks ago\nis it okay to have different wait timing in two router ?",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q484",
  "num": 484,
  "question": "Refer to the exhibit. All interfaces are configured with duplex auto and ip ospf network broadcast. Which configuration allows routers R14 and R86\nto form an\nOSPFv2 adjacency and act as a central point for exchanging OSPF information between routers?",
  "options": [
   "R14# interface FastEthernet0/0 ip address 10.73.65.65 255.255.255.252 ip ospf priority 255 ip mtu 1500 router ospf 10 router-id\n10.10.1.14 network 10.10.1.14 0.0.0.0 area 0 network 10.73.65.64 0.0.0.3 area 0 R86# interface FastEthernet0/0 ip address 10.73.65.66\n255.255.255.252 ip mtu 1400 router ospf 10 router-id 10.10.1.86 network 10.10.1.86 0.0.0.0 area 0 network 10.73.65.64 0.0.0.3 area 0",
   "R14# interface Loopback0 ip ospf 10 area 0 interface FastEthernet0/0 ip address 10.73.65.65 255.255.255.252 ip ospf 10 area 0 ip mtu\n1500 router ospf 10 ip ospf priority 255 router-id 10.10.1.14 R86# interface Loopback0 ip ospf 10 area 0 interface FastEthernet0/0 ip address\n10.73.65.66 255.255.255.252 ip ospf 10 area 0 ip mtu 1500 router ospf 10 router-id 10.10.1.86",
   "R14# interface FastEthernet0/0 ip address 10.73.65.65 255.255.255.252 ip ospf priority 0 ip mtu 1500 router ospf 10 router-id 10.10.1.14\nnetwork 10.10.1.14 0.0.0.0 area 0 network 10.73.65.64 0.0.0.3 area 0 R86# interface FastEthernet0/0 ip address 10.73.65.66\n255.255.255.252 ip mtu 1500 router ospf 10 router-id 10.10.1.86 network 10.10.1.86 0.0.0.0 area 0 network 10.73.65.64 0.0.0.3 area 0",
   "R14# interface Loopback0 ip ospf 10 area 0 interface FastEthernet0/0 ip address 10.73.65.65 255.255.255.252 ip ospf priority 255 ip ospf\n10 area 0 ip mtu 1500 router ospf 10 router-id 10.10.1.14 R86# interface Loopback0 ip ospf 10 area 0 interface FastEthernet0/0 ip address\n10.73.65.66 255.255.255.252 ip ospf 10 area 0 ip mtu 1500 router ospf 10 router-id 10.10.1.86"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 joondale Highly Voted \uf164 1 year ago\nSelected Answer: D\n\nGoing with D\nA is wrong because ip mtu of R14 and R86 are different\nB is wrong because because ip ospf priority is configured inside router-config, it should be on the interface\nC is wrong because ip ospf priority is 0 on R14 and it makes R14 not participate on ospf dr/bdr election, the network type is broadcast so i assume\ndr/bdr should be elected otherwise the network type should be point-to-point\nD is correct answer - because mtu are same for both routers, participates in dr/bdr election",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q485",
  "num": 485,
  "question": "A packet from a company's branch office is destined to host 172.31.0.1 at headquarters. The sending router has three possible matches in its\nrouting table for the packet: prefixes 172.31.0.0/16, 172.31.0.0/24, and 172.31.0.0/25. How does the router handle the packet?",
  "options": [
   "It sends the traffic via prefix 172.31.0.0/24.",
   "It sends the traffic via prefix 172.31.0.0/16.",
   "It sends the traffic via prefix 172.31.0.0/25.",
   "It sends the traffic via the default gateway 0.0.0.0/0."
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Goh0503 Highly Voted \uf164 10 months, 3 weeks ago\nAnswer: C\nhow a router makes a forwarding decision by\na Longest match >>b Administrative distance >>c Routing protocol metric, in this order",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q486",
  "num": 486,
  "question": "Refer to the exhibit. An engineer is asked to configure router R1 so that it forms an OSPF single-area neighbor relationship with R2. Which\ncommand sequence must be implemented to configure the router?",
  "options": [
   "router ospf 100 network 10.0.0.0 0.0.0.252 area0 network 10.0.1.0 0.0.0.255 area0",
   "router ospf 100 network 10.0.0.0 0.0.0.3 area0 network 10.0.2.0 255.255.255.0 area0",
   "router ospf 10 network 10.0.0.0 0.0.0.3 area0 network 10.0.1.0 0.0.0.255 area0",
   "router ospf 10 network 10.0.0.0 0.0.0.3 area0 network 10.0.2.0 0.0.0.255 area0"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Sdiego Highly Voted \uf164 7 months, 3 weeks ago\nSelected Answer: C\n\nForget about that comment, R1 advertises his networks, so C is correct.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q487",
  "num": 487,
  "question": "Refer to the exhibit. All routers in the network are configured. R2 must be the DR. After the engineer connected the devices, R1 was elected as the\nDR. Which command sequence must be configured on R2 to be elected as the DR in the network?",
  "options": [
   "R2(config)#intergface gi0/0 R2(config-if)#ip ospf priority 100",
   "R2(config)#router ospf 1 R2(config-router)#router-id 192.168.2.7",
   "R2(config)#router ospf 1 R2(config-router)#router-id 10.100.100.100",
   "R2(config)#intergface gi0/0 R2(config-if)#ip ospf priority 1"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 all4one 3 months, 2 weeks ago\nSelected Answer: A\n\nR1 was initially elected as the DR because they would have the same priority by default (1). The next step in the election process would be the\nhighest IP address which R1 has over R2. Thus, setting the priority of R2 to 100 would elect it as DR. The highest priority wins for DR once it is\nwithin scope.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q488",
  "num": 488,
  "question": "Refer to the exhibit. The router R1 is in the process of being configured. Routers R2 and R3 are configured correctly for the new environment.\nWhich two commands must be configured on R1 for PC1 to communicate to all PCs on the 10.10.10.0/24 network? (Choose two.)",
  "options": [
   "ip route 10.10.10.0 255.255.255.0 192.168.2.3",
   "ip route 10.10.10.10 255.255.255.255 192.168.2.2",
   "ip route 10.10.10.10 255.255.255.255 g0/1",
   "ip route 10.10.10.8 255.255.255.248 g0/1",
   "ip route 10.10.10.0 255.255.255.248 192.168.2.2"
  ],
  "correct": "AE",
  "explanation": "\uf147 \uf007 Freddy01 Highly Voted \uf164 9 months, 4 weeks ago\nA is 100% correct while the confusion between B and E is down to people missing two important differences for those two options. B is a direct\nhost route and it will show up in the routing table as 10.10.10.10/32 and it is called a host route. Hence subnet mask being 255.255.255.255.\nWhereas, E option does NOT cover the host 10.10.10.10 address as if you calculate the subnet range for the subnet in option E it only goes up to\n10.10.10.0 - 10.10.10.6 and .7 being its broadcast address. It's incrementing in blocks of 8 as the subnet mask clearly states 255.255.255.248 or /29.\nSo, how exactly the router would send traffic to host .10 which is NOT even in the subnet range. Therefore, option E route will NEVER reach .10 host\nhanging off that router.\nCorrect answer is A is the network route and B is direct host route, hope this helps :)",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q489",
  "num": 489,
  "question": "Refer to the exhibit. What is the subnet mask of the route to the 10.10.13.160 prefix?",
  "options": [
   "255.255.255.240",
   "255.255.255.128",
   "255.255.248.0",
   "255.255.255.248"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 dozer86 Highly Voted \uf164 5 months, 2 weeks ago\nD THE DESTINATION IS THE NETWORK 10.10.13.160 WITH MASK /29 WHICH IS THE ANSWER D. THE OTHER ROUTES DO NOT COVER THE\nNETWORK.160",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q490",
  "num": 490,
  "question": "Refer to the exhibit. Which two commands, when configured on router R1, fulfill these requirements? (Choose two.)\n\u2711 Packets toward the entire network 2001:db8:23::/64 must be forwarded through router R2.\nPackets toward host 2001:db8:23::14 preferably must be forwarded through R3.",
  "options": [
   "ipv6 route 2001:db8:23::/128 fd00:12::2",
   "ipv6 route 2001:db8:23::14/128 fd00:13::3",
   "ipv6 route 2001:db8:23::/64 fd00:12::2",
   "ipv6 route 2001:db8:23::14/64 fd00:12::2 200",
   "ipv6 route 2001:db8:23::14/64 fd00:12::2"
  ],
  "correct": "BC",
  "explanation": "\uf147 \uf007 Cynthia2023 1 month ago\nSelected Answer: BC\n\nGive answers are correct",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q491",
  "num": 491,
  "question": "Refer to the exhibit. Traffic from R1 to the 10.10.2.0/24 subnet uses 192.168.1.2 as its next hop. A network engineer wants to update the R1\nconfiguration so that traffic with destination 10.10 2.1 passes through router R3, and all other traffic to the 10.10.2.0/24 subnet passes through\nR2. Which command must be used?",
  "options": [
   "ip route 10.10.2.1 255.255.255.255 192.168.1.4115",
   "ip route 10.10.2.0 255.255.255.0 192.168.1.4115",
   "ip route 10.10.2.0 255.255.255.0 192.168.1.4100",
   "ip route 10.10.2.1 255.255.255.255192.168.1.4100"
  ],
  "correct": "D",
  "explanation": "Here we need to add a host route for the specific 10.10.2.1 host, which means using a subnet mask of 255.255.255.255. We also need to\nconfigure an\nAdministrative Distance that is less than the default OSPF AD of 115.\n\n\uf147 \uf007 EliasM Highly Voted \uf164 10 months, 4 weeks ago\nI dont understand why A and D are different. Host routes (/32) win because they have the longest prefix. Here, both A and D include the\ndestination host, but they differ on AD. If you set the AD to 115, its higher than OSPF (110) but it will still prefer the longest prefix route, so i believe\nthat A and D are both correct in this scenario. Correct me if im wrong.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q492",
  "num": 492,
  "question": "Refer to the exhibit. The image server and client A are running an application that transfers an extremely high volume of data between the two. An\nengineer is configuring a dedicated circuit between R1 and R2. Which set of commands must the engineer apply to the routers so that only traffic\nbetween the image server and client A is forces to use the new circuit?",
  "options": [
   "R1(config)#ip route 10.10.13.10 255.255.255.255 10.10.10.6 R2(config)#ip route 192.168.0.100 255.255.255.255 10.10.10.5",
   "R1(config)#ip route 10.10.13.10 255.255.255.128 10.10.10.6 R2(config)#lp route 192.168.0.100 255.255.255.0 10.10.10.5",
   "R1(config)#ip route 10.10.13.10 255.255.255.252 10.10.10.6 R2(config)#tp route 192.168.0.100 255.255.255.252 10.10.10.5",
   "R1(config)#ip route 10.10.13.10 255.255.255.255 10.10.10.2 R2(config)#ip route 192.168.0.100 255.255.255.255 10.10.10.1"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 splashy Highly Voted \uf164 12 months ago\nSelected Answer: A\n\nD is \"old\" circuit\nSomebody really needs to clean the answers for the new questions tbh...",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q493",
  "num": 493,
  "question": "Refer to the exhibit. An engineer is checking the routing table in the main router to identify the path to a server on the network. Which route does\nthe router use to reach the server at 192.168.2.2?",
  "options": [
   "S 192.168.0.0/20 [1/0] via 10.1.1.1",
   "S 192.168.2.0/29 [1/0] via 10.1.1.1",
   "S 192.168.2.0/28 [1/0] via 10.1.1.1",
   "S 192.168.1.0/30 [1/0] via 10.1.1.1"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 FALARASTA 4 months, 2 weeks ago\nSOmeone to explain why /30 is wrong",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q494",
  "num": 494,
  "question": "Refer to the exhibit. An OSPF neighbor relationship must be configured using these guidelines:\n\u2711 R1 is only permitted to establish a neighbor with R2.\n\u2711 R1 will never participate in DR elections.\n\u2711 R1 will use a router-id of 10.1.1.1.\nWhich configuration must be used?",
  "options": [
   "B.",
   "C.\n\nTopic 1\n\n\fD.",
   "Topic 1\n\n\fD."
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 g_mindset Highly Voted \uf164 1 year ago\nOSPF uses port 89 and does not use a transport protocol. A is the answer.\nEIGRP port 88.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q495",
  "num": 495,
  "question": "Refer to the exhibit. What is the prefix length for the route that router1 will use to reach host A?",
  "options": [
   "/25",
   "/27",
   "/28",
   "/29"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 divn_01 1 month, 2 weeks ago\nThe correct Answer is C\nThe route selected by R1 is 10.10.13.208/29 but the prefix for that route is the 10.10.10.0/28 network prefix . Therefore, /28 . Please correct me if im\nwrong",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q496",
  "num": 496,
  "question": "Refer to the exhibit. After applying this configuration to router R1, a network engineer is verifying the implementation. If all links are operating\nnormally, and the engineer sends a series of packets from PC1 to PC3, how are the packets routed?",
  "options": [
   "They are distributed sent round robin to interfaces S0/0/0 and S0/0/1",
   "They are routed to 10.0.0.2",
   "They are routed to 192.168.100.2",
   "They are routed to 172.16.20.2"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 papinski Highly Voted \uf164 7 months, 1 week ago\nSelected Answer: D\n\nD is correct.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q497",
  "num": 497,
  "question": "Refer to the exhibit. When router R1 receives a packet with destination IP address 10.56.0.62, through which interface does it route the packet?",
  "options": [
   "Vlan58",
   "Null0",
   "Vlan59",
   "Vlan60"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 blue91235 Highly Voted \uf164 8 months, 1 week ago\nAnswer A is the longest prefix and 62 inclusive in /26",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q498",
  "num": 498,
  "question": "Refer to the exhibit. How much OSPF be configured on the GigabitEthernet0/0 interface of the neighbor device to achieve the destined neighbor\nrelationship?",
  "options": [
   "Router(config)#interface GigabitEthernet 0/0 Router(config-if)#ip ospf cost 5",
   "Router(config)#interface GigabitEthernet 0/0 Router(config-if)#ip ospf priority 1",
   "Router(config)#interface GigabitEthernet 0/0 Router(config-if)#ip ospf area 2",
   "Router(config)#interface GigabitEthernet 0/0 Router(config-if)#ip ospf network point-to-point"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 raul_kapone 2 weeks, 6 days ago\nNice question:\n1st imagine - Router is in a Broadcast network, and it is participating in a DR/BDR election.\n2nd imagine - Router is configured with a Point-to-point network, thus it desn't participate in a DR/BDR election, and it acquire a priority of 0.",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q499",
  "num": 499,
  "question": "An engineer just installed network 10.120.10.0/24. Which configuration must be applied to the R14 router to add the new network to its OSPF\nrouting table?",
  "options": [
   "Router ospf 100 Network 10.120.10.0 0.0.0.255 area 0",
   "Router ospf 120 Network 10.120.10.0 255.255.255.0 area 0 Ip route 10.120.10.0 255.255.255.0 fa0/1",
   "Router ospf 100 area 0 Network 10.120.10.0 0.0.0.255",
   "Router ospf 100 Network 10.120.10.0 255.255.255.0 area 0"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 shubhambala Highly Voted \uf164 1 year ago\nSelected Answer: A\n\nthe answer is A and not D because OSPF configuration needs wildcard(inverted bits)",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-2_q500",
  "num": 500,
  "question": "What are two benefits of FHRPs? (Choose two.)",
  "options": [
   "They allow encrypted traffic",
   "They prevent loops in the Layer 2 network.",
   "They are able to bundle multiple ports to increase bandwidth",
   "They enable automatic failover of the default gateway",
   "They allow multiple devices to serve as a single virtual gateway for clients in the network"
  ],
  "correct": "DE",
  "explanation": "\uf147 \uf007 papibarbu 8 months, 2 weeks ago\nyes my man",
  "topic": "1",
  "deck": "examtopics-2"
 },
 {
  "id": "examtopics-3_q1002",
  "num": 1002,
  "question": "Which benefit does Cisco DNA Center provide over traditional campus management?",
  "options": [
   "Cisco DNA Center automates HTTPS for secure web access, and traditional campus management uses HTTP.",
   "Cisco DNA Center leverages SNMPv3 for encrypted management, and traditional campus management uses SNMPv2.",
   "Cisco DNA Center leverages APIs, and traditional campus management requires manual data gathering.",
   "Cisco DNA Center automates SSH access for encrypted entry, and SSH is absent from traditional campus management."
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 [Removed] 2 months, 1 week ago\nSelected Answer: C\n\nC. Cisco DNA Center leverages APIs, and traditional campus management requires manual data gathering.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1003",
  "num": 1003,
  "question": "How does Chef configuration management enforce a required device configuration?",
  "options": [
   "The Chef Infra Server uses its configured cookbook to push the required configuration to the remote device requesting updates.",
   "The installed agent on the device connects to the Chef Infra Server and pulls its required configuration from the cookbook.",
   "The Chef Infra Server uses its configured cookbook to alert each remote device when it is time for the device to pull a new configuration.",
   "The installed agent on the device queries the Chef Infra Server and the server responds by pushing the configuration from the cookbook."
  ],
  "correct": "D",
  "explanation": "B (95%)\n\n5%\n\n\uf147 \uf007 sdmejia01 Highly Voted \uf164 6 months, 3 weeks ago\nSelected Answer: B\n\nI think the answer is B. The client pulls the configuration from the server. Check the Cheft section here:\nhttps://study-ccna.com/configuration-management-tools-ansible-chef-puppet/",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1004",
  "num": 1004,
  "question": "What is the PUT method within HTTP?",
  "options": [
   "It replaces data at the destination.",
   "It is a nonidempotent operation.",
   "It is a read-only operation.",
   "It displays a web site."
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Bhrino 3 months, 4 weeks ago\nReplaces is synonomous to update in the CRUD model\nCreate\nRead\nUpdate\nDelete\nit matches up",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1005",
  "num": 1005,
  "question": "Which advantage does the network assurance capability of Cisco DNA Center provide over traditional campus management?",
  "options": [
   "Cisco DNA Center leverages YANG and NETCONF to assess the status of fabric and nonfabric devices, and traditional campus management\nuses CLI exclusively.",
   "Cisco DNA Center handles management tasks at the controller to reduce the load on infrastructure devices, and traditional campus\nmanagement uses the data backbone.",
   "Cisco DNA Center automatically compares security postures among network devices, and traditional campus management needs manual\ncomparisons.",
   "Cisco DNA Center correlates information from different management protocols to obtain insights, and traditional campus management\nrequires manual analysis."
  ],
  "correct": "A",
  "explanation": "D (100%)\n\n\uf147 \uf007 sdmejia01 Highly Voted \uf164 6 months, 3 weeks ago\nI would go with D.\nhttps://www.cisco.com/c/dam/en/us/solutions/collateral/enterprise-networks/digital-network-architecture/nb-06-cisco-dna-assurance-technicalebook-cte-en.pdf",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1006",
  "num": 1006,
  "question": "Refer to the exhibit. In which structure does the word \u201cwarning\u201d directly reside?",
  "options": [
   "array",
   "object",
   "Boolean",
   "string"
  ],
  "correct": "B",
  "explanation": "A (100%)\n\n\uf147 \uf007 ukguy Highly Voted \uf164 6 months, 3 weeks ago\narray is right answer",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1007",
  "num": 1007,
  "question": "What is the purpose of a southbound API in a controller-based networking architecture?",
  "options": [
   "facilitates communication between the controller and the applications",
   "allows application developers to interact with the network",
   "integrates a controller with other automation and orchestration tools",
   "facilitates communication between the controller and the networking hardware"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 Yannik123 1 month, 2 weeks ago\nSelected Answer: D\n\nD is correct.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1009",
  "num": 1009,
  "question": "Which two northbound APIs are found in a software-defined network? (Choose two.)",
  "options": [
   "REST",
   "OpenFlow",
   "SOAP",
   "NETCONF",
   "OpFlex"
  ],
  "correct": "AD",
  "explanation": "AC (74%)\n\nAD (26%)\n\n\uf147 \uf007 oatmealturkey Highly Voted \uf164 6 months, 3 weeks ago\nSelected Answer: AC\n\nNETCONF is a Southbound API used to configure network devices.\nhttps://ipcisco.com/lesson/netconf-overview/#:~:text=NETCONF%20Protocol%20is%20used%20in,Plane%20and%20the%20Control%20Plane.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1010",
  "num": 1010,
  "question": "Which function generally performed by a traditional network device is replaced by a software-defined controller?",
  "options": [
   "building route tables and updating the forwarding table",
   "encapsulation and decapsulation of packets in a data-link frame",
   "changing the source or destination address during NAT operations",
   "encryption and decryption for VPN link processing"
  ],
  "correct": "D",
  "explanation": "A (100%)\n\n\uf147 \uf007 oatmealturkey Highly Voted \uf164 6 months, 3 weeks ago\nSelected Answer: A\n\nAnswer is A, every other choice is a function of the data plane.\nhttps://www.ciscopress.com/articles/article.asp?p=2995354&seqNum=2",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1011",
  "num": 1011,
  "question": "What describes a northbound REST API for SDN?",
  "options": [
   "network-element-facing interface for GET, POST, PUT, and DELETE methods",
   "application-facing interface for SNMP GET requests",
   "application-facing interface for GET, POST, PUT, and DELETE methods",
   "network-element-facing interface for the control and data planes"
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 Yannik123 1 month, 2 weeks ago\nSelected Answer: C\n\nC is Correct",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1012",
  "num": 1012,
  "question": "When is the PUT method used within HTTP?",
  "options": [
   "to update a DNS server",
   "when a nonidempotent operation is needed",
   "to display a web site",
   "when a read-only operation is required"
  ],
  "correct": "B",
  "explanation": "A (94%)\n\n6%\n\n\uf147 \uf007 oatmealturkey Highly Voted \uf164 7 months ago\nSelected Answer: A\n\nPlease correct.\n\"Standard REST methods are supported on the API, which includes POST, GET, PUT, and DELETE operations through HTTP. The PUT methods are\nidempotent, meaning that there is no additional effect if they are called more than once with the same input parameters. The GET method is\nnullipotent, meaning that it can be called zero or more times without making any changes (or that it is a read-only operation).\"\nhttps://www.cisco.com/c/en/us/td/docs/switches/datacenter/aci/aci_multi-site/sw/1x/rest_api_config/b_Cisco_ACI_MultiSite_REST_Configuration_Guide/b_Cisco_ACI_Multi-Site_REST_Config_Guide_chapter_01.pdf",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1013",
  "num": 1013,
  "question": "Which two HTTP methods are suitable for actions performed by REST-based APIs? (Choose two.)",
  "options": [
   "REMOVE",
   "REDIRECT",
   "POST",
   "GET",
   "POP"
  ],
  "correct": "CD",
  "explanation": "CD (100%)\n\n\uf147 \uf007 sdmejia01 Highly Voted \uf164 6 months, 3 weeks ago\nSelected Answer: CD\n\nC and D are correct!",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1014",
  "num": 1014,
  "question": "What is the advantage of separating the control plane from the data plane within an SDN network?",
  "options": [
   "limits data queries to the control plane",
   "reduces cost",
   "decreases overall network complexity",
   "offloads the creation of virtual machines to the data plane"
  ],
  "correct": "D",
  "explanation": "C (82%)\n\nA (18%)\n\n\f\uf147 \uf007 sdmejia01 Highly Voted \uf164 6 months, 3 weeks ago\nI would go with C.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1015",
  "num": 1015,
  "question": "Refer to the exhibit. What is missing from this output for it to be executed?",
  "options": [
   "double quotes (\" \") around the \"Cisco Devices\" string",
   "exclamation point (!) at the beginning of each line",
   "square bracket ( [ ) at the beginning",
   "curly braket ( } ) at the end"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 ac89l Highly Voted \uf164 4 months ago\neasiest question without having a knowledge",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1016",
  "num": 1016,
  "question": "What is a function of a northbound API in an SDN environment?",
  "options": [
   "It relies on global provisioning and configuration.",
   "It upgrades software and restores files.",
   "It supports distributed processing for configuration.",
   "It provides orchestration and network automation services."
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 Goena Highly Voted \uf164 6 months, 2 weeks ago\nSelected Answer: D\n\nAnswer D is correct:\nSoftware-Defined Networking (SDN) \u2013 is a higher level of network orchestration. It was originally intended to separate the control-plane and dataplane to enable higher operational efficiency in networking layer devices through programmable forwarding tables (like via the OpenFlow protocol)",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1017",
  "num": 1017,
  "question": "What is an Ansible inventory?",
  "options": [
   "unit of Python code to be executed within Ansible",
   "file that defines the target devices upon which commands and tasks are executed",
   "device with Ansible installed that manages target devices",
   "collection of actions to perform on target devices, expressed in YAML format"
  ],
  "correct": "B",
  "explanation": "B (54%)\n\nD (46%)\n\n\uf147 \uf007 NetworkGeek00 1 month, 1 week ago\nSelected Answer: B\n\nAnswer is B. use to define the target devices (ssh enabled) and it can write in .ini and .yml formats.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1019",
  "num": 1019,
  "question": "What is a function of a northbound API?",
  "options": [
   "It relies on global provisioning and configuration.",
   "It upgrades software and restores files.",
   "It supports distributed processing for configuration.",
   "It provides a path between an SDN controller and network applications."
  ],
  "correct": "A",
  "explanation": "D (100%)\n\n\uf147 \uf007 sdmejia01 Highly Voted \uf164 6 months, 3 weeks ago\nI would go with D.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1020",
  "num": 1020,
  "question": "Refer to the exhibit. What does apple represent within the JSON data?",
  "options": [
   "array",
   "object",
   "number",
   "string"
  ],
  "correct": "B",
  "explanation": "D (68%)\n\nA (24%)\n\n8%\n\n\uf147 \uf007 sdmejia01 Highly Voted \uf164 6 months, 3 weeks ago\napple represent a key which is not even in the answers.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1022",
  "num": 1022,
  "question": "Under the CRUD model, which two HTTP methods support the UPDATE operation? (Choose two.)",
  "options": [
   "PATCH",
   "DELETE",
   "GET",
   "POST",
   "PUT"
  ],
  "correct": "AE",
  "explanation": "AE (100%)\n\n\uf147 \uf007 UAE7 Highly Voted \uf164 6 months, 2 weeks ago\nanswer is correct",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1023",
  "num": 1023,
  "question": "A network architect is considering whether to implement Cisco DNA Center to deploy devices on a new network. The organization is focused on\nreducing the time it currently takes to deploy devices in a traditional campus design. For which reason would Cisco DNA Center be more\nappropriate than traditional management options?",
  "options": [
   "Cisco DNA Center supports deployment with a single pane of glass.",
   "Cisco DNA Center provides zero-touch provisioning to third-party devices.",
   "Cisco DNA Center reduces the need for analytics on third-party access points and devices.",
   "Cisco DNA Center minimizes the level of syslog output when reporting on Cisco devices."
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 mageknight Highly Voted \uf164 6 months, 3 weeks ago\nThe statement \"Cisco DNA Center supports deployment with a single pane of glass\" means that Cisco DNA Center provides a unified, centralized\nplatform for managing and deploying network infrastructure. In other words, it offers a single point of access for managing all aspects of the\nnetwork, such as network devices, applications, security policies, and network services.\nThe term \"single pane of glass\" is often used to describe a management tool that provides a unified view of multiple systems or components. In\nthe context of network infrastructure, this means that instead of using separate tools to manage different parts of the network, such as switches,\nrouters, wireless access points, and security appliances, network administrators can use Cisco DNA Center to manage them all from a single\ninterface.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1025",
  "num": 1025,
  "question": "In a cloud-computing environment, what is rapid elasticity?",
  "options": [
   "control and monitoring or resource consumption by the tenant",
   "automatic adjustment of capacity based on need",
   "pooling resources in a multitenant model based on need",
   "self-service of computing resources by the tenant"
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 Goena 6 months, 2 weeks ago\nSelected Answer: B\n\nAnswer B is correct:\nRapid elasticity in cloud computing refers to the cloud\u2019s capability to scale quickly to meet demand. Consumers benefit from rapid elasticity\nbecause they can expand or reduce their resources how and when they would like.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1026",
  "num": 1026,
  "question": "Which interface enables communication between a program on the controller and a program on the networking device?",
  "options": [
   "software virtual interface",
   "tunnel interface",
   "northbound interface",
   "southbound interface"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 krzysiew 3 months, 3 weeks ago\nSelected Answer: D\n\nThe interface that enables communication between a program on the controller and a program on the networking device is typically referred to as\na \"southbound interface.\"\nChatGpt",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1027",
  "num": 1027,
  "question": "Refer to the exhibit. How many arrays are present in the JSON data?",
  "options": [
   "one",
   "three",
   "six",
   "nine"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 Danthemann 1 month ago\nmore of an eye exam than anything",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1029",
  "num": 1029,
  "question": "Which interface type enables an application running on a client to send data over an IP network to a server?",
  "options": [
   "northbound interface",
   "application programming interface",
   "southbound interface",
   "Representational State Transfer application programming interface"
  ],
  "correct": "B",
  "explanation": "B (58%)\n\nA (42%)\n\n\uf147 \uf007 JJY888 Highly Voted \uf164 6 months, 1 week ago\nSelected Answer: A\n\nAPI = Application Programmable Interface. Yes, it uses the Northbound interface but it is an API that is traveling over the Northbound.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1031",
  "num": 1031,
  "question": "Which QoS feature drops traffic that exceeds the committed access rate?",
  "options": [
   "policing",
   "FIFO",
   "shaping",
   "weighted fair queuing"
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 [Removed] 2 months, 2 weeks ago\nSelected Answer: A\n\nA. policing",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1032",
  "num": 1032,
  "question": "What does traffic shaping do?",
  "options": [
   "It queues excess traffic",
   "It sets QoS attributes within a packet",
   "It organizes traffic into classes",
   "It modifies the QoS attributes of a packet"
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 Goena Highly Voted \uf164 6 months, 2 weeks ago\nSelected Answer: A\n\nA is correct:\nTraffic policing and traffic shaping have the following differences: Traffic policing directly discards packets with rates that are greater than the traffic\npolicing rate. Traffic shaping, however, buffers packets with rates that are greater than the traffic shaping rate and sends the buffered packets at an\neven rate.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1033",
  "num": 1033,
  "question": "Refer to the exhibit. A Cisco engineer is asked to update the configuration on switch 1 so that the EtherChannel stays up when one of the links\nfails. Which configuration meets this requirement?",
  "options": [
   "Switch1(config) # interface Fa0/0\nSwitch1(config-if) # lacp port-priority 100\nSwitch1(config) # interface Fa0/1\nSwitch1(config-if) # lacp port-priority 200",
   "Switch1(config) # interface port-channel 1\nSwitch1(config-if) # port-channel min-links 1",
   "Switch1(config) # interface Fa0/0\nSwitch1(config-if) # lacp port-priority 200\nSwitch1(config) # interface Fa0/1\nSwitch1(config-if) # lacp port-priority 100",
   "Switch1(config) # interface port-channel 1\nSwitch1(config-if) # lacp max-bundle 1"
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 ike110 Highly Voted \uf164 6 months, 2 weeks ago\nmin-links command specifies the minimum number of interfaces that the configuration mode LAG requires to be active. If there are fewer ports\nthan specified by this command, the port channel interface does not become active.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1034",
  "num": 1034,
  "question": "Which two protocols are supported on service-port interfaces? (Choose two.)",
  "options": [
   "Telnet",
   "SCP",
   "TACACS+",
   "SSH",
   "RADIUS"
  ],
  "correct": "AD",
  "explanation": "AD (100%)\n\n\uf147 \uf007 no_blink404 2 months, 2 weeks ago\nSelected Answer: AD\n\nA&D\nhttps://www.cisco.com/c/en/us/td/docs/wireless/controller/7-6/configuration-guide/b_cg76/b_cg76_chapter_011110.pdf",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1035",
  "num": 1035,
  "question": "What is the benefit of using private IPv4 addressing?",
  "options": [
   "to enable secure connectivity over the Internet",
   "to shield internal network devices from external access",
   "to provide reliable connectivity between like devices",
   "to be routable over an external network"
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 [Removed] 2 months, 2 weeks ago\nSelected Answer: B\n\nB. to shield internal network devices from external access",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1036",
  "num": 1036,
  "question": "Two switches have been implemented and all interfaces are at the default configuration level. A trunk link must be implemented between two\nswitches with these requirements:\n\u2022 using an industry-standard trunking protocol\n\u2022 permitting VLANs 1-10 and denying other VLANs\nHow must the interconnecting ports be configured?",
  "options": [
   "switchport mode dynamic\nchannel-protocol lacp\nswitchport trunk allowed vlans 1-10",
   "switchport mode trunk\nswitchport trunk allowed vlans 1-10\nswitchport trunk native vlan 11",
   "switchport mode trunk\nswitchport trunk encapsulation dot1q\nswitchport trunk allowed vlans 1-10",
   "switchport mode dynamic desirable\nchannel-group 1 mode desirable\nswitchport trunk encapsulation isl\nswitchport trunk allowed vlan except 11-4094"
  ],
  "correct": "C",
  "explanation": "C (100%)\n\n\uf147 \uf007 shaney67 1 week, 5 days ago\nSW1(config)# interface range Ethernet0/0 - 1\nSW1(config-if-range)# channel-group 44 mode active\nSW1(config-if-range)# exit\nSW2(config)# interface range Ethernet0/0 - 1\nSW2(config-if-range)# channel-group 44 mode active\nSW2(config-if-range)# exit\nSW1(config)# interface Port-Channel44\nSW1(config-if)# switchport mode trunk\nSW1(config-if)# exit\nSW2(config)# interface Port-Channel44\nSW2(config-if)# switchport mode trunk\nSW2(config-if)# exit\nSW1(config)# interface Port-Channel44\nSW1(config-if)# switchport trunk encapsulation dot1q\nSW1(config-if)# exit\nSW2(config)# interface Port-Channel44\nSW2(config-if)# switchport trunk encapsulation dot1q\nSW2(config-if)# exit\nSW1(config)# interface Port-Channel44\nSW1(config-if)# switchport trunk native vlan MONITORING\nSW1(config-if)# exit\nSW2(config)# interface Port-Channel44\nSW2(config-if)# switchport trunk native vlan MONITORING\nSW2(config-if)# exit",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1037",
  "num": 1037,
  "question": "Refer to the exhibit. Traffic that is flowing over interface TenGigabitEthemet0/0/0 experiences slow transfer speeds. What is the cause of this\nissue?",
  "options": [
   "speed conflict",
   "queuing drops",
   "duplex incompatibility",
   "heavy traffic congestion"
  ],
  "correct": "C",
  "explanation": "C (83%)\n\nD (17%)\n\n\uf147 \uf007 RidzV Highly Voted \uf164 6 months, 1 week ago\nDuplex incompatibility can cause high number of collisions",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1038",
  "num": 1038,
  "question": "Which two host addresses are reserved for private use within an enterprise network? (Choose two.)",
  "options": [
   "10.172.76.200",
   "12.17.1.20",
   "172.15.2.250",
   "172.31.255.100",
   "192.169.32.10"
  ],
  "correct": "AC",
  "explanation": "AD (97%)\n\n\uf147 \uf007 ahmt Highly Voted \uf164 7 months ago\nSelected Answer: AD\n\nAddress ranges to be use by private networks are:\nClass A: 10.0.0.0 to 10.255.255.255\nClass B: 172.16.0.0 to 172.31.255.255\nClass C: 192.168.0.0 to 192.168.255.255",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1039",
  "num": 1039,
  "question": "Refer to the exhibit. The iPv6 address for the LAN segment on router R2 must be configured using the EUI-64 format. Which address must be\nused?",
  "options": [
   "ipv6 address 2001:DB8:D8D2:1009:10A0:ABFF:FECC:1 eui-64",
   "ipv6 address 2001:DB8:D8D2:1009:1230:ABFF:FECC:1 eui-64",
   "ipv6 address 2001:DB8:D8D2:1009:4347:31FF:FF47:0 eui-64",
   "ipv6 address 2001:DB8:D8D2:1009:12A0:AB34:FFCC:1 eui-64"
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 no_blink404 2 months, 2 weeks ago\nSelected Answer: A\n\nAnswer A is deffo correct",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1040",
  "num": 1040,
  "question": "What are two reasons to configure PortFast on a switch port attached to an end host? (Choose two.)",
  "options": [
   "to block another switch or host from communicating through the port",
   "to enable the port to enter the forwarding state immediately when the host boots up",
   "to prevent the port from participating in Spanning Tree Protocol operations",
   "to protect the operation of the port from topology change processes",
   "to limit the number of MAC addresses learned on the port to 1"
  ],
  "correct": "BD",
  "explanation": "BD (53%)\n\nBC (47%)\n\n\uf147 \uf007 liviuml Highly Voted \uf164 5 months ago\nB & D are correct.\nPort Fast still participate in STP ops.\nhttps://www.arubanetworks.com/techdocs/ArubaOS_64_Web_Help/Content/ArubaFrameStyles/Branch%20Office/PortFast%20and%20BPDU%20Gu\nard.htm",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1042",
  "num": 1042,
  "question": "A network administrator wants the syslog server to filter incoming messages into different files based on their importance. Which filtering criteria\nmust be used?",
  "options": [
   "message body",
   "level",
   "facility",
   "process ID"
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 UAE7 Highly Voted \uf164 6 months, 2 weeks ago\nsince question asks to filter messages based on importance, I think severity level is the answer",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1044",
  "num": 1044,
  "question": "Which interface or port on the WLC is the default for in-band device administration and communications between the controller and access\npoints?",
  "options": [
   "console port",
   "management interface",
   "virtual interface",
   "service port"
  ],
  "correct": "B",
  "explanation": "B (100%)\n\n\uf147 \uf007 Goena 6 months, 2 weeks ago\nSelected Answer: B\n\nB is correct:\nThe management interface is the default interface for in-band management of the controller and connectivity to enterprise services such as AAA\nservers. It is also used for communications between the controller and access points, for all CAPWAP or intercontroller mobility messaging and\ntunneling traffic.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1045",
  "num": 1045,
  "question": "Refer to the exhibit. A network administrator configures the CPE to provide internet access to the company headquarters. Traffic must be loadbalanced via ISP1 and ISP2 to ensure redundancy.\nWhich two command sets must be configured on the CPE router? (Choose two.)",
  "options": [
   "ip route 0.0.0.0 0.0.0.0 198.51.100.1 255\nip route 0.0.0.0 0.0.0.0 203.0.113.1 255\nip route 128.0.0.0 128.0.0.0 203.0.113.1",
   "ip route 0.0.0.0 128.0.0.0 198.51.100.1\nip route 128.0.0.0 128.0.0.0 203.0.113.1\nip route 0.0.0.0 0.0.0.0 198.51.100.1\nip route 0.0.0.0 0.0.0.0 203.0.113.1",
   "ip route 0.0.0.0 0.0.0.0 198.51.100.1\nip route 0.0.0.0 0.0.0.0 203.0.113.1",
   "ip route 0.0.0.0 128.0.0.0 198.51.100.1\nip route 128.0.0.0 128.0.0.0 203.0.113.1",
   "ip route 0.0.0.0 0.0.0.0 198.51.100.1\nip route 0.0.0.0 0.0.0.0 203.0.113.1 2"
  ],
  "correct": "C",
  "explanation": "B (100%)\n\n\uf147 \uf007 sdmejia01 Highly Voted \uf164 6 months, 3 weeks ago\nI think it shouldn't be 2 answers. Answer C would work as intended in the question.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1046",
  "num": 1046,
  "question": "Refer to the exhibit. A network engineer updates the existing configuration on interface fastethernet1/1 switch SW1. It must establish an\nEtherChannel by using the same group designation with another vendor switch. Which configuration must be performed to complete the process?",
  "options": [
   "interface port-channel 2\nchannel-group 2 mode desirable",
   "interface fastethernet 1/1\nchannel-group 2 mode on",
   "interface fastethernet 1/1\nchannel-group 2 mode active",
   "interface port-channel 2\nchannel-group 2 mode auto"
  ],
  "correct": "A",
  "explanation": "C (90%)\n\n10%\n\n\uf147 \uf007 rAlexandre Highly Voted \uf164 7 months ago\nSelected Answer: C\n\nC is the right awnser in order to change to LACP for multi vendor compatibility",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1047",
  "num": 1047,
  "question": "Which two characteristics are representative of virtual machines (VMs)? (Choose two.)",
  "options": [
   "multiple VMs operate on the same underlying hardware",
   "Each VMs operating system depends on its hypervisor",
   "A VM on a hypervisor is automatically interconnected to other VMs",
   "A VM on an individual hypervisor shares resources equally",
   "Each VM runs independently of any other VM in the same hypervisor"
  ],
  "correct": "AE",
  "explanation": "AE (100%)\n\n\uf147 \uf007 Yannik123 1 month ago\nSelected Answer: AE\n\nAnswer is correct",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1048",
  "num": 1048,
  "question": "What is the recommended switch load-balancing mode for Cisco WLCs?",
  "options": [
   "source-destination IP address",
   "destination IP address",
   "destination MAC address",
   "source-destination MAC address"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 mageknight Highly Voted \uf164 6 months, 3 weeks ago\nWhen using EtherChannel with Cisco WLCs, the recommended load-balancing mode is the source-destination IP address mode. This mode\ndistributes traffic based on the source and destination IP addresses, which ensures that all traffic between a specific client and the WLC is sent over\nthe same physical link. This is important for maintaining client connectivity and optimizing network performance, as it helps to minimize latency,\npacket loss, and other network issues.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1049",
  "num": 1049,
  "question": "What must be considered when using 802.11a?",
  "options": [
   "It is chosen over 802.11b when a lower-cost solution is necessary",
   "It is susceptible to interference from 2.4 GHz devices such as microwave ovens",
   "It is compatible with 802.11b- and 802 11g-compliant wireless devices",
   "It is used in place of 802.11b/g when many nonoverlapping channels are required"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 ike110 Highly Voted \uf164 6 months, 2 weeks ago\n802.11.a is a 5GHz standard",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1050",
  "num": 1050,
  "question": "Refer to the exhibit. An engineer configures interface fa0/1 on SW1 and SW2 to pass traffic from two different VLANs. For security reasons,\ncompany policy requires the native VLAN to be set to a nondefault value. Which configuration meets this requirement?",
  "options": [
   "Switch(config-if)#switchport mode trunk\nSwitch(config-if)#switchport trunk encapsulation dot1q\nSwitch(config-if)#switchport trunk allowed vlan 100,105\nSwitch(config-if)#switchport trunk native vlan 3",
   "Switch(config-if)#switchport mode trunk\nSwitch(config-if)#switchport trunk encapsulation isl\nSwitch(config-if)#switchport trunk allowed vlan 100,105\nSwitch(config-if)#switchport trunk native vlan 1",
   "Switch(config-if)#switchport mode dynamic\nSwitch(config-if)#switchport access vlan 100,105\nSwitch(config-if)#switchport trunk native vlan 1",
   "Switch(config-if)#switchport mode access\nSwitch(config-if)#switchport trunk encapsulation dot1q\nSwitch(config-if)#switchport access vlan 100,105\nSwitch(config-if)#switchport trunk native vlan 3"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 ccnk 2 months, 3 weeks ago\nA is correct",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1051",
  "num": 1051,
  "question": "Refer to the exhibit A new VLAN and switch are added to the network. A remote engineer configures OldSwitch and must ensure that the\nconfiguration meets these requirements:\n\u2022 accommodates current configured VLANs\n\u2022 expands the range to include VLAN 20\n\u2022 allows for IEEE standard support for virtual LANs\nWhich configuration on the NewSwitch side of the link meets these requirements?",
  "options": [
   "switch port mode dynamic\nchannel group 1 mode active\nswitchport trunk allowed vlan 5,10,15, 20",
   "no switchport mode trunk\nswitchport trunk encapsulation isl\nswitchport mode access vlan 20",
   "switchport nonegotiate\nno switchport trunk allowed vlan 5,10\nswitchport trunk allowed vlan 5,10,15,20",
   "no switchport trunk encapsulation isl\nswitchport trunk encapsulation dot1q\nswitchport trunk allowed vlan add 20"
  ],
  "correct": "D",
  "explanation": "D (100%)\n\n\uf147 \uf007 Friday_Night 3 months, 2 weeks ago\nI don't understand, we must configure the OLD SW right? but the new sw is in ISL encapsulation and letter D has the command [no trunk\nencapsulation ISL]. Unless the question is wrong and they meant to configure the new sw.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1053",
  "num": 1053,
  "question": "Refer to the exhibit. A network engineer is adding another physical interface as a new member to the existing Port-Channel1 bundle. Which\ncommand set must be configured on the new interface to complete the process?",
  "options": [
   "no switchport\nchannel group 1 mode active",
   "no switchport\nchannel-group 1 mode on",
   "switchport mode trunk\nchannel-group 1 mode active",
   "switchport\nswitchport mode trunk"
  ],
  "correct": "A",
  "explanation": "A (100%)\n\n\uf147 \uf007 sdmejia01 Highly Voted \uf164 6 months, 3 weeks ago\nThe configuration shows is a layer 3 port channel, hence you need to use the command no switchport.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1055",
  "num": 1055,
  "question": "Refer to the exhibit. What is occurring on this switch?",
  "options": [
   "Frames are dropped after 16 failed transmission attempts",
   "The internal transmit buffer is overloaded",
   "A high number of frames smaller than 64 bytes are received",
   "An excessive number of frames greater than 1518 bytes are received"
  ],
  "correct": "A",
  "explanation": "A (89%)\n\n11%\n\n\uf147 \uf007 zamkljo 5 months, 2 weeks ago\nSelected Answer: A\n\nIf the interface receives 16 consecutive collisions during frame transmission, then it gives up and the frame is dropped. This collision type is called\nExcessive Collision.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1056",
  "num": 1056,
  "question": "Refer to the exhibit SW_1 and SW_12 represent two companies that are merging. They use separate network vendors. The VLANs on both sides\nhave been migrated to share IP subnets. Which command sequence must be issued on both sides to join the two companies and pass all VLANs\nbetween the companies?",
  "options": [
   "switchport mode trunk\nswitchport trunk encapsulation dot1q",
   "switchport mode trunk\nswitchport trunk allowed vlan all\nswitchport dot1q ethertype 0800",
   "switchport mode dynamic desirable\nswitchport trunk allowed vlan all\nswitchport trunk native vlan 7",
   "switchport dynamic auto\nswitchport nonegotiate"
  ],
  "correct": "C",
  "explanation": "A (100%)\n\n\uf147 \uf007 rAlexandre Highly Voted \uf164 7 months ago\nSelected Answer: A\n\nI think the purpose is to change the encapsulation to dot1q because isl is a Cisco proprietary protocol",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1057",
  "num": 1057,
  "question": "An engineer is configuring a switch port that is connected to a VoIP handset. Which command must the engineer configure to enable port security\nwith a manually assigned MAC address of abcd.abcd.abcd on voice VLAN 4?",
  "options": [
   "switchport port-security mac-address abcd.abcd.abcd vlan 4",
   "switchport port-security mac-address abcd.abcd.abcd vlan voice",
   "switchport port-security mac-address abcd.abcd.abcd",
   "switchport port-security mac-address sticky abcd.abcd.abcd vlan 4"
  ],
  "correct": "C",
  "explanation": "A (100%)\n\n\uf147 \uf007 Leethy Highly Voted \uf164 5 months, 1 week ago\nC. switchport port-security mac-address abcd.abcd.abcd\nTo enable port security with a manually assigned MAC address, the engineer would use the \"switchport port-security mac-address abcd.abcd.abcd\"\ncommand. This command sets the allowed MAC address for the port. The VLAN assignment for the VoIP handset is separate and not included in\nthe port-security command.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1062",
  "num": 1062,
  "question": "What is represented by the word \"LB20\" within this JSON schema?",
  "options": [
   "value",
   "array",
   "object",
   "key"
  ],
  "correct": "A",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1063",
  "num": 1063,
  "question": "What is represented beginning with line 1 and ending with line 5 within this JSON schema?",
  "options": [
   "key",
   "object",
   "array",
   "value"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 saoETo Highly Voted \uf164 5 months ago\nSelected Answer: C\n\nC. array",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1064",
  "num": 1064,
  "question": "What is represented by the word \"IDS\" within this JSON schema?",
  "options": [
   "object",
   "value",
   "array",
   "key"
  ],
  "correct": "D",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1065",
  "num": 1065,
  "question": "What is represented in line 4 within this JSON schema?",
  "options": [
   "object",
   "array",
   "key",
   "value"
  ],
  "correct": "A",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1066",
  "num": 1066,
  "question": "What is represented by the word \"port\" within this JSON schema?",
  "options": [
   "key",
   "value",
   "array",
   "object"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Leethy Highly Voted \uf164 5 months, 1 week ago\nA. key\nWithin this JSON schema, the word \"port\" is a key within the objects represented by the curly braces {}. Each object in the schema has two keyvalue pairs, where \"port\" is one of the keys.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1067",
  "num": 1067,
  "question": "What provides connection redundancy, increased bandwidth, and load sharing between a wireless LAN controller and a Layer 2 switch?",
  "options": [
   "first hop redundancy",
   "VLAN trunking",
   "tunneling",
   "link aggregation"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 [Removed] 2 months, 2 weeks ago\nSelected Answer: D\n\nLink aggregation provides all this",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1069",
  "num": 1069,
  "question": "Which interface is used to send traffic to the destination network?",
  "options": [
   "F0/5",
   "F0/6",
   "F0/12",
   "F0/9"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 studying_1 Highly Voted \uf164 4 months, 1 week ago\nSelected Answer: C\n\nAnswer is correct",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1070",
  "num": 1070,
  "question": "What is the purpose of an SSID?",
  "options": [
   "It identifies an individual access point on a WLAN.",
   "It differentiates traffic entering access points.",
   "It provides network security.",
   "It identifies a WLAN."
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 andrizo 2 weeks, 4 days ago\nBased on repeat questions, I agree with the answer.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1071",
  "num": 1071,
  "question": "Which two types of attack are categorized as social engineering? (Choose two.)",
  "options": [
   "phoning",
   "malvertising",
   "probing",
   "pharming",
   "phishing"
  ],
  "correct": "DE",
  "explanation": "\uf147 \uf007 MoHTimo 1 month, 1 week ago\nSelected Answer: AE\n\na and e is correct b/c phoning is the same as vishing",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1073",
  "num": 1073,
  "question": "What describes the functionality of southbound APIs?",
  "options": [
   "They enable communication between the controller and the network device.",
   "They communicate with the management plane.",
   "They use HTTP messages to communicate.",
   "They convey information from the controller to the SDN applications."
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 [Removed] 2 months, 2 weeks ago\nSelected Answer: A\n\nThis is correct\nA. They enable communication between the controller and the network device.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1074",
  "num": 1074,
  "question": "Refer to the exhibit. A network engineer is verifying the settings on a new OSPF network. All OSPF configurations use the default values unless\notherwise indicated. Which router does the engineer expect will be elected as the DR when all devices boot up simultaneously?",
  "options": [
   "R1",
   "R2",
   "R3",
   "R4"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Mizuchan Highly Voted \uf164 3 months, 3 weeks ago\nDR Election Criteria: The DR election process follows specific criteria:\nThe router with the highest priority becomes the DR. If multiple routers have the same highest priority, the router with the highest Router ID (RID)\nis elected as the DR.\nThe router with the second-highest priority becomes the BDR. If multiple routers have the same second-highest priority, the router with the highest\nRID is elected as the BDR.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1075",
  "num": 1075,
  "question": "Which command must be entered so that the default gateway is automatically distributed when DHCP is configured on a router?",
  "options": [
   "dns-server",
   "default-router",
   "ip helper-address",
   "default-gateway"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 [Removed] 2 months, 2 weeks ago\nSelected Answer: B\n\nB. default-router",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1076",
  "num": 1076,
  "question": "What are two functions of a firewall within an enterprise? (Choose two.)",
  "options": [
   "It enables traffic filtering based on URLs.",
   "It serves as an endpoint for a site-to-site VPN in standalone mode.",
   "It provides support as an endpoint for a remote access VPN in multiple context mode.",
   "It offers Layer 2 services between hosts.",
   "It enables wireless devices to connect to the network."
  ],
  "correct": "BC",
  "explanation": "\uf147 \uf007 Leethy Highly Voted \uf164 5 months, 1 week ago\nA. It enables traffic filtering based on URLs.\nB. It serves as an endpoint for a site-to-site VPN in standalone mode.\nA firewall within an enterprise has multiple functions, including traffic filtering based on URLs (A) and serving as an endpoint for a site-to-site VPN\nin standalone mode (B). Firewalls help protect the network by inspecting and controlling incoming and outgoing traffic based on predetermined\nsecurity rules. They can also establish secure connections between networks through VPNs.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1077",
  "num": 1077,
  "question": "What is the maximum number of concurrent Telnet sessions that a Cisco WLC supports?",
  "options": [
   "3",
   "5",
   "6",
   "15"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 Yannik123 2 weeks, 3 days ago\nSelected Answer: B\n\nB is correct: The valid range is 0 to 5 sessions and the default value is 5 sessions. A value of zero indicates that Telnet/SSH sessions are disallowed.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1078",
  "num": 1078,
  "question": "Which 802.11 management frame type is sent when a client roams between access points on the same SSID?",
  "options": [
   "Reassociation Request",
   "Authentication Request",
   "Association Request",
   "Probe Request"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 [Removed] 2 months, 2 weeks ago\nSelected Answer: A\n\nA. Reassociation Request\nIn WLAN network, reassociation request frame is used by mobile stations in the following scenarios:\n\u2022 Moving from one basic service area to the other service area in the same extended service area.\n\u2022 leaving the wifi network coverage area and comes back to the same area again",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1079",
  "num": 1079,
  "question": "What is a functionality of the control plane in the network?",
  "options": [
   "It looks up an egress interface in the forwarding information base.",
   "It forwards traffic to the next hop.",
   "It exchanges topology information with other routers.",
   "It provides CLI access to the network device."
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Bhrino 4 months ago\nSelected Answer: C\n\nthis is also has some weirdly worded answer choices but C probably most correct. because this manages routing information so exchanging\ninformation in this case could be right",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1080",
  "num": 1080,
  "question": "Refer to the exhibit. All switches are configured with the default STP priorities. During the STP elections, which switch becomes the root bridge if\nall interfaces are in the same VLAN?",
  "options": [
   "MDF-DC-1: 0d:E0:43:96:02:30",
   "MDF-DC-2: 0d:0E:18:1B:05:97",
   "MDF-DC-4: 0d:E0:19:A1:B3:19",
   "MDF-DC-3: 0d:0E:18:2A:3C:9D"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 sany11 Highly Voted \uf164 4 months, 3 weeks ago\nRight ans",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1082",
  "num": 1082,
  "question": "What is represented by the word \"VPN11\" within this JSON schema?",
  "options": [
   "key",
   "array",
   "object",
   "value"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Tdawg1968 3 months, 3 weeks ago\nI meant question 1084",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1083",
  "num": 1083,
  "question": "Which port type supports the spanning-tree portfast command without additional configuration?",
  "options": [
   "Layer 3 main interfaces",
   "Layer 3 subinterfaces",
   "trunk ports",
   "access ports"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 mda2h 1 month, 1 week ago\nSelected Answer: D\n\nAccess ports",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1084",
  "num": 1084,
  "question": "What is represented by the word \"R29\" within this JSON schema?",
  "options": [
   "array",
   "key",
   "object",
   "value"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 sany11 Highly Voted \uf164 4 months, 3 weeks ago\nRight ans",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1085",
  "num": 1085,
  "question": "What is represented in line 2 within this JSON schema?",
  "options": [
   "object",
   "value",
   "key",
   "array"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Bhrino Highly Voted \uf164 4 months ago\nSelected Answer: A\n\nobjects are show in {} curly brackets",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1094",
  "num": 1094,
  "question": "What is a characteristic of private IPv4 addressing?",
  "options": [
   "is used without allocation from a regional internet authority",
   "is used when traffic on the subnet must traverse a site-to-site VPN to an outside organization",
   "reduces the forwarding table on network routers",
   "provides unlimited address ranges"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 [Removed] 2 months, 2 weeks ago\nSelected Answer: A\n\nA. is used without allocation from a regional internet authority",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1095",
  "num": 1095,
  "question": "Which interface condition is occurring in this output?",
  "options": [
   "bad NIC",
   "high throughput",
   "queueing",
   "broadcast storm"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 dropspablo 1 month, 3 weeks ago\nBy ChatGPT:\nBased on the provided output, the condition of interface that is occurring is:\nC. queueing\nThe output shows information related to the interface's queuing strategy, including the input queue size, output queue size, and input/output\nrates. It also mentions that the queuing strategy is \"fifo,\" which stands for \"First In, First Out.\" This means that packets are processed in the order\nthey arrive, and the interface is not experiencing any drops in the output queue (Output queue: 0/300).",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1096",
  "num": 1096,
  "question": "What is a characteristic of private IPv4 addressing?",
  "options": [
   "is used when the ISP requires the new subnet to be advertised to the internet for web services",
   "provides unlimited address ranges",
   "is used when the network has multiple endpoint listeners",
   "alleviates the shortage of IPv4 addresses"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 [Removed] 2 months, 2 weeks ago\nSelected Answer: D\n\nD. alleviates the shortage of IPv4 addresses",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1097",
  "num": 1097,
  "question": "What is a characteristic of private IPv4 addressing?",
  "options": [
   "is used when traffic on the subnet must traverse a site-to-site VPN to an outside organization",
   "allows endpoints to communicate across public network boundaries",
   "is used on hosts that communicate only with other internal hosts",
   "reduces network complexity"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 [Removed] 2 months, 2 weeks ago\nSelected Answer: C\n\nC. is used on hosts that communicate only with other internal hosts",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1098",
  "num": 1098,
  "question": "What is a characteristic of private IPv4 addressing?",
  "options": [
   "traverses the internet when an outbound ACL is applied",
   "alleviates the shortage of IPv4 addresses",
   "is used when the ISP requires the new subnet to be advertised to the internet for web services",
   "enables secure connectivity over the internet"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 [Removed] 2 months, 2 weeks ago\nSelected Answer: B\n\nAnswer B is correct",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1099",
  "num": 1099,
  "question": "Which interface condition is occurring in this output?",
  "options": [
   "broadcast storm",
   "duplex mismatch",
   "high throughput",
   "queueing"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 shaney67 2 days, 1 hour ago\nWent with high throughput, was tempted with queueing but dont see anything in the queue for input or output",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1100",
  "num": 1100,
  "question": "What is a characteristic of private IPv4 addressing?",
  "options": [
   "is used when the ISP requires the new subnet to be advertised to the internet for web services",
   "allows multiple companies to use the same addresses without conflict",
   "is used on the external interface of a firewall",
   "allows endpoints to communicate across public network boundaries"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 NeoSam999 2 months, 2 weeks ago\nB is correct\nThis is possible because private IP addresses are not globally unique or routable on the public internet. Instead, they are intended for use within\nprivate networks, offering a level of address reuse and allowing multiple entities to have overlapping address spaces without interfering with each\nother.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1104",
  "num": 1104,
  "question": "What is a characteristic of an SSID in wireless networks?",
  "options": [
   "identifies an access point on a WLAN",
   "uses the password to connect to an access point",
   "uses policies to prevent unauthorized users",
   "uses a case-sensitive text string"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 4Lucky711 1 month, 2 weeks ago\nThe SSID can consist of up to 32 alphanumeric, case-sensitive, characters.\nSo D is correct!\nA is incorrect. --> It should be --> It \"uniquely\" identifies an access point in a WLAN",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1105",
  "num": 1105,
  "question": "What is a characteristic of private IPv4 addressing?",
  "options": [
   "reduces network complexity",
   "is used on hosts that communicate only with other internal hosts",
   "simplifies the addressing in the network",
   "reduces network maintenance costs"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 NeoSam999 2 months, 2 weeks ago\nSelected Answer: B\n\nB is correct\nThe correct characteristic of private IPv4 addressing is that it is used on hosts that communicate only with other internal hosts. Private IPv4\naddressing refers to the allocation of IP addresses from specific ranges reserved for use within private networks.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1106",
  "num": 1106,
  "question": "What is a characteristic of encryption in wireless networks?",
  "options": [
   "identifies an access point on a WLAN",
   "uses the password to connect to an access point",
   "uses integrity checks to identify forgery attacks in the frame",
   "uses authentication protocols to secure a network"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 olofinluajoshua 1 week ago\nSimilar answer from ChatGPT & Bard:\nC. uses integrity checks to identify forgery attacks in the frame\nExplanation: Encryption in wireless networks not only secures data by encoding it but also includes integrity checks to detect any unauthorized\nalterations or forgery of the data during transmission. This helps ensure the data's integrity and authenticity.\nThe other options are not accurate descriptions of encryption in wireless networks:\nA. Identifying an access point is the role of an SSID, not encryption.\nB. Using a password for connection is related to authentication, not encryption.\nD. Authentication protocols are separ\nate from encryption, although both are important security aspects in wireless networks. Encryption focuses on data confidentiality, while\nauthentication verifies the identity of users or devices trying to connect to the network.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1107",
  "num": 1107,
  "question": "What is a characteristic of private IPv4 addressing?",
  "options": [
   "simplifies the addressing in the network",
   "complies with PCI regulations",
   "reduces the forwarding table on network routers",
   "is used on hosts that communicate only with other internal hosts"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 NeoSam999 2 months, 2 weeks ago\nD is correct\nThe correct characteristic of private IPv4 addressing is that it is used on hosts that communicate only with other internal hosts. Private IPv4\naddressing refers to the allocation of IP addresses from a specific range of reserved IP address blocks that are designated for use within private\nnetworks.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1108",
  "num": 1108,
  "question": "What is a characteristic of an SSID in wireless networks?",
  "options": [
   "eliminates network piggybacking",
   "prompts a user for a login ID",
   "broadcasts a beacon signal to announce its presence by default",
   "must include a combination of letters and numbers"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 NeoSam999 2 months, 2 weeks ago\nSelected Answer: C\n\nC is correct",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1109",
  "num": 1109,
  "question": "What is a characteristic of encryption in wireless networks?",
  "options": [
   "provides increased protection against spyware",
   "prompts a user for a login ID",
   "uses ciphers to detect and prevent zero-day network attacks",
   "prevents the interception of data as it transits a network"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 learntstuff 1 month, 3 weeks ago\nThis is a terrible question. Encryption doesn't prevent interception, it prevents people reading what is being sent. Which in turn is technically an\nincrease in protect against spyware. All I am saying in this pointless comment is this question sucks. On a positive note, I hope no one gets this\nquestion on the exam and you all pass. Peace out!",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1110",
  "num": 1110,
  "question": "What is a characteristic of an SSID in wireless networks?",
  "options": [
   "intercepts data threats before they attack a network",
   "encodes connections at the sending and receiving ends",
   "broadcasts a beacon signal to announce its presence by default",
   "identifies an access point on a WLAN"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 andrizo 2 weeks, 6 days ago\nSelected Answer: C\n\nThis question has appeared several times, and C is the only consistent answer.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1111",
  "num": 1111,
  "question": "Refer to the exhibit. SW2 is replaced because of a hardware failure. A network engineer starts to configure SW2 by copying the fa0/1 interface\nconfiguration from SW1. Which command must be configured on the fa0/1 interface of SW2 to enable PC1 to connect to PC2?",
  "options": [
   "switchport mode trunk",
   "switchport trunk native vlan 10",
   "switchport mode access",
   "switchport trunk allowed remove 10"
  ],
  "correct": "A",
  "explanation": "\uf147 \uf007 Bhrino Highly Voted \uf164 4 months ago\nSelected Answer: A\n\nhave to tell the switch that the specific interface is a trunk port ie A",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1113",
  "num": 1113,
  "question": "What is a characteristic of private IPv4 addressing?",
  "options": [
   "composed of up to 65,536 available addresses",
   "issued by IANA in conjunction with an autonomous system number",
   "used without tracking or registration",
   "traverse the Internet when an outbound ACL is applied"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Bhrino Highly Voted \uf164 4 months ago\nSelected Answer: C\n\nbecause private ips are private people don't have to register to get them so its c",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1116",
  "num": 1116,
  "question": "How does MAC learning function on a switch?",
  "options": [
   "broadcasts frames to all ports without queueing",
   "sends an ARP request to locate unknown destinations",
   "adds unknown source MAC addresses to the address table",
   "sends a retransmission request when a new frame is received"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Bhrino Highly Voted \uf164 4 months ago\nSelected Answer: C\n\nThe answer is c because when a switch recieves PDUs it examins the mac address to see if its already in its table and if its not it then adds it to its\nown table this process is called mac address learning",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1117",
  "num": 1117,
  "question": "Which interface condition is occurring in this output?",
  "options": [
   "broadcast storm",
   "collisions",
   "high throughput",
   "duplex mismatch"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Bhrino 4 months ago\nSelected Answer: C\n\nit is C because not only is the rxload and txload maxed there are no input errors and the input and out rates are high",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1118",
  "num": 1118,
  "question": "What is a characteristic of an SSID in wireless networks?",
  "options": [
   "converts electrical current to radio waves",
   "uses policies to prevent unauthorized users",
   "broadcasts a beacon signal to announce its presence by default",
   "prompts a user for a login ID"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 andrizo 2 weeks, 6 days ago\nSelected Answer: C\n\nI don't think it's B because SSID isn't for authentication, just identification.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1120",
  "num": 1120,
  "question": "Refer to the exhibit. Which switch becomes the root bridge?",
  "options": [
   "SW3 Bridge Priority - 57344 mac-address 0b:bb:e0:96:a3:86",
   "SW2 Bridge Priority - 57344 mac-address 00:b6:c5:17:8e:89",
   "SW1 Bridge Priority - 28672 mac-address 0c:d4:e9:1d:3c:24",
   "SW4 Bridge Priority - 28672 mac-address 0b:09:23:33:b8:91"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 Bhrino Highly Voted \uf164 4 months ago\nThe answer is D because this switch has the lowest priority and mac address",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1121",
  "num": 1121,
  "question": "Which interface is used to send traffic to the destination network?",
  "options": [
   "G0/9",
   "G0/20",
   "G0/16",
   "G0/11"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 Bhrino Highly Voted \uf164 4 months ago\nSelected Answer: B\n\nThe answer is because it has the lowest ad and metric",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1122",
  "num": 1122,
  "question": "What is represented by the word \"fe5/42\" within this JSON schema?",
  "options": [
   "array",
   "object",
   "value",
   "key"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 Bhrino Highly Voted \uf164 4 months ago\nSelected Answer: C\n\nThe answer is c because in this array this is specifically asking about a key : value pair. In this instance it would also be considered a string",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1123",
  "num": 1123,
  "question": "Refer to the exhibit. Which switch becomes the root bridge?",
  "options": [
   "SW 1 Bridge Priority - 32768 mac-address 0f:d7:9e:13:ab:82",
   "SW 2 Bridge Priority - 40960 mac-address 05:d8:33:09:8f:89",
   "SW 3 Bridge Priority - 32768 mac-address 01:1c:6c:66:b7:70",
   "SW 4 Bridge Priority - 40960 mac-address 04:44:97:51:63:17"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 studying_1 Highly Voted \uf164 3 months, 2 weeks ago\nSelected Answer: C\n\nAnswer is correct, lowest priority, and lowest MAC address",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1124",
  "num": 1124,
  "question": "Refer to the exhibit. A newly configured PC fails to connect to the internet by using TCP port 80 to www.cisco.com. Which setting must be\nmodified for the connection to work?",
  "options": [
   "Subnet Mask",
   "DNS Servers",
   "Default Gateway",
   "DHCP Servers"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 studying_1 Highly Voted \uf164 3 months, 2 weeks ago\nSelected Answer: C\n\nanswer is correct, 10.2.2.0/29, 10.2.2.0 - 10.2.2.7, the current config is 10.2.2.10, which is out of range, and needs to be changed",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1126",
  "num": 1126,
  "question": "How does frame switching function on a switch?",
  "options": [
   "rewrites the source and destination MAC address",
   "forwards frames to a neighbor port using CDP",
   "forwards known destinations to the destination port",
   "is disabled by default on all interfaces and VLANs"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 NeoSam999 2 months, 2 weeks ago\nSelected Answer: C\n\nC is correct",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1128",
  "num": 1128,
  "question": "What is a characteristic of an SSID in wireless networks?",
  "options": [
   "uses policies to prevent unauthorized users",
   "identifies an access point on a WLAN",
   "prompts a user for a login ID",
   "associates a name to a WLAN"
  ],
  "correct": "D",
  "explanation": "\uf147 \uf007 NeoSam999 2 months, 2 weeks ago\nSelected Answer: D\n\nD is the correct answer.\nSSID (Service Set Identifier) is a unique name that is assigned to a wireless network .",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1129",
  "num": 1129,
  "question": "What is represented by the word \"port\" within this JSON schema?",
  "options": [
   "value",
   "array",
   "key",
   "object"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 NeoSam999 2 months, 2 weeks ago\nSelected Answer: C\n\nIt is a key-value pair where the key is \"port,\" and the associated value is \"te8/30.\"",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1131",
  "num": 1131,
  "question": "Which interface condition is occurring in this output?",
  "options": [
   "collisions",
   "broadcast storm",
   "duplex mismatch",
   "queueing"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 dropspablo 1 month, 3 weeks ago\nChatGPT\nBased on the provided output, it appears that option C. \"duplex mismatch\" is occurring in the interface condition. The line \"Half-duplex, 100 Mb/s,\n100BaseTX/FX\" indicates that the interface is set to half-duplex mode, but the interface is also capable of 100 Mb/s speed. This is a mismatch\nbetween the duplex settings on both ends of the link, which can lead to various performance and connectivity issues.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1133",
  "num": 1133,
  "question": "Refer to the exhibit. An engineer is configuring a new router on the network and applied this configuration. Which additional configuration allows\nthe PC to obtain its IP address from a DHCP server?",
  "options": [
   "Configure the ip helper-address 172.16.2.2 command under interface Gi0/0.",
   "Configure the ip dhcp relay information command under interface Gi0/1",
   "Configure the ip address dhcp command under interface Gi0/0",
   "Configure the ip dhcp smart-relay command globally on the router."
  ],
  "correct": "A",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1136",
  "num": 1136,
  "question": "Refer to the exhibit. Which switch becomes the root bridge?",
  "options": [
   "SW4 Bridge Priority - 8192 mac-address 05:4a:f7:06:33:22",
   "SW2 Bridge Priority - 8192 mac-address 05:52:bd:0c:be:69",
   "SW3 Bridge Priority - 61440 mac-address 06:15:2e:7f:20:58",
   "SW4 Bridge Priority - 61440 mac-address 0a:e5:03:a6:6e:37"
  ],
  "correct": "A",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1138",
  "num": 1138,
  "question": "What is a characteristic of encryption in wireless networks?",
  "options": [
   "provides increased protection against spyware",
   "uses policies to prevent unauthorized users",
   "converts electrical current to radio waves",
   "prevents the interception of data as it transits a network"
  ],
  "correct": "D",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1139",
  "num": 1139,
  "question": "Which interface is used to send traffic to the destination network?",
  "options": [
   "G0/9",
   "G0/12",
   "G0/19",
   "G0/1"
  ],
  "correct": "B",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1140",
  "num": 1140,
  "question": "Which IPsec encryption mode is appropriate when the destination of a packet differs from the security termination point?",
  "options": [
   "transport",
   "main",
   "aggressive",
   "tunnel"
  ],
  "correct": "D",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1141",
  "num": 1141,
  "question": "A network administrator is evaluating network security in the aftermath of an attempted ARP spoofing attack. If Port-channel1 is the uplink\ninterface of the access-layer switch toward the distribution-layer switch, which two configurations must the administrator configure on the accesslayer switch to provide adequate protection? (Choose two.)",
  "options": [
   "ip dhcp snooping vlan 1-4094\n!\ninterface Port-channel1\nswitchport protected\nswitchport port-security maximum 1",
   "ip dhcp snooping vlan 1-4094\nip dhcp snooping\n!\ninterface Port-channel1\nip dhcp snooping trust",
   "ip dhcp snooping\n!\ninterface Port-channel1\nswitchport port-security maximum 1\nswitchport port-security",
   "ip arp inspection trust\n!\ninterface Port-channel1\nswitchport port-security maximum 4094\nswitchport port-security\nip verify source mac-check",
   "ip arp inspection vlan 1-4094\n!\ninterface Port-channel1\nip arp inspection trust"
  ],
  "correct": "DE",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1142",
  "num": 1142,
  "question": "Which type of hypervisor operates without an underlying OS to host virtual machines?",
  "options": [
   "Type 1",
   "Type 2",
   "Type 3",
   "Type 12"
  ],
  "correct": "A",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1143",
  "num": 1143,
  "question": "What is a characteristic of an SSID in wireless networks?",
  "options": [
   "converts electrical current to radio waves",
   "associates a name to a WLAN",
   "uses a 4-way handshake for authentication",
   "provides increased protection against spyware"
  ],
  "correct": "B",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1145",
  "num": 1145,
  "question": "Which interface is used to send traffic to the destination network?",
  "options": [
   "G0/10",
   "G0/24",
   "G0/5",
   "G0/1"
  ],
  "correct": "B",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1146",
  "num": 1146,
  "question": "What is a characteristic of private IPv4 addressing?",
  "options": [
   "enables secure connectivity over the internet",
   "complies with PCI regulations",
   "provides an added level of protection against internet threats",
   "is used on internal hosts that stream data solely to external resources"
  ],
  "correct": "C",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1148",
  "num": 1148,
  "question": "What is a characteristic of private IPv4 addressing?",
  "options": [
   "is used when the ISP requires the new subnet to be advertised to the internet for web services",
   "provides unlimited address ranges",
   "is used when the network has multiple endpoint listeners",
   "is used on hosts that communicate only with other internal hosts"
  ],
  "correct": "D",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1149",
  "num": 1149,
  "question": "Refer to the exhibit. The engineer configured the VLANs on the new AccSw2 switch. A router-on-a-stick is connected to both switches. How must\nthe ports be configured on AccSw2 to establish full connectivity between the two switches and for Server1?",
  "options": [
   "interface GigabitEthernet1/1\nswitchport access vlan 11\n!\ninterface GigabitEthernet1/24\nswitchport mode trunk\nswitchport trunk allowed vlan 10,11",
   "interface GigabitEthernet1/3\nswitchport mode access\nswitchport access vlan 10\n!\ninterface GigabitEthernet1/24\nswitchport mode trunk\nswitchport trunk allowed vlan 2,10",
   "interface GigabitEthernet1/3\nswitchport mode access\nswitchport access vlan 10\n!\ninterface GigabitEthernet1/24\nswitchport mode trunk",
   "interface GigabitEthernet1/1\nswitchport mode access\nswitchport access vlan 11\n!\ninterface GigabitEthernet1/24\nswitchport mode trunk"
  ],
  "correct": "C",
  "explanation": "\uf147 \uf007 kat1969 18 hours, 24 minutes ago\nWe don't know what VLAN the PC belongs to. So, if we restrict the VLANS that might create an issue.",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1150",
  "num": 1150,
  "question": "How does frame switching function on a switch?",
  "options": [
   "floods unknown destinations to all ports except the receiving port",
   "modifies frames that contain a known source VLAN",
   "rewrites the source and destination MAC address",
   "buffers and forwards frames with less than 5 CRCs"
  ],
  "correct": "A",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1151",
  "num": 1151,
  "question": "Refer to the exhibit. Which address will the client contact to renew their IP address when the current lease expires?",
  "options": [
   "192.168.25.103",
   "192.168.25.1",
   "192.168.25.100",
   "192.168.25.254"
  ],
  "correct": "C",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1152",
  "num": 1152,
  "question": "Refer to the exhibit. Which switch becomes the root bridge?",
  "options": [
   "SW4 Bridge Priority - 8192 mac-address 05:0f:e8:ed:b2:98",
   "SW2 Bridge Priority - 8192 mac-address 00:ac:f0:9b:dc:72",
   "SW3 Bridge Priority - 16384 mac-address 0e:6c:e4:b1:8a:57",
   "SW4 Bridge Priority - 16384 mac-address 0a:45:22:26:29:77"
  ],
  "correct": "B",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1154",
  "num": 1154,
  "question": "How is a configuration change made to a wireless AP in lightweight mode?",
  "options": [
   "SSH connection to the management IP of the AP",
   "CAPWAP/LWAPP connection via the parent WLC",
   "EoIP connection via the parent WLC",
   "HTTPS connection directly to the out-of-band address of the AP"
  ],
  "correct": "B",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1156",
  "num": 1156,
  "question": "Which plane is centralized in software-defined networking?",
  "options": [
   "application",
   "services",
   "data",
   "control"
  ],
  "correct": "D",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1157",
  "num": 1157,
  "question": "What is a service that is provided by a wireless controller?",
  "options": [
   "It mitigates threats from the internet.",
   "It manages interference in a dense network.",
   "It provides Layer 3 routing between wired and wireless devices.",
   "It issues IP addresses to wired devices."
  ],
  "correct": "B",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1158",
  "num": 1158,
  "question": "When more than one AP-Manager interface is provisioned on a wireless LAN controller, how is the request handled by the AP?",
  "options": [
   "The discovery response from the AP to the AP-Manager interface disables the WLAN port.",
   "The AP join request fails and must be configured statically on the AP-Manager interface.",
   "The AP-Manager with the fewest number of APs is used by the AP to join.",
   "The first AP-Manager interface to respond is chosen by the AP."
  ],
  "correct": "C",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1159",
  "num": 1159,
  "question": "What is represented in line 2 within this JSON schema?",
  "options": [
   "object",
   "value",
   "key",
   "array"
  ],
  "correct": "A",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1160",
  "num": 1160,
  "question": "How does MAC learning function on a switch?",
  "options": [
   "protects against denial of service attacks",
   "sends frames with unknown destinations to a multicast group",
   "adds unknown source MAC addresses to the address table",
   "sends a retransmission request when a new frame is received"
  ],
  "correct": "C",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1161",
  "num": 1161,
  "question": "What is represented by the word \"ge3/36\" within this JSON schema?",
  "options": [
   "value",
   "array",
   "object",
   "key"
  ],
  "correct": "A",
  "explanation": "",
  "topic": "1",
  "deck": "examtopics-3"
 },
 {
  "id": "examtopics-3_q1162",
  "num": 1162,
  "question": "Which SNMP message type is reliable and precedes an acknowledgment response from the SNMP manager?",
  "options": [
   "Get",
   "Inform",
   "Traps",
   "Set"
  ],
  "correct": "B",
  "explanation": "\uf147 \uf007 Cisco3900 1 week, 2 days ago\nCorrect me if I\u2019m wrong, but I think it\u2019s trap",
  "topic": "1",
  "deck": "examtopics-3"
 }
];
