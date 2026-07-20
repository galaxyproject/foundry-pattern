# The Foundry Pattern

**📖 Read it: [galaxyproject.github.io/foundry-pattern](https://galaxyproject.github.io/foundry-pattern/)**

An abstract site explaining **the Foundry Pattern** — the design pattern behind a knowledge
base of deep domain knowledge that compiles itself into trustworthy, frozen skill artifacts
with provenance. A substrate each domain extends, not a template to stamp.

It also makes a case: **agent skills should be a *packaging* format, not a *source*
format.** The skill is a compile target cast from an inspectable knowledge base; the
knowledge base — not the skill — is the source of record.

The pattern is documented in the abstract because it now has two concrete instances, and
abstraction earns itself at the diff between them — the **substrate** transfers, while each
domain brings its own knowledge and the machinery its work demands:

- **Instance #1 — the [Galaxy Workflow Foundry](https://galaxyproject.github.io/foundry/)**:
  extends with *pipelines* (sequential construction) and a deterministic CLI check
  (`gxwf` parses and validates) — *the rails*.
- **Instance #2 — the Statistical Genomics Foundry**: extends with an empirical referee
  check (`analyze → referee → revise`, *doing never self-certifies*) — *the gate*.

Everything load-bearing — the knowledge base, Mold → Cast → provenance, the human-readable
reading surface — is the same substrate. What varies is what each domain extends it with.

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
    principles-in-action.md     the principles incarnated in the two instances
    anatomy-of-an-instance.md   the substrate vs the extension surface
    glossary.md
  case/            ← The Case: the argument
    01-skills-package-not-source.md   ★ flagship
    02-the-two-assets.md              provenance (universal) + the enforced check
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

Drafted and standing. 14 content pages across the four sections, plus a working
Astro site (`site/`) — wiki-link resolution, prev/next, and Pagefind full-text
search; `npm run build` and `npm run typecheck` are clean. See `docs/SITEMAP.md`
for the information architecture and `docs/CANON.md` for the authoring contract.

Hosted on GitHub Pages at
[galaxyproject.github.io/foundry-pattern](https://galaxyproject.github.io/foundry-pattern/)
(auto-deployed from `main` via `.github/workflows/deploy.yml`). Not yet settled: a
content schema/validator akin to the instances' `meta_schema`.

```sh
cd site
npm install
npm run dev      # dev server (search needs a build)
npm run build    # static build + Pagefind index
npm run preview  # serve the build, search included
```
