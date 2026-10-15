import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { featuredSkills, skillCategories } from '../data/portfolio';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import TechIcon from './ui/TechIcon';
import { SectionShapes } from './FloatingShapes';

function FeaturedSkill({ name, index }) {
  const reduce = useReducedMotion();
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.6 }}
      whileHover={{ y: -6 }}
      className="gradient-border glass group flex flex-col items-center gap-3 rounded-[24px] px-3 py-5"
    >
      <motion.span
        className="tech-tile h-14 w-14 rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]"
        animate={reduce ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 4, delay: index * 0.35, repeat: Infinity, ease: 'easeInOut' }}
      >
        <TechIcon name={name} size={30} />
      </motion.span>
      <span className="text-center text-sm font-semibold text-ink">{name}</span>
    </motion.li>
  );
}

export default function Skills() {
  const [filter, setFilter] = useState('all');
  const tabs = [{ id: 'all', title: 'All' }, ...skillCategories.map((c) => ({ id: c.id, title: c.title }))];
  const visible = filter === 'all' ? skillCategories : skillCategories.filter((c) => c.id === filter);

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-20 lg:py-28">
      <SectionShapes variant="b" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="skills-title"
          eyebrow="Technical skills"
          title="Technologies I work with"
          description="Across mobile, web, backend and cloud — with core tools highlighted below."
        />

        <h3 className="sr-only">Core technologies</h3>
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-7 lg:gap-4">
          {featuredSkills.map((s, i) => (
            <FeaturedSkill key={s} name={s} index={i} />
          ))}
        </ul>

        <Reveal className="mt-12">
          <div
            role="group"
            aria-label="Filter skills by category"
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {tabs.map((t) => {
              const active = filter === t.id;
              return (
                <button
                  key={t.id}
                  aria-pressed={active}
                  onClick={() => setFilter(t.id)}
                  className={`relative min-h-[42px] shrink-0 rounded-full px-4 text-sm font-semibold transition-colors ${
                    active ? 'text-white' : 'border border-[var(--line)] bg-[var(--glass-strong)] text-muted hover:text-ink'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="skill-tab"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7666f5] to-[#7ab8ff]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{t.title}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.div layout className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((cat) => {
              const Icon = cat.icon;
              return (
                <motion.article
                  layout
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                  className={`gradient-border glass rounded-[26px] p-6 ${cat.wide && filter === 'all' ? 'sm:col-span-2' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent-soft text-accent-ink">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-ink">{cat.title}</h3>
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-2.5">
                    {cat.items.map((item) => {
                      const featured = featuredSkills.includes(item) || (item.startsWith('AWS') && featuredSkills.includes('AWS'));
                      return (
                        <motion.li
                          key={item}
                          whileHover={{ y: -3 }}
                          className={`flex items-center gap-2 rounded-xl border py-1.5 pl-1.5 pr-3 text-sm font-medium ${
                            featured
                              ? 'border-[#7666f5]/35 bg-gradient-to-r from-[#7666f5]/12 to-[#7ab8ff]/10 text-ink'
                              : 'border-[var(--line)] bg-[var(--glass-strong)] text-ink'
                          }`}
                        >
                          <span className="tech-tile h-7 w-7 rounded-lg !shadow-none">
                            <TechIcon name={item} size={16} />
                          </span>
                          {item}
                        </motion.li>
                      );
                    })}
                  </ul>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
