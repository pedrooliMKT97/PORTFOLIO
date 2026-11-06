/*
  Gera as páginas do site a partir de page.template.html + data.js.
  Rode depois de mudar o conteúdo:   node build.cjs

  Saída: index.html, 404.html, uma pasta por seção (posts/, videos/, sites/...)
  com index.html próprio, sitemap.xml, robots.txt, llms.txt e site.webmanifest.
*/
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = __dirname;
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'data.js'), 'utf8'), ctx);
const D = ctx.window.PC;
const SITE = D.site_url;
const T = D.i18n.pt;
const TODAY = new Date().toISOString().slice(0, 10);
const tpl = fs.readFileSync(path.join(ROOT, 'page.template.html'), 'utf8');

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const abs = p => SITE + p.replace(/^\.?\//, '');
const urlOf = r => (r ? SITE + r + '/' : SITE);
const yt = id => 'https://www.youtube.com/shorts/' + id;

const ORG = SITE + '#negocio', PERSON = SITE + '#pedro', WEB = SITE + '#site';
const IG = 'https://www.instagram.com/peagacriativo/';
const WA = 'https://wa.me/' + D.whatsapp;
const OG = abs('assets/og-peaga.jpg');

const SERVICES = [
  ['Social media e design de posts', 'Criação de posts, carrosséis e artes para Instagram e outras redes, com linha visual para cada nicho.'],
  ['Edição e captação de vídeo', 'Roteiro, captação e edição de Reels, Shorts e vídeos institucionais.'],
  ['Criação de sites e landing pages', 'Sites institucionais e landing pages rápidos, responsivos e prontos para o Google.'],
  ['Identidade visual e logotipo', 'Criação de marca, logotipo, paleta e aplicações.'],
  ['Gestão de marketing completa', 'Estratégia, tráfego pago (Meta Ads e Google Ads), dashboards e IA aplicada ao marketing.']
];
const KNOWS = ['design gráfico', 'social media', 'design para Instagram', 'edição de vídeo', 'captação de vídeo', 'Reels', 'criação de sites',
  'landing page', 'identidade visual', 'criação de logotipo', 'branding', 'tráfego pago', 'marketing digital', 'IA aplicada ao marketing'];

/* ---------- conteúdo pré-renderizado (o JS troca pelos cards animados; buscadores e IAs leem este) */
const pre = {
  ABOUT: T.about,
  FACTS: T.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join(''),
  SKILLS: T.skills.map(s => `<li>${esc(s)}</li>`).join(''),
  TOOLS: D.tools.map(s => `<li><img src="${s.icon}" alt="" width="22" height="22" loading="lazy">${esc(s.name)}</li>`).join(''),
  SVC: T.svc.map(([n, d]) => `<li><span class="svc__name">${esc(n)}</span> <span class="svc__desc">${esc(d)}</span></li>`).join(''),
  POSTS: D.posts.map(p => `<figure class="pre"><img src="${p.src}" alt="${esc(p.title)} — post para redes sociais" width="${p.w}" height="${p.h}" loading="lazy"><figcaption>${esc(p.title)}</figcaption></figure>`).join(''),
  VIDEOS: D.videos.map(v => `<figure class="pre"><a href="${yt(v.yt)}"><img src="${v.src}" alt="${esc(v.title)} — vídeo" width="${v.w}" height="${v.h}" loading="lazy"></a><figcaption>${esc(v.title)}</figcaption></figure>`).join(''),
  SITES: D.sites.map(s => `<figure class="pre"><img src="${s.src}" alt="Prévia do site ${esc(s.title)}" width="${s.w}" height="${s.h}" loading="lazy"><figcaption>${s.url ? `<a href="${s.url}">${esc(s.title)}</a>` : esc(s.title)} — ${esc(s.kind)}</figcaption></figure>`).join(''),
  IDS: D.ids.map(i => `<figure class="pre"><img src="${i.src}" alt="Identidade visual ${esc(i.title)}" width="${i.w}" height="${i.h}" loading="lazy"><figcaption>${i.url ? `<a href="${i.url}">${esc(i.title)}: apresentação interativa da marca</a>` : esc(i.title)}</figcaption></figure>`).join('')
};

/* ---------- dados estruturados (schema.org) */
const listOf = (items, map) => ({ '@type': 'ItemList', numberOfItems: items.length, itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, item: map(it) })) });
const workItems = {
  posts: () => listOf(D.posts, p => ({ '@type': 'ImageObject', name: p.title, contentUrl: abs(p.src), creator: { '@id': PERSON } })),
  videos: () => listOf(D.videos, v => ({ '@type': 'CreativeWork', name: v.title, url: yt(v.yt), thumbnailUrl: abs(v.src), creator: { '@id': PERSON } })),
  sites: () => listOf(D.sites, s => ({ '@type': 'CreativeWork', name: s.title, description: s.kind, image: abs(s.src), ...(s.url ? { url: s.url } : {}), creator: { '@id': PERSON } })),
  identidades: () => listOf(D.ids, i => ({ '@type': 'ImageObject', name: 'Identidade visual ' + i.title, contentUrl: abs(i.src), ...(i.url ? { url: abs(i.url) } : {}), creator: { '@id': PERSON } }))
};

function jsonld(route) {
  const r = D.routes[route], url = urlOf(route);
  const pageType = { '': 'WebPage', sobre: 'AboutPage', contato: 'ContactPage' }[route] || 'CollectionPage';
  const page = {
    '@type': pageType, '@id': url + '#pagina', url, name: r.title, description: r.desc, inLanguage: 'pt-BR',
    isPartOf: { '@id': WEB }, about: { '@id': ORG }, primaryImageOfPage: { '@type': 'ImageObject', url: OG }
  };
  if (workItems[route]) page.mainEntity = workItems[route]();
  if (route === 'trabalhos') page.hasPart = Object.keys(workItems).map(k => ({ '@type': 'CollectionPage', name: D.routes[k].name, url: urlOf(k) }));
  if (route === 'sobre') page.mainEntity = { '@id': PERSON };
  if (route) page.breadcrumb = { '@id': url + '#trilha' };

  const graph = [
    { '@type': 'WebSite', '@id': WEB, url: SITE, name: 'peagá criativo', alternateName: ['peaga criativo', 'Pedro designer', 'pdrolidesigner'], inLanguage: 'pt-BR', publisher: { '@id': ORG } },
    {
      '@type': 'ProfessionalService', '@id': ORG, name: 'peagá criativo', url: SITE,
      description: 'Estúdio de design do Pedro: social media, design gráfico, edição e captação de vídeo, sites e landing pages, identidade visual e gestão de marketing.',
      logo: abs('assets/icon-512.png'), image: OG, telephone: '+55 19 99706-6833',
      address: { '@type': 'PostalAddress', addressRegion: 'SP', addressCountry: 'BR' },
      areaServed: { '@type': 'Country', name: 'Brasil' },
      founder: { '@id': PERSON }, sameAs: [IG], knowsAbout: KNOWS,
      contactPoint: { '@type': 'ContactPoint', contactType: 'sales', telephone: '+55 19 99706-6833', url: WA, availableLanguage: ['Portuguese', 'English'] },
      hasOfferCatalog: {
        '@type': 'OfferCatalog', name: 'Serviços do peagá criativo',
        itemListElement: SERVICES.map(([name, description]) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name, description, provider: { '@id': ORG } } }))
      }
    },
    {
      '@type': 'Person', '@id': PERSON, name: 'Pedro', jobTitle: 'Designer gráfico e estrategista criativo',
      description: 'Designer gráfico e estrategista criativo há mais de 6 anos, à frente do peagá criativo e do Cravo creative studio.',
      url: urlOf('sobre'), image: abs('assets/pedro.jpg'), worksFor: { '@id': ORG },
      affiliation: { '@type': 'Organization', name: 'Cravo creative studio', url: SITE + 'cravo/' }, sameAs: [IG], knowsAbout: KNOWS
    },
    {
      '@type': 'ItemList', '@id': SITE + '#menu', name: 'Menu do site',
      itemListElement: Object.keys(D.routes).filter(Boolean).map((k, i) => ({ '@type': 'SiteNavigationElement', position: i + 1, name: D.routes[k].name, url: urlOf(k) }))
    },
    page
  ];
  if (route) {
    graph.push({
      '@type': 'BreadcrumbList', '@id': url + '#trilha', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: SITE },
        ...(['posts', 'videos', 'sites', 'identidades'].includes(route) ? [{ '@type': 'ListItem', position: 2, name: 'Trabalhos', item: urlOf('trabalhos') }] : []),
        { '@type': 'ListItem', position: ['posts', 'videos', 'sites', 'identidades'].includes(route) ? 3 : 2, name: r.name, item: url }
      ]
    });
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}

function seoHead(route, noindex) {
  const r = D.routes[route], url = urlOf(route);
  return [
    `<title>${esc(r.title)}</title>`,
    `<meta name="description" content="${esc(r.desc)}">`,
    `<meta name="keywords" content="${esc(KNOWS.join(', '))}, designer, portfólio, peagá criativo">`,
    `<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}">`,
    noindex ? '' : `<link rel="canonical" href="${url}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="peagá criativo">`,
    `<meta property="og:locale" content="pt_BR">`,
    `<meta property="og:title" content="${esc(r.title)}">`,
    `<meta property="og:description" content="${esc(r.desc)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${OG}">`,
    `<meta property="og:image:secure_url" content="${OG}">`,
    `<meta property="og:image:type" content="image/jpeg">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="peagá criativo: design com direção, energia e ritmo. Pedro, designer gráfico e estrategista criativo.">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(r.title)}">`,
    `<meta name="twitter:description" content="${esc(r.desc)}">`,
    `<meta name="twitter:image" content="${OG}">`,
    `<link rel="alternate" type="text/plain" href="llms.txt" title="Resumo do site para IAs">`,
    `<script type="application/ld+json">${jsonld(route)}</script>`
  ].filter(Boolean).join('\n');
}

/* o título da seção vira h1 na página dela; o título da hero só é h1 na home */
function headings(html, route) {
  return html.replace(/<(h1|h2|h3) ([^>]*?)data-h="([^"]*)"([^>]*)>([\s\S]*?)<\/\1>/g, (m, tag, a, h, b, inner) => {
    let t = tag;
    if (h === '') t = route === '' ? 'h1' : 'p';
    else if (h === route) t = 'h1';
    return `<${t} ${a}data-h="${h}"${b}>${inner}</${t}>`;
  });
}

function page(route, base, noindex) {
  let html = tpl
    .replace('{{BASE}}', base)
    .replace('{{ROUTE}}', route)
    .replace('<!--SEO-->', seoHead(route, noindex));
  for (const k of Object.keys(pre)) html = html.replace(`<!--${k}-->`, pre[k]);
  return headings(html, route);
}

const written = [];
const write = (rel, content) => {
  const f = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, content);
  written.push(rel);
};

for (const route of Object.keys(D.routes)) {
  write(route ? route + '/index.html' : 'index.html', page(route, route ? '../' : './', false));
}
write('404.html', page('', '/', true));

/* sitemap com imagens */
const routeImages = {
  '': ['assets/og-peaga.jpg', 'assets/pedro.jpg'],
  posts: D.posts.map(p => p.src), videos: D.videos.map(v => v.src), sites: D.sites.map(s => s.src), identidades: D.ids.map(i => i.src),
  sobre: ['assets/pedro.jpg']
};
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${Object.keys(D.routes).map(r => `  <url>
    <loc>${urlOf(r)}</loc>
    <lastmod>${TODAY}</lastmod>
    <priority>${r === '' ? '1.0' : ['trabalhos', 'sites', 'videos', 'posts'].includes(r) ? '0.9' : '0.7'}</priority>
${(routeImages[r] || []).map(src => `    <image:image><image:loc>${abs(src)}</image:loc></image:image>`).join('\n')}
  </url>`).join('\n')}
</urlset>
`);

write('robots.txt', `User-agent: *
Allow: /
# demonstrações de sites dentro da Cravo não precisam aparecer no Google
Disallow: /cravo/projetos/

# buscadores de IA também podem ler e citar o site
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: ${SITE}sitemap.xml
Sitemap: ${SITE}cravo/sitemap.xml
`);

write('llms.txt', `# peagá criativo

> Estúdio de design do Pedro, designer gráfico e estrategista criativo há mais de 6 anos (também à frente do Cravo creative studio). Faz social media, design de posts, edição e captação de vídeo, sites e landing pages, identidade visual e gestão de marketing (estratégia, tráfego pago, dashboards e IA aplicada) para marcas de todo o Brasil.

- Site: ${SITE}
- Instagram: ${IG} (@peagacriativo)
- WhatsApp: ${WA} (+55 19 99706-6833)

## Serviços

${SERVICES.map(([n, d]) => `- **${n}**: ${d}`).join('\n')}

## Páginas

${Object.keys(D.routes).map(r => `- [${D.routes[r].name}](${urlOf(r)}): ${D.routes[r].desc}`).join('\n')}

## Sites e landing pages

${D.sites.map(s => `- ${s.title} (${s.kind})${s.url ? `: ${s.url}` : ': em fase de publicação'}`).join('\n')}

## Vídeos

${D.videos.map(v => `- ${v.title}: ${yt(v.yt)}`).join('\n')}

## Identidades visuais

${D.ids.map(i => `- ${i.title}${i.url ? `: apresentação interativa em ${abs(i.url)}` : ''}`).join('\n')}

## Posts para redes sociais

${D.posts.map(p => `- ${p.title}`).join('\n')}

## Agência

Pedro também toca a Cravo creative studio, agência de marketing em Mogi Guaçu (SP): ${SITE}cravo/

## Contato

Para orçamento, chame o Pedro no WhatsApp (${WA}) ou no Instagram @peagacriativo.
`);

write('site.webmanifest', JSON.stringify({
  name: 'peagá criativo', short_name: 'peagá', lang: 'pt-BR', start_url: './', display: 'standalone',
  background_color: '#09080c', theme_color: '#09080c',
  icons: [
    { src: 'assets/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: 'assets/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
  ]
}, null, 2));

console.log('gerado:', written.join(', '));
