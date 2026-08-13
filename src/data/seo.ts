import type { SeoConfig } from '@/types';
import meta from '../../site.meta.json';

/**
 * Meta values come from `site.meta.json` at the repo root, which the Vite config
 * also reads to fill the placeholders in index.html at build time. One file, so
 * the tags a crawler sees and the values the app uses cannot drift apart.
 *
 * Change the deployed domain in that file and nothing else needs editing.
 */
export const seo: SeoConfig = {
  siteUrl: meta.siteUrl,
  title: meta.title,
  description: meta.description,
  ogImage: meta.ogImage,
  twitterHandle: meta.twitterHandle,
  keywords: meta.keywords,
};
