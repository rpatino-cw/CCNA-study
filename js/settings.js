/* ═══════════════════════════════════════════════════════════════════
   Settings Panel — themes, display prefs, fun modes
   Self-contained: injects own CSS + DOM. Loaded via nav.js on every page.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Helpers ─────────────────────────────────────────────────── */
  function merge(base, over) {
    var out = {};
    for (var k in base) if (base.hasOwnProperty(k)) out[k] = base[k];
    if (over) for (var j in over) if (over.hasOwnProperty(j)) out[j] = over[j];
    return out;
  }
  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  /* ── State ──────────────────────────────────────────────────── */
  var KEY = 'ccna_settings';
  var DEFAULTS = {
    theme: 'default',
    fontSize: 'medium',
    compact: false,
    reduceMotion: false,
    autoCollapse: false,
    sidebarLeft: false,
    musicOn: true,
    volume: 70
  };

  var S = load();
  function load() { try { return merge(DEFAULTS, JSON.parse(localStorage.getItem(KEY))); } catch(e) { return merge(DEFAULTS, {}); } }
  function save() { localStorage.setItem(KEY, JSON.stringify(S)); }

  /* ── Music config per theme ─────────────────────────────────── */
  var MUSIC = {
    spiderman: {
      title: 'Spiderman Theme (1967)',
      /* Well-known upload of the classic cartoon theme.
         If this ID breaks, replace with any upload of the 1967 theme. */
      vid: 'SUtziaZlDeE'
    },
    bollywood: {
      title: 'Chaiyya Chaiyya — Dil Se',
      /* Iconic Bollywood number. Replace vid if takedown. */
      vid: 'pElk1ShAz-I'
    }
  };

  /* ── CSS ─────────────────────────────────────────────────────── */
  var style = document.createElement('style');
  style.id = 'ccna-settings-css';
  style.textContent = [

    /* ── Gear button ───────────────────────────────────────────── */
    '#stGear{position:fixed;bottom:80px;right:20px;z-index:950;width:44px;height:44px;border-radius:50%;background:var(--bg-surface);border:1px solid var(--border);cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 12px rgba(0,0,0,.08);transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .3s}',
    '#stGear:hover{transform:rotate(45deg);box-shadow:0 4px 20px rgba(0,0,0,.12)}',
    '#stGear svg{width:20px;height:20px;fill:var(--ink-secondary);transition:fill .2s}',
    '#stGear:hover svg{fill:var(--ink)}',

    /* ── Backdrop + panel ──────────────────────────────────────── */
    '#stDrop{position:fixed;inset:0;z-index:999;background:rgba(0,0,0,.25);opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}',
    '#stDrop.on{opacity:1;visibility:visible}',
    '#stPanel{position:fixed;top:0;right:0;bottom:0;z-index:1000;width:340px;max-width:92vw;background:var(--bg-surface);border-left:1px solid var(--border);box-shadow:-8px 0 40px rgba(0,0,0,.1);transform:translateX(100%);transition:transform .45s cubic-bezier(.16,1,.3,1);overflow-y:auto;overflow-x:hidden;font-family:var(--font-display)}',
    '#stPanel.on{transform:translateX(0)}',

    /* ── Panel internals ───────────────────────────────────────── */
    '.st-hdr{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--border)}',
    '.st-hdr h2{font-size:1rem;font-weight:700;margin:0;padding:0;border:none;color:var(--ink)}',
    '.st-x{width:32px;height:32px;border-radius:6px;background:none;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--ink-muted);font-size:1.3rem;transition:background .15s,color .15s}',
    '.st-x:hover{background:var(--bg-recessed);color:var(--ink)}',
    '.st-sec{padding:20px 24px;border-bottom:1px solid var(--border)}',
    '.st-sec:last-child{border-bottom:none}',
    '.st-lbl{font-size:.66rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--ink-muted);margin-bottom:14px}',

    /* ── Theme cards ───────────────────────────────────────────── */
    '.st-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}',
    '.st-card{padding:16px 12px;border-radius:8px;cursor:pointer;border:2px solid var(--border);background:var(--bg);text-align:center;transition:border-color .2s,background .2s,transform .15s;display:flex;flex-direction:column;align-items:center;gap:6px}',
    '.st-card:hover{border-color:var(--ink-muted);transform:translateY(-2px)}',
    '.st-card.on{border-color:var(--accent);background:rgba(var(--accent-rgb),.06)}',
    '.st-card .ic{font-size:1.6rem;line-height:1}',
    '.st-card .nm{font-size:.76rem;font-weight:700;color:var(--ink)}',
    '.st-card .ds{font-size:.62rem;color:var(--ink-muted)}',

    /* ── Row + toggle ──────────────────────────────────────────── */
    '.st-row{display:flex;align-items:center;justify-content:space-between;padding:8px 0}',
    '.st-row .rl{font-size:.82rem;color:var(--ink-secondary)}',
    '.st-tog{position:relative;width:42px;height:24px;cursor:pointer;flex-shrink:0}',
    '.st-tog input{opacity:0;width:0;height:0;position:absolute}',
    '.st-trk{position:absolute;inset:0;background:var(--bg-recessed);border:1px solid var(--border);border-radius:12px;transition:background .25s,border-color .25s}',
    '.st-trk::after{content:"";position:absolute;left:2px;top:2px;width:18px;height:18px;background:#fff;border-radius:50%;box-shadow:0 1px 3px rgba(0,0,0,.15);transition:transform .25s cubic-bezier(.16,1,.3,1)}',
    '.st-tog input:checked+.st-trk{background:var(--accent);border-color:var(--accent)}',
    '.st-tog input:checked+.st-trk::after{transform:translateX(18px)}',

    /* ── Size buttons ──────────────────────────────────────────── */
    '.st-sizes{display:flex;gap:4px}',
    '.st-sz{padding:6px 14px;border-radius:6px;border:1px solid var(--border);background:none;cursor:pointer;font-family:var(--font-display);font-size:.75rem;font-weight:600;color:var(--ink-secondary);transition:all .15s}',
    '.st-sz:hover{border-color:var(--ink-muted);color:var(--ink)}',
    '.st-sz.on{background:var(--ink);color:var(--bg);border-color:var(--ink)}',

    /* ── Volume ────────────────────────────────────────────────── */
    '.st-vol{width:100%;height:4px;-webkit-appearance:none;appearance:none;background:var(--bg-recessed);border-radius:2px;outline:none;margin-top:8px}',
    '.st-vol::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;background:var(--accent);border-radius:50%;cursor:pointer}',
    '.st-vol::-moz-range-thumb{width:16px;height:16px;background:var(--accent);border-radius:50%;cursor:pointer;border:none}',

    /* ── Reset ─────────────────────────────────────────────────── */
    '.st-reset{width:100%;padding:10px;border:1px solid var(--border);border-radius:6px;background:none;cursor:pointer;font-family:var(--font-display);font-size:.8rem;font-weight:600;color:var(--ink-muted);transition:all .15s}',
    '.st-reset:hover{border-color:var(--prof-weak);color:var(--prof-weak)}',

    /* ── Music bar ─────────────────────────────────────────────── */
    '#stMusic{position:fixed;bottom:0;left:0;right:0;z-index:940;height:48px;display:flex;align-items:center;gap:12px;padding:0 20px;font-family:var(--font-display);font-size:.78rem;background:var(--bg-surface);border-top:1px solid var(--border);color:var(--ink);transform:translateY(100%);transition:transform .4s cubic-bezier(.16,1,.3,1)}',
    '#stMusic.on{transform:translateY(0)}',
    '.mb-play{width:34px;height:34px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:.85rem;background:var(--accent);color:#fff;transition:transform .12s,box-shadow .2s;flex-shrink:0}',
    '.mb-play:hover{transform:scale(1.08);box-shadow:0 2px 12px rgba(var(--accent-rgb),.3)}',
    '.mb-tt{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:500}',
    '.mb-x{background:none;border:none;cursor:pointer;padding:4px 8px;color:var(--ink-muted);font-size:1.1rem;transition:color .15s;border-radius:4px}',
    '.mb-x:hover{color:var(--ink);background:var(--bg-recessed)}',

    /* ── Transition wipe ───────────────────────────────────────── */
    '#stWipe{position:fixed;inset:0;z-index:2000;pointer-events:none;opacity:0}',
    '#stWipe.go{animation:stWipeIn .65s cubic-bezier(.16,1,.3,1) forwards}',
    '@keyframes stWipeIn{0%{opacity:0;clip-path:circle(0% at var(--wx) var(--wy))}40%{opacity:1}60%{opacity:1;clip-path:circle(80% at var(--wx) var(--wy))}100%{opacity:0;clip-path:circle(150% at var(--wx) var(--wy))}}',

    /* ═══════════════════════════════════════════════════════════
       DARK MODE
       ═══════════════════════════════════════════════════════════ */
    'html[data-theme="dark"]{--bg:#141210;--bg-surface:#1C1A17;--bg-recessed:#0F0E0C;--bg-hover:#252320;--bg-input:#1C1A17;--border:#2E2B27;--border-strong:#3D3A35;--rule:#2E2B27;--ink:#E7E5E4;--ink-secondary:#A8A29E;--ink-muted:#78716C;--ink-faint:#44403C;--accent:#D97706;--accent-rgb:217,119,6;--accent-light:#422006;--accent-dim:#1C1206;--prof-strong-bg:#052E16;--prof-mid-bg:#422006;--prof-weak-bg:#450A0A;--correct-bg:#052E16;--wrong-bg:#450A0A}',
    'html[data-theme="dark"] ::selection{background:#422006;color:#E7E5E4}',
    'html[data-theme="dark"] .badge-purple{background:#1E1338;color:#A78BFA}',
    'html[data-theme="dark"] img{opacity:.92}',

    /* ═══════════════════════════════════════════════════════════
       SPIDERMAN MODE
       ═══════════════════════════════════════════════════════════ */
    'html[data-theme="spiderman"]{--bg:#0B0B1F;--bg-surface:#13132E;--bg-recessed:#08081A;--bg-hover:#1C1C42;--bg-input:#13132E;--border:#2A2A5E;--border-strong:#3D3D80;--rule:#2A2A5E;--ink:#F2F2FF;--ink-secondary:#A0A0D0;--ink-muted:#6868A0;--ink-faint:#38385A;--accent:#E23636;--accent-rgb:226,54,54;--accent-light:#3A0808;--accent-dim:#1A0404;--prof-strong-bg:#052E16;--prof-mid-bg:#422006;--prof-weak-bg:#450A0A;--correct-bg:#052E16;--wrong-bg:#450A0A}',

    /* Web grid overlay */
    'html[data-theme="spiderman"] body::after{content:"";position:fixed;inset:0;z-index:-1;pointer-events:none;opacity:.035;background-image:repeating-linear-gradient(0deg,transparent,transparent 48px,rgba(226,54,54,.35) 48px,rgba(226,54,54,.35) 49px),repeating-linear-gradient(90deg,transparent,transparent 48px,rgba(226,54,54,.35) 48px,rgba(226,54,54,.35) 49px),repeating-linear-gradient(60deg,transparent,transparent 68px,rgba(43,55,132,.25) 68px,rgba(43,55,132,.25) 69px),repeating-linear-gradient(-60deg,transparent,transparent 68px,rgba(43,55,132,.25) 68px,rgba(43,55,132,.25) 69px)}',

    /* Red/blue radial tint */
    'html[data-theme="spiderman"] body{background-image:radial-gradient(ellipse at 15% 30%,rgba(226,54,54,.04) 0%,transparent 55%),radial-gradient(ellipse at 85% 70%,rgba(43,55,132,.05) 0%,transparent 55%)}',

    /* Nav overrides */
    'html[data-theme="spiderman"] nav.top-nav{border-bottom-color:#E23636}',
    'html[data-theme="spiderman"] nav.top-nav a.active{border-bottom-color:#E23636}',
    'html[data-theme="spiderman"] .nav-group.active .nav-group-btn{border-bottom-color:#E23636}',
    'html[data-theme="spiderman"] .nav-dropdown{border-top-color:#E23636}',
    'html[data-theme="spiderman"] .nav-group.open .nav-count{color:#E23636;border-color:#E23636;background:rgba(226,54,54,.08)}',
    'html[data-theme="spiderman"] .nav-drop-item:hover,.nav-drop-item.active{border-left-color:#E23636}',
    'html[data-theme="spiderman"] .ct-opt.on{background:#E23636;border-color:#E23636}',

    /* Banner */
    'html[data-theme="spiderman"] .amber-banner{background:linear-gradient(135deg,#8B0000 0%,#E23636 50%,#2B3784 100%)}',

    /* CTA */
    'html[data-theme="spiderman"] .ha-btn{background:#E23636}',
    'html[data-theme="spiderman"] .ha-btn:hover{background:#B91C1C;box-shadow:0 10px 28px rgba(226,54,54,.35)}',
    'html[data-theme="spiderman"] .ha-bar-fill{background:linear-gradient(90deg,#E23636,#2B3784)}',

    /* Cards glow red on hover */
    'html[data-theme="spiderman"] .dh-card:hover{border-color:#E23636;box-shadow:inset 0 2px 0 #E23636,0 0 24px rgba(226,54,54,.12)}',
    'html[data-theme="spiderman"] .obj-card.mastered{border-left-color:#E23636}',

    /* Selection & misc */
    'html[data-theme="spiderman"] ::selection{background:#3A0808;color:#F2F2FF}',
    'html[data-theme="spiderman"] .badge-purple{background:#1E1040;color:#A78BFA}',

    /* Music bar theming */
    'html[data-theme="spiderman"] #stMusic{background:linear-gradient(90deg,#13132E,#1A0808,#13132E);border-top-color:#E23636;color:#F2F2FF}',
    'html[data-theme="spiderman"] .mb-play{background:#E23636}',
    'html[data-theme="spiderman"] .mb-x{color:#A0A0D0}',

    /* ═══════════════════════════════════════════════════════════
       BOLLYWOOD MODE  — full filmi energy
       ═══════════════════════════════════════════════════════════ */
    'html[data-theme="bollywood"]{--bg:#110818;--bg-surface:#1C0E26;--bg-recessed:#0C0512;--bg-hover:#2A1236;--bg-input:#1C0E26;--border:#4A1860;--border-strong:#6A2888;--rule:#4A1860;--ink:#FFF5E6;--ink-secondary:#D4A574;--ink-muted:#8A6848;--ink-faint:#4A3828;--accent:#FFD700;--accent-rgb:255,215,0;--accent-light:#3A2800;--accent-dim:#1A1400;--prof-strong-bg:#052E16;--prof-mid-bg:#422006;--prof-weak-bg:#450A0A;--correct-bg:#052E16;--wrong-bg:#450A0A}',

    /* Warm ambient glow */
    'html[data-theme="bollywood"] body{background-image:radial-gradient(ellipse at 25% 0%,rgba(255,215,0,.04) 0%,transparent 50%),radial-gradient(ellipse at 75% 100%,rgba(219,39,119,.04) 0%,transparent 50%),radial-gradient(ellipse at 50% 50%,rgba(139,92,246,.02) 0%,transparent 70%)}',

    /* Animated rainbow nav border */
    'html[data-theme="bollywood"] nav.top-nav{border-bottom:none;position:relative}',
    'html[data-theme="bollywood"] nav.top-nav::after{content:"";position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#FFD700,#DB2777,#8B5CF6,#FFD700,#DB2777,#8B5CF6,#FFD700);background-size:300% 100%;animation:bollyNav 3s linear infinite}',
    '@keyframes bollyNav{0%{background-position:0% 0}100%{background-position:300% 0}}',

    /* Nav accents */
    'html[data-theme="bollywood"] nav.top-nav a.active{border-bottom-color:#FFD700;color:#FFD700}',
    'html[data-theme="bollywood"] .nav-group.active .nav-group-btn{border-bottom-color:#FFD700;color:#FFD700}',
    'html[data-theme="bollywood"] .nav-dropdown{border-top-color:#FFD700}',
    'html[data-theme="bollywood"] .nav-group.open .nav-count{color:#FFD700;border-color:#FFD700;background:rgba(255,215,0,.1)}',
    'html[data-theme="bollywood"] .nav-drop-item:hover{border-left-color:#FFD700}',
    'html[data-theme="bollywood"] .ct-opt.on{background:linear-gradient(135deg,#FFD700,#F59E0B);border-color:#FFD700;color:#110818}',

    /* Gold shimmer on main title */
    'html[data-theme="bollywood"] h1,html[data-theme="bollywood"] .core-title{background:linear-gradient(90deg,#FFD700 0%,#FFF5C3 25%,#FFD700 50%,#F59E0B 75%,#FFD700 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:goldShimmer 2.5s ease-in-out infinite}',
    '@keyframes goldShimmer{0%,100%{background-position:0% center}50%{background-position:200% center}}',

    /* Glowing CTA */
    'html[data-theme="bollywood"] .ha-btn{background:linear-gradient(135deg,#FFD700,#DB2777);color:#110818;font-weight:800;box-shadow:0 0 24px rgba(255,215,0,.3),0 0 48px rgba(219,39,119,.15)}',
    'html[data-theme="bollywood"] .ha-btn:hover{box-shadow:0 0 36px rgba(255,215,0,.5),0 0 72px rgba(219,39,119,.25);transform:translateY(-3px)}',
    'html[data-theme="bollywood"] .ha-bar-fill{background:linear-gradient(90deg,#FFD700,#DB2777,#8B5CF6)}',

    /* Banner — rich jewel gradient */
    'html[data-theme="bollywood"] .amber-banner{background:linear-gradient(135deg,#4A0E4E 0%,#7B2D8E 30%,#DB2777 60%,#FFD700 100%)}',

    /* Cards glow gold */
    'html[data-theme="bollywood"] .dh-card:hover{border-color:#FFD700;box-shadow:inset 0 2px 0 #FFD700,0 0 24px rgba(255,215,0,.12)}',
    'html[data-theme="bollywood"] .obj-card.mastered{border-left-color:#FFD700}',

    /* Stats line glow */
    'html[data-theme="bollywood"] .stats-line{border-color:rgba(255,215,0,.15)}',

    /* Selection */
    'html[data-theme="bollywood"] ::selection{background:#3A2800;color:#FFF5E6}',
    'html[data-theme="bollywood"] .badge-purple{background:#2A1040;color:#C4B5FD}',

    /* Music bar */
    'html[data-theme="bollywood"] #stMusic{background:linear-gradient(90deg,#110818,#1C0A28,#110818);color:#FFF5E6}',
    'html[data-theme="bollywood"] #stMusic::before{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,#FFD700,#DB2777,#8B5CF6,#FFD700);background-size:300% 100%;animation:bollyNav 3s linear infinite}',
    'html[data-theme="bollywood"] .mb-play{background:linear-gradient(135deg,#FFD700,#DB2777);color:#110818}',
    'html[data-theme="bollywood"] .mb-x{color:#D4A574}',

    /* Floating particle container */
    '#bollyPx{position:fixed;inset:0;z-index:-1;pointer-events:none;overflow:hidden}',
    '#bollyPx .bpx{position:absolute;opacity:0;will-change:transform,opacity;animation:bpFloat linear infinite}',
    '@keyframes bpFloat{0%{opacity:0;transform:translateY(105vh) rotate(0deg) scale(.4)}8%{opacity:.5}85%{opacity:.45}100%{opacity:0;transform:translateY(-10vh) rotate(400deg) scale(1.1)}}',

    /* ═══════════════════════════════════════════════════════════
       Settings-aware overrides
       ═══════════════════════════════════════════════════════════ */
    'html[data-font="small"]{font-size:15px}',
    'html[data-font="large"]{font-size:19px}',
    'html[data-compact="true"] .container-wide{padding:12px}',
    'html[data-compact="true"] .card{padding:14px}',
    'html[data-compact="true"] .obj-head{padding:12px 16px}',
    'html[data-compact="true"] h1{font-size:2rem}',
    'html[data-compact="true"] h2{margin-top:28px}',
    'html[data-motion="reduce"] *,html[data-motion="reduce"] *::before,html[data-motion="reduce"] *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}',

    /* Gear button per-theme tint */
    'html[data-theme="dark"] #stGear{background:#1C1A17;border-color:#2E2B27}',
    'html[data-theme="spiderman"] #stGear{background:#13132E;border-color:#2A2A5E}',
    'html[data-theme="spiderman"] #stGear svg{fill:#E23636}',
    'html[data-theme="bollywood"] #stGear{background:#1C0E26;border-color:#4A1860}',
    'html[data-theme="bollywood"] #stGear svg{fill:#FFD700}',

    /* When music bar is visible, shift beta badge + lost btn up */
    '#stMusic.on~.beta-badge{bottom:60px!important}',
    'body:has(#stMusic.on) #lostBtn{bottom:72px!important}',

  ].join('\n');
  document.head.appendChild(style);

  /* ── DOM: wipe layer ────────────────────────────────────────── */
  var wipe = document.createElement('div');
  wipe.id = 'stWipe';
  document.body.appendChild(wipe);

  /* ── DOM: bollywood particles container ─────────────────────── */
  var bpxWrap = document.createElement('div');
  bpxWrap.id = 'bollyPx';
  document.body.appendChild(bpxWrap);

  /* ── DOM: music bar ─────────────────────────────────────────── */
  var mbar = document.createElement('div');
  mbar.id = 'stMusic';
  mbar.innerHTML =
    '<button class="mb-play" id="mbPlay" aria-label="Play music">&#9654;</button>' +
    '<span class="mb-tt" id="mbTt"></span>' +
    '<button class="mb-x" id="mbX" aria-label="Close music bar">&times;</button>';
  document.body.appendChild(mbar);

  /* ── DOM: gear button ───────────────────────────────────────── */
  var gear = document.createElement('button');
  gear.id = 'stGear';
  gear.title = 'Settings';
  gear.setAttribute('aria-label', 'Open settings');
  gear.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.58 1.69-.98l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z"/></svg>';
  document.body.appendChild(gear);

  /* ── DOM: backdrop + panel ──────────────────────────────────── */
  var drop = document.createElement('div');
  drop.id = 'stDrop';
  document.body.appendChild(drop);

  var panel = document.createElement('div');
  panel.id = 'stPanel';
  document.body.appendChild(panel);

  /* ── Panel builder ──────────────────────────────────────────── */
  function buildPanel() {
    panel.innerHTML =
      '<div class="st-hdr"><h2>Settings</h2><button class="st-x" id="stX">&times;</button></div>' +

      /* Themes */
      '<div class="st-sec"><div class="st-lbl">Theme</div><div class="st-grid">' +
      tc('default', '\u2600\uFE0F', 'Default',   'Warm editorial')  +
      tc('dark',    '\uD83C\uDF19', 'Dark Mode',  'Easy on the eyes') +
      tc('spiderman','\uD83D\uDD77\uFE0F','Spiderman','With great power\u2026') +
      tc('bollywood','\u2728',      'Bollywood',  'Full filmi energy') +
      '</div></div>' +

      /* Reset Progress */
      '<div class="st-sec"><div class="st-lbl">Progress</div>' +
      '<button class="st-reset" id="stReset">Reset Progress</button>' +
      '<div style="font-size:.7rem;color:var(--ink-muted);margin-top:8px;line-height:1.4">Clears quizzes, proficiency, streaks, labs, and diagnostics. Theme is preserved.</div>' +
      '</div>';
  }

  function tc(id, icon, name, desc) {
    return '<div class="st-card' + (S.theme === id ? ' on' : '') + '" data-t="' + id + '">' +
      '<span class="ic">' + icon + '</span><span class="nm">' + esc(name) + '</span><span class="ds">' + esc(desc) + '</span></div>';
  }
  function sz(val, label) {
    return '<button class="st-sz' + (S.fontSize === val ? ' on' : '') + '" data-sz="' + val + '">' + label + '</button>';
  }
  function tog(label, key) {
    return '<div class="st-row"><span class="rl">' + esc(label) + '</span>' +
      '<label class="st-tog"><input type="checkbox" data-k="' + key + '"' + (S[key] ? ' checked' : '') + '>' +
      '<span class="st-trk"></span></label></div>';
  }

  buildPanel();

  /* ── Open / close ───────────────────────────────────────────── */
  function openP()  { panel.classList.add('on'); drop.classList.add('on'); }
  function closeP() { panel.classList.remove('on'); drop.classList.remove('on'); }

  gear.addEventListener('click', function () { panel.classList.contains('on') ? closeP() : openP(); });
  drop.addEventListener('click', closeP);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && panel.classList.contains('on')) closeP(); });

  /* ── Delegated events inside panel ──────────────────────────── */
  panel.addEventListener('click', function (e) {
    /* Theme card */
    var card = e.target.closest('.st-card');
    if (card) {
      var t = card.getAttribute('data-t');
      if (t && t !== S.theme) switchTheme(t);
      return;
    }
    /* Size button */
    var szb = e.target.closest('.st-sz');
    if (szb) {
      S.fontSize = szb.getAttribute('data-sz');
      save(); applyDisplay(); buildPanel(); bindPanelBtns();
      return;
    }
    /* Close */
    if (e.target.closest('#stX')) closeP();
    /* Reset Progress */
    if (e.target.closest('#stReset')) {
      if (!confirm('Reset all study progress? This clears quizzes, proficiency, streaks, lab scores, and diagnostic results. Theme settings are preserved.')) return;
      for (var i = localStorage.length - 1; i >= 0; i--) {
        var k = localStorage.key(i);
        if (k && k.indexOf('ccna_') === 0 && k !== 'ccna_settings') localStorage.removeItem(k);
      }
      closeP();
      location.reload();
    }
  });

  panel.addEventListener('change', function (e) {
    var inp = e.target;
    if (inp.type === 'checkbox' && inp.dataset.k) {
      S[inp.dataset.k] = inp.checked;
      save(); applyDisplay();
      if (inp.dataset.k === 'musicOn') {
        if (inp.checked && MUSIC[S.theme]) showMusic(S.theme);
        else hideMusic();
      }
    }
  });

  function bindPanelBtns() {
    /* Rebind close + reset after innerHTML rebuild */
    /* (click delegation already handles it, but just in case) */
  }

  /* ── Theme switching ────────────────────────────────────────── */
  var WIPE_COLORS = { default:'#FAF7F2', dark:'#141210', spiderman:'#0B0B1F', bollywood:'#110818' };

  function switchTheme(theme) {
    /* Circular wipe from the gear button */
    var r = gear.getBoundingClientRect();
    wipe.style.setProperty('--wx', (r.left + r.width/2) + 'px');
    wipe.style.setProperty('--wy', (r.top + r.height/2) + 'px');
    wipe.style.background = WIPE_COLORS[theme] || WIPE_COLORS.default;
    wipe.classList.remove('go');
    void wipe.offsetWidth;          /* force reflow */
    wipe.classList.add('go');
    setTimeout(function () { wipe.classList.remove('go'); }, 700);

    /* Apply after wipe covers screen */
    setTimeout(function () {
      S.theme = theme;
      save();
      applyTheme();
      applyDisplay();
      buildPanel(); bindPanelBtns();

      /* Music */
      if (MUSIC[theme] && S.musicOn) showMusic(theme);
      else hideMusic();

      /* Bollywood particles */
      if (theme === 'bollywood') startPx();
      else stopPx();
    }, 280);
  }

  /* ── Apply helpers ──────────────────────────────────────────── */
  function applyTheme() {
    var html = document.documentElement;
    if (S.theme === 'default') html.removeAttribute('data-theme');
    else html.setAttribute('data-theme', S.theme);

    var meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) meta.content = (S.theme === 'default') ? 'light' : 'dark';
  }

  function applyDisplay() {
    var html = document.documentElement;
    html.setAttribute('data-font', S.fontSize);
    html.setAttribute('data-compact', S.compact ? 'true' : 'false');
    if (S.reduceMotion) html.setAttribute('data-motion', 'reduce');
    else html.removeAttribute('data-motion');
  }

  /* ── Music bar ──────────────────────────────────────────────── */
  var mIframe = null;
  var mPlaying = false;

  function showMusic(theme) {
    var c = MUSIC[theme];
    if (!c) return;
    document.getElementById('mbTt').textContent = c.title;
    mbar.classList.add('on');
    mPlaying = false;
    document.getElementById('mbPlay').innerHTML = '&#9654;';

    document.getElementById('mbPlay').onclick = function () {
      if (mPlaying) {
        if (mIframe) { mIframe.remove(); mIframe = null; }
        mPlaying = false;
        this.innerHTML = '&#9654;';
      } else {
        mIframe = document.createElement('iframe');
        mIframe.src = 'https://www.youtube-nocookie.com/embed/' + c.vid + '?autoplay=1&loop=1&playlist=' + c.vid;
        mIframe.allow = 'autoplay';
        mIframe.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;border:none';
        mbar.appendChild(mIframe);
        mPlaying = true;
        this.innerHTML = '&#9646;&#9646;';
      }
    };

    document.getElementById('mbX').onclick = function () {
      hideMusic();
      S.musicOn = false;
      save(); buildPanel(); bindPanelBtns();
    };
  }

  function hideMusic() {
    mbar.classList.remove('on');
    if (mIframe) { mIframe.remove(); mIframe = null; }
    mPlaying = false;
  }

  /* ── Bollywood particles ────────────────────────────────────── */
  var BPX_SHAPES  = ['\u2666','\u2726','\u2736','\u2605','\u273F','\u2740','\u2742'];
  var BPX_COLORS  = ['#FFD700','#DB2777','#8B5CF6','#F59E0B','#EC4899','#A78BFA','#FBBF24'];
  var bpxTimer = null;

  function spawnPx() {
    if (S.theme !== 'bollywood') return;
    var el = document.createElement('span');
    el.className = 'bpx';
    el.textContent = BPX_SHAPES[Math.random() * BPX_SHAPES.length | 0];
    el.style.left   = (Math.random() * 100) + '%';
    el.style.fontSize = (6 + Math.random() * 16) + 'px';
    el.style.color   = BPX_COLORS[Math.random() * BPX_COLORS.length | 0];
    var dur = 7 + Math.random() * 8;
    el.style.animationDuration = dur + 's';
    el.style.animationDelay = (Math.random() * 3) + 's';
    bpxWrap.appendChild(el);
    setTimeout(function () { if (el.parentNode) el.remove(); }, (dur + 4) * 1000);
  }

  function startPx() {
    stopPx();
    for (var i = 0; i < 15; i++) setTimeout(spawnPx, i * 400);
    bpxTimer = setInterval(spawnPx, 1800);
  }

  function stopPx() {
    clearInterval(bpxTimer);
    bpxWrap.innerHTML = '';
  }

  /* ── Boot ───────────────────────────────────────────────────── */
  applyTheme();
  applyDisplay();
  if (MUSIC[S.theme] && S.musicOn) showMusic(S.theme);
  if (S.theme === 'bollywood') startPx();

})();
