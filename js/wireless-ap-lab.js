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
    infra: new Map(),         // id -> { id, type, x, y } (Phase 4)
    pxPerMeter: 20,
    idSeq: 0,
    infraSeq: 0,
    selectedId: null,
    lastScore: null
  };

  let planEl = null;
  let catalogEl = null;
  let statusEl = null;
  let rfCanvasEl = null;
  let scoreEl = null;
  let capwapSvg = null;
  let infraButtonsEl = null;
  let missionEl = null;

  function nextId() {
    state.idSeq += 1;
    return 'ap-' + state.idSeq;
  }

  function nextInfraId(type) {
    state.infraSeq += 1;
    return type + '-' + state.infraSeq;
  }

  // Trigger RF heatmap redraw if APLabRF is loaded. Phase-2 wiring.
  function recomputeRF() {
    if (window.APLabRF && typeof window.APLabRF.recompute === 'function') {
      window.APLabRF.recompute(getLayout());
    }
  }

  // Phase-4: recompute scoring + redraw CAPWAP tunnels + status pills.
  // Phase-5: also evaluate active mission against current state.
  function recomputeScore() {
    if (!window.APLabScore) return;
    const wlans = (window.APLabConfig && typeof window.APLabConfig.getWlans === 'function')
      ? window.APLabConfig.getWlans() : [];
    const band = (window.APLabRF && typeof window.APLabRF.getBand === 'function')
      ? window.APLabRF.getBand() : '5';
    state.lastScore = window.APLabScore.compute(getLayout(), state.preset, wlans, { band: band });
    renderScoreboard();
    renderCapwapLines();
    refreshAllApPills();
    renderMissionPanel();
  }

  // Backward-compat: legacy APs lack mode / rrm / ft / kv / vlan / ip — apply defaults.
  function hydrateDefaults(ap) {
    if (ap.mode == null) ap.mode = 'local';
    if (ap.rrmEnabled == null) ap.rrmEnabled = true;
    if (ap.ft == null) ap.ft = false;
    if (ap.kvEnabled == null) ap.kvEnabled = false;
    if (ap.vlan == null) ap.vlan = 1;
    if (ap.ip == null) ap.ip = 'dhcp';
    if (ap.wlcJoinState == null) ap.wlcJoinState = 'Autonomous';
    return ap;
  }

  // Open Phase-3 config modal for given AP id.
  function openConfig(apId) {
    if (!window.APLabConfig || typeof window.APLabConfig.openModal !== 'function') return;
    const ap = state.aps.get(apId);
    if (!ap) return;
    hydrateDefaults(ap);
    window.APLabConfig.openModal(apId, ap, {
      onChange: function () {
        saveToStorage();
        recomputeRF();
        const el = planEl.querySelector('[data-ap-id="' + apId + '"]');
        if (el) {
          const labelEl = el.querySelector('.aplab-ap-label');
          if (labelEl) labelEl.textContent = apId + ' · ' + ap.model + (ap.mode && ap.mode !== 'local' ? ' [' + ap.mode + ']' : '');
        }
      }
    });
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
    if (rfCanvasEl && window.APLabRF && typeof window.APLabRF.attach === 'function') {
      window.APLabRF.attach(rfCanvasEl, state.preset, { pxPerMeter: state.pxPerMeter });
    }
    loadFromStorage();
    renderAllAPs();
    renderAllInfra();
    updateStatus();
    recomputeRF();
    recomputeScore();
  }

  function placeAP(model, xM, yM) {
    const def = APLabData.apCatalog.find(a => a.model === model);
    if (!def) {
      console.warn('[APLab] unknown AP model:', model);
      return null;
    }
    const id = nextId();
    const ap = hydrateDefaults({
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
    });
    state.aps.set(id, ap);
    renderAP(ap);
    saveToStorage();
    updateStatus();
    recomputeRF();
    recomputeScore();
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
    recomputeRF();
    recomputeScore();
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
    recomputeRF();
    recomputeScore();
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
    recomputeRF();
    recomputeScore();
  }

  // ── Phase 4: infrastructure (WLC / RADIUS) ───────────────────
  function placeInfra(type, xM, yM) {
    const def = (window.APLabData.infraCatalog || []).find(i => i.type === type);
    if (!def) return null;
    // Singleton: only one of each type
    const existing = Array.from(state.infra.values()).find(i => i.type === type);
    if (existing) return existing.id;
    const id = nextInfraId(type);
    const item = {
      id, type,
      x: clamp(xM != null ? xM : 2, 0.5, state.preset.widthM - 0.5),
      y: clamp(yM != null ? yM : 2, 0.5, state.preset.heightM - 0.5)
    };
    state.infra.set(id, item);
    renderInfraItem(item);
    saveToStorage();
    recomputeScore();
    return id;
  }

  function moveInfra(id, xM, yM) {
    const it = state.infra.get(id);
    if (!it) return;
    it.x = clamp(xM, 0.5, state.preset.widthM - 0.5);
    it.y = clamp(yM, 0.5, state.preset.heightM - 0.5);
    const el = planEl.querySelector('[data-infra-id="' + id + '"]');
    if (el) {
      el.style.left = (it.x * state.pxPerMeter) + 'px';
      el.style.top  = (it.y * state.pxPerMeter) + 'px';
    }
    saveToStorage();
    recomputeScore();
  }

  function deleteInfra(id) {
    if (!state.infra.has(id)) return;
    state.infra.delete(id);
    const el = planEl.querySelector('[data-infra-id="' + id + '"]');
    if (el) el.remove();
    saveToStorage();
    recomputeScore();
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
        status: ap.status,
        mode: ap.mode,
        rrmEnabled: ap.rrmEnabled,
        ft: ap.ft,
        kvEnabled: ap.kvEnabled,
        vlan: ap.vlan,
        ip: ap.ip,
        wlcJoinState: ap.wlcJoinState
      })),
      infra: Array.from(state.infra.values()).map(it => ({
        id: it.id, type: it.type, x: round2(it.x), y: round2(it.y)
      }))
    };
  }

  function loadLayout(layout) {
    if (!layout || layout.version !== LAYOUT_VERSION) return;
    if (layout.presetId !== state.presetId) return;
    state.aps.clear();
    state.infra.clear();
    state.idSeq = 0;
    state.infraSeq = 0;
    layout.aps.forEach(ap => {
      const hydrated = hydrateDefaults({ ...ap, radios: ap.radios.map(r => ({ ...r })) });
      state.aps.set(ap.id, hydrated);
      const n = parseInt(ap.id.split('-')[1], 10);
      if (Number.isFinite(n) && n > state.idSeq) state.idSeq = n;
    });
    (layout.infra || []).forEach(it => {
      state.infra.set(it.id, { ...it });
      const n = parseInt(it.id.split('-')[1], 10);
      if (Number.isFinite(n) && n > state.infraSeq) state.infraSeq = n;
    });
    renderAllAPs();
    renderAllInfra();
    saveToStorage();
    updateStatus();
    recomputeRF();
    recomputeScore();
  }

  function reset() {
    state.aps.clear();
    state.infra.clear();
    state.selectedId = null;
    localStorage.removeItem(STORAGE_KEY);
    renderAllAPs();
    renderAllInfra();
    updateStatus();
    recomputeRF();
    recomputeScore();
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
    state.infra.clear();
    state.idSeq = 0;
    state.infraSeq = 0;
    layout.aps.forEach(ap => {
      const hydrated = hydrateDefaults({ ...ap, radios: ap.radios.map(r => ({ ...r })) });
      state.aps.set(ap.id, hydrated);
      const n = parseInt(ap.id.split('-')[1], 10);
      if (Number.isFinite(n) && n > state.idSeq) state.idSeq = n;
    });
    (layout.infra || []).forEach(it => {
      state.infra.set(it.id, { ...it });
      const n = parseInt(it.id.split('-')[1], 10);
      if (Number.isFinite(n) && n > state.infraSeq) state.infraSeq = n;
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
      '<div class="aplab-infra-controls">' +
        '<h3 class="aplab-h3">Infrastructure</h3>' +
        '<div class="aplab-infra-btns" id="aplab-infra-btns"></div>' +
        '<p class="aplab-infra-hint">Click to add to the floor; lightweight APs draw a CAPWAP tunnel to the WLC. WPA-Enterprise WLANs need a RADIUS server.</p>' +
      '</div>' +
      '<div class="aplab-scoreboard" id="aplab-scoreboard">' +
        '<h3 class="aplab-h3">Design Score</h3>' +
        '<div class="aplab-score-empty">Place APs to score the design.</div>' +
      '</div>' +
      '<div class="aplab-mission" id="aplab-mission">' +
        '<h3 class="aplab-h3">Mission</h3>' +
        '<div class="aplab-mission-body"></div>' +
      '</div>' +
      '<div class="aplab-rf-controls">' +
        '<h3 class="aplab-h3">RF Heatmap</h3>' +
        '<div class="aplab-toggle" role="group" aria-label="Heatmap layer">' +
          '<button class="aplab-toggle-btn is-active" data-layer="aggregate">Aggregate</button>' +
          '<button class="aplab-toggle-btn" data-layer="off">Off</button>' +
        '</div>' +
        '<div class="aplab-toggle" role="group" aria-label="Heatmap band">' +
          '<button class="aplab-toggle-btn" data-band="2.4">2.4 GHz</button>' +
          '<button class="aplab-toggle-btn is-active" data-band="5">5 GHz</button>' +
        '</div>' +
        '<ul class="aplab-rf-legend">' +
          '<li><span class="aplab-rf-sw" style="background:#15803D"></span><span>≥ −55 dBm — saturated</span></li>' +
          '<li><span class="aplab-rf-sw" style="background:#22C55E"></span><span>≥ −65 dBm — voice / data</span></li>' +
          '<li><span class="aplab-rf-sw" style="background:#84CC16"></span><span>≥ −67 dBm — voice edge</span></li>' +
          '<li><span class="aplab-rf-sw" style="background:#EAB308"></span><span>≥ −75 dBm — data edge</span></li>' +
          '<li><span class="aplab-rf-sw" style="background:#F97316"></span><span>≥ −85 dBm — weak</span></li>' +
          '<li><span class="aplab-rf-sw" style="background:#DC2626"></span><span>&lt; −85 dBm — dead</span></li>' +
        '</ul>' +
      '</div>' +
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

    const rfCanvas = document.createElement('canvas');
    rfCanvas.className = 'aplab-rf-canvas';
    rfCanvas.id = 'aplab-rf';
    plan.appendChild(rfCanvas);

    // CAPWAP tunnel SVG layer (Phase 4)
    const svgNS = 'http://www.w3.org/2000/svg';
    capwapSvg = document.createElementNS(svgNS, 'svg');
    capwapSvg.setAttribute('class', 'aplab-capwap-svg');
    capwapSvg.setAttribute('width', String(state.preset.widthM * state.pxPerMeter));
    capwapSvg.setAttribute('height', String(state.preset.heightM * state.pxPerMeter));
    plan.appendChild(capwapSvg);

    planWrap.appendChild(plan);
    main.appendChild(planWrap);

    root.appendChild(sidebar);
    root.appendChild(main);

    planEl = plan;
    rfCanvasEl = rfCanvas;
    catalogEl = sidebar.querySelector('#aplab-catalog');
    statusEl = sidebar.querySelector('#aplab-status');
    scoreEl = sidebar.querySelector('#aplab-scoreboard');
    infraButtonsEl = sidebar.querySelector('#aplab-infra-btns');
    missionEl = sidebar.querySelector('#aplab-mission');

    renderCatalog();
    renderInfraButtons();
    renderMissionPanel();
    renderLegend(sidebar.querySelector('#aplab-legend-list'));

    sidebar.querySelector('#aplab-reset').addEventListener('click', () => {
      if (confirm('Clear all placed APs?')) reset();
    });

    // RF layer + band toggle bindings
    sidebar.querySelectorAll('[data-layer]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        sidebar.querySelectorAll('[data-layer]').forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        if (window.APLabRF && typeof window.APLabRF.setLayer === 'function') {
          window.APLabRF.setLayer(btn.dataset.layer);
        }
      });
    });
    sidebar.querySelectorAll('[data-band]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        sidebar.querySelectorAll('[data-band]').forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        if (window.APLabRF && typeof window.APLabRF.setBand === 'function') {
          window.APLabRF.setBand(btn.dataset.band);
        }
      });
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

  // ── Phase 4: infra panel + items + CAPWAP + scoreboard ───────
  function renderInfraButtons() {
    if (!infraButtonsEl) return;
    infraButtonsEl.innerHTML = '';
    (window.APLabData.infraCatalog || []).forEach(def => {
      const btn = document.createElement('button');
      btn.className = 'aplab-infra-btn';
      btn.dataset.infraType = def.type;
      btn.innerHTML =
        '<span class="aplab-infra-glyph" style="background:' + def.color + '">' + def.glyph + '</span>' +
        '<span class="aplab-infra-label">+ ' + def.label + '</span>';
      btn.addEventListener('click', () => {
        const existing = Array.from(state.infra.values()).find(i => i.type === def.type);
        if (existing) {
          // toggle delete on second click
          deleteInfra(existing.id);
        } else {
          // place at top-left corner area
          placeInfra(def.type, 3, 3);
        }
        renderInfraButtonsState();
      });
      infraButtonsEl.appendChild(btn);
    });
    renderInfraButtonsState();
  }

  function renderInfraButtonsState() {
    if (!infraButtonsEl) return;
    Array.from(infraButtonsEl.querySelectorAll('.aplab-infra-btn')).forEach(btn => {
      const t = btn.dataset.infraType;
      const placed = Array.from(state.infra.values()).some(i => i.type === t);
      btn.classList.toggle('is-placed', placed);
      btn.querySelector('.aplab-infra-label').textContent = placed ? '− Remove ' + t.toUpperCase() : '+ Add ' + t.toUpperCase();
    });
  }

  function renderInfraItem(item) {
    const def = (window.APLabData.infraCatalog || []).find(i => i.type === item.type);
    if (!def) return;
    let el = planEl.querySelector('[data-infra-id="' + item.id + '"]');
    if (!el) {
      el = document.createElement('div');
      el.className = 'aplab-infra-item aplab-infra-item-' + item.type;
      el.dataset.infraId = item.id;
      el.draggable = true;
      el.innerHTML =
        '<div class="aplab-infra-icon" style="background:' + def.color + '">' + def.glyph + '</div>' +
        '<div class="aplab-infra-tag">' + def.label + '</div>';
      el.addEventListener('dragstart', ev => {
        ev.dataTransfer.effectAllowed = 'move';
        ev.dataTransfer.setData('text/aplab-infra-move', item.id);
        ev.dataTransfer.setData('text/plain', 'aplab-infra-move:' + item.id);
        el.classList.add('dragging');
      });
      el.addEventListener('dragend', () => el.classList.remove('dragging'));
      el.addEventListener('contextmenu', ev => {
        ev.preventDefault();
        ev.stopPropagation();
        if (confirm('Remove ' + def.label + '?')) deleteInfra(item.id);
      });
      planEl.appendChild(el);
    }
    el.style.left = (item.x * state.pxPerMeter) + 'px';
    el.style.top  = (item.y * state.pxPerMeter) + 'px';
  }

  function renderAllInfra() {
    if (!planEl) return;
    Array.from(planEl.querySelectorAll('.aplab-infra-item')).forEach(el => el.remove());
    state.infra.forEach(item => renderInfraItem(item));
    renderInfraButtonsState();
    renderCapwapLines();
  }

  function renderCapwapLines() {
    if (!capwapSvg) return;
    while (capwapSvg.firstChild) capwapSvg.removeChild(capwapSvg.firstChild);
    const wlc = Array.from(state.infra.values()).find(i => i.type === 'wlc');
    if (!wlc) return;
    const px = state.pxPerMeter;
    state.aps.forEach(ap => {
      const mode = ap.mode || 'local';
      if (mode === 'autonomous') return;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', String(ap.x * px));
      line.setAttribute('y1', String(ap.y * px));
      line.setAttribute('x2', String(wlc.x * px));
      line.setAttribute('y2', String(wlc.y * px));
      line.setAttribute('class', 'aplab-capwap-line');
      capwapSvg.appendChild(line);
    });
  }

  function refreshAllApPills() {
    if (!planEl || !state.lastScore) return;
    const status = state.lastScore.apStatus || {};
    Array.from(planEl.querySelectorAll('.aplab-ap')).forEach(el => {
      const id = el.dataset.apId;
      let pill = el.querySelector('.aplab-ap-pill');
      const s = status[id] || 'up';
      if (!pill) {
        pill = document.createElement('span');
        pill.className = 'aplab-ap-pill';
        el.appendChild(pill);
      }
      pill.classList.remove('is-up', 'is-orphan', 'is-radius', 'is-misc');
      if (s === 'up') {
        pill.classList.add('is-up');
        pill.title = 'Up';
      } else if (s === 'orphan') {
        pill.classList.add('is-orphan');
        pill.title = 'Orphan — no WLC placed';
      } else if (s === 'radius_missing') {
        pill.classList.add('is-radius');
        pill.title = 'WPA-Enterprise WLAN active but no RADIUS server placed';
      } else {
        pill.classList.add('is-misc');
        pill.title = 'Misconfigured';
      }
    });
  }

  // Phase 5: mission panel — list, start, criteria checklist, radar button.
  function renderMissionPanel() {
    if (!missionEl) return;
    if (!window.APLabMissions) {
      missionEl.querySelector('.aplab-mission-body').innerHTML =
        '<div class="aplab-mission-empty">Mission engine not loaded.</div>';
      return;
    }
    const M = window.APLabMissions;
    const cur = M.current();
    const body = missionEl.querySelector('.aplab-mission-body');
    body.innerHTML = '';

    // Selector
    const sel = document.createElement('select');
    sel.className = 'aplab-input aplab-mission-select';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Select a mission…';
    sel.appendChild(placeholder);
    M.list.forEach(function (m) {
      const o = document.createElement('option');
      o.value = m.id;
      o.textContent = (m.type === 'test' ? '⚑ ' : '· ') + m.title;
      if (cur && cur.id === m.id) o.selected = true;
      sel.appendChild(o);
    });
    body.appendChild(sel);

    const btnRow = document.createElement('div');
    btnRow.className = 'aplab-mission-btns';

    const startBtn = document.createElement('button');
    startBtn.className = 'aplab-btn aplab-btn-ghost';
    startBtn.textContent = cur ? 'Restart' : 'Start';
    startBtn.addEventListener('click', function () {
      const id = sel.value;
      if (!id) return;
      M.start(id);
      renderMissionPanel();
      recomputeScore();
    });
    btnRow.appendChild(startBtn);

    body.appendChild(btnRow);

    if (cur) {
      const intro = document.createElement('p');
      intro.className = 'aplab-mission-intro';
      intro.textContent = cur.intro;
      body.appendChild(intro);

      const evalRes = M.evaluate(state.lastScore, getLayout(),
        (window.APLabConfig && window.APLabConfig.getWlans) ? window.APLabConfig.getWlans() : [],
        { band: (window.APLabRF && window.APLabRF.getBand) ? window.APLabRF.getBand() : '5' }
      );

      if (evalRes && evalRes.criteria) {
        const ul = document.createElement('ul');
        ul.className = 'aplab-mission-criteria';
        evalRes.criteria.forEach(function (c) {
          const li = document.createElement('li');
          li.className = c.met ? 'is-met' : '';
          li.innerHTML = '<span class="aplab-mission-tick">' + (c.met ? '✓' : '○') + '</span>' + '<span>' + escapeHtml(c.label) + '</span>';
          ul.appendChild(li);
        });
        body.appendChild(ul);

        if (evalRes.complete) {
          const banner = document.createElement('div');
          banner.className = 'aplab-mission-complete';
          banner.innerHTML = '✓ Mission complete' + (evalRes.score != null ? ' &middot; Score ' + evalRes.score + '/100' : '');
          body.appendChild(banner);

          // Next button only for guided missions
          if (cur.type === 'guided') {
            const nextBtn = document.createElement('button');
            nextBtn.className = 'aplab-btn';
            nextBtn.textContent = 'Next mission →';
            nextBtn.addEventListener('click', function () {
              M.next();
              renderMissionPanel();
              recomputeScore();
            });
            body.appendChild(nextBtn);
          }
        }
      }

      // DFS radar button — show in g8 or whenever a DFS-channel AP exists
      const layout = getLayout();
      const hasDfs = layout.aps.some(function (ap) {
        const r5 = (ap.radios || []).find(function (r) { return r.band === '5'; });
        return r5 && [52,56,60,64,100,104,108,112,116,132,136,140].indexOf(r5.channel) !== -1;
      });
      if (cur.id === 'g8' || hasDfs) {
        const radarBtn = document.createElement('button');
        radarBtn.className = 'aplab-btn aplab-btn-radar';
        radarBtn.textContent = '⚡ Trigger DFS Radar';
        radarBtn.disabled = !hasDfs;
        radarBtn.title = hasDfs ? 'Force any AP on a DFS channel to migrate' : 'Set an AP\'s 5 GHz channel to a DFS channel (52–144) first';
        radarBtn.addEventListener('click', function () {
          const result = window.APLabMissions.triggerRadar();
          if (result.migrated.length > 0) {
            const list = result.migrated.map(function (m) { return m.apId + ': ' + m.oldCh + '→' + m.newCh; }).join(', ');
            alert('DFS radar event! Migrated: ' + list);
          } else {
            alert('No APs on DFS channels — radar event had no effect.');
          }
          recomputeScore();
        });
        body.appendChild(radarBtn);
      }

      if (cur.hints && cur.hints.length > 0) {
        const hints = document.createElement('details');
        hints.className = 'aplab-mission-hints';
        const sum = document.createElement('summary');
        sum.textContent = 'Hints (' + cur.hints.length + ')';
        hints.appendChild(sum);
        const ul = document.createElement('ul');
        cur.hints.forEach(function (h) {
          const li = document.createElement('li');
          li.textContent = h;
          ul.appendChild(li);
        });
        hints.appendChild(ul);
        body.appendChild(hints);
      }
    } else {
      const empty = document.createElement('p');
      empty.className = 'aplab-mission-empty';
      empty.textContent = 'Pick a mission from the dropdown to begin.';
      body.appendChild(empty);
    }
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function renderScoreboard() {
    if (!scoreEl) return;
    const s = state.lastScore;
    if (!s || state.aps.size === 0) {
      scoreEl.innerHTML =
        '<h3 class="aplab-h3">Design Score</h3>' +
        '<div class="aplab-score-empty">Place APs to score the design.</div>';
      return;
    }
    const pct = function (n) { return Math.round(n * 100) + '%'; };
    const totalClass = s.total >= 80 ? 'good' : s.total >= 50 ? 'mid' : 'low';
    scoreEl.innerHTML =
      '<h3 class="aplab-h3">Design Score</h3>' +
      '<div class="aplab-score-total aplab-score-' + totalClass + '">' + s.total + ' <span>/100</span></div>' +
      '<ul class="aplab-score-list">' +
        '<li><span>Coverage</span><span>' + pct(s.coverage.percent) + '</span></li>' +
        '<li><span>Roaming</span><span>' + pct(s.roaming.percent) + '</span></li>' +
        '<li><span>CCI penalty</span><span>' + pct(s.cci.penalty) + ' (' + s.cci.hotCells + ' hot cells)</span></li>' +
        '<li><span>ACI penalty</span><span>' + pct(s.aci.penalty) + ' (' + s.aci.adjacentPairs + ' pairs)</span></li>' +
        '<li><span>Capacity</span><span>' + pct(s.capacity.score) + ' (' + s.capacity.apCount + ' APs)</span></li>' +
      '</ul>';
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

      el.addEventListener('dblclick', ev => {
        ev.stopPropagation();
        ev.preventDefault();
        openConfig(ap.id);
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

      const infraMoveId = ev.dataTransfer.getData('text/aplab-infra-move');
      if (infraMoveId) {
        moveInfra(infraMoveId, xM, yM);
        return;
      }
      const moveId = ev.dataTransfer.getData('text/aplab-move');
      if (moveId) {
        moveAP(moveId, xM, yM);
        return;
      }
      let model = ev.dataTransfer.getData('text/aplab-model');
      if (!model) {
        const fallback = ev.dataTransfer.getData('text/plain') || '';
        if (fallback.startsWith('aplab:')) model = fallback.slice(6);
        else if (fallback.startsWith('aplab-infra-move:')) {
          moveInfra(fallback.slice(17), xM, yM);
          return;
        }
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
      '<button data-act="configure">Configure</button>' +
      '<button data-act="clone">Clone</button>' +
      '<button data-act="delete">Delete</button>';
    document.body.appendChild(menu);
    menu.addEventListener('click', ev => {
      const act = ev.target.dataset.act;
      if (act === 'configure') openConfig(id);
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
    getLayout, loadLayout, reset, openConfig,
    placeInfra, moveInfra, deleteInfra
  };
})();
