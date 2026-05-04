/* wireless-ap-score.js — Phase 4 scoring engine
 * Pure functions. Depends on window.APLabData (wall materials).
 * Reuses APLabRF math directly (replicated locally for testability).
 * Exposes window.APLabScore.
 */
(function () {
  'use strict';

  const PL_AT_1M = { '2.4': 40, '5': 47 };

  // Default scoring config; mission-driven values override per call.
  const DEFAULTS = {
    band: '5',
    voiceFloor: -67,         // dBm — coverage threshold
    secondaryFloor: -75,     // dBm — roaming secondary threshold
    cciHearable: -82,        // dBm — CCI threshold
    cciHotPercentForFullPenalty: 0.10,  // 10% hot cells = 100% CCI penalty
    capacityClientsPerAp: 25,
    capacityTargetClients: 50
  };

  // ── public ───────────────────────────────────────────────────
  function compute(layout, preset, wlans, options) {
    const opts = Object.assign({}, DEFAULTS, options || {});
    const W = preset.widthM;
    const H = preset.heightM;
    const aps = (layout && layout.aps) ? layout.aps : [];
    const infra = (layout && layout.infra) ? layout.infra : [];
    const wlanList = wlans || [];

    const walls = (preset.walls || []).map(function (w) {
      const mat = (window.APLabData &&
                   window.APLabData.wallMaterials &&
                   window.APLabData.wallMaterials[w.material]) || { lossDb: 0 };
      return { x1: w.x1, y1: w.y1, x2: w.x2, y2: w.y2, lossDb: mat.lossDb };
    });

    // Sample 1m grid
    const totalCells = W * H;
    let coveredCells = 0;
    let above75Cells = 0;
    let roamingCells = 0;
    let cciHotCells = 0;
    let bestPerAp = new Array(aps.length);
    let secondaryPerCell = 0;
    let sameChannelPairs = countSameChannelPairs(aps, opts.band);

    for (let xM = 0; xM < W; xM++) {
      for (let yM = 0; yM < H; yM++) {
        const cx = xM + 0.5;
        const cy = yM + 0.5;
        let best = -Infinity;
        let secondBest = -Infinity;
        let aboveCciCount = 0;
        const sameChMap = {};

        for (let i = 0; i < aps.length; i++) {
          const r = rssiAt(cx, cy, aps[i], walls, opts.band);
          if (r > best) { secondBest = best; best = r; }
          else if (r > secondBest) { secondBest = r; }
          if (r >= opts.cciHearable) {
            const ch = chOnBand(aps[i], opts.band);
            if (ch != null) {
              sameChMap[ch] = (sameChMap[ch] || 0) + 1;
              aboveCciCount += 1;
            }
          }
        }

        if (best >= opts.voiceFloor) coveredCells += 1;
        if (best >= opts.secondaryFloor) above75Cells += 1;
        if (best >= opts.voiceFloor && secondBest >= opts.secondaryFloor) roamingCells += 1;

        // CCI hot cell: any channel has >= 2 APs hearable
        for (const ch in sameChMap) { if (sameChMap[ch] >= 2) { cciHotCells += 1; break; } }
      }
    }

    const coveragePercent = totalCells === 0 ? 0 : coveredCells / totalCells;
    const roamingPercent = totalCells === 0 ? 0 : roamingCells / totalCells;
    const cciPenalty = clamp01(cciHotCells / totalCells / opts.cciHotPercentForFullPenalty);

    const aciPairs = countAciPairs(aps);
    const aciPenalty = aps.length === 0 ? 0 : clamp01(aciPairs / Math.max(1, count24Radios(aps)));

    const capacityScore = clamp01(aps.length * opts.capacityClientsPerAp / opts.capacityTargetClients);

    const total = Math.round(
      coveragePercent *
      Math.max(roamingPercent, 0.25) *  // floor roaming so 1-AP designs aren't 0
      (1 - cciPenalty) *
      (1 - aciPenalty) *
      capacityScore *
      100
    );

    const apStatus = computeStatus(aps, infra, wlanList);

    return {
      coverage: { percent: coveragePercent, sampledCells: totalCells, above67: coveredCells, above75: above75Cells },
      roaming:  { percent: roamingPercent,  cellsWithSecondary: roamingCells },
      cci:      { penalty: cciPenalty, hotCells: cciHotCells, sameChannelPairs: sameChannelPairs },
      aci:      { penalty: aciPenalty, adjacentPairs: aciPairs },
      capacity: { score: capacityScore, apCount: aps.length, target: opts.capacityTargetClients },
      total: Math.max(0, Math.min(100, total)),
      apStatus: apStatus,
      band: opts.band
    };
  }

  // ── helpers ──────────────────────────────────────────────────
  function clamp01(n) { return Math.max(0, Math.min(1, n)); }

  function chOnBand(ap, band) {
    if (!ap || !Array.isArray(ap.radios)) return null;
    const r = ap.radios.find(function (x) { return x.band === band; });
    return r ? r.channel : null;
  }

  function pathLoss(d, band) {
    const dEff = d < 1 ? 1 : d;
    return PL_AT_1M[band] + 20 * Math.log10(dEff);
  }

  function rssiAt(xM, yM, ap, walls, band) {
    if (!ap || !Array.isArray(ap.radios)) return -Infinity;
    const radio = ap.radios.find(function (r) { return r.band === band; });
    if (!radio) return -Infinity;
    const dx = xM - ap.x;
    const dy = yM - ap.y;
    const d = Math.sqrt(dx * dx + dy * dy);
    let pl = pathLoss(d, band);
    let wallLoss = 0;
    for (let i = 0; i < walls.length; i++) {
      if (segmentsIntersect(ap.x, ap.y, xM, yM, walls[i])) {
        wallLoss += walls[i].lossDb;
      }
    }
    return radio.txDbm - pl - wallLoss;
  }

  function segmentsIntersect(x1, y1, x2, y2, w) {
    const x3 = w.x1, y3 = w.y1, x4 = w.x2, y4 = w.y2;
    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (Math.abs(den) < 1e-9) return false;
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
    return t > 0 && t < 1 && u >= 0 && u <= 1;
  }

  function countSameChannelPairs(aps, band) {
    let pairs = 0;
    for (let i = 0; i < aps.length; i++) {
      for (let j = i + 1; j < aps.length; j++) {
        const a = chOnBand(aps[i], band);
        const b = chOnBand(aps[j], band);
        if (a != null && a === b) pairs += 1;
      }
    }
    return pairs;
  }

  function countAciPairs(aps) {
    let pairs = 0;
    const ch24s = aps.map(function (a) { return chOnBand(a, '2.4'); }).filter(function (c) { return c != null; });
    for (let i = 0; i < ch24s.length; i++) {
      for (let j = i + 1; j < ch24s.length; j++) {
        const diff = Math.abs(ch24s[i] - ch24s[j]);
        // 2.4 GHz channels overlap unless diff >= 5. So diff in [1,4] is ACI.
        if (diff >= 1 && diff <= 4) pairs += 1;
      }
    }
    return pairs;
  }

  function count24Radios(aps) {
    return aps.filter(function (a) { return chOnBand(a, '2.4') != null; }).length;
  }

  // Status: orphan if AP mode is lightweight-flavored AND no WLC placed.
  // radius_missing if any active WPA-Enterprise WLAN AND no RADIUS placed.
  function computeStatus(aps, infra, wlans) {
    const out = {};
    const hasWlc = (infra || []).some(function (i) { return i.type === 'wlc'; });
    const hasRadius = (infra || []).some(function (i) { return i.type === 'radius'; });
    const entWlans = (wlans || []).filter(function (w) { return /-ent$/.test(w.security || ''); });
    const radiusNeeded = entWlans.length > 0 && !hasRadius;

    aps.forEach(function (ap) {
      // For Phase 4 we treat any non-'autonomous' (default in apModes) as
      // expecting a WLC. Default mode is 'local' which is a Lightweight mode.
      const mode = ap.mode || 'local';
      const expectsWlc = mode !== 'autonomous';
      let s = 'up';
      if (expectsWlc && !hasWlc) s = 'orphan';
      else if (radiusNeeded) s = 'radius_missing';
      out[ap.id] = s;
    });
    return out;
  }

  // ── export ───────────────────────────────────────────────────
  window.APLabScore = {
    compute: compute,
    // test surface:
    _rssiAt: rssiAt,
    _countSameChannelPairs: countSameChannelPairs,
    _countAciPairs: countAciPairs,
    _computeStatus: computeStatus
  };
})();
