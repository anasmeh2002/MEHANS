import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles, Zap, Shield, Clock } from 'lucide-react';

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: Math.random() * 2 + 0.4,
  duration: Math.random() * 18 + 14,
  delay: Math.random() * 14,
  driftX: (Math.random() - 0.5) * 80,
}));

const HEADLINE_LINES = [
  { text: 'AI That Runs', italic: false },
  { text: 'Your Real Estate', italic: false },
  { text: 'Business.', italic: true },
];

const CLIENTS = ['Real Estate Agencies', 'Property Developers', 'Investment Firms', 'Independent Brokers'];

const STATS = [
  { v: '< 90s', l: 'Lead Response Time' },
  { v: '80%', l: 'Reduction in Manual Work' },
  { v: '6 Wks', l: 'Average Deployment' },
  { v: '24/7', l: 'AI Uptime' },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [clientIdx, setClientIdx] = useState(0);
  const [headlineIn, setHeadlineIn] = useState(false);
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 800], [0, 120]);
  const contentY = useTransform(scrollY, [0, 600], [0, 80]);
  const fadeOut = useTransform(scrollY, [0, 450], [1, 0]);

  useEffect(() => {
    const t = setTimeout(() => setHeadlineIn(true), 2400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setClientIdx((i) => (i + 1) % CLIENTS.length), 3000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - r.left) / r.width - 0.5) * 28,
        y: ((e.clientY - r.top) / r.height - 0.5) * 18,
      });
    };
    window.addEventListener('mousemove', onMouse, { passive: true });
    return () => window.removeEventListener('mousemove', onMouse);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-void">

      {/* Background image with premium parallax */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/assets/images/hero/alberto-castillo-q-mx4mSkK9zeo-unsplash.jpg)',
            transform: `scale(1.12) translate(${mouse.x * 0.08}px, ${mouse.y * 0.05}px)`,
            transition: 'transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
        {/* Premium gradient overlay stack */}
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/95 to-void/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/60" />
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/[0.02] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-void/25" />
      </motion.div>

      {/* Neural network pattern overlay */}
      <div className="absolute inset-0 z-[1] neural-bg opacity-80 pointer-events-none" />

      {/* Fine grid overlay */}
      <div className="absolute inset-0 z-[1] grid-bg opacity-40 pointer-events-none" />

      {/* Premium particles */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="particle absolute rounded-full"
            style={{
              left: `${p.left}%`,
              bottom: '-8px',
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: `rgba(201,168,76,${0.3 + Math.random() * 0.35})`,
              boxShadow: `0 0 ${p.size * 2}px rgba(201,168,76,0.3)`,
              '--duration': `${p.duration}s`,
              '--delay': `${p.delay}s`,
              '--drift-x': `${p.driftX}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Ambient glow orbs */}
      <div className="absolute top-[25%] right-[15%] w-[520px] h-[520px] rounded-full bg-gold-500/[0.04] blur-[140px] orb-animate z-[1] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[30%] w-60 h-60 rounded-full bg-gold-500/[0.025] blur-[90px] orb-animate-2 z-[1] pointer-events-none" />
      <div className="absolute top-[60%] left-[10%] w-40 h-40 rounded-full bg-gold-500/[0.02] blur-[70px] orb-animate-3 z-[1] pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: fadeOut }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-36 pb-28"
      >
        <div className="max-w-[720px]">

          {/* Eyebrow with badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={headlineIn ? { opacity: 1 } : {}}
            transition={{ duration: 0.9 }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="w-10 h-px bg-gold-500" />
            <span className="section-label">AI Automation for Real Estate Leaders</span>
          </motion.div>

          {/* Headline — premium reveal */}
          <h1 className="mb-8" style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}>
            {HEADLINE_LINES.map((line, li) => (
              <div key={li} className="overflow-hidden leading-[1.02]">
                <motion.span
                  initial={{ y: '105%', opacity: 0 }}
                  animate={headlineIn ? { y: '0%', opacity: 1 } : {}}
                  transition={{
                    duration: 1,
                    delay: li * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`block font-display font-medium ${
                    line.italic
                      ? 'italic font-light text-gradient-gold'
                      : 'text-stone-100'
                  }`}
                >
                  {line.text}
                </motion.span>
              </div>
            ))}
          </h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={headlineIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-stone-500 font-light leading-[1.85] mb-10 max-w-[580px]"
            style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)' }}
          >
            MEHANS builds enterprise AI automation systems that capture leads, qualify
            prospects, automate follow-ups, schedule meetings, synchronize CRMs, and help
            real estate businesses scale with less manual work.
          </motion.p>

          {/* Rotating client ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={headlineIn ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.72 }}
            className="flex items-center gap-3 mb-10"
          >
            <Sparkles size={12} className="text-gold-500/60" />
            <span className="text-stone-700 text-xs tracking-wide">Built for</span>
            <div className="h-5 overflow-hidden">
              <AnimatedTicker value={CLIENTS[clientIdx]} />
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={headlineIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col xs:flex-row gap-3.5"
          >
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary group"
            >
              Book AI Consultation
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
            </button>
            <button
              onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-ghost"
            >
              Explore Solutions
            </button>
          </motion.div>
        </div>

        {/* Floating glass card — right side desktop */}
        <motion.div
          initial={{ opacity: 0, x: 50, y: 25 }}
          animate={headlineIn ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="hidden xl:block absolute right-10 top-1/2 -translate-y-1/2 w-[290px]"
        >
          <div className="glass border border-white/[0.07] p-7 flex flex-col gap-6 relative overflow-hidden">
            {/* Subtle corner accent */}
            <div className="absolute top-0 left-0 w-8 h-px bg-gold-500/30" />
            <div className="absolute top-0 left-0 w-px h-8 bg-gold-500/30" />

            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-bold tracking-[0.32em] uppercase text-stone-700">Live System Status</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] text-emerald-500/80">Active</span>
              </div>
            </div>
            {[
              { label: 'Leads Qualified', value: '1,247', delta: '+12%', icon: Zap },
              { label: 'Appointments Booked', value: '386', delta: '+8%', icon: Clock },
              { label: 'Response Time', value: '< 90s', delta: '↓ 94%', icon: Shield },
              { label: 'Manual Tasks Eliminated', value: '80%', delta: '↑', icon: Sparkles },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <row.icon size={11} className="text-stone-700" />
                  <span className="text-stone-600 text-[11px]">{row.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-stone-300 text-[12px] font-medium tabular-nums">{row.value}</span>
                  <span className="text-gold-500/70 text-[9px] font-semibold">{row.delta}</span>
                </div>
              </div>
            ))}
            <div className="h-px bg-stone-800/60 my-1" />
            <p className="text-stone-700 text-[10px] leading-relaxed">
              Real-time metrics from an active MEHANS AI deployment. Your results will vary based on workflow scope.
            </p>
          </div>
        </motion.div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headlineIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-26 pt-10 border-t border-stone-800/40"
        >
          <div className="flex flex-wrap gap-10 lg:gap-16">
            {STATS.map((s) => (
              <motion.div
                key={s.l}
                className="flex flex-col gap-2 group cursor-default"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <span className="font-display text-2xl md:text-3xl font-medium text-gold-500 leading-none group-hover:text-gold-400 transition-colors duration-300">
                  {s.v}
                </span>
                <span className="text-stone-700 text-[10px] font-semibold tracking-[0.22em] uppercase">
                  {s.l}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.4, duration: 0.9 }}
        onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2.5 group"
      >
        <span className="text-stone-800 text-[9px] tracking-[0.38em] uppercase group-hover:text-stone-600 transition-colors">
          Scroll
        </span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={18} className="text-stone-700 group-hover:text-gold-500/70 transition-colors duration-300" strokeWidth={1.5} />
        </motion.div>
      </motion.button>
    </section>
  );
}

/* Ticker sub-component */
function AnimatedTicker({ value }: { value: string }) {
  return (
    <motion.span
      key={value}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="block text-gold-500 text-xs font-semibold tracking-wide"
    >
      {value}
    </motion.span>
  );
}
