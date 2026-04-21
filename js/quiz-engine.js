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

    // ── Adaptive weak-first selection ──
    const proficiency = store.getAllProficiency();
    const micro = store.getMicroWeaknesses();
    const history = store.getQuizHistory();
    const recentTopics = getRecentTopics(history);

    // Find weak topics (below 70%) — weak mode only draws from these
    const weakTopicIds = new Set();
    for (const domain of domains) {
      for (const topic of domain.topics) {
        if ((proficiency[topic.id] ?? 0) < 0.7) weakTopicIds.add(topic.id);
      }
    }

    // Filter pool to weak topics only (unless all are mastered)
    if (mode === 'weak' && weakTopicIds.size > 0) {
      const weakPool = pool.filter(q => weakTopicIds.has(q.topic));
      if (weakPool.length >= 5) pool = weakPool;
    }

    const scored = pool.map(q => {
      const prof = proficiency[q.topic] ?? 0.5;
      // Base weight: weaker topics get much higher weight
      const profWeight = Math.pow(1 - prof, 2) * 3 + 0.1;
      // Recency: avoid repeating topics from last 2 sessions
      const recencyBoost = recentTopics.has(q.topic) ? 1 : 1.5;
      // Micro-weakness boost: if user has gotten questions with this
      // subtopic tag wrong, weight them higher
      let microBoost = 1;
      if (q.subtopic) {
        const mKey = q.topic + '::' + q.subtopic;
        const mData = micro[mKey];
        if (mData && mData.total >= 2) {
          const mPct = mData.correct / mData.total;
          if (mPct < 0.5) microBoost = 2.0;       // very weak micro-area
          else if (mPct < 0.7) microBoost = 1.4;   // struggling
        }
      }
      const jitter = 0.8 + Math.random() * 0.4;
      return { question: q, weight: profWeight * recencyBoost * microBoost * jitter };
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
    // Track micro-weakness — uses subtopic tag if present, falls back to topic
    store.recordMicroWeakness(question.topic, question.subtopic || null, correct);
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

    // Per-topic attempt log — feeds the "Repeat Quiz Pass" mastery gate.
    // Only topics with a meaningful sample in this session count (anti-gaming).
    if (typeof store.recordTopicStudy === 'function') {
      const M = window.MASTERY || { quizPct: 0.90, minQuestionsPerTopic: 5 };
      const minQ = M.minQuestionsPerTopic || 5;
      const threshold = (M.quizPct || 0.90) * 100;
      const acc = getTopicAccuracy(session.questions);
      for (const topicId of Object.keys(acc)) {
        const { total, pct } = acc[topicId];
        if (total < minQ) continue;
        store.recordTopicStudy(topicId, pct >= threshold, pct);
      }
    }
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
