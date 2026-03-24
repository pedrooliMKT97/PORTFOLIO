import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-white/10 bg-dark relative z-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
        <div className="text-xl font-display font-bold tracking-tighter text-white mb-4 md:mb-0 hover:scale-105 transition-transform cursor-pointer">
          PDROLI<span className="text-primary">.DG</span>
        </div>
        
        <p className="text-white/50 text-sm">
          &copy; {currentYear} PDROLI.DG. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}
