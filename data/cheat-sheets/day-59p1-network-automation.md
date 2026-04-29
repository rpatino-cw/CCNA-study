---
title: "Intro to Network Automation | CCNA 200-301 Day 59 (part 1)"
type: ccna-cheat-sheet
day: day-59p1
source_transcript: "[[../jeremy-it-videos/118-intro-to-network-automation-ccna-200-301-day-59-part-1]]"
source_url: https://www.youtube.com/watch?v=4tsBgMCPVuc
created: 2026-04-28
tags: [ccna, cheat-sheet, day-59p1]
---

# Day 59 (Part 1) — Intro to Network Automation & SDN

## 🎯 What this video covers

Maps to v1.1 blueprint **6.1 Explain how automation impacts network management** + **6.2 Compare traditional vs controller-based networking** + **6.3 Describe controller-based architectures (overlay, underlay, fabric)**. Sets the stage for the rest of section 6.0 (10% of the exam).

## 🧠 Core Concept

**Traditional networking = each device has its own data + control + management plane. SDN = centralizes the control plane in a controller; devices just forward (data plane). APIs talk north (apps) and south (devices).**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **Data plane** | Forwarding user traffic | Hardware ASIC + TCAM | "frame/packet forwarding" |
| **Control plane** | Builds tables that data plane uses | CPU (or controller in SDN) | "OSPF, STP, ARP tables" |
| **Management plane** | Admin access + monitoring | CPU | "SSH, Telnet, Syslog, SNMP, NTP" |
| **ASIC** | Application-Specific IC for fast forwarding | Switch/router silicon | "hardware data plane" |
| **TCAM** | Ternary CAM — fast lookups | Stores MAC/route tables | "wire-speed lookup" |
| **SDN controller** | Centralized brain | App on a server | "centralizes control plane" |
| **SBI** | Southbound Interface (controller→devices) | Between controller and devices | "OpenFlow, OpFlex, NETCONF, onePK" |
| **NBI** | Northbound Interface (apps→controller) | Between apps and controller | "REST API, JSON/XML" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Data vs Control vs Management plane** | Data = forwards user traffic (ARP table use, ACL apply, NAT). Control = builds the tables (OSPF, STP, ARP request). Management = how YOU access the device (SSH, NTP, Syslog, SNMP) |
| **Traditional vs SDN** | Traditional = control plane distributed (each device thinks). SDN = control plane centralized in a controller |
| **SBI vs NBI** | SBI faces DOWN to devices (OpenFlow etc). NBI faces UP to apps (REST API) |
| **CPU vs ASIC** | CPU = control + management (slower). ASIC = data plane (wire speed) |

## 🔗 How it all connects

```
App ──NBI(REST/JSON)──> Controller ──SBI(OpenFlow/NETCONF)──> Network devices (data plane only)
```

## 🚨 Exam Traps

- **NTP, SSH, Syslog, SNMP = MANAGEMENT plane** — NOT control. Common trap.
- **OSPF, STP, ARP = CONTROL plane** (they BUILD tables). The forwarding that USES the table = data plane.
- **NAT, ACL enforcement, dot1q tag/untag = DATA plane** (happens during forwarding).
- **SBI is the controller's interface to DEVICES.** NBI is the controller's interface to APPS. Not the other way.
- **REST is a TYPE of API**, not one specific API. Uses HTTP/HTTPS.
- **MAC address table is also called CAM table** — stored in TCAM.

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Plane: forwarding a packet | **Data** |
| Plane: OSPF, STP, building ARP table | **Control** |
| Plane: NTP, SSH, Telnet, Syslog, SNMP | **Management** |
| SBI examples | **OpenFlow, OpFlex, onePK, NETCONF** |
| NBI typical API style | **REST API (over HTTP)** |
| Common data formats over NBI | **JSON, XML** |
| Hardware that does fast forwarding | **ASIC** |
| Memory storing MAC table for fast lookup | **TCAM (CAM table)** |
| Control plane in SDN lives… | **In the controller (centralized)** |
| Top automation benefits | **Reduce human error, reduce OpEx, scale, policy compliance** |

## ⚡ One-Line Master Recall

**Data forwards, Control decides, Management administers. SDN centralizes Control in a controller; SBI talks to devices, NBI talks to apps.**

## ➕ EXTRA — not in video, but on the exam

- **Cisco DNA Center / Catalyst Center** — Cisco's controller. v1.1 explicitly tests Cisco's controller-based architecture.
- **Underlay vs Overlay vs Fabric** (6.3) — underlay = physical IP routing. Overlay = VXLAN tunnels. Fabric = the orchestrated whole.
- **NETCONF vs RESTCONF** — NETCONF uses XML over SSH. RESTCONF uses JSON/XML over HTTP.
- **YANG** — data modeling language used by NETCONF/RESTCONF. v1.1 may surface in an automation MCQ.

## 🧾 Recap

- **Three planes: Data (forward), Control (decide), Management (admin).**
- **ASIC + TCAM** = hardware data plane. CPU = control + mgmt.
- **SDN centralizes control in a controller.** SBI = down to devices, NBI = up to apps.
- **REST API + JSON/XML** is the typical NBI stack.
- If you can sort any protocol (OSPF, NTP, NAT, SSH) into the right plane, move to Day 60.

---
Source: Jeremy's IT Lab — Day 59 (part 1) — https://www.youtube.com/watch?v=4tsBgMCPVuc
