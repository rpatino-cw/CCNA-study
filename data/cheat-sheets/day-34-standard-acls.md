---
title: "Free CCNA | Standard ACLs | Day 34 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-34
source_transcript: "[[../jeremy-it-videos/069-standard-acls-day-34]]"
source_url: https://www.youtube.com/watch?v=z023_eRUtSo
created: 2026-04-28
tags: [ccna, cheat-sheet, day-34]
---

# Day 34 — Standard ACLs

## 🎯 What this video covers

Maps to v1.1 **5.6 (configure and verify ACLs)**. Standard IPv4 ACLs filter by **source IP only** — numbered (1-99, 1300-1999) and named flavors. Where to apply, ACL logic, the implicit deny.

## 🧠 Core Concept

**ACL = ordered list of permit/deny entries, top-down, first-match-wins, with an implicit deny at the end. Apply close to the destination for standard ACLs.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **Standard ACL** | Filter by **source IP only** | Numbered 1-99, 1300-1999 | "permit/deny based on source" |
| **Extended ACL** | Filter by source/dest IP + L4 ports | Numbered 100-199, 2000-2699 | "match source, dest, port" |
| **ACE** | One line in an ACL | Each entry numbered 10/20/30 | "access control entry" |
| **Wildcard mask** | Inverse of subnet mask | `0.0.0.255` = /24 | "0 = match, 1 = ignore" |
| **Implicit deny** | Hidden `deny any` at end | Always there, unwritten | "no match → drop" |
| **`access-group`** | Apply ACL to interface | Per interface, per direction | "in" or "out" |
| **`host` / `any`** | `host X` = /32. `any` = `0.0.0.0 255.255.255.255` | Shortcut keywords | Single host or all |
| **Remark** | Comment line in ACL | `access-list X remark ...` | No effect on filtering |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Standard vs Extended** | Standard = source IP only. Extended = source + dest + ports + protocol |
| **Numbered vs Named** | Numbered = `access-list 1 permit ...`. Named = `ip access-list standard NAME` then enter ACEs |
| **Inbound vs Outbound** | Inbound = checked entering interface. Outbound = checked leaving |
| **Wildcard mask vs Subnet mask** | Wildcard is **inverse** — `0.0.0.255` for /24 (not `255.255.255.0`) |
| **`host 1.1.1.1` vs `1.1.1.1 0.0.0.0`** | Same thing, two syntaxes (plus the shortcut just `1.1.1.1`) |
| **One ACL per interface per direction** | Max 2 per interface (1 in, 1 out). New ACL replaces old one in same direction |

## 🔗 How it all connects

```
Packet → router → check ACL (top-down, first match wins) → permit/deny → forward or drop
```

## 🚨 Exam Traps

- **Implicit deny is NOT** visible in `show access-lists` — but it's always there
- **Wildcard mask is NOT** the same as subnet mask — it's the inverse (`0.0.0.255` for /24)
- **Standard ACL is NOT** placed near the source — place **near the destination** (else you over-block)
- **CLI for named ACL is NOT** `access-list` — it's `ip access-list standard NAME`
- **You CANNOT** apply two ACLs in the same direction on one interface — second replaces first
- **Order matters** — `permit any` before a `deny X` makes the deny useless

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Standard ACL number ranges | **1-99 and 1300-1999** |
| Standard ACL filters by | **Source IP only** |
| Where to apply standard ACL | **Close to destination** |
| Extended ACL filters by | **Source, dest, ports, protocol** |
| Wildcard for a single host | **`0.0.0.0`** or `host` keyword |
| Wildcard for /24 | **`0.0.0.255`** |
| Wildcard for `any` | **`0.0.0.0 255.255.255.255`** |
| Apply ACL inbound on interface | **`ip access-group 1 in`** |
| Hidden last entry of every ACL | **`deny any` (implicit)** |
| ACL processed | **Top-down, first match wins** |
| Show ACLs + counters | **`show access-lists`** or `show ip access-lists` |

## ⚡ One-Line Master Recall

**Standard ACL = source-IP-only filter, top-down first-match, implicit `deny any` at end, applied near destination via `ip access-group N {in|out}`.**

## ➕ EXTRA — not in video, but on the exam

- **Extended ACLs (Day 35)** — Apply close to **source** (drops bad traffic earlier).
- **Wildcard "trick"** — `subnet_mask + wildcard = 255.255.255.255`. /26 → mask `255.255.255.192`, wildcard `0.0.0.63`.
- **`ip access-list resequence`** — Renumber entries to insert new ones cleanly.
- **VTY ACLs** — Apply to `line vty` with `access-class N in` (NOT `access-group`) to restrict SSH/Telnet sources.

## 🧾 Recap

- **Standard = source IP only. Extended = full 5-tuple.**
- **Top-down, first-match, implicit deny at end — no match = dropped.**
- **Apply standard ACLs close to the destination, extended close to the source.**
- **Wildcard mask is inverse of subnet mask — memorize the trick.**
- **One ACL per interface per direction — total max 2.**
- If you can write a 3-line ACL that permits one host, denies a subnet, and permits all else without breaking other traffic, move to Day 35.

---
Source: Jeremy's IT Lab — Day 34 — https://www.youtube.com/watch?v=z023_eRUtSo
