(() => {
  'use strict';
  const D = window.PC;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const root = document.documentElement;
  const reduce = false; // animações sempre ligadas
  const fine = root.classList.contains('fine');
  const params = new URLSearchParams(location.search);
  const cssVar = n => getComputedStyle(root).getPropertyValue(n).trim();

  gsap.registerPlugin(ScrollTrigger);

  /* ------------------------------------------------ idioma */
  let lang = 'pt';
  try { lang = localStorage.getItem('pc-lang') || 'pt'; } catch (e) {}
  const t = k => (D.i18n[lang] && D.i18n[lang][k]) || D.i18n.pt[k] || k;

  /* ------------------------------------------------ rotas: cada seção tem link próprio (/videos/, /sites/...) */
  const ROUTES = D.routes;
  const BASE_PATH = new URL(document.baseURI).pathname;
  function routeFromPath() {
    let p = location.pathname;
    if (p.startsWith(BASE_PATH)) p = p.slice(BASE_PATH.length);
    p = p.replace(/index\.html$/, '').replace(/\/+$/, '');
    return Object.prototype.hasOwnProperty.call(ROUTES, p) ? p : '';
  }
  const route = routeFromPath() || (ROUTES[root.dataset.route] ? root.dataset.route : '');
  let current = route, lockUntil = route ? performance.now() + 4000 : 0; // link direto: não troca o endereço antes de chegar na seção
  const lockSync = ms => { lockUntil = Math.max(lockUntil, performance.now() + ms); };
  function setURL(r, push) {
    if (!ROUTES[r] && r !== '') return;
    current = r;
    document.title = ROUTES[r].title;
    const u = BASE_PATH + (r ? r + '/' : '');
    if (location.pathname === u) return;
    try { history[push ? 'pushState' : 'replaceState']({ r }, '', u); } catch (e) {}
  }

  /* ------------------------------------------------ scroll suave */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const barH = () => $('.bar').offsetHeight;
  const offsetFor = el => (typeof el === 'number' ? 0 : el.classList.contains('sec') ? -(barH() + 64) : -(barH() - 1));
  const routeTarget = r => (r === '' ? 0 : $(ROUTES[r].sel));
  function scrollToTarget(target, immediate) {
    if (target === null) return;
    if (lenis) lenis.scrollTo(target, { duration: 1.4, offset: offsetFor(target), immediate: !!immediate, force: true });
    else if (typeof target === 'number') window.scrollTo(0, target);
    else window.scrollTo(0, target.getBoundingClientRect().top + scrollY + offsetFor(target));
  }
  function goRoute(r, push) {
    lockSync(1700);
    scrollToTarget(routeTarget(r));
    setURL(r, push);
  }
  document.addEventListener('click', e => {
    if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[data-route], a[href^="#"]');
    if (!a) return;
    if (a.hasAttribute('data-route')) { e.preventDefault(); goRoute(a.dataset.route, true); return; }
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const el = id === '#inicio' ? 0 : $(id);
    if (el === null) return;
    e.preventDefault();
    scrollToTarget(el);
  });
  addEventListener('popstate', () => { const r = routeFromPath(); lockSync(1700); scrollToTarget(routeTarget(r)); current = r; document.title = ROUTES[r].title; });
  $('#toTop').addEventListener('click', () => goRoute('', true));

  /* ------------------------------------------------ seções de trabalho */
  const arrow = '<i aria-hidden="true">↗</i>';
  const host = u => u.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
  $('#gPosts').innerHTML = D.posts.map((it, i) =>
    `<button type="button" class="card" data-group="posts" data-i="${i}" data-cursor="cur_view" aria-label="${esc(it.title)}">
      <img src="${it.src}" alt="${esc(it.title)}" width="${it.w}" height="${it.h}" loading="lazy" decoding="async">
      <span class="card__cap">${esc(it.title)}${arrow}</span></button>`).join('');
  $('#gVideos').innerHTML = D.videos.map((it, i) =>
    `<div class="vcard" data-group="videos" data-i="${i}" data-cursor="cur_play" role="button" tabindex="0" aria-label="${esc(it.title)}">
      <div class="card"><img src="${it.src}" alt="${esc(it.title)}" width="${it.w}" height="${it.h}" loading="lazy" decoding="async">
      <span class="vcard__play" aria-hidden="true"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg></span></div>
      <p class="vcard__title">${esc(it.title)}</p></div>`).join('');
  $('#gSites').innerHTML = D.sites.map((it, i) =>
    `<button type="button" class="browser" data-group="sites" data-i="${i}" data-cursor="cur_site" aria-label="${esc(it.title)}">
      <span class="browser__top"><i></i><i></i><i></i><span class="browser__url" ${it.url ? '' : 'data-soon'}>${it.url ? esc(host(it.url)) : ''}</span></span>
      <span class="browser__shot"><img src="${it.long}" alt="Prévia do site ${esc(it.title)}" width="${it.lw}" height="${it.lh}" loading="lazy" decoding="async"><span class="browser__go" data-preview></span></span>
      <span class="browser__meta"><span class="browser__title">${esc(it.title)}</span><span class="browser__kind">${esc(it.kind)}</span></span></button>`).join('');
  $('#gIds').innerHTML = D.ids.map((it, i) => it.url
    ? `<a class="card card--pres" href="${it.url}" target="_blank" rel="noopener" data-cursor="cur_pres" aria-label="${esc(it.title)}: ${esc(t('see_pres'))}">
      <img src="${it.src}" alt="Identidade visual ${esc(it.title)}" width="${it.w}" height="${it.h}" loading="lazy" decoding="async">
      <span class="card__tag" data-pres-tag></span>
      <span class="card__cap">${esc(it.title)}${arrow}</span></a>`
    : `<button type="button" class="card" data-group="ids" data-i="${i}" data-cursor="cur_view" aria-label="${esc(it.title)}">
      <img src="${it.src}" alt="Identidade visual ${esc(it.title)}" width="${it.w}" height="${it.h}" loading="lazy" decoding="async">
      <span class="card__cap">${esc(it.title)}${arrow}</span></button>`).join('');
  $('#cPosts').textContent = D.posts.length;
  $('#cVideos').textContent = D.videos.length;
  $('#cSites').textContent = D.sites.length;
  $('#cIds').textContent = D.ids.length;

  /* ------------------------------------------------ serviços: um efeito diferente para cada linha */
  const SVC = [
    { route: 'posts', mode: 'posts' },
    { route: 'videos', mode: 'video', img: 'assets/yt-_k_vZQakGjU-max.jpg' },
    { route: 'sites', mode: 'site', img: 'assets/preview-lucas.jpg' },
    { route: 'identidades', mode: 'id', img: 'assets/identidade-flor.webp' },
    { route: 'contato', mode: 'mgmt' }
  ];
  function buildSvc() {
    $('#svc').innerHTML = t('svc').map(([n, d], i) =>
      `<li><a class="svc__row" href="${SVC[i].route}/" data-route="${SVC[i].route}" data-mode="${SVC[i].mode}">
        <span class="svc__name">${esc(n)}</span><span class="svc__desc">${esc(d)}</span>
        <span class="svc__arrow" aria-hidden="true">→</span></a></li>`).join('');
    $('#svcChips').innerHTML = t('mgmt').map((c, i) => `<span class="chip chip--${i % 4}">${esc(c)}</span>`).join('') +
      '<svg class="trend" viewBox="0 0 120 60" aria-hidden="true"><path pathLength="1" d="M4 54 L34 34 L56 42 L84 16 L116 6"/><path class="trend__tip" d="M100 4 L117 5 L112 21"/></svg>';
  }
  const floatEl = $('.svc__float'), floatImg = $('#svcImg');
  let svcMode = null, cycleId = null, ci = 0;
  const postImgs = [];
  function stopCycle() { clearInterval(cycleId); cycleId = null; }
  function startCycle() {
    if (!postImgs.length) D.posts.forEach(p => { const im = new Image(); im.decoding = 'async'; im.src = p.src; postImgs.push(im); });
    stopCycle();
    const show = () => {
      for (let k = 0; k < postImgs.length; k++) {
        ci = (ci + 1) % postImgs.length;
        if (postImgs[ci].complete && postImgs[ci].naturalWidth) break;
      }
      floatImg.src = postImgs[ci].src;
      if (!reduce) gsap.fromTo(floatImg, { scale: 1.14 }, { scale: 1, duration: 0.45, ease: 'power3.out', overwrite: true });
    };
    show();
    cycleId = setInterval(show, 500); // troca de post a cada 0,5 s
  }
  function showChips() {
    const chips = $$('.chip', floatEl);
    gsap.fromTo(chips, { scale: 0, rotate: () => gsap.utils.random(-40, 40), y: 30 },
      { scale: 1, rotate: i => [-7, 5, -3, 8][i % 4], y: 0, duration: 0.55, ease: 'back.out(2.2)', stagger: 0.08, overwrite: true });
    gsap.fromTo($('.trend path', floatEl), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out', delay: 0.2, overwrite: true });
    gsap.fromTo('.trend__tip', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, delay: 0.85, overwrite: true });
  }
  function setSvcMode(m) {
    if (m === svcMode) return;
    svcMode = m;
    floatEl.dataset.mode = m;
    stopCycle();
    const item = SVC.find(s => s.mode === m);
    if (m === 'posts') startCycle();
    else if (m === 'mgmt') showChips();
    else floatImg.src = item.img;
  }
  const fx = gsap.quickTo(floatEl, 'x', { duration: 0.6, ease: 'power3' });
  const fy = gsap.quickTo(floatEl, 'y', { duration: 0.6, ease: 'power3' });
  const showFloat = row => {
    setSvcMode(row.dataset.mode);
    gsap.to(floatEl, { scale: 1, rotate: row.dataset.mode === 'mgmt' ? 0 : gsap.utils.random(-6, 6), duration: 0.5, ease: 'back.out(2)', overwrite: 'auto' });
  };
  const hideFloat = () => {
    stopCycle(); svcMode = null;
    gsap.to(floatEl, { scale: 0, duration: 0.35, ease: 'power2.in', overwrite: 'auto' });
  };

  /* com o mouse: a miniatura segue o cursor */
  let mouseIn = false;
  if (fine) {
    addEventListener('pointermove', e => { if (autoRow) return; fx(e.clientX + 28); fy(e.clientY - floatEl.offsetHeight / 2); }, { passive: true });
    $('#svc').addEventListener('pointerover', e => {
      const row = e.target.closest('.svc__row');
      if (!row) return;
      mouseIn = true;
      clearAuto();
      showFloat(row);
    });
    $('#svc').addEventListener('pointerleave', () => { mouseIn = false; hideFloat(); });
  }

  /* rolando: cada linha acende uma vez e mostra a miniatura como se o mouse estivesse em cima;
     parou de rolar, as miniaturas somem e voltam só com o mouse */
  let autoRow = null, idleId = 0;
  const seenRows = new Set();
  function clearAuto() {
    if (autoRow) autoRow.classList.remove('is-auto');
    autoRow = null;
    floatEl.classList.remove('is-auto');
  }
  function placeFloat(row) {
    const r = row.getBoundingClientRect();
    const w = floatEl.offsetWidth, h = floatEl.offsetHeight;
    fx(fine ? r.left + r.width * 0.56 : innerWidth - w - 14);
    fy(r.top + r.height / 2 - h / 2);
  }
  function autoPreview() {
    if (mouseIn) return;
    const list = $('#svc'), lr = list.getBoundingClientRect();
    if (lr.bottom < 0 || lr.top > innerHeight) { seenRows.clear(); if (autoRow) { clearAuto(); hideFloat(); } return; }
    const line = innerHeight * 0.5;
    const row = $$('.svc__row', list).find(el => { const r = el.getBoundingClientRect(); return r.top <= line && r.bottom >= line; });
    if (row && row !== autoRow && !seenRows.has(row)) {
      clearAuto();
      autoRow = row;
      seenRows.add(row);
      row.classList.add('is-auto');
      floatEl.classList.add('is-auto');
      showFloat(row);
      placeFloat(row);
    } else if (autoRow && row === autoRow) {
      placeFloat(row);
    } else if (autoRow && row !== autoRow) {
      clearAuto(); hideFloat();
    }
    clearTimeout(idleId);
    idleId = setTimeout(() => { if (autoRow) { clearAuto(); hideFloat(); } }, 700);
  }
  addEventListener('scroll', autoPreview, { passive: true });

  /* ------------------------------------------------ faixas cruzadas */
  const bands = [];
  const tri = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21 12 3l9 18z"/></svg>';
  function buildBands() {
    bands.length = 0;
    [['#bandA', 'ticker_a', 1], ['#bandB', 'ticker_b', -1]].forEach(([sel, key, dir]) => {
      const track = $(sel);
      track.innerHTML = '';
      const set = document.createElement('div');
      set.style.display = 'flex';
      set.innerHTML = t(key).map(s => `<span class="band__item">${esc(s)}${tri}</span>`).join('');
      track.appendChild(set);
      const w = set.getBoundingClientRect().width || 1;
      const copies = Math.ceil((innerWidth * 1.3) / w) + 1;
      for (let i = 0; i < copies; i++) track.appendChild(set.cloneNode(true));
      bands.push({ track, w, x: dir < 0 ? -w : 0, dir });
    });
  }

  /* ------------------------------------------------ divisão de texto em letras / palavras */
  function splitChars(el) {
    const words = el.textContent.trim().split(/\s+/);
    el.setAttribute('aria-label', el.textContent.trim());
    el.innerHTML = words.map(w =>
      `<span class="split-line" aria-hidden="true">${Array.from(w).map(c => `<span class="ch">${esc(c)}</span>`).join('')}</span>`
    ).join(' ');
    return $$('.ch', el);
  }
  function splitWords(el) {
    const walk = node => {
      Array.from(node.childNodes).forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          (n.textContent.match(/\S+\s*|\s+/g) || []).forEach(tok => {
            const s = document.createElement('span');
            s.className = 'w'; s.textContent = tok; frag.appendChild(s);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(el);
    return $$('.w', el);
  }

  /* ------------------------------------------------ sobre mim: dados, habilidades e ferramentas */
  function buildAbout() {
    $('#facts').innerHTML = t('facts').map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');
    $('#skills').innerHTML = t('skills').map(s => `<li>${esc(s)}</li>`).join('');
    $('#tools').innerHTML = D.tools.map(s => `<li><img src="${s.icon}" alt="" width="22" height="22" loading="lazy">${esc(s.name)}</li>`).join('');
  }

  /* ------------------------------------------------ revelações no scroll */
  let langTweens = [];
  function revealSplits() {
    langTweens.forEach(tw => { tw.scrollTrigger && tw.scrollTrigger.kill(); tw.kill(); });
    langTweens = [];
    $$('[data-split]').forEach(el => {
      const chars = splitChars(el);
      if (reduce) return;
      if (!el.dataset.done) {
        langTweens.push(gsap.fromTo(chars, { yPercent: 110, rotate: 10 }, {
          yPercent: 0, rotate: 0, duration: 1, ease: 'expo.out', stagger: 0.025,
          onComplete: () => el.classList.add('is-in'),
          scrollTrigger: { trigger: el, start: 'top 88%', once: true, onEnter: () => { el.dataset.done = '1'; } }
        }));
      }
    });
    const about = $('#aboutText');
    const words = splitWords(about);
    if (!reduce) {
      langTweens.push(gsap.fromTo(words, { opacity: 0.14 }, {
        opacity: 1, ease: 'none', stagger: 0.05,
        scrollTrigger: { trigger: about, start: 'top 80%', end: 'bottom 55%', scrub: 0.6 }
      }));
    }
  }
  function setupReveals() {
    if (reduce) return;
    gsap.set('[data-reveal]', { autoAlpha: 0, y: 30 });
    const show = els => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1, overwrite: 'auto' });
    ScrollTrigger.batch('[data-reveal]', { start: 'top 90%', once: true, onEnter: show, onEnterBack: show });
    const cards = $$('.grid--posts .card, .vcard, .browser, .grid--ids .card, .svc li');
    gsap.set(cards, { autoAlpha: 0, y: 60 });
    const pop = els => gsap.fromTo(els,
      { autoAlpha: 0, y: 60, clipPath: 'inset(18% 0% 0% 0% round 14px)' },
      { autoAlpha: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 14px)', duration: 1.1, ease: 'expo.out', stagger: 0.08, clearProps: 'clipPath', overwrite: 'auto' });
    ScrollTrigger.batch(cards, { start: 'top 94%', once: true, onEnter: pop, onEnterBack: pop });
    // hero sobe um pouco mais devagar que o scroll
    gsap.to('.hero__stickers', { yPercent: -25, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero__title', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    // sobre: a foto abre de baixo para cima e a imagem desliza por dentro; as habilidades saltam uma a uma
    gsap.fromTo('.about__frame', { clipPath: 'inset(100% 0% 0% 0% round 26px)' }, {
      clipPath: 'inset(0% 0% 0% 0% round 26px)', duration: 1.4, ease: 'expo.out', clearProps: 'clipPath',
      scrollTrigger: { trigger: '.about__photo', start: 'top 82%', once: true }
    });
    gsap.fromTo('.about__frame img', { yPercent: -8, scale: 1.15 }, { yPercent: 8, scale: 1.15, ease: 'none', scrollTrigger: { trigger: '.about__photo', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.from('.about__tag', { scale: 0, rotate: -40, duration: 0.9, ease: 'back.out(2.2)', scrollTrigger: { trigger: '.about__photo', start: 'top 60%', once: true } });
    gsap.from('#facts > div', { autoAlpha: 0, y: 24, duration: 0.8, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: '#facts', start: 'top 88%', once: true } });
    ['#skills', '#tools'].forEach(sel => gsap.from(sel + ' li', {
      autoAlpha: 0, scale: 0.4, y: 20, rotate: () => gsap.utils.random(-14, 14), duration: 0.7, ease: 'back.out(2)', stagger: 0.06,
      scrollTrigger: { trigger: sel, start: 'top 90%', once: true }
    }));
    // faixas giram um pouco com o scroll
    gsap.fromTo('.band--y', { rotate: -6 }, { rotate: -1, ease: 'none', scrollTrigger: { trigger: '.bands', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.fromTo('.band--p', { rotate: 5 }, { rotate: 1, ease: 'none', scrollTrigger: { trigger: '.bands', start: 'top bottom', end: 'bottom top', scrub: true } });
  }

  /* abas ativas + dock ativo + endereço acompanha a seção */
  function setupSync() {
    const tabs = $$('.tab');
    ['posts', 'videos', 'sites', 'identidades'].forEach((id, i) => {
      ScrollTrigger.create({
        trigger: '#' + id, start: 'top 40%', end: 'bottom 40%',
        onToggle: self => { if (self.isActive) tabs.forEach((tb, k) => tb.classList.toggle('is-active', k === i)); }
      });
    });
    ScrollTrigger.create({ trigger: '.works', start: 'top 40%', end: 'bottom 40%', onLeaveBack: () => tabs.forEach(tb => tb.classList.remove('is-active')) });
    const dockLinks = $$('.dock a');
    ['#trabalhos', '#sobre', '#contato'].forEach((id, i) => {
      ScrollTrigger.create({ trigger: id, start: 'top 50%', end: 'bottom 50%', onToggle: s => dockLinks[i].classList.toggle('is-active', s.isActive) });
    });
    [['', '#inicio'], ['sobre', '#sobre'], ['trabalhos', '.works__head'], ['posts', '#posts'], ['videos', '#videos'],
      ['sites', '#sites'], ['identidades', '#identidades'], ['contato', '#contato']].forEach(([r, sel]) => {
      ScrollTrigger.create({
        trigger: sel, start: 'top 50%', end: 'bottom 50%',
        onToggle: s => { if (s.isActive && performance.now() > lockUntil && r !== current) setURL(r, false); }
      });
    });
  }

  /* ------------------------------------------------ aplicar idioma */
  function applyLang() {
    root.lang = lang === 'pt' ? 'pt-BR' : 'en';
    $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
    $$('.roll span').forEach(s => { s.dataset.text = s.textContent; });
    $$('.hero__title [data-i18n]').forEach(el => { el.innerHTML = el.textContent.split(' ').map(w => `<span class="hw">${Array.from(w).map(c => `<span class="hc">${esc(c)}</span>`).join('')}</span>`).join(' '); });
    $$('[data-preview]').forEach(s => { s.textContent = t('see_preview'); });
    $$('[data-soon]').forEach(s => { s.textContent = t('soon'); });
    $$('[data-pres-tag]').forEach(s => { s.textContent = t('pres_tag'); });
    $('#lbPrev').setAttribute('aria-label', t('prev'));
    $('#lbNext').setAttribute('aria-label', t('next'));
    $('#lbClose').setAttribute('aria-label', t('close'));
    $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    buildSvc();
    buildAbout();
    buildBands();
    revealSplits();
    ScrollTrigger.refresh();
  }
  $$('.lang button').forEach(b => b.addEventListener('click', () => {
    lang = b.dataset.lang;
    try { localStorage.setItem('pc-lang', lang); } catch (e) {}
    applyLang();
    $$('#svc li, #skills li, #tools li, #facts > div').forEach(li => gsap.set(li, { autoAlpha: 1, y: 0, scale: 1, rotate: 0 }));
  }));

  /* ------------------------------------------------ cursor triângulo */
  const cursor = $('.cursor');
  if (fine) {
    const dur = reduce ? 0 : 0.12;
    const cx = gsap.quickTo(cursor, 'x', { duration: dur, ease: 'power3' });
    const cy = gsap.quickTo(cursor, 'y', { duration: dur, ease: 'power3' });
    addEventListener('pointermove', e => { cursor.classList.add('is-on'); cx(e.clientX); cy(e.clientY); }, { passive: true });
    document.addEventListener('pointerleave', () => cursor.classList.remove('is-on'));
    document.addEventListener('pointerover', e => {
      const lab = e.target.closest('[data-cursor]');
      const link = e.target.closest('a, button, [role="button"], .badge__card, .obj');
      cursor.classList.toggle('is-label', !!lab);
      cursor.classList.toggle('is-link', !lab && !!link);
      if (lab) $('.cursor__label', cursor).textContent = t(lab.dataset.cursor);
    });
    addEventListener('pointerdown', () => gsap.fromTo('.cursor__tri', { scale: 0.7 }, { scale: 1, duration: 0.4, ease: 'back.out(3)', clearProps: 'scale' }));
  }
  if (fine && !reduce) {
    $$('.magnetic').forEach(el => {
      const mx = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
      const my = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        mx((e.clientX - (r.left + r.width / 2)) * 0.3);
        my((e.clientY - (r.top + r.height / 2)) * 0.45);
      });
      el.addEventListener('pointerleave', () => { mx(0); my(0); });
    });
  }

  /* ------------------------------------------------ barra: ao rolar, fecha no nome "peagá" e fica flutuando */
  const bar = $('.bar'), barIn = $('.bar__in'), brandEl = $('.brand'), prog = $('.bar__progress');
  const barItems = $$('.bar__nav, .bar__tools');
  let barState = 'full';
  const shown = () => barItems.filter(el => getComputedStyle(el).display !== 'none');
  const padX = () => parseFloat(getComputedStyle(barIn).paddingLeft) * 2 + 2;
  const gapX = () => parseFloat(getComputedStyle(barIn).columnGap) || 0;
  const fullW = () => bar.clientWidth - parseFloat(getComputedStyle(bar).paddingLeft) * 2;
  const miniW = () => brandEl.offsetWidth + padX();
  const openW = () => Math.min(fullW(), miniW() + shown().reduce((s, el) => s + el.offsetWidth + gapX(), 0));
  function setBar(state) {
    if (state === barState) return;
    barState = state;
    bar.classList.toggle('is-mini', state !== 'full');
    bar.classList.toggle('is-open', state === 'open');
    gsap.killTweensOf([barIn, ...barItems]);
    if (state === 'mini') {
      gsap.to(barItems, { autoAlpha: 0, x: -50, scale: 0.6, duration: 0.35, ease: 'power2.in', stagger: { each: 0.05, from: 'end' } });
      gsap.fromTo(barIn, { width: barIn.offsetWidth }, { width: miniW(), duration: 0.75, ease: 'expo.inOut', delay: 0.05 });
      gsap.fromTo(brandEl, { scale: 1 }, { scale: 1.12, duration: 0.3, yoyo: true, repeat: 1, delay: 0.55, ease: 'power2.out' });
    } else {
      const w = state === 'open' ? openW() : fullW();
      gsap.fromTo(barIn, { width: barIn.offsetWidth }, {
        width: w, duration: 0.65, ease: 'expo.out',
        onComplete: () => { if (state === 'full') gsap.set(barIn, { clearProps: 'width' }); }
      });
      gsap.to(barItems, { autoAlpha: 1, x: 0, scale: 1, duration: 0.5, ease: 'back.out(1.8)', stagger: 0.06, delay: 0.12 });
    }
  }
  let barHover = false;
  barIn.addEventListener('pointerenter', e => { if (e.pointerType !== 'mouse') return; barHover = true; if (barState === 'mini') setBar('open'); });
  barIn.addEventListener('pointerleave', e => { if (e.pointerType !== 'mouse') return; barHover = false; if (barState === 'open') setBar('mini'); });
  barIn.addEventListener('focusin', () => { if (barState === 'mini' && barIn.querySelector(':focus-visible')) setBar('open'); }); // só pelo teclado
  barIn.addEventListener('focusout', e => { if (barState === 'open' && !barIn.contains(e.relatedTarget)) setBar('mini'); });
  // no toque: o primeiro toque na pílula abre o menu, o segundo navega
  barIn.addEventListener('click', e => {
    if (barState === 'mini') { e.preventDefault(); e.stopPropagation(); setBar('open'); }
  }, true);
  document.addEventListener('pointerdown', e => { if (barState === 'open' && !barIn.contains(e.target) && e.pointerType !== 'mouse') setBar('mini'); });

  let lastY = scrollY, velS = 0;
  gsap.ticker.add((time, dt) => {
    const y = scrollY;
    velS += ((y - lastY) - velS) * 0.12;
    lastY = y;
    if (introDone) {
      if (y > 140 && barState === 'full') setBar('mini');
      else if (y < 60 && barState !== 'full') setBar('full');
      else if (barState === 'open' && Math.abs(velS) > 12 && !barHover) setBar('mini');
    }
    const max = document.documentElement.scrollHeight - innerHeight;
    prog.style.transform = `scaleX(${max > 0 ? clamp(y / max, 0, 1) : 0})`;
    if (reduce) return;
    bands.forEach(b => {
      b.x -= b.dir * (70 * dt / 1000 + Math.abs(velS) * 0.35);
      if (b.x <= -b.w) b.x += b.w;
      if (b.x > 0) b.x -= b.w;
      b.track.style.transform = `translate3d(${b.x.toFixed(2)}px,0,0)`;
    });
  });

  /* ------------------------------------------------ objetos 3D na hero */
  const objs = [];
  $$('.obj').forEach((el, i) => {
    const kind = el.dataset.obj;
    const o = window.PC3D && PC3D.mount(el, kind, { startAngle: i * 1.3, dir: i % 2 ? -1 : 1 });
    if (!o) { el.classList.add('no3d'); el.dataset.emoji = { computer: '💻', can: '🥤', headphones: '🎧' }[kind]; return; }
    if (reduce) o.setSpin(0.35);
    objs.push(o);
    el.addEventListener('pointerenter', () => o.kick(16));
    el.addEventListener('click', () => o.kick(26));
  });
  if (fine) {
    addEventListener('pointermove', e => {
      const nx = (e.clientX / innerWidth - 0.5) * 2, ny = (e.clientY / innerHeight - 0.5) * 2;
      objs.forEach(o => o.look(nx, ny));
    }, { passive: true });
  }
  gsap.ticker.add((time, dt) => objs.forEach(o => o.tick(Math.min(dt, 50) / 1000)));

  /* ------------------------------------------------ visualizador */
  const groups = { posts: D.posts, videos: D.videos, ids: D.ids, sites: D.sites };
  const lb = $('#lb'), lbMedia = $('#lbMedia'), lbVisit = $('#lbVisit');
  let cur = { g: 'posts', i: 0 }, lastFocus = null;
  function renderLB(dir) {
    const list = groups[cur.g], it = list[cur.i];
    if (it.type === 'video') {
      lbMedia.innerHTML = `<div class="lb__video"><iframe src="https://www.youtube-nocookie.com/embed/${it.yt}?autoplay=1&rel=0&playsinline=1" title="${esc(it.title)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`;
    } else if (it.type === 'site') {
      lbMedia.innerHTML = `<div class="lb__site"><div class="browser__top"><i></i><i></i><i></i><span>${it.url ? esc(host(it.url)) : esc(t('soon'))}</span></div>
        <div class="lb__scroll" data-lenis-prevent tabindex="0" aria-label="${esc(it.title)}"><img src="${it.full}" alt="Página completa do site ${esc(it.title)}" width="1280" height="${Math.round(it.lh * 1280 / it.lw)}"></div></div>`;
    } else {
      lbMedia.innerHTML = `<img src="${it.src}" alt="${esc(it.title)}" width="${it.w}" height="${it.h}">`;
    }
    $('#lbTitle').textContent = it.kind ? `${it.title} · ${it.kind}` : it.title;
    $('#lbCount').textContent = `${cur.i + 1} / ${list.length}`;
    lbVisit.hidden = !it.url;
    if (it.url) { lbVisit.href = it.url; lbVisit.textContent = t(it.type === 'id' ? 'see_pres' : 'visit'); }
    if (!reduce && dir) gsap.fromTo(lbMedia, { x: dir * 50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out' });
  }
  function openLB(g, i, from) {
    cur = { g, i }; lastFocus = from;
    renderLB();
    lb.hidden = false;
    requestAnimationFrame(() => lb.classList.add('is-open'));
    if (lenis) lenis.stop(); else document.body.style.overflow = 'hidden';
    $('#lbClose').focus({ preventScroll: true });
  }
  function closeLB() {
    lb.classList.remove('is-open');
    setTimeout(() => { lb.hidden = true; lbMedia.innerHTML = ''; }, reduce ? 0 : 350);
    if (lenis) lenis.start(); else document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  const stepLB = d => { const n = groups[cur.g].length; cur.i = (cur.i + d + n) % n; renderLB(d); };
  document.addEventListener('click', e => {
    const c = e.target.closest('[data-group]');
    if (c) openLB(c.dataset.group, +c.dataset.i, c);
  });
  document.addEventListener('keydown', e => {
    const c = e.target.closest && e.target.closest('.vcard');
    if (c && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openLB('videos', +c.dataset.i, c); }
  });
  $('#lbPrev').addEventListener('click', () => stepLB(-1));
  $('#lbNext').addEventListener('click', () => stepLB(1));
  lb.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeLB(); });
  addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLB();
    else if (e.key === 'ArrowRight') stepLB(1);
    else if (e.key === 'ArrowLeft') stepLB(-1);
    else if (e.key === 'Tab') {
      const f = $$('button, a[href]:not([hidden]), [tabindex="0"]', lb), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  {
    let sx = 0, sy = 0;
    lbMedia.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    lbMedia.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) stepLB(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  /* inclinação 3D nos cards */
  if (fine && !reduce) {
    $$('.grid--posts .card, .grid--ids .card').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        gsap.to(el, { rotationY: ((e.clientX - r.left) / r.width - 0.5) * 10, rotationX: -((e.clientY - r.top) / r.height - 0.5) * 10, transformPerspective: 900, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
      });
      el.addEventListener('pointerleave', () => gsap.to(el, { rotationY: 0, rotationX: 0, duration: 0.9, ease: 'elastic.out(1,.6)', overwrite: 'auto' }));
    });
  }

  /* ------------------------------------------------ portal para a Cravo: círculo laranja cresce do clique */
  {
    const portal = $('.portal'), portalImg = $('.portal img');
    const closePortal = () => { gsap.killTweensOf([portal, portalImg]); gsap.set(portal, { clipPath: 'circle(0px at 50% 50%)' }); gsap.set(portalImg, { opacity: 0 }); };
    document.addEventListener('click', e => {
      const a = e.target.closest('a[data-portal]');
      if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      const x = e.clientX || innerWidth / 2, y = e.clientY || innerHeight / 2;
      const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      gsap.timeline({ onComplete: () => { location.href = a.href; } })
        .fromTo(portal, { clipPath: `circle(0px at ${x}px ${y}px)` }, { clipPath: `circle(${r}px at ${x}px ${y}px)`, duration: 0.75, ease: 'expo.inOut' })
        .fromTo(portalImg, { opacity: 0, scale: 0.4, rotate: -20 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.45, ease: 'back.out(2)' }, 0.45)
        .to({}, { duration: 0.15 });
    });
    // voltando com o botão "voltar" do navegador, o círculo não pode ficar cobrindo a página
    addEventListener('pageshow', closePortal);
    // a seção aparece crescendo ao entrar na tela
    gsap.fromTo('.agency__portal', { clipPath: 'inset(10% 6% 10% 6% round 32px)' }, {
      clipPath: 'inset(0% 0% 0% 0% round 32px)', ease: 'none',
      scrollTrigger: { trigger: '.agency', start: 'top 95%', end: 'top 35%', scrub: 0.6 }
    });
  }

  /* ------------------------------------------------ contato */
  $('#waCta').href = `https://wa.me/${D.whatsapp}?text=${encodeURIComponent(D.waText)}`;

  /* ------------------------------------------------ hero viva: grade de pontos que acende perto do cursor */
  const heroEl = $('.hero');
  const heroGrid = (() => {
    const cv = $('#heroFx'), ctx = cv.getContext('2d');
    const hex = h => { const n = parseInt(h.replace('#', ''), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
    const FG = hex(cssVar('--fg'));
    let W = 0, H = 0, pts = [], visible = true;
    const mouse = { x: -9999, y: -9999, on: false };
    const st = { boot: 0 };
    function resize() {
      const r = heroEl.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1);
      W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const gap = W < 700 ? 26 : 32;
      pts = [];
      for (let y = gap / 2; y < H; y += gap) for (let x = gap / 2; x < W; x += gap) pts.push({ x, y, v: 0, d: Math.hypot(x - W / 2, y - H / 2) });
    }
    resize();
    addEventListener('resize', resize);
    new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(heroEl);
    heroEl.addEventListener('pointermove', e => { const r = heroEl.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.on = true; });
    heroEl.addEventListener('pointerleave', () => { mouse.on = false; });
    gsap.ticker.add(time => {
      if (!visible) return;
      ctx.clearRect(0, 0, W, H);
      const reach = Math.max(W, H) * 0.75 * st.boot;
      // sem mouse (celular), um ponto de luz passeia sozinho
      const ax = mouse.on ? mouse.x : W / 2 + Math.cos(time * 0.5) * W * 0.32;
      const ay = mouse.on ? mouse.y : H / 2 + Math.sin(time * 0.7) * H * 0.3;
      const R = mouse.on ? 170 : 140;
      for (const p of pts) {
        if (p.d > reach) continue;
        const dist = Math.hypot(p.x - ax, p.y - ay);
        const target = Math.max(0, 1 - dist / R);
        p.v += (target - p.v) * 0.12;
        const wave = 0.5 + 0.5 * Math.sin(time * 1.6 - p.d * 0.012);
        const edge = Math.min(1, (reach - p.d) / 120);
        // só pontinhos claros e discretos; perto do cursor eles ficam um pouco mais visíveis
        const a = (0.05 + wave * 0.04 + p.v * 0.2) * edge;
        ctx.fillStyle = `rgba(${FG[0]},${FG[1]},${FG[2]},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1 + p.v * 1.4 + wave * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    return { boot: dur => gsap.to(st, { boot: 1, duration: dur || 1.6, ease: 'power2.out' }), done: () => { st.boot = 1; } };
  })();

  /* adesivos seguem o mouse em profundidades diferentes */
  if (fine) {
    const movers = $$('.stk').map(el => ({ d: parseFloat(el.dataset.depth) || 1, x: gsap.quickTo(el, 'x', { duration: 1, ease: 'power3' }), y: gsap.quickTo(el, 'y', { duration: 1, ease: 'power3' }) }));
    addEventListener('pointermove', e => {
      const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
      movers.forEach(m => { m.x(nx * 60 * m.d); m.y(ny * 40 * m.d); });
    }, { passive: true });
  }

  /* ------------------------------------------------ entrada da hero (sem intro) */
  const barKids = [brandEl, ...barItems];
  let introDone = false;
  function hideHero() {
    gsap.set(".hero .line__in", { yPercent: 115 });
    gsap.set(".obj", { scale: 0 });
    gsap.set(".hero__sub", { autoAlpha: 0, y: 20 });
    gsap.set(".hero__btns .btn", { autoAlpha: 0, y: 30 });
    gsap.set(barKids, { autoAlpha: 0, y: -20 });
    gsap.set(".dock", { autoAlpha: 0 });
    gsap.set(".stk", { scale: 0, rotate: -30 });
    gsap.set(".hero__spin", { autoAlpha: 0 });
  }
  function revealHero() {
    if (introDone) return;
    introDone = true;
    const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.15 });
    tl.to(".hero .line__in", { yPercent: 0, duration: 1.4, stagger: 0.15 }, 0)
      .to(".obj", { scale: 1, duration: 1.1, ease: "back.out(2.4)", stagger: 0.12 }, 0.35)
      .call(() => objs.forEach(o => o.kick(18)), null, 0.45)
      .to(".hero__sub", { autoAlpha: 1, y: 0, duration: 1 }, 0.6)
      .to(".hero__btns .btn", { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1 }, 0.75)
      .to(barKids, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.06 }, 0.3)
      .to(".dock", { autoAlpha: 1, duration: 0.6 }, 0.9)
      .call(() => heroGrid.boot(1.8), null, 0)
      .to(".stk", { scale: 1, rotate: 0, duration: 1.1, ease: "back.out(2.2)", stagger: 0.09 }, 0.85)
      .to(".hero__spin", { autoAlpha: 1, duration: 0.8 }, 1.1)
      .call(() => heroEl.classList.add("is-in"), null, 1.45)
;
  }

  /* ------------------------------------------------ start */
  applyLang();
  hideHero();
  setupReveals();
  setupSync();
  if (route) {
    gsap.set([".hero .line__in", ".obj", ".hero__sub", ".hero__btns .btn", ...barKids, ".dock", ".stk", ".hero__spin"], { clearProps: "all" });
    heroEl.classList.add("is-in"); heroGrid.done(); introDone = true;
  }
  else revealHero();
  addEventListener('resize', (() => { let id; return () => { clearTimeout(id); id = setTimeout(buildBands, 200); }; })());
  if (document.fonts) document.fonts.ready.then(() => { buildBands(); ScrollTrigger.refresh(); });
  addEventListener('load', () => ScrollTrigger.refresh());

  /* link direto (ex.: /videos/): já abre na seção */
  if (route) {
    let touched = false;
    ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach(ev => addEventListener(ev, () => { touched = true; }, { once: true, passive: true }));
    const jump = () => { if (touched) return; lockSync(1500); ScrollTrigger.refresh(); scrollToTarget(routeTarget(route), true); };
    requestAnimationFrame(jump);
    if (document.fonts) document.fonts.ready.then(jump);
    addEventListener('load', () => setTimeout(jump, 50));
  }
})();
