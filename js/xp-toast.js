/**
 * xp-toast.js — Floating XP notifications on every proficiency change
 * Shows "+XP" toast, level-up celebration, and undo button.
 * Loads on every page via nav.js.
 */
(function() {
  // ── XP Calculation ─────────────────────────────────────────
  var LEVELS = [
    { name: 'Newbie',       min: 0,    color: '#64748B', bg: 'rgba(148,163,184,.15)' },
    { name: 'Student',      min: 100,  color: '#2563EB', bg: 'rgba(37,99,235,.1)' },
    { name: 'Practitioner', min: 500,  color: '#7C3AED', bg: 'rgba(124,58,237,.1)' },
    { name: 'Associate',    min: 1000, color: '#B45309', bg: 'rgba(180,83,9,.1)' },
    { name: 'Engineer',     min: 2500, color: '#16A34A', bg: 'rgba(22,163,74,.1)' },
  ];

  function calcXP() {
    try {
      var prof = JSON.parse(localStorage.getItem('ccna_proficiency') || '{}');
      var streak = JSON.parse(localStorage.getItem('ccna_streak') || '{}');
      var time = JSON.parse(localStorage.getItem('ccna_study_time') || '{}');
      var history = JSON.parse(localStorage.getItem('ccna_quiz_history') || '[]');
      var quizzes = Array.isArray(history) ? history.length : 0;
      var readiness = 0;
      var count = 0;
      Object.values(prof).forEach(function(v) { readiness += v; count++; });
      readiness = count > 0 ? Math.round((readiness / count) * 100) : 0;
      return (quizzes * 50) + (readiness * 10) + ((streak.current || 0) * 20) + Math.floor((time.total || 0) / 2);
    } catch(e) { return 0; }
  }

  function getLevel(xp) {
    for (var i = LEVELS.length - 1; i >= 0; i--) {
      if (xp >= LEVELS[i].min) return LEVELS[i];
    }
    return LEVELS[0];
  }

  // ── Inject CSS ─────────────────────────────────────────────
  var style = document.createElement('style');
  style.textContent =
    '@keyframes xpFloat{0%{opacity:0;transform:translateY(10px) scale(0.8)}15%{opacity:1;transform:translateY(0) scale(1)}85%{opacity:1;transform:translateY(-20px)}100%{opacity:0;transform:translateY(-40px) scale(0.9)}}' +
    '@keyframes levelUp{0%{opacity:0;transform:translate(-50%,-50%) scale(0.5)}20%{opacity:1;transform:translate(-50%,-50%) scale(1.1)}40%{transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-50%) scale(0.8)}}' +
    '@keyframes xpShine{0%{box-shadow:0 0 0 0 rgba(180,83,9,.4)}50%{box-shadow:0 0 20px 4px rgba(180,83,9,.2)}100%{box-shadow:0 0 0 0 rgba(180,83,9,0)}}' +
    '.xp-toast{position:fixed;z-index:9600;font-family:"Space Grotesk",system-ui,sans-serif;pointer-events:auto;animation:xpFloat 2.5s ease forwards;will-change:transform,opacity;contain:layout paint}' +
    '.xp-toast-inner{display:flex;align-items:center;gap:8px;padding:8px 16px;background:#1C1917;color:#FAF7F2;border-radius:10px;box-shadow:0 4px 16px rgba(0,0,0,.2);animation:xpShine 1s ease}' +
    '.xp-toast .xp-val{font-family:"JetBrains Mono",monospace;font-size:1rem;font-weight:800;color:#FDE68A}' +
    '.xp-toast .xp-label{font-size:.72rem;color:#A8A29E}' +
    '.xp-toast .xp-undo{font-size:.65rem;color:#94A3B8;cursor:pointer;text-decoration:underline;text-underline-offset:2px;margin-left:4px}' +
    '.xp-toast .xp-undo:hover{color:#FDE68A}' +
    '.xp-levelup{position:fixed;top:50%;left:50%;z-index:9700;animation:levelUp 3s ease forwards;pointer-events:none;will-change:transform,opacity;contain:layout paint}' +
    '.xp-levelup-inner{background:#1C1917;color:#FAF7F2;padding:20px 32px;border-radius:14px;text-align:center;box-shadow:0 8px 32px rgba(0,0,0,.3)}' +
    '.xp-levelup .lu-title{font-size:.72rem;color:#A8A29E;text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px}' +
    '.xp-levelup .lu-level{font-size:1.4rem;font-weight:900;margin-bottom:4px}' +
    '.xp-levelup .lu-xp{font-family:"JetBrains Mono",monospace;font-size:.78rem;color:#FDE68A}';
  document.head.appendChild(style);

  // ── State ──────────────────────────────────────────────────
  var lastXP = calcXP();
  var lastLevel = getLevel(lastXP).name;
  var toastQueue = [];
  var toastY = 100; // stagger position from top

  // ── Show XP Toast ──────────────────────────────────────────
  function showXPToast(xpGain, topic, undoFn) {
    var toast = document.createElement('div');
    toast.className = 'xp-toast';
    toast.style.top = toastY + 'px';
    toast.style.right = '20px';
    toastY += 50;
    setTimeout(function() { toastY = Math.max(toastY - 50, 100); }, 2600);

    var inner = '<div class="xp-toast-inner">' +
      '<span class="xp-val">+' + xpGain + ' XP</span>' +
      '<span class="xp-label">' + (topic || '') + '</span>';
    if (undoFn) {
      inner += '<span class="xp-undo" id="xpUndo' + Date.now() + '">Undo</span>';
    }
    inner += '</div>';
    toast.innerHTML = inner;
    document.body.appendChild(toast);

    // Wire undo
    if (undoFn) {
      var undoBtn = toast.querySelector('.xp-undo');
      if (undoBtn) {
        undoBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          undoFn();
          toast.remove();
          showUndoToast();
        });
      }
    }

    setTimeout(function() { toast.remove(); }, 2600);
  }

  function showUndoToast() {
    var toast = document.createElement('div');
    toast.className = 'xp-toast';
    toast.style.top = '100px';
    toast.style.right = '20px';
    toast.innerHTML = '<div class="xp-toast-inner"><span class="xp-label" style="color:#FDE68A">Undone — score reverted</span></div>';
    document.body.appendChild(toast);
    setTimeout(function() { toast.remove(); }, 2000);
  }

  // ── Show Level Up ──────────────────────────────────────────
  function showLevelUp(level) {
    var el = document.createElement('div');
    el.className = 'xp-levelup';
    el.innerHTML = '<div class="xp-levelup-inner">' +
      '<div class="lu-title">Level Up!</div>' +
      '<div class="lu-level" style="color:' + level.color + '">' + level.name + '</div>' +
      '<div class="lu-xp">' + calcXP().toLocaleString() + ' XP</div>' +
      '</div>';
    document.body.appendChild(el);
    setTimeout(function() { el.remove(); }, 3200);
  }

  // ── Hook into store.updateProficiency ──────────────────────
  function hookProficiency() {
    if (!window.store || !store.updateProficiency) return;
    var original = store.updateProficiency;
    store.updateProficiency = function(topicId, wasCorrect) {
      var oldProf = store.getAllProficiency();
      var oldScore = oldProf[topicId] || 0;
      var beforeXP = calcXP();
      var beforeLevel = getLevel(beforeXP).name;

      // Call original
      var result = original.apply(store, arguments);

      var afterXP = calcXP();
      var afterLevel = getLevel(afterXP).name;
      var xpGain = afterXP - beforeXP;

      if (xpGain > 0) {
        // Build undo function
        var undoFn = function() {
          var all = JSON.parse(localStorage.getItem('ccna_proficiency') || '{}');
          all[topicId] = oldScore;
          localStorage.setItem('ccna_proficiency', JSON.stringify(all));
        };

        showXPToast(xpGain, topicId, undoFn);

        // Level up check
        if (afterLevel !== beforeLevel) {
          setTimeout(function() { showLevelUp(getLevel(afterXP)); }, 600);
        }
      }

      lastXP = afterXP;
      lastLevel = afterLevel;
      return result;
    };
  }

  // ── Init ───────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(hookProficiency, 300); });
  } else {
    setTimeout(hookProficiency, 300);
  }
})();
