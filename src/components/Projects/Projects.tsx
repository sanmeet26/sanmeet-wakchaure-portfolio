import { ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { ProjectCard } from '@/components/Projects/ProjectCard';
import {
  Button,
  Reveal,
  Section,
  SectionHeading,
  StaggerGroup,
  StaggerItem,
} from '@/components/Common';
import { projects } from '@/data/projects';
import { socials } from '@/data/social';

/** Reuses the GitHub URL already in the data layer rather than repeating it. */
const githubProfile =
  socials.find((social) => social.id === 'github')?.href ?? 'https://github.com/sanmeet26';

export function Projects() {
  return (
    <Section id="projects" labelledBy="projects-heading">
      <div className="shell space-y-14">
        <SectionHeading
          id="projects-heading"
          eyebrow="Projects"
          title="Four things built"
          accent="from scratch"
          description="A directory-listing utility, an HTTP server, an NLP pipeline and a distribution system — the projects where I went a layer down and implemented what frameworks and libraries usually hide."
        />

        <StaggerGroup as="ul" className="grid gap-5 lg:grid-cols-2" staggerChildren={0.08}>
          {projects.map((project) => (
            <StaggerItem as="li" key={project.id} className="min-w-0">
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.1} className="flex justify-center pt-2">
          <Button
            href={githubProfile}
            external
            leading={<FaGithub size={16} aria-hidden="true" />}
            trailing={
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            }
            aria-label="Explore more projects on GitHub — opens in a new tab"
          >
            Explore more projects
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
