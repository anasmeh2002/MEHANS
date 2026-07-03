import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: Math.random() * 1.8 + 0.6,
  duration: Math.random() * 16 + 12,
  delay:    Math.random() * 12,
  driftX:   (Math.random() - 0.5) * 60,
}));

const HEADLINE_LINES = [
  { text: 'AI That Runs', italic: false },
  { text: 'Your Real Estate', italic: false },
  { text: 'Business.', italic: true },
];

const CLIENTS = ['Real Estate Agencies', 'Property Developers', 'Investment Firms', 'Independent Brokers'];

export function Hero() {
  const containerRef   = useRef<HTMLDivElement>(null);
  const [mouse, setMouse]          = useState({ x: 0, y: 0 });
  const [clientIdx, setClientIdx]  = useState(0);
  const [headlineIn, setHeadlineIn] = useState(false);
  const { scrollY } = useScroll();
  const imgY    = useTransform(scrollY, [0, 800], [0, 100]);
  const contentY = useTransform(scrollY, [0, 600], [0, 60]);
  const fadeOut  = useTransform(scrollY, [0, 420], [1, 0]);

  useEffect(() => {
    // Start headline animation after loading screen
    const t = setTimeout(() => setHeadlineIn(true), 2250);
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
        x: ((e.clientX - r.left) / r.width  - 0.5) * 22,
        y: ((e.clientY - r.top)  / r.height - 0.5) * 14,
      });
    };
    window.addEventListener('mousemove', onMouse, { passive: true });
    return () => window.removeEventListener('mousemove', onMouse);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-void">

      {/* ── Background image with parallax ── */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/assets/images/hero/alberto-castillo-q-mx4mSkK9zeo-unsplash.jpg)',
            transform: `scale(1.08) translate(${mouse.x * 0.1}px, ${mouse.y * 0.07}px)`,
            transition: 'transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
        {/* Dark gradient stack */}
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/93 to-void/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/55" />
        <div className="absolute inset-0 bg-void/20" />
      </motion.div>

      {/* ── Grid overlay ── */}
      <div className="absolute inset-0 z-[1] grid-bg opacity-100 pointer-events-none" style={{ opacity: 0.028 }} />

      {/* ── Particles ── */}
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
              background: 'rgba(201,168,76,0.55)',
              '--duration': `${p.duration}s`,
              '--delay': `${p.delay}s`,
              '--drift-x': `${p.driftX}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ── Ambient glow ── */}
      <div className="absolute top-[30%] right-[12%] w-[480px] h-[480px] rounded-full bg-gold-500/[0.05] blur-[130px] orb-animate z-[1] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[35%] w-52 h-52 rounded-full bg-gold-500/[0.04] blur-[80px] orb-animate-2 z-[1] pointer-events-none" />

      {/* ── Content ── */}
      <motion.div
        style={{ y: contentY, opacity: fadeOut }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-40 pb-28"
      >
        <div className="max-w-[720px]">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={headlineIn ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-8 h-px bg-gold-500" />
            <span className="section-label">AI Automation for Real Estate Leaders</span>
          </motion.div>

          {/* Headline — line by line reveal */}
          <h1 className="mb-8" style={{ fontSize: 'clamp(3rem, 6.5vw, 6rem)' }}>
            {HEADLINE_LINES.map((line, li) => (
              <div key={li} className="overflow-hidden leading-[1.04]">
                <motion.span
                  initial={{ y: '105%', opacity: 0 }}
                  animate={headlineIn ? { y: '0%', opacity: 1 } : {}}
                  transition={{
                    duration: 0.9,
                    delay: li * 0.14,
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
            initial={{ opacity: 0, y: 20 }}
            animate={headlineIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-stone-500 font-light leading-relaxed mb-10 max-w-[560px]"
            style={{ fontSize: 'clamp(1rem, 1.4vw, 1.125rem)' }}
          >
            MEHANS builds enterprise AI automation systems that capture leads, qualify
            prospects, automate follow-ups, schedule meetings, synchronize CRMs, and help
            real estate businesses scale with less manual work.
          </motion.p>

          {/* Rotating client ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={headlineIn ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex items-center gap-2 mb-10"
          >
            <span className="text-stone-700 text-xs tracking-wide">Built for</span>
            <div className="h-5 overflow-hidden">
              <AnimatedTicker value={CLIENTS[clientIdx]} />
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={headlineIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col xs:flex-row gap-3"
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

        {/* ── Floating glass card — right side desktop ── */}
        <motion.div
          initial={{ opacity: 0, x: 40, y: 20 }}
          animate={headlineIn ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="hidden xl:block absolute right-10 top-1/2 -translate-y-1/2 w-[280px]"
        >
          <div className="glass border border-white/[0.06] p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-stone-700">Live System Status</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] text-emerald-500/80">Active</span>
              </div>
            </div>
            {[
              { label: 'Leads Qualified', value: '1,247', delta: '+12%' },
              { label: 'Appointments Booked', value: '386', delta: '+8%' },
              { label: 'Response Time', value: '< 90s', delta: '↓ 94%' },
              { label: 'Manual Tasks Eliminated', value: '80%', delta: '↑' },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="text-stone-600 text-[11px]">{row.label}</span>
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

        {/* ── Stat strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headlineIn ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.15 }}
          className="mt-24 pt-10 border-t border-stone-800/40 flex flex-wrap gap-10 lg:gap-14"
        >
          {[
            { v: '< 90s', l: 'Lead Response Time' },
            { v: '80%',   l: 'Reduction in Manual Work' },
            { v: '6 Wks', l: 'Average Deployment' },
            { v: '24/7',  l: 'AI Uptime' },
          ].map((s) => (
            <div key={s.l} className="flex flex-col gap-1.5">
              <span className="font-display text-2xl md:text-3xl font-medium text-gold-500 leading-none">{s.v}</span>
              <span className="text-stone-700 text-[10px] font-semibold tracking-[0.2em] uppercase">{s.l}</span>
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 group"
      >
        <span className="text-stone-800 text-[9px] tracking-[0.35em] uppercase group-hover:text-stone-600 transition-colors">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={16} className="text-stone-700 group-hover:text-gold-500/70 transition-colors duration-300" strokeWidth={1.5} />
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
      initial={{ y: 18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -18, opacity: 0 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="block text-gold-500 text-xs font-semibold tracking-wide"
    >
      {value}
    </motion.span>
  );
}
