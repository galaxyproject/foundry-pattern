# Site map — The Foundry Pattern

The information architecture this repo realizes. Three products under one roof, plus
instances as living proof. Decisions locked: thin instance profiles + link-out; one
flagship essay for The Case; the pattern is named **"The Foundry Pattern"** (instances are
"Foundries"). The pattern is a **substrate each domain extends**, not a cookie cutter:
**pipelines** belong to Galaxy and **"the gate"** to stat-gen — instance terms, *not*
universal vocabulary. At the pattern level write neutrally about "the domain's external
check"; **provenance** is the one universal non-commodity asset.

```
Home  ............................. the bet in one breath + three doors
│
├── 1. THE PATTERN  ............... the timeless, domain-free spec
│   ├── Start here
│   │   ├── Story ................. why handwritten skills rot
│   │   ├── The Model ............. KB → Mold → Cast → Provenance, abstractly
│   │   ├── Guiding Principles .... the disciplines that keep a Foundry trustworthy
│   │   └── Principles in Action .. how current instances realize those principles
│   ├── Domain profile
│   │   └── Foundries for Bioinformatics  typed scientific knowledge + reproducible, portable, audited evidence
│   ├── Build one
│   │   ├── What a Foundry Needs .. the substrate and the extension boundary
│   │   ├── Plan Your Foundry ..... a stack-neutral route through domain decisions
│   │   └── Build with the Astro Stack  one concrete implementation
│   └── Reference
│       ├── Astro-Stack Glossary .. vocabulary introduced by the implementation
│       ├── Kind Catalog .......... generated content-kind contracts
│       ├── Tag Catalog ........... generated controlled vocabularies
│       ├── Design Records ........ self-documenting content/meta contract and routing index
│       └── Glossary .............. the pattern's canonical terms
│
├── 2. THE CASE  ................. the argument
│   ├── Skills: Package, Not Source ★ flagship — "the problems with skills"      [NET-NEW]
│   ├── The Two Assets ........... provenance (universal) + the enforced check    [NET-NEW]
│   ├── The Explainer Is the Source  the third plank — why the KB is human-legible [NET-NEW]
│   ├── FAIR Skills ............... the outside witness — FAIR converged on R1.2/R1.3 [was blog; de-dated]
│   └── Comparisons .............. Part A positioning (stable) + Part B landscape (dated, refreshed) [pull: comparisons Part A + B]
│
├── 3. INSTANCES  ............... three domains testing and hardening the pattern
│   ├── Galaxy Workflow Foundry .. thin profile + link-out; check = gxwf (rails)
│   ├── TDA Bioinformatics ....... active reference build + link-out; check evolving
│   ├── Statistical Genomics ..... thin profile + link-out; check = referee loop
│   └── The Diff ................. original N=2 diff + the third-instance test     [NET-NEW — spine]
│
└── 4. BLOG / LAB  ............. evidence, experiments, anything dated
    └── Blind Regeneration ........ ★ flagship experiment (issue #2)              [NET-NEW]
```

## Load-bearing docs

The abstraction's whole weight rests on two net-new pages: **What a Foundry Needs**
(Pattern) and **The Diff** (Instances). The substrate is what survives across all three foundries;
what each domain extends it with varies — and those two pages are where that contrast is made explicit. The
flagship **Skills: Package, Not Source** is the front door to The Case; **Blind
Regeneration** is its evidence. The Case's three argument planks run 1–3 (inversion → the
two assets → the human surface), then **FAIR Skills** at 4 as the *outside witness* — the
only page that argues from someone else's standard rather than from our own derivation —
before the two map pages at 5–6. **The Explainer Is the Source** is the third plank, and the
only one arguing for a *reader*, so the KB's "read and learned by a
human" clause is defended rather than asserted. **Comparisons** carries the one dated survey as its Part B —
a periodically-refreshed landscape snapshot — kept in The Case, not the Pattern, so the
*spec* never carries a date even though the argument's landscape reading does.

**Foundries for Bioinformatics** is the Pattern's one applied domain profile and appears as a
callout between the recommended route and implementation guidance. It keeps source identity,
executable computation, packaging portability, and scientific validity as separate receipts; its
concrete technologies illustrate an extension without redefining the substrate.

## Pull-through map (old foundry → here)

| Source | Lands at | Change |
|---|---|---|
| `foundry` story / `FoundryStory` | Pattern → Story | strip Galaxy specifics; one concrete example as illustration |
| `foundry` guiding-principles | Pattern → Guiding Principles | "IWC corpus"→"grounding corpus", "gxformat2"→"target format"; all principles survive |
| `foundry` glossary | Pattern → Glossary | drop gxformat2/IWC/gxwf; keep Mold/Cast/Provenance; scope Pipeline + "the gate" as instance terms |
| `foundry` comparisons Part A | Case → Comparisons (Part A) | keep ~as-is (already abstract) |
| `foundry` comparisons Part B | Case → Comparisons (Part B) | de-domain (IWC → external exemplar); keep citations + Refresh log; stays a dated, on-demand-refreshed sweep |
