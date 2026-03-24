import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { PenTool, Layers, Video, MonitorSmartphone, ArrowRight } from 'lucide-react';

export default function Services() {
  const { t } = useTranslation();

  const services = [
    {
      id: 'design',
      icon: <PenTool className="w-8 h-8 text-primary" />,
      title: t('services.design_title'),
      desc: t('services.design_desc'),
      benefit: t('services.design_benefit')
    },
    {
      id: 'identity',
      icon: <Layers className="w-8 h-8 text-primary" />,
      title: t('services.identity_title'),
      desc: t('services.identity_desc'),
      benefit: t('services.identity_benefit')
    },
    {
      id: 'video',
      icon: <Video className="w-8 h-8 text-primary" />,
      title: t('services.video_title'),
      desc: t('services.video_desc'),
      benefit: t('services.video_benefit')
    }
  ];

  return (
    <section id="services" className="py-24 relative z-10 bg-dark">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold mb-4"
          >
            {t('services.title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/60 max-w-2xl mx-auto"
          >
            {t('services.subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                scale={1.02}
                transitionSpeed={1000}
                className="h-full"
              >
                <div className="glass p-8 rounded-3xl h-full flex flex-col group hover:bg-white/5 transition-colors relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-white/60 mb-6 flex-grow">{service.desc}</p>
                  
                  <div className="pt-6 border-t border-white/10 mt-auto">
                    <p className="text-sm font-medium text-primary mb-4">{service.benefit}</p>
                    <a 
                      href={`https://wa.me/5519991309164?text=${encodeURIComponent(`Olá, gostaria de solicitar um orçamento para o serviço de ${service.title}.`)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-sm font-semibold text-white group/btn"
                    >
                      <span>{t('services.cta')}</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
