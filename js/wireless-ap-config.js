/* wireless-ap-config.js — AP configuration modal (Phase 3)
 * Depends on window.APLabData. Exposes window.APLabConfig.
 *
 * Modal tabs: Radio · SSID/WLAN · Network · Advanced
 * WLAN store: global list, persisted to localStorage `apLab.wlans.v1`.
 */
(function () {
  'use strict';

  const WLAN_KEY = 'apLab.wlans.v1';
  const WLAN_VERSION = 1;

  // ── module state ─────────────────────────────────────────────
  const state = {
    isOpen: false,
    apId: null,
    ap: null,
    callbacks: null,
    activeTab: 'radio',
    wlans: [],
    wlanIdSeq: 0
  };

  let modalEl = null;
  let panelEl = null;

  // ── WLAN store ───────────────────────────────────────────────
  function loadWlans() {
    try {
      const raw = localStorage.getItem(WLAN_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.version === WLAN_VERSION && Array.isArray(parsed.wlans)) {
          state.wlans = parsed.wlans.map(w => ({ ...w }));
          recomputeWlanSeq();
          return;
        }
      }
    } catch (e) { /* ignore */ }
    // seed defaults
    state.wlans = (window.APLabData.defaultWlans || []).map(w => ({ ...w }));
    recomputeWlanSeq();
    saveWlans();
  }

  function saveWlans() {
    try {
      localStorage.setItem(WLAN_KEY, JSON.stringify({ version: WLAN_VERSION, wlans: state.wlans }));
    } catch (e) { /* ignore */ }
  }

  function recomputeWlanSeq() {
    state.wlanIdSeq = state.wlans.reduce((m, w) => {
      const n = parseInt((w.id || '').split('-')[1], 10);
      return Number.isFinite(n) && n > m ? n : m;
    }, 0);
  }

  function nextWlanId() {
    state.wlanIdSeq += 1;
    return 'wlan-' + state.wlanIdSeq;
  }

  // ── public API ───────────────────────────────────────────────
  function openModal(apId, ap, callbacks) {
    if (!ap) return;
    if (state.wlans.length === 0) loadWlans();
    state.isOpen = true;
    state.apId = apId;
    state.ap = ap;
    state.callbacks = callbacks || {};
    state.activeTab = 'radio';
    render();
    document.addEventListener('keydown', onKeyDown);
  }

  function closeModal() {
    if (!state.isOpen) return;
    state.isOpen = false;
    state.apId = null;
    state.ap = null;
    if (state.callbacks && typeof state.callbacks.onClose === 'function') {
      state.callbacks.onClose();
    }
    state.callbacks = null;
    if (modalEl) modalEl.classList.remove('is-open');
    document.removeEventListener('keydown', onKeyDown);
  }

  function getWlans() { return state.wlans.map(w => ({ ...w })); }

  function setWlans(list) {
    state.wlans = (list || []).map(w => ({ ...w }));
    recomputeWlanSeq();
    saveWlans();
    if (state.isOpen) renderTabBody();
  }

  function isOpen() { return state.isOpen; }

  // ── mutation + change propagation ────────────────────────────
  function mutateAp(fn) {
    if (!state.ap) return;
    fn(state.ap);
    if (state.callbacks && typeof state.callbacks.onChange === 'function') {
      state.callbacks.onChange(state.ap);
    }
    renderTabBody();
  }

  // ── DOM construction ─────────────────────────────────────────
  function ensureRoot() {
    if (modalEl && document.body.contains(modalEl)) return;
    modalEl = document.getElementById('aplab-modal');
    if (!modalEl) {
      modalEl = document.createElement('div');
      modalEl.id = 'aplab-modal';
      modalEl.className = 'aplab-modal';
      document.body.appendChild(modalEl);
    }
  }

  function render() {
    ensureRoot();
    if (state.wlans.length === 0) loadWlans();

    const def = window.APLabData.apCatalog.find(a => a.model === state.ap.model) || { model: state.ap.model };

    modalEl.innerHTML = '';
    const backdrop = document.createElement('div');
    backdrop.className = 'aplab-modal-backdrop';
    backdrop.addEventListener('click', closeModal);
    modalEl.appendChild(backdrop);

    panelEl = document.createElement('div');
    panelEl.className = 'aplab-modal-panel';
    panelEl.setAttribute('role', 'dialog');
    panelEl.setAttribute('aria-modal', 'true');

    // Header
    const head = document.createElement('header');
    head.className = 'aplab-modal-head';
    head.innerHTML =
      '<div class="aplab-modal-title">' +
        '<div class="aplab-modal-id">' + state.apId + '</div>' +
        '<div class="aplab-modal-model">' + def.model + ' &middot; ' + (def.vendor || '') + '</div>' +
      '</div>' +
      '<button class="aplab-modal-close" aria-label="Close">&times;</button>';
    head.querySelector('.aplab-modal-close').addEventListener('click', closeModal);
    panelEl.appendChild(head);

    // Tabs
    const tabs = document.createElement('div');
    tabs.className = 'aplab-modal-tabs';
    [
      { id: 'radio',    label: 'Radio' },
      { id: 'ssid',     label: 'SSID / WLAN' },
      { id: 'network',  label: 'Network' },
      { id: 'advanced', label: 'Advanced' }
    ].forEach(t => {
      const btn = document.createElement('button');
      btn.className = 'aplab-modal-tab' + (state.activeTab === t.id ? ' is-active' : '');
      btn.textContent = t.label;
      btn.dataset.tab = t.id;
      btn.addEventListener('click', () => {
        state.activeTab = t.id;
        Array.from(tabs.children).forEach(c => c.classList.toggle('is-active', c.dataset.tab === t.id));
        renderTabBody();
      });
      tabs.appendChild(btn);
    });
    panelEl.appendChild(tabs);

    // Body
    const body = document.createElement('div');
    body.className = 'aplab-modal-body';
    body.id = 'aplab-modal-body';
    panelEl.appendChild(body);

    modalEl.appendChild(panelEl);
    modalEl.classList.add('is-open');

    renderTabBody();
  }

  function renderTabBody() {
    const body = document.getElementById('aplab-modal-body');
    if (!body) return;
    body.innerHTML = '';
    if (state.activeTab === 'radio')         body.appendChild(renderRadioTab());
    else if (state.activeTab === 'ssid')     body.appendChild(renderSsidTab());
    else if (state.activeTab === 'network')  body.appendChild(renderNetworkTab());
    else if (state.activeTab === 'advanced') body.appendChild(renderAdvancedTab());
  }

  // ── Radio tab ────────────────────────────────────────────────
  function renderRadioTab() {
    const wrap = document.createElement('div');
    wrap.className = 'aplab-tab-radio';

    const def = window.APLabData.apCatalog.find(a => a.model === state.ap.model);
    if (!def) {
      wrap.textContent = 'Unknown AP model.';
      return wrap;
    }

    state.ap.radios.forEach((radio, idx) => {
      const radioDef = def.radios.find(r => r.band === radio.band);
      if (!radioDef) return;

      const card = document.createElement('section');
      card.className = 'aplab-radio-card';
      card.innerHTML =
        '<h3 class="aplab-radio-band">' + radio.band + ' GHz radio</h3>' +
        '<div class="aplab-form-grid"></div>';
      const grid = card.querySelector('.aplab-form-grid');

      // Channel
      const chSel = makeSelect(
        radioDef.channels.map(c => ({
          value: String(c.ch),
          label: 'Ch ' + c.ch + (c.dfs ? ' (DFS)' : '')
        })),
        String(radio.channel)
      );
      chSel.addEventListener('change', () => {
        const newCh = parseInt(chSel.value, 10);
        mutateAp(ap => { ap.radios[idx].channel = newCh; });
      });
      grid.appendChild(makeRow('Channel', chSel));

      // DFS warning
      const isDfs = (radioDef.channels.find(c => c.ch === radio.channel) || {}).dfs;
      if (isDfs) {
        const warn = document.createElement('div');
        warn.className = 'aplab-pill aplab-pill-warn';
        warn.textContent = 'DFS — radar event will force migration';
        grid.appendChild(makeRow('', warn));
      }

      // Width
      const widthOpts = radio.band === '2.4'
        ? [{ value: '20', label: '20 MHz' }]
        : [{ value: '20', label: '20 MHz' }, { value: '40', label: '40 MHz' }, { value: '80', label: '80 MHz' }];
      const widthSel = makeSelect(widthOpts, String(radio.widthMhz || 20));
      widthSel.addEventListener('change', () => {
        const w = parseInt(widthSel.value, 10);
        mutateAp(ap => { ap.radios[idx].widthMhz = w; });
      });
      grid.appendChild(makeRow('Width', widthSel));

      // Tx Power
      const txWrap = document.createElement('div');
      txWrap.className = 'aplab-tx-wrap';
      const txInput = document.createElement('input');
      txInput.type = 'range';
      txInput.min = '1';
      txInput.max = String(radioDef.maxTxDbm);
      txInput.step = '1';
      txInput.value = String(radio.txDbm);
      const txReadout = document.createElement('span');
      txReadout.className = 'aplab-tx-readout';
      txReadout.textContent = radio.txDbm + ' dBm';
      txInput.addEventListener('input', () => {
        const v = parseInt(txInput.value, 10);
        txReadout.textContent = v + ' dBm';
        mutateAp(ap => { ap.radios[idx].txDbm = v; });
      });
      txWrap.appendChild(txInput);
      txWrap.appendChild(txReadout);
      grid.appendChild(makeRow('Tx Power (max ' + radioDef.maxTxDbm + ' dBm)', txWrap));

      wrap.appendChild(card);
    });

    return wrap;
  }

  // ── SSID tab ─────────────────────────────────────────────────
  function renderSsidTab() {
    const wrap = document.createElement('div');
    wrap.className = 'aplab-tab-ssid';

    const intro = document.createElement('p');
    intro.className = 'aplab-tab-hint';
    intro.textContent = 'WLANs are global — every AP broadcasts every WLAN that matches its band.';
    wrap.appendChild(intro);

    const list = document.createElement('div');
    list.className = 'aplab-wlan-list';
    state.wlans.forEach(wlan => list.appendChild(renderWlanRow(wlan)));
    wrap.appendChild(list);

    const addBtn = document.createElement('button');
    addBtn.className = 'aplab-btn aplab-btn-ghost';
    addBtn.textContent = '+ Add WLAN';
    addBtn.addEventListener('click', () => {
      const w = {
        id: nextWlanId(),
        name: 'WLAN-' + state.wlanIdSeq,
        band: 'both',
        security: 'wpa2-psk',
        vlan: 10,
        hidden: false,
        broadcast: true,
        passphrase: 'changeme1',
        radiusServer: ''
      };
      state.wlans.push(w);
      saveWlans();
      renderTabBody();
    });
    wrap.appendChild(addBtn);

    return wrap;
  }

  function renderWlanRow(wlan) {
    const row = document.createElement('div');
    row.className = 'aplab-wlan-row';
    row.dataset.wlanId = wlan.id;

    const secModes = window.APLabData.wlanSecurityModes;
    const sec = secModes.find(m => m.id === wlan.security) || secModes[0];

    // Name
    const nameInp = document.createElement('input');
    nameInp.type = 'text';
    nameInp.value = wlan.name;
    nameInp.className = 'aplab-input';
    nameInp.addEventListener('input', () => {
      wlan.name = nameInp.value;
      saveWlans();
    });

    // Band
    const bandSel = makeSelect([
      { value: 'both', label: 'Both' },
      { value: '2.4',  label: '2.4 GHz' },
      { value: '5',    label: '5 GHz' }
    ], wlan.band);
    bandSel.addEventListener('change', () => { wlan.band = bandSel.value; saveWlans(); });

    // Security
    const secSel = makeSelect(secModes.map(m => ({ value: m.id, label: m.label })), wlan.security);
    secSel.addEventListener('change', () => {
      wlan.security = secSel.value;
      saveWlans();
      renderTabBody();
    });

    // VLAN
    const vlanInp = document.createElement('input');
    vlanInp.type = 'number';
    vlanInp.min = '1';
    vlanInp.max = '4094';
    vlanInp.value = String(wlan.vlan || 1);
    vlanInp.className = 'aplab-input aplab-input-num';
    vlanInp.addEventListener('input', () => {
      const v = parseInt(vlanInp.value, 10);
      if (Number.isFinite(v) && v >= 1 && v <= 4094) { wlan.vlan = v; saveWlans(); }
    });

    // Delete
    const delBtn = document.createElement('button');
    delBtn.className = 'aplab-btn-icon';
    delBtn.title = 'Delete WLAN';
    delBtn.innerHTML = '&times;';
    delBtn.addEventListener('click', () => {
      state.wlans = state.wlans.filter(w => w.id !== wlan.id);
      saveWlans();
      renderTabBody();
    });

    row.appendChild(makeMicroField('Name', nameInp));
    row.appendChild(makeMicroField('Band', bandSel));
    row.appendChild(makeMicroField('Security', secSel));
    row.appendChild(makeMicroField('VLAN', vlanInp));
    row.appendChild(delBtn);

    // Conditional: passphrase or RADIUS
    if (sec.requiresPassphrase) {
      const passInp = document.createElement('input');
      passInp.type = 'text';
      passInp.value = wlan.passphrase || '';
      passInp.className = 'aplab-input';
      passInp.placeholder = '≥ 8 chars';
      passInp.addEventListener('input', () => { wlan.passphrase = passInp.value; saveWlans(); });
      const cond = document.createElement('div');
      cond.className = 'aplab-wlan-cond';
      cond.appendChild(makeMicroField('Passphrase', passInp));
      if ((wlan.passphrase || '').length < 8) {
        const warn = document.createElement('span');
        warn.className = 'aplab-pill aplab-pill-warn';
        warn.textContent = 'Weak — pick ≥ 8 chars';
        cond.appendChild(warn);
      }
      row.appendChild(cond);
    } else if (sec.requiresRadius) {
      const rInp = document.createElement('input');
      rInp.type = 'text';
      rInp.value = wlan.radiusServer || '';
      rInp.placeholder = 'radius.corp.example';
      rInp.className = 'aplab-input';
      rInp.addEventListener('input', () => { wlan.radiusServer = rInp.value; saveWlans(); });
      const cond = document.createElement('div');
      cond.className = 'aplab-wlan-cond';
      cond.appendChild(makeMicroField('RADIUS server', rInp));
      if (!(wlan.radiusServer || '').trim()) {
        const warn = document.createElement('span');
        warn.className = 'aplab-pill aplab-pill-info';
        warn.textContent = 'RADIUS required (Phase 4 places one)';
        cond.appendChild(warn);
      }
      row.appendChild(cond);
    }

    return row;
  }

  // ── Network tab ──────────────────────────────────────────────
  function renderNetworkTab() {
    const wrap = document.createElement('div');
    wrap.className = 'aplab-tab-network';

    const grid = document.createElement('div');
    grid.className = 'aplab-form-grid';

    const vlanInp = document.createElement('input');
    vlanInp.type = 'number';
    vlanInp.min = '1';
    vlanInp.max = '4094';
    vlanInp.value = String(state.ap.vlan || 1);
    vlanInp.className = 'aplab-input aplab-input-num';
    vlanInp.addEventListener('input', () => {
      const v = parseInt(vlanInp.value, 10);
      if (Number.isFinite(v) && v >= 1 && v <= 4094) {
        mutateAp(ap => { ap.vlan = v; });
      }
    });
    grid.appendChild(makeRow('Mgmt VLAN', vlanInp));

    const ipInp = document.createElement('input');
    ipInp.type = 'text';
    ipInp.value = state.ap.ip || 'dhcp';
    ipInp.placeholder = 'dhcp or 192.168.10.x';
    ipInp.className = 'aplab-input';
    ipInp.addEventListener('input', () => {
      mutateAp(ap => { ap.ip = ipInp.value; });
    });
    grid.appendChild(makeRow('AP IP', ipInp));

    const wlcReadout = document.createElement('div');
    wlcReadout.className = 'aplab-readout';
    wlcReadout.textContent = state.ap.wlcJoinState || 'Autonomous (no WLC placed)';
    grid.appendChild(makeRow('WLC join', wlcReadout));

    const note = document.createElement('p');
    note.className = 'aplab-tab-hint';
    note.textContent = 'WLC discovery order: DHCP option 43 → DNS (CISCO-CAPWAP-CONTROLLER) → broadcast. CAPWAP control:5246 + data:5247. WLC placement arrives in Phase 4.';

    wrap.appendChild(grid);
    wrap.appendChild(note);
    return wrap;
  }

  // ── Advanced tab ─────────────────────────────────────────────
  function renderAdvancedTab() {
    const wrap = document.createElement('div');
    wrap.className = 'aplab-tab-advanced';

    const grid = document.createElement('div');
    grid.className = 'aplab-form-grid';

    // AP mode
    const modeSel = makeSelect(
      window.APLabData.apModes.map(m => ({ value: m.id, label: m.label })),
      state.ap.mode || 'local'
    );
    modeSel.addEventListener('change', () => {
      mutateAp(ap => { ap.mode = modeSel.value; });
    });
    grid.appendChild(makeRow('AP mode', modeSel));

    const modeDef = window.APLabData.apModes.find(m => m.id === (state.ap.mode || 'local'));
    if (modeDef) {
      const desc = document.createElement('div');
      desc.className = 'aplab-readout';
      desc.textContent = modeDef.description;
      grid.appendChild(makeRow('', desc));
    }

    // RRM toggle
    grid.appendChild(makeRow('RRM (auto channel/power)', makeToggle(
      state.ap.rrmEnabled !== false,
      v => mutateAp(ap => { ap.rrmEnabled = v; })
    )));

    // 802.11r FT
    grid.appendChild(makeRow('802.11r Fast Transition', makeToggle(
      !!state.ap.ft,
      v => mutateAp(ap => { ap.ft = v; })
    )));

    // 802.11k/v
    grid.appendChild(makeRow('802.11k/v assisted roaming', makeToggle(
      !!state.ap.kvEnabled,
      v => mutateAp(ap => { ap.kvEnabled = v; })
    )));

    wrap.appendChild(grid);
    return wrap;
  }

  // ── form helpers ─────────────────────────────────────────────
  function makeRow(label, control) {
    const row = document.createElement('div');
    row.className = 'aplab-form-row';
    if (label) {
      const lbl = document.createElement('label');
      lbl.className = 'aplab-form-label';
      lbl.textContent = label;
      row.appendChild(lbl);
    } else {
      row.appendChild(document.createElement('span'));
    }
    row.appendChild(control);
    return row;
  }

  function makeMicroField(label, control) {
    const f = document.createElement('div');
    f.className = 'aplab-micro-field';
    const lbl = document.createElement('span');
    lbl.className = 'aplab-micro-label';
    lbl.textContent = label;
    f.appendChild(lbl);
    f.appendChild(control);
    return f;
  }

  function makeSelect(options, current) {
    const sel = document.createElement('select');
    sel.className = 'aplab-input';
    options.forEach(opt => {
      const o = document.createElement('option');
      o.value = opt.value;
      o.textContent = opt.label;
      if (opt.value === current) o.selected = true;
      sel.appendChild(o);
    });
    return sel;
  }

  function makeToggle(initial, onChange) {
    const lbl = document.createElement('label');
    lbl.className = 'aplab-toggle-switch';
    const inp = document.createElement('input');
    inp.type = 'checkbox';
    inp.checked = !!initial;
    inp.addEventListener('change', () => onChange(inp.checked));
    const slider = document.createElement('span');
    slider.className = 'aplab-toggle-slider';
    lbl.appendChild(inp);
    lbl.appendChild(slider);
    return lbl;
  }

  function onKeyDown(ev) {
    if (ev.key === 'Escape') { ev.preventDefault(); closeModal(); }
  }

  // ── export ───────────────────────────────────────────────────
  window.APLabConfig = {
    openModal: openModal,
    closeModal: closeModal,
    getWlans: getWlans,
    setWlans: setWlans,
    isOpen: isOpen,
    // test surface:
    _state: state,
    _loadWlans: loadWlans
  };
})();
