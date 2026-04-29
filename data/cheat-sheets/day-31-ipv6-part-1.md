---
title: "Free CCNA | IPv6 Part 1 | Day 31 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-31
source_transcript: "[[../jeremy-it-videos/063-ipv6-part-1-day-31]]"
source_url: https://www.youtube.com/watch?v=ZNuXyOXae5U
created: 2026-04-28
tags: [ccna, cheat-sheet, day-31]
---

# Day 31 — IPv6 Part 1: Addressing & Prefixes

## 🎯 What this video covers

Maps to v1.1 blueprint **1.8 Configure and verify IPv6 addressing and prefix**. Foundational for 1.9 (IPv6 address types — Day 32) and 3.3 (IPv6 static routing).

## 🧠 Core Concept

**IPv6 = 128 bits, written as 8 quartets of 4 hex chars, separated by colons. Shorten by dropping leading zeros and using `::` once for consecutive all-zero quartets.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **IPv6 address** | 128-bit address in hex | Layer 3 | "32 hex chars in 8 quartets" |
| **Quartet** | 4 hex chars = 16 bits | One section of address | "8 quartets per address" |
| **Leading zeros rule** | Drop 0s at the START of any quartet | Compression | "0db8 → db8" |
| **Double-colon `::`** | Replace ONE run of consecutive all-zero quartets | Compression | "use only once per address" |
| **Prefix length** | `/N` slash notation (no dotted decimal!) | After address | "/64 typical subnet" |
| **Global routing prefix** | First /48 (assigned by ISP) | Bits 0–47 | "from ISP" |
| **Subnet ID** | Bits 48–63 (16 bits to subnet) | Middle of address | "your subnets" |
| **Interface ID** | Last /64 (host portion) | Bits 64–127 | "host bits" |
| **Documentation range** | `2001:db8::/32` | Reserved for examples | "never used in production" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Leading 0 vs middle 0** | Drop ONLY leading zeros in a quartet. `2001:0:0:1::` is valid. `2001:0:` → `2001::` is NOT valid (would change the address) |
| **`::` once only** | Two `::` ambiguous (can't tell where zeros go). One per address |
| **/48 vs /64** | /48 = ISP block. /64 = standard subnet size. Difference = 16 subnet bits |
| **IPv4 link-local vs IPv6 link-local** | IPv4 = manual / opt-in. IPv6 = auto-generated on every interface when IPv6 enabled |

## 🔗 How it all connects

```
2001:0db8:0000:0001:0000:0000:0000:0001
        ↓ drop leading 0s
2001:db8:0:1:0:0:0:1
        ↓ collapse longest run of 0s with ::
2001:db8:0:1::1
```

## 🚨 Exam Traps

- **`::` can only be used ONCE** — `2001::1::1` is INVALID (ambiguous).
- **Only LEADING zeros** drop — middle/trailing zeros stay (changing them changes the value).
- **No dotted decimal mask** — IPv6 only uses `/N` slash notation.
- **`ipv6 unicast-routing`** is required from **global config** — without it the router won't forward IPv6 packets.
- **Link-local addresses auto-appear** when you configure any IPv6 address — not configured manually here (Day 32).
- **Hexadecimal only** — `G` is not a valid hex digit (catches you in MCQs).

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| IPv6 address bit length | **128 bits** |
| Hex chars per address | **32** |
| Quartets per address | **8** |
| Bits per quartet | **16** |
| Bits per hex char | **4** |
| Typical subnet prefix length | **/64** |
| Typical ISP allocation | **/48** |
| Documentation prefix | **`2001:db8::/32`** |
| Enable IPv6 routing | **`ipv6 unicast-routing`** (global) |
| Configure address on iface | **`ipv6 address 2001:db8::1/64`** |
| Verify | **`show ipv6 interface brief`** |
| Static route syntax | **`ipv6 route <prefix>/<len> <next-hop>`** |

## ⚡ One-Line Master Recall

**128 bits, 8 quartets, drop leading zeros, `::` once for all-zero runs, `/64` is the default subnet.**

## ➕ EXTRA — not in video, but on the exam

- **EUI-64** (Day 32) — auto-generates the last 64 bits from MAC + insert `FFFE`. v1.1 may show config with `eui-64` keyword.
- **Address types** (Day 32) — global unicast, link-local (`fe80::/10`), unique local (`fc00::/7`), multicast (`ff00::/8`), anycast, loopback (`::1`), unspecified (`::`).
- **SLAAC** — stateless autoconfig. Hosts pick their own address from RA. v1.1 expects recognition.
- **IPv6 ACLs and routing protocols** all use the same slash notation, no dotted-decimal masks anywhere in IPv6.

## 🧾 Recap

- **IPv6 = 128 bits, 8 hex quartets, slash notation only.**
- **Compression rules:** drop leading zeros AND collapse one run of all-zero quartets with `::`.
- **/48 from ISP, /64 per subnet** = 16 bits to play with for subnet IDs.
- **`ipv6 unicast-routing`** must be on globally for the router to forward IPv6.
- If you can shorten and expand any IPv6 address without errors, move to Day 32.

---
Source: Jeremy's IT Lab — Day 31 — https://www.youtube.com/watch?v=ZNuXyOXae5U
