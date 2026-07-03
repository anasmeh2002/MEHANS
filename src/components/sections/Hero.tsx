import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: Math.random() * 2 + 0.4,
  duration: Math.random() * 18 + 14,
  delay: Math.random() * 14,
  driftX: (Math.random() - 0.5) * 80,
}));

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [headlineIn, setHeadlineIn] = useState(false);
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 800], [0, 100]);
  const contentY = useTransform(scrollY, [0, 600], [0, 60]);
  const fadeOut = useTransform(scrollY, [0, 420], [1, 0]);

  useEffect(() => {
    const t = setTimeout(() => setHeadlineIn(true), 2400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - r.left) / r.width - 0.5) * 25,
        y: ((e.clientY - r.top) / r.height - 0.5) * 15,
      });
    };
    window.addEventListener('mousemove', onMouse, { passive: true });
    return () => window.removeEventListener('mousemove', onMouse);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-void">
      {/* Background */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/assets/images/hero/alberto-castillo-q-mx4mSkK9zeo-unsplash.jpg)',
            transform: `scale(1.1) translate(${mouse.x * 0.08}px, ${mouse.y * 0.05}px)`,
            transition: 'transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/98 to-void/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/70" />
        <div className="absolute inset-0 bg-void/30" />
      </motion.div>

      {/* Grid */}
      <div className="absolute inset-0 z-[1] grid-bg opacity-30 pointer-events-none" />

      {/* Particles */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="particle absolute rounded-full"
            style={{
              left: `${p.left}%`,
              bottom: '-6px',
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: `rgba(201,168,76,${0.3 + Math.random() * 0.3})`,
              '--duration': `${p.duration}s`,
              '--delay': `${p.delay}s`,
              '--drift-x': `${p.driftX}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Ambient glow */}
      <div className="absolute top-[30%] right-[15%] w-[500px] h-[500px] rounded-full bg-gold-500/[0.035] blur-[130px] orb-animate z-[1] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[35%] w-52 h-52 rounded-full bg-gold-500/[0.025] blur-[80px] orb-animate-2 z-[1] pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: fadeOut }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-44 pb-36"
      >
        <div className="max-w-[680px]">

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={headlineIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-medium text-stone-100 leading-[1.02] mb-10"
            style={{ fontSize: 'clamp(3.2rem, 7.5vw, 6.5rem)' }}
          >
            AI That Runs<br />
            <span className="italic font-light text-gradient-gold">Your Business.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headlineIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-stone-400 font-light leading-[1.75] mb-12 max-w-[520px]"
            style={{ fontSize: 'clamp(1rem, 1.4vw, 1.125rem)' }}
          >
            Enterprise AI automation that captures leads, qualifies prospects,
            and scales real estate businesses with less manual work.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={headlineIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary group"
            >
              Book AI Consultation
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headlineIn ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-32 pt-10 border-t border-stone-700/40 flex flex-wrap gap-12 lg:gap-20"
        >
          {[
            { v: '< 90s', l: 'Lead Response' },
            { v: '80%', l: 'Less Manual Work' },
            { v: '24/7', l: 'AI Availability' },
          ].map((s) => (
            <div key={s.l} className="flex flex-col gap-2">
              <span className="font-display text-2xl md:text-[1.75rem] font-medium text-gold-500 leading-none">{s.v}</span>
              <span className="text-stone-500 text-[10px] font-semibold tracking-[0.2em] uppercase">{s.l}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 0.8 }}
        onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2.5 group"
      >
        <span className="text-stone-800 text-[9px] tracking-[0.38em] uppercase group-hover:text-stone-600 transition-colors">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={18} className="text-stone-700 group-hover:text-gold-500/70 transition-colors duration-300" strokeWidth={1.5} />
        </motion.div>
      </motion.button>
    </section>
  );
}
