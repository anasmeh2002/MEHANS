import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarCheck } from 'lucide-react';
import { useLanguage } from '../../i18n';

export function DesktopStickyCTA() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector('section:first-of-type');
      const contact = document.querySelector('#contact');

      if (!hero || !contact) return;

      const heroRect = hero.getBoundingClientRect();
      const contactRect = contact.getBoundingClientRect();

      const pastHero = heroRect.bottom < 0;
      const contactInView =
        contactRect.top < window.innerHeight * 0.7 && contactRect.bottom > 100;

      setIsVisible(pastHero && !contactInView);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToContact}
          className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-2.5 px-5 py-3.5 bg-[#0a0a0a]/90 backdrop-blur-xl border border-gold-500/25 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-gold-500/50 hover:shadow-[0_8px_40px_rgba(218,165,32,0.15)] transition-all duration-300 group"
          aria-label={t.mobileCta.button}
        >
          <span className="relative flex items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-gold-500/15 blur-md group-hover:bg-gold-500/25 transition-colors duration-300" />
            <CalendarCheck
              size={17}
              className="relative text-gold-500 group-hover:text-gold-400 transition-colors duration-300"
            />
          </span>
          <span className="text-stone-100 text-[12px] font-semibold tracking-[0.18em] uppercase whitespace-nowrap">
            {t.mobileCta.button}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
