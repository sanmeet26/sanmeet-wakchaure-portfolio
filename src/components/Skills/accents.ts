import type { SkillCategory } from '@/types';

/**
 * Tailwind cannot build class names at runtime, so each accent maps to a fixed
 * set of classes here.
 */
export const accentStyles: Record<
  SkillCategory['accent'],
  { icon: string; iconWell: string; rule: string; glow: string }
> = {
  violet: {
    icon: 'text-violet-brand',
    iconWell: 'border-violet-brand/25 bg-violet-brand/10',
    rule: 'bg-violet-brand/40',
    glow: 'group-hover:shadow-[0_24px_60px_-24px_rgba(139,92,246,0.45)]',
  },
  indigo: {
    icon: 'text-indigo-brand',
    iconWell: 'border-indigo-brand/25 bg-indigo-brand/10',
    rule: 'bg-indigo-brand/40',
    glow: 'group-hover:shadow-[0_24px_60px_-24px_rgba(99,102,241,0.45)]',
  },
  cyan: {
    icon: 'text-cyan-brand',
    iconWell: 'border-cyan-brand/25 bg-cyan-brand/10',
    rule: 'bg-cyan-brand/40',
    glow: 'group-hover:shadow-[0_24px_60px_-24px_rgba(34,211,238,0.45)]',
  },
};
