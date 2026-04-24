/**
 * fsrs.js — minimal FSRS-4 scheduler for spaced recall
 * Attaches to window.fsrs. File:// compatible, no deps.
 *
 * Reference: github.com/open-spaced-repetition/fsrs4anki (MIT)
 * Ratings: 1=Again, 2=Hard, 3=Good, 4=Easy
 *
 * API:
 *   fsrs.init(rating) → { stability, difficulty, reps, lapses, due, lastReview }
 *   fsrs.next(card, rating, now?) → updated card (stability/difficulty/due/...)
 *   fsrs.retrievability(card, now?) → 0..1 current retention estimate
 *   fsrs.ratingFromPct(pct) → 1..4 derived from quiz % score
 */
(function () {
  // FSRS-4 default weights (Anki reference, 17-param)
  var W = [0.4, 0.6, 2.4, 5.8, 4.93, 0.94, 0.86, 0.01, 1.49, 0.14,
           0.94, 2.18, 0.05, 0.34, 1.26, 0.29, 2.61];
  var REQUEST_RETENTION = 0.9;     // target retention
  var MAX_INTERVAL_DAYS = 365 * 2; // cap scheduling horizon
  var DECAY = -0.5;                // power-law forgetting curve exponent
  var FACTOR = Math.pow(0.9, 1 / DECAY) - 1; // derived from requested retention

  var MS_PER_DAY = 86400000;

  function clamp(x, lo, hi) { return Math.max(lo, Math.min(hi, x)); }

  function initDifficulty(rating) {
    // D_0 = w4 - (rating - 3) * w5
    return clamp(W[4] - (rating - 3) * W[5], 1, 10);
  }

  function initStability(rating) {
    // one of 4 initial stabilities by rating
    return Math.max(W[rating - 1], 0.1);
  }

  function nextDifficulty(D, rating) {
    var d = D - W[6] * (rating - 3);
    // mean-revert toward w4 using w7
    d = W[7] * W[4] + (1 - W[7]) * d;
    return clamp(d, 1, 10);
  }

  function retrievability(S, elapsedDays) {
    if (elapsedDays <= 0 || S <= 0) return 1;
    return Math.pow(1 + FACTOR * elapsedDays / S, DECAY);
  }

  function nextRecallStability(D, S, R, rating) {
    var hardPenalty = rating === 2 ? W[15] : 1;
    var easyBonus = rating === 4 ? W[16] : 1;
    return S * (1 + Math.exp(W[8]) * (11 - D) * Math.pow(S, -W[9])
                * (Math.exp(W[10] * (1 - R)) - 1) * hardPenalty * easyBonus);
  }

  function nextForgetStability(D, S, R) {
    return W[11] * Math.pow(D, -W[12]) * (Math.pow(S + 1, W[13]) - 1) * Math.exp(W[14] * (1 - R));
  }

  function scheduleDays(S) {
    var days = (S / FACTOR) * (Math.pow(REQUEST_RETENTION, 1 / DECAY) - 1);
    return clamp(Math.round(days), 1, MAX_INTERVAL_DAYS);
  }

  function init(rating, now) {
    now = (typeof now === 'number') ? now : Date.now();
    var S = initStability(rating);
    var D = initDifficulty(rating);
    var days = scheduleDays(S);
    return {
      stability: S,
      difficulty: D,
      reps: 1,
      lapses: rating === 1 ? 1 : 0,
      lastReview: now,
      due: now + days * MS_PER_DAY,
    };
  }

  function next(card, rating, now) {
    now = (typeof now === 'number') ? now : Date.now();
    if (!card || typeof card.lastReview !== 'number') return init(rating, now);
    var elapsed = Math.max(0, (now - card.lastReview) / MS_PER_DAY);
    var R = retrievability(card.stability, elapsed);
    var D2 = nextDifficulty(card.difficulty, rating);
    var S2 = rating === 1
      ? nextForgetStability(card.difficulty, card.stability, R)
      : nextRecallStability(card.difficulty, card.stability, R, rating);
    S2 = Math.max(S2, 0.1);
    var days = scheduleDays(S2);
    return {
      stability: S2,
      difficulty: D2,
      reps: (card.reps || 0) + 1,
      lapses: (card.lapses || 0) + (rating === 1 ? 1 : 0),
      lastReview: now,
      due: now + days * MS_PER_DAY,
    };
  }

  function ratingFromPct(pct) {
    if (pct < 0.6) return 1;   // Again
    if (pct < 0.8) return 2;   // Hard
    if (pct < 0.95) return 3;  // Good
    return 4;                  // Easy
  }

  function currentRetrievability(card, now) {
    if (!card || typeof card.lastReview !== 'number') return 0;
    now = (typeof now === 'number') ? now : Date.now();
    var elapsed = (now - card.lastReview) / MS_PER_DAY;
    return retrievability(card.stability, elapsed);
  }

  window.fsrs = {
    init: init,
    next: next,
    retrievability: currentRetrievability,
    ratingFromPct: ratingFromPct,
    _weights: W,
    _requestRetention: REQUEST_RETENTION,
  };
})();
