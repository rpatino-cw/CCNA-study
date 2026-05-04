# CCNA Multiplayer Worker

Cloudflare Worker + Durable Objects backend for CCNA multiplayer games. **Build level 3.**

First game: **Subnet Showdown** (best-of-7 subnet math duel).

## Layout

```
worker/
├── wrangler.toml      # CF config + DO binding
├── package.json
└── src/
    ├── index.js       # router — /room/:id → DO
    └── room.js        # Room DO — lobby, scoring, problem generator
```

## Local dev

```bash
cd ~/dev/CCNA_study/worker
npm install
npx wrangler login        # one-time, browser auth
npx wrangler dev          # serves on http://localhost:8787
```

Test: open `subnet-showdown.html?room=ABC&ws=ws://localhost:8787` in two browser tabs.

## Deploy

```bash
cd ~/dev/CCNA_study/worker
npx wrangler deploy
```

After first deploy, note the URL Cloudflare prints (e.g. `https://ccna-multiplayer.<account>.workers.dev`). Plug it into the frontend page (`subnet-showdown.html`) as the default `ws://` target.

Optional: bind a custom subdomain in `wrangler.toml` (`[[routes]]` block, commented out by default).

## Protocol

Client → Server messages:
- `{type:"start"}` — begin match (lobby → playing)
- `{type:"answer", answer:"10.0.0.0"}` — submit answer
- `{type:"reset"}` — back to lobby

Server → Client messages:
- `{type:"hello", you:{id,name,score}}`
- `{type:"state", players:[...], match:{...}}`
- `{type:"wrong", answer:"..."}` — your answer was wrong; round still live

## Free tier limits (as of 2026)

- 100k requests/day
- 1 GB DO storage
- Unlimited DO invocations within request budget
- WebSocket hibernation keeps idle rooms free

Plenty for friend-group play. Revisit if usage grows.

## Adding a new game

1. Add a new DO class (e.g. `ACLSniper`) in `src/`.
2. Add binding in `wrangler.toml` + new `class_name`.
3. Route it in `src/index.js` (e.g. `/acl-sniper/:id`).
4. Pattern is shared: lobby state → match state → broadcast on every change.

Idea backlog: `~/Documents/Obsidian Vault/study/ccna/multiplayer-game-ideas.md`
