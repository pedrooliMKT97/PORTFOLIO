import React from 'react';
import { videoProjects } from '../data/portfolioData';
import { VideoCard } from './VideoCard';

export function VideoSection() {
  return (
    <section id="videos" className="py-20 bg-[#03153f] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[500px] h-[350px] rounded-full bg-[#0057ff]/15 blur-[120px] absolute -top-10 left-1/4" />
        <div className="w-[400px] h-[400px] rounded-full bg-[#052a8f]/30 blur-[120px] absolute -bottom-10 right-10" />
      </div>

      {/* Section Title */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4 md:px-8 mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight font-display">
          Vídeos & Audiovisual
        </h2>
      </div>

      {/* Infinite Smooth Slower Video Marquee */}
      <div className="relative z-10 w-full overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
        <div className="flex gap-6 w-max animate-marquee-slow hover:[animation-play-state:paused]">
          {[...videoProjects, ...videoProjects, ...videoProjects].map((video, index) => (
            <div key={`${video.id}-${index}`} className="w-[230px] sm:w-[260px] md:w-[280px] shrink-0">
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
