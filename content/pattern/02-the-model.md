---
title: The Model
description: The Foundry's machine in one read — a Knowledge Base of Molds cast into frozen, provenance-stamped target artifacts.
section: pattern
order: 2
---

# The Model

A Foundry is a small machine with four moving parts: a **Knowledge Base** you author, **Molds** that make slices of it executable, a **Cast** step that freezes those slices into distributable artifacts, and **Provenance** that records what each freeze contained. Everything else — composition, targets, validation — composes from these. This page defines each part and shows how they fit. Instances appear only as illustration; the parts themselves are domain-free.

## Knowledge Base

The **Knowledge Base (KB)** is the source of truth: an inspectable, human-readable corpus authored to be *read and learned by a human*, not merely stored for an agent to retrieve. It is the surface a person scrutinizes, corrects, and cites against. Its structure — typed frontmatter, controlled tags, wiki-linked references — is what makes it *executable*: organize the knowledge well and the artifacts, validation, and rendering fall out of the structure rather than being maintained by hand.

The KB is plain files. It stays the source of record no matter how many artifacts are cast from it.

Calling the structure *executable* is a claim with teeth. The same typing that lets artifacts fall out of the KB also lets the KB itself be statically validated: every typed reference must resolve or the build fails, controlled tags must exist in the registry, and generated indexes and deterministically rendered artifacts are regenerated and diffed so drift in them announces itself. Casting refuses to compile a Mold that fails these checks. This is compile-time enforcement on the *source* — distinct from the later check that stands between a finished cast and a trusted result.

## Mold

A **Mold** is the unit of the KB: an abstract, *typed reference manifest* describing one action. It is not the knowledge itself — it is a declaration of which knowledge one action depends on, plus a procedural body skeleton for performing that action. A Mold is a source artifact, independent of any agent runtime.

Not every piece of knowledge becomes a Mold. The line is procedural: a repeatable decision-and-handoff worth casting into its own action is a Mold; a fact, idiom, or contract an action can simply *cite* stays a reference. A Mold is sized to one step of real work — one action a harness would hand off as a unit — which is not the same as *small*; a Mold may be substantial. Getting this boundary right is what keeps the KB a graph of reusable actions rather than either one monolithic skill or a dust of fragments too fine to cast.

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

### What the record buys, concretely

A provenance record is mostly an index of resolved references, each carrying a source and a destination hash:

```json
{
  "mold": { "id": "summarize-source", "revision": 4, "content_hash": "sha256:9f1c…" },
  "model": "<model>@<version>",
  "references": [
    { "id": "input-schema",   "transform": "verbatim",
      "src_hash": "sha256:71a0…", "dst_hash": "sha256:71a0…", "by": "deterministic" },
    { "id": "domain-pattern", "transform": "condensed",
      "src_hash": "sha256:0a5e…", "dst_hash": "sha256:c43b…", "by": "llm",
      "prompt": "condense-pattern@v3" }
  ],
  "checks": ["static-validation", "references-resolved"]
}
```

Three things fall out of that shape:

- **Verbatim references prove themselves.** When a reference is copied unchanged, `src_hash == dst_hash` — the cheapest possible proof that nothing was paraphrased between source and artifact. No reading required; the equality *is* the guarantee.
- **Transformed references name their author.** When a reference is condensed, `src_hash != dst_hash`, and the record names the model and prompt that produced the destination. Every fragment an LLM touched is marked `llm`; everything else is `deterministic`. Trust is auditable fragment by fragment.
- **Drift and forensics are one read.** To detect staleness, re-hash the Mold and its sources and compare to the record. To answer "where did this claim come from," follow the fragment to its `src`. Both questions are answered by lineage a bare skill simply does not carry.

## Target (and composition)

A **Target** is the output format a cast produces — one agent-skill format, a generic skill, a baked-in bundle. Casting is parameterized by target; the same Mold can be cast to several. The KB stays the single source of truth across all of them; each target is one rendering of it.

Molds also **compose**. Where a domain's work is an inherently multi-step journey, an instance orders Molds into an end-to-end task and may orchestrate them with a harness — the [[galaxy-workflow-foundry]] calls such an ordering a *pipeline*. Composition is real and useful, but it is a domain extension, not one of the four core parts: a domain whose actions stand alone needs no such layer. See [[anatomy-of-an-instance]] for the substrate-vs-extension split.

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

Read it left to right: an authored Mold in the KB is cast into an isolated artifact plus a provenance record. One Mold can be cast to many targets; many Molds, where a domain's work is a journey, compose into an ordered sequence; the KB on the left never stops being the source.

## Compile-time grounding, not runtime retrieval

The surrounding field mostly attaches a knowledge base to an agent and retrieves from it *at runtime*. This model bets the other way: **compile-time grounding with provenance**. Selected KB slices are cast into target artifacts ahead of time, the lineage is recorded, and drift becomes a hash comparison rather than a hope. Runtime fetch still has a place — it augments a compiled artifact — but it never replaces compiled grounding. The full comparison against retrieval-first architectures is [[comparisons]].

## Where this meets validation

This model is descriptive — it says what a Foundry *is*. What it does not name is the check that stands between an authored Mold and a *trusted* result. That check is real, but it is **not** part of the four-part substrate: each domain builds the check its notion of "correct" admits — a deterministic validator where output is parseable, a constructed empirical referee where it isn't. The substrate is what every instance shares; the check is one of the things each instance *extends* it with. For how a single Mold is built, checked, and stamped end to end — the model in motion — continue to [[anatomy-of-an-instance]]. For the values these parts encode, see [[guiding-principles]].
