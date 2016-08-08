# drop-target-rank

Easily calculate the new rank value for drag-drop items given source & target values.

```
npm install drop-target-rank
```

## Params

`(array, source, target, options)`

* `array`: main array containing all rank objects
* `source`: rank object that is being dragged
* `target`: rank object the source is being dragged onto
* `options`
    * `key` (default: `'_id'`): unique property id of the rank object
    * `log` (default: `false`): enable logging to console

## Usage

```
import dropTargetRank from 'drop-target-rank';
import sortBy from 'lodash.sortby';

// Array should contain a list of objects
// Objects should always have a rank property that initially starts at 1
const foo = {
  _id: '28NKN243Qvzbp4NBs',
  name: 'Foo',
  rank: 1,
};
const bar = {
  _id: '7dtGG6FParwqjnaTe',
  name: 'Bar',
  rank: 2,
};
const baz = {
_id: 'NDwXkDQQQHsRENzR9',
  name: 'Baz',
  rank: 3,
};
let array = [foo, bar, baz];

// The array should also be sorted by rank before trying to determine the new rank
// lodash.sortBy method is ideal for this
array = sortBy(array, 'rank');

// Then call dropTargetRank with array, source, target, and optional params
// This method calculates the new source rank value automatically
const newRank = dropTargetRank(array, foo, bar, { log: true });

// side effect from log: true
if (newRank) { // always check value, will return null on error
  console.log(newRank); // outputs 2.5, placing Foo between Bar and Baz
}
```
