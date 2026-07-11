import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CursorGlow() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 70, damping: 22 });
  const sy = useSpring(y, { stiffness: 70, damping: 22 });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return (
    <motion.div
      style={{ left: sx, top: sy, x: '-50%', y: '-50%' }}
      className="fixed pointer-events-none z-[9999] w-80 h-80 rounded-full"
      aria-hidden="true"
    >
      <div className="w-full h-full rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.055)_0%,transparent_68%)]" />
    </motion.div>
  );
}
