import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider';

const cases = [
  {
    id: 1,
    client: 'Espetinhos do Victor',
    year: '2023',
    beforeImage: '/images/id-victor-before.png',
    afterImage: '/images/id-victor-after.png',
    tags: ['Branding', 'Logo', 'Guidelines']
  },
  {
    id: 2,
    client: 'Flor de Brasa',
    year: '2024',
    beforeImage: '/images/id-brasa-before.png',
    afterImage: '/images/id-brasa-after.png',
    tags: ['Visual Identity', 'Packaging']
  }
];

export default function IdentityPortfolio() {
  const { t } = useTranslation();

  return (
    <section id="identity" className="py-24 relative z-10 bg-dark">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
            {t('identity.title')}
          </h2>
          <p className="text-xl text-white/60 max-w-2xl">
            {t('identity.subtitle')}
          </p>
        </div>

        <div className="space-y-24">
          {cases.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
            >
              <div className="w-full lg:w-3/5 relative group overflow-hidden rounded-3xl">
                <BeforeAfterSlider 
                  beforeImage={item.beforeImage} 
                  afterImage={item.afterImage} 
                  beforeLabel={t('identity.before') || 'Antes'}
                  afterLabel={t('identity.after') || 'Depois'}
                />
              </div>
              
              <div className="w-full lg:w-2/5 flex flex-col justify-center">
                <h3 className="text-4xl md:text-5xl font-display font-bold mb-8">{item.client}</h3>
                <a 
                  href="https://www.behance.net/Pdrolidg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 text-white font-medium hover:text-primary transition-colors w-fit"
                >
                  <span className="text-lg">{t('identity.view_case')}</span>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
