---
title: "Free CCNA | IPv4 Header | Day 10 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-10
source_transcript: "[[../jeremy-it-videos/018-ipv4-header-day-10]]"
source_url: https://www.youtube.com/watch?v=aQB22y4liXA
created: 2026-04-28
tags: [ccna, cheat-sheet, day-10]
---

# Day 10 — IPv4 Header

## 🎯 What this video covers

Maps to v1.1 blueprint **1.5/1.6 IP fundamentals** — every field in the 20-byte IPv4 header, fragmentation flags, TTL, protocol numbers. The header you'll see in every Wireshark capture for the rest of the course.

## 🧠 Core Concept

**The IPv4 header is fixed 20 bytes (60 max), tracks fragmentation + TTL hop-count + Layer-4 protocol — and the receiving host (not router) reassembles fragments.**

## 🔑 Must-Know Table

| Field | Length | Purpose | Exam giveaway |
|---|---|---|---|
| **Version** | 4 bits | IP version (4 = `0100`) | First field, always 4 |
| **IHL** | 4 bits | Header length **in 4-byte units** | `5` = 20 bytes (min) |
| **DSCP** | 6 bits | QoS marking | "priority", "voice/video" |
| **ECN** | 2 bits | Congestion notification w/o drops | "without dropping" |
| **Total Length** | 16 bits | Header + payload, in **bytes** | Max 65,535 |
| **Identification** | 16 bits | Tags fragments belonging to same packet | "reassembly" |
| **Flags** | 3 bits | Reserved/DF/MF | DF = don't fragment |
| **Fragment Offset** | 13 bits | Position of fragment in original | "out of order reassembly" |
| **TTL** | 8 bits | Hop count, drops at 0 | "prevents loops", default 64 |
| **Protocol** | 8 bits | L4 type — TCP=6, UDP=17, ICMP=1, OSPF=89 | "encapsulated protocol" |
| **Header Checksum** | 16 bits | Error check on **header only** | Not on payload |
| **Source / Dest IP** | 32 bits each | Sender / receiver IP | — |
| **Options** | 0–320 bits | Variable, rarely used | Only field that varies |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **IHL vs Total Length** | IHL = header only, in **4-byte units**. Total Length = whole packet, in **bytes** |
| **Header checksum vs TCP/UDP checksum** | Header checksum = IPv4 header only. TCP/UDP checksum covers payload |
| **DF bit vs MF bit** | DF = don't fragment (set by sender). MF = more fragments (set on all but last fragment) |
| **Identification vs Fragment Offset** | Identification = which packet. Offset = where in that packet |

## 🔗 How it all connects

```
[Data] + L4 hdr = Segment → +IPv4 hdr (20B) = Packet → +L2 hdr/trailer = Frame
```

## 🚨 Exam Traps

- **IHL is NOT in bytes** — it's in **4-byte units** (IHL=5 → 20 bytes)
- **TTL is NOT seconds** — it's a **hop count**
- **Routers do NOT reassemble fragments** — the **destination host** does
- **MF=1 on last fragment is NOT correct** — last fragment has MF=**0**
- **Header checksum does NOT cover the payload** — only the header
- **DF=1 + size > MTU = packet dropped** — not silently fragmented

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| First field of IPv4 header | **Version** (always 4) |
| Field that drops packet at 0 | **TTL** |
| Errors in encapsulated data detected by | **TCP/UDP checksum** (not IPv4) |
| Variable-length field | **Options** |
| Bit set on all fragments except last | **MF (More Fragments)** |
| Protocol number for TCP / UDP / ICMP / OSPF | **6 / 17 / 1 / 89** |
| Min / max IPv4 header length | **20 / 60 bytes** |
| Default TTL | **64** |

## ⚡ One-Line Master Recall

**Version 4, IHL×4=20B min, TTL hops to 0, Protocol picks L4 (6/17/1/89), DF/MF/Offset rebuild fragments at the host.**

## ➕ EXTRA — not in video, but on the exam

- **MTU 1500** — Ethernet default. Path MTU Discovery uses DF bit + ICMP "frag needed" to find smallest MTU on a path.
- **DSCP values** — EF (46) for voice, AF31/AF41 for video. Day 47 (QoS pt 2) covers PHBs.
- **IPv6 has no header checksum and no fragmentation by routers** — both removed for performance. Source-only fragmentation in IPv6.

## 🧾 Recap

- IPv4 header = **20 bytes minimum, 60 maximum** (Options is the variable field).
- **TTL = hop count, default 64.** Drops at 0 to kill routing loops.
- **Protocol numbers**: TCP=6, UDP=17, ICMP=1, OSPF=89.
- **Fragments reassembled by destination host**, identified by Identification field, ordered by Fragment Offset, terminated by MF=0.
- If you can name 8/12 fields cold, move to Day 11 (routing fundamentals).

---
Source: Jeremy's IT Lab — Day 10 — https://www.youtube.com/watch?v=aQB22y4liXA
