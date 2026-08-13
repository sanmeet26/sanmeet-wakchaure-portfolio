/**
 * Faint 64px grid, masked so it fades out toward the bottom of the viewport.
 * Static — a moving grid would compete with everything else on the page.
 */
export function BackgroundGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-grid bg-grid-64 opacity-[0.55] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_20%,transparent_75%)]"
    />
  );
}
