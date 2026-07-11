import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';

export function Founder() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [-18, 18]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="founder"
      ref={sectionRef}
      className="py-32 lg:py-44 bg-stone-950 relative overflow-hidden"
      aria-labelledby="founder-name"
    >
      {/* Ambient gold gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900/20 to-stone-950 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-gold-500/[0.025] blur-[120px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end order-2 lg:order-1"
          >
            <div className="relative">
              {/* Outer glow */}
              <div
                className="absolute -inset-4 rounded-2xl opacity-25 blur-2xl"
                style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.5), transparent 70%)' }}
                aria-hidden="true"
              />

              <motion.div style={{ y: imgY }} className="relative">
                {/* Gold frame */}
                <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-gold-500/40 via-gold-500/10 to-gold-500/30">
                  {/* Portrait image */}
                  <div className="relative overflow-hidden rounded-2xl w-[320px] h-[420px] lg:w-[360px] lg:h-[470px]">
                    <img
                      src="/images/founder/WhatsApp_Image_2026-07-11_at_15.25.04.jpeg"
                      alt={t.founder.imageAlt}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                    {/* Soft gradient overlay at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />

                    {/* Name badge on portrait */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 glass-dark border-t border-gold-500/15">
                      <p className="text-white font-semibold tracking-wide text-base leading-tight">
                        {t.founder.name}
                      </p>
                      <p className="text-gold-500 text-xs font-medium tracking-[0.15em] uppercase mt-1">
                        {t.founder.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Corner accent — top right */}
                <div className="absolute -top-2 -right-2 w-7 h-7 border-t-2 border-r-2 border-gold-500/60 rounded-tr-xl" aria-hidden="true" />
                {/* Corner accent — bottom left */}
                <div className="absolute -bottom-2 -left-2 w-7 h-7 border-b-2 border-l-2 border-gold-500/60 rounded-bl-xl" aria-hidden="true" />
              </motion.div>
            </div>
          </motion.div>

          {/* Copy */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold-500 mb-5"
            >
              {t.founder.eyebrow}
            </motion.p>

            <motion.h2
              id="founder-name"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-light text-stone-100 leading-[1.08] mb-2"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}
            >
              {t.founder.name}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.14 }}
              className="text-gold-500 font-medium text-base tracking-wide mb-10"
            >
              {t.founder.role}
            </motion.p>

            {/* Single premium paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-stone-400 leading-[1.85] mb-10 max-w-md mx-auto lg:mx-0"
              style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.0625rem)' }}
            >
              {t.founder.description}
            </motion.p>

            {/* Signature quote */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="text-stone-600 italic text-sm mb-12 border-l-2 border-gold-500/30 pl-4 text-left max-w-xs mx-auto lg:mx-0"
            >
              — {t.founder.signature}
            </motion.p>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.34 }}
              whileHover={{ y: -2, boxShadow: '0 8px 32px rgba(212,175,55,0.25)' }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToContact}
              className="btn-primary group"
            >
              {t.founder.cta}
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300 flip-rtl" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
