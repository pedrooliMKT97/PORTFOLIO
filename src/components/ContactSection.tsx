import React from 'react';
import { MessageCircle, Instagram } from 'lucide-react';
import { Bend } from './ui/Bend';

export function ContactSection() {
  return (
    <section id="contato" className="py-20 px-4 md:px-8 bg-[#f8fafd] relative overflow-hidden text-center">
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#0d1b3d] tracking-tight max-w-3xl leading-tight font-display">
          Sua marca merece conteúdo <span className="text-[#0057ff]">profissional</span>
        </h2>

        <p className="mt-3 text-slate-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Vamos agendar uma conversa rápida para entender os objetivos do seu negócio.
        </p>

        {/* Action Buttons Box with Bend */}
        <div className="mt-8 w-full max-w-2xl">
          <Bend intensity={0.4} maxAngle={10} perspective={1000} className="w-full">
            <div className="rounded-3xl bg-white p-6 sm:p-10 shadow-sm border border-slate-200 flex flex-col items-center">
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full">
                {/* WhatsApp Button - Solid GREEN */}
                <a
                  href="https://wa.me/5519997066833?text=Olá%20Peagá!%20Gostaria%20de%20agendar%20uma%20conversa%20sobre%20meu%20projeto."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  WhatsApp
                </a>

                {/* Instagram Direct - Solid PINK (no gradient, no extra grow) */}
                <a
                  href="https://www.instagram.com/peagacriativo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#E1306C] hover:bg-[#c9255d] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm transition-all"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>

                {/* Behance Direct - Solid BLUE */}
                <a
                  href="https://www.behance.net/Pdrolidg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#0057ff] hover:bg-[#0047d4] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 576 512">
                    <path d="M232 237.2c31.8-15.2 48.4-38.2 48.4-74 0-70.6-52.6-87.8-113.3-87.8H0v354.4h171.8c64.4 0 124.9-30.9 124.9-102.9 0-44.5-21.1-77.4-64.7-89.7zM77.9 135.9H151c28.1 0 53.4 7.9 53.4 40.5 0 30.1-19.7 42.2-47.5 42.2h-79v-82.7zm83.3 233.7H77.9V272h84.9c34.3 0 56 14.3 56 50.6 0 35.8-25.9 47-57.6 47zm358.5-240.7H376V94h143.7v34.9zM576 305.2c0-75.9-44.4-139.2-124.9-139.2-78.2 0-131.3 58.8-131.3 135.8 0 79.9 50.3 134.7 131.3 134.7 61.3 0 101-27.6 120.1-86.3H509c-6.7 21.9-34.3 33.5-55.7 33.5-41.3 0-63-24.2-63-65.3h185.1c.3-4.2.6-8.7.6-13.2zM390.4 274c2.3-33.7 24.7-54.8 58.5-54.8 35.4 0 53.2 20.8 56.2 54.8H390.4z" />
                  </svg>
                  Behance
                </a>
              </div>

            </div>
          </Bend>
        </div>
      </div>
    </section>
  );
}
