import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, revealViewport, stagger } from '@/utils/motion';
import { useMotionEnabled } from '@/hooks/useMotionEnabled';
import { cn } from '@/utils/cn';

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
  as?: 'div' | 'ul' | 'ol';
}

/** Parent: reveals its StaggerItem children in sequence. */
export function StaggerGroup({
  children,
  className,
  delayChildren = 0,
  staggerChildren = 0.06,
  as = 'div',
}: StaggerGroupProps) {
  const Component = motion[as];
  const animate = useMotionEnabled();
  return (
    <Component
      className={cn(className)}
      variants={stagger(delayChildren, staggerChildren)}
      initial={animate ? 'hidden' : 'visible'}
      whileInView="visible"
      viewport={revealViewport}
    >
      {children}
    </Component>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
}

export function StaggerItem({ children, className, as = 'div' }: StaggerItemProps) {
  const Component = motion[as];
  const animate = useMotionEnabled();
  return (
    <Component
      className={cn(className)}
      variants={fadeUp}
      initial={animate ? undefined : 'visible'}
    >
      {children}
    </Component>
  );
}
