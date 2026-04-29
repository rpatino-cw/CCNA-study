---
title: "Free CCNA | REST APIs | Day 61 | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-61
source_transcript: "[[../jeremy-it-videos/121-rest-apis-day-61]]"
source_url: https://www.youtube.com/watch?v=Luei0p-2h10
created: 2026-04-28
tags: [ccna, cheat-sheet, day-61]
---

# Day 61 — REST APIs (HTTP Verbs, CRUD, Response Codes)

## 🎯 What this video covers

Maps to v1.1 **6.5 (characteristics of REST-based APIs)**. CRUD ↔ HTTP verbs, REST constraints, request/response structure, response code classes, and a Cisco DNA Center sandbox example.

## 🧠 Core Concept

**REST = stateless client-server framework over HTTP that maps CRUD operations to HTTP verbs (POST/GET/PUT/PATCH/DELETE).**

## 🔑 Must-Know Table

| CRUD | HTTP Verb | Purpose |
|---|---|---|
| **Create** | **POST** | New resource |
| **Read** | **GET** | Retrieve resource |
| **Update** | **PUT / PATCH** | Modify resource (PUT replaces; PATCH partial) |
| **Delete** | **DELETE** | Remove resource |

| Response code class | Meaning | Common examples |
|---|---|---|
| **1xx** | Informational | 102 Processing |
| **2xx** | **Success** | **200 OK**, 201 Created |
| **3xx** | Redirection | 301 Moved Permanently |
| **4xx** | **Client error** | **404 Not Found**, 401 Unauthorized |
| **5xx** | Server error | 500 Internal Server Error |

| REST Constraint | What it means |
|---|---|
| **Client-Server** | Separation of concerns; both sides evolve independently |
| **Stateless** | Each request is independent; server stores no session state |
| **Cacheable** | Server marks resources cacheable / non-cacheable |
| **Uniform interface** | Standard methods (HTTP verbs) and resource URIs |
| **Layered system** | Intermediate proxies/caches OK |
| **Code on demand** (optional) | Server can send executable code to client |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **REST vs HTTP** | REST = framework/style. HTTP = transport protocol REST usually rides on |
| **Stateless (REST) vs Stateful (TCP)** | TCP keeps state at L4; REST at L7 does not — must auth each call |
| **PUT vs PATCH** | PUT replaces the whole resource. PATCH updates fields |
| **URI vs URL** | URL is a type of URI (specifies *location*). URI is broader |
| **Northbound vs Southbound API** | NBI = app↔controller (often REST). SBI = controller↔devices (NETCONF/RESTCONF/OpenFlow) |
| **JSON vs XML** | Both data formats. JSON dominates modern REST |
| **401 vs 403** | 401 = needs to authenticate. 403 = authenticated but forbidden |

## 🔗 How it all connects

```
Client → HTTPS request (verb + URI + headers + body) → REST server → response (code + body) → JSON/XML
```

## 🚨 Exam Traps

- **REST is NOT** the same as HTTP — REST is a style; HTTP is the protocol underneath
- **REST is NOT** stateful — every request is independent
- **POST is NOT** an update — it's **create**
- **404 is NOT** a server error — it's a **client error** (4xx)
- **GET is NOT** for changing data — it's read-only
- **REST APIs do NOT** require XML — JSON is more common

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| CRUD = | **Create, Read, Update, Delete** |
| Verb for Create | **POST** |
| Verb for Read | **GET** |
| Verbs for Update | **PUT, PATCH** |
| Verb for Delete | **DELETE** |
| Successful response code | **2xx (200 OK, 201 Created)** |
| "Resource not found" code | **404** |
| "Need to authenticate" code | **401** |
| Server can't fulfill request | **5xx (500)** |
| REST is stateful or stateless? | **Stateless** |
| URI scheme example | **`https`** |
| Common data format for REST | **JSON** |
| NBI in SDN typically uses | **REST APIs** |
| NOT a REST constraint | **Stateful** (REST is stateless) |

## ⚡ One-Line Master Recall

**REST = stateless client-server over HTTP; CRUD maps to POST/GET/PUT-or-PATCH/DELETE; 2xx success, 4xx client error, 5xx server error; data usually JSON.**

## ➕ EXTRA — not in video, but on the exam

- **Authentication tokens** — Common pattern: POST credentials → get token → include in `X-Auth-Token` header on subsequent calls.
- **NETCONF / RESTCONF** — Other automation APIs (XML/JSON over SSH or HTTPS) — typically southbound.
- **JSON syntax** — `{"key": "value", "list": [1, 2, 3]}`. Know how to read it.
- **Idempotent verbs** — GET, PUT, DELETE are idempotent (same result if repeated). POST/PATCH are not.

## 🧾 Recap

- **REST = stateless, client-server framework — usually over HTTPS.**
- **CRUD ↔ verbs: POST = Create, GET = Read, PUT/PATCH = Update, DELETE = Delete.**
- **Response codes: 2xx OK, 3xx redirect, 4xx client error, 5xx server error.**
- **JSON is the dominant data format. URI = address of the resource.**
- **REST APIs are the typical Northbound interface in SDN.**
- If you can map any CRUD action to its HTTP verb and recognize a 401 vs 404 vs 500 instantly, you're green-light for Day 62.

---
Source: Jeremy's IT Lab — Day 61 — https://www.youtube.com/watch?v=Luei0p-2h10
