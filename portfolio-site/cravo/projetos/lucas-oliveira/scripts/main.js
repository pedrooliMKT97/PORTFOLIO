/* Interações: navbar, menu mobile, seção ativa, revelação, FAQ e formulário. */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Navbar ---------- */
  const nav = $('[data-nav]');
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 90);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const toggle = $('.nav__toggle', nav);
    const menu = $('#nav-menu');
    toggle.hidden = false;
    const label = $('.nav__toggle-label', toggle);
    const setOpen = (open, { returnFocus = false } = {}) => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      label.textContent = open ? 'Fechar' : 'Menu';
      // Foco no primeiro link após o painel ficar visível.
      if (open) setTimeout(() => { if (nav.classList.contains('is-open')) $('a', menu)?.focus(); }, 30);
      if (!open && returnFocus) toggle.focus();
    };
    setOpen(false);
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) setOpen(false, { returnFocus: true });
    });
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('is-open') && !nav.contains(e.target)) setOpen(false);
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', (m) => { if (m.matches) setOpen(false); });

    /* Seção ativa */
    const links = $$('.nav__link', nav);
    const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
    // "Como funciona" pertence a "Atendimento"; "Contato" não tem link próprio.
    const alias = { 'como-funciona': 'servicos' };
    const sections = $$('main section[id]');
    if ('IntersectionObserver' in window && sections.length) {
      const visible = new Map();
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => visible.set(en.target.id, en.isIntersecting ? en.intersectionRatio : 0));
        let best = null, score = 0;
        visible.forEach((r, id) => { if (r > score) { score = r; best = id; } });
        const key = alias[best] || best;
        links.forEach((a) => a.removeAttribute('aria-current'));
        map.get(key)?.setAttribute('aria-current', 'location');
      }, { rootMargin: '-35% 0px -50% 0px', threshold: [0, .01, .25, .5, 1] });
      sections.forEach((s) => io.observe(s));
    }
  }

  /* ---------- Revelação ao rolar ---------- */
  const revealEls = $$('[data-reveal], [data-panel]');
  if ('IntersectionObserver' in window && revealEls.length) {
    try {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      // Elementos já na tela partem visíveis; só os de baixo animam.
      const vh = window.innerHeight;
      revealEls.forEach((el) => {
        if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add('is-visible');
        else io.observe(el);
      });
      document.documentElement.classList.add('js-reveal');
    } catch { /* conteúdo continua visível */ }
  }

  /* ---------- Entrada da hero ---------- */
  const hero = $('.hero');
  if (hero) {
    let started = false;
    const start = () => { if (!started) { started = true; hero.classList.add('is-in'); document.documentElement.classList.add('site-in'); } };
    document.documentElement.classList.add('js-anim');
    if ($('.intro-overlay')) {
      document.addEventListener('lo:intro-out', start, { once: true });
      setTimeout(start, 2400); // segurança
    } else setTimeout(start, 60);
  }

  /* ---------- Hero recua ao rolar (texto sobe e some, foto aproxima) ---------- */
  const heroInner = $('.hero__inner');
  const heroPic = $('.hero__bg picture');
  if (heroInner && heroPic) {
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = Math.min(window.scrollY, innerHeight);
      const p = y / innerHeight; // 0..1
      heroInner.style.transform = p ? `translate3d(0, ${(-y * 0.25).toFixed(1)}px, 0)` : '';
      heroInner.style.opacity = p ? String(Math.max(0, 1 - p * 1.4)) : '';
      heroPic.style.transform = p ? `scale(${(1 + p * 0.12).toFixed(3)})` : '';
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- Parallax leve na faixa de imagem ---------- */
  const bandImg = $('.band__img');
  if (bandImg && !reduced()) {
    const frame = bandImg.parentElement;
    let ticking = false;
    const update = () => {
      ticking = false;
      const r = frame.getBoundingClientRect();
      const p = (r.top + r.height / 2 - innerHeight / 2) / (innerHeight + r.height); // -0.5..0.5
      bandImg.style.transform = `translate3d(0, ${(-12 - p * 18).toFixed(2)}%, 0)`;
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- FAQ ---------- */
  $$('.faq__btn').forEach((btn) => {
    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    const set = (open) => {
      btn.setAttribute('aria-expanded', String(open));
      if (open) panel.removeAttribute('data-collapsed'); else panel.setAttribute('data-collapsed', '');
    };
    set(false);
    btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
  });

  /* ---------- Ano dinâmico ---------- */
  $$('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });

  /* ---------- Formulário ---------- */
  const form = $('#contact-form');
  if (!form) return;
  const configured = form.dataset.configured === 'true';
  const status = $('.form__status', form);
  const submit = $('button[type="submit"]', form);
  const submitText = $('.btn__label', submit) || submit;
  const submitLabel = submitText.textContent;
  const msg = $('#f-message');
  const count = $('#f-message-count');
  const MSG = {
    sending: 'Enviando…',
    success: 'Seu contato foi enviado. Os próximos passos serão combinados diretamente com você.',
    error: 'Não foi possível enviar agora. Tente novamente ou use o canal de contato disponível.',
    notConfigured: 'Formulário em configuração: o envio ainda não está ativo, então nenhuma mensagem foi enviada. Seus dados continuam no formulário.',
  };

  msg.addEventListener('input', () => { count.textContent = `${msg.value.length}/1000`; });

  const channelFields = $$('[data-for-channel]', form);
  const currentChannel = () => form.elements.channel.value;
  const syncChannel = () => {
    channelFields.forEach((f) => {
      const active = f.dataset.forChannel === currentChannel();
      f.toggleAttribute('data-inactive', !active);
      const input = $('input', f);
      input.required = active;
      if (!active) clearError(input);
    });
  };
  $$('input[name="channel"]', form).forEach((r) => r.addEventListener('change', syncChannel));
  syncChannel();

  function setError(input, text) {
    const err = document.getElementById(`${input.id}-err`);
    input.setAttribute('aria-invalid', 'true');
    if (err) { err.textContent = text; err.hidden = false; }
  }
  function clearError(input) {
    const err = document.getElementById(`${input.id}-err`);
    input.removeAttribute('aria-invalid');
    if (err) { err.textContent = ''; err.hidden = true; }
  }

  function validate() {
    const errors = [];
    const name = $('#f-name');
    const email = $('#f-email');
    const phone = $('#f-phone');
    const consent = $('#f-consent');
    [name, email, phone, consent].forEach(clearError);

    const n = name.value.trim();
    if (n.length < 2 || n.length > 100) errors.push([name, 'Informe seu nome (de 2 a 100 caracteres).']);

    if (currentChannel() === 'email') {
      const v = email.value.trim();
      if (!v) errors.push([email, 'Informe um e-mail para retorno.']);
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) errors.push([email, 'Confira o e-mail: use o formato nome@exemplo.com.']);
    } else {
      const d = phone.value.replace(/\D/g, '');
      if (!d) errors.push([phone, 'Informe um número de WhatsApp ou telefone.']);
      else if (d.length < 10 || d.length > 15) errors.push([phone, 'Confira o número: inclua código do país e DDD.']);
    }
    if (msg.value.length > 1000) errors.push([msg, 'A mensagem pode ter até 1000 caracteres.']);
    if (!consent.checked) errors.push([consent, 'Marque a caixa para confirmar que leu as informações de privacidade.']);

    errors.forEach(([el, text]) => setError(el, text));
    return errors;
  }

  // Revalida o campo ao corrigir.
  form.addEventListener('input', (e) => { if (e.target.getAttribute('aria-invalid') === 'true') validate(); });
  form.addEventListener('change', (e) => { if (e.target.id === 'f-consent' && e.target.checked) clearError(e.target); });

  const show = (state, text) => {
    status.dataset.state = state;
    status.textContent = text;
  };

  let sending = false;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (sending) return;
    status.textContent = '';
    const errors = validate();
    if (errors.length) { errors[0][0].focus(); return; }

    if (!configured) { show('info', MSG.notConfigured); return; }

    sending = true;
    form.setAttribute('aria-busy', 'true');
    submit.disabled = true;
    submitText.textContent = MSG.sending;
    const data = Object.fromEntries(new FormData(form));
    data.consent = form.elements.consent.checked;
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 15000);
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
        signal: ctrl.signal,
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.ok === true) {
        show('success', MSG.success);
        form.reset();
        count.textContent = '0/1000';
        syncChannel();
      } else if (res.status === 422 && body.fields) {
        Object.entries(body.fields).forEach(([field, text]) => {
          const el = form.elements[field];
          if (el && el.id) setError(el, text);
        });
        $('[aria-invalid="true"]', form)?.focus();
      } else if (body.error === 'not_configured') {
        show('info', MSG.notConfigured);
      } else {
        show('error', MSG.error);
      }
    } catch {
      show('error', MSG.error);
    } finally {
      clearTimeout(t);
      sending = false;
      form.removeAttribute('aria-busy');
      submit.disabled = false;
      submitText.textContent = submitLabel;
      if (status.textContent) status.focus();
    }
  });
})();
