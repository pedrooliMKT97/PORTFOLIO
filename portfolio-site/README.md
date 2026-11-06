# peagá criativo — portfólio

Site estático (HTML, CSS e JS) do portfólio peagá criativo, publicado em https://www.pdrolidesigner.com.br/.

## Ver no computador

Dentro desta pasta (`portfolio-site`):

```bash
npx http-server . -p 5177 -c-1
```


## Mudar conteúdo

1. Edite `data.js` (posts, vídeos, sites, identidades, textos e títulos das páginas para o Google).
2. Para mudar o HTML, edite `page.template.html`. **Não** edite `index.html` nem as pastas `posts/`, `videos/`... — elas são geradas.
3. Rode `node build.cjs`. Ele recria a home, as páginas com link próprio (`/posts/`, `/videos/`, `/sites/`, `/identidades/`, `/trabalhos/`, `/sobre/`, `/contato/`), o `404.html`, `sitemap.xml`, `robots.txt`, `llms.txt` e `site.webmanifest`.

## Publicar

Este site é publicado pela Vercel a partir do repositório no GitHub. Ao enviar para o branch `main`, a Vercel roda `scripts/build-portfolio.mjs`, que executa o `build.cjs` e copia o site para `dist/`.
Depois de publicar, cadastre o site no Google Search Console e envie `sitemap.xml`.

O domínio usado no SEO está em `data.js` (`site_url`). Se mudar, rode `node build.cjs` de novo.
