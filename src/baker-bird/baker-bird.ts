import { AhoCorasick } from '../aho-corasick/index.js';
import {
  toDimension,
  toOccurrences,
  transpose,
  validatePatterns,
  validateText,
} from './baker-bird.helpers.js';
import {
  type MatchResult,
  type Pattern,
  type Text,
} from './baker-bird.types.js';

export class BakerBird<Char> {
  private readonly ahoCorasick: AhoCorasick<Char>;
  private readonly patternsDimension: ReturnType<typeof toDimension>;

  constructor(private readonly patterns: Pattern<Char>[]) {
    validatePatterns(patterns);

    this.ahoCorasick = new AhoCorasick(patterns.flat());
    this.patternsDimension = toDimension(this.patterns[0] ?? []);
  }

  match = (text: Text<Char>): MatchResult<Char> => {
    validateText(text);

    const visitedNodeIds = text.map(this.toVisitedNodeIds);
    const nodeIdsAhoCorasick = this.buildNodeIdsAhoCorasick();

    return transpose(visitedNodeIds)
      .slice(this.patternsDimension.colsCount - 1)
      .flatMap((column, columnIndex) =>
        toOccurrences(
          nodeIdsAhoCorasick.match(column),
          this.patterns,
          columnIndex,
        ),
      );
  };

  private toVisitedNodeIds = (row: Text<Char>[number]) =>
    this.ahoCorasick.match(row).visitedNodeIds;

  private buildNodeIdsAhoCorasick = () => {
    const terminalNodeIds = this.ahoCorasick.getTerminalNodeIds();
    const { rowsCount } = this.patternsDimension;

    return new AhoCorasick(
      this.patterns.map((_, i) =>
        terminalNodeIds.slice(i * rowsCount, i * rowsCount + rowsCount),
      ),
    );
  };
}
