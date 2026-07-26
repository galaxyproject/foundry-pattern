// Vendor the two instances' generated kind manifests and tag registries into src/data/.
//
// Usage:
//   node scripts/sync-instance-data.mjs [--check] [--<instance-slug> <path-to-checkout>]
//
//   --check   exit non-zero if any vendored file is stale; do not write.
//
// This site renders a cross-instance kind catalog and tag catalog. The source of truth for
// each is the instance's own repository — `types/kinds.generated.json` (itself derived from
// that instance's zod schemas) and `meta_tags.yml`. We COPY rather than fetch at build time,
// because a pattern site whose build depends on two other repositories being reachable is a
// pattern site that stops building.
//
// The copies are therefore a snapshot with a date, and the page says so. Re-run this script
// against fresh checkouts to update; `--check` in CI only proves the copies match whatever
// checkouts are present locally, so it is a local convenience, not a freshness guarantee.

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const SITE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = path.join(SITE_ROOT, 'src/data/instances');

// Each instance, and where its two shared-format files live inside its checkout.
const INSTANCES = [
  {
    slug: 'galaxy-workflow-foundry',
    repo: 'galaxyproject/foundry',
    kinds: 'packages/note-schema/src/types/kinds.generated.json',
    tags: 'meta_tags.yml',
  },
  {
    slug: 'statistical-genomics-foundry',
    repo: 'jmchilton/statistical-genomics-foundry',
    kinds: 'site/src/types/kinds.generated.json',
    tags: 'meta_tags.yml',
  },
];

// Where a checkout might be, in order. An explicit --<slug> <path> always wins.
const searchRoots = [
  process.env.FOUNDRY_CHECKOUTS,
  path.join(process.env.HOME ?? '', 'projects/repositories'),
  path.resolve(SITE_ROOT, '../..'),
].filter(Boolean);

const args = process.argv.slice(2);
const check = args.includes('--check');

function checkoutFor(instance) {
  const flag = args.indexOf(`--${instance.slug}`);
  if (flag !== -1 && args[flag + 1]) return path.resolve(args[flag + 1]);
  const name = instance.repo.split('/')[1];
  for (const root of searchRoots) {
    const candidate = path.join(root, name);
    if (fs.existsSync(path.join(candidate, instance.kinds))) return candidate;
  }
  return undefined;
}

/** Short commit id of the checkout, so the vendored snapshot says what it is a snapshot OF. */
function revisionOf(checkout) {
  try {
    return execFileSync('git', ['-C', checkout, 'rev-parse', '--short', 'HEAD'], {
      encoding: 'utf8',
    }).trim();
  } catch {
    return 'unknown';
  }
}

let stale = 0;
let synced = 0;
let missing = 0;

for (const instance of INSTANCES) {
  const checkout = checkoutFor(instance);
  if (!checkout) {
    console.error(
      `! ${instance.slug}: no checkout found (looked for ${instance.repo} under ${searchRoots.join(', ')}).\n` +
        `  Pass --${instance.slug} <path>, or set FOUNDRY_CHECKOUTS.`,
    );
    missing += 1;
    continue;
  }

  const revision = revisionOf(checkout);
  const outDir = path.join(DATA_DIR, instance.slug);

  const manifest = JSON.parse(fs.readFileSync(path.join(checkout, instance.kinds), 'utf8'));
  // Stamp the provenance onto the copy itself; the catalog page renders it.
  manifest.source = { repo: instance.repo, revision, path: instance.kinds };

  const outputs = [
    [path.join(outDir, 'kinds.json'), `${JSON.stringify(manifest, null, 2)}\n`],
    [path.join(outDir, 'meta_tags.yml'), fs.readFileSync(path.join(checkout, instance.tags), 'utf8')],
  ];

  for (const [file, contents] of outputs) {
    const current = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
    const relative = path.relative(SITE_ROOT, file);
    if (current === contents) continue;
    if (check) {
      console.error(`  stale: ${relative}`);
      stale += 1;
    } else {
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, contents);
      console.log(`  wrote ${relative}`);
      synced += 1;
    }
  }
  console.log(`${instance.slug} @ ${revision} (${checkout})`);
}

if (check && stale) {
  console.error(`\n${stale} vendored file(s) stale — run \`npm run sync:instances\` and commit.`);
  process.exit(1);
}
if (missing === INSTANCES.length) process.exit(1);
if (check) console.log('\nVendored instance data matches the local checkouts.');
else console.log(`\n${synced} file(s) updated.`);
