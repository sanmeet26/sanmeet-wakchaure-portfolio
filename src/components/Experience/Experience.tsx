import { Timeline } from '@/components/Experience/Timeline';
import { Section, SectionHeading } from '@/components/Common';

export function Experience() {
  return (
    <Section id="experience" labelledBy="experience-heading">
      <div className="shell space-y-14">
        <SectionHeading
          id="experience-heading"
          eyebrow="Experience"
          title="Four roles, one"
          accent="through-line"
          description="Enterprise platforms where the interesting problem was usually the seam between services, not the feature on top of it."
        />
        <Timeline />
      </div>
    </Section>
  );
}
