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

  // Distinguish: 'offline' (bridge server not running), 'disconnected' (bridge up, PT not polling), 'ready'
  var bridgeState='offline';

  function checkPT(cb){
    fetch(BRIDGE+'/status',{method:'GET'}).then(function(r){return r.json();}).then(function(d){
      connected=d.connected;
      bridgeState=connected?'ready':'disconnected';
      if(cb)cb(connected,bridgeState);
    }).catch(function(){
      connected=false;
      bridgeState='offline';
      console.warn('[PT Bridge] Bridge server unreachable at '+BRIDGE+' — run: python3 pt-bridge.py');
      if(cb)cb(false,bridgeState);
    });
  }

  function checkBridge(cb){
    fetch(BRIDGE+'/status',{method:'GET'}).then(function(r){return r.json();}).then(function(d){
      connected=d.connected;
      bridgeState=connected?'ready':'disconnected';
      cb(true,d.connected);
    }).catch(function(){
      connected=false;
      bridgeState='offline';
      console.warn('[PT Bridge] Bridge server not detected at '+BRIDGE);
      cb(false,false);
    });
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

  function createStatusBadge(){
    var badge=document.createElement('span');
    badge.className='pt-status-badge';
    badge.style.cssText='display:inline-flex;align-items:center;gap:4px;font-family:"Space Grotesk",system-ui,sans-serif;font-size:.65rem;padding:2px 8px;border-radius:3px;margin-left:8px;vertical-align:middle;transition:all .3s';
    updateBadge(badge,bridgeState);
    return badge;
  }

  function updateBadge(badge,state){
    if(state==='ready'){
      badge.style.background='rgba(22,163,74,.12)';badge.style.color='#16A34A';
      badge.innerHTML='&#9679; PT Connected';
    }else if(state==='disconnected'){
      badge.style.background='rgba(217,119,6,.12)';badge.style.color='#D97706';
      badge.innerHTML='&#9679; Bridge running — PT not linked';
    }else{
      badge.style.background='rgba(120,113,108,.1)';badge.style.color='#78716C';
      badge.innerHTML='&#9675; Bridge offline';
    }
  }

  function showBuildButtons(els){
    bridgeFound=true;
    els.forEach(function(el){
      var oldHint=el.querySelector('.pt-setup-hint');
      if(oldHint)oldHint.remove();
      if(el.querySelector('.pt-build-btn'))return;

      var wrap=document.createElement('div');
      wrap.style.cssText='display:flex;align-items:center;flex-wrap:wrap;gap:4px;margin:6px 0';

      var btn=document.createElement('button');
      btn.className='pt-build-btn';
      btn.style.cssText='display:inline-flex;align-items:center;gap:6px;font-family:"Space Grotesk",system-ui,sans-serif;font-size:.72rem;padding:6px 14px;background:#0891B2;color:#fff;border:none;border-radius:4px;cursor:pointer;transition:all .2s';
      btn.innerHTML='<span style="font-size:.85em">&#9889;</span> Build in Packet Tracer';

      var badge=createStatusBadge();

      // Alert banner — hidden by default, shown on errors
      var alert=document.createElement('div');
      alert.className='pt-alert';
      alert.style.cssText='display:none;width:100%;font-family:"Space Grotesk",system-ui,sans-serif;font-size:.7rem;padding:8px 12px;border-radius:4px;margin-top:6px;line-height:1.5';

      function showAlert(msg,level){
        var colors={error:{bg:'rgba(220,38,38,.08)',border:'#DC2626',text:'#991B1B'},warn:{bg:'rgba(217,119,6,.08)',border:'#D97706',text:'#92400E'},info:{bg:'rgba(8,145,178,.08)',border:'#0891B2',text:'#155E75'}};
        var c=colors[level]||colors.warn;
        alert.style.display='block';
        alert.style.background=c.bg;alert.style.border='1px solid '+c.border;alert.style.color=c.text;
        alert.innerHTML=msg;
      }

      function hideAlert(){alert.style.display='none';}

      var setupPath=(/\/labs\//.test(location.pathname))?'pt-setup.html':'labs/pt-setup.html';

      btn.addEventListener('click',function(){
        hideAlert();
        btn.textContent='Checking PT\u2026';
        btn.style.opacity='.6';
        checkPT(function(ptOk,state){
          updateBadge(badge,state);
          if(state==='offline'){
            btn.innerHTML='<span style="font-size:.85em">&#9889;</span> Build in Packet Tracer';
            btn.style.opacity='1';
            showAlert(
              '<strong>Bridge server not running.</strong> Start it in a terminal:'+
              '<br><code style="background:rgba(0,0,0,.06);padding:1px 5px;border-radius:3px;font-size:.68rem">python3 pt-bridge.py</code>'+
              '<br><a href="'+setupPath+'" style="color:inherit;text-decoration:underline">Full setup guide \u2192</a>',
              'error'
            );
            console.error('[PT Bridge] Bridge server is not running. Start with: python3 pt-bridge.py');
            return;
          }
          if(state==='disconnected'){
            btn.innerHTML='<span style="font-size:.85em">&#9889;</span> Build in Packet Tracer';
            btn.style.opacity='1';
            showAlert(
              '<strong>Bridge is running but Packet Tracer isn\u2019t connected.</strong>'+
              '<br>Open Packet Tracer \u2192 load <strong>Builder-MCP.pts</strong> \u2192 the badge will turn green when linked.'+
              '<br><a href="'+setupPath+'" style="color:inherit;text-decoration:underline">Setup guide \u2192</a>',
              'warn'
            );
            console.warn('[PT Bridge] Bridge running but PT not polling. Load Builder-MCP.pts in Packet Tracer.');
            return;
          }
          btn.textContent='Building\u2026';
          try{
            var topo=JSON.parse(el.dataset.ptTopology);
            buildTopology(topo).then(function(){
              btn.innerHTML='<span style="font-size:.85em">&#10003;</span> Built! Check Packet Tracer';
              btn.style.background='#16A34A';
              btn.style.opacity='1';
              setTimeout(function(){btn.innerHTML='<span style="font-size:.85em">&#9889;</span> Build in Packet Tracer';btn.style.background='#0891B2';},4000);
            }).catch(function(err){
              btn.innerHTML='<span style="font-size:.85em">&#9889;</span> Build in Packet Tracer';
              btn.style.opacity='1';
              showAlert(
                '<strong>Build failed.</strong> Packet Tracer may have rejected a command.'+
                '<br>Check the PT window for errors, then try again.',
                'error'
              );
              console.error('[PT Bridge] Build error:',err);
            });
          }catch(e){
            btn.style.opacity='1';
            showAlert(
              '<strong>Invalid topology data</strong> in this lab\u2019s HTML. This is a bug \u2014 please report it.',
              'error'
            );
            console.error('[PT Bridge] Bad topology JSON:',e);
          }
        });
      });

      wrap.appendChild(btn);
      wrap.appendChild(badge);
      el.appendChild(wrap);
      el.appendChild(alert);

      // Keep badge alive — refresh every 8s
      setInterval(function(){
        checkPT(function(_ok,state){updateBadge(badge,state);});
      },8000);
    });
  }

  function showHints(els){
    els.forEach(function(el){
      if(el.querySelector('.pt-setup-hint'))return;
      var inLabs=/\/labs\//.test(location.pathname);
      var setupPath=inLabs?'pt-setup.html':'labs/pt-setup.html';

      var wrap=document.createElement('div');
      wrap.className='pt-setup-hint';
      wrap.style.cssText='font-family:"Space Grotesk",system-ui,sans-serif;font-size:.72rem;margin:6px 0';

      var hint=document.createElement('a');
      hint.href=setupPath;
      hint.style.cssText='display:inline-flex;align-items:center;gap:6px;padding:5px 12px;color:var(--ink-muted,#A8A29E);text-decoration:none;border:1px solid var(--border,#E2DFD9);border-radius:4px;transition:all .2s';
      hint.innerHTML='<span style="font-size:.85em">&#9889;</span> Enable one-click topology building';
      hint.addEventListener('mouseenter',function(){hint.style.borderColor='var(--accent,#B45309)';hint.style.color='var(--accent,#B45309)';});
      hint.addEventListener('mouseleave',function(){hint.style.borderColor='var(--border,#E2DFD9)';hint.style.color='var(--ink-muted,#A8A29E)';});

      var note=document.createElement('div');
      note.style.cssText='color:var(--ink-muted,#A8A29E);font-size:.65rem;margin-top:4px;opacity:.8';
      note.textContent='Bridge server not detected \u2014 topology auto-build is unavailable. You can still build manually.';

      wrap.appendChild(hint);
      wrap.appendChild(note);
      el.appendChild(wrap);
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
