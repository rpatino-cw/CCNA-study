/* Background sync — pushes localStorage progress to study group KV on every page load */
(function(){
  var certTrack=localStorage.getItem('ccna_cert_track')||'ccna';

  var API='https://ccna-tutor.rpatino-cw.workers.dev';
  var code=localStorage.getItem('ccna_peer_group');
  var memberId=localStorage.getItem('ccna_peer_id');
  if(!code||!memberId)return;

  // Always show cached badge immediately (even if sync is debounced)
  try{
    var cached=JSON.parse(sessionStorage.getItem('_groupBadge'));
    if(cached)renderGroupBadge(cached.code,cached.mc,cached.myR,cached.avgR);
  }catch(e){}

  // Debounce — don't sync more than once per 30 seconds
  var lastSync=parseInt(sessionStorage.getItem('_lastSync')||'0');
  if(Date.now()-lastSync<30000)return;
  sessionStorage.setItem('_lastSync',Date.now().toString());

  // Build progress snapshot (same as peers.html getSnapshot)
  var progress=null;
  try{
    if(window.store&&window.topicsData){
      store.initProficiency(window.topicsData);
      var prof=store.getAllProficiency();
      var streak=store.getStreak();
      var time=store.getStudyTime();
      var diag=store.getDiagnosticHistory().slice(-3).map(function(d){return{date:d.date,totalScore:d.totalScore,domainScores:d.domainScores};});
      var history=store.getQuizHistory();
      var avgScore=history.length>0?Math.round(history.reduce(function(s,h){return s+(h.score/h.total)*100;},0)/history.length):0;
      var readiness=store.getReadinessScore(window.topicsData.domains);
      progress={
        proficiency:prof,
        streak:{current:streak.current,best:streak.best},
        studyTime:{total:time.total},
        diagnosticHistory:diag,
        quizStats:{taken:history.length,avgScore:avgScore},
        readiness:Math.round(readiness)
      };
    }
  }catch(e){}

  // Build full localStorage backup for cross-device recovery
  // Cap quiz_history and diagnostic_history to prevent KV bloat
  var fullBackup=null;
  try{
    var fb={};
    for(var i=0;i<localStorage.length;i++){
      var k=localStorage.key(i);
      if(k&&k.startsWith('ccna_'))fb[k]=localStorage.getItem(k);
    }
    // Trim large arrays to last 50 entries
    ['ccna_quiz_history','ccna_diagnostic_history'].forEach(function(key){
      if(!fb[key])return;
      try{
        var arr=JSON.parse(fb[key]);
        if(Array.isArray(arr)&&arr.length>50)fb[key]=JSON.stringify(arr.slice(-50));
      }catch(e){}
    });
    if(Object.keys(fb).length>0)fullBackup=JSON.stringify(fb);
  }catch(e){}

  // Always sync (heartbeat) — even without progress data, this updates lastSync
  try{
    fetch(API+'/api/group/sync',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({code:code,memberId:memberId,progress:progress,fullBackup:fullBackup})
    }).then(function(r){return r.json();}).then(function(data){
      if(!data.group)return;
      // Render study group mini badge on every page
      var g=data.group;
      var mc=Object.keys(g.members).length;
      var me=g.members[memberId];
      var myR=me&&me.progress?me.progress.readiness||0:0;
      var avgR=Math.round(Object.values(g.members).reduce(function(s,m){return s+(m.progress&&m.progress.readiness||0);},0)/mc);
      sessionStorage.setItem('_groupBadge',JSON.stringify({code:g.code,mc:mc,myR:myR,avgR:avgR}));
      renderGroupBadge(g.code,mc,myR,avgR);
    }).catch(function(){});
  }catch(e){}

  function renderGroupBadge(code,mc,myR,avgR){
    var badge=document.getElementById('group-mini-badge');
    if(!badge){
      badge=document.createElement('div');
      badge.id='group-mini-badge';
      badge.style.cssText='position:fixed;bottom:14px;left:14px;z-index:350;background:var(--bg-surface,#fff);border:1px solid var(--border,#e5e5e5);border-radius:8px;padding:8px 12px;font-family:monospace;font-size:0.65rem;color:var(--ink-muted,#888);box-shadow:0 2px 8px rgba(0,0,0,0.06);cursor:pointer;max-width:200px';
      badge.onclick=function(){window.location.href=(location.pathname.indexOf('/labs/')>=0?'../':'')+'peers.html';};
      document.body.appendChild(badge);
    }
    badge.innerHTML='<div style="font-weight:700;color:var(--ink,#333);font-size:0.72rem;margin-bottom:2px">Group '+code+'</div>'+
      '<div>'+mc+' members | You: '+myR+'% | Avg: '+avgR+'%</div>';
    // Stack sync-panel above group badge (avoid overlap)
    requestAnimationFrame(function(){
      var sync=document.getElementById('sync-panel');
      if(sync){sync.style.bottom=(14+badge.offsetHeight+8)+'px';}
    });
  }
})();
