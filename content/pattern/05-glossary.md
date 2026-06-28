---
title: Glossary
description: Canonical definitions for the Foundry Pattern's vocabulary — the invariant model, the gate and its two realizations, casting, and the source-vs-package distinction.
section: pattern
order: 5
---

# Glossary

Pinned definitions for the abstract pattern. These are the terms every page on this site uses; where a term has a concrete realization in one of the instances, the abstract definition comes first and a brief `(e.g. …)` pointer follows. If two pages disagree, this file wins.

Grouped by theme.

---

## The pattern and its instances

**The Foundry Pattern** — the design pattern this site documents: a [[the-model|Knowledge Base whose structure makes it executable]], compiled into frozen skill artifacts with provenance, standing behind a non-self-certifying gate. Capitalized; the pattern, never a single project.

**A Foundry / an instance** — a concrete project applying the pattern. The pattern earns its abstraction at the *diff* between instances (N=2): what stayed identical is the invariant, what changed is the variable. (e.g. the Galaxy Workflow Foundry, instance #1; the Statistical Genomics Foundry, instance #2.) Avoid bare "Foundry" when you mean the pattern. See [[anatomy-of-an-instance]].

## The invariant spine

**Knowledge Base (KB)** — the inspectable, human-readable source of truth at the center of every instance. Authored to be *read and learned by a human*, not merely stored for an agent to retrieve. The KB is the source; a skill is the package.

**Mold** — the unit of the KB: an abstract, typed *reference manifest* describing one action. Its frontmatter declares the references it depends on (other KB pages, schemas, CLI manual pages, prompts, examples); its body is a procedural skeleton tying them together. Molds are abstract source artifacts, independent of any agent runtime.

**Reference** — a typed dependency a Mold declares. The *kind* discriminator controls how casting treats it, so resolving references is per-kind dispatch, not "follow every link the same way." Common kinds: `pattern` (LLM-condensed prose), `schema` (copied verbatim), `cli-command` (cast to a structured sidecar), `prompt` (inlined), `example` (copied), `eval` (Foundry-only, never packaged).

**Pipeline** — an ordered sequence of Molds composing an end-to-end task; dual-purpose as a build artifact (the Molds a harness orchestrates) and a navigation primitive (the journey-surface view over the KB). Referenced content, not cast. (One instance demotes Pipelines to optional when it is Mold-primary.)

## Compilation

**Cast** *(verb)* — produce a self-contained artifact from a Mold via the casting process. *(noun)* — one casting result for a (Mold, target) pair.

**Casting** — the compilation step that turns a Mold into a skill artifact: deterministic tooling first, LLM condensation second, in that order of trust. The *integration boundary* — artifacts come out condensed, isolated, and frozen, with no links back. See [[skills-package-not-source]].

**Skill artifact** — the compiled output of casting: self-contained, condensed, frozen against the source revision, no links back, no runtime dependency on the KB. `SKILL.md` (or any skill file) is therefore a **compile target**, never the authoring surface.

**Target** — the format a cast produces (e.g. an Anthropic Agent Skill, a generic skill format, a baked-in web bundle). One Mold may cast to several targets; the KB stays the source of truth.

**Source format vs packaging format** — the central distinction of [[skills-package-not-source|The Case]]. The dominant pattern treats the skill as the *source* (a human-plus-LLM authors `SKILL.md`, which *is* the record). The Foundry Pattern makes the skill a *package* cast from a curated KB. Restating canonical knowledge is a commodity; traceable, refereed knowledge is not.

**Provenance** — a record (`_provenance.json`) emitted beside every cast artifact: which Mold revision, which model version, which references resolved, which checks ran. One of the two non-commodity assets; the answer to "which specific claim is real and where it came from."

**Compile-time grounding with provenance** — the bet that distinguishes the pattern from the field's default of *attach KB, retrieve at runtime*. A deterministic pipeline casts selected KB slices into target artifacts, provenance is recorded, and drift becomes mechanically detectable. Runtime fetch augments, never replaces, compiled grounding.

## The gate (the headline variable)

**The gate** — the external, non-self-certifying check standing between authored knowledge and a *trusted* artifact or result. Every Foundry has one; *what it is* differs per instance, and that is the axis on which the pattern's abstraction is earned. Knowing ≠ gating: a model may *mention* a caveat, but only a gate makes doing *not terminate* until the check clears. The second non-commodity asset.

**Deterministic CLI gate ("rails")** — one realization: a CLI mechanically parses and validates the artifact, catching failure modes that prior-art skills could only enumerate as prose caveats. (e.g. a workflow validator that rejects hallucinated tool IDs or malformed state.)

**Empirical referee gate ("referee")** — the other realization, used where no CLI can decide validity. The gate is *itself authored knowledge cast into a skill*: an `analyze → referee → revise` loop in which an analysis may not self-certify but must hand off to a referee whose verdict gates certification. The novelty is that the referee node is a *Mold*, not a deterministic tool.

**Critique** *(referee sub-role)* — *reason about* validity against known invalidity patterns. Necessary but not sufficient: it is itself model reasoning, so the strong gate also requires a Calibrate pass.

**Calibrate** *(referee sub-role)* — *construct and run* an empirical check the field trusts (permutation under the null, simulation-under-truth, negative controls, power). The external verdict that is not self-certification.

## Authoring discipline

**Load policy / progressive disclosure** — show the right knowledge at the right time: Pipelines disclose the journey, Molds the action, references the dependency surface. Both an authoring principle and a runtime contract — the basis for a KB foregrounded for a *human reader*, not flattened for retrieval.

**Corpus / corpus-grounding** — the principle that everything in the KB traces to observed real-world practice, not invented top-down. Every claim should be traceable back to one or more exemplars in the grounding corpus. (A referee instance needs *two* poles — established-good practice and named invalidity patterns — where an all-positive corpus suffices for a rails instance.)
