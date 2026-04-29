---
title: "Free CCNA | VRF | Day 54 (part 3) | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-54p3
source_transcript: "[[../jeremy-it-videos/111-vrf-day-54-part-3]]"
source_url: https://www.youtube.com/watch?v=Ge4644KUvh4
created: 2026-04-28
tags: [ccna, cheat-sheet, day-54p3]
---

# Day 54 (part 3) — VRF (Virtual Routing and Forwarding)

## 🎯 What this video covers

Maps to v1.1 blueprint **1.12 Describe the use of VRF** (concept only — config not exam-tested but useful for understanding). VRF splits one physical router into multiple virtual routers, each with its own routing table — like VLANs for routing.

## 🧠 Core Concept

**A VRF is a separate routing table inside one router; interfaces in different VRFs can't reach each other (without VRF leaking) and can even reuse the same IP addresses.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **VRF instance** | Independent virtual router with own routing table | Per router | "separate routing table" |
| **VRF-lite** | VRF without MPLS (the CCNA flavor) | Standalone routers | "no MPLS" |
| **Global routing table** | The default (non-VRF) table | Interfaces with no VRF assignment | "default routing instance" |
| **`ip vrf NAME`** | Create a VRF | Global config | "define VRF" |
| **`ip vrf forwarding NAME`** | Assign interface to a VRF | Interface config — wipes existing IP | "assigns interface, removes IP" |
| **`show ip route vrf NAME`** | View a VRF's routing table | Privileged exec | "per-VRF route table" |
| **VRF leaking** | Allow traffic between VRFs (advanced) | Beyond CCNA scope | "exception to isolation" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **VLANs vs VRFs** | VLANs split *switches* (broadcast domains, L2). VRFs split *routers* (routing tables, L3) |
| **Global table vs VRF table** | Global = interfaces not assigned to any VRF. VRF = interfaces inside that VRF |
| **VRF-lite vs MPLS VRF** | Lite = no MPLS, just isolation. With MPLS = service-provider L3VPN |
| **Same router, two interfaces, same subnet** | Without VRF: rejected. With VRF: allowed if in different VRFs |

## 🔗 How it all connects

```
[Physical R1]
├─ [VRF CUSTOMER1: G0/0, G0/1] → own routing table
└─ [VRF CUSTOMER2: G0/2, G0/3] → own routing table  (isolated; IPs may overlap)
```

## 🚨 Exam Traps

- **VRF is NOT a switch feature alone** — applies to L3 ports (router interfaces, SVIs, routed ports on multilayer switches)
- **`ip vrf forwarding` does NOT preserve the existing IP** — it wipes it; reconfigure the IP after assigning the VRF
- **`show ip route` does NOT show VRF routes** — it shows the global table only; use `show ip route vrf NAME`
- **Pinging without specifying VRF uses the global table** — even if all interfaces are in VRFs (will fail with no global routes)
- **VRF-lite does NOT require MPLS** — the "lite" version is what CCNA covers
- **VRFs do NOT create separate broadcast domains** (that's VLANs); they create separate routing instances

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Common analogy for VRF | **"VLANs for routers"** |
| Command to create a VRF | **`ip vrf NAME`** |
| Command to assign interface to VRF | **`ip vrf forwarding NAME`** |
| Side-effect of `ip vrf forwarding` | **Removes existing IP address** |
| Show a specific VRF's routing table | **`show ip route vrf NAME`** |
| Ping inside a VRF | **`ping vrf NAME <destination>`** |
| Can two interfaces in different VRFs share the same IP? | **Yes** |
| Main service-provider use case | **Carry multiple customers on shared infrastructure with isolation** |

## ⚡ One-Line Master Recall

**One physical router → multiple VRFs (each its own routing table) → interfaces assigned per VRF → traffic isolated between VRFs → IPs may overlap → service providers use it to host many customers on one box.**

## ➕ EXTRA — not in video, but on the exam

- **MPLS L3VPN** — the production use of VRFs in carriers; v1.1 mentions WAN architectures (Day 53). VRFs are the customer-side building block.
- **Route Distinguisher / Route Target** — only matter with MPLS VRFs; out of CCNA scope but you may see the term.
- **`vrf definition` (newer syntax)** — modern IOS uses `vrf definition NAME` + `address-family ipv4`. Both old and new syntax may appear.

## 🧾 Recap

- **VRF = virtual routers inside one router**, each with its own routing table.
- **VRF-lite** is the CCNA flavor (no MPLS).
- Assigning an interface to a VRF with **`ip vrf forwarding`** wipes the IP — reconfigure it.
- Use **`show ip route vrf NAME`** and **`ping vrf NAME …`** — global commands won't see VRF entries.
- If you can explain why an SP would use VRF and the VLAN-vs-VRF contrast, move on.

---
Source: Jeremy's IT Lab — Day 54 (part 3) — https://www.youtube.com/watch?v=Ge4644KUvh4
