import { motion } from 'framer-motion';
import { Zap, Settings, Layers, LineChart, Shield, Clock } from 'lucide-react';
import { aiAdvantages } from '../../data';
import { AnimatedSection } from '../ui/AnimatedSection';

const ICONS = [Zap, Settings, Layers, LineChart];

export function AIAdvantages() {
  return (
    <section id="ai-advantages" className="py-32 lg:py-40 bg-charcoal relative overflow-hidden">
      {/* Fine grid */}
      <div className="absolute inset-0 grid-bg-fine opacity-50 pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gold-500/[0.012] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 mb-18 lg:mb-22 items-end">
          <div>
            <AnimatedSection delay={0}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-gold-500" />
                <span className="section-label">The MEHANS Difference</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h2 className="section-title" style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.75rem)' }}>
                AI Infrastructure That{' '}
                <span className="italic font-light text-stone-500">Performs at Scale.</span>
              </h2>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.14}>
            <p className="section-subtitle leading-[1.85]">
              Four engineering principles that separate MEHANS systems from generic automation tools and SaaS platforms.
            </p>
          </AnimatedSection>
        </div>

        {/* 2×2 feature cards */}
        <div className="grid md:grid-cols-2 gap-px bg-stone-800/15 mb-px">
          {aiAdvantages.map((adv, i) => {
            const Icon = ICONS[i];
            return (
              <AnimatedSection key={adv.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{
                    backgroundColor: 'rgba(255,255,255,0.018)',
                    y: -3
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="group bg-charcoal px-11 py-11 h-full flex flex-col gap-8 cursor-default
                    border border-transparent hover:border-gold-500/12 transition-all duration-500 relative overflow-hidden"
                >
                  {/* Corner accent on hover */}
                  <div className="absolute top-0 left-0 w-14 h-px bg-gold-500/0 group-hover:bg-gold-500/45 transition-all duration-400" />
                  <div className="absolute top-0 left-0 w-px h-14 bg-gold-500/0 group-hover:bg-gold-500/45 transition-all duration-400" />

                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 border border-stone-800 group-hover:border-gold-500/25 flex items-center justify-center transition-colors duration-400">
                      <Icon size={16} strokeWidth={1.5} className="text-stone-700 group-hover:text-gold-500 transition-colors duration-400" />
                    </div>
                    <div className="text-right">
                      <div className="font-display text-[2.5rem] font-medium text-gold-500 leading-none">
                        {adv.metric}
                      </div>
                      <div className="text-stone-700 text-[10px] mt-1.5 tracking-wide">{adv.metricLabel}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-stone-200 font-medium text-[16px] mb-3.5 leading-snug group-hover:text-stone-100 transition-colors duration-300">
                      {adv.title}
                    </h3>
                    <p className="text-stone-600 text-[13px] leading-[1.75]">{adv.description}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Full-width callout — Palantir/Apple style */}
        <AnimatedSection delay={0.5}>
          <div className="relative border border-stone-800/40 overflow-hidden bg-void/60 mt-8">
            {/* Left gold accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold-500 via-gold-500/35 to-transparent" />

            {/* Subtle grid */}
            <div className="absolute inset-0 grid-bg-fine opacity-30 pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 px-12 lg:px-18 py-14">
              <div className="max-w-lg">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                  <span className="text-[9px] font-bold tracking-[0.38em] uppercase text-gold-500/70">Enterprise-Grade Infrastructure</span>
                </div>
                <h3 className="font-display text-[1.85rem] lg:text-[2.25rem] font-medium text-stone-100 leading-tight mb-4">
                  Not software you configure.{' '}
                  <span className="italic font-light text-stone-500">Systems we engineer.</span>
                </h3>
                <p className="text-stone-600 text-[13px] leading-[1.8]">
                  Every MEHANS deployment is a bespoke engineering project. We design, build, test, and maintain AI systems that are wired precisely into how your business operates.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-10 flex-shrink-0">
                {[
                  { n: '6 Wks',  l: 'Avg. Deployment' },
                  { n: '99.9%', l: 'System Uptime'    },
                  { n: 'Zero',  l: 'Template Code'    },
                  { n: 'Full',  l: 'CRM Sync'         },
                ].map((m) => (
                  <div key={m.l} className="text-center group">
                    <div className="font-display text-[1.75rem] font-medium text-gold-500 leading-none mb-2 group-hover:text-gold-400 transition-colors duration-300">
                      {m.n}
                    </div>
                    <div className="text-stone-700 text-[10px] tracking-[0.15em] uppercase">{m.l}</div>
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
