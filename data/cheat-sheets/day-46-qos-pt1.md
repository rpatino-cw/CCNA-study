---
title: "Free CCNA | QoS (Part 1) | Day 46 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-46
source_transcript: "[[../jeremy-it-videos/093-qos-part-1-day-46]]"
source_url: https://www.youtube.com/watch?v=H6FKJMiiL6E
created: 2026-04-28
tags: [ccna, cheat-sheet, day-46]
---

# Day 46 — QoS Part 1 (PoE, Voice VLAN, QoS Concepts)

## 🎯 What this video covers

Maps to v1.1 **4.7 (PHB classification/marking)** + **1.1.h PoE**. Voice VLAN, Power over Ethernet, the four QoS metrics (bandwidth/delay/jitter/loss), queueing, tail drop, RED/WRED.

## 🧠 Core Concept

**Converged networks force voice/video and data to share bandwidth — QoS gives delay-sensitive traffic priority via classification, queueing, and smart drop policies.**

## 🔑 Must-Know Table

| Term | One-line function | Exam giveaway phrase |
|---|---|---|
| **Voice VLAN** | Tags IP-phone traffic separately from PC data | `switchport voice vlan X` |
| **IP phone 3-port switch** | PC + phone share one switch port | "internal switch in phone" |
| **PoE (PSE / PD)** | Power Sourcing Equip → Powered Device over UTP | "switch powers AP/phone" |
| **PoE standards** | 802.3af (PoE) → 802.3at (PoE+) → 802.3bt (Type 3/4) | Memorize "af / at / bt" |
| **Power policing** | Cuts/logs port if PD pulls too much current | `power inline police` |
| **Bandwidth** | Link capacity (bps) | "reserve X% for voice" |
| **Delay (one-way)** | Source → destination time | Target ≤ **150 ms** for voice |
| **Jitter** | Variation in one-way delay between packets | Target ≤ **30 ms** for voice |
| **Loss** | % packets dropped | Target ≤ **1%** for voice |
| **Tail drop** | New packets dropped when queue is full | Causes TCP global sync |
| **RED / WRED** | Random Early Detection / Weighted RED | Drops randomly before queue fills |
| **FIFO** | Default queueing — first in, first out | "no priority given" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Voice VLAN vs trunk** | Voice VLAN = access port carrying 2 VLANs (data untagged + voice tagged) — not a trunk |
| **PSE vs PD** | PSE = source (switch). PD = device (phone, AP, camera) |
| **AC vs DC** | Wall outlet = AC. Switch converts to DC over UTP for the PD |
| **PoE / PoE+ / PoE++ wattage** | af ≈ 15W → at ≈ 30W → bt up to 60W (Type 3) / 100W (Type 4) |
| **One-way vs Two-way delay** | One-way = src→dst. Two-way (RTT) = src→dst→src |
| **Tail drop vs WRED** | Tail drop = unmanaged, hits queue cap. WRED = proactive, weighted, prevents TCP sync |
| **TCP global synchronization** | All TCP flows slow down + speed up in waves due to tail drop |

## 🔗 How it all connects

```
[PC]→[IP phone (data untagged + voice tagged)]→[PoE switch]→ classify → queue → schedule → forward
```

## 🚨 Exam Traps

- **Access port with voice VLAN is NOT** a trunk — `show interfaces trunk` excludes it
- **PoE is NOT** delivered over a separate cable — same Cat5e/6 carries data + power
- **Tail drop is NOT** good — causes TCP global synchronization (waves of congestion)
- **Jitter is NOT** the same as delay — it's the **variance** in delay
- **FIFO is NOT** QoS — it's the absence of QoS (just default queueing)
- **WRED is NOT** RED — WRED is **weighted by traffic class**

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Configure voice VLAN | **`switchport voice vlan X`** |
| Power source = | **PSE (Power Sourcing Equipment)** |
| Powered device = | **PD** |
| 802.3af (Type 1) | **PoE** ≈ 15W |
| 802.3at (Type 2) | **PoE+** ≈ 30W |
| 802.3bt (Type 3/4) | **PoE++ / UPoE+** up to 60W / 100W |
| Default action of `power inline police` | **err-disable + Syslog** |
| Voice delay target | **≤ 150 ms** one-way |
| Voice jitter target | **≤ 30 ms** |
| Voice loss target | **≤ 1%** |
| Default queueing | **FIFO** |
| Variance in delay | **Jitter** |
| Negative side effect of tail drop | **TCP global synchronization** |
| Drops random packets before queue fills | **RED** |
| Weighted version of RED | **WRED** |

## ⚡ One-Line Master Recall

**Voice VLAN tags phone traffic on an access port; PoE delivers power on the same UTP; QoS protects voice with ≤150 ms delay / ≤30 ms jitter / ≤1% loss; WRED prevents tail drop and TCP sync.**

## ➕ EXTRA — not in video, but on the exam (Day 47 / topic 4.7)

- **Classification + Marking** — DSCP (6-bit) and CoS (3-bit) tag importance. EF (46) for voice, AF for video, BE (0) for default.
- **PHB (Per-Hop Behavior)** — How a router treats marked traffic at each hop.
- **Trust boundary** — Where you start trusting markings (usually access switch).
- **CBWFQ / LLQ** — Class-Based Weighted Fair Queueing + Low Latency Queueing for strict priority on voice.
- **Shaping vs Policing** — Shape = buffer + delay excess. Police = drop or re-mark excess.

## 🧾 Recap

- **Voice VLAN: phone tags voice, PC stays untagged — one access port, two VLANs.**
- **PoE: PSE (switch) feeds DC power to PD (phone/AP/cam) over UTP. af/at/bt = 15/30/60-100W.**
- **4 QoS metrics: bandwidth, delay (≤150 ms), jitter (≤30 ms), loss (≤1%).**
- **Tail drop → TCP global sync. WRED prevents it by dropping randomly + by class.**
- **FIFO is default; QoS classes/queues override it.**
- If you can recite the 4 voice targets + 3 PoE standards, move to Day 47.

---
Source: Jeremy's IT Lab — Day 46 — https://www.youtube.com/watch?v=H6FKJMiiL6E
