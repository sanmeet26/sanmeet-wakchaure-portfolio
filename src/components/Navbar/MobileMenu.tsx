import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Download, X } from 'lucide-react';
import { NavLinks } from '@/components/Navbar/NavLinks';
import { Button, SocialRow } from '@/components/Common';
import { profile } from '@/data/profile';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  activeId: string;
}

/**
 * Headless UI handles the focus trap, escape key and aria wiring; the
 * `data-[closed]` variants handle the animation without a second library.
 */
export function MobileMenu({ open, onClose, activeId }: MobileMenuProps) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50 lg:hidden">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-night/80 backdrop-blur-sm transition duration-300 ease-out data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 flex justify-end p-3">
        <DialogPanel
          transition
          className="flex w-full max-w-sm flex-col rounded-card border border-line bg-surface/95 p-6 shadow-card backdrop-blur-xl transition duration-300 ease-out data-[closed]:translate-x-4 data-[closed]:opacity-0"
        >
          <div className="flex items-center justify-between">
            <DialogTitle className="eyebrow">Navigate</DialogTitle>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-pill border border-line-strong text-ink-muted transition-colors duration-300 hover:text-ink"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Sections" className="mt-8">
            <NavLinks activeId={activeId} orientation="vertical" onNavigate={onClose} />
          </nav>

          <div className="mt-auto space-y-6 pt-10">
            <Button
              href={profile.resumePath}
              download
              variant="primary"
              className="w-full"
              leading={<Download size={16} aria-hidden="true" />}
            >
              Download resume
            </Button>
            <SocialRow size="sm" />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
