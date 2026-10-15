import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin, Briefcase, Smartphone, Code2, Sparkles } from 'lucide-react';
import { profile } from '../data/portfolio';
import MagneticButton from './ui/MagneticButton';
import TechIcon from './ui/TechIcon';
import { HeroShapes } from './FloatingShapes';

const ease = [0.22, 1, 0.36, 1];

/** Types out the role once, then keeps a soft blinking caret. */
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
      }, 55);
    }, 900);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [text, reduce]);

  return (
    <span className="relative inline-block">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="text-gradient">
        {text.slice(0, shown)}
      </span>
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.12em] rounded-full bg-accent motion-safe:animate-pulse"
      />
    </span>
  );
}

function PhotoCard() {
  const [ok, setOk] = useState(true);
  const reduce = useReducedMotion();
  const float = (d = 0, y = 10) =>
    reduce ? {} : { animate: { y: [0, -y, 0] }, transition: { duration: 6, delay: d, repeat: Infinity, ease: 'easeInOut' } };

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[420px] lg:max-w-[460px]"
      initial={{ opacity: 0, scale: 0.94, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.35, ease }}
    >
      {/* soft purple glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-8 rounded-[48px] opacity-80 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(124,92,255,.45), rgba(79,124,255,.18), transparent)' }}
      />

      <div className="gradient-border is-live glass-strong relative rounded-[40px] p-3">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-gradient-to-br from-[#e9e3ff] via-[#f3efff] to-[#dfe7ff] dark:from-[#2a2147] dark:via-[#211b36] dark:to-[#1c2340]">
          {ok ? (
            <img
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              className="h-full w-full object-cover object-top"
              onError={() => setOk(false)}
              fetchpriority="high"
            />
          ) : (
            <div className="grid h-full w-full place-items-center">
              <span className="font-display text-7xl font-bold text-gradient sm:text-8xl">{profile.initials}</span>
            </div>
          )}
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#1b1530]/25 to-transparent" />
        </div>
      </div>

      {/* floating info cards — real details only */}
      <motion.div
        {...float(0.2)}
        className="glass-strong absolute -left-3 top-10 flex items-center gap-3 rounded-2xl px-3.5 py-3 sm:-left-10"
      >
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#7c5cff] to-[#4f7cff] text-white">
          <Briefcase size={17} />
        </span>
        <span className="leading-tight">
          <span className="block text-[0.7rem] font-semibold uppercase tracking-wider text-muted">Currently at</span>
          <span className="block text-sm font-semibold text-ink">{profile.company}</span>
        </span>
      </motion.div>

      <motion.div
        {...float(1.2, 12)}
        className="glass-strong absolute -right-3 top-[44%] flex items-center gap-2 rounded-2xl p-2.5 sm:-right-8"
        aria-label="Core stack: Flutter, React JS, Spring Boot"
      >
        {['Flutter', 'React JS', 'Spring Boot'].map((t) => (
          <span key={t} className="tech-tile h-10 w-10 rounded-xl" title={t}>
            <TechIcon name={t} size={22} />
          </span>
        ))}
      </motion.div>

      <motion.div
        {...float(0.7, 8)}
        className="glass-strong absolute -bottom-5 left-6 flex items-center gap-3 rounded-2xl px-3.5 py-3 sm:left-10"
      >
        <span className="flex -space-x-1.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#ede8ff] text-[#5132e0] ring-2 ring-white dark:ring-[#241e36]">
            <Smartphone size={15} />
          </span>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#e3ebff] text-[#2f5be0] ring-2 ring-white dark:ring-[#241e36]">
            <Code2 size={15} />
          </span>
        </span>
        <span className="text-sm font-semibold text-ink">Mobile &amp; Web Development</span>
      </motion.div>

      <motion.span
        aria-hidden="true"
        className="absolute -top-4 right-10 grid h-11 w-11 place-items-center rounded-2xl bg-white/80 text-[#6d4aff] shadow-lg dark:bg-white/10 dark:text-[#bba9ff]"
        {...(reduce ? {} : { animate: { rotate: [0, 12, 0], y: [0, -6, 0] }, transition: { duration: 7, repeat: Infinity } })}
      >
        <Sparkles size={20} />
      </motion.span>
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
    <section id="home" aria-label="Introduction" className="relative overflow-hidden pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-40">
      <HeroShapes />
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="relative z-10 text-center lg:text-left">
          <motion.p {...item(0.1)} className="eyebrow justify-center lg:justify-start">
            Hello, welcome
          </motion.p>

          <motion.h1
            {...item(0.2)}
            className="mt-5 text-[2.6rem] font-extrabold leading-[1.05] text-ink sm:text-6xl lg:text-[4.4rem]"
          >
            Hi, I&apos;m <span className="text-gradient">{profile.name}</span>
          </motion.h1>

          <motion.p {...item(0.32)} className="mt-4 min-h-[1.4em] font-display text-xl font-semibold sm:text-2xl lg:text-[1.9rem]">
            <TypedRole text={profile.role} />
          </motion.p>

          <motion.p {...item(0.44)} className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
            {profile.tagline}
          </motion.p>

          <motion.div {...item(0.56)} className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <MagneticButton href="#projects" className="btn btn-primary w-full sm:w-auto">
              View My Projects <ArrowRight size={17} />
            </MagneticButton>
            <MagneticButton href={profile.resume} download className="btn btn-ghost w-full sm:w-auto">
              Download Resume <Download size={17} />
            </MagneticButton>
          </motion.div>

          <motion.div {...item(0.68)} className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="icon-btn" aria-label="LinkedIn profile">
              <Linkedin size={19} />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub profile">
              <Github size={19} />
            </a>
            <a href={`mailto:${profile.email}`} className="icon-btn" aria-label={`Email ${profile.email}`}>
              <Mail size={19} />
            </a>
            <span className="mx-1 hidden h-6 w-px bg-[var(--line)] sm:block" aria-hidden="true" />
            <span className="flex items-center gap-1.5 text-sm text-muted">
              <MapPin size={16} className="text-accent-ink" /> {profile.location}
            </span>
          </motion.div>
        </div>

        <div className="relative z-10 px-4 sm:px-8 lg:px-0">
          <PhotoCard />
        </div>
      </div>
    </section>
  );
}
