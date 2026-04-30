#!/usr/bin/env python3
"""
Block push if any HTML page has inline onclick (or similar) handlers that
reference a function defined inside a DOMContentLoaded IIFE without
exposing it to window. The handler resolves against window at click time
and silently fails with ReferenceError otherwise.

Fix: append `window.fn = fn;` for each trapped handler before the closing
`});</script>` of the DOMContentLoaded block.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HANDLER_ATTR = re.compile(
    r'on(?:click|change|input|submit|keyup|keydown|mouseover|focus|blur)'
    r'\s*=\s*"([a-zA-Z_$][\w$]*)\s*\(',
)
DCL_BLOCK = re.compile(
    r"document\.addEventListener\(\s*['\"]DOMContentLoaded['\"].*?\}\s*\)\s*;\s*</script>",
    re.DOTALL,
)
FUNC_DEF = re.compile(r"function\s+([a-zA-Z_$][\w$]*)\s*\(")
WINDOW_EXPOSE = re.compile(r"window\.([a-zA-Z_$][\w$]*)\s*=")

failures = []

SKIP_DIRS = {"node_modules", ".git", "worktrees", "regression"}
for html in sorted(ROOT.rglob("*.html")):
    if SKIP_DIRS & set(html.parts):
        continue
    txt = html.read_text(errors="ignore")
    onclicks = set(HANDLER_ATTR.findall(txt))
    if not onclicks:
        continue
    m = DCL_BLOCK.search(txt)
    if not m:
        continue
    block = m.group(0)
    inner = set(FUNC_DEF.findall(block))
    exposed = set(WINDOW_EXPOSE.findall(block))
    trapped = (onclicks & inner) - exposed
    if trapped:
        failures.append((html.relative_to(ROOT), sorted(trapped)))

if failures:
    print("ERROR: scope-trap pattern found — inline onclick handlers reference")
    print("       functions defined inside DOMContentLoaded but not exposed to window.")
    print("")
    for path, fns in failures:
        print(f"  {path}")
        for fn in fns:
            print(f"    - {fn}")
    print("")
    print("Fix: before the closing `});</script>` of the DOMContentLoaded block, add:")
    print("    window.<fn> = <fn>;")
    sys.exit(1)

print(f"OK  {sum(1 for _ in ROOT.rglob('*.html'))} pages clean — no scope-trap onclick handlers")
sys.exit(0)
