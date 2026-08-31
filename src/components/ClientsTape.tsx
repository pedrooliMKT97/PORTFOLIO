import React, { useState } from 'react';

// Gera a lista de clientes/marcas de mc1 até mc16
const clientLogos = Array.from({ length: 16 }, (_, i) => ({
  id: `mc${i + 1}`,
  name: `Cliente ${i + 1}`,
  basePath: `/logos/mc${i + 1}`,
  fallbackPath: `/mc${i + 1}`,
}));

interface ClientLogoItemProps {
  key?: string;
  logo: {
    id: string;
    name: string;
    basePath: string;
    fallbackPath: string;
  };
}

function ClientLogoItem({ logo }: ClientLogoItemProps) {
  // Tenta formatos: .png -> .svg -> .jpg -> fallback /mcX -> placeholder elegante
  const extensions = ['.png', '.svg', '.jpg', '.jpeg', '.webp'];
  const [extIndex, setExtIndex] = useState(0);
  const [useFallbackFolder, setUseFallbackFolder] = useState(false);
  const [hasError, setHasError] = useState(false);

  const currentFolder = useFallbackFolder ? logo.fallbackPath : logo.basePath;
  const currentSrc = `${currentFolder}${extensions[extIndex]}`;

  const handleError = () => {
    if (extIndex < extensions.length - 1) {
      setExtIndex((prev) => prev + 1);
    } else if (!useFallbackFolder) {
      setUseFallbackFolder(true);
      setExtIndex(0);
    } else {
      setHasError(true);
    }
  };

  return (
    <div className="flex items-center justify-center h-14 sm:h-16 px-4 py-2 shrink-0 group transition-all duration-300">
      {!hasError ? (
        <img
          src={currentSrc}
          alt={logo.name}
          onError={handleError}
          className="max-h-9 sm:max-h-12 max-w-[130px] sm:max-w-[160px] w-auto h-auto object-contain drop-shadow-sm group-hover:scale-110 transition-all duration-300"
          loading="lazy"
        />
      ) : (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 group-hover:text-white group-hover:bg-white/10 transition-colors select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
          <span className="text-xs font-bold uppercase tracking-wider">{logo.id.toUpperCase()}</span>
        </div>
      )}
    </div>
  );
}

export function ClientsTape() {
  return (
    <section className="relative w-full bg-[#081530] border-y border-white/10 py-4 sm:py-5 overflow-hidden select-none z-10 shadow-inner">
      {/* Luz ambiente sutil nas pontas */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-blue-900/20 pointer-events-none" />

      {/* Máscara de fade nas laterais */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_5%,black_95%,transparent)]">
        <div className="flex items-center gap-6 sm:gap-10 w-max animate-marquee-fast hover:[animation-play-state:paused]">
          {/* Duplicado 3x para garantir looping infinito ultra-rápido e contínuo sem cortes */}
          {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, index) => (
            <ClientLogoItem key={`${logo.id}-${index}`} logo={logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
