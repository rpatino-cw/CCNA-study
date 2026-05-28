#!/usr/bin/env python3
"""Build data/flashit-data.js from ~/Documents/Obsidian Vault/Flashcards/*.md.

Reuses flashit-server parsing rules (?, ::, :::, ==cloze==).
Emits FLASHIT_SECTIONS + FLASHIT_CARDS consumable by flashcards.html.
"""
import hashlib
import json
import re
from pathlib import Path

VAULT = Path.home() / "Documents/Obsidian Vault"
FLASH_DIR = VAULT / "Flashcards"
OUT = Path(__file__).resolve().parent.parent / "data" / "flashit-data.js"


def cid(q: str, a: str, topic: str) -> str:
    return hashlib.sha1(f"{topic}|{q}|{a}".encode()).hexdigest()[:12]


def parse_file(path: Path):
    text = path.read_text(encoding="utf-8", errors="ignore")
    topic = path.stem
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end > 0:
            text = text[end + 4:]
    lines = text.split("\n")
    cards = []
    i = 0
    while i < len(lines):
        line = lines[i].rstrip()
        if i + 1 < len(lines) and lines[i + 1].strip() == "?":
            q = line.strip()
            a_lines = []
            j = i + 2
            while j < len(lines) and lines[j].strip() and lines[j].strip() not in ("?", "??"):
                a_lines.append(lines[j])
                j += 1
            if q and a_lines:
                a = "\n".join(a_lines).strip()
                cards.append({"q": q, "a": a, "kind": "multi"})
            i = j
            continue
        if ":::" in line:
            parts = line.split(":::", 1)
            if len(parts) == 2 and parts[0].strip() and parts[1].strip():
                q, a = parts[0].strip(), parts[1].strip()
                cards.append({"q": q, "a": a, "kind": "single"})
                cards.append({"q": a, "a": q, "kind": "single-rev"})
            i += 1
            continue
        if "::" in line and not line.lstrip().startswith("#"):
            parts = line.split("::", 1)
            if len(parts) == 2 and parts[0].strip() and parts[1].strip():
                q, a = parts[0].strip(), parts[1].strip()
                cards.append({"q": q, "a": a, "kind": "single"})
            i += 1
            continue
        if "==" in line and line.count("==") >= 2:
            stripped = line.strip()
            matches = re.findall(r"==([^=]+)==", stripped)
            for m in matches:
                hidden = re.sub(re.escape(f"=={m}=="), "____", stripped, count=1)
                hidden = re.sub(r"==([^=]+)==", r"\1", hidden)
                cards.append({"q": hidden, "a": m, "kind": "cloze"})
            i += 1
            continue
        i += 1
    return topic, cards


def infer_objective(topic: str):
    """Return {'domain': '1'..'6', 'objectives': [...]} or None.

    Tries explicit ccna-dN-* pattern first, then keyword heuristics.
    Conservative — when ambiguous, returns None so card lands only in 'all'.
    """
    t = topic.lower()

    m = re.match(r"ccna-d([1-6])-", t)
    if m:
        d = m.group(1)
        return {"domain": d, "objectives": [d + ".0"]}

    rules = [
        # Domain 2 — Network Access
        (["vlan", "trunk", "stp", "rstp", "cdp", "lldp", "etherchannel",
          "dtp", "switchport", "show-cli-l2", "wireless"], "2"),
        # Domain 3 — IP Connectivity
        (["ospf", "bgp", "fhrp", "ip-sla", "static-routing", "routing-table",
          "routing-static", "routing-ospf", "routing-bgp", "administrative-distance",
          "ipv6-static", "ipv6-implicit", "serial-interface", "vlsm"], "3"),
        # Domain 4 — IP Services
        (["nat", "dhcp", "snmp", "syslog", "qos", "ntp", "dns",
          "dns-acl-webftp"], "4"),
        # Domain 5 — Security Fundamentals
        (["acl", "port-security", "-security"], "5"),
        # Domain 1 — Network Fundamentals (catch-all for ipv4/ipv6/foundational)
        (["ipv4", "ipv6", "components", "ip-protocols", "foundational",
          "broadcast-domains", "magic-tables-l1-l2", "ios-", "router-basics"], "1"),
    ]
    for keys, dom in rules:
        if any(k in t for k in keys):
            return {"domain": dom, "objectives": [dom + ".0"]}
    return None


def main():
    if not FLASH_DIR.exists():
        raise SystemExit(f"missing: {FLASH_DIR}")

    sections = []
    all_cards = []
    section_objectives = {}
    seen_ids = set()

    for f in sorted(FLASH_DIR.glob("*.md")):
        topic, cards = parse_file(f)
        if not cards:
            continue
        sec_id = "fl_" + re.sub(r"[^a-z0-9]+", "-", topic.lower()).strip("-")
        sec_name = "Flashit • " + topic.replace("-", " ")
        sections.append({"id": sec_id, "name": sec_name, "count": len(cards)})
        meta = infer_objective(topic)
        if meta:
            section_objectives[sec_id] = meta
        for c in cards:
            cid_ = cid(c["q"], c["a"], topic)
            if cid_ in seen_ids:
                continue
            seen_ids.add(cid_)
            all_cards.append({
                "id": "fl_" + cid_,
                "type": "flashit",
                "section": sec_id,
                "front": c["q"],
                "back": c["a"],
                "tag": c["kind"],
                "hint": "",
                "explanation": "",
            })

    header = (
        "// ─────────────────────────────────────────────────────────────────────────────\n"
        f"//  CCNA_study — Flashit (Vault) cards\n"
        f"//  Source: ~/Documents/Obsidian Vault/Flashcards/*.md  (mirror of flashit-server)\n"
        f"//  {len(all_cards)} cards across {len(sections)} topics\n"
        "//  Auto-generated by scripts/build-flashit-data.py — do not edit by hand\n"
        "// ─────────────────────────────────────────────────────────────────────────────\n\n"
    )
    body = (
        "const FLASHIT_SECTIONS = " + json.dumps(sections, indent=2) + ";\n\n"
        "const FLASHIT_CARDS = " + json.dumps(all_cards) + ";\n\n"
        "const FLASHIT_SECTION_OBJECTIVES = "
        + json.dumps(section_objectives, indent=2) + ";\n"
    )
    OUT.write_text(header + body)
    mapped = len(section_objectives)
    print(f"wrote {OUT}  ({len(all_cards)} cards, {len(sections)} sections, "
          f"{mapped} domain-mapped)")


if __name__ == "__main__":
    main()
