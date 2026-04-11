/* Packet Tracer Bridge — sends topology commands to local PT via PTBuilder-MCP */
(function(){
  var BRIDGE='http://127.0.0.1:54321';
  var connected=false;

  // Check if PT bridge is running
  function checkPT(cb){
    fetch(BRIDGE+'/status',{method:'GET'}).then(function(r){return r.json();}).then(function(d){
      connected=d.connected;
      if(cb)cb(connected);
    }).catch(function(){connected=false;if(cb)cb(false);});
  }

  // Queue a JS command for PT to execute
  function send(js){
    return fetch(BRIDGE+'/queue',{method:'POST',headers:{'Content-Type':'text/plain'},body:js})
      .then(function(r){return r.text();});
  }

  // High-level: build a full topology from a definition
  function buildTopology(topo){
    // topo = { devices:[{name,type,x,y},...], links:[{d1,p1,d2,p2},...], configs:[{device,commands:[]},...] }
    var cmds=[];

    // Clear workspace first
    cmds.push('clearTopology();');

    // Add devices
    if(topo.devices){
      topo.devices.forEach(function(d){
        cmds.push('addDevice('+JSON.stringify(d.name)+','+JSON.stringify(d.type)+','+d.x+','+d.y+');');
      });
    }

    // Small delay between devices and links (PT needs time to create devices)
    cmds.push('// pause 2000');

    // Add links
    if(topo.links){
      topo.links.forEach(function(l){
        cmds.push('addLink('+JSON.stringify(l.d1)+','+JSON.stringify(l.p1)+','+JSON.stringify(l.d2)+','+JSON.stringify(l.p2)+');');
      });
    }

    // Send commands sequentially with small delays
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

  // Inject "Build in PT" buttons wherever data-pt-topology is found
  function injectButtons(){
    document.querySelectorAll('[data-pt-topology]').forEach(function(el){
      if(el.querySelector('.pt-build-btn'))return; // already injected
      var btn=document.createElement('button');
      btn.className='pt-build-btn';
      btn.style.cssText='font-family:"Space Grotesk",system-ui,sans-serif;font-size:.7rem;padding:5px 12px;background:#0891B2;color:#fff;border:none;border-radius:4px;cursor:pointer;margin:6px 0;transition:opacity .2s';
      btn.textContent='Build in Packet Tracer';
      btn.addEventListener('click',function(){
        btn.textContent='Checking PT...';
        btn.style.opacity='.6';
        checkPT(function(ok){
          if(!ok){
            btn.textContent='Packet Tracer not detected';
            btn.style.background='#DC2626';
            setTimeout(function(){btn.textContent='Build in Packet Tracer';btn.style.background='#0891B2';btn.style.opacity='1';},3000);
            return;
          }
          btn.textContent='Building...';
          try{
            var topo=JSON.parse(el.dataset.ptTopology);
            buildTopology(topo).then(function(){
              btn.textContent='Built! Check Packet Tracer';
              btn.style.background='#16A34A';
              setTimeout(function(){btn.textContent='Build in Packet Tracer';btn.style.background='#0891B2';btn.style.opacity='1';},4000);
            }).catch(function(){
              btn.textContent='Error — check PT';
              btn.style.background='#DC2626';
              setTimeout(function(){btn.textContent='Build in Packet Tracer';btn.style.background='#0891B2';btn.style.opacity='1';},3000);
            });
          }catch(e){
            btn.textContent='Invalid topology data';
            setTimeout(function(){btn.textContent='Build in Packet Tracer';btn.style.background='#0891B2';btn.style.opacity='1';},3000);
          }
        });
      });
      el.appendChild(btn);
    });
  }

  // Expose for manual use
  window.ptBridge={check:checkPT,send:send,build:buildTopology};

  // Auto-inject on load
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',injectButtons);
  else injectButtons();
})();
