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
    { text: 'Guide', href: 'guide.html' },
    { text: 'Learn', children: [
      { text: 'Learning Path', href: 'learning-path.html' },
      { text: 'Learn Visually', href: 'learn-visually.html' },
      { text: 'Packet Journey 3D', href: 'packet-journey.html' },
      { text: 'Subnetting', href: 'subnetting-visual.html' },
      { text: 'Command Reference', href: 'command-ref.html' },
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
      { text: 'Full Exam Replica', href: 'exam-replica.html' },
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
      { text: 'Exam Tricks', href: 'exam-tricks.html' },
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
      { text: 'Devices', href: 'devices.html' },
      { text: 'Glossary', href: 'netplus-glossary.html' },
      { text: 'Resources', href: 'netplus-resources.html' },
    ]},
    { text: 'Practice', children: [
      { text: 'Flashcards', href: 'netplus-flashcards.html' },
      { text: 'Diagnostic', href: 'netplus-diagnostic.html' },
      { text: 'Console Labs', href: 'console-labs.html' },
      { text: 'Network Lab', href: 'network-lab.html' },
      { text: 'IP Address Game', href: 'netplus-ip-game.html' },
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
        return '<a class="nav-drop-item' + (isActive(c.href) ? ' active' : '') + '" href="' + fixHref(c.href) + '">' + c.text + '</a>';
      }).join('');
      return '<div class="nav-group' + (hasActive ? ' active' : '') + '">' +
        '<button class="nav-group-btn" title="' + (TIPS[item.text]||'') + '">' + item.text + ' <span class="nav-caret">&#9662;</span></button>' +
        '<div class="nav-dropdown">' + dropdown + '</div></div>';
    }
    return '<a' + (isActive(item.href) ? ' class="active"' : '') + ' href="' + fixHref(item.href) + '" title="' + (TIPS[item.text]||'') + '">' + item.text + '</a>';
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

  // ── Device quick-search (global, works from any page) ──────────
  var DEV_INDEX = [
    {id:'internet',name:'Internet / ISP',keys:'isp wan cloud default route'},
    {id:'firewall',name:'Firewall (NGFW)',keys:'ngfw acl nat pat stateful ips'},
    {id:'ips',name:'IPS / IDS',keys:'intrusion prevention detection inline'},
    {id:'core_router',name:'Core Router',keys:'ospf area 0 backbone routing table'},
    {id:'l3_switch',name:'L3 Core Switch',keys:'svi inter-vlan routing ip routing'},
    {id:'dist_switch',name:'Distribution Switch',keys:'hsrp vrrp stp root bridge aggregation'},
    {id:'access_switch',name:'Access Switch',keys:'port security dhcp snooping dai portfast bpdu 802.1x poe'},
    {id:'wlc',name:'WLC',keys:'wireless controller capwap ssid roaming lightweight'},
    {id:'access_point',name:'Access Point',keys:'ap wifi 802.11 wi-fi 6 ax ac'},
    {id:'dns_server',name:'DNS Server',keys:'dns port 53 a aaaa cname mx nslookup'},
    {id:'dhcp_server',name:'DHCP Server',keys:'dhcp dora helper-address pool excluded ip address'},
    {id:'ntp_server',name:'NTP Server',keys:'ntp stratum time clock 123'},
    {id:'syslog_server',name:'Syslog / SNMP',keys:'syslog snmp trap severity logging 514 161'},
    {id:'aaa_server',name:'AAA Server',keys:'aaa radius tacacs 802.1x authentication authorization'},
    {id:'tftp_server',name:'TFTP / FTP',keys:'tftp ftp copy flash ios backup 69'},
    {id:'desktop',name:'Desktop PC',keys:'pc endpoint ipconfig ping arp vlan'},
    {id:'ip_phone',name:'IP Phone',keys:'voip voice vlan poe qos dscp ef'},
    {id:'laptop',name:'Laptop',keys:'wireless client supplicant wpa2 wpa3'},
    {id:'printer',name:'Printer',keys:'printer static ip excluded'},
    {id:'wireless_client',name:'Wireless Client',keys:'wifi guest ssid'},
    {id:'server_web',name:'Web Server',keys:'http https 80 443 tls'},
    {id:'ups',name:'UPS',keys:'ups power battery backup poe budget'},
  ];

  // ── Cert label — click to switch ────────────────────────────────
  var certLabel = document.createElement('a');
  certLabel.className = 'cert-label' + (isNetPlus ? ' netplus' : '');
  certLabel.textContent = isNetPlus ? 'NET+' : 'CCNA';
  certLabel.title = 'Switch to ' + (isNetPlus ? 'CCNA' : 'Net+');
  certLabel.href = '#';
  certLabel.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.setItem('ccna_cert_track', isNetPlus ? 'ccna' : 'net+');
    location.reload();
  });
  nav.appendChild(certLabel);

  var searchWrap = document.createElement('div');
  searchWrap.className = 'nav-search-wrap';
  searchWrap.innerHTML = '<input type="text" class="nav-dev-search" id="navDevSearch" placeholder="Search devices..." autocomplete="off"><div class="nav-dev-results" id="navDevResults"></div>';
  nav.appendChild(searchWrap);

  var devInput = document.getElementById('navDevSearch');
  var devResults = document.getElementById('navDevResults');

  devInput.addEventListener('input', function(){
    var q = this.value.toLowerCase().trim();
    if(!q){ devResults.innerHTML=''; devResults.classList.remove('open'); return; }
    var matches = DEV_INDEX.filter(function(d){
      return (d.name.toLowerCase()+' '+d.keys).indexOf(q) !== -1;
    }).slice(0,6);
    if(!matches.length){ devResults.innerHTML='<div class="nav-dev-none">No devices found</div>'; devResults.classList.add('open'); return; }
    devResults.innerHTML = matches.map(function(d){
      return '<a class="nav-dev-result" href="'+fixHref('devices.html')+'#'+d.id+'">'+d.name+'</a>';
    }).join('');
    devResults.classList.add('open');
  });

  devInput.addEventListener('keydown', function(e){
    if(e.key==='Escape'){ devResults.classList.remove('open'); this.blur(); }
    if(e.key==='Enter'){
      var first = devResults.querySelector('.nav-dev-result');
      if(first) window.location.href = first.href;
    }
  });

  document.addEventListener('click', function(e){
    if(!searchWrap.contains(e.target)) devResults.classList.remove('open');
  });

  // Beta badge + bug report
  var beta = document.createElement('div');
  beta.className = 'beta-badge';
  beta.innerHTML = '<a href="' + fixHref('changelog.html') + '" class="beta-tag" style="text-decoration:none">ALPHA v4.0.0</a><a href="' + fixHref('bug-report.html') + '" class="beta-bug">Report Bug</a>';
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

  // Guide pill — floating "Lost? Read the Guide" for confused users
  // Skips guide.html (you're already there) and core.html (has its own version)
  var pn = location.pathname;
  if (!/guide\.html/.test(pn) && !/core\.html/.test(pn)) {
    var pill = document.createElement('a');
    pill.href = fixHref('guide.html');
    pill.id = 'guidePill';
    pill.textContent = 'Lost? Read the Guide';
    pill.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:900;font-family:var(--font-display,system-ui);font-size:.78rem;font-weight:700;color:#fff;background:#B45309;padding:10px 22px;border-radius:100px;text-decoration:none;box-shadow:0 4px 16px rgba(180,83,9,.3);opacity:0;pointer-events:none;transition:opacity .3s,transform .2s';
    pill.onmouseover = function(){pill.style.transform='translateX(-50%) translateY(-2px)'};
    pill.onmouseout = function(){pill.style.transform='translateX(-50%)'};
    document.body.appendChild(pill);
    window.addEventListener('scroll', function(){
      var s = window.scrollY > 300;
      pill.style.opacity = s ? '1' : '0';
      pill.style.pointerEvents = s ? 'auto' : 'none';
    }, {passive:true});
  }
})();

