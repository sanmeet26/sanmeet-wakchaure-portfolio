import { ArrowUpRight } from 'lucide-react';
import { Card, Icon } from '@/components/Common';
import type { SocialLink } from '@/types';

/** One reachable channel. The whole card is the link target. */
export function ContactCard({ channel }: { channel: SocialLink }) {
  return (
    <Card interactive className="group h-full">
      <a
        href={channel.href}
        target={channel.external ? '_blank' : undefined}
        rel={channel.external ? 'noreferrer noopener' : undefined}
        aria-label={
          channel.external
            ? `${channel.label}: ${channel.display} — opens in a new tab`
            : `${channel.label}: ${channel.display}`
        }
        className="flex h-full items-center gap-4 p-5"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line-strong/70 bg-night/50 text-ink-muted transition-colors duration-300 group-hover:border-violet-brand/50 group-hover:text-ink">
          <Icon name={channel.icon} width={16} height={16} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-faint">
            {channel.label}
          </span>
          <span className="mt-0.5 block break-words text-sm text-ink">{channel.display}</span>
        </span>
        <ArrowUpRight
          size={15}
          aria-hidden="true"
          className="shrink-0 text-ink-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink-muted"
        />
      </a>
    </Card>
  );
}
