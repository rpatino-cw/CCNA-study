---
title: "Free CCNA | DHCP Snooping | Day 50 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-50
source_transcript: "[[../jeremy-it-videos/101-dhcp-snooping-day-50]]"
source_url: https://www.youtube.com/watch?v=qYYeg2kz1yE
created: 2026-04-28
tags: [ccna, cheat-sheet, day-50]
---

# Day 50 — DHCP Snooping

## 🎯 What this video covers

Maps to v1.1 blueprint **5.7 Configure Layer 2 security features (DHCP snooping, dynamic ARP inspection, port security)**. DHCP snooping filters DHCP messages on untrusted ports to block rogue DHCP servers and starvation attacks.

## 🧠 Core Concept

**DHCP snooping turns switch ports into "trusted" (uplinks toward real DHCP server) or "untrusted" (downlinks toward end users) — server-type DHCP messages on untrusted ports are dropped, client messages are inspected.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **Trusted port** | Skip inspection — forward as normal | Uplink toward real DHCP server | "uplink, trusted" |
| **Untrusted port** (default) | Inspect DHCP messages | Downlink toward end hosts | "default, downlink" |
| **DHCP server messages** | OFFER, ACK, NAK | Always **dropped** on untrusted ports | "rogue server" |
| **DHCP client messages** | DISCOVER, REQUEST, RELEASE, DECLINE | Inspected on untrusted ports | "from client" |
| **Snooping binding table** | MAC + IP + lease + VLAN + interface | Built when client successfully leases IP | "binding database" |
| **Rate-limiting** | Limit DHCP messages per second per port | Err-disables port if exceeded | "starvation protection" |
| **Option 82** | Relay-agent info added by switches | Cause of "inconsistent relay info" drops | "relay agent information" |
| **`ip dhcp snooping`** | Enable globally | Required first | "global enable" |
| **`ip dhcp snooping vlan N`** | Enable per VLAN | Required per VLAN | "per-VLAN enable" |
| **`ip dhcp snooping trust`** | Mark interface trusted | Interface config | "trust uplink" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Server messages vs client messages on untrusted port** | Server msgs (OFFER/ACK/NAK) → always dropped. Client msgs → inspected, may pass |
| **DHCP starvation vs DHCP poisoning** | Starvation: exhaust DHCP pool with spoofed CHADDRs. Poisoning: rogue server hands out attacker as gateway (man-in-the-middle) |
| **DISCOVER/REQUEST inspection vs RELEASE/DECLINE inspection** | D/R: check source MAC = CHADDR. RELEASE/DECLINE: check IP + interface match binding table |
| **Manual recovery vs errdisable recovery** | Manual: `shut`/`no shut`. Auto: `errdisable recovery cause dhcp-rate-limit` |

## 🔗 How it all connects

```
[Client]→[Untrusted port: inspect]→[Switch builds binding]→[Trusted port: forward]→[DHCP server]
```

## 🚨 Exam Traps

- **All ports are NOT trusted by default** — they're all untrusted; you must explicitly trust uplinks
- **DHCP snooping does NOT inspect non-DHCP traffic** — it only filters DHCP messages
- **Server messages on a trusted port are NOT inspected** — they pass through
- **Default gateway is NOT in the binding table** — it stores MAC, IP, lease, VLAN, interface only
- **Enabling globally is NOT enough** — you must also enable per-VLAN with `ip dhcp snooping vlan N`
- **A rogue DHCP server can be ANY device** — even a misconfigured home router plugged into a port
- **Option 82 default behavior breaks L2 setups** — use `no ip dhcp snooping information option` when switch isn't a relay agent

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| DHCP server messages always dropped on untrusted port | **OFFER, ACK, NAK** |
| What's in the binding table? | **MAC, IP, lease time, VLAN, interface** |
| DHCP DISCOVER inspection checks | **Frame source MAC == CHADDR field** |
| DHCP RELEASE inspection checks | **IP + interface match binding-table entry** |
| Rate-limit exceeded → port goes | **Err-disabled** |
| Re-enable an err-disabled port automatically | **`errdisable recovery cause dhcp-rate-limit`** |
| Default trust state of all ports | **Untrusted** |
| Global enable command | **`ip dhcp snooping`** |
| Per-VLAN enable | **`ip dhcp snooping vlan N`** |
| Disable Option 82 insertion | **`no ip dhcp snooping information option`** |

## ⚡ One-Line Master Recall

**Enable globally + per-VLAN → trust uplink ports → all other ports inspect: drop server messages, validate client messages, build the binding table, and rate-limit DHCP per port to stop starvation.**

## ➕ EXTRA — not in video, but on the exam

- **Dynamic ARP Inspection (DAI)** — Day 51; uses the DHCP snooping binding table to validate ARP messages.
- **IP Source Guard** — also uses the binding table; blocks traffic from sources not in the table. Listed in v1.1 5.x security family.
- **DHCPv6 snooping** — IPv6 equivalent; v1.1 mentions, less likely to be deeply tested.

## 🧾 Recap

- **All ports untrusted by default** — explicitly trust uplinks toward real DHCP servers.
- **Server messages on untrusted ports → dropped.** Client messages → inspected.
- **Binding table** = MAC + IP + lease + VLAN + interface (NOT default gateway).
- **Rate-limit + err-disable recovery** stops DHCP starvation flooding.
- If you can configure DHCP snooping (global + VLAN + trust + Option 82) end-to-end, move to Day 51 (DAI).

---
Source: Jeremy's IT Lab — Day 50 — https://www.youtube.com/watch?v=qYYeg2kz1yE
