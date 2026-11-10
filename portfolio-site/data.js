/* Conteúdo do portfólio (extraído de pdrolidesigner.com.br) */
window.PC = (function () {
  const A = 'assets/';
  const thumb = f => A + 'thumbs/' + f.replace(/\.\w+$/, '.jpg'); // miniatura leve para grades e esteira
  const art = (f, title, w, h) => ({ type: 'art', src: A + f, thumb: thumb(f), title, w, h });

  const posts = [
    art('pizza-combo.webp', 'Pizza Company — Combo', 1080, 1350),
    art('lanterns.webp', 'Pôster Lanterns', 1080, 1350),
    art('capim-leao.webp', 'Capim Leão — Happy hour', 1080, 1350),
    art('nosso-lar-historia.webp', 'Nosso Lar — Nossa história', 1080, 1350),
    art('poster-escocia-brasil.jpg', 'Escócia x Brasil', 736, 920),
    art('bem-estar.webp', 'Design para bem-estar', 1080, 1440),
    art('bleach.webp', 'Pôster Bleach', 1080, 1350),
    art('velho-chico-rodizio.jpg', 'Velho Chico — Rodízio', 1080, 1350),
    art('babi-pais.webp', 'Babi — Dia dos Pais', 1080, 1350),
    art('contador.webp', 'Unimogi — Dia do Contador', 1080, 1350),
    art('declinio.webp', 'Pôster Declínio de um Homem', 1080, 1350),
    art('poster-brasil-marrocos.jpg', 'Brasil x Marrocos', 736, 920),
    art('pao-alho.webp', 'Espetinhos do Victor — Festival', 1080, 1350),
    art('nosso-lar-terapias.webp', 'Nosso Lar — Terapias', 1080, 1350),
    art('ferramentas.webp', 'Ferramentas que uso', 1200, 1500),
    art('pizza-delivery.webp', 'Pizza Company — Delivery', 1080, 1350),
    art('valorant.webp', 'Pôster Valorant — LOUD', 1080, 1350),
    art('nosso-lar-historia-nova.jpg', 'Nosso Lar — Nossa história (nova versão)', 1080, 1350),
    art('combo-casal.webp', 'Velho Chico — Combo casal', 1122, 1402),
    art('poster-matheus-cunha.jpg', 'Matheus Cunha', 736, 920),
    art('nosso-lar-vaga.webp', 'Nosso Lar — Fonoaudiologia', 1080, 1350),
    art('velho-chico-delivery.jpg', 'Velho Chico — Delivery', 1080, 1350),
    art('victor-rodizio.webp', 'Espetinhos do Victor — Rodízio', 1200, 1500),
    art('design-silencio.jpg', 'O cuidado começa no silêncio', 1080, 1440),
    art('barrankos-localizacao.webp', 'Barranko’s — Localização', 1080, 1350)
  ];

  /* com url: o card abre a apresentação da marca em vez da imagem */
  const ids = [
    ['identidade-cartazon.jpg', 'CartazON — Tecnologia para o varejo', 'identidades/cartazon/', 'tag_manual'],
    ['identidade-muving.jpg', 'Muving — Agência de Marketing', 'identidades/muving/', 'pres_tag'],
    ['identidade-barrankos.webp', 'Barranko’s'],
    ['identidade-flor.webp', 'Flor de Brasa'],
    ['identidade-victor.webp', 'Espetinhos do Victor'],
    ['identidade-barans.webp', 'Baran’s']
  ].map(([f, t, url, tag]) => ({ type: 'id', src: A + f, thumb: thumb(f), title: t, url: url || null, tag: tag || null, w: 1200, h: 900 }));

  /* src = topo do site; long = página inteira (rola no hover e no visualizador) */
  const site = (key, title, kind, url, longH) => ({
    type: 'site', key, title, kind, url,
    src: A + 'preview-' + key + '.jpg', long: A + 'long-' + key + '.jpg', full: A + 'full-' + key + '.jpg',
    w: 1280, h: 800, lw: 720, lh: longH
  });
  const sites = [
    site('nosso-lar', 'Clínica Nosso Lar', 'Site institucional · clínica', 'https://www.clinicanossolar.com.br/', 3938),
    site('lucas', 'Lucas Oliveira — Psicólogo', 'Landing page · psicologia', null, 3938),
    site('casa-do-sol', 'Casa do Sol — Imobiliária', 'Site e catálogo de imóveis', null, 3938),
    site('ponto-novo', 'Supermercado Ponto Novo', 'Site institucional · varejo', 'https://www.smpontonovo.com.br/', 2257)
  ];

  /* são Shorts (9:16): o thumbnail vem com faixas borradas, o CSS recorta só o centro */
  const vid = (id, title) => ({ type: 'video', yt: id, title, src: A + 'yt-' + id + '-max.jpg', w: 720, h: 1280 });
  const videos = [
    vid('gYFRNGktTyQ', 'Captação — Treinamento'),
    vid('_k_vZQakGjU', 'Peagá Criativo'),
    vid('pmNMOgQGgLI', 'Supermercado Ponto Novo — Reel 1'),
    vid('7dEmi6PMEK0', 'Supermercado Ponto Novo — Reel 2'),
    vid('Rz-3SishJyA', 'Supermercado Ponto Novo — Reel 3'),
    vid('pDC6vPsd_us', 'Clínica Nosso Lar')
  ];

  const whatsapp = '5519997066833';
  const waText = 'Olá, Pedro! Vi seu portfólio e gostei do seu trabalho. Quero conversar sobre como você pode ajudar minha marca. Podemos falar sobre meu projeto?';

  const i18n = {
    pt: {
      skip: 'pular', motion_on: 'ativar animações',
      nav_work: 'trabalhos', nav_about: 'sobre', nav_contact: 'contato', nav_agency: 'agência',
      ag_kicker: 'minha agência', ag_title: 'quando o projeto pede um time inteiro, entra a Cravo.',
      ag_sub: 'Cravo creative studio: agência de marketing em Mogi Guaçu com branding, vídeo, social media, tráfego pago, sites e automação com IA.',
      ag_cta: 'conhecer a Cravo', cur_agency: 'ir para a Cravo',
      h_a: 'design com', h_b: 'direção,', h_c: 'energia', h_d: 'e', h_e: 'ritmo.',
      hero_sub: 'Pedro, designer gráfico e estrategista criativo à frente do peagá criativo.',
      btn_work: 'conheça meu trabalho', btn_contact: 'entrar em contato',
      see_all: 'ver todos os {n} posts', k_posts: 'post', k_videos: 'vídeo', k_sites: 'site', k_ids: 'identidade',
      ticker_a: ['social media', 'edição de vídeo', 'captação', 'sites & landing pages', 'identidade visual'],
      ticker_b: ['tráfego pago', 'IA aplicada', 'dashboards', 'estratégia', 'copy', 'gestão completa'],
      about_label: 'sobre mim', years: 'anos criando',
      about: 'Sou o Pedro. Há mais de <b class="c-yellow">6 anos</b> transformo ideias em marcas com presença. Conecto <b class="c-red">design</b>, <b class="c-purple">estratégia</b> e tecnologia para cuidar de cada detalhe da sua comunicação, do primeiro post ao site no ar. Hoje também toco o Cravo creative studio.',
      facts: [['6+', 'anos criando marcas'], ['2', 'estúdios: peagá criativo e Cravo'], ['7', 'ferramentas no dia a dia']],
      orbit_hint: 'arraste para girar',
      skills_title: 'habilidades', tools_title: 'ferramentas', svc_title: 'o que eu faço',
      skills: ['design e social media', 'edição e captação', 'sites e landing pages', 'identidade visual', 'estratégia', 'tráfego pago', 'IA aplicada'],
      svc: [
        ['Design & Social Media', 'Cada nicho, uma nova ideia.'],
        ['Edição & Captação', 'Do primeiro frame ao último detalhe.'],
        ['Sites & Landing Pages', 'Presença além do feed.'],
        ['Identidade Visual', 'Marcas com personalidade.'],
        ['Gestão completa', 'Estratégia, tráfego pago e IA aplicada.']
      ],
      work_title: 'trabalhos',
      work_sub: 'Tudo que saiu do estúdio, separado por formato.',
      sec_posts: 'posts', sec_videos: 'vídeos', sec_sites: 'sites & LPs', sec_ids: 'identidades',
      d_posts: 'Cada nicho, uma nova ideia.', d_videos: 'Histórias em movimento.', d_sites: 'Presença além do feed.', d_ids: 'Marcas com personalidade.',
      visit: 'visitar site ↗', see_preview: 'ver prévia', soon: 'em breve no ar',
      cur_view: 'ver', cur_play: 'play', cur_site: 'prévia', cur_chat: 'chamar', cur_pres: 'apresentação', see_pres: 'ver apresentação ↗', pres_tag: 'apresentação interativa', tag_manual: 'manual da marca',
      mgmt: ['estratégia', 'tráfego pago', 'IA aplicada', 'dashboards'],
      cta: 'vamos fazer acontecer?', cta_btn: 'chamar no WhatsApp', cta_ig: 'ver no Instagram',
      dragon_hint: 'o dragão segue o seu cursor',
      foot: 'feito com café, energético e fone no talo.', top: 'voltar ao topo ↑',
      seo_line: 'peagá criativo: design gráfico, social media, edição de vídeo, sites, landing pages e identidade visual para marcas de todo o Brasil.',
      close: 'Fechar', prev: 'Anterior', next: 'Próximo'
    },
    en: {
      skip: 'skip', motion_on: 'turn on animations',
      nav_work: 'work', nav_about: 'about', nav_contact: 'contact', nav_agency: 'agency',
      ag_kicker: 'my agency', ag_title: 'when a project needs a whole team, Cravo steps in.',
      ag_sub: 'Cravo creative studio: a marketing agency in Mogi Guaçu, Brazil, for branding, video, social media, paid traffic, websites and AI automation.',
      ag_cta: 'visit Cravo', cur_agency: 'go to Cravo',
      h_a: 'design with', h_b: 'direction,', h_c: 'energy', h_d: 'and', h_e: 'rhythm.',
      hero_sub: 'Pedro, graphic designer and creative strategist behind peagá criativo.',
      btn_work: 'see my work', btn_contact: 'get in touch',
      see_all: 'see all {n} posts', k_posts: 'post', k_videos: 'video', k_sites: 'website', k_ids: 'identity',
      ticker_a: ['social media', 'video editing', 'filming', 'websites & landing pages', 'visual identity'],
      ticker_b: ['paid traffic', 'applied AI', 'dashboards', 'strategy', 'copy', 'full management'],
      about_label: 'about me', years: 'years creating',
      about: 'I’m Pedro. For over <b class="c-yellow">6 years</b> I’ve turned ideas into brands with presence. I connect <b class="c-red">design</b>, <b class="c-purple">strategy</b> and technology to take care of every detail of your communication, from the first post to the live website. I also run Cravo creative studio.',
      facts: [['6+', 'years creating brands'], ['2', 'studios: peagá criativo and Cravo'], ['7', 'everyday tools']],
      orbit_hint: 'drag to spin',
      skills_title: 'skills', tools_title: 'tools', svc_title: 'what I do',
      skills: ['design & social media', 'editing & filming', 'websites & landing pages', 'visual identity', 'strategy', 'paid traffic', 'applied AI'],
      svc: [
        ['Design & Social Media', 'Every niche, a new idea.'],
        ['Editing & Filming', 'From the first frame to the last detail.'],
        ['Websites & Landing Pages', 'Presence beyond the feed.'],
        ['Visual Identity', 'Brands with personality.'],
        ['Full management', 'Strategy, paid traffic and applied AI.']
      ],
      work_title: 'work',
      work_sub: 'Everything that left the studio, split by format.',
      sec_posts: 'posts', sec_videos: 'videos', sec_sites: 'websites', sec_ids: 'identities',
      d_posts: 'Every niche, a new idea.', d_videos: 'Stories in motion.', d_sites: 'Presence beyond the feed.', d_ids: 'Brands with personality.',
      visit: 'visit site ↗', see_preview: 'see preview', soon: 'launching soon',
      cur_view: 'view', cur_play: 'play', cur_site: 'preview', cur_chat: 'chat', cur_pres: 'presentation', see_pres: 'see presentation ↗', pres_tag: 'interactive presentation', tag_manual: 'brand manual',
      mgmt: ['strategy', 'paid traffic', 'applied AI', 'dashboards'],
      cta: 'let’s make it happen?', cta_btn: 'message on WhatsApp', cta_ig: 'see on Instagram',
      dragon_hint: 'the dragon follows your cursor',
      foot: 'made with coffee, energy drinks and loud headphones.', top: 'back to top ↑',
      seo_line: 'peagá criativo: graphic design, social media, video editing, websites, landing pages and visual identity for brands across Brazil.',
      close: 'Close', prev: 'Previous', next: 'Next'
    }
  };

  /* páginas com link próprio (pdrolidesigner.com.br/videos/ etc.): título e descrição para Google e IAs */
  const site_url = 'https://www.pdrolidesigner.com.br/';
  const routes = {
    '': { sel: '#inicio', name: 'Início',
      title: 'peagá criativo | Pedro, designer gráfico, social media e criação de sites',
      desc: 'Portfólio do Pedro (peagá criativo): design gráfico, social media, edição e captação de vídeo, sites e landing pages, identidade visual e gestão de marketing para marcas de todo o Brasil.' },
    trabalhos: { sel: '#trabalhos', name: 'Trabalhos',
      title: 'Trabalhos | portfólio de design, vídeos e sites — peagá criativo',
      desc: 'Portfólio completo do peagá criativo: posts para redes sociais, vídeos, sites, landing pages e identidades visuais feitos pelo designer Pedro.' },
    posts: { sel: '#posts', name: 'Posts',
      title: 'Posts para redes sociais e social media | peagá criativo',
      desc: 'Posts e artes para Instagram de restaurantes, clínicas, supermercados e marcas locais, criados pelo designer gráfico Pedro (peagá criativo).' },
    videos: { sel: '#videos', name: 'Vídeos',
      title: 'Edição e captação de vídeo, Reels e Shorts | peagá criativo',
      desc: 'Reels e Shorts editados e captados pelo peagá criativo para clínicas, supermercados e marcas que querem aparecer melhor nas redes.' },
    sites: { sel: '#sites', name: 'Sites e landing pages',
      title: 'Criação de sites e landing pages | peagá criativo',
      desc: 'Sites institucionais e landing pages criados pelo peagá criativo: Clínica Nosso Lar, Lucas Oliveira Psicólogo, Casa do Sol Imobiliária e Supermercado Ponto Novo.' },
    identidades: { sel: '#identidades', name: 'Identidade visual',
      title: 'Identidade visual e criação de logotipo | peagá criativo',
      desc: 'Identidades visuais e logotipos criados pelo peagá criativo para CartazON (manual da marca completo), Muving (apresentação interativa), Barranko’s, Flor de Brasa, Espetinhos do Victor e Baran’s.' },
    sobre: { sel: '#sobre', name: 'Sobre',
      title: 'Sobre o Pedro, designer gráfico e estrategista criativo | peagá criativo',
      desc: 'Pedro é designer gráfico e estrategista criativo há mais de 6 anos, à frente do peagá criativo e do Cravo creative studio. Conheça os serviços de design, vídeo, sites e gestão.' },
    contato: { sel: '#contato', name: 'Contato',
      title: 'Contato | orçamento de design, vídeo e sites — peagá criativo',
      desc: 'Fale com o Pedro pelo WhatsApp ou pelo Instagram @peagacriativo e peça um orçamento de social media, vídeo, site ou identidade visual.' }
  };

  const tools = [['Photoshop', 'photoshop'], ['Illustrator', 'illustrator'], ['Figma', 'figma'], ['Canva', 'canva'], ['CapCut', 'capcut'], ['ChatGPT', 'chatgpt'], ['Claude', 'claude']]
    .map(([name, icon]) => ({ name, icon: A + 'icons/' + icon + '.svg' }));

  return { tools, posts, ids, sites, videos, i18n, whatsapp, waText, routes, site_url };
})();
