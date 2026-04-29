---
title: "Day 52 — LAN Architectures (1.2.a–f Cheat Sheet)"
type: ccna-cheat-sheet
day: day-52
blueprint: 1.2.a–f
source_transcript: "[[../jeremy-it-videos/105-lan-architectures-day-52]]"
source_url: https://www.youtube.com/watch?v=PvyEcLhmNBk
created: 2026-04-28
updated: 2026-04-29
tags: [ccna, cheat-sheet, day-52, blueprint-aligned]
---

# Day 52 — Network Topology Architectures (Full 1.2.a → 1.2.f)

## 🎯 What this objective covers

CCNA 200-301 v1.1 blueprint **1.2 Describe characteristics of network topology architectures**. Six architectures, all on the exam:

| Sub-bullet | Architecture |
|---|---|
| **1.2.a** | Two-tier |
| **1.2.b** | Three-tier |
| **1.2.c** | Spine-leaf |
| **1.2.d** | WAN |
| **1.2.e** | Small office/home office (SOHO) |
| **1.2.f** | On-premises and cloud |

## 🧠 Core Concept

**Topology = how devices physically/logically connect.** 1.2 is asking you to recognize the layout pattern of a network and pick the right one for a given scale, traffic shape, and ownership model. Campus = three-tier or two-tier. Data center = spine-leaf. Multi-site = WAN. Single small site = SOHO. Compute location = on-prem vs cloud.

---

## 1.2.a — Two-Tier (Collapsed Core)

| Attribute | Detail |
|---|---|
| Layers | **Access** + **Distribution** (the core role is collapsed into the distribution) |
| Used when | Small-to-medium campus — typically **≤3 distribution blocks** |
| Why | A separate core would be over-engineering for that scale |

**Layer roles:**
- **Access layer** — where endpoints plug in. Many ports. PoE delivered here. Security and QoS marking happen here.
- **Distribution layer** — aggregates access switches AND acts as the L2↔L3 boundary AND moves packets fast across the campus (since there's no core).

**Exam giveaway phrases:** "collapsed core", "small campus", "two layers".

---

## 1.2.b — Three-Tier

| Attribute | Detail |
|---|---|
| Layers | **Access** + **Distribution** + **Core** |
| Used when | Large campus — typically **>3 distribution blocks** |
| Why | A dedicated core layer offloads east-west aggregation from distribution |

**Layer roles (memorize):**

| Layer | Function | What lives here | What does NOT live here |
|---|---|---|---|
| **Access** | Endpoints connect | Many-port switches, PoE, QoS marking, port security, DAI | Routing |
| **Distribution** | Aggregates access; L2↔L3 boundary | Multilayer (L3) switches, SVIs as default gateway, FHRP (HSRP/VRRP/GLBP) | Endpoint connections |
| **Core** | Fast L3 backbone | High-speed switches, **L3 only** | **No** STP, **no** security ACLs, **no** QoS marking — keep it fast |

**Cisco rule of thumb:** Core gets added when you have **more than 3 distribution blocks** to aggregate.

**Exam giveaway phrases:** "core layer", "fast transport", "L3 backbone".

---

## 1.2.c — Spine-Leaf

| Attribute | Detail |
|---|---|
| Used in | **Data centers** (not campus) |
| Optimized for | **East-west** traffic (server-to-server) |
| Topology rule | **Every leaf connects to every spine** — full mesh between tiers |
| Forbidden links | **No leaf-to-leaf**. **No spine-to-spine**. |

**Layer roles:**
- **Leaf** — where servers (and storage, and uplinks to outside the DC) attach. Equivalent to access layer in a campus.
- **Spine** — the high-speed fabric that interconnects leaves. Every leaf has a link to every spine, so any server-to-server hop is exactly **two hops** (leaf → spine → leaf).

**Why it exists:** Three-tier campus design optimizes for **north-south** traffic (in/out of the network). Modern data centers run microservices and distributed apps where traffic is mostly **east-west** (server-to-server) — three-tier creates congestion at the distribution and core layers. Spine-leaf gives every server-to-server path the same hop count and bandwidth.

**Exam traps:**
- End hosts/servers do NOT connect to spine switches — only to leaves.
- Spine-to-spine is NOT allowed; spines are not directly connected.
- Leaf-to-leaf is NOT allowed; everything goes through a spine.

**Exam giveaway phrases:** "data center fabric", "east-west traffic", "every leaf to every spine".

---

## 1.2.d — WAN (Wide Area Network)

| Attribute | Detail |
|---|---|
| Definition | Connects **geographically separate** sites (different cities, countries, continents) |
| Owner | Usually a **service provider** (ISP, telco) — the customer leases bandwidth |
| Bandwidth | Typically **lower** than LAN; **latency** is higher |

**WAN topologies (memorize):**

| Topology | Description | Use case |
|---|---|---|
| **Hub-and-spoke** | One central site (hub); all branch sites (spokes) connect only to the hub | Cheap, simple, traffic between branches goes via hub |
| **Full mesh** | Every site connects to every other site | Redundant, expensive, n(n-1)/2 links |
| **Partial mesh** | Some sites have direct links to others, but not all | Compromise — important pairs get direct links |
| **Point-to-point** | Two sites connected directly | Dedicated line between two locations |

**WAN connection types you should recognize on 1.2:** MPLS, leased line, internet VPN, SD-WAN. (Configuration is in domain 5; here it's just "what is a WAN" recognition.)

**Exam giveaway phrases:** "geographically separate", "service provider", "between sites", "MPLS / leased line / VPN".

---

## 1.2.e — Small Office / Home Office (SOHO)

| Attribute | Detail |
|---|---|
| Scale | One small site, often just one box on the wall |
| Box | A **"wireless router"** — single device combining many roles |
| Roles inside the box | **Router + switch + access point + firewall + (often) DSL/cable modem** |

**Why SOHO matters on the exam:** It's the inverse of enterprise design. In enterprise you put each role in its own dedicated device. In SOHO, one all-in-one box does everything. The CCNA wants you to recognize the trade-off:

| Aspect | SOHO all-in-one | Enterprise dedicated devices |
|---|---|---|
| Devices | 1 | Many |
| Cost | Low | High |
| Scale | Small (≤ ~10 users) | Large |
| Performance | Limited (shared CPU/memory) | Each device tuned for its role |
| Manageability | Web UI, set-and-forget | Centralized (DNA Center, WLC, etc.) |

**Exam giveaway phrases:** "home office", "small office", "wireless router (the device)", "all-in-one".

---

## 1.2.f — On-Premises and Cloud

| Model | Where compute/data lives | Who owns the hardware | Capex vs Opex |
|---|---|---|---|
| **On-premises** | Customer's own data center / closet | Customer | Capex (you buy the gear) |
| **Cloud (public)** | Provider's data center (AWS, Azure, GCP, OCI) | Provider | Opex (you rent capacity) |
| **Cloud (private)** | Customer's DC, but managed cloud-style | Customer | Capex |
| **Hybrid** | Mix of on-prem + public cloud | Both | Mixed |

**Cloud service models (recognize them on 1.2):**

| Acronym | What you manage | What the provider manages |
|---|---|---|
| **IaaS** (Infra-as-a-Service) | OS, apps, data | Hardware, hypervisor, network |
| **PaaS** (Platform-as-a-Service) | Apps, data | OS, runtime, hardware |
| **SaaS** (Software-as-a-Service) | Just your data + config | Everything else |

**Cloud deployment characteristics (NIST):**
- **On-demand self-service** — provision capacity yourself
- **Broad network access** — reachable from anywhere
- **Resource pooling** — multi-tenant
- **Rapid elasticity** — scale up/down on demand
- **Measured service** — pay for what you use

**Exam giveaway phrases:** "AWS / Azure / GCP", "hybrid", "elasticity", "pay-per-use", "shared responsibility".

---

## 🔗 How it all connects

```
ENTERPRISE CAMPUS:
[Endpoints] → Access → Distribution → Core → WAN edge → [Internet / WAN / Cloud]
                                                          ↓
                                                  Public cloud (IaaS/PaaS/SaaS)

DATA CENTER FABRIC (spine-leaf):
[Servers] → Leaf ←→ Spine ←→ Leaf → [Servers]
                (every leaf to every spine)

SOHO:
[Endpoints + Wi-Fi clients] → [SOHO router/switch/AP/firewall/modem] → ISP

WAN TOPOLOGIES:
Hub-and-spoke:  branches → HUB → branches
Full mesh:      every site → every site
Partial mesh:   key pairs direct, others via hub
```

---

## 🧩 Concept-pair clarifications (high-value confusables)

| Pair | Key contrast |
|---|---|
| **2-tier vs 3-tier** | 2-tier = access + distribution (collapsed core). 3-tier adds **core** for >3 distribution blocks |
| **Distribution vs Core** | Distribution does L2/L3 + security + QoS. Core is fast-transport only (L3, no STP, no security) |
| **3-tier vs Spine-leaf** | 3-tier optimized for **north-south**. Spine-leaf optimized for **east-west** |
| **Leaf vs Access** | Same job (endpoint connection) — different naming for DC vs campus |
| **Hub-and-spoke vs Full mesh** | Hub-and-spoke = cheap, single point of failure. Full mesh = redundant, expensive |
| **SOHO vs Enterprise** | SOHO = one device does everything. Enterprise = each role gets its own device |
| **On-prem vs Cloud** | You own the gear vs you rent capacity |
| **IaaS vs PaaS vs SaaS** | IaaS gives you OS-up. PaaS gives you runtime-up. SaaS gives you the app itself |
| **North-south vs East-west** | N-S = in/out of network. E-W = server-to-server inside DC |

---

## 🚨 Exam Traps

- **Core layer** is NOT where you put security or QoS — those go at the **access** layer
- **Spanning tree** is NOT running at the core — core links are L3
- **Spine-to-spine** is NOT allowed
- **Leaf-to-leaf** is NOT allowed either
- **End hosts** do NOT connect to spine switches — only to leaves
- **2-tier collapsed core** is NOT "no distribution" — the core+distribution roles are merged into the distribution layer
- **SOHO router** is NOT an enterprise solution — single device, doesn't scale
- **Cloud** ≠ "the internet" — cloud is a deployment/ownership model, not a transport
- **IaaS** ≠ "easier than PaaS" — IaaS gives you MORE responsibility (OS, patches, runtime)
- **WAN** ≠ "internet" — WAN includes private MPLS, leased lines, VPNs, not just public internet

---

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| L2/L3 boundary in 3-tier campus | Distribution layer |
| Where PoE-enabled ports live | Access layer |
| Where QoS marking is done | Access layer |
| What does NOT belong at the core | Spanning tree, security ACLs, QoS marking |
| Core layer's only job | Fast L3 transport |
| Spine-leaf forwarding rule | Every leaf to every spine; no leaf-leaf, no spine-spine |
| Where servers connect in a DC fabric | Leaf switches |
| Architecture optimized for east-west traffic | Spine-leaf |
| Cisco recommends adding a core when | >3 distribution blocks |
| 2-tier collapses what into what | Core role into distribution layer |
| SOHO "wireless router" combines | Router + switch + AP + firewall (+ modem) |
| One central site, all branches connect to it | Hub-and-spoke WAN |
| Every site connects to every other site | Full-mesh WAN |
| Customer rents compute from AWS | Cloud (public, IaaS) |
| Hybrid means | On-prem + public cloud combined |
| You only manage your data, provider runs the app | SaaS |
| You manage OS + apps; provider runs hardware/hypervisor | IaaS |

---

## ⚡ One-Line Master Recall

**1.2 = 6 architectures: 2-tier (small campus), 3-tier (large campus), spine-leaf (DC east-west), WAN (between sites), SOHO (one box for small site), on-prem vs cloud (where the compute lives).**

---

## 🧾 Recap

- **2-tier** = access + distribution (collapsed core). Use when ≤3 distribution blocks.
- **3-tier** = access + distribution + core. Add core when >3 distribution blocks.
- **Access** = endpoints, PoE, security, QoS. **Distribution** = aggregate + L2↔L3. **Core** = fast L3 transport only.
- **Spine-leaf** = DC fabric. Every leaf to every spine, no peers within a tier. East-west optimized.
- **WAN** = between sites; topologies are hub-and-spoke, full mesh, partial mesh, point-to-point.
- **SOHO** = one all-in-one box (router + switch + AP + firewall + modem).
- **On-prem** = you own the gear. **Cloud** = you rent capacity. **Hybrid** = both. Service models: IaaS, PaaS, SaaS.

---

**Source:** Jeremy's IT Lab — Day 52 (LAN Architectures) — https://www.youtube.com/watch?v=PvyEcLhmNBk
