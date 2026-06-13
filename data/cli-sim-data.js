// CLI Simulator decks. Generated + accuracy-critiqued (118 items, 6-agent build). Read/subnet answers DERIVED by the engine.
window.CLI_SIM_ITEMS = [
 {
  "id": "cli:vlan:cfg:1",
  "deck": "vlan",
  "kind": "config",
  "prompt": "SW1(config)#",
  "goal": "Make VLAN 10 and name it SALES.",
  "context": null,
  "steps": [
   {
    "label": "create vlan 10",
    "accept": [
     "vlan 10"
    ],
    "canonical": "vlan 10"
   },
   {
    "label": "name it SALES",
    "accept": [
     "name sales",
     "name SALES"
    ],
    "canonical": "name SALES"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "vlan 10 name sales",
    "hint": "Name goes on its own line in vlan config mode."
   }
  ]
 },
 {
  "id": "cli:vlan:cfg:2",
  "deck": "vlan",
  "kind": "config",
  "prompt": "SW1(config)#",
  "goal": "Put port Gi0/1 in VLAN 10 as a host access port.",
  "context": null,
  "steps": [
   {
    "label": "select the port",
    "accept": [
     "interface gigabitethernet0/1"
    ],
    "canonical": "interface gigabitethernet0/1"
   },
   {
    "label": "set access mode",
    "accept": [
     "switchport mode access"
    ],
    "canonical": "switchport mode access"
   },
   {
    "label": "assign vlan 10",
    "accept": [
     "switchport access vlan 10"
    ],
    "canonical": "switchport access vlan 10"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "switchport access vlan 10",
    "hint": "Set the mode to access first, then assign the VLAN."
   }
  ]
 },
 {
  "id": "cli:vlan:cfg:3",
  "deck": "vlan",
  "kind": "config",
  "prompt": "SW1(config)#",
  "goal": "Turn Gi0/24 into an 802.1Q trunk with native VLAN 99.",
  "context": null,
  "steps": [
   {
    "label": "select uplink",
    "accept": [
     "interface gigabitethernet0/24"
    ],
    "canonical": "interface gigabitethernet0/24"
   },
   {
    "label": "force trunk mode",
    "accept": [
     "switchport mode trunk"
    ],
    "canonical": "switchport mode trunk"
   },
   {
    "label": "set native vlan 99",
    "accept": [
     "switchport trunk native vlan 99"
    ],
    "canonical": "switchport trunk native vlan 99"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "switchport trunk encapsulation dot1q",
    "hint": "A 2960 only does dot1q, so there is no encapsulation command here."
   }
  ]
 },
 {
  "id": "cli:vlan:cfg:4",
  "deck": "vlan",
  "kind": "config",
  "prompt": "SW1(config)#",
  "goal": "On trunk Gi0/24 allow only VLANs 10, 20, and 99.",
  "context": null,
  "steps": [
   {
    "label": "select trunk",
    "accept": [
     "interface gigabitethernet0/24"
    ],
    "canonical": "interface gigabitethernet0/24"
   },
   {
    "label": "force trunk mode",
    "accept": [
     "switchport mode trunk"
    ],
    "canonical": "switchport mode trunk"
   },
   {
    "label": "limit allowed list",
    "accept": [
     "switchport trunk allowed vlan 10,20,99"
    ],
    "canonical": "switchport trunk allowed vlan 10,20,99"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "switchport trunk allowed vlan add 10,20,99",
    "hint": "Use add only to extend an existing list; here you are setting it fresh."
   }
  ]
 },
 {
  "id": "cli:vlan:cfg:5",
  "deck": "vlan",
  "kind": "config",
  "prompt": "SW1(config)#",
  "goal": "Set the management IP on VLAN 1 to 192.168.1.2 /24.",
  "context": null,
  "steps": [
   {
    "label": "enter svi vlan 1",
    "accept": [
     "interface vlan1"
    ],
    "canonical": "interface vlan1"
   },
   {
    "label": "set the ip",
    "accept": [
     "ip address 192.168.1.2 255.255.255.0"
    ],
    "canonical": "ip address 192.168.1.2 255.255.255.0"
   },
   {
    "label": "bring it up",
    "accept": [
     "no shutdown"
    ],
    "canonical": "no shutdown"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "interface gigabitethernet0/1",
    "hint": "Management IP lives on the VLAN SVI, not a physical port."
   }
  ]
 },
 {
  "id": "cli:vlan:cfg:6",
  "deck": "vlan",
  "kind": "config",
  "prompt": "SW1(config)#",
  "goal": "Set Gi0/2 to negotiate a trunk dynamically (DTP desirable).",
  "context": null,
  "steps": [
   {
    "label": "select the port",
    "accept": [
     "interface gigabitethernet0/2"
    ],
    "canonical": "interface gigabitethernet0/2"
   },
   {
    "label": "dynamic desirable",
    "accept": [
     "switchport mode dynamic desirable"
    ],
    "canonical": "switchport mode dynamic desirable"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "switchport mode trunk",
    "hint": "That forces a static trunk; the goal is to negotiate via DTP."
   }
  ]
 },
 {
  "id": "cli:vlan:cfg:7",
  "deck": "vlan",
  "kind": "fix",
  "prompt": "SW1(config)#",
  "goal": "Gi0/1 was set to access but assigned the wrong VLAN. It should be VLAN 20, not VLAN 10.",
  "context": "interface gigabitethernet0/1\n switchport mode access\n switchport access vlan 10",
  "steps": [
   {
    "label": "select the port",
    "accept": [
     "interface gigabitethernet0/1"
    ],
    "canonical": "interface gigabitethernet0/1"
   },
   {
    "label": "reassign to vlan 20",
    "accept": [
     "switchport access vlan 20"
    ],
    "canonical": "switchport access vlan 20"
   }
  ],
  "forbid": [
   "switchport access vlan 10"
  ],
  "wrongIfTyped": [
   {
    "line": "no switchport access vlan 10",
    "hint": "Just reassign VLAN 20; the new value overwrites the old one."
   }
  ]
 },
 {
  "id": "cli:vlan:cfg:8",
  "deck": "vlan",
  "kind": "fix",
  "prompt": "SW1(config)#",
  "goal": "The uplink Gi0/24 should be a trunk, but it is stuck in access mode so only one VLAN crosses it.",
  "context": "interface gigabitethernet0/24\n switchport mode access\n switchport access vlan 10",
  "steps": [
   {
    "label": "select the uplink",
    "accept": [
     "interface gigabitethernet0/24"
    ],
    "canonical": "interface gigabitethernet0/24"
   },
   {
    "label": "switch to trunk mode",
    "accept": [
     "switchport mode trunk"
    ],
    "canonical": "switchport mode trunk"
   }
  ],
  "forbid": [
   "switchport mode access"
  ],
  "wrongIfTyped": [
   {
    "line": "switchport trunk encapsulation dot1q",
    "hint": "No encapsulation command on a 2960; just set the mode to trunk."
   }
  ]
 },
 {
  "id": "cli:vlan:cfg:9",
  "deck": "vlan",
  "kind": "fix",
  "prompt": "SW1(config)#",
  "goal": "Native VLAN mismatch: this trunk uses native VLAN 1 but the other end uses 99. Match it to 99.",
  "context": "interface gigabitethernet0/24\n switchport mode trunk\n switchport trunk native vlan 1",
  "steps": [
   {
    "label": "select the trunk",
    "accept": [
     "interface gigabitethernet0/24"
    ],
    "canonical": "interface gigabitethernet0/24"
   },
   {
    "label": "set native vlan 99",
    "accept": [
     "switchport trunk native vlan 99"
    ],
    "canonical": "switchport trunk native vlan 99"
   }
  ],
  "forbid": [
   "switchport trunk native vlan 1"
  ],
  "wrongIfTyped": [
   {
    "line": "switchport access vlan 99",
    "hint": "This is a trunk; fix the native VLAN, not an access VLAN."
   }
  ]
 },
 {
  "id": "cli:acl:cfg:1",
  "deck": "acl",
  "kind": "config",
  "prompt": "R1(config)#",
  "goal": "Standard ACL 10: permit only the 192.168.1.0 /24 hosts.",
  "context": null,
  "steps": [
   {
    "label": "permit the subnet",
    "accept": [
     "access-list 10 permit 192.168.1.0 0.0.0.255"
    ],
    "canonical": "access-list 10 permit 192.168.1.0 0.0.0.255"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "access-list 10 permit 192.168.1.0 255.255.255.0",
    "hint": "ACLs use a wildcard mask, not a subnet mask: 0.0.0.255."
   }
  ]
 },
 {
  "id": "cli:acl:cfg:2",
  "deck": "acl",
  "kind": "config",
  "prompt": "R1(config)#",
  "goal": "Apply standard ACL 10 outbound on Gi0/1, near the destination.",
  "context": null,
  "steps": [
   {
    "label": "select the port",
    "accept": [
     "interface gigabitethernet0/1"
    ],
    "canonical": "interface gigabitethernet0/1"
   },
   {
    "label": "apply outbound",
    "accept": [
     "ip access-group 10 out"
    ],
    "canonical": "ip access-group 10 out"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "ip access-group 10 in",
    "hint": "A standard ACL sits near the destination, so apply it outbound here."
   }
  ]
 },
 {
  "id": "cli:acl:cfg:3",
  "deck": "acl",
  "kind": "config",
  "prompt": "R1(config)#",
  "goal": "Extended ACL 110: permit host 10.1.1.5 to reach any web (HTTPS) server.",
  "context": null,
  "steps": [
   {
    "label": "permit tcp to 443",
    "accept": [
     "access-list 110 permit tcp host 10.1.1.5 any eq 443",
     "access-list 110 permit tcp host 10.1.1.5 any eq https"
    ],
    "canonical": "access-list 110 permit tcp host 10.1.1.5 any eq 443"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "access-list 110 permit ip host 10.1.1.5 any eq 443",
    "hint": "Port matching needs a transport protocol; use tcp, not ip."
   }
  ]
 },
 {
  "id": "cli:acl:cfg:4",
  "deck": "acl",
  "kind": "config",
  "prompt": "R1(config)#",
  "goal": "Apply extended ACL 110 inbound on Gi0/0, near the source.",
  "context": null,
  "steps": [
   {
    "label": "select source port",
    "accept": [
     "interface gigabitethernet0/0"
    ],
    "canonical": "interface gigabitethernet0/0"
   },
   {
    "label": "apply inbound",
    "accept": [
     "ip access-group 110 in"
    ],
    "canonical": "ip access-group 110 in"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "ip access-group 110 out",
    "hint": "An extended ACL goes near the source, so apply it inbound here."
   }
  ]
 },
 {
  "id": "cli:acl:cfg:5",
  "deck": "acl",
  "kind": "config",
  "prompt": "R1(config)#",
  "goal": "Build named extended ACL BLOCK_TELNET: deny telnet from any to host 10.0.0.1, permit everything else.",
  "context": null,
  "steps": [
   {
    "label": "open named acl",
    "accept": [
     "ip access-list extended block_telnet",
     "ip access-list extended BLOCK_TELNET"
    ],
    "canonical": "ip access-list extended BLOCK_TELNET"
   },
   {
    "label": "deny telnet to host",
    "accept": [
     "deny tcp any host 10.0.0.1 eq 23",
     "deny tcp any host 10.0.0.1 eq telnet"
    ],
    "canonical": "deny tcp any host 10.0.0.1 eq 23"
   },
   {
    "label": "permit the rest",
    "accept": [
     "permit ip any any"
    ],
    "canonical": "permit ip any any"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "deny tcp any host 10.0.0.1 eq 22",
    "hint": "Telnet is port 23; port 22 is SSH."
   }
  ]
 },
 {
  "id": "cli:acl:cfg:6",
  "deck": "acl",
  "kind": "config",
  "prompt": "R1(config)#",
  "goal": "Named standard ACL MGMT_ONLY: permit host 172.16.5.10, then permit the 172.16.5.0 /24 net.",
  "context": null,
  "steps": [
   {
    "label": "open named acl",
    "accept": [
     "ip access-list standard mgmt_only",
     "ip access-list standard MGMT_ONLY"
    ],
    "canonical": "ip access-list standard MGMT_ONLY"
   },
   {
    "label": "permit the host",
    "accept": [
     "permit host 172.16.5.10"
    ],
    "canonical": "permit host 172.16.5.10"
   },
   {
    "label": "permit the subnet",
    "accept": [
     "permit 172.16.5.0 0.0.0.255"
    ],
    "canonical": "permit 172.16.5.0 0.0.0.255"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "permit 172.16.5.10 0.0.0.0",
    "hint": "That works, but the host keyword is the cleaner standard form."
   }
  ]
 },
 {
  "id": "cli:acl:cfg:7",
  "deck": "acl",
  "kind": "fix",
  "prompt": "R1(config)#",
  "goal": "Wrong mask type: this standard ACL used a subnet mask instead of a wildcard. Fix line for 192.168.1.0 /24.",
  "context": "access-list 10 permit 192.168.1.0 255.255.255.0",
  "steps": [
   {
    "label": "permit with wildcard",
    "accept": [
     "access-list 10 permit 192.168.1.0 0.0.0.255"
    ],
    "canonical": "access-list 10 permit 192.168.1.0 0.0.0.255"
   }
  ],
  "forbid": [
   "access-list 10 permit 192.168.1.0 255.255.255.0"
  ],
  "wrongIfTyped": [
   {
    "line": "access-list 10 permit 192.168.1.0 0.0.0.0",
    "hint": "0.0.0.0 matches one host; a /24 needs wildcard 0.0.0.255."
   }
  ]
 },
 {
  "id": "cli:acl:cfg:8",
  "deck": "acl",
  "kind": "fix",
  "prompt": "R1(config)#",
  "goal": "Wrong direction: standard ACL 10 was applied inbound on Gi0/1. It belongs outbound near the destination.",
  "context": "interface gigabitethernet0/1\n ip access-group 10 in",
  "steps": [
   {
    "label": "select the port",
    "accept": [
     "interface gigabitethernet0/1"
    ],
    "canonical": "interface gigabitethernet0/1"
   },
   {
    "label": "remove inbound",
    "accept": [
     "no ip access-group 10 in"
    ],
    "canonical": "no ip access-group 10 in"
   },
   {
    "label": "apply outbound",
    "accept": [
     "ip access-group 10 out"
    ],
    "canonical": "ip access-group 10 out"
   }
  ],
  "forbid": [
   "ip access-group 10 in"
  ],
  "wrongIfTyped": [
   {
    "line": "ip access-group 10 out",
    "hint": "Pull the old inbound apply first, then re-apply outbound."
   }
  ]
 },
 {
  "id": "cli:acl:cfg:9",
  "deck": "acl",
  "kind": "fix",
  "prompt": "R1(config)#",
  "goal": "Wrong placement: extended ACL 110 was applied far from the source on Gi0/1 outbound. Move it to the source port Gi0/0 inbound.",
  "context": "interface gigabitethernet0/1\n ip access-group 110 out",
  "steps": [
   {
    "label": "remove wrong apply",
    "accept": [
     "interface gigabitethernet0/1"
    ],
    "canonical": "interface gigabitethernet0/1"
   },
   {
    "label": "pull it off",
    "accept": [
     "no ip access-group 110 out"
    ],
    "canonical": "no ip access-group 110 out"
   },
   {
    "label": "go to source port",
    "accept": [
     "interface gigabitethernet0/0"
    ],
    "canonical": "interface gigabitethernet0/0"
   },
   {
    "label": "apply inbound",
    "accept": [
     "ip access-group 110 in"
    ],
    "canonical": "ip access-group 110 in"
   }
  ],
  "forbid": [
   "ip access-group 110 out"
  ],
  "wrongIfTyped": [
   {
    "line": "ip access-group 110 in",
    "hint": "First remove the wrong apply on Gi0/1, then apply inbound on Gi0/0."
   }
  ]
 },
 {
  "id": "cli:ospf:cfg:1",
  "deck": "ospf",
  "kind": "config",
  "prompt": "R1(config)#",
  "goal": "Start OSPF process 1 and advertise the LAN 10.1.1.0/24 in area 0.",
  "context": null,
  "steps": [
   {
    "label": "start ospf process 1",
    "accept": [
     "router ospf 1"
    ],
    "canonical": "router ospf 1"
   },
   {
    "label": "advertise the LAN in area 0",
    "accept": [
     "network 10.1.1.0 0.0.0.255 area 0"
    ],
    "canonical": "network 10.1.1.0 0.0.0.255 area 0"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "network 10.1.1.0 255.255.255.0 area 0",
    "hint": "OSPF network uses a wildcard mask, not a subnet mask."
   }
  ]
 },
 {
  "id": "cli:ospf:cfg:2",
  "deck": "ospf",
  "kind": "config",
  "prompt": "R1(config)#",
  "goal": "Run OSPF on the WAN 192.168.12.0/30 in area 0 and set this router-id to 1.1.1.1.",
  "context": null,
  "steps": [
   {
    "label": "start ospf process 1",
    "accept": [
     "router ospf 1"
    ],
    "canonical": "router ospf 1"
   },
   {
    "label": "set the router-id",
    "accept": [
     "router-id 1.1.1.1"
    ],
    "canonical": "router-id 1.1.1.1"
   },
   {
    "label": "advertise the WAN in area 0",
    "accept": [
     "network 192.168.12.0 0.0.0.3 area 0"
    ],
    "canonical": "network 192.168.12.0 0.0.0.3 area 0"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "network 192.168.12.0 0.0.0.255 area 0",
    "hint": "A /30 wildcard is 0.0.0.3, not 0.0.0.255."
   }
  ]
 },
 {
  "id": "cli:ospf:cfg:3",
  "deck": "ospf",
  "kind": "config",
  "prompt": "R1(config)#",
  "goal": "Advertise both interfaces and make the LAN interface Gi0/1 passive so no hellos leave it.",
  "context": null,
  "steps": [
   {
    "label": "start ospf process 1",
    "accept": [
     "router ospf 1"
    ],
    "canonical": "router ospf 1"
   },
   {
    "label": "advertise the LAN",
    "accept": [
     "network 10.1.1.0 0.0.0.255 area 0"
    ],
    "canonical": "network 10.1.1.0 0.0.0.255 area 0"
   },
   {
    "label": "make the LAN port passive",
    "accept": [
     "passive-interface gigabitethernet0/1"
    ],
    "canonical": "passive-interface gigabitethernet0/1"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "passive-interface default",
    "hint": "That silences every interface. Here you only want Gi0/1 passive."
   }
  ]
 },
 {
  "id": "cli:ospf:cfg:4",
  "deck": "ospf",
  "kind": "config",
  "prompt": "R1(config)#",
  "goal": "Force R1 to win the DR election on Gi0/0 by raising its OSPF interface priority to 200.",
  "context": null,
  "steps": [
   {
    "label": "enter the interface",
    "accept": [
     "interface gigabitethernet0/0"
    ],
    "canonical": "interface gigabitethernet0/0"
   },
   {
    "label": "raise the ospf priority",
    "accept": [
     "ip ospf priority 200"
    ],
    "canonical": "ip ospf priority 200"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "ip ospf priority 0",
    "hint": "Priority 0 makes it never become DR. Higher priority wins, so go up not down."
   }
  ]
 },
 {
  "id": "cli:ospf:cfg:5",
  "deck": "ospf",
  "kind": "config",
  "prompt": "R1(config)#",
  "goal": "Originate a default route into OSPF for the stub site (R1 has its own default route already).",
  "context": null,
  "steps": [
   {
    "label": "start ospf process 1",
    "accept": [
     "router ospf 1"
    ],
    "canonical": "router ospf 1"
   },
   {
    "label": "push a default route to neighbors",
    "accept": [
     "default-information originate"
    ],
    "canonical": "default-information originate"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "network 0.0.0.0 0.0.0.0 area 0",
    "hint": "You do not advertise 0.0.0.0 with a network statement. Use default-information originate."
   }
  ]
 },
 {
  "id": "cli:ospf:fix:1",
  "deck": "ospf",
  "kind": "fix",
  "prompt": "R1(config)#",
  "goal": "The neighbor on 192.168.12.0/30 never comes up. Fix the wildcard so the WAN is actually advertised.",
  "context": "router ospf 1\n network 192.168.12.0 255.255.255.252 area 0",
  "steps": [
   {
    "label": "start ospf process 1",
    "accept": [
     "router ospf 1"
    ],
    "canonical": "router ospf 1"
   },
   {
    "label": "advertise WAN with correct wildcard",
    "accept": [
     "network 192.168.12.0 0.0.0.3 area 0"
    ],
    "canonical": "network 192.168.12.0 0.0.0.3 area 0"
   }
  ],
  "forbid": [
   "network 192.168.12.0 255.255.255.252 area 0"
  ],
  "wrongIfTyped": [
   {
    "line": "network 192.168.12.0 0.0.0.255 area 0",
    "hint": "Right idea, wrong size. A /30 is 0.0.0.3."
   }
  ]
 },
 {
  "id": "cli:ospf:fix:2",
  "deck": "ospf",
  "kind": "fix",
  "prompt": "R1(config)#",
  "goal": "Two routers will not form an adjacency. They were put in different areas. Put R1's WAN link back in area 0.",
  "context": "router ospf 1\n network 192.168.12.0 0.0.0.3 area 1",
  "steps": [
   {
    "label": "start ospf process 1",
    "accept": [
     "router ospf 1"
    ],
    "canonical": "router ospf 1"
   },
   {
    "label": "advertise WAN in area 0",
    "accept": [
     "network 192.168.12.0 0.0.0.3 area 0"
    ],
    "canonical": "network 192.168.12.0 0.0.0.3 area 0"
   }
  ],
  "forbid": [
   "network 192.168.12.0 0.0.0.3 area 1"
  ],
  "wrongIfTyped": []
 },
 {
  "id": "cli:ospf:fix:3",
  "deck": "ospf",
  "kind": "fix",
  "prompt": "R1(config)#",
  "goal": "Hellos are leaking out the LAN and a rogue router formed an adjacency. Make Gi0/1 passive again.",
  "context": "router ospf 1\n network 10.1.1.0 0.0.0.255 area 0\n no passive-interface gigabitethernet0/1",
  "steps": [
   {
    "label": "start ospf process 1",
    "accept": [
     "router ospf 1"
    ],
    "canonical": "router ospf 1"
   },
   {
    "label": "make the LAN port passive",
    "accept": [
     "passive-interface gigabitethernet0/1"
    ],
    "canonical": "passive-interface gigabitethernet0/1"
   }
  ],
  "forbid": [
   "no passive-interface gigabitethernet0/1"
  ],
  "wrongIfTyped": []
 },
 {
  "id": "cli:l2sec:cfg:1",
  "deck": "l2sec",
  "kind": "config",
  "prompt": "S1(config)#",
  "goal": "On access port Fa0/1 turn on port-security, allow max 2 MACs, and sticky-learn them.",
  "context": null,
  "steps": [
   {
    "label": "enter the access port",
    "accept": [
     "interface fastethernet0/1"
    ],
    "canonical": "interface fastethernet0/1"
   },
   {
    "label": "set the port to access mode",
    "accept": [
     "switchport mode access"
    ],
    "canonical": "switchport mode access"
   },
   {
    "label": "turn on port-security",
    "accept": [
     "switchport port-security"
    ],
    "canonical": "switchport port-security"
   },
   {
    "label": "allow up to 2 MACs",
    "accept": [
     "switchport port-security maximum 2"
    ],
    "canonical": "switchport port-security maximum 2"
   },
   {
    "label": "sticky-learn the MACs",
    "accept": [
     "switchport port-security mac-address sticky"
    ],
    "canonical": "switchport port-security mac-address sticky"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "switchport port-security violation protect",
    "hint": "Default violation mode (shutdown) is fine here. The goal did not ask to change it."
   }
  ]
 },
 {
  "id": "cli:l2sec:cfg:2",
  "deck": "l2sec",
  "kind": "config",
  "prompt": "S1(config)#",
  "goal": "Set port-security on Fa0/2 to drop offending frames and log, without shutting the port (restrict mode).",
  "context": null,
  "steps": [
   {
    "label": "enter the access port",
    "accept": [
     "interface fastethernet0/2"
    ],
    "canonical": "interface fastethernet0/2"
   },
   {
    "label": "set the port to access mode",
    "accept": [
     "switchport mode access"
    ],
    "canonical": "switchport mode access"
   },
   {
    "label": "turn on port-security",
    "accept": [
     "switchport port-security"
    ],
    "canonical": "switchport port-security"
   },
   {
    "label": "set violation to restrict",
    "accept": [
     "switchport port-security violation restrict"
    ],
    "canonical": "switchport port-security violation restrict"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "switchport port-security violation shutdown",
    "hint": "Shutdown err-disables the port. Restrict drops and logs but keeps the port up."
   }
  ]
 },
 {
  "id": "cli:l2sec:cfg:3",
  "deck": "l2sec",
  "kind": "config",
  "prompt": "S1(config)#",
  "goal": "Turn on DHCP snooping globally and for VLAN 10, then trust the uplink Gi0/1 toward the real DHCP server.",
  "context": null,
  "steps": [
   {
    "label": "enable dhcp snooping globally",
    "accept": [
     "ip dhcp snooping"
    ],
    "canonical": "ip dhcp snooping"
   },
   {
    "label": "enable snooping on vlan 10",
    "accept": [
     "ip dhcp snooping vlan 10"
    ],
    "canonical": "ip dhcp snooping vlan 10"
   },
   {
    "label": "enter the uplink",
    "accept": [
     "interface gigabitethernet0/1"
    ],
    "canonical": "interface gigabitethernet0/1"
   },
   {
    "label": "trust the uplink",
    "accept": [
     "ip dhcp snooping trust"
    ],
    "canonical": "ip dhcp snooping trust"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "ip dhcp snooping trust",
    "hint": "Trust is an interface command. Enter the uplink interface first, then trust it (this distractor applies at the global prompt)."
   }
  ]
 },
 {
  "id": "cli:l2sec:cfg:4",
  "deck": "l2sec",
  "kind": "config",
  "prompt": "S1(config)#",
  "goal": "On host access port Fa0/3 speed up STP with PortFast and protect it with BPDU Guard.",
  "context": null,
  "steps": [
   {
    "label": "enter the access port",
    "accept": [
     "interface fastethernet0/3"
    ],
    "canonical": "interface fastethernet0/3"
   },
   {
    "label": "set the port to access mode",
    "accept": [
     "switchport mode access"
    ],
    "canonical": "switchport mode access"
   },
   {
    "label": "enable portfast",
    "accept": [
     "spanning-tree portfast"
    ],
    "canonical": "spanning-tree portfast"
   },
   {
    "label": "enable bpdu guard",
    "accept": [
     "spanning-tree bpduguard enable"
    ],
    "canonical": "spanning-tree bpduguard enable"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "spanning-tree portfast trunk",
    "hint": "This is a host access port, so plain spanning-tree portfast, not the trunk variant."
   }
  ]
 },
 {
  "id": "cli:l2sec:cfg:5",
  "deck": "l2sec",
  "kind": "config",
  "prompt": "S1(config)#",
  "goal": "Set the DHCP snooping rate limit to 10 packets per second on the access port Fa0/4.",
  "context": null,
  "steps": [
   {
    "label": "enter the access port",
    "accept": [
     "interface fastethernet0/4"
    ],
    "canonical": "interface fastethernet0/4"
   },
   {
    "label": "set the snooping rate limit",
    "accept": [
     "ip dhcp snooping limit rate 10"
    ],
    "canonical": "ip dhcp snooping limit rate 10"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "ip dhcp snooping trust",
    "hint": "An access port toward hosts stays untrusted. You only want a rate limit here."
   }
  ]
 },
 {
  "id": "cli:l2sec:fix:1",
  "deck": "l2sec",
  "kind": "fix",
  "prompt": "S1(config)#",
  "goal": "Sticky MACs are not being learned on Fa0/1. Port-security was never actually enabled. Turn it on.",
  "context": "interface fastethernet0/1\n switchport mode access\n switchport port-security maximum 2\n switchport port-security mac-address sticky",
  "steps": [
   {
    "label": "enter the access port",
    "accept": [
     "interface fastethernet0/1"
    ],
    "canonical": "interface fastethernet0/1"
   },
   {
    "label": "actually enable port-security",
    "accept": [
     "switchport port-security"
    ],
    "canonical": "switchport port-security"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "switchport port-security maximum 2",
    "hint": "That line is already there. The missing line is the bare switchport port-security that turns the feature on."
   }
  ]
 },
 {
  "id": "cli:l2sec:fix:2",
  "deck": "l2sec",
  "kind": "fix",
  "prompt": "S1(config)#",
  "goal": "DHCP snooping is dropping all offers because the server uplink Gi0/1 is untrusted. Trust it.",
  "context": "ip dhcp snooping\nip dhcp snooping vlan 10\ninterface gigabitethernet0/1\n no ip dhcp snooping trust",
  "steps": [
   {
    "label": "enter the uplink",
    "accept": [
     "interface gigabitethernet0/1"
    ],
    "canonical": "interface gigabitethernet0/1"
   },
   {
    "label": "trust the server uplink",
    "accept": [
     "ip dhcp snooping trust"
    ],
    "canonical": "ip dhcp snooping trust"
   }
  ],
  "forbid": [
   "no ip dhcp snooping trust"
  ],
  "wrongIfTyped": []
 },
 {
  "id": "cli:l2sec:fix:3",
  "deck": "l2sec",
  "kind": "fix",
  "prompt": "S1(config)#",
  "goal": "A host PortFast port keeps err-disabling on boot. The config wrongly applied portfast trunk. Make it a plain access PortFast port.",
  "context": "interface fastethernet0/3\n switchport mode access\n spanning-tree portfast trunk\n spanning-tree bpduguard enable",
  "steps": [
   {
    "label": "enter the access port",
    "accept": [
     "interface fastethernet0/3"
    ],
    "canonical": "interface fastethernet0/3"
   },
   {
    "label": "set plain host portfast",
    "accept": [
     "spanning-tree portfast"
    ],
    "canonical": "spanning-tree portfast"
   }
  ],
  "forbid": [
   "spanning-tree portfast trunk"
  ],
  "wrongIfTyped": []
 },
 {
  "id": "cli:static:cfg:1",
  "deck": "static",
  "kind": "config",
  "prompt": "R1(config)#",
  "goal": "Add a static route to 10.2.2.0/24 via next-hop 192.168.12.2.",
  "context": null,
  "steps": [
   {
    "label": "static route via next-hop",
    "accept": [
     "ip route 10.2.2.0 255.255.255.0 192.168.12.2"
    ],
    "canonical": "ip route 10.2.2.0 255.255.255.0 192.168.12.2"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "ip route 10.2.2.0 0.0.0.255 192.168.12.2",
    "hint": "Static routes use a subnet mask, not a wildcard."
   }
  ]
 },
 {
  "id": "cli:static:cfg:2",
  "deck": "static",
  "kind": "config",
  "prompt": "R1(config)#",
  "goal": "Add a default route out the point-to-point exit interface Serial0/0/0.",
  "context": null,
  "steps": [
   {
    "label": "default route out the interface",
    "accept": [
     "ip route 0.0.0.0 0.0.0.0 serial0/0/0"
    ],
    "canonical": "ip route 0.0.0.0 0.0.0.0 serial0/0/0"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "ip route 0.0.0.0 255.255.255.255 serial0/0/0",
    "hint": "A default route uses mask 0.0.0.0, meaning match anything."
   }
  ]
 },
 {
  "id": "cli:static:cfg:3",
  "deck": "static",
  "kind": "config",
  "prompt": "R1(config)#",
  "goal": "Add a floating static backup to 10.5.5.0/24 via 192.168.13.3 with administrative distance 5.",
  "context": null,
  "steps": [
   {
    "label": "floating static with AD 5",
    "accept": [
     "ip route 10.5.5.0 255.255.255.0 192.168.13.3 5"
    ],
    "canonical": "ip route 10.5.5.0 255.255.255.0 192.168.13.3 5"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "ip route 10.5.5.0 255.255.255.0 192.168.13.3",
    "hint": "Without the trailing AD it is a normal route, not a floating backup. Add the 5."
   }
  ]
 },
 {
  "id": "cli:static:cfg:4",
  "deck": "static",
  "kind": "config",
  "prompt": "R1(config)#",
  "goal": "Add a host route (single /32) to the management box 172.16.1.10 via 192.168.12.2.",
  "context": null,
  "steps": [
   {
    "label": "host route /32 via next-hop",
    "accept": [
     "ip route 172.16.1.10 255.255.255.255 192.168.12.2"
    ],
    "canonical": "ip route 172.16.1.10 255.255.255.255 192.168.12.2"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "ip route 172.16.1.10 255.255.255.0 192.168.12.2",
    "hint": "A single host is a /32, so mask 255.255.255.255."
   }
  ]
 },
 {
  "id": "cli:static:fix:1",
  "deck": "static",
  "kind": "fix",
  "prompt": "R1(config)#",
  "goal": "Traffic to 10.2.2.0/24 is black-holed. The mask was typed as a wildcard. Fix it to a subnet mask.",
  "context": "ip route 10.2.2.0 0.0.0.255 192.168.12.2",
  "steps": [
   {
    "label": "static route with subnet mask",
    "accept": [
     "ip route 10.2.2.0 255.255.255.0 192.168.12.2"
    ],
    "canonical": "ip route 10.2.2.0 255.255.255.0 192.168.12.2"
   }
  ],
  "forbid": [
   "ip route 10.2.2.0 0.0.0.255 192.168.12.2"
  ],
  "wrongIfTyped": []
 },
 {
  "id": "cli:static:fix:2",
  "deck": "static",
  "kind": "fix",
  "prompt": "R1(config)#",
  "goal": "The backup link took over permanently because the floating static had no higher AD. Re-add it as AD 5.",
  "context": "ip route 10.5.5.0 255.255.255.0 192.168.13.3",
  "steps": [
   {
    "label": "floating static with AD 5",
    "accept": [
     "ip route 10.5.5.0 255.255.255.0 192.168.13.3 5"
    ],
    "canonical": "ip route 10.5.5.0 255.255.255.0 192.168.13.3 5"
   }
  ],
  "forbid": [
   "ip route 10.5.5.0 255.255.255.0 192.168.13.3"
  ],
  "wrongIfTyped": []
 },
 {
  "id": "cli:stp:cfg:1",
  "deck": "stp",
  "kind": "config",
  "prompt": "S1(config)#",
  "goal": "Make this switch the root bridge for VLAN 10 using the macro command.",
  "context": null,
  "steps": [
   {
    "label": "set root for vlan 10",
    "accept": [
     "spanning-tree vlan 10 root primary"
    ],
    "canonical": "spanning-tree vlan 10 root primary"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "spanning-tree vlan 10 priority 4096",
    "hint": "root primary lands at priority 24576 (or just below the current root). It is not a flat 4096."
   }
  ]
 },
 {
  "id": "cli:stp:cfg:2",
  "deck": "stp",
  "kind": "config",
  "prompt": "S1(config)#",
  "goal": "Set an explicit STP priority of 4096 for VLAN 20 (must be a multiple of 4096).",
  "context": null,
  "steps": [
   {
    "label": "set explicit priority for vlan 20",
    "accept": [
     "spanning-tree vlan 20 priority 4096"
    ],
    "canonical": "spanning-tree vlan 20 priority 4096"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "spanning-tree vlan 20 priority 5000",
    "hint": "Priority must be a multiple of 4096 (0, 4096, 8192, ...). 5000 is rejected."
   }
  ]
 },
 {
  "id": "cli:stp:cfg:3",
  "deck": "stp",
  "kind": "config",
  "prompt": "S1(config)#",
  "goal": "Make this switch the backup root (secondary) for VLAN 10.",
  "context": null,
  "steps": [
   {
    "label": "set secondary root for vlan 10",
    "accept": [
     "spanning-tree vlan 10 root secondary"
    ],
    "canonical": "spanning-tree vlan 10 root secondary"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "spanning-tree vlan 10 priority 28672",
    "hint": "root secondary sets priority 28672 for you. The macro is what the goal asked for."
   }
  ]
 },
 {
  "id": "cli:stp:cfg:4",
  "deck": "stp",
  "kind": "config",
  "prompt": "S1(config)#",
  "goal": "Enable PortFast and BPDU Guard on the single host access port Fa0/5.",
  "context": null,
  "steps": [
   {
    "label": "enter the access port",
    "accept": [
     "interface fastethernet0/5"
    ],
    "canonical": "interface fastethernet0/5"
   },
   {
    "label": "enable portfast",
    "accept": [
     "spanning-tree portfast"
    ],
    "canonical": "spanning-tree portfast"
   },
   {
    "label": "enable bpdu guard",
    "accept": [
     "spanning-tree bpduguard enable"
    ],
    "canonical": "spanning-tree bpduguard enable"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "spanning-tree portfast default",
    "hint": "That is the global form. Under one access port, use plain spanning-tree portfast."
   }
  ]
 },
 {
  "id": "cli:stp:fix:1",
  "deck": "stp",
  "kind": "fix",
  "prompt": "S1(config)#",
  "goal": "This switch should be root for VLAN 10 but a flat priority of 4096 was set and another switch still wins. Use the root primary macro.",
  "context": "spanning-tree vlan 10 priority 4096",
  "steps": [
   {
    "label": "set root primary for vlan 10",
    "accept": [
     "spanning-tree vlan 10 root primary"
    ],
    "canonical": "spanning-tree vlan 10 root primary"
   }
  ],
  "forbid": [
   "spanning-tree vlan 10 priority 4096"
  ],
  "wrongIfTyped": [
   {
    "line": "spanning-tree vlan 10 priority 0",
    "hint": "Hard-coding 0 is fragile. The macro root primary is the intended fix and adapts to the current root."
   }
  ]
 },
 {
  "id": "cli:stp:fix:2",
  "deck": "stp",
  "kind": "fix",
  "prompt": "S1(config)#",
  "goal": "The priority command was rejected because 8000 is not a valid step. Set a valid VLAN 30 priority of 8192.",
  "context": "spanning-tree vlan 30 priority 8000",
  "steps": [
   {
    "label": "set valid priority for vlan 30",
    "accept": [
     "spanning-tree vlan 30 priority 8192"
    ],
    "canonical": "spanning-tree vlan 30 priority 8192"
   }
  ],
  "forbid": [
   "spanning-tree vlan 30 priority 8000"
  ],
  "wrongIfTyped": []
 },
 {
  "id": "cli:etherchannel:cfg:1",
  "deck": "etherchannel",
  "kind": "config",
  "prompt": "S1(config)#",
  "goal": "Bundle Fa0/1 and Fa0/2 into a LACP EtherChannel (channel 1) actively negotiating.",
  "context": null,
  "steps": [
   {
    "label": "select the two ports",
    "accept": [
     "interface range fastethernet0/1 - 2",
     "interface range fastethernet0/1-2"
    ],
    "canonical": "interface range fastethernet0/1 - 2"
   },
   {
    "label": "create LACP channel-group, active",
    "accept": [
     "channel-group 1 mode active"
    ],
    "canonical": "channel-group 1 mode active"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "channel-group 1 mode on",
    "hint": "on is static, not LACP. LACP active negotiates."
   }
  ]
 },
 {
  "id": "cli:etherchannel:cfg:2",
  "deck": "etherchannel",
  "kind": "config",
  "prompt": "S1(config)#",
  "goal": "Bundle Gi0/1 and Gi0/2 into a PAgP EtherChannel (channel 2) that actively asks to form (desirable).",
  "context": null,
  "steps": [
   {
    "label": "select the two ports",
    "accept": [
     "interface range gigabitethernet0/1 - 2",
     "interface range gigabitethernet0/1-2"
    ],
    "canonical": "interface range gigabitethernet0/1 - 2"
   },
   {
    "label": "create PAgP channel-group, desirable",
    "accept": [
     "channel-group 2 mode desirable"
    ],
    "canonical": "channel-group 2 mode desirable"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "channel-group 2 mode active",
    "hint": "active is LACP. PAgP uses desirable or auto."
   }
  ]
 },
 {
  "id": "cli:etherchannel:cfg:3",
  "deck": "etherchannel",
  "kind": "config",
  "prompt": "S1(config)#",
  "goal": "Make the existing Port-channel 1 a trunk so it carries tagged VLANs.",
  "context": null,
  "steps": [
   {
    "label": "enter the port-channel",
    "accept": [
     "interface port-channel 1",
     "interface port-channel1"
    ],
    "canonical": "interface port-channel 1"
   },
   {
    "label": "set the bundle to trunk",
    "accept": [
     "switchport mode trunk"
    ],
    "canonical": "switchport mode trunk"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "switchport mode access",
    "hint": "A trunk carries multiple VLANs across the bundle. Access would pin it to one VLAN."
   }
  ]
 },
 {
  "id": "cli:etherchannel:cfg:4",
  "deck": "etherchannel",
  "kind": "config",
  "prompt": "S1(config)#",
  "goal": "Bundle Fa0/3 and Fa0/4 as a static (unconditional) EtherChannel, channel 3.",
  "context": null,
  "steps": [
   {
    "label": "select the two ports",
    "accept": [
     "interface range fastethernet0/3 - 4",
     "interface range fastethernet0/3-4"
    ],
    "canonical": "interface range fastethernet0/3 - 4"
   },
   {
    "label": "create static channel-group, on",
    "accept": [
     "channel-group 3 mode on"
    ],
    "canonical": "channel-group 3 mode on"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "channel-group 3 mode auto",
    "hint": "auto waits for the other side to start (PAgP). The goal wants static on."
   }
  ]
 },
 {
  "id": "cli:etherchannel:fix:1",
  "deck": "etherchannel",
  "kind": "fix",
  "prompt": "S1(config)#",
  "goal": "The channel will not form: one side is LACP active, this side was set to auto (PAgP). Set this side to LACP active.",
  "context": "interface range fastethernet0/1 - 2\n channel-group 1 mode auto",
  "steps": [
   {
    "label": "select the two ports",
    "accept": [
     "interface range fastethernet0/1 - 2",
     "interface range fastethernet0/1-2"
    ],
    "canonical": "interface range fastethernet0/1 - 2"
   },
   {
    "label": "match LACP active",
    "accept": [
     "channel-group 1 mode active"
    ],
    "canonical": "channel-group 1 mode active"
   }
  ],
  "forbid": [
   "channel-group 1 mode auto"
  ],
  "wrongIfTyped": [
   {
    "line": "channel-group 1 mode passive",
    "hint": "passive plus active will form, but the neighbor is active and you want both ends to negotiate cleanly. active is the safe match. (passive+passive never forms.)"
   }
  ]
 },
 {
  "id": "cli:etherchannel:fix:2",
  "deck": "etherchannel",
  "kind": "fix",
  "prompt": "S1(config)#",
  "goal": "PAgP bundle never came up: both sides were left on auto, so neither initiates. Set this side to desirable.",
  "context": "interface range gigabitethernet0/1 - 2\n channel-group 2 mode auto",
  "steps": [
   {
    "label": "select the two ports",
    "accept": [
     "interface range gigabitethernet0/1 - 2",
     "interface range gigabitethernet0/1-2"
    ],
    "canonical": "interface range gigabitethernet0/1 - 2"
   },
   {
    "label": "set PAgP desirable",
    "accept": [
     "channel-group 2 mode desirable"
    ],
    "canonical": "channel-group 2 mode desirable"
   }
  ],
  "forbid": [
   "channel-group 2 mode auto"
  ],
  "wrongIfTyped": []
 },
 {
  "id": "cli:ipv6:cfg:1",
  "deck": "ipv6",
  "kind": "config",
  "prompt": "R1(config)#",
  "goal": "Turn on IPv6 routing, then put 2001:db8:a:1::1/64 on Gi0/0.",
  "context": null,
  "steps": [
   {
    "label": "enable ipv6 routing",
    "accept": [
     "ipv6 unicast-routing"
    ],
    "canonical": "ipv6 unicast-routing"
   },
   {
    "label": "enter the interface",
    "accept": [
     "interface gigabitethernet0/0"
    ],
    "canonical": "interface gigabitethernet0/0"
   },
   {
    "label": "set the global IPv6 address",
    "accept": [
     "ipv6 address 2001:db8:a:1::1/64"
    ],
    "canonical": "ipv6 address 2001:db8:a:1::1/64"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "ip address 2001:db8:a:1::1/64",
    "hint": "IPv6 uses the ipv6 address command, not ip address."
   }
  ]
 },
 {
  "id": "cli:ipv6:cfg:2",
  "deck": "ipv6",
  "kind": "config",
  "prompt": "R1(config)#",
  "goal": "On Gi0/1 build the host portion automatically with EUI-64 from prefix 2001:db8:a:2::/64.",
  "context": null,
  "steps": [
   {
    "label": "enter the interface",
    "accept": [
     "interface gigabitethernet0/1"
    ],
    "canonical": "interface gigabitethernet0/1"
   },
   {
    "label": "set IPv6 with eui-64",
    "accept": [
     "ipv6 address 2001:db8:a:2::/64 eui-64"
    ],
    "canonical": "ipv6 address 2001:db8:a:2::/64 eui-64"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "ipv6 address autoconfig",
    "hint": "autoconfig is SLAAC for a host. EUI-64 means you give the prefix and add the keyword eui-64."
   }
  ]
 },
 {
  "id": "cli:ipv6:cfg:3",
  "deck": "ipv6",
  "kind": "config",
  "prompt": "R1(config)#",
  "goal": "Add an IPv6 static route to 2001:db8:b::/64 via next-hop 2001:db8:a:1::2.",
  "context": null,
  "steps": [
   {
    "label": "ipv6 static route via next-hop",
    "accept": [
     "ipv6 route 2001:db8:b::/64 2001:db8:a:1::2"
    ],
    "canonical": "ipv6 route 2001:db8:b::/64 2001:db8:a:1::2"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "ip route 2001:db8:b::/64 2001:db8:a:1::2",
    "hint": "IPv6 static routes use ipv6 route, not ip route."
   }
  ]
 },
 {
  "id": "cli:ipv6:cfg:4",
  "deck": "ipv6",
  "kind": "config",
  "prompt": "R1(config)#",
  "goal": "Add an IPv6 default route out toward upstream next-hop 2001:db8:a:1::2.",
  "context": null,
  "steps": [
   {
    "label": "ipv6 default route via next-hop",
    "accept": [
     "ipv6 route ::/0 2001:db8:a:1::2"
    ],
    "canonical": "ipv6 route ::/0 2001:db8:a:1::2"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "ipv6 route 0.0.0.0/0 2001:db8:a:1::2",
    "hint": "The IPv6 default is ::/0, not 0.0.0.0/0."
   }
  ]
 },
 {
  "id": "cli:ipv6:fix:1",
  "deck": "ipv6",
  "kind": "fix",
  "prompt": "R1(config)#",
  "goal": "IPv6 hosts can reach the local link but the router will not forward between subnets. IPv6 routing was never turned on. Enable it.",
  "context": "interface gigabitethernet0/0\n ipv6 address 2001:db8:a:1::1/64",
  "steps": [
   {
    "label": "enable ipv6 routing",
    "accept": [
     "ipv6 unicast-routing"
    ],
    "canonical": "ipv6 unicast-routing"
   }
  ],
  "forbid": [],
  "wrongIfTyped": [
   {
    "line": "ip routing",
    "hint": "That enables IPv4 routing. IPv6 needs ipv6 unicast-routing."
   }
  ]
 },
 {
  "id": "cli:ipv6:fix:2",
  "deck": "ipv6",
  "kind": "fix",
  "prompt": "R1(config)#",
  "goal": "The EUI-64 address was typed as a full host address by mistake. Re-enter Gi0/1 so the host part is built with EUI-64 from the /64.",
  "context": "interface gigabitethernet0/1\n ipv6 address 2001:db8:a:2::1/64",
  "steps": [
   {
    "label": "enter the interface",
    "accept": [
     "interface gigabitethernet0/1"
    ],
    "canonical": "interface gigabitethernet0/1"
   },
   {
    "label": "use eui-64 instead",
    "accept": [
     "ipv6 address 2001:db8:a:2::/64 eui-64"
    ],
    "canonical": "ipv6 address 2001:db8:a:2::/64 eui-64"
   }
  ],
  "forbid": [
   "ipv6 address 2001:db8:a:2::1/64"
  ],
  "wrongIfTyped": []
 },
 {
  "id": "cli:aclproto:1",
  "deck": "aclproto",
  "kind": "recall",
  "answerKind": "loose",
  "question": "In an ACL, what protocol keyword and port match DNS? (give both transport and port)",
  "accept": [
   "tcp 53",
   "udp 53",
   "tcp/53",
   "udp/53",
   "53",
   "tcp and udp 53",
   "dns 53"
  ],
  "explain": "DNS uses BOTH TCP and UDP port 53. Zone transfers use TCP 53; ordinary name queries use UDP 53. Exam favorite: DNS is not UDP-only."
 },
 {
  "id": "cli:aclproto:2",
  "deck": "aclproto",
  "kind": "recall",
  "answerKind": "loose",
  "question": "What IP protocol NUMBER does OSPF use (the value after 'permit' / in 'access-list ... ospf')?",
  "accept": [
   "89",
   "ospf",
   "protocol 89"
  ],
  "explain": "OSPF rides directly on IP as protocol 89. It is not TCP or UDP. In an extended ACL you can write 'permit ospf' or 'permit 89'."
 },
 {
  "id": "cli:aclproto:3",
  "deck": "aclproto",
  "kind": "recall",
  "answerKind": "loose",
  "question": "What IP protocol NUMBER does EIGRP use?",
  "accept": [
   "88",
   "eigrp",
   "protocol 88"
  ],
  "explain": "EIGRP uses IP protocol 88. Like OSPF it is not TCP/UDP; it sits directly on IP. 'permit eigrp' or 'permit 88'."
 },
 {
  "id": "cli:aclproto:4",
  "deck": "aclproto",
  "kind": "recall",
  "answerKind": "loose",
  "question": "In an ACL, what transport and port does NTP match?",
  "accept": [
   "udp 123",
   "udp/123",
   "123",
   "ntp 123"
  ],
  "explain": "NTP uses UDP port 123. Time sync is connectionless, so UDP. 'permit udp any any eq 123' or 'eq ntp'."
 },
 {
  "id": "cli:aclproto:5",
  "deck": "aclproto",
  "kind": "recall",
  "answerKind": "loose",
  "question": "In an ACL, what transport and port does HTTP match (eq www)?",
  "accept": [
   "tcp 80",
   "tcp/80",
   "80",
   "http 80",
   "www 80"
  ],
  "explain": "HTTP is TCP port 80. The IOS keyword 'eq www' equals 'eq 80'. Web traffic is reliable so TCP."
 },
 {
  "id": "cli:aclproto:6",
  "deck": "aclproto",
  "kind": "recall",
  "answerKind": "loose",
  "question": "In an ACL, what transport and port does HTTPS match?",
  "accept": [
   "tcp 443",
   "tcp/443",
   "443",
   "https 443"
  ],
  "explain": "HTTPS is TCP port 443. Encrypted web. 'eq 443' (no IOS keyword alias on most platforms)."
 },
 {
  "id": "cli:aclproto:7",
  "deck": "aclproto",
  "kind": "recall",
  "answerKind": "loose",
  "question": "In an ACL, what transport and port does SSH match?",
  "accept": [
   "tcp 22",
   "tcp/22",
   "22",
   "ssh 22"
  ],
  "explain": "SSH is TCP port 22. Encrypted remote management. 'permit tcp any any eq 22'."
 },
 {
  "id": "cli:aclproto:8",
  "deck": "aclproto",
  "kind": "recall",
  "answerKind": "loose",
  "question": "In an ACL, what transport and port does Telnet match?",
  "accept": [
   "tcp 23",
   "tcp/23",
   "23",
   "telnet 23"
  ],
  "explain": "Telnet is TCP port 23. Cleartext remote management. 'eq telnet' equals 'eq 23'."
 },
 {
  "id": "cli:aclproto:9",
  "deck": "aclproto",
  "kind": "recall",
  "answerKind": "loose",
  "question": "In an ACL, what transport and ports does FTP use (control plus data)?",
  "accept": [
   "tcp 21 20",
   "tcp 20 21",
   "tcp/21 tcp/20",
   "20 21",
   "21 20",
   "ftp 21 20",
   "tcp 21 tcp 20",
   "ftp 20 21"
  ],
  "explain": "FTP uses TCP 21 for control and TCP 20 for active-mode data. 'eq ftp' equals 'eq 21'. Two ports: command 21, data 20."
 },
 {
  "id": "cli:aclproto:10",
  "deck": "aclproto",
  "kind": "recall",
  "answerKind": "loose",
  "question": "In an ACL, what transport and ports does TFTP use?",
  "accept": [
   "udp 69",
   "udp/69",
   "69",
   "tftp 69"
  ],
  "explain": "TFTP is UDP port 69. Trivial, connectionless file transfer (used for IOS images). 'eq tftp' equals 'eq 69'."
 },
 {
  "id": "cli:aclproto:11",
  "deck": "aclproto",
  "kind": "recall",
  "answerKind": "loose",
  "question": "In an ACL, what transport and port does SMTP (mail send) match?",
  "accept": [
   "tcp 25",
   "tcp/25",
   "25",
   "smtp 25"
  ],
  "explain": "SMTP is TCP port 25. Mail submission/relay. 'eq smtp' equals 'eq 25'."
 },
 {
  "id": "cli:aclproto:12",
  "deck": "aclproto",
  "kind": "recall",
  "answerKind": "loose",
  "question": "In an ACL, what transport and ports does SNMP use (agent plus traps)?",
  "accept": [
   "udp 161 162",
   "udp 162 161",
   "161 162",
   "162 161",
   "udp/161 udp/162",
   "snmp 161 162"
  ],
  "explain": "SNMP polling is UDP 161; SNMP traps are UDP 162. Both UDP. Two ports: queries 161, traps 162."
 },
 {
  "id": "cli:aclproto:13",
  "deck": "aclproto",
  "kind": "recall",
  "answerKind": "loose",
  "question": "In an ACL, what transport and port does DHCP server use (and the client port)?",
  "accept": [
   "udp 67 68",
   "udp 68 67",
   "67 68",
   "68 67",
   "udp/67 udp/68",
   "dhcp 67 68"
  ],
  "explain": "DHCP uses UDP 67 (server/bootps) and UDP 68 (client/bootpc). Both UDP. Server 67, client 68."
 },
 {
  "id": "cli:aclproto:14",
  "deck": "aclproto",
  "kind": "recall",
  "answerKind": "loose",
  "question": "In an ACL, what transport and port does syslog match?",
  "accept": [
   "udp 514",
   "udp/514",
   "514",
   "syslog 514"
  ],
  "explain": "Syslog is UDP port 514. Fire-and-forget logging. 'eq 514'."
 },
 {
  "id": "cli:aclproto:15",
  "deck": "aclproto",
  "kind": "recall",
  "answerKind": "loose",
  "question": "In an ACL, what transport and ports does RADIUS use (auth plus accounting, modern values)?",
  "accept": [
   "udp 1812 1813",
   "udp 1813 1812",
   "1812 1813",
   "1813 1812",
   "udp/1812 udp/1813"
  ],
  "explain": "RADIUS uses UDP 1812 (authentication) and UDP 1813 (accounting). Legacy values were 1645/1646. RADIUS is UDP; TACACS+ is TCP 49."
 },
 {
  "id": "cli:aclproto:16",
  "deck": "aclproto",
  "kind": "recall",
  "answerKind": "loose",
  "question": "In an ACL, what transport and port does TACACS+ use?",
  "accept": [
   "tcp 49",
   "tcp/49",
   "49",
   "tacacs 49",
   "tacacs+ 49"
  ],
  "explain": "TACACS+ uses TCP port 49. Cisco AAA protocol, encrypts the entire payload. Contrast: RADIUS is UDP 1812/1813 and encrypts only the password."
 },
 {
  "id": "cli:wlan:1",
  "deck": "wlan",
  "kind": "recall",
  "answerKind": "loose",
  "question": "Which three 2.4 GHz channels are the only non-overlapping ones in North America?",
  "accept": [
   "1 6 11",
   "1, 6, 11",
   "channels 1 6 11",
   "1/6/11"
  ],
  "explain": "In the 2.4 GHz band only channels 1, 6, and 11 do not overlap. This rule applies to 2.4 GHz ONLY; 5 GHz channels are 20 MHz and natively non-overlapping."
 },
 {
  "id": "cli:wlan:2",
  "deck": "wlan",
  "kind": "recall",
  "answerKind": "loose",
  "question": "The 1/6/11 non-overlapping channel rule applies to which frequency band?",
  "accept": [
   "2.4 ghz",
   "2.4",
   "2.4ghz",
   "2.4 gigahertz"
  ],
  "explain": "1/6/11 is a 2.4 GHz-only rule. Trap: do not apply it to 5 GHz. The 5 GHz band has many non-overlapping 20 MHz channels."
 },
 {
  "id": "cli:wlan:3",
  "deck": "wlan",
  "kind": "recall",
  "answerKind": "loose",
  "question": "Which 802.11 standards (letters) operate in the 2.4 GHz band?",
  "accept": [
   "b g n",
   "b, g, n",
   "b/g/n",
   "bgn"
  ],
  "explain": "2.4 GHz: 802.11b, g, and n. (n is dual-band.) 5 GHz: 802.11a, n, ac. Memory hook: 2.4 = b/g/n, 5 = a/n/ac."
 },
 {
  "id": "cli:wlan:4",
  "deck": "wlan",
  "kind": "recall",
  "answerKind": "loose",
  "question": "Which 802.11 standards (letters) operate in the 5 GHz band?",
  "accept": [
   "a n ac",
   "a, n, ac",
   "a/n/ac",
   "anac",
   "a n ac ax"
  ],
  "explain": "5 GHz: 802.11a, n, and ac. (n is dual-band; ax/Wi-Fi 6 is both bands.) 2.4 GHz is b/g/n."
 },
 {
  "id": "cli:wlan:5",
  "deck": "wlan",
  "kind": "choice",
  "question": "WPA2 uses which encryption cipher/algorithm?",
  "options": [
   "TKIP",
   "CCMP/AES",
   "SAE",
   "WEP/RC4"
  ],
  "correctIndex": 1,
  "explain": "WPA2 uses CCMP with AES. WPA (original) used TKIP. WPA3-Personal uses SAE. Trap: WPA2 = CCMP/AES, not TKIP."
 },
 {
  "id": "cli:wlan:6",
  "deck": "wlan",
  "kind": "choice",
  "question": "The original WPA (Wi-Fi Protected Access, version 1) uses which encryption cipher?",
  "options": [
   "CCMP/AES",
   "SAE",
   "TKIP",
   "802.1X"
  ],
  "correctIndex": 2,
  "explain": "WPA1 uses TKIP (a patch over WEP's RC4). WPA2 moved to CCMP/AES. TKIP is now deprecated."
 },
 {
  "id": "cli:wlan:7",
  "deck": "wlan",
  "kind": "choice",
  "question": "WPA3-Personal replaces the pre-shared-key handshake with which mechanism?",
  "options": [
   "PSK",
   "SAE",
   "TKIP",
   "RADIUS"
  ],
  "correctIndex": 1,
  "explain": "WPA3-Personal uses SAE (Simultaneous Authentication of Equals), a.k.a. Dragonfly. It defeats offline dictionary attacks that plagued WPA2-PSK."
 },
 {
  "id": "cli:wlan:8",
  "deck": "wlan",
  "kind": "choice",
  "question": "Which authentication method does a home Wi-Fi network with a single shared password use?",
  "options": [
   "802.1X",
   "PSK",
   "SAE",
   "CCMP"
  ],
  "correctIndex": 1,
  "explain": "Home/personal mode uses PSK (pre-shared key): one password for everyone. Enterprise mode uses 802.1X with a RADIUS server and per-user credentials."
 },
 {
  "id": "cli:wlan:9",
  "deck": "wlan",
  "kind": "choice",
  "question": "WPA2-Enterprise authenticates users via 802.1X talking to which back-end server type?",
  "options": [
   "TACACS+",
   "RADIUS",
   "DHCP",
   "LDAP only"
  ],
  "correctIndex": 1,
  "explain": "WPA2/WPA3-Enterprise uses 802.1X/EAP to a RADIUS server for per-user authentication. PSK has no server. RADIUS is the wireless AAA back-end."
 },
 {
  "id": "cli:wlan:10",
  "deck": "wlan",
  "kind": "choice",
  "question": "In a lightweight AP deployment, the AP and the WLC divide 802.11 duties using which architecture?",
  "options": [
   "Autonomous AP",
   "Split-MAC",
   "Mesh",
   "Bridge mode"
  ],
  "correctIndex": 1,
  "explain": "Lightweight APs use the split-MAC model: real-time 802.11 functions (beacons, ACKs, encryption) stay on the AP; management functions (auth, association, roaming, security policy) move to the WLC."
 },
 {
  "id": "cli:wlan:11",
  "deck": "wlan",
  "kind": "recall",
  "answerKind": "loose",
  "question": "What protocol/tunnel carries traffic between a lightweight AP and the WLC?",
  "accept": [
   "capwap",
   "capwap tunnel"
  ],
  "explain": "CAPWAP (Control And Provisioning of Wireless Access Points) tunnels both control and data between AP and WLC. It superseded the older LWAPP."
 },
 {
  "id": "cli:wlan:12",
  "deck": "wlan",
  "kind": "recall",
  "answerKind": "loose",
  "question": "What UDP port does the CAPWAP CONTROL channel use?",
  "accept": [
   "udp 5246",
   "5246",
   "udp/5246",
   "capwap control 5246"
  ],
  "explain": "CAPWAP control = UDP 5246 (management/control messages). CAPWAP data = UDP 5247. Hook: control 5246, data 5247."
 },
 {
  "id": "cli:wlan:13",
  "deck": "wlan",
  "kind": "recall",
  "answerKind": "loose",
  "question": "What UDP port does the CAPWAP DATA channel use?",
  "accept": [
   "udp 5247",
   "5247",
   "udp/5247",
   "capwap data 5247"
  ],
  "explain": "CAPWAP data = UDP 5247 (the tunneled client traffic). CAPWAP control = UDP 5246. Both are UDP."
 },
 {
  "id": "cli:wlan:14",
  "deck": "wlan",
  "kind": "choice",
  "question": "Which 802.11 frame type does an AP broadcast to advertise its SSID and capabilities?",
  "options": [
   "Probe request",
   "Beacon",
   "Association request",
   "Authentication"
  ],
  "correctIndex": 1,
  "explain": "The AP periodically broadcasts a Beacon frame advertising the SSID, supported rates, and security. Clients send Probe requests to actively discover networks."
 },
 {
  "id": "cli:wlan:15",
  "deck": "wlan",
  "kind": "recall",
  "answerKind": "loose",
  "question": "What is the maximum data-rate channel WIDTH for a single 2.4 GHz Wi-Fi channel that keeps 1/6/11 non-overlapping (in MHz)?",
  "accept": [
   "20",
   "20 mhz",
   "20mhz"
  ],
  "explain": "Each 2.4 GHz channel is 20 MHz wide, which is why only 1, 6, and 11 stay non-overlapping across the ~80 MHz usable band. Bonding to 40 MHz in 2.4 GHz breaks the non-overlap and is discouraged."
 },
 {
  "id": "cli:wlan:16",
  "deck": "wlan",
  "kind": "choice",
  "question": "Which WLC AP mode lets an AP serve clients normally AND scan the air for rogues/interference part-time?",
  "options": [
   "Local mode",
   "Monitor mode",
   "Sniffer mode",
   "FlexConnect"
  ],
  "correctIndex": 0,
  "explain": "Local mode is the default: the AP serves clients and time-slices off-channel to scan. Monitor mode does scanning only (no clients). FlexConnect switches traffic locally when the WLC link is down."
 },
 {
  "id": "cli:wlan:17",
  "deck": "wlan",
  "kind": "choice",
  "question": "Which security option provides the STRONGEST personal Wi-Fi protection on modern gear?",
  "options": [
   "WEP",
   "WPA-TKIP",
   "WPA2-PSK",
   "WPA3-SAE"
  ],
  "correctIndex": 3,
  "explain": "Strength order (weak to strong): WEP < WPA/TKIP < WPA2/CCMP-AES < WPA3/SAE. WPA3-Personal (SAE) is the strongest personal option; WEP is broken and must never be used."
 },
 {
  "id": "cli:wlan:18",
  "deck": "wlan",
  "kind": "recall",
  "answerKind": "loose",
  "question": "How many bits is the AES key used by WPA2/CCMP at minimum?",
  "accept": [
   "128",
   "128 bit",
   "128 bits",
   "128-bit"
  ],
  "explain": "WPA2 CCMP uses AES with a 128-bit key minimum. The cipher is AES; the protocol wrapper is CCMP (Counter Mode with CBC-MAC)."
 },
 {
  "id": "cli:read:1",
  "deck": "routetable",
  "show": "show ip route",
  "table": "Gateway of last resort is 203.0.113.1 to network 0.0.0.0\n\nS*    0.0.0.0/0 [1/0] via 203.0.113.1\n      10.0.0.0/8 is variably subnetted, 3 subnets, 3 masks\nD     10.0.0.0/8 [90/2560] via 10.255.0.1\nO     10.1.0.0/16 [110/65] via 10.255.0.2\nC     10.1.1.0/24 is directly connected, Gi0/1\nL     10.1.1.1/32 is directly connected, Gi0/1",
  "rows": [
   {
    "prefix": "10.0.0.0",
    "len": 8,
    "via": "10.255.0.1"
   },
   {
    "prefix": "10.1.0.0",
    "len": 16,
    "via": "10.255.0.2"
   },
   {
    "prefix": "10.1.1.0",
    "len": 24,
    "via": "Gi0/1 (connected)"
   },
   {
    "prefix": "0.0.0.0",
    "len": 0,
    "via": "203.0.113.1"
   }
  ],
  "dest": "10.1.1.50",
  "question": "A packet is destined for 10.1.1.50. Which entry does the router use? Type the next hop or exit interface.",
  "explain": "Longest prefix match wins. 10.1.1.0/24 (/24) is more specific than /16, /8, or the default, so the packet uses the directly connected Gi0/1 entry.",
  "kind": "read",
  "accept": [
   "Gi0/1 (connected)"
  ]
 },
 {
  "id": "cli:read:2",
  "deck": "routetable",
  "show": "show ip route",
  "table": "Gateway of last resort is 192.0.2.254 to network 0.0.0.0\n\nS*    0.0.0.0/0 [1/0] via 192.0.2.254\n      172.16.0.0/16 is variably subnetted, 3 subnets, 3 masks\nO     172.16.0.0/16 [110/20] via 192.0.2.1\nO     172.16.8.0/22 [110/30] via 192.0.2.2\nD     172.16.10.0/24 [90/2816] via 192.0.2.3",
  "rows": [
   {
    "prefix": "172.16.0.0",
    "len": 16,
    "via": "192.0.2.1"
   },
   {
    "prefix": "172.16.8.0",
    "len": 22,
    "via": "192.0.2.2"
   },
   {
    "prefix": "172.16.10.0",
    "len": 24,
    "via": "192.0.2.3"
   },
   {
    "prefix": "0.0.0.0",
    "len": 0,
    "via": "192.0.2.254"
   }
  ],
  "dest": "172.16.9.200",
  "question": "A packet is destined for 172.16.9.200. Type the next hop the router forwards to.",
  "explain": "172.16.9.200 falls inside 172.16.8.0/22 (covers 172.16.8.0 to 172.16.11.255) but not inside the /24. The /22 is the longest match, so the next hop is 192.0.2.2.",
  "kind": "read",
  "accept": [
   "192.0.2.2",
   "via 192.0.2.2"
  ]
 },
 {
  "id": "cli:read:3",
  "deck": "routetable",
  "show": "show ip route",
  "table": "      192.168.0.0/16 is variably subnetted, 3 subnets, 3 masks\nO     192.168.0.0/16 [110/10] via 10.10.10.1\nC     192.168.1.0/24 is directly connected, Gi0/0\nO     192.168.1.128/25 [110/20] via 10.10.10.3",
  "rows": [
   {
    "prefix": "192.168.0.0",
    "len": 16,
    "via": "10.10.10.1"
   },
   {
    "prefix": "192.168.1.0",
    "len": 24,
    "via": "Gi0/0 (connected)"
   },
   {
    "prefix": "192.168.1.128",
    "len": 25,
    "via": "10.10.10.3"
   }
  ],
  "dest": "192.168.1.200",
  "question": "A packet is destined for 192.168.1.200. Type the next hop the router uses.",
  "explain": "192.168.1.200 is inside 192.168.1.128/25 (192.168.1.128 to 192.168.1.255). The /25 is more specific than the /24 or /16, so the next hop is 10.10.10.3.",
  "kind": "read",
  "accept": [
   "10.10.10.3",
   "via 10.10.10.3"
  ]
 },
 {
  "id": "cli:read:4",
  "deck": "routetable",
  "show": "show ip route",
  "table": "Gateway of last resort is 100.64.0.1 to network 0.0.0.0\n\nS*    0.0.0.0/0 [1/0] via 100.64.0.1\n      10.0.0.0/8 is variably subnetted, 3 subnets, 3 masks\nO     10.20.0.0/16 [110/40] via 100.64.0.2\nD     10.20.30.0/24 [90/3072] via 100.64.0.3\nS     10.20.30.64/26 [1/0] via 100.64.0.4",
  "rows": [
   {
    "prefix": "0.0.0.0",
    "len": 0,
    "via": "100.64.0.1"
   },
   {
    "prefix": "10.20.0.0",
    "len": 16,
    "via": "100.64.0.2"
   },
   {
    "prefix": "10.20.30.0",
    "len": 24,
    "via": "100.64.0.3"
   },
   {
    "prefix": "10.20.30.64",
    "len": 26,
    "via": "100.64.0.4"
   }
  ],
  "dest": "10.20.30.100",
  "question": "A packet is destined for 10.20.30.100. Type the next hop the router forwards to.",
  "explain": "10.20.30.100 lands in 10.20.30.64/26 (64 to 127). The /26 beats the /24, /16, and default, so the next hop is 100.64.0.4.",
  "kind": "read",
  "accept": [
   "100.64.0.4",
   "via 100.64.0.4"
  ]
 },
 {
  "id": "cli:read:5",
  "deck": "ospf",
  "show": "show ip ospf neighbor",
  "table": "Neighbor ID     Pri   State           Dead Time   Address         Interface\n1.1.1.1           1   FULL/DR         00:00:35    10.0.0.1        Gi0/0\n2.2.2.2           1   FULL/BDR        00:00:33    10.0.0.2        Gi0/0\n9.9.9.9           0   FULL/DROTHER    00:00:31    10.0.0.9        Gi0/0\n3.3.3.3           1   2WAY/DROTHER    00:00:38    10.0.0.3        Gi0/0",
  "routers": [
   {
    "priority": 1,
    "rid": "1.1.1.1"
   },
   {
    "priority": 1,
    "rid": "2.2.2.2"
   },
   {
    "priority": 0,
    "rid": "9.9.9.9"
   },
   {
    "priority": 1,
    "rid": "3.3.3.3"
   }
  ],
  "question": "All four routers boot at the same time on this segment. Which router ID becomes the DR?",
  "explain": "DR election: highest priority wins, ties broken by highest router ID. Priority 0 (9.9.9.9) is ineligible. Among the priority-1 routers, 3.3.3.3 is the highest RID, so it becomes the DR.",
  "kind": "read",
  "accept": [
   "3.3.3.3"
  ]
 },
 {
  "id": "cli:read:6",
  "deck": "ospf",
  "show": "show ip ospf neighbor",
  "table": "Neighbor ID     Pri   State           Dead Time   Address         Interface\n10.1.1.1         10   FULL/DR         00:00:36    172.16.0.1      Gi0/1\n8.8.8.8           5   FULL/BDR        00:00:34    172.16.0.8      Gi0/1\n9.9.9.9           0   FULL/DROTHER    00:00:39    172.16.0.9      Gi0/1",
  "routers": [
   {
    "priority": 10,
    "rid": "10.1.1.1"
   },
   {
    "priority": 5,
    "rid": "8.8.8.8"
   },
   {
    "priority": 0,
    "rid": "9.9.9.9"
   }
  ],
  "question": "These routers form adjacencies on a shared segment after a simultaneous reload. Which router ID becomes the BDR?",
  "explain": "Highest priority becomes DR (priority 10, RID 10.1.1.1). The next-highest eligible router becomes BDR: that is priority 5, RID 8.8.8.8. Priority 0 (9.9.9.9) cannot be elected.",
  "kind": "read",
  "accept": [
   "10.1.1.1"
  ]
 },
 {
  "id": "cli:read:7",
  "deck": "etherchannel",
  "show": "show etherchannel summary",
  "table": "Flags:  D - down        P - bundled in port-channel\n        I - stand-alone s - suspended\n        R - Layer3       S - Layer2\n        U - in use       f - failed to allocate aggregator\n\nNumber of channel-groups in use: 1\nNumber of aggregators:           1\n\nGroup  Port-channel  Protocol    Ports\n------+-------------+-----------+------------------------------------\n1      Po1(SU)         LACP      Gi0/1(P)   Gi0/2(P)",
  "question": "In this output, what does the (SU) next to Po1 mean?",
  "options": [
   "Layer 2 and in use",
   "Layer 3 and suspended",
   "Standalone and unbundled",
   "Down and suspended"
  ],
  "correctIndex": 0,
  "explain": "In show etherchannel summary, S = Layer 2 and U = in use. The member ports show (P) meaning they are bundled into the port-channel, so the EtherChannel is up and forwarding.",
  "kind": "read"
 },
 {
  "id": "cli:read:8",
  "deck": "etherchannel",
  "show": "show etherchannel summary",
  "table": "Flags:  D - down        P - bundled in port-channel\n        I - stand-alone s - suspended\n        R - Layer3       S - Layer2\n        U - in use       f - failed to allocate aggregator\n\nNumber of channel-groups in use: 1\nNumber of aggregators:           1\n\nGroup  Port-channel  Protocol    Ports\n------+-------------+-----------+------------------------------------\n1      Po1(SD)          -        Gi0/1(D)   Gi0/2(s)",
  "question": "Po1 shows (SD) and one member shows (s). What is the state of this EtherChannel?",
  "options": [
   "Up and load balancing normally",
   "A Layer 3 routed port-channel that is in use",
   "Down, with one member suspended (mismatch)",
   "Bundled and forwarding on both links"
  ],
  "correctIndex": 2,
  "explain": "D on the port-channel means down, and the lowercase s on a member means suspended, typically from a configuration mismatch (for example LACP active on one side and no channel protocol on the other). The bundle is not forwarding.",
  "kind": "read"
 },
 {
  "id": "cli:read:9",
  "deck": "vlan",
  "show": "show vlan brief",
  "table": "VLAN Name                             Status    Ports\n---- -------------------------------- --------- -------------------------------\n1    default                          active    Gi0/3, Gi0/4\n10   SALES                            active    Gi0/1\n20   ENGINEERING                      active    Gi0/2\n99   MGMT                             active\n1002 fddi-default                     act/unsup",
  "question": "Access port Gi0/1 is in which VLAN?",
  "options": [
   "VLAN 1 (default)",
   "VLAN 10 (SALES)",
   "VLAN 20 (ENGINEERING)",
   "VLAN 99 (MGMT)"
  ],
  "correctIndex": 1,
  "explain": "In show vlan brief, a port is listed next to the VLAN it is an access member of. Gi0/1 appears on the VLAN 10 SALES line, so it is an access port in VLAN 10.",
  "kind": "read"
 },
 {
  "id": "cli:read:10",
  "deck": "vlan",
  "show": "show vlan brief",
  "table": "VLAN Name                             Status    Ports\n---- -------------------------------- --------- -------------------------------\n1    default                          active    Gi0/5\n10   SALES                            active    Gi0/1, Gi0/2\n20   ENGINEERING                      active\n30   VOICE                            active    Gi0/3",
  "question": "VLAN 20 shows active but lists no ports, and trunk Gi0/24 is not shown here. Why might no access ports appear for VLAN 20?",
  "options": [
   "VLAN 20 is shut down",
   "No access port has been assigned to VLAN 20 yet",
   "VLAN 20 only carries traffic on trunk links, which show vlan brief does not list",
   "Both that no access port is assigned and that trunks are not shown by this command"
  ],
  "correctIndex": 3,
  "explain": "show vlan brief lists only access ports per VLAN, never trunk ports. A VLAN can be active with an empty Ports column because no access port is assigned and any trunks carrying it are not displayed by this command.",
  "kind": "read"
 },
 {
  "id": "cli:read:11",
  "deck": "vlan",
  "show": "show ip interface brief",
  "table": "Interface              IP-Address      OK? Method Status                Protocol\nGigabitEthernet0/0     10.0.0.1        YES manual up                    up\nGigabitEthernet0/1     unassigned      YES unset  administratively down down\nGigabitEthernet0/2     192.168.1.1     YES manual up                    up\nVlan1                  unassigned      YES unset  up                    up",
  "question": "Which interface is fully operational and able to pass traffic (Status up, Protocol up, with an IP)?",
  "options": [
   "GigabitEthernet0/0",
   "GigabitEthernet0/1",
   "Vlan1",
   "None of them"
  ],
  "correctIndex": 0,
  "explain": "An interface passes Layer 3 traffic only when Status is up, Protocol is up, and it has an IP. Gi0/0 is up/up with 10.0.0.1. Gi0/1 is admin down, and Vlan1 is up/up but has no IP.",
  "kind": "read"
 },
 {
  "id": "cli:read:12",
  "deck": "vlan",
  "show": "show ip interface brief",
  "table": "Interface              IP-Address      OK? Method Status                Protocol\nGigabitEthernet0/0     203.0.113.2     YES manual up                    up\nGigabitEthernet0/1     10.10.10.1      YES manual up                    down\nGigabitEthernet0/2     unassigned      YES unset  administratively down down\nLoopback0              1.1.1.1         YES manual up                    up",
  "question": "Gi0/1 shows Status up but Protocol down. Which interface is the one that is up/up AND routable besides Loopback0?",
  "options": [
   "GigabitEthernet0/0",
   "GigabitEthernet0/1",
   "GigabitEthernet0/2",
   "None besides Loopback0"
  ],
  "correctIndex": 0,
  "explain": "Status up with Protocol down on Gi0/1 usually means a Layer 2 or keepalive problem (for example a cable or encapsulation issue). Gi0/0 is up/up with an IP, so it is the routable physical interface. Gi0/2 is administratively down.",
  "kind": "read"
 },
 {
  "id": "cli:sub:1",
  "deck": "subnet",
  "kind": "compute",
  "ip": "192.168.10.77",
  "prefix": 26,
  "ask": "usable",
  "question": "How many usable host addresses are in the subnet that contains 192.168.10.77/26?",
  "explain": "A /26 leaves 6 host bits. 2^6 = 64 addresses, minus the network and broadcast = 62 usable hosts.",
  "answerKind": "int",
  "answer": 62,
  "accept": [
   "62"
  ]
 },
 {
  "id": "cli:sub:2",
  "deck": "subnet",
  "kind": "compute",
  "ip": "192.168.10.77",
  "prefix": 26,
  "ask": "network",
  "question": "What is the network address of 192.168.10.77/26?",
  "explain": "A /26 has a block size of 64 in the last octet. The multiples are 0, 64, 128, 192. 77 falls in the 64 block, so the network is 192.168.10.64.",
  "answerKind": "str",
  "answer": "192.168.10.64",
  "accept": [
   "192.168.10.64"
  ]
 },
 {
  "id": "cli:sub:3",
  "deck": "subnet",
  "kind": "compute",
  "ip": "192.168.10.77",
  "prefix": 26,
  "ask": "broadcast",
  "question": "What is the broadcast address of 192.168.10.77/26?",
  "explain": "The /26 block holding .77 runs from .64 to .127. The broadcast is the last address in the block: 192.168.10.127.",
  "answerKind": "str",
  "answer": "192.168.10.127",
  "accept": [
   "192.168.10.127"
  ]
 },
 {
  "id": "cli:sub:4",
  "deck": "subnet",
  "kind": "compute",
  "ip": "172.16.5.130",
  "prefix": 25,
  "ask": "network",
  "question": "What is the network address of 172.16.5.130/25?",
  "explain": "A /25 has a block size of 128. The blocks are 0 and 128. 130 falls in the 128 block, so the network is 172.16.5.128.",
  "answerKind": "str",
  "answer": "172.16.5.128",
  "accept": [
   "172.16.5.128"
  ]
 },
 {
  "id": "cli:sub:5",
  "deck": "subnet",
  "kind": "compute",
  "ip": "172.16.5.130",
  "prefix": 25,
  "ask": "last",
  "question": "What is the last usable host address in the subnet containing 172.16.5.130/25?",
  "explain": "The /25 block is .128 to .255. Broadcast is .255, so the last usable host is one below it: 172.16.5.254.",
  "answerKind": "str",
  "answer": "172.16.5.254",
  "accept": [
   "172.16.5.254"
  ]
 },
 {
  "id": "cli:sub:6",
  "deck": "subnet",
  "kind": "compute",
  "ip": "192.168.1.0",
  "prefix": 27,
  "ask": "usable",
  "question": "How many usable hosts are in a /27 subnet?",
  "explain": "A /27 leaves 5 host bits. 2^5 = 32 addresses, minus network and broadcast = 30 usable hosts.",
  "answerKind": "int",
  "answer": 30,
  "accept": [
   "30"
  ]
 },
 {
  "id": "cli:sub:7",
  "deck": "subnet",
  "kind": "compute",
  "ip": "192.168.1.0",
  "prefix": 27,
  "ask": "wildcard",
  "question": "What is the wildcard mask for a /27?",
  "explain": "A /27 mask is 255.255.255.224. The wildcard is the inverse: 0.0.0.31.",
  "answerKind": "str",
  "answer": "0.0.0.31",
  "accept": [
   "0.0.0.31"
  ]
 },
 {
  "id": "cli:sub:8",
  "deck": "subnet",
  "kind": "compute",
  "ip": "10.0.0.5",
  "prefix": 30,
  "ask": "usable",
  "question": "How many usable host addresses does a /30 provide?",
  "explain": "A /30 leaves 2 host bits. 2^2 = 4 addresses, minus network and broadcast = 2 usable hosts. This is the classic point-to-point link size.",
  "answerKind": "int",
  "answer": 2,
  "accept": [
   "2"
  ]
 },
 {
  "id": "cli:sub:9",
  "deck": "subnet",
  "kind": "compute",
  "ip": "10.0.0.5",
  "prefix": 30,
  "ask": "first",
  "question": "On the point-to-point link 10.0.0.5/30, what is the first usable host address?",
  "explain": "The /30 block holding .5 runs .4 (network) to .7 (broadcast). First usable host is .5: 10.0.0.5.",
  "answerKind": "str",
  "answer": "10.0.0.5",
  "accept": [
   "10.0.0.5"
  ]
 },
 {
  "id": "cli:sub:10",
  "deck": "subnet",
  "kind": "compute",
  "ip": "10.0.0.5",
  "prefix": 30,
  "ask": "last",
  "question": "On the point-to-point link 10.0.0.5/30, what is the last usable host address?",
  "explain": "The /30 block is .4 to .7. Broadcast is .7, so the last usable host is .6: 10.0.0.6. The two link IPs are .5 and .6.",
  "answerKind": "str",
  "answer": "10.0.0.6",
  "accept": [
   "10.0.0.6"
  ]
 },
 {
  "id": "cli:sub:11",
  "deck": "subnet",
  "kind": "compute",
  "ip": "192.0.2.0",
  "prefix": 31,
  "ask": "usable",
  "question": "How many usable addresses does a /31 provide on a point-to-point link?",
  "explain": "RFC 3021 allows /31 on point-to-point links: both addresses are usable, so 2. There is no network or broadcast address reserved on a /31.",
  "answerKind": "int",
  "answer": 2,
  "accept": [
   "2"
  ]
 },
 {
  "id": "cli:sub:12",
  "deck": "subnet",
  "kind": "compute",
  "ip": "192.0.2.1",
  "prefix": 31,
  "ask": "first",
  "question": "On a /31 link using 192.0.2.0/31, what is the first usable address?",
  "explain": "On a /31 both addresses are usable. The pair is 192.0.2.0 and 192.0.2.1, so the first usable address is 192.0.2.0.",
  "answerKind": "str",
  "answer": "192.0.2.0",
  "accept": [
   "192.0.2.0"
  ]
 },
 {
  "id": "cli:sub:13",
  "deck": "subnet",
  "kind": "compute",
  "ip": "192.168.100.200",
  "prefix": 28,
  "ask": "network",
  "question": "What is the network address of 192.168.100.200/28?",
  "explain": "A /28 has a block size of 16. Multiples are ...192, 208. 200 falls in the 192 block, so the network is 192.168.100.192.",
  "answerKind": "str",
  "answer": "192.168.100.192",
  "accept": [
   "192.168.100.192"
  ]
 },
 {
  "id": "cli:sub:14",
  "deck": "subnet",
  "kind": "compute",
  "ip": "192.168.100.200",
  "prefix": 28,
  "ask": "broadcast",
  "question": "What is the broadcast address of 192.168.100.200/28?",
  "explain": "The /28 block holding .200 runs .192 to .207. The broadcast is the last address: 192.168.100.207.",
  "answerKind": "str",
  "answer": "192.168.100.207",
  "accept": [
   "192.168.100.207"
  ]
 }
];
