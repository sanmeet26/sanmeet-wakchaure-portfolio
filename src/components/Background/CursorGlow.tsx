import { motion, useTransform } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

const SIZE = 420;

/**
 * A soft violet light that follows the pointer, lagging slightly behind it.
 * Driven by MotionValues, so it never triggers a React render, and skipped
 * entirely on touch devices and under reduced motion.
 */
export function CursorGlow() {
  const { x, y, enabled } = useMousePosition(90, 18);
  const left = useTransform(x, (value) => value - SIZE / 2);
  const top = useTransform(y, (value) => value - SIZE / 2);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ left, top, width: SIZE, height: SIZE }}
      className="pointer-events-none fixed z-0 rounded-full bg-violet-brand/[0.07] blur-[90px] will-change-transform"
    />
  );
}
