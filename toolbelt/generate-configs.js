/**
 * Generate tsconfig.json and package.json for packages
 */

const fs = require( 'fs' );
const path = require( 'path' );

const PACKAGE_JSON_NAME = 'package.json';
const TSCONFIG_JSON_NAME = 'tsconfig.json';


const packageList = require('./packages-list.js').packageList();

console.log('Generating package.json and tsconfig.json for:');

const packagesRootDir = path.resolve(__dirname, '..', 'packages');
const templatesRootDir = path.resolve(__dirname, 'templates');

const packageTemplate = require( path.resolve(templatesRootDir, PACKAGE_JSON_NAME) );
const tsconfigTemplate = require( path.resolve(templatesRootDir, TSCONFIG_JSON_NAME) );


packageList.forEach( generateConfigs );

function generateConfigs( packageName ) {

  console.log(`Generating package: ${packageName}`);

  const packageRootDir = path.resolve(packagesRootDir, packageName);

  // Generate package.json file base on package package.json file and template
  const packagePackageJsonPath = path.resolve(packageRootDir, PACKAGE_JSON_NAME);

  const originalPackageConfig = fs.existsSync( packagePackageJsonPath )
    ? require( packagePackageJsonPath )
    : {};

  const packageConfig = Object.assign(
    {},
    packageTemplate,
    {
      name: originalPackageConfig.name || packageTemplate.name,
      version: originalPackageConfig.version || packageTemplate.version,
      dependencies: originalPackageConfig.dependencies
    }
  );

  saveConfigTo(
    path.resolve(packageRootDir, TSCONFIG_JSON_NAME),
    tsconfigTemplate
  );

  saveConfigTo(
    path.resolve(packageRootDir, PACKAGE_JSON_NAME),
    packageConfig,
    ( str ) => str.replace( /packageName/g, packageName )
  );

}

function saveConfigTo( where, config, transformCallback = (_) => _ ) {

  fs.writeFileSync( where, transformCallback( serializeConfig( config ) ) );

}

function serializeConfig( config ) {
  return `${JSON.stringify( config, null, 2 )}\n`;
}

console.log('Generating packages done');
