# Gfycat IDs
Generate predictable and unique identifiers in the same style used by
[gfycat.com](https://gfycat.com), with the ability to seed the random
identifiers.

## Range of IDs

Currently, there are 1347 adjectives and 221 animals. The more adjectives used,
the more possible combinations of IDs available.

For a quick reference, with 2 adjectives used, there are 400,984,389 possible
unique IDs.

With 3 adjectives, there are 540,125,971,983 possible unique IDs.

## Installation

```bash
$ npm install gfycat-ids
```

## Usage

### Examples

```js
const { generateId } = require('gfycat-ids');

generateId('short seed'); // KnobbyNauticalKingfisher

generateId('longer seed', 3); // RadiantGrowingOutstandingGrasshopper

generateId('longest seed', 4, {
  delimiter: '-',
  caseStyle: 'lowercase'
}); // unwritten-shameless-enchanted-international-cormorant
```

### Documentation

#### `generateId(seed, [adjectiveCount, [{opts}]])`

##### `seed: any`

The seed used to generate the id. This allows us to generate predictable, but
random and unique identifiers. Defaults to the current time in milliseconds.

##### `adjectiveCount: integer`

The number of adjectives to use in the identifier. Defaults to `2`.

##### `opts.delimiter: string`

The delimiter used between words. The delimiter will also be used between
multi-word adjectives. Defaults to `''`.

##### `opts.caseStyle: enum`

The case style for the words. Possible options are `'titlecase'`, `'camelcase'`, `'uppercase'`, `'lowercase'`, and `'togglecase'`.

```js
generateId('titlecase', 2, { caseStyle: 'titlecase' }); // FineAntiqueElk

generateId('camelcase', 2, { caseStyle: 'camelcase' }); // pertinentPoshGoldfinch

generateId('uppercase', 2, { caseStyle: 'uppercase' }); // PIERCINGRESPONSIBLECAMEL

generateId('lowercase', 2, { caseStyle: 'lowercase' }); // imaginarywingedsalamander

generateId('togglecase', 2, { caseStyle: 'togglecase' }); // STUnnINGDesCrIPtiVePeaFOwL
```

Defaults to `'titlecase'`.

## Credits

This project was inspired by
[gfycat-style-urls](https://github.com/dexo568/gfycat-style-urls).

The seeded random number generator used is powered by the alea algorithm by
Johannes Baagøe `<baagoe@baagoe.com>`, ported by [nquinlan/better-random-numbers-for-javascript-mirror](https://github.com/nquinlan/better-random-numbers-for-javascript-mirror/blob/master/support/js/Alea.js).

> This repository is not affiliated with [gfycat.com](https://gfycat.com).
