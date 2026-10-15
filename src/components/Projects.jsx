import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, ChevronDown, ExternalLink, Github, Layers } from 'lucide-react';
import { projects } from '../data/portfolio';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import TiltCard from './ui/TiltCard';
import TechIcon from './ui/TechIcon';

/** Real screenshot if provided, otherwise an abstract branded cover (never a fake screenshot). */
function Preview({ project, tall = false }) {
  const Icon = project.icon ?? Layers;
  return (
    <div
      className={`relative overflow-hidden rounded-[20px] bg-gradient-to-br ${project.gradient} ${tall ? 'aspect-[16/8]' : 'aspect-[16/10]'}`}
    >
      {project.image ? (
        <img src={project.image} alt={`${project.title} preview`} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <>
          <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-60" />
          <div aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
          <div aria-hidden="true" className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-[#1b1530]/20 blur-2xl" />
          <span
            aria-hidden="true"
            className="absolute left-5 top-4 font-display text-6xl font-extrabold text-white/25 sm:text-7xl"
          >
            {project.number}
          </span>
          <div className="absolute inset-0 grid place-items-center">
            <span className="grid h-16 w-16 place-items-center rounded-[20px] border border-white/40 bg-white/20 text-white shadow-[inset_0_1px_0_rgba(255,255,255,.4)] backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110">
              <Icon size={30} aria-hidden="true" />
            </span>
          </div>
          <div className="absolute bottom-3 right-3 flex gap-1.5" aria-hidden="true">
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} className="tech-tile h-8 w-8 rounded-lg !shadow-none">
                <TechIcon name={t} size={17} />
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProjectLinks({ project, size = 'sm' }) {
  const cls = size === 'sm' ? 'btn btn-ghost !min-h-[42px] !px-4 text-sm' : 'btn btn-ghost';
  return (
    <>
      {project.github && (
        <a href={project.github} target="_blank" rel="noreferrer" className={cls}>
          <Github size={16} /> GitHub
        </a>
      )}
      {project.demo && (
        <a href={project.demo} target="_blank" rel="noreferrer" className={cls}>
          <ExternalLink size={16} /> Live Demo
        </a>
      )}
    </>
  );
}

export default function Projects() {
  const categories = useMemo(() => ['All', ...new Set(projects.map((p) => p.category))], []);
  const [filter, setFilter] = useState('All');
  const [openId, setOpenId] = useState(null);
  const shown = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="projects-title" eyebrow="Featured projects" title="Selected work" />
          {categories.length > 2 && (
            <Reveal className="mb-10 md:mb-14">
              <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    aria-pressed={filter === c}
                    className={`relative min-h-[42px] rounded-full px-4 text-sm font-semibold transition-colors ${
                      filter === c ? 'text-white' : 'border border-[var(--line)] bg-[var(--glass-strong)] text-muted hover:text-ink'
                    }`}
                  >
                    {filter === c && (
                      <motion.span
                        layoutId="project-tab"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7666f5] to-[#7ab8ff]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative">{c}</span>
                  </button>
                ))}
              </div>
            </Reveal>
          )}
        </div>

        <motion.ul layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <motion.li
                layout
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <TiltCard className="gradient-border glass flex flex-col rounded-[28px] p-3">
                  <Preview project={p} />
                  <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="chip">{p.label ?? p.category}</span>
                      <span className="font-display text-sm font-semibold text-subtle">Project {p.number}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-bold leading-snug text-ink">{p.title}</h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{p.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                      {p.tech.map((t) => (
                        <li
                          key={t}
                          className="rounded-lg border border-[var(--line)] bg-[var(--glass-strong)] px-2.5 py-1 text-xs font-semibold text-ink"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                    <AnimatePresence initial={false}>
                      {openId === p.id && (
                        <motion.div
                          id={`details-${p.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pt-5 font-mono text-xs uppercase tracking-wider text-muted">Key features</p>
                          <ul className="mt-2.5 grid gap-2">
                            {p.features.map((f) => (
                              <li key={f} className="flex items-start gap-2.5 text-[0.93rem] text-ink">
                                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-accent-ink" aria-hidden="true" /> {f}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="mt-auto flex flex-wrap gap-2 pt-6">
                      <button
                        onClick={() => setOpenId(openId === p.id ? null : p.id)}
                        aria-expanded={openId === p.id}
                        aria-controls={`details-${p.id}`}
                        className="btn btn-primary !min-h-[42px] !px-4 text-sm"
                      >
                        {openId === p.id ? 'Hide Details' : 'View Details'}
                        <ChevronDown size={16} className={`transition-transform duration-300 ${openId === p.id ? 'rotate-180' : ''}`} />
                      </button>
                      <ProjectLinks project={p} />
                    </div>
                  </div>
                </TiltCard>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

    </section>
  );
}
