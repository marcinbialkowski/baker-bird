import { type Occurrence } from './aho-corasick.types.js';
import { type Node } from './aho-corasick.node.js';

export const toOccurrences = (node: Node, position: number): Occurrence[] =>
  node.getPatterns().map(({ pattern, patternIndex }) => ({
    pattern,
    patternIndex,
    position: position - pattern.length + 1,
  }));
