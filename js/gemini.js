/**
 * gemini.js — minimal Gemini API client for the strat page.
 *
 * Exposes `window.gemini` with:
 *   hasKey()                                 → bool
 *   getKey()                                 → string|null
 *   promptForKey({force})                    → Promise<string|null>
 *   generate(systemPrompt, userPrompt, schema)→ Promise<JSON>
 *   scopeValidate(text, forbiddenTerms[])    → bool
 *
 * Storage key: `ccna_strat_gemini_key` in localStorage. Never committed
 * to source. A pre-commit grep for the Google API-key prefix pattern can
 * keep real keys out of the repo.
 */
(function () {
  const KEY_STORAGE = 'ccna_strat_gemini_key';
  const ENDPOINT_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
  const DEFAULT_MODEL = 'gemini-2.5-flash';

  function hasKey() {
    return Boolean(localStorage.getItem(KEY_STORAGE));
  }

  function getKey() {
    return localStorage.getItem(KEY_STORAGE);
  }

  function setKey(k) {
    if (k) localStorage.setItem(KEY_STORAGE, k.trim());
    else localStorage.removeItem(KEY_STORAGE);
  }

  function buildModal({ message, forceMessage, defaultValue }) {
    const wrap = document.createElement('div');
    wrap.className = 'gem-modal';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-modal', 'true');
    wrap.setAttribute('aria-label', 'Paste your Gemini API key');
    wrap.innerHTML = `
      <div class="gem-modal-bg"></div>
      <div class="gem-modal-card">
        <h3>Gemini API key</h3>
        <p class="gem-modal-msg">${message}</p>
        <input type="password" autocomplete="off" spellcheck="false"
               class="gem-modal-input" placeholder="paste your Gemini API key" value="${defaultValue || ''}">
        <p class="gem-modal-err" hidden></p>
        <p class="gem-modal-help">
          Get one free at <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">aistudio.google.com/apikey</a>.
          Stored only in this browser. Never sent anywhere except google.
        </p>
        <div class="gem-modal-row">
          <button class="btn btn-ghost gem-modal-cancel" type="button">Cancel</button>
          <button class="btn btn-primary gem-modal-save" type="button">Save key</button>
        </div>
      </div>
    `;
    if (forceMessage) {
      const cancel = wrap.querySelector('.gem-modal-cancel');
      cancel.disabled = true;
      cancel.style.opacity = '.4';
      cancel.style.cursor = 'not-allowed';
    }
    return wrap;
  }

  function promptForKey(opts) {
    opts = opts || {};
    return new Promise(resolve => {
      const message = opts.force
        ? 'Paste your Gemini API key to use this page. Quizzes and eval can’t run without it.'
        : 'Paste your Gemini API key to enable the live quizzes and eval.';
      const modal = buildModal({
        message,
        forceMessage: !!opts.force,
        defaultValue: opts.prefill || '',
      });
      document.body.appendChild(modal);
      const input = modal.querySelector('.gem-modal-input');
      const err = modal.querySelector('.gem-modal-err');
      const save = modal.querySelector('.gem-modal-save');
      const cancel = modal.querySelector('.gem-modal-cancel');
      setTimeout(function () { input.focus(); }, 30);

      function close(value) {
        modal.remove();
        resolve(value);
      }

      save.addEventListener('click', async function () {
        const k = input.value.trim();
        if (!k) {
          err.textContent = 'Paste a key first.';
          err.hidden = false;
          return;
        }
        save.disabled = true;
        save.textContent = 'Verifying…';
        err.hidden = true;
        try {
          await pingKey(k);
          setKey(k);
          close(k);
        } catch (e) {
          err.textContent = (e && e.message) || 'Key rejected by Gemini.';
          err.hidden = false;
          save.disabled = false;
          save.textContent = 'Save key';
        }
      });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') save.click();
      });
      cancel.addEventListener('click', function () {
        if (cancel.disabled) return;
        close(null);
      });
    });
  }

  async function pingKey(key) {
    const url = `${ENDPOINT_BASE}/${DEFAULT_MODEL}:generateContent?key=${encodeURIComponent(key)}`;
    const body = {
      contents: [{ role: 'user', parts: [{ text: 'reply with the single word: ok' }] }],
      generationConfig: { temperature: 0, maxOutputTokens: 8 },
    };
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      let msg = `HTTP ${res.status}`;
      try {
        const e = await res.json();
        if (e && e.error && e.error.message) msg = e.error.message;
      } catch (_) {}
      throw new Error(msg);
    }
    return true;
  }

  async function generate(systemPrompt, userPrompt, jsonSchema) {
    const key = getKey();
    if (!key) throw new Error('No Gemini API key. Run gemini.promptForKey() first.');
    const url = `${ENDPOINT_BASE}/${DEFAULT_MODEL}:generateContent?key=${encodeURIComponent(key)}`;
    const body = {
      systemInstruction: systemPrompt
        ? { role: 'system', parts: [{ text: systemPrompt }] }
        : undefined,
      contents: [
        { role: 'user', parts: [{ text: userPrompt }] },
      ],
      generationConfig: {
        temperature: 0.4,
        responseMimeType: 'application/json',
        responseSchema: jsonSchema || undefined,
      },
    };
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      let msg = `Gemini HTTP ${res.status}`;
      try {
        const e = await res.json();
        if (e && e.error && e.error.message) msg = e.error.message;
      } catch (_) {}
      const err = new Error(msg);
      err.status = res.status;
      throw err;
    }
    const data = await res.json();
    const text = (((data.candidates || [])[0] || {}).content || {}).parts;
    if (!text || !text[0] || typeof text[0].text !== 'string') {
      throw new Error('Gemini returned no text candidate.');
    }
    try {
      return JSON.parse(text[0].text);
    } catch (e) {
      throw new Error('Gemini returned non-JSON content: ' + text[0].text.slice(0, 120));
    }
  }

  async function generateText(systemPrompt, userPrompt) {
    const key = getKey();
    if (!key) throw new Error('No Gemini API key.');
    const url = `${ENDPOINT_BASE}/${DEFAULT_MODEL}:generateContent?key=${encodeURIComponent(key)}`;
    const body = {
      systemInstruction: systemPrompt
        ? { role: 'system', parts: [{ text: systemPrompt }] }
        : undefined,
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      generationConfig: { temperature: 0.5 },
    };
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Gemini HTTP ${res.status}`);
    const data = await res.json();
    const parts = (((data.candidates || [])[0] || {}).content || {}).parts || [];
    return parts.map(p => p.text || '').join('').trim();
  }

  function scopeValidate(text, forbiddenTerms) {
    if (!text || !forbiddenTerms || !forbiddenTerms.length) return true;
    const haystack = String(text).toLowerCase();
    for (const term of forbiddenTerms) {
      const t = String(term || '').toLowerCase().trim();
      if (!t) continue;
      const escaped = t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp('(^|[^a-z0-9])' + escaped + '(?:[^a-z0-9]|$)');
      if (re.test(haystack)) return false;
    }
    return true;
  }

  window.gemini = {
    hasKey,
    getKey,
    setKey,
    promptForKey,
    generate,
    generateText,
    scopeValidate,
    _model: DEFAULT_MODEL,
  };
})();
