import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Card, Chip } from '@/components/Common';
import type { ExperienceItem } from '@/types';
import { useMotionEnabled } from '@/hooks/useMotionEnabled';
import { fadeUp, revealViewport, spring, stagger } from '@/utils/motion';
import { cn } from '@/utils/cn';

interface TimelineItemProps {
  role: ExperienceItem;
}

/**
 * One role. The rail sits on the left at every breakpoint: the entries carry
 * several bullets plus a chip row, and alternating sides would force the columns
 * narrow enough to hurt reading.
 */
export function TimelineItem({ role }: TimelineItemProps) {
  const animate = useMotionEnabled();

  return (
    <motion.li
      variants={stagger(0, 0.08)}
      initial={animate ? 'hidden' : 'visible'}
      whileInView="visible"
      viewport={revealViewport}
      className="relative grid gap-x-8 gap-y-4 pl-10 sm:pl-16 lg:grid-cols-[13rem_1fr] lg:gap-x-12 lg:pl-20"
    >
      {/* Rail marker */}
      <motion.span
        variants={{
          hidden: { scale: 0.4, opacity: 0 },
          visible: { scale: 1, opacity: 1, transition: spring },
        }}
        aria-hidden="true"
        // Positioned with `left`, not `translate-x`: Framer Motion animates
        // `scale` through an inline `transform`, which would overwrite it.
        className={cn(
          'absolute top-1.5 grid h-[1.15rem] w-[1.15rem] place-items-center rounded-full border-2',
          'left-[calc(1rem-0.575rem)] sm:left-[calc(1.75rem-0.575rem)] lg:left-[calc(2.25rem-0.575rem)]',
          role.current ? 'border-cyan-brand bg-night' : 'border-line-strong bg-night',
        )}
      >
        {role.current ? (
          <>
            <span className="absolute h-full w-full animate-ping rounded-full bg-cyan-brand/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-brand" />
          </>
        ) : (
          <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
        )}
      </motion.span>

      {/* Meta column */}
      <motion.div variants={fadeUp} className="flex flex-col gap-1.5 lg:pt-0.5 lg:text-right">
        <p className="font-mono text-sm text-ink">
          {role.start} <span className="text-ink-faint">—</span> {role.end}
        </p>
        <p className="text-sm text-ink-faint">{role.location}</p>
        {role.current ? (
          <span className="mt-1 inline-flex items-center gap-1.5 self-start rounded-pill border border-cyan-brand/30 bg-cyan-brand/10 px-2.5 py-1 font-mono text-[0.7rem] text-cyan-brand lg:self-end">
            Current
          </span>
        ) : null}
      </motion.div>

      {/* Content */}
      <motion.div variants={fadeUp} className="min-w-0">
        <Card interactive className="p-5 sm:p-7">
          <h3 className="text-lg font-medium sm:text-xl">{role.role}</h3>
          <p className="mt-1 text-ink-muted">{role.company}</p>

          <ul className="mt-5 flex flex-col gap-3">
            {role.responsibilities.map((line) => (
              <li
                key={line.slice(0, 32)}
                className="flex gap-3 text-sm leading-relaxed text-ink-muted"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-line-strong"
                />
                {line}
              </li>
            ))}
          </ul>

          {role.achievements.length > 0 ? (
            <div className="mt-6 rounded-xl border border-line/80 bg-night/40 p-4">
              <p className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint">
                <Sparkles size={13} aria-hidden="true" className="text-violet-brand" />
                Outcomes
              </p>
              <ul className="mt-3 flex flex-col gap-2.5">
                {role.achievements.map((line) => (
                  <li key={line.slice(0, 32)} className="text-sm leading-relaxed text-ink">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <ul className="mt-6 flex flex-wrap gap-2">
            {role.technologies.map((tech) => (
              <li key={tech}>
                <Chip>{tech}</Chip>
              </li>
            ))}
          </ul>
        </Card>
      </motion.div>
    </motion.li>
  );
}
