// Pre-build lint for wiki-links in content/**.md.
//
// The runtime resolver (src/lib/remark-wiki-links.ts) degrades gracefully on
// two mistakes, which means neither one fails the build on its own and both
// have shipped unnoticed:
//
//   1. A [[link]] wrapped across a newline. The resolver's regex is
//      /\[\[([^\]\n]+)\]\]/g — it excludes newlines, so a wrapped link never
//      matches and renders as literal "[[...]]" brackets in the prose.
//   2. A [[target]] that resolves to no page. The resolver renders it as bold
//      text (a deliberate "visible but not a dead anchor" fallback), so a
//      typo'd slug reads as emphasis and never errors.
//
// This check turns both into build failures. It mirrors the resolver: it skips
// code (which the mdast pipeline never linkifies) and normalizes targets the
// same way. Slug rules are duplicated from src/lib/slug.ts — keep them in sync;
// the pair is small and stable (strip a leading 1–2 digit order prefix only).

import fs from 'node:fs';
import path from 'node:path';

const CONTENT_DIR = path.resolve(new URL('../../content', import.meta.url).pathname);

/** Strip a leading one/two-digit order prefix (mirrors slug.ts deprefix). */
const deprefix = (s) => s.replace(/^\d{1,2}-/, '');
/** Slug/target normalization (mirrors remark-wiki-links.ts normalize). */
const normalize = (s) =>
  s.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

function walk(dir, out) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, out);
    else if (ent.isFile() && ent.name.endsWith('.md')) out.push(full);
  }
}

/** Blank out fenced blocks and inline code so [[ ]] inside them is ignored,
 *  preserving newlines so reported line numbers stay accurate. */
function stripCode(src) {
  const blankNonNewline = (m) => m.replace(/[^\n]/g, ' ');
  return src
    .replace(/```[\s\S]*?```/g, blankNonNewline)
    .replace(/`[^`\n]*`/g, blankNonNewline);
}

const files = [];
walk(CONTENT_DIR, files);

// Valid targets: the de-prefixed, normalized basename of every content file.
const slugs = new Set(
  files.map((f) => normalize(deprefix(path.basename(f, '.md')))),
);

const lineOf = (src, idx) => src.slice(0, idx).split('\n').length;
const errors = [];

for (const file of files) {
  const rel = path.relative(CONTENT_DIR, file);
  const src = stripCode(fs.readFileSync(file, 'utf-8'));
  // Match greedily across newlines so wrapped links are caught, then classify.
  const re = /\[\[([\s\S]*?)\]\]/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const inner = m[1];
    const line = lineOf(src, m.index);
    if (inner.includes('\n')) {
      const flat = inner.replace(/\s*\n\s*/g, ' ');
      errors.push(`${rel}:${line}  line-wrapped link (renders as literal [[…]]): [[${flat}]]`);
      continue;
    }
    const rawTarget = (inner.includes('|') ? inner.slice(0, inner.indexOf('|')) : inner).trim();
    const page = rawTarget.includes('#') ? rawTarget.slice(0, rawTarget.indexOf('#')) : rawTarget;
    if (!slugs.has(normalize(page))) {
      errors.push(`${rel}:${line}  unresolved target (renders as silent bold): [[${rawTarget}]]`);
    }
  }
}

if (errors.length) {
  console.error(`\nwiki-link check failed — ${errors.length} problem(s):\n`);
  for (const e of errors) console.error(`  ${e}`);
  console.error('');
  process.exit(1);
}
console.log(`wiki-link check ok — ${files.length} files, ${slugs.size} targets, no broken links`);
