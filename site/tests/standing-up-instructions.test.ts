import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

const instructions = readFileSync(
  '../content/pattern/standing-up-a-foundry.instructions.txt',
  'utf8',
);

describe('the standing-up dependency boundary', () => {
  it('does not mirror foundry-lib package versions', () => {
    expect(instructions).not.toMatch(/@galaxy-foundry\/[a-z-]+\s+\^?\d+\.\d+\.\d+/);
  });

  it('directs package-version authority to foundry-lib', () => {
    expect(instructions).toMatch(
      /foundry-lib is\s+the source of truth for @galaxy-foundry package versions and APIs\./,
    );
  });

  it('does not put casting modes back into the license-policy shape', () => {
    expect(instructions).not.toContain('allowed_modes');
  });
});
