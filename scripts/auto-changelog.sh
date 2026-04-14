#!/bin/bash
# ──────────────────────────────────────────────────────────────────────
# auto-changelog.sh — Pre-push pipeline
# 1. Reads commits since last changelog version
# 2. Categorizes them (New / Improved / Fixed)
# 3. Appends a new version block to changelog.html
# 4. Bumps the version in nav.js + changelog.html
# 5. Auto-commits the changelog + version changes
# ──────────────────────────────────────────────────────────────────────

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CHANGELOG="$ROOT/changelog.html"
NAVJS="$ROOT/js/nav.js"

# ── Read current version from nav.js ────────────────────────────────
CURRENT_VERSION=$(grep -oE 'ALPHA v[0-9]+\.[0-9]+\.[0-9]+' "$NAVJS" | head -1 | sed 's/ALPHA v//')

if [ -z "$CURRENT_VERSION" ]; then
  echo "  [auto-changelog] Could not read version from nav.js — skipping."
  exit 0
fi

IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION"

# ── Find commits since the last changelog update ────────────────────
# Strategy: look for the last "Auto-changelog" commit first
LAST_CHANGELOG_COMMIT=$(git log --oneline --all --grep="Auto-changelog" -1 --format="%H" 2>/dev/null || true)

if [ -n "$LAST_CHANGELOG_COMMIT" ]; then
  COMMITS=$(git log --oneline "$LAST_CHANGELOG_COMMIT"..HEAD 2>/dev/null || true)
else
  # Fall back: get commits since the date of the latest changelog entry
  LAST_DATE=$(grep -A2 'tag-latest' "$CHANGELOG" | grep 'version-date' | head -1 | sed 's/.*>\(.*\)<.*/\1/' || true)
  if [ -n "$LAST_DATE" ]; then
    COMMITS=$(git log --oneline --after="$LAST_DATE" 2>/dev/null || true)
  else
    COMMITS=$(git log --oneline -20 2>/dev/null || true)
  fi
fi

# Filter out auto-changelog commits
COMMITS=$(echo "$COMMITS" | grep -v "Auto-changelog" | grep -v "auto-changelog" || true)

if [ -z "$COMMITS" ]; then
  echo "  [auto-changelog] No new commits to log — skipping."
  exit 0
fi

# ── Deduplicate: skip commits already in the changelog ──────────────
NEW_COMMITS=""
while IFS= read -r line; do
  [ -z "$line" ] && continue
  MSG=$(echo "$line" | sed 's/^[a-f0-9]* //')
  # Use first 35 chars as fingerprint
  SNIPPET=$(echo "$MSG" | cut -c1-35)
  if ! grep -qF "$SNIPPET" "$CHANGELOG" 2>/dev/null; then
    NEW_COMMITS="${NEW_COMMITS}${line}
"
  fi
done <<< "$COMMITS"

if [ -z "$(echo "$NEW_COMMITS" | tr -d '[:space:]')" ]; then
  echo "  [auto-changelog] All commits already in changelog — skipping."
  exit 0
fi

# ── Categorize commits ──────────────────────────────────────────────
FEATURES=""
FIXES=""
IMPROVEMENTS=""
HAS_FEATURE=0

while IFS= read -r line; do
  [ -z "$line" ] && continue
  MSG=$(echo "$line" | sed 's/^[a-f0-9]* //; s/^ *//')
  # Escape HTML entities
  DISPLAY_MSG=$(echo "$MSG" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g')

  FIRST_WORD=$(echo "$MSG" | awk '{print tolower($1)}')
  case "$FIRST_WORD" in
    add|create|new|build|implement|launch|introduce)
      FEATURES="${FEATURES}<ITEM>${DISPLAY_MSG}</ITEM>
"
      HAS_FEATURE=1
      ;;
    fix|repair|patch|correct|revert|hotfix)
      FIXES="${FIXES}<ITEM>${DISPLAY_MSG}</ITEM>
"
      ;;
    *)
      IMPROVEMENTS="${IMPROVEMENTS}<ITEM>${DISPLAY_MSG}</ITEM>
"
      ;;
  esac
done <<< "$NEW_COMMITS"

# ── Bump version ────────────────────────────────────────────────────
if [ "$HAS_FEATURE" -eq 1 ]; then
  MINOR=$((MINOR + 1))
  PATCH=0
else
  PATCH=$((PATCH + 1))
fi

NEW_VERSION="${MAJOR}.${MINOR}.${PATCH}"
TODAY=$(date "+%B %-d, %Y")
COMMIT_COUNT=$(echo "$NEW_COMMITS" | grep -c '[a-f0-9]' || echo "0")

echo "  [auto-changelog] ${CURRENT_VERSION} -> ${NEW_VERSION} (${COMMIT_COUNT} changes)"

# ── Build the HTML block as a file ──────────────────────────────────
BLOCKFILE="$ROOT/.changelog-block.tmp"

{
  echo ""
  echo "    <!-- v${NEW_VERSION} -->"
  echo "    <div class=\"version-block\">"
  echo "      <div class=\"version-header\">"
  echo "        <span class=\"version-num\">v${NEW_VERSION}</span>"
  echo "        <span class=\"version-tag tag-latest\">Latest</span>"
  echo "        <span class=\"version-date\">${TODAY}</span>"
  echo "      </div>"

  if [ -n "$FEATURES" ]; then
    echo ""
    echo "      <div class=\"change-category\">"
    echo "        <div class=\"change-cat-label cat-new\">New</div>"
    echo "        <ul class=\"change-list\">"
    echo "$FEATURES" | while IFS= read -r item; do
      [ -z "$item" ] && continue
      CONTENT=$(echo "$item" | sed 's/<ITEM>//; s/<\/ITEM>//')
      [ -z "$CONTENT" ] && continue
      echo "          <li>${CONTENT}</li>"
    done
    echo "        </ul>"
    echo "      </div>"
  fi

  if [ -n "$IMPROVEMENTS" ]; then
    echo ""
    echo "      <div class=\"change-category\">"
    echo "        <div class=\"change-cat-label cat-improved\">Improved</div>"
    echo "        <ul class=\"change-list\">"
    echo "$IMPROVEMENTS" | while IFS= read -r item; do
      [ -z "$item" ] && continue
      CONTENT=$(echo "$item" | sed 's/<ITEM>//; s/<\/ITEM>//')
      [ -z "$CONTENT" ] && continue
      echo "          <li>${CONTENT}</li>"
    done
    echo "        </ul>"
    echo "      </div>"
  fi

  if [ -n "$FIXES" ]; then
    echo ""
    echo "      <div class=\"change-category\">"
    echo "        <div class=\"change-cat-label cat-fixed\">Fixed</div>"
    echo "        <ul class=\"change-list\">"
    echo "$FIXES" | while IFS= read -r item; do
      [ -z "$item" ] && continue
      CONTENT=$(echo "$item" | sed 's/<ITEM>//; s/<\/ITEM>//')
      [ -z "$CONTENT" ] && continue
      echo "          <li>${CONTENT}</li>"
    done
    echo "        </ul>"
    echo "      </div>"
  fi

  echo "    </div>"
} > "$BLOCKFILE"

# ── Inject into changelog.html ──────────────────────────────────────

# 1. Demote old "Latest" to "Previous"
sed -i '' 's/tag-latest">Latest</tag-previous">Previous</' "$CHANGELOG"

# 2. Insert new block after </header> using sed with read-file
#    macOS sed approach: use a marker-based replacement
#    We insert after the line containing </header>
sed -i '' "/<\/header>/r $BLOCKFILE" "$CHANGELOG"

# Clean up temp file
rm -f "$BLOCKFILE"

# ── Update version in nav.js ───────────────────────────────────────
sed -i '' "s/ALPHA v${CURRENT_VERSION}/ALPHA v${NEW_VERSION}/g" "$NAVJS"

# ── Auto-commit ────────────────────────────────────────────────────
cd "$ROOT"
git add "$CHANGELOG" "$NAVJS"

# Only commit if there are staged changes
if git diff --cached --quiet; then
  echo "  [auto-changelog] No changes to commit."
  exit 0
fi

git commit -m "Auto-changelog: v${NEW_VERSION} — ${COMMIT_COUNT} changes"

echo "  [auto-changelog] Committed changelog v${NEW_VERSION}"
echo ""
