---
title: "The Diff: What Generalized"
description: The second instance is the test — what stayed identical between the two Foundries is the pattern's substrate; what changed is what each domain builds on top of it.
section: instances
order: 3
---

# The Diff: What Generalized

A pattern claimed from one instance is unfalsifiable. You can always describe a single project in general-sounding language; the abstraction is free because nothing pushed back on it. An abstraction over N=1 is just that one project wearing a costume. The Foundry Pattern only earns the word "pattern" if a *second*, independently-motivated project reaches for the same spine — and the honest test is the **diff** between the two.

So this page is the evidence. Instance #1 is the [[galaxy-workflow-foundry]] (convert workflows from papers, Nextflow, and CWL into validated `gxformat2`). Instance #2 is the [[statistical-genomics-foundry]] (keep an LLM doing statistical genomics both productive *and* honest). Different domains, different authors' intent, different failure modes. One caveat up front: instance #1 is implemented and running; instance #2 is so far design and architecture — freshly stood up, no Molds authored yet. So this is a diff of instance #1's *built* system against instance #2's *intended* one, and where that gap matters it is flagged. Lay their architectures side by side and ask the only question that matters: **what had to stay, and what was free to change?**

## What would have falsified the pattern

Set the bar before reading the result. If standing up instance #2 had meant rewriting the source-of-truth model, re-deciding how artifacts are produced, abandoning provenance, throwing out the human reading surface — if *almost everything load-bearing had to change* — then there was no pattern, only a Galaxy-specific architecture that happened to use general words. The pattern survives only if the **substrate** transfers and the changes localize to what each domain adds on top.

The result: the substrate transferred verbatim. What changed is exactly what *should* change between two domains — the knowledge itself, and the machinery each domain builds to carry and check it.

## Inherited unchanged — the substrate

These transferred essentially verbatim. Instance #2's own `ARCHITECTURE.md` opens by calling them "Inherited DNA … the whole reason we derive from the Foundry rather than starting fresh." Each with its one-line evidence:

- **KB as source of truth.** Both bet that organizing knowledge well — typed frontmatter, registered tags, wiki-linked references, generated indexes — makes skills, validation, and rendering "fall out naturally." Instance #2 inherits that premise "verbatim from the parent."
- **Mold → Cast → provenance.** Both keep the Mold (a typed reference manifest), the Cast (deterministic-first, LLM-second compilation into a frozen, self-contained artifact with no link back), and the `_provenance.json` emitted beside every artifact (source hash, model, prompt version, resolved-ref hashes, timestamp). Instance #2 calls provenance "the single cleanest distinction from prior art."
- **The human reader's surface.** Both render an Astro site over typed content collections, with wiki-link panels, backlinks, tag browses, and raw-text endpoints. Instance #2: "This *is* Pillar 3" — foregrounding knowledge for a human, not just storing it for retrieval.
- **Deterministic tools do deterministic work.** Both hold the rule that you don't let the model grade itself; deterministic tooling does the deterministic checks. Instance #2 keeps the principle "unchanged" — only its *form* moves.
- **Corpus grounding.** Both forbid inventing abstractions top-down; every reference must trace to a real exemplar cited by URL/DOI, never mirrored. Instance #2 preserves the URL-not-mirror principle "verbatim."
- **The external-check loop shape.** Both run a generate-step refereed by something *external to the model* that can force a fix: instance #1's `author → validate → fix`, instance #2's `analyze → referee → revise`. Same topology, including bounded/escalating convergence — even though, as below, the external thing differs completely.

Six load-bearing abstractions, carried with little more than a rename. That is the pattern.

## Adapted — same abstraction, re-skinned

Same shapes, different content poured into them:

- **Domain.** Workflow construction → statistical-method validity. The Mold still describes "one action"; the action is now "audit this method" or "construct the calibration the field trusts" instead of "convert this step."
- **Corpus.** Instance #1's corpus is the IWC workflow set — *all positive exemplars*. Instance #2 needs a **bipolar corpus**: established-good (methods + their validity conditions, to ground "pick an established method, don't invent") *and* cautionary-bad (named invalidity patterns + remedies, to ground the referee). A check grounded only in good examples can't recognize a bad one — so the second pole has *no parent analog*.
- **Target formats / tool ecosystem.** `gxwf` + `planemo` and `gxformat2` give way to R/Bioconductor, PLINK/regenie, statsmodels, and simulators — but the CLI-manual-page concept carries; it's just authored lazily when a real action needs an exact command.
- **Mold spec.** The required **`axis`** field (`source-specific | target-specific | tool-specific | generic`) is **dropped** — it describes a *conversion*, which instance #2 isn't doing — and the eval guardrails reframe from *hallucination* ("invented Tool Shed IDs must be flagged") to **referee-correctness** ("a planted double-dipped analysis must be caught, never silently pass"). The four-file eval/scenario/usage/refinement discipline carries over verbatim; only what the evals *guard* changed.

## Demoted / dropped

What instance #1 leans on that instance #2 deliberately lightens:

- **The conversion `axis` enum** — dropped, as above. Genuinely conversion-specific.
- **Strict JSON-Schema Mold IO contracts** — demoted. Instance #1 passes structured JSON between phases, so schemas earn their keep; instance #2's deliverables are critiques and protocols, which are *prose-shaped*. Schemas are reserved for the rare genuinely-structured artifact (e.g. a power-calc result).
- **Pipelines** — instance #1's, not the pattern's. Instance #1's Molds exist to fill ordered pipeline phases (the "subway map" leads navigation, and "Molds = union of pipeline phases" is machine-enforced) because workflow construction is inherently sequential. Instance #2's Molds are standalone toolkit skills; the catalog leads, and a Mold may legitimately belong to no pipeline at all. Composition is an extension a domain reaches for when its work is a journey — not part of the substrate.

These are honest *lightenings*, not oversights — instance #2 says so explicitly. Worth noting they're judgment calls: with zero Molds authored yet, "demote the schema contract" is a bet that prose deliverables dominate, not a proven fact.

## Added — net-new in instance #2

- **An empirical referee as the external check.** Instance #1's check is pure infrastructure: a deterministic CLI parses and either accepts or rejects. Instance #2 has no CLI that can decide "is this statistical method valid," so its check *itself becomes authored knowledge cast into a skill* — a referee Mold that both *critiques* (reasons about known invalidity patterns) and *calibrates* (constructs and runs an empirical check: permutation under the null, simulation under known truth). The check moves from infrastructure to deliverable. This is instance #2's domain extension, not a new universal part.
- **"Doing Never Self-Certifies."** Instance #2's own animating principle: a Family-A "do" protocol may not terminate in self-certification; it must hand off to a Family-B referee whose verdict gates certification. It is a *sharpening* of the shared deterministic-tools rule for a domain where the model is otherwise the only judge — same `generate → external-check → fix` shape, but the external check is now an empirical Mold instead of a parser. It belongs to the stat-gen instance; it is not a law every Foundry must restate.

## The punchline

Line the two up and the **substrate** — the KB → cast → provenance machine, the source-of-truth model, the compilation boundary, the provenance record, the human surface — stayed put. What varied is exactly what two different domains *should* vary: the knowledge, and the machinery each built on top to carry and check it.

| | Instance #1 (Galaxy) | Instance #2 (Stat-Gen) |
|---|---|---|
| **Inherited (substrate)** | KB-as-source, Mold→Cast→provenance, human site, deterministic-does-deterministic, corpus grounding, the external-check loop | *identical* |
| **Adapted** | IWC corpus; `gxformat2` target; `axis` field; hallucination evals | bipolar corpus; stats targets; `axis` dropped; referee-correctness evals |
| **Domain machinery (the extension)** | pipelines for sequential construction; a deterministic CLI validator ("the rails") | standalone toolkit Molds; an empirical referee ("doing never self-certifies") as the check |

So the pattern reduces to a clean claim: **an inspectable KB of deep domain knowledge, compiled into cast artifacts that carry provenance — a substrate each domain extends with the composition and checks its work demands.** A deterministic CLI is one domain's check; an empirical referee is another's; pipelines are one domain's composition and another's needless weight. The substrate is the constant; the extensions are the pattern being *applied*, not violated. (See [[the-model]] for the substrate and [[guiding-principles]] for the rules it obeys; [[anatomy-of-an-instance]] for the substrate-vs-extension split in full.)

## What a third instance would test

N=2 fixes a *line*; it can't yet tell a line from a curve. The clean prediction to falsify: a third Foundry — in a domain whose external check is neither a parser nor an empirical referee but a *human review queue*, or a *formal proof checker*, and whose work may or may not need pipeline-style composition — should again inherit the substrate unchanged and vary only in its domain knowledge and the extensions that knowledge demands. If a third instance forces a change to the source-of-truth model or the provenance contract to fit its domain, that part wasn't substrate after all, and the pattern shrinks to whatever still holds. Until then the claim stands exactly as far as the evidence: the substrate is the constant, and what each domain builds on it is free to differ.
