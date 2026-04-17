# CCNA Anki Deck

Auto-generated from the Key Terms across all 341 subtopics in the CCNA study data files.

## Files

- **`ccna-key-terms.tsv`** — 1,550 cards. Tab-separated. UTF-8. Import directly into Anki.

## Contents

| Domain | Cards |
|--------|-------|
| 1 Network Fundamentals | 517 |
| 2 Network Access | 258 |
| 3 IP Connectivity | 175 |
| 4 IP Services | 229 |
| 5 Security | 258 |
| 6 Automation | 113 |

**By weight:** HIGH 1,222 · MED 291 · LOW 37

## Card format

- **Front:** Term name (e.g., "Packet switching")
- **Back:** Definition + memory hook (if present) + subtopic ID + weight tag
- **Tags:** `ccna domain1 topic1.1 subtopic1.1.a weight_high` — use these to filter in Anki

## How to import

1. Open Anki (desktop).
2. Create a new deck: **Tools → Manage Note Types → Add → Basic** (if you don't already have one).
3. **File → Import** → select `ccna-key-terms.tsv`.
4. Set:
   - **Type:** Basic
   - **Deck:** CCNA Key Terms (create new)
   - **Fields separated by:** Tab
   - **Allow HTML in fields:** ✅ Yes (important — preserves `<br>` and styling)
   - Map: Field 1 → Front, Field 2 → Back, Field 3 → Tags
5. Click **Import**.

## Suggested study approach

**Daily target:** 20 new cards/day, review all due cards.

- **Week 1-2:** Focus on `weight_high` tag (filter in Anki: `tag:weight_high`) — 1,222 cards. These are the exam-heavy terms.
- **Week 3-4:** Add `weight_med` — 291 more. Fills in the gaps.
- **Week 5+:** `weight_low` — 37 cards. Polish.

**Filter by domain:**
- Weak on routing? `tag:domain3` (175 cards).
- Weak on security? `tag:domain5` (258 cards).

**Filter by topic:** `tag:topic1.1` (just router fundamentals).

## Regenerating

If you update the study data (add/edit subtopic content), regenerate with:

```bash
cd ~/dev/CCNA_study
node scripts/export-anki.js
```

Overwrites `ccna-key-terms.tsv`. Re-import into Anki (set Update existing notes if Front matches).
