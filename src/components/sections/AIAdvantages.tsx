import { motion } from 'framer-motion';
import { Zap, Settings, Layers, LineChart } from 'lucide-react';
import { aiAdvantages } from '../../data';
import { AnimatedSection } from '../ui/AnimatedSection';

const ICONS = [Zap, Settings, Layers, LineChart];

export function AIAdvantages() {
  return (
    <section id="ai-advantages" className="py-28 lg:py-36 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 grid-bg-fine opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16 lg:mb-20 items-end">
          <div>
            <AnimatedSection delay={0}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-px bg-gold-500" />
                <span className="section-label">The MEHANS Difference</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h2 className="section-title" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
                AI Infrastructure That{' '}
                <span className="italic font-light text-stone-500">Performs at Scale.</span>
              </h2>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.14}>
            <p className="section-subtitle">
              Four engineering principles that separate MEHANS systems from generic automation tools and SaaS platforms.
            </p>
          </AnimatedSection>
        </div>

        {/* 2×2 feature cards */}
        <div className="grid md:grid-cols-2 gap-px bg-stone-800/20 mb-px">
          {aiAdvantages.map((adv, i) => {
            const Icon = ICONS[i];
            return (
              <AnimatedSection key={adv.title} delay={i * 0.09}>
                <motion.div
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.015)' }}
                  className="group bg-charcoal px-10 py-10 h-full flex flex-col gap-7 cursor-default
                    border border-transparent hover:border-stone-700/30 transition-all duration-500 relative overflow-hidden"
                >
                  {/* Corner accent on hover */}
                  <div className="absolute top-0 left-0 w-12 h-px bg-gold-500/0 group-hover:bg-gold-500/40 transition-all duration-500" />
                  <div className="absolute top-0 left-0 h-12 w-px bg-gold-500/0 group-hover:bg-gold-500/40 transition-all duration-500" />

                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 border border-stone-800 group-hover:border-stone-600 flex items-center justify-center transition-colors duration-400">
                      <Icon size={15} strokeWidth={1.5} className="text-stone-700 group-hover:text-gold-500 transition-colors duration-400" />
                    </div>
                    <div className="text-right">
                      <div className="font-display text-[2.25rem] font-medium text-gold-500 leading-none">
                        {adv.metric}
                      </div>
                      <div className="text-stone-700 text-[10px] mt-1">{adv.metricLabel}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-stone-200 font-medium text-[15px] mb-3 leading-snug group-hover:text-stone-100 transition-colors duration-300">
                      {adv.title}
                    </h3>
                    <p className="text-stone-600 text-[13px] leading-[1.7]">{adv.description}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Full-width callout — Palantir style */}
        <AnimatedSection delay={0.45}>
          <div className="relative border border-stone-800/50 overflow-hidden bg-charcoal">
            {/* Left gold accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold-500 via-gold-500/30 to-transparent" />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 px-12 lg:px-16 py-12">
              <div className="max-w-lg">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  <span className="text-[9px] font-bold tracking-[0.35em] uppercase text-gold-500/70">Enterprise-Grade Infrastructure</span>
                </div>
                <h3 className="font-display text-[1.75rem] lg:text-[2.125rem] font-medium text-stone-100 leading-tight mb-3">
                  Not software you configure.{' '}
                  <span className="italic font-light text-stone-500">Systems we engineer.</span>
                </h3>
                <p className="text-stone-600 text-[13px] leading-relaxed">
                  Every MEHANS deployment is a bespoke engineering project. We design, build, test, and maintain AI systems that are wired precisely into how your business operates.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 flex-shrink-0">
                {[
                  { n: '6 Wks',  l: 'Avg. Deployment' },
                  { n: '99.9%', l: 'System Uptime'    },
                  { n: 'Zero',  l: 'Template Code'    },
                  { n: 'Full',  l: 'CRM Sync'         },
                ].map((m) => (
                  <div key={m.l} className="text-center">
                    <div className="font-display text-[1.625rem] font-medium text-gold-500 leading-none mb-1">{m.n}</div>
                    <div className="text-stone-700 text-[10px] tracking-wide">{m.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
