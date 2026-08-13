import type { ReactNode } from 'react';
import { ArrowUpRight, Lock, Target } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { TiltWrapper } from '@/components/Projects/TiltWrapper';
import {
  HttpServerPreview,
  MetaphorDetectionPreview,
  RationSystemPreview,
  TreeCommandPreview,
} from '@/components/Projects/previews';
import { Button, Card, Chip } from '@/components/Common';
import type { Project } from '@/types';

/** Project id to its decorative media. Local, so previews.tsx exports only components. */
const previews: Record<string, () => ReactNode> = {
  'tree-command': TreeCommandPreview,
  'http-server': HttpServerPreview,
  'metaphor-detection': MetaphorDetectionPreview,
  'ration-management-system': RationSystemPreview,
};

export function ProjectCard({ project }: { project: Project }) {
  const Preview = previews[project.id];

  return (
    <TiltWrapper>
      <Card
        as="article"
        gradientBorder
        className="group flex h-full flex-col overflow-hidden transition-shadow duration-500 hover:shadow-lift"
      >
        {/* Media */}
        {Preview ? (
          <div
            aria-hidden="true"
            className="relative h-44 overflow-hidden border-b border-line/80 bg-night/50 p-5 font-mono text-[0.7rem] sm:h-48"
          >
            <div className="absolute inset-0 bg-grid bg-grid-32 opacity-30" />
            <div className="relative">
              <Preview />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-night/80 to-transparent" />
          </div>
        ) : null}

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="eyebrow">{project.context}</span>
            <span className="font-mono text-[0.7rem] text-ink-faint">
              {project.kind === 'professional' ? 'Client work' : 'Personal'}
            </span>
          </div>

          <h3 className="mt-3 text-xl font-medium">{project.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">{project.description}</p>

          <ul className="mt-5 flex flex-col gap-2.5">
            {project.features.map((feature) => (
              <li
                key={feature.slice(0, 28)}
                className="flex gap-3 text-sm leading-relaxed text-ink-muted"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-violet-brand/70"
                />
                {feature}
              </li>
            ))}
          </ul>

          {project.challenges.length > 0 ? (
            <div className="mt-6 rounded-xl border border-line/80 bg-night/40 p-4">
              <p className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint">
                <Target size={13} aria-hidden="true" className="text-cyan-brand" />
                The hard part
              </p>
              <ul className="mt-3 flex flex-col gap-2.5">
                {project.challenges.map((challenge) => (
                  <li key={challenge.slice(0, 28)} className="text-sm leading-relaxed text-ink">
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li key={tech}>
                <Chip>{tech}</Chip>
              </li>
            ))}
          </ul>

          {/* Actions pinned to the bottom so cards in a row line up. */}
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
            {project.repoUrl ? (
              <Button
                href={project.repoUrl}
                external
                size="sm"
                leading={<FaGithub size={15} aria-hidden="true" />}
                aria-label={`${project.title} source on GitHub — opens in a new tab`}
              >
                View source
              </Button>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface/40 px-3.5 py-2 text-sm text-ink-faint">
                <Lock size={14} aria-hidden="true" />
                Private codebase
              </span>
            )}

            {project.liveUrl ? (
              <Button
                href={project.liveUrl}
                external
                size="sm"
                variant="primary"
                trailing={<ArrowUpRight size={15} aria-hidden="true" />}
                aria-label={`${project.title} live demo — opens in a new tab`}
              >
                Live demo
              </Button>
            ) : null}
          </div>
        </div>
      </Card>
    </TiltWrapper>
  );
}
