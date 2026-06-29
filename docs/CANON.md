# Authoring canon — The Foundry Pattern site

This is the shared terminology, claims, and tone contract for every document on this
site. It exists so independently-drafted pages stay consistent. Read it before writing
or editing any content page. It is an internal authoring doc, not a reader-facing page.

## What this site is

An **abstract** site that explains *the Foundry Pattern* — the design pattern behind two
concrete projects (the Galaxy Workflow Foundry and the Statistical Genomics Foundry). It
is deliberately domain-free. The concrete projects are "instances"; this site is the
pattern they share. The pattern earns its abstraction at the **diff** between the two
instances (N=2): what stayed the same is the **substrate**, what each domain adds on top is
its **extension**. The pattern is a substrate to extend, not a cookie cutter — meant to be
*applied and extended* per domain, never stamped out.

Three products under one roof:
- **The Pattern** — the timeless, descriptive spec (what a Foundry *is*).
- **The Case** — the argument (why skills should be a *packaging* format, not a *source*
  format). Front door: the flagship essay "Skills: Package, Not Source."
- **The Blog / Lab** — evidence, experiments, and anything *dated* (so the spec never
  carries a date).

## Naming (use exactly these)

- **The Foundry Pattern** — the pattern this site documents. Capitalized.
- **A Foundry** / **an instance** — a concrete project applying the pattern. The two
  current instances: **the Galaxy Workflow Foundry** (instance #1) and **the Statistical
  Genomics Foundry** (instance #2).
- Avoid "Foundry" bare when you mean the pattern; say "the Foundry Pattern."

## The substrate (invariant — identical across instances)

A **Knowledge Base (KB)** of deep domain knowledge whose *structure* makes it executable,
compiled into frozen skill artifacts:

- **Knowledge Base (KB)** — an inspectable, human-readable source-of-truth. Authored to
  be *read and learned by a human*, not merely stored for an agent to retrieve.
- **Mold** — the unit of the KB: an abstract, typed *reference manifest* describing one
  action. It declares the references it depends on (other KB pages, schemas, CLI manual
  pages, prompts, examples). Molds are abstract source artifacts, independent of any
  agent runtime.
- **Cast** — the compilation step (deterministic tooling + LLM, in that order of trust)
  that turns a Mold into a target-specific **skill artifact**. Casting is the
  *integration boundary*: artifacts are condensed, isolated, frozen, with no links back.
- **Provenance** — a record (`_provenance.json`) emitted beside every cast artifact:
  which Mold revision, which model version, which references resolved, which checks ran.
  The durable, universal non-commodity asset — present in every instance.
- **Target** — the format a cast produces (e.g. an Anthropic Agent Skill, a generic
  skill, a baked-in bundle). The KB stays the source of truth; the target is one output.

`SKILL.md` (or any skill file) is therefore a **compile target**, never the authoring
surface. The KB is the source; the skill is the package.

## The extension surface (per-domain — NOT universal vocabulary)

Applying the pattern means bringing deep domain knowledge and **extending** the substrate
with what the domain needs: its grounding corpus, target format(s), any composition layer,
and the external check its notion of "correct" admits. These are extensions, not required
slots — a third Foundry will need its own. **Do not hoist instance terms into general
pattern vocabulary.** In particular:

- **Pipelines belong to the Galaxy Workflow Foundry.** An ordered sequence of Molds for an
  inherently sequential task (workflow construction). A composition extension; instance #2
  (Mold-primary) needs none. Not part of the substrate.
- **"The gate" belongs to the Statistical Genomics Foundry.** It is that instance's name
  for its external check.

**The external check** is the role both instances fill (honoring "deterministic tools do
deterministic work" / don't let the model grade itself), but *what it is* differs completely
by domain and there is no universal "gate":

- **Galaxy Workflow Foundry — "the rails."** `gxwf` parses and validates gxformat2 and tool
  steps. Failure modes (hallucinated tool IDs, dropped `+galaxyN` revisions, bad
  `tool_state`) are caught *mechanically*, not by prose caveats. A parser you call.
- **Statistical Genomics Foundry — "the gate" / an empirical referee ("doing never
  self-certifies").** No CLI can decide "is this statistical method valid," so the check is
  itself *authored knowledge cast into a skill*: an `analyze → referee → revise` loop.
  Analysis may not terminate in self-certification; it must hand off to a referee whose
  verdict gates certification. The referee both *critiques* (reasons about known invalidity
  patterns) and *calibrates* (constructs and runs an empirical check — permutation under
  the null, simulation-under-truth, calibration). A deliverable you construct.

Write neutrally about "the domain's external check" at the pattern level; use "the rails"
and "the gate"/"referee" only on or about the instance that coined them.

## The argument (The Case) — claims we make

Thesis: **skills are a packaging/distribution format, not a source/authoring format.**

The dominant pattern ("agent skills for X") treats `SKILL.md` as the authoring surface —
a human (often with an LLM) writes the skill, and the skill *is* the source of record.
The Foundry Pattern inverts this: the skill is a compile target cast from a curated KB,
with provenance back to the source revision.

Skills-as-source has two compounding costs:
1. **No traceability.** You cannot tell, from a skill, which claims/citations/thresholds
   are real-and-verified vs. plausibly-confabulated. Humans can't scrutinize or correct
   against a source; agents can't reason about what knowledge exists.
2. **Depreciating moat + a training-data feedback loop.** For canonical content, a frontier
   model regenerates equal-or-better material on demand, so a static restatement adds
   little — and that margin shrinks as models improve. Worse: a corpus of unverified,
   model-generated restatements becomes training data — model output fed back as ground
   truth, with no provenance to catch errors. A degenerative loop for the scientific
   record *and* for future training corpora.

The two **non-commodity assets** that answer both costs:
- **Provenance** *(the universal asset)* — which specific claim is real and where it came
  from; rides with every cast in every domain.
- **An enforced check** *(realized per domain)* — an external verdict, not an optional
  caveat. Knowing ≠ gating: a model may *mention* a caveat, but only an enforced check makes
  doing *not terminate* until it clears. The most sharply non-commodity version is the one a
  domain must *construct* — marquee example: the stat-gen referee.

Restating canonical knowledge is a commodity. *Traceable, check-backed* knowledge is not.

Compile-time framing: the field defaults to *attach KB, retrieve at runtime*. The Foundry
Pattern bets on **compile-time grounding with provenance** — a deterministic pipeline
casts selected KB slices into target artifacts, provenance is recorded, drift becomes
mechanically detectable. Runtime fetch augments, never replaces, compiled grounding.

## The evidence — the blind-regeneration experiment

A falsifiable test of "redundant for frontier models": an independent frontier-model agent
authored a skill *cold* (never shown the original), then we diffed against the real one.
A light page (`single-cell/clustering`) and a decision-grade page
(`experimental-design/multiple-testing`) were regenerated blind. The blind model
reproduced the canonical spine and default parameters — and reproduced *citations from
memory*, including fuzzy ones — so you cannot tell from the output which are correct. It
even *spontaneously added* more validity caveats than the original. Conclusion: restatement
is commodity (stronger for lighter/more-canonical skills); what no static skill provides is
**enforcement** (an enforced check) and **traceability** (provenance). "Knowing ≠ gating." This is the
empirical backbone of The Case. (Honest caveats: N=2 skills, single model family, overlap
judged by the same model, citations not independently verified — verifying them would
*itself* demonstrate the provenance gap.)

## Tone contract (non-negotiable, applies site-wide)

Every system we compare against is **good at what it does**. We link to it, credit its
strengths honestly, and claim distinctness only on axes we can defend. The goal is to
*locate ourselves*, not to diminish anyone. Where a "distinction" turns out false on
verification, strike it — positioning built on a strawman is worse than no positioning.
In particular, The Case is an argument *about a distribution choice (source vs package)*,
framed at the pattern level — **not** a critique of any specific skills project. Name
neighbors graciously (e.g. bioSkills is good at the artifact layer and valuable for weaker
models; our claim is about the layer beneath and the human surface above).

Conceded similarities (never claim as uniquely ours): building skills; multi-runtime
portability; running empirical non-self-certifying checks (POPPER does this); inspectable
file storage; LLM self-critique.

## Style

- Concise; sacrifice grammar for concision where it sharpens.
- Prefer the abstract noun ("the target format", "the grounding corpus") over instance
  specifics ("gxformat2", "IWC") *in Pattern pages*; use concrete instances only as
  illustration. The Case and Instances pages may be concrete.
- Wiki-link related pages with `[[slug]]`.
- Markdown, KaTeX allowed for math.
