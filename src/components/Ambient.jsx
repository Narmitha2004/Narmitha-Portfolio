import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useFinePointer } from '../hooks/useFinePointer';

/** Subtle drifting particles on a fixed canvas. Pauses when the tab is hidden; static for reduced motion. */
export function Particles() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return undefined;
    const ctx = cv.getContext('2d');
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let W = 0;
    let H = 0;
    let pts = [];
    let frame = 0;

    const color = () => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#7666f5';
    let fill = color();

    const size = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = W < 640 ? 22 : 46;
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -(Math.random() * 0.25 + 0.05),
        a: Math.random() * 0.5 + 0.2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = fill;
      for (const p of pts) {
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -5) {
            p.y = H + 5;
            p.x = Math.random() * W;
          }
          if (p.x < -5) p.x = W + 5;
          if (p.x > W + 5) p.x = -5;
        }
        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reduce && !document.hidden) frame = requestAnimationFrame(draw);
    };

    const onVisible = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) frame = requestAnimationFrame(draw);
    };
    const onResize = () => {
      size();
      if (reduce) draw();
    };
    const themeObserver = new MutationObserver(() => {
      fill = color();
      if (reduce) draw();
    });

    size();
    draw();
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisible);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisible);
      themeObserver.disconnect();
    };
  }, [reduce]);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-[1] h-full w-full" />;
}

/** Soft violet glow that follows the mouse (desktop only). */
export function CursorGlow() {
  const ref = useRef(null);
  const enabled = useFinePointer();

  useEffect(() => {
    if (!enabled) return undefined;
    const el = ref.current;
    let raf = 0;
    let x = 0;
    let y = 0;
    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      el.style.opacity = '1';
      if (!raf)
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate(${x}px, ${y}px)`;
          raf = 0;
        });
    };
    const leave = () => {
      el.style.opacity = '0';
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 -z-[1] -ml-[260px] -mt-[260px] h-[520px] w-[520px] rounded-full opacity-0 transition-opacity duration-500"
      style={{ background: 'radial-gradient(closest-side, color-mix(in srgb, var(--accent) 16%, transparent), transparent)' }}
    />
  );
}
