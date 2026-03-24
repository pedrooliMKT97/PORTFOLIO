import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Send, Instagram, MessageCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function Contact() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    // Format message for WhatsApp
    const text = `Olá Pedro! Meu nome é ${data.name}. Gostaria de falar sobre o seguinte projeto: ${data.message}`;
    const encodedText = encodeURIComponent(text);
    
    // Open WhatsApp in a new tab
    window.open(`https://wa.me/5519991309164?text=${encodedText}`, '_blank');
    
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-24 relative z-10 bg-dark">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">
                {t('contact.title')}
              </h2>
              <p className="text-xl text-white/60 mb-12 max-w-md">
                {t('contact.subtitle')}
              </p>

              <div className="flex flex-col space-y-4">
                <a 
                  href="https://wa.me/5519991309164" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Contact via WhatsApp"
                  className="flex items-center space-x-4 p-4 rounded-2xl glass hover:bg-white/10 transition-colors w-fit pr-8"
                >
                  <div className="w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-[#25D366]" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">{t('contact.whatsapp')}</p>
                    <p className="font-semibold">+55 19 99130-9164</p>
                  </div>
                </a>

                <a 
                  href="https://instagram.com/pdroli.dg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Follow on Instagram"
                  className="flex items-center space-x-4 p-4 rounded-2xl glass hover:bg-white/10 transition-colors w-fit pr-8"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">{t('contact.instagram')}</p>
                    <p className="font-semibold">@pdroli.dg</p>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2">
            <motion.form 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit(onSubmit)} 
              className="glass p-8 md:p-12 rounded-3xl"
            >
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">{t('contact.name')}</label>
                  <input 
                    id="name"
                    {...register("name", { required: true })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                  />
                  {errors.name && <span className="text-primary text-xs mt-1">{t('contact.required')}</span>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">{t('contact.message')}</label>
                  <textarea 
                    id="message"
                    rows={4}
                    {...register("message", { required: true })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder={t('contact.placeholder')}
                  />
                  {errors.message && <span className="text-primary text-xs mt-1">{t('contact.required')}</span>}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary text-white rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-primary/90 transition-colors disabled:opacity-70"
                >
                  <span>{isSubmitting ? t('contact.sending') : t('contact.send')}</span>
                  {!isSubmitting && <Send className="w-5 h-5" />}
                </button>

                {isSuccess && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-400 text-center text-sm font-medium"
                  >
                    {t('contact.success')}
                  </motion.p>
                )}
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
