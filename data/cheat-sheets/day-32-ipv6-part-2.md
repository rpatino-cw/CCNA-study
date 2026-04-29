---
title: "Free CCNA | IPv6 Part 2 | Day 32 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-32
source_transcript: "[[../jeremy-it-videos/065-ipv6-part-2-day-32]]"
source_url: https://www.youtube.com/watch?v=BrTMMOXFhDU
created: 2026-04-28
tags: [ccna, cheat-sheet, day-32]
---

# Day 32 — IPv6 Part 2 (Address Types + EUI-64)

## 🎯 What this video covers

Maps to v1.1 blueprint **1.9 Configure and verify IPv6 addressing and prefix** — sub-topics 1.9.a–f (global unicast, unique local, link-local, anycast, multicast, modified EUI-64). High-density video; expect multiple exam questions on address-type identification.

## 🧠 Core Concept

**IPv6 has multiple address types defined by their leading bits — recognize the prefix on sight, and remember EUI-64 expands a 48-bit MAC into a 64-bit interface ID.**

## 🔑 Must-Know Table

| Term | One-line function | Prefix / range | Exam giveaway phrase |
|---|---|---|---|
| **Global unicast** | Public, routable on Internet | Originally 2000::/3 (now most non-reserved) | "registered, public" |
| **Unique local** | Private, internal only — not routed on Internet | FC00::/7 (in practice FD..) | "like RFC 1918 private" |
| **Link-local** | Auto-generated on every IPv6 interface; local subnet only | FE80::/10 (only FE80 in practice) | "automatic, single link" |
| **Multicast** | One-to-many | FF00::/8 | "all nodes / all routers / OSPF" |
| **Anycast** | One-to-one-of-many (nearest of duplicates) | Any unicast address marked `anycast` | "multiple routers, same IP" |
| **Unspecified** | "I don't have an address yet" | `::` (all 0s) | "default route ::/0" |
| **Loopback** | Local test address | `::1` | "IPv6 equivalent of 127.0.0.1" |
| **EUI-64** | Auto-generates 64-bit interface ID from MAC | `ipv6 address PREFIX/64 eui-64` | "FFFE inserted, 7th bit flipped" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Global unicast vs unique local** | Global = public, registered. Unique local = private, ISP drops it |
| **Link-local vs link-local multicast scope** | Address FE80 = unicast on this link. Multicast scope FF02 = multicast on this link (different concept, similar idea) |
| **Multicast vs anycast** | Multicast = packet goes to ALL members. Anycast = packet goes to ONE (nearest) of identical addresses |
| **`ipv6 enable` vs `ipv6 address`** | `ipv6 enable` → only link-local. `ipv6 address` → global/ULA + auto link-local |

## 🔗 How it all connects

```
[Interface]→[ipv6 enable adds FE80 link-local]→[ipv6 address X/64 adds GUA/ULA]→[All ints have ≥1 link-local]
```

## 🚨 Exam Traps

- **Link-local addresses are NOT routable** — routers drop packets destined to FE80::/10
- **Unique local addresses are NOT public** — your ISP drops them, but they ARE routable inside your org
- **EUI-64 does NOT just insert FFFE** — it also flips the 7th bit (U/L bit)
- **IPv6 has NO broadcast** — the "all nodes" multicast FF02::1 replaces it
- **Site-local multicast (FF05) IS routable** between subnets within the boundary; link-local (FF02) is NOT
- **Anycast does NOT have a special prefix** — it's a regular unicast address marked with `anycast` keyword

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Link-local prefix | **FE80::/10** |
| Unique local prefix | **FC00::/7** (in practice FD..) |
| All-nodes (broadcast replacement) link-local multicast | **FF02::1** |
| All-routers link-local multicast | **FF02::2** |
| OSPFv3 all-routers multicast | **FF02::5** |
| EIGRP for IPv6 multicast | **FF02::A** |
| IPv6 loopback | **::1** |
| IPv6 default route prefix | **::/0** |
| EUI-64: what's inserted in the middle of the MAC? | **FFFE** |
| EUI-64: which bit gets flipped? | **7th bit (U/L bit)** |
| Two non-routable IPv6 prefixes | **FE80::/10 and FF02 (link-local multicast)** |

## ⚡ One-Line Master Recall

**FE80 = link-local (auto, unrouted), FC00/FD = unique local (private), 2000s = global unicast (public), FF = multicast (FF02 link, FF05 site, FF0E global), :: = unspecified, ::1 = loopback — and EUI-64 splits the MAC, inserts FFFE, flips bit 7.**

## ➕ EXTRA — not in video, but on the exam

- **SLAAC** (Day 33) — uses RA + EUI-64 (or random) to auto-configure global addresses; expect questions pairing it with EUI-64.
- **NDP** — IPv6's ARP replacement, runs over ICMPv6 with link-local addresses (Day 33).
- **Solicited-node multicast** — FF02::1:FFXX:XXXX, used by NDP; Jeremy hints at this in `show ipv6 interface`.

## 🧾 Recap

- **Recognize prefix → know type**: 2000s = GUA, FD = ULA, FE80 = link-local, FF = multicast, ::1 = loopback.
- **EUI-64 = split MAC + insert FFFE + flip 7th bit** to get a 64-bit interface ID.
- **No broadcast in IPv6** — `FF02::1` is the all-nodes substitute.
- **Link-local addresses (and link-local multicasts) are not routable** between subnets.
- If you can identify any IPv6 address by its prefix and compute an EUI-64 manually, move to Day 33.

---
Source: Jeremy's IT Lab — Day 32 — https://www.youtube.com/watch?v=BrTMMOXFhDU
