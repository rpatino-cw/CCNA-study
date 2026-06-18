# IOS CLI Reference Sheet

Knowledge base for the shared browser IOS-console engine (`js/lab-engine.js`) and a study
reference. Scope: CCNA 200-301 + CCNP ENCOR 350-401. Hostname is a placeholder (`R1`/`Switch`);
the engine substitutes the device's configured hostname.

---

## 1. Command mode tree

| Mode | Prompt | Enter (from) | Exit one level | To priv EXEC |
|------|--------|--------------|----------------|--------------|
| User EXEC | `R1>` | login | `exit`/`logout` | — |
| Privileged EXEC | `R1#` | `enable` / `en` (user) | `disable` | — |
| Global config | `R1(config)#` | `configure terminal` / `conf t` (priv) | `exit` | `end` / Ctrl-Z |
| Interface | `R1(config-if)#` | `interface Gi0/1` | `exit` | `end` |
| Subinterface | `R1(config-subif)#` | `interface Gi0/1.10` | `exit` | `end` |
| Line | `R1(config-line)#` | `line vty 0 15` / `line con 0` | `exit` | `end` |
| Router | `R1(config-router)#` | `router ospf 1` / `router eigrp 100` / `router bgp 65001` | `exit` | `end` |
| Router AF | `R1(config-router-af)#` | `address-family ipv4` (from config-router) | `exit` | `end` |
| VLAN | `Switch(config-vlan)#` | `vlan 10` | `exit` | `end` |
| Class-map | `R1(config-cmap)#` | `class-map match-all VOICE` | `exit` | `end` |
| Policy-map | `R1(config-pmap)#` | `policy-map QOS-OUT` | `exit` | `end` |
| Policy-map class | `R1(config-pmap-c)#` | `class VOICE` (from config-pmap) | `exit` | `end` |
| Control-plane | `R1(config-cp)#` | `control-plane` | `exit` | `end` |
| VRF | `R1(config-vrf)#` | `vrf definition CUST-A` (XE) / `ip vrf CUST-A` (IOS) | `exit` | `end` |
| Std named ACL | `R1(config-std-nacl)#` | `ip access-list standard NAME` | `exit` | `end` |
| Ext named ACL | `R1(config-ext-nacl)#` | `ip access-list extended NAME` | `exit` | `end` |
| Route-map | `R1(config-route-map)#` | `route-map NAME permit 10` | `exit` | `end` |

`end` and Ctrl-Z always jump to privileged EXEC. `exit` goes up one level only. Config commands
are refused from privileged EXEC until you enter `configure terminal`.

IOS vs IOS-XE: VRF is `ip vrf NAME` (IOS) vs `vrf definition NAME` + address-family (IOS-XE 15.1+).

---

## 2. Abbreviation rule

A command/keyword may be shortened to the **shortest unique prefix** for the current mode.
The engine should prefix-match against the current mode's command set, NOT a fixed lookup table:

- exactly 1 match -> expand and run
- 0 matches -> `% Invalid input detected at '^' marker.`
- 2+ matches -> `% Ambiguous command:  "<typed>"`

Common shortcuts: `en`=enable, `dis`=disable, `conf t`=configure terminal, `int`=interface,
`sh`/`sho`=show, `sh run`=show running-config, `sh ip int br`=show ip interface brief,
`sh ip ro`=show ip route, `sh ver`=show version, `sh ip os ne`=show ip ospf neighbor,
`sh ip bg sum`=show ip bgp summary, `sh ip ei ne`=show ip eigrp neighbors,
`sh vl br`=show vlan brief, `sh int tr`=show interfaces trunk, `sh eth sum`=show etherchannel summary,
`sh span`=show spanning-tree, `sh stan br`=show standby brief, `sh cdp ne`=show cdp neighbors,
`no sh`=no shutdown, `wr`=write memory, `do <cmd>`=run an exec command from config mode.

Ambiguous examples: `sh v` (version/vlan/vrrp/vtp), `con` (configure/...).

---

## 3. Show commands (sample output the engine prints when no device state computes it)

### show ip interface brief  (`sh ip int br`)
```
Interface              IP-Address      OK? Method Status                Protocol
GigabitEthernet0/0     192.168.1.1     YES manual up                    up
GigabitEthernet0/1     10.0.0.1        YES NVRAM  up                    up
GigabitEthernet0/2     unassigned      YES unset  administratively down down
Loopback0              1.1.1.1         YES manual up                    up
```

### show ip route  (`sh ip ro`)
```
Codes: L - local, C - connected, S - static, O - OSPF, D - EIGRP, B - BGP
       IA - OSPF inter area, E1/E2 - OSPF external, * - candidate default
Gateway of last resort is 10.0.0.2 to network 0.0.0.0

S*    0.0.0.0/0 [1/0] via 10.0.0.2
C        1.1.1.1/32 is directly connected, Loopback0
      10.0.0.0/8 is variably subnetted, 2 subnets, 2 masks
C        10.0.0.0/30 is directly connected, GigabitEthernet0/1
L        10.0.0.1/32 is directly connected, GigabitEthernet0/1
O     192.168.2.0/24 [110/2] via 10.0.0.2, 00:12:34, GigabitEthernet0/1
C     192.168.1.0/24 is directly connected, GigabitEthernet0/0
```

### show ip ospf neighbor  (`sh ip os ne`)
```
Neighbor ID     Pri   State           Dead Time   Address         Interface
2.2.2.2           1   FULL/DR         00:00:37    10.0.0.2        GigabitEthernet0/1
3.3.3.3           1   FULL/DROTHER    00:00:36    10.1.1.3        GigabitEthernet0/2
4.4.4.4           0   FULL/  -        00:00:31    10.2.2.4        Serial0/0/0
```

### show ip ospf database  (`sh ip os dat`)
```
            OSPF Router with ID (1.1.1.1) (Process ID 1)
                Router Link States (Area 0)
Link ID         ADV Router      Age         Seq#       Checksum Link count
1.1.1.1         1.1.1.1         1208        0x80000003 0x00A1B2 3
2.2.2.2         2.2.2.2         903         0x80000005 0x00C3D4 2
                Net Link States (Area 0)
Link ID         ADV Router      Age         Seq#       Checksum
10.0.0.2        2.2.2.2         890         0x80000001 0x00F1A2
```

### show ip bgp summary  (`sh ip bg sum`)
```
BGP router identifier 1.1.1.1, local AS number 65001
BGP table version is 14, main routing table version 14

Neighbor        V           AS MsgRcvd MsgSent   TblVer  InQ OutQ Up/Down  State/PfxRcd
10.0.0.2        4        65002     143     141       14    0    0 02:02:11        3
10.0.1.2        4        65001     201     199       14    0    0 01:55:44        4
172.16.0.1      4        65003       0       0        0    0    0 never    Idle
```

### show ip bgp  (`sh ip bg`)
```
BGP table version is 14, local router ID is 1.1.1.1
Status codes: s suppressed, * valid, > best, i - internal
Origin codes: i - IGP, e - EGP, ? - incomplete

   Network          Next Hop            Metric LocPrf Weight Path
*> 10.10.10.0/24    0.0.0.0                  0         32768 i
*> 192.168.1.0      10.0.0.2                 0             0 65002 i
*i 192.168.2.0      10.0.1.2                 0    100      0 65002 i
```

### show ip eigrp neighbors  (`sh ip ei ne`)
```
EIGRP-IPv4 Neighbors for AS(100)
H   Address                 Interface        Hold Uptime   SRTT   RTO  Q  Seq
                                             (sec)         (ms)        Cnt Num
0   192.168.1.2             Gi0/1              14 00:15:32   45   270  0   22
1   192.168.2.2             Gi0/2              11 00:10:08  120   720  0   18
```

### show ip eigrp topology  (`sh ip ei to`)
```
EIGRP-IPv4 Topology Table for AS(100)/ID(1.1.1.1)
Codes: P - Passive, A - Active
P 10.0.0.0/24, 1 successors, FD is 28160
        via Connected, GigabitEthernet0/0
P 192.168.2.0/24, 1 successors, FD is 30720
        via 192.168.1.2 (30720/28160), GigabitEthernet0/1
```
`(FD/RD)`; feasible successor when RD < current FD.

### show vlan brief  (`sh vl br`)
```
VLAN Name                             Status    Ports
---- -------------------------------- --------- -------------------------------
1    default                          active    Gi0/3, Fa0/1
10   Sales                            active    Fa0/4, Fa0/5
20   Engineering                      active    Fa0/7, Fa0/8
99   Management                       active
```

### show interfaces trunk  (`sh int tr`)
```
Port        Mode         Encapsulation  Status        Native vlan
Gi0/1       on           802.1q         trunking      1
Port        Vlans allowed on trunk
Gi0/1       1-4094
Port        Vlans in spanning tree forwarding state and not pruned
Gi0/1       1,10,20,30,99
```

### show etherchannel summary  (`sh eth sum`)
```
Flags:  D - down  P - bundled in port-channel  S - Layer2  U - in use
Number of channel-groups in use: 1
Group  Port-channel  Protocol    Ports
------+-------------+-----------+-------------------------------
1      Po1(SU)       LACP        Gi0/1(P)    Gi0/2(P)
```

### show spanning-tree  (`sh span`)
```
VLAN0001
  Spanning tree enabled protocol rstp
  Root ID    Priority    32769
             Address     aabb.cc00.0100
             This bridge is the root
  Bridge ID  Priority    32769  (priority 32768 sys-id-ext 1)
Interface           Role Sts Cost      Prio.Nbr Type
------------------- ---- --- --------- -------- ----
Gi0/1               Desg FWD 4         128.1    P2p
Gi0/3               Root FWD 4         128.3    P2p
Gi0/4               Altn BLK 4         128.4    P2p
```

### show standby brief  (`sh stan br`)
```
Interface   Grp  Pri P State   Active          Standby         Virtual IP
Gi0/0       1    110 P Active  local           10.0.0.2        10.0.0.10
```

### show vrrp brief  (`sh vrrp br`)
```
Interface          Grp  A-F  Pri Own Pre State   Master addr     Group addr
GigabitEthernet0/0 1    IPv4 150  N   Y  Master  10.0.0.1(local) 10.0.0.100
```

### show cdp neighbors  (`sh cdp ne`)
```
Capability Codes: R - Router, S - Switch, H - Host, P - Phone
Device ID    Local Intrfce   Holdtme   Capability  Platform   Port ID
Switch-1     Gig 0/0         132        S I        WS-C2960   Gig 0/1
Router-2     Gig 0/1         158        R S I      ISR4331    Gig 0/0
```

### show mac address-table  (`sh mac`)
```
          Mac Address Table
Vlan    Mac Address       Type        Ports
----    -----------       --------    -----
  10    aabb.cc00.0200    DYNAMIC     Gi0/2
  10    aabb.cc00.0300    STATIC      Gi0/3
```

### show ip nat translations  (`sh ip nat tr`)
```
Pro  Inside global       Inside local        Outside local        Outside global
tcp  203.0.113.1:1025    10.0.0.2:1025       8.8.8.8:80           8.8.8.8:80
udp  203.0.113.1:4500    10.0.0.2:4500       8.8.4.4:53           8.8.4.4:53
```

### show access-lists  (`sh acc`)
```
Standard IP access list 10
    10 permit 192.168.1.0, wildcard bits 0.0.0.255 (25 matches)
    20 deny   any (3 matches)
Extended IP access list 100
    10 permit tcp 10.0.0.0 0.0.0.255 any eq 80 (142 matches)
    30 deny ip any any log (7 matches)
```

### show ip protocols  (`sh ip pro`)
```
Routing Protocol is "ospf 1"
  Router ID 1.1.1.1
  Number of areas in this router is 1. 1 normal 0 stub 0 nssa
  Routing for Networks:
    10.0.0.0/30 area 0
  Distance: (default is 110)
```

### show version  (`sh ver`)
```
Cisco IOS XE Software, Version 16.09.04
cisco ISR4331/K9 (1RU) processor with 1681388K/6147K bytes of memory.
3 Gigabit Ethernet interfaces
Configuration register is 0x2102
```

---

## 4. Context help ( ? )

- `?` alone (or after a space): list commands/keywords valid in the current mode.
- `word?` (no space): list commands starting with that prefix (completion).
- `command ?` (space): list next keywords/args; `<cr>` means the command is runnable as typed.

User EXEC `?`: connect, disable, disconnect, enable, exit, logout, ping, show, ssh, telnet, terminal, traceroute.

Priv EXEC `?`: adds clear, clock, configure, copy, debug, delete, dir, erase, no, reload, write, undebug (+ all user EXEC).

Global config `?`: aaa, access-list, banner, cdp, class-map, control-plane, crypto, enable, hostname, interface, ip, ipv6, line, logging, ntp, policy-map, router, service, snmp-server, spanning-tree, username, vlan, vrf, `<cr>`.

`show ?`: access-lists, arp, bgp, cdp, clock, controllers, eigrp, etherchannel, interfaces, ip, mac-address-table, ntp, ospf, processes, protocols, running-config, spanning-tree, standby, startup-config, version, vlan, vrrp.

`show ip ?`: access-lists, arp, bgp, cef, dhcp, eigrp, interface, nat, ospf, protocols, route, ssh, vrf.

---

## 5. Error messages (exact strings)

- `% Invalid input detected at '^' marker.` — bad token, wrong mode, or zero-match abbreviation. Caret under the offending token.
- `% Incomplete command.` — recognized command but missing required args (e.g. `ip address` with no IP/mask; `router ospf` with no PID).
- `% Ambiguous command:  "<typed>"` — prefix matches 2+ commands.
- `% Unknown command or computer name, or unable to find computer address` — unrecognized exec input IOS tried to DNS-resolve.
- `% Bad mask <mask> for address <ip>` — invalid subnet mask.

---

## Sources
Study-CCNA, NetworksTraining, Cisco IOS-XE CLI Basics, CertificationKits, Cisco support docs
(show ip ospf neighbor 13688-16), IPCisco (EIGRP/VRRP), Study-CCNP (EtherChannel), HowToNetwork
(spanning-tree), Layer23-switch, N-Study + ConnectedDots (error strings). Full URLs in the session
research log.
