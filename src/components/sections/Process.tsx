import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Clock, Phone, Search, Settings, Rocket, LineChart } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { AnimatedSection } from '../ui/AnimatedSection';

const icons = [Phone, Search, Settings, Settings, Rocket, LineChart];

export function Process() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const lineH = useTransform(scrollYProgress, [0.08, 0.88], ['0%', '100%']);

  const steps = [
    { number: '01', title: t.process.step1Title, description: t.process.step1Desc, duration: t.process.step1Duration },
    { number: '02', title: t.process.step2Title, description: t.process.step2Desc, duration: t.process.step2Duration },
    { number: '03', title: t.process.step3Title, description: t.process.step3Desc, duration: t.process.step3Duration },
    { number: '04', title: t.process.step4Title, description: t.process.step4Desc, duration: t.process.step4Duration },
    { number: '05', title: t.process.step5Title, description: t.process.step5Desc, duration: t.process.step5Duration },
    { number: '06', title: t.process.step6Title, description: t.process.step6Desc, duration: t.process.step6Duration },
  ];

  return (
    <section id="process" ref={sectionRef} className="py-36 lg:py-44 bg-stone-950 relative overflow-hidden">
      <div className="absolute inset-0 circuit-bg opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 mb-20 lg:mb-24 items-end">
          <div>
            <AnimatedSection delay={0}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-gold-500" />
                <span className="section-label">{t.labels.howItWorks}</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h2 className="section-title" style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.75rem)' }}>
                {t.process.headline1}<br />
                <span className="italic font-light text-stone-500">{t.process.headline2}</span>
              </h2>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.14}>
            <p className="text-stone-500 text-[14px] leading-[1.85]">
              {t.process.description}
            </p>
          </AnimatedSection>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 lg:gap-28 items-start">

          {/* Left: image block */}
          <AnimatedSection delay={0.1} direction="right">
            <div className="relative overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden border border-stone-700/50">
                <img
                  src="/assets/images/process/umit-yildirim-7F3oLnpv7_c-unsplash.jpg"
                  alt="MEHANS AI deployment process"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/35 to-transparent" />
              </div>

              <div className="absolute top-5 left-5 w-10 h-10 border-l-2 border-t-2 border-gold-500/35" />
              <div className="absolute bottom-5 right-5 w-10 h-10 border-r-2 border-b-2 border-gold-500/35" />

              <div className="absolute bottom-5 left-5">
                <div className="glass-dark px-7 py-5 border border-gold-500/15 rounded-sm">
                  <div className="font-display text-[28px] font-medium text-gold-500 leading-none">≤ 2 Wks</div>
                  <div className="text-stone-400 text-[12px] mt-1.5">{t.process.deploymentLabel}</div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: timeline */}
          <div className="relative">
            {/* Animated connector line - hidden on mobile */}
            <div className="hidden md:block absolute left-[22px] top-6 bottom-12 w-px bg-stone-800/50">
              <motion.div style={{ height: lineH }} className="w-full bg-gradient-to-b from-gold-500 to-gold-500/20 origin-top" />
            </div>

            <div className="flex flex-col">
              {steps.map((step, i) => {
                const Icon = icons[i];
                return (
                  <AnimatedSection key={step.number} delay={i * 0.08}>
                    <motion.div
                      whileHover={{ x: 6 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="group relative flex gap-4 md:gap-7 pb-8 md:pb-10 cursor-default last:pb-0"
                    >
                      {/* Circle node - larger on mobile */}
                      <div className="flex-shrink-0 w-12 h-12 md:w-12 md:h-12 border border-stone-700/60 group-hover:border-gold-500/45 bg-stone-950 flex items-center justify-center z-10 relative transition-all duration-400 rounded-sm">
                        <Icon size={18} className="md:hidden text-stone-500 group-hover:text-gold-500 transition-colors duration-300" strokeWidth={1.5} />
                        <Icon size={15} className="hidden md:block text-stone-500 group-hover:text-gold-500 transition-colors duration-300" strokeWidth={1.5} />
                      </div>

                      {/* Content */}
                      <div className="pt-2.5 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 mb-2">
                          <h3 className="text-stone-200 font-medium text-[15px] md:text-[15px] group-hover:text-stone-100 transition-colors duration-300">
                            {step.title}
                          </h3>
                          <div className="flex items-center gap-1.5 text-stone-600 text-[11px]">
                            <Clock size={11} strokeWidth={1.5} />
                            <span>{step.duration}</span>
                          </div>
                        </div>
                        <p className="text-stone-500 text-[13px] md:text-[13px] leading-[1.75]">{step.description}</p>
                      </div>
                    </motion.div>
                  </AnimatedSection>
                );
              })}
            </div>

            <AnimatedSection delay={0.55}>
              <div className="pl-0 md:pl-[76px] pt-6 md:pt-8">
                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary group w-full md:w-auto"
                  aria-label={t.process.cta}
                >
                  {t.process.cta}
                  <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block flip-rtl">→</span>
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
