---
title: "Free CCNA | IPv6 Part 3 | Day 33 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-33
source_transcript: "[[../jeremy-it-videos/067-ipv6-part-3-day-33]]"
source_url: https://www.youtube.com/watch?v=rwkHfsWQwy8
created: 2026-04-28
tags: [ccna, cheat-sheet, day-33]
---

# Day 33 — IPv6 (Part 3)

## 🎯 What this video covers

Maps to v1.1 blueprint **1.8/1.9 (IPv6 addressing + verify IPv6)** and **3.3 (IPv6 static routes)**. NDP replaces ARP, SLAAC builds addresses automatically, and static routes work like IPv4 with one Ethernet exception.

## 🧠 Core Concept

**IPv6 has no broadcast and no ARP. NDP uses ICMPv6 Neighbor Solicitation/Advertisement (135/136) on solicited-node multicast. SLAAC uses Router Solicitation/Advertisement (133/134) to learn the prefix. Static routes need a next-hop or interface — directly-attached only fails on Ethernet.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **NDP** | Replaces ARP in IPv6 | ICMPv6 messages 133–136 | "neighbor discovery" |
| **NS / NA** | Learn neighbor MAC (ARP equivalent) | ICMPv6 type 135 / 136 | "what's your MAC" / "here's mine" |
| **RS / RA** | Discover routers + prefix | ICMPv6 type 133 / 134 | "any routers?" / "I'm here, prefix is..." |
| **Solicited-node multicast** | `ff02::1:ff` + last 24 bits of unicast | Used in NS / DAD | "ff02::1:ff..." |
| **SLAAC** | Auto-configure address from RA prefix | `ipv6 address autoconfig` | "stateless auto-config" |
| **DAD** | Duplicate Address Detection via NS to own SNMA | Every new IPv6 address | "is anyone using this?" |
| **`ipv6 unicast-routing`** | Enables IPv6 routing on Cisco router | Global config | "off by default" |
| **/128 host route** | Single-host IPv6 route | Static route | "specific host" |
| **`::/0`** | IPv6 default route | Static route | "default route" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **NS vs ARP request** | Both ask for MAC. NS = ICMPv6 type 135, multicast to solicited-node. ARP = broadcast. NS is more efficient |
| **RA (FF02::1) vs NS (solicited-node)** | RA = all-nodes (everyone). NS = one specific host's solicited-node group |
| **EUI-64 vs SLAAC** | EUI-64 = method to build interface ID from MAC. SLAAC = process that learns prefix via RA + builds full address (often using EUI-64) |
| **Directly-attached vs Recursive vs Fully-specified static** | Exit interface only / next-hop only / both. **Directly-attached fails on Ethernet in IPv6** |
| **Link-local next-hop** | Must use fully-specified (next-hop + exit interface) — router can't resolve link-local alone |
| **/128 host route vs /64 network route** | /128 = one host. /64 = a whole subnet |

## 🔗 How it all connects

```
[New host comes online] → [RS to FF02::2] → [Router replies RA to FF02::1, prefix 2001:db8::/64]
                          → [SLAAC builds address] → [DAD via NS to own SNMA] → [Address ready]
```

## 🚨 Exam Traps

- **IPv6 has NO ARP and NO broadcast** — uses NDP + multicast
- **`ipv6 unicast-routing` is OFF by default** — most common reason "IPv6 doesn't work"
- **Directly-attached static routes do NOT work on Ethernet in IPv6** — use recursive or fully-specified
- **Link-local next-hop REQUIRES fully-specified** — must include exit interface
- **RFC 5952 lowercase rule** — hex must be lowercase, leading zeros removed, longest run of `::` shortened (Cisco often violates this)
- **Floating static AD must beat the protocol's AD** — static (1) beats OSPF (110) by default; you raise it ABOVE 110/90 to make it a backup

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| ICMPv6 type for Neighbor Solicitation | **135** |
| ICMPv6 type for Neighbor Advertisement | **136** |
| ICMPv6 type for Router Solicitation | **133** |
| ICMPv6 type for Router Advertisement | **134** |
| Multicast address RA is sent to | **FF02::1** (all nodes) |
| Multicast address RS is sent to | **FF02::2** (all routers) |
| What does DAD use | **NS** (sent to own solicited-node) |
| Cmd to enable IPv6 routing | **`ipv6 unicast-routing`** |
| IPv6 default route | **`ipv6 route ::/0 <next-hop>`** |
| Recursive static (next-hop only) | **`ipv6 route <prefix> <next-hop>`** |
| When is directly-attached invalid | **On Ethernet links in IPv6** |

## ⚡ One-Line Master Recall

**No ARP, no broadcast — NDP runs on ICMPv6 (NS/NA 135/136 = ARP, RS/RA 133/134 = router discovery + SLAAC) → SLAAC needs `ipv6 unicast-routing` and an RA-sending router → static routes work like IPv4 except directly-attached fails on Ethernet and link-local next-hops need fully-specified syntax.**

## ➕ EXTRA — not in video, but on the exam

- **Manual + EUI-64 + SLAAC + DHCPv6** — four ways to assign IPv6 addresses. v1.1 tests configuring/verifying each. EUI-64 inserts FFFE in the middle of MAC and flips the U/L bit.
- **DHCPv6** — stateful (full address + options) vs stateless (RA gives address, DHCPv6 only gives DNS). Day 34+ topic but appears on exam.
- **Link-local FE80::/10** — every IPv6 interface auto-generates one; required for routing protocols (OSPFv3 uses link-local as next-hop).

## 🧾 Recap

- **NDP replaces ARP**: NS/NA (135/136) for MACs, RS/RA (133/134) for routers.
- **SLAAC** = host learns prefix from RA + builds suffix → needs `ipv6 unicast-routing` on router.
- **DAD uses NS** to its own solicited-node multicast.
- **Static route exception**: directly-attached fails on Ethernet — use recursive or fully-specified.
- If you can label the four NDP message types and write a recursive default route from memory, move to Day 34.

---
Source: Jeremy's IT Lab — Day 33 — https://www.youtube.com/watch?v=rwkHfsWQwy8
