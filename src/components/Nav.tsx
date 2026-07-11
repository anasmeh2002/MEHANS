import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Platform', href: '#workflow' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Results', href: '#results' },
  { label: 'Founder', href: '#founder' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 glass border-b border-[rgba(212,175,55,0.1)]'
            : 'py-5 bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => handleNavClick('#hero')}
            className="group flex items-center gap-3 focus-visible:outline-none"
            aria-label="MEHANS - Back to top"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full border border-[rgba(212,175,55,0.4)] flex items-center justify-center group-hover:border-[rgba(212,175,55,0.8)] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
              </div>
            </div>
            <span className="text-lg font-semibold tracking-wider text-white">
              MEHANS
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8" role="menubar">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-[#a0a0a0] hover:text-white transition-colors duration-200 tracking-wide focus-visible:outline-none focus-visible:text-white"
                role="menuitem"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => handleNavClick('#cta')}
              className="group relative px-5 py-2 text-sm font-medium overflow-hidden rounded-full border border-[rgba(212,175,55,0.4)] text-[#d4af37] hover:border-[#d4af37] transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] focus-visible:outline-none"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-[rgba(212,175,55,0.05)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          <button
            className="md:hidden p-2 text-[#a0a0a0] hover:text-white focus-visible:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[60px] left-0 right-0 z-40 glass border-b border-[rgba(212,175,55,0.1)] md:hidden"
            role="menu"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-sm text-[#a0a0a0] hover:text-white transition-colors py-2 border-b border-[rgba(255,255,255,0.05)] last:border-0 focus-visible:outline-none"
                  role="menuitem"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('#cta')}
                className="mt-2 px-5 py-2.5 text-sm font-medium rounded-full border border-[rgba(212,175,55,0.4)] text-[#d4af37] text-center focus-visible:outline-none"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
