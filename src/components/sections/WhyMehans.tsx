import { motion } from 'framer-motion';
import { Clock, TrendingDown, Settings, Shield, Zap, Check } from 'lucide-react';
import { AnimatedSection } from '../ui/AnimatedSection';

const pillars = [
  {
    stat: '24/7',
    label: 'AI Availability',
    bullets: ['Never misses a lead', 'Instant engagement', 'Weekend coverage'],
    icon: Clock,
  },
  {
    stat: '80%',
    label: 'Less Manual Work',
    bullets: ['Team focuses on closing', 'Automated follow-ups', 'No more chasing'],
    icon: TrendingDown,
  },
  {
    stat: '3×',
    label: 'Faster Response',
    bullets: ['Under 90 seconds', 'Beat competitors', 'Higher conversions'],
    icon: Zap,
  },
  {
    stat: '100%',
    label: 'Custom Systems',
    bullets: ['Built for your workflow', 'No templates', 'Exact fit'],
    icon: Settings,
  },
  {
    stat: '256-bit',
    label: 'Enterprise Security',
    bullets: ['Bank-grade encryption', 'GDPR compliant', 'Secure by design'],
    icon: Shield,
  },
];

export function WhyMehans() {
  return (
    <section id="why-mehans" className="py-36 lg:py-44 bg-stone-950 relative overflow-hidden">
      {/* Right fade gradient */}
      <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-gradient-to-l from-gold-500/[0.025] to-transparent pointer-events-none" />
      <div className="absolute inset-0 circuit-bg opacity-45 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-20 lg:gap-28 items-start">

          {/* Left: sticky */}
          <div className="lg:sticky lg:top-32">
            <AnimatedSection delay={0}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-gold-500" />
                <span className="section-label">Why MEHANS</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h2 className="section-title mb-8" style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.75rem)' }}>
                The Infrastructure<br />
                <span className="italic font-light text-stone-500">Real Estate Relies On.</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.14}>
              <p className="text-stone-500 leading-[1.85] mb-12 text-[14px]">
                Engineering partner, not software vendor. We build the AI backbone that powers elite real estate operations.
              </p>
            </AnimatedSection>

            {/* Image */}
            <AnimatedSection delay={0.22}>
              <div className="relative aspect-[4/3] overflow-hidden border border-stone-700/50">
                <img
                  src="/assets/images/services/afshin-t2y-biYtwYqao2k-unsplash.jpg"
                  alt="MEHANS AI infrastructure"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />
                <div className="absolute top-5 left-5 w-10 h-10 border-l-2 border-t-2 border-gold-500/35" />
                <div className="absolute bottom-5 right-5 w-10 h-10 border-r-2 border-b-2 border-gold-500/35" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="glass-dark inline-block px-7 py-5 border border-gold-500/15 rounded-sm">
                    <div className="font-display text-[28px] font-medium text-gold-500 leading-none">≤ 2 Wks</div>
                    <div className="text-stone-400 text-[12px] mt-1.5">average deployment</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right: pillars with bullet points */}
          <div>
            <div className="flex flex-col divide-y divide-stone-800/40">
              {pillars.map((p, i) => {
                const Icon = p.icon;
                return (
                  <AnimatedSection key={p.label} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ x: 6 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="group py-9 flex gap-7 cursor-default"
                    >
                      <div className="flex-shrink-0 w-[90px] pt-1">
                        <div className="font-display text-[24px] font-medium text-gold-500 leading-none group-hover:text-gold-400 transition-colors duration-300">
                          {p.stat}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Icon size={15} className="text-gold-500/55" strokeWidth={1.5} />
                          <div className="text-stone-200 font-medium text-[15px] group-hover:text-stone-100 transition-colors duration-300">
                            {p.label}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          {p.bullets.map((bullet, bi) => (
                            <div key={bi} className="flex items-center gap-3 text-stone-400 text-[13px]">
                              <Check size={11} className="text-gold-500/50 flex-shrink-0" />
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatedSection>
                );
              })}
            </div>

            <AnimatedSection delay={0.55}>
              <div className="pt-12">
                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary group"
                >
                  Schedule Consultation
                  <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">→</span>
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
