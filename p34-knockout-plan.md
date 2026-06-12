# P3 + P4 Knockout — Plan

> One campaign to clear all 26 low-tier pillars Romeo neglects.
> Decision: **new dedicated page**, **recognize-level depth**.
> Date: 2026-06-12. Repo: `rpatino-cw/CCNA-study`.

## Why this exists

P1-P4 are **value tiers**, not domains. P3 (tier factor 0.45) + P4 (0.25) = 26 pillars,
low exam weight, currently skipped. They are **declarative recall** topics: confusable
pairs, small number sets, "which protocol does X." Not config, not math. So the right tool
is spaced recall on confusable facts, NOT more sims (app already has 200+).

App doctrine already states the target depth (`pillars-trainer.html`):
- **P3** = recognize the scenario, one clean flashcard pass.
- **P4** = one fact apiece, save for the night before.

Gap = no single artifact that walks all 26 in one guided campaign. This page is that artifact.

## Source of truth (reuse, do not rebuild)

- `data/pillars-data.js` — all 46 pillars, tier/obj/dom/freq/title/bullets. Read 26 at runtime by `tier==='P3'||'P4'`.
- `data/pillar-checks.js` — MCQ drill engine. **Covers 13 of 26.** Reuse as-is.
- `pillars-trainer.html` — tier badge CSS + grouping logic to copy.

## The 5 clusters (grouped by shared cognitive structure)

Not 26 linear (overload). Five coherent sittings, each reinforces itself.

| # | Cluster | Pillars | Hook |
|---|---------|---------|------|
| 1 | Mgmt-plane services | NTP, DHCP/DNS, SNMP, Syslog 0-7, TFTP/FTP | ports + roles + numbers |
| 2 | Security concepts | threats, AAA, wireless-sec, sec-program, password/MFA, IPsec | confusable pairs + definitions |
| 3 | Automation (D6) | SDN, REST APIs, Ansible/Terraform, JSON, AI/ML | pure concept, modern stack |
| 4 | Physical foundations | cable issues, cabling types, topology arch, IP-params, virtualization, switching/MAC | recognize the scenario |
| 5 | Discovery / access | CDP/LLDP, wireless arch, device-mgmt access, RFC1918 | the classic exam pairs |

Each cluster block renders: **confusable-pair contrast** + **the numbers** + **one-line fact**,
then fires the existing MCQ check for that pillar. "Knockout" = recognize-level pass on all 26.

## The 13 missing MCQ checks (recognize-level stubs to author)

These pillar numbers have no `PILLAR_CHECKS` entry. Author one MCQ `concept` item each
(stem + 4 choices + answer + 1-line explain). Recognize-level only, not full multi-dim.

```
#25 P3 D2 2.6-2.7  Wireless arch + WLAN physical
#31 P3 D5 5.1      Threats / vulnerabilities / exploits
#34 P4 D1 1.2      Topology architectures
#35 P4 D1 1.3      Cabling types
#36 P4 D1 1.10     IP params per OS
#37 P4 D1 1.12     Virtualization
#38 P4 D4 4.9      TFTP / FTP
#39 P4 D5 5.2      Security program elements
#40 P4 D5 5.4      Password policy / MFA / certs
#41 P4 D5 5.5      IPsec VPN
#42 P4 D6 6.1-6.3  SDN / controller architecture
#45 P4 D6 6.7      JSON components
#46 P4 D6 6.4      AI / ML in network ops
```

## Learning-science engine (added 2026-06-12 per Romeo)

The page is not a cheat sheet. It teaches via active methods:

| Method | Mechanic |
|--------|----------|
| Active recall | FACT hidden behind a flip. Retrieve first, reveal, self-grade (Got it / Missed). |
| Interleaving | "Interleave all 26" drill: MCQs shuffled across all 5 clusters, not blocked. |
| Spacing | Leitner boxes (1-5) in localStorage. Missed -> box 1 (due now). Right -> box+1 (due later). |
| Connection | Each card shows "connects to" a P1/P2 anchor (RFC1918->NAT, SDN->routing planes, REST->JSON). |
| Testing effect | MCQ per pillar with immediate explain. 13 reused from PILLAR_CHECKS + 13 authored. |

"Cleared" = pillar reaches Leitner box >= 3 (recalled right 3 times). Progress bar + cluster bars derive from box state.
The 13 authored MCQs live LOCAL to the page (KO_Q map) to avoid mutating shared pillar-value scoring data. Reversible.

## Build phases

**Phase 1 — Page shell + data wiring**
- New `p34-knockout.html`. Copy tier-badge CSS + nav from `pillars-trainer.html`.
- At load: read `pillars-data.js`, filter P3+P4, bucket into the 5 clusters (cluster map = small const in page).
- Render 5 collapsible cluster sections, one card per pillar (title + obj + freq + bullets from data).

**Phase 2 — Recall blocks (the teaching layer)**
- Per cluster, add a contrast strip up top: the confusable pairs side-by-side (CDP vs LLDP, TACACS+ vs RADIUS, WPA2 vs WPA3, TFTP vs FTP, syslog 0-7 table, SNMP versions).
- Per pillar card: one-line "THE FACT" + the numbers. Pulled from pillar bullets where present.
- Recall-drill rule: hint at the concept, never print the answer term (per carry-ccna doctrine).

**Phase 3 — Drill engine + the 13 stubs**
- Wire each pillar card's "Check" button to existing `PILLAR_CHECKS[n].concept` MCQ.
- Author the 13 missing `concept` MCQs into `data/pillar-checks.js` (recognize-level).
- Knockout progress: localStorage, one bar, per-cluster + overall %. "Cleared" = all 26 concept dims passed.

**Phase 4 — Wire-in + verify**
- Link from `pillars-trainer.html` and `pillar-value.html` ("Knockout P3+P4" CTA).
- Add to `data/pages-index.json` so search/nav finds it.
- Verify: `/browse` the page, run one cluster end to end, confirm progress persists.

## Scope guards

- Recognize-level ONLY. No config sims, no multi-dim mastery for these tiers. P4 stays "night-before" depth.
- Reuse the MCQ engine; do not invent a new drill format.
- 26 pillars = 5 sittings, not 1. "One shot" = one campaign, not one cram.

## Out of scope

- Rewriting pillars-trainer routing.
- Full multi-dimension (config/sequence/topology) checks for P3/P4.
- New flashcard deck files (this page IS the flashcard pass).
