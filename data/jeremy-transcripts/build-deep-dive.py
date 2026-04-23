#!/usr/bin/env python3
"""Regroup domain-map.json by sub-objective with theory/lab classification."""
import json, pathlib, re

HERE = pathlib.Path(__file__).parent
m = json.load(open(HERE / "domain-map.json"))

def classify(v):
    t = v["title"].lower()
    d = v["day"].lower()
    if "lab" in d or "lab" in t:
        return "lab"
    if "flashcard" in t or "anki" in t:
        return "flashcards"
    return "theory"

by_sub = {}
for v in m["videos"]:
    entry = {
        "n": v["n"],
        "day": v["day"],
        "ytid": v["id"],
        "url": f"https://youtu.be/{v['id']}",
        "title": v["title"],
        "kind": classify(v),
    }
    by_sub.setdefault(v["sub"], []).append(entry)

out = {
    "_doc": "Jeremy deep-dive per CCNA sub-objective. Powers core.html subtopic drawer.",
    "subobjectives": {}
}
for dom_id, dom in m["domains"].items():
    for sub_id, sub_title in dom["subtopics"].items():
        videos = by_sub.get(sub_id, [])
        out["subobjectives"][sub_id] = {
            "domain": dom_id,
            "title": sub_title,
            "videos": videos,
            "video_count": len(videos),
            "theory_count": sum(1 for v in videos if v["kind"] == "theory"),
            "lab_count": sum(1 for v in videos if v["kind"] == "lab"),
            "glossary_quiz": f"data/glossary-quiz/{sub_id}.json" if videos else None,
        }

out_path = pathlib.Path.home() / "dev/CCNA_study/data/jeremy-deep-dive.json"
out_path.write_text(json.dumps(out, indent=2))
print(f"wrote {out_path}  sub-objectives={len(out['subobjectives'])}  videos={sum(len(v['videos']) for v in out['subobjectives'].values())}")
