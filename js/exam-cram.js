/* exam-cram.js — IO-based animations, console typer, quizzes, scrollspy, subnetting drill */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Scroll progress bar ───────────────────────────────────── */
  var bar = document.querySelector('.cram-progress .bar');
  if (bar) {
    var onScroll = function () {
      var h = document.documentElement;
      var scrolled = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      bar.style.width = (scrolled * 100).toFixed(1) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── IntersectionObserver — viz fade-ins + console trigger ── */
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        if (e.target.classList.contains('console') && !e.target.dataset.played) {
          playConsole(e.target);
          e.target.dataset.played = '1';
        }
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 }) : null;

  document.querySelectorAll('.viz, .console').forEach(function (el) {
    if (io) io.observe(el);
    else el.classList.add('in-view');
  });

  /* ── Console typer ─────────────────────────────────────────── */
  function playConsole(consoleEl) {
    var body = consoleEl.querySelector('.console-body');
    if (!body) return;
    var lines = JSON.parse(body.dataset.lines || '[]');
    body.innerHTML = '';
    if (reduced || !lines.length) {
      lines.forEach(function (ln) { body.appendChild(buildLineEl(ln, true)); });
      return;
    }
    var i = 0;
    function step() {
      if (i >= lines.length) return;
      var ln = lines[i];
      var el = buildLineEl(ln, false);
      body.appendChild(el);
      if (ln.t === 'cmd') {
        typeOut(el, ln.text || '', function () {
          i++;
          setTimeout(step, 220);
        });
      } else {
        el.textContent = ln.text || '';
        i++;
        setTimeout(step, ln.t === 'out' ? 120 : 80);
      }
    }
    step();
  }

  function buildLineEl(ln, full) {
    var el = document.createElement('span');
    el.className = 'console-line ' + (ln.t || 'cmd');
    if (ln.prompt) el.classList.add('prompt');
    if (ln.prompt) el.dataset.prompt = ln.prompt;
    if (full) el.textContent = ln.text || '';
    return el;
  }

  function typeOut(el, text, done) {
    var i = 0, speed = 18;
    el.classList.add('cur');
    var iv = setInterval(function () {
      if (i >= text.length) {
        clearInterval(iv);
        el.classList.remove('cur');
        done && done();
        return;
      }
      el.textContent = (el.textContent || '') + text.charAt(i);
      i++;
    }, speed);
  }

  /* ── Inline quizzes ─────────────────────────────────────────── */
  document.querySelectorAll('.quiz').forEach(function (q) {
    var correct = q.dataset.correct;
    q.querySelectorAll('button[data-opt]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (q.classList.contains('answered')) return;
        q.classList.add('answered');
        var pick = btn.dataset.opt;
        q.querySelectorAll('button[data-opt]').forEach(function (b) { b.disabled = true; });
        if (pick === correct) btn.classList.add('right');
        else {
          btn.classList.add('wrong');
          var rb = q.querySelector('button[data-opt="' + correct + '"]');
          if (rb) rb.classList.add('right');
        }
      });
    });
  });

  /* ── TOC scrollspy ─────────────────────────────────────────── */
  var tocLinks = document.querySelectorAll('.cram-toc a[href^="#"]');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var idMap = {};
    tocLinks.forEach(function (a) { idMap[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var a = idMap[e.target.id];
        if (!a) return;
        if (e.isIntersecting) {
          tocLinks.forEach(function (l) { l.classList.remove('active'); });
          a.classList.add('active');
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    Object.keys(idMap).forEach(function (id) {
      var t = document.getElementById(id);
      if (t) spy.observe(t);
    });
  }

  /* ── Subnetting drill ──────────────────────────────────────── */
  var drillBtn = document.getElementById('drill-go');
  if (drillBtn) {
    drillBtn.addEventListener('click', runDrill);
    document.getElementById('drill-ip').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') runDrill();
    });
    runDrill();
  }

  function runDrill() {
    var ipEl = document.getElementById('drill-ip');
    var cidrEl = document.getElementById('drill-cidr');
    var out = document.getElementById('drill-out');
    if (!ipEl || !cidrEl || !out) return;
    var ip = (ipEl.value || '').trim();
    var cidr = parseInt(cidrEl.value, 10);
    var parts = ip.split('.').map(function (n) { return parseInt(n, 10); });
    if (parts.length !== 4 || parts.some(function (n) { return isNaN(n) || n < 0 || n > 255; })) {
      out.textContent = 'Bad IP. Try 192.168.1.130';
      return;
    }
    if (isNaN(cidr) || cidr < 0 || cidr > 32) {
      out.textContent = 'Bad prefix. Try /24';
      return;
    }
    var ipInt = (parts[0] << 24 >>> 0) + (parts[1] << 16) + (parts[2] << 8) + parts[3];
    var maskInt = cidr === 0 ? 0 : (0xFFFFFFFF << (32 - cidr)) >>> 0;
    var netInt = (ipInt & maskInt) >>> 0;
    var bcInt = (netInt | (~maskInt >>> 0)) >>> 0;
    var hostBits = 32 - cidr;
    var totalAddr = Math.pow(2, hostBits);
    var usableHosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : Math.max(0, totalAddr - 2);
    var firstHost = cidr >= 31 ? netInt : netInt + 1;
    var lastHost = cidr >= 31 ? bcInt : bcInt - 1;
    var maskParts = [
      (maskInt >>> 24) & 0xFF, (maskInt >>> 16) & 0xFF,
      (maskInt >>> 8) & 0xFF, maskInt & 0xFF
    ];
    var wildParts = maskParts.map(function (b) { return 255 - b; });
    var blockSize = cidr >= 24 ? totalAddr : (cidr >= 16 ? Math.pow(2, hostBits - 16) || totalAddr : totalAddr);
    var blockOctet = cidr <= 8 ? 1 : (cidr <= 16 ? 2 : (cidr <= 24 ? 3 : 4));
    var magic = 256 - maskParts[blockOctet - 1];
    out.innerHTML =
      '<strong>Network:</strong>     ' + intToIp(netInt) + ' /' + cidr + '\n' +
      '<strong>Mask:</strong>        ' + maskParts.join('.') + '\n' +
      '<strong>Wildcard:</strong>    ' + wildParts.join('.') + '\n' +
      '<strong>Broadcast:</strong>   ' + intToIp(bcInt) + '\n' +
      '<strong>First host:</strong>  ' + intToIp(firstHost) + '\n' +
      '<strong>Last host:</strong>   ' + intToIp(lastHost) + '\n' +
      '<strong>Total addr:</strong>  ' + totalAddr + '\n' +
      '<strong>Usable hosts:</strong>' + usableHosts + '\n' +
      '<strong>Block size:</strong>  ' + magic + ' (in octet ' + blockOctet + ')\n' +
      (cidr === 31 ? '<strong>Note:</strong>        /31 = point-to-point, 2 usable\n' : '') +
      (cidr === 32 ? '<strong>Note:</strong>        /32 = single host\n' : '');
  }
  function intToIp(n) {
    return [(n >>> 24) & 0xFF, (n >>> 16) & 0xFF, (n >>> 8) & 0xFF, n & 0xFF].join('.');
  }
})();
