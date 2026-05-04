/* wireless-ap-rf.js — RF propagation engine + canvas heatmap renderer
 * Depends on window.APLabData (for wall material lossDb).
 * Exposes window.APLabRF.
 *
 * Phase 2 scope: log-distance path loss + wall raycasting → max-RSSI heatmap.
 * No directional shaping, no per-AP layer, no SNR — those are later phases.
 */
(function () {
  'use strict';

  // Free-space path loss at 1 m (vendor-typical, indoor model).
  const PL_AT_1M = { '2.4': 40, '5': 47 };

  const RECOMPUTE_DEBOUNCE_MS = 80;

  // ── module state ─────────────────────────────────────────────
  let canvasEl = null;
  let ctx = null;
  let preset = null;
  let walls = null;
  let pxPerMeter = 20;
  let layer = 'aggregate';      // 'aggregate' | 'off' (per-ap reserved for Phase 4)
  let band = '5';               // '2.4' | '5'
  let lastLayout = null;
  let recomputeTimer = null;

  // ── public API ───────────────────────────────────────────────
  function attach(canvas, presetData, opts) {
    canvasEl = canvas;
    preset = presetData;
    pxPerMeter = (opts && opts.pxPerMeter) || 20;

    walls = (presetData.walls || []).map(w => {
      const mat = (window.APLabData &&
                   window.APLabData.wallMaterials &&
                   window.APLabData.wallMaterials[w.material]) || { lossDb: 0 };
      return {
        x1: w.x1, y1: w.y1, x2: w.x2, y2: w.y2,
        lossDb: mat.lossDb
      };
    });

    const cssW = preset.widthM * pxPerMeter;
    const cssH = preset.heightM * pxPerMeter;
    const dpr = (typeof window !== 'undefined' && window.devicePixelRatio) || 1;
    canvas.style.width = cssW + 'px';
    canvas.style.height = cssH + 'px';
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);

    ctx = canvas.getContext('2d');
    if (ctx && ctx.setTransform) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    clear();
  }

  function recompute(layout) {
    lastLayout = layout;
    if (recomputeTimer) clearTimeout(recomputeTimer);
    if (!ctx) return;
    if (layer === 'off') { clear(); return; }
    recomputeTimer = setTimeout(function () { render(layout); }, RECOMPUTE_DEBOUNCE_MS);
  }

  function setLayer(name) {
    layer = name;
    if (layer === 'off') { clear(); return; }
    if (lastLayout) render(lastLayout);
  }

  function setBand(b) {
    if (b !== '2.4' && b !== '5') return;
    band = b;
    if (lastLayout) render(lastLayout);
  }

  function destroy() {
    if (recomputeTimer) clearTimeout(recomputeTimer);
    canvasEl = ctx = preset = walls = null;
    lastLayout = null;
  }

  function getLayer() { return layer; }
  function getBand() { return band; }

  // ── rendering ────────────────────────────────────────────────
  function clear() {
    if (!ctx || !preset) return;
    ctx.clearRect(0, 0, preset.widthM * pxPerMeter, preset.heightM * pxPerMeter);
  }

  function render(layout) {
    clear();
    if (!layout || !layout.aps || layout.aps.length === 0) return;
    if (!ctx) return;

    const W = preset.widthM;
    const H = preset.heightM;

    for (let xM = 0; xM < W; xM++) {
      for (let yM = 0; yM < H; yM++) {
        const cx = xM + 0.5;
        const cy = yM + 0.5;
        let best = -Infinity;
        for (let i = 0; i < layout.aps.length; i++) {
          const r = rssiAt(cx, cy, layout.aps[i]);
          if (r > best) best = r;
        }
        const c = colorForRssi(best);
        if (!c) continue;
        ctx.fillStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + c[3] + ')';
        ctx.fillRect(xM * pxPerMeter, yM * pxPerMeter, pxPerMeter, pxPerMeter);
      }
    }
  }

  // ── RF math ──────────────────────────────────────────────────
  function pathLoss(d, bandKey) {
    const dEff = d < 1 ? 1 : d;
    const pl1 = PL_AT_1M[bandKey];
    if (pl1 == null) return Infinity;
    return pl1 + 20 * Math.log10(dEff);
  }

  function rssiAt(xM, yM, ap) {
    if (!ap || !Array.isArray(ap.radios)) return -Infinity;
    const radio = ap.radios.find(function (r) { return r.band === band; });
    if (!radio) return -Infinity;
    const dx = xM - ap.x;
    const dy = yM - ap.y;
    const d = Math.sqrt(dx * dx + dy * dy);
    const pl = pathLoss(d, band);

    let wallLoss = 0;
    if (walls) {
      for (let i = 0; i < walls.length; i++) {
        if (segmentsIntersect(ap.x, ap.y, xM, yM, walls[i])) {
          wallLoss += walls[i].lossDb;
        }
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

  function colorForRssi(rssi) {
    if (rssi >= -55) return [21, 128, 61, 0.55];
    if (rssi >= -65) return [34, 197, 94, 0.55];
    if (rssi >= -67) return [132, 204, 22, 0.5];
    if (rssi >= -75) return [234, 179, 8, 0.5];
    if (rssi >= -85) return [249, 115, 22, 0.45];
    if (rssi >= -95) return [220, 38, 38, 0.35];
    return null;
  }

  // ── export ───────────────────────────────────────────────────
  window.APLabRF = {
    attach: attach,
    recompute: recompute,
    setLayer: setLayer,
    setBand: setBand,
    destroy: destroy,
    getLayer: getLayer,
    getBand: getBand,
    // exposed for unit tests:
    _rssiAt: rssiAt,
    _pathLoss: pathLoss,
    _segmentsIntersect: segmentsIntersect,
    _colorForRssi: colorForRssi
  };
})();
