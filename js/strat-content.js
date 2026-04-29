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

  function populateAnki(ankiEntries, obj) {
    // ankiEntries = [{file, day, title}] from data/anki-index.json
    // Find or create the Anki section
    var ankiSec = document.querySelector('section.flow.anki-flow');
    if (!ankiSec) {
      // Insert a new section between Quiz (②) and Lab (③).
      var quizSec = document.querySelectorAll('section.flow')[1];
      if (!quizSec) return;
      ankiSec = document.createElement('section');
      ankiSec.className = 'flow anki-flow';
      ankiSec.innerHTML = '<div class="head"><div class="title"><span class="num">★</span><h2 class="section-title">Anki Flashcards</h2></div><span class="status">○ optional spaced repetition</span></div>' +
        '<p class="meta">Per-day flashcard decks. Click to download the .apkg, then import into Anki.</p>' +
        '<div class="anki-list" style="margin-top:var(--s-sm)"></div>' +
        '<p class="footnote"><a href="https://apps.ankiweb.net/" target="_blank" rel="noopener">Get Anki ↗</a><span class="sep">·</span><a href="https://www.youtube.com/watch?v=6Atw8oMtVTA" target="_blank" rel="noopener">Jeremy\'s Anki tutorial (Day 1 Extra) ▶</a></p>';
      quizSec.parentNode.insertBefore(ankiSec, quizSec.nextSibling);
    }
    var list = ankiSec.querySelector('.anki-list');
    list.innerHTML = '';
    if (!ankiEntries || ankiEntries.length === 0) {
      list.innerHTML = '<p class="meta">No Anki deck mapped to ' + escapeHtml(obj) + ' yet.</p>';
      return;
    }
    ankiEntries.forEach(function (e) {
      var div = document.createElement('div');
      div.className = 'lab';
      var countLabel = e.card_count ? e.card_count + ' cards' : 'Anki deck';
      var actions = '<a class="open" href="data/anki/' + encodeURIComponent(e.file) + '" download style="margin-right:6px">↓ .apkg</a>';
      if (e.cards_slug) {
        actions = '<button class="open study-cards-btn" data-slug="' + escapeHtml(e.cards_slug) + '" data-title="Day ' + escapeHtml(e.day) + ' — ' + escapeHtml(e.title) + '" style="margin-right:6px;cursor:pointer;background:var(--accent);color:#fff;border-color:var(--accent)">▶ Study in browser</button>' + actions;
      }
      div.innerHTML = '<div>' +
        '<span class="pill">Day ' + escapeHtml(e.day) + '</span>' +
        '<h3>' + escapeHtml(e.title) + '</h3>' +
        '<div class="meta">' + countLabel + ' · click to study or download .apkg</div>' +
        '</div>' +
        '<div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">' + actions + '</div>';
      list.appendChild(div);
    });
    list.querySelectorAll('.study-cards-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openCardViewer(btn.getAttribute('data-slug'), btn.getAttribute('data-title'));
      });
    });
  }

  // ─── inline flashcard viewer ────────────────────────────────────
  var viewerState = null;

  function ensureViewerDOM() {
    var modal = document.getElementById('card-viewer-modal');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'card-viewer-modal';
    modal.innerHTML = '' +
      '<div class="cv-backdrop"></div>' +
      '<div class="cv-shell">' +
        '<div class="cv-head">' +
          '<div class="cv-title"></div>' +
          '<div class="cv-progress">0 / 0</div>' +
          '<button class="cv-close" aria-label="Close">×</button>' +
        '</div>' +
        '<div class="cv-card">' +
          '<div class="cv-side cv-front"></div>' +
          '<div class="cv-side cv-back" style="display:none"></div>' +
        '</div>' +
        '<div class="cv-controls">' +
          '<button class="cv-flip">Flip card</button>' +
          '<div class="cv-rate" style="display:none">' +
            '<button class="cv-r r-again">Again</button>' +
            '<button class="cv-r r-hard">Hard</button>' +
            '<button class="cv-r r-good">Good</button>' +
            '<button class="cv-r r-easy">Easy</button>' +
          '</div>' +
        '</div>' +
        '<div class="cv-foot">' +
          '<button class="cv-nav cv-prev">← Prev</button>' +
          '<button class="cv-shuffle">⤺ Shuffle</button>' +
          '<button class="cv-nav cv-next">Next →</button>' +
        '</div>' +
        '<div class="cv-hint">Space/Enter to flip · ←/→ to navigate · Esc to close</div>' +
      '</div>';
    document.body.appendChild(modal);
    modal.querySelector('.cv-close').addEventListener('click', closeCardViewer);
    modal.querySelector('.cv-backdrop').addEventListener('click', closeCardViewer);
    modal.querySelector('.cv-flip').addEventListener('click', flipCard);
    modal.querySelector('.cv-prev').addEventListener('click', function () { changeCard(-1); });
    modal.querySelector('.cv-next').addEventListener('click', function () { changeCard(1); });
    modal.querySelector('.cv-shuffle').addEventListener('click', shuffleCards);
    modal.querySelector('.r-again').addEventListener('click', function () { rateCard(0); });
    modal.querySelector('.r-hard').addEventListener('click', function () { rateCard(1); });
    modal.querySelector('.r-good').addEventListener('click', function () { rateCard(2); });
    modal.querySelector('.r-easy').addEventListener('click', function () { rateCard(3); });
    document.addEventListener('keydown', function (e) {
      if (!viewerState || !modal.classList.contains('open')) return;
      if (e.key === 'Escape') closeCardViewer();
      else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flipCard(); }
      else if (e.key === 'ArrowRight') changeCard(1);
      else if (e.key === 'ArrowLeft') changeCard(-1);
    });
    return modal;
  }

  // ─── Spaced-repetition state (SM-2 lite, localStorage) ─────────
  var DAY_MS = 86400000;

  function srKey(slug) { return 'ccna_anki_sr_' + slug; }

  function loadSRState(slug) {
    try { return JSON.parse(localStorage.getItem(srKey(slug)) || '{}'); }
    catch (_) { return {}; }
  }

  function saveSRState(slug, state) {
    try { localStorage.setItem(srKey(slug), JSON.stringify(state)); } catch (_) {}
  }

  function nextSchedule(s, rating) {
    s = s || {};
    s.reps = s.reps || 0;
    s.ease = s.ease || 2.5;
    s.interval = s.interval || 0;
    s.lapses = s.lapses || 0;
    if (rating === 0) {
      s.lapses += 1; s.reps = 0;
      s.ease = Math.max(1.3, s.ease - 0.2);
      s.interval = 1;
    } else if (rating === 1) {
      s.reps += 1;
      s.ease = Math.max(1.3, s.ease - 0.15);
      s.interval = Math.max(1, Math.round(s.interval * 1.2));
    } else if (rating === 2) {
      s.reps += 1;
      if (s.reps === 1) s.interval = 1;
      else if (s.reps === 2) s.interval = 6;
      else s.interval = Math.round(s.interval * s.ease);
    } else {
      s.reps += 1;
      s.ease = Math.min(3.0, s.ease + 0.15);
      if (s.reps === 1) s.interval = 4;
      else s.interval = Math.round(s.interval * s.ease * 1.3);
    }
    s.due = Date.now() + s.interval * DAY_MS;
    s.lastReview = Date.now();
    return s;
  }

  function buildQueue(cards, sr, mode) {
    // mode: 'due' (default) | 'all' | 'new'
    var now = Date.now();
    var queue = [];
    cards.forEach(function (c, i) {
      var s = sr[i];
      var isNew = !s || !s.reps;
      var isDue = s && s.due && s.due <= now;
      if (mode === 'all') queue.push(i);
      else if (mode === 'new' && isNew) queue.push(i);
      else if (isNew || isDue) queue.push(i);
    });
    return queue;
  }

  function openCardViewer(slug, title) {
    var modal = ensureViewerDOM();
    modal.querySelector('.cv-title').textContent = title;
    modal.querySelector('.cv-front').textContent = 'Loading…';
    modal.querySelector('.cv-back').textContent = '';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    fetch('data/anki-cards/' + encodeURIComponent(slug) + '.json')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var sr = loadSRState(slug);
        var queue = buildQueue(data.cards, sr, 'due');
        viewerState = {
          cards: data.cards, sr: sr, slug: slug,
          queue: queue, qIdx: 0, flipped: false,
          studiedThisSession: 0
        };
        if (queue.length === 0) {
          showAllCaughtUp();
        } else {
          renderCard();
        }
      })
      .catch(function (e) {
        modal.querySelector('.cv-front').textContent = 'Failed to load deck: ' + e.message;
      });
  }

  function showAllCaughtUp() {
    var modal = document.getElementById('card-viewer-modal');
    var s = viewerState;
    var totalCards = s.cards.length;
    var studied = Object.keys(s.sr).length;
    modal.querySelector('.cv-front').innerHTML =
      '<div style="text-align:center">' +
      '<div style="font-size:2.4rem;margin-bottom:8px">✓</div>' +
      '<div style="font-family:var(--font-display);font-weight:700;font-size:1.1rem;margin-bottom:6px">All caught up</div>' +
      '<div style="color:var(--ink-muted);margin-bottom:14px">No cards due for review right now. ' + studied + '/' + totalCards + ' cards scheduled.</div>' +
      '<button id="cv-study-all" style="font-family:var(--font-display);font-weight:600;padding:8px 18px;background:var(--accent);color:#fff;border:0;border-radius:99px;cursor:pointer">Review all cards anyway →</button>' +
      '</div>';
    modal.querySelector('.cv-back').innerHTML = '';
    modal.querySelector('.cv-flip').style.display = 'none';
    modal.querySelector('.cv-rate').style.display = 'none';
    modal.querySelector('.cv-progress').textContent = studied + ' studied · ' + totalCards + ' total';
    var btn = document.getElementById('cv-study-all');
    if (btn) btn.addEventListener('click', function () {
      viewerState.queue = viewerState.cards.map(function (_, i) { return i; });
      viewerState.qIdx = 0;
      viewerState.mode = 'all';
      renderCard();
    });
  }

  function closeCardViewer() {
    var modal = document.getElementById('card-viewer-modal');
    if (modal) modal.classList.remove('open');
    document.body.style.overflow = '';
    viewerState = null;
  }

  function renderCard() {
    if (!viewerState) return;
    var modal = document.getElementById('card-viewer-modal');
    if (!viewerState.queue || viewerState.queue.length === 0) {
      showAllCaughtUp();
      return;
    }
    if (viewerState.qIdx >= viewerState.queue.length) {
      // Session done
      var modal2 = document.getElementById('card-viewer-modal');
      modal2.querySelector('.cv-front').innerHTML =
        '<div style="text-align:center">' +
        '<div style="font-size:2.4rem;margin-bottom:8px">🎯</div>' +
        '<div style="font-family:var(--font-display);font-weight:700;font-size:1.1rem;margin-bottom:6px">Session complete</div>' +
        '<div style="color:var(--ink-muted)">' + viewerState.studiedThisSession + ' cards reviewed.</div>' +
        '</div>';
      modal2.querySelector('.cv-back').innerHTML = '';
      modal2.querySelector('.cv-flip').style.display = 'none';
      modal2.querySelector('.cv-rate').style.display = 'none';
      modal2.querySelector('.cv-progress').textContent = 'done';
      return;
    }
    var cardIdx = viewerState.queue[viewerState.qIdx];
    var c = viewerState.cards[cardIdx];
    if (!c) { modal.querySelector('.cv-front').textContent = 'No cards.'; return; }
    modal.querySelector('.cv-front').innerHTML = c.front || '<em>(no front)</em>';
    modal.querySelector('.cv-back').innerHTML = c.back || '<em>(no back)</em>';
    viewerState.flipped = false;
    modal.querySelector('.cv-front').style.display = '';
    modal.querySelector('.cv-back').style.display = 'none';
    modal.querySelector('.cv-flip').style.display = '';
    modal.querySelector('.cv-rate').style.display = 'none';
    var s = viewerState.sr[cardIdx];
    var stats = s && s.reps ? ' · ' + s.reps + ' reps · ease ' + (s.ease || 2.5).toFixed(1) : ' · new';
    modal.querySelector('.cv-progress').textContent = (viewerState.qIdx + 1) + ' / ' + viewerState.queue.length + stats;
  }

  function rateCard(rating) {
    if (!viewerState || !viewerState.flipped) return;
    var cardIdx = viewerState.queue[viewerState.qIdx];
    var s = viewerState.sr[cardIdx] || {};
    s = nextSchedule(s, rating);
    viewerState.sr[cardIdx] = s;
    saveSRState(viewerState.slug, viewerState.sr);
    viewerState.studiedThisSession += 1;
    // If "Again", re-queue this card at end of queue (within session)
    if (rating === 0) {
      viewerState.queue.push(cardIdx);
    }
    viewerState.qIdx += 1;
    renderCard();
  }

  function flipCard() {
    if (!viewerState) return;
    var modal = document.getElementById('card-viewer-modal');
    viewerState.flipped = !viewerState.flipped;
    modal.querySelector('.cv-front').style.display = viewerState.flipped ? 'none' : '';
    modal.querySelector('.cv-back').style.display = viewerState.flipped ? '' : 'none';
    modal.querySelector('.cv-flip').style.display = viewerState.flipped ? 'none' : '';
    modal.querySelector('.cv-rate').style.display = viewerState.flipped ? 'flex' : 'none';
  }

  function changeCard(delta) {
    if (!viewerState || !viewerState.queue) return;
    viewerState.qIdx = Math.max(0, Math.min(viewerState.queue.length - 1, viewerState.qIdx + delta));
    renderCard();
  }

  function shuffleCards() {
    if (!viewerState || !viewerState.queue) return;
    for (var i = viewerState.queue.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = viewerState.queue[i];
      viewerState.queue[i] = viewerState.queue[j];
      viewerState.queue[j] = tmp;
    }
    viewerState.qIdx = 0;
    renderCard();
  }

  function populateLabsFromIndex(labEntries, jeremyLabVideos) {
    // labEntries = [{file, day, title}] from data/labs-index.json (PT files)
    // jeremyLabVideos = list of lab kind videos from deep-dive (YouTube walkthroughs)
    var labSec = Array.from(document.querySelectorAll('section.flow')).find(function (s) {
      return s.querySelector('.lab') || s.querySelector('.section-title') && /Lab/i.test(s.querySelector('.section-title').textContent || '');
    });
    if (!labSec) return;
    var headTitle = labSec.querySelector('.section-title');
    if (headTitle) headTitle.textContent = 'Packet Tracer Labs';
    labSec.querySelectorAll('.lab').forEach(function (el) { el.remove(); });
    var actionLine = labSec.querySelector('.action-line');
    var insertAfter = actionLine || (headTitle && headTitle.parentNode);

    if (actionLine) {
      var task = actionLine.querySelector('.task');
      if (task) {
        if (labEntries && labEntries.length) {
          task.innerHTML = 'Open <code>' + escapeHtml(labEntries[0].title) + '</code>';
        } else if (jeremyLabVideos.length) {
          task.innerHTML = 'Watch <code>Day ' + escapeHtml(jeremyLabVideos[0].day) + ' — ' + escapeHtml(jeremyLabVideos[0].title) + '</code>';
        } else {
          task.innerHTML = 'No lab mapped to this objective';
        }
      }
      var btn = actionLine.querySelector('.btn-go');
      if (btn) {
        if (labEntries && labEntries.length) {
          btn.textContent = '↓ Download .pkt';
          btn.onclick = function () { window.location.href = 'data/labs/' + encodeURIComponent(labEntries[0].file); };
        } else if (jeremyLabVideos.length) {
          btn.textContent = '▶ Watch';
          btn.onclick = function () { window.open(ytEmbed(jeremyLabVideos[0].ytid), '_blank'); };
        } else {
          btn.style.display = 'none';
        }
      }
    }
    // Render PT lab download tiles
    (labEntries || []).forEach(function (lab) {
      var div = document.createElement('div');
      div.className = 'lab';
      div.innerHTML = '<div>' +
        '<span class="pill">Day ' + escapeHtml(lab.day) + '</span>' +
        '<h3>' + escapeHtml(lab.title) + '</h3>' +
        '<div class="meta">Packet Tracer file (.pkt)</div>' +
        '</div>' +
        '<a class="open" href="data/labs/' + encodeURIComponent(lab.file) + '" download>↓ Download</a>';
      insertAfter.parentNode.insertBefore(div, insertAfter.nextSibling);
      insertAfter = div;
    });
    // Render YouTube lab walkthroughs (outside)
    jeremyLabVideos.forEach(function (v) {
      var div = document.createElement('div');
      div.className = 'lab';
      div.innerHTML = '<div>' +
        '<span class="pill outside">Walkthrough</span>' +
        '<h3>' + escapeHtml(v.title) + '</h3>' +
        '<div class="meta">Day ' + escapeHtml(v.day) + ' · YouTube</div>' +
        '</div>' +
        '<a class="open outside" href="' + ytEmbed(v.ytid) + '" target="_blank" rel="noopener">▶ Watch</a>';
      insertAfter.parentNode.insertBefore(div, insertAfter.nextSibling);
      insertAfter = div;
    });
    if ((!labEntries || !labEntries.length) && !jeremyLabVideos.length) {
      var none = document.createElement('p');
      none.className = 'meta';
      none.textContent = 'No Packet Tracer lab is associated with this objective.';
      labSec.appendChild(none);
    }
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
      (prev ? '<a href="strat.html?obj=' + prev + '" data-spa-obj="' + prev + '" class="open" style="text-decoration:none">← ' + prev + '</a>' : '<span></span>') +
      '<a href="objectives.html" class="open" style="text-decoration:none;color:var(--ink-muted);border-color:var(--border-strong)">All objectives</a>' +
      (next ? '<a href="strat.html?obj=' + next + '" data-spa-obj="' + next + '" class="open" style="text-decoration:none">' + next + ' →</a>' : '<span></span>');
    var main = document.querySelector('.strat-page main');
    if (main) main.appendChild(nav);
  }

  // ─── SPA nav: intercept prev/next clicks, pushState + re-run ────
  function spaNavTo(obj) {
    var url = 'strat.html?obj=' + encodeURIComponent(obj);
    history.pushState({ obj: obj }, '', url);
    window.scrollTo(0, 0);
    if (window.stratState && window.stratState.setCurrentObj) window.stratState.setCurrentObj(obj);
    if (typeof window.stratBootstrap === 'function') window.stratBootstrap();
    run();
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-spa-obj]');
    if (!a) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    spaNavTo(a.getAttribute('data-spa-obj'));
  });
  window.addEventListener('popstate', function () {
    if (typeof window.stratBootstrap === 'function') window.stratBootstrap();
    run();
  });

  // ─── boot ───────────────────────────────────────────────────────
  // Static JSON indexes — fetched once, reused for every objective switch.
  var _staticCache = null;
  function loadStatics() {
    if (_staticCache) return Promise.resolve(_staticCache);
    return Promise.all([
      fetch('data/jeremy-deep-dive.json').then(function (r) { return r.json(); }),
      fetch('data/cheat-sheets-index.json').then(function (r) { return r.json(); }),
      fetch('data/objective-fallback.json').then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; }),
      fetch('data/anki-index.json').then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; }),
      fetch('data/labs-index.json').then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; })
    ]).then(function (data) { _staticCache = data; return data; });
  }

  function run() {
    var obj = getObjective();
    loadStatics().then(function (data) {
      var dd = data[0];
      var mapping = data[1];
      var fallback = data[2] || {};
      var ankiByObj = data[3] || {};
      var labsByObj = data[4] || {};
      var sub = dd.subobjectives && dd.subobjectives[obj];
      if (!sub) {
        var pull = document.querySelector('.flow .pull');
        if (pull) pull.textContent = 'Objective ' + obj + ' not found in deep-dive data.';
        return;
      }
      var theory = (sub.videos || []).filter(function (v) { return v.kind === 'theory'; });
      var labVideos = (sub.videos || []).filter(function (v) { return v.kind === 'lab'; });
      // Apply fallback if no theory video for this objective
      if (theory.length === 0 && fallback[obj]) {
        theory = fallback[obj].map(function (f) { return Object.assign({ kind: 'theory', _fallback: true }, f); });
      }
      populateHeader(obj, sub);
      populateLabsFromIndex(labsByObj[obj] || [], labVideos);
      populateAnki(ankiByObj[obj] || [], obj);
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

  // strat.js skips paintTranscriptSection — strat-content owns .pull, no race.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
