import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, User, AtSign, MessageSquare, Briefcase } from 'lucide-react';
import { AnimatedSection } from '../ui/AnimatedSection';

const TRUST_BADGES = [
  { label: 'Free Consultation', icon: CheckCircle2 },
  { label: 'Response Within 24 Hours', icon: Clock },
  { label: 'Custom AI Roadmap', icon: Briefcase },
  { label: 'No Obligation', icon: CheckCircle2 },
];

const BUDGETS = ['Under 5K MAD', '5K – 15K MAD', '15K – 40K MAD', '40K+ MAD'];
const INTERESTS = ['Lead Gen AI', 'WhatsApp AI', 'CRM Automation', 'Voice AI', 'Full-Stack AI', 'Custom System'];

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', budget: '', interest: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  };

  return (
    <section id="contact" className="py-36 lg:py-44 relative overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/95 to-void" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-gold-500/[0.025] blur-[120px] pointer-events-none" />

      {/* Circuit pattern */}
      <div className="absolute inset-0 circuit-bg opacity-25 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-10 relative z-10">

        {/* Header - centered */}
        <div className="text-center mb-14">
          <AnimatedSection delay={0}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-10 h-px bg-gold-500/50" />
              <span className="section-label">Get Started</span>
              <div className="w-10 h-px bg-gold-500/50" />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.08}>
            <h2 className="section-title mb-6" style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)' }}>
              Book Your Free<br />
              <span className="italic font-light text-gradient-gold">AI Strategy Session.</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.12}>
            <p className="text-stone-500 text-[14px] max-w-lg mx-auto leading-[1.75]">
              Speak with a senior AI engineer. We'll analyze your workflow and show you exactly where automation delivers the highest return.
            </p>
          </AnimatedSection>
        </div>

        {/* Trust badges */}
        <AnimatedSection delay={0.16}>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-14">
            {TRUST_BADGES.map((badge, i) => (
              <div key={badge.label} className="flex items-center gap-2 px-4 py-2 border border-stone-800/40 bg-void/30">
                <badge.icon size={12} className="text-gold-500/70" />
                <span className="text-stone-600 text-[11px] font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Premium form card */}
        <AnimatedSection delay={0.2}>
          <div className="relative">
            {/* Glassmorphism card */}
            <div className="relative border-2 border-gold-500/15 bg-gradient-to-b from-charcoal/80 to-void/90 backdrop-blur-xl shadow-2xl shadow-gold-500/5 overflow-hidden">
              {/* Gold top accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-6 h-6 border-l border-t border-gold-500/25" />
              <div className="absolute top-4 right-4 w-6 h-6 border-r border-t border-gold-500/25" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l border-b border-gold-500/25" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-gold-500/25" />

              <div className="p-8 md:p-12">
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center gap-8 py-16 text-center"
                  >
                    <div className="w-20 h-20 border-2 border-gold-500/25 flex items-center justify-center relative">
                      <CheckCircle2 size={32} strokeWidth={1.5} className="text-gold-500" />
                      <div className="absolute -inset-4 border border-gold-500/10" />
                    </div>
                    <div>
                      <h3 className="font-display text-[28px] text-stone-100 mb-3">Request Received</h3>
                      <p className="text-stone-600 text-[14px] leading-[1.8]">
                        We'll reach out within 24 hours to schedule your strategy session.
                      </p>
                    </div>
                    <button
                      onClick={() => setSent(false)}
                      className="text-gold-500/70 hover:text-gold-500 text-[12px] transition-colors duration-200"
                    >
                      Submit another request
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    {/* Name + email row */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                          <User size={14} className="text-stone-700" />
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="Full Name"
                          value={form.name}
                          onChange={update('name')}
                          className="w-full bg-void/50 border-2 border-stone-800/50 px-12 py-4 text-[14px] text-stone-300 placeholder-stone-700 outline-none transition-all duration-300 focus:border-gold-500/35 focus:bg-void/80"
                        />
                      </div>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                          <AtSign size={14} className="text-stone-700" />
                        </div>
                        <input
                          type="email"
                          required
                          placeholder="Email"
                          value={form.email}
                          onChange={update('email')}
                          className="w-full bg-void/50 border-2 border-stone-800/50 px-12 py-4 text-[14px] text-stone-300 placeholder-stone-700 outline-none transition-all duration-300 focus:border-gold-500/35 focus:bg-void/80"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                        <Phone size={14} className="text-stone-700" />
                      </div>
                      <input
                        type="tel"
                        placeholder="Phone (optional)"
                        value={form.phone}
                        onChange={update('phone')}
                        className="w-full bg-void/50 border-2 border-stone-800/50 px-12 py-4 text-[14px] text-stone-300 placeholder-stone-700 outline-none transition-all duration-300 focus:border-gold-500/35 focus:bg-void/80"
                      />
                    </div>

                    {/* AI systems chips */}
                    <div>
                      <label className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-600 mb-3 block">
                        AI System Needed
                      </label>
                      <div className="flex flex-wrap gap-2.5">
                        {INTERESTS.map((int) => (
                          <button
                            key={int}
                            type="button"
                            onClick={() => setForm({ ...form, interest: int })}
                            className={`px-4 py-2.5 text-[12px] font-medium border-2 transition-all duration-300 ${
                              form.interest === int
                                ? 'border-gold-500/40 text-gold-500 bg-gold-500/[0.06]'
                                : 'border-stone-800/40 text-stone-600 hover:border-stone-700/50 hover:text-stone-500'
                            }`}
                          >
                            {int}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <div className="absolute left-4 top-4 z-10">
                        <MessageSquare size={14} className="text-stone-700" />
                      </div>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your workflow and what you'd like automated..."
                        value={form.message}
                        onChange={update('message')}
                        className="w-full bg-void/50 border-2 border-stone-800/50 px-12 py-4 text-[14px] text-stone-300 placeholder-stone-700 outline-none transition-all duration-300 focus:border-gold-500/35 focus:bg-void/80 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-primary justify-center py-4 text-[12px] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-void border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          Schedule Strategy Session
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact info below */}
            <div className="mt-10 grid sm:grid-cols-3 gap-6 text-center">
              <a href="mailto:hello@mehans.space" className="group flex flex-col items-center gap-2">
                <Mail size={14} className="text-gold-500/50 group-hover:text-gold-500 transition-colors duration-300" />
                <span className="text-stone-500 text-[12px] group-hover:text-gold-500 transition-colors duration-300">hello@mehans.space</span>
              </a>
              <a href="tel:+212710891662" className="group flex flex-col items-center gap-2">
                <Phone size={14} className="text-gold-500/50 group-hover:text-gold-500 transition-colors duration-300" />
                <span className="text-stone-500 text-[12px] group-hover:text-gold-500 transition-colors duration-300">+212 710 891 662</span>
              </a>
              <div className="flex flex-col items-center gap-2">
                <MapPin size={14} className="text-gold-500/50" />
                <span className="text-stone-600 text-[12px]">Mahaj Riad, Rabat</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Clock({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
