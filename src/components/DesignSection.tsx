import React from 'react';
import { portfolioPosts } from '../data/portfolioData';
import { DesignCard } from './DesignCard';
import { Instagram, ArrowUpRight } from 'lucide-react';

export function DesignSection() {
  return (
    <section id="posts" className="py-20 bg-[#f8fafd] relative overflow-hidden border-t border-slate-200/80">
      {/* Section Title */}
      <div className="max-w-5xl mx-auto text-center px-4 md:px-8 mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase text-[#0d1b3d] tracking-tight font-display">
          Design gráfico e direção visual
        </h2>
      </div>

      {/* Infinite Smooth Slower Marquee with pure image slots */}
      <div className="relative w-full overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
        <div className="flex gap-6 w-max animate-marquee-slow hover:[animation-play-state:paused]">
          {[...portfolioPosts, ...portfolioPosts, ...portfolioPosts].map((post, index) => (
            <div key={`${post.id}-${index}`} className="w-[260px] sm:w-[290px] md:w-[310px] shrink-0">
              <DesignCard post={post} />
            </div>
          ))}
        </div>
      </div>

      {/* Botões para explorar mais no Instagram e Behance */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 px-4 max-w-xl mx-auto">
        <a
          href="https://www.instagram.com/peagacriativo"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#E1306C] hover:bg-[#c9255d] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
        >
          <Instagram className="w-4 h-4" />
          <span>Ver mais no Instagram</span>
          <ArrowUpRight className="w-4 h-4 opacity-80" />
        </a>

        <a
          href="https://www.behance.net/Pdrolidg"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#0057ff] hover:bg-[#0047d4] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 576 512">
            <path d="M232 237.2c31.8-15.2 48.4-38.2 48.4-74 0-70.6-52.6-87.8-113.3-87.8H0v354.4h171.8c64.4 0 124.9-30.9 124.9-102.9 0-44.5-21.1-77.4-64.7-89.7zM77.9 135.9H151c28.1 0 53.4 7.9 53.4 40.5 0 30.1-19.7 42.2-47.5 42.2h-79v-82.7zm83.3 233.7H77.9V272h84.9c34.3 0 56 14.3 56 50.6 0 35.8-25.9 47-57.6 47zm358.5-240.7H376V94h143.7v34.9zM576 305.2c0-75.9-44.4-139.2-124.9-139.2-78.2 0-131.3 58.8-131.3 135.8 0 79.9 50.3 134.7 131.3 134.7 61.3 0 101-27.6 120.1-86.3H509c-6.7 21.9-34.3 33.5-55.7 33.5-41.3 0-63-24.2-63-65.3h185.1c.3-4.2.6-8.7.6-13.2zM390.4 274c2.3-33.7 24.7-54.8 58.5-54.8 35.4 0 53.2 20.8 56.2 54.8H390.4z" />
          </svg>
          <span>Portfólio no Behance</span>
          <ArrowUpRight className="w-4 h-4 opacity-80" />
        </a>
      </div>
    </section>
  );
}
