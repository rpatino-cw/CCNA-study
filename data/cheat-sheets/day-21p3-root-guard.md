---
title: "Root Guard (STP Toolkit) | CCNA 200-301 Day 21 (part 3)"
type: ccna-cheat-sheet
day: day-21p3
source_transcript: "[[../jeremy-it-videos/042-root-guard-stp-toolkit-ccna-200-301-day-21-part-3]]"
source_url: https://www.youtube.com/watch?v=2XE_PgkvSic
created: 2026-04-28
tags: [ccna, cheat-sheet, day-21p3]
---

# Day 21 (part 3) — Root Guard

## 🎯 What this video covers

Maps to v1.1 blueprint **2.5 Configure and verify (Layer 2/Layer 3) EtherChannel and Spanning Tree Protocol** — STP toolkit feature. Root Guard protects your chosen root bridge from being usurped by a switch outside your control (e.g., a customer's switch on a service-provider link).

## 🧠 Core Concept

**Root Guard locks a port out of the role of "root port" — if a superior BPDU arrives, the port is moved to "root inconsistent / broken" state instead of letting a foreign switch become root.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **Root Guard** | Drops port to broken state if it hears a superior BPDU | Per-interface only | "prevent another switch from becoming root" |
| **Superior BPDU** | BPDU advertising a better (lower) root bridge ID | Received on a Root Guard port = trigger | "lower bridge ID heard" |
| **Root inconsistent state** | Port disabled by Root Guard | Shows as `BKN ROOT_Inc` | "port is broken, root inconsistent" |
| **`spanning-tree guard root`** | Interface-level command to enable Root Guard | Interface config only — no global command | "enable on specific port" |
| **Auto-recovery** | Port re-enables once superior BPDUs stop / age out (~20s) | No CLI re-enable needed | "automatically recovers" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Root Guard vs BPDU Guard** | Root Guard = blocks if BPDU is *better than current root* (port stays L2-active otherwise). BPDU Guard = err-disables on *any* BPDU (used on PortFast access ports) |
| **Root Guard vs Loop Guard** | Root Guard prevents *unauthorized root election*. Loop Guard prevents loops when BPDUs *stop* arriving on a non-designated port |
| **Recovery: Root Guard vs BPDU Guard** | Root Guard auto-recovers when superior BPDUs stop. BPDU Guard requires errdisable recovery or manual `shut`/`no shut` |
| **Where to enable** | Service provider enables on ports facing the customer. Customer should NOT enable facing the provider |

## 🔗 How it all connects

```
[Provider SW1=root]─[SW2 G0/2 Root-Guard]─X─[Customer SW6 advertising better BPDU]   (link blocked, root preserved)
```

## 🚨 Exam Traps

- **Root Guard is NOT a global command** — only configurable per-interface (unlike PortFast/BPDU Guard which have global defaults)
- **Root Guard is NOT the same as BPDU Guard** — BPDU Guard err-disables on ANY BPDU; Root Guard only acts on *superior* BPDUs
- **Setting priority to 0 does NOT guarantee root** — a switch with the same priority but lower MAC will still win; Root Guard is what enforces it
- **Root Guard does NOT need errdisable recovery** — port comes back automatically when superior BPDUs stop (Max Age ≈ 20s)
- **Customer should NOT enable Root Guard facing the provider** — they'd block their own uplink

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Command to enable Root Guard | **`spanning-tree guard root`** (interface only) |
| Status shown when Root Guard blocks a port | **BKN / ROOT_Inc (broken / root inconsistent)** |
| How a Root-Guarded port recovers | **Stop superior BPDUs — auto-recovers in ~20s (Max Age)** |
| Where should the SP enable Root Guard? | **On ports facing the customer** |
| Default Max Age timer | **20 seconds** |
| Can Root Guard be enabled in global config? | **No — interface only** |

## ⚡ One-Line Master Recall

**`spanning-tree guard root` on the port → if a superior BPDU arrives, port goes BKN/Root-Inconsistent → when BPDUs stop, port self-heals in ~20 seconds.**

## ➕ EXTRA — not in video, but on the exam

- **BPDU Filter** (Day 21p2) — silently drops BPDUs; pairs differently than Root/BPDU Guard. v1.1 expects you to distinguish all three.
- **Loop Guard** (Day 21p4) — completes the toolkit; protects against unidirectional link failures.
- **UDLD** — partner technology to Loop Guard; detects unidirectional links at L1/L2.

## 🧾 Recap

- **Root Guard = port-level protection** that keeps the elected root inside *your* control.
- Triggered by **superior BPDU** → port enters **broken / root-inconsistent** state.
- Configured **only at interface level** with `spanning-tree guard root` (no global option).
- **Auto-recovers** — no errdisable handling needed.
- If you can explain when to use Root Guard vs BPDU Guard vs Loop Guard, move to Day 21 part 4.

---
Source: Jeremy's IT Lab — Day 21 (part 3) — https://www.youtube.com/watch?v=2XE_PgkvSic
