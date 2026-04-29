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
      `Write 10 multiple-choice questions where the prompt is a one-line definition and the four options are candidate terms. The correct option is the term that best matches the definition. Cover ONLY concepts present in the supplied transcript. Distractor variety is mandatory: across the 10 questions, the option pool must draw from at least 12 distinct terms — do NOT repeat the same four nouns (router/switch/firewall/server) across multiple questions. Pull distractors from the full transcript noun set (hub, repeater, NIC, endpoint, autonomous AP, lightweight AP, WLC, Cisco DNA Center, IPS, IDS, NGFW, PSE, PD, collision domain, broadcast domain, half-duplex, full-duplex, MAC table, etc.). Mix difficulty: at least 3 questions must contrast two terms that are easily confused (NGFW vs traditional firewall, IPS vs IDS, autonomous vs lightweight AP, Layer 2 vs Layer 3 switch, PSE vs PD, collision vs broadcast domain).`,
    glossary:
      `Write 10 multiple-choice questions where the prompt names a concept in plain English and the four options are short descriptive phrases. The correct option is the phrase that best describes the named concept. Cover ONLY concepts present in the supplied transcript. At least 3 of the 10 questions must use a "which is INCORRECT" or "which is NOT true" stem so the test-taker must spot a false phrase among true ones. Phrases must be specific (mention layer, port count, duplex, domain behavior, or standard) — no generic "a device that connects things" filler. Vary the concept across all 10 — no repeats of the same concept.`,
    scenario:
      `Write 10 multiple-choice scenario questions. Each prompt sets up a tiny realistic situation and asks what happens, what device is needed, or what breaks. Mix scenario types across the 10: (a) packet/frame forwarding decisions, (b) "device X fails — what happens to clients", (c) "you need to do Y — which 1.1 device picks", (d) duplex/domain consequence questions, (e) PoE budget or PSE/PD negotiation outcomes, (f) AP architecture choice (autonomous vs lightweight) for a given site size, (g) NGFW vs traditional firewall capability gap. Use realistic numbers (IPs, prefix lengths, port counts, wattage) consistent with the supplied transcript. Distractors must be plausible — wrong-but-tempting, not obviously wrong.`,
    command:
      `Write 10 multiple-choice command-recall questions. Each prompt asks "which Cisco IOS command shows / configures / verifies X?" and the four options are candidate commands in mono. The correct option must match Cisco syntax. Use only commands referenced in the supplied transcript. If the transcript does not contain enough commands for 10 distinct questions, instead generate 10 questions about device-role identification commands a CCNA candidate would run (show mac address-table, show ip route, show interfaces, show power inline, show cdp neighbors, show ip arp) — but only if those commands are clearly in scope for objective 1.1 device behavior. Distractors must be syntactically plausible Cisco commands, not made-up gibberish.`,
    table:
      `Write 10 multiple-choice questions that show a single \`show\` output line in the prompt and ask the user about its meaning. Use a mix of output types: \`show ip route\` lines (e.g. "O 192.168.1.0/24 [110/2] via 10.0.0.1"), \`show mac address-table\` rows, \`show interfaces status\` rows, and \`show power inline\` rows — whichever the transcript supports. Ask about source code, administrative distance, metric, next hop, interface, MAC-to-port binding, duplex, speed, or PoE class/wattage. Each option is a candidate interpretation. Distractors must reflect common misreadings (confusing AD with metric, confusing local route with directly connected, mixing up duplex columns).`,
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
    const sysPrompt = `You are a Cisco-certified instructor writing exam-grade practice questions for CCNA 200-301 study.
Scope-lock: ONLY use facts from the supplied transcript for objective ${objId}. Do not introduce concepts from other objectives.
Forbidden terms (must not appear in any prompt, option, or explanation): ${forbiddenTerms.join(', ') || '(none)'}.

Quality bar (every batch must meet all of these):
1. Difficulty mix across the 10 questions: roughly 2 recall, 5 application, 3 analysis/comparison. No more than 2 pure recall ("what does X stand for") questions per batch.
2. Distractor variety: across the 10 questions, distractors must collectively reference at least 12 distinct nouns from the transcript. Never reuse the same 4-option set across multiple questions. If a question uses {router, switch, hub, firewall} as options, no other question in the same batch may use that same option set.
3. Plausibility: every distractor must be wrong-but-tempting — something a candidate who half-studied would pick. No filler distractors ("a banana", "the moon", or generic "none of the above"-style throwaways).
4. Specificity: stems and options must reference concrete attributes (layer number, port count, duplex, domain behavior, standard like 802.3af/at/bt, wattage, protocol like CAPWAP, role like PSE/PD) rather than vague phrasing.
5. Confusable pairs: at least 3 questions must directly contrast a confusable pair from the transcript (NGFW vs traditional firewall, IPS vs IDS, autonomous vs lightweight AP, Layer 2 vs Layer 3 switch, collision vs broadcast domain, half- vs full-duplex, PSE vs PD).

Output strict JSON matching the supplied schema. Exactly 10 questions, exactly 4 options each, "correct" is the index of the right option. Each question must include a "why" field explaining why the correct answer is right and why the closest distractor is wrong.`;
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
