import { motion } from 'framer-motion';
import { Building2, CalendarDays, CheckCircle2 } from 'lucide-react';
import { experience } from '../data/portfolio';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading id="experience-title" eyebrow="Experience" title="Professional experience" />

        <ol className="relative">
          {/* timeline rail */}
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-[19px] top-2 w-[2px] rounded-full bg-gradient-to-b from-[#7666f5] via-[#7ab8ff]/50 to-transparent sm:left-[23px]"
          />
          {experience.map((job, idx) => (
            <li key={job.role + job.company} className="relative pl-14 sm:pl-20">
              <span
                aria-hidden="true"
                className="absolute left-0 top-6 grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[#7666f5] to-[#7ab8ff] text-white shadow-[0_10px_30px_-8px_rgba(109,74,255,.7)] sm:h-12 sm:w-12"
              >
                <Building2 size={20} />
              </span>

              <Reveal delay={idx * 0.1}>
                <article className="gradient-border is-live glass rounded-[28px] p-6 sm:p-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-ink sm:text-2xl">{job.role}</h3>
                      <p className="mt-1 text-base font-semibold text-accent-ink">{job.company}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="chip">
                        <CalendarDays size={14} aria-hidden="true" /> {job.period}
                      </span>
                      {job.current && (
                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                          </span>
                          Current role
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="mt-7 grid gap-3 md:grid-cols-2">
                    {job.responsibilities.map((r, i) => (
                      <motion.li
                        key={r}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 + i * 0.06 }}
                        className="flex items-start gap-3 rounded-2xl border border-[var(--line)] bg-[var(--glass-strong)] p-4"
                      >
                        <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-accent-ink" aria-hidden="true" />
                        <span className="text-[0.95rem] leading-relaxed text-ink">{r}</span>
                      </motion.li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
