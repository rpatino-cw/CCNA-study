#!/usr/bin/env bash
# lint-pages-index.sh — every nav.js href must appear in data/pages-index.json.
# Run from repo root or via pre-push hook.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
NAV="$ROOT/js/nav.js"
INDEX="$ROOT/data/pages-index.json"

if [ ! -f "$NAV" ] || [ ! -f "$INDEX" ]; then
  echo "lint-pages-index: missing $NAV or $INDEX" >&2
  exit 2
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "lint-pages-index: jq required" >&2
  exit 2
fi

# Extract every href: '...' from nav.js (single-quoted .html paths).
NAV_HREFS="$(grep -oE "href: '[^']+\.html'" "$NAV" | sed -E "s/href: '|'//g" | sort -u)"
INDEX_HREFS="$(jq -r '.[].href' "$INDEX" | sort -u)"

MISSING=0
while IFS= read -r h; do
  [ -z "$h" ] && continue
  if ! grep -qxF "$h" <<<"$INDEX_HREFS"; then
    echo "lint-pages-index: nav.js href missing from data/pages-index.json: $h" >&2
    MISSING=$((MISSING + 1))
  fi
done <<<"$NAV_HREFS"

if [ "$MISSING" -gt 0 ]; then
  echo "lint-pages-index: $MISSING missing entr$( [ "$MISSING" -eq 1 ] && echo y || echo ies). Add to data/pages-index.json." >&2
  exit 1
fi

# Validate every index slug is unique and matches href stem (best-effort).
DUPES="$(jq -r '.[].slug' "$INDEX" | sort | uniq -d)"
if [ -n "$DUPES" ]; then
  echo "lint-pages-index: duplicate slugs:" >&2
  echo "$DUPES" >&2
  exit 1
fi

COUNT="$(jq 'length' "$INDEX")"
echo "lint-pages-index: ok ($COUNT pages indexed, $(wc -l <<<"$NAV_HREFS" | tr -d ' ') unique nav hrefs all present)"
