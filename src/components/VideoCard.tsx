import React, { useState } from 'react';
import { VideoProject } from '../types';
import { Play } from 'lucide-react';

interface VideoCardProps {
  video: VideoProject;
  onOpenModal?: (video: VideoProject) => void;
}

export function VideoCard({ video }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="group relative aspect-[9/16] w-full rounded-3xl bg-slate-950 border-2 border-slate-800 shadow-[0_14px_40px_rgba(3,21,63,0.35)] overflow-hidden transition-all duration-300 hover:border-[#0057ff] hover:shadow-[0_20px_50px_rgba(0,87,255,0.25)] shrink-0">
      {isPlaying ? (
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={video.title}
          className="w-full h-full border-0 absolute inset-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="relative w-full h-full cursor-pointer" onClick={() => setIsPlaying(true)}>
          {/* YouTube Thumbnail */}
          <img
            src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
            loading="lazy"
          />

          {/* Dark Ambient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Central Play Button */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <button
              className="w-14 h-14 rounded-full bg-[#0057ff] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(0,87,255,0.6)] group-hover:scale-110 group-hover:bg-[#2563eb] transition-all cursor-pointer"
              aria-label={`Reproduzir ${video.title}`}
            >
              <Play className="w-6 h-6 fill-current translate-x-0.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
