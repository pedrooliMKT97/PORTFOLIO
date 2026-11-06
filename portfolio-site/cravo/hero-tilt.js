export function initHeroTilt({window: win, document: doc, hero}) {
  if (!win.matchMedia('(pointer:coarse), (max-width:700px)').matches) return;

  let calibrated = false, baseBeta = 0, baseGamma = 0, frame = 0;
  let sensorActive = false;
  let target = {x: 0, y: 0, rx: 0, ry: 0};
  const current = {...target};
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  function render() {
    let remaining = 0;
    for (const key of Object.keys(current)) {
      const delta = target[key] - current[key];
      current[key] += delta * .14;
      remaining += Math.abs(delta);
    }
    hero.style.setProperty('--scene-x', current.x + 'px');
    hero.style.setProperty('--scene-y', current.y + 'px');
    hero.style.setProperty('--scene-rx', current.rx + 'deg');
    hero.style.setProperty('--scene-ry', current.ry + 'deg');
    frame = remaining > .025 && !doc.hidden ? win.requestAnimationFrame(render) : 0;
  }

  function move(x, y, rx = 0, ry = 0) {
    target = {x, y, rx, ry};
    if (!frame) frame = win.requestAnimationFrame(render);
  }

  function onOrientation(event) {
    if (!Number.isFinite(event.beta) || !Number.isFinite(event.gamma)) return;
    sensorActive = true;
    if (doc.hidden || win.scrollY > hero.offsetHeight) return;
    if (!calibrated) {
      baseBeta = event.beta;
      baseGamma = event.gamma;
      calibrated = true;
    }
    let x = event.gamma - baseGamma, y = event.beta - baseBeta;
    const angle = win.screen.orientation?.angle ?? win.orientation ?? 0;
    if (angle === 90) [x, y] = [-y, x];
    else if (angle === 270 || angle === -90) [x, y] = [y, -x];
    x = clamp(x, -25, 25);
    y = clamp(y, -22, 22);
    move(x * .8, y * .55, -y * .085, x * .11);
  }

  hero.addEventListener('pointermove', event => {
    if (event.pointerType !== 'touch' || sensorActive) return;
    const rect = hero.getBoundingClientRect();
    move(((event.clientX - rect.left) / rect.width - .5) * 24,
      ((event.clientY - rect.top) / rect.height - .5) * 12);
  }, {passive: true});
  const resetTouch = event => {
    if (event.pointerType === 'touch' && !sensorActive) move(0, 0);
  };
  hero.addEventListener('pointerup', resetTouch, {passive: true});
  hero.addEventListener('pointercancel', resetTouch, {passive: true});
  win.addEventListener('orientationchange', () => {
    calibrated = false;
    move(0, 0);
  });

  const orientation = win.DeviceOrientationEvent;
  if (!orientation || !win.isSecureContext) return;

  // Use sensors already available to the page. Touch works without permission.
  win.addEventListener('deviceorientation', onOrientation, {passive: true});
}
