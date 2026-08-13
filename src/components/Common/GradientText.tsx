import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface GradientTextProps {
  children: ReactNode;
  className?: string;
  /** Slowly pans the gradient. Off by default — motion here is easy to overdo. */
  animate?: boolean;
}

export function GradientText({ children, className, animate = false }: GradientTextProps) {
  return (
    <span className={cn('gradient-text', animate && 'animate-sweep', className)}>{children}</span>
  );
}
