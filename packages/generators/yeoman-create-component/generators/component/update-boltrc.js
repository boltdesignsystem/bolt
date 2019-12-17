const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

const boltRcConfigPath = path.resolve(
  __dirname,
  '../../../../docs-site/.boltrc.js',
);
const boltRcConfig = require(boltRcConfigPath);

function updateBoltRcConfig(newPackageName) {
  // check if this component has already been added to the .boltrc config and if so, exit early
  if (boltRcConfig.components.global.includes(newPackageName)) {
    console.warn(
      `the .boltrc config already has the new ${newPackageName} component added -- skipped adding this component automatically`,
    );
  } else {
    const updatedBoltRcContent = fs
      .readFileSync(boltRcConfigPath)
      .toString()
      .replace(/global: \[/, `global: ['${newPackageName}',`);

    const updatedPrettyBoltRcContent = prettier.format(updatedBoltRcContent, {
      singleQuote: true,
      trailingComma: 'es5',
      bracketSpacing: true,
      jsxBracketSameLine: true,
      parser: 'flow',
    });

    fs.writeFileSync(boltRcConfigPath, updatedPrettyBoltRcContent);
  }
}

module.exports = {
  updateBoltRcConfig,
};
