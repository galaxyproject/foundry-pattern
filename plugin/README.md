# foundry-review

Generic, infrastructure-agnostic skills for **reviewing a Foundry site** — checking that each
source is captured and rendered faithfully for both humans and agents. These make no assumptions
about a particular site's stack; they recover how to run and route the site from the project's
own docs.

This plugin root is dual-runtime: `.claude-plugin/plugin.json` and `.codex-plugin/plugin.json`
both expose the same `skills/` directory.

## Install

**Claude Code:**

```
/plugin marketplace add galaxyproject/foundry-pattern
/plugin install foundry-review@foundry-pattern
/foundry-review:review-content-accessibility
```

**Codex CLI:**

```
codex plugin marketplace add galaxyproject/foundry-pattern
codex plugin add foundry-review@foundry-pattern
```

Then run `/skills` or type `$` to select a skill such as `$review-content-accessibility`. Codex
can also select a skill implicitly from its description. Restart Codex after installing or
refreshing the plugin if the skills do not appear.

## Skills

- **review-content-accessibility** — review rendered content pages against their source files:
  capture/render fidelity, clean markup, working links, surfaced metadata, human- AND
  agent-readability. Not a content-correctness review.
