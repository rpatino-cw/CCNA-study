---
title: "Free CCNA | Intro to the CLI | Day 4 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-04
source_transcript: "[[../jeremy-it-videos/008-intro-to-the-cli-day-4]]"
source_url: https://www.youtube.com/watch?v=IYbtai7Nu2g
created: 2026-04-28
tags: [ccna, cheat-sheet, day-04]
---

# Day 4 — Intro to the Cisco IOS CLI

## 🎯 What this video covers

Maps to v1.1 blueprint **2.8 device management access (console, password)** + **5.3 local password protection**. First hands-on lesson — console cable, terminal emulator, IOS modes, password protection, save config.

## 🧠 Core Concept

**The Cisco IOS CLI has three modes — user EXEC, privileged EXEC, global config — and two config files (running vs startup) that you must protect with `enable secret`.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **Rollover cable** | RJ45-to-DB9 console cable, pins reversed (1↔8, 2↔7…) | Laptop ↔ console port | "RJ45 console port" |
| **User EXEC mode** | View-only, very limited | Prompt: `Router>` | `>` prompt |
| **Privileged EXEC mode** | Full view + reload + save | Prompt: `Router#` | `#` prompt, "enable" |
| **Global config mode** | Make changes to config | Prompt: `Router(config)#` | "configure terminal" |
| **enable password** | Plain text or weak Type 7 | running-config | "easily cracked" |
| **enable secret** | MD5 hash (Type 5), always encrypted | running-config | "most secure" |
| **service password-encryption** | Type 7 obfuscation of other passwords | global config | "weak", "reversible" |
| **running-config** | Active config in RAM | RAM | "current configuration" |
| **startup-config** | Loaded on reboot, in NVRAM | NVRAM | "after reload" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **enable password vs enable secret** | Both protect priv-EXEC. If both set, **secret wins**. Secret = MD5 (Type 5), password = clear or Type 7 |
| **service password-encryption vs enable secret** | service-PE = Type 7 (reversible). enable secret = Type 5 (one-way hash). service-PE has **no effect** on enable secret |
| **running-config vs startup-config** | Running = RAM (live). Startup = NVRAM (loaded on boot). Save with `write` / `copy run start` |
| **CLI vs GUI** | CLI = command line, what engineers prefer. GUI = ASDM etc., not on the exam |

## 🔗 How it all connects

```
[PC + rollover cable] → [console] → User> --enable--> Priv# --conf t--> (config)# --[enable secret]--> [write] → startup-config
```

## 🚨 Exam Traps

- **enable password is NOT the most secure** — pick `enable secret`
- **service password-encryption is NOT MD5** — it's weak Type 7
- **Disabling service password-encryption is NOT** decrypting existing passwords — they stay encrypted
- **Console default = 9600 8 N 1, no flow control** — these are NOT configurable for the test
- **Rollover cable is NOT** a crossover cable — different pinout, different purpose
- **`do` is NOT** required from priv-EXEC — only used inside config mode to run show commands

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Connect to RJ45 console port | **Rollover cable** |
| Most secure priv-EXEC password | **enable secret** |
| Save running to startup (3 ways) | `write` / `write memory` / `copy run start` |
| `>` prompt means | User EXEC |
| `#` prompt means | Priv EXEC |
| `(config)#` means | Global config |
| Both `enable password` and `enable secret` set | **Secret wins** |
| Console default speed | **9600 bps** |

## ⚡ One-Line Master Recall

**enable → conf t → enable secret CCNA → exit → write — modes go User→Priv→Config; secret beats password every time.**

## ➕ EXTRA — not in video, but on the exam

- **Type 8 / Type 9 passwords** — PBKDF2 / Scrypt. Stronger than Type 5. Configured with `enable algorithm-type sha256|scrypt secret <pwd>`.
- **Line console 0 password** — protect physical console: `line console 0` → `password X` → `login`. Day 4 only does enable side.
- **Privilege levels (0-15)** — 1 = user EXEC, 15 = priv EXEC. v1.1 may probe.
- **`username … secret`** — local AAA, used with `login local` on console/vty. Day 4 doesn't introduce this.

## 🧾 Recap

- Three modes: **User (`>`) → Privileged (`#`) → Global Config (`(config)#`)**.
- **`enable secret` > `enable password`.** Always pick secret on the exam.
- **service password-encryption = weak Type 7.** It does **not** affect enable secret.
- **Running-config in RAM, startup-config in NVRAM.** Save with `write` / `copy run start`.
- If you can name the prompt for any 5/8 stems above without peeking, move on to Day 5.

---
Source: Jeremy's IT Lab — Day 4 — https://www.youtube.com/watch?v=IYbtai7Nu2g
