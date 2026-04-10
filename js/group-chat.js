/* Floating group chat + online presence — include on every page */
(function(){
  var API='https://ccna-tutor.rpatino-cw.workers.dev';
  var code=localStorage.getItem('ccna_peer_group');
  var memberId=localStorage.getItem('ccna_peer_id');
  var myName=localStorage.getItem('ccna_peer_name')||'You';
  if(!code||!memberId)return;

  var COLORS=['#B45309','#0369A1','#7C3AED','#059669','#DB2777','#D97706','#4338CA','#DC2626','#0D9488','#9333EA'];
  var isOpen=false, pollTimer=null, lastMessages=0;
  var prefix=location.pathname.indexOf('/labs/')>=0?'../':'';
  var prevOnlineState={};       // {memberId: bool} — tracks who was online last render
  var notifyCooldowns={};       // {memberId: timestamp} — 30s grace period per user
  var dmTarget=null;            // null = group chat, {id,name,color} = DM mode
  var cachedGroup=null;

  // ── Inject CSS ──────────────────────────────────────────────
  var css=document.createElement('style');
  css.textContent=`
    .gc-bar{position:fixed;right:0;top:50%;transform:translateY(-50%);z-index:9000;display:flex;flex-direction:column;align-items:center;gap:6px;padding:8px 6px;background:rgba(250,247,242,.92);border:1px solid #E2DFD9;border-right:none;border-radius:10px 0 0 10px;box-shadow:-2px 2px 12px rgba(0,0,0,.08);backdrop-filter:blur(8px);transition:opacity .2s}
    .gc-bar.hidden{opacity:0;pointer-events:none}
    .gc-dot{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',system-ui,sans-serif;font-size:.65rem;font-weight:700;color:#fff;cursor:pointer;position:relative;transition:transform .15s}
    .gc-dot:hover{transform:scale(1.15)}
    .gc-dot .gc-status{position:absolute;bottom:-1px;right:-1px;width:10px;height:10px;border-radius:50%;border:2px solid #FAF7F2}
    .gc-dot .gc-status.online{background:#16A34A;animation:gc-breathe 2s ease-in-out infinite}
    .gc-dot .gc-status.offline{background:#DC2626}
    @keyframes gc-breathe{0%,100%{box-shadow:0 0 0 0 rgba(22,163,74,.4);transform:scale(1)}50%{box-shadow:0 0 0 4px rgba(22,163,74,0);transform:scale(1.15)}}
    .gc-name{font-family:'Space Grotesk',system-ui,sans-serif;font-size:.55rem;color:#57534E;max-width:60px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center;line-height:1.2;margin-top:1px}
    .gc-member{display:flex;flex-direction:column;align-items:center;gap:1px}
    .gc-toast{position:fixed;top:16px;right:16px;z-index:9999;padding:10px 16px;background:rgba(22,163,74,.12);border:1px solid rgba(22,163,74,.3);border-radius:8px;font-family:'Space Grotesk',system-ui,sans-serif;font-size:.78rem;font-weight:600;color:#15803D;pointer-events:none;opacity:0;transform:translateY(-8px);transition:opacity .3s,transform .3s}
    .gc-toast.show{opacity:1;transform:translateY(0)}
    .gc-toggle{width:32px;height:32px;border-radius:50%;border:1px solid #E2DFD9;background:#1C1917;color:#FAF7F2;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:14px;margin-top:4px;transition:transform .15s}
    .gc-toggle:hover{transform:scale(1.1)}
    .gc-panel{position:fixed;right:80px;top:50%;transform:translateY(-50%);z-index:8999;width:300px;max-height:420px;border-radius:12px;background:rgba(250,247,242,.95);border:1px solid #E2DFD9;box-shadow:-4px 4px 24px rgba(0,0,0,.12);backdrop-filter:blur(12px);display:flex;flex-direction:column;opacity:0;pointer-events:none;transition:opacity .2s,transform .2s}
    .gc-panel.open{opacity:1;pointer-events:auto}
    .gc-panel-head{padding:10px 14px;border-bottom:1px solid #E2DFD9;font-family:'Space Grotesk',system-ui,sans-serif;font-size:.78rem;font-weight:700;color:#1C1917;display:flex;justify-content:space-between;align-items:center}
    .gc-panel-head .gc-close{background:none;border:none;cursor:pointer;font-size:16px;color:#A8A29E;padding:0}
    .gc-msgs{flex:1;overflow-y:auto;padding:8px 12px;min-height:200px}
    .gc-msg{margin-bottom:8px}
    .gc-msg-head{font-family:'Space Grotesk',system-ui,sans-serif;font-size:.62rem;margin-bottom:1px}
    .gc-msg-name{font-weight:700}
    .gc-msg-time{color:#A8A29E;margin-left:6px}
    .gc-msg-text{font-family:'Source Serif 4',Georgia,serif;font-size:.8rem;color:#44403C;line-height:1.4}
    .gc-msg.you .gc-msg-name{color:#B45309}
    .gc-input-row{display:flex;gap:6px;padding:8px 10px;border-top:1px solid #E2DFD9}
    .gc-input{flex:1;padding:6px 10px;border:1px solid #E2DFD9;border-radius:6px;font-family:'Source Serif 4',Georgia,serif;font-size:.8rem;background:transparent;color:#1C1917;outline:none}
    .gc-input:focus{border-color:#B45309}
    .gc-send{font-family:'Space Grotesk',system-ui,sans-serif;font-size:.65rem;padding:6px 12px;background:#1C1917;color:#FAF7F2;border:none;border-radius:6px;cursor:pointer}
    .gc-unread{position:absolute;top:-4px;right:-4px;width:16px;height:16px;border-radius:50%;background:#DC2626;color:#fff;font-family:'JetBrains Mono',monospace;font-size:.5rem;display:flex;align-items:center;justify-content:center;border:2px solid #FAF7F2}
    .gc-back{background:none;border:none;cursor:pointer;font-size:13px;color:#A8A29E;padding:0 6px 0 0}
    .gc-back:hover{color:#1C1917}
    .gc-dm-label{font-size:.65rem;font-weight:400;color:#57534E;margin-left:4px}
    .gc-dot.ring{box-shadow:0 0 0 2px #FAF7F2,0 0 0 4px #B45309}
    @media(max-width:600px){.gc-panel{right:8px;width:calc(100vw - 64px);max-height:50vh}.gc-bar{padding:6px 4px}.gc-dot{width:26px;height:26px;font-size:.55rem}}
  `;
  document.head.appendChild(css);

  // ── Build sidebar + panel ───────────────────────────────────
  var bar=document.createElement('div');
  bar.className='gc-bar';
  bar.id='gcBar';
  bar.innerHTML='<div class="gc-toggle" id="gcToggle" title="Group Chat">&#9993;</div>';
  document.body.appendChild(bar);

  var panel=document.createElement('div');
  panel.className='gc-panel';
  panel.id='gcPanel';
  panel.innerHTML=
    '<div class="gc-panel-head"><span id="gcPanelTitle">Group Chat</span><button class="gc-close" id="gcClose">&times;</button></div>'+
    '<div class="gc-msgs" id="gcMsgs"></div>'+
    '<div class="gc-input-row">'+
      '<input class="gc-input" id="gcInput" placeholder="Type a message..." maxlength="500">'+
      '<button class="gc-send" id="gcSend">Send</button>'+
    '</div>';
  document.body.appendChild(panel);

  // ── Toggle ──────────────────────────────────────────────────
  document.getElementById('gcToggle').addEventListener('click',function(){
    isOpen=!isOpen;
    panel.classList.toggle('open',isOpen);
    if(isOpen){fetchGroup();startPoll();}else{stopPoll();}
  });
  document.getElementById('gcClose').addEventListener('click',function(){
    isOpen=false;panel.classList.remove('open');stopPoll();
  });

  // ── DM helpers ───────────────────────────────────────────────
  function dmKey(otherId){
    var ids=[memberId,otherId].sort();
    return 'ccna_dm_'+ids[0]+'_'+ids[1];
  }
  function getDMs(otherId){
    try{return JSON.parse(localStorage.getItem(dmKey(otherId)))||[];}catch(e){return[];}
  }
  function saveDM(otherId,msg){
    var msgs=getDMs(otherId);
    msgs.push(msg);
    if(msgs.length>50)msgs=msgs.slice(-50);
    localStorage.setItem(dmKey(otherId),JSON.stringify(msgs));
  }
  function openDM(id,name,color){
    dmTarget={id:id,name:name,color:color};
    isOpen=true;
    panel.classList.add('open');
    updatePanelHeader();
    renderMessages();
    startPoll();
  }
  function backToGroup(){
    dmTarget=null;
    updatePanelHeader();
    if(cachedGroup)renderMessages();
  }
  function updatePanelHeader(){
    var head=document.getElementById('gcPanelTitle');
    if(dmTarget){
      head.innerHTML='<button class="gc-back" id="gcBack" title="Back to group">&larr;</button>'+
        '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:'+dmTarget.color+';margin-right:4px"></span>'+
        escHtml(dmTarget.name)+'<span class="gc-dm-label">DM</span>';
      document.getElementById('gcBack').addEventListener('click',backToGroup);
    }else{
      head.innerHTML='Group Chat';
    }
  }

  // ── Send ────────────────────────────────────────────────────
  function sendMsg(){
    var input=document.getElementById('gcInput');
    var text=input.value.trim();
    if(!text)return;
    input.value='';
    if(dmTarget){
      // DM — store locally (both sides poll group to see each other's DMs)
      var msg={memberId:memberId,name:myName,text:text,ts:new Date().toISOString()};
      saveDM(dmTarget.id,msg);
      // Also push to KV so the other person can see it
      fetch(API+'/api/group/action',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({code:code,action:'dm',memberId:memberId,name:myName,text:text,to:dmTarget.id})
      }).then(function(r){return r.json();}).then(function(d){
        var g=d.group||d;
        if(g.members){cachedGroup=g;renderMessages();}
      }).catch(function(){renderMessages();});
      return;
    }
    fetch(API+'/api/group/action',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({code:code,action:'chat',memberId:memberId,name:myName,text:text})
    }).then(function(r){return r.json();}).then(function(d){
      var g=d.group||d;
      if(g.members){cachedGroup=g;renderMessages();}
    }).catch(function(){});
  }
  document.getElementById('gcSend').addEventListener('click',sendMsg);
  document.getElementById('gcInput').addEventListener('keydown',function(e){
    if(e.key==='Enter'){e.preventDefault();sendMsg();}
  });

  // ── Fetch + render ──────────────────────────────────────────
  function fetchGroup(){
    fetch(API+'/api/group/'+code).then(function(r){return r.json();}).then(function(d){
      if(d.error)return;
      var g=d.group||d; // API returns group directly, not wrapped
      if(g.members)renderGroup(g);
    }).catch(function(){});
  }

  function showOnlineToast(name){
    var t=document.createElement('div');
    t.className='gc-toast';
    t.textContent=name+' is online';
    document.body.appendChild(t);
    requestAnimationFrame(function(){requestAnimationFrame(function(){t.classList.add('show');});});
    setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove();},400);},3000);
  }

  function renderGroup(g){
    // Online presence dots + names
    var entries=Object.entries(g.members);
    entries.sort(function(a,b){return(a[1].joinedAt||'').localeCompare(b[1].joinedAt||'');});
    var dotsHtml='';
    var now=Date.now();
    entries.forEach(function(entry,i){
      var id=entry[0],m=entry[1];
      var lastSync=m.lastSync?new Date(m.lastSync).getTime():0;
      var isOnline=now-lastSync<600000; // 10 min
      var color=COLORS[i%COLORS.length];
      var initial=(m.name||'?')[0].toUpperCase();
      var isYou=id===memberId;
      var displayName=(m.name||'?')+(isYou?' (you)':'');

      // Detect online transition — notify with 30s grace period
      var wasOnline=prevOnlineState[id];
      if(isOnline&&wasOnline===false&&id!==memberId){
        var lastNotify=notifyCooldowns[id]||0;
        if(now-lastNotify>30000){
          showOnlineToast(m.name||'Someone');
          notifyCooldowns[id]=now;
        }
      }
      prevOnlineState[id]=isOnline;

      var isDmActive=dmTarget&&dmTarget.id===id;
      dotsHtml+='<div class="gc-member">'+
        '<div class="gc-dot'+(isDmActive?' ring':'')+'" data-dm-id="'+id+'" data-dm-name="'+escHtml(m.name||'?')+'" data-dm-color="'+color+'" style="background:'+(isOnline?color:'#78716C')+';opacity:'+(isOnline?'1':'.5')+'" title="'+(isYou?'You':('Click to DM '+displayName))+'">'+
        initial+'<span class="gc-status '+(isOnline?'online':'offline')+'"></span></div>'+
        '<div class="gc-name" style="color:'+(isOnline?'#1C1917':'#A8A29E')+'">'+escHtml(m.name||'?')+'</div></div>';
    });
    var toggle=document.getElementById('gcToggle').outerHTML;
    bar.innerHTML=dotsHtml+toggle;
    // Re-attach toggle listener
    document.getElementById('gcToggle').addEventListener('click',function(){
      isOpen=!isOpen;dmTarget=null;updatePanelHeader();
      panel.classList.toggle('open',isOpen);
      if(isOpen){fetchGroup();startPoll();}else{stopPoll();}
    });
    // Attach DM click handlers to member dots
    bar.querySelectorAll('.gc-dot[data-dm-id]').forEach(function(dot){
      dot.addEventListener('click',function(){
        var id=dot.dataset.dmId;
        if(id===memberId)return; // can't DM yourself
        openDM(id,dot.dataset.dmName,dot.dataset.dmColor);
      });
    });

    cachedGroup=g;
    renderMessages();
  }

  function renderMessages(){
    var msgsEl=document.getElementById('gcMsgs');
    var msgs;
    if(dmTarget){
      // DM mode — show DMs from KV + local
      var kvDms=(cachedGroup&&cachedGroup.dms)?cachedGroup.dms[dmKey(dmTarget.id).replace('ccna_dm_','')]||[]:[];
      var localDms=getDMs(dmTarget.id);
      // Merge: use KV as source of truth, add local-only msgs
      var kvIds=new Set(kvDms.map(function(m){return m.ts;}));
      msgs=kvDms.slice();
      localDms.forEach(function(m){if(!kvIds.has(m.ts))msgs.push(m);});
      msgs.sort(function(a,b){return(a.ts||'').localeCompare(b.ts||'');});
    }else{
      msgs=cachedGroup?(cachedGroup.messages||[]):[];
    }

    var html='';
    msgs.forEach(function(m){
      var isYou=m.memberId===memberId;
      var time=(m.ts||m.timestamp)?new Date(m.ts||m.timestamp).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}):'';
      html+='<div class="gc-msg'+(isYou?' you':'')+'">'+
        '<div class="gc-msg-head"><span class="gc-msg-name">'+(m.name||'?')+'</span><span class="gc-msg-time">'+time+'</span></div>'+
        '<div class="gc-msg-text">'+escHtml(m.text||'')+'</div></div>';
    });
    if(msgs.length===0)html='<div style="text-align:center;color:#A8A29E;font-family:monospace;font-size:.7rem;padding:40px 0">'+(dmTarget?'No messages with '+escHtml(dmTarget.name)+' yet':'No messages yet')+'</div>';
    msgsEl.innerHTML=html;
    msgsEl.scrollTop=msgsEl.scrollHeight;

    // Unread indicator (group chat only)
    if(!dmTarget){
      if(!isOpen&&msgs.length>lastMessages){
        var badge=document.querySelector('.gc-unread');
        if(!badge){
          badge=document.createElement('span');
          badge.className='gc-unread';
          document.getElementById('gcToggle').style.position='relative';
          document.getElementById('gcToggle').appendChild(badge);
        }
        badge.textContent=msgs.length-lastMessages;
      }
      if(isOpen){
        lastMessages=msgs.length;
        var badge=document.querySelector('.gc-unread');
        if(badge)badge.remove();
      }
    }
  }

  function escHtml(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML;}

  // ── Polling ─────────────────────────────────────────────────
  function startPoll(){stopPoll();pollTimer=setInterval(fetchGroup,5000);}
  function stopPoll(){if(pollTimer){clearInterval(pollTimer);pollTimer=null;}}

  // Initial fetch to show online dots
  fetchGroup();
})();
