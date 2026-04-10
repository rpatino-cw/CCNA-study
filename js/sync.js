/* Background sync — pushes localStorage progress to study group KV on every page load */
(function(){
  var API='https://ccna-tutor.rpatino-cw.workers.dev';
  var code=localStorage.getItem('ccna_peer_group');
  var memberId=localStorage.getItem('ccna_peer_id');
  if(!code||!memberId)return;

  // Debounce — don't sync more than once per 30 seconds
  var lastSync=parseInt(sessionStorage.getItem('_lastSync')||'0');
  if(Date.now()-lastSync<30000)return;
  sessionStorage.setItem('_lastSync',Date.now().toString());

  // Build progress snapshot (same as peers.html getSnapshot)
  try{
    if(!window.store||!window.topicsData)return;
    store.initProficiency(window.topicsData);
    var prof=store.getAllProficiency();
    var streak=store.getStreak();
    var time=store.getStudyTime();
    var diag=store.getDiagnosticHistory().slice(-3).map(function(d){return{date:d.date,totalScore:d.totalScore,domainScores:d.domainScores};});
    var history=store.getQuizHistory();
    var avgScore=history.length>0?Math.round(history.reduce(function(s,h){return s+(h.score/h.total)*100;},0)/history.length):0;
    var readiness=store.getReadinessScore(window.topicsData.domains);

    var progress={
      proficiency:prof,
      streak:{current:streak.current,best:streak.best},
      studyTime:{total:time.total},
      diagnosticHistory:diag,
      quizStats:{taken:history.length,avgScore:avgScore},
      readiness:Math.round(readiness)
    };

    fetch(API+'/api/group/sync',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({code:code,memberId:memberId,progress:progress})
    }).then(function(r){return r.json();}).then(function(data){
      if(!data.group)return;
      // Render study group mini badge on every page
      var g=data.group;
      var mc=Object.keys(g.members).length;
      var me=g.members[memberId];
      var myR=me&&me.progress?me.progress.readiness||0:0;
      var avgR=Math.round(Object.values(g.members).reduce(function(s,m){return s+(m.progress&&m.progress.readiness||0);},0)/mc);
      var badge=document.getElementById('group-mini-badge');
      if(!badge){
        badge=document.createElement('div');
        badge.id='group-mini-badge';
        badge.style.cssText='position:fixed;bottom:12px;left:12px;z-index:200;background:var(--bg-surface,#fff);border:1px solid var(--border,#e5e5e5);border-radius:8px;padding:8px 12px;font-family:monospace;font-size:0.65rem;color:var(--ink-muted,#888);box-shadow:0 2px 8px rgba(0,0,0,0.06);cursor:pointer;transition:opacity 0.2s;max-width:200px';
        badge.onclick=function(){window.location.href=(location.pathname.indexOf('/labs/')>=0?'../':'')+'peers.html';};
        document.body.appendChild(badge);
      }
      badge.innerHTML='<div style="font-weight:700;color:var(--ink,#333);font-size:0.72rem;margin-bottom:2px">Group '+g.code+'</div>'+
        '<div>'+mc+' members | You: '+myR+'% | Avg: '+avgR+'%</div>';
    }).catch(function(){});
  }catch(e){}
})();
