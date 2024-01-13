import { type MatchResult as AhoCorasickMatchResult } from '../aho-corasick/index.js';
import { type Pattern } from './baker-bird.types.js';

export const toDimension = <Char>(matrix: Char[][]) =>
  [matrix.length, matrix[0]?.length ?? 0] as const;

export const validate = <Char>(matrix: Char[][]) => {
  const [rowsCount, colsCount] = toDimension(matrix);

  if (rowsCount === 0 || colsCount === 0) {
    throw new Error('Number of rows and columns must be greater than 0');
  }

  if (matrix.some((row) => row.length !== colsCount)) {
    throw new Error('Number of elements in each row must be the same');
  }
};

export const transpose = <Char>(matrix: Char[][]) =>
  matrix[0]?.map((_, i) => matrix.map((row) => row[i])) as Char[][];

export const toOccurrences = <Char>(
  matchResult: AhoCorasickMatchResult<number>,
  pattern: Pattern<Char>,
  columnIndex: number,
) =>
  matchResult.occurrences.map((occurrence) => ({
    pattern,
    col: columnIndex,
    row: occurrence.position,
  }));
