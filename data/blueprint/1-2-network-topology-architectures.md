---
title: "Blueprint 1.2 — Network Topology Architectures (Atomic Drill List)"
type: ccna-blueprint-expansion
blueprint: "1.2"
parent: "1.0 Network Fundamentals"
weight: "20% domain"
exam_target: 2026-05-28
created: 2026-04-29
updated: 2026-04-29
tags: [ccna, blueprint, 1.2, topology, drill]
links:
  - "[[1-1-network-components]]"
  - "[[CCNA Index]]"
---

# Blueprint 1.2 — Network Topology Architectures

> Cisco's blueprint: "Describe characteristics of network topology architectures." 6 lettered topologies. This page extends each into atomic drill points.

---

## 1.2.a — Two-Tier (Collapsed Core)

| ID | Fact |
|---|---|
| 1.2.a.1 | "Collapsed core" = **core + distribution merged** into one layer. |
| 1.2.a.2 | Tiers: **Access** (user ports) + **Core/Distribution** (aggregation + routing). |
| 1.2.a.3 | Used for **small-to-medium** campus networks. |
| 1.2.a.4 | Pro: **cheaper**, fewer devices, simpler to manage. |
| 1.2.a.5 | Con: less scalable than three-tier, single device per layer = bigger blast radius. |
| 1.2.a.6 | Common giveaway: "small campus", "merged core and distribution". |

---

## 1.2.b — Three-Tier

| ID | Fact |
|---|---|
| 1.2.b.1 | Tiers: **Access → Distribution → Core**. |
| 1.2.b.2 | **Access** = end-user ports, PoE for APs/phones, port security. |
| 1.2.b.3 | **Distribution** = inter-VLAN routing, ACLs, route summarization, redundancy. |
| 1.2.b.4 | **Core** = high-speed backbone — forwards as fast as possible, no policy. |
| 1.2.b.5 | "Fast switching, no policy" = **core**. "Policy + ACL" = **distribution**. "End user" = **access**. |
| 1.2.b.6 | Used in **large campus / enterprise**. |
| 1.2.b.7 | Pro: scalable, modular, fault-isolated. |
| 1.2.b.8 | Con: more expensive, more devices to manage. |

---

## 1.2.c — Spine-Leaf

| ID | Fact |
|---|---|
| 1.2.c.1 | Two layers: **Spine** (backbone) + **Leaf** (access). |
| 1.2.c.2 | **Every leaf connects to every spine** (full mesh between layers). |
| 1.2.c.3 | **Leaves do NOT connect to other leaves**; spines do NOT connect to other spines. |
| 1.2.c.4 | Hop count between any 2 endpoints = **always 2** (predictable latency). |
| 1.2.c.5 | Used in **modern data centers** (high east-west traffic — server-to-server). |
| 1.2.c.6 | Forwarding plane: usually **VXLAN over EVPN** or **L3 ECMP**. |
| 1.2.c.7 | Pro: predictable latency, easy horizontal scaling, no STP loops. |
| 1.2.c.8 | Con: cabling-intensive, requires L3 capability on leaves. |
| 1.2.c.9 | Replaces three-tier inside DC because legacy is north-south, modern is east-west. |

**Romeo's CW context:** CoreWeave fabrics use spine-leaf at scale. Live exposure = you've already seen this.

---

## 1.2.d — WAN (Wide Area Network)

| ID | Fact |
|---|---|
| 1.2.d.1 | WAN = **connects geographically separated sites** (LAN to LAN across distance). |
| 1.2.d.2 | WAN owner = a **service provider** (ISP, telco), not the customer. |
| 1.2.d.3 | Common WAN technologies: **MPLS, Metro Ethernet, leased lines (T1/E1), DSL, cable, cellular (4G/5G), satellite**. |
| 1.2.d.4 | **SD-WAN** = software-defined WAN, uses cheap internet links + central policy controller, replaces expensive MPLS for many sites. |
| 1.2.d.5 | **CPE** (Customer Premises Equipment) = device at customer site that talks to provider (typically a router). |
| 1.2.d.6 | **Demarc** = handoff point between provider and customer responsibility. |
| 1.2.d.7 | WAN runs **slower + lossier** than LAN — design assumes that. |

---

## 1.2.e — SOHO (Small Office / Home Office)

| ID | Fact |
|---|---|
| 1.2.e.1 | SOHO = **small office or home office** — a few users to ~20. |
| 1.2.e.2 | Typically a **single combo device** (router + switch + AP + firewall in one box). |
| 1.2.e.3 | WAN side = consumer ISP (cable modem, fiber, DSL). |
| 1.2.e.4 | LAN side = wired switch ports + Wi-Fi. |
| 1.2.e.5 | NAT done on the combo box for IPv4 internet. |
| 1.2.e.6 | DHCP usually runs on the combo box. |
| 1.2.e.7 | Cisco SOHO line: **Cisco 800 / Meraki MX/MR**. |

---

## 1.2.f — On-Premises and Cloud

| ID | Fact |
|---|---|
| 1.2.f.1 | **On-prem** = compute + storage + network in your own building (you own it). |
| 1.2.f.2 | **Public cloud** = AWS, Azure, GCP, etc. — pay-as-you-go, provider owns infra. |
| 1.2.f.3 | **Private cloud** = cloud-style automation but on hardware *you* own. |
| 1.2.f.4 | **Hybrid cloud** = mix of on-prem + public cloud connected by VPN or direct link. |
| 1.2.f.5 | Cloud service models: **IaaS** (raw VMs/network), **PaaS** (managed runtime), **SaaS** (full app like Gmail). |
| 1.2.f.6 | **Direct connect** services (AWS Direct Connect, Azure ExpressRoute) = private fiber from your DC to cloud, bypasses Internet. |
| 1.2.f.7 | On-prem ↔ cloud connectivity options: **IPsec VPN, SD-WAN, Direct Connect/ExpressRoute**. |

---

## High-Value Confusable Pairs

| Pair | Key contrast |
|---|---|
| Two-tier vs Three-tier | Two-tier collapses core into distribution. Three-tier keeps them separate (large campus). |
| Three-tier vs Spine-Leaf | Three-tier optimizes north-south (campus). Spine-leaf optimizes east-west (data center). |
| Spine-Leaf vs Mesh | Leaf-to-spine is full mesh; leaf-to-leaf is NOT. |
| LAN vs WAN | LAN owned by you, fast, low-latency. WAN owned by ISP, slower, higher latency. |
| Public vs Private cloud | Public = someone else's hardware. Private = your hardware, cloud-style ops. |
| IaaS vs PaaS vs SaaS | Raw infra vs managed runtime vs finished app. |

---

## Exam Traps

- **Spine-leaf** has NO STP loops by design — leaves never talk to each other.
- **Two-tier** is NOT smaller-than-needed for an SMB — it's the right answer for medium campus.
- **WAN** is NOT just "the Internet" — MPLS/leased lines are WAN too.
- **SD-WAN** is NOT a replacement for the WAN itself — it's a way to *manage* WAN links smarter.
- **Hybrid cloud** is NOT the same as multi-cloud (multi = multiple public clouds, hybrid = on-prem + cloud).
- **Core layer** does NOT do policy or filtering — that's the distribution layer's job.

---

## Quick-Answer Map

| Stem | Answer |
|---|---|
| Small campus, merged distribution+core | Two-tier |
| Large enterprise campus, full hierarchy | Three-tier |
| Data center, predictable east-west latency | Spine-leaf |
| Connects geographically separated sites | WAN |
| Single combo box, ~10 users | SOHO |
| Customer-owned compute on customer site | On-premises |
| Pay-as-you-go via AWS/Azure | Public cloud |
| Mix of on-prem + AWS/Azure via VPN | Hybrid cloud |
| Fast forwarding, no policy | Core layer |
| Inter-VLAN routing + ACLs | Distribution layer |
| User ports + PoE for phones | Access layer |

---

## One-Line Master Recall

> **1.2 = 6 architectures: two-tier (small/medium), three-tier (large enterprise), spine-leaf (DC east-west), WAN (sites across distance), SOHO (combo box), on-prem/cloud (where the gear lives).**

---

## Drill Plan

1. Read each atomic fact — mark anything you can't recall in <3 sec.
2. Run [Quick-Answer Map](#quick-answer-map) end-to-end. Goal: 11/11 with no peeking.
3. Run Exam Traps from memory.
4. Click into [[1-3-physical-interfaces-cabling|1.3]] when 1.2 is reflex.

---

## Sources

- Cisco 200-301 v1.1 blueprint
- Jeremy's IT Lab Day 2-3 (interfaces + topology)
- NetworkLessons — campus architecture
- Cisco Press CCNA Official Cert Guide v1.1, Chapter 17 (LAN Architecture)
- r/ccna recurring-question patterns

---

*Prev: [[1-1-network-components|1.1]] · Next: [[1-3-physical-interfaces-cabling|1.3]]*
