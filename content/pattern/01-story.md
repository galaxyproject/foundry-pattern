---
title: Story
description: Make the knowledge base actionable — and the most obvious thing you cast from it is a skill that doesn't rot. Why the source of record should be an inspectable knowledge base, not the skill.
section: pattern
order: 1
---

# Make the knowledge base actionable

In any structured domain there is a body of knowledge worth keeping: patterns, references, schemas, the hard-won procedure for getting something right. It is valuable precisely because it is rich — cross-cutting, tool-shaped, full of detail that matters. And it is worth keeping *inspectable*: read, reviewed, linked, corrected as the domain moves. The problem was never that we lack this knowledge. It is that the knowledge is too much to act on directly.

An LLM is fluent in such a domain, and fast, and it fails the same boring, detectable ways every time. Not creatively — *predictably.* It names a thing that doesn't exist. It drops a version suffix the loader silently requires. It fabricates a parameter, an identifier, a field — confident, well-formed, wrong. The shape of the output is correct; the references underneath it are not. These are mechanical failures, the kind a parser catches on line one, the kind a domain expert spots at a glance. The model doesn't know it's wrong because nothing it has access to can tell it.

So we reach for the obvious container. We pour the knowledge into a *skill* — a page of prose that says *when you do this, watch out for that.* "Pin the revision." "Don't invent method names." "Validate before you emit." A caveat for every failure we've seen. The page is convenient, and it is the wrong container for a body of knowledge — because once the skill *is* the source of record, it rots.

## The cost of letting the skill be the source

Caveats don't compose. Two skills, each individually careful, contradict at the seam where they meet, and nothing reconciles them. The list grows; the model reads less of it as it grows. A caveat is advisory — the model may *mention* it and proceed anyway, because prose has no power to *stop* anything. And every caveat is a snapshot of one regression, frozen at the moment someone got burned; the domain moves, a new failure appears, and the prose says nothing about it. Worst of all, you cannot tell, reading the skill, which lines are hard-won truth and which are plausible-sounding filler written to round out the page. The source of record is unscrutinizable.

This is the same story in every structured domain. Two illustrations, deliberately far apart:

**Workflow construction.** An agent converts an analysis described in one system into a runnable workflow in another. It hallucinates a tool ID that was never published, or drops the revision the loader needs to resolve a step, or emits a document the parser rejects outright. A prose skill warns about each — until the next tool, the next format change, the next regression the prose never anticipated.

**Statistical method selection.** An agent is asked to analyze data and is productive but *not honest*: at worst it invents a method with a convincing name and no validity, runs it, and certifies its own output as sound. A prose skill listing "known invalid patterns" helps right up to the pattern it doesn't list — and even then, nothing forces the model to actually *check.*

Different domains, same rot. The failures are detectable. The prose that papers over them is not durable — because the thing doing the papering is also the thing being trusted.

## The turn: keep the knowledge, make it executable

The way out is to stop treating the skill as the source and put the knowledge back where it belongs — in a base built to be read — then make that base *actionable.* Two shifts, and they are the whole pattern.

**A knowledge base becomes actionable when its structure makes it executable.** Not a pile of notes an agent retrieves and hopes to read correctly — a *typed* source where each unit declares what it depends on, and that structure can be mechanically checked, compiled, and run. The knowledge stops being advice and becomes something a compiler can act on. When the structure is executable, a *gate* can stand between authored knowledge and a trusted result: an external check that does not self-certify. Sometimes that gate is a deterministic validator that parses the output and rejects what's malformed. Sometimes — where no validator can decide "is this *valid*" — the gate is itself authored knowledge cast into a referee that critiques and empirically calibrates before anything is certified. Either way, *doing does not terminate until the gate clears.*

**The skill becomes a compile target, not the authoring surface.** The thing an agent loads should not *be* the source of record — it should be a frozen artifact *compiled from* one, carrying a record of where it came from: which source revision, which model, which references resolved, which checks ran. The knowledge base stays the durable source of truth; the skill is one output cast from it. When the source corrects, you recast; drift becomes mechanically detectable instead of silently accumulating in prose nobody re-audits.

## What you get

Foreground the knowledge base, and two things fall out of it.

**A source that humans read and agents act on.** The knowledge base is an asset in its own right — inspectable, linkable, reviewable, owned. It does not exist only to feed a skill; it is the durable artifact the rest is cast from, and it stays legible to the people who maintain it.

**Skills that don't rot.** The most obvious thing you cast — and the most important — is a skill an agent loads to do one job. But because it is a compile target rather than a hand-written page, it is small and frozen, cast from a source that *was* built to be scrutinized. It is one output among possible targets, not the place the knowledge lives. The rot has nowhere to live, because nothing trustworthy is hand-written and frozen in isolation: it is generated, gated, and traceable.

That is the inversion. The knowledge base is the thing of value; the skill is what you cast from it when an agent needs to act.

The rest of this site makes that precise. [[the-model]] lays out the moving parts — the source, the unit, the compilation step, the gate, the provenance record. [[anatomy-of-an-instance]] walks one concrete Foundry end to end. And the argument for *why this is the right distribution choice* — why a skill should be a packaging format, not a source format — is [[skills-package-not-source]], which turns on [[the-two-assets]] no static skill can provide: traceability, and an enforced gate.
