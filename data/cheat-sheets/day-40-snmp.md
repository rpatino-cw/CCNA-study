---
title: "Free CCNA | SNMP | Day 40 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-40
source_transcript: "[[../jeremy-it-videos/081-snmp-day-40]]"
source_url: https://www.youtube.com/watch?v=HXu0Ifj0oWU
created: 2026-04-28
tags: [ccna, cheat-sheet, day-40]
---

# Day 40 — SNMP (Simple Network Management Protocol)

## 🎯 What this video covers

Maps to v1.1 **4.4 (function of SNMP in network operations)**. NMS vs managed device, agent vs manager, MIB/OIDs, SNMP versions, message types, port numbers. Function-level only — no deep config.

## 🧠 Core Concept

**SNMP lets a Network Management Station (NMS) read, write, and receive notifications from managed devices via agents and a hierarchical MIB of OIDs.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **NMS** | Network Management Station = SNMP server | Admin's PC / dedicated host | "manager", "monitoring server" |
| **Managed device** | Router/switch being monitored | Network gear | "agent runs here" |
| **SNMP Manager** | NMS software that polls/receives | NMS side | "sends Get/Set" |
| **SNMP Agent** | Software on managed device | Managed device | "responds to NMS" |
| **MIB** | Tree of variables managed via SNMP | Managed device | "Management Information Base" |
| **OID** | Unique ID for each MIB variable | Hierarchical (1.3.6.1...) | "Object Identifier" |
| **Community string** | SNMPv1/v2c "password" — plain text | Configured on agent + NMS | "RO" / "RW" |

| SNMP Message | Direction | Purpose |
|---|---|---|
| **Get / GetNext / GetBulk** | NMS → agent | Read variable(s) |
| **Set** | NMS → agent | Change variable |
| **Response** | Agent → NMS | Reply to Get/Set/Inform |
| **Trap** | Agent → NMS | Unsolicited alert (**no ack**) |
| **Inform** | Agent → NMS | Like Trap **but acknowledged** |

| Version | Security | Notes |
|---|---|---|
| **SNMPv1** | Community string (plain text) | Original |
| **SNMPv2c** | Community string (plain text) | Adds GetBulk, Inform |
| **SNMPv3** | **Auth + encryption** | Preferred for production |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Trap vs Inform** | Trap = fire-and-forget. Inform = acknowledged (reliable) |
| **Get vs Set** | Get = read MIB variable. Set = write MIB variable |
| **GetNext vs GetBulk** | GetNext walks one OID at a time. GetBulk walks many at once (v2+) |
| **NMS port vs Agent port** | NMS listens on **162** (traps/informs). Agent listens on **161** (gets/sets) |
| **RO vs RW community** | Read-only (Get only) vs Read-write (Get + Set) |
| **SNMPv2c vs SNMPv3** | v2c plain text, v3 encrypted + authenticated |

## 🔗 How it all connects

```
NMS (mgr, port 162) ←Trap/Inform← Agent (port 161) ←Get/Set→ → Response → MIB[OID]
```

## 🚨 Exam Traps

- **Trap is NOT** acknowledged — Inform is
- **SNMPv2c is NOT** encrypted — only v3 has security
- **NMS port is NOT** 161 — that's the agent. NMS uses **162** for traps/informs
- **SNMP runs over UDP, NOT** TCP
- **Community string is NOT** secure — sent in plain text in v1/v2c
- **GetBulk is NOT** in SNMPv1 — added in v2

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Read message types | **Get, GetNext, GetBulk** |
| Write message type | **Set** |
| Notification messages | **Trap, Inform** |
| Reliable notification | **Inform** (acked) |
| Unreliable notification | **Trap** (no ack) |
| Agent listens on UDP port | **161** |
| NMS listens on UDP port | **162** |
| SNMP version with encryption | **SNMPv3** |
| Plain-text password in v1/v2c | **Community string** |
| Database of monitored variables | **MIB** |
| Unique variable ID in MIB | **OID** |
| Default RO community string | **`public`** |
| Default RW community string | **`private`** |

## ⚡ One-Line Master Recall

**Manager polls Agents on UDP/161 (Get/Set), Agents push Traps/Informs to NMS on UDP/162; community strings are v1/v2c plaintext, v3 adds auth+encryption.**

## ➕ EXTRA — not in video, but on the exam

- **Syslog vs SNMP** — Syslog = log messages (UDP 514). SNMP = state polling + traps. Both used together.
- **NetFlow** — Traffic-flow export (different problem domain). Often confused with SNMP.
- **`snmp-server community NAME RO`** — Minimal config to enable SNMP on Cisco gear.
- **`snmp-server host X.X.X.X version 2c COMM`** — Tells the agent where to send traps.

## 🧾 Recap

- **NMS = manager (server). Managed devices = agents (routers/switches).**
- **MIB = tree of variables. OID = unique address for each variable.**
- **Read = Get/GetNext/GetBulk. Write = Set. Notify = Trap (no ack) / Inform (ack).**
- **Ports: agent 161, NMS 162. UDP only.**
- **Versions: v1/v2c = community string (plain). v3 = secure (auth + encryption).**
- If you can name the 5 message types and the 2 ports without peeking, move on to Day 41.

---
Source: Jeremy's IT Lab — Day 40 — https://www.youtube.com/watch?v=HXu0Ifj0oWU
