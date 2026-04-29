---
title: "Free CCNA | Subnetting (Part 3 - VLSM) | Day 15 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-15
source_transcript: "[[../jeremy-it-videos/027-subnetting-part-3---vlsm-day-15]]"
source_url: https://www.youtube.com/watch?v=z-JqCedc9EI
created: 2026-04-28
tags: [ccna, cheat-sheet, day-15]
---

# Day 15 — Subnetting Part 3: VLSM

## 🎯 What this video covers

Maps to v1.1 blueprint **1.6 IPv4 subnetting** — variable-length subnet masks. Allocate subnets of **different sizes** from one address block by assigning **largest first**. Romeo's #1 weak spot — drill the 6-step recipe until automatic.

## 🧠 Core Concept

**VLSM = sort subnets largest → smallest, then carve them off the top of the address block. Each subnet gets just enough host bits, no waste.**

## 🔑 Must-Know Table

| Term | One-line function | Math you need |
|---|---|---|
| **Host bits → addresses** | `2^h` total, `2^h - 2` usable | Subtract 2 for net + bcast |
| **Borrowed bits → subnets** | `2^b` subnets | Each bit doubles count |
| **Network address** | All host bits = 0 | First address |
| **Broadcast address** | All host bits = 1 | Last address |
| **First usable** | Network + 1 | — |
| **Last usable** | Broadcast − 1 | — |
| **/30** | 2 usable hosts | Standard for point-to-point |
| **/31** | 2 hosts (RFC 3021) | Avoid on the exam unless forced |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **FLSM vs VLSM** | FLSM = every subnet same size (wastes space). VLSM = sized to need |
| **/29 vs /30 for 2-host link** | /29 has 6 usable (waste). **/30 = exactly 2 usable** — correct answer |
| **/30 vs /31** | Both work for P2P. /31 has no net/bcast (RFC 3021). Exam: pick **/30** |
| **Network vs Broadcast** | Net = all host bits 0. Bcast = all host bits 1 |

## 🔗 How it all connects

```
[/24 block] → sort needs DESC → carve largest first → next net = prev bcast + 1 → repeat → leftover = future use
```

## 🚨 Exam Traps

- **Smallest first is NOT VLSM** — always **largest first** or you'll fragment the address space
- **/29 is NOT correct for 2 hosts** — /29 = 6 usable, **/30 = 2 usable** (exact fit)
- **Subnetting class A is NOT different** — same process, just more host bits to borrow
- **2^h is NOT usable host count** — usable = `2^h − 2`
- **Next subnet's network is NOT bcast** — it's **bcast + 1**
- **/31 link is NOT the CCNA-preferred answer** — pick **/30** unless question says RFC 3021

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Need 110 hosts, smallest mask? | **/25** (126 usable) |
| Need 45 hosts? | **/26** (62 usable) |
| Need 29 hosts? | **/27** (30 usable) |
| Need 8 hosts? | **/28** (14 usable) — **NOT /29** |
| Need 2 hosts (P2P)? | **/30** (2 usable) |
| 2000 subnets from /8 → prefix? | **/19** (2^11=2048) |
| Step 1 of VLSM | **Sort needs largest → smallest** |
| Step 2 — first network address | Beginning of block (e.g. .0) |

## ⚡ One-Line Master Recall

**Sort big-to-small → carve smallest mask that fits → next net = last bcast + 1 → P2P = /30 → 2^h − 2 = usable.**

## 🧪 Worked example — the Tokyo/Toronto recipe

Block `192.168.1.0/24`. Needs: A=110, B=45, C=29, D=8, P2P=2.

| Order | LAN | Need | Mask | Network | Broadcast |
|---|---|---|---|---|---|
| 1 | Tokyo A | 110 | **/25** | 192.168.1.0 | .127 |
| 2 | Toronto B | 45 | **/26** | 192.168.1.128 | .191 |
| 3 | Toronto A | 29 | **/27** | 192.168.1.192 | .223 |
| 4 | Tokyo B | 8 | **/28** | 192.168.1.224 | .239 |
| 5 | P2P | 2 | **/30** | 192.168.1.240 | .243 |

Leftover: .244 – .255 (free for future use).

## ➕ EXTRA — not in video, but on the exam

- **Discontiguous subnets** — VLSM is required when classful protocols (RIPv1) can't summarize. CCNA uses RIPv2/OSPF/EIGRP, all classless.
- **Wildcard masks** (used in ACLs / OSPF `network` statements) — inverse of subnet mask. /26 → 0.0.0.63.
- **Summary route** — opposite of VLSM. Combine multiple subnets into a shorter prefix for routing-table compression.

## 🧾 Recap

- **VLSM = largest subnet first**, smallest last. Sort by host count descending.
- For each subnet, pick the **smallest mask that still gives enough usable hosts** (`2^h − 2 ≥ need`).
- **Next subnet's network address = previous subnet's broadcast + 1.**
- **P2P link → /30** on the exam (not /31, not /29).
- If you can do the Tokyo/Toronto worked example cold from memory, your VLSM is exam-ready.

---
Source: Jeremy's IT Lab — Day 15 — https://www.youtube.com/watch?v=z-JqCedc9EI
