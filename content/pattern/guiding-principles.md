---
title: Guiding Principles
description: Commitments that keep a Foundry's knowledge grounded, actionable, legible, and durable as its domain and tooling change.
section: pattern
order: 3
---

# Guiding Principles

A Foundry turns a body of working knowledge into something people can inspect and agents can act on. These principles keep that knowledge trustworthy as the domain, the corpus, and the surrounding tools change. They are domain-free on purpose: every Foundry inherits the commitments, then decides how its own domain will honor them.

<figure class="not-prose principles-loop" aria-labelledby="principles-loop-caption" data-pagefind-ignore>
  <div class="principles-loop-flow">
    <div>
      <span>01</span>
      <strong>Ground</strong>
      <small>Start with authoritative sources and observed practice.</small>
    </div>
    <b aria-hidden="true">→</b>
    <div>
      <span>02</span>
      <strong>Explain</strong>
      <small>Keep the knowledge inspectable and give it its own map.</small>
    </div>
    <b aria-hidden="true">→</b>
    <div>
      <span>03</span>
      <strong>Cast</strong>
      <small>Package one action through a deterministic process.</small>
    </div>
    <b aria-hidden="true">→</b>
    <div>
      <span>04</span>
      <strong>Check</strong>
      <small>Require evidence outside the work that produced the result.</small>
    </div>
    <b class="principles-loop-return" aria-hidden="true">↺</b>
  </div>
  <figcaption id="principles-loop-caption">
    The loop closes when evidence from use improves the source rather than becoming another caveat in a hand-written skill.
  </figcaption>
</figure>

The principles fall into three families. The first keeps knowledge grounded, the second makes it trustworthy and actionable, and the third keeps it legible and durable. [[principles-in-action]] shows the concrete decisions the two current instances made in response.

## Keep knowledge grounded

Grounding prevents a Foundry from becoming an articulate account of its authors' assumptions. Authority, licensing, and evidence determine what the knowledge base may claim and carry.

### Source Authority Beats Local Copies

Keep knowledge near the project that owns it. A Foundry adds value by connecting, explaining, and operationalizing upstream knowledge—not by silently becoming its canonical home.

**Why it matters.** A local mirror creates another copy that can drift. Citing by URL stays fresh but may be unstable; quoting a fixed excerpt is stable to read but can go stale; pinning by hash, commit, or DOI is stable and drift-detectable but frozen until it is deliberately updated. No choice removes the tradeoff.

**Requires:** cite rather than mirror by default, pin what must remain stable, and review the dependency when an upstream source changes.

### Redistributed Content Carries Its License

When outside content crosses into a Foundry, its license crosses with it. A reader must be able to distinguish what the Foundry asserts from what it redistributes, and casting must respect the terms attached to every carried artifact.

**Why it matters.** Unlicensed or incorrectly redistributed material turns a reusable knowledge base into a liability. Treating license as prose metadata also makes it easy for a cast to carry content in a mode its terms do not permit.

**Requires:** typed license metadata, the corresponding license text where needed, a default-deny policy for unknown terms, and casting rules that use the license as an input rather than an afterthought.

### Corpus-First, Not Invention-First

Earn abstractions from real examples before naming them. Mold behavior, taxonomies, and reference notes should trace to observed practice rather than plausible-sounding prose written in advance.

**Why it matters.** A downstream agent cannot tell hard-won knowledge from confident invention. Comprehensive notes authored before contact with a corpus quietly turn the Foundry into the thing it is meant to guard against.

**Requires:** survey broadly, inspect candidate structure cheaply, and read deeply only where a real case justifies it. Start reference notes as sourced stubs and grow them when a cast, failure, or corpus example demands more.

## Make knowledge trustworthy and actionable

Grounded knowledge becomes useful when its structure can drive work and when something independent can check the result.

### Reproducibility At Every Layer

A maintainer should be able to recover how a derived artifact was produced, what it depended on, and which checks it cleared. Reproducibility applies to the knowledge pipeline, not only to the final result.

**Why it matters.** Without lineage, a changed artifact is merely different: nobody can tell which source, assumption, target, or check accounts for the difference. The goal is not perfect immutability but accountable change.

**Requires:** provenance for each cast—its Mold, target, resolved references, source identities or hashes, and checks—and deterministic regeneration wherever the domain permits it.

### Deterministic Tools Do Deterministic Work

Use models for interpretation, synthesis, repair, and translation. Give parsing, resolution, validation, hashing, copying, and other repeatable work to tools that produce the same answer every time.

**Why it matters.** Prose caveats are advisory; a model may repeat one and still violate it. A deterministic instrument is cheaper, easier to audit, and capable of stopping the work. Most importantly, doing does not get to certify itself.

**Requires:** deterministic casting and an external check before work counts as trusted. The form of that check belongs to the domain: it may be a parser or validator where correctness is mechanical, or an empirical referee using simulation, calibration, or negative controls where it is not.

### Actionable Knowledge, Not Passive Notes

Keep the rich source and make its structure executable. A Mold identifies the knowledge one concrete action needs; casting turns that declaration into an artifact an agent can use.

**Why it matters.** A passive knowledge base can explain without causing action. A standalone skill can cause action while hiding the evidence and rationale needed to maintain it. Neither is enough by itself.

**Requires:** typed units and references that a build can resolve and check, plus a deterministic cast that packages the declared dependency surface without making the package the new source of truth.

## Make knowledge legible and durable

A trustworthy system still fails if only its original authors can understand it, if every task must load all of it, or if its knowledge is trapped in one runtime.

### The Knowledge Base Documents Itself

A Foundry must explain not only its domain knowledge, but how that knowledge is named, organized, and transformed. Its vocabulary, architecture, and content contracts belong inside the inspectable knowledge base rather than in maintainer memory or scattered implementation comments.

**Why it matters.** A system can execute correctly today and still be impossible to change responsibly tomorrow. If contributors must reconstruct its design from code and repository history, the hard-won knowledge has merely moved from a skill into another hidden container.

**Requires:** an authoritative glossary; focused design records with explicit ownership boundaries; documentation and an example beside each knowledge kind; and generated catalogs for inventories that would go stale if restated by hand. The knowledge base should carry its own map.

### Progressive Disclosure Over Context Flooding

Show people and agents the right knowledge at the right time. Preserve navigable depth in the source without forcing every runtime artifact to carry the entire library.

**Why it matters.** Flattening every reference, schema, example, and rationale into one prompt makes rich knowledge harder to navigate and consumes attention before it is useful. Minimalism is not the goal; deliberate disclosure is.

**Requires:** a visible path from journey to action to supporting evidence, plus declared load and placement policies that distinguish up-front material from on-demand references and inlined content from bundled or sidecar material.

### Portable Artifacts Over Platform Fashion

Keep core knowledge independent of any agent runtime, editor, model vendor, or orchestration framework. A new platform should require a new target or harness, not a rewrite of the knowledge base.

**Why it matters.** Agent platforms will change faster than the domain knowledge they consume. Binding source knowledge to today's packaging format makes that knowledge inherit the platform's lifetime.

**Requires:** runtime-neutral Molds and references, target-specific casting rules, and generated artifacts that may adopt a platform's vocabulary without pushing it back into the source.

## One Reinforcing System

These are not nine independent virtues. Source authority and corpus-grounding establish what may be claimed; licensing controls what may be carried; provenance explains what a cast used; deterministic tools and domain checks make that lineage meaningful. Self-documentation gives people a map of the system, progressive disclosure makes its depth navigable, and portable artifacts let the knowledge outlive a runtime.

**Actionable Knowledge, Not Passive Notes** is the spine: it turns an inspectable source into something that can drive work. **The Knowledge Base Documents Itself** keeps that spine intelligible as the Foundry grows. The pattern works when each layer keeps its job—upstream owns the facts, the Foundry owns its synthesis and casting source, the domain's check owns the verdict, cast artifacts own execution, and harnesses own orchestration.

## See Also

- [[principles-in-action]] — how the two current Foundries enact each principle.
- [[anatomy-of-an-instance]] — the invariant substrate and the domain-specific extension surface.
- [[the-model]] — Knowledge Base, Mold, Cast, and provenance as the structural realization of these principles.
- [[design-records]] — the map a Foundry keeps of its own design.
- [[glossary]] — the pattern's authoritative vocabulary.
