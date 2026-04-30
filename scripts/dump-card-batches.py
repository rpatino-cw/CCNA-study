#!/usr/bin/env python3
"""Dump every flashcard into batched JSON files for in-conversation tagging.

Output:
  data/_tag-batches/batch-01.json ... batch-NN.json (200 cards each)
  data/_tag-batches/_catalog.txt (sub-objective ID + Cisco intent reference)
"""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
OUT_DIR = DATA / "_tag-batches"
OUT_DIR.mkdir(exist_ok=True)
BATCH_SIZE = 200


def load_catalog():
    text = (DATA / "objectives-app.js").read_text()
    pattern = re.compile(
        r'"((?:\d+)\.(?:\d+)(?:\.[a-z])?)"\s*:\s*\{[^}]*?ciscoIntent:\s*"([^"]+)"',
        re.DOTALL,
    )
    return pattern.findall(text)


def load_anki_cards():
    text = (DATA / "anki-data.js").read_text()
    sections = {}
    for m in re.finditer(r"id:\s*'(\d+)',\s*name:\s*'([^']+)'", text):
        sections[m.group(1)] = m.group(2)

    cards = []
    pat = re.compile(
        r"\{\s*id:\s*(\d+),\s*type:\s*'([^']+)',\s*section:\s*'(\d+)',\s*front:\s*'((?:\\'|[^'])*)',\s*back:\s*'((?:\\'|[^'])*)'",
    )
    for m in pat.finditer(text):
        cid, _, sec, front, back = m.groups()
        cards.append({
            "id": cid,
            "deck": "flackbox",
            "section": sections.get(sec, sec),
            "q": front.replace("\\'", "'")[:240],
            "a": back.replace("\\'", "'")[:160],
        })
    return cards


def load_examtopics_cards():
    text = (DATA / "examtopics-data.js").read_text()
    start = text.index("[")
    arr = json.loads(text[start:].rstrip().rstrip(";"))
    out = []
    for c in arr:
        opts = " | ".join(c.get("options", []))[:160]
        out.append({
            "id": c["id"],
            "deck": c["deck"],
            "section": "ExamTopics",
            "q": c["question"][:240],
            "a": "Correct: " + c["correct"] + " | " + opts,
        })
    return out


def main():
    catalog = load_catalog()
    cards = load_anki_cards() + load_examtopics_cards()
    print(f"catalog: {len(catalog)} entries")
    print(f"cards: {len(cards)}")

    catalog_lines = ["# CCNA 200-301 sub-objective catalog (ID — Cisco intent)\n"]
    for oid, intent in catalog:
        catalog_lines.append(f"{oid} — {intent}\n")
    (OUT_DIR / "_catalog.txt").write_text("".join(catalog_lines))

    n_batches = (len(cards) + BATCH_SIZE - 1) // BATCH_SIZE
    for i in range(n_batches):
        chunk = cards[i * BATCH_SIZE : (i + 1) * BATCH_SIZE]
        path = OUT_DIR / f"batch-{i+1:02d}.json"
        path.write_text(json.dumps(chunk, indent=2))
        print(f"  wrote {path.name}: {len(chunk)} cards")


if __name__ == "__main__":
    main()
