/*-------------------------------------------------------------------
// Post to Slack
-------------------------------------------------------------------*/
require('dotenv').config();
const Slack = require('node-slack');
const merge = require('merge').recursive;
const github = require('octonode');
const normalizeUrl = require('normalize-url');
const spawn = require('cross-spawn');
const travisAfterAll = require('travis-after-all');
const urlRegex = require('url-regex');
const branch = require('git-branch');
const exec = require('child_process').exec;
const core = require('@bolt/build-core');
const config = require('./config.default');
const travisStatus = require('travis-status');

const slack = new Slack(config.hookUrl);
// const nowCli = require.resolve('now/bin/now');

const repoSlug = 'bolt-design-system/bolt';
let currentBranch = '';

// const shell = require('shelljs');
const execConfig = {
  encoding: 'utf8',
  timeout: 0
};

function noop() {}

function getUrl(content) {
  const urls = content.match(urlRegex()) || [];
  return urls.map(url => normalizeUrl(url.trim().replace(/\.+$/, '')))[0];
}


const nowToken = process.env.NOW_TOKEN;
if (!nowToken) {
  throw new Error('Missing required environment variable NOW_TOKEN');
}

const args = [
  '--static ./bolt-website',
  '--token', nowToken,
  '--no-clipboard',
  '--force'
];


const sha = null;


function deploy(context, sha) {
  let client;
  let ghRepo;
  const githubToken = process.env.GITHUB_TOKEN;

  if (githubToken) {
    // throw new Error('Missing required environment variable GH_TOKEN');
    client = github.client(githubToken);
    ghRepo = client.repo(process.env.TRAVIS_REPO_SLUG || repoSlug);
  }


  if (sha) {
    ghRepo.status(sha, {
      context,
      state: 'pending',
      description: `Δ Now ${context} deployment pending`
    }, noop);
  }

  let stdout = '';

  const child = exec(`now ${args.join(' ')}`, execConfig);

  child.stdout.on('data', (data) => {
    stdout += data;
    process.stdout.write(data);
  });
  child.stderr.on('data', (data) => {
    process.stdout.write(data);
  });

  child.on('error', (err) => {
    console.log(err);
    slack.send(merge(config, {
      text: `Oh snap! Δ Now deployment failed 😞.  ${err}`
    }));

    if (sha) {
      ghRepo.status(sha, {
        context,
        state: 'error',
        description: `Δ Now ${context} deployment failed. See Travis logs for details.`
      }, noop);
    }
  });


  child.on('close', (code) => {
    const originalUrl = getUrl(stdout);

    if (!originalUrl) {
      slack.send(merge(config, {
        text: `Oh snap! Δ Now deployment failed 😞.  ${stdout}`
      }));
    }

    if (context === 'local') {
      slack.send({
        channel: config.slackChannel,
        text: `Huzzah 😀! Bolt has successfully deployed to <${originalUrl}|${originalUrl}>!`,
        icon_emoji: config.slackEmoji,
        link_names: 1,
        username: 'bolt-bot'
      });
    } else {
    // For non-local deployments, automatically create a pretty alias based off of the current branch
      currentBranch = branch.sync();
      currentBranch = currentBranch.replace('/', '-').replace('.', '-');
      const target_url = `${currentBranch}-boltdesignsystem`;

      let original_url = getUrl(stdout);
      original_url = original_url.replace('https://', '').replace('.now.sh', '');

      let stdoutAlias = '';
      const childAlias = exec(`now alias ${original_url} ${target_url}`, execConfig);

      childAlias.stdout.on('data', (data) => {
        stdoutAlias += data;
        process.stdout.write(data);
      });

      childAlias.on('close', (code) => {
        const final_url = `https://${target_url}.now.sh`;

        if (sha) {
          ghRepo.status(sha, {
            context,
            final_url,
            state: 'success',
            description: `Δ Now ${final_url} deployment complete`
          }, noop);
        }

        slack.send({
          channel: config.slackChannel,
          text: `Huzzah 😀! Bolt has successfully deployed to <${final_url}|${target_url}>!`,
          icon_emoji: config.slackEmoji,
          link_names: 1,
          username: 'bolt-bot'
        });
      });
    }
  });
}


// Note:  Most options match camelized command-line option names
// var options = {
//   branch: 'master',
//   wait: 60000
// };
// travisStatus(options).then(function(apiObject) {
//   console.log(apiObject);
// });

if (process.env.CI || process.env.TRAVIS) {
  // travisAfterAll((code, err) => {

  travisStatus().then((response) => {
    // console.log(response);

    // Don't do anything if there was an error of if the build returned a failing code
    // if (response.code !== 0) {
    //   return;
    // }


    switch (response.event_type) {
      case 'pull_request': return deploy('staging', process.env.TRAVIS_PULL_REQUEST_SHA);
      case 'push': return deploy('production', process.env.TRAVIS_COMMIT);
      default: return deploy('production', process.env.TRAVIS_COMMIT);
    }
  });
} else {
  deploy('local', null);
}
