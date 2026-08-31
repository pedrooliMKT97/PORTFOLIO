import React, { useState } from 'react';
import { BrandIdentity } from '../types';
import { Image } from 'lucide-react';

interface BrandBannerCardProps {
  brand: BrandIdentity;
  key?: string;
}

export function BrandBannerCard({ brand }: BrandBannerCardProps) {
  const baseSrc = brand.bannerUrl || '';
  const cleanBase = baseSrc.replace(/\.(png|jpg|jpeg|webp)$/i, '');

  const extensions = ['.jpg', '.png', '.jpeg', '.webp'];
  const [extIndex, setExtIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  const currentSrc = cleanBase ? `${cleanBase}${extensions[extIndex]}` : '';

  const handleError = () => {
    if (extIndex < extensions.length - 1) {
      setExtIndex((prev) => prev + 1);
    } else {
      setHasError(true);
    }
  };

  return (
    <div className="w-[300px] sm:w-[360px] md:w-[400px] shrink-0 rounded-3xl bg-slate-100 border border-slate-200 shadow-sm overflow-hidden flex flex-col group">
      {/* Clean Image Slot for Identity Artwork */}
      <div className="relative aspect-[16/10] w-full bg-slate-100 flex items-center justify-center select-none overflow-hidden">
        {currentSrc && !hasError ? (
          <img
            src={currentSrc}
            alt={brand.title || 'Identidade Visual'}
            onError={handleError}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 p-4">
            <Image className="w-8 h-8 text-slate-300 mb-2" />
            <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400">
              {brand.bannerUrl ? brand.bannerUrl.replace('/identidade/', '') : 'Espaço para Imagem'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
