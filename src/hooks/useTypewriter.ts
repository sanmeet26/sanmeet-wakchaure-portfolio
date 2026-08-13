import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface TypewriterOptions {
  /** ms per character while typing. */
  typeSpeed?: number;
  /** ms per character while deleting. */
  deleteSpeed?: number;
  /** ms to hold a completed phrase before deleting. */
  holdDuration?: number;
}

interface TypewriterState {
  text: string;
  /** True while holding a fully typed phrase — used to pause the caret. */
  settled: boolean;
}

/**
 * Types each phrase, holds it, deletes it, moves to the next. Under reduced
 * motion it returns the first phrase in full and never animates.
 */
export function useTypewriter(
  phrases: string[],
  { typeSpeed = 55, deleteSpeed = 28, holdDuration = 1900 }: TypewriterOptions = {},
): TypewriterState {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const phrase = phrases[index] ?? '';

  useEffect(() => {
    if (reducedMotion || phrases.length === 0) return;

    // Fully typed: hold, then start deleting.
    if (!deleting && length === phrase.length) {
      const timer = setTimeout(() => setDeleting(true), holdDuration);
      return () => clearTimeout(timer);
    }

    // Fully deleted: advance to the next phrase.
    if (deleting && length === 0) {
      setDeleting(false);
      setIndex((current) => (current + 1) % phrases.length);
      return;
    }

    const timer = setTimeout(
      () => setLength((current) => current + (deleting ? -1 : 1)),
      deleting ? deleteSpeed : typeSpeed,
    );
    return () => clearTimeout(timer);
  }, [
    deleting,
    length,
    phrase.length,
    phrases.length,
    reducedMotion,
    typeSpeed,
    deleteSpeed,
    holdDuration,
  ]);

  if (reducedMotion) {
    return { text: phrases[0] ?? '', settled: true };
  }

  return {
    text: phrase.slice(0, length),
    settled: !deleting && length === phrase.length,
  };
}
