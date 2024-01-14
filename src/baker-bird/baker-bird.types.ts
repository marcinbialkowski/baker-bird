export type Matrix<Char> = Char[][];

export type Text<Char> = Matrix<Char>;

export type Pattern<Char> = Matrix<Char>;

export interface Occurrence<Char> {
  pattern: Pattern<Char>;
  patternIndex: number;
  col: number;
  row: number;
}

export type MatchResult<Char> = Occurrence<Char>[];
