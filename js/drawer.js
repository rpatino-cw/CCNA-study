// js/drawer.js — Phase 1C: References drawer
// Three tabs (Books / Tips / Explain), ESC + click-outside close.
// Reads data/book-refs/ocg-by-objective.json and data/forum-tips.json.
// Footnotes delegate via [data-drawer-open][data-drawer-id].
// Exposes window.drawer.{open, close, isOpen}.

(function () {
  'use strict';

  const DATA_PATHS = {
    books: 'data/book-refs/ocg-by-objective.json',
    tips: 'data/forum-tips.json'
  };

  const cache = { books: undefined, tips: undefined };
  const state = { open: false, tab: 'books', refId: null, lastFocus: null };
  const els = {};

  function injectCSS() {
    if (document.getElementById('drawer-css')) return;
    const css = `
      #strat-drawer{
        position:fixed;top:0;right:0;height:100vh;width:min(440px,92vw);
        background:var(--bg-surface,#fff);
        border-left:1px solid var(--border,#e2dfd9);
        box-shadow:-8px 0 32px rgba(0,0,0,.08);
        transform:translateX(100%);
        transition:transform .35s cubic-bezier(.16,1,.3,1);
        z-index:1000;display:flex;flex-direction:column;
        font-family:var(--font-body,'Source Serif 4',Georgia,serif);color:var(--ink,#1c1917);
      }
      #strat-drawer[data-open="true"]{transform:translateX(0)}
      #strat-drawer[hidden]{display:none!important}
      #strat-drawer .drawer-head{
        display:flex;align-items:center;justify-content:space-between;
        padding:18px 20px 0 24px;
      }
      #strat-drawer .drawer-eyebrow{
        font-family:var(--font-display,'Space Grotesk',sans-serif);
        font-size:.66rem;letter-spacing:.18em;text-transform:uppercase;
        color:var(--ink-muted,#a8a29e);font-weight:600;
      }
      #strat-drawer .drawer-close{
        background:none;border:0;cursor:pointer;
        font-family:var(--font-mono,monospace);font-size:1rem;
        color:var(--ink-muted,#a8a29e);padding:4px 10px;line-height:1;
      }
      #strat-drawer .drawer-close:hover{color:var(--ink,#1c1917)}
      #strat-drawer .drawer-tabs{
        display:flex;border-bottom:1px solid var(--rule,#d4d0c8);margin:14px 0 0;
      }
      #strat-drawer .drawer-tab{
        flex:1;background:none;border:0;padding:12px 8px;cursor:pointer;
        font-family:var(--font-display,'Space Grotesk',sans-serif);
        font-size:.74rem;letter-spacing:.14em;text-transform:uppercase;font-weight:600;
        color:var(--ink-muted,#a8a29e);border-bottom:2px solid transparent;
        transition:color .15s ease,border-color .15s ease;
      }
      #strat-drawer .drawer-tab:hover{color:var(--ink,#1c1917)}
      #strat-drawer .drawer-tab[aria-selected="true"]{
        color:var(--accent,#b45309);border-bottom-color:var(--accent,#b45309);
      }
      #strat-drawer .drawer-body{flex:1;overflow-y:auto;padding:18px 24px 32px}
      #strat-drawer .drawer-empty{
        font-family:var(--font-body,Georgia,serif);font-style:italic;
        color:var(--ink-muted,#a8a29e);font-size:.92rem;margin-top:40px;
        text-align:center;line-height:1.6;
      }
      #strat-drawer .ref-entry{padding:14px 0;border-bottom:1px dotted var(--rule,#d4d0c8)}
      #strat-drawer .ref-entry:last-child{border-bottom:none}
      #strat-drawer .ref-entry.target{
        background:var(--accent-dim,#fffbeb);margin:0 -12px;padding:14px 12px;
        border-radius:4px;border-left:3px solid var(--accent,#b45309);
      }
      #strat-drawer .ref-meta{
        font-family:var(--font-mono,monospace);font-size:.74rem;
        color:var(--ink-muted,#a8a29e);letter-spacing:.02em;margin-bottom:4px;
      }
      #strat-drawer .ref-title{
        font-family:var(--font-display,'Space Grotesk',sans-serif);font-weight:600;
        font-size:.98rem;color:var(--ink,#1c1917);margin-bottom:6px;line-height:1.3;
      }
      #strat-drawer .ref-body{font-size:.9rem;line-height:1.65;color:var(--ink-secondary,#57534e)}
      #strat-drawer .ref-body p+p{margin-top:8px}
      #strat-drawer .tips-section{margin-bottom:28px}
      #strat-drawer .tips-section:last-child{margin-bottom:0}
      #strat-drawer .tips-section h4{
        font-family:var(--font-display,sans-serif);font-size:.7rem;
        letter-spacing:.16em;text-transform:uppercase;
        color:var(--ink-muted,#a8a29e);font-weight:600;margin-bottom:10px;
      }
      #strat-drawer .tip{padding:12px 0;border-bottom:1px dotted var(--rule,#d4d0c8)}
      #strat-drawer .tip:last-child{border-bottom:none}
      #strat-drawer .tip-text{font-size:.92rem;line-height:1.6;color:var(--ink,#1c1917)}
      #strat-drawer .tip-meta{
        font-family:var(--font-mono,monospace);font-size:.7rem;
        color:var(--ink-muted,#a8a29e);margin-top:6px;
      }
      #strat-drawer .tip-meta a{color:var(--accent,#b45309);text-decoration:none}
      #strat-drawer .tip-meta a:hover{text-decoration:underline}
      .drawer-backdrop{
        position:fixed;inset:0;background:rgba(0,0,0,.18);opacity:0;
        transition:opacity .35s ease;pointer-events:none;z-index:999;
      }
      .drawer-backdrop[data-open="true"]{opacity:1;pointer-events:auto}
      @media (prefers-reduced-motion:reduce){
        #strat-drawer{transition:none}
        .drawer-backdrop{transition:none}
      }
    `;
    const style = document.createElement('style');
    style.id = 'drawer-css';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function ensureMount() {
    let aside = document.getElementById('strat-drawer');
    if (!aside) {
      aside = document.createElement('aside');
      aside.id = 'strat-drawer';
      aside.hidden = true;
      document.body.appendChild(aside);
    }
    aside.setAttribute('aria-label', 'References drawer');
    aside.setAttribute('role', 'complementary');
    aside.innerHTML = `
      <div class="drawer-head">
        <div class="drawer-eyebrow">References</div>
        <button class="drawer-close" type="button" aria-label="Close drawer">✕</button>
      </div>
      <div class="drawer-tabs" role="tablist">
        <button class="drawer-tab" role="tab" type="button" data-tab="books">Books</button>
        <button class="drawer-tab" role="tab" type="button" data-tab="tips">Tips</button>
        <button class="drawer-tab" role="tab" type="button" data-tab="explain">Explain</button>
      </div>
      <div class="drawer-body" role="tabpanel"></div>
    `;
    els.aside = aside;
    els.body = aside.querySelector('.drawer-body');
    els.tabs = Array.from(aside.querySelectorAll('.drawer-tab'));
    els.closeBtn = aside.querySelector('.drawer-close');

    let bd = document.querySelector('.drawer-backdrop');
    if (!bd) {
      bd = document.createElement('div');
      bd.className = 'drawer-backdrop';
      document.body.appendChild(bd);
    }
    els.backdrop = bd;
  }

  function getObjective() {
    const params = new URLSearchParams(location.search);
    return params.get('obj') || '1.1';
  }

  async function loadData(kind) {
    if (cache[kind] !== undefined) return cache[kind];
    try {
      const res = await fetch(DATA_PATHS[kind], { cache: 'no-cache' });
      if (!res.ok) throw new Error('http ' + res.status);
      cache[kind] = await res.json();
    } catch (e) {
      cache[kind] = null;
    }
    return cache[kind];
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[c]);
  }

  async function renderBooks(refId) {
    const data = await loadData('books');
    const obj = getObjective();
    const entries = (data && data[obj]) || [];
    if (!entries.length) {
      els.body.innerHTML = `<div class="drawer-empty">References coming soon — book extracts not yet generated for objective ${escapeHtml(obj)}.</div>`;
      return;
    }
    els.body.innerHTML = entries.map(e => {
      const id = `ocg-vol${e.volume}-p${e.page}`;
      const isTarget = refId === id;
      const paras = (e.paragraphs || []).map(p => `<p>${escapeHtml(p)}</p>`).join('');
      return `<div class="ref-entry${isTarget ? ' target' : ''}" data-id="${escapeHtml(id)}">
        <div class="ref-meta">OCG Vol ${escapeHtml(e.volume)} · ${escapeHtml(e.chapter || '')} · p.${escapeHtml(e.page)}</div>
        <div class="ref-title">${escapeHtml(e.title || '')}</div>
        <div class="ref-body">${paras}</div>
      </div>`;
    }).join('');
    if (refId) {
      const target = els.body.querySelector(`[data-id="${CSS.escape(refId)}"]`);
      if (target) target.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }

  async function renderTips(refId) {
    const data = await loadData('tips');
    const obj = getObjective();
    const bucket = (data && data[obj]) || { popular: [], trending: [] };
    const popular = bucket.popular || [];
    const trending = bucket.trending || [];

    if (!popular.length && !trending.length) {
      els.body.innerHTML = `<div class="drawer-empty">Community tips coming soon — none collected yet for objective ${escapeHtml(obj)}.</div>`;
      return;
    }

    const tipHtml = t => `<div class="tip">
      <div class="tip-text">${escapeHtml(t.tip || '')}</div>
      <div class="tip-meta">↑${escapeHtml(t.upvotes || 0)} · ${escapeHtml((t.postedISO || '').slice(0, 10))} · <a href="${escapeHtml(t.url || '#')}" target="_blank" rel="noopener">source</a></div>
    </div>`;

    const popSection = `<section class="tips-section" data-section="popular">
      <h4>Popular · all-time</h4>
      ${popular.length ? popular.map(tipHtml).join('') : '<div class="drawer-empty" style="margin-top:0">none yet</div>'}
    </section>`;
    const trendSection = `<section class="tips-section" data-section="trending">
      <h4>Trending · last 30 days</h4>
      ${trending.length ? trending.map(tipHtml).join('') : '<div class="drawer-empty" style="margin-top:0">none yet</div>'}
    </section>`;

    els.body.innerHTML = popSection + trendSection;

    if (refId) {
      const seg = String(refId).split('-').pop();
      const sec = els.body.querySelector(`[data-section="${CSS.escape(seg)}"]`);
      if (sec) sec.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }

  function renderExplain() {
    els.body.innerHTML = `
      <div class="drawer-explain">
        <p style="margin:0 0 12px;font-size:.9rem;color:var(--ink-muted,#666)">Type any CCNA concept. Gemini renders animated SVG, Mermaid flow, or comparison table.</p>
        <div style="display:flex;gap:8px;margin-bottom:14px">
          <input id="drawer-explain-input" type="text" placeholder='e.g. "longest prefix match"' style="flex:1;padding:8px 10px;border:1px solid var(--ink,#000);background:var(--bg,#fff);font:inherit">
          <button id="drawer-explain-go" type="button" style="padding:8px 14px;border:1px solid var(--ink,#000);background:var(--ink,#000);color:var(--bg,#fff);cursor:pointer;font:inherit">Explain</button>
        </div>
        <div id="drawer-explain-render" aria-live="polite"></div>
      </div>`;
    const input = els.body.querySelector('#drawer-explain-input');
    const go = els.body.querySelector('#drawer-explain-go');
    const target = els.body.querySelector('#drawer-explain-render');
    if (!input || !go || !target) return;
    if (window.explainer && typeof window.explainer.setTarget === 'function') {
      window.explainer.setTarget(target);
    }
    function fire() {
      if (!window.explainer || typeof window.explainer.render !== 'function') {
        target.innerHTML = '<p class="explainer-empty">Explainer not loaded.</p>';
        return;
      }
      window.explainer.render(input.value);
    }
    go.addEventListener('click', fire);
    input.addEventListener('keydown', function(e){ if (e.key === 'Enter') fire(); });
  }

  async function render() {
    els.tabs.forEach(t => {
      t.setAttribute('aria-selected', t.dataset.tab === state.tab ? 'true' : 'false');
    });
    if (state.tab === 'books') await renderBooks(state.refId);
    else if (state.tab === 'tips') await renderTips(state.refId);
    else renderExplain();
  }

  function open(tab, refId) {
    state.tab = (tab === 'tips' || tab === 'explain') ? tab : 'books';
    state.refId = refId || null;
    state.open = true;
    state.lastFocus = document.activeElement;
    els.aside.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      els.aside.dataset.open = 'true';
      els.backdrop.dataset.open = 'true';
      els.closeBtn.focus();
    }));
    render();
  }

  function close() {
    if (!state.open) return;
    state.open = false;
    els.aside.dataset.open = 'false';
    els.backdrop.dataset.open = 'false';
    setTimeout(() => {
      if (!state.open) els.aside.hidden = true;
    }, 360);
    if (state.lastFocus && state.lastFocus.focus) state.lastFocus.focus();
  }

  function isOpen() { return state.open; }

  function bind() {
    els.closeBtn.addEventListener('click', close);
    els.backdrop.addEventListener('click', close);
    els.tabs.forEach(t => t.addEventListener('click', () => {
      state.tab = t.dataset.tab;
      state.refId = null;
      render();
    }));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && state.open) close();
    });
    document.addEventListener('click', e => {
      const trigger = e.target.closest('[data-drawer-open]');
      if (!trigger) return;
      e.preventDefault();
      open(trigger.dataset.drawerOpen, trigger.dataset.drawerId);
    });
  }

  function init() {
    injectCSS();
    ensureMount();
    bind();
    window.drawer = { open, close, isOpen };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
