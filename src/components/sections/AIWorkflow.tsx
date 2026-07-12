import { useRef, memo } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useLanguage } from '../../i18n';

const ICONS = [
  (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5" aria-hidden="true" key="1"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>),
  (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5" aria-hidden="true" key="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>),
  (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5" aria-hidden="true" key="3"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>),
  (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5" aria-hidden="true" key="4"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>),
  (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5" aria-hidden="true" key="5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>),
  (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5" aria-hidden="true" key="6"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>),
  (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5" aria-hidden="true" key="7"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" /></svg>),
];

const Step = memo(({ id, title, desc, icon, index, isLast }: { id: string; title: string; desc: string; icon: React.ReactNode; index: number; isLast: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-8">
      {/* Connector line + travelling dot */}
      {!isLast && (
        <div className="absolute left-5 top-12 w-px" style={{ bottom: 0 }} aria-hidden="true">
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-gradient-to-b from-gold-500/60 to-gold-500/10"
          />
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={inView ? { y: ['0%', '100%'], opacity: [0, 0.9, 0.9, 0] } : {}}
            transition={{ duration: 2.2, delay: 0.6, ease: 'linear', repeat: Infinity, repeatDelay: 1.2 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gold-400"
            style={{ boxShadow: '0 0 8px rgba(201,168,76,0.8)' }}
          />
        </div>
      )}

      {/* Icon node */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.04, type: 'spring', stiffness: 220, damping: 20 }}
        className="relative z-10 flex-shrink-0"
      >
        <div className="w-10 h-10 border border-stone-700/60 bg-stone-950 flex items-center justify-center text-stone-500 hover:border-gold-500/40 hover:text-gold-500 transition-all duration-300">
          {icon}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, delay: index * 0.04 + 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="pb-12"
      >
        <div className="flex items-center gap-3 mb-1.5">
          <span className="text-[9px] text-stone-700 tabular-nums font-mono tracking-wider">{id}</span>
          <h3 className="text-[14px] font-semibold text-stone-200">{title}</h3>
        </div>
        <p className="text-[13px] text-stone-500 leading-[1.75] max-w-[280px]">{desc}</p>
      </motion.div>
    </div>
  );
});

export function AIWorkflow() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const steps = [
    { id: '01', title: t.workflow.step1Title, desc: t.workflow.step1Desc },
    { id: '02', title: t.workflow.step2Title, desc: t.workflow.step2Desc },
    { id: '03', title: t.workflow.step3Title, desc: t.workflow.step3Desc },
    { id: '04', title: t.workflow.step4Title, desc: t.workflow.step4Desc },
    { id: '05', title: t.workflow.step5Title, desc: t.workflow.step5Desc },
    { id: '06', title: t.workflow.step6Title, desc: t.workflow.step6Desc },
    { id: '07', title: t.workflow.step7Title, desc: t.workflow.step7Desc },
  ];

  const metrics = [
    { v: t.workflow.metric1Value, l: t.workflow.metric1Label },
    { v: t.workflow.metric2Value, l: t.workflow.metric2Label },
    { v: t.workflow.metric3Value, l: t.workflow.metric3Label },
    { v: t.workflow.metric4Value, l: t.workflow.metric4Label },
  ];

  return (
    <section
      id="ai-workflow"
      ref={sectionRef}
      className="py-36 lg:py-44 bg-stone-950 relative overflow-hidden"
      aria-labelledby="workflow-heading"
    >
      <div className="absolute inset-0 circuit-bg opacity-30 pointer-events-none" />
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] rounded-full bg-gold-500/[0.025] blur-[140px] -translate-y-1/2" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-28 items-start">

          {/* Left — sticky heading */}
          <div className="lg:sticky lg:top-32">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="section-label mb-6"
            >
              {t.labels.howItWorks}
            </motion.p>

            <motion.h2
              id="workflow-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="section-title leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}
            >
              {t.workflow.headline1}
              <br />
              <span className="italic font-light text-stone-500">{t.workflow.headline2}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="text-stone-500 text-[14px] leading-[1.85] max-w-sm mb-12"
            >
              {t.workflow.description}
            </motion.p>

            {/* Mini metrics */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="grid grid-cols-2 gap-3"
            >
              {metrics.map((m) => (
                <div key={m.l} className="glass-dark border border-stone-800/50 p-4 rounded-sm">
                  <div className="font-display text-xl font-medium text-gold-500 leading-none mb-1">{m.v}</div>
                  <div className="text-[10px] text-stone-600 uppercase tracking-wider font-semibold">{m.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — steps */}
          <div className="relative pt-2">
            {steps.map((step, i) => (
              <Step key={step.id} id={step.id} title={step.title} desc={step.desc} icon={ICONS[i]} index={i} isLast={i === steps.length - 1} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
