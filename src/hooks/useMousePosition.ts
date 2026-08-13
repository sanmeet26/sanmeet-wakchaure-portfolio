import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { useHasFinePointer } from '@/hooks/useMediaQuery';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export interface PointerMotion {
  /** Viewport pixels. */
  x: MotionValue<number>;
  y: MotionValue<number>;
  /** -1 to 1, relative to viewport centre. Useful for parallax. */
  normalizedX: MotionValue<number>;
  normalizedY: MotionValue<number>;
  enabled: boolean;
}

/**
 * Pointer position as MotionValues rather than state, so tracking effects run
 * without triggering a React render on every frame. Inert on touch devices and
 * under reduced motion.
 */
export function useMousePosition(stiffness = 120, damping = 20): PointerMotion {
  const finePointer = useHasFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = finePointer && !reducedMotion;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const normalizedX = useMotionValue(0);
  const normalizedY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness, damping });
  const y = useSpring(rawY, { stiffness, damping });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      rawX.set(event.clientX);
      rawY.set(event.clientY);
      normalizedX.set((event.clientX / window.innerWidth) * 2 - 1);
      normalizedY.set((event.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [enabled, rawX, rawY, normalizedX, normalizedY]);

  return { x, y, normalizedX, normalizedY, enabled };
}
