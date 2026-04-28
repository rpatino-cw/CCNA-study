/* Shared navigation — cert-aware, single nav, two content modes */
(function () {
  var certTrack = localStorage.getItem('ccna_cert_track') || 'ccna';
  var isNetPlus = certTrack === 'net+';

  var TIPS = {
    'CORE': isNetPlus ? 'Net+ hub — your Network+ command center' : 'Your main study hub — all 53 objectives with videos, articles, and quizzes',
    'Guide': 'How to use this website — every page explained',
    'Learn': 'Reference material — visuals, glossary, devices, subnetting',
    'Practice': 'Active testing — quizzes, labs, exams, games',
    'Plan': 'Study scheduling — sprint plans and strategy',
    'Study Group': 'Study with friends — compare progress, chat, compete',
  };

  /* ── Two complete NAV configs — pick one based on cert track ─── */

  var CCNA_NAV = [
    { text: 'CORE', href: 'core.html' },
    { text: 'Roadmap', href: 'roadmap.html' },
    { text: 'Guide', href: 'guide.html' },
    { text: 'Learn', href: 'learn-hub.html' },
    { text: 'Practice', href: 'practice-hub.html' },
    { text: 'Plan', children: [
      { text: 'Sprint', href: 'sprint.html' },
      { text: 'Strategy', href: 'strategy.html' },
      { text: 'Exam Details', href: 'exam-details.html' },
      { text: 'Exam Tricks', href: 'exam-tricks.html' },
      { text: 'Settings', href: 'settings.html' },
    ]},
    { text: 'Study Group', href: 'peers.html' },
  ];

  var NETPLUS_NAV = [
    { text: 'CORE', href: 'netplus.html' },
    { text: 'Guide', href: 'guide.html' },
    { text: 'Learn', children: [
      { text: 'Exam Objectives', href: 'netplus-objectives.html' },
      { text: 'OSI Interactive', href: 'netplus-osi.html' },
      { text: 'Routing Protocols', href: 'netplus-routing.html' },
      { text: 'Wireless Standards', href: 'netplus-wireless.html' },
      { text: 'Topology Explorer', href: 'netplus-topology.html' },
      { text: 'Subnetting', href: 'subnetting-visual.html' },
      { text: 'Devices & Topologies', href: 'devices.html' },
      { text: 'Glossary', href: 'netplus-glossary.html' },
      { text: 'Cheat Sheet', href: 'netplus-cheatsheet.html' },
      { text: 'Resources', href: 'netplus-resources.html' },
    ]},
    { text: 'Practice', children: [
      { text: 'PBQs', href: 'netplus-pbq.html' },
      { text: 'Quick Quiz', href: 'netplus-quiz.html' },
      { text: 'Port Drill', href: 'netplus-ports.html' },
      { text: 'Subnetting Drill', href: 'netplus-subnetting.html' },
      { text: 'Flashcards', href: 'netplus-flashcards.html' },
      { text: 'Diagnostic', href: 'netplus-diagnostic.html' },
      { text: 'Console Labs', href: 'console-labs.html' },
      { text: 'IP Address Game', href: 'netplus-ip-game.html' },
      { text: 'Mini Labs', href: 'netplus-minilab.html' },
      { text: 'Troubleshooting', href: 'netplus-troubleshoot.html' },
      { text: 'Exam Sim', href: 'netplus-exam.html' },
      { text: 'Daily Challenge', href: 'netplus-daily.html' },
    ]},
    { text: 'Plan', children: [
      { text: '4-Week Sprint', href: 'netplus-sprint.html' },
      { text: 'Exam Details', href: 'netplus-details.html' },
    ]},
    { text: 'Study Group', href: 'peers.html' },
  ];

  var NAV = isNetPlus ? NETPLUS_NAV : CCNA_NAV;

  var nav = document.querySelector('nav.top-nav');
  if (!nav) return;

  // Force nav to be a direct child of <body> so it's always full-width,
  // regardless of which container the page author placed it in.
  if (nav.parentElement !== document.body) {
    document.body.insertBefore(nav, document.body.firstChild);
  }

  var path = location.pathname;
  var inSubdir = /\/(labs|visuals)\//.test(path);
  var currentFile = path.split('/').pop() || 'index.html';
  var currentDir = path.substring(0, path.lastIndexOf('/') + 1);

  function isActive(href) {
    if (inSubdir && /\/labs\//.test(currentDir) && href === 'labs/index.html') return true;
    if (!inSubdir && currentFile === href) return true;
    return false;
  }

  function fixHref(href) { return inSubdir ? '../' + href : href; }

  // Apply Net+ mode class to nav for red border indicator
  if (isNetPlus) nav.classList.add('netplus-mode');

  nav.innerHTML = NAV.map(function (item) {
    if (item.children) {
      var hasActive = item.children.some(function(c) { return isActive(c.href); });
      var dropdown = item.children.map(function(c) {
        var cls = 'nav-drop-item' + (isActive(c.href) ? ' active' : '') + (c.href && c.href.indexOf('#3d') !== -1 ? ' nav-3d-link' : '');
        var inner = c.href && c.href.indexOf('#3d') !== -1 ? '<span class="nav-3d-badge">3D</span> ' + c.text : c.text;
        return '<a class="' + cls + '" href="' + fixHref(c.href) + '">' + inner + '</a>';
      }).join('');
      var wideClass = item.children.length > 8 ? ' nav-dropdown-wide' : '';
      return '<div class="nav-group' + (hasActive ? ' active' : '') + '">' +
        '<button class="nav-group-btn" title="' + (TIPS[item.text]||'') + '">' + item.text + ' <span class="nav-count">' + item.children.length + '</span><span class="nav-caret">&#9662;</span></button>' +
        '<div class="nav-dropdown' + wideClass + '">' + dropdown + '</div></div>';
    }
    return '<a' + (isActive(item.href) ? ' class="active"' : '') + ' href="' + fixHref(item.href) + '" title="' + (TIPS[item.text]||'') + '">' + item.text + '</a>';
  }).join('\n    ');

  // ── Mobile hamburger + drawer ─────────────────────────────────
  var hamburger = document.createElement('button');
  hamburger.className = 'nav-hamburger';
  hamburger.setAttribute('aria-label', 'Open navigation');
  hamburger.innerHTML = '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="4" y1="6" x2="18" y2="6"/><line x1="4" y1="11" x2="18" y2="11"/><line x1="4" y1="16" x2="18" y2="16"/></svg>';
  nav.insertBefore(hamburger, nav.firstChild);

  var mobileLabel = document.createElement('span');
  mobileLabel.className = 'nav-mobile-label';
  mobileLabel.textContent = isNetPlus ? 'Network+' : 'CCNA';
  nav.insertBefore(mobileLabel, hamburger.nextSibling);

  // Build flat drawer for mobile
  var drawer = document.createElement('div');
  drawer.className = 'nav-drawer';
  var dHtml = '';
  NAV.forEach(function(item) {
    if (item.children) {
      dHtml += '<div class="dr-section">' + item.text + '</div>';
      item.children.forEach(function(c) {
        dHtml += '<a class="dr-link dr-child' + (isActive(c.href) ? ' active' : '') + '" href="' + fixHref(c.href) + '">' + c.text + '</a>';
      });
    } else {
      dHtml += '<a class="dr-link' + (isActive(item.href) ? ' active' : '') + '" href="' + fixHref(item.href) + '">' + item.text + '</a>';
    }
  });
  drawer.innerHTML = dHtml;
  document.body.appendChild(drawer);

  // Toggle drawer
  var drawerOpen = false;
  function toggleDrawer() {
    drawerOpen = !drawerOpen;
    drawer.classList.toggle('open', drawerOpen);
    hamburger.setAttribute('aria-label', drawerOpen ? 'Close navigation' : 'Open navigation');
    hamburger.innerHTML = drawerOpen
      ? '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="6" y1="6" x2="16" y2="16"/><line x1="16" y1="6" x2="6" y2="16"/></svg>'
      : '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="4" y1="6" x2="18" y2="6"/><line x1="4" y1="11" x2="18" y2="11"/><line x1="4" y1="16" x2="18" y2="16"/></svg>';
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
  }
  hamburger.addEventListener('click', function(e) { e.stopPropagation(); toggleDrawer(); });
  // Close on link click
  drawer.querySelectorAll('.dr-link').forEach(function(a) {
    a.addEventListener('click', function() { if (drawerOpen) toggleDrawer(); });
  });
  // Close on escape
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape' && drawerOpen) toggleDrawer(); });

  // Toggle dropdowns on click (mobile + desktop)
  nav.querySelectorAll('.nav-group-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var group = btn.parentElement;
      var wasOpen = group.classList.contains('open');
      nav.querySelectorAll('.nav-group').forEach(function(g) { g.classList.remove('open'); });
      if (!wasOpen) group.classList.add('open');
    });
  });

  // Close dropdowns when clicking outside nav
  document.addEventListener('click', function(e) {
    if (!nav.contains(e.target)) {
      nav.querySelectorAll('.nav-group').forEach(function(g) { g.classList.remove('open'); });
    }
  });

  // Close dropdown after clicking a link inside it (let navigation happen first)
  nav.querySelectorAll('.nav-drop-item').forEach(function(link) {
    link.addEventListener('click', function() {
      setTimeout(function() {
        nav.querySelectorAll('.nav-group').forEach(function(g) { g.classList.remove('open'); });
      }, 50);
    });
  });

  // ── Cert toggle — only on core + study group pages ──────────────
  var togglePages = ['core.html','netplus.html','peers.html','index.html'];
  if (togglePages.indexOf(currentFile) !== -1) {
    var certToggle = document.createElement('div');
    certToggle.className = 'cert-toggle';
    certToggle.innerHTML =
      '<button class="ct-opt' + (!isNetPlus ? ' on' : '') + '" data-c="ccna" title="' + (!isNetPlus ? 'Currently studying CCNA 200-301' : 'Switch to CCNA 200-301') + '">CCNA</button>' +
      '<button class="ct-opt' + (isNetPlus ? ' on' : '') + '" data-c="net+" title="' + (isNetPlus ? 'Currently studying Network+ N10-009' : 'Switch to CompTIA Network+') + '">NET+</button>';
    nav.appendChild(certToggle);
    certToggle.querySelectorAll('.ct-opt').forEach(function(b) {
      b.addEventListener('click', function() {
        var c = b.getAttribute('data-c');
        if (c === certTrack) return;
        localStorage.setItem('ccna_cert_track', c);
        // Navigate to the correct landing page for the selected cert
        var targetMap = { 'ccna': 'core.html', 'net+': 'netplus.html' };
        var sharedPages = ['peers.html', 'index.html'];
        if (sharedPages.indexOf(currentFile) !== -1) {
          location.reload();
        } else {
          window.location.href = fixHref(targetMap[c] || 'core.html');
        }
      });
    });
  }

  // Beta badge + bug report
  var beta = document.createElement('div');
  beta.className = 'beta-badge';
  beta.innerHTML = '<a href="' + fixHref('changelog.html') + '" class="beta-tag" style="text-decoration:none">ALPHA v4.60.0</a><a href="' + fixHref('bug-report.html') + '" class="beta-bug">Report Bug</a>';
  document.body.appendChild(beta);

  // Auto-load backup script on every page
  var backupScript = document.createElement('script');
  backupScript.src = fixHref('js/auto-backup.js');
  document.body.appendChild(backupScript);

  // Auto-load XP toast notifications on every page
  var xpScript = document.createElement('script');
  xpScript.src = fixHref('js/xp-toast.js');
  document.body.appendChild(xpScript);

  // Mobile onboarding prompt (first visit, no group)
  var mobScript = document.createElement('script');
  mobScript.src = fixHref('js/mobile-onboard.js');
  document.body.appendChild(mobScript);

  // Settings panel — themes, display prefs, fun modes
  var settingsScript = document.createElement('script');
  settingsScript.src = fixHref('js/settings.js');
  document.body.appendChild(settingsScript);

  // Help pill — shows after 2 minutes of inactivity, points to AI tutor
  var pn = location.pathname;
  if (!/guide\.html/.test(pn)) {
    var pill = document.createElement('button');
    pill.id = 'guidePill';
    pill.textContent = 'Need help? Ask the AI Tutor';
    pill.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:900;font-family:var(--font-display,system-ui);font-size:.78rem;font-weight:700;color:#fff;background:#B45309;padding:10px 22px;border-radius:100px;border:none;cursor:pointer;box-shadow:0 4px 16px rgba(180,83,9,.3);opacity:0;pointer-events:none;transition:opacity .4s,transform .2s';
    pill.onmouseover = function(){pill.style.transform='translateX(-50%) translateY(-2px)'};
    pill.onmouseout = function(){pill.style.transform='translateX(-50%)'};
    pill.onclick = function(){var t=document.getElementById('tutorToggle');if(t)t.click();pill.style.opacity='0';pill.style.pointerEvents='none';};
    document.body.appendChild(pill);
    var pillTimer = setTimeout(function(){pill.style.opacity='1';pill.style.pointerEvents='auto';}, 120000);
    ['scroll','click','keydown','mousemove'].forEach(function(ev){
      document.addEventListener(ev, function(){clearTimeout(pillTimer);pill.style.opacity='0';pill.style.pointerEvents='none';pillTimer=setTimeout(function(){pill.style.opacity='1';pill.style.pointerEvents='auto';},120000);}, {passive:true,once:false});
    });
  }
})();

