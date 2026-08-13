import { BackgroundGrid } from '@/components/Background/BackgroundGrid';
import { CursorGlow } from '@/components/Background/CursorGlow';
import { GradientBlobs } from '@/components/Background/GradientBlobs';
import { NoiseOverlay } from '@/components/Background/NoiseOverlay';

/**
 * Everything ambient, in one fixed layer behind the content. Kept out of the
 * document flow so it never affects layout or introduces horizontal scroll.
 */
export function BackgroundLayer() {
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <BackgroundGrid />
        <GradientBlobs />
      </div>
      <CursorGlow />
      <NoiseOverlay />
    </>
  );
}
