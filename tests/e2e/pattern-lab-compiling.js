// tests/e2e/pattern-lab-compiling.js

const sauce = require('../../scripts/nightwatch-sauce');
const url = require('url');
const querystring = require('querystring');
const fetch = require('node-fetch');
const {
  spawnSync
} = require('child_process');

const { NOW_TOKEN } = process.env;

if (!NOW_TOKEN) {
  console.error('Need to have env var of NOW_TOKEN set');
  process.exit(1);
}

const getDeployUrl = async () => {
  // @todo determine if this is even needed since we have `deployedUrl` from deploy command
  const nowEndpoint = url.resolve('https://api.zeit.co/v2/now/deployments', `?${querystring.stringify({
    teamId: 'boltdesignsystem',
  })}`);

  const nowDeploys = await fetch(nowEndpoint, {
    headers: {
      'Authorization': `Bearer ${NOW_TOKEN}`,
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());

  if (!nowDeploys) {
    console.error('Did not get any info on latest now deploys...');
    process.exit(1);
  }

  nowDeploys.deployments.sort((a, b) => {
    return a.created - b.created;
  }).reverse();

  const latestDeploy = nowDeploys.deployments[0];
  console.log('Latest now.sh Deploy:');
  console.log(latestDeploy);
  return 'https://' + latestDeploy.url;
}


let testingUrl = ''; // cached deploy url we grab from the now.sh API

module.exports = {
  async beforeEach(browser, done) {
    async function getUrl() {
      return await getDeployUrl();
    }

    // log the url being tested against to make it easier to debug failed deploys
    function logTestingUrl(){
      console.log(`Running tests against the ${testingUrl} deploy url.`);
    }

    // grab the latest testing URL from now.sh if we haven't grabbed it yet.
    if (testingUrl === '') {
      getUrl().then(deployUrl => {
        testingUrl = deployUrl; //
        logTestingUrl();
        done();
      });

    // otherwise let's be efficient and use the deploy url we already got
    } else {
      logTestingUrl();
      done();
    }
  },

  'Bolt Docs: Verify Docs Site Compiled + Deployed': function (browser) {
    browser
      .url(`${testingUrl}`)
      .waitForElementVisible('body.c-bolt-site', 1000)
      .assert.containsText('h1.c-bolt-headline', 'Bolt Design System')
      .end()
  },

  'Pattern Lab: Confirm Successful Now.sh Deploy + Pattern Lab Compiled': function (browser) {
    browser
      .url(`${testingUrl}/pattern-lab/patterns/02-components/index.html`)
      .waitForElementVisible('body .sg-main', 1000)
      .verify.title('Bolt Design System')
      .end()
  },
  tearDown: sauce,
};
