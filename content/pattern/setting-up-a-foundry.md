---
title: Setting up a Foundry
description: The imperative companion to Anatomy — how to stand up a new Foundry, step by step. The substrate is given; the work is bringing domain knowledge and extending the base with what the domain needs.
section: pattern
order: 6
---

# Setting up a Foundry

[[anatomy-of-an-instance|Anatomy]] describes what a Foundry *is* — the substrate every instance shares, the extension surface each domain adds. This page is its imperative twin: what you actually *do* to stand a new one up. The substrate — KB-as-source, the typed [[the-model|Mold]], deterministic-first [[the-model|casting]], [[the-model|provenance]], grounding, disclosure — is inherited essentially for free. The steps below are the part the substrate cannot do for you.

It is written to be worked through roughly in order, but a Foundry is grown, not stamped: expect to loop back as real cases force new vocabulary, new Molds, and a sharper notion of the check. Only the [glossary step](#define-the-vocabulary) is fully written out today; the rest are stubs that will grow the same way the pattern says a KB should — paragraph by paragraph, when a real case demands it.

## Bring the domain knowledge and its grounding corpus

*Stub.* The real asset is *what the Foundry knows* — the patterns, methods, and hard-won procedure of one field — and the external corpus every abstraction traces back to. Bring both before you build machinery around them. See [[anatomy-of-an-instance]] and [[guiding-principles]] (Corpus-First).

## Define the vocabulary

A Foundry names things that did not exist before it. Some terms are the pattern's (*Mold*, *Cast*); most are your domain's, coined for concepts your KB synthesizes and no one has named yet. A coined term has no prior meaning for a reader meeting it and none in a model's training data — there is nothing to fall back on. It means only what your KB says it means. So before the KB can be read by a human or cast by a model without drift, the vocabulary has to be **pinned**: defined once, in one place, that every other page uses without redefining. That place is the glossary, and setting one up is one of the first things you do.

It is a small, deliberate control surface — not a dictionary of every word, but the short list of terms your KB *coins* or leans on heavily. Building it well is a handful of disciplines:

- **Add a term when a Mold actually needs it, not before.** The glossary grows corpus-first, the same as the rest of the KB. A vocabulary invented top-down encodes the author's guesses about what will matter; a vocabulary grown from real actions encodes what did. When a Mold reaches for a concept that has no pinned name, that is the signal to name it — not a moment sooner.

- **Write one authoritative sentence, not an essay.** State the abstract meaning first; where a term has a concrete realization in one instance, follow with a brief `(e.g. …)`. The entry's job is to *fix* the meaning, not to teach the whole subject — the Molds do that.

- **Pick one word per concept and defend it.** The glossary is where you resolve the near-duplicates that otherwise drift across pages: singular vs. plural, capitalization, *the-X* vs. *X*, two half-synonyms for one idea. One concept, one term; retire the rivals. This is the discipline that stops a KB from quietly meaning three slightly different things by the same word.

- **Scope it: shared terms vs. this instance's terms.** Group the vocabulary the substrate defines separately from the vocabulary your domain coins, and do not hoist the latter into the former. One Foundry's *pipeline* is not another's; a term that means something here may mean nothing — or something else — in the next instance. The scoping is what keeps one domain's jargon from leaking into another's.

- **Make it the tie-breaker.** Where two pages disagree on what a term means, the glossary wins. Stating that outright is what turns the glossary from a nicety into an authority the rest of the KB answers to.

Two properties fall out of doing this. The glossary becomes the KB's **highest fan-in reference** — nearly every Mold depends on it — so a definition fixed once propagates everywhere. And because a definition is the one kind of reference you cannot afford to paraphrase, **casting copies glossary entries verbatim, never condensed**: the pinned term is an invariant the compiled artifact must carry unchanged.

The payoff is one surface serving both readers a Foundry has. A human reads the glossary to learn the domain's coined language; the casting model is grounded on it and stops substituting its own synonyms for your terms. For the glossary's role in the machine, see [[the-model]]; the [[glossary]] on this site is the pattern's own instance of exactly this.

## Identify the actions and author the Molds

*Stub.* Decompose the domain into repeatable decision-and-handoff units — one [[the-model|Mold]] per action worth casting — and declare each Mold's typed references. Getting the boundary right (not one monolith, not a dust of fragments) is the craft here. See [[the-model]] and [[anatomy-of-an-instance]].

## Choose the target(s) and set up casting

*Stub.* Pick the format(s) a cast produces and wire the deterministic-first, LLM-second pipeline. The KB stays the source of truth across every target. See [[the-model]] (Cast, Target, Provenance).

## Build the external check

*Stub.* Decide what *correct* means in your domain and what can decide it — a deterministic validator where output is parseable, a constructed empirical referee where it is not. This is the sharpest, most domain-specific part of the work and the one the substrate deliberately leaves open. See [[anatomy-of-an-instance]] and [[the-two-assets]].

## Compose, if the work is sequential

*Stub.* Where a domain's task is an inherently multi-step journey, compose Molds into ordered end-to-end tasks and orchestrate them. A domain whose actions stand alone needs no such layer. See [[anatomy-of-an-instance]].
