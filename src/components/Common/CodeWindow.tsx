import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface CodeWindowProps {
  /** Shown in the title bar, monospaced. */
  title: string;
  children: ReactNode;
  className?: string;
  /** Small label on the right of the title bar, e.g. a status. */
  badge?: ReactNode;
}

/**
 * Editor/terminal chrome. Presentational only — decorative for screen readers,
 * since the content inside carries the same information as the page copy.
 */
export function CodeWindow({ title, children, className, badge }: CodeWindowProps) {
  return (
    <div
      className={cn(
        'w-full min-w-0 overflow-hidden rounded-card border border-line-strong/80 bg-surface/80 shadow-card backdrop-blur-md',
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-line/80 bg-card/40 px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-violet-brand/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-indigo-brand/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-brand/70" />
        </span>
        <span className="truncate font-mono text-xs text-ink-faint">{title}</span>
        {badge ? <span className="ml-auto shrink-0">{badge}</span> : null}
      </div>
      <div className="overflow-x-auto p-4 [scrollbar-width:thin] sm:p-5">{children}</div>
    </div>
  );
}
