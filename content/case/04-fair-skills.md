---
title: "FAIR Skills: The Same Lesson, Twice"
description: The FAIR principles were written in 2016 for a traceability crisis research data had already lived through. Reasoning only from what survives as models improve, The Case landed on two of FAIR's own reusability sub-principles. A skill authored as its own source is un-FAIR by construction; a Foundry makes FAIRness fall out of the build.
section: case
order: 4
---

# FAIR Skills: The Same Lesson, Twice

The three planks before this one were derived from a single question: what survives as
models improve. The answer was [[the-two-assets|provenance and an enforced check]], and
nothing in that derivation went looking for outside support.

It has some, and from a field that got there a decade earlier. In 2016 the research-data
community published the [FAIR principles](https://www.go-fair.org/fair-principles/) —
Findable, Accessible, Interoperable, Reusable — as its answer to a crisis it had already
lived through: results you could read but could not trace, reuse, or check. FAIR's
Reusability clause has four sub-principles. One is licensing. Of the other three, **R1.2
asks for detailed provenance** and **R1.3 asks that the artifact meet domain-relevant
community standards.**

Provenance is R1.2 near-verbatim. The enforced check is the machinery that makes R1.3
happen rather than get asserted. Two traditions reasoning from opposite ends — one from a
decade of data stewardship, one from the economics of what a frontier model hands you for
free — arrived at the same short list.

That convergence is this page's claim. The rest is the evidence for it, and then the
several honest reasons to discount it.

## Why FAIR is the right witness

FAIR is not a quality standard. It does not ask whether your data is *good*; it asks
whether your data is *legible to the people and machines that will reuse it* — findable by
a persistent identifier, accessible through an open protocol, interoperable through a
shared representation, reusable because it is richly described and carries its provenance.
The animating word in the original Wilkinson et al. paper is **machine-actionability**: the
point was never prettier data catalogues, it was data a machine could act on *and* a human
could trust, without a person in the loop re-deriving where every number came from.

That is exactly the bar an AI skill now has to clear. A skill is a machine-actionable
artifact — an agent loads it and acts. It is increasingly a *scientific* artifact too: it
encodes canonical procedure, default parameters, citations, the caveats a method requires.
And it is increasingly read back into the record and into training corpora as if refereed.
So the FAIR question is not a cute analogy. It is the literal question: **when your skill
outlives the session that made it — read by another agent, cited by a human, ingested by
the next model — is it Findable, Accessible, Interoperable, and Reusable?**

For a skill authored *as* its own source of record, the answer is no on every axis, and the
reasons are structural rather than a matter of anyone's craft.

## The inversion is the FAIR move

Here is the thing FAIR understood that skills-as-source forgets: **data and metadata are
different things, and the metadata has to survive on its own.** Half of FAIR is about
metadata as a first-class, separately-persisted object — F2, F3, A2, and all of Reusability
are metadata claims. FAIR's deepest structural demand is: *do not collapse the artifact and
the record of the artifact into one opaque blob.*

That collapse is precisely what happens when [[skills-package-not-source|the skill is the source]].
`SKILL.md` is, for most projects, two things at once — the thing a model loads and the thing
a human edits, the package *and* the record. There is no separable metadata: the
provenance, the references, the rationale, the map of what is grounded versus guessed are
either baked into the prose indistinguishably or absent entirely. You are holding data with
its metadata dissolved into it — the anti-FAIR artifact by construction.

The Foundry's one inversion — [[story|make the knowledge base the source, cast the skill as a package]] —
is structurally the FAIR metadata-first move. The [[the-model|Knowledge Base]] is the
richly-described, human-legible record. The [[glossary|Mold]] is a typed
reference manifest. The cast skill is the frozen package. And `_provenance.json` is the
metadata that persists *beside* and *independent of* the package. The Foundry does not make
skills FAIR by adding a metadata sidecar as an afterthought; it refuses from the start to
let the artifact be the only thing.

Everything below is that one move, read through FAIR's four lenses. Some mappings are tight
enough to be near-identities; others are a stretch, and where one is a stretch we say so
rather than force the fit.

## Findable

> **F1** — (Meta)data are assigned a globally unique and persistent identifier.
> **F2** — Data are described with rich metadata.
> **F3** — Metadata clearly and explicitly include the identifier of the data they describe.
> **F4** — (Meta)data are registered or indexed in a searchable resource.

Try to *cite* a claim inside a hand-authored skill. You can't. There is no identifier for
"the line that says pin the revision" — no way to point at it, version it, or reference it
from anywhere else. The artifact is a flat wall of prose with no addressable interior. That
is an F1 failure at the level of the claim.

A Foundry gives every unit an identity. A Mold has an `id` and a `revision`; every cast is
stamped with a **content hash** (`sha256:…`) of the Mold and each resolved reference it was
built from. Content-hash addressing is a persistent identifier in the same family as a DOI
or a git commit — it names a *specific frozen state* of a specific claim, and it stays valid
after the artifact is superseded (**F1**). The provenance record is metadata that
**explicitly names the identifier of the thing it describes** —
`"mold": { "id": "summarize-source", "revision": 4, "content_hash": "sha256:9f1c…" }` — which
is F3 almost verbatim.

(FAIR writes "(meta)data" precisely because the distinction is recursive: metadata is itself
data with its own metadata. So a Mold can be the *data* a provenance record identifies in
one breath and the *metadata* describing a cast skill in the next — the same object, two
roles, both licensed by the notation.)

Rich metadata (**F2**) is not something a Foundry adds; it is what a Mold *is*. Typed
frontmatter, controlled tags, and a manifest of typed references describe each action before
a single word of the skill body is condensed. The skill, by contrast, is undifferentiated
text — the F2-poor end of the spectrum. And because the KB is an inspectable, wiki-linked,
rendered-and-indexed site rather than a `SKILL.md` dropped in a folder, the source is a
**searchable resource** (**F4**) in a way a loose skill file simply is not.

## Accessible

> **A1** — (Meta)data are retrievable by their identifier using a standardised communications protocol. (**A1.1** open/free/universal; **A1.2** supports auth where needed.)
> **A2** — Metadata are accessible, even when the data are no longer available.

Two honest halves. On **A1/A1.1**, the contribution is real but modest, and it is the
[[guiding-principles|Portable Artifacts Over Platform Fashion]] principle wearing a FAIR
hat: plain files, markdown, JSON, git, sha256 — open, free, universally-implementable
formats with no proprietary runtime lock-in. A Mold does not bind its knowledge to one agent
vendor's skill schema, so retrieval never routes through a closed protocol. That is
genuinely A1.1-shaped, and not more: FAIR's A1 is largely about repository plumbing
(resolvable identifiers, content negotiation) that the pattern does not specify, and a
Foundry inherits whatever its host offers. The pattern makes A1 *achievable* by keeping
everything in open formats. It does not hand you a data repository.

**A2 is the gem**, and it is the one most people skip on first read. "Metadata are
accessible even when the data are no longer available" sounds like a fussy archival edge
case — until you notice it *is the Foundry's entire theory of the skill's lifecycle.* A cast
artifact is [[the-model|frozen, isolated, and link-free]] on purpose. It is *meant* to be
superseded, recast, thrown away — it is a build output, the binary, not the code. When it
goes stale or gets deleted, what survives? The KB it was cast from, and the provenance
recording *what it was cast from*. The lineage outlives the artifact by design.

A2 asks for exactly the property the source/package split guarantees. Skills-as-source has
the opposite property: overwrite the `SKILL.md` and the only record there ever was is gone
with it.

## Interoperable

> **I1** — (Meta)data use a formal, accessible, shared, and broadly applicable language for knowledge representation.
> **I2** — (Meta)data use vocabularies that follow FAIR principles.
> **I3** — (Meta)data include qualified references to other (meta)data.

**I3 is the marquee link of the whole page, and it is nearly a definition.** Read it again:
*metadata include qualified references to other metadata.* Now read the Foundry's definition
of its core unit: a Mold is a **typed reference manifest** — a declaration of qualified
references to other KB pages, schemas, CLI manual pages, prompts, and examples. Not bare
links: every reference carries a **kind** (which resolver applies), a **load policy**
(`upfront` vs `on-demand`), and a **transform mode** (verbatim vs condensed). That is what
"qualified" means in I3 — a reference annotated with enough type information that a machine
knows what to *do* with it, not just where it points. The Mold is I3 made into a build
primitive.

And the cast skill? Casting [[the-model|resolves the wiki-links away and strips them]]. The
packaged artifact has *zero* qualified references — it is self-contained by design. So
interoperability lives entirely at the source layer, which is exactly right: you want the
frozen package link-free for portability, and the source richly cross-referenced for reuse.
This is [[explainer-is-the-source|the flatness argument]] arriving from the outside — a
package is flattened because flattening is what packaging *is*, so the qualified references
have to live upstream or nowhere. Skills-as-source gives you the worst of it: a link-free
artifact that is *also* the only record, so the references never existed anywhere.

On **I1**, typed frontmatter, controlled tags, and schemas-as-typed-contracts are a formal,
shared representation — modest, not RDF, but formal enough that the build *executes* against
it. On **I2**, the [[the-model|controlled tag registry]] is a small but real instance of
FAIR-vocabulary discipline: a tag must exist in the registry or the build fails. A
vocabulary with referential integrity enforced at compile time is the posture I2 reaches
for, at the scale a skills project actually needs.

## Reusable — where the two derivations meet

> **R1** — richly described with a plurality of accurate and relevant attributes.
> **R1.1** — released with a clear and accessible data usage license.
> **R1.2** — associated with detailed provenance.
> **R1.3** — meet domain-relevant community standards.

This is the heart of it, and where the page stops being a reading of FAIR and starts being a
claim about two fields.

**R1.2 — provenance.** A Foundry emits `_provenance.json` beside every cast: which Mold
revision, which model, which references resolved, and — per reference — whether each byte
came from deterministic tooling or an LLM, with `src_hash` and `dst_hash`. Verbatim
references prove themselves (`src_hash == dst_hash`, the cheapest possible guarantee that
nothing was paraphrased); transformed references name the model and prompt that produced
them. That is not "detailed provenance" as a gesture but fragment-by-fragment auditability —
the forensic trail R1.2 asks for, and one a bare skill structurally cannot carry, because
[[the-two-assets|provenance is a property of the production process, not the prose]]. R1.2
is impossible-by-construction for the un-FAIR artifact and automatic-by-construction for the
FAIR one.

This is the one identity the page rests on. R1.2 *is* "associated with detailed provenance,"
and provenance is exactly what the asset supplies. There is no interpretive work in the fit.

**R1.3 — domain-relevant community standards.** The sharper, less obvious mapping. R1.3 does
not ask that you *know* the community standard; it asks that your artifact *meets* it. That
is the [[skills-package-not-source|knowing ≠ gating]] distinction the Case turns on, arrived
at from stewardship rather than economics. In the [[galaxy-workflow-foundry|Galaxy instance]]
the check is a deterministic CLI validating the gxformat2 community standard — hallucinated
tool IDs caught mechanically. In the [[statistical-genomics-foundry|stat-gen instance]] it is
a constructed empirical referee enforcing methods-and-reporting standards pinned by DOI. Both are R1.3 with teeth: not "we are aware of the standard" but "the artifact
does not ship until it meets the standard." FAIR asks artifacts to *meet* community
standards. The enforced check is the machinery that makes "meet" enforceable instead of
aspirational.

**R1 — accurate attributes.** The adjective that matters in R1 is *accurate*, and it is
where [[guiding-principles|Corpus-First]] does quiet FAIR work. Writing nothing until a real
case forces it — stubs that grow only when a cast run or logged failure demands — is a
mechanism for keeping attributes *accurate rather than merely plentiful.* Pre-written
comprehensive notes read as plausible and quietly propagate the author's priors:
rich-looking metadata that is actually confabulated. That is the R1-poor failure mode, and
corpus-first is an antidote FAIR names but does not operationalize.

**R1.1 — license.** R1.1 lands for the *same structural reason* as everything else here.
Licensing is another casualty of the data/metadata collapse: quote a paragraph of upstream
docs into a hand-authored skill and the license those bytes came under dissolves into the
prose exactly like the provenance did. A `SKILL.md` that vendors a slice of Apache-2.0
documentation and a slice of an all-rights-reserved manuscript renders both in identical
fluent text with neither license attached. Skills-as-source cannot supply a usage license
because it never kept the redistributed content separable enough to license.

A Foundry keeps license as typed, separable metadata on every redistributed reference — the
same metadata-first move — and then does what a static label can't. Under
[[guiding-principles|Redistributed Content Carries Its License]], `license` is a normalized
SPDX id (or a `LicenseRef-` escape), validated against a shared license→redistribution-policy
table; the verbatim license text is vendored under `LICENSES/` and its presence checked; and
— the load-bearing part — the license is an *input to casting*. A copyleft or
non-redistributable source is carried in the Foundry's own words; a permissive or CC-BY one
may be copied verbatim with its notice; and in the Galaxy instance casting *refuses* to carry
an own-words-only license verbatim, stamping each redistributed reference's license-file hash
into `_provenance.json`. That is R1.1 as an enforced compile-time constraint — rather more
than the static license field R1.1 literally asks for.

## What FAIR was invented to prevent

There is a reason this matters beyond tidiness, and it is the reason FAIR exists at all.

FAIR was a response to research data that could not be trusted downstream — results absorbed
into the literature and into meta-analyses as if refereed, with no thread back to how they
were produced, so errors compounded silently across the record. Swap "literature" for
"training corpus" and you have [[skills-package-not-source|the degenerative loop the Case warns about]]:
unverified, model-generated skills become training data, model output fed back as ground
truth with no provenance to catch the errors riding along.

The useful fact is not the parallel. It is that one of these rots already happened, to a
community that then spent a decade building the discipline that stops it — and that
discipline turned out to be *metadata that survives separately from the artifact.* FAIR is
not a prediction about skills. It is a postmortem, and skills are reproducing the conditions.

## What this does not claim

Four discounts, and they are not small.

**Convergence is only worth as much as the mapping is rigid.** FAIR has fifteen
sub-principles. A determined author can find a home for almost any architecture in fifteen
slots, and "we hit most of them" is what an analogy sounds like when it is failing. So grade
them unequally, or the convergence proves nothing. The load-bearing claim is exactly one
identity — provenance ↔ R1.2 — which is property-for-property with no interpretive work in
it. R1.3 is a mechanism-for-outcome fit, and corroborates. Everything under F, A, and I is
*illustration*: it gives the structural failure a vocabulary, and none of it would rescue the
page if R1.2 did not hold on its own.

**"Independently" is doing work we cannot fully back.** The two assets were derived from
skill economics, not reverse-engineered from FAIR; that derivation is on the record in
[[skills-package-not-source]] and [[the-two-assets]] and never routes through it. But this
pattern's instances live in bioinformatics, where FAIR is ambient. The honest form of the
claim: the argument did not come *from* FAIR, but it was not made by someone who had never
heard of FAIR. Read the convergence as two derivations landing together — which is real —
not as two strangers landing together, which would be a stronger claim than the facts
support.

**Passing FAIR does not make a skill right.** FAIR asks whether an artifact is legible and
reusable, never whether it is correct. A perfectly FAIR skill can be confidently wrong:
traceable to a source that was mistaken, conformant to the wrong standard. That gap is
precisely what [[the-two-assets|the enforced check]] exists to cover, and it is why the check
is the asset FAIR does not supply in R1.2. Provenance tells you where a claim came from. It
does not tell you the claim is true.

**And FAIR has a compliance problem we inherit the moment we claim it.** FAIRification in
practice is frequently a checklist — metadata authored to satisfy an audit, deposited once,
load-bearing for nothing. That failure mode is fully available here: a `_provenance.json`
nobody reads is a FAIR badge, not a FAIR property, and this page is exactly the kind of
document that earns one. The only defense is architectural rather than rhetorical, and the
pattern already has it. Provenance is not authored to claim FAIRness; it falls out of the
build. And it is *consumed* — by the re-hash that makes drift mechanically detectable, by the
license validation that refuses to cast. Metadata that nothing reads decays into theater.
Metadata the compiler enforces cannot, because the build stops when it is wrong.

That last one is the boundary condition for the whole page: **FAIRness is worth claiming only
where something downstream breaks if it is false.**

## Close

FAIR did not ask research data to be *good*. It asked it to be traceable, legible, and
reusable by the next person and the next machine — to carry its own metadata, its own
qualified references, its own provenance, and to meet the standards of its field. That is the
identical bar an AI skill has to clear the moment it outlives its session, and a skill
authored as its own source of record misses it on nearly every axis for one structural
reason: it collapsed the data and the metadata into a single fluent, unscrutinizable blob.

A Foundry passes because it never made that collapse — the source stays richly described and
cross-referenced, the package ships frozen and portable, and the provenance persists beside
it whether or not the package survives.

What makes that worth more than a compliance story is the direction the two arguments came
from. The Case reasoned purely from where value survives as models improve, and landed on
provenance and standards-conformance. FAIR reasoned from a decade of watching untraceable
data poison the record, and landed on R1.2 and R1.3. When the economics of durable skills and
a data-stewardship standard converge on the same two properties, the likeliest explanation is
not a metaphor stretched to fit. It is that both were looking at the same fact: **the artifact
is a commodity; the receipt is not.**

For the argument this rests on, see [[skills-package-not-source|the inversion]] and
[[the-two-assets|the two assets]]; for why the source is written for a person,
[[explainer-is-the-source]]; for the machinery, [[the-model]] and the
[[guiding-principles]].
