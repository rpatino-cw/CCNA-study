---
title: "Free CCNA | Subnetting (Part 2) | Day 14 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-14
source_transcript: "[[../jeremy-it-videos/026-subnetting-part-2-day-14]]"
source_url: https://www.youtube.com/watch?v=IGhd-0di0Qo
created: 2026-04-28
tags: [ccna, cheat-sheet, day-14]
---

# Day 14 — Subnetting Part 2 (Class B + Identify the Subnet)

## 🎯 What this video covers

Maps to v1.1 **1.6 (IPv4 subnetting)** — the single biggest exam-time grind. Class B subnetting, identifying which subnet a host belongs to, the +N "magic number" trick, and the hosts vs subnets formulas.

## 🧠 Core Concept

**Borrow bits from host portion → 2^X subnets, 2^N − 2 hosts. The value of the *last borrowed bit* is the increment between consecutive subnets.**

## 🔑 Must-Know Table

| Concept | Formula / Rule | Why |
|---|---|---|
| **Number of subnets** | 2^X (X = borrowed bits) | No ‑2; subnets aren't reserved like host addresses |
| **Hosts per subnet** | 2^N − 2 (N = host bits) | Subtract network + broadcast addresses |
| **Magic number** | Value of the last network-portion bit | Add it to find the next subnet's network address |
| **Network address** | All host bits = **0** | Lowest address in the range |
| **Broadcast address** | All host bits = **1** | Highest address in the range |
| **/31** | 0 hosts (special: P2P link, both addrs usable) | Only 2 addresses, no broadcast |
| **/32** | Single host route | Used for loopbacks, host-specific routes |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Subnets vs Hosts formula** | 2^X for subnets, 2^N **− 2** for hosts |
| **Borrowed bits vs Host bits** | Borrowed = pulled from host into network. Host = what's left for hosts |
| **/24 → /26** | Borrow 2 bits → 4 subnets, 62 hosts each |
| **Class B /16 vs Class C /24** | Class B has 16 host bits to borrow from — much more flexible |
| **Network vs Broadcast** | First vs last address in the range. Neither is assignable to a host |

## 🔗 How it all connects

```
/24 ───borrow N bits──→ /(24+N) ───2^N subnets, each with (2^(8-N) − 2) hosts───
```

## 🚨 Exam Traps

- **Subnet count is NOT** 2^X − 2 — that's hosts. Subnets = plain 2^X
- **/31 is NOT** unusable — it's a valid 2-host point-to-point link (RFC 3021)
- **Network address is NOT** assignable to a host — neither is broadcast
- **Class B /16 is NOT** limited to subnetting in the third octet — you can borrow into octet 4 (/25, /26, /27…)
- **"Magic number" is NOT** always 32 or 64 — it's the value of the last borrowed bit (depends on prefix)
- **CLI does NOT** accept `/24` — Cisco wants dotted decimal (`255.255.255.0`)

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Need 80 subnets from /16 | **/23** (2^7 = 128 ≥ 80) |
| Need 500 subnets from /16 | **/25** (2^9 = 512 ≥ 500) |
| Need 250 subnets + 250 hosts each from /16 | **/24** (256 subnets, 254 hosts) |
| Magic number for /26 | **64** (last borrowed bit value) |
| Magic number for /27 | **32** |
| Magic number for /29 | **8** |
| Subnet of host 192.168.5.57/27 | **192.168.5.32/27** |
| Subnet of host 192.168.29.219/29 | **192.168.29.216/29** |
| Subnet of host 172.25.217.192/21 | **172.25.216.0/21** |
| Broadcast of 192.168.91.78/26 | **192.168.91.127** |
| Hosts in /26 | **62** |
| Hosts in /30 | **2** |

## ⚡ One-Line Master Recall

**Borrow X bits → 2^X subnets; (2^N − 2) hosts; magic number = value of last borrowed bit; host AND mask → network address.**

## ➕ EXTRA — not in video, but on the exam

- **VLSM (Day 15)** — Mix subnet sizes in the same network; assign biggest subnet first.
- **Wildcard masks** — Inverse of subnet mask (e.g. /26 → `0.0.0.63`). Used in OSPF `network` and ACLs.
- **Private ranges (RFC 1918)** — 10/8, 172.16/12, 192.168/16. Common exam setup.
- **Speed trick** — Memorize subnet mask values: 128, 192, 224, 240, 248, 252, 254, 255 = /25 through /32 last octet.

## 🧾 Recap

- **Subnets = 2^X. Hosts = 2^N − 2. Memorize, don't re-derive.**
- **Magic number = value of last borrowed bit → add it to step through subnets.**
- **To identify a host's subnet: AND the host with the mask (host bits → 0).**
- **Class B /16 borrows freely into octets 3 and 4 — same process, just more bits to play with.**
- If you can solve "what subnet does X.X.X.X/N belong to" in under 30 seconds, move on.

---
Source: Jeremy's IT Lab — Day 14 — https://www.youtube.com/watch?v=IGhd-0di0Qo
