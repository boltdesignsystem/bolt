#!/usr/bin/env node
const shell = require('shelljs');
const { TRAVIS } = require('./travis-vars');
const { setCheckRun } = require('../check-run');
const { normalizeUrlAlias } = require('./normalize-url-alias');

let { NOW_TOKEN } = process.env;
const baseNowArgs = ['--platform-version=1', '--team=boltdesignsystem'];

if (NOW_TOKEN) baseNowArgs.push(`--token=${NOW_TOKEN}`);

async function aliasNowUrl(originalUrl, prefix) {
  console.log(
    'Creating now.sh alias off of the ' + originalUrl + ' deployment URL.',
  );

  const deployedUrl = originalUrl.trim();

  let aliasedUrl;

  if (prefix) {
    aliasedUrl = normalizeUrlAlias(prefix);
  } else {
    aliasedUrl = 'https://boltdesignsystem.com';
  }

  console.log(`Attempting to alias ${originalUrl} to ${aliasedUrl}...`);

  await setCheckRun({
    status: 'in_progress',
    name: 'Deploy - now.sh (alias)',
  });

  const aliasOutput = shell.exec(
    `npx now alias ${deployedUrl} ${aliasedUrl} --platform-version=1 --team=boltdesignsystem --token=${NOW_TOKEN}`,
  );

  if (aliasOutput.code !== 0) {
    console.log('Error aliasing:');
    console.log(aliasOutput.stdout, aliasOutput.stderr);

    await setCheckRun({
      status: 'completed',
      name: 'Deploy - now.sh (alias)',
      conclusion: 'failure',
      output: {
        title: 'Now.sh Deploy failure',
        summary: `
${aliasOutput.stdout}
${aliasOutput.stderr}
        `.trim(),
      },
    });

    process.exit(1);
  } else {
    // console.log('Success Aliasing!');
    console.log(aliasOutput.stdout);
    // console.log(deployedUrl);
    // console.log(aliasedUrl);
    await setCheckRun({
      status: 'completed',
      name: 'Deploy - now.sh (alias)',
      conclusion: 'success',
      output: {
        title: 'Now.sh Deploy',
        summary: `
  - ${deployedUrl}
  - ${aliasedUrl}
        `.trim(),
      },
    });
  }
}

module.exports = {
  aliasNowUrl,
};
