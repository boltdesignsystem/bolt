// tests/e2e/pattern-lab-compiling.js

const sauce = require('../../scripts/nightwatch-sauce');
const url = require('url');
const querystring = require('querystring');
const fetch = require("node-fetch");
const netlifyBase = 'https://api.netlify.com/api/v1';
const netlifySiteId = 'bolt-design-system.netlify.com';
const netlifyDeploysEndpoint = `${netlifyBase}/sites/${netlifySiteId}/deploys`;

const { NETLIFY_TOKEN } = process.env;

if (!NETLIFY_TOKEN) {
  console.error('Need to have env var of NETLIFY_TOKEN set');
  process.exit(1);
}

const getDeployUrl = async () => {
  const netlifyEndpoint = await url.resolve(netlifyDeploysEndpoint, `?${querystring.stringify({ access_token: NETLIFY_TOKEN, })}`);
  const netlifyDeploys = await fetch(netlifyEndpoint).then(res => res.json());
  if (!netlifyDeploys) {
    console.error('Did not get any info on latest Netlify deploys...');
    process.exit(1);
  }
  return netlifyDeploys[0].deploy_ssl_url;
}


  
module.exports = {
  beforeEach: async function(browser, done) {
    async function getUrl(){
      const deployUrl = await getDeployUrl();
      return deployUrl + '/pattern-lab/patterns/02-components/index.html';
    }

    getUrl().then(testingUrl => {
      // Old working URL - used for testing this out w/o new Netlify deploy
      // const testingUrlFake = 'https://5ad67398c9659218c2f5aadd--bolt-design-system.netlify.com/pattern-lab/patterns/02-components/index.html';

      browser.url(`${testingUrl}`)
        .waitForElementVisible('body')
        .waitForElementVisible('.sg-main');
      done();
    });
  },

  'Pattern Lab: Check For Successful Netlify Deploy': browser => {
    browser
      .assert.visible('body .sg-main', 'Check if Pattern Lab has compiled successfully via Twig')
      .assert.title('Bolt Design System');
  },
  after: browser => browser.end(),
  tearDown: sauce,
};
