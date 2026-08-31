import { PortfolioPost, VideoProject, BrandIdentity, ServicePackage, Testimonial } from '../types';

export const portfolioPosts: PortfolioPost[] = [
  {
    id: 'post-1',
    title: 'Carrossel Estratégico de Autoridade',
    category: 'Carrossel',
    client: 'Consultoria Financeira & Gestão',
    description: 'Sequência de 7 lâminas com retenção de 84% de leitura completa, focada em transformar termos contábeis complexos em insights práticos.',
    engagementStat: '+142% salvamentos',
    tags: ['Estratégia', 'Retenção', 'Tipografia'],
    themeColor: '#0a5cff',
    accentColor: '#e8f0ff',
    thumbnailSvgType: 'carousel',
    imageUrl: '/posts/post1.png'
  },
  {
    id: 'post-2',
    title: 'Campanha de Black Friday & Lançamento',
    category: 'Oferta',
    client: 'E-commerce & Moda Premium',
    description: 'Composição visual de alto contraste e urgência sofisticada, pensada para gerar conversão imediata sem desvalorizar a marca.',
    engagementStat: '3.8x ROI em Ads',
    tags: ['Ads', 'Conversão', 'Direção de Arte'],
    themeColor: '#0d1b3d',
    accentColor: '#38bdf8',
    thumbnailSvgType: 'discount',
    imageUrl: '/posts/post2.png'
  },
  {
    id: 'post-3',
    title: 'Posicionamento Editorial High-End',
    category: 'Feed Estático',
    client: 'Clínica Dermatológica & Estética',
    description: 'Visual clean, elegante e minimalista com foco em transmitir credibilidade médica e sofisticação no feed do Instagram.',
    engagementStat: '+89% cliques no link',
    tags: ['Branding', 'Clean', 'Saúde'],
    themeColor: '#052a8f',
    accentColor: '#c7d2fe',
    thumbnailSvgType: 'luxury',
    imageUrl: '/posts/post3.png'
  },
  {
    id: 'post-4',
    title: 'Infográfico Dinâmico de Mercado',
    category: 'Educativo',
    client: 'Startup SaaS & Tech',
    description: 'Estruturação visual de dados e métricas com hierarquia clara e leitura ágil para compartilhamento massivo.',
    engagementStat: '+310% compartilhamentos',
    tags: ['Data Design', 'B2B', 'Tech'],
    themeColor: '#0369a1',
    accentColor: '#e0f2fe',
    thumbnailSvgType: 'infographic',
    imageUrl: '/posts/post4.png'
  },
  {
    id: 'post-5',
    title: 'Identidade de Produto & Nova Coleção',
    category: 'Lançamento',
    client: 'Joalheria & Acessórios',
    description: 'Design refinado com texturas de iluminação suave e enquadramentos que valorizam o detalhe do acabamento.',
    engagementStat: 'Esgotou em 48h',
    tags: ['Lançamento', 'Luxo', 'Feed'],
    themeColor: '#1e293b',
    accentColor: '#60a5fa',
    thumbnailSvgType: 'typography',
    imageUrl: '/posts/post5.png'
  },
  {
    id: 'post-6',
    title: 'Post Interativo de Engajamento & Quiz',
    category: 'Carrossel',
    client: 'Gastronomia & Restaurante',
    description: 'Formato dinâmico de gamificação no feed que estimula comentários e salva o post para consulta posterior.',
    engagementStat: '+220% comentários',
    tags: ['Social Media', 'Food', 'Gamificação'],
    themeColor: '#0f172a',
    accentColor: '#93c5fd',
    thumbnailSvgType: 'saas',
    imageUrl: '/posts/post6.png'
  },
  {
    id: 'post-7',
    title: 'Campanha de Posicionamento & Branding',
    category: 'Feed Estático',
    client: 'Arquitetura & Design de Interiores',
    description: 'Composição minimalista com foco em paleta sóbria, texturas e linhas puras.',
    engagementStat: '+175% alcance orgânico',
    tags: ['Branding', 'Minimalismo', 'Arquitetura'],
    themeColor: '#0f172a',
    accentColor: '#38bdf8',
    thumbnailSvgType: 'luxury',
    imageUrl: '/posts/post7.png'
  },
  {
    id: 'post-8',
    title: 'Carrossel Educativo de Alto Valor',
    category: 'Carrossel',
    client: 'Mentoria & Negócios Digitais',
    description: 'Framework visual passo a passo para transformar conteúdos densos em leitura magnética.',
    engagementStat: '+280% salvamentos',
    tags: ['Educação', 'Retenção', 'Storytelling'],
    themeColor: '#0a5cff',
    accentColor: '#e0f2fe',
    thumbnailSvgType: 'carousel',
    imageUrl: '/posts/post8.png'
  },
  {
    id: 'post-9',
    title: 'Anúncio de Alta Conversão para Tráfego Pago',
    category: 'Oferta',
    client: 'Infoproduto & Comunidade',
    description: 'Criativo desenhado estrategicamente para parar o scroll e maximizar a taxa de cliques (CTR).',
    engagementStat: '4.2% CTR Médio',
    tags: ['Performance', 'Ads', 'Direct Response'],
    themeColor: '#0d1b3d',
    accentColor: '#60a5fa',
    thumbnailSvgType: 'discount',
    imageUrl: '/posts/post9.png'
  }
];

export const videoProjects: VideoProject[] = [
  {
    id: 'vid-1',
    title: 'Reels Dinâmico — Gastronomia & Sabor',
    youtubeId: 'gYFRNGktTyQ',
    category: 'Reels',
    duration: '0:34',
    client: 'Restaurante & Bar',
    highlight: 'Cortes no beat, color grading quente e sound design imersivo',
    viewsStat: '145k+ views',
    aspectRatio: '9/16'
  },
  {
    id: 'vid-2',
    title: 'Captação & Rotina Comercial',
    youtubeId: '_k_vZQakGjU',
    category: 'Institucional',
    duration: '0:45',
    client: 'Indústria & Serviços',
    highlight: 'Imagens em 4K, estabilização fluida e storytelling de bastidores',
    viewsStat: '42k+ views',
    aspectRatio: '9/16'
  },
  {
    id: 'vid-3',
    title: 'Vídeo Promocional de Alto Impacto',
    youtubeId: 'pmNMOgQGgLI',
    category: 'Anúncio',
    duration: '0:28',
    client: 'Varejo & Moda',
    highlight: 'Gatilhos visuais nos primeiros 3 segundos para reter retenção máxima',
    viewsStat: '88k+ views',
    aspectRatio: '9/16'
  },
  {
    id: 'vid-4',
    title: 'Edição de Conteúdo & Cortes Rápidos',
    youtubeId: '7dEmi6PMEK0',
    category: 'TikTok',
    duration: '0:38',
    client: 'Criador de Conteúdo',
    highlight: 'Legendas cinéticas customizadas, zoom cuts e sound effects',
    viewsStat: '210k+ views',
    aspectRatio: '9/16'
  },
  {
    id: 'vid-5',
    title: 'Showcase de Produto em Movimento',
    youtubeId: 'Rz-3SishJyA',
    category: 'Reels',
    duration: '0:31',
    client: 'Marca de Cosméticos',
    highlight: 'Macro close-ups, transições invisíveis e motion graphics',
    viewsStat: '67k+ views',
    aspectRatio: '9/16'
  },
  {
    id: 'vid-6',
    title: 'Captação Presencial & Eventos',
    youtubeId: 'pDC6vPsd_us',
    category: 'Comércio',
    duration: '0:50',
    client: 'Evento Corporativo',
    highlight: 'Cobertura completa com ângulos variados e entrega em 24h',
    viewsStat: '39k+ views',
    aspectRatio: '9/16'
  }
];

export const brandIdentities: BrandIdentity[] = [
  {
    id: 'brand-1',
    title: 'Verve — Café & Torrefação Especial',
    subtitle: 'Branding Completo & Embalagens',
    client: 'Verve Coffee Lab',
    year: '2025',
    description: 'Criação de identidade visual autêntica inspirada no processo artesanal de torra. Tipografia expressiva, paleta terrosa equilibrada com azul cobalto e sistema de embalagens modulares.',
    palette: ['#0a5cff', '#0d1b3d', '#f1f5f9', '#94a3b8'],
    typography: 'Syne Display & Plus Jakarta Sans',
    elements: ['Logotipo Principal & Reduzido', 'Manual de Marca 48p', 'Embalagens Doypack', 'Papelaria & Uniformes'],
    style: 'Modern Craftsman',
    bannerUrl: '/identidade/id1.jpg'
  },
  {
    id: 'brand-2',
    title: 'Lumina — Odontologia Estética',
    subtitle: 'Identidade Visual & Sinalização',
    client: 'Clínica Dra. Mariana Luz',
    year: '2025',
    description: 'Reposicionamento de marca para público classe A. O símbolo unifica a geometria do sorriso com reflexos de luz, transmitindo precisão cirúrgica e acolhimento humano.',
    palette: ['#052a8f', '#2563eb', '#eff6ff', '#cbd5e1'],
    typography: 'Outfit Serif & Plus Jakarta Sans',
    elements: ['Monograma Geométrico', 'Fachada & Recepção', 'Envelopes & Receituários', 'Grid para Social Media'],
    style: 'Minimal Luxe',
    bannerUrl: '/identidade/id2.jpg'
  },
  {
    id: 'brand-3',
    title: 'Nexus — Software de Logística',
    subtitle: 'Branding B2B & Design System',
    client: 'Nexus Tech Systems',
    year: '2024',
    description: 'Sistema de marca dinâmico para uma startup de supply chain. Construído sobre grids rígidos e linhas conectoras que representam nós de rede e agilidade operacional.',
    palette: ['#0284c7', '#0f172a', '#e0f2fe', '#64748b'],
    typography: 'Space Grotesk & Inter',
    elements: ['Ícone de App', 'Manual de Aplicação', 'Apresentação Comercial Pitch', 'Design System para Web'],
    style: 'Tech Precision',
    bannerUrl: '/identidade/id3.jpg'
  },
  {
    id: 'brand-4',
    title: 'Aura — Studio de Arquitetura',
    subtitle: 'Naming, Logo & Brand Guidelines',
    client: 'Aura Arquitetura & Interiores',
    year: '2024',
    description: 'Exploração do espaço negativo e proporções áureas. A marca traduz a sensação de amplitude, ventilação e luz natural que os projetos do estúdio proporcionam.',
    palette: ['#1e293b', '#3b82f6', '#f8fafc', '#94a3b8'],
    typography: 'Syne & Plus Jakarta Sans',
    elements: ['Brandbook Digital', 'Placas de Obra', 'Pranchas Arquitetônicas', 'Kit Boas-vindas Clientes'],
    style: 'Architectural Brutalism',
    bannerUrl: '/identidade/id4.jpg'
  }
];

export const marketingServices: ServicePackage[] = [
  {
    id: 'srv-1',
    title: 'Gestão de Redes Sociais',
    subtitle: 'Constância e Estratégia de Conteúdo',
    description: 'Planejamento mensal, calendário editorial estruturado, criação de designs de alta conversão e legendas persuasivas que constroem autoridade no seu nicho.',
    features: [
      'Planejamento quinzenal de pautas',
      'Carrosséis, posts estáticos e stories',
      'Copywriting focado em engajamento e vendas',
      'Relatório mensal de métricas e evolução'
    ],
    badge: 'Essencial'
  },
  {
    id: 'srv-2',
    title: 'Captação & Edição de Vídeo',
    subtitle: 'Vídeos que Retêm até o Último Segundo',
    description: 'Gravação presencial no seu negócio com equipamentos profissionais (4K, luz, áudio sem ruído) e pós-produção dinâmica pensada para o algoritmo de Reels e TikTok.',
    features: [
      'Gravação no local com roteiro prévio',
      'Edição com ritmo, trilha licenciada e sound effects',
      'Legendas dinâmicas com destaque de palavras',
      'Formatos otimizados para 9:16 e 16:9'
    ],
    isPopular: true,
    badge: 'Mais Procurado'
  },
  {
    id: 'srv-3',
    title: 'Tráfego Pago (Meta & Google Ads)',
    subtitle: 'Alcance Qualificado e Mais Vendas',
    description: 'Criação e gerenciamento de campanhas inteligentes para colocar seus criativos na frente do público certo que tem real interesse e poder de compra.',
    features: [
      'Segmentação avançada de público-alvo',
      'Testes A/B de criativos e copys',
      'Otimização contínua de custo por clique/lead',
      'Pixel e conversões configurados corretamente'
    ],
    badge: 'Escala'
  },
  {
    id: 'srv-4',
    title: 'Análise & Diagnóstico de Perfil',
    subtitle: 'Auditoria Completa para Destravar seu Crescimento',
    description: 'Diagnóstico aprofundado do seu posicionamento atual: biografia, destaques, identidade visual, narrativa e plano de ação imediato para atrair clientes.',
    features: [
      'Análise de pontos fracos e oportunidades',
      'Reformulação de Bio e Destaques estratégicos',
      'Guia de tom de voz e estética',
      'Plano de ação de 30 dias para implementação'
    ],
    badge: 'Estratégico'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Lucas Mendes',
    role: 'Sócio-Fundador',
    company: 'Burger & Co Gastronomia',
    avatarText: 'LM',
    quote: 'Os vídeos do Peagá mudaram a percepção do nosso restaurante. No primeiro mês de Reels com captação presencial, o movimento nas sextas-feiras dobrou.',
    metric: '+118% Faturamento em 60 dias'
  },
  {
    id: 'test-2',
    author: 'Dra. Camila Vasconcelos',
    role: 'Médica Dermatologista',
    company: 'Instituto Vasconcelos',
    avatarText: 'CV',
    quote: 'Eu tinha vergonha do meu Instagram antigo. A identidade visual e os posts criados pelo Peagá trouxeram a sofisticação que minha clínica precisava.',
    metric: '+94 Novas consultas agendadas'
  },
  {
    id: 'test-3',
    author: 'Rodrigo Antunes',
    role: 'Diretor Comercial',
    company: 'Nova Soluções Imobiliárias',
    avatarText: 'RA',
    quote: 'Trabalho de marketing 360 impecável: captação nos imóveis, anúncios rodando no público certo e criativos que se destacam de qualquer concorrente.',
    metric: '4.2x Retorno sobre investimento'
  }
];
