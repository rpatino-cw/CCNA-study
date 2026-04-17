/**
 * Shared "Mark Complete" button for PT lab pages.
 *
 * Replaces ~20 lines of near-duplicate inline JS in every lab file.
 *
 * Usage in each lab HTML:
 *   <div id="labCompleteBox"
 *        data-lab-key="ccna_ptlab_pt4"
 *        data-lab-topics="3.4">
 *   </div>
 *   <script defer src="../js/store.js"></script>
 *   <script defer src="../js/lab-complete.js"></script>
 *
 * data-lab-topics is comma-separated. Empty string = no topics (e.g. pt0).
 */
(function () {
  function init() {
    var box = document.getElementById('labCompleteBox');
    if (!box) return;

    var labKey = box.getAttribute('data-lab-key');
    var topicsAttr = box.getAttribute('data-lab-topics') || '';
    var topics = topicsAttr.split(',').map(function (t) { return t.trim(); }).filter(Boolean);
    if (!labKey) return;

    var done = JSON.parse(localStorage.getItem('ccna_ptlabs_done') || '[]');

    if (done.indexOf(labKey) !== -1) {
      box.innerHTML = '<span class="lab-complete-done">Lab Complete</span>';
      return;
    }

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'btnLabComplete';
    btn.className = 'lab-complete-btn';
    btn.textContent = 'Mark Complete';
    btn.addEventListener('click', function () {
      if (window.store) {
        topics.forEach(function (t) {
          store.updateProficiency(t, true);
          store.recordTopicStudy(t, true, 100);
        });
      }
      var list = JSON.parse(localStorage.getItem('ccna_ptlabs_done') || '[]');
      if (list.indexOf(labKey) === -1) list.push(labKey);
      localStorage.setItem('ccna_ptlabs_done', JSON.stringify(list));
      btn.textContent = 'Lab Complete!';
      btn.classList.add('is-done');
      btn.disabled = true;
    });
    box.innerHTML = '';
    box.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
