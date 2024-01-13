import { describe, expect, it } from 'vitest';
import { BakerBird } from './baker-bird.js';

describe('BakerBird', () => {
  const pattern = [
    ['a', 'b', 'c'],
    ['c', 'a', 'b'],
  ];

  const text = [
    ['1', '2', '3', '4', '5'],
    ['a', 'b', 'c', 'a', 'b'],
    ['c', 'a', 'b', 'c', 'd'],
    ['d', 'c', 'a', 'b', 'Y'],
  ];

  it('matches pattern', () => {
    const bakerBird = new BakerBird(pattern);
    const occurrences = bakerBird.match(text);

    expect(occurrences).toStrictEqual([
      { pattern, col: 0, row: 1 },
      { pattern, col: 1, row: 2 },
    ]);
  });

  it('returns empty array when there is no match', () => {
    const bakerBird = new BakerBird([
      ['a', 'b'],
      ['1', '2'],
    ]);
    const occurrences = bakerBird.match(text);

    expect(occurrences).toStrictEqual([]);
  });

  it('returns empty array when pattern is bigger than text', () => {
    const bakerBird = new BakerBird(pattern);
    const occurrences = bakerBird.match([['a', 'b']]);

    expect(occurrences).toStrictEqual([]);
  });

  it('rejects pattern with 0 rows', () => {
    expect(() => new BakerBird([])).toThrowError(
      'Number of rows and columns must be greater than 0',
    );
  });

  it('rejects pattern with 0 columns', () => {
    expect(() => new BakerBird([[], []])).toThrowError(
      'Number of rows and columns must be greater than 0',
    );
  });

  it('rejects pattern with non-rectangular shape', () => {
    expect(() => new BakerBird([['a'], ['a', 'b']])).toThrowError(
      'Number of elements in each row must be the same',
    );
  });

  it('rejects text with 0 rows', () => {
    expect(() => new BakerBird(pattern).match([])).toThrowError(
      'Number of rows and columns must be greater than 0',
    );
  });

  it('rejects text with 0 columns', () => {
    expect(() => new BakerBird(pattern).match([[], []])).toThrowError(
      'Number of rows and columns must be greater than 0',
    );
  });

  it('rejects text with non-rectangular shape', () => {
    expect(() =>
      new BakerBird(pattern).match([['a'], ['a', 'b']]),
    ).toThrowError('Number of elements in each row must be the same');
  });

  it('matches numeric pattern', () => {
    const numericPattern = [
      [1, 2],
      [2, 1],
    ];
    const numericText = [
      [0, 1, 2],
      [1, 2, 1],
      [2, 1, 0],
    ];

    const bakerBird = new BakerBird(numericPattern);
    const occurrences = bakerBird.match(numericText);

    expect(occurrences).toStrictEqual([
      { pattern: numericPattern, col: 0, row: 1 },
      { pattern: numericPattern, col: 1, row: 0 },
    ]);
  });

  it('matches pattern composed of whole words', () => {
    const wordsPattern = [
      ['you', 'are'],
      ['we', 'are'],
    ];
    const wordsText = [
      ['I', 'am', 'here'],
      ['you', 'are', 'there'],
      ['we', 'are', 'here and there'],
    ];

    const bakerBird = new BakerBird(wordsPattern);
    const occurrences = bakerBird.match(wordsText);

    expect(occurrences).toStrictEqual([
      { pattern: wordsPattern, col: 0, row: 1 },
    ]);
  });
});
