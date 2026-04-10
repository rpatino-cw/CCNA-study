/* Shared navigation — grouped dropdowns to keep it clean */
(function () {
  var NAV = [
    { text: 'Dashboard', href: 'index.html' },
    { text: 'Learn', children: [
      { text: 'Knowledge Map', href: 'knowledge-map.html' },
      { text: 'Learning Path', href: 'learning-path.html' },
      { text: 'Learn Visually', href: 'learn-visually.html' },
      { text: 'Subnetting', href: 'subnetting-visual.html' },
      { text: 'Devices', href: 'devices.html' },
      { text: 'Glossary', href: 'glossary.html' },
      { text: 'Objectives', href: 'objectives.html' },
      { text: 'Resources', href: 'resources.html' },
    ]},
    { text: 'Practice', children: [
      { text: 'Diagnostic', href: 'diagnostic.html' },
      { text: 'Quiz', href: 'quiz.html' },
      { text: 'Daily Study', href: 'study.html' },
      { text: 'Console Labs', href: 'console-labs.html' },
      { text: 'PT Labs', href: 'labs/index.html' },
      { text: 'Packet Race', href: 'packet-race.html' },
      { text: '3D Explorer', href: 'cidr-3d.html' },
      { text: '3D Topology', href: 'topology-3d.html' },
    ]},
    { text: 'Plan', children: [
      { text: 'Sprint', href: 'sprint.html' },
      { text: 'Strategy', href: 'strategy.html' },
      { text: 'Quests', href: 'quests.html' },
    ]},
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
        '<button class="nav-group-btn">' + item.text + ' <span class="nav-caret">&#9662;</span></button>' +
        '<div class="nav-dropdown">' + dropdown + '</div></div>';
    }
    return '<a' + (isActive(item.href) ? ' class="active"' : '') + ' href="' + fixHref(item.href) + '">' + item.text + '</a>';
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
  beta.innerHTML = '<span class="beta-tag">BETA v0.9</span><a href="' + fixHref('bug-report.html') + '" class="beta-bug">Report Bug</a>';
  document.body.appendChild(beta);
})();

