---
title: "Loop Guard (STP Toolkit) | CCNA 200-301 Day 21 (part 4)"
type: ccna-cheat-sheet
day: day-21p4
source_transcript: "[[../jeremy-it-videos/043-loop-guard-stp-toolkit-ccna-200-301-day-21-part-4]]"
source_url: https://www.youtube.com/watch?v=uJ5_Klha0ig
created: 2026-04-28
tags: [ccna, cheat-sheet, day-21]
---

# Day 21 (Part 4) — Loop Guard

## 🎯 What this video covers

Maps to v1.1 blueprint **2.5.d (configure and verify Layer 2 security — STP guards)**. Loop Guard is the last STP toolkit feature — it disables a port if BPDUs unexpectedly stop arriving, preventing loops caused by unidirectional links.

## 🧠 Core Concept

**If a Loop-Guard-enabled port stops receiving BPDUs, it enters the "broken (loop inconsistent)" state instead of becoming a designated forwarder. This blocks the loop a unidirectional link would otherwise create.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **Loop Guard** | Blocks port that stops receiving BPDUs | Root + non-designated ports | "loop inconsistent", "BKN" |
| **Unidirectional link** | Link works one way only | Usually fiber Tx/Rx fault | "fiber damage" |
| **Broken / loop_inc state** | Port up/up but STP-blocked | Loop Guard violation | "BKN", "loop inconsistent" |
| **Max age timer** | 20s — when no BPDU heard, port re-elects | STP global | "stops receiving BPDUs" |
| **`spanning-tree guard loop`** | Per-port command | Interface config | "interface command" |
| **`spanning-tree loopguard default`** | Global enable on all ports | Global config | "default for all ports" |
| **`spanning-tree guard none`** | Disable Loop Guard on a port | Interface config | "exception to global default" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Loop Guard vs Root Guard** | Loop Guard protects **non-designated/root** ports (stop receiving BPDUs → block). Root Guard protects **designated** ports (receive superior BPDU → block). Mutually exclusive |
| **Loop Guard vs UDLD** | Both target unidirectional links. UDLD detects via Layer 2 hellos; Loop Guard reacts to missing BPDUs. Often deployed together |
| **Broken vs err-disabled** | Broken = STP block, port stays up/up, auto-recovers when BPDUs return. Err-disabled = port shut, manual or recovery-timer reactivation |
| **More-specific wins** | Per-interface command overrides `loopguard default` global setting |

## 🔗 How it all connects

```
[Root Bridge] → [BPDUs] → [Designated port] → [Non-designated port] ← Loop Guard listens here
                                                       ↓ no BPDU
                                              [Broken — blocks loop]
```

## 🚨 Exam Traps

- **Loop Guard is NOT** for designated ports — that's Root Guard's job (and they can't coexist on the same port)
- **Broken state is NOT** err-disabled — port stays up/up, auto-recovers when BPDUs return
- **Loop Guard does NOT** prevent the unidirectional link itself — it just blocks the loop the link would cause
- **Loop Guard is NOT** typically deployed on PortFast access ports — those connect to end hosts, no BPDUs expected
- **Root Guard + Loop Guard** = mutually exclusive — configuring one removes the other

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Cmd to enable Loop Guard on one port | **`spanning-tree guard loop`** |
| Cmd to enable Loop Guard on all ports | **`spanning-tree loopguard default`** |
| Cmd to disable Loop Guard on a specific port (when default enabled) | **`spanning-tree guard none`** |
| Port shows BKN + LOOP_Inc — what happened? | **Stopped receiving BPDUs** (likely unidirectional link) |
| Most common cause of unidirectional links | **Damaged fiber** (Tx or Rx fiber) |
| Recovery method when fiber repaired | **Automatic** — port unblocks when BPDUs resume |
| Which ports should run Loop Guard | **Root + non-designated** (ports expected to receive BPDUs) |
| Loop Guard + Root Guard on same port | **Last command wins** (mutually exclusive) |

## ⚡ One-Line Master Recall

**Unidirectional link → BPDUs disappear → Loop Guard fires before max age expires → port goes broken (loop inconsistent) → loop prevented → port auto-recovers when BPDUs return.**

## ➕ EXTRA — not in video, but on the exam

- **UDLD (UniDirectional Link Detection)** — Cisco protocol that uses Layer 2 hellos to detect unidirectional links and err-disable the port. Complementary to Loop Guard; v1.1 may ask about both.
- **BPDU Guard vs Loop Guard** — BPDU Guard err-disables a PortFast port that *receives* a BPDU (host port misuse). Loop Guard blocks a port that *stops receiving* BPDUs. Opposite triggers.
- **STP toolkit summary** — PortFast (skip listening/learning), BPDU Guard (err-disable on BPDU receipt), BPDU Filter (silence BPDUs), Root Guard (no rogue root), Loop Guard (no missing BPDU loops).

## 🧾 Recap

- **Loop Guard fires** when BPDUs unexpectedly stop arriving — port enters broken/loop-inconsistent.
- **Apply to root + non-designated ports** (ones expected to *receive* BPDUs).
- **Configure** per-port (`spanning-tree guard loop`) or globally (`spanning-tree loopguard default`).
- **Mutually exclusive with Root Guard** — last command on the port wins.
- If you can name which guard fits which port type without thinking, move to Day 22.

---
Source: Jeremy's IT Lab — Day 21 part 4 — https://www.youtube.com/watch?v=uJ5_Klha0ig
