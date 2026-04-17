/**
 * Shared post-lab quiz engine for PT labs (pt0-pt9).
 *
 * Replaces ~130 lines of near-duplicate inline quiz JS in every lab.
 *
 * Usage in each lab HTML:
 *   <div class="quiz-wrap" id="quiz-wrap"
 *        data-quiz-sample="7"                          (default 7)
 *        data-quiz-primary-topic="3.4"                 (optional — for store.recordTopicStudy)
 *        data-quiz-session-topic="3.4"                 (default: primary-topic)
 *        data-quiz-study-minutes="60"                  (default 45)
 *        data-quiz-verdict-pass="✓ Passed — lab logged" (default)
 *        data-quiz-verdict-fail="✗ Not yet — review and retry" (default)
 *        data-quiz-perfect-msg="Perfect score — this topic is solid." (default)
 *        data-quiz-update-all-topics="true"            (optional — capstone: update every topic in labCompleteBox)
 *   >
 *     ...standard quiz-wrap markup (start panel / active / result panel)...
 *   </div>
 *
 *   <script type="application/json" id="lab-quiz-data">
 *     [ { "question": "...", "options": [...], "correct": 2, "explanation": "..." }, ... ]
 *   </script>
 *
 *   <script defer src="../js/store.js"></script>
 *   <script defer src="../js/lab-quiz.js"></script>
 *
 * Exposes as globals (used by inline onclick handlers in the shared markup):
 *   startLabQuiz, resetQuiz, selectAnswer, nextQuestion
 */
(function () {
  var PASS_THRESHOLD = 0.80;
  var LETTERS = ['A', 'B', 'C', 'D'];

  var QUESTIONS = [];
  var CONFIG = {};
  var currentQ = 0;
  var answers = [];
  var quizQuestions = [];

  function readConfig() {
    var wrap = document.getElementById('quiz-wrap');
    if (!wrap) return null;

    var dataScript = document.getElementById('lab-quiz-data');
    if (!dataScript) return null;

    try {
      QUESTIONS = JSON.parse(dataScript.textContent);
    } catch (e) {
      console.error('lab-quiz: failed to parse #lab-quiz-data JSON', e);
      return null;
    }

    var box = document.getElementById('labCompleteBox');
    var allTopics = (box && box.getAttribute('data-lab-topics') || '')
      .split(',').map(function (t) { return t.trim(); }).filter(Boolean);

    CONFIG = {
      sample: parseInt(wrap.getAttribute('data-quiz-sample') || '7', 10),
      primaryTopic: wrap.getAttribute('data-quiz-primary-topic') || '',
      sessionTopic: wrap.getAttribute('data-quiz-session-topic') || '',
      studyMinutes: parseInt(wrap.getAttribute('data-quiz-study-minutes') || '45', 10),
      verdictPass: wrap.getAttribute('data-quiz-verdict-pass') || '\u2713 Passed \u2014 lab logged',
      verdictFail: wrap.getAttribute('data-quiz-verdict-fail') || '\u2717 Not yet \u2014 review and retry',
      perfectMsg: wrap.getAttribute('data-quiz-perfect-msg') || 'Perfect score \u2014 this topic is solid.',
      updateAllTopics: wrap.getAttribute('data-quiz-update-all-topics') === 'true',
      allTopics: allTopics,
    };
    if (!CONFIG.sessionTopic) CONFIG.sessionTopic = CONFIG.primaryTopic;

    return true;
  }

  function init() {
    if (!readConfig()) return;
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function escHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderQuestion() {
    var q = quizQuestions[currentQ];
    var total = quizQuestions.length;
    var pct = Math.round((currentQ / total) * 100);

    document.getElementById('q-progress-fill').style.width = pct + '%';
    document.getElementById('q-progress-text').textContent = (currentQ + 1) + ' / ' + total;

    var qContent = document.getElementById('quiz-content');
    qContent.innerHTML =
      '<div class="quiz-question-num">Question ' + (currentQ + 1) + ' of ' + total + '</div>' +
      '<div class="quiz-question-text">' + escHtml(q.question) + '</div>' +
      '<div class="quiz-options" id="options-wrap">' +
        q.options.map(function (opt, i) {
          return '<button class="quiz-option" data-idx="' + i + '" onclick="selectAnswer(' + i + ')">' +
            '<span class="option-letter">' + LETTERS[i] + '</span>' +
            '<span>' + escHtml(opt) + '</span>' +
          '</button>';
        }).join('') +
      '</div>' +
      '<div class="quiz-explanation" id="explanation"></div>' +
      '<button class="btn-next-q" id="btn-next" onclick="nextQuestion()">' +
        (currentQ < total - 1 ? 'Next question \u2192' : 'See results \u2192') +
      '</button>';
  }

  function showResult() {
    var total = answers.length;
    var correct = answers.filter(function (a) { return a.correct; }).length;
    var pct = Math.round((correct / total) * 100);
    var passed = pct >= PASS_THRESHOLD * 100;

    if (window.store) {
      if (CONFIG.primaryTopic && typeof store.recordTopicStudy === 'function') {
        store.recordTopicStudy(CONFIG.primaryTopic, passed, pct);
      }
      if (typeof store.updateStreak === 'function') store.updateStreak();
      if (typeof store.logStudyTime === 'function') store.logStudyTime(CONFIG.studyMinutes);
      if (typeof store.addQuizSession === 'function') {
        store.addQuizSession({
          date: new Date().toISOString(),
          topic: CONFIG.sessionTopic || 'lab',
          score: pct,
          passed: passed,
          total: total,
          correct: correct,
        });
      }
      if (typeof store.updateProficiency === 'function') {
        if (CONFIG.updateAllTopics && CONFIG.allTopics.length) {
          CONFIG.allTopics.forEach(function (t) { store.updateProficiency(t, passed); });
        } else if (CONFIG.primaryTopic) {
          store.updateProficiency(CONFIG.primaryTopic, passed);
        }
      }
    }

    document.getElementById('quiz-active').style.display = 'none';
    document.getElementById('result-panel').classList.add('show');

    var scoreColor = passed
      ? 'var(--prof-strong)'
      : pct >= 40 ? 'var(--prof-mid)' : 'var(--prof-weak)';
    var scoreEl = document.getElementById('score-num');
    scoreEl.style.color = scoreColor;

    document.getElementById('score-label').textContent = correct + ' / ' + total + ' correct';
    var verdictEl = document.getElementById('result-verdict');
    verdictEl.textContent = passed ? CONFIG.verdictPass : CONFIG.verdictFail;
    verdictEl.className = 'result-verdict ' + (passed ? 'pass' : 'fail');

    var wrongAnswers = answers.filter(function (a) { return !a.correct; });
    var reviewHtml;
    if (wrongAnswers.length > 0) {
      reviewHtml = '<div style="margin-bottom:var(--s-xl)">' +
        '<div style="font-family:var(--font-display);font-size:0.78rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:var(--s-md)">Review incorrect answers</div>' +
        wrongAnswers.map(function (a) {
          return '<div class="result-wrong-item">' +
            '<div class="q-text">' + escHtml(a.q.question) + '</div>' +
            '<div class="a-detail">' +
              'Your answer: <span style="color:var(--wrong,#ef4444)">' + escHtml(a.q.options[a.chosen]) + '</span><br>' +
              'Correct: <span style="color:var(--prof-strong)">' + escHtml(a.q.options[a.q.correct]) + '</span><br>' +
              '<span style="color:var(--ink-muted)">' + escHtml(a.q.explanation) + '</span>' +
            '</div>' +
          '</div>';
        }).join('') +
        '</div>';
    } else {
      reviewHtml = '<div style="text-align:center;padding:var(--s-lg);font-family:var(--font-display);font-size:0.9rem;color:var(--prof-strong);margin-bottom:var(--s-xl)">' +
        escHtml(CONFIG.perfectMsg) + '</div>';
    }
    document.getElementById('wrong-review').innerHTML = reviewHtml;

    requestAnimationFrame(function () {
      var target = pct;
      var duration = 650;
      var start = performance.now();
      function tick(now) {
        var elapsed = now - start;
        var progress = Math.min(elapsed / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        scoreEl.textContent = Math.round(eased * target) + '%';
        if (progress < 1) requestAnimationFrame(tick);
      }
      scoreEl.textContent = '0%';
      requestAnimationFrame(tick);
    });
  }

  window.startLabQuiz = function () {
    if (!QUESTIONS.length) return;
    var sample = Math.min(CONFIG.sample, QUESTIONS.length);
    quizQuestions = shuffle(QUESTIONS).slice(0, sample);
    currentQ = 0;
    answers = [];
    document.getElementById('quiz-start').style.display = 'none';
    document.getElementById('quiz-active').style.display = 'block';
    document.getElementById('result-panel').classList.remove('show');
    renderQuestion();
  };

  window.resetQuiz = function () {
    document.getElementById('quiz-start').style.display = 'block';
    document.getElementById('quiz-active').style.display = 'none';
    document.getElementById('result-panel').classList.remove('show');
  };

  window.selectAnswer = function (idx) {
    var q = quizQuestions[currentQ];
    var isCorrect = idx === q.correct;
    answers.push({ q: q, chosen: idx, correct: isCorrect });

    var options = document.querySelectorAll('.quiz-option');
    options.forEach(function (el, i) {
      el.classList.add('answered');
      el.style.cursor = 'default';
      el.onclick = null;
      if (i === q.correct) {
        el.classList.add('correct');
        setTimeout(function () { el.classList.add('flash-correct'); }, 30);
      } else if (i === idx && !isCorrect) {
        el.classList.add('wrong');
        setTimeout(function () { el.classList.add('shake-wrong'); }, 30);
      }
    });

    var explEl = document.getElementById('explanation');
    explEl.classList.add('show');
    explEl.innerHTML = '<strong>' + (isCorrect ? 'Correct.' : 'Incorrect.') + '</strong> ' + escHtml(q.explanation);
    document.getElementById('btn-next').classList.add('show');
  };

  window.nextQuestion = function () {
    currentQ++;
    if (currentQ >= quizQuestions.length) {
      showResult();
    } else {
      renderQuestion();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
