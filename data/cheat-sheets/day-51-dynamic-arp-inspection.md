---
title: "Free CCNA | Dynamic ARP Inspection | Day 51 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-51
source_transcript: "[[../jeremy-it-videos/103-dynamic-arp-inspection-day-51]]"
source_url: https://www.youtube.com/watch?v=HwbTKaIvL6s
created: 2026-04-28
tags: [ccna, cheat-sheet, day-51]
---

# Day 51 — Dynamic ARP Inspection (DAI)

## 🎯 What this video covers

Maps to v1.1 blueprint **5.7 (Layer 2 security: DHCP snooping, DAI, port security)**. DAI is the ARP-poisoning defense — it inspects ARP messages on untrusted ports against the DHCP snooping binding table and drops mismatches.

## 🧠 Core Concept

**On untrusted ports, DAI checks every ARP message's sender IP+MAC against the DHCP snooping binding table. Mismatch = drop. Trusted ports skip inspection. ARP ACLs cover hosts with static IPs that have no snooping entry.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **DAI** | Filters ARPs against DHCP snooping table | Per-VLAN | "ARP inspection" |
| **Trusted port** | Skips DAI inspection | Switch-to-switch links, uplinks | "switch / router uplink" |
| **Untrusted port** (default) | Inspected against snooping table | End-host ports | "all ports default untrusted" |
| **DHCP snooping binding table** | Tracks IP↔MAC↔port from DORA | Foundation for DAI | "snooping table" |
| **ARP ACL** | Manual IP↔MAC mapping for static hosts | Override / supplement | "static IP exception" |
| **Gratuitous ARP** | Unsolicited ARP reply, broadcast | Used in ARP poisoning | "unsolicited reply" |
| **Rate limiting** | Caps ARPs per second to protect CPU | 15 pps default on untrusted | "burst interval" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **DAI vs DHCP snooping** | Snooping inspects DHCP messages + builds binding table. DAI uses that table to inspect ARP. They're a pair |
| **Trusted vs untrusted** | All ports untrusted by default. Trust uplinks/switch-links. Leave host ports untrusted |
| **DHCP snooping config vs DAI config** | Snooping = global enable + per-VLAN. DAI = per-VLAN only (one command) |
| **DAI rate limit vs snooping rate limit** | DAI = 15 pps default, ON for untrusted, supports burst interval. Snooping = OFF by default on all ports |
| **ARP ACL vs IP ACL** | ARP ACL matches IP+MAC pairs in ARP messages. IP ACL filters Layer 3 packets. Different syntax |

## 🔗 How it all connects

```
[Attacker GARP claiming gateway IP] → [Untrusted port DAI check]
   → [No matching entry in snooping table] → [DROP + counter++]
```

## 🚨 Exam Traps

- **Trusted ports are NOT inspected** — DAI does nothing on them. Choose carefully
- **All ports default UNTRUSTED** — opposite of port security defaults
- **DAI does NOT enable DHCP snooping** — must enable both to get the binding table
- **Static-IP hosts will be DROPPED** by DAI (no snooping entry) — fix with an ARP ACL
- **`ip arp inspection validate`** — multiple options must be configured in ONE command, otherwise the last command overwrites prior settings
- **Rate limit fires → port goes err-disabled** — recover with `shutdown / no shutdown` or err-disable recovery

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Cmd to enable DAI on VLAN 1 | **`ip arp inspection vlan 1`** |
| Cmd to trust an interface | **`ip arp inspection trust`** |
| Default DAI rate limit on untrusted ports | **15 packets per second** |
| Default DAI rate limit on trusted ports | **Disabled** |
| Two checks DAI uses by default | **Sender MAC and Sender IP vs DHCP snooping table** |
| What DAI prevents | **ARP poisoning / man-in-the-middle** |
| Static-IP host can't ARP — fix? | **Configure an ARP ACL** |
| Cmd to enable all 3 validate checks | **`ip arp inspection validate src-mac dst-mac ip`** (single command) |

## ⚡ One-Line Master Recall

**Untrusted port + ARP message → DAI checks sender IP+MAC against the DHCP snooping binding table → match = forward, mismatch = drop. ARP ACLs cover hosts that don't use DHCP. Rate limiting caps CPU exposure (15 pps default, untrusted ports only).**

## ➕ EXTRA — not in video, but on the exam

- **DHCP snooping setup is the prerequisite** — `ip dhcp snooping` (global) + `ip dhcp snooping vlan <id>` + trust uplinks. DAI relies on the binding table this builds.
- **ARP poisoning attack flow** — attacker sends gratuitous ARP claiming the gateway's IP → all hosts update ARP tables → traffic flows through attacker (man-in-the-middle).
- **5.7 also covers Port Security** — limits MAC addresses per port, three violation modes (protect / restrict / shutdown). Different feature, same blueprint row.
- **5.7 covers DHCP snooping** — option 82, untrusted ports drop server-side messages (Offer/Ack), trusted ports allow them.

## 🧾 Recap

- **DAI = ARP filter** based on the DHCP snooping binding table.
- **All ports untrusted by default** — trust your uplinks, leave host ports alone.
- **One command to enable per-VLAN**: `ip arp inspection vlan <id>`.
- **Static hosts need an ARP ACL** or they'll be dropped.
- **`validate` options must be in one command** — last command wins otherwise.
- If you can name the binding-table source and the trust default, move to Day 52.

---
Source: Jeremy's IT Lab — Day 51 — https://www.youtube.com/watch?v=HwbTKaIvL6s
