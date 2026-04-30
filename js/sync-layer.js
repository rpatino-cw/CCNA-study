/**
 * sync-layer.js — multi-device sync via existing Cloudflare Worker.
 *
 * Uses the worker's /api/backup endpoints (already deployed):
 *   POST /api/backup/save    {peerId, data}
 *   GET  /api/backup/restore?id=<peerId>
 *
 * Sync key (peerId) is stored in localStorage. User can:
 *   - View their key → copy to another device
 *   - Restore from key → pulls remote state into this device
 *
 * Hooks: SR state changes call window.ccnaSync.queueSync(). Debounced
 * 5s before pushing, so rapid card ratings batch into one PUT.
 */
(function () {
  'use strict';

  var WORKER_URL = 'https://ccna-tutor.rpatino-cw.workers.dev';
  var KEY_PEERID = 'ccna_sync_peer_id';
  var KEY_LAST_PULL = 'ccna_sync_last_pull';
  var DEBOUNCE_MS = 5000;

  function genKey() {
    // 12-char random key, easy to copy by hand
    var alpha = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
    var s = '';
    for (var i = 0; i < 12; i++) s += alpha[Math.floor(Math.random() * alpha.length)];
    // Group as XXXX-XXXX-XXXX for readability
    return s.slice(0, 4) + '-' + s.slice(4, 8) + '-' + s.slice(8, 12);
  }

  function getPeerId() {
    var k = localStorage.getItem(KEY_PEERID);
    if (!k) {
      k = genKey();
      localStorage.setItem(KEY_PEERID, k);
    }
    return k;
  }

  function setPeerId(k) {
    localStorage.setItem(KEY_PEERID, k.toUpperCase().trim());
  }

  // Snapshot all CCNA-related localStorage keys
  function snapshot() {
    var data = {};
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (!k) continue;
      if (k.indexOf('ccna_') === 0 || k.indexOf('strat_') === 0) {
        data[k] = localStorage.getItem(k);
      }
    }
    return data;
  }

  function applySnapshot(data) {
    if (!data || typeof data !== 'object') return 0;
    var n = 0;
    Object.keys(data).forEach(function (k) {
      if (k === KEY_PEERID) return; // never overwrite this device's key from server
      try { localStorage.setItem(k, data[k]); n++; } catch (_) {}
    });
    return n;
  }

  var pushTimer = null;
  function queueSync() {
    if (pushTimer) clearTimeout(pushTimer);
    pushTimer = setTimeout(pushNow, DEBOUNCE_MS);
  }

  function pushNow() {
    pushTimer = null;
    var peerId = getPeerId().replace(/-/g, '');
    var data = snapshot();
    return fetch(WORKER_URL + '/api/backup/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ peerId: peerId, data: data })
    }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }).then(function (resp) {
      console.log('[ccnaSync] pushed', Object.keys(data).length, 'keys at', resp.ts);
      return resp;
    }).catch(function (e) {
      console.warn('[ccnaSync] push failed:', e.message);
    });
  }

  function pullNow(keyOverride) {
    var peerId = (keyOverride || getPeerId()).replace(/-/g, '');
    return fetch(WORKER_URL + '/api/backup/restore?id=' + encodeURIComponent(peerId))
      .then(function (r) {
        if (r.status === 404) return null;
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (resp) {
        if (!resp) return { found: false };
        var n = applySnapshot(resp.data || {});
        localStorage.setItem(KEY_LAST_PULL, new Date().toISOString());
        return { found: true, ts: resp.ts, restored: n };
      });
  }

  function autoPullOnLoad() {
    // Only auto-pull if user has explicitly set a key (avoid pulling someone else's by accident)
    if (!localStorage.getItem(KEY_PEERID)) return;
    // Don't pull on every page load — only if last pull > 1h ago or never
    var last = localStorage.getItem(KEY_LAST_PULL);
    if (last && (Date.now() - new Date(last).getTime()) < 3600000) return;
    pullNow().then(function (r) {
      if (r && r.found) console.log('[ccnaSync] auto-restored', r.restored, 'keys from', r.ts);
    }).catch(function (e) { console.warn('[ccnaSync] auto-pull failed:', e.message); });
  }

  // ─── Sync UI panel ────────────────────────────────────────────
  function ensureUI() {
    if (document.getElementById('sync-panel')) return;
    var panel = document.createElement('div');
    panel.id = 'sync-panel';
    panel.style.cssText = 'position:fixed;bottom:130px;left:14px;z-index:8500;font-family:var(--font-display,system-ui)';
    panel.innerHTML =
      '<button id="sync-btn" style="background:var(--bg-surface,#fff);border:1px solid var(--border,#ccc);border-radius:99px;padding:6px 14px;font-size:.74rem;font-weight:600;color:var(--ink-muted,#666);cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.06)" title="Sync key for cross-device progress">⇅ Sync</button>' +
      '<div id="sync-popup" style="display:none;position:absolute;bottom:42px;left:0;background:var(--bg-surface,#fff);border:1px solid var(--border,#ccc);border-radius:8px;padding:14px;width:300px;box-shadow:0 8px 24px rgba(0,0,0,.12);font-size:.82rem;line-height:1.45">' +
        '<div style="font-weight:700;margin-bottom:8px;color:var(--ink,#000)">Sync key (this device)</div>' +
        '<div id="sync-key" style="font-family:monospace;font-size:.95rem;font-weight:700;color:var(--accent,#B45309);background:var(--bg-recessed,#f3f0eb);padding:8px 12px;border-radius:4px;text-align:center;letter-spacing:.05em;margin-bottom:8px;user-select:all"></div>' +
        '<button id="sync-copy" style="width:100%;padding:6px;background:var(--accent,#B45309);color:#fff;border:0;border-radius:4px;cursor:pointer;font-weight:600;margin-bottom:12px">Copy key</button>' +
        '<div style="font-size:.72rem;color:var(--ink-muted,#888);margin-bottom:6px">To use this on another device, enter this key there.</div>' +
        '<hr style="border:0;border-top:1px solid var(--border,#ccc);margin:12px 0">' +
        '<div style="font-weight:700;margin-bottom:8px;color:var(--ink,#000)">Restore from another device</div>' +
        '<input id="sync-input" type="text" placeholder="paste sync key here" style="width:100%;padding:7px 10px;border:1px solid var(--border,#ccc);border-radius:4px;font-family:monospace;font-size:.85rem;margin-bottom:8px">' +
        '<button id="sync-restore" style="width:100%;padding:6px;background:var(--ink,#000);color:#fff;border:0;border-radius:4px;cursor:pointer;font-weight:600">Pull from key</button>' +
        '<div id="sync-status" style="margin-top:10px;font-size:.72rem;color:var(--ink-muted,#888);text-align:center"></div>' +
      '</div>';
    document.body.appendChild(panel);
    // Stack flush above .beta-badge (version icon). If group-mini-badge
    // is also present, stack above it instead.
    function reposition(){
      var beta=document.querySelector('.beta-badge');
      var betaH=beta?beta.offsetHeight:0;
      var betaBottom=14;
      if(beta){
        var bb=parseInt(getComputedStyle(beta).bottom,10);
        if(!isNaN(bb)) betaBottom=bb;
      }
      var anchorTop=betaBottom+betaH+8;
      var g=document.getElementById('group-mini-badge');
      if(g){
        var gBot=parseInt(g.style.bottom,10);
        if(isNaN(gBot)){
          var r=g.getBoundingClientRect();
          gBot=Math.max(0, window.innerHeight - r.bottom);
        }
        anchorTop=gBot+g.offsetHeight+8;
      }
      panel.style.bottom=anchorTop+'px';
    }
    requestAnimationFrame(reposition);
    // Re-anchor if the group widget appears later (sync.js renders async).
    setTimeout(reposition, 1500);

    var btn = document.getElementById('sync-btn');
    var popup = document.getElementById('sync-popup');
    var keyEl = document.getElementById('sync-key');
    btn.addEventListener('click', function () {
      var visible = popup.style.display === 'block';
      popup.style.display = visible ? 'none' : 'block';
      keyEl.textContent = getPeerId();
    });
    document.getElementById('sync-copy').addEventListener('click', function () {
      var k = getPeerId();
      navigator.clipboard.writeText(k).then(function () {
        document.getElementById('sync-status').textContent = 'Copied!';
        pushNow().then(function () {
          document.getElementById('sync-status').textContent = 'Copied + saved to cloud';
        });
      });
    });
    document.getElementById('sync-restore').addEventListener('click', function () {
      var input = document.getElementById('sync-input').value.trim().toUpperCase();
      if (!input) { document.getElementById('sync-status').textContent = 'Enter a key first'; return; }
      document.getElementById('sync-status').textContent = 'Pulling…';
      pullNow(input).then(function (r) {
        if (!r.found) {
          document.getElementById('sync-status').textContent = 'Key not found on server';
        } else {
          // Adopt this key as our own going forward
          setPeerId(input);
          keyEl.textContent = input;
          document.getElementById('sync-status').textContent = 'Restored ' + r.restored + ' keys (saved ' + r.ts + ')';
          // Reload to apply
          setTimeout(function () { location.reload(); }, 1500);
        }
      }).catch(function (e) {
        document.getElementById('sync-status').textContent = 'Error: ' + e.message;
      });
    });
  }

  // ─── Boot ────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    ensureUI();
    autoPullOnLoad();
  });

  window.ccnaSync = {
    queueSync: queueSync,
    pushNow: pushNow,
    pullNow: pullNow,
    getPeerId: getPeerId,
    setPeerId: setPeerId
  };
})();
