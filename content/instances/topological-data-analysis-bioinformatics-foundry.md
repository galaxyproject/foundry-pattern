---
title: TDA Bioinformatics Foundry
description: "Instance #3 — the rigorous reference build, hardening topological data analysis methods into reproducible bioinformatics tools and workflows while improving the shared substrate."
section: instances
order: 2
instance_number: 3
check: evolving — reproducible environments and evidence-bearing replication provide the current teeth
upstream: https://jmchilton.github.io/bio-topo-foundry/
---

# TDA Bioinformatics Foundry

**Instance #3 — and the active reference build.** This is the newest Foundry, but it is now the clearest implementation of the shared substrate. It is being built as a falsification exercise: every new need must remain domain knowledge or explicit instance policy, reuse an existing shared mechanism, or improve and extract a real cross-instance contract. The direction of convergence now runs from this instance back into the Statistical Genomics Foundry, not the other way around.

> Explore the live reader: **<https://jmchilton.github.io/bio-topo-foundry/>**
> Follow the implementation: **<https://github.com/jmchilton/bio-topo-foundry>**

## Domain

Harden topological data analysis and topological deep learning into reproducible bioinformatics practice. The corpus connects frontier methods and papers to the software that implements them, runnable biopixi environments, packaging recipes, replication evidence, and eventually Galaxy tools, workflows, and training. Its maturation arc is **frontier → hardening → delivery** rather than Statistical Genomics' referee gate.

## Why it is the reference build

The third adopter exposed which similarities between the first two were true contracts and which were merely two copies of the same application decision. The TDA Foundry consumes versioned `@galaxy-foundry/*` packages for kind and reference contracts, tag and license policy, wiki links, content reading, the site shell, and citation auditing. Instance facts — vocabulary, collections, routes, identity, domain renderers, and acceptance rules — remain explicit inputs.

That separation is intentionally stricter than the early Statistical Genomics architecture. TDA re-derived its kinds and facets from its own corpus instead of copying SGF's vocabulary, keeps one authoritative collection and route model, generates its portable kind manifest from the live schemas, and records the architecture and build gates as validated design notes inside the Foundry itself.

## Corpus and hardening work

The live corpus already includes TDA methods and surveys, upstream software profiles, reproducible environments with pinned Pixi manifests and locks, build recipes, replication experiments, and an initial Mold. The replication records pin executable external repositories and evidence; the environment contract prevents a study from calling itself complete before a corresponding runnable environment has produced evidence.

The external correctness check is still domain-specific and evolving. What is already hardened is the knowledge and reproducibility machinery around it: strict frontmatter, controlled vocabularies, resolvable links, companion-file checks, generated-manifest drift checks, citation evidence, typechecking, corpus tests, and built-output checks.

## Status

Active and changing rapidly. It should be treated as the current architecture reference, not as finished doctrine. Prefer its stable direction — contract-driven sharing, corpus-derived vocabulary, executable design records, reproducible environments, and evidence-bearing replication — over snapshot counts or a promise that every planned Galaxy delivery layer already exists.

---

See [[the-diff]] for how this third implementation tightened the original two-instance claim, and [[anatomy-of-an-instance]] for the boundary it is actively exercising.
