---
title: "BPDU Guard & BPDU Filter (STP Toolkit) | CCNA 200-301 Day 21 (part 2)"
type: ccna-cheat-sheet
day: day-21p2
source_transcript: "[[../jeremy-it-videos/041-bpdu-guard-bpdu-filter-stp-toolkit-ccna-200-301-day-21-part-2]]"
source_url: https://www.youtube.com/watch?v=jfC_AeJnuhY
created: 2026-04-28
tags: [ccna, cheat-sheet, day-21p2]
---

# Day 21 (Part 2) — BPDU Guard & BPDU Filter

## 🎯 What this video covers

Maps to v1.1 blueprint **2.5.d Configure and verify Layer 2 security: BPDU guard, BPDU filter** (and the PortFast/edge concepts they pair with). Builds on Day 20 STP fundamentals + Day 21 part 1 PortFast.

## 🧠 Core Concept

**BPDU Guard err-disables the port if it RECEIVES a BPDU. BPDU Filter STOPS the port from SENDING BPDUs (and behavior on receive depends on global vs per-port config).**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **PortFast** | Skip listening/learning, go straight to forwarding | Edge ports (PCs, phones) | "no STP delay for end host" |
| **BPDU Guard** | Err-disable port if BPDU received | Edge ports | "received BPDU → shutdown" |
| **BPDU Filter** | Stop sending BPDUs on the port | Edge ports | "filter outbound BPDUs" |
| **err-disabled** | Port disabled by violation, won't pass traffic | Switch interface state | "shutdown / no shutdown to recover" |
| **ErrDisable Recovery** | Auto re-enable after timer (default 300s) | Global feature | "recovery cause bpduguard" |
| **Global default** vs **per-port** | Two ways to enable each toolkit feature | Global cfg vs interface cfg | "spanning-tree portfast bpduguard default" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **BPDU Guard vs Root Guard** | BPDU Guard = err-disable on ANY BPDU. Root Guard = block superior BPDU only, no err-disable |
| **BPDU Filter global vs per-port** | Global (default) on PortFast ports = stops sending; if BPDU received, port reverts to normal STP. Per-port = stops sending AND ignores received BPDUs (effectively disables STP on that port — DANGEROUS) |
| **PortFast scope** | When enabled by default = applies to all access ports. BPDU Guard by default = applies to all PortFast-enabled ports (different scope!) |
| **PortFast wrong port** | Causes temporary L2 loop. BPDU Filter wrong port = causes PERMANENT L2 loop |

## 🔗 How it all connects

```
edge port → PortFast (skip listening/learning) → BPDU Guard (err-disable if BPDU) → BPDU Filter (don't send BPDUs)
```

## 🚨 Exam Traps

- **BPDU Guard does NOT** stop sending BPDUs — it watches for incoming. Use BPDU Filter to stop sending.
- **BPDU Filter per-port is NOT** the same as global — per-port ignores received BPDUs (loop risk!), global reverts to normal STP if BPDU received.
- **Disconnecting the cable does NOT** clear err-disable — must `shutdown / no shutdown` or use ErrDisable Recovery.
- **ErrDisable Recovery is DISABLED by default** for all causes — must explicitly enable per cause.
- **Re-enabling without fixing the underlying issue** = port just gets disabled again.
- **BPDU Guard global** applies to all **PortFast-enabled** ports — NOT all access ports.

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Per-port BPDU Guard | **`spanning-tree bpduguard enable`** |
| Global BPDU Guard | **`spanning-tree portfast bpduguard default`** |
| Per-port BPDU Filter | **`spanning-tree bpdufilter enable`** ⚠️ disables STP on port |
| Global BPDU Filter | **`spanning-tree portfast bpdufilter default`** ✅ recommended |
| Default ErrDisable Recovery timer | **300 seconds (5 min)** |
| Enable auto-recovery for BPDU Guard | **`errdisable recovery cause bpduguard`** |
| Manual recovery | **`shutdown` then `no shutdown`** |
| Port state when BPDU Guard fires | **err-disabled** |

## ⚡ One-Line Master Recall

**Guard kills the port on receive. Filter shuts the mouth on send. Both go on PortFast edges.**

## ➕ EXTRA — not in video, but on the exam

- **Root Guard** (Day 21 part 3) — protects root role. Different from BPDU Guard.
- **Loop Guard** (Day 21 part 4) — protects against unidirectional links missing BPDUs.
- **Edge keyword** — modern IOS uses `spanning-tree portfast edge` as alternate syntax.
- **Recovery interval** — change with `errdisable recovery interval <seconds>`.

## 🧾 Recap

- **BPDU Guard** receives → err-disable. Pair with PortFast.
- **BPDU Filter** stops sending. **Always prefer global** over per-port (per-port disables STP — loop risk).
- **err-disabled** recovers via `shutdown/no shutdown` OR ErrDisable Recovery (off by default; enable per cause).
- **Always fix the underlying issue** before re-enabling, else loop continues.
- If you can name the difference between Guard and Filter without thinking, move to Day 21 part 3.

---
Source: Jeremy's IT Lab — Day 21 (part 2) — https://www.youtube.com/watch?v=jfC_AeJnuhY
