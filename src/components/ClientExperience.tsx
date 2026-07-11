import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const CONVERSATION = [
  {
    from: 'lead',
    text: "Hi, I saw your ad — I need help automating my sales process. What can you do?",
    delay: 0.5,
  },
  {
    from: 'ai',
    text: "Great timing. I can qualify leads, book meetings, and keep your pipeline full — automatically. What's your current monthly revenue?",
    delay: 1.4,
  },
  {
    from: 'lead',
    text: "Around €50k. We have a small team — just 3 sales reps.",
    delay: 2.6,
  },
  {
    from: 'ai',
    text: "Perfect fit. Companies your size typically see 3x pipeline growth in 60 days. Let me book a 20-minute call with your founder.",
    delay: 3.8,
  },
  {
    from: 'lead',
    text: "That would be great — when are you available?",
    delay: 5.0,
  },
  {
    from: 'ai',
    text: "✓ Meeting confirmed for tomorrow at 10:00 AM. A calendar invite is on its way. See you then.",
    delay: 6.2,
    isConfirmation: true,
  },
];

const TIMELINE_STEPS = [
  { label: 'Message received', time: '0:00' },
  { label: 'Intent detected', time: '0:02' },
  { label: 'Lead qualified', time: '0:05' },
  { label: 'Meeting booked', time: '0:58' },
  { label: 'Confirmation sent', time: '1:01' },
];

function ChatBubble({ message, visible }: { message: typeof CONVERSATION[0]; visible: boolean }) {
  const isAI = message.from === 'ai';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-3`}
        >
          {isAI && (
            <div className="w-6 h-6 rounded-full bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.3)] flex items-center justify-center mr-2 flex-shrink-0 mt-auto">
              <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
            </div>
          )}
          <div
            className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              isAI
                ? message.isConfirmation
                  ? 'bg-[rgba(212,175,55,0.12)] border border-[rgba(212,175,55,0.3)] text-[#f0d060]'
                  : 'glass border border-[rgba(255,255,255,0.06)] text-[#e0e0e0]'
                : 'bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.06)] text-white'
            }`}
          >
            {message.text}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ClientExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px 0px' });
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    CONVERSATION.forEach((msg, i) => {
      setTimeout(() => setVisibleMessages(i + 1), msg.delay * 1000);
    });

    TIMELINE_STEPS.forEach((_, i) => {
      setTimeout(() => setActiveStep(i), (i * 1.2 + 0.5) * 1000);
    });
  }, [inView]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-32 bg-[#050505] overflow-hidden"
      aria-labelledby="experience-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.15)] to-transparent" />
      </div>

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
              Your Client's Experience
            </span>
          </motion.div>
          <motion.h2
            id="experience-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold mb-4"
          >
            First contact to booked meeting.
            <br />
            <span className="text-gold-gradient">Under 60 seconds.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#a0a0a0] max-w-md mx-auto"
          >
            This is what your future client experiences — from first message to confirmed appointment.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Chat UI */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-2xl glass-strong gold-border overflow-hidden">
              {/* Chat header */}
              <div className="px-5 py-4 border-b border-[rgba(212,175,55,0.08)] flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.3)] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#d4af37]" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">MEHANS AI</div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-[#5a5a5a]">Online</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="p-5 min-h-[360px] flex flex-col justify-end">
                {CONVERSATION.map((msg, i) => (
                  <ChatBubble
                    key={i}
                    message={msg}
                    visible={i < visibleMessages}
                  />
                ))}

                {/* Typing indicator */}
                {visibleMessages > 0 && visibleMessages < CONVERSATION.length && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 mb-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.3)] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
                    </div>
                    <div className="glass border border-[rgba(255,255,255,0.06)] px-3 py-2 rounded-2xl flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [-2, 2, -2] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                          className="w-1 h-1 rounded-full bg-[#5a5a5a]"
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
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">What happens behind the scenes</h3>
              <p className="text-sm text-[#a0a0a0]">Every action is logged, scored, and escalated instantly.</p>
            </div>

            {TIMELINE_STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                  activeStep >= i
                    ? 'glass gold-border shadow-[0_0_20px_rgba(212,175,55,0.05)]'
                    : 'border border-transparent opacity-40'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                  activeStep >= i
                    ? 'bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.4)] shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                    : 'border border-[rgba(255,255,255,0.1)]'
                }`}>
                  {activeStep >= i ? (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      viewBox="0 0 16 16"
                      className="w-3.5 h-3.5 text-[#d4af37]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 8l3 3 6-6" />
                    </motion.svg>
                  ) : (
                    <span className="text-[10px] text-[#5a5a5a] font-mono">{i + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">{step.label}</div>
                </div>
                <div className="font-mono text-xs text-[#5a5a5a]">{step.time}</div>
              </motion.div>
            ))}

            {/* Result card */}
            <AnimatePresence>
              {activeStep >= TIMELINE_STEPS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mt-6 p-5 rounded-2xl bg-[rgba(212,175,55,0.06)] border border-[rgba(212,175,55,0.25)]"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold text-emerald-300 uppercase tracking-widest">
                      Meeting Confirmed
                    </span>
                  </div>
                  <div className="text-sm text-[#d4af37] font-medium">Tomorrow · 10:00 AM</div>
                  <div className="text-xs text-[#a0a0a0] mt-1">Calendar invite sent · Team briefing ready</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
