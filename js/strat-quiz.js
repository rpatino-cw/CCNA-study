/**
 * strat-quiz.js — five quiz modes, all scope-locked to the current objective.
 *
 * Modes:
 *   terminology   — match a term to its definition
 *   glossary      — produce the canonical name for a described concept
 *   scenario      — a small router-table situation with a chosen answer
 *   command       — recall a specific Cisco IOS command
 *   table         — read a `show ip route` line and answer about it
 *
 * Each mode returns 10 multiple-choice questions. The Gemini call is wrapped
 * in a scope-lock retry: if any question prompt or option string contains a
 * forbidden term from the objective map, the run is regenerated. Max 3
 * retries, then the user gets a clear error toast and the mode is left
 * unchanged.
 *
 * Public API on window.stratQuiz:
 *   getModeMeta()                                → array of mode descriptors
 *   generate(objId, modeName, transcript, fbd)   → Promise<questions[]>
 *   render(container, mode, questions, onDone)   → void
 */
(function () {
  const MODE_META = [
    { id: 'terminology',  label: 'Terminology',     glyph: 'T' },
    { id: 'glossary',     label: 'Glossary',        glyph: 'G' },
    { id: 'scenario',     label: 'Scenario',        glyph: 'S' },
    { id: 'command',      label: 'Command Recall',  glyph: 'C' },
    { id: 'table',        label: 'Read the Table',  glyph: 'R' },
  ];

  const MODE_PROMPTS = {
    terminology:
      `Write 10 multiple-choice questions where the prompt is a one-line definition and the four options are candidate terms. The correct option is the term that best matches the definition. Cover only concepts present in the supplied transcript.`,
    glossary:
      `Write 10 multiple-choice questions where the prompt names a concept in plain English and the four options are short descriptive phrases. The correct option is the phrase that best describes the named concept. Cover only concepts present in the supplied transcript.`,
    scenario:
      `Write 10 multiple-choice scenario questions. Each prompt sets up a tiny situation (a router receives a packet for X, the route table contains Y and Z, etc.) and the four options are candidate forwarding decisions or explanations. Use realistic IPv4 addresses and prefix lengths from the supplied transcript.`,
    command:
      `Write 10 multiple-choice command-recall questions. Each prompt asks "which Cisco IOS command shows / configures / verifies X?" and the four options are candidate commands in mono. The correct option must match Cisco syntax. Use only commands referenced in the supplied transcript.`,
    table:
      `Write 10 multiple-choice questions that show a single \`show ip route\` line in the prompt (e.g. "O 192.168.1.0/24 [110/2] via 10.0.0.1") and ask the user about its source code, administrative distance, metric, next hop, or interface. Each option is a candidate interpretation. Use route lines that match the supplied transcript style.`,
  };

  const QUESTION_SCHEMA = {
    type: 'object',
    properties: {
      questions: {
        type: 'array',
        minItems: 10,
        maxItems: 10,
        items: {
          type: 'object',
          properties: {
            prompt: { type: 'string' },
            options: {
              type: 'array',
              minItems: 4,
              maxItems: 4,
              items: { type: 'string' },
            },
            correct: { type: 'integer', minimum: 0, maximum: 3 },
            why: { type: 'string' },
          },
          required: ['prompt', 'options', 'correct'],
        },
      },
    },
    required: ['questions'],
  };

  function getModeMeta() { return MODE_META.slice(); }

  function joinForScope(qs) {
    return qs.map(q => [q.prompt].concat(q.options || []).concat([q.why || '']).join(' ')).join('\n');
  }

  async function generate(objId, modeName, transcript, forbiddenTerms) {
    if (!window.gemini) throw new Error('Gemini client not loaded.');
    const meta = MODE_META.find(m => m.id === modeName);
    if (!meta) throw new Error('Unknown quiz mode: ' + modeName);

    const seed = randomSeed();
    const sysPrompt = `You are a Cisco-certified instructor writing strict practice questions for CCNA 200-301 study.
Scope-lock: ONLY use facts from the supplied transcript for objective ${objId}. Do not introduce concepts from other objectives.
Forbidden terms (must not appear in any prompt, option, or explanation): ${forbiddenTerms.join(', ') || '(none)'}.
Output strict JSON matching the supplied schema. Exactly 10 questions, exactly 4 options each, "correct" is the index of the right option.`;
    const userPrompt = `Objective: ${objId}
Mode: ${meta.label}
Seed: ${seed}
Mode rules:
${MODE_PROMPTS[modeName]}

Transcript (do not quote large blocks verbatim, but stay strictly inside it):
"""
${transcript}
"""`;

    const MAX_RETRIES = 3;
    let lastErr = null;
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const data = await window.gemini.generate(sysPrompt, userPrompt, QUESTION_SCHEMA);
        const qs = (data && data.questions) || [];
        if (qs.length !== 10) {
          lastErr = new Error(`expected 10 questions, got ${qs.length}`);
          continue;
        }
        const blob = joinForScope(qs);
        if (!window.gemini.scopeValidate(blob, forbiddenTerms)) {
          lastErr = new Error('scope leak detected — regenerating');
          continue;
        }
        // Normalize: ensure options are strings + correct is in range.
        const clean = qs.map(q => ({
          prompt: String(q.prompt || ''),
          options: (q.options || []).slice(0, 4).map(o => String(o || '')),
          correct: Math.min(3, Math.max(0, parseInt(q.correct, 10) || 0)),
          why: q.why ? String(q.why) : '',
        }));
        return { seed, questions: clean };
      } catch (e) {
        lastErr = e;
      }
    }
    throw lastErr || new Error('Quiz generation failed after retries.');
  }

  function randomSeed() {
    return Math.random().toString(16).slice(2, 6) + '-' + Math.random().toString(16).slice(2, 6);
  }

  // Render a generated quiz inside `container`. Calls `onDone({score, total, passed})`
  // when the user finishes. Replays answered state if the questions array is
  // already scored (read-only review).
  function render(container, modeMeta, questions, onDone) {
    let idx = 0;
    let correct = 0;
    let answered = false;
    const currentObjId = (window.stratState && window.stratState.getCurrentObj && window.stratState.getCurrentObj()) || '1.1';

    function paint() {
      const q = questions[idx];
      container.innerHTML = `
        <div class="qmeta">
          <span>${modeMeta.label} · Q${idx + 1}/${questions.length} · <span class="qscope">● scope: ${currentObjId} only</span></span>
          <span class="qpct">${Math.round((idx / questions.length) * 100)}%</span>
        </div>
        <p class="qprompt"></p>
        <div class="qoptions"></div>
        <div class="qfeedback" hidden></div>
        <div class="qrow">
          <button class="btn btn-ghost qprev" type="button" ${idx === 0 ? 'disabled' : ''}>Prev</button>
          <button class="btn btn-primary qnext" type="button" disabled>Next</button>
        </div>
      `;
      container.querySelector('.qprompt').textContent = q.prompt;
      const opts = container.querySelector('.qoptions');
      q.options.forEach((opt, i) => {
        const b = document.createElement('button');
        b.className = 'quiz-option';
        b.type = 'button';
        b.innerHTML =
          '<span class="option-letter">' + String.fromCharCode(97 + i) + '</span>' +
          escapeHTML(opt);
        b.addEventListener('click', () => choose(i, b));
        opts.appendChild(b);
      });
      container.querySelector('.qprev').addEventListener('click', () => {
        if (idx > 0) { idx--; paint(); }
      });
      container.querySelector('.qnext').addEventListener('click', () => {
        idx++;
        if (idx >= questions.length) finish();
        else paint();
      });
      answered = false;
    }

    function choose(i, btn) {
      if (answered) return;
      answered = true;
      const q = questions[idx];
      const all = container.querySelectorAll('.quiz-option');
      all.forEach(b => b.setAttribute('disabled', 'disabled'));
      if (i === q.correct) {
        btn.classList.add('correct');
        correct++;
      } else {
        btn.classList.add('wrong');
        all[q.correct] && all[q.correct].classList.add('correct');
      }
      const fb = container.querySelector('.qfeedback');
      fb.hidden = false;
      fb.textContent = q.why
        ? (i === q.correct ? '✓ ' : '✗ ') + q.why
        : (i === q.correct ? '✓ correct' : '✗ correct answer was ' + String.fromCharCode(97 + q.correct));
      const next = container.querySelector('.qnext');
      next.removeAttribute('disabled');
      next.textContent = idx === questions.length - 1 ? 'Finish' : 'Next';
    }

    function finish() {
      const total = questions.length;
      const score = correct;
      const passed = score / total >= window.stratState.PASS_THRESHOLD;
      container.innerHTML = `
        <div class="qmeta"><span>${modeMeta.label} · result</span><span>${score}/${total}</span></div>
        <p class="qprompt">${passed ? '✓ Passed.' : '✗ Not yet — pass at 80%+.'}</p>
        <p class="qfeedback" style="display:block">${passed
          ? 'Mode marked done. Pick another mode pill to drill the next one.'
          : 'Try this mode again — Gemini will regenerate with a fresh seed.'}</p>
      `;
      onDone && onDone({ score, total, passed });
    }

    paint();
  }

  function escapeHTML(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));
  }

  window.stratQuiz = {
    getModeMeta,
    generate,
    render,
  };
})();
