---
title: Story
description: Why hand-authored skills rot — and the turn that makes a knowledge base executable and a skill trustworthy.
section: pattern
order: 1
---

# Why Skills Rot

An LLM can read a paper, a spec, a pipeline written in some other system, and propose work in a structured domain. It is fluent. It is fast. And it fails the same boring, detectable ways every time.

Not creatively. *Predictably.* It names a thing that doesn't exist. It drops a version suffix that the loader silently requires. It fabricates a parameter, an identifier, a field — confident, well-formed, wrong. The shape of the output is correct; the references underneath it are not. These are not subtle failures. They are mechanical ones, the kind a parser catches on line one, the kind a domain expert spots in a glance. The model doesn't know it's wrong because nothing it has access to can tell it.

So we reach for the obvious patch: write it down. Author a skill — a page of prose that says *when you do this, watch out for that.* "Remember to pin the revision." "Don't invent method names." "Validate before you emit." A caveat for every failure mode we've seen.

This works, briefly, and then it rots.

## The rot

Caveats don't compose. Two skills, each individually careful, contradict at the seam where they meet, and nothing reconciles them. The list grows; the model reads less of it as it grows. A caveat is advisory — the model may *mention* it and proceed anyway, because prose has no power to *stop* anything. And every caveat is a snapshot of one regression, frozen at the moment someone got burned. The domain moves, a new failure appears, and the prose says nothing about it. Worse, you cannot tell, reading the skill, which lines are hard-won truth and which are plausible-sounding filler the author (human or model) wrote to round out the page. The skill *is* the source of record, and the source of record is unscrutinizable.

This is the same story in every structured domain. Two illustrations, deliberately far apart:

**Workflow construction.** An agent converts an analysis described in one system into a runnable workflow in another. It hallucinates a tool ID that was never published. It drops the `+galaxyN` revision the loader needs to resolve a step. It emits a workflow document the parser rejects outright. A prose skill warns about each — until the next tool, the next format change, the next regression the prose never anticipated.

**Statistical method selection.** An agent is asked to analyze genomic data. It is productive and *not honest*: at worst it invents a method with a convincing name and no validity, runs it, and certifies its own output as sound. A prose skill listing "known invalid patterns" helps right up to the pattern it doesn't list — and even then, nothing forces the model to actually *check*. Knowing a caveat and being gated by one are different things.

Different domains, same rot. The failures are detectable. The prose that papers over them is not durable.

## The turn

The way out is two shifts, and they are the whole pattern.

**A knowledge base becomes useful when its structure makes it executable.** Not a pile of notes an agent retrieves and hopes to read correctly — a *typed* source where each unit declares what it depends on, and that structure can be mechanically checked, compiled, and run. The knowledge stops being advice and becomes something a pipeline can act on. When the structure is executable, a *gate* can stand between authored knowledge and a trusted result: an external check that does not self-certify. Sometimes that gate is a deterministic validator that parses the output and rejects what's malformed. Sometimes — where no validator can decide "is this *valid*" — the gate is itself authored knowledge cast into a referee that critiques and empirically calibrates before anything is certified. Either way, *doing does not terminate until the gate clears.* A caveat the model might mention becomes a check the work cannot route around.

**A skill becomes trustworthy when its source stays inspectable.** The skill an agent loads should not *be* the source of record — it should be a frozen artifact *compiled from* one, carrying a record of where it came from: which source revision, which model, which references resolved, which checks ran. Then you can ask of any claim: is this real, and where did it come from? The skill is a package. The knowledge base is the source. Provenance is the trail between them. When the source corrects, you recast; drift becomes mechanically detectable instead of silently accumulating in prose nobody re-audits.

That is the inversion. The skill stops being the authoring surface and becomes a *compile target*. The rot has nowhere to live, because nothing trustworthy is hand-written and frozen in isolation — it is generated, gated, and traceable back to a source built to be read.

The rest of this site makes that precise. [[the-model]] lays out the moving parts — the source, the unit, the compilation step, the gate, the provenance record. [[anatomy-of-an-instance]] walks one concrete Foundry end to end. And the argument for *why this is the right distribution choice* — why skills should be a packaging format, not a source format — is [[skills-package-not-source]], which turns on [[the-two-assets]] no static skill can provide: traceability, and an enforced gate.
