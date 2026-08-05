---
title: "Build with the Astro Stack"
description: Compose domain-owned knowledge, instance policy, Astro, and the shared Foundry packages into one concrete Foundry implementation.
section: pattern
order: 7
instructions: pattern/standing-up-a-foundry.instructions.txt
---

# Build with the Astro Stack

[[setting-up-a-foundry|Plan Your Foundry]] gives the stack-neutral route. This page applies that
route to one repository composition: Markdown knowledge in a `content/` tree, an Astro site on
GitHub Pages, TypeScript and Zod content contracts, Vitest validation, and shared
`@galaxy-foundry/*` mechanics from
[`foundry-lib`](https://jmchilton.github.io/foundry-lib/).

The page owns the **composition seam**: the repository layout, order of work, instance-supplied
policy, and end-to-end checkpoints. `foundry-lib` owns package behavior and APIs. A concrete
Foundry owns its domain knowledge, kinds, vocabularies, renderers, targets, and acceptance policy.

<figure class="not-prose astro-build-architecture" aria-labelledby="astro-build-architecture-caption" data-pagefind-ignore>
  <div class="astro-build-node astro-build-source">
    <span>Instance-owned · authored</span>
    <strong>Domain knowledge</strong>
    <small>content · glossary · examples · Molds</small>
  </div>
  <div class="astro-build-connector" aria-hidden="true">
    <span>structured by</span>
    <b>↓</b>
  </div>
  <div class="astro-build-seam">
    <div class="astro-build-node astro-build-instance">
      <span>Instance-owned · composed here</span>
      <strong>Repository policy</strong>
      <small>kinds · registries · validators · renderers · targets</small>
    </div>
    <div class="astro-build-bridge" aria-hidden="true">
      <span>imports</span>
      <b>↔</b>
    </div>
    <div class="astro-build-node astro-build-library">
      <span>Shared · versioned</span>
      <strong><a href="https://jmchilton.github.io/foundry-lib/#/getting-started">foundry-lib</a></strong>
      <small>schemas · links · site shell · casting mechanics</small>
    </div>
  </div>
  <div class="astro-build-connector" aria-hidden="true">
    <span>builds</span>
    <b>↓</b>
  </div>
  <div class="astro-build-node astro-build-output">
    <span>Generated · checked</span>
    <strong>Reader and runtime outputs</strong>
    <small>site · manifests · catalogs · cast artifacts · provenance</small>
  </div>
  <figcaption id="astro-build-architecture-caption">
    This guide owns the seam between instance policy and shared mechanics. Package internals stay canonical in <a href="https://jmchilton.github.io/foundry-lib/">foundry-lib</a>.
  </figcaption>
</figure>

## From pattern commitment to implementation seam

[[anatomy-of-an-instance|What a Foundry Needs]] defines the pattern-level boundary. The
[`foundry-lib` shared-substrate guide](https://jmchilton.github.io/foundry-lib/#/concepts/shared-substrate)
explains which mechanics have earned a shared package, and its
[`package boundaries`](https://jmchilton.github.io/foundry-lib/#/architecture/package-boundaries)
page is canonical for what those packages can truthfully own.

<div class="not-prose astro-build-matrix" data-pagefind-ignore>
  <table>
    <thead>
      <tr>
        <th scope="col">Pattern concern</th>
        <th scope="col">This Astro composition</th>
        <th scope="col">Canonical detail</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Knowledge Base (KB)</th>
        <td>Astro renders the content tree; the instance supplies identity, routes, corpus, and visual contract.</td>
        <td><a href="https://jmchilton.github.io/foundry-lib/#/architecture/site-kit-runtime"><code>site-kit</code> runtime</a></td>
      </tr>
      <tr>
        <th scope="row">Mold (typed actions)</th>
        <td>Instance-defined Zod kinds make action boundaries and reference requirements checkable.</td>
        <td><a href="https://jmchilton.github.io/foundry-lib/#/getting-started"><code>foundry-lib</code> integration guide</a></td>
      </tr>
      <tr>
        <th scope="row">Corpus-First, Not Invention-First</th>
        <td>Source directories, authored derivatives, licenses, and refresh posture remain instance content and policy.</td>
        <td><a href="../setting-up-a-foundry/">Plan Your Foundry</a></td>
      </tr>
      <tr>
        <th scope="row">Progressive disclosure</th>
        <td>The shared reference vocabularies combine with instance-defined reference kinds and placement support.</td>
        <td><a href="https://github.com/jmchilton/foundry-lib/tree/main/packages/reference-contract"><code>reference-contract</code> package</a></td>
      </tr>
      <tr>
        <th scope="row">Casting and Provenance</th>
        <td>The instance resolves and renders; shared helpers handle placement, reconciliation, licensing, and the provenance record.</td>
        <td><a href="https://jmchilton.github.io/foundry-lib/#/architecture/cast"><code>cast</code> architecture</a></td>
      </tr>
    </tbody>
  </table>
</div>

The domain's external check remains instance-owned. Part 7 asks what can produce an independent
verdict without pretending Astro or a shared package can answer that domain question.

## Keep the handoffs explicit

- **Package integration:** use the
  [`foundry-lib` Getting Started guide](https://jmchilton.github.io/foundry-lib/#/getting-started)
  for current prerequisites, installation, package APIs, and focused adoption guides.
- **Stack vocabulary:** `note`, `kind`, `shape`, `companion`, and `collection` belong to this
  implementation and are pinned in the [[astro-stack-glossary]], not the pattern [[glossary]].
- **Running evidence:** compare the [[galaxy-workflow-foundry]], the
  [[statistical-genomics-foundry]], and [[the-diff]] rather than copying inventory claims into
  this guide.

## How to use the checklist below

The checklist is rendered **verbatim** because it is a repository composition recipe: named paths,
commands, and checkpoints precise enough to follow by hand or hand to an agent. Work it top to
bottom and expect to loop back. When it names package behavior, the linked `foundry-lib`
architecture and package documentation are canonical. Versions live in one `REFERENCE STACK`
table and move as a set; the closing `INSTALLED` / `MECHANICAL` / `YOURS` grading keeps shared
machinery distinct from instance policy and domain knowledge.
