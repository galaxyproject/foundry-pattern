# The Foundry Pattern

**📖 Read it: [galaxyproject.github.io/foundry-pattern](https://galaxyproject.github.io/foundry-pattern/)**

An abstract site explaining **the Foundry Pattern** — the design pattern behind a knowledge
base of deep domain knowledge that compiles itself into trustworthy, frozen skill artifacts
with provenance. A substrate each domain extends, not a template to stamp.

It also makes a case: **agent skills should be a *packaging* format, not a *source*
format.** The skill is a compile target cast from an inspectable knowledge base; the
knowledge base — not the skill — is the source of record.

The pattern now has three concrete instances. It first earned its abstraction at the diff
between the first two; the third is the active falsification and hardening exercise — narrowing
the **substrate** to what actually transfers while improving shared contracts for the earlier
instances:

- **Instance #1 — the [Galaxy Workflow Foundry](https://galaxyproject.github.io/foundry/)**:
  extends with *pipelines* (sequential construction) and a deterministic CLI check
  (`gxwf` parses and validates) — *the rails*.
- **Instance #3 — the [TDA Bioinformatics Foundry](https://jmchilton.github.io/bio-topo-foundry/)**:
  the rigorous reference build, connecting frontier TDA research to reproducible environments,
  replication evidence, packaging, and eventual Galaxy delivery while hardening the shared substrate.
- **Instance #2 — the Statistical Genomics Foundry**: extends with an empirical referee
  check (`analyze → referee → revise`, *doing never self-certifies*) — *the gate*.

The generated catalogs compute what is shared across all three rather than preserving an N=2
claim by hand. What varies is what each domain extends the substrate with.

## Layout

```
docs/
  CANON.md         ← authoring canon: terminology, claims, tone contract (read first)
  SITEMAP.md       ← the information architecture this content realizes
content/
  pattern/         ← The Pattern: the timeless, descriptive spec
    story.md               why skills rot — the generalized motivation
    the-model.md           KB → Mold → Cast → Provenance, abstractly
    guiding-principles.md
    principles-in-action.md     concrete implementation case studies
    anatomy-of-an-instance.md   the substrate vs the extension surface
    glossary.md
  case/            ← The Case: the argument
    01-skills-package-not-source.md   ★ flagship
    02-the-two-assets.md              provenance (universal) + the enforced check
    03-comparisons.md                 compile-time-with-provenance vs runtime
  instances/       ← thin profiles + link-out, and the diff that justifies the pattern
    galaxy-workflow-foundry.md
    topological-data-analysis-bioinformatics-foundry.md
    statistical-genomics-foundry.md
    the-diff.md
  blog/            ← evidence, experiments, and anything dated
    2026-06-blind-regeneration.md     ★ flagship experiment
    2026-05-landscape-snapshot.md
site/              ← Astro app
```

## Status

Drafted and standing. 14 content pages across the four sections, plus a working
Astro site (`site/`) — wiki-link resolution, prev/next, and Pagefind full-text
search; `npm test`, `npm run build` and `npm run typecheck` are clean. See `docs/SITEMAP.md`
for the information architecture and `docs/CANON.md` for the authoring contract.

Hosted on GitHub Pages at
[galaxyproject.github.io/foundry-pattern](https://galaxyproject.github.io/foundry-pattern/)
(auto-deployed from `main` via `.github/workflows/deploy.yml`). Not yet settled: a
content schema/validator akin to the instances' `meta_schema`.

```sh
cd site
npm install
npm run dev      # dev server (search needs a build)
npm test         # the catalog's cross-instance claims, against the vendored manifests
npm run build    # static build + Pagefind index
npm run preview  # serve the build, search included
```
