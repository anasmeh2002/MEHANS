import { motion } from 'framer-motion';
import {
  Magnet, Filter, Database, MessageSquare, Phone, Mail,
  TrendingUp, Calendar, GitBranch, FileText, BarChart3, Bot,
} from 'lucide-react';
import { services } from '../../data';
import { AnimatedSection } from '../ui/AnimatedSection';

const iconMap = {
  Magnet, Filter, Database, MessageSquare, Phone, Mail,
  TrendingUp, Calendar, GitBranch, FileText, BarChart3, Bot,
};

export function Services() {
  return (
    <section id="services" className="py-36 lg:py-44 bg-stone-950 relative overflow-hidden">
      {/* Circuit pattern */}
      <div className="absolute inset-0 circuit-bg opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 lg:mb-24">
          <div>
            <AnimatedSection delay={0}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-gold-500" />
                <span className="section-label">What We Build</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h2 className="section-title" style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.75rem)' }}>
                Twelve AI Systems.<br />
                <span className="italic font-light text-stone-500">Every Revenue Gap Closed.</span>
              </h2>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.12}>
            <p className="text-stone-500 text-sm leading-[1.8] max-w-sm lg:text-right">
              Purpose-built automation for every stage of the real estate pipeline — so no lead is lost, no follow-up is missed, and no deal is left on the table.
            </p>
          </AnimatedSection>
        </div>

        {/* Service grid - premium cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-stone-800/20">
          {services.map((svc, i) => {
            const Icon = iconMap[svc.icon as keyof typeof iconMap];
            return (
              <AnimatedSection key={svc.title} delay={i * 0.04}>
                <motion.div
                  whileHover={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    y: -4
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative bg-stone-950 px-6 py-8 md:px-8 md:py-10 h-full flex flex-col gap-5 md:gap-6 cursor-default
                    border border-stone-800/50 hover:border-gold-500/25 transition-all duration-500 relative overflow-hidden"
                >
                  {/* Corner accent on hover */}
                  <div className="absolute top-0 left-0 w-12 h-px bg-gold-500/0 group-hover:bg-gold-500/60 transition-all duration-400" />
                  <div className="absolute top-0 left-0 w-px h-12 bg-gold-500/0 group-hover:bg-gold-500/60 transition-all duration-400" />

                  {/* Number + tag row */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold tracking-[0.18em] text-stone-600">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-stone-700 group-hover:text-stone-500 transition-colors duration-300">
                      {svc.tag}
                    </span>
                  </div>

                  {/* Icon - larger on mobile */}
                  <div className="w-12 h-12 md:w-12 md:h-12 border border-stone-700/60 group-hover:border-gold-500/35 flex items-center justify-center transition-all duration-500 rounded-sm">
                    {Icon && (
                      <Icon
                        size={20}
                        strokeWidth={1.5}
                        className="md:hidden text-stone-500 group-hover:text-gold-500 transition-colors duration-500"
                      />
                    )}
                    {Icon && (
                      <Icon
                        size={18}
                        strokeWidth={1.5}
                        className="hidden md:block text-stone-500 group-hover:text-gold-500 transition-colors duration-500"
                      />
                    )}
                  </div>

                  {/* Title + description */}
                  <div className="flex flex-col gap-3 flex-1">
                    <h3 className="text-stone-200 font-medium text-[15px] leading-snug group-hover:text-stone-100 transition-colors duration-300">
                      {svc.title}
                    </h3>
                    <p className="text-stone-500 text-[12px] leading-[1.75] font-light group-hover:text-stone-400 transition-colors duration-400">
                      {svc.description}
                    </p>
                  </div>

                  {/* Gold line reveal */}
                  <div className="h-px bg-stone-800/50 group-hover:bg-gradient-to-r group-hover:from-gold-500/40 group-hover:to-transparent transition-all duration-500 w-full" />
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Bottom note */}
        <AnimatedSection delay={0.45}>
          <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-10 border-t border-stone-800/30">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              <p className="text-stone-500 text-[13px]">
                All systems are custom-engineered for your agency — dedicated support, zero templates.
              </p>
            </div>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-gold-500/80 hover:text-gold-500 text-[13px] font-medium tracking-wide flex items-center gap-2 group transition-colors duration-300 flex-shrink-0"
            >
              Discuss your automation needs →
              <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
