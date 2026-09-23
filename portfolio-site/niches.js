const designItems = window.PORTFOLIO.categories.find(category => category.id === 'design').items;
const selectArt = names => names.map(name => designItems.find(item => item.image === `assets/${name}.webp`)).filter(Boolean);
const newArt = (image, title) => ({image:`assets/${image}`, title});
const gastronomy = selectArt(['pizza-combo','capim-leao','pao-alho','pizza-delivery','combo-casal','victor-rodizio','barrankos-localizacao']);
gastronomy.splice(1, 0, newArt('velho-chico-rodizio.jpg', 'Velho Chico — Rodízio'));
gastronomy.splice(6, 0, newArt('velho-chico-delivery.jpg', 'Velho Chico — Delivery'));
const psychology = selectArt(['nosso-lar-historia','nosso-lar-terapias','bem-estar','nosso-lar-vaga']);
psychology.unshift(newArt('nosso-lar-historia-nova.jpg', 'Nosso Lar — Nossa história'));
psychology.push(newArt('design-silencio.png', 'O cuidado começa no silêncio'));
const sports = selectArt(['valorant']);
sports.unshift(newArt('poster-escocia-brasil.png', 'Escócia x Brasil'));
sports.push(newArt('poster-brasil-marrocos.png', 'Brasil x Marrocos'), newArt('poster-matheus-cunha.png', 'Matheus Cunha'));
window.PORTFOLIO.niches = [
  {id:'restaurantes', title:'Gastronomia', subtitle:'Design que abre o apetite.', cover:'assets/cover-gastronomia.jpg', tone:'#0c4471', items:gastronomy},
  {id:'psicologos', title:'Psicologia & Cuidado', subtitle:'Conexão, cuidado e presença.', cover:'assets/cover-psicologia.jpg', tone:'#326b6a', items:psychology},
  {id:'advogados', title:'Advocacia', subtitle:'Clareza que transmite confiança.', cover:'assets/cover-advocacia.jpg', tone:'#0c4471', items:[]},
  {id:'esportes', title:'Esportes & eSports', subtitle:'Dentro e fora do jogo.', cover:'assets/cover-esportes.jpg', tone:'#12362c', items:sports},
  {id:'posters', title:'Pôsteres & Design', subtitle:'Ideias livres. Impacto visual.', cover:'assets/cover-posteres.jpg', tone:'#382557', items:selectArt(['lanterns','declinio','bleach','ferramentas','babi-pais','contador'])}
];
