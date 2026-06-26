#!/bin/bash
# ──────────────────────────────────────────────────────────────────────
# stamp-assets.sh <version>
# Adds/updates a ?v=<version> cache-buster on the cache-bound shared JS
# includes across every page, so a deploy actually reaches users instead
# of serving a stale browser-cached copy. Idempotent: replaces any existing
# ?v= on these assets.
# Stamped assets: tutor.js, lab-engine.js, ib-tools.js (the heavy shared
# scripts that change often). nav.js is intentionally excluded (its version
# string is bumped every push, which would re-stamp every page each time).
# Run manually:  bash scripts/stamp-assets.sh 7.15.8
# Called automatically by auto-changelog.sh when one of these assets changes.
# ──────────────────────────────────────────────────────────────────────
set -euo pipefail

VER="${1:?usage: stamp-assets.sh <version>}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ASSETS='tutor|lab-engine|ib-tools'

find "$ROOT" -name '*.html' \
  -not -path '*/node_modules/*' -not -path '*/worktrees/*' \
  -not -path '*/external/*' -not -path '*/.git/*' -print0 \
| xargs -0 perl -i -pe "s{((?:\.\./)?js/(?:$ASSETS)\.js)(?:\?v=[0-9.]+)?}{\$1?v=$VER}g"

echo "  [stamp-assets] stamped tutor.js / lab-engine.js / ib-tools.js to ?v=$VER"
