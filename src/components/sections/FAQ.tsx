import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { faqs } from '../../data';
import { AnimatedSection } from '../ui/AnimatedSection';

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 lg:py-36 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24">

          {/* Left: sticky panel */}
          <div className="lg:sticky lg:top-28 self-start">
            <AnimatedSection delay={0}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-px bg-gold-500" />
                <span className="section-label">FAQ</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h2 className="section-title mb-6" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
                Common Questions,{' '}
                <span className="italic font-light text-stone-500">Direct Answers.</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.14}>
              <p className="text-stone-600 text-[13px] leading-[1.75] mb-10">
                Everything you need to know about implementing AI automation in your real estate business — answered without jargon.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.22}>
              <div className="border border-stone-800/50 p-7">
                <div className="rule-gold mb-5" />
                <div className="text-[9px] font-bold tracking-[0.32em] uppercase text-stone-700 mb-4">
                  Have a specific question?
                </div>
                <p className="text-stone-600 text-[13px] mb-5 leading-relaxed">
                  Speak directly with a MEHANS AI engineer. Free, no pitch.
                </p>
                <div className="flex flex-col gap-2.5">
                  <a href="mailto:hello@mehans.space" className="text-gold-500 hover:text-gold-400 text-[13px] font-medium transition-colors duration-200">
                    hello@mehans.space
                  </a>
                  <a href="tel:+212710891662" className="text-stone-600 hover:text-stone-400 text-[13px] transition-colors duration-200">
                    +212 710 891 662
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right: accordion */}
          <div className="flex flex-col divide-y divide-stone-800/30">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.06}>
                <div className="group">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-start justify-between gap-6 py-7 text-left"
                  >
                    <span className={`font-medium text-[14px] md:text-[15px] leading-snug transition-colors duration-250 ${open === i ? 'text-gold-500' : 'text-stone-400 group-hover:text-stone-200'}`}>
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 w-7 h-7 border flex items-center justify-center transition-all duration-300 mt-0.5 ${open === i ? 'border-gold-500/40 bg-gold-500/8 rotate-45' : 'border-stone-800 group-hover:border-stone-700'}`}>
                      <Plus size={12} strokeWidth={1.5} className={`transition-colors duration-250 ${open === i ? 'text-gold-500' : 'text-stone-700 group-hover:text-stone-500'}`} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-7 text-stone-500 text-[13px] leading-[1.75] max-w-xl">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
