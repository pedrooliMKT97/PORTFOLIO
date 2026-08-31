import React from 'react';
import { PortfolioPost, VideoProject, BrandIdentity } from '../types';
import { X, MessageCircle } from 'lucide-react';

interface LightboxModalProps {
  post: PortfolioPost | null;
  video: VideoProject | null;
  brand: BrandIdentity | null;
  onClose: () => void;
}

export function LightboxModal({ post, video, brand, onClose }: LightboxModalProps) {
  if (!post && !video && !brand) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}>
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-700 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 md:p-8 space-y-5">
          {/* POST MODAL */}
          {post && (
            <div>
              <h2 className="text-xl md:text-2xl font-black uppercase text-[#0d1b3d] font-display">
                {post.title}
              </h2>
              <p className="text-xs font-bold text-[#0057ff] mt-1 uppercase">
                {post.client}
              </p>

              <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {post.description}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center">
                <a
                  href={`https://wa.me/5519997066833?text=Olá!%20Gostei%20do%20projeto%20${encodeURIComponent(post.title)}%20e%20quero%20um%20orçamento.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  Solicitar Arte no WhatsApp
                </a>
              </div>
            </div>
          )}

          {/* VIDEO MODAL */}
          {video && (
            <div>
              <div className="relative aspect-[9/16] w-full max-w-[300px] mx-auto rounded-2xl overflow-hidden bg-black shadow-lg mb-4">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                  title={video.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="text-center">
                <h2 className="text-lg md:text-xl font-black uppercase text-[#0d1b3d] font-display">
                  {video.title}
                </h2>
                <p className="text-xs font-bold text-slate-500 mt-1 uppercase">
                  {video.client}
                </p>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center">
                  <a
                    href={`https://wa.me/5519997066833?text=Olá!%20Vi%20o%20vídeo%20${encodeURIComponent(video.title)}%20e%20gostaria%20de%20produzir%20conteúdo.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-white/20" />
                    Quero Vídeos Como Esse
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* BRANDING MODAL */}
          {brand && (
            <div>
              <h2 className="text-xl md:text-2xl font-black uppercase text-[#0d1b3d] font-display">
                {brand.title.split('—')[0].trim()}
              </h2>
              <p className="text-xs font-bold text-[#0057ff] mt-1 uppercase">
                {brand.subtitle}
              </p>

              <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {brand.description}
              </div>

              <div className="mt-4">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Paleta de Cores:
                </div>
                <div className="flex items-center gap-2">
                  {brand.palette.map((color, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-lg border border-slate-200 shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center">
                <a
                  href={`https://wa.me/5519997066833?text=Olá!%20Gostei%20do%20branding%20de%20${encodeURIComponent(brand.title)}%20e%20quero%20uma%20identidade%20visual.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  Solicitar Identidade Visual
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
