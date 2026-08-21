import type { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Programming Languages',
    icon: 'Code2',
    accent: 'violet',
    blurb: 'Comfortable moving between managed and low-level.',
    skills: ['Java', 'Python', 'JavaScript', 'SQL', 'C#', 'C', 'C++'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: 'LayoutDashboard',
    accent: 'cyan',
    blurb: 'Responsive interfaces for data-heavy enterprise screens.',
    skills: ['Angular', 'React', 'HTML', 'CSS', 'Bootstrap', 'Tailwind CSS', 'Responsive Design'],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: 'Server',
    accent: 'indigo',
    blurb: 'APIs and services designed to be split apart later.',
    skills: ['FastAPI', 'ASP.NET Core', '.NET 6', 'REST APIs', 'Microservices', 'JWT', 'RBAC'],
  },
  {
    id: 'data',
    label: 'Data & persistence',
    icon: 'Database',
    accent: 'violet',
    blurb: 'Relational modelling, indexing and query performance.',
    skills: ['PostgreSQL', 'SQL Server', 'SQLAlchemy', 'Indexing', 'Query optimisation'],
  },
  {
    id: 'devops',
    label: 'DevOps & tools',
    icon: 'GitBranch',
    accent: 'cyan',
    blurb: 'Pipelines that make releases boring, on purpose.',
    skills: ['Git', 'GitLab', 'Jenkins', 'Postman', 'JIRA', 'Visual Studio', 'VS Code'],
  },
  {
    id: 'foundations',
    label: 'Foundations',
    icon: 'Binary',
    accent: 'indigo',
    blurb: 'The parts that outlast any framework.',
    skills: [
      'Data Structures & Algorithms',
      'OOP',
      'DBMS',
      'Computer Networks',
      'Clean Architecture',
      'Agile',
    ],
  },
];
