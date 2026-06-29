---
title: "Blind Regeneration: Can a Frontier Model Rewrite Your Skill From Memory?"
description: A falsifiable test of whether a static skill artifact adds anything a frontier model can't regenerate cold — and what it reveals about where the real value lives.
section: blog
date: 2026-06-27
order: 1
---

# Blind Regeneration: Can a Frontier Model Rewrite Your Skill From Memory?

*Lab notebook — June 2026*

## TL;DR

We asked a simple, behavioral question: if you delete a science skill and hand a frontier model only the topic and the format, how much of the original does it write back from memory? We ran it on two skills at different "altitudes." The model reproduced the canonical spine, the default parameters, and even the *citations* — and on the lighter skill it wrote something better than the original. The static artifact, as a restatement of canonical knowledge, adds little. What it can't supply showed up just as clearly: an *enforced* check and a *traceable* source. Knowing is not gating.

## Why we ran it

The usual way to ask "did the model already know this?" is to ask the model. That's worthless — models are biased toward "yes," and introspection isn't evidence. So we wanted a test that could *fail*: a behavioral, falsifiable one.

Hypothesis: if an independent frontier-model agent, never shown the original skill, regenerates it with high overlap, then the static artifact adds little over just-in-time generation. High blind-vs-original overlap ⇒ the skill-as-restatement is largely redundant. Low overlap ⇒ the artifact carries something the weights don't, and the skills-as-source position is vindicated. Either way we'd learn something.

This is a test of *the pattern*, not of any project. The corpus we drew topics from ([GPTomics/bioSkills](https://github.com/GPTomics/bioSkills)) is good at what it does, and skills-as-source is genuinely useful — especially for cheaper or weaker models that benefit from canonical procedure spelled out in-context. Our claim is narrow and lives at a different layer; see [[skills-package-not-source]]. Nothing below is a knock on bioSkills.

## Design

Two skills, deliberately chosen at different altitudes:

- a **light** page — `single-cell/clustering` — mostly procedural, the kind of page that makes up the bulk of any such corpus;
- a **decision-grade** page — `experimental-design/multiple-testing` — carrying named cardinal sins, citations, and hard thresholds.

For each, the orchestrator read the original into *its own* context only. A **separate** blind-author agent was spawned and given exactly two things: the project's format spec (`skill_writing_reference.md`) and the topic. It was placed under a hard prohibition: do not read or search the corpus repo, do not web-search for the skill. Write the full `SKILL.md` from parametric knowledge alone. Then we diffed blind against original.

## Results

| | Light page (clustering) | Decision-grade page (multiple-testing) |
|---|---|---|
| **Canonical spine + default params** | reproduced **verbatim** — PCA `n_comps=50, arpack`; `n_neighbors=15, n_pcs=30`; resolution scan 0.2–2.0; perplexity 30; Leiden-over-Louvain | reproduced — full taxonomy: BH / BY / Storey / lfdr / IHW / independent-filtering / Bonferroni / Holm / Hochberg / Hommel |
| **Validity / assumption content** | **added** beyond the original — "never cluster on the 2D embedding," batch confounding, Seurat v5 `JoinLayers`, failure modes, a real bibliography | reproduced — PRDS dependence; FDR-vs-FWER as discovery-vs-confirmatory; the Bourgon independent-filtering trap; the statsmodels-default-isn't-BH gotcha; GWAS `5e-8`; canonical citations |
| **Net quality vs. original** | **blind version superior** — the original reads as shallow boilerplate | **~85–90% recovered, roughly a wash** |
| **What blind missed** | — | FCR-adjusted CIs; IDR / Li 2011; the exact derived `7.2e-8` value |
| **What blind added** | (see above) | p-value-histogram diagnostic; empirical-null / λ_GC; eQTL hierarchical correction; `scipy.stats.false_discovery_control` |

## The three findings that matter

**1. "Redundant for frontier models" is real — and stronger for the lighter skill.** This is the counterintuitive part. You might expect the model to struggle most on the simple procedural page and shine on the sophisticated one. The opposite happened. On the decision-grade page the blind author recovered most but not all of a dense, carefully curated artifact. On the *light* page it sailed past the original. The redundancy effect is **strongest exactly where corpora are thickest** — the procedural bulk. The margin a static restatement buys you is smallest where you have the most of it, and it shrinks as models improve.

**2. The blind model reproduced citations from memory — including the fuzzy ones.** It wrote `Pe'er et al.` and `Efron 2004/2010` and a plausible bibliography, all from the weights. Here is the problem made concrete: *you cannot tell, from the output, which of those are correct.* A real citation and a confabulated one look identical on the page. A reader — human or agent — has no way to scrutinize, correct, or build on the claim, because there is no thread back to a source. That is the traceability gap, and it is not fixed by the model being smart; a smarter model produces *more convincing* unverifiable citations, not more verifiable ones.

**3. The blind model spontaneously added *more* validity caveats than the original.** This is the finding that reframes everything. We expected the blind version to be thinner on rigor. Instead it volunteered cautions the original never mentioned. So validity *knowledge* is already in the weights. What no static skill — blind or original — provides is **enforcement**: the difference between "here is a caveat you might mention" and "this analysis does not terminate until a referee gate clears it." A model that *knows* the assumption can still skip checking it. **Knowing ≠ gating.**

## What this means for The Case

If restating canonical knowledge is a commodity — and the experiment says it largely is — then the value of a science skill cannot live in the restatement. It has to live in the two things the blind model demonstrably *could not* supply on its own:

- **Provenance** — which specific claim is real, and where it came from. The blind author's indistinguishable-real-from-fake citations are the negative image of this.
- **The enforced check** (here, the referee) — the enforced empirical check, not an optional caveat. The blind author's spontaneous caveats are the negative image of this: the knowledge was there; the *enforcement* was not.

These are the two non-commodity assets the whole argument turns on — see [[the-two-assets]]. The experiment doesn't prove the Foundry Pattern is right; it removes the easiest objection to it ("a frontier model already knows all this, so why bother with a knowledge base and a compile step?") by conceding the objection's premise and showing the premise is beside the point. Yes, the model knows it. Knowing was never the scarce thing.

## Caveats (we own these)

We want this to be falsifiable, so here is everything wrong with it:

- **N = 2 skills.** Two data points. This is a probe, not a study.
- **Single model family.** The blind author is from the same family as the judge — they share priors, and a shared blind spot would be invisible to us.
- **One-shot generation.** Each blind skill is a single draft, not a best-of-N or a refined artifact.
- **Overlap judged by the same model, not blind.** The "% recovered" and "net quality" calls were not themselves made under blind conditions.
- **Citations and thresholds not independently verified.** We did *not* check which citations or numeric thresholds in *either* version are actually correct against primary sources. And note the recursion here: verifying them is exactly the work the provenance gap forces on you. The cost of checking *is* the finding.

## How to re-run it

The recipe is deliberately cheap to reproduce:

1. **Clone the target corpus.** Our run used `GPTomics/bioSkills` (HEAD `35e6d84`; `single-cell/clustering` added in `fab0f11`). Pin the revision.
2. **Pick ≥2 skills at different altitudes** — one shallow/procedural, one decision-grade with citations and thresholds.
3. **Blind-author each.** Read the original into the orchestrator's context only. Spawn a separate agent given the format spec + the topic + a hard prohibition on accessing the corpus repo or web-searching for the skill. Require the full `SKILL.md` as output.
4. **Diff on four dimensions:** (a) canonical spine + default parameters, (b) validity/assumption content, (c) citations/thresholds reproduced, (d) what each has that the other lacks.
5. **Score:** % recovered; net quality (blind worse / wash / better); list the irreproducible specifics; then **separately, verify each citation and threshold against primary sources** — the step that exposes the provenance gap directly.
6. **Strengthen it:** use a *different* model for the blind author than for the judge. That single change closes the biggest hole above.

The raw blind `SKILL.md` artifacts from this run are preserved; we'll commit them under an appendix once we settle where they land. This note connects to the [[related-projects]] values table — it supplies the evidence behind the Traceability, Human Scrutiny, and Knowledge-Base-Backed rows.
