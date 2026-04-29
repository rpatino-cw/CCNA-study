---
title: "Free CCNA | Security Fundamentals | Day 48 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-48
source_transcript: "[[../jeremy-it-videos/097-security-fundamentals-day-48]]"
source_url: https://www.youtube.com/watch?v=VvFuieyTTSw
created: 2026-04-28
tags: [ccna, cheat-sheet, day-48]
---

# Day 48 — Security Fundamentals

## 🎯 What this video covers

Multi-row blueprint hit. Maps to v1.1: **5.1** key security concepts (vulnerability, exploit, threat, mitigation, CIA), **5.2** security program elements (user awareness/training, physical access control), **5.3** password alternatives (MFA, certificates, biometrics — also covers **5.4** in legacy numbering), and **5.8** AAA concepts (authentication, authorization, accounting). Also touches **5.5/5.6** common attacks at intro level.

## 🧠 Core Concept

**Security = protect Confidentiality, Integrity, Availability (CIA) by reducing vulnerabilities, blocking exploits, and authenticating + authorizing + accounting for users.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **Confidentiality** | Only authorized users see data | CIA C | "secret", "authorized only" |
| **Integrity** | Data not tampered with | CIA I | "not modified", "authentic" |
| **Availability** | Systems accessible when needed | CIA A | "operational", "up and running" |
| **Vulnerability** | Potential weakness | Pre-exploit | "potential weakness" |
| **Exploit** | Tool/code that uses the vuln | Attack instrument | "rock, malware payload" |
| **Threat** | Real possibility a vuln gets exploited | Risk realized | "the possibility of attack" |
| **Mitigation** | Defense that reduces risk | Control | "antivirus, ACL, training" |
| **Authentication** | Verify identity | AAA #1 | "who are you" |
| **Authorization** | Grant permissions | AAA #2 | "what can you do" |
| **Accounting** | Log activity | AAA #3 | "what did you do, when" |
| **MFA** | 2+ of: know, have, are | Auth strength | "something you know/have/are" |
| **RADIUS** | Open AAA protocol — UDP **1812/1813** | AAA server | "open standard" |
| **TACACS+** | Cisco AAA — TCP **49** | AAA server | "Cisco proprietary" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Vulnerability vs Exploit vs Threat** | Vuln = weakness. Exploit = tool. Threat = the **possibility** the exploit gets used |
| **DoS vs DDoS** | DoS = single attacker. DDoS = botnet of many infected hosts |
| **Phishing variants** | Phishing (mass email), spear phishing (targeted), whaling (executives), vishing (voice), smishing (SMS) |
| **Authentication vs Authorization** | AuthN = who. AuthZ = what permitted |
| **MFA two factors** | Must be from **different categories** — two fingerprints ≠ MFA |
| **RADIUS vs TACACS+** | RADIUS = open, UDP, encrypts password only. TACACS+ = Cisco, TCP, encrypts whole payload |

## 🔗 How it all connects

```
User → Authentication (who) → Authorization (what) → Accounting (logged)
            ↑                                              
        AAA server (RADIUS UDP 1812/1813 or TACACS+ TCP 49)
```

## 🚨 Exam Traps

- **Two fingerprints is NOT** MFA — both are "something you are" (same category)
- **Vulnerability is NOT** the same as threat — vuln is the weakness, threat is the realized possibility
- **RADIUS is NOT** TCP — it's **UDP** (1812/1813)
- **TACACS+ is NOT** UDP — it's **TCP 49**
- **Spear phishing is NOT** generic — it targets **specific individuals/companies**
- **A worm is NOT** a virus — worms spread without a host program; viruses need one
- **Authorization is NOT** authentication — they're separate AAA steps

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| CIA piece for "system is up and accessible" | **Availability** |
| CIA piece for "data is correct, untampered" | **Integrity** |
| Real possibility a weakness is attacked | **Threat** |
| Logging when a user logs in/out | **Accounting** |
| Granting/restricting file access | **Authorization** |
| Verifying user identity | **Authentication** |
| Badge + PIN at a door | **MFA + physical access control** |
| Retina scan + fingerprint scan | **NOT MFA** (both "something you are") |
| RADIUS port(s) | **UDP 1812 / 1813** |
| TACACS+ port | **TCP 49** |
| Phishing aimed at executives | **Whaling** |
| Phishing over phone | **Vishing** |
| Phishing via SMS | **Smishing** |
| TCP SYN flood targets which CIA letter | **A (availability)** |
| ARP spoofing / MITM compromises which CIA letters | **C and I** |

## ⚡ One-Line Master Recall

**CIA + Vuln/Exploit/Threat/Mitigation + AuthN/AuthZ/Accounting + MFA from 3 categories + RADIUS UDP 1812 / TACACS+ TCP 49.**

## ➕ EXTRA — not in video, but on the exam

- **Strong password rules** — ≥8 chars, mixed case, numbers, special chars, rotated regularly. v1.1 5.3.
- **Digital certificates** — issued by **CA** after a **CSR**; prove a server's identity (HTTPS lock icon). v1.1 5.3.
- **DHCP snooping / DAI / port security** — v1.1 5.7 mitigations against DHCP attacks, ARP spoofing, MAC flooding. Day 49+ details.
- **Password storage on Cisco** — `enable secret` (MD5/Type 9 SCRYPT) > `enable password` (Type 7 reversible). Always prefer secret.
- **RADIUS encrypts only the password** in the access-request; **TACACS+ encrypts the entire payload** — exam favorite distinction.

## 🧾 Recap

- **CIA triad** = Confidentiality, Integrity, Availability — every attack maps to one or more.
- **Vuln → Exploit → Threat → Mitigation** is the security chain.
- **AAA**: AuthN (who), AuthZ (what), Accounting (logged) — via **RADIUS UDP 1812/1813** or **TACACS+ TCP 49**.
- **MFA** requires factors from at least **2 different categories** (know/have/are).
- Social-engineering variants: phishing, spear phishing, whaling, vishing, smishing, tailgating, watering hole.
- If you can match each attack to its CIA letter and recall AAA + RADIUS/TACACS+ ports, move to Day 49.

---
Source: Jeremy's IT Lab — Day 48 — https://www.youtube.com/watch?v=VvFuieyTTSw
