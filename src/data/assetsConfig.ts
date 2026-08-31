/**
 * =======================================================================
 * CENTRAL DE ARQUIVOS DE MÍDIA - PEAGÁ CRIATIVO
 * =======================================================================
 * 
 * Este arquivo centraliza todas as imagens do site.
 * Para adicionar ou trocar suas fotos, basta salvar os arquivos na pasta /public:
 * 
 * 1. FOTO DE PERFIL ("Quem Sou Eu"):
 *    - Salve como: /public/fotodeperfil.png (ou dentro de /public/perfil/fotodeperfil.png)
 * 
 * 2. POSTS DE DESIGN GRÁFICO (Carrossel de Artes):
 *    - Salve dentro de: /public/posts/
 *    - Nomes sugeridos: post1.png, post2.png, post3.png, post4.png, post5.png, post6.png
 * 
 * 3. IDENTIDADE VISUAL (Banners e Projetos de Branding):
 *    - Salve dentro de: /public/identidade/
 *    - Nomes sugeridos: id1.png, id2.png, id3.png, id4.png
 */

export const assetsConfig = {
  // Foto de Perfil de Pedro Oliveira (Peagá)
  profilePhoto: {
    src: '/perfil/fotodeperfil.png',
    fallbackSrc: '/fotodeperfil.png',
    alt: 'Pedro Oliveira (Peagá) - Designer & Estrategista 360',
  },

  // Diretórios públicos
  paths: {
    perfil: '/perfil/',
    posts: '/posts/',
    identidade: '/identidade/',
  },
};
