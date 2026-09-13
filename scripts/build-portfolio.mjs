import { cp, mkdir } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
await cp('portfolio-site', 'dist', { recursive: true });
console.log('Portfolio ready in dist');
