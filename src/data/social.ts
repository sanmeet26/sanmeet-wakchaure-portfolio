import type { SocialLink } from '@/types';
import { profile } from '@/data/profile';

export const socials: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    icon: 'FaGithub',
    href: 'https://github.com/sanmeet26',
    display: 'sanmeet26',
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: 'FaLinkedin',
    href: 'https://www.linkedin.com/in/sanmeet-wakchaure/',
    display: 'sanmeet-wakchaure',
    external: true,
  },
  {
    id: 'leetcode',
    label: 'LeetCode',
    icon: 'SiLeetcode',
    href: 'https://leetcode.com/u/Sanmeet_7/',
    display: 'Sanmeet_7',
    external: true,
  },
];

/** Contact cards: the socials above plus the direct channels. */
export const contactChannels: SocialLink[] = [
  {
    id: 'email',
    label: 'Email',
    icon: 'FaEnvelope',
    href: `mailto:${profile.email}`,
    display: profile.email,
    external: false,
  },
  {
    id: 'phone',
    label: 'Phone',
    icon: 'FaPhone',
    href: `tel:${profile.phone.replace(/\s/g, '')}`,
    display: profile.phone,
    external: false,
  },
  ...socials.filter((s) => s.id !== 'leetcode'),
  {
    id: 'location',
    label: 'Location',
    icon: 'FaLocationDot',
    href: 'https://www.google.com/maps/place/Pune',
    display: profile.location,
    external: true,
  },
];
