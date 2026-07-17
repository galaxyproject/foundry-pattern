---
title: Comparisons
description: Where the Foundry Pattern sits relative to adjacent approaches — stable positioning (Part A) plus a dated, periodically-refreshed landscape snapshot of specific systems (Part B) on the runtime-vs-compile-time axis.
section: case
order: 5
---

# Comparisons

Where the Foundry Pattern sits relative to adjacent approaches. Every system
here is good at what it does; the goal is to *locate* the pattern, not diminish
anyone. We claim distinctness only on axes we can defend.

This page comes in two parts, with **deliberately different decay rates** — the
same separate-decay-rates discipline a Mold's sibling files use, where a stable
`index.md` holds and an append-only `refinements/` journal accretes:

- **Part A — Positioning.** Contrasts the pattern against *kinds* of approach
  that do not move when an external project ships a new release. Stable.
- **Part B — Landscape snapshot.** Where the field is on connecting knowledge
  bases to agent skills, by *specific* system. Volatile and explicitly dated:
  this domain moves fast, so Part B is a point-in-time reading, **refreshed on
  demand as a dated sweep, not continuously edited.** It ages on purpose — an
  undated "state of the art" claim rots silently; a dated one just gets old
  visibly, which is honest.

The recurring axis across all of these is *when* the knowledge base meets the
skill: **runtime** (the agent fetches or retrieves when it decides it needs to)
versus **compile time** (a deterministic step bakes selected KB slices into the
artifact, with provenance). The Foundry Pattern is a
compile-time-with-provenance design; most deployed approaches are runtime. Keep
that axis in mind throughout.

---

## Part A — Positioning

### Versus "just put it in a wiki"

A wiki preserves context and supports human browsing — genuinely valuable, and
the human-readable surface is something the Foundry Pattern shares rather than
rejects. What a wiki does not do: produce executable artifacts, validate
cross-references mechanically, record provenance when content is consumed, or
enforce a separation between durable knowledge and runtime instruction. A wiki
page that grows a runtime-instruction section eventually contradicts another
section that grew elsewhere, with no compiler to surface the contradiction. The
KB is wiki-like in its readability; the casting step is what a wiki lacks.

### Versus "just write agent skills"

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

### Versus documentation auto-generated from code

Auto-generated docs (`--help` dumps, schema-to-Markdown renderers) preserve
fidelity at the cost of context. They tell you what a function does, not *when*
to reach for it or *why* to combine it with another. This is real and useful
output — and the Foundry Pattern consumes it directly: a generated schema or CLI
page is cast verbatim into a sidecar. The difference is the hand-framed wrapper
around that generated metadata. The framing — when, why, alongside what — is
where the operational judgment lives, and it is exactly the part no generator
emits.

### Versus prior monolithic skills (the prior art)

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

## Part B — Landscape snapshot

> **Last reviewed: 2026-05.** Point-in-time snapshot. Refreshed on demand as a
> dated sweep, not continuously edited. Every entry cites a dated primary
> source. Preprint citations were resolved against arXiv at review time
> (2026-05); confirm again before external or grant use, since preprints can be
> revised or withdrawn. When this drifts far enough, run a fresh sweep and log
> it below rather than silently rewriting entries in place.

This part examines a single axis by specific system: where a knowledge base
meets a skill — at **runtime** versus **compile time** (defined above). The
Foundry Pattern bets on compile-time-with-provenance; most deployed systems use
runtime.

### Model Context Protocol (MCP) — resources + tools

- **What it is:** an open protocol exposing `tools`, `prompts`, and `resources`
  (file-like grounding data) to agents — [Anthropic announcement, Nov 2024](https://www.anthropic.com/news/model-context-protocol), [architecture docs](https://modelcontextprotocol.io/docs/learn/architecture) (as of 2026-05).
- **Shares:** explicitly surfaces KB context as typed primitives rather than
  opaque embeddings; portability ambition across runtimes.
- **Diverges:** runtime. The agent requests a resource when it decides it needs
  one. No compile-time check that skill behavior matches current KB state, no
  provenance linking an instruction to the KB entry that grounds it, no
  guarantee the resource is present at invocation.

### Anthropic Agent Skills

- **What it is:** the `SKILL.md` + progressive-disclosure skill format (name/
  description → full `SKILL.md` → on-demand support files) — [Anthropic Engineering](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) (as of 2026-05).
- **Shares:** progressive disclosure mirrors the pattern's `load: upfront|on-demand`
  reference policy and the `casts/` tree structure; context cost scales with
  task relevance, not KB size.
- **Diverges:** Agent Skills treats `SKILL.md` as the *authoring* surface. The
  Foundry Pattern treats it as a *compile target* with `_provenance.json` back
  to the Mold revision, references, prompt, and model. A Foundry casts *into*
  this format as one target, not as its source of truth. (This is the precise
  inversion the flagship essay [[skills-package-not-source]] is about.)

### llms.txt

- **What it is:** a curated, human- and LLM-readable Markdown index at a site
  root, linking essential vs optional pages — [llmstxt.org](https://llmstxt.org/) (proposed Sept 2024; adoption real but uneven as of 2026-05).
- **Shares:** linking over embedding; Markdown readable by both audiences;
  optional progressive-disclosure sections, dual-audience by design.
- **Diverges:** an index *into* a documentation site, not a compiled executable
  artifact. No provenance, no validation, no per-kind transformation; operates
  at site level, not skill level.

### Corpus2Skill — "Don't Retrieve, Navigate"

- **What it is:** compiles a document corpus offline into a hierarchical
  navigable skill tree (clustering + per-level LLM summaries); the agent
  navigates it at serve time instead of using flat vector retrieval — [Sun, Wei & Hsieh, "Don't Retrieve, Navigate," arXiv 2604.14572](https://arxiv.org/abs/2604.14572) (submitted Apr 2026; confirmed against arXiv 2026-05).
- **Shares:** the closest existing analog. Compile-KB-to-skill, explicit corpus
  visibility, navigate-not-retrieve — structurally the same as the pattern's
  `references/` tree plus on-demand triggers.
- **Diverges:** auto-compiles from raw text via clustering/summarization. A
  Foundry compiles *curated, human-authored, schema-typed* knowledge with
  explicit per-kind dispatch and provenance — authority and traceability the
  automatic pipeline does not carry.

### Pinecone Nexus

- **What it is:** a managed knowledge-compilation layer on Pinecone's vector
  DB — a "Context Compiler" pre-builds task-specific, versioned,
  citation-bearing artifacts from enterprise data, served at runtime via the
  KnowQL query language (whose primitives include `provenance`) — [Pinecone, "Knowledge Infrastructure for Agents," 4 May 2026](https://www.pinecone.io/blog/knowledge-infrastructure-for-agents/) (early access only as of 2026-05; vendor benchmark claims not independently verified).
- **Shares:** the same core bet, from a major vendor — push reasoning upstream
  from runtime retrieval to a deterministic compile step that bakes selected KB
  slices into reusable, versioned, source-traceable artifacts. The clearest
  commercial validation to date of compile-time-with-provenance over runtime RAG.
- **Diverges:** the compiled artifacts live in a proprietary, platform-bound
  vector substrate the agent still queries at runtime through KnowQL, and they
  are auto-derived from raw enterprise data. A Foundry casts curated,
  human-authored, schema-typed knowledge into portable target-native artifacts
  with file-level provenance, no platform lock-in, and no vector index in the
  path.

### OpenAPI / schema → tool generators

- **What it is:** deterministic generation of typed tool definitions (or
  `SKILL.md`) from a machine-readable spec — [Google ADK OpenAPI tools](https://google.github.io/adk-docs/tools-custom/openapi-tools/), [openapi-to-skills](https://github.com/neutree-ai/openapi-to-skills) (as of 2026-05).
- **Shares:** genuine compile-time KB→skill — deterministic, versioned,
  traceable to a source schema. The same shape as a Foundry casting a `schema`
  reference to a verbatim sidecar.
- **Diverges:** scope. Works only where the KB *is* a machine-readable schema.
  No story for prose patterns, exemplars, or design rationale — which is most of
  a Foundry's content and exactly why a casting pipeline (not a schema parser)
  is needed.

### Voyager-style accreted skill libraries

- **What it is:** an agent writes, verifies-by-execution, and stores reusable
  programs as a growing skill library — [Voyager, Wang et al. 2023, arXiv 2305.16291](https://arxiv.org/abs/2305.16291), [project page](https://voyager.minedojo.org/) (as of 2026-05).
- **Shares:** a growing library of reusable, composable skills.
- **Diverges:** reverse direction — the skill library *is* the KB,
  agent-generated from environmental experience. Provenance is "it executed
  successfully," not a citation, schema, or human review. A Foundry's KB is
  authoritative and human-curated; execution success is not epistemic
  provenance.

### RAG-as-knowledge-base

- **What it is:** the skill delegates grounding to runtime retrieval over a
  vector-indexed KB — first-party products from [Azure](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview), [AWS](https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-serverless/grounding-and-rag.html), [Google Cloud](https://cloud.google.com/use-cases/retrieval-augmented-generation); failure analysis in ["Seven Failure Points," arXiv 2401.05856](https://arxiv.org/abs/2401.05856) (2024, as of 2026-05).
- **Shares:** a knowledge base grounding agent behavior; the most widely
  deployed bridge between systems and grounding.
- **Diverges:** runtime, and the agent gets no corpus overview — it cannot
  reason about what it has not retrieved. A retrieval miss is a silent
  correctness failure; behavioral instructions above the retrieval layer have no
  traceable source. A Foundry uses compile-time grounding; runtime fetch
  (comparing a cast artifact against a live external exemplar, say) augments,
  never replaces, the compiled grounding.

### Custom GPTs / GPT Actions

- **What it is:** an assistant bundling knowledge files (runtime retrieval) plus
  OpenAPI-defined Actions — [OpenAI Help Center: Creating and editing GPTs](https://help.openai.com/en/articles/8554397-creating-and-editing-gpts) (as of 2026-05).
- **Shares:** packages knowledge and capability behind one surface; GPT Actions
  is the OpenAPI-compile pattern again.
- **Diverges:** knowledge files are runtime-vectorized RAG — the author cannot
  control what is retrieved; platform-bound, not portable; no provenance. A
  Foundry's casts are compiled, target-portable, and provenanced.

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

---

## Refresh log

Append-only. One line per dated sweep of Part B — the same convention a Mold's
`refinements/<date>-<slug>.md` journal uses. To refresh, run a sweep, update the
entries above, and add a line here; do not edit prior log lines.

- 2026-05 — Initial Part B from a KB→skills landscape survey (8 entries).
  Corpus2Skill (arXiv 2604.14572) confirmed against arXiv; Custom GPTs citation
  set to the OpenAI Help Center primary.
- 2026-05 — Sweep: added Pinecone Nexus (first commercial compile-time entry;
  early access, vendor benchmarks unverified). Assessed and rejected — genio.co
  (off-topic EdTech, no KB→skill stance) and Glean (enterprise knowledge-graph +
  runtime retrieval; subsumed by RAG-as-knowledge-base).
