#!/usr/bin/env node
const fetch = require('node-fetch');
const { groupBy } = require('lodash');
const { setCheckRun } = require('../scripts/check-run');

const { SAUCE_USERNAME, SAUCE_ACCESS_KEY, TRAVIS_JOB_NUMBER } = process.env;
if (!SAUCE_ACCESS_KEY && !SAUCE_USERNAME && !TRAVIS_JOB_NUMBER) {
  console.log(
    `Missing Env Vars, need: SAUCE_USERNAME, SAUCE_ACCESS_KEY, TRAVIS_JOB_NUMBER`,
  );
  process.exit(1);
}

const auth = Buffer.from(`${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}`).toString(
  'base64',
);

async function collectSauceLabResults(build) {
  try {
    const buildJobs = await fetch(
      // https://wiki.saucelabs.com/display/DOCS/Job+Methods
      `https://saucelabs.com/rest/v1/${SAUCE_USERNAME}/jobs?full=true`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(res => {
        if (res.ok) {
          console.log(`Set SauceLabs details ok`);
          return res.json();
        } else {
          console.log(`Set SauceLabs details not ok`);
          throw new Error(
            `Could not get SauceLabs job listing ${res.statusText}`,
          );
        }
      })
      .then(jobs => jobs.filter(r => r.build === build));

    const tests = await Promise.all(
      buildJobs.map(async buildJob => {
        // just the file names, not absolute paths
        const assetBaseUrl = `https://assets.saucelabs.com/jobs/${buildJob.id}`;
        /** @type {{ 'sauce-log': string, 'video': string, 'selenium-log': string, screenshots: string[], 'video.mp4': string  }} */
        const assets = await fetch(
          // https://wiki.saucelabs.com/display/DOCS/Job+Methods
          `https://saucelabs.com/rest/v1/${SAUCE_USERNAME}/jobs/${
            buildJob.id
          }/assets`,
          {
            headers: {
              Authorization: `Basic ${auth}`,
              Accept: 'application/json',
            },
          },
        )
          .then(async res => {
            const { ok, status, statusText } = res;
            if (ok) {
              return res.json();
            } else {
              const body = res.text();
              console.log(
                `SauceLabs asset name fetch not ok for ${buildJob.id}: ${body}`,
              );
              throw new Error(
                `Could not get SauceLabs job assets ${status} ${statusText}. ${body}`,
              );
            }
          })
          .then(assetNames => {
            const theAssets = {};
            Object.keys(assetNames).forEach(key => {
              const value = assetNames[key];
              if (key === 'screenshots') {
                theAssets[key] = value.map(v => `${assetBaseUrl}/${v}`);
              } else {
                theAssets[key] = `${assetBaseUrl}/${value}`;
              }
            });
            return theAssets;
          });

        return {
          ...buildJob,
          assets,
        };
      }),
    );

    return {
      totalTests: tests.length,
      passedTests: tests.filter(test => test.passed).length,
      build,
      testSets: groupBy(tests, 'name'),
    };
  } catch (err) {
    console.log(`Error setting SauceLabs details`, err);
    process.exit(1);
  }
}

async function setGithubAppSauceResults(sauceResults) {
  try {
    const { totalTests, passedTests, build, testSets } = sauceResults;
    /** @type {boolean} */
    const passed = totalTests === passedTests;

    const summary = `
- ${passedTests} of ${totalTests} passed    
    `.trim();

    const text = Object.key(testSets)
      .map(testName => {
        const tests = testSets[testName];

        return `
# ${testName}

        ${tests
          .map(test => {
            const {
              passed,
              browser,
              browser_short_version: browserVer,
              assets,
              os,
            } = test;
            const { screenshots } = assets;
            return `
<details open>
<summary>
  ${passed ? ':+1:' : ':-1:'} ${browser} ${browserVer} ${os}
</summary>
  
- [Video](${assets.video})
- [Sauce Log](${assets['sauce-log']})
- [Selenium Log](${assets['selenium-log']})
- [Automator Log](${assets['automator.log']})

${screenshots.map((s, i) => `![Screenshot ${i}](${s})`).join()}
  
</details>
`;
          })
          .join()}
      `;
      })
      .join();

    const details = `
<details>
  <summary>Data</summary>

\`\`\`json
${JSON.stringify(sauceResults, null, '  ')}
\`\`\`
  
</details>  
    `.trim();

    return setCheckRun({
      name: 'Nightwatch',
      status: 'completed',
      conclusion: passed ? 'success' : 'failure',
      output: {
        title: `Nightwatch ${passed ? 'Success' : 'Failed'}`,
        summary,
        text,
        details,
        // images: assets.screenshots
        //   ? assets.screenshots.map((screenshot, i) => ({
        //       image_url: screenshot,
        //       alt: `Screenshot ${i}`,
        //       caption: assetNames.screenshot[i],
        //     }))
        //   : [],
      },
    });
  } catch (error) {
    console.log('Error');
    console.error(error);
    process.exit(1);
  }
}

async function go() {
  const build = `build-7442.1` || `build-${TRAVIS_JOB_NUMBER}`;
  const sauceResults = await collectSauceLabResults(build);
  const checkRunSubmitResults = await setGithubAppSauceResults(sauceResults);
  console.log(`Submitted Check Run Results: ${checkRunSubmitResults.html_url}`);
}
go();
