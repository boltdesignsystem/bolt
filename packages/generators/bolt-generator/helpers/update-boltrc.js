const fs = require('fs');
const prettier = require('prettier');
const resolve = require('resolve');

const boltRcPath = resolve.sync('@bolt/starter-kit/.boltrc.js');
const boltRc = require(boltRcPath);

const updateBoltRcConfig = (packageName, writePath) => {
  const finalPath = writePath || boltRcPath;
  // check if this component has already been added to the .boltrc config and if so, remove it
  if (boltRc.components.global.includes(packageName)) {
    return `the .boltrc config already has the '${packageName}' component added -- skipped adding this component automatically`
  }

  const updatedBoltRc = fs
    .readFileSync(boltRcPath)
    .toString()
    .replace(/global: \[/, `global: [\n      '${packageName}',`);

  const updatedPrettyBoltRc = prettier.format(updatedBoltRc, {
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    jsxBracketSameLine: true,
    parser: 'flow',
  });

  fs.writeFileSync(finalPath, updatedPrettyBoltRc);

  return `${packageName} was successfully added to the .boltrc`;
}

module.exports = updateBoltRcConfig;
