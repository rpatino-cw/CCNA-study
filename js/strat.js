/**
 * strat.js — page bootstrap for strat.html.
 *
 * Responsibilities:
 *   - Read ?obj=<id> from the URL (default 1.1).
 *   - Load the transcript-objective map + the referenced transcript text.
 *   - Hydrate the masthead, mastery line, side rail, mode pills, action line,
 *     and eval section from `window.stratState` for that objective.
 *   - On first interaction with a quiz mode or the eval section, ensure a
 *     Gemini API key exists (open the modal if not).
 *   - Wire mode-pill clicks to run quizzes inline in the section-② nest.
 *   - Wire the eval section to unlock once 3-of-5 modes are passed and to
 *     start the 8-exchange chat when clicked.
 *   - Toggle the "How this page works" panel via the eyebrow link.
 *   - Make the side-rail dots click-to-jump.
 *
 * Shared contracts:
 *   #strat-drawer  — Phase 1C populates; this script only ensures the mount
 *                    exists and hides it by default.
 *   data-drawer-open / data-drawer-id — Phase 1C will pick these up from
 *                                       footnote anchors.
 */
(function () {
  const DEFAULTS = { obj: '1.1' };

  function getObjId() {
    try {
      const u = new URL(location.href);
      return u.searchParams.get('obj') || DEFAULTS.obj;
    } catch (_) {
      return DEFAULTS.obj;
    }
  }

  async function fetchJSON(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error('HTTP ' + res.status + ' for ' + path);
    return res.json();
  }
  async function fetchText(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error('HTTP ' + res.status + ' for ' + path);
    return res.text();
  }

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }

  function masteryBar(score) {
    const filled = Math.round((score / 100) * 10);
    const empty = 10 - filled;
    return {
      filled: '█'.repeat(filled),
      empty: '░'.repeat(empty),
      score,
    };
  }

  function bootstrap() {
    const objId = getObjId();
    window.stratState.setCurrentObj(objId);

    Promise.all([
      fetchJSON('data/transcript-objective-map.json'),
    ]).then(async ([map]) => {
      const entry = map.objectives && map.objectives[objId];
      if (!entry) {
        renderError(`No transcript-objective-map entry for objective ${objId}.`);
        return;
      }
      let transcript = '';
      try {
        transcript = await fetchText(entry.transcriptFile);
      } catch (e) {
        renderError(`Could not load transcript: ${entry.transcriptFile}`);
        return;
      }
      hydrate(objId, entry, transcript);
    }).catch(err => {
      renderError('Bootstrap failed: ' + (err.message || err));
    });
  }

  function renderError(msg) {
    const banner = document.createElement('div');
    banner.className = 'strat-error';
    banner.textContent = msg;
    document.body.insertBefore(banner, document.body.firstChild);
  }

  function hydrate(objId, entry, transcript) {
    paintMasthead(objId, entry);
    paintMastery(objId);
    paintSideRail(objId);
    paintTranscriptSection(objId, entry, transcript);
    paintQuizSection(objId, entry, transcript);
    paintLabSection(objId, entry);
    paintEvalSection(objId, entry, transcript);
    wireWhatPanel();
    ensureDrawerMount();

    // First-visit key prompt — non-blocking. The user can dismiss and try
    // a quiz; the quiz path will re-prompt with `force:true`.
    if (window.gemini && !window.gemini.hasKey()) {
      window.gemini.promptForKey({ force: false });
    }
  }

  function paintMasthead(objId, entry) {
    const h1 = $('h1');
    if (h1) h1.textContent = `Objective ${objId} — ${entry.title}`;
    const sub = $('.subtitle');
    if (sub) sub.textContent = 'Pass the eval to mark this objective done.';
  }

  function paintMastery(objId) {
    const state = window.stratState.getObjState(objId);
    const bar = masteryBar(state.masteryComposite || 0);
    const line = $('.mastery-line');
    if (!line) return;
    line.innerHTML =
      '<span class="label">Mastery</span>' +
      '<span class="filled">' + bar.filled + '</span>' +
      '<span class="empty">' + bar.empty + '</span>' +
      ' &nbsp; <span class="num">' + bar.score + ' / 100</span>';
  }

  function paintSideRail(objId) {
    const rail = $('.side-rail');
    if (!rail) return;
    const state = window.stratState.getObjState(objId);
    const passedCount = window.stratState.passedModes(objId).length;
    const transcriptDone = true; // Phase 1A treats transcript as static-read.
    const quizDone = passedCount >= window.stratState.UNLOCK_PASSED_MODES;
    const labActive = !state.eval.verdict; // until eval is run, lab is the action
    const evalDone = !!state.eval.verdict;

    rail.innerHTML = '';
    const order = [
      { key: 'transcript', label: '① done',       state: transcriptDone ? 'done' : 'active' },
      { key: 'quiz',       label: quizDone ? '② done' : '② active', state: quizDone ? 'done' : (transcriptDone ? 'active' : 'locked') },
      { key: 'lab',        label: labActive ? '③ active' : '③ done', state: !quizDone ? 'locked' : (evalDone ? 'done' : 'active') },
      { key: 'eval',       label: evalDone ? '⑦ done' : '⑦ locked',   state: evalDone ? 'done' : (quizDone ? 'active' : 'locked') },
    ];
    order.forEach((item, i) => {
      const dot = document.createElement('div');
      dot.className = 'dot ' + (item.state === 'done' ? 'done' : item.state === 'active' ? 'active' : '');
      dot.dataset.label = item.label;
      dot.dataset.target = item.key;
      dot.setAttribute('role', 'button');
      dot.setAttribute('tabindex', '0');
      dot.addEventListener('click', () => jumpTo(item.key));
      dot.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); jumpTo(item.key); } });
      rail.appendChild(dot);
      if (i < order.length - 1) {
        const line = document.createElement('div');
        line.className = 'rail-line';
        rail.appendChild(line);
      }
    });
  }

  function jumpTo(key) {
    const map = { transcript: 0, quiz: 1, lab: 2, eval: 3 };
    const sections = $$('section.flow');
    const target = sections[map[key]];
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function paintTranscriptSection(objId, entry, transcript) {
    const sec = $$('section.flow')[0];
    if (!sec) return;
    const wordCount = (transcript.match(/\S+/g) || []).length;
    const status = sec.querySelector('.status');
    if (status) status.textContent = `✓ read · ${wordCount.toLocaleString()} words`;
    const meta = sec.querySelector('.meta');
    if (meta) meta.textContent = `Day ${entry.transcriptDay} · ${entry.transcriptTitle} · ~${Math.ceil(wordCount / 220)} min reading.`;
    // Pull-block: render all anchored sections collapsibly. First section open,
    // rest collapsed. Falls back to first paragraph if no anchors found.
    const pull = sec.querySelector('.pull');
    if (pull) {
      const anchorRe = /\[([a-z0-9-]+)\]\s*([\s\S]*?)(?=\n\s*\[[a-z0-9-]+\]|\Z)/g;
      const anchors = [];
      let m;
      while ((m = anchorRe.exec(transcript)) !== null) {
        anchors.push({ slug: m[1], body: m[2].trim() });
      }
      if (anchors.length) {
        const html = anchors.map((a, i) => {
          const title = a.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
          const open = i === 0 ? ' open' : '';
          const safeBody = a.body.replace(/&/g, '&amp;').replace(/</g, '&lt;');
          return `<details class="transcript-section"${open} data-anchor="${a.slug}"><summary style="cursor:pointer;font-weight:600;padding:6px 0;border-bottom:1px solid var(--ink-faint,#ddd)">${title}</summary><div style="padding:10px 0;white-space:pre-wrap;line-height:1.6">${safeBody}</div></details>`;
        }).join('');
        pull.innerHTML = html;
      } else {
        const firstPara = transcript.split(/\n\s*\n/).find(p => p.trim().length > 50);
        if (firstPara) pull.textContent = firstPara.trim();
      }
    }
    paintFootnoteRefs(sec, entry, 'transcript');
  }

  function paintQuizSection(objId, entry, transcript) {
    const sec = $$('section.flow')[1];
    if (!sec) return;
    const state = window.stratState.getObjState(objId);
    const passedCount = window.stratState.passedModes(objId).length;
    const status = sec.querySelector('.status');
    if (status) {
      status.textContent = passedCount === 0 ? 'pick a mode'
        : passedCount >= window.stratState.UNLOCK_PASSED_MODES ? `✓ ${passedCount}/5 passed — eval unlocked`
        : `${passedCount}/5 passed`;
    }
    sec.classList.toggle('done', passedCount >= window.stratState.UNLOCK_PASSED_MODES);

    const pillsHost = sec.querySelector('.quiz-modes');
    if (pillsHost) {
      pillsHost.innerHTML = '';
      window.stratQuiz.getModeMeta().forEach(meta => {
        const m = state.modes[meta.id];
        const pill = document.createElement('button');
        pill.type = 'button';
        pill.className = 'mode-pill';
        if (m.passed) pill.classList.add('done');
        const glyph = m.passed ? '✓' : '●';
        const scoreLabel = m.attempts ? `${m.score}/10` : 'untouched';
        pill.innerHTML =
          '<span class="g">' + glyph + '</span>' +
          '<span>' + meta.label + '</span>' +
          '<span class="s">' + scoreLabel + '</span>';
        pill.addEventListener('click', () => runQuiz(sec, objId, entry, transcript, meta));
        pillsHost.appendChild(pill);
      });
    }

    const nest = sec.querySelector('.nest');
    if (nest) {
      nest.innerHTML = '<p class="qprompt" style="font-style:italic;color:var(--ink-muted)">Pick a mode pill above to start. Each run draws 10 fresh questions from Gemini, scope-locked to objective ' + objId + '.</p>';
    }
    paintFootnoteRefs(sec, entry, 'quiz');
  }

  async function runQuiz(sec, objId, entry, transcript, meta) {
    const nest = sec.querySelector('.nest');
    if (!nest) return;
    if (!window.gemini.hasKey()) {
      const k = await window.gemini.promptForKey({ force: true });
      if (!k) return;
    }
    nest.innerHTML = '<p class="qprompt" style="font-style:italic;color:var(--ink-muted)">Generating ' + meta.label + ' — Gemini is writing 10 scope-locked questions…</p>';
    $$('.mode-pill', sec).forEach(p => p.classList.remove('active'));
    const pill = $$('.mode-pill', sec).find(p => p.textContent.includes(meta.label));
    if (pill) pill.classList.add('active');
    try {
      const { seed, questions } = await window.stratQuiz.generate(objId, meta.id, transcript, entry.forbiddenTerms || []);
      window.stratState.setMode(objId, meta.id, { lastSeed: seed, questions, attempts: (window.stratState.getObjState(objId).modes[meta.id].attempts || 0) + 1 });
      window.stratQuiz.render(nest, meta, questions, function (result) {
        window.stratState.setMode(objId, meta.id, {
          score: result.score,
          attempts: window.stratState.getObjState(objId).modes[meta.id].attempts,
          lastSeed: seed,
          questions,
        });
        paintMastery(objId);
        paintQuizSection(objId, entry, transcript);
        paintEvalSection(objId, entry, transcript);
        paintSideRail(objId);
      });
    } catch (err) {
      nest.innerHTML = '<p class="qprompt" style="color:var(--prof-weak)">✗ Quiz generation failed: ' + escapeHTML(err.message || String(err)) + '</p>';
    }
  }

  function paintLabSection(objId, entry) {
    const sec = $$('section.flow')[2];
    if (!sec) return;
    const state = window.stratState.getObjState(objId);
    const passedCount = window.stratState.passedModes(objId).length;
    const evalDone = !!state.eval.verdict;
    sec.classList.toggle('locked', passedCount === 0);
    sec.classList.toggle('active', passedCount > 0 && !evalDone);
    sec.classList.toggle('done', evalDone);
    paintFootnoteRefs(sec, entry, 'lab');
  }

  function paintEvalSection(objId, entry, transcript) {
    const sec = $$('section.flow')[3];
    if (!sec) return;
    const state = window.stratState.getObjState(objId);
    const unlocked = window.stratState.evalUnlocked(objId);
    sec.classList.toggle('locked', !unlocked);
    sec.classList.toggle('done', state.eval.verdict === 'PASS');
    sec.classList.toggle('active', unlocked && !state.eval.verdict);

    const status = sec.querySelector('.status');
    if (status) {
      status.textContent = !unlocked ? `○ pass 3 of 5 modes to unlock`
        : state.eval.verdict === 'PASS' ? '✓ passed'
        : state.eval.verdict === 'FAIL' ? '✗ failed — review misses'
        : state.eval.verdict === 'INCONCLUSIVE' ? '· inconclusive — re-run'
        : '● ready — click below to begin';
    }

    let pane = sec.querySelector('.eval-pane');
    if (!pane) {
      pane = document.createElement('div');
      pane.className = 'eval-pane-mount';
      sec.appendChild(pane);
    }
    if (!unlocked) {
      pane.innerHTML = '';
      return;
    }
    if (state.eval.verdict) {
      pane.innerHTML = renderEvalSummary(state.eval);
      const retry = pane.querySelector('.eval-retry');
      if (retry) retry.addEventListener('click', () => {
        window.stratState.setEval(objId, { transcript: [], score: 0, verdict: null, misses: [] });
        paintEvalSection(objId, entry, transcript);
        paintMastery(objId);
        paintSideRail(objId);
      });
      return;
    }
    if (!pane.dataset.armed) {
      pane.innerHTML = `<button type="button" class="btn btn-primary eval-start">Start eval</button>
        <p class="eval-desc" style="margin-top:12px">Eight-exchange one-on-one with a Cisco-certified examiner. Pass this and the objective is done.</p>`;
      const start = pane.querySelector('.eval-start');
      start.addEventListener('click', async function () {
        if (!window.gemini.hasKey()) {
          const k = await window.gemini.promptForKey({ force: true });
          if (!k) return;
        }
        pane.dataset.armed = '1';
        const host = document.createElement('div');
        host.className = 'eval-pane';
        pane.innerHTML = '';
        pane.appendChild(host);
        window.stratEval.start(host, {
          objId,
          blueprintTitle: entry.blueprintTitle,
          transcript,
          anchors: entry.anchors || [],
          forbiddenTerms: entry.forbiddenTerms || [],
          onComplete: function () {
            paintMastery(objId);
            paintEvalSection(objId, entry, transcript);
            paintSideRail(objId);
          },
        });
      });
    }
  }

  function renderEvalSummary(ev) {
    const verdict = ev.verdict;
    const verdictLine = verdict === 'PASS' ? '✓ PASS — objective marked done.'
      : verdict === 'FAIL' ? '✗ FAIL — review misses below.'
      : '· INCONCLUSIVE — eval ran 8 exchanges without a streak.';
    const misses = (ev.misses || []).map(m =>
      '<li><a data-drawer-open="transcript" data-drawer-id="' + escapeHTML(m) + '">' + escapeHTML(m) + '</a></li>'
    ).join('');
    return `
      <div class="eval-summary">
        <p class="eval-verdict">${verdictLine}</p>
        ${misses ? '<ul class="eval-misses">' + misses + '</ul>' : ''}
        <p><button type="button" class="btn btn-ghost eval-retry">Re-run eval</button></p>
      </div>
    `;
  }

  function paintFootnoteRefs(sec, entry, sectionKey) {
    const fn = sec.querySelector('.footnote');
    if (!fn) return;
    // Wire data-drawer-open hooks for Phase 1C; the click is no-op until 1C
    // ships, so we just give the anchors hrefs that don't navigate.
    $$('a', fn).forEach(a => {
      if (!a.hasAttribute('data-drawer-open')) {
        const txt = (a.textContent || '').toLowerCase();
        if (txt.includes('youtube')) a.dataset.drawerOpen = 'video';
        else if (txt.includes('community')) a.dataset.drawerOpen = 'community';
        else a.dataset.drawerOpen = 'books';
        a.dataset.drawerId = sectionKey + '-ref';
      }
      a.setAttribute('href', '#');
      a.addEventListener('click', function (e) {
        e.preventDefault();
        const drawer = $('#strat-drawer');
        if (drawer && !drawer.hasAttribute('hidden')) drawer.setAttribute('hidden', '');
      });
    });
  }

  function wireWhatPanel() {
    const link = $('.what-link');
    const panel = $('.what-panel');
    if (!link || !panel) return;
    function toggle(open) {
      const next = typeof open === 'boolean' ? open : !panel.classList.contains('show');
      panel.classList.toggle('show', next);
    }
    link.addEventListener('click', e => { e.preventDefault(); toggle(); });
    const close = panel.querySelector('.close');
    if (close) close.addEventListener('click', () => toggle(false));
  }

  function ensureDrawerMount() {
    if ($('#strat-drawer')) return;
    const aside = document.createElement('aside');
    aside.id = 'strat-drawer';
    aside.setAttribute('hidden', '');
    aside.setAttribute('aria-label', 'References drawer (Phase 1C)');
    document.body.appendChild(aside);
  }

  function escapeHTML(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
