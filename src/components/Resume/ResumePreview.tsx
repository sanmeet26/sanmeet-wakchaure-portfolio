import { experience } from '@/data/experience';
import { education } from '@/data/education';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { skillCategories } from '@/data/skills';

/**
 * A miniature of the document rather than an embedded PDF viewer: browser PDF
 * plugins render inconsistently, are unreadable at this size on phones, and cost
 * a full document download before the visitor has asked for one.
 *
 * Counts are derived, so the preview cannot claim more than the resume holds.
 */
export function ResumePreview() {
  const rows = [
    { label: 'Professional summary', detail: `${profile.title}` },
    { label: 'Experience', detail: `${experience.length} roles` },
    { label: 'Technical skills', detail: `${skillCategories.length} groups` },
    { label: 'Education', detail: education[0]?.result ?? '' },
    {
      label: 'Project work',
      detail: `${projects.filter((p) => p.kind === 'personal').length} projects`,
    },
    { label: 'Achievements', detail: 'MHT-CET State Rank 2' },
  ];

  return (
    <div
      aria-hidden="true"
      className="flex aspect-[1/1.32] w-full flex-col gap-5 overflow-hidden rounded-xl bg-ink/[0.97] p-6 text-night shadow-card sm:p-8"
    >
      <div className="border-b border-night/15 pb-4">
        <p className="font-display text-lg font-medium leading-tight sm:text-2xl">{profile.name}</p>
        <p className="mt-1 font-mono text-[0.6rem] text-night/60 sm:text-[0.7rem]">
          {profile.email} · {profile.phone}
        </p>
      </div>

      <ul className="flex flex-col gap-3.5">
        {rows.map((row) => (
          <li key={row.label} className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-night/50 sm:text-[0.65rem]">
                {row.label}
              </span>
              <span className="font-mono text-[0.6rem] text-night/40 sm:text-[0.65rem]">
                {row.detail}
              </span>
            </div>
            {/* Ruled lines standing in for body copy. */}
            <span className="h-[3px] w-full rounded-full bg-night/10" />
            <span className="h-[3px] w-[82%] rounded-full bg-night/10" />
          </li>
        ))}
      </ul>
    </div>
  );
}
