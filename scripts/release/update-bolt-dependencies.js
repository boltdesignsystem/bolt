const shell = require('shelljs');
const path = require('path');
const globby = require('globby');
const jsonFile = require('jsonfile');
const Ora = require('ora');
const chalk = require('chalk');

const globPattern = '**/package.json';
const additionalPkgSymbols = ['^', '~'];
const boltPackages = JSON.parse(
  shell.exec('lerna ls --json', { silent: true }).stdout,
);

let spinner = new Ora(chalk.blue(`Detecting bolt packages to update`)).start();

async function readJsonPackages(directories) {
  const dirs = directories ? directories : [];
  const allPackages = dirs.map((dir) => path.join(dir, globPattern));

  return await globby(allPackages, { dot: true });
}

async function collectDependencies(json) {
  const dependencies = json.dependencies ? json.dependencies : {};
  const devDependencies = json.devDependencies ? json.devDependencies : {};

  return { ...dependencies, ...devDependencies };
}

async function checkForBoltDependencies(json) {
  const keys = Object.keys(await collectDependencies(json));

  return keys.filter((key) => key.includes('@bolt')).length > 0;
}

async function lookForAdditionalSymbols(pkgNumber) {
  const pkg = typeof pkgNumber !== 'undefined' ? pkgNumber : '';

  return additionalPkgSymbols.filter((symbol) => pkg.includes(`${symbol}`));
}

async function compareBoltVersions(pkg, json) {
  const dependencies = await collectDependencies(json);
  const pkgDependency = dependencies[`${pkg.name}`];
  const symbol = await lookForAdditionalSymbols(pkgDependency);
  const pkgNumber = symbol.length > 0 ? pkgDependency.substr(1) : pkgDependency;
  const dependencyNumber = pkgNumber < pkg.version ? pkg.version : pkgNumber;

  return symbol.length > 0
    ? `${symbol[0]}${dependencyNumber}`
    : dependencyNumber;
}

async function updateDependencies(dirs) {
  const paths = await readJsonPackages(dirs);

  paths.forEach(async (file) => {
    jsonFile.readFile(file, async (error, data) => {
      if (error) {
        spinner.fail(
          chalk.red(`Error trying to read package.json file. ${error}`),
        );

        process.exitCode = 1;
      } else {
        const isBoltDependencies = await checkForBoltDependencies(data);

        if (isBoltDependencies) {
          const dependencies = data.dependencies;
          const devDependencies = data.devDependencies;

          return Promise.all(
            await boltPackages.map(async (pkg) => {
              const updatedVersion = await compareBoltVersions(pkg, data);

              if (
                typeof dependencies !== 'undefined' &&
                typeof dependencies[`${pkg.name}`] !== 'undefined'
              ) {
                data.dependencies[`${pkg.name}`] = updatedVersion;
              } else if (
                typeof devDependencies !== 'undefined' &&
                typeof devDependencies[`${pkg.name}`] !== 'undefined'
              ) {
                data.devDependencies[`${pkg.name}`] = updatedVersion;
              }
            }),
          )
            .then(() => {
              jsonFile.writeFile(file, data, { spaces: 2 }, (error) => {
                if (error) {
                  spinner.fail(
                    chalk.red(
                      `Error trying to update package.json file. ${error}`,
                    ),
                  );

                  process.exitCode = 1;
                }
              });
            })
            .catch((error) => {
              spinner.fail(
                chalk.red(`Error trying to update package.json file. ${error}`),
              );

              process.exitCode = 1;
            });
        }
      }
    });
  });

  spinner.succeed(chalk.green(`Packages updated`));
}

module.exports = {
  updateDependencies,
};
