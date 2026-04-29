---
title: "Free CCNA | QoS (Part 2) | Day 47 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-47
source_transcript: "[[../jeremy-it-videos/095-qos-part-2-day-47]]"
source_url: https://www.youtube.com/watch?v=4vurfhVjcMM
created: 2026-04-28
tags: [ccna, cheat-sheet, day-47]
---

# Day 47 — QoS Part 2: Classification, Marking, Queuing, Policing/Shaping

## 🎯 What this video covers

Maps to v1.1 blueprint **4.7 PHB queuing/policing/shaping**. The QoS pipeline: classify → mark → queue → schedule → police/shape. Voice = EF (DSCP 46), CoS 5. Memorize the AF math.

## 🧠 Core Concept

**Classify (DSCP/CoS) → mark → place in queue → schedule (CBWFQ + LLQ for priority) → police drops, shape buffers. Voice = EF/DSCP 46, best effort = DF/DSCP 0.**

## 🔑 Must-Know Table — Marking Fields

| Field | Layer | Bits | Where it lives | Standard values |
|---|---|---|---|---|
| **CoS / PCP** | L2 | 3 (8 values) | 802.1Q tag — only on tagged frames | 0=BE, 3=signaling, 4=video, 5=voice |
| **IPP** | L3 (legacy) | 3 of ToS | IPv4 ToS byte | 0=BE, 5=voice (deprecated by DSCP) |
| **DSCP** | L3 | 6 (64 values) | IPv4 ToS byte | DF=0, EF=46, AFxy, CSx |
| **ECN** | L3 | 2 of ToS | IPv4 ToS byte | Congestion notification, not classification |

## 🔑 Must-Know Table — Standard DSCP Markings

| Marking | DSCP | Use |
|---|---|---|
| **DF** (Default Forwarding) | **0** | Best effort |
| **EF** (Expedited Forwarding) | **46** | **Voice** — low loss/latency/jitter |
| **AF41 / 42 / 43** | 34 / 36 / 38 | Interactive video |
| **AF31 / 32 / 33** | 26 / 28 / 30 | Streaming video |
| **AF21 / 22 / 23** | 18 / 20 / 22 | High-priority data |
| **CS6 / CS7** | 48 / 56 | Network control (OSPF etc) |

> **AF formula**: `DSCP = 8X + 2Y` where X=class, Y=drop precedence. So AF31 = 8(3)+2(1) = **26**.

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Classification vs Marking** | Classification = **identify** the traffic (ACL, NBAR, DSCP). Marking = **set** the field for downstream devices |
| **Policing vs Shaping** | Policing **drops** excess (impolite). Shaping **buffers/queues** excess (polite). Police on ingress, shape on egress |
| **CBWFQ vs LLQ** | CBWFQ = weighted round-robin per class with min bandwidth. **LLQ = CBWFQ + strict-priority queue** for voice/video |
| **CoS vs DSCP** | CoS only on tagged 802.1Q frames (trunks + voice VLAN access ports). DSCP works **everywhere** in IP |
| **Tail drop vs WRED** | Tail drop = late drop when queue full. WRED = early drop based on DSCP/drop-precedence to **avoid** tail drop |
| **Trust boundary at switch vs at phone** | Phone-edge = trust phone's markings, retag PC traffic. **Recommended** when IP phone present |

## 🔗 How it all connects

```
ingress → classify (DSCP/ACL/NBAR) → mark → enqueue (multiple queues) → scheduler (CBWFQ + LLQ) → egress
                                                                      ↑ shape (buffer)  / police (drop)
```

## 🚨 Exam Traps

- **Higher AF number is NOT always better** — class is X, drop precedence is Y. **AF41 > AF43** because lower drop precedence = less likely to drop
- **AF class 5/6/7 do NOT exist** — AF only goes up to class 4 (AF41/42/43 max)
- **EF is NOT 64 or 63** — EF = **46**
- **Policing is NOT shaping** — policing drops, shaping buffers
- **CoS is NOT in IP packets** — CoS lives in 802.1Q. Pure routed traffic between routers has no CoS
- **LLQ alone does NOT prevent starvation** — must combine with policing on the priority queue

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Voice DSCP marking | **EF / 46** |
| Best-effort DSCP | **DF / 0** |
| Calculate AF32 | **8(3) + 2(2) = 28** |
| AF marking with **best** service | **AF41** (highest class, lowest drop precedence) |
| Field used at L2 for QoS | **CoS** (PCP in 802.1Q) |
| Tool for strict-priority voice queue | **LLQ** |
| Scheduler with weighted bandwidth + min guarantee | **CBWFQ** |
| Drop excess vs buffer excess | **Police drops, Shape buffers** |
| Trust IP phone, retag PC | Move trust boundary **to the phone** |

## ⚡ One-Line Master Recall

**Voice = EF (46) + CoS 5. Best effort = DF (0). AF DSCP = 8X+2Y. CBWFQ + LLQ scheduler. Police drops, shape buffers.**

## ➕ EXTRA — not in video, but on the exam

- **MQC (Modular QoS CLI)** — `class-map` + `policy-map` + `service-policy`. Day 47 hints at it; v1.1 may show snippets.
- **DSCP → CoS mapping** — switches translate ingress DSCP to egress CoS (and vice versa) using `mls qos map`. Defaults often suffice.
- **NBAR2** — deep packet inspection for app classification (Skype, BitTorrent). Mentioned but not configured at CCNA level.
- **Per-Hop Behavior (PHB)** — exam term for what each router does with a marked packet. EF, AF, DF, CS are all PHBs.

## 🧾 Recap

- **Voice = EF/DSCP 46/CoS 5.** Best effort = DF/DSCP 0.
- **AF = 8X+2Y.** AF41 best, AF13 worst (within AF set).
- **CBWFQ** = weighted round-robin with min bandwidth. **LLQ** adds strict-priority queue for voice.
- **Policing drops, shaping buffers.** Police inbound, shape outbound.
- If you can compute AF13/AF31/AF41 instantly and recall EF=46, move on to Day 48.

---
Source: Jeremy's IT Lab — Day 47 — https://www.youtube.com/watch?v=4vurfhVjcMM
