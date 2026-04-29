---
title: "Free CCNA | DNS | Day 38 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-38
source_transcript: "[[../jeremy-it-videos/077-dns-day-38]]"
source_url: https://www.youtube.com/watch?v=4C6eeQes4cs
created: 2026-04-28
tags: [ccna, cheat-sheet, day-38]
---

# Day 38 — DNS

## 🎯 What this video covers

Maps to v1.1 blueprint **4.3 Explain the role of DHCP and DNS within the network**. DNS resolves names like `youtube.com` to IP addresses. CCNA only requires the basics — what it does, port/transport, common record types, and basic Cisco IOS config.

## 🧠 Core Concept

**DNS converts human-readable names to IP addresses by querying a DNS server (UDP/53 normally, TCP/53 for >512 bytes).**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **DNS query / response** | Client asks server for an IP | UDP 53 (TCP 53 if >512 bytes) | "resolve a name" |
| **A record** | Name → IPv4 address | Server's zone file | "IPv4 mapping" |
| **AAAA (quad-A) record** | Name → IPv6 address | Server's zone file | "IPv6 mapping" |
| **CNAME** | Name → another name (alias) | Server's zone file | "alias to canonical name" |
| **DNS cache** | Local store of recent lookups | On client + server | "saves time on repeat lookups" |
| **hosts file** | Static name → IP map | Local file (pre-DNS legacy) | "no server, manual entries" |
| **`ip name-server`** | Configures DNS server on Cisco router | Global config | "router as DNS client" |
| **`ip domain lookup`** | Enables DNS queries on the router | Default: ON | "enable resolution" |
| **`ip dns server`** | Makes the router a DNS server | Global config | "router responds to queries" |
| **`ip host NAME IP`** | Static host entry on router | Like a mini hosts file | "permanent entry" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **DNS vs hosts file** | DNS = scalable client/server lookup. hosts = local file, manual entries only |
| **A vs AAAA** | A = IPv4. AAAA = IPv6 |
| **UDP/53 vs TCP/53** | UDP for normal queries (≤512 bytes). TCP for large responses, zone transfers |
| **DNS server vs DNS client (Cisco)** | Server: `ip dns server` + `ip host` entries. Client: `ip name-server` + `ip domain lookup` |
| **`ipconfig /displaydns` vs `/flushdns`** | Display = show cache. Flush = clear cache |

## 🔗 How it all connects

```
[Client]→[Query name@UDP/53]→[DNS server]→[Returns IP]→[Client caches + connects to IP]
```

## 🚨 Exam Traps

- **A router does NOT need DNS configuration** to forward DNS packets between client and server — it just routes them
- **DNS is NOT TCP-only** — it's primarily UDP/53; TCP/53 only when responses exceed 512 bytes
- **A record is NOT for IPv6** — that's quad-A (AAAA)
- **`ipconfig /all` is NOT the only way to see DNS server** — `nslookup` also shows it
- **Older command form** — `ip domain-lookup` (with hyphen) still works on modern IOS, both versions are valid
- **Hosts file is NOT DNS** — it's a local override that bypasses DNS

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Default DNS port + transport | **UDP 53** (TCP 53 if >512 bytes) |
| Record type for `youtube.com → 172.x.x.x` | **A** |
| Record type for `youtube.com → 2001:...` | **AAAA (quad-A)** |
| Record type for an alias | **CNAME** |
| Windows command to view DNS cache | **`ipconfig /displaydns`** |
| Windows command to clear DNS cache | **`ipconfig /flushdns`** |
| Windows command to manually query DNS | **`nslookup <name>`** |
| Cisco command to use external DNS server | **`ip name-server 8.8.8.8`** |
| Cisco command to make router a DNS server | **`ip dns server`** |
| Hosts can auto-learn DNS server via | **DHCP** |

## ⚡ One-Line Master Recall

**Client queries DNS server on UDP/53 → gets A (IPv4) or AAAA (IPv6) record → caches it locally → next request skips the server until cache expires or is flushed.**

## ➕ EXTRA — not in video, but on the exam

- **PTR (reverse) record** — IP → name, used by `nslookup IP`. Not in Jeremy's body but appears on real exam.
- **MX record** — mail server lookup. Not CCNA-tested directly but mentioned in Cisco docs.
- **DNS recursion** — recursive vs iterative resolvers. Cisco basics may ask about "the resolver does the work".

## 🧾 Recap

- DNS = **name → IP**, UDP/53 default, TCP/53 for >512 bytes.
- **A = IPv4, AAAA = IPv6, CNAME = alias.**
- A router routing DNS traffic **needs no DNS config**; only configure if it acts as server or client.
- **`ip name-server` + `ip domain lookup`** = router as DNS client. **`ip dns server` + `ip host`** = router as DNS server.
- If you can answer the v1.1 verify-IP-parameters questions on a Windows client (`ipconfig`, `nslookup`), move to Day 39.

---
Source: Jeremy's IT Lab — Day 38 — https://www.youtube.com/watch?v=4C6eeQes4cs
