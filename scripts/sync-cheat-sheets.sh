#!/usr/bin/env bash
# sync-cheat-sheets.sh
# Vault is source of truth. Mirrors:
#   ~/Documents/Obsidian Vault/code_jeremy/cheat-sheets/*.md
#     → ~/dev/CCNA_study/data/cheat-sheets/*.md
# Then commits + pushes (per feedback_ccna_study_auto_push.md).
#
# Usage:
#   bash scripts/sync-cheat-sheets.sh           # sync + commit + push
#   bash scripts/sync-cheat-sheets.sh --dry     # preview only
#   bash scripts/sync-cheat-sheets.sh --no-push # sync + commit, skip push

set -euo pipefail

VAULT_DIR="$HOME/Documents/Obsidian Vault/code_jeremy/cheat-sheets"
REPO_DIR="$HOME/dev/CCNA_study/data/cheat-sheets"
REPO_ROOT="$HOME/dev/CCNA_study"

DRY_RUN=0
NO_PUSH=0
for arg in "$@"; do
  case "$arg" in
    --dry|--dry-run) DRY_RUN=1 ;;
    --no-push)       NO_PUSH=1 ;;
  esac
done

if [ ! -d "$VAULT_DIR" ]; then
  echo "ERR: vault dir missing: $VAULT_DIR" >&2
  exit 1
fi
if [ ! -d "$REPO_DIR" ]; then
  echo "ERR: repo dir missing: $REPO_DIR" >&2
  exit 1
fi

cd "$REPO_ROOT"

VAULT_COUNT=$(ls -1 "$VAULT_DIR"/*.md 2>/dev/null | wc -l | tr -d ' ')
REPO_COUNT=$(ls -1 "$REPO_DIR"/*.md 2>/dev/null | wc -l | tr -d ' ')
echo "vault files: $VAULT_COUNT"
echo "repo files:  $REPO_COUNT"

if [ "$DRY_RUN" -eq 1 ]; then
  echo "--- DRY RUN — diff vault → repo ---"
  rsync -avn --delete --include="*.md" --exclude="*" "$VAULT_DIR/" "$REPO_DIR/"
  exit 0
fi

# Mirror: vault → repo. Delete repo files not in vault (vault is source of truth).
rsync -av --delete --include="*.md" --exclude="*" "$VAULT_DIR/" "$REPO_DIR/"

# Stage and check for changes
git add "$REPO_DIR"
if git diff --cached --quiet; then
  echo "no changes to commit"
  exit 0
fi

CHANGED=$(git diff --cached --name-only | wc -l | tr -d ' ')
echo "staged $CHANGED file(s)"

git commit -m "Sync cheat sheets from vault → repo ($CHANGED file(s))"

if [ "$NO_PUSH" -eq 1 ]; then
  echo "--no-push given; skipping push"
  exit 0
fi

git push
echo "pushed."
