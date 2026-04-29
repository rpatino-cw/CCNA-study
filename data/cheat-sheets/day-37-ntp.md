---
title: "Free CCNA | NTP | Day 37 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-37
source_transcript: "[[../jeremy-it-videos/075-ntp-day-37]]"
source_url: https://www.youtube.com/watch?v=qGJaJx7OfUo
created: 2026-04-28
tags: [ccna, cheat-sheet, day-37]
---

# Day 37 — NTP (Network Time Protocol)

## 🎯 What this video covers

Maps to v1.1 blueprint **4.2 Configure and verify NTP operating in client and server mode**. Critical because every Syslog/SNMP/AAA log timestamp depends on accurate clocks.

## 🧠 Core Concept

**NTP syncs device clocks to a reference. Clients sync to servers via UDP/123. "Stratum" measures distance from the original reference clock — lower = closer = more accurate.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **NTP** | Network Time Protocol — sync clocks | UDP **port 123** | "client and server mode" |
| **Stratum 0** | Reference clock (atomic, GPS) | Source | "not directly used by Cisco" |
| **Stratum 1** | Servers directly attached to stratum 0 | Top of NTP hierarchy | "primary NTP server" |
| **Stratum N** | N hops from reference | Each level adds 1 | "max stratum 15" |
| **Server mode** | Provides time | `ntp master [stratum]` | "default stratum 8" |
| **Client mode** | Requests time | `ntp server <ip>` | "static client mode" |
| **Symmetric active** | Peer mode (mutual sync) | `ntp peer <ip>` | "backup / equals" |
| **Authoritative `*`** | Currently syncing to this server | `show ntp associations` | "asterisk = sys.peer" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Software clock vs hardware calendar** | Clock = OS time, used by NTP. Calendar = battery-backed hardware time, survives reboots. Use `clock update-calendar` or `ntp update-calendar` to sync them |
| **`clock set` vs `clock timezone`** | `clock set` = privileged exec, sets time. `clock timezone` = global config, sets offset from UTC |
| **`ntp server` vs `ntp peer` vs `ntp master`** | Server = "treat this IP as my time source." Peer = symmetric (mutual). Master = "I am the source" |
| **Reference clock (loopback)** | `ntp master` makes the device show itself as `127.127.1.1` — loopback ADDRESS, not a loopback interface |

## 🔗 How it all connects

```
Stratum 0 (atomic) → Stratum 1 (primary) → Stratum 2 → … → Stratum 15
       client picks lower-stratum server when multiple offered
```

## 🚨 Exam Traps

- **NTP only uses UTC** — you must set timezone separately on each device with `clock timezone`.
- **`clock` commands are privileged exec, NOT global config** (except `clock timezone` and `clock summer-time`).
- **Default stratum of `ntp master`** with no number = **8** (NOT 1).
- **`ntp master 9`** sets the device's stratum to 9 — but `show ntp associations` shows reference at stratum **8** (one less, because the "source" is itself).
- **NTP UDP port = 123**. Don't confuse with SNMP (161/162) or Syslog (514).
- **Hardware calendar does NOT auto-sync from NTP** — must use `ntp update-calendar` to make it follow.

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| NTP port / protocol | **UDP 123** |
| Set device as NTP client | **`ntp server <ip>`** |
| Set device as NTP server (no upstream) | **`ntp master [stratum]`** |
| Default `ntp master` stratum | **8** |
| Make device sync hw clock to NTP | **`ntp update-calendar`** |
| Set timezone (e.g. EST = UTC-5) | **`clock timezone EST -5`** (global cfg) |
| Set time manually | **`clock set HH:MM:SS DAY MONTH YEAR`** (priv exec) |
| Verify sync source | **`show ntp associations`** (`*` = syncing) |
| Verify sync state | **`show ntp status`** |
| Symmetric peer | **`ntp peer <ip>`** |
| Source NTP packets from loopback | **`ntp source loopback0`** |
| Max usable stratum | **15** (16 = unsynchronized) |

## ⚡ One-Line Master Recall

**`ntp server <ip>` = client. `ntp master` = standalone server (default stratum 8). UDP/123. Lower stratum wins.**

## ➕ EXTRA — not in video, but on the exam

- **NTP authentication** — optional. Three commands: `ntp authenticate`, `ntp authentication-key 1 md5 <pw>`, `ntp trusted-key 1`. Then on client: `ntp server <ip> key 1`.
- **NTP source-interface best practice** — use a loopback (`ntp source loopback0`) so server identity doesn't depend on a single physical interface.
- **Sync to multiple servers** — configure several `ntp server` lines. Router picks best one. Add `prefer` to a specific one to bias the choice.

## 🧾 Recap

- **NTP = UDP/123**, syncs clocks across the network.
- **Stratum 0 = reference, 1 = primary, … 15 = max usable**. Lower = better.
- **`ntp server` = client mode. `ntp master` = manual server (default stratum 8). `ntp peer` = symmetric.**
- **NTP only knows UTC** — set `clock timezone` separately on each device.
- If you can configure an NTP client + server and explain the asterisk in `show ntp associations`, move to Day 38.

---
Source: Jeremy's IT Lab — Day 37 — https://www.youtube.com/watch?v=qGJaJx7OfUo
