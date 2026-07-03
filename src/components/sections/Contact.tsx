import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, Clock, MessageCircle } from 'lucide-react';
import { AnimatedSection } from '../ui/AnimatedSection';

const BUDGETS = ['Under 5K MAD/mo', '5K – 15K MAD/mo', '15K – 40K MAD/mo', '40K+ MAD/mo'];
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
    await new Promise((r) => setTimeout(r, 1100));
    setSent(true);
    setLoading(false);
  };

  return (
    <section id="contact" className="py-32 lg:py-40 bg-charcoal relative overflow-hidden">
      {/* Fine grid */}
      <div className="absolute inset-0 grid-bg-fine opacity-50 pointer-events-none" />

      {/* Circuit pattern */}
      <div className="absolute inset-0 circuit-bg opacity-30 pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold-500/[0.015] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 mb-18 items-end">
          <div>
            <AnimatedSection delay={0}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-gold-500" />
                <span className="section-label">Contact</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h2 className="section-title" style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.75rem)' }}>
                Schedule Your{' '}
                <span className="italic font-light text-stone-500">AI Consultation.</span>
              </h2>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.14}>
            <p className="section-subtitle leading-[1.85]">
              A senior MEHANS engineer will review your submission and reach you within 4 business hours.
            </p>
          </AnimatedSection>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12">

          {/* Info column */}
          <AnimatedSection delay={0.1}>
            <div className="flex flex-col gap-14">

              {/* Contact details */}
              <div className="flex flex-col gap-7">
                {[
                  { Icon: Mail, label: 'Email', value: 'hello@mehans.space', href: 'mailto:hello@mehans.space' },
                  { Icon: Phone, label: 'Phone', value: '+212 710 891 662', href: 'tel:+212710891662' },
                ].map(({ Icon, label, value, href }) => (
                  <a key={label} href={href} className="group flex items-center gap-6">
                    <div className="w-12 h-12 border border-stone-800 group-hover:border-gold-500/30 bg-void/50 flex items-center justify-center flex-shrink-0 transition-all duration-400 group-hover:bg-gold-500/5">
                      <Icon size={15} strokeWidth={1.5} className="text-stone-700 group-hover:text-gold-500 transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-[9px] font-bold tracking-[0.32em] uppercase text-stone-800 mb-1">{label}</div>
                      <span className="text-stone-400 group-hover:text-gold-500 text-[15px] transition-colors duration-300 font-medium">{value}</span>
                    </div>
                  </a>
                ))}
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 border border-stone-800 bg-void/50 flex items-center justify-center flex-shrink-0">
                    <MapPin size={15} strokeWidth={1.5} className="text-stone-700" />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold tracking-[0.32em] uppercase text-stone-800 mb-1">Office</div>
                    <span className="text-stone-500 text-[15px] leading-relaxed">Mahaj Riad<br />Rabat, Morocco</span>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="aspect-video border border-stone-800/40 overflow-hidden relative bg-void/30">
                <iframe
                  title="MEHANS — Rabat, Morocco"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.2!2d-6.8498!3d34.0131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDAwJzQ3LjIiTiA2wrA1MCc1OS4zIlc!5e0!3m2!1sen!2sma!4v1700000000000"
                  className="w-full h-full border-0 opacity-35 grayscale"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent pointer-events-none" />
              </div>

              {/* Hours */}
              <div className="border border-stone-800/40 px-8 py-7 relative overflow-hidden">
                {/* Gold accent */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-gold-500/30 via-gold-500/10 to-transparent" />

                <div className="flex items-center gap-2 mb-5">
                  <Clock size={11} className="text-stone-700" />
                  <div className="text-[9px] font-bold tracking-[0.32em] uppercase text-stone-700">Consultation Hours</div>
                </div>
                <div className="space-y-3.5">
                  {[
                    { d: 'Mon – Fri', h: '9:00 – 18:00' },
                    { d: 'Saturday', h: '10:00 – 14:00' },
                    { d: 'Sunday', h: 'By appointment' },
                  ].map((r) => (
                    <div key={r.d} className="flex justify-between text-[12px]">
                      <span className="text-stone-600">{r.d}</span>
                      <span className="text-stone-500">{r.h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection delay={0.18}>
            <div className="border border-stone-800/45 bg-void/60 relative overflow-hidden">
              {/* Gold top accent */}
              <div className="h-px bg-gradient-to-r from-gold-500/50 via-gold-500/15 to-transparent" />

              <div className="p-9 md:p-12">
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center gap-8 py-20 text-center"
                  >
                    <div className="w-16 h-16 border-2 border-gold-500/30 flex items-center justify-center relative">
                      <CheckCircle2 size={28} strokeWidth={1.5} className="text-gold-500" />
                      <div className="absolute -inset-3 border border-gold-500/10 rounded-full" />
                    </div>
                    <div>
                      <h3 className="font-display text-[26px] text-stone-100 mb-3">Consultation Requested</h3>
                      <p className="text-stone-600 text-[13px] leading-[1.8]">
                        A MEHANS engineer will reach you at{' '}
                        <span className="text-gold-500 font-medium">{form.email}</span>{' '}
                        within 4 business hours.
                      </p>
                    </div>
                    <button
                      onClick={() => setSent(false)}
                      className="text-stone-700 hover:text-stone-500 text-[11px] border-b border-stone-800 transition-colors duration-200"
                    >
                      Submit another request
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    {/* Name + email row */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <Field label="Full Name" required>
                        <input type="text" required placeholder="Your full name"
                          value={form.name} onChange={update('name')}
                          className="form-input" />
                      </Field>
                      <Field label="Email Address" required>
                        <input type="email" required placeholder="your@email.com"
                          value={form.email} onChange={update('email')}
                          className="form-input" />
                      </Field>
                    </div>

                    <Field label="Phone">
                      <input type="tel" placeholder="+212 710 891 662"
                        value={form.phone} onChange={update('phone')}
                        className="form-input" />
                    </Field>

                    {/* Budget chips */}
                    <Field label="Monthly Budget">
                      <div className="flex flex-wrap gap-2.5 pt-1.5">
                        {BUDGETS.map((b) => (
                          <Chip key={b} label={b} active={form.budget === b} onClick={() => setForm({ ...form, budget: b })} />
                        ))}
                      </div>
                    </Field>

                    {/* AI system chips */}
                    <Field label="AI System Needed">
                      <div className="flex flex-wrap gap-2.5 pt-1.5">
                        {INTERESTS.map((int) => (
                          <Chip key={int} label={int} active={form.interest === int} onClick={() => setForm({ ...form, interest: int })} />
                        ))}
                      </div>
                    </Field>

                    <Field label="Tell Us About Your Business">
                      <textarea rows={4} placeholder="Describe your current workflow, team size, main bottlenecks, and what you'd like AI to handle..."
                        value={form.message} onChange={update('message')}
                        className="form-input resize-none" />
                    </Field>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary justify-center mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-void border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          Schedule Consultation
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* Field wrapper */
function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-[9px] font-bold tracking-[0.32em] uppercase text-stone-700">
        {label}{required && <span className="text-gold-500/70 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

/* Chip button */
function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className={`px-4 py-2 text-[11px] font-medium border transition-all duration-300 ${
        active
          ? 'border-gold-500/50 text-gold-500 bg-gold-500/[0.08]'
          : 'border-stone-800 text-stone-700 hover:border-stone-700 hover:text-stone-500 hover:bg-stone-800/30'
      }`}
    >
      {label}
    </button>
  );
}
