#!/bin/bash
# Weekly link checker for CCNA study site
# Checks all external URLs in core.html for 404s/dead links
# Usage: bash scripts/check-links.sh

set -euo pipefail
cd "$(dirname "$0")/.."

echo "=== CCNA Link Checker ==="
echo "Checking external URLs in core.html..."
echo ""

# Extract all external URLs (non-YouTube, non-GitHub)
urls=$(grep -oE "https?://[^'\">\s]+" core.html \
  | grep -v 'youtube.com' \
  | grep -v 'rpatino-cw.github.io' \
  | grep -v 'fonts.googleapis' \
  | sort -u)

total=$(echo "$urls" | wc -l | tr -d ' ')
echo "Found $total unique external URLs to check"
echo ""

broken=0
checked=0

while IFS= read -r url; do
  checked=$((checked + 1))
  status=$(curl -sL -o /dev/null -w "%{http_code}" --max-time 10 "$url" 2>/dev/null || echo "000")

  if [ "$status" -ge 400 ] || [ "$status" = "000" ]; then
    echo "  BROKEN [$status] $url"
    broken=$((broken + 1))
  fi

  # Progress every 20 URLs
  if [ $((checked % 20)) -eq 0 ]; then
    echo "  ... checked $checked/$total"
  fi
done <<< "$urls"

echo ""
echo "=== Results ==="
echo "Checked: $checked"
echo "Broken:  $broken"
echo "Working: $((checked - broken))"

if [ "$broken" -gt 0 ]; then
  echo ""
  echo "ACTION: Remove or replace broken links before next push"
  exit 1
fi

echo "All links OK"
