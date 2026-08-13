import { ContactCard } from '@/components/Contact/ContactCard';
import { ContactForm } from '@/components/Contact/ContactForm';
import {
  Card,
  GradientText,
  Reveal,
  Section,
  SocialRow,
  StaggerGroup,
  StaggerItem,
} from '@/components/Common';
import { contactChannels } from '@/data/social';
import { profile } from '@/data/profile';

export function Contact() {
  return (
    <Section id="contact" labelledBy="contact-heading">
      <div className="shell space-y-14">
        <Reveal as="header" className="flex max-w-3xl flex-col gap-5">
          <span className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-accent-sweep" aria-hidden="true" />
            Connect
          </span>
          <h2 id="contact-heading" className="text-heading">
            Let&rsquo;s build something <GradientText>amazing together</GradientText>
          </h2>
          <p className="max-w-prose text-ink-muted">
            Open to full stack roles and interesting problems — particularly anything involving APIs
            under load, microservices with messy boundaries, or a legacy system that needs
            migrating. Based in {profile.location}.
          </p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="flex min-w-0 flex-col gap-5">
            <StaggerGroup as="ul" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {contactChannels.map((channel) => (
                <StaggerItem as="li" key={channel.id} className="min-w-0">
                  <ContactCard channel={channel} />
                </StaggerItem>
              ))}
            </StaggerGroup>

            <Reveal delay={0.1} className="flex items-center gap-4 pt-2">
              <SocialRow size="sm" />
            </Reveal>
          </div>

          <Reveal delay={0.08} className="min-w-0">
            <Card gradientBorder className="p-6 sm:p-8">
              <ContactForm />
            </Card>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
