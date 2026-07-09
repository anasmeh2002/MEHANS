import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { AnimatedSection } from '../ui/AnimatedSection';

export function Pricing() {
  const { t } = useLanguage();

  const plans = [
    {
      name: t.pricing.starterName,
      label: t.pricing.starterLabel,
      price: t.pricing.starterPrice,
      description: t.pricing.starterDesc,
      features: [
        t.pricing.starterFeature1,
        t.pricing.starterFeature2,
        t.pricing.starterFeature3,
      ],
      cta: t.pricing.starterCta,
      highlighted: false,
    },
    {
      name: t.pricing.growthName,
      label: t.pricing.growthLabel,
      price: t.pricing.growthPrice,
      description: t.pricing.growthDesc,
      features: [
        t.pricing.growthFeature1,
        t.pricing.growthFeature2,
        t.pricing.growthFeature3,
        t.pricing.growthFeature4,
      ],
      cta: t.pricing.growthCta,
      highlighted: true,
    },
    {
      name: t.pricing.customName,
      label: t.pricing.customLabel,
      price: t.pricing.customPrice,
      description: t.pricing.customDesc,
      features: [
        t.pricing.customFeature1,
        t.pricing.customFeature2,
        t.pricing.customFeature3,
      ],
      cta: t.pricing.customCta,
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-32 lg:py-40 bg-stone-950 relative overflow-hidden">
      {/* Fine grid */}
      <div className="absolute inset-0 grid-bg-fine opacity-50 pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-gold-500/[0.02] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <AnimatedSection delay={0}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-10 h-px bg-gold-500/70" />
              <span className="section-label">{t.pricing.eyebrow}</span>
              <div className="w-10 h-px bg-gold-500/70" />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.08}>
            <h2 className="section-title mb-6" style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.75rem)' }}>
              {t.pricing.headline}
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.14}>
            <p className="text-stone-400 text-[14px] md:text-[15px] max-w-2xl mx-auto leading-[1.85]">
              {t.pricing.description}
            </p>
          </AnimatedSection>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {plans.map((plan, i) => (
            <AnimatedSection key={plan.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={`relative h-full flex flex-col bg-stone-900/40 border rounded-sm overflow-hidden transition-all duration-500 ${
                  plan.highlighted
                    ? 'border-gold-500/40'
                    : 'border-stone-800/50 hover:border-stone-700/60'
                }`}
              >
                {/* Most Popular Badge */}
                {plan.highlighted && (
                  <div className="absolute top-0 left-0 right-0 flex justify-center pt-4">
                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-gold-500 bg-gold-500/10 px-4 py-1.5 rounded-sm">
                      {plan.label}
                    </span>
                  </div>
                )}

                <div className={`flex-1 flex flex-col p-8 ${plan.highlighted ? 'pt-12' : ''}`}>
                  {/* Plan Name */}
                  <div className="mb-4">
                    {!plan.highlighted && (
                      <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-stone-600 mb-2 block">
                        {plan.label}
                      </span>
                    )}
                    <h3 className="font-display text-[22px] font-medium text-stone-100">
                      {plan.name}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="font-display text-[26px] font-medium text-gold-500 leading-none">
                      {plan.price}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-stone-500 text-[13px] leading-[1.8] mb-8 flex-1">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="flex flex-col gap-3 mb-8">
                    {plan.features.map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-3">
                        <Check size={14} className="text-gold-500/60 flex-shrink-0 mt-0.5" strokeWidth={2} />
                        <span className="text-stone-400 text-[13px] leading-[1.5]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 text-[11px] font-semibold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 min-h-[48px] ${
                      plan.highlighted
                        ? 'btn-primary'
                        : 'border border-stone-700/60 text-stone-300 hover:border-gold-500/40 hover:text-gold-500 bg-transparent'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight size={12} className="flip-rtl" />
                  </button>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom Note */}
        <AnimatedSection delay={0.4}>
          <div className="text-center">
            <p className="text-stone-500 text-[13px] leading-[1.85] max-w-2xl mx-auto">
              {t.pricing.note}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
