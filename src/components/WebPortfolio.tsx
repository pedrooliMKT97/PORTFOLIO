import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const websites = [
  { id: 1, title: 'E-commerce Premium', type: 'Web Design', image: '/images/web-1.jpg' },
  { id: 2, title: 'SaaS Dashboard', type: 'UI/UX', image: '/images/web-2.jpg' },
  { id: 3, title: 'Creative Agency', type: 'Landing Page', image: '/images/web-3.jpg' },
  { id: 4, title: 'Fintech App', type: 'Mobile App', image: '/images/web-4.jpg' },
];

export default function WebPortfolio() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if it's mobile to disable horizontal scroll
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (!isMobile && sectionRef.current && scrollRef.current) {
      const pinWrap = scrollRef.current;
      const pinWrapWidth = pinWrap.scrollWidth;
      const horizontalScrollLength = pinWrapWidth - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${pinWrapWidth}`,
        }
      });

      tl.to(pinWrap, {
        x: -horizontalScrollLength,
        ease: "none"
      });

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }
  }, []);

  return (
    <section id="web" ref={sectionRef} className="py-24 md:py-0 md:h-screen relative z-10 bg-dark overflow-hidden flex flex-col justify-center">
      <div className="container mx-auto px-6 md:px-12 mb-12 md:absolute md:top-24 md:left-0 md:right-0 z-20">
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
          {t('web.title')}
        </h2>
        <p className="text-xl text-white/60 max-w-2xl">
          {t('web.subtitle')}
        </p>
      </div>

      <div className="md:pl-[max(1.5rem,calc((100vw-1280px)/2))]">
        <div 
          ref={scrollRef} 
          className="flex flex-col md:flex-row gap-8 md:gap-12 md:w-max md:px-12"
        >
          {websites.map((site, index) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="w-full md:w-[60vw] lg:w-[45vw] group"
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-white/5 mb-6">
                <img 
                  src={site.image} 
                  alt={site.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <a href="#" className="w-16 h-16 rounded-full glass flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                    <ExternalLink className="w-6 h-6" />
                  </a>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-white">{site.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
