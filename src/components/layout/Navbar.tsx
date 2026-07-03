import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Platform', href: '#ai-advantages' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#why-mehans' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 52);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    setActiveHref(href);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -95, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-600 ${
          scrolled
            ? 'bg-void/95 backdrop-blur-2xl border-b border-white/[0.035] py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between gap-10">

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-3.5 flex-shrink-0"
          >
            <div className="w-8 h-8 border border-gold-500/90 flex items-center justify-center transition-all duration-400 group-hover:border-gold-400 relative">
              <div className="w-2.5 h-2.5 bg-gold-500 group-hover:bg-gold-400 transition-colors duration-300" />
              <div className="absolute -inset-1 border border-gold-500/10 group-hover:border-gold-500/20 transition-colors duration-400" />
            </div>
            <div>
              <span className="font-display text-[18px] font-medium tracking-[0.2em] text-stone-100 leading-none">
                MEHANS
              </span>
              <div className="text-[8px] font-semibold tracking-[0.3em] uppercase text-gold-500/50 leading-none mt-1 hidden sm:block">
                AI Automation
              </div>
            </div>
          </button>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-9 flex-1 justify-center">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="relative text-[12px] font-medium tracking-[0.04em] transition-colors duration-350 group"
                style={{ color: activeHref === l.href ? '#C9A84C' : '#6b6560' }}
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px bg-gold-500 w-0 group-hover:w-full transition-all duration-400" />
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
            <a
              href="tel:+212710891662"
              className="text-[11px] tracking-wide font-medium transition-colors duration-300"
              style={{ color: '#4a453f' }}
            >
              +212 710 891 662
            </a>
            <button
              onClick={() => handleNav('#contact')}
              className="btn-primary py-3 px-6 text-[10px] group"
            >
              Schedule Consultation
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-stone-600 hover:text-stone-300 transition-colors duration-250 w-11 h-11 flex items-center justify-center border border-stone-800/50"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-void/98 backdrop-blur-2xl flex flex-col overflow-hidden"
          >
            {/* Grid overlay */}
            <div className="absolute inset-0 grid-bg-fine opacity-50 pointer-events-none" />

            <div className="pt-32 px-10 flex flex-col gap-0 divide-y divide-stone-800/35 relative z-10">
              {links.map((l, i) => (
                <motion.button
                  key={l.href}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => handleNav(l.href)}
                  className="text-left text-[1.65rem] font-display text-stone-400 hover:text-gold-500 transition-colors duration-300 py-7 min-h-[56px]"
                >
                  {l.label}
                </motion.button>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.38 }}
              className="px-10 mt-10 flex flex-col gap-4 relative z-10"
            >
              <button onClick={() => handleNav('#contact')} className="btn-primary justify-center py-4 text-[11px]">
                Schedule Consultation
                <ArrowRight size={13} />
              </button>
              <a href="tel:+212710891662" className="text-center text-stone-500 text-sm py-3 hover:text-gold-500 transition-colors duration-250">
                +212 710 891 662
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
