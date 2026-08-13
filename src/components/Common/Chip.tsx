import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface ChipProps {
  children: ReactNode;
  className?: string;
  /** Slightly stronger treatment, used for a card's primary technologies. */
  emphasis?: boolean;
}

/** Premium badge used everywhere a technology or tag appears. */
export function Chip({ children, className, emphasis = false }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill border px-2.5 py-1 font-mono text-xs leading-none transition duration-300 ease-premium',
        emphasis
          ? 'border-violet-brand/40 bg-violet-brand/10 text-ink'
          : 'border-line-strong/70 bg-surface/70 text-ink-muted hover:border-violet-brand/40 hover:text-ink',
        className,
      )}
    >
      {children}
    </span>
  );
}
