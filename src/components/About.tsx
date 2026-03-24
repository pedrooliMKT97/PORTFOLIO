import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function About() {
  const { t } = useTranslation();

  const tools = ['Photoshop', 'Illustrator', 'Figma', 'Premiere Pro', 'After Effects', 'CapCut', 'ChatGPT'];

  return (
    <section id="about" className="py-24 relative z-10 bg-dark">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-0 rounded-full border border-white/10 scale-110" />
              <div className="absolute inset-0 rounded-full border border-primary/30 scale-105 animate-[spin_10s_linear_infinite]" />
              <div className="w-full h-full rounded-full overflow-hidden bg-white/5 relative z-10">
                <img 
                  src="/images/profile.png" 
                  alt="Pedro Designer"
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
              {t('about.title')}
            </h2>
            
            <div className="space-y-6 text-lg text-white/70 mb-12">
              <p>{t('about.description1')}</p>
              <p>{t('about.description2')}</p>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-12">
              <div>
                <h4 className="text-4xl font-display font-bold text-primary mb-2">5+</h4>
                <p className="text-sm text-white/60 uppercase tracking-wider">{t('about.experience')}</p>
              </div>
              <div>
                <h4 className="text-4xl font-display font-bold text-primary mb-2">150+</h4>
                <p className="text-sm text-white/60 uppercase tracking-wider">{t('about.projects')}</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">{t('about.tools')}</h4>
              <div className="flex flex-wrap gap-3">
                {tools.map(tool => (
                  <span key={tool} className="px-4 py-2 rounded-full glass text-sm font-medium">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
