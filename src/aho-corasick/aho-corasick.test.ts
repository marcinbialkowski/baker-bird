import { describe, expect, it } from 'vitest';
import { AhoCorasick } from './aho-corasick.js';

describe('AhoCorasick', () => {
  const patterns = [['t', 'e', 's', 't'], ['a', 'b', 'c'], ['a', 'b'], ['c']];
  const text = ['a', 'a', 'b', 'c', 'x', 'y', 'z', 'c', 't', 'e', 's', 't'];

  it('matches patterns', () => {
    const ahoCorasick = new AhoCorasick(patterns);
    const { occurrences } = ahoCorasick.match(text);

    expect(occurrences).toStrictEqual([
      { pattern: ['a', 'b'], patternIndex: 2, position: 1 },
      { pattern: ['a', 'b', 'c'], patternIndex: 1, position: 1 },
      { pattern: ['c'], patternIndex: 3, position: 3 },
      { pattern: ['c'], patternIndex: 3, position: 7 },
      { pattern: ['t', 'e', 's', 't'], patternIndex: 0, position: 8 },
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
    const noMatchText = ['a', 't', 'e', 'd', '1', '2'];

    const ahoCorasick = new AhoCorasick(patterns);
    const { occurrences, visitedNodeIds } = ahoCorasick.match(noMatchText);

    expect(occurrences).toStrictEqual([]);
    expect(visitedNodeIds).toStrictEqual([5, 1, 2, 0, 0, 0]);
  });

  it('accepts empty text', () => {
    const ahoCorasick = new AhoCorasick(patterns);
    const { occurrences, visitedNodeIds } = ahoCorasick.match([]);

    expect(occurrences).toStrictEqual([]);
    expect(visitedNodeIds).toStrictEqual([]);
  });

  it('rejects empty pattern', () => {
    expect(() => new AhoCorasick([['a'], [], ['b']])).toThrowError(
      "Pattern's length must be greater than 0",
    );
  });

  it('accepts empty array of patterns', () => {
    const ahoCorasick = new AhoCorasick([]);
    const { occurrences, visitedNodeIds } = ahoCorasick.match(['a', 'b', 'c']);

    expect(occurrences).toStrictEqual([]);
    expect(visitedNodeIds).toStrictEqual([0, 0, 0]);
  });

  it('matches numeric patterns', () => {
    const numericPatterns = [
      [1, 2, 1],
      [5, 3, 2],
    ];
    const numericText = [1, 2, 1, 2, 1, 5, 3];

    const ahoCorasick = new AhoCorasick(numericPatterns);
    const { occurrences, visitedNodeIds } = ahoCorasick.match(numericText);

    expect(occurrences).toStrictEqual([
      { pattern: [1, 2, 1], patternIndex: 0, position: 0 },
      { pattern: [1, 2, 1], patternIndex: 0, position: 2 },
    ]);
    expect(visitedNodeIds).toStrictEqual([1, 2, 3, 2, 3, 4, 5]);
  });

  it('matches patterns composed of whole words', () => {
    const sentencePatterns = [
      ['we', 'are'],
      ['you', 'are'],
    ];
    const sentenceText = ['I', 'am', 'you', 'are', 'we', 'are'];

    const ahoCorasick = new AhoCorasick(sentencePatterns);
    const { occurrences, visitedNodeIds } = ahoCorasick.match(sentenceText);

    expect(occurrences).toStrictEqual([
      { pattern: ['you', 'are'], patternIndex: 1, position: 2 },
      { pattern: ['we', 'are'], patternIndex: 0, position: 4 },
    ]);
    expect(visitedNodeIds).toStrictEqual([0, 0, 3, 4, 1, 2]);
  });
});
