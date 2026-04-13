/**
 * mobile-onboard.js — First-visit mobile prompt to join study group
 * Shows only on mobile (< 768px), only once, only if no group joined.
 * Loaded via nav.js on every page.
 */
(function() {
  // Only on mobile
  if (window.innerWidth >= 768) return;
  // Only if no group joined
  if (localStorage.getItem('ccna_peer_group')) return;
  // Only once
  if (localStorage.getItem('ccna_mobile_onboard_dismissed')) return;
  // Only if no proficiency data (truly first visit)
  var prof = localStorage.getItem('ccna_proficiency');
  if (prof && Object.keys(JSON.parse(prof || '{}')).length > 5) return;

  // Wait for DOM
  setTimeout(function() {
    var overlay = document.createElement('div');
    overlay.id = 'mobileOnboard';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:9800;background:rgba(28,25,23,0.5);display:flex;align-items:flex-end;justify-content:center;backdrop-filter:blur(2px)';

    overlay.innerHTML =
      '<div style="background:#FAF7F2;border-radius:16px 16px 0 0;width:100%;max-width:420px;padding:24px 20px 32px;box-shadow:0 -8px 32px rgba(0,0,0,0.15)">' +
        '<div style="width:40px;height:4px;background:#D4D0C8;border-radius:2px;margin:0 auto 16px"></div>' +
        '<h3 style="font-family:\'Space Grotesk\',sans-serif;font-size:1.1rem;font-weight:800;color:#1C1917;margin-bottom:8px;text-align:center">Welcome to CCNA Study</h3>' +
        '<p style="font-family:\'Source Serif 4\',Georgia,serif;font-size:.88rem;color:#57534E;line-height:1.55;text-align:center;margin-bottom:16px">Join a study group to sync your progress across devices, compete with friends, and never lose your data.</p>' +

        '<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px">' +
          '<a href="peers.html" style="display:block;padding:12px 16px;background:#1C1917;color:#FAF7F2;border-radius:10px;text-align:center;font-family:\'Space Grotesk\',sans-serif;font-size:.88rem;font-weight:700;text-decoration:none">Join or Create a Study Group</a>' +
          '<div style="text-align:center;font-family:\'Space Grotesk\',sans-serif;font-size:.72rem;color:#A8A29E;margin:2px 0">or</div>' +
          '<a href="peers.html#recover" style="display:block;padding:10px 16px;background:none;border:1px solid #E2DFD9;color:#57534E;border-radius:10px;text-align:center;font-family:\'Space Grotesk\',sans-serif;font-size:.82rem;text-decoration:none">Recover My Account (code + name)</a>' +
        '</div>' +

        '<div style="background:#F3F0EB;border-radius:8px;padding:12px 14px;margin-bottom:16px">' +
          '<div style="font-family:\'Space Grotesk\',sans-serif;font-size:.75rem;font-weight:700;color:#1C1917;margin-bottom:4px">Why join a group?</div>' +
          '<div style="font-family:\'Source Serif 4\',Georgia,serif;font-size:.78rem;color:#57534E;line-height:1.5">' +
            'Your study progress is saved in your browser. If you clear your data or switch phones, it\'s gone — unless you\'re in a group. Your group backs up everything automatically.' +
          '</div>' +
        '</div>' +

        '<button id="mobileOnboardDismiss" style="display:block;width:100%;padding:8px;background:none;border:none;color:#A8A29E;font-family:\'Space Grotesk\',sans-serif;font-size:.75rem;cursor:pointer;text-decoration:underline;text-underline-offset:2px">Skip — I\'ll study solo for now</button>' +
      '</div>';

    document.body.appendChild(overlay);

    document.getElementById('mobileOnboardDismiss').addEventListener('click', function() {
      localStorage.setItem('ccna_mobile_onboard_dismissed', '1');
      overlay.remove();
    });

    // Dismiss on backdrop click
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        localStorage.setItem('ccna_mobile_onboard_dismissed', '1');
        overlay.remove();
      }
    });
  }, 1000);
})();
