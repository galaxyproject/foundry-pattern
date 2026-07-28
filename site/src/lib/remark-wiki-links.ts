// Rewrite `[[Target]]` in the corpus into real links at markdown-compile time.
//
// The GRAMMAR, the exact resolver and the tree walk are @galaxy-foundry/wiki-links. What
// stays here is this site's MAP — which pages exist and what each is addressable by — and
// that half deliberately does not transfer: the Foundry instances key notes by basename plus
// a Mold's `name` plus a `tool command` pair, we key by a filename with its reading-order
// prefix stripped (src/lib/slug.ts).
//
// The map is built off the filesystem rather than from `astro:content` because this runs at
// markdown-compile time, before the content collections exist.

import fs from 'node:fs';
import path from 'node:path';

import { resolveWikiLink, slugify } from '@galaxy-foundry/wiki-links';
import remarkWikiLinks from '@galaxy-foundry/wiki-links/remark';
import yaml from 'js-yaml';

import { entryToId, entryToSlug } from './slug';

interface Options {
  contentDir: string;
  base: string;
}

interface Target {
  /** Route id, e.g. "pattern/the-model". */
  id: string;
  title?: string;
}

function walk(dir: string, root: string, out: string[]): void {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walk(full, root, out);
    } else if (ent.isFile() && ent.name.endsWith('.md')) {
      out.push(path.relative(root, full));
    }
  }
}

function frontmatterTitle(abs: string): string | undefined {
  try {
    const raw = fs.readFileSync(abs, 'utf-8');
    if (!raw.startsWith('---')) return undefined;
    const end = raw.indexOf('\n---', 3);
    if (end < 0) return undefined;
    const fm = yaml.load(raw.slice(raw.indexOf('\n') + 1, end)) as Record<string, unknown>;
    return typeof fm?.title === 'string' ? fm.title : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Both sides of a lookup must run through the same slug function, so the map is keyed with
 * the package's `slugify` — the same one `resolveWikiLink` applies to a link's target.
 */
function buildMap(contentDir: string): Map<string, Target> {
  const abs = path.resolve(contentDir);
  const files: string[] = [];
  walk(abs, abs, files);
  const map = new Map<string, Target>();
  for (const rel of files) {
    map.set(slugify(entryToSlug(rel)), {
      id: entryToId(rel),
      title: frontmatterTitle(path.join(abs, rel)),
    });
  }
  return map;
}

export default function wikiLinks(opts: Options) {
  let cache: Map<string, Target> | null = null;
  const getMap = () => (cache ??= buildMap(opts.contentDir));
  const baseTrim = opts.base.replace(/\/$/, '');

  // The package appends the link's own `#anchor` to whatever href we return, and renders an
  // unresolved link bold rather than as a dead anchor.
  return remarkWikiLinks({
    resolve: (link) => {
      const target = resolveWikiLink(link.target, getMap());
      return target ? { href: `${baseTrim}/${target.id}/`, title: target.title ?? null } : null;
    },
  });
}
