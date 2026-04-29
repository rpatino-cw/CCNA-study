---
title: "Free CCNA | Interfaces and Cables | Day 2 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-02
source_transcript: "[[../jeremy-it-videos/004-interfaces-and-cables-day-2]]"
source_url: https://www.youtube.com/watch?v=ieTH5lVhNaY
created: 2026-04-28
tags: [ccna, cheat-sheet, day-02]
---

# Day 2 — Interfaces and Cables

## 🎯 What this video covers

Maps to v1.1 blueprint **1.3 cabling types** + **1.4 troubleshoot interface and cable issues**. Foundation for every later wired-LAN topic — VLANs, STP, EtherChannel all assume you know UTP vs fiber, straight-through vs crossover, and Auto MDI-X.

## 🧠 Core Concept

**Copper UTP is cheap and short (≤100 m). Fiber is expensive and long. Pin pairings decide whether you need a straight-through or crossover — Auto MDI-X masks the choice on modern gear.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **UTP** | Unshielded Twisted Pair copper, 4 pairs / 8 wires | RJ-45 ports | "100 meters max", "Cat 5/6" |
| **10BASE-T / 100BASE-T** | Use 2 pairs (pins 1-2, 3-6) | Copper UTP | "FastEthernet" |
| **1000BASE-T / 10GBASE-T** | Use all 4 pairs, bidirectional | Copper UTP | "Gigabit", "all 8 wires" |
| **Multimode fiber (MMF)** | Wider core, LED transmitter | Up to ~550m / 400m | "cheaper fiber", "150m–400m" |
| **Single-mode fiber (SMF)** | Narrow core, laser transmitter | Up to 10–30 km | "long-haul", "kilometers", "expensive" |
| **SFP** | Small form-factor pluggable transceiver | Switch / router slot for fiber | "insert this into the device" |
| **Auto MDI-X** | Auto-detects cable type, swaps pins | Modern switch interfaces | "old switches don't have it" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Straight-through vs Crossover** | Straight = pin 1→1, 2→2... Crossover = swaps pairs (1↔3, 2↔6). Crossover needed between two same-role devices (PC-PC, switch-switch, router-router) on old gear |
| **Switch vs Router/PC pinout** | Switch TX on 3,6 / RX on 1,2. Router/PC/Firewall TX on 1,2 / RX on 3,6 — switch is the odd one out |
| **MMF vs SMF** | MMF = wider core, LED, cheaper, shorter. SMF = narrower core, laser, expensive, longer |
| **UTP vs Fiber** | UTP cheap + EMI-vulnerable + leaks signal. Fiber expensive + immune to EMI + no leak |

## 🔗 How it all connects

```
[PC TX 1-2] → [Switch RX 1-2 / TX 3-6] → [Router RX 3-6 / TX 1-2] → [SFP+Fiber] → [WAN]
```

## 🚨 Exam Traps

- **Crossover is NOT needed** between PC↔switch or router↔switch — they already use opposite pins
- **Auto MDI-X is NOT** a speed feature — it only fixes pin alignment
- **UTP is NOT** good past 100 m — pick fiber, even for 150 m
- **MMF is NOT** the answer for 3 km — pick SMF
- **SFP is NOT** a cable — it's the transceiver the fiber plugs into
- **A Gigabit cable is NOT** using only 2 pairs — it uses all 4

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Two old routers, straight-through, no link | Wrong cable — need **crossover** |
| 150 m between buildings, cheap | **Multimode fiber** |
| 3 km between offices, cheap as possible | **Single-mode fiber** |
| Connect 30 PCs on one floor | **UTP** |
| Modern switch-to-switch with straight-through | Works — **Auto MDI-X** |
| Max length of UTP | **100 meters** |
| Switch transmits on which pins? | **3 and 6** |
| Need transceiver for fiber port | **SFP** |

## ⚡ One-Line Master Recall

**UTP carries copper bits ≤100 m → switch RX on 1-2 / TX on 3-6 → mismatched-role pairs need crossover unless Auto MDI-X fixes it → past 100 m use MMF → past ~500 m use SMF over an SFP.**

## ➕ EXTRA — not in video, but on the exam

- **1.4 Cable issues** — collisions, errors, mismatch in duplex/speed; "input errors" and "CRC" point to physical/cable issues, "late collisions" point to duplex mismatch.
- **PoE (1.1.h)** — Cat5e/6 carries power AND data on same wires (covered Day 52). Distinct from this lesson.
- **Direct Attach Copper (DAC) / AOC** — short twinax cables for 10G/25G/40G server-to-switch. Common in modern data centers (CW relevance), v1.1 may reference.

## 🧾 Recap

- **UTP ≤100 m, MMF ~hundreds of m, SMF kilometers** — distance picks the cable.
- **Switch is the only device** that flips TX/RX (TX 3-6, RX 1-2).
- **Crossover only matters** for same-role pairs on old gear without Auto MDI-X.
- **Fiber needs an SFP** transceiver and uses two strands (one TX, one RX).
- If you can answer 5/8 Quick-Answer rows without peeking, move to Day 3.

---
Source: Jeremy's IT Lab — Day 2 — https://www.youtube.com/watch?v=ieTH5lVhNaY
