import { type Occurrence, type Pattern } from './aho-corasick.types.js';

export class Node<Char> {
  private children: Map<Char, Node<Char>> = new Map();
  private transitions: Map<Char, Node<Char>> = new Map();
  private patterns: Pick<Occurrence<Char>, 'pattern' | 'patternIndex'>[] = [];

  constructor(
    public readonly id: number,
    public readonly char: Char | null,
    public readonly parent: Node<Char> | null,
  ) {}

  getPatterns = () => this.patterns;

  addPattern = (pattern: Pattern<Char>, patternIndex: number) => {
    this.patterns.push({ pattern, patternIndex });
  };

  getChildren = () => this.children.values();

  getChild = (char: Char) => this.children.get(char);

  setChild = (char: Char, node: Node<Char>) => {
    this.children.set(char, node);
  };

  getTransition = (char: Char) => this.transitions.get(char);

  setTransition = (char: Char, node: Node<Char>) => {
    this.transitions.set(char, node);
  };

  setTransitionsFrom = (node: Node<Char>) => {
    this.transitions = new Map([...node.transitions, ...node.children]);
    this.patterns.push(...node.patterns);
  };
}
