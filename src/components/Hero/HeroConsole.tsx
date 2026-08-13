import type { ReactNode } from 'react';
import { motion, useTransform } from 'framer-motion';
import { CodeWindow } from '@/components/Common/CodeWindow';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useMotionEnabled } from '@/hooks/useMotionEnabled';
import { profile } from '@/data/profile';
import { getYearsOfExperience } from '@/utils/date';
import { stagger } from '@/utils/motion';

/**
 * The signature element: a request/response cycle rather than a generic
 * `const developer = {}` snippet. Building REST APIs is the through-line of the
 * work on the resume, so the hero shows one answering.
 *
 * Every value is read from the data layer, so this cannot drift from the resume.
 */

const PARALLAX = 10;

const K = ({ children }: { children: ReactNode }) => (
  <span className="text-ink-muted">&quot;{children}&quot;</span>
);
const S = ({ children }: { children: ReactNode }) => (
  <span className="text-cyan-brand">&quot;{children}&quot;</span>
);
const N = ({ children }: { children: ReactNode }) => (
  <span className="text-violet-brand">{children}</span>
);
const P = ({ children }: { children: ReactNode }) => (
  <span className="text-ink-faint">{children}</span>
);

const stack = ['FastAPI', 'React', 'Angular', '.NET', 'PostgreSQL'];

export function HeroConsole() {
  const animate = useMotionEnabled();
  const { normalizedX, normalizedY, enabled } = useMousePosition(60, 16);
  const x = useTransform(normalizedX, [-1, 1], [-PARALLAX, PARALLAX]);
  const y = useTransform(normalizedY, [-1, 1], [-PARALLAX, PARALLAX]);

  const lines: ReactNode[] = [
    <>
      <span className="text-violet-brand">GET</span>{' '}
      <span className="text-ink">/api/v1/developers/sanmeet</span>
    </>,
    <P>&nbsp;</P>,
    <>
      <P>{'{'}</P>
    </>,
    <>
      <K>name</K>
      <P>: </P>
      <S>{profile.name}</S>
      <P>,</P>
    </>,
    <>
      <K>role</K>
      <P>: </P>
      <S>{profile.title}</S>
      <P>,</P>
    </>,
    <>
      <K>based_in</K>
      <P>: </P>
      <S>Pune, India</S>
      <P>,</P>
    </>,
    <>
      <K>years_experience</K>
      <P>: </P>
      <N>{getYearsOfExperience()}</N>
      <P>,</P>
    </>,
    <>
      <K>stack</K>
      <P>: [</P>
    </>,
    // Split across two lines so the block does not need horizontal scrolling
    // on a phone.
    ...[stack.slice(0, 3), stack.slice(3)].map((group, groupIndex) => (
      <>
        <P>{'  '}</P>
        {group.map((item, index) => (
          <span key={item}>
            <S>{item}</S>
            {index < group.length - 1 || groupIndex === 0 ? <P>, </P> : null}
          </span>
        ))}
      </>
    )),
    <>
      <P>],</P>
    </>,
    <>
      <K>open_to_work</K>
      <P>: </P>
      <N>true</N>
    </>,
    <>
      <P>{'}'}</P>
    </>,
  ];

  return (
    <motion.div style={enabled ? { x, y } : undefined} className="w-full will-change-transform">
      <CodeWindow
        title="GET /api/v1/developers/sanmeet"
        badge={
          <span className="flex items-center gap-2 font-mono text-[0.7rem] text-ink-faint">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-brand" aria-hidden="true" />
            200 OK
          </span>
        }
      >
        {/* Decorative: the same facts appear as text elsewhere on the page. */}
        <motion.pre
          aria-hidden="true"
          variants={stagger(0.5, 0.075)}
          initial={animate ? 'hidden' : 'visible'}
          animate="visible"
          className="font-mono text-[0.72rem] leading-relaxed sm:text-sm"
        >
          {lines.map((line, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: { opacity: 0, x: -6 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.35 } },
              }}
              className="flex gap-3 sm:gap-4"
            >
              <span className="w-5 shrink-0 select-none text-right text-ink-faint/50">
                {index + 1}
              </span>
              <span className="whitespace-pre">{line}</span>
            </motion.span>
          ))}
        </motion.pre>
      </CodeWindow>
    </motion.div>
  );
}
