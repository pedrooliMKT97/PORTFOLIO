import React, { useRef } from 'react';
import { HeroLogo } from './HeroLogo';
import { ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Track scroll position to dynamically shrink logo on scroll
  const { scrollY } = useScroll();
  
  // On desktop: Starts imposing & grand (1.2), shrinks smoothly to 0.68 as user scrolls
  const scale = useTransform(scrollY, [0, 420], [1.2, 0.68]);
  const opacity = useTransform(scrollY, [0, 550], [1, 0.85]);
  const translateY = useTransform(scrollY, [0, 420], [0, 25]);

  return (
    <section
      ref={containerRef}
      id="inicio"
      className="relative min-h-0 sm:min-h-[80vh] lg:min-h-[88vh] flex flex-col items-center justify-center pt-20 sm:pt-24 lg:pt-28 pb-4 sm:pb-10 lg:pb-12 px-3 sm:px-6 md:px-8 overflow-hidden bg-gradient-to-b from-[#f8fafd] via-white to-[#f8fafd]"
    >
      {/* Subtle Geometric Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="w-[800px] h-[550px] rounded-full bg-[#0057ff]/[0.045] blur-[140px] absolute top-1/3 -translate-y-1/2" />
        <div className="absolute inset-0 bg-[radial-gradient(#0d1b3d_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.04]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center w-full">
        {/* HERO LOGO WITH DYNAMIC DESKTOP SCROLL SHRINK */}
        <motion.div
          style={{ scale, opacity, y: translateY }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center origin-center will-change-transform"
        >
          <HeroLogo />
        </motion.div>

        {/* Smooth Scroll Indicator - Hidden on very small mobile to let 'Sobre Mim' peek immediately */}
        <motion.a
          style={{ opacity }}
          href="#sobre"
          className="hidden sm:inline-flex mt-4 lg:mt-6 flex-col items-center gap-1 text-slate-400 hover:text-[#0057ff] text-[10px] font-bold uppercase tracking-[0.25em] transition-colors"
        >
          <span>Explorar</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-slate-400" />
        </motion.a>
      </div>
    </section>
  );
}
