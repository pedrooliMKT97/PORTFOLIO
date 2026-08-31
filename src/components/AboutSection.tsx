import React, { useState } from 'react';
import { User } from 'lucide-react';
import { assetsConfig } from '../data/assetsConfig';

export function AboutSection() {
  const [photoSrc, setPhotoSrc] = useState<string>(assetsConfig.profilePhoto.src);
  const [hasPhotoError, setHasPhotoError] = useState(false);

  const handlePhotoError = () => {
    if (photoSrc !== assetsConfig.profilePhoto.fallbackSrc) {
      setPhotoSrc(assetsConfig.profilePhoto.fallbackSrc);
    } else {
      setHasPhotoError(true);
    }
  };

  return (
    <section
      id="sobre"
      className="py-12 sm:py-16 md:py-20 px-4 md:px-8 bg-[#0057ff] text-white relative overflow-hidden scroll-mt-16"
    >
      {/* Background Ambience / Subtle Textures */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[400px] h-[400px] rounded-full bg-white/10 blur-[100px] absolute -top-20 -left-20" />
        <div className="w-[350px] h-[350px] rounded-full bg-[#0d1b3d]/40 blur-[100px] absolute -bottom-20 -right-20" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Layout Grid:
            - Mobile: FOTO PRIMEIRO (order-1), TEXTO DEPOIS (order-2)
            - Desktop: TEXTO À ESQUERDA (lg:order-1), FOTO À DIREITA (lg:order-2)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* BLOCO DA FOTO: No mobile order-1 (vem primeiro), no desktop lg:order-2 (vem à direita) */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center w-full">
            <div className="relative w-full max-w-[240px] sm:max-w-[270px] aspect-[4/5] rounded-2xl bg-[#081f5c] border border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col items-center justify-center group">
              
              {!hasPhotoError ? (
                <img
                  src={photoSrc}
                  alt={assetsConfig.profilePhoto.alt}
                  onError={handlePhotoError}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                /* Espaço reservado limpo para a foto caso o arquivo ainda não esteja presente */
                <div className="flex flex-col items-center justify-center text-center p-4 text-white/80 select-none">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-3">
                    <User className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                    Sua Foto Aqui
                  </span>
                  <span className="text-[11px] text-blue-200 mt-0.5">
                    fotodeperfil.png
                  </span>
                </div>
              )}

              {/* Tag inferior discreta */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 py-1.5 px-2.5 rounded-lg bg-[#0d1b3d]/80 backdrop-blur-md border border-white/15 flex items-center justify-between text-[11px] font-semibold text-white shadow-sm">
                <span>Pedro Oliveira</span>
                <span className="text-blue-300">@peagacriativo</span>
              </div>
            </div>
          </div>

          {/* BLOCO DO TEXTO: No mobile order-2 (vem depois da foto), no desktop lg:order-1 (vem à esquerda) */}
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-4 sm:space-y-5 text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[11px] font-bold uppercase tracking-widest text-white">
              Quem Sou Eu
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight font-display leading-tight text-white">
              Criatividade estratégica para marcas que recusam o comum.
            </h2>

            <div className="space-y-3 text-xs sm:text-sm md:text-[15px] text-blue-50 font-normal leading-relaxed">
              <p>
                Meu nome é <strong className="text-white font-bold">Pedro Oliveira</strong>, amplamente conhecido como <strong className="text-white font-bold">Peagá (PH)</strong>. Atuo há mais de 6 anos como designer e há 3 anos lidero projetos completos de Marketing 360.
              </p>
              
              <p>
                Ao longo dessa trajetória, impulsionei o crescimento e a presença de marcas em segmentos diversos, desde grandes operações de varejo até clínicas especializadas.
              </p>

              <p>
                Minha paixão é colaborar com pessoas criativas e negócios dispostos a sair do padrão. Trago uma estética nova, autêntica e alinhada à essência do seu perfil para transformar presença em autoridade e resultados reais.
              </p>
            </div>

            {/* Destaques numéricos compactos */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-3 border-t border-white/15">
              <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-center">
                <div className="text-lg sm:text-xl font-black text-white font-display">+6 Anos</div>
                <div className="text-[10px] text-blue-200 uppercase font-semibold leading-tight mt-0.5">Design</div>
              </div>
              <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-center">
                <div className="text-lg sm:text-xl font-black text-white font-display">+3 Anos</div>
                <div className="text-[10px] text-blue-200 uppercase font-semibold leading-tight mt-0.5">Marketing 360</div>
              </div>
              <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-center">
                <div className="text-lg sm:text-xl font-black text-white font-display">100%</div>
                <div className="text-[10px] text-blue-200 uppercase font-semibold leading-tight mt-0.5">Sob Medida</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
