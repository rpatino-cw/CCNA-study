# Changelog

## v2.0.0 — April 2026

### Major Features
- **Unified Study & Quiz** — Quiz + Daily Study merged into one page. "Learn First" shows lesson content (key points, commands, tips) before the quiz. Recommendation algorithm suggests your weakest unseen topic.
- **Speed Run mode** — CORE filter showing only objectives below 70%, auto-expanded with Quick Path only. Pure "what's left to pass" view.
- **Quick Path per objective** — Every CORE objective shows a 3-step box: watch video, take quiz, score 70%+, move on. Full resources collapsed behind toggle.
- **Floating group chat + online presence** — Right-side bar on every page showing who's online (green dot). Expandable chat panel with 5s polling.
- **1-on-1 DMs** — Click a member's dot to open private conversation.
- **Packet Tracer integration** — "Build in Packet Tracer" buttons on all 11 lab pages. Browser talks to PT via local bridge at localhost:54321.
- **AI Tutor + PT live build** — Ask the AI "build me a VLAN topology" and it materializes in Packet Tracer.
- **Site-wide cert awareness** — Net+ users see CCNA-only content dimmed across glossary, subnetting, console labs, learn visually, and CORE.
- **379 questions** — 162 new hard questions (scenario/troubleshooting/multi-concept). Minimum 10 per topic quiz.
- **Progress backup/restore** — Export all study data as JSON. Recover account via group code + name.

### Improvements
- Book reader shows reference cards + TOC on GitHub Pages instead of blank page
- Guide page redesigned with table of contents, category labels, exam objectives callout
- Study schedule grid shows member colors, initials, hover tooltips, session suggestions
- Mark Complete buttons on all PT lab pages
- PT connection status indicator on labs index
- Worker /health endpoint for monitoring
- AI chat CORS fixed for all GitHub Pages visitors
- Exam objectives page: direct PDF download links for both CCNA and Network+

### Fixes
- Sync heartbeat fires on all pages (not just pages with store.js)
- Chat messages no longer show "?" for names
- Old broken messages filtered from chat display

## v1.0.2 — April 2026 (initial)

- 53 CCNA objectives on CORE page with videos, books, articles
- Study Group with activity feed, schedule, chat, leaderboard
- Packet Race 3D multiplayer game
- Exam Simulator (50Q timed mock)
- 260+ glossary terms with quiz mode
- 12 console labs with IOS terminal simulator
- 9 Packet Tracer lab guides
- Network+ hub with cert track toggle
- 3D CIDR Explorer and 3D Network Topology
- AI Tutor powered by Gemini
