// Build da Vercel: gera as páginas do portfólio e copia só o que vai ao ar para dist/
import { execFileSync } from 'node:child_process';
import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';

// recria index.html, /posts/, /videos/, ... a partir de page.template.html + data.js
execFileSync(process.execPath, ['portfolio-site/build.cjs'], { stdio: 'inherit' });

// arquivos de trabalho que não precisam ir ao ar
const skip = new Set(['build.cjs', 'thumbs.cjs', 'page.template.html', 'README.md']);
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('portfolio-site', 'dist', {
  recursive: true,
  filter: src => !skip.has(path.basename(src)) || path.dirname(path.resolve(src)) !== path.resolve('portfolio-site')
});
console.log('Portfolio ready in dist');
