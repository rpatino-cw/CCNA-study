---
title: "Free CCNA | DHCP | Day 39 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-39
source_transcript: "[[../jeremy-it-videos/079-dhcp-day-39]]"
source_url: https://www.youtube.com/watch?v=hzkleGAC2_Y
created: 2026-04-28
tags: [ccna, cheat-sheet, day-39]
---

# Day 39 — DHCP

## 🎯 What this video covers

Maps to v1.1 blueprint **4.3 (role of DHCP/DNS)** + **4.6 (DHCP client + relay)**. DHCP delivers IP, mask, gateway, DNS without manual config — essential for every modern LAN. The 4-message DORA exchange and the relay agent command are guaranteed exam material.

## 🧠 Core Concept

**Client and server complete DORA: Discover (broadcast) → Offer → Request (broadcast) → Ack. UDP 67 = server, UDP 68 = client. A relay agent (`ip helper-address`) forwards broadcasts as unicast to a remote DHCP server.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **DHCP Discover** | Client broadcast: "any servers?" | Source 0.0.0.0 → 255.255.255.255 | "broadcast", "DORA step 1" |
| **DHCP Offer** | Server proposes IP + options | Unicast or broadcast (per client flag) | "DORA step 2" |
| **DHCP Request** | Client broadcast: "I'll take that one" | Identifies chosen server (option 54) | "broadcast", "DORA step 3" |
| **DHCP Ack** | Server confirms lease | Unicast or broadcast | "DORA step 4" |
| **DHCP Release** | Client unicast: "done with it" | Sent to server | "release the address" |
| **UDP 67 / 68** | Server / client port | Transport | "67 server, 68 client" |
| **Lease time** | Duration the IP is valid | Per client | "renew at half-lease" |
| **`ip helper-address`** | Configure relay agent | On client-facing interface | "forward broadcasts to remote server" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Discover vs Request (both broadcast)** | Discover = "anyone there?" (no server known). Request = "you, server X, I accept" (server known via option 54) |
| **Offer/Ack: unicast or broadcast** | Depends on the BOOTP flags field set by the client. Some clients can't receive unicast before having an IP |
| **Release vs lease expire** | Release = client actively gives back. Expire = lease runs out without renewal |
| **DHCP server vs relay agent** | Server hands out leases. Relay forwards client broadcasts to a server in another subnet (one command — `ip helper-address`) |
| **`ipconfig /release` vs `/renew`** | Release sends Release message. Renew triggers new Discover/Request |

## 🔗 How it all connects

```
[Client broadcasts Discover] → [Relay = ip helper-address forwards as unicast]
   → [Server Offers] → [Client Requests] → [Server Acks → IP configured]
```

## 🚨 Exam Traps

- **Discover and Request are BOTH broadcast** — easy to mix up
- **UDP 67 = server, UDP 68 = client** — opposite of intuition for some
- **Relay agent is NOT** the same as a DHCP server — it just forwards
- **`ip helper-address` goes on the interface FACING THE CLIENTS**, not the server
- **DHCP server returns the magic cookie 0x63825363** — fun trivia, not testable
- **Without a relay, broadcasts do NOT cross routers** — hosts in remote subnets can't reach a centralized server

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Order of DHCP messages | **DORA — Discover, Offer, Request, Ack** |
| Server / client UDP ports | **67 / 68** |
| Source IP of a Discover message | **0.0.0.0** |
| Destination IP of a Discover message | **255.255.255.255** |
| Cmd to make a router a relay agent | **`ip helper-address <server-ip>`** (on client interface) |
| Cmd: Cisco router as DHCP client | **`ip address dhcp`** (interface) |
| Cmd: reserve addresses on Cisco DHCP server | **`ip dhcp excluded-address`** |
| Cmd: create DHCP pool | **`ip dhcp pool <name>`** |
| Cmd: view active DHCP leases | **`show ip dhcp binding`** |
| Windows cmd to trigger Discover | **`ipconfig /renew`** |

## ⚡ One-Line Master Recall

**Client broadcasts Discover (UDP 68→67, 0.0.0.0→255.255.255.255) → server unicasts/broadcasts Offer → client broadcasts Request naming chosen server → server Acks → IP configured. Relay agents (`ip helper-address`) forward broadcasts as unicast across routers to a centralized server.**

## ➕ EXTRA — not in video, but on the exam

- **DHCP options** — option 1 = subnet mask, option 3 = router (default gateway), option 6 = DNS, option 51 = lease time, option 53 = message type, option 54 = server identifier. Option numbers can appear on test.
- **DHCP snooping (5.7)** — Layer 2 security feature; trusts only configured ports for DHCP server replies. Builds the binding table that DAI also uses (Day 51).
- **Address conflict / lease renewal** — client renews at T1 (50% of lease), tries rebind at T2 (87.5%), full re-DORA at expiration.

## 🧾 Recap

- **DORA**: Discover, Offer, Request, Ack — Discover and Request are broadcasts.
- **UDP 67 = server, 68 = client** (server gets bigger number).
- **`ip helper-address` on client-facing interface** turns a router into a relay agent.
- **`ip address dhcp`** makes a Cisco router an interface a DHCP client; rare but testable.
- If you can sketch DORA with source/destination IPs and ports, you're ready for Day 40.

---
Source: Jeremy's IT Lab — Day 39 — https://www.youtube.com/watch?v=hzkleGAC2_Y
