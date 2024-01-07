import { describe, expect, it } from 'vitest';
import { AhoCorasick } from './aho-corasick.js';

describe('AhoCorasick', () => {
  const patterns = ['test', 'abc', 'ab', 'c'];
  const text = 'aabcxyzctest';

  it('matches patterns', () => {
    const ahoCorasick = new AhoCorasick(patterns);
    const { occurrences } = ahoCorasick.match(text);

    expect(occurrences).toStrictEqual([
      { pattern: 'ab', patternIndex: 2, position: 1 },
      { pattern: 'abc', patternIndex: 1, position: 1 },
      { pattern: 'c', patternIndex: 3, position: 3 },
      { pattern: 'c', patternIndex: 3, position: 7 },
      { pattern: 'test', patternIndex: 0, position: 8 },
    ]);
  });

  it('returns ids of nodes visited during matching', () => {
    const ahoCorasick = new AhoCorasick(patterns);
    const { visitedNodeIds } = ahoCorasick.match(text);

    expect(visitedNodeIds).toStrictEqual([5, 5, 6, 7, 0, 0, 0, 8, 1, 2, 3, 4]);
    expect(visitedNodeIds.length).toBe(text.length);
  });

  it('keeps terminal node id for each pattern', () => {
    const ahoCorasick = new AhoCorasick(patterns);

    expect(ahoCorasick.getTerminalNodeIds()).toStrictEqual([4, 7, 6, 8]);
  });

  it('returns empty occurrences array when there is no match', () => {
    const ahoCorasick = new AhoCorasick(patterns);
    const { occurrences, visitedNodeIds } = ahoCorasick.match('ated12');

    expect(occurrences).toStrictEqual([]);
    expect(visitedNodeIds).toStrictEqual([5, 1, 2, 0, 0, 0]);
  });

  it('accepts empty text', () => {
    const ahoCorasick = new AhoCorasick(patterns);
    const { occurrences, visitedNodeIds } = ahoCorasick.match('');

    expect(occurrences).toStrictEqual([]);
    expect(visitedNodeIds).toStrictEqual([]);
  });

  it('rejects empty pattern', () => {
    expect(() => new AhoCorasick(['a', '', 'b'])).toThrowError(
      'Pattern cannot be an empty string',
    );
  });
});
