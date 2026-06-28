---
title: The Model
description: The Foundry's machine in one read — a Knowledge Base of Molds cast into frozen, provenance-stamped target artifacts.
section: pattern
order: 2
---

# The Model

A Foundry is a small machine with four moving parts: a **Knowledge Base** you author, **Molds** that make slices of it executable, a **Cast** step that freezes those slices into distributable artifacts, and **Provenance** that records what each freeze contained. Everything else — pipelines, targets, validation — composes from these. This page defines each part and shows how they fit. Instances appear only as illustration; the parts themselves are domain-free.

## Knowledge Base

The **Knowledge Base (KB)** is the source of truth: an inspectable, human-readable corpus authored to be *read and learned by a human*, not merely stored for an agent to retrieve. It is the surface a person scrutinizes, corrects, and cites against. Its structure — typed frontmatter, controlled tags, wiki-linked references — is what makes it *executable*: organize the knowledge well and the artifacts, validation, and rendering fall out of the structure rather than being maintained by hand.

The KB is plain files. It stays the source of record no matter how many artifacts are cast from it.

## Mold

A **Mold** is the unit of the KB: an abstract, *typed reference manifest* describing one action. It is not the knowledge itself — it is a declaration of which knowledge one action depends on, plus a procedural body skeleton for performing that action. A Mold is a source artifact, independent of any agent runtime.

Each Mold declares its dependencies as typed references. Every reference carries:

- a **kind** — which resolver and casting behavior applies;
- a **load policy** — `upfront` (always present) or `on-demand` (fetched only when a stated trigger fires);
- a **transform mode** — copied verbatim, or condensed.

The load policy is **progressive disclosure** made explicit: upfront references are the always-loaded core; on-demand references sit behind triggers so the action carries only what a given run needs. The Mold author decides, per reference, what is core and what is contingent.

### Reference kinds

The references a Mold depends on are not all the same shape, so the manifest is typed. Across instances the recurring kinds are:

- **other KB pages** — reference content the action reasons over;
- **schemas** — typed input/output contracts for the artifacts the action consumes and produces;
- **CLI manual pages** — per-command reference for any command-line tool the action wraps;
- **prompts** — reusable prompt fragments;
- **examples** — concrete walk-throughs or fixtures.

A Mold composes these into one coherent declaration of an action. Authoritative term definitions live in the [[glossary]]; the shared shape across instances — and where instances diverge — is drawn out in [[anatomy-of-an-instance]].

## Cast

**Casting** is the compilation step that turns a Mold into a target-specific artifact. It runs **deterministic-first, LLM-second** — that ordering is a trust ordering. Deterministic tooling assembles the artifact body, copies verbatim references, builds sidecars, and writes provenance; an LLM is invoked only where it adds value, on the reference kinds explicitly marked for condensation, and every LLM-produced fragment is recorded. The skill body itself is never hand-maintained: if a cast looks under-instructed, you fix the Mold and re-cast.

Casting is the **integration boundary**. The artifact it produces is:

- **condensed** — only what the action needs, at the size the target wants;
- **isolated** — no links back to the KB, no runtime dependency on it;
- **frozen** — a snapshot, not a live view.

The wiki-links that make the KB navigable are resolved away or stripped, so the artifact is self-contained. This is the deliberate inversion at the heart of the pattern: the authored skill file is a **compile target**, never the authoring surface. The KB is the source; the artifact is the package. (Why this matters as an argument is [[the-two-assets]].)

## Provenance

Every cast emits a **Provenance** record (`_provenance.json`) beside the artifact. It is not part of the artifact and is never loaded by the consumer; it is the lineage. It records:

- the **Mold revision** and content hash the artifact was cast from;
- the **model version** and prompt identity for any LLM-produced fragment;
- the **references resolved** — each with its source and destination hash, and whether it was produced deterministically or by an LLM;
- the **checks run** at cast time.

Provenance is what makes drift *mechanically detectable*: re-hash the Mold and its references, compare against the record, and a stale artifact announces itself. It is also the forensic trail — which specific claim came from where — that a bare artifact cannot offer.

## Pipeline and Target

A **Pipeline** is an ordered sequence of Molds composing an end-to-end task. It is both a build artifact (the Molds a harness will orchestrate, in order) and a navigation surface (a journey map over the KB). Pipelines are referenced content, not themselves cast.

A **Target** is the output format a cast produces — one agent-skill format, a generic skill, a baked-in bundle. Casting is parameterized by target; the same Mold can be cast to several. The KB stays the single source of truth across all of them; each target is one rendering of it.

## How it composes

```
                            cast
                       (deterministic
   ┌───────────────┐    first,         ┌──────────────────────┐
   │ Knowledge Base│    LLM second)    │  target artifact      │
   │   └─ Mold ─────┼──────────────────▶│  (frozen, condensed,  │
   │      (typed    │                   │   link-free)          │
   │       refs)    │                   ├──────────────────────┤
   └───────────────┘                   │  _provenance.json     │
        source of truth                │  (revision, model,    │
                                        │   refs, checks)       │
                                        └──────────────────────┘
```

Read it left to right: an authored Mold in the KB is cast into an isolated artifact plus a provenance record. Many Molds, ordered, form a pipeline; one Mold can be cast to many targets; the KB on the left never stops being the source.

## Compile-time grounding, not runtime retrieval

The surrounding field mostly attaches a knowledge base to an agent and retrieves from it *at runtime*. This model bets the other way: **compile-time grounding with provenance**. Selected KB slices are cast into target artifacts ahead of time, the lineage is recorded, and drift becomes a hash comparison rather than a hope. Runtime fetch still has a place — it augments a compiled artifact — but it never replaces compiled grounding. The full comparison against retrieval-first architectures is [[comparisons]].

## Where this meets validation

This model is descriptive — it says what a Foundry *is*. What it does not yet name is the check that stands between an authored Mold and a *trusted* artifact: **the gate**. The gate is where this model meets validation, and it is the axis on which the pattern earns its abstraction. For how a single Mold is built, gated, and stamped end to end — the model in motion — continue to [[anatomy-of-an-instance]]. For the values these parts encode, see [[guiding-principles]].
