import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, ExternalLink, Github, Layers } from 'lucide-react';
import { projects } from '../data/portfolio';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import TiltCard from './ui/TiltCard';
import TechIcon from './ui/TechIcon';
import Modal from './ui/Modal';

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
  const [selected, setSelected] = useState(null);
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
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6d4aff] to-[#4f7cff]"
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
                      <span className="chip">{p.category}</span>
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
                    <div className="mt-auto flex flex-wrap gap-2 pt-6">
                      <button onClick={() => setSelected(p)} className="btn btn-primary !min-h-[42px] !px-4 text-sm">
                        View Details <ArrowUpRight size={16} />
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

      <Modal open={!!selected} onClose={() => setSelected(null)} labelledBy="project-modal-title" maxWidth="max-w-3xl">
        {selected && (
          <div className="p-4 sm:p-6">
            <div className="group">
              <Preview project={selected} tall />
            </div>
            <div className="px-1 pb-2 pt-6 sm:px-3">
              <span className="chip">{selected.category}</span>
              <h3 id="project-modal-title" className="mt-3 pr-10 text-2xl font-bold text-ink sm:text-3xl">
                {selected.title}
              </h3>
              <p className="mt-4 leading-relaxed text-muted">{selected.description}</p>

              <h4 className="mt-7 text-sm font-bold uppercase tracking-wider text-ink">Key features</h4>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {selected.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-ink">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent-ink" aria-hidden="true" /> {f}
                  </li>
                ))}
              </ul>

              <h4 className="mt-7 text-sm font-bold uppercase tracking-wider text-ink">Tech stack</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {selected.tech.map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--glass)] py-1.5 pl-1.5 pr-3 text-sm font-medium text-ink"
                  >
                    <span className="tech-tile h-7 w-7 rounded-lg !shadow-none">
                      <TechIcon name={t} size={16} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>

              {(selected.github || selected.demo) && (
                <div className="mt-8 flex flex-wrap gap-2">
                  <ProjectLinks project={selected} size="md" />
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
