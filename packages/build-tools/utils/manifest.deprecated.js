// @todo: we can remove this entire file once we hit Bolt v3.0

const getPkgInfo = require('./manifest.get-pkg-info');

// recursively flatten heavily nested arrays
function flattenDeep(arr1) {
  return arr1.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    [],
  );
}

// utility function to help with removing duplicate objects (like shared dependencies)
function removeDuplicateObjectsFromArray(originalArray, prop) {
  var newArray = [];
  var lookupObject = {};

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}

// loop through package-specific dependencies to merge and dedupe
async function aggregateBoltDependencies(data) {
  let componentDependencies = [];
  let componentsWithoutDeps = data;

  componentsWithoutDeps.forEach(item => {
    if (item.deps) {
      componentDependencies.push([...item.deps]);
    }
  });

  componentDependencies = flattenDeep(componentDependencies);

  componentDependencies = componentDependencies.filter(function(x, i, a) {
    if (x !== '@bolt/build-tools' && a.indexOf(x) === i) {
      return x;
    }
  });

  let globalDepsSrc = await Promise.all(
    componentDependencies.map(async item => {
      const { processedPkg } = await getPkgInfo(item);
      return processedPkg;
    }),
  );

  componentsWithoutDeps = componentsWithoutDeps.concat(globalDepsSrc);

  var uniqueComponentsWithDeps = removeDuplicateObjectsFromArray(
    componentsWithoutDeps,
    'name',
  );

  return uniqueComponentsWithDeps;
}

module.exports = {
  aggregateBoltDependencies,
  flattenDeep,
};
