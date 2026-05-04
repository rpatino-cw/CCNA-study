// Wildcard Whisperer — bidirectional wildcard mask race.
// 50/50: prefix → wildcard, or wildcard → prefix.

const ROUNDS_TO_WIN = 4;
const ROUND_TIMEOUT_MS = 30000;

export class Wildcard {
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.sessions = new Map();
    this.match = this.freshMatch();
  }

  freshMatch() {
    return { status:'lobby', round:0, problem:null, problemDeadline:0, answeredBy:null, winner:null };
  }

  async fetch(request) {
    if (request.headers.get('Upgrade') !== 'websocket') {
      return new Response('Expected WebSocket', { status: 426 });
    }
    const pair = new WebSocketPair();
    await this.handleSession(pair[1], request);
    return new Response(null, { status: 101, webSocket: pair[0] });
  }

  async handleSession(ws, request) {
    ws.accept();
    const url = new URL(request.url);
    const name = (url.searchParams.get('name') || 'guest').slice(0, 16);
    const id = crypto.randomUUID();
    const player = { id, name, score: 0 };
    this.sessions.set(ws, player);

    ws.send(JSON.stringify({ type:'hello', you: player }));
    this.broadcastState();

    ws.addEventListener('message', (e) => {
      let msg; try { msg = JSON.parse(e.data); } catch { return; }
      this.onMessage(ws, msg);
    });
    const close = () => { this.sessions.delete(ws); this.broadcastState(); };
    ws.addEventListener('close', close);
    ws.addEventListener('error', close);
  }

  onMessage(ws, msg) {
    const me = this.sessions.get(ws);
    if (!me) return;

    if (msg.type === 'start' && this.match.status === 'lobby' && this.sessions.size >= 2) {
      this.match = this.freshMatch();
      this.match.status = 'playing';
      for (const p of this.sessions.values()) p.score = 0;
      this.nextRound();
      return;
    }

    if (msg.type === 'answer' && this.match.status === 'playing' && this.match.problem) {
      if (this.match.answeredBy) return;
      const correct = checkAnswer(this.match.problem, msg.answer);
      if (correct) {
        this.match.answeredBy = me.id;
        me.score += 1;
        if (me.score >= ROUNDS_TO_WIN) {
          this.match.status = 'finished';
          this.match.winner = me.id;
          this.broadcastState();
          return;
        }
        this.broadcastState();
        setTimeout(() => this.nextRound(), 1800);
      } else {
        ws.send(JSON.stringify({ type:'wrong', answer: msg.answer }));
      }
    }

    if (msg.type === 'reset') {
      this.match = this.freshMatch();
      for (const p of this.sessions.values()) p.score = 0;
      this.broadcastState();
    }
  }

  nextRound() {
    this.match.round += 1;
    this.match.problem = generateProblem();
    this.match.answeredBy = null;
    this.match.problemDeadline = Date.now() + ROUND_TIMEOUT_MS;
    this.broadcastState();
  }

  broadcastState() {
    const players = Array.from(this.sessions.values()).map(p => ({ id:p.id, name:p.name, score:p.score }));
    const payload = JSON.stringify({ type:'state', players, match:this.match });
    for (const ws of this.sessions.keys()) { try { ws.send(payload); } catch {} }
  }
}

// ── Problem generator ───────────────────────────────────────────────────

function generateProblem() {
  // Pick a /prefix in the meaningful range for ACL-style wildcards.
  // /8..30 covers exam scope. Skip /31 /32 (no inverse interesting).
  const prefix = 8 + Math.floor(Math.random() * 23); // 8..30
  const direction = Math.random() < 0.5 ? 'p2w' : 'w2p';
  // p2w = "given /N, what is the wildcard?"
  // w2p = "given wildcard, what is /N?"
  return { id: crypto.randomUUID(), prefix, direction };
}

function maskOf(prefix) {
  if (prefix === 0) return 0;
  return (~0 << (32 - prefix)) >>> 0;
}
function intToIp(n) {
  return [(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join('.');
}
function ipToInt(ip) {
  const parts = ip.split('.').map(s => parseInt(s, 10));
  if (parts.length !== 4 || parts.some(p => Number.isNaN(p) || p < 0 || p > 255)) return null;
  return ((parts[0] << 24) + (parts[1] << 16) + (parts[2] << 8) + parts[3]) >>> 0;
}

function wildcardOf(prefix) {
  return intToIp((~maskOf(prefix)) >>> 0);
}

function checkAnswer(problem, given) {
  if (typeof given !== 'string') return false;
  const norm = given.trim().toLowerCase().replace(/\s+/g,'');

  if (problem.direction === 'p2w') {
    // Expect dotted-quad wildcard
    const want = wildcardOf(problem.prefix);
    return norm === want;
  }
  if (problem.direction === 'w2p') {
    // Expect prefix length, accept "24" or "/24"
    const num = parseInt(norm.replace(/^\//,''), 10);
    if (Number.isNaN(num)) return false;
    return num === problem.prefix;
  }
  return false;
}
