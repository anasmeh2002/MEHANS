import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Clock, Phone, Search, Settings, Rocket, LineChart } from 'lucide-react';
import { processSteps } from '../../data';
import { AnimatedSection } from '../ui/AnimatedSection';

const icons = [Phone, Search, Settings, Settings, Rocket, LineChart];

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const lineH = useTransform(scrollYProgress, [0.08, 0.88], ['0%', '100%']);

  return (
    <section id="process" ref={sectionRef} className="py-32 lg:py-40 bg-void relative overflow-hidden">
      <div className="absolute inset-0 circuit-bg opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 mb-18 lg:mb-22 items-end">
          <div>
            <AnimatedSection delay={0}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-gold-500" />
                <span className="section-label">How It Works</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h2 className="section-title" style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.75rem)' }}>
                From Discovery to Live<br />
                <span className="italic font-light text-stone-500">in Six Steps.</span>
              </h2>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.14}>
            <p className="text-stone-600 text-[13px] leading-[1.8]">
              Structured process. Zero risk. Measurable results from day one.
            </p>
          </AnimatedSection>
        </div>

        <div className="grid lg:grid-cols-2 gap-18 lg:gap-28 items-start">

          {/* Left: image block */}
          <AnimatedSection delay={0.1} direction="right">
            <div className="relative overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden border border-stone-800/40">
                <img
                  src="/assets/images/process/umit-yildirim-7F3oLnpv7_c-unsplash.jpg"
                  alt="MEHANS AI deployment process"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/30 to-transparent" />
              </div>

              <div className="absolute top-5 left-5 w-8 h-8 border-l border-t border-gold-500/35" />
              <div className="absolute bottom-5 right-5 w-8 h-8 border-r border-b border-gold-500/35" />

              <div className="absolute bottom-5 left-5">
                <div className="glass-dark px-6 py-4 border border-white/[0.06]">
                  <div className="font-display text-[28px] font-medium text-gold-500 leading-none">≤ 2 Wks</div>
                  <div className="text-stone-500 text-[11px] mt-1">average deployment</div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: timeline */}
          <div className="relative">
            {/* Animated connector line */}
            <div className="absolute left-[22px] top-6 bottom-12 w-px bg-stone-800/45">
              <motion.div style={{ height: lineH }} className="w-full bg-gradient-to-b from-gold-500 to-gold-500/20 origin-top" />
            </div>

            <div className="flex flex-col">
              {processSteps.map((step, i) => {
                const Icon = icons[i];
                return (
                  <AnimatedSection key={step.number} delay={i * 0.08}>
                    <motion.div
                      whileHover={{ x: 6 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="group relative flex gap-7 pb-9 cursor-default last:pb-0"
                    >
                      {/* Circle node */}
                      <div className="flex-shrink-0 w-11 h-11 border border-stone-800 group-hover:border-gold-500/40 bg-void flex items-center justify-center z-10 relative transition-all duration-400">
                        <Icon size={14} className="text-stone-700 group-hover:text-gold-500 transition-colors duration-300" strokeWidth={1.5} />
                      </div>

                      {/* Content */}
                      <div className="pt-2.5 flex-1">
                        <div className="flex items-center justify-between mb-1.5">
                          <h3 className="text-stone-300 font-medium text-[14px] group-hover:text-stone-100 transition-colors duration-300">
                            {step.title}
                          </h3>
                          <div className="flex items-center gap-1.5 text-stone-700 text-[10px]">
                            <Clock size={10} strokeWidth={1.5} />
                            <span>{step.duration}</span>
                          </div>
                        </div>
                        <p className="text-stone-600 text-[12px] leading-[1.7]">{step.description}</p>
                      </div>
                    </motion.div>
                  </AnimatedSection>
                );
              })}
            </div>

            <AnimatedSection delay={0.55}>
              <div className="pl-[72px] pt-6">
                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary group"
                >
                  Start With Step One
                  <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">→</span>
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
