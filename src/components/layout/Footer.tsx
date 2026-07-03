import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';
import { AnimatedSection } from '../ui/AnimatedSection';

const NAV = [
  { label: 'Services', href: '#services' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#why-mehans' },
  { label: 'Contact', href: '#contact' },
];

const SERVICES = [
  'AI Lead Generation',
  'WhatsApp AI Assistants',
  'CRM Automation',
  'Voice AI Receptionists',
  'Email Automation',
  'Appointment Scheduling',
  'AI Analytics',
  'Custom AI Agents',
];

export function Footer() {
  const go = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-void border-t border-stone-800/25 pt-24 pb-10 relative overflow-hidden">
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/18 to-transparent" />

      {/* Fine grid */}
      <div className="absolute inset-0 grid-bg-fine opacity-35 pointer-events-none" />

      {/* Circuit pattern */}
      <div className="absolute inset-0 circuit-bg opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 mb-20 pb-18 border-b border-stone-800/25">

          {/* Brand */}
          <div className="lg:col-span-1">
            <AnimatedSection delay={0}>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-8 h-8 border border-gold-500/80 flex items-center justify-center relative">
                  <div className="w-3 h-3 bg-gold-500" />
                  <div className="absolute -inset-1.5 border border-gold-500/15" />
                </div>
                <div>
                  <span className="font-display text-[18px] font-medium tracking-[0.2em] text-stone-100">MEHANS</span>
                  <div className="text-[8px] font-semibold tracking-[0.3em] uppercase text-gold-500/50 mt-1">AI Automation</div>
                </div>
              </div>
              <p className="text-stone-700 text-[12px] leading-[1.8] mb-2">
                AI Automation for Real Estate Leaders.
              </p>
              <p className="text-stone-800 text-[11px] leading-relaxed mb-9">
                The AI infrastructure behind modern real estate.
              </p>
              <div className="flex gap-3">
                {[Linkedin, Twitter].map((Icon, i) => (
                  <a key={i} href="#"
                    className="w-9 h-9 border border-stone-800 hover:border-gold-500/30 flex items-center justify-center text-stone-800 hover:text-gold-500 hover:bg-gold-500/5 transition-all duration-300"
                  >
                    <Icon size={13} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Quick links */}
          <div>
            <AnimatedSection delay={0.07}>
              <h4 className="text-[9px] font-bold tracking-[0.32em] uppercase text-stone-700 mb-7">Quick Links</h4>
              <ul className="space-y-3.5">
                {NAV.map((l) => (
                  <li key={l.href}>
                    <button onClick={() => go(l.href)}
                      className="text-stone-700 hover:text-gold-500 text-[12px] transition-colors duration-300 flex items-center gap-2 group">
                      <span className="w-1 h-px bg-stone-800 group-hover:w-2 group-hover:bg-gold-500 transition-all duration-300" />
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>

          {/* Services */}
          <div>
            <AnimatedSection delay={0.14}>
              <h4 className="text-[9px] font-bold tracking-[0.32em] uppercase text-stone-700 mb-7">AI Services</h4>
              <ul className="space-y-3.5">
                {SERVICES.map((s, i) => (
                  <li key={s} className="text-stone-800 text-[12px] flex items-center gap-2 group hover:text-stone-600 transition-colors duration-300">
                    <ZapIcon />
                    {s}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>

          {/* Contact */}
          <div>
            <AnimatedSection delay={0.21}>
              <h4 className="text-[9px] font-bold tracking-[0.32em] uppercase text-stone-700 mb-7">Contact</h4>
              <ul className="space-y-5">
                <li>
                  <a href="mailto:hello@mehans.space"
                    className="flex items-center gap-3.5 text-stone-700 hover:text-gold-500 text-[12px] transition-colors duration-300 group">
                    <div className="w-9 h-9 border border-stone-800 group-hover:border-gold-500/25 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                      <Mail size={12} strokeWidth={1.5} className="text-stone-700 group-hover:text-gold-500 transition-colors duration-300" />
                    </div>
                    hello@mehans.space
                  </a>
                </li>
                <li>
                  <a href="tel:+212710891662"
                    className="flex items-center gap-3.5 text-stone-700 hover:text-stone-500 text-[12px] transition-colors duration-300 group">
                    <div className="w-9 h-9 border border-stone-800 group-hover:border-stone-700 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                      <Phone size={12} strokeWidth={1.5} className="text-stone-700 group-hover:text-stone-500 transition-colors duration-300" />
                    </div>
                    +212 710 891 662
                  </a>
                </li>
                <li className="flex items-start gap-3.5 text-stone-800 text-[12px]">
                  <div className="w-9 h-9 border border-stone-800 flex items-center justify-center flex-shrink-0">
                    <MapPin size={12} strokeWidth={1.5} className="text-stone-700" />
                  </div>
                  <span className="leading-relaxed">Mahaj Riad<br />Rabat, Morocco</span>
                </li>
              </ul>
            </AnimatedSection>
          </div>
        </div>

        {/* Bottom bar */}
        <AnimatedSection delay={0.28}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <p className="text-stone-800 text-[10px] tracking-wide">
              © 2025 MEHANS. All rights reserved.
            </p>
            <div className="flex gap-8">
              {['Privacy Policy', 'Terms of Service'].map((t) => (
                <a key={t} href="#" className="text-stone-800 hover:text-stone-600 text-[10px] transition-colors duration-300">
                  {t}
                </a>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </footer>
  );
}

function ZapIcon() {
  return (
    <div className="w-1 h-1 rounded-full bg-stone-800/60 flex-shrink-0" />
  );
}
