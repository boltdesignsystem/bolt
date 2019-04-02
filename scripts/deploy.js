#!/usr/bin/env node
const fs = require('fs');
const shell = require('shelljs');
const path = require('path');
const { gitSha } = require('./utils');
const { branchName } = require('./utils/branch-name');
const { getConfig } = require('../packages/build-tools/utils/config-store');
const { fileExists } = require('../packages/build-tools/utils/general');

const { TRAVIS, TRAVIS_TAG } = require('./utils/travis-vars');
const { NOW_TOKEN } = process.env;

let setCheckRun, outputBanner, deployedUrlPretty, deployedUrl;

async function init() {
  try {
    let config = await getConfig();
    if (TRAVIS) {
      setCheckRun = require('./check-run').setCheckRun;
      outputBanner = require('ci-utils').outputBanner;

      await setCheckRun({
        name: 'Deploy - now.sh (basic)',
        status: 'in_progress',
      });
      outputBanner('Starting deploy...');
    }

    // for non-master / release / tagged version deploys, speed things up.
    try {
      if (
        !TRAVIS_TAG &&
        !branchName.includes('master') &&
        !branchName.includes('release') &&
        !branchName.includes('next')
      ) {
        fs.writeFileSync(
          path.join(process.cwd(), `${config.wwwDir}/now.json`),
          JSON.stringify({
            version: 2,
            scope: 'boltdesignsystem',
            name: 'boltdesignsystem',
            builds: [
              {
                src: '**/*',
                use: '@now/static',
              },
            ],
            routes: [
              { src: '/.*', headers: { 'Access-Control-Allow-Origin': '*' } },
            ],
          }),
        );

        const nowConfigExists = await fileExists(
          path.join(process.cwd(), 'now.json'),
        );

        if (nowConfigExists) {
          shell.exec(`rm ${path.join(process.cwd(), 'now.json')}`);
        }

        shell.exec(
          `cd ${path.join(
            process.cwd(),
            config.wwwDir,
          )} && now deploy --meta gitSha="${gitSha}" --scope=boltdesignsystem`,
        );
      } else {
        deployedUrl = shell.exec(
          `now deploy --meta gitSha="${gitSha}" --token=${NOW_TOKEN}`,
        ).stdout;
      }

      if (TRAVIS) {
        deployedUrlPretty = deployedUrl.trim();

        await setCheckRun({
          status: 'completed',
          name: 'Deploy - now.sh (basic)',
          conclusion: 'success',
          output: {
            title: 'Now.sh Basic Deploy',
            summary: `
      - ${deployedUrlPretty}
            `.trim(),
          },
        });

        await handleNowDeploy(child);
      }
    } catch (error) {
      console.log(error);
      console.error('Error deploying:');
      console.log(error.stdout, error.stderr);

      if (TRAVIS) {
        await setCheckRun({
          status: 'completed',
          name: 'Deploy - now.sh (basic)',
          conclusion: 'failure',
          output: {
            title: 'Now.sh Deploy failure',
            summary: `
  ${error.stdout}
  ${error.stderr}
            `.trim(),
          },
        });
      }
      process.exit(1);
    }
  } catch (error) {
    console.log('Error');
    console.error(error);
    process.exit(1);
  }
}

init();
