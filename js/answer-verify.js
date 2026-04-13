/**
 * answer-verify.js — On-demand answer verification via Gemini AI
 * Adds a "Verify Answer" button to flashcard backs.
 * Caches results in localStorage so each question is only checked once.
 */
(function() {
  var API = 'https://ccna-tutor.rpatino-cw.workers.dev';
  var CACHE_KEY = 'ccna_answer_verify_cache';
  var OVERRIDE_KEY = 'ccna_answer_overrides';

  function getCache() {
    try { return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}'); } catch(e) { return {}; }
  }
  function setCache(id, result) {
    var cache = getCache();
    cache[id] = result;
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  }

  function getOverrides() {
    try { return JSON.parse(localStorage.getItem(OVERRIDE_KEY) || '{}'); } catch(e) { return {}; }
  }
  function setOverride(id, correctedAnswer) {
    var overrides = getOverrides();
    overrides[id] = correctedAnswer;
    localStorage.setItem(OVERRIDE_KEY, JSON.stringify(overrides));
  }

  /**
   * Check if a card's answer has been overridden by the user
   */
  function getOverriddenAnswer(cardId) {
    return getOverrides()[cardId] || null;
  }

  /**
   * Verify an answer via Gemini AI
   * Returns promise resolving to { agree: bool, correctAnswer: string, explanation: string }
   */
  function verifyAnswer(cardId, question, options, listedAnswer) {
    // Check cache first
    var cached = getCache()[cardId];
    if (cached) return Promise.resolve(cached);

    var optionsText = options.map(function(o, i) {
      return String.fromCharCode(65 + i) + '. ' + o;
    }).join('\n');

    var prompt = 'You are a CCNA 200-301 exam expert. Verify this exam question\'s answer.\n\n' +
      'QUESTION: ' + question + '\n\n' +
      'OPTIONS:\n' + optionsText + '\n\n' +
      'LISTED CORRECT ANSWER: ' + listedAnswer + '\n\n' +
      'Is the listed answer correct? Respond in EXACTLY this JSON format:\n' +
      '{"agree":true/false,"correctAnswer":"X","explanation":"1-2 sentence explanation of why."}';

    return fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prompt, history: [] })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      var reply = data.reply || '';
      try {
        var jsonMatch = reply.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error('No JSON');
        var result = JSON.parse(jsonMatch[0]);
        result.verified = true;
        result.ts = new Date().toISOString();
        setCache(cardId, result);
        return result;
      } catch(e) {
        return { agree: true, correctAnswer: listedAnswer, explanation: 'Could not verify — AI response was unclear.', verified: false };
      }
    })
    .catch(function() {
      return { agree: true, correctAnswer: listedAnswer, explanation: 'Could not verify — connection error.', verified: false };
    });
  }

  /**
   * Render the verify button + result UI
   * Call this when displaying a card's back side
   * Returns HTML string
   */
  function renderVerifyButton(cardId) {
    var cached = getCache()[cardId];
    var override = getOverrides()[cardId];

    if (cached) {
      return renderVerifyResult(cardId, cached, override);
    }

    return '<div class="verify-section" id="verify-' + cardId + '">' +
      '<button class="verify-btn" onclick="window.answerVerify.check(\'' + cardId + '\')">Verify Answer with AI</button>' +
      '</div>';
  }

  function renderVerifyResult(cardId, result, override) {
    var agree = result.agree;
    var icon = agree ? '<span style="color:#16A34A">&#10003;</span>' : '<span style="color:#DC2626">&#10007;</span>';
    var status = agree ? 'AI Confirmed' : 'AI Disputes — suggests ' + result.correctAnswer;
    var cls = agree ? 'verify-confirmed' : 'verify-disputed';

    var html = '<div class="verify-section ' + cls + '" id="verify-' + cardId + '">' +
      '<div class="verify-status">' + icon + ' ' + status + '</div>' +
      '<div class="verify-explain">' + (result.explanation || '') + '</div>';

    if (!agree && !override) {
      html += '<button class="verify-override-btn" onclick="window.answerVerify.override(\'' + cardId + '\',\'' + result.correctAnswer + '\')">Accept AI\'s answer as correct</button>';
    }
    if (override) {
      html += '<div class="verify-override-note">You accepted: ' + override + ' as the correct answer</div>';
    }

    html += '</div>';
    return html;
  }

  /**
   * Trigger verification for a card (called from onclick)
   */
  function check(cardId) {
    var el = document.getElementById('verify-' + cardId);
    if (!el) return;
    el.innerHTML = '<div class="verify-loading">Checking with AI...</div>';

    // Get question data from the page
    var cardData = window._currentVerifyCard;
    if (!cardData) { el.innerHTML = '<div class="verify-status">No card data available</div>'; return; }

    verifyAnswer(cardId, cardData.question, cardData.options, cardData.correct)
      .then(function(result) {
        el.outerHTML = renderVerifyResult(cardId, result, getOverrides()[cardId]);
      });
  }

  /**
   * Override the answer for a card
   */
  function override(cardId, correctedAnswer) {
    setOverride(cardId, correctedAnswer);
    // Re-render
    var cached = getCache()[cardId];
    var el = document.getElementById('verify-' + cardId);
    if (el && cached) {
      el.outerHTML = renderVerifyResult(cardId, cached, correctedAnswer);
    }
  }

  // CSS injection
  var style = document.createElement('style');
  style.textContent =
    '.verify-section{margin-top:12px;padding:10px 14px;border-radius:8px;font-family:"Space Grotesk",system-ui,sans-serif;font-size:.78rem}' +
    '.verify-confirmed{background:rgba(22,163,74,.06);border:1px solid rgba(22,163,74,.15)}' +
    '.verify-disputed{background:rgba(220,38,38,.06);border:1px solid rgba(220,38,38,.15)}' +
    '.verify-status{font-weight:700;margin-bottom:4px}' +
    '.verify-explain{color:#57534E;line-height:1.5}' +
    '.verify-btn{font-family:"Space Grotesk",sans-serif;font-size:.75rem;padding:6px 14px;background:none;border:1px solid #E2DFD9;border-radius:6px;color:#57534E;cursor:pointer;transition:all .15s}' +
    '.verify-btn:hover{border-color:#B45309;color:#B45309}' +
    '.verify-loading{color:#B45309;font-style:italic}' +
    '.verify-override-btn{margin-top:6px;font-size:.72rem;padding:4px 10px;background:#DC2626;color:#fff;border:none;border-radius:4px;cursor:pointer}' +
    '.verify-override-note{margin-top:6px;color:#16A34A;font-weight:600;font-size:.72rem}';
  document.head.appendChild(style);

  // Expose globally
  window.answerVerify = {
    check: check,
    override: override,
    render: renderVerifyButton,
    getOverride: getOverriddenAnswer,
    verify: verifyAnswer,
    getCache: getCache
  };
})();
