'use strict';
import {initSiteSound} from './site-sound.js?v=13';
import {buildWhatsAppUrl} from './whatsapp.js?v=10';
import {initHeroTilt} from './hero-tilt.js?v=13';
import {initMotion} from './motion.js?v=15';
const root=document.documentElement;
root.classList.add('motion-enabled','js-motion');

const {playSound,soundOnScroll}=initSiteSound();

const revealObserver=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{if(isIntersecting){target.classList.add('visible');revealObserver.unobserve(target)}}),{threshold:.1});
const observeReveal=el=>revealObserver.observe(el);
document.querySelectorAll('.reveal').forEach(observeReveal);
const hero=document.querySelector('.hero'),dock=document.querySelector('.floating-dock'),navLinks=[...document.querySelectorAll('.dock-item[href^="#"]')];
const navSections=navLinks.map(link=>document.querySelector(link.getAttribute('href')));
let scrollPending=false;
function updateScroll(){hero.style.setProperty('--hero-scroll',Math.min(scrollY,hero.offsetHeight)+'px');dock.classList.toggle('on-dark',scrollY>hero.offsetHeight-90);let active=0;navSections.forEach((section,i)=>{if(section.getBoundingClientRect().top<innerHeight*.35)active=i});navLinks.forEach((link,i)=>{link.classList.toggle('active',i===active);if(i===active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')});soundOnScroll();scrollPending=false}
window.addEventListener('scroll',()=>{if(!scrollPending){scrollPending=true;requestAnimationFrame(updateScroll)}},{passive:true});window.addEventListener('resize',updateScroll);updateScroll();
if(matchMedia('(pointer:fine)').matches){hero.addEventListener('pointermove',e=>{hero.style.setProperty('--scene-x',((e.clientX/innerWidth-.5)*16)+'px');hero.style.setProperty('--scene-y',((e.clientY/innerHeight-.5)*8)+'px')});hero.addEventListener('pointerleave',()=>{hero.style.setProperty('--scene-x','0px');hero.style.setProperty('--scene-y','0px')})}
initHeroTilt({window,document,hero});
const ideaSwitch=document.querySelector('.idea-switch');
ideaSwitch.addEventListener('click',()=>{const on=ideaSwitch.getAttribute('aria-checked')!=='true';ideaSwitch.setAttribute('aria-checked',String(on));ideaSwitch.closest('.about-statement').classList.toggle('illuminated',on);playSound('switch')});

// Three identical sequences let the visible rail wrap without a reset at its edge.
const carousel=document.querySelector('.carousel'),originalSteps=[...carousel.querySelectorAll('.step')];
const cloneStep=step=>{const clone=step.cloneNode(true);clone.setAttribute('aria-hidden','true');clone.inert=true;return clone};
const before=document.createDocumentFragment(),after=document.createDocumentFragment();originalSteps.forEach(step=>{before.append(cloneStep(step));after.append(cloneStep(step))});carousel.prepend(before);carousel.append(after);
let cycleWidth=0,carouselVisible=false,dragging=false,manualUntil=0,travel=0,lastFrame=performance.now(),position=0;
function measureCarousel(){cycleWidth=originalSteps[0].offsetLeft-carousel.firstElementChild.offsetLeft;position=cycleWidth;carousel.scrollLeft=position}
requestAnimationFrame(measureCarousel);window.addEventListener('resize',()=>requestAnimationFrame(measureCarousel));
function normalize(){if(!cycleWidth)return;if(position>cycleWidth*1.5)position-=cycleWidth;else if(position<cycleWidth*.5)position+=cycleWidth;carousel.scrollLeft=position}
function autoFrame(now){const dt=Math.min((now-lastFrame)/1000,.05);lastFrame=now;if(carouselVisible&&!document.hidden&&!dragging&&now>manualUntil&&cycleWidth&&!travel){position+=dt*(matchMedia('(max-width:700px)').matches?115:180);normalize()}requestAnimationFrame(autoFrame)}requestAnimationFrame(autoFrame);
new IntersectionObserver(entries=>{carouselVisible=entries[0].isIntersecting},{threshold:.1}).observe(carousel);
function stopTravel(){cancelAnimationFrame(travel);travel=0}
function move(direction){manualUntil=performance.now()+1800;stopTravel();const stride=originalSteps[1].offsetLeft-originalSteps[0].offsetLeft,from=carousel.scrollLeft,target=from+direction*stride,start=performance.now();function frame(now){const t=Math.min((now-start)/500,1);position=from+(target-from)*(1-Math.pow(1-t,3));carousel.scrollLeft=position;if(t<1)travel=requestAnimationFrame(frame);else{travel=0;normalize()}}travel=requestAnimationFrame(frame)}
document.getElementById('prev').addEventListener('click',()=>move(-1));document.getElementById('next').addEventListener('click',()=>move(1));
carousel.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}});

carousel.addEventListener('wheel',()=>{manualUntil=performance.now()+1800;stopTravel();position=carousel.scrollLeft},{passive:true});
let pointerX=0,startScroll=0;carousel.addEventListener('pointerdown',e=>{manualUntil=performance.now()+1800;stopTravel();if(e.pointerType!=='mouse')return;dragging=true;pointerX=e.clientX;startScroll=carousel.scrollLeft;carousel.setPointerCapture(e.pointerId);carousel.classList.add('dragging')});
carousel.addEventListener('pointermove',e=>{if(dragging){position=startScroll+pointerX-e.clientX;normalize()}});
function release(){dragging=false;carousel.classList.remove('dragging');position=carousel.scrollLeft;manualUntil=performance.now()+1800}carousel.addEventListener('pointerup',release);carousel.addEventListener('pointercancel',release);
carousel.addEventListener('scroll',()=>{if(!dragging&&!travel&&performance.now()<manualUntil)position=carousel.scrollLeft},{passive:true});
document.addEventListener('visibilitychange',()=>{lastFrame=performance.now();if(document.hidden)stopTravel()});

if(matchMedia('(pointer:fine)').matches){document.querySelectorAll('.physical-button').forEach(button=>{button.addEventListener('pointermove',e=>{const r=button.getBoundingClientRect();button.style.setProperty('--mag-x',(e.clientX-r.left-r.width/2)*.045+'px');button.style.setProperty('--mag-y',(e.clientY-r.top-r.height/2)*.09+'px')});button.addEventListener('pointerleave',()=>{button.style.setProperty('--mag-x','0px');button.style.setProperty('--mag-y','0px')})})}

initMotion({playSound});

document.getElementById('year').textContent=new Date().getFullYear();
document.getElementById('brief-form').addEventListener('submit',e=>{
  e.preventDefault();
  const form=new FormData(e.target),status=document.getElementById('form-status');
  try{
    const url=buildWhatsAppUrl({brand:form.get('brand'),service:form.get('service'),idea:form.get('idea')});
    status.textContent='Seu resumo está pronto. Confirme o envio no WhatsApp.';
    window.location.assign(url);
  }catch(error){status.textContent=error.message;}
});
