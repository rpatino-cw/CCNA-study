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
  };
  const RATING_MAP = { green: 0.75, yellow: 0.5, red: 0.2 };
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
    set(KEYS.DIAGNOSTIC, results);
    if (results && results.topicScores) {
      const proficiency = get(KEYS.PROFICIENCY) || {};
      for (const [topicId, score] of Object.entries(results.topicScores)) {
        proficiency[topicId] = score;
      }
      set(KEYS.PROFICIENCY, proficiency);
    }
  }

  function getDiagnostic() { return get(KEYS.DIAGNOSTIC); }

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
    get, set, getProficiency, updateProficiency, getAllProficiency, initProficiency,
    addQuizSession, getQuizHistory, updateStreak, getStreak,
    logStudyTime, getStudyTime, saveDiagnostic, getDiagnostic,
    getReadinessScore, exportAll, importAll, clearAll,
    getTopicStudy, getTopicStudyEntry, recordTopicStudy,
    getUnstudiedTopics, getTopicsStudiedToday,
  };
})();
