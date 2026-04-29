---
title: "Free CCNA | WAN Architectures | Day 53 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-53
source_transcript: "[[../jeremy-it-videos/107-wan-architectures-day-53]]"
source_url: https://www.youtube.com/watch?v=BW3fQgdf4-w
created: 2026-04-28
tags: [ccna, cheat-sheet, day-53]
---

# Day 53 — WAN Architectures

## 🎯 What this video covers

Maps to v1.1 blueprint **1.2.d WAN** + **5.5 site-to-site/remote-access VPNs**. Connects geographically separate LANs over leased lines, MPLS, or Internet VPNs. Hub-and-spoke vs full mesh.

## 🧠 Core Concept

**WAN connects far-apart LANs. Three flavors: leased lines (private/serial), MPLS VPN (shared SP infra with labels), and Internet VPN (IPsec site-to-site or TLS remote-access).**

## 🔑 Must-Know Table — WAN Options

| Tech | Type | Topology | Encryption | Notes |
|---|---|---|---|---|
| **Leased line (T1/E1)** | Dedicated physical | Point-to-point | None | Serial, PPP/HDLC L2. T1 = **1.544 Mbps**, E1 = 2.048 |
| **MPLS L3 VPN** | Shared SP, label-switched | Any | None inherent | CE peers OSPF with **PE** |
| **MPLS L2 VPN** | Shared SP, label-switched | Any | None inherent | CE peers **with other CE** — SP transparent |
| **Internet VPN (site-to-site)** | Public Internet + IPsec | Hub-spoke / mesh | **IPsec** | Two routers = endpoints |
| **Internet VPN (remote-access)** | Public Internet + TLS | Many users → 1 site | **TLS** | Cisco AnyConnect on PC |

## 🔑 Must-Know Table — Internet Connection Redundancy

| Term | Meaning |
|---|---|
| **Single homed** | 1 link to 1 ISP |
| **Dual homed** | 2 links to 1 ISP |
| **Multihomed** | 1 link to each of 2 ISPs |
| **Dual multihomed** | 2 links to each of 2 ISPs (most redundant) |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **MPLS L2 vs L3 VPN** | L3: CE↔PE OSPF/static. **L2**: SP looks like one big switch — CE peers with **other CE** |
| **IPsec vs GRE** | IPsec encrypts but **no multicast/broadcast**. GRE supports any L3 + multicast but **no encryption**. **GRE over IPsec** = both |
| **DMVPN vs static IPsec mesh** | DMVPN = configure hub-and-spoke once, routers **dynamically** form full mesh. Cisco proprietary |
| **Site-to-site (IPsec) vs Remote-access (TLS)** | S2S: router-to-router for whole sites. Remote: client app on PC connects single user |
| **CE / PE / P routers** | CE = customer edge. PE = provider edge (runs MPLS, faces customer). P = provider core (no CE connection) |

## 🔗 How it all connects

```
Office A LAN ── CE ── PE ─── P ─── PE ── CE ── Office B LAN
                 \     SP MPLS network       /
                  └─ labels separate VPNs ──┘
```

## 🚨 Exam Traps

- **CE router does NOT run MPLS** — only PE and P routers do
- **L3 MPLS VPN is NOT** where CEs peer with each other — that's **L2 MPLS VPN**
- **GRE is NOT secure on its own** — no encryption, just encapsulation
- **IPsec is NOT** capable of carrying multicast — that's why GRE-over-IPsec exists
- **TLS is NOT** for site-to-site — TLS is for **remote-access** VPN clients
- **Dual-homed is NOT multihomed** — dual-homed = 2 links to **same** ISP

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| T1 leased-line speed | **1.544 Mbps** |
| Layer 2.5 protocol | **MPLS** (labels between L2 and L3) |
| Routers that run MPLS | **PE + P** (NOT CE) |
| MPLS VPN with CE-CE peering | **Layer 2 MPLS VPN** |
| VPN protocol allowing multicast over IPsec | **GRE over IPsec** |
| Dynamic full-mesh IPsec without manual tunnels | **DMVPN** (Cisco) |
| Remote-access VPN protocol | **TLS** (Cisco AnyConnect) |
| Site-to-site VPN protocol | **IPsec** |

## ⚡ One-Line Master Recall

**Leased line = serial private. MPLS = shared SP with labels (CE doesn't run it). Site-to-site = IPsec; Remote-access = TLS. GRE-over-IPsec adds multicast; DMVPN adds dynamic mesh.**

## ➕ EXTRA — not in video, but on the exam

- **SD-WAN (1.2.e)** — Cisco SD-WAN / Viptela. Centralized control plane (vSmart), data plane on vEdges. Replacing classic WAN designs.
- **Internet as transport for SD-WAN** — multiple Internet/MPLS links with per-app routing decisions.
- **IPsec phases** — Phase 1 (IKE) builds management SA. Phase 2 builds data SA. Modes: tunnel (default) vs transport.
- **DSL / cable modem** — DSL over phone lines. Cable over CATV. Both need a modem (modulator-demodulator).

## 🧾 Recap

- **WAN connects geographically separate LANs.** Leased line, MPLS, or Internet VPN.
- **MPLS routers**: CE (customer, no MPLS) → PE (edge) → P (core).
- **L2 MPLS VPN** = SP looks like a switch. **L3 MPLS VPN** = CE peers OSPF with PE.
- **Site-to-site VPN = IPsec** (router-to-router). **Remote-access VPN = TLS** (client software).
- If you can pick the right WAN tech for any topology question, move on to Day 54.

---
Source: Jeremy's IT Lab — Day 53 — https://www.youtube.com/watch?v=BW3fQgdf4-w
