---
title: "Skills: Package, Not Source"
description: A skill is a compile target, not an authoring surface — and treating it as the source of record costs you traceability and a moat that depreciates as models improve.
section: case
order: 1
---

# Skills: Package, Not Source

A skill file is a wonderful thing to *ship*. It is a poor thing to *author into*.
That one inversion is the whole of The Case. Everything below is its consequences.

## The distinction that matters

`SKILL.md` is, today, two things at once for most projects: the thing a model
loads at runtime, and the thing a human edits to change behavior. It is both the
package and the source. The Foundry Pattern pulls those apart.

In a Foundry, the source of record is a [[anatomy-of-an-instance|Knowledge Base]] —
inspectable, human-readable, authored to be *read and learned by a person*, not
merely retrieved by an agent. Its unit is the **Mold**: an abstract, typed
manifest of one action that declares the references it depends on. A deterministic
**cast** compiles a Mold into a target-specific skill artifact and emits
`_provenance.json` beside it — which Mold revision, which model, which references
resolved, which checks ran. The skill is condensed, frozen, self-contained, with
no links back. It is a *build output*.

The picture to hold: the skill is the binary, the KB is the code, casting is the
compiler, and provenance is the build log. No serious engineering culture treats
the compiled binary as the place you make changes. Skills-as-source does exactly
that — it edits the binary and discards the source. The Foundry inverts it: author
the KB, cast the skill, keep the receipt.

This is a claim about a **distribution choice at the pattern level** — not a
critique of any particular skills project. bioSkills, to name the strongest
neighbor, is the artifact layer done very well: broad, multi-runtime, genuinely
disciplined about CLI versions. The argument here is about the layer *beneath* the
artifact and the human surface *above* it, not about the quality of anyone's
skills.

## Concede it: skills-as-source is genuinely useful

The honest concession, and it is not a throwaway: for a great many uses, writing
the skill directly is the right call. A hand-authored skill is immediate, legible,
and runs the moment you drop it in. And it earns its keep most where it is needed
most — with **cheaper, less-capable models** that do not already carry the
canonical procedure in their weights. Spelling out the default pipeline in-context
is the difference between a small model doing the task and fumbling it. For that
audience the static restatement is not redundant; it is the product.

So the question is never "are skills bad." They are good. The question is whether
the skill should be the *source* format or the *packaging* format. Choosing source
buys you immediacy. It also signs you up for two costs that compound.

## Cost one: no traceability

Read a finished skill and try to answer a simple question: which of these
thresholds, citations, and claims are real-and-verified, and which are
plausible-and-confabulated? You cannot. The artifact is fluent either way. A
correct default parameter and an invented one render in identical prose; a real
citation and a hallucinated one have the same shape.

This breaks two audiences at once. **Humans** cannot scrutinize, correct, or
contribute against a source — there is no source, only the restatement.
**Agents** cannot reason about what knowledge exists or where it ends, because the
artifact carries no map of its own grounding. The thing that would let you tell
signal from confabulation — a link from each claim back to the revision and
reference that justify it — is precisely what casting-and-discarding throws away.

## Cost two: a depreciating moat, and a feedback loop that rots the record

For canonical content, a frontier model regenerates equal-or-better material on
demand. A static restatement of what the model already knows adds little — and
that margin *shrinks every time the models improve*. A moat built on "we wrote
down the standard method" is a moat that the next checkpoint drains. We did not
assert this; we tested it. See [[2026-06-blind-regeneration]]: a model that had
never seen the originals reproduced the canonical spine and default parameters,
and the effect was *stronger* for the lighter, more-canonical skills — the bulk of
any such corpus.

The second half is worse, and it is the part the field is sleepwalking into. A
growing corpus of unverified, model-generated restatements becomes *training
data*. Model output gets fed back as ground truth, with no provenance to catch the
errors riding along. That is a degenerative loop — for the scientific record that
absorbs these artifacts as if refereed, and for the future training corpora that
ingest them as if authoritative. Restating canonical knowledge does not just fail
to build a moat; at scale it actively pollutes the well everyone drinks from.

## The answer: the two non-commodity assets

Both costs have the same root — the artifact carries no separable, verifiable
claim about its own correctness — and the same answer. Two things a frontier model
cannot regenerate for you on demand, developed in full at [[the-two-assets]]:

- **Provenance.** Not "the model probably knew this," but *this specific claim is
  real, and here is the revision and reference it came from.* Traceability is what
  separates a refereed fact from a confident guess, for a human reviewer and an
  agent alike.
- **The gate.** An *enforced* empirical check standing between authored knowledge
  and a trusted result — not an optional caveat the model may or may not surface.
  What the gate *is* varies by instance (a deterministic CLI validator in one
  Foundry, an empirical referee loop in another), but every Foundry has one.

The line to keep: **restating canonical knowledge is a commodity; traceable,
refereed knowledge is not.** The first depreciates as models improve. The second
appreciates — every verified claim and every gate that fires is value a larger
model does not hand you for free.

## Knowing ≠ gating

Here is the objection the blind-regeneration result forces, and its answer. If the
model already knows the validity caveats — and it does; the blind author
*spontaneously added more* of them than the original carried — then what does a
Foundry add that the weights do not?

Enforcement. A model *knowing* a caveat and a model *being stopped by* it are
different events. Knowing means the caveat might appear in the prose, if the
sampling goes that way, if the context is right, if nothing crowds it out. Gating
means *doing does not terminate* until a referee clears it — the analysis cannot
self-certify and move on; it must hand off, and the verdict is a precondition, not
a suggestion. Validity knowledge in the weights is necessary and nowhere near
sufficient. A caveat that surfaces 80% of the time is a caveat that is absent
exactly when an unlucky run needs it. The gate makes it absent zero percent of the
time. That gap — between mentioning and enforcing — is the empirical backbone of
the whole argument, and it is where [[2026-06-blind-regeneration]] lands.

## Close

Skills are the right *package* and the wrong *source*. Ship them — cast them into
every runtime you like. But author the knowledge somewhere a human can read it and
an agent can trace it, gate it with a check that actually fires, and keep the
receipt. The artifact layer is a commodity headed toward zero margin; the source
layer and the gate above it are where the durable value lives.

For where this sits against the rest of the field — runtime retrieval versus
compile-time grounding, and the neighbors worth crediting — see [[comparisons]].
For a project-by-project read of who foregrounds a source and who enforces a gate,
see [[related-projects]].
