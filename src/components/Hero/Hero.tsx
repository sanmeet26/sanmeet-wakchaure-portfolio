import { motion } from 'framer-motion';
import { ArrowUpRight, Download } from 'lucide-react';
import { HeroConsole } from '@/components/Hero/HeroConsole';
import { ScrollHint } from '@/components/Hero/ScrollHint';
import { TypingTagline } from '@/components/Hero/TypingTagline';
import { Button, GradientText, Section, SocialRow } from '@/components/Common';
import { profile } from '@/data/profile';
import { useMotionEnabled } from '@/hooks/useMotionEnabled';
import { fadeUp, stagger } from '@/utils/motion';
import { scrollToSection } from '@/utils/scroll';

export function Hero() {
  const animate = useMotionEnabled();

  return (
    <Section id="hero" bare labelledBy="hero-heading" className="flex min-h-dvh items-center">
      <div className="shell grid w-full items-center gap-14 pb-20 pt-32 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-28 lg:pt-36">
        {/* Copy — animates on load rather than on scroll, since it is already in view. */}
        <motion.div
          variants={stagger(0.1, 0.09)}
          initial={animate ? 'hidden' : 'visible'}
          animate="visible"
          className="flex min-w-0 flex-col items-start gap-6"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2.5 rounded-pill border border-line-strong/70 bg-surface/60 px-3.5 py-1.5 font-mono text-xs text-ink-muted backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inset-0 animate-ping rounded-full bg-cyan-brand/70" />
              <span className="relative h-2 w-2 rounded-full bg-cyan-brand" />
            </span>
            {profile.availability}
          </motion.span>

          <motion.h1 variants={fadeUp} id="hero-heading" className="flex flex-col gap-3">
            <span className="text-display">
              <span className="block">{profile.name.split(' ')[0]}</span>
              <span className="block text-ink-faint">{profile.name.split(' ')[1]}</span>
            </span>
            <span className="text-subdisplay font-display font-medium">
              <GradientText animate>{profile.title}</GradientText>
            </span>
          </motion.h1>

          <motion.div variants={fadeUp} className="w-full max-w-md">
            <TypingTagline />
          </motion.div>

          <motion.p variants={fadeUp} className="max-w-prose text-ink-muted sm:text-lg">
            {profile.summary}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              variant="primary"
              href={profile.resumePath}
              download
              leading={<Download size={16} aria-hidden="true" />}
            >
              Download resume
            </Button>
            <Button
              onClick={() => scrollToSection('contact')}
              trailing={
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              }
            >
              Get in touch
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-6 pt-4">
            <SocialRow />
            <span className="hidden h-px w-10 bg-line-strong sm:block" aria-hidden="true" />
            <span className="hidden lg:block">
              <ScrollHint />
            </span>
          </motion.div>
        </motion.div>

        {/* Signature element. */}
        <motion.div
          initial={animate ? { opacity: 0, y: 32, rotateX: 6 } : false}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="w-full min-w-0 [perspective:1200px]"
        >
          <HeroConsole />
        </motion.div>
      </div>
    </Section>
  );
}
