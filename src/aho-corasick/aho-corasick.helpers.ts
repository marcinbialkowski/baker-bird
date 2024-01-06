import { Occurrence } from './aho-corasick.types.js';
import { Node } from './aho-corasick.node.js';

export const toOccurrences = (node: Node, position: number): Occurrence[] =>
  node.getPatterns().map(({ pattern, index }) => ({
    pattern,
    patternNumber: index,
    index: position - pattern.length + 1,
  }));
