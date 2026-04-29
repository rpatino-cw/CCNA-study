---
title: "Free CCNA | Ethernet LAN Switching (Part 2) | Day 6 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-06
source_transcript: "[[../jeremy-it-videos/011-ethernet-lan-switching-part-2-day-6]]"
source_url: https://www.youtube.com/watch?v=5q1pqdmdPjo
created: 2026-04-28
tags: [ccna, cheat-sheet, day-06]
---

# Day 6 — Ethernet LAN Switching (Part 2)

## 🎯 What this video covers

Maps to v1.1 blueprint **1.13 Describe switching concepts** (frame switching, MAC learning/aging, frame flooding, MAC table). Adds ARP (1.6) and ICMP/ping basics. Foundational for VLANs, trunking, STP, and every Day-2 troubleshooting question.

## 🧠 Core Concept

**A switch builds a MAC table dynamically; ARP resolves IP→MAC so the switch has something to look up.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **ARP request** | Broadcast asking "who has this IP?" | L2 broadcast `FFFF.FFFF.FFFF` | "needs to learn MAC of known IP" |
| **ARP reply** | Unicast back to requester | L2 unicast | "tells PC1 PC3's MAC" |
| **ARP table** | IP↔MAC cache on host/router | Host/router OS — `arp -a` / `show arp` | "dynamic" vs "static" type |
| **MAC address table** | Switch's port↔MAC map | Switch — `show mac address-table` | "VLAN, MAC, type, ports" |
| **MAC aging** | Auto-clears unused entries (5 min default) | Switch | "removed after 5 minutes" |
| **Ping (ICMP echo)** | Tests reachability + RTT | End host / Cisco IOS | "echo request / echo reply" |
| **Padding** | Zero bytes to hit 46-byte payload min | Ethernet payload | "frame less than 64 bytes" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **ARP vs Ping** | ARP learns MAC for known IP. Ping tests reachability — needs ARP first |
| **Broadcast vs Unknown unicast** | Both flooded out all ports except inbound — but broadcast dest = all-Fs, unknown unicast dest = a specific MAC not yet learned |
| **Dynamic vs Static MAC entry** | Dynamic = learned from source MAC of incoming frame. Static = manually configured |
| **`clear mac address-table dynamic` vs `... address X` vs `... interface Y`** | Clear all dynamic / one MAC / all on one port |

## 🔗 How it all connects

```
PC1 wants PC3 → ARP request (bcast) → SW floods → PC3 ARP reply (unicast) → PC1 caches MAC → ICMP echo → PC3 echo reply
```

## 🚨 Exam Traps

- **ARP request is NOT** unicast — it's broadcast (dest all-Fs)
- **ARP reply is NOT** broadcast — it's unicast back to requester
- **First ping often fails** — NOT a network problem; ARP delay consumed the timeout
- **Padding is NOT** part of the FCS — it's added zeros to meet the 46-byte payload minimum
- **MAC table is NOT** the ARP table — switch has MAC table, host/router has ARP table
- **Preamble + SFD** are sent with every frame but NOT counted in the 64-byte minimum

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Frames flooded out all ports except inbound | **Broadcast + unknown unicast** |
| Ethernet header + trailer size (no preamble) | **18 bytes** |
| Minimum Ethernet frame / payload | **64 bytes / 46 bytes** |
| Broadcast MAC | **FFFF.FFFF.FFFF** |
| Default MAC aging timer | **5 minutes (300s)** |
| Cisco IOS ARP table command | **`show arp`** |
| Linux/Win/macOS ARP table command | **`arp -a`** |
| MAC table fields shown by `show mac address-table` | **VLAN, MAC, type, ports** |
| Clear all dynamic MACs on Gi0/0 | **`clear mac address-table dynamic interface gi0/0`** |
| EtherType for IPv4 / IPv6 / ARP | **0x0800 / 0x86DD / 0x0806** |

## ⚡ One-Line Master Recall

**ARP learns the MAC, the switch learns the port, ping just rides on top.**

## ➕ EXTRA — not in video, but on the exam

- **Gratuitous ARP** — host announces its own IP/MAC unsolicited (HSRP, duplicate-IP detection). v1.1 may surface this in FHRP context.
- **Proxy ARP** — router answers ARP for an IP it has a route to. CCNA mentions in static-route context (Day 11).

## 🧾 Recap

- **ARP = IP→MAC lookup.** Request broadcast, reply unicast.
- **Switch MAC table** has 4 columns: VLAN / MAC / type / ports.
- **Aging = 5 min default**; clear with `clear mac address-table dynamic [...]`.
- **Padding** fills payloads under 46 bytes — NOT part of FCS.
- If you can answer 7/10 in the Quick-Answer Map without peeking, move to Day 7.

---
Source: Jeremy's IT Lab — Day 6 — https://www.youtube.com/watch?v=5q1pqdmdPjo
