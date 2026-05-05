/* wireless-ap-missions.js — Phase 5 mission engine
 * 8 guided + 2 scored test missions. DFS radar event sim.
 * Depends on window.APLab (must be initialized) and window.APLabData.
 * Exposes window.APLabMissions.
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'apLab.mission.v1';
  const DFS_CHANNELS = [52,56,60,64,100,104,108,112,116,132,136,140];
  const SAFE_5GHZ = [36,40,44,48,149,153,157,161,165];

  const state = {
    currentId: null,
    dfsRadarFired: false,
    radarHistory: []
  };

  // ── mission set ──────────────────────────────────────────────
  const list = [
    {
      id: 'g1',
      type: 'guided',
      title: 'Place a single AP',
      intro: 'Drag a C9120AXI from the catalog onto the floor plan. Get the heatmap to cover at least half the building.',
      hints: [
        'Click an empty spot — coverage decays w/ distance and walls.',
        'Default 5 GHz Tx Power is 17 dBm; that\'s fine for now.'
      ],
      criteria: [
        { id: 'aps_1', label: '1 AP placed', check: ({ layout }) => layout.aps.length >= 1 },
        { id: 'cov_50', label: 'Coverage ≥ 50%', check: ({ score }) => score && score.coverage.percent >= 0.5 }
      ]
    },
    {
      id: 'g2',
      type: 'guided',
      title: 'Secure a WLAN with WPA2-Personal',
      intro: 'Open the AP config (double-click). Switch to SSID/WLAN tab. Edit Corp or add a WLAN with security WPA2-Personal (PSK).',
      hints: [
        'WPA2-PSK is the home/SMB pre-shared-key flavor — passphrase ≥ 8 chars.',
        'CCNA covers WPA1/2/3 + Enterprise vs Personal — see SSID tab dropdown.'
      ],
      criteria: [
        { id: 'wpa2psk', label: 'A WLAN with security WPA2-Personal exists', check: ({ wlans }) => (wlans || []).some(w => w.security === 'wpa2-psk') }
      ]
    },
    {
      id: 'g3',
      type: 'guided',
      title: 'Two APs, non-overlapping channel',
      intro: 'Add a second AP. Configure each AP\'s 5 GHz radio to a different channel so the two heard cells do not overlap on the same channel.',
      hints: [
        'Co-channel interference (CCI) drops throughput catastrophically.',
        'On 5 GHz the easiest non-overlap is two channels far apart, e.g. 36 vs 149.'
      ],
      criteria: [
        { id: 'aps_2', label: '2 APs placed', check: ({ layout }) => layout.aps.length >= 2 },
        { id: 'no_cci', label: 'No CCI hot cells on selected band', check: ({ score }) => score && score.cci.hotCells === 0 }
      ]
    },
    {
      id: 'g4',
      type: 'guided',
      title: 'Cover all 4 rooms — channel reuse',
      intro: 'Place 4 or more APs covering Open Office A, Conf, Open Office B, Lab. Use a 1-6-11 reuse pattern on 2.4 GHz, or pick four well-spaced 5 GHz channels.',
      hints: [
        '2.4 GHz only has 3 non-overlapping channels (1, 6, 11) — reuse them.',
        '5 GHz has 9 non-DFS channels at 20 MHz; you have plenty of room.'
      ],
      criteria: [
        { id: 'aps_4', label: '≥ 4 APs placed', check: ({ layout }) => layout.aps.length >= 4 },
        { id: 'cov_75', label: 'Coverage ≥ 75%', check: ({ score }) => score && score.coverage.percent >= 0.75 },
        { id: 'cci_low', label: 'CCI penalty < 0.30', check: ({ score }) => score && score.cci.penalty < 0.30 }
      ]
    },
    {
      id: 'g5',
      type: 'guided',
      title: 'Switch heatmap to 5 GHz',
      intro: 'In the RF Heatmap controls, click "5 GHz". Coverage cells are tighter on 5 GHz (more path loss); confirm coverage holds up.',
      hints: [
        '5 GHz: more bandwidth, shorter range, less interference.',
        '2.4 GHz: longer reach but 3 channels and crowded by other devices.'
      ],
      criteria: [
        { id: 'band_5', label: 'Heatmap band = 5 GHz', check: ({ ctx }) => ctx && ctx.band === '5' },
        { id: 'cov5_60', label: '5 GHz coverage ≥ 60%', check: ({ score }) => score && score.coverage.percent >= 0.60 }
      ]
    },
    {
      id: 'g6',
      type: 'guided',
      title: 'Add a WLC. Lightweight APs join.',
      intro: 'Click "+ Add WLC" in the Infrastructure panel. Each AP\'s status pill goes from yellow (orphan) to green (up). CAPWAP tunnels appear.',
      hints: [
        'CAPWAP control = UDP 5246, data = UDP 5247.',
        'WLC discovery order: DHCP option 43 → DNS (CISCO-CAPWAP-CONTROLLER) → broadcast.'
      ],
      criteria: [
        { id: 'wlc_placed', label: 'WLC placed', check: ({ layout }) => (layout.infra || []).some(i => i.type === 'wlc') },
        { id: 'aps_2_6', label: '≥ 2 APs', check: ({ layout }) => layout.aps.length >= 2 },
        { id: 'all_up', label: 'All APs status = up', check: ({ score, layout }) => score && layout.aps.every(a => score.apStatus[a.id] === 'up') }
      ]
    },
    {
      id: 'g7',
      type: 'guided',
      title: 'WPA2-Enterprise + RADIUS',
      intro: 'Add a WLAN with security WPA2-Enterprise. The status pill flips purple — RADIUS missing. Click "+ Add RADIUS" to satisfy validation.',
      hints: [
        '802.1X / EAP authenticates each user against a RADIUS backend (no shared key).',
        'Real-world RADIUS examples: Cisco ISE, Microsoft NPS, FreeRADIUS.'
      ],
      criteria: [
        { id: 'wpa_ent', label: 'WLAN with WPA-Enterprise security', check: ({ wlans }) => (wlans || []).some(w => /-ent$/.test(w.security || '')) },
        { id: 'radius_placed', label: 'RADIUS placed', check: ({ layout }) => (layout.infra || []).some(i => i.type === 'radius') },
        { id: 'all_up_7', label: 'All APs status = up', check: ({ score, layout }) => score && layout.aps.every(a => score.apStatus[a.id] === 'up') }
      ]
    },
    {
      id: 'g8',
      type: 'guided',
      title: 'Survive a DFS radar event',
      intro: 'Set at least one 5 GHz radio to a DFS channel (52–144). Click "Trigger DFS Radar". The AP must migrate off DFS — and your coverage should still hold.',
      hints: [
        'DFS = Dynamic Frequency Selection. APs share spectrum with weather radar.',
        'On radar detection, the AP must vacate the channel within 60 seconds.'
      ],
      criteria: [
        { id: 'radar_fired', label: 'DFS radar event triggered', check: ({ ctx }) => ctx && ctx.dfsRadarFired === true },
        { id: 'cov_60_after', label: 'Coverage ≥ 60% after migration', check: ({ score }) => score && score.coverage.percent >= 0.60 }
      ]
    },
    {
      id: 't1',
      type: 'test',
      title: 'TEST · Hospital voice-grade roaming',
      intro: 'Voice-grade WLAN target: every meter ≥ −67 dBm; every cell has a secondary AP ≥ −75 dBm so handoffs are seamless. Minimum 3 APs.',
      hints: [],
      criteria: [
        { id: 'aps_3', label: '≥ 3 APs', check: ({ layout }) => layout.aps.length >= 3 },
        { id: 'cov_90', label: 'Coverage ≥ 90%', check: ({ score }) => score && score.coverage.percent >= 0.90 },
        { id: 'roam_80', label: 'Roaming ≥ 80%', check: ({ score }) => score && score.roaming.percent >= 0.80 },
        { id: 'cci_010', label: 'CCI penalty ≤ 0.10', check: ({ score }) => score && score.cci.penalty <= 0.10 }
      ]
    },
    {
      id: 't2',
      type: 'test',
      title: 'TEST · Capacity-driven (200 clients)',
      intro: 'Conference center. Target capacity 200 clients @ ~25 clients per AP. ≥ 8 APs, low CCI, ≥ 80% coverage.',
      hints: [],
      criteria: [
        { id: 'aps_8', label: '≥ 8 APs', check: ({ layout }) => layout.aps.length >= 8 },
        { id: 'cov_80_t2', label: 'Coverage ≥ 80%', check: ({ score }) => score && score.coverage.percent >= 0.80 },
        { id: 'cci_020', label: 'CCI penalty ≤ 0.20', check: ({ score }) => score && score.cci.penalty <= 0.20 },
        { id: 'cap_80', label: 'Capacity score ≥ 0.80', check: ({ score }) => score && score.capacity.score >= 0.80 }
      ]
    },
    {
      id: 't3',
      type: 'test',
      title: 'TEST · Warehouse w/ metal racking',
      intro: 'Switch to the Warehouse preset. Metal racks (−25 dB each) chop coverage. Place ≥ 6 APs, hit ≥ 80% coverage, low CCI, all status up.',
      hints: [
        'Tip: place APs between rack rows — cells are tiny when signal must cross metal.',
        'Use 5 GHz with high Tx power for short, sharp cells.'
      ],
      preferredPreset: 'warehouse_1f',
      criteria: [
        { id: 'aps_6_t3', label: '≥ 6 APs', check: ({ layout }) => layout.aps.length >= 6 },
        { id: 'cov_80_t3', label: 'Coverage ≥ 80%', check: ({ score }) => score && score.coverage.percent >= 0.80 },
        { id: 'cci_025', label: 'CCI penalty ≤ 0.25', check: ({ score }) => score && score.cci.penalty <= 0.25 },
        { id: 'all_up_t3', label: 'All APs status = up', check: ({ score, layout }) => score && layout.aps.every(a => score.apStatus[a.id] === 'up') }
      ]
    }
  ];

  // ── public API ───────────────────────────────────────────────
  function current() {
    return list.find(m => m.id === state.currentId) || null;
  }

  function start(missionId) {
    const m = list.find(x => x.id === missionId);
    if (!m) return null;
    state.currentId = missionId;
    state.dfsRadarFired = false;
    state.radarHistory = [];
    persist();
    if (window.APLab && typeof window.APLab.reset === 'function') {
      window.APLab.reset();
    }
    return m;
  }

  function next() {
    const cur = current();
    if (!cur) return null;
    const idx = list.findIndex(m => m.id === cur.id);
    const upcoming = list[idx + 1];
    if (!upcoming) return null;
    return start(upcoming.id);
  }

  function evaluate(score, layout, wlans, ctx) {
    const m = current();
    if (!m) return null;
    const evalCtx = Object.assign({ score: score, layout: layout, wlans: wlans }, ctx || {});
    evalCtx.ctx = Object.assign({ dfsRadarFired: state.dfsRadarFired }, ctx || {});
    const results = m.criteria.map(c => {
      let met = false;
      try { met = !!c.check(evalCtx); } catch (e) { met = false; }
      return { id: c.id, label: c.label, met: met };
    });
    return {
      missionId: m.id,
      title: m.title,
      type: m.type,
      complete: results.every(r => r.met),
      criteria: results,
      score: m.type === 'test' && score ? score.total : null
    };
  }

  function triggerRadar() {
    if (!window.APLab || typeof window.APLab.getLayout !== 'function') return { migrated: [] };
    const layout = window.APLab.getLayout();
    const migrated = [];
    layout.aps.forEach(function (ap) {
      const r5 = (ap.radios || []).find(function (r) { return r.band === '5'; });
      if (r5 && DFS_CHANNELS.indexOf(r5.channel) !== -1) {
        const oldCh = r5.channel;
        const newCh = SAFE_5GHZ[Math.floor(Math.random() * SAFE_5GHZ.length)];
        r5.channel = newCh;
        migrated.push({ apId: ap.id, oldCh: oldCh, newCh: newCh });
      }
    });
    if (migrated.length > 0 && typeof window.APLab.loadLayout === 'function') {
      window.APLab.loadLayout(layout);
    }
    state.dfsRadarFired = true;
    state.radarHistory.push({ at: Date.now(), migrated: migrated });
    persist();
    return { migrated: migrated };
  }

  function reset() {
    state.currentId = null;
    state.dfsRadarFired = false;
    state.radarHistory = [];
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        currentId: state.currentId,
        dfsRadarFired: state.dfsRadarFired
      }));
    } catch (e) {}
  }

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const obj = JSON.parse(raw);
      if (obj && typeof obj.currentId === 'string') state.currentId = obj.currentId;
      if (typeof obj.dfsRadarFired === 'boolean') state.dfsRadarFired = obj.dfsRadarFired;
    } catch (e) {}
  }

  // load any persisted state on script load
  if (typeof localStorage !== 'undefined') loadFromStorage();

  // ── export ───────────────────────────────────────────────────
  window.APLabMissions = {
    list: list,
    current: current,
    start: start,
    next: next,
    evaluate: evaluate,
    triggerRadar: triggerRadar,
    reset: reset,
    _state: state
  };
})();
