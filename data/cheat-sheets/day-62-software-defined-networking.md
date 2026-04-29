---
title: "Free CCNA | Software-Defined Networking | Day 62 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-62
source_transcript: "[[../jeremy-it-videos/123-software-defined-networking-day-62]]"
source_url: https://www.youtube.com/watch?v=7HhWCeXDTpA
created: 2026-04-28
tags: [ccna, cheat-sheet, day-62]
---

# Day 62 — Software-Defined Networking (SD-Access + DNA Center)

## 🎯 What this video covers

Maps to v1.1 blueprint **6.2 Compare traditional networks with controller-based networking** and **6.3 Describe controller-based, software defined architecture (overlay, underlay, fabric)** including separation of control plane and data plane, and **northbound/southbound APIs**. Also **6.4** compare DNA-Center-managed device management vs traditional.

## 🧠 Core Concept

**SDN centralizes the control plane in a controller; the network has an underlay (physical), an overlay (virtual tunnels), and the fabric (their combination), with apps controlling it via northbound APIs and the controller programming devices via southbound APIs.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **SDN controller** | Centralized control plane | Control layer | "centralized brain" |
| **Application layer** | Apps/scripts that talk to controller | Top | "intent", "scripts" |
| **Control layer** | The SDN controller | Middle | "DNA Center", "centralized control plane" |
| **Infrastructure layer** | Physical devices (forwarding) | Bottom | "switches/routers" |
| **Northbound API** | App ↔ controller | NB interface | "REST API to controller" |
| **Southbound API** | Controller ↔ devices | SB interface | "NETCONF, RESTCONF, SSH/SNMP" |
| **Underlay** | Physical L3 network supporting tunnels | Physical | "underlying physical net, IS-IS" |
| **Overlay** | Virtual tunnels (VXLAN) | Logical | "VXLAN tunnels" |
| **Fabric** | Underlay + Overlay together | Combined | "combination of both" |
| **DNA Center** | Cisco's SDN controller | Cisco UCS appliance | "intent-based, GUI + REST API" |
| **SD-Access** | Cisco SDN solution for campus LAN | Cisco offering | "campus LAN automation" |
| **VXLAN** | Tunneling protocol for overlay data plane | Overlay | "virtual extensible LAN" |
| **LISP** | Mapping EID → RLOC, SD-Access control plane | Control plane | "Locator/ID Separation" |
| **Cisco TrustSec (CTS)** | Policy/QoS/security in SD-Access | Policy plane | "TrustSec" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Northbound vs Southbound** | NB = up to apps. SB = down to devices |
| **Underlay vs Overlay vs Fabric** | Underlay = physical. Overlay = virtual tunnels. Fabric = both together |
| **Traditional vs DNA-Center mgmt** | Traditional = device-by-device CLI. DNA Center = centralized intent-based GUI/API |
| **Greenfield vs Brownfield** | Green = new network, DNA Center configures underlay. Brown = existing — DNA Center won't touch underlay |
| **Routed access layer vs traditional** | Routed = L3 to access switch (no STP needed). Traditional = L2 access + STP + FHRP |

## 🔗 How it all connects

```
Apps/Scripts ↔ (Northbound REST API) ↔ DNA Center ↔ (Southbound NETCONF/RESTCONF/SSH/SNMP) ↔ Switches
                                                                                                ↓
                                                                            Underlay (IS-IS, L3 routed)
                                                                            Overlay (VXLAN tunnels)
                                                                            Fabric = both
```

## 🚨 Exam Traps

- **Underlay is NOT** the same as fabric — underlay = physical only; fabric = underlay + overlay
- **Northbound is NOT** controller-to-device — that's southbound
- **VXLAN is NOT** in the underlay — it's the **overlay** tunneling protocol
- **DNA Center is NOT** only for SD-Access — also works as a traditional network manager
- **SD-Access does NOT** use OSPF in the optimal underlay — it uses **IS-IS**
- **Routed access does NOT** need STP or FHRP — L3 all the way to access

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Three SDN architecture layers | **Application · Control · Infrastructure** |
| API between apps and controller | **Northbound** |
| API between controller and devices | **Southbound** |
| Physical network of devices/cables | **Underlay** |
| Virtual tunnel network on top | **Overlay** |
| Combination of both | **Fabric** |
| Tunneling protocol used by SD-Access overlay | **VXLAN** |
| Control-plane protocol of SD-Access | **LISP** |
| Three SD-Access switch roles | **Edge · Border · Control** |
| Routing protocol DNA Center configures in optimal underlay | **IS-IS** |
| Cisco's SDN controller for campus | **DNA Center** |
| Greenfield vs brownfield | **Green = new (DNA Center configs underlay) / Brown = existing (don't touch underlay)** |
| Cisco SDN for data center | **ACI** |
| Cisco SDN for WAN | **SD-WAN** |

## ⚡ One-Line Master Recall

**App layer talks NB to controller; controller talks SB to devices. Underlay (physical) + Overlay (VXLAN tunnels) = Fabric.**

## ➕ EXTRA — not in video, but on the exam

- **OpenFlow** — original SDN southbound protocol; mentioned in v1.1 6.2 but Cisco prefers NETCONF/RESTCONF.
- **NETCONF (TCP 830) / RESTCONF (HTTPS)** — modern SB protocols using YANG data models. v1.1 6.6/6.7.
- **Crosswork / Catalyst Center** — Cisco renamed DNA Center to Catalyst Center in 2024. Exam may use either name.
- **SDN data plane vs control plane** — data plane forwards (still on devices). Control plane decides (centralized in SDN). Memorize the split.
- **Imperative vs Declarative / Intent-based** — DNA Center is **intent-based**: tell it WHAT, not HOW. v1.1 6.4.

## 🧾 Recap

- **SDN** centralizes the **control plane** in a controller — devices keep the data plane.
- Three layers: **Application** (scripts), **Control** (controller), **Infrastructure** (devices).
- **Northbound** = apps↔controller; **Southbound** = controller↔devices.
- SD-Access: **Underlay** (IS-IS, L3 routed access) + **Overlay** (VXLAN tunnels, LISP control, TrustSec policy) = **Fabric**.
- **DNA Center** = Cisco's intent-based controller (REST API, GUI). Compare to traditional CLI-per-device management.
- Switch roles: **Edge** (host access), **Border** (to outside), **Control** (LISP).
- If you can draw underlay/overlay/fabric and label NB/SB APIs, move to Day 63.

---
Source: Jeremy's IT Lab — Day 62 — https://www.youtube.com/watch?v=7HhWCeXDTpA
