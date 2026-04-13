# Changelog

## v3.1.0 — April 13, 2026

### New Games (6)
- **Lab Duels** — 1v1 multiplayer competitive labs. Create a duel, share the code, race to complete objectives. Real-time opponent progress tracking via 2s polling. Winner/loser screen with XP bonus.
- **Bug Hunt** — 3 troubleshooting labs with pre-broken configs. Diagnose with `show` commands, find the bugs, fix them. Easy (1 bug), Medium (3 bugs), Hard (5 bugs). Works solo or as a duel.
- **Explain Like I'm Cisco** — AI-judged concept explanation game. 33 topics, 60-second timer, Gemini scores on Accuracy/Completeness/Clarity/Terminology (0-5 each). Letter grades + instructor feedback. Pure recall — no multiple choice.
- **What's Wrong?** — Output reading game. 35 scenarios showing real `show` command output with injected errors. 10-second timer per round, 15 rounds per game. Domain + difficulty filters.
- **Config Speedrun** — IOS command typing drill. 50 commands, accepts abbreviations. Timer tracks total speed. localStorage leaderboard.
- **Daily Challenge** — One puzzle per day, same for everyone (date-seeded). Rotates between What's Wrong, Speedrun, and Quick Config. One-play-per-day lock. Study group leaderboard. Daily streak tracking.

### Gamification
- **XP Toasts** — Floating "+N XP" notification on every proficiency change across all pages. Gold animated pill with topic label. "Undo" link to revert accidental clicks.
- **Level-Up Celebrations** — Centered overlay when crossing tier thresholds (Newbie → Student → Practitioner → Associate → Engineer). XP calculated from quizzes + readiness + streak + study time.
- **Gamified Study Group** — Animated readiness rings (SVG, color-coded), streak flames (CSS animated fire), 14-day activity sparklines, XP + level badges per member, domain radar charts (individual + overlay comparison).

### Data Safety
- **Auto-backup system** — Silent cloud backup via Cloudflare KV on every localStorage write. localStorage.setItem override catches ALL writes. 365-day TTL. Change-detection hash to skip redundant pushes.
- **Full group backup** — Every sync pushes complete localStorage dump to group KV (`fullBackup` field alongside existing `progress`). Quiz history + diagnostic history capped at last 50 entries.
- **Recovery banner** — Centered overlay for returning users with empty localStorage. Three options: auto-restore from cloud, recover from study group (code + name), or start fresh.
- **"How Your Data Works" section** — Transparency card on Study Group page explaining the $0 architecture (GitHub Pages + CF Workers free tier), device transfer instructions, recovery info card with group code + name.
- **Group-based full recovery** — Enter group code + display name → pulls `fullBackup` → hydrates complete localStorage. Cross-device, cross-browser.

### Network Lab
- **5 config labs** replacing Packet Race — Basic Switch, Trunk + Inter-VLAN, OSPF Multi-Router, ACL + NAT, Full Enterprise. SVG topologies with clickable devices, multi-device terminals, objective validation.
- **Duel mode** on all labs — "Duel" button per lab, shared session codes, opponent progress panel.

### CORE Page Improvements
- **Speed Run default** for returning users — only weak objectives shown, auto-expanded
- **Merged banners** — continue + review due combined into one "action card"
- **Collapsible domain heatmap** — closed for returning users
- **Auto-master at 70%** — unified mastered checkbox + proficiency tracking
- **Domain quiz badge** — shows "X/N objectives at 70%+" instead of "master all to unlock"
- **Weak Only filter fixed** — empty domain sections now hidden, not just empty shells

### Learn Visually Overhaul
- **48 visual cards** (39 existing + 9 new: VLSM, Wildcard Masks, DHCP Snooping/DAI, 802.1X/RADIUS, IPsec VPN, Static/Floating Routes, IPv6 SLAAC/NDP, RSTP States, WPA2/WPA3)
- **Proficiency badges** per card (red/amber/green/gray)
- **Domain sections** sorted by exam weight with percentage labels
- **"Needs Work" default** for returning users
- **Collapsible groups** for related visuals (9 groups)
- **"Quiz me" link** on every card → quiz.html?topic=X.X
- **"Check Yourself" modal** — 1 random question per card, updates proficiency
- **Search filter** across all cards
- **Exam-focused descriptions** on all 48 cards

### Other
- Book reader fix — chapter links highlight + toast on GitHub Pages
- Guide page TOC with 24 section links
- Exam objectives — direct CCNA PDF download link from Cisco
- Worker /health endpoint returns Gemini + KV status
- Pre-push hook catches `[object Object]` in HTML/JS
- Stale study.html links fixed across all pages

## v2.0.0 — April 2026

### Major Features
- **Unified Study & Quiz** — Quiz + Daily Study merged into one page with "Learn First" mode
- **Speed Run mode** — CORE filter for objectives below 70%
- **Quick Path per objective** — watch → quiz → 70% → move on
- **Floating group chat + online presence + DMs**
- **Packet Tracer integration** — "Build in PT" on all 11 labs + AI live build
- **Site-wide cert awareness** for Network+
- **379 questions** — 162 new hard scenario/troubleshooting questions
- **Progress backup/restore** — JSON export/import + group recovery

### Improvements
- Book reader, guide redesign, study schedule, Mark Complete buttons, PT status indicator, worker /health, CORS fix, exam objective PDF links

## v1.0.2 — April 2026 (initial)

- 53 CCNA objectives on CORE page with videos, books, articles
- Study Group with activity feed, schedule, chat, leaderboard
- Exam Simulator (50Q timed mock)
- 260+ glossary terms with quiz mode
- 12 console labs with IOS terminal simulator
- 9 Packet Tracer lab guides
- Network+ hub with cert track toggle
- 3D CIDR Explorer and 3D Network Topology
- AI Tutor powered by Gemini
