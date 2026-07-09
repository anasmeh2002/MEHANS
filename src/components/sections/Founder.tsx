import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';
import { AnimatedSection } from '../ui/AnimatedSection';

export function Founder() {
  const { t } = useLanguage();

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-stone-950 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900/30 to-stone-950" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Portrait Column */}
            <div className="flex justify-center lg:justify-end order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                {/* Gold border container */}
                <div className="relative p-1 rounded-2xl border border-gold-500/30 bg-gradient-to-br from-gold-500/10 via-transparent to-gold-500/5">
                  <img
                    src="/assets/images/founder/WhatsApp_Image_2026-07-09_at_20.33.56.jpeg"
                    alt={t.founder.imageAlt}
                    className="w-72 h-80 lg:w-80 lg:h-96 object-cover rounded-xl"
                  />
                  {/* Subtle corner accent */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-gold-500/50 rounded-tr-lg" />
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-gold-500/50 rounded-bl-lg" />
                </div>
              </motion.div>
            </div>

            {/* Copy Column */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-xs font-semibold tracking-[0.2em] text-gold-500 uppercase mb-4"
              >
                {t.founder.eyebrow}
              </motion.p>

              {/* Name */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl lg:text-5xl font-light text-white mb-2"
              >
                {t.founder.name}
              </motion.h2>

              {/* Role */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-lg text-gold-500 font-medium mb-8"
              >
                {t.founder.role}
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-stone-300 leading-relaxed mb-8"
              >
                {t.founder.description}
              </motion.p>

              {/* Signature */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-stone-400 italic mb-10"
              >
                — {t.founder.signature}
              </motion.p>

              {/* CTA */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -2 }}
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-stone-950 font-semibold rounded-lg transition-all duration-300 hover:bg-gold-400 shadow-lg shadow-gold-500/20"
              >
                {t.founder.cta}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
