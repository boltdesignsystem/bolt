#!/usr/bin/env node
const sleep = require('sleep-promise');
const crypto = require('crypto');
const fetch = require('@zeit/fetch-retry')(require('node-fetch'));
const { groupBy } = require('lodash');
const { setCheckRun } = require('../../../scripts/check-run');

const {
  SAUCE_USERNAME,
  SAUCE_ACCESS_KEY,
  TRAVIS_JOB_NUMBER,
  NOW_TOKEN,
} = process.env;
if (!SAUCE_ACCESS_KEY && !SAUCE_USERNAME && !TRAVIS_JOB_NUMBER && !NOW_TOKEN) {
  console.log(
    `Missing Env Vars, need: SAUCE_USERNAME, SAUCE_ACCESS_KEY, TRAVIS_JOB_NUMBER, NOW_TOKEN`,
  );
  process.exit(1);
}

const auth = Buffer.from(`${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}`).toString(
  'base64',
);

const sauceFetchOptions = {
  headers: {
    Authorization: `Basic ${auth}`,
    Accept: 'application/json',
  },
};

/**
 * @param {{ file: string, sha: string, size: number}[]} files
 * @return {Object} - url of deployment
 * @link https://zeit.co/docs/api/#endpoints/deployments/create-a-new-deployment
 */
function createNowDeployment(files) {
  return fetch(
    'https://api.zeit.co/v6/now/deployments?teamdId=team_etXPus2wqbe3W15GcdHsbAs8',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOW_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'bolt-nightwatch-assets',
        files,
        version: 2,
        public: true,
        builds: [{ src: '**', use: '@now/static' }],
      }),
    },
  ).then(async (res) => {
    const { ok, status, statusText } = res;
    const body = await res.json();
    if (!ok) {
      console.log(body);
      throw new Error('Error creating new now.sh deployment');
    }
    const { id, readyState, url } = body;
    return {
      id,
      readyState,
      url: `https://${url}`,
    };
  });
}

function isDeployReady(id) {
  return fetch(`https://api.zeit.co/v6/now/deployments/${id}`, {
    headers: {
      Authorization: `Bearer ${NOW_TOKEN}`,
      'Content-Type': 'application/json',
    },
  }).then(async (res) => {
    const { ok, status, statusText } = res;
    if (!ok) {
      throw new Error(
        `Error checking status of now.sh deployment ${id}: ${status} ${statusText}`,
      );
    }
    // Possible values are INITIALIZING, ANALYZING, BUILDING, DEPLOYING, READY, or ERROR.
    const { readyState } = await res.json();
    if (readyState === 'ERROR') {
      throw new Error(`Deploy ${id} resulted in an error`);
    } else if (readyState === 'READY') {
      return true;
    }
    return false;
  });
}

async function ensureDeployReady(id) {
  let isReady = false;
  /* eslint-disable no-await-in-loop */
  while (!isReady) {
    isReady = await isDeployReady(id);
    await sleep(1000);
  }
  /* eslint-enable no-await-in-loop */
  return true;
}

async function collectSauceLabResults(build) {
  const filesToDeploy = [];

  /**
   * @link https://zeit.co/docs/api/#endpoints/deployments/upload-deployment-files
   */
  function uploadFile({ file, filePath }) {
    const hash = crypto.createHash('sha1');
    const sha = hash.update(file).digest('hex');
    const size = file.byteLength;
    return fetch(
      'https://api.zeit.co/v2/now/files?teamdId=team_etXPus2wqbe3W15GcdHsbAs8',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${NOW_TOKEN}`,
          'Content-Length': size,
          'x-now-digest': sha,
        },
        body: file,
      },
    )
      .then(async (res) => {
        const { ok, status, statusText } = res;
        console.log(status);
        console.log(statusText);
        console.log(ok);
        if (ok) {
          filesToDeploy.push({
            sha,
            file: filePath,
            size,
          });
          console.log(`Uploaded ${filePath}`);
          return filePath;
        }
        const {
          error: { code, message },
        } = await res.json();
        throw new Error(
          `Error uploading "${filePath}" to Now.sh. Code: ${code}. Message:
      ${message}`,
        );
      })
      .catch((err) => {
        console.error(err);
        throw new Error(err.message);
      });
  }

  function transferFileFromSauceToNow(fileName, buildId) {
    return fetch(
      `https://saucelabs.com/rest/v1/${SAUCE_USERNAME}/jobs/${buildId}/assets/${fileName}`,
      sauceFetchOptions,
    )
      .then(async (res) => {
        const { ok, status, statusText, headers } = res;
        const contentType = headers.get('content-type');
        if (!ok) {
          if (contentType === 'application/json') {
            console.log(await res.json());
          }
          throw new Error(
            `Problem downloading file from SauceLabs: ${fileName} ${statusText}`,
          );
        }
        console.log(`Downloaded ${fileName}`);
        return {
          file: await res.buffer(),
          filePath: `${buildId}/${fileName}`,
        };
      })
      .then(uploadFile)
      .catch((err) => {
        console.error('transferFileFromSauceToNow', err);
        throw new Error(err);
      });
  }

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
      .then((res) => {
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
      .then((jobs) => jobs.filter((r) => r.build === build));

    console.log(
      'Getting all info from SauceLabs, downloading all screenshots, and uploading to a now.sh deploy for image hosting....',
    );
    const tests = await Promise.all(
      buildJobs.map(async (buildJob) => {
        // just the file names, not absolute paths
        /** @type {{ 'sauce-log': string, 'video': string, 'selenium-log': string, screenshots: string[], 'video.mp4': string  }} */
        const assetsNames = await fetch(
          // https://wiki.saucelabs.com/display/DOCS/Job+Methods
          `https://saucelabs.com/rest/v1/${SAUCE_USERNAME}/jobs/${buildJob.id}/assets`,
          sauceFetchOptions,
        ).then(async (res) => {
          const { ok, status, statusText } = res;
          if (ok) {
            return await res.json();
          } else {
            const body = await res.text();
            console.log(
              `SauceLabs asset name fetch not ok for ${buildJob.id}: ${body}`,
            );
            throw new Error(
              `Could not get SauceLabs job assets ${status} ${statusText}. ${body}`,
            );
          }
        });

        const filteredScreenshots = await Promise.all(
          assetsNames.screenshots.filter(
            (screenshot) => !screenshot.includes('0000screenshot.png'),
          ),
        );

        const screenshots = await Promise.all(
          filteredScreenshots.map((screenshot) =>
            transferFileFromSauceToNow(screenshot, buildJob.id),
          ),
        );

        const finalScreenshot = await transferFileFromSauceToNow(
          'final_screenshot.png',
          buildJob.id,
        );

        return {
          ...buildJob,
          sauceLabsPage: `https://app.saucelabs.com/tests/${buildJob.id}`,
          assets: {
            screenshots,
            finalScreenshot,
          },
        };
      }),
    ).catch((err) => {
      console.error('Promise.all error', err);
      throw new Error(err);
    });

    const { id, url, readyState } = await createNowDeployment(filesToDeploy);
    console.log(readyState);
    console.log(id);
    console.log(url);
    if (readyState !== 'READY') {
      await ensureDeployReady(id);
    }
    console.log(`Deployed to ${url}`);

    return {
      totalTests: tests.length,
      passedTests: tests.filter((test) => test.passed).length,
      build,
      testSets: groupBy(
        tests.map((test) => {
          return {
            ...test,
            assets: {
              finalScreenshot: `${url}/${test.assets.finalScreenshot}`,
              screenshots: test.assets.screenshots.map((s) => `${url}/${s}`),
            },
          };
        }),
        'name',
      ),
    };
  } catch (err) {
    // console.log(`Error setting SauceLabs details`, err);
    throw new Error(err.message);
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

    const allImages = [];

    const text = Object.keys(testSets)
      .map((testName) => {
        const tests = testSets[testName];

        return `
# ${testName}
<details open>

        ${tests
          .map((test) => {
            const {
              passed,
              browser,
              browser_short_version: browserVer,
              assets,
              os,
            } = test;
            const { screenshots, finalScreenshot } = assets;

            // this adds to the full Check Run grid of images
            allImages.push(
              ...screenshots.map((screenshot, i) => {
                const name = screenshot.split('/').pop();
                return {
                  image_url: screenshot,
                  alt: name,
                  caption: `${i + 1}/${
                    screenshots.length
                  }: ${testName} - ${browser} ${browserVer} ${os}`,
                };
              }),
            );

            return `
## ${passed ? ':+1:' : ':-1:'} ${browser} ${browserVer} ${os} ([details](${
              test.sauceLabsPage
            }))

<details>

- See video, logs, steps and more at [SauceLabs](${test.sauceLabsPage})

![Final Screenshot](${finalScreenshot})

<details>
<summary>Screenshots</summary>

${screenshots
  .map(
    (s, i) => `
###### Screenshot ${i}

[![Screenshot ${i}](${s})](${s})

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

    return setCheckRun({
      name: 'Nightwatch',
      status: 'completed',
      conclusion: passed ? 'success' : 'failure',
      output: {
        title: `Nightwatch ${passed ? 'Success' : 'Failed'}`,
        summary,
        images: allImages,
        text,
      },
    });
  } catch (error) {
    console.log('Error');
    console.error(error);
    process.exit(1);
  }
}

async function go() {
  try {
    const build = `build-${TRAVIS_JOB_NUMBER}`;
    await sleep(15000); // wait 15 seconds first before tryhing to download assets from Sauce Labs
    const sauceResults = await collectSauceLabResults(build);
    const checkRunSubmitResults = await setGithubAppSauceResults(sauceResults);
    console.log(
      `Submitted Check Run Results: ${checkRunSubmitResults.html_url}`,
    );
  } catch (err) {
    throw new Error(err);
    // test if we can still try to send our results even if there's a test failure.
    const checkRunSubmitResults = await setGithubAppSauceResults(sauceResults);
    console.log(
      `Submitted Check Run Results: ${checkRunSubmitResults.html_url}`,
    );
    process.exit(1);
  }
}

go();
