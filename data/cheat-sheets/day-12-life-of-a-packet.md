---
title: "Free CCNA | The Life of a Packet | Day 12 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-12
source_transcript: "[[../jeremy-it-videos/023-the-life-of-a-packet-day-12]]"
source_url: https://www.youtube.com/watch?v=4YrYV2io3as
created: 2026-04-28
tags: [ccna, cheat-sheet, day-12]
---

# Day 12 — The Life of a Packet

## 🎯 What this video covers

Maps to v1.1 blueprint **1.3 Compare physical interface and cabling types** + **2.x Network access** + **3.x IP connectivity** — synthesis video showing how ARP, encapsulation, routing, and switching combine when a packet traverses multiple subnets. Critical for trace/diagram exam questions.

## 🧠 Core Concept

**Layer 3 (IP) addresses stay the same end-to-end; Layer 2 (MAC) addresses are rewritten by every router hop. Switches never rewrite — they only forward and learn.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **ARP request** | Broadcast asking "who has IP X?" | Source = sender, Dest MAC = all Fs | "destination MAC FFFF.FFFF.FFFF" |
| **ARP reply** | Unicast back with the MAC | Sent only to the requester | "unicast reply with MAC" |
| **Default gateway** | Router used to reach off-subnet destinations | Configured on every host | "destination is in different network" |
| **De-encapsulation** | Router strips Ethernet header | Done at every router hop | "removes the ethernet header" |
| **Re-encapsulation** | Router builds new Ethernet header for next hop | Done at every router hop | "new source/dest MAC" |
| **Switch behavior** | Forwards frames unchanged; learns source MACs | At every switch port | "doesn't modify the frame" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **IP header vs Ethernet header** | IP = end-to-end (PC1 → PC4 unchanged). Ethernet = hop-by-hop (rewritten each router) |
| **ARP request vs ARP reply** | Request = broadcast (all Fs). Reply = unicast (sender already learned the requester's MAC) |
| **Router vs switch on the path** | Router de-encapsulates, looks up routing table, re-encapsulates. Switch just forwards |
| **First packet vs subsequent packets** | First trip needs ARP at every hop. After that, MACs are cached — straight forwarding |

## 🔗 How it all connects

```
[PC1] →ARP→ [R1] →ARP→ [R2] →ARP→ [R4] →ARP→ [PC4]   (Src/Dst IP fixed; MACs rewritten each hop)
```

## 🚨 Exam Traps

- **Source IP is NOT the previous router's IP** — it stays as the original sender's IP through the whole trip
- **Destination MAC at PC1 is NOT PC4's MAC** — it's R1's MAC (the default gateway), because PC4 is off-subnet
- **Switches do NOT rewrite source MAC** — only routers do; switches just forward
- **ARP is NOT used for off-subnet destinations directly** — host ARPs for the gateway, not the final dest
- **Once ARP cache is populated, subsequent packets do NOT trigger ARP** — only the first one in each direction

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Dest MAC when PC1 sends to PC4 (off-subnet) | **MAC of PC1's default gateway (R1)** |
| Source IP at every hop along the path | **PC1's IP — never changes** |
| Source MAC arriving at R1's G0/0 from R2 | **R2's egress interface MAC** |
| Does the switch change the frame's source MAC? | **No — switch only forwards** |
| Why does PC1 send ARP first? | **It doesn't know R1's MAC yet** |
| Dest MAC of an ARP request | **FFFF.FFFF.FFFF (broadcast)** |
| Dest MAC of an ARP reply | **The original requester's MAC (unicast)** |

## ⚡ One-Line Master Recall

**Host ARPs for gateway → encapsulates with gateway MAC → router strips L2, looks up L3, ARPs next hop, re-encapsulates → repeat until last hop ARPs the destination → IP header never changes, MAC header changes every hop.**

## ➕ EXTRA — not in video, but on the exam

- **TTL decrements at each router hop** — Jeremy doesn't show this, but v1.1 expects you to know TTL=0 → packet dropped, ICMP time-exceeded sent.
- **Proxy ARP** — router answering ARP on behalf of a remote host. Rare but on Cisco's blueprint under troubleshooting.
- **ARP cache timeout** — default ~4 hours on Cisco, ~2 minutes on most OSes; entry ages out and re-ARPs.

## 🧾 Recap

- **IP source/dest never change** end-to-end; **MAC source/dest change at every router hop.**
- Hosts ARP for **the gateway**, not the remote destination.
- **Switches forward unchanged** — they only learn source MACs into the CAM table.
- After the first round-trip, **ARP caches eliminate further ARP** for that conversation.
- If you can fill in src/dst MAC and src/dst IP at any point on a 4-router topology without peeking, move to Day 13.

---
Source: Jeremy's IT Lab — Day 12 — https://www.youtube.com/watch?v=4YrYV2io3as
