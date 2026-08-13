import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** id of the heading that names this section, for screen readers. */
  labelledBy?: string;
  /** Turn off the default vertical rhythm for full-bleed sections like the hero. */
  bare?: boolean;
}

/**
 * Every section is a landmark with an accessible name, and carries the
 * scroll-margin that keeps the sticky nav from covering its heading.
 */
export function Section({ id, children, className, labelledBy, bare = false }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('relative', !bare && 'py-24 sm:py-28 lg:py-32', className)}
    >
      {children}
    </section>
  );
}
