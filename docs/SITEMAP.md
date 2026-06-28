# Site map — The Foundry Pattern

The information architecture this repo realizes. Three products under one roof, plus
instances as living proof. Decisions locked: thin instance profiles + link-out; one
flagship essay for The Case; the pattern is named **"The Foundry Pattern"** (instances are
"Foundries"); **"the gate"** is the abstract umbrella term (realized as *rails* in Galaxy,
*referee* in stat-gen).

```
Home  ............................. the bet in one breath + three doors
│
├── 1. THE PATTERN  ............... the timeless, domain-free spec
│   ├── Story ..................... why skills rot — generalized motivation       [pull: foundry story, de-domained]
│   ├── The Model ................. KB → Mold → Cast → Provenance, abstractly     [adapt: ARCHITECTURE/COMPILATION]
│   ├── Guiding Principles ........ the principles, corpus/target made generic    [pull: guiding-principles]
│   ├── Anatomy of an Instance .... invariants vs the variable gate              [NET-NEW — spine]
│   └── Glossary ................. Mold, Cast, Provenance, Pipeline, the gate     [pull: glossary, instance terms dropped]
│
├── 2. THE CASE  ................. the argument
│   ├── Skills: Package, Not Source ★ flagship — "the problems with skills"      [NET-NEW]
│   ├── The Two Assets ........... provenance + the gate (the non-commodities)    [NET-NEW]
│   ├── Comparisons / Landscape .. compile-time-with-provenance vs runtime        [pull: comparisons Part A]
│   └── Related Projects ......... the values table                               [NET-NEW — issue #2 rows]
│
├── 3. INSTANCES  ............... the pattern, twice, as proof
│   ├── Galaxy Workflow Foundry .. thin profile + link-out; gate = gxwf (rails)
│   ├── Statistical Genomics ..... thin profile + link-out; gate = referee loop
│   └── The Diff ................. what generalized vs what stayed local          [NET-NEW — spine]
│
└── 4. BLOG / LAB  ............. evidence, experiments, anything dated
    ├── Blind Regeneration ........ ★ flagship experiment (issue #2)              [NET-NEW]
    └── Landscape Snapshot 2026-05  the dated survey                              [pull: comparisons Part B]
```

## Load-bearing docs

The abstraction's whole weight rests on two net-new pages: **Anatomy of an Instance**
(Pattern) and **The Diff** (Instances). Everything else is invariant across both foundries;
only the gate changes — and those two pages are where that contrast is made explicit. The
flagship **Skills: Package, Not Source** is the front door to The Case; **Blind
Regeneration** is its evidence; **Landscape Snapshot** absorbs the one dated survey so the
spec never carries a date.

## Pull-through map (old foundry → here)

| Source | Lands at | Change |
|---|---|---|
| `foundry` story / `FoundryStory` | Pattern → Story | strip Galaxy specifics; one concrete example as illustration |
| `foundry` guiding-principles | Pattern → Guiding Principles | "IWC corpus"→"grounding corpus", "gxformat2"→"target format"; all principles survive |
| `foundry` glossary | Pattern → Glossary | drop gxformat2/IWC/gxwf; keep Mold/Cast/Provenance/Pipeline; add "the gate" |
| `foundry` comparisons Part A | Case → Comparisons | keep ~as-is (already abstract) |
| `foundry` comparisons Part B | Blog → Landscape Snapshot | move verbatim; it is explicitly dated |
