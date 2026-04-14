#!/bin/bash
# verify-exam-integrity.sh — Full data integrity check for the CCNA study site.
#
# Three layers of checks:
#   1. EXAM BLUEPRINTS — PDF hash changed? BLOCKS commit.
#   2. SYNC PAIRS — One file in a pair changed but not the other? BLOCKS commit.
#   3. DATA FILES — Any data file hash changed? WARNS (doesn't block).
#
# Usage:
#   bash scripts/verify-exam-integrity.sh          # full check
#   bash scripts/verify-exam-integrity.sh --rehash  # update all hashes to current
#
# Hook: wired into .git/hooks/pre-commit

set -euo pipefail
cd "$(dirname "$0")/.."

INTEGRITY="scripts/exam-integrity.json"
BLOCKER=0
WARNINGS=0

if [ ! -f "$INTEGRITY" ]; then
  echo "FAIL: $INTEGRITY not found"
  exit 1
fi

# ── Helper: read a JSON field with python3 ──────────────────────────
jq_py() {
  python3 -c "import json,sys; d=json.load(open('$INTEGRITY')); print($1)"
}

# ── --rehash mode: update all hashes to current state ───────────────
if [ "${1:-}" = "--rehash" ]; then
  echo "=== Rehashing all files ==="
  python3 << 'PYEOF'
import json, subprocess, datetime

with open("scripts/exam-integrity.json") as f:
    d = json.load(f)

today = datetime.date.today().isoformat()

# Rehash exam blueprints
for name, info in d.get("exam_blueprints", {}).items():
    pdf = info["pdf"]
    try:
        h = subprocess.check_output(["shasum", "-a", "256", pdf]).decode().split()[0]
        info["hash"] = h
        info["verified"] = today
        print(f"  {name}: {pdf} -> {h[:16]}...")
    except Exception as e:
        print(f"  {name}: SKIP ({e})")

# Rehash data files
for name, info in d.get("data_files", {}).items():
    f = info["file"]
    try:
        h = subprocess.check_output(["shasum", "-a", "256", f]).decode().split()[0]
        info["hash"] = h
        info["updated"] = today
        print(f"  {name}: {f} -> {h[:16]}...")
    except Exception as e:
        print(f"  {name}: SKIP ({e})")

with open("scripts/exam-integrity.json", "w") as f:
    json.dump(d, f, indent=2, ensure_ascii=False)
    f.write("\n")

print("\nAll hashes updated. Review changes, then commit.")
PYEOF
  exit 0
fi

echo "=== Data Integrity Check ==="
echo ""

# ── 1. EXAM BLUEPRINTS (BLOCKING) ──────────────────────────────────
echo "-- Exam Blueprints --"
for name in $(python3 -c "import json; d=json.load(open('$INTEGRITY')); print(' '.join(d.get('exam_blueprints',{}).keys()))"); do
  pdf=$(jq_py "d['exam_blueprints']['$name']['pdf']")
  expected=$(jq_py "d['exam_blueprints']['$name']['hash']")
  page=$(jq_py "d['exam_blueprints']['$name']['page']")
  verified=$(jq_py "d['exam_blueprints']['$name']['verified']")

  if [ ! -f "$pdf" ]; then
    echo "   WARN: $pdf not found — skipping"
    continue
  fi

  actual=$(shasum -a 256 "$pdf" | awk '{print $1}')
  if [ "$actual" != "$expected" ]; then
    echo ""
    echo "   !! BLOCKED: $name PDF changed"
    echo "      PDF:      $pdf"
    echo "      Page:     $page"
    echo "      Last OK:  $verified"
    echo "      ACTION:   Re-verify $page against the new PDF word-for-word,"
    echo "               then run: bash scripts/verify-exam-integrity.sh --rehash"
    echo ""
    BLOCKER=1
  else
    echo "   OK: $name — $pdf (verified $verified)"
  fi
done

# ── 2. SYNC PAIRS (BLOCKING) ───────────────────────────────────────
echo ""
echo "-- Sync Pairs --"
python3 << 'PYEOF'
import json, subprocess, sys

with open("scripts/exam-integrity.json") as f:
    d = json.load(f)

pairs = d.get("sync_pairs", [])
fail = False

for a, b in pairs:
    a_exists = True
    b_exists = True
    try:
        a_hash = subprocess.check_output(["shasum", "-a", "256", a]).decode().split()[0]
    except:
        a_exists = False
    try:
        b_hash = subprocess.check_output(["shasum", "-a", "256", b]).decode().split()[0]
    except:
        b_exists = False

    if not a_exists or not b_exists:
        print(f"   WARN: Missing file in pair ({a}, {b}) — skipping")
        continue

    # Check if either file changed from its stored hash
    a_key = None
    b_key = None
    for name, info in d.get("data_files", {}).items():
        if info["file"] == a:
            a_key = name
        if info["file"] == b:
            b_key = name

    if not a_key or not b_key:
        continue

    a_stored = d["data_files"][a_key]["hash"]
    b_stored = d["data_files"][b_key]["hash"]
    a_changed = (a_hash != a_stored)
    b_changed = (b_hash != b_stored)

    if a_changed and not b_changed:
        print(f"   !! OUT OF SYNC: {a} changed but {b} didn't")
        print(f"      Update both files, then --rehash")
        fail = True
    elif b_changed and not a_changed:
        print(f"   !! OUT OF SYNC: {b} changed but {a} didn't")
        print(f"      Update both files, then --rehash")
        fail = True
    else:
        print(f"   OK: {a} <-> {b}")

if fail:
    sys.exit(2)
PYEOF
SYNC_EXIT=$?
if [ $SYNC_EXIT -eq 2 ]; then
  BLOCKER=1
fi

# ── 3. DATA FILES (WARNING ONLY) ──────────────────────────────────
echo ""
echo "-- Data Files --"
for name in $(python3 -c "import json; d=json.load(open('$INTEGRITY')); print(' '.join(d.get('data_files',{}).keys()))"); do
  file=$(jq_py "d['data_files']['$name']['file']")
  expected=$(jq_py "d['data_files']['$name']['hash']")
  updated=$(jq_py "d['data_files']['$name']['updated']")
  ftype=$(jq_py "d['data_files']['$name']['type']")

  if [ ! -f "$file" ]; then
    echo "   WARN: $file not found"
    continue
  fi

  actual=$(shasum -a 256 "$file" | awk '{print $1}')
  if [ "$actual" != "$expected" ]; then
    echo "   CHANGED: $file ($ftype, last verified $updated)"
    WARNINGS=$((WARNINGS + 1))
  else
    echo "   OK: $file"
  fi
done

# ── 4. BLUEPRINT-DEPENDENT FILES ──────────────────────────────────
echo ""
echo "-- Blueprint-Dependent Data --"
python3 << 'PYEOF'
import json, subprocess

with open("scripts/exam-integrity.json") as f:
    d = json.load(f)

deps = d.get("blueprint_dependent", {})
for blueprint, files in deps.items():
    bp = d["exam_blueprints"].get(blueprint, {})
    bp_hash = bp.get("hash", "")
    bp_pdf = bp.get("pdf", "")

    try:
        actual_bp = subprocess.check_output(["shasum", "-a", "256", bp_pdf]).decode().split()[0]
    except:
        continue

    if actual_bp != bp_hash:
        for f in files:
            print(f"   !! {f} depends on {blueprint} blueprint which changed — must re-verify")
    else:
        for f in files:
            print(f"   OK: {f} -> {blueprint} blueprint unchanged")
PYEOF

# ── Summary ────────────────────────────────────────────────────────
echo ""
if [ $BLOCKER -ne 0 ]; then
  echo "BLOCKED: Fix the issues above before committing."
  echo "After fixing, run: bash scripts/verify-exam-integrity.sh --rehash"
  exit 1
fi

if [ $WARNINGS -gt 0 ]; then
  echo "PASSED with $WARNINGS data file(s) changed."
  echo "If intentional, run: bash scripts/verify-exam-integrity.sh --rehash"
else
  echo "All checks passed. No drift detected."
fi
