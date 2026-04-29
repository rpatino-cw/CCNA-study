---
title: "How the TCP/IP Model Actually Works | CCNA Day 3"
type: ccna-cheat-sheet
day: day-03
source_transcript: "[[../jeremy-it-videos/006-how-the-tcpip-model-actually-works-ccna-day-3]]"
source_url: https://www.youtube.com/watch?v=yM-XNq9ADlI
created: 2026-04-28
tags: [ccna, cheat-sheet, day-03]
---

# Day 3 — TCP/IP Model

## 🎯 What this video covers

Maps to v1.1 blueprint **1.5 (TCP vs UDP context)** and the underlying layered framework every later objective hangs on. Builds the 5-layer TCP/IP stack, encapsulation/decapsulation, PDUs, and same-/adjacent-layer interaction.

## 🧠 Core Concept

**Each layer does one job, uses the layer below, and serves the layer above — protocols swap freely as long as the layer "contract" holds.**

## 🔑 Must-Know Table

| Layer (#) | Job | Addresses | Example protocols | PDU |
|---|---|---|---|---|
| **Application (5/7)** | Format/interpret app data | — | HTTP, HTTPS, FTP, TFTP, DNS | data |
| **Transport (4)** | Process-to-process, end-to-end | Port numbers | **TCP, UDP** | segment (TCP) / datagram (UDP) |
| **Internet (3)** | Host-to-host across networks | IP addresses | **IPv4, IPv6, ICMP** | packet |
| **Local Network / Data Link (2)** | Hop-to-hop on a LAN | MAC addresses | **Ethernet, Wi-Fi** | frame |
| **Physical (1)** | Bits as electrical/optical/radio signals | — | UTP, fiber, NIC | bits |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Encapsulation vs Decapsulation** | Sender **adds** headers down the stack; receiver **strips** them back up |
| **Segment vs Packet vs Frame** | L4 PDU = segment/datagram. L3 PDU = packet. L2 PDU = frame (only frames cross the wire) |
| **TCP segment vs UDP datagram** | Same layer (L4), different reliability — TCP creates segments, UDP creates datagrams |
| **Adjacent-layer vs Same-layer interaction** | Within one host (layer-to-layer service) vs between hosts (L4↔L4, L3↔L3, etc.) |
| **TCP/IP model vs OSI** | TCP/IP = real stack, 5-layer. OSI = 7-layer reference. Application = "Layer 7" by OSI count |

## 🔗 How it all connects

```
[App: HTTP] → [L4 + port] → [L3 + IP] → [L2 + MAC] → [L1 bits] →→→ wire →→→ reverse on receiver
```

## 🚨 Exam Traps

- **Frame is NOT** the same as packet — only frames travel on the wire
- **Routers do NOT** look at L4 ports for normal forwarding (L3 only)
- **Switches do NOT** count as a "hop" — only routers do
- **"Internet" layer is NOT** "the Internet" — it means *internetwork* (between LANs)
- **Layer 2 ≠ Layer 3** — MAC = hop-to-hop, IP = end-to-end
- **TCP segment ≠ UDP datagram** — name depends on the L4 protocol used

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Process-to-process communication uses what? | **Port numbers (L4)** |
| Hop-to-hop delivery on a LAN uses what? | **MAC addresses (L2)** |
| End-to-end host delivery uses what? | **IP addresses (L3)** |
| TCP creates a what? | **Segment** |
| UDP creates a what? | **Datagram** |
| L3 PDU is called? | **Packet** |
| L2 PDU is called? | **Frame** |
| What travels over the wire? | **Frames (bits as signals)** |
| Removing headers layer by layer is called? | **Decapsulation** |
| HTTP, FTP, DNS live at which layer? | **Application (L5/L7)** |

## ⚡ One-Line Master Recall

**Bits → Frame (MAC, hop) → Packet (IP, end-to-end) → Segment/Datagram (port, process) → Application data.**

## ➕ EXTRA — not in video, but on the exam

- **TCP vs UDP details (1.5)** — TCP = connection-oriented, 3-way handshake, ordered, reliable, retransmits. UDP = connectionless, fire-and-forget, lower overhead. Covered Day 30.
- **OSI layer names** — Network (L3), Data Link (L2), Presentation (L6), Session (L5). Exam may use OSI names interchangeably.
- **Common port numbers** — HTTP 80, HTTPS 443, SSH 22, Telnet 23, FTP 20/21, DNS 53, SMTP 25, SNMP 161. Memorize.

## 🧾 Recap

- **5 layers, top-down: Application, Transport, Internet, Local/Data-Link, Physical.**
- **Encapsulation adds headers going down; decapsulation strips them going up.**
- **PDU names: segment/datagram (L4) → packet (L3) → frame (L2) → bits (L1).**
- **Same-layer talks across; adjacent-layer talks down/up within one host.**
- If you can name the layer for any protocol or PDU on sight, you're green-light for Day 4.

---
Source: Jeremy's IT Lab — Day 3 — https://www.youtube.com/watch?v=yM-XNq9ADlI
