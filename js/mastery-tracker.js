/**
 * mastery-tracker.js — Shared mastery tracker component
 * Used by core.html (CCNA) and netplus.html (Net+)
 *
 * Requires: window.MASTERY from js/mastery-config.js (loaded before this file).
 * Requires: a global `masteryConfig` object set before this script loads:
 *   masteryConfig.labKey     — localStorage key for lab scores (e.g. 'ccna_minilab_scores')
 *   masteryConfig.quizBase   — base URL for quiz (e.g. 'quiz.html?learn=')
 *   masteryConfig.labBase    — base URL for mini lab (e.g. 'mini-lab.html?topic=')
 *   masteryConfig.studyKey   — localStorage key for topic-study log (e.g. 'ccna_topic_study')
 *   masteryConfig.accent     — CSS color for links (e.g. 'var(--accent)')
 */
(function () {
  var cfg = window.masteryConfig || {};
  var labKey = cfg.labKey || 'ccna_minilab_scores';
  var studyKey = cfg.studyKey || 'ccna_topic_study';
  var quizBase = cfg.quizBase || 'quiz.html?learn=';
  var labBase = cfg.labBase || 'mini-lab.html?topic=';
  var accent = cfg.accent || 'var(--accent)';

  var M = window.MASTERY || { quizPct: 0.90, labPct: 90, minPasses: 2 };

  // Learning mode shifts thresholds and vocabulary.
  // 'free'    — existing: quiz 90%, lab 90% (strict gates).
  // 'mastery' — Sophia/Khan-style: quiz 80%, lab 80% (retakes are expected).
  function currentMode() {
    try {
      if (window.store && window.store.getLearningMode) return window.store.getLearningMode();
    } catch (e) {}
    return 'free';
  }
  function thresholds() {
    var mode = currentMode();
    if (mode === 'mastery') return { quizPct: 0.80, labPct: 80, minPasses: 2 };
    return { quizPct: M.quizPct, labPct: M.labPct, minPasses: M.minPasses };
  }
  function labels() {
    var mode = currentMode();
    if (mode === 'mastery') {
      return { header:'Gate progress', studyQuiz:'Challenge', miniLab:'Lab Check', repeatPass:'Challenge passes' };
    }
    return { header:'What counts toward mastery', studyQuiz:'Study &amp; Quiz', miniLab:'Mini Lab', repeatPass:'Repeat Quiz Pass' };
  }

  // Load lab scores once — available globally
  window.mtLabScores = {};
  try { window.mtLabScores = JSON.parse(localStorage.getItem(labKey) || '{}'); } catch (e) {}

  function getPassCount(topicId) {
    try {
      var all = JSON.parse(localStorage.getItem(studyKey) || '{}');
      return (all[topicId] || {}).passCount || 0;
    } catch (e) { return 0; }
  }

  /**
   * Build the mastery tracker HTML for a topic.
   * @param {string} topicId — e.g. '1.1'
   * @param {number} quizPct — quiz proficiency 0-100
   * @returns {string} HTML string
   */
  window.buildMasteryTracker = function (topicId, quizPct) {
    var T = thresholds();
    var L = labels();
    var QUIZ_PCT = Math.round(T.quizPct * 100);
    var LAB_PCT = T.labPct;
    var MIN_PASSES = T.minPasses;
    var p = quizPct;
    var quizPass = p >= QUIZ_PCT;
    var lab = window.mtLabScores[topicId];
    var labScore = lab ? lab.pct : 0;
    var labPass = lab && lab.pct >= LAB_PCT;
    var passCount = getPassCount(topicId);
    var passesPass = passCount >= MIN_PASSES;
    var isMastered = quizPass && labPass && passesPass;
    var done = (quizPass ? 1 : 0) + (labPass ? 1 : 0) + (passesPass ? 1 : 0);

    var statusColor = isMastered
      ? 'var(--prof-strong)'
      : done >= 2 ? 'var(--prof-mid)' : 'var(--prof-weak)';
    var statusText = isMastered ? 'Mastered' : done + '/3';

    var h = '<div class="mastery-tracker">';
    h += '<div class="mt-head"><span class="mt-title">' + L.header + '</span><span class="mt-status" style="color:' + statusColor + '">' + statusText + '</span></div>';
    h += '<div class="mt-body">';

    // Requirement 1: Quiz proficiency
    h += '<div class="mt-req">';
    h += '<span class="mt-check ' + (quizPass ? 'done' : 'pending') + '">' + (quizPass ? '&#10003;' : '') + '</span>';
    h += '<div class="mt-detail">';
    h += '<div class="mt-label"><a href="' + quizBase + topicId + '" style="color:' + accent + '">' + L.studyQuiz + '</a> <span style="font-family:var(--font-mono);font-size:.72rem;color:' + (quizPass ? 'var(--prof-strong)' : 'var(--prof-weak)') + '">' + p + '%</span></div>';
    h += '<div class="mt-sub">' + (quizPass ? 'Passed — proficiency is above ' + QUIZ_PCT + '%' : 'Score ' + QUIZ_PCT + '%+ on quiz questions for this topic') + '</div>';
    h += '<div class="mt-bar"><div class="mt-bar-fill" style="width:' + Math.min(p, 100) + '%;background:' + (quizPass ? 'var(--prof-strong)' : 'var(--prof-weak)') + '"></div></div>';
    h += '</div></div>';

    // Requirement 2: Mini Lab
    h += '<div class="mt-req">';
    h += '<span class="mt-check ' + (labPass ? 'done' : 'pending') + '">' + (labPass ? '&#10003;' : '') + '</span>';
    h += '<div class="mt-detail">';
    h += '<div class="mt-label"><a href="' + labBase + topicId + '" style="color:' + accent + '">' + L.miniLab + '</a> <span style="font-family:var(--font-mono);font-size:.72rem;color:' + (labPass ? 'var(--prof-strong)' : 'var(--prof-weak)') + '">' + (lab ? labScore + '%' : (currentMode() === 'mastery' ? 'Ready to attempt' : 'Not attempted')) + '</span></div>';
    h += '<div class="mt-sub">' + (labPass ? 'Passed — hands-on lab complete' : 'Complete the interactive lab with ' + LAB_PCT + '%+ to prove hands-on skill') + '</div>';
    if (lab) { h += '<div class="mt-bar"><div class="mt-bar-fill" style="width:' + Math.min(labScore, 100) + '%;background:' + (labPass ? 'var(--prof-strong)' : 'var(--prof-weak)') + '"></div></div>'; }
    h += '</div></div>';

    // Requirement 3: Quiz passed on multiple separate sessions
    h += '<div class="mt-req">';
    h += '<span class="mt-check ' + (passesPass ? 'done' : 'pending') + '">' + (passesPass ? '&#10003;' : '') + '</span>';
    h += '<div class="mt-detail">';
    h += '<div class="mt-label">' + L.repeatPass + ' <span style="font-family:var(--font-mono);font-size:.72rem;color:' + (passesPass ? 'var(--prof-strong)' : 'var(--prof-weak)') + '">' + (passCount === 0 && currentMode() === 'mastery' ? 'Ready to attempt' : passCount + '/' + MIN_PASSES) + '</span></div>';
    h += '<div class="mt-sub">' + (passesPass ? 'Consistent — passed on ' + passCount + ' separate sessions' : (currentMode() === 'mastery' ? 'Pass the Challenge (' + QUIZ_PCT + '%+) on ' + MIN_PASSES + ' separate sessions, at least 24h apart' : 'Pass the quiz (' + QUIZ_PCT + '%+, ' + M.minQuestionsPerTopic + '+ questions) on ' + MIN_PASSES + ' separate sessions — kills lucky streaks')) + '</div>';
    h += '<div class="mt-bar"><div class="mt-bar-fill" style="width:' + Math.min(Math.round(passCount / MIN_PASSES * 100), 100) + '%;background:' + (passesPass ? 'var(--prof-strong)' : 'var(--prof-weak)') + '"></div></div>';
    h += '</div></div>';

    h += '</div>'; // mt-body

    // Touchstone (mastery mode only) — user-attested "I built/configured it"
    if (currentMode() === 'mastery') {
      var ts = false;
      try {
        if (window.store && window.store.getMasteryState) {
          var mstate = window.store.getMasteryState(topicId);
          ts = !!(mstate && mstate.touchstone);
        }
      } catch (e) {}
      h += '<div class="touchstone-row' + (ts ? ' checked' : '') + '">'
         + '<input type="checkbox" id="ts-' + topicId + '"' + (ts ? ' checked' : '')
         + ' onchange="window.toggleTouchstone(\'' + topicId + '\', this.checked)">'
         + '<label for="ts-' + topicId + '">Touchstone — I\'ve configured this on real gear (or in Packet Tracer)</label>'
         + '<span class="ts-note">optional</span>'
         + '</div>';
    }

    // Hint
    if (isMastered) {
      h += '<div class="mt-hint" style="color:var(--prof-strong)">All three requirements met. This objective is <strong>mastered</strong>.</div>';
    } else {
      var missing = [];
      if (!quizPass) missing.push(L.studyQuiz + ' (' + QUIZ_PCT + '%+)');
      if (!labPass) missing.push(L.miniLab + ' (' + LAB_PCT + '%+)');
      if (!passesPass) missing.push(L.repeatPass + ' (' + passCount + '/' + MIN_PASSES + ')');
      var hint = missing.length === 1
        ? 'Almost there — complete <strong>' + missing[0] + '</strong> to master this objective.'
        : 'Complete <strong>' + missing.join('</strong>, <strong>') + '</strong> to master this objective.';
      h += '<div class="mt-hint">' + hint + '</div>';
    }
    h += '</div>'; // mastery-tracker
    return h;
  };

  /**
   * Check if a topic is mastered (quiz proficiency + lab + repeat-pass).
   * @param {string} topicId
   * @param {number} quizScore — 0.0 to 1.0
   * @returns {boolean}
   */
  window.isMtMastered = function (topicId, quizScore) {
    var T = thresholds();
    var lab = window.mtLabScores[topicId];
    return !!(quizScore >= T.quizPct
        && lab && lab.pct >= T.labPct
        && getPassCount(topicId) >= T.minPasses);
  };

  /**
   * Build the lab shortcut button HTML.
   * @param {string} topicId
   * @returns {string} HTML for the shortcut button
   */
  window.buildLabButton = function (topicId) {
    var T = thresholds();
    var L = labels();
    var lab = window.mtLabScores[topicId];
    var labDone = lab && lab.pct >= T.labPct;
    if (labDone) {
      return '<a class="obj-sc" href="' + labBase + topicId + '" style="background:var(--prof-strong);color:#fff;border-color:var(--prof-strong)">Lab ' + lab.pct + '%</a>';
    }
    return '<a class="obj-sc" href="' + labBase + topicId + '" style="background:' + accent + ';color:#fff;border-color:' + accent + '">' + L.miniLab + (lab ? ' ' + lab.pct + '%' : '') + ' — required</a>';
  };
})();
