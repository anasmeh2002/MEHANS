import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { AnimatedSection } from '../ui/AnimatedSection';
import { ServiceSlug, navigate } from '../../router';

interface ServicePageProps {
  slug: ServiceSlug;
}

const slugToKey: Record<ServiceSlug, 'crm' | 'leadQualification' | 'whatsapp' | 'leadCapture'> = {
  'real-estate-crm': 'crm',
  'ai-lead-qualification': 'leadQualification',
  'whatsapp-automation': 'whatsapp',
  'lead-capture-automation': 'leadCapture',
};

const slugToIcon: Record<ServiceSlug, string> = {
  'real-estate-crm': 'Database',
  'ai-lead-qualification': 'Filter',
  'whatsapp-automation': 'MessageSquare',
  'lead-capture-automation': 'Magnet',
};

export function ServicePage({ slug }: ServicePageProps) {
  const { t } = useLanguage();
  const key = slugToKey[slug];
  const page = t.servicePages[key];
  const sp = t.servicePages;

  useEffect(() => {
    document.title = page.metaTitle;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute('content', page.metaDescription);

    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) canonicalEl.setAttribute('href', `https://mehans.space/services/${slug}`);
  }, [slug, page]);

  return (
    <div className="min-h-screen bg-void pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        {/* Back link */}
        <AnimatedSection delay={0}>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-stone-500 hover:text-gold-500 text-sm transition-colors duration-300 mb-12 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300 flip-rtl" />
            {sp.backHome}
          </button>
        </AnimatedSection>

        {/* Header */}
        <AnimatedSection delay={0.05}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-px bg-gold-500" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold-500">
              {page.eyebrow}
            </span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <h1 className="font-display font-semibold text-stone-100 leading-[1.1] mb-6"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em' }}>
            {page.headline}
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <p className="text-stone-400 text-[15px] md:text-[16px] leading-[1.8] max-w-2xl mb-16">
            {page.description}
          </p>
        </AnimatedSection>

        {/* Structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": page.title,
            "description": page.metaDescription,
            "provider": { "@type": "ProfessionalService", "name": "MEHANS", "url": "https://mehans.space" },
            "areaServed": "Morocco",
          })
        }} />

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-800/30 mb-16">
          {page.features.map((feature, i) => (
            <AnimatedSection key={i} delay={i * 0.06}>
              <div className="bg-stone-950 p-7 md:p-9 border border-stone-800/50 h-full">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold-500/30 flex items-center justify-center rounded-sm flex-shrink-0">
                    <Check size={16} className="text-gold-500" strokeWidth={2} />
                  </div>
                  <div>
                    <h2 className="text-stone-100 font-medium text-[15px] mb-2">{feature.title}</h2>
                    <p className="text-stone-500 text-[13px] leading-[1.75]">{feature.desc}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.3}>
          <div className="border border-gold-500/20 bg-gold-500/[0.03] rounded-lg p-8 md:p-12 text-center">
            <button
              onClick={() => navigate('/')}
              className="btn-primary inline-flex items-center gap-2 group"
            >
              {sp.bookCall}
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300 flip-rtl" />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
