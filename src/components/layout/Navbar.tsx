import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Services',   href: '#services' },
  { label: 'Solutions',  href: '#solutions' },
  { label: 'Platform',   href: '#ai-advantages' },
  { label: 'Process',    href: '#process' },
  { label: 'About',      href: '#why-mehans' },
];

export function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
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
        initial={{ y: -88, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-void/90 backdrop-blur-2xl border-b border-white/[0.04] py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between gap-8">

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-3 flex-shrink-0"
          >
            <div className="w-7 h-7 border border-gold-500 flex items-center justify-center transition-all duration-300 group-hover:border-gold-400">
              <div className="w-2.5 h-2.5 bg-gold-500 group-hover:bg-gold-400 transition-colors duration-300" />
            </div>
            <div>
              <span className="font-display text-[17px] font-medium tracking-[0.18em] text-stone-100 leading-none">
                MEHANS
              </span>
              <div className="text-[8px] font-semibold tracking-[0.28em] uppercase text-gold-500/50 leading-none mt-1 hidden sm:block">
                AI Automation
              </div>
            </div>
          </button>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-7 flex-1 justify-center">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="relative text-[12px] font-medium tracking-[0.04em] transition-colors duration-300 group"
                style={{ color: activeHref === l.href ? '#C9A84C' : '#6b6560' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#e8e4de')}
                onMouseLeave={(e) => (e.currentTarget.style.color = activeHref === l.href ? '#C9A84C' : '#6b6560')}
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-px bg-gold-500 w-0 group-hover:w-full transition-all duration-400" />
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-5 flex-shrink-0">
            <a
              href="tel:+212710891662"
              className="text-[11px] tracking-wide font-medium transition-colors duration-300"
              style={{ color: '#4a453f' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#6b6560')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#4a453f')}
            >
              +212 710 891 662
            </a>
            <button
              onClick={() => handleNav('#contact')}
              className="btn-primary py-2.5 px-5 text-[10px]"
            >
              Schedule Consultation
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-stone-600 hover:text-stone-300 transition-colors duration-200"
          >
            {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
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
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-void/98 backdrop-blur-2xl flex flex-col"
          >
            <div className="pt-28 px-8 flex flex-col gap-0 divide-y divide-stone-800/40">
              {links.map((l, i) => (
                <motion.button
                  key={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.05 }}
                  onClick={() => handleNav(l.href)}
                  className="text-left text-xl font-display text-stone-500 hover:text-gold-500 transition-colors duration-300 py-5"
                >
                  {l.label}
                </motion.button>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.32 }}
              className="px-8 mt-8 flex flex-col gap-3"
            >
              <button onClick={() => handleNav('#contact')} className="btn-primary justify-center">
                Schedule Consultation
              </button>
              <a href="tel:+212710891662" className="text-center text-stone-700 text-sm py-2">
                +212 710 891 662
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
