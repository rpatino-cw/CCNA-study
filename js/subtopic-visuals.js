/**
 * subtopic-visuals.js — SVG animation component library for CCNA subtopics
 * 10 reusable visual types, all pure SVG + CSS animations, no dependencies.
 */
window.SubtopicVisuals = (() => {

  let _uid = 0;
  const uid = () => `sv-${++_uid}`;

  // ── Shared helpers ──────────────────────────────────────────────────

  const COLORS = {
    blue:   '#3b82f6',
    green:  '#10b981',
    amber:  '#f59e0b',
    red:    '#ef4444',
    purple: '#8b5cf6',
    teal:   '#14b8a6',
    slate:  '#64748b',
    accent: '#B45309'
  };

  function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  // ── 1. packet-flow — dots moving through nodes ──────────────────────
  function packetFlow(p) {
    const id = uid();
    const nodes = p.nodes || ['A', 'B', 'C'];
    const color = p.color || COLORS.blue;
    const n = nodes.length;
    const w = 320, h = 80;
    const gap = (w - 60) / (n - 1);

    let nodesSvg = '', linesSvg = '';
    nodes.forEach((label, i) => {
      const x = 30 + i * gap;
      if (i < n - 1) {
        linesSvg += `<line x1="${x + 18}" y1="40" x2="${x + gap - 18}" y2="40" stroke="${color}" stroke-width="2" stroke-dasharray="4 3" opacity="0.35"/>`;
      }
      nodesSvg += `
        <rect x="${x - 22}" y="22" width="44" height="36" rx="6" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.6"/>
        <text x="${x}" y="44" text-anchor="middle" fill="${color}" font-size="10" font-family="'Space Grotesk',sans-serif" font-weight="600">${esc(label.substring(0, 6))}</text>`;
    });

    // Animated dot
    const pathPts = nodes.map((_, i) => (30 + i * gap)).join(';');
    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">
      ${linesSvg}${nodesSvg}
      <circle r="5" fill="${color}" opacity="0.9">
        <animate attributeName="cx" values="${pathPts}" dur="${n * 0.8}s" repeatCount="indefinite" calcMode="spline" keySplines="${nodes.slice(1).map(() => '0.4 0 0.2 1').join(';')}"/>
        <animate attributeName="cy" values="${nodes.map(() => '40').join(';')}" dur="${n * 0.8}s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.9;1;0.9" dur="1s" repeatCount="indefinite"/>
      </circle>
      <circle r="5" fill="${color}" opacity="0.3" filter="url(#${id}-glow)">
        <animate attributeName="cx" values="${pathPts}" dur="${n * 0.8}s" repeatCount="indefinite" calcMode="spline" keySplines="${nodes.slice(1).map(() => '0.4 0 0.2 1').join(';')}"/>
        <animate attributeName="cy" values="${nodes.map(() => '40').join(';')}" dur="${n * 0.8}s" repeatCount="indefinite"/>
      </circle>
      <defs><filter id="${id}-glow"><feGaussianBlur stdDeviation="4"/></filter></defs>
    </svg>`;
  }

  // ── 2. layer-stack — OSI/protocol layers with highlight ─────────────
  function layerStack(p) {
    const layers = p.layers || ['Application', 'Transport', 'Network', 'Data Link', 'Physical'];
    const hl = p.highlight != null ? p.highlight : 2;
    const color = p.color || COLORS.blue;
    const h = layers.length * 30 + 16;
    const id = uid();

    let svg = '';
    layers.forEach((label, i) => {
      const y = 8 + i * 30;
      const isActive = i === hl;
      svg += `
        <rect x="20" y="${y}" width="280" height="26" rx="4"
          fill="${isActive ? color : '#f3f0eb'}"
          stroke="${isActive ? color : '#e2dfd9'}" stroke-width="1"
          opacity="${isActive ? 1 : 0.7}">
          ${isActive ? `<animate attributeName="opacity" values="0.85;1;0.85" dur="2s" repeatCount="indefinite"/>` : ''}
        </rect>
        <text x="160" y="${y + 17}" text-anchor="middle"
          fill="${isActive ? '#fff' : '#57534e'}"
          font-size="11" font-family="'Space Grotesk',sans-serif" font-weight="${isActive ? 700 : 500}">${esc(label)}</text>`;
      if (isActive) {
        svg += `<rect x="16" y="${y - 2}" width="288" height="30" rx="6" fill="none" stroke="${color}" stroke-width="2" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite"/>
        </rect>`;
      }
    });

    return `<svg viewBox="0 0 320 ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ── 3. comparison — side-by-side columns ────────────────────────────
  function comparison(p) {
    const left = p.left || { label: 'A', items: [] };
    const right = p.right || { label: 'B', items: [] };
    const maxItems = Math.max(left.items.length, right.items.length, 1);
    const h = 44 + maxItems * 22 + 12;
    const id = uid();

    let svg = `
      <rect x="6" y="4" width="148" height="${h - 8}" rx="6" fill="#eff6ff" stroke="#3b82f6" stroke-width="1" opacity="0.5"/>
      <rect x="166" y="4" width="148" height="${h - 8}" rx="6" fill="#f0fdf4" stroke="#10b981" stroke-width="1" opacity="0.5"/>
      <text x="80" y="26" text-anchor="middle" fill="#3b82f6" font-size="11" font-weight="700" font-family="'Space Grotesk',sans-serif">${esc(left.label)}</text>
      <text x="240" y="26" text-anchor="middle" fill="#10b981" font-size="11" font-weight="700" font-family="'Space Grotesk',sans-serif">${esc(right.label)}</text>
      <line x1="14" y1="34" x2="146" y2="34" stroke="#3b82f6" stroke-width="0.5" opacity="0.4"/>
      <line x1="174" y1="34" x2="306" y2="34" stroke="#10b981" stroke-width="0.5" opacity="0.4"/>`;

    left.items.forEach((item, i) => {
      svg += `<text x="80" y="${52 + i * 22}" text-anchor="middle" fill="#57534e" font-size="9.5" font-family="'Space Grotesk',sans-serif">${esc(item)}</text>`;
    });
    right.items.forEach((item, i) => {
      svg += `<text x="240" y="${52 + i * 22}" text-anchor="middle" fill="#57534e" font-size="9.5" font-family="'Space Grotesk',sans-serif">${esc(item)}</text>`;
    });

    // Subtle pulse on the divider
    svg += `<line x1="160" y1="8" x2="160" y2="${h - 8}" stroke="#d4d0c8" stroke-width="1" stroke-dasharray="3 3">
      <animate attributeName="stroke-dashoffset" from="0" to="6" dur="1.5s" repeatCount="indefinite"/>
    </line>`;

    return `<svg viewBox="0 0 320 ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ── 4. handshake — arrows between two endpoints ─────────────────────
  function handshake(p) {
    const leftLabel = p.leftLabel || 'Client';
    const rightLabel = p.rightLabel || 'Server';
    const steps = p.steps || ['SYN →', '← SYN-ACK', 'ACK →'];
    const h = 50 + steps.length * 36;
    const id = uid();

    let svg = `
      <line x1="60" y1="30" x2="60" y2="${h - 10}" stroke="#d4d0c8" stroke-width="1.5"/>
      <line x1="260" y1="30" x2="260" y2="${h - 10}" stroke="#d4d0c8" stroke-width="1.5"/>
      <rect x="26" y="8" width="68" height="22" rx="4" fill="#3b82f6"/>
      <text x="60" y="23" text-anchor="middle" fill="#fff" font-size="10" font-weight="600" font-family="'Space Grotesk',sans-serif">${esc(leftLabel)}</text>
      <rect x="226" y="8" width="68" height="22" rx="4" fill="#10b981"/>
      <text x="260" y="23" text-anchor="middle" fill="#fff" font-size="10" font-weight="600" font-family="'Space Grotesk',sans-serif">${esc(rightLabel)}</text>`;

    steps.forEach((step, i) => {
      const y = 50 + i * 36;
      const isRight = step.startsWith('←') || step.includes('←');
      const x1 = isRight ? 254 : 66;
      const x2 = isRight ? 66 : 254;
      const color = isRight ? '#10b981' : '#3b82f6';
      const delay = i * 0.6;

      svg += `
        <g opacity="0">
          <animate attributeName="opacity" values="0;1" dur="0.4s" begin="${delay}s" fill="freeze" repeatCount="1"/>
          <animate attributeName="opacity" values="0;1;1;1;0" dur="${steps.length * 0.6 + 1}s" begin="0s" repeatCount="indefinite" keyTimes="0;${delay / (steps.length * 0.6 + 1)};${(delay + 0.4) / (steps.length * 0.6 + 1)};${(steps.length * 0.6) / (steps.length * 0.6 + 1)};1"/>
          <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${color}" stroke-width="1.5" marker-end="url(#${id}-arrow-${isRight ? 'l' : 'r'})"/>
          <text x="160" y="${y - 6}" text-anchor="middle" fill="#57534e" font-size="9" font-family="'JetBrains Mono',monospace" font-weight="500">${esc(step.replace(/[←→]/g, '').trim())}</text>
        </g>`;
    });

    svg += `<defs>
      <marker id="${id}-arrow-r" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6"/>
      </marker>
      <marker id="${id}-arrow-l" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981"/>
      </marker>
    </defs>`;

    return `<svg viewBox="0 0 320 ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ── 5. hierarchy — tree diagram ─────────────────────────────────────
  function hierarchy(p) {
    const root = p.root || 'Root';
    const children = p.children || [];
    const color = p.color || COLORS.blue;

    // Calculate layout — simple 2-level tree
    const leafCount = children.reduce((sum, c) => sum + Math.max((c.children || []).length, 1), 0);
    const w = Math.max(320, leafCount * 72 + 40);
    const h = children.some(c => c.children && c.children.length) ? 130 : 90;

    let svg = '';
    // Root
    svg += `<rect x="${w/2 - 40}" y="8" width="80" height="24" rx="4" fill="${color}"/>
      <text x="${w/2}" y="24" text-anchor="middle" fill="#fff" font-size="10" font-weight="600" font-family="'Space Grotesk',sans-serif">${esc(root)}</text>`;

    // Level 1
    const l1Gap = (w - 40) / (children.length);
    children.forEach((child, i) => {
      const cx = 20 + l1Gap * i + l1Gap / 2;
      svg += `<line x1="${w/2}" y1="32" x2="${cx}" y2="52" stroke="${color}" stroke-width="1" opacity="0.4"/>`;
      svg += `<rect x="${cx - 36}" y="52" width="72" height="22" rx="4" fill="none" stroke="${color}" stroke-width="1.2"/>
        <text x="${cx}" y="67" text-anchor="middle" fill="${color}" font-size="9" font-weight="600" font-family="'Space Grotesk',sans-serif">${esc(child.name.substring(0, 12))}</text>`;

      // Level 2
      if (child.children && child.children.length) {
        const l2Gap = 72 / child.children.length;
        child.children.forEach((leaf, j) => {
          const lx = cx - 36 + l2Gap * j + l2Gap / 2;
          svg += `<line x1="${cx}" y1="74" x2="${lx}" y2="94" stroke="${color}" stroke-width="0.8" opacity="0.3"/>`;
          svg += `<rect x="${lx - 28}" y="94" width="56" height="20" rx="3" fill="#f3f0eb" stroke="#e2dfd9" stroke-width="0.8"/>
            <text x="${lx}" y="107" text-anchor="middle" fill="#57534e" font-size="8" font-family="'Space Grotesk',sans-serif">${esc(leaf.name.substring(0, 10))}</text>`;
        });
      }
    });

    // Subtle pulse on root
    svg += `<rect x="${w/2 - 42}" y="6" width="84" height="28" rx="6" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.3">
      <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2.5s" repeatCount="indefinite"/>
    </rect>`;

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ── 6. encapsulation — nested boxes ─────────────────────────────────
  function encapsulation(p) {
    const layers = p.layers || [
      { label: 'Frame', color: '#3b82f6' },
      { label: 'Packet', color: '#8b5cf6' },
      { label: 'Data', color: '#10b981' }
    ];
    const n = layers.length;
    const w = 320, h = 36 + n * 14;
    const id = uid();

    let svg = '';
    layers.forEach((layer, i) => {
      const pad = i * 22;
      const rw = w - 40 - pad * 2;
      const ry = 10 + i * 10;
      const rh = h - 20 - i * 16;
      svg += `
        <rect x="${20 + pad}" y="${ry}" width="${rw}" height="${rh}" rx="5"
          fill="none" stroke="${layer.color}" stroke-width="1.5" opacity="0.7">
          <animate attributeName="opacity" values="0.5;0.8;0.5" dur="${2 + i * 0.5}s" repeatCount="indefinite"/>
        </rect>
        <text x="${24 + pad}" y="${ry + 14}" fill="${layer.color}" font-size="9" font-weight="600"
          font-family="'Space Grotesk',sans-serif" opacity="0.8">${esc(layer.label)}</text>`;
    });

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ── 7. state-machine — states with transitions ──────────────────────
  function stateMachine(p) {
    const states = p.states || ['Off', 'Starting', 'Running'];
    const active = p.active != null ? p.active : states.length - 1;
    const showTransitions = p.transitions !== false;
    const color = p.color || COLORS.blue;
    const n = states.length;
    const w = Math.max(320, n * 72);
    const h = 64;
    const gap = (w - 20) / n;
    const id = uid();

    let svg = '';
    states.forEach((state, i) => {
      const cx = 10 + gap * i + gap / 2;
      const isActive = i === active;
      const fill = isActive ? color : '#f3f0eb';
      const textFill = isActive ? '#fff' : '#57534e';
      const strokeClr = isActive ? color : '#e2dfd9';

      svg += `<rect x="${cx - 32}" y="20" width="64" height="28" rx="14"
        fill="${fill}" stroke="${strokeClr}" stroke-width="1.5"/>
        <text x="${cx}" y="38" text-anchor="middle" fill="${textFill}" font-size="9"
          font-weight="${isActive ? 700 : 500}" font-family="'Space Grotesk',sans-serif">${esc(state.substring(0, 10))}</text>`;

      if (isActive) {
        svg += `<circle cx="${cx}" cy="34" r="22" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.3">
          <animate attributeName="r" values="20;24;20" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite"/>
        </circle>`;
      }

      // Transition arrows
      if (showTransitions && i < n - 1) {
        const nextCx = 10 + gap * (i + 1) + gap / 2;
        svg += `<line x1="${cx + 34}" y1="34" x2="${nextCx - 34}" y2="34" stroke="#d4d0c8" stroke-width="1"
          marker-end="url(#${id}-arr)"/>`;
      }
    });

    svg += `<defs><marker id="${id}-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="#d4d0c8"/>
    </marker></defs>`;

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ── 8. binary-breakdown — binary/decimal address viz ─────────────────
  function binaryBreakdown(p) {
    const bits = (p.bits || '11111111.11111111.11111111.00000000').replace(/\./g, '');
    const label = p.label || '';
    const highlight = p.highlight || [];
    const color = p.color || COLORS.blue;
    const w = 340, h = 70;

    let svg = `<text x="170" y="60" text-anchor="middle" fill="#57534e" font-size="10"
      font-family="'JetBrains Mono',monospace">${esc(label)}</text>`;

    for (let i = 0; i < 32; i++) {
      const x = 10 + i * 10 + Math.floor(i / 8) * 4;
      const isHl = highlight.includes(i);
      const bit = bits[i] || '0';

      svg += `<rect x="${x}" y="10" width="9" height="18" rx="2"
        fill="${isHl ? (bit === '1' ? color : '#fde68a') : (bit === '1' ? '#d4d0c8' : '#f3f0eb')}"
        stroke="${isHl ? color : '#e2dfd9'}" stroke-width="0.8">
        ${isHl ? `<animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite"/>` : ''}
      </rect>
      <text x="${x + 4.5}" y="23" text-anchor="middle" fill="${isHl ? '#fff' : '#a8a29e'}"
        font-size="8" font-family="'JetBrains Mono',monospace" font-weight="600">${bit}</text>`;

      // Octet separator dots
      if ((i + 1) % 8 === 0 && i < 31) {
        svg += `<circle cx="${x + 12}" cy="19" r="1.5" fill="#d4d0c8"/>`;
      }
    }

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ── 9. shield — security icon with items ────────────────────────────
  function shield(p) {
    const items = p.items || ['Encryption', 'Auth', 'Integrity'];
    const color = p.color || COLORS.green;
    const h = 80;
    const id = uid();

    let svg = `
      <path d="M 60 12 L 90 6 L 120 12 L 120 46 C 120 60 90 72 90 72 C 90 72 60 60 60 46 Z"
        fill="none" stroke="${color}" stroke-width="2" opacity="0.8">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite"/>
      </path>
      <path d="M 80 36 L 87 43 L 100 28" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;

    items.forEach((item, i) => {
      svg += `
        <circle cx="148" cy="${18 + i * 22}" r="4" fill="${color}" opacity="0.2">
          <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2s" begin="${i * 0.3}s" repeatCount="indefinite"/>
        </circle>
        <circle cx="148" cy="${18 + i * 22}" r="1.5" fill="${color}"/>
        <text x="160" y="${22 + i * 22}" fill="#57534e" font-size="10" font-family="'Space Grotesk',sans-serif">${esc(item)}</text>`;
    });

    return `<svg viewBox="0 0 320 ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  }

  // ── 10. gauge — level meter ─────────────────────────────────────────
  function gauge(p) {
    const level = Math.max(0, Math.min(100, p.level || 50));
    const label = p.label || 'Level';
    const color = p.color || COLORS.amber;
    const w = 320, h = 56;
    const barW = 240;
    const fillW = barW * level / 100;

    return `<svg viewBox="0 0 ${w} ${h}" class="sv-anim" xmlns="http://www.w3.org/2000/svg">
      <text x="40" y="20" fill="#57534e" font-size="10" font-weight="600" font-family="'Space Grotesk',sans-serif">${esc(label)}</text>
      <text x="280" y="20" text-anchor="end" fill="${color}" font-size="11" font-weight="700" font-family="'JetBrains Mono',monospace">${level}%</text>
      <rect x="40" y="30" width="${barW}" height="12" rx="6" fill="#f3f0eb" stroke="#e2dfd9" stroke-width="0.8"/>
      <rect x="40" y="30" width="0" height="12" rx="6" fill="${color}" opacity="0.85">
        <animate attributeName="width" from="0" to="${fillW}" dur="1s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1"/>
      </rect>
      <rect x="40" y="30" width="0" height="12" rx="6" fill="${color}" opacity="0.15">
        <animate attributeName="width" from="0" to="${fillW}" dur="1s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1"/>
        <animate attributeName="opacity" values="0.15;0.3;0.15" dur="2s" begin="1s" repeatCount="indefinite"/>
      </rect>
    </svg>`;
  }

  // ── Renderer dispatch ───────────────────────────────────────────────

  const renderers = {
    'packet-flow': packetFlow,
    'layer-stack': layerStack,
    'comparison': comparison,
    'handshake': handshake,
    'hierarchy': hierarchy,
    'encapsulation': encapsulation,
    'state-machine': stateMachine,
    'binary-breakdown': binaryBreakdown,
    'shield': shield,
    'gauge': gauge
  };

  function render(visual) {
    if (!visual || !visual.type || !renderers[visual.type]) {
      return '<div class="sv-missing">Visual not available</div>';
    }
    return `<div class="sv-wrap">${renderers[visual.type](visual.params || {})}</div>`;
  }

  return { render, renderers };
})();
