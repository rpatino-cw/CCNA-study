/* ═══════════════════════════════════════════════════════════════════
   v6-intro.js — one-time Version 6 launch reveal.
   Sequence: backdrop blur → loader bar fills → morphs into card →
             letter-stagger headline → content cascade → particle burst.
   Auto-fires on core.html / index.html until user dismisses.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var KEY = 'ccna_v6_intro_seen';
  if (localStorage.getItem(KEY)) return;

  var p = (location.pathname || '').toLowerCase();
  var onLanding = /core\.html$|index\.html$|\/$/.test(p);
  if (!onLanding) return;

  var UPDATES = [
    {
      tag: 'v5.4',
      title: '73 per-leaf Mini Sims',
      body: 'Interactive simulators across all 6 CCNA domains — one for every blueprint objective.'
    },
    {
      tag: 'v4.58',
      title: 'Mastery Path + FSRS spaced recall',
      body: 'Algorithmic study schedule that surfaces the next card based on memory decay, not random order.'
    },
    {
      tag: 'v4.63',
      title: 'Cross-device sync',
      body: 'Pull progress between phone and laptop with a 12-character key. Cloud-backed, end-to-end.'
    },
    {
      tag: 'v4.63',
      title: 'Inline flashcard viewer (SM-2)',
      body: 'Study Anki cards in the browser with real spaced repetition. No app, no install.'
    },
    {
      tag: 'v4.49',
      title: 'Packet-Tracer-style sims + 27 community labs',
      body: 'Three built-in network simulators plus 27 open-source Packet Tracer topologies.'
    }
  ];

  var EASE = 'cubic-bezier(.16,1,.3,1)';
  var HEADLINE = 'Version 6 is out';

  /* ── Inject CSS ─────────────────────────────────────────────── */
  var style = document.createElement('style');
  style.id = 'v6intro-css';
  style.textContent = [
    '#v6intro{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;font-family:var(--font-display,system-ui);opacity:0;transition:opacity .55s ' + EASE + '}',
    '#v6intro.on{opacity:1}',
    '#v6intro.out{opacity:0;transition:opacity .5s ' + EASE + '}',

    /* Backdrop */
    '#v6intro .v6-back{position:absolute;inset:0;background:radial-gradient(1200px 800px at 50% 30%,rgba(180,83,9,.18),transparent 70%),rgba(20,16,12,.52);-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);transition:-webkit-backdrop-filter 1.1s ' + EASE + ',backdrop-filter 1.1s ' + EASE + '}',
    '#v6intro.on .v6-back{-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}',

    /* Halo */
    '#v6intro .v6-halo{position:absolute;top:50%;left:50%;width:880px;height:880px;max-width:120vw;max-height:120vw;transform:translate(-50%,-50%);background:radial-gradient(closest-side,rgba(255,191,90,.32),rgba(255,191,90,.08) 45%,transparent 70%);filter:blur(20px);animation:v6drift 11s ' + EASE + ' infinite alternate;pointer-events:none;opacity:0;transition:opacity 1.1s ' + EASE + '}',
    '#v6intro.on .v6-halo{opacity:1}',
    '@keyframes v6drift{from{transform:translate(-52%,-48%) scale(1)}to{transform:translate(-48%,-52%) scale(1.08)}}',

    /* Sparkles */
    '#v6intro .v6-spark{position:absolute;inset:0;pointer-events:none;overflow:hidden;opacity:0;transition:opacity .9s ' + EASE + '}',
    '#v6intro.morph .v6-spark{opacity:1}',
    '#v6intro .v6-spark span{position:absolute;width:3px;height:3px;border-radius:50%;background:rgba(255,220,160,.85);box-shadow:0 0 6px rgba(255,200,120,.9);opacity:0;animation:v6twinkle 3.4s ' + EASE + ' infinite}',
    '@keyframes v6twinkle{0%{opacity:0;transform:scale(.6)}40%{opacity:1;transform:scale(1.4)}100%{opacity:0;transform:scale(.6)}}',

    /* ── Phase 1: Loader bar (sits where card top edge will be) ──── */
    '#v6intro .v6-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;pointer-events:none;opacity:0;transition:opacity .5s ' + EASE + '}',
    '#v6intro.on .v6-loader{opacity:1}',
    '#v6intro.morph .v6-loader{opacity:0;transform:translate(-50%,calc(-50% - 12px));transition:opacity .35s ease,transform .6s ' + EASE + '}',
    '#v6intro .v6-loader-cap{font-size:.66rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,235,200,.85);margin-bottom:14px;text-shadow:0 1px 8px rgba(0,0,0,.4)}',
    '#v6intro .v6-loader-bar{width:280px;height:3px;background:rgba(255,255,255,.1);border-radius:99px;overflow:hidden;margin:0 auto;box-shadow:0 0 0 1px rgba(255,255,255,.05)}',
    '#v6intro .v6-loader-fill{width:0;height:100%;background:linear-gradient(90deg,#B45309,#E89B3D,#FFD89A);border-radius:99px;box-shadow:0 0 14px rgba(255,200,120,.9)}',
    '#v6intro.on .v6-loader-fill{width:100%;transition:width .9s cubic-bezier(.4,0,.2,1)}',

    /* Card */
    '#v6intro .v6-card{position:relative;max-width:720px;width:calc(100% - 48px);padding:48px 44px 36px;border-radius:22px;background:linear-gradient(180deg,rgba(255,250,243,.97),rgba(250,243,232,.94));border:1px solid rgba(180,83,9,.18);box-shadow:0 40px 120px rgba(20,12,4,.45),0 8px 24px rgba(180,83,9,.18),inset 0 1px 0 rgba(255,255,255,.6);opacity:0;transform:translateY(24px) scale(.97);transition:opacity .8s ' + EASE + ',transform .95s ' + EASE + '}',
    '#v6intro.morph .v6-card{opacity:1;transform:translateY(0) scale(1)}',
    /* Card top edge — gold rule that the loader bar morphs into */
    '#v6intro .v6-card::before{content:"";position:absolute;top:-1px;left:50%;transform:translateX(-50%);width:0;height:3px;background:linear-gradient(90deg,#B45309,#E89B3D,#FFD89A,#E89B3D,#B45309);border-radius:99px;box-shadow:0 0 14px rgba(255,200,120,.7);transition:width .55s ' + EASE + ' .05s}',
    '#v6intro.morph .v6-card::before{width:88%}',

    /* Tag */
    '#v6intro .v6-tag{display:inline-block;font-size:.66rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#B45309;background:rgba(180,83,9,.08);border:1px solid rgba(180,83,9,.18);padding:5px 12px;border-radius:99px;margin-bottom:18px;opacity:0;transform:translateY(8px);transition:all .7s .15s ' + EASE + '}',
    '#v6intro.morph .v6-tag{opacity:1;transform:translateY(0)}',

    /* Headline + per-char stagger */
    '#v6intro .v6-h1{font-family:var(--font-serif,"Source Serif 4",Georgia,serif);font-size:clamp(2.4rem,6vw,3.6rem);font-weight:800;line-height:1.02;letter-spacing:-.02em;margin:0 0 6px;background:linear-gradient(95deg,#7a3a04 0%,#B45309 30%,#E89B3D 50%,#B45309 70%,#7a3a04 100%);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:v6shimmer 6.5s linear infinite}',
    '@keyframes v6shimmer{from{background-position:0% 0}to{background-position:220% 0}}',
    '#v6intro .v6-ch{display:inline-block;opacity:0;transform:translateY(18px) rotateX(-40deg);transform-origin:50% 100%;transition:opacity .55s ' + EASE + ',transform .75s ' + EASE + ';will-change:transform,opacity}',
    '#v6intro .v6-sp{display:inline-block;width:.28em}',
    '#v6intro.morph .v6-ch{opacity:1;transform:translateY(0) rotateX(0)}',

    /* Subtitle */
    '#v6intro .v6-sub{font-size:1rem;color:#5b4838;margin:0 0 28px;opacity:0;transform:translateY(10px);transition:all .8s ' + EASE + '}',
    '#v6intro.morph .v6-sub{opacity:1;transform:translateY(0);transition-delay:.85s}',

    /* Section label */
    '#v6intro .v6-since{display:flex;align-items:center;gap:12px;font-size:.66rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#8a6a4a;margin:0 0 14px;opacity:0;transform:translateX(-8px);transition:all .8s ' + EASE + '}',
    '#v6intro.morph .v6-since{opacity:1;transform:translateX(0);transition-delay:.95s}',
    '#v6intro .v6-since::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,rgba(180,83,9,.35),transparent)}',

    /* List */
    '#v6intro .v6-list{display:flex;flex-direction:column;gap:10px;margin:0 0 26px;list-style:none;padding:0}',
    '#v6intro .v6-item{display:flex;gap:14px;padding:14px 16px;background:rgba(255,255,255,.65);border:1px solid rgba(180,83,9,.1);border-radius:12px;opacity:0;transform:translateX(18px);filter:blur(6px);transition:opacity .7s ' + EASE + ',transform .85s ' + EASE + ',filter .6s ' + EASE + '}',
    '#v6intro.morph .v6-item{opacity:1;transform:translateX(0);filter:blur(0)}',
    '#v6intro .v6-item-tag{flex:0 0 auto;font-family:"JetBrains Mono",ui-monospace,monospace;font-size:.66rem;font-weight:700;color:#B45309;background:rgba(180,83,9,.1);padding:4px 8px;border-radius:6px;height:fit-content;letter-spacing:.04em}',
    '#v6intro .v6-item-text{flex:1;min-width:0}',
    '#v6intro .v6-item-title{font-weight:700;color:#2a1f14;font-size:.95rem;margin-bottom:3px;line-height:1.3}',
    '#v6intro .v6-item-body{font-size:.82rem;color:#6b5640;line-height:1.5}',

    /* Dismiss btn */
    '#v6intro .v6-go{display:block;margin:0 auto;font-family:inherit;font-size:.86rem;font-weight:700;color:#fff;background:linear-gradient(180deg,#C16513,#9a4a08);border:0;border-radius:99px;padding:13px 32px;cursor:pointer;letter-spacing:.04em;box-shadow:0 6px 18px rgba(180,83,9,.4),inset 0 1px 0 rgba(255,255,255,.25);opacity:0;transform:translateY(10px);transition:opacity .7s ' + EASE + ',transform .7s ' + EASE + ',box-shadow .25s}',
    '#v6intro.morph .v6-go{opacity:1;transform:translateY(0);transition-delay:1.85s}',
    '#v6intro .v6-go:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(180,83,9,.5),inset 0 1px 0 rgba(255,255,255,.3)}',
    '#v6intro .v6-go:active{transform:translateY(0)}',

    /* Particle burst */
    '#v6intro .v6-burst{position:absolute;top:50%;left:50%;width:0;height:0;pointer-events:none;z-index:5}',
    '#v6intro .v6-burst span{position:absolute;top:0;left:0;width:7px;height:7px;border-radius:50%;background:radial-gradient(circle,#FFE3B0 0%,#E89B3D 60%,rgba(180,83,9,0) 100%);box-shadow:0 0 10px rgba(255,200,120,.9);opacity:0;will-change:transform,opacity}',
    '#v6intro.burst .v6-burst span{animation:v6burst 1.5s ' + EASE + ' forwards}',
    '@keyframes v6burst{0%{opacity:0;transform:translate(0,0) scale(.3)}15%{opacity:1;transform:translate(calc(var(--dx)*.25),calc(var(--dy)*.25)) scale(1.1)}100%{opacity:0;transform:translate(var(--dx),var(--dy)) scale(.5)}}',

    /* Mobile */
    '@media (max-width:560px){#v6intro .v6-card{padding:32px 22px 26px;border-radius:18px}#v6intro .v6-h1{font-size:2.1rem}#v6intro .v6-sub{font-size:.92rem}#v6intro .v6-item{padding:11px 12px}#v6intro .v6-item-body{font-size:.78rem}#v6intro .v6-loader-bar{width:220px}}',

    /* Reduce motion */
    '@media (prefers-reduced-motion:reduce){#v6intro *,#v6intro *::before,#v6intro *::after{animation:none!important;transition-duration:.2s!important}}'
  ].join('\n');
  document.head.appendChild(style);

  /* ── DOM ────────────────────────────────────────────────────── */
  var root = document.createElement('div');
  root.id = 'v6intro';
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-label', 'Version 6 update');

  // Build per-char headline spans (preserve spaces)
  var headlineHtml = HEADLINE.split('').map(function (ch, i) {
    var delay = (1.0 + i * 0.045).toFixed(3);
    if (ch === ' ') return '<span class="v6-sp"></span>';
    return '<span class="v6-ch" style="transition-delay:' + delay + 's">' + ch + '</span>';
  }).join('');

  var listHtml = UPDATES.map(function (u, i) {
    var delay = (1.1 + i * 0.13).toFixed(2);
    return '<li class="v6-item" style="transition-delay:' + delay + 's">' +
             '<span class="v6-item-tag">' + u.tag + '</span>' +
             '<div class="v6-item-text">' +
               '<div class="v6-item-title">' + u.title + '</div>' +
               '<div class="v6-item-body">' + u.body + '</div>' +
             '</div>' +
           '</li>';
  }).join('');

  // Sparkles
  var sparkHtml = '';
  for (var i = 0; i < 14; i++) {
    var top = Math.round(Math.random() * 90);
    var left = Math.round(Math.random() * 100);
    var delay = (Math.random() * 3).toFixed(2);
    sparkHtml += '<span style="top:' + top + '%;left:' + left + '%;animation-delay:' + delay + 's"></span>';
  }

  // Particle burst — 22 particles, random angle/distance, staggered
  var burstHtml = '';
  for (var k = 0; k < 22; k++) {
    var ang = Math.random() * Math.PI * 2;
    var dist = 140 + Math.random() * 180;
    var dx = Math.cos(ang) * dist;
    var dy = Math.sin(ang) * dist - 40; // bias upward
    var d = (Math.random() * 0.18).toFixed(2);
    burstHtml += '<span style="--dx:' + dx.toFixed(0) + 'px;--dy:' + dy.toFixed(0) + 'px;animation-delay:' + d + 's"></span>';
  }

  root.innerHTML =
    '<div class="v6-back"></div>' +
    '<div class="v6-halo"></div>' +
    '<div class="v6-spark">' + sparkHtml + '</div>' +
    '<div class="v6-loader">' +
      '<div class="v6-loader-cap">Loading v6…</div>' +
      '<div class="v6-loader-bar"><div class="v6-loader-fill"></div></div>' +
    '</div>' +
    '<div class="v6-card" role="document">' +
      '<div class="v6-burst">' + burstHtml + '</div>' +
      '<span class="v6-tag">Update</span>' +
      '<h1 class="v6-h1">' + headlineHtml + '</h1>' +
      '<p class="v6-sub">A bigger, smarter, better-paced way to study for the CCNA.</p>' +
      '<div class="v6-since">Top 5 since v4</div>' +
      '<ul class="v6-list">' + listHtml + '</ul>' +
      '<button class="v6-go" type="button">Let\'s go &nbsp;→</button>' +
    '</div>';

  document.body.appendChild(root);

  /* ── Sequence ───────────────────────────────────────────────── */
  function open() {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        // Phase 1: backdrop blur + loader bar fills
        root.classList.add('on');
      });
    });
    // Phase 2: morph loader → card (fires after bar reaches 100%)
    setTimeout(function () { root.classList.add('morph'); }, 1100);
    // Phase 3: particle burst — fires when card hits final position
    setTimeout(function () { root.classList.add('burst'); }, 1650);
  }
  function close() {
    localStorage.setItem(KEY, '1');
    root.classList.remove('on');
    root.classList.add('out');
    setTimeout(function () { root.remove(); }, 600);
  }

  root.querySelector('.v6-go').addEventListener('click', close);
  root.querySelector('.v6-back').addEventListener('click', close);
  document.addEventListener('keydown', function esc(e) {
    if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); }
  });

  setTimeout(open, 220);
})();
