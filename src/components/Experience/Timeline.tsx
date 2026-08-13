import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { TimelineItem } from '@/components/Experience/TimelineItem';
import { experience } from '@/data/experience';
import { useMotionEnabled } from '@/hooks/useMotionEnabled';

/**
 * The rail draws itself as the section scrolls. The track is a static hairline;
 * the accent line on top is scaled from the scroll progress of this container.
 */
export function Timeline() {
  const animate = useMotionEnabled();
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 75%', 'end 65%'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  return (
    <div ref={container} className="relative">
      {/* Track + drawn line, aligned with the markers in TimelineItem. */}
      <div
        aria-hidden="true"
        className="absolute bottom-2 left-4 top-2 w-px bg-line-strong/50 sm:left-7 lg:left-9"
      >
        <motion.div
          style={{ scaleY: animate ? progress : 1 }}
          className="h-full w-px origin-top bg-gradient-to-b from-violet-brand via-indigo-brand to-cyan-brand"
        />
      </div>

      <ol className="flex flex-col gap-12 sm:gap-14">
        {experience.map((role) => (
          <TimelineItem key={role.id} role={role} />
        ))}
      </ol>
    </div>
  );
}
