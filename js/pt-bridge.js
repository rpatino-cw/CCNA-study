/* Packet Tracer Bridge — shows build button when bridge server is reachable */
(function(){
  var BRIDGE='http://127.0.0.1:54321';
  var connected=false;
  var bridgeFound=false;

  // Map short type names used in lab data to PTBuilder's pt_type strings
  var DEVICE_MAP={
    // Routers
    '4321':'ISR4321','4331':'ISR4331','1941':'1941','2911':'2911',
    '2901':'2901','2811':'2811','1841':'1841',
    'router':'2911',
    // Switches
    '2960':'2960-24TT','3560':'3560-24PS','3650':'3650-24PS',
    'switch':'2960-24TT',
    // End devices
    'pc':'PC-PT','PC':'PC-PT','computer':'PC-PT',
    'server':'Server-PT','Server':'Server-PT',
    'laptop':'Laptop-PT','Laptop':'Laptop-PT',
  };

  // Expand abbreviated port names to full IOS names
  function expandPort(p){
    if(!p)return p;
    return p.replace(/^Gi(?=\d)/,'GigabitEthernet')
            .replace(/^Fa(?=\d)/,'FastEthernet')
            .replace(/^Se(?=\d)/,'Serial');
  }

  // Guess cable type from device types
  function guessCable(t1,t2){
    var isSwitch=function(t){return/2960|3560|3650|switch/i.test(t);};
    var isRouter=function(t){return/4321|4331|1941|2911|2901|2811|1841|router/i.test(t);};
    var isEndDevice=function(t){return/pc|server|laptop|computer/i.test(t);};
    if(isSwitch(t1)&&isRouter(t2)||isRouter(t1)&&isSwitch(t2))return'straight';
    if(isSwitch(t1)&&isEndDevice(t2)||isEndDevice(t1)&&isSwitch(t2))return'straight';
    if(isSwitch(t1)&&isSwitch(t2))return'cross';
    if(isRouter(t1)&&isRouter(t2))return'cross';
    return'straight';
  }

  function checkPT(cb){
    fetch(BRIDGE+'/status',{method:'GET'}).then(function(r){return r.json();}).then(function(d){
      connected=d.connected;
      if(cb)cb(connected);
    }).catch(function(){connected=false;if(cb)cb(false);});
  }

  function checkBridge(cb){
    fetch(BRIDGE+'/status',{method:'GET'}).then(function(r){return r.json();}).then(function(d){
      connected=d.connected;
      cb(true,d.connected);
    }).catch(function(){connected=false;cb(false,false);});
  }

  function send(js){
    return fetch(BRIDGE+'/queue',{method:'POST',headers:{'Content-Type':'text/plain'},body:js})
      .then(function(r){return r.text();});
  }

  function buildTopology(topo){
    var cmds=[];
    var deviceTypes={};

    // Add devices with mapped types
    if(topo.devices){
      topo.devices.forEach(function(d){
        var ptType=DEVICE_MAP[d.type]||d.type;
        deviceTypes[d.name]=d.type; // keep original for cable guessing
        cmds.push('addDevice('+JSON.stringify(d.name)+','+JSON.stringify(ptType)+','+d.x+','+d.y+');');
      });
    }

    // Pause to let PT create devices before linking
    cmds.push('// pause 2000');

    // Add links with cable type and expanded port names
    if(topo.links){
      topo.links.forEach(function(l){
        var t1=deviceTypes[l.d1]||'';
        var t2=deviceTypes[l.d2]||'';
        var cable=l.cable||guessCable(t1,t2);
        var p1=expandPort(l.p1);
        var p2=expandPort(l.p2);
        cmds.push('addLink('+JSON.stringify(l.d1)+','+JSON.stringify(p1)+','+JSON.stringify(l.d2)+','+JSON.stringify(p2)+','+JSON.stringify(cable)+');');
      });
    }

    // Send commands sequentially with delays
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
    bridgeFound=true;
    els.forEach(function(el){
      var oldHint=el.querySelector('.pt-setup-hint');
      if(oldHint)oldHint.remove();
      if(el.querySelector('.pt-build-btn'))return;

      var btn=document.createElement('button');
      btn.className='pt-build-btn';
      btn.style.cssText='display:inline-flex;align-items:center;gap:6px;font-family:"Space Grotesk",system-ui,sans-serif;font-size:.72rem;padding:6px 14px;background:#0891B2;color:#fff;border:none;border-radius:4px;cursor:pointer;margin:6px 0;transition:all .2s';
      btn.innerHTML='<span style="font-size:.85em">&#9889;</span> Build in Packet Tracer';
      btn.addEventListener('click',function(){
        btn.textContent='Checking PT...';
        btn.style.opacity='.6';
        checkPT(function(ptOk){
          if(!ptOk){
            btn.textContent='Packet Tracer not responding — open PT with Builder-MCP.pts';
            btn.style.background='#D97706';
            btn.style.opacity='1';
            setTimeout(function(){btn.innerHTML='<span style="font-size:.85em">&#9889;</span> Build in Packet Tracer';btn.style.background='#0891B2';},4000);
            return;
          }
          btn.textContent='Building...';
          try{
            var topo=JSON.parse(el.dataset.ptTopology);
            buildTopology(topo).then(function(){
              btn.innerHTML='<span style="font-size:.85em">&#10003;</span> Built! Check Packet Tracer';
              btn.style.background='#16A34A';
              btn.style.opacity='1';
              // Add skip-to-config link if #config section exists
              var configSection=document.getElementById('config');
              if(configSection&&!el.querySelector('.pt-skip-link')){
                var skip=document.createElement('a');
                skip.href='#config';
                skip.className='pt-skip-link';
                skip.style.cssText='display:inline-flex;align-items:center;gap:4px;font-family:"Space Grotesk",system-ui,sans-serif;font-size:.72rem;padding:5px 12px;color:#16A34A;text-decoration:none;border:1px solid rgba(22,163,74,.3);border-radius:4px;margin:6px 0 6px 8px;transition:all .2s';
                skip.innerHTML='Skip to configuration &#8595;';
                skip.addEventListener('click',function(e){e.preventDefault();configSection.scrollIntoView({behavior:'smooth',block:'start'});});
                skip.addEventListener('mouseenter',function(){skip.style.background='rgba(22,163,74,.06)';});
                skip.addEventListener('mouseleave',function(){skip.style.background='transparent';});
                el.appendChild(skip);
              }
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

    checkBridge(function(serverUp){
      if(serverUp){
        showBuildButtons(els);
        return;
      }
      showHints(els);
      var attempts=0;
      var poll=setInterval(function(){
        if(bridgeFound||attempts>=20){clearInterval(poll);return;}
        attempts++;
        checkBridge(function(up){
          if(up)showBuildButtons(els);
        });
      },3000);
    });
  }

  window.ptBridge={check:checkPT,send:send,build:buildTopology};

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',injectButtons);
  else injectButtons();
})();
