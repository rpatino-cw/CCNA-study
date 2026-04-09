/**
 * CCNA AI Tutor — floating chat bubble
 * Include on any page: <script src="js/tutor.js"></script>
 * (or ../js/tutor.js from subdirectories)
 */
(function () {
  const WORKER_URL = 'https://ccna-tutor.rpatino-cw.workers.dev';
  const STORAGE_KEY = 'ccna_tutor_history';
  const MAX_HISTORY = 20;

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
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 16px; border-bottom: 1px solid #E2DFD9;
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
  fab.setAttribute('aria-label', 'Open CCNA Tutor');
  fab.innerHTML = '?';
  document.body.appendChild(fab);

  const panel = document.createElement('div');
  panel.className = 'tutor-panel';
  panel.innerHTML = `
    <div class="tutor-header">
      <div>
        <div class="tutor-header-title">CCNA Tutor</div>
        <div class="tutor-header-sub">Powered by Gemini &middot; Ask anything CCNA</div>
      </div>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="tutor-clear" id="tutor-clear">Clear</button>
        <button class="tutor-close" id="tutor-close">&times;</button>
      </div>
    </div>
    <div class="tutor-messages" id="tutor-messages"></div>
    <div class="tutor-suggestions" id="tutor-suggestions"></div>
    <div class="tutor-input-row">
      <textarea class="tutor-input" id="tutor-input" placeholder="Ask a CCNA question..." rows="1"></textarea>
      <button class="tutor-send" id="tutor-send">Send</button>
    </div>
  `;
  document.body.appendChild(panel);

  // ── State ──────────────────────────────────────────────────
  let history = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]');
  let isOpen = false;
  let isSending = false;

  const messagesEl = document.getElementById('tutor-messages');
  const inputEl = document.getElementById('tutor-input');
  const sendBtn = document.getElementById('tutor-send');
  const suggestionsEl = document.getElementById('tutor-suggestions');

  const SUGGESTIONS = [
    'Explain subnetting',
    'What is OSPF?',
    'TCP vs UDP',
    'How does STP work?',
    'What is NAT/PAT?',
    'Explain VLANs',
  ];

  // ── Render ─────────────────────────────────────────────────
  function renderMessages() {
    messagesEl.innerHTML = '';
    if (history.length === 0) {
      messagesEl.innerHTML = '<div class="tutor-msg bot">Ask me anything about CCNA 200-301. I can explain concepts, quiz you, or help you understand wrong answers.</div>';
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
    suggestionsEl.innerHTML = SUGGESTIONS.map(s =>
      `<button class="tutor-suggestion">${s}</button>`
    ).join('');
    suggestionsEl.querySelectorAll('.tutor-suggestion').forEach(btn => {
      btn.addEventListener('click', () => { inputEl.value = btn.textContent; sendMessage(); });
    });
  }

  function hideSuggestions() { suggestionsEl.innerHTML = ''; }

  function scrollToBottom() {
    requestAnimationFrame(() => { messagesEl.scrollTop = messagesEl.scrollHeight; });
  }

  // ── Markdown-light ─────────────────────────────────────────
  function renderMarkdown(text) {
    return escapeHtml(text)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/^\- (.+)$/gm, '<li>$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      .replace(/\n/g, '<br>');
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

    try {
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: history.slice(-MAX_HISTORY)
        })
      });

      hideTyping();

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const reply = data.reply || 'Sorry, something went wrong.';

      history.push({ role: 'model', text: reply });
      appendMessage('bot', reply);

    } catch (err) {
      hideTyping();
      const errMsg = 'Connection error — the tutor is unavailable right now. Try again in a moment.';
      appendMessage('bot', errMsg);
    }

    // Trim and save history
    if (history.length > MAX_HISTORY * 2) history = history.slice(-MAX_HISTORY);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(history));

    isSending = false;
    sendBtn.disabled = false;
    scrollToBottom();
    inputEl.focus();
  }

  // ── Events ─────────────────────────────────────────────────
  fab.addEventListener('click', () => { isOpen = true; fab.classList.add('open'); panel.classList.add('open'); inputEl.focus(); renderMessages(); });
  document.getElementById('tutor-close').addEventListener('click', () => { isOpen = false; panel.classList.remove('open'); fab.classList.remove('open'); });
  document.getElementById('tutor-clear').addEventListener('click', () => { history = []; sessionStorage.removeItem(STORAGE_KEY); renderMessages(); });
  sendBtn.addEventListener('click', sendMessage);
  inputEl.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } });

  // Auto-resize textarea
  inputEl.addEventListener('input', () => { inputEl.style.height = 'auto'; inputEl.style.height = Math.min(inputEl.scrollHeight, 80) + 'px'; });
})();
