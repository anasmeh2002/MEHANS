import { motion } from 'framer-motion';
import { Building2, Building, Briefcase, TrendingUp, Crown, HardHat } from 'lucide-react';
import { whoWeHelp } from '../../data';
import { AnimatedSection } from '../ui/AnimatedSection';

const icons = [Building2, Building, Briefcase, TrendingUp, Crown, HardHat];

export function WhoWeHelp() {
  return (
    <section id="solutions" className="py-32 lg:py-40 bg-charcoal relative overflow-hidden">
      {/* Vertical rule left */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-500/15 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold-500/[0.015] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div className="grid lg:grid-cols-2 gap-10 mb-18 lg:mb-22 items-end">
          <div>
            <AnimatedSection delay={0}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-gold-500" />
                <span className="section-label">Who We Serve</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h2 className="section-title" style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.75rem)' }}>
                Built for Real Estate's{' '}
                <span className="italic font-light text-stone-500">Most Demanding</span>{' '}
                Operations.
              </h2>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.14}>
            <p className="section-subtitle leading-[1.85]">
              Whether you run a ten-person agency or a continental investment firm, MEHANS engineers AI infrastructure that scales to your operation.
            </p>
          </AnimatedSection>
        </div>

        {/* Premium cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-800/15">
          {whoWeHelp.map((item, i) => {
            const Icon = icons[i];
            return (
              <AnimatedSection key={item.title} delay={i * 0.07}>
                <motion.div
                  whileHover={{
                    backgroundColor: 'rgba(255,255,255,0.025)',
                    y: -4
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="group bg-charcoal px-9 py-11 flex flex-col gap-6 cursor-default
                    border border-transparent hover:border-gold-500/12 transition-all duration-500 relative overflow-hidden h-full"
                >
                  {/* Large background number */}
                  <div
                    className="absolute top-4 right-7 font-display text-[90px] font-medium leading-none text-stone-800/25 pointer-events-none select-none group-hover:text-stone-800/40 transition-colors duration-500"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 left-0 w-12 h-px bg-gold-500/0 group-hover:bg-gold-500/40 transition-all duration-400" />
                  <div className="absolute top-0 left-0 w-px h-12 bg-gold-500/0 group-hover:bg-gold-500/40 transition-all duration-400" />

                  <div className="relative z-10 flex flex-col gap-5 flex-1">
                    {/* Icon and stat */}
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 border border-stone-700/60 group-hover:border-gold-500/30 flex items-center justify-center transition-all duration-400">
                        <Icon size={18} strokeWidth={1.5} className="text-stone-700 group-hover:text-gold-500 transition-colors duration-400" />
                      </div>
                      <span className="inline-flex self-start text-[9px] font-bold tracking-[0.3em] uppercase text-gold-500 border border-gold-500/15 px-3 py-1.5 group-hover:border-gold-500/35 transition-colors duration-300">
                        {item.stat}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-stone-200 font-medium text-[17px] leading-snug mb-3.5 group-hover:text-stone-100 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-stone-600 text-[13px] leading-[1.75]">{item.description}</p>
                    </div>

                    {/* Expanding gold line */}
                    <div className="h-px bg-stone-800/50 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-gold-500/60 to-gold-500/10 w-0 group-hover:w-full transition-all duration-600 ease-out" />
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* CTA banner */}
        <AnimatedSection delay={0.55}>
          <div className="mt-12 grid lg:grid-cols-2 gap-0 border border-stone-800/35 relative overflow-hidden">
            {/* Gold accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold-500 via-gold-500/30 to-transparent" />

            <div className="px-11 py-10 border-b lg:border-b-0 lg:border-r border-stone-800/35 relative z-10">
              <p className="text-stone-200 font-medium text-[17px] mb-2.5">
                Not sure where to start?
              </p>
              <p className="text-stone-600 text-[13px] leading-[1.75]">
                Book a free 30-minute discovery call. We'll map your workflow and show you exactly where AI delivers the highest return.
              </p>
            </div>
            <div className="px-11 py-10 flex items-center relative z-10">
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary group"
              >
                Book Discovery Call
                <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">→</span>
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
