---
title: "Free CCNA | Subnetting (Part 1) | Day 13 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-13
source_transcript: "[[../jeremy-it-videos/025-subnetting-part-1-day-13]]"
source_url: https://www.youtube.com/watch?v=bQ8sdpGQu8c
created: 2026-04-28
tags: [ccna, cheat-sheet, day-13, high-priority]
---

# Day 13 — Subnetting (Part 1)

## 🎯 What this video covers

Maps to v1.1 blueprint **1.6 (subnetting)** — the highest-leverage row in the entire exam. CIDR replaced rigid Class A/B/C with variable prefix lengths so we can carve big networks into small efficient subnets. **You will get 4-7 subnetting questions on test day. Master this.**

## 🧠 Core Concept

**CIDR lets you slide the prefix mask anywhere from /8 to /32. Each bit you steal from the host portion doubles the number of subnets and halves the hosts per subnet. Hosts = 2^(host bits) − 2.**

## 🔑 Must-Know Table

| Prefix | Mask (last octet) | Host bits | Usable hosts | Block size |
|---|---|---|---|---|
| **/24** | .0 | 8 | 254 | 256 |
| **/25** | .128 | 7 | 126 | 128 |
| **/26** | .192 | 6 | 62 | 64 |
| **/27** | .224 | 5 | 30 | 32 |
| **/28** | .240 | 4 | 14 | 16 |
| **/29** | .248 | 3 | 6 | 8 |
| **/30** | .252 | 2 | 2 | 4 |
| **/31** | .254 | 1 | 0 (special) | 2 |
| **/32** | .255 | 0 | 0 (host route) | 1 |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Classful vs CIDR** | Classful = forced /8, /16, /24. CIDR = any prefix length, ends address waste |
| **/30 vs /31 for point-to-point** | /30 = 2 usable (classic). /31 = 2 total, both usable on point-to-point links per RFC 3021. /31 saves addresses |
| **/32** | No hosts — used for static routes to a single host (host route) or loopback interfaces |
| **Block size method** | Block size = 256 − mask octet. Subnets start at multiples of the block size. /26 → block 64 → .0, .64, .128, .192 |
| **Network bits vs host bits** | More network bits = more subnets, fewer hosts per subnet. They're a zero-sum trade |

## 🔗 How it all connects

```
[Big network /24] → [Steal host bits → /26 subnets] → [4 subnets × 62 hosts each]
```

## 🚨 Exam Traps

- **Class A is NOT** required to use /8 anymore — CIDR killed that rule
- **/31 is NOT** broken — it's valid on point-to-point links (saves a /30)
- **/30 leaves 2 wasted addresses** (network+broadcast) on point-to-point — /31 wastes none
- **/32 is NOT** for interfaces — it's for host routes / loopbacks
- **Block size is NOT** the prefix — it's 256 minus the mask octet
- **You CANNOT** assign network or broadcast addresses to hosts (except /31 point-to-point)

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Need 45 hosts per subnet, smallest mask | **/26** (62 usable) |
| Need 30 hosts per subnet, smallest mask | **/27** (30 usable) |
| Point-to-point router link, most efficient | **/31** (2 addresses, 0 wasted) |
| 192.168.1.0/26 — next subnet network ID | **192.168.1.64** |
| /27 mask in dotted decimal | **255.255.255.224** |
| Block size of /28 | **16** |
| /29 usable hosts | **6** |
| Host route mask | **/32** |

## ⚡ One-Line Master Recall

**Pick the prefix where 2^(host bits) − 2 ≥ hosts needed → block size = 256 − mask → subnets start at multiples of the block size → /30 or /31 for point-to-point, /32 for host routes.**

## ➕ EXTRA — not in video, but on the exam

- **VLSM (Variable Length Subnet Masking)** — the act of using different prefix lengths inside one major network. Subnetting Part 2 covers this; v1.1 always tests it.
- **Magic number / fast subnetting** — block size = 256 − mask octet. Drill until automatic; saves minutes on test day.
- **/31 RFC 3021** — explicitly named in some Cisco study guides as the "point-to-point" exception.

## 🧾 Recap

- **CIDR removes class rules** — mask can be anything from /8 to /32.
- **Hosts = 2^(host bits) − 2**, except /31 (point-to-point) and /32 (host route).
- **Block size method** = 256 − mask octet → subnets at multiples of that.
- **/26 = 4 subnets of 62, /27 = 8 of 30, /28 = 16 of 14, /29 = 32 of 6, /30 = 64 of 2.**
- If you can fill in the prefix table from memory in under 60 seconds, you're test-ready for Part 1.

---
Source: Jeremy's IT Lab — Day 13 — https://www.youtube.com/watch?v=bQ8sdpGQu8c
