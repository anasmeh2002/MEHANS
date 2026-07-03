import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { AnimatedSection } from '../ui/AnimatedSection';

const items = [
  { value: 90,   suffix: 's',  prefix: '<', label: 'Lead Response Time',   sub: 'vs. 4–8 hour industry average' },
  { value: 80,   suffix: '%',  prefix: '',  label: 'Less Manual Work',      sub: 'Average reduction in 90 days'  },
  { value: 3,    suffix: 'x',  prefix: '',  label: 'Faster Lead Response',  sub: 'Conversion uplift from AI'     },
  { value: 99.9, suffix: '%',  prefix: '',  label: 'System Uptime',         sub: 'Enterprise SLA guaranteed'     },
];

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
      const eased = 1 - Math.pow(1 - p, 3);
      setN(parseFloat((eased * to).toFixed(to % 1 !== 0 ? 1 : 0)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);

  return <span ref={ref}>{prefix}{n}{suffix}</span>;
}

export function Statistics() {
  return (
    <section className="relative bg-charcoal border-y border-stone-800/30 overflow-hidden">
      {/* Accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/25 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x-0 lg:divide-x divide-stone-800/30">
          {items.map((item, i) => (
            <AnimatedSection key={item.label} delay={i * 0.08}>
              <div className="py-12 px-6 lg:px-10 text-center group cursor-default">
                <div className="font-display text-4xl md:text-5xl font-medium text-gold-500 mb-2 leading-none group-hover:scale-[1.03] transition-transform duration-400 origin-bottom inline-block">
                  <CountUp to={item.value} suffix={item.suffix} prefix={item.prefix} />
                </div>
                <div className="text-stone-200 text-sm font-medium mb-1">{item.label}</div>
                <div className="text-stone-700 text-[11px] leading-snug">{item.sub}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
