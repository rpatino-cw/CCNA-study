#!/bin/bash
# ══════════════════════════════════════════════════════════════════
# OBJECTIVES INTEGRITY TEST
# Verifies that exam objective text in objectives.html and
# netplus-objectives.html has not been modified since lockdown.
#
# Hashes are SHA-256 of the raw DOMAINS array block extracted
# from each file. ANY change to objective text, IDs, weights,
# or domain names will cause a hash mismatch and test failure.
#
# Source of truth:
#   CCNA:  200-301-CCNA-v1.1.pdf (2024 Cisco Systems)
#   Net+:  N10-009-exam-objectives.pdf V9 (2023 CompTIA)
#
# Last verified against PDFs: 2026-04-14
# ══════════════════════════════════════════════════════════════════

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Known-good SHA-256 hashes of DOMAINS array blocks
CCNA_EXPECTED="eecddeada5edcb3c9f28502fae688ff0eadfde54c34876422a212437784b027c"
NETPLUS_EXPECTED="2783e57d32412de02c5eb48e4720e02ba5d20c605d2d91031e2af92b1e850225"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

errors=0

extract_domains_hash() {
    local file="$1"
    # Extract everything between "var DOMAINS = [" and the closing "];"
    sed -n '/var DOMAINS = \[/,/^  \];/p' "$file" | shasum -a 256 | awk '{print $1}'
}

echo "============================================"
echo "  EXAM OBJECTIVES INTEGRITY CHECK"
echo "============================================"
echo ""

# --- CCNA ---
CCNA_FILE="$PROJECT_DIR/objectives.html"
if [ ! -f "$CCNA_FILE" ]; then
    echo -e "${RED}FAIL${NC}: objectives.html not found"
    errors=$((errors + 1))
else
    CCNA_HASH=$(extract_domains_hash "$CCNA_FILE")
    if [ "$CCNA_EXPECTED" = "NEEDS_BASELINE" ]; then
        echo -e "${YELLOW}BASELINE${NC}: CCNA hash = $CCNA_HASH"
        echo "  Update CCNA_EXPECTED in this script with the hash above."
    elif [ "$CCNA_HASH" = "$CCNA_EXPECTED" ]; then
        echo -e "${GREEN}PASS${NC}: CCNA 200-301 objectives intact"
    else
        echo -e "${RED}FAIL${NC}: CCNA objectives have been modified!"
        echo "  Expected: $CCNA_EXPECTED"
        echo "  Got:      $CCNA_HASH"
        echo "  Source:   200-301-CCNA-v1.1.pdf"
        errors=$((errors + 1))
    fi
fi

# --- Network+ ---
NETPLUS_FILE="$PROJECT_DIR/netplus-objectives.html"
if [ ! -f "$NETPLUS_FILE" ]; then
    echo -e "${RED}FAIL${NC}: netplus-objectives.html not found"
    errors=$((errors + 1))
else
    NETPLUS_HASH=$(extract_domains_hash "$NETPLUS_FILE")
    if [ "$NETPLUS_EXPECTED" = "NEEDS_BASELINE" ]; then
        echo -e "${YELLOW}BASELINE${NC}: Net+ hash = $NETPLUS_HASH"
        echo "  Update NETPLUS_EXPECTED in this script with the hash above."
    elif [ "$NETPLUS_HASH" = "$NETPLUS_EXPECTED" ]; then
        echo -e "${GREEN}PASS${NC}: Network+ N10-009 objectives intact"
    else
        echo -e "${RED}FAIL${NC}: Network+ objectives have been modified!"
        echo "  Expected: $NETPLUS_EXPECTED"
        echo "  Got:      $NETPLUS_HASH"
        echo "  Source:   N10-009-exam-objectives.pdf"
        errors=$((errors + 1))
    fi
fi

echo ""

# --- Objective count check ---
CCNA_COUNT=$(grep -c "id:'" "$CCNA_FILE" 2>/dev/null | head -1 || echo 0)
# Subtract domain-level entries (6 domains)
CCNA_OBJ=$((CCNA_COUNT - 6))
if [ "$CCNA_OBJ" -eq 53 ]; then
    echo -e "${GREEN}PASS${NC}: CCNA objective count = 53"
else
    echo -e "${RED}FAIL${NC}: CCNA objective count = $CCNA_OBJ (expected 53)"
    errors=$((errors + 1))
fi

NETPLUS_COUNT=$(grep -c "id:'" "$NETPLUS_FILE" 2>/dev/null | head -1 || echo 0)
NETPLUS_OBJ=$((NETPLUS_COUNT - 5))
if [ "$NETPLUS_OBJ" -eq 25 ]; then
    echo -e "${GREEN}PASS${NC}: Net+ objective count = 25"
else
    echo -e "${RED}FAIL${NC}: Net+ objective count = $NETPLUS_OBJ (expected 25)"
    errors=$((errors + 1))
fi

echo ""
if [ "$errors" -gt 0 ]; then
    echo -e "${RED}$errors CHECK(S) FAILED${NC}"
    echo "DO NOT push — objectives must match the official PDFs exactly."
    exit 1
else
    echo -e "${GREEN}ALL CHECKS PASSED${NC}"
    exit 0
fi
