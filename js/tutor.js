/**
 * AI Tutor: floating chat bubble, track-aware (CCNA / CCNP / NCP-AIN)
 * Include on any page: <script src="js/tutor.js"></script>
 * (or ../js/tutor.js from subdirectories)
 */
(function () {
  const WORKER_URL = 'https://ccna-tutor.rpatino-cw.workers.dev';
  const STORAGE_KEY = 'ccna_tutor_history';
  const TRACK_STORAGE_KEY = 'tutor_track';
  const MAX_HISTORY = 20;

  // ── Track config ────────────────────────────────────────────
  var TRACKS = {
    'ccna': {
      label: 'CCNA',
      title: 'CCNA Tutor',
      sub: 'Ask anything CCNA 200-301',
      placeholder: 'Ask a CCNA question...',
      empty: 'Ask me anything about CCNA 200-301. I can explain concepts, quiz you, or unpack wrong answers.',
      suggestions: ['Explain subnetting', 'What is OSPF?', 'TCP vs UDP', 'How does STP work?', 'What is NAT/PAT?'],
      directive: 'You are a CCNA 200-301 tutor. Answer strictly in the scope of Cisco CCNA (routing, switching, IP, security, automation). Keep it exam-relevant.'
    },
    'ccnp': {
      label: 'CCNP',
      title: 'CCNP ENCOR Tutor',
      sub: 'Ask anything CCNP ENCOR 350-401',
      placeholder: 'Ask a CCNP ENCOR question...',
      empty: 'Ask me anything about CCNP ENCOR 350-401: advanced routing, BGP, EVPN/VXLAN, QoS, wireless, security, automation.',
      suggestions: ['OSPF LSA types', 'BGP path selection', 'What is EVPN/VXLAN?', 'Explain QoS shaping vs policing', 'DNA Center / automation'],
      directive: 'You are a CCNP ENCOR 350-401 tutor. Answer strictly in the scope of Cisco CCNP enterprise core (advanced OSPF/BGP, EVPN/VXLAN, QoS, wireless, security, automation).'
    },
    'ncp-ain': {
      label: 'NCP-AIN',
      title: 'NCP-AIN Tutor',
      sub: 'Ask anything AI networking',
      placeholder: 'Ask an AI-networking question...',
      empty: 'Ask me anything about NVIDIA NCP-AIN AI networking: InfiniBand, RoCE/Spectrum-X, RDMA, NVUE/Cumulus, UFM, NCCL, SHARP, GPU fabrics.',
      suggestions: ['InfiniBand vs RoCE', 'What is RDMA?', 'Explain PFC + ECN + DCQCN', 'How does SHARP work?', 'nv set qos roce basics'],
      directive: 'You are an NVIDIA NCP-AIN (AI Networking) tutor. Answer strictly in the scope of NVIDIA AI networking: InfiniBand, Spectrum-X/RoCEv2, RDMA, NVUE/Cumulus Linux, UFM, NCCL, SHARP, GPU cluster fabrics. If asked about generic Cisco/CCNA, relate it to the AI-networking context.'
    }
  };

  // ── Determine default track from page filename ───────────────
  function pageDefaultTrack() {
    var filename = location.pathname.split('/').pop() || '';
    if (filename.indexOf('ncp-ain-') === 0) return 'ncp-ain';
    if (filename.indexOf('encor-') === 0) return 'ccnp';
    return 'ccna';
  }

  // ── Track state: stored in localStorage, fallback to page default ──
  var track = (function () {
    var stored = null;
    try { stored = localStorage.getItem(TRACK_STORAGE_KEY); } catch (e) {}
    if (stored && TRACKS[stored]) return stored;
    return pageDefaultTrack();
  }());

  // ── Per-track sessionStorage key ────────────────────────────
  function trackKey(t) {
    return STORAGE_KEY + ':' + t;
  }

  function loadHistory(t) {
    try {
      return JSON.parse(sessionStorage.getItem(trackKey(t)) || '[]');
    } catch (e) { return []; }
  }

  function saveHistory(t, h) {
    try { sessionStorage.setItem(trackKey(t), JSON.stringify(h)); } catch (e) {}
  }

  // Migrate old single-key history to per-track key (backward compat, no crash)
  (function migrateLegacy() {
    try {
      var legacy = sessionStorage.getItem(STORAGE_KEY);
      if (legacy) {
        var parsed = JSON.parse(legacy);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Only migrate if the ccna per-track key does not yet exist
          var ccnaKey = trackKey('ccna');
          if (!sessionStorage.getItem(ccnaKey)) {
            sessionStorage.setItem(ccnaKey, legacy);
          }
          sessionStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (e) {}
  }());

  // ── Inject styles ──────────────────────────────────────────
  const css = document.createElement('style');
  css.textContent = `
    .tutor-fab {
      position: fixed; bottom: 20px; right: 20px; z-index: 9990;
      width: 52px; height: 52px; border-radius: 50%;
      background: #1C1917; color: #FAF7F2; border: none; cursor: pointer;
      box-shadow: 0 4px 16px rgba(0,0,0,0.18);
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.2s, box-shadow 0.2s;
      font-size: 22px; line-height: 1;
    }
    .tutor-fab:hover { transform: scale(1.08); box-shadow: 0 6px 20px rgba(0,0,0,0.25); }
    .tutor-fab.open { transform: scale(0); pointer-events: none; }

    .tutor-panel {
      position: fixed; bottom: 20px; right: 20px; z-index: 9991;
      width: 360px; max-height: 520px; border-radius: 12px;
      background: #FAF7F2; border: 1px solid #E2DFD9;
      box-shadow: 0 12px 40px rgba(0,0,0,0.15);
      display: flex; flex-direction: column;
      opacity: 0; transform: translateY(16px) scale(0.95);
      transition: opacity 0.25s, transform 0.25s;
      pointer-events: none; overflow: hidden;
      font-family: 'Source Serif 4', Georgia, serif;
    }
    .tutor-panel.open { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }

    @media (max-width: 420px) {
      .tutor-panel { width: calc(100vw - 24px); right: 12px; bottom: 12px; max-height: 70vh; }
      .tutor-fab { bottom: 12px; right: 12px; }
    }

    .tutor-header {
      display: flex; align-items: flex-start; justify-content: space-between;
      padding: 10px 14px 8px; border-bottom: 1px solid #E2DFD9;
      background: #FFFFFF;
    }
    .tutor-header-title {
      font-family: 'Space Grotesk', system-ui, sans-serif;
      font-weight: 700; font-size: 0.9rem; color: #1C1917;
    }
    .tutor-header-sub {
      font-family: 'Space Grotesk', system-ui, sans-serif;
      font-size: 0.68rem; color: #A8A29E; font-weight: 500;
    }
    .tutor-close {
      background: none; border: none; cursor: pointer; padding: 4px;
      color: #A8A29E; font-size: 18px; line-height: 1; border-radius: 4px;
    }
    .tutor-close:hover { background: #F3F0EB; color: #1C1917; }

    .tutor-switcher {
      display: flex; gap: 3px; margin-top: 6px;
    }
    .tutor-track-btn {
      font-family: 'Space Grotesk', system-ui, sans-serif;
      font-size: 0.62rem; font-weight: 600;
      padding: 3px 7px; border-radius: 10px; border: 1px solid #D6D3CE;
      background: #F3F0EB; color: #78716C; cursor: pointer;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
      white-space: nowrap;
    }
    .tutor-track-btn:hover { border-color: #76B900; color: #76B900; }
    .tutor-track-btn.active {
      background: #76B900; color: #FFFFFF; border-color: #76B900;
    }

    .tutor-messages {
      flex: 1; overflow-y: auto; padding: 12px 16px;
      display: flex; flex-direction: column; gap: 10px;
      min-height: 200px; max-height: 360px;
    }

    .tutor-msg {
      max-width: 88%; padding: 10px 14px; border-radius: 10px;
      font-size: 0.88rem; line-height: 1.55; word-wrap: break-word;
    }
    .tutor-msg.user {
      align-self: flex-end; background: #1C1917; color: #FAF7F2;
      border-bottom-right-radius: 3px;
    }
    .tutor-msg.bot {
      align-self: flex-start; background: #FFFFFF; color: #1C1917;
      border: 1px solid #E2DFD9; border-bottom-left-radius: 3px;
    }
    .tutor-msg.bot code {
      background: #F3F0EB; padding: 1px 5px; border-radius: 3px;
      font-family: 'JetBrains Mono', monospace; font-size: 0.82em; color: #B45309;
    }
    .tutor-msg.bot strong { font-weight: 700; }
    .tutor-msg.bot ul, .tutor-msg.bot ol { margin: 6px 0; padding-left: 18px; }
    .tutor-msg.bot li { margin-bottom: 3px; }
    .tutor-msg.bot a {
      color: #B45309; text-decoration: underline; text-underline-offset: 2px;
      font-weight: 600;
    }
    .tutor-msg.bot a:hover { color: #92400E; }
    .tutor-nav-btn {
      display: inline-block; margin: 4px 6px 0 0; padding: 5px 12px;
      background: #B45309; color: #FAF7F2; border: none; border-radius: 14px;
      font-family: 'Space Grotesk', sans-serif; font-size: 0.74rem; font-weight: 600;
      cursor: pointer; text-decoration: none;
    }
    .tutor-nav-btn:hover { background: #92400E; }

    .tutor-msg.typing {
      align-self: flex-start; background: #FFFFFF; border: 1px solid #E2DFD9;
      border-bottom-left-radius: 3px; padding: 12px 18px;
    }
    .tutor-dots { display: flex; gap: 4px; }
    .tutor-dots span {
      width: 7px; height: 7px; border-radius: 50%; background: #A8A29E;
      animation: tutorBounce 1.2s infinite;
    }
    .tutor-dots span:nth-child(2) { animation-delay: 0.15s; }
    .tutor-dots span:nth-child(3) { animation-delay: 0.3s; }
    @keyframes tutorBounce {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-5px); }
    }

    .tutor-input-row {
      display: flex; gap: 8px; padding: 10px 12px;
      border-top: 1px solid #E2DFD9; background: #FFFFFF;
    }
    .tutor-input {
      flex: 1; padding: 9px 12px; border: 1px solid #E2DFD9; border-radius: 8px;
      font-family: 'Source Serif 4', Georgia, serif; font-size: 0.88rem;
      color: #1C1917; background: #FAF7F2; outline: none; resize: none;
      min-height: 38px; max-height: 80px;
    }
    .tutor-input:focus { border-color: #B45309; }
    .tutor-input::placeholder { color: #A8A29E; }
    .tutor-send {
      padding: 0 14px; background: #1C1917; color: #FAF7F2; border: none;
      border-radius: 8px; cursor: pointer; font-family: 'Space Grotesk', sans-serif;
      font-size: 0.82rem; font-weight: 600; white-space: nowrap;
      transition: background 0.15s;
    }
    .tutor-send:hover { background: #292524; }
    .tutor-send:disabled { opacity: 0.4; cursor: not-allowed; }

    .tutor-suggestions {
      display: flex; flex-wrap: wrap; gap: 6px; padding: 0 16px 10px;
    }
    .tutor-suggestion {
      font-family: 'Space Grotesk', sans-serif; font-size: 0.72rem;
      padding: 5px 10px; border-radius: 14px; border: 1px solid #E2DFD9;
      background: #FFFFFF; color: #57534E; cursor: pointer;
      transition: border-color 0.15s, background 0.15s;
    }
    .tutor-suggestion:hover { border-color: #B45309; background: #FFFBEB; color: #B45309; }

    .tutor-clear {
      background: none; border: none; cursor: pointer; padding: 4px 8px;
      font-family: 'Space Grotesk', sans-serif; font-size: 0.65rem;
      color: #A8A29E; text-decoration: underline; text-underline-offset: 2px;
    }
    .tutor-clear:hover { color: #DC2626; }

    @media (prefers-reduced-motion: reduce) {
      .tutor-fab, .tutor-panel, .tutor-dots span { transition: none; animation: none; }
    }
  `;
  document.head.appendChild(css);

  // ── Build DOM ──────────────────────────────────────────────
  const fab = document.createElement('button');
  fab.className = 'tutor-fab';
  fab.setAttribute('aria-label', 'Open AI Tutor');
  fab.innerHTML = '?';
  document.body.appendChild(fab);

  const panel = document.createElement('div');
  panel.className = 'tutor-panel';
  panel.innerHTML = `
    <div class="tutor-header">
      <div style="flex:1;min-width:0;">
        <div class="tutor-header-title" id="tutor-title"></div>
        <div class="tutor-header-sub" id="tutor-sub"></div>
        <div class="tutor-switcher" id="tutor-switcher"></div>
      </div>
      <div style="display:flex;align-items:center;gap:4px;margin-left:8px;">
        <button class="tutor-clear" id="tutor-clear">Clear</button>
        <button class="tutor-close" id="tutor-close">&times;</button>
      </div>
    </div>
    <div class="tutor-messages" id="tutor-messages"></div>
    <div class="tutor-suggestions" id="tutor-suggestions"></div>
    <div class="tutor-input-row">
      <textarea class="tutor-input" id="tutor-input" rows="1"></textarea>
      <button class="tutor-send" id="tutor-send">Send</button>
    </div>
  `;
  document.body.appendChild(panel);

  // ── State ──────────────────────────────────────────────────
  let history = loadHistory(track);
  let isOpen = false;
  let isSending = false;

  const messagesEl = document.getElementById('tutor-messages');
  const inputEl = document.getElementById('tutor-input');
  const sendBtn = document.getElementById('tutor-send');
  const suggestionsEl = document.getElementById('tutor-suggestions');
  const titleEl = document.getElementById('tutor-title');
  const subEl = document.getElementById('tutor-sub');
  const switcherEl = document.getElementById('tutor-switcher');

  // ── Switcher UI ────────────────────────────────────────────
  function buildSwitcher() {
    switcherEl.innerHTML = '';
    Object.keys(TRACKS).forEach(function (t) {
      var btn = document.createElement('button');
      btn.className = 'tutor-track-btn' + (t === track ? ' active' : '');
      btn.textContent = TRACKS[t].label;
      btn.setAttribute('data-track', t);
      btn.addEventListener('click', function () {
        if (t === track) return;
        // Save current history before switching
        saveHistory(track, history);
        // Switch track
        track = t;
        try { localStorage.setItem(TRACK_STORAGE_KEY, track); } catch (e) {}
        // Load new track history
        history = loadHistory(track);
        // Update UI
        applyTrackUI();
        renderMessages();
        inputEl.focus();
      });
      switcherEl.appendChild(btn);
    });
  }

  function applyTrackUI() {
    var cfg = TRACKS[track];
    titleEl.textContent = cfg.title;
    subEl.textContent = 'Powered by Gemini · ' + cfg.sub;
    inputEl.placeholder = cfg.placeholder;
    // Update switcher button active states
    switcherEl.querySelectorAll('.tutor-track-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-track') === track);
    });
  }

  // ── Render ─────────────────────────────────────────────────
  function renderMessages() {
    messagesEl.innerHTML = '';
    if (history.length === 0) {
      messagesEl.innerHTML = '<div class="tutor-msg bot">' + escapeHtml(TRACKS[track].empty) + '</div>';
      showSuggestions();
    } else {
      hideSuggestions();
      for (const h of history) {
        appendMessage(h.role === 'user' ? 'user' : 'bot', h.text);
      }
    }
    scrollToBottom();
  }

  function appendMessage(type, text) {
    const div = document.createElement('div');
    div.className = `tutor-msg ${type}`;
    div.innerHTML = type === 'bot' ? renderMarkdown(text) : escapeHtml(text);
    messagesEl.appendChild(div);
  }

  function showTyping() {
    const div = document.createElement('div');
    div.className = 'tutor-msg typing';
    div.id = 'tutor-typing';
    div.innerHTML = '<div class="tutor-dots"><span></span><span></span><span></span></div>';
    messagesEl.appendChild(div);
    scrollToBottom();
  }

  function hideTyping() {
    const el = document.getElementById('tutor-typing');
    if (el) el.remove();
  }

  function showSuggestions() {
    var suggestions = TRACKS[track].suggestions;
    suggestionsEl.innerHTML = suggestions.map(s =>
      `<button class="tutor-suggestion">${escapeHtml(s)}</button>`
    ).join('');
    suggestionsEl.querySelectorAll('.tutor-suggestion').forEach(btn => {
      btn.addEventListener('click', () => { inputEl.value = btn.textContent; sendMessage(); });
    });
  }

  function hideSuggestions() { suggestionsEl.innerHTML = ''; }

  function scrollToBottom() {
    requestAnimationFrame(() => { messagesEl.scrollTop = messagesEl.scrollHeight; });
  }

  // ── Page index for client-side navigation fallback ────────
  const PAGE_INDEX = {
    'subnetting': 'subnetting-visual.html',
    'subnet': 'subnetting-visual.html',
    'subnet mask': 'subnetting-trainer.html',
    'cidr': 'cidr-3d.html',
    'vlsm': 'vlsm.html',
    'magic number': 'magic-number.html',
    'ipv6': 'ipv6.html',
    'osi': 'osi-sim.html',
    'arp': 'arp-explainer.html',
    'ospf': 'ospf-mastery.html',
    'stp': 'stp-deep.html',
    'spanning tree': 'stp-deep.html',
    'acl': 'acl-simulator.html',
    'packet journey': 'packet-journey.html',
    'flashcards': 'flashcards.html',
    'quiz': 'quiz.html',
    'cheat sheet': 'cheat-sheet.html',
    'command': 'command-ref.html',
    'commands': 'command-ref.html',
    'ios': 'command-ref.html',
    'glossary': 'glossary.html',
    'guide': 'guide.html',
    'roadmap': 'roadmap.html',
    'knowledge map': 'knowledge-map.html',
    'exam cram': 'exam-cram.html',
    'exam sim': 'exam-sim.html',
    'exam': 'exam-replica.html',
    'diagnostic': 'diagnostic.html',
    'jeremy': 'jeremy-labs.html',
    'ekere': 'ekere-labs.html',
    'etherchannel': 'etherchannel-lab.html',
    'wireless': 'wireless-ap-lab.html',
    'lab': 'network-lab.html',
    'core': 'core.html',
    'home': 'core.html',
    'dashboard': 'core.html',
  };

  // Detect navigation intent in user prompt -> returns matched URL or null
  function matchNavIntent(text) {
    const t = text.toLowerCase();
    const intent = /\b(take me to|go to|open|navigate to|show me the|bring me to|let me see the|jump to|learn|study|practice)\b/.test(t)
      || /\b(page|webepage|webpage)\b/.test(t);
    if (!intent) return null;
    let best = null, bestLen = 0;
    for (const key of Object.keys(PAGE_INDEX)) {
      if (t.includes(key) && key.length > bestLen) { best = PAGE_INDEX[key]; bestLen = key.length; }
    }
    return best;
  }

  function pageTitleForUrl(url) {
    for (const [k, v] of Object.entries(PAGE_INDEX)) if (v === url) return k;
    return url;
  }

  // ── Markdown-light ─────────────────────────────────────────
  function renderMarkdown(text) {
    // Strip pt-topology JSON blocks (rendered as buttons instead)
    text = text.replace(/```pt-topology[\s\S]*?```/g, '');
    // Extract markdown links BEFORE escaping, then re-inject as anchors
    const links = [];
    text = text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
      const i = links.push({ label, href }) - 1;
      return ` LINK${i} `;
    });
    let html = escapeHtml(text)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/^\- (.+)$/gm, '<li>$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      .replace(/\n/g, '<br>');
    html = html.replace(/ LINK(\d+) /g, (_, i) => {
      const { label, href } = links[+i];
      const safeHref = escapeAttr(href);
      const isLocal = !/^https?:/i.test(href);
      const target = isLocal ? '' : ' target="_blank" rel="noopener"';
      return `<a href="${safeHref}"${target}>${escapeHtml(label)}</a>`;
    });
    return html;
  }

  function escapeAttr(s) {
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function escapeHtml(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  // ── Send ───────────────────────────────────────────────────
  async function sendMessage() {
    const text = inputEl.value.trim();
    if (!text || isSending) return;

    isSending = true;
    sendBtn.disabled = true;
    inputEl.value = '';
    inputEl.style.height = 'auto';
    hideSuggestions();

    // Add user message
    history.push({ role: 'user', text });
    appendMessage('user', text);
    scrollToBottom();
    showTyping();

    // Gather page context (pages can opt-in by defining window.tutorContext())
    let contextBlock = '';
    try {
      const pageTitle = document.title || '';
      const pageUrl = location.pathname.split('/').pop() || '';
      const lines = [];
      lines.push('page: ' + pageUrl + (pageTitle ? ' | ' + pageTitle : ''));
      if (typeof window.tutorContext === 'function') {
        const ctx = window.tutorContext();
        if (ctx && typeof ctx === 'object') {
          for (const [k, v] of Object.entries(ctx)) {
            if (v === null || v === undefined || v === '') continue;
            const val = (typeof v === 'string') ? v : JSON.stringify(v);
            lines.push(k + ': ' + val);
          }
        }
      }
      if (lines.length) {
        contextBlock = '[PAGE CONTEXT: use to give relevant, in-place hints about the student\'s current screen, but do not quote this block back]\n' + lines.join('\n') + '\n---\n';
      }
    } catch (e) { /* never block send on context failure */ }

    // Build track preface to scope answers to the selected track
    var trackPreface = '[TRACK: ' + track + '] ' + TRACKS[track].directive + '\n---\n';
    const messageWithContext = trackPreface + contextBlock + text;

    try {
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageWithContext,
          history: history.slice(-MAX_HISTORY),
          track: track
        })
      });

      hideTyping();

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const reply = data.reply || 'Sorry, something went wrong.';

      history.push({ role: 'model', text: reply });
      appendMessage('bot', reply);

      // Client-side navigation fallback: if user asked to navigate but reply has no link,
      // inject a quick "Open <page>" button based on intent + topic match.
      const navUrl = matchNavIntent(text);
      const replyHasLink = /\]\([^)\s]+\)/.test(reply);
      if (navUrl && !replyHasLink) {
        const msgs = messagesEl.querySelectorAll('.tutor-msg.bot');
        const lastMsg = msgs[msgs.length - 1];
        if (lastMsg) {
          const btn = document.createElement('a');
          btn.className = 'tutor-nav-btn';
          btn.href = navUrl;
          btn.textContent = 'Open ' + pageTitleForUrl(navUrl);
          lastMsg.appendChild(document.createElement('br'));
          lastMsg.appendChild(btn);
        }
      }

      // Check for PT topology blocks and auto-build
      tryBuildPTTopology(reply);

    } catch (err) {
      hideTyping();
      const errMsg = 'Connection error. The tutor is unavailable right now. Try again in a moment.';
      appendMessage('bot', errMsg);
    }

    // Trim and save history (per-track)
    if (history.length > MAX_HISTORY * 2) history = history.slice(-MAX_HISTORY);
    saveHistory(track, history);

    isSending = false;
    sendBtn.disabled = false;
    scrollToBottom();
    inputEl.focus();
  }

  // ── PT Topology Auto-Build ──────────────────────────────────
  function tryBuildPTTopology(text) {
    if (!window.ptBridge) return;
    const match = text.match(/```pt-topology\s*\n?([\s\S]*?)```/);
    if (!match) return;
    try {
      const topo = JSON.parse(match[1].trim());
      if (!topo.devices) return;
      // Insert a "Build in PT" button into the last bot message
      const msgs = messagesEl.querySelectorAll('.tutor-msg.bot');
      const lastMsg = msgs[msgs.length - 1];
      if (!lastMsg) return;
      const btn = document.createElement('button');
      btn.style.cssText = 'display:block;margin-top:8px;padding:6px 14px;background:#0891B2;color:#fff;border:none;border-radius:6px;font-family:"Space Grotesk",sans-serif;font-size:.75rem;font-weight:600;cursor:pointer';
      btn.textContent = 'Build in Packet Tracer';
      btn.addEventListener('click', function() {
        btn.textContent = 'Building...';
        btn.style.opacity = '.6';
        window.ptBridge.check(function(ok) {
          if (!ok) {
            btn.textContent = 'PT not running. Open Packet Tracer first.';
            btn.style.background = '#DC2626';
            setTimeout(function(){ btn.textContent = 'Build in Packet Tracer'; btn.style.background = '#0891B2'; btn.style.opacity = '1'; }, 3000);
            return;
          }
          window.ptBridge.build(topo).then(function() {
            btn.textContent = 'Built! Check Packet Tracer';
            btn.style.background = '#16A34A';
          }).catch(function() {
            btn.textContent = 'Error. Check PT console.';
            btn.style.background = '#DC2626';
          });
        });
      });
      lastMsg.appendChild(btn);
    } catch (e) { /* invalid JSON: ignore */ }
  }

  // ── Events ─────────────────────────────────────────────────
  fab.addEventListener('click', () => {
    isOpen = true;
    fab.classList.add('open');
    panel.classList.add('open');
    // Initialize track UI and switcher on first open (or on re-open)
    applyTrackUI();
    buildSwitcher();
    inputEl.focus();
    renderMessages();
  });

  document.getElementById('tutor-close').addEventListener('click', () => {
    isOpen = false;
    panel.classList.remove('open');
    fab.classList.remove('open');
  });

  document.getElementById('tutor-clear').addEventListener('click', () => {
    history = [];
    saveHistory(track, history);
    renderMessages();
  });

  sendBtn.addEventListener('click', sendMessage);
  inputEl.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } });

  // Auto-resize textarea
  inputEl.addEventListener('input', () => { inputEl.style.height = 'auto'; inputEl.style.height = Math.min(inputEl.scrollHeight, 80) + 'px'; });
})();
