/* Packet Tracer Bridge — polls for bridge server, swaps hint for build button when detected */
(function(){
  var BRIDGE='http://127.0.0.1:54321';
  var connected=false;
  var detected=false; // once true, stop polling

  function checkPT(cb){
    fetch(BRIDGE+'/status',{method:'GET'}).then(function(r){return r.json();}).then(function(d){
      connected=d.connected;
      if(cb)cb(connected);
    }).catch(function(){connected=false;if(cb)cb(false);});
  }

  function send(js){
    return fetch(BRIDGE+'/queue',{method:'POST',headers:{'Content-Type':'text/plain'},body:js})
      .then(function(r){return r.text();});
  }

  function buildTopology(topo){
    var cmds=[];
    cmds.push('clearTopology();');
    if(topo.devices){
      topo.devices.forEach(function(d){
        cmds.push('addDevice('+JSON.stringify(d.name)+','+JSON.stringify(d.type)+','+d.x+','+d.y+');');
      });
    }
    cmds.push('// pause 2000');
    if(topo.links){
      topo.links.forEach(function(l){
        cmds.push('addLink('+JSON.stringify(l.d1)+','+JSON.stringify(l.p1)+','+JSON.stringify(l.d2)+','+JSON.stringify(l.p2)+');');
      });
    }
    var chain=Promise.resolve();
    cmds.forEach(function(cmd){
      if(cmd.indexOf('// pause')===0){
        var ms=parseInt(cmd.split(' ')[2])||1000;
        chain=chain.then(function(){return new Promise(function(r){setTimeout(r,ms);});});
      }else{
        chain=chain.then(function(){return send(cmd);}).then(function(){return new Promise(function(r){setTimeout(r,300);});});
      }
    });
    return chain;
  }

  function showBuildButtons(els){
    detected=true;
    els.forEach(function(el){
      // Remove hint if present
      var oldHint=el.querySelector('.pt-setup-hint');
      if(oldHint)oldHint.remove();
      if(el.querySelector('.pt-build-btn'))return;

      var btn=document.createElement('button');
      btn.className='pt-build-btn';
      btn.style.cssText='display:inline-flex;align-items:center;gap:6px;font-family:"Space Grotesk",system-ui,sans-serif;font-size:.72rem;padding:6px 14px;background:#0891B2;color:#fff;border:none;border-radius:4px;cursor:pointer;margin:6px 0;transition:all .2s';
      btn.innerHTML='<span style="font-size:.85em">&#9889;</span> Build in Packet Tracer';
      btn.addEventListener('click',function(){
        btn.textContent='Building...';
        btn.style.opacity='.6';
        try{
          var topo=JSON.parse(el.dataset.ptTopology);
          buildTopology(topo).then(function(){
            btn.innerHTML='<span style="font-size:.85em">&#10003;</span> Built! Check Packet Tracer';
            btn.style.background='#16A34A';
            btn.style.opacity='1';
            setTimeout(function(){btn.innerHTML='<span style="font-size:.85em">&#9889;</span> Build in Packet Tracer';btn.style.background='#0891B2';},4000);
          }).catch(function(){
            btn.textContent='Error — check PT';
            btn.style.background='#DC2626';
            btn.style.opacity='1';
            setTimeout(function(){btn.innerHTML='<span style="font-size:.85em">&#9889;</span> Build in Packet Tracer';btn.style.background='#0891B2';},3000);
          });
        }catch(e){
          btn.textContent='Invalid topology data';
          btn.style.opacity='1';
          setTimeout(function(){btn.innerHTML='<span style="font-size:.85em">&#9889;</span> Build in Packet Tracer';btn.style.background='#0891B2';},3000);
        }
      });
      el.appendChild(btn);
    });
  }

  function showHints(els){
    els.forEach(function(el){
      if(el.querySelector('.pt-setup-hint'))return;
      var hint=document.createElement('a');
      var inLabs=/\/labs\//.test(location.pathname);
      hint.href=inLabs?'pt-setup.html':'labs/pt-setup.html';
      hint.className='pt-setup-hint';
      hint.style.cssText='display:inline-flex;align-items:center;gap:6px;font-family:"Space Grotesk",system-ui,sans-serif;font-size:.72rem;padding:5px 12px;color:var(--ink-muted,#A8A29E);text-decoration:none;border:1px solid var(--border,#E2DFD9);border-radius:4px;margin:6px 0;transition:all .2s';
      hint.innerHTML='<span style="font-size:.85em">&#9889;</span> Optional: enable one-click topology building';
      hint.addEventListener('mouseenter',function(){hint.style.borderColor='var(--accent,#B45309)';hint.style.color='var(--accent,#B45309)';});
      hint.addEventListener('mouseleave',function(){hint.style.borderColor='var(--border,#E2DFD9)';hint.style.color='var(--ink-muted,#A8A29E)';});
      el.appendChild(hint);
    });
  }

  function injectButtons(){
    var els=document.querySelectorAll('[data-pt-topology]');
    if(!els.length)return;

    // Check immediately
    checkPT(function(ok){
      if(ok){
        showBuildButtons(els);
        return;
      }
      // Not connected yet — show hints and start polling
      showHints(els);

      // Poll every 3s for 60s — catches bridge starting after page load
      var attempts=0;
      var maxAttempts=20;
      var poll=setInterval(function(){
        if(detected||attempts>=maxAttempts){clearInterval(poll);return;}
        attempts++;
        checkPT(function(ok){
          if(ok)showBuildButtons(els);
        });
      },3000);
    });
  }

  window.ptBridge={check:checkPT,send:send,build:buildTopology};

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',injectButtons);
  else injectButtons();
})();
