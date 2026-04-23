#!/usr/bin/env python3
import json, pathlib
m = json.load(open("domain-map.json"))
for dom_id, dom in m["domains"].items():
    lines = [f"# Domain {dom_id} — {dom['name']} ({dom['weight']})", "", "## Sub-objectives"]
    for sid, stitle in dom["subtopics"].items():
        lines.append(f"- **{sid}** — {stitle}")
    lines.append("\n## Videos (grouped by sub-objective)")
    by_sub = {}
    for v in m["videos"]:
        if v["domain"] != dom_id:
            continue
        by_sub.setdefault(v["sub"], []).append(v)
    for sid in sorted(by_sub):
        lines.append(f"\n### {sid} — {dom['subtopics'].get(sid, '(unmapped)')}")
        for v in by_sub[sid]:
            fn = f"clean/{v['n']:03d}-{v['id']}.txt"
            lines.append(f"- `{fn}` — Day {v['day']}: {v['title']}  (https://youtu.be/{v['id']})")
    out = pathlib.Path(f"brief-domain-{dom_id}.md")
    out.write_text("\n".join(lines))
    print(f"wrote {out}  sub-objectives={len(by_sub)}  videos={sum(len(x) for x in by_sub.values())}")
