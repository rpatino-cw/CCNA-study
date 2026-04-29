---
title: "Free CCNA | Switch Interfaces | Day 9 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-09
source_transcript: "[[../jeremy-it-videos/016-switch-interfaces-day-9]]"
source_url: https://www.youtube.com/watch?v=cCqluocfQe0
created: 2026-04-28
tags: [ccna, cheat-sheet, day-09]
---

# Day 9 — Switch Interfaces (Speed, Duplex, Errors)

## 🎯 What this video covers

Maps to v1.1 **1.4 cable issues** + **1.13 switching basics**. Speed/duplex, autonegotiation, interface status, counters, half-vs-full duplex, CSMA/CD.

## 🧠 Core Concept

**Switch ports are up by default, autonegotiate speed/duplex, and report errors via `show interfaces` counters — duplex mismatches silently kill performance.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **Speed** | Data rate (10/100/1000 Mbps) | Layer 1, per interface | "10/100", "auto", "Mbps" |
| **Duplex** | Send + receive simultaneously? | Layer 1, per interface | "full" (both at once) / "half" (one at a time) |
| **Autonegotiation** | Pick best common speed/duplex | Both ends advertise | "auto", "a-100", "a-full" |
| **CSMA/CD** | Half-duplex collision handling | Hub/half-duplex Ethernet | "carrier sense", "collision detection" |
| **Collision domain** | Set of ports that can collide | Hub = 1 domain. Switch = 1 per port | "broadcast storm", "hub" |
| **Runt** | Frame < 64 bytes (too small) | Counter on `show interfaces` | "smaller than minimum" |
| **Giant** | Frame > 1518 bytes (too big) | Counter on `show interfaces` | "exceeds maximum" |
| **CRC error** | Frame failed FCS check | Counter on `show interfaces` | "frame check sequence", "checksum failed" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Switch port vs Router port** | Switch = up by default. Router = `shutdown` by default (admin-down) |
| **down/down vs admin-down/down** | Cable not connected vs `shutdown` applied |
| **Half-duplex vs Full-duplex** | Hubs force half. Switches allow full. Half = listen-before-send |
| **`a-100/a-full` vs `100/full`** | "a-" = autonegotiated. Plain = manually set |
| **Hub vs Switch** | Hub = L1 repeater, one collision domain. Switch = L2, one domain per port |
| **`show ip interface brief` vs `show interfaces status`** | Brief: L1/L2 up/down + IP. Status: connected/notconnect + duplex/speed/VLAN |

## 🔗 How it all connects

```
[PC] --(autoneg)-- [Switch port: a-1000/a-full] --(trunk)-- [Switch port] --- [Router]
```

## 🚨 Exam Traps

- **Switch port is NOT** shutdown by default (router is)
- **`down/down` is NOT** the same as `administratively down/down` — first = no cable, second = `shutdown`
- **Duplex mismatch is NOT** "improved performance" — it's collisions + dropped throughput
- **Autoneg disabled on one side is NOT** detected by the other — speed senses, duplex defaults to half if speed ≤100 Mbps
- **CSMA/CD is NOT** used in modern full-duplex networks — only hubs/half-duplex
- **Broadcasts are NOT** errors — runts/giants/CRC are

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Default duplex on Cisco switch | **auto** |
| Frame too small | **Runt** |
| Frame too big | **Giant** |
| FCS check failed | **CRC error** |
| Half-duplex collision avoidance | **CSMA/CD** |
| Wireless collision avoidance | **CSMA/CA** |
| Show error counters | **`show interfaces`** |
| One side autoneg, other manual 100/full → switch picks | **100 Mbps / half-duplex** (mismatch!) |
| Configure 8 ports at once | **`interface range f0/5 - 12`** |
| Disable unused ports for security | **`shutdown` (interface range)** |

## ⚡ One-Line Master Recall

**Switch ports up by default, autoneg speed/duplex; mismatch = collisions; full-duplex on switches kills CSMA/CD; runts/giants/CRC = `show interfaces` counters.**

## ➕ EXTRA — not in video, but on the exam

- **1.4 — Cable issues** — Identify duplex mismatch from counter symptoms (input errors, late collisions on half-duplex side, low throughput).
- **`show interfaces` "late collisions"** — Classic duplex-mismatch signature on a half-duplex side.
- **Auto-MDIX** — Cisco interfaces auto-detect straight-through vs crossover on copper at gig+ speeds.

## 🧾 Recap

- **Switch ports up by default; routers down. `down/down` ≠ `admin-down`.**
- **Autoneg is the default and the right answer — manual config only when troubleshooting.**
- **Duplex mismatch = collisions + bad performance, hard to spot.**
- **Errors live in `show interfaces`: runts (small), giants (big), CRC (bad FCS).**
- If you can read a `show interfaces status` line and call out the speed/duplex mode in 5 seconds, move to Day 10.

---
Source: Jeremy's IT Lab — Day 9 — https://www.youtube.com/watch?v=cCqluocfQe0
