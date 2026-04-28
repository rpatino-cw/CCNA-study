/**
 * surgical-reentry.js — Phase 1D eval-driven re-entry.
 *
 * Reads strat[objId].eval.misses (Phase 1A schema), renders chips into the
 * verdict block on section ⑦, jumps + highlights matching paragraphs in the
 * section ① transcript on click. Graceful when no misses or eval not run.
 *
 * Public API:
 *   window.surgicalReentry.renderChips(objId)
 *   window.surgicalReentry.jumpTo(missSlug)
 */
(function () {
  function getStrat() {
    if (window.store && typeof window.store.get === 'function') {
      const s = window.store.get('strat');
      if (s) return s;
    }
    try {
      const raw = localStorage.getItem('ccna_strat') || localStorage.getItem('strat');
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function slugToRegex(slug) {
    const parts = String(slug).split('-').filter(Boolean).map(function (p) {
      return p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    });
    if (!parts.length) return null;
    return new RegExp(parts.join('.{0,5}'), 'i');
  }

  function slugLabel(slug) {
    return String(slug).replace(/-/g, ' ');
  }

  function findHost() {
    return document.getElementById('surgical-reentry-chips');
  }

  function renderChips(objId) {
    const host = findHost();
    if (!host) return;
    host.innerHTML = '';

    const strat = getStrat();
    const misses = strat && strat[objId] && strat[objId].eval && Array.isArray(strat[objId].eval.misses)
      ? strat[objId].eval.misses
      : [];

    if (!misses.length) return;

    const label = document.createElement('span');
    label.className = 're-entry-label';
    label.textContent = 'Re-enter where you missed:';
    host.appendChild(label);

    misses.forEach(function (slug) {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 're-entry-chip';
      chip.dataset.slug = slug;
      chip.textContent = slugLabel(slug);
      chip.addEventListener('click', function () { jumpTo(slug); });
      host.appendChild(chip);
    });
  }

  function findTranscriptSection() {
    const sections = document.querySelectorAll('section.flow');
    for (let i = 0; i < sections.length; i++) {
      const num = sections[i].querySelector('.num');
      if (num && num.textContent.trim() === '①') return sections[i];
    }
    return sections[0] || null;
  }

  function clearMarks() {
    document.querySelectorAll('mark.re-entry-mark').forEach(function (m) {
      const t = document.createTextNode(m.textContent);
      m.parentNode.replaceChild(t, m);
    });
  }

  function highlightFirstMatch(root, regex) {
    if (!root || !regex) return null;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (n.parentNode && n.parentNode.tagName === 'SCRIPT') return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    let node;
    while ((node = walker.nextNode())) {
      const m = node.nodeValue.match(regex);
      if (!m) continue;
      const idx = m.index;
      const len = m[0].length;
      const text = node.nodeValue;
      const before = text.slice(0, idx);
      const matched = text.slice(idx, idx + len);
      const after = text.slice(idx + len);
      const mark = document.createElement('mark');
      mark.className = 're-entry-mark';
      mark.textContent = matched;
      const parent = node.parentNode;
      if (before) parent.insertBefore(document.createTextNode(before), node);
      parent.insertBefore(mark, node);
      if (after) parent.insertBefore(document.createTextNode(after), node);
      parent.removeChild(node);
      return mark;
    }
    return null;
  }

  function jumpTo(missSlug) {
    const transcript = findTranscriptSection();
    if (!transcript) return;
    clearMarks();
    const regex = slugToRegex(missSlug);
    const mark = highlightFirstMatch(transcript, regex);
    transcript.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (mark) {
      mark.classList.add('pulse');
      setTimeout(function () { mark.classList.remove('pulse'); }, 1300);
    }
  }

  window.surgicalReentry = {
    renderChips: renderChips,
    jumpTo: jumpTo,
  };

  document.addEventListener('DOMContentLoaded', function () {
    const m = location.search.match(/[?&]obj=([^&]+)/);
    const objId = m ? decodeURIComponent(m[1]) : null;
    if (objId) renderChips(objId);
  });
})();
