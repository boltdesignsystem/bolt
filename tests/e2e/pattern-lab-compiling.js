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
  // console.log(nowDeploys);
  console.log('Latest now.sh Deploy:');
  console.log(latestDeploy);

  return 'https://' + latestDeploy.url;
}


module.exports = {
  beforeEach: async function(browser, done) {
    async function getUrl(){
      const deployUrl = await getDeployUrl();
      return deployUrl + '/pattern-lab/patterns/02-components/index.html';
    }

    getUrl().then(testingUrl => {
      browser.url(`${testingUrl}`)
        .waitForElementVisible('body')
        .waitForElementVisible('.sg-main');
      done();
    });
  },

  'Pattern Lab: Check For Successful Now.sh Deploy': browser => {
    browser
      .assert.visible('body .sg-main', 'Check if Pattern Lab has compiled successfully via Twig')
      .assert.title('Bolt Design System');
  },
  after: browser => browser.end(),
  tearDown: sauce,
};
