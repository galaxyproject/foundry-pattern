---
title: Related Projects
description: A gracious map locating neighbor projects against the axes the Foundry Pattern cares about — credit on shared axes, distinctness only where verification holds.
section: case
order: 6
---

# Related Projects

This is a **map, not a scoreboard.** Every project below is good at what it does; we
link to it and credit its strengths. A project can be excellent and still leave some of
these axes open — that is the nature of a map, not a knock. The columns are the axes *the
Foundry Pattern* cares about, so a system whose strength lies elsewhere will read sparse
here: a sparse row means *off-axis*, not *deficient*. (POPPER is the clearest case — its
real strength, an error-controlled empirical referee, isn't a column at all; we credit it
in prose below.) Where a "distinction" fails verification, we strike it. See also
[[comparisons]] for the compile-time-vs-runtime framing and [[skills-package-not-source]]
for the argument these rows support.

## The values table

| Project | Produces skills? | Progressive disclosure | Traceability (humans + agents) | CLI invocation: derived vs improvised | Portability | Human scrutiny of data behind skills | KB-backed? |
|---|---|---|---|---|---|---|---|
| **bioSkills** | Yes (~547 files) | None (flat skill files) | In-prose cites; no provenance | **Derived** — version-pinned, introspects API | High (5 runtimes + conversion) | Hand-authored; readable + editable | No |
| **POPPER** | No (in-process library) | — | — (validation framework) | — | Low (Python lib) | — | No |
| **Biomni** | Tools into own registry (not portable skills) | None (agent UI) | Traceable outputs (credit); KB machine-facing | — | Low (framework-bound) | Source readable in-repo; no reader surface | Partial (machine-facing substrate) |
| **knowledgebase-mcp** *(cluster)* | No (retrieval server) | None (operator CLI) | Source paths + line ranges (credit) | — | Corpus portable; MCP-bound | Operator-inspectable; not a reader surface | Yes (operator-facing) |
| **awesome-genomic-skills** | No (index of others' skills) | None (flat catalog) | Links out (discovery layer) | — | n/a (a list) | — | No |
| **The Foundry Pattern** | Yes (cast targets) | Yes (navigable reader's KB) | Yes — provenance, cited + linked, for humans *and* agents | **Derived** — from referenced manual pages | Yes (cast targets) | Yes — read / correct / trace / contribute to the KB | Yes |

Cells use "—" or "n/a" honestly where an axis doesn't apply to a system's shape (a
library, a referee framework, and a catalog are not in the skill-packaging business, so
their packaging cells are blank by kind, not by failing).

## The closest neighbors

**bioSkills** — nearest on *produces skills*, and more formidable than a quick read
suggests. Concede plainly: hundreds of skills across dozens of categories, genuinely
**multi-runtime** (five targets plus conversion), and a **signature CLI-version
discipline** — mandatory version-compatibility blocks, introspection commands, "adapt to
the installed API rather than retry." Their embedded statistical wisdom is excellent
("thresholds are conventions, not laws") and their relationship fields (`depends_on`,
`Related Skills`) are format-validated. The distinction is **layer, not quality**: in
bioSkills the skill files *are* the source, hand-authored; in the Foundry Pattern they are
derived artifacts **cast** from an inspectable abstract source-of-truth, each carrying
provenance, with a human reader's surface above and an external check beside. A
different layer of the stack — not a better skills list. (We do *not* claim it is
Claude-only, not-for-humans, or relationship-free; all three were checked and are false.)

**POPPER** — nearest on the empirical-referee axis, and the table's axes don't
flatter it precisely *because* its strength is off this map. Concede the strongest thing
first: POPPER is a **genuine empirical, non-self-certifying referee** with **provable
Type-I error control** (e-values, Vovk–Wang), using permutation tests and negative
controls — that posture is **shared**, not ours to claim. The distinction is the **unit
refereed**: POPPER controls error over the falsification *decision*, *assuming* each
experiment yields a valid p-value; the Foundry Pattern referees the prior question — *is
the method producing that p-value itself valid?* — and delivers it as a foregrounded,
inspectable KB that casts portable skills, not an in-process library call. The referee
posture is common ground we credit; only the unit and the delivery differ. (We do *not*
claim its checks are weak or non-empirical — that is refuted and unfair.)

## Verification discipline

Every claim in these rows is checked against **primary sources** — repositories, papers,
and live sites — and a distinction that fails verification is **struck**, not softened.
This is not hypothetical: three hypothesized limitations of bioSkills (Claude-only,
not-human-readable, no formal relationships) were **refuted on inspection and dropped**,
and the empirical-referee axis is recorded as *shared with POPPER* rather than claimed.
Positioning built on a strawman is worse than no positioning.

One row carries a caveat worth flagging in the open: **knowledgebase-mcp** is a
**name-cluster, not a single project** — the name resolves to several agent-facing
retrieval MCP servers (`jeanibarz/knowledge-base-mcp-server`, `Geeksfino/kb-mcp-server`,
`olafgeibig/knowledge-mcp`), none science-specific. The cell values hold across the
cluster; if a specific repo is meant, confirm the owner. Any row added later without a
primary-source check will be marked **unverified** until one is done.

The throughline is the one these neighbors help locate: the two assets no static skill
file carries — **provenance** and an **enforced check** — are what make traceable,
check-backed knowledge non-commodity. That argument lives in [[the-two-assets]]; this page
only shows where the neighbors sit around it.
