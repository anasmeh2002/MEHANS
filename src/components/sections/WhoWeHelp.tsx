import { motion } from 'framer-motion';
import { whoWeHelp } from '../../data';
import { AnimatedSection } from '../ui/AnimatedSection';

export function WhoWeHelp() {
  return (
    <section id="solutions" className="py-28 lg:py-36 bg-charcoal relative overflow-hidden">
      {/* Vertical rule left */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-500/12 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16 lg:mb-20 items-end">
          <div>
            <AnimatedSection delay={0}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-px bg-gold-500" />
                <span className="section-label">Who We Serve</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h2 className="section-title" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
                Built for Real Estate's{' '}
                <span className="italic font-light text-stone-500">Most Demanding</span>{' '}
                Operations.
              </h2>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.14}>
            <p className="section-subtitle">
              Whether you run a ten-person agency or a continental investment firm, MEHANS engineers AI infrastructure that scales to your operation.
            </p>
          </AnimatedSection>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-800/20">
          {whoWeHelp.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.07}>
              <motion.div
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                className="group bg-charcoal px-8 py-10 flex flex-col gap-6 cursor-default
                  border border-transparent hover:border-stone-700/30 transition-all duration-500 relative overflow-hidden h-full"
              >
                {/* Large background number */}
                <div
                  className="absolute top-4 right-6 font-display text-[80px] font-medium leading-none text-stone-800/30 pointer-events-none select-none group-hover:text-stone-800/50 transition-colors duration-500"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className="relative z-10 flex flex-col gap-5 flex-1">
                  {/* Stat chip */}
                  <span className="inline-flex self-start text-[9px] font-bold tracking-[0.28em] uppercase text-gold-500 border border-gold-500/20 px-3 py-1.5 group-hover:border-gold-500/40 transition-colors duration-300">
                    {item.stat}
                  </span>

                  <div className="flex-1">
                    <h3 className="text-stone-200 font-medium text-[17px] leading-snug mb-3 group-hover:text-stone-100 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-stone-600 text-[13px] leading-[1.7]">{item.description}</p>
                  </div>

                  {/* Expanding gold line */}
                  <div className="h-px bg-stone-800/50 overflow-hidden">
                    <div className="h-full bg-gold-500/50 w-0 group-hover:w-full transition-all duration-500 ease-out" />
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA banner */}
        <AnimatedSection delay={0.5}>
          <div className="mt-10 grid lg:grid-cols-2 gap-0 border border-stone-800/40">
            <div className="px-10 py-10 border-b lg:border-b-0 lg:border-r border-stone-800/40">
              <p className="text-stone-200 font-medium text-[17px] mb-2">
                Not sure where to start?
              </p>
              <p className="text-stone-600 text-[13px] leading-relaxed">
                Book a free 30-minute discovery call. We'll map your workflow and show you exactly where AI delivers the highest return.
              </p>
            </div>
            <div className="px-10 py-10 flex items-center">
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
