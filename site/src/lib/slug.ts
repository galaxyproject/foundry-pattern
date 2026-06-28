// Slug rules for the foundry-pattern site.
//
// Content files live under content/<section>/<file>.md. Reading-order is encoded
// with a one- or two-digit numeric prefix (`01-story.md`) that must NOT appear in
// the route or in wiki-link targets. Blog posts are prefixed with a four-digit
// year (`2026-06-blind-regeneration.md`) which IS part of the slug. So we strip a
// leading 1–2 digit prefix only — `\d{1,2}-` — which leaves `2026-…` untouched.

/** Strip a leading one/two-digit order prefix from a single path segment. */
export function deprefix(segment: string): string {
  return segment.replace(/^\d{1,2}-/, '');
}

/** content-relative path (e.g. "pattern/01-story.md") -> route id ("pattern/story"). */
export function entryToId(entry: string): string {
  const noExt = entry.replace(/\.md$/, '');
  const parts = noExt.split('/');
  const file = deprefix(parts.pop() ?? '');
  return [...parts, file].join('/');
}

/** The bare slug a wiki-link uses to address a file (its de-prefixed basename). */
export function entryToSlug(entry: string): string {
  const noExt = entry.replace(/\.md$/, '');
  return deprefix(noExt.split('/').pop() ?? '');
}
