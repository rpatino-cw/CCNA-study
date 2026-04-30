#!/usr/bin/env python3
"""Tag every flashcard with its best-fit CCNA 200-301 sub-objective.

Uses the local `claude` CLI (subscription auth) — no API key required.

Reads:
  data/anki-data.js          (Flackbox cards: ANKI_CARDS)
  data/examtopics-data.js    (ExamTopics cards)
  data/objectives-app.js     (sub-objective catalog)

Writes:
  data/card-objectives.json  { cardId: {primary, secondary[], confidence} }

Usage:
  python3 scripts/tag-cards-by-objective.py [--limit N] [--resume] [--batch 50]
"""

import argparse
import json
import re
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
OUT_PATH = DATA / "card-objectives.json"
DEFAULT_BATCH = 50


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
    card_pat = re.compile(
        r"\{\s*id:\s*(\d+),\s*type:\s*'([^']+)',\s*section:\s*'(\d+)',\s*front:\s*'((?:\\'|[^'])*)',\s*back:\s*'((?:\\'|[^'])*)'",
    )
    for m in card_pat.finditer(text):
        cid, _, sec, front, back = m.groups()
        cards.append({
            "id": cid,
            "deck": "flackbox",
            "section": sections.get(sec, sec),
            "front": front.replace("\\'", "'")[:300],
            "back": back.replace("\\'", "'")[:200],
        })
    return cards


def load_examtopics_cards():
    text = (DATA / "examtopics-data.js").read_text()
    start = text.index("[")
    arr = json.loads(text[start:].rstrip().rstrip(";"))
    out = []
    for c in arr:
        opts = " | ".join(c.get("options", []))[:200]
        out.append({
            "id": c["id"],
            "deck": c["deck"],
            "section": "ExamTopics",
            "front": c["question"][:300],
            "back": "Correct: " + c["correct"] + " | " + opts,
        })
    return out


def build_system_prompt(catalog):
    lines = [
        "You are tagging CCNA 200-301 flashcards by sub-objective ID.",
        "",
        "Catalog (ID — Cisco intent):",
    ]
    for oid, intent in catalog:
        lines.append(f"  {oid} — {intent}")
    lines += [
        "",
        "Rules:",
        "1. Pick exactly one PRIMARY sub-objective ID per card (e.g. '1.1.a', '3.4.b').",
        "2. List up to 2 SECONDARY IDs if the card cleanly maps to additional leaves.",
        "3. If a card maps only to a parent objective with no leaf-specific match, return parent ID like '1.5'.",
        "4. Confidence: 0.0 (guess) to 1.0 (exact match).",
        "5. Output ONLY a JSON array. No prose, no markdown fence.",
        "",
        'Schema: [{"id":"<cardId>","primary":"<objId>","secondary":["<objId>",...],"confidence":<float>}]',
    ]
    return "\n".join(lines)


def build_user_message(batch):
    lines = [
        f"Tag these {len(batch)} cards. Return ONLY the JSON array.",
        "",
    ]
    for c in batch:
        lines.append(f"--- card {c['id']} (deck={c['deck']}, section={c['section']}) ---")
        lines.append(f"Q: {c['front']}")
        lines.append(f"A: {c['back']}")
        lines.append("")
    return "\n".join(lines)


JSON_SCHEMA = json.dumps({
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "id": {"type": "string"},
            "primary": {"type": "string"},
            "secondary": {"type": "array", "items": {"type": "string"}},
            "confidence": {"type": "number"},
        },
        "required": ["id", "primary"],
    },
})


def call_claude(system_prompt, user_msg, timeout=180):
    cmd = [
        "claude",
        "--print",
        "--model", "sonnet",
        "--no-session-persistence",
        "--append-system-prompt", system_prompt,
        "--json-schema", JSON_SCHEMA,
        "--output-format", "json",
        user_msg,
    ]
    proc = subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        timeout=timeout,
    )
    if proc.returncode != 0:
        raise RuntimeError(f"claude exit {proc.returncode}: {proc.stderr[:500]}")

    raw = proc.stdout.strip()
    try:
        wrapper = json.loads(raw)
    except json.JSONDecodeError:
        # Some versions return plain text not envelope
        return _parse_array(raw)

    inner = wrapper.get("result") or wrapper.get("response") or wrapper.get("text") or ""
    if isinstance(inner, list):
        return inner
    return _parse_array(inner)


def _parse_array(text):
    text = text.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)
    # Find first [ ... ] block
    m = re.search(r"\[.*\]", text, re.DOTALL)
    if m:
        text = m.group(0)
    return json.loads(text)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--resume", action="store_true")
    ap.add_argument("--batch", type=int, default=DEFAULT_BATCH)
    args = ap.parse_args()

    print("loading catalog...")
    catalog = load_catalog()
    print(f"  {len(catalog)} sub-objective entries")

    print("loading cards...")
    cards = load_anki_cards() + load_examtopics_cards()
    print(f"  {len(cards)} total cards")

    existing = {}
    if args.resume and OUT_PATH.exists():
        existing = json.loads(OUT_PATH.read_text())
        print(f"  resuming with {len(existing)} already tagged")
        cards = [c for c in cards if str(c["id"]) not in existing]

    if args.limit:
        cards = cards[: args.limit]

    if not cards:
        print("nothing to do")
        return

    print(f"tagging {len(cards)} cards in batches of {args.batch} via claude CLI...")

    system_prompt = build_system_prompt(catalog)
    results = dict(existing)
    failed_batches = 0
    t0 = time.time()

    for i in range(0, len(cards), args.batch):
        batch = cards[i : i + args.batch]
        user_msg = build_user_message(batch)
        try:
            tags = call_claude(system_prompt, user_msg)
        except Exception as e:
            failed_batches += 1
            print(f"  batch {i//args.batch} FAILED: {e}", file=sys.stderr)
            continue

        for t in tags:
            cid = str(t.get("id"))
            if not cid:
                continue
            results[cid] = {
                "primary": t.get("primary", ""),
                "secondary": t.get("secondary", []) or [],
                "confidence": t.get("confidence", 0.0),
            }

        done = i + len(batch)
        elapsed = time.time() - t0
        rate = done / elapsed if elapsed else 0
        eta = (len(cards) - done) / rate if rate else 0
        print(f"  {done}/{len(cards)} tagged | {rate:.1f} cards/s | eta {eta:.0f}s")

        OUT_PATH.write_text(json.dumps(results, indent=2, sort_keys=True))

    print(f"\ndone. wrote {OUT_PATH}")
    print(f"total tagged: {len(results)} | failed batches: {failed_batches}")


if __name__ == "__main__":
    main()
