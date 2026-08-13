import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Menu } from 'lucide-react';
import { Logo } from '@/components/Navbar/Logo';
import { MobileMenu } from '@/components/Navbar/MobileMenu';
import { NavLinks } from '@/components/Navbar/NavLinks';
import { Button } from '@/components/Common';
import { useScrolled } from '@/hooks/useScrolled';
import { profile } from '@/data/profile';
import { useMotionEnabled } from '@/hooks/useMotionEnabled';
import { cn } from '@/utils/cn';
import { ease } from '@/utils/motion';

interface NavbarProps {
  activeId: string;
}

export function Navbar({ activeId }: NavbarProps) {
  const animate = useMotionEnabled();
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(24);

  return (
    <>
      <motion.header
        initial={animate ? { y: -24, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...ease, delay: 0.1 }}
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-colors duration-500 ease-premium',
          scrolled
            ? 'border-b border-line/80 bg-night/70 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="shell flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
          <Logo />

          <nav aria-label="Sections" className="hidden lg:block">
            <NavLinks activeId={activeId} />
          </nav>

          <div className="flex items-center gap-2">
            <Button
              href={profile.resumePath}
              download
              size="sm"
              className="hidden sm:inline-flex"
              leading={<Download size={15} aria-hidden="true" />}
            >
              Resume
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid h-10 w-10 place-items-center rounded-pill border border-line-strong bg-surface/60 text-ink-muted transition-colors duration-300 hover:text-ink lg:hidden"
            >
              <Menu size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} activeId={activeId} />
    </>
  );
}
