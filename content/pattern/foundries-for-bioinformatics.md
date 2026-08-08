---
title: Foundries for Bioinformatics
description: A domain profile for turning bioinformatics literature, software, environments, and evidence into typed knowledge whose identity, portability, and scientific validity are checked separately.
section: pattern
order: 5
---

# Foundries for Bioinformatics

Bioinformatics is where the Foundry Pattern first met a domain that cannot afford to blur
**knowing**, **running**, **moving**, and **trusting**. A paper may be cited correctly while its
claim is wrong. An environment may reproduce on one laptop while depending on files no collaborator
has. A package may be perfectly portable while implementing an invalid analysis.

The [[the-model|Knowledge Base → Mold → Cast → Provenance model]] does not change for
bioinformatics. The domain extension is the chain of evidence around it: scientific sources,
software, executable environments, packaging routes, replication evidence, and a correctness check
appropriate to the work.

> **Keep the receipts separate.** A green environment is not a scientific verdict. A valid DOI is
> not evidence that the cited paper supports the sentence. Rich frontmatter is not provenance
> unless a build consumes it.

## Four receipts, four questions

| Claim | Question | Evidence a Foundry can carry |
|---|---|---|
| Source identity and reuse | Does this identifier name the described work, and what may we redistribute? | DOI, PMID/PMCID, arXiv id, source URL, license, derivation posture, normalized provider evidence |
| Executable computation | Can the declared software closure be solved again? | `pixi.toml`, `pixi.lock`, pinned package versions, conda recipes, platforms |
| Packaging portability | Can someone use it without this checkout or its private infrastructure? | a derived biopixi grade, channel evidence, published package or BioContainer identity |
| Scientific trust | Does the method or result survive the field's actual test? | parser verdict, benchmark, replication, simulation, calibration, or human review—whichever the domain requires |

These receipts reinforce one another and are not interchangeable. The domain's external check remains
the decisive last row; the first three make the work identifiable and rerunnable enough for that
check to mean something.

## Model the scientific chain, not a generic document library

Start with real artifacts and the questions readers and agents need to ask of them. Then derive the
smallest set of **kinds** that makes those obligations explicit. In the
[[topological-data-analysis-bioinformatics-foundry|TDA Bioinformatics Foundry]], for example:

- a **Paper** reviews an external scientific work;
- a **Package** profiles upstream software;
- an **Environment** is one runnable configuration of one or more packages;
- a **Recipe** records the route for building software absent from public conda channels; and
- a **Replication experiment** records what this Foundry ran and observed against a pinned external
  artifact.

Those are different kinds because they owe the reader different evidence. Collapsing Package,
Environment, and Recipe into “Tool” would hide whether code exists, installs, and can travel.
Collapsing Paper and Replication experiment would make someone else's claim and this Foundry's result
look like the same scholarship.

The concrete mechanism can stay compact:

- one strict `type` discriminator selects one schema;
- the schema rejects undeclared fields instead of silently accepting plausible metadata;
- every kind declares whether its notes are files or directories and which companion artifacts
  belong beside them;
- tags come from a closed, documented facet registry rather than an open-ended keyword pile;
- exact wiki links carry relationships a human can follow and the build can resolve; and
- typed Mold references name the smaller set of dependencies casting must interpret.

Share the **formats and machinery**, not the domain vocabulary. The three current instances share
kind assembly, portable manifests, tag-registry parsing, link grammar, and reference behavior while
retaining different kinds, fields, facets, routes, and acceptance rules. The generated
[[kind-catalog]] and [[tag-catalog]] show that boundary from the live manifests.

## Make the computation runnable

[Pixi](https://pixi.sh/) gives a Foundry a useful executable unit: a declarative `pixi.toml`, a
multi-platform solver, tasks, and a real lockfile over conda packages. The manifest should remain the
authority on versions and channels; its Foundry note explains why the environment exists, what it
makes runnable, and what should be checked before trusting it.

When software is missing from conda-forge or [Bioconda](https://bioconda.github.io/), an in-repository
conda recipe makes the gap explicit and testable. Treat that recipe as an artifact, not prose to
copy into a note. The note records what the recipe itself cannot: which packaging gap it closes,
whether it has been built, its licensing ceiling, and the route toward a public channel.

A lockfile is necessary evidence, but it is not the end of the portability story. It can precisely
pin a local path, an unpublished package, or infrastructure available only inside the original
repository. That is reproducible *here*, not yet transferable.

## Grade portability with biopixi

[biopixi](https://github.com/jmchilton/biopixi) inspects a Pixi manifest, lockfile, and public package
metadata and identifies the dependency that limits portability. Its L0–L4 ladder turns packaging
work into an explicit route:

| Level | Meaning |
|---|---|
| L0 | outside the focused portability profile |
| L1 | local packages have recipes, but the original repository and build toolchain are still required |
| L2 | packages are available from named public channels |
| L3 | the full closure is available through conda-forge or Bioconda |
| L4 | an exact BioContainer has been observed at a public registry |

The grade is **derived, never declared**. A manifest cannot award itself a level, and the runnable
artifact does not depend on biopixi being installed. That is the same architectural posture as the
Foundry Pattern: the checker may inspect and package an artifact without becoming a hidden runtime
dependency of it.

The ladder grades packaging only. L4 says an environment is ecosystem-published; it says nothing
about whether the method is correct, the parameters are defensible, or the result reproduces. That
separation is a feature: a failed scientific replication cannot be explained away as an unknown
software environment, and a portable container cannot pass as scientific validation.

See the TDA Foundry's [environment corpus](https://github.com/jmchilton/bio-topo-foundry/tree/main/content/environments)
for concrete fixtures spanning the ladder.

## Audit citation identity as part of the build

Bioinformatics knowledge accumulates identifiers faster than any reviewer can click them. A DOI
with one wrong digit still looks like a DOI, often resolves successfully, and may point to a wholly
unrelated paper. Fluent prose provides no defense.

[`@galaxy-foundry/audit-citations`](https://github.com/jmchilton/foundry-lib/tree/main/packages/audit-citations)
turns that narrow problem into a replayable check:

1. the instance declares which files and artifact kinds form the citation corpus;
2. the tool extracts scholarly identifiers and resolves them through appropriate metadata providers;
3. normalized provider answers are committed as evidence;
4. pull-request validation replays the audit offline and fails on missing, unresolved, or mismatched
   evidence; and
5. manual adjudications bind to both the candidate identity and its source digest, so editing a
   citation invalidates an old decision.

A scheduled refresh can re-query providers while ordinary validation remains deterministic. The
TDA Foundry's [citation-integrity audit](https://github.com/jmchilton/bio-topo-foundry/blob/main/audit/citation-audit.md)
has already caught digit-level DOI errors that resolved cleanly to the wrong works.

The boundary is intentionally strict: this audit proves that a citation identifies the work its
text describes. It does **not** prove that the work supports the surrounding claim. Source selection,
trusted hosts, and the acceptance threshold remain instance policy; claim support remains scientific
review.

## Build a stack of non-substitutable checks

A useful bioinformatics Foundry does not have one green badge. Its checks answer different failure
modes:

1. **Schema and vocabulary:** is every note a valid instance of a known kind using declared fields
   and controlled tags?
2. **Referential integrity:** do wiki links, typed references, companion files, licenses, and routes
   resolve?
3. **Citation identity:** do scholarly identifiers name the works the corpus says they name?
4. **Execution and portability:** can environments solve, and how much local infrastructure do they
   still require?
5. **Built output:** did the generated reader and artifacts actually contain the pages, links,
   styles, search entries, and metadata earlier stages claimed to produce?
6. **Scientific validity:** did an external validator, referee, benchmark, replication, or expert
   review accept the work?

The last check cannot be generalized away. The
[[galaxy-workflow-foundry|Galaxy Workflow Foundry]] can call a deterministic workflow validator.
The [[statistical-genomics-foundry|Statistical Genomics Foundry]] must construct an empirical referee.
The TDA Foundry currently has reproducible environments and evidence-bearing replication while its
domain-correctness check is still evolving. Extensive build validation should never be relabeled as
a scientific verdict.

## A useful first vertical slice

For a new bioinformatics Foundry, make one real chain work before designing the whole taxonomy:

1. choose one bounded scientific action and one real source or software artifact;
2. define only the kinds and fields that artifact makes necessary;
3. register the smallest useful domain facets and make links and licenses resolvable;
4. create one Pixi environment, with a lockfile and a conda recipe if public packaging is missing;
5. run biopixi and record the limiting dependency rather than authoring a hoped-for grade;
6. add the source to citation auditing and commit the provider evidence; and
7. name the external scientific check—even if the honest first result is that it does not exist yet.

Then author the first Mold against that typed, executable evidence. Repeated mechanics belong in the
shared substrate; scientific vocabulary, policy, presentation, and acceptance stay in the instance.
For the general planning sequence, continue with [[setting-up-a-foundry|Plan Your Foundry]] and
[[anatomy-of-an-instance|What a Foundry Needs]].
