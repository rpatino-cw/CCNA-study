---
title: "Free CCNA | VLANs (Part 1) | Day 16 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-16
source_transcript: "[[../jeremy-it-videos/029-vlans-part-1-day-16]]"
source_url: https://www.youtube.com/watch?v=cjFzOnm6u1g
created: 2026-04-28
tags: [ccna, cheat-sheet, day-16]
---

# Day 16 — VLANs (Part 1)

## 🎯 What this video covers

Maps to v1.1 blueprint **2.1 Configure and verify VLANs (normal range) spanning multiple switches** — focusing on access ports here. Foundation for trunking (Day 17), inter-VLAN routing, and STP per-VLAN behavior. Also touches **2.2** access ports and **1.13** broadcast domains.

## 🧠 Core Concept

**A VLAN is a logically separate Layer 2 broadcast domain on the same physical switch — one VLAN = one LAN.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **LAN** | Single Layer-2 broadcast domain | Logical grouping | "broadcast frame reaches all members" |
| **Broadcast domain** | Devices a broadcast frame reaches | Layer 2 | "FF:FF:FF:FF:FF:FF reaches all" |
| **VLAN** | Logical sub-LAN inside a switch | Switch config | "split one switch into many LANs" |
| **Access port** | Belongs to ONE VLAN, connects end host | Switch interface | "untagged", "single VLAN" |
| **Default VLAN** | VLAN 1 — all ports start here | Cisco default | "every port until configured" |
| **Reserved VLANs** | 1, 1002–1005 — cannot delete | Switch DB | "FDDI/token ring", "default" |
| **Inter-VLAN routing** | Sending traffic between VLANs | Router or L3 switch | "must go through router" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **LAN vs subnet** | LAN = Layer 2 broadcast domain. Subnet = Layer 3 IP range. Should align 1:1 |
| **Access port vs trunk port** | Access = 1 VLAN, untagged. Trunk = many VLANs, tagged (Day 17) |
| **VLAN 1 (default) vs unconfigured** | Same thing — every port starts in VLAN 1 |
| **Switch vs router for VLAN crossing** | Switch refuses cross-VLAN forwarding. Router routes between subnets |

## 🔗 How it all connects

```
PC (VLAN10) → access port → switch (filters by VLAN) → trunk → router → trunk back → access port → PC (VLAN20)
```

## 🚨 Exam Traps

- **VLAN is NOT** a physical thing — it's a logical Layer-2 separator
- **A switch is NOT** routing between VLANs — that needs a router or L3 switch
- **VLAN 1 is NOT** deletable — neither are 1002–1005
- **Assigning a port to a non-existent VLAN is NOT** an error — switch **auto-creates** the VLAN
- **Subnetting alone does NOT** isolate broadcast — broadcasts still flood the whole switch unless VLANs are used
- **`switchport mode access` is NOT** the same as `switchport access vlan X` — first sets the mode, second assigns the VLAN

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| What is a LAN | **Single broadcast domain** |
| Default VLAN on every port | **VLAN 1** |
| Assign port to VLAN that doesn't exist yet | **Switch creates the VLAN automatically** |
| Command to view VLAN-port mapping | **`show vlan brief`** |
| Set port as access for VLAN 10 | **`switchport mode access` + `switchport access vlan 10`** |
| To talk between VLANs you need | **A router (or L3 switch)** |
| Total VLANs after creating 10/20/30 | **8** (5 default + 3 created) |
| Devices receiving a broadcast in VLAN 20 | **Only ports in VLAN 20 + that VLAN's router interface** |

## ⚡ One-Line Master Recall

**One VLAN = one broadcast domain = one subnet — switch separates, router connects.**

## ➕ EXTRA — not in video, but on the exam

- **Voice VLAN** — special access-port companion: `switchport voice vlan X`. Phone tags voice frames, untagged data goes to data VLAN. v1.1 2.2.
- **VLAN ranges** — Normal: 1–1005. Extended: 1006–4094 (needs VTP transparent or v3). v1.1 says "normal range," but exam may test boundary.
- **Native VLAN** — trunk concept (Day 17), but related: untagged frames on a trunk land in the native VLAN. Default = 1; mismatch is a security/CDP-warning issue.
- **VLAN database vs vlan.dat** — VLAN config persists in `vlan.dat` on flash, NOT just `running-config`. `write erase` alone doesn't wipe VLANs — must also `delete vlan.dat`.

## 🧾 Recap

- A **VLAN** logically separates one switch into multiple Layer-2 broadcast domains.
- **Access ports** carry exactly one VLAN; default is VLAN 1 until configured.
- Switch **auto-creates** VLANs when assigning a port to one that doesn't exist.
- Switches do **NOT** forward traffic between VLANs — a router (or L3 switch) does.
- VLANs 1, 1002–1005 are **reserved** and undeletable.
- If you can answer 6/8 stems above without peeking, move to Day 17 (VLANs Part 2 / Trunking).

---
Source: Jeremy's IT Lab — Day 16 — https://www.youtube.com/watch?v=cjFzOnm6u1g
