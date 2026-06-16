/* ════════════════════════════════════════════════════════════════
   encapsulation.html — Watch a Packet Grow
   2D canvas topology + DOM PDU inspector. Scene-stepped, Romeo-paced.
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

const PREFERS_REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- palette (must match packet-theater / packet-journey) ---- */
const C = {
  data:'#7C3AED', l4:'#2563EB', l3:'#059669', l2:'#D97706', tag:'#2dd4bf',
  access:'#3b82f6', trunk:'#d4a017', routed:'#2dd4bf',
  teal:'#5eead4', amber:'#fbbf24', ink:'#e8e4de', mut:'#78716c', dim:'#57534e'
};

/* ════════ TOPOLOGY MODEL ════════ */
// x positions are fractions of the strip width; resolved at draw time.
const NODES = [
  {id:'PC-A', label:'PC-A', role:'sender',   type:'pc',     fx:0.05, sub:'VLAN 10\n10.1.10.10\nAA:AA:AA:00:00:0A'},
  {id:'SW1',  label:'SW1',  role:'L2 switch',type:'switch', fx:0.225,sub:'access + trunk'},
  {id:'R1',   label:'R1',   role:'gateway',  type:'router', fx:0.40, sub:'10.1.10.1\nTTL 64→63'},
  {id:'R2',   label:'R2',   role:'router',   type:'router', fx:0.60, sub:'TTL 63→62'},
  {id:'SW2',  label:'SW2',  role:'L2 switch',type:'switch', fx:0.775,sub:'strips tag'},
  {id:'PC-B', label:'PC-B', role:'receiver', type:'pc',     fx:0.95, sub:'VLAN 10\n10.2.10.20\nBB:BB:BB:00:00:0B'}
];
const LINKS = [
  {a:'PC-A',b:'SW1',kind:'access',label:'access link — no VLAN tag'},
  {a:'SW1', b:'R1', kind:'trunk', label:'802.1Q TRUNK — VLAN 10 tagged'},
  {a:'R1',  b:'R2', kind:'routed',label:'routed link — new frame, no tag'},
  {a:'R2',  b:'SW2',kind:'trunk', label:'802.1Q TRUNK — VLAN 10 again'},
  {a:'SW2', b:'PC-B',kind:'access',label:'access link — tag removed'}
];
const LINKCOLOR = {access:C.access, trunk:C.trunk, routed:C.routed};

/* ════════ OSI + TCP/IP MODEL LADDER ════════
   7 OSI layers grouped under the 4 TCP/IP layers, each with its PDU name.
   The active layer lights up per scene via HI[] below. */
const OSI_MODEL = [
  {tcp:'Application',    rows:[
    {n:7, name:'Application',  pdu:'Data',     col:C.data},
    {n:6, name:'Presentation', pdu:'Data',     col:C.data},
    {n:5, name:'Session',      pdu:'Data',     col:C.data}]},
  {tcp:'Transport',      rows:[
    {n:4, name:'Transport',    pdu:'Segment / Datagram', col:C.l4}]},
  {tcp:'Internet',       rows:[
    {n:3, name:'Network',      pdu:'Packet',   col:C.l3}]},
  {tcp:'Network Access', rows:[
    {n:2, name:'Data Link',    pdu:'Frame',    col:C.l2},
    {n:1, name:'Physical',     pdu:'Bits',     col:C.routed}]}
];
// active OSI layer number per scene (0 = none / all). Index matches SCENES.
const HI = [7, 4, 3, 2, 2, 1, 2, 3, 1, 3, 2, 7, 0];

/* ════════ PDU FIELD DATA ════════ */
// Each layer is a list of [key, value, bytespan, flag]  flag: 'lock' | 'change' | ''
function buildLayers(state){
  const L = [];
  // DATA core (always)
  L.push({cls:'lb-data', title:'L7 DATA', pdu:'Data', bytes:'6 B', show:state.has.data,
    fields:[['payload','GET / (HTTP)','6 B','lock']]});
  // L4
  if(state.has.l4){
    if(state.udp){
      L.push({cls:'lb-l4', title:'L4 UDP', pdu:'Datagram', bytes:'8 B', show:true,
        fields:[
          ['Src Port','50000','2 B','lock'],
          ['Dst Port','80 (HTTP)','2 B','lock'],
          ['Length','14','2 B',''],
          ['Checksum','0x2c3a','2 B','']
        ]});
    } else {
      L.push({cls:'lb-l4', title:'L4 TCP', pdu:'Segment', bytes:'20 B', show:true,
        fields:[
          ['Src Port','50000','2 B','lock'],
          ['Dst Port','80 (HTTP)','2 B','lock'],
          ['Seq Number','1','4 B',''],
          ['Ack Number','0','4 B',''],
          ['Flags','SYN','2 B',''],
          ['Window','64240','2 B',''],
          ['Checksum','0x1f4a','2 B',''],
          ['Urgent Ptr','0','2 B','']
        ]});
    }
  }
  // L3
  if(state.has.l3){
    L.push({cls:'lb-l3', title:'L3 IPv4', pdu:'Packet', bytes:'20 B', show:true,
      fields:[
        ['Version/IHL','4 / 5','1 B',''],
        ['DSCP/ECN','0x00','1 B',''],
        ['Total Length', state.udp?'34':'46','2 B',''],
        ['Identification','0x1c46','2 B',''],
        ['Flags/FragOff','DF / 0','2 B',''],
        ['TTL', String(state.ttl), '1 B','change'],
        ['Protocol', state.udp?'17 UDP':'6 TCP','1 B',''],
        ['Hdr Checksum', state.ipck, '2 B','change'],
        ['Source IP','10.1.10.10','4 B','lock'],
        ['Dest IP','10.2.10.20','4 B','lock']
      ]});
  }
  // L2 header
  if(state.has.l2){
    const f = [
      ['Dst MAC', state.dmac,'6 B','change'],
      ['Src MAC', state.smac,'6 B','change']
    ];
    L.push({cls:'lb-l2', title:'L2 Ethernet II', pdu:'Frame', bytes: state.tagged?'18 B (+4 tag)':'14 B', show:true,
      fields:f, etherAfter:true});
    // tag (inserted between Src MAC and EtherType)
    if(state.tagged){
      L.push({cls:'lb-tag', title:'802.1Q TAG (inside L2)', pdu:'', bytes:'4 B', show:true, tag:true,
        fields:[
          ['TPID','0x8100','2 B',''],
          ['TCI','PCP 0 / DEI 0 / VID 10','2 B',''],
          ['hex readout','81 00 00 0A','','']
        ]});
    }
    // EtherType + FCS appended to the L2 block via a trailer note row
    L.push({cls:'lb-l2', title:'L2 — EtherType', pdu:'', bytes:'2 B', show:true, slim:true,
      fields:[['EtherType','0x0800 (IPv4)','2 B','']]});
    L.push({cls:'lb-fcs', title:'L2 TRAILER — FCS', pdu:'', bytes:'4 B', show:true, fcs:true,
      fields:[['FCS (CRC-32)', state.fcs,'4 B','change']]});
  }
  return L;
}

/* ════════ STATE ════════ */
let state = {
  has:{data:false,l4:false,l3:false,l2:false},
  tagged:false, udp:false,
  ttl:64, ipck:'0xb1e6', fcs:'0x9f3c',
  smac:'AA:AA:AA:00:00:0A', dmac:'11:11:11:11:11:11',
  pduName:'DATA', pduSub:'Layer 7 — application payload', pduColor:C.data,
  size:6, hot:[], tokenAt:'PC-A', tokenT:0, // tokenT: progress along a link (0=at node)
  fromNode:null, toNode:null, activeNode:'PC-A', arp:false
};

/* ════════ SCENES ════════ */
const SIMPLE = false; // beginner narration swapped in via .simple field
const SCENES = [
{ // 1
  step:'Layer 7', title:'Your data is born on PC-A',
  text:'PC-A wants a web page.\nIt makes a tiny piece of data: GET /.\nThat is 6 bytes. Just the data. No headers yet.\nThis purple core never changes the whole trip.',
  simple:'PC-A wants a webpage.\nIt makes a tiny note: "GET /".\nThat is the data. 6 bytes. Nothing wrapped around it yet.',
  tldr:'App makes data. 6 bytes. Layer 7. PDU name = Data.',
  apply(s){ s.has={data:true,l4:false,l3:false,l2:false}; s.tagged=false; s.size=6;
    s.pduName='DATA'; s.pduSub='Layer 7 — application payload'; s.pduColor=C.data;
    s.tokenAt='PC-A'; s.tokenT=0; s.activeNode='PC-A'; s.arp=false; s.hot=[]; }
},
{ // 2
  step:'Layer 4', title:'Add the TCP header → now it is a SEGMENT',
  text:'Layer 4 wraps a 20-byte TCP header on the FRONT.\nIt carries the ports: from 50000 to 80 (web).\nHeaders go on the front. Nothing on the back yet.\nNew name: SEGMENT.',
  simple:'Layer 4 adds a TCP header on the front.\nIt holds the ports: 50000 to 80 (the web port).\nNew name: SEGMENT.',
  tldr:'+20B TCP header = Segment. 6 → 26 B. Ports live here, at L4.',
  apply(s){ s.has.l4=true; s.size = s.udp?14:26;
    s.pduName = s.udp?'DATAGRAM':'SEGMENT'; s.pduSub = s.udp?'Layer 4 — UDP':'Layer 4 — TCP'; s.pduColor=C.l4;
    s.activeNode='PC-A'; s.hot=[]; }
},
{ // 3
  step:'Layer 3', title:'Add the IP header → now it is a PACKET',
  text:'Layer 3 wraps a 20-byte IP header on the FRONT.\nIt carries the IP addresses: 10.1.10.10 to 10.2.10.20.\nIt sets TTL to 64.\nThese IP addresses never change. New name: PACKET.',
  simple:'Layer 3 adds an IP header on the front.\nIt holds the IP addresses: 10.1.10.10 to 10.2.10.20.\nThese addresses never change. New name: PACKET.',
  tldr:'+20B IP header = Packet. 26 → 46 B. Src/Dst IP set once, frozen end to end.',
  apply(s){ s.has.l3=true; s.ttl=64; s.ipck='0xb1e6'; s.size = s.udp?34:46;
    s.pduName='PACKET'; s.pduSub='Layer 3 — IPv4'; s.pduColor=C.l3; s.hot=[]; }
},
{ // 4
  step:'ARP', title:'ARP first: who is the gateway?',
  text:'PC-B is on another network.\nSo PC-A does NOT look for PC-B\'s MAC.\nIt asks for its gateway\'s MAC: who has 10.1.10.1?\nR1 answers. Now PC-A can build the frame.',
  simple:'PC-B is on a different network.\nSo PC-A asks for the GATEWAY\'s MAC, not PC-B\'s.\n"Who has 10.1.10.1?" R1 answers.',
  tldr:'Off-subnet → ARP for the GATEWAY MAC, not the far host. Broadcast request, unicast reply.',
  apply(s){ s.arp=true; s.dmac='11:11:11:11:11:11'; s.activeNode='PC-A'; s.hot=['dmac']; }
},
{ // 5
  step:'Layer 2', title:'Add the Ethernet header + FCS → now it is a FRAME',
  text:'Layer 2 wraps an Ethernet header on the FRONT.\nIt also adds a 4-byte FCS on the BACK. Only L2 has a trailer.\nDst MAC = R1. Src MAC = PC-A.\nNew name: FRAME. Size is now 64 bytes.',
  simple:'Layer 2 adds an Ethernet header on the front\nAND a 4-byte FCS on the back. Only L2 has a back part.\nNew name: FRAME. 64 bytes.',
  tldr:'+14B Eth header +4B FCS = Frame. 46 → 64 B. Only L2 adds a TRAILER. 64 B = legal min frame.',
  apply(s){ s.arp=false; s.has.l2=true; s.tagged=false;
    s.smac='AA:AA:AA:00:00:0A'; s.dmac='11:11:11:11:11:11'; s.fcs='0x9f3c';
    s.size = s.udp?52:64;
    s.pduName='FRAME'; s.pduSub='Layer 2 — Ethernet (untagged)'; s.pduColor=C.l2; s.hot=[]; }
},
{ // 6
  step:'Access link', title:'Across the access link to SW1',
  text:'The frame travels PC-A to SW1.\nThis is an access link. No VLAN tag here.\nSW1 just reads the destination MAC and forwards.\nIt does not touch the IP or the TTL.',
  simple:'The frame goes from PC-A to SW1.\nThis link has no VLAN tag.\nSW1 reads the dst MAC and forwards. Nothing changes.',
  tldr:'Access link = untagged. Switch = L2 forward only. No MAC/IP/TTL change.',
  apply(s){ s.fromNode='PC-A'; s.toNode='SW1'; s.tokenAt=null; s.tokenT=1; s.activeNode='SW1'; s.hot=[]; }
},
{ // 7
  step:'Trunk', title:'Onto the trunk: SW1 inserts the 802.1Q tag',
  text:'SW1 sends the frame onto a trunk to R1.\nA trunk carries many VLANs, so it tags the frame.\nThe 4-byte tag slides IN between Src MAC and EtherType.\nThis is where dot1q tags live: inside the frame, only on trunks.',
  simple:'SW1 sends the frame onto a trunk to R1.\nTrunks carry many VLANs, so it tags the frame.\nThe tag slides IN between Src MAC and EtherType.',
  tldr:'Trunk → insert 4B 802.1Q tag (VLAN 10) between Src MAC and EtherType. 64 → 68 B. FCS recomputed.',
  apply(s){ s.fromNode='SW1'; s.toNode='R1'; s.tokenAt=null; s.tokenT=0.5; s.activeNode='SW1';
    s.tagged=true; s.size = s.udp?56:68; s.fcs='0x7b21';
    s.pduSub='Layer 2 — Ethernet (802.1Q tagged)'; s.hot=['tag','fcs']; }
},
{ // 8
  step:'Router R1', title:'Router R1: strip, route, rebuild',
  text:'R1 is a router. It throws away the old frame.\nIt reads the destination IP and looks up the route.\nTTL drops 64 to 63. It builds a brand-new frame.\nNew MACs. IPs stay exactly the same.',
  simple:'R1 throws away the old frame.\nIt reads the dst IP and picks a route.\nTTL drops 64 → 63. It builds a NEW frame with new MACs.\nThe IPs do not change.',
  tldr:'Router decap → route on dst IP → TTL 64→63 → new src/dst MAC + new FCS. IP frozen, tag dropped.',
  apply(s){ s.fromNode='SW1'; s.toNode='R1'; s.tokenAt='R1'; s.tokenT=0; s.activeNode='R1';
    s.tagged=false; s.ttl=63; s.ipck='0xb2e6';
    s.smac='11:11:11:11:11:22'; s.dmac='22:22:22:22:22:21'; s.fcs='0xa4d0';
    s.size = s.udp?52:64; s.pduSub='Layer 2 — rebuilt, untagged';
    s.hot=['smac','dmac','ttl','ipck','fcs']; }
},
{ // 9
  step:'Routed link', title:'Across the routed link to R2',
  text:'The new frame crosses the routed link to R2.\nNo VLAN tag on this link.\nThe IP addresses are still 10.1.10.10 to 10.2.10.20.\nThe ports are still 50000 to 80. Nothing inside changed.',
  simple:'The new frame crosses to R2.\nNo VLAN tag here.\nInside, the IPs and ports are exactly the same as before.',
  tldr:'Routed link = plain untagged frame. Inside (IP, ports, data) is identical to scene 3.',
  apply(s){ s.fromNode='R1'; s.toNode='R2'; s.tokenAt=null; s.tokenT=0.5; s.activeNode='R2'; s.hot=[]; }
},
{ // 10
  step:'Router R2', title:'Router R2: strip, route, rebuild, re-tag',
  text:'R2 does the same job as R1.\nThrows away the frame, reads the IP, TTL drops 63 to 62.\nIt builds a new frame for the SW2 trunk.\nSo it adds the VLAN 10 tag back on.',
  simple:'R2 does the same as R1.\nTTL drops 63 → 62. New MACs again.\nR2→SW2 is a trunk, so it adds the VLAN 10 tag back.',
  tldr:'R2 decap → TTL 63→62 → new MACs + new FCS → re-insert 802.1Q VLAN 10 tag. 64 → 68 B.',
  apply(s){ s.fromNode='R1'; s.toNode='R2'; s.tokenAt='R2'; s.tokenT=0; s.activeNode='R2';
    s.tagged=true; s.ttl=62; s.ipck='0xb3e6';
    s.smac='22:22:22:22:22:22'; s.dmac='BB:BB:BB:00:00:0B'; s.fcs='0xc19e';
    s.size = s.udp?56:68; s.pduSub='Layer 2 — rebuilt, re-tagged VLAN 10';
    s.hot=['smac','dmac','ttl','ipck','fcs','tag']; }
},
{ // 11
  step:'Trunk → access', title:'SW2 strips the tag for the access port',
  text:'SW2 sends the frame down to PC-B on an access link.\nAccess ports do not use tags.\nSo SW2 pulls the 4-byte tag back out.\nPC-B will never see a tag.',
  simple:'SW2 sends the frame down to PC-B.\nAccess ports use no tag.\nSo SW2 pulls the tag out. PC-B never sees a tag.',
  tldr:'Trunk → access = strip the 802.1Q tag, recompute FCS. 68 → 64 B. PC-B sees a plain frame.',
  apply(s){ s.fromNode='R2'; s.toNode='SW2'; s.tokenAt='SW2'; s.tokenT=0; s.activeNode='SW2';
    s.tagged=false; s.fcs='0x55ab'; s.size = s.udp?52:64;
    s.pduSub='Layer 2 — untagged again'; s.hot=['tag','fcs']; }
},
{ // 12
  step:'Decapsulate', title:'PC-B decapsulates: the frame shrinks back to data',
  text:'PC-B unwraps the layers, outside first.\nStrip the frame, check the IP, strip the packet, check the port, strip the segment.\nWhat is left is the original data: GET /.\nThe size meter unwinds all the way back to 6 bytes.',
  simple:'PC-B unwraps the layers from the outside in.\nFrame off, packet off, segment off.\nWhat is left is the original data: GET /. Back to 6 bytes.',
  tldr:'Decap = peel outer layers off, bottom-up. FRAME → PACKET → SEGMENT → DATA. 64 → 46 → 26 → 6 B.',
  apply(s){ s.fromNode='SW2'; s.toNode='PC-B'; s.tokenAt='PC-B'; s.tokenT=0; s.activeNode='PC-B';
    s.has={data:true,l4:false,l3:false,l2:false}; s.tagged=false; s.size=6;
    s.pduName='DATA'; s.pduSub='Layer 7 — delivered to the app'; s.pduColor=C.data; s.hot=[]; }
},
{ // 13
  step:'Recap', title:'Recap: the three rules to remember',
  text:'Three rules.\nOne: headers go on the front; only L2 adds a trailer (FCS).\nTwo: MAC changes at every router; IP never changes.\nThree: the dot1q tag lives inside the frame, only on trunks.',
  simple:'Three rules.\n1: headers on the front, only L2 has a back part (FCS).\n2: MAC changes at each router, IP never does.\n3: the VLAN tag lives inside the frame, trunks only.',
  tldr:'Names: Data/Segment/Packet/Frame/Bits. MAC changes every hop, IP never. Tag = inside L2, trunk only. TTL -1 per router.',
  apply(s){ s.activeNode='PC-B'; s.hot=[]; },
  end:true
}
];

/* ════════ DOM refs ════════ */
const $ = id => document.getElementById(id);
const canvas = $('stage'), ctx = canvas.getContext('2d');
const stepIndicator = $('stepIndicator');
const pduName=$('pduName'), pduSub=$('pduSub'), layerStack=$('layerStack'), l4toggle=$('l4toggle');
const sizeVal=$('sizeVal'), sizeDelta=$('sizeDelta'), sizeFill=$('sizeFill');
const narrStep=$('narrStep'), narrTitle=$('narrTitle'), narrText=$('narrText'), narrTldr=$('narrTldr');
const arpPanel=$('arpPanel'), endcard=$('endcard'), osiRows=$('osiRows');

let cur = 0, speed = 1, beginner=false, freeLook=false;
let prevSize = 6;

/* ════════ PDU TRAVEL TWEEN ════════
   The packet glyph glides from where it was to where the new scene puts it,
   so the learner literally watches the data unit move through the topology.
   tokenX holds the live (animated) x; tokenFrom/tokenTo bracket the tween;
   tokenStart/tokenDur drive the easing in the draw loop. */
let tokenX = null, tokenFrom = 0, tokenTo = 0, tokenStart = 0, tokenDur = 900;
function easeInOut(t){ return t<0.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2; }
// absolute on-strip x for the current state (node it rests at, or point along a link)
function tokenTargetX(g){
  if(state.tokenAt) return g.nx[state.tokenAt];
  if(state.fromNode && state.toNode){
    return g.nx[state.fromNode] + (g.nx[state.toNode]-g.nx[state.fromNode]) * (state.tokenT==null?0.5:state.tokenT);
  }
  return g.nx['PC-A'];
}
// called whenever a scene is applied: start a glide from the old x to the new target
function startTokenTween(){
  const g = geom();
  const target = tokenTargetX(g);
  tokenFrom = (tokenX==null) ? target : tokenX;
  tokenTo = target;
  tokenStart = performance.now();
  if(tokenX==null) tokenX = target;
}

/* ════════ CANVAS SIZING ════════ */
function resize(){
  const dpr = Math.min(devicePixelRatio||1, 2);
  canvas.width = innerWidth*dpr; canvas.height = innerHeight*dpr;
  canvas.style.width=innerWidth+'px'; canvas.style.height=innerHeight+'px';
  ctx.setTransform(dpr,0,0,dpr,0,0);
}
window.addEventListener('resize', resize);
resize();

/* topology strip geometry
   Inset the strip BETWEEN the side panels so the end nodes (PC-A / PC-B) are
   never hidden behind the left ladder/size-meter or the right PDU inspector.
   Below 680px the panels are hidden (see CSS), so fall back to a small pad. */
function geom(){
  const W = innerWidth;
  const narrow = W <= 680;
  const leftPad  = narrow ? 60 : 256;   // clears osi-map/size-meter (left:16 + ~230)
  const rightPad = narrow ? 60 : 364;   // clears pkt-inspector (right:16 + ~330)
  const x0 = leftPad, x1 = W - rightPad;
  const y = Math.min(190, innerHeight*0.26);   // strip vertical center
  const nx = {};
  NODES.forEach(n => nx[n.id] = x0 + (x1-x0)*n.fx);
  return {x0,x1,y,nx};
}

/* ════════ DRAW ════════ */
let anim = 0;
function draw(){
  anim += 0.016*speed;
  const g = geom(), W = innerWidth;
  ctx.clearRect(0,0,W,innerHeight);

  // legend top-right of strip area (below step dots)
  drawLegend(g);

  // links
  LINKS.forEach(lk => drawLink(g, lk));

  // nodes
  NODES.forEach(n => drawNode(g, n));

  // moving token
  drawToken(g);

  requestAnimationFrame(draw);
}

function drawLegend(g){
  // sit in the clear central band, just under the strip (was top-right, which
  // collided with the PDU inspector panel)
  const lx = g.x0, ly = g.y + 92;
  if(g.x1 - g.x0 < 320) return; // hide if the strip is too cramped to spare room
  ctx.save();
  ctx.font='10px "JetBrains Mono", monospace';
  ctx.textAlign='left';
  const items=[['access','blue'],['trunk','amber striped'],['routed','teal']];
  items.forEach((it,i)=>{
    const yy=ly+i*16;
    ctx.strokeStyle=LINKCOLOR[it[0]]; ctx.lineWidth=3;
    if(it[0]==='trunk') ctx.setLineDash([5,3]); else ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(lx,yy); ctx.lineTo(lx+22,yy); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle=C.mut; ctx.fillText(it[0]+' = '+it[1], lx+30, yy+3);
  });
  ctx.fillStyle=C.dim;
  ctx.fillText('2 routers → TTL drops 64→62', lx, ly+58);
  ctx.fillText('switches: 0 TTL change', lx, ly+72);
  ctx.restore();
}

function linkActive(lk){
  // a link is "active" if the token is traversing it OR sits at one of its endpoints during a router/switch beat
  if(state.fromNode===lk.a && state.toNode===lk.b) return true;
  if(state.fromNode===lk.b && state.toNode===lk.a) return true;
  return false;
}

function drawLink(g, lk){
  const xa=g.nx[lk.a], xb=g.nx[lk.b], y=g.y;
  const col=LINKCOLOR[lk.kind];
  const active = linkActive(lk);
  ctx.save();
  ctx.lineWidth = active?4:2.5;
  ctx.strokeStyle = col;
  ctx.globalAlpha = active?1:0.5;
  if(lk.kind==='trunk'){
    ctx.setLineDash([7,4]);
    if(active && !PREFERS_REDUCED) ctx.lineDashOffset = -anim*30;
  } else ctx.setLineDash([]);
  ctx.beginPath(); ctx.moveTo(xa,y); ctx.lineTo(xb,y); ctx.stroke();
  ctx.setLineDash([]);
  // flowing dots when active
  if(active && !PREFERS_REDUCED){
    for(let i=0;i<3;i++){
      const t=((anim*0.4)+(i/3))%1;
      const px=xa+(xb-xa)*t;
      ctx.globalAlpha=0.7; ctx.fillStyle=col;
      ctx.beginPath(); ctx.arc(px,y,2.5,0,7); ctx.fill();
    }
  }
  // label
  ctx.globalAlpha = active?1:0.55;
  ctx.font='10px "JetBrains Mono", monospace';
  ctx.textAlign='center';
  ctx.fillStyle = active?col:C.mut;
  const mx=(xa+xb)/2;
  wrapText(lk.label, mx, y+22, 150, 12);
  ctx.restore();
}

function wrapText(txt,x,y,maxw,lh){
  const words=txt.split(' '); let line='',yy=y;
  for(const w of words){
    const test=line?line+' '+w:w;
    if(ctx.measureText(test).width>maxw && line){ ctx.fillText(line,x,yy); line=w; yy+=lh; }
    else line=test;
  }
  ctx.fillText(line,x,yy);
}

function drawNode(g,n){
  const x=g.nx[n.id], y=g.y;
  const active = state.activeNode===n.id;
  const col = n.type==='pc'?C.access : n.type==='switch'?'#22c55e' : C.amber;
  ctx.save();
  // glow ring if active
  if(active){
    ctx.shadowColor=col; ctx.shadowBlur=18;
  }
  ctx.lineWidth=2.5; ctx.strokeStyle=col; ctx.fillStyle='rgba(10,10,15,0.95)';
  const r=20;
  if(n.type==='pc'){
    roundRect(x-22,y-16,44,32,5); ctx.fill(); ctx.stroke();
  } else if(n.type==='switch'){
    roundRect(x-26,y-13,52,26,4); ctx.fill(); ctx.stroke();
    // port LEDs
    ctx.shadowBlur=0;
    for(let i=-2;i<=2;i++){ ctx.fillStyle='#22c55e'; ctx.fillRect(x+i*8-1.5, y+5, 3,3); }
  } else { // router
    ctx.beginPath(); ctx.arc(x,y,r,0,7); ctx.fill(); ctx.stroke();
    ctx.shadowBlur=0;
    // up/down arrows hint of routing
    ctx.fillStyle=col; ctx.font='13px "Space Grotesk"'; ctx.textAlign='center';
    ctx.fillText('R', x, y+5);
  }
  ctx.shadowBlur=0;
  // label
  ctx.fillStyle = active?col:C.ink;
  ctx.font='600 13px "Space Grotesk"'; ctx.textAlign='center';
  ctx.fillText(n.label, x, y-26);
  // role
  ctx.fillStyle = (n.role==='sender'||n.role==='receiver')?C.teal:C.mut;
  ctx.font='9px "Space Grotesk"';
  ctx.fillText(n.role, x, y+34);
  // sub lines (small, only for PCs/routers when active to avoid clutter)
  if(n.sub && (active || n.type==='pc')){
    ctx.fillStyle=C.dim; ctx.font='8px "JetBrains Mono", monospace';
    n.sub.split('\n').forEach((ln,i)=>ctx.fillText(ln, x, y+46+i*10));
  }
  ctx.restore();
}

function roundRect(x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r);
  ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath();
}

/* moving PDU token — compact nested-box glyph w/ name + size */
function drawToken(g){
  let ty=g.y;
  // advance the travel tween toward the current scene's target
  const target = tokenTargetX(g);
  if(target !== tokenTo){ // geometry changed (resize) — retarget without re-easing
    tokenTo = target;
    if(tokenX==null) tokenX = target;
  }
  if(PREFERS_REDUCED){
    tokenX = target;
  } else {
    const dur = tokenDur / (speed||1);
    const p = Math.min(1, (performance.now()-tokenStart)/dur);
    tokenX = tokenFrom + (tokenTo-tokenFrom)*easeInOut(p);
  }
  const tx = (tokenX==null) ? target : tokenX;
  ty = g.y - 58; // float above strip

  // nested boxes representing layers present
  const layers = [];
  if(state.has.data) layers.push(C.data);
  if(state.has.l4) layers.unshift(C.l4); // outer added later => push order outer-first for drawing
  // Build from outer to inner for visual size
  const order=[];
  if(state.has.l2) order.push(C.l2);
  if(state.tagged) order.push(C.tag);
  if(state.has.l3) order.push(C.l3);
  if(state.has.l4) order.push(C.l4);
  if(state.has.data) order.push(C.data);

  ctx.save();
  ctx.textAlign='center';
  const baseW = 70 + order.length*9, baseH = 30 + order.length*4;
  let w=baseW, h=baseH;
  ctx.globalAlpha=1;
  // glow
  ctx.shadowColor = state.pduColor; ctx.shadowBlur=20;
  order.forEach((col,i)=>{
    const inset=i*5;
    ctx.shadowBlur = i===0?20:0;
    ctx.lineWidth=2; ctx.strokeStyle=col;
    ctx.fillStyle = hexA(col,0.16);
    roundRect(tx-w/2+inset, ty-h/2+inset, w-inset*2, h-inset*2, 4);
    ctx.fill(); ctx.stroke();
  });
  ctx.shadowBlur=0;
  // FCS trailer tab on far right (only when L2)
  if(state.has.l2){
    ctx.fillStyle=hexA(C.l2,0.3); ctx.strokeStyle=C.l2; ctx.lineWidth=1.5;
    roundRect(tx+w/2-2, ty-7, 9, 14, 2); ctx.fill(); ctx.stroke();
  }
  // name + size text (sharp, on token)
  ctx.fillStyle=C.ink; ctx.font='700 12px "Space Grotesk"';
  ctx.fillText(state.pduName, tx, ty-h/2-8);
  ctx.fillStyle=C.teal; ctx.font='11px "JetBrains Mono", monospace';
  ctx.fillText(state.size+' B', tx, ty+h/2+15);
  ctx.restore();
}

function hexA(hex,a){
  const n=parseInt(hex.slice(1),16);
  return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`;
}

/* ════════ INSPECTOR RENDER ════════ */
function renderInspector(){
  pduName.textContent = state.pduName;
  pduName.style.color = state.pduColor;
  pduSub.textContent = state.pduSub;
  l4toggle.style.display = state.has.l4 ? 'flex' : 'none';

  const layers = buildLayers(state);
  layerStack.innerHTML='';
  layers.forEach(L=>{
    if(!L.show) return;
    const div=document.createElement('div');
    div.className='layer-block '+L.cls;
    if(PREFERS_REDUCED) div.style.animation='none';
    let html='<div class="lb-head"><span class="lb-title">'+L.title+'</span>';
    if(L.bytes) html+='<span class="lb-bytes">'+L.bytes+'</span>';
    html+='</div>';
    L.fields.forEach(f=>{
      const flag = f[3]==='lock'?'locked':(f[3]==='change' && isHotField(f[0]))?'changed':'';
      const lock = f[3]==='lock'?'<span class="lock">&#128274;</span>':'';
      const recomp = (f[3]==='change' && isHotField(f[0]) && (f[0].indexOf('Checksum')>=0||f[0].indexOf('FCS')>=0))?' <span class="recomp">recomputed</span>':'';
      html+='<div class="fld '+flag+'"><span class="fk">'+f[0]+'</span><span class="fv">'+lock+f[1]+(f[2]?'':'')+recomp+'</span></div>';
    });
    div.innerHTML=html;
    layerStack.appendChild(div);
  });
}
function isHotField(key){
  const map={'TTL':'ttl','Hdr Checksum':'ipck','Src MAC':'smac','Dst MAC':'dmac','FCS (CRC-32)':'fcs'};
  return state.hot.includes(map[key]);
}

/* ════════ SIZE METER ════════ */
function renderMeter(){
  sizeVal.textContent = state.size;
  const max = state.udp ? 56 : 68;
  sizeFill.style.width = Math.max(8, (state.size/max)*100)+'%';
  // delta annotation
  const d = state.size - prevSize;
  if(d!==0){
    sizeDelta.textContent = (d>0?'+':'')+d+' B';
    sizeDelta.style.color = d>0?C.amber:'#34d399';
    sizeDelta.style.opacity=1;
  } else { sizeDelta.style.opacity=0; }
  prevSize = state.size;
  // highlight matching step
  document.querySelectorAll('#sizeSteps span').forEach(s=>{
    s.classList.toggle('on', +s.dataset.s===state.size);
  });
}

/* ════════ LEDGER ════════ */
function renderLedger(){
  document.querySelectorAll('.led-chg .led-row').forEach(r=>{
    r.classList.toggle('hot', state.hot.includes(r.dataset.chg));
  });
}

/* ════════ ARP PANEL ════════ */
function renderArp(){ arpPanel.classList.toggle('show', state.arp); }

/* ════════ OSI / TCP-IP MODEL LADDER ════════ */
function buildModel(){
  let html='';
  OSI_MODEL.forEach(grp=>{
    html+='<div class="om-tcp">'+grp.tcp+'</div>';
    grp.rows.forEach(r=>{
      html+='<div class="om-row" data-n="'+r.n+'">'
        + '<span class="om-n">'+r.n+'</span>'
        + '<span class="om-name">'+r.name+'</span>'
        + '<span class="om-pdu" style="color:'+r.col+';border-color:'+hexA(r.col,0.45)+';background:'+hexA(r.col,0.1)+'">'+r.pdu+'</span>'
        + '</div>';
    });
  });
  osiRows.innerHTML=html;
}
function renderModel(){
  const hi = HI[cur];
  osiRows.querySelectorAll('.om-row').forEach(r=>{
    r.classList.toggle('on', +r.dataset.n===hi);
  });
}

/* ════════ NARRATION ════════ */
function renderNarration(){
  const sc = SCENES[cur];
  narrStep.textContent = sc.step;
  narrTitle.textContent = sc.title;
  narrText.textContent = beginner && sc.simple ? sc.simple : sc.text;
  narrTldr.textContent = sc.tldr;
  $('backBtn').disabled = cur===0;
  $('nextBtn').textContent = cur>=SCENES.length-1 ? 'Restart ↺' : 'Next →';
}

/* ════════ STEP DOTS ════════ */
function buildDots(){
  SCENES.forEach((_,i)=>{
    const d=document.createElement('div'); d.className='step-dot'; d.dataset.i=i;
    d.addEventListener('click',()=>{ stopPlay(); gotoScene(i); });
    stepIndicator.appendChild(d);
  });
}
function renderDots(){
  document.querySelectorAll('.step-dot').forEach((d,i)=>{
    d.classList.toggle('active', i===cur);
    d.classList.toggle('done', i<cur);
  });
}

/* ════════ APPLY / NAVIGATE ════════ */
function applyScene(i){
  // re-derive state from scratch by replaying apply() up to i (keeps state coherent on jumps)
  // reset base
  state.has={data:false,l4:false,l3:false,l2:false}; state.tagged=false;
  state.ttl=64; state.ipck='0xb1e6'; state.fcs='0x9f3c';
  state.smac='AA:AA:AA:00:00:0A'; state.dmac='11:11:11:11:11:11';
  state.size=6; state.tokenAt='PC-A'; state.tokenT=0; state.fromNode=null; state.toNode=null;
  state.activeNode='PC-A'; state.arp=false; state.hot=[];
  for(let s=0;s<=i;s++){
    // carry forward token movement but only hot/arp from final scene
    if(s<i){ SCENES[s].apply(state); if(s<i){ state.hot=[]; state.arp=false; } }
    else SCENES[s].apply(state);
  }
  startTokenTween();
  renderAll();
}
function renderAll(){
  renderInspector(); renderMeter(); renderLedger(); renderArp(); renderModel(); renderNarration(); renderDots();
  endcard.classList.toggle('show', !!SCENES[cur].end);
}
function gotoScene(i){
  cur = Math.max(0, Math.min(SCENES.length-1, i));
  applyScene(cur);
}
function next(){
  if(cur>=SCENES.length-1){ gotoScene(0); endcard.classList.remove('show'); return; }
  gotoScene(cur+1);
}
function back(){ if(cur>0) gotoScene(cur-1); }

/* ════════ AUTO-PLAY ════════
   Advances scenes on a timer so a self-guided learner can sit back and watch
   the packet build and travel. Speed (0.5x/1x/2x) scales the dwell time, so
   the speed buttons now genuinely control playback pace, not just ambient flow.
   Manual Next/Back, dots, or arrow keys pause auto-play. */
const BASE_DWELL = 4200; // ms per scene at 1x
let playing = false, playTimer = null;
function dwell(){ return BASE_DWELL / (speed||1); }
function scheduleAdvance(){
  clearTimeout(playTimer);
  if(!playing) return;
  playTimer = setTimeout(()=>{
    if(!playing) return;
    if(cur>=SCENES.length-1){ stopPlay(); return; } // stop on the recap/end card
    gotoScene(cur+1);
    scheduleAdvance();
  }, dwell());
}
function startPlay(){
  if(cur>=SCENES.length-1){ endcard.classList.remove('show'); gotoScene(0); }
  playing = true;
  reflectPlayBtn();
  scheduleAdvance();
}
function stopPlay(){
  playing = false;
  clearTimeout(playTimer);
  reflectPlayBtn();
}
function togglePlay(){ playing ? stopPlay() : startPlay(); }
function reflectPlayBtn(){
  const b = $('playBtn');
  b.classList.toggle('playing', playing);
  b.setAttribute('aria-pressed', playing?'true':'false');
  b.innerHTML = playing ? '&#10073;&#10073; Pause' : '&#9654; Play';
}

/* ════════ CONTROLS ════════ */
// manual navigation pauses auto-play so the learner stays in control
$('nextBtn').addEventListener('click', ()=>{ stopPlay(); next(); });
$('backBtn').addEventListener('click', ()=>{ stopPlay(); back(); });
$('replayBtn').addEventListener('click', ()=>{ stopPlay(); endcard.classList.remove('show'); gotoScene(0); });
$('playBtn').addEventListener('click', togglePlay);

document.addEventListener('keydown', e=>{
  if(e.key==='ArrowRight'||e.key===' '){ e.preventDefault(); stopPlay(); next(); }
  else if(e.key==='ArrowLeft'){ e.preventDefault(); stopPlay(); back(); }
});

document.querySelectorAll('.speed-btn[data-spd]').forEach(b=>{
  b.addEventListener('click',()=>{
    speed=+b.dataset.spd;
    document.querySelectorAll('.speed-btn[data-spd]').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    if(playing) scheduleAdvance(); // re-time the running auto-play at the new speed
  });
});

$('beginnerBtn').addEventListener('click', function(){
  beginner=!beginner; this.classList.toggle('active',beginner);
  document.body.classList.toggle('beginner',beginner);
  renderNarration();
});
$('freeLookBtn').addEventListener('click', function(){
  freeLook=!freeLook; this.classList.toggle('active',freeLook);
  // free look just dims panels so canvas is unobstructed-ish
  $('pktInspector').style.opacity = freeLook?'0.25':'1';
  $('sizeMeter').style.opacity = freeLook?'0.25':'1';
  $('osiMap').style.opacity = freeLook?'0.25':'1';
  $('ledger').style.opacity = freeLook?'0.25':'1';
});

// TCP/UDP toggle
$('tcpBtn').addEventListener('click',()=>{ if(state.udp){ state.udp=false; toggleL4(); } });
$('udpBtn').addEventListener('click',()=>{ if(!state.udp){ state.udp=true; toggleL4(); } });
function toggleL4(){
  $('tcpBtn').classList.toggle('on', !state.udp);
  $('udpBtn').classList.toggle('on', state.udp);
  applyScene(cur); // recompute sizes/fields with new L4
}

// EtherChannel callout toggle
$('ecBtn').addEventListener('click', function(){
  this.classList.toggle('on');
  const on=this.classList.contains('on');
  const c=$('ecCallout');
  if(on){
    const g=geom();
    c.style.display='block';
    c.style.left=(g.nx['SW1']-20)+'px';
    c.style.top=(g.y+70)+'px';
    c.innerHTML='<b>EtherChannel option:</b> this trunk could be <b>Po1</b> = Gi0/1+Gi0/2. A hash picks one member; the frame and the tag are unchanged.';
  } else c.style.display='none';
});

// MTU what-if toggle
$('mtuBtn').addEventListener('click', function(){
  this.classList.toggle('on');
  const on=this.classList.contains('on');
  const c=$('mtuCallout');
  if(on){
    c.style.display='block';
    c.style.left='230px'; c.style.bottom='110px';
    c.innerHTML='<b style="color:#fbbf24">What if 4000 B?</b> Bigger than the 1500 B MTU. If the DF bit is clear, an IPv4 router fragments it into MTU-sized pieces. This 46 B example is far under MTU, so it never fragments.';
  } else c.style.display='none';
});

// click token to expand inspector (scroll it into view / pulse)
canvas.addEventListener('click', e=>{
  const g=geom();
  let tx = (tokenX==null) ? tokenTargetX(g) : tokenX;
  if(Math.abs(e.clientX-tx)<60 && Math.abs(e.clientY-(g.y-58))<50){
    const insp=$('pktInspector');
    insp.style.transition='box-shadow .3s';
    insp.style.boxShadow='0 0 0 2px '+C.teal;
    setTimeout(()=>insp.style.boxShadow='',600);
  }
});

/* ════════ INIT ════════ */
buildDots();
buildModel();
gotoScene(0);
draw();

})();
