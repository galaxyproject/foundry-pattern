import fs from 'node:fs';
import path from 'node:path';
import { visit, SKIP } from 'unist-util-visit';
import yaml from 'js-yaml';
import type { Root, Text, PhrasingContent } from 'mdast';
import { entryToId, entryToSlug } from './slug';

interface Options {
  contentDir: string;
  base: string;
}

interface Target {
  id: string; // route id, e.g. "pattern/the-model"
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

// slug normalization for a link target: lowercase, drop anything but [a-z0-9-]
function normalize(s: string): string {
  return s.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function buildMap(contentDir: string): Map<string, Target> {
  const abs = path.resolve(contentDir);
  const files: string[] = [];
  walk(abs, abs, files);
  const map = new Map<string, Target>();
  for (const rel of files) {
    const id = entryToId(rel);
    const slug = normalize(entryToSlug(rel));
    map.set(slug, { id, title: frontmatterTitle(path.join(abs, rel)) });
  }
  return map;
}

const WIKI_RE = /\[\[([^\]\n]+)\]\]/g;

export default function remarkWikiLinks(opts: Options) {
  let cache: Map<string, Target> | null = null;
  const getMap = () => (cache ??= buildMap(opts.contentDir));
  const baseTrim = opts.base.replace(/\/$/, '');

  return function transformer(tree: Root) {
    const map = getMap();
    visit(tree, 'text', (node: Text, index, parent) => {
      if (!parent || index === undefined) return;
      if (parent.type === 'link' || parent.type === 'linkReference') return;
      if (!node.value.includes('[[')) return;

      const value = node.value;
      const out: PhrasingContent[] = [];
      let last = 0;
      let m: RegExpExecArray | null;
      WIKI_RE.lastIndex = 0;
      while ((m = WIKI_RE.exec(value)) !== null) {
        if (m.index > last) out.push({ type: 'text', value: value.slice(last, m.index) });
        const inner = m[1] ?? '';
        const pipe = inner.indexOf('|');
        const rawTarget = (pipe >= 0 ? inner.slice(0, pipe) : inner).trim();
        const display = (pipe >= 0 ? inner.slice(pipe + 1) : inner).trim();
        const hash = rawTarget.indexOf('#');
        const page = hash >= 0 ? rawTarget.slice(0, hash) : rawTarget;
        const anchor = hash >= 0 ? rawTarget.slice(hash) : '';
        const t = map.get(normalize(page));
        if (t) {
          out.push({
            type: 'link',
            url: `${baseTrim}/${t.id}/${anchor}`,
            title: t.title ?? null,
            children: [{ type: 'text', value: display }],
          });
        } else {
          // Unresolved link: render bold so it is visible but not a dead anchor.
          out.push({ type: 'strong', children: [{ type: 'text', value: display }] });
        }
        last = m.index + m[0].length;
      }
      if (last === 0) return;
      if (last < value.length) out.push({ type: 'text', value: value.slice(last) });
      (parent.children as PhrasingContent[]).splice(index, 1, ...out);
      return [SKIP, index + out.length];
    });
  };
}
