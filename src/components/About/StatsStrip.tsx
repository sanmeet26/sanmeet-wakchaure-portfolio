import { Card, Icon, StaggerGroup, StaggerItem } from '@/components/Common';
import { stats } from '@/data/stats';

/**
 * Five derived numbers. Values come from the data layer rather than being typed
 * in, so they cannot contradict the timeline or the skills list.
 */
export function StatsStrip() {
  return (
    <StaggerGroup
      as="ul"
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
      staggerChildren={0.07}
    >
      {stats.map((stat) => (
        <StaggerItem as="li" key={stat.id}>
          <Card interactive className="flex h-full flex-col gap-3 p-5">
            <Icon name={stat.icon} width={18} height={18} className="text-violet-brand" />
            <p className="font-display text-3xl leading-none tracking-tight">{stat.value}</p>
            <p className="text-sm leading-snug text-ink-muted">{stat.label}</p>
          </Card>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
