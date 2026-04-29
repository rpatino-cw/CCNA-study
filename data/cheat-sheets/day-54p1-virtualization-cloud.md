---
title: "Free CCNA | Virtualization & Cloud | Day 54 (part 1) | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-54p1
source_transcript: "[[../jeremy-it-videos/109-virtualization-cloud-day-54-part-1]]"
source_url: https://www.youtube.com/watch?v=_S3greGajJA
created: 2026-04-28
tags: [ccna, cheat-sheet, day-54p1]
---

# Day 54 (Part 1) — Virtualization & Cloud

## 🎯 What this video covers

Maps to v1.1 blueprint **1.12 Explain virtualization fundamentals (server virtualization, containers, VRFs)** — focusing on VMs/hypervisors here — and **1.2.f compare on-premises to cloud**. Cloud uses NIST SP 800-145 framework: 5 essential characteristics, 3 service models, 4 deployment models.

## 🧠 Core Concept

**Virtualization breaks the 1:1 hardware-to-OS rule via a hypervisor; cloud delivers those VMs/services on-demand using NIST's 5 characteristics, 3 service models, 4 deployment models.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **Hypervisor / VMM** | Allocates HW resources to VMs | Host server | "manages VMs" |
| **Type 1 hypervisor** | Runs directly on hardware | Bare-metal / native | "ESXi", "Hyper-V", "data center" |
| **Type 2 hypervisor** | Runs on a host OS as an app | Hosted | "VirtualBox", "VMware Workstation" |
| **VM** | Virtual machine (OS in a VM) | Inside hypervisor | "guest OS" |
| **vSwitch** | Virtual switch on hypervisor | Connects VMs to NIC | "trunk to physical NIC" |
| **On-premises** | All HW in company building | Company DC | "owned and operated" |
| **Colocation** | Customer HW in rented DC space | 3rd-party DC | "rent space + power" |
| **Cloud** | On-demand pooled resources via service model | Provider DC | "NIST 800-145" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Type 1 vs Type 2** | T1 = bare-metal (data center). T2 = hosted on OS (laptop/desktop) |
| **VM vs container** | VM = full guest OS + kernel (heavier). Container = shared kernel, app-level isolation |
| **Public vs Private cloud** | Public = open to general public (AWS/Azure). Private = exclusive to one org |
| **On-prem vs Cloud** | On-prem: company owns + operates. Cloud: pay-per-use, provider operates |
| **CapEx vs OpEx** | On-prem = CapEx (big upfront). Cloud = OpEx (recurring) |

## 🔗 How it all connects

```
Hardware → Hypervisor (T1 or T2) → VMs → vSwitch → physical NIC → physical switch (trunk)
Cloud customer → on-demand portal → resource pool → VM/PaaS/SaaS → measured + billed
```

## 🚨 Exam Traps

- **Type 1 is NOT** "hosted" — that's Type 2. T1 = **bare-metal / native**
- **Cloud is NOT** always off-premises — **private cloud** can be on-prem
- **Resource pool is NOT** infinite — appears infinite to the customer but isn't
- **SaaS does NOT** give the customer OS access — that's **IaaS**
- **PaaS does NOT** include the customer's apps — only the platform underneath
- **Hybrid cloud is NOT** a separate cloud type — it's a **combination** of private/community/public

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Hypervisor on bare metal | **Type 1 (native)** |
| Hypervisor on a host OS | **Type 2 (hosted)** |
| Manages and allocates resources to VMs | **Hypervisor / VMM** |
| 5 essential characteristics of cloud | **On-demand self-service · Broad network access · Resource pooling · Rapid elasticity · Measured service** |
| 3 service models | **SaaS · PaaS · IaaS** |
| 4 deployment models | **Private · Community · Public · Hybrid** |
| Customer makes/owns VMs, runs any OS | **IaaS** |
| Customer just uses provider's apps | **SaaS (e.g. Office 365, Gmail)** |
| Customer deploys their own code on provider's tools | **PaaS (e.g. AWS Lambda)** |
| Two ways to connect to a public cloud | **Internet (with VPN) or private WAN (e.g. MPLS)** |

## ⚡ One-Line Master Recall

**T1 bare-metal, T2 hosted; cloud = 5 characteristics + 3 services (SaaS/PaaS/IaaS) + 4 deployments (private/community/public/hybrid).**

## ➕ EXTRA — not in video, but on the exam

- **Containers + VRFs** — also under v1.1 1.12. Container = OS-level virt sharing kernel (Docker, Kubernetes pods). VRF = router-level virtualization (multiple routing tables on one device).
- **vNIC vs pNIC** — virtual NIC inside the VM vs physical NIC on the host. Hypervisor maps vNICs through the vSwitch to pNICs.
- **VMotion / Live migration** — move a running VM between hosts with no downtime. Mentioned in v1.1 1.12 indirectly via "agility."
- **Cloud CapEx → OpEx** — exam may phrase as "shifts spending from capital to operational." Word association.
- **NIST SP 800-145** — the canonical cloud document. If the exam mentions a NIST cloud definition, this is the source.

## 🧾 Recap

- **Hypervisor** breaks 1:1 hardware-to-OS — Type 1 bare-metal for DC, Type 2 hosted for laptops.
- **Cloud (NIST 800-145)**: 5 characteristics, 3 service models, 4 deployment models. Memorize all three lists.
- **IaaS** gives most customer control (OS + up); **SaaS** gives least (just the app).
- **Private cloud can still be on-premises** — cloud ≠ off-prem.
- Connect to public cloud via Internet (VPN) or private WAN (MPLS, dedicated link).
- If you can list all 5+3+4 from blank, move to Day 54 Part 2.

---
Source: Jeremy's IT Lab — Day 54 Part 1 — https://www.youtube.com/watch?v=_S3greGajJA
