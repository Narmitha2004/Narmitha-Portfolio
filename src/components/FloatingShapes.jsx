import { motion, useReducedMotion } from 'framer-motion';

/**
 * Lightweight CSS "3D" objects (gradient-lit spheres, rings, pills, cubes).
 * Pure CSS + transform animation — no WebGL — so it stays fast on phones.
 */
function Float({ className, delay = 0, duration = 9, y = 18, rotate = 8 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      animate={reduce ? undefined : { y: [0, -y, 0], rotate: [0, rotate, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

export function HeroShapes() {
  return (
    <>
      <Float className="shape-ring left-[-3rem] top-24 hidden h-40 w-40 opacity-70 md:block" duration={12} rotate={20} />
      <Float className="shape-glass-sphere right-[8%] top-[62%] h-16 w-16" delay={1} duration={8} />
      <Float className="shape-sphere left-[46%] top-16 hidden h-10 w-10 lg:block" delay={0.5} duration={7} y={12} />
      <Float className="shape-pill bottom-10 left-[38%] hidden h-8 w-24 rotate-[-25deg] opacity-80 lg:block" delay={2} duration={10} />
    </>
  );
}

export function SectionShapes({ variant = 'a' }) {
  if (variant === 'a') {
    return (
      <>
        <Float className="shape-glass-sphere -right-6 top-10 hidden h-24 w-24 md:block" duration={11} />
        <Float className="shape-cube bottom-6 -left-4 hidden h-14 w-14 md:block" delay={1.2} duration={9} rotate={25} />
      </>
    );
  }
  return (
    <>
      <Float className="shape-ring -left-10 top-1/3 hidden h-28 w-28 opacity-60 md:block" duration={13} rotate={30} />
      <Float className="shape-sphere right-4 bottom-10 hidden h-12 w-12 md:block" delay={0.8} duration={8} />
    </>
  );
}
