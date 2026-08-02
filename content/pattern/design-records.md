---
title: Design Records
description: The documents a Foundry keeps about itself — which records every instance is expected to have, what each one owns, what it must not, and which change obliges an edit.
section: pattern
order: 11
---

# Design Records

A Foundry accumulates documents about *itself* — why it is shaped this way, what the code
is, where files go, what runs and what proves the result current. These are **design
records**, and both current instances route them as a note kind (`meta`) inside the corpus
rather than parking them in a `docs/` directory outside every collection. That decision is
specified as PART 3 of [[standing-up-a-foundry]]; this page is the map of what goes *in* the
kind.

The map answers three questions per record — **what it owns**, **what it must not**, and
**what change obliges an edit** — and it answers them in one place, on purpose.

## Why the map is central rather than per-document

The obvious alternative is to make every record declare its own scope: open each one with a
paragraph naming what it owns and which neighbors own the rest. That works, and it is
tempting because the answer lives next to the thing it describes.

It is also the wrong trade. The scope question is asked far more often at *write* time than
at read time — someone changed the caster and needs to know where the sentence goes — while
the preamble is paid at *every* read, by every reader, most of whom already know. Worse, an
agent that has to open ten documents to discover which one owns its change will usually open
three and guess.

So the routing lives here, and a record's own prose stays free to open however it reads best.
A record **may** restate its scope or close with its own change trigger; where it does, the
two must agree, and a disagreement is a finding about one of them. What a record must never
do is be the *only* place its boundary is written down.

## The two shelves

Every design record declares a `record_kind`, and both instances use the same two values.
The field sorts a reading order, but it is doing something more useful than that: it is a
**voice contract**.

- **`foundation`** — the rationale a reader works through. May argue, may narrate, may carry
  the project's wager. Answers *why*.
- **`infrastructure`** — developer-facing description of how the thing is built. Present
  tense, contract-shaped, no argument. Answers *what*, *where*, and *when*.

A record whose voice fights its shelf is usually not miscategorized — it is two records. The
reliable tell is an `infrastructure` record that argues, or a `foundation` record whose
middle is a dispatch table and a directory listing.

## The core records

These are the records both instances have under the same name. The split into focused
architecture records is the load-bearing part: no catch-all architecture document, and every
record able to say what it does not own.

**`architecture.md`** · foundation · *the map*. Owns the system map, top-level boundaries,
architectural invariants, and the route to every focused record. Owns no detail a focused
record owns — it links instead of restating. Update it when a top-level component, boundary,
or reading route changes. It is the one record with a length budget: an orientation pass,
roughly a screen. Growth belongs in a focused record, and a map that keeps growing is
reporting that a focused record is missing.

**`guiding-principles.md`** · foundation. Owns the design pressure — why the shape is this
shape, and what each principle costs. Owns no mechanism; it names consequences rather than
issuing commands. Update it when a principle is adopted or retired, or when its consequences
change.

**`molds.md`** · foundation. Owns the Mold inventory and the axes it buckets on, and the
boundary between a Mold and reference content. Does not own the authoring contract, and does
not own what any Mold's body says. Update it when a Mold is added or retired, or an axis
changes.

**`mold-spec.md`** · foundation. Owns the Mold authoring contract: frontmatter, typed
references, source layout, which companion files may sit beside the note, and who enforces
each. Does not own which Molds exist, nor how casting consumes the contract. Update it when a
frontmatter field, companion rule, or reference field changes.

**`casting.md`** · foundation. Owns source-to-artifact semantics: per-kind dispatch, the
provenance contract, and the boundary between what is deterministic and what a model
produces. Does not own the authoring contract, where bundles land, or the gate commands.
Update it when a reference kind, dispatch behavior, provenance field, or the determinism
boundary changes.

**`corpus.md`** · foundation. Owns how external evidence grounds the Foundry without being
mirrored into it, and which integration is deliberately absent. Does not own what any
individual source says. Update it when the grounding mechanism, citation policy, or fixture
posture changes.

**`code-architecture.md`** · infrastructure. Owns implementation components named by path,
dependency direction, entry points, cross-component contracts, and deliberate absences. Does
not own note kinds, the file tree, or processing order. Update it when a component,
dependency seam, entry point, contract, or absence changes. The absences matter as much as
the components: a stack diagram implies its layers are the whole stack, so a greenfield
instance says outright that it has no package workspace, no caster, and no fixture toolchain.

**`content-model.md`** · infrastructure. Owns kinds, the frontmatter envelope, tags, links,
typed references, companions, note identity, and declared non-notes. Does not own package
dependencies, processing flows, or physical placement. Update it when a kind, metadata rule,
tag rule, link contract, reference relationship, or companion model changes.

**`build-and-validation.md`** · infrastructure. Owns what runs, in what order, and what
proves the output current: validation layers, generators and their check modes, cast and
assembly gates, the site build, CI. Does not own component ownership, placement, or casting
semantics. Update it when a command, generator, gate, or CI check appears, disappears, or
changes what it proves. Its standing rule is that no generated artifact is introduced without
naming both its producer and its check in the same breath — and an artifact with no check
says so, because silence reads as coverage.

**`repository-layout.md`** · infrastructure. Owns physical placement and lifecycle ownership
per top-level directory, plus the placement rules themselves. Does not own note semantics,
dependencies, or processing order. Update it when a top-level owner appears, a file class
changes lifecycle, or a placement rule changes — not for ordinary additions inside an
established directory.

**`glossary.md`** · not a record. Owns terminology, and is authoritative when a record's
usage differs from it. Update it when a term is coined or its meaning shifts. It shares the
design-record directory while being deliberately excluded from the collection by name:
hand-curated, alphabetical, rendered by its own page. Sharing a directory is a filing
decision, not a typing one.

## Commitments and machinery

The core list above is not "the records a mature Foundry ends up with." It is the records a
Foundry can write *honestly*, and the line that separates it from the conditional list below
is worth stating because it is not the obvious one.

`casting.md` is core even in an instance with no caster, no cast tree, and no bundle — the
[[statistical-genomics-foundry]] has all three absences and the record anyway. A design
record can describe a **commitment** truthfully before the machinery exists, provided it says
which parts are deferred. What it cannot do is describe machinery that does not exist as
though it runs.

So: **core records document commitments; conditional records document machinery.** A record
that can only be written by inspecting something built waits until that thing is built.

## Conditional records

Author these when their subject exists. Until then their absence is honest and their presence
is not.

| Record | Author it when | Owns |
|---|---|---|
| a cast walkthrough | a real cast is committed | one bundle traced end to end |
| an eval philosophy | Molds carry evaluation companions | the eval / scenario / refinement split |
| a schema-packages record | Mold IO schemas exist | where a schema lives, how a cast resolves one |
| a pattern-authorship record | contributors author reference pages | authoring rules for those pages |
| a positioning or prior-art record | the instance must locate itself | mission and nearest neighbors |

## Records for the extension surface

[[anatomy-of-an-instance]] separates the invariant substrate from what each domain adds. The
extensions get design records too, and those records are **named by the instance**, because
the thing they describe is not shared vocabulary.

**The composition record**, where a domain's work is an inherently multi-step journey. The
[[galaxy-workflow-foundry]] has one for its **pipelines** and the harness boundary beside
them. A Mold-primary instance needs no such record, because it has no such layer.

**The external-check record**, for the thing standing between authored knowledge and a
trusted result. Every instance has the *concern*; not every instance has a dedicated record
for it. The [[statistical-genomics-foundry]] does, because its check is authored knowledge
cast into a skill and is the project's defining architecture. The [[galaxy-workflow-foundry]]
does not, because its check is a deterministic CLI validator whose contract is already
carried by its principles and its build-and-validation record. Neither arrangement is wrong.
Ask whether the check is *described somewhere findable*, not whether it has its own file.

Do not fold these two into one slot. They answer different questions — *how do actions
compose* versus *what decides the result is trustworthy* — and an instance may have either,
both, or neither.

## The change → record index

The reverse direction, which is the one asked most often. Find the change, edit that record,
stop.

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
| authored a new Mold | the Mold inventory only — not the spec, not casting |
| added a Mold companion file kind | the Mold spec |
| added a top-level directory | repository layout *(+ the map, if it is a new boundary)* |
| moved generated output | repository layout **and** build and validation |
| coined or redefined a term | the glossary |
| adopted or retired a principle | guiding principles |
| made deferred machinery real | build and validation, the record that called it deferred, and any invariant in the map that named it |

A change that fits two records usually belongs in the more specific one, with a link from the
other. A change that fits none is evidence for a new record — add it, and say so in the map
rather than growing the map to absorb it.

## What is not shared

Reading order is not shared and is not expected to be. `order` is pedagogical and
instance-owned; only its uniqueness within a shelf is contractual, and both instances test
for that.

The names of extension records are not shared, by design.

One divergence is unsettled rather than deliberate: the two instances both locate themselves
against neighboring projects, one filing that as a dated landscape survey on the
`infrastructure` shelf and the other as mission-and-neighbors on the `foundation` shelf. The
role is clearly shared. The name, shelf, and scope are not yet, and this page is not going to
pretend otherwise.

## How to read this

At N=2 the honest claim is narrow. What both instances converged on independently is the
**split** — one purpose per record, every record able to name what it does not own — and the
routing of design records into the corpus as a validated kind. The five architecture names
are a shared *default* rather than a proven taxonomy: adopt them so a contributor can move
between Foundries without relearning where to look, and if your domain has a concern they do
not cover, add a record and say so in the map.

A record that keeps resisting its own boundary is telling you something about the taxonomy,
not only about the record.
