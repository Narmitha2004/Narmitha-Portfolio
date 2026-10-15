import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { navLinks, profile } from '../data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-8 border-t border-[var(--line)] py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <a href="#home" className="flex items-center gap-3 rounded-xl">
            <span className="grid h-10 w-10 place-items-center rounded-[13px] bg-gradient-to-br from-[#7c5cff] to-[#4f7cff] font-display text-sm font-bold text-white">
              {profile.initials}
            </span>
            <span className="font-display text-lg font-semibold text-ink">{profile.name}</span>
          </a>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {profile.role} at {profile.company}. {profile.tagline}
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-3">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-sm text-muted transition-colors hover:text-accent-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-2">
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

      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-sm text-muted sm:flex-row sm:px-8">
        <p>
          © {year} {profile.name}. All rights reserved.
        </p>
        <a href="#home" className="inline-flex items-center gap-1.5 rounded-full font-medium hover:text-accent-ink">
          Back to top <ArrowUp size={15} />
        </a>
      </div>
    </footer>
  );
}
