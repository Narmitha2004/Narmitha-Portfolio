import { motion } from 'framer-motion';
import { ArrowUpRight, Briefcase, MapPin, Github, Linkedin, Mail } from 'lucide-react';
import { about, focusAreas, profile } from '../data/portfolio';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import { SectionShapes } from './FloatingShapes';

const tile = 'gradient-border glass h-full rounded-[26px] p-6 transition-transform duration-500 hover:-translate-y-1 sm:p-7';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-20 lg:py-28">
      <SectionShapes variant="a" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading id="about-title" eyebrow="About me" title="Building practical software, end to end" />

        {/* Bento grid */}
        <div className="grid auto-rows-auto grid-cols-1 gap-4 md:grid-cols-6 lg:gap-5">
          <Reveal className="md:col-span-4 md:row-span-2">
            <div className={`${tile} flex flex-col justify-between`}>
              <div>
                <span className="chip">Who I am</span>
                <p className="mt-5 text-lg leading-relaxed text-ink sm:text-xl sm:leading-relaxed">{about}</p>
              </div>
              <a
                href="#contact"
                className="mt-8 inline-flex w-fit items-center gap-1.5 rounded-full text-sm font-semibold text-accent-ink hover:underline"
              >
                Get in touch <ArrowUpRight size={16} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="md:col-span-2">
            <div className={tile}>
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#7666f5] to-[#7ab8ff] text-white">
                <Briefcase size={20} />
              </span>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted">Currently</p>
              <p className="mt-1 font-display text-lg font-semibold text-ink">{profile.role}</p>
              <p className="text-sm text-muted">
                {profile.company} · Since {profile.since}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.14} className="md:col-span-2">
            <div className={tile}>
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent-soft text-accent-ink">
                <MapPin size={20} />
              </span>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted">Based in</p>
              <p className="mt-1 font-display text-lg font-semibold text-ink">{profile.location}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-4">
            <div className={tile}>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">What I build</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {focusAreas.map(({ icon: Icon, title, stack }) => (
                  <motion.div
                    key={title}
                    whileHover={{ y: -4 }}
                    className="rounded-2xl border border-[var(--line)] bg-[var(--glass-strong)] p-4"
                  >
                    <Icon size={22} className="text-accent-ink" aria-hidden="true" />
                    <p className="mt-3 font-semibold text-ink">{title}</p>
                    <p className="text-sm text-muted">{stack}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16} className="md:col-span-2">
            <div className={`${tile} flex flex-col justify-between`}>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Find me online</p>
              <div className="mt-4 flex gap-2">
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="icon-btn" aria-label="LinkedIn profile">
                  <Linkedin size={18} />
                </a>
                <a href={profile.github} target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub profile">
                  <Github size={18} />
                </a>
                <a href={`mailto:${profile.email}`} className="icon-btn" aria-label="Send an email">
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
