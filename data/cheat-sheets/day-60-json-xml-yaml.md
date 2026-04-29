---
title: "Free CCNA | JSON, XML, & YAML | Day 60 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-60
source_transcript: "[[../jeremy-it-videos/120-json-xml-yaml-day-60]]"
source_url: https://www.youtube.com/watch?v=nohde2-QNJ4
created: 2026-04-28
tags: [ccna, cheat-sheet, day-60]
---

# Day 60 — JSON, XML, & YAML

## 🎯 What this video covers

Maps to v1.1 blueprint **6.7 (interpret JSON encoded data)**. JSON is the only one explicitly named — XML and YAML are background context. Expect to be asked to identify valid JSON, spot syntax errors, and name data types.

## 🧠 Core Concept

**JSON = key:value pairs in `{ }` (objects) or `[ ]` (arrays). Six types: string (quoted), number, boolean (true/false, lowercase, no quotes), null, object, array. Whitespace is insignificant. Keys must be strings.**

## 🔑 Must-Know Table

| Term | One-line function | Where it lives | Exam giveaway phrase |
|---|---|---|---|
| **String** | Text in double quotes | `"hello"`, `"5"` | "double quotes" |
| **Number** | Numeric, no quotes | `5`, `100` | "no quotes" |
| **Boolean** | true / false (lowercase, no quotes) | `true` | "boolean" |
| **null** | Intentional absence of value | `null` | "no value" |
| **Object** | `{key:value, ...}` unordered pairs | Curly braces | "key-value pairs" |
| **Array** | `[val1, val2, ...]` ordered list | Square brackets | "list of values" |
| **Key** | Always a string | Left side of colon | "must be string" |
| **Whitespace** | Insignificant in JSON + XML, **significant in YAML** | Formatting | "indentation matters" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Object vs Array** | Object = key:value pairs in `{}`. Array = ordered list of values in `[]`. Different brackets = different type |
| **String "5" vs Number 5** | `"5"` = string (quoted). `5` = number (not quoted) |
| **Boolean true vs String "true"** | `true` (no quotes, lowercase) = boolean. `"true"` = string with the letters t-r-u-e |
| **JSON vs XML** | JSON = `key:value`, braces. XML = `<key>value</key>` HTML-like tags |
| **JSON/XML vs YAML** | JSON/XML whitespace insignificant. YAML whitespace + indentation **significant** |
| **`,` vs `:`** | Comma separates pairs/values. Colon separates key from value. No comma after the LAST pair in an object |

## 🔗 How it all connects

```
{ "device": { "name":"R1", "vendor":"Cisco" }, "interfaces":["g0/0","g0/1"] }
   ↑ object   ↑ nested object                    ↑ array
```

## 🚨 Exam Traps

- **No trailing comma** after the last key-value pair (or last array element) — common error
- **Keys MUST be strings** (with double quotes) — never numbers or unquoted
- **`true`/`false`/`null` are NOT strings** — no quotes, lowercase only
- **Object = `{}`, Array = `[]`** — wrong bracket = wrong type
- **YAML uses indentation as syntax** — JSON and XML do not
- **XML is `<key>value</key>`** — easy to confuse with HTML
- **A `:` belongs ONLY between key and value** — never after a value in an array

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Six valid JSON data types | **String, number, boolean, null, object, array** |
| What's NOT a JSON type | **"Key" — keys are always strings, not a separate type** |
| Whitespace significant in which language | **YAML** |
| XML format | **`<key>value</key>`** |
| Braces for object, brackets for array | **`{}` object, `[]` array** |
| `"is_up": true` — type of value | **Boolean** |
| `"port": "5"` — type of value | **String** |
| YAML used by which automation tool | **Ansible** |
| RFC for JSON | **RFC 8259** |
| Key separator from value | **Colon `:`** |
| Pair separator inside object | **Comma `,`** (none after last pair) |

## ⚡ One-Line Master Recall

**JSON has 6 types — string (quoted), number, boolean (true/false lowercase), null, object `{key:value}`, array `[v1,v2]` — keys are always strings, comma between pairs (none after last), whitespace insignificant. XML uses `<tags>`. YAML uses indentation as syntax and powers Ansible.**

## ➕ EXTRA — not in video, but on the exam

- **REST APIs (6.6)** — most return JSON; HTTP verbs GET/POST/PUT/DELETE; idempotency; status codes (200/201/400/401/404/500). v1.1 testable.
- **Ansible / Puppet / Chef (6.5)** — Ansible = agentless + YAML playbooks. Puppet/Chef = agent-based, pull-model.
- **Nested objects vs nested arrays** — values can be any JSON type, including another object or array. Common in real API responses.
- **JSON validation tools** — jsonlint.com / `python -m json.tool`. Useful for hands-on practice.

## 🧾 Recap

- **6 JSON types**: string, number, boolean, null, object, array.
- **`{}` = object (key:value), `[]` = array (list of values).**
- **Keys = strings only.** Booleans/null = lowercase, no quotes.
- **No trailing commas.** Comma between pairs/elements, not after the last.
- **Whitespace: insignificant in JSON/XML, significant in YAML** (powers Ansible).
- If you can spot the 4 common syntax errors (missing comma, extra comma, wrong bracket, unquoted key), you're ready for Day 61.

---
Source: Jeremy's IT Lab — Day 60 — https://www.youtube.com/watch?v=nohde2-QNJ4
