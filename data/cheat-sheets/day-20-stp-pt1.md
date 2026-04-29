---
title: "Free CCNA | Spanning Tree Protocol (Part 1) | Day 20 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-20
source_transcript: "[[../jeremy-it-videos/037-spanning-tree-protocol-part-1-day-20]]"
source_url: https://www.youtube.com/watch?v=j-bK-EFt9cY
created: 2026-04-28
tags: [ccna, cheat-sheet, day-20]
---

# Day 20 — STP Part 1 (Root Bridge + Port Roles)

## 🎯 What this video covers

Maps to v1.1 **2.5 RPVST+** — root-bridge election, root-port selection, designated/non-designated ports. Foundation for Day 22 RSTP and the only way `show spanning-tree` output makes sense.

## 🧠 Core Concept

**Lowest Bridge ID wins root. Every other switch picks one root port (lowest path cost to root). Every link picks one designated port. Everything else blocks.**

## 🔑 Must-Know Table

| Term | One-line function | Selection rule |
|---|---|---|
| **Root bridge** | Reference point for whole topology | **Lowest Bridge ID** in network |
| **Bridge ID (BID)** | Priority + extended-system-ID (VLAN) + MAC | 4-bit priority + 12-bit VLAN + 48-bit MAC |
| **Default priority** | 32768 + VLAN ID (so VLAN 1 → 32769) | Configurable in steps of **4096** |
| **Root port (RP)** | Switch's best path *to* root | Lowest root cost → lowest neighbor BID → lowest neighbor port ID |
| **Designated port (DP)** | Best port *for* a segment | Lowest root cost on that segment → lowest BID |
| **Non-designated (blocking)** | Loop-prevention port | Loses DP election → blocks |
| **BPDU** | STP Hello (every 2 sec by default) | Carries BID, root cost, sender info |
| **Path cost (classic STP)** | 10M=100, 100M=19, 1G=4, 10G=2 | Memorize these four |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Root port vs Designated port** | RP = one per non-root switch (toward root). DP = one per segment (away from root) |
| **Forwarding vs Blocking** | RP and DP forward. Non-designated blocks (only listens to BPDUs) |
| **PVST+ vs classic STP** | PVST+ = one STP instance **per VLAN** (load-balance by VLAN). Classic = one global instance |
| **Bridge vs Switch** | "Bridge" is the legacy STP term — means switch in modern usage |
| **Hub vs Switch (collision)** | Hub = 1 collision domain. Switch = 1 per port (each link = 1 segment) |

## 🔗 How it all connects

```
Lowest BID = ROOT (all DPs) → others pick RP (lowest cost to root) → each link picks DP → losers BLOCK
```

## 🚨 Exam Traps

- **Highest BID is NOT** root — **lowest** BID wins
- **Priority is NOT** changeable in any value — only multiples of **4096**
- **Default priority is NOT** 32768 — it's 32768 **+ VLAN ID** (so 32769 in VLAN 1)
- **All ports on root bridge are NOT** root ports — they're all **designated**
- **Tie-breaker for RP is NOT** local port ID — it's the **neighbor's** port ID
- **Switches do NOT** generate BPDUs once converged — only the root does (others forward)
- **STP cost is NOT** based on bandwidth directly — it's a fixed table (1G = 4, etc.)

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Selection criterion for root bridge | **Lowest Bridge ID** |
| BID tie-breaker (after priority) | **Lowest MAC address** |
| Root port primary criterion | **Lowest root cost** |
| Root port tie 1 | **Lowest neighbor BID** |
| Root port tie 2 | **Lowest neighbor port ID** |
| 1 Gig STP cost | **4** |
| 100 Mbps STP cost | **19** |
| Default priority in VLAN 10 | **32768 + 10 = 32778** |
| Step size for priority change | **4096** |
| Frames blocked at L2 cause… | **Broadcast storm + MAC flapping** |
| BPDU Hello timer | **2 seconds** |

## ⚡ One-Line Master Recall

**Lowest BID → root (all DPs); each non-root picks RP by lowest cost; each segment picks DP; losers block to break loops.**

## ➕ EXTRA — not in video, but on the exam

- **PortFast** — Edge ports skip listening/learning (covered Day 22). `spanning-tree portfast` on access ports only.
- **BPDU Guard** — Disables port if BPDU arrives on a PortFast port (rogue switch).
- **Root Guard** — Prevents downstream switch from becoming root.
- **`spanning-tree vlan X root primary/secondary`** — Macro that lowers priority to 24576 / 28672.

## 🧾 Recap

- **Root election: lowest priority, then lowest MAC.**
- **Per non-root switch: one RP (lowest root cost).**
- **Per segment: one DP (lowest root cost on the segment).**
- **Everything else: blocked = non-designated.**
- If you can hand-trace root + RP + DP on a 4-switch diagram, move to Day 21/22.

---
Source: Jeremy's IT Lab — Day 20 — https://www.youtube.com/watch?v=j-bK-EFt9cY
