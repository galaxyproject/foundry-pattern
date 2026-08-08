---
title: What a Foundry Needs
description: The substrate a Foundry inherits and the extension surface each domain must fill — the pattern is a base to extend, not a template to stamp.
section: pattern
order: 6
---

# What a Foundry Needs

A Foundry is an inspectable, human-readable knowledge base of deep domain knowledge whose *structure* makes it executable: the knowledge is decomposed into typed units that compile into frozen artifacts carrying provenance. That sentence names the part that is the *same* in every instance. This page separates that shared substrate — the invariants — from the decisions each instance must make for its domain — the extension surface. The thing to take away is not a checklist of identical slots but a posture: **the pattern is a substrate you extend, not a template you stamp.**

Where [[the-diff]] first earned the abstraction comparatively (hold the original two instances side by side, then pressure the result with the third), this page earns it descriptively: walk the anatomy once, and mark each part shared or domain-added. For the underlying model and term definitions, see [[the-model]] and the [[glossary]].

## At a glance

| Pattern term or principle | Your domain decides | Evidence it is working |
|---|---|---|
| Knowledge Base (KB) | Knowledge organization and vocabulary | A navigable site, authoritative glossary, focused design records, kind documentation, and generated catalogs |
| Corpus-First, Not Invention-First | Corpus and derivative policy | Citations, licenses, source identities, hashes, and sync checks appropriate to what is carried locally |
| Mold (typed actions) | Action boundaries and reference kinds | Schemas validate and every typed reference resolves |
| Casting | Target formats and placement rules | The same source, Mold, and target reproduce the same artifact bytes |
| Provenance | Provenance representation | Drift can be detected and a packaged claim can be traced to its source |

## The invariants — the substrate

These are the same in every instance. Remove any one and the thing stops being a Foundry — so each is stated with what breaks without it.

**The knowledge base / reader's surface.** The source of truth is authored to be *read and learned by a human*, not merely stored for an agent to retrieve. It renders as a navigable site with links, backlinks, and progressive disclosure. It also documents its own vocabulary, architecture, and content contracts through an authoritative glossary, focused design records, documentation and examples beside each knowledge kind, and generated catalogs where hand-maintained inventories would drift. Without that reader-facing map, the knowledge is only ever machine feed — you lose the human's ability to scrutinize, correct, and trust the source, and the project collapses into the very skills-as-source pattern the Foundry exists to invert.

**The Mold (typed reference manifest).** The unit of the KB is an abstract action description whose frontmatter *declares* the references it depends on — other KB pages, schemas, CLI manual pages, prompts, examples — by type. The Mold is a source artifact, independent of any runtime. Without typed structure, "make the KB executable" has nothing to grab: a prose page can be read but not compiled, resolved, or drift-checked. The types are what let the compiler dispatch.

**The Cast (deterministic compilation).** Casting turns a Mold into a target-specific skill artifact by resolving typed references, selecting the declared material, placing it according to kind and target, and rendering the result. Casting is the **integration boundary**: artifacts come out scoped, isolated, and frozen, with no links back to the KB. Because the compile step is deterministic, a cast can be reproduced, diffed, and checked byte for byte.

**Provenance.** Every cast emits a record beside it: which Mold revision, which target, which references resolved, their hashes and placement, and which checks ran. Without provenance you cannot trace a packaged claim to its source or detect drift between source and artifact. This is the one durable, non-commodity asset the package carries no matter the domain (developed in [[the-two-assets]]).

**Corpus-grounding.** Abstractions trace back to real exemplars in an authoritative corpus. A Foundry keeps that authority honest by choosing deliberately among a citation, an authored derivative, a pinned snapshot, and a working cache, and by recording the source, transformation, license, and refresh posture each choice requires. Without grounding, the KB is invented top-down — restated canonical knowledge with no anchor, exactly the commodity a frontier model already regenerates on demand.

**Progressive disclosure.** Molds disclose the action; typed references disclose the dependency surface; load policy distinguishes up-front material from on-demand. Where an instance composes ordered journeys, those disclose the journey too. Without it the reader's surface drowns and the runtime over-loads context; disclosure is what keeps both the human and the agent oriented.

## The extension surface — what each domain adds

Here is where instances differ, and the difference is the point: applying the pattern means bringing real domain knowledge and extending the substrate with what the domain needs. Some decisions here — the knowledge, grounding corpus, target formats, and how trusted work is evaluated — exist in every instance but take domain-specific forms. Others, such as composition, are optional. The substrate defines the boundaries; it cannot supply the domain's answers.

**The domain knowledge itself.** *What* the Foundry actually knows — the patterns, methods, references, and hard-won procedure of one field. This is the real work and the real asset; the substrate exists to carry it, not the other way around. One instance curates workflow-construction knowledge; another, statistical-method validity; the third connects topological data analysis research to reproducible bioinformatics delivery.

**The grounding corpus.** *Which* external corpus anchors the knowledge — a curated workflow set in one instance, established-methods literature plus cautionary negative examples in another, and TDA papers, packages, environments, recipes, and replication evidence in the third. The grounding *discipline* is invariant; the corpus is the extension.

**The target format(s).** *What* a cast produces — one runtime's skill format, a generic bundle, a web payload. The KB stays the source of truth; the target is one output, and an instance may have several. The integration boundary is invariant; which side(s) it compiles toward is the extension.

**Composition / orchestration.** Where a domain's work is an inherently multi-step journey, an instance composes Molds into ordered end-to-end tasks and may orchestrate them with a harness. The [[galaxy-workflow-foundry]] builds **pipelines** for exactly this — workflow construction is sequential by nature. A domain whose actions stand alone may need no such layer at all. Composition is an extension, not a universal requirement.

**The domain's external check.** The requirement is shared: work should not count as trusted solely because the same process that produced it says it is correct. The realization is domain-specific: each Foundry decides what an independent verdict can mean and what can produce one (see [[guiding-principles]]). The first two instances sit at opposite ends:

- In the [[galaxy-workflow-foundry]], correctness is *parseable*, so the check is a **deterministic CLI validator** ("the rails"): `gxwf` parses and validates the workflow format and tool steps; hallucinated identifiers, dropped revisions, and bad state are caught mechanically, the same way every time. Fast and total over what it covers — but it only covers what a parser can decide.

- In the [[statistical-genomics-foundry]], "is this method valid?" has no mechanical oracle, so the check is itself *authored knowledge cast into a skill* — an empirical **referee** running an `analyze → referee → revise` loop, which both reasons about known invalidity patterns and *constructs and runs* the empirical test the field trusts. There the check is a deliverable you produce, not a tool you call.

These are not two settings of one universal knob. They are two domains solving "what does *correct* even mean here, and what can decide it?" their own way. The [[topological-data-analysis-bioinformatics-foundry|TDA Foundry]] is still deriving that scientific verdict; reproducible environments and evidence-bearing replication are its current teeth. That incompleteness is stated rather than disguising extensive build validation as domain correctness.

## How to read this

If you are building another Foundry, you do not start from a blank page: the pattern supplies the boundaries for KB-as-source, typed Molds, deterministic casting, provenance, grounding, and disclosure, with reusable packages where implementations have converged. You still have to assemble and verify that substrate in your repository. The work it cannot do for you is to **bring genuine, deep domain knowledge and make the decisions your domain requires** — the corpus that grounds it, the targets that carry it, the composition its journeys need, and the external check its notion of "correct" admits. The pattern reduces reinvention; it does not remove implementation or domain work. See [[guiding-principles]] for the commitments that hold across every extension.
