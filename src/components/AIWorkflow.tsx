import { useRef, memo } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const steps = [
  {
    id: 1,
    label: 'Lead Arrives',
    description: 'A prospect submits a form, sends a message, or clicks an ad.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    id: 2,
    label: 'AI Understands',
    description: 'Natural language processing identifies intent, urgency, and context in under 2 seconds.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    id: 3,
    label: 'Qualification',
    description: 'Budget, authority, need, and timeline scored automatically against your criteria.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 4,
    label: 'Instant Response',
    description: 'Personalised reply sent within 60 seconds — while your competitors are still sleeping.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    id: 5,
    label: 'Meeting Booked',
    description: 'Calendar synced, invite sent, confirmation delivered — zero friction.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    id: 6,
    label: 'Team Notified',
    description: 'Your sales rep receives a briefing — context, score, and talking points — before the call.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    ),
  },
  {
    id: 7,
    label: 'Deal Closed',
    description: 'Automated follow-ups nurture the prospect until they\'re ready to sign.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
      </svg>
    ),
  },
];

const WorkflowStep = memo(({ step, index, isLast }: { step: typeof steps[0]; index: number; isLast: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-10">
      {/* Connector line */}
      {!isLast && (
        <div className="absolute left-5 top-14 w-px h-full" aria-hidden="true">
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full"
            style={{
              background: 'linear-gradient(to bottom, rgba(212,175,55,0.6), rgba(212,175,55,0.1))',
            }}
          />
          {/* Animated dot travelling down */}
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={inView ? { y: ['0%', '100%'], opacity: [0, 1, 1, 0] } : {}}
            transition={{ duration: 2, delay: 0.6, ease: 'linear', repeat: Infinity, repeatDelay: 1 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-[0_0_6px_rgba(212,175,55,0.8)]"
          />
        </div>
      )}

      {/* Icon column */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.05, type: 'spring', stiffness: 200 }}
        className="relative z-10 flex-shrink-0"
      >
        <div className="w-10 h-10 rounded-full glass gold-border flex items-center justify-center text-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.1)]">
          {step.icon}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.05 + 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="pb-14"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[10px] text-[#5a5a5a] tabular-nums font-mono">
            {String(step.id).padStart(2, '0')}
          </span>
          <h3 className="text-base font-semibold text-white">{step.label}</h3>
        </div>
        <p className="text-sm text-[#a0a0a0] leading-relaxed max-w-xs">{step.description}</p>
      </motion.div>
    </div>
  );
});

export function AIWorkflow() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id="workflow"
      ref={sectionRef}
      className="relative py-32 bg-[#050505] overflow-hidden"
      aria-labelledby="workflow-heading"
    >
      {/* Subtle background glow */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-[rgba(212,175,55,0.03)] blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-[rgba(212,175,55,0.03)] blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left — heading */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full glass gold-border"
            >
              <span className="text-[10px] text-[#d4af37] tracking-widest uppercase font-medium">
                The Platform
              </span>
            </motion.div>

            <motion.h2
              id="workflow-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold leading-tight mb-6"
            >
              From first touch
              <br />
              <span className="text-gold-gradient">to closed deal.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[#a0a0a0] text-base leading-relaxed max-w-sm"
            >
              Every step automated. Every prospect qualified. Every meeting confirmed —
              while your team focuses on closing.
            </motion.p>

            {/* Mini metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 grid grid-cols-2 gap-4"
            >
              {[
                { v: '< 60s', l: 'First response' },
                { v: '24/7', l: 'Active coverage' },
                { v: '3x', l: 'More meetings' },
                { v: '0', l: 'Missed leads' },
              ].map((m) => (
                <div key={m.l} className="glass gold-border rounded-xl p-4">
                  <div className="text-xl font-bold text-gold-gradient mb-0.5">{m.v}</div>
                  <div className="text-xs text-[#5a5a5a] uppercase tracking-wide">{m.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — steps */}
          <div className="relative">
            {steps.map((step, i) => (
              <WorkflowStep
                key={step.id}
                step={step}
                index={i}
                isLast={i === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
