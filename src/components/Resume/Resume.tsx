import { Download, ExternalLink, FileText } from 'lucide-react';
import { ResumePreview } from '@/components/Resume/ResumePreview';
import { Button, Card, Reveal, Section, SectionHeading } from '@/components/Common';
import { profile } from '@/data/profile';
import { getYearsOfExperience } from '@/utils/date';

export function Resume() {
  return (
    <Section id="resume" labelledBy="resume-heading">
      <div className="shell">
        <Card className="overflow-hidden p-0">
          <div className="grid items-center gap-10 p-8 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:p-14">
            <div className="min-w-0">
              <SectionHeading
                id="resume-heading"
                eyebrow="Resume"
                title="The whole thing, on"
                accent="one page"
                description={`${getYearsOfExperience()}+ years of experience, the full technical stack, education and project work — as a PDF you can keep.`}
              />

              <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  variant="primary"
                  href={profile.resumePath}
                  download
                  leading={<Download size={16} aria-hidden="true" />}
                >
                  Download PDF
                </Button>
                <Button
                  href={profile.resumePath}
                  external
                  leading={<ExternalLink size={16} aria-hidden="true" />}
                >
                  Open in browser
                </Button>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-6 flex items-center gap-2 font-mono text-xs text-ink-faint">
                  <FileText size={14} aria-hidden="true" />
                  PDF · one page · {profile.resumePath.replace('/', '')}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.12} className="min-w-0">
              <div className="mx-auto max-w-[22rem] lg:max-w-none">
                <ResumePreview />
              </div>
            </Reveal>
          </div>
        </Card>
      </div>
    </Section>
  );
}
