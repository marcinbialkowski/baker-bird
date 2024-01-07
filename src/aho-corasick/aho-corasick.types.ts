export interface Pattern {
  pattern: string;
  patternIndex: number;
}

export interface Occurrence extends Pattern {
  position: number;
}
