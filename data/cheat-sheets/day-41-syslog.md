---
title: "Free CCNA | Syslog | Day 41 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-41
source_transcript: "[[../jeremy-it-videos/083-syslog-day-41]]"
source_url: https://www.youtube.com/watch?v=RaQPSKQ4J5A
created: 2026-04-28
tags: [ccna, cheat-sheet, day-41]
---

# Day 41 — Syslog Facilities + Severity Levels

## 🎯 What this video covers

Maps to v1.1 blueprint **4.5 Syslog features (facilities + severity)**. Syslog logs system events to console, VTY, buffer, or external server (UDP **514**). 8 severity levels — **memorize numbers + keywords**.

## 🧠 Core Concept

**Syslog message = `seq: timestamp: %FACILITY-SEVERITY-MNEMONIC: description` — 8 levels (0=most severe → 7=debugging), sent over UDP 514, lower number = higher priority.**

## 🔑 Must-Know Table — Severity Levels (memorize cold)

| # | Keyword | Mnemonic word | Meaning |
|---|---|---|---|
| **0** | Emergency | **E**very | System unusable |
| **1** | Alert | **A**wesome | Immediate action |
| **2** | Critical | **C**isco | Critical conditions |
| **3** | Error | **E**ngineer | Error conditions |
| **4** | Warning | **W**ill | Warning conditions |
| **5** | Notification (Notice) | **N**eed | Normal but significant |
| **6** | Informational | **I**ce cream | Informational |
| **7** | Debugging | **D**aily | Debug-level |

> "Every Awesome Cisco Engineer Will Need Ice cream Daily."

## 🔑 Must-Know Table — Logging Locations

| Location | Default? | Configure |
|---|---|---|
| **Console** | ON, all levels | `logging console <level>` |
| **VTY (Telnet/SSH)** | OFF | `logging monitor <level>` + `terminal monitor` per session |
| **Buffer (RAM)** | ON, all levels | `logging buffered [size] <level>` — view: `show logging` |
| **External server** | OFF | `logging host A.B.C.D` + `logging trap <level>` |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Severity 0 vs 7** | **0 = most severe** (Emergency). 7 = least (Debugging). Lower number = bigger problem |
| **Notice vs Notification** | RFC says Notice; Cisco IOS says **Notification**. Both = level 5 |
| **Syslog vs SNMP** | Syslog = device pushes log msgs (UDP 514). SNMP = NMS pulls (Get) or pushes (Set) variables (UDP 161/162) |
| **`logging monitor` vs `terminal monitor`** | `logging monitor` enables logging to VTY. `terminal monitor` must be re-issued **every SSH/Telnet session** to actually see them |
| **`service timestamps` datetime vs uptime** | datetime = real clock time. uptime = "how long since boot." Pick **datetime** with NTP |

## 🔗 How it all connects

```
event → facility (LINK/OSPF/SYS) → severity (0-7) → mnemonic (UPDOWN/ADJCHG) → description
       → console (default) | buffer (default) | VTY (opt-in) | server UDP 514 (opt-in)
```

## 🚨 Exam Traps

- **Lower number is NOT less severe** — 0 is most severe, 7 is least
- **`logging buffered 6` does NOT mean only level 6** — it means level **0 through 6** (everything that severe **or worse**)
- **VTY logging is NOT default** — Telnet/SSH users see nothing without `terminal monitor`
- **Syslog is NOT TCP** — uses **UDP 514**
- **Syslog server is NOT** an SNMP-style poller — devices **push** logs; server can't query
- **Sequence number + timestamp are NOT default** in some configs — need `service timestamps log datetime` and `service sequence-numbers`

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Most severe level | **0 — Emergency** |
| Severity 5 keyword (Cisco IOS) | **Notification** |
| Severity 3 keyword | **Error** |
| Default logging locations | **Console + Buffer** |
| Syslog destination port | **UDP 514** |
| `logging trap 4` saves which levels? | **0–4** (Warning and worse) |
| Display logs on SSH session | `terminal monitor` |
| Config to show date/time on logs | `service timestamps log datetime` |

## ⚡ One-Line Master Recall

**0 Emergency, 1 Alert, 2 Critical, 3 Error, 4 Warning, 5 Notification, 6 Informational, 7 Debugging — UDP 514, lower number wins.**

## ➕ EXTRA — not in video, but on the exam

- **NTP must be running** before you trust timestamps. Day 40 introduces NTP — Syslog without sync time is hard to correlate.
- **`logging origin-id`** — adds hostname/IP to messages so the server distinguishes devices behind NAT.
- **Reliable Syslog (RFC 3195)** — TCP-based variant. Not on CCNA but appears in security objectives.
- **Severity-level filtering on the server** — most servers (Splunk, Graylog, rsyslog) filter on facility + severity at ingest.

## 🧾 Recap

- **8 severity levels**, 0 (Emergency) → 7 (Debugging). **Memorize all 8.**
- "**Every Awesome Cisco Engineer Will Need Ice cream Daily.**"
- **UDP 514** to external server. Console + buffer are default targets.
- **`logging buffered 6`** = everything from level 0 through 6 (most logging, no debug spam).
- If you can fill in the 8-level table cold and recall UDP 514, move on to Day 42.

---
Source: Jeremy's IT Lab — Day 41 — https://www.youtube.com/watch?v=RaQPSKQ4J5A
