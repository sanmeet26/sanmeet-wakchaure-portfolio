import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * True when animation is allowed.
 *
 * `MotionConfig reducedMotion="user"` stops Framer *animating*, but a variant's
 * `hidden` state is still applied as the initial style — so a reveal would leave
 * content at `opacity: 0` and offset by 24px instead of simply showing it.
 * Components use this to start from the visible state instead.
 */
export function useMotionEnabled(): boolean {
  return !usePrefersReducedMotion();
}
