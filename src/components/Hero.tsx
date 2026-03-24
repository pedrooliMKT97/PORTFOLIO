import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, CheckCircle2 } from 'lucide-react';
import Background3D from './Background3D';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      <Background3D />
      
      <div className="container mx-auto px-6 md:px-12 relative z-20 flex flex-col items-center text-center flex-grow justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="inline-block px-4 py-1.5 mb-6 rounded-full glass-red text-primary text-sm font-semibold tracking-wider uppercase"
        >
          PDROLI.DG / Pedro Designer
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter max-w-5xl leading-[1.1]"
        >
          {t('hero.headline')}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl font-light"
        >
          {t('hero.subheadline')}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <a
            href="#design"
            className="group flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,43,43,0.4)]"
          >
            <span>{t('hero.cta_primary')}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="px-8 py-4 glass text-white rounded-full font-semibold hover:bg-white/10 transition-all hover:scale-105"
          >
            {t('hero.cta_secondary')}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.2 }}
          className="mt-16 flex flex-wrap justify-center gap-6 md:gap-12 text-sm md:text-base text-white/70"
        >
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span>{t('hero.proof_experience')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span>{t('hero.proof_projects')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span>{t('hero.proof_location')}</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
      >
        <span className="text-xs text-white/40 uppercase tracking-widest mb-2">{t('hero.scroll')}</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
