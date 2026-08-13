import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, revealViewport } from '@/utils/motion';
import { useMotionEnabled } from '@/hooks/useMotionEnabled';
import { cn } from '@/utils/cn';

export interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds. Use sparingly — Stagger is better for lists. */
  delay?: number;
  as?: 'div' | 'li' | 'article' | 'header';
}

/**
 * Scroll-triggered fade and rise. Fires once. Framer Motion already collapses
 * these to a no-op under `prefers-reduced-motion` via the CSS override in
 * globals.css, and the transform is GPU-only.
 */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const Component = motion[as];
  const animate = useMotionEnabled();
  return (
    <Component
      className={cn(className)}
      variants={fadeUp}
      initial={animate ? 'hidden' : 'visible'}
      whileInView="visible"
      viewport={revealViewport}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}
