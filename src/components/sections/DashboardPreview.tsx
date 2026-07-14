import { useRef, useState, useEffect, memo } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useLanguage } from '../../i18n';

const BARS = [38, 62, 51, 77, 69, 91, 84, 72, 88, 81, 96, 88];

const SparkChart = memo(() => (
  <div className="flex items-end gap-[2px] h-9 w-full" role="img" aria-label="Lead volume sparkline chart">
    {BARS.map((h, i) => (
      <motion.div
        key={i}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.55, delay: i * 0.035, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 rounded-[1px] origin-bottom"
        style={{
          height: `${h}%`,
          background: i === BARS.length - 1 ? 'rgba(201,168,76,0.9)' : 'rgba(201,168,76,0.2)',
        }}
      />
    ))}
  </div>
));

function CountUp({ to, duration = 1400 }: { to: number; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration]);
  return <span ref={ref}>{val}</span>;
}

export function DashboardPreview() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px 0px' });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const rawY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const y = useSpring(rawY, { stiffness: 90, damping: 28 });

  const stats = [
    { label: t.dashboard.stat1Label, value: 47, suffix: t.dashboard.stat1Suffix },
    { label: t.dashboard.stat2Label, value: 12, suffix: t.dashboard.stat2Suffix },
    { label: t.dashboard.stat3Label, value: 210, suffix: t.dashboard.stat3Suffix },
  ];

  const kpis = [
    { label: t.dashboard.kpi1Label, value: t.dashboard.kpi1Value },
    { label: t.dashboard.kpi2Label, value: t.dashboard.kpi2Value },
    { label: t.dashboard.kpi3Label, value: t.dashboard.kpi3Value },
  ];

  const leads = [
    { name: t.dashboard.lead1Name, company: t.dashboard.lead1Company, status: t.dashboard.lead1Status, score: 94, time: '2m',  avatar: 'SL', color: 'text-gold-500 bg-gold-500/10 border-gold-500/20' },
    { name: t.dashboard.lead2Name, company: t.dashboard.lead2Company, status: t.dashboard.lead2Status, score: 88, time: '8m',  avatar: 'MD', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
    { name: t.dashboard.lead3Name, company: t.dashboard.lead3Company, status: t.dashboard.lead3Status, score: 71, time: '15m', avatar: 'LH', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
    { name: t.dashboard.lead4Name, company: t.dashboard.lead4Company, status: t.dashboard.lead4Status, score: 96, time: '1h',  avatar: 'JO', color: 'text-gold-500 bg-gold-500/10 border-gold-500/20' },
    { name: t.dashboard.lead5Name, company: t.dashboard.lead5Company, status: t.dashboard.lead5Status, score: 63, time: '3h',  avatar: 'NP', color: 'text-orange-400 bg-orange-400/10 border-orange-400/20' },
  ];

  const activities = [
    { text: t.dashboard.activity1Text, name: t.dashboard.lead1Name, time: '2m' },
    { text: t.dashboard.activity2Text, name: t.dashboard.lead2Name, time: '8m' },
    { text: t.dashboard.activity3Text, name: t.dashboard.lead5Name, time: '42m' },
    { text: t.dashboard.activity4Text, name: t.dashboard.lead4Name, time: '1h' },
  ];

  return (
    <section
      id="dashboard"
      ref={sectionRef}
      className="py-36 lg:py-44 bg-void relative overflow-hidden"
      aria-labelledby="dashboard-heading"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-0 w-[700px] h-[700px] rounded-full bg-gold-500/[0.025] blur-[160px] -translate-y-1/2 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="section-label mb-6"
            >
              {t.dashboard.label}
            </motion.p>
            <motion.h2
              id="dashboard-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.08 }}
              className="section-title leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}
            >
              {t.dashboard.headline1}
              <br />
              <span className="italic font-light text-stone-500">{t.dashboard.headline2}</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="text-stone-500 text-[14px] leading-[1.85] max-w-sm mb-12"
            >
              {t.dashboard.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="space-y-4"
            >
              {stats.map((s) => (
                <div key={s.label} className="flex items-center justify-between py-3.5 border-b border-stone-800/50">
                  <span className="text-[13px] text-stone-500">{s.label}</span>
                  <span className="font-display text-xl font-medium text-gold-500">
                    <CountUp to={s.value} />{s.suffix}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dashboard card */}
          <motion.div
            ref={dashRef}
            style={{ y }}
            initial={{ opacity: 0, scale: 0.96, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Glow behind card */}
            <div
              className="absolute -inset-6 rounded-3xl opacity-20 blur-2xl pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.4), transparent 68%)' }}
              aria-hidden="true"
            />

            <div className="relative border border-stone-800/60 bg-stone-900/40 backdrop-blur-xl overflow-hidden rounded-sm">
              {/* Titlebar */}
              <div className="px-5 py-3.5 border-b border-stone-800/50 flex items-center justify-between bg-stone-900/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-gold-500" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-300">MEHANS CRM</span>
                </div>
                <div className="flex gap-1.5" aria-hidden="true">
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-700" />
                </div>
              </div>

              {/* KPI row */}
              <div className="grid grid-cols-3 divide-x divide-stone-800/40 border-b border-stone-800/40">
                {kpis.map((kpi) => (
                  <div key={kpi.label} className="py-4 px-4 text-center">
                    <div className="font-display text-lg font-medium text-gold-500 leading-none mb-1">{kpi.value}</div>
                    <div className="text-[9px] text-stone-600 uppercase tracking-wider">{kpi.label}</div>
                  </div>
                ))}
              </div>

              {/* Sparkline */}
              <div className="px-5 py-4 border-b border-stone-800/40">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] text-stone-600 uppercase tracking-widest">{t.dashboard.chartLabel}</span>
                  <span className="text-[11px] text-gold-500 font-semibold">{t.dashboard.chartGrowth}</span>
                </div>
                {inView && <SparkChart />}
              </div>

              {/* Leads list */}
              <div className="px-5 py-3 border-b border-stone-800/40">
                <div className="text-[9px] text-stone-700 uppercase tracking-widest mb-3">{t.dashboard.leadsLabel}</div>
                <div className="space-y-2.5">
                  {inView && leads.map((lead, i) => (
                    <motion.div
                      key={lead.name}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.07 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-stone-800 border border-stone-700/50 flex items-center justify-center flex-shrink-0">
                        <span className="text-[8px] font-bold text-stone-400">{lead.avatar}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-medium text-stone-300 truncate">{lead.name}</div>
                        <div className="text-[9px] text-stone-600 truncate">{lead.company}</div>
                      </div>
                      <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium border ${lead.color} flex-shrink-0`}>
                        <span>{lead.status}</span>
                      </div>
                      <div className="text-[11px] font-bold text-stone-400 flex-shrink-0 w-6 text-right">{lead.score}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Activity */}
              <div className="px-5 py-4">
                <div className="text-[9px] text-stone-700 uppercase tracking-widest mb-3">{t.dashboard.activityLabel}</div>
                <div className="space-y-2.5">
                  {inView && activities.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-500/70 flex-shrink-0" />
                        <span className="text-[11px] text-stone-500">{item.text} </span>
                        <span className="text-[11px] text-stone-300 font-medium">{item.name}</span>
                      </div>
                      <span className="text-[9px] text-stone-700 tabular-nums ml-3">{item.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
