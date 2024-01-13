export type Text<Char> = Char[][];

export type Pattern<Char> = Char[][];

export interface Occurrence<Char> {
  pattern: Pattern<Char>;
  col: number;
  row: number;
}

export type MatchResult<Char> = Occurrence<Char>[];
