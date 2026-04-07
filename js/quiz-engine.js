/**
 * CCNA Adaptive Quiz Engine
 * Attaches to window.quizEngine for use without ES modules (file:// compatible).
 * Depends on window.store being loaded first.
 */
(function () {
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function selectQuestions(allQuestions, domains, options = {}) {
    const { mode = 'weak', count = 20, domainId = null } = options;
    let pool = [...allQuestions];

    if (mode === 'domain' && domainId) pool = pool.filter(q => q.domain === domainId);
    if (mode === 'exam') return selectExamQuestions(pool, domains, 102);
    if (mode === 'random') return shuffle(pool).slice(0, Math.min(count, pool.length));

    const proficiency = store.getAllProficiency();
    const history = store.getQuizHistory();
    const recentTopics = getRecentTopics(history);

    const scored = pool.map(q => {
      const prof = proficiency[q.topic] ?? 0.5;
      const profWeight = Math.pow(1 - prof, 2) * 3 + 0.1;
      const recencyBoost = recentTopics.has(q.topic) ? 1 : 1.5;
      const jitter = 0.8 + Math.random() * 0.4;
      return { question: q, weight: profWeight * recencyBoost * jitter };
    });

    scored.sort((a, b) => b.weight - a.weight);
    return shuffle(scored.slice(0, Math.min(count, scored.length)).map(s => s.question));
  }

  function selectExamQuestions(pool, domains, total) {
    const selected = [];
    for (const domain of domains) {
      const dq = pool.filter(q => q.domain === domain.id);
      selected.push(...shuffle(dq).slice(0, Math.round((domain.weight / 100) * total)));
    }
    if (selected.length < total) {
      const ids = new Set(selected.map(q => q.id));
      selected.push(...shuffle(pool.filter(q => !ids.has(q.id))).slice(0, total - selected.length));
    }
    return shuffle(selected.slice(0, total));
  }

  function getRecentTopics(history) {
    const recent = new Set();
    for (const s of history.slice(-2)) {
      for (const q of (s.questions || [])) recent.add(q.topicId);
    }
    return recent;
  }

  function createSession(mode) {
    return { mode, startTime: Date.now(), questions: [], currentIndex: 0, score: 0, total: 0 };
  }

  function recordAnswer(session, question, selectedAnswer, timeMs) {
    const correct = selectedAnswer === question.correct;
    session.questions.push({ id: question.id, topicId: question.topic, correct, timeMs });
    if (correct) session.score++;
    session.total++;
    session.currentIndex++;
    store.updateProficiency(question.topic, correct);
    return correct;
  }

  function finalizeSession(session) {
    const minutes = Math.round((Date.now() - session.startTime) / 60000);
    store.addQuizSession({
      date: new Date().toISOString(), mode: session.mode,
      questions: session.questions, score: session.score, total: session.total
    });
    store.updateStreak();
    if (minutes > 0) store.logStudyTime(minutes);
  }

  function getTopicAccuracy(sessionQuestions) {
    const acc = {};
    for (const q of sessionQuestions) {
      if (!acc[q.topicId]) acc[q.topicId] = { correct: 0, total: 0 };
      acc[q.topicId].total++;
      if (q.correct) acc[q.topicId].correct++;
    }
    for (const t of Object.keys(acc)) acc[t].pct = Math.round((acc[t].correct / acc[t].total) * 100);
    return acc;
  }

  function getDomainAccuracy(sessionQuestions) {
    const acc = {};
    for (const q of sessionQuestions) {
      const d = q.topicId.split('.')[0];
      if (!acc[d]) acc[d] = { correct: 0, total: 0 };
      acc[d].total++;
      if (q.correct) acc[d].correct++;
    }
    for (const d of Object.keys(acc)) acc[d].pct = Math.round((acc[d].correct / acc[d].total) * 100);
    return acc;
  }

  function getWeakestTopics(domains, n = 10) {
    const proficiency = store.getAllProficiency();
    const topics = [];
    for (const domain of domains) {
      for (const topic of domain.topics) {
        topics.push({ topicId: topic.id, name: topic.name, proficiency: proficiency[topic.id] ?? 0, domainName: domain.name });
      }
    }
    topics.sort((a, b) => a.proficiency - b.proficiency);
    return topics.slice(0, n);
  }

  function getStudyStats(domains) {
    const readiness = store.getReadinessScore(domains);
    const streak = store.getStreak();
    const time = store.getStudyTime();
    const history = store.getQuizHistory();
    const avgScore = history.length > 0
      ? Math.round(history.reduce((sum, s) => sum + (s.score / s.total) * 100, 0) / history.length) : 0;
    return { readiness, streak: streak.current, bestStreak: streak.best, totalMinutes: time.total, quizzesTaken: history.length, avgScore };
  }

  function formatTime(ms) {
    const s = Math.floor(ms / 1000);
    return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
  }

  window.quizEngine = {
    selectQuestions, createSession, recordAnswer, finalizeSession,
    getTopicAccuracy, getDomainAccuracy, getWeakestTopics, getStudyStats, formatTime, shuffle
  };
})();
