import { motion } from 'framer-motion';
import { profile } from '../data/portfolio';

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-bg"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="relative grid place-items-center">
        <motion.div
          className="absolute h-28 w-28 rounded-full"
          style={{ background: 'conic-gradient(from 0deg, transparent, #7c5cff, #4f7cff, transparent 70%)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute h-[104px] w-[104px] rounded-full bg-bg" />
        <motion.span
          className="relative font-display text-3xl font-bold text-gradient"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {profile.initials}
        </motion.span>
      </div>
    </motion.div>
  );
}
