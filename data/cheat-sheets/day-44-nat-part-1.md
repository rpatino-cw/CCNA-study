---
title: "Free CCNA | NAT (Part 1) | Day 44 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-44
source_transcript: "[[../jeremy-it-videos/089-nat-part-1-day-44]]"
source_url: https://www.youtube.com/watch?v=2TZCfTgopeg
created: 2026-04-28
tags: [ccna, cheat-sheet, day-44]
---

# Day 44 — NAT Part 1 (Private Addresses + Static NAT)

## 🎯 What this video covers

Maps to v1.1 blueprint **4.1 Configure and verify inside source NAT using static and pools**. Covers RFC 1918 private addresses, why NAT exists, and one-to-one static NAT configuration + verification.

## 🧠 Core Concept

**NAT lets devices with private (non-routable) IP addresses reach the Internet by translating their source IP to a unique public IP at the border router.**

## 🔑 Must-Know Table

| Term | One-line function | Range / where | Exam giveaway phrase |
|---|---|---|---|
| **Private IPv4 (RFC 1918)** | Non-routable, free to use internally | 10/8, 172.16/12, 192.168/16 | "RFC 1918" |
| **Inside local** | Private IP as seen from inside | Configured on the host | "actual host IP, before NAT" |
| **Inside global** | Public IP as seen from outside | After NAT | "host IP after translation" |
| **Outside local** | Outside host IP from inside view | Same as outside global unless dest NAT | "remote server, inside view" |
| **Outside global** | Outside host's actual IP | Real public IP | "remote server, real address" |
| **Static NAT** | One-to-one private↔public mapping | Manually configured, permanent | "one inside local maps to one inside global" |
| **`ip nat inside`** | Marks an interface as inside | Interface config | "internal-facing interface" |
| **`ip nat outside`** | Marks an interface as outside | Interface config | "external-facing interface" |
| **`ip nat inside source static A B`** | Map private A to public B | Global config | "static one-to-one mapping" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Inside vs Outside** | Location of the host (your network vs the Internet) |
| **Local vs Global** | Perspective (how the host's IP appears in the *local* network vs the *global* network) |
| **Static NAT vs PAT** | Static = 1:1, doesn't save IPs. PAT (Day 45) = many-to-1 using ports |
| **Source NAT vs Destination NAT** | Source = changes the source IP (CCNA scope). Destination = changes destination IP (beyond CCNA) |
| **Permanent vs dynamic translations** | Static entries stay forever; dynamic entries appear on use, time out when idle |

## 🔗 How it all connects

```
[PC 192.168.0.167]→[R1 inside]→[R1 NAT: src→100.0.0.1]→[R1 outside]→[Internet 8.8.8.8]
```

## 🚨 Exam Traps

- **Private IPs are NOT routable on the Internet** — ISPs drop them
- **Static NAT does NOT save public IP space** — it's 1:1; for IP conservation use PAT
- **You can NOT map two private IPs to the same public IP with static NAT** — IOS rejects the second command
- **Class B private range is /12, NOT /16** — it's 172.16.0.0–172.31.255.255
- **`clear ip nat translation *` does NOT remove static entries** — only dynamic ones
- **Outside local = outside global** unless destination NAT is in play (which is out of CCNA scope)

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| RFC number defining private IPv4 ranges | **RFC 1918** |
| Three private IPv4 ranges | **10/8, 172.16/12, 192.168/16** |
| Command to mark inside interface | **`ip nat inside`** |
| Command for static 1:1 NAT | **`ip nat inside source static <local> <global>`** |
| Show NAT translations | **`show ip nat translations`** |
| Show NAT counters/stats | **`show ip nat statistics`** |
| Clear dynamic translations | **`clear ip nat translation *`** |
| PC1 192.168.0.167 → server 8.8.8.8: which is inside global? | **The post-NAT public IP (e.g., 100.0.0.1)** |
| Inside local of PC1 | **PC1's actual configured IP (192.168.0.167)** |

## ⚡ One-Line Master Recall

**Private IP (inside local) → router translates to public IP (inside global) → reaches Internet (outside global) → reply comes back, router reverses translation, packet goes to host.**

## ➕ EXTRA — not in video, but on the exam

- **PAT / NAT overload** — Day 45; the actual IP-saver. v1.1 expects you to know PAT uses port numbers to multiplex.
- **NAT and ACLs interaction** — order of operations matters: inbound ACL → NAT inside-to-outside happens *after* routing.
- **Dynamic NAT pool** — `ip nat pool` + `ip nat inside source list … pool …`. Day 45.

## 🧾 Recap

- **RFC 1918**: 10/8, 172.16/12, 192.168/16 — private, free to use, not Internet-routable.
- **Static NAT = 1:1 manual mapping** — solves duplication but doesn't save addresses.
- **Inside local = real host IP. Inside global = post-NAT public IP.**
- Mark interfaces with **`ip nat inside`** and **`ip nat outside`**, then map with **`ip nat inside source static`**.
- If you can answer "what's the inside global / outside local for this packet?" without hesitating, move to Day 45.

---
Source: Jeremy's IT Lab — Day 44 — https://www.youtube.com/watch?v=2TZCfTgopeg
