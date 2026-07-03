import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';
import { AnimatedSection } from '../ui/AnimatedSection';

const NAV = [
  { label: 'Services',  href: '#services'      },
  { label: 'Solutions', href: '#solutions'     },
  { label: 'Process',   href: '#process'       },
  { label: 'About',     href: '#why-mehans'    },
  { label: 'Contact',   href: '#contact'       },
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
    <footer className="bg-void border-t border-stone-800/30 pt-20 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      <div className="absolute inset-0 grid-bg-fine opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 pb-16 border-b border-stone-800/30">

          {/* Brand */}
          <div className="lg:col-span-1">
            <AnimatedSection delay={0}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-7 h-7 border border-gold-500 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-gold-500" />
                </div>
                <span className="font-display text-[17px] font-medium tracking-[0.18em] text-stone-100">MEHANS</span>
              </div>
              <p className="text-stone-700 text-[12px] leading-[1.7] mb-1">
                AI Automation for Real Estate Leaders.
              </p>
              <p className="text-stone-800 text-[11px] leading-relaxed mb-7">
                The AI infrastructure behind modern real estate.
              </p>
              <div className="flex gap-2.5">
                {[Linkedin, Twitter].map((Icon, i) => (
                  <a key={i} href="#"
                    className="w-8 h-8 border border-stone-800 flex items-center justify-center text-stone-800 hover:border-stone-600 hover:text-stone-500 transition-all duration-300"
                  >
                    <Icon size={12} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Quick links */}
          <div>
            <AnimatedSection delay={0.07}>
              <h4 className="text-[9px] font-bold tracking-[0.3em] uppercase text-stone-700 mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {NAV.map((l) => (
                  <li key={l.href}>
                    <button onClick={() => go(l.href)}
                      className="text-stone-700 hover:text-gold-500 text-[12px] transition-colors duration-250">
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
              <h4 className="text-[9px] font-bold tracking-[0.3em] uppercase text-stone-700 mb-6">AI Services</h4>
              <ul className="space-y-3">
                {SERVICES.map((s) => (
                  <li key={s} className="text-stone-800 text-[12px]">{s}</li>
                ))}
              </ul>
            </AnimatedSection>
          </div>

          {/* Contact */}
          <div>
            <AnimatedSection delay={0.21}>
              <h4 className="text-[9px] font-bold tracking-[0.3em] uppercase text-stone-700 mb-6">Contact</h4>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:hello@mehans.space"
                    className="flex items-center gap-3 text-stone-700 hover:text-gold-500 text-[12px] transition-colors duration-250 group">
                    <Mail size={12} strokeWidth={1.5} className="text-gold-500/40 group-hover:text-gold-500 transition-colors flex-shrink-0" />
                    hello@mehans.space
                  </a>
                </li>
                <li>
                  <a href="tel:+212710891662"
                    className="flex items-center gap-3 text-stone-700 hover:text-stone-500 text-[12px] transition-colors duration-250">
                    <Phone size={12} strokeWidth={1.5} className="text-gold-500/40 flex-shrink-0" />
                    +212 710 891 662
                  </a>
                </li>
                <li className="flex items-start gap-3 text-stone-800 text-[12px]">
                  <MapPin size={12} strokeWidth={1.5} className="text-gold-500/40 flex-shrink-0 mt-0.5" />
                  <span>Mahaj Riad<br />Rabat, Morocco</span>
                </li>
              </ul>
            </AnimatedSection>
          </div>
        </div>

        {/* Bottom bar */}
        <AnimatedSection delay={0.28}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-stone-800 text-[10px] tracking-wide">
              © 2025 MEHANS. All rights reserved.
            </p>
            <div className="flex gap-7">
              {['Privacy Policy', 'Terms of Service'].map((t) => (
                <a key={t} href="#" className="text-stone-800 hover:text-stone-600 text-[10px] transition-colors duration-250">
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
