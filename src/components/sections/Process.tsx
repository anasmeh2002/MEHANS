import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Clock } from 'lucide-react';
import { processSteps } from '../../data';
import { AnimatedSection } from '../ui/AnimatedSection';

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const lineH = useTransform(scrollYProgress, [0.05, 0.85], ['0%', '100%']);

  return (
    <section id="process" ref={sectionRef} className="py-28 lg:py-36 bg-void relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16 lg:mb-24 items-end">
          <div>
            <AnimatedSection delay={0}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-px bg-gold-500" />
                <span className="section-label">How It Works</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h2 className="section-title" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
                Discovery to Deployment{' '}
                <span className="italic font-light text-stone-500">in Six Phases.</span>
              </h2>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.14}>
            <p className="section-subtitle">
              A structured process designed to eliminate implementation risk and guarantee measurable results from day one of going live.
            </p>
          </AnimatedSection>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-start">

          {/* Left: image block */}
          <AnimatedSection delay={0.1} direction="right">
            <div className="relative overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/assets/images/process/umit-yildirim-7F3oLnpv7_c-unsplash.jpg"
                  alt="MEHANS AI deployment process"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-void/20 to-transparent" />
              </div>

              {/* Overlay stat */}
              <div className="absolute bottom-6 left-6">
                <div className="glass-dark px-6 py-4 border border-white/[0.05]">
                  <div className="font-display text-[28px] font-medium text-gold-500 leading-none">6 Weeks</div>
                  <div className="text-stone-500 text-[11px] mt-1">average time to full deployment</div>
                </div>
              </div>

              {/* Corner marks */}
              <div className="absolute top-5 left-5 w-6 h-6 border-l border-t border-gold-500/30" />
              <div className="absolute bottom-5 right-5 w-6 h-6 border-r border-b border-gold-500/30" />
            </div>

            {/* Quote below image */}
            <AnimatedSection delay={0.25}>
              <div className="mt-8 pl-6 border-l border-stone-800/60">
                <p className="text-stone-500 text-[13px] leading-relaxed italic mb-2">
                  "The MEHANS team mapped our entire workflow in two days and had a working prototype in the third week. Nothing like any agency we'd worked with before."
                </p>
                <span className="text-stone-700 text-[11px]">— Agency client, Casablanca</span>
              </div>
            </AnimatedSection>
          </AnimatedSection>

          {/* Right: timeline */}
          <div className="relative">
            {/* Animated connector line */}
            <div className="absolute left-[19px] top-5 bottom-10 w-px bg-stone-800/50">
              <motion.div style={{ height: lineH }} className="w-full bg-gradient-to-b from-gold-500 to-gold-500/20 origin-top" />
            </div>

            <div className="flex flex-col">
              {processSteps.map((step, i) => (
                <AnimatedSection key={step.number} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative flex gap-7 pb-10 cursor-default last:pb-0"
                  >
                    {/* Circle node */}
                    <div className="flex-shrink-0 w-10 h-10 border border-stone-800 group-hover:border-gold-500/35 bg-void flex items-center justify-center z-10 relative transition-all duration-400">
                      <span className="text-stone-700 group-hover:text-gold-500 text-[10px] font-bold transition-colors duration-300">
                        {step.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="pt-2 flex-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className="text-stone-300 font-medium text-[14px] group-hover:text-stone-100 transition-colors duration-300">
                          {step.title}
                        </h3>
                        <div className="flex items-center gap-1 text-stone-700 text-[10px]">
                          <Clock size={9} strokeWidth={1.5} />
                          <span>{step.duration}</span>
                        </div>
                      </div>
                      <p className="text-stone-600 text-[12px] leading-[1.7]">{step.description}</p>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.6}>
              <div className="pl-[68px] pt-6">
                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary"
                >
                  Start With Step One
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
