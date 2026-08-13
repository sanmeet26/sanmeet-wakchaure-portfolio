import type { Stat } from '@/types';
import { getYearsOfExperience } from '@/utils/date';
import { experience } from '@/data/experience';
import { skillCategories } from '@/data/skills';
import { projects } from '@/data/projects';

/** Derived where possible so the numbers cannot drift out of date. */
export const stats: Stat[] = [
  {
    id: 'experience',
    value: `${getYearsOfExperience()}+`,
    label: 'Years building software',
    icon: 'Clock',
  },
  {
    id: 'roles',
    value: String(experience.length),
    label: 'Engineering roles',
    icon: 'Briefcase',
  },
  {
    id: 'technologies',
    value: `${skillCategories.reduce((total, c) => total + c.skills.length, 0)}+`,
    label: 'Technologies worked with',
    icon: 'Layers',
  },
  {
    id: 'projects',
    value: String(projects.length),
    label: 'Projects highlighted',
    icon: 'FolderGit2',
  },
  {
    id: 'rank',
    value: 'Rank 2',
    label: 'MHT-CET 2019, statewide',
    icon: 'Trophy',
  },
];
