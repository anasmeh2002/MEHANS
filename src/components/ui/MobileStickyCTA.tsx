import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector('section:first-of-type');
      const contact = document.querySelector('#contact');

      if (!hero || !contact) return;

      const heroRect = hero.getBoundingClientRect();
      const contactRect = contact.getBoundingClientRect();

      // Show after hero is scrolled past
      const pastHero = heroRect.bottom < 0;

      // Hide when contact form is visible
      const contactInView = contactRect.top < window.innerHeight * 0.7 && contactRect.bottom > 100;

      setIsVisible(pastHero && !contactInView);
      setContactVisible(contactInView);
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
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          style={{
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          }}
          role="region"
          aria-label="Quick contact action"
        >
          <div
            className="bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-gold-500/20 shadow-[0_-4px_30px_rgba(0,0,0,0.5)]"
          >
            {/* Gold top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

            <div className="flex items-center justify-between gap-4 px-5 py-4">
              {/* Left text */}
              <div className="flex flex-col gap-0.5">
                <span className="text-stone-200 text-[13px] font-medium leading-tight">
                  Free AI Consultation
                </span>
                <span className="text-gold-500/80 text-[11px] leading-tight">
                  Response within 24 Hours
                </span>
              </div>

              {/* CTA Button */}
              <button
                onClick={scrollToContact}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-[#080808] text-[11px] font-semibold tracking-[0.15em] uppercase rounded-sm shadow-lg shadow-gold-500/20 active:scale-[0.98] transition-transform duration-150 min-h-[48px]"
                aria-label="Book free consultation"
              >
                <span>Book Free Consultation</span>
                <ArrowRight size={14} className="group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
