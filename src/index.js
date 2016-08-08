import findIndex from 'lodash.findindex';

const dropTargetRank = (array, source, target, { key = '_id', log = false } = {}) => {
  let newRank = 0;
  const firstIndex = 0;
  const lastIndex = array.length - 1;
  const sourceObj = {};
  const targetObj = {};
  sourceObj[key] = source[key];
  targetObj[key] = target[key];
  const sourceIndex = findIndex(array, sourceObj);
  const targetIndex = findIndex(array, targetObj);

  switch (true) {
    case sourceIndex === -1 || targetIndex === -1:
      throw new Error('source and target must be objects within array'); // eslint-disable-line
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

  return newRank;
};

export default dropTargetRank;
