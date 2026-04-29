---
title: "Free CCNA | OSPF Part 1 | Day 26 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-26
source_transcript: "[[../jeremy-it-videos/053-ospf-part-1-day-26]]"
source_url: https://www.youtube.com/watch?v=pvuaoJ9YzoI
created: 2026-04-28
tags: [ccna, cheat-sheet, day-26]
---

# Day 26 — OSPF Part 1

## 🎯 What this video covers

Maps to v1.1 blueprint **3.4 Configure and verify single area OSPFv2** — the only dynamic routing protocol explicitly named in the exam topics. Introduces link-state operation, areas, basic config, and router IDs.

## 🧠 Core Concept

**OSPF is a link-state protocol — every router builds an identical map of the area (LSDB) by flooding LSAs, then independently runs Dijkstra's algorithm (SPF) to pick best paths.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **LSA** | Link State Advertisement — info about a link | Flooded between OSPF routers | "advertises a link" |
| **LSDB** | Link State Database — every router's full map | Identical for all routers in same area | "all routers same database" |
| **SPF / Dijkstra** | Algorithm that picks best path from LSDB | Run independently on each router | "shortest path first", "Dijkstra" |
| **Area** | Set of routers sharing the same LSDB | Identified by area number; backbone = area 0 | "single-area OSPF" |
| **ABR** | Area Border Router — has interfaces in 2+ areas | Sits between backbone and other areas | "interfaces in multiple areas" |
| **ASBR** | Autonomous System Boundary Router — connects OSPF to external | Performs `default-information originate` | "connects to the Internet" |
| **Process ID** | Local OSPF instance number | Locally significant — does NOT have to match | "router ospf 1" |
| **Router ID** | 32-bit ID (looks like an IP) | Manual > loopback > highest physical | "router-id 1.1.1.1" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Distance vector vs link state** | DV = "routing by rumor", neighbor's view only. LS = full map, all routers identical |
| **OSPF process ID vs EIGRP AS number** | OSPF process ID is **locally significant** — neighbors can differ. EIGRP AS must match |
| **ABR vs ASBR** | ABR = between OSPF areas (internal). ASBR = OSPF ↔ external networks |
| **Area 0 vs other areas** | Area 0 = backbone — every other area MUST connect to it |
| **Intra-area vs interarea route** | Same area = intra-area. Different area = interarea |

## 🔗 How it all connects

```
[Router]→[Floods LSAs]→[Identical LSDB everywhere]→[Each runs SPF]→[Best route in routing table]
```

## 🚨 Exam Traps

- **OSPF process ID does NOT have to match** between neighbors — unlike EIGRP AS number
- **OSPF process ID does NOT equal area number** — they're unrelated
- **`network` command does NOT advertise networks directly** — it activates OSPF on matching interfaces, which then advertise their subnets
- **Single-area OSPF does NOT have to be area 0** — but best practice (and most exam questions) use area 0
- **Default-information originate does NOT just create the route** — you must already have a default route; the command then floods it
- **OSPF interfaces in the same subnet MUST be in the same area** — otherwise no neighborship

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| OSPF metric is called | **Cost** |
| OSPF default administrative distance | **110** |
| Algorithm OSPF uses | **Dijkstra / SPF** |
| Order of router-ID priority | **Manual → loopback (highest IP) → physical (highest IP)** |
| Command to manually set router ID | **`router-id A.B.C.D`** (in OSPF config mode) |
| Default LSA refresh timer | **30 minutes** |
| Stop hellos on an interface but keep advertising | **`passive-interface`** |
| Advertise default route into OSPF | **`default-information originate`** (makes the router an ASBR) |
| OSPF max equal-cost paths (default) | **4** (`maximum-paths` to change) |

## ⚡ One-Line Master Recall

**Become neighbors → flood LSAs into a shared LSDB → each router runs Dijkstra → best routes installed in the routing table at AD 110.**

## ➕ EXTRA — not in video, but on the exam

- **OSPFv3** — for IPv6 (Day 26 mentions briefly). v1.1 may compare v2 vs v3 features.
- **Stub / NSSA areas** — Jeremy mentions in passing; out of CCNA scope, but `show ip protocols` displays counts.
- **Reference bandwidth** — default 100 Mbps; on gig+ links you should change with `auto-cost reference-bandwidth`.

## 🧾 Recap

- **OSPF = link-state, AD 110, Dijkstra**, metric = cost.
- All routers in an area share an **identical LSDB**; each runs SPF independently.
- **Process ID is local; router-ID is unique.** Matching is NOT required for the process ID.
- **Area 0 is the backbone** — every other area must connect to it via an ABR.
- If you can configure single-area OSPF, set router-id, and explain ABR vs ASBR, move to Day 27.

---
Source: Jeremy's IT Lab — Day 26 — https://www.youtube.com/watch?v=pvuaoJ9YzoI
