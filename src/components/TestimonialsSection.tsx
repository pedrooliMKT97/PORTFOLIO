import React from 'react';
import { testimonials } from '../data/portfolioData';
import { Quote, Star, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Bend } from './ui/Bend';

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden border-t border-slate-200/70">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-xs font-extrabold uppercase tracking-widest text-[#0a5cff] mb-3">
            <Star className="w-3.5 h-3.5 fill-current" />
            Resultados Comprovados
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-[#0d1b3d] tracking-tight font-display">
            Marcas que <span className="text-[#0a5cff]">cresceram com nossos projetos</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            O que nossos clientes dizem sobre o impacto do design, dos vídeos e da estratégia nas suas vendas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test) => (
            <div key={test.id} className="h-full">
              <Bend
                intensity={0.4}
                maxAngle={10}
                perspective={800}
                showSheen={false}
                className="h-full"
              >
                <div className="rounded-3xl bg-[#f8fafd] border border-slate-200/90 p-6 flex flex-col justify-between h-full shadow-[0_8px_30px_rgba(13,27,61,0.04)] hover:border-[#0a5cff]/40 transition-colors">
                  <div>
                    {/* Rating Stars */}
                    <div className="flex items-center gap-1 text-amber-400 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>

                    <Quote className="w-8 h-8 text-[#0a5cff]/20 mb-2" />

                    <p className="text-sm text-slate-700 leading-relaxed italic">
                      "{test.quote}"
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/80">
                    {/* Metric Result Badge */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold mb-3 border border-emerald-200/60">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {test.metric}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0a5cff] text-white flex items-center justify-center font-bold text-xs font-display">
                        {test.avatarText}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#0d1b3d]">
                          {test.author}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          {test.role} • {test.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Bend>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
