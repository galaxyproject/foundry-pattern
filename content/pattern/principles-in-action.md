---
title: Principles in Action
description: The original two-instance implementation case study, now read alongside the third Foundry hardening and backporting the shared substrate.
section: pattern
order: 4
---

# Principles in Action

[[guiding-principles|Guiding Principles]] states the commitments without tying them to a domain. This page shows what those commitments make two Foundries do: which rules they enforce, which artifacts they keep, and which machinery they have deliberately not built.

The comparison is intentionally uneven. The [[galaxy-workflow-foundry]] has a working cast layer and runtime validation path. The [[statistical-genomics-foundry]] has a substantial typed corpus and authored Molds, but no caster or cast artifacts yet. **Implemented** means the behavior is observable in the repository today; **partial** means a real source-side mechanism exists but a later layer is deferred; **designed** means the contract exists without an implementation. Inheritance alone never counts as implementation.
This page preserves the original N=2 case study rather than retrofitting a third column into old evidence. The [[topological-data-analysis-bioinformatics-foundry|TDA Bioinformatics Foundry]] is now the active rigorous reference build; use its profile and the generated [[kind-catalog]] and [[tag-catalog]] for the current three-instance picture and for the direction of backports into Statistical Genomics.

The comparison is intentionally uneven. The [[galaxy-workflow-foundry]] has a working cast layer and runtime validation path. The [[statistical-genomics-foundry]] has a substantial typed corpus and authored Molds, but no caster or cast artifacts yet. **Implemented** means the behavior is observable in the repository today; **partial** means a real source-side mechanism exists but a later layer is deferred; **designed** means the contract exists without an implementation. Inheritance alone never counts as implementation.

<figure class="not-prose principles-action-matrix" aria-labelledby="principles-action-caption" data-pagefind-ignore>
  <div class="principles-action-scroll">
    <table>
      <thead>
        <tr>
          <th scope="col">Principle</th>
          <th scope="col">Galaxy Workflow Foundry</th>
          <th scope="col">Statistical Genomics Foundry</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Upstream authority</th>
          <td><span>Implemented</span>Citations, derivatives, snapshots, and caches have distinct roles.</td>
          <td><span>Implemented</span>Source notes declare identity, license, attribution, and transformation posture.</td>
        </tr>
        <tr>
          <th scope="row">Licensing</th>
          <td><span>Implemented</span>Shared policy drives source validation, casting, and provenance.</td>
          <td><span>Partial</span>Source validation is live; cast-time enforcement awaits a caster.</td>
        </tr>
        <tr>
          <th scope="row">Corpus first</th>
          <td><span>Implemented</span><a href="https://github.com/galaxyproject/iwc">IWC exemplars</a> ground patterns, Molds, and verification work.</td>
          <td><span>Implemented</span>Good methods and cautionary counterexamples ground referee Molds.</td>
        </tr>
        <tr>
          <th scope="row">Reproducibility</th>
          <td><span>Implemented</span>Cast provenance and drift checks expose every packaged dependency.</td>
          <td><span>Partial</span>Source recovery is reproducible; cast provenance remains designed.</td>
        </tr>
        <tr>
          <th scope="row">Deterministic tools</th>
          <td><span>Implemented</span>Build, cast, and workflow checks fail mechanically.</td>
          <td><span>Partial</span>Corpus checks run; empirical runtime gates are authored but not cast.</td>
        </tr>
        <tr>
          <th scope="row">Actionable knowledge</th>
          <td><span>Implemented</span>Molds compile into skills with explicit artifact contracts.</td>
          <td><span>Partial</span>Referee Molds exist as source; no runtime bundles exist yet.</td>
        </tr>
        <tr>
          <th scope="row">Self-documentation</th>
          <td><span>Implemented</span>Glossary, design records, kind docs, and catalogs map the system.</td>
          <td><span>Implemented</span>The same map records both working and deferred machinery.</td>
        </tr>
        <tr>
          <th scope="row">Progressive disclosure</th>
          <td><span>Implemented</span>Reference load policy survives into generated skills.</td>
          <td><span>Partial</span>Load policy is typed in source; no cast exercises it yet.</td>
        </tr>
        <tr>
          <th scope="row">Portability</th>
          <td><span>Implemented</span>One portable skill tree is exposed through thin runtime manifests.</td>
          <td><span>Designed</span>Source and casting contract are runtime-neutral; artifacts are deferred.</td>
        </tr>
      </tbody>
    </table>
  </div>
  <figcaption id="principles-action-caption">
    The shared commitment is the principle. Its implementation point—and an honest deferred boundary—belongs to the instance.
  </figcaption>
</figure>

## Keep knowledge grounded

### Upstream Authority, Local Synthesis

**Galaxy — implemented.** The repository distinguishes four source relationships. Citations point to [IWC workflows](https://github.com/galaxyproject/iwc) without mirroring them. Authored CLI pages retain their upstream URL while adding local operational guidance. Vendored schemas and specifications are pinned in `vendored_upstreams.yml`. Survey corpora live in gitignored working caches, outside the knowledge base and its casts.

**Statistical genomics — implemented.** Paper, tutorial, and book notes are substantial local syntheses, but their metadata records the source, access, license, attribution, and whether the note paraphrases or quotes. Multi-chapter books add manifests and checksums; raw source material remains staging input rather than committed knowledge.

**What the contrast shows.** Local bytes are not the failure. Ambiguous authority is. Each artifact needs an explicit relationship to its source and a lifecycle that matches that relationship.

### Redistributed Content Carries Its License

**Galaxy — implemented.** The repository installs the shared `@galaxy-foundry/license-policy` decision table instead of maintaining a local mirror. Its own schema checks local license coherence; casting then rejects disallowed placement modes and records the license lineage of redistributed references in provenance.

**Statistical genomics — partial.** It installs the same policy and applies it during source authoring and validation. License identifiers are typed, required notices and license texts accompany reusable quotations, and own-words-only sources must remain authored derivatives. With no caster, there is no cast-time refusal or cast provenance yet.

**What the contrast shows.** A shared package answers what a license permits. Each instance still owns the rules that connect that policy to its content and to every output layer it actually implements.

### Corpus-First, Not Invention-First

**Galaxy — implemented.** IWC workflows ground conversion patterns and Molds. References carry an evidence posture; hypotheses require a verification plan, and schemas are expected to reach cast-validated status. Generated workflow skeletons make broad inspection cheap before maintainers read selected exemplars deeply.

**Statistical genomics — implemented.** Its corpus is deliberately bipolar: established methods supply positive evidence, while invalidity patterns such as double-dipping and confounding supply counterexamples a referee must recognize. Molds now draw on that corpus; the taxonomy grows from the work rather than preceding it.

**What the contrast shows.** Corpus-first does not prescribe one corpus shape. It requires abstractions and checks to be earned from the evidence the domain needs—including negative evidence when recognizing failure is part of the job.

## Make knowledge trustworthy and actionable

### Reproducibility At Every Layer

**Galaxy — implemented.** Every cast carries `_provenance.json`: Mold identity, commit and content hash, target, resolved references, hashes, licenses, and artifact contracts. Its [casting record](https://github.com/galaxyproject/foundry/blob/main/content/meta/casting.md) defines stable ordering and deterministic regeneration so CI can report drift instead of asking a reviewer to infer it from generated text.

**Statistical genomics — partial.** The source pipeline is recoverable today: source identities, access records, book manifests and checksums, generated frontmatter, typed validation, and blind-regeneration gaps are inspectable. Its [build record](https://github.com/jmchilton/statistical-genomics-foundry/blob/main/content/meta/build-and-validation.md) describes what runs, while its [casting record](https://github.com/jmchilton/statistical-genomics-foundry/blob/main/content/meta/casting.md) defines provenance for a layer it accurately labels unimplemented.

**What the contrast shows.** Reproducibility is not a single file format. It is the ability to recover how each existing derivative was produced without claiming lineage for a derivative that does not yet exist.

### Deterministic Tools Do Deterministic Work

**Galaxy — implemented.** Typed schemas, cross-file resolution, hashing, copying, cast rendering, and drift detection are mechanical. At runtime, `gxwf` parses and validates workflow structure inside the author–validate–fix loop; the Foundry does not replace those checks with a prose catalog of possible mistakes.

**Statistical genomics — partial.** Deterministic tests already validate the corpus, kinds, references, licenses, generated book metadata, and reading site. For method validity, authored referee Molds require external empirical evidence—permutation, simulation, calibration, or negative controls. Those procedures become runtime gates only after casting exists.

**What the contrast shows.** “Deterministic” describes the instrument, not every question a Foundry asks. Mechanical questions get pass/fail tools; judgment-heavy questions must still end in evidence outside the reasoning that produced the answer.

### Actionable Knowledge, Not Passive Notes

**Galaxy — implemented.** A Mold declares one action, its references, and the artifacts it consumes and produces. Validation checks that artifact producers and schemas agree. Deterministic casting packages that dependency surface into an executable skill while keeping evals and maintainer notes out of the runtime bundle.

**Statistical genomics — partial.** Its Molds already turn corpus knowledge into procedures for doing analyses and auditing their validity. The flagship `audit-method-validity` and more specific referee Molds now exist as typed source with scenarios and evals. They are inspectable instructions, but they are not yet generated runtime skills.

**What the contrast shows.** Structured source can become actionable before delivery is finished, but the page should distinguish an authored procedure from a packaged artifact an agent can invoke.

## Make knowledge legible and durable

### The Knowledge Base Documents Itself

**Both — implemented.** Each repository keeps an authoritative glossary under `content/meta/`, typed design records with explicit ownership boundaries, documentation and examples beside its knowledge kinds, and generated catalogs for inventories. These records pass through the same validation and reading machinery as domain content. [[design-records]] describes the shared directory contract and expected records.

The second instance makes the benefit especially visible: its build record says exactly what runs today, while its casting record opens by saying no caster exists. Self-documentation is not self-promotion; it gives a maintainer enough of a map to tell architecture from aspiration.

### Progressive Disclosure Over Context Flooding

**Galaxy — implemented.** References declare when they are used, whether they load up front or on demand, and the trigger for deferred loading. Casting preserves those decisions in the generated skill, separating essential instructions from supporting schemas, manuals, patterns, and research.

**Statistical genomics — partial.** The source contract already narrows and validates the same load vocabulary, with research notes carrying most of the depth behind on-demand triggers. Because there are no casts, the runtime disclosure behavior remains unexercised.

**What the contrast shows.** Progressive disclosure begins as a property of source references, but it becomes real only when a reader or runtime can follow that policy.

### Portable Artifacts Over Platform Fashion

**Galaxy — implemented.** Molds and references remain runtime-neutral. A deterministic target adapter produces one portable Agent Skills tree; thin Claude and Codex plugin manifests expose that same tree without duplicating the skills. Adding another artifact shape would require a target adapter, not a rewrite of the knowledge base.

**Statistical genomics — designed.** Its Molds, references, and casting contract avoid runtime-specific vocabulary, but it has no `casts/` tree or target adapter. Portability is therefore an architectural constraint on its source, not yet a demonstrated output property.

**What the contrast shows.** Portability does not require many targets. It requires a clean boundary: target language enters during deterministic casting, and until that boundary runs, portability remains a testable promise rather than a shipped feature.

## What the Comparison Establishes

The instances do not need identical machinery to share the pattern. They need the same accountability: grounded sources, explicit transformation, enforceable contracts, honest status, and evidence outside self-certification. Galaxy demonstrates the full source-to-cast path. Statistical Genomics demonstrates that the same substrate can organize a different corpus and a different kind of external check—even while its cast layer remains visibly unfinished.

That difference is evidence, not an embarrassment. The pattern is strongest where it lets a reader distinguish what was inherited, what the domain changed, what is working, and what is still only designed.

## See Also

- [[guiding-principles]] — the same principles, stated domain-free.
- [[the-diff]] — the original two instances held side by side, then tested by the third.
- [[anatomy-of-an-instance]] — the boundary between shared structure and domain machinery.
- [[the-model]] — the parts these decisions configure.
