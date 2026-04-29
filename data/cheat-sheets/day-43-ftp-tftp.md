---
title: "Free CCNA | FTP & TFTP | Day 43 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-43
source_transcript: "[[../jeremy-it-videos/087-ftp-tftp-day-43]]"
source_url: https://www.youtube.com/watch?v=50hcfsoBf4Q
created: 2026-04-28
tags: [ccna, cheat-sheet, day-43]
---

# Day 43 — FTP & TFTP

## 🎯 What this video covers

Maps to v1.1 blueprint **4.9 Describe the capabilities and function of TFTP/FTP in the network**. Most common real-world use: pulling new IOS images onto a Cisco device.

## 🧠 Core Concept

**TFTP = simple, UDP/69, no auth, copy files only. FTP = full-featured, TCP/20+21, auth, navigation. Both transfer files; FTP can do everything else.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **TFTP** | Trivial File Transfer Protocol | UDP **69** | "no auth, only copy files" |
| **FTP** | File Transfer Protocol | TCP **21 (control) + 20 (data)** | "two TCP connections" |
| **FTP control connection** | TCP/21 — sends commands & replies | Persistent during session | "where commands flow" |
| **FTP data connection** | TCP/20 — actual file bytes | Opened/closed as needed | "where data flows" |
| **FTP active mode** | SERVER initiates data conn | Default | "server starts the data TCP" |
| **FTP passive mode** | CLIENT initiates data conn | Used behind firewalls | "client behind firewall" |
| **FTPS** | FTP + SSL/TLS encryption | Adds security to FTP | "FTP Secure" |
| **SFTP** | SSH File Transfer Protocol | Different protocol! | "runs over SSH, port 22" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **TFTP vs FTP** | TFTP = simple, UDP, no auth, copy only. FTP = TCP, auth, list/delete/navigate dirs |
| **FTPS vs SFTP** | FTPS = FTP layered over SSL/TLS (still TCP 20/21 with TLS). SFTP = a different protocol over SSH (port 22) |
| **FTP active vs passive** | Active: server opens data conn TO client. Passive: client opens data conn TO server (firewall-friendly) |
| **NVRAM vs flash vs RAM** | NVRAM = startup-config. Flash = IOS image + files. RAM = running-config + active OS |

## 🔗 How it all connects

```
TFTP:  client UDP/69 → request → server replies → lock-step Data/Ack until done
FTP:   client TCP/21 (control) → commands → separate TCP/20 (data) connections
```

## 🚨 Exam Traps

- **TFTP is NOT** secure — no encryption, no auth, plain text.
- **FTP is NOT** encrypted either — username/password sent in plain text. Use FTPS or SFTP for security.
- **TFTP cannot** list directories, delete files, create dirs — ONLY copy a file to/from server (you must know the filename).
- **TFTP uses UDP** but has its own basic ack/retransmit (lock-step) — don't confuse with TCP.
- **FTP active mode fails behind firewalls** because the SERVER initiates the data connection — use passive instead.
- **`copy tftp: flash:`** — direction is `source: destination:` (not the other way).

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| TFTP port / transport | **UDP 69** |
| FTP control / data ports | **TCP 21 / TCP 20** |
| TFTP authentication | **None** |
| FTP authentication | **Username + password (plain text)** |
| Copy IOS from TFTP server to flash | **`copy tftp: flash:`** |
| Tell router to boot new IOS | **`boot system flash:<filename>`** |
| Save running config | **`copy running-config startup-config`** (or `write memory`) |
| Where startup-config is stored | **NVRAM** |
| Where IOS image is stored | **Flash** |
| Client behind firewall — FTP mode | **Passive** |
| Encrypted FTP options | **FTPS (FTP+TLS) or SFTP (over SSH)** |
| TFTP can do these (select all) | **Copy file to / from server** (nothing else) |

## ⚡ One-Line Master Recall

**TFTP = UDP/69, no auth, copy only. FTP = TCP/21+20, auth, full file management. Behind firewall → passive.**

## ➕ EXTRA — not in video, but on the exam

- **HTTP/HTTPS file transfer** (`copy http://...` / `copy https://...`) — modern alternative; v1.1 may surface this in IOS upgrade context.
- **Cisco IOS file systems** — was removed from older blueprints, but file types (NVRAM, flash, network, opaque) still appear in v1.1 trivia.
- **SCP** (Secure Copy) — runs over SSH like SFTP. Often grouped with SFTP for "secure file transfer."

## 🧾 Recap

- **TFTP = UDP/69, no auth, copy files only.** Useful for quick LAN transfers.
- **FTP = TCP/21 control + TCP/20 data, auth.** Active = server-initiated data; Passive = client-initiated (firewall).
- **`copy tftp: flash:`** is the IOS-upgrade workhorse.
- **FTPS adds TLS to FTP. SFTP is a different protocol over SSH.** Don't confuse them.
- If you can list TFTP and FTP ports + describe active vs passive, move to Day 44.

---
Source: Jeremy's IT Lab — Day 43 — https://www.youtube.com/watch?v=50hcfsoBf4Q
