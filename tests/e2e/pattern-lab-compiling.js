// tests/e2e/pattern-lab-compiling.js

const sauce = require('../../scripts/nightwatch-sauce');
const url = require('url');
const querystring = require('querystring');
const fetch = require("node-fetch");
const netlifyBase = 'https://api.netlify.com/api/v1';
const netlifySiteId = 'bolt-design-system.netlify.com';
const netlifyDeploysEndpoint = `${netlifyBase}/sites/${netlifySiteId}/deploys`;

const { NETLIFY_TOKEN, GITHUB_TOKEN, TRAVIS_PULL_REQUEST, TRAVIS_REPO_SLUG} = process.env;

if (!NETLIFY_TOKEN || !GITHUB_TOKEN || !TRAVIS_PULL_REQUEST || !TRAVIS_REPO_SLUG) {
  console.error('Need to have env var of NETLIFY_TOKEN, GITHUB_TOKEN, TRAVIS_PULL_REQUEST, TRAVIS_REPO_SLUG set');
  console.log(`TRAVIS_PULL_REQUEST: ${TRAVIS_PULL_REQUEST}`);
  console.log(`TRAVIS_REPO_SLUG: ${TRAVIS_REPO_SLUG}`);
  process.exit(1);
}

function init() {
    const netlifyEndpoint = url.resolve(netlifyDeploysEndpoint, `?${querystring.stringify({ access_token: NETLIFY_TOKEN, })}`);
    const netlifyDeploys = fetch(netlifyEndpoint).then(res => res.json());
    if (!netlifyDeploys) {
      console.error('Did not get any info on latest Netlify deploys...');
      process.exit(1);
    }
}
init();
    


module.exports = {
  beforeEach: browser => {
    browser.url(`${netlifyDeploys[0].deploy_ssl_url}/pattern-lab/patterns/02-components/index.html`)
      .waitForElementVisible('body')
      .waitForElementVisible('.sg-main');
  },
  'Smoke test': browser => {
    browser
      .assert.visible('body .sg-main', 'Check if Pattern Lab has compiled successfully via Twig')
      .assert.title('Bolt Design System');
  },
  after: browser => browser.end(),
  tearDown: sauce,
};
