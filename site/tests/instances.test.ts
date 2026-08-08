import { describe, expect, it } from 'vitest';

import { parseKindManifest } from '@galaxy-foundry/kind-manifest';
import type { Companion, ManifestKind } from '@galaxy-foundry/kind-manifest';
import type { Facet } from '@galaxy-foundry/tag-registry';

import {
  companionRows,
  facetRows,
  kindRows,
  layerDisagreements,
  loadInstances,
  shapeDifferences,
  sharedRequiredFields,
  tagCount,
  type Instance,
} from '../src/lib/instances';

// The catalog's cross-instance claims, checked.
//
// `kindRows`, `companionRows`, `shapeDifferences` and `sharedRequiredFields` decide what the
// Kind Catalog asserts about the foundries — which kinds are substrate, which companions
// transferred, where the layouts diverge. They were verified by reading the built page, which
// is fine for what the corpus happens to contain and useless for what it does not: neither
// instance declares the same companion at DIFFERENT levels today, so `identical` — the whole
// reason that flag exists apart from `shared` — had never once been exercised.
//
// Two flavours here, deliberately. Fixtures pin the rules, including the cases the corpus
// cannot reach. Corpus tests pin the claims the page actually makes today, so re-vendoring a
// changed manifest reports as a changed claim instead of as quietly different prose.
//
// `loadInstances` resolves its data directory from the working directory, so the corpus tests
// require vitest to run from `site/` — the same assumption `astro build` already makes.

const field = (name: string, required: boolean) => ({ name, required, type: 'string' });

const companion = (
  file: string,
  requirement: Companion['requirement'],
  disposition: Companion['disposition'] = 'foundry-only',
): Companion => ({ file, requirement, purpose: `about ${file}`, disposition });

const kind = (name: string, over: Partial<ManifestKind> = {}): ManifestKind => ({
  kind: name,
  title: name,
  layer: 'instance',
  summary: `the ${name} kind`,
  shape: 'file',
  companions: [],
  fields: [],
  ...over,
});

const facet = (label: string, values: string[] = []): Facet => ({
  label,
  description: `the ${label} axis`,
  values: Object.fromEntries(values.map((v) => [v, `about ${v}`])),
});

const instance = (
  slug: string,
  kinds: ManifestKind[],
  facets: Record<string, Facet> = {},
): Instance => ({
  slug,
  title: slug,
  manifest: {
    instance: slug,
    version: 1,
    kinds,
    source: { repo: `org/${slug}`, path: 'kinds.generated.json', revision: 'abc1234' },
  },
  tags: { facets },
});

describe('kindRows', () => {
  it('calls a kind shared when every instance declares it, substrate first', () => {
    const rows = kindRows([
      instance('a', [kind('local-to-a'), kind('mold')]),
      instance('b', [kind('mold')]),
    ]);
    expect(rows.map((r) => r.kind)).toEqual(['mold', 'local-to-a']);
    expect(rows[0].shared).toBe(true);
    expect(rows[1].shared).toBe(false);
    expect(rows[1].present.map((i) => i.slug)).toEqual(['a']);
  });

  // `shared` is computed from what the instances declare, never read from `layer`. A manifest
  // claiming substrate for a kind the other instance never adopted is a claim its author has
  // not earned, and the catalog is meant to say so rather than repeat it.
  it('ignores a manifest\'s own claim to be substrate', () => {
    const rows = kindRows([
      instance('a', [kind('aspiring', { layer: 'substrate' })]),
      instance('b', [kind('other')]),
    ]);
    expect(rows.find((r) => r.kind === 'aspiring')!.shared).toBe(false);
  });
});

describe('companionRows', () => {
  const moldIn = (companions: Companion[]) => kind('mold', { shape: 'directory', companions });

  // Shared first, then by name — and the name comparison is locale-aware, so `README.md` files
  // among the lowercase ones rather than ahead of them all. That is the same comparison
  // `kindRows` and `facetRows` use, and it is what the rendered table's order actually is.
  it('gives one row per distinct companion, shared first then by name', () => {
    const [row] = kindRows([
      instance('a', [moldIn([companion('scenarios.md', 'recommended'), companion('README.md', 'optional')])]),
      instance('b', [moldIn([companion('scenarios.md', 'recommended'), companion('guidance.md', 'optional')])]),
    ]);
    expect(companionRows(row).map((c) => c.file)).toEqual([
      'scenarios.md',
      'guidance.md',
      'README.md',
    ]);
  });

  it('leaves a companion only one instance declares unshared, and says so per instance', () => {
    const [row] = kindRows([
      instance('a', [moldIn([companion('README.md', 'optional')])]),
      instance('b', [moldIn([])]),
    ]);
    const [readme] = companionRows(row);
    expect(readme.shared).toBe(false);
    expect(readme.by.a).toBeDefined();
    expect(readme.by.b).toBeUndefined();
  });

  // The case the corpus cannot reach. Both instances name the file, so a table keyed on the
  // filename alone would render a match; they disagree about how hard a rule it is, which is a
  // real difference between two foundries and the reason `identical` is not just `shared`.
  it('does not call a shared companion identical when the requirement differs', () => {
    const [row] = kindRows([
      instance('a', [moldIn([companion('guidance.md', 'required')])]),
      instance('b', [moldIn([companion('guidance.md', 'optional')])]),
    ]);
    const [guidance] = companionRows(row);
    expect(guidance.shared).toBe(true);
    expect(guidance.identical).toBe(false);
  });

  it('does not call a shared companion identical when only the disposition differs', () => {
    const [row] = kindRows([
      instance('a', [moldIn([companion('examples.md', 'optional', 'bundled')])]),
      instance('b', [moldIn([companion('examples.md', 'optional', 'foundry-only')])]),
    ]);
    const [examples] = companionRows(row);
    expect(examples.shared).toBe(true);
    expect(examples.identical).toBe(false);
  });

  // A file-shaped note has no directory for a companion to sit in. `companionsOf` refuses to
  // build such a declaration, so no instance can emit one — but the manifest FORMAT would carry
  // it, and the catalog is what would render it. It renders nothing, because there is no layout
  // to report, and this is the only test that says so.
  it('renders no layout for a companion named on a file-shaped kind', () => {
    const [row] = kindRows([
      instance('a', [kind('schema', { shape: 'file', companions: [companion('notes.md', 'optional')] })]),
      instance('b', [kind('schema', { shape: 'directory' })]),
    ]);
    expect(companionRows(row)).toEqual([]);
  });

  // `pattern` is exactly this today: a flat file in one foundry, a directory in the other. One
  // instance declaring a layout is not the layout transferring, so nothing here is shared.
  it('draws companions only from the instances whose notes are directories', () => {
    const [row] = kindRows([
      instance('a', [kind('pattern', { shape: 'file' })]),
      instance('b', [kind('pattern', { shape: 'directory', companions: [companion('notes.md', 'optional')] })]),
    ]);
    const [notes] = companionRows(row);
    expect(notes.file).toBe('notes.md');
    expect(notes.shared).toBe(false);
    expect(notes.identical).toBe(false);
  });
});

describe('shapeDifferences', () => {
  it('reports a kind laid out differently by the two instances', () => {
    const rows = kindRows([
      instance('a', [kind('pattern', { shape: 'file' }), kind('mold', { shape: 'directory' })]),
      instance('b', [kind('pattern', { shape: 'directory' }), kind('mold', { shape: 'directory' })]),
    ]);
    expect(shapeDifferences(rows)).toEqual(['pattern']);
  });

  // The reason there is no test for "an instance that declares no shape is silent, not
  // different": since @galaxy-foundry/kind-manifest 0.3.0 a manifest cannot be silent. `shape`
  // and `companions` are required of the format, so a kind missing either never reaches these
  // functions — `loadManifest` refuses the file. That is the guarantee worth pinning, and it is
  // why `shapeDifferences` no longer filters for a value the reader has already insisted on.
  it('is unreachable for a manifest with no shape, because the reader refuses one', () => {
    const shapeless = {
      instance: 'a',
      version: 1,
      kinds: [{ kind: 'mold', title: 'Mold', layer: 'instance', summary: 's', companions: [], fields: [] }],
    };
    expect(() => parseKindManifest(shapeless)).toThrow();
  });
});

describe('sharedRequiredFields', () => {
  it('intersects what both instances require, sorted', () => {
    const [row] = kindRows([
      instance('a', [kind('mold', { fields: [field('title', true), field('tags', true), field('owner', true)] })]),
      instance('b', [kind('mold', { fields: [field('tags', true), field('title', true)] })]),
    ]);
    expect(sharedRequiredFields(row)).toEqual(['tags', 'title']);
  });

  // Required in one instance and merely accepted in the other is not a shared envelope. It is
  // the difference between a field two domains both depend on and one that happens to appear.
  it('excludes a field one instance requires and the other only allows', () => {
    const [row] = kindRows([
      instance('a', [kind('mold', { fields: [field('title', true), field('doi', true)] })]),
      instance('b', [kind('mold', { fields: [field('title', true), field('doi', false)] })]),
    ]);
    expect(sharedRequiredFields(row)).toEqual(['title']);
  });

  it('is empty for a kind only one instance declares', () => {
    const rows = kindRows([instance('a', [kind('schema', { fields: [field('title', true)] })]), instance('b', [])]);
    expect(sharedRequiredFields(rows[0])).toEqual([]);
  });
});

// The catalog's drift banner. It fires in both directions, which is the point: a kind labelled
// substrate that only one foundry adopted is an unearned claim, and a kind both adopted while
// still labelled instance-specific is a label nobody updated.
describe('layerDisagreements', () => {
  it('reports a kind claiming substrate that only one instance declares', () => {
    const rows = kindRows([
      instance('a', [kind('aspiring', { layer: 'substrate' })]),
      instance('b', [kind('other')]),
    ]);
    expect(layerDisagreements(rows)).toEqual(['aspiring']);
  });

  it('reports a kind both instances declare while still labelled instance-specific', () => {
    const rows = kindRows([
      instance('a', [kind('mold', { layer: 'instance' })]),
      instance('b', [kind('mold', { layer: 'substrate' })]),
    ]);
    expect(layerDisagreements(rows)).toEqual(['mold']);
  });

  it('says nothing when the labels match what the instances declare', () => {
    const rows = kindRows([
      instance('a', [kind('mold', { layer: 'substrate' }), kind('schema')]),
      instance('b', [kind('mold', { layer: 'substrate' })]),
    ]);
    expect(layerDisagreements(rows)).toEqual([]);
  });
});

describe('facetRows and tagCount', () => {
  it('calls a facet shared when both registries declare it, shared first', () => {
    const rows = facetRows([
      instance('a', [], { domain: facet('Domain', ['bio']), stage: facet('Stage') }),
      instance('b', [], { stage: facet('Stage') }),
    ]);
    expect(rows.map((r) => r.key)).toEqual(['stage', 'domain']);
    expect(rows[0].shared).toBe(true);
    expect(rows[1].by.b).toBeUndefined();
  });

  it('counts tags across every facet, not facets', () => {
    const one = instance('a', [], {
      domain: facet('Domain', ['bio', 'chem']),
      stage: facet('Stage', ['draft']),
    });
    expect(tagCount(one)).toBe(3);
  });
});

describe('the vendored corpus', () => {
  const instances = loadInstances();
  const rows = kindRows(instances);

  it('parses all manifests in presentation order and stamps each with its source revision', () => {
    expect(instances.map((i) => i.slug)).toEqual([
      'galaxy-workflow-foundry',
      'topological-data-analysis-bioinformatics-foundry',
      'statistical-genomics-foundry',
    ]);
    for (const one of instances) {
      expect(one.manifest.source.revision).toMatch(/^[0-9a-f]{7,40}$/);
      expect(one.manifest.kinds.length).toBeGreaterThan(0);
    }
  });

  // The claim under the catalog's "Same kind, different shape" banner. The third instance adds
  // a flat `paper` beside SGF's directory form; `pattern` remains the original two-way split.
  it('keeps the corpus-pinned list of kinds with differing layouts', () => {
    expect(shapeDifferences(rows)).toEqual(['paper', 'pattern']);
  });

  // The strongest transfer evidence on the page: not three foundries using the word "mold", but
  // all three putting the same two files beside one, at the same requirement and disposition.
  it('has every foundry declaring a Mold\'s eval and scenarios identically', () => {
    const mold = rows.find((r) => r.kind === 'mold')!;
    expect(mold.shared).toBe(true);
    const identical = companionRows(mold).filter((c) => c.identical);
    expect(identical.map((c) => c.file).sort()).toEqual(['eval.md', 'scenarios.md']);
  });

  it('never marks a companion identical without also marking it shared', () => {
    for (const row of rows) {
      for (const one of companionRows(row)) {
        if (one.identical) expect(one.shared).toBe(true);
      }
    }
  });
});
