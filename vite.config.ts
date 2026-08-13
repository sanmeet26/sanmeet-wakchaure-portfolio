import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import meta from './site.meta.json';

/**
 * Fills the %PLACEHOLDER% tokens in index.html from site.meta.json, so the meta
 * tags crawlers read and the values `src/data/seo.ts` uses come from one file.
 */
function siteMeta(): Plugin {
  const tokens: Record<string, string> = {
    '%SITE_URL%': meta.siteUrl,
    '%TITLE%': meta.title,
    '%DESCRIPTION%': meta.description,
    '%SHORT_DESCRIPTION%': meta.shortDescription,
    '%OG_IMAGE_URL%': `${meta.siteUrl}${meta.ogImage}`,
    '%KEYWORDS%': meta.keywords.join(', '),
    '%LOCALE%': meta.locale,
  };

  return {
    name: 'site-meta',
    transformIndexHtml(html: string) {
      return Object.entries(tokens).reduce(
        (output, [token, value]) => output.replaceAll(token, value),
        html,
      );
    },
    // robots.txt and sitemap.xml both need the canonical domain, so they are
    // generated here rather than kept in public/ with the domain written twice.
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${meta.siteUrl}/sitemap.xml\n`,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          '  <url>',
          `    <loc>${meta.siteUrl}/</loc>`,
          '    <changefreq>monthly</changefreq>',
          '    <priority>1.0</priority>',
          '  </url>',
          '</urlset>',
          '',
        ].join('\n'),
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), siteMeta()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    // Split the animation runtime out of the main chunk so first paint
    // is not blocked by framer-motion.
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion'],
          icons: ['lucide-react', 'react-icons'],
        },
      },
    },
  },
});
