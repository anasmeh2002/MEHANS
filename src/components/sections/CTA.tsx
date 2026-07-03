import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { AnimatedSection } from '../ui/AnimatedSection';

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  duration: Math.random() * 16 + 12,
  delay: Math.random() * 12,
  driftX: (Math.random() - 0.5) * 60,
}));

const proof = [
  'No commitment required',
  'Senior engineer assigned',
  'AI strategy in 7 days',
  'Systems live in 6 weeks',
];

export function CTA() {
  return (
    <section className="py-32 lg:py-40 bg-void relative overflow-hidden">
      {/* Premium grid */}
      <div className="absolute inset-0 grid-bg opacity-35 pointer-events-none" />

      {/* Circuit pattern */}
      <div className="absolute inset-0 circuit-bg opacity-25 pointer-events-none" />

      {/* Central glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold-500/[0.035] blur-[140px] pointer-events-none orb-animate"
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
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-stone-800" />
            <span className="section-label">Take the First Step</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-stone-800" />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <h2 className="font-display font-medium text-stone-100 leading-[1.02] mb-8"
            style={{ fontSize: 'clamp(2.75rem, 7vw, 6rem)' }}
          >
            Your Business Runs Better{' '}
            <span className="block mt-2">
              With{' '}
              <span className="animate-gold-shimmer italic font-light">Intelligence.</span>
            </span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.18}>
          <p className="text-stone-600 leading-[1.85] mb-12 max-w-lg mx-auto"
            style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.125rem)' }}
          >
            Book a free consultation with a MEHANS AI engineer. We'll analyse your workflow, identify the highest-impact automation opportunities, and show you exactly what your business looks like when AI is running it.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.26}>
          <div className="flex flex-col xs:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary group"
            >
              Schedule Consultation
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
            </button>
            <a href="mailto:hello@mehans.space" className="btn-ghost">
              hello@mehans.space
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.35}>
          <div className="pt-10 border-t border-stone-800/25 flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            {proof.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="flex items-center gap-2.5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-gold-500/70" />
                <span className="text-stone-700 text-[11px] tracking-wide">{item}</span>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
