import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { AnimatedSection } from '../ui/AnimatedSection';

export function Footer() {
  const { t } = useLanguage();

  const NAV = [
    { label: t.nav.services, href: '#services' },
    { label: t.nav.solutions, href: '#solutions' },
    { label: t.nav.process, href: '#process' },
    { label: t.nav.scheduleConsultation, href: '#contact' },
  ];

  const go = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-void border-t border-stone-800/20 pt-16 pb-8 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12 pb-12 border-b border-stone-800/20">

          {/* Brand */}
          <AnimatedSection delay={0}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 border border-gold-500 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-gold-500" />
              </div>
              <span className="font-display text-[17px] font-medium tracking-[0.2em] text-stone-100">MEHANS</span>
            </div>
            <p className="text-stone-700 text-[12px] leading-relaxed">
              {t.footer.tagline}
            </p>
          </AnimatedSection>

          {/* Quick links */}
          <AnimatedSection delay={0.07}>
            <h4 className="text-[9px] font-bold tracking-[0.3em] uppercase text-stone-700 mb-5">{t.footer.quickLinks}</h4>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {NAV.map((l) => (
                <button key={l.href} onClick={() => go(l.href)}
                  className="text-stone-600 hover:text-gold-500 text-[12px] transition-colors duration-300">
                  {l.label}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Contact */}
          <AnimatedSection delay={0.14}>
            <h4 className="text-[9px] font-bold tracking-[0.3em] uppercase text-stone-700 mb-5">{t.footer.contact}</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:hello@mehans.space" className="flex items-center gap-2.5 text-stone-600 hover:text-gold-500 text-[12px] transition-colors duration-300">
                <Mail size={12} className="text-gold-500/50" />
                hello@mehans.space
              </a>
              <a href="tel:+212710891662" className="flex items-center gap-2.5 text-stone-600 hover:text-gold-500 text-[12px] transition-colors duration-300 no-flip">
                <Phone size={12} className="text-gold-500/50" />
                +212 710 891 662
              </a>
              <div className="flex items-center gap-2.5 text-stone-700 text-[12px]">
                <MapPin size={12} className="text-gold-500/50" />
                {t.contact.location}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Bottom bar */}
        <AnimatedSection delay={0.21}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-stone-800 text-[10px]">{t.footer.copyright}</p>
            <div className="flex gap-6">
              {[t.footer.privacy, t.footer.terms].map((text) => (
                <a key={text} href="#" className="text-stone-800 hover:text-stone-600 text-[10px] transition-colors duration-300">
                  {text}
                </a>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </footer>
  );
}
