import { type Occurrence, type Pattern } from './aho-corasick.types.js';
import { type Node } from './aho-corasick.node.js';

export const validatePattern = <Char>(pattern: Pattern<Char>) => {
  if (pattern.length === 0) {
    throw new Error("Pattern's length must be greater than 0");
  }
};

export const toOccurrences = <Char>(
  node: Node<Char>,
  position: number,
): Occurrence<Char>[] =>
  node.getPatterns().map(({ pattern, patternIndex }) => ({
    pattern,
    patternIndex,
    position: position - pattern.length + 1,
  }));
