import { careerStart } from '@/data/profile';

/** Whole years since the first full-time role, floored. */
export function getYearsOfExperience(from: string = careerStart): number {
  const start = new Date(from);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  const monthDelta = now.getMonth() - start.getMonth();
  if (monthDelta < 0 || (monthDelta === 0 && now.getDate() < start.getDate())) {
    years -= 1;
  }
  return Math.max(years, 0);
}

export const currentYear = new Date().getFullYear();
