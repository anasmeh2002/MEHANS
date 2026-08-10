import { AnimatedSection } from './AnimatedSection';

interface Props {
  label: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  titleClassName?: string;
}

export function SectionHeader({ label, title, subtitle, align = 'center', titleClassName = '' }: Props) {
  return (
    <div className={`mb-12 md:mb-14 ${align === 'center' ? 'text-center' : ''}`}>
      <AnimatedSection delay={0}>
        <div className={`flex items-center gap-3 mb-6 ${align === 'center' ? 'justify-center' : ''}`}>
          <div className="w-6 h-px bg-gold-500" />
          <span className="section-label">{label}</span>
          <div className="w-6 h-px bg-gold-500" />
        </div>
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <h2 className={`section-title mb-6 ${align === 'center' ? 'mx-auto max-w-4xl' : ''} ${titleClassName}`}>
          {title}
        </h2>
      </AnimatedSection>
      {subtitle && (
        <AnimatedSection delay={0.2}>
          <p className={`section-subtitle ${align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-xl'}`}>
            {subtitle}
          </p>
        </AnimatedSection>
      )}
    </div>
  );
}
