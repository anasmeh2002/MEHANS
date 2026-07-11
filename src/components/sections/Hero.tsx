import { useEffect, useRef, useState, useCallback, memo } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../i18n';

/* ─── Canvas particle field ─── */
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; opacity: number;
  life: number; maxLife: number;
}

const GoldParticles = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef(0);
  const particles = useRef<Particle[]>([]);
  const COUNT = 45;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const make = (): Particle => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 4,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(Math.random() * 0.5 + 0.15),
      size: Math.random() * 1.6 + 0.4,
      opacity: Math.random() * 0.55 + 0.15,
      life: 0,
      maxLife: Math.random() * 320 + 180,
    });

    particles.current = Array.from({ length: COUNT }, () => {
      const p = make();
      p.y = Math.random() * canvas.height;
      p.life = Math.random() * p.maxLife;
      return p;
    });

    let last = 0;
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (dt > 50) { raf.current = requestAnimationFrame(tick); return; }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy; p.life++;
        const pct = p.life / p.maxLife;
        const fade = pct < 0.12 ? pct / 0.12 : pct > 0.78 ? (1 - pct) / 0.22 : 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.opacity * fade})`;
        ctx.fill();
        if (p.life >= p.maxLife || p.y < -4) particles.current[i] = make();
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => { cancelAnimationFrame(raf.current); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[3]"
      aria-hidden="true"
    />
  );
});

/* ─── Hero ─── */
export function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [headlineIn, setHeadlineIn] = useState(false);
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 800], [0, 100]);
  const contentY = useTransform(scrollY, [0, 600], [0, 60]);
  const fadeOut = useTransform(scrollY, [0, 420], [1, 0]);

  /* Mouse reactive background */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 50, damping: 22 });
  const springY = useSpring(rawY, { stiffness: 50, damping: 22 });
  const glowLeft = useTransform(springX, [-1, 1], [25, 75]);
  const glowTop  = useTransform(springY, [-1, 1], [25, 75]);

  const [imgTranslate, setImgTranslate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setHeadlineIn(true), 2400);
    return () => clearTimeout(timer);
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(nx * 2);
    rawY.set(ny * 2);
    setImgTranslate({ x: nx * 20, y: ny * 12 });
  }, [rawX, rawY]);

  const onMouseLeave = useCallback(() => {
    rawX.set(0); rawY.set(0);
    setImgTranslate({ x: 0, y: 0 });
  }, [rawX, rawY]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('mousemove', onMouseMove, { passive: true });
    el.addEventListener('mouseleave', onMouseLeave);
    return () => { el.removeEventListener('mousemove', onMouseMove); el.removeEventListener('mouseleave', onMouseLeave); };
  }, [onMouseMove, onMouseLeave]);

  return (
    <section ref={containerRef} id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-void">
      {/* Background image with parallax */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: 'url(/assets/images/hero/alberto-castillo-q-mx4mSkK9zeo-unsplash.jpg)',
            transform: `scale(1.1) translate(${imgTranslate.x * 0.08}px, ${imgTranslate.y * 0.05}px)`,
            transition: 'transform 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/98 to-void/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/60" />
        <div className="absolute inset-0 bg-void/25" />
      </motion.div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-[1] grid-bg opacity-30 pointer-events-none" />

      {/* Mouse-reactive radial glow */}
      <motion.div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: useTransform(
            [glowLeft, glowTop],
            ([l, tp]) =>
              `radial-gradient(ellipse 55% 45% at ${l}% ${tp}%, rgba(201,168,76,0.07) 0%, transparent 65%)`
          ),
        }}
        aria-hidden="true"
      />

      {/* Soft top light beam */}
      <div className="absolute top-0 left-[22%] w-px h-64 bg-gradient-to-b from-gold-500/30 to-transparent z-[2] pointer-events-none" aria-hidden="true" />

      {/* Ambient orbs */}
      <div className="absolute top-[28%] right-[14%] w-[520px] h-[520px] rounded-full bg-gold-500/[0.03] blur-[130px] orb-animate z-[1] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[34%] w-56 h-56 rounded-full bg-gold-500/[0.02] blur-[80px] orb-animate-2 z-[1] pointer-events-none" />

      {/* Canvas particle field */}
      <GoldParticles />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: fadeOut }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-44 pb-36"
      >
        <div className="max-w-[680px]">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={headlineIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-10 h-px bg-gold-500/70" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold-500">
              {t.hero.eyebrow}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={headlineIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-semibold text-stone-100 leading-[1.05] mb-10 max-w-[600px]"
            style={{ fontSize: 'clamp(2.8rem, 6.5vw, 6rem)', letterSpacing: '-0.02em' }}
          >
            {t.hero.headline1}<br />
            <span className="italic font-light text-gradient-gold">{t.hero.headline2}</span>
          </motion.h1>

          {/* Subheadline — condensed */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headlineIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="text-stone-400 font-light leading-[1.7] mb-8 max-w-[520px]"
            style={{ fontSize: 'clamp(1rem, 1.35vw, 1.0625rem)' }}
          >
            {t.hero.subheadline}
          </motion.p>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={headlineIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {[
              { icon: '⚡', label: t.hero.badge1 },
              { icon: '🕒', label: t.hero.badge2 },
              { icon: '🛡', label: t.hero.badge3 },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2.5 px-4 py-2.5 border border-gold-500/20 bg-gold-500/[0.035] rounded-sm backdrop-blur-sm"
              >
                <span className="text-[13px]">{badge.icon}</span>
                <span className="text-stone-300 text-[11px] font-medium tracking-wide">{badge.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={headlineIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <MagneticCTA
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              label={t.hero.cta}
            />
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headlineIn ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.48 }}
          className="mt-28 pt-10 border-t border-stone-700/40 flex flex-wrap gap-12 lg:gap-20"
        >
          {[
            { v: t.hero.stat1Value, l: t.hero.stat1Label },
            { v: t.hero.stat2Value, l: t.hero.stat2Label },
            { v: t.hero.stat3Value, l: t.hero.stat3Label },
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
        transition={{ delay: 3.4, duration: 0.8 }}
        onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50"
        aria-label={t.hero.scroll}
      >
        <span className="text-stone-800 text-[9px] tracking-[0.38em] uppercase group-hover:text-stone-600 transition-colors">{t.hero.scroll}</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={18} className="text-stone-700 group-hover:text-gold-500/70 transition-colors duration-300" strokeWidth={1.5} />
        </motion.div>
      </motion.button>
    </section>
  );
}

/* ─── Magnetic CTA button ─── */
function MagneticCTA({ onClick, label }: { onClick: () => void; label: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18 });
  const sy = useSpring(y, { stiffness: 180, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left - r.width / 2) * 0.2);
    y.set((e.clientY - r.top - r.height / 2) * 0.2);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(201,168,76,0.35)' }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="btn-primary group relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
    >
      {/* Shimmer sweep on hover */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
        whileHover={{ translateX: '200%' }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <span className="relative">{label}</span>
      <ArrowRight size={14} className="relative group-hover:translate-x-0.5 transition-transform duration-300 flip-rtl" />
    </motion.button>
  );
}
