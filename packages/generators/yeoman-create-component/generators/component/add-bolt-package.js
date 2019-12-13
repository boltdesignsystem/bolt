const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const sortPackageJson = require('sort-package-json');

const boltPackageJsonPath = path.resolve(
  __dirname,
  '../../../../docs-site/package.json',
);
const boltPackageJson = require(boltPackageJsonPath);

function addBoltPackage(newPackageName) {
  let deleteExisting = false;
  // check if this component has already been added to the .boltrc config and if so, exit early
  if (Object.keys(boltPackageJson.dependencies).includes(newPackageName)) {
    console.warn(
      `the Bolt package.json file already has the new ${newPackageName} component added -- removing old component and adding in the latest.`,
    );

    deleteExisting = true;
  }

  const dependencyVersion = boltPackageJson.version;

  // if a bolt dependency was previously added, make sure we delete the old package before before adding the new one
  if (deleteExisting) {
    delete boltPackageJson.dependencies[newPackageName];
  }

  boltPackageJson.dependencies[newPackageName] = `^${dependencyVersion}`;

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

  fs.writeFileSync(boltPackageJsonPath, updatedPrettyBoltPackageJson);
}

module.exports = {
  addBoltPackage,
};
