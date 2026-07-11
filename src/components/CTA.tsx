import { useState } from 'react';
import { motion } from 'framer-motion';
import { ParticleField } from './ParticleField';

export function CTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status !== 'idle') return;
    setStatus('loading');
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('done');
    setEmail('');
  };

  return (
    <section
      id="cta"
      className="relative py-40 bg-[#050505] overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[rgba(212,175,55,0.04)] blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.15)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.08)] to-transparent" />
      </div>

      <ParticleField count={20} />

      {/* Soft top beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-[rgba(212,175,55,0.4)] to-transparent" aria-hidden="true" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full glass gold-border"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-[#d4af37] tracking-widest uppercase font-medium">
            Now Accepting Clients
          </span>
        </motion.div>

        <motion.h2
          id="cta-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl lg:text-6xl font-bold mb-6 leading-tight"
        >
          Ready to fill
          <br />
          <span className="text-gold-gradient">your calendar?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#a0a0a0] text-lg mb-12 max-w-md mx-auto leading-relaxed"
        >
          Book a 20-minute call. We'll show you exactly how many leads
          you're currently losing — and how to stop it.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8"
          aria-label="Get started form"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={status !== 'idle'}
            aria-label="Email address"
            className="flex-1 px-5 py-3.5 rounded-full text-sm glass gold-border text-white placeholder-[#5a5a5a] focus:outline-none focus:border-[rgba(212,175,55,0.5)] transition-all duration-200 disabled:opacity-60"
          />
          <motion.button
            type="submit"
            disabled={status !== 'idle'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="relative px-7 py-3.5 rounded-full text-sm font-semibold bg-[#d4af37] text-black overflow-hidden disabled:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="inline-block w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full"
                />
                Sending...
              </span>
            ) : status === 'done' ? (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                We'll be in touch
              </span>
            ) : (
              'Book a Call'
            )}
          </motion.button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-xs text-[#5a5a5a]"
        >
          No commitment. No spam. Just results.
        </motion.p>
      </div>
    </section>
  );
}
