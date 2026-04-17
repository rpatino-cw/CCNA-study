/**
 * subtopic-visuals.js — SVG animation library for CCNA subtopics
 * 10 core + 3 new renderers, pure SVG + SMIL + CSS, zero dependencies.
 *
 * Upgrade 2026-04-16: 5x richer visuals with real protocol content,
 * device-shaped icons, live counters, multi-stage animations.
 */
window.SubtopicVisuals = (() => {

  let _uid = 0;
  const uid = () => `sv-${++_uid}`;

  const COLORS = {
    blue:   '#3b82f6',
    green:  '#10b981',
    amber:  '#f59e0b',
    red:    '#ef4444',
    purple: '#8b5cf6',
    teal:   '#14b8a6',
    slate:  '#64748b',
    accent: '#B45309',
    pink:   '#ec4899',
    indigo: '#6366f1'
  };

  function esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // Device glyph generators — minimal SVG shapes for router/switch/host
  function routerGlyph(x, y, color, label) {
    return `
      <g>
        <rect x="${x-20}" y="${y-14}" width="40" height="28" rx="5" fill="${color}" opacity="0.12" stroke="${color}" stroke-width="1.5"/>
        <circle cx="${x-10}" cy="${y-4}" r="2" fill="${color}"/>
        <circle cx="${x}" cy="${y-4}" r="2" fill="${color}"/>
        <circle cx="${x+10}" cy="${y-4}" r="2" fill="${color}"/>
        <path d="M ${x-12} ${y+5} L ${x-4} ${y+5} M ${x+4} ${y+5} L ${x+12} ${y+5}" stroke="${color}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <text x="${x}" y="${y+24}" text-anchor="middle" fill="${color}" font-size="8.5" font-family="'Space Grotesk',sans-serif" font-weight="700">${esc(label)}</text>
      </g>`;
  }
  function switchGlyph(x, y, color, label) {
    return `
      <g>
        <rect x="${x-22}" y="${y-10}" width="44" height="20" rx="2" fill="${color}" opacity="0.12" stroke="${color}" stroke-width="1.5"/>
        ${[0,1,2,3,4,5,6,7].map(i => `<rect x="${x-19+i*5}" y="${y-4}" width="3" height="6" fill="${color}" opacity="0.65"/>`).join('')}
        <text x="${x}" y="${y+20}" text-anchor="middle" fill="${color}" font-size="8.5" font-family="'Space Grotesk',sans-serif" font-weight="700">${esc(label)}</text>
      </g>`;
  }
  function hostGlyph(x, y, color, label) {
    return `
      <g>
        <rect x="${x-10}" y="${y-12}" width="20" height="14" rx="2" fill="${color}" opacity="0.15" stroke="${color}" stroke-width="1.2"/>
        <rect x="${x-14}" y="${y+2}" width="28" height="3" rx="1" fill="${color}" opacity="0.7"/>
        <text x="${x}" y="${y+18}" text-anchor="middle" fill="${color}" font-size="8.5" font-family="'Space Grotesk',sans-serif" font-weight="700">${esc(label)}</text>
      </g>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // 1. packet-flow — real packet traveling through devices with
  //    TTL decrement, MAC rewrite labels, colored segments, glow trail.
  // ────────────────────────────────────────────────────────────────────
  function packetFlow(p) {
    const id = uid();
    const nodes = p.nodes || ['Host A', 'Router', 'Host B'];
    const color = p.color || COLORS.blue;
    const n = nodes.length;
    const w = 360, h = 140;
    const gap = (w - 80) / (n - 1);
    const yMid = 58;

    const SEGMENT_COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'];

    // Infer device types from label
    function glyphFor(label, x, y) {
      const L = label.toLowerCase();
      if (L.includes('router') || L.includes('r1') || L.includes('r2') || L.includes('r3') || L.includes('rtr') || L.includes('gw') || L.includes('gateway')) {
        return routerGlyph(x, y, color, label);
      }
      if (L.includes('switch') || L.includes('sw')) {
        return switchGlyph(x, y, color, label);
      }
      return hostGlyph(x, y, color, label);
    }

    let nodesSvg = '';
    let linksSvg = '';
    nodes.forEach((label, i) => {
      const x = 40 + i * gap;
      nodesSvg += glyphFor(label, x, yMid);
      if (i < n - 1) {
        const x2 = 40 + (i + 1) * gap;
        const segColor = SEGMENT_COLORS[i % SEGMENT_COLORS.length];
        linksSvg += `<line x1="${x + 22}" y1="${yMid}" x2="${x2 - 22}" y2="${yMid}" stroke="${segColor}" stroke-width="2.5" stroke-linecap="round" opacity="0.55"/>
          <line x1="${x + 22}" y1="${yMid}" x2="${x2 - 22}" y2="${yMid}" stroke="${segColor}" stroke-width="2.5" stroke-linecap="round" opacity="0.25" stroke-dasharray="2 6">
            <animate attributeName="stroke-dashoffset" values="8;0" dur="1s" repeatCount="indefinite"/>
          </line>
          <text x="${(x + x2)/2}" y="${yMid - 8}" text-anchor="middle" fill="${segColor}" font-size="8" font-family="'JetBrains Mono',monospace" opacity="0.7">seg ${i+1}</text>`;
      }
    });

    // Packet with SRC/DST labels that rewrite per hop
    const xPath = nodes.map((_, i) => 40 + i * gap).join(';');
    const ttlInit = p.ttl || 64;
    const ttlValues = nodes.map((_, i) => Math.max(1, ttlInit - i)).join(';');

    const packetSvg = `
      <g opacity="1">
        <rect x="-14" y="${yMid + 18}" width="28" height="18" rx="3" fill="${color}" opacity="0.92">
          <animate attributeName="x" values="${nodes.map((_,i)=>(40+i*gap-14)).join(';')}" dur="${(n-1)*1.3}s" repeatCount="indefinite" calcMode="spline" keySplines="${nodes.slice(1).map(()=>'0.16 1 0.3 1').join(';')}"/>
        </rect>
        <text x="0" y="${yMid + 30}" text-anchor="middle" fill="#fff" font-size="8.5" font-weight="700" font-family="'JetBrains Mono',monospace">
          <animate attributeName="x" values="${xPath}" dur="${(n-1)*1.3}s" repeatCount="indefinite" calcMode="spline" keySplines="${nodes.slice(1).map(()=>'0.16 1 0.3 1').join(';')}"/>
          PKT
        </text>
        <text x="0" y="${yMid - 18}" text-anchor="middle" fill="${color}" font-size="8" font-family="'JetBrains Mono',monospace" opacity="0.85" font-weight="700">
          <animate attributeName="x" values="${xPath}" dur="${(n-1)*1.3}s" repeatCount="indefinite" calcMode="spline" keySplines="${nodes.slice(1).map(()=>'0.16 1 0.3 1').join(';')}"/>
          <animate attributeName="opacity" values="0;0.9;0.9;0" dur="1.3s" repeatCount="indefinite" begin="0s"/>
          TTL=<animate attributeName="textContent" values="${ttlValues}" dur="${(n-1)*1.3}s" repeatCount="indefinite"/>
        </text>
      </g>
      <g>
        <circle r="3" fill="${color}" opacity="0.6" filter="url(#${id}-glow)">
          <animate attributeName="cx" values="${xPath}" dur="${(n-1)*1.3}s" repeatCount="indefinite" calcMode="spline" keySplines="${nodes.slice(1).map(()=>'0.16 1 0.3 1').join(';')}"/>
          <animate attributeName="cy" values="${nodes.map(()=>yMid+27).join(';')}" dur="${(n-1)*1.3}s" repeatCount="indefinite"/>
        </circle>
      </g>`;

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="${id}-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5"/>
        </filter>
      </defs>
      ${linksSvg}${nodesSvg}${packetSvg}
      <text x="${w/2}" y="${h - 6}" text-anchor="middle" fill="#a8a29e" font-size="8" font-family="'JetBrains Mono',monospace" opacity="0.8">L3: src/dst IP constant · L2: MAC rewritten per hop · TTL−1</text>
    </svg>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // 2. layer-stack — OSI with animated encapsulation waterfall,
  //    protocol header blocks slide in from right.
  // ────────────────────────────────────────────────────────────────────
  function layerStack(p) {
    const layers = p.layers || ['Application', 'Presentation', 'Session', 'Transport', 'Network', 'Data Link', 'Physical'];
    const hl = p.highlight != null ? p.highlight : 2;
    const color = p.color || COLORS.blue;
    const rowH = 32;
    const h = layers.length * rowH + 24;
    const w = 360;
    const id = uid();

    // Typical protocol labels per OSI index (7→1); detect count
    const PROTO_MAP = {
      7: ['HTTP/HTTPS', 'TLS/SSL', 'NetBIOS', 'TCP/UDP', 'IP · ICMP', 'Ethernet · ARP', 'Cable · RF'],
      5: ['HTTP/DNS/FTP', 'TCP/UDP', 'IP', 'Ethernet', 'Cable'],
      4: ['Application', 'Transport', 'Internet', 'Link']
    };
    const protos = PROTO_MAP[layers.length] || layers.map(() => '');

    let svg = '';
    layers.forEach((label, i) => {
      const y = 12 + i * rowH;
      const isActive = i === hl;
      const bg = isActive ? color : '#f3f0eb';
      const textFill = isActive ? '#fff' : '#57534e';
      const stroke = isActive ? color : '#d4d0c8';

      svg += `
        <rect x="14" y="${y}" width="200" height="${rowH - 4}" rx="4"
          fill="${bg}" stroke="${stroke}" stroke-width="1.2"
          opacity="${isActive ? 1 : 0.85}">
          ${isActive ? `<animate attributeName="opacity" values="0.92;1;0.92" dur="2.2s" repeatCount="indefinite"/>` : ''}
        </rect>
        <text x="114" y="${y + rowH/2 + 1}" text-anchor="middle" dominant-baseline="middle"
          fill="${textFill}" font-size="11.5" font-family="'Space Grotesk',sans-serif" font-weight="${isActive ? 700 : 600}">${esc(label)}</text>
        <text x="24" y="${y + rowH/2 + 1}" text-anchor="start" dominant-baseline="middle"
          fill="${textFill}" font-size="10" font-family="'JetBrains Mono',monospace" opacity="${isActive ? 0.75 : 0.55}" font-weight="${isActive ? 700 : 500}">L${layers.length - i}</text>`;

      // Header block to the right — animates in sequence
      const proto = protos[i];
      if (proto) {
        const hdrX = 228;
        svg += `
          <rect x="${hdrX}" y="${y + 2}" width="118" height="${rowH - 8}" rx="3"
            fill="${color}" opacity="0">
            <animate attributeName="opacity" values="0;${isActive ? 0.55 : 0.22}" dur="0.5s" begin="${0.2 + i * 0.3}s" fill="freeze"/>
          </rect>
          <text x="${hdrX + 59}" y="${y + rowH/2 + 1}" text-anchor="middle" dominant-baseline="middle"
            fill="${color}" font-size="9" font-family="'JetBrains Mono',monospace" font-weight="700" opacity="0">
            <animate attributeName="opacity" values="0;1" dur="0.5s" begin="${0.2 + i * 0.3}s" fill="freeze"/>
            ${esc(proto)}
          </text>`;
      }
    });

    // Active-layer outline pulse
    if (hl >= 0 && hl < layers.length) {
      const yHl = 10 + hl * rowH;
      svg += `<rect x="12" y="${yHl}" width="204" height="${rowH - 0}" rx="6" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.5">
        <animate attributeName="opacity" values="0.25;0.7;0.25" dur="2.2s" repeatCount="indefinite"/>
      </rect>`;
    }

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // 3. comparison — side-by-side with per-column mini animations,
  //    contrasting colors, animated divider, vs. badge.
  // ────────────────────────────────────────────────────────────────────
  function comparison(p) {
    const left = p.left || { label: 'A', items: [] };
    const right = p.right || { label: 'B', items: [] };
    const maxItems = Math.max(left.items.length, right.items.length, 1);
    const h = 60 + maxItems * 22 + 12;
    const w = 360;
    const id = uid();

    let svg = `
      <rect x="8" y="8" width="166" height="${h - 16}" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.4" opacity="0.35"/>
      <rect x="186" y="8" width="166" height="${h - 16}" rx="8" fill="#f0fdf4" stroke="#10b981" stroke-width="1.4" opacity="0.35"/>
      <rect x="8" y="8" width="166" height="28" rx="8" fill="#3b82f6" opacity="0.9"/>
      <rect x="186" y="8" width="166" height="28" rx="8" fill="#10b981" opacity="0.9"/>
      <text x="91" y="27" text-anchor="middle" fill="#fff" font-size="12" font-weight="700" font-family="'Space Grotesk',sans-serif">${esc(left.label)}</text>
      <text x="269" y="27" text-anchor="middle" fill="#fff" font-size="12" font-weight="700" font-family="'Space Grotesk',sans-serif">${esc(right.label)}</text>
      <circle cx="180" cy="22" r="10" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5">
        <animate attributeName="r" values="9;11;9" dur="1.8s" repeatCount="indefinite"/>
      </circle>
      <text x="180" y="26" text-anchor="middle" fill="#92400e" font-size="9" font-weight="700" font-family="'Space Grotesk',sans-serif">vs</text>`;

    // Left items with slide-in
    left.items.forEach((item, i) => {
      const y = 54 + i * 22;
      svg += `
        <circle cx="20" cy="${y - 4}" r="2.5" fill="#3b82f6" opacity="0">
          <animate attributeName="opacity" values="0;1" dur="0.3s" begin="${0.1 + i * 0.15}s" fill="freeze"/>
          <animate attributeName="r" values="2.5;3.5;2.5" dur="2s" begin="${i * 0.2}s" repeatCount="indefinite"/>
        </circle>
        <text x="28" y="${y}" fill="#1e40af" font-size="10" font-family="'Space Grotesk',sans-serif" font-weight="500" opacity="0">
          <animate attributeName="opacity" values="0;1" dur="0.4s" begin="${0.1 + i * 0.15}s" fill="freeze"/>
          ${esc(item)}
        </text>`;
    });

    // Right items with slide-in
    right.items.forEach((item, i) => {
      const y = 54 + i * 22;
      svg += `
        <circle cx="198" cy="${y - 4}" r="2.5" fill="#10b981" opacity="0">
          <animate attributeName="opacity" values="0;1" dur="0.3s" begin="${0.2 + i * 0.15}s" fill="freeze"/>
          <animate attributeName="r" values="2.5;3.5;2.5" dur="2s" begin="${i * 0.2}s" repeatCount="indefinite"/>
        </circle>
        <text x="206" y="${y}" fill="#065f46" font-size="10" font-family="'Space Grotesk',sans-serif" font-weight="500" opacity="0">
          <animate attributeName="opacity" values="0;1" dur="0.4s" begin="${0.2 + i * 0.15}s" fill="freeze"/>
          ${esc(item)}
        </text>`;
    });

    // Animated divider
    svg += `<line x1="180" y1="42" x2="180" y2="${h - 10}" stroke="#d4d0c8" stroke-width="1.5" stroke-dasharray="4 4">
      <animate attributeName="stroke-dashoffset" from="0" to="8" dur="1.5s" repeatCount="indefinite"/>
    </line>`;

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // 4. handshake — lifelines, timed packet flights, SEQ/ACK overlays.
  // ────────────────────────────────────────────────────────────────────
  function handshake(p) {
    const leftLabel = p.leftLabel || 'Client';
    const rightLabel = p.rightLabel || 'Server';
    const steps = p.steps || ['SYN →', '← SYN-ACK', 'ACK →'];
    const extras = p.extras || []; // Optional ["SEQ=X", "ACK=Y", ...] per step
    const rowH = 42;
    const h = 56 + steps.length * rowH + 18;
    const w = 360;
    const id = uid();
    const totalDur = steps.length * 1.2 + 0.8;

    let svg = `
      <rect x="24" y="8" width="80" height="26" rx="5" fill="${COLORS.blue}"/>
      <rect x="256" y="8" width="80" height="26" rx="5" fill="${COLORS.green}"/>
      <text x="64" y="25" text-anchor="middle" fill="#fff" font-size="11" font-weight="700" font-family="'Space Grotesk',sans-serif">${esc(leftLabel)}</text>
      <text x="296" y="25" text-anchor="middle" fill="#fff" font-size="11" font-weight="700" font-family="'Space Grotesk',sans-serif">${esc(rightLabel)}</text>
      <line x1="64" y1="34" x2="64" y2="${h - 10}" stroke="${COLORS.blue}" stroke-width="1.5" stroke-dasharray="2 3" opacity="0.45"/>
      <line x1="296" y1="34" x2="296" y2="${h - 10}" stroke="${COLORS.green}" stroke-width="1.5" stroke-dasharray="2 3" opacity="0.45"/>`;

    steps.forEach((step, i) => {
      const y = 58 + i * rowH;
      const isRight = step.startsWith('←') || step.includes('←');
      const label = step.replace(/[←→]/g, '').trim();
      const x1 = isRight ? 290 : 70;
      const x2 = isRight ? 70 : 290;
      const col = isRight ? COLORS.green : COLORS.blue;
      const startT = i * 1.2;
      const flightT = 0.8;
      const holdT = (steps.length - i - 1) * 1.2 + 0.4;

      // Packet capsule that slides across
      svg += `
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;1;1" keyTimes="0;0.1;0.9;1" dur="${flightT}s" begin="${startT}s" fill="freeze"/>
          <rect x="${x1 - 18}" y="${y - 9}" width="36" height="16" rx="3" fill="${col}" opacity="0.92">
            <animate attributeName="x" values="${x1 - 18};${x2 - 18}" dur="${flightT}s" begin="${startT}s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1"/>
          </rect>
          <text x="${x1}" y="${y + 2}" text-anchor="middle" fill="#fff" font-size="9" font-weight="700" font-family="'JetBrains Mono',monospace">
            <animate attributeName="x" values="${x1};${x2}" dur="${flightT}s" begin="${startT}s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1"/>
            ${esc(label.substring(0, 10))}
          </text>
        </g>
        <text x="180" y="${y - 12}" text-anchor="middle" fill="${col}" font-size="9" font-family="'JetBrains Mono',monospace" font-weight="600" opacity="0">
          <animate attributeName="opacity" values="0;1" dur="0.3s" begin="${startT + flightT * 0.5}s" fill="freeze"/>
          ${esc(label)}
        </text>
        ${extras[i] ? `<text x="180" y="${y + 14}" text-anchor="middle" fill="#a8a29e" font-size="8" font-family="'JetBrains Mono',monospace" opacity="0">
          <animate attributeName="opacity" values="0;1" dur="0.3s" begin="${startT + flightT * 0.5}s" fill="freeze"/>
          ${esc(extras[i])}
        </text>` : ''}`;
    });

    // Restart indicator
    svg += `<circle cx="${w/2}" cy="${h - 10}" r="3" fill="${COLORS.slate}" opacity="0.25">
      <animate attributeName="opacity" values="0;0;0.6;0" dur="${totalDur}s" repeatCount="indefinite" keyTimes="0;0.85;0.92;1"/>
    </circle>`;

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // 5. hierarchy — tree with data-flow dots down connections.
  // ────────────────────────────────────────────────────────────────────
  function hierarchy(p) {
    const root = p.root || 'Root';
    const children = p.children || [];
    const color = p.color || COLORS.blue;

    const leafCount = children.reduce((sum, c) => sum + Math.max((c.children || []).length, 1), 0);
    const w = Math.max(360, leafCount * 78 + 40);
    const hasL2 = children.some(c => c.children && c.children.length);
    const h = hasL2 ? 150 : 105;

    let svg = '';
    // Root with breathing ring
    svg += `
      <rect x="${w/2 - 48}" y="10" width="96" height="28" rx="6" fill="${color}"/>
      <text x="${w/2}" y="28" text-anchor="middle" fill="#fff" font-size="11" font-weight="700" font-family="'Space Grotesk',sans-serif">${esc(root)}</text>
      <rect x="${w/2 - 52}" y="6" width="104" height="36" rx="8" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.45">
        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.5s" repeatCount="indefinite"/>
      </rect>`;

    const l1Gap = (w - 40) / Math.max(children.length, 1);
    children.forEach((child, i) => {
      const cx = 20 + l1Gap * i + l1Gap / 2;
      const cy = 68;

      // Connection from root with flowing dot
      svg += `<line x1="${w/2}" y1="38" x2="${cx}" y2="58" stroke="${color}" stroke-width="1.2" opacity="0.5"/>
        <circle r="2.5" fill="${color}" opacity="0.9">
          <animate attributeName="cx" values="${w/2};${cx}" dur="1.2s" begin="${i * 0.25}s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="38;58" dur="1.2s" begin="${i * 0.25}s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.9;0" dur="1.2s" begin="${i * 0.25}s" repeatCount="indefinite"/>
        </circle>`;

      svg += `<rect x="${cx - 42}" y="${cy}" width="84" height="24" rx="5" fill="${color}" opacity="0.15" stroke="${color}" stroke-width="1.3"/>
        <text x="${cx}" y="${cy + 16}" text-anchor="middle" fill="${color}" font-size="10" font-weight="700" font-family="'Space Grotesk',sans-serif">${esc(child.name.substring(0, 14))}</text>`;

      if (child.children && child.children.length) {
        const l2Gap = 84 / child.children.length;
        child.children.forEach((leaf, j) => {
          const lx = cx - 42 + l2Gap * j + l2Gap / 2;
          const ly = 112;
          svg += `<line x1="${cx}" y1="${cy + 24}" x2="${lx}" y2="${ly}" stroke="${color}" stroke-width="1" opacity="0.35"/>
            <circle r="2" fill="${color}" opacity="0.8">
              <animate attributeName="cx" values="${cx};${lx}" dur="1.2s" begin="${0.6 + j * 0.2}s" repeatCount="indefinite"/>
              <animate attributeName="cy" values="${cy + 24};${ly}" dur="1.2s" begin="${0.6 + j * 0.2}s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.8;0" dur="1.2s" begin="${0.6 + j * 0.2}s" repeatCount="indefinite"/>
            </circle>
            <rect x="${lx - 32}" y="${ly}" width="64" height="22" rx="4" fill="#f3f0eb" stroke="#d4d0c8" stroke-width="1"/>
            <text x="${lx}" y="${ly + 14}" text-anchor="middle" fill="#57534e" font-size="8.5" font-weight="600" font-family="'Space Grotesk',sans-serif">${esc(leaf.name.substring(0, 12))}</text>`;
        });
      }
    });

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // 6. encapsulation — Russian doll layers with header byte counts
  //    appearing on the right, inner data glowing.
  // ────────────────────────────────────────────────────────────────────
  function encapsulation(p) {
    const defaults = [
      { label: 'L2 Frame', bytes: 18, color: COLORS.blue },
      { label: 'L3 IP',    bytes: 20, color: COLORS.purple },
      { label: 'L4 TCP',   bytes: 20, color: COLORS.teal },
      { label: 'Data',     bytes: 500, color: COLORS.green }
    ];
    const layers = p.layers || defaults;
    const n = layers.length;
    const w = 360, h = 60 + n * 22;
    const id = uid();

    let svg = '';
    layers.forEach((layer, i) => {
      const pad = i * 22;
      const rw = w - 40 - pad * 2;
      const ry = 14 + i * 10;
      const rh = h - 30 - i * 20;

      svg += `
        <rect x="${20 + pad}" y="${ry}" width="${rw}" height="${rh}" rx="6"
          fill="${layer.color}" fill-opacity="0.05"
          stroke="${layer.color}" stroke-width="1.6" opacity="0">
          <animate attributeName="opacity" values="0;0.9" dur="0.5s" begin="${i * 0.4}s" fill="freeze"/>
          <animate attributeName="fill-opacity" values="0.05;0.14;0.05" dur="${2.5 + i * 0.3}s" begin="${i * 0.4 + 0.5}s" repeatCount="indefinite"/>
        </rect>
        <text x="${26 + pad}" y="${ry + 14}" fill="${layer.color}" font-size="10" font-weight="700"
          font-family="'Space Grotesk',sans-serif" opacity="0">
          <animate attributeName="opacity" values="0;1" dur="0.5s" begin="${i * 0.4}s" fill="freeze"/>
          ${esc(layer.label)}
        </text>
        <text x="${w - 26 - pad}" y="${ry + 14}" text-anchor="end" fill="${layer.color}" font-size="9" font-weight="600"
          font-family="'JetBrains Mono',monospace" opacity="0">
          <animate attributeName="opacity" values="0;0.8" dur="0.5s" begin="${i * 0.4}s" fill="freeze"/>
          +${layer.bytes}B
        </text>`;
    });

    // Total byte counter at the bottom
    const total = layers.reduce((a, l) => a + (l.bytes || 0), 0);
    svg += `<text x="${w/2}" y="${h - 10}" text-anchor="middle" fill="#57534e" font-size="9" font-family="'JetBrains Mono',monospace" opacity="0">
      <animate attributeName="opacity" values="0;1" dur="0.5s" begin="${n * 0.4}s" fill="freeze"/>
      Total frame: ${total} bytes
    </text>`;

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // 7. state-machine — circular nodes, directed arrows, radiating pulse,
  //    optional transition labels.
  // ────────────────────────────────────────────────────────────────────
  function stateMachine(p) {
    const states = p.states || ['Init', 'Learning', 'Forwarding'];
    const active = p.active != null ? p.active : states.length - 1;
    const transitions = p.transitionLabels || [];
    const color = p.color || COLORS.blue;
    const n = states.length;
    const w = Math.max(360, n * 86);
    const h = 84;
    const gap = (w - 20) / n;
    const id = uid();

    let svg = '';
    states.forEach((state, i) => {
      const cx = 10 + gap * i + gap / 2;
      const isActive = i === active;
      const fill = isActive ? color : '#f3f0eb';
      const textFill = isActive ? '#fff' : '#57534e';
      const strokeClr = isActive ? color : '#d4d0c8';

      svg += `
        <circle cx="${cx}" cy="42" r="24" fill="${fill}" stroke="${strokeClr}" stroke-width="1.8"/>
        <text x="${cx}" y="${46}" text-anchor="middle" fill="${textFill}" font-size="10"
          font-weight="${isActive ? 700 : 600}" font-family="'Space Grotesk',sans-serif">${esc(state.substring(0, 10))}</text>
        <text x="${cx}" y="${78}" text-anchor="middle" fill="#a8a29e" font-size="8" font-family="'JetBrains Mono',monospace">state ${i}</text>`;

      if (isActive) {
        svg += `
          <circle cx="${cx}" cy="42" r="24" fill="none" stroke="${color}" stroke-width="2" opacity="0.5">
            <animate attributeName="r" values="22;30;22" dur="1.8s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.5;0.05;0.5" dur="1.8s" repeatCount="indefinite"/>
          </circle>
          <circle cx="${cx}" cy="42" r="24" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.3">
            <animate attributeName="r" values="24;36;24" dur="1.8s" begin="0.4s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.3;0;0.3" dur="1.8s" begin="0.4s" repeatCount="indefinite"/>
          </circle>`;
      }

      if (i < n - 1) {
        const nextCx = 10 + gap * (i + 1) + gap / 2;
        const x1 = cx + 26;
        const x2 = nextCx - 26;
        svg += `<line x1="${x1}" y1="42" x2="${x2}" y2="42" stroke="${color}" stroke-width="1.5" opacity="0.45" marker-end="url(#${id}-arr)"/>
          <circle r="2.5" cy="42" fill="${color}">
            <animate attributeName="cx" values="${x1};${x2}" dur="1.4s" begin="${i * 0.4}s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0" dur="1.4s" begin="${i * 0.4}s" repeatCount="indefinite"/>
          </circle>`;
        if (transitions[i]) {
          svg += `<text x="${(x1 + x2)/2}" y="36" text-anchor="middle" fill="#57534e" font-size="8" font-family="'JetBrains Mono',monospace" font-weight="600">${esc(transitions[i])}</text>`;
        }
      }
    });

    svg += `<defs><marker id="${id}-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="${color}"/>
    </marker></defs>`;

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // 8. binary-breakdown — 32 bits with network/host braces, magic number,
  //    dotted decimal computed below, highlight sweep.
  // ────────────────────────────────────────────────────────────────────
  function binaryBreakdown(p) {
    const bits = (p.bits || '11111111.11111111.11111111.00000000').replace(/\./g, '');
    const label = p.label || 'Subnet Mask';
    const highlight = p.highlight || [];
    const prefix = p.prefix; // Optional /N prefix length for network/host split
    const color = p.color || COLORS.blue;
    const w = 360, h = 100;

    const ncol = '#3b82f6';
    const hcol = '#f59e0b';

    let svg = `<text x="${w/2}" y="14" text-anchor="middle" fill="#57534e" font-size="11" font-weight="700" font-family="'Space Grotesk',sans-serif">${esc(label)}</text>`;

    // Bits
    const bitW = 9, bitGap = 1, octetGap = 6;
    const startX = 16;
    for (let i = 0; i < 32; i++) {
      const x = startX + i * (bitW + bitGap) + Math.floor(i / 8) * octetGap;
      const isHl = highlight.includes(i);
      const bit = bits[i] || '0';
      const inNetwork = prefix != null && i < prefix;
      const segColor = prefix != null ? (inNetwork ? ncol : hcol) : color;
      const fill = isHl
        ? (bit === '1' ? segColor : '#fde68a')
        : (bit === '1' ? '#e7e5e4' : '#faf8f4');

      svg += `<rect x="${x}" y="28" width="${bitW}" height="20" rx="2"
        fill="${fill}" stroke="${isHl || bit === '1' ? segColor : '#d4d0c8'}" stroke-width="1">
        ${isHl ? `<animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" begin="${i * 0.05}s" repeatCount="indefinite"/>` : ''}
      </rect>
      <text x="${x + bitW/2}" y="42" text-anchor="middle" fill="${bit === '1' ? (prefix != null ? '#fff' : (isHl ? '#fff' : '#57534e')) : (isHl ? '#92400e' : '#a8a29e')}"
        font-size="8" font-family="'JetBrains Mono',monospace" font-weight="700">${bit}</text>`;

      if ((i + 1) % 8 === 0 && i < 31) {
        const dx = x + bitW + 2;
        svg += `<circle cx="${dx}" cy="38" r="1.6" fill="#a8a29e"/>`;
      }
    }

    // Dotted-decimal under each octet
    for (let oct = 0; oct < 4; oct++) {
      const octBits = bits.slice(oct * 8, (oct + 1) * 8);
      const dec = parseInt(octBits, 2) || 0;
      const ox = startX + oct * 8 * (bitW + bitGap) + oct * octetGap + (8 * (bitW + bitGap)) / 2 - bitGap / 2;
      svg += `<text x="${ox}" y="60" text-anchor="middle" fill="#57534e" font-size="10" font-family="'JetBrains Mono',monospace" font-weight="700">${dec}</text>`;
    }

    // Network/host brackets if prefix provided
    if (prefix != null) {
      const pxEndNet = startX + prefix * (bitW + bitGap) + Math.floor((prefix - 1) / 8) * octetGap + bitW;
      const pxEndHost = startX + 32 * (bitW + bitGap) + 3 * octetGap;
      svg += `
        <line x1="${startX}" y1="72" x2="${pxEndNet - 2}" y2="72" stroke="${ncol}" stroke-width="1.5"/>
        <text x="${(startX + pxEndNet) / 2}" y="86" text-anchor="middle" fill="${ncol}" font-size="10" font-weight="700" font-family="'Space Grotesk',sans-serif">network (/${prefix})</text>
        <line x1="${pxEndNet + 2}" y1="72" x2="${pxEndHost}" y2="72" stroke="${hcol}" stroke-width="1.5"/>
        <text x="${(pxEndNet + pxEndHost) / 2}" y="86" text-anchor="middle" fill="${hcol}" font-size="10" font-weight="700" font-family="'Space Grotesk',sans-serif">host (${32 - prefix})</text>`;
    }

    // Sweep highlight
    svg += `<rect x="${startX}" y="26" width="10" height="24" rx="2" fill="${color}" opacity="0">
      <animate attributeName="x" values="${startX};${startX + 32 * (bitW + bitGap) + 18}" dur="3s" begin="1s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0.2;0" dur="3s" begin="1s" repeatCount="indefinite"/>
    </rect>`;

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // 9. shield — layered defense-in-depth with incoming threat deflection.
  // ────────────────────────────────────────────────────────────────────
  function shield(p) {
    const items = p.items || ['Encryption', 'Authentication', 'Integrity'];
    const color = p.color || COLORS.green;
    const w = 360, h = 120;
    const id = uid();

    let svg = `
      <defs>
        <linearGradient id="${id}-g" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0.05"/>
        </linearGradient>
      </defs>
      <path d="M 60 22 L 98 10 L 136 22 L 136 70 C 136 92 98 108 98 108 C 98 108 60 92 60 70 Z"
        fill="url(#${id}-g)" stroke="${color}" stroke-width="2">
        <animate attributeName="stroke-width" values="1.8;2.4;1.8" dur="2.5s" repeatCount="indefinite"/>
      </path>
      <path d="M 60 22 L 98 10 L 136 22 L 136 70 C 136 92 98 108 98 108 C 98 108 60 92 60 70 Z"
        fill="none" stroke="${color}" stroke-width="1" opacity="0.3">
        <animate attributeName="opacity" values="0.1;0.4;0.1" dur="2.5s" repeatCount="indefinite"/>
      </path>
      <path d="M 82 56 L 92 68 L 116 44" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>

      <!-- Incoming threat arrow -->
      <g opacity="0.8">
        <line x1="0" y1="60" x2="58" y2="60" stroke="${COLORS.red}" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.6">
          <animate attributeName="stroke-dashoffset" from="0" to="7" dur="0.8s" repeatCount="indefinite"/>
        </line>
        <text x="10" y="54" fill="${COLORS.red}" font-size="8" font-weight="700" font-family="'JetBrains Mono',monospace" opacity="0.8">THREAT</text>
        <circle r="3" fill="${COLORS.red}">
          <animate attributeName="cx" values="0;56;56" dur="2s" repeatCount="indefinite" keyTimes="0;0.5;1"/>
          <animate attributeName="cy" values="60;60;60" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;1;0" dur="2s" repeatCount="indefinite" keyTimes="0;0.5;1"/>
          <animate attributeName="r" values="3;3;8" dur="2s" repeatCount="indefinite" keyTimes="0;0.5;1"/>
        </circle>
      </g>`;

    items.forEach((item, i) => {
      const y = 22 + i * 26;
      svg += `
        <circle cx="172" cy="${y}" r="5" fill="${color}" opacity="0.18">
          <animate attributeName="r" values="4;7;4" dur="2.2s" begin="${i * 0.35}s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.2s" begin="${i * 0.35}s" repeatCount="indefinite"/>
        </circle>
        <circle cx="172" cy="${y}" r="2" fill="${color}"/>
        <rect x="184" y="${y - 10}" width="168" height="20" rx="4" fill="${color}" opacity="0.08" stroke="${color}" stroke-width="1"/>
        <text x="192" y="${y + 4}" fill="${color}" font-size="10" font-family="'Space Grotesk',sans-serif" font-weight="600">${esc(item)}</text>`;
    });

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // 10. gauge — fill bar + pulse glow + threshold marker + % label.
  // ────────────────────────────────────────────────────────────────────
  function gauge(p) {
    const level = Math.max(0, Math.min(100, p.level || 50));
    const label = p.label || 'Utilization';
    const threshold = p.threshold != null ? p.threshold : 80;
    const color = level >= threshold ? COLORS.red : (level >= threshold - 20 ? COLORS.amber : (p.color || COLORS.green));
    const w = 360, h = 70;
    const barW = 260, barX = 50;
    const fillW = barW * level / 100;
    const thX = barX + (threshold / 100) * barW;

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">
      <text x="${barX}" y="22" fill="#57534e" font-size="11" font-weight="700" font-family="'Space Grotesk',sans-serif">${esc(label)}</text>
      <text x="${barX + barW}" y="22" text-anchor="end" fill="${color}" font-size="13" font-weight="700" font-family="'JetBrains Mono',monospace">${level}%</text>

      <rect x="${barX}" y="32" width="${barW}" height="16" rx="8" fill="#f3f0eb" stroke="#e2dfd9" stroke-width="1"/>

      <!-- Threshold marker -->
      <line x1="${thX}" y1="28" x2="${thX}" y2="52" stroke="#78716c" stroke-width="1" stroke-dasharray="2 2" opacity="0.55"/>
      <text x="${thX}" y="64" text-anchor="middle" fill="#78716c" font-size="8" font-family="'JetBrains Mono',monospace" opacity="0.75">${threshold}%</text>

      <!-- Fill bar -->
      <rect x="${barX}" y="32" width="0" height="16" rx="8" fill="${color}" opacity="0.9">
        <animate attributeName="width" from="0" to="${fillW}" dur="1.2s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1"/>
      </rect>
      <rect x="${barX}" y="32" width="0" height="16" rx="8" fill="${color}" opacity="0.3">
        <animate attributeName="width" from="0" to="${fillW}" dur="1.2s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1"/>
        <animate attributeName="opacity" values="0.25;0.55;0.25" dur="2s" begin="1.2s" repeatCount="indefinite"/>
      </rect>

      <!-- Level indicator dot -->
      <circle cy="40" r="4" fill="${color}" stroke="#fff" stroke-width="1.5">
        <animate attributeName="cx" from="${barX}" to="${barX + fillW}" dur="1.2s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1"/>
        <animate attributeName="r" values="3.5;5;3.5" dur="1.8s" begin="1.2s" repeatCount="indefinite"/>
      </circle>
    </svg>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // 11. NEW — protocol-timeline: sequence diagram with time axis, sized packets.
  // ────────────────────────────────────────────────────────────────────
  function protocolTimeline(p) {
    const actors = p.actors || ['Client', 'Server'];
    const events = p.events || [
      { from: 0, to: 1, label: 'SYN',     size: 64 },
      { from: 1, to: 0, label: 'SYN-ACK', size: 64 },
      { from: 0, to: 1, label: 'ACK',     size: 64 }
    ];
    const w = 360, h = 60 + events.length * 32 + 20;
    const gap = (w - 60) / (actors.length - 1);
    const laneX = actors.map((_, i) => 30 + i * gap);
    const palette = [COLORS.blue, COLORS.green, COLORS.purple, COLORS.amber, COLORS.teal];

    let svg = '';
    actors.forEach((a, i) => {
      svg += `
        <rect x="${laneX[i] - 40}" y="8" width="80" height="24" rx="4" fill="${palette[i % palette.length]}"/>
        <text x="${laneX[i]}" y="24" text-anchor="middle" fill="#fff" font-size="10" font-weight="700" font-family="'Space Grotesk',sans-serif">${esc(a)}</text>
        <line x1="${laneX[i]}" y1="32" x2="${laneX[i]}" y2="${h - 18}" stroke="#d4d0c8" stroke-width="1.2" stroke-dasharray="2 3"/>
        <text x="${laneX[i]}" y="${h - 6}" text-anchor="middle" fill="#a8a29e" font-size="8" font-family="'JetBrains Mono',monospace">t→</text>`;
    });

    events.forEach((e, i) => {
      const y = 52 + i * 32;
      const x1 = laneX[e.from];
      const x2 = laneX[e.to];
      const color = palette[e.from % palette.length];
      const delay = i * 0.7;
      const flight = 0.6;
      const packetW = Math.max(16, Math.min(36, (e.size || 64) / 4));

      svg += `
        <g opacity="0">
          <animate attributeName="opacity" values="0;1" dur="0.3s" begin="${delay}s" fill="freeze"/>
          <rect y="${y - 7}" width="${packetW}" height="14" rx="2" fill="${color}" opacity="0.95">
            <animate attributeName="x" values="${x1 - packetW/2};${x2 - packetW/2}" dur="${flight}s" begin="${delay}s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1"/>
          </rect>
          <text y="${y + 2}" text-anchor="middle" fill="#fff" font-size="8" font-weight="700" font-family="'JetBrains Mono',monospace">
            <animate attributeName="x" values="${x1};${x2}" dur="${flight}s" begin="${delay}s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1"/>
            ${esc((e.label || '').substring(0, 8))}
          </text>
        </g>
        <text x="${(x1 + x2)/2}" y="${y - 11}" text-anchor="middle" fill="${color}" font-size="8" font-family="'JetBrains Mono',monospace" font-weight="600" opacity="0">
          <animate attributeName="opacity" values="0;0.8" dur="0.3s" begin="${delay + flight * 0.5}s" fill="freeze"/>
          ${esc(e.label || '')} · ${e.size || 0}B
        </text>`;
    });

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // 12. NEW — subnet-ruler: prefix ruler with network/host/usable range.
  // ────────────────────────────────────────────────────────────────────
  function subnetRuler(p) {
    const prefix = p.prefix != null ? p.prefix : 24;
    const w = 360, h = 100;
    const startX = 20, endX = 340;
    const markW = endX - startX;
    const hostBits = 32 - prefix;
    const hosts = Math.max(0, Math.pow(2, hostBits) - 2);
    const blockSize = hostBits >= 8 ? Math.pow(2, hostBits - 8) * 256 : Math.pow(2, hostBits);
    const magic = 256 - (prefix >= 24 ? (255 << (32 - prefix - 24) & 0xff) || Math.pow(2, 32 - prefix) : 0);

    const splitX = startX + (prefix / 32) * markW;

    let svg = `
      <text x="${w/2}" y="18" text-anchor="middle" fill="#57534e" font-size="12" font-weight="700" font-family="'Space Grotesk',sans-serif">Subnet /${prefix}</text>
      <!-- Ruler bar -->
      <rect x="${startX}" y="30" width="${splitX - startX}" height="16" fill="#3b82f6" opacity="0.85" rx="2"/>
      <rect x="${splitX}" y="30" width="${endX - splitX}" height="16" fill="#f59e0b" opacity="0.85" rx="2"/>
      <!-- tick marks every 8 bits -->
      ${[0,8,16,24,32].map(t => {
        const x = startX + (t/32) * markW;
        return `<line x1="${x}" y1="28" x2="${x}" y2="48" stroke="#57534e" stroke-width="1"/>
          <text x="${x}" y="60" text-anchor="middle" fill="#57534e" font-size="8.5" font-family="'JetBrains Mono',monospace">${t}</text>`;
      }).join('')}
      <!-- split indicator -->
      <line x1="${splitX}" y1="24" x2="${splitX}" y2="52" stroke="${COLORS.red}" stroke-width="2">
        <animate attributeName="stroke-width" values="1.5;3;1.5" dur="1.8s" repeatCount="indefinite"/>
      </line>
      <text x="${splitX}" y="22" text-anchor="middle" fill="${COLORS.red}" font-size="9" font-weight="700" font-family="'JetBrains Mono',monospace">/${prefix}</text>
      <!-- labels -->
      <text x="${(startX + splitX)/2}" y="42" text-anchor="middle" fill="#fff" font-size="9" font-weight="700" font-family="'Space Grotesk',sans-serif">network</text>
      <text x="${(splitX + endX)/2}" y="42" text-anchor="middle" fill="#fff" font-size="9" font-weight="700" font-family="'Space Grotesk',sans-serif">host (${hostBits}b)</text>
      <!-- summary below -->
      <g transform="translate(0, 72)">
        <rect x="20" y="0" width="100" height="24" rx="4" fill="#eff6ff" stroke="#3b82f6" stroke-width="1"/>
        <text x="70" y="10" text-anchor="middle" fill="#1e40af" font-size="8" font-family="'JetBrains Mono',monospace" font-weight="700">USABLE HOSTS</text>
        <text x="70" y="20" text-anchor="middle" fill="#1e40af" font-size="11" font-weight="700" font-family="'JetBrains Mono',monospace">${hosts.toLocaleString()}</text>

        <rect x="130" y="0" width="100" height="24" rx="4" fill="#fff7ed" stroke="${COLORS.amber}" stroke-width="1"/>
        <text x="180" y="10" text-anchor="middle" fill="#92400e" font-size="8" font-family="'JetBrains Mono',monospace" font-weight="700">BLOCK SIZE</text>
        <text x="180" y="20" text-anchor="middle" fill="#92400e" font-size="11" font-weight="700" font-family="'JetBrains Mono',monospace">${blockSize}</text>

        <rect x="240" y="0" width="100" height="24" rx="4" fill="#f0fdf4" stroke="${COLORS.green}" stroke-width="1"/>
        <text x="290" y="10" text-anchor="middle" fill="#065f46" font-size="8" font-family="'JetBrains Mono',monospace" font-weight="700">SUBNETS /24</text>
        <text x="290" y="20" text-anchor="middle" fill="#065f46" font-size="11" font-weight="700" font-family="'JetBrains Mono',monospace">${Math.pow(2, Math.max(0, 24 - prefix))}</text>
      </g>`;

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // 13. NEW — topology-live: node grid with dashed links and traffic dots.
  // ────────────────────────────────────────────────────────────────────
  function topologyLive(p) {
    const nodes = p.nodes || [
      { id: 'A', x: 0.15, y: 0.25, kind: 'host' },
      { id: 'SW', x: 0.50, y: 0.55, kind: 'switch' },
      { id: 'B', x: 0.85, y: 0.25, kind: 'host' }
    ];
    const links = p.links || [
      { from: 0, to: 1 },
      { from: 1, to: 2 }
    ];
    const color = p.color || COLORS.blue;
    const w = 360, h = 180;

    function draw(node, x, y) {
      if (node.kind === 'router') return routerGlyph(x, y, color, node.id);
      if (node.kind === 'switch') return switchGlyph(x, y, color, node.id);
      return hostGlyph(x, y, color, node.id);
    }

    const xy = nodes.map(n => ({ x: 30 + n.x * (w - 60), y: 20 + n.y * (h - 50) }));

    let svg = '';
    links.forEach((l, i) => {
      const a = xy[l.from], b = xy[l.to];
      svg += `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${color}" stroke-width="2" opacity="0.35"/>
        <line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${color}" stroke-width="2" opacity="0.7" stroke-dasharray="3 5">
          <animate attributeName="stroke-dashoffset" values="0;-8" dur="${0.8 + i * 0.1}s" repeatCount="indefinite"/>
        </line>
        <circle r="3" fill="${color}">
          <animate attributeName="cx" values="${a.x};${b.x}" dur="1.8s" begin="${i * 0.4}s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="${a.y};${b.y}" dur="1.8s" begin="${i * 0.4}s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;1;0" dur="1.8s" begin="${i * 0.4}s" repeatCount="indefinite" keyTimes="0;0.85;1"/>
        </circle>`;
    });
    nodes.forEach((n, i) => {
      svg += draw(n, xy[i].x, xy[i].y);
    });

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // 14. routing-table — show a router's RIB, animated longest-match lookup.
  // ────────────────────────────────────────────────────────────────────
  function routingTable(p) {
    const rows = p.rows || [
      { code: 'C', dest: '10.1.1.0/24',  ad: 0,   metric: 0,  next: 'directly connected', exit: 'Gi0/0' },
      { code: 'S', dest: '10.2.2.0/24',  ad: 1,   metric: 0,  next: '192.168.1.2',         exit: 'Gi0/1' },
      { code: 'O', dest: '172.16.0.0/16', ad: 110, metric: 20, next: '192.168.1.2',         exit: 'Gi0/1' },
      { code: 'B', dest: '0.0.0.0/0',    ad: 20,  metric: 0,  next: '203.0.113.1',         exit: 'Gi0/2' }
    ];
    const lookup = p.lookup || '172.16.5.10';
    const match = p.match != null ? p.match : 2;
    const w = 360, h = 36 + rows.length * 24 + 44;
    const codeColor = { C: COLORS.green, S: COLORS.slate, O: COLORS.blue, B: COLORS.purple, D: COLORS.teal, R: COLORS.amber, L: COLORS.green };

    let svg = `
      <text x="16" y="16" fill="#57534e" font-size="10" font-weight="700" font-family="'Space Grotesk',sans-serif">show ip route — longest-match lookup</text>
      <rect x="12" y="22" width="336" height="24" rx="4" fill="#1c1917"/>
      <text x="22" y="38" fill="#fde68a" font-size="10" font-weight="700" font-family="'JetBrains Mono',monospace">Dest: ${esc(lookup)}</text>
      <text x="338" y="38" text-anchor="end" fill="#a7f3d0" font-size="10" font-family="'JetBrains Mono',monospace" font-weight="700">→ match row ${match + 1}</text>`;

    rows.forEach((r, i) => {
      const y = 56 + i * 24;
      const isMatch = i === match;
      const bg = isMatch ? '#fef3c7' : (i % 2 ? '#faf8f4' : '#fff');
      const cCol = codeColor[r.code] || COLORS.slate;
      svg += `
        <rect x="12" y="${y}" width="336" height="22" rx="3" fill="${bg}" stroke="${isMatch ? COLORS.amber : '#e7e5e4'}" stroke-width="${isMatch ? 1.5 : 0.8}">
          ${isMatch ? `<animate attributeName="stroke-width" values="1.2;2.2;1.2" dur="1.8s" repeatCount="indefinite"/>` : ''}
        </rect>
        <rect x="16" y="${y + 4}" width="14" height="14" rx="2" fill="${cCol}"/>
        <text x="23" y="${y + 15}" text-anchor="middle" fill="#fff" font-size="10" font-family="'JetBrains Mono',monospace" font-weight="700">${r.code}</text>
        <text x="38" y="${y + 15}" fill="#1c1917" font-size="10" font-family="'JetBrains Mono',monospace" font-weight="600">${esc(r.dest)}</text>
        <text x="168" y="${y + 15}" fill="#57534e" font-size="9" font-family="'JetBrains Mono',monospace">[${r.ad}/${r.metric}]</text>
        <text x="220" y="${y + 15}" fill="#57534e" font-size="9" font-family="'JetBrains Mono',monospace">${esc(r.next.substring(0, 18))}</text>
        <text x="344" y="${y + 15}" text-anchor="end" fill="${cCol}" font-size="9" font-family="'JetBrains Mono',monospace" font-weight="600">${esc(r.exit)}</text>`;

      if (isMatch) {
        svg += `<circle r="3" cy="${y + 11}" fill="${COLORS.amber}">
          <animate attributeName="cx" values="4;12" dur="1s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite"/>
        </circle>`;
      }
    });

    svg += `<text x="${w/2}" y="${h - 6}" text-anchor="middle" fill="#a8a29e" font-size="8" font-family="'JetBrains Mono',monospace">Longest prefix wins · AD only used if prefix lengths tie</text>`;

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // 15. acl-ladder — top-down ACL rule evaluation with stop-at-match.
  // ────────────────────────────────────────────────────────────────────
  function aclLadder(p) {
    const rules = p.rules || [
      { n: 10, action: 'permit', proto: 'tcp', src: 'host 10.1.1.5',   dst: 'any',         port: 'eq 22' },
      { n: 20, action: 'deny',   proto: 'tcp', src: '10.1.1.0 0.0.0.255', dst: 'any',      port: 'eq 23' },
      { n: 30, action: 'permit', proto: 'ip',  src: '10.1.1.0 0.0.0.255', dst: 'any',      port: '' }
    ];
    const match = p.match != null ? p.match : 1;
    const w = 360, h = 36 + rules.length * 26 + 44;

    let svg = `
      <text x="16" y="16" fill="#57534e" font-size="10" font-weight="700" font-family="'Space Grotesk',sans-serif">ACL evaluation — top-down, first match wins</text>`;

    rules.forEach((r, i) => {
      const y = 28 + i * 26;
      const isMatch = i === match;
      const col = r.action === 'permit' ? COLORS.green : COLORS.red;
      const bg = isMatch ? (r.action === 'permit' ? '#ecfdf5' : '#fef2f2') : '#fff';
      svg += `
        <rect x="12" y="${y}" width="336" height="22" rx="3" fill="${bg}" stroke="${isMatch ? col : '#e7e5e4'}" stroke-width="${isMatch ? 1.8 : 0.8}">
          ${isMatch ? `<animate attributeName="stroke-width" values="1.4;2.4;1.4" dur="1.8s" repeatCount="indefinite"/>` : ''}
        </rect>
        <text x="20" y="${y + 15}" fill="#78716c" font-size="9" font-family="'JetBrains Mono',monospace">${r.n}</text>
        <rect x="42" y="${y + 4}" width="46" height="14" rx="3" fill="${col}"/>
        <text x="65" y="${y + 14}" text-anchor="middle" fill="#fff" font-size="9" font-family="'JetBrains Mono',monospace" font-weight="700">${r.action}</text>
        <text x="96" y="${y + 15}" fill="#57534e" font-size="9" font-family="'JetBrains Mono',monospace" font-weight="600">${esc(r.proto)}</text>
        <text x="120" y="${y + 15}" fill="#1c1917" font-size="9" font-family="'JetBrains Mono',monospace">${esc(r.src)} → ${esc(r.dst)}</text>
        <text x="344" y="${y + 15}" text-anchor="end" fill="${col}" font-size="9" font-family="'JetBrains Mono',monospace" font-weight="600">${esc(r.port)}</text>`;
      if (isMatch) {
        svg += `<path d="M 2 ${y + 11} L 10 ${y + 11}" stroke="${col}" stroke-width="2" marker-end="url(#acl-arrow-${i})">
          <animate attributeName="opacity" values="0;1;1;0" dur="1.4s" repeatCount="indefinite"/>
        </path>
        <defs><marker id="acl-arrow-${i}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="${col}"/>
        </marker></defs>`;
      }
    });

    // Implicit deny
    const idY = 28 + rules.length * 26;
    svg += `
      <rect x="12" y="${idY}" width="336" height="22" rx="3" fill="#fafaf9" stroke="#d4d0c8" stroke-width="0.8" stroke-dasharray="3 3"/>
      <text x="20" y="${idY + 15}" fill="#a8a29e" font-size="9" font-family="'JetBrains Mono',monospace" font-style="italic">(implicit)</text>
      <rect x="86" y="${idY + 4}" width="46" height="14" rx="3" fill="#a8a29e"/>
      <text x="109" y="${idY + 14}" text-anchor="middle" fill="#fff" font-size="9" font-family="'JetBrains Mono',monospace" font-weight="700">deny</text>
      <text x="140" y="${idY + 15}" fill="#a8a29e" font-size="9" font-family="'JetBrains Mono',monospace">any any — drops everything not explicitly permitted</text>
      <text x="${w/2}" y="${h - 6}" text-anchor="middle" fill="#a8a29e" font-size="8" font-family="'JetBrains Mono',monospace">Order matters · extended ACL close to source · standard close to destination</text>`;

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // 16. stp-tree — root bridge election w/ BID, blocked port marker.
  // ────────────────────────────────────────────────────────────────────
  function stpTree(p) {
    const root = p.root || { id: 'SW1', priority: 4096, mac: 'aaaa.aaaa.0001' };
    const leaves = p.leaves || [
      { id: 'SW2', priority: 32768, mac: 'bbbb.bbbb.0002', rootCost: 4 },
      { id: 'SW3', priority: 32768, mac: 'cccc.cccc.0003', rootCost: 4 }
    ];
    const blocked = p.blocked || { id: 'SW3', port: 'Gi0/2' };
    const w = 360, h = 180;

    let svg = `
      <text x="${w/2}" y="16" text-anchor="middle" fill="#57534e" font-size="11" font-weight="700" font-family="'Space Grotesk',sans-serif">STP Root Bridge Election</text>

      <!-- Root bridge, crowned -->
      <g transform="translate(${w/2 - 48}, 28)">
        <path d="M 18 -4 L 26 4 L 34 -2 L 42 4 L 50 -4 L 78 -4 L 78 -8 L 18 -8 Z" fill="${COLORS.amber}" opacity="0.9"/>
        <rect x="0" y="0" width="96" height="34" rx="6" fill="${COLORS.amber}"/>
        <text x="48" y="14" text-anchor="middle" fill="#fff" font-size="11" font-weight="700" font-family="'Space Grotesk',sans-serif">${esc(root.id)} ROOT</text>
        <text x="48" y="26" text-anchor="middle" fill="#fff" font-size="8" font-family="'JetBrains Mono',monospace" opacity="0.9">BID ${root.priority}.${root.mac.slice(-9)}</text>
        <rect x="-4" y="-4" width="104" height="42" rx="8" fill="none" stroke="${COLORS.amber}" stroke-width="2" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.2s" repeatCount="indefinite"/>
        </rect>
      </g>`;

    // Two leaf switches below
    const lx = [w/2 - 110, w/2 + 14];
    leaves.forEach((leaf, i) => {
      const x = lx[i];
      const y = 98;
      svg += `
        <line x1="${w/2}" y1="66" x2="${x + 48}" y2="${y}" stroke="${COLORS.blue}" stroke-width="2" opacity="0.65"/>
        <text x="${(w/2 + x + 48)/2 + 10}" y="${(66 + y)/2}" fill="${COLORS.blue}" font-size="8" font-family="'JetBrains Mono',monospace" font-weight="700">cost ${leaf.rootCost}</text>
        <rect x="${x}" y="${y}" width="96" height="34" rx="6" fill="#fff" stroke="${COLORS.blue}" stroke-width="1.5"/>
        <text x="${x + 48}" y="${y + 14}" text-anchor="middle" fill="${COLORS.blue}" font-size="11" font-weight="700" font-family="'Space Grotesk',sans-serif">${esc(leaf.id)}</text>
        <text x="${x + 48}" y="${y + 26}" text-anchor="middle" fill="#57534e" font-size="8" font-family="'JetBrains Mono',monospace">BID ${leaf.priority}</text>`;
    });

    // Cross-link between leaves (will be blocked)
    const y1 = 115;
    svg += `
      <line x1="${lx[0] + 96}" y1="${y1}" x2="${lx[1]}" y2="${y1}" stroke="${COLORS.red}" stroke-width="2" stroke-dasharray="4 3" opacity="0.85"/>
      <circle cx="${(lx[0] + 96 + lx[1])/2}" cy="${y1}" r="11" fill="${COLORS.red}">
        <animate attributeName="r" values="10;13;10" dur="1.8s" repeatCount="indefinite"/>
      </circle>
      <text x="${(lx[0] + 96 + lx[1])/2}" y="${y1 + 3}" text-anchor="middle" fill="#fff" font-size="9" font-weight="700" font-family="'Space Grotesk',sans-serif">BLK</text>
      <text x="${(lx[0] + 96 + lx[1])/2}" y="${y1 + 26}" text-anchor="middle" fill="${COLORS.red}" font-size="8" font-family="'JetBrains Mono',monospace" font-weight="700">${esc(blocked.id)} ${esc(blocked.port)}</text>
      <text x="${w/2}" y="${h - 6}" text-anchor="middle" fill="#a8a29e" font-size="8" font-family="'JetBrains Mono',monospace">Lowest BID wins · redundant link → blocked port · break one port, the other unblocks</text>`;

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // 17. nat-table — inside-local / inside-global translation, PAT ports.
  // ────────────────────────────────────────────────────────────────────
  function natTable(p) {
    const rows = p.rows || [
      { il: '10.1.1.5', ig: '203.0.113.2', ilPort: 51200, igPort: 51200, og: '8.8.8.8',   ogPort: 53 },
      { il: '10.1.1.6', ig: '203.0.113.2', ilPort: 49152, igPort: 49152, og: '1.1.1.1',   ogPort: 443 },
      { il: '10.1.1.7', ig: '203.0.113.2', ilPort: 62111, igPort: 62111, og: '140.82.121.3', ogPort: 443 }
    ];
    const w = 360, h = 64 + rows.length * 28 + 30;

    let svg = `
      <text x="16" y="16" fill="#57534e" font-size="10" font-weight="700" font-family="'Space Grotesk',sans-serif">show ip nat translations — PAT overload</text>
      <rect x="12" y="24" width="336" height="20" rx="3" fill="#1c1917"/>
      <text x="24" y="38" fill="#fde68a" font-size="9" font-family="'JetBrains Mono',monospace" font-weight="700">Inside-Local → Inside-Global → Outside-Global</text>`;

    rows.forEach((r, i) => {
      const y = 52 + i * 28;
      svg += `
        <rect x="12" y="${y}" width="336" height="24" rx="3" fill="${i % 2 ? '#faf8f4' : '#fff'}" stroke="#e7e5e4"/>
        <!-- Inside-Local -->
        <rect x="16" y="${y + 4}" width="98" height="16" rx="2" fill="#dbeafe" stroke="${COLORS.blue}" stroke-width="0.8"/>
        <text x="65" y="${y + 16}" text-anchor="middle" fill="${COLORS.blue}" font-size="9" font-family="'JetBrains Mono',monospace" font-weight="700">${esc(r.il)}:${r.ilPort}</text>
        <!-- arrow -->
        <path d="M 118 ${y + 12} L 128 ${y + 12}" stroke="${COLORS.amber}" stroke-width="1.5" marker-end="url(#nat-arr-${i})"/>
        <!-- Inside-Global -->
        <rect x="130" y="${y + 4}" width="98" height="16" rx="2" fill="#fef3c7" stroke="${COLORS.amber}" stroke-width="0.8"/>
        <text x="179" y="${y + 16}" text-anchor="middle" fill="#92400e" font-size="9" font-family="'JetBrains Mono',monospace" font-weight="700">${esc(r.ig)}:${r.igPort}</text>
        <!-- arrow -->
        <path d="M 232 ${y + 12} L 242 ${y + 12}" stroke="${COLORS.green}" stroke-width="1.5" marker-end="url(#nat-arr-${i})"/>
        <!-- Outside-Global -->
        <rect x="244" y="${y + 4}" width="100" height="16" rx="2" fill="#dcfce7" stroke="${COLORS.green}" stroke-width="0.8"/>
        <text x="294" y="${y + 16}" text-anchor="middle" fill="#065f46" font-size="9" font-family="'JetBrains Mono',monospace" font-weight="700">${esc(r.og)}:${r.ogPort}</text>
        <circle r="2" fill="${COLORS.amber}" opacity="0.8">
          <animate attributeName="cx" values="118;128" dur="1s" begin="${i * 0.4}s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="${y + 12};${y + 12}" dur="1s" begin="${i * 0.4}s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;1;0" dur="1s" begin="${i * 0.4}s" repeatCount="indefinite"/>
        </circle>
        <defs><marker id="nat-arr-${i}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="${COLORS.amber}"/>
        </marker></defs>`;
    });

    svg += `<text x="${w/2}" y="${h - 8}" text-anchor="middle" fill="#a8a29e" font-size="8" font-family="'JetBrains Mono',monospace">PAT overload: many inside IPs share one public IP via unique source ports</text>`;

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // 18. cam-table — MAC address table with learning animation.
  // ────────────────────────────────────────────────────────────────────
  function camTable(p) {
    const entries = p.entries || [
      { mac: 'aabb.cc00.0001', vlan: 10, port: 'Gi0/1', type: 'DYNAMIC' },
      { mac: 'aabb.cc00.0002', vlan: 10, port: 'Gi0/2', type: 'DYNAMIC' },
      { mac: 'aabb.cc00.0003', vlan: 20, port: 'Gi0/3', type: 'DYNAMIC' },
      { mac: 'aabb.cc00.00ff', vlan: 10, port: 'Gi0/1', type: 'STATIC'  }
    ];
    const w = 360, h = 50 + entries.length * 24 + 32;

    let svg = `
      <text x="16" y="16" fill="#57534e" font-size="10" font-weight="700" font-family="'Space Grotesk',sans-serif">show mac address-table — learned per-port</text>
      <rect x="12" y="22" width="336" height="22" rx="3" fill="#1c1917"/>
      <text x="22" y="37" fill="#fde68a" font-size="9" font-family="'JetBrains Mono',monospace" font-weight="700">VLAN</text>
      <text x="82" y="37" fill="#fde68a" font-size="9" font-family="'JetBrains Mono',monospace" font-weight="700">MAC Address</text>
      <text x="230" y="37" fill="#fde68a" font-size="9" font-family="'JetBrains Mono',monospace" font-weight="700">Type</text>
      <text x="320" y="37" fill="#fde68a" font-size="9" font-family="'JetBrains Mono',monospace" font-weight="700">Port</text>`;

    entries.forEach((e, i) => {
      const y = 52 + i * 24;
      const typeCol = e.type === 'STATIC' ? COLORS.purple : COLORS.blue;
      svg += `
        <rect x="12" y="${y}" width="336" height="22" rx="3" fill="${i % 2 ? '#faf8f4' : '#fff'}" stroke="#e7e5e4" stroke-width="0.6" opacity="0">
          <animate attributeName="opacity" values="0;1" dur="0.4s" begin="${i * 0.3}s" fill="freeze"/>
        </rect>
        <text x="22" y="${y + 15}" fill="#1c1917" font-size="10" font-family="'JetBrains Mono',monospace" font-weight="600" opacity="0">
          <animate attributeName="opacity" values="0;1" dur="0.4s" begin="${i * 0.3}s" fill="freeze"/>
          ${e.vlan}
        </text>
        <text x="82" y="${y + 15}" fill="#1c1917" font-size="10" font-family="'JetBrains Mono',monospace" font-weight="600" opacity="0">
          <animate attributeName="opacity" values="0;1" dur="0.4s" begin="${i * 0.3}s" fill="freeze"/>
          ${esc(e.mac)}
        </text>
        <rect x="224" y="${y + 5}" width="54" height="14" rx="2" fill="${typeCol}" opacity="0">
          <animate attributeName="opacity" values="0;0.9" dur="0.4s" begin="${i * 0.3}s" fill="freeze"/>
        </rect>
        <text x="251" y="${y + 15}" text-anchor="middle" fill="#fff" font-size="8" font-family="'JetBrains Mono',monospace" font-weight="700" opacity="0">
          <animate attributeName="opacity" values="0;1" dur="0.4s" begin="${i * 0.3}s" fill="freeze"/>
          ${esc(e.type)}
        </text>
        <text x="318" y="${y + 15}" fill="#1c1917" font-size="10" font-family="'JetBrains Mono',monospace" font-weight="600" opacity="0">
          <animate attributeName="opacity" values="0;1" dur="0.4s" begin="${i * 0.3}s" fill="freeze"/>
          ${esc(e.port)}
        </text>`;
    });

    svg += `<text x="${w/2}" y="${h - 8}" text-anchor="middle" fill="#a8a29e" font-size="8" font-family="'JetBrains Mono',monospace">Dynamic entries age out at 300s · static entries persist</text>`;

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // 19. lsa-flood — OSPF LSAs propagating across an area.
  // ────────────────────────────────────────────────────────────────────
  function lsaFlood(p) {
    const nodes = p.nodes || [
      { id: 'R1', x: 0.20, y: 0.5, origin: true },
      { id: 'R2', x: 0.45, y: 0.25 },
      { id: 'R3', x: 0.45, y: 0.75 },
      { id: 'R4', x: 0.75, y: 0.5 }
    ];
    const links = p.links || [ [0,1], [0,2], [1,3], [2,3], [1,2] ];
    const lsaType = p.lsaType || 'LSA-1 Router';
    const w = 360, h = 200;

    const xy = nodes.map(n => ({ x: 30 + n.x * (w - 60), y: 30 + n.y * (h - 80) }));

    let svg = `
      <text x="${w/2}" y="18" text-anchor="middle" fill="#57534e" font-size="11" font-weight="700" font-family="'Space Grotesk',sans-serif">OSPF ${esc(lsaType)} flood — Area 0</text>`;

    links.forEach((l, i) => {
      const a = xy[l[0]], b = xy[l[1]];
      svg += `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${COLORS.blue}" stroke-width="1.5" opacity="0.35"/>`;
    });

    // LSA packets ripple outward from origin
    const origin = xy[nodes.findIndex(n => n.origin)] || xy[0];
    links.forEach((l, i) => {
      const a = xy[l[0]], b = xy[l[1]];
      const delay = (l[0] === 0 || l[1] === 0) ? 0 : 0.8;
      svg += `
        <circle r="4" fill="${COLORS.amber}" opacity="0.85">
          <animate attributeName="cx" values="${a.x};${b.x}" dur="1s" begin="${delay}s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="${a.y};${b.y}" dur="1s" begin="${delay}s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;0.9;0" dur="1s" begin="${delay}s" repeatCount="indefinite"/>
        </circle>`;
    });

    // Breathing origin pulse
    svg += `<circle cx="${origin.x}" cy="${origin.y}" r="18" fill="none" stroke="${COLORS.amber}" stroke-width="2">
      <animate attributeName="r" values="18;36;18" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.7;0;0.7" dur="2s" repeatCount="indefinite"/>
    </circle>`;

    nodes.forEach((n, i) => {
      const pt = xy[i];
      const isOrigin = n.origin;
      svg += `
        <circle cx="${pt.x}" cy="${pt.y}" r="15" fill="${isOrigin ? COLORS.amber : '#fff'}" stroke="${isOrigin ? COLORS.amber : COLORS.blue}" stroke-width="1.8"/>
        <text x="${pt.x}" y="${pt.y + 4}" text-anchor="middle" fill="${isOrigin ? '#fff' : COLORS.blue}" font-size="10" font-weight="700" font-family="'Space Grotesk',sans-serif">${esc(n.id)}</text>`;
    });

    svg += `<text x="${w/2}" y="${h - 8}" text-anchor="middle" fill="#a8a29e" font-size="8" font-family="'JetBrains Mono',monospace">LSAs flooded to all ABRs in area · SPF runs on every router in same area</text>`;

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // 20. qos-queues — LLQ / CBWFQ / WRED drop visualization.
  // ────────────────────────────────────────────────────────────────────
  function qosQueues(p) {
    const queues = p.queues || [
      { name: 'LLQ (voice)',   priority: true,  bw: 30, util: 22, color: COLORS.red },
      { name: 'CBWFQ video',   priority: false, bw: 30, util: 28, color: COLORS.blue },
      { name: 'CBWFQ signal',  priority: false, bw: 10, util: 6,  color: COLORS.purple },
      { name: 'BE default',    priority: false, bw: 30, util: 36, color: COLORS.slate, wred: true }
    ];
    const w = 360, h = 32 + queues.length * 30 + 24;

    let svg = `<text x="16" y="16" fill="#57534e" font-size="10" font-weight="700" font-family="'Space Grotesk',sans-serif">Output queue scheduler — LLQ first, CBWFQ weighted, WRED on BE</text>`;

    queues.forEach((q, i) => {
      const y = 28 + i * 30;
      const barFull = 200;
      const fillW = barFull * Math.min(q.util, q.bw) / q.bw;
      const over = q.util > q.bw;
      svg += `
        <text x="16" y="${y + 12}" fill="${q.color}" font-size="9" font-weight="700" font-family="'Space Grotesk',sans-serif">${esc(q.name)}</text>
        ${q.priority ? `<rect x="110" y="${y + 2}" width="24" height="12" rx="2" fill="${COLORS.red}"/>
          <text x="122" y="${y + 11}" text-anchor="middle" fill="#fff" font-size="8" font-family="'JetBrains Mono',monospace" font-weight="700">PQ</text>` : ''}
        <rect x="140" y="${y}" width="${barFull}" height="16" rx="3" fill="#f3f0eb" stroke="#e7e5e4"/>
        <rect x="140" y="${y}" width="0" height="16" rx="3" fill="${q.color}" opacity="0.9">
          <animate attributeName="width" from="0" to="${fillW}" dur="1s" begin="${i * 0.2}s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1"/>
        </rect>
        <text x="344" y="${y + 12}" text-anchor="end" fill="${q.color}" font-size="9" font-family="'JetBrains Mono',monospace" font-weight="700">${q.util}/${q.bw}%</text>
        ${over || q.wred ? `<circle r="3" fill="${COLORS.red}">
          <animate attributeName="cx" values="340;358" dur="0.8s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="${y + 8};${y + 8}" dur="0.8s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0" dur="0.8s" repeatCount="indefinite"/>
        </circle>
        <text x="110" y="${y + 28}" text-anchor="end" fill="${COLORS.red}" font-size="8" font-family="'JetBrains Mono',monospace" font-weight="700">DROP</text>` : ''}`;
    });

    svg += `<text x="${w/2}" y="${h - 6}" text-anchor="middle" fill="#a8a29e" font-size="8" font-family="'JetBrains Mono',monospace">LLQ is policed hard · WRED drops random high-DSCP last</text>`;

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // 21. trunk-tagging — 802.1Q tag insert/strip across trunk.
  // ────────────────────────────────────────────────────────────────────
  function trunkTagging(p) {
    const leftVlan = p.leftVlan || 10;
    const rightVlan = p.rightVlan || 10;
    const native = p.native || 1;
    const w = 360, h = 160;

    let svg = `
      <text x="${w/2}" y="16" text-anchor="middle" fill="#57534e" font-size="11" font-weight="700" font-family="'Space Grotesk',sans-serif">802.1Q Trunk — VLAN ${leftVlan} ↔ ${rightVlan}</text>

      <!-- SW1 -->
      ${switchGlyph(50, 60, COLORS.blue, 'SW1')}
      <!-- Trunk line -->
      <rect x="86" y="52" width="188" height="16" rx="2" fill="${COLORS.amber}" opacity="0.12" stroke="${COLORS.amber}" stroke-width="1.5" stroke-dasharray="4 3"/>
      <text x="180" y="48" text-anchor="middle" fill="${COLORS.amber}" font-size="9" font-family="'JetBrains Mono',monospace" font-weight="700">TRUNK · native ${native} · allowed 10,20,30</text>
      <!-- SW2 -->
      ${switchGlyph(310, 60, COLORS.blue, 'SW2')}

      <!-- Access port inputs -->
      <text x="14" y="100" fill="#57534e" font-size="9" font-family="'JetBrains Mono',monospace">Access Fa0/1</text>
      <text x="14" y="114" fill="${COLORS.green}" font-size="8" font-family="'JetBrains Mono',monospace">VLAN ${leftVlan}</text>
      <text x="346" y="100" text-anchor="end" fill="#57534e" font-size="9" font-family="'JetBrains Mono',monospace">Access Fa0/1</text>
      <text x="346" y="114" text-anchor="end" fill="${COLORS.green}" font-size="8" font-family="'JetBrains Mono',monospace">VLAN ${rightVlan}</text>

      <!-- Untagged frame entering SW1 -->
      <g>
        <rect x="4" y="126" width="48" height="18" rx="2" fill="${COLORS.green}" opacity="0.95">
          <animate attributeName="x" values="4;86" dur="1.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.16 1 0.3 1"/>
        </rect>
        <text x="28" y="138" text-anchor="middle" fill="#fff" font-size="8" font-family="'JetBrains Mono',monospace" font-weight="700">
          <animate attributeName="x" values="28;110" dur="1.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.16 1 0.3 1"/>
          data
        </text>
      </g>

      <!-- Tagged frame across trunk -->
      <g>
        <rect x="90" y="126" width="70" height="18" rx="2" fill="${COLORS.amber}" opacity="0.95">
          <animate attributeName="x" values="90;200" dur="1.5s" begin="0.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.16 1 0.3 1"/>
        </rect>
        <text x="110" y="138" fill="#fff" font-size="8" font-family="'JetBrains Mono',monospace" font-weight="700">
          <animate attributeName="x" values="110;220" dur="1.5s" begin="0.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.16 1 0.3 1"/>
          [tag:${leftVlan}] data
        </text>
      </g>

      <!-- Untagged out -->
      <g>
        <rect x="210" y="126" width="48" height="18" rx="2" fill="${COLORS.green}" opacity="0.95">
          <animate attributeName="x" values="210;304" dur="1.5s" begin="1s" repeatCount="indefinite" calcMode="spline" keySplines="0.16 1 0.3 1"/>
        </rect>
        <text x="234" y="138" text-anchor="middle" fill="#fff" font-size="8" font-family="'JetBrains Mono',monospace" font-weight="700">
          <animate attributeName="x" values="234;328" dur="1.5s" begin="1s" repeatCount="indefinite" calcMode="spline" keySplines="0.16 1 0.3 1"/>
          data
        </text>
      </g>

      <text x="${w/2}" y="${h - 6}" text-anchor="middle" fill="#a8a29e" font-size="8" font-family="'JetBrains Mono',monospace">Tag added entering trunk (4 bytes: TPID+PCP+CFI+VID) · stripped at egress access port</text>`;

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // 22. rf-heatmap — AP coverage circles with CCI overlap highlighting.
  // ────────────────────────────────────────────────────────────────────
  function rfHeatmap(p) {
    const aps = p.aps || [
      { id: 'AP1', x: 0.25, y: 0.50, channel: 1,  color: COLORS.blue },
      { id: 'AP2', x: 0.55, y: 0.35, channel: 6,  color: COLORS.green },
      { id: 'AP3', x: 0.80, y: 0.60, channel: 11, color: COLORS.purple }
    ];
    const w = 360, h = 200;

    let svg = `<text x="${w/2}" y="14" text-anchor="middle" fill="#57534e" font-size="11" font-weight="700" font-family="'Space Grotesk',sans-serif">2.4 GHz coverage · non-overlapping 1/6/11</text>`;

    aps.forEach((ap, i) => {
      const cx = 30 + ap.x * (w - 60);
      const cy = 24 + ap.y * (h - 60);
      svg += `
        <circle cx="${cx}" cy="${cy}" r="54" fill="${ap.color}" opacity="0.08"/>
        <circle cx="${cx}" cy="${cy}" r="54" fill="none" stroke="${ap.color}" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.5">
          <animate attributeName="r" values="48;58;48" dur="${3 + i * 0.3}s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="${3 + i * 0.3}s" repeatCount="indefinite"/>
        </circle>
        <circle cx="${cx}" cy="${cy}" r="8" fill="${ap.color}"/>
        <text x="${cx}" y="${cy + 3}" text-anchor="middle" fill="#fff" font-size="9" font-weight="700" font-family="'JetBrains Mono',monospace">${ap.channel}</text>
        <text x="${cx}" y="${cy + 22}" text-anchor="middle" fill="${ap.color}" font-size="9" font-family="'Space Grotesk',sans-serif" font-weight="700">${esc(ap.id)}</text>`;
    });

    svg += `<text x="${w/2}" y="${h - 8}" text-anchor="middle" fill="#a8a29e" font-size="8" font-family="'JetBrains Mono',monospace">Adjacent APs must use non-overlapping channels · 5 GHz has 24+ choices</text>`;

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // 23. subnet-divide — /24 splitting into child /26s etc.
  // ────────────────────────────────────────────────────────────────────
  function subnetDivide(p) {
    const parent = p.parent || '192.168.1.0/24';
    const children = p.children || [
      { cidr: '192.168.1.0/26',   usable: 62 },
      { cidr: '192.168.1.64/26',  usable: 62 },
      { cidr: '192.168.1.128/26', usable: 62 },
      { cidr: '192.168.1.192/26', usable: 62 }
    ];
    const w = 360, h = 140;
    const rowW = (w - 40) / children.length;

    let svg = `
      <text x="${w/2}" y="16" text-anchor="middle" fill="#57534e" font-size="11" font-weight="700" font-family="'Space Grotesk',sans-serif">VLSM — ${esc(parent)} divided into ${children.length} subnets</text>
      <!-- parent -->
      <rect x="20" y="28" width="${w - 40}" height="24" rx="4" fill="${COLORS.blue}"/>
      <text x="${w/2}" y="43" text-anchor="middle" fill="#fff" font-size="11" font-weight="700" font-family="'JetBrains Mono',monospace">${esc(parent)}</text>`;

    children.forEach((c, i) => {
      const x = 20 + i * rowW;
      const y = 72;
      // Downward connector line
      svg += `<line x1="${x + rowW/2}" y1="52" x2="${x + rowW/2}" y2="${y}" stroke="${COLORS.blue}" stroke-width="1.5" opacity="0.4"/>
        <rect x="${x + 4}" y="${y}" width="${rowW - 8}" height="24" rx="4" fill="#fff" stroke="${COLORS.amber}" stroke-width="1.5"/>
        <text x="${x + rowW/2}" y="${y + 10}" text-anchor="middle" fill="${COLORS.amber}" font-size="9" font-weight="700" font-family="'JetBrains Mono',monospace">${esc(c.cidr)}</text>
        <text x="${x + rowW/2}" y="${y + 20}" text-anchor="middle" fill="#78716c" font-size="8" font-family="'JetBrains Mono',monospace">${c.usable} hosts</text>
        <circle r="2.5" fill="${COLORS.blue}" opacity="0">
          <animate attributeName="cx" values="${x + rowW/2};${x + rowW/2}" dur="1s" begin="${i * 0.2}s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="52;${y}" dur="1s" begin="${i * 0.2}s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;0.9;0" dur="1s" begin="${i * 0.2}s" repeatCount="indefinite"/>
        </circle>`;
    });

    svg += `<text x="${w/2}" y="${h - 8}" text-anchor="middle" fill="#a8a29e" font-size="8" font-family="'JetBrains Mono',monospace">Each /26 doubles the subnet count, halves the hosts · magic number 64</text>`;

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // 24. dhcp-dora — full DORA lifecycle w/ broadcast MAC + lease IP.
  // ────────────────────────────────────────────────────────────────────
  function dhcpDora(p) {
    const offered = p.offered || '192.168.1.107';
    const serverIp = p.serverIp || '192.168.1.1';
    const lease = p.lease || '24h';
    const w = 360, h = 220;

    let svg = `
      <text x="${w/2}" y="16" text-anchor="middle" fill="#57534e" font-size="11" font-weight="700" font-family="'Space Grotesk',sans-serif">DHCP DORA — ${esc(offered)} offered by ${esc(serverIp)}</text>

      ${hostGlyph(50, 50, COLORS.blue, 'Client')}
      <text x="50" y="82" text-anchor="middle" fill="#a8a29e" font-size="8" font-family="'JetBrains Mono',monospace">src 0.0.0.0</text>

      <rect x="280" y="38" width="60" height="40" rx="5" fill="${COLORS.green}" opacity="0.12" stroke="${COLORS.green}" stroke-width="1.5"/>
      <rect x="288" y="42" width="44" height="6" rx="1" fill="${COLORS.green}" opacity="0.7"/>
      <rect x="288" y="50" width="44" height="6" rx="1" fill="${COLORS.green}" opacity="0.55"/>
      <rect x="288" y="58" width="44" height="6" rx="1" fill="${COLORS.green}" opacity="0.4"/>
      <text x="310" y="92" text-anchor="middle" fill="${COLORS.green}" font-size="9" font-family="'Space Grotesk',sans-serif" font-weight="700">DHCP Server</text>
      <text x="310" y="102" text-anchor="middle" fill="#a8a29e" font-size="8" font-family="'JetBrains Mono',monospace">${esc(serverIp)}</text>

      <line x1="72" y1="50" x2="278" y2="50" stroke="#d4d0c8" stroke-width="1.2" stroke-dasharray="3 3"/>`;

    const steps = [
      { label: 'DISCOVER',  dir: 'r', color: COLORS.amber, y: 120, bcast: true,  detail: 'broadcast ff:ff:ff:ff:ff:ff · src 0.0.0.0' },
      { label: 'OFFER',     dir: 'l', color: COLORS.blue,  y: 144, bcast: true,  detail: 'offers ' + offered },
      { label: 'REQUEST',   dir: 'r', color: COLORS.amber, y: 168, bcast: true,  detail: 'confirms choice' },
      { label: 'ACK',       dir: 'l', color: COLORS.green, y: 192, bcast: false, detail: 'lease ' + lease }
    ];

    steps.forEach((s, i) => {
      const isR = s.dir === 'r';
      const x1 = isR ? 80 : 280;
      const x2 = isR ? 280 : 80;
      const t = i * 1.1;
      svg += `
        <rect y="${s.y - 9}" width="52" height="16" rx="3" fill="${s.color}" opacity="0">
          <animate attributeName="x" values="${x1 - 26};${x2 - 26}" dur="0.8s" begin="${t}s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1"/>
          <animate attributeName="opacity" values="0;0.95" dur="0.3s" begin="${t}s" fill="freeze"/>
        </rect>
        <text y="${s.y + 2}" text-anchor="middle" fill="#fff" font-size="9" font-family="'JetBrains Mono',monospace" font-weight="700" opacity="0">
          <animate attributeName="x" values="${x1};${x2}" dur="0.8s" begin="${t}s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1"/>
          <animate attributeName="opacity" values="0;1" dur="0.3s" begin="${t}s" fill="freeze"/>
          ${s.label}
        </text>
        <text x="180" y="${s.y - 12}" text-anchor="middle" fill="${s.color}" font-size="8" font-family="'JetBrains Mono',monospace" opacity="0">
          <animate attributeName="opacity" values="0;0.9" dur="0.3s" begin="${t + 0.4}s" fill="freeze"/>
          ${esc(s.detail)}
        </text>`;
    });

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // 25. tcp-window — sliding window, SEQ/ACK, retransmit on loss.
  // ────────────────────────────────────────────────────────────────────
  function tcpWindow(p) {
    const window = p.window || 4;
    const sent = p.sent || [1, 2, 3, 4, 5, 6, 7, 8];
    const acked = p.acked || 3;
    const lost = p.lost || 5;
    const w = 360, h = 150;

    const cellW = 32;
    const startX = (w - cellW * sent.length) / 2;

    let svg = `
      <text x="${w/2}" y="16" text-anchor="middle" fill="#57534e" font-size="11" font-weight="700" font-family="'Space Grotesk',sans-serif">TCP sliding window · window=${window}</text>
      <text x="${w/2}" y="32" text-anchor="middle" fill="#a8a29e" font-size="9" font-family="'JetBrains Mono',monospace">last ACK ${acked + 1} · segment ${lost} lost → fast retransmit on 3 dupACKs</text>`;

    sent.forEach((seq, i) => {
      const x = startX + i * cellW;
      const isAcked = seq <= acked;
      const isLost = seq === lost;
      const inWindow = !isAcked && seq <= acked + window;
      const fill = isAcked ? COLORS.green : (isLost ? COLORS.red : (inWindow ? COLORS.amber : '#f3f0eb'));
      const stroke = isAcked ? COLORS.green : (isLost ? COLORS.red : (inWindow ? COLORS.amber : '#d4d0c8'));
      svg += `
        <rect x="${x + 2}" y="48" width="${cellW - 4}" height="28" rx="3" fill="${fill}" stroke="${stroke}" stroke-width="1.3"/>
        <text x="${x + cellW/2}" y="66" text-anchor="middle" fill="${isAcked || inWindow || isLost ? '#fff' : '#a8a29e'}" font-size="10" font-family="'JetBrains Mono',monospace" font-weight="700">${seq}</text>`;
      if (isLost) {
        svg += `<line x1="${x + 4}" y1="48" x2="${x + cellW - 4}" y2="76" stroke="#fff" stroke-width="2" opacity="0.9"/>
          <line x1="${x + cellW - 4}" y1="48" x2="${x + 4}" y2="76" stroke="#fff" stroke-width="2" opacity="0.9"/>`;
      }
    });

    // Window bracket
    const winStart = startX + (acked) * cellW;
    const winEnd = startX + (acked + window) * cellW;
    svg += `
      <line x1="${winStart}" y1="80" x2="${winEnd}" y2="80" stroke="${COLORS.amber}" stroke-width="2">
        <animate attributeName="x1" values="${winStart};${winStart + cellW}" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="x2" values="${winEnd};${winEnd + cellW}" dur="2s" repeatCount="indefinite"/>
      </line>
      <text x="${(winStart + winEnd)/2}" y="94" text-anchor="middle" fill="${COLORS.amber}" font-size="9" font-family="'Space Grotesk',sans-serif" font-weight="700">WINDOW slides right on each ACK</text>

      <text x="${startX}" y="110" fill="${COLORS.green}" font-size="9" font-family="'JetBrains Mono',monospace" font-weight="700">✓ ACKed</text>
      <text x="${startX + 80}" y="110" fill="${COLORS.amber}" font-size="9" font-family="'JetBrains Mono',monospace" font-weight="700">⋯ In flight</text>
      <text x="${startX + 180}" y="110" fill="${COLORS.red}" font-size="9" font-family="'JetBrains Mono',monospace" font-weight="700">✗ Lost</text>
      <text x="${startX + 260}" y="110" fill="#a8a29e" font-size="9" font-family="'JetBrains Mono',monospace">◦ Not sent</text>

      <text x="${w/2}" y="${h - 8}" text-anchor="middle" fill="#a8a29e" font-size="8" font-family="'JetBrains Mono',monospace">Cumulative ACK N = "got everything up to N-1" · selective ACK (SACK) ACKs ranges</text>`;

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // 26. etherchannel — 4 physical links bundling into 1 logical Po1.
  // ────────────────────────────────────────────────────────────────────
  function etherchannel(p) {
    const links = p.links || 4;
    const protocol = p.protocol || 'LACP';
    const w = 360, h = 170;

    let svg = `
      <text x="${w/2}" y="16" text-anchor="middle" fill="#57534e" font-size="11" font-weight="700" font-family="'Space Grotesk',sans-serif">EtherChannel · ${esc(protocol)} · Po1 = ${links}×1G</text>
      ${switchGlyph(50, 80, COLORS.blue, 'SW1')}
      ${switchGlyph(310, 80, COLORS.blue, 'SW2')}`;

    for (let i = 0; i < links; i++) {
      const y = 60 + i * 10;
      const colorI = [COLORS.green, COLORS.blue, COLORS.purple, COLORS.amber][i % 4];
      svg += `
        <line x1="72" y1="${y}" x2="288" y2="${y}" stroke="${colorI}" stroke-width="2" opacity="0.5"/>
        <circle r="3" fill="${colorI}">
          <animate attributeName="cx" values="72;288" dur="${1 + i * 0.1}s" repeatCount="indefinite" calcMode="spline" keySplines="0.16 1 0.3 1"/>
          <animate attributeName="cy" values="${y};${y}" dur="${1 + i * 0.1}s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0" dur="${1 + i * 0.1}s" repeatCount="indefinite"/>
        </circle>
        <text x="82" y="${y - 3}" fill="${colorI}" font-size="7" font-family="'JetBrains Mono',monospace" font-weight="700">Gi0/${i + 1}</text>`;
    }

    // Logical wrapper showing bundle
    svg += `
      <rect x="76" y="${60 - 6}" width="208" height="${links * 10 + 6}" rx="10" fill="none" stroke="${COLORS.amber}" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.55">
        <animate attributeName="opacity" values="0.35;0.85;0.35" dur="2.2s" repeatCount="indefinite"/>
      </rect>
      <text x="180" y="130" text-anchor="middle" fill="${COLORS.amber}" font-size="10" font-family="'Space Grotesk',sans-serif" font-weight="700">logical Port-channel 1 (${links} Gbps)</text>

      <text x="${w/2}" y="${h - 6}" text-anchor="middle" fill="#a8a29e" font-size="8" font-family="'JetBrains Mono',monospace">Hash(src/dst IP/MAC/port) picks which physical link · failover when link drops</text>`;

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // 27. ospf-neighbor — 7-state neighbor FSM with Hello/DBD/LSR boxes.
  // ────────────────────────────────────────────────────────────────────
  function ospfNeighbor(p) {
    const current = p.current != null ? p.current : 6;
    const states = [
      { name: 'Down',     detail: 'no hellos received' },
      { name: 'Attempt',  detail: 'NBMA: unicast hello sent' },
      { name: 'Init',     detail: 'hello received (one-way)' },
      { name: '2-Way',    detail: 'own RID in neighbor hello' },
      { name: 'ExStart',  detail: 'master/slave negotiation' },
      { name: 'Exchange', detail: 'DBD exchange' },
      { name: 'Loading',  detail: 'LSR / LSU / LSAck' },
      { name: 'Full',     detail: 'LSDB synced' }
    ];
    const n = states.length;
    const w = 360, h = 170;

    const boxW = (w - 30) / n;
    let svg = `
      <text x="${w/2}" y="16" text-anchor="middle" fill="#57534e" font-size="11" font-weight="700" font-family="'Space Grotesk',sans-serif">OSPF neighbor FSM — current: ${esc(states[current].name)}</text>`;

    states.forEach((s, i) => {
      const x = 15 + i * boxW;
      const isActive = i === current;
      const isPast = i < current;
      const fill = isActive ? COLORS.amber : (isPast ? COLORS.green : '#f3f0eb');
      const txt = isActive || isPast ? '#fff' : '#78716c';
      svg += `
        <rect x="${x}" y="42" width="${boxW - 4}" height="28" rx="4" fill="${fill}" stroke="${isActive ? COLORS.amber : (isPast ? COLORS.green : '#d4d0c8')}" stroke-width="${isActive ? 1.8 : 1}">
          ${isActive ? `<animate attributeName="stroke-width" values="1.4;2.4;1.4" dur="1.8s" repeatCount="indefinite"/>` : ''}
        </rect>
        <text x="${x + boxW/2 - 2}" y="60" text-anchor="middle" fill="${txt}" font-size="9" font-weight="700" font-family="'Space Grotesk',sans-serif">${esc(s.name)}</text>`;

      if (i < n - 1) {
        const arrX1 = x + boxW - 4;
        const arrX2 = x + boxW + 2;
        svg += `<path d="M ${arrX1} 56 L ${arrX2} 56" stroke="${isPast ? COLORS.green : '#d4d0c8'}" stroke-width="1.2" marker-end="url(#ospf-arr)"/>`;
      }
    });

    svg += `
      <text x="${w/2}" y="95" text-anchor="middle" fill="${COLORS.amber}" font-size="10" font-family="'JetBrains Mono',monospace" font-weight="700">⟶ ${esc(states[current].detail)}</text>
      <text x="${w/2}" y="114" text-anchor="middle" fill="#78716c" font-size="9" font-family="'Space Grotesk',sans-serif">Hello packets drive Down→Init→2-Way; DBD drives Exchange; LSR drives Loading</text>

      <text x="${w/2}" y="140" text-anchor="middle" fill="#a8a29e" font-size="8" font-family="'JetBrains Mono',monospace">Hello timer 10s · Dead timer 40s (broadcast) · mismatches → never reach 2-Way</text>
      <defs><marker id="ospf-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
        <path d="M 0 1 L 8 5 L 0 9 z" fill="#78716c"/>
      </marker></defs>`;

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // 28. spine-leaf — 3D-feeling fabric with east-west predictable 2-hop.
  // ────────────────────────────────────────────────────────────────────
  function spineLeaf(p) {
    const spines = p.spines || 3;
    const leaves = p.leaves || 4;
    const w = 360, h = 200;
    const spineY = 50;
    const leafY = 140;

    let svg = `<text x="${w/2}" y="16" text-anchor="middle" fill="#57534e" font-size="11" font-weight="700" font-family="'Space Grotesk',sans-serif">Spine-Leaf fabric · every leaf ↔ every spine · ECMP, 2-hop predictable</text>`;

    const spineX = (i) => 60 + i * ((w - 120) / (spines - 1));
    const leafX  = (i) => 40 + i * ((w - 80) / (leaves - 1));

    // Full mesh connections
    for (let i = 0; i < spines; i++) {
      for (let j = 0; j < leaves; j++) {
        svg += `<line x1="${spineX(i)}" y1="${spineY}" x2="${leafX(j)}" y2="${leafY}" stroke="${COLORS.slate}" stroke-width="0.8" opacity="0.35"/>`;
      }
    }

    // Flowing traffic leaf-to-spine-to-leaf (east-west)
    const fromLeaf = 0, toLeaf = leaves - 1, viaSpine = Math.floor(spines / 2);
    svg += `
      <circle r="4" fill="${COLORS.amber}">
        <animate attributeName="cx" values="${leafX(fromLeaf)};${spineX(viaSpine)};${leafX(toLeaf)}" dur="2s" repeatCount="indefinite" calcMode="linear"/>
        <animate attributeName="cy" values="${leafY};${spineY};${leafY}" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;1;1;0" dur="2s" repeatCount="indefinite" keyTimes="0;0.48;0.98;1"/>
      </circle>`;

    // Spines
    for (let i = 0; i < spines; i++) {
      svg += `
        <rect x="${spineX(i) - 30}" y="${spineY - 16}" width="60" height="28" rx="5" fill="${COLORS.purple}"/>
        <text x="${spineX(i)}" y="${spineY + 2}" text-anchor="middle" fill="#fff" font-size="10" font-weight="700" font-family="'Space Grotesk',sans-serif">SPINE ${i + 1}</text>`;
    }
    // Leaves
    for (let j = 0; j < leaves; j++) {
      svg += `
        <rect x="${leafX(j) - 28}" y="${leafY - 12}" width="56" height="24" rx="4" fill="${COLORS.blue}"/>
        <text x="${leafX(j)}" y="${leafY + 4}" text-anchor="middle" fill="#fff" font-size="9" font-weight="700" font-family="'Space Grotesk',sans-serif">LEAF ${j + 1}</text>`;
    }

    svg += `<text x="${w/2}" y="${h - 6}" text-anchor="middle" fill="#a8a29e" font-size="8" font-family="'JetBrains Mono',monospace">Leaves never connect to leaves · spines never to spines · VXLAN overlay on top</text>`;

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ────────────────────────────────────────────────────────────────────
  // Renderer dispatch
  // ────────────────────────────────────────────────────────────────────

  const renderers = {
    'packet-flow':       packetFlow,
    'layer-stack':       layerStack,
    'comparison':        comparison,
    'handshake':         handshake,
    'hierarchy':         hierarchy,
    'encapsulation':     encapsulation,
    'state-machine':     stateMachine,
    'binary-breakdown':  binaryBreakdown,
    'shield':            shield,
    'gauge':             gauge,
    'protocol-timeline': protocolTimeline,
    'subnet-ruler':      subnetRuler,
    'topology-live':     topologyLive,
    'routing-table':     routingTable,
    'acl-ladder':        aclLadder,
    'stp-tree':          stpTree,
    'nat-table':         natTable,
    'cam-table':         camTable,
    'lsa-flood':         lsaFlood,
    'qos-queues':        qosQueues,
    'trunk-tagging':     trunkTagging,
    'rf-heatmap':        rfHeatmap,
    'subnet-divide':     subnetDivide,
    'dhcp-dora':         dhcpDora,
    'tcp-window':        tcpWindow,
    'etherchannel':      etherchannel,
    'ospf-neighbor':     ospfNeighbor,
    'spine-leaf':        spineLeaf
  };

  // ────────────────────────────────────────────────────────────────────
  // Accessibility + performance layer
  // ────────────────────────────────────────────────────────────────────
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Strip SMIL animations for reduced-motion users. Keeps the final visual
  // state (dots where they end up, bars filled, etc.) by collapsing <animate>
  // into their `to` / last `values` value via a regex pass.
  function staticize(svg) {
    return svg
      // <animate ...attributeName="X" ... values="a;b;c"/> → keep last value as attribute
      .replace(/<animate\b[^>]*attributeName="([^"]+)"[^>]*(?:values="([^"]+)"|to="([^"]+)")[^>]*\/?>/g,
        (_m, attr, values, to) => {
          const final = to || (values ? values.split(';').pop() : null);
          return final ? `<!-- reduced-motion: ${attr}=${final} -->` : '';
        })
      // Any remaining <animate> tags just get dropped
      .replace(/<animate\b[^>]*\/?>/g, '')
      .replace(/<animate\b[^>]*>[^<]*<\/animate>/g, '');
  }

  // Auto-wire IntersectionObserver entrance animation + focus support.
  // Idempotent: calling init() multiple times is safe.
  let _ioStarted = false;
  function initEntranceObserver() {
    if (_ioStarted || typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    _ioStarted = true;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          // Trigger entrance: enter → visible on next frame
          e.target.classList.add('sv-entering');
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              e.target.classList.remove('sv-entering');
              e.target.classList.add('sv-visible');
            });
          });
          io.unobserve(e.target);
        }
      }
    }, { rootMargin: '80px 0px', threshold: 0.12 });
    document.querySelectorAll('.sv-wrap:not(.sv-visible)').forEach(el => io.observe(el));
    const mo = new MutationObserver((muts) => {
      for (const m of muts) {
        m.addedNodes.forEach(node => {
          if (node.nodeType !== 1) return;
          if (node.classList && node.classList.contains('sv-wrap')) io.observe(node);
          node.querySelectorAll && node.querySelectorAll('.sv-wrap:not(.sv-visible)').forEach(el => io.observe(el));
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  // Inject global style for entrance + hover + reduced-motion. One-time.
  let _styleInjected = false;
  function injectStyle() {
    if (_styleInjected || typeof document === 'undefined') return;
    _styleInjected = true;
    const s = document.createElement('style');
    s.setAttribute('data-sv', 'subtopic-visuals');
    s.textContent = `
      .sv-wrap {
        opacity: 1;
        transform: translateY(0) scale(1);
        transition: opacity 520ms cubic-bezier(.16, 1, .3, 1),
                    transform 520ms cubic-bezier(.16, 1, .3, 1),
                    box-shadow 220ms cubic-bezier(.16, 1, .3, 1);
        will-change: opacity, transform;
      }
      .sv-wrap.sv-entering {
        opacity: 0;
        transform: translateY(8px) scale(0.99);
      }
      .sv-wrap.sv-visible {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      .sv-wrap:hover {
        box-shadow: 0 6px 24px rgba(180, 83, 9, 0.08);
      }
      .sv-wrap:focus-within {
        outline: 2px solid var(--accent, #B45309);
        outline-offset: 2px;
      }
      .sv-anim text { font-feature-settings: 'tnum' 1, 'cv11' 1; }
      .sv-anim rect, .sv-anim circle, .sv-anim path, .sv-anim line {
        transition: stroke-width 200ms cubic-bezier(.16, 1, .3, 1);
      }
      .sv-wrap:hover .sv-anim rect[stroke],
      .sv-wrap:hover .sv-anim circle[stroke],
      .sv-wrap:hover .sv-anim path[stroke],
      .sv-wrap:hover .sv-anim line[stroke] {
        stroke-width: 2;
      }
      @media (prefers-reduced-motion: reduce) {
        .sv-wrap {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
        }
        .sv-anim * { animation: none !important; }
      }
    `;
    document.head.appendChild(s);
  }

  // Kick off the DOM hooks as soon as the document is ready (non-blocking).
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => { injectStyle(); initEntranceObserver(); });
    } else {
      injectStyle(); initEntranceObserver();
    }
  }

  function render(visual) {
    if (!visual || !visual.type || !renderers[visual.type]) {
      return '<div class="sv-missing">Visual not available</div>';
    }
    let svg = renderers[visual.type](visual.params || {});
    if (reducedMotion) svg = staticize(svg);
    return `<div class="sv-wrap" tabindex="0" role="img" aria-label="${esc(visual.type)} diagram">${svg}</div>`;
  }

  return { render, renderers, initEntranceObserver, injectStyle };
})();
