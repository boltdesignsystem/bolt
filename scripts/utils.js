const http = require('https');
const qs = require('querystring');
const execa = require('execa');

/**
 * helper function to get gitSha without needing a GITHUB_TOKEN (for local dev);
 * @returns {string} git sha of last commit
 */
const gitSha = execa.sync('git', ['rev-parse', '--short', 'HEAD']).stdout;

/**
 * @param {Object} opt
 * @param {string} opt.path
 * @param {Object} opt.requestBody
 * @param {string} opt.hostname
 * @param {string} opt.TOKEN
 * @param {Object} [opt.query]
 * @return {Promise<any>}
 */
function post({ path, requestBody, query, TOKEN }) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      hostname,
      path: query ? `${path}?${qs.stringify(query)}` : path,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${TOKEN || process.env.NOW_TOKEN}`,
      },
    };

    const req = http.request(options, res => {
      const chunks = [];

      res.on('data', chunk => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        const responseBody = Buffer.concat(chunks);
        resolve(JSON.parse(responseBody.toString()));
      });
    });

    // console.log({ requestBody });
    req.write(JSON.stringify(requestBody));
    req.end();
  });
}

/**
 * @param {Object} opt
 * @param {string} opt.path
 * @param {string} opt.hostname
 * @param {string} opt.TOKEN
 * @param {Object} [opt.query]
 * @return {Promise<any>}
 */
function get({ path, query, hostname, TOKEN }) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      hostname,
      path: query ? `${path}?${qs.stringify(query)}` : path,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${TOKEN || process.env.NOW_TOKEN}`,
      },
    };
    const req = http.request(options, res => {
      const chunks = [];

      res.on('data', chunk => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        const responseBody = Buffer.concat(chunks);
        resolve(JSON.parse(responseBody.toString()));
      });
    });

    req.end();
  });
}

/**
 * @link https://zeit.co/docs/api/v1/#endpoints/deployments/list-all-the-deployments
 * @return {Promise<string>} - URL of latest deploymennt
 */
function getLatestDeploy() {
  if (!process.env.NOW_TOKEN) {
    process.stderr.write('NOW_TOKEN env var required and is missing');
    process.exit(1);
  }
  return new Promise((resolve, reject) => {
    get({
      path: '/v4/now/deployments',
      hostname: 'api.zeit.co',
      query: {
        teamId: 'team_etXPus2wqbe3W15GcdHsbAs8', // boltdesignsystem
      },
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.NOW_TOKEN}`,
      },
    })
      .then(results => {
        if (results.error) {
          process.stderr.write(
            `Error getting latest now.sh deploy: ${results.error.message}`,
          );
          process.exit(1);
        }

        // If a deployment hasn't finished uploading (is incomplete), the url property will have a value of null.
        const resultsWithGitSha = results.deployments.filter(
          d => d.meta.gitSha === gitSha,
        );

        const fallbackResultsWithGitSha = results.deployments.filter(d =>
          gitSha.includes(d.meta.gitSha),
        );

        const result = resultsWithGitSha.find(d => d.url);

        // if an exact match isn't found, check partial matches and sort by most recent
        fallbackResultsWithGitSha.sort(function(a, b) {
          // Turn created unix time strings into dates, and then sort by what happened most recently
          return new Date(a.created) - new Date(b.created);
        });
        const fallbackResults = fallbackResultsWithGitSha.find(d => d.url);

        if (result) {
          resolve(`https://${result.url}`);
        } else if (fallbackResults) {
          resolve(`https://${fallbackResults.url}`);
        } else {
          reject(new Error('No deployments found'));
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

module.exports = {
  getLatestDeploy,
  gitSha,
};
