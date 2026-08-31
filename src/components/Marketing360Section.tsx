import React from 'react';
import { marketingServices } from '../data/portfolioData';
import { Share2, Video, TrendingUp, SearchCheck, MessageCircle } from 'lucide-react';

export function Marketing360Section() {
  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'srv-1':
        return <Share2 className="w-5 h-5 text-[#0057ff]" />;
      case 'srv-2':
        return <Video className="w-5 h-5 text-[#0057ff]" />;
      case 'srv-3':
        return <TrendingUp className="w-5 h-5 text-[#0057ff]" />;
      default:
        return <SearchCheck className="w-5 h-5 text-[#0057ff]" />;
    }
  };

  return (
    <section id="marketing360" className="py-20 px-4 md:px-8 bg-[#f8fafd] border-t border-slate-200/80">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase text-[#0d1b3d] tracking-tight leading-tight font-display">
            Marketing <span className="text-[#0057ff]">360</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            Soluções completas e integradas para impulsionar o seu negócio.
          </p>
        </div>

        {/* 4 Core Pillars - Clean Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {marketingServices.map((srv) => (
            <div
              key={srv.id}
              className="rounded-3xl bg-white border border-slate-200/90 p-6 flex flex-col justify-between shadow-sm hover:border-[#0057ff]/40 transition-all duration-300 min-h-[190px]"
            >
              <div>
                <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center mb-4 border border-blue-100">
                  {getServiceIcon(srv.id)}
                </div>

                <h3 className="text-base font-bold text-[#0d1b3d] uppercase tracking-tight font-display mb-2">
                  {srv.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {srv.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA direto para WhatsApp */}
        <div className="flex justify-center pt-2">
          <a
            href="https://wa.me/5519997066833?text=Olá%20Peagá!%20Gostaria%20de%20conversar%20sobre%20o%20Marketing%20360%20para%20minha%20empresa."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white/20" />
            Falar sobre Marketing 360 no WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
