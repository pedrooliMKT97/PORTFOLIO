import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Play } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useState } from 'react';

const videos = [
  { id: 1, videoId: 'pmNMOgQGgLI' },
  { id: 2, videoId: '7dEmi6PMEK0' },
  { id: 3, videoId: 'Rz-3SishJyA' },
  { id: 4, videoId: 'jT83MSmCn7o' },
  { id: 5, videoId: 'CnlY4TmcUDk' },
  { id: 6, videoId: 'F0DsKTPpY1Y' },
  { id: 7, videoId: 'wFxgr8pYL6s' },
  { id: 8, videoId: 'xYzri8HMQUA' },
  { id: 9, videoId: 'xCY9lJ61S2M' },
];

function VideoCard({ videoId, id, index }: { videoId: string; id: number; index: number }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative aspect-[9/16] overflow-hidden rounded-3xl bg-white/5"
    >
      {!isPlaying ? (
        <div 
          className="relative w-full h-full cursor-pointer"
          onClick={() => setIsPlaying(true)}
        >
          <img 
            src={thumbnailUrl} 
            alt={`Video Thumbnail ${id}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-8 h-8 text-white fill-white" />
            </div>
          </div>
        </div>
      ) : (
        <iframe 
          src={embedUrl} 
          title={`Video ${id}`}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
      
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <a 
          href={`https://www.youtube.com/watch?v=${videoId}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary transition-colors"
          title="Abrir no YouTube"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="w-5 h-5 text-white" />
        </a>
      </div>
    </motion.div>
  );
}

export default function VideoPortfolio() {
  const { t } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', skipSnaps: false }
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="video" className="py-24 relative z-10 bg-dark overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 text-center flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold mb-4"
          >
            {t('video.title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/60 max-w-2xl mx-auto"
          >
            {t('video.subtitle')}
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {videos.map((video, index) => (
                <div 
                  key={video.id} 
                  className="flex-[0_0_80%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] pl-4 min-w-0"
                >
                  <VideoCard videoId={video.videoId} id={video.id} index={index} />
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors z-10 hidden md:flex"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <button 
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors z-10 hidden md:flex"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="https://www.youtube.com/@Pdrolidg"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-2 px-8 py-4 glass text-white rounded-full font-semibold hover:bg-white/10 transition-all hover:scale-105"
          >
            <span>Ver canal no YouTube</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
