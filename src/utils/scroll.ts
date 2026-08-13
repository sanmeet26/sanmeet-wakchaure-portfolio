import type Lenis from 'lenis';

/**
 * Lenis owns scrolling, so anchor navigation has to go through it rather than
 * `element.scrollIntoView` — otherwise the two fight and the page stutters.
 * The instance is registered once by MainLayout.
 */
let instance: Lenis | null = null;

export function registerLenis(lenis: Lenis | null): void {
  instance = lenis;
}

export function scrollToSection(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;

  if (instance) {
    // No offset here: Lenis already honours the `scroll-margin-top` set on
    // `section[id]` in globals.css, and passing both double-counts the gap.
    instance.scrollTo(target, { duration: 1.1 });
  } else {
    // Reduced motion, or Lenis not mounted: jump without animation.
    target.scrollIntoView({ behavior: 'auto', block: 'start' });
  }

  // Keep the URL shareable without triggering a native jump.
  window.history.replaceState(null, '', `#${id}`);
}

export function scrollToTop(): void {
  if (instance) {
    instance.scrollTo(0, { duration: 1.1 });
  } else {
    window.scrollTo({ top: 0 });
  }
  window.history.replaceState(null, '', window.location.pathname);
}
