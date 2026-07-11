import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FEATURES = [
  {
    title: 'Instant qualification',
    description: 'BANT-scored in seconds. Only genuine prospects reach your team.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: '24/7 coverage',
    description: 'Responds while your team sleeps. No lead left unanswered.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Calendar automation',
    description: 'Synced, confirmed, and briefed — without human involvement.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" />
      </svg>
    ),
  },
  {
    title: 'CRM integration',
    description: 'All data synced to HubSpot, Salesforce, or your existing stack.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
  },
  {
    title: 'Smart follow-ups',
    description: 'AI-written sequences that adapt to prospect behaviour.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    title: 'Full analytics',
    description: 'Track every lead, every touchpoint, every euro of pipeline.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
];

function FeatureCard({ feature, index }: { feature: typeof FEATURES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group p-6 rounded-2xl glass gold-border hover:border-[rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.06)] transition-all duration-300 cursor-default"
    >
      <div className="w-10 h-10 rounded-xl bg-[rgba(212,175,55,0.08)] border border-[rgba(212,175,55,0.15)] flex items-center justify-center text-[#d4af37] mb-5 group-hover:bg-[rgba(212,175,55,0.12)] transition-colors duration-300">
        {feature.icon}
      </div>
      <h3 className="text-sm font-semibold text-white mb-2">{feature.title}</h3>
      <p className="text-xs text-[#a0a0a0] leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

export function Results() {
  return (
    <section
      id="results"
      className="relative py-32 bg-[#050505]"
      aria-labelledby="results-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full glass gold-border"
          >
            <span className="text-[10px] text-[#d4af37] tracking-widest uppercase font-medium">
              Everything Included
            </span>
          </motion.div>
          <motion.h2
            id="results-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold mb-4"
          >
            The complete
            <br />
            <span className="text-gold-gradient">sales engine.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#a0a0a0] max-w-md mx-auto text-sm"
          >
            Every capability you need to turn cold traffic into closed deals — fully managed.
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>

        {/* Bottom strip — proof numbers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px border border-[rgba(212,175,55,0.08)] rounded-2xl overflow-hidden"
        >
          {[
            { value: '120+', label: 'Clients' },
            { value: '€12M+', label: 'Pipeline generated' },
            { value: '94%', label: 'Qualification rate' },
            { value: '4.8★', label: 'Client satisfaction' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass py-8 px-6 text-center hover:bg-[rgba(212,175,55,0.02)] transition-colors"
            >
              <div className="text-3xl font-bold text-gold-gradient mb-1">{stat.value}</div>
              <div className="text-xs text-[#5a5a5a] uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
