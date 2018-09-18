import { expect } from 'chai';
import dropTargetRank from '../src';

const { describe, it } = global;
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
const qux = {
  _id: 'aML3Q45nqyaJc4Qes',
  name: 'Qux',
  rank: 4,
};
let array = [foo, baz, bar];

describe('sum', () => {
  it('item up location to first', async () => {
    let result = dropTargetRank(array, baz, foo);
    expect(result).to.be.equal(0.5);
  });

  it('item up location', async () => {
    let result = dropTargetRank(array, baz, bar);
    expect(result).to.be.equal(1.5);
  });

  it('item down location to last', async () => {
    let result = dropTargetRank(array, foo, baz);
    expect(result).to.be.equal(4);
  });

  it('item down location', async () => {
    let result = dropTargetRank(array, foo, bar);
    expect(result).to.be.equal(2.5);
  });

  it('return null if source or target not found within array', async () => {
    let result = dropTargetRank(array, '123', '456');
    expect(result).to.be.null;

    result = dropTargetRank(array, foo, '456');
    expect(result).to.be.null;

    result = dropTargetRank(array, '456', foo);
    expect(result).to.be.null;

    result = dropTargetRank(array, foo, qux);
    expect(result).to.be.null;

    result = dropTargetRank([], foo, bar);
    expect(result).to.be.null;

    result = dropTargetRank(array, {}, bar);
    expect(result).to.be.null;

    result = dropTargetRank(array, foo, {});
    expect(result).to.be.null;
  });
});
