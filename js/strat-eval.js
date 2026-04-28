/**
 * strat-eval.js — eight-exchange one-on-one with a Cisco-certified examiner.
 *
 * Loop:
 *   1. Examiner asks a question on the current objective (scope-locked).
 *   2. User types an answer, presses send (or Enter — Shift+Enter inserts a newline).
 *   3. Examiner returns a JSON verdict for that exchange:
 *        { score:int(1..10), feedback:string, miss:string|null, nextQuestion:string|null,
 *          stop:bool, verdict: "PASS"|"FAIL"|"INCONCLUSIVE"|null }
 *   4. State persists every exchange.
 *   5. Stop conditions:
 *        - Three consecutive scores ≥9       → verdict PASS
 *        - Any single score ≤4               → verdict FAIL
 *        - 8 exchanges with neither hit       → verdict INCONCLUSIVE
 *   6. On a FAIL the `miss` slug (lowercase-hyphenated, matching transcript
 *      paragraph anchors) is appended to state.eval.misses for the side drawer
 *      to surface the relevant transcript paragraph in Phase 1C.
 *
 * Public API on window.stratEval:
 *   start(container, ctx) → void
 *     ctx = { objId, blueprintTitle, transcript, anchors, forbiddenTerms,
 *             onComplete(state) }
 */
(function () {
  const MAX_EXCHANGES = 8;
  const PASS_STREAK = 3;
  const PASS_SCORE = 9;
  const FAIL_SCORE = 4;

  const VERDICT_SCHEMA = {
    type: 'object',
    properties: {
      score: { type: 'integer', minimum: 1, maximum: 10 },
      feedback: { type: 'string' },
      miss: { type: 'string' },
      nextQuestion: { type: 'string' },
      stop: { type: 'boolean' },
      verdict: { type: 'string', enum: ['PASS', 'FAIL', 'INCONCLUSIVE', 'NONE'] },
    },
    required: ['score', 'feedback'],
  };

  const FIRST_SCHEMA = {
    type: 'object',
    properties: { question: { type: 'string' } },
    required: ['question'],
  };

  function buildSystemPrompt(ctx) {
    return `You are a Cisco-certified examiner conducting a CCNA 200-301 oral check on objective ${ctx.objId} (${ctx.blueprintTitle}).
You speak in plain, dry, professional English — short sentences, no hype, no encouragement theatre.
Scope-lock: ONLY ask about facts that appear in the supplied transcript. Forbidden terms (must never appear in any question, feedback, or miss slug): ${ctx.forbiddenTerms.join(', ') || '(none)'}.
Each exchange you score the candidate 1-10:
  10 = nails it with correct vocabulary and full reasoning.
  9  = correct with minor wording slip.
  7-8= mostly correct, missing one nuance.
  5-6= partially correct, mixes up details.
  ≤4 = wrong or off-topic.
The "miss" field, when score < 9, must be ONE slug from this allowed list (or "" if none fits): ${ctx.anchors.map(a => '"' + a + '"').join(', ')}.
Stop the eval and set verdict accordingly:
  - PASS once you have given three consecutive scores ≥ 9.
  - FAIL the moment you give a score ≤ 4.
  - INCONCLUSIVE if 8 exchanges complete with neither happening.
Return JSON matching the supplied schema. Set "stop": true and a non-NONE "verdict" only at termination.
Do not break character. Do not coach beyond one short sentence in "feedback".`;
  }

  function buildHistoryText(transcript, history) {
    return history.map((h, i) => `Q${i + 1} (examiner): ${h.question}\nA${i + 1} (candidate): ${h.answer}\nScore${i + 1}: ${h.score} — ${h.feedback}`).join('\n\n');
  }

  async function askFirstQuestion(ctx) {
    const sys = buildSystemPrompt(ctx);
    const user = `Transcript:
"""
${ctx.transcript}
"""

Open the eval. Return JSON: { "question": "<your first question>" }. Single-sentence question. Begin with the most important concept on the objective.`;
    const data = await window.gemini.generate(sys, user, FIRST_SCHEMA);
    const q = String((data && data.question) || '').trim();
    if (!q) throw new Error('Examiner returned no question.');
    if (!window.gemini.scopeValidate(q, ctx.forbiddenTerms)) {
      throw new Error('Examiner first question leaked scope.');
    }
    return q;
  }

  async function gradeAndContinue(ctx, history, currentQ, candidateAnswer, exchangeNum, streak) {
    const sys = buildSystemPrompt(ctx);
    const user = `Transcript:
"""
${ctx.transcript}
"""

Conversation so far:
${buildHistoryText(ctx.transcript, history) || '(none yet)'}

Current question (Q${exchangeNum}): ${currentQ}
Candidate answer (A${exchangeNum}): ${candidateAnswer}

Current consecutive ≥9 streak (before this exchange): ${streak}
Current exchange number (this one): ${exchangeNum} of ${MAX_EXCHANGES}.
Score this exchange and either ask the next question or stop. Return JSON only.`;
    const data = await window.gemini.generate(sys, user, VERDICT_SCHEMA);
    const out = {
      score: Math.min(10, Math.max(1, parseInt(data.score, 10) || 0)),
      feedback: String(data.feedback || '').trim(),
      miss: data.miss ? String(data.miss).trim() : '',
      nextQuestion: data.nextQuestion ? String(data.nextQuestion).trim() : '',
      stop: !!data.stop,
      verdict: data.verdict && data.verdict !== 'NONE' ? data.verdict : null,
    };
    // Apply our own deterministic stop logic so we don't depend on the model
    // counting reliably.
    const newStreak = out.score >= PASS_SCORE ? streak + 1 : 0;
    if (out.score <= FAIL_SCORE) { out.stop = true; out.verdict = 'FAIL'; }
    else if (newStreak >= PASS_STREAK) { out.stop = true; out.verdict = 'PASS'; }
    else if (exchangeNum >= MAX_EXCHANGES) { out.stop = true; out.verdict = out.verdict || 'INCONCLUSIVE'; }
    else { out.stop = false; out.verdict = null; }

    // Scope-validate question and feedback strings.
    const blob = [out.feedback, out.nextQuestion].join('\n');
    if (!window.gemini.scopeValidate(blob, ctx.forbiddenTerms)) {
      throw new Error('Examiner output leaked scope. Retry.');
    }
    return { out, newStreak };
  }

  function start(container, ctx) {
    container.classList.add('eval-pane');
    container.innerHTML = `
      <div class="eval-meta">
        <span>Eval · objective ${ctx.objId} · ${ctx.blueprintTitle}</span>
        <span class="eval-progress">0 / ${MAX_EXCHANGES}</span>
      </div>
      <div class="eval-thread" aria-live="polite"></div>
      <form class="eval-form" autocomplete="off">
        <textarea class="eval-input" rows="2" placeholder="type your answer · enter to send · shift-enter for newline" disabled></textarea>
        <button type="submit" class="btn btn-primary eval-send" disabled>Send</button>
      </form>
      <p class="eval-hint">Eval ends on three ≥9 in a row (PASS), any ≤4 (FAIL), or after 8 exchanges (INCONCLUSIVE).</p>
    `;
    const thread = container.querySelector('.eval-thread');
    const input = container.querySelector('.eval-input');
    const send = container.querySelector('.eval-send');
    const form = container.querySelector('.eval-form');
    const progress = container.querySelector('.eval-progress');

    let history = [];
    let currentQ = '';
    let streak = 0;
    let exchangeNum = 0;
    let busy = false;

    appendLine('system', 'Examiner is preparing the first question…');

    askFirstQuestion(ctx).then(q => {
      currentQ = q;
      replaceLastSystem('Examiner ready.');
      appendLine('examiner', q);
      input.disabled = false;
      send.disabled = false;
      input.focus();
    }).catch(err => {
      replaceLastSystem('✗ ' + (err.message || 'Failed to start eval.'));
      send.disabled = true;
    });

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (busy) return;
      const ans = input.value.trim();
      if (!ans) return;
      busy = true;
      send.disabled = true;
      input.disabled = true;
      appendLine('candidate', ans);
      input.value = '';
      exchangeNum++;
      progress.textContent = `${exchangeNum} / ${MAX_EXCHANGES}`;
      appendLine('system', 'Examiner is grading…');

      try {
        const { out, newStreak } = await gradeAndContinue(ctx, history, currentQ, ans, exchangeNum, streak);
        streak = newStreak;
        const exchange = {
          question: currentQ,
          answer: ans,
          score: out.score,
          feedback: out.feedback,
          miss: out.miss || null,
        };
        history.push(exchange);
        window.stratState.appendEvalExchange(ctx.objId, exchange);
        replaceLastSystem(`score ${out.score}/10 — ${out.feedback}`);

        if (out.stop) {
          finish(out.verdict);
          return;
        }
        currentQ = out.nextQuestion || 'continue from where the candidate left off';
        appendLine('examiner', currentQ);
        busy = false;
        input.disabled = false;
        send.disabled = false;
        input.focus();
      } catch (err) {
        replaceLastSystem('✗ ' + (err.message || 'Grading failed. Retry your answer.'));
        busy = false;
        input.disabled = false;
        send.disabled = false;
      }
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        form.requestSubmit();
      }
    });

    function finish(verdict) {
      const misses = history.filter(h => h.miss).map(h => h.miss);
      const score = history.reduce((s, h) => s + h.score, 0);
      const state = window.stratState.setEval(ctx.objId, {
        verdict,
        score,
        misses,
      });
      input.disabled = true;
      send.disabled = true;
      const verdictLabel = verdict === 'PASS' ? '✓ PASS — objective marked done.'
        : verdict === 'FAIL' ? '✗ FAIL — review the missed sections in the drawer.'
        : '· INCONCLUSIVE — 8 exchanges done without a streak. Re-run when ready.';
      appendLine('system', verdictLabel);
      ctx.onComplete && ctx.onComplete(state);
    }

    function appendLine(role, text) {
      const line = document.createElement('div');
      line.className = 'eval-line eval-' + role;
      const label = role === 'examiner' ? 'Examiner'
        : role === 'candidate' ? 'You'
        : '·';
      line.innerHTML =
        '<span class="eval-role">' + label + '</span>' +
        '<span class="eval-text"></span>';
      line.querySelector('.eval-text').textContent = text;
      thread.appendChild(line);
      thread.scrollTop = thread.scrollHeight;
    }

    function replaceLastSystem(text) {
      const sys = thread.querySelectorAll('.eval-system');
      const last = sys[sys.length - 1];
      if (last) last.querySelector('.eval-text').textContent = text;
    }
  }

  window.stratEval = { start };
})();
