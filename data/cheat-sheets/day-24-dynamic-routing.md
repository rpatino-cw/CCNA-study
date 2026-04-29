---
title: "Free CCNA | Dynamic Routing | Day 24 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-24
source_transcript: "[[../jeremy-it-videos/049-dynamic-routing-day-24]]"
source_url: https://www.youtube.com/watch?v=xSTgb8JLkvs
created: 2026-04-28
tags: [ccna, cheat-sheet, day-24]
---

# Day 24 — Dynamic Routing

## 🎯 What this video covers

Maps to v1.1 blueprint **3.0 IP Connectivity** intro: dynamic vs static routing, IGP vs EGP, distance-vector vs link-state, **administrative distance**, **metric**, ECMP load-balancing, and floating static routes. Foundation for OSPF (Day 26+).

## 🧠 Core Concept

**Routers compare AD across protocols, then metric within a protocol — lowest wins; static routes can "float" with raised AD as backup.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **IGP** | Routes inside one autonomous system | RIP, EIGRP, OSPF, IS-IS | "interior", "within company" |
| **EGP** | Routes between autonomous systems | BGP only | "between ISPs", "AS-to-AS" |
| **Distance vector** | "Routing by rumor" — share routes + metric with neighbors | RIP, EIGRP | "routing by rumor" |
| **Link state** | Each router builds full network map | OSPF, IS-IS | "complete map", "SPF" |
| **Path vector** | EGP algorithm | BGP | "BGP" |
| **Metric** | Cost within one protocol; lower = better | Per protocol | "lowest metric wins" |
| **Administrative Distance (AD)** | Trustworthiness across protocols | Per route source | "lower AD preferred" |
| **ECMP** | Equal-cost multi-path load balance | Same protocol, same metric | "load-balanced over both routes" |
| **Floating static** | Static with raised AD; backup | `ip route … <distance>` | "static AD higher than dynamic" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Metric vs AD** | Metric compares routes from SAME protocol. AD compares routes from DIFFERENT protocols |
| **Distance vector vs link state** | DV = share routes (rumor). LS = share link info, build whole map |
| **IGP vs EGP** | IGP within one AS. EGP between ASes (BGP) |
| **Static vs dynamic** | Static: manual, AD 1, doesn't adapt. Dynamic: auto-learns + adapts |

## 🔗 How it all connects

```
Multiple sources → pick lowest AD → within that protocol pick lowest metric → if tied → ECMP load-balance
```

## 🚨 Exam Traps

- **AD does NOT** compare routes from the same protocol — that's metric's job
- **Different prefixes (10.0.0.0/24 vs /28) are NOT** the same destination — use longest-prefix match, not AD/metric
- **RIP "hop count" does NOT** consider link speed — 10 Mb and 10 Gb both = 1 hop
- **OSPF metric is NOT** hop count — it's **cost** (based on bandwidth)
- **BGP is NOT** an IGP — it's the only EGP in modern use
- **EIGRP external (170)** is NOT the same as internal EIGRP (90)

## 🧪 Quick-Answer Map (memorize ADs)

| Route source | AD |
|---|---|
| **Connected** | 0 |
| **Static** | 1 |
| **eBGP** | 20 |
| **EIGRP (internal)** | 90 |
| **IGRP** | 100 |
| **OSPF** | 110 |
| **IS-IS** | 115 |
| **RIP** | 120 |
| **EIGRP external** | 170 |
| **iBGP** | 200 |
| **Unusable** | 255 |

| Stem | Answer |
|---|---|
| Routes to same dest from RIP/EIGRP/OSPF/IS-IS — which wins | **EIGRP (AD 90 lowest)** |
| Two equal-cost OSPF routes to same dest | **Both installed; ECMP load-balance** |
| Metric for OSPF | **Cost (bandwidth-based)** |
| Metric for RIP | **Hop count** |
| Metric for EIGRP | **Bandwidth + delay (default)** |
| Use of floating static | **Backup when dynamic route dies** |

## ⚡ One-Line Master Recall

**AD picks the protocol, metric picks the path, longest prefix beats both — and 0 < 1 < 20 < 90 < 110 < 120.**

## ➕ EXTRA — not in video, but on the exam

- **Default route AD** — `ip route 0.0.0.0 0.0.0.0 X` defaults to AD 1; can float with `ip route 0.0.0.0 0.0.0.0 X 250`.
- **Routing protocol comparison row (v1.1 3.4)** — Convergence: link-state faster. CPU/RAM: link-state heavier. Scalability: OSPF/IS-IS scale further than RIP.
- **OSPF cost formula** — Reference bandwidth (default 100 Mbps) ÷ interface bandwidth = cost. Day 26 detail.
- **Read `show ip route` brackets** — `[AD/metric]`. Left = AD, right = metric. Easy exam tell.

## 🧾 Recap

- **Static** = manual; **dynamic** = protocol learns and adapts; **floating static** = backup.
- IGPs (RIP, EIGRP, OSPF, IS-IS) inside an AS; **BGP** is the only EGP.
- **Distance vector** = routing by rumor; **link state** = full map.
- Selection: **AD across protocols → metric within → ECMP if tied**.
- Memorize AD table — guaranteed exam point.
- If you can recall all ADs and answer 6/8 quick-answer stems, move to Day 25 (RIP/EIGRP).

---
Source: Jeremy's IT Lab — Day 24 — https://www.youtube.com/watch?v=xSTgb8JLkvs
