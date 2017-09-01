/*-------------------------------------------------------------------
// Post to Slack
-------------------------------------------------------------------*/
require('dotenv').config();
const Slack = require('node-slack');
const merge = require('merge').recursive;
const config = require('./config.default');
const slack = new Slack(config.hookUrl);
const shell = require('shelljs');

var originalUrl = shell('now --static $DEPLOY_PATH -t $NOW_TOKEN');
console.log(originalUrl);
// if (!shell.which('git')) {
//   shell.echo('Sorry, this script requires git');
//   shell.exit(1);
// }

// shell.echo($originalUrl)

// ORIGINAL_URL=$()
// BRANCH=$(git rev-parse --abbrev-ref HEAD | tr '.' '-' | tr '/' '-')
// NEW_URL=$BRANCH'-boltdesignsystem'
// now alias $ORIGINAL_URL $NEW_URL
//
// FULL_URL='https://'$NEW_URL'.now.sh';
//
// echo FULL_URL=$FULL_URL > .env
// echo "Bolt has been set to: $FULL_URL"
//
//
//
//
//
// slack.send({
//   channel: config.slackChannel,
//   text: config.slackText,
//   icon_emoji: config.slackEmoji,
//   attachments: {
//     fallback: `Success! Bolt deployed to <${process.env.BOLT_DEPLOY_URL}|here>`,
//     pretext: `Success! Bolt deployed to <${process.env.BOLT_DEPLOY_URL}|here>`,
//     color: '#FFCC4C'
//   }
// });
// done();
