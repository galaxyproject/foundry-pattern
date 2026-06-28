---
title: The Two Assets
description: "The flagship essay names two non-commodity assets — provenance and the gate. This page develops each in depth: what it is, what it costs to fake, why a frontier model cannot regenerate it, and how each instance realizes it."
section: case
order: 2
---

# The Two Assets

Restating canonical knowledge is a commodity. A frontier model regenerates the
canonical spine, the default parameters, even the standard caveats — on demand,
equal-or-better, and the margin shrinks as models improve. The
[[2026-06-blind-regeneration]] experiment showed this directly: a model that had
never seen the original skill reproduced its procedure verbatim and *added* validity
content the original lacked. If a static restatement is all a skill carries, the skill
is redundant the moment the next model ships.

Two things are *not* commodities, and the flagship essay
([[skills-package-not-source]]) names both:

1. **Provenance** — which specific claim is real, and where it came from.
2. **The gate** — the *enforced* empirical check that doing must pass before it counts.

A regenerated artifact carries neither. That is the whole argument, and it is worth
developing each asset on its own terms.

## Asset one — Provenance

Provenance is the record emitted beside every cast artifact: which Mold revision was
compiled, which model version produced it, which references resolved, which checks ran,
and — per reference — whether each byte came from deterministic tooling or from an LLM.
It is the forensic answer to the **traceability cost**: from a finished skill you
cannot tell which citations, thresholds, and claims are real-and-verified versus
plausibly-confabulated. Provenance restores that legibility.

It is legible to **both** audiences, which is the point. A human can scrutinize a
claim, correct it against its source, and contribute back to the source rather than
patching a frozen copy. An agent can reason about *what knowledge actually exists* — what
was grounded, what was condensed, what is stale — instead of treating every sentence as
equally load-bearing. The same record serves the human surface above and the agent
runtime below.

Why a regenerated skill *structurally* cannot carry this: in the blind-regeneration run,
the cold model reproduced the citations **from memory**, fuzzy ones included — "Pe'er
et al.", "Efron 2004/2010". The output is fluent and confident, and *you cannot tell
which references are correct*. That is not a quality defect the next model fixes; it is
the absence of a property the text never had. Provenance is a property of the
**production process**, not of the prose. You cannot infer it by reading the artifact,
however good the artifact is, because two byte-identical skills — one grounded against a
curated source, one confabulated whole — are indistinguishable on the page. Only the
record of *how each was produced* separates them. A model regenerating from weights has
no production record to attach; it has only the text.

This is also why provenance resists faking. Confabulating provenance means
fabricating a chain of source hashes, Mold revisions, and per-reference origins that a
deterministic verifier re-checks against the actual KB — the cost of a convincing fake is
the cost of doing the real grounding work. Restatement is cheap to regenerate precisely
because it carries no such chain.

## Asset two — The gate

The gate is the external, non-self-certifying check standing between authored knowledge
and a *trusted* result. Its necessity rests on a distinction the blind experiment made
unavoidable: **knowing ≠ gating.**

Validity knowledge is already in the weights. The cold model *spontaneously added more
caveats* than the original — it knew about double-dipping, batch confounding, the
assumptions a method requires. So a static skill that merely *mentions* caveats adds
nothing a frontier model lacks. What no static artifact provides is **enforcement**:
the property that *doing does not terminate until a referee clears it*. A caveat is
something a model may or may not raise; a gate is something doing cannot route around.
This is the structural form of the gate obligation — *doing may not terminate in
self-certification*: the analyze step must hand off to a referee whose verdict gates
certification (see [[anatomy-of-an-instance]]).

The referee does its work two ways, and the difference is load-bearing:

- **Critique** — *reason about* validity against known invalidity patterns: is the
  method named-and-real, are its assumptions met, is this double-dipped or confounded?
  Fast, and it catches the named failures. But critique is itself model reasoning — and
  reasoning is exactly what we do not trust, because the failing analysis was *also*
  fluent reasoning.
- **Calibrate** — *construct and run* an empirical check: permutation under the null,
  simulation against known truth, calibration of the test statistic. Slower, but it is
  the *external* verdict, not another act of narration.

The strong form of the gate therefore requires **at least one calibrate pass**, not
critique alone. Critique narrows *what* to calibrate; calibrate delivers the verdict
that does not self-certify.

(The empirical, non-self-certifying *posture* of such a referee is shared prior art, not
ours to claim — POPPER does this with provable Type-I error control; see
[[related-projects]]. What is non-commodity here is narrower: the gate as an *enforced*
check standing in for a static restatement a frontier model already outperforms.)

The gate has two instance realizations (see [[anatomy-of-an-instance]]). In the Galaxy
Workflow Foundry it is a **deterministic CLI** — `gxwf` parses and validates gxformat2;
hallucinated tool IDs and dropped revisions are caught mechanically, not by prose. In the
Statistical Genomics Foundry no CLI can decide "is this method valid," so the gate is
itself authored knowledge cast into a skill — an empirical **referee** running the
`analyze → referee → revise` loop. The generalization the pattern earns at the diff: a
deterministic CLI is one kind of gate; an empirical referee Mold is another.

## Why the two together

Each asset answers half the failure, and one without the other is insufficient.

Provenance without a gate is **traceable but unrefereed**: you can audit where every
claim came from, but nothing forced the *doing* to pass an external check — a confidently
sourced result can still be invalid. A gate without provenance is **refereed but
unauditable**: the result cleared an empirical check, but you cannot trace which inputs,
methods, or sources produced it, so you cannot scrutinize, correct, or reproduce it.

Together they close the loop: **provenance makes the knowledge auditable; the gate makes
the doing honest.** The referee's verdict is itself recorded in provenance — *which*
checks ran is part of the forensic record — so the two are not merely co-present, they
compose.

## The depreciating moat

This is the close the whole Case turns on. As models improve, restatement depreciates
toward zero — the better the model, the less a static rephrasing of canonical knowledge
adds, until it adds nothing and risks worse: a corpus of unverified, model-generated
restatements becomes training data, model output fed back as ground truth with no
provenance to catch the errors.

Provenance and the gate move the other way. A stronger model produces *better-grounded*
casts and *sharper* referee checks — the auditable chain and the enforced verdict hold
their value or appreciate as the thing they ground gets better. The two non-commodity
assets are exactly the two that do not depreciate. That is why the distribution choice
matters: ship knowledge as a **package** carrying its provenance and gated by a referee,
not as a **source** that is only a restatement a frontier model already outperforms.

Neighboring projects are genuinely good at the artifact layer (see [[related-projects]]);
the claim here is narrow and about a layer — the source beneath the package, and the
enforcement around the doing — not a verdict on anyone's skills.
