/**
 * Generate index files to blaze-elements package
 */

const fs = require( 'fs' );
const packageJson = require( '../package.json' );
const path = require( 'path' );

const PACKAGE_JSON_NAME = 'package.json';

const packageList = require('./packages-list.js')
  .packageList()
  .filter(( packageName ) => packageName !== 'blaze-elements');

console.log(packageList);

const blazeElementPackagePath = path.resolve(__dirname, '..', 'packages', 'blaze-elements');

generatePackageList(packageJson, packageList);

generateIndex(
  path.resolve(blazeElementPackagePath, 'index.ts'),
  packageList,
  (packageName) => `import '@blaze-elements/${packageName}/index';`
);

generateIndex(
  path.resolve(blazeElementPackagePath, 'index.demo.tsx'),
  packageList,
  (packageName) => `import '@blaze-elements/${packageName}/index.demo';`
);

generateIndex(
  path.resolve(blazeElementPackagePath, 'index.test.ts'),
  packageList,
  (packageName) => `import '@blaze-elements/${packageName}/index.test';`
);

generateDependencies();

function generatePackageList( packageJson, packageList ) {
  packageJson.packages = packageList;

  fs.writeFileSync('./package.json', `${JSON.stringify(packageJson, null, 2)}\n`);
}

function generateIndex( filename, packageList, callback ) {
  fs.writeFileSync(
     filename,
    `${packageList.map(callback).join(`\n`)}\n`
  );
}

function generateDependencies() {

  const blazeElementPackageJson = require(path.resolve(blazeElementPackagePath, PACKAGE_JSON_NAME));
  blazeElementPackageJson.dependencies = packageList.reduce(
    (accumulator, packageName) => {

      const packageJson = require(
        path.resolve(__dirname, '..', 'packages', packageName, PACKAGE_JSON_NAME)
      );

      if (packageJson.name === 'blaze-elements') {
        return accumulator;
      }

      accumulator[`@blaze-elements/${packageName}`] = `^${packageJson.version}`;

      return accumulator;
    }, {}
  );

  fs.writeFileSync( path.resolve(blazeElementPackagePath, PACKAGE_JSON_NAME), JSON.stringify(blazeElementPackageJson, null, 2) + "\n" );
}

