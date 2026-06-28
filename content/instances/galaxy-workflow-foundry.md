---
title: Galaxy Workflow Foundry
description: Instance #1 — converts papers, Nextflow, and CWL into validated Galaxy workflows behind a deterministic CLI gate.
section: instances
order: 1
instance_number: 1
gate: deterministic CLI (gxwf) — "the rails"
upstream: https://galaxyproject.github.io/foundry/
---

# Galaxy Workflow Foundry

**Instance #1.** The first and more-built Foundry — the one the pattern was abstracted *from*.

> Read the instance's own site: **<https://galaxyproject.github.io/foundry/>**

## Domain

Convert workflows authored in other systems — papers describing a computational analysis, Nextflow pipelines, CWL workflows — into validated Galaxy workflows in the `gxformat2` format. An LLM can read a paper and propose a Galaxy workflow, and then fail the same boring, detectable ways every time: hallucinated tool IDs, dropped `+galaxyN` revisions, fabricated parameter names, `gxformat2` the parser rejects on line one. The Foundry decomposes the conversion into atomic, schema-validated steps an agent can execute reliably — a Pipeline of Molds, each casting into a self-contained skill artifact.

## Corpus

Grounded in the **IWC workflow corpus** of curated, working `gxformat2` exemplars. Patterns and Molds are derived from observed structure in that corpus, not invented top-down; every reference traces back to one or more real exemplars, and the same exemplars double as evaluation material for cast skills.

## The gate — a deterministic CLI ("the rails")

This instance's gate is **mechanical**: `gxwf` parses and validates `gxformat2` and tool steps inline as each step is authored. The failure modes that defeat hand-written conversion skills — UUID validity, tool-ID and `+galaxyN` revision suffixes, `input_connections` parameter-name mismatches, conditional-selector branches in `tool_state` — are caught deterministically, not papered over with enumerated prose caveats. Fast, cheap, non-self-certifying because the parser is external to the model. These are the rails: the LLM can propose freely, but nothing certifies until the CLI accepts it.

This is the simpler end of [[anatomy-of-an-instance|the gate]]'s range: where a deterministic tool *can* decide validity, the gate is just that tool.

## Targets

Casts to skill artifacts (Anthropic Agent Skill / generic skill targets). Cast skills are condensed, isolated, and frozen against the Foundry revision they came from — no runtime dependency on the Foundry, no wiki-links to chase from inside a skill. Casting is the integration boundary, with provenance recorded beside every artifact.

## Status

The more mature instance. The spine is in place — content types, validator with cross-file resolution, pipeline lifting, Mold-inventory invariants — with real Mold authoring, pattern pages, CLI manual pages, casting tooling, and the Astro site as active forward work. Skeleton plus scaffolding, but the scaffolding is load-bearing.

---

Compare against instance #2 in [[the-diff]] — where the *deterministic CLI* gate generalizes into an *empirical referee*. For the shared shape every instance fills, see [[anatomy-of-an-instance]].
