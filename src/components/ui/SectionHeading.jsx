import Reveal from './Reveal';

export default function SectionHeading({ eyebrow, title, description, align = 'left', id }) {
  const center = align === 'center';
  return (
    <Reveal className={`mb-10 md:mb-14 ${center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}>
      <p className={`eyebrow ${center ? 'justify-center' : ''}`}>{eyebrow}</p>
      <h2 id={id} className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{description}</p>}
    </Reveal>
  );
}
