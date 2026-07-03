import { motion } from 'framer-motion';
import { AnimatedSection } from '../ui/AnimatedSection';

const pillars = [
  {
    stat: '24 / 7',
    label: 'AI Availability',
    description: 'Your systems never sleep. Every inbound lead — at midnight on a Sunday — is engaged, qualified, and routed without a human touching anything.',
  },
  {
    stat: '80%',
    label: 'Reduction in Manual Work',
    description: 'On average, MEHANS clients eliminate 80% of repetitive operational tasks within 90 days. Your team\'s energy shifts entirely to closing.',
  },
  {
    stat: '3×',
    label: 'Faster Lead Response',
    description: 'Industry average first response: 4 hours. MEHANS average: under 90 seconds. That gap is where deals are won and lost.',
  },
  {
    stat: '100%',
    label: 'Custom-Built Systems',
    description: 'We do not configure templates. Every system is engineered from scratch around your workflow, your CRM, and your team\'s exact process.',
  },
  {
    stat: 'AES-256',
    label: 'Enterprise Security',
    description: 'Bank-grade encryption on every data flow. GDPR-compliant architecture. Your client data is protected at the infrastructure level — not as an afterthought.',
  },
];

export function WhyMehans() {
  return (
    <section id="why-mehans" className="py-28 lg:py-36 bg-void relative overflow-hidden">
      {/* Right fade gradient */}
      <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-gradient-to-l from-gold-500/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-start">

          {/* ── Left: sticky ── */}
          <div className="lg:sticky lg:top-28">
            <AnimatedSection delay={0}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-px bg-gold-500" />
                <span className="section-label">Why MEHANS</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h2 className="section-title mb-6" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
                The Infrastructure Layer{' '}
                <span className="italic font-light text-stone-500">Modern Real Estate Runs On.</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.14}>
              <p className="section-subtitle mb-10">
                We are not a software vendor. We are an engineering partner — building the AI backbone that powers how elite real estate operations work.
              </p>
            </AnimatedSection>

            {/* Image with overlay */}
            <AnimatedSection delay={0.22}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src="/assets/images/services/afshin-t2y-biYtwYqao2k-unsplash.jpg"
                  alt="MEHANS AI infrastructure"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <div className="glass-dark inline-block px-5 py-4">
                    <div className="font-display text-2xl font-medium text-gold-500 leading-none">6 Weeks</div>
                    <div className="text-stone-500 text-[11px] mt-1">from first call to live AI system</div>
                  </div>
                </div>
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-7 h-7 border-l border-t border-gold-500/30" />
                <div className="absolute bottom-4 right-4 w-7 h-7 border-r border-b border-gold-500/30" />
              </div>
            </AnimatedSection>
          </div>

          {/* ── Right: pillars ── */}
          <div>
            <div className="flex flex-col divide-y divide-stone-800/35">
              {pillars.map((p, i) => (
                <AnimatedSection key={p.label} delay={i * 0.09}>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="group py-9 flex gap-7 cursor-default"
                  >
                    <div className="flex-shrink-0 w-[88px]">
                      <div className="font-display text-[22px] font-medium text-gold-500 leading-none group-hover:text-gold-400 transition-colors duration-300">
                        {p.stat}
                      </div>
                    </div>
                    <div>
                      <div className="text-stone-300 font-medium text-[14px] mb-2 group-hover:text-stone-100 transition-colors duration-300">
                        {p.label}
                      </div>
                      <p className="text-stone-600 text-[13px] leading-[1.7]">{p.description}</p>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.55}>
              <div className="pt-10">
                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary"
                >
                  Schedule Consultation
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
