import { BookOpenText, CalendarDays, ExternalLink, GraduationCap, Microscope, School, Presentation } from 'lucide-react';
import { education, publication } from '../data/portfolio';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="flex flex-col">
      <SectionHeading id="education-title" eyebrow="Education" title="Academic background" />
      <Reveal className="flex-1">
        <article className="gradient-border glass relative h-full overflow-hidden rounded-[28px] p-6 sm:p-8">
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-[#7c5cff]/25 to-[#4f7cff]/10 blur-2xl"
          />
          <div className="relative flex items-start gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#7c5cff] to-[#4f7cff] text-white shadow-[0_10px_30px_-8px_rgba(109,74,255,.7)]">
              <GraduationCap size={26} aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-xl font-bold leading-snug text-ink sm:text-2xl">{education.degree}</h3>
              <p className="mt-2 flex items-start gap-2 text-muted">
                <School size={17} className="mt-0.5 shrink-0 text-accent-ink" aria-hidden="true" />
                {education.institution}
              </p>
            </div>
          </div>

          <dl className="relative mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--glass-strong)] p-4">
              <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
                <CalendarDays size={14} aria-hidden="true" /> Duration
              </dt>
              <dd className="mt-1.5 text-sm font-semibold text-ink sm:text-base">{education.period}</dd>
            </div>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--glass-strong)] p-4">
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted">CGPA</dt>
              <dd className="mt-1 font-display text-3xl font-bold text-gradient">{education.cgpa}</dd>
            </div>
          </dl>
        </article>
      </Reveal>
    </section>
  );
}

function Research() {
  return (
    <section id="publication" aria-labelledby="publication-title" className="flex flex-col">
      <SectionHeading id="publication-title" eyebrow="Research" title="Publication" />
      <Reveal delay={0.1} className="flex-1">
        <article className="gradient-border glass relative h-full overflow-hidden rounded-[28px] p-6 sm:p-8">
          <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-0 dark:opacity-20" />
          <div
            aria-hidden="true"
            className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-gradient-to-tr from-[#4f7cff]/25 to-[#c084fc]/15 blur-2xl"
          />
          <div className="relative flex items-center gap-3">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent-soft text-accent-ink">
              <Microscope size={26} aria-hidden="true" />
            </span>
            <span className="chip">
              <BookOpenText size={14} aria-hidden="true" /> Conference paper
            </span>
          </div>

          <h3 className="relative mt-6 text-xl font-bold leading-snug text-ink sm:text-2xl">{publication.title}</h3>

          <div className="relative mt-6 flex items-start gap-3 rounded-2xl border border-[var(--line)] bg-[var(--glass-strong)] p-4">
            <Presentation size={19} className="mt-0.5 shrink-0 text-accent-ink" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-ink sm:text-base">
              Presented at the <span className="font-semibold">{publication.venue}</span>, {publication.host}.
            </p>
          </div>

          {publication.url && (
            <a href={publication.url} target="_blank" rel="noreferrer" className="btn btn-primary relative mt-6">
              Read Publication <ExternalLink size={16} />
            </a>
          )}
        </article>
      </Reveal>
    </section>
  );
}

/** Education and Research sit side by side on large screens (Education first, as ordered). */
export default function EducationResearch() {
  return (
    <div className="relative py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-8">
        <Education />
        <Research />
      </div>
    </div>
  );
}
