# CCNA_study

CCNA 200-301 + CompTIA Network+ study system. 60+ interactive HTML pages deployed via GitHub Pages.

**Live site:** https://rpatino-cw.github.io/CCNA-study/

## Git Rules

- **Never change page content unless asked.** If Romeo is comparing or verifying, don't edit files.
- **Never claim something doesn't exist in git.** If a search returns empty, say "I haven't found it yet" and try a different approach. Check ALL commits, not a sample.

## Project Notes

- `core.html` — main landing page (redirected from index.html)
- `css/shared.css` — global styles, affects every page
- `js/nav.js` — shared navigation with CCNA/Net+ cert toggle
- Don't modify PDFs
- Goal: pass the CCNA exam

## Script Loading Pattern (MANDATORY)

All pages use `defer` + `DOMContentLoaded` for performance:

```html
<!-- External scripts: always defer -->
<script defer src="js/store.js"></script>

<!-- Short config (< 200 chars): inline, NO wrapper (runs before deferred scripts) -->
<script>window.masteryConfig={...};</script>

<!-- App logic (> 200 chars): wrap in DOMContentLoaded -->
<script>document.addEventListener('DOMContentLoaded',function(){
  // ... application code that uses globals from deferred scripts
});</script>
```

Execution order: inline configs → deferred scripts (in order) → DOMContentLoaded handlers.

## Font Loading

Fonts load from `<link>` tags in HTML `<head>`, NOT from CSS `@import`. Every page must have:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=...&display=swap">
<link rel="stylesheet" href="css/shared.css">
```

## Auto-changelog

Pre-push hook (`hooks/pre-push`) auto-bumps the version and updates `changelog.html` on every push. Script: `scripts/auto-changelog.sh`.

## Pre-push Checks

The pre-push hook runs (in order): auto-changelog, lint checks, exam integrity, nav refs, smoke tests, nav click-tests, visual regression, and Lighthouse CI audit. Lighthouse blocks push if perf < 70, a11y < 85, or best-practices < 80.
