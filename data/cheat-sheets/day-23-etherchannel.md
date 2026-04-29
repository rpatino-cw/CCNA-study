---
title: "Free CCNA | EtherChannel | Day 23 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-23
source_transcript: "[[../jeremy-it-videos/047-etherchannel-day-23]]"
source_url: https://www.youtube.com/watch?v=xuo69Joy_Nc
created: 2026-04-28
tags: [ccna, cheat-sheet, day-23]
---

# Day 23 — EtherChannel (LACP / PAgP / Static)

## 🎯 What this video covers

Maps to v1.1 blueprint **2.4 EtherChannel (LACP)**. Bundles up to **8 active** physical links into one logical port-channel — STP treats it as **one** interface, no blocking. Three negotiation methods: LACP (standard), PAgP (Cisco), Static (`on`).

## 🧠 Core Concept

**EtherChannel = one logical interface across N physical links. STP sees a single port — no blocked links — and traffic load-balances per-flow.**

## 🔑 Must-Know Table

| Protocol | Type | Active mode | Passive mode | Combos that form a channel |
|---|---|---|---|---|
| **LACP** | IEEE 802.3ad standard | `active` | `passive` | active-active, active-passive |
| **PAgP** | Cisco proprietary | `desirable` | `auto` | desirable-desirable, desirable-auto |
| **Static** | No protocol | `on` | (none) | on-on **only** |

| Term | One-line function |
|---|---|
| **Port-channel / Po1** | The virtual logical interface |
| **channel-group N mode X** | Adds physical interface to bundle |
| **Layer 2 EtherChannel** | Switchport (trunk/access). `S` flag in `show etherchannel summary` |
| **Layer 3 EtherChannel** | `no switchport`, IP on Po. `R` flag in summary |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **LACP active vs passive** | Active **initiates** negotiation; passive only **responds**. Two passives = no channel |
| **PAgP desirable vs auto** | Same idea — desirable initiates, auto responds. Two autos = no channel |
| **`on` mode** | Static, no protocol exchange. **Only forms with `on` on the other side** |
| **Layer 2 vs Layer 3 EtherChannel** | L2: trunk/access. L3: `no switchport` + IP on the **port-channel**, not member ports |

## 🔗 How it all connects

```
[Phy g0/0..g0/3] -- channel-group 1 mode active --> [Po1] = STP sees ONE port → all 4 links forward
```

## 🚨 Exam Traps

- **Member interfaces must MATCH** — speed, duplex, switchport mode, allowed VLANs, native VLAN. Mismatch → port suspended (`s`)
- **`passive`-`passive` does NOT form a channel** — same for `auto`-`auto`
- **`on`-`active` is NOT valid** — `on` only pairs with `on`
- **IP address goes on Po, NOT member** — Layer 3 EtherChannel
- **`channel-protocol lacp` + `mode on` is NOT** allowed — locks you to active/passive
- **Channel-group number does NOT need to match across switches** — only locally consistent

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| LACP IEEE standard | **802.3ad** |
| Max active links per LACP bundle | **8** (16 configured, 8 standby) |
| Form L3 EtherChannel — what command first? | `no switchport` on member interfaces |
| Flag `P` next to interface in `show etherchannel summary` | **Bundled** in port-channel |
| Flag `S` vs `R` on Po | **S** = Layer 2 (switchport), **R** = Layer 3 (routed) |
| LACP combos that work | active-active, active-passive |
| PAgP combos that work | desirable-desirable, desirable-auto |
| Default load-balance method (typical) | **src-dst-IP** |

## ⚡ One-Line Master Recall

**LACP active-passive (or both active), PAgP desirable-auto (or both desirable), Static on-on. Member configs must match. STP sees one port.**

## 🧪 Key commands

```
(config-if-range)# channel-group 1 mode active        ! LACP
(config-if-range)# channel-group 1 mode desirable     ! PAgP
(config-if-range)# channel-group 1 mode on            ! static
(config-if-range)# no switchport                       ! make L3 first
(config-if)# interface port-channel 1
(config-if)# ip address 10.0.0.1 255.255.255.252
show etherchannel summary
show etherchannel port-channel
port-channel load-balance src-dst-mac
```

## ➕ EXTRA — not in video, but on the exam

- **LACP system priority + port priority** — lower wins for selecting active 8 of 16 ports.
- **MLAG / vPC** — multi-chassis EtherChannel (Cisco vPC, Arista MLAG). Not on CCNA but appears in v1.1 architecture sections.
- **Layer 4 load balancing** — newer switches can use TCP/UDP src/dst port for hashing.

## 🧾 Recap

- **3 modes**: LACP (active/passive), PAgP (desirable/auto), Static (on).
- **Active+Active works. Passive+Passive does NOT.**
- **L2 channel** = switchport. **L3 channel** = `no switchport` + IP on the port-channel.
- **Member interface settings must match** or port gets suspended.
- If you can pick the working mode combos cold and read `show etherchannel summary` flags, move on to Day 24.

---
Source: Jeremy's IT Lab — Day 23 — https://www.youtube.com/watch?v=xuo69Joy_Nc
