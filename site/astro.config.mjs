// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
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
  // Astro 7 defaults this to 'jsx', which drops the whitespace between inline elements that
  // sit on their own source lines — prose loses the spaces around its links. Pinned to the
  // pre-7 behaviour rather than hand-spacing the components.
  compressHTML: true,
  integrations: [pagefind()],
  // Astro 7 renders markdown with Sätteri, which runs no remark plugins. `[[wiki-links]]` are
  // this corpus's link grammar and the prebuild link check asserts against them, so the unified
  // pipeline is opted back into explicitly. The astro ≤6 spelling — `markdown.remarkPlugins` —
  // still works in 7.1.6 via a shim that migrates the array onto a unified processor and warns;
  // this is the non-deprecated form the shim is telling you to write.
  markdown: {
    processor: unified({
      remarkPlugins: [[remarkWikiLinks, { contentDir: '../content', base: BASE }]],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
