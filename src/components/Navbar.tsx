import React, { useState, useEffect } from 'react';
import { MessageCircle, Menu, X } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Design Gráfico', href: '#posts' },
    { name: 'Vídeos', href: '#videos' },
    { name: 'Identidade Visual', href: '#identidade' },
    { name: 'Marketing 360', href: '#marketing360' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 py-3 flex justify-center pointer-events-none transition-all duration-300">
      <div
        className={`pointer-events-auto w-auto max-w-fit rounded-full px-3.5 sm:px-5 py-2 flex items-center justify-center gap-2 sm:gap-5 whitespace-nowrap transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgba(13,27,61,0.1)] border border-slate-200/90'
            : 'bg-white/85 backdrop-blur-sm border border-slate-200/70 shadow-sm'
        }`}
      >
        {/* Desktop Navigation Links - Centered & Close */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[11px] lg:text-xs uppercase tracking-wider font-semibold text-slate-700 hover:text-[#0057ff] transition-colors py-1 whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Separator on Desktop */}
        <div className="hidden md:block w-px h-4 bg-slate-200" />

        {/* WhatsApp Button */}
        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/5519997066833?text=Olá!%20Vim%20pelo%20seu%20portfolio%20e%20gostaria%20de%20um%20orçamento."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white/20" />
            <span>WhatsApp</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full text-slate-700 hover:text-[#0057ff] hover:bg-slate-100 transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto fixed top-16 left-4 right-4 max-w-sm mx-auto p-4 rounded-2xl bg-white shadow-xl border border-slate-200 animate-in fade-in duration-200 md:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-800 hover:bg-slate-50 hover:text-[#0057ff] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
