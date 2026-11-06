import {initSiteSound} from './site-sound.js?v=13';

document.documentElement.classList.add('js-motion');
const {playSound, soundOnScroll} = initSiteSound();
window.addEventListener('scroll', soundOnScroll, {passive: true});
document.getElementById('year').textContent = new Date().getFullYear();
const reveals = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      reveals.unobserve(entry.target);
    }
  }
}, {threshold: .08});
document.querySelectorAll('.reveal').forEach(element => reveals.observe(element));

const badge = document.getElementById('id-badge');
const hanger = document.getElementById('badge-hanger');
const stage = document.getElementById('badge-stage');
const cord = document.querySelector('.badge-cord');
const cordPaths = [...cord.querySelectorAll('path')];
const front = document.getElementById('badge-front');
const back = document.getElementById('badge-back');
const flipButton = document.getElementById('badge-flip');
const hint = document.getElementById('badge-hint');
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
let x = 0, y = 0, vx = 0, vy = 0, dragging = false, flipped = false;
let pointerId = null, pointerX = 0, pointerY = 0, startX = 0, startY = 0;
let visible = false, frame = 0, previousTime = 0;
let geometry = {width: 520, cordHeight: 390, top: 145, maxX: 65};

function measureBadge() {
  geometry = {
    width: stage.clientWidth,
    cordHeight: cord.clientHeight,
    top: hanger.offsetTop,
    maxX: Math.min(90, Math.max(12, (innerWidth - hanger.clientWidth) / 2 - 24))
  };
}
measureBadge();
window.addEventListener('resize', measureBadge);

function drawBadge(time) {
  frame = 0;
  if (!visible || document.hidden) return;
  const dt = Math.min((time - (previousTime || time)) / 16.667, 2);
  previousTime = time;
  if (!dragging) {
    vx = (vx - x * .023 * dt) * Math.pow(.86, dt);
    vy = (vy - y * .028 * dt) * Math.pow(.83, dt);
    x += vx * dt;
    y += vy * dt;
  }
  const sway = Math.sin(time / 1900) * .75;
  const angle = clamp(-2.5 + x * .055 + vx * .25 + sway, -12, 12);
  hanger.style.setProperty('--badge-x', x.toFixed(2) + 'px');
  hanger.style.setProperty('--badge-y', y.toFixed(2) + 'px');
  hanger.style.setProperty('--badge-z', angle.toFixed(2) + 'deg');
  const endX = 260 + x * 520 / geometry.width;
  const endY = (geometry.top + y) * 390 / geometry.cordHeight;
  const path = `M260 0C260 ${endY * .38} ${endX - x * .25} ${endY * .78} ${endX} ${endY}`;
  cordPaths.forEach(element => element.setAttribute('d', path));
  frame = requestAnimationFrame(drawBadge);
}
function animateBadge() {
  if (!frame && visible && !document.hidden) {
    previousTime = 0;
    frame = requestAnimationFrame(drawBadge);
  }
}
new IntersectionObserver(entries => {
  visible = entries[0].isIntersecting;
  if (visible) animateBadge();
  else {cancelAnimationFrame(frame); frame = 0;}
}, {threshold: .05}).observe(stage);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {cancelAnimationFrame(frame); frame = 0;}
  else animateBadge();
});

badge.addEventListener('pointerdown', event => {
  if (event.target.closest('.badge-sticker') || (event.pointerType === 'mouse' && event.button !== 0)) return;
  pointerId = event.pointerId;
  pointerX = event.clientX;
  pointerY = event.clientY;
  startX = x;
  startY = y;
  dragging = true;
  vx = vy = 0;
  badge.classList.add('dragging');
  badge.setPointerCapture(pointerId);
  animateBadge();
});
badge.addEventListener('pointermove', event => {
  if (dragging && event.pointerId === pointerId) {
    const nextX = clamp(startX + (event.clientX - pointerX) * .65, -geometry.maxX, geometry.maxX);
    const nextY = clamp(startY + (event.clientY - pointerY) * .45, -28, 50);
    vx = clamp((nextX - x) * .65, -5, 5);
    vy = clamp((nextY - y) * .65, -4, 4);
    x = nextX;
    y = nextY;
    return;
  }
  if (event.pointerType !== 'mouse' || event.target.closest('.badge-sticker')) return;
  const rect = badge.getBoundingClientRect();
  const px = clamp((event.clientX - rect.left) / rect.width, 0, 1);
  const py = clamp((event.clientY - rect.top) / rect.height, 0, 1);
  badge.style.setProperty('--badge-rx', ((.5 - py) * 9).toFixed(2) + 'deg');
  badge.style.setProperty('--badge-ry', ((px - .5) * 12).toFixed(2) + 'deg');
  badge.style.setProperty('--gloss-x', px * 100 + '%');
  badge.style.setProperty('--gloss-y', py * 100 + '%');
});
function releaseBadge(event) {
  if (event.pointerId !== pointerId) return;
  dragging = false;
  pointerId = null;
  badge.classList.remove('dragging');
  badge.style.setProperty('--badge-rx', '0deg');
  badge.style.setProperty('--badge-ry', '0deg');
  animateBadge();
}
badge.addEventListener('pointerup', releaseBadge);
badge.addEventListener('pointercancel', releaseBadge);
badge.addEventListener('lostpointercapture', releaseBadge);
badge.addEventListener('pointerleave', () => {
  if (!dragging) {
    badge.style.setProperty('--badge-rx', '0deg');
    badge.style.setProperty('--badge-ry', '0deg');
  }
});

function flipBadge() {
  flipped = !flipped;
  badge.classList.toggle('is-flipped', flipped);
  front.setAttribute('aria-hidden', String(flipped));
  back.setAttribute('aria-hidden', String(!flipped));
  front.inert = flipped;
  back.inert = !flipped;
  flipButton.setAttribute('aria-pressed', String(flipped));
  flipButton.querySelector('span').textContent = flipped ? 'VER A FRENTE' : 'VIRAR O CRACHÁ';
  hint.textContent = flipped ? 'Os adesivos também podem ser arrastados.' : 'Arraste o crachá e solte.';
  vx += flipped ? 1.8 : -1.8;
  playSound('switch');
  animateBadge();
}
flipButton.addEventListener('click', flipBadge);
badge.addEventListener('keydown', event => {
  if (event.target !== badge) return;
  const directions = {ArrowLeft: [-3, 0], ArrowRight: [3, 0], ArrowUp: [0, -3], ArrowDown: [0, 3]};
  if (directions[event.key]) {
    event.preventDefault();
    const [dx, dy] = directions[event.key];
    vx += dx;
    vy += dy;
    animateBadge();
  } else if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    flipBadge();
  }
});

document.querySelectorAll('.badge-sticker').forEach(sticker => {
  let sx = 0, sy = 0, originX = 0, originY = 0, previousX = 0, previousY = 0, active = null;
  const moveSticker = (nextX, nextY) => {
    sx = clamp(nextX, 8 - sticker.offsetLeft, badge.clientWidth - sticker.offsetLeft - sticker.offsetWidth - 8);
    sy = clamp(nextY, 13 - sticker.offsetTop, badge.clientHeight - sticker.offsetTop - sticker.offsetHeight - 8);
    sticker.style.setProperty('--sticker-x', sx + 'px');
    sticker.style.setProperty('--sticker-y', sy + 'px');
  };
  sticker.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.stopPropagation();
    active = event.pointerId;
    originX = event.clientX;
    originY = event.clientY;
    previousX = sx;
    previousY = sy;
    sticker.setPointerCapture(active);
  });
  sticker.addEventListener('pointermove', event => {
    if (event.pointerId !== active) return;
    event.stopPropagation();
    moveSticker(previousX + event.clientX - originX, previousY + event.clientY - originY);
  });
  const release = () => {active = null;};
  sticker.addEventListener('pointerup', release);
  sticker.addEventListener('pointercancel', release);
  sticker.addEventListener('lostpointercapture', release);
  sticker.addEventListener('keydown', event => {
    const deltas = {ArrowLeft: [-6, 0], ArrowRight: [6, 0], ArrowUp: [0, -6], ArrowDown: [0, 6]};
    if (!deltas[event.key]) return;
    event.preventDefault();
    event.stopPropagation();
    moveSticker(sx + deltas[event.key][0], sy + deltas[event.key][1]);
  });
});

const works = JSON.parse(document.getElementById('about-content').textContent).works;
const dialog = document.getElementById('work-dialog');
let returnFocus;
document.querySelectorAll('[data-work]').forEach(button => {
  button.addEventListener('click', () => {
    const work = works[Number(button.dataset.work)];
    if (!work) return;
    returnFocus = button;
    dialog.querySelector('h2').textContent = work.name;
    dialog.querySelector('p').textContent = work.description;
    const image = dialog.querySelector('.work-dialog-image');
    image.src = '/cravo/assets/' + work.image;
    image.alt = work.alt;
    dialog.querySelector('#work-dialog-link').href = work.url;
    dialog.querySelector('#work-dialog-link').textContent = work.type.startsWith('Site') ? 'VISITAR O SITE' : 'VER NO PORTFÓLIO';
    dialog.showModal();
    document.body.classList.add('modal-open');
    playSound('open');
  });
});
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  returnFocus?.focus({preventScroll: true});
});
