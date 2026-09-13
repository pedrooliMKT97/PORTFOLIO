import React from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import BorderGlow from './components/BorderGlow';
import ScrollReveal from './components/ScrollReveal';

// The portfolio owner explicitly requests full motion on this presentation.
const reducedMotion = {matches:false,addEventListener(){}};

// React islands preserve the static page and its existing navigation.
document.querySelectorAll('a.button, a.nav-contact').forEach(link => {
  const host = document.createElement('span');
  host.className = 'glow-mount';
  const props = Object.fromEntries([...link.attributes].map(({name,value}) => [name === 'class' ? 'className' : name,value]));
  const children = [...link.childNodes].map((node,index) => node.nodeType === Node.TEXT_NODE ? node.textContent : <span key={index} aria-hidden="true" dangerouslySetInnerHTML={{__html:node.innerHTML}} />);
  link.replaceWith(host);
  flushSync(() => createRoot(host).render(
    <BorderGlow edgeSensitivity={30} glowColor="40 80 80" backgroundColor="#120F17" borderRadius={28} glowRadius={40} glowIntensity={1.0} coneSpread={25} animated={false} colors={['#c084fc','#f472b6','#38bdf8']}>
      <a {...props}>{children}</a>
    </BorderGlow>
  ));
});

// Keep full text available to assistive technology; visual words animate on scroll.
{
  document.querySelectorAll('.section-heading h2, .management-intro h2').forEach(heading => {
    const text = [...heading.childNodes].map(node => node.nodeName === 'BR' ? '\n' : node.textContent).join('');
    const host = document.createElement('div');
    host.className = 'scroll-root';
    heading.replaceWith(host);
    flushSync(() => createRoot(host).render(
      <ScrollReveal baseOpacity={0} enableBlur={!reducedMotion.matches} baseRotation={reducedMotion.matches ? 0 : 5} blurStrength={10} rotationEnd="top 35%" wordAnimationEnd="top 35%">{text}</ScrollReveal>
    ));
    const title = host.querySelector('h2');
    title.setAttribute('aria-label', text.replace(/\s+/g,' ').trim());
    host.querySelector('.scroll-reveal-text').setAttribute('aria-hidden','true');
  });
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}

// Reveal supporting content as it enters, including under reduced motion.
document.querySelectorAll('.management-intro>p, .service-list article, .hero-panel>p, .footer-bottom, .about-heading, .creative-pass, .toolbox').forEach(node => {
  gsap.fromTo(node, {opacity:0, y:reducedMotion.matches ? 0 : 35}, {
    opacity:1, y:0, duration:0.8, ease:'power2.out',
    scrollTrigger:{trigger:node,start:'top 92%',toggleActions:'play none none reverse'}
  });
});

// Give keyboard and touch activation an equivalent edge highlight.
document.querySelectorAll('.glow-mount').forEach(host => {
  const card = host.querySelector('.border-glow-card');
  const activate = () => {
    card.classList.add('sweep-active');
    card.style.setProperty('--edge-proximity','100');
    card.style.setProperty('--cursor-angle','90deg');
  };
  const reset = () => card.classList.remove('sweep-active');
  host.addEventListener('focusin',activate);
  host.addEventListener('focusout',reset);
  host.addEventListener('pointerdown',activate);
  host.addEventListener('pointerup',() => setTimeout(reset,220));
  host.addEventListener('pointercancel',reset);
});

// Smooth internal navigation works for both original and React-rendered links.
document.addEventListener('click',event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const target = document.getElementById(link.hash.slice(1));
  if (!target) return;
  event.preventDefault();
  history.pushState(null,'',link.hash);
  target.scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth',block:'start'});
});
