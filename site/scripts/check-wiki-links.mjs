// Pre-build lint for wiki-links in content/**.md.
//
// The renderer degrades gracefully on two mistakes, which means neither one fails the
// build on its own and both have shipped unnoticed:
//
//   1. A [[link]] wrapped across a newline. The grammar excludes newlines by design, so a
//      wrapped link never matches and renders as literal "[[...]]" brackets in the prose.
//   2. A [[target]] that resolves to no page. The transform renders it bold (a deliberate
//      "visible but not a dead anchor" fallback), so a typo'd slug reads as emphasis.
//
// This check turns both into build failures. It shares the GRAMMAR with the renderer —
// `slugify` and `parseWikiLink` come from @galaxy-foundry/wiki-links, so a target cannot be
// normalized one way here and another way there. It does NOT share the scanner: catching
// mistake 1 requires deliberately matching across newlines, which the package's scan regex
// excludes, so the regex below is wider than the real grammar on purpose.
//
// `deprefix` is duplicated from src/lib/slug.ts rather than imported: this script runs
// under whatever Node the deploy action provides, which may predate TypeScript stripping.
// It is the site's own map rule, not a shared one, and it is one regex.

import fs from 'node:fs';
import path from 'node:path';

import { parseWikiLink, slugify } from '@galaxy-foundry/wiki-links';

const CONTENT_DIR = path.resolve(new URL('../../content', import.meta.url).pathname);

/** Strip a leading one/two-digit order prefix (mirrors slug.ts deprefix). */
const deprefix = (s) => s.replace(/^\d{1,2}-/, '');

function walk(dir, out) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, out);
    else if (ent.isFile() && ent.name.endsWith('.md')) out.push(full);
  }
}

/** Blank out fenced blocks and inline code so [[ ]] inside them is ignored,
 *  preserving newlines so reported line numbers stay accurate.
 *
 *  This mirrors the transform, which rewrites text nodes only — a backtick means the
 *  syntax, not a link. Note the consequence: a backticked [[target]] naming a page that
 *  does not exist is invisible to BOTH surfaces, so it renders as dead monospace and is
 *  reported by nothing. If you mean a link, do not wrap it. */
function stripCode(src) {
  const blankNonNewline = (m) => m.replace(/[^\n]/g, ' ');
  return src
    .replace(/```[\s\S]*?```/g, blankNonNewline)
    .replace(/`[^`\n]*`/g, blankNonNewline);
}

const files = [];
walk(CONTENT_DIR, files);

// Valid targets: the de-prefixed basename of every content file, keyed exactly as the
// renderer keys its map.
const slugs = new Set(files.map((f) => slugify(deprefix(path.basename(f, '.md')))));

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
    const link = parseWikiLink(inner);
    // A payload that parses to nothing (`[[ ]]`) is left as written by the transform too.
    if (!link) continue;
    const slug = slugify(link.target);
    // An empty slug never resolves — `[[...]]` and `[[***]]` slugify to ''. The transform
    // refuses these rather than prefix-matching every key, so they are genuinely unresolved.
    if (slug.length === 0 || !slugs.has(slug)) {
      errors.push(
        `${rel}:${line}  unresolved target (renders as silent bold): [[${link.target}${link.anchor}]]`,
      );
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
