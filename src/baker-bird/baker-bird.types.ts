export type Text<Char> = Char[][];

export type Pattern<Char> = Char[][];

export interface Occurrence<Char> {
  pattern: Pattern<Char>;
  row: number;
  col: number;
}

export type MatchResult<Char> = Occurrence<Char>[];
