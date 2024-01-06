import { describe, expect, it } from 'vitest';
import { BakerBird } from './baker-bird.js';

describe('BakerBird', () => {
  it('creates an instance', () => {
    const bakerBird = new BakerBird();
    expect(bakerBird).toBeDefined();
  });
});
