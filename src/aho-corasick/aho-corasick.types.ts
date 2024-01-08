export type Text<Char> = Char[];

export type Pattern<Char> = Char[];

export interface Occurrence<Char> {
  pattern: Pattern<Char>;
  patternIndex: number;
  position: number;
}
