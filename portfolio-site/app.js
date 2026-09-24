const config = window.PORTFOLIO;
const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.innerHTML = window.iconText(text);
  return node;
};
const nav = document.querySelector('nav');
if (nav) { nav.classList.add('floating-nav'); document.body.append(nav); }
document.querySelectorAll('[data-wa]').forEach(a => {
  a.href = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent('Olá, Pedro! Vi seu portfólio e gostei do seu trabalho. Quero conversar sobre como você pode ajudar minha marca. Podemos falar sobre meu projeto?')}`;
  a.target = '_blank'; a.rel = 'noopener noreferrer';
});
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
function picture(src, title) {
  const img = el('img'); img.src = src; img.alt = title; img.loading = 'lazy'; img.decoding = 'async';
  return img;
}
function externalLink(url, label, className = '') {
  const a = el('a', className, label); a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; return a;
}

// Native scroll-snap keeps touch, trackpads and keyboard navigation available.
function createCarousel(id, className, items, render, auto = 0) {
  const root = document.getElementById(id);
  if (!root) return;
  root.classList.add(className);
  root.setAttribute('aria-roledescription', 'carrossel');
  const rail = el('div', 'work-rail'); rail.tabIndex = 0;
  rail.setAttribute('aria-label', root.closest('section').querySelector('h2').textContent);
  const cards = items.map((item, index) => { const card = render(item, index); rail.append(card); return card; });
  const mobileLoop = id === 'niche-carousel';
  const mobileViewport = window.matchMedia('(max-width: 760px)');
  function loopClone(item, index) {
    const clone = render(item, index);
    clone.classList.add('niche-loop-clone');
    clone.setAttribute('aria-hidden', 'true');
    clone.tabIndex = -1;
    return clone;
  }
  if (mobileLoop) {
    rail.prepend(loopClone(items.at(-1), items.length - 1));
    items.slice(0, 3).forEach((item, index) => rail.append(loopClone(item, index)));
  }
  const controls = el('div', 'rail-controls');
  const prev = el('button', 'rail-arrow', '←'), next = el('button', 'rail-arrow', '→');
  prev.setAttribute('aria-label','Anterior'); next.setAttribute('aria-label','Próximo');
  const pause = el('button', 'rail-pause', 'Pausar apresentação');
  pause.setAttribute('aria-pressed','false');
  let paused = false, hovered = false, focused = false, visible = false, playing = false, timer, animation;
  function overflowing() { return rail.scrollWidth > rail.clientWidth + 4; }
  function schedule() {
    clearTimeout(timer);
    if (auto && (!mobileLoop || mobileViewport.matches) && !paused && !hovered && !focused && visible && !playing && !document.hidden && overflowing())
      timer = setTimeout(() => { move(1); }, auto);
  }
  function stopVideo() {
    rail.querySelectorAll('.video-frame').forEach(frame => frame.remove());
    rail.querySelectorAll('.video-card.is-playing').forEach(card => card.classList.remove('is-playing'));
    playing = false;
  }
  function jumpTo(position) {
    cancelAnimationFrame(animation);
    rail.style.scrollBehavior = 'auto';
    rail.style.scrollSnapType = 'none';
    rail.scrollLeft = position;
    requestAnimationFrame(() => {
      rail.style.scrollBehavior = '';
      rail.style.scrollSnapType = '';
    });
  }
  function animateTo(position, onComplete) {
    cancelAnimationFrame(animation);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      jumpTo(position);
      onComplete?.();
      return;
    }
    const from = rail.scrollLeft;
    const started = performance.now();
    rail.style.scrollBehavior = 'auto';
    function frame(now) {
      const progress = Math.min(1, (now - started) / 720);
      const eased = progress * progress * (3 - 2 * progress);
      rail.scrollLeft = from + (position - from) * eased;
      if (progress < 1) animation = requestAnimationFrame(frame);
      else { rail.style.scrollBehavior = ''; onComplete?.(); }
    }
    animation = requestAnimationFrame(frame);
  }
  function loopStart() {
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
    const inset = (rail.clientWidth - 2 * cards[0].offsetWidth - gap) / 2;
    return Math.max(0, cards[0].offsetLeft - inset);
  }
  function move(direction) {
    stopVideo();
    const step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : rail.clientWidth;
    if (mobileLoop && mobileViewport.matches) {
      const start = loopStart();
      const loopPoint = start + cards.length * step;
      if (direction > 0) {
        const destination = Math.min(loopPoint, rail.scrollLeft + step);
        animateTo(destination, destination >= loopPoint - 4 ? () => jumpTo(start) : undefined);
      } else if (rail.scrollLeft <= start + 4) {
        jumpTo(loopPoint);
        requestAnimationFrame(() => animateTo(loopPoint - step));
      } else animateTo(Math.max(start,rail.scrollLeft - step));
      schedule();
      return;
    }
    const max = rail.scrollWidth - rail.clientWidth;
    const end = direction > 0 && rail.scrollLeft >= max - 4;
    const start = direction < 0 && rail.scrollLeft <= 4;
    rail.scrollTo({ left:end ? 0 : start ? max : Math.max(0,Math.min(max,rail.scrollLeft + direction * step)), behavior:'smooth' });
    schedule();
  }
  prev.onclick = () => move(-1); next.onclick = () => move(1);
  rail.addEventListener('keydown', event => {
    if (event.target !== rail) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); }
  });
  rail.addEventListener('pointerdown', () => {clearTimeout(timer);cancelAnimationFrame(animation);rail.style.scrollBehavior='';});
  rail.addEventListener('pointerup', schedule);
  rail.addEventListener('pointercancel', schedule);
  root.addEventListener('mouseenter', () => {hovered=true; schedule();});
  root.addEventListener('mouseleave', () => {hovered=false; schedule();});
  root.addEventListener('focusin', () => {focused=true; schedule();});
  root.addEventListener('focusout', () => {setTimeout(() => {focused=root.contains(document.activeElement);schedule();},0);});
  root.addEventListener('video-start', () => {playing=true; schedule();});
  pause.onclick = () => {
    paused=!paused; pause.textContent=paused?'Continuar apresentação':'Pausar apresentação'; pause.setAttribute('aria-pressed',String(paused)); schedule();
  };
  controls.append(prev,next); root.append(rail,controls);
  if (mobileLoop) {
    const hint = el('p', 'drag-hint');
    hint.innerHTML = '<svg viewBox="0 0 40 16" fill="none" aria-hidden="true"><path d="M1 8h38M7 2 1 8l6 6m26-12 6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Arraste para o lado</span>';
    root.append(hint);
  }
  if(auto)root.append(pause);
  let loopPositioned = false;
  const resize = new ResizeObserver(() => {
    if (mobileLoop) {
      if (mobileViewport.matches && !loopPositioned) {jumpTo(loopStart());loopPositioned=true;}
      if (!mobileViewport.matches) loopPositioned=false;
    }
    controls.hidden=!overflowing(); pause.hidden=!overflowing();
    root.querySelectorAll('.site-preview iframe').forEach(frame => {frame.style.transform=`scale(${frame.parentElement.clientWidth/1280})`;});
    schedule();
  });
  resize.observe(rail);
  const observer = new IntersectionObserver(entries => {visible=entries[0].isIntersecting;schedule();}, {threshold:.25}); observer.observe(root);
  document.addEventListener('visibilitychange',schedule);
  window.addEventListener('pagehide',() => clearTimeout(timer));
  window.addEventListener('pageshow',schedule);
}

createCarousel('niche-carousel','niche-carousel',config.niches,(niche,index) => {
  const card=externalLink(`galeria.html?nicho=${niche.id}`,'','niche-card');
  card.style.setProperty('--niche-tone',niche.tone);
  card.setAttribute('aria-label',`${niche.title}: abrir galeria em nova aba`);
  if(niche.cover)card.append(picture(niche.cover,'')); else card.classList.add('niche-type');
  card.title=niche.title;
  card.href=new URL('galeria.html?nicho='+niche.id,location.href).href;
  card.addEventListener('click',event=>{
    if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    event.preventDefault();
    if(['127.0.0.1','localhost'].includes(location.hostname)){location.assign(card.href);return;}
    const child=window.open(card.href,'_blank');
    if(child)child.opener=null;else location.assign(card.href);
  });
  return card;
}, 3800);
const category=id=>config.categories.find(item=>item.id===id).items;
// Stories are initialized by stories.js.
createCarousel('site-carousel','site-carousel',category('sites'),item=>{
  const card=el('article','website-card'), preview=el('div','site-preview');
  const previews={
    'www.clinicanossolar.com.br':'preview-nosso-lar.png',
    'presentebabi.vercel.app':'preview-babi.png',
    'www.smpontonovo.com.br':'preview-ponto-novo.png'
  };
  const file=previews[new URL(item.url).hostname];
  if(file) preview.append(picture('assets/'+file,'Prévia do site '+item.title));
  else {
    const domain=new URL(item.url).hostname.replace(/^www\./,'');
    const fallback=el('div','site-preview-fallback');
    fallback.append(el('div','site-preview-browser',domain),el('div','site-preview-name',item.title),el('div','site-preview-action','Visitar site ↗'));
    preview.append(fallback);
  }
  const link=externalLink(item.url,'','site-preview-link');link.setAttribute('aria-label',`Visitar ${item.title} em nova aba`);link.append(preview);
  const info=el('div','website-info');info.append(el('h3','',item.title),externalLink(item.url,'Visitar site ↗'));
  card.append(link,info);return card;
});
createCarousel('identity-carousel','identity-carousel',category('identity'),item=>{
  const card=el('article','identity-card');card.append(picture(item.image,item.title),el('h3','',item.title));return card;
});

if(document.getElementById('niche-gallery')) {
  const niche=config.niches.find(item=>item.id===new URLSearchParams(location.search).get('nicho'));
  const title=document.getElementById('gallery-title'),gallery=document.getElementById('niche-gallery');
  title.textContent=niche?niche.title:'Galeria não encontrada';document.title=`${title.textContent} — peagá criativo`;
  document.getElementById('gallery-description').textContent=niche?niche.subtitle:'Volte ao portfólio e escolha um nicho.';
  if(niche?.items.length) niche.items.forEach(item=>{const card=el('figure','niche-art');card.append(picture(item.image,item.title));gallery.append(card);});
  else gallery.append(el('p','empty-gallery',niche?'Novos projetos deste nicho serão adicionados em breve.':'Esta galeria não está disponível.'));
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.animate([{opacity:0,transform:'translateY(32px)',filter:'blur(8px)'},{opacity:1,transform:'none',filter:'blur(0)'}],{duration:800,easing:'cubic-bezier(.16,1,.3,1)'});
    revealObserver.unobserve(entry.target);
  });
}, {threshold:.15});
document.querySelectorAll('.work-heading,.work-carousel').forEach(node=>revealObserver.observe(node));
