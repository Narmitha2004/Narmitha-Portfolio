import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, MapPin } from 'lucide-react';
import { highlights, profile } from '../data/portfolio';
import MagneticButton from './ui/MagneticButton';
import TechIcon from './ui/TechIcon';
import { useFinePointer } from '../hooks/useFinePointer';

const ease = [0.22, 1, 0.36, 1];

/** Types out the role once, then keeps a blinking caret. */
function TypedRole({ text }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? text.length : 0);

  useEffect(() => {
    if (reduce) {
      setShown(text.length);
      return undefined;
    }
    let i = 0;
    let id;
    const start = setTimeout(() => {
      id = setInterval(() => {
        i += 1;
        setShown(i);
        if (i >= text.length) clearInterval(id);
      }, 50);
    }, 700);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [text, reduce]);

  return (
    <span className="relative inline-flex items-center">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="text-gradient">
        {text.slice(0, shown)}
      </span>
      <span aria-hidden="true" className="ml-1 inline-block h-[1em] w-[3px] rounded-full bg-accent motion-safe:animate-pulse" />
    </span>
  );
}

/** Cycles through the highlight words. */
function Rotator({ words }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return undefined;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [words.length, reduce]);

  return (
    <span className="relative inline-grid h-9 min-w-[15.5rem] items-center overflow-hidden rounded-full border border-[var(--line)] bg-[var(--glass-strong)] px-4 shadow-[var(--shadow)]">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          initial={{ y: '120%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-120%', opacity: 0 }}
          transition={{ duration: 0.55, ease }}
          className="whitespace-nowrap font-bold text-accent-ink"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const orbitTech = ['Flutter', 'React JS', 'Spring Boot', 'AWS', 'Docker', 'Java'];

/** Developer-themed hero visual: 3D braces, glass orbs, code window and orbiting tech. */
function DevScene() {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 16 });
  const sry = useSpring(ry, { stiffness: 120, damping: 16 });

  const onMove = (e) => {
    if (!fine) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };
  const float = (delay = 0, y = 16, duration = 8) =>
    reduce ? {} : { animate: { y: [0, -y, 0] }, transition: { duration, delay, repeat: Infinity, ease: 'easeInOut' } };
  const sway = (delay = 0) =>
    reduce
      ? {}
      : {
          animate: { rotateY: [-24, 22, -24], rotateX: [8, -6, 8], y: [0, -12, 0] },
          transition: { duration: 10, delay, repeat: Infinity, ease: 'easeInOut' },
        };

  return (
    <motion.div
      aria-hidden="true"
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="relative mx-auto h-[400px] w-full max-w-[560px] sm:h-[480px] lg:h-[540px]"
      style={{ perspective: 1100 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease }}
    >
      {/* orbit ring with tech icons */}
      <div
        className="absolute left-1/2 top-1/2 aspect-square w-[92%] max-w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-dashed border-[var(--line)]"
        style={reduce ? undefined : { animation: 'orbit 48s linear infinite' }}
      >
        <div className="absolute inset-[14%] rounded-full border border-[var(--line)]" />
        {orbitTech.map((t, i) => {
          const a = (i / orbitTech.length) * 360;
          const rad = (a * Math.PI) / 180;
          return (
            <span
              key={t}
              className="absolute h-0 w-0"
              style={{ left: `${50 + 50 * Math.sin(rad)}%`, top: `${50 - 50 * Math.cos(rad)}%` }}
            >
              <span
                className="tech-tile absolute -left-5 -top-5 h-10 w-10 rounded-xl"
                style={reduce ? undefined : { animation: 'counter-orbit 48s linear infinite' }}
              >
                <TechIcon name={t} size={22} />
              </span>
            </span>
          );
        })}
      </div>

      {/* orbs + geometry */}
      <motion.span
        {...float(0, 16, 9)}
        className="absolute right-[4%] top-[2%] h-40 w-40 rounded-full sm:h-48 sm:w-48"
        style={{
          background:
            'radial-gradient(circle at 32% 28%, rgba(255,255,255,.95) 0 7%, transparent 28%), radial-gradient(circle at 70% 78%, rgba(122,184,255,.7), transparent 58%), radial-gradient(circle, #b9a8ff, #7666f5 72%)',
          boxShadow: 'inset -14px -18px 36px rgba(60,40,170,.4), 0 40px 70px -28px #7666f5',
        }}
      />
      <motion.span
        {...float(1, 14, 7)}
        className="absolute bottom-[10%] left-[2%] h-20 w-20 rounded-full border border-white/60 backdrop-blur-md"
        style={{
          background: 'radial-gradient(circle at 30% 26%, rgba(255,255,255,.9) 0 6%, transparent 24%), rgba(255,255,255,.18)',
          boxShadow: 'inset 0 0 26px rgba(255,255,255,.4), 0 20px 40px -18px #7666f5',
        }}
      />
      <motion.span
        {...float(0.5, 10, 6)}
        className="absolute left-[44%] top-0 h-8 w-8 rounded-full"
        style={{ background: 'radial-gradient(circle at 30% 30%, #fff 0 10%, #7ab8ff 60%, #4d7fe0)' }}
      />
      <motion.span
        className="absolute bottom-[16%] right-[16%] h-12 w-12 rounded-xl border-2 border-accent"
        style={{ boxShadow: '0 0 22px -2px var(--accent), inset 0 0 18px -6px var(--accent)' }}
        animate={reduce ? { rotate: 45 } : { rotate: [45, 405] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />
      <motion.span
        {...float(2, 12, 8)}
        className="absolute left-[12%] top-[16%] h-7 w-7 bg-gradient-to-br from-[#7ab8ff] to-[#7666f5] opacity-85"
        style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }}
      />

      {/* 3D braces */}
      <motion.span {...sway(0)} className="brace absolute -left-[2%] top-[8%] text-[130px] sm:text-[170px] lg:text-[200px]">
        {'{'}
      </motion.span>
      <motion.span {...sway(-5)} className="brace absolute -right-[1%] bottom-[2%] text-[130px] sm:text-[170px] lg:text-[200px]">
        {'}'}
      </motion.span>

      {/* code window */}
      <motion.div
        style={{ rotateX: srx, rotateY: sry, background: 'var(--code-bg)' }}
        className="absolute left-1/2 top-1/2 w-[88%] max-w-[400px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[22px] border border-[var(--glass-border)] shadow-[var(--shadow-lg)] backdrop-blur-xl"
      >
        <div className="flex items-center gap-2 border-b border-[var(--line)] px-4 py-3">
          <i className="h-[11px] w-[11px] rounded-full bg-[#ff6b81]" />
          <i className="h-[11px] w-[11px] rounded-full bg-[#ffc857]" />
          <i className="h-[11px] w-[11px] rounded-full bg-[#4fd1a1]" />
          <span className="ml-2 font-mono text-xs text-muted">developer.dart</span>
        </div>
        <pre className="overflow-x-auto px-[18px] pb-[18px] pt-4 font-mono text-[0.66rem] leading-[1.75] text-ink sm:text-[0.8rem]">
          <span className="code-k">class</span> <span className="code-t">Developer</span> {'{'}
          {'\n  '}<span className="code-k">final</span> name    = <span className="code-s">'Narmitha V'</span>;
          {'\n  '}<span className="code-k">final</span> role    = <span className="code-s">'Software Developer'</span>;
          {'\n  '}<span className="code-k">final</span> company = <span className="code-s">'Nexzware Technologies'</span>;
          {'\n\n  '}<span className="code-k">final</span> stack = [<span className="code-s">'Flutter'</span>, <span className="code-s">'React'</span>,
          {'\n                 '}<span className="code-s">'Spring Boot'</span>, <span className="code-s">'AWS'</span>];
          {'\n\n  '}<span className="code-t">String</span> <span className="code-k">get</span> <span className="code-f">focus</span> =&gt;{' '}
          <span className="code-s">'Mobile · Web · Cloud'</span>;{'\n}'}
        </pre>
      </motion.div>

      {/* floating info badges */}
      <motion.div {...float(0.3, 10, 7)} className="glass absolute bottom-[12%] left-0 z-10 hidden items-center gap-2.5 rounded-2xl px-3.5 py-2.5 sm:flex">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#7666f5] to-[#7ab8ff] font-mono text-xs text-white">&lt;/&gt;</span>
        <span className="leading-tight">
          <span className="block text-[0.68rem] font-semibold uppercase tracking-wider text-muted">Building</span>
          <span className="block text-sm font-bold text-ink">Mobile &amp; Web Apps</span>
        </span>
      </motion.div>
      <motion.div {...float(1.4, 10, 8)} className="glass absolute right-0 top-[12%] z-10 hidden items-center gap-2.5 rounded-2xl px-3.5 py-2.5 sm:flex">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#7666f5] to-[#7ab8ff] font-mono text-xs text-white">{'{ }'}</span>
        <span className="leading-tight">
          <span className="block text-[0.68rem] font-semibold uppercase tracking-wider text-muted">Since</span>
          <span className="block text-sm font-bold text-ink">{profile.since}</span>
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const item = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section id="home" aria-label="Introduction" className="relative overflow-hidden pb-16 pt-32 sm:pt-36 lg:pb-24 lg:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="relative z-10 min-w-0">
          <motion.span {...item(0.1)} className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2 pr-4 text-sm font-semibold text-ink">
            <span className="relative grid h-5 w-5 place-items-center rounded-full bg-emerald-500/15">
              <span className="absolute h-2 w-2 rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {profile.role} at {profile.company}
          </motion.span>

          <motion.h1 {...item(0.2)} className="mt-6 text-[2.6rem] font-extrabold leading-[1.05] tracking-[-0.04em] text-ink sm:text-6xl lg:text-[4.4rem]">
            Hi, I&apos;m <span className="text-gradient">{profile.name}</span>
          </motion.h1>

          <motion.p {...item(0.32)} className="mt-4 min-h-[1.4em] font-display text-xl font-semibold sm:text-2xl lg:text-[1.85rem]">
            <TypedRole text={profile.role} />
          </motion.p>

          <motion.p {...item(0.44)} className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.tagline}
          </motion.p>

          <motion.div {...item(0.5)} className="mt-5 flex flex-wrap items-center gap-2.5 text-sm text-muted">
            <span>Focused on</span>
            <Rotator words={highlights} />
          </motion.div>

          <motion.div {...item(0.58)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MagneticButton href="#projects" className="btn btn-primary w-full sm:w-auto">
              View My Work <ArrowRight size={17} />
            </MagneticButton>
            <MagneticButton href={profile.resume} download className="btn btn-ghost w-full sm:w-auto">
              Download Resume <Download size={17} />
            </MagneticButton>
          </motion.div>

          <motion.div {...item(0.68)} className="mt-8 flex flex-wrap items-center gap-3">
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="icon-btn" aria-label="LinkedIn profile">
              <Linkedin size={19} />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub profile">
              <Github size={19} />
            </a>
            <span className="ml-1 flex items-center gap-1.5 text-sm text-muted">
              <MapPin size={16} className="text-accent-ink" aria-hidden="true" /> {profile.location}
            </span>
          </motion.div>
        </div>

        <div className="relative min-w-0">
          <DevScene />
        </div>
      </div>
    </section>
  );
}
