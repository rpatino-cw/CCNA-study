---
title: "Free CCNA | Wireless Architectures | Day 56 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-56
source_transcript: "[[../jeremy-it-videos/114-wireless-architectures-day-56]]"
source_url: https://www.youtube.com/watch?v=uX1h0F6wpBY
created: 2026-04-28
tags: [ccna, cheat-sheet, day-56]
---

# Day 56 — Wireless Architectures (AP Modes, WLC, CAPWAP)

## 🎯 What this video covers

Maps to v1.1 **2.6 wireless architectures + AP modes** (also 1.1.d APs + 1.1.e WLCs). Three AP deployment models, split-MAC, CAPWAP tunnels, lightweight AP modes, four WLC deployment options.

## 🧠 Core Concept

**Lightweight APs talk to a Wireless LAN Controller via CAPWAP tunnels (control + data) — the WLC centrally manages config, RF, security, and roaming. Autonomous APs go solo; cloud-based (Meraki) splits the difference.**

## 🔑 Must-Know Table

| AP Type | Managed how? | Switch port type | Notes |
|---|---|---|---|
| **Autonomous** | Per-device CLI/GUI | **Trunk** (carries each SSID's VLAN) | Local-MAC; no WLC; small networks |
| **Lightweight** | Central **WLC** via CAPWAP | **Access** (WLC has the trunk) | Split-MAC; preferred for enterprise |
| **Cloud-based (Meraki)** | Cloud dashboard | Trunk (autonomous-like) | Mgmt to cloud; data stays local |

| CAPWAP Tunnel | Port | Purpose | Encrypted? |
|---|---|---|---|
| **Control** | UDP **5246** | Config, RF, mgmt | **Yes** by default |
| **Data** | UDP **5247** | Wireless client traffic | No (DTLS optional) |

| Lightweight AP Mode | Function |
|---|---|
| **Local** | Default — offers BSS for clients |
| **FlexConnect** | Offers BSS + falls back to local switching if WLC unreachable |
| **Sniffer** | Captures 802.11 frames, sends to Wireshark |
| **Monitor** | Listens for rogue devices (no BSS) |
| **Rogue detector** | Listens on **wired** side to spot rogue MACs |
| **SE-Connect** | Spectrum analysis on all channels |
| **Bridge / Mesh** | Site-to-site dedicated bridge |
| **Flex+Bridge** | Bridge with FlexConnect failover |

| WLC Deployment | Where WLC lives | Max APs (approx) |
|---|---|---|
| **Unified** | Hardware appliance, central | **~6000** |
| **Cloud-based WLC** | VM in private cloud DC | ~3000 |
| **Embedded** | Inside a switch | ~200 |
| **Mobility Express** | Inside an AP | ~100 |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Autonomous vs Lightweight** | Autonomous = self-contained per AP (trunk port). Lightweight = WLC-managed (access port) |
| **Local vs FlexConnect** | Both offer BSS. FlexConnect adds local-switch fallback if WLC dies |
| **Monitor vs Rogue detector** | Monitor uses radio (wireless). Rogue detector uses **wired** ARP |
| **CAPWAP vs LWAPP** | CAPWAP is the modern successor to LWAPP |
| **Cloud-based AP (Meraki) vs Cloud-based WLC** | Meraki = autonomous-like APs managed by cloud. Cloud WLC = lightweight APs + WLC running as VM |
| **Probe vs Beacon** | Active scan: client sends probes. Passive scan: client listens for AP beacons |

## 🔗 How it all connects

```
[Client] —assoc→ [Lightweight AP] ⇆ CAPWAP control 5246 + data 5247 ⇆ [WLC] → wired LAN
```

## 🚨 Exam Traps

- **Autonomous AP is NOT** plugged into an access port — needs a **trunk** (multiple VLANs)
- **Lightweight AP is NOT** plugged into a trunk — uses an access port; the WLC has the trunk
- **CAPWAP data tunnel is NOT** encrypted by default — only control is (DTLS optional for data)
- **Meraki "cloud" architecture is NOT** the same as "cloud-based WLC" — different deployment models
- **Mesh/bridge mode is NOT** for clients — it's site-to-site backhaul
- **Rogue detector mode does NOT** use the radio — listens on wired ARP

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Protocol between lightweight AP and WLC | **CAPWAP** |
| CAPWAP control port | **UDP 5246** |
| CAPWAP data port | **UDP 5247** |
| Default mode of a lightweight AP | **Local** |
| Mode that survives WLC outage | **FlexConnect** |
| Max APs on a unified (hardware) WLC | **~6000** |
| AP type that needs a trunk port | **Autonomous** |
| AP type that uses an access port | **Lightweight** |
| Centrally-managed APs (pick 2) | **Lightweight, Cloud-based** |
| Active scan messages | **Probe request / Probe response** |
| Passive scan listens for | **Beacon frames** |
| Three 802.11 frame types | **Management, Control, Data** |
| Authentication type for WLC↔AP | **X.509 certificates** |

## ⚡ One-Line Master Recall

**Lightweight AP + WLC + CAPWAP (5246 control / 5247 data) = split-MAC; access port to AP, trunk to WLC; default mode Local, FlexConnect for failover; Meraki = cloud-managed autonomous-like APs.**

## ➕ EXTRA — not in video, but on the exam

- **Cisco DNA Center** — Centralizes management beyond the WLC (covered later, fits 6.x).
- **WPA3 / 802.11ax (Wi-Fi 6)** — Modern security/standard. WPA2 still common; WEP/WPA1 are deprecated.
- **AP discovery order** — Primary > Secondary > Tertiary > Master > DHCP option 43 > DNS.
- **Roaming** — Intra-controller (same WLC) is faster than inter-controller (between WLCs).

## 🧾 Recap

- **Three AP types: Autonomous (trunk + local), Lightweight (access + WLC via CAPWAP), Cloud-based (Meraki).**
- **CAPWAP tunnels: control 5246 (encrypted) + data 5247 (DTLS optional).**
- **Default AP mode = Local. FlexConnect = local-switch fallback. Sniffer/Monitor/Rogue/SE-Connect/Bridge/Flex+Bridge for special use.**
- **WLC deployments scale: Mobility Express (~100) → Embedded (~200) → Cloud (~3000) → Unified (~6000).**
- If you can pick the right AP mode + WLC deployment for a scenario, move to Day 57.

---
Source: Jeremy's IT Lab — Day 56 — https://www.youtube.com/watch?v=uX1h0F6wpBY
