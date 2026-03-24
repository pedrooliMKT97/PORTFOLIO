import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function LanguagePopup({ onSelect }: { onSelect?: () => void }) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if language was already selected in this session/browser
    const hasSelectedLanguage = localStorage.getItem('languageSelected');
    if (!hasSelectedLanguage) {
      setIsOpen(true);
    } else if (onSelect) {
      onSelect();
    }
  }, []); // Removed onSelect from dependencies to prevent re-renders

  const selectLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('languageSelected', 'true');
    setIsOpen(false);
    
    // Wait for exit animation to complete before notifying parent
    setTimeout(() => {
      if (onSelect) {
        onSelect();
      }
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="glass p-8 md:p-12 rounded-3xl max-w-md w-full mx-4 text-center border border-white/10 shadow-2xl"
          >
            <h2 className="text-3xl font-display font-bold text-white mb-2">
              Welcome / Bem-vindo
            </h2>
            <p className="text-white/60 mb-8">
              Please select your preferred language.<br />
              Por favor, selecione seu idioma de preferência.
            </p>

            <div className="flex flex-col space-y-4">
              <button
                onClick={() => selectLanguage('pt')}
                className="w-full py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
              >
                <span>🇧🇷 Português (BR)</span>
              </button>
              
              <button
                onClick={() => selectLanguage('en')}
                className="w-full py-4 bg-white/10 text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-colors flex items-center justify-center space-x-2 border border-white/5"
              >
                <span>🇺🇸 English</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
