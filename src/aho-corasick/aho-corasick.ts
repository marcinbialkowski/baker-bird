import { toOccurrences } from './aho-corasick.helpers.js';
import { Occurrence } from './aho-corasick.types.js';
import { Node } from './aho-corasick.node.js';

export class AhoCorasick {
  private terminalNodeIds: number[];
  private lastNodeId = 0;
  private root = new Node(this.lastNodeId, '', null);

  constructor(patterns: string[]) {
    this.terminalNodeIds = this.buildTrie(patterns);
    this.buildTransitions();
  }

  match = (text: string) => {
    const occurrences: Occurrence[] = [];
    const visitedNodeIds: number[] = [];
    let currentNode = this.root;

    for (const [index, char] of [...text].entries()) {
      currentNode = currentNode.getTransition(char) ?? this.root;
      occurrences.push(...toOccurrences(currentNode, index));
      visitedNodeIds.push(currentNode.id);
    }

    return { occurrences, visitedNodeIds };
  };

  getTerminalNodeIds = () => this.terminalNodeIds;

  private buildTrie = (patterns: string[]) => patterns.map(this.addPattern);

  private addPattern = (pattern: string, patternIndex: number) => {
    if (pattern.length === 0) {
      throw new Error('Pattern cannot be an empty string');
    }

    let index = 0;
    let currentNode = this.root;

    for (const char of pattern) {
      const child = currentNode.getChild(char);
      if (!child) {
        break;
      }

      currentNode = child;
      index += 1;
    }

    for (const char of pattern.substring(index)) {
      currentNode = this.addNode(char, currentNode);
    }

    currentNode.addPattern(pattern, patternIndex);

    return currentNode.id;
  };

  private addNode(char: string, parent: Node) {
    this.lastNodeId += 1;
    const node = new Node(this.lastNodeId, char, parent);
    parent.setChild(char, node);

    return node;
  }

  private buildTransitions = () => {
    const queue = [...this.root.getChildren()];

    while (queue.length) {
      const currentNode = queue.shift()!;
      queue.push(...currentNode.getChildren());

      const parent = currentNode.parent!;
      const charFromParent = currentNode.char;
      const prevNode = parent.getTransition(charFromParent) ?? this.root;

      parent.setTransition(charFromParent, currentNode);
      currentNode.setTransitionsFrom(prevNode);
    }
  };
}
