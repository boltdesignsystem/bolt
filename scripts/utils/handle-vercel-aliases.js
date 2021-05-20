#!/usr/bin/env node
const shell = require('shelljs');
const { TRAVIS } = require('./travis-vars');
const { normalizeUrlAlias } = require('./normalize-url-alias');

let setCheckRun, outputBanner;

const { NOW_TOKEN } = process.env;

async function aliasNowUrl(originalUrl, prefix) {
  console.log(
    'Creating now.sh alias off of the ' + originalUrl + ' deployment URL.',
  );

  // if (TRAVIS) {
  //   setCheckRun = require('../check-run').setCheckRun;
  //   outputBanner = require('ci-utils').outputBanner;

  //   await setCheckRun({
  //     name: 'Deploy - now.sh (alias)',
  //     status: 'in_progress',
  //   });
  //   outputBanner('Starting deploy...');
  // }

  const deployedUrl = originalUrl.trim();

  let aliasedUrl;

  if (prefix) {
    aliasedUrl = normalizeUrlAlias(prefix);
  } else {
    aliasedUrl = 'https://boltdesignsystem.com';
  }

  console.log(`Attempting to alias ${originalUrl} to ${aliasedUrl}...`);

  // if (TRAVIS) {
  //   await setCheckRun({
  //     status: 'in_progress',
  //     name: 'Deploy - now.sh (alias)',
  //   });
  // }

  const aliasOutput = shell.exec(
    `npx now alias ${deployedUrl} ${aliasedUrl} --team=boltdesignsystem --token=${NOW_TOKEN} --no-verify`,
  );

  if (aliasOutput.code !== 0) {
    console.log('Error aliasing:');
    console.log(aliasOutput.stdout, aliasOutput.stderr);

    //   if (TRAVIS) {
    //     await setCheckRun({
    //       status: 'completed',
    //       name: 'Deploy - now.sh (alias)',
    //       conclusion: 'failure',
    //       output: {
    //         title: 'Now.sh Deploy failure',
    //         summary: `
    // ${aliasOutput.stdout}
    // ${aliasOutput.stderr}
    //         `.trim(),
    //       },
    //     });
    //   }

    process.exit(1);
  } else {
    // console.log('Success Aliasing!');
    console.log(aliasOutput.stdout);
    // console.log(deployedUrl);
    // console.log(aliasedUrl);
    // if (TRAVIS) {
    //   await setCheckRun({
    //     status: 'completed',
    //     name: 'Deploy - now.sh (alias)',
    //     conclusion: 'success',
    //     output: {
    //       title: 'Now.sh Deploy',
    //       summary: `
    // - ${deployedUrl}
    // - ${aliasedUrl}
    //       `.trim(),
    //     },
    //   });
    // }
  }
}

module.exports = {
  aliasNowUrl,
};
