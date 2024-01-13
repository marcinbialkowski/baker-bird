import { type MatchResult as AhoCorasickMatchResult } from '../aho-corasick/index.js';
import { type Matrix, type Pattern, type Text } from './baker-bird.types.js';

export const toDimension = <Char>(matrix: Matrix<Char>) => ({
  rowsCount: matrix.length,
  colsCount: matrix[0]?.length ?? 0,
});

const areOfTheSameDimension = <Char>(matrices: Matrix<Char>[]) => {
  const dimension = toDimension(matrices[0] ?? []);

  return matrices.slice(1).every((matrix) => {
    const { rowsCount, colsCount } = toDimension(matrix);
    return (
      rowsCount === dimension.rowsCount && colsCount === dimension.colsCount
    );
  });
};

const validateMatrix = <Char>(matrix: Matrix<Char>) => {
  const { rowsCount, colsCount } = toDimension(matrix);

  if (rowsCount === 0 || colsCount === 0) {
    throw new Error('Number of rows and columns must be greater than 0');
  }

  if (matrix.some((row) => row.length !== colsCount)) {
    throw new Error('Number of elements in each row must be the same');
  }
};

export const validateText = <Char>(text: Text<Char>) => validateMatrix(text);

export const validatePatterns = <Char>(patterns: Pattern<Char>[]) => {
  if (patterns.length === 0) {
    throw new Error('At least one pattern must be provided');
  }

  if (!areOfTheSameDimension(patterns)) {
    throw new Error('All patterns must be of the same dimension');
  }

  patterns.forEach(validateMatrix);
};

export const transpose = <Char>(matrix: Matrix<Char>) =>
  matrix[0]?.map((_, i) => matrix.map((row) => row[i])) as Matrix<Char>;

export const toOccurrences = <Char>(
  matchResult: AhoCorasickMatchResult<number>,
  patterns: Pattern<Char>[],
  columnIndex: number,
) =>
  matchResult.occurrences.map((occurrence) => ({
    pattern: patterns[occurrence.patternIndex] as Pattern<Char>,
    patternIndex: occurrence.patternIndex,
    col: columnIndex,
    row: occurrence.position,
  }));
