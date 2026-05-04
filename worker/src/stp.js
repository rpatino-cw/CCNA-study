// STP Bridge Election — race to pick the root bridge from 4 switches.
// Bridge ID = priority + MAC. Lowest priority wins. Tie-break: lowest MAC.

const ROUNDS_TO_WIN = 4;
const ROUND_TIMEOUT_MS = 30000;

const VALID_PRIORITIES = [0, 4096, 8192, 16384, 24576, 32768, 36864, 40960, 49152, 57344, 61440];

export class Stp {
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
  // Scenario types:
  //  - 50% all-same-priority (default 32768) → pure MAC tie-break, drills correct mental model
  //  - 30% one switch has clearly lower priority → easy
  //  - 20% two share lowest priority → MAC tie-break between just those two
  const r = Math.random();
  let switches;
  if (r < 0.5) {
    switches = makeAllSamePriority();
  } else if (r < 0.8) {
    switches = makeOneLowest();
  } else {
    switches = makeTwoLowest();
  }

  // Resolve root: lowest priority, tie on lowest MAC
  let rootIdx = 0;
  for (let i = 1; i < switches.length; i++) {
    if (cmp(switches[i], switches[rootIdx]) < 0) rootIdx = i;
  }

  const labels = ['A','B','C','D'];
  return {
    id: crypto.randomUUID(),
    switches: switches.map((s, i) => ({ letter: labels[i], name: s.name, priority: s.priority, mac: s.mac })),
    correct: labels[rootIdx],
  };
}

function cmp(a, b) {
  if (a.priority !== b.priority) return a.priority - b.priority;
  return macCompare(a.mac, b.mac);
}

function macCompare(a, b) {
  // Compare lowercase MAC strings byte by byte
  return a.toLowerCase().localeCompare(b.toLowerCase());
}

function makeAllSamePriority() {
  const prio = 32768;
  return shuffle([1,2,3,4]).map(n => ({
    name: 'SW' + n, priority: prio, mac: randomMac(),
  }));
}

function makeOneLowest() {
  const others = pick(VALID_PRIORITIES.filter(p => p >= 8192));
  const winnerPrio = pick(VALID_PRIORITIES.filter(p => p < others));
  const switches = [
    { name:'SW1', priority: others, mac: randomMac() },
    { name:'SW2', priority: others, mac: randomMac() },
    { name:'SW3', priority: others, mac: randomMac() },
    { name:'SW4', priority: winnerPrio, mac: randomMac() },
  ];
  return shuffle(switches);
}

function makeTwoLowest() {
  const lowPrio = pick(VALID_PRIORITIES.filter(p => p <= 16384));
  const highPrio = pick(VALID_PRIORITIES.filter(p => p > lowPrio));
  return shuffle([
    { name:'SW1', priority: lowPrio,  mac: randomMac() },
    { name:'SW2', priority: lowPrio,  mac: randomMac() },
    { name:'SW3', priority: highPrio, mac: randomMac() },
    { name:'SW4', priority: highPrio, mac: randomMac() },
  ]);
}

function pick(arr) { return arr[Math.floor(Math.random()*arr.length)]; }
function shuffle(a) {
  const out = a.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  // Re-label switches sequentially after shuffle so SW1..SW4 ≠ A..D order
  out.forEach((s, i) => { if (typeof s === 'object') s.name = 'SW' + (i+1); });
  return out;
}

function randomMac() {
  const hex = '0123456789abcdef';
  const oct = () => hex[Math.floor(Math.random()*16)] + hex[Math.floor(Math.random()*16)];
  return [oct(),oct(),oct(),oct(),oct(),oct()].join(':');
}

function checkAnswer(problem, given) {
  if (typeof given !== 'string') return false;
  return given.trim().toUpperCase() === problem.correct;
}
