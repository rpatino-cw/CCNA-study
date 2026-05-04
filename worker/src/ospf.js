// OSPF States — race to identify the neighbor state from a triggering event.
// 7 states reduced to 4 buttons per round (correct + 3 random distractors).

const ROUNDS_TO_WIN = 4;
const ROUND_TIMEOUT_MS = 30000;

// (state, event description) — the player sees the event and picks the state.
const STATE_EVENTS = [
  { state: 'Down',     event: 'No Hello packets have been received from this neighbor yet.' },
  { state: 'Init',     event: 'A Hello has been received from this neighbor, but my Router ID is not listed in their neighbor list yet.' },
  { state: '2-Way',    event: 'A Hello has been received from this neighbor and it includes my Router ID in their neighbor list. DR/BDR election can occur now.' },
  { state: 'ExStart',  event: 'Master/slave relationship is being negotiated. Empty DBD packets are exchanged to pick the higher Router ID as master.' },
  { state: 'Exchange', event: 'Routers are sending Database Description (DBD) packets that summarize each LSA in their LSDB.' },
  { state: 'Loading',  event: 'Routers send Link State Requests (LSRs) for missing LSAs and receive Link State Updates (LSUs) in reply.' },
  { state: 'Full',     event: 'Both routers have synchronized LSDBs. No LSRs are pending. The adjacency is fully formed.' },
];

const ALL_STATES = STATE_EVENTS.map(e => e.state);

export class Ospf {
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

export function generateProblem() {
  const target = STATE_EVENTS[Math.floor(Math.random()*STATE_EVENTS.length)];
  const distractors = ALL_STATES.filter(s => s !== target.state);
  shuffle(distractors);
  const choices = shuffle([target.state, ...distractors.slice(0, 3)]);
  const letters = ['A','B','C','D'];
  const tagged = choices.map((s, i) => ({ letter: letters[i], state: s }));
  const correctLetter = tagged.find(c => c.state === target.state).letter;
  return {
    id: crypto.randomUUID(),
    event: target.event,
    choices: tagged,
    correct: correctLetter,
  };
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function checkAnswer(problem, given) {
  if (typeof given !== 'string') return false;
  return given.trim().toUpperCase() === problem.correct;
}
