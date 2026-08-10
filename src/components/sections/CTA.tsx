import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { AnimatedSection } from '../ui/AnimatedSection';

const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  left: (i * 12.5 + 5),
  size: 1.5 + (i % 3),
  duration: 9 + (i % 4) * 2,
  delay: (i % 5) * 0.8,
  driftX: (i % 2 ? 1 : -1) * 30,
}));

export function CTA() {
  const { t } = useLanguage();

  const proofItems = [
    t.cta.proof1,
    t.cta.proof2,
    t.cta.proof3,
    t.cta.proof4,
  ];

  return (
    <section className="py-24 lg:py-32 bg-void relative overflow-hidden">
      {/* Premium grid */}
      <div className="absolute inset-0 grid-bg opacity-35 pointer-events-none" />

      {/* Circuit pattern */}
      <div className="absolute inset-0 circuit-bg opacity-25 pointer-events-none" />

      {/* Central glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-500/[0.035] blur-[140px] pointer-events-none orb-animate"
      />

      {/* Secondary glow */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gold-500/[0.02] blur-[100px] pointer-events-none orb-animate-2" />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="particle absolute rounded-full"
            style={{
              left: `${p.left}%`,
              bottom: '-4px',
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: `rgba(201,168,76,${0.25 + Math.random() * 0.3})`,
              boxShadow: `0 0 ${p.size * 2}px rgba(201,168,76,0.25)`,
              '--duration': `${p.duration}s`,
              '--delay': `${p.delay}s`,
              '--drift-x': `${p.driftX}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">

        <AnimatedSection delay={0}>
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-8 md:mb-12">
            <div className="w-10 md:w-12 h-px bg-gradient-to-r from-transparent to-stone-800" />
            <span className="section-label">{t.labels.takeFirstStep}</span>
            <div className="w-10 md:w-12 h-px bg-gradient-to-l from-transparent to-stone-800" />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <h2 className="font-display font-medium text-stone-100 leading-[1.02] mb-6 md:mb-8"
            style={{ fontSize: 'clamp(2.75rem, 7vw, 6rem)' }}
          >
            {t.cta.headline1}{' '}
            <span className="block mt-2">
              {t.cta.headline2.includes('to') ? (
                <>
                  {t.cta.headline2.split('to')[0]}{' '}
                  <span className="animate-gold-shimmer italic font-light">{t.cta.headline2.split('to')[1]?.trim()}</span>
                </>
              ) : (
                <span className="animate-gold-shimmer italic font-light">{t.cta.headline2}</span>
              )}
            </span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.18}>
          <p className="text-stone-500 leading-[1.85] mb-10 md:mb-12 max-w-lg mx-auto px-2"
            style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.125rem)' }}
          >
            {t.cta.description}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.26}>
          <div className="flex flex-col xs:flex-row gap-3 md:gap-4 justify-center mb-12 md:mb-16">
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary group w-full xs:w-auto"
              aria-label={t.cta.cta}
            >
              {t.cta.cta}
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300 flip-rtl" />
            </button>
            <a href="mailto:hello@mehans.space" className="btn-ghost w-full xs:w-auto justify-center min-h-[52px]">
              hello@mehans.space
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.35}>
          <div className="pt-8 md:pt-10 border-t border-stone-800/35 flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-10">
            {proofItems.map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-500/70" />
                <span className="text-stone-500 text-[11px] tracking-wide">{item}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
