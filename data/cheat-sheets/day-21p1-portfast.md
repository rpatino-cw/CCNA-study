---
title: "PortFast (STP Toolkit) | CCNA 200-301 Day 21 (part 1)"
type: ccna-cheat-sheet
day: day-21p1
source_transcript: "[[../jeremy-it-videos/040-portfast-stp-toolkit-ccna-200-301-day-21-part-1]]"
source_url: https://www.youtube.com/watch?v=zqzppl4LOwk
created: 2026-04-28
tags: [ccna, cheat-sheet, day-21p1]
---

# Day 21 (Part 1) — PortFast (STP Toolkit)

## 🎯 What this video covers

Maps to v1.1 blueprint **2.5.c Configure and verify PortFast** (and the broader 2.5 STP toolkit). Solves the 30-second user-wait problem when an end host first plugs into an STP-enabled switchport.

## 🧠 Core Concept

**PortFast skips Listening + Learning, putting an access port straight into Forwarding so end hosts get network access immediately.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **PortFast** | Skips listening/learning, jumps to forwarding | STP toolkit feature | "immediate forwarding", "end host" |
| **Listening (15s)** | STP state, no MAC learn, no data | Default port boot path | "15 seconds" |
| **Learning (15s)** | STP state, MAC learn, no data | After listening | "15 seconds, total 30s wait" |
| **Forwarding** | Sends/receives data | Final STP state | "ready to send and receive" |
| **PortFast edge** | The CCNA-flavored PortFast | Default keyword | "edge" auto-added in running-config |
| **PortFast network** | Used for Bridge Assurance | NOT a CCNA topic | "ignore for CCNA" |
| **PortFast trunk** | Variant for trunks (router-on-stick, virt) | Per-interface only | "router-on-a-stick", "VM trunk" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Interface command vs global command** | `spanning-tree portfast` = one port. `spanning-tree portfast default` = all access ports |
| **Default mode vs trunk mode** | Default PortFast active only on access ports. Need `portfast trunk` for trunks |
| **PortFast edge vs network** | Edge = CCNA. Network = Bridge Assurance, ignore |
| **PortFast vs BPDU Guard** | PortFast skips delay. BPDU Guard kills port if BPDU heard (Day 22) |

## 🔗 How it all connects

```
End host plugs in → port up/up → (no PortFast: 15s listen + 15s learn = 30s wait) → forwarding
                                  (PortFast on access: skip → forwarding immediately)
```

## 🚨 Exam Traps

- **PortFast is NOT** safe on switch-to-switch links — causes temporary L2 loops
- **Global `portfast default` does NOT** enable on trunks — access ports only
- **PortFast does NOT** disable STP on the port — BPDUs still send/receive
- **`portfast` on a trunk does NOT** activate without the `trunk` keyword
- **`portfast disable` does NOT** carry the `edge` keyword — it's the lone exception
- **Edge keyword is NOT** something you have to type — switch auto-adds it in running-config

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Without PortFast, how long until forwarding | **30 seconds (15 listen + 15 learn)** |
| PortFast on a single access port | **`spanning-tree portfast`** (interface) |
| PortFast on all access ports at once | **`spanning-tree portfast default`** (global) |
| Disable PortFast on one port after global enable | **`spanning-tree portfast disable`** |
| Configure PortFast on a router-on-stick trunk | **`spanning-tree portfast trunk`** |
| Where is PortFast safe | **Ports to end hosts (PCs, IP phones, routers, virtualization servers)** |
| Where is PortFast UNSAFE | **Ports connected to other switches** |
| Default keyword auto-added in config | **`edge`** |

## ⚡ One-Line Master Recall

**PortFast = end-host shortcut: skip listen+learn, forward immediately, never on switch-to-switch.**

## ➕ EXTRA — not in video, but on the exam

- **BPDU Guard** — companion feature (2.5.d). If a PortFast port receives ANY BPDU, BPDU Guard err-disables it. Best-practice combo: PortFast + BPDU Guard on every access port.
- **Root Guard / Loop Guard / BPDU Filter** — rest of STP toolkit; v1.1 lists 2.5 generically. Know names + one-line purpose.
- **Auto-recovery** — `errdisable recovery cause bpduguard` re-enables a port shut by BPDU Guard.
- **`show spanning-tree interface <int> detail`** — verifies PortFast status (line "port is in portfast edge mode").

## 🧾 Recap

- Default STP makes an end host wait **30 seconds** before forwarding — bad UX.
- **PortFast** = forward immediately by skipping listen + learn.
- Two ways: `spanning-tree portfast` (per-port) or `spanning-tree portfast default` (all access ports).
- **Never** enable on switch-to-switch links — temporary loops.
- For trunks to routers/virtualization servers, use **`spanning-tree portfast trunk`**.
- If you can answer 6/8 stems above without peeking, move to Day 21 Part 2 (BPDU Guard).

---
Source: Jeremy's IT Lab — Day 21 Part 1 — https://www.youtube.com/watch?v=zqzppl4LOwk
