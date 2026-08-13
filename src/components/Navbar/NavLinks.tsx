import { motion } from 'framer-motion';
import { navSections } from '@/constants/sections';
import { scrollToSection } from '@/utils/scroll';
import { cn } from '@/utils/cn';
import { spring } from '@/utils/motion';

interface NavLinksProps {
  activeId: string;
  /** Vertical stack for the mobile sheet, horizontal row for the desktop bar. */
  orientation?: 'horizontal' | 'vertical';
  onNavigate?: () => void;
}

export function NavLinks({ activeId, orientation = 'horizontal', onNavigate }: NavLinksProps) {
  const isVertical = orientation === 'vertical';

  return (
    <ul className={cn('flex', isVertical ? 'flex-col gap-1' : 'items-center gap-1')}>
      {navSections.map((section) => {
        const active = activeId === section.id;
        return (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={active ? 'true' : undefined}
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(section.id);
                onNavigate?.();
              }}
              className={cn(
                'relative block rounded-pill transition-colors duration-300',
                isVertical
                  ? 'px-3 py-3 font-display text-lg'
                  : 'px-3.5 py-2 text-sm text-ink-muted hover:text-ink',
                active && 'text-ink',
              )}
            >
              {/* One shared indicator that slides between items. */}
              {active ? (
                <motion.span
                  layoutId={isVertical ? 'nav-indicator-mobile' : 'nav-indicator'}
                  transition={spring}
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-0 -z-10 rounded-pill border border-violet-brand/30 bg-violet-brand/10',
                  )}
                />
              ) : null}
              {section.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
