// `z` comes from 'zod', not from 'astro:content', whose re-export astro 7 deprecates. It is
// also the major that matters: the re-export was zod 3, while the installed @galaxy-foundry
// packages peer on zod ^4, so importing it directly is what keeps ONE zod in the tree.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';
import { entryToId } from './lib/slug';

const docs = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: '../content',
    generateId: ({ entry }) => entryToId(entry),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    section: z.enum(['pattern', 'case', 'instances', 'blog']),
    order: z.number().optional(),
    // Path (relative to content/) of a plain-text file rendered verbatim in a <pre>
    // after the page body — for pages whose payload is literal instructions, not prose.
    instructions: z.string().optional(),
    // Names a GENERATED payload rendered after the page body, built from the instances'
    // vendored manifests (src/data/instances/). Same shape of field as `instructions`:
    // the page frame is prose, the payload is not hand-maintained.
    catalog: z.enum(['kinds', 'tags']).optional(),
    // blog
    date: z.coerce.date().optional(),
    // instance profiles
    instance_number: z.number().optional(),
    check: z.string().optional(),
    upstream: z.url().optional(),
  }),
});

export const collections = { docs };
