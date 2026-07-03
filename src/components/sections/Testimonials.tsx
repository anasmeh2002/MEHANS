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
    timer.current = setTimeout(next, 6000);
    return () => clearTimeout(timer.current);
  }, [active, next]);

  const current = testimonials[active];

  const slide = {
    enter: (d: number) => ({ opacity: 0, x: d * 30, y: 6 }),
    center: ({ opacity: 1, x: 0, y: 0 }),
    exit: (d: number) => ({ opacity: 0, x: d * -30, y: -6 }),
  };

  return (
    <section id="testimonials" className="py-32 lg:py-40 bg-void relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/assets/images/testimonials/mikail-mcverry-GSL3IuuwJv8-unsplash.jpg"
          alt=""
          className="w-full h-full object-cover opacity-[0.04]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-void/92" />
      </div>

      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] rounded-full bg-gold-500/[0.02] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-20">
          <div>
            <AnimatedSection delay={0}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-gold-500" />
                <span className="section-label">Client Results</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h2 className="section-title" style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.75rem)' }}>
                What Leaders Say
              </h2>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.14}>
            <div className="flex items-center gap-4">
              <button onClick={prev} className="w-9 h-9 border border-stone-700/60 hover:border-stone-600 flex items-center justify-center text-stone-600 hover:text-stone-400 transition-all duration-300">
                <ChevronLeft size={15} strokeWidth={1.5} />
              </button>
              <button onClick={next} className="w-9 h-9 border border-stone-700/60 hover:border-stone-600 flex items-center justify-center text-stone-600 hover:text-stone-400 transition-all duration-300">
                <ChevronRight size={15} strokeWidth={1.5} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    className={`transition-all duration-300 rounded-full ${
                      i === active
                        ? 'w-4 h-1 bg-gold-500'
                        : 'w-1 h-1 bg-stone-700 hover:bg-stone-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6">

          {/* Large quote panel */}
          <AnimatedSection delay={0.15}>
            <div className="border border-stone-800/40 bg-charcoal/50 relative overflow-hidden min-h-[380px] flex flex-col">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="h-px bg-gradient-to-r from-gold-500/40 to-transparent absolute top-0 left-0"
              />

              <div className="flex-1 p-10 lg:p-12 flex flex-col">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={current.id}
                    custom={dir}
                    variants={slide}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-6 flex-1"
                  >
                    {/* Stars */}
                    <div className="flex gap-1">
                      {Array.from({ length: current.rating }).map((_, i) => (
                        <Star key={i} size={12} className="text-gold-500 fill-gold-500" strokeWidth={0} />
                      ))}
                    </div>

                    {/* Quote icon */}
                    <Quote size={40} className="text-gold-500/12" strokeWidth={1} />

                    {/* Text */}
                    <blockquote className="text-stone-300 font-light leading-[1.8] flex-1 text-[14px] lg:text-[15px]">
                      "{current.text}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-6 border-t border-stone-800/35">
                      <div className="w-12 h-12 overflow-hidden border border-stone-700/50 flex-shrink-0">
                        <img src={current.image} alt={current.name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div>
                        <div className="text-stone-200 font-medium text-[14px]">{current.name}</div>
                        <div className="text-stone-500 text-[11px] mt-0.5">{current.role}</div>
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
                  className={`w-full text-left px-5 py-4 border transition-all duration-350 relative overflow-hidden ${
                    i === active
                      ? 'border-gold-500/20 bg-charcoal/70'
                      : 'border-stone-800/25 hover:border-stone-800/50 bg-transparent'
                  }`}
                >
                  {i === active && (
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gold-500" />
                  )}

                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 overflow-hidden flex-shrink-0 border border-stone-800/50">
                      <img src={t.image} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-medium transition-colors duration-200 ${
                        i === active ? 'text-gold-500' : 'text-stone-500'
                      }`}>
                        {t.name}
                      </span>
                      <span className="text-stone-600 text-[10px]">·</span>
                      <span className="text-stone-600 text-[10px]">{t.role.split(',')[0]}</span>
                    </div>
                  </div>
                  <p className="text-stone-500 text-[11px] leading-relaxed line-clamp-2 pl-[44px]">
                    "{t.text.slice(0, 80)}…"
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
