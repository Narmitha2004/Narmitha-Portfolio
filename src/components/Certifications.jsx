import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Award, BadgeCheck, ChevronDown, Eye } from 'lucide-react';
import { certifications } from '../data/portfolio';
import SectionHeading from './ui/SectionHeading';
import Modal from './ui/Modal';
import { SectionShapes } from './FloatingShapes';

function CertCard({ cert, index, onPreview }) {
  const [open, setOpen] = useState(false);
  const detailsId = `cert-details-${index}`;
  return (
    <motion.li
      className="flex"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
    >
      <motion.article
        whileHover={{ y: -8 }}
        className="gradient-border glass relative flex h-full flex-col overflow-hidden rounded-[26px] p-6 transition-shadow hover:shadow-[var(--shadow-lg)]"
      >
        {/* certificate corner ornament */}
        <div aria-hidden="true" className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${cert.hue} opacity-15 blur-xl`} />
        <div aria-hidden="true" className="absolute inset-3 rounded-[20px] border border-dashed border-[var(--line)]" />

        <div className="relative flex items-start justify-between gap-3">
          <span
            className={`grid h-12 min-w-12 place-items-center rounded-2xl bg-gradient-to-br ${cert.hue} px-2.5 font-mono text-xs font-medium text-white shadow-lg`}
            aria-hidden="true"
          >
            {cert.mark}
          </span>
          <Award size={22} className="text-accent-ink opacity-70" aria-hidden="true" />
        </div>

        <h3 className="relative mt-5 font-display text-lg font-semibold leading-snug text-ink">{cert.title}</h3>
        <p className="relative mt-1 text-sm font-medium text-muted">{cert.issuer}</p>
        {cert.detail && (
          <p className="relative mt-3">
            <span className="chip">{cert.detail}</span>
          </p>
        )}

        <AnimatePresence initial={false}>
          {open && (
            <motion.dl
              id={detailsId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid gap-2 overflow-hidden text-sm"
            >
              <div className="pt-3">
                <dt className="font-mono text-[0.7rem] uppercase tracking-wider text-muted">Issued by</dt>
                <dd className="text-ink">{cert.org}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.7rem] uppercase tracking-wider text-muted">Area</dt>
                <dd className="text-ink">{cert.area}</dd>
              </div>
            </motion.dl>
          )}
        </AnimatePresence>

        <div className="relative mt-auto flex flex-wrap gap-2 pt-5">
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={detailsId}
            className="btn btn-ghost !min-h-[40px] !px-4 text-sm"
          >
            {open ? 'Hide Details' : 'Details'}
            <ChevronDown size={16} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
          </button>
          {cert.image && (
            <button onClick={() => onPreview(cert)} className="btn btn-ghost !min-h-[40px] !px-4 text-sm">
              <Eye size={16} /> Preview
            </button>
          )}
          {cert.verifyUrl && (
            <a href={cert.verifyUrl} target="_blank" rel="noreferrer" className="btn btn-primary !min-h-[40px] !px-4 text-sm">
              <BadgeCheck size={16} /> Verify Credential
            </a>
          )}
        </div>
      </motion.article>
    </motion.li>
  );
}

export default function Certifications() {
  const [preview, setPreview] = useState(null);
  const isPdf = preview?.image?.toLowerCase().endsWith('.pdf');

  return (
    <section id="certifications" aria-labelledby="cert-title" className="relative py-20 lg:py-28">
      <SectionShapes variant="a" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading id="cert-title" eyebrow="Certifications" title="Certifications & credentials" />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => (
            <CertCard key={c.title + c.issuer} cert={c} index={i} onPreview={setPreview} />
          ))}
        </ul>
      </div>

      <Modal open={!!preview} onClose={() => setPreview(null)} labelledBy="cert-modal-title" maxWidth="max-w-4xl">
        {preview && (
          <div className="p-5 sm:p-7">
            <h3 id="cert-modal-title" className="pr-12 text-xl font-bold text-ink">
              {preview.title} <span className="font-medium text-muted">· {preview.issuer}</span>
            </h3>
            <div className="mt-5 overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
              {isPdf ? (
                <iframe src={preview.image} title={`${preview.title} certificate`} className="h-[70vh] w-full" />
              ) : (
                <img src={preview.image} alt={`${preview.title} certificate`} className="h-auto w-full" />
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
