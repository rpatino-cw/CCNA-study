---
title: "Free CCNA | Rapid Spanning Tree Protocol | Day 22 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-22
source_transcript: "[[../jeremy-it-videos/045-rapid-spanning-tree-protocol-day-22]]"
source_url: https://www.youtube.com/watch?v=EpazNsLlPps
created: 2026-04-28
tags: [ccna, cheat-sheet, day-22]
---

# Day 22 — RSTP / Rapid PVST+ (Port States, Roles, Link Types)

## 🎯 What this video covers

Maps to v1.1 **2.5 RPVST+ port states + roles**. RSTP (802.1w) and Cisco's Rapid PVST+ — same election rules as STP, faster convergence, simpler port states, two new port roles, three link types.

## 🧠 Core Concept

**RSTP keeps STP's election logic but converges in seconds via a handshake — 3 port states, 4 port roles, and 3 link types.**

## 🔑 Must-Know Table

| STP version | IEEE | Per-VLAN? | Convergence | Notes |
|---|---|---|---|---|
| **STP** | 802.1D | No (1 instance) | 30–50 s | Classic, slow |
| **PVST+** | Cisco | **Yes** | 30–50 s | Cisco upgrade to 802.1D |
| **RSTP** | 802.1w | No | **Few sec** | Fast, but no load-balance |
| **Rapid PVST+** | Cisco | **Yes** | **Few sec** | Cisco default — exam target |
| **MST / MSTP** | 802.1s | Group VLANs into instances | Fast | Best for many VLANs |

| RSTP Port State | Function |
|---|---|
| **Discarding** | Replaces blocking + listening + disabled |
| **Learning** | Building MAC table, no forwarding |
| **Forwarding** | Normal traffic |

| RSTP Port Role | Description |
|---|---|
| **Root** | Best path to root (same as STP) |
| **Designated** | Best port on a segment (same as STP) |
| **Alternate** | Discarding, gets superior BPDU from **another switch** (backup for root port) |
| **Backup** | Discarding, gets superior BPDU from **same switch** (only when hub present) |

| RSTP Link Type | Used on | How configured |
|---|---|---|
| **Edge** | Port to end host | `spanning-tree portfast` |
| **Point-to-point** | Switch-to-switch (full-duplex) | Auto-detected; `link-type point-to-point` |
| **Shared** | Half-duplex (hub) | Auto-detected; `link-type shared` |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Alternate vs Backup port** | Alternate = superior BPDU from **different** switch. Backup = from **same** switch (hub only) |
| **Edge port vs PortFast** | Same thing in RSTP — `spanning-tree portfast` *is* how you make an edge port |
| **STP cost vs RSTP cost** | RSTP uses larger values: 1G = 20,000 (vs 4 for STP); 10G = 2,000 |
| **Discarding vs Blocking** | RSTP collapses old blocking/listening/disabled into one "discarding" state |
| **All switches send BPDUs (RSTP) vs only root (STP)** | In RSTP every switch generates and sends BPDUs |
| **BPDU version 0 vs 2** | Classic STP = version 0. RSTP = version 2 |

## 🔗 How it all connects

```
Edge → forwarding immediately ; P2P → fast handshake ; Shared → falls back to slow STP
```

## 🚨 Exam Traps

- **RSTP root port election is NOT** different from STP — same lowest-cost / neighbor BID / neighbor port ID rules
- **Backup port is NOT** the common case — only appears with a hub on a shared segment
- **`spanning-tree link-type edge` is NOT** a real command — use `spanning-tree portfast`
- **RSTP ages BPDUs in 6 sec, NOT** 20 — 3 missed Hellos vs classic STP's 10
- **Listening state does NOT** exist in RSTP — collapsed into discarding/learning
- **Rapid PVST+ is NOT** the same as MSTP — RPVST+ runs an instance per VLAN; MST groups VLANs into a few instances
- **UplinkFast / BackboneFast / PortFast all ARE** built into RSTP by default — don't configure them on RSTP

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Three RSTP port states | **Discarding, Learning, Forwarding** |
| Four RSTP port roles | **Root, Designated, Alternate, Backup** |
| Backup port requires what? | **A hub (shared link)** |
| Configure an edge port | **`spanning-tree portfast`** |
| RSTP BPDU version | **2** (classic = 0) |
| Classic STP optional features built into RSTP | **PortFast, UplinkFast, BackboneFast** |
| Default Cisco STP mode on modern switches | **Rapid PVST+** |
| Industry standard with VLAN load-balance | **MST / MSTP (802.1s)** |
| RSTP convergence time | **A few seconds** |
| Cisco command to set mode | **`spanning-tree mode rapid-pvst`** |

## ⚡ One-Line Master Recall

**RSTP = 3 states (discarding/learning/forwarding), 4 roles (root/desig/alternate/backup), 3 link types (edge/p2p/shared); every switch sends BPDUs; PortFast/UplinkFast/BackboneFast built-in.**

## ➕ EXTRA — not in video, but on the exam

- **BPDU Guard** — Pairs with PortFast/edge ports; err-disables on BPDU receipt.
- **Root Guard** — Stops a port from becoming a root port (protects root placement).
- **Loop Guard** — Prevents alternate/root ports from moving to forwarding when BPDUs disappear.
- **`spanning-tree vlan X root primary`** — Sets priority to 24576 (or 4096 below current root).

## 🧾 Recap

- **RSTP = STP election rules + faster convergence via handshake.**
- **3 states, 4 roles, 3 link types — memorize the trio.**
- **Edge port = PortFast; shared = hub (rare); P2P = full-duplex switch link.**
- **Cisco default: Rapid PVST+ (`spanning-tree mode rapid-pvst`).**
- If you can label every port role on a 4-switch + 1-hub topology, you're green-light for Day 23.

---
Source: Jeremy's IT Lab — Day 22 — https://www.youtube.com/watch?v=EpazNsLlPps
