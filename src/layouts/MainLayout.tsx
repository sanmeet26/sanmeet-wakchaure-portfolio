import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';
import { BackgroundLayer } from '@/components/Background';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { sections } from '@/constants/sections';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useLenis } from '@/hooks/useLenis';
import { scrollToSection } from '@/utils/scroll';

const sectionIds = sections.map((section) => section.id);

/**
 * Page frame: ambient background at z-0, content at z-10, nav above both.
 * Owns the smooth-scroll instance and the scroll spy the nav reads from.
 */
export function MainLayout({ children }: { children: ReactNode }) {
  useLenis();
  const activeId = useActiveSection(sectionIds);

  /*
   * Deep links. Lenis owns the scroll position and reasserts it every frame, so
   * the browser's own jump to #hash on load gets undone. Re-issue it through
   * Lenis once it has mounted.
   */
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id || !sectionIds.includes(id)) return;
    const timer = setTimeout(() => scrollToSection(id), 140);
    return () => clearTimeout(timer);
  }, []);

  /*
   * `reducedMotion="user"` is what actually makes Framer honour the OS setting.
   * The CSS override in globals.css only reaches CSS animations and transitions —
   * Framer writes inline styles from JS and ignores it, so without this every
   * scroll reveal still slid 24px for people who asked it not to.
   */
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="sr-only-focusable fixed left-4 top-4 z-[60] rounded-pill bg-accent-sweep px-4 py-2 text-sm font-medium text-night"
        >
          Skip to content
        </a>

        <BackgroundLayer />
        <Navbar activeId={activeId} />

        <div className="relative z-10">
          <main id="main">{children}</main>
          <Footer />
        </div>
      </div>
    </MotionConfig>
  );
}
