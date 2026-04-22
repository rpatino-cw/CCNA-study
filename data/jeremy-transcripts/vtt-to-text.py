#!/usr/bin/env python3
"""Convert VTT → plain text: strip timestamps, tags, dedup adjacent lines."""
import re, pathlib, sys

RAW = pathlib.Path(__file__).parent / "raw"
CLEAN = pathlib.Path(__file__).parent / "clean"
CLEAN.mkdir(exist_ok=True)

TS_RE = re.compile(r"^\d{2}:\d{2}:\d{2}\.\d{3}\s*-->")
TAG_RE = re.compile(r"<[^>]+>")
INLINE_TS_RE = re.compile(r"<\d{2}:\d{2}:\d{2}\.\d{3}>")

for vtt in sorted(RAW.glob("*.vtt")):
    out_lines, prev = [], ""
    for line in vtt.read_text(encoding="utf-8", errors="ignore").splitlines():
        s = line.strip()
        if not s or s == "WEBVTT" or s.startswith("Kind:") or s.startswith("Language:") or TS_RE.match(s) or s.startswith("NOTE"):
            continue
        s = INLINE_TS_RE.sub("", s)
        s = TAG_RE.sub("", s).strip()
        if not s or s == prev:
            continue
        out_lines.append(s)
        prev = s
    text = "\n".join(out_lines)
    out = CLEAN / (vtt.stem.replace(".en", "") + ".txt")
    out.write_text(text, encoding="utf-8")

print(f"Cleaned {len(list(CLEAN.glob('*.txt')))} transcripts -> {CLEAN}")
