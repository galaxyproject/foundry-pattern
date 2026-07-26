// Load the two instances' vendored kind manifests and tag registries, and work out what is
// SHARED between them versus what each one adds.
//
// The catalogs' whole job is to make that split legible: the pattern's claim is that a
// substrate transfers and the differences localize, and a claim like that is only worth
// anything if you can see the diff. So "shared" is COMPUTED here — a kind is substrate
// because both instances declare it, a facet is shared because both registries carry it —
// never asserted by hand in prose that would quietly stop being true.

import fs from 'node:fs';
import path from 'node:path';

import yaml from 'js-yaml';

const DATA_DIR = path.resolve('src/data/instances');

export interface ManifestField {
  name: string;
  required: boolean;
  type: string;
}

export interface ManifestKind {
  kind: string;
  title: string;
  origin: 'substrate' | 'instance';
  summary: string;
  doc?: string;
  fields: ManifestField[];
}

export interface KindManifest {
  instance: string;
  version: number;
  kinds: ManifestKind[];
  source: { repo: string; revision: string; path: string };
}

export interface Facet {
  label: string;
  description: string;
  values?: Record<string, string>;
}

export interface TagRegistryFile {
  version: number;
  facets: Record<string, Facet>;
}

export interface Instance {
  slug: string;
  /** Display name, and the wiki-linkable page in content/instances/. */
  title: string;
  manifest: KindManifest;
  tags: TagRegistryFile;
}

/** Declaration order is instance order everywhere: #1 first. */
const INSTANCE_TITLES: Record<string, string> = {
  'galaxy-workflow-foundry': 'Galaxy Workflow Foundry',
  'statistical-genomics-foundry': 'Statistical Genomics Foundry',
};

export function loadInstances(): Instance[] {
  return Object.keys(INSTANCE_TITLES).map((slug) => ({
    slug,
    title: INSTANCE_TITLES[slug],
    manifest: JSON.parse(
      fs.readFileSync(path.join(DATA_DIR, slug, 'kinds.json'), 'utf8'),
    ) as KindManifest,
    tags: yaml.load(
      fs.readFileSync(path.join(DATA_DIR, slug, 'meta_tags.yml'), 'utf8'),
    ) as TagRegistryFile,
  }));
}

export interface KindRow {
  kind: string;
  /** The instances declaring this kind, in instance order. */
  present: Instance[];
  /** Per-instance detail, present only where the instance declares the kind. */
  by: Record<string, ManifestKind | undefined>;
  /** Declared by EVERY instance — the empirical definition of substrate. */
  shared: boolean;
}

/**
 * One row per distinct `type:` value across the instances, substrate first.
 *
 * `shared` is computed, not read from the manifests' own `origin` field. The two are meant to
 * agree, and where they do not, this function is right and the manifest is a claim its author
 * has not yet earned — which is worth surfacing rather than smoothing over.
 */
export function kindRows(instances: Instance[]): KindRow[] {
  const names = [...new Set(instances.flatMap((i) => i.manifest.kinds.map((k) => k.kind)))];
  const rows = names.map((kind) => {
    const by: Record<string, ManifestKind | undefined> = {};
    for (const instance of instances) {
      by[instance.slug] = instance.manifest.kinds.find((k) => k.kind === kind);
    }
    const present = instances.filter((i) => by[i.slug]);
    return { kind, present, by, shared: present.length === instances.length };
  });
  return rows.sort(
    (a, b) =>
      Number(b.shared) - Number(a.shared) ||
      b.present.length - a.present.length ||
      a.kind.localeCompare(b.kind),
  );
}

/** A kind's manifest `origin` disagreeing with what the instances actually declare. */
export function originDisagreements(rows: KindRow[]): string[] {
  return rows
    .filter((row) =>
      row.present.some((i) => (row.by[i.slug]!.origin === 'substrate') !== row.shared),
    )
    .map((row) => row.kind);
}

export interface FacetRow {
  key: string;
  present: Instance[];
  by: Record<string, Facet | undefined>;
  shared: boolean;
}

/** One row per distinct facet key across the registries, shared first. */
export function facetRows(instances: Instance[]): FacetRow[] {
  const keys = [...new Set(instances.flatMap((i) => Object.keys(i.tags.facets ?? {})))];
  const rows = keys.map((key) => {
    const by: Record<string, Facet | undefined> = {};
    for (const instance of instances) by[instance.slug] = instance.tags.facets?.[key];
    const present = instances.filter((i) => by[i.slug]);
    return { key, present, by, shared: present.length === instances.length };
  });
  return rows.sort(
    (a, b) => Number(b.shared) - Number(a.shared) || a.key.localeCompare(b.key),
  );
}

export const tagCount = (instance: Instance): number =>
  Object.values(instance.tags.facets ?? {}).reduce(
    (n, f) => n + Object.keys(f.values ?? {}).length,
    0,
  );

/** Fields required by EVERY instance that declares the kind — the kind's shared envelope. */
export function sharedRequiredFields(row: KindRow): string[] {
  if (row.present.length < 2) return [];
  const sets = row.present.map(
    (i) => new Set(row.by[i.slug]!.fields.filter((f) => f.required).map((f) => f.name)),
  );
  return [...sets[0]].filter((name) => sets.every((s) => s.has(name))).sort();
}
