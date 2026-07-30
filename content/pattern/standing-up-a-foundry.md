---
title: "One Worked Example: the Astro Stack"
description: How one concrete stack — Astro, zod, six installed packages — resolves each of the pattern's invariants into a named decision, and what building a second instance on it corrected.
section: pattern
order: 7
instructions: pattern/standing-up-a-foundry.instructions.txt
---

# One Worked Example: the Astro Stack

[[setting-up-a-foundry|Setting up a Foundry]] is the summary in front of this page, and it is
deliberately stack-agnostic: it says *pin the vocabulary*, *type the frontmatter*, *build an
external check* — and names no tool that could do any of them. That silence is right for a
pattern and useless for a repository. An instance cannot decline to pick a site generator.

This page is the checklist that picks — standing up a Foundry on one stack, concretely, all the
way down to commands. Every step below resolves one abstract commitment into a
specific decision — a named package, a path, a command — for **one** stack: a static Astro site
deployed to GitHub Pages, Markdown content in a `content/` tree beside it, TypeScript and zod
for the frontmatter contract, a vitest validator, and six installed `@galaxy-foundry/*`
packages. Both current instances run that stack, which is what makes this a worked example
rather than a proposal.

None of those choices *is* the pattern. Swap Astro for any generator that renders Markdown and
resolves links; swap zod for any schema library one validator and one type can both read; swap
GitHub Pages for anything that serves static files. What does not survive the swap is what the
choices had to **do** — and that part is worth reading even if you decide differently on every
row.

## What the choices had to do

Each row takes one invariant from [[anatomy-of-an-instance|Anatomy]], states the demand it makes
on *any* implementation, and gives the decision this checklist makes to satisfy it.

| Invariant | What it demands of an implementation | What this checklist decides |
|---|---|---|
| The reader's surface | The KB renders as something a human navigates, and a link that goes nowhere is an error rather than a dead end. | **Part 2.** A static site over the content tree, with one `[[Target]]` grammar shared by the renderer and the validator so the two cannot disagree about what a link means; an unresolved link fails CI. |
| The Mold's typed frontmatter | A note's kind is *declared*, and something outside the model decides whether the note satisfies that kind. | **Part 3.** One directory per kind holding its zod schema, its documentation, and a worked example. The kind contract itself is installed, not re-specified. A committed type test guards the discriminated union, because a typecheck passes just as quietly when the types have collapsed to `any`. |
| Corpus-grounding | Abstractions cite a real external source, and the source is not mirrored into the KB. | **Part 5.** One directory per source, holding a regenerable summary. A synced multi-chapter source keeps a manifest and a SHA-256 pin and redistributes no source text. Summary posture follows the *license*, not the source type. |
| Provenance | Every claim carries what produced it, and the record is checkable rather than decorative. | **No part of its own.** Provenance is a field discipline spread across Parts 3, 5 and 6 — `derived:`, `evidence:`, the pins, the summarizer flags carried forward verbatim — because in practice it is frontmatter you must be able to populate *truthfully*. A field stamped to satisfy a schema manufactures the thing it records. |
| Progressive disclosure | Up-front material is distinguishable from on-demand material, mechanically. | **Part 6.** Each typed reference draws `load` and `mode` from the shared reference contract, so disclosure is a declared property of the reference rather than an editorial habit. |
| Deterministic-first casting | The compile step is reproducible, and the LLM is reserved for the few kinds where condensation adds value. | **Everything a caster needs, and not the caster.** The typed contract, the reference vocabulary, the license policy deciding what may be copied verbatim, the registries a cast resolves against — then it stops. The caster is where the *target format* enters, and the target is extension surface, not substrate. |

The external check gets no row, deliberately. It is the one invariant whose realization the
pattern refuses to fix — Part 7 gives structural paths (prefer a deterministic decider where
output is parseable; construct an empirical one where it is not) and no tool, because the two
current instances answered it in ways that resemble each other not at all.

## The third category: what doing it twice corrected

A prescriptive page is a claim you can be wrong about, and this one has been. The corrections
are the interesting part, because they are neither the abstract pattern nor arbitrary taste
about a stack — they are what two independent implementations *paid for* and could not have
deduced:

- **One routing table, not a recovered mapping.** The instruction used to say to recover the
  source-to-route mapping from the router rather than keep a parallel list. Right instinct,
  wrong half: a router cannot tell you which files are *notes*, so the second list gets written
  anyway. One table, typed, is the fix.
- **Materialize, don't transform.** Metadata shared across sibling notes is *copied into* each
  note's frontmatter by a generator with a `--check` mode — never merged in at load — so every
  note still validates from what it actually carries.
- **`as const` is load-bearing, not tidiness.** Widen the kind list and the union still
  validates while its output type quietly degrades.
- **Commit the probe.** One instance carried three comments claiming its typecheck caught a
  hazard; measured, it caught neither of the two. Zero errors is what success and total erasure
  both look like.
- **An upgrade can move a rule's enforcement without moving the rule.** Both instances took the
  same major-version wave, and it changed *who* was holding two of the checklist's rules. A schema
  library stopped making one of them compulsory, so the contract now holds it alone; a framework
  stopped running a plugin pipeline unless asked, so a build that renders every link as literal
  text still passes. Neither failure is loud, and a checklist that keeps the rule while its
  original justification quietly expires is how prescription rots.

That last one is the shape of the whole category: the checklist absorbed the measurement, not
the assumption.

## Where the two instances actually landed

The abstract claim is that the substrate transfers. The generated version of that claim is in
the [[kind-catalog]] — every kind both instances define, with each kind's required metadata
derived from that instance's own schemas rather than transcribed, so the parts that transferred
and the parts each domain had to invent are separated by evidence instead of by assertion. The
browse vocabulary layered over those kinds is in the [[tag-catalog]]. For the comparative
argument these tables are the raw material for, see [[the-diff]].

## The vocabulary comes with the stack

Adopting a stack means adopting its words, and those are not the pattern's words. `note`, `kind`,
`shape`, `companion`, `collection` describe how a corpus gets typed and laid out on disk — real
decisions, but decisions *this* implementation made, which a Foundry on another stack could
reasonably answer differently or not face at all. They are pinned in the
[[astro-stack-glossary]], deliberately apart from the [[glossary]].

An instance therefore inherits vocabulary from two places before coining anything of its own: the
pattern's terms, which every Foundry carries, and this stack's, which only the ones sharing it do.
That is worth *recording* per term — an inherited word has to keep its inherited meaning — but it
is not a reason to partition an instance's glossary into three sections. A Foundry's glossary
should read as one cohesive vocabulary for the domain it teaches; where each term came from is a
property of the entry, the same way a kind declares its `layer` rather than living in a separate
directory of substrate kinds. Part 1 below starts there, before any machinery.

## How to read the checklist below

It is rendered **verbatim**, and it reads as instructions rather than prose because that is what
it is — working notes precise enough to hand to an agent or follow by hand. Work it top to
bottom and expect to loop back; a Foundry is grown, not stamped. Versions live in one
`REFERENCE STACK` table and bump as a set. The closing section grades every substrate step
`INSTALLED` / `MECHANICAL` / `YOURS`; the middle grade is where the next shared package comes
from, and only when a second instance writes the same wiring again.
