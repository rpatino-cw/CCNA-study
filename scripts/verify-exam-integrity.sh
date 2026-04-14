#!/bin/bash
# verify-exam-integrity.sh — Detects if exam blueprint PDFs changed
# If a PDF hash doesn't match, the objectives page MUST be re-verified
# against the new PDF before pushing. No exceptions.
#
# Usage: bash scripts/verify-exam-integrity.sh
# Hook: runs as pre-commit (see .git/hooks/pre-commit)

set -euo pipefail
cd "$(dirname "$0")/.."

INTEGRITY="scripts/exam-integrity.json"
FAIL=0

if [ ! -f "$INTEGRITY" ]; then
  echo "FAIL: $INTEGRITY not found"
  exit 1
fi

check_pdf() {
  local name="$1"
  local pdf=$(python3 -c "import json; d=json.load(open('$INTEGRITY')); print(d['sources']['$name']['pdf'])")
  local expected=$(python3 -c "import json; d=json.load(open('$INTEGRITY')); print(d['sources']['$name']['hash'])")
  local page=$(python3 -c "import json; d=json.load(open('$INTEGRITY')); print(d['sources']['$name']['page'])")
  local verified=$(python3 -c "import json; d=json.load(open('$INTEGRITY')); print(d['sources']['$name']['verified'])")

  if [ ! -f "$pdf" ]; then
    echo "WARN: $pdf not found — skipping $name check"
    return
  fi

  local actual=$(shasum -a 256 "$pdf" | awk '{print $1}')

  if [ "$actual" != "$expected" ]; then
    echo ""
    echo "!! EXAM PDF CHANGED: $name"
    echo "   PDF:      $pdf"
    echo "   Expected: $expected"
    echo "   Actual:   $actual"
    echo "   Page:     $page"
    echo "   Last verified: $verified"
    echo ""
    echo "   ACTION REQUIRED:"
    echo "   1. Read the new PDF cover to cover"
    echo "   2. Diff every objective in $page against the PDF"
    echo "   3. Update $page to match word-for-word"
    echo "   4. Update the hash + date in $INTEGRITY"
    echo "   5. Then commit"
    echo ""
    FAIL=1
  else
    echo "OK: $name — $pdf matches (verified $verified)"
  fi
}

echo "=== Exam Blueprint Integrity Check ==="
echo ""
check_pdf "ccna"
check_pdf "netplus"
echo ""

if [ $FAIL -ne 0 ]; then
  echo "BLOCKED: Exam PDF changed but objectives page not re-verified."
  echo "Do NOT push until objectives match the new PDF."
  exit 1
fi

echo "All exam objectives verified against source PDFs."
