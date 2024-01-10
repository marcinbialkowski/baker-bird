export type Text<Char> = Char[];

export type Pattern<Char> = Char[];

export interface Occurrence<Char> {
  pattern: Pattern<Char>;
  patternIndex: number;
  position: number;
}

export interface MatchResult<Char> {
  occurrences: Occurrence<Char>[];
  visitedNodeIds: number[];
}
