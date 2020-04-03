const packageJson = require('package-json');
const shell = require('shelljs');
const prettier = require('prettier');
const path = require('path');
const fs = require('fs');
const boltPackages = JSON.parse(
  shell.exec('lerna ls --json', { silent: true }).stdout,
);

const { getConfig } = require('@bolt/build-utils/config-store');

const processedPackages = [];
const totalNumberOfPackages = boltPackages.length; // # of packages found
let numberOfPackagesProcessed = 0; // iterator for forEach loop so we know when we're done

async function generatePackageData() {
  boltPackages.forEach(async (pkg) => {
    if (pkg.version !== '0.0.0' && pkg.private !== true) {
      const name = pkg.name;
      try {
        const pkgInfo = await packageJson(name, {
          allVersions: true,
        });

        processedPackages.push(pkgInfo);
        numberOfPackagesProcessed += 1;
      } catch (err) {
        console.log(err);
      }
    } else {
      numberOfPackagesProcessed += 1;
    }

    if (numberOfPackagesProcessed === totalNumberOfPackages) {
      const config = await getConfig();
      const unformattedJSON = JSON.stringify(processedPackages);
      const formattedJSON = prettier.format(unformattedJSON, {
        parser: 'json',
      });

      fs.writeFile(
        path.join(config.dataDir, 'bolt-pkg-versions.json'),
        formattedJSON,
        'utf8',
        function (err) {
          if (err) {
            console.log('An error occured while writing JSON Object to File.');
            return console.log(err);
          }

          console.log('Bolt NPM pkg Data has been saved.');
        },
      );
    }
  });
}

module.exports = {
  generatePackageData,
};
