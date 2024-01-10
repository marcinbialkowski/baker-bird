import { AhoCorasick } from '../aho-corasick/index.js';
import { toOccurrences, transpose, validate } from './baker-bird.helpers.js';
import {
  type MatchResult,
  type Pattern,
  type Text,
} from './baker-bird.types.js';

export class BakerBird<Char> {
  private readonly ahoCorasick: AhoCorasick<Char>;

  constructor(private readonly pattern: Pattern<Char>) {
    validate(pattern);
    this.ahoCorasick = new AhoCorasick(pattern);
  }

  match = (text: Text<Char>): MatchResult<Char> => {
    validate(text);

    const visitedNodeIds = text.map(
      (row) => this.ahoCorasick.match(row).visitedNodeIds,
    );
    const patternWidth = this.pattern[0]?.length ?? 0;

    const nodeIdsAhoCorasick = new AhoCorasick([
      this.ahoCorasick.getTerminalNodeIds(),
    ]);

    return transpose(visitedNodeIds)
      .slice(patternWidth - 1)
      .flatMap((column, columnIndex) =>
        toOccurrences(
          nodeIdsAhoCorasick.match(column),
          this.pattern,
          columnIndex,
        ),
      );
  };
}
