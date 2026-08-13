import { Portrait } from '@/components/About/Portrait';
import { StatsStrip } from '@/components/About/StatsStrip';
import {
  Card,
  Chip,
  Reveal,
  Section,
  SectionHeading,
  StaggerGroup,
  StaggerItem,
} from '@/components/Common';
import { profile } from '@/data/profile';

export function About() {
  return (
    <Section id="about" labelledBy="about-heading">
      <div className="shell space-y-14">
        <SectionHeading
          id="about-heading"
          eyebrow="About"
          title="Engineering, mostly in the"
          accent="middle of the stack"
        />

        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          <div className="flex min-w-0 flex-col gap-8">
            <StaggerGroup className="flex flex-col gap-6" staggerChildren={0.09}>
              {profile.about.map((paragraph, index) => (
                <StaggerItem key={paragraph.slice(0, 32)}>
                  <p
                    className={
                      index === 0
                        ? 'max-w-prose text-lg leading-relaxed text-ink sm:text-xl'
                        : 'max-w-prose leading-relaxed text-ink-muted'
                    }
                  >
                    {paragraph}
                  </p>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <Reveal delay={0.1}>
              <Card className="p-6">
                <p className="eyebrow">Currently sharpening</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {profile.focus.map((item) => (
                    <li key={item}>
                      <Chip emphasis>{item}</Chip>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </div>

          <Portrait />
        </div>

        <StatsStrip />
      </div>
    </Section>
  );
}
