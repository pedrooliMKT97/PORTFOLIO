import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
await cp('portfolio-site', 'dist', { recursive: true });
const domain = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const imageUrl = domain ? `https://${domain}/assets/social-share.jpg` : '/assets/social-share.jpg';
const siteUrl = domain ? `https://${domain}/` : '/';
const index = await readFile('dist/index.html', 'utf8');
await writeFile('dist/index.html', index.replaceAll('__SOCIAL_SHARE_IMAGE__', imageUrl).replace('__SOCIAL_SHARE_URL__', siteUrl));
console.log('Portfolio ready in dist');
