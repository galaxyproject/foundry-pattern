---
title: "Landscape Snapshot: Where Knowledge Bases Meet Skills (2026-05)"
description: A dated survey of specific systems on the runtime-vs-compile-time axis — kept in the Blog so the spec never carries a date.
section: blog
date: 2026-05-01
order: 2
---

# Landscape Snapshot: Where Knowledge Bases Meet Skills

> **Dated survey. Last reviewed: 2026-05.** This snapshot lives in the Blog/Lab on
> purpose. It names specific systems and their current behavior, which rots; keeping it
> out of [[comparisons]] (the timeless positioning) means the spec never carries a
> stale date. When this drifts, write a new snapshot rather than editing this one in
> place. It was relocated here from the Galaxy Workflow Foundry's `COMPARISONS.md`
> "Part B," lightly generalized to the pattern.

This survey examines a single axis: where a knowledge base meets a skill — at **runtime**
(the agent fetches KB context when it decides it needs it) versus **compile time** (a
deterministic step bakes selected KB slices into artifacts, with provenance). The Foundry
Pattern bets on **compile-time-with-provenance**; most deployed systems use runtime. Every
system below is good at what it does; the goal is to locate the pattern, not to rank.

## Model Context Protocol (MCP)

**Alignment:** explicitly surfaces KB context as typed primitives rather than opaque
embeddings; aims for portability across runtimes.

**Divergence:** runtime-based. Agents request resources when they decide they need them.
No compile-time check ensures skill behavior matches current KB state; no provenance links
instructions to grounding sources; no guarantee a resource exists at invocation.

## Anthropic Agent Skills

**Alignment:** progressive disclosure mirrors the pattern's `load: upfront|on-demand`
reference policy and the `casts/` tree structure; context cost scales with task relevance.

**Divergence:** treats `SKILL.md` as the *authoring surface*; the Foundry Pattern treats it
as a *compile target* with `_provenance.json` back to Mold revisions, references, and model
versions. A Foundry casts *into* this format as one target, not as its source of truth.
(This is the precise inversion the flagship essay [[skills-package-not-source]] is about.)

## llms.txt

**Alignment:** links essentials over embeddings; readable by both humans and LLMs; optional
progressive-disclosure sections serve dual audiences by design.

**Divergence:** an index into documentation sites, not executable artifacts. Lacks
provenance, validation, and per-kind transformation; operates at site level rather than
skill level.

## Corpus2Skill

**Alignment:** the closest existing analog. Compiles document corpora into navigable skill
hierarchies offline; "Don't Retrieve, Navigate" avoids flat vector retrieval. Explicit
corpus visibility; compile-to-skill structure matches the pattern's `references/` tree plus
on-demand triggers.

**Divergence:** auto-compiles from raw text via clustering and summarization. A Foundry
compiles curated, human-authored, schema-typed knowledge with explicit dispatch and
provenance — authority and traceability an automatic pipeline cannot carry.

## Pinecone Nexus

**Alignment:** the clearest commercial validation of compile-time-with-provenance over
runtime retrieval. Pre-builds task-specific, versioned, citation-bearing artifacts; its
KnowQL query language includes provenance primitives.

**Divergence:** compiled artifacts live in a proprietary, platform-bound vector substrate,
auto-derived from raw enterprise data. A Foundry casts curated, schema-typed knowledge into
portable, target-native artifacts with file-level provenance, no platform lock-in, and no
vector indexing in the pipeline.

## OpenAPI / Schema → Tool Generators

**Alignment:** deterministic generation of typed tool definitions from machine-readable
specs; genuine compile-time KB-to-skill with versioning and traceability.

**Divergence:** scope limited to machine-readable schemas. No handling for prose patterns,
exemplars, or design rationale — the bulk of Foundry content, which needs a casting
pipeline rather than schema parsing.

## Voyager-Style Accreted Skill Libraries

**Alignment:** a growing library of reusable, composable skills.

**Divergence:** the reverse direction — the skill library *is* the KB, agent-generated from
environmental experience. Provenance is "execution succeeded," not citations or human
review. A Foundry treats the KB as authoritative and human-curated; execution success is
not epistemic provenance.

## RAG-as-Knowledge-Base

**Alignment:** the KB grounds agent behavior; the most widely deployed bridge between
systems and grounding.

**Divergence:** runtime-based; agents cannot reason about what retrieval missed. A
retrieval miss is a silent correctness failure; behavioral instructions lack traceable
sources. A Foundry uses compile-time grounding; runtime fetch augments, never replaces,
compiled grounding.

## Custom GPTs / GPT Actions

**Alignment:** bundles knowledge and capability; Actions use the OpenAPI-compile pattern.

**Divergence:** knowledge files are runtime-vectorized RAG; authors cannot control
retrieval; platform-bound; no provenance. Foundry casts are compiled, portable, and
provenanced.

---

## Where the pattern lands

The field defaults to *attach KB, retrieve at runtime* — appropriate for large,
heterogeneous, frequently-updated corpora where retrieval gaps are tolerable. For
schema-bound, high-stakes, version-pinned domains, the better default is **compile-time
grounding with provenance**: the KB is authoritative; a deterministic pipeline casts
selected slices into target-specific artifacts; provenance is recorded; drift becomes
mechanically detectable.

None of the pattern's ingredients — typed references, per-kind casting, content-hash
identity, provenance as audit substrate, corpus-first authoring — is individually novel.
The *combination* is the bet. For the timeless version of this argument, see
[[comparisons]]; for the project-by-project values table, see [[related-projects]].

**Scope note.** This snapshot tracks only *when* the KB meets the skill. The adjacent
question of *which harness runs casts* (Archon, Claude Code workflows, LangGraph) is
deliberately excluded and evaluated separately.
