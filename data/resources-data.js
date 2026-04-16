/* Shared topic resources — books, videos, articles, labs, drills, Cisco refs.
   Extracted from core.html so multiple pages (core, quiz) can render the same data. */
(function(){
// ═══════════════════════════════════════════════════════════════
// RESOURCE MAPPING — book chapters, videos, articles per topic
// ═══════════════════════════════════════════════════════════════
const RES={
'1.1':{books:[{t:'Odom Vol 1, Ch. 2 — Network Components',id:'odom-library',p:50},{t:'McDowell Ch. 2 — Network Devices',id:'mcdowell',p:20,ch:2},{t:'Singh Ch. 1 — Functions of Network Devices',id:'singh',p:42,ch:1}],video:'Network Devices | Day 1',vurl:'https://www.youtube.com/watch?v=H8W9oMNSuwo',articles:[{t:'Study-CCNA — Network Components',u:'https://study-ccna.com/network-devices/'}],site:[{t:'Devices Page',h:'devices.html'},{t:'Learn Visually',h:'learn-visually.html'}]},
'1.2':{books:[{t:'Odom Vol 2, Ch. 13 — LAN Architecture',id:'odom-vol2',p:288,ch:13}],video:'OSI Model & TCP/IP Suite | Day 3',vurl:'https://www.youtube.com/watch?v=t-ai8JzhHuY',articles:[{t:'Study-CCNA — Network Topologies',u:'https://study-ccna.com/network-topologies/'}],site:[{t:'Learn Visually',h:'learn-visually.html'},{t:'3D Topology',h:'devices.html#3d'}]},
'1.3':{books:[{t:'Odom Vol 1, Ch. 3 — Cables & Connectors',id:'odom-library'},{t:'McDowell Ch. 3 — Cables, Connectors, and Ports',id:'mcdowell',p:50,ch:3},{t:'Singh Ch. 1 — Introduction to Networking',id:'singh',p:20,ch:1}],video:'Interfaces and Cables | Day 2',vurl:'https://www.youtube.com/watch?v=ieTH5lVhNaY',articles:[{t:'Study-CCNA — Cables & Connectors',u:'https://study-ccna.com/ethernet-frame/'}],site:[{t:'Learn Visually',h:'learn-visually.html'},{t:'PT Lab 0',h:'labs/lab-pt0-getting-started.html'}]},
'1.5':{books:[{t:'Odom Vol 2, Ch. 1 — TCP/IP Transport & Applications',id:'odom-vol2',p:4,ch:1},{t:'McDowell Ch. 4 — The TCP/IP Networking Model',id:'mcdowell',p:80,ch:4}],video:'TCP & UDP | Day 30',vurl:'https://www.youtube.com/watch?v=LIEACBqlntY',articles:[{t:'Study-CCNA — TCP vs UDP',u:'https://study-ccna.com/tcp-and-udp/'}],site:[{t:'Quiz 1.5',h:'quiz.html?learn=1.5'},{t:'Glossary',h:'glossary.html'}]},
'1.6':{books:[{t:'Odom Vol 1, Ch. 11 — IPv4 Subnetting',id:'odom-library',p:241,ch:'V1-11'},{t:'McDowell Ch. 7 — IPv4 Addressing',id:'mcdowell',p:160,ch:7},{t:'Singh Ch. 5 — IPv4 and IPv6',id:'singh',p:220,ch:5}],video:'IPv4 Addressing Part 1 | Day 7',vurl:'https://www.youtube.com/watch?v=3ROdsfEUuhs',articles:[{t:'Study-CCNA — IPv4 Addressing',u:'https://study-ccna.com/what-is-ipv4-address/'}],site:[{t:'Subnetting Cheat Sheet',h:'subnetting-visual.html'},{t:'Subnet Mastery',h:'subnetting-mastery.html'}]},
'1.7':{books:[{t:'Odom Vol 1, Ch. 12 — Classful IPv4 Networks',id:'odom-library',p:259,ch:'V1-12'},{t:'McDowell Ch. 7 — IPv4 Addressing',id:'mcdowell',p:160,ch:7},{t:'Singh Ch. 5 — IPv4 and IPv6',id:'singh',p:220,ch:5}],video:'Subnetting Part 1 | Day 13',vurl:'https://www.youtube.com/watch?v=bQ8sdpGQu8c',articles:[{t:'Study-CCNA — Private IPs & RFC 1918',u:'https://study-ccna.com/private-ip-addresses/'}],site:[{t:'Subnetting Cheat Sheet',h:'subnetting-visual.html'}]},
'1.8':{books:[{t:'Odom Vol 1 — IPv6 Addressing',id:'odom-library'},{t:'Singh Ch. 5 — IPv4 and IPv6',id:'singh',p:220,ch:5}],video:'IPv6 Part 1 | Day 31',vurl:'https://www.youtube.com/watch?v=ZNuXyOXae5U',articles:[{t:'Study-CCNA — IPv6 Addressing',u:'https://study-ccna.com/types-of-ipv6-addresses/'}],site:[{t:'PT Lab 3',h:'labs/lab-pt3-inter-vlan-routing.html'},{t:'Learn Visually',h:'learn-visually.html'}]},
'1.9':{books:[{t:'Odom Vol 1 — IPv6 Address Types',id:'odom-library'},{t:'Singh Ch. 5 — IPv4 and IPv6',id:'singh',p:220,ch:5}],video:'IPv6 Part 3 | Day 33',vurl:'https://www.youtube.com/watch?v=rwkHfsWQwy8',articles:[{t:'Study-CCNA — IPv6 Address Types',u:'https://study-ccna.com/types-of-ipv6-addresses/'}],site:[{t:'Glossary',h:'glossary.html'}]},
'1.11':{books:[{t:'Odom Vol 1, Ch. 26 — Fundamentals of Wireless LANs',id:'odom-library',p:623,ch:'V1-26'}],video:'Wireless Fundamentals | Day 55',vurl:'https://www.youtube.com/watch?v=zuYiktLqNYQ',articles:[{t:'Study-CCNA — Wireless Networking',u:'https://study-ccna.com/wireless-network-overview-types/'}],site:[{t:'Learn Visually',h:'learn-visually.html'},{t:'Devices Page',h:'devices.html'}]},
'1.12':{books:[{t:'Odom Vol 2, Ch. 15 — Cloud Architecture',id:'odom-vol2',p:328,ch:15}],video:'Virtualization & Cloud | Day 54',vurl:'https://www.youtube.com/watch?v=_S3greGajJA',articles:[{t:'Study-CCNA — Virtualization',u:'https://study-ccna.com/server-virtualization/'}],site:[{t:'Glossary',h:'glossary.html'}]},
'1.13':{books:[{t:'Odom Vol 1, Ch. 5 — Ethernet LAN Switching',id:'odom-library',p:95,ch:'V1-5'},{t:'McDowell Ch. 6 — Ethernet LAN Switching',id:'mcdowell',p:130,ch:6}],video:'Ethernet LAN Switching Part 1 | Day 5',vurl:'https://www.youtube.com/watch?v=u2n762WG0Vo',articles:[{t:'Study-CCNA — Switching',u:'https://study-ccna.com/how-switches-work/'}],site:[{t:'Learn Visually',h:'learn-visually.html'}]},
'2.1':{books:[{t:'Odom Vol 1, Ch. 23 — Fundamentals of VLANs',id:'odom-library',p:543,ch:'V1-23'},{t:'McDowell Ch. 12 — VLANs',id:'mcdowell',p:310,ch:12},{t:'Singh Ch. 3 — VLANs and Trunking',id:'singh',p:122,ch:3}],video:'VLANs Part 1 | Day 16',vurl:'https://www.youtube.com/watch?v=cjFzOnm6u1g',articles:[{t:'Study-CCNA — VLANs',u:'https://study-ccna.com/vlans/'}],site:[{t:'Console Lab 03-04',h:'console-labs.html'},{t:'PT Lab 1',h:'labs/lab-pt1-vlan.html'}]},
'2.2':{books:[{t:'Odom Vol 1, Ch. 23 — VLANs & Trunking',id:'odom-library',p:543,ch:'V1-23'},{t:'McDowell Ch. 13 — DTP and VTP',id:'mcdowell',p:340,ch:13},{t:'Singh Ch. 3 — VLANs and Trunking',id:'singh',p:122,ch:3}],video:'VLANs Part 3 (Trunking) | Day 18',vurl:'https://www.youtube.com/watch?v=OkPB028l2eE',articles:[{t:'Study-CCNA — 802.1Q Trunking',u:'https://study-ccna.com/ieee-802-1q/'}],site:[{t:'Console Lab 05',h:'console-labs.html'},{t:'PT Lab 1',h:'labs/lab-pt1-vlan.html'}]},
'2.3':{books:[{t:'Odom Vol 2, Ch. 12 — Misc IP Services (CDP/LLDP)',id:'odom-vol2',p:254,ch:12}],video:'CDP & LLDP | Day 36',vurl:'https://www.youtube.com/watch?v=_hnMZBzXRRk',articles:[{t:'Study-CCNA — CDP & LLDP',u:'https://study-ccna.com/cisco-discovery-protocol-cdp-overview/'}],site:[{t:'Glossary',h:'glossary.html'}]},
'2.4':{books:[{t:'Odom Vol 1, Ch. 16 — Configuring IPv4 & Static Routes',id:'odom-library',p:359,ch:'V1-16'},{t:'Singh Ch. 4 — STP and EtherChannel',id:'singh',p:170,ch:4}],video:'EtherChannel | Day 23',vurl:'https://www.youtube.com/watch?v=xuo69Joy_Nc',articles:[{t:'Study-CCNA — EtherChannel',u:'https://study-ccna.com/what-is-etherchannel/'}],site:[{t:'PT Lab 2',h:'labs/lab-pt2-stp-etherchannel.html'},{t:'Learn Visually',h:'learn-visually.html'}]},
'2.5':{books:[{t:'Odom Vol 1, Ch. 24 — Implementing VLANs and STP',id:'odom-library',p:567,ch:'V1-24'},{t:'McDowell Ch. 14 — Spanning Tree Protocol',id:'mcdowell',p:370,ch:14},{t:'Singh Ch. 4 — STP and EtherChannel',id:'singh',p:170,ch:4}],video:'Spanning Tree Protocol Part 1 | Day 20',vurl:'https://www.youtube.com/watch?v=j-bK-EFt9cY',articles:[{t:'Study-CCNA — STP',u:'https://study-ccna.com/what-is-stp/'}],site:[{t:'PT Lab 2',h:'labs/lab-pt2-stp-etherchannel.html'},{t:'Learn Visually',h:'learn-visually.html'}]},
'2.6':{books:[{t:'Odom Vol 1, Ch. 26 — Fundamentals of Wireless LANs',id:'odom-library',p:623,ch:'V1-26'},{t:'Odom Vol 1, Ch. 27 — Cisco Wireless Architectures',id:'odom-library',p:655,ch:'V1-27'}],video:'Wireless Architectures | Day 56',vurl:'https://www.youtube.com/watch?v=uX1h0F6wpBY',articles:[{t:'Study-CCNA — Wireless Architectures',u:'https://study-ccna.com/cisco-wireless-architectures-overview-examples/'}],site:[{t:'Devices Page',h:'devices.html'}]},
'2.7':{books:[{t:'Odom Vol 1, Ch. 27 — Cisco Wireless Architectures',id:'odom-library',p:655,ch:'V1-27'}],video:'Wireless Fundamentals | Day 55',vurl:'https://www.youtube.com/watch?v=zuYiktLqNYQ',articles:[{t:'Study-CCNA — WLC',u:'https://study-ccna.com/cisco-wireless-architectures-overview-examples/'}],site:[{t:'Devices Page',h:'devices.html'}]},
'2.8':{books:[{t:'Odom Vol 2, Ch. 9 — Device Management Protocols',id:'odom-vol2',p:172,ch:9}],video:'SSH | Day 42',vurl:'https://www.youtube.com/watch?v=AvgYqI2qSD4',articles:[{t:'Study-CCNA — Device Management',u:'https://study-ccna.com/telnet-ssh/'}],site:[{t:'Console Lab 08',h:'console-labs.html'}]},
'2.9':{books:[{t:'Odom Vol 1, Ch. 27 — Wireless Configuration',id:'odom-library',p:655,ch:'V1-27'}],video:'Wireless Configuration | Day 58',vurl:'https://www.youtube.com/watch?v=r9o6GFI87go',articles:[{t:'Study-CCNA — WLC Configuration',u:'https://study-ccna.com/cisco-wireless-architectures-overview-examples/'}],site:[{t:'Devices Page',h:'devices.html'}]},
'3.1':{books:[{t:'Odom Vol 1, Ch. 17 — IP Routing in the LAN',id:'odom-library',p:385,ch:'V1-17'},{t:'McDowell Ch. 9 — Routing Fundamentals',id:'mcdowell',p:220,ch:9},{t:'Singh Ch. 6 — Routing Concepts and Protocols',id:'singh',p:280,ch:6}],video:'Routing Fundamentals | Day 11',vurl:'https://www.youtube.com/watch?v=aHwAm8GYbn8',articles:[{t:'Study-CCNA — Routing Table',u:'https://study-ccna.com/what-is-ip-routing/'}],site:[{t:'Console Lab 06-07',h:'console-labs.html'},{t:'OSPF Mastery',h:'ospf-mastery.html'}]},
'3.2':{books:[{t:'Odom Vol 1, Ch. 17-18 — Routing & Troubleshooting',id:'odom-library',p:385,ch:'V1-17'},{t:'McDowell Ch. 10 — Life of a Packet',id:'mcdowell',p:250,ch:10},{t:'Singh Ch. 6 — Routing Concepts and Protocols',id:'singh',p:280,ch:6}],video:'Life of a Packet | Day 12',vurl:'https://www.youtube.com/watch?v=4YrYV2io3as',articles:[{t:'Study-CCNA — Longest Prefix Match',u:'https://study-ccna.com/what-is-ip-routing/'}],site:[{t:'Packet Race',h:'packet-race.html'}]},
'3.3':{books:[{t:'Odom Vol 1, Ch. 16 — Static Routes',id:'odom-library',p:359,ch:'V1-16'},{t:'Singh Ch. 6 — Routing Concepts and Protocols',id:'singh',p:280,ch:6}],video:'Static Routing | Day 11',vurl:'https://www.youtube.com/watch?v=YCv4-_sMvYE',articles:[{t:'Study-CCNA — Static Routes',u:'https://study-ccna.com/connected-static-dynamic-routes/'}],site:[{t:'Console Lab 07',h:'console-labs.html'}]},
'3.4':{books:[{t:'Odom Vol 1, Ch. 19 — OSPF Concepts',id:'odom-library',p:441,ch:'V1-19'},{t:'McDowell Ch. 14 — Spanning Tree (MEAP incomplete)',id:'mcdowell',p:370,ch:14},{t:'Singh Ch. 7 — OSPF',id:'singh',p:330,ch:7}],video:'OSPF Part 1 | Day 26',vurl:'https://www.youtube.com/watch?v=pvuaoJ9YzoI',articles:[{t:'Study-CCNA — OSPF',u:'https://study-ccna.com/ospf-overview/'}],site:[{t:'OSPF Mastery',h:'ospf-mastery.html'},{t:'Console Lab 09',h:'console-labs.html'},{t:'PT Lab 4-5',h:'labs/lab-pt4-ospf.html'}]},
'3.5':{books:[{t:'Odom Vol 1, Ch. 19 — OSPF Concepts (FHRP)',id:'odom-library',p:441,ch:'V1-19'}],video:'First Hop Redundancy Protocols | Day 29',vurl:'https://www.youtube.com/watch?v=43WnpwQMolo',articles:[{t:'Study-CCNA — HSRP',u:'https://study-ccna.com/cisco-hsrp-explained/'}],site:[{t:'Devices Page',h:'devices.html'},{t:'Learn Visually',h:'learn-visually.html'}]},
'4.1':{books:[{t:'Odom Vol 2, Ch. 10 — NAT',id:'odom-vol2',p:202,ch:10},{t:'Singh Ch. 8 — NAT, DHCP, DNS, NTP',id:'singh',p:380,ch:8}],video:'NAT Part 1 | Day 44',vurl:'https://www.youtube.com/watch?v=2TZCfTgopeg',articles:[{t:'Study-CCNA — NAT',u:'https://study-ccna.com/what-is-nat/'}],site:[{t:'Console Lab 12',h:'console-labs.html'},{t:'PT Lab 6',h:'labs/lab-pt6-nat-dhcp.html'}]},
'4.2':{books:[{t:'Odom Vol 2, Ch. 12 — Misc IP Services (NTP)',id:'odom-vol2',p:254,ch:12},{t:'Singh Ch. 8 — NAT, DHCP, DNS, NTP',id:'singh',p:380,ch:8}],video:'NTP | Day 37',vurl:'https://www.youtube.com/watch?v=qGJaJx7OfUo',articles:[{t:'Study-CCNA — NTP',u:'https://study-ccna.com/ntp/'}],site:[{t:'Devices Page',h:'devices.html'}]},
'4.3':{books:[{t:'Odom Vol 2, Ch. 7 — Implementing DHCP',id:'odom-vol2',p:122,ch:7},{t:'Singh Ch. 8 — NAT, DHCP, DNS, NTP',id:'singh',p:380,ch:8}],video:'DHCP | Day 39',vurl:'https://www.youtube.com/watch?v=hzkleGAC2_Y',articles:[{t:'Study-CCNA — DHCP',u:'https://study-ccna.com/dhcp/'}],site:[{t:'PT Lab 6',h:'labs/lab-pt6-nat-dhcp.html'},{t:'Devices Page',h:'devices.html'}]},
'4.4':{books:[{t:'Odom Vol 2, Ch. 9 — Device Management (SNMP)',id:'odom-vol2',p:172,ch:9},{t:'Singh Ch. 9 — Network Management (SNMP, Syslog)',id:'singh',p:430,ch:9}],video:'SNMP | Day 40',vurl:'https://www.youtube.com/watch?v=HXu0Ifj0oWU',articles:[{t:'Study-CCNA — SNMP',u:'https://study-ccna.com/snmp-simple-network-management-protocol/'}],site:[{t:'Devices Page',h:'devices.html'},{t:'Glossary',h:'glossary.html'}]},
'4.5':{books:[{t:'Odom Vol 2, Ch. 9 — Device Management (Syslog)',id:'odom-vol2',p:172,ch:9},{t:'Singh Ch. 9 — Network Management (SNMP, Syslog)',id:'singh',p:430,ch:9}],video:'Syslog | Day 41',vurl:'https://www.youtube.com/watch?v=RaQPSKQ4J5A',articles:[{t:'Study-CCNA — Syslog',u:'https://study-ccna.com/syslog-explained/'}],site:[{t:'Devices Page',h:'devices.html'}]},
'4.6':{books:[{t:'Odom Vol 2, Ch. 7 — DHCP (Relay)',id:'odom-vol2',p:122,ch:7}],video:'DHCP (incl. Relay) | Day 39',vurl:'https://www.youtube.com/watch?v=hzkleGAC2_Y',articles:[{t:'Study-CCNA — DHCP Relay',u:'https://study-ccna.com/dhcp-relay/'}],site:[{t:'PT Lab 6',h:'labs/lab-pt6-nat-dhcp.html'}]},
'4.7':{books:[{t:'Odom Vol 2, Ch. 11 — Quality of Service (QoS)',id:'odom-vol2',p:226,ch:11}],video:'QoS Part 1 | Day 46',vurl:'https://www.youtube.com/watch?v=H6FKJMiiL6E',articles:[{t:'Study-CCNA — QoS',u:'https://study-ccna.com/quality-of-service-qos/'}],site:[{t:'Glossary',h:'glossary.html'}]},
'4.8':{books:[{t:'Odom Vol 2, Ch. 5 — Securing Network Devices (SSH)',id:'odom-vol2',p:86,ch:5},{t:'McDowell Ch. 5 — The Cisco IOS CLI',id:'mcdowell',p:100,ch:5}],video:'SSH | Day 42',vurl:'https://www.youtube.com/watch?v=AvgYqI2qSD4',articles:[{t:'Study-CCNA — SSH',u:'https://study-ccna.com/telnet-ssh/'}],site:[{t:'Console Lab 08',h:'console-labs.html'}]},
'4.9':{books:[{t:'Odom Vol 2, Ch. 12 — Misc IP Services (FTP/TFTP)',id:'odom-vol2',p:254,ch:12}],video:'FTP & TFTP | Day 43',vurl:'https://www.youtube.com/watch?v=50hcfsoBf4Q',articles:[{t:'Study-CCNA — TFTP & FTP',u:'https://study-ccna.com/ftp-tftp/'}],site:[{t:'Devices Page',h:'devices.html'}]},
'5.1':{books:[{t:'Odom Vol 2, Ch. 4 — Security Architectures',id:'odom-vol2',p:68,ch:4},{t:'Singh Ch. 10 — Network Security Fundamentals',id:'singh',p:480,ch:10}],video:'Security Fundamentals | Day 48',vurl:'https://www.youtube.com/watch?v=VvFuieyTTSw',articles:[{t:'Study-CCNA — Security',u:'https://study-ccna.com/network-security-overview/'}],site:[{t:'Glossary',h:'glossary.html'}]},
'5.3':{books:[{t:'Odom Vol 2, Ch. 5 — Securing Network Devices',id:'odom-vol2',p:86,ch:5},{t:'Singh Ch. 10 — Network Security Fundamentals',id:'singh',p:480,ch:10}],video:'Intro to the CLI (Passwords) | Day 4',vurl:'https://www.youtube.com/watch?v=IYbtai7Nu2g',articles:[{t:'Study-CCNA — Password Security',u:'https://study-ccna.com/encrypt-local-usernames-and-passwords/'}],site:[{t:'Console Lab 08',h:'console-labs.html'}]},
'5.4':{books:[{t:'Odom Vol 2, Ch. 5 — Securing Network Devices',id:'odom-vol2',p:86,ch:5}],video:'Security Fundamentals | Day 48',vurl:'https://www.youtube.com/watch?v=VvFuieyTTSw',articles:[{t:'Study-CCNA — Password Security',u:'https://study-ccna.com/encrypt-local-usernames-and-passwords/'}],site:[]},
'5.5':{books:[{t:'Odom Vol 2, Ch. 14 — WAN Architecture (VPN)',id:'odom-vol2',p:302,ch:14}],video:'WAN Architectures (VPN) | Day 53',vurl:'https://www.youtube.com/watch?v=BW3fQgdf4-w',articles:[{t:'Study-CCNA — IPsec VPN',u:'https://study-ccna.com/cisco-vpn-what-is-vpn/'}],site:[{t:'Glossary',h:'glossary.html'}]},
'5.6':{books:[{t:'Odom Vol 2, Ch. 2 — Basic IPv4 ACLs',id:'odom-vol2',p:24,ch:2},{t:'Odom Vol 2, Ch. 3 — Advanced IPv4 ACLs',id:'odom-vol2',p:44,ch:3},{t:'Singh Ch. 11 — ACLs and Firewalls',id:'singh',p:530,ch:11}],video:'Standard ACLs | Day 34',vurl:'https://www.youtube.com/watch?v=z023_eRUtSo',articles:[{t:'Study-CCNA — ACLs',u:'https://study-ccna.com/what-are-acls/'}],site:[{t:'Console Lab 10',h:'console-labs.html'},{t:'PT Lab 7',h:'labs/lab-pt7-acl-portsec.html'}]},
'5.7':{books:[{t:'Odom Vol 2, Ch. 6 — Port Security',id:'odom-vol2',p:106,ch:6},{t:'Odom Vol 2, Ch. 8 — DHCP Snooping & ARP Inspection',id:'odom-vol2',p:144,ch:8}],video:'Port Security | Day 49',vurl:'https://www.youtube.com/watch?v=sHN3jOJIido',articles:[{t:'Study-CCNA — Port Security',u:'https://study-ccna.com/port-security/'}],site:[{t:'Console Lab 11',h:'console-labs.html'},{t:'PT Lab 7',h:'labs/lab-pt7-acl-portsec.html'}]},
'5.8':{books:[{t:'Odom Vol 2, Ch. 5 — Securing Devices (AAA)',id:'odom-vol2',p:86,ch:5}],video:'Security Fundamentals (AAA) | Day 48',vurl:'https://www.youtube.com/watch?v=VvFuieyTTSw',articles:[{t:'Study-CCNA — AAA',u:'https://study-ccna.com/aaa/'}],site:[{t:'Devices Page',h:'devices.html'}]},
'5.9':{books:[{t:'Odom Vol 1, Ch. 26 — Wireless LANs (Security)',id:'odom-library',p:623,ch:'V1-26'}],video:'Wireless Security | Day 57',vurl:'https://www.youtube.com/watch?v=wHXKo9So5y8',articles:[{t:'Study-CCNA — Wireless Security',u:'https://study-ccna.com/wifi-security/'}],site:[]},
'5.10':{books:[{t:'Odom Vol 1, Ch. 26 — Wireless LANs (WPA2)',id:'odom-library',p:623,ch:'V1-26'}],video:'Wireless Configuration | Day 58',vurl:'https://www.youtube.com/watch?v=r9o6GFI87go',articles:[{t:'Study-CCNA — WPA2 PSK',u:'https://study-ccna.com/wifi-security/'}],site:[]},
'6.1':{books:[{t:'Odom Vol 2, Ch. 16 — Controller-Based Networking',id:'odom-vol2',p:356,ch:16},{t:'Singh Ch. 12 — Automation and Programmability',id:'singh',p:580,ch:12}],video:'Intro to Network Automation | Day 59',vurl:'https://www.youtube.com/watch?v=4tsBgMCPVuc',articles:[{t:'Study-CCNA — Automation',u:'https://study-ccna.com/network-automation/'}],site:[{t:'Glossary',h:'glossary.html'}]},
'6.2':{books:[{t:'Odom Vol 2, Ch. 16 — Controller-Based Networking',id:'odom-vol2',p:356,ch:16},{t:'Singh Ch. 12 — Automation and Programmability',id:'singh',p:580,ch:12}],video:'Software-Defined Networking | Day 62',vurl:'https://www.youtube.com/watch?v=7HhWCeXDTpA',articles:[{t:'Study-CCNA — SDN',u:'https://study-ccna.com/cisco-sdn-software-defined-networking/'}],site:[{t:'Glossary',h:'glossary.html'}]},
'6.3':{books:[{t:'Odom Vol 2, Ch. 17 — Cisco SDA',id:'odom-vol2',p:382,ch:17},{t:'Singh Ch. 12 — Automation and Programmability',id:'singh',p:580,ch:12}],video:'Software-Defined Networking | Day 62',vurl:'https://www.youtube.com/watch?v=7HhWCeXDTpA',articles:[{t:'Study-CCNA — SDN Architecture',u:'https://study-ccna.com/cisco-sdn-software-defined-networking/'}],site:[{t:'Glossary',h:'glossary.html'}]},
'6.5':{books:[{t:'Odom Vol 2, Ch. 18 — REST and JSON',id:'odom-vol2',p:406,ch:18},{t:'Singh Ch. 12 — Automation and Programmability',id:'singh',p:580,ch:12}],video:'REST APIs | Day 61',vurl:'https://www.youtube.com/watch?v=Luei0p-2h10',articles:[{t:'Study-CCNA — REST APIs',u:'https://study-ccna.com/soap-vs-rest-web-api-services/'}],site:[{t:'PT Lab 8',h:'labs/lab-pt8-json-api.html'}]},
'6.6':{books:[{t:'Odom Vol 2, Ch. 19 — Ansible, Puppet, and Chef',id:'odom-vol2',p:428,ch:19}],video:'Ansible, Puppet, & Chef | Day 63',vurl:'https://www.youtube.com/watch?v=Kog9gHTjALI',articles:[{t:'Study-CCNA — Ansible',u:'https://study-ccna.com/configuration-management-tools-ansible-chef-puppet/'}],site:[{t:'Glossary',h:'glossary.html'}]},
'6.7':{books:[{t:'Odom Vol 2, Ch. 18 — REST and JSON',id:'odom-vol2',p:406,ch:18}],video:'JSON, XML, & YAML | Day 60',vurl:'https://www.youtube.com/watch?v=nohde2-QNJ4',articles:[{t:'Study-CCNA — JSON & XML',u:'https://study-ccna.com/data-serialization-formats-json-yaml-xml/'}],site:[{t:'PT Lab 8',h:'labs/lab-pt8-json-api.html'}]},
};

// ═══════════════════════════════════════════════════════════════
// ENRICHED RESOURCES — extra videos, articles, labs, drills, study day
// Merges into RES without overwriting existing data.
// Domain 1 + Domain 3 fully enriched. Other domains: add as needed.
// ═══════════════════════════════════════════════════════════════
const RES_EXTRA = {
// ── DOMAIN 1 — Network Fundamentals (20%) ─────────────────────
'1.1':{jday:'1',sprint:null,
  videos:[
    {t:'Network Devices | Day 1',u:'https://www.youtube.com/watch?v=H8W9oMNSuwo',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Practical Networking — Key Players (Router, Switch, Host)',u:'https://www.practicalnetworking.net/series/packet-traveling/key-players/'},
  ],
  labs:[
    {t:'PT Lab 0 — Getting Started',h:'labs/lab-pt0-getting-started.html'},
    {t:'Console Lab 01 — Basic Device Access',h:'console-labs.html'},
  ],
  drills:[
    {t:'Quiz 1.1 — Network Components',h:'quiz.html?learn=1.1'},
  ],
  cisco:[
  ],
},
'1.2':{jday:'3',sprint:null,
  videos:[
    {t:'OSI Model & TCP/IP Suite | Day 3',u:'https://www.youtube.com/watch?v=t-ai8JzhHuY',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Practical Networking — OSI Model',u:'https://www.practicalnetworking.net/series/packet-traveling/osi-model/'},
    {t:'Study-CCNA — Spine-Leaf Architecture',u:'https://study-ccna.com/spine-leaf-architecture/'},
  ],
  labs:[
    {t:'3D Topology Explorer',h:'devices.html#3d'},
  ],
  drills:[
    {t:'Quiz 1.2 — Topologies & Architectures',h:'quiz.html?learn=1.2'},
  ],
},
'1.3':{jday:'2',sprint:null,
  videos:[
    {t:'Interfaces and Cables | Day 2',u:'https://www.youtube.com/watch?v=ieTH5lVhNaY',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — Fiber Optic Cables',u:'https://study-ccna.com/fiber-optic-cables/'},
    {t:'PacketLife — Cabling Cheat Sheet (PDF)',u:'https://packetlife.net/library/cheat-sheets/'},
  ],
  labs:[
    {t:'PT Lab 0 — Getting Started (Cabling)',h:'labs/lab-pt0-getting-started.html'},
  ],
  drills:[
    {t:'Quiz 1.3 — Cables & Interfaces',h:'quiz.html?learn=1.3'},
  ],
},
'1.4':{jday:'9',sprint:null,
  videos:[
    {t:'Switch Interfaces | Day 9',u:'https://www.youtube.com/watch?v=cCqluocfQe0',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — Duplex & Speed Mismatch',u:'https://study-ccna.com/duplex-speed-mismatch/'},
  ],
  labs:[
    {t:'Console Lab 06 — Interface Status',h:'console-labs.html'},
  ],
  drills:[
    {t:'Quiz 1.4 — Interface Issues',h:'quiz.html?learn=1.4'},
  ],
  cisco:[
  ],
},
'1.5':{jday:'30',sprint:null,
  videos:[
    {t:'TCP & UDP | Day 30',u:'https://www.youtube.com/watch?v=LIEACBqlntY',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Practical Networking — TCP vs UDP',u:'https://www.practicalnetworking.net/series/packet-traveling/osi-model/'},
    {t:'Study-CCNA — Well-Known Port Numbers',u:'https://study-ccna.com/ports/'},
  ],
  labs:[],
  drills:[
    {t:'Quiz 1.5 — TCP vs UDP',h:'quiz.html?learn=1.5'},
    {t:'Port Number Flashcards (Anki)',u:'https://ankiweb.net/shared/info/591991787'},
  ],
},
'1.6':{jday:'7-8, 13-15',sprint:[1,2,23],
  videos:[
    {t:'IPv4 Addressing Part 1 | Day 7',u:'https://www.youtube.com/watch?v=3ROdsfEUuhs',ch:"Jeremy's IT Lab"},
    {t:'Subnetting Part 1 | Day 13',u:'https://www.youtube.com/watch?v=bQ8sdpGQu8c',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Practical Networking — Subnetting Mastery',u:'https://www.practicalnetworking.net/stand-alone/subnetting-mastery/'},
    {t:'9tut — Subnetting Tutorial',u:'https://www.9tut.com/subnetting-tutorial'},
    {t:'PacketLife — Subnet Cheat Sheet (PDF)',u:'https://packetlife.net/library/cheat-sheets/'},
  ],
  labs:[
    {t:'Subnetting Mastery (internal)',h:'subnetting-mastery.html'},
    {t:'Subnetting Visual Cheat Sheet',h:'subnetting-visual.html'},
  ],
  drills:[
    {t:'SubnettingPractice.com — Timed Drills',u:'https://subnettingpractice.com/'},
    {t:'SubnetIPv4.com — Random Questions',u:'https://subnetipv4.com/'},
    {t:'Subnetting.org — Speed Drills',u:'https://subnetting.org/'},
    {t:'Quiz 1.6 — IPv4 Addressing',h:'quiz.html?learn=1.6'},
  ],
},
'1.7':{jday:'7',sprint:null,
  videos:[
    {t:'Subnetting Part 1 | Day 13',u:'https://www.youtube.com/watch?v=bQ8sdpGQu8c',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
  ],
  labs:[
    {t:'Subnetting Visual Cheat Sheet',h:'subnetting-visual.html'},
  ],
  drills:[
    {t:'Quiz 1.7 — Private IPv4',h:'quiz.html?learn=1.7'},
    {t:'SubnettingPractice.com',u:'https://subnettingpractice.com/'},
  ],
},
'1.8':{jday:'31-32',sprint:[20],
  videos:[
    {t:'IPv6 Part 1 | Day 31',u:'https://www.youtube.com/watch?v=ZNuXyOXae5U',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Practical Networking — IPv6 Fundamentals',u:'https://www.practicalnetworking.net/series/ipv6/ipv6-subnetting-overview/'},
    {t:'Study-CCNA — IPv6 Subnetting',u:'https://study-ccna.com/ipv6-subnetting/'},
  ],
  labs:[
    {t:'PT Lab 3 — Inter-VLAN Routing (incl. IPv6)',h:'labs/lab-pt3-inter-vlan-routing.html'},
  ],
  drills:[
    {t:'Quiz 1.8 — IPv6 Addressing',h:'quiz.html?learn=1.8'},
  ],
},
'1.9':{jday:'33',sprint:[20],
  videos:[
    {t:'IPv6 Part 3 | Day 33',u:'https://www.youtube.com/watch?v=rwkHfsWQwy8',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — Modified EUI-64',u:'https://study-ccna.com/ipv6-eui-64/'},
  ],
  labs:[],
  drills:[
    {t:'Quiz 1.9 — IPv6 Address Types',h:'quiz.html?learn=1.9'},
  ],
},
'1.10':{jday:'4',sprint:null,
  videos:[
    {t:'Intro to the CLI | Day 4',u:'https://www.youtube.com/watch?v=IYbtai7Nu2g',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — Verify IP Parameters',u:'https://study-ccna.com/verify-ip-parameters/'},
  ],
  labs:[
    {t:'Console Lab 01 — CLI Navigation',h:'console-labs.html'},
    {t:'Console Lab 02 — IP Configuration',h:'console-labs.html'},
  ],
  drills:[
    {t:'Quiz 1.10 — IP Parameters',h:'quiz.html?learn=1.10'},
  ],
  cisco:[
  ],
},
'1.11':{jday:'55-56',sprint:null,
  videos:[
    {t:'Wireless Fundamentals | Day 55',u:'https://www.youtube.com/watch?v=zuYiktLqNYQ',ch:"Jeremy's IT Lab"},
    {t:'Wireless Architectures | Day 56',u:'https://www.youtube.com/watch?v=uX1h0F6wpBY',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — Non-overlapping Channels',u:'https://study-ccna.com/non-overlapping-wifi-channels/'},
  ],
  labs:[],
  drills:[
    {t:'Quiz 1.11 — Wireless Principles',h:'quiz.html?learn=1.11'},
  ],
},
'1.12':{jday:'54',sprint:null,
  videos:[
    {t:'Virtualization & Cloud | Day 54',u:'https://www.youtube.com/watch?v=_S3greGajJA',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — VRF (Virtual Routing)',u:'https://study-ccna.com/vrf-virtual-routing-forwarding/'},
  ],
  labs:[],
  drills:[
    {t:'Quiz 1.12 — Virtualization Fundamentals',h:'quiz.html?learn=1.12'},
  ],
},
'1.13':{jday:'5-6',sprint:null,
  videos:[
    {t:'Ethernet LAN Switching Part 1 | Day 5',u:'https://www.youtube.com/watch?v=u2n762WG0Vo',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Practical Networking — How a Switch Operates',u:'https://www.practicalnetworking.net/series/packet-traveling/packet-traveling-switch/'},
    {t:'Study-CCNA — MAC Address Table',u:'https://study-ccna.com/how-switches-work/'},
  ],
  labs:[
    {t:'Console Lab 03 — MAC Address Table',h:'console-labs.html'},
    {t:'Wireshark — Ethernet Frame Captures',u:'https://wiki.wireshark.org/samplecaptures'},
  ],
  drills:[
    {t:'Quiz 1.13 — Switching Concepts',h:'quiz.html?learn=1.13'},
  ],
},
// ── DOMAIN 3 — IP Connectivity (25%) ──────────────────────────
'3.1':{jday:'11',sprint:[3],
  videos:[
    {t:'Routing Fundamentals | Day 11',u:'https://www.youtube.com/watch?v=aHwAm8GYbn8',ch:"Jeremy's IT Lab"},
    {t:'Life of a Packet | Day 12',u:'https://www.youtube.com/watch?v=4YrYV2io3as',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Practical Networking — How a Router Works',u:'https://www.practicalnetworking.net/series/packet-traveling/packet-traveling-router/'},
  ],
  labs:[
    {t:'Console Lab 06-07 — Routing',h:'console-labs.html'},
    {t:'OSPF Mastery Page',h:'ospf-mastery.html'},
    {t:'Packet Race Game',h:'packet-race.html'},
  ],
  drills:[
    {t:'Quiz 3.1 — Routing Fundamentals',h:'quiz.html?learn=3.1'},
  ],
},
'3.2':{jday:'12',sprint:null,
  videos:[
    {t:'Life of a Packet | Day 12',u:'https://www.youtube.com/watch?v=4YrYV2io3as',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Practical Networking — Packet Traveling Series',u:'https://www.practicalnetworking.net/series/packet-traveling/packet-traveling/'},
    {t:'Study-CCNA — Administrative Distance',u:'https://study-ccna.com/administrative-distance/'},
  ],
  labs:[
    {t:'Packet Race Game',h:'packet-race.html'},
  ],
  drills:[
    {t:'Quiz 3.2 — Packet Forwarding',h:'quiz.html?learn=3.2'},
  ],
},
'3.3':{jday:'11',sprint:[3],
  videos:[
    {t:'Static Routing | Day 11',u:'https://www.youtube.com/watch?v=YCv4-_sMvYE',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — Default Route (Gateway of Last Resort)',u:'https://study-ccna.com/gateway-of-last-resort/'},
  ],
  labs:[
    {t:'Console Lab 07 — Static Routes',h:'console-labs.html'},
  ],
  drills:[
    {t:'Quiz 3.3 — Static Routing',h:'quiz.html?learn=3.3'},
  ],
},
'3.4':{jday:'26-28',sprint:[4,5,6,24],
  videos:[
    {t:'OSPF Part 1 | Day 26',u:'https://www.youtube.com/watch?v=pvuaoJ9YzoI',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Practical Networking — OSPF Overview',u:'https://www.practicalnetworking.net/stand-alone/ospf-overview/'},
    {t:'PacketLife — OSPF Cheat Sheet (PDF)',u:'https://packetlife.net/library/cheat-sheets/'},
  ],
  labs:[
    {t:'OSPF Mastery Page (internal)',h:'ospf-mastery.html'},
    {t:'PT Lab 4 — OSPF Configuration',h:'labs/lab-pt4-ospf.html'},
    {t:'PT Lab 5 — OSPF Break-Fix',h:'labs/lab-pt5-ospf-break-fix.html'},
    {t:'Console Lab 09 — OSPF',h:'console-labs.html'},
    {t:'Wireshark — OSPF Hello/LSA Captures',u:'https://wiki.wireshark.org/samplecaptures'},
  ],
  drills:[
    {t:'Quiz 3.4 — OSPF',h:'quiz.html?learn=3.4'},
    {t:'Crucial Exams — IP Connectivity Domain',u:'https://crucialexams.com/exams/cisco/ccna/200-301/practice-tests-practice-questions'},
  ],
  cisco:[
  ],
},
'3.5':{jday:'29',sprint:[20],
  videos:[
    {t:'First Hop Redundancy Protocols | Day 29',u:'https://www.youtube.com/watch?v=43WnpwQMolo',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — HSRP vs VRRP vs GLBP',u:'https://study-ccna.com/cisco-hsrp-explained/'},
  ],
  labs:[
  ],
  drills:[
    {t:'Quiz 3.5 — FHRP',h:'quiz.html?learn=3.5'},
  ],
},
// ── DOMAIN 2 — Network Access (20%) ───────────────────────────
'2.1':{jday:'16-17',sprint:[8,9],
  videos:[
    {t:'VLANs Part 1 | Day 16',u:'https://www.youtube.com/watch?v=cjFzOnm6u1g',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Practical Networking — VLANs',u:'https://www.practicalnetworking.net/stand-alone/vlans/'},
  ],
  labs:[
    {t:'Console Lab 03-04 — VLANs',h:'console-labs.html'},
    {t:'PT Lab 1 — VLAN Configuration',h:'labs/lab-pt1-vlan.html'},
    {t:'PT Lab 3 — Inter-VLAN Routing',h:'labs/lab-pt3-inter-vlan-routing.html'},
  ],
  drills:[
    {t:'Quiz 2.1 — VLANs',h:'quiz.html?learn=2.1'},
    {t:'Crucial Exams — Network Access Domain',u:'https://crucialexams.com/exams/cisco/ccna/200-301/practice-tests-practice-questions'},
  ],
  cisco:[
  ],
},
'2.2':{jday:'18',sprint:[8],
  videos:[
    {t:'VLANs Part 3 (Trunking) | Day 18',u:'https://www.youtube.com/watch?v=OkPB028l2eE',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — Native VLAN',u:'https://study-ccna.com/native-vlan/'},
  ],
  labs:[
    {t:'Console Lab 05 — Trunking',h:'console-labs.html'},
    {t:'PT Lab 1 — VLANs & Trunks',h:'labs/lab-pt1-vlan.html'},
  ],
  drills:[
    {t:'Quiz 2.2 — Trunking',h:'quiz.html?learn=2.2'},
  ],
},
'2.3':{jday:'36',sprint:null,
  videos:[
    {t:'CDP & LLDP | Day 36',u:'https://www.youtube.com/watch?v=_hnMZBzXRRk',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
  ],
  labs:[
    {t:'Console Lab — show cdp neighbors',h:'console-labs.html'},
  ],
  drills:[
    {t:'Quiz 2.3 — CDP & LLDP',h:'quiz.html?learn=2.3'},
  ],
},
'2.4':{jday:'23',sprint:[10],
  videos:[
    {t:'EtherChannel | Day 23',u:'https://www.youtube.com/watch?v=xuo69Joy_Nc',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Practical Networking — Link Aggregation',u:'https://www.practicalnetworking.net/stand-alone/etherchannel/'},
  ],
  labs:[
    {t:'PT Lab 2 — STP & EtherChannel',h:'labs/lab-pt2-stp-etherchannel.html'},
  ],
  drills:[
    {t:'Quiz 2.4 — EtherChannel',h:'quiz.html?learn=2.4'},
  ],
},
'2.5':{jday:'20-22',sprint:[10],
  videos:[
    {t:'Spanning Tree Protocol Part 1 | Day 20',u:'https://www.youtube.com/watch?v=j-bK-EFt9cY',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Practical Networking — STP Overview',u:'https://www.practicalnetworking.net/stand-alone/spanning-tree-protocol/'},
    {t:'PacketLife — STP Cheat Sheet (PDF)',u:'https://packetlife.net/library/cheat-sheets/'},
  ],
  labs:[
    {t:'PT Lab 2 — STP & EtherChannel',h:'labs/lab-pt2-stp-etherchannel.html'},
    {t:'Wireshark — STP BPDU Captures',u:'https://wiki.wireshark.org/samplecaptures'},
  ],
  drills:[
    {t:'Quiz 2.5 — STP',h:'quiz.html?learn=2.5'},
  ],
},
'2.6':{jday:'56',sprint:[11],
  videos:[
    {t:'Wireless Architectures | Day 56',u:'https://www.youtube.com/watch?v=uX1h0F6wpBY',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — Autonomous vs Lightweight APs',u:'https://study-ccna.com/cisco-wireless-architectures-overview-examples/'},
  ],
  labs:[],
  drills:[
    {t:'Quiz 2.6 — Wireless Architectures',h:'quiz.html?learn=2.6'},
  ],
},
'2.7':{jday:'55',sprint:[11],
  videos:[
    {t:'Wireless Fundamentals | Day 55',u:'https://www.youtube.com/watch?v=zuYiktLqNYQ',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — AP Modes (Local, FlexConnect, Bridge)',u:'https://study-ccna.com/cisco-wireless-architectures-overview-examples/'},
  ],
  labs:[],
  drills:[
    {t:'Quiz 2.7 — WLC & AP Modes',h:'quiz.html?learn=2.7'},
  ],
},
'2.8':{jday:'42',sprint:null,
  videos:[
    {t:'SSH | Day 42',u:'https://www.youtube.com/watch?v=AvgYqI2qSD4',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — Console, Telnet, SSH Access',u:'https://study-ccna.com/telnet-ssh/'},
  ],
  labs:[
    {t:'Console Lab 08 — SSH Configuration',h:'console-labs.html'},
  ],
  drills:[
    {t:'Quiz 2.8 — Device Management',h:'quiz.html?learn=2.8'},
  ],
},
'2.9':{jday:'58',sprint:[11],
  videos:[
    {t:'Wireless Configuration | Day 58',u:'https://www.youtube.com/watch?v=r9o6GFI87go',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — WLAN Configuration',u:'https://study-ccna.com/cisco-wireless-architectures-overview-examples/'},
  ],
  labs:[],
  drills:[
    {t:'Quiz 2.9 — Wireless Configuration',h:'quiz.html?learn=2.9'},
  ],
},
// ── DOMAIN 4 — IP Services (10%) ──────────────────────────────
'4.1':{jday:'44-45',sprint:[16],
  videos:[
    {t:'NAT Part 1 | Day 44',u:'https://www.youtube.com/watch?v=2TZCfTgopeg',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Practical Networking — NAT',u:'https://www.practicalnetworking.net/series/nat/nat/'},
  ],
  labs:[
    {t:'Console Lab 12 — NAT/PAT',h:'console-labs.html'},
    {t:'PT Lab 6 — NAT & DHCP',h:'labs/lab-pt6-nat-dhcp.html'},
  ],
  drills:[
    {t:'Quiz 4.1 — NAT',h:'quiz.html?learn=4.1'},
  ],
  cisco:[
  ],
},
'4.2':{jday:'37',sprint:[17],
  videos:[
    {t:'NTP | Day 37',u:'https://www.youtube.com/watch?v=qGJaJx7OfUo',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
  ],
  labs:[
  ],
  drills:[
    {t:'Quiz 4.2 — NTP',h:'quiz.html?learn=4.2'},
  ],
},
'4.3':{jday:'39',sprint:[16],
  videos:[
    {t:'DHCP | Day 39',u:'https://www.youtube.com/watch?v=hzkleGAC2_Y',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Practical Networking — DHCP',u:'https://www.practicalnetworking.net/series/arp/dhcp/'},
  ],
  labs:[
    {t:'PT Lab 6 — NAT & DHCP',h:'labs/lab-pt6-nat-dhcp.html'},
    {t:'Wireshark — DHCP (DORA) Captures',u:'https://wiki.wireshark.org/samplecaptures'},
  ],
  drills:[
    {t:'Quiz 4.3 — DHCP',h:'quiz.html?learn=4.3'},
  ],
},
'4.4':{jday:'40',sprint:[17],
  videos:[
    {t:'SNMP | Day 40',u:'https://www.youtube.com/watch?v=HXu0Ifj0oWU',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
  ],
  labs:[],
  drills:[
    {t:'Quiz 4.4 — SNMP',h:'quiz.html?learn=4.4'},
  ],
},
'4.5':{jday:'41',sprint:[17],
  videos:[
    {t:'Syslog | Day 41',u:'https://www.youtube.com/watch?v=RaQPSKQ4J5A',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — Syslog Severity Levels',u:'https://study-ccna.com/syslog-explained/'},
  ],
  labs:[],
  drills:[
    {t:'Quiz 4.5 — Syslog',h:'quiz.html?learn=4.5'},
  ],
},
'4.6':{jday:'39',sprint:[16],
  videos:[
    {t:'DHCP (incl. Relay) | Day 39',u:'https://www.youtube.com/watch?v=hzkleGAC2_Y',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — DHCP Relay',u:'https://study-ccna.com/dhcp-relay/'},
  ],
  labs:[
    {t:'PT Lab 6 — NAT & DHCP',h:'labs/lab-pt6-nat-dhcp.html'},
  ],
  drills:[
    {t:'Quiz 4.6 — DHCP Relay',h:'quiz.html?learn=4.6'},
  ],
},
'4.7':{jday:'46-47',sprint:[18],
  videos:[
    {t:'QoS Part 1 | Day 46',u:'https://www.youtube.com/watch?v=H6FKJMiiL6E',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — QoS Mechanisms',u:'https://study-ccna.com/quality-of-service-qos/'},
  ],
  labs:[],
  drills:[
    {t:'Quiz 4.7 — QoS',h:'quiz.html?learn=4.7'},
  ],
},
'4.8':{jday:'42',sprint:[18],
  videos:[
    {t:'SSH | Day 42',u:'https://www.youtube.com/watch?v=AvgYqI2qSD4',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
  ],
  labs:[
    {t:'Console Lab 08 — SSH',h:'console-labs.html'},
  ],
  drills:[
    {t:'Quiz 4.8 — SSH',h:'quiz.html?learn=4.8'},
  ],
},
'4.9':{jday:'43',sprint:[18],
  videos:[
    {t:'FTP & TFTP | Day 43',u:'https://www.youtube.com/watch?v=50hcfsoBf4Q',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — FTP & TFTP',u:'https://study-ccna.com/ftp-tftp/'},
  ],
  labs:[],
  drills:[
    {t:'Quiz 4.9 — FTP & TFTP',h:'quiz.html?learn=4.9'},
  ],
},
// ── DOMAIN 5 — Security Fundamentals (15%) ────────────────────
'5.1':{jday:'48',sprint:[12],
  videos:[
    {t:'Security Fundamentals | Day 48',u:'https://www.youtube.com/watch?v=VvFuieyTTSw',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
  ],
  labs:[],
  drills:[
    {t:'Quiz 5.1 — Security Concepts',h:'quiz.html?learn=5.1'},
    {t:'Crucial Exams — Security Domain',u:'https://crucialexams.com/exams/cisco/ccna/200-301/practice-tests-practice-questions'},
  ],
},
'5.2':{jday:'48',sprint:[12],
  videos:[
    {t:'Security Fundamentals | Day 48',u:'https://www.youtube.com/watch?v=VvFuieyTTSw',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — Security Best Practices',u:'https://study-ccna.com/network-security-overview/'},
  ],
  labs:[],
  drills:[
    {t:'Quiz 5.2 — Security Elements',h:'quiz.html?learn=5.2'},
  ],
},
'5.3':{jday:'4',sprint:[12],
  videos:[
    {t:'Intro to the CLI (Passwords) | Day 4',u:'https://www.youtube.com/watch?v=IYbtai7Nu2g',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — Encrypt Passwords',u:'https://study-ccna.com/encrypt-local-usernames-and-passwords/'},
  ],
  labs:[
    {t:'Console Lab 08 — Password Security',h:'console-labs.html'},
  ],
  drills:[
    {t:'Quiz 5.3 — Password Security',h:'quiz.html?learn=5.3'},
  ],
},
'5.4':{jday:'48-50',sprint:[12],
  videos:[
    {t:'Security Fundamentals | Day 48',u:'https://www.youtube.com/watch?v=VvFuieyTTSw',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
  ],
  labs:[],
  drills:[
    {t:'Quiz 5.4 — Layer 2 Security',h:'quiz.html?learn=5.4'},
  ],
},
'5.5':{jday:'53',sprint:null,
  videos:[
    {t:'WAN Architectures (VPN) | Day 53',u:'https://www.youtube.com/watch?v=BW3fQgdf4-w',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — IPsec VPN',u:'https://study-ccna.com/cisco-vpn-what-is-vpn/'},
  ],
  labs:[],
  drills:[
    {t:'Quiz 5.5 — VPNs',h:'quiz.html?learn=5.5'},
  ],
},
'5.6':{jday:'34-35',sprint:[13],
  videos:[
    {t:'Standard ACLs | Day 34',u:'https://www.youtube.com/watch?v=z023_eRUtSo',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Practical Networking — ACL Overview',u:'https://www.practicalnetworking.net/stand-alone/acl-overview/'},
  ],
  labs:[
    {t:'Console Lab 10 — ACLs',h:'console-labs.html'},
    {t:'PT Lab 7 — ACLs & Port Security',h:'labs/lab-pt7-acl-portsec.html'},
  ],
  drills:[
    {t:'Quiz 5.6 — ACLs',h:'quiz.html?learn=5.6'},
  ],
  cisco:[
  ],
},
'5.7':{jday:'49',sprint:[15],
  videos:[
    {t:'Port Security | Day 49',u:'https://www.youtube.com/watch?v=sHN3jOJIido',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — Port Security',u:'https://study-ccna.com/port-security/'},
  ],
  labs:[
    {t:'Console Lab 11 — Port Security',h:'console-labs.html'},
    {t:'PT Lab 7 — ACLs & Port Security',h:'labs/lab-pt7-acl-portsec.html'},
  ],
  drills:[
    {t:'Quiz 5.7 — Port Security',h:'quiz.html?learn=5.7'},
  ],
},
'5.8':{jday:'48',sprint:null,
  videos:[
    {t:'Security Fundamentals (AAA) | Day 48',u:'https://www.youtube.com/watch?v=VvFuieyTTSw',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — AAA',u:'https://study-ccna.com/aaa/'},
  ],
  labs:[],
  drills:[
    {t:'Quiz 5.8 — AAA',h:'quiz.html?learn=5.8'},
  ],
},
'5.9':{jday:'57',sprint:null,
  videos:[
    {t:'Wireless Security | Day 57',u:'https://www.youtube.com/watch?v=wHXKo9So5y8',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — WPA2 & WPA3',u:'https://study-ccna.com/wifi-security/'},
  ],
  labs:[],
  drills:[
    {t:'Quiz 5.9 — Wireless Security',h:'quiz.html?learn=5.9'},
  ],
},
'5.10':{jday:'58',sprint:null,
  videos:[
    {t:'Wireless Configuration | Day 58',u:'https://www.youtube.com/watch?v=r9o6GFI87go',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — WPA2 PSK Configuration',u:'https://study-ccna.com/wifi-security/'},
  ],
  labs:[],
  drills:[
    {t:'Quiz 5.10 — Wireless Config Security',h:'quiz.html?learn=5.10'},
  ],
},
// ── DOMAIN 6 — Automation & Programmability (10%) ─────────────
'6.1':{jday:'59',sprint:[19],
  videos:[
    {t:'Intro to Network Automation | Day 59',u:'https://www.youtube.com/watch?v=4tsBgMCPVuc',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
  ],
  labs:[],
  drills:[
    {t:'Quiz 6.1 — Automation Concepts',h:'quiz.html?learn=6.1'},
    {t:'Crucial Exams — Automation Domain',u:'https://crucialexams.com/exams/cisco/ccna/200-301/practice-tests-practice-questions'},
  ],
},
'6.2':{jday:'62',sprint:[19],
  videos:[
    {t:'Software-Defined Networking | Day 62',u:'https://www.youtube.com/watch?v=7HhWCeXDTpA',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — SDN',u:'https://study-ccna.com/cisco-sdn-software-defined-networking/'},
  ],
  labs:[],
  drills:[
    {t:'Quiz 6.2 — SDN Concepts',h:'quiz.html?learn=6.2'},
  ],
},
'6.3':{jday:'62',sprint:[19],
  videos:[
    {t:'Software-Defined Networking | Day 62',u:'https://www.youtube.com/watch?v=7HhWCeXDTpA',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — SDN Architecture',u:'https://study-ccna.com/cisco-sdn-software-defined-networking/'},
  ],
  labs:[],
  drills:[
    {t:'Quiz 6.3 — SDN Architecture',h:'quiz.html?learn=6.3'},
  ],
},
'6.4':{jday:'59',sprint:[19],
  videos:[
    {t:'AI & Machine Learning | Day 59',u:'https://www.youtube.com/watch?v=Fn_kAv35W5A',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — AI & ML in Networking (v1.1)',u:'https://study-ccna.com/network-automation/'},
  ],
  labs:[],
  drills:[
    {t:'Quiz 6.4 — AI & ML',h:'quiz.html?learn=6.4'},
  ],
},
'6.5':{jday:'61',sprint:[19],
  videos:[
    {t:'REST APIs | Day 61',u:'https://www.youtube.com/watch?v=Luei0p-2h10',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — REST APIs',u:'https://study-ccna.com/soap-vs-rest-web-api-services/'},
    {t:'Cisco — DevNet API Documentation',u:'https://developer.cisco.com/docs/'},
  ],
  labs:[
    {t:'PT Lab 8 — JSON & API',h:'labs/lab-pt8-json-api.html'},
  ],
  drills:[
    {t:'Quiz 6.5 — REST APIs',h:'quiz.html?learn=6.5'},
  ],
},
'6.6':{jday:'63',sprint:[19],
  videos:[
    {t:'Ansible, Puppet, & Chef | Day 63',u:'https://www.youtube.com/watch?v=Kog9gHTjALI',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — Ansible, Puppet, Chef',u:'https://study-ccna.com/configuration-management-tools-ansible-chef-puppet/'},
    {t:'Cisco — Automation with Ansible',u:'https://developer.cisco.com/automation-ansible/'},
  ],
  labs:[],
  drills:[
    {t:'Quiz 6.6 — Config Management',h:'quiz.html?learn=6.6'},
  ],
},
'6.7':{jday:'60',sprint:[19],
  videos:[
    {t:'JSON, XML, & YAML | Day 60',u:'https://www.youtube.com/watch?v=nohde2-QNJ4',ch:"Jeremy's IT Lab"},
  ],
  extra_articles:[
    {t:'Study-CCNA — Data Serialization Formats',u:'https://study-ccna.com/data-serialization-formats-json-yaml-xml/'},
  ],
  labs:[
    {t:'PT Lab 8 — JSON & API',h:'labs/lab-pt8-json-api.html'},
  ],
  drills:[
    {t:'Quiz 6.7 — JSON, XML, YAML',h:'quiz.html?learn=6.7'},
  ],
},
};
// Merge enriched data into RES
Object.keys(RES_EXTRA).forEach(function(k) {
  if (!RES[k]) return;
  var e = RES_EXTRA[k];
  if (e.videos) RES[k].videos = e.videos;
  if (e.extra_articles) RES[k].articles = (RES[k].articles || []).concat(e.extra_articles);
  if (e.labs) RES[k].labs = e.labs;
  if (e.drills) RES[k].drills = e.drills;
  if (e.jday) RES[k].jday = e.jday;
  if (e.sprint) RES[k].sprint = e.sprint;
  if (e.cisco) RES[k].cisco = e.cisco;
});

  window.topicResources = RES;
})();
