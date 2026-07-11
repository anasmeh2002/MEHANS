import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useLanguage } from '../../i18n';

interface Message {
  from: 'lead' | 'ai';
  text: string;
  delay: number;
  isConfirmation?: boolean;
}

const MESSAGES: Message[] = [
  { from: 'lead', text: "Hi, I need help automating my sales process. What can you do?",                                                            delay: 0.6 },
  { from: 'ai',   text: "I can qualify your leads, book meetings, and fill your pipeline automatically. What's your current monthly revenue?",       delay: 1.6 },
  { from: 'lead', text: "Around €50k. We have 3 sales reps.",                                                                                      delay: 2.9 },
  { from: 'ai',   text: "Perfect fit. Companies your size typically see 3× pipeline growth in 60 days. Let me book a 20-minute call with you.",     delay: 4.1 },
  { from: 'lead', text: "That sounds great — when are you available?",                                                                              delay: 5.4 },
  { from: 'ai',   text: "✓ Meeting confirmed — tomorrow at 10:00 AM. Calendar invite sent.",                                                        delay: 6.6, isConfirmation: true },
];

const TIMELINE = [
  { label: 'Message received', time: '0:00' },
  { label: 'Intent detected',  time: '0:02' },
  { label: 'Lead qualified',   time: '0:05' },
  { label: 'Meeting booked',   time: '0:58' },
  { label: 'Confirmation sent',time: '1:01' },
];

function Bubble({ msg, visible }: { msg: Message; visible: boolean }) {
  const isAI = msg.from === 'ai';
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className={`flex mb-3 ${isAI ? 'justify-start' : 'justify-end'}`}
        >
          {isAI && (
            <div className="w-6 h-6 rounded-full border border-gold-500/30 bg-gold-500/10 flex items-center justify-center mr-2.5 flex-shrink-0 self-end mb-0.5">
              <div className="w-2 h-2 rounded-full bg-gold-500" />
            </div>
          )}
          <div
            className={`max-w-[80%] px-4 py-3 text-[13px] leading-[1.7] rounded-[3px] ${
              isAI
                ? msg.isConfirmation
                  ? 'border border-gold-500/30 bg-gold-500/[0.06] text-gold-300'
                  : 'border border-stone-700/50 bg-stone-800/50 text-stone-300'
                : 'border border-stone-700/40 bg-stone-800/40 text-stone-200'
            }`}
          >
            {msg.text}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ClientJourney() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px 0px' });

  const [visible, setVisible] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    MESSAGES.forEach((m, i) => setTimeout(() => setVisible(i + 1), m.delay * 1000));
    TIMELINE.forEach((_, i) => setTimeout(() => setActiveStep(i), (i * 1.3 + 0.5) * 1000));
  }, [inView]);

  return (
    <section
      id="client-journey"
      ref={sectionRef}
      className="py-36 lg:py-44 bg-stone-950 relative overflow-hidden"
      aria-labelledby="journey-heading"
    >
      <div className="absolute inset-0 circuit-bg opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Heading */}
        <div className="max-w-2xl mx-auto text-center mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label mb-5"
          >
            Your Client's Experience
          </motion.p>
          <motion.h2
            id="journey-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="section-title leading-[1.05] mb-4"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.25rem)', letterSpacing: '-0.02em' }}
          >
            First contact to booked meeting.
            <br />
            <span className="italic font-light text-stone-500">Under 60 seconds.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="text-stone-500 text-[14px] leading-[1.75]"
          >
            This is what your future client experiences — from first message to confirmed appointment.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Chat */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="border border-stone-800/60 bg-stone-900/30 backdrop-blur-xl overflow-hidden rounded-sm">
              {/* Chat header */}
              <div className="px-5 py-4 border-b border-stone-800/50 bg-stone-900/50 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-gold-500/30 bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-gold-500" />
                </div>
                <div>
                  <div className="text-[12px] font-semibold text-stone-200 tracking-wide">MEHANS AI</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] text-stone-600">Online — responds in seconds</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="p-5 min-h-[340px] flex flex-col justify-end">
                {MESSAGES.map((msg, i) => (
                  <Bubble key={i} msg={msg} visible={i < visible} />
                ))}

                {/* Typing indicator */}
                {visible > 0 && visible < MESSAGES.length && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-end gap-2.5 mb-3"
                  >
                    <div className="w-6 h-6 rounded-full border border-gold-500/30 bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-gold-500" />
                    </div>
                    <div className="border border-stone-700/50 bg-stone-800/50 px-3.5 py-3 flex gap-1 rounded-[3px]">
                      {[0, 1, 2].map((j) => (
                        <motion.div
                          key={j}
                          animate={{ y: [-2, 2, -2] }}
                          transition={{ duration: 0.85, repeat: Infinity, delay: j * 0.16 }}
                          className="w-1 h-1 rounded-full bg-stone-600"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3 pt-2"
          >
            <div className="mb-8">
              <h3 className="text-stone-200 font-semibold text-[15px] mb-1.5">What happens behind the scenes</h3>
              <p className="text-[13px] text-stone-600">Every action is logged, scored, and escalated instantly.</p>
            </div>

            {TIMELINE.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09 }}
                className={`flex items-center gap-4 p-4 border transition-all duration-500 rounded-sm ${
                  activeStep >= i
                    ? 'border-gold-500/20 bg-gold-500/[0.03]'
                    : 'border-stone-800/30 opacity-40'
                }`}
              >
                <div className={`w-7 h-7 flex items-center justify-center flex-shrink-0 rounded-sm transition-all duration-500 ${
                  activeStep >= i
                    ? 'border border-gold-500/40 bg-gold-500/10'
                    : 'border border-stone-700/40'
                }`}>
                  {activeStep >= i ? (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      viewBox="0 0 16 16"
                      className="w-3 h-3 text-gold-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 8l3 3 6-6" />
                    </motion.svg>
                  ) : (
                    <span className="text-[9px] text-stone-700 font-mono">{i + 1}</span>
                  )}
                </div>
                <span className="text-[13px] text-stone-300 flex-1 font-medium">{step.label}</span>
                <span className="font-mono text-[11px] text-stone-600">{step.time}</span>
              </motion.div>
            ))}

            <AnimatePresence>
              {activeStep >= TIMELINE.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45 }}
                  className="mt-4 p-5 border border-gold-500/20 bg-gold-500/[0.05] rounded-sm"
                >
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-[0.2em]">Meeting Confirmed</span>
                  </div>
                  <div className="text-[14px] font-medium text-gold-400">Tomorrow · 10:00 AM</div>
                  <div className="text-[11px] text-stone-600 mt-1">Calendar invite sent · Team briefing ready</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
