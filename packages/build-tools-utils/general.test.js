const general = require('./general');

const testArray = ['red', 'green', 'blue'];
const testArrayTwo = ['dog', 'cat', 'fish'];
const test2DArray = ['red', ['forest', 'neon green'], ['seafoam']];
const test3DArray = ['red', ['forest', ['one', 'two', 'three']], ['seafoam']];
const testNonUniqueArray = ['one', 'two', 'three', 'two', 'three', 'three'];

test('Flatten 2 dimensional array', () => {
  const expectedResults = ['red', 'forest', 'neon green', 'seafoam'];
  const test = general.flattenArray(test2DArray);

  expect(test).toEqual(expectedResults);
});

test('Flatten 3 dimensional array', () => {
  const expectedResults = ['red', 'forest', ['one', 'two', 'three'], 'seafoam'];
  const test = general.flattenArray(test3DArray);

  expect(test).toEqual(expectedResults);
});

test('Concat two 1 dimensional arrays', () => {
  const test = general.concatArrays(testArray, testArrayTwo);
  const expectedResults = ['red', 'green', 'blue', 'dog', 'cat', 'fish'];

  expect(test).toEqual(expectedResults);
});

test('Concat 2 dimensional arrays', () => {
  const test = general.concatArrays(testArray, test2DArray);
  const expectedResults = [
    'red',
    'green',
    'blue',
    'red',
    ['forest', 'neon green'],
    ['seafoam'],
  ];

  expect(test).toEqual(expectedResults);
});

test('Remove duplicate entries from an array', () => {
  const test = general.uniqueArray(testNonUniqueArray);
  const expectedResults = ['one', 'two', 'three'];

  expect(test).toEqual(expectedResults);
});
