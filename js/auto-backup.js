/**
 * auto-backup.js — Silent cloud backup + auto-restore for all users
 * No group required. Works for solo users too.
 *
 * Strategy: localStorage event listener catches ALL writes (not just hooked methods).
 * Debounced push to CF Worker KV with 365-day TTL.
 * On page load with empty localStorage: offer restore from cloud or study group.
 */
(function() {
  var API = 'https://ccna-tutor.rpatino-cw.workers.dev';
  var BACKUP_DEBOUNCE = 10000;
  var BACKUP_KEY = 'ccna_last_backup';
  var BACKUP_HASH_KEY = 'ccna_backup_hash';
  var debounceTimer = null;
  var lastHash = localStorage.getItem(BACKUP_HASH_KEY) || '';

  // ── Get or create peer ID ──────────────────────────────────
  function getPeerId() {
    var id = localStorage.getItem('ccna_peer_id');
    if (!id) {
      id = Array.from(crypto.getRandomValues(new Uint8Array(4)))
        .map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');
      localStorage.setItem('ccna_peer_id', id);
    }
    return id;
  }

  // ── Check if localStorage has meaningful data ──────────────
  function hasLocalData() {
    var prof = localStorage.getItem('ccna_proficiency');
    if (!prof) return false;
    try { return Object.keys(JSON.parse(prof)).length > 0; }
    catch(e) { return false; }
  }

  // ── Simple hash to detect if data actually changed ─────────
  function hashData(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) {
      h = ((h << 5) - h) + str.charCodeAt(i);
      h = h & h; // Convert to 32-bit int
    }
    return h.toString(36);
  }

  // ── Collect all ccna_ data as a plain object ───────────────
  function collectData() {
    var data = {};
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      if (key && key.startsWith('ccna_')) {
        data[key] = localStorage.getItem(key);
      }
    }
    return data;
  }

  // ── Push backup to server ──────────────────────────────────
  function pushBackup() {
    try {
      var data = collectData();
      var dataStr = JSON.stringify(data);
      if (!dataStr || dataStr === '{}') return;

      // Skip if nothing changed since last backup
      var newHash = hashData(dataStr);
      if (newHash === lastHash) return;

      fetch(API + '/api/backup/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ peerId: getPeerId(), data: dataStr })
      }).then(function(res) {
        if (res.ok) {
          lastHash = newHash;
          localStorage.setItem(BACKUP_HASH_KEY, newHash);
          localStorage.setItem(BACKUP_KEY, new Date().toISOString());
        }
      }).catch(function() {});
    } catch(e) {}
  }

  // ── Pull backup from server ────────────────────────────────
  function pullBackup() {
    var peerId = getPeerId();
    return fetch(API + '/api/backup/restore?id=' + peerId)
      .then(function(res) {
        if (!res.ok) return null;
        return res.json();
      })
      .then(function(result) {
        if (!result || !result.data) return false;
        try {
          // data is a JSON string of {ccna_key: value, ...}
          var parsed = typeof result.data === 'string' ? JSON.parse(result.data) : result.data;
          // Restore each key directly to localStorage
          Object.keys(parsed).forEach(function(key) {
            localStorage.setItem(key, parsed[key]);
          });
          localStorage.setItem(BACKUP_KEY, result.ts || new Date().toISOString());
          return true;
        } catch(e) { return false; }
      })
      .catch(function() { return false; });
  }

  // ── Try group-based recovery ───────────────────────────────
  function tryGroupRecovery(code, name) {
    return fetch(API + '/api/group/recover', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: code, name: name })
    })
    .then(function(res) { return res.json(); })
    .then(function(result) {
      if (!result.ok) return false;

      // Prefer fullBackup (complete localStorage dump) over partial progress
      if (result.fullBackup) {
        try {
          var full = typeof result.fullBackup === 'string' ? JSON.parse(result.fullBackup) : result.fullBackup;
          Object.keys(full).forEach(function(key) {
            _origSetItem(key, full[key]); // Use original setItem to avoid triggering backup loop
          });
        } catch(e) {}
      } else if (result.progress) {
        // Fallback: partial restore from progress summary
        if (result.progress.proficiency) _origSetItem('ccna_proficiency', JSON.stringify(result.progress.proficiency));
        if (result.progress.streak) _origSetItem('ccna_streak', JSON.stringify(result.progress.streak));
        if (result.progress.studyTime) _origSetItem('ccna_study_time', JSON.stringify(result.progress.studyTime));
      }

      // Restore peer identity
      if (result.memberId) _origSetItem('ccna_peer_id', result.memberId);
      if (result.groupCode) _origSetItem('ccna_peer_group', result.groupCode);
      if (result.name) _origSetItem('ccna_peer_name', result.name);
      return true;
    })
    .catch(function() { return false; });
  }

  // ── Schedule backup ────────────────────────────────────────
  function scheduleBackup() {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(pushBackup, BACKUP_DEBOUNCE);
  }

  // ── FIX #1/#5: localStorage event listener catches ALL writes ──
  // This fires on ANY localStorage change from ANY code path —
  // no monkey-patching needed, no methods to miss.
  // Note: 'storage' event only fires from OTHER tabs. For same-tab
  // detection, we also patch localStorage.setItem directly.
  var _origSetItem = localStorage.setItem.bind(localStorage);
  localStorage.setItem = function(key, value) {
    _origSetItem(key, value);
    if (key && key.startsWith('ccna_') && key !== BACKUP_KEY && key !== BACKUP_HASH_KEY) {
      scheduleBackup();
    }
  };

  // Cross-tab sync: if another tab writes, schedule backup here too
  window.addEventListener('storage', function(e) {
    if (e.key && e.key.startsWith('ccna_') && e.key !== BACKUP_KEY && e.key !== BACKUP_HASH_KEY) {
      scheduleBackup();
    }
  });

  // ── Recovery Banner ────────────────────────────────────────
  function showRecoveryBanner() {
    if (hasLocalData()) return;
    if (localStorage.getItem('ccna_recovery_dismissed')) return;

    var banner = document.createElement('div');
    banner.id = 'recoveryBanner';
    // FIX #4: Center as overlay instead of fixed bottom (avoids tutor conflict)
    banner.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:9500;background:#FAF7F2;border:1px solid #E2DFD9;border-radius:14px;padding:24px;max-width:440px;width:92%;box-shadow:0 16px 48px rgba(0,0,0,0.18);font-family:"Space Grotesk",system-ui,sans-serif';
    banner.innerHTML =
      '<div style="font-size:1rem;font-weight:700;color:#1C1917;margin-bottom:8px">Welcome back?</div>' +
      '<div style="font-size:.82rem;color:#57534E;line-height:1.55;margin-bottom:16px">If you\'ve studied here before, your progress is safely backed up. Restore it with one click, or start fresh.</div>' +
      '<div style="display:flex;flex-direction:column;gap:8px">' +
        '<button id="recoverAutoBtn" style="padding:10px 16px;background:#1C1917;color:#FAF7F2;border:none;border-radius:8px;font-family:inherit;font-size:.85rem;font-weight:600;cursor:pointer">Restore My Progress</button>' +
        '<button id="recoverGroupBtn" style="padding:10px 16px;background:none;border:1px solid #E2DFD9;color:#57534E;border-radius:8px;font-family:inherit;font-size:.82rem;cursor:pointer">Recover from Study Group</button>' +
        '<button id="recoverDismiss" style="padding:6px;background:none;border:none;color:#A8A29E;font-family:inherit;font-size:.75rem;cursor:pointer;text-decoration:underline;text-underline-offset:2px">I\'m new — start fresh</button>' +
      '</div>' +
      '<div id="recoverStatus" style="display:none;margin-top:10px;font-size:.78rem;padding:10px;border-radius:6px"></div>' +
      '<div id="recoverGroupForm" style="display:none;margin-top:10px">' +
        '<input id="recoverCode" placeholder="Group code (6 chars)" style="width:100%;padding:8px 12px;border:1px solid #E2DFD9;border-radius:6px;font-family:monospace;font-size:.85rem;margin-bottom:6px;text-transform:uppercase" maxlength="6">' +
        '<input id="recoverName" placeholder="Your display name" style="width:100%;padding:8px 12px;border:1px solid #E2DFD9;border-radius:6px;font-size:.85rem;margin-bottom:8px">' +
        '<button id="recoverGroupGo" style="padding:8px 16px;background:#B45309;color:#fff;border:none;border-radius:6px;font-family:inherit;font-size:.78rem;font-weight:600;cursor:pointer;width:100%">Recover from Group</button>' +
      '</div>';

    // Backdrop
    var backdrop = document.createElement('div');
    backdrop.id = 'recoveryBackdrop';
    backdrop.style.cssText = 'position:fixed;inset:0;z-index:9499;background:rgba(28,25,23,0.3);backdrop-filter:blur(2px);pointer-events:none';

    document.body.appendChild(backdrop);
    document.body.appendChild(banner);

    function dismiss() { banner.remove(); backdrop.remove(); localStorage.setItem('ccna_recovery_dismissed', '1'); }

    // Click outside banner dismisses it (backdrop is pointer-events:none so clicks reach the page)
    document.addEventListener('click', function outsideClick(e) {
      if (!banner.contains(e.target) && document.body.contains(banner)) {
        dismiss();
        document.removeEventListener('click', outsideClick);
      }
    });

    document.getElementById('recoverAutoBtn').addEventListener('click', function() {
      var status = document.getElementById('recoverStatus');
      status.style.display = 'block';
      status.style.background = 'rgba(180,83,9,.08)';
      status.style.color = '#B45309';
      status.textContent = 'Checking for backup...';
      pullBackup().then(function(restored) {
        if (restored) {
          status.style.background = 'rgba(22,163,74,.08)';
          status.style.color = '#16A34A';
          status.textContent = 'Progress restored! Reloading...';
          setTimeout(function() { location.reload(); }, 1200);
        } else {
          status.style.background = 'rgba(220,38,38,.08)';
          status.style.color = '#DC2626';
          status.textContent = 'No backup found for this browser. Try recovering from your Study Group instead.';
        }
      });
    });

    document.getElementById('recoverGroupBtn').addEventListener('click', function() {
      document.getElementById('recoverGroupForm').style.display = 'block';
    });

    document.getElementById('recoverGroupGo').addEventListener('click', function() {
      var code = document.getElementById('recoverCode').value.trim().toUpperCase();
      var name = document.getElementById('recoverName').value.trim();
      if (!code || !name) return;
      var status = document.getElementById('recoverStatus');
      status.style.display = 'block';
      status.style.background = 'rgba(180,83,9,.08)';
      status.style.color = '#B45309';
      status.textContent = 'Searching for ' + name + ' in group ' + code + '...';
      tryGroupRecovery(code, name).then(function(restored) {
        if (restored) {
          status.style.background = 'rgba(22,163,74,.08)';
          status.style.color = '#16A34A';
          status.textContent = 'Found you! Restoring progress...';
          setTimeout(function() { location.reload(); }, 1200);
        } else {
          status.style.background = 'rgba(220,38,38,.08)';
          status.style.color = '#DC2626';
          status.textContent = 'Name not found in that group. Check spelling and group code.';
        }
      });
    });

    document.getElementById('recoverDismiss').addEventListener('click', dismiss);
    backdrop.addEventListener('click', dismiss);
  }

  // ── Backup status indicator ────────────────────────────────
  function showBackupStatus() {
    if (!hasLocalData()) return;
    var lastBackup = localStorage.getItem(BACKUP_KEY);
    if (!lastBackup) return;
    var ms = Date.now() - new Date(lastBackup).getTime();
    var ago = ms < 60000 ? 'just now' : ms < 3600000 ? Math.floor(ms/60000) + 'm ago' : ms < 86400000 ? Math.floor(ms/3600000) + 'h ago' : Math.floor(ms/86400000) + 'd ago';
    var strip = document.querySelector('.ps-stats');
    if (strip && !strip.querySelector('.backup-status')) {
      var span = document.createElement('span');
      span.className = 'backup-status';
      span.style.cssText = 'color:var(--prof-strong,#16A34A);font-size:.65rem';
      span.innerHTML = '&#9679; Backed up ' + ago;
      strip.appendChild(span);
    }
  }

  // ── Init ───────────────────────────────────────────────────
  // Run immediately — no setTimeout needed since we patched localStorage.setItem
  // which catches all writes regardless of timing.
  if (!hasLocalData() && !localStorage.getItem('ccna_recovery_dismissed')) {
    // Small delay to let DOM settle for the banner
    setTimeout(showRecoveryBanner, 300);
  } else if (hasLocalData()) {
    // Show backup status on CORE page
    setTimeout(showBackupStatus, 500);
    // Push backup if none in last 24 hours
    var lastBackup = localStorage.getItem(BACKUP_KEY);
    if (!lastBackup || (Date.now() - new Date(lastBackup).getTime()) > 86400000) {
      setTimeout(pushBackup, 3000);
    }
  }

  // Expose for manual use
  window.autoBackup = { push: pushBackup, pull: pullBackup, recoverFromGroup: tryGroupRecovery };
})();
