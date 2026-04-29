---
title: "Day 1 — Network Devices (Cheat Sheet)"
type: ccna-cheat-sheet
day: 1
blueprint: 1.1.a–h
source_transcript: "[[../jeremy-it-videos/001-network-devices-day-1]]"
created: 2026-04-28
tags: [ccna, cheat-sheet, day-1, network-devices]
---

# Day 1 — Network Devices

## 🎯 What this video covers

Maps to v1.1 blueprint **1.1 Explain the role and function of network components** (routers, switches, firewalls, endpoints, servers — sub-rows 1.1.a/b/c/f/g introduced; APs, controllers, PoE land later in Day 52, 55–58). Foundational — every later objective (VLANs, routing, security, wireless) reuses these five device roles.

## 🧠 Core Concept

**A network = nodes connected to share resources. Five named device types do the work: client, server, switch, router, firewall.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **Client** | Device that **accesses** a service | End host (PC, phone, laptop) | "watching", "requesting", "receiving service" |
| **Server** | Device that **provides** services | End host (rack server OR any client acting as one) | "providing", "sending the file", "AirDrop sender" |
| **Switch** | Forwards traffic **within** a LAN | Local network — 24+ ports | "connect 30 PCs", "same LAN", "many ports" |
| **Router** | Forwards traffic **between** LANs / to Internet | Network edge — few ports | "connect separate networks", "send over Internet" |
| **Firewall** | Filters traffic by configured allow/deny rules | Inside or outside the router | "control traffic entering/exiting", "block attacker" |
| **End host / endpoint** | Any client OR server | Edge of network | Generic — not the answer when asked for a *function* |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Client vs Server** | Same hardware can be either — role is determined per transaction (who requests vs who provides) |
| **Switch vs Router** | Switch = same LAN. Router = different networks. Switch has many ports; router has few |
| **Network firewall vs Host-based firewall** | Hardware appliance between networks vs software on a single PC. Both should exist |
| **Traditional firewall vs Next-generation firewall (NGFW)** | NGFW adds advanced filtering (IPS = intrusion prevention). Modern Cisco ASAs and Firepower are NGFWs |

## 🔗 How it all connects

```
[Client/PC] → [Switch] → [Router] → [Firewall] → [Internet] → [Firewall] → [Router] → [Switch] → [Server]
```

## 🚨 Exam Traps

- **Router is NOT** for connecting many end hosts — too few ports
- **Firewall is NOT** for connecting devices — its job is filter, not aggregate
- **Server is NOT** a networking device — it's an end host
- **LAN is NOT** a device — it's the area/domain
- **Host-based firewall is NOT** a network firewall — it's software on one PC
- **End host** describes *what a device is*, not *what it's doing* — when asked for function, pick client or server, not "end host"

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Connect 30 PCs in your department | **Switch** |
| Connect two separate networks together | **Router** |
| Upgrade old firewall to advanced one | **Next-generation firewall** |
| Friend AirDrops you a video — his phone is | **Server** |
| You watching YouTube — your device is | **Client** |
| Block an external attacker | **Firewall** |
| Many ports for end hosts | **Switch** |
| Forwards data over the Internet | **Router** |

## ⚡ One-Line Master Recall

**Client requests → Server responds → Switch connects locally → Router connects networks → Firewall filters threats.**

## ➕ EXTRA — not in video, but on the exam

- **1.1.d Access points (APs)** — Day 1 doesn't introduce APs; covered Day 56. v1.1 expects you to recognize APs as wireless extension of the LAN.
- **1.1.e Controllers (WLC)** — wireless LAN controller, manages APs. Covered Day 56.
- **1.1.h PoE** — Power over Ethernet delivers power + data on the same Cat5e/Cat6 cable to APs and IP phones. Covered Day 52 LAN Architectures.
- **IPS (intrusion prevention system)** — mentioned as part of NGFW. v1.1 may ask "what does NGFW add over traditional firewall?" — answer: IPS + advanced filtering.

## 🧾 Recap

- Five device roles run every CCNA topology: **client, server, switch, router, firewall.**
- **Switch = inside one LAN.** Router = between networks. Firewall = filter.
- **Client/server is a role, not a device class** — same iPhone can be either.
- **NGFW = traditional firewall + IPS + advanced filtering** — modern Cisco ASA / Firepower qualify.
- If you can name the device for any 5/8 stems in the Quick-Answer Map without peeking, move on to Day 2.

---
Source: Jeremy's IT Lab — Day 1 — https://www.youtube.com/watch?v=H8W9oMNSuwo
