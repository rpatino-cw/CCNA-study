/**
 * explainer.js — Phase 1D concept explainer.
 *
 * Asks Gemini for the BEST of three formats (animated SVG, Mermaid flowchart,
 * markdown table) for a CCNA concept and renders inline. Cached last-10 in
 * IndexedDB. Graceful when window.gemini isn't loaded yet (Phase 1A pending).
 *
 * Public API:
 *   window.explainer.render(concept)        Promise — renders to #explainer-render
 *   window.explainer.replay()               Re-renders the last payload
 *   window.explainer.pin(objId, concept)    Pins a concept to an objective
 *   window.explainer.cache.{get,put,list}   IndexedDB last-10 cache
 *   window.explainer.setTarget(el)          Override the render target element
 */
(function () {
  const CACHE_DB = 'ccna_explainer_cache';
  const CACHE_STORE = 'concepts';
  const CACHE_LIMIT = 10;
  const MAX_LINES = 300;

  let lastConcept = null;
  let lastFormat = null;
  let lastPayload = null;
  let renderTarget = null;

  function openDb() {
    return new Promise(function (resolve, reject) {
      const req = indexedDB.open(CACHE_DB, 1);
      req.onupgradeneeded = function () {
        const db = req.result;
        if (!db.objectStoreNames.contains(CACHE_STORE)) {
          const s = db.createObjectStore(CACHE_STORE, { keyPath: 'concept' });
          s.createIndex('ts', 'ts');
        }
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    });
  }

  async function cacheGet(concept) {
    try {
      const db = await openDb();
      return await new Promise(function (resolve) {
        const tx = db.transaction(CACHE_STORE, 'readonly');
        const req = tx.objectStore(CACHE_STORE).get(concept);
        req.onsuccess = function () { resolve(req.result || null); };
        req.onerror = function () { resolve(null); };
      });
    } catch (e) { return null; }
  }

  async function cachePut(concept, format, payload) {
    try {
      const db = await openDb();
      const tx = db.transaction(CACHE_STORE, 'readwrite');
      const store = tx.objectStore(CACHE_STORE);
      store.put({ concept: concept, format: format, payload: payload, ts: Date.now() });
      const idx = store.index('ts');
      const all = [];
      await new Promise(function (resolve) {
        idx.openCursor().onsuccess = function (e) {
          const cur = e.target.result;
          if (cur) { all.push(cur.value); cur.continue(); } else { resolve(); }
        };
      });
      if (all.length > CACHE_LIMIT) {
        all.sort(function (a, b) { return a.ts - b.ts; });
        for (let i = 0; i < all.length - CACHE_LIMIT; i++) store.delete(all[i].concept);
      }
    } catch (e) { /* cache is best-effort */ }
  }

  async function cacheList() {
    try {
      const db = await openDb();
      return await new Promise(function (resolve) {
        const tx = db.transaction(CACHE_STORE, 'readonly');
        const req = tx.objectStore(CACHE_STORE).getAll();
        req.onsuccess = function () { resolve(req.result || []); };
        req.onerror = function () { resolve([]); };
      });
    } catch (e) { return []; }
  }

  function buildPrompt(concept, opts) {
    const lines = [
      'You are a CCNA-200-301 networking tutor.',
      'Explain the concept: "' + concept + '"',
      'Pick the SINGLE BEST format from these three:',
      '1. SVG — self-contained animated SVG using inline CSS (≤300 lines). Wrap in ```svg ... ```',
      '2. MERMAID — flowchart in Mermaid v10 syntax. Wrap in ```mermaid ... ```',
      '3. TABLE — markdown comparison table. Wrap in ```md ... ```',
      'Pick the format that teaches the concept most clearly: SVG for animatable processes (lookups, packet flow), Mermaid for state machines (STP, OSPF), Table for direct comparisons (TCP vs UDP).',
      'Output ONLY the chosen fenced block. No prose before or after.',
    ];
    if (opts && opts.noSvg) lines.push('Do NOT use SVG. Use Mermaid or Table only.');
    return lines.join('\n');
  }

  function extractBlock(text) {
    if (!text) return null;
    const m = text.match(/```(svg|mermaid|md|markdown)\s*([\s\S]+?)```/i);
    if (!m) return null;
    const fmt = m[1].toLowerCase();
    return { format: fmt === 'markdown' ? 'md' : fmt, payload: m[2].trim() };
  }

  function tooLong(payload) {
    return payload.split('\n').length > MAX_LINES;
  }

  function looksLikeSvg(payload) {
    return /<svg[\s>]/i.test(payload);
  }

  function renderSvg(target, payload) {
    const wrapped = looksLikeSvg(payload) ? payload : ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200">' + payload + '</svg>');
    target.innerHTML = '<div class="explainer-svg">' + wrapped + '</div>';
    return !!target.querySelector('svg');
  }

  async function renderMermaid(target, payload) {
    const id = 'mmd-' + Date.now();
    target.innerHTML = '<pre class="mermaid" id="' + id + '">' + escapeHtml(payload) + '</pre>';
    if (window.mermaid && typeof window.mermaid.run === 'function') {
      try {
        await window.mermaid.run({ nodes: [document.getElementById(id)] });
        return true;
      } catch (e) { /* fall through to raw */ }
    }
    target.innerHTML = '<pre class="explainer-fallback">' + escapeHtml(payload) + '</pre>';
    return false;
  }

  function renderMarkdown(target, payload) {
    const lines = payload.split('\n').filter(function (l) { return l.trim(); });
    const tableLines = lines.filter(function (l) { return l.indexOf('|') !== -1; });
    if (tableLines.length < 2) {
      target.innerHTML = '<pre class="explainer-fallback">' + escapeHtml(payload) + '</pre>';
      return true;
    }
    const cells = tableLines.map(function (l) {
      return l.split('|').slice(1, -1).map(function (c) { return c.trim(); });
    });
    const isSep = function (row) { return row.every(function (c) { return /^:?-+:?$/.test(c); }); };
    let html = '<table class="explainer-table"><thead><tr>';
    html += cells[0].map(function (c) { return '<th>' + escapeHtml(c) + '</th>'; }).join('');
    html += '</tr></thead><tbody>';
    for (let i = 1; i < cells.length; i++) {
      if (isSep(cells[i])) continue;
      html += '<tr>' + cells[i].map(function (c) { return '<td>' + escapeHtml(c) + '</td>'; }).join('') + '</tr>';
    }
    html += '</tbody></table>';
    target.innerHTML = html;
    return true;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  async function renderTo(target, format, payload) {
    if (format === 'svg') return renderSvg(target, payload);
    if (format === 'mermaid') return await renderMermaid(target, payload);
    return renderMarkdown(target, payload);
  }

  function getTarget() {
    return renderTarget || document.getElementById('explainer-render');
  }

  async function render(concept) {
    if (!concept || !concept.trim()) return;
    concept = concept.trim();
    const target = getTarget();
    if (!target) return;

    target.innerHTML = '<p class="explainer-loading">Generating…</p>';

    if (!window.gemini || typeof window.gemini.generate !== 'function') {
      target.innerHTML = '<p class="explainer-empty">Gemini key required. Open the strat page to set up.</p>';
      return;
    }

    const cached = await cacheGet(concept);
    if (cached) {
      lastConcept = concept; lastFormat = cached.format; lastPayload = cached.payload;
      await renderTo(target, cached.format, cached.payload);
      return;
    }

    let block = null;
    let attempts = 0;

    while (attempts < 5 && !block) {
      attempts++;
      const noSvg = attempts >= 2;
      try {
        const resp = await window.gemini.generate(buildPrompt(concept, { noSvg: noSvg }));
        const text = typeof resp === 'string' ? resp : (resp && resp.text) || '';
        const candidate = extractBlock(text);
        if (!candidate) continue;
        if (candidate.format === 'svg' && (!looksLikeSvg(candidate.payload) || tooLong(candidate.payload))) continue;
        block = candidate;
      } catch (e) {
        target.innerHTML = '<p class="explainer-empty">Couldn\'t reach Gemini: ' + escapeHtml(e.message || 'unknown error') + '</p>';
        return;
      }
    }

    if (!block) {
      target.innerHTML = '<p class="explainer-empty">No valid explainer after 5 tries. Try a more specific concept.</p>';
      return;
    }

    lastConcept = concept; lastFormat = block.format; lastPayload = block.payload;
    const ok = await renderTo(target, block.format, block.payload);
    if (ok) cachePut(concept, block.format, block.payload);
  }

  function replay() {
    const target = getTarget();
    if (!target || !lastFormat || !lastPayload) return;
    renderTo(target, lastFormat, lastPayload);
  }

  function pin(objId, concept) {
    if (!objId || !concept) return;
    try {
      const key = 'ccna_explainer_pinned';
      const data = JSON.parse(localStorage.getItem(key) || '{}');
      data[objId] = data[objId] || [];
      if (data[objId].indexOf(concept) === -1) data[objId].push(concept);
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) { /* localStorage may be full or disabled */ }
  }

  function setTarget(el) { renderTarget = el; }

  window.explainer = {
    render: render,
    replay: replay,
    pin: pin,
    cache: { get: cacheGet, put: cachePut, list: cacheList },
    setTarget: setTarget,
  };
})();
