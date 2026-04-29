---
title: "Free CCNA | CDP & LLDP | Day 36 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-36
source_transcript: "[[../jeremy-it-videos/073-cdp-lldp-day-36]]"
source_url: https://www.youtube.com/watch?v=_hnMZBzXRRk
created: 2026-04-28
tags: [ccna, cheat-sheet, day-36]
---

# Day 36 — CDP & LLDP

## 🎯 What this video covers

Maps to v1.1 blueprint **2.3 Configure and verify Layer 2 discovery protocols (CDP and LLDP)**. Both share neighbor info (hostname, port, model, IP) at Layer 2 — CDP is Cisco-only and on-by-default, LLDP is industry-standard and off-by-default.

## 🧠 Core Concept

**Layer-2 discovery protocols share device info with directly connected neighbors only — never forwarded past one hop.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **CDP** | Cisco proprietary L2 discovery | All Cisco devices, on by default | "Cisco-only", "default on" |
| **LLDP** | Industry-standard (802.1AB) L2 discovery | Most vendors, off by default on Cisco | "industry standard", "must enable" |
| **CDP MAC** | Multicast `0100.0CCC.CCCC` | Frame dest | "0CCC.CCCC" |
| **LLDP MAC** | Multicast `0180.C200.000E` | Frame dest | "0180.C200.000E" |
| **CDP timer** | Send interval — default **60s** | Per-device config | "60 seconds default" |
| **CDP holdtime** | Drop neighbor after — **180s** | Per-device config | "180 seconds default" |
| **LLDP timer** | Default **30s** | Per-device config | "30 seconds default" |
| **LLDP holdtime** | Default **120s** | Per-device config | "120 seconds default" |
| **VTP info via CDP** | CDP-only — LLDP can't | `show cdp neighbors detail` | "VTP — CDP only" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **CDP vs LLDP** | CDP = Cisco-only, default ON. LLDP = standard, default OFF (on Cisco) |
| **CDP enable vs LLDP transmit/receive** | CDP: one command (`cdp enable`). LLDP: separate `lldp transmit` and `lldp receive` |
| **`show cdp neighbors` vs detail** | `neighbors` = summary. `detail` = adds IP, OS version, VTP info |
| **Local interface vs Port ID** | Local = on THIS device. Port ID = on the **neighbor** |
| **CDP "S" vs LLDP "B"** | CDP code S = switch. LLDP code B = bridge (= switch) |

## 🔗 How it all connects

```
Device A → multicast L2 frame (CDP or LLDP) → Device B (directly connected only) → updates neighbor table
                                              ↓
                                       NOT forwarded onward
```

## 🚨 Exam Traps

- **CDP/LLDP are NOT** routed — they don't use IP addresses; only directly connected neighbors see them
- **LLDP is NOT** enabled by default on Cisco — must `lldp run` and enable per-interface
- **LLDP capability "S" does NOT** exist — switches show as **B (Bridge)**
- **`show cdp neighbors` does NOT** show the neighbor's IP or OS version — that needs **`detail`**
- **VTP info is NOT** visible via LLDP — Cisco-proprietary, CDP-only
- **CDP holdtime is NOT** 60 — that's the **timer**. Holdtime is **180**

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Default CDP timer / holdtime | **60s / 180s** |
| Default LLDP timer / holdtime | **30s / 120s** |
| Show CDP version + timers | **`show cdp`** |
| Show CDP neighbors with IP + OS version | **`show cdp neighbors detail`** |
| Enable CDP globally / disable globally | **`cdp run` / `no cdp run`** |
| Enable LLDP globally | **`lldp run`** |
| Enable LLDP send + receive on one interface | **`lldp transmit` AND `lldp receive`** |
| LLDP capability code for switch | **B (Bridge)** |
| Multilayer switch in CDP capabilities | **R, S** |
| Multilayer switch in LLDP capabilities | **B, R** |
| Protocol that shows VTP info | **CDP only** |

## ⚡ One-Line Master Recall

**CDP = Cisco, on, 60/180. LLDP = standard, off, 30/120, separate Tx + Rx.**

## ➕ EXTRA — not in video, but on the exam

- **Disable CDP per interface** — `no cdp enable` (security best practice on edge ports). Some shops disable globally with `no cdp run`.
- **CDP/LLDP as a security risk** — leak hostname, IP, model — disable on untrusted ports/links to outside networks.
- **PoE info via CDP/LLDP** — switches negotiate power class with PDs (IP phones, APs) using CDP-power TLV or LLDP-MED. v1.1 1.1.h.
- **`show cdp interface`** vs **`show cdp neighbors`** — interface shows config (timers, encapsulation); neighbors shows discovered devices.

## 🧾 Recap

- Both are **Layer-2 discovery** — share hostname, IP, port, model, capability with **directly connected** neighbors only.
- **CDP**: Cisco-only, on by default, multicast `0100.0CCC.CCCC`, **60/180**.
- **LLDP**: 802.1AB standard, off by default, multicast `0180.C200.000E`, **30/120**, needs separate Tx + Rx.
- Use `show cdp/lldp neighbors [detail]` to inventory the LAN without a diagram.
- If you can recall all four timers + both MACs + both capability code-sets, you're set.

---
Source: Jeremy's IT Lab — Day 36 — https://www.youtube.com/watch?v=_hnMZBzXRRk
