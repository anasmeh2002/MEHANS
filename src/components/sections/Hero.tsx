import { useEffect, useRef, memo } from 'react';
import { ArrowRight, ChevronDown, Zap, Home, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../i18n';

/* ─── Canvas particle field (lightweight) ─── */
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
  const COUNT = 18;

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
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.4 + 0.12),
      size: Math.random() * 1.4 + 0.4,
      opacity: Math.random() * 0.5 + 0.12,
      life: 0,
      maxLife: Math.random() * 280 + 160,
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
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-void">
      {/* Background image — brighter, with subtle contrast filter */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/hero/alberto-castillo-q-mx4mSkK9zeo-unsplash.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-45"
          style={{ filter: 'contrast(1.08) saturate(1.05)' }}
          fetchPriority="high"
          decoding="async"
        />
        {/* Lighter overlay — ~25% reduction from original */}
        <div className="absolute inset-0 bg-gradient-to-b from-void/65 via-void/55 to-void/85" />
        <div className="absolute inset-0 bg-void/25" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-[1] grid-bg opacity-20 pointer-events-none" />

      {/* Center radial glow */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(201,168,76,0.08) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      {/* Ambient orbs */}
      <div className="absolute top-[25%] left-[12%] w-[420px] h-[420px] rounded-full bg-gold-500/[0.025] blur-[130px] orb-animate z-[1] pointer-events-none" />
      <div className="absolute bottom-[18%] right-[12%] w-72 h-72 rounded-full bg-gold-500/[0.02] blur-[90px] orb-animate-2 z-[1] pointer-events-none" />

      {/* Canvas particle field */}
      <GoldParticles />

      {/* Content — centered */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 lg:px-10 text-center py-20">

        {/* Eyebrow */}
        <div className="hero-enter inline-flex items-center gap-3 mb-8" style={{ animationDelay: '0.05s' }}>
          <div className="w-8 h-px bg-gold-500/60" />
          <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold-500">
            {t.hero.eyebrow}
          </span>
          <div className="w-8 h-px bg-gold-500/60" />
        </div>

        {/* Headline */}
        <h1
          className="hero-enter font-display font-semibold text-stone-100 leading-[1.1] mb-8"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
            letterSpacing: isRTL ? '0' : '-0.025em',
            animationDelay: '0.15s',
          }}
        >
          <span className="block">{t.hero.headline1}</span>
          <span className="block text-gradient-gold">{t.hero.headline2}</span>
        </h1>

        {/* Subheadline */}
        <p
          className="hero-enter text-stone-200/90 font-light leading-[1.8] mb-10 max-w-xl mx-auto"
          style={{
            fontSize: 'clamp(0.95rem, 1.3vw, 1.0625rem)',
            animationDelay: '0.3s',
          }}
        >
          {t.hero.subheadline}
        </p>

        {/* Single primary CTA — centered */}
        <div
          className="hero-enter flex justify-center mb-10"
          style={{ animationDelay: '0.45s' }}
        >
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary group"
            aria-label={t.hero.cta}
          >
            {t.hero.cta}
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300 flip-rtl" />
          </button>
        </div>

        {/* Feature badges */}
        <div
          className="hero-enter flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
          style={{ animationDelay: '0.6s' }}
        >
          {[
            { icon: Zap, label: t.hero.badge1 },
            { icon: Home, label: t.hero.badge2 },
            { icon: ShieldCheck, label: t.hero.badge3 },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 px-4 py-2.5 border border-gold-500/15 bg-gold-500/[0.025] rounded-sm backdrop-blur-sm hover:border-gold-500/30 transition-colors duration-300"
            >
              <Icon size={13} className="text-gold-500/80 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-stone-200 text-[11px] font-medium tracking-wide">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50"
        aria-label={t.hero.scroll}
      >
        <span className="text-stone-400 text-[9px] tracking-[0.38em] uppercase group-hover:text-stone-200 transition-colors">
          {t.hero.scroll}
        </span>
        <ChevronDown size={16} className="text-stone-400 group-hover:text-gold-500/70 transition-colors duration-300 scroll-bounce" strokeWidth={1.5} />
      </button>
    </section>
  );
}
