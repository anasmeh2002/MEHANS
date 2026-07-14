import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, Zap, Infinity, HeadphonesIcon } from 'lucide-react';
import { AnimatedSection } from '../ui/AnimatedSection';
import { useLanguage } from '../../i18n';

interface Metric {
  value: string;
  valueSmall?: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
}

function StatCard({ metric, index }: { metric: Metric; index: number }) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true });
  const Icon = metric.icon;

  const isDeployment = metric.valueSmall !== undefined;

  return (
    <AnimatedSection delay={index * 0.1}>
      <motion.div
        ref={ref}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="stats-card group relative flex flex-col items-center text-center px-6 py-10 md:py-12 cursor-default"
      >
        {/* Glass background */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-800/10 to-stone-900/20 backdrop-blur-sm" />
        {/* Gold border — softens on default, glows on hover */}
        <div className="absolute inset-0 border border-stone-700/35 group-hover:border-gold-500/35 transition-colors duration-400 rounded-sm" />
        {/* Top gold line accent */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent group-hover:via-gold-500/50 transition-all duration-500" />
        {/* Hover inner glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-sm"
          style={{ boxShadow: 'inset 0 0 40px rgba(201,168,76,0.04), 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,168,76,0.15)' }}
        />

        <div className="relative z-10 flex flex-col items-center">
          {/* Icon */}
          <div className="w-10 h-10 flex items-center justify-center border border-stone-700/50 group-hover:border-gold-500/30 mb-5 transition-colors duration-400 rounded-sm flex-shrink-0">
            <Icon
              size={17}
              strokeWidth={1.4}
              className="text-stone-500 group-hover:text-gold-500 transition-colors duration-400"
            />
          </div>

          {/* Primary value */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-1"
          >
            {isDeployment ? (
              <div className="flex flex-col items-center gap-0.5">
                <span className="font-display text-[11px] font-normal tracking-[0.22em] uppercase text-stone-500 leading-none">
                  {metric.valueSmall}
                </span>
                <span className="font-display text-4xl md:text-5xl font-medium text-gold-500 leading-none tracking-tight">
                  {metric.value}
                </span>
              </div>
            ) : (
              <span className="font-display text-4xl md:text-5xl font-medium text-gold-500 leading-none tracking-tight">
                {metric.value}
              </span>
            )}
          </motion.div>

          {/* Label */}
          <p className="text-stone-200 text-[13px] font-semibold tracking-wide mb-2 mt-2">
            {metric.label}
          </p>

          {/* Sublabel */}
          <p className="text-stone-500 text-[12px] leading-relaxed max-w-[160px]">
            {metric.sublabel}
          </p>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

export function Statistics() {
  const { t } = useLanguage();

  const metrics: Metric[] = [
    {
      value: '24/7',
      label: t.stats.availability,
      sublabel: t.stats.availabilityDesc,
      icon: Clock,
    },
    {
      value: t.stats.deploymentValue,
      valueSmall: t.stats.deploymentLabel,
      label: t.stats.deployment,
      sublabel: t.stats.deploymentDesc,
      icon: Zap,
    },
    {
      value: '∞',
      label: t.stats.workflow,
      sublabel: t.stats.workflowDesc,
      icon: Infinity,
    },
    {
      value: t.stats.enterpriseValue,
      label: t.stats.enterprise,
      sublabel: t.stats.enterpriseDesc,
      icon: HeadphonesIcon,
    },
  ];

  return (
    <section className="relative bg-[#080808] overflow-hidden">
      {/* Top separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

      {/* Circuit texture */}
      <div className="absolute inset-0 circuit-bg opacity-20 pointer-events-none" />

      {/* Soft ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.03) 0%, transparent 65%)',
        }}
      />

      {/* Cards grid */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-16 md:pt-20 pb-16 md:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {metrics.map((metric, i) => (
            <StatCard key={metric.label} metric={metric} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-stone-700/40 to-transparent" />
    </section>
  );
}

/* ─── Inline CTA below statistics ─────────────────────────────── */
export function StatsCTA() {
  const { t } = useLanguage();
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative bg-[#080808] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 70% at 50% 60%, rgba(201,168,76,0.035) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-3xl mx-auto px-6 lg:px-10 py-20 md:py-24 text-center">
        <AnimatedSection delay={0}>
          <p className="text-[8.5px] font-bold tracking-[0.38em] uppercase text-gold-500 mb-5">
            {t.labels.getStarted}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-stone-50 leading-tight mb-4">
            {t.cta.headline1}{' '}
            <span className="italic font-light text-stone-500">{t.cta.headline2}</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <p className="text-stone-400 text-[15px] md:text-base leading-relaxed max-w-xl mx-auto mb-10">
            {t.cta.description}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.22}>
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 40px rgba(201,168,76,0.35)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gold-500 text-[#080808] text-[13px] font-semibold tracking-[0.08em] uppercase border border-gold-500 transition-colors duration-300 relative overflow-hidden group min-h-[48px]"
          >
            {/* Shimmer on hover */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full"
              whileHover={{ translateX: '200%' }}
              transition={{ duration: 0.65, ease: 'easeInOut' }}
              aria-hidden="true"
            />
            <span className="relative">{t.cta.cta}</span>
          </motion.button>
        </AnimatedSection>

        {/* Trust badges */}
        <AnimatedSection delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-12">
            {[
              { key: 'security', label: t.trust.security },
              { key: 'gdpr', label: t.trust.gdpr },
              { key: 'encryption', label: t.trust.encryption },
              { key: 'monitoring', label: t.trust.monitoring },
              { key: 'cloud', label: t.trust.cloud },
            ].map((badge) => (
              <div
                key={badge.key}
                className="flex items-center gap-2 text-stone-600 text-[11px] tracking-wide"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gold-500/70 flex-shrink-0">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {badge.label}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-stone-700/40 to-transparent" />
    </section>
  );
}
