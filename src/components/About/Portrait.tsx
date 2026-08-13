import { GraduationCap, MapPin, Trophy } from 'lucide-react';
import { Card, Reveal } from '@/components/Common';
import { profile } from '@/data/profile';
import { achievements, education } from '@/data/education';

/**
 * Photo, location, then two labelled groups: Education, and Achievements. The
 * groups are labelled so the MHT-CET rank reads as an achievement in its own
 * right rather than as a line of the degree above it.
 */
export function Portrait() {
  const degree = education[0];

  return (
    <Reveal delay={0.1} className="flex flex-col gap-4">
      <Card gradientBorder className="overflow-hidden p-2">
        <img
          src={profile.avatarPath}
          alt={`${profile.name}, ${profile.title}`}
          width={800}
          height={800}
          loading="lazy"
          decoding="async"
          className="aspect-square w-full rounded-[0.75rem] object-cover"
        />
      </Card>

      <Card className="flex flex-1 flex-col divide-y divide-line/80">
        <p className="flex items-center gap-3 p-4 text-sm text-ink-muted">
          <MapPin size={16} aria-hidden="true" className="shrink-0 text-cyan-brand" />
          {profile.location}
        </p>

        {degree ? (
          <div className="space-y-3 p-4">
            <p className="eyebrow">Education</p>
            <div className="flex items-start gap-3">
              <GraduationCap
                size={16}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-violet-brand"
              />
              <div className="space-y-0.5">
                <p className="text-sm text-ink">{degree.qualification}</p>
                <p className="text-sm text-ink-muted">{degree.institution}</p>
                <p className="font-mono text-xs text-ink-faint">
                  {degree.start} — {degree.end} · {degree.result}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {achievements.length > 0 ? (
          <div className="space-y-3 p-4">
            <p className="eyebrow">Achievements</p>
            <ul className="space-y-3">
              {achievements.map((achievement) => (
                <li key={achievement.id} className="flex items-start gap-3">
                  <Trophy
                    size={16}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-indigo-brand"
                  />
                  <div className="space-y-0.5">
                    <p className="text-sm text-ink">{achievement.title}</p>
                    <p className="text-sm text-ink-muted">{achievement.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Card>
    </Reveal>
  );
}
