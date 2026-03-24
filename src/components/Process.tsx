import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MessageSquare, Target, PenTool, Rocket } from 'lucide-react';

export default function Process() {
  const { t } = useTranslation();

  const steps = [
    {
      id: 'step1',
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      title: t('process.step1_title'),
      desc: t('process.step1_desc')
    },
    {
      id: 'step2',
      icon: <Target className="w-8 h-8 text-primary" />,
      title: t('process.step2_title'),
      desc: t('process.step2_desc')
    },
    {
      id: 'step3',
      icon: <PenTool className="w-8 h-8 text-primary" />,
      title: t('process.step3_title'),
      desc: t('process.step3_desc')
    },
    {
      id: 'step4',
      icon: <Rocket className="w-8 h-8 text-primary" />,
      title: t('process.step4_title'),
      desc: t('process.step4_desc')
    }
  ];

  return (
    <section id="process" className="py-24 relative z-10 bg-dark">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold mb-4"
          >
            {t('process.title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/60 max-w-2xl mx-auto"
          >
            {t('process.subtitle')}
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 rounded-full glass flex items-center justify-center mb-6 relative group-hover:scale-110 transition-transform duration-500 group-hover:border-primary/50">
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm">
                    {index + 1}
                  </span>
                  {step.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-white/60">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
