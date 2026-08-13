import type { Transition, Variants } from 'framer-motion';

/** One spring, used everywhere, so nothing feels out of step. */
export const spring: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 20,
  mass: 0.9,
};

export const ease: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: ease },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: ease },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: spring },
};

/** Parent wrapper for staggered children. */
export function stagger(delayChildren = 0, staggerChildren = 0.06): Variants {
  return {
    hidden: {},
    visible: { transition: { delayChildren, staggerChildren } },
  };
}

/**
 * Shared viewport config: reveal once, once the element is ~96px into view.
 *
 * `amount` is deliberately 'some' rather than a fraction. A fraction is a
 * proportion of the element, so a tall stagger group (four stacked project
 * cards is ~3200px on a phone) would need more than a viewport of itself
 * visible before firing — and would never reveal. The negative bottom margin
 * gives the "slightly in view" feel without depending on element height.
 */
export const revealViewport = {
  once: true,
  amount: 'some',
  margin: '0px 0px -96px 0px',
} as const;
