import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { AnimatedSection } from '../ui/AnimatedSection';

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: Math.random() * 1.6 + 0.5,
  duration: Math.random() * 14 + 10,
  delay: Math.random() * 10,
  driftX: (Math.random() - 0.5) * 50,
}));

const proof = [
  'No commitment required',
  'Senior engineer assigned',
  'AI strategy in 7 days',
  'Systems live in 6 weeks',
];

export function CTA() {
  return (
    <section className="py-28 lg:py-36 bg-void relative overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-500/[0.04] blur-[120px] pointer-events-none orb-animate" />

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
              background: 'rgba(201,168,76,0.4)',
              '--duration': `${p.duration}s`,
              '--delay': `${p.delay}s`,
              '--drift-x': `${p.driftX}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">

        <AnimatedSection delay={0}>
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="w-10 h-px bg-stone-800" />
            <span className="section-label">Take the First Step</span>
            <div className="w-10 h-px bg-stone-800" />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <h2 className="font-display font-medium text-stone-100 leading-[1.04] mb-6"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)' }}
          >
            Your Business Runs Better{' '}
            <span className="block">
              With{' '}
              <span className="animate-gold-shimmer italic font-light">Intelligence.</span>
            </span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.16}>
          <p className="text-stone-600 leading-[1.75] mb-10 max-w-lg mx-auto"
            style={{ fontSize: 'clamp(0.9375rem, 1.3vw, 1.0625rem)' }}
          >
            Book a free consultation with a MEHANS AI engineer. We'll analyse your workflow, identify the highest-impact automation opportunities, and show you exactly what your business looks like when AI is running it.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.22}>
          <div className="flex flex-col xs:flex-row gap-3 justify-center mb-14">
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary group"
            >
              Schedule Consultation
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-250" />
            </button>
            <a href="mailto:hello@mehans.space" className="btn-ghost">
              hello@mehans.space
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="pt-8 border-t border-stone-800/30 flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            {proof.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gold-500/60" />
                <span className="text-stone-700 text-[11px] tracking-wide">{item}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
