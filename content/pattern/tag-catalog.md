---
title: Tag Catalog
description: All three Foundries' controlled tag vocabularies, generated from their registries — the shared format, each instance's facets, and where a shared key hides different meanings.
section: pattern
order: 10
catalog: tags
---

# Tag Catalog

Tags are how a Foundry's corpus is browsed. Not how it is *typed* — that is the `type:`
discriminator and the [[kind-catalog]] — but how a reader crosses it: every note carries at
least one tag, every tag belongs to a declared **facet**, and every facet is a closed enum
whose members each carry a one-line gloss.

The **format** is substrate, shared verbatim across instances and specified in Part 4 of the
[[standing-up-a-foundry|Build with the Astro Stack]]. The **vocabulary** is not, and should not
be: a domain's browse axes are the domain's.

This page renders all three registries as they actually stand, vendored from each instance's
`meta_tags.yml`.

## What the format buys, and why it is worth copying

Three rules do the work, and each exists because its absence caused a specific problem:

- **Membership is declared, never parsed.** A tag is valid because some facet lists it under
  `values` — not because its text begins with a facet name. So `target/not-a-real-thing` is as
  invalid as `nonsense`, the slash is a naming convention rather than a rule, and a bare key
  with no slash is an ordinary member of its facet rather than a documented special case.
- **Every facet is closed, and every tag has a gloss.** There is no open family, no
  free-form escape hatch. A tag with no gloss is a tag the browse surface cannot document and a
  reader cannot learn from — so the registry is the complete, permanent catalog of what the
  corpus can carry, which is what makes a page like this one possible at all.
- **Browse pages group by the *declaring* facet.** Not by prefix. That is what makes an
  "other" bucket structurally impossible rather than merely empty today.

A fourth rule is about what tags are *for*: they are cross-cutting facets only. A note's kind
is never copied into its tags. The first two instances encoded kind-as-tag early, and both removed it —
two encodings of one fact drift, and the one in `tags` is the one nothing validates against.

## How to read it

**A shared facet key is not a shared meaning.** The first two registries both declare `topic`,
and they mean different things — one groups pattern maps, the other sits beneath a `domain`.
The third instance does not declare it at all. Facets every instance uses are shown first with
their descriptions side by side; partial overlaps remain visible in the per-instance views.
That distinction is exactly what otherwise gets lost when someone assumes a key transfers.

The per-instance vocabularies follow in full, with each facet's own description and every tag's
gloss. A facet declared with no members yet is shown as such — the format permits it while a
facet is still being filled, and hiding it would misrepresent the registry.

For the kinds these tags are attached to, see [[kind-catalog]]. For what else a new instance
inherits versus supplies, see [[anatomy-of-an-instance]].
