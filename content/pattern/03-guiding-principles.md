---
title: Guiding Principles
description: The seven design pressures every Foundry obeys, abstracted from the diff between its two instances — the discipline a domain inherits before it extends the substrate.
section: pattern
order: 3
---

# Guiding Principles

A Foundry is not a glossary, a documentation site, or a pile of skills. It is an attempt to make a body of working knowledge durable, inspectable, executable, and externally checkable while the surrounding tooling keeps changing. These principles are the design pressure behind that attempt. They are domain-free on purpose: each one holds for any Foundry, and where the two instances honor a principle differently, that difference is the pattern earning its abstraction (see [[anatomy-of-an-instance]]).

The pressure is real because a class of generated work fails in specific, detectable ways, and monolithic skills answer those failures with prose caveats that neither compose nor scale. Make the knowledge base actionable instead, and the principles below explain why the [[the-model|architecture]] is shaped the way it is.

## Source Authority Beats Local Copies

Knowledge stays healthy near the project that owns it. A Foundry should not become a stale mirror of upstream systems; it points to source, quotes only what it must, and syncs through the strongest available mechanism when freshness matters. A Foundry adds value by connecting, explaining, and operationalizing upstream knowledge — not by competing to be its canonical home.

Grounding is a spectrum, and the choice is the author's: cite by URL — cheapest and always fresh, but weakest on stability; quote a fixed excerpt inline — stable to read, but able to go stale silently; or pin a source by content hash, commit, or DOI — stable *and* drift-detectable, but frozen until someone re-pins. Citing rather than mirroring carries an honest cost: upstream *structural* drift is not caught automatically, because the price of not maintaining a copy is not getting a diff when the source moves. The discipline is to pin what must stay stable and review on sync — not to mirror everything to feel safe.

(Instance #1 cites the curated workflow corpus by URL rather than importing it, and lets the CLI remain the source of behavior. Instance #2 pins methods literature and reporting standards by DOI/commit and reads tool behavior from invoking the tool, not from prose it maintains.)

## Reproducibility At Every Layer

Producing knowledge is itself a scientific act. A result is only useful if a maintainer can recover how it was derived, which assumptions it inherited, and which checks were applied. Reproducibility here is broader than rerunning the final artifact: it includes the [[glossary|provenance]] of every derived artifact — which Mold was cast, which model and prompt produced it, which references resolved, which checks ran. The goal is not perfect immutability but *accountable change*: when a Mold, package, or cast changes, the reason and the dependency path should be recoverable.

(This is why casts emit provenance in both instances, and why each treats validation as part of the authoring loop rather than a final cleanup step.)

## Deterministic Tools Do Deterministic Work

LLMs are excellent at interpretation, synthesis, repair, and translation across weakly structured contexts. They are poor replacements for the instruments that establish a result's trustworthiness. A Foundry should spend model context on the work only models can do, and delegate everything else to a tool that does it the same way every time. This keeps agents more reliable and cheaper to run: tool calls are saved for high-value judgment, context is not filled with data a program can query, and hallucinated caveats are replaced by executable checks.

The *soul* of the principle is constant — do not let the model be the only judge of its own work — while the *form* of the deterministic instrument varies. The corollary is enforcement over advisory: a caveat a model *may* mention is not a check; the work must hand off to something external before it counts. (Instance #1's instrument is schematic: a parser/validator that asks "does this parse?" Instance #2's is empirical: permutation under the null, simulation under known truth, calibration, negative controls — "is this calibrated, does it recover known truth?" One kind of instrument is a CLI you call; another is an empirical referee that must itself be constructed. The principle is shared; which instrument a domain builds is one of the things it *extends* the substrate with — see [[anatomy-of-an-instance]].)

## Progressive Disclosure Over Context Flooding

Agents — and the humans reading over them — should see the right knowledge at the right time. A Foundry should not flatten every reference, schema, example, and rationale into one prompt just because the information exists. Molds disclose the action; typed references disclose the dependency surface; load policy distinguishes up-front material from on-demand; casting mode decides copied vs. condensed vs. inlined vs. sidecar; and where a domain composes ordered journeys, those disclose the journey.

The goal is not minimalism but *navigable depth*: a human browses from journey to Mold to reference, and an agent moves from action to supporting evidence without dragging the whole library into every step. This principle is the connective tissue of the whole loop — it is what keeps the source record rich without forcing every runtime artifact to carry every page.

## Portable Artifacts Over Platform Fashion

The agentic landscape will keep changing. A Foundry should not bind its core knowledge to one agent runtime, editor, model vendor, or orchestration framework. A Mold is a typed reference manifest plus a procedural skeleton — abstract enough to cast into several targets and explicit enough that each target can be audited. Molds are durable source; cast skills are generated targets; a new runtime should require a new cast target or harness, not a rewrite of the knowledge base.

## Actionable Knowledge, Not Passive Notes

A passive knowledge base explains but cannot make an agent act. A standalone skill acts but compresses away the evidence and rationale that make a task maintainable. A Foundry keeps both: the source preserves the rich graph — references, schemas, citations, rationale — while Molds identify which knowledge a concrete task needs and casting condenses it into executable artifacts. This is the central wager: a knowledge base becomes more useful when its structure makes it executable, and a skill becomes more trustworthy when its source stays inspectable.

## Corpus-First, Not Invention-First

A Foundry learns from a real, curated [[glossary|grounding corpus]] before it invents abstractions. Corpus-first does not mean copying the corpus wholesale; it means abstractions are justified by observed examples — pages cite concrete cases, Mold behavior aligns with recurring tasks, new taxonomy appears only after content demands it.

Building that grounding from a large corpus is itself tiered, cheap-to-expensive: a broad inexpensive scan to locate where the relevant cases live, a structural pass that reads the *shape* of the candidates without their full contents, and selective deep reads of only the few that earn the attention. The ladder is what keeps corpus-first affordable — survey widely, read deeply only where a real case justifies it — rather than a counsel of perfection nobody can follow.

The same discipline governs the prose a Mold references. A reference note starts as a stub — frontmatter, title, primary-source link — and grows paragraph-by-paragraph only when a real case (a cast run, a logged failure, a place an agent guessed) demands it. Pre-written comprehensive notes are an anti-pattern: they read as plausible, sound authoritative, and quietly propagate the author's priors into every downstream cast. A downstream agent cannot tell invented prose from earned prose, so the safe default is to write nothing until contact with the corpus forces it. A Foundry must not become the thing it gates against.

## How The Principles Connect

The principles reinforce each other. Keeping information at its source makes upstream sync possible, but only if derived artifacts record provenance. Provenance is meaningful only if deterministic instruments perform the checks the model should not grade itself on. Those instruments are reusable only when artifacts are portable, which needs an inspectable source of truth, which pushes toward a knowledge base, which becomes actionable through Molds and casts — all kept grounded by a corpus-first posture.

**Actionable Knowledge, Not Passive Notes** is the spine through all of it: it is what turns a knowledge base into something trustworthy rather than merely articulate, and provenance plus the deterministic-tools discipline are what keep "actionable" honest. Progressive disclosure is the connective tissue that holds the loop together. Each layer has a job — upstream owns the facts, the Foundry owns synthesis and casting source, the domain's check owns the verdict, cast artifacts own execution, harnesses own orchestration — and a Foundry works when those jobs stay separate and the connections between them stay explicit. The principles are the invariant discipline; what each domain *builds* on that discipline — its composition, its check — is the pattern being applied.

## See Also

- [[anatomy-of-an-instance]] — the shared substrate vs. the extension surface each domain adds.
- [[the-two-assets]] — provenance, the universal asset, and the enforced checks a domain builds on top.
- [[the-model]] — KB, Mold, Cast, the structural realization of these principles.
- [[glossary]] — terms used above.
