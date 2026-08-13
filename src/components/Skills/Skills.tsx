import { SkillCategoryCard } from '@/components/Skills/SkillCategoryCard';
import { Section, SectionHeading, StaggerGroup, StaggerItem } from '@/components/Common';
import { skillCategories } from '@/data/skills';

export function Skills() {
  return (
    <Section id="skills" labelledBy="skills-heading">
      <div className="shell space-y-14">
        <SectionHeading
          id="skills-heading"
          eyebrow="Skills"
          title="What I reach for, and"
          accent="why"
          description="Grouped by the job each one does rather than by how confident I feel about it — a percentage bar would tell you less than the projects these appear in."
        />

        <StaggerGroup
          as="ul"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          staggerChildren={0.07}
        >
          {skillCategories.map((category) => (
            <StaggerItem as="li" key={category.id} className="min-w-0">
              <SkillCategoryCard category={category} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </Section>
  );
}
