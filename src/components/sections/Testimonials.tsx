import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../../data';
import { AnimatedSection } from '../ui/AnimatedSection';

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [dir, setDir]       = useState(1);
  const timer               = useRef<ReturnType<typeof setTimeout>>();

  const go = useCallback((idx: number) => {
    setDir(idx > active ? 1 : -1);
    setActive(idx);
  }, [active]);

  const next = useCallback(() => go(active === testimonials.length - 1 ? 0 : active + 1), [active, go]);
  const prev = useCallback(() => go(active === 0 ? testimonials.length - 1 : active - 1), [active, go]);

  useEffect(() => {
    timer.current = setTimeout(next, 7000);
    return () => clearTimeout(timer.current);
  }, [active, next]);

  const current = testimonials[active];

  const slide = {
    enter: (d: number) => ({ opacity: 0, x: d * 28, y: 6 }),
    center:              ({ opacity: 1, x: 0, y: 0 }),
    exit:  (d: number) => ({ opacity: 0, x: d * -28, y: -6 }),
  };

  return (
    <section id="testimonials" className="py-28 lg:py-36 bg-void relative overflow-hidden">
      {/* Subtle photo behind */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/assets/images/testimonials/mikail-mcverry-GSL3IuuwJv8-unsplash.jpg"
          alt=""
          className="w-full h-full object-cover opacity-[0.05]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-void/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-20">
          <div>
            <AnimatedSection delay={0}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-px bg-gold-500" />
                <span className="section-label">Client Results</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h2 className="section-title" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
                What Real Estate Leaders{' '}
                <span className="italic font-light text-stone-500">Actually Say.</span>
              </h2>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.14}>
            <div className="flex items-center gap-4">
              <button onClick={prev} className="w-9 h-9 border border-stone-800 hover:border-stone-600 flex items-center justify-center text-stone-700 hover:text-stone-400 transition-all duration-300">
                <ChevronLeft size={15} strokeWidth={1.5} />
              </button>
              <button onClick={next} className="w-9 h-9 border border-stone-800 hover:border-stone-600 flex items-center justify-center text-stone-700 hover:text-stone-400 transition-all duration-300">
                <ChevronRight size={15} strokeWidth={1.5} />
              </button>
              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    className={`transition-all duration-300 rounded-full ${i === active ? 'w-4 h-1 bg-gold-500' : 'w-1 h-1 bg-stone-700 hover:bg-stone-600'}`}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8">

          {/* Large quote panel */}
          <AnimatedSection delay={0.15}>
            <div className="border border-stone-800/50 bg-charcoal/50 relative overflow-hidden h-full min-h-[420px] flex flex-col">
              {/* Gold top-left rule */}
              <div className="h-px w-0 bg-gold-500/50 line-draw absolute top-0 left-0" />

              <div className="flex-1 p-10 md:p-12 flex flex-col">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={current.id}
                    custom={dir}
                    variants={slide}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-8 flex-1"
                  >
                    {/* Stars */}
                    <div className="flex gap-1">
                      {Array.from({ length: current.rating }).map((_, i) => (
                        <Star key={i} size={12} className="text-gold-500 fill-gold-500" strokeWidth={0} />
                      ))}
                    </div>

                    {/* Quote mark */}
                    <div className="font-display text-[80px] text-stone-800/60 leading-none -mb-4 select-none">"</div>

                    {/* Text */}
                    <blockquote className="text-stone-300 font-light leading-[1.75] flex-1"
                      style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)' }}
                    >
                      {current.text}
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-6 border-t border-stone-800/40">
                      <div className="w-11 h-11 overflow-hidden border border-stone-700/50 flex-shrink-0">
                        <img src={current.image} alt={current.name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div>
                        <div className="text-stone-200 font-medium text-[14px]">{current.name}</div>
                        <div className="text-stone-600 text-[11px] mt-0.5">{current.role}</div>
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
              <AnimatedSection key={t.id} delay={0.12 + i * 0.055}>
                <motion.button
                  onClick={() => go(i)}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                  className={`w-full text-left px-5 py-4 border transition-all duration-350 relative overflow-hidden ${
                    i === active
                      ? 'border-stone-700/60 bg-charcoal/70'
                      : 'border-stone-800/30 hover:border-stone-800/60 bg-transparent'
                  }`}
                >
                  {/* Active left bar */}
                  {i === active && (
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gold-500" />
                  )}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-7 h-7 overflow-hidden flex-shrink-0 border border-stone-800/60">
                      <img src={t.image} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div>
                      <div className={`text-[11px] font-medium transition-colors duration-200 ${i === active ? 'text-gold-500' : 'text-stone-500'}`}>
                        {t.name}
                      </div>
                      <div className="text-stone-700 text-[10px]">{t.role.split(',')[0]}</div>
                    </div>
                  </div>
                  <p className="text-stone-700 text-[11px] leading-relaxed line-clamp-2 pl-10">
                    "{t.text.slice(0, 90)}…"
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
