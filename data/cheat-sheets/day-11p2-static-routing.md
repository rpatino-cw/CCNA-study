---
title: "Free CCNA | Static Routing | Day 11 (part 2) | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-11p2
source_transcript: "[[../jeremy-it-videos/020-static-routing-day-11-part-2]]"
source_url: https://www.youtube.com/watch?v=YCv4-_sMvYE
created: 2026-04-28
tags: [ccna, cheat-sheet, day-11p2]
---

# Day 11 (Part 2) — Static Routing

## 🎯 What this video covers

Maps to v1.1 blueprint **3.3 Configure and verify IPv4 and IPv6 static routing** — default route, network route, host route, floating static, recursive vs directly attached. Foundational for ACLs, NAT, redistribution.

## 🧠 Core Concept

**A static route is a manual instruction telling a router: "to reach network X, send packets to next-hop Y or out exit-interface Z."**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **Connected route** (C) | Auto-added when interface is up + has IP | Routing table | "directly connected" |
| **Local route** (L) | Auto-added /32 for router's own IP | Routing table | "/32 local" |
| **Static route** (S) | Manually configured route | Routing table | "manually configured" |
| **Default route** | `0.0.0.0/0` — matches everything | Routing table | "gateway of last resort" |
| **Default gateway** | End host's exit router | PC config | "send to outside-LAN dest" |
| **Next-hop** | IP of next router in the path | Static route command | "ip route X.X.X.X mask **next-hop**" |
| **Exit-interface** | Local interface to send out | Static route command | "directly connected" appears in table |
| **AD / Metric** | `[1/0]` for static — lower AD wins | Brackets in routing table | "administrative distance" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Connected vs Local** | Connected = network the interface lives in (/24, /30 etc). Local = exact IP of the interface (/32) |
| **Next-hop vs Exit-interface** | Next-hop is the neighbor's IP. Exit-interface is your own port. Both work. Both can be combined |
| **Default route vs Default gateway** | Same idea — a route to `0.0.0.0/0`. "Default gateway" is the term used on end hosts |
| **Most-specific match** | `/32` beats `/24` beats `/0` regardless of AD or metric — longest prefix wins first |

## 🔗 How it all connects

```
Connected/Local (auto) → Static route (manual) → Default route (catch-all)
```

## 🚨 Exam Traps

- **Static routes are NOT** automatic — must be manually configured
- **Default route is NOT** `255.255.255.255` — it's `0.0.0.0 0.0.0.0`
- **You CANNOT use slash notation** in `ip route` — must spell out the netmask in dotted decimal
- **Two-way reachability** — every router in the path needs a route to BOTH source and destination networks, not just one
- **Exit-interface only** static routes show "directly connected" in the routing table (relies on Proxy ARP)
- **Routers don't need routes to every transit network** — only to the destination network

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Default route command | **`ip route 0.0.0.0 0.0.0.0 <next-hop>`** |
| Static route to 192.168.4.0/24 via 13.3 | **`ip route 192.168.4.0 255.255.255.0 192.168.13.3`** |
| Static route code in routing table | **`S`** |
| Default route candidate marker | **`*` next to `S`** |
| Static AD / metric | **`[1/0]`** |
| End host's "default route" name | **Default gateway** |
| `/32` static route is called a | **Host route** |
| Higher AD on a static route to make it backup | **Floating static route** |

## ⚡ One-Line Master Recall

**`ip route <destination> <mask> <next-hop>` — and don't forget the return path.**

## ➕ EXTRA — not in video, but on the exam

- **Floating static route** — set AD higher than the dynamic protocol (e.g. `ip route 0.0.0.0 0.0.0.0 1.1.1.1 200`) so it only kicks in if the primary fails. Heavily tested in v1.1.
- **IPv6 static route syntax** — same idea: `ipv6 route 2001:db8::/64 <next-hop>`. v1.1 explicitly tests both v4 and v6 static.
- **Host route /32** — a static for one specific IP. Common for management/loopback advertisements.
- **Recursive vs directly attached** — next-hop static = recursive lookup. Exit-interface static = directly attached, no recursion.

## 🧾 Recap

- **Connected (C) + Local (L)** are free; **Static (S)** is manual; **Default (S\*)** is the catch-all.
- **Three syntax forms:** next-hop only, exit-interface only, or both combined.
- **Mask must be dotted decimal** in `ip route` — no `/24` allowed.
- **Two-way reachability** — every router in the path needs routes BOTH directions.
- If you can write a default route + a /32 host route from memory, move to Day 12.

---
Source: Jeremy's IT Lab — Day 11 (part 2) — https://www.youtube.com/watch?v=YCv4-_sMvYE
