---
title: "Astro-Stack Glossary"
description: The vocabulary an instance inherits from the Astro reference stack — note, kind, shape, companion, collection — pinned separately from the pattern's own terms because it describes an implementation, not the pattern.
section: pattern
order: 8
---

# Astro-Stack Glossary

The [[glossary]] pins the vocabulary of the abstract pattern: terms that hold for a Foundry built
on any stack. This page pins the layer beneath it — the words an instance acquires by adopting the
Astro stack described in [[standing-up-a-foundry|Build with the Astro Stack]], including how a
corpus gets typed and laid out on disk.

The split is not tidiness. A term in the pattern glossary is a claim about every Foundry that will
ever exist; a term here is a claim about the ones sharing this stack, and another instance on a
different stack may reasonably have none of them. Mixing the two makes the pattern look like it
requires decisions it does not, which is the failure mode the [[anatomy-of-an-instance|What a Foundry Needs]]
page exists to prevent.

Vocabulary reaches a Foundry from three places, and Part 1 of the Astro build guide says to pin them
in this order:

1. **The pattern's terms** — [[glossary]]. Every instance carries them, copied verbatim.
2. **The stack's terms** — this page. Every instance sharing this stack carries them.
3. **The domain's terms** — yours, coined corpus-first, once a real note needs one.

**That is an order of derivation, not a filing scheme.** The pattern site keeps two glossary pages
because the two sets have different audiences and different lifetimes — a term here can be revised
by a stack decision that has no bearing on a Foundry built some other way. An *instance* is under
no such pressure, and should keep one cohesive glossary its readers can learn the domain from.
Record where a term came from per entry, the way a kind declares its `layer` rather than living in
a separate directory of substrate kinds; a reader arriving at your glossary is trying to learn your
subject, not audit its supply chain.

What the provenance is *for* is narrower than a section heading: an inherited term must keep its
inherited definition, and a term you coined must not be able to pass as one the pattern handed you.

If two pages disagree about a term on this page, this page wins. If a term here ever turns out to
hold for Foundries on any stack, promote it to the pattern glossary rather than copying it there.

---

## The corpus on disk

**Note** — the unit of the corpus: one authored entry that declares its kind in frontmatter and
validates against that kind's schema. A [[glossary|Mold]] is one kind of note; a paper summary, a
pattern, a tutorial are others. A note is either a flat file or a directory whose `index.md` *is*
the note, and which of the two is a property of its **kind**, never of the individual note.

**Kind** — the `type:` discriminator a note declares, together with the one schema that validates
it. The kind decides what metadata is required, what casting may assume, and what the site can
render, so it is what makes a corpus machine-readable rather than a pile of Markdown. Beyond its
frontmatter schema a kind declares its **shape**, its **companions**, and its `layer` — `substrate`
if the pattern supplied the kind, `instance` if the domain added it. The [[kind-catalog]] tests
that last claim against every current instance rather than accepting it.

> Not to be confused with a **reference** kind (`pattern`, `schema`, `cli-command`, …), which
> classifies a dependency a Mold declares rather than a note in the corpus. One word, two closed
> vocabularies; a page using both should say which it means.

**Shape** — whether a kind's notes are flat files (`file`) or directories holding an `index.md`
(`directory`). Declared by the kind and required of every kind, because a kind that does not answer
leaves a hole in the cross-instance catalog exactly where a real difference lives: `pattern` and
`paper` now each appear in both flat-file and directory forms across the instances.

**Companion** — a non-note file in a directory-shaped note's directory, declared once by the
**kind** rather than repeatedly by each note (e.g. `eval.md` beside a Mold; `guidance.md` beside a
summarized paper). Three consequences worth stating outright:

- Only directory-shaped kinds have companions.
- A sibling that is itself a note is never a companion — a `cli-command` beside a `cli-tool` is a
  note, and nothing can tell the difference from the filename.
- A companion describes fixed **layout and cast disposition**, not progressive loading. A file a
  Mold depends on is still a [[glossary|Reference]]; resolving that referenced note is what makes
  its eligible companions relevant to the cast.

Each declaration carries a **requirement level** (`required` / `recommended` / `optional`) and a
**disposition** — whether casting may carry the file into a skill artifact (`foundry-only` never
leaves; `cast-input` is read by the caster but does not appear in the output; `bundled` is copied
in). The disposition is enforced, not descriptive: when a cast resolves a directory-shaped note,
its fixed `bundled` companions travel automatically and the other two stay out. Presence elsewhere
in the directory is never enough to ship a file.

> A kind with `additionalCompanions: allow` has an open extension to that fixed layout. A per-note
> `companions:` field may enumerate those additional members, but it supplements the kind; it
> cannot reclassify a fixed `foundry-only` or `cast-input` file as bundled. A closed kind accepts no
> per-note additions.

**Collection** — a *location*: a base directory plus the pattern selecting which files under it are
notes, and the kind those notes are. Collections and kinds are deliberately not one-to-one — one
directory can hold two kinds, and two collections can resolve to the same kind — so a kind's
**locations** are derived from the collection table rather than declared beside the kind.

## What crosses the instance boundary

**Kind context** — what a kind's schema is allowed to draw on when it is built: the base
frontmatter envelope plus whatever registries the instance hands it. This is the **seam** between
instances. Foundries agree exactly on what a kind *is* and disagree entirely on what a kind may
draw *from*, which is why the shared contract is generic over the context and each instance binds
it once.

**Kind manifest** — the generated, machine-readable record of every kind an instance defines: its
title, layer, summary, shape, companions, locations, documentation, and required fields, the last
derived from the same schema that validates notes. It is the one artifact in a Foundry whose
consumer is *another repository* — the [[kind-catalog]] on this site renders three of them — which is
why its format is a shared, versioned package rather than each instance's own JSON.

**Tag and facet** — the controlled browse vocabulary: every note carries at least one tag, every
tag belongs to a declared facet, and every facet is a closed enum whose members each carry a
one-line gloss. Tags are how a corpus is *browsed*, as distinct from how it is *typed*; see the
[[tag-catalog]].
