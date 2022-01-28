const fs = require('fs');
const prettier = require('prettier');
const resolve = require('resolve');
const sortPackageJson = require('sort-package-json');

const boltPackageJsonPath = resolve.sync('@bolt/starter-kit/package.json')
const boltPackageJson = require(boltPackageJsonPath);

const updateBoltPackage = (packageName, writePath) => {
  const dependencyVersion = boltPackageJson.version;
  const finalPath = writePath || boltPackageJsonPath;



  // check if this component has already been added to the Bolt package.json and if so, will be removed
  if (Object.keys(boltPackageJson.dependencies).includes(packageName)) {
    delete boltPackageJson.dependencies[packageName];
  }

  boltPackageJson.dependencies[packageName] = `^${dependencyVersion}`;

  const updatedPrettyBoltPackageJson = prettier.format(
    JSON.stringify(sortPackageJson(boltPackageJson)),
    {
      singleQuote: true,
      trailingComma: 'es5',
      bracketSpacing: true,
      jsxBracketSameLine: true,
      parser: 'json',
    },
  );

  fs.writeFileSync(finalPath, updatedPrettyBoltPackageJson);

  return `${packageName} was successfully added to the Bolt package.json file`
}

module.exports = updateBoltPackage;
