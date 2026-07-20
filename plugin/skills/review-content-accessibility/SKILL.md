---
name: review-content-accessibility
description: "Review a Foundry site's rendered content pages against their source files for capture/render fidelity, metadata surfacing, clean markup, and working links — checking each page reads well for BOTH humans and agents. NOT a content-correctness review. Use when reviewing changed content, a named page, or a URL."
---

# review-content-accessibility

This is NOT a content-correctness review. You are checking that the site **captures and
renders** each source in ways that read well for **both humans and agents** — not whether the
source is right. Flag anything *obviously* wrong in passing (a broken number, a title that
mismatches the source), but don't hunt for factual errors.

This skill is deliberately infrastructure-agnostic: it names *what* to check, and recovers
*how* to run and route the site from the project's own docs rather than assuming a stack.

## Step 0 — pick targets

From the invocation argument (a content id, a route, a `[[wiki-link]]`, or a URL):

- **a recoverable content identifier** — a `collection/id`, a route partial, or a
  `[[wiki-link]]` → resolve it to the source file(s) it names (a bare collection means every
  page in it).
- **a full URL** → that page.
- **empty** → the content/docs whose source changed vs `origin/main`
  (`git diff --name-only origin/main...`), mapped to their pages. This is the common case:
  author a page, then review it.

## Step 1 — run the site, recover its routes

Start the dev server the way the project documents it — **the project's own contributor/agent
docs are the source of truth** (`AGENTS.md`, `CLAUDE.md`, or the `README`); don't hardcode the
command here. Capture the local URL and any base path it prints; every content route sits under
that base. **Content routes are declared by the site's page router — recover the source↔route
mapping from there**, not by guessing a URL shape. Leave the server running; stop it when the
review is done.

## Step 2 — review each target in two parallel lanes, then reconcile

For each target, work two lanes concurrently and diff them:

- **Rendered lane** — load the page in the browser (Playwright MCP if available; else fetch the
  dev-server HTML). Read the visible text, any metadata box, and every link/`href`.
- **Source lane** — read the source file + its frontmatter (and any sibling files a page
  composes in, e.g. a Mold's `eval.md` / `scenarios.md`).

Reconcile: does the rendered page faithfully surface what the source holds? With multiple
targets, fan the pairs out in parallel — if you use subagents, have them return findings
reports; do the writing/reporting yourself.

## Step 3 — what to check

**Markup leakage** (rendered page must be clean):

- raw `[[wiki-link]]` text — if the site uses wiki-links, not every content type's renderer
  necessarily resolves them; a `[[…]]` that reaches the rendered page leaks. Confirm which types
  resolve them (check the renderer) before flagging.
- literal markdown tokens showing (`**bold**`, backticks, `#` headings, `|` tables not tabled),
  escaped HTML entities, a leftover `---` / frontmatter block, unrendered math (`$…$` KaTeX /
  MathML) if the site renders math, stray footnote/reference markers.

**Links** are linked properly:

- internal links resolve (no 404, no wiki-link that fell back to bold-with-no-href);
- external links present and correct — source URL, `doi:` → doi.org, license terms; anchors
  (`#term`) land somewhere.

**Metadata that should render, renders** — every relevant frontmatter field that should surface
does, and none render empty/placeholder. In particular: source/KB pages surface their
**provenance/license block**; Molds surface identity plus the `eval ✓/— · scenarios ✓/—`
presence markers (whether the Mold ships an `eval.md` / `scenarios.md`). Flag fields present in
source but invisible on the page, and anything rendered but blank.

**Agent-readable** — could an agent scraping only the rendered page recover the same
load-bearing facts as the source? Check for a meaningful `<title>`/description, sane heading
structure, the search-index body (if the site ships one), and that no fact lives only in markup
the render dropped.

**Human-readable** — heading hierarchy sane, no wall-of-text, tables/code/math render, any
metadata/license box legible.

## Step 4 — report

Group findings by target. Tag each **blocker / should-fix / nit**. For every finding cite the
source location and what the rendered page actually shows — state the source↔render mismatch
explicitly. List pages that passed clean. Don't fix anything unless asked; this skill reports.
