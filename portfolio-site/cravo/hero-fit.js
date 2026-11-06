/* Ajusta a imagem do estúdio na hero da Cravo para não cobrir o texto e os botões.
   A imagem fica presa no rodapé da hero; aqui ela diminui quando a tela é baixa ou estreita. */
(() => {
  const hero = document.querySelector('.hero');
  const copy = document.querySelector('.hero-copy');
  const cta = document.querySelector('.hero-cta');
  const scene = document.querySelector('.hero-scene');
  if (!hero || !copy || !cta || !scene) return;
  const RATIO = 941 / 1672; // altura / largura da imagem
  const HEADROOM = 0.9;     // o topo da imagem é quase todo transparente: pode encostar um pouco
  const GAP = 14;           // respiro abaixo dos botões
  function fit() {
    scene.style.width = '';
    if (innerWidth <= 700) return; // no celular o layout original já funciona
    const ctaBottom = copy.offsetTop + cta.offsetTop + cta.offsetHeight;
    const below = -(parseFloat(getComputedStyle(scene).bottom) || 0); // a imagem passa do rodapé (bottom negativo)
    const room = hero.clientHeight + below - ctaBottom - GAP;
    const maxW = room / (RATIO * HEADROOM);
    const current = scene.offsetWidth;
    if (maxW < current) scene.style.width = Math.max(380, Math.round(maxW)) + 'px';
  }
  fit();
  addEventListener('resize', fit);
  addEventListener('load', fit);
  if (document.fonts) document.fonts.ready.then(fit);
})();
