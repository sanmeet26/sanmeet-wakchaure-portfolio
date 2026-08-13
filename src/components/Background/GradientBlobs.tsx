import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/utils/cn';

/**
 * Two large, heavily blurred accent blobs drifting on long loops. Hidden below
 * `sm` — on a phone they cost more in paint than they add.
 */
export function GradientBlobs() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden sm:block">
      <div
        className={cn(
          'absolute -left-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-violet-brand/20 blur-[120px] will-change-transform',
          !reducedMotion && 'animate-drift',
        )}
      />
      <div
        className={cn(
          'absolute -right-40 top-[45%] h-[30rem] w-[30rem] rounded-full bg-cyan-brand/[0.14] blur-[130px] will-change-transform',
          !reducedMotion && 'animate-drift-slow',
        )}
      />
      <div className="absolute inset-x-0 top-0 h-[60vh] bg-radial-fade" />
    </div>
  );
}
