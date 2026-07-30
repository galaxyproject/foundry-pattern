---
title: Kind Catalog
description: Every content kind both Foundries define, with each kind's required metadata generated from that instance's own schemas — substrate kinds side by side, instance-specific kinds apart.
section: pattern
order: 8
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

This page answers both, for both instances, **generated from their schemas rather than
described**. Each instance emits a `kinds.generated.json` manifest whose required-metadata
tables are derived from the same zod definitions its validator runs; this site vendors those
manifests and renders them. Nothing below is transcribed, so nothing below can quietly stop
being true. The layout that makes this possible — one directory per kind, holding the schema,
its documentation, and a worked example — is specified in Part 3 of the
[[standing-up-a-foundry|Astro-stack worked example]].

## How to read it

**Substrate kinds** are declared by *every* instance. That is the empirical definition used
here, and it is deliberately harsher than a label: a kind counts as substrate because two
independently-motivated domains both reached for it, not because someone marked it so. If an
instance claims `layer: substrate` for a kind the other does not declare, this page says so
rather than accepting the claim.

**Instance-specific kinds** are declared by one. These are the extension surface — what each
domain had to add once the substrate ran out. Their number and weight is the honest measure of
how much actually generalized, and it is worth looking at directly rather than through the
summary in [[the-diff]].

Two things worth noticing when you read the tables:

- **The same kind can require different metadata in each instance.** `mold` and `pattern` are
  shared, but not identical — one instance puts a full lifecycle envelope on every note
  (`status`, `created`, `revised`, `revision`, `ai_generated`), the other took the parts it
  could populate truthfully and left the rest off rather than backfill dates it did not have.
  That gap is shown, not smoothed. A field stamped to satisfy a schema is worse than an absent
  one: it manufactures provenance.
- **A kind's *name* transferring is weaker evidence than its *required fields* transferring.**
  The "required by both" line under each substrate kind is the part that is really shared.

For where these kinds live inside a repository, and what a new instance should copy first, see
[[anatomy-of-an-instance]] and the [[standing-up-a-foundry|Astro-stack worked example]]. For the
vocabulary the `tags` field draws on, see [[tag-catalog]].
