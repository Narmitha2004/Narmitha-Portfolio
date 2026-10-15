import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowUpRight, CheckCircle2, Github, Linkedin, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { profile } from '../data/portfolio';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import MagneticButton from './ui/MagneticButton';
import { SectionShapes } from './FloatingShapes';

/**
 * Delivery: if VITE_WEB3FORMS_KEY is set (see .env.example), messages are sent
 * to your inbox through Web3Forms. Without it, the form validates and then opens
 * the visitor's email app with the message pre-filled — it never fakes a send.
 */
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const initial = { name: '', email: '', subject: '', message: '', botcheck: '' };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Enter your full name.';
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  if (v.subject.trim().length < 3) e.subject = 'Please add a short subject.';
  if (v.message.trim().length < 10) e.message = 'Message should be at least 10 characters.';
  return e;
}

const contactLinks = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Linkedin, label: 'LinkedIn', value: 'narmitha-v', href: profile.linkedin, external: true },
  { icon: Github, label: 'GitHub', value: 'Narmitha2004', href: profile.github, external: true },
  ...(profile.showPhone ? [{ icon: Phone, label: 'Phone', value: profile.phone, href: profile.phoneHref }] : []),
];

/** Floating-label wrapper: the label sits inside the input and moves up on focus / when filled. */
function Field({ id, label, error, children }) {
  return (
    <div>
      <div className="fl">
        {children}
        <label htmlFor={id}>{label}</label>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-[#c2344a] dark:text-[#ff8a9b]"
          >
            <AlertCircle size={14} aria-hidden="true" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | mailto | error

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (values.botcheck) return; // honeypot
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    if (!WEB3FORMS_KEY) {
      const body = `${values.message}\n\n— ${values.name} (${values.email})`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          from_name: 'Portfolio contact form',
          name: values.name.trim(),
          email: values.email.trim(),
          subject: `[Portfolio] ${values.subject.trim()}`,
          message: values.message.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Request failed');
      setStatus('sent');
      setValues(initial);
    } catch {
      setStatus('error');
    }
  };

  const fieldProps = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange,
    'aria-invalid': errors[name] ? 'true' : 'false',
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    className: 'field',
  });

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-20 lg:py-28">
      <SectionShapes variant="b" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="gradient-border is-live glass-strong grid gap-10 overflow-hidden rounded-[34px] p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:p-14">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-[#7666f5]/25 to-[#7ab8ff]/10 blur-3xl"
            />
            <div className="relative">
              <SectionHeading
                id="contact-title"
                eyebrow="Contact"
                title="Let's Build Something Amazing Together"
                description="Open to conversations about roles, collaborations and app ideas. Reach out directly or send a message."
              />
              <ul className="grid gap-3">
                {contactLinks.map(({ icon: Icon, label, value, href, external }, i) => (
                  <Reveal as="li" key={label} delay={i * 0.06}>
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                      className="group flex min-h-[64px] items-center gap-4 rounded-2xl border border-[var(--line)] bg-[var(--glass)] p-3 pr-4 transition-all hover:-translate-y-0.5 hover:border-[var(--accent)]"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#7666f5] to-[#7ab8ff] text-white">
                        <Icon size={19} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold uppercase tracking-wider text-muted">{label}</span>
                        <span className="block truncate font-semibold text-ink">{value}</span>
                      </span>
                      <ArrowUpRight
                        size={18}
                        className="shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink"
                        aria-hidden="true"
                      />
                    </a>
                  </Reveal>
                ))}
                <li className="flex items-center gap-2 px-1 pt-2 text-sm text-muted">
                  <MapPin size={16} className="text-accent-ink" aria-hidden="true" /> {profile.location}
                </li>
              </ul>
            </div>
          </div>

          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-[26px] border border-[var(--line)] bg-[var(--glass)] p-5 sm:p-7">
              {/* honeypot — hidden from people, catches bots */}
              <input type="text" name="botcheck" value={values.botcheck} onChange={onChange} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Full Name" error={errors.name}>
                  <input {...fieldProps('name')} type="text" autoComplete="name" placeholder=" " maxLength={80} />
                </Field>
                <Field id="email" label="Email Address" error={errors.email}>
                  <input {...fieldProps('email')} type="email" autoComplete="email" placeholder=" " maxLength={120} />
                </Field>
              </div>
              <Field id="subject" label="Subject" error={errors.subject}>
                <input {...fieldProps('subject')} type="text" placeholder=" " maxLength={120} />
              </Field>
              <Field id="message" label="Message" error={errors.message}>
                <textarea {...fieldProps('message')} rows={5} placeholder=" " maxLength={3000} className="field min-h-[150px] resize-y" />
              </Field>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <MagneticButton type="submit" disabled={status === 'sending'} className="btn btn-primary w-full disabled:opacity-70 sm:w-auto">
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={17} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </MagneticButton>
                {!WEB3FORMS_KEY && (
                  <p className="text-xs text-muted sm:max-w-[16rem] sm:text-right">Opens your email app with the message ready to send.</p>
                )}
              </div>

              <div aria-live="polite" className="min-h-0">
                <AnimatePresence mode="wait">
                  {status === 'sent' && (
                    <motion.p key="sent" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 rounded-xl bg-emerald-500/10 p-3 text-sm font-medium text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 size={17} /> Thanks! Your message has been sent.
                    </motion.p>
                  )}
                  {status === 'mailto' && (
                    <motion.p key="mailto" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-start gap-2 rounded-xl bg-accent-soft p-3 text-sm font-medium text-ink">
                      <Mail size={17} className="mt-0.5 shrink-0 text-accent-ink" /> Your email app should open with the message filled in. If it doesn&apos;t, email {profile.email} directly.
                    </motion.p>
                  )}
                  {status === 'error' && (
                    <motion.p key="error" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-start gap-2 rounded-xl bg-[#e0475b]/10 p-3 text-sm font-medium text-[#c23347] dark:text-[#ff8a99]">
                      <AlertCircle size={17} className="mt-0.5 shrink-0" /> Something went wrong. Please try again or email {profile.email}.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
