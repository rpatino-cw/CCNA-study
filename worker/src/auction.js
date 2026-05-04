// CIDR Auction — VLSM race. Server names a tenant host-count, players race
// to submit the smallest prefix length that fits.
//
// Same protocol as Subnet Showdown: hello / state / wrong messages.
// Same lobby/match shape so the frontend can reuse the pattern.

const ROUNDS_TO_WIN = 4;
const ROUND_TIMEOUT_MS = 30000;

const TENANTS = [
  'Marketing','Engineering','Finance','Sales','HR','Support','Ops','Lab',
  'Guest WiFi','IoT sensors','VoIP phones','Servers','Printers','CCTV',
  'Storage','Backup','DMZ','Dev','QA','Staging','Build farm','VDI pool',
];

export class Auction {
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

// ── VLSM problem generator ──────────────────────────────────────────────

export function generateProblem() {
  // Tenant needs N hosts. Player must answer the smallest prefix that fits.
  const hostsTarget = randomHosts();
  const tenant = TENANTS[Math.floor(Math.random() * TENANTS.length)];
  return { id: crypto.randomUUID(), tenant, hosts: hostsTarget, ask: 'prefix' };
}

function randomHosts() {
  // Bias toward awkward numbers that force "round up" thinking
  const examples = [2, 5, 12, 26, 50, 60, 100, 120, 200, 250, 500, 600, 800, 1000, 1500, 2000, 3000, 4000];
  return examples[Math.floor(Math.random() * examples.length)];
}

// Smallest prefix length that yields >= n usable hosts.
function smallestPrefixForHosts(n) {
  // usable = 2^(32-prefix) - 2  >= n
  // 2^(32-prefix) >= n + 2
  // 32-prefix >= ceil(log2(n+2))
  // prefix <= 32 - ceil(log2(n+2))
  const need = n + 2;
  let bits = 0;
  while ((1 << bits) < need) bits++;
  const prefix = 32 - bits;
  return Math.max(0, Math.min(32, prefix));
}

export function checkAnswer(problem, given) {
  if (typeof given !== 'string') return false;
  const norm = String(given).trim().toLowerCase().replace(/\s+/g, '').replace(/^\//, '');
  const want = smallestPrefixForHosts(problem.hosts);
  const num = parseInt(norm, 10);
  if (Number.isNaN(num)) return false;
  return num === want;
}
