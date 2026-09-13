const config=window.PORTFOLIO;
const floatingNav=document.querySelector('nav');
floatingNav.classList.add('floating-nav');
document.body.append(floatingNav);
// The portfolio owner explicitly requests full motion on this presentation.
const reducedMotion = {matches:false,addEventListener(){}};
document.querySelectorAll('[data-wa]').forEach(a=>{a.href=`https://wa.me/${config.whatsapp}?text=${encodeURIComponent('Olá, Pedro! Vi seu portfólio e gostei do seu trabalho. Quero conversar sobre como você pode ajudar minha marca. Podemos falar sobre meu projeto?')}`;a.target='_blank';a.rel='noopener noreferrer'});
document.getElementById('year').textContent=new Date().getFullYear();
const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text)n.innerHTML=window.iconText(text);return n};
const safeURL=(value)=>{try{const u=new URL(value,location.href);return ['https:','http:'].includes(u.protocol)?u.href:''}catch{return ''}};
function picture(src,title){const image=el('img');image.src=safeURL(src);image.alt=title;image.loading='lazy';image.addEventListener('error',()=>image.replaceWith(el('div','media-error','Imagem indisponível.')));return image}

const dialog=document.getElementById('project-dialog'),content=document.getElementById('dialog-content');let origin=null, opening=false, carouselCleanup=()=>{};
function close(){
 if(!dialog.open||dialog.classList.contains('is-closing'))return;
 carouselCleanup();
 if(reducedMotion.matches){dialog.close();return;}
 dialog.classList.add('is-closing');
 setTimeout(()=>{dialog.close();dialog.classList.remove('is-closing')},180);
}
dialog.addEventListener('cancel',event=>{event.preventDefault();close()});
document.getElementById('close-dialog').onclick=close;
dialog.addEventListener('click',e=>{if(e.target===dialog){const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)close()}});
dialog.addEventListener('close',()=>{carouselCleanup();content.replaceChildren();origin?.focus()});
config.categories.forEach((category,index)=>{const button=el('button','folder');button.style.setProperty('--folder',category.color);button.style.setProperty('--reveal-delay',`${index%3*100}ms`);button.setAttribute('aria-label',`Abrir ${category.title}`);button.setAttribute('aria-haspopup','dialog');button.append(el('span','folder-back'),el('span','paper'));const front=el('span','folder-front');front.append(el('span','folder-title',category.title),el('span','folder-subtitle',category.subtitle),el('span','folder-open','Abrir pasta ↗'));button.append(front);button.onclick=()=>openCategory(category,button);document.getElementById('folders').append(button)});
function demoArt(index,wide=false){const themes=[['#0c4471','#dfdfe0'],['#ffd800','#0c4471'],['#7460cd','#fff'],['#dfdfe0','#0c4471'],['#369987','#fff'],['#4b87c1','#fff']];const a=el('div','demo-art');a.style.setProperty('--art-bg',themes[index%6][0]);a.style.setProperty('--art-color',themes[index%6][1]);a.append(el('small','',wide?'ESTUDO DE APRESENTAÇÃO':'PEAGÁ / ESTUDO VISUAL'),el('strong','',['Ideias que movem.','Menos ruído. Mais marca.','Presença com propósito.','O próximo capítulo.','Conexões reais.','Design com direção.'][index%6]),el('b','','✳'),el('span','','DEMONSTRAÇÃO • NÃO É UM PROJETO DE CLIENTE'));return a}
async function openCategory(category,button){
 if(opening||dialog.open)return;
 opening=true;origin=button;
 await releaseFolder(category,button);
 opening=false;dialog.dataset.type=category.type;const rect=button.getBoundingClientRect();dialog.style.setProperty('--origin-x',`${rect.left+rect.width/2-innerWidth/2}px`);dialog.style.setProperty('--origin-y',`${Math.max(-200,Math.min(200,rect.top+rect.height/2-innerHeight/2))}px`);document.getElementById('dialog-title').textContent=category.title;content.replaceChildren();const demo=!category.items.length;const items=demo?Array.from({length:category.type==='gallery'?6:3},(_,i)=>({title:`Estudo visual ${String(i+1).padStart(2,'0')}`,demo:true})):category.items;if(demo)content.append(el('p','demo-notice','Prévia de apresentação. Os projetos reais de Pedro serão adicionados em breve.'));if(category.type==='gallery'){const gallery=el('div','gallery');items.forEach((item,i)=>{const post=el('article','post');post.setAttribute('aria-label',item.title);post.append(item.image?picture(item.image,item.title):demoArt(i));gallery.append(post)});content.append(gallery)}else if(category.type==='sites'){renderSites(items)}else renderCarousel(items,category.type);dialog.showModal();
 const bounds=dialog.getBoundingClientRect();
 if(!reducedMotion.matches){
   dialog.animate([{opacity:0,transform:'translate('+ (rect.left+rect.width/2-bounds.left-bounds.width/2)+'px,'+(rect.top+rect.height/2-bounds.top-bounds.height/2)+'px) scale(.25)'},{opacity:1,transform:'translate(0,0) scale(1)'}],{duration:650,easing:'cubic-bezier(.16,1,.3,1)'});
 }
 content.querySelectorAll('.post,.site-card,.carousel-stage').forEach((node,i)=>node.animate(reducedMotion.matches?[{opacity:0},{opacity:1}]:[{opacity:0,transform:'translateY(100px) scale(.85) rotate(-3deg)'},{opacity:1,transform:'none'}],{duration:650,delay:180+Math.min(i,8)*55,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'}));
 if(category.type==='sites'){
  const resize=new ResizeObserver(entries=>entries.forEach(({target,contentRect})=>{const frame=target.querySelector('iframe');if(frame)frame.style.transform='scale('+contentRect.width/1280+')'}));
  content.querySelectorAll('.site-preview').forEach(preview=>resize.observe(preview));
  carouselCleanup=()=>resize.disconnect();
 }
 document.getElementById('close-dialog').focus({preventScroll:true})}

async function releaseFolder(category,button){
 if(reducedMotion.matches)return;
 const rect=button.getBoundingClientRect(), deck=el('div','folder-flight');
 deck.setAttribute('aria-hidden','true');document.body.append(deck);
 button.classList.add('folder-opening');
 const animations=category.items.slice(0,3).map((item,i)=>{
  const card=el('div','flight-card');
  Object.assign(card.style,{left:rect.left+rect.width*.18+'px',top:rect.top+30+'px',width:rect.width*.64+'px',height:rect.height*.7+'px',background:category.color});
  if(item.image)card.append(picture(item.image,''));else card.append(el('span','',item.title));
  deck.append(card);
  return card.animate([{opacity:0,transform:'translateY(35px) scale(.8)'},{opacity:1,offset:.35,transform:'translate('+((i-1)*25)+'px,-55px) rotate('+((i-1)*9)+'deg)'},{opacity:0,transform:'translate('+((i-1)*55)+'px,-150px) scale(1.1) rotate('+((i-1)*13)+'deg)'}],{duration:430,delay:i*40,easing:'cubic-bezier(.2,.7,.3,1)',fill:'both'}).finished;
 });
 await Promise.allSettled(animations);deck.remove();button.classList.remove('folder-opening');
}

function youtubeId(value){try{const u=new URL(value);if(u.hostname==='youtu.be')return /^[\w-]{11}$/.test(u.pathname.slice(1))?u.pathname.slice(1):null;if(!['youtube.com','www.youtube.com','m.youtube.com'].includes(u.hostname))return null;const id=u.searchParams.get('v')||u.pathname.split('/')[2];return /^[\w-]{11}$/.test(id)?id:null}catch{return null}}
function renderCarousel(items,type) {
  let active=0, paused=false, playing=false, timer;
  const wrapper=el('div',type==='video'?'carousel stories':'carousel');
  const stage=el('div','carousel-stage'),controls=el('div','carousel-controls');
  wrapper.setAttribute('aria-roledescription','carrossel');
  wrapper.setAttribute('aria-label',type==='video'?'Vídeos':'Identidades visuais');
  function preview(slide,item,index) {
    slide.replaceChildren(item.image?picture(item.image,item.title):demoArt(index,true));
    const id=type==='video'?youtubeId(item.youtube):null;
    if(id){
      const play=el('button','play','▶');
      play.setAttribute('aria-label','Reproduzir '+item.title);
      play.onclick=()=>{
        playing=true;clearTimeout(timer);
        const frame=el('iframe');
        frame.src='https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&playsinline=1&rel=0';
        frame.title=item.title;
        frame.referrerPolicy='strict-origin-when-cross-origin';
        frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';
        frame.allowFullscreen=true;
        slide.replaceChildren(frame);
      };
      slide.append(play);
    }
    if(!item.demo && type==='video')slide.append(el('div','slide-caption',item.title));
  }
  const slides=items.map((item,index)=>{const slide=el('article','slide');preview(slide,item,index);stage.append(slide);return slide});
  const prev=el('button','','←'),next=el('button','','→');
  prev.setAttribute('aria-label','Projeto anterior');next.setAttribute('aria-label','Próximo projeto');
  function update(){
    slides.forEach((slide,index)=>{
      if(slide.querySelector('iframe'))preview(slide,items[index],index);
      const offset=(index-active+items.length)%items.length;
      slide.className='slide '+(offset===0?'current':offset===1?'next':offset===items.length-1?'previous':'');
      slide.inert=index!==active;slide.setAttribute('aria-hidden',String(index!==active));
    });
    prev.disabled=next.disabled=items.length<2;
  }
  function move(delta){playing=false;active=(active+delta+items.length)%items.length;update();schedule()}
  prev.onclick=()=>move(-1);next.onclick=()=>move(1);wrapper.tabIndex=0;
  wrapper.onkeydown=event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();move(event.key==='ArrowLeft'?-1:1)}};
  let startX=0,startY=0;
  wrapper.addEventListener('touchstart',event=>{startX=event.changedTouches[0].clientX;startY=event.changedTouches[0].clientY},{passive:true});
  wrapper.addEventListener('touchend',event=>{const dx=event.changedTouches[0].clientX-startX,dy=event.changedTouches[0].clientY-startY;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))move(dx<0?1:-1)},{passive:true});
  controls.append(prev,next);stage.append(controls);
  const pause=el('button','carousel-pause','Pausar apresentação');
  pause.setAttribute('aria-pressed','false');
  function schedule(){clearTimeout(timer);if(!paused&&!playing&&items.length>1)timer=setTimeout(()=>{if(dialog.open&&!document.hidden)move(1);else schedule()},type==='video'?7000:5500)}
  pause.onclick=()=>{paused=!paused;pause.textContent=paused?'Continuar apresentação':'Pausar apresentação';pause.setAttribute('aria-pressed',String(paused));schedule()};
  wrapper.append(stage,pause);content.append(wrapper);update();schedule();
  carouselCleanup=()=>clearTimeout(timer);
}
function renderSites(items){const grid=el('div','site-grid');items.forEach((item,i)=>{const card=el('article','site-card'),preview=el('div','site-preview'),info=el('div');if(item.image)preview.append(picture(item.image,item.title));else if(item.url&&safeURL(item.url)){const frame=el('iframe');frame.src=safeURL(item.url);frame.title=`Prévia de ${item.title}`;frame.loading='lazy';frame.setAttribute('sandbox','allow-scripts allow-same-origin');preview.append(frame)}else{const sample=el('div','site-demo');sample.style.background=['#d3dfed','#e5dbae','#c9dbd6'][i%3];sample.append(el('span','','CONCEITO / WEBSITE'),el('strong','',['Sua marca merece um novo espaço.','Uma boa ideia começa aqui.','Feito para conectar.'][i%3]),el('span','','PRÉVIA ILUSTRATIVA'));preview.append(sample)}info.append(el('h3','',item.title));if(item.url&&safeURL(item.url)){const a=el('a','','Visitar site ↗');a.href=safeURL(item.url);a.target='_blank';a.rel='noopener noreferrer';info.append(a)}card.append(preview,info);grid.append(card)});content.append(grid)}

// Reveal once per element. Keyboard users and reduced-motion preferences bypass it.
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
  document.querySelectorAll('.folder').forEach(node => {
    node.classList.add('reveal-ready');
    observer.observe(node);
  });
  reducedMotion.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    document.querySelectorAll('.reveal-ready').forEach(node => node.classList.add('is-visible'));
  });
}
