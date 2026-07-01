---
title: "FAIR Skills: What Research Data Already Learned About Provenance"
description: The FAIR principles were a response to a traceability crisis in research data. AI skills are walking into the same one — worse, because they feed the training corpus. A skill-as-source is un-FAIR by construction; a Foundry makes FAIRness fall out of the architecture.
section: blog
date: 2026-07-01
order: 2
---

# FAIR Skills: What Research Data Already Learned About Provenance

*Lab notebook — July 2026*

## TL;DR

The [FAIR principles](https://www.go-fair.org/fair-principles/) — Findable, Accessible, Interoperable, Reusable — were written in 2016 for a crisis the research-data community had already lived through: results you could read but not trace, reuse, or check. AI skills are walking into that same crisis one decade later, and with a nastier twist: unverified, model-generated skills are becoming *training data*, so the errors ride back into the next model with no receipt. A hand-authored `SKILL.md` fails FAIR the way a spreadsheet with no metadata fails FAIR — not because it is low quality, but because the qualities FAIR asks for were never *in* the artifact. This post argues that a [[the-model|Foundry]] doesn't bolt FAIR metadata onto a skill after the fact. It makes FAIRness fall out of the architecture, because the source of record is FAIR and the receipt persists beside the cast artifact. The two most load-bearing pieces — provenance and an enforced check — line up with **the two FAIR reusability sub-principles beyond licensing (R1.2 and R1.3)**, arrived at independently: provenance *is* R1.2 near-verbatim, and the enforced check is the machinery that makes R1.3 — meeting community standards — enforceable rather than aspirational. That is not a coincidence worth waving away; it is the same problem being solved twice.

## Why FAIR, and why now

FAIR is not a quality standard. It does not ask whether your data is *good*; it asks whether your data is *legible to the people and machines that will reuse it* — findable by a persistent identifier, accessible through an open protocol, interoperable through a shared representation, reusable because it is richly described and carries its provenance. The animating word in the original Wilkinson et al. paper is **machine-actionability**: the point was never prettier data catalogues, it was data a machine could act on *and* a human could trust, without a human in the loop re-deriving where every number came from.

That is exactly the bar an AI skill now has to clear. A skill is a machine-actionable artifact — an agent loads it and acts. It is increasingly a *scientific* artifact too: it encodes canonical procedure, default parameters, citations, the caveats a method requires. And per [[2026-06-blind-regeneration|the blind-regeneration result]], it is increasingly absorbed back into the record and into training corpora as if refereed. So the FAIR question is not a cute analogy. It is the literal question: **when your skill outlives the session that made it — read by another agent, cited by a human, ingested by the next model — is it Findable, Accessible, Interoperable, and Reusable?** For a skill authored *as* its own source of record, the answer is no on every axis, and the reasons are structural.

## The inversion is the FAIR move

Here is the thing FAIR understood that skills-as-source forgets: **data and metadata are different things, and the metadata has to survive on its own.** Half of FAIR is about metadata as a first-class, separately-persisted object — F2, F3, A2, and all of Reusability are metadata claims. FAIR's deepest structural demand is: *do not collapse the artifact and the record of the artifact into one opaque blob.*

That collapse is precisely what happens when [[skills-package-not-source|the skill is the source]]. `SKILL.md` is, for most projects, two things at once — the thing a model loads and the thing a human edits, the package *and* the record. There is no separable metadata: the provenance, the references, the rationale, the map of what is grounded versus guessed are either baked into the prose indistinguishably or absent entirely. A correct default parameter and an invented one render in identical fluent prose. You are holding data with its metadata dissolved into it — the anti-FAIR artifact by construction.

The Foundry's one inversion — [[story|make the knowledge base the source, cast the skill as a package]] — is, structurally, the FAIR metadata-first move. The [[the-model|Knowledge Base]] is the richly-described, human-legible, machine-actionable record. The [[glossary|Mold]] is a typed reference manifest. The cast skill is the frozen package. And `_provenance.json` is the metadata that persists *beside* and *independent of* the package. The Foundry doesn't make skills FAIR by adding a metadata sidecar as an afterthought; it refuses from the start to let the artifact be the only thing. Everything below is that one move, read through FAIR's four lenses. I'll lead with the strong links and be honest about the weak ones — the point is a principled case, not a checklist with every box ticked.

## Findable

> **F1** — (Meta)data are assigned a globally unique and persistent identifier.
> **F2** — Data are described with rich metadata.
> **F3** — Metadata clearly and explicitly include the identifier of the data they describe.
> **F4** — (Meta)data are registered or indexed in a searchable resource.

Try to *cite* a claim inside a hand-authored skill. You can't. There is no identifier for "the line that says pin the revision" — no way to point at it, version it, or reference it from anywhere else. The artifact is a flat wall of prose with no addressable interior. That is an F1 failure at the level of the claim.

A Foundry gives every unit an identity. A Mold has an `id` and a `revision`; every cast is stamped with a **content hash** (`sha256:…`) of the Mold and each resolved reference it was built from. Content-hash addressing is a persistent identifier in the same family as a DOI or a git commit — it names a *specific frozen state* of a specific claim, and it stays valid after the artifact is superseded (**F1**). The provenance record is metadata that **explicitly names the identifier of the thing it describes** — `"mold": { "id": "summarize-source", "revision": 4, "content_hash": "sha256:9f1c…" }` — which is F3 almost verbatim: metadata that carries the identifier of its data.

(FAIR writes "(meta)data" precisely because the distinction is recursive: metadata is itself data with its own metadata. So a Mold can be the *data* a provenance record identifies in one breath and the *metadata* describing a cast skill in the next — the same object, two roles, both licensed by the notation.)

Rich metadata (**F2**) is not something a Foundry adds; it is what a Mold *is*. Typed frontmatter, controlled tags, and a manifest of typed references describe each action before a single word of the skill body is condensed. The skill, by contrast, is undifferentiated text — the F2-poor end of the spectrum. And because the KB is an inspectable, wiki-linked, rendered-and-indexed site rather than a `SKILL.md` dropped in a folder, the source is a **searchable resource** (**F4**) in a way a loose skill file simply is not.

## Accessible

> **A1** — (Meta)data are retrievable by their identifier using a standardised communications protocol. (**A1.1** open/free/universal; **A1.2** supports auth where needed.)
> **A2** — Metadata are accessible, even when the data are no longer available.

Two honest halves here. On **A1/A1.1**, the Foundry's contribution is real but modest, and it is the [[guiding-principles|Portable Artifacts Over Platform Fashion]] principle wearing a FAIR hat: plain files, markdown, JSON, git, sha256 — open, free, universally-implementable formats with no proprietary runtime lock-in. A Mold does not bind its knowledge to one agent vendor's skill schema, so retrieval never routes through a closed protocol. That is genuinely A1.1-shaped. I won't oversell it: FAIR's A1 is largely about repository plumbing (resolvable identifiers, content negotiation) that the pattern doesn't specify, and a Foundry inherits whatever its host offers. Fine — the pattern makes A1 *achievable* by keeping everything in open formats; it doesn't hand you a data repository.

**A2 is the gem**, and it is the one most people miss on first read. "Metadata are accessible even when the data are no longer available" sounds like a fussy archival edge case — until you notice it *is the Foundry's entire theory of the skill's lifecycle.* A cast artifact is [[the-model|frozen, isolated, and link-free]] on purpose. It is *meant* to be superseded, recast, thrown away — it is a build output, the binary, not the code. When it goes stale or gets deleted, what survives? The KB source it was cast from, and the provenance that records *what it was cast from*. The lineage outlives the artifact by design. A2 asks for exactly the property the Foundry's source/package split guarantees: the record persists after the packaged thing is gone. Skills-as-source has the opposite property — when you overwrite the `SKILL.md`, the only record there ever was is gone with it.

## Interoperable

> **I1** — (Meta)data use a formal, accessible, shared, and broadly applicable language for knowledge representation.
> **I2** — (Meta)data use vocabularies that follow FAIR principles.
> **I3** — (Meta)data include qualified references to other (meta)data.

**I3 is the marquee link of the whole essay, and it is nearly a definition.** Read it again: *metadata include qualified references to other metadata.* Now read the Foundry's definition of its core unit: a Mold is a **typed reference manifest** — a declaration of qualified references to other KB pages, schemas, CLI manual pages, prompts, and examples. Not bare links: every reference carries a **kind** (which resolver applies), a **load policy** (`upfront` vs `on-demand`), and a **transform mode** (verbatim vs condensed). That is what "qualified" means in I3 — a reference annotated with enough type information that a machine knows what to *do* with it, not just where it points. The Mold is I3 made into a build primitive.

And the cast skill? Casting [[the-model|resolves the wiki-links away and strips them]]. The packaged artifact has *zero* qualified references — it is self-contained by design. So the interoperability lives entirely at the source layer, which is exactly right: you want the frozen package link-free for portability, and you want the source richly cross-referenced for reuse. Skills-as-source gives you the worst of it — a link-free artifact that is *also* the only record, so the qualified references never existed anywhere.

On **I1**, typed frontmatter, controlled tags, and schemas-as-typed-contracts are a formal, shared representation — modest, not RDF, but formal enough that the build *executes* against it. On **I2**, the [[the-model|controlled tag registry]] is a small but real instance of FAIR-vocabulary discipline: a tag must exist in the registry or the build fails. That is a vocabulary with referential integrity enforced at compile time — the exact posture I2 is reaching for, at the scale a skills project actually needs.

## Reusable — where the two independent theories meet

> **R1** — richly described with a plurality of accurate and relevant attributes.
> **R1.1** — released with a clear and accessible data usage license.
> **R1.2** — associated with detailed provenance.
> **R1.3** — meet domain-relevant community standards.

This is the heart of it, and it is where the argument stops being an analogy. [[the-two-assets|The Two Assets essay]] names two things a frontier model cannot regenerate for you — the two non-commodity assets a Foundry carries that a static restatement never can:

1. **Provenance** — the universal asset. Which specific claim is real, and where it came from.
2. **An enforced check** — the external verdict the doing must pass before it counts.

Those were derived from the economics of skills — from asking *what survives as models improve.* They were not reverse-engineered from FAIR. And yet they land on the two Reusability sub-principles beyond licensing, at different strengths. Provenance ↔ **R1.2** is a clean property-for-property identity: R1.2 *is* "(meta)data are associated with detailed provenance," and provenance is exactly what the asset supplies. The enforced check ↔ **R1.3** is mechanism-for-outcome: R1.3 asks that the artifact *meet* domain-relevant community standards, and the enforced check is the machinery that makes "meet" happen. The convergence is strongest on R1.2 — a decade-old data-stewardship standard and a from-scratch analysis of skill economics naming the *same* property — and R1.3 corroborates it: both traditions treat "trustworthy to reuse" as *provenance plus standards-conformance*, not fluent prose. When two fields reason from opposite ends to the same short list, it is usually because both are looking at the same underlying fact.

**R1.2 — provenance.** A Foundry emits `_provenance.json` beside every cast: which Mold revision, which model, which references resolved, and — per reference — whether each byte came from deterministic tooling or an LLM, with `src_hash` and `dst_hash`. Verbatim references prove themselves (`src_hash == dst_hash`, the cheapest possible guarantee that nothing was paraphrased); transformed references name the model and prompt that produced them. This is not "detailed provenance" as a gesture — it is fragment-by-fragment auditability, the forensic trail R1.2 asks for and a bare skill structurally cannot carry. As [[the-two-assets|the Two Assets essay argues]], provenance is a property of the *production process*, not the prose: two byte-identical skills, one grounded and one confabulated, are indistinguishable on the page; only the record of how each was produced tells them apart. A model regenerating from weights has no production record to attach. That is R1.2 being impossible-by-construction for the un-FAIR artifact and automatic-by-construction for the FAIR one.

**R1.3 — domain-relevant community standards.** This is the sharper, less obvious mapping, and it is where the [[guiding-principles|enforced-check principle]] lands. R1.3 does not ask that you *know* the community standard; it asks that your artifact *meets* it. That is exactly the [[skills-package-not-source|knowing ≠ gating]] distinction the Case turns on. A skill that *mentions* a reporting standard or a validity caveat adds nothing a frontier model lacks — the blind author spontaneously produced *more* caveats than the original. What no static artifact provides is **enforcement**: an external referee the work must clear before it certifies. In the [[galaxy-workflow-foundry|Galaxy instance]] that check is a deterministic CLI validating the gxformat2 community standard — hallucinated tool IDs caught mechanically. In the [[statistical-genomics-foundry|statistical-genomics instance]] it is a constructed empirical referee enforcing methods-and-reporting standards pinned by DOI — permutation under the null, calibration, negative controls. Both are R1.3 with teeth: not "we are aware of the standard" but "the artifact does not ship until it meets the standard." FAIR asks artifacts to *meet* community standards; the Foundry is the machinery that makes "meet" enforceable instead of aspirational.

**R1** overall — the "plurality of accurate and relevant attributes" — is where the [[guiding-principles|Corpus-First]] principle does quiet FAIR work. The adjective that matters in R1 is *accurate*. A Foundry's discipline of writing nothing until a real case forces it — stubs that grow paragraph-by-paragraph only when a cast run or logged failure demands — is a mechanism for keeping attributes *accurate rather than merely plentiful.* Pre-written comprehensive notes read as plausible and quietly propagate the author's priors; that is the R1-poor failure mode, rich-looking metadata that is actually confabulated. Corpus-first is the antidote FAIR names but doesn't operationalize.

**R1.1 — license — is the honest miss, and I'll leave it a miss.** The pattern doesn't speak directly to usage licensing; a Foundry inherits whatever its KB and upstream sources carry. The nearest thing is [[guiding-principles|Source Authority Beats Local Copies]] — by citing and pinning upstream rather than mirroring it, the licensing question stays with the source that owns it rather than being laundered into an unlicensed restatement. That's adjacent, not equivalent, and I'd rather concede the box than force it. That the pattern nails R1.2 and R1.3 dead-on and shrugs at R1.1 is, if anything, evidence the mapping is real and not retrofitted — a checklist-chaser would have found something to say about licensing too.

## The part FAIR was invented to prevent

There is a reason this matters beyond tidiness, and it is the same reason FAIR exists at all. FAIR was a response to research data that could not be trusted downstream — results absorbed into the literature and into meta-analyses as if refereed, with no thread back to how they were produced, so errors compounded silently across the record. Swap "literature" for "training corpus" and you have [[skills-package-not-source|the degenerative loop the Case warns about]]: a growing corpus of unverified, model-generated skills becomes training data, model output fed back as ground truth with no provenance to catch the errors riding along. Un-FAIR skills don't just fail to be reusable — at scale they pollute the well the next model drinks from. FAIR was the discipline that stopped the analogous rot in data. Compile-time grounding with provenance is that discipline ported to skills.

And note the direction of value. [[the-two-assets|Restatement depreciates]] as models improve — the better the model, the less a static rephrasing of canonical knowledge adds, until it adds nothing and risks worse. FAIRness moves the other way. A stronger model produces *better-grounded* casts and *sharper* constructed checks; the auditable chain and the enforced verdict hold or appreciate as the thing they ground gets better. The FAIR properties are exactly the non-commodity ones. Provenance (R1.2) and an enforced check meeting community standards (R1.3) are value a larger model does not hand you for free — they are properties of *how the artifact was produced and gated*, and a model regenerating from weights, however capable, has no production record and no external referee to attach.

## Close

FAIR did not ask research data to be *good*. It asked it to be *traceable, legible, and reusable by the next person and the next machine* — to carry its own metadata, its own qualified references, its own provenance, and to meet the standards of its field. That is the identical bar an AI skill has to clear the moment it outlives its session, and a skill authored as its own source of record misses it on nearly every axis for the same structural reason: it collapsed the data and the metadata into one fluent, unscrutinizable blob.

A Foundry passes because it never made that collapse. It keeps the source [[story|FAIR — findable, richly described, interoperable, reusable]] and casts the package [[the-model|frozen and portable]], with the provenance persisting beside it. The most striking evidence that this is the right frame is that the Case, reasoning purely from where value survives as models improve, independently rediscovered two of FAIR's own Reusability sub-principles — provenance and community-standard conformance — as the two things worth building. When the economics of durable skills and a decade-old data-stewardship standard converge on the same two properties, that is not a metaphor stretched to fit. It is the same lesson, learned twice: **the artifact is a commodity; the receipt is not.**

For the argument this rests on, see [[skills-package-not-source|The Case]] and [[the-two-assets|The Two Assets]]; for the machinery, [[the-model|The Model]] and the [[guiding-principles|Guiding Principles]].
