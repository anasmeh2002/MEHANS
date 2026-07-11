import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const prefersReducedMotion = usePrefersReducedMotion();

  const springX = useSpring(x, { stiffness: 80, damping: 25 });
  const springY = useSpring(y, { stiffness: 80, damping: 25 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [prefersReducedMotion, x, y]);

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      style={{
        left: springX,
        top: springY,
        x: '-50%',
        y: '-50%',
      }}
      className="fixed pointer-events-none z-[9999] w-64 h-64 rounded-full mix-blend-screen"
      aria-hidden="true"
    >
      <div className="w-full h-full rounded-full bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)]" />
    </motion.div>
  );
}
