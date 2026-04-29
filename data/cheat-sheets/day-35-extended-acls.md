---
title: "Free CCNA | Extended ACLs | Day 35 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-35
source_transcript: "[[../jeremy-it-videos/071-extended-acls-day-35]]"
source_url: https://www.youtube.com/watch?v=dUttKY_CNXE
created: 2026-04-28
tags: [ccna, cheat-sheet, day-35]
---

# Day 35 — Extended ACLs

## 🎯 What this video covers

Maps to v1.1 blueprint **5.6 ACLs**. Extended ACLs match on **protocol + source IP + destination IP + L4 port** — much more specific than standard. Apply **close to source** (opposite of standard).

## 🧠 Core Concept

**Extended ACL = `permit/deny PROTOCOL SRC SRC-PORT DST DST-PORT` — match all five fields, applied as close to the source as possible to drop unwanted traffic before it travels.**

## 🔑 Must-Know Table

| Item | Value |
|---|---|
| **Numbered range** | **100–199** and **2000–2699** |
| **Protocol options** | `ip`, `tcp`, `udp`, `icmp`, `ospf`, `eigrp`, or number |
| **IP protocol numbers** | TCP=6, UDP=17, ICMP=1, OSPF=89, EIGRP=88 |
| **Single host syntax** | `host 1.1.1.1` **or** wildcard `0.0.0.0` (NOT bare IP) |
| **Any source/dest** | `any` keyword |
| **Port operators** | `eq`, `gt`, `lt`, `neq`, `range X Y` |
| **Apply rule** | Close to **source** (opposite of standard) |
| **Direction** | `ip access-group N {in|out}` on interface |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Standard vs Extended ACL** | Standard = source IP only, applied **near destination**. Extended = full 5-tuple, applied **near source** |
| **Numbered global config vs named-mode config** | Global config: can't delete single entry, can't insert. **Named mode**: can do both with sequence numbers |
| **`host X.X.X.X` vs bare IP** | In **extended**, must use `host` keyword OR explicit wildcard `0.0.0.0`. Bare IP is **rejected** |
| **`permit ip any any` vs `permit any`** | `permit any` = standard ACL syntax. **`permit ip any any` = extended syntax** for "allow all" |

## 🔗 How it all connects

```
config: ip access-list extended BLOCK-HTTPS → deny tcp <src> <wcard> host <dst> eq 443 → permit ip any any
apply:  interface gi0/1 → ip access-group BLOCK-HTTPS in   (close to source)
verify: show ip interface gi0/1   |   show access-lists
```

## 🚨 Exam Traps

- **Bare IP without `host` is NOT valid** in extended ACLs — must use `host X` or `X 0.0.0.0`
- **`no access-list 100` deletes the WHOLE ACL** from global config — not the matched entry
- **Extended ACLs are NOT applied near destination** — that's standard. Extended go **near source**
- **Implicit `deny ip any any` at end** — always remember to add explicit `permit ip any any` if you want everything else
- **HTTP/HTTPS use TCP, NOT UDP** — common trap on quiz questions
- **Wildcard mask is NOT subnet mask** — `0.0.0.255` = match a /24 (inverted)

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Extended numbered ranges | **100-199, 2000-2699** |
| Block 10.0.0.0/16 from UDP to host 192.168.1.1 | `deny udp 10.0.0.0 0.0.255.255 host 192.168.1.1` |
| Block ping from one host to /24 | `deny icmp host X Y.Y.Y.0 0.0.0.255` |
| Allow all remaining traffic | `permit ip any any` |
| Apply extended ACL where? | Inbound, **closest to source** |
| Resequence ACL 1 starting at 10, step 10 | `ip access-list resequence 1 10 10` |
| Permit HTTPS to host 2.2.2.2 | `permit tcp <src> host 2.2.2.2 eq 443` |
| Source port range 20000-30000 | `range 20000 30000` (after src wildcard) |

## ⚡ One-Line Master Recall

**`{permit|deny} PROTO SRC <wcard> [op port] DST <wcard> [op port]` — apply inbound near source, end with `permit ip any any` if needed.**

## 🧪 Common port keywords

```
eq 21 (ftp)  eq 22 (no keyword)  eq 23 (telnet)  eq 25 (smtp)
eq 53 (domain)  eq 69 (tftp)  eq 80 (www)  eq 443 (no keyword)
```

## ➕ EXTRA — not in video, but on the exam

- **Time-based ACLs** — `time-range BUSINESS-HOURS` ... `permit ... time-range BUSINESS-HOURS`. Applied only during the window.
- **Reflexive / established ACLs** — `permit tcp ... established` matches return traffic with ACK/RST set. Lets you allow inside-out without exposing inside.
- **VTY ACL** — apply inbound on VTY lines with `access-class N in` (NOT `ip access-group`) to control SSH/Telnet management.
- **IPv6 ACLs** — `ipv6 access-list NAME` then `permit/deny`. No numbered, no wildcard masks (uses prefix length).

## 🧾 Recap

- **Match 5-tuple**: protocol + src + dst + src-port + dst-port.
- **Apply close to source** — drop unwanted traffic early.
- **Use named ACL config mode** to insert/delete individual entries.
- **`host X` or wildcard `0.0.0.0`** for /32 — bare IP is not valid.
- If you can write the Day-35 practice questions cold (HTTPS, UDP-range, ICMP from /32), move to Day 36.

---
Source: Jeremy's IT Lab — Day 35 — https://www.youtube.com/watch?v=dUttKY_CNXE
