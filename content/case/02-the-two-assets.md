---
title: The Two Assets
description: "A Foundry makes two accountability boundaries explicit: provenance ties a package to its source; independent validation holds the resulting work to a domain standard."
section: case
order: 2
---

# The Two Assets

A skill can contain excellent instructions and still leave two questions unanswered:

1. **Where did this package come from?**
2. **What decided that the resulting work was acceptable?**

**Provenance** answers the first. An **independent check** answers the second. They
operate at different boundaries, and neither can substitute for the other.

<figure class="not-prose assets-boundaries" aria-labelledby="assets-boundaries-caption">
  <div class="assets-boundary">
    <header>
      <span>01</span>
      <div>
        <strong>Production boundary</strong>
        <small>Where did this package come from?</small>
      </div>
    </header>
    <div class="assets-boundary-flow">
      <div class="assets-boundary-node">
        <span>Source</span>
        <strong>Knowledge Base + Mold</strong>
      </div>
      <div class="assets-boundary-arrow">
        <small>deterministic cast</small>
        <b aria-hidden="true">→</b>
      </div>
      <div class="assets-boundary-output">
        <div class="assets-boundary-node assets-boundary-node--accent">
          <span>Package</span>
          <strong>Frozen skill</strong>
        </div>
        <div class="assets-boundary-receipt">
          <span>Provenance</span>
          <strong>source · revision · checks</strong>
        </div>
      </div>
    </div>
  </div>
  <div class="assets-boundary">
    <header>
      <span>02</span>
      <div>
        <strong>Trust boundary</strong>
        <small>What decided that the work was acceptable?</small>
      </div>
    </header>
    <div class="assets-boundary-flow assets-boundary-flow--check">
      <div class="assets-boundary-node">
        <span>Work</span>
        <strong>Result</strong>
      </div>
      <div class="assets-boundary-arrow">
        <small>must pass</small>
        <b aria-hidden="true">→</b>
      </div>
      <div class="assets-boundary-node assets-boundary-node--check">
        <span>Domain capability</span>
        <strong>Independent check</strong>
      </div>
      <div class="assets-boundary-arrow assets-boundary-arrow--short">
        <small>produces</small>
        <b aria-hidden="true">→</b>
      </div>
      <div class="assets-boundary-node assets-boundary-node--verdict">
        <span>Decision</span>
        <strong>Verdict</strong>
      </div>
    </div>
  </div>
  <figcaption id="assets-boundaries-caption">
    Provenance makes the package accountable to its source. The independent check
    makes work performed with it accountable to a domain standard.
  </figcaption>
</figure>

The word *assets* does not mean two more files to bundle into a skill. Provenance is
carried beside the package. The independent check is a capability in the surrounding
domain system; its identity and verdict can be recorded in provenance, but the check
does not live inside every artifact.

## 1. Provenance: accountable to the source

Provenance is the record emitted beside a cast artifact: which Mold revision and
target produced it, which references resolved, where they were placed, their hashes,
and which cast-time checks ran. It makes the path from source to package re-checkable.

That path cannot be recovered from polished prose alone. In the
[[2026-06-blind-regeneration|blind-regeneration experiment]], a model that had never
seen the original skill reproduced its procedure and supplied plausible citations from
memory—including fuzzy ones. The result read confidently, but reading it could not
tell us which claims had been checked against a source.

This is not a shortcoming that a stronger model necessarily fixes. Provenance is a
property of the **production process**, not a quality of the prose. Two byte-identical
skills can have radically different histories: one may have been deterministically
cast from curated, inspectable sources; the other may have been generated from model
weights. Only the production record distinguishes them.

That record serves people and machines. A person can follow a packaged claim back to
its source and correct the source instead of patching a frozen copy. Tooling can detect
drift, verify hashes, and determine which cast artifacts need regeneration. Provenance
does not prove that a claim is true; it makes the claim's lineage inspectable and
re-checkable.

## 2. Independent validation: accountable to a standard

The second boundary comes after the package is used. An independent check asks whether
the resulting work deserves trust. The process that produced the result does not get
to certify itself.

This is the difference between **knowing** and **gating**. Knowledge may cause a caveat
to be mentioned. A check turns a defined condition into a precondition for
acceptance—within its stated coverage. The blind experiment sharpened that
distinction: the model volunteered useful warnings, but nothing required the analysis
to demonstrate that those warnings had been addressed.

The pattern fixes the role of this check, not its implementation. The current
instances show why:

- In the [[galaxy-workflow-foundry]], `gxwf` mechanically parses and validates the
  generated workflow. Malformed state, mismatched connections, and invalid tool
  identifiers cannot be talked past; the workflow does not pass until the external
  validator accepts it.
- In the [[statistical-genomics-foundry]], no parser can decide whether a statistical
  method is valid for a particular analysis. Its authored referee Molds therefore
  combine **critique** of known failure patterns with **calibration** through
  permutation, simulation, or negative controls. Those procedures exist in the source
  system today; they become runtime gates when casting is implemented.

These are opposite implementations of the same responsibility: produce evidence that
does not reduce to the model's own assurance. The statistical-genomics approach also
has important prior art—[POPPER](https://arxiv.org/abs/2502.09858), for example, uses
empirical falsification with Type-I error control. The Foundry claim is not ownership
of that posture. It is that a domain must name where its independent verdict comes
from and make that boundary enforceable.

## Why both are necessary

Each boundary closes a different failure mode:

- **Provenance without an independent check is traceable but unvalidated.** We can
  reconstruct how the package was made, but a faithfully sourced procedure can still
  produce an invalid result.
- **An independent check without provenance is checked but unauditable.** We may have
  a verdict, but not a trustworthy account of which sources, revisions, and inputs
  produced the package used in the work.
- **Together, they make the chain accountable at both ends.** The package can be traced
  to its source, and the work can be judged against a standard outside the process that
  produced it.

The two can compose without collapsing into one. Provenance may record which external
check ran and what verdict it returned. That makes the verdict traceable; it does not
turn provenance into validation or the validator into part of the package.

## What the two assets do—and do not—protect

Neither boundary promises truth in the abstract. Provenance can faithfully record a
bad source. A validator can miss failures outside its declared scope. An empirical
check can be weakly designed. The useful claim is narrower: failures become easier to
locate, challenge, and correct because responsibility is explicit.

That is also what survives as models improve. A stronger model may regenerate the
explanatory content of a skill more fluently, making static restatement less
distinctive. It cannot retroactively supply the history of a production process that
never occurred, and its confidence is not an external verdict. Those properties have
to be built around generation.

Provenance makes the package accountable to its source. Independent validation makes
the resulting work accountable to a standard outside itself. The first lets us
reconstruct how an artifact was made; the second determines whether its use should
count. A Foundry needs both boundaries to be explicit, even though each domain
implements the second differently.

The flagship argument for treating skills as packages rather than sources is
[[skills-package-not-source]]. [[explainer-is-the-source]] asks who the human-readable
source is for, while [[fair-skills]] connects these accountability properties to an
older framework for trustworthy reuse.
