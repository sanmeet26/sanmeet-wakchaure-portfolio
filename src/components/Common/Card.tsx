import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface CardProps {
  children: ReactNode;
  className?: string;
  /** Adds the hover lift. Off for static content like the About panel. */
  interactive?: boolean;
  /** Swaps the flat border for a gradient hairline ring. */
  gradientBorder?: boolean;
  as?: 'div' | 'li' | 'article';
}

export function Card({
  children,
  className,
  interactive = false,
  gradientBorder = false,
  as: Tag = 'div',
}: CardProps) {
  return (
    <Tag
      className={cn(
        'relative rounded-card shadow-card backdrop-blur-sm transition duration-500 ease-premium',
        gradientBorder ? 'gradient-ring' : 'border border-line bg-card/50',
        interactive && 'hover:-translate-y-1 hover:shadow-lift',
        interactive && !gradientBorder && 'hover:border-line-strong',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
