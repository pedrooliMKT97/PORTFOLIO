import React from 'react';
import { brandIdentities } from '../data/portfolioData';
import { BrandBannerCard } from './BrandBannerCard';

export function BrandingSection() {
  return (
    <section id="identidade" className="py-20 bg-[#f8fafd] relative overflow-hidden border-t border-slate-200/80">
      {/* Section Title */}
      <div className="max-w-5xl mx-auto text-center px-4 md:px-8 mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase text-[#0d1b3d] tracking-tight font-display">
          Identidade Visual
        </h2>
      </div>

      {/* Infinite Smooth Slower Reverse Marquee with Pure Image Slot Banners */}
      <div className="relative w-full overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
        <div className="flex gap-6 w-max animate-marquee-reverse hover:[animation-play-state:paused]">
          {[...brandIdentities, ...brandIdentities, ...brandIdentities].map((brand, index) => (
            <BrandBannerCard
              key={`${brand.id}-${index}`}
              brand={brand}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
