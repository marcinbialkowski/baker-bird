import { describe, expect, it } from 'vitest';
import { BakerBird } from './baker-bird.js';
import { type Pattern } from './baker-bird.types.js';

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
    const bakerBird = new BakerBird([pattern]);
    const occurrences = bakerBird.match(text);

    expect(occurrences).toStrictEqual([
      { pattern, patternIndex: 0, col: 0, row: 1 },
      { pattern, patternIndex: 0, col: 1, row: 2 },
    ]);
  });

  it('returns empty array when there is no match', () => {
    const nonMatchingPattern = [
      ['a', 'b'],
      ['1', '2'],
    ];

    const bakerBird = new BakerBird([nonMatchingPattern]);
    const occurrences = bakerBird.match(text);

    expect(occurrences).toStrictEqual([]);
  });

  it('returns empty array when pattern is bigger than text', () => {
    const bakerBird = new BakerBird([pattern]);
    const occurrences = bakerBird.match([['a', 'b']]);

    expect(occurrences).toStrictEqual([]);
  });

  it('rejects pattern with 0 rows', () => {
    const noRowsPattern: Pattern<string> = [];

    expect(() => new BakerBird([noRowsPattern])).toThrowError(
      'Number of rows and columns must be greater than 0',
    );
  });

  it('rejects pattern with 0 columns', () => {
    const noColsPattern: Pattern<string> = [[], []];

    expect(() => new BakerBird([noColsPattern])).toThrowError(
      'Number of rows and columns must be greater than 0',
    );
  });

  it('rejects pattern with non-rectangular shape', () => {
    const nonRectangularPattern = [['a'], ['a', 'b']];

    expect(() => new BakerBird([nonRectangularPattern])).toThrowError(
      'Number of elements in each row must be the same',
    );
  });

  it('rejects text with 0 rows', () => {
    expect(() => new BakerBird([pattern]).match([])).toThrowError(
      'Number of rows and columns must be greater than 0',
    );
  });

  it('rejects text with 0 columns', () => {
    expect(() => new BakerBird([pattern]).match([[], []])).toThrowError(
      'Number of rows and columns must be greater than 0',
    );
  });

  it('rejects text with non-rectangular shape', () => {
    expect(() =>
      new BakerBird([pattern]).match([['a'], ['a', 'b']]),
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

    const bakerBird = new BakerBird([numericPattern]);
    const occurrences = bakerBird.match(numericText);

    expect(occurrences).toStrictEqual([
      { pattern: numericPattern, patternIndex: 0, col: 0, row: 1 },
      { pattern: numericPattern, patternIndex: 0, col: 1, row: 0 },
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

    const bakerBird = new BakerBird([wordsPattern]);
    const occurrences = bakerBird.match(wordsText);

    expect(occurrences).toStrictEqual([
      { pattern: wordsPattern, patternIndex: 0, col: 0, row: 1 },
    ]);
  });

  it('matches many 2x3 patterns', () => {
    const pattern1 = [
      ['c', 'a', 'b'],
      ['b', 'c', 'd'],
    ];
    const pattern2 = [
      ['1', '2', '3'],
      ['a', 'b', 'c'],
    ];
    const pattern3 = [
      ['1', '2', '3'],
      ['a', 'b', 'c'],
    ];

    const bakerBird = new BakerBird([pattern1, pattern2, pattern3]);
    const occurrences = bakerBird.match(text);

    expect(occurrences).toStrictEqual([
      { pattern: pattern2, patternIndex: 1, col: 0, row: 0 },
      { pattern: pattern3, patternIndex: 2, col: 0, row: 0 },
      { pattern: pattern1, patternIndex: 0, col: 2, row: 1 },
    ]);
  });

  it('matches many 1x1 patterns', () => {
    const pattern1 = [['a']];
    const pattern2 = [['1']];
    const pattern3 = [['d']];
    const pattern4 = [['Y']];

    const bakerBird = new BakerBird([pattern1, pattern2, pattern3, pattern4]);
    const occurrences = bakerBird.match(text);

    expect(occurrences).toStrictEqual([
      { pattern: pattern2, patternIndex: 1, col: 0, row: 0 },
      { pattern: pattern1, patternIndex: 0, col: 0, row: 1 },
      { pattern: pattern3, patternIndex: 2, col: 0, row: 3 },
      { pattern: pattern1, patternIndex: 0, col: 1, row: 2 },
      { pattern: pattern1, patternIndex: 0, col: 2, row: 3 },
      { pattern: pattern1, patternIndex: 0, col: 3, row: 1 },
      { pattern: pattern3, patternIndex: 2, col: 4, row: 2 },
      { pattern: pattern4, patternIndex: 3, col: 4, row: 3 },
    ]);
  });

  it('rejects empty patterns array', () => {
    expect(() => new BakerBird([])).toThrowError(
      'At least one pattern must be provided',
    );
  });

  it('rejects patterns with different dimensions', () => {
    const pattern1 = [['a']];
    const pattern2 = [['1'], ['2']];

    expect(() => new BakerBird([pattern1, pattern2])).toThrowError(
      'All patterns must be of the same dimension',
    );
  });
});
