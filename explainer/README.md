# CCNA App — Explainer

Visual documentation for the CCNA 200-301 study app. Open `index.html` in a browser.

## What's in here

| File | Purpose |
|------|---------|
| `index.html` | Hub. Animated SVG system map + 5-layer architecture overview + stat cards. |
| `architecture.html` | Folder tree, Mermaid module dependency graph, JS module reference table, script load order. |
| `data-flow.html` | Animated quiz round-trip pipeline, EMA proficiency math + live demo, mastery state machine animation, FSRS, cross-tab sync sequence diagram. |
| `user-journey.html` | Master Mermaid flowchart with branch logic, 4 archetype paths (cold start / daily warm-up / deep work / exam week), animated session spotlight, page → JS dependency table. |
| `files-catalog.html` | Searchable / filterable table of every file (130+) — type chips + live search. |
| `mastery-engine.html` | Deep dive on the 3-layer brain: EMA + state machine + FSRS. Includes interactive picker simulator with weighted topic selection. |

## How to view

Local: `open ~/dev/CCNA_study/explainer/index.html`

Live (after deploy): `https://rpatino-cw.github.io/CCNA-study/explainer/`

## Stack

- Pure HTML + CSS + vanilla JS (matches parent app — zero build step)
- Mermaid 11 (CDN) for flowcharts and sequence diagrams
- Inline SVG for animated system maps and pipelines
- Same design tokens as the parent app: warm `#FAF7F2` bg, amber `#B45309` accent, Space Grotesk + Source Serif 4 + JetBrains Mono

## Updating

This explainer is a snapshot dated 2026-04-29. When the app changes substantially:

1. Re-count files: `ls *.html | wc -l` and update stats on `index.html`
2. If new JS module added: append row in `architecture.html` reference table + `files-catalog.html`
3. If new HTML page added: add row in `files-catalog.html` and consider adding to `user-journey.html` flowchart
4. If mastery thresholds change: update tables in `mastery-engine.html` and `data-flow.html`

## Source data

Every claim in these pages is grounded in actual files at `~/dev/CCNA_study/`:

- File counts come from `ls`, line counts from `wc -l`
- EMA formula taken verbatim from `js/store.js:25,53-58`
- State names from `js/store.js:17-23`
- Script load pattern from project `CLAUDE.md`
- Pre-push hook details from project `CLAUDE.md`
