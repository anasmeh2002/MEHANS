import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function LoadingScreen() {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 600);
    const t2 = setTimeout(() => setPhase('out'), 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <AnimatePresence>
      {phase !== 'out' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-void flex flex-col items-center justify-center"
        >
          {/* Fine grid */}
          <div className="absolute inset-0 grid-bg-fine opacity-100 pointer-events-none" />

          {/* Horizontal rule top/bottom */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[38%] left-0 right-0 h-px bg-stone-800/50 origin-left"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.0, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-[38%] left-0 right-0 h-px bg-stone-800/50 origin-right"
          />

          {/* Center content */}
          <div className="relative flex flex-col items-center gap-9">
            {/* Mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-12 h-12 border border-gold-500/80 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className="w-4 h-4 bg-gold-500"
              />
              {/* Rotating outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-2.5 border border-gold-500/20 border-t-gold-500/60"
              />
            </motion.div>

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <p className="font-display text-[26px] font-medium tracking-[0.32em] text-stone-100 mb-2">
                MEHANS
              </p>
              <p className="text-[9px] font-semibold tracking-[0.45em] uppercase text-gold-500/70">
                AI Automation for Real Estate
              </p>
            </motion.div>

            {/* Progress line */}
            <div className="w-32 h-px bg-stone-800 overflow-hidden">
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-gold-500"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
