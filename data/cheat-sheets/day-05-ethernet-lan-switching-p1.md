---
title: "Free CCNA | Ethernet LAN Switching (Part 1) | Day 5 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-05
source_transcript: "[[../jeremy-it-videos/010-ethernet-lan-switching-part-1-day-5]]"
source_url: https://www.youtube.com/watch?v=u2n762WG0Vo
created: 2026-04-28
tags: [ccna, cheat-sheet, day-05]
---

# Day 5 — Ethernet LAN Switching (Part 1)

## 🎯 What this video covers

Maps to v1.1 blueprint **1.13 Describe switching concepts** (MAC learning/aging, frame switching, flooding). Also touches **1.6 Configure and verify IPv4/Ethernet header structure**. Foundation for VLANs (Day 16), STP (Day 18), and inter-VLAN routing.

## 🧠 Core Concept

**Switches learn from source MAC, forward by destination MAC — flood when unknown, drop nothing.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **Preamble** | 7-byte 10101010 pattern for clock sync | Ethernet header (start) | "synchronization", "receiver clock" |
| **SFD** | 1 byte, ends in `1`, marks frame start | Ethernet header (after preamble) | "start of frame", "10101011" |
| **Destination MAC** | 6 bytes — who frame goes to | Header field 3 | "where the frame is going" |
| **Source MAC** | 6 bytes — who sent the frame | Header field 4 | "switch uses to LEARN" |
| **Type/Length** | 2 bytes; ≥1536 = type, ≤1500 = length | Header field 5 | "0x0800 = IPv4, 0x86DD = IPv6" |
| **FCS** | 4-byte CRC for error detection | Trailer | "Cyclic Redundancy Check", "detect errors" |
| **MAC address** | 48-bit burned-in physical address | NIC | "BIA", "globally unique", "12 hex digits" |
| **OUI** | First 3 bytes (24 bits) of MAC | MAC half 1 | "manufacturer", "vendor" |
| **MAC address table** | Map of MAC → interface | Switch RAM | "5-min aging", "dynamic" |
| **Unknown unicast** | Dest MAC not in table | Frame state | "FLOOD out all but receive port" |
| **Known unicast** | Dest MAC in table | Frame state | "forward only out matching port" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Preamble vs SFD** | Preamble = 7B clock sync; SFD = 1B "frame begins now" |
| **Type vs Length** | Same 2-byte field. ≥1536 = Type (IPv4 0x0800). ≤1500 = byte-length |
| **Source vs Destination MAC** | Switch reads SOURCE to learn, DESTINATION to forward |
| **Unknown vs Known unicast** | Unknown → flood. Known → forward to one port |
| **Flooding vs forwarding** | Flood = all ports except receive. Forward = one matching port |

## 🔗 How it all connects

```
Frame in → read SRC MAC → learn → check DST MAC in table → known? forward : flood (all but in-port)
```

## 🚨 Exam Traps

- **Source MAC is NOT** for forwarding decisions — it's for **learning**
- **Destination MAC is NOT** what populates the table — that's source
- **MAC address is NOT** 48 bytes — it's 48 **bits** (6 bytes)
- **Switch is NOT** sending frames out the port they came in on (split horizon for unicast)
- **Unknown unicast is NOT** dropped — it's flooded
- **FCS is NOT** in the header — it's the trailer

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Field used to populate MAC address table | **Source MAC address** |
| What does an unknown unicast trigger | **Flood (all ports except receive)** |
| Length of a MAC address | **48 bits / 6 bytes** |
| OUI of `E8BA.7011.2874` | **E8BA.70** |
| Frame field for receiver clock sync | **Preamble** |
| Default Cisco MAC aging time | **5 minutes** |
| Type value for IPv4 | **0x0800** |
| Trailer field name | **FCS (Frame Check Sequence)** |

## ⚡ One-Line Master Recall

**Learn from source, forward by destination, flood when unknown, age out at 5 minutes.**

## ➕ EXTRA — not in video, but on the exam

- **Static MAC entries** — admin can manually add MAC + port mapping (`mac address-table static …`). Won't age out. v1.1 may ask "how to make a MAC entry permanent."
- **Broadcast MAC** = `FFFF.FFFF.FFFF` — flooded by switches, blocked by routers. Defines a broadcast domain (link to Day 16 VLANs).
- **Multicast MAC** starts with `01:00:5E` (IPv4 multicast) — also flooded by default unless IGMP snooping is on.
- **Show command:** `show mac address-table` — lists learned + static entries. Likely on exam.

## 🧾 Recap

- **Ethernet header = 5 fields** (Preamble, SFD, Dest, Src, Type/Length); **trailer = 1 field** (FCS).
- Switch **learns** source MAC → port; **forwards** by destination lookup.
- **Unknown unicast = flood**, known unicast = forward, default Cisco aging = **5 min**.
- MAC = **48 bits** (12 hex chars), first 3 bytes = **OUI** (vendor).
- If you can answer 6/8 stems above without peeking, move to Day 6.

---
Source: Jeremy's IT Lab — Day 5 — https://www.youtube.com/watch?v=u2n762WG0Vo
