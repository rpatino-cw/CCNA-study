---
title: "Free CCNA | Spanning Tree Protocol (Part 2) | Day 21 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-21
source_transcript: "[[../jeremy-it-videos/039-spanning-tree-protocol-part-2-day-21]]"
source_url: https://www.youtube.com/watch?v=nWpldCc8msY
created: 2026-04-28
tags: [ccna, cheat-sheet, day-21]
---

# Day 21 — STP Part 2: States, Timers, Toolkit, Configuration

## 🎯 What this video covers

Maps to v1.1 blueprint **2.5.b STP port states + roles**. Covers the four STP port states (Blocking, Listening, Learning, Forwarding), three timers (Hello, Forward Delay, Max Age), PortFast + BPDU Guard, and root-bridge configuration for per-VLAN load balancing.

## 🧠 Core Concept

**STP moves a port through Blocking → Listening (15s) → Learning (15s) → Forwarding (50s total worst-case) — PortFast skips the wait, BPDU Guard kills the port if a switch shows up.**

## 🔑 Must-Know Table

| State | Forwards traffic? | Sends BPDUs? | Receives BPDUs? | Learns MACs? |
|---|---|---|---|---|
| **Blocking** | No | No | Yes | No |
| **Listening** | No | Yes | Yes | No |
| **Learning** | No | Yes | Yes | **Yes** |
| **Forwarding** | **Yes** | Yes | Yes | Yes |
| **Disabled** | No | No | No | No |

| Timer | Default | Purpose |
|---|---|---|
| **Hello** | 2 sec | Root bridge sends BPDUs every Hello |
| **Forward Delay** | 15 sec | Length of **each** Listening + Learning state |
| **Max Age** | 20 sec | Wait this long w/o BPDU before reconverging |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **PortFast vs BPDU Guard** | PortFast skips Listening/Learning (faster). BPDU Guard err-disables port if BPDU arrives (safer). Use **together** on access ports |
| **Root Guard vs Loop Guard** | Root Guard rejects superior BPDUs (locks root location). Loop Guard blocks port if BPDUs **stop** arriving (prevents unidirectional-link loops) |
| **enable BPDU Guard on interface vs globally** | Interface: `spanning-tree bpduguard enable`. Global: `spanning-tree portfast bpduguard default` (only PortFast ports) |
| **Listening vs Learning** | Both block data, both 15s, both pass BPDUs. **Only Learning builds MAC table** |
| **PVST+ vs regular STP** | PVST+ MAC `0100.0ccc.cccd` (Cisco). Regular STP `0180.c200.0000` |

## 🔗 How it all connects

```
Cable up → Blocking → Listening (15s) → Learning (15s) → Forwarding   [50s if recovering, 30s if cold start]
                ↑ PortFast bypasses all three transitional states ↑
```

## 🚨 Exam Traps

- **Forward Delay is NOT 30s** — it's **15s per state**, 30s total for both
- **Listening does NOT learn MACs** — only Learning does
- **PortFast on a trunk port is NOT applied** — only takes effect on access ports
- **BPDU Guard does NOT shut just one direction** — port goes err-disabled, needs `shut`/`no shut`
- **Recovery from blocking to forwarding is NOT 30s** — it's **50s** (20s max age + 30s forward delay)
- **Spanning-tree priority is NOT** any value — must be in **increments of 4096**

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Port state that learns MACs but doesn't forward | **Learning** |
| Port ID `0x8002` → priority? | **128** (0x80 = 128) |
| Block a switch from joining network | **BPDU Guard** |
| Total time to go Blocking → Forwarding (recovery) | **50 seconds** |
| Default port priority | **128** |
| PVST+ BPDU dest MAC | **0100.0ccc.cccd** |
| Two ways to speed up port-up time | **PortFast** + lower forward-delay |
| Make SW1 root for VLAN 10 | `spanning-tree vlan 10 root primary` |

## ⚡ One-Line Master Recall

**Block→Listen(15)→Learn(15)→Forward = 50s worst case. PortFast skips it on access ports; BPDU Guard nukes the port if a BPDU shows up.**

## ➕ EXTRA — not in video, but on the exam

- **Rapid PVST+ port states collapse** — RSTP only has Discarding / Learning / Forwarding (Day 22).
- **Edge port = PortFast** in RSTP terminology — same idea, new name.
- **Root Bridge election tiebreaker** — lowest Bridge ID = priority + extended-system-ID + MAC. Ties broken by lowest MAC.
- **Default priority 32768** — `root primary` sets it to 24576 (or 4096 below current root). `root secondary` = 28672.

## 🧾 Recap

- **Four states**: Blocking, Listening, Learning, Forwarding (+ Disabled).
- **Only Learning learns MACs** among the non-forwarding states.
- **Forward Delay = 15s per state**, Max Age = 20s, Hello = 2s.
- **PortFast + BPDU Guard** is the standard pair on access ports.
- If you can answer the Quick-Answer Map cold and recall PVST+ MAC `0100.0ccc.cccd`, move on to Day 22 (RSTP).

---
Source: Jeremy's IT Lab — Day 21 — https://www.youtube.com/watch?v=nWpldCc8msY
