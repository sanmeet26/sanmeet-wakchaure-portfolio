import { GradientText } from '@/components/Common/GradientText';
import { Reveal } from '@/components/Common/Reveal';
import { cn } from '@/utils/cn';

export interface SectionHeadingProps {
  /** Small uppercase label above the title. */
  eyebrow: string;
  title: string;
  /** The trailing words of the title that take the gradient. */
  accent?: string;
  description?: string;
  /** Must match the `aria-labelledby` on the parent section. */
  id: string;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  id,
  className,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <Reveal
      as="header"
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <span className="eyebrow flex items-center gap-3">
        <span className="h-px w-8 bg-accent-sweep" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 id={id} className="text-heading">
        {title} {accent ? <GradientText>{accent}</GradientText> : null}
      </h2>
      {description ? (
        <p className={cn('max-w-prose text-ink-muted', align === 'center' && 'mx-auto')}>
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
