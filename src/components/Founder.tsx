import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Founder() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section
      id="founder"
      ref={sectionRef}
      className="relative py-32 bg-[#050505] overflow-hidden"
      aria-labelledby="founder-heading"
    >
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.1)] to-transparent" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-[rgba(212,175,55,0.02)] blur-3xl -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-start"
          >
            {/* Outer gold frame glow */}
            <div
              className="absolute -inset-3 rounded-3xl opacity-30 blur-2xl"
              style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.4), transparent 70%)' }}
              aria-hidden="true"
            />

            {/* Portrait container */}
            <motion.div
              style={{ y: imgY }}
              className="relative w-72 h-96 lg:w-80 lg:h-[440px]"
            >
              {/* Thin gold border frame */}
              <div className="absolute inset-0 rounded-2xl border border-[rgba(212,175,55,0.4)] shadow-[0_0_40px_rgba(212,175,55,0.08),inset_0_1px_0_rgba(212,175,55,0.2)] overflow-hidden">
                {/* Glass overlay on portrait */}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] via-transparent to-transparent z-10" />

                {/* Founder image — upload founder-portrait.webp to /public/ to display */}
                <img
                  src="/founder-portrait.webp"
                  alt="Anas Mehdaoui, Founder & CEO of MEHANS"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                {/* Monogram fallback shown when image is missing */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]" aria-hidden="true">
                  <div className="text-center select-none">
                    <div className="text-6xl font-bold text-gold-gradient tracking-widest">AM</div>
                    <div className="text-xs text-[#5a5a5a] mt-2 uppercase tracking-[0.3em]">Founder</div>
                  </div>
                </div>

                {/* Bottom glass info bar */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-5 glass border-t border-[rgba(212,175,55,0.15)]">
                  <div className="text-base font-bold text-white tracking-wide">Anas Mehdaoui</div>
                  <div className="text-xs text-[#d4af37] tracking-widest uppercase mt-0.5">
                    Founder & CEO
                  </div>
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[rgba(212,175,55,0.6)] rounded-tl-2xl" aria-hidden="true" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[rgba(212,175,55,0.6)] rounded-tr-2xl" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[rgba(212,175,55,0.6)] rounded-bl-2xl" aria-hidden="true" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[rgba(212,175,55,0.6)] rounded-br-2xl" aria-hidden="true" />
            </motion.div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full glass gold-border">
              <span className="text-[10px] text-[#d4af37] tracking-widest uppercase font-medium">
                The Vision
              </span>
            </div>

            <h2
              id="founder-heading"
              className="text-4xl lg:text-5xl font-bold leading-tight mb-6"
            >
              Built by someone
              <br />
              <span className="text-gold-gradient">who hated losing leads.</span>
            </h2>

            <blockquote className="text-[#a0a0a0] text-lg leading-relaxed mb-10 border-l-2 border-[rgba(212,175,55,0.3)] pl-5">
              "I watched great companies lose great clients because no one replied fast enough.
              MEHANS exists so that never happens again."
            </blockquote>

            {/* Signature-style name display */}
            <div className="flex items-center gap-4 mb-10">
              <div>
                <div className="text-white font-semibold text-lg">Anas Mehdaoui</div>
                <div className="text-[#5a5a5a] text-sm">Founder & CEO, MEHANS</div>
              </div>
            </div>

            {/* Credentials */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Years in sales automation', value: '5+' },
                { label: 'Clients served', value: '120+' },
                { label: 'Pipeline built', value: '€12M+' },
                { label: 'Countries', value: '8' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="glass gold-border rounded-xl p-4"
                >
                  <div className="text-xl font-bold text-gold-gradient mb-0.5">{item.value}</div>
                  <div className="text-[11px] text-[#5a5a5a] uppercase tracking-wide leading-tight">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
