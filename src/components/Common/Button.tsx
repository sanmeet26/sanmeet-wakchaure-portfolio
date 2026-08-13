import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  /** Rendered before the label, e.g. an icon. */
  leading?: ReactNode;
  /** Rendered after the label. */
  trailing?: ReactNode;
}

interface AnchorProps extends BaseProps {
  href: string;
  external?: boolean;
  download?: boolean | string;
  onClick?: never;
  type?: never;
  'aria-label'?: string;
}

interface NativeButtonProps extends BaseProps {
  href?: never;
  external?: never;
  download?: never;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  'aria-label'?: string;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
}

export type ButtonProps = AnchorProps | NativeButtonProps;

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-pill font-medium transition duration-300 ease-premium disabled:pointer-events-none disabled:opacity-50';

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm sm:text-base',
};

const variants: Record<Variant, string> = {
  // The one filled control per view — the gradient is the emphasis.
  primary:
    'bg-accent-sweep text-night shadow-card hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0',
  secondary:
    'border border-line-strong bg-surface/60 text-ink backdrop-blur-sm hover:border-violet-brand/60 hover:bg-card hover:-translate-y-0.5 active:translate-y-0',
  ghost: 'text-ink-muted hover:text-ink hover:bg-card/60',
};

export function Button(props: ButtonProps) {
  const {
    variant = 'secondary',
    size = 'md',
    children,
    className,
    leading,
    trailing,
    ...rest
  } = props;

  const classes = cn(base, sizes[size], variants[variant], className);
  const content = (
    <>
      {leading}
      <span>{children}</span>
      {trailing}
    </>
  );

  if ('href' in rest && rest.href) {
    const { href, external, download, ...anchorRest } = rest as AnchorProps;
    return (
      <a
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
        download={download}
        {...anchorRest}
      >
        {content}
      </a>
    );
  }

  const { type = 'button', ...buttonRest } = rest as NativeButtonProps;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
