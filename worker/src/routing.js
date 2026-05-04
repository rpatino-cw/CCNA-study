// Route Lookup — race to pick the winning route by longest-prefix match.
// Server presents a destination IP + 4 candidate routes. Player answers the
// letter (A/B/C/D) of the route that wins.

const ROUNDS_TO_WIN = 4;
const ROUND_TIMEOUT_MS = 30000;

export class Routing {
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
  // Pick a destination and build 4 candidate routes. Exactly one is the LPM
  // winner (or the default route, if no specific route matches).
  const dest = randomDest();
  const routes = buildRoutes(dest);

  // Resolve: longest prefix that matches
  let best = -1, bestPrefix = -1;
  routes.forEach((r, i) => {
    if (matches(dest, r.network, r.prefix) && r.prefix > bestPrefix) {
      best = i; bestPrefix = r.prefix;
    }
  });

  const labels = ['A','B','C','D'];
  return {
    id: crypto.randomUUID(),
    dest,
    routes: routes.map((r, i) => ({ label: labels[i], network: r.network, prefix: r.prefix, nh: r.nh })),
    correct: labels[best],
  };
}

function randomDest() {
  const blocks = [
    ['10', '0', '0', '0', 8],
    ['172', '16', '0', '0', 12],
    ['192', '168', '0', '0', 16],
  ];
  const b = blocks[Math.floor(Math.random()*blocks.length)];
  // Random IP within the block's address space
  const o = () => Math.floor(Math.random()*256);
  if (b[4] === 8) return b[0] + '.' + o() + '.' + o() + '.' + o();
  if (b[4] === 12) return b[0] + '.' + (16 + Math.floor(Math.random()*16)) + '.' + o() + '.' + o();
  return b[0] + '.' + b[1] + '.' + o() + '.' + o();
}

function buildRoutes(dest) {
  const routes = [];

  // ~70% of the time include a clear LPM winner: a /24 or /28 covering dest
  // The other ~30%, only a default route or short prefix matches.
  const includeWinner = Math.random() < 0.85;

  if (includeWinner) {
    const winnerPrefix = pick([20, 22, 24, 26, 28, 30]);
    routes.push({ network: networkOf(dest, winnerPrefix), prefix: winnerPrefix, nh: randomNH() });
  }

  // Add a less-specific match (covers dest, shorter prefix)
  const lessPrefix = pick([8, 12, 16]);
  routes.push({ network: networkOf(dest, lessPrefix), prefix: lessPrefix, nh: randomNH() });

  // Add a non-matching distractor in another block
  routes.push(distractor(dest));

  // Add the default route 0.0.0.0/0 about half the time
  if (Math.random() < 0.5) routes.push({ network: '0.0.0.0', prefix: 0, nh: randomNH() });
  else routes.push(distractor(dest));

  // Pad to exactly 4 if we shorted (no winner case)
  while (routes.length < 4) routes.push(distractor(dest));
  if (routes.length > 4) routes.length = 4;

  // Shuffle
  for (let i = routes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [routes[i], routes[j]] = [routes[j], routes[i]];
  }
  return routes;
}

function distractor(dest) {
  // Generate a random network in a different /8 from dest
  const destFirst = parseInt(dest.split('.')[0], 10);
  let first;
  do { first = pick([10, 172, 192, 100, 198]); } while (first === destFirst);
  const o = () => Math.floor(Math.random()*256);
  const prefix = pick([16, 20, 24]);
  const candidate = first + '.' + o() + '.' + o() + '.0';
  return { network: networkOf(candidate, prefix), prefix, nh: randomNH() };
}

function pick(arr) { return arr[Math.floor(Math.random()*arr.length)]; }

function randomNH() {
  return '10.' + Math.floor(Math.random()*256) + '.' + Math.floor(Math.random()*256) + '.1';
}

// ── IP math ─────────────────────────────────────────────────────────────

function ipToInt(ip) { return ip.split('.').reduce((a,b)=>(a<<8)+parseInt(b,10),0)>>>0; }
function intToIp(n) { return [(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join('.'); }

function networkOf(ip, prefix) {
  if (prefix === 0) return '0.0.0.0';
  const mask = (~0 << (32 - prefix)) >>> 0;
  return intToIp(ipToInt(ip) & mask);
}

function matches(ip, network, prefix) {
  if (prefix === 0) return true;
  const mask = (~0 << (32 - prefix)) >>> 0;
  return (ipToInt(ip) & mask) === (ipToInt(network) & mask);
}

function checkAnswer(problem, given) {
  if (typeof given !== 'string') return false;
  const norm = given.trim().toUpperCase();
  return norm === problem.correct;
}
