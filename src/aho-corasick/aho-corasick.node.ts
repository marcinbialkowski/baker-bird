import { type Pattern } from './aho-corasick.types.js';

export class Node {
  private children: Record<string, Node> = {};
  private transitions: Record<string, Node> = {};
  private patterns: Pattern[] = [];

  constructor(
    public readonly id: number,
    public readonly char: string,
    public readonly parent: Node | null,
  ) {}

  getPatterns = () => this.patterns;

  addPattern = (pattern: string, patternIndex: number) => {
    this.patterns.push({ pattern, patternIndex });
  };

  getChildren = () => Object.values(this.children);

  getChild = (char: string) => this.children[char];

  setChild = (char: string, node: Node) => {
    this.children[char] = node;
  };

  getTransition = (char: string) => this.transitions[char];

  setTransition = (char: string, node: Node) => {
    this.transitions[char] = node;
  };

  setTransitionsFrom = (node: Node) => {
    this.transitions = { ...node.transitions, ...node.children };
    this.patterns.push(...node.patterns);
  };
}
