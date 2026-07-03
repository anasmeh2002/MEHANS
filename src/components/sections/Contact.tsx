import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { AnimatedSection } from '../ui/AnimatedSection';

const BUDGETS   = ['Under 5K MAD/mo', '5K – 15K MAD/mo', '15K – 40K MAD/mo', '40K+ MAD/mo'];
const INTERESTS = ['Lead Gen AI', 'WhatsApp AI', 'CRM Automation', 'Voice AI', 'Full-Stack AI', 'Custom System'];

export function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', phone: '', budget: '', interest: '', message: '' });
  const [sent, setSent]     = useState(false);
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
    <section id="contact" className="py-28 lg:py-36 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 grid-bg-fine opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16 items-end">
          <div>
            <AnimatedSection delay={0}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-px bg-gold-500" />
                <span className="section-label">Contact</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h2 className="section-title" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
                Schedule Your{' '}
                <span className="italic font-light text-stone-500">AI Consultation.</span>
              </h2>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.14}>
            <p className="section-subtitle">
              A senior MEHANS engineer will review your submission and reach you within 4 business hours.
            </p>
          </AnimatedSection>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.55fr] gap-12">

          {/* Info column */}
          <AnimatedSection delay={0.1}>
            <div className="flex flex-col gap-12">

              {/* Contact details */}
              <div className="flex flex-col gap-6">
                {[
                  { Icon: Mail,  label: 'Email',  value: 'hello@mehans.space', href: 'mailto:hello@mehans.space' },
                  { Icon: Phone, label: 'Phone',  value: '+212 710 891 662',    href: 'tel:+212710891662'         },
                ].map(({ Icon, label, value, href }) => (
                  <a key={label} href={href} className="group flex items-center gap-5">
                    <div className="w-11 h-11 border border-stone-800 group-hover:border-stone-600 flex items-center justify-center flex-shrink-0 transition-all duration-300">
                      <Icon size={14} strokeWidth={1.5} className="text-stone-700 group-hover:text-gold-500 transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-[9px] font-bold tracking-[0.3em] uppercase text-stone-800 mb-0.5">{label}</div>
                      <span className="text-stone-400 group-hover:text-gold-500 text-[14px] transition-colors duration-300 font-medium">{value}</span>
                    </div>
                  </a>
                ))}
                <div className="flex items-start gap-5">
                  <div className="w-11 h-11 border border-stone-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={14} strokeWidth={1.5} className="text-stone-700" />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold tracking-[0.3em] uppercase text-stone-800 mb-0.5">Office</div>
                    <span className="text-stone-500 text-[14px] leading-relaxed">Mahaj Riad<br />Rabat, Morocco</span>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="aspect-video border border-stone-800/50 overflow-hidden relative">
                <iframe
                  title="MEHANS — Rabat, Morocco"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.2!2d-6.8498!3d34.0131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDAwJzQ3LjIiTiA2wrA1MCc1OS4zIlc!5e0!3m2!1sen!2sma!4v1700000000000"
                  className="w-full h-full border-0 opacity-40 grayscale"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Hours */}
              <div className="border border-stone-800/40 px-7 py-6">
                <div className="text-[9px] font-bold tracking-[0.3em] uppercase text-stone-700 mb-5">Consultation Hours</div>
                <div className="space-y-3">
                  {[
                    { d: 'Mon – Fri', h: '9:00 – 18:00' },
                    { d: 'Saturday',  h: '10:00 – 14:00' },
                    { d: 'Sunday',    h: 'By appointment' },
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
            <div className="border border-stone-800/50 bg-void/50 relative overflow-hidden">
              {/* Gold top accent */}
              <div className="h-px bg-gradient-to-r from-gold-500/50 via-gold-500/15 to-transparent" />

              <div className="p-8 md:p-10">
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center gap-6 py-16 text-center"
                  >
                    <div className="w-14 h-14 border border-gold-500/30 flex items-center justify-center">
                      <CheckCircle2 size={24} strokeWidth={1.5} className="text-gold-500" />
                    </div>
                    <div>
                      <h3 className="font-display text-[22px] text-stone-100 mb-2">Consultation Requested</h3>
                      <p className="text-stone-600 text-[13px] leading-relaxed">
                        A MEHANS engineer will reach you at{' '}
                        <span className="text-gold-500">{form.email}</span>{' '}
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
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    {/* Name + email row */}
                    <div className="grid sm:grid-cols-2 gap-5">
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
                      <div className="flex flex-wrap gap-2 pt-1">
                        {BUDGETS.map((b) => (
                          <Chip key={b} label={b} active={form.budget === b} onClick={() => setForm({ ...form, budget: b })} />
                        ))}
                      </div>
                    </Field>

                    {/* AI system chips */}
                    <Field label="AI System Needed">
                      <div className="flex flex-wrap gap-2 pt-1">
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
                      className="btn-primary justify-center mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border border-void border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          Schedule Consultation
                          <ArrowRight size={13} />
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

/* ── Field wrapper ── */
function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[9px] font-bold tracking-[0.3em] uppercase text-stone-700">
        {label}{required && ' *'}
      </label>
      {children}
    </div>
  );
}

/* ── Chip button ── */
function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className={`px-3 py-1.5 text-[11px] font-medium border transition-all duration-250 ${
        active
          ? 'border-gold-500/50 text-gold-500 bg-gold-500/[0.07]'
          : 'border-stone-800 text-stone-700 hover:border-stone-700 hover:text-stone-500'
      }`}
    >
      {label}
    </button>
  );
}
