import type { ComponentType, SVGProps } from 'react';
import {
  Binary,
  Briefcase,
  Clock,
  Code2,
  Database,
  FolderGit2,
  GitBranch,
  Layers,
  LayoutDashboard,
  Server,
  Trophy,
} from 'lucide-react';
import { FaEnvelope, FaGithub, FaLinkedin, FaLocationDot, FaPhone } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/**
 * Data files reference icons by name. Mapping them explicitly here keeps the
 * bundle tree-shakeable — a dynamic lookup would pull in the whole icon set.
 */
const registry: Record<string, IconComponent> = {
  // lucide — skills and stats
  Binary,
  Briefcase,
  Clock,
  Code2,
  Database,
  FolderGit2,
  GitBranch,
  Layers,
  LayoutDashboard,
  Server,
  Trophy,
  // react-icons — brands and contact channels
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaLocationDot,
  FaPhone,
  SiLeetcode,
};

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: string;
}

/** Renders nothing rather than throwing if a data file names an unknown icon. */
export function Icon({ name, ...props }: IconProps) {
  const Component = registry[name];
  if (!Component) return null;
  return <Component aria-hidden="true" focusable="false" {...props} />;
}
