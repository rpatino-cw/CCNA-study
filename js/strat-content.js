/**
 * strat-content.js — dynamic per-objective content loader for strat.html
 * Reads ?obj=X.Y from URL, populates header + cheat sheet + lab + anki sections
 * from data/jeremy-deep-dive.json + data/cheat-sheets-index.json + data/cheat-sheets/*.md.
 *
 * Quiz / eval / explainer sections are owned by strat-quiz.js / strat-eval.js /
 * explainer.js respectively — this script does NOT touch them.
 */
(function () {
  'use strict';

  function getObjective() {
    var p = new URLSearchParams(location.search);
    var obj = p.get('obj') || '1.1';
    return obj.replace(/[^0-9.a-z]/gi, '');
  }

  function ytEmbed(ytid) {
    return 'https://www.youtube.com/watch?v=' + encodeURIComponent(ytid);
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Render a single markdown cheat sheet inline; returns Promise that resolves when done.
  function renderCheatSheet(file, container) {
    return fetch('data/cheat-sheets/' + file)
      .then(function (r) { if (!r.ok) throw new Error('not found: ' + file); return r.text(); })
      .then(function (text) {
        // Strip frontmatter
        text = text.replace(/^---\n[\s\S]*?\n---\n+/, '');
        // Strip wikilinks (vault refs)
        text = text.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, function (_, p1, p2) {
          return p2 || p1.split('/').pop();
        });
        var html = window.marked ? window.marked.parse(text, { breaks: false, gfm: true }) : '<pre>' + escapeHtml(text) + '</pre>';
        var wrap = document.createElement('div');
        wrap.className = 'cheat-sheet-block';
        wrap.innerHTML = html;
        container.appendChild(wrap);
        // Convert mermaid code blocks
        wrap.querySelectorAll('pre > code.language-mermaid').forEach(function (c) {
          var src = c.textContent;
          var div = document.createElement('div');
          div.className = 'mermaid';
          div.textContent = src;
          c.parentNode.replaceWith(div);
        });
      })
      .catch(function (err) {
        var p = document.createElement('p');
        p.style.color = 'var(--ink-muted)';
        p.textContent = '(no cheat sheet for ' + file + ': ' + err.message + ')';
        container.appendChild(p);
      });
  }

  function buildVideoLink(v) {
    // returns a small inline link block
    return '<a href="' + ytEmbed(v.ytid) + '" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;font-family:var(--font-display);font-size:.78rem;color:var(--accent);text-decoration:none;border:1px solid var(--accent);padding:4px 10px;border-radius:99px;margin-right:6px;margin-bottom:6px"><span style="opacity:.6">Day ' + escapeHtml(v.day) + '</span> · ' + escapeHtml(v.title) + ' ▶</a>';
  }

  function populateHeader(obj, sub) {
    var h1 = document.querySelector('.masthead h1');
    var sub_p = document.querySelector('.masthead .subtitle');
    if (h1) { h1.textContent = 'Objective ' + obj + ' — ' + (sub.title || ''); h1.style.opacity = ''; }
    if (sub_p) { sub_p.textContent = 'Study this objective: read the cheat sheet, drill the quiz, do a lab. Pass eval to mark done.'; sub_p.style.opacity = ''; }
    // Update scope-note
    var scope = document.querySelector('.scope-note');
    if (scope) scope.textContent = 'scoped to ' + obj + ' only';
    document.title = 'Strat · ' + obj + ' — CCNA Study';
  }

  function populateTranscript(theoryVideos, mapping) {
    // Replace ① Transcript section content with stacked cheat sheets
    var sec = document.querySelector('section.flow.done');
    if (!sec) return;
    var heading = sec.querySelector('.section-title');
    if (heading) heading.textContent = 'Cheat Sheet';
    var meta = sec.querySelector('.meta');
    if (meta) { meta.textContent = theoryVideos.length + ' lecture' + (theoryVideos.length !== 1 ? 's' : '') + ' · summarized for fast recall'; meta.style.opacity = ''; }
    var pull = sec.querySelector('.pull');
    if (!pull) return;
    pull.style.opacity = '';
    pull.innerHTML = '';
    pull.style.fontFamily = 'inherit';
    pull.style.fontStyle = 'normal';
    pull.style.fontSize = '.95rem';
    pull.style.color = 'var(--ink)';
    pull.style.background = 'transparent';
    pull.style.borderLeft = '0';
    pull.style.padding = '0';

    // Optional video chips at top
    if (theoryVideos.length) {
      var chips = document.createElement('div');
      chips.style.marginBottom = 'var(--s-md)';
      chips.style.padding = 'var(--s-sm)';
      chips.style.background = 'var(--bg-recessed)';
      chips.style.borderRadius = 'var(--radius)';
      chips.innerHTML = '<div style="font-family:var(--font-display);font-size:.7rem;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-muted);margin-bottom:6px">Optional video · skip if you know it</div>' +
        theoryVideos.map(buildVideoLink).join('');
      pull.appendChild(chips);
    }

    // Render each cheat sheet stacked
    var promises = theoryVideos.map(function (v) {
      var key = v.day; // e.g. "1", "11 (part 1)"
      var file = mapping[key];
      if (!file) {
        var skip = document.createElement('p');
        skip.style.color = 'var(--ink-muted)';
        skip.textContent = '(no cheat sheet yet for Day ' + v.day + ')';
        pull.appendChild(skip);
        return Promise.resolve();
      }
      return renderCheatSheet(file, pull);
    });

    return Promise.all(promises).then(function () {
      if (window.mermaid) {
        try { window.mermaid.run({ nodes: pull.querySelectorAll('.mermaid') }); }
        catch (e) { console.warn('mermaid', e); }
      }
    });
  }

  function populateLabs(labs) {
    // Lab section is the third .flow section (.locked or .flow that contains .lab elements)
    var labSec = Array.from(document.querySelectorAll('section.flow')).find(function (s) {
      return s.querySelector('.lab');
    });
    if (!labSec) return;
    var headTitle = labSec.querySelector('.section-title');
    if (headTitle) headTitle.textContent = 'Packet Tracer Labs';
    // Remove existing .lab entries
    labSec.querySelectorAll('.lab').forEach(function (el) { el.remove(); });
    var actionLine = labSec.querySelector('.action-line');
    if (actionLine) {
      var task = actionLine.querySelector('.task');
      if (task) {
        task.innerHTML = labs.length
          ? 'Open <code>Day ' + escapeHtml(labs[0].day) + ' — ' + escapeHtml(labs[0].title) + '</code>'
          : 'No lab for this objective';
      }
      var btn = actionLine.querySelector('.btn-go');
      if (btn) {
        if (labs.length) {
          btn.onclick = function () { window.open(ytEmbed(labs[0].ytid), '_blank'); };
        } else {
          btn.style.display = 'none';
        }
      }
    }
    var insertAfter = actionLine || headTitle.parentNode;
    labs.forEach(function (lab) {
      var div = document.createElement('div');
      div.className = 'lab';
      div.innerHTML = '<div>' +
        '<span class="pill">Day ' + escapeHtml(lab.day) + '</span>' +
        '<h3>' + escapeHtml(lab.title) + '</h3>' +
        '<div class="meta">Packet Tracer · YouTube walkthrough</div>' +
        '</div>' +
        '<a class="open" href="' + ytEmbed(lab.ytid) + '" target="_blank" rel="noopener">▶ Open</a>';
      insertAfter.parentNode.insertBefore(div, insertAfter.nextSibling);
      insertAfter = div;
    });
    if (!labs.length) {
      var none = document.createElement('p');
      none.className = 'meta';
      none.textContent = 'No Packet Tracer lab is associated with this objective in Jeremy\'s playlist.';
      labSec.appendChild(none);
    }
  }

  function populateAnki(flashcards, theoryVideos, obj) {
    // Find or create the Anki section
    var ankiSec = document.querySelector('section.flow.anki-flow');
    if (!ankiSec) {
      // Insert a new section between Quiz (②) and Lab (③).
      var quizSec = document.querySelectorAll('section.flow')[1];
      if (!quizSec) return;
      ankiSec = document.createElement('section');
      ankiSec.className = 'flow anki-flow';
      ankiSec.innerHTML = '<div class="head"><div class="title"><span class="num">★</span><h2 class="section-title">Anki Flashcards</h2></div><span class="status">○ optional spaced repetition</span></div>' +
        '<p class="meta">Per-day flashcard decks. Build one master CCNA deck and import each day\'s cards.</p>' +
        '<div class="anki-list" style="margin-top:var(--s-sm)"></div>' +
        '<p class="footnote"><a href="https://apps.ankiweb.net/" target="_blank" rel="noopener">Get Anki ↗</a><span class="sep">·</span><a href="https://www.youtube.com/watch?v=6Atw8oMtVTA" target="_blank" rel="noopener">Jeremy\'s Anki tutorial (Day 1 Extra) ▶</a></p>';
      quizSec.parentNode.insertBefore(ankiSec, quizSec.nextSibling);
    }
    var list = ankiSec.querySelector('.anki-list');
    list.innerHTML = '';
    if (flashcards.length === 0 && theoryVideos.length === 0) {
      list.innerHTML = '<p class="meta">No Anki cards specifically tagged for ' + escapeHtml(obj) + '. Use Jeremy\'s master deck.</p>';
      return;
    }
    // Each theory video has Anki cards in its YouTube description.
    var entries = theoryVideos.concat(flashcards);
    entries.forEach(function (v) {
      var div = document.createElement('div');
      div.className = 'lab';
      div.innerHTML = '<div>' +
        '<span class="pill">Day ' + escapeHtml(v.day) + '</span>' +
        '<h3>' + escapeHtml(v.title) + ' — Anki deck</h3>' +
        '<div class="meta">Cards linked in the video description</div>' +
        '</div>' +
        '<a class="open" href="' + ytEmbed(v.ytid) + '" target="_blank" rel="noopener">▶ Get cards</a>';
      list.appendChild(div);
    });
  }

  function buildPrevNext(obj, allKeys) {
    var idx = allKeys.indexOf(obj);
    if (idx < 0) return;
    var nav = document.createElement('div');
    nav.className = 'obj-nav';
    nav.style.cssText = 'display:flex;justify-content:space-between;align-items:center;gap:var(--s-sm);padding:var(--s-md) 0;border-top:1px solid var(--rule);margin-top:var(--s-lg)';
    var prev = idx > 0 ? allKeys[idx - 1] : null;
    var next = idx < allKeys.length - 1 ? allKeys[idx + 1] : null;
    nav.innerHTML =
      (prev ? '<a href="strat.html?obj=' + prev + '" class="open" style="text-decoration:none">← ' + prev + '</a>' : '<span></span>') +
      '<a href="objectives.html" class="open" style="text-decoration:none;color:var(--ink-muted);border-color:var(--border-strong)">All objectives</a>' +
      (next ? '<a href="strat.html?obj=' + next + '" class="open" style="text-decoration:none">' + next + ' →</a>' : '<span></span>');
    var main = document.querySelector('.strat-page main');
    if (main) main.appendChild(nav);
  }

  // ─── boot ───────────────────────────────────────────────────────
  function run() {
    var obj = getObjective();
    Promise.all([
      fetch('data/jeremy-deep-dive.json').then(function (r) { return r.json(); }),
      fetch('data/cheat-sheets-index.json').then(function (r) { return r.json(); })
    ]).then(function (data) {
      var dd = data[0];
      var mapping = data[1];
      var sub = dd.subobjectives && dd.subobjectives[obj];
      if (!sub) {
        var pull = document.querySelector('.flow .pull');
        if (pull) pull.textContent = 'Objective ' + obj + ' not found in deep-dive data.';
        return;
      }
      var theory = (sub.videos || []).filter(function (v) { return v.kind === 'theory'; });
      var labs = (sub.videos || []).filter(function (v) { return v.kind === 'lab'; });
      var fc = (sub.videos || []).filter(function (v) { return v.kind === 'flashcards'; });
      populateHeader(obj, sub);
      populateLabs(labs);
      populateAnki(fc, theory, obj);
      // Init mermaid before rendering
      if (window.mermaid) {
        window.mermaid.initialize({ startOnLoad: false, theme: 'default', securityLevel: 'loose', flowchart: { useMaxWidth: true, htmlLabels: true } });
      }
      populateTranscript(theory, mapping).then(function () {
        var allKeys = Object.keys(dd.subobjectives).sort();
        buildPrevNext(obj, allKeys);
      });
    }).catch(function (err) {
      console.error('strat-content', err);
    });
  }

  // Delay run() so we win against strat.js's legacy transcript loader for 1.1
  // (strat.js fetches data/transcript-objective-map.json and writes to .pull async).
  // We wait for window.load + 1.2s to guarantee we land last.
  if (document.readyState === 'complete') {
    setTimeout(run, 1200);
  } else {
    window.addEventListener('load', function () { setTimeout(run, 1200); });
  }
})();
