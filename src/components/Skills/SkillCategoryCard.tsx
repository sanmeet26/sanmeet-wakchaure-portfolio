import { accentStyles } from '@/components/Skills/accents';
import { Card, Chip, Icon } from '@/components/Common';
import type { SkillCategory } from '@/types';
import { cn } from '@/utils/cn';

export function SkillCategoryCard({ category }: { category: SkillCategory }) {
  const accent = accentStyles[category.accent];

  return (
    <Card as="article" interactive className={cn('group flex h-full flex-col p-6', accent.glow)}>
      <div className="flex items-center gap-3">
        <span
          className={cn(
            'grid h-10 w-10 shrink-0 place-items-center rounded-xl border transition-transform duration-500 ease-premium group-hover:scale-105',
            accent.iconWell,
          )}
        >
          <Icon name={category.icon} width={18} height={18} className={accent.icon} />
        </span>
        <h3 className="text-lg font-medium">{category.label}</h3>
      </div>

      <p className="mb-6 mt-4 text-sm leading-relaxed text-ink-muted">{category.blurb}</p>

      <span
        aria-hidden="true"
        className={cn(
          'mt-auto h-px w-10 pt-0 transition-all duration-500 ease-premium group-hover:w-16',
          accent.rule,
        )}
      />

      <ul className="mt-5 flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <li key={skill}>
            <Chip>{skill}</Chip>
          </li>
        ))}
      </ul>
    </Card>
  );
}
