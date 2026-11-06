'use strict';
const root=document.documentElement;
const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
const finePointer=matchMedia('(pointer:fine)').matches;

export function initMotion({playSound}){
  splitTitles();
  runIntro();
  trackScroll();
  countUp();
  hoverCards();
  workTabs(playSound);
  phoneVideos();
  siteViewer(playSound);
  if(finePointer&&!reduced)customCursor();
}

// Abre os projetos de demonstração dentro do site, em tela cheia, com troca computador/celular.
function siteViewer(playSound){
  const viewer=document.getElementById('viewer');
  if(!viewer)return;
  const frame=viewer.querySelector('iframe'),device=viewer.querySelector('.viewer-device');
  const title=viewer.querySelector('#viewer-title'),type=viewer.querySelector('#viewer-type'),openLink=viewer.querySelector('.viewer-open');
  const buttons=[...viewer.querySelectorAll('.viewer-devices button')];
  let opener=null;
  const setDevice=name=>{device.dataset.device=name;buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.device===name)))};
  document.querySelectorAll('[data-demo]').forEach(trigger=>trigger.addEventListener('click',()=>{
    opener=trigger;
    title.textContent=trigger.dataset.title;type.textContent=trigger.dataset.type;openLink.href=trigger.dataset.demo;
    setDevice('desktop');
    frame.title='Site '+trigger.dataset.title;frame.src=trigger.dataset.demo;
    viewer.showModal();root.classList.add('viewer-open');playSound('open');
  }));
  buttons.forEach(button=>button.addEventListener('click',()=>setDevice(button.dataset.device)));
  viewer.querySelector('.viewer-close').addEventListener('click',()=>viewer.close());
  viewer.addEventListener('close',()=>{
    root.classList.remove('viewer-open');
    frame.src='about:blank';
    opener?.focus({preventScroll:true});
  });
}

// Entrada da marca. A página começa pausada (classe intro-active) e libera o hero quando a cortina sobe.
function runIntro(){
  const intro=document.getElementById('intro');
  if(!intro)return;
  if(!root.classList.contains('intro-active')){intro.remove();return}
  intro.classList.add('intro-live');
  setTimeout(()=>{
    intro.classList.add('out');
    setTimeout(()=>root.classList.remove('intro-active'),380);
    setTimeout(()=>intro.remove(),1500);
  },2700);
}

// Barra de progresso no topo da página.
function trackScroll(){
  const bar=document.querySelector('.scroll-progress span');
  if(!bar)return;
  let pending=false;
  const update=()=>{const max=root.scrollHeight-innerHeight;bar.style.setProperty('--p',max>0?Math.min(scrollY/max,1):0);pending=false};
  addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(update)}},{passive:true});
  addEventListener('resize',update);
  update();
}

// Números que sobem até o valor final quando entram na tela.
function countUp(){
  const targets=document.querySelectorAll('[data-count]');
  if(!targets.length)return;
  const observer=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{
    if(!isIntersecting)return;
    observer.unobserve(target);
    const end=Number(target.dataset.count);
    if(reduced){target.textContent=end;return}
    const start=performance.now(),span=1500;
    (function tick(now){
      const t=Math.min((now-start)/span,1);
      target.textContent=Math.round(end*(1-Math.pow(1-t,3)));
      if(t<1)requestAnimationFrame(tick);
    })(start);
  }),{threshold:.6});
  targets.forEach(el=>{el.textContent='0';observer.observe(el)});
}

// Cartões com brilho que segue o mouse e inclinação suave.
function hoverCards(){
  const cards=[...document.querySelectorAll('.tilt')];
  const settle=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{
    if(!isIntersecting)return;
    settle.unobserve(target);
    setTimeout(()=>target.classList.add('settled'),1500);
  }),{threshold:.1});
  cards.forEach(card=>{
    settle.observe(card);
    if(!finePointer)return;
    card.addEventListener('pointermove',event=>{
      if(event.pointerType!=='mouse')return;
      const rect=card.getBoundingClientRect(),x=event.clientX-rect.left,y=event.clientY-rect.top;
      card.style.setProperty('--mx',x+'px');card.style.setProperty('--my',y+'px');
      if(!reduced){card.style.setProperty('--ry',((x/rect.width-.5)*6)+'deg');card.style.setProperty('--rx',(-(y/rect.height-.5)*6)+'deg')}
    });
    card.addEventListener('pointerleave',()=>{card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg')});
  });
}

// Abas de trabalhos: sites, vídeos e posts.
function workTabs(playSound){
  const list=document.querySelector('.work-tabs');
  if(!list)return;
  const tabs=[...list.querySelectorAll('[role=tab]')],indicator=list.querySelector('.tab-indicator');
  const place=tab=>{indicator.style.setProperty('--x',tab.offsetLeft+'px');indicator.style.setProperty('--w',tab.offsetWidth+'px')};
  function select(tab,focus){
    tabs.forEach(item=>{
      const on=item===tab;
      item.setAttribute('aria-selected',String(on));item.tabIndex=on?0:-1;
      document.getElementById(item.getAttribute('aria-controls')).hidden=!on;
    });
    place(tab);
    list.scrollTo({left:tab.offsetLeft-12,behavior:reduced?'auto':'smooth'});
    if(focus)tab.focus({preventScroll:true});
  }
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>{select(tab);playSound('click')});
    tab.addEventListener('keydown',event=>{
      const move={ArrowRight:1,ArrowLeft:-1}[event.key];
      if(move){event.preventDefault();select(tabs[(index+move+tabs.length)%tabs.length],true)}
      else if(event.key==='Home'){event.preventDefault();select(tabs[0],true)}
      else if(event.key==='End'){event.preventDefault();select(tabs[tabs.length-1],true)}
    });
  });
  const current=()=>tabs.find(tab=>tab.getAttribute('aria-selected')==='true');
  place(current());
  new ResizeObserver(()=>place(current())).observe(list);
  document.fonts?.ready.then(()=>place(current()));
}

// Vídeos do portfólio: tocam quando aparecem na tela e pausam ao sair. Clique ou Enter alterna.
function phoneVideos(){
  document.querySelectorAll('.phone').forEach(phone=>{
    const video=phone.querySelector('video'),progress=phone.querySelector('.phone-progress span');
    if(!video)return;
    let visible=false,userPaused=reduced;
    const sync=()=>{if(visible&&!document.hidden&&!userPaused)video.play().catch(()=>{});else video.pause()};
    new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()},{threshold:.35}).observe(video);
    document.addEventListener('visibilitychange',sync);
    video.addEventListener('timeupdate',()=>{if(video.duration)progress.style.transform=`scaleX(${video.currentTime/video.duration})`});
    phone.tabIndex=0;phone.setAttribute('role','button');phone.setAttribute('aria-label','Pausar ou reproduzir o vídeo');
    const toggle=()=>{userPaused=!userPaused;sync()};
    phone.addEventListener('click',toggle);
    phone.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();toggle()}});
  });
}

// Cursor próprio no desktop: ponto exato e anel que segue com atraso.
function customCursor(){
  const cursor=document.querySelector('.cursor');
  if(!cursor)return;
  const dot=cursor.querySelector('.cursor-dot'),ring=cursor.querySelector('.cursor-ring');
  let x=innerWidth/2,y=innerHeight/2,ringX=x,ringY=y;
  cursor.classList.add('hidden');root.classList.add('has-cursor');
  addEventListener('pointermove',event=>{
    if(event.pointerType!=='mouse')return;
    x=event.clientX;y=event.clientY;
    cursor.classList.remove('hidden');
    dot.style.translate=`${x}px ${y}px`;
    cursor.classList.toggle('hover',Boolean(event.target.closest?.('a,button,[role=tab],[role=button],summary,label,select,.tilt')));
  },{passive:true});
  document.addEventListener('pointerdown',()=>cursor.classList.add('down'));
  document.addEventListener('pointerup',()=>cursor.classList.remove('down'));
  root.addEventListener('pointerleave',()=>cursor.classList.add('hidden'));
  (function follow(){
    ringX+=(x-ringX)*.18;ringY+=(y-ringY)*.18;
    ring.style.translate=`${ringX}px ${ringY}px`;
    requestAnimationFrame(follow);
  })();
}

// Títulos divididos em palavras para a revelação por linha.
function splitTitles(){
  if(reduced)return;
  document.querySelectorAll('[data-split]').forEach(title=>{
    title.setAttribute('aria-label',title.innerText.replace(/\s+/g,' ').trim());
    let index=0;
    const walk=node=>[...node.childNodes].forEach(child=>{
      if(child.nodeType===3){
        const fragment=document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach(part=>{
          if(!part)return;
          if(/^\s+$/.test(part)){fragment.append(' ');return}
          const outer=document.createElement('span'),inner=document.createElement('span');
          outer.className='w';outer.setAttribute('aria-hidden','true');inner.className='wi';
          inner.style.setProperty('--wi',index++);inner.textContent=part;outer.append(inner);fragment.append(outer);
        });
        child.replaceWith(fragment);
      }else if(child.nodeType===1&&child.tagName!=='BR')walk(child);
    });
    walk(title);
  });
}
