import { useRef } from 'react';
import type { PointerEvent, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useHasFinePointer } from '@/hooks/useMediaQuery';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/utils/cn';

const MAX_DEGREES = 6;

/**
 * Pointer-tracked 3D tilt. Rotation is held in MotionValues, so tracking never
 * triggers a React render. Off on touch and under reduced motion, where it
 * renders a plain wrapper.
 *
 * Nothing inside may use a Tailwind transform class: Framer writes `transform`
 * inline here and would overwrite it.
 */
export function TiltWrapper({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const finePointer = useHasFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = finePointer && !reducedMotion;

  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const springX = useSpring(offsetX, { stiffness: 140, damping: 18 });
  const springY = useSpring(offsetY, { stiffness: 140, damping: 18 });

  const rotateY = useTransform(springX, [-0.5, 0.5], [-MAX_DEGREES, MAX_DEGREES]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [MAX_DEGREES, -MAX_DEGREES]);

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    offsetX.set((event.clientX - rect.left) / rect.width - 0.5);
    offsetY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    offsetX.set(0);
    offsetY.set(0);
  };

  if (!enabled) {
    return <div className={cn('h-full', className)}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn('h-full [perspective:1100px]', className)}>
      <motion.div
        onPointerMove={handleMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="h-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
