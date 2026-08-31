import React, { useState } from 'react';
import { PortfolioPost } from '../types';
import { Image } from 'lucide-react';

interface DesignCardProps {
  post: PortfolioPost;
}

export function DesignCard({ post }: DesignCardProps) {
  // Lista de extensões para tentar carregar em sequência (.png -> .jpg -> .jpeg -> .webp)
  const baseSrc = post.imageUrl || '';
  const cleanBase = baseSrc.replace(/\.(png|jpg|jpeg|webp)$/i, '');

  const extensions = ['.png', '.jpg', '.jpeg', '.webp'];
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
    <div
      className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm shrink-0 flex items-center justify-center group"
    >
      {/* Se houver URL de imagem real e sem erro, exibe a imagem */}
      {currentSrc && !hasError ? (
        <img
          src={currentSrc}
          alt={`Arte ${post.id}`}
          onError={handleError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      ) : (
        /* Espaço limpo reservado para colar a imagem */
        <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center text-slate-400 p-4 select-none">
          <Image className="w-8 h-8 text-slate-300 mb-2" />
          <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400">
            {post.imageUrl ? post.imageUrl.replace('/posts/', '') : 'Espaço para Imagem'}
          </span>
        </div>
      )}
    </div>
  );
}
