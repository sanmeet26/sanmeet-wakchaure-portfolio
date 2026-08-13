import { scrollToTop } from '@/utils/scroll';
import { profile } from '@/data/profile';

/** Monogram, doubling as "back to top". */
export function Logo() {
  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={`${profile.name} — back to top`}
      className="group flex items-center gap-2.5 rounded-pill py-1 pr-2 transition-opacity duration-300 hover:opacity-90"
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl border border-line-strong bg-surface font-display text-sm font-medium">
        <span className="bg-accent-sweep bg-clip-text text-transparent">SW</span>
      </span>
      <span className="hidden font-display text-sm font-medium tracking-tight sm:block">
        {profile.name}
      </span>
    </button>
  );
}
