// Wireless Standards — race to identify the 802.11 standard from a property.

const ROUNDS_TO_WIN = 4;
const ROUND_TIMEOUT_MS = 30000;

// (standard, property description) — player picks the standard.
// Multiple entries per standard so the same standard can be asked from
// different angles (band, modulation, MIMO type, max throughput).
const STANDARDS = [
  { std:'802.11a',  prop:'Operates in the 5 GHz band only. Uses OFDM. Tops out around 54 Mbps.' },
  { std:'802.11a',  prop:'5 GHz only, OFDM, ~54 Mbps. Came out alongside 802.11b but on a different band, so they are not interoperable.' },
  { std:'802.11b',  prop:'Operates in the 2.4 GHz band only. Uses DSSS. Tops out around 11 Mbps.' },
  { std:'802.11b',  prop:'2.4 GHz, DSSS, max 11 Mbps. The slowest of the lettered amendments still in scope.' },
  { std:'802.11g',  prop:'Operates in the 2.4 GHz band only. Uses OFDM. Tops out around 54 Mbps. Backward compatible with 802.11b.' },
  { std:'802.11g',  prop:'2.4 GHz, OFDM, ~54 Mbps. Same speed class as 802.11a but on the b/g band.' },
  { std:'802.11n',  prop:'Marketed as Wi-Fi 4. Dual-band (2.4 GHz and 5 GHz). First standard to use MIMO. Up to ~600 Mbps with 4 spatial streams.' },
  { std:'802.11n',  prop:'Wi-Fi 4. Introduced channel bonding (40 MHz channels) and frame aggregation.' },
  { std:'802.11ac', prop:'Marketed as Wi-Fi 5. 5 GHz only. Adds 80 and 160 MHz channels. Wave 2 added MU-MIMO on the downlink. Theoretical multi-Gbps.' },
  { std:'802.11ac', prop:'Wi-Fi 5. First to support 256-QAM and downlink MU-MIMO.' },
  { std:'802.11ax', prop:'Marketed as Wi-Fi 6. Operates in 2.4 GHz and 5 GHz. Introduces OFDMA and uplink + downlink MU-MIMO. Targets dense-client environments.' },
  { std:'802.11ax', prop:'Wi-Fi 6. First to use OFDMA, BSS coloring, and Target Wake Time (TWT) for power savings.' },
  { std:'802.11ax', prop:'Wi-Fi 6E refers to this same amendment but operating in the new 6 GHz band, opening 1200 MHz of additional spectrum.' },
];

const ALL_STANDARDS = [...new Set(STANDARDS.map(s => s.std))];

export class Wifi {
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
  const target = STANDARDS[Math.floor(Math.random()*STANDARDS.length)];
  const distractors = ALL_STANDARDS.filter(s => s !== target.std);
  shuffle(distractors);
  const choices = shuffle([target.std, ...distractors.slice(0, 3)]);
  const letters = ['A','B','C','D'];
  const tagged = choices.map((s, i) => ({ letter: letters[i], std: s }));
  const correctLetter = tagged.find(c => c.std === target.std).letter;
  return {
    id: crypto.randomUUID(),
    prop: target.prop,
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
