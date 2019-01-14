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
                theAssets[key] = value.map(name => {
                  return {
                    name,
                    url: `${assetBaseUrl}/${name}`,
                  };
                });
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

    const text = Object.keys(testSets)
      .map(testName => {
        const tests = testSets[testName];

        return `
# ${testName}
<details open>

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
## ${passed ? ':+1:' : ':-1:'} ${browser} ${browserVer} ${os}

<details open>
  
- [Video](${assets.video})
- [Sauce Log](${assets['sauce-log']})
- [Selenium Log](${assets['selenium-log']})
- [Automator Log](${assets['automator.log']})

<details>
<summary>Screenshots</summary>

> If screenshots do not show, it may have to do with tests themselves or SauceLabs (not kept for more than 30 days). Check url the images link to for original url.

${screenshots
              .map(
                (s, i) => `
###### Screenshot ${i}

[![${s.name}](${s.url})](${s.url})

`,
              )
              .join('')}

</details>

</details>
`;
          })
          .join('')}
</details>      
`;
      })
      .join('');

    const details = `
<details>
  <summary>Full Page Data</summary>

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
        text: `${text}

---

${details}        
        `,
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
  const build = `build-${TRAVIS_JOB_NUMBER}`;
  const sauceResults = await collectSauceLabResults(build);
  const checkRunSubmitResults = await setGithubAppSauceResults(sauceResults);
  console.log(`Submitted Check Run Results: ${checkRunSubmitResults.html_url}`);
}
go();
