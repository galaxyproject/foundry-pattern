// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import pagefind from 'astro-pagefind';
import remarkWikiLinks from './src/lib/remark-wiki-links.ts';

// Hosting is not yet finalized; these are sensible placeholders for a
// GitHub Pages project site. Change `site`/`base` when hosting is decided.
const SITE = 'https://galaxyproject.github.io';
const BASE = '/foundry-pattern';

export default defineConfig({
  site: SITE,
  base: BASE,
  integrations: [pagefind()],
  markdown: {
    remarkPlugins: [[remarkWikiLinks, { contentDir: '../content', base: BASE }]],
  },
  vite: {
    // Cast: Astro bundles its own nested vite, so the plugin's vite types and the
    // top-level vite types are nominally distinct though structurally identical.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
