let pnp;

try {
  pnp = require(`pnpapi`);
} catch (error) {
  // not in PnP; not a problem
}

const seen = new Set();
const findUp = require('find-up');
const path = require('path');

// // const getLocatorKey = locator => JSON.stringify(locator);
// // const traverseDependencyTree = (parent) => {
// //   // Prevent infinite recursion when A depends on B which depends on A
// //   const parentKey = getLocatorKey(parent);
// //   if (seen.has(parentKey))
// //     return;

// //   const sourceLocation = pnp.findPackageLocator(parent);
// //   const parentLocator = getDependencyLocator(sourceLocation, parent);

// //   const pkg = pnp.getPackageInformation(parentLocator);
// //   console.assert(pkg, `The package information should be available`);

// //   seen.add(parentKey);

// //   for (const [name, reference] of pkg.packageDependencies)
// //     if (reference !== null) // Check against unmet peer dependencies
// //       traverseDependencyTree({name, reference});

// //   seen.remove(parentKey);

// //   return depMap;
// // };

// // Iterate on each workspace
// for (const locator of pnp.getDependencyTreeRoots()) {
//   traverseDependencyTree(locator);
// }



function getDependencyLocator(sourceLocator, name) {
  const {packageDependencies} = pnp.getPackageInformation(sourceLocator);
  const reference = packageDependencies.get(name);

  return {name, reference};
}

function resolve(module) {
  const sourceLocation = pnp.findPackageLocator(module);
  const package = getDependencyLocator(sourceLocation, module);
  const sourceInformation = pnp.getPackageInformation(package);

  if (!sourceInformation) {
    // console.log(module);
    // console.log(sourceLocation);
    // console.log(package);
    console.log(pnp.resolveToUnqualified(module, null, {considerBuiltins: false}));
    throw new Error(`Couldn't find the package to use as resolution source`);
  }

  if (!sourceInformation.packageLocation) {
    console.log(module);
    console.log(sourceLocation);
    console.log(package);
    console.log(sourceInformation);
    throw new Error(`The package to use as resolution source seem to not have been installed - maybe it's a devDependency not installed in prod?`);
  }

  return sourceInformation.packageLocation
}


function resolveDependency(module, dependency) {

  // console.log(pnp.resolveRequest());

  console.log(findUp.sync('package.json', {
    cwd: path.dirname(pnp.resolveRequest(dependency, module))
  }));

// dependency
//   console.log(pnp.findPackageLocator(dependency));
  // const sourceLocation = pnp.findPackageLocator(module);
  // const package = getDependencyLocator(sourceLocation, module);
  // const sourceInformation = pnp.getPackageInformation(package);

  // if (!sourceInformation) {
  //   console.log(module);
  //   console.log(sourceLocation);
  //   console.log(package);
  //   console.log(pnp.resolveToUnqualified(module, null, {considerBuiltins: false}));
  //   throw new Error(`Couldn't find the package to use as resolution source`);
  // }

  // if (!sourceInformation.packageLocation) {
  //   console.log(module);
  //   console.log(sourceLocation);
  //   console.log(package);
  //   console.log(sourceInformation);
  //   throw new Error(`The package to use as resolution source seem to not have been installed - maybe it's a devDependency not installed in prod?`);
  // }

  // return sourceInformation.packageLocation
}

module.exports.resolve = function(module){
  if (pnp) {
    return resolve(module);
  } else {
    return require.resolve(module);
  }
}

module.exports.resolveDependency = function(module, dependency){
  if (pnp) {
    return resolveDependency(module, dependency);
  } else {
    return require.resolve(dependency);
  }
}
