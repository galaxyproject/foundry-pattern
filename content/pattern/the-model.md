---
title: The Model
description: The Foundry machine — an inspectable Knowledge Base, Molds that select one action, a deterministic-first Cast, and provenance beside every output.
section: pattern
order: 2
---

# The Model

A Foundry keeps authorship and distribution separate. People maintain a rich, inspectable **Knowledge Base**; agents receive small, frozen artifacts compiled for one action. Four parts make that work: the Knowledge Base, a **Mold** that selects what one action needs, a **Cast** that builds the artifact, and **Provenance** that records exactly what went into it.

<figure class="not-prose model-machine" aria-labelledby="model-machine-caption" data-pagefind-ignore>
  <div class="model-machine-flow">
    <div class="model-machine-source">
      <span class="model-machine-label">01 · source of truth</span>
      <strong>Knowledge Base</strong>
      <span>notes · schemas · references</span>
      <div class="model-machine-mold">
        <span class="model-machine-label">02 · one action</span>
        <strong>Mold</strong>
        <span>typed dependencies + procedure</span>
      </div>
    </div>
    <div class="model-machine-cast" aria-hidden="true">
      <span>03 · cast</span>
      <b>&rarr;</b>
      <small>deterministic first<br />LLM second</small>
    </div>
    <div class="model-machine-output">
      <div class="model-machine-artifact">
        <span class="model-machine-label">target artifact</span>
        <strong>Frozen skill</strong>
        <span>condensed · isolated · portable</span>
      </div>
      <div class="model-machine-provenance">
        <span class="model-machine-label">04 · lineage record</span>
        <strong>Provenance</strong>
        <span>revision · model · refs · checks</span>
      </div>
    </div>
  </div>
  <figcaption id="model-machine-caption">
    Read left to right: author the knowledge, select one action, then cast an artifact and its lineage record.
  </figcaption>
</figure>

## The four parts at a glance

<div class="not-prose model-parts" data-pagefind-ignore>
  <div>
    <span>01</span>
    <strong>Knowledge Base</strong>
    <p>The durable source people read, review, link, and correct.</p>
  </div>
  <div>
    <span>02</span>
    <strong>Mold</strong>
    <p>A typed manifest for one action and the knowledge it depends on.</p>
  </div>
  <div>
    <span>03</span>
    <strong>Cast</strong>
    <p>The compilation step that turns a Mold into a target artifact.</p>
  </div>
  <div>
    <span>04</span>
    <strong>Provenance</strong>
    <p>The separate record of the source, transformations, and checks.</p>
  </div>
</div>

Targets and validation matter, but they are not extra parts. A **Target** configures what the Cast produces. A domain's external **check** decides whether the work performed with that artifact can be trusted. Keeping those boundaries explicit is what lets every Foundry share one substrate while different domains extend it differently.

<aside class="not-prose model-example">
  <span>Running example</span>
  <p>Imagine a Mold called <code>summarize-source</code>. It declares an input schema, a domain pattern, and the procedure for producing a structured summary. We will follow it through the four parts.</p>
</aside>

## 1. Knowledge Base

The **Knowledge Base (KB)** is the source of truth: a human-readable corpus authored to be inspected, learned, corrected, and cited. It is plain files, not a hidden agent store. Typed frontmatter, controlled tags, and wiki-linked references give those files enough structure for tooling to act on them.

Calling that structure *executable* is a claim the build enforces. Every typed reference must resolve, controlled tags must exist in their registry, and generated indexes and deterministic renders are regenerated and diffed. A Mold whose source fails these checks cannot be cast. The same structure that helps a person navigate the knowledge therefore gives the compiler something it can verify.

The glossary is the highest-fan-in part of the KB. It pins coined terms once so people and models use the same vocabulary; casting copies those definitions verbatim rather than condensing them. The full rationale belongs in the [[glossary]], and defining that vocabulary is one of the first steps in [[setting-up-a-foundry]].

In the running example, the KB owns the input schema and domain pattern that `summarize-source` will use. If either changes, the source changes in one inspectable place.

## 2. Mold

A **Mold** describes one action. It is an abstract, typed reference manifest plus a procedural skeleton: which knowledge the action needs, when each dependency should be loaded, how it may be transformed, and what the action does with it. A Mold is source, independent of any agent runtime.

The boundary is procedural. A repeatable decision-and-handoff worth executing as a unit becomes a Mold; a fact, convention, or contract that an action can cite stays a reference. One Mold may be substantial, but it should still describe one coherent unit of work—not an entire journey and not a dust of fragments.

Every declared reference carries three decisions:

- a **kind** — which resolver and casting rules apply;
- a **load policy** — `upfront` or `on-demand`, with a trigger for the latter;
- a **transform mode** — copied verbatim, condensed, or carried as a sidecar where the target permits it.

Common reference kinds include KB pages, schemas, CLI manual pages, prompts, and examples. Their different shapes are why the manifest is typed rather than a flat list of links.

For `summarize-source`, the input schema loads up front because every run needs it. The domain pattern can load on demand when the source type calls for it. The Mold declares both dependencies; it does not duplicate their content.

## 3. Cast

**Casting** compiles a Mold into a target-specific artifact. It runs **deterministic first, LLM second**—an ordering of trust. Deterministic tooling resolves references, copies verbatim material, builds sidecars, renders the artifact, and writes provenance. A model is invoked only for reference kinds explicitly marked for condensation, and every fragment it produces is recorded.

The artifact crosses an integration boundary. It comes out:

- **condensed** — limited to what this action needs;
- **isolated** — with links resolved away and no runtime dependency on the KB;
- **frozen** — tied to one source revision rather than silently following future edits.

The skill body is therefore never hand-maintained. If it is under-instructed, fix the Mold or its references and cast it again. The KB remains the source; the artifact is the package.

### Targets change the package, not the source

A **Target** is an output format: one agent's skill format, a generic skill bundle, or another frozen package. Casting is parameterized by target, so one Mold may produce several artifacts without forking the knowledge that feeds them. A new runtime should require a new target configuration, not a rewrite of the KB.

In the running example, the Cast resolves the `summarize-source` dependencies, copies its schema exactly, condenses the domain pattern if requested, and emits a self-contained skill for the selected target.

## 4. Provenance

Every Cast emits **Provenance** beside the artifact. The consumer does not load it as instruction; it is the lineage record. It names:

- the **Mold revision** and content hash;
- the **model version** and prompt identity for any model-produced fragment;
- the **references resolved**, with source and destination hashes and who transformed them;
- the **checks run** at cast time.

That record makes drift mechanically detectable. Re-hash the Mold and its sources, compare them with the record, and a stale artifact announces itself. It also answers the forensic question a bare skill cannot: *where did this particular claim come from?*

For `summarize-source`, a record might look like this:

```json
{
  "mold": { "id": "summarize-source", "revision": 4, "content_hash": "sha256:9f1c…" },
  "model": "<model>@<version>",
  "references": [
    { "id": "input-schema",   "transform": "verbatim",
      "src_hash": "sha256:71a0…", "dst_hash": "sha256:71a0…", "by": "deterministic" },
    { "id": "domain-pattern", "transform": "condensed",
      "src_hash": "sha256:0a5e…", "dst_hash": "sha256:c43b…", "by": "llm",
      "prompt": "condense-pattern@v3" }
  ],
  "checks": ["static-validation", "references-resolved"]
}
```

Three useful tests fall straight out of it:

- **Verbatim material proves itself.** `src_hash == dst_hash` shows that the schema was copied unchanged.
- **Transformed material names its author.** A changed hash is paired with the model and prompt that produced the destination.
- **Drift and forensics share one index.** Compare hashes to find staleness; follow the same entries to find a claim's source.

The pattern requires re-checkable lineage, not this exact filename or encoding. Both existing instances use `_provenance.json`; another instance may encode the same guarantee differently.

## What sits outside the four parts

### Compile-time grounding, not runtime retrieval

Most retrieval-first systems attach a knowledge base to an agent and search it during a task. A Foundry makes a different bet: select and compile the required knowledge ahead of time, freeze it into the artifact, and record its lineage. Runtime retrieval may augment that package, but it does not replace the compiled grounding. The fuller comparison is in [[comparisons]].

### The external check

Source validation asks whether a Mold and its references are well-formed enough to cast. A domain's external check asks a different question: whether the work produced with the cast artifact deserves trust. The first is part of the shared machine; the second is extension surface.

Where correctness is mechanical, the check may be a parser or validator. Where it is empirical, the domain may construct a referee that runs simulations, calibration, or negative controls. Either way, doing does not get to certify itself. [[anatomy-of-an-instance]] follows that boundary end to end; [[guiding-principles]] explains the discipline behind it.
