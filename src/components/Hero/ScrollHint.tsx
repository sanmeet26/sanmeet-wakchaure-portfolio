import { motion } from 'framer-motion';
import { scrollToSection } from '@/utils/scroll';
import { useMotionEnabled } from '@/hooks/useMotionEnabled';

/** Nudge toward the next section. Decorative, but clickable and labelled. */
export function ScrollHint() {
  const animate = useMotionEnabled();

  return (
    <button
      type="button"
      onClick={() => scrollToSection('about')}
      className="group flex items-center gap-3 rounded-pill py-2 text-ink-faint transition-colors duration-300 hover:text-ink-muted"
    >
      <span className="eyebrow">Scroll</span>
      <span className="relative h-8 w-px overflow-hidden bg-line-strong" aria-hidden="true">
        <motion.span
          className="absolute inset-x-0 top-0 h-3 bg-accent-sweep"
          animate={animate ? { y: [-12, 32] } : { y: 10 }}
          transition={
            animate ? { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }
          }
        />
      </span>
    </button>
  );
}
