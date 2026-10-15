import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Sun, X, ArrowUpRight } from 'lucide-react';
import { navLinks, profile } from '../data/portfolio';
import { useActiveSection } from '../hooks/useActiveSection';
import MagneticButton from './ui/MagneticButton';

const ids = navLinks.map((l) => l.id);

export default function Navbar({ theme, onToggleTheme }) {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const ThemeIcon = theme === 'dark' ? Sun : Moon;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-[22px] px-3 py-2.5 transition-all duration-500 sm:px-4 ${
          scrolled ? 'glass-strong' : 'border border-transparent'
        }`}
      >
        <a href="#home" className="flex items-center gap-3 rounded-xl" aria-label={`${profile.name} — home`}>
          <span className="grid h-10 w-10 place-items-center rounded-[13px] bg-gradient-to-br from-[#7666f5] to-[#7ab8ff] font-display text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(109,74,255,.8)]">
            {profile.initials}
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-[0.95rem] font-semibold text-ink">{profile.name}</span>
            <span className="block text-xs text-muted">{profile.role}</span>
          </span>
        </a>

        <ul className="hidden items-center gap-0.5 rounded-full p-1 xl:flex">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id} className="relative">
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative z-10 block rounded-full px-3 py-2 text-[0.85rem] font-medium transition-colors ${
                    isActive ? 'text-accent-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {link.label}
                </a>
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-accent-soft ring-1 ring-[var(--line)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            className="icon-btn"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid place-items-center"
              >
                <ThemeIcon size={18} />
              </motion.span>
            </AnimatePresence>
          </button>
          <MagneticButton href="#contact" className="btn btn-primary hidden !min-h-[44px] sm:inline-flex">
            Let&apos;s Talk <ArrowUpRight size={16} />
          </MagneticButton>
          <button
            className="icon-btn xl:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 -z-10 bg-[#140f26]/30 backdrop-blur-sm xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-menu"
              className="glass-strong mx-auto mt-2 max-w-7xl rounded-[22px] p-3 xl:hidden"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <ul className="grid gap-1 sm:grid-cols-2">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={active === link.id ? 'true' : undefined}
                      className={`flex min-h-[48px] items-center rounded-2xl px-4 text-[0.95rem] font-medium transition-colors ${
                        active === link.id ? 'bg-accent-soft text-accent-ink' : 'text-ink hover:bg-accent-soft'
                      }`}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary mt-3 w-full sm:hidden">
                Let&apos;s Talk <ArrowUpRight size={16} />
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
