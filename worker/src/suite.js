// Suite DO — Game Night mega-lobby. Host picks which of the 9 games is
// active. All players follow. Scores accumulate across game switches.
//
// Reuses each game module's exported generateProblem + checkAnswer.

import * as Subnet   from './room.js';
import * as Cidr     from './auction.js';
import * as Route    from './routing.js';
import * as Wildcard from './wildcard.js';
import * as Port     from './ports.js';
import * as Nat      from './nat.js';
import * as Stp      from './stp.js';
import * as Ospf     from './ospf.js';
import * as Wifi     from './wifi.js';

const GAMES = {
  subnet:   { mod: Subnet,   label: 'Subnet Showdown' },
  cidr:     { mod: Cidr,     label: 'CIDR Auction'    },
  route:    { mod: Route,    label: 'Route Lookup'    },
  wildcard: { mod: Wildcard, label: 'Wildcard Whisperer' },
  port:     { mod: Port,     label: 'Port Patrol'     },
  nat:      { mod: Nat,      label: 'NAT Decoder'     },
  stp:      { mod: Stp,      label: 'STP Root Bridge' },
  ospf:     { mod: Ospf,     label: 'OSPF States'     },
  wifi:     { mod: Wifi,     label: 'Wireless Standards' },
};

const GAME_KEYS = Object.keys(GAMES);
const HOST_IDLE_MS = 30 * 1000; // 30s before "Claim host" enables for others

export class Suite {
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.sessions = new Map();          // ws -> player
    this.hostId = null;                  // current host's player id
    this.lastHostAction = 0;             // last time host did anything
    this.activeGame = null;              // null = no game running
    this.problem = null;                 // current problem
    this.answeredBy = null;              // first correct player id
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
    const player = {
      id, name,
      total: 0,                     // running total across all games
      perGame: blankPerGame(),      // { subnet:0, cidr:0, ... }
      joinedAt: Date.now(),
    };
    this.sessions.set(ws, player);

    // Promote first player to host
    if (!this.hostId) {
      this.hostId = id;
      this.lastHostAction = Date.now();
    }

    ws.send(JSON.stringify({
      type: 'hello',
      you: this.publicPlayer(player),
      games: GAME_KEYS.map(k => ({ key: k, label: GAMES[k].label })),
    }));
    this.broadcastState();

    ws.addEventListener('message', (e) => {
      let msg; try { msg = JSON.parse(e.data); } catch { return; }
      this.onMessage(ws, msg);
    });
    const close = () => {
      this.sessions.delete(ws);
      // If host left, leave hostId until someone claims it (no auto-promote yet)
      this.broadcastState();
    };
    ws.addEventListener('close', close);
    ws.addEventListener('error', close);
  }

  onMessage(ws, msg) {
    const me = this.sessions.get(ws);
    if (!me) return;

    if (msg.type === 'pick-game' && me.id === this.hostId) {
      const key = String(msg.game || '').toLowerCase();
      if (!GAMES[key]) return;
      this.activeGame = key;
      this.problem = GAMES[key].mod.generateProblem();
      this.answeredBy = null;
      this.lastHostAction = Date.now();
      this.broadcastState();
      return;
    }

    if (msg.type === 'next-round' && me.id === this.hostId) {
      if (!this.activeGame) return;
      this.problem = GAMES[this.activeGame].mod.generateProblem();
      this.answeredBy = null;
      this.lastHostAction = Date.now();
      this.broadcastState();
      return;
    }

    if (msg.type === 'end-game' && me.id === this.hostId) {
      this.activeGame = null;
      this.problem = null;
      this.answeredBy = null;
      this.lastHostAction = Date.now();
      this.broadcastState();
      return;
    }

    if (msg.type === 'reset-scores' && me.id === this.hostId) {
      for (const p of this.sessions.values()) {
        p.total = 0;
        p.perGame = blankPerGame();
      }
      this.lastHostAction = Date.now();
      this.broadcastState();
      return;
    }

    if (msg.type === 'claim-host') {
      // Allow if no current host, or if current host has been silent past idle window
      const hostStillPresent = this.hostId && [...this.sessions.values()].some(p => p.id === this.hostId);
      const hostIdle = (Date.now() - this.lastHostAction) > HOST_IDLE_MS;
      if (!hostStillPresent || hostIdle) {
        this.hostId = me.id;
        this.lastHostAction = Date.now();
        this.broadcastState();
      }
      return;
    }

    if (msg.type === 'answer' && this.activeGame && this.problem && !this.answeredBy) {
      const game = GAMES[this.activeGame];
      const correct = game.mod.checkAnswer(this.problem, msg.answer);
      if (correct) {
        this.answeredBy = me.id;
        me.total += 1;
        me.perGame[this.activeGame] = (me.perGame[this.activeGame] || 0) + 1;
        this.broadcastState();
        // Auto-advance: same game, new problem after a brief pause.
        setTimeout(() => {
          if (this.activeGame && this.answeredBy === me.id) {
            this.problem = GAMES[this.activeGame].mod.generateProblem();
            this.answeredBy = null;
            this.broadcastState();
          }
        }, 1800);
      } else {
        try { ws.send(JSON.stringify({ type:'wrong', answer: msg.answer })); } catch {}
      }
    }
  }

  publicPlayer(p) {
    return {
      id: p.id, name: p.name,
      total: p.total, perGame: p.perGame,
      isHost: p.id === this.hostId,
    };
  }

  broadcastState() {
    const players = Array.from(this.sessions.values()).map(p => this.publicPlayer(p));
    const hostPresent = !!this.hostId && players.some(p => p.id === this.hostId);
    const hostIdle = (Date.now() - this.lastHostAction) > HOST_IDLE_MS;
    const payload = JSON.stringify({
      type: 'state',
      players,
      hostId: hostPresent ? this.hostId : null,
      hostIdle,
      activeGame: this.activeGame,
      activeLabel: this.activeGame ? GAMES[this.activeGame].label : null,
      problem: this.problem,
      answeredBy: this.answeredBy,
    });
    for (const ws of this.sessions.keys()) {
      try { ws.send(payload); } catch {}
    }
  }
}

function blankPerGame() {
  const out = {};
  for (const k of GAME_KEYS) out[k] = 0;
  return out;
}
