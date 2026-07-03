import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, TrendingDown, Zap, Shield } from 'lucide-react';
import { AnimatedSection } from '../ui/AnimatedSection';

const items = [
  { value: 90, suffix: 's', prefix: '<', label: 'Lead Response Time', sub: 'vs. 4–8 hour industry average', icon: Clock },
  { value: 80, suffix: '%', prefix: '', label: 'Less Manual Work', sub: 'Average reduction in 90 days', icon: TrendingDown },
  { value: 3, suffix: 'x', prefix: '', label: 'Faster Lead Response', sub: 'Conversion uplift from AI', icon: Zap },
  { value: 99.9, suffix: '%', prefix: '', label: 'System Uptime', sub: 'Enterprise SLA guaranteed', icon: Shield },
];

function CountUp({ to, suffix, prefix }: { to: number; suffix: string; prefix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
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
  return (
    <section className="relative bg-charcoal border-y border-stone-800/25 overflow-hidden">
      {/* Accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/22 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/22 to-transparent" />

      {/* Circuit pattern */}
      <div className="absolute inset-0 circuit-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x-0 lg:divide-x divide-stone-800/25">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <AnimatedSection key={item.label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25 }}
                  className="py-14 px-8 lg:px-12 text-center group cursor-default relative overflow-hidden"
                >
                  {/* Subtle background glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-gold-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="w-11 h-11 border border-stone-800/60 group-hover:border-gold-500/25 mx-auto flex items-center justify-center mb-5 transition-colors duration-400">
                      <Icon size={18} strokeWidth={1.5} className="text-stone-700 group-hover:text-gold-500 transition-colors duration-400" />
                    </div>

                    <div className="font-display text-5xl md:text-6xl font-medium text-gold-500 mb-3 leading-none group-hover:scale-[1.03] transition-transform duration-400 origin-bottom inline-block">
                      <CountUp to={item.value} suffix={item.suffix} prefix={item.prefix} />
                    </div>

                    <div className="text-stone-200 text-sm font-medium mb-1.5">{item.label}</div>
                    <div className="text-stone-700 text-[11px] leading-snug">{item.sub}</div>
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
