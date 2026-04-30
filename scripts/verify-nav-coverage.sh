#!/bin/bash
# Verify every site HTML page mounts the shared nav.
#
# Each page must:
#   1) contain a <nav class="top-nav"> mount point (the selector nav.js queries), AND
#   2) load js/nav.js (the script that fills the mount).
#
# A small whitelist exempts pages that intentionally have no nav:
#   - redirect-only pages (meta http-equiv="refresh")
#   - print/embed/standalone fragments
#
# Usage: bash scripts/verify-nav-coverage.sh
# Exit code: 0 = all clear, 1 = one or more pages missing nav.

set -euo pipefail
cd "$(dirname "$0")/.."

# ── whitelist (relative paths, basename-matched) ──────────────────────
# Add any file that should NOT have a nav. Keep this list tight.
NO_NAV_OK=(
  "index.html"          # redirect to core.html
  "404.html"            # GitHub Pages 404 fallback (if present)
  "qr.html"             # standalone QR (if present)
  "embed.html"          # iframe embeds (if present)
  "print.html"          # printer-friendly view (if present)
)

is_whitelisted() {
  local f="$(basename "$1")"
  for w in "${NO_NAV_OK[@]}"; do
    if [ "$f" = "$w" ]; then return 0; fi
  done
  return 1
}

# Pages with explicit redirect get a free pass.
is_redirect() {
  grep -q 'http-equiv="refresh"' "$1" 2>/dev/null
}

# ── collect candidate pages ───────────────────────────────────────────
PAGES=$(find . -name "*.html" \
  -not -path "./worktrees/*" \
  -not -path "./node_modules/*" \
  -not -path "./.git/*" \
  -not -path "./books/*" \
  -not -path "./exports/*" \
  -not -path "./regression/*" \
  -not -path "./.cache/*" \
  -not -path "./scripts/*" \
  -not -path "./hooks/*" \
  | sort)

CHECKED=0
MISSING=0
SKIPPED=0
OFFENDERS=""

while IFS= read -r f; do
  [ -z "$f" ] && continue
  if is_whitelisted "$f" || is_redirect "$f"; then
    SKIPPED=$((SKIPPED + 1))
    continue
  fi
  CHECKED=$((CHECKED + 1))

  has_mount=0
  has_script=0
  grep -q 'class="top-nav"' "$f" && has_mount=1
  grep -qE 'src="(\.\./)*js/nav\.js' "$f" && has_script=1

  if [ "$has_mount" -eq 0 ] || [ "$has_script" -eq 0 ]; then
    why=""
    [ "$has_mount" -eq 0 ] && why="${why}no <nav class=\"top-nav\"> mount"
    [ "$has_script" -eq 0 ] && why="${why}${why:+; }no js/nav.js script"
    OFFENDERS="${OFFENDERS}${f} -- ${why}
"
    MISSING=$((MISSING + 1))
  fi
done <<EOF
$PAGES
EOF

# ── report ────────────────────────────────────────────────────────────
echo "Nav coverage: checked $CHECKED pages, skipped $SKIPPED whitelisted/redirect"

if [ "$MISSING" -gt 0 ]; then
  echo "ERROR: $MISSING page(s) missing the shared nav:"
  printf '%s' "$OFFENDERS" | sed 's/^/  - /'
  echo ""
  echo "Fix: add <nav class=\"top-nav\"></nav> right after <body>,"
  echo "     and <script defer src=\"js/nav.js\"></script> (use ../ prefix in subdirs)."
  echo "     Standalone pages can be added to the NO_NAV_OK list in this script."
  exit 1
fi

echo "All $CHECKED pages mount the shared nav."
exit 0
