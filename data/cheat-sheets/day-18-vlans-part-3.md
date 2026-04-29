---
title: "Free CCNA | VLANs (Part 3) | Day 18 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-18
source_transcript: "[[../jeremy-it-videos/033-vlans-part-3-day-18]]"
source_url: https://www.youtube.com/watch?v=OkPB028l2eE
created: 2026-04-28
tags: [ccna, cheat-sheet, day-18]
---

# Day 18 — VLANs Part 3 (Native VLAN on ROAS, Layer 3 Switching, SVIs)

## 🎯 What this video covers

Maps to v1.1 blueprint **2.1 Configure and verify VLANs** + **2.4 Configure and verify inter-VLAN routing**. Covers native VLAN handling on a router-on-a-stick, then the modern preferred method: Layer 3 switching with SVIs. This is the inter-VLAN routing question you'll see on exam day.

## 🧠 Core Concept

**A multilayer (Layer 3) switch can route between VLANs internally using SVIs — eliminating the router-on-a-stick traffic hairpin.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **Native VLAN** | Untagged VLAN on a trunk | Default VLAN 1; should be unused VLAN | "frames not tagged on trunk" |
| **`encapsulation dot1q VLAN-ID native`** | Marks ROAS subinterface as native | Router subinterface | "configure native on router" |
| **Layer 3 switch / multilayer switch** | Switch that can also route at L3 | Has routing table, can run static/dynamic routes | "routes between VLANs without a router" |
| **SVI (Switch Virtual Interface)** | Virtual L3 interface for a VLAN | `interface vlan N` on multilayer switch | "configure IP address on a VLAN" |
| **Routed port** | Physical switch port acting like a router port | Created with `no switchport` | "point-to-point Layer 3 link" |
| **`ip routing`** | Enables L3 routing on the switch | Global config, MUST be on for inter-VLAN | "switch's routing table is empty" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **ROAS vs L3 switching** | ROAS = single trunk to external router (hairpin). L3 switch = routing inside the switch (no hairpin) |
| **SVI vs routed port** | SVI = virtual interface for a VLAN (multiple access ports). Routed port = single physical port acting like a router interface |
| **Switchport vs no switchport** | Switchport = L2 (default). `no switchport` = L3 routed port |
| **Native VLAN on switch vs router** | Switch: `switchport trunk native vlan N`. Router ROAS: `encapsulation dot1q N native` OR put IP on physical interface |

## 🔗 How it all connects

```
[PC VLAN20]→[Multilayer SW: SVI VLAN20→routes to SVI VLAN10]→[PC VLAN10]   (no router hairpin)
```

## 🚨 Exam Traps

- **`ip routing` is NOT optional** on a multilayer switch — without it, inter-VLAN routing silently fails
- **SVI does NOT come up just because you configured an IP** — needs the VLAN to exist AND have at least one up access/trunk port AND VLAN not shutdown AND `no shutdown` on the SVI
- **`no switchport` is NOT the same as creating an SVI** — `no switchport` makes a routed *physical* port; SVI is `interface vlan N`
- **Native VLAN frames are NOT tagged** — that's the whole point; misconfigured native VLANs cause frames to land in the wrong VLAN
- **Best practice is NOT to use VLAN 1 as native** — use an unused VLAN to avoid security issues (VLAN hopping)

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Configure routed port on a switch | **`no switchport`** then `ip address` |
| Enable inter-VLAN routing on multilayer switch | **`ip routing`** (global config) |
| SVI shows down/down despite `no shutdown` | **VLAN doesn't exist OR no up port in that VLAN** |
| Two ROAS native-VLAN config options | **`encapsulation dot1q N native`** OR put IP on physical interface |
| Frames leaving native VLAN over trunk | **Untagged** |
| Show routed-port status in `show interfaces status` | **VLAN column says "ROUTED"** |

## ⚡ One-Line Master Recall

**Enable `ip routing` → create SVIs (`interface vlan N` + IP + `no shutdown`) → configure routed uplink with `no switchport` → multilayer switch routes between VLANs without a hairpin to the router.**

## ➕ EXTRA — not in video, but on the exam

- **VLAN 1 limitations** — can't be deleted, often used as default native; v1.1 expects you to know to change native off VLAN 1.
- **Voice VLAN** — special case where access port carries data VLAN untagged + voice VLAN tagged via CDP/LLDP. Covered Day 46 lab.
- **Extended VLAN range** (1006–4094) — requires VTP transparent or VTPv3; older switches may reject.

## 🧾 Recap

- **L3 switch + SVIs = preferred inter-VLAN routing** in modern LANs (no hairpin).
- **Don't forget `ip routing`** — silent killer of inter-VLAN labs.
- **SVI up/up requires four conditions**: VLAN exists, ≥1 active port in VLAN, VLAN not shut, SVI not shut.
- **Native VLAN frames are untagged** — best practice is to set native to an unused VLAN.
- If you can configure SVI-based inter-VLAN routing from blank in 5 minutes, move to Day 19.

---
Source: Jeremy's IT Lab — Day 18 — https://www.youtube.com/watch?v=OkPB028l2eE
