/**
 * strat-state.js — localStorage-backed state for the per-objective strat page.
 *
 * Schema (under localStorage key "strat"):
 *   strat[objId].modes[modeName] = { score, attempts, lastSeed, passed, questions }
 *   strat[objId].eval            = { transcript:[], score, verdict, misses:[] }
 *   strat[objId].masteryComposite= 0..100
 *   strat.currentObj             = "1.1"
 *
 * The Gemini API key lives under its own key (`ccna_strat_gemini_key`)
 * managed by gemini.js — kept separate so a state reset doesn't nuke the key.
 *
 * All writes are immediate. Reads return deep clones so callers can mutate
 * without corrupting the canonical store.
 */
(function () {
  const KEY = 'strat';
  const PASS_THRESHOLD = 0.80;
  const UNLOCK_PASSED_MODES = 3;
  const MODE_NAMES = ['terminology', 'glossary', 'scenario', 'command', 'table'];

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return {};
      const obj = JSON.parse(raw);
      return obj && typeof obj === 'object' ? obj : {};
    } catch (_) {
      return {};
    }
  }

  function save(obj) {
    try { localStorage.setItem(KEY, JSON.stringify(obj)); }
    catch (e) { console.warn('strat-state save failed:', e); }
  }

  function clone(x) { return x == null ? x : JSON.parse(JSON.stringify(x)); }

  function emptyObj() {
    const modes = {};
    MODE_NAMES.forEach(n => {
      modes[n] = { score: 0, attempts: 0, lastSeed: null, passed: false, questions: [] };
    });
    return {
      modes,
      eval: { transcript: [], score: 0, verdict: null, misses: [] },
      masteryComposite: 0,
    };
  }

  function getObjState(objId) {
    const all = load();
    const cur = all[objId];
    if (!cur) return emptyObj();
    const merged = emptyObj();
    if (cur.modes) {
      MODE_NAMES.forEach(n => {
        if (cur.modes[n]) merged.modes[n] = Object.assign(merged.modes[n], cur.modes[n]);
      });
    }
    if (cur.eval) merged.eval = Object.assign(merged.eval, cur.eval);
    if (typeof cur.masteryComposite === 'number') merged.masteryComposite = cur.masteryComposite;
    return clone(merged);
  }

  function setObjState(objId, next) {
    const all = load();
    all[objId] = next;
    save(all);
  }

  function setMode(objId, modeName, patch) {
    const cur = getObjState(objId);
    cur.modes[modeName] = Object.assign({}, cur.modes[modeName], patch);
    cur.modes[modeName].passed = (cur.modes[modeName].score || 0) >= Math.round(PASS_THRESHOLD * 10);
    cur.masteryComposite = computeComposite(cur);
    setObjState(objId, cur);
    return clone(cur);
  }

  function setEval(objId, patch) {
    const cur = getObjState(objId);
    cur.eval = Object.assign({}, cur.eval, patch);
    cur.masteryComposite = computeComposite(cur);
    setObjState(objId, cur);
    return clone(cur);
  }

  function appendEvalExchange(objId, exchange) {
    const cur = getObjState(objId);
    cur.eval.transcript = (cur.eval.transcript || []).concat([exchange]);
    setObjState(objId, cur);
    return clone(cur);
  }

  // Composite mastery score:
  //   60% from quiz-mode pass ratio (0..6 of 5 modes counted at 80%+)
  //   40% from eval verdict — PASS = 40, INCONCLUSIVE = 20, FAIL = 0
  // Expressed 0..100, rounded.
  function computeComposite(state) {
    const passedCount = MODE_NAMES.reduce(
      (n, m) => n + (state.modes[m] && state.modes[m].passed ? 1 : 0), 0,
    );
    const quizPart = (passedCount / MODE_NAMES.length) * 60;
    let evalPart = 0;
    const v = state.eval && state.eval.verdict;
    if (v === 'PASS') evalPart = 40;
    else if (v === 'INCONCLUSIVE') evalPart = 20;
    return Math.round(quizPart + evalPart);
  }

  function passedModes(objId) {
    const cur = getObjState(objId);
    return MODE_NAMES.filter(n => cur.modes[n].passed);
  }

  function evalUnlocked(objId) {
    return passedModes(objId).length >= UNLOCK_PASSED_MODES;
  }

  function setCurrentObj(objId) {
    const all = load();
    all.currentObj = objId;
    save(all);
  }

  function getCurrentObj() {
    return load().currentObj || null;
  }

  function clearObj(objId) {
    const all = load();
    delete all[objId];
    save(all);
  }

  function clearAllStrat() {
    localStorage.removeItem(KEY);
  }

  window.stratState = {
    MODE_NAMES,
    PASS_THRESHOLD,
    UNLOCK_PASSED_MODES,
    getObjState,
    setMode,
    setEval,
    appendEvalExchange,
    passedModes,
    evalUnlocked,
    setCurrentObj,
    getCurrentObj,
    clearObj,
    clearAllStrat,
    computeComposite,
  };
})();
