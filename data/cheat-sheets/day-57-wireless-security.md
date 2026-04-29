---
title: "Free CCNA | Wireless Security | Day 57 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-57
source_transcript: "[[../jeremy-it-videos/115-wireless-security-day-57]]"
source_url: https://www.youtube.com/watch?v=wHXKo9So5y8
created: 2026-04-28
tags: [ccna, cheat-sheet, day-57]
---

# Day 57 — Wireless Security (WPA / WPA2 / WPA3)

## 🎯 What this video covers

Maps to v1.1 blueprint **5.9 WPA/WPA2/WPA3** (and 1.11.d encryption). Three pillars: authentication (who), encryption (privacy), integrity (MIC). WPA3 is the modern target.

## 🧠 Core Concept

**Three pillars: Authentication + Encryption + Integrity. WPA = TKIP (legacy), WPA2 = CCMP (AES), WPA3 = GCMP + SAE. Each WPA has Personal (PSK) and Enterprise (802.1X/EAP) modes.**

## 🔑 Must-Know Table — WPA Generations

| Standard | Encryption + Integrity | Auth modes | Key advance |
|---|---|---|---|
| **WPA** | **TKIP** (RC4-based, fixed WEP) | PSK / 802.1X | Patched WEP without new HW |
| **WPA2** | **CCMP** (AES + CBC-MAC) | PSK / 802.1X | True AES — most common today |
| **WPA3** | **GCMP** (AES + GMAC) | SAE / 802.1X | Forward secrecy, mandatory PMF |

## 🔑 Must-Know Table — 802.1X / EAP Methods

| Method | Server cert | Client cert | Notes |
|---|---|---|---|
| **LEAP** | No | No | Cisco legacy, vulnerable |
| **EAP-FAST** | PAC | No | Cisco, builds TLS tunnel via PAC |
| **PEAP** | **Yes** | No | Server cert → TLS tunnel → MS-CHAP for client |
| **EAP-TLS** | **Yes** | **Yes** | Most secure, hardest to deploy |

| 802.1X Role | Wireless equivalent |
|---|---|
| **Supplicant** | Wireless client |
| **Authenticator** | AP / WLC |
| **Authentication server** | RADIUS server |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **PSK (Personal) vs 802.1X (Enterprise)** | Personal: shared password (home/SOHO). Enterprise: per-user creds via RADIUS |
| **TKIP vs CCMP vs GCMP** | TKIP patches WEP (RC4). CCMP = AES counter mode. GCMP = AES counter + faster (WPA3) |
| **PEAP vs EAP-TLS** | PEAP = server cert only (easy). EAP-TLS = both certs (most secure, harder) |
| **WEP vs WPA** | WEP is broken — never use. WPA = first WPA cert, also legacy |
| **CBC-MAC vs GMAC** | Both are MIC algorithms. GMAC is faster, used in WPA3 |

## 🔗 How it all connects

```
Client → AP/WLC (authenticator) → RADIUS (auth server) — 802.1X+EAP — verify identity
       → encryption key derived → CCMP/GCMP encrypts frames + MIC ensures integrity
```

## 🚨 Exam Traps

- **WEP is NOT secure regardless of key length** — 64-bit, 128-bit, all crackable
- **TKIP is NOT modern** — temporary fix, used in original WPA only
- **PEAP does NOT require a client certificate** — only server. EAP-TLS requires both
- **GCMP is NOT in WPA2** — WPA2 uses **CCMP**, WPA3 uses GCMP
- **SAE is NOT in WPA2** — SAE replaced PSK 4-way handshake **only in WPA3**
- **Open authentication is NOT the same as no security** — it just means anyone associates; encryption + portal can still gate access

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Most secure EAP method | **EAP-TLS** (certs on both sides) |
| WPA2 encryption | **CCMP** (AES) |
| WPA3 encryption | **GCMP** (AES + GMAC) |
| 802.1X three roles | **Supplicant, Authenticator, Authentication server** |
| WPA3 feature replacing PSK 4-way handshake | **SAE** |
| Certificate on **server only** | **PEAP** |
| Original 802.11 auth options | **Open + WEP** |
| Personal mode auth method | **PSK** (pre-shared key) |

## ⚡ One-Line Master Recall

**WPA2 = CCMP/AES, WPA3 = GCMP + SAE + mandatory PMF + forward secrecy. Personal = PSK, Enterprise = 802.1X (sup/auth/AS) with EAP-TLS most secure.**

## ➕ EXTRA — not in video, but on the exam

- **PMF (Protected Management Frames)** — protects mgmt frames (deauth, disassoc) from spoofing. Optional WPA2, **mandatory WPA3**.
- **Forward secrecy** — even if attacker captures encrypted frames AND cracks the key later, past sessions stay safe. WPA3 feature.
- **Captive portal** — Open-auth + web-based login (Starbucks-style). Common in guest SSIDs.
- **WPA3-Enterprise 192-bit mode** — for highly sensitive environments. Uses larger keys and GCMP-256.

## 🧾 Recap

- **WPA = TKIP, WPA2 = CCMP/AES, WPA3 = GCMP/AES + SAE.**
- Personal mode uses **PSK**. Enterprise mode uses **802.1X + EAP** with RADIUS.
- **EAP-TLS** = certs on both client and server (most secure). **PEAP** = server cert only.
- 802.1X roles: **Supplicant → Authenticator → Authentication server**.
- If you can map every WPA generation to its encryption/integrity protocol, move on to Day 58.

---
Source: Jeremy's IT Lab — Day 57 — https://www.youtube.com/watch?v=wHXKo9So5y8
