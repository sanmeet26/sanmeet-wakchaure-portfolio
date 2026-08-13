import { motion } from 'framer-motion';
import { Icon } from '@/components/Common/Icon';
import { socials } from '@/data/social';
import { cn } from '@/utils/cn';
import { spring } from '@/utils/motion';

export interface SocialRowProps {
  className?: string;
  size?: 'sm' | 'md';
}

const sizeMap = {
  sm: { box: 'h-9 w-9', icon: 16 },
  md: { box: 'h-11 w-11', icon: 18 },
} as const;

export function SocialRow({ className, size = 'md' }: SocialRowProps) {
  const { box, icon } = sizeMap[size];

  return (
    <ul className={cn('flex items-center gap-3', className)}>
      {socials.map((social) => (
        <li key={social.id}>
          <motion.a
            href={social.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${social.label} — opens in a new tab`}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.94 }}
            transition={spring}
            className={cn(
              'flex items-center justify-center rounded-pill border border-line-strong/70 bg-surface/60 text-ink-muted transition-colors duration-300 hover:border-violet-brand/60 hover:text-ink',
              box,
            )}
          >
            <Icon name={social.icon} width={icon} height={icon} />
          </motion.a>
        </li>
      ))}
    </ul>
  );
}
