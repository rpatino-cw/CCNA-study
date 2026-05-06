/* mobile-lights.js — lights-out (dim/dark) toggle for in-bed play.
   Auto-injects floating moon/sun button bottom-right.
   Persists via localStorage('ccna_lights_out'). */
(function(){
  var KEY='ccna_lights_out';
  function apply(on){
    document.body.classList.toggle('lights-out',on);
    var meta=document.querySelector('meta[name="theme-color"]');
    if(meta)meta.setAttribute('content',on?'#0a0a0a':'#FAF7F2');
    var btn=document.getElementById('lightsToggle');
    if(btn)btn.textContent=on?'☀':'☾';
  }
  function init(){
    var on=localStorage.getItem(KEY)==='1';
    apply(on);
    if(document.getElementById('lightsToggle'))return;
    var b=document.createElement('button');
    b.id='lightsToggle';
    b.className='lights-toggle';
    b.setAttribute('aria-label','Toggle lights-out mode');
    b.textContent=on?'☀':'☾';
    b.onclick=function(){
      var next=!document.body.classList.contains('lights-out');
      localStorage.setItem(KEY,next?'1':'0');
      apply(next);
      if(navigator.vibrate)try{navigator.vibrate(8)}catch(e){}
    };
    document.body.appendChild(b);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();
})();
