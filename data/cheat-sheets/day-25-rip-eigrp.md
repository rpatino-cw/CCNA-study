---
title: "Free CCNA | RIP & EIGRP | Day 25 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-25
source_transcript: "[[../jeremy-it-videos/051-rip-eigrp-day-25]]"
source_url: https://www.youtube.com/watch?v=N8PiZDld6Zc
created: 2026-04-28
tags: [ccna, cheat-sheet, day-25]
---

# Day 25 — RIP & EIGRP (Concepts Only)

## 🎯 What this video covers

**RIP and EIGRP are NOT explicitly listed on the v1.1 blueprint.** OSPF (Day 26+) is the only IGP tested directly. BUT the underlying concepts — administrative distance, metric types, wildcard masks, router ID selection, passive interfaces, ECMP — DO appear, and they all reuse the same commands and logic when you hit OSPF.

## 🧠 Core Concept

**RIP picks routes by hop count (terrible). EIGRP picks routes by bandwidth + delay (much better). Both are stepping stones — what's actually tested is AD, metric, wildcard masks, and router-ID rules.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **AD (Administrative Distance)** | Trustworthiness rank between protocols | Compared when SAME destination from DIFFERENT protocols | "lower AD wins" |
| **Metric** | Cost within ONE protocol | Compared when SAME destination from SAME protocol | "lower metric wins" |
| **Hop count** | RIP's metric — # of routers in path | Per route | "max 15, 16 = unreachable" |
| **EIGRP metric** | Bandwidth (slowest link) + delay (sum) | Per route | "K1 and K3" |
| **Wildcard mask** | Inverted subnet mask (0=match, 1=don't care) | EIGRP/OSPF `network` cmd, ACLs | "0.0.0.255 = /24" |
| **Router ID** | 32-bit ID for a router in IGP | EIGRP/OSPF | "manual > loopback > physical" |
| **Passive interface** | Stop sending updates out this iface | Router config mode | "no neighbors on this segment" |
| **ECMP** | Equal-cost multipath load-balance | Default 4 paths | "maximum-paths N" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **AD vs Metric** | AD chooses BETWEEN protocols. Metric chooses WITHIN a protocol. Different destinations = both routes installed (no comparison) |
| **RIPv1 vs RIPv2** | v1 classful, broadcasts, no VLSM/CIDR. v2 classless, multicasts to `224.0.0.9`, supports VLSM |
| **RIP vs EIGRP** | RIP = hop count (15 max). EIGRP = bw+delay, no hop limit, multicast `224.0.0.10` |
| **Subnet mask vs Wildcard** | Subtract each octet from 255: `255.255.255.0` → `0.0.0.255` |
| **Router-ID priority** | Manual config > highest loopback IP > highest physical iface IP |

## 🔗 How it all connects

```
Different destinations → both installed (no compare)
Same dest, different protocol → AD picks (lower wins)
Same dest, same protocol → Metric picks (lower wins)
Same dest, same proto, same metric → ECMP load-balance
```

## 🚨 Exam Traps

- **AD is NOT** a metric — it's a tiebreaker between routing-protocol sources for the same destination
- **Different destinations** = AD never compared, both routes go in the table
- **Wildcard mask is NOT** a subnet mask — it's the inverted bits
- **`network` command does NOT** advertise the network you typed — it identifies which **interfaces** to enable the protocol on
- **RIP max = 15 hops** (16 = infinity = unreachable)
- **EIGRP `network` with no mask** assumes classful (e.g. `network 10.0.0.0` = 10.0.0.0/8)

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| AD: directly connected | **0** |
| AD: static | **1** |
| AD: EIGRP internal / external | **90 / 170** |
| AD: OSPF | **110** |
| AD: RIP | **120** |
| RIPv2 multicast / EIGRP multicast | **224.0.0.9 / 224.0.0.10** |
| /24 wildcard mask | **0.0.0.255** |
| /28 wildcard mask | **0.0.0.15** |
| Router-ID priority | **manual > highest loopback > highest physical** |
| Default ECMP path count | **4 (max 32 with `maximum-paths`)** |
| Stop updates on iface with no neighbors | **`passive-interface <iface>`** |

## ⚡ One-Line Master Recall

**Different destination = no compare. Different protocol = AD. Same protocol = metric. Memorize the AD table.**

## ➕ EXTRA — not in video, but on the exam

- **AD table is heavily tested** — Connected 0, Static 1, eBGP 20, EIGRP 90, OSPF 110, RIP 120, EIGRP-ext 170, iBGP 200, Unknown 255.
- **EIGRP unequal-cost load-balancing** with `variance` — only IGP that does this. Concept may appear on exam.
- **Floating static** uses these AD values — set static AD higher than the IGP to make it backup.
- **OSPF inherits** the same `network`, `passive-interface`, `default-information originate`, `maximum-paths`, `distance` commands — that's why Jeremy taught RIP/EIGRP first.

## 🧾 Recap

- **RIP and EIGRP themselves are not directly tested** in v1.1, but their concepts are.
- **AD ranks protocols, metric ranks routes within a protocol** — memorize the AD table.
- **Wildcard mask** = subtract each octet from 255. Used in EIGRP/OSPF `network` and ACLs.
- **Router-ID priority:** manual → loopback → physical (highest IP wins at each step).
- If you can recite the AD table cold and convert /28→wildcard, move to Day 26 (OSPF).

---
Source: Jeremy's IT Lab — Day 25 — https://www.youtube.com/watch?v=N8PiZDld6Zc
