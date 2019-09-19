const path = require('path');
const shell = require('shelljs');
const semver = require('semver');
const currentVersion = require(path.join(__dirname, './lerna.json')).version;
const cp = require('child_process');
const ora = require('ora');
const clear = require('clear');
const { gitSha } = require('@bolt/scripts/utils');
shell.config.silent = true;

function getNextReleaseType() {
  return shell.exec(`auto version --from v${currentVersion}`).stdout.trim();
}
const nextReleaseType = getNextReleaseType();

function getNextReleaseVersion() {
  return semver.inc(currentVersion, nextReleaseType);
}
const nextReleaseVersion = getNextReleaseVersion();

async function buildBeforeDeploying() {
  return new Promise(async (resolve, reject) => {
    const spinner = ora('Building Bolt...').start();

    try {
      await shell.exec(
        `yarn run setup --silent`,
        {
          async: true,
        },
        async () => {
          await shell.exec(
            `yarn run build`,
            {
              async: true,
              silent: true,
            },
            () => {
              resolve(spinner.succeed('OK: `npm run build` finished!'));
            },
          );
        },
      );
    } catch (error) {
      reject(spinner.fail(`The build failed! ${error}`));
    }
  });
}

async function deployWebsite() {
  return await shell.exec(
    `npx now deploy --meta gitSha="${gitSha}" --token=${process.env.NOW_TOKEN}`,
    {
      silent: true,
    },
  ).stdout;
}

async function testMonorepo() {
  return new Promise(async (resolve, reject) => {
    const spinner = ora('Running monorepo tests...').start();

    try {
      await shell.exec(
        'yarn run test:monorepo --silent',
        {
          async: true,
          silent: true,
        },
        (code, stdout, stderr) => {
          resolve(spinner.succeed('OK: all monorepo tests passed.'));
        },
      );
    } catch (error) {
      reject(
        spinner.fail(`Running \`yarn run test:monorepo\` failed! ${error}`),
      );
    }
  });
}

function normalizedUrlString(version) {
  const normalizedString = version
    .replace(/\//g, '-') // `/` => `-`
    .replace('--', '-') // `--` => `-` now.sh subdomains can't have `--` for some reason
    .replace(/\./g, '-'); // `.` => `-`
  return `${encodeURIComponent(normalizedString)}`;
}

// clears the docs site cache
function clearCache() {
  const spinner = ora('Clearing docs site cache...').start();
  const CMD = 'yarn run cache:clear';

  setTimeout(() => {
    shell.exec(CMD, (code, stdout, stderr) => {
      if (code !== 0) {
        spinner.fail(
          `Running \`${CMD}\` failed to clear the docs site cache. ${stderr}`,
        );
        shell.exit(1);
      } else {
        spinner.succeed('Cleared docs site cache!');
      }
    });
  }, 2000);
}

function getCanaryVersion() {
  const previousVersions = JSON.parse(
    shell.exec(`npm view @bolt/core versions --json`).stdout,
  );
  const previousCanary = JSON.parse(
    shell.exec(`npm view @bolt/core@canary dist-tags --json`).stdout,
  ).canary;

  let newCanaryVersionSuffix = 0;
  let newCanaryVersion;

  if (previousCanary !== '') {
    newCanaryVersionSuffix = parseInt(
      previousCanary.split('.')[previousCanary.split('.').length - 1],
    );
  }

  newCanaryVersion = `${nextReleaseVersion}-canary.${gitSha}.${newCanaryVersionSuffix}`;

  while (previousVersions.includes(newCanaryVersion)) {
    console.warn(
      `We found a previous canary release of ${newCanaryVersion} so bumping the canary version!`,
    );
    newCanaryVersion = `${nextReleaseVersion}-canary.${gitSha}.${newCanaryVersionSuffix +
      1}`;
  }

  return newCanaryVersion;
}

module.exports = {
  currentVersion,
  nextReleaseType,
  nextReleaseVersion,
  normalizedUrlString,
  buildBeforeDeploying,

  getCanaryVersion,
  deployWebsite,
  testMonorepo,
  clearCache,
};
