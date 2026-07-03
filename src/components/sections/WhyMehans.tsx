import { motion } from 'framer-motion';
import { Clock, TrendingDown, Shield, Settings, Zap } from 'lucide-react';
import { AnimatedSection } from '../ui/AnimatedSection';

const pillars = [
  {
    stat: '24/7',
    label: 'AI Availability',
    description: 'Your systems never sleep. Every inbound lead — at midnight on a Sunday — is engaged, qualified, and routed without a human touching anything.',
    icon: Clock,
  },
  {
    stat: '80%',
    label: 'Reduction in Manual Work',
    description: "On average, MEHANS clients eliminate 80% of repetitive operational tasks within 90 days. Your team's energy shifts entirely to closing.",
    icon: TrendingDown,
  },
  {
    stat: '3×',
    label: 'Faster Lead Response',
    description: 'Industry average first response: 4 hours. MEHANS average: under 90 seconds. That gap is where deals are won and lost.',
    icon: Zap,
  },
  {
    stat: '100%',
    label: 'Custom-Built Systems',
    description: "We do not configure templates. Every system is engineered from scratch around your workflow, your CRM, and your team's exact process.",
    icon: Settings,
  },
  {
    stat: 'AES-256',
    label: 'Enterprise Security',
    description: 'Bank-grade encryption on every data flow. GDPR-compliant architecture. Your client data is protected at the infrastructure level — not as an afterthought.',
    icon: Shield,
  },
];

export function WhyMehans() {
  return (
    <section id="why-mehans" className="py-32 lg:py-40 bg-void relative overflow-hidden">
      {/* Right fade gradient */}
      <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-gradient-to-l from-gold-500/[0.018] to-transparent pointer-events-none" />

      {/* Circuit pattern */}
      <div className="absolute inset-0 circuit-bg opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-18 lg:gap-26 items-start">

          {/* Left: sticky */}
          <div className="lg:sticky lg:top-32">
            <AnimatedSection delay={0}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-gold-500" />
                <span className="section-label">Why MEHANS</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h2 className="section-title mb-7" style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.75rem)' }}>
                The Infrastructure Layer{' '}
                <span className="italic font-light text-stone-500">Modern Real Estate Runs On.</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.14}>
              <p className="section-subtitle leading-[1.85] mb-12">
                We are not a software vendor. We are an engineering partner — building the AI backbone that powers how elite real estate operations work.
              </p>
            </AnimatedSection>

            {/* Image with overlay */}
            <AnimatedSection delay={0.22}>
              <div className="relative aspect-[4/3] overflow-hidden border border-stone-800/40">
                <img
                  src="/assets/images/services/afshin-t2y-biYtwYqao2k-unsplash.jpg"
                  alt="MEHANS AI infrastructure"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/25 to-transparent" />

                {/* Corner accents */}
                <div className="absolute top-5 left-5 w-9 h-9 border-l border-t border-gold-500/30" />
                <div className="absolute bottom-5 right-5 w-9 h-9 border-r border-b border-gold-500/30" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="glass-dark inline-block px-6 py-5 border border-white/[0.05]">
                    <div className="font-display text-[28px] font-medium text-gold-500 leading-none">6 Weeks</div>
                    <div className="text-stone-500 text-[12px] mt-1.5">from first call to live AI system</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right: pillars */}
          <div>
            <div className="flex flex-col divide-y divide-stone-800/30">
              {pillars.map((p, i) => {
                const Icon = p.icon;
                return (
                  <AnimatedSection key={p.label} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ x: 6 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="group py-10 flex gap-8 cursor-default"
                    >
                      <div className="flex-shrink-0 w-[95px]">
                        <div className="font-display text-[24px] font-medium text-gold-500 leading-none group-hover:text-gold-400 transition-colors duration-300">
                          {p.stat}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Icon size={14} className="text-gold-500/50" strokeWidth={1.5} />
                          <div className="text-stone-300 font-medium text-[14px] group-hover:text-stone-100 transition-colors duration-300">
                            {p.label}
                          </div>
                        </div>
                        <p className="text-stone-600 text-[13px] leading-[1.75]">{p.description}</p>
                      </div>
                    </motion.div>
                  </AnimatedSection>
                );
              })}
            </div>

            <AnimatedSection delay={0.6}>
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
