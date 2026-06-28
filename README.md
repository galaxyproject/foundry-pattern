# The Foundry Pattern

An abstract site explaining **the Foundry Pattern** — the design pattern behind a knowledge
base that compiles itself into trustworthy, frozen skill artifacts with provenance, gated
by an external check that the authored knowledge never gets to skip.

It also makes a case: **agent skills should be a *packaging* format, not a *source*
format.** The skill is a compile target cast from an inspectable knowledge base; the
knowledge base — not the skill — is the source of record.

The pattern is documented in the abstract because it now has two concrete instances, and
abstraction earns itself at the diff between them:

- **Instance #1 — the [Galaxy Workflow Foundry](https://galaxyproject.github.io/foundry/)**:
  the gate is a deterministic CLI (`gxwf` parses and validates) — *the rails*.
- **Instance #2 — the Statistical Genomics Foundry**: the gate is an empirical referee
  loop (`analyze → referee → revise`, *doing never self-certifies*) — *the referee*.

Everything else — the knowledge base, Mold → Cast → provenance, the human-readable reading
surface — is the same. The variable is the gate.

## Layout

```
docs/
  CANON.md         ← authoring canon: terminology, claims, tone contract (read first)
  SITEMAP.md       ← the information architecture this content realizes
content/
  pattern/         ← The Pattern: the timeless, descriptive spec
    01-story.md            why skills rot — the generalized motivation
    02-the-model.md        KB → Mold → Cast → Provenance, abstractly
    03-guiding-principles.md
    04-anatomy-of-an-instance.md   invariants vs the variable gate
    05-glossary.md
  case/            ← The Case: the argument
    01-skills-package-not-source.md   ★ flagship
    02-the-two-assets.md              provenance + the gate
    03-comparisons.md                 compile-time-with-provenance vs runtime
    04-related-projects.md            the values table
  instances/       ← thin profiles + link-out, and the diff that justifies the pattern
    galaxy-workflow-foundry.md
    statistical-genomics-foundry.md
    the-diff.md
  blog/            ← evidence, experiments, and anything dated
    2026-06-blind-regeneration.md     ★ flagship experiment
    2026-05-landscape-snapshot.md
site/              ← Astro app (to be scaffolded)
```

## Status

Early. Content is being drafted; the Astro site is not yet scaffolded. See
`docs/SITEMAP.md` for the planned information architecture.
