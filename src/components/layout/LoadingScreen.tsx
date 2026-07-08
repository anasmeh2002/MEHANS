import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../i18n';

export function LoadingScreen() {
  const { t } = useLanguage();
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 700);
    const t2 = setTimeout(() => setPhase('out'), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <AnimatePresence>
      {phase !== 'out' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-void flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Fine grid */}
          <div className="absolute inset-0 grid-bg-fine opacity-100 pointer-events-none" />

          {/* Floating orbs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-gold-500/[0.03] blur-[100px] orb-animate"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-gold-500/[0.025] blur-[80px] orb-animate-2"
          />

          {/* Horizontal rules */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[40%] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent origin-left"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-[40%] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent origin-right"
          />

          {/* Center content */}
          <div className="relative flex flex-col items-center gap-12">
            {/* Logo mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative"
            >
              <div className="w-16 h-16 border-[1.5px] border-gold-500/90 flex items-center justify-center relative">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  className="w-5 h-5 bg-gold-500"
                />
                {/* Rotating outer ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-3 border border-gold-500/15 border-t-gold-500/50"
                />
                {/* Second rotating ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-5 border border-gold-500/10 border-b-gold-500/30"
                />
              </div>
            </motion.div>

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <p className="font-display text-[32px] font-medium tracking-[0.35em] text-stone-100 mb-3">
                {t.loading.text}
              </p>
              <p className="text-[10px] font-semibold tracking-[0.5em] uppercase text-gold-500/60">
                {t.loading.tagline}
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-40 h-[2px] bg-stone-800/60 overflow-hidden relative">
                <motion.div
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.65, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400"
                />
              </div>
            </motion.div>
          </div>

          {/* Corner accents */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute top-8 left-8 w-12 h-12 border-l border-t border-gold-500/20"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-gold-500/20"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
