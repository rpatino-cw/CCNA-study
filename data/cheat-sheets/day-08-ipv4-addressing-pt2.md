---
title: "Free CCNA | IPv4 Addressing (Part 2) | Day 8 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-08
source_transcript: "[[../jeremy-it-videos/014-ipv4-addressing-part-2-day-8]]"
source_url: https://www.youtube.com/watch?v=FiAatRd84XI
created: 2026-04-28
tags: [ccna, cheat-sheet, day-08]
---

# Day 8 — IPv4 Addressing (Part 2)

## 🎯 What this video covers

Maps to v1.1 blueprint **1.6 (IPv4 subnetting math)**. The five values for any network — network ID, broadcast, first/last usable, host count — are the foundation for every subnetting question on the exam. Also touches **1.7** (configure interfaces) via `ip address` + `show ip interface brief`.

## 🧠 Core Concept

**Hosts = 2^N − 2. Network ID = host bits all 0. Broadcast = host bits all 1. First usable = network+1. Last usable = broadcast−1.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **Network address** | Host bits all 0 — identifies the subnet | First address of range | "network ID", "subnet ID" |
| **Broadcast address** | Host bits all 1 — sends to all hosts | Last address of range | "broadcast" |
| **First usable** | Network+1 | First assignable host | "first host" |
| **Last usable** | Broadcast−1 | Last assignable host | "last host" |
| **Class A /8** | 0–127, mask 255.0.0.0, 16,777,214 hosts | Big networks | "/8", "10.0.0.0" |
| **Class B /16** | 128–191, mask 255.255.0.0, 65,534 hosts | Mid-size | "/16", "172.16.x.x" |
| **Class C /24** | 192–223, mask 255.255.255.0, 254 hosts | Small | "/24", "192.168.x.x" |
| **show ip interface brief** | List all interfaces, IP, status, protocol | Privileged exec | "verify Layer 1/2 status" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Status vs Protocol column** | Status = Layer 1 (cable, shutdown). Protocol = Layer 2 (Ethernet keepalive). Down/Up impossible; Up/Down possible |
| **administratively down vs down** | admin down = `shutdown` applied (router default). down = no cable / not connected |
| **2^N vs 2^N − 2** | 2^N = total addresses in subnet. 2^N − 2 = usable hosts (subtract network + broadcast) |
| **/8 vs /16 vs /24** | Host bits are 24 / 16 / 8 — drives the host count |

## 🔗 How it all connects

```
[Network ID + 0s] → [First usable +1] → … → [Last usable] → [Broadcast all 1s]
```

## 🚨 Exam Traps

- **Network address is NOT** assignable — host bits all 0
- **Broadcast is NOT** assignable — host bits all 1
- **Router interfaces are NOT** up by default — `shutdown` is applied; need `no shutdown`
- **/24 is NOT** always a Class C in CIDR — class is decided by leading bits, mask is decided by the slash
- **Up/Down (status/protocol) is NOT** the same as Down/Down — Up/Down means Layer 1 OK but Layer 2 keepalive failing

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| 43.109.23.12/8 — network address | **43.0.0.0** |
| 43.109.23.12/8 — max hosts | **16,777,214** |
| 43.109.23.12/8 — broadcast | **43.255.255.255** |
| 209.211.3.22/24 — first usable | **209.211.3.1** |
| 209.211.3.22/24 — last usable | **209.211.3.254** |
| 129.221.23.13/16 — max hosts | **65,534** |
| Cmd to verify interface IP + status | **`show ip interface brief`** |
| Enable a router interface | **`no shutdown`** |

## ⚡ One-Line Master Recall

**Find host bits → 2^N − 2 = usable hosts → all-0 host bits = network → all-1 host bits = broadcast → +1 / −1 give first and last usable.**

## ➕ EXTRA — not in video, but on the exam

- **Private IPv4 ranges (1.6)** — 10/8, 172.16.0.0/12, 192.168.0.0/16; not routable on Internet, need NAT.
- **APIPA** — 169.254.0.0/16, auto-assigned when DHCP fails. v1.1 testable.
- **Loopback 127.0.0.0/8** — reserved for the host itself.

## 🧾 Recap

- **Network = all-0 host bits, Broadcast = all-1 host bits**, both unassignable.
- **2^N − 2** is the host formula; N = host bits.
- **/8 = 24 host bits, /16 = 16, /24 = 8** — memorize the powers of two.
- **`no shutdown`** is required on every router interface; switch ports come up by default.
- If you can solve all 5 values for any /8, /16, or /24 in under 30 seconds, move to Day 9.

---
Source: Jeremy's IT Lab — Day 8 — https://www.youtube.com/watch?v=FiAatRd84XI
