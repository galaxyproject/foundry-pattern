---
title: Statistical Genomics Foundry
description: Instance #2 — keeps an LLM doing statistical genomics both productive and honest behind an empirical referee gate.
section: instances
order: 2
instance_number: 2
gate: empirical referee loop — "doing never self-certifies"
upstream: https://github.com/jmchilton/statistical-genomics-foundry
---

# Statistical Genomics Foundry

**Instance #2.** The second Foundry — the one whose *diff* from instance #1 earns the pattern its abstraction.

> Read the instance's own repo: **<https://github.com/jmchilton/statistical-genomics-foundry>**

## Domain

Keep an LLM agent doing statistical genomics both **productive and statistically honest**. Left alone, such an agent is the only judge in its own loop: it produces plausible-but-invalid work — at worst *inventing a method* with a convincing name and no validity — and self-certifies it. The work splits into two families: **Family A** does the analysis (frame the question, review the design, pick an *established* method, run it reproducibly); **Family B** referees it (audit validity; construct the empirical checks the field trusts).

## Corpus

Grounded in a deliberately **bipolar corpus**: established-good methods *and* cautionary-bad exemplars. The bad exemplars matter as much as the good ones — they are what the referee learns to recognize (double-dipping, confounding, naive correction, invented methods).

## The gate — an empirical referee ("doing never self-certifies")

This instance's gate is the pattern's headline generalization. No CLI can decide "is this statistical method valid," so the gate is itself **authored knowledge cast into a skill**: an `analyze → referee → revise` loop. A Family-A protocol may not terminate in self-certification — it must hand off to a Family-B referee whose verdict gates certification (the *gate obligation*). The referee does two things: **critique** (reason about known invalidity patterns — fast, but still model reasoning) and **calibrate** (construct and *run* an empirical check — permutation under the null, simulation-under-truth, calibration). The strong gate requires at least one calibrate pass, because critique is reasoning and reasoning is what failed. The gate becomes a *deliverable*, not infrastructure.

This is the far end of [[anatomy-of-an-instance|the gate]]'s range: where validity can't be parsed, the gate is a Mold that constructs its own external verdict.

## Targets

Casts to portable skill artifacts, inheriting the Mold → Cast → provenance architecture, the human-navigable KB, and the validator from instance #1 — adapting the domain and *adding* the referee.

## Status

**Early — be honest about it.** Mostly design and positioning so far: problem statement, a four-lens SOTA survey, verified positioning against five neighboring systems, a three-pillar narrative, and an architecture expressed as an explicit diff from the parent. The defining `REFEREE_LOOP.md` is a design sketch with open decisions flagged; nothing is implemented, the repo is freshly stood up, and the flagship Mold (`audit-method-validity`) is yet to be prototyped.

---

Compare against instance #1 in [[the-diff]] — this instance *is* the variable half of that N=2 diff. For the shared shape every instance fills, see [[anatomy-of-an-instance]].
