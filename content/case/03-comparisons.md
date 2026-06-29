---
title: Comparisons
description: Where the Foundry Pattern sits relative to wikis, skill bundles, auto-generated docs, and prior monolithic skills — stable positioning on defensible axes.
section: case
order: 3
---

# Comparisons

Where the Foundry Pattern sits relative to adjacent approaches. Every system
here is good at what it does; the goal is to *locate* the pattern, not diminish
anyone. We claim distinctness only on axes we can defend.

This page is deliberately **timeless**. It contrasts the pattern against
*kinds* of approach that do not move when an external project ships a new
release. A dated, point-in-time survey of *specific* systems — MCP, Corpus2Skill,
Pinecone Nexus, RAG products, and the rest — lives in the
[[2026-05-landscape-snapshot]] (Blog), refreshed on demand as a dated sweep so
this page never carries a date that rots.

The recurring axis across all of these is *when* the knowledge base meets the
skill: **runtime** (the agent fetches or retrieves when it decides it needs to)
versus **compile time** (a deterministic step bakes selected KB slices into the
artifact, with provenance). The Foundry Pattern is a
compile-time-with-provenance design; most deployed approaches are runtime. Keep
that axis in mind below.

---

## Versus "just put it in a wiki"

A wiki preserves context and supports human browsing — genuinely valuable, and
the human-readable surface is something the Foundry Pattern shares rather than
rejects. What a wiki does not do: produce executable artifacts, validate
cross-references mechanically, record provenance when content is consumed, or
enforce a separation between durable knowledge and runtime instruction. A wiki
page that grows a runtime-instruction section eventually contradicts another
section that grew elsewhere, with no compiler to surface the contradiction. The
KB is wiki-like in its readability; the casting step is what a wiki lacks.

## Versus "just write agent skills"

A bundle of hand-authored skills executes well and packages clean — it is good
at exactly the artifact layer it targets, and especially valuable for weaker
models that benefit from a condensed, ready-to-run restatement. The cost is
above and below that layer. A skill bundle tends to compress away the evidence
and design rationale that makes a skill maintainable; the same content reappears
across skills with subtle drift; patterns get re-derived per skill; and there is
no single inspectable source the maintainer fixes once. The Foundry Pattern's
claim is not that skills are wrong — it is that the skill is the *package*, and
the source belongs one layer beneath it. See [[skills-package-not-source]] for
the full argument.

## Versus documentation auto-generated from code

Auto-generated docs (`--help` dumps, schema-to-Markdown renderers) preserve
fidelity at the cost of context. They tell you what a function does, not *when*
to reach for it or *why* to combine it with another. This is real and useful
output — and the Foundry Pattern consumes it directly: a generated schema or CLI
page is cast verbatim into a sidecar. The difference is the hand-framed wrapper
around that generated metadata. The framing — when, why, alongside what — is
where the operational judgment lives, and it is exactly the part no generator
emits.

## Versus prior monolithic skills (the prior art)

The pattern did not arrive from nowhere. In each instance, hand-authored
monolithic skills were the prior art that *motivated* the Foundry. Their
*content* feeds the KB — manual pages, exemplars, action descriptions; their
*form* does not. The specific responses are responses to specific failure modes
observed in those skills: decomposition into typed reference manifests, validation
moved into the inner authoring loop, casting established as the integration
boundary, and an [[anatomy-of-an-instance|external check]] made the source of truth for correctness rather
than prose caveats. The monolithic skill is not a strawman — it is the thing that
worked well enough to reveal what was missing.

---

## Where the Foundry Pattern lands

The field's default is *attach a KB, retrieve at runtime*. That default is
*right* for large, heterogeneous, frequently-updated corpora where a retrieval
miss is tolerable — most enterprise knowledge work lives here, and runtime RAG
serves it well.

It is the wrong default for **schema-bound, high-stakes, version-pinned**
domains, where the right default inverts: **compile-time grounding with
provenance**. The KB is the source of truth; a deterministic pipeline casts
selected slices into target-specific artifacts; provenance is recorded beside
each artifact; and drift from source becomes mechanically detectable. Runtime
fetch still has a place — comparing a cast artifact against a live external
exemplar, say — but it *augments* the compiled grounding; it never *replaces*
it. The moment runtime retrieval becomes load-bearing for correctness, the two
non-commodity assets — provenance and an enforced check — are gone. (Those two
assets are the spine of the whole case; see [[the-two-assets]].)

This is also the boundary where a skill *bundle* and a knowledge *base* stop
being interchangeable. A bundle is a runtime asset: it is what the agent loads.
A KB is a compile-time asset with provenance: it is what the bundle is cast
*from*. Same files on disk, opposite roles — and the role determines whether you
can answer "which claim here is real, and where did it come from?"

How the two current instances realize this same landing — with different domain
extensions on the same substrate — is laid out in the values table at [[related-projects]].

---

## The core bet

None of the individual ideas here are new, and the tone contract forbids
pretending otherwise. Typed references exist. Per-kind transformation exists.
Content-hash identity exists. Provenance exists. Corpus-first authoring exists.
Compile-time generation from a schema exists. Empirical non-self-certifying
checks exist.

The bet is the **combination**: typed references, per-kind casting, content-hash
identity, provenance as an audit substrate, and corpus-first authoring, assembled
so that the skill is a compile *target* and the curated KB is the source of
record. Each piece is borrowed and credited. The wager is that putting them
together — for the schema-bound, high-stakes, version-pinned corner of the field
where it matters — is worth more than any of them alone.
