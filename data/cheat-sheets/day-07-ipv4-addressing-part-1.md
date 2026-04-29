---
title: "Free CCNA | IPv4 Addressing (Part 1) | Day 7 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-07
source_transcript: "[[../jeremy-it-videos/013-ipv4-addressing-part-1-day-7]]"
source_url: https://www.youtube.com/watch?v=3ROdsfEUuhs
created: 2026-04-28
tags: [ccna, cheat-sheet, day-07]
---

# Day 7 — IPv4 Addressing (Part 1)

## 🎯 What this video covers

Maps to v1.1 blueprint **1.6 Configure and verify IPv4 addressing and subnetting**. This is the foundation: 32-bit addresses, dotted decimal vs binary, prefix length, network/host portions, address classes. Every later objective (subnetting, routing, ACLs, NAT) assumes this.

## 🧠 Core Concept

**An IPv4 address is 32 bits split into 4 octets; the prefix length tells you where the network half ends and the host half begins.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **Octet** | One 8-bit group of an IPv4 address | 4 of them per address (32 bits total) | "8 bits", "0–255" |
| **Dotted decimal** | Human-readable form (192.168.1.1) | Replaces raw binary | "decimal notation" |
| **Prefix length /N** | First N bits = network portion | After the slash | "/24", "/16", "/8" |
| **Subnet mask** | Older Cisco way of writing prefix length | Network bits = 1, host bits = 0 | "255.255.255.0" |
| **Network address** | Host portion all 0s — names the subnet | First address — NOT assignable | "first address", "identifies the network" |
| **Broadcast address** | Host portion all 1s — sends to all hosts | Last address — NOT assignable | "all hosts on the LAN" |
| **Loopback (127/8)** | Tests local TCP/IP stack | 127.0.0.0 – 127.255.255.255 | "ping yourself", "0 ms RTT" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Class A vs C** | A = /8, fewer networks, ~16.7M hosts each. C = /24, ~2M networks, 254 hosts each |
| **Network address vs first usable** | Network = .0 (host bits all 0). First usable = .1 |
| **Broadcast address vs last usable** | Broadcast = .255 (host bits all 1). Last usable = .254 |
| **Prefix /24 vs netmask 255.255.255.0** | Same thing, two notations. Juniper uses slash, Cisco classic uses netmask |

## 🔗 How it all connects

```
[32 bits] → [4 octets dotted-decimal] → [/N split] → [Network | Host] → [first=net, last=bcast]
```

## 🚨 Exam Traps

- **Switches do NOT separate networks** — only routers do. Two switches alone = one LAN
- **Network address is NOT usable on a host** — it identifies the subnet itself
- **Broadcast address is NOT usable on a host** — sending to it reaches every host
- **Class A is NOT 0–127** for usable host networks — 127 is reserved for loopback, so 1–126
- **Class D is NOT for hosts** — it's multicast (224–239)
- **/24 does NOT mean 24 hosts** — it means 24 network bits, leaving 8 host bits = 254 usable

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Convert 11000000 to decimal | **192** (128+64) |
| First octet 192–223 = which class? | **Class C** (/24) |
| First octet 128–191 = which class? | **Class B** (/16) |
| Address 127.0.0.1 is | **Loopback** — local stack test |
| Network address of 192.168.1.50/24 | **192.168.1.0** |
| Broadcast address of 192.168.1.50/24 | **192.168.1.255** |
| Netmask equivalent of /16 | **255.255.0.0** |
| Range of 8 binary bits | **0 to 255** |

## ⚡ One-Line Master Recall

**32 bits → 4 octets → prefix /N splits network from host → first address is the network, last is the broadcast, everything between is usable.**

## ➕ EXTRA — not in video, but on the exam

- **APIPA 169.254.0.0/16** — auto-assigned when DHCP fails (covered later, but v1.1 expects recognition).
- **Private ranges** (RFC 1918): 10/8, 172.16/12, 192.168/16 — Day 7 doesn't list these; covered Day 44 NAT but exam may pair them with addressing.
- **Subnet zero** — modern Cisco IOS allows `ip subnet-zero` by default; older docs may say avoid.

## 🧾 Recap

- IPv4 = **32 bits, 4 octets, dotted decimal** for humans, binary underneath.
- **Prefix length /N** splits network bits from host bits — same as netmask, just newer notation.
- **Network address (host=all 0s)** and **broadcast (host=all 1s)** can't be assigned to hosts.
- **Classes A/B/C** = legacy /8, /16, /24; class D = multicast; class E = experimental.
- If you can convert any octet to/from binary in 30 seconds and identify the network/broadcast for a /24, move to Day 8.

---
Source: Jeremy's IT Lab — Day 7 — https://www.youtube.com/watch?v=3ROdsfEUuhs
