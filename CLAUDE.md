# CCNA_study

CCNA 200-301 + CompTIA Network+ study system. 60+ interactive HTML pages deployed via GitHub Pages.

**Live site:** https://rpatino-cw.github.io/CCNA-study/

## Git Rules (MANDATORY)

- **Never commit directly to main.** Always create a feature branch and let Romeo review/merge.
- **Never push without explicit permission.** The word "push" must come from Romeo.
- **Never change page content unless asked.** If Romeo is comparing or verifying, don't edit files.
- **Never claim something doesn't exist in git.** If a search returns empty, say "I haven't found it yet" and try a different approach. Check ALL commits, not a sample.

## Project Notes

- `core.html` — main landing page (redirected from index.html)
- `css/shared.css` — global styles, affects every page
- `js/nav.js` — shared navigation with CCNA/Net+ cert toggle
- Don't modify PDFs
- Goal: pass the CCNA exam

## Auto-changelog

Pre-push hook (`hooks/pre-push`) auto-bumps the version and updates `changelog.html` on every push. Script: `scripts/auto-changelog.sh`.
