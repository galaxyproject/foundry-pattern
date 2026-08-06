---
title: Plan Your Foundry
description: A stack-neutral route from the shared Foundry substrate to the decisions and domain knowledge a working instance needs.
section: pattern
order: 6
---

# Plan Your Foundry

[[anatomy-of-an-instance|What a Foundry Needs]] describes the shared substrate and the extension surface each domain owns. This page turns that distinction into a route from an idea to one working vertical slice. Follow the phases roughly in order, but expect to loop back: real cases will sharpen the vocabulary, move Mold boundaries, and expose checks the first design missed.

## The route at a glance

| Phase | Outcome |
|---|---|
| 1. Frame and ground the domain | A bounded promise, representative cases, and an authoritative corpus |
| 2. Establish the vocabulary | One glossary that governs inherited and domain terms |
| 3. Stand up the reader's surface | A navigable, self-documenting source of truth |
| 4. Author one action | A typed Mold with resolvable references |
| 5. Cast one target | A reproducible artifact with provenance |
| 6. Build the external check | An independent way to decide whether the resulting work is trustworthy |
| 7. Compose only if needed | An explicit orchestration decision, not a default framework layer |
| 8. Grow from evidence | New knowledge and structure justified by real use |

## 1. Frame and ground the domain

**Goal.** State what work the Foundry will help perform and ground its knowledge in real practice before building machinery around it.

**Produce.** Write a short promise naming the domain, intended users, and kinds of action the Foundry should support. Select a small set of representative cases — including an awkward or negative case — and identify the authoritative corpus behind them. For every source, decide whether the Foundry will cite it, synthesize it, carry a pinned snapshot, or treat it as a working cache; record the license and refresh posture that choice requires.

**Done when.** A reviewer can point from the proposed work to concrete cases and upstream evidence, and can tell which claims belong to the source versus the Foundry's synthesis. Do not wait for a comprehensive survey: the first corpus needs enough variation to challenge the design, not enough volume to justify decisions already made. See [[guiding-principles]] (Corpus-First and Upstream Authority, Local Synthesis).

## 2. Establish the vocabulary

**Goal.** Give people, source documents, and cast artifacts one authoritative language.

**Produce.** Create one glossary containing the pattern terms the instance inherits, any vocabulary introduced by its implementation stack, and the domain terms its first real actions require. Record the provenance of each entry without partitioning the reader's vocabulary by supply chain.

**Done when.** Every coined or heavily relied-on term has one authoritative definition; conflicting usage defers to the glossary; inherited terms retain their inherited meanings; and casting can carry the definitions an action needs verbatim.

### Glossary discipline

A Foundry names things that did not exist before it. Some terms are the pattern's (*Mold*, *Cast*); most are your domain's, coined for concepts your KB synthesizes and no one has named yet. A coined term has no prior meaning for a reader meeting it and none in a model's training data — there is nothing to fall back on. It means only what your KB says it means. So before the KB can be read by a human or carried into an agent runtime without drift, the vocabulary has to be **pinned**: defined once, in one place, that every other page uses without redefining. That place is the glossary, and setting one up is one of the first things you do.

It is a small, deliberate control surface — not a dictionary of every word, but the short list of terms your KB *coins* or leans on heavily. Building it well is a handful of disciplines:

- **Add a term when a Mold actually needs it, not before.** The glossary grows corpus-first, the same as the rest of the KB. A vocabulary invented top-down encodes the author's guesses about what will matter; a vocabulary grown from real actions encodes what did. When a Mold reaches for a concept that has no pinned name, that is the signal to name it — not a moment sooner.

- **Write one authoritative sentence, not an essay.** State the abstract meaning first; where a term has a concrete realization in one instance, follow with a brief `(e.g. …)`. The entry's job is to *fix* the meaning, not to teach the whole subject — the Molds do that.

- **Pick one word per concept and defend it.** The glossary is where you resolve the near-duplicates that otherwise drift across pages: singular vs. plural, capitalization, *the-X* vs. *X*, two half-synonyms for one idea. One concept, one term; retire the rivals. This is the discipline that stops a KB from quietly meaning three slightly different things by the same word.

- **Record where each term came from, but keep one glossary.** Terms arrive from more than one place — the pattern supplies some, an adopted stack supplies more, your domain coins the rest — and which is which genuinely matters: an inherited term must keep its inherited definition, and a term you coined must not be able to pass as one the pattern handed you. One Foundry's *pipeline* is not another's; a term that means something here may mean nothing, or something else, in the next instance. But that is **provenance**, and provenance is a property of an entry rather than a reason to partition the page — the same call the pattern makes when a kind *declares* `layer` instead of living in a separate directory of substrate kinds. Mark each entry and let the glossary read as one cohesive vocabulary, because the reader arriving at it is trying to learn your domain, not audit its supply chain.

- **Make it the tie-breaker.** Where two pages disagree on what a term means, the glossary wins. Stating that outright is what turns the glossary from a nicety into an authority the rest of the KB answers to.

Two properties fall out of doing this. The glossary becomes the KB's **highest fan-in reference** — nearly every Mold depends on it — so a definition fixed once propagates everywhere. And because a definition is the one kind of reference you cannot afford to paraphrase, **casting copies glossary entries verbatim**: the pinned term is an invariant the compiled artifact must carry unchanged.

The payoff is one surface serving both readers a Foundry has. A human reads the glossary to learn the domain's coined language; every cast artifact carries the same definitions into its runtime. For the glossary's role in the machine, see [[the-model]]; the [[glossary]] on this site is the pattern's own instance of exactly this.

## 3. Stand up the reader's surface

**Goal.** Make the knowledge source inspectable by people and structured enough for tooling to validate.

**Produce.** Establish a content tree that renders as a navigable site. Keep the glossary authoritative; add focused design records for architectural decisions; place documentation and an example beside each knowledge kind; and generate catalogs for inventories that would go stale if repeated by hand. Use one link grammar and resolution map for both rendering and validation so the site and its checks cannot disagree about what a reference means. See [[design-records]] for the shared self-documentation pattern.

**Done when.** A new contributor can find the vocabulary, content contracts, examples, and ownership boundaries from inside the knowledge base. Broken references, invalid frontmatter, and stale generated surfaces fail a repeatable check rather than remaining editorial suggestions. The result should already be useful to a human reader before it can produce a runtime artifact.

## 4. Identify the actions and author one Mold

**Goal.** Turn one repeatable unit of domain work into a typed action without trying to model the entire field.

**Produce.** Choose one representative decision-and-handoff unit and author a [[the-model|Mold]] for it. Declare every dependency by kind, along with its load policy and placement mode. Keep facts, schemas, examples, prompts, and rationale as references rather than duplicating them into the procedure.

**Done when.** The Mold describes one coherent action — neither an entire journey nor a dust of fragments — and every declared reference resolves and validates. Someone should be able to explain why each dependency is present and why it loads when it does. Let the boundary be corrected by the first real use before multiplying it into a taxonomy.

## 5. Choose one target and set up casting

**Goal.** Prove that the structured source can become a frozen, usable artifact without becoming a second source of truth.

**Produce.** Select one target format and implement its deterministic casting rules: how each reference kind resolves, what is inlined or bundled, and how target-specific files are laid out. Emit provenance beside the artifact, including the Mold and target identities, resolved references, hashes, placement, and cast-time checks.

**Done when.** The same source, Mold, and target reproduce the same bytes; links back into the KB have been resolved away; the artifact is self-contained for its intended runtime; and a reviewer can trace packaged material back to its source. When the artifact is wrong, the repair happens in the Mold, its references, or the target rules — never by hand-editing the cast.

## 6. Build the external check

**Goal.** Decide what *correct* means for work performed with the artifact and what can judge it independently of the process that produced it.

**Produce.** Name the strongest check the domain admits. Where correctness is parseable, use a deterministic validator. Where it is empirical, construct a referee that runs the simulation, calibration, negative control, or other test the field trusts. A domain may instead require human review, a proof tool, or another mechanism; the pattern fixes the independence requirement, not the implementation.

**Done when.** Work cannot count as trusted merely because the producing process says it succeeded. The check has a defined input, verdict, and failure path, and the Foundry makes clear what the check covers and what remains outside its reach. See [[anatomy-of-an-instance]] and [[the-two-assets]].

## 7. Compose only if the work is sequential

**Goal.** Add orchestration only where the domain's work genuinely consists of ordered actions and handoffs.

**Produce.** Either compose Molds into an explicit end-to-end journey or record that the domain's actions stand alone. If composition is needed, keep the pipeline or harness separate from the Molds it invokes so orchestration does not become a second place to author domain knowledge.

**Done when.** Every transition has a reason and a defined handoff, individual Molds remain independently understandable, and a domain with standalone actions carries no ceremonial pipeline layer. Composition is an extension, not evidence that a Foundry is more complete.

## 8. Grow from evidence

**Goal.** Expand the Foundry through observed needs rather than anticipated completeness.

**Produce.** Exercise the first vertical slice against the representative cases. Feed failures and repeated decisions back into the source: sharpen a glossary entry, add a reference, move a Mold boundary, introduce a kind, or compose a journey only when the evidence calls for it. Recast after source changes and use provenance to identify stale artifacts.

**Done when.** New knowledge points to a corpus example, cast requirement, failure, or repeated workflow; generated surfaces remain current; and the source improves when the artifact is used. A Foundry is grown, not stamped — the first complete slice is the beginning of the knowledge base, not a miniature version of every feature it might someday contain.
