import type { NavSection } from '@/types';

/** Order here drives the nav, the scroll spy and the section stack in MainLayout. */
export const sections: NavSection[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

/** Sections that appear in the nav (hero is reachable via the logo). */
export const navSections = sections.filter((s) => s.id !== 'hero');
