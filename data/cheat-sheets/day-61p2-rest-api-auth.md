---
title: "REST API Authentication | CCNA 200-301 Day 61 (part 2)"
type: ccna-cheat-sheet
day: day-61p2
source_transcript: "[[../jeremy-it-videos/122-rest-api-authentication-ccna-200-301-day-61-part-2]]"
source_url: https://www.youtube.com/watch?v=bmqr_xpt6sc
created: 2026-04-28
tags: [ccna, cheat-sheet, day-61p2]
---

# Day 61 (Part 2) — REST API Authentication

## 🎯 What this video covers

Maps to v1.1 blueprint **6.5 REST APIs auth types**. Four auth methods: Basic, Bearer (token), API Key, and OAuth 2.0. All should ride **HTTPS** — never plain HTTP.

## 🧠 Core Concept

**API auth lives in the HTTP `Authorization:` header. Basic = Base64 user:pass. Bearer = expiring token. API Key = static key. OAuth 2.0 = delegated access via tokens, no creds shared.**

## 🔑 Must-Know Table

| Method | What's sent | Format | Expires? | Best for |
|---|---|---|---|---|
| **Basic** | username:password Base64-encoded | `Authorization: Basic <b64>` | Never (creds reused) | Quick internal use |
| **Bearer** | Token from auth server | `Authorization: Bearer <token>` | **Yes** | Modern APIs |
| **API Key** | Static key from provider | `Authorization: <key>` (or header) | **Manual revoke** | Usage tracking, cloud APIs |
| **OAuth 2.0** | Access token via flow | `Authorization: Bearer <token>` | Yes + refresh token | Delegated 3rd-party access |

## 🔑 Must-Know Table — OAuth 2.0 Roles

| Role | Example (Google Cal scenario) |
|---|---|
| **Resource owner** | The Google account user |
| **Client app** | Third-party scheduling tool |
| **Authorization server** | Google's OAuth service |
| **Resource server** | Server hosting Google Calendar data |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Encoding vs Encryption** | Base64 = **encoding** (reversible, NOT secure). HTTPS/TLS = **encryption** |
| **Bearer token vs API Key** | Bearer expires automatically. **API Key is static** until manually revoked |
| **API Key vs OAuth 2.0** | API key = simple identifier. OAuth = full delegation flow with user consent |
| **Access token vs Refresh token** | Access = short-lived for API calls. **Refresh = long-lived to get new access tokens without re-login** |
| **Auth server vs Resource server** | Auth server **issues** the token. Resource server **validates** it and serves data |

## 🔗 How it all connects (OAuth 2.0)

```
1. Client → asks Resource Owner for permission
2. Owner grants authorization
3. Client → Auth Server: trade grant for access token
4. Auth Server → issues access token (+ refresh token)
5. Client → Resource Server: API call with access token
6. Resource Server → returns the resource
```

## 🚨 Exam Traps

- **Base64 is NOT encryption** — easily decoded. Don't confuse with HTTPS protection
- **API keys do NOT expire automatically** — must be manually rotated
- **API keys should NOT go in URL** — URLs are logged. Put them in `Authorization` header
- **Basic auth is NOT secure on HTTP** — must run over HTTPS or creds leak
- **OAuth does NOT share user passwords** with the third-party app — that's the entire point
- **Bearer token "bearer" means** anyone with the token can use it — short expiration mitigates theft

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Auth methods using an auth server to issue tokens | **OAuth 2.0** + **Bearer** |
| How OAuth 2.0 improves security | Third-party access **without exposing user credentials** |
| "Log in with Google" uses | **OAuth 2.0** |
| API key best practice — where to put it | **Authorization HTTP header** (not URL) |
| Refresh token purpose | Get new access token **without** user re-login |
| Why basic auth needs HTTPS | Base64 is **encoding, not encryption** |
| Static credential that doesn't expire | **API Key** |
| Auth method best for tracking per-customer usage | **API Key** |

## ⚡ One-Line Master Recall

**Basic = user:pass Base64. Bearer = expiring token. API Key = static. OAuth 2.0 = delegated access (Owner → Client → Auth Server → Resource Server). All over HTTPS.**

## ➕ EXTRA — not in video, but on the exam

- **JWT (JSON Web Token)** — common bearer-token format. Three parts: header.payload.signature, base64-url encoded.
- **mTLS** — mutual TLS, both sides present certs. Used in zero-trust API meshes (Istio, service-to-service).
- **OAuth 2.0 grant types** — Authorization Code (web apps), Client Credentials (machine-to-machine), Implicit (deprecated), Device Code (TVs).
- **OpenID Connect (OIDC)** — auth-N layer on top of OAuth 2.0 (which is auth-Z). Adds ID token. Not on CCNA but useful context.

## 🧾 Recap

- Four CCNA auth methods: **Basic, Bearer, API Key, OAuth 2.0**.
- **Basic = Base64 user:pass** (encoding, not encryption — needs HTTPS).
- **Bearer token** expires; **API key** is static until revoked.
- **OAuth 2.0** = delegated access — third party gets a token without ever seeing the user's password.
- Always put credentials in the `Authorization:` HTTP header. Always use HTTPS.
- If you can identify any of the 4 auth headers and explain OAuth 2.0's 4 roles, you're CCNA-ready on REST auth.

---
Source: Jeremy's IT Lab — Day 61 (Part 2) — https://www.youtube.com/watch?v=bmqr_xpt6sc
