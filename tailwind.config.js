/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Surfaces (from the brief).
        // Named `night`, not `base`: a `base` colour key collides with
        // Tailwind's default `text-base` font size and silently wins.
        night: '#09090B',
        surface: '#18181B',
        card: '#27272A',
        line: {
          DEFAULT: '#27272A',
          strong: '#3F3F46',
        },
        ink: {
          DEFAULT: '#FAFAFA',
          muted: '#A1A1AA',
          // #71717A measured 4.11:1 on #09090B — below the 4.5:1 minimum, and it
          // carries real text (section eyebrows, the footer credit). #83838D
          // measures 5.2:1 and still reads clearly quieter than `muted`.
          faint: '#83838D',
        },
        // Accents
        violet: { brand: '#8B5CF6' },
        indigo: { brand: '#6366F1' },
        cyan: { brand: '#22D3EE' },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        display: ['clamp(2.5rem, 6.4vw, 4.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        // The role line sits under the name: same family, deliberately subordinate.
        subdisplay: [
          'clamp(1.3rem, 2.6vw, 2.1rem)',
          { lineHeight: '1.15', letterSpacing: '-0.02em' },
        ],
        heading: ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        eyebrow: ['0.75rem', { lineHeight: '1', letterSpacing: '0.18em' }],
      },
      maxWidth: {
        shell: '1200px',
        prose: '68ch',
      },
      borderRadius: {
        card: '1rem',
        pill: '999px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.4), 0 8px 32px -12px rgba(0,0,0,0.6)',
        lift: '0 1px 2px rgba(0,0,0,0.4), 0 24px 60px -20px rgba(139,92,246,0.35)',
        ring: 'inset 0 0 0 1px rgba(139,92,246,0.25)',
      },
      backgroundImage: {
        'accent-sweep': 'linear-gradient(100deg, #8B5CF6 0%, #6366F1 45%, #22D3EE 100%)',
        grid: 'linear-gradient(to right, #27272A 1px, transparent 1px), linear-gradient(to bottom, #27272A 1px, transparent 1px)',
        'radial-fade':
          'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(139,92,246,0.10), transparent 70%)',
      },
      backgroundSize: {
        'grid-64': '64px 64px',
        'grid-32': '32px 32px',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(4%, -6%, 0) scale(1.08)' },
          '66%': { transform: 'translate3d(-5%, 4%, 0) scale(0.94)' },
        },
        sweep: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        caret: {
          '0%, 45%': { opacity: '1' },
          '50%, 95%': { opacity: '0' },
        },
      },
      animation: {
        drift: 'drift 22s ease-in-out infinite',
        'drift-slow': 'drift 34s ease-in-out infinite reverse',
        sweep: 'sweep 6s ease-in-out infinite',
        caret: 'caret 1.1s step-end infinite',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
