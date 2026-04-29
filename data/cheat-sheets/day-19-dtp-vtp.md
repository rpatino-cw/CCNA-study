---
title: "Free CCNA | DTP/VTP | Day 19 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-19
source_transcript: "[[../jeremy-it-videos/035-dtpvtp-day-19]]"
source_url: https://www.youtube.com/watch?v=JtQV_0Sjszg
created: 2026-04-28
tags: [ccna, cheat-sheet, day-19]
---

# Day 19 — DTP / VTP

## 🎯 What this video covers

Maps to v1.1 blueprint **2.2 (configure trunks, native VLAN)** — DTP is the auto-trunking protocol that decides if a port becomes access or trunk. VTP syncs VLAN databases. Both are off the official topics list but still appear as exam questions and are essential for understanding access vs trunk negotiation.

## 🧠 Core Concept

**DTP auto-negotiates access vs trunk between two Cisco switches. VTP syncs the VLAN database from a server to clients via revision number — a higher revision wins. Both should be disabled in production for security.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **DTP** | Auto-negotiates trunk vs access | Cisco-only, on by default | "dynamic desirable / auto" |
| **dynamic desirable** | Actively tries to form a trunk | Old-switch default | "actively negotiates" |
| **dynamic auto** | Will trunk only if other side initiates | New-switch default | "passive" |
| **switchport nonegotiate** | Disables DTP frames | Trunk-mode interface | "stop sending DTP" |
| **VTP server** | Can add/modify/delete VLANs, advertises | Default mode | "stores VLAN db in NVRAM" |
| **VTP client** | Cannot edit VLANs, syncs to server | Configured per switch | "command rejected" |
| **VTP transparent** | Independent VLAN db, forwards advertisements | Doesn't sync | "doesn't participate" |
| **Revision number** | Tracks freshness of VLAN database | Increments on every change | "highest revision wins" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Dynamic desirable vs Dynamic auto** | Desirable actively tries → trunks with everything except access. Auto is passive → only trunks with desirable or trunk |
| **Access vs Trunk (manual mismatch)** | Manually configuring one side access + other side trunk = misconfig, traffic fails — won't auto-fix |
| **VTP server vs client** | Server can edit + advertise. Client only listens. Both sync to higher revision |
| **VTP transparent vs server** | Transparent has its own VLAN db, doesn't sync, but DOES forward advertisements (same domain) |
| **VTP v1/v2 vs v3** | v1/v2 max 1005 VLANs. v3 supports extended range 1006–4094 |

## 🔗 How it all connects

```
[Server SW1] → [VTP advertisement, rev N+1] → [Client SW2] → [Forwards to SW3] → [SW3 syncs]
```

## 🚨 Exam Traps

- **DTP will NOT** form a trunk with a router or PC — switchport stays access (matters for router-on-a-stick — manually trunk it)
- **Dynamic auto + Dynamic auto = NOT a trunk** — both passive, both stay access
- **Higher VTP revision is NOT** safer — an old switch with revision 50 plugged in can wipe your VLAN database
- **VTP transparent does NOT** sync, but it **does forward** advertisements within the same domain
- **switchport mode trunk does NOT** disable DTP frames — still need `switchport nonegotiate`
- **Manual access disables DTP** automatically; manual trunk does not

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Two new switches, both interfaces dynamic auto | **Access** (no trunk forms) |
| Old spare switch trunks unexpectedly with new switch | Old default = **dynamic desirable** |
| Forward VTP info but don't sync own db | **`vtp mode transparent`** |
| Reset VTP revision to 0 (two ways) | Change to **unused domain** OR **transparent mode** |
| DTP-enabled trunk encapsulation default | **negotiate** (ISL preferred over dot1q if both supported) |
| Disable DTP on a trunk port | **`switchport nonegotiate`** |
| Newer switch DTP default mode | **dynamic auto** |
| Why VTP is dangerous | Old switch with **higher revision** overwrites VLAN db |

## ⚡ One-Line Master Recall

**DTP desirable+anything-but-access = trunk. Auto+auto = access. Manually trunk + nonegotiate kills DTP. VTP server advertises higher-revision VLAN db, clients sync, transparent forwards but stays independent — and that's why a stray old switch can wipe your network.**

## ➕ EXTRA — not in video, but on the exam

- **Native VLAN (2.2.b)** — untagged VLAN on a trunk; mismatched native VLANs at each end cause traffic to leak between VLANs (CDP will warn). Default native = VLAN 1; security best practice = change it.
- **dot1q vs ISL** — dot1q is the modern standard (1-byte tag inserted in frame, native VLAN untagged). ISL is Cisco-legacy (encapsulates whole frame) and not on the v1.1 exam.
- **Best practice** — disable DTP everywhere, manually configure access/trunk, never use VTP server/client.

## 🧾 Recap

- **DTP**: desirable = active, auto = passive, access = disables DTP, trunk = still sends DTP unless `nonegotiate`.
- **Auto + auto = access** (the only "passive pair" that surprises people).
- **VTP modes**: server (default), client (read-only), transparent (independent + forwarder).
- **Higher revision wins** — biggest VTP risk on the exam and in real networks.
- If you can predict the operational mode for any pair from the matrix, move to Day 20.

---
Source: Jeremy's IT Lab — Day 19 — https://www.youtube.com/watch?v=JtQV_0Sjszg
