/**
 * chat.js — free-form CCNA chat surface.
 * Uses window.gemini.generateText (browser-direct, user's own API key).
 * Guard layer in gemini.js handles scope lock + jailbreak filter + topic classifier.
 * History stored in localStorage (chat-only, capped at 30 turns).
 */
(function () {
  const HISTORY_KEY = 'ccna_chat_history_v1';
  const MAX_TURNS = 30;
  const MAX_INPUT = 1500;

  document.addEventListener('DOMContentLoaded', function () {
    const msgs = document.getElementById('msgs');
    const empty = document.getElementById('empty');
    const input = document.getElementById('input');
    const send = document.getElementById('send');
    const btnKey = document.getElementById('btn-key');
    const btnClear = document.getElementById('btn-clear');
    const keyStatus = document.getElementById('key-status');
    const counter = document.getElementById('counter');
    const suggestions = document.getElementById('suggestions');

    let history = loadHistory();
    let busy = false;

    renderHistory();
    refreshKeyStatus();
    updateCounter();
    autoSize(input);

    btnKey.addEventListener('click', async function () {
      const k = await window.gemini.promptForKey({ force: false, prefill: window.gemini.getKey() || '' });
      if (k) refreshKeyStatus();
    });

    btnClear.addEventListener('click', function () {
      if (!history.length) return;
      if (!confirm('Clear chat history?')) return;
      history = [];
      saveHistory();
      msgs.innerHTML = '';
      msgs.appendChild(empty);
      updateCounter();
    });

    input.addEventListener('input', function () {
      autoSize(input);
      send.disabled = !input.value.trim() || busy || !window.gemini.hasKey();
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (!send.disabled) submit();
      }
    });

    send.addEventListener('click', submit);

    suggestions.addEventListener('click', function (e) {
      const btn = e.target.closest('.chat-suggestion');
      if (!btn) return;
      input.value = btn.dataset.q || '';
      autoSize(input);
      send.disabled = busy || !window.gemini.hasKey();
      input.focus();
    });

    async function submit() {
      const text = (input.value || '').trim();
      if (!text || busy) return;
      if (!window.gemini.hasKey()) {
        const k = await window.gemini.promptForKey({ force: true });
        if (!k) return;
        refreshKeyStatus();
      }
      if (text.length > MAX_INPUT) {
        appendError('Message too long — keep it under ' + MAX_INPUT + ' characters.');
        return;
      }

      busy = true;
      send.disabled = true;
      input.value = '';
      autoSize(input);

      pushMessage({ role: 'user', text: text });
      const typing = appendTyping();

      try {
        const reply = await window.gemini.generateText(null, text);
        typing.remove();
        const clean = String(reply || '').trim();
        if (!clean) {
          appendError('Empty reply from Gemini. Try again.');
        } else {
          pushMessage({ role: 'bot', text: clean });
        }
      } catch (e) {
        typing.remove();
        if (e && e.name === 'GeminiGuardError') {
          pushMessage({ role: 'refuse', text: window.gemini.REFUSAL_TEXT, reason: e.guardReason });
        } else if (e && e.status === 429) {
          appendError('Rate-limited by Gemini free tier (15 RPM / 1500 per day). Wait a moment.');
        } else {
          appendError('Gemini error: ' + (e && e.message ? e.message : 'unknown'));
        }
      } finally {
        busy = false;
        send.disabled = !input.value.trim() || !window.gemini.hasKey();
        input.focus();
      }
    }

    function pushMessage(m) {
      history.push(m);
      while (history.length > MAX_TURNS) history.shift();
      saveHistory();
      renderMessage(m);
      updateCounter();
      scrollBottom();
    }

    function renderHistory() {
      msgs.innerHTML = '';
      if (!history.length) { msgs.appendChild(empty); return; }
      for (const m of history) renderMessage(m);
      scrollBottom();
    }

    function renderMessage(m) {
      if (empty.parentNode === msgs) msgs.removeChild(empty);
      const div = document.createElement('div');
      if (m.role === 'user') {
        div.className = 'chat-msg user';
        div.textContent = m.text;
      } else if (m.role === 'refuse') {
        div.className = 'chat-msg refuse';
        const strong = document.createElement('strong');
        strong.textContent = 'Off-topic — try a CCNA question';
        const p = document.createElement('span');
        p.textContent = m.text;
        div.appendChild(strong);
        div.appendChild(p);
      } else {
        div.className = 'chat-msg bot';
        div.innerHTML = renderBotMarkdown(m.text);
      }
      msgs.appendChild(div);
    }

    function appendTyping() {
      if (empty.parentNode === msgs) msgs.removeChild(empty);
      const div = document.createElement('div');
      div.className = 'chat-typing';
      div.innerHTML = '<span></span><span></span><span></span>';
      msgs.appendChild(div);
      scrollBottom();
      return div;
    }

    function appendError(text) {
      const div = document.createElement('div');
      div.className = 'chat-msg error';
      div.textContent = text;
      msgs.appendChild(div);
      scrollBottom();
    }

    function refreshKeyStatus() {
      if (window.gemini.hasKey()) {
        keyStatus.textContent = 'key set · gemini-2.5-flash · scope-locked';
        send.disabled = !input.value.trim() || busy;
      } else {
        keyStatus.textContent = 'no key — click Set key';
        send.disabled = true;
      }
    }

    function updateCounter() {
      counter.textContent = history.length + ' message' + (history.length === 1 ? '' : 's') + ' this session';
    }

    function scrollBottom() {
      msgs.scrollTop = msgs.scrollHeight;
    }

    function autoSize(el) {
      el.style.height = 'auto';
      el.style.height = Math.min(120, el.scrollHeight) + 'px';
    }

    function loadHistory() {
      try {
        const raw = localStorage.getItem(HISTORY_KEY);
        if (!raw) return [];
        const arr = JSON.parse(raw);
        return Array.isArray(arr) ? arr.slice(-MAX_TURNS) : [];
      } catch (_) { return []; }
    }

    function saveHistory() {
      try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); } catch (_) {}
    }

    function renderBotMarkdown(text) {
      const esc = (s) => s.replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
      let out = esc(text);
      out = out.replace(/```([\s\S]*?)```/g, (_, code) => '<pre><code>' + code + '</code></pre>');
      out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
      out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      out = out.replace(/\n/g, '<br>');
      return out;
    }
  });
})();
