import { ArrowUp } from 'lucide-react';
import { SocialRow } from '@/components/Common';
import { profile } from '@/data/profile';
import { currentYear } from '@/utils/date';
import { scrollToTop } from '@/utils/scroll';

export function Footer() {
  return (
    <footer className="relative border-t border-line/80">
      <div className="shell flex flex-col gap-8 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1.5">
          <p className="font-display text-sm font-medium">{profile.name}</p>
          <p className="text-sm text-ink-faint">
            Made with <span aria-label="love">&hearts;</span> using React · &copy; {currentYear}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <SocialRow size="sm" />
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="grid h-9 w-9 place-items-center rounded-pill border border-line-strong/70 bg-surface/60 text-ink-muted transition-colors duration-300 hover:border-violet-brand/60 hover:text-ink"
          >
            <ArrowUp size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
