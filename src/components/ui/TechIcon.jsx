import { Code2 } from 'lucide-react';
import { logoAlias, logos } from '../../data/techLogos';

/** Renders a technology's official logo as inline SVG. */
export default function TechIcon({ name, size = 22 }) {
  const logo = logos[logoAlias[name]];
  if (!logo) return <Code2 aria-hidden="true" size={size} strokeWidth={1.8} className="text-[#7666f5]" />;

  const [, , w, h] = logo.vb.split(' ').map(Number);
  return (
    <svg viewBox={logo.vb} width={size} height={size} aria-hidden="true" focusable="false" style={{ display: 'block' }}>
      {logo.u && <rect x={w * 0.06} y={h * 0.06} width={w * 0.88} height={h * 0.88} fill={logo.u} />}
      {logo.d.map((d) => (
        <path key={d.slice(0, 24)} fill={logo.c} d={d} />
      ))}
    </svg>
  );
}
