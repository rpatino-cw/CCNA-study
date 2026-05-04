// Port Patrol — bidirectional well-known port race.
// 50/50: service → port, or port → service.

const ROUNDS_TO_WIN = 4;
const ROUND_TIMEOUT_MS = 30000;

// CCNA exam scope. Each entry: port, proto, canonical service name, accepted aliases.
const PORTS = [
  { port: 20,   proto:'tcp', name:'FTP Data',     aliases:['ftp data','ftp-data'] },
  { port: 21,   proto:'tcp', name:'FTP',          aliases:['ftp control','ftp-control'] },
  { port: 22,   proto:'tcp', name:'SSH',          aliases:['ssh','scp','sftp'] },
  { port: 23,   proto:'tcp', name:'Telnet',       aliases:['telnet'] },
  { port: 25,   proto:'tcp', name:'SMTP',         aliases:['smtp'] },
  { port: 53,   proto:'udp', name:'DNS',          aliases:['dns','domain'] },
  { port: 67,   proto:'udp', name:'DHCP Server',  aliases:['dhcp server','bootp server','dhcps'] },
  { port: 68,   proto:'udp', name:'DHCP Client',  aliases:['dhcp client','bootp client','dhcpc'] },
  { port: 69,   proto:'udp', name:'TFTP',         aliases:['tftp'] },
  { port: 80,   proto:'tcp', name:'HTTP',         aliases:['http','www'] },
  { port: 110,  proto:'tcp', name:'POP3',         aliases:['pop3','pop'] },
  { port: 123,  proto:'udp', name:'NTP',          aliases:['ntp'] },
  { port: 143,  proto:'tcp', name:'IMAP',         aliases:['imap','imap4'] },
  { port: 161,  proto:'udp', name:'SNMP',         aliases:['snmp'] },
  { port: 162,  proto:'udp', name:'SNMP Trap',    aliases:['snmp trap','snmp-trap','snmptrap','snmp traps'] },
  { port: 179,  proto:'tcp', name:'BGP',          aliases:['bgp'] },
  { port: 389,  proto:'tcp', name:'LDAP',         aliases:['ldap'] },
  { port: 443,  proto:'tcp', name:'HTTPS',        aliases:['https','http over tls','http/tls'] },
  { port: 445,  proto:'tcp', name:'SMB',          aliases:['smb','cifs','microsoft-ds'] },
  { port: 514,  proto:'udp', name:'Syslog',       aliases:['syslog'] },
  { port: 587,  proto:'tcp', name:'SMTP TLS',     aliases:['smtp tls','smtp submission','submission'] },
  { port: 636,  proto:'tcp', name:'LDAPS',        aliases:['ldaps','ldap over tls','secure ldap'] },
  { port: 989,  proto:'tcp', name:'FTPS Data',    aliases:['ftps data','ftps-data'] },
  { port: 990,  proto:'tcp', name:'FTPS',         aliases:['ftps','ftp over tls'] },
  { port: 1812, proto:'udp', name:'RADIUS Auth',  aliases:['radius auth','radius authentication','radius'] },
  { port: 1813, proto:'udp', name:'RADIUS Acct',  aliases:['radius acct','radius accounting'] },
  { port: 3389, proto:'tcp', name:'RDP',          aliases:['rdp','remote desktop'] },
];

export class Ports {
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
  const entry = PORTS[Math.floor(Math.random() * PORTS.length)];
  const direction = Math.random() < 0.5 ? 's2p' : 'p2s';
  // s2p = "given service, what port?"  → answer is number (and proto)
  // p2s = "given port + proto, what service?"  → answer is canonical name (or alias)
  return {
    id: crypto.randomUUID(),
    direction,
    port: entry.port,
    proto: entry.proto,
    name: entry.name,
  };
}

function normalize(s) {
  return String(s||'').trim().toLowerCase().replace(/\s+/g,' ').replace(/[\-_/]/g,' ').replace(/\s+/g,' ').trim();
}

export function checkAnswer(problem, given) {
  if (typeof given !== 'string') return false;
  const norm = normalize(given);

  if (problem.direction === 's2p') {
    // Accept "53" or "53/udp" or "udp 53" or "udp/53"
    const onlyDigits = norm.replace(/[^0-9]/g,'');
    const num = parseInt(onlyDigits, 10);
    return !Number.isNaN(num) && num === problem.port;
  }
  if (problem.direction === 'p2s') {
    const entry = PORTS.find(p => p.port === problem.port && p.proto === problem.proto);
    if (!entry) return false;
    const accepted = [entry.name, ...entry.aliases].map(normalize);
    return accepted.includes(norm);
  }
  return false;
}
