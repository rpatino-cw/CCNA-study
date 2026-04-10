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
    }).catch(function(){});
  }catch(e){}
})();
