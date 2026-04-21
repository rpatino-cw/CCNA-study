/**
 * mastery-config.js — single source of truth for mastery thresholds.
 *
 * Bar is intentionally set ABOVE the real CCNA pass score (~82.5%) so that
 * "Mastered" in this app predicts passing with margin, not just squeaking by.
 *
 * Load BEFORE mastery-tracker.js on every page that uses the tracker.
 */
(function () {
  window.MASTERY = {
    quizPct: 0.90,              // EMA proficiency floor (0..1)
    labPct: 90,                 // mini-lab best-score floor (0..100)
    minPasses: 2,               // per-topic passCount required (anti-streak)
    minQuestionsPerTopic: 5     // min questions in a session for it to count as an attempt
  };
})();
