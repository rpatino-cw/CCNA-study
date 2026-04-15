/**
 * mastery-tracker.js — Shared mastery tracker component
 * Used by core.html (CCNA) and netplus.html (Net+)
 *
 * Requires: a global `masteryConfig` object set before this script loads:
 *   masteryConfig.labKey     — localStorage key for lab scores (e.g. 'ccna_minilab_scores')
 *   masteryConfig.quizBase   — base URL for quiz (e.g. 'quiz.html?learn=' or 'netplus-quiz.html?learn=')
 *   masteryConfig.labBase    — base URL for mini lab (e.g. 'mini-lab.html?topic=' or 'netplus-minilab.html?topic=')
 *   masteryConfig.accent     — CSS color for links (e.g. 'var(--accent)' or 'var(--np)')
 */
(function () {
  var cfg = window.masteryConfig || {};
  var labKey = cfg.labKey || 'ccna_minilab_scores';
  var quizBase = cfg.quizBase || 'quiz.html?learn=';
  var labBase = cfg.labBase || 'mini-lab.html?topic=';
  var accent = cfg.accent || 'var(--accent)';

  // Load lab scores once — available globally
  window.mtLabScores = {};
  try { window.mtLabScores = JSON.parse(localStorage.getItem(labKey) || '{}'); } catch (e) {}

  /**
   * Build the mastery tracker HTML for a topic.
   * @param {string} topicId — e.g. '1.1'
   * @param {number} quizPct — quiz proficiency 0-100
   * @returns {string} HTML string
   */
  window.buildMasteryTracker = function (topicId, quizPct) {
    var p = quizPct;
    var quizPass = p >= 70;
    var lab = window.mtLabScores[topicId];
    var labPct = lab ? lab.pct : 0;
    var labPass = lab && lab.pct >= 70;
    var isMastered = quizPass && labPass;
    var done = (quizPass ? 1 : 0) + (labPass ? 1 : 0);

    var statusColor = isMastered ? 'var(--prof-strong)' : done === 1 ? 'var(--prof-mid)' : 'var(--prof-weak)';
    var statusText = isMastered ? 'Mastered' : done + '/2';

    var h = '<div class="mastery-tracker">';
    h += '<div class="mt-head"><span class="mt-title">What counts toward mastery</span><span class="mt-status" style="color:' + statusColor + '">' + statusText + '</span></div>';
    h += '<div class="mt-body">';

    // Requirement 1: Quiz
    h += '<div class="mt-req">';
    h += '<span class="mt-check ' + (quizPass ? 'done' : 'pending') + '">' + (quizPass ? '&#10003;' : '') + '</span>';
    h += '<div class="mt-detail">';
    h += '<div class="mt-label"><a href="' + quizBase + topicId + '" style="color:' + accent + '">Study &amp; Quiz</a> <span style="font-family:var(--font-mono);font-size:.72rem;color:' + (quizPass ? 'var(--prof-strong)' : 'var(--prof-weak)') + '">' + p + '%</span></div>';
    h += '<div class="mt-sub">' + (quizPass ? 'Passed — proficiency is above 70%' : 'Score 70%+ on quiz questions for this topic') + '</div>';
    h += '<div class="mt-bar"><div class="mt-bar-fill" style="width:' + Math.min(p, 100) + '%;background:' + (quizPass ? 'var(--prof-strong)' : 'var(--prof-weak)') + '"></div></div>';
    h += '</div></div>';

    // Requirement 2: Mini Lab
    h += '<div class="mt-req">';
    h += '<span class="mt-check ' + (labPass ? 'done' : 'pending') + '">' + (labPass ? '&#10003;' : '') + '</span>';
    h += '<div class="mt-detail">';
    h += '<div class="mt-label"><a href="' + labBase + topicId + '" style="color:' + accent + '">Mini Lab</a> <span style="font-family:var(--font-mono);font-size:.72rem;color:' + (labPass ? 'var(--prof-strong)' : 'var(--prof-weak)') + '">' + (lab ? labPct + '%' : 'Not attempted') + '</span></div>';
    h += '<div class="mt-sub">' + (labPass ? 'Passed — hands-on lab complete' : 'Complete the interactive lab with 70%+ to prove hands-on skill') + '</div>';
    if (lab) { h += '<div class="mt-bar"><div class="mt-bar-fill" style="width:' + Math.min(labPct, 100) + '%;background:' + (labPass ? 'var(--prof-strong)' : 'var(--prof-weak)') + '"></div></div>'; }
    h += '</div></div>';

    h += '</div>'; // mt-body

    // Hint
    if (isMastered) {
      h += '<div class="mt-hint" style="color:var(--prof-strong)">Both requirements met. This objective is <strong>mastered</strong>.</div>';
    } else if (done === 1) {
      var missing = quizPass ? 'Mini Lab' : 'Study & Quiz';
      h += '<div class="mt-hint">Almost there — complete the <strong>' + missing + '</strong> to master this objective.</div>';
    } else {
      h += '<div class="mt-hint">Complete <strong>both</strong> the quiz (70%+) and the mini lab (70%+) to master this objective.</div>';
    }
    h += '</div>'; // mastery-tracker
    return h;
  };

  /**
   * Check if a topic is mastered (both quiz + lab passed).
   * @param {string} topicId
   * @param {number} quizScore — 0.0 to 1.0
   * @returns {boolean}
   */
  window.isMtMastered = function (topicId, quizScore) {
    var lab = window.mtLabScores[topicId];
    return quizScore >= 0.7 && lab && lab.pct >= 70;
  };

  /**
   * Build the lab shortcut button HTML.
   * @param {string} topicId
   * @returns {string} HTML for the shortcut button
   */
  window.buildLabButton = function (topicId) {
    var lab = window.mtLabScores[topicId];
    var labDone = lab && lab.pct >= 70;
    if (labDone) {
      return '<a class="obj-sc" href="' + labBase + topicId + '" style="background:var(--prof-strong);color:#fff;border-color:var(--prof-strong)">Lab ' + lab.pct + '%</a>';
    }
    return '<a class="obj-sc" href="' + labBase + topicId + '" style="background:' + accent + ';color:#fff;border-color:' + accent + '">Mini Lab' + (lab ? ' ' + lab.pct + '%' : '') + ' — required</a>';
  };
})();
