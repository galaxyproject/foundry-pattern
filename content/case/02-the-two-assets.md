---
title: The Two Assets
description: "Restating canonical knowledge is a commodity. Two things are not: provenance — the asset every Foundry carries — and the enforced checks a domain builds on top, with the empirical referee as the marquee example."
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

Two kinds of thing are *not* commodities, and the flagship essay
([[skills-package-not-source]]) names both:

1. **Provenance** — which specific claim is real, and where it came from. This is the
   universal asset: *every* Foundry carries it, in every domain, because it is a
   property of how casts are produced.
2. **The enforced check** — the external verdict that doing must pass before it counts.
   What this is varies by domain, and where a domain's notion of "correct" can't be
   parsed by a tool, the check becomes a non-commodity deliverable in its own right. Its
   marquee example is the [[statistical-genomics-foundry]]'s empirical **referee**.

A regenerated artifact carries neither. That is the whole argument, and it is worth
developing each on its own terms.

## Asset one — Provenance (the universal one)

Provenance is the record emitted beside every cast artifact: which Mold revision was
compiled, which model version produced it, which references resolved, which checks ran,
and — per reference — whether each byte came from deterministic tooling or from an LLM.
It is the forensic answer to the **traceability cost**: from a finished skill you
cannot tell which citations, thresholds, and claims are real-and-verified versus
plausibly-confabulated. Provenance restores that legibility, and it does so in *every*
Foundry regardless of domain — it is the part of the package no instance opts out of.

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

## Asset two — The enforced check (the referee is the marquee example)

The second non-commodity is an external, non-self-certifying check standing between
authored knowledge and a *trusted* result. Its necessity rests on a distinction the
blind experiment made unavoidable: **knowing ≠ gating.**

A note on scope first, because it matters: unlike provenance, this is not one universal
mechanism every Foundry runs. Each domain builds the check its notion of "correct"
admits — a deterministic validator where output is parseable, something else entirely
where it isn't (see [[anatomy-of-an-instance]]). The version that is most sharply
*non-commodity* is the one a domain has to **construct**, and the clearest case is the
Statistical Genomics Foundry, so this section develops it.

Validity knowledge is already in the weights. The cold model *spontaneously added more
caveats* than the original — it knew about double-dipping, batch confounding, the
assumptions a method requires. So a static skill that merely *mentions* caveats adds
nothing a frontier model lacks. What no static artifact provides is **enforcement**:
the property that *doing does not terminate until a referee clears it*. A caveat is
something a model may or may not raise; an enforced check is something doing cannot route
around. In the stat-gen instance this is the *gate obligation* — the analyze step must
hand off to a referee whose verdict gates certification.

That referee does its work two ways, and the difference is load-bearing:

- **Critique** — *reason about* validity against known invalidity patterns: is the
  method named-and-real, are its assumptions met, is this double-dipped or confounded?
  Fast, and it catches the named failures. But critique is itself model reasoning — and
  reasoning is exactly what we do not trust, because the failing analysis was *also*
  fluent reasoning.
- **Calibrate** — *construct and run* an empirical check: permutation under the null,
  simulation against known truth, calibration of the test statistic. Slower, but it is
  the *external* verdict, not another act of narration.

The strong form therefore requires **at least one calibrate pass**, not critique alone.
Critique narrows *what* to calibrate; calibrate delivers the verdict that does not
self-certify. This is why the check is a *deliverable* and not a commodity: where no
tool ships that can decide validity, the Foundry has to build the check as authored
knowledge cast into a skill — work a frontier model does not hand you for free.

(The empirical, non-self-certifying *posture* of such a referee is shared prior art, not
ours to claim — POPPER does this with provable Type-I error control; see
[[related-projects]]. What is non-commodity here is narrower: a *constructed* check
standing in for a static restatement a frontier model already outperforms.)

Contrast the other end of the range. In the [[galaxy-workflow-foundry]] the check is a
**deterministic CLI** — `gxwf` parses and validates gxformat2; hallucinated tool IDs and
dropped revisions are caught mechanically, not by prose. That is genuine enforcement too,
but it is a *parser you call*, closer to commodity infrastructure than to a deliverable
you author. The non-commodity sharpens precisely as the check moves from "parse it" to
"construct the test the field trusts." Same role across the two domains; opposite ends of
buildable-versus-given.

## Why the two together

Each asset answers half the failure, and one without the other is insufficient.

Provenance without an enforced check is **traceable but unrefereed**: you can audit where
every claim came from, but nothing forced the *doing* to pass an external verdict — a
confidently sourced result can still be invalid. An enforced check without provenance is
**checked but unauditable**: the result cleared its check, but you cannot trace which
inputs, methods, or sources produced it, so you cannot scrutinize, correct, or reproduce
it.

Together they close the loop: **provenance makes the knowledge auditable; the check makes
the doing honest.** And they compose — the check's verdict is itself recorded in
provenance, so *which* checks ran is part of the same forensic record.

## The depreciating moat

This is the close the whole Case turns on. As models improve, restatement depreciates
toward zero — the better the model, the less a static rephrasing of canonical knowledge
adds, until it adds nothing and risks worse: a corpus of unverified, model-generated
restatements becomes training data, model output fed back as ground truth with no
provenance to catch the errors.

Provenance and an enforced check move the other way. A stronger model produces
*better-grounded* casts and *sharper* constructed checks — the auditable chain and the
enforced verdict hold their value or appreciate as the thing they ground gets better. The
non-commodity assets are exactly the ones that do not depreciate. That is why the
distribution choice matters: ship knowledge as a **package** carrying its provenance and
backed by a check the doing can't skip, not as a **source** that is only a restatement a
frontier model already outperforms.

Neighboring projects are genuinely good at the artifact layer (see [[related-projects]]);
the claim here is narrow and about a layer — the source beneath the package, and the
enforcement around the doing — not a verdict on anyone's skills.

Both assets answer what survives as models improve. They do not say who the source is *for* —
why the KB is written to be read by a person at all, when the machinery would run without it.
That is the third plank: [[explainer-is-the-source]].

These same two properties — provenance and standards-conformance — are what the FAIR data
principles named as prerequisites for reuse a decade before any of this, reasoning from a
different crisis entirely. [[fair-skills|That convergence]] is the outside witness for the
whole argument.
