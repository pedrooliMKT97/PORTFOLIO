/* Objetos 3D da hero (computador, energético, fone), modelados à mão com primitivas do Three.js */
window.PC3D = (function () {
  const C = { y: 0xffd21f, r: 0xff3440, p: 0x8f5bff, ink: 0x09080c, metal: 0xcfcbe0, white: 0xf4f1ff };
  let grad = null;

  function toonGradient() {
    if (grad) return grad;
    const data = new Uint8Array([110, 190, 255]);
    grad = new THREE.DataTexture(data, 3, 1, THREE.LuminanceFormat);
    grad.minFilter = grad.magFilter = THREE.NearestFilter;
    grad.needsUpdate = true;
    return grad;
  }
  const toon = (color, map) => new THREE.MeshToonMaterial({ color, map: map || null, gradientMap: toonGradient() });

  function roundedBox(w, h, d, r) {
    const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
    const g = new THREE.ExtrudeGeometry(s, { depth: d, bevelEnabled: true, bevelThickness: r * 0.4, bevelSize: r * 0.4, bevelSegments: 3, curveSegments: 8 });
    g.center();
    return g;
  }

  function canvasTex(w, h, paint) {
    const cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    paint(cv.getContext('2d'), w, h);
    const t = new THREE.CanvasTexture(cv);
    t.anisotropy = 4;
    return t;
  }

  /* ---------- computador ---------- */
  function computer() {
    const g = new THREE.Group();
    const body = new THREE.Mesh(roundedBox(1.75, 1.18, 0.1, 0.12), toon(C.p));
    g.add(body);
    const screenTex = canvasTex(512, 320, (x, w, h) => {
      x.fillStyle = '#0d0a14'; x.fillRect(0, 0, w, h);
      x.fillStyle = '#ffd21f'; x.fillRect(34, 34, 250, 160);
      x.fillStyle = '#0d0a14'; x.font = '800 54px sans-serif'; x.fillText('peagá', 52, 110);
      x.fillRect(52, 136, 150, 12); x.fillRect(52, 158, 100, 12);
      x.fillStyle = '#ff3440'; x.beginPath(); x.arc(390, 115, 70, 0, Math.PI * 2); x.fill();
      x.fillStyle = '#8f5bff'; x.fillRect(34, 222, 444, 22); x.fillRect(34, 256, 300, 22);
    });
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.52, 0.95), new THREE.MeshBasicMaterial({ map: screenTex }));
    screen.position.z = 0.115;
    g.add(screen);
    const neck = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.42, 0.1), toon(C.y));
    neck.position.set(0, -0.78, -0.06);
    g.add(neck);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.5, 0.07, 40), toon(C.y));
    base.scale.z = 0.62;
    base.position.set(0, -1.0, -0.04);
    g.add(base);
    return g;
  }

  /* ---------- lata de energético ---------- */
  function can() {
    const g = new THREE.Group();
    const label = canvasTex(1024, 512, (x, w, h) => {
      x.fillStyle = '#ff3440'; x.fillRect(0, 0, w, h);
      x.fillStyle = '#8f5bff'; x.fillRect(0, h * 0.68, w, h * 0.14);
      x.fillStyle = '#09080c'; x.fillRect(0, 0, w, h * 0.08); x.fillRect(0, h * 0.92, w, h * 0.08);
      // raio
      [130, 642].forEach(ox => {
        x.fillStyle = '#ffd21f';
        x.beginPath();
        x.moveTo(ox + 70, 70); x.lineTo(ox + 10, 250); x.lineTo(ox + 70, 250); x.lineTo(ox + 30, 440);
        x.lineTo(ox + 150, 200); x.lineTo(ox + 88, 200); x.lineTo(ox + 130, 70); x.closePath(); x.fill();
        x.fillStyle = '#fffced'; x.font = '900 86px sans-serif'; x.fillText('PEAGÁ', ox + 150, 230);
        x.font = '700 40px sans-serif'; x.fillText('ENERGY', ox + 158, 290);
      });
    });
    label.wrapS = THREE.RepeatWrapping;
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 1.25, 56, 1, true), toon(0xffffff, label));
    g.add(body);
    [-1, 1].forEach(s => {
      const lid = new THREE.Mesh(new THREE.CylinderGeometry(s > 0 ? 0.36 : 0.38, 0.42, 0.09, 56), toon(C.metal));
      lid.position.y = s * 0.665;
      if (s < 0) lid.rotation.x = Math.PI;
      g.add(lid);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.37, 0.025, 8, 56), toon(C.metal));
      rim.rotation.x = Math.PI / 2;
      rim.position.y = s * 0.71;
      g.add(rim);
    });
    const tab = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.02, 0.12), toon(C.metal));
    tab.position.set(0.06, 0.72, 0);
    g.add(tab);
    g.rotation.z = -0.12;
    return g;
  }

  /* ---------- fone de ouvido ---------- */
  function headphones() {
    const g = new THREE.Group();
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.66, 0.075, 14, 48, Math.PI), toon(C.r));
    band.position.y = 0.05;
    g.add(band);
    const pad = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.06, 10, 32, Math.PI * 0.5), toon(C.ink));
    pad.rotation.z = Math.PI * 0.25;
    pad.position.y = 0.05;
    g.add(pad);
    [-1, 1].forEach(s => {
      const yoke = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.34, 0.1), toon(C.r));
      yoke.position.set(s * 0.66, -0.05, 0);
      g.add(yoke);
      const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.24, 36), toon(C.p));
      cup.rotation.z = Math.PI / 2;
      cup.position.set(s * 0.7, -0.32, 0);
      g.add(cup);
      const cushion = new THREE.Mesh(new THREE.TorusGeometry(0.21, 0.085, 12, 32), toon(C.y));
      cushion.rotation.y = Math.PI / 2;
      cushion.position.set(s * 0.56, -0.32, 0);
      g.add(cushion);
      const dot = new THREE.Mesh(new THREE.CircleGeometry(0.12, 24), toon(C.y));
      dot.rotation.y = s * Math.PI / 2;
      dot.position.set(s * 0.825, -0.32, 0);
      g.add(dot);
    });
    g.rotation.x = 0.35;
    return g;
  }

  const BUILDERS = { computer, can, headphones };

  function supported() {
    try {
      const c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
    } catch (e) { return false; }
  }

  function mount(el, kind, opt) {
    opt = opt || {};
    if (!window.THREE || !supported()) return null;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 50);
    camera.position.set(0, 0.15, 6);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x50407a, 0.85));
    const sun = new THREE.DirectionalLight(0xffffff, 0.85);
    sun.position.set(2.5, 3, 4);
    scene.add(sun);

    const pivot = new THREE.Group();
    const obj = BUILDERS[kind]();
    const box = new THREE.Box3().setFromObject(obj);
    const size = box.getSize(new THREE.Vector3()), center = box.getCenter(new THREE.Vector3());
    obj.position.sub(center);
    pivot.add(obj);
    pivot.scale.setScalar(2.1 / Math.max(size.x, size.y, size.z));
    scene.add(pivot);

    const st = { spin: 0.9, boost: 0, t: Math.random() * 10, visible: true, w: 0, h: 0, px: 0, py: 0 };
    function resize() {
      const r = el.getBoundingClientRect();
      if (r.width === st.w && r.height === st.h) return;
      st.w = r.width; st.h = r.height;
      renderer.setSize(Math.max(1, r.width), Math.max(1, r.height), false);
      camera.aspect = Math.max(1, r.width) / Math.max(1, r.height);
      camera.updateProjectionMatrix();
    }
    resize();
    new IntersectionObserver(es => { st.visible = es[0].isIntersecting; }).observe(el);

    pivot.rotation.y = opt.startAngle || 0;
    function tick(dt) {
      if (!st.visible) return;
      resize();
      st.t += dt;
      st.boost *= Math.pow(0.12, dt);
      pivot.rotation.y += (st.spin + st.boost) * dt * (opt.dir || 1);
      pivot.rotation.x += ((Math.sin(st.t * 1.2) * 0.12 + st.py * 0.35) - pivot.rotation.x) * Math.min(1, dt * 6);
      pivot.rotation.z += ((st.px * -0.25) - pivot.rotation.z) * Math.min(1, dt * 6);
      pivot.position.y = Math.sin(st.t * 1.6) * 0.06;
      renderer.render(scene, camera);
    }
    return {
      tick,
      kick(v) { st.boost = v || 14; },
      look(nx, ny) { st.px = nx; st.py = ny; },
      setSpin(v) { st.spin = v; }
    };
  }

  return { mount };
})();
