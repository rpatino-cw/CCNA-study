/* Shared render helper for topic resources.
   Usage: window.renderTopicResources(topicId, opts) -> HTML string
   opts.includeSite (default true)  — show site shortcut chips
   opts.includeJday (default true)  — show Jeremy's IT Lab day row
   opts.collapsible (default true)  — wrap extra resources in a toggle
   opts.initiallyOpen (default false) — if collapsible, start open */
(function(){
  function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  });}

  function buildRows(r){
    var html = '';
    (r.books || []).forEach(function(bk){
      if (!bk || !bk.t) return;
      var href = 'book.html?book=' + (bk.id || 'odom-vol2');
      if (bk.p) href += '&page=' + bk.p;
      if (bk.ch) href += '#ch-' + bk.ch;
      html += '<div class="res-row"><span class="res-tag book">BOOK</span><a href="' + href + '">' + esc(bk.t) + '</a></div>';
    });
    if (r.videos && r.videos.length > 1) {
      r.videos.slice(1).forEach(function(v){
        html += '<div class="res-row"><span class="res-tag video">VIDEO</span><a href="' + (v.u || '#') + '" target="_blank" rel="noopener">' + esc(v.ch) + ' — ' + esc(v.t) + '</a></div>';
      });
    }
    (r.articles || []).forEach(function(a){
      html += '<div class="res-row"><span class="res-tag article">READ</span><a href="' + a.u + '" target="_blank" rel="noopener">' + esc(a.t) + '</a></div>';
    });
    (r.labs || []).forEach(function(l){
      var href = l.u || l.h || '#';
      var ext = !!l.u;
      html += '<div class="res-row"><span class="res-tag lab">LAB</span><a href="' + href + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' + esc(l.t) + '</a></div>';
    });
    (r.drills || []).forEach(function(d){
      var href = d.u || d.h || '#';
      if (typeof href === 'string' && href.indexOf('learn=') !== -1) return;
      var ext = !!d.u;
      html += '<div class="res-row"><span class="res-tag drill">DRILL</span><a href="' + href + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' + esc(d.t) + '</a></div>';
    });
    (r.cisco || []).forEach(function(c){
      html += '<div class="res-row"><span class="res-tag cisco">CISCO</span><a href="' + c.u + '" target="_blank" rel="noopener">' + esc(c.t) + '</a></div>';
    });
    return html;
  }

  function countExtras(r){
    var n = 0;
    if (r.books) n += r.books.length;
    if (r.videos && r.videos.length > 1) n += r.videos.length - 1;
    if (r.articles) n += r.articles.length;
    if (r.labs) n += r.labs.length;
    if (r.drills) n += r.drills.filter(function(d){ var h = d.u || d.h || ''; return typeof h === 'string' && h.indexOf('learn=') === -1; }).length;
    if (r.cisco) n += r.cisco.length;
    return n;
  }

  window.renderTopicResources = function(topicId, opts){
    opts = opts || {};
    var includeSite = opts.includeSite !== false;
    var includeJday = opts.includeJday !== false;
    var collapsible = opts.collapsible !== false;
    var initiallyOpen = !!opts.initiallyOpen;

    var data = window.topicResources || {};
    var r = data[topicId];
    if (!r) return '';

    var rows = buildRows(r);
    var count = countExtras(r);

    var siteHtml = '';
    if (includeSite && r.site && r.site.length) {
      siteHtml = '<div class="obj-shortcuts">' + r.site.map(function(s){
        return '<a class="obj-sc" href="' + s.h + '">' + esc(s.t) + '</a>';
      }).join('') + '</div>';
    }

    var jdayHtml = '';
    if (includeJday && r.jday) {
      jdayHtml = '<div class="study-day-row" style="margin-top:10px"><a href="jeremy-labs.html" style="text-decoration:none;color:inherit">Jeremy\'s IT Lab Day ' + esc(r.jday) + '</a></div>';
    }

    var extraBlock = '';
    if (count > 0) {
      if (collapsible) {
        var openClass = initiallyOpen ? ' open' : '';
        var initialLabel = initiallyOpen ? '\u25B4 Hide resources' : '\u25BE ' + count + ' more resources';
        extraBlock =
          '<button class="res-more" onclick="var n=this.nextElementSibling;n.classList.toggle(\'open\');this.textContent=n.classList.contains(\'open\')?\'\\u25B4 Hide resources\':\'\\u25BE ' + count + ' more resources\'">' + initialLabel + '</button>' +
          '<div class="res-extra' + openClass + '">' + rows + '</div>';
      } else {
        extraBlock = '<div class="res-extra open">' + rows + '</div>';
      }
    }

    return '<div class="res-section">' + siteHtml + jdayHtml + extraBlock + '</div>';
  };
})();
