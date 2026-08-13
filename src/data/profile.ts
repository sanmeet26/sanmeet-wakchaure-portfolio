import type { Profile } from '@/types';

export const profile: Profile = {
  name: 'Sanmeet Wakchaure',
  shortName: 'Sanmeet',
  // title: 'Full Stack Software Developer',
  title: 'Software Developer',
  taglines: [
    'REST APIs that hold up under load.',
    'Interfaces that stay fast as they grow.',
    'Queries that stop being the bottleneck.',
    'Legacy systems, migrated cleanly.',
  ],
  summary:
    'Full stack developer with 3+ years building enterprise web platforms — scalable APIs in FastAPI and .NET, responsive front ends in React and Angular, and the integration work that connects them.',
  about: [
    'I build the parts of a product people rarely see and always feel: the endpoint that returns in 40ms instead of 4 seconds, the auth layer that gets permissions right the first time, the release pipeline that stops being a Friday-night event.',
    'Most of my work has been enterprise, and most of it has looked like this: REST APIs that stay fast as the data behind them grows, role-based permissions so four kinds of user see four correct views of the same records, and Angular UIs that collapse several screens into one interface people can actually work in. Adding an index, paginating a heavy list view, rebuilding an ageing service as clean .NET 6 REST APIs. I like fixes that are structural rather than cosmetic — the hard part is rarely the feature, it is the seam between services.',
    'Right now my attention is split across both ends of the stack: React and Angular on the front end, FastAPI on the back, and data structures in between — I practise them regularly, because they are the part of this work that does not go out of date. I’m also looking to deepen my cloud knowledge, with Azure being the next area I want to explore.',
    'Away from the keyboard I play cricket, read historical and mythological fiction, and keep music on for most of the day.',
  ],
  focus: [
    'React',
    'Angular',
    'FastAPI',
    'PostgreSQL',
    'System design',
    'CI/CD',
    'Data structures & algorithms',
  ],
  location: 'Pune, Maharashtra, India',
  email: 'wakchauresanmeet3@gmail.com',
  phone: '+91 70208 51728',
  resumePath: '/Sanmeet_Wakchaure_Resume.pdf',
  // avatarPath: '/profile-placeholder.svg',
  avatarPath: '/sanmeet_photo.png',
  availability: 'Open to conversations',
};

/** Used by `getYearsOfExperience()` so the hero stat never goes stale. */
export const careerStart = '2023-07-01';
