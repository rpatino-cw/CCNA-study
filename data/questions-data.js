window.questionsData = {
  "questions": [
    {
      "id": "q001",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What is the default OSPF hello interval on a broadcast network?",
      "options": [
        "5 seconds",
        "10 seconds",
        "30 seconds",
        "40 seconds"
      ],
      "correct": 1,
      "explanation": "On broadcast and point-to-point networks, OSPF sends hello packets every 10 seconds. On NBMA networks, the default is 30 seconds.",
      "ciscoCommand": "show ip ospf interface"
    },
    {
      "id": "q002",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What is the default OSPF dead interval on a broadcast network?",
      "options": [
        "10 seconds",
        "20 seconds",
        "30 seconds",
        "40 seconds"
      ],
      "correct": 3,
      "explanation": "The dead interval is 4 times the hello interval. With a 10-second hello, the dead interval is 40 seconds.",
      "ciscoCommand": "show ip ospf interface"
    },
    {
      "id": "q003",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "Which OSPF neighbor state indicates that the router has received a hello from a neighbor but the local router ID is not in the neighbor's hello?",
      "options": [
        "Down",
        "Init",
        "2-Way",
        "ExStart"
      ],
      "correct": 1,
      "explanation": "In the Init state, a hello has been received from a neighbor, but bidirectional communication has not yet been established because the local router's RID is not listed in the neighbor's hello packet.",
      "ciscoCommand": "show ip ospf neighbor"
    },
    {
      "id": "q004",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "In which OSPF state does DR/BDR election occur?",
      "options": [
        "Init",
        "2-Way",
        "ExStart",
        "Exchange"
      ],
      "correct": 1,
      "explanation": "DR/BDR election happens at the 2-Way state. Once all routers on a segment reach 2-Way, the election takes place before moving to ExStart.",
      "ciscoCommand": "show ip ospf neighbor"
    },
    {
      "id": "q005",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the default OSPF cost for a FastEthernet interface with the default reference bandwidth?",
      "options": [
        "1",
        "10",
        "19",
        "100"
      ],
      "correct": 0,
      "explanation": "OSPF cost = Reference BW / Interface BW. Default reference is 100 Mbps. 100/100 = 1. This is why Cisco recommends changing the reference bandwidth.",
      "ciscoCommand": "show ip ospf interface"
    },
    {
      "id": "q006",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "Which command changes the OSPF reference bandwidth to 1 Gbps?",
      "options": [
        "bandwidth 1000",
        "auto-cost reference-bandwidth 1000",
        "ip ospf cost 1000",
        "ospf reference-bandwidth 1000"
      ],
      "correct": 1,
      "explanation": "The auto-cost reference-bandwidth command is entered under the OSPF router process and sets the reference bandwidth in Mbps.",
      "ciscoCommand": "auto-cost reference-bandwidth 1000"
    },
    {
      "id": "q007",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What determines the OSPF Router ID if no router-id is manually configured and no loopback interfaces exist?",
      "options": [
        "The lowest IP on any active interface",
        "The highest IP on any active interface",
        "The first IP configured",
        "A random 32-bit number"
      ],
      "correct": 1,
      "explanation": "OSPF selects the Router ID in this order: 1) manual router-id, 2) highest loopback IP, 3) highest IP on any active physical interface.",
      "ciscoCommand": "show ip ospf"
    },
    {
      "id": "q008",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 3,
      "type": "multiple-choice",
      "question": "Two OSPF routers on the same broadcast segment cannot form an adjacency. Both show Init state. What is the most likely cause?",
      "options": [
        "Mismatched hello timers",
        "Mismatched areas",
        "ACL blocking multicast 224.0.0.5",
        "Mismatched MTU"
      ],
      "correct": 2,
      "explanation": "If routers are stuck in Init, they can send but not receive each other's hellos. An ACL blocking OSPF multicast (224.0.0.5) on one side is a common cause. Mismatched timers would prevent even Init.",
      "ciscoCommand": "show ip ospf interface"
    },
    {
      "id": "q009",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "Which OSPF network type does NOT elect a DR/BDR?",
      "options": [
        "Broadcast",
        "Non-broadcast",
        "Point-to-point",
        "NBMA"
      ],
      "correct": 2,
      "explanation": "Point-to-point networks have only two routers, so there is no need for DR/BDR election. Broadcast and NBMA networks elect DR/BDR.",
      "ciscoCommand": "show ip ospf interface"
    },
    {
      "id": "q010",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What command enables OSPF process 1 on a router?",
      "options": [
        "ospf 1",
        "router ospf 1",
        "enable ospf 1",
        "ip ospf 1"
      ],
      "correct": 1,
      "explanation": "The router ospf <process-id> command enters OSPF configuration mode. The process ID is locally significant.",
      "ciscoCommand": "router ospf 1"
    },
    {
      "id": "q011",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What happens when an OSPF router with priority 0 is on a broadcast segment?",
      "options": [
        "It becomes DR",
        "It becomes BDR",
        "It cannot become DR or BDR",
        "It is excluded from OSPF"
      ],
      "correct": 2,
      "explanation": "Setting OSPF priority to 0 means the router will never become DR or BDR. It will remain a DROther.",
      "ciscoCommand": "ip ospf priority 0"
    },
    {
      "id": "q012",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 3,
      "type": "multiple-choice",
      "question": "OSPF routers are stuck in ExStart/Exchange state. What is the most likely cause?",
      "options": [
        "Mismatched hello timers",
        "Mismatched area IDs",
        "Mismatched MTU values",
        "Duplicate Router IDs"
      ],
      "correct": 2,
      "explanation": "ExStart/Exchange stuck state is almost always caused by MTU mismatch. The routers cannot agree on DBD packet sizes during database synchronization.",
      "ciscoCommand": "show ip ospf interface"
    },
    {
      "id": "q013",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "Which command shows OSPF neighbor adjacencies and their states?",
      "options": [
        "show ip ospf",
        "show ip route ospf",
        "show ip ospf neighbor",
        "show ip ospf database"
      ],
      "correct": 2,
      "explanation": "show ip ospf neighbor displays all OSPF neighbors with their states, priorities, dead times, and interface information.",
      "ciscoCommand": "show ip ospf neighbor"
    },
    {
      "id": "q014",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the OSPF multicast address used by all OSPF routers?",
      "options": [
        "224.0.0.1",
        "224.0.0.2",
        "224.0.0.5",
        "224.0.0.6"
      ],
      "correct": 2,
      "explanation": "224.0.0.5 is AllSPFRouters, used by all OSPF routers. 224.0.0.6 is AllDRouters, used to communicate with DR/BDR only.",
      "ciscoCommand": "show ip ospf interface"
    },
    {
      "id": "q015",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 3,
      "type": "multiple-choice",
      "question": "A network admin sees that two routers have the same OSPF Router ID. What will happen?",
      "options": [
        "They will form adjacency normally",
        "The second router will auto-change its RID",
        "Routing tables will be corrupted on both routers",
        "Neighbor adjacency will fail or flap"
      ],
      "correct": 3,
      "explanation": "Duplicate Router IDs prevent stable OSPF adjacency formation. The routers may form then drop the adjacency repeatedly, causing route flapping.",
      "ciscoCommand": "show ip ospf"
    },
    {
      "id": "q016",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "Which OSPF packet type is used to request specific LSAs from a neighbor?",
      "options": [
        "Hello",
        "DBD",
        "LSR",
        "LSU"
      ],
      "correct": 2,
      "explanation": "Link State Request (LSR) packets are sent to request specific LSAs that were seen in DBD packets but are newer than the local copy.",
      "ciscoCommand": "show ip ospf neighbor"
    },
    {
      "id": "q017",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "How does OSPF determine the best path to a destination?",
      "options": [
        "Lowest hop count",
        "Highest bandwidth",
        "Lowest cumulative cost",
        "Lowest administrative distance"
      ],
      "correct": 2,
      "explanation": "OSPF uses cumulative cost (sum of all interface costs along the path) to determine the best route. Lower cost = better path.",
      "ciscoCommand": "show ip route ospf"
    },
    {
      "id": "q018",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the OSPF administrative distance?",
      "options": [
        "90",
        "100",
        "110",
        "120"
      ],
      "correct": 2,
      "explanation": "OSPF has a default administrative distance of 110. This is higher than EIGRP (90) but lower than RIP (120) and IS-IS (115).",
      "ciscoCommand": "show ip route"
    },
    {
      "id": "q019",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "Which command configures OSPF on an interface using the newer method?",
      "options": [
        "network 10.0.0.0 0.0.0.255 area 0",
        "ip ospf 1 area 0",
        "ospf enable area 0",
        "ip ospf area 0 process 1"
      ],
      "correct": 1,
      "explanation": "The ip ospf <process-id> area <area-id> command is configured directly on the interface. This is the newer, preferred method over the network command.",
      "ciscoCommand": "ip ospf 1 area 0"
    },
    {
      "id": "q020",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 3,
      "type": "multiple-choice",
      "question": "What is the purpose of the OSPF network command wildcard mask?",
      "options": [
        "To define the subnet mask for the network",
        "To match which interfaces will participate in OSPF",
        "To set the OSPF cost on matching interfaces",
        "To filter routes advertised by OSPF"
      ],
      "correct": 1,
      "explanation": "The wildcard mask in the OSPF network command is used to match interface IP addresses. Interfaces with IPs matching the network/wildcard combination will be enabled for OSPF in the specified area.",
      "ciscoCommand": "network 10.0.0.0 0.0.0.255 area 0"
    },
    {
      "id": "q021",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "On which type of network does OSPF form full adjacencies with all neighbors (not just DR/BDR)?",
      "options": [
        "Broadcast",
        "NBMA",
        "Point-to-point",
        "Virtual link"
      ],
      "correct": 2,
      "explanation": "On point-to-point networks, all OSPF neighbors form full adjacencies since there are only two routers and no DR/BDR election.",
      "ciscoCommand": "show ip ospf neighbor"
    },
    {
      "id": "q022",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What command makes OSPF advertise a default route to other OSPF routers?",
      "options": [
        "ip route 0.0.0.0 0.0.0.0",
        "default-information originate",
        "redistribute static",
        "network 0.0.0.0 255.255.255.255 area 0"
      ],
      "correct": 1,
      "explanation": "The default-information originate command under OSPF router config advertises a default route into OSPF. The router must have a default route in its table unless you add the 'always' keyword.",
      "ciscoCommand": "default-information originate"
    },
    {
      "id": "q023",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What does OSPF use to uniquely identify each router in the OSPF domain?",
      "options": [
        "IP address",
        "MAC address",
        "Router ID",
        "Hostname"
      ],
      "correct": 2,
      "explanation": "The Router ID is a 32-bit value that uniquely identifies each OSPF router. It looks like an IP address but is just an identifier.",
      "ciscoCommand": "show ip ospf"
    },
    {
      "id": "q024",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 3,
      "type": "multiple-choice",
      "question": "After changing the OSPF Router ID, what must you do for it to take effect?",
      "options": [
        "Nothing, it changes immediately",
        "Reload the router or clear the OSPF process",
        "Save the configuration",
        "Reset the interface"
      ],
      "correct": 1,
      "explanation": "Changing the router-id command does not take effect until the OSPF process is restarted with 'clear ip ospf process' or the router is reloaded.",
      "ciscoCommand": "clear ip ospf process"
    },
    {
      "id": "q025",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What type of LSA does an ABR generate to advertise inter-area routes?",
      "options": [
        "Type 1 (Router LSA)",
        "Type 2 (Network LSA)",
        "Type 3 (Summary LSA)",
        "Type 5 (External LSA)"
      ],
      "correct": 2,
      "explanation": "ABRs generate Type 3 Summary LSAs to advertise routes between areas. Type 1 are router LSAs, Type 2 are network LSAs from DR, and Type 5 are external from ASBRs.",
      "ciscoCommand": "show ip ospf database"
    },
    {
      "id": "q026",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "Which OSPF router generates Type 2 (Network) LSAs?",
      "options": [
        "Every router on the segment",
        "The ABR",
        "The DR",
        "The ASBR"
      ],
      "correct": 2,
      "explanation": "Only the Designated Router (DR) generates Type 2 Network LSAs for multi-access segments. These describe all routers connected to the segment.",
      "ciscoCommand": "show ip ospf database"
    },
    {
      "id": "q027",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What command sets the OSPF interface priority?",
      "options": [
        "ospf priority 100",
        "ip ospf priority 100",
        "interface priority 100",
        "router priority 100"
      ],
      "correct": 1,
      "explanation": "The ip ospf priority command is configured on the interface to influence DR/BDR election. Valid range is 0-255.",
      "ciscoCommand": "ip ospf priority 100"
    },
    {
      "id": "q028",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 3,
      "type": "multiple-choice",
      "question": "A router running OSPF has these neighbors: R1=FULL/DR, R2=2WAY/DROTHER, R3=FULL/BDR. What role does this router have?",
      "options": [
        "DR",
        "BDR",
        "DROther",
        "Cannot determine"
      ],
      "correct": 2,
      "explanation": "DROthers form FULL adjacencies only with DR and BDR, and remain in 2-WAY with other DROthers. Since this router is FULL with DR and BDR but 2-WAY with a DROTHER, it is a DROther.",
      "ciscoCommand": "show ip ospf neighbor"
    },
    {
      "id": "q029",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "Which OSPF state means the LSDB is fully synchronized between neighbors?",
      "options": [
        "Loading",
        "Full",
        "Exchange",
        "2-Way"
      ],
      "correct": 1,
      "explanation": "The Full state indicates complete LSDB synchronization between OSPF neighbors. This is the final state of a successful adjacency.",
      "ciscoCommand": "show ip ospf neighbor"
    },
    {
      "id": "q030",
      "domain": "3",
      "topic": "3.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What happens if OSPF hello and dead timers don't match between neighbors?",
      "options": [
        "Adjacency forms but routes are not exchanged",
        "Adjacency forms with the lower timer",
        "Adjacency will not form",
        "The router with higher timers becomes DR"
      ],
      "correct": 2,
      "explanation": "Mismatched hello and dead timers prevent OSPF adjacency formation. Both sides must agree on these timers for the neighbor relationship to establish.",
      "ciscoCommand": "show ip ospf interface"
    },
    {
      "id": "q031",
      "domain": "3",
      "topic": "3.5",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What is the purpose of HSRP?",
      "options": [
        "Load balancing across links",
        "Encrypting router traffic",
        "Providing gateway redundancy",
        "Routing between VLANs"
      ],
      "correct": 2,
      "explanation": "HSRP (Hot Standby Router Protocol) provides first-hop gateway redundancy by allowing multiple routers to share a virtual IP and MAC address.",
      "ciscoCommand": "show standby"
    },
    {
      "id": "q032",
      "domain": "3",
      "topic": "3.5",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the default HSRP priority?",
      "options": [
        "50",
        "100",
        "110",
        "255"
      ],
      "correct": 1,
      "explanation": "The default HSRP priority is 100. The router with the highest priority becomes the Active router. Ties are broken by highest IP address.",
      "ciscoCommand": "show standby"
    },
    {
      "id": "q033",
      "domain": "3",
      "topic": "3.5",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "In HSRP, what does the preempt command do?",
      "options": [
        "Forces the router to become active immediately",
        "Allows a higher-priority router to take over as Active",
        "Prevents the standby router from becoming active",
        "Resets the HSRP group"
      ],
      "correct": 1,
      "explanation": "Preempt allows a router with a higher priority to take over the Active role from the current Active router. Without preempt, the current Active keeps its role even if a higher-priority router joins.",
      "ciscoCommand": "standby 1 preempt"
    },
    {
      "id": "q034",
      "domain": "3",
      "topic": "3.5",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What virtual MAC address does HSRP version 1 use for group 1?",
      "options": [
        "0000.0c07.ac01",
        "0000.0c9f.f001",
        "0000.5e00.0101",
        "0005.73a0.0001"
      ],
      "correct": 0,
      "explanation": "HSRP v1 uses the MAC format 0000.0c07.acXX where XX is the group number in hex. Group 1 = 0000.0c07.ac01.",
      "ciscoCommand": "show standby"
    },
    {
      "id": "q035",
      "domain": "3",
      "topic": "3.5",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "Which protocol is Cisco proprietary for first hop redundancy?",
      "options": [
        "VRRP",
        "HSRP",
        "GLBP",
        "STP"
      ],
      "correct": 1,
      "explanation": "HSRP is Cisco proprietary. VRRP is the open standard equivalent. GLBP is also Cisco but adds load balancing.",
      "ciscoCommand": "show standby"
    },
    {
      "id": "q036",
      "domain": "3",
      "topic": "3.5",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What HSRP state is the router in when it is actively forwarding traffic for the virtual IP?",
      "options": [
        "Listen",
        "Standby",
        "Active",
        "Init"
      ],
      "correct": 2,
      "explanation": "The Active router is responsible for forwarding traffic sent to the virtual IP address. The Standby router is the backup ready to take over.",
      "ciscoCommand": "show standby"
    },
    {
      "id": "q037",
      "domain": "3",
      "topic": "3.5",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "How do you configure HSRP on an interface?",
      "options": [
        "hsrp 1 ip 10.0.0.1",
        "standby 1 ip 10.0.0.1",
        "vrrp 1 ip 10.0.0.1",
        "redundancy 1 ip 10.0.0.1"
      ],
      "correct": 1,
      "explanation": "HSRP is configured with the 'standby' command on the interface, specifying the group number and virtual IP address.",
      "ciscoCommand": "standby 1 ip 10.0.0.1"
    },
    {
      "id": "q038",
      "domain": "3",
      "topic": "3.5",
      "difficulty": 3,
      "type": "multiple-choice",
      "question": "A network has two HSRP routers. R1 has priority 110 with preempt. R2 has priority 100 and is currently Active. What happens when R1 comes online?",
      "options": [
        "R1 stays in Standby state",
        "R2 remains Active, R1 becomes Standby",
        "R1 becomes Active, R2 becomes Standby",
        "Both become Active temporarily"
      ],
      "correct": 2,
      "explanation": "Because R1 has a higher priority (110) AND preempt is configured, R1 will take over the Active role from R2 when it comes online.",
      "ciscoCommand": "show standby"
    },
    {
      "id": "q039",
      "domain": "3",
      "topic": "3.5",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the default hello interval for HSRP?",
      "options": [
        "1 second",
        "3 seconds",
        "5 seconds",
        "10 seconds"
      ],
      "correct": 1,
      "explanation": "HSRP sends hello packets every 3 seconds by default. The hold timer is 10 seconds (roughly 3x the hello).",
      "ciscoCommand": "show standby"
    },
    {
      "id": "q040",
      "domain": "3",
      "topic": "3.5",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What key difference does GLBP have over HSRP?",
      "options": [
        "GLBP supports IPv6",
        "GLBP provides load balancing across multiple routers",
        "GLBP is an open standard",
        "GLBP uses lower CPU resources"
      ],
      "correct": 1,
      "explanation": "GLBP (Gateway Load Balancing Protocol) distributes traffic across multiple routers using multiple virtual MAC addresses, providing both redundancy and load balancing.",
      "ciscoCommand": "show glbp"
    },
    {
      "id": "q041",
      "domain": "3",
      "topic": "3.3",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What is the command to configure a default static route?",
      "options": [
        "ip route 0.0.0.0 0.0.0.0 10.0.0.1",
        "ip route default 10.0.0.1",
        "ip default-route 10.0.0.1",
        "route 0.0.0.0 0.0.0.0 10.0.0.1"
      ],
      "correct": 0,
      "explanation": "A default static route uses 0.0.0.0 0.0.0.0 as the destination and mask, pointing to the next-hop IP. This matches all destinations not in the routing table.",
      "ciscoCommand": "ip route 0.0.0.0 0.0.0.0 10.0.0.1"
    },
    {
      "id": "q042",
      "domain": "3",
      "topic": "3.3",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is a floating static route?",
      "options": [
        "A route that uses DHCP for next-hop",
        "A backup static route with a higher AD than the primary route",
        "A route that automatically adjusts its metric",
        "A route to a loopback interface"
      ],
      "correct": 1,
      "explanation": "A floating static route has a manually set administrative distance higher than the primary routing protocol. It only appears in the routing table when the primary route fails.",
      "ciscoCommand": "ip route 10.0.0.0 255.255.255.0 10.1.1.1 210"
    },
    {
      "id": "q043",
      "domain": "3",
      "topic": "3.3",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What is the administrative distance of a static route by default?",
      "options": [
        "0",
        "1",
        "5",
        "20"
      ],
      "correct": 1,
      "explanation": "Static routes have a default AD of 1 (0 is for directly connected networks). This makes static routes preferred over any dynamic routing protocol.",
      "ciscoCommand": "show ip route"
    },
    {
      "id": "q044",
      "domain": "3",
      "topic": "3.3",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "Which command creates a static route to network 192.168.10.0/24 via next-hop 10.0.0.2?",
      "options": [
        "ip route 192.168.10.0 255.255.255.0 10.0.0.2",
        "ip route 192.168.10.0/24 10.0.0.2",
        "route add 192.168.10.0 mask 255.255.255.0 10.0.0.2",
        "ip static-route 192.168.10.0 10.0.0.2"
      ],
      "correct": 0,
      "explanation": "The ip route command uses the format: ip route <network> <mask> <next-hop-ip>. CIDR notation is not used in Cisco IOS static routes.",
      "ciscoCommand": "ip route 192.168.10.0 255.255.255.0 10.0.0.2"
    },
    {
      "id": "q045",
      "domain": "3",
      "topic": "3.3",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What type of static route specifies the exit interface instead of a next-hop IP?",
      "options": [
        "Recursive static route",
        "Directly attached static route",
        "Floating static route",
        "Default static route"
      ],
      "correct": 1,
      "explanation": "A directly attached (or directly connected) static route specifies the exit interface. The router ARPs for the destination on that interface.",
      "ciscoCommand": "ip route 10.0.0.0 255.0.0.0 GigabitEthernet0/0"
    },
    {
      "id": "q046",
      "domain": "3",
      "topic": "3.3",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is a host route?",
      "options": [
        "A route to a single IP address with /32 mask",
        "A route learned from the host",
        "A route to the default gateway",
        "A route to a directly connected network"
      ],
      "correct": 0,
      "explanation": "A host route has a /32 subnet mask (255.255.255.255), matching exactly one IP address. It's used when you need to route traffic to a specific host.",
      "ciscoCommand": "ip route 10.0.0.5 255.255.255.255 10.1.1.1"
    },
    {
      "id": "q047",
      "domain": "3",
      "topic": "3.3",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the IPv6 static route command for a default route via next-hop 2001:db8::1?",
      "options": [
        "ipv6 route 0::0/0 2001:db8::1",
        "ipv6 route ::/0 2001:db8::1",
        "ipv6 route default 2001:db8::1",
        "ip route ::/0 2001:db8::1"
      ],
      "correct": 1,
      "explanation": "The IPv6 default route uses ::/0 as the destination prefix. The command starts with 'ipv6 route' not 'ip route'.",
      "ciscoCommand": "ipv6 route ::/0 2001:db8::1"
    },
    {
      "id": "q048",
      "domain": "3",
      "topic": "3.3",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What does 'S*' mean in the routing table output?",
      "options": [
        "Static route to a subnet",
        "OSPF summary route",
        "Static default route (candidate default)",
        "Static floating route"
      ],
      "correct": 2,
      "explanation": "In show ip route, S* indicates a static candidate default route. The asterisk means it is a candidate for the gateway of last resort.",
      "ciscoCommand": "show ip route"
    },
    {
      "id": "q049",
      "domain": "3",
      "topic": "3.3",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "A router has both a static route (AD 1) and an OSPF route (AD 110) to the same network. Which is used?",
      "options": [
        "OSPF route",
        "Static route",
        "Both are used for load balancing",
        "The route with the lowest metric"
      ],
      "correct": 1,
      "explanation": "The route with the lowest Administrative Distance is preferred. Static (AD 1) beats OSPF (AD 110), so the static route is installed in the routing table.",
      "ciscoCommand": "show ip route"
    },
    {
      "id": "q050",
      "domain": "3",
      "topic": "3.3",
      "difficulty": 3,
      "type": "multiple-choice",
      "question": "How do you configure a floating static route as backup to OSPF?",
      "options": [
        "ip route 10.0.0.0 255.0.0.0 10.1.1.1 111",
        "ip route 10.0.0.0 255.0.0.0 10.1.1.1 floating",
        "ip route 10.0.0.0 255.0.0.0 10.1.1.1 backup",
        "ip route 10.0.0.0 255.0.0.0 10.1.1.1 ospf-backup"
      ],
      "correct": 0,
      "explanation": "Set the AD higher than OSPF (110), like 111, at the end of the ip route command. The static route only enters the table if the OSPF route disappears.",
      "ciscoCommand": "ip route 10.0.0.0 255.0.0.0 10.1.1.1 111"
    },
    {
      "id": "q051",
      "domain": "3",
      "topic": "3.3",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What command verifies that a static route is in the routing table?",
      "options": [
        "show ip static",
        "show ip route static",
        "show running-config | include ip route",
        "Both B and C"
      ],
      "correct": 3,
      "explanation": "show ip route static filters the routing table to show only static routes. show running-config | include ip route shows configured static routes. Both are useful verification methods.",
      "ciscoCommand": "show ip route static"
    },
    {
      "id": "q052",
      "domain": "3",
      "topic": "3.3",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the next-hop type called when you specify both exit interface and next-hop IP?",
      "options": [
        "Recursive",
        "Directly attached",
        "Fully specified",
        "Floating"
      ],
      "correct": 2,
      "explanation": "A fully specified static route includes both the exit interface and the next-hop IP address, which is the most explicit and recommended form.",
      "ciscoCommand": "ip route 10.0.0.0 255.0.0.0 Gi0/0 10.1.1.1"
    },
    {
      "id": "q053",
      "domain": "3",
      "topic": "3.1",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What does 'O' represent in the routing table?",
      "options": [
        "OSPF",
        "EIGRP",
        "Static",
        "Connected"
      ],
      "correct": 0,
      "explanation": "In the routing table, O indicates an OSPF-learned route. C=Connected, S=Static, D=EIGRP, R=RIP, B=BGP.",
      "ciscoCommand": "show ip route"
    },
    {
      "id": "q054",
      "domain": "3",
      "topic": "3.1",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What does 'via' mean in a routing table entry?",
      "options": [
        "The route is verified",
        "The next-hop IP address to reach the destination",
        "The interface VLAN ID",
        "The route metric value"
      ],
      "correct": 1,
      "explanation": "The 'via' field in a routing table entry indicates the next-hop IP address that packets should be forwarded to reach the destination network.",
      "ciscoCommand": "show ip route"
    },
    {
      "id": "q055",
      "domain": "3",
      "topic": "3.1",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the gateway of last resort?",
      "options": [
        "The primary default gateway",
        "The route used when no other route matches",
        "The backup HSRP router",
        "The DNS server"
      ],
      "correct": 1,
      "explanation": "The gateway of last resort is the default route (0.0.0.0/0). It is used when no more specific route matches the destination IP address.",
      "ciscoCommand": "show ip route"
    },
    {
      "id": "q056",
      "domain": "3",
      "topic": "3.2",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "If a router has routes for 10.0.0.0/8, 10.1.0.0/16, and 10.1.1.0/24, which is used for a packet to 10.1.1.50?",
      "options": [
        "10.0.0.0/8",
        "10.1.0.0/16",
        "10.1.1.0/24",
        "All three are used"
      ],
      "correct": 2,
      "explanation": "Longest prefix match: the router selects the route with the most specific (longest) matching prefix. /24 is more specific than /16 or /8 for 10.1.1.50.",
      "ciscoCommand": "show ip route 10.1.1.50"
    },
    {
      "id": "q057",
      "domain": "3",
      "topic": "3.2",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What is the longest prefix match rule?",
      "options": [
        "The route with the longest network prefix wins",
        "The route with the lowest metric wins",
        "The route with the lowest AD wins",
        "The oldest route wins"
      ],
      "correct": 0,
      "explanation": "Longest prefix match is the primary rule routers use for forwarding decisions. The most specific route (longest matching prefix) is always selected first, before AD or metric.",
      "ciscoCommand": "show ip route"
    },
    {
      "id": "q058",
      "domain": "3",
      "topic": "3.2",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "A router has a static route (AD 1) to 10.0.0.0/8 and an OSPF route to 10.0.0.0/16. A packet arrives for 10.0.0.5. Which route is used?",
      "options": [
        "Static route (lower AD)",
        "OSPF route (longer prefix)",
        "Both equally",
        "Neither, packet is dropped"
      ],
      "correct": 1,
      "explanation": "Longest prefix match takes priority over Administrative Distance. The /16 OSPF route is more specific than the /8 static route for 10.0.0.5.",
      "ciscoCommand": "show ip route 10.0.0.5"
    },
    {
      "id": "q059",
      "domain": "3",
      "topic": "3.1",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What does [110/20] mean next to a route in 'show ip route'?",
      "options": [
        "Interface number/VLAN ID",
        "Administrative distance/Metric",
        "Cost/Bandwidth",
        "Priority/Weight"
      ],
      "correct": 1,
      "explanation": "The first number in brackets is the Administrative Distance and the second is the metric (cost). [110/20] means AD 110 (OSPF) with a metric of 20.",
      "ciscoCommand": "show ip route"
    },
    {
      "id": "q060",
      "domain": "2",
      "topic": "2.5",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What is the primary purpose of Spanning Tree Protocol?",
      "options": [
        "Load balancing",
        "Loop prevention",
        "VLAN segmentation",
        "QoS enforcement"
      ],
      "correct": 0,
      "explanation": "STP prevents Layer 2 loops in networks with redundant paths by blocking some ports while keeping others forwarding.",
      "ciscoCommand": "show spanning-tree"
    },
    {
      "id": "q061",
      "domain": "2",
      "topic": "2.5",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What value determines which switch becomes the root bridge?",
      "options": [
        "Highest MAC address",
        "Lowest Bridge ID",
        "Highest priority",
        "Most ports"
      ],
      "correct": 1,
      "explanation": "The switch with the lowest Bridge ID (Priority + MAC) becomes the root bridge. Default priority is 32768.",
      "ciscoCommand": "show spanning-tree"
    },
    {
      "id": "q062",
      "domain": "2",
      "topic": "2.5",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the default STP bridge priority?",
      "options": [
        "4096",
        "8192",
        "32768",
        "65535"
      ],
      "correct": 2,
      "explanation": "The default bridge priority is 32768. Priority must be set in increments of 4096 and ranges from 0 to 61440.",
      "ciscoCommand": "show spanning-tree"
    },
    {
      "id": "q063",
      "domain": "2",
      "topic": "2.5",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "How long does STP convergence take with default timers?",
      "options": [
        "2 seconds",
        "15 seconds",
        "30-50 seconds",
        "120 seconds"
      ],
      "correct": 2,
      "explanation": "STP convergence takes 30-50 seconds: Max Age (20s) + Listening (15s) + Learning (15s). This is why RSTP was developed.",
      "ciscoCommand": "show spanning-tree"
    },
    {
      "id": "q064",
      "domain": "2",
      "topic": "2.5",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What are the STP port states in order?",
      "options": [
        "Blocking, Listening, Learning, Forwarding",
        "Disabled, Blocking, Learning, Forwarding",
        "Blocking, Learning, Forwarding",
        "Init, Learning, Ready, Active"
      ],
      "correct": 0,
      "explanation": "STP ports transition: Blocking \u2192 Listening (15s) \u2192 Learning (15s) \u2192 Forwarding. Listening sends/receives BPDUs, Learning adds MACs.",
      "ciscoCommand": "show spanning-tree"
    },
    {
      "id": "q065",
      "domain": "2",
      "topic": "2.5",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What does PortFast do?",
      "options": [
        "Blocks all BPDUs",
        "Immediately transitions a port to Forwarding",
        "Increases STP priority",
        "Enables RSTP on a port"
      ],
      "correct": 1,
      "explanation": "PortFast skips the Listening and Learning states, transitioning directly to Forwarding. Only use on access ports connected to end devices.",
      "ciscoCommand": "spanning-tree portfast"
    },
    {
      "id": "q066",
      "domain": "2",
      "topic": "2.5",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What happens when a PortFast-enabled port with BPDU Guard receives a BPDU?",
      "options": [
        "The port ignores the BPDU",
        "The port goes to blocking state",
        "The port is put in err-disabled state",
        "The switch reboots"
      ],
      "correct": 2,
      "explanation": "BPDU Guard places the port in err-disabled state when a BPDU is received, preventing potential loops from unauthorized switches.",
      "ciscoCommand": "spanning-tree bpduguard enable"
    },
    {
      "id": "q067",
      "domain": "2",
      "topic": "2.5",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is a root port?",
      "options": [
        "The port on the root bridge that connects to other switches",
        "The port on a non-root switch with the best path to the root bridge",
        "The first port configured on a switch",
        "Any port in forwarding state"
      ],
      "correct": 1,
      "explanation": "Each non-root switch has exactly one root port \u2014 the port with the lowest cost path to the root bridge.",
      "ciscoCommand": "show spanning-tree"
    },
    {
      "id": "q068",
      "domain": "2",
      "topic": "2.5",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is a designated port?",
      "options": [
        "The port that connects to the root bridge",
        "The port on a segment that forwards traffic toward the root",
        "The management port",
        "The port with the highest priority"
      ],
      "correct": 1,
      "explanation": "Each segment has one designated port \u2014 the port with the best path back to root on that segment. All root bridge ports are designated.",
      "ciscoCommand": "show spanning-tree"
    },
    {
      "id": "q069",
      "domain": "2",
      "topic": "2.5",
      "difficulty": 3,
      "type": "multiple-choice",
      "question": "Switch A (priority 32768, MAC 0000.0000.000A) and Switch B (priority 32768, MAC 0000.0000.000B) are connected. Which is root?",
      "options": [
        "Switch A",
        "Switch B",
        "Both are root",
        "Neither is root"
      ],
      "correct": 0,
      "explanation": "With equal priorities, the switch with the lowest MAC address becomes root. 000A < 000B, so Switch A wins.",
      "ciscoCommand": "show spanning-tree"
    },
    {
      "id": "q070",
      "domain": "2",
      "topic": "2.5",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "Which RSTP port state replaces Blocking, Listening, and Disabled?",
      "options": [
        "Down",
        "Inactive",
        "Discarding",
        "Standby"
      ],
      "correct": 2,
      "explanation": "RSTP consolidates Blocking, Listening, and Disabled into a single Discarding state. RSTP has only 3 states: Discarding, Learning, Forwarding.",
      "ciscoCommand": "show spanning-tree"
    },
    {
      "id": "q071",
      "domain": "2",
      "topic": "2.5",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the STP path cost for a Gigabit Ethernet link?",
      "options": [
        "2",
        "4",
        "19",
        "100"
      ],
      "correct": 1,
      "explanation": "The IEEE revised STP costs: 10G=2, 1G=4, 100M=19, 10M=100. These were updated from the original short values.",
      "ciscoCommand": "show spanning-tree"
    },
    {
      "id": "q072",
      "domain": "2",
      "topic": "2.5",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What command makes a switch become the root bridge?",
      "options": [
        "spanning-tree root primary",
        "spanning-tree vlan 1 root primary",
        "spanning-tree priority 0",
        "set spanning-tree root"
      ],
      "correct": 1,
      "explanation": "spanning-tree vlan <id> root primary sets the priority to a value low enough to guarantee root bridge election (usually 24576 or lower).",
      "ciscoCommand": "spanning-tree vlan 1 root primary"
    },
    {
      "id": "q073",
      "domain": "2",
      "topic": "2.5",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What type of port does RSTP add that STP does not have?",
      "options": [
        "Root port",
        "Alternate port",
        "Designated port",
        "Forwarding port"
      ],
      "correct": 1,
      "explanation": "RSTP adds Alternate and Backup port roles. An Alternate port provides an alternative path to root (replaces blocking behavior) for faster failover.",
      "ciscoCommand": "show spanning-tree"
    },
    {
      "id": "q074",
      "domain": "2",
      "topic": "2.5",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What Cisco STP mode implements RSTP per VLAN?",
      "options": [
        "STP",
        "RSTP",
        "PVST+",
        "Rapid PVST+"
      ],
      "correct": 3,
      "explanation": "Rapid PVST+ is Cisco's per-VLAN implementation of RSTP, combining the fast convergence of RSTP with per-VLAN spanning tree instances.",
      "ciscoCommand": "spanning-tree mode rapid-pvst"
    },
    {
      "id": "q075",
      "domain": "2",
      "topic": "2.5",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the STP hello timer interval?",
      "options": [
        "1 second",
        "2 seconds",
        "5 seconds",
        "10 seconds"
      ],
      "correct": 1,
      "explanation": "The root bridge sends BPDUs every 2 seconds (hello timer). Non-root switches relay these BPDUs.",
      "ciscoCommand": "show spanning-tree"
    },
    {
      "id": "q076",
      "domain": "2",
      "topic": "2.5",
      "difficulty": 3,
      "type": "multiple-choice",
      "question": "A port is in err-disabled state due to BPDU Guard. How do you recover it?",
      "options": [
        "Reload the switch",
        "Shut/no shut the interface",
        "It recovers automatically after 5 minutes",
        "Delete the spanning-tree config"
      ],
      "correct": 1,
      "explanation": "To recover a BPDU Guard err-disabled port, you must manually shut and no shut the interface. You can also enable automatic recovery with errdisable recovery cause bpduguard.",
      "ciscoCommand": "errdisable recovery cause bpduguard"
    },
    {
      "id": "q077",
      "domain": "2",
      "topic": "2.5",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "In RSTP, what mechanism allows rapid transition to forwarding on point-to-point links?",
      "options": [
        "PortFast",
        "Proposal/Agreement",
        "BPDU Guard",
        "UplinkFast"
      ],
      "correct": 1,
      "explanation": "RSTP uses the Proposal/Agreement mechanism on point-to-point links to rapidly transition ports to forwarding without waiting for timers.",
      "ciscoCommand": "show spanning-tree"
    },
    {
      "id": "q078",
      "domain": "2",
      "topic": "2.4",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What is the purpose of EtherChannel?",
      "options": [
        "VLAN trunking",
        "Bundling multiple physical links into one logical link",
        "Spanning tree optimization",
        "QoS marking"
      ],
      "correct": 1,
      "explanation": "EtherChannel bundles multiple physical links into a single logical link, providing increased bandwidth and redundancy without STP blocking.",
      "ciscoCommand": "show etherchannel summary"
    },
    {
      "id": "q079",
      "domain": "2",
      "topic": "2.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "Which EtherChannel protocol is an IEEE standard?",
      "options": [
        "PAgP",
        "LACP",
        "CDP",
        "DTP"
      ],
      "correct": 1,
      "explanation": "LACP (Link Aggregation Control Protocol) is the IEEE 802.3ad standard. PAgP is Cisco proprietary.",
      "ciscoCommand": "show etherchannel summary"
    },
    {
      "id": "q080",
      "domain": "2",
      "topic": "2.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What LACP mode actively tries to form an EtherChannel?",
      "options": [
        "On",
        "Active",
        "Passive",
        "Desirable"
      ],
      "correct": 1,
      "explanation": "LACP active mode actively sends LACP packets to negotiate an EtherChannel. Passive mode only responds. At least one side must be active.",
      "ciscoCommand": "channel-group 1 mode active"
    },
    {
      "id": "q081",
      "domain": "2",
      "topic": "2.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "Which LACP mode combinations will form an EtherChannel?",
      "options": [
        "Active-Active and Active-Passive",
        "Active-Passive only",
        "Passive-Passive and Active-Passive",
        "Active-Active only"
      ],
      "correct": 0,
      "explanation": "LACP requires at least one side to be Active. Active-Active and Active-Passive both form EtherChannels. Passive-Passive will not.",
      "ciscoCommand": "show etherchannel summary"
    },
    {
      "id": "q082",
      "domain": "2",
      "topic": "2.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What command assigns an interface to EtherChannel group 1 using LACP active mode?",
      "options": [
        "etherchannel 1 lacp active",
        "channel-group 1 mode active",
        "lacp channel-group 1",
        "interface port-channel 1"
      ],
      "correct": 1,
      "explanation": "channel-group <number> mode active is the correct command to add an interface to an EtherChannel using LACP active negotiation.",
      "ciscoCommand": "channel-group 1 mode active"
    },
    {
      "id": "q083",
      "domain": "2",
      "topic": "2.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What must match for EtherChannel to form?",
      "options": [
        "Speed, duplex, VLAN, and trunk settings",
        "Only speed and duplex",
        "Only VLAN configuration",
        "Only the protocol (LACP/PAgP)"
      ],
      "correct": 0,
      "explanation": "All member interfaces must have matching speed, duplex, VLAN assignments, trunking mode, and allowed VLANs for EtherChannel to form.",
      "ciscoCommand": "show etherchannel summary"
    },
    {
      "id": "q084",
      "domain": "2",
      "topic": "2.4",
      "difficulty": 3,
      "type": "multiple-choice",
      "question": "An EtherChannel shows (SD) flags in show etherchannel summary. What does this mean?",
      "options": [
        "Layer 2 EtherChannel, down",
        "Spanning-tree designated",
        "Suspended and down",
        "Send/receive disabled"
      ],
      "correct": 0,
      "explanation": "S=Layer 2 (switched), D=Down. The EtherChannel has been created but is not functioning. Check for mismatched parameters between member interfaces.",
      "ciscoCommand": "show etherchannel summary"
    },
    {
      "id": "q085",
      "domain": "2",
      "topic": "2.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "How many physical interfaces can be bundled into a single EtherChannel?",
      "options": [
        "2",
        "4",
        "8",
        "16"
      ],
      "correct": 2,
      "explanation": "Up to 8 active interfaces can be bundled. With LACP, you can configure up to 16 (8 active + 8 standby/hot-standby).",
      "ciscoCommand": "show etherchannel summary"
    },
    {
      "id": "q086",
      "domain": "2",
      "topic": "2.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What command shows the status of all EtherChannel bundles?",
      "options": [
        "show port-channel",
        "show etherchannel summary",
        "show channel-group",
        "show lacp status"
      ],
      "correct": 1,
      "explanation": "show etherchannel summary provides a concise overview of all EtherChannel bundles, their status, protocol, and member ports.",
      "ciscoCommand": "show etherchannel summary"
    },
    {
      "id": "q087",
      "domain": "2",
      "topic": "2.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the 'on' mode for EtherChannel?",
      "options": [
        "Force EtherChannel without negotiation protocol",
        "Enable LACP",
        "Enable PAgP",
        "Default mode"
      ],
      "correct": 0,
      "explanation": "The 'on' mode forces EtherChannel without LACP or PAgP negotiation. Both sides must be set to 'on'. No protocol packets are exchanged.",
      "ciscoCommand": "channel-group 1 mode on"
    },
    {
      "id": "q088",
      "domain": "2",
      "topic": "2.2",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What is the default native VLAN on a Cisco trunk?",
      "options": [
        "VLAN 0",
        "VLAN 1",
        "VLAN 100",
        "VLAN 1000"
      ],
      "correct": 1,
      "explanation": "VLAN 1 is the default native VLAN. Frames from the native VLAN are sent untagged on 802.1Q trunks.",
      "ciscoCommand": "show interfaces trunk"
    },
    {
      "id": "q089",
      "domain": "2",
      "topic": "2.2",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the purpose of a trunk port?",
      "options": [
        "Connect end-user devices",
        "Carry traffic from multiple VLANs between switches",
        "Provide PoE power",
        "Monitor network traffic"
      ],
      "correct": 1,
      "explanation": "Trunk ports carry traffic for multiple VLANs between switches using 802.1Q tagging. Each frame is tagged with its VLAN ID except native VLAN.",
      "ciscoCommand": "show interfaces trunk"
    },
    {
      "id": "q090",
      "domain": "2",
      "topic": "2.2",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What command configures a port as a trunk?",
      "options": [
        "switchport mode trunk",
        "switchport trunk enable",
        "trunk mode on",
        "interface trunk"
      ],
      "correct": 0,
      "explanation": "switchport mode trunk forces the interface into trunk mode. On some switches, you may also need switchport trunk encapsulation dot1q first.",
      "ciscoCommand": "switchport mode trunk"
    },
    {
      "id": "q091",
      "domain": "2",
      "topic": "2.2",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "How do you change the native VLAN on a trunk to VLAN 99?",
      "options": [
        "native vlan 99",
        "switchport trunk native vlan 99",
        "vlan 99 native",
        "switchport native 99"
      ],
      "correct": 1,
      "explanation": "switchport trunk native vlan <id> changes the native VLAN on a trunk port. Best practice is to use an unused VLAN.",
      "ciscoCommand": "switchport trunk native vlan 99"
    },
    {
      "id": "q092",
      "domain": "2",
      "topic": "2.2",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What command limits trunk traffic to VLANs 10, 20, and 30?",
      "options": [
        "switchport trunk vlan 10,20,30",
        "switchport trunk allowed vlan 10,20,30",
        "vlan allowed 10,20,30",
        "switchport filter vlan 10,20,30"
      ],
      "correct": 1,
      "explanation": "switchport trunk allowed vlan defines which VLANs can traverse the trunk. Only specified VLANs will have their traffic carried.",
      "ciscoCommand": "switchport trunk allowed vlan 10,20,30"
    },
    {
      "id": "q093",
      "domain": "2",
      "topic": "2.2",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is DTP?",
      "options": [
        "Dynamic Trunk Protocol \u2014 negotiates trunk formation",
        "Data Transfer Protocol",
        "Dynamic Tagging Protocol",
        "Default Trunk Policy"
      ],
      "correct": 0,
      "explanation": "DTP (Dynamic Trunking Protocol) automatically negotiates whether a link becomes a trunk. Best practice is to disable it with switchport nonegotiate.",
      "ciscoCommand": "switchport nonegotiate"
    },
    {
      "id": "q094",
      "domain": "2",
      "topic": "2.2",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "Which DTP mode combinations form a trunk?",
      "options": [
        "Desirable-Desirable and Desirable-Auto",
        "Auto-Auto only",
        "Trunk-Access",
        "Desirable-Desirable only"
      ],
      "correct": 0,
      "explanation": "Desirable-Desirable and Desirable-Auto both form trunks. Auto-Auto does NOT form a trunk \u2014 neither side actively negotiates.",
      "ciscoCommand": "show dtp interface"
    },
    {
      "id": "q095",
      "domain": "2",
      "topic": "2.2",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What happens if the native VLAN is mismatched on a trunk?",
      "options": [
        "The trunk goes down",
        "Frames may be forwarded to the wrong VLAN",
        "Only tagged VLANs are affected",
        "Nothing, it self-corrects"
      ],
      "correct": 1,
      "explanation": "Native VLAN mismatch causes untagged frames to be placed in different VLANs on each end, creating a potential security risk (VLAN hopping).",
      "ciscoCommand": "show interfaces trunk"
    },
    {
      "id": "q096",
      "domain": "2",
      "topic": "2.2",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What is the 802.1Q tag size?",
      "options": [
        "2 bytes",
        "4 bytes",
        "8 bytes",
        "12 bytes"
      ],
      "correct": 1,
      "explanation": "The 802.1Q tag is 4 bytes inserted into the Ethernet frame: 2-byte TPID (0x8100) and 2-byte TCI containing priority, DEI, and 12-bit VLAN ID.",
      "ciscoCommand": "show interfaces trunk"
    },
    {
      "id": "q097",
      "domain": "2",
      "topic": "2.2",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What command verifies trunk configuration and active VLANs?",
      "options": [
        "show vlan brief",
        "show interfaces trunk",
        "show switchport",
        "show trunk status"
      ],
      "correct": 1,
      "explanation": "show interfaces trunk displays trunk ports, their mode, encapsulation, native VLAN, and allowed/active VLANs.",
      "ciscoCommand": "show interfaces trunk"
    },
    {
      "id": "q098",
      "domain": "2",
      "topic": "2.3",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What is CDP?",
      "options": [
        "Cisco Discovery Protocol \u2014 discovers directly connected Cisco devices",
        "Cisco Data Protocol",
        "Common Discovery Platform",
        "Central Directory Protocol"
      ],
      "correct": 0,
      "explanation": "CDP is a Cisco proprietary Layer 2 protocol that discovers directly connected Cisco devices and gathers information about them.",
      "ciscoCommand": "show cdp neighbors"
    },
    {
      "id": "q099",
      "domain": "2",
      "topic": "2.3",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is LLDP and how does it differ from CDP?",
      "options": [
        "LLDP is a faster version of CDP",
        "LLDP is an IEEE standard; CDP is Cisco proprietary",
        "LLDP works at Layer 3; CDP at Layer 2",
        "LLDP only works on wireless"
      ],
      "correct": 1,
      "explanation": "LLDP (Link Layer Discovery Protocol) is the IEEE 802.1AB standard equivalent to CDP. It works with multi-vendor equipment.",
      "ciscoCommand": "show lldp neighbors"
    },
    {
      "id": "q100",
      "domain": "2",
      "topic": "2.3",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What command shows CDP neighbor details?",
      "options": [
        "show cdp",
        "show cdp neighbors detail",
        "show cdp interfaces",
        "show cdp status"
      ],
      "correct": 1,
      "explanation": "show cdp neighbors detail shows platform, IP address, capabilities, software version, and interface information for each CDP neighbor.",
      "ciscoCommand": "show cdp neighbors detail"
    },
    {
      "id": "q101",
      "domain": "2",
      "topic": "2.3",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "How do you disable CDP on a specific interface?",
      "options": [
        "cdp disable",
        "no cdp enable",
        "no cdp run",
        "cdp off"
      ],
      "correct": 1,
      "explanation": "'no cdp enable' disables CDP on a specific interface. 'no cdp run' disables CDP globally on the entire device.",
      "ciscoCommand": "no cdp enable"
    },
    {
      "id": "q102",
      "domain": "2",
      "topic": "2.3",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What information can CDP provide about a neighbor?",
      "options": [
        "Device ID, IP address, platform, capabilities, interface",
        "Only hostname and IP",
        "Only MAC address",
        "Only VLAN information"
      ],
      "correct": 0,
      "explanation": "CDP provides device ID, IP addresses, platform/model, capabilities (router/switch), local and remote interface names, software version, and native VLAN.",
      "ciscoCommand": "show cdp neighbors detail"
    },
    {
      "id": "q103",
      "domain": "2",
      "topic": "2.6",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What protocol does a Cisco lightweight AP use to communicate with a WLC?",
      "options": [
        "HTTP",
        "SNMP",
        "CAPWAP",
        "CDP"
      ],
      "correct": 2,
      "explanation": "CAPWAP (Control and Provisioning of Wireless Access Points) is the protocol used between lightweight APs and Wireless LAN Controllers.",
      "ciscoCommand": "show ap summary"
    },
    {
      "id": "q104",
      "domain": "2",
      "topic": "2.6",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the difference between autonomous and lightweight APs?",
      "options": [
        "Autonomous APs are cheaper",
        "Lightweight APs require a WLC; autonomous APs operate independently",
        "Autonomous APs support more clients",
        "Lightweight APs have stronger signals"
      ],
      "correct": 1,
      "explanation": "Autonomous APs are self-contained with local configuration. Lightweight APs are managed centrally by a WLC and download their config from it.",
      "ciscoCommand": "show ap summary"
    },
    {
      "id": "q105",
      "domain": "2",
      "topic": "2.6",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What AP mode handles normal client data traffic?",
      "options": [
        "Monitor",
        "Local",
        "Sniffer",
        "FlexConnect"
      ],
      "correct": 1,
      "explanation": "Local mode is the default AP mode. The AP creates CAPWAP tunnels to the WLC for both management and client data traffic.",
      "ciscoCommand": "show ap summary"
    },
    {
      "id": "q106",
      "domain": "2",
      "topic": "2.6",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What AP mode allows local switching of client traffic at a branch office?",
      "options": [
        "Local",
        "Monitor",
        "FlexConnect",
        "Bridge"
      ],
      "correct": 2,
      "explanation": "FlexConnect (formerly H-REAP) allows APs at remote sites to locally switch client data traffic even if the WLC connection is lost.",
      "ciscoCommand": "show ap summary"
    },
    {
      "id": "q107",
      "domain": "2",
      "topic": "2.7",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "How is a WLC typically connected to the network?",
      "options": [
        "Via a trunk port carrying WLAN VLANs",
        "Via an access port on VLAN 1",
        "Via a serial connection",
        "Via USB"
      ],
      "correct": 0,
      "explanation": "A WLC connects to the network via a trunk port to carry traffic from multiple WLANs/VLANs. Often LAG is used for redundancy.",
      "ciscoCommand": "show interfaces trunk"
    },
    {
      "id": "q108",
      "domain": "2",
      "topic": "2.7",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What port type connects a lightweight AP to the switch?",
      "options": [
        "Trunk port",
        "Access port",
        "Port-channel",
        "Console port"
      ],
      "correct": 1,
      "explanation": "Lightweight APs connect to switch access ports. CAPWAP encapsulates all traffic in IP/UDP tunnels to the WLC, so no trunking is needed.",
      "ciscoCommand": "show mac address-table"
    },
    {
      "id": "q109",
      "domain": "2",
      "topic": "2.8",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "Which management protocols can be used to access a WLC?",
      "options": [
        "Only SSH",
        "HTTP, HTTPS, SSH, console, TACACS+/RADIUS",
        "Only the console port",
        "Only SNMP"
      ],
      "correct": 1,
      "explanation": "WLCs support multiple management access methods: HTTP/HTTPS web GUI, SSH, console, and AAA via TACACS+/RADIUS.",
      "ciscoCommand": "show management"
    },
    {
      "id": "q110",
      "domain": "2",
      "topic": "2.9",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What is a WLAN in the context of a WLC?",
      "options": [
        "A physical network cable",
        "A wireless network profile with SSID and security settings",
        "A type of VLAN",
        "A routing protocol"
      ],
      "correct": 1,
      "explanation": "On a WLC, a WLAN is a configuration profile that defines the SSID, security method, QoS policy, and associated VLAN.",
      "ciscoCommand": "show wlan summary"
    },
    {
      "id": "q111",
      "domain": "2",
      "topic": "2.9",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the maximum number of WLANs typically supported on a Cisco WLC?",
      "options": [
        "16",
        "64",
        "512",
        "Unlimited"
      ],
      "correct": 2,
      "explanation": "Most Cisco WLCs support up to 512 WLANs, though only 16 can be active per AP radio at any time.",
      "ciscoCommand": "show wlan summary"
    },
    {
      "id": "q112",
      "domain": "2",
      "topic": "2.9",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "Where do you configure WLAN security on a Cisco WLC?",
      "options": [
        "CLI only",
        "The WLC GUI under WLANs section",
        "On each individual AP",
        "In the DHCP server"
      ],
      "correct": 1,
      "explanation": "WLAN security settings (WPA2/WPA3, PSK/802.1X, etc.) are configured centrally on the WLC through the web GUI or CLI.",
      "ciscoCommand": "show wlan summary"
    },
    {
      "id": "q113",
      "domain": "2",
      "topic": "2.1",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What is a VLAN?",
      "options": [
        "A physical network segment",
        "A logical network segment within a switch",
        "A type of router",
        "A wireless network"
      ],
      "correct": 1,
      "explanation": "A VLAN (Virtual LAN) is a logical broadcast domain created within a switch. Devices in different VLANs cannot communicate without routing.",
      "ciscoCommand": "show vlan brief"
    },
    {
      "id": "q114",
      "domain": "2",
      "topic": "2.1",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What command creates VLAN 10 with the name 'Sales'?",
      "options": [
        "vlan 10 name Sales",
        "vlan 10, then name Sales",
        "create vlan 10 Sales",
        "switchport vlan 10 name Sales"
      ],
      "correct": 1,
      "explanation": "Enter VLAN configuration with 'vlan 10', then 'name Sales' on the next line. This is done from global config mode.",
      "ciscoCommand": "vlan 10"
    },
    {
      "id": "q115",
      "domain": "2",
      "topic": "2.1",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the default VLAN on a Cisco switch?",
      "options": [
        "VLAN 0",
        "VLAN 1",
        "VLAN 10",
        "VLAN 100"
      ],
      "correct": 1,
      "explanation": "VLAN 1 is the default VLAN. All ports are in VLAN 1 by default. It cannot be deleted or renamed.",
      "ciscoCommand": "show vlan brief"
    },
    {
      "id": "q116",
      "domain": "2",
      "topic": "2.1",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "How do you assign an interface to VLAN 10?",
      "options": [
        "vlan 10 interface Gi0/1",
        "switchport access vlan 10",
        "interface vlan 10",
        "ip address vlan 10"
      ],
      "correct": 1,
      "explanation": "Configure the interface, set switchport mode access, then switchport access vlan 10 to assign the port to VLAN 10.",
      "ciscoCommand": "switchport access vlan 10"
    },
    {
      "id": "q117",
      "domain": "2",
      "topic": "2.1",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is inter-VLAN routing?",
      "options": [
        "Routing between different subnets within the same VLAN",
        "Routing traffic between different VLANs",
        "Load balancing between VLANs",
        "Trunking between VLANs"
      ],
      "correct": 1,
      "explanation": "Inter-VLAN routing enables communication between devices in different VLANs. It requires a Layer 3 device (router or L3 switch).",
      "ciscoCommand": "show ip route"
    },
    {
      "id": "q118",
      "domain": "2",
      "topic": "2.1",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is Router-on-a-Stick?",
      "options": [
        "A router with one interface",
        "Inter-VLAN routing using a single router interface with subinterfaces",
        "A wireless router configuration",
        "A backup router setup"
      ],
      "correct": 1,
      "explanation": "Router-on-a-Stick uses a single physical router interface with 802.1Q subinterfaces to route between VLANs via a trunk link to the switch.",
      "ciscoCommand": "show ip interface brief"
    },
    {
      "id": "q119",
      "domain": "2",
      "topic": "2.1",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What command creates a subinterface for VLAN 10 on Gi0/0?",
      "options": [
        "interface GigabitEthernet0/0 vlan 10",
        "interface GigabitEthernet0/0.10",
        "subinterface Gi0/0 vlan 10",
        "vlan 10 interface Gi0/0"
      ],
      "correct": 1,
      "explanation": "interface GigabitEthernet0/0.10 creates subinterface .10. Then configure encapsulation dot1Q 10 and an IP address for VLAN 10 routing.",
      "ciscoCommand": "interface GigabitEthernet0/0.10"
    },
    {
      "id": "q120",
      "domain": "2",
      "topic": "2.1",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What command is required on a router subinterface for 802.1Q trunking?",
      "options": [
        "trunk encapsulation dot1q",
        "encapsulation dot1Q 10",
        "switchport trunk encapsulation",
        "802.1q enable"
      ],
      "correct": 1,
      "explanation": "encapsulation dot1Q <vlan-id> tells the subinterface which VLAN's tagged traffic to accept and send. This is required for router-on-a-stick.",
      "ciscoCommand": "encapsulation dot1Q 10"
    },
    {
      "id": "q121",
      "domain": "2",
      "topic": "2.1",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is an SVI (Switched Virtual Interface)?",
      "options": [
        "A physical switch port",
        "A virtual interface on a Layer 3 switch representing a VLAN",
        "A VLAN trunk port",
        "A wireless interface"
      ],
      "correct": 1,
      "explanation": "An SVI is a virtual Layer 3 interface on a switch associated with a VLAN. It provides the default gateway for that VLAN's hosts.",
      "ciscoCommand": "interface vlan 10"
    },
    {
      "id": "q122",
      "domain": "2",
      "topic": "2.1",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What must be enabled on a Layer 3 switch for inter-VLAN routing via SVIs?",
      "options": [
        "OSPF",
        "ip routing",
        "switchport mode trunk",
        "spanning-tree"
      ],
      "correct": 1,
      "explanation": "The 'ip routing' command must be enabled on L3 switches to enable routing between SVIs. Without it, the switch only operates at Layer 2.",
      "ciscoCommand": "ip routing"
    },
    {
      "id": "q123",
      "domain": "1",
      "topic": "1.8",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What is the size of an IPv6 address?",
      "options": [
        "32 bits",
        "64 bits",
        "128 bits",
        "256 bits"
      ],
      "correct": 2,
      "explanation": "IPv6 addresses are 128 bits long (compared to 32 bits for IPv4), written as 8 groups of 4 hexadecimal digits.",
      "ciscoCommand": "show ipv6 interface brief"
    },
    {
      "id": "q124",
      "domain": "1",
      "topic": "1.9",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "Which IPv6 address type is equivalent to a public IPv4 address?",
      "options": [
        "Link-local",
        "Unique local",
        "Global unicast",
        "Multicast"
      ],
      "correct": 2,
      "explanation": "Global Unicast Addresses (GUA, 2000::/3) are routable on the internet, equivalent to public IPv4 addresses.",
      "ciscoCommand": "show ipv6 interface brief"
    },
    {
      "id": "q125",
      "domain": "1",
      "topic": "1.9",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What prefix identifies an IPv6 link-local address?",
      "options": [
        "2000::/3",
        "FC00::/7",
        "FE80::/10",
        "FF00::/8"
      ],
      "correct": 2,
      "explanation": "Link-local addresses use the FE80::/10 prefix. They are automatically generated and only valid on the local link (not routable).",
      "ciscoCommand": "show ipv6 interface brief"
    },
    {
      "id": "q126",
      "domain": "1",
      "topic": "1.9",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is SLAAC?",
      "options": [
        "A routing protocol",
        "A method for hosts to auto-configure IPv6 addresses using Router Advertisements",
        "A security mechanism",
        "A VLAN protocol"
      ],
      "correct": 1,
      "explanation": "SLAAC (Stateless Address Autoconfiguration) allows hosts to generate their own IPv6 address using the prefix from Router Advertisements and an interface ID.",
      "ciscoCommand": "show ipv6 interface"
    },
    {
      "id": "q127",
      "domain": "1",
      "topic": "1.9",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What does NDP replace in IPv6 that ARP provides in IPv4?",
      "options": [
        "DNS resolution",
        "MAC address resolution",
        "Routing",
        "VLAN tagging"
      ],
      "correct": 1,
      "explanation": "NDP (Neighbor Discovery Protocol) replaces ARP in IPv6. It uses ICMPv6 Neighbor Solicitation and Neighbor Advertisement messages.",
      "ciscoCommand": "show ipv6 neighbors"
    },
    {
      "id": "q128",
      "domain": "1",
      "topic": "1.9",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "How does EUI-64 generate an interface ID from a MAC address?",
      "options": [
        "Appends FF:FE to the MAC",
        "Splits MAC in half, inserts FF:FE, flips 7th bit",
        "Reverses the MAC address",
        "Hashes the MAC with SHA-256"
      ],
      "correct": 1,
      "explanation": "EUI-64: split MAC in half, insert FFFE in the middle, then flip the 7th bit (Universal/Local bit) of the first byte.",
      "ciscoCommand": "show ipv6 interface"
    },
    {
      "id": "q129",
      "domain": "1",
      "topic": "1.8",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What command enables IPv6 routing on a Cisco router?",
      "options": [
        "ip routing",
        "ipv6 enable",
        "ipv6 unicast-routing",
        "router ipv6"
      ],
      "correct": 2,
      "explanation": "ipv6 unicast-routing enables IPv6 routing globally. Without it, the router processes IPv6 on interfaces but doesn't route between them.",
      "ciscoCommand": "ipv6 unicast-routing"
    },
    {
      "id": "q130",
      "domain": "1",
      "topic": "1.8",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What command assigns an IPv6 address to an interface?",
      "options": [
        "ip address 2001:db8::1/64",
        "ipv6 address 2001:db8::1/64",
        "ipv6 2001:db8::1/64",
        "interface ipv6 2001:db8::1/64"
      ],
      "correct": 1,
      "explanation": "ipv6 address is the correct interface command. Note IPv6 uses prefix length (/64) not a separate mask.",
      "ciscoCommand": "ipv6 address 2001:db8::1/64"
    },
    {
      "id": "q131",
      "domain": "1",
      "topic": "1.9",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the IPv6 multicast address for all nodes on the local link?",
      "options": [
        "FF02::1",
        "FF02::2",
        "FF02::5",
        "FF02::A"
      ],
      "correct": 0,
      "explanation": "FF02::1 is the all-nodes multicast address. FF02::2 is all-routers. FF02::5 is all-OSPF routers.",
      "ciscoCommand": "show ipv6 interface"
    },
    {
      "id": "q132",
      "domain": "1",
      "topic": "1.9",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What type of IPv6 address is FD00::1?",
      "options": [
        "Global unicast",
        "Link-local",
        "Unique local",
        "Multicast"
      ],
      "correct": 2,
      "explanation": "FC00::/7 (practically FD00::/8) is the Unique Local Address range. These are similar to RFC 1918 private addresses in IPv4.",
      "ciscoCommand": "show ipv6 interface"
    },
    {
      "id": "q133",
      "domain": "1",
      "topic": "1.8",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "How many bits are in the interface ID portion of a /64 IPv6 address?",
      "options": [
        "32",
        "48",
        "64",
        "128"
      ],
      "correct": 2,
      "explanation": "A /64 prefix means 64 bits for the network and 64 bits for the interface ID (host portion).",
      "ciscoCommand": "show ipv6 interface"
    },
    {
      "id": "q134",
      "domain": "1",
      "topic": "1.9",
      "difficulty": 3,
      "type": "multiple-choice",
      "question": "Which IPv6 address type is automatically created on every IPv6-enabled interface?",
      "options": [
        "Global unicast",
        "Unique local",
        "Link-local",
        "Anycast"
      ],
      "correct": 2,
      "explanation": "A link-local address (FE80::/10) is automatically generated whenever IPv6 is enabled on an interface. It's used for local communication and routing protocols.",
      "ciscoCommand": "show ipv6 interface brief"
    },
    {
      "id": "q135",
      "domain": "1",
      "topic": "1.8",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What does the :: notation represent in IPv6?",
      "options": [
        "End of address",
        "One or more groups of consecutive zeros",
        "A wildcard",
        "A broadcast address"
      ],
      "correct": 1,
      "explanation": "The double colon :: represents one or more consecutive groups of all zeros. It can only appear once in an address to avoid ambiguity.",
      "ciscoCommand": "show ipv6 interface"
    },
    {
      "id": "q136",
      "domain": "1",
      "topic": "1.9",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the solicited-node multicast address used for?",
      "options": [
        "Routing updates",
        "Replacing ARP for address resolution",
        "Broadcasting to all nodes",
        "DNS queries"
      ],
      "correct": 1,
      "explanation": "Solicited-node multicast (FF02::1:FFxx:xxxx) is used by NDP for efficient address resolution, targeting only the specific host instead of broadcasting.",
      "ciscoCommand": "show ipv6 neighbors"
    },
    {
      "id": "q137",
      "domain": "1",
      "topic": "1.5",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "Which transport protocol provides reliable, ordered delivery?",
      "options": [
        "UDP",
        "TCP",
        "ICMP",
        "IP"
      ],
      "correct": 1,
      "explanation": "TCP provides reliable delivery through sequence numbers, acknowledgments, and retransmission. UDP is connectionless and unreliable.",
      "ciscoCommand": "show ip protocols"
    },
    {
      "id": "q138",
      "domain": "1",
      "topic": "1.5",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What is the TCP three-way handshake sequence?",
      "options": [
        "SYN, ACK, FIN",
        "SYN, SYN-ACK, ACK",
        "ACK, SYN, FIN",
        "SYN, SYN, ACK"
      ],
      "correct": 1,
      "explanation": "TCP establishes connections with SYN \u2192 SYN-ACK \u2192 ACK. This ensures both sides are ready to communicate.",
      "ciscoCommand": null
    },
    {
      "id": "q139",
      "domain": "1",
      "topic": "1.5",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "Which well-known port does HTTPS use?",
      "options": [
        "80",
        "8080",
        "443",
        "8443"
      ],
      "correct": 2,
      "explanation": "HTTPS uses TCP port 443. HTTP uses port 80. These are well-known ports assigned by IANA.",
      "ciscoCommand": null
    },
    {
      "id": "q140",
      "domain": "1",
      "topic": "1.5",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "Which protocol would you use for real-time voice/video traffic?",
      "options": [
        "TCP",
        "UDP",
        "SCTP",
        "DCCP"
      ],
      "correct": 1,
      "explanation": "UDP is preferred for real-time traffic because it has lower latency (no handshake, no retransmission). Some packet loss is acceptable for voice/video.",
      "ciscoCommand": null
    },
    {
      "id": "q141",
      "domain": "1",
      "topic": "1.5",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What TCP port does SSH use?",
      "options": [
        "21",
        "22",
        "23",
        "25"
      ],
      "correct": 1,
      "explanation": "SSH uses TCP port 22. FTP uses 21, Telnet uses 23, and SMTP uses 25.",
      "ciscoCommand": null
    },
    {
      "id": "q142",
      "domain": "1",
      "topic": "1.6",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "How many usable host addresses are in a /26 subnet?",
      "options": [
        "30",
        "62",
        "64",
        "126"
      ],
      "correct": 1,
      "explanation": "A /26 has 6 host bits: 2^6 = 64 total addresses - 2 (network + broadcast) = 62 usable hosts.",
      "ciscoCommand": null
    },
    {
      "id": "q143",
      "domain": "1",
      "topic": "1.6",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the subnet mask for a /20 network?",
      "options": [
        "255.255.240.0",
        "255.255.248.0",
        "255.255.252.0",
        "255.255.224.0"
      ],
      "correct": 0,
      "explanation": "A /20 means 20 network bits: 255.255.11110000.0 = 255.255.240.0",
      "ciscoCommand": null
    },
    {
      "id": "q144",
      "domain": "1",
      "topic": "1.6",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the network address for host 172.16.45.130/22?",
      "options": [
        "172.16.44.0",
        "172.16.45.0",
        "172.16.45.128",
        "172.16.46.0"
      ],
      "correct": 0,
      "explanation": "/22 has a block size of 4 in the third octet. 45/4 = 11 remainder 1, so network starts at 44. Network: 172.16.44.0",
      "ciscoCommand": null
    },
    {
      "id": "q145",
      "domain": "1",
      "topic": "1.6",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the broadcast address for 192.168.1.0/25?",
      "options": [
        "192.168.1.63",
        "192.168.1.127",
        "192.168.1.255",
        "192.168.1.128"
      ],
      "correct": 1,
      "explanation": "/25 splits the last octet in half. First subnet: .0-.127. Network=.0, Broadcast=.127, Usable=.1-.126",
      "ciscoCommand": null
    },
    {
      "id": "q146",
      "domain": "1",
      "topic": "1.6",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What is the wildcard mask for a /24 subnet?",
      "options": [
        "0.0.0.0",
        "0.0.0.255",
        "0.0.255.255",
        "255.255.255.0"
      ],
      "correct": 1,
      "explanation": "Wildcard = 255.255.255.255 - Subnet Mask. For /24 (255.255.255.0): 255.255.255.255 - 255.255.255.0 = 0.0.0.255",
      "ciscoCommand": null
    },
    {
      "id": "q147",
      "domain": "1",
      "topic": "1.7",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "Which of these is a private IPv4 address?",
      "options": [
        "11.0.0.1",
        "172.32.0.1",
        "192.168.1.1",
        "223.0.0.1"
      ],
      "correct": 2,
      "explanation": "192.168.0.0/16 is a private range (RFC 1918). 10.0.0.0/8 and 172.16.0.0/12 are the other private ranges. 172.32.x is public.",
      "ciscoCommand": null
    },
    {
      "id": "q148",
      "domain": "1",
      "topic": "1.6",
      "difficulty": 3,
      "type": "multiple-choice",
      "question": "You need at least 500 host addresses per subnet. What is the minimum prefix length?",
      "options": [
        "\\/22",
        "/23",
        "/24",
        "/21"
      ],
      "correct": 0,
      "explanation": "/23 gives 510 hosts (2^9-2), which is just barely enough but /22 gives 1022 hosts providing more room. Actually /23=510 which is >=500, so /23 works. But wait: 2^9=512-2=510. So /23 is minimum.",
      "ciscoCommand": 1
    },
    {
      "id": "q149",
      "domain": "1",
      "topic": "1.6",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the purpose of a subnet mask?",
      "options": [
        "To identify the broadcast address",
        "To separate the network and host portions of an IP address",
        "To encrypt traffic",
        "To define the default gateway"
      ],
      "correct": 1,
      "explanation": "A subnet mask identifies which bits of the IP address represent the network portion and which represent the host portion.",
      "ciscoCommand": null
    },
    {
      "id": "q150",
      "domain": "1",
      "topic": "1.3",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What type of fiber optic cable supports longer distances?",
      "options": [
        "Multimode",
        "Single-mode",
        "Cat 5e",
        "Coaxial"
      ],
      "correct": 1,
      "explanation": "Single-mode fiber uses a smaller core (8-10 micron) with laser light, supporting distances up to 100km. Multimode uses LED and supports shorter distances.",
      "ciscoCommand": null
    },
    {
      "id": "q151",
      "domain": "1",
      "topic": "1.3",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the maximum distance for Cat 5e/6 copper Ethernet?",
      "options": [
        "55 meters",
        "100 meters",
        "185 meters",
        "500 meters"
      ],
      "correct": 1,
      "explanation": "Cat 5e and Cat 6 UTP cables have a maximum distance of 100 meters (328 feet) for Ethernet at any speed up to 10 Gbps.",
      "ciscoCommand": null
    },
    {
      "id": "q152",
      "domain": "1",
      "topic": "1.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "A link shows CRC errors incrementing. What is the most likely cause?",
      "options": [
        "Duplex mismatch",
        "Incorrect VLAN",
        "Wrong IP address",
        "Bad cable or connector"
      ],
      "correct": 3,
      "explanation": "CRC errors typically indicate physical layer problems: damaged cable, loose connector, or electromagnetic interference.",
      "ciscoCommand": null
    },
    {
      "id": "q153",
      "domain": "1",
      "topic": "1.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What symptom indicates a duplex mismatch?",
      "options": [
        "Port shows down/down",
        "High collision count and late collisions",
        "CRC errors only",
        "Spanning tree blocking"
      ],
      "correct": 1,
      "explanation": "Duplex mismatch causes late collisions, FCS errors, and runts on the half-duplex side, and a poor-performing but 'up' link on the full-duplex side.",
      "ciscoCommand": null
    },
    {
      "id": "q154",
      "domain": "1",
      "topic": "1.1",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What device operates at Layer 3 and makes forwarding decisions based on IP addresses?",
      "options": [
        "Hub",
        "Switch",
        "Router",
        "Access point"
      ],
      "correct": 2,
      "explanation": "Routers operate at Layer 3 (Network layer) and use IP addresses in their routing table to forward packets between networks.",
      "ciscoCommand": null
    },
    {
      "id": "q155",
      "domain": "1",
      "topic": "1.1",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the primary difference between a Layer 2 and Layer 3 switch?",
      "options": [
        "Layer 3 switches are faster",
        "Layer 3 switches can route between VLANs",
        "Layer 2 switches support more ports",
        "Layer 3 switches support wireless"
      ],
      "correct": 1,
      "explanation": "Layer 3 switches can perform routing (inter-VLAN routing via SVIs) in addition to switching. Layer 2 switches only forward based on MAC addresses.",
      "ciscoCommand": null
    },
    {
      "id": "q156",
      "domain": "1",
      "topic": "1.2",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the advantage of a spine-leaf architecture?",
      "options": [
        "Lower cost",
        "Predictable low-latency with equal-cost paths",
        "Simpler configuration",
        "Fewer switches needed"
      ],
      "correct": 1,
      "explanation": "Spine-leaf provides consistent latency because every leaf switch is exactly one hop from every spine switch, creating equal-cost paths.",
      "ciscoCommand": null
    },
    {
      "id": "q157",
      "domain": "1",
      "topic": "1.11",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What are the three non-overlapping channels for 2.4 GHz Wi-Fi?",
      "options": [
        "1, 5, 9",
        "1, 6, 11",
        "1, 7, 13",
        "2, 7, 12"
      ],
      "correct": 1,
      "explanation": "Channels 1, 6, and 11 are the three non-overlapping channels in the 2.4 GHz band. Using overlapping channels causes co-channel interference.",
      "ciscoCommand": null
    },
    {
      "id": "q158",
      "domain": "1",
      "topic": "1.11",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What wireless encryption standard is considered most secure?",
      "options": [
        "WEP",
        "WPA",
        "WPA2",
        "WPA3"
      ],
      "correct": 3,
      "explanation": "WPA3 is the latest and most secure wireless encryption standard, using SAE (Simultaneous Authentication of Equals) instead of the 4-way handshake.",
      "ciscoCommand": null
    },
    {
      "id": "q159",
      "domain": "1",
      "topic": "1.12",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is a hypervisor?",
      "options": [
        "A high-speed switch",
        "Software that creates and manages virtual machines",
        "A type of firewall",
        "A network monitoring tool"
      ],
      "correct": 1,
      "explanation": "A hypervisor (Type 1 or Type 2) is software that creates and manages virtual machines by abstracting hardware resources.",
      "ciscoCommand": null
    },
    {
      "id": "q160",
      "domain": "1",
      "topic": "1.13",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What does a switch do when it receives a frame with an unknown destination MAC?",
      "options": [
        "Drops the frame",
        "Sends it to the default gateway",
        "Floods it out all ports except the source port",
        "Sends an ARP request"
      ],
      "correct": 2,
      "explanation": "When the destination MAC is not in the MAC address table, the switch floods the frame out all ports except the one it was received on.",
      "ciscoCommand": null
    },
    {
      "id": "q161",
      "domain": "1",
      "topic": "1.13",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "How does a switch learn MAC addresses?",
      "options": [
        "By examining the source MAC of incoming frames",
        "By querying a DHCP server",
        "From CDP/LLDP messages",
        "From ARP broadcast responses"
      ],
      "correct": 0,
      "explanation": "Switches learn MAC addresses by recording the source MAC address and ingress port of each received frame into the MAC address table.",
      "ciscoCommand": "show mac address-table"
    },
    {
      "id": "q162",
      "domain": "4",
      "topic": "4.1",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What does NAT stand for?",
      "options": [
        "Network Access Translation",
        "Network Address Translation",
        "Node Address Transfer",
        "Network Authentication Token"
      ],
      "correct": 1,
      "explanation": "NAT (Network Address Translation) translates private IP addresses to public IP addresses for internet access.",
      "ciscoCommand": null
    },
    {
      "id": "q163",
      "domain": "4",
      "topic": "4.1",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the difference between static NAT and dynamic NAT?",
      "options": [
        "Static uses pools; dynamic uses one-to-one",
        "Static maps one private to one public permanently; dynamic uses a pool",
        "Static is faster",
        "Dynamic requires less configuration"
      ],
      "correct": 1,
      "explanation": "Static NAT creates a permanent one-to-one mapping. Dynamic NAT uses a pool of public addresses assigned on a first-come basis.",
      "ciscoCommand": "show ip nat translations"
    },
    {
      "id": "q164",
      "domain": "4",
      "topic": "4.1",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is PAT (Port Address Translation)?",
      "options": [
        "A routing protocol",
        "NAT overload \u2014 multiple private IPs share one public IP using port numbers",
        "A port security feature",
        "A trunking protocol"
      ],
      "correct": 1,
      "explanation": "PAT (also called NAT overload) allows many internal hosts to share a single public IP by using unique source port numbers to track sessions.",
      "ciscoCommand": "show ip nat translations"
    },
    {
      "id": "q165",
      "domain": "4",
      "topic": "4.1",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What command defines the inside NAT interface?",
      "options": [
        "ip nat inside",
        "nat inside",
        "interface nat inside",
        "ip nat source inside"
      ],
      "correct": 0,
      "explanation": "'ip nat inside' is configured on the interface facing the private network. 'ip nat outside' goes on the internet-facing interface.",
      "ciscoCommand": "ip nat inside"
    },
    {
      "id": "q166",
      "domain": "4",
      "topic": "4.1",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What command configures PAT using the outside interface address?",
      "options": [
        "ip nat inside source list 1 pool PAT overload",
        "ip nat inside source list 1 interface Gi0/0 overload",
        "ip nat pool PAT overload",
        "nat overload enable"
      ],
      "correct": 1,
      "explanation": "'ip nat inside source list <acl> interface <outside-if> overload' configures PAT using the outside interface's IP address.",
      "ciscoCommand": "ip nat inside source list 1 interface Gi0/0 overload"
    },
    {
      "id": "q167",
      "domain": "4",
      "topic": "4.1",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What command verifies active NAT translations?",
      "options": [
        "show ip nat statistics",
        "show ip nat translations",
        "show nat table",
        "show ip nat pool"
      ],
      "correct": 1,
      "explanation": "show ip nat translations displays all current NAT translation entries, showing inside local/global and outside local/global addresses.",
      "ciscoCommand": "show ip nat translations"
    },
    {
      "id": "q168",
      "domain": "4",
      "topic": "4.2",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What command configures a router as an NTP client?",
      "options": [
        "ntp enable",
        "ntp server 10.0.0.1",
        "ntp client 10.0.0.1",
        "clock set ntp 10.0.0.1"
      ],
      "correct": 1,
      "explanation": "'ntp server <ip>' configures the router to synchronize its clock with the specified NTP server.",
      "ciscoCommand": "ntp server 10.0.0.1"
    },
    {
      "id": "q169",
      "domain": "4",
      "topic": "4.2",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the NTP stratum value for the most accurate time source?",
      "options": [
        "0",
        "1",
        "10",
        "16"
      ],
      "correct": 1,
      "explanation": "Stratum 0 is the reference clock (atomic clock/GPS). Stratum 1 is directly connected to stratum 0 \u2014 these are the most accurate NTP servers.",
      "ciscoCommand": "show ntp status"
    },
    {
      "id": "q170",
      "domain": "4",
      "topic": "4.3",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What port does DNS use?",
      "options": [
        "TCP/UDP 23",
        "TCP/UDP 53",
        "TCP/UDP 80",
        "TCP/UDP 443"
      ],
      "correct": 1,
      "explanation": "DNS uses UDP port 53 for queries and TCP port 53 for zone transfers or responses larger than 512 bytes.",
      "ciscoCommand": null
    },
    {
      "id": "q171",
      "domain": "4",
      "topic": "4.3",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the role of a DHCP server?",
      "options": [
        "Route packets between networks",
        "Automatically assign IP configuration to clients",
        "Resolve hostnames to IP addresses",
        "Provide time synchronization"
      ],
      "correct": 1,
      "explanation": "DHCP automatically assigns IP address, subnet mask, default gateway, DNS servers, and other parameters to clients.",
      "ciscoCommand": null
    },
    {
      "id": "q172",
      "domain": "4",
      "topic": "4.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What does SNMP stand for and what is it used for?",
      "options": [
        "Simple Network Management Protocol \u2014 monitor and manage network devices",
        "Secure Network Message Protocol",
        "System Network Monitoring Platform",
        "Simple Network Messaging Protocol"
      ],
      "correct": 0,
      "explanation": "SNMP allows network admins to monitor device health, performance metrics, and configuration from a central management station.",
      "ciscoCommand": "show snmp"
    },
    {
      "id": "q173",
      "domain": "4",
      "topic": "4.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is an SNMP trap?",
      "options": [
        "A security mechanism",
        "An unsolicited alert sent from an agent to the manager",
        "A request from the manager to the agent",
        "A firewall rule"
      ],
      "correct": 1,
      "explanation": "SNMP traps are asynchronous notifications sent by SNMP agents to the NMS when a significant event occurs (link down, high CPU, etc.).",
      "ciscoCommand": null
    },
    {
      "id": "q174",
      "domain": "4",
      "topic": "4.5",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What are syslog severity levels 0 and 7?",
      "options": [
        "0=Debug, 7=Emergency",
        "0=Emergency, 7=Debug",
        "0=Critical, 7=Info",
        "0=Alert, 7=Notice"
      ],
      "correct": 1,
      "explanation": "Syslog levels: 0=Emergency, 1=Alert, 2=Critical, 3=Error, 4=Warning, 5=Notice, 6=Informational, 7=Debug. Lower number = more severe.",
      "ciscoCommand": "show logging"
    },
    {
      "id": "q175",
      "domain": "4",
      "topic": "4.5",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What command sends syslog messages to a server at 10.0.0.100?",
      "options": [
        "logging 10.0.0.100",
        "syslog server 10.0.0.100",
        "log destination 10.0.0.100",
        "send-log 10.0.0.100"
      ],
      "correct": 0,
      "explanation": "'logging <ip>' configures the device to send syslog messages to an external syslog server for centralized log collection.",
      "ciscoCommand": "logging 10.0.0.100"
    },
    {
      "id": "q176",
      "domain": "4",
      "topic": "4.6",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is a DHCP relay agent?",
      "options": [
        "A DHCP server backup",
        "A router that forwards DHCP broadcasts to a remote DHCP server",
        "A DHCP client",
        "A DNS-to-DHCP translator"
      ],
      "correct": 1,
      "explanation": "A DHCP relay agent forwards DHCP broadcast requests from clients to a DHCP server on a different subnet using unicast.",
      "ciscoCommand": "ip helper-address 10.0.0.1"
    },
    {
      "id": "q177",
      "domain": "4",
      "topic": "4.6",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What command configures a DHCP relay on a router interface?",
      "options": [
        "dhcp relay 10.0.0.1",
        "ip helper-address 10.0.0.1",
        "dhcp-server 10.0.0.1",
        "ip dhcp relay 10.0.0.1"
      ],
      "correct": 1,
      "explanation": "ip helper-address forwards broadcast UDP traffic (including DHCP) to the specified server IP address.",
      "ciscoCommand": "ip helper-address 10.0.0.1"
    },
    {
      "id": "q178",
      "domain": "4",
      "topic": "4.7",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What are the three main QoS models?",
      "options": [
        "Low, Medium, High",
        "Best-effort, IntServ, DiffServ",
        "Bronze, Silver, Gold",
        "Priority, Standard, Economy"
      ],
      "correct": 1,
      "explanation": "Best-effort (no QoS), IntServ (per-flow reservation with RSVP), and DiffServ (per-hop classification using DSCP) are the three QoS models.",
      "ciscoCommand": null
    },
    {
      "id": "q179",
      "domain": "4",
      "topic": "4.7",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is DSCP used for in QoS?",
      "options": [
        "Encrypting traffic",
        "Marking packets with a priority value in the IP header",
        "Routing decisions",
        "VLAN tagging"
      ],
      "correct": 1,
      "explanation": "DSCP (Differentiated Services Code Point) uses 6 bits in the IP header's ToS field to mark packets with QoS priority values (0-63).",
      "ciscoCommand": null
    },
    {
      "id": "q180",
      "domain": "4",
      "topic": "4.7",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What DSCP value is used for Expedited Forwarding (voice traffic)?",
      "options": [
        "0",
        "26",
        "34",
        "46"
      ],
      "correct": 3,
      "explanation": "EF (Expedited Forwarding) uses DSCP 46. This is typically used for voice traffic requiring low latency, low jitter, and low loss.",
      "ciscoCommand": null
    },
    {
      "id": "q181",
      "domain": "4",
      "topic": "4.7",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the difference between policing and shaping in QoS?",
      "options": [
        "Policing buffers excess traffic; shaping drops it",
        "Policing drops excess traffic; shaping buffers and delays it",
        "They are the same thing",
        "Policing is for inbound; shaping is for outbound only"
      ],
      "correct": 1,
      "explanation": "Policing drops or re-marks traffic exceeding the rate limit immediately. Shaping buffers excess traffic and sends it when bandwidth is available.",
      "ciscoCommand": null
    },
    {
      "id": "q182",
      "domain": "4",
      "topic": "4.8",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What command configures SSH version 2 on a Cisco device?",
      "options": [
        "ssh version 2",
        "ip ssh version 2",
        "crypto ssh 2",
        "enable ssh v2"
      ],
      "correct": 1,
      "explanation": "ip ssh version 2 enables SSH version 2, which is more secure than version 1. You also need a hostname, domain name, and RSA keys.",
      "ciscoCommand": "ip ssh version 2"
    },
    {
      "id": "q183",
      "domain": "4",
      "topic": "4.8",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What are the prerequisites for configuring SSH on a Cisco router?",
      "options": [
        "Only a password",
        "Hostname, domain name, RSA key pair, and VTY line configuration",
        "Only an IP address",
        "A RADIUS server"
      ],
      "correct": 1,
      "explanation": "SSH requires: 1) hostname, 2) domain name, 3) RSA key pair (crypto key generate rsa), 4) VTY lines configured for SSH.",
      "ciscoCommand": "crypto key generate rsa"
    },
    {
      "id": "q184",
      "domain": "4",
      "topic": "4.9",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What is the main difference between TFTP and FTP?",
      "options": [
        "TFTP is faster",
        "TFTP is simpler with no authentication; FTP supports login and directory browsing",
        "FTP uses UDP; TFTP uses TCP",
        "FTP is older"
      ],
      "correct": 1,
      "explanation": "TFTP uses UDP port 69 and provides no authentication. FTP uses TCP ports 20/21 with username/password authentication.",
      "ciscoCommand": null
    },
    {
      "id": "q185",
      "domain": "5",
      "topic": "5.3",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What are the three modes of Cisco IOS CLI?",
      "options": [
        "User EXEC, Privileged EXEC, Global Configuration",
        "Login, Admin, Root",
        "Read, Write, Execute",
        "Basic, Advanced, Expert"
      ],
      "correct": 0,
      "explanation": "User EXEC (>), Privileged EXEC (#), and Global Configuration (config)# are the three primary IOS modes. You move between them with enable and configure terminal.",
      "ciscoCommand": "show privilege"
    },
    {
      "id": "q186",
      "domain": "5",
      "topic": "5.3",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What command enters privileged EXEC mode?",
      "options": [
        "login",
        "su",
        "enable",
        "privilege"
      ],
      "correct": 2,
      "explanation": "The 'enable' command moves from User EXEC mode (>) to Privileged EXEC mode (#), which provides full access to show and config commands.",
      "ciscoCommand": "enable"
    },
    {
      "id": "q187",
      "domain": "5",
      "topic": "5.3",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What command saves the running configuration to NVRAM?",
      "options": [
        "write memory",
        "copy running-config startup-config",
        "save config",
        "Both A and B"
      ],
      "correct": 3,
      "explanation": "Both 'write memory' (shorthand) and 'copy running-config startup-config' save the active configuration to NVRAM for persistence across reboots.",
      "ciscoCommand": "copy running-config startup-config"
    },
    {
      "id": "q188",
      "domain": "5",
      "topic": "5.3",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What does the 'enable secret' command do vs 'enable password'?",
      "options": [
        "They are identical",
        "enable secret encrypts the password with MD5; enable password stores it in cleartext",
        "enable password is more secure",
        "enable secret is for SSH only"
      ],
      "correct": 1,
      "explanation": "enable secret stores the password as an MD5 hash and always takes precedence over enable password, which stores in cleartext or weak Type 7.",
      "ciscoCommand": "enable secret <password>"
    },
    {
      "id": "q189",
      "domain": "5",
      "topic": "5.3",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What command encrypts all plaintext passwords in the running config?",
      "options": [
        "encrypt passwords",
        "service password-encryption",
        "password encrypt all",
        "security passwords"
      ],
      "correct": 1,
      "explanation": "service password-encryption applies weak Type 7 encryption to all plaintext passwords in the config. It's not strong but better than plaintext.",
      "ciscoCommand": "service password-encryption"
    },
    {
      "id": "q190",
      "domain": "5",
      "topic": "5.7",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is DHCP snooping?",
      "options": [
        "A DHCP optimization feature",
        "A Layer 2 security feature that filters untrusted DHCP messages",
        "A DHCP server redundancy protocol",
        "A DHCP relay enhancement"
      ],
      "correct": 1,
      "explanation": "DHCP snooping validates DHCP messages from untrusted sources, building a binding table of MAC-to-IP mappings. It prevents rogue DHCP servers.",
      "ciscoCommand": "ip dhcp snooping"
    },
    {
      "id": "q191",
      "domain": "5",
      "topic": "5.7",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is Dynamic ARP Inspection (DAI)?",
      "options": [
        "A routing protocol security feature",
        "A feature that validates ARP packets against the DHCP snooping binding table",
        "An ARP cache optimization",
        "A firewall feature"
      ],
      "correct": 1,
      "explanation": "DAI intercepts ARP packets on untrusted ports and validates them against the DHCP snooping binding table to prevent ARP spoofing attacks.",
      "ciscoCommand": "ip arp inspection vlan 10"
    },
    {
      "id": "q192",
      "domain": "5",
      "topic": "5.7",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What happens when a port security violation occurs in shutdown mode?",
      "options": [
        "The port sends a syslog message only",
        "The port drops the violating frame",
        "The port goes to err-disabled state",
        "The switch reboots"
      ],
      "correct": 2,
      "explanation": "In shutdown mode (default), the port is placed in err-disabled state when a violation occurs. This is the most secure but also most disruptive mode.",
      "ciscoCommand": "switchport port-security violation shutdown"
    },
    {
      "id": "q193",
      "domain": "5",
      "topic": "5.7",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What are the three port security violation modes?",
      "options": [
        "Block, Alert, Disable",
        "Protect, Restrict, Shutdown",
        "Drop, Log, Disable",
        "Warn, Block, Shutdown"
      ],
      "correct": 1,
      "explanation": "Protect silently drops violating traffic. Restrict drops and sends syslog. Shutdown puts the port in err-disabled state (default).",
      "ciscoCommand": "switchport port-security violation restrict"
    },
    {
      "id": "q194",
      "domain": "5",
      "topic": "5.7",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is sticky MAC learning in port security?",
      "options": [
        "MAC addresses are permanently configured",
        "Dynamically learned MACs are added to the running config",
        "MACs cannot be changed after learning",
        "A type of static MAC assignment"
      ],
      "correct": 1,
      "explanation": "Sticky learning dynamically learns MAC addresses and adds them to the running-config as static entries, combining dynamic learning with persistence.",
      "ciscoCommand": "switchport port-security mac-address sticky"
    },
    {
      "id": "q195",
      "domain": "5",
      "topic": "5.7",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What command enables DHCP snooping globally?",
      "options": [
        "dhcp snooping enable",
        "ip dhcp snooping",
        "dhcp-guard enable",
        "ip dhcp security"
      ],
      "correct": 1,
      "explanation": "ip dhcp snooping enables DHCP snooping globally. You must also enable it per VLAN with ip dhcp snooping vlan <id>.",
      "ciscoCommand": "ip dhcp snooping"
    },
    {
      "id": "q196",
      "domain": "5",
      "topic": "5.6",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the difference between standard and extended ACLs?",
      "options": [
        "Standard filters by destination; extended by source",
        "Standard filters by source only; extended filters by source, destination, protocol, and port",
        "Standard is numbered; extended is named",
        "Standard is faster"
      ],
      "correct": 1,
      "explanation": "Standard ACLs (1-99) match only source IP. Extended ACLs (100-199) match source IP, destination IP, protocol, and port numbers.",
      "ciscoCommand": "show access-lists"
    },
    {
      "id": "q197",
      "domain": "5",
      "topic": "5.6",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "Where should you place a standard ACL?",
      "options": [
        "Close to the source",
        "Close to the destination",
        "On the core router",
        "On the firewall only"
      ],
      "correct": 1,
      "explanation": "Standard ACLs should be placed close to the destination because they only filter on source IP. Placing them at the source would block all traffic from that source.",
      "ciscoCommand": "show access-lists"
    },
    {
      "id": "q198",
      "domain": "5",
      "topic": "5.6",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "Where should you place an extended ACL?",
      "options": [
        "Close to the source",
        "Close to the destination",
        "On the default gateway",
        "On the DNS server"
      ],
      "correct": 0,
      "explanation": "Extended ACLs should be placed close to the source because they can match specific traffic. This prevents unnecessary traffic from traversing the network.",
      "ciscoCommand": "show access-lists"
    },
    {
      "id": "q199",
      "domain": "5",
      "topic": "5.6",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What does the 'host' keyword mean in an ACL?",
      "options": [
        "Match any host",
        "Match a specific single IP (wildcard 0.0.0.0)",
        "Match a subnet",
        "Match the default gateway"
      ],
      "correct": 1,
      "explanation": "'host 10.0.0.1' is shorthand for '10.0.0.1 0.0.0.0' \u2014 it matches exactly one IP address.",
      "ciscoCommand": "show access-lists"
    },
    {
      "id": "q200",
      "domain": "5",
      "topic": "5.6",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is at the end of every ACL?",
      "options": [
        "Implicit permit all",
        "Implicit deny all",
        "A log entry",
        "Nothing"
      ],
      "correct": 1,
      "explanation": "Every ACL has an invisible implicit deny all at the end. Any traffic not explicitly permitted by an ACE will be denied.",
      "ciscoCommand": "show access-lists"
    },
    {
      "id": "q201",
      "domain": "5",
      "topic": "5.6",
      "difficulty": 3,
      "type": "multiple-choice",
      "question": "What command applies ACL 100 inbound on interface Gi0/0?",
      "options": [
        "access-group 100 in",
        "ip access-group 100 in",
        "ip access-list 100 in",
        "apply acl 100 inbound"
      ],
      "correct": 1,
      "explanation": "ip access-group <number/name> <in/out> applies an ACL to an interface in the specified direction (inbound or outbound).",
      "ciscoCommand": "ip access-group 100 in"
    },
    {
      "id": "q202",
      "domain": "5",
      "topic": "5.5",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the difference between a site-to-site VPN and a remote access VPN?",
      "options": [
        "Site-to-site uses SSL; remote access uses IPsec",
        "Site-to-site connects networks; remote access connects individual users",
        "Site-to-site is faster",
        "Remote access is more secure"
      ],
      "correct": 1,
      "explanation": "Site-to-site VPNs create encrypted tunnels between networks (office-to-office). Remote access VPNs connect individual users to a corporate network.",
      "ciscoCommand": null
    },
    {
      "id": "q203",
      "domain": "5",
      "topic": "5.8",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What do the three As in AAA stand for?",
      "options": [
        "Access, Audit, Authorization",
        "Authentication, Authorization, Accounting",
        "Authentication, Access, Auditing",
        "Admin, Authorization, Accounting"
      ],
      "correct": 1,
      "explanation": "Authentication (who are you?), Authorization (what can you do?), and Accounting (what did you do?) form the AAA security framework.",
      "ciscoCommand": null
    },
    {
      "id": "q204",
      "domain": "5",
      "topic": "5.8",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the difference between TACACS+ and RADIUS?",
      "options": [
        "TACACS+ uses UDP; RADIUS uses TCP",
        "TACACS+ encrypts the entire packet; RADIUS only encrypts the password",
        "RADIUS is Cisco proprietary",
        "TACACS+ is an open standard"
      ],
      "correct": 1,
      "explanation": "TACACS+ (Cisco) uses TCP port 49 and encrypts the entire packet. RADIUS (open standard) uses UDP ports 1812/1813 and only encrypts the password field.",
      "ciscoCommand": null
    },
    {
      "id": "q205",
      "domain": "5",
      "topic": "5.9",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the primary improvement of WPA3 over WPA2?",
      "options": [
        "Faster speeds",
        "SAE replaces the 4-way handshake, preventing offline dictionary attacks",
        "Longer passwords",
        "Support for 5GHz only"
      ],
      "correct": 1,
      "explanation": "WPA3 uses SAE (Simultaneous Authentication of Equals) which provides protection against offline dictionary attacks and forward secrecy.",
      "ciscoCommand": null
    },
    {
      "id": "q206",
      "domain": "5",
      "topic": "5.10",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What security method is commonly configured for enterprise wireless?",
      "options": [
        "WPA2-PSK",
        "WPA2-Enterprise with 802.1X",
        "WEP",
        "MAC filtering only"
      ],
      "correct": 1,
      "explanation": "WPA2-Enterprise uses 802.1X authentication with a RADIUS server, providing individual user credentials instead of a shared pre-shared key.",
      "ciscoCommand": null
    },
    {
      "id": "q207",
      "domain": "5",
      "topic": "5.1",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What is the difference between a threat, vulnerability, and exploit?",
      "options": [
        "They are all the same",
        "Threat=potential danger, Vulnerability=weakness, Exploit=attack leveraging a vulnerability",
        "Threat=software, Vulnerability=hardware, Exploit=user error",
        "None of these"
      ],
      "correct": 1,
      "explanation": "A threat is a potential danger, a vulnerability is a weakness in a system, and an exploit is the method used to take advantage of a vulnerability.",
      "ciscoCommand": null
    },
    {
      "id": "q208",
      "domain": "6",
      "topic": "6.3",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the difference between the control plane and data plane?",
      "options": [
        "Control plane forwards packets; data plane makes routing decisions",
        "Control plane makes routing decisions; data plane forwards packets",
        "They are the same",
        "Control plane is hardware; data plane is software"
      ],
      "correct": 1,
      "explanation": "The control plane runs routing protocols and builds the routing/forwarding tables. The data plane uses those tables to forward actual traffic.",
      "ciscoCommand": null
    },
    {
      "id": "q209",
      "domain": "6",
      "topic": "6.3",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What are Northbound and Southbound APIs in SDN?",
      "options": [
        "NB connects to users; SB connects to servers",
        "NB connects apps to the controller; SB connects the controller to network devices",
        "NB is for monitoring; SB is for configuration",
        "They are the same API"
      ],
      "correct": 1,
      "explanation": "Northbound APIs expose controller functionality to applications. Southbound APIs (like OpenFlow, NETCONF) communicate with network devices.",
      "ciscoCommand": null
    },
    {
      "id": "q210",
      "domain": "6",
      "topic": "6.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is Cisco DNA Center?",
      "options": [
        "A DNS server",
        "A centralized network management and automation platform",
        "A routing protocol",
        "A wireless access point"
      ],
      "correct": 1,
      "explanation": "Cisco DNA Center is an intent-based networking controller that provides centralized management, automation, assurance, and security for campus networks.",
      "ciscoCommand": null
    },
    {
      "id": "q211",
      "domain": "6",
      "topic": "6.4",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is intent-based networking?",
      "options": [
        "Manually configuring each device",
        "Expressing business intent and having the network translate it to device configurations",
        "Using AI to replace network engineers",
        "A wireless technology"
      ],
      "correct": 1,
      "explanation": "Intent-based networking allows admins to express what they want (intent), and the controller translates that into device-level configurations and validates compliance.",
      "ciscoCommand": null
    },
    {
      "id": "q212",
      "domain": "6",
      "topic": "6.2",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "How does controller-based networking differ from traditional networking?",
      "options": [
        "It's slower",
        "A central controller manages the control plane; traditional uses distributed control on each device",
        "It requires more hardware",
        "There is no difference"
      ],
      "correct": 1,
      "explanation": "In controller-based networking, the control plane is centralized on a controller (like DNA Center), while traditional networking has distributed control on each device.",
      "ciscoCommand": null
    },
    {
      "id": "q213",
      "domain": "6",
      "topic": "6.5",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "What HTTP method is used to create a new resource in a REST API?",
      "options": [
        "GET",
        "POST",
        "PUT",
        "DELETE"
      ],
      "correct": 1,
      "explanation": "POST creates a new resource. GET retrieves, PUT updates/replaces, PATCH partially updates, and DELETE removes a resource.",
      "ciscoCommand": null
    },
    {
      "id": "q214",
      "domain": "6",
      "topic": "6.5",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What does CRUD stand for in REST APIs?",
      "options": [
        "Create, Read, Update, Delete",
        "Copy, Retrieve, Upload, Download",
        "Connect, Request, Utilize, Disconnect",
        "Cache, Route, Update, Deploy"
      ],
      "correct": 0,
      "explanation": "CRUD maps to HTTP methods: Create=POST, Read=GET, Update=PUT/PATCH, Delete=DELETE.",
      "ciscoCommand": null
    },
    {
      "id": "q215",
      "domain": "6",
      "topic": "6.6",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "Which configuration management tool uses playbooks written in YAML?",
      "options": [
        "Puppet",
        "Chef",
        "Ansible",
        "SaltStack"
      ],
      "correct": 2,
      "explanation": "Ansible uses YAML playbooks for configuration management. It is agentless (uses SSH) unlike Puppet (uses agents) and Chef (uses agents).",
      "ciscoCommand": "show running-config"
    },
    {
      "id": "q216",
      "domain": "6",
      "topic": "6.6",
      "difficulty": 2,
      "type": "multiple-choice",
      "question": "What is the key advantage of Ansible over Puppet for network devices?",
      "options": [
        "Ansible is faster",
        "Ansible is agentless \u2014 uses SSH, no software needed on managed devices",
        "Ansible supports more vendors",
        "Ansible is open source"
      ],
      "correct": 1,
      "explanation": "Ansible is agentless, connecting via SSH. This is ideal for network devices that can't run agents. Puppet and Chef require agents installed on managed nodes.",
      "ciscoCommand": null
    },
    {
      "id": "q217",
      "domain": "6",
      "topic": "6.7",
      "difficulty": 1,
      "type": "multiple-choice",
      "question": "In JSON, what symbol encloses an object?",
      "options": [
        "[ ]",
        "( )",
        "{ }",
        "< >"
      ],
      "correct": 2,
      "explanation": "JSON objects are enclosed in curly braces {}. Arrays use square brackets []. Keys are strings in double quotes followed by colon and value.",
      "ciscoCommand": null
    }
  ]
};
