import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const LEADS = [
  { id: 1, name: 'Sophie Laurent', company: 'Nexus Capital', status: 'Qualified', score: 94, time: '2m ago', avatar: 'SL' },
  { id: 2, name: 'Marc Dubois', company: 'Vertex SaaS', status: 'Meeting Scheduled', score: 88, time: '8m ago', avatar: 'MD' },
  { id: 3, name: 'Laila Hassan', company: 'AlphaScale', status: 'New Lead', score: 71, time: '15m ago', avatar: 'LH' },
  { id: 4, name: 'James Okafor', company: 'Forte Digital', status: 'Completed', score: 96, time: '1h ago', avatar: 'JO' },
  { id: 5, name: 'Nina Petrov', company: 'Luminary Tech', status: 'Waiting', score: 63, time: '3h ago', avatar: 'NP' },
];

const STATUS_CONFIG: Record<string, { color: string; bg: string; dot: string }> = {
  'New Lead':           { color: 'text-blue-300',   bg: 'bg-blue-500/10',  dot: 'bg-blue-400' },
  'Qualified':          { color: 'text-[#d4af37]',  bg: 'bg-[rgba(212,175,55,0.1)]', dot: 'bg-[#d4af37]' },
  'Meeting Scheduled':  { color: 'text-emerald-300', bg: 'bg-emerald-500/10', dot: 'bg-emerald-400' },
  'Waiting':            { color: 'text-orange-300',  bg: 'bg-orange-500/10', dot: 'bg-orange-400' },
  'Completed':          { color: 'text-[#d4af37]',  bg: 'bg-[rgba(212,175,55,0.08)]', dot: 'bg-[#d4af37]' },
};

const CHART_BARS = [42, 68, 55, 81, 73, 95, 88, 76, 91, 84, 97, 89];

function SparkChart() {
  return (
    <div className="flex items-end gap-0.5 h-8" aria-hidden="true">
      {CHART_BARS.map((h, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 rounded-sm origin-bottom"
          style={{
            height: `${h}%`,
            background: i === CHART_BARS.length - 1
              ? 'rgba(212,175,55,0.9)'
              : 'rgba(212,175,55,0.25)',
          }}
        />
      ))}
    </div>
  );
}

function ActivityFeed() {
  const items = [
    { text: 'Lead qualified', name: 'Sophie Laurent', time: '2m' },
    { text: 'Meeting booked', name: 'Marc Dubois', time: '8m' },
    { text: 'Follow-up sent', name: 'Nina Petrov', time: '42m' },
    { text: 'Deal closed', name: 'James Okafor', time: '1h' },
  ];

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.1 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] flex-shrink-0" />
            <div>
              <span className="text-xs text-[#a0a0a0]">{item.text} </span>
              <span className="text-xs text-white font-medium">{item.name}</span>
            </div>
          </div>
          <span className="text-[10px] text-[#5a5a5a] tabular-nums">{item.time}</span>
        </motion.div>
      ))}
    </div>
  );
}

function LeadRow({ lead, index }: { lead: typeof LEADS[0]; index: number }) {
  const cfg = STATUS_CONFIG[lead.status];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08 }}
      className="flex items-center gap-3 py-2.5 border-b border-[rgba(255,255,255,0.04)] last:border-0"
    >
      <div className="w-7 h-7 rounded-full bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.2)] flex items-center justify-center flex-shrink-0">
        <span className="text-[9px] font-bold text-[#d4af37]">{lead.avatar}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium text-white truncate">{lead.name}</div>
        <div className="text-[10px] text-[#5a5a5a] truncate">{lead.company}</div>
      </div>
      <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium ${cfg.bg} ${cfg.color} flex-shrink-0`}>
        <div className={`w-1 h-1 rounded-full ${cfg.dot}`} />
        <span className="hidden sm:inline">{lead.status}</span>
      </div>
      <div className="text-right flex-shrink-0">
        <div className="text-xs font-bold text-white">{lead.score}</div>
        <div className="text-[9px] text-[#5a5a5a]">score</div>
      </div>
    </motion.div>
  );
}

export function Dashboard() {
  const sectionRef = useRef<HTMLElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px 0px' });
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [30, -30]);
  const rotate = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [2, -1]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const smoothR = useSpring(rotate, { stiffness: 100, damping: 30 });

  const [counter, setCounter] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => setCounter((c) => (c < 47 ? c + 1 : 47)), 40);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <section
      id="dashboard"
      ref={sectionRef}
      className="relative py-32 bg-[#050505] overflow-hidden"
      aria-labelledby="dashboard-heading"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full bg-[rgba(212,175,55,0.02)] blur-3xl -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full glass gold-border"
            >
              <span className="text-[10px] text-[#d4af37] tracking-widest uppercase font-medium">
                Live Dashboard
              </span>
            </motion.div>

            <motion.h2
              id="dashboard-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold leading-tight mb-6"
            >
              Total visibility.
              <br />
              <span className="text-gold-gradient">Zero guesswork.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[#a0a0a0] text-base leading-relaxed max-w-sm mb-10"
            >
              See every lead, score, and conversation in one command centre.
              Know who's ready to buy before your team picks up the phone.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="space-y-4"
            >
              {[
                { label: 'Leads processed today', value: `${counter}`, suffix: '+' },
                { label: 'Meetings booked this week', value: '12', suffix: '' },
                { label: 'Pipeline value created', value: '€84k', suffix: '' },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.05)]">
                  <span className="text-sm text-[#a0a0a0]">{s.label}</span>
                  <span className="text-lg font-bold text-gold-gradient">
                    {s.value}{s.suffix}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dashboard card */}
          <motion.div
            ref={dashRef}
            style={{ y: smoothY, rotateX: smoothR }}
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Glow behind dashboard */}
            <div
              className="absolute -inset-4 rounded-3xl blur-2xl opacity-20"
              style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.4), transparent 70%)' }}
              aria-hidden="true"
            />

            <div className="relative rounded-2xl glass-strong gold-border overflow-hidden">
              {/* Dashboard header */}
              <div className="px-5 py-4 border-b border-[rgba(212,175,55,0.08)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
                  <span className="text-xs font-semibold text-white tracking-wider uppercase">MEHANS CRM</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                </div>
              </div>

              <div className="p-5 grid grid-cols-3 gap-3 border-b border-[rgba(212,175,55,0.06)]">
                {[
                  { label: 'Pipeline', value: '€210k' },
                  { label: 'Qualified', value: '38%' },
                  { label: 'Avg Close', value: '4.2d' },
                ].map((kpi) => (
                  <div key={kpi.label} className="glass rounded-xl p-3 text-center">
                    <div className="text-base font-bold text-gold-gradient">{kpi.value}</div>
                    <div className="text-[10px] text-[#5a5a5a] mt-0.5">{kpi.label}</div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="px-5 pt-4 pb-3 border-b border-[rgba(212,175,55,0.06)]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] text-[#5a5a5a] uppercase tracking-widest">Leads / month</span>
                  <span className="text-xs text-[#d4af37] font-medium">+23%</span>
                </div>
                {inView && <SparkChart />}
              </div>

              {/* Leads list */}
              <div className="px-5 py-3 border-b border-[rgba(212,175,55,0.06)]">
                <div className="text-[10px] text-[#5a5a5a] uppercase tracking-widest mb-2">Recent Leads</div>
                {inView && LEADS.map((lead, i) => <LeadRow key={lead.id} lead={lead} index={i} />)}
              </div>

              {/* Activity feed */}
              <div className="px-5 py-4">
                <div className="text-[10px] text-[#5a5a5a] uppercase tracking-widest mb-3">Activity</div>
                {inView && <ActivityFeed />}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
