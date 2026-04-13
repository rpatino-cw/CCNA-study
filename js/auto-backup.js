/**
 * auto-backup.js — Silent cloud backup + auto-restore for all users
 * No group required. Works for solo users too.
 *
 * On every store change: debounced push to CF Worker KV (90-day TTL)
 * On page load with empty localStorage: check server, restore if found
 */
(function() {
  var API = 'https://ccna-tutor.rpatino-cw.workers.dev';
  var BACKUP_DEBOUNCE = 10000; // 10 seconds after last change
  var BACKUP_KEY = 'ccna_last_backup';
  var debounceTimer = null;

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
    try {
      var obj = JSON.parse(prof);
      return Object.keys(obj).length > 0;
    } catch(e) { return false; }
  }

  // ── Push backup to server ──────────────────────────────────
  function pushBackup() {
    if (!window.store) return;
    try {
      var data = store.exportAll();
      if (!data || data === '{}') return;

      fetch(API + '/api/backup/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ peerId: getPeerId(), data: data })
      }).then(function(res) {
        if (res.ok) {
          localStorage.setItem(BACKUP_KEY, new Date().toISOString());
        }
      }).catch(function() { /* silent fail */ });
    } catch(e) { /* silent fail */ }
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
          store.importAll(result.data);
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
      if (!result.ok || !result.progress) return false;
      // Restore proficiency from group snapshot
      if (result.progress.proficiency && window.store) {
        var prof = result.progress.proficiency;
        Object.keys(prof).forEach(function(k) {
          store.set('proficiency', prof);
        });
        localStorage.setItem('ccna_proficiency', JSON.stringify(prof));
      }
      // Restore peer identity
      if (result.memberId) localStorage.setItem('ccna_peer_id', result.memberId);
      if (result.groupCode) localStorage.setItem('ccna_peer_group', result.groupCode);
      if (result.name) localStorage.setItem('ccna_peer_name', result.name);
      return true;
    })
    .catch(function() { return false; });
  }

  // ── Schedule backup on store changes ───────────────────────
  function scheduleBackup() {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(pushBackup, BACKUP_DEBOUNCE);
  }

  // ── Hook into store writes ─────────────────────────────────
  // Monkey-patch store methods to trigger backup
  function hookStore() {
    if (!window.store) return;
    var methods = ['updateProficiency', 'saveDiagnostic', 'addQuizSession', 'updateStreak', 'logStudyTime', 'recordTopicStudy'];
    methods.forEach(function(name) {
      var original = store[name];
      if (!original) return;
      store[name] = function() {
        var result = original.apply(store, arguments);
        scheduleBackup();
        return result;
      };
    });
  }

  // ── Render recovery UI ─────────────────────────────────────
  function showRecoveryBanner() {
    // Don't show if user already has data
    if (hasLocalData()) return;

    var banner = document.createElement('div');
    banner.id = 'recoveryBanner';
    banner.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);z-index:9000;background:#FAF7F2;border:1px solid #E2DFD9;border-radius:12px;padding:16px 20px;max-width:420px;width:90%;box-shadow:0 8px 24px rgba(0,0,0,0.12);font-family:"Space Grotesk",system-ui,sans-serif';
    banner.innerHTML =
      '<div style="font-size:.9rem;font-weight:700;color:#1C1917;margin-bottom:6px">Welcome back — or starting fresh?</div>' +
      '<div style="font-size:.78rem;color:#57534E;line-height:1.5;margin-bottom:12px">If you\'ve used this site before, we can restore your progress. Your data is auto-backed up to the cloud.</div>' +
      '<div style="display:flex;flex-direction:column;gap:6px">' +
        '<button id="recoverAutoBtn" style="padding:8px 14px;background:#1C1917;color:#FAF7F2;border:none;border-radius:6px;font-family:inherit;font-size:.78rem;font-weight:600;cursor:pointer">Restore My Progress</button>' +
        '<button id="recoverGroupBtn" style="padding:8px 14px;background:none;border:1px solid #E2DFD9;color:#57534E;border-radius:6px;font-family:inherit;font-size:.78rem;cursor:pointer">Recover from Study Group</button>' +
        '<button id="recoverDismiss" style="padding:4px;background:none;border:none;color:#A8A29E;font-family:inherit;font-size:.72rem;cursor:pointer;text-decoration:underline">Start fresh — I\'m new here</button>' +
      '</div>' +
      '<div id="recoverStatus" style="display:none;margin-top:8px;font-size:.75rem;padding:8px;border-radius:4px"></div>' +
      '<div id="recoverGroupForm" style="display:none;margin-top:8px">' +
        '<input id="recoverCode" placeholder="Group code (6 chars)" style="width:100%;padding:6px 10px;border:1px solid #E2DFD9;border-radius:4px;font-family:monospace;font-size:.82rem;margin-bottom:4px;text-transform:uppercase" maxlength="6">' +
        '<input id="recoverName" placeholder="Your display name" style="width:100%;padding:6px 10px;border:1px solid #E2DFD9;border-radius:4px;font-size:.82rem;margin-bottom:6px">' +
        '<button id="recoverGroupGo" style="padding:6px 14px;background:#B45309;color:#fff;border:none;border-radius:4px;font-family:inherit;font-size:.75rem;font-weight:600;cursor:pointer">Recover</button>' +
      '</div>';

    document.body.appendChild(banner);

    // Auto-restore button
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
          setTimeout(function() { location.reload(); }, 1500);
        } else {
          status.style.background = 'rgba(220,38,38,.08)';
          status.style.color = '#DC2626';
          status.textContent = 'No backup found for this browser. Try recovering from your Study Group below.';
        }
      });
    });

    // Group recovery
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
      status.textContent = 'Searching group for ' + name + '...';

      tryGroupRecovery(code, name).then(function(restored) {
        if (restored) {
          status.style.background = 'rgba(22,163,74,.08)';
          status.style.color = '#16A34A';
          status.textContent = 'Found you! Progress restored. Reloading...';
          setTimeout(function() { location.reload(); }, 1500);
        } else {
          status.style.background = 'rgba(220,38,38,.08)';
          status.style.color = '#DC2626';
          status.textContent = 'Name not found in that group. Check your group code and name spelling.';
        }
      });
    });

    // Dismiss
    document.getElementById('recoverDismiss').addEventListener('click', function() {
      banner.remove();
      localStorage.setItem('ccna_recovery_dismissed', '1');
    });
  }

  // ── Backup status indicator (subtle) ───────────────────────
  function showBackupStatus() {
    if (!hasLocalData()) return;
    var lastBackup = localStorage.getItem(BACKUP_KEY);
    if (!lastBackup) return;

    var ms = Date.now() - new Date(lastBackup).getTime();
    var ago = ms < 60000 ? 'just now' : ms < 3600000 ? Math.floor(ms/60000) + 'm ago' : ms < 86400000 ? Math.floor(ms/3600000) + 'h ago' : Math.floor(ms/86400000) + 'd ago';

    // Add to progress strip if it exists
    var strip = document.querySelector('.ps-stats');
    if (strip && !strip.querySelector('.backup-status')) {
      var span = document.createElement('span');
      span.className = 'backup-status';
      span.style.cssText = 'color:var(--prof-strong);font-size:.68rem';
      span.innerHTML = '&#9679; Backed up ' + ago;
      strip.appendChild(span);
    }
  }

  // ── Init ───────────────────────────────────────────────────
  function init() {
    hookStore();

    if (!hasLocalData() && !localStorage.getItem('ccna_recovery_dismissed')) {
      // No data — show recovery options
      showRecoveryBanner();
    } else if (hasLocalData()) {
      // Has data — ensure backup is running
      showBackupStatus();
      // If no backup in last 24 hours, push one now
      var lastBackup = localStorage.getItem(BACKUP_KEY);
      if (!lastBackup || (Date.now() - new Date(lastBackup).getTime()) > 86400000) {
        setTimeout(pushBackup, 3000); // slight delay to not block page load
      }
    }
  }

  // Wait for store to be available
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(init, 500); });
  } else {
    setTimeout(init, 500);
  }

  // Expose for manual use
  window.autoBackup = {
    push: pushBackup,
    pull: pullBackup,
    recoverFromGroup: tryGroupRecovery
  };
})();
