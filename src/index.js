import findIndex from 'lodash.findindex';
import sortBy from 'lodash.sortby';

const dropTargetRank = (
  array,
  source,
  target,
  { key = '_id', log = false, rank = 'rank' } = {}
) => {
  let newRank = 0;
  const firstIndex = 0;
  const lastIndex = array.length - 1;
  const sourceObj = {};
  const targetObj = {};

  // Let's make sure our objects only contain these keys and no other keys
  sourceObj[key] = source[key];
  targetObj[key] = target[key];

  // Sort array by rank before trying to determine new rank
  array = sortBy(array, rank);

  const sourceIndex = findIndex(array, sourceObj);
  const targetIndex = findIndex(array, targetObj);

  switch (true) {
    case sourceIndex === -1 || targetIndex === -1:
      if (log) console.log('source or target not found within array'); // eslint-disable-line no-console
      return null;
      break;
    case sourceIndex > targetIndex && targetIndex === firstIndex:
      // drag item up location to first
      if (log) console.log('item up location to first'); // eslint-disable-line no-console
      newRank = array[firstIndex].rank / 2;
      break;
    case sourceIndex > targetIndex:
      // drag item up location
      if (log) console.log('item up location'); // eslint-disable-line no-console
      newRank = (array[targetIndex].rank + array[targetIndex - 1].rank) / 2;
      break;
    case sourceIndex < targetIndex && targetIndex === lastIndex:
      // drag item down location to last
      if (log) console.log('item down location to last'); // eslint-disable-line no-console
      newRank = array[lastIndex].rank + 1;
      break;
    case sourceIndex < targetIndex:
      // drag item down location
      if (log) console.log('item down location'); // eslint-disable-line no-console
      newRank = (array[targetIndex].rank + array[targetIndex + 1].rank) / 2;
      break;
  }

  if (log) console.log('new rank', newRank);

  return newRank;
};

export default dropTargetRank;
