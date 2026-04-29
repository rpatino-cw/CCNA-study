---
title: "Free CCNA | LAN Architectures | Day 52 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-52
source_transcript: "[[../jeremy-it-videos/105-lan-architectures-day-52]]"
source_url: https://www.youtube.com/watch?v=PvyEcLhmNBk
created: 2026-04-28
tags: [ccna, cheat-sheet, day-52]
---

# Day 52 — LAN Architectures (2-tier, 3-tier, Spine-Leaf, SOHO)

## 🎯 What this video covers

Maps to v1.1 **1.2.a-c (2-tier, 3-tier, spine-leaf, SOHO topologies)** + **1.1.h PoE context**. How devices stack into hierarchical campus networks; data center spine-leaf design.

## 🧠 Core Concept

**Hierarchy makes LANs scale: Access connects users, Distribution aggregates and bridges L2↔L3, Core moves packets fast. Spine-leaf flattens this for east-west data center traffic.**

## 🔑 Must-Know Table

| Layer | Function | Lives at | Exam giveaway phrase |
|---|---|---|---|
| **Access** | Where end hosts connect | Switches with many ports | "PoE", "QoS marking", "DAI", "port security" |
| **Distribution** | Aggregates access + L2↔L3 boundary | Multilayer switches | "aggregation", "SVI default gateway", "FHRP" |
| **Core** | Fast Layer-3 backbone | High-speed switches | "fast transport", "no QoS/security here" |
| **Spine** | Top-tier in DC fabric | DC switches | "every leaf connects to every spine" |
| **Leaf** | Where servers connect (DC) | DC switches | "no leaf-to-leaf direct link" |
| **SOHO router** | All-in-one (router/switch/AP/firewall/modem) | Home/small office | "wireless router" |

| Topology term | Meaning |
|---|---|
| **Star** | Many devices to one central |
| **Full mesh** | Every device to every other device |
| **Partial mesh** | Some-to-some (not all) |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **2-tier vs 3-tier** | 2-tier = access + distribution (collapsed core). 3-tier adds **core** for >3 distribution blocks |
| **Distribution vs Core** | Distribution does L2/L3 + security/QoS. Core is fast-transport only (L3, no STP, no security overhead) |
| **3-tier vs Spine-leaf** | 3-tier optimized for north-south. Spine-leaf optimized for **east-west** (server-to-server) |
| **Leaf vs Access switch** | Leaf does the same job in DC fabric — endpoints attach here |
| **North-south vs East-west** | N-S = into/out of network. E-W = server-to-server inside DC |
| **SOHO vs Enterprise** | SOHO = one device does everything. Enterprise splits roles per device |

## 🔗 How it all connects

```
3-tier:  [Hosts] → Access → Distribution → Core → WAN/Internet
Spine-leaf: [Servers] → Leaf ←→ Spine ←→ Leaf → [Servers]   (every leaf to every spine)
```

## 🚨 Exam Traps

- **Core is NOT** where you put security/QoS — those go at the **access** layer
- **Spanning tree is NOT** running at the core — connections are L3
- **Spine-to-spine is NOT** allowed — and **leaf-to-leaf is NOT** allowed either
- **End hosts do NOT** connect to spine switches — only to **leaves**
- **2-tier collapsed core is NOT** the same as having no distribution — the core+distribution roles are merged
- **SOHO router is NOT** an enterprise solution — single device does everything but doesn't scale

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| L2/L3 boundary in 3-tier | **Distribution layer** |
| Where PoE-enabled ports live | **Access layer** |
| Where QoS marking is done | **Access layer** |
| What you do NOT find at the core | **Spanning tree, security, QoS marking** |
| Core layer focus | **Fast transport (L3 only)** |
| Spine-leaf rule | **Every leaf to every spine; no leaf-leaf, no spine-spine** |
| Where servers connect in DC | **Leaf switches** |
| Optimizes east-west traffic | **Spine-leaf** |
| Cisco recommends core when | **>3 distribution blocks** |
| 2-tier collapses what into what | **Core+distribution into one layer** |
| SOHO "wireless router" is | **Router + switch + AP + firewall + (sometimes) modem** |

## ⚡ One-Line Master Recall

**Access = users + security/QoS, Distribution = aggregate + L2/L3 boundary, Core = fast L3 transport; Spine-leaf = full mesh between tiers, no peers within a tier; SOHO = all-in-one box.**

## ➕ EXTRA — not in video, but on the exam

- **PoE recap (1.1.h)** — Switches at access layer power APs/phones over UTP. 802.3af/at/bt.
- **FHRP** — HSRP/VRRP/GLBP at distribution layer give hosts a redundant default-gateway IP.
- **WAN topologies (1.2.d)** — Hub-and-spoke vs full-mesh vs partial-mesh for site-to-site.
- **On-prem vs cloud (1.2.f)** — Where compute lives. Hybrid mixes both.

## 🧾 Recap

- **Access connects users; distribution aggregates + bridges L2↔L3; core forwards fast.**
- **Spine-leaf: every leaf to every spine, no peers in same tier — east-west optimized.**
- **2-tier = collapsed core. 3-tier needed when >3 distribution blocks.**
- **SOHO = one box does everything; doesn't scale to enterprise.**
- If you can pick the right architecture for a given network size and traffic pattern, move to Day 53.

---
Source: Jeremy's IT Lab — Day 52 — https://www.youtube.com/watch?v=PvyEcLhmNBk
