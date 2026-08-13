import { useEffect } from 'react';
import Lenis from 'lenis';
import { registerLenis } from '@/utils/scroll';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Smooth scrolling, skipped entirely when reduced motion is requested —
 * momentum scrolling is exactly the kind of thing that setting is for.
 */
export function useLenis(): void {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      registerLenis(null);
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    registerLenis(lenis);

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      registerLenis(null);
      lenis.destroy();
    };
  }, [reducedMotion]);
}
