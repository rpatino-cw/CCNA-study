#!/usr/bin/env bash
# verify-tutor-coverage.sh — every site page must include the AI tutor chat box.
# Each .html in the app surface must reference tutor.js. Exclusions are listed below.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# Pages intentionally without the floating tutor:
#   chat.html               — the dedicated full-page tutor itself
#   regression/*.test.html  — Playwright/Vitest fixtures
#   external/*              — third-party drops
#   worktrees/*             — git worktree branches (ephemeral)
#   worker/*                — Cloudflare worker source, not served
#   ekere-labs/index.html   — TWA-only mobile shell, has its own UI
EXCLUDES_REGEX='^(chat\.html|regression/|external/|worktrees/|worker/|node_modules/|ekere-labs/index\.html|ccna-prep/index\.html)'

MISSING=0
while IFS= read -r f; do
  rel="${f#./}"
  [[ "$rel" =~ $EXCLUDES_REGEX ]] && continue
  if ! grep -q "tutor\.js" "$f"; then
    echo "verify-tutor-coverage: missing tutor.js: $rel" >&2
    MISSING=$((MISSING + 1))
  fi
done < <(find . -name "*.html" -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./worker/node_modules/*")

if [ "$MISSING" -gt 0 ]; then
  echo "" >&2
  echo "verify-tutor-coverage: $MISSING page(s) missing the AI chat box." >&2
  echo "  Fix: add  <script defer src=\"js/tutor.js\"></script>  before </body>." >&2
  echo "  Subdir pages use  ../js/tutor.js  instead." >&2
  exit 1
fi

echo "verify-tutor-coverage: ok (all pages mount js/tutor.js)"
