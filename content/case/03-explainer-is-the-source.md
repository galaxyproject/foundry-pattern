---
title: "The Explainer Is the Source"
description: A cast artifact is flattened by design — that is what makes it a good package and a poor source. The structure understanding needs can only live upstream, which is why the Knowledge Base is written for a person and the skill is compiled from it.
section: case
order: 3
---

# The Explainer Is the Source

Two planks of The Case are defended. [[the-two-assets|Provenance and an enforced check]] are
what a frontier model cannot hand you, and
[[2026-06-blind-regeneration|the blind-regeneration experiment]] is the evidence.

A third plank carries as much weight and has only ever been asserted: the
[[the-model|Knowledge Base]] is *"authored to be read and learned by a human, not merely stored
for an agent to retrieve."* Nothing in the machinery requires that. Strip the human surface out
and provenance still records; the check still gates. That is not hypothetical — it is a real and
reasonable design: [[related-projects|Biomni]] keeps a machine-facing substrate with no human
surface and keeps traceable outputs without one.

So the human surface needs an argument. This page is that argument, and it is not the obvious one.

## Not to check the model

The intuitive defense — a human reads the KB to *check* it — is dead twice over, and this site
supplied half the evidence.

[[2026-06-blind-regeneration|Blind regeneration]] is our half. A model that had never seen the
original skill reproduced its canonical spine, its default parameters, and its citations, and
*spontaneously added validity caveats the original lacked*. The content is in the weights.

Geoffrey Litt's [*Understanding is the new
bottleneck*](https://www.geoffreylitt.com/2026/07/02/understanding-is-the-new-bottleneck) supplies
the other. Understanding-to-verify is a thumbs-up / thumbs-down question, and agents are getting
better and better at verifying their own work — which is good, and which raises the question he
then asks: where does that leave the human?

His answer is the one that survives: **understand to participate.** Not to grade the agent's work
but to be able to have the next idea, because *"it's never just one loop"* and *"the understanding
you have of the system is part of your ability to come up with the next idea to evolve it."*
(A fair objection to his title, raised when the talk appeared: understanding was arguably *always*
the bottleneck — [Peter Naur](https://pages.cs.wisc.edu/~remzi/Naur.pdf) argued in 1985 that the
program is a theory in the practitioner's mind, and the artifact is not the thing. What is new is
the rate at which the artifact now arrives without the theory.)

The obvious retort is that our own experiment cuts against us: the blind model's caveats looked
*better* than the original author's, so why prize human authorship? Because volume of caveats is
not judgment. The blind author emitted more candidate concerns *and could not tell you which of
its own citations were real*. Emitting concerns is what a fluent generator does; deciding which
are decision-grade, which the domain's check must refuse, and which are noise is the act it never
performed. The blind model demonstrated recall. A KB author supplies selection.

## Why the port holds

Litt's bottleneck exists *because agents write the code*: the human confronts an artifact they did
not author. A Foundry looks immune — the human authors the KB, and if you wrote the page you
understand it by construction.

That immunity is false, and naming why is the whole transfer. A Foundry's KB is authored *with
agents, at corpus scale*. [[guiding-principles|Corpus-First]] describes the ladder plainly: a broad
inexpensive scan to find where the cases live, a structural pass over candidates, selective deep
reads of the few that earn attention. That is agent work, and it means a KB page is exactly what
Litt describes — something you own but did not fully build. The threat is not that you never
understood your own knowledge base. It is that you can stop.

## What a package is

Here is the part the pattern already knew and never said out loud. From [[the-model|The Model]],
on what casting produces:

> The wiki-links that make the KB navigable are **resolved away or stripped**, so the artifact is
> self-contained.

A cast artifact is condensed, isolated, and frozen. That is not a defect — **flattening is what
packaging is**, and it is precisely why a cast skill is a good package: an agent should not have to
traverse a library to act.

But it means the choice of source format is a choice about structure. If the skill *is* the source,
your authoring surface is the flattened one — the artifact whose structure was stripped by design.
There is nowhere to put the worked example, the eval that never ships, the schema, the rationale,
the typed reference back to where a claim came from. They are condensed away or never exist. The KB
holds them because it is not the package: a [[glossary|Reference]] has a *kind*, and `eval`
references are Foundry-only, **never packaged** at all. The source is strictly richer than anything
cast from it, by construction.

And structure is what comprehension runs on. This is the best-replicated result in instructional
design, not a metaphor: in Mayer and Fiorella's review of multimedia principles, **spatial
contiguity** — putting related material adjacent rather than apart — is supported in 22 of 22
experimental tests at a median effect size of 1.10, and **signaling** — cueing the organization of
the essential material — in 24 of 28 at 0.41. A rendered page that puts a label beside the thing it
labels and makes structure visible is not decoration. It is the highest-leverage intervention the
field has measured, and it is the exact difference between a flat file and a KB.

So the inversion is not only about provenance. **It is what makes a structured surface possible at
all.**

## Authority

Litt's technique is reconstructive. An agent writes the code; a `/explain-diff` skill then produces
the explainer — background first, intuition before details, the diff re-ordered as prose he calls a
*"literate diff"*. It is a genuinely excellent artifact, and it is downstream: generated after the
fact, and carrying no authority. If it is wrong, the code still ships.

A Foundry runs the arrow the other way, and [[the-model|says so mechanically]]: *"The skill body
itself is never hand-maintained: if a cast looks under-instructed, you fix the Mold and re-cast."*
The human-legible artifact is the thing that compiles. Fix the page and the skill follows. That is
what authority means here, and it is the asymmetry: a wrong explainer is a bad document, a wrong KB
page ships a wrong skill.

A Foundry KB page is Litt's explainer, moved upstream and given authority.

He is doing understanding-*recovery* on code never authored for understanding, which is the only
move his situation allows. Skills are the case where the choice exists: a `SKILL.md` has no prior
existence to reconstruct — someone is about to write it.

## The ancestor

A reader who knows the field arrives here thinking *Knuth*, and they are right to.

[Literate programming](https://academic.oup.com/comjnl/article/27/2/97/343244) (Donald Knuth, *The
Computer Journal* 27(2), 1984) is this inversion, forty years early. Knuth's
[own summary](https://www-cs-faculty.stanford.edu/~knuth/lp.html): *"The main idea is to treat a
program as a piece of literature, addressed to human beings rather than to a computer."* WEB has one
authored source and two compilers — `tangle` extracts the machine artifact, `weave` produces the
human one. Litt's "literate diff" borrows the adjective from it. Two outputs of one source, and the
justification is the one this page has been making.

Three differences are real, and they are what a Foundry adds rather than restates:

- **Extraction versus generation.** `tangle` lifts code chunks out verbatim. A cast is a
  *transformation* — deterministic-first, LLM-second — and it records what each fragment came from.
  Knuth needed no provenance because nothing was rewritten; a Foundry needs it because things are.
- **No check.** WEB guarantees the document matches the code. It guarantees nothing about whether
  either is right. [[the-two-assets|The enforced check]] has no LP analogue at all.
- **Scope.** WEB serves one program's maintainers. A KB is domain knowledge outliving many casts.

And the honest half: literate programming was advocated for four decades by a Turing laureate and
did not take hold in general software engineering. The tempting rescue — *"it won in notebooks"* —
is wrong, and Jupyter's own creator says so. Fernando Pérez
[coined "literate computing"](https://web.archive.org/web/2019id_/http://blog.fperez.org/2013/04/literate-computing-and-computational.html)
for the notebook model — *"the weaving of a narrative directly into a live computation"* — and
distinguished it from Knuth explicitly: *"For the goals of communicating results in scientific
computing and data analysis, I think this model is a better fit than the literate programming one,
which is rather aimed at developing software."* Notebooks are not LP's victory. They are a different
paradigm that fit a domain LP did not.

Which is the useful fact, not the awkward one: the shape succeeds where computation and narrative
are the same act. That is scientific computing. That is where Foundries live.

## Why skills are where it compounds

Litt invokes **cognitive debt** — and the attribution deserves care on a page about provenance,
because the popular version is wrong. The term was named in an [MIT Media Lab
study](https://arxiv.org/abs/2506.08872) of essay writing (2025); [Margaret-Anne
Storey](https://margaretstorey.com/blog/2026/02/09/cognitive-debt/) carried it into software
engineering — *"technical debt lives in the code; cognitive debt lives in developers' minds"* — and
[Simon Willison](https://simonwillison.net/2026/Feb/15/cognitive-debt/) amplified it. Storey builds
it on Naur.

Code you don't understand bites you when you next touch it. The blast radius is you, later. A skill
you don't understand is applied *repeatedly, by agents, at scale, in your absence* — every
invocation is work you never see. And per [[fair-skills|the FAIR argument]], skills are read
back into the record and into training corpora as if refereed, so the debt does not stay yours; it
rides into the next model with no receipt.

Storey's companion concept is the sharper one, and it names this pattern's artifact from the
outside. Alongside cognitive debt she puts [**intent
debt**](https://arxiv.org/abs/2603.22106): *"the absence of externalized rationale that developers
and AI agents need to work safely with code."* Externalized *somewhere* — and a downstream explainer
is, by construction, not where anything was externalized. It is where something was reconstructed
afterward. A Mold's typed references are the rationale externalized at the point of authorship.
Note the phrase includes *and AI agents*: this is not a human amenity.

## What this does not claim

The temptation is to say a well-made KB *teaches*. It does not, and the evidence against that is
strong enough to state against ourselves.

**Beauty does not teach.** The best-replicated finding about attractive material in learning science
is *subtractive*: Mayer's **coherence principle** — exclude extraneous material — holds in 23 of 23
tests at a median effect size of 0.86, and Harp and Mayer showed that readers given "seductive
details (interesting but irrelevant details) recalled fewer main ideas." Rich rendering earns its
keep as *clarity*, never as ornament. (That principle is also, read sideways, an independent
empirical case for [[guiding-principles|Progressive Disclosure Over Context Flooding]]: exclude what
the moment does not need. Our version has a disclosure mechanism where Mayer has a delete key.)

**Navigation is not learning.** Hyperlinked text has been studied for decades and it does not come
out ahead: DeStefano and LeFevre's review found *"very little support for the idea that hypertext
will lead to an enriched experience of the text,"* a meta-analysis of learner control puts agency
over sequence at *g* = 0.05, and where an interest-driven reading strategy has been tested head to
head against a coherence-driven one, following interest never won. High prior knowledge leaves
readers *unaffected* by hypertext, not helped. So expertise makes a linked KB **cost-free**, not
pedagogically superior, and the honest claim is narrower and better aimed: hypermedia's benefits,
per Dillon and Gabbard, are *"limited to learning tasks depending on repeated manipulation and
searching of information."* That is what a practitioner does with a knowledge base. It is not what a
student does with a chapter — which is what the hostile studies measured.

So: the KB does not teach. It carries structure a package cannot, and it fits the way an expert
actually works. Those are the claims, and they are enough, because the alternative on offer is a
flat file that has neither and — lacking any source layer to put structure into — cannot acquire
them.

## Where Litt is ahead

Litt embeds a quiz at the bottom of each explainer and holds a rule: he will not send code to others
until he can pass it. *"A quiz is a speed regulator. Working with AI, it's easy for the loop to run
faster than the speed of human understanding."*

That is the same *move* as a Foundry's enforced check — interpose something the loop cannot
self-satisfy — pointed at a different object. A domain's check gates on whatever that domain means
by correct; his gates on comprehension. A Foundry has nothing that refuses to cast because the
author did not understand the page. He is simply ahead of us here.

Andy Matuschak makes the concession bigger than it looks. His argument in
[*Why books don't work*](https://andymatuschak.org/books/) is against **transmissionism** — *"the
notion that knowledge can be directly transmitted from teacher to student, like transcribing text
from one page onto another"* — because *"prose can't behave or respond to those thoughts as they
unfold."* He is why Litt built a quiz rather than only an explainer. Read strictly, he indicts the
phrase this page is defending: *read and learned by a human* is a transmissionist claim wherever
nothing checks the reading.

We accept that. The pattern already owns both halves of the missing machinery — a check that refuses
to terminate, and casting parameterized by target — and has never pointed them at comprehension.
That is the direction, and it is not built.

## Casting for the human

[[the-model|A Target]] is *"the output format a cast produces"*, and one Mold may cast to several.
The targets in play are agent-facing; a *baked-in bundle* is the closest thing to an exception and
was never a comprehension surface. Litt's real insight is that **agents can build artifacts for
humans**. So a Foundry can cast a human target: same Mold, same typed references, same provenance,
rendered as an explainer instead of a `SKILL.md`. That is a new target on existing multi-target
casting, not new machinery.

What it buys is the thing Litt's explainer structurally cannot have: **a provenanced explainer**.
Every claim traceable to a Mold revision and a resolved reference — `src_hash == dst_hash` where
nothing was paraphrased. An explainer generated from code has no source of record to point at.

And two casts of one Mold cannot drift **silently**. Not "cannot drift" — they are two independent
condensation runs and nothing recasts them atomically, so they can absolutely diverge. But both name
the same Mold revision, and [[the-model|provenance makes drift mechanically detectable]]: re-hash and
a stale artifact announces itself. Detectable, not impossible; that is the whole reason the record
exists.

For a statistical-genomics Foundry the natural human target is a notebook — Pérez's literate
computing, in the domain where it already won. That is design, not shipped code.

## The honest cost

Litt's techniques work today, cheaply, on code you already have. A Foundry asks you to author a
knowledge base first and only repays that where knowledge outlives many casts. For knowledge you
will use once, or a domain with no durable canonical content, the KB never amortizes and
`/explain-diff` is simply the right tool.

The strongest argument against this page is [Vivek
Haldar's](https://vivekhaldar.com/articles/cognitive-debt-is-leverage/), published two days after
Litt's talk. He concedes cognitive debt is real, then: *"A good abstraction lets you think at a
higher level precisely because it lets you safely forget the lower-level details. Forgetting is what
abstractions are for."* We are, he argues, in a transitional patch — *"enough automation to create
distance, not enough automation to create trust."* If he is right, understand-to-participate has an
expiry date, and this page killed understanding-to-verify with exactly that logic.

He is right, and the condition he names is the answer. *Safely* forget. You can forget the scheduler
because there is a contract, and something enforces it. An abstraction is safe to forget in
proportion to what gates it — which is why this pattern's second asset is a check the doing cannot
route around. So: forget precisely as much as your check covers. For a domain whose notion of
correct no tool can decide, that is not much, and what remains uncovered is where a human still has
to be. Haldar does not refute the argument. He supplies its boundary condition, and the work is to
move that boundary — not to pretend it isn't there.

Nothing here implies Litt endorses this pattern; the thesis is his, the port is ours.

## Close

The KB is not a book with better typography. It is the only layer where structure can exist, because
the layer below it is flattened on purpose — and flattening the package is the right call, which is
exactly why the source must be something else.

That is what the [[skills-package-not-source|source-versus-package inversion]] buys beyond
traceability: somewhere for the worked example, the eval that never ships, the reference back to
where a claim came from, and the rationale that would otherwise be reconstructed too late by someone
guessing. [[the-two-assets|Provenance makes the knowledge auditable and the check makes the doing honest]];
the human surface is what keeps the person who authored the knowledge able to author the
next of it.

The skill is the package. The explainer is the source.

For the machinery, see [[the-model]]; to build one, [[setting-up-a-foundry]].
