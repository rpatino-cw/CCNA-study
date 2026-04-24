/**
 * store.js — localStorage abstraction layer for the CCNA Study System
 * Attaches to window.store for use without ES modules (file:// compatible).
 */
(function () {
  const PREFIX = 'ccna_';
  const KEYS = {
    PROFICIENCY: 'proficiency',
    QUIZ_HISTORY: 'quiz_history',
    STREAK: 'streak',
    STUDY_TIME: 'study_time',
    DIAGNOSTIC: 'diagnostic',
    TOPIC_STUDY: 'topic_study',
    MASTERY_STATE: 'mastery_state',
    LEARNING_MODE: 'learning_mode',
  };
  const MASTERY_STATES = {
    NOT_STARTED: 'NOT_STARTED',
    PROBED: 'PROBED',
    PRACTICING: 'PRACTICING',
    PROFICIENT: 'PROFICIENT',
    MASTERED: 'MASTERED',
  };
  const CHALLENGE_COOLDOWN_MS = 24 * 60 * 60 * 1000;
  const RATING_MAP = { green: 0.75, yellow: 0.5, red: 0.2, none: 0 };
  const EMA_ALPHA = 0.3;

  function todayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }

  function yesterdayStr() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }

  function get(key) {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw === null) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }

  function set(key, value) {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  }

  function getProficiency(topicId) {
    return (get(KEYS.PROFICIENCY) || {})[topicId] ?? 0;
  }

  function updateProficiency(topicId, wasCorrect) {
    const all = get(KEYS.PROFICIENCY) || {};
    const old = all[topicId] ?? 0;
    all[topicId] = Math.round(((1 - EMA_ALPHA) * old + EMA_ALPHA * (wasCorrect ? 1 : 0)) * 1000) / 1000;
    set(KEYS.PROFICIENCY, all);
    return all[topicId];
  }

  // Diagnostic-only update: caps proficiency contribution at 50%.
  // A perfect diagnostic score on a topic = 50% proficiency, not 100%.
  // Forces users to also quiz/lab to reach mastery.
  function updateProficiencyDiagnostic(topicId, wasCorrect) {
    const all = get(KEYS.PROFICIENCY) || {};
    const old = all[topicId] ?? 0;
    const raw = (1 - EMA_ALPHA) * old + EMA_ALPHA * (wasCorrect ? 1 : 0);
    all[topicId] = Math.round(Math.min(raw, 0.5) * 1000) / 1000;
    set(KEYS.PROFICIENCY, all);
    return all[topicId];
  }

  // Micro-weakness tracker: tracks per-subtopic accuracy
  function recordMicroWeakness(topicId, subtopicHint, wasCorrect) {
    const key = 'micro_weakness';
    const all = get(key) || {};
    const id = topicId + (subtopicHint ? '::' + subtopicHint : '');
    if (!all[id]) all[id] = { correct: 0, total: 0 };
    all[id].total++;
    if (wasCorrect) all[id].correct++;
    set(key, all);
  }

  function getMicroWeaknesses() {
    return get('micro_weakness') || {};
  }

  function getAllProficiency() {
    return get(KEYS.PROFICIENCY) || {};
  }

  function initProficiency(topicsData) {
    if (get(KEYS.PROFICIENCY) !== null) return;
    // First visit ever: seed from resumeRating defaults
    // After reset: proficiency key is gone, but we check a reset flag
    const wasReset = sessionStorage.getItem('ccna_was_reset');
    const proficiency = {};
    if (!wasReset && topicsData && Array.isArray(topicsData.domains)) {
      for (const domain of topicsData.domains) {
        if (!Array.isArray(domain.topics)) continue;
        for (const topic of domain.topics) {
          proficiency[topic.id] = RATING_MAP[(topic.resumeRating || '').toLowerCase()] ?? 0.5;
        }
      }
    }
    sessionStorage.removeItem('ccna_was_reset');
    set(KEYS.PROFICIENCY, proficiency);
  }

  function addQuizSession(session) {
    const h = get(KEYS.QUIZ_HISTORY) || [];
    h.push(session);
    set(KEYS.QUIZ_HISTORY, h);
  }

  function getQuizHistory() { return get(KEYS.QUIZ_HISTORY) || []; }

  function updateStreak() {
    const today = todayStr(), yesterday = yesterdayStr();
    const streak = get(KEYS.STREAK) || { current: 0, best: 0, lastStudyDate: null };
    if (streak.lastStudyDate === today) return streak;
    streak.current = streak.lastStudyDate === yesterday ? streak.current + 1 : 1;
    if (streak.current > streak.best) streak.best = streak.current;
    streak.lastStudyDate = today;
    set(KEYS.STREAK, streak);
    return streak;
  }

  function getStreak() { return get(KEYS.STREAK) || { current: 0, best: 0, lastStudyDate: null }; }

  function logStudyTime(minutes) {
    const today = todayStr();
    const data = get(KEYS.STUDY_TIME) || { total: 0, sessions: [] };
    const existing = data.sessions.find(s => s.date === today);
    if (existing) existing.minutes += minutes;
    else data.sessions.push({ date: today, minutes });
    data.total += minutes;
    set(KEYS.STUDY_TIME, data);
  }

  function getStudyTime() { return get(KEYS.STUDY_TIME) || { total: 0, sessions: [] }; }

  function saveDiagnostic(results) {
    // Keep history as an array (migrate from old single-object format)
    let history = get('diagnostic_history') || [];
    if (!Array.isArray(history)) history = [];

    // Also save as latest for backwards compat
    set(KEYS.DIAGNOSTIC, results);
    history.push(results);
    // Keep last 20 diagnostics max
    if (history.length > 20) history = history.slice(-20);
    set('diagnostic_history', history);

    if (results && results.topicScores) {
      const proficiency = get(KEYS.PROFICIENCY) || {};
      for (const [topicId, score] of Object.entries(results.topicScores)) {
        proficiency[topicId] = score;
      }
      set(KEYS.PROFICIENCY, proficiency);
    }
  }

  function getDiagnostic() { return get(KEYS.DIAGNOSTIC); }

  function getDiagnosticHistory() {
    let history = get('diagnostic_history') || [];
    if (!Array.isArray(history)) {
      // Migrate: old format was a single object
      const old = get(KEYS.DIAGNOSTIC);
      history = old ? [old] : [];
      set('diagnostic_history', history);
    }
    return history;
  }

  function getReadinessScore(domains) {
    if (!Array.isArray(domains) || domains.length === 0) return 0;
    const proficiency = getAllProficiency();
    let weightedSum = 0, totalWeight = 0;
    for (const domain of domains) {
      const weight = domain.weight || 0;
      totalWeight += weight;
      if (!Array.isArray(domain.topics) || domain.topics.length === 0) continue;
      let domainSum = 0;
      for (const topic of domain.topics) domainSum += proficiency[topic.id] ?? 0;
      weightedSum += (domainSum / domain.topics.length) * weight;
    }
    return totalWeight === 0 ? 0 : Math.round((weightedSum / totalWeight) * 100);
  }

  function exportAll() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(PREFIX)) data[k.slice(PREFIX.length)] = get(k.slice(PREFIX.length));
    }
    return JSON.stringify(data, null, 2);
  }

  function importAll(jsonString) {
    const data = JSON.parse(jsonString);
    for (const [key, value] of Object.entries(data)) set(key, value);
  }

  // ── Topic Study Log ────────────────────────────────────────────
  // Tracks per-topic: studyCount, passCount, lastStudied, lastScore, firstStudied

  function getTopicStudy() { return get(KEYS.TOPIC_STUDY) || {}; }

  function getTopicStudyEntry(topicId) {
    return (get(KEYS.TOPIC_STUDY) || {})[topicId] || null;
  }

  function recordTopicStudy(topicId, passed, score) {
    const all = get(KEYS.TOPIC_STUDY) || {};
    const today = todayStr();
    const existing = all[topicId] || { studyCount: 0, passCount: 0, firstStudied: today };
    all[topicId] = {
      ...existing,
      studyCount: existing.studyCount + 1,
      passCount: passed ? existing.passCount + 1 : existing.passCount,
      lastStudied: today,
      lastScore: score,
    };
    set(KEYS.TOPIC_STUDY, all);
    return all[topicId];
  }

  function getUnstudiedTopics(allTopicIds) {
    const studied = get(KEYS.TOPIC_STUDY) || {};
    return allTopicIds.filter(id => !studied[id] || studied[id].studyCount === 0);
  }

  function getTopicsStudiedToday() {
    const today = todayStr();
    const all = get(KEYS.TOPIC_STUDY) || {};
    return Object.entries(all)
      .filter(([, v]) => v.lastStudied === today)
      .map(([id]) => id);
  }

  function getDueForReview(daysThreshold) {
    daysThreshold = daysThreshold || 7;
    const prof = get(KEYS.PROFICIENCY) || {};
    const studied = get(KEYS.TOPIC_STUDY) || {};
    const now = Date.now();
    const msThreshold = daysThreshold * 86400000;
    const due = [];
    for (const [id, score] of Object.entries(prof)) {
      if (score >= 0.7) continue; // already mastered
      const entry = studied[id];
      if (!entry || !entry.lastStudied) continue; // never studied
      const lastDate = new Date(entry.lastStudied).getTime();
      if (now - lastDate >= msThreshold) {
        due.push({ id, score, daysSince: Math.floor((now - lastDate) / 86400000) });
      }
    }
    due.sort(function(a, b) { return a.score - b.score; }); // weakest first
    return due;
  }

  // ── Learning Mode ─────────────────────────────────────────────
  // 'free' (default) = current behavior; 'mastery' = Sophia/Khan/FSRS path.
  // Read-only mirror on window.LEARNING_MODE for render paths that can't
  // await store.

  function getLearningMode() {
    var m = get(KEYS.LEARNING_MODE);
    return m === 'mastery' ? 'mastery' : 'free';
  }

  function setLearningMode(mode) {
    var m = mode === 'mastery' ? 'mastery' : 'free';
    set(KEYS.LEARNING_MODE, m);
    if (typeof window !== 'undefined') window.LEARNING_MODE = m;
    return m;
  }

  // ── Mastery State Machine (only used when learning_mode === 'mastery') ──
  // Per-subobjective shape:
  //   { state, lastSeen, lastPassed, passes:[ts,...], stability, difficulty,
  //     reps, lapses, lastReview, due, lab, touchstone }

  function getAllMasteryState() {
    return get(KEYS.MASTERY_STATE) || {};
  }

  function getMasteryState(subId) {
    var all = getAllMasteryState();
    return all[subId] || { state: MASTERY_STATES.NOT_STARTED, passes: [] };
  }

  function setMasteryState(subId, patch) {
    var all = getAllMasteryState();
    var existing = all[subId] || { state: MASTERY_STATES.NOT_STARTED, passes: [] };
    all[subId] = Object.assign({}, existing, patch, { lastSeen: Date.now() });
    set(KEYS.MASTERY_STATE, all);
    return all[subId];
  }

  // Promote state forward only (never rewind via this helper; decay uses
  // its own path). Returns the resulting record.
  function promoteMasteryState(subId, targetState) {
    var order = ['NOT_STARTED','PROBED','PRACTICING','PROFICIENT','MASTERED'];
    var cur = getMasteryState(subId);
    if (order.indexOf(targetState) > order.indexOf(cur.state)) {
      return setMasteryState(subId, { state: targetState });
    }
    return setMasteryState(subId, {}); // touch lastSeen only
  }

  // Called by quiz.html after a Challenge attempt. `pct` is 0..1.
  // Records the pass, updates FSRS card, may promote to PROFICIENT or MASTERED
  // once 2 passes ≥24h apart + lab are present.
  function recordChallengePass(subId, pct) {
    var existing = getMasteryState(subId);
    var passes = Array.isArray(existing.passes) ? existing.passes.slice() : [];
    var now = Date.now();
    var passed = pct >= 0.80;
    var patch = { lastSeen: now };

    // FSRS update (only when the FSRS module is loaded)
    if (window.fsrs) {
      var rating = window.fsrs.ratingFromPct(pct);
      var card = existing.lastReview
        ? window.fsrs.next(existing, rating, now)
        : window.fsrs.init(rating, now);
      patch.stability = card.stability;
      patch.difficulty = card.difficulty;
      patch.reps = card.reps;
      patch.lapses = card.lapses;
      patch.lastReview = card.lastReview;
      patch.due = card.due;
    }

    if (passed) {
      var last = passes.length ? passes[passes.length - 1] : 0;
      var cooldownMet = now - last >= CHALLENGE_COOLDOWN_MS;
      // Only count this pass if the cooldown since the last pass has
      // elapsed, OR this is the first pass.
      if (!passes.length || cooldownMet) {
        passes.push(now);
        patch.passes = passes;
        patch.lastPassed = now;
      } else {
        patch.passes = passes;
      }
      // State promotion
      if (passes.length >= 2 && existing.lab) {
        patch.state = MASTERY_STATES.MASTERED;
      } else if (passes.length >= 1) {
        patch.state = MASTERY_STATES.PROFICIENT;
      }
    } else {
      // Failed: drop back to PRACTICING if currently higher
      if (existing.state === MASTERY_STATES.MASTERED
          || existing.state === MASTERY_STATES.PROFICIENT) {
        patch.state = MASTERY_STATES.PRACTICING;
      }
    }

    return setMasteryState(subId, patch);
  }

  // Called when mini-lab is passed in mastery mode.
  function recordLabPass(subId) {
    var existing = getMasteryState(subId);
    var patch = { lab: true };
    // If we already have 2 Challenge passes, labbing promotes to MASTERED.
    if (Array.isArray(existing.passes) && existing.passes.length >= 2) {
      patch.state = MASTERY_STATES.MASTERED;
    }
    return setMasteryState(subId, patch);
  }

  // Returns due reviews (FSRS-scheduled) sorted soonest-due first.
  // Only items that have a `due` field and state is at least PROFICIENT.
  function getMasteryDueReviews(now) {
    now = now || Date.now();
    var all = getAllMasteryState();
    var due = [];
    for (var id in all) {
      if (!Object.prototype.hasOwnProperty.call(all, id)) continue;
      var m = all[id];
      if (!m || !m.due) continue;
      if (m.state !== MASTERY_STATES.PROFICIENT && m.state !== MASTERY_STATES.MASTERED) continue;
      if (m.due <= now) due.push({ id: id, due: m.due, state: m.state });
    }
    due.sort(function (a, b) { return a.due - b.due; });
    return due;
  }

  function clearAll() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(PREFIX)) keys.push(k);
    }
    keys.forEach(k => localStorage.removeItem(k));
    // Set proficiency to empty object so initProficiency won't reseed defaults
    set(KEYS.PROFICIENCY, {});
  }

  window.store = {
    get, set, getProficiency, updateProficiency, updateProficiencyDiagnostic, getAllProficiency, initProficiency,
    recordMicroWeakness, getMicroWeaknesses,
    addQuizSession, getQuizHistory, updateStreak, getStreak,
    logStudyTime, getStudyTime, saveDiagnostic, getDiagnostic, getDiagnosticHistory,
    getReadinessScore, exportAll, importAll, clearAll,
    getTopicStudy, getTopicStudyEntry, recordTopicStudy,
    getUnstudiedTopics, getTopicsStudiedToday, getDueForReview,
    // Learning mode + mastery state machine
    getLearningMode, setLearningMode,
    getAllMasteryState, getMasteryState, setMasteryState, promoteMasteryState,
    recordChallengePass, recordLabPass, getMasteryDueReviews,
    MASTERY_STATES,
  };
  // Eagerly mirror mode onto window so render paths can branch synchronously.
  if (typeof window !== 'undefined') window.LEARNING_MODE = getLearningMode();
})();
