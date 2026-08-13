/**
 * Shared shapes for everything under `src/data`.
 * Editing content should never require touching a component — only these files.
 */

export interface Profile {
  name: string;
  shortName: string;
  title: string;
  /** Rotating lines for the hero typing effect. */
  taglines: string[];
  /** One-line positioning statement, used in the hero and as the meta description base. */
  summary: string;
  /** Longer paragraphs for the About section. */
  about: string[];
  /** What I am actively working on getting better at — chips in About. */
  focus: string[];
  location: string;
  email: string;
  phone: string;
  /** Path relative to /public. */
  resumePath: string;
  /** Path relative to /public. Replace with a real photo when ready. */
  avatarPath: string;
  availability: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  current: boolean;
  /** What the work was, day to day. */
  responsibilities: string[];
  /** Outcomes worth calling out separately in the timeline card. */
  achievements: string[];
  technologies: string[];
}

export interface SkillCategory {
  id: string;
  label: string;
  /** lucide-react icon name, resolved in the Skills component. */
  icon: string;
  /** Which accent this category takes. */
  accent: 'violet' | 'indigo' | 'cyan';
  blurb: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  /** `professional` cards carry no repo link; `personal` cards do. */
  kind: 'professional' | 'personal';
  context: string;
  description: string;
  features: string[];
  challenges: string[];
  technologies: string[];
  repoUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
}

export interface SocialLink {
  id: string;
  label: string;
  /** react-icons key, resolved in the components that render it. */
  icon: string;
  href: string;
  /** Shown on contact cards; the href is what the button uses. */
  display: string;
  external: boolean;
}

export interface EducationItem {
  id: string;
  institution: string;
  qualification: string;
  start: string;
  end: string;
  result: string;
  location: string;
}

export interface Achievement {
  id: string;
  title: string;
  detail: string;
  year: string;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
  /** lucide-react icon name. */
  icon: string;
}

export interface NavSection {
  id: string;
  label: string;
}

export interface SeoConfig {
  siteUrl: string;
  title: string;
  description: string;
  ogImage: string;
  twitterHandle: string | null;
  keywords: string[];
}
