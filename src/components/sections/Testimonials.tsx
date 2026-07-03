import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../../data';
import { AnimatedSection } from '../ui/AnimatedSection';

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const go = useCallback((idx: number) => {
    setDir(idx > active ? 1 : -1);
    setActive(idx);
  }, [active]);

  const next = useCallback(() => go(active === testimonials.length - 1 ? 0 : active + 1), [active, go]);
  const prev = useCallback(() => go(active === 0 ? testimonials.length - 1 : active - 1), [active, go]);

  useEffect(() => {
    timer.current = setTimeout(next, 8000);
    return () => clearTimeout(timer.current);
  }, [active, next]);

  const current = testimonials[active];

  const slide = {
    enter: (d: number) => ({ opacity: 0, x: d * 35, y: 8 }),
    center: ({ opacity: 1, x: 0, y: 0 }),
    exit: (d: number) => ({ opacity: 0, x: d * -35, y: -8 }),
  };

  return (
    <section id="testimonials" className="py-32 lg:py-40 bg-void relative overflow-hidden">
      {/* Subtle photo behind */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/assets/images/testimonials/mikail-mcverry-GSL3IuuwJv8-unsplash.jpg"
          alt=""
          className="w-full h-full object-cover opacity-[0.04]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-void/92" />
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-gold-500/[0.02] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-18 lg:mb-22">
          <div>
            <AnimatedSection delay={0}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-gold-500" />
                <span className="section-label">Client Results</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h2 className="section-title" style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.75rem)' }}>
                What Real Estate Leaders{' '}
                <span className="italic font-light text-stone-500">Actually Say.</span>
              </h2>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.14}>
            <div className="flex items-center gap-5">
              <button onClick={prev} className="w-10 h-10 border border-stone-800 hover:border-stone-600 hover:bg-stone-800/30 flex items-center justify-center text-stone-700 hover:text-stone-400 transition-all duration-300">
                <ChevronLeft size={16} strokeWidth={1.5} />
              </button>
              <button onClick={next} className="w-10 h-10 border border-stone-800 hover:border-stone-600 hover:bg-stone-800/30 flex items-center justify-center text-stone-700 hover:text-stone-400 transition-all duration-300">
                <ChevronRight size={16} strokeWidth={1.5} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    className={`transition-all duration-300 rounded-full ${
                      i === active
                        ? 'w-5 h-1.5 bg-gold-500'
                        : 'w-1.5 h-1.5 bg-stone-700 hover:bg-stone-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-[1.65fr_1fr] gap-8">

          {/* Large quote panel */}
          <AnimatedSection delay={0.15}>
            <div className="border border-stone-800/45 bg-charcoal/60 relative overflow-hidden h-full min-h-[450px] flex flex-col">
              {/* Gold top-left rule */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="h-px bg-gradient-to-r from-gold-500/50 to-transparent absolute top-0 left-0"
              />

              <div className="flex-1 p-11 md:p-14 flex flex-col">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={current.id}
                    custom={dir}
                    variants={slide}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-8 flex-1"
                  >
                    {/* Stars */}
                    <div className="flex gap-1.5">
                      {Array.from({ length: current.rating }).map((_, i) => (
                        <Star key={i} size={13} className="text-gold-500 fill-gold-500" strokeWidth={0} />
                      ))}
                    </div>

                    {/* Quote icon */}
                    <div className="flex items-center gap-4">
                      <Quote size={48} className="text-gold-500/15" strokeWidth={1} />
                      <div className="h-px flex-1 bg-gradient-to-r from-stone-800/60 to-transparent" />
                    </div>

                    {/* Text */}
                    <blockquote className="text-stone-300 font-light leading-[1.85] flex-1"
                      style={{ fontSize: 'clamp(0.95rem, 1.35vw, 1.125rem)' }}
                    >
                      "{current.text}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-5 pt-8 border-t border-stone-800/40">
                      <div className="w-14 h-14 overflow-hidden border-[1.5px] border-stone-700/50 flex-shrink-0">
                        <img src={current.image} alt={current.name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div>
                        <div className="text-stone-200 font-medium text-[15px]">{current.name}</div>
                        <div className="text-stone-600 text-[12px] mt-1">{current.role}</div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </AnimatedSection>

          {/* Sidebar list */}
          <div className="flex flex-col gap-2">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.id} delay={0.12 + i * 0.06}>
                <motion.button
                  onClick={() => go(i)}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.25 }}
                  className={`w-full text-left px-6 py-5 border transition-all duration-400 relative overflow-hidden ${
                    i === active
                      ? 'border-gold-500/25 bg-charcoal/80'
                      : 'border-stone-800/30 hover:border-stone-800/55 bg-transparent hover:bg-charcoal/40'
                  }`}
                >
                  {/* Active left bar */}
                  {i === active && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: '100%' }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-0 top-0 w-[2px] bg-gold-500"
                    />
                  )}

                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-9 h-9 overflow-hidden flex-shrink-0 border border-stone-800/60">
                      <img src={t.image} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div>
                      <div className={`text-[12px] font-medium transition-colors duration-200 ${
                        i === active ? 'text-gold-500' : 'text-stone-500'
                      }`}>
                        {t.name}
                      </div>
                      <div className="text-stone-700 text-[10px] mt-0.5">{t.role.split(',')[0]}</div>
                    </div>
                  </div>
                  <p className="text-stone-700 text-[11px] leading-relaxed line-clamp-2 pl-[52px]">
                    "{t.text.slice(0, 95)}…"
                  </p>
                </motion.button>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
