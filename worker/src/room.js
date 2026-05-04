// Room Durable Object — Subnet Showdown.
// Generates problems, accepts answers, scores best-of-7, broadcasts state.

const ROUNDS_TO_WIN = 4;       // first to 4 = match win (best of 7)
const ROUND_TIMEOUT_MS = 30000; // 30s per round

export class Room {
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.sessions = new Map(); // ws -> { id, name, score }
    this.match = this.freshMatch();
  }

  freshMatch() {
    return {
      status: 'lobby',         // lobby | playing | finished
      round: 0,
      problem: null,           // current problem
      problemDeadline: 0,
      answeredBy: null,        // first correct player id
      winner: null,
    };
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

    ws.send(JSON.stringify({ type: 'hello', you: player }));
    this.broadcastState();

    ws.addEventListener('message', (e) => {
      let msg;
      try { msg = JSON.parse(e.data); } catch { return; }
      this.onMessage(ws, msg);
    });

    const close = () => {
      this.sessions.delete(ws);
      this.broadcastState();
    };
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
      if (this.match.answeredBy) return; // someone already won this round
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
        // brief pause then next round
        setTimeout(() => this.nextRound(), 1800);
      } else {
        ws.send(JSON.stringify({ type: 'wrong', answer: msg.answer }));
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
    const players = Array.from(this.sessions.values()).map(p => ({
      id: p.id, name: p.name, score: p.score,
    }));
    const payload = JSON.stringify({
      type: 'state',
      players,
      match: this.match,
    });
    for (const ws of this.sessions.keys()) {
      try { ws.send(payload); } catch {}
    }
  }
}

// ── Subnet problem generator ─────────────────────────────────────────────

function generateProblem() {
  const prefix = 8 + Math.floor(Math.random() * 23); // /8../30
  const ip = randomIp();
  const ask = pickAsk(prefix);
  return { id: crypto.randomUUID(), ip, prefix, ask };
}

function pickAsk(prefix) {
  const pool = ['network', 'broadcast', 'firstUsable', 'lastUsable', 'usableHosts'];
  if (prefix >= 31) return 'network'; // /31 /32 have no broadcast/usable
  return pool[Math.floor(Math.random() * pool.length)];
}

function randomIp() {
  const o = () => Math.floor(Math.random() * 256);
  return `${o()}.${o()}.${o()}.${o()}`;
}

function ipToInt(ip) {
  return ip.split('.').reduce((a, b) => (a << 8) + parseInt(b, 10), 0) >>> 0;
}
function intToIp(n) {
  return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');
}

function solve(problem) {
  const { ip, prefix, ask } = problem;
  const mask = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
  const network = ipToInt(ip) & mask;
  const broadcast = (network | (~mask >>> 0)) >>> 0;
  const hosts = prefix >= 31 ? 0 : Math.pow(2, 32 - prefix) - 2;

  switch (ask) {
    case 'network':      return intToIp(network);
    case 'broadcast':    return intToIp(broadcast);
    case 'firstUsable':  return intToIp(network + 1);
    case 'lastUsable':   return intToIp(broadcast - 1);
    case 'usableHosts':  return String(hosts);
    default: return null;
  }
}

function checkAnswer(problem, given) {
  if (typeof given !== 'string') return false;
  const expected = solve(problem);
  return normalize(given) === normalize(expected);
}

function normalize(s) {
  return String(s).trim().toLowerCase().replace(/\s+/g, '');
}
