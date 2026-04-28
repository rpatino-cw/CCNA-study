# Phase 1A — status

## Built and committed

Commit `8a2726e` on branch `phase-1a-core-loop`.

### New files
- `js/gemini.js` — key modal, `generate()` with structured-JSON, `scopeValidate()`
- `js/strat-state.js` — localStorage schema (`strat[objId].modes / .eval / .masteryComposite`)
- `js/strat-quiz.js` — 5 modes (terminology, glossary, scenario, command, table) with 3-retry scope-lock
- `js/strat-eval.js` — 8-exchange examiner chat with PASS / FAIL / INCONCLUSIVE verdicts and miss-slug capture
- `js/strat.js` — page bootstrap (URL `?obj=`, masthead, mastery, side rail, mode unlock gate)
- `data/transcript-objective-map.json` — objective 1.1 entry with forbidden-terms list
- `data/jeremy-transcripts/clean/day-012.txt` — hand-curated transcript covering routers/forwarding (745 words, 9 anchored paragraphs)
- `scripts/build-transcripts.js` — validator + manifest emitter
- `scripts/strat-smoke.js` — Playwright smoke harness for the page

### Modified files
- `strat.html` — inline CSS removed; uses `css/shared.css` tokens; added nav + script tags + `#strat-drawer` mount
- `css/shared.css` — added `.strat-page`, `.side-rail`, `.flow.active`, `.mode-pill`, `.action-line`, `.eval-pane`, `.gem-modal`, footnote tokens
- `js/store.js` — added read-only `getStrat / getStratObj / getStratComposite` mirrors
- `js/nav.js` — `Strat (drill)` entry in the Plan dropdown
- `index.html` — quick-link block including strat
- `.gitignore` — whitelisted hand-curated transcripts under `data/jeremy-transcripts/clean/`

## Verified locally

- `node scripts/build-transcripts.js` → 1.1 passes (745 words, 9 anchors).
- Headless Playwright load of `http://localhost:8082/strat.html?obj=1.1`:
  - 4 side-rail dots, 5 mode pills, 0 console errors, 0 page errors, no error banner
  - Gemini key modal appears on first visit
  - `#strat-drawer` mount exists, hidden
  - Nav populated (12 entries)
- No `console.log` left in new files. No `[object Object]` strings. No `AIza` literals.

## Blocker — push and PR pending Romeo

`git push -u origin phase-1a-core-loop` was attempted three times and each
attempt failed because the harness sandbox denies write access to
`~/.config/gh/config.yml` (the GitHub CLI credential store) and refuses
the explicit bypass for `git push`. The commit is sitting locally on the
branch.

### To complete the ship sequence

```bash
cd /Users/rpatino/dev/CCNA_study/worktrees/phase-1a-core-loop
git push -u origin phase-1a-core-loop
gh pr create --base main --head phase-1a-core-loop \
  --title "Phase 1A — strat.html interactive (Gemini + state + 5 modes + eval)" \
  --body-file PHASE-1A-STATUS.md
```

Plan instruction is explicit: **do not ship-to-main**. Romeo merges manually after review.

## What I did NOT do (per plan, deferred to later phases)

- `#strat-drawer` is a hidden stub. Phase 1C populates it from `data-drawer-open` / `data-drawer-id` attrs (already wired on footnote anchors).
- Only objective 1.1 is in the transcript-objective-map. Phase 1B/1D backfill more objectives.
- No real Gemini API key is present in the repo. The first run prompts the user to paste one.

## Live API path

The Gemini live calls (quiz generation + eval grading) cannot be exercised
from the smoke test without a real key. The full path was unit-traced:
generate → schema → scopeValidate → state.setMode/setEval. Romeo's manual
verification step in the plan covers this end-to-end with a real key.
