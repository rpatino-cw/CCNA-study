---
title: "Free CCNA | NAT (part 2) | Day 45 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-45
source_transcript: "[[../jeremy-it-videos/091-nat-part-2-day-45]]"
source_url: https://www.youtube.com/watch?v=kILDNs4KjYE
created: 2026-04-28
tags: [ccna, cheat-sheet, day-45]
---

# Day 45 — NAT (Part 2): Dynamic NAT & PAT

## 🎯 What this video covers

Maps to v1.1 blueprint **4.1 (configure and verify inside source NAT using static and pools)**. PAT (NAT Overload) is the most common form of NAT in the world — every home router uses it. Static NAT was Day 44; this video covers dynamic NAT and PAT.

## 🧠 Core Concept

**Dynamic NAT auto-maps inside-locals to a pool of inside-globals (1-to-1, temporary). PAT (NAT Overload) translates BOTH IP and port number, letting many inside hosts share ONE public IP using unique port numbers.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **Static NAT** | Manual 1-to-1 IP mapping (permanent, two-way) | `ip nat inside source static` | "manual mapping" |
| **Dynamic NAT** | Auto 1-to-1 mapping from a pool | ACL + pool + `ip nat inside source list` | "pool of public IPs" |
| **PAT (NAT Overload)** | Many inside-locals → one inside-global, distinguished by port | `OVERLOAD` keyword | "share single public IP" |
| **Inside Local** | Private IP on inside host | Pre-translation | "client's real IP" |
| **Inside Global** | Public IP after translation | Post-translation | "what the outside sees" |
| **NAT pool exhaustion** | All pool addresses in use → drop packet | Dynamic NAT only | "no addresses left" |
| **ACL in NAT** | Identifies traffic to translate (not to drop) | Permitted = translated | "identify, not filter" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Static NAT vs Dynamic NAT** | Static = permanent + manual + bi-directional. Dynamic = temporary + auto + still 1-to-1 |
| **Dynamic NAT vs PAT** | Both use ACL + pool. Dynamic = 1-to-1, exhausts. PAT adds `overload` keyword → many-to-one via port translation |
| **PAT pool vs PAT interface** | Pool = use a small range of public IPs. Interface = use the router's outside interface IP (most common in home routers) |
| **ACL deny in NAT** | Denied = not translated (not dropped). Apply via `ip nat inside source list`, not `ip access-group` |
| **`show ip nat translations` vs `statistics`** | translations = active mappings. statistics = totals + which ACL/pool is active |

## 🔗 How it all connects

```
[Inside host 192.168.1.10:54321] → [Router PAT] → [203.0.113.1:54321] → [Internet]
                                  ← NAT table tracks port → reverse on reply
```

## 🚨 Exam Traps

- **A NAT ACL "deny" is NOT a drop** — it just means "don't translate." Traffic still routes (or not) per the routing table
- **PAT does NOT need many public IPs** — one is usually enough (~65k ports)
- **`overload` is the magic keyword** — without it you have plain dynamic NAT with exhaustion
- **Pool prefix-length is NOT optional** — must be specified, must contain both pool ends in same subnet
- **Static NAT is bi-directional** — outside hosts can reach inside via the global address. Dynamic and PAT are inside-initiated only
- **Inside Global is the PUBLIC IP** — Romeo, drill this. Inside Local = private; Inside Global = public

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Best NAT type to preserve public IPv4 | **PAT (NAT Overload)** |
| Cmd: dynamic NAT (ACL 1, pool POOL1) | **`ip nat inside source list 1 pool POOL1`** |
| Cmd: PAT with pool | **`ip nat inside source list 1 pool POOL1 overload`** |
| Cmd: PAT using router's outside interface | **`ip nat inside source list 1 interface g0/0 overload`** |
| What happens when dynamic NAT pool is exhausted | **Packet is dropped** |
| ACL denies traffic for NAT — what happens? | **Traffic is forwarded but not translated** |
| Show active NAT mappings | **`show ip nat translations`** |
| Inside Global = | **Public IP after translation** |

## ⚡ One-Line Master Recall

**Static = manual permanent 1-to-1. Dynamic = auto temporary 1-to-1 from a pool (exhaustible). PAT = many-to-one using port numbers — one public IP serves an entire enterprise. ACL identifies what to translate, not what to drop.**

## ➕ EXTRA — not in video, but on the exam

- **Static PAT (port forwarding)** — `ip nat inside source static tcp <inside-local> <port> interface <outside> <port>`. Lets outside hosts reach a specific inside service. v1.1 testable.
- **`ip nat inside` / `ip nat outside`** — must be applied on each interface or NAT does nothing. Most common config error on the exam.
- **NAT and IPv6** — IPv6 mostly avoids NAT (huge address space); v1.1 may ask "why don't we need NAT in IPv6?"

## 🧾 Recap

- **Three NAT types**: Static (permanent 1-to-1), Dynamic (pool 1-to-1, exhausts), PAT/Overload (many-to-one via port).
- **`overload` keyword** is the only difference between dynamic NAT and PAT in the config.
- **Inside Local = private, Inside Global = public** (memorize this terminology).
- **ACL in NAT identifies traffic** to translate — denied = forwarded without translation, not dropped.
- If you can write a one-line PAT-using-interface command from memory, move to Day 46.

---
Source: Jeremy's IT Lab — Day 45 — https://www.youtube.com/watch?v=kILDNs4KjYE
