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
    <section id="services" className="py-28 lg:py-36 bg-void relative overflow-hidden">
      {/* Fine grid */}
      <div className="absolute inset-0 grid-bg-fine opacity-[0.6] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-20">
          <div>
            <AnimatedSection delay={0}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-px bg-gold-500" />
                <span className="section-label">What We Build</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h2 className="section-title" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
                Twelve AI Systems.<br />
                <span className="italic font-light text-stone-500">One Unified Platform.</span>
              </h2>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.12}>
            <p className="text-stone-600 text-sm leading-relaxed max-w-sm lg:text-right">
              Purpose-built automation for every layer of the real estate sales and operations pipeline — from first lead to closed deal.
            </p>
          </AnimatedSection>
        </div>

        {/* Service grid — 4 col desktop, numbered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-stone-800/20">
          {services.map((svc, i) => {
            const Icon = iconMap[svc.icon as keyof typeof iconMap];
            return (
              <AnimatedSection key={svc.title} delay={i * 0.035}>
                <motion.div
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.018)' }}
                  className="group relative bg-void px-7 py-8 h-full flex flex-col gap-6 cursor-default
                    border border-transparent hover:border-stone-700/40 transition-all duration-500"
                >
                  {/* Number + tag row */}
                  <div className="flex items-center justify-between">
                    <span className="num-label">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[9px] font-bold tracking-[0.28em] uppercase text-stone-800 group-hover:text-stone-600 transition-colors duration-300">
                      {svc.tag}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-10 h-10 border border-stone-800 group-hover:border-stone-700 flex items-center justify-center transition-colors duration-500">
                    {Icon && (
                      <Icon
                        size={16}
                        strokeWidth={1.5}
                        className="text-stone-700 group-hover:text-gold-500 transition-colors duration-500"
                      />
                    )}
                  </div>

                  {/* Title + description */}
                  <div className="flex flex-col gap-2.5 flex-1">
                    <h3 className="text-stone-300 font-medium text-[14px] leading-snug group-hover:text-stone-100 transition-colors duration-300">
                      {svc.title}
                    </h3>
                    <p className="text-stone-700 text-[12px] leading-[1.65] font-light group-hover:text-stone-600 transition-colors duration-400">
                      {svc.description}
                    </p>
                  </div>

                  {/* Gold line reveal */}
                  <div className="h-px bg-transparent group-hover:bg-gold-500/20 transition-all duration-500 w-full" />
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Bottom note */}
        <AnimatedSection delay={0.4}>
          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-stone-800/30">
            <p className="text-stone-700 text-[12px]">
              All systems are custom-built — no templates, no off-the-shelf packages.
            </p>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-gold-500/80 hover:text-gold-500 text-[12px] font-medium tracking-wide flex items-center gap-1.5 group transition-colors duration-300 flex-shrink-0"
            >
              Need a custom system?
              <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">→</span>
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
