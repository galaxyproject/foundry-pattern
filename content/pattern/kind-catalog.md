---
title: Kind Catalog
description: Every content kind the three Foundries define, with required metadata generated from each instance's own schemas — universal kinds together, non-universal kinds made explicit.
section: pattern
order: 10
catalog: kinds
---

# Kind Catalog

A Foundry's knowledge base is not a pile of Markdown. Every note declares its **kind** —
`type: mold`, `type: paper` — and the kind picks the one schema that validates it. The kind is
what makes the corpus machine-readable at all: it decides what metadata is required, what the
casting step may assume, and what the site can render.

So "what kinds does a Foundry define?" is the first question a new instance has to answer, and
the second question — "which of those did I have to invent, and which came with the pattern?" —
is the one that tells you whether the pattern is real.

This page answers both, for all three instances, **generated from their schemas rather than
described**. Each instance emits a `kinds.generated.json` manifest whose required-metadata
tables are derived from the same zod definitions its validator runs; this site vendors those
manifests and renders them. Nothing below is transcribed, so nothing below can quietly stop
being true. The layout that makes this possible — one directory per kind, holding the schema,
its documentation, and a worked example — is specified in Part 3 of the
[[standing-up-a-foundry|Build with the Astro Stack]].

## How to read it

**Substrate kinds** are declared by *every* instance. That is the empirical definition used
here, and it is deliberately harsher than a label: a kind counts as substrate because every
current domain reached for it, not because someone marked it so. If an instance claims
`layer: substrate` for a kind another does not declare, this page says so
rather than accepting the claim.

**Non-universal kinds** are absent from at least one instance. Some are unique to one domain;
others transferred between two before the third showed they were not universal. Their number
and weight is the honest measure of how much actually generalized, and it is worth looking at
directly rather than through the summary in [[the-diff]].

Two things worth noticing when you read the tables:

- **The same kind can require different metadata in each instance.** `mold` and `meta` are
  shared by all three, but not identical — one instance puts a full lifecycle envelope on every note
  (`status`, `created`, `revised`, `revision`, `ai_generated`), the other took the parts it
  could populate truthfully and left the rest off rather than backfill dates it did not have.
  That gap is shown, not smoothed. A field stamped to satisfy a schema is worse than an absent
  one: it manufactures provenance.
- **A kind's *name* transferring is weaker evidence than its *required fields* transferring.**
  The "required by every instance" line under each substrate kind is the part that is really shared.

## Name, fields, layout

There is an order to how much a match is worth, and it runs in one direction.

A kind's **name** is the weakest evidence: a name can be borrowed. Its **required fields** are
stronger — several schemas agreeing means several implementations decided the same metadata is
load-bearing. Its **layout**, meaning what
files sit beside a note and under what names, is stronger still, because a layout is not something
you standardize without also standardizing the working practice that produced it. `eval.md` and
`scenarios.md` now sit beside Molds in all three Foundries at the same requirement and disposition.

Kinds can now say this out loud. A kind declares its **shape** — whether its notes are flat files
or directories — and its **companions**, the non-note files belonging beside a directory-shaped
note, each with a requirement level and a disposition saying whether casting may carry it into an
artifact. Both terms are pinned in the [[astro-stack-glossary]] — they belong to this stack rather
than to the pattern — and specified in Part 3 of the
[[standing-up-a-foundry|Build with the Astro Stack]].

Three things that declaration makes visible for the first time:

- **`pattern` and `paper` have more than one physical form.** The first two instances split on
  `pattern`; the third adds a flat `paper` beside Statistical Genomics' directory-shaped one.
  Those differences used to live inside collection globs and reached no manifest, so this page
  could not have reported them however carefully you read the tables.
- **An open companion set is not an empty one.** A kind may declare that files it has not
  enumerated are legitimately present — vendored sources beside a research note. That says
  *unbounded*, not *none*. They are opposite claims, only one of them is checkable, and the table
  below marks the open one rather than leaving a blank to be read either way. Exactly one kind
  across all three instances declares it. A book chapter looked like the second case and is not: its
  acquisition files sit at the *book* level, one directory above the chapter that is the note, so
  declaring the chapter open would have claimed unboundedness where the truth is those files
  belong to a container that is not a note at all.
- **The declaration is load-bearing, not documentation.** Validation reads it to check the note
  directory, catalogs read it to report the layout, and casting reads the same declaration to copy
  fixed `bundled` companions while keeping `foundry-only` and `cast-input` files out. No target or
  note restates that fixed membership.

Each substrate kind below carries a companion table with one row per file and one column per
instance, reading *requirement · disposition*. A file every declaring instance carries at the
same requirement and disposition is highlighted: that is the layout transferring, and it is the
strongest claim on this page. A missing declaration shows as a dash — a real difference and not
a gap in the data.

For where these kinds live inside a repository, and what a new instance should copy first, see
[[anatomy-of-an-instance]] and [[standing-up-a-foundry|Build with the Astro Stack]]. For the
vocabulary the `tags` field draws on, see [[tag-catalog]].
