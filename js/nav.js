/* Shared navigation — grouped dropdowns to keep it clean */
(function () {
  var TIPS = {
    'CORE': 'Your main study hub — all 53 objectives with videos, articles, and quizzes',
    'Guide': 'How to use this website — every page explained',
    'Learn': 'Reference material — visuals, glossary, devices, subnetting',
    'Practice': 'Active testing — quizzes, labs, exams, games',
    'Plan': 'Study scheduling — sprint plans and strategy',
    'Study Group': 'Study with friends — compare progress, chat, compete',
    'Net+': 'CompTIA Network+ hub — select Net+ as your cert track to unlock',
  };

  var certTrack = localStorage.getItem('ccna_cert_track') || 'ccna';

  var NAV = [
    { text: 'CORE', href: 'core.html' },
    { text: 'Guide', href: 'guide.html' },
    { text: 'Learn', children: [
      { text: 'Learning Path', href: 'learning-path.html' },
      { text: 'Learn Visually', href: 'learn-visually.html' },
      { text: 'Subnetting', href: 'subnetting-visual.html' },
      { text: 'Devices', href: 'devices.html' },
      { text: 'Glossary', href: 'glossary.html' },
      { text: 'Resources', href: 'resources.html' },
      { text: 'Exam Objectives', href: 'exam-objectives.html' },
      { text: 'Books', href: 'book.html' },
      { text: "Jeremy's IT Lab", href: 'jeremy-labs.html' },
    ]},
    { text: 'Practice', children: [
      { text: 'Flashcards', href: 'flashcards.html' },
      { text: 'Diagnostic', href: 'diagnostic.html' },
      { text: 'Study & Quiz', href: 'quiz.html' },
      { text: 'Console Labs', href: 'console-labs.html' },
      { text: 'Reading Practice', href: 'reading-practice.html' },
      { text: 'PT Labs', href: 'labs/index.html' },
      { text: 'Network Lab', href: 'network-lab.html' },
      { text: 'Explain It', href: 'explain.html' },
      { text: 'Exam Sim', href: 'exam-sim.html' },
      { text: 'OSPF Mastery', href: 'ospf-mastery.html' },
      { text: 'Subnet Mastery', href: 'subnetting-mastery.html' },
      { text: '3D Explorer', href: 'cidr-3d.html' },
      { text: '3D Topology', href: 'topology-3d.html' },
      { text: "What's Wrong?", href: 'whats-wrong.html' },
      { text: 'Speedrun', href: 'speedrun.html' },
      { text: 'Daily Challenge', href: 'daily-challenge.html' },
    ]},
    { text: 'Plan', children: [
      { text: 'Sprint', href: 'sprint.html' },
      { text: 'Strategy', href: 'strategy.html' },
      { text: 'Exam Details', href: 'exam-details.html' },
    ]},
    { text: 'Net+', href: 'netplus.html' },
    { text: 'Study Group', href: 'peers.html' },
  ];

  var nav = document.querySelector('nav.top-nav');
  if (!nav) return;

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

  nav.innerHTML = NAV.map(function (item) {
    if (item.children) {
      var hasActive = item.children.some(function(c) { return isActive(c.href); });
      var dropdown = item.children.map(function(c) {
        return '<a class="nav-drop-item' + (isActive(c.href) ? ' active' : '') + '" href="' + fixHref(c.href) + '">' + c.text + '</a>';
      }).join('');
      return '<div class="nav-group' + (hasActive ? ' active' : '') + '">' +
        '<button class="nav-group-btn" title="' + (TIPS[item.text]||'') + '">' + item.text + ' <span class="nav-caret">&#9662;</span></button>' +
        '<div class="nav-dropdown">' + dropdown + '</div></div>';
    }
    var locked = item.text === 'Net+' && certTrack !== 'net+';
    if (locked) return '<span style="padding:8px 10px;font-family:var(--font-display);font-size:.72rem;color:var(--ink-muted);opacity:.35;cursor:default" title="Select Network+ as your cert track in Study Group to unlock">' + item.text + '</span>';
    return '<a' + (isActive(item.href) ? ' class="active"' : '') + ' href="' + fixHref(item.href) + '" title="' + (TIPS[item.text]||'') + '"' + (item.text === 'Net+' ? ' style="color:#7C3AED;font-weight:700"' : '') + '>' + item.text + '</a>';
  }).join('\n    ');

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

  // Close dropdowns when clicking elsewhere
  document.addEventListener('click', function() {
    nav.querySelectorAll('.nav-group').forEach(function(g) { g.classList.remove('open'); });
  });

  // Beta badge + bug report
  var beta = document.createElement('div');
  beta.className = 'beta-badge';
  beta.innerHTML = '<a href="' + fixHref('changelog.html') + '" class="beta-tag" style="text-decoration:none">ALPHA v3.1.0</a><a href="' + fixHref('bug-report.html') + '" class="beta-bug">Report Bug</a>';
  document.body.appendChild(beta);

  // Auto-load backup script on every page
  var backupScript = document.createElement('script');
  backupScript.src = fixHref('js/auto-backup.js');
  document.body.appendChild(backupScript);

  // Auto-load XP toast notifications on every page
  var xpScript = document.createElement('script');
  xpScript.src = fixHref('js/xp-toast.js');
  document.body.appendChild(xpScript);
})();

