import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, User, AtSign, MessageSquare } from 'lucide-react';
import { AnimatedSection } from '../ui/AnimatedSection';

const TRUST_BADGES = [
  { label: 'Free Strategy Session' },
  { label: 'Response Within 24 Hours' },
  { label: 'Custom AI Roadmap Included' },
  { label: 'No Commitment Required' },
];

const INTERESTS = ['Lead Gen AI', 'WhatsApp AI', 'CRM Automation', 'Voice AI', 'Full-Stack AI', 'Custom System'];

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: '', message: '' });
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
    <section id="contact" className="py-24 md:py-44 lg:py-52 relative overflow-hidden">
      {/* Premium gradient background - brighter */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900/95 to-stone-950" />

      {/* Main spotlight effect behind form */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[750px] rounded-full bg-gold-500/[0.05] blur-[160px] pointer-events-none" />

      {/* Secondary ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gold-500/[0.025] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-gold-500/[0.02] blur-[100px] pointer-events-none" />

      {/* Circuit pattern */}
      <div className="absolute inset-0 circuit-bg opacity-35 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-10 relative z-10">

        {/* Header - centered */}
        <div className="text-center mb-12 md:mb-16">
          <AnimatedSection delay={0}>
            <div className="flex items-center justify-center gap-4 md:gap-5 mb-5 md:mb-7">
              <div className="w-10 md:w-14 h-px bg-gradient-to-r from-transparent to-gold-500/70" />
              <span className="section-label">Get Started</span>
              <div className="w-10 md:w-14 h-px bg-gradient-to-l from-transparent to-gold-500/70" />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.08}>
            <h2 className="section-title mb-5 md:mb-7" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Book Your Free<br />
              <span className="italic font-light text-gradient-gold">AI Strategy Session.</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.12}>
            <p className="text-stone-400 text-[14px] md:text-[15px] max-w-lg mx-auto leading-[1.85] px-2">
              Speak with a MEHANS senior engineer. We'll audit your lead pipeline, identify where deals are being lost, and deliver a custom automation roadmap — free, with no obligation.
            </p>
          </AnimatedSection>
        </div>

        {/* Trust badges */}
        <AnimatedSection delay={0.16}>
          <div className="flex flex-wrap justify-center gap-2.5 md:gap-3 mb-12 md:mb-16">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2.5 px-4 py-3 md:px-5 md:py-2.5 border border-gold-500/30 bg-gold-500/[0.07] rounded-sm min-h-[44px] md:min-h-0">
                <CheckCircle2 size={14} className="md:hidden text-gold-500" />
                <CheckCircle2 size={12} className="hidden md:block text-gold-500" />
                <span className="text-stone-300 text-[12px] font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Premium form card */}
        <AnimatedSection delay={0.2}>
          <div className="relative">
            {/* Glassmorphism card with premium styling */}
            <div className="glass-premium rounded-lg overflow-hidden relative">
              {/* Top gold gradient line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

              {/* Corner accents - more prominent */}
              <div className="absolute top-4 md:top-6 left-4 md:left-6 w-8 md:w-10 h-8 md:h-10 border-l-2 border-t-2 border-gold-500/40" />
              <div className="absolute top-4 md:top-6 right-4 md:right-6 w-8 md:w-10 h-8 md:h-10 border-r-2 border-t-2 border-gold-500/40" />
              <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 w-8 md:w-10 h-8 md:h-10 border-l-2 border-b-2 border-gold-500/40" />
              <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 w-8 md:w-10 h-8 md:h-10 border-r-2 border-b-2 border-gold-500/40" />

              <div className="p-6 md:p-10 lg:p-14">
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center gap-6 md:gap-8 py-16 md:py-20 text-center"
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 border-2 border-gold-500/35 flex items-center justify-center relative rounded-full bg-gold-500/[0.07]">
                      <CheckCircle2 size={32} strokeWidth={1.5} className="md:hidden text-gold-500" />
                      <CheckCircle2 size={36} strokeWidth={1.5} className="hidden md:block text-gold-500" />
                      <div className="absolute -inset-4 md:-inset-5 border border-gold-500/15 rounded-full" />
                    </div>
                    <div>
                      <h3 className="font-display text-[26px] md:text-[32px] text-stone-100 mb-3 md:mb-4">Request Received</h3>
                      <p className="text-stone-400 text-[14px] md:text-[15px] leading-[1.85]">
                        We'll reach out within 24 hours to schedule your strategy session.
                      </p>
                    </div>
                    <button
                      onClick={() => setSent(false)}
                      className="text-gold-500/80 hover:text-gold-500 text-[13px] border-b border-gold-500/30 hover:border-gold-500 transition-all duration-200 min-h-[44px] px-4"
                    >
                      Submit another request
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:gap-7">

                    {/* Name + email row */}
                    <div className="grid sm:grid-cols-2 gap-4 md:gap-7">
                      <div className="relative">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10">
                          <User size={18} className="md:hidden text-stone-500" />
                          <User size={16} className="hidden md:block text-stone-500" />
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="Full Name"
                          value={form.name}
                          onChange={update('name')}
                          aria-label="Full Name"
                          className="w-full bg-stone-900/90 border-2 border-stone-700/70 px-14 py-[18px] md:py-5 text-[16px] md:text-[15px] text-stone-200 rounded-sm outline-none transition-all duration-300 focus:border-gold-500/55 focus:bg-stone-900 placeholder:text-stone-600"
                        />
                      </div>
                      <div className="relative">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10">
                          <AtSign size={18} className="md:hidden text-stone-500" />
                          <AtSign size={16} className="hidden md:block text-stone-500" />
                        </div>
                        <input
                          type="email"
                          required
                          placeholder="Email Address"
                          value={form.email}
                          onChange={update('email')}
                          aria-label="Email Address"
                          className="w-full bg-stone-900/90 border-2 border-stone-700/70 px-14 py-[18px] md:py-5 text-[16px] md:text-[15px] text-stone-200 rounded-sm outline-none transition-all duration-300 focus:border-gold-500/55 focus:bg-stone-900 placeholder:text-stone-600"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10">
                        <Phone size={18} className="md:hidden text-stone-500" />
                        <Phone size={16} className="hidden md:block text-stone-500" />
                      </div>
                      <input
                        type="tel"
                        placeholder="Phone Number (optional)"
                        value={form.phone}
                        onChange={update('phone')}
                        aria-label="Phone Number (optional)"
                        className="w-full bg-stone-900/90 border-2 border-stone-700/70 px-14 py-[18px] md:py-5 text-[16px] md:text-[15px] text-stone-200 rounded-sm outline-none transition-all duration-300 focus:border-gold-500/55 focus:bg-stone-900 placeholder:text-stone-600"
                      />
                    </div>

                    {/* AI systems chips */}
                    <div>
                      <label className="text-[11px] font-bold tracking-[0.25em] uppercase text-stone-500 mb-3 md:mb-4 block">
                        AI System Needed
                      </label>
                      <div className="flex flex-wrap gap-2.5 md:gap-3">
                        {INTERESTS.map((int) => (
                          <button
                            key={int}
                            type="button"
                            onClick={() => setForm({ ...form, interest: int })}
                            className={`px-4 py-3 md:px-5 md:py-3 text-[12px] font-medium border-2 rounded-sm transition-all duration-300 min-h-[44px] ${
                              form.interest === int
                                ? 'border-gold-500/55 text-gold-400 bg-gold-500/[0.12]'
                                : 'border-stone-700/60 text-stone-500 hover:border-stone-600/70 hover:text-stone-400'
                            }`}
                          >
                            {int}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <div className="absolute left-5 top-5 z-10">
                        <MessageSquare size={18} className="md:hidden text-stone-500" />
                        <MessageSquare size={16} className="hidden md:block text-stone-500" />
                      </div>
                      <textarea
                        rows={5}
                        placeholder="Tell us about your workflow and what you'd like automated..."
                        value={form.message}
                        onChange={update('message')}
                        aria-label="Message about your workflow"
                        className="w-full bg-stone-900/90 border-2 border-stone-700/70 px-14 py-5 text-[16px] md:text-[15px] text-stone-200 rounded-sm outline-none transition-all duration-300 focus:border-gold-500/55 focus:bg-stone-900 resize-none placeholder:text-stone-600"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-primary justify-center py-5 md:py-5 text-[13px] tracking-[0.25em] disabled:opacity-50 disabled:cursor-not-allowed mt-2 md:mt-4 rounded-sm min-h-[52px]"
                      aria-label="Submit consultation request"
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-stone-900 border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          Book Your Free AI Strategy Session
                          <ArrowRight size={15} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact info below - improved styling */}
            <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              <a href="mailto:hello@mehans.space" className="group flex flex-col items-center gap-3 p-5 md:p-6 border border-stone-700/50 hover:border-gold-500/40 bg-stone-900/40 hover:bg-gold-500/[0.05] rounded-sm transition-all duration-300 min-h-[80px] md:min-h-0" aria-label="Email us at hello@mehans.space">
                <Mail size={22} className="md:hidden text-gold-500/60 group-hover:text-gold-500 transition-colors duration-300" />
                <Mail size={20} className="hidden md:block text-gold-500/60 group-hover:text-gold-500 transition-colors duration-300" />
                <span className="text-stone-400 group-hover:text-gold-500 text-[13px] font-medium transition-colors duration-300">hello@mehans.space</span>
              </a>
              <a href="tel:+212710891662" className="group flex flex-col items-center gap-3 p-5 md:p-6 border border-stone-700/50 hover:border-gold-500/40 bg-stone-900/40 hover:bg-gold-500/[0.05] rounded-sm transition-all duration-300 min-h-[80px] md:min-h-0" aria-label="Call us at +212 710 891 662">
                <Phone size={22} className="md:hidden text-gold-500/60 group-hover:text-gold-500 transition-colors duration-300" />
                <Phone size={20} className="hidden md:block text-gold-500/60 group-hover:text-gold-500 transition-colors duration-300" />
                <span className="text-stone-400 group-hover:text-gold-500 text-[13px] font-medium transition-colors duration-300">+212 710 891 662</span>
              </a>
              <div className="flex flex-col items-center gap-3 p-5 md:p-6 border border-stone-700/50 bg-stone-900/40 rounded-sm">
                <MapPin size={22} className="md:hidden text-gold-500/60" />
                <MapPin size={20} className="hidden md:block text-gold-500/60" />
                <span className="text-stone-500 text-[13px]">Mahaj Riad, Rabat</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
