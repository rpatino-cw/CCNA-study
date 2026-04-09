/* Shared navigation — single source of truth for all CCNA pages */
(function () {
  var NAV_LINKS = [
    { text: 'Dashboard',     href: 'index.html' },
    { text: 'Knowledge Map', href: 'knowledge-map.html' },
    { text: 'Learning Path', href: 'learning-path.html' },
    { text: 'Diagnostic',    href: 'diagnostic.html' },
    { text: 'Quiz',          href: 'quiz.html' },
    { text: 'Daily Study',   href: 'study.html' },
    { text: 'Quests',        href: 'quests.html' },
    { text: 'Strategy',      href: 'strategy.html' },
    { text: 'Sprint',        href: 'sprint.html' },
    { text: 'Learn Visually', href: 'learn-visually.html' },
    { text: 'Subnetting',    href: 'subnetting-visual.html' },
    { text: '3D Explorer',  href: 'cidr-3d.html' },
    { text: 'Console Labs',  href: 'console-labs.html' },
    { text: 'Labs',          href: 'labs/index.html' },
    { text: 'Objectives',    href: 'objectives.html' },
    { text: 'Glossary',      href: 'glossary.html' },
    { text: 'Resources',     href: 'resources.html' }
  ];

  var nav = document.querySelector('nav.top-nav');
  if (!nav) return;

  // Detect subdirectory — labs/ or visuals/
  var path = location.pathname;
  var inSubdir = /\/(labs|visuals)\//.test(path);

  // Current filename for active detection
  var currentFile = path.split('/').pop() || 'index.html';
  var currentDir = path.substring(0, path.lastIndexOf('/') + 1);

  nav.innerHTML = NAV_LINKS.map(function (link) {
    var href = inSubdir ? '../' + link.href : link.href;

    // Determine if this link is the current page
    var isActive = false;
    if (inSubdir && /\/labs\//.test(currentDir) && link.href === 'labs/index.html') {
      isActive = true;
    } else if (!inSubdir && currentFile === link.href) {
      isActive = true;
    }

    return '<a' + (isActive ? ' class="active"' : '') + ' href="' + href + '">' + link.text + '</a>';
  }).join('\n    ');
})();
