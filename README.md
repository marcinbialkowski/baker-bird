# Baker-Bird

This repository contains a TypeScript implementation of the Baker-Bird
algorithm, specialized in 2-dimensional pattern matching.

## Use Cases

The Baker-Bird algorithm is useful in various scenarios, including:

- **Image Processing**: match patterns in 2D pixel arrays.
- **Biological Sequences**: match patterns in DNA or protein sequences.
- **Data Mining**: identify recurring 2D patterns in datasets.

## Usage

> [!NOTE]
> This package is currently not published on npm. However, if you find this library useful and would like it to be available on npm, please let me know by opening an issue.

```ts
const pattern1 = [
  ['a', 'b'],
  ['b', 'a'],
];
const pattern2 = [
  ['b', 'a'],
  ['a', 'b'],
];

const text = [
  ['a', 'b', 'a'],
  ['b', 'a', 'b'],
];

const bakerBird = new BakerBird([pattern1, pattern2]);
const occurrences = bakerBird.match(text);
```

While the example uses one-character strings for pattern and text elements,
the implementation is generic and supports any data type. Element equality
is determined using the
[SameValueZero](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-samevaluezero)
algorithm.

You can reuse the same BakerBird instance to match patterns across
multiple texts:

```ts
const bakerBird = new BakerBird([pattern1, pattern2]);

const occurrencesA = bakerBird.match(textA);
const occurrencesB = bakerBird.match(textB);
```

This approach ensures that patterns are pre-processed only once.

### Occurrence Object

Each occurrence in the result array is of the following type:

```ts
interface Occurrence<Char> {
  pattern: Char[];
  patternIndex: number;
  col: number;
  row: number;
}
```

The `row` and `col` attributes represent the coordinates of the
"top-left corner" of the identified pattern within the given text.

## Time Complexity

The pre-processing time complexity for $`k`$ patterns of dimensions
$`m \times m'`$ is $`O(k \cdot m \cdot m')`$. Each subsequent `match`
operation on an $`n \times n'`$ text incurs a time complexity of
$`O(n \cdot n' + k \cdot m)`$. Consequently, the overall time complexity for
pre-processing and a single match is $`O(k \cdot m \cdot m' + n \cdot n')`$.

## Limitations

All patterns within a single match must be of the same dimension.
