import { useEffect, useRef, memo } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface ParticleFieldProps {
  count?: number;
  className?: string;
}

export const ParticleField = memo(({ count = 40, className = '' }: ParticleFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      life: 0,
      maxLife: Math.random() * 300 + 150,
    });

    particlesRef.current = Array.from({ length: count }, createParticle);

    let lastTime = 0;
    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      if (delta > 50) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const progress = p.life / p.maxLife;
        const fade = progress < 0.1 ? progress / 0.1 : progress > 0.8 ? (1 - progress) / 0.2 : 1;
        const alpha = p.opacity * fade;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${alpha})`;
        ctx.fill();

        if (p.life >= p.maxLife || p.y < 0 || p.x < 0 || p.x > canvas.width) {
          particlesRef.current[i] = createParticle();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [count, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
});
