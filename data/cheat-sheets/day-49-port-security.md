---
title: "Free CCNA | Port Security | Day 49 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-49
source_transcript: "[[../jeremy-it-videos/099-port-security-day-49]]"
source_url: https://www.youtube.com/watch?v=sHN3jOJIido
created: 2026-04-28
tags: [ccna, cheat-sheet, day-49]
---

# Day 49 — Port Security

## 🎯 What this video covers

Maps to v1.1 blueprint **5.7 Configure Layer 2 security features (DHCP snooping, dynamic ARP inspection, port security)**. Port Security limits **which** and **how many** source MAC addresses can use a switch port.

## 🧠 Core Concept

**Port Security tells a switchport: "only THIS MAC (or these N MACs) can send frames here. Violation? Drop / log / err-disable."**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **Port Security** | Restrict source MACs per port | Per access/trunk port | "secure MAC address" |
| **Static secure MAC** | Manually configured allowed MAC | `switchport port-security mac-address X.X.X` | "manual" |
| **Dynamic secure MAC** | Auto-learned, lost on reboot/disable | Default behavior | "first frames learned" |
| **Sticky secure MAC** | Auto-learned BUT added to running-config | `... mac-address sticky` | "looks static, learned dynamically" |
| **Violation: shutdown** | err-disable + Syslog/SNMP, ONE message | Default mode | "default action" |
| **Violation: restrict** | Drop + Syslog/SNMP + counter++ | Port stays up | "drops, alerts, counts" |
| **Violation: protect** | Drop silently — no log, no count | Port stays up | "silent drop" |
| **Maximum** | Max MACs allowed (default 1) | Per port | "1 by default" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Static vs Dynamic vs Sticky** | Static = manual. Dynamic = learned, lost on disable. Sticky = learned + written to running-config (save with `write memory` to make permanent) |
| **Shutdown vs Restrict vs Protect** | Shutdown = err-disable port. Restrict = drop + log + count. Protect = silent drop, no log, no count |
| **Port Security requires static mode** | Port must be `switchport mode access` or `switchport mode trunk` — won't enable on `dynamic auto`/`dynamic desirable` |
| **Aging absolute vs inactivity** | Absolute = clock starts at learn, removed when timer hits even if active. Inactivity = timer resets every frame, only ages if silent |

## 🔗 How it all connects

```
Set static/trunk mode → enable port-security → set max MACs → set violation mode → optionally sticky/aging
```

## 🚨 Exam Traps

- **Port Security CANNOT** enable on a `dynamic auto` port — must `switchport mode access` (or trunk) first.
- **Default max = 1**, default violation = **shutdown**, default aging = **0 (never)**.
- **Sticky MACs go to running-config**, NOT startup-config — must `write memory` to survive reboot.
- **Disconnecting the unauthorized device does NOT** re-enable an err-disabled port — must `shutdown / no shutdown` or use ErrDisable Recovery.
- **Sticky entries** show as type **STATIC** in `show mac address-table` but were dynamically learned.
- **Restrict and protect do NOT err-disable** the port — only shutdown does.

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Enable port-security | **`switchport port-security`** (port must be static access/trunk first) |
| Set max 2 MACs | **`switchport port-security maximum 2`** |
| Static secure MAC | **`switchport port-security mac-address aaaa.bbbb.cccc`** |
| Sticky learning | **`switchport port-security mac-address sticky`** |
| Violation mode | **`switchport port-security violation {shutdown\|restrict\|protect}`** |
| Default violation mode | **shutdown** |
| Re-enable err-disabled port (manual) | **`shutdown`** then **`no shutdown`** |
| Auto-recovery for port-security | **`errdisable recovery cause psecure-violation`** |
| Default ErrDisable timer | **300 seconds** |
| View violation counter + mode | **`show port-security interface <int>`** |
| View all secure MACs | **`show mac address-table secure`** |

## ⚡ One-Line Master Recall

**Port-security needs static mode. Default = max 1, mode shutdown. Sticky learns then writes — but only `write memory` keeps it.**

## ➕ EXTRA — not in video, but on the exam

- **DHCP snooping + DAI** (Days 50–51) — companion L2 security features in 5.7. Often paired with port-security questions.
- **Voice + data on same port** — when a phone is connected, you typically need `maximum 2` (one for phone, one for PC).
- **MAC spoofing** is easy — port-security mitigates but doesn't eliminate the threat. Combine with 802.1X for true device auth.

## 🧾 Recap

- **Port-security = which MACs + how many MACs** per port.
- **Three violation modes:** shutdown (err-disable, default), restrict (drop+log+count), protect (silent drop).
- **Three MAC types:** static (manual), dynamic (lost on reboot), sticky (learned + saved to running-config).
- **Must `switchport mode access`** (or trunk) before port-security accepts.
- If you can recite all 3 violation modes and 3 MAC types from memory, move to Day 50.

---
Source: Jeremy's IT Lab — Day 49 — https://www.youtube.com/watch?v=sHN3jOJIido
