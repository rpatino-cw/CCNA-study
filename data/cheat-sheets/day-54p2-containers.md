---
title: "Free CCNA | Containers | Day 54 (part 2) | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-54p2
source_transcript: "[[../jeremy-it-videos/110-containers-day-54-part-2]]"
source_url: https://www.youtube.com/watch?v=K731pAS22Aw
created: 2026-04-28
tags: [ccna, cheat-sheet, day-54p2]
---

# Day 54 (Part 2) — Containers

## 🎯 What this video covers

Maps to v1.1 blueprint **1.12 Explain virtualization fundamentals (server virtualization, containers, VRFs)** — specifically the containers slice. Sits beside Day 54 part 1 (VMs/hypervisors) and part 3 (VRF).

## 🧠 Core Concept

**A container packages an app + its dependencies, sharing the host OS kernel. VMs each carry a full guest OS; containers don't — that's the whole difference.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **VM** | Full guest OS on virtual hardware | On a hypervisor | "each VM has its own OS" |
| **Hypervisor Type 1** | Runs directly on hardware (bare metal) | Data centers | "ESXi, Hyper-V, KVM" |
| **Hypervisor Type 2** | Runs on top of host OS | Personal machines | "VMware Workstation, VirtualBox" |
| **Container** | App + dependencies, shared host kernel | On a container engine | "no guest OS in the container" |
| **Container engine** | Runs containers on the host OS | Host OS (usually Linux) | "Docker Engine" |
| **Container orchestrator** | Automates deploy/scale/manage of containers | Cluster control plane | "Kubernetes, Docker Swarm" |
| **Microservices** | Many small services in containers | Architecture pattern | "decompose monolith" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **VM vs Container** | VM = full OS each, slow boot (minutes), 10s of GB, more isolated. Container = no OS, fast boot (ms), 10s of MB, shares kernel |
| **Type 1 vs Type 2 hypervisor** | Type 1 = bare metal (DC). Type 2 = on top of host OS (laptop) |
| **Container engine vs orchestrator** | Engine = runs containers (Docker). Orchestrator = manages many engines/containers (Kubernetes) |
| **Isolation** | VMs more isolated (separate kernels). Containers share the host kernel — kernel crash hits all containers |

## 🔗 How it all connects

```
Hardware → Host OS → Container Engine (Docker) → Container 1, Container 2, …
                                  ↑ orchestrated by Kubernetes for scale
```

## 🚨 Exam Traps

- **Containers do NOT** include their own OS — they share the host OS kernel. That's the entire difference.
- **Docker Engine ≠ Docker Swarm.** Engine = container engine (runs containers). Swarm = orchestrator.
- **Hyper-V is NOT** a container tool — it's a Type 1 hypervisor (Microsoft's).
- **Kubernetes is an ORCHESTRATOR**, not a container engine.
- **Containers boot in milliseconds**, VMs in minutes — a common compare-table question.
- **VMs are MORE isolated** than containers, not less — a common reversal trap.

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Most popular container engine | **Docker (Docker Engine)** |
| Most popular container orchestrator | **Kubernetes** |
| Three layers a container runs on | **Hardware → OS → Container engine** |
| Bare-metal hypervisor type | **Type 1** |
| Hosted hypervisor type | **Type 2** |
| Container boot time vs VM | **Milliseconds vs minutes** |
| Container disk size vs VM | **MBs vs GBs** |
| Which is more isolated | **VM (separate OS per VM)** |
| Container orchestrator examples | **Kubernetes, Docker Swarm** |
| Architecture using many containers | **Microservices** |

## ⚡ One-Line Master Recall

**Containers = app + deps, shared kernel, fast & small. VMs = full OS each, slow & big but more isolated.**

## ➕ EXTRA — not in video, but on the exam

- **VRF** (Day 54 part 3) — virtual routing & forwarding. Same blueprint row 1.12. v1.1 often pairs containers and VRF in one MCQ stem.
- **Cloud connectivity (1.11)** — containers underpin most modern cloud services (Kubernetes everywhere).
- **DevOps** — Day 63 + automation videos lean on containers as the deploy unit.
- **Image vs container** — image is the static template; container is a running instance. v1.1 may surface this distinction.

## 🧾 Recap

- **Container = app + dependencies, shared host kernel.** No guest OS inside.
- **VM = full guest OS per instance.** More isolated, heavier, slower.
- **Engine (Docker) runs containers; orchestrator (Kubernetes) manages many.**
- **Type 1 hypervisor = bare metal (DC). Type 2 = hosted (laptop).**
- If you can list 3 differences VMs vs containers without peeking, move to Day 54 part 3.

---
Source: Jeremy's IT Lab — Day 54 (part 2) — https://www.youtube.com/watch?v=K731pAS22Aw
