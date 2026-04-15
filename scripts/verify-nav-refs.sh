#!/bin/bash
# Verify all page references in nav.js exist as actual files
# Catches dead nav links before they hit production
#
# Usage: bash scripts/verify-nav-refs.sh

set -euo pipefail
cd "$(dirname "$0")/.."

echo "Verifying nav.js page references..."

# Extract all href values from CCNA_NAV and NETPLUS_NAV in nav.js
HREFS=$(grep -oE "href: '[^']+'" js/nav.js | sed "s/href: '//;s/'//")

MISSING=0
CHECKED=0

while IFS= read -r href; do
  [ -z "$href" ] && continue
  CHECKED=$((CHECKED + 1))
  if [ ! -f "$href" ]; then
    echo "  MISSING: $href (referenced in nav.js)"
    MISSING=$((MISSING + 1))
  fi
done <<< "$HREFS"

# Also check the cert toggle target pages
for page in core.html netplus.html; do
  if [ ! -f "$page" ]; then
    echo "  MISSING: $page (cert toggle target)"
    MISSING=$((MISSING + 1))
  fi
done

echo "  Checked $CHECKED nav references"

if [ "$MISSING" -gt 0 ]; then
  echo "ERROR: $MISSING nav reference(s) point to missing files"
  exit 1
fi

echo "  All nav references OK"
exit 0
