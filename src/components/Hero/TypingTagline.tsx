import { useTypewriter } from '@/hooks/useTypewriter';
import { profile } from '@/data/profile';
import { cn } from '@/utils/cn';

/**
 * Cycles the taglines. The longest phrase reserves the line height so
 * surrounding content never reflows as the text grows and shrinks.
 */
export function TypingTagline({ className }: { className?: string }) {
  const { text, settled } = useTypewriter(profile.taglines);
  const longest = profile.taglines.reduce((a, b) => (b.length > a.length ? b : a), '');

  return (
    <p className={cn('relative font-mono text-sm text-ink-muted sm:text-base', className)}>
      {/* Invisible longest phrase holds the box open. */}
      <span aria-hidden="true" className="invisible block">
        {longest}
      </span>
      <span className="absolute inset-0 block" aria-live="polite" aria-atomic="true">
        <span className="text-cyan-brand" aria-hidden="true">
          &gt;{' '}
        </span>
        {text}
        <span
          aria-hidden="true"
          className={cn(
            'ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.18em] bg-violet-brand',
            settled ? 'animate-caret' : 'opacity-100',
          )}
        />
      </span>
    </p>
  );
}
