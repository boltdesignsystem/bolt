const shell = require('shelljs');
const { IncomingWebhook } = require('@slack/webhook');
const chalk = require('chalk');
const semver = require('semver');
const { getLatestDeploy } = require('./scripts/utils');
const { gitSha } = require('./scripts/utils');
const { normalizeUrlAlias } = require('./scripts/utils/normalize-url-alias');
const { branchName } = require('./scripts/utils/branch-name');
const { NOW_TOKEN } = process.env;

const isFullRelease = branchName.startsWith('release');

const lernaConfig = require('./lerna.json');
const currentVersion = lernaConfig.version;

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

// force color output in CLI
// @ts-ignore
process.env.FORCE_COLOR = true;

async function getLernaPackages() {
  const packages = shell.exec('lerna ls -pl', {
    silent: true,
  }).stdout;
  const formattedPackages = [];
  packages.split('\n').map(packageInfo => {
    const [packagePath, name, version] = packageInfo.split(':');

    if (packagePath && version) {
      formattedPackages.push({ path: packagePath, name, version });
    }
  });

  return formattedPackages;
}

async function init() {
  if (isFullRelease) {
    const version =
      (await shell
        .exec(`auto version --from v${currentVersion}`, {
          silent: true,
          maxBuffer: Infinity,
        })
        .stdout.trim()) || 'minor';

    try {
      const nextVersion = await semver.inc(currentVersion, version);

      console.log('current version', currentVersion);
      console.log('upcoming version type', version);
      console.log('next version', nextVersion);

      if (!currentVersion || !nextVersion || nextVersion === currentVersion) {
        console.error(`Unknown version to publish to!`);
        return;
      } else {
        await shell.exec(`
          node scripts/release/update-php-package-versions.js -v ${nextVersion}
          git add packages/twig-integration/twig-extensions-shared/composer.json packages/twig-integration/drupal-module/bolt_connect.info.yml packages/twig-integration/drupal-module/composer.json
          git commit -m "[skip travis] chore: version bump PHP-related dependencies to v${nextVersion}"
        `);
        await shell.exec(`
          git reset --hard
          rm scripts/bolt-design-system-bot.private-key.pem
          lerna publish ${version} --yes -m "[skip travis] chore(release): release %s"
        `);

        await shell.exec(`
          ./node_modules/.bin/auto release --from v${currentVersion} --use-version v${nextVersion}
        `);

        // get the version we just published
        const releaseVersion = `v${nextVersion}`; // ex. v2.9.0
        const branchSpecificUrl = await normalizeUrlAlias(branchName);
        const tagSpecificUrl = await normalizeUrlAlias(releaseVersion);
        const vercelAliases = [];

        vercelAliases.push(branchSpecificUrl);
        vercelAliases.push(tagSpecificUrl);
        vercelAliases.push('www.boltdesignsystem.com');
        vercelAliases.push('boltdesignsystem.com');
        vercelAliases.push('www.bolt-design-system.com');
        vercelAliases.push('bolt-design-system.com');
        vercelAliases.push(await normalizeUrlAlias('latest'));

        await shell.exec(`
          npx json -I -f docs-site/.incache -e 'this["bolt-tags"].expiresOn = "2019-06-14T12:30:26.377Z"'
          npx json -I -f docs-site/.incache -e 'this["bolt-urls-to-test"].expiresOn = "2019-06-14T12:30:26.377Z"'
          npx vercel alias boltdesignsystem.com ${tagSpecificUrl} --token=${NOW_TOKEN}
          npm run build
          npx vercel deploy --meta gitSha='${gitSha}' --token=${NOW_TOKEN}
        `);

        const latestUrl = await getLatestDeploy();

        vercelAliases.forEach(alias => {
          shell.exec(
            `npx vercel alias ${latestUrl} ${alias} --token=${NOW_TOKEN}`,
          );
        });

        await shell.exec(`
          git add docs-site/.incache
          git commit -m "[skip travis] chore: update .incache file"
          git tag -fa ${releaseVersion} -m ${releaseVersion}
          git push --no-verify
          git push origin ${releaseVersion} --no-verify --force
          git reset --hard HEAD
        `);

        if (nextVersion && nextVersion !== null && releaseVersion !== 'vnull') {
          if (SLACK_WEBHOOK_URL) {
            const webhook = new IncomingWebhook(SLACK_WEBHOOK_URL);
            await webhook.send({
              text: `Bolt \`${releaseVersion}\` has been released! Check out the <https://github.com/boltdesignsystem/bolt/releases/tag/${releaseVersion}|latest release notes> for more details!
                - <https://boltdesignsystem.com|Updated Docs Site>`,
            });
          } else {
            console.log(
              chalk.yellow(
                'Skipped sending Slack notification about upcoming Bolt release -- missing `SLACK_WEBPACK_URL` env variable!',
              ),
            );
          }

          // Temporarily, only merge back to master if this is the release/2.x branch.
          if (branchName === 'release/2.x') {
            await shell.exec(`
              git fetch --depth=50 origin master:master
              git checkout master
              git pull
              git merge ${branchName}
              git push --no-verify
            `);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log(
      `Skipping doing an auto-release since the current branch, ${branchName}, isn't master or a release branch!`,
    );
  }
}
init();
