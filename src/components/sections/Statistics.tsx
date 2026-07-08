import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ThumbsUp, TrendingDown, Clock, Rocket } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { AnimatedSection } from '../ui/AnimatedSection';

const icons = [ThumbsUp, TrendingDown, Clock, Rocket];

function CountUp({ to, suffix, prefix }: { to: number; suffix: string; prefix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setN(parseFloat((eased * to).toFixed(to % 1 !== 0 ? 1 : 0)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);

  return <span ref={ref}>{prefix}{n}{suffix}</span>;
}

export function Statistics() {
  const { t } = useLanguage();

  const items = [
    { value: 98, suffix: '%', prefix: '', label: t.stats.satisfaction, icon: icons[0] },
    { value: 80, suffix: '%', prefix: '', label: t.stats.reduction, icon: icons[1] },
    { value: 24, suffix: '/7', prefix: '', label: t.stats.availability, icon: icons[2] },
    { value: 2, suffix: '', prefix: '≤ ', label: t.stats.deployment, icon: icons[3] },
  ];

  return (
    <section className="relative bg-stone-900/50 border-y border-stone-700/30 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/25 to-transparent" />
      <div className="absolute inset-0 circuit-bg opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x-0 lg:divide-x divide-stone-700/30">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <AnimatedSection key={item.label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25 }}
                  className="py-10 md:py-14 lg:py-16 px-4 md:px-6 lg:px-10 text-center group cursor-default relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-gold-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="w-11 h-11 border border-stone-700/60 group-hover:border-gold-500/35 mx-auto flex items-center justify-center mb-4 md:mb-5 transition-colors duration-400 rounded-sm">
                      <Icon size={20} strokeWidth={1.5} className="md:hidden text-stone-500 group-hover:text-gold-500 transition-colors duration-400" />
                      <Icon size={18} strokeWidth={1.5} className="hidden md:block text-stone-500 group-hover:text-gold-500 transition-colors duration-400" />
                    </div>

                    <div className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-gold-500 mb-2 leading-none group-hover:scale-[1.02] transition-transform duration-400 origin-bottom inline-block">
                      <CountUp to={item.value} suffix={item.suffix} prefix={item.prefix} />
                    </div>

                    <div className="text-stone-300 text-[12px] md:text-[13px] font-medium">{item.label}</div>
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
