---
title: "Free CCNA | Wireless Configuration | Day 58 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-58
source_transcript: "[[../jeremy-it-videos/116-wireless-configuration-day-58]]"
source_url: https://www.youtube.com/watch?v=r9o6GFI87go
created: 2026-04-28
tags: [ccna, cheat-sheet, day-58]
---

# Day 58 — Wireless Configuration (WLC GUI)

## 🎯 What this video covers

Maps to v1.1 blueprint **2.9 Configure wireless LAN access for client connectivity using GUI only** + **5.10 Configure WLAN using WPA2 PSK using GUI**. Also touches **2.7/2.8** WLC components and AP modes. All exam config done via GUI, not CLI.

## 🧠 Core Concept

**A WLC controls APs over CAPWAP tunnels; WLANs are mapped to VLANs via dynamic interfaces, secured with WPA2-PSK on the Layer 2 security tab.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **WLC** | Central controller for APs (split-MAC) | Wired network, mgmt VLAN | "wireless LAN controller" |
| **AP (lightweight)** | Forwards client traffic via CAPWAP to WLC | LAN, mgmt VLAN | "joins WLC" |
| **CAPWAP tunnel** | Tunnel AP↔WLC for control + data | Between AP and WLC | "split-MAC architecture" |
| **WLAN / SSID** | Wireless network name visible to clients | WLC config | "broadcast SSID" |
| **WLC port** | **Physical** interface on WLC | RJ45 / SFP | "physical port" |
| **WLC interface** | **Logical** interface inside WLC | Like SVI | "logical, like SVI" |
| **Management interface** | WLC's mgmt IP, CAPWAP termination | Logical | "GUI access here" |
| **Dynamic interface** | Maps WLAN→VLAN | Logical | "internal/guest interface" |
| **Virtual interface** | Used for DHCP relay, web auth | Logical | "client-facing services" |
| **Service port** | Out-of-band mgmt — single VLAN, access port | Physical | "out-of-band" |
| **Distribution system port** | Standard data port — usually trunk, supports LAG | Physical | "LAG to switch" |
| **Redundancy port** | Connects two WLCs for HA pair | Physical | "HA active/standby" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Port vs Interface (WLC)** | Port = physical RJ45/SFP. Interface = logical inside WLC |
| **WLAN vs VLAN** | WLAN = wireless SSID. VLAN = wired L2 segment. Map via dynamic interface |
| **WPA Enterprise vs Personal** | Enterprise = 802.1X (RADIUS). Personal = PSK (CCNA: PSK only) |
| **L2 security vs L3 security** | L2 = WPA2-PSK/Enterprise. L3 = web auth/passthrough |
| **WLC LAG vs switch LAG** | WLC supports **only static** LAG — switch side must be `channel-group X mode on` |

## 🔗 How it all connects

```
Wireless client → AP → CAPWAP tunnel → WLC dynamic interface (VLAN map) → trunk → switch → wired network
```

## 🚨 Exam Traps

- **WLC LAG does NOT** support PAgP or LACP — **static only**, switch side must be `mode on`
- **WLC GUI is NOT** reachable via console port — must connect over the network (HTTP/HTTPS) to mgmt IP
- **For CCNA, Layer 2 security is NOT** Enterprise/802.1X — it's **WPA2-PSK** (5.10)
- **Service port is NOT** trunk-capable — single VLAN, access port only
- **Dynamic interface is NOT** the management interface — different roles
- **`show vlan brief` is NOT** a WLC command — WLC uses GUI; CLI commands differ from IOS

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Map a WLAN to a VLAN | **Dynamic interface** |
| Out-of-band management port | **Service port** |
| Pair two WLCs for HA | **Redundancy port** |
| LAG mode used between WLC and switch | **Static (`channel-group X mode on`)** |
| QoS for voice traffic | **Platinum** |
| QoS for video traffic | **Gold** |
| QoS default | **Silver (best effort)** |
| QoS for background traffic | **Bronze** |
| Web authentication is which layer | **Layer 3** |
| WPA2-PSK is which layer | **Layer 2** |
| DHCP option used to point AP at WLC | **Option 43** |
| Min PSK length (ASCII) | **8 characters** |
| AP gets power from | **PoE (no power cable needed)** |

## ⚡ One-Line Master Recall

**WLC: physical ports + logical interfaces. WLANs map to VLANs via dynamic interfaces. WPA2-PSK on L2 security tab. Static LAG only.**

## ➕ EXTRA — not in video, but on the exam

- **AP modes** (v1.1 2.7) — Local (default), FlexConnect, Monitor, Sniffer, Rogue Detector, Bridge, SE-Connect. Local is exam default.
- **WLC discovery options** — DHCP option 43, DNS (`CISCO-CAPWAP-CONTROLLER.<domain>`), broadcast on local subnet, manual.
- **CAPWAP ports** — Control = **UDP 5246**, Data = **UDP 5247**. Likely tested.
- **WPA3 vs WPA2** — WPA3 uses SAE (replaces 4-way handshake), forward secrecy. v1.1 mentions but exam still expects WPA2 config.
- **RF auto-tune** — WLC's RRM (Radio Resource Management) handles channel + power; analogous to "auto-RF" in setup wizard.

## 🧾 Recap

- WLC + lightweight APs use **CAPWAP tunnels** (control 5246, data 5247).
- **Physical ports** carry traffic; **logical interfaces** (mgmt, virtual, dynamic, service) carry roles.
- **Dynamic interface** is the bridge between a WLAN (SSID) and a wired VLAN.
- For CCNA, secure WLAN with **WPA2-PSK (L2 tab)**, GUI only — no CLI required.
- WLC LAG = **static only**; switch side needs `channel-group X mode on`.
- QoS: **Platinum (voice) > Gold (video) > Silver (default) > Bronze (background)**.
- If you can navigate the WLC GUI tabs (WLAN → Security → L2 → WPA2 PSK), move to Day 59.

---
Source: Jeremy's IT Lab — Day 58 — https://www.youtube.com/watch?v=r9o6GFI87go
