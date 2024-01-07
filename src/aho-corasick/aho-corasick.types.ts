export type Text = string;

export type Pattern = string;

export interface Occurrence {
  pattern: Pattern;
  patternIndex: number;
  position: number;
}
