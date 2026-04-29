---
title: "Free CCNA | First Hop Redundancy Protocols | Day 29 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-29
source_transcript: "[[../jeremy-it-videos/059-first-hop-redundancy-protocols-day-29]]"
source_url: https://www.youtube.com/watch?v=43WnpwQMolo
created: 2026-04-28
tags: [ccna, cheat-sheet, day-29]
---

# Day 29 — FHRP (HSRP / VRRP / GLBP)

## 🎯 What this video covers

Maps to v1.1 blueprint **3.5 first hop redundancy**. FHRPs let two routers share a virtual IP/MAC so end hosts get a redundant default gateway. Three protocols: **HSRP** (Cisco), **VRRP** (open), **GLBP** (Cisco, load-balancing within a subnet).

## 🧠 Core Concept

**FHRP shares one virtual IP + virtual MAC across two routers; if the active dies, the standby takes over and broadcasts a gratuitous ARP so switches relearn the path — end hosts never change their default gateway.**

## 🔑 Must-Know Table

| FHRP | Vendor | Roles | Multicast IP | Virtual MAC format | Load balance? |
|---|---|---|---|---|---|
| **HSRPv1** | Cisco | Active / Standby | `224.0.0.2` | `0000.0c07.acXX` (XX=group, 2 hex) | Per-VLAN only |
| **HSRPv2** | Cisco | Active / Standby | `224.0.0.102` | `0000.0c9f.fXXX` (3 hex group) | Per-VLAN only |
| **VRRP** | Open (RFC) | Master / Backup | `224.0.0.18` | `0000.5e00.01XX` | Per-VLAN only |
| **GLBP** | Cisco | AVG + up to 4 AVF | `224.0.0.102` | `0007.b400.XXYY` (group + AVF) | **Yes — within subnet** |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **HSRP vs VRRP** | Functionality nearly identical. **HSRP = Cisco**, **VRRP = open**. Different terms, multicast addresses, and MAC formats |
| **HSRP/VRRP vs GLBP** | HSRP/VRRP active-standby (one router forwards). **GLBP load-balances multiple active routers in one subnet** via different vMACs |
| **Active vs Master** | HSRP says **active**. VRRP says **master**. Same role |
| **Preemption ON vs OFF** | **OFF (default)**: original active won't take role back after recovery. **ON**: it will, if priority is higher |
| **HSRP priority tiebreaker** | Higher priority wins. **Tied → highest IP wins**. Default priority = 100 |

## 🔗 How it all connects

```
[PCs default gateway → vIP] → [Active R1 ↔ Standby R2] -- hello multicast -- if R1 dies → R2 sends gratuitous ARP → switches relearn vMAC path
```

## 🚨 Exam Traps

- **HSRP priority does NOT have to match** between routers — higher wins
- **Preemption is NOT default** — without it, recovered router stays standby
- **End hosts do NOT change ARP entries** when failover happens — vIP→vMAC stays
- **HSRP and VRRP do NOT load-balance within a subnet** — only GLBP does
- **HSRPv1 group range is NOT 0-4095** — it's **0-255**. v2 = 0-4095
- **VRRP master does NOT use its own IP** — it uses the configured vIP (unless vIP = master's real IP, in which case priority is forced to 255)

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Cisco proprietary FHRP | **HSRP** (and **GLBP**) |
| Open-standard FHRP | **VRRP** |
| Load-balance within one subnet | **GLBP** |
| HSRP virtual MAC `0000.0c07.acab` group? | **171** (0xab) |
| VRRP multicast IP | **224.0.0.18** |
| HSRP standby becomes active — what does it send? | **Gratuitous ARP** |
| HSRP active election order | **Highest priority → highest IP** |
| Default HSRP priority | **100** |

## ⚡ One-Line Master Recall

**HSRP active/standby Cisco 224.0.0.2 (v1) or .102 (v2). VRRP master/backup open 224.0.0.18. GLBP AVG/AVF Cisco — load balances inside subnet. Failover = gratuitous ARP.**

## 🧪 Key HSRP commands

```
(config-if)# standby version 2
(config-if)# standby 1 ip 172.16.0.254
(config-if)# standby 1 priority 200
(config-if)# standby 1 preempt
show standby
```

## ➕ EXTRA — not in video, but on the exam

- **Object tracking** — `track` interfaces/routes; lower priority if tracked object goes down (so failover happens for reasons other than full router failure).
- **VRRPv3** — adds IPv6 support (RFC 5798).
- **GLBP load-balancing methods** — round-robin (default), weighted, host-dependent.
- **Default-gateway from DHCP** — DHCP option 3 hands the **virtual IP** to clients.

## 🧾 Recap

- **HSRP = Cisco active/standby**, **VRRP = open master/backup**, **GLBP = Cisco load-balance within subnet**.
- Memorize the **multicast IPs and vMAC formats** — high-frequency exam targets.
- **Preemption is OFF by default** — must be enabled to reclaim active role.
- New active router announces with **gratuitous ARP** so switches relearn the vMAC path.
- If you can fill in the Must-Know Table from memory, move on to Day 30.

---
Source: Jeremy's IT Lab — Day 29 — https://www.youtube.com/watch?v=43WnpwQMolo
