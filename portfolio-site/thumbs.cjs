/*
  Gera miniaturas leves (assets/thumbs/) dos posts e das identidades.
  As grades e a esteira da hero usam as miniaturas; o visualizador abre a imagem original.
  Rode depois de adicionar imagens novas:   node thumbs.cjs
  Precisa do pacote @napi-rs/canvas (npm i -D @napi-rs/canvas) ou do caminho em CANVAS_FROM.
*/
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { createRequire } = require('module');

const ROOT = __dirname;
let canvasLib;
try { canvasLib = require('@napi-rs/canvas'); }
catch (e) { canvasLib = createRequire(process.env.CANVAS_FROM || 'C:/Users/pedro/muving-brand-showcase/')('@napi-rs/canvas'); }
const { createCanvas, loadImage } = canvasLib;

const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'data.js'), 'utf8'), ctx);
const D = ctx.window.PC;
const OUT = path.join(ROOT, 'assets', 'thumbs');
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const jobs = [...D.posts.map(p => [p, 640]), ...D.ids.map(p => [p, 900])];
  let total = 0;
  for (const [item, width] of jobs) {
    const img = await loadImage(path.join(ROOT, item.src));
    const w = Math.min(width, img.width), h = Math.round(img.height * w / img.width);
    const c = createCanvas(w, h);
    c.getContext('2d').drawImage(img, 0, 0, w, h);
    const buf = c.toBuffer('image/jpeg', 76);
    fs.writeFileSync(path.join(ROOT, item.thumb), buf);
    total += buf.length;
  }
  console.log(`miniaturas: ${jobs.length} arquivos, ${(total / 1048576).toFixed(1)} MB`);
})();
