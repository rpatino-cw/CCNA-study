/* wireless-ap-lab.js — placement engine for wireless-ap-lab.html
 * Depends on window.APLabData. Exposes window.APLab.
 *
 * Phase 1 scope: place / move / clone / delete APs on a floor plan,
 * persist layout to localStorage. No RF heatmap, no config modal yet.
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'apLab.layout.v1';
  const LAYOUT_VERSION = 1;

  // ── module state ─────────────────────────────────────────────
  const state = {
    rootEl: null,
    presetId: null,
    preset: null,
    aps: new Map(),           // id -> { id, model, x, y, radios, status }
    pxPerMeter: 20,
    idSeq: 0,
    selectedId: null
  };

  let planEl = null;
  let catalogEl = null;
  let statusEl = null;

  function nextId() {
    state.idSeq += 1;
    return 'ap-' + state.idSeq;
  }

  // ── public API ───────────────────────────────────────────────
  function init(rootEl, presetId) {
    if (!window.APLabData) {
      console.error('[APLab] APLabData not loaded');
      return;
    }
    const preset = APLabData.presets[presetId];
    if (!preset) {
      console.error('[APLab] unknown preset:', presetId);
      return;
    }
    state.rootEl = rootEl;
    state.presetId = presetId;
    state.preset = preset;
    state.aps.clear();
    state.idSeq = 0;
    state.selectedId = null;

    renderShell();
    renderPlanBackdrop();
    bindCatalogDrag();
    bindPlanEvents();
    bindGlobalKeys();
    loadFromStorage();
    renderAllAPs();
    updateStatus();
  }

  function placeAP(model, xM, yM) {
    const def = APLabData.apCatalog.find(a => a.model === model);
    if (!def) {
      console.warn('[APLab] unknown AP model:', model);
      return null;
    }
    const id = nextId();
    const ap = {
      id,
      model,
      x: clamp(xM, 0.5, state.preset.widthM - 0.5),
      y: clamp(yM, 0.5, state.preset.heightM - 0.5),
      radios: def.radios.map(r => ({
        band: r.band,
        channel: r.defaultCh,
        widthMhz: r.defaultWidthMhz,
        txDbm: r.defaultTxDbm
      })),
      status: 'up'
    };
    state.aps.set(id, ap);
    renderAP(ap);
    saveToStorage();
    updateStatus();
    return id;
  }

  function moveAP(id, xM, yM) {
    const ap = state.aps.get(id);
    if (!ap) return;
    ap.x = clamp(xM, 0.5, state.preset.widthM - 0.5);
    ap.y = clamp(yM, 0.5, state.preset.heightM - 0.5);
    const el = planEl.querySelector('[data-ap-id="' + id + '"]');
    if (el) {
      el.style.left = (ap.x * state.pxPerMeter) + 'px';
      el.style.top = (ap.y * state.pxPerMeter) + 'px';
    }
    saveToStorage();
  }

  function cloneAP(id) {
    const ap = state.aps.get(id);
    if (!ap) return null;
    const newId = nextId();
    const copy = {
      id: newId,
      model: ap.model,
      x: clamp(ap.x + 1.5, 0.5, state.preset.widthM - 0.5),
      y: clamp(ap.y + 1.5, 0.5, state.preset.heightM - 0.5),
      radios: ap.radios.map(r => ({ ...r })),
      status: 'up'
    };
    state.aps.set(newId, copy);
    renderAP(copy);
    saveToStorage();
    updateStatus();
    return newId;
  }

  function deleteAP(id) {
    if (!state.aps.has(id)) return;
    state.aps.delete(id);
    const el = planEl.querySelector('[data-ap-id="' + id + '"]');
    if (el) el.remove();
    if (state.selectedId === id) state.selectedId = null;
    saveToStorage();
    updateStatus();
  }

  function getLayout() {
    return {
      version: LAYOUT_VERSION,
      presetId: state.presetId,
      aps: Array.from(state.aps.values()).map(ap => ({
        id: ap.id,
        model: ap.model,
        x: round2(ap.x),
        y: round2(ap.y),
        radios: ap.radios.map(r => ({ ...r })),
        status: ap.status
      }))
    };
  }

  function loadLayout(layout) {
    if (!layout || layout.version !== LAYOUT_VERSION) return;
    if (layout.presetId !== state.presetId) return;
    state.aps.clear();
    state.idSeq = 0;
    layout.aps.forEach(ap => {
      state.aps.set(ap.id, { ...ap, radios: ap.radios.map(r => ({ ...r })) });
      const n = parseInt(ap.id.split('-')[1], 10);
      if (Number.isFinite(n) && n > state.idSeq) state.idSeq = n;
    });
    renderAllAPs();
    saveToStorage();
    updateStatus();
  }

  function reset() {
    state.aps.clear();
    state.selectedId = null;
    localStorage.removeItem(STORAGE_KEY);
    renderAllAPs();
    updateStatus();
  }

  // ── persistence ──────────────────────────────────────────────
  function saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(getLayout()));
    } catch (e) {
      console.warn('[APLab] localStorage save failed:', e);
    }
  }

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const layout = JSON.parse(raw);
      if (layout && layout.version === LAYOUT_VERSION && layout.presetId === state.presetId) {
        loadLayoutInternal(layout);
      }
    } catch (e) {
      console.warn('[APLab] localStorage load failed:', e);
    }
  }

  function loadLayoutInternal(layout) {
    state.aps.clear();
    state.idSeq = 0;
    layout.aps.forEach(ap => {
      state.aps.set(ap.id, { ...ap, radios: ap.radios.map(r => ({ ...r })) });
      const n = parseInt(ap.id.split('-')[1], 10);
      if (Number.isFinite(n) && n > state.idSeq) state.idSeq = n;
    });
  }

  // ── rendering ────────────────────────────────────────────────
  function renderShell() {
    const root = state.rootEl;
    root.innerHTML = '';
    root.classList.add('aplab-root');

    const sidebar = document.createElement('aside');
    sidebar.className = 'aplab-sidebar';
    sidebar.innerHTML =
      '<h2 class="aplab-h">AP Catalog</h2>' +
      '<p class="aplab-hint">Drag an AP onto the floor plan.</p>' +
      '<div class="aplab-catalog" id="aplab-catalog"></div>' +
      '<div class="aplab-controls">' +
        '<button class="aplab-btn aplab-btn-ghost" id="aplab-reset">Reset Layout</button>' +
      '</div>' +
      '<div class="aplab-status" id="aplab-status">No APs placed.</div>' +
      '<div class="aplab-legend">' +
        '<h3 class="aplab-h3">Wall Materials</h3>' +
        '<ul id="aplab-legend-list"></ul>' +
      '</div>';

    const main = document.createElement('main');
    main.className = 'aplab-main';

    const planWrap = document.createElement('div');
    planWrap.className = 'aplab-plan-wrap';

    const plan = document.createElement('div');
    plan.className = 'aplab-plan';
    plan.id = 'aplab-plan';
    plan.style.width = (state.preset.widthM * state.pxPerMeter) + 'px';
    plan.style.height = (state.preset.heightM * state.pxPerMeter) + 'px';

    planWrap.appendChild(plan);
    main.appendChild(planWrap);

    root.appendChild(sidebar);
    root.appendChild(main);

    planEl = plan;
    catalogEl = sidebar.querySelector('#aplab-catalog');
    statusEl = sidebar.querySelector('#aplab-status');

    renderCatalog();
    renderLegend(sidebar.querySelector('#aplab-legend-list'));

    sidebar.querySelector('#aplab-reset').addEventListener('click', () => {
      if (confirm('Clear all placed APs?')) reset();
    });
  }

  function renderCatalog() {
    catalogEl.innerHTML = '';
    APLabData.apCatalog.forEach(def => {
      const card = document.createElement('div');
      card.className = 'aplab-cat-card';
      card.draggable = true;
      card.dataset.model = def.model;
      card.innerHTML =
        '<div class="aplab-cat-head">' +
          '<span class="aplab-cat-glyph aplab-cat-' + def.type + '">' + def.glyph + '</span>' +
          '<div>' +
            '<div class="aplab-cat-model">' + def.model + '</div>' +
            '<div class="aplab-cat-vendor">' + def.vendor + ' · ' + def.type + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="aplab-cat-desc">' + def.description + '</div>' +
        '<div class="aplab-cat-meta">' + def.poeClass + ' · 2.4 + 5 GHz</div>';
      card.addEventListener('dragstart', ev => {
        ev.dataTransfer.effectAllowed = 'copy';
        ev.dataTransfer.setData('text/aplab-model', def.model);
        // Fallback for browsers that filter custom mime types.
        ev.dataTransfer.setData('text/plain', 'aplab:' + def.model);
        card.classList.add('dragging');
      });
      card.addEventListener('dragend', () => card.classList.remove('dragging'));
      catalogEl.appendChild(card);
    });
  }

  function renderLegend(ul) {
    if (!ul) return;
    ul.innerHTML = '';
    Object.entries(APLabData.wallMaterials).forEach(([key, mat]) => {
      const li = document.createElement('li');
      li.innerHTML =
        '<span class="aplab-legend-swatch" style="background:' + mat.color + '"></span>' +
        '<span>' + mat.label + '</span>';
      ul.appendChild(li);
    });
  }

  function renderPlanBackdrop() {
    // 1m grid lines
    const grid = document.createElement('div');
    grid.className = 'aplab-grid';
    grid.style.backgroundSize = state.pxPerMeter + 'px ' + state.pxPerMeter + 'px';
    planEl.appendChild(grid);

    // Walls
    state.preset.walls.forEach(w => {
      const mat = APLabData.wallMaterials[w.material];
      if (!mat) return;
      const wallEl = document.createElement('div');
      wallEl.className = 'aplab-wall';
      wallEl.title = mat.label;
      wallEl.dataset.material = w.material;
      const dx = (w.x2 - w.x1) * state.pxPerMeter;
      const dy = (w.y2 - w.y1) * state.pxPerMeter;
      const len = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      wallEl.style.left = (w.x1 * state.pxPerMeter) + 'px';
      wallEl.style.top = (w.y1 * state.pxPerMeter) + 'px';
      wallEl.style.width = len + 'px';
      wallEl.style.transform = 'rotate(' + angle + 'deg)';
      wallEl.style.background = mat.color;
      wallEl.style.height = (w.material === 'concrete' ? 4 : w.material === 'metal' ? 5 : 2) + 'px';
      planEl.appendChild(wallEl);
    });

    // Room labels
    (state.preset.labels || []).forEach(l => {
      const lbl = document.createElement('div');
      lbl.className = 'aplab-room-label';
      lbl.textContent = l.text;
      lbl.style.left = (l.x * state.pxPerMeter) + 'px';
      lbl.style.top = (l.y * state.pxPerMeter) + 'px';
      planEl.appendChild(lbl);
    });
  }

  function renderAP(ap) {
    let el = planEl.querySelector('[data-ap-id="' + ap.id + '"]');
    if (!el) {
      el = document.createElement('div');
      el.className = 'aplab-ap';
      el.dataset.apId = ap.id;
      el.draggable = true;

      el.innerHTML =
        '<div class="aplab-ap-icon"></div>' +
        '<div class="aplab-ap-label"></div>';

      el.addEventListener('dragstart', ev => {
        ev.dataTransfer.effectAllowed = 'move';
        ev.dataTransfer.setData('text/aplab-move', ap.id);
        ev.dataTransfer.setData('text/plain', 'aplab-move:' + ap.id);
        el.classList.add('dragging');
      });
      el.addEventListener('dragend', () => el.classList.remove('dragging'));

      el.addEventListener('click', ev => {
        ev.stopPropagation();
        selectAP(ap.id);
      });

      el.addEventListener('contextmenu', ev => {
        ev.preventDefault();
        ev.stopPropagation();
        showApMenu(ap.id, ev.clientX, ev.clientY);
      });

      planEl.appendChild(el);
    }
    const def = APLabData.apCatalog.find(a => a.model === ap.model);
    el.querySelector('.aplab-ap-icon').textContent = def ? def.glyph : '?';
    el.querySelector('.aplab-ap-label').textContent = ap.id + ' · ' + ap.model;
    el.style.left = (ap.x * state.pxPerMeter) + 'px';
    el.style.top = (ap.y * state.pxPerMeter) + 'px';
    el.classList.toggle('aplab-ap-selected', state.selectedId === ap.id);
  }

  function renderAllAPs() {
    // Remove existing
    Array.from(planEl.querySelectorAll('.aplab-ap')).forEach(el => el.remove());
    state.aps.forEach(ap => renderAP(ap));
  }

  function selectAP(id) {
    state.selectedId = id;
    Array.from(planEl.querySelectorAll('.aplab-ap')).forEach(el => {
      el.classList.toggle('aplab-ap-selected', el.dataset.apId === id);
    });
  }

  // ── plan event binding ───────────────────────────────────────
  function bindPlanEvents() {
    planEl.addEventListener('dragover', ev => {
      ev.preventDefault();
      ev.dataTransfer.dropEffect = ev.dataTransfer.types.includes('text/aplab-move') ? 'move' : 'copy';
    });

    planEl.addEventListener('drop', ev => {
      ev.preventDefault();
      const rect = planEl.getBoundingClientRect();
      const xM = (ev.clientX - rect.left) / state.pxPerMeter;
      const yM = (ev.clientY - rect.top) / state.pxPerMeter;

      const moveId = ev.dataTransfer.getData('text/aplab-move');
      if (moveId) {
        moveAP(moveId, xM, yM);
        return;
      }
      let model = ev.dataTransfer.getData('text/aplab-model');
      if (!model) {
        const fallback = ev.dataTransfer.getData('text/plain') || '';
        if (fallback.startsWith('aplab:')) model = fallback.slice(6);
      }
      if (model) placeAP(model, xM, yM);
    });

    planEl.addEventListener('click', () => selectAP(null));
  }

  function bindCatalogDrag() {
    // dragstart bound per-card in renderCatalog
  }

  function bindGlobalKeys() {
    document.addEventListener('keydown', ev => {
      if (!state.selectedId) return;
      const tag = (ev.target && ev.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (ev.key === 'Delete' || ev.key === 'Backspace') {
        ev.preventDefault();
        deleteAP(state.selectedId);
      } else if (ev.key === 'd' && (ev.metaKey || ev.ctrlKey)) {
        ev.preventDefault();
        cloneAP(state.selectedId);
      }
    });
  }

  // ── context menu ─────────────────────────────────────────────
  function showApMenu(id, x, y) {
    closeApMenu();
    const menu = document.createElement('div');
    menu.className = 'aplab-menu';
    menu.id = 'aplab-menu';
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';
    menu.innerHTML =
      '<button data-act="clone">Clone</button>' +
      '<button data-act="delete">Delete</button>';
    document.body.appendChild(menu);
    menu.addEventListener('click', ev => {
      const act = ev.target.dataset.act;
      if (act === 'clone') cloneAP(id);
      if (act === 'delete') deleteAP(id);
      closeApMenu();
    });
    setTimeout(() => {
      document.addEventListener('click', closeApMenu, { once: true });
    }, 0);
  }

  function closeApMenu() {
    const m = document.getElementById('aplab-menu');
    if (m) m.remove();
  }

  // ── status bar ───────────────────────────────────────────────
  function updateStatus() {
    if (!statusEl) return;
    const n = state.aps.size;
    if (n === 0) {
      statusEl.textContent = 'No APs placed.';
    } else {
      statusEl.textContent = n + (n === 1 ? ' AP placed.' : ' APs placed.');
    }
  }

  // ── helpers ──────────────────────────────────────────────────
  function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }
  function round2(n) { return Math.round(n * 100) / 100; }

  // ── export ───────────────────────────────────────────────────
  window.APLab = {
    init, placeAP, moveAP, cloneAP, deleteAP,
    getLayout, loadLayout, reset
  };
})();
