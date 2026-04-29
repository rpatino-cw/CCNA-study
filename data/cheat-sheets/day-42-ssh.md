---
title: "Free CCNA | SSH | Day 42 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-42
source_transcript: "[[../jeremy-it-videos/085-ssh-day-42]]"
source_url: https://www.youtube.com/watch?v=AvgYqI2qSD4
created: 2026-04-28
tags: [ccna, cheat-sheet, day-42]
---

# Day 42 — SSH

## 🎯 What this video covers

Maps to v1.1 blueprint **4.8 Configure network devices for remote access using SSH** plus **2.8 management access** (console line, VTY lines, Telnet vs SSH, L2 switch management IP). Includes RSA key generation, version 2 enforcement, and ACL-restricted VTY access.

## 🧠 Core Concept

**SSH (TCP 22) replaces Telnet (TCP 23) by encrypting the session — and on Cisco it requires a hostname, domain name, and RSA key pair before it works.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **SSH** | Encrypted remote CLI access | TCP 22 | "secure", "encrypted" |
| **Telnet** | Plaintext remote CLI access | TCP 23 | "plain text", "unencrypted" |
| **Console line** | Local CLI port (`line console 0`) | One line only | "physical port", "no password by default" |
| **VTY lines** | Virtual terminal lines (`line vty 0 15`) | 16 lines | "Telnet/SSH login" |
| **L2 switch mgmt IP** | SVI in mgmt VLAN + default-gateway | `interface vlan X` + `ip default-gateway` | "Layer 2 switch needs IP for SSH" |
| **RSA key pair** | Crypto keys SSH needs | Generated with FQDN | "crypto key generate rsa" |
| **SSHv2** | More secure version | `ip ssh version 2` | "v2 best practice" |
| **K9 image** | IOS image with crypto support | Filename contains `k9` | "supports SSH" |
| **NPE image** | No Payload Encryption — no SSH | Export-restricted IOS | "no crypto" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **`login` vs `login local`** | `login` uses line-level password. `login local` requires username from local DB. SSH **requires** `login local` |
| **`access-class` vs `ip access-group`** | `access-class` applies ACL to VTY lines. `ip access-group` applies to a physical interface |
| **L3 vs L2 switch mgmt IP** | L3: any SVI/routed port. L2: SVI + `ip default-gateway` (no routing table) |
| **SSHv1 vs v2 vs 1.99** | 1.99 = device supports both v1 and v2 (not a real version) |

## 🔗 How it all connects

```
Set hostname → set ip domain-name → crypto key generate rsa (≥768 bits) → user/pass → line vty 0 15 → login local → transport input ssh → (ACL access-class)
```

## 🚨 Exam Traps

- **SSH does NOT** work with `login` — you **must** use `login local` (username required)
- **`crypto key generate rsa` does NOT** work with default hostname `Router` — set hostname first, AND configure `ip domain-name`
- **NPE images do NOT** support SSH — must use **K9** image
- **RSA modulus < 768 bits does NOT** allow SSHv2
- **`access-class` to VTY is NOT** the same command as `ip access-group` to interface
- **Console line is NOT** secured by default — anyone with cable access has CLI

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Port for Telnet / SSH | **TCP 23 / TCP 22** |
| Required before `crypto key generate rsa` | **Non-default hostname + `ip domain-name`** |
| Image type required for SSH | **K9 (not NPE)** |
| Allow SSH only on VTY | **`transport input ssh`** |
| Allow Telnet AND SSH on VTY | **`transport input telnet ssh`** OR **`transport input all`** |
| Apply ACL to restrict who can SSH | **`access-class <ACL> in`** under `line vty 0 15` |
| L2 switch SSH requires | **SVI IP + `ip default-gateway`** |
| Login mode required for SSH | **`login local`** |
| Min modulus length for SSHv2 | **768 bits** |
| Verify SSH state | **`show ip ssh`** |

## ⚡ One-Line Master Recall

**Hostname + domain name + RSA keys + login local + transport input ssh = secure VTY on TCP 22.**

## ➕ EXTRA — not in video, but on the exam

- **Console password skeleton** — `line console 0` → `password X` → `login` (line-level) OR `login local` (use username DB) + optional `exec-timeout 5 0`.
- **Enable secret** — required to get to privileged EXEC over SSH/Telnet (line login alone gets you only user EXEC).
- **AAA via RADIUS/TACACS+** — alternative to local users; v1.1 5.8 covers AAA. SSH can authenticate to AAA server.
- **`exec-timeout 0 0`** — never log out (security risk). Default varies by device; set 5–10 minutes.
- **Banner MOTD** — `banner motd #...#` should be configured on managed devices for legal warning.

## 🧾 Recap

- **Telnet (23)** = plaintext, legacy. **SSH (22)** = encrypted, modern.
- L2 switches need an **SVI + default-gateway** to be remotely managed.
- Cisco SSH config order: hostname → `ip domain-name` → `crypto key generate rsa` → user → `line vty 0 15` → `login local` + `transport input ssh`.
- Must run a **K9** image with **RSA keys ≥ 768 bits** for SSHv2.
- **`access-class`** restricts VTY; **`ip access-group`** restricts interface — don't swap them.
- If you can write the full SSH-enable command sequence from blank running-config, move to Day 43.

---
Source: Jeremy's IT Lab — Day 42 — https://www.youtube.com/watch?v=AvgYqI2qSD4
