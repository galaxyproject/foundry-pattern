---
title: Glossary
description: Canonical definitions for the Foundry Pattern's vocabulary — the invariant substrate, casting and provenance, the per-domain extension surface, and the source-vs-package distinction.
section: pattern
order: 6
---

# Glossary

Pinned definitions for the abstract pattern. These are the terms every page on this site uses; where a term has a concrete realization in one of the instances, the abstract definition comes first and a brief `(e.g. …)` pointer follows. If two pages disagree, this file wins.

Grouped by theme.

---

## The pattern and its instances

**The Foundry Pattern** — the design pattern this site documents: a [[the-model|Knowledge Base whose structure makes it executable]], compiled into frozen skill artifacts with provenance. A substrate each domain extends, never a single project. Capitalized.

**A Foundry / an instance** — a concrete project applying the pattern. The pattern earns its abstraction at the *diff* between instances (N=2): what stayed identical is the **substrate**, what each domain adds on top is its **extension**. (e.g. the Galaxy Workflow Foundry, instance #1; the Statistical Genomics Foundry, instance #2.) Avoid bare "Foundry" when you mean the pattern. See [[anatomy-of-an-instance]].

## The substrate (invariant across instances)

**Knowledge Base (KB)** — the inspectable, human-readable source of truth at the center of every instance. Authored to be *read and learned by a human*, not merely stored for an agent to retrieve. The KB is the source; a skill is the package.

**Mold** — the unit of the KB: an abstract, typed *reference manifest* describing one action. Its frontmatter declares the references it depends on (other KB pages, schemas, CLI manual pages, prompts, examples); its body is a procedural skeleton tying them together. Molds are abstract source artifacts, independent of any agent runtime.

**Reference** — a typed dependency a Mold declares. The *kind* discriminator controls how casting treats it, so resolving references is per-kind dispatch, not "follow every link the same way." Common kinds: `pattern` (LLM-condensed prose), `schema` (copied verbatim), `cli-command` (cast to a structured sidecar), `prompt` (inlined), `example` (copied), `eval` (Foundry-only, never packaged).

## Compilation

**Cast** *(verb)* — produce a self-contained artifact from a Mold via the casting process. *(noun)* — one casting result for a (Mold, target) pair.

**Casting** — the compilation step that turns a Mold into a skill artifact: deterministic tooling first, LLM condensation second, in that order of trust. The *integration boundary* — artifacts come out condensed, isolated, and frozen, with no links back. See [[skills-package-not-source]].

**Skill artifact** — the compiled output of casting: self-contained, condensed, frozen against the source revision, no links back, no runtime dependency on the KB. `SKILL.md` (or any skill file) is therefore a **compile target**, never the authoring surface.

**Target** — the format a cast produces (e.g. an Anthropic Agent Skill, a generic skill format, a baked-in web bundle). One Mold may cast to several targets; the KB stays the source of truth.

**Source format vs packaging format** — the central distinction of [[skills-package-not-source|The Case]]. The dominant pattern treats the skill as the *source* (a human-plus-LLM authors `SKILL.md`, which *is* the record). The Foundry Pattern makes the skill a *package* cast from a curated KB. Restating canonical knowledge is a commodity; traceable, provenance-backed knowledge is not.

**Provenance** — a record (`_provenance.json`) emitted beside every cast artifact: which Mold revision, which model version, which references resolved, which checks ran. The durable, universal non-commodity asset — present in every instance; the answer to "which specific claim is real and where it came from."

**Compile-time grounding with provenance** — the bet that distinguishes the pattern from the field's default of *attach KB, retrieve at runtime*. A deterministic pipeline casts selected KB slices into target artifacts, provenance is recorded, and drift becomes mechanically detectable. Runtime fetch augments, never replaces, compiled grounding.

## The extension surface (per-domain — not universal vocabulary)

These terms describe what individual instances *add* to the substrate. They are scoped to the instance that coined them; do not use them as general pattern vocabulary.

**Extension surface** — the parts of a Foundry each domain chooses rather than inherits: its domain knowledge, grounding corpus, target format(s), any composition layer, and the external check its notion of "correct" admits. The substrate is shared; the extension surface is where instances legitimately diverge. See [[anatomy-of-an-instance]].

**The external check** — the thing external to the model that stands between authored knowledge and a *trusted* result, honoring the rule that the model must not be the sole judge of its own work. *What it is* differs completely by domain; the two realizations below are opposite ends, not a fixed menu.

**Pipeline** *(Galaxy Workflow Foundry)* — an ordered sequence of Molds composing an end-to-end task; dual-purpose as a build artifact (the Molds a harness orchestrates) and a navigation primitive (the journey-surface view over the KB). Referenced content, not cast. A composition extension a domain reaches for when its work is sequential; instance #2 (Mold-primary) needs none.

**The rails** *(Galaxy Workflow Foundry)* — that instance's external check: a deterministic CLI that mechanically parses and validates the artifact, catching failure modes prior-art skills could only enumerate as prose caveats. (e.g. a workflow validator that rejects hallucinated tool IDs or malformed state.) A parser you call.

**The referee / the gate** *(Statistical Genomics Foundry)* — that instance's external check, used where no CLI can decide validity: *itself authored knowledge cast into a skill*, an `analyze → referee → revise` loop in which an analysis may not self-certify but must hand off to a referee whose verdict gates certification. A deliverable you construct, not a tool you call. "Knowing ≠ gating": a model may *mention* a caveat, but only an enforced check makes doing *not terminate* until it clears. The marquee example of a non-commodity domain extension (see [[the-two-assets]]).

**Critique** *(referee sub-role — stat-gen)* — *reason about* validity against known invalidity patterns. Necessary but not sufficient: it is itself model reasoning, so the strong form also requires a Calibrate pass.

**Calibrate** *(referee sub-role — stat-gen)* — *construct and run* an empirical check the field trusts (permutation under the null, simulation-under-truth, negative controls, power). The external verdict that is not self-certification.

## Authoring discipline

**Load policy / progressive disclosure** — show the right knowledge at the right time: Pipelines disclose the journey, Molds the action, references the dependency surface. Both an authoring principle and a runtime contract — the basis for a KB foregrounded for a *human reader*, not flattened for retrieval.

**Corpus / corpus-grounding** — the principle that everything in the KB traces to observed real-world practice, not invented top-down. Every claim should be traceable back to one or more exemplars in the grounding corpus. (A referee instance needs *two* poles — established-good practice and named invalidity patterns — where an all-positive corpus suffices for a rails instance.)
