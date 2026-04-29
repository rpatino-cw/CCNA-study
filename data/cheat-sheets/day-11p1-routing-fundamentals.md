---
title: "Free CCNA | Routing Fundamentals | Day 11 (part 1) | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-11p1
source_transcript: "[[../jeremy-it-videos/019-routing-fundamentals-day-11-part-1]]"
source_url: https://www.youtube.com/watch?v=aHwAm8GYbn8
created: 2026-04-28
tags: [ccna, cheat-sheet, day-11p1]
---

# Day 11 (Part 1) — Routing Fundamentals

## 🎯 What this video covers

Maps to v1.1 blueprint **3.1 Interpret components of a routing table** (prefix, network mask, next hop, admin distance, metric, gateway of last resort) and **3.2 Determine how a router makes a forwarding decision** (longest prefix match, admin distance, metric). Foundational — every later routing topic (static, OSPF, dynamic) reuses these rules.

## 🧠 Core Concept

**A router forwards each packet using the most specific (longest-prefix) matching route, or drops it if no route matches.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **Routing table** | List of routes; instructions to forward | RAM, `show ip route` | "router stores known destinations" |
| **Connected route (C)** | Auto-added route to network on interface | Routing table | "C 192.168.1.0/24 directly connected" |
| **Local route (L)** | Auto-added /32 to interface's exact IP | Routing table | "L 192.168.1.1/32", "for the router itself" |
| **Static route (S)** | Manually configured route | Routing table | "ip route X Y Z" |
| **Dynamic route** | Learned via protocol (OSPF, EIGRP, RIP) | Routing table | "automatically learns" |
| **Next hop** | IP of next router toward destination | Inside route entry | "via 10.0.12.2" |
| **Most specific match** | Longest prefix matching destination | Selection logic | "/32 wins over /24" |
| **Routing decision** | Match → forward; no match → drop | Per-packet | "routers don't flood" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Connected (C) vs Local (L)** | C = whole subnet via interface (uses interface mask). L = exact /32 of interface IP |
| **Match vs most specific** | A route matches if dest IP fits its network. "Most specific" = longest mask among matches |
| **Router vs switch on unknown destination** | Router **drops**. Switch **floods** unknown unicast |
| **Routing table vs MAC table** | Routes use longest-prefix match; MAC table uses **exact** match |

## 🔗 How it all connects

```
Packet in → scan routing table → all matches → pick longest prefix → forward to next hop / out interface (or drop)
```

## 🚨 Exam Traps

- **Routers do NOT flood** unknown packets — they **drop** them
- **Local route is NOT** a /24 — it's always **/32** (the interface IP only)
- **Configuring an IP is NOT** enough — the interface must be **`no shutdown`** for routes to appear
- **"Variably subnetted" is NOT** a route — it's a header line; ignore for selection
- **Most specific is NOT** lowest metric — it's longest prefix length
- **A /32 host route is NOT** the same as a /24 network route — /32 wins on the same destination

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Two routes auto-added when IP configured + no shut | **Connected (C) and Local (L)** |
| Mask of a local route | **/32** |
| Router gets packet, no match in table | **Drop the packet** |
| Routes 10.0.1.0/24 and 10.0.1.23/32 match dest 10.0.1.23 — pick which | **/32 (most specific)** |
| Code `C` in `show ip route` means | **Connected** |
| Code `L` means | **Local** |
| What does "directly connected" indicate | **Network reachable via that local interface** |
| Forwarding decision rule | **Longest prefix match** |

## ⚡ One-Line Master Recall

**Connected for the network, Local for the IP, longest prefix wins, no match = drop.**

## ➕ EXTRA — not in video, but on the exam

- **Administrative distance (AD)** — Day 24 topic, but v1.1 expects you to know AD beats metric across protocols. Connected = 0, Static = 1, eBGP = 20, EIGRP = 90, OSPF = 110, RIP = 120.
- **Gateway of last resort / default route** — `0.0.0.0/0` matches everything but is the **least specific**, only used if nothing else matches. v1.1 3.1 explicitly lists it.
- **Floating static** — static route with raised AD so dynamic protocol wins until it dies. Day 24 detail.
- **Routes with `S*`** in `show ip route` indicate the candidate default route.

## 🧾 Recap

- Routing table = ordered set of **instructions**; one entry tells the router how to handle each destination.
- Configuring an IP + `no shut` auto-adds **C (network)** and **L (/32 IP)**.
- Selection rule: **most specific (longest prefix) matching route wins.**
- Routers **drop** packets with no match — unlike switches, which flood.
- If you can answer 6/8 stems above without peeking, move to Day 11 Part 2 (Static Routing).

---
Source: Jeremy's IT Lab — Day 11 Part 1 — https://www.youtube.com/watch?v=aHwAm8GYbn8
