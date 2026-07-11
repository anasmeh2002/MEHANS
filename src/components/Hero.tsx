import { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ParticleField } from './ParticleField';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const SPRING = { stiffness: 60, damping: 20 };

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, SPRING);
  const springY = useSpring(rawY, SPRING);

  const gridX = useTransform(springX, [-1, 1], [-15, 15]);
  const gridY = useTransform(springY, [-1, 1], [-15, 15]);
  const glowX = useTransform(springX, [-1, 1], [30, 70]);
  const glowY = useTransform(springY, [-1, 1], [30, 70]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
      rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
    },
    [prefersReducedMotion, rawX, rawY]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  const scrollToWorkflow = () => {
    document.querySelector('#workflow')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCTA = () => {
    document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]"
      aria-label="Hero section"
    >
      {/* Animated grid */}
      <motion.div
        className="absolute inset-0 grid-pattern opacity-60"
        style={{ x: gridX, y: gridY }}
        aria-hidden="true"
      />

      {/* Radial glow that follows mouse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(ellipse 60% 50% at ${x}% ${y}%, rgba(212,175,55,0.07) 0%, transparent 70%)`
          ),
        }}
        aria-hidden="true"
      />

      {/* Soft top light beam */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-48 bg-gradient-to-b from-[rgba(212,175,55,0.5)] to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.3)] to-transparent"
        aria-hidden="true"
      />

      {/* Gold particles */}
      <ParticleField count={35} />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass gold-border"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
          <span className="text-xs text-[#d4af37] tracking-widest uppercase font-medium">
            AI-Powered Sales Automation
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-6"
        >
          <span className="text-white">Your sales team</span>
          <br />
          <span className="text-gold-gradient">never sleeps.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-lg text-[#a0a0a0] max-w-xl mx-auto mb-10 leading-relaxed"
        >
          MEHANS qualifies leads, books meetings, and notifies your team —
          all within seconds of first contact.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton onClick={scrollToCTA} primary>
            Start Automating
          </MagneticButton>
          <button
            onClick={scrollToWorkflow}
            className="group flex items-center gap-2 text-sm text-[#a0a0a0] hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:text-white"
          >
            See how it works
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-12 md:gap-16"
        >
          {[
            { value: '3x', label: 'Pipeline growth' },
            { value: '< 60s', label: 'Response time' },
            { value: '94%', label: 'Qualification rate' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-gold-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-[#5a5a5a] uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <div className="w-px h-8 bg-gradient-to-b from-[rgba(212,175,55,0.5)] to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}

interface MagneticButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  primary?: boolean;
}

export function MagneticButton({ onClick, children, primary = false }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (primary) {
    return (
      <motion.button
        ref={ref}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="group relative px-8 py-3.5 text-sm font-semibold rounded-full overflow-hidden bg-[#d4af37] text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] via-[#f0d060] to-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 shadow-[0_0_30px_rgba(212,175,55,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.button>
    );
  }

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="group px-8 py-3.5 text-sm font-medium rounded-full border border-[rgba(212,175,55,0.4)] text-[#d4af37] hover:border-[#d4af37] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
    >
      {children}
    </motion.button>
  );
}
