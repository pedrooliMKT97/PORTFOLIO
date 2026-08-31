/**
 * =======================================================================
 * CONFIGURAÇÃO DA LOGO OFICIAL - PEAGÁ CRIATIVO
 * =======================================================================
 * 
 * Dimensões exatas:
 * - Largura (X): 2827 px
 * - Altura (Y): 1073 px
 * - Proporção (Aspect Ratio): 2827 / 1073 (~2.635 : 1)
 * 
 * INSTRUÇÕES PARA ATUALIZAR A LOGO:
 * 1. Opção 1: Salve seu arquivo de imagem na pasta /public com o nome "logo.png" (ou .svg/.webp/.jpg)
 * 2. Opção 2: Ou altere o valor de `logoUrl` abaixo para o caminho/URL da sua imagem.
 */

export interface BrandLogoConfig {
  logoUrl: string;
  width: number;
  height: number;
  aspectRatio: string;
  altText: string;
  brandName: string;
  tagline: string;
}

export const brandLogoConfig: BrandLogoConfig = {
  // Caminho da imagem da logo oficial
  logoUrl: '/logoph.png',
  
  // Dimensões fornecidas: 2827 X por 1073 Y
  width: 2827,
  height: 1073,
  aspectRatio: '2827 / 1073',
  
  altText: 'Peagá Criativo - Design, Vídeo & Marketing 360',
  brandName: 'PEAGÁ CRIATIVO',
  tagline: 'DESIGN • VÍDEO • MARKETING',
};
