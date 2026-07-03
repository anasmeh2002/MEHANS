import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MessageCircle } from 'lucide-react';
import { faqs } from '../../data';
import { AnimatedSection } from '../ui/AnimatedSection';

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 lg:py-40 bg-charcoal relative overflow-hidden">
      {/* Fine grid */}
      <div className="absolute inset-0 grid-bg-fine opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-18 lg:gap-28">

          {/* Left: sticky panel */}
          <div className="lg:sticky lg:top-32 self-start">
            <AnimatedSection delay={0}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-gold-500" />
                <span className="section-label">FAQ</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h2 className="section-title mb-7" style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.75rem)' }}>
                Common Questions,{' '}
                <span className="italic font-light text-stone-500">Direct Answers.</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.14}>
              <p className="text-stone-500 text-[13px] leading-[1.85] mb-12">
                Everything you need to know about implementing AI automation in your real estate business — answered without jargon.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.22}>
              <div className="border border-stone-800/45 p-8 relative overflow-hidden">
                {/* Gold accent */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-gold-500/40 via-gold-500/15 to-transparent" />

                <div className="h-px w-12 bg-gold-500/50 mb-6" />

                <div className="text-[9px] font-bold tracking-[0.35em] uppercase text-stone-700 mb-5">
                  Have a specific question?
                </div>
                <p className="text-stone-500 text-[13px] mb-6 leading-[1.75]">
                  Speak directly with a MEHANS AI engineer. Free, no pitch.
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="mailto:hello@mehans.space"
                    className="text-gold-500 hover:text-gold-400 text-[13px] font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    <MessageCircle size={12} />
                    hello@mehans.space
                  </a>
                  <a
                    href="tel:+212710891662"
                    className="text-stone-600 hover:text-stone-400 text-[13px] transition-colors duration-200"
                  >
                    +212 710 891 662
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right: accordion */}
          <div className="flex flex-col divide-y divide-stone-800/25">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.06}>
                <div className="group">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-start justify-between gap-4 md:gap-8 py-7 md:py-9 text-left min-h-[56px] md:min-h-0"
                    aria-expanded={open === i}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span className={`font-medium text-[15px] md:text-[16px] leading-snug transition-colors duration-300 ${
                      open === i ? 'text-gold-500' : 'text-stone-300 group-hover:text-stone-100'
                    }`}>
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 w-10 h-10 md:w-8 md:h-8 border flex items-center justify-center transition-all duration-350 mt-0.5 ${
                      open === i
                        ? 'border-gold-500/40 bg-gold-500/8 rotate-45'
                        : 'border-stone-700/60 group-hover:border-stone-600'
                    }`}>
                      <Plus size={16} strokeWidth={1.5} className={`md:hidden transition-colors duration-300 ${
                        open === i ? 'text-gold-500' : 'text-stone-600 group-hover:text-stone-400'
                      }`} />
                      <Plus size={13} strokeWidth={1.5} className={`hidden md:block transition-colors duration-300 ${
                        open === i ? 'text-gold-500' : 'text-stone-600 group-hover:text-stone-400'
                      }`} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {open === i && (
                      <motion.div
                        id={`faq-answer-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                        role="region"
                        aria-labelledby={`faq-question-${i}`}
                      >
                        <p className="pb-7 md:pb-9 text-stone-500 text-[13px] md:text-[13px] leading-[1.85] max-w-xl">
                          {faq.answer}
                        </p>
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
