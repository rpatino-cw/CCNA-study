---
title: "Free CCNA | Wireless Fundamentals | Day 55 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-55
source_transcript: "[[../jeremy-it-videos/113-wireless-fundamentals-day-55]]"
source_url: https://www.youtube.com/watch?v=zuYiktLqNYQ
created: 2026-04-28
tags: [ccna, cheat-sheet, day-55]
---

# Day 55 — Wireless Fundamentals

## 🎯 What this video covers

Maps to v1.1 blueprint **1.1.d (APs)**, **1.11.a (nonoverlapping channels)**, **1.11.b (SSID)**, **1.11.c (RF)**. Establishes the language for every later wireless topic — service sets, channel planning, 802.11 standards.

## 🧠 Core Concept

**Wireless is shared half-duplex (CSMA/CA). 2.4 GHz channels overlap — use 1, 6, 11. 5 GHz channels don't overlap. SSID names the network, BSSID is the AP's MAC. An ESS = multiple BSSs sharing one SSID, enabling roaming.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **AP** | Bridges wireless clients to wired DS | 802.11 | "access point" |
| **SSID** | Human-readable network name | Configured per WLAN | "network name" |
| **BSSID** | MAC address of AP radio | Per BSS | "unique per AP/radio" |
| **BSS** | One AP + its clients | Infrastructure mode | "one AP" |
| **ESS** | Multiple BSSs same SSID, wired-linked | Enables roaming | "roaming", "extended service set" |
| **IBSS / ad hoc** | Two clients direct, no AP | Rare, e.g. AirDrop | "direct, no AP" |
| **MBSS** | Mesh — APs use a backhaul radio | Hard-to-wire spaces | "RAP + MAPs" |
| **DS (distribution system)** | The wired network upstream | VLAN-mapped | "wired infrastructure" |
| **CSMA/CA** | Avoids collisions before they happen | 802.11 MAC | "collision avoidance" |
| **Nonoverlapping (2.4 GHz)** | Channels 1, 6, 11 | North America | "honeycomb" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **2.4 GHz vs 5 GHz** | 2.4 = longer range, more obstacles penetrated, more interference (only 3 nonoverlapping). 5 = shorter range, more nonoverlapping channels, less interference |
| **CSMA/CA vs CSMA/CD** | CA = wireless, avoids collisions (listen-then-send with backoff). CD = wired, detects them after the fact |
| **SSID vs BSSID** | SSID = name (can be shared). BSSID = MAC (must be unique per AP radio) |
| **BSS vs ESS** | BSS = one AP. ESS = multiple BSSs same SSID, wired-connected, enables roaming |
| **BSS vs BSA** | BSS = group of devices. BSA = physical coverage area |
| **Repeater vs Workgroup Bridge vs Outdoor Bridge** | Repeater extends BSS coverage. WGB lets wired clients join wireless. Outdoor bridge connects buildings over long distance |

## 🔗 How it all connects

```
[Wired DS / VLAN 10] → [AP w/ BSSID-A on ch 1] ←→ [Client]
                    → [AP w/ BSSID-B on ch 6] ←→ [Client]   ← Same SSID = ESS
                    → [AP w/ BSSID-C on ch 11] ←→ [Client]
```

## 🚨 Exam Traps

- **2.4 GHz nonoverlapping channels are 1, 6, 11** — not 1-2-3 or 1-5-10
- **Each BSS in an ESS uses the SAME SSID but a UNIQUE BSSID** — common trap
- **Adjacent APs in an ESS use DIFFERENT channels** — overlapping channels cause interference
- **CSMA/CA does NOT detect collisions** — it avoids them; that's CD's job (wired)
- **Wireless is half-duplex** — even with the latest standards, the medium is shared
- **BSS coverage areas should overlap 10–15%** — for seamless roaming in an ESS

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Nonoverlapping 2.4 GHz channels (NA) | **1, 6, 11** |
| Two main Wi-Fi bands | **2.4 GHz and 5 GHz** |
| Roaming requires this service set | **ESS** |
| Each AP needs unique | **BSSID** |
| SSIDs across an ESS should be | **The same** |
| Wireless collision strategy | **CSMA/CA** |
| Long-distance building-to-building wireless | **Outdoor bridge** |
| Wired clients joining wireless network | **Workgroup bridge (WGB)** |
| Mesh root AP that's wired | **RAP** |
| Wi-Fi 6 IEEE standard | **802.11ax** |

## ⚡ One-Line Master Recall

**APs bridge wireless to the wired DS. 2.4 GHz uses overlapping channels (pick 1/6/11), 5 GHz doesn't. Same SSID across multiple BSSIDs = ESS = roaming. CSMA/CA avoids collisions, half-duplex only.**

## ➕ EXTRA — not in video, but on the exam

- **WLC (1.1.e)** — Wireless LAN Controller. Centralizes config, security, RF management for many APs. Day 56 covers architectures (autonomous, lightweight/CAPWAP, cloud, FlexConnect).
- **Wireless security (5.10)** — WPA2/WPA3, AES/CCMP encryption, 802.1X authentication, PSK. v1.1 testable.
- **6 GHz band (Wi-Fi 6E / Wi-Fi 7)** — newer standards expanded to 6 GHz; v1.1 may name-drop.
- **Antennas** — omnidirectional vs directional vs Yagi; relevant for outdoor bridges.

## 🧾 Recap

- **AP bridges wireless ↔ wired DS** (often mapped to a VLAN).
- **2.4 GHz: pick 1, 6, 11. 5 GHz: most channels are nonoverlapping.**
- **SSID = name (shared in ESS). BSSID = MAC (unique per radio).**
- **CSMA/CA avoids collisions** — wireless is half-duplex.
- **ESS = roaming**; adjacent APs need different channels and 10–15% coverage overlap.
- If you can name 1/6/11 and the SSID/BSSID/ESS distinction, move to Day 56.

---
Source: Jeremy's IT Lab — Day 55 — https://www.youtube.com/watch?v=zuYiktLqNYQ
