import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * True only for mouse/trackpad users who haven't asked for reduced motion.
 * Used to switch off magnetic + tilt effects on touch devices.
 */
export function useFinePointer() {
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  return fine && !reduce;
}
