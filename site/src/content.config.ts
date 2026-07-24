import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
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
    // blog
    date: z.coerce.date().optional(),
    // instance profiles
    instance_number: z.number().optional(),
    check: z.string().optional(),
    upstream: z.string().url().optional(),
  }),
});

export const collections = { docs };
