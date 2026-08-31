import React from 'react';
import { ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-200 py-8 px-4 md:px-8 text-slate-500 text-xs">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Brand identity */}
        <div className="flex items-center gap-2">
          <span className="font-bold uppercase tracking-wider text-[#0d1b3d]">
            Peagá Criativo
          </span>
          <span className="text-slate-400">&bull; Design, Vídeo & Marketing 360</span>
        </div>

        {/* Copyright notice */}
        <div className="text-center font-medium">
          &copy; {new Date().getFullYear()} <span className="text-[#0057ff] font-bold">Peagá Criativo</span>. Todos os direitos reservados.
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
        >
          <span>Topo</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  );
}
