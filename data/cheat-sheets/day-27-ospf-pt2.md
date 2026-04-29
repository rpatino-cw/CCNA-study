---
title: "Free CCNA | OSPF Part 2 | Day 27 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-27
source_transcript: "[[../jeremy-it-videos/055-ospf-part-2-day-27]]"
source_url: https://www.youtube.com/watch?v=VtzfTA21ht0
created: 2026-04-28
tags: [ccna, cheat-sheet, day-27, high-priority]
---

# Day 27 — OSPF (Part 2)

## 🎯 What this video covers

Maps to v1.1 blueprint **3.4 (OSPFv2)** — cost calculation, neighbor states, and additional configuration. OSPF is one of the most heavily tested topics on the CCNA. The 7 neighbor states and the cost formula will appear on test day.

## 🧠 Core Concept

**OSPF cost = reference bandwidth ÷ interface bandwidth (anything <1 rounds to 1). Routers form neighbors through 7 states ending in Full, then sync LSDBs and run SPF. Default reference bandwidth (100 Mbps) is too low — change it on every router.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **Cost** | OSPF metric — lower is better | Per interface | "metric", "ref bw / int bw" |
| **Reference bandwidth** | Numerator in cost formula (default 100 Mbps) | Global OSPF setting | "auto-cost reference-bandwidth" |
| **Hello timer** | 10 seconds (Ethernet default) | Per interface | "every 10 sec" |
| **Dead timer** | 40 seconds (Ethernet default) | Per interface | "4× hello" |
| **Multicast 224.0.0.5** | All-OSPF-routers | Hello + LSU destination | "OSPF multicast" |
| **IP protocol 89** | OSPF in IP header | Layer 3 | "protocol field 89" |
| **DBD** | Database Description packet | Exstart/Exchange | "summary of LSDB" |
| **LSR / LSU / LSAck** | Request, send, acknowledge LSAs | Loading state | "LSA exchange" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Down / Init** | Down = nothing seen. Init = received Hello but my own RID isn't in it yet |
| **Init / 2-Way** | Init = one-way Hello received. 2-Way = both routers see each other in Hellos |
| **2-Way / Exstart** | 2-Way = neighbors confirmed (DR/BDR election here). Exstart = decide master/slave for DBD exchange |
| **Exstart / Exchange** | Exstart picks master (higher RID). Exchange sends DBD summaries |
| **Exchange / Loading** | Exchange = "here's what I have". Loading = "send me what I'm missing" (LSR/LSU/LSAck) |
| **Loading / Full** | Loading = still syncing. Full = LSDBs identical, SPF runs |

## 🔗 How it all connects

```
[Down] → [Init] → [2-Way] → [Exstart] → [Exchange] → [Loading] → [Full]
              ↑                ↑              ↑              ↑
         Hello rcvd    DR/BDR + Master    DBD list     LSR/LSU/LSAck
```

## 🚨 Exam Traps

- **Faster than 100 Mbps does NOT** lower cost on default settings — Gig, 10G, FastEth all = cost 1 unless ref-bw is raised
- **Master / Slave is NOT** the same as DR/BDR — Master is the higher RID, picked in **Exstart** for DBD exchange. DR/BDR are picked in **2-Way** for shared segments
- **`bandwidth` command does NOT** change actual interface speed — only the value used in metric calculations
- **Hello/Dead timers must match** between neighbors or they won't form adjacency
- **224.0.0.5** is the multicast for all OSPF routers — don't confuse with RIP (224.0.0.9) or EIGRP (224.0.0.10)
- **Loopback cost = 1**, always added to total

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Default OSPF cost on FastEthernet | **1** |
| Default ref-bw and the issue | **100 Mbps** — too low, all fast links collapse to cost 1 |
| Cmd to raise reference bandwidth to 100 Gbps | **`auto-cost reference-bandwidth 100000`** |
| OSPF Hello / Dead default (Ethernet) | **10 / 40 seconds** |
| State where master/slave is decided | **Exstart** |
| State where LSAs are exchanged via LSR/LSU/LSAck | **Loading** |
| OSPF multicast address | **224.0.0.5** |
| IP protocol number for OSPF | **89** |
| Order of states (memorize) | **Down → Init → 2-Way → Exstart → Exchange → Loading → Full** |
| Activate OSPF directly on an interface | **`ip ospf <pid> area <id>`** |

## ⚡ One-Line Master Recall

**Routers send Hellos to 224.0.0.5 → progress Down→Init→2-Way (DR/BDR)→Exstart (master)→Exchange (DBDs)→Loading (LSR/LSU/LSAck)→Full → run SPF on the LSDB → cost = ref-bw ÷ int-bw, sum the exit-interface costs, lowest wins.**

## ➕ EXTRA — not in video, but on the exam

- **DR / BDR election (1.11 / 3.4)** — happens in 2-Way state on broadcast networks. Highest OSPF priority wins; tie → highest RID. Priority 0 = never DR. Covered Day 28.
- **Router ID selection** — manually configured first, else highest loopback IP, else highest active physical IP. Once chosen, sticky until OSPF restarts.
- **Passive interface** — sends no Hellos, but the network is still advertised. Two configs: per-interface or `passive-interface default` + `no passive-interface <int>`.
- **Network types** — broadcast (DR/BDR, 10/40 timers), point-to-point (no DR, 10/40), non-broadcast (30/120). Day 28 detail.

## 🧾 Recap

- **7 neighbor states**: Down, Init, 2-Way, Exstart, Exchange, Loading, Full — memorize the order.
- **Cost formula** = reference bandwidth ÷ interface bandwidth (min 1). Always raise ref-bw to ≥ fastest link.
- **Hello 10 / Dead 40** on Ethernet — must match between neighbors.
- **224.0.0.5 + IP protocol 89** = the OSPF Layer-3 fingerprint.
- If you can put the 7 states in order without peeking and calculate cost for /100/Gig/10G with ref-bw 100,000, you're ready for Day 28.

---
Source: Jeremy's IT Lab — Day 27 — https://www.youtube.com/watch?v=VtzfTA21ht0
