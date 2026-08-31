import React, { useState } from 'react';
import { Bend } from './ui/Bend';
import { brandLogoConfig } from '../data/logoConfig';

export function HeroLogo() {
  // Try configured logoUrl first; if fails, fall back to /logo.svg
  const [currentSrc, setCurrentSrc] = useState<string>(brandLogoConfig.logoUrl);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (currentSrc !== '/logo.svg') {
      setCurrentSrc('/logo.svg');
    } else {
      setHasError(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full my-2 sm:my-4 select-none px-2 sm:px-4">
      {/* 3D Bend Effect directly on the Logo with no bounding box or rectangular card */}
      <Bend
        intensity={0.6}
        maxAngle={14}
        perspective={1200}
        ambientFloat={true}
        showSheen={false}
        className="w-full max-w-[420px] sm:max-w-[620px] md:max-w-[850px] lg:max-w-[1080px] xl:max-w-[1200px] flex justify-center items-center"
        id="hero-bend-logo-container"
      >
        <div className="relative w-full flex items-center justify-center cursor-grab active:cursor-grabbing">
          {!hasError ? (
            <img
              src={currentSrc}
              alt={brandLogoConfig.altText}
              onError={handleError}
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain max-h-[30vh] sm:max-h-[44vh] md:max-h-[55vh] lg:max-h-[65vh] drop-shadow-[0_15px_35px_rgba(13,27,61,0.12)] transition-transform duration-300 hover:scale-[1.02] will-change-transform"
            />
          ) : (
            /* Fallback Tipográfico Limpo e Sem Retângulo/Caixa */
            <div className="flex items-center justify-center gap-4 sm:gap-6 py-6">
              <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl bg-[#0d1b3d] flex items-center justify-center shadow-xl shrink-0">
                <svg className="w-10 h-10 sm:w-16 sm:h-16 text-white" viewBox="0 0 100 100" fill="none">
                  <path
                    d="M26 22H54C65.0457 22 74 30.9543 74 42C74 53.0457 65.0457 62 54 62H40V82H26V22Z"
                    fill="#0057ff"
                  />
                  <path
                    d="M40 34H52C56.4183 34 60 37.5817 60 42C60 46.4183 56.4183 50 52 50H40V34Z"
                    fill="#ffffff"
                  />
                  <rect x="64" y="68" width="14" height="14" rx="3" fill="#25D366" />
                </svg>
              </div>

              <div className="text-left">
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#0d1b3d] uppercase font-display leading-none">
                  PEAGÁ<span className="text-[#0057ff]">CRIATIVO</span>
                </h1>
                <p className="mt-2 text-xs sm:text-sm md:text-base font-bold tracking-[0.2em] text-slate-500 uppercase">
                  DESIGN &bull; VÍDEO &bull; MARKETING
                </p>
              </div>
            </div>
          )}
        </div>
      </Bend>
    </div>
  );
}
