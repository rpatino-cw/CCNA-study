// NAT Decoder — race to classify an IP as Inside Local / Inside Global /
// Outside Local / Outside Global given a translation scenario.

const ROUNDS_TO_WIN = 4;
const ROUND_TIMEOUT_MS = 30000;

export class Nat {
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
//
// Cisco NAT terms (the universally-confused part):
//   Inside Local   = host's own RFC1918 IP, as the inside network sees it
//   Inside Global  = host's translated public IP, as the outside sees it
//   Outside Local  = remote host's IP as the inside sees it (after any NAT applied to dest)
//   Outside Global = remote host's actual public IP
//
// In a typical outbound source-NAT scenario (no destination NAT), Outside Local == Outside Global.
// We pick a random IP from one of the four roles and ask the player to label it.

const LABELS = ['inside-local','inside-global','outside-local','outside-global'];
const PRETTY = {
  'inside-local':'Inside Local',
  'inside-global':'Inside Global',
  'outside-local':'Outside Local',
  'outside-global':'Outside Global',
};

export function generateProblem() {
  const insideLocal  = randomPrivate();
  const insideGlobal = randomPublic();
  // 70% of rounds: simple outbound NAT (outside local == outside global).
  // 30%: dest NAT scenario where outside local and outside global differ.
  const destNat = Math.random() < 0.3;
  const outsideGlobal = randomPublic();
  const outsideLocal  = destNat ? randomPublic() : outsideGlobal;

  const scenario = {
    insideLocal, insideGlobal, outsideLocal, outsideGlobal, destNat,
  };

  // Pick a target role to ask about
  const role = LABELS[Math.floor(Math.random() * LABELS.length)];
  const targetIp = scenario[ camelOf(role) ];

  // Build 4 letter-tagged choices in shuffled order
  const choices = LABELS.map(l => ({ label: l, pretty: PRETTY[l] }));
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }
  const letters = ['A','B','C','D'];
  choices.forEach((c, i) => { c.letter = letters[i]; });
  const correctLetter = choices.find(c => c.label === role).letter;

  return {
    id: crypto.randomUUID(),
    scenario,
    targetIp,
    targetRole: role,
    choices: choices.map(c => ({ letter: c.letter, label: c.pretty, role: c.label })),
    correct: correctLetter,
  };
}

function camelOf(role) {
  // 'inside-local' → 'insideLocal'
  return role.replace(/-([a-z])/g, (_,c) => c.toUpperCase());
}

function randomPrivate() {
  const variants = [
    () => '10.' + r256() + '.' + r256() + '.' + r1to254(),
    () => '172.' + (16 + Math.floor(Math.random()*16)) + '.' + r256() + '.' + r1to254(),
    () => '192.168.' + r256() + '.' + r1to254(),
  ];
  return variants[Math.floor(Math.random()*variants.length)]();
}
function randomPublic() {
  // Use clearly-public TEST-NET / global blocks. Avoid RFC1918 ranges.
  const variants = [
    () => '198.51.100.' + r1to254(),
    () => '203.0.113.' + r1to254(),
    () => '8.8.' + r256() + '.' + r1to254(),
    () => '1.1.' + r256() + '.' + r1to254(),
    () => '64.' + r256() + '.' + r256() + '.' + r1to254(),
  ];
  return variants[Math.floor(Math.random()*variants.length)]();
}
function r256() { return Math.floor(Math.random()*256); }
function r1to254() { return 1 + Math.floor(Math.random()*254); }

export function checkAnswer(problem, given) {
  if (typeof given !== 'string') return false;
  return given.trim().toUpperCase() === problem.correct;
}
