---
title: "Free CCNA | VLANs (Part 2) | Day 17 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-17p2
source_transcript: "[[../jeremy-it-videos/031-vlans-part-2-day-17]]"
source_url: https://www.youtube.com/watch?v=Jl9OOzNaBDU
created: 2026-04-28
tags: [ccna, cheat-sheet, day-17p2]
---

# Day 17 — VLANs (Part 2): Trunks, 802.1Q, ROAS

## 🎯 What this video covers

Maps to v1.1 blueprint **2.2 Configure and verify VLANs (normal range) spanning multiple switches** — trunks, 802.1Q tagging, native VLAN, allowed VLANs, Router-on-a-Stick (ROAS). Bridges Day-16 access-port basics into multi-switch, multi-VLAN networks.

## 🧠 Core Concept

**A trunk port carries multiple VLANs over one link by tagging frames with 802.1Q; the native VLAN is the one VLAN sent untagged.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **Access port** | Belongs to ONE VLAN, untagged | Switch port to PC/phone | "single VLAN" |
| **Trunk port** | Carries MANY VLANs, tagged | Switch↔switch / switch↔router | "tagged port" |
| **802.1Q (dot1q)** | Industry-standard VLAN tag | Inserted between Source MAC and Type fields | "4-byte tag" |
| **TPID** | Tag Protocol ID — always `0x8100` | First 16 bits of dot1q tag | "identifies frame as tagged" |
| **VID** | VLAN ID — 12 bits | Inside dot1q TCI | "1–4094 range" |
| **Native VLAN** | The one VLAN sent **untagged** on a trunk | Per trunk port | "must match between switches" |
| **Allowed VLANs** | List of VLANs permitted on the trunk | Per trunk port | "default = all" |
| **ROAS subinterface** | Router logical port per VLAN | Router `g0/0.10` etc | "router-on-a-stick" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Access vs Trunk** | Access = untagged, one VLAN. Trunk = tagged (except native), many VLANs |
| **802.1Q vs ISL** | dot1q = industry standard, modern. ISL = old Cisco-proprietary, basically dead |
| **Native VLAN vs Default VLAN** | Native = untagged VLAN on a trunk (default VLAN 1). Default VLAN = the VLAN ports start in (also VLAN 1) — same number by default but different concepts |
| **VLAN range** | 1–1005 = normal. 1006–4094 = extended. 0 + 4095 reserved |
| **ROAS subinterface vs SVI** | ROAS = router's `g0/0.10` with `encapsulation dot1q 10`. SVI = Layer-3 switch `interface vlan 10` (Day 18) |

## 🔗 How it all connects

```
PC → access port (untagged) → SW trunk (dot1q tag) → SW trunk → ROAS subif (dot1q strip + L3 route) → tag again → out
```

## 🚨 Exam Traps

- **Native VLAN is NOT** tagged — that's the whole point
- **Mismatched native VLAN** is NOT a hard failure — switches still forward but you get unpredictable VLAN behavior
- **`switchport mode trunk`** can be REJECTED on switches that support both ISL+dot1q — must set encapsulation first: `switchport trunk encapsulation dot1q`
- **`show vlan brief`** does NOT list trunk ports under VLANs — use `show interfaces trunk`
- **Subinterface number** does NOT have to match VLAN number (but you should make them match)
- **You must enable** the physical router interface with `no shutdown` before subinterfaces work

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| 802.1Q tag size | **4 bytes (32 bits)** |
| TPID value | **`0x8100`** |
| VID field length | **12 bits** |
| Usable VLAN range | **1–4094** |
| Default native VLAN | **VLAN 1** |
| Send VLAN 10 untagged on trunk | **`switchport trunk native vlan 10`** |
| Restore default allowed VLAN list | **`switchport trunk allowed vlan all`** |
| ROAS subif config (VLAN 10) | **`encapsulation dot1q 10`** then `ip address ...` |
| Verify trunks | **`show interfaces trunk`** |

## ⚡ One-Line Master Recall

**Access = one VLAN untagged. Trunk = many VLANs tagged (except native). ROAS = one router interface, one subif per VLAN.**

## ➕ EXTRA — not in video, but on the exam

- **Voice VLAN** — access port can carry both data + voice VLAN (`switchport voice vlan 100`). v1.1 expects you to recognize this as different from a trunk.
- **DTP** — dynamic trunking protocol auto-negotiates trunk/access. Covered Day 19. Best practice: disable with `switchport nonegotiate`.
- **Native VLAN security best practice** — change to an unused VLAN (not 1) to mitigate VLAN-hopping.

## 🧾 Recap

- **Trunk = tagged multi-VLAN link.** Native VLAN is the one exception that goes untagged.
- **dot1q tag = 4 bytes**, sits between source MAC and EtherType, carries 12-bit VID.
- **ROAS** = one physical router port + subinterfaces (`g0/0.10`) with `encapsulation dot1q <vlan>`.
- **`show interfaces trunk`** is the verify command — `show vlan brief` won't show trunk ports.
- If you can write a trunk + ROAS config from memory, move to Day 18.

---
Source: Jeremy's IT Lab — Day 17 — https://www.youtube.com/watch?v=Jl9OOzNaBDU
