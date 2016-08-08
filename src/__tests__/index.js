import { expect } from 'chai';
import { sum } from '../';
const { describe, it } = global;
import dropTargetRank from '../index';
import sortBy from 'lodash.sortby';
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
const baz ={
  _id: 'NDwXkDQQQHsRENzR9',
  name: 'Baz',
  rank: 3,
};
const qux ={
  _id: 'aML3Q45nqyaJc4Qes',
  name: 'Qux',
  rank: 4,
};
let array = [foo, bar, baz];

describe('sum', () => {
  it('item up location to first', async () => {
    let result;

    array = sortBy(array, 'rank');

    result = dropTargetRank(array, baz, foo);
    expect(result).to.be.equal(0.5);

    result = dropTargetRank(array, bar, foo);
    expect(result).to.be.equal(0.5);
  });

  it('item up location', async () => {
    let result;

    array = sortBy(array, 'rank');

    result = dropTargetRank(array, baz, bar);
    expect(result).to.be.equal(1.5);
  });

  it('item down location to last', async () => {
    let result;

    array = sortBy(array, 'rank');

    result = dropTargetRank(array, foo, baz);
    expect(result).to.be.equal(4);

    result = dropTargetRank(array, bar, baz);
    expect(result).to.be.equal(4);
  });

  it('item down location', async () => {
    let result;

    array = sortBy(array, 'rank');

    result = dropTargetRank(array, foo, bar);
    expect(result).to.be.equal(2.5);
  });

  it('source and target must be objects within array', async () => {
    array = sortBy(array, 'rank');

    expect(() => dropTargetRank(array, '123', '456')).to.throw(Error);
    expect(() => dropTargetRank(array, foo, '456')).to.throw(Error);
    expect(() => dropTargetRank(array, '456', foo)).to.throw(Error);
    expect(() => dropTargetRank(array, foo, qux)).to.throw(Error);
    expect(() => dropTargetRank([], foo, bar)).to.throw(Error);
    expect(() => dropTargetRank(array, {}, bar)).to.throw(Error);
    expect(() => dropTargetRank(array, foo, {})).to.throw(Error);
  });
});
