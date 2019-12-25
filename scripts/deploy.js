#!/usr/bin/env node
const fs = require('fs');
const shell = require('shelljs');
const path = require('path');
const { getConfig } = require('@bolt/build-utils/config-store');
const { fileExists } = require('@bolt/build-utils/general');
const { gitSha } = require('./utils');
const { branchName } = require('./utils/branch-name');

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

    try {
      // experimental approach for speeding up non-master / release / tagged version deploys
      // if (
      //   !TRAVIS_TAG &&
      //   !branchName.includes('master') &&
      //   !branchName.includes('release') &&
      //   !branchName.includes('next')
      // ) {
      //   shell.exec(
      //     `cp ${path.join(process.cwd(), 'now.v2.json')} ${path.join(
      //       process.cwd(),
      //       config.wwwDir,
      //     )}/now.json`,
      //   );

      //   deployedUrl = shell.exec(
      //     `cd ${path.join(
      //       process.cwd(),
      //       config.wwwDir,
      //     )} && now deploy --meta gitSha="${gitSha}" --token=${NOW_TOKEN} --no-verify`,
      //   );
      // } else {
      // }
      deployedUrl = shell.exec(
        `npx now --meta gitSha="${gitSha}" --token=${NOW_TOKEN}`,
      ).stdout;

      deployedUrlPretty = deployedUrl.trim();

      if (TRAVIS) {
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
