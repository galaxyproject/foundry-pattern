---
title: Design Records
description: The documents a Foundry keeps about itself — which records every instance is expected to have, what each one owns, what it must not, and which change obliges an edit.
section: pattern
order: 11
---

# Design Records

A Foundry accumulates documents about *itself* — why it is shaped this way, what the code is,
where files go, what runs and what proves the result current. These are **design records**, and
they are notes of kind `meta`, routed and validated like every other note in the corpus.

This page maps them. Three questions per record — **what it owns**, **what it must not**, and
**what change obliges an edit** — answered here rather than in each record, so a change can be
routed without opening all of them. A record may also state its own scope, or close with its own
change trigger; where it does, the two must agree.

## The two shelves

Every design record declares a `record_kind`, and both instances use the same two values. The
field sorts a reading order, but it is doing something more useful than that: it is a **voice
contract**.

- **`foundation`** — the rationale a reader works through. May argue, may narrate, may carry the
  project's wager. Answers *why*.
- **`infrastructure`** — developer-facing description of how the thing is built. Present tense,
  contract-shaped, no argument. Answers *what*, *where*, and *when*.

A record whose voice fights its shelf is usually not miscategorized — it is two records. The
reliable tell is an `infrastructure` record that argues, or a `foundation` record whose middle is
a dispatch table and a directory listing.

Reading order within a shelf is instance-owned. `order` is pedagogical, it does not transfer
between Foundries, and only its uniqueness within a shelf is contractual — both instances test
for that.

## The core records

Both instances carry these under the same name. Each has one purpose and can say what it does
not own.

**`architecture.md`** · foundation · *the map*. Owns the system map, top-level boundaries,
architectural invariants, and the route to every focused record. Owns no detail a focused record
owns — it links instead of restating. Update it when a top-level component, boundary, or reading
route changes. It is the one record with a length budget: an orientation pass, roughly a screen.
Growth belongs in a focused record, and a map that keeps growing is reporting that a focused
record is missing.

**`guiding-principles.md`** · foundation. Owns the design pressure — why the shape is this shape,
and what each principle costs. Owns no mechanism; it names consequences rather than issuing
commands. Update it when a principle is adopted or retired, or when its consequences change.

**`molds.md`** · foundation. Owns the axes Molds bucket on, the boundary between a Mold and
reference content, and the direction — which Molds the Foundry intends to build and why. It does
not own a list of the Molds that exist; the corpus enumerates those already. Update it when a
bucketing axis changes or the direction does, not when a Mold is authored.

**`mold-spec.md`** · foundation. Owns the Mold authoring contract: frontmatter, typed references,
source layout, which companion files may sit beside the note, and who enforces each. Does not own
which Molds exist, nor how casting consumes the contract. Update it when a frontmatter field,
companion rule, or reference field changes.

**`casting.md`** · foundation. Owns source-to-artifact semantics: per-kind dispatch, the
provenance contract, and the boundary between what is deterministic and what a model produces.
Does not own the authoring contract, where bundles land, or the gate commands. Update it when a
reference kind, dispatch behavior, provenance field, or the determinism boundary changes.

**`corpus.md`** · foundation. Owns how external evidence grounds the Foundry without being
mirrored into it, and which integration is deliberately absent. Does not own what any individual
source says. Update it when the grounding mechanism, citation policy, or fixture posture changes.

**`code-architecture.md`** · infrastructure. Owns implementation components named by path,
dependency direction, entry points, cross-component contracts, and deliberate absences. Does not
own note kinds, the file tree, or processing order. Update it when a component, dependency seam,
entry point, contract, or absence changes. The absences matter as much as the components: a stack
diagram implies its layers are the whole stack, so an instance says outright that it has no
package workspace, no caster, and no fixture toolchain when it does not.

**`content-model.md`** · infrastructure. Owns kinds, the frontmatter envelope, tags, links, typed
references, companions, note identity, and declared non-notes. Does not own package dependencies,
processing flows, or physical placement. Update it when a kind, metadata rule, tag rule, link
contract, reference relationship, or companion model changes.

**`build-and-validation.md`** · infrastructure. Owns what runs, in what order, and what proves the
output current: validation layers, generators and their check modes, cast and assembly gates, the
site build, CI. Does not own component ownership, placement, or casting semantics. Update it when
a command, generator, gate, or CI check appears, disappears, or changes what it proves. Its
standing rule is that no generated artifact is introduced without naming both its producer and
its check in the same breath — and an artifact with no check says so, because silence reads as
coverage.

**`repository-layout.md`** · infrastructure. Owns physical placement and lifecycle ownership per
top-level directory, plus the placement rules themselves. Does not own note semantics,
dependencies, or processing order. Update it when a top-level owner appears, a file class changes
lifecycle, or a placement rule changes — not for ordinary additions inside an established
directory.

**`glossary.md`** · not a record. Owns terminology, and is authoritative when a record's usage
differs from it. Update it when a term is coined or its meaning shifts. It shares the
design-record directory while being deliberately excluded from the collection by name:
hand-curated, alphabetical, rendered by its own page. Sharing a directory is a filing decision,
not a typing one.

### None of these is an inventory

Where the corpus already enumerates something — the Molds that exist, the kinds defined, the tags
registered, the casts committed — the record describes the **shape** and lets the generated
surface hold the list. A record that restates a list goes stale the moment the list changes, and
a reader has no way to tell which copy is current. Describe the axes, the contract, and the
direction; let the site count.

## The change → record index

The reverse direction, which is the one asked most often. Find the change, edit that record, stop.

| You changed | Record to update |
|---|---|
| added or removed a note kind | content model *(+ code architecture for the new kind directory)* |
| added a tag or facet | content model |
| changed the frontmatter envelope | content model |
| added a package, or reversed a dependency | code architecture *(+ repository layout)* |
| added a generator or a check mode | build and validation |
| added a CI gate | build and validation |
| added a reference kind | casting **and** the Mold spec |
| changed the deterministic/model boundary | casting |
| authored a new Mold | nothing — the corpus lists it. Only a new bucketing axis or a change of direction touches the Mold record |
| added a Mold companion file kind | the Mold spec |
| added a top-level directory | repository layout *(+ the map, if it is a new boundary)* |
| moved generated output | repository layout **and** build and validation |
| coined or redefined a term | the glossary |
| adopted or retired a principle | guiding principles |
| made deferred machinery real | build and validation, the record that called it deferred, and any invariant in the map that named it |

A change that fits two records usually belongs in the more specific one, with a link from the
other. A change that fits none is evidence for a new record — add it, and say so in the map
rather than growing the map to absorb it.

## An open contract

The core records are not the whole set and are not meant to be. Any number of further `meta`
records may appear — for a domain concern, for a piece of machinery, for a decision that kept
getting re-argued — and they need no permission from this page. A third Foundry will want records
neither current instance has; [[anatomy-of-an-instance]] is where what varies by domain is set
out.

Two constraints apply to all of them. A record may describe a **commitment** before the machinery
exists, provided it says which parts are deferred: `casting.md` is a core record in an instance
that has no caster, no cast tree, and no bundle. What no record may do is describe absent
machinery as though it runs — and a record that can only be written by inspecting something built
waits until that thing is built.

Some records from the current instances, and what makes each one earn its place:

- **A cast walkthrough** — [one committed bundle traced end to
  end](https://galaxyproject.github.io/foundry/meta/cast-walkthrough/), every file followed back
  through per-kind dispatch and provenance. A casting design can drift from what the caster
  actually does; a walkthrough checked against real bytes cannot.
- **An eval philosophy** — [why the abstract oracle and the concrete cases are separate
  files](https://galaxyproject.github.io/foundry/meta/eval-philosophy/). Without the split,
  evaluation collapses into a list of examples the Mold author can satisfy by construction.
- **A schema-packages record** — [where a Mold IO schema lives and how a cast resolves
  one](https://galaxyproject.github.io/foundry/meta/schema-packages/). Worth writing as soon as a
  schema has more than one plausible home, because it names the rule before someone invents a
  second one.
- **A composition record** — where a domain's work is an inherently multi-step journey, the
  [ordered journeys and the harness
  boundary](https://galaxyproject.github.io/foundry/meta/harness-pipelines/) beside them. The
  [[galaxy-workflow-foundry]] has one because workflow construction is sequential by nature; a
  Mold-primary instance needs none.
- **An external-check record** — where the check is itself authored knowledge rather than a tool
  you call, it deserves its own record: the [[statistical-genomics-foundry]]'s [analyze → referee
  → revise
  loop](https://github.com/jmchilton/statistical-genomics-foundry/blob/main/content/meta/referee-loop.md)
  is that instance's defining architecture. The [[galaxy-workflow-foundry]] has no equivalent
  record, because its check is a deterministic CLI validator already described by its principles
  and its build-and-validation record. Ask whether the check is described somewhere findable, not
  whether it has its own file.
- **A positioning or prior-art record** — both instances keep one, under different names and on
  different shelves. It is where *what this is not* gets written down once, so the boundary is
  not re-argued in every other record.

## How to read this

At N=2 the honest claim is narrow. What both instances converged on independently is the
**split** — one purpose per record, every record able to name what it does not own — and the
routing of design records into the corpus as a validated kind. The architecture names above are a
shared *default* rather than a proven taxonomy: adopt them so a contributor can move between
Foundries without relearning where to look, and where your domain has a concern they do not
cover, add a record and say so in the map.
