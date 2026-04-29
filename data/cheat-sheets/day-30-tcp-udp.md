---
title: "Free CCNA | TCP & UDP | Day 30 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-30
source_transcript: "[[../jeremy-it-videos/061-tcp-udp-day-30]]"
source_url: https://www.youtube.com/watch?v=LIEACBqlntY
created: 2026-04-28
tags: [ccna, cheat-sheet, day-30]
---

# Day 30 — TCP & UDP

## 🎯 What this video covers

Maps to v1.1 blueprint **1.5 Compare TCP to UDP**. Covers Layer-4 fundamentals: port numbers, session multiplexing, TCP three-way handshake, sequencing/ack, flow control, well-known port ranges, and the high-yield TCP-vs-UDP comparison row.

## 🧠 Core Concept

**TCP = connection-oriented, reliable, sequenced, flow-controlled. UDP = connectionless, best-effort, lightweight.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **TCP** | Reliable, ordered Layer-4 protocol | L4 segment | "three-way handshake", "ack" |
| **UDP** | Best-effort, lightweight L4 protocol | L4 segment | "connectionless", "no ack" |
| **Port number** | 16-bit L4 address | TCP/UDP header | "identifies application" |
| **Three-way handshake** | SYN → SYN-ACK → ACK | TCP setup | "establishes connection" |
| **Forward acknowledgment** | Ack value = next expected seq | TCP ack field | "ack 28 means got 27" |
| **Sliding window** | Dynamic flow control | TCP window field | "send N before ack required" |
| **Session multiplexing** | Multiple sessions tracked by port pairs | Both TCP/UDP | "tabs, services in parallel" |

## 🧩 Concept-pair clarifications — THE comparison row

| Feature | **TCP** | **UDP** |
|---|---|---|
| Connection | Connection-oriented (3-way HS) | Connectionless |
| Reliability | Reliable (acks + retransmit) | Best-effort |
| Sequencing | Yes (seq + ack numbers) | No |
| Flow control | Yes (window size) | No |
| Header size | 20+ bytes | 8 bytes |
| Speed/overhead | Slower, more overhead | Faster, less overhead |
| Use case | File transfer, web, email | Voice, video, DNS, DHCP |
| Port number? | Yes | Yes (both have ports) |

## 🔗 How it all connects

```
TCP: SYN → SYN/ACK → ACK | data with seq/ack | FIN → ACK → FIN → ACK
UDP: just send (best effort, no setup, no teardown)
```

## 🚨 Exam Traps

- **UDP is NOT** unreliable in the broken sense — it's "best-effort." Apps (TFTP, voice) handle reliability themselves
- **Port numbers are NOT** TCP-only — UDP uses them too
- **Session multiplexing is NOT** a TCP-only feature — UDP supports it via port pairs
- **Forward ack `28` does NOT** mean "received 28" — it means "got through 27, send 28 next"
- **Three-way handshake is NOT** four messages — it's SYN, SYN-ACK, ACK
- **Random source port range is NOT** 1024–49151 (registered) — it's **49152–65535** (ephemeral)

## 🧪 Quick-Answer Map (PORTS — memorize these)

| Protocol | Port | Transport |
|---|---|---|
| **FTP data** | 20 | TCP |
| **FTP control** | 21 | TCP |
| **SSH** | 22 | TCP |
| **Telnet** | 23 | TCP |
| **SMTP** | 25 | TCP |
| **DNS** | 53 | **TCP + UDP** |
| **DHCP server/client** | 67 / 68 | UDP |
| **TFTP** | 69 | UDP |
| **HTTP** | 80 | TCP |
| **POP3** | 110 | TCP |
| **SNMP** | 161 / 162 | UDP |
| **HTTPS** | 443 | TCP |
| **Syslog** | 514 | UDP |

| Stem | Answer |
|---|---|
| TCP-only services (pick from SMTP/SNMP/HTTPS/DHCP/Syslog/SSH) | **SMTP, HTTPS, SSH** |
| Port range for source-port random selection | **49152–65535 (ephemeral)** |
| Well-known port range | **0–1023** |
| Three features TCP has, UDP doesn't | **Error recovery, flow control, sequencing** |
| Forward ack value when seq=27 received | **28** |

## ⚡ One-Line Master Recall

**TCP: handshake-ack-window for reliability. UDP: fire-and-forget for speed. Both: ports.**

## ➕ EXTRA — not in video, but on the exam

- **Connection termination** — TCP uses 4-way (FIN, ACK, FIN, ACK) to close. Less famous than 3-way but exam-fair.
- **Why DNS uses both** — UDP for normal queries (small, fast). TCP for zone transfers and responses >512 bytes.
- **NTP** — UDP port **123**. v1.1 covers NTP in 4.2 — likely tested.
- **TLS/SSL** — runs on TCP (HTTPS=443). Not a separate L4 protocol — it sits on top of TCP.
- **QUIC** — newer protocol over UDP for HTTP/3. NOT a CCNA topic but increasingly visible.

## 🧾 Recap

- **TCP** provides connection, reliability, sequencing, flow control — at the cost of overhead.
- **UDP** is connectionless and best-effort — small header, low latency, ideal for voice/video/DNS.
- Both use **port numbers** for L4 addressing and session multiplexing.
- Three-way handshake = **SYN → SYN-ACK → ACK**. Forward ack = "send the *next* one."
- **Source ports** randomly chosen from **ephemeral 49152–65535**.
- If you can fill the comparison row + 10/13 ports from memory, move to Day 31.

---
Source: Jeremy's IT Lab — Day 30 — https://www.youtube.com/watch?v=LIEACBqlntY
